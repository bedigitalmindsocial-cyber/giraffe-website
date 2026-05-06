
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wp-lwg.giraffe.partners';
 
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  primaryImageSrc: string;
  primaryAlt: string;
  rotation: number;
}
 
async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    console.log('[getTeamMembers] Starting fetch...');
    console.log('[getTeamMembers] URL:', `${WORDPRESS_URL}/wp-json/wp/v2/team_members`);
 
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/team_members?per_page=100`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 30 },
      }
    );
 
    console.log('[getTeamMembers] Response status:', response.status);
 
    if (!response.ok) {
      throw new Error(`Failed to fetch team members: ${response.status} ${response.statusText}`);
    }
 
    const data = await response.json();
    console.log('[getTeamMembers] Raw API response:', JSON.stringify(data, null, 2));
 
    // Handle if it's an error response
    if (!Array.isArray(data)) {
      console.error('[getTeamMembers] API returned non-array:', data);
      return [];
    }
 
    // Map API response to TeamMember interface
    const members: TeamMember[] = data.map((post: any) => {
      console.log('[getTeamMembers] Processing post:', post.id, post.title?.rendered);
 
      // Try to get fields from different possible locations
      const fields = post.fields || post.acf || {};
      
      const image = fields.team_member_image || fields.image || null;
      let imageUrl = '';
      let imageAlt = '';
 
      if (image) {
        // Handle image object from ACF
        if (typeof image === 'object') {
          imageUrl = 
            image.sizes?.large?.url ||
            image.sizes?.full?.url ||
            image.url ||
            '';
          imageAlt = image.alt || fields.name_of_person || '';
        } else if (typeof image === 'string') {
          // Handle if image is just a URL string
          imageUrl = image;
          imageAlt = fields.name_of_person || '';
        }
      }
 
      const member: TeamMember = {
        id: post.id,
        name: fields.name_of_person || post.title?.rendered || 'Unknown',
        role: fields.role_of_a_person || '',
        primaryImageSrc: imageUrl,
        primaryAlt: imageAlt,
        rotation: fields.image_rotation ? parseFloat(fields.image_rotation) : -4,
      };
 
      console.log('[getTeamMembers] Mapped member:', member);
      return member;
    });
 
    console.log('[getTeamMembers] Total members loaded:', members.length);
    return members;
  } catch (error) {
    console.error('[getTeamMembers] Error:', error);
    throw error;
  }
}
 
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    return await fetchTeamMembers();
  } catch (error) {
    console.error('[getTeamMembers] Failed completely:', error);
    return [];
  }
}