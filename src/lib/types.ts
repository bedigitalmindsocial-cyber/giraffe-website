// Shared types for content the CMS will eventually own.
// Today these are populated from src/lib/mock-data.ts.

export type WorkFolder = {
  slug: string;
  name: string;
  position: number;
  seedDescription: string;
};

export type WorkSample = {
  id: string;
  parentFolderSlug: string;
  title: string;
  caption: string;
  imageAlt: string;
  /** When set, render the real image. Otherwise fall back to the placeholder swatch. */
  imageUrl?: string;
  position: number;
};

export type RoleStatus = 'open' | 'closed';
export type RoleLocation = 'Abohar' | 'Remote' | 'Hybrid';
export type RoleType = 'Full time' | 'Part time' | 'Contract';

export type Role = {
  slug: string;
  title: string;
  location: RoleLocation;
  type: RoleType;
  postedDate: string; // ISO date
  summary: string;
  description: string; // plain text or markdown-flavoured for the modal
  applicationInstructions: string;
  status: RoleStatus;
  rotationAngle: number; // -2 to +2 degrees, fixed per role
};

export type GalleryTag =
  | 'Team'
  | 'Client work'
  | 'Office'
  | 'Travel'
  | 'Festivals';

export type GalleryImage = {
  id: string;
  caption: string;
  dateTaken: string; // ISO date
  tags: GalleryTag[];
  alt: string;
  /** When set, render the real image. Otherwise the placeholder swatch shows. */
  imageUrl?: string;
  // For real images, we'd store a src; placeholder swatches use a colour token instead
  placeholderTone: 'mid-purple-3' | 'mid-purple-4' | 'mid-purple-5' | 'cork-base';
  // Aspect ratio drives masonry height variation (and matches the real image when uploaded)
  ratio: '1:1' | '3:4' | '4:5' | '4:3' | '3:2' | '16:9' | '5:4';
};

export type TeamMember = {
  name: string;
  role: string;
  paragraph: string;
  detailLines: { label: string; value: string }[];
  primaryAlt: string;
  secondaryAlt: string;
  secondaryAltHover: string;
  /** Path to portrait photo under /public, e.g. '/team/lovish.jpg'.
   *  Optional — falls back to the placeholder swatch if absent. */
  primaryImageSrc?: string;
};

export type WeekMoment = {
  timestamp: string;
  headline: string;
  body: string;
  photoAlt: string;
  photoSide: 'left' | 'right';
};

export type FaqItem = {
  question: string;
  answer: string;
};
