import {
  galleryImages as mockGalleryImages,
  roles as mockRoles,
  workFolders as mockWorkFolders,
  workSamples as mockWorkSamples,
} from './mock-data';
import type {
  GalleryImage,
  GalleryTag,
  Role,
  RoleLocation,
  RoleStatus,
  RoleType,
  TeamMember,
  WorkFolder,
  WorkSample,
} from './types';

/**
 * WordPress REST client for the LWG content. Server components consume
 * these on the Next.js side; if WP is unreachable, each function falls
 * back to the mock data so the public site never breaks.
 */
const WP_BASE = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost';

console.log('[wp-api] WP_BASE:', WP_BASE);

type WPImage = {
  id: number;
  alt: string;
  sizes: {
    thumbnail?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
    full?: { url: string; width: number; height: number };
  };
};

type WPPost<F = unknown> = {
  id: number;
  slug: string;
  title: { rendered: string };
  fields: F;
};

/**
 * ACF date_picker stores dates internally as "Ymd" (e.g. "20260501") when
 * saved through the WP admin, but as "Y-m-d" when written via update_post_meta
 * in our seeders. Normalise both into "YYYY-MM-DD" so `new Date()` always
 * parses cleanly.
 */
function normaliseAcfDate(raw: string): string {
  if (!raw) return '';
  if (/^\d{8}$/.test(raw)) {
    return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
  }
  return raw;
}

async function fetchPosts<F>(
  endpoint: string,
  params: Record<string, string | number> = {},
): Promise<WPPost<F>[]> {
  const url = new URL(`${WP_BASE}/wp-json/wp/v2/${endpoint}`);
  url.searchParams.set('per_page', '100');
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v));
  }
  
  console.log('[wp-api] Fetching from:', url.toString());
  
  const res = await fetch(url.toString(), {
    next: { revalidate: 30 },
  });
  
  console.log('[wp-api] Response status:', res.status);
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('[wp-api] Error response:', errorText);
    throw new Error(`WP fetch failed: ${endpoint} → ${res.status} → ${errorText}`);
  }
  
  const data = await res.json();
  console.log('[wp-api] Response data:', data);
  
  return data;
}

/* ─── TEAM ────────────────────────────────────────────────────────── */

type WPTeamFields = {
  name_of_person?: string;
  role_of_a_person?: string;
  team_member_image?: WPImage | null;
  image_rotation?: number;
};

export async function getTeamMembers(): Promise<TeamMember[]> {
  console.log('[getTeamMembers] Starting fetch...');
  
  // Try multiple possible endpoints
  const possibleEndpoints = [
    'team_members',
    'team-members',
    'team',
  ];
  
  for (const endpoint of possibleEndpoints) {
    try {
      console.log(`[getTeamMembers] Trying endpoint: ${endpoint}`);
      const raw = await fetchPosts<WPTeamFields>(endpoint);
      
      console.log(`[getTeamMembers] Successfully fetched from ${endpoint}:`, raw);
      
      const members = raw.map<TeamMember>((p) => {
        const img = p.fields.team_member_image;
        const imageUrl = img?.sizes.large?.url ?? img?.sizes.full?.url ?? '';
        
        return {
          id: p.id,
          name: p.fields.name_of_person || p.title.rendered,
          role: p.fields.role_of_a_person || '',
          primaryImageSrc: imageUrl,
          primaryAlt: img?.alt || p.fields.name_of_person || '',
          rotation: p.fields.image_rotation ?? -4,
        };
      });
      
      console.log('[getTeamMembers] Mapped members:', members);
      return members;
    } catch (error) {
      console.warn(`[getTeamMembers] Failed to fetch from ${endpoint}:`, error);
      continue;
    }
  }
  
  console.error('[getTeamMembers] All endpoints failed, returning empty array');
  return [];
}

/* ─── WORK ────────────────────────────────────────────────────────── */

type WPWorkFolderFields = {
  position: number;
  seed_description: string;
};

type WPWorkSampleFields = {
  parent_folder_id: number;
  image: WPImage | null;
  caption: string;
  position: number;
};

