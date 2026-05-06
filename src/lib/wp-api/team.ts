const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wp-lwg.giraffe.partners';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  primaryImageSrc: string;
  primaryAlt: string;
  rotation: number;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const endpoint = `${WORDPRESS_URL}/wp-json/giraffe/v1/team-members`;
    
    console.log('Fetching team members from:', endpoint);
    
    const response = await fetch(endpoint, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch team members. Status:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    
    console.log('Raw API Response:', JSON.stringify(data, null, 2));

    if (!Array.isArray(data)) {
      console.error('API response is not an array:', typeof data);
      return [];
    }

    // Map the response to TeamMember interface
    const teamMembers = data.map((member: any) => {
      // Handle image URL - fix the escaped forward slashes
      let imageUrl = '';
      if (member.image?.url) {
        imageUrl = member.image.url.replace(/\\\//g, '/');
      }

      return {
        id: member.id || 0,
        name: member.name?.trim() || '',
        role: member.role?.trim() || '',
        primaryImageSrc: imageUrl,
        primaryAlt: member.image?.alt || member.name || '',
        rotation: parseInt(String(member.rotation || '-4')) || -4,
      };
    });

    console.log('Mapped team members:', JSON.stringify(teamMembers, null, 2));
    
    return teamMembers;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}
