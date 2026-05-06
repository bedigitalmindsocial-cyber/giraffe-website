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
    const endpoint = `${WORDPRESS_URL}/wp-json/giraffe/v1/team-members`;
    
    console.log('Fetching team members from:', endpoint);
    
    const response = await fetch(endpoint, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch team members:', response.statusText, response.status);
      return [];
    }

    const data = await response.json();
    
    console.log('Team members data received:', data);

    // Map the response to TeamMember interface
    return data.map((member: any) => ({
      id: member.id,
      name: member.name || '',
      role: member.role || '',
      primaryImageSrc: member.image?.url || member.image || '',
      primaryAlt: member.image?.alt || member.name || '',
      rotation: member.rotation || -4,
    }));
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}