export async function fetchWork(): Promise<{
  folders: WorkFolder[];
  samples: WorkSample[];
}> {
  try {
    const [foldersRaw, samplesRaw] = await Promise.all([
      fetchPosts<WPWorkFolderFields>('work_folders'),
      fetchPosts<WPWorkSampleFields>('work_samples'),
    ]);

    // Map WP id → slug so samples can reference their parent by slug.
    const folderSlugById = new Map<number, string>();
    for (const folder of foldersRaw) {
      folderSlugById.set(folder.id, folder.slug);
    }

    const folders: WorkFolder[] = foldersRaw
      .map((p) => ({
        slug: p.slug,
        name: p.title.rendered,
        position: p.fields.position,
        seedDescription: p.fields.seed_description,
      }))
      .sort((a, b) => a.position - b.position);

    const samples: WorkSample[] = samplesRaw
      .map((p) => {
        const parentSlug =
          folderSlugById.get(p.fields.parent_folder_id) ?? '';
        const imageUrl =
          p.fields.image?.sizes.large?.url ??
          p.fields.image?.sizes.full?.url ??
          undefined;
        return {
          id: p.slug || String(p.id),
          parentFolderSlug: parentSlug,
          title: p.title.rendered,
          caption: p.fields.caption,
          imageAlt: p.fields.image?.alt || p.title.rendered,
          imageUrl,
          position: p.fields.position,
        };
      })
      .filter((s) => s.parentFolderSlug)
      .sort((a, b) => a.position - b.position);

    return { folders, samples };
  } catch (err) {
    console.warn('[wp-api] fetchWork failed, using mock data', err);
    return { folders: mockWorkFolders, samples: mockWorkSamples };
  }
}

/* ─── ROLES ───────────────────────────────────────────────────────── */

type WPRoleFields = {
  location: string;
  type: string;
  posted_date: string;
  summary: string;
  description: string;
  application_instructions: string;
  status: string;
  rotation_angle: number;
};

export async function fetchRoles(): Promise<Role[]> {
  try {
    const raw = await fetchPosts<WPRoleFields>('roles');
    const today = new Date().toISOString().slice(0, 10);
    return raw
      .map<Role>((p) => ({
        slug: p.slug || String(p.id),
        title: p.title.rendered,
        location: (p.fields.location || 'Abohar') as RoleLocation,
        type: (p.fields.type || 'Full time') as RoleType,
        postedDate: normaliseAcfDate(p.fields.posted_date) || today,
        summary: p.fields.summary || '',
        description: p.fields.description || '',
        applicationInstructions:
          p.fields.application_instructions ||
          'Send your CV to coffee@giraffe.partners or use the application form below.',
        status: (p.fields.status || 'Open').toLowerCase() as RoleStatus,
        rotationAngle: p.fields.rotation_angle || 0,
      }))
      .sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
      );
  } catch (err) {
    console.warn('[wp-api] fetchRoles failed, using mock data', err);
    return mockRoles;
  }
}

export async function fetchOpenRoles(): Promise<Role[]> {
  const all = await fetchRoles();
  return all.filter((r) => r.status === 'open');
}

/* ─── GALLERY ─────────────────────────────────────────────────────── */

type WPGalleryFields = {
  image: WPImage | null;
  caption: string;
  date_taken: string;
  tags: string[];
};

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  try {
    const raw = await fetchPosts<WPGalleryFields>('gallery_images');
    return raw
      .map<GalleryImage>((p) => {
        const img = p.fields.image;
        const imageUrl =
          img?.sizes.large?.url ?? img?.sizes.full?.url ?? undefined;
        const width = img?.sizes.large?.width ?? img?.sizes.full?.width ?? 0;
        const height =
          img?.sizes.large?.height ?? img?.sizes.full?.height ?? 0;

        const ratio = pickRatio(width, height);

        return {
          id: p.slug || String(p.id),
          caption: p.fields.caption || '',
          dateTaken: normaliseAcfDate(p.fields.date_taken),
          tags: (p.fields.tags || []) as GalleryTag[],
          alt: img?.alt || p.title.rendered,
          imageUrl,
          placeholderTone: 'mid-purple-3',
          ratio,
        };
      })
      .sort(
        (a, b) =>
          new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime(),
      );
  } catch (err) {
    console.warn(
      '[wp-api] fetchGalleryImages failed, using mock data',
      err,
    );
    return mockGalleryImages;
  }
}

function pickRatio(w: number, h: number): GalleryImage['ratio'] {
  if (!w || !h) return '4:5';
  const r = w / h;
  if (r > 1.7) return '16:9';
  if (r > 1.4) return '3:2';
  if (r > 1.2) return '4:3';
  if (r > 0.95) return '1:1';
  if (r > 0.85) return '5:4';
  if (r > 0.7) return '4:5';
  return '3:4';
}
