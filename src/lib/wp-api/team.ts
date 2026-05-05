const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://life-with-giraffe.local';

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
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/giraffe/v1/team-members`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      console.error('Failed to fetch team members:', response.statusText);
      return [];
    }

    const data = await response.json();

    return data.map((member: any) => ({
      id: member.id,
      name: member.name || '',
      role: member.role || '',
      primaryImageSrc: member.image?.url || '',
      primaryAlt: member.image?.alt || member.name || '',
      rotation: member.rotation || -4,
    }));
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}