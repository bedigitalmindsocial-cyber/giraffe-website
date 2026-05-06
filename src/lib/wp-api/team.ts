const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:3000';

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
    // Try the custom endpoint first (if your plugin provides it)
    const customEndpoint = `${WORDPRESS_URL}/wp-json/giraffe/v1/team-members`;
    
    try {
      const response = await fetch(customEndpoint, { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.map((member: any) => ({
          id: member.id,
          name: member.name || '',
          role: member.role || '',
          primaryImageSrc: member.image?.url || member.primaryImageSrc || '',
          primaryAlt: member.image?.alt || member.primaryAlt || member.name || '',
          rotation: member.rotation || -4,
        }));
      }
    } catch (customError) {
      console.warn('Custom endpoint not available, trying default WordPress endpoint');
    }

    // Fallback: Fetch from standard WordPress REST API
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/giraffe_team?per_page=100`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch team members:', response.statusText);
      return [];
    }

    const posts = await response.json();

    // Map WordPress posts to TeamMember interface
    const teamMembers = await Promise.all(
      posts.map(async (post: any) => {
        let imageUrl = '';
        let imageAlt = '';

        // Get featured image
        if (post.featured_media) {
          try {
            const mediaResponse = await fetch(
              `${WORDPRESS_URL}/wp-json/wp/v2/media/${post.featured_media}`,
              { cache: 'no-store' }
            );
            if (mediaResponse.ok) {
              const mediaData = await mediaResponse.json();
              imageUrl = mediaData.source_url || '';
              imageAlt = mediaData.alt_text || post.title.rendered || '';
            }
          } catch (error) {
            console.error('Error fetching media for post', post.id, error);
          }
        }

        // Get ACF fields if available
        const acfFields = post.acf || {};
        const role = acfFields.team_role || acfFields.role || '';
        const rotation = acfFields.image_rotation || acfFields.rotation || -4;

        return {
          id: post.id,
          name: post.title.rendered || '',
          role: role,
          primaryImageSrc: imageUrl,
          primaryAlt: imageAlt,
          rotation: parseInt(rotation) || -4,
        };
      })
    );

    return teamMembers;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}
