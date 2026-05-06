const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wp-lwg.giraffe.partners';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  primaryImageSrc: string;
  primaryAlt: string;
  rotation: number;
}

type WPImage = {
  id: number;
  alt: string;
  sizes: {
    large?: { url: string };
    full?: { url: string };
  };
};

type WPTeamFields = {
  name_of_person: string;
  role_of_a_person: string;
  team_member_image: WPImage | null;
  image_rotation: number;
};

type WPPost<F = unknown> = {
  id: number;
  slug: string;
  title: { rendered: string };
  fields: F;
};

async function fetchPosts<F>(
  endpoint: string,
): Promise<WPPost<F>[]> {
  const url = new URL(`${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`);
  url.searchParams.set('per_page', '100');
  
  const res = await fetch(url.toString(), {
    next: { revalidate: 30 },
  });
  
  if (!res.ok) {
    throw new Error(`WP fetch failed: ${endpoint} → ${res.status}`);
  }
  
  return res.json();
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const raw = await fetchPosts<WPTeamFields>('team_members');
    
    return raw.map<TeamMember>((p) => {
      const img = p.fields.team_member_image;
      const imageUrl = img?.sizes.large?.url ?? img?.sizes.full?.url ?? '';
      
      return {
        id: p.id,
        name: p.fields.name_of_person || p.title.rendered,
        role: p.fields.role_of_a_person || '',
        primaryImageSrc: imageUrl,
        primaryAlt: img?.alt || p.fields.name_of_person || '',
        rotation: p.fields.image_rotation || -4,
      };
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}