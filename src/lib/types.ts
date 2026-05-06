// Shared types for content the CMS will eventually own.
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
  postedDate: string;
  summary: string;
  description: string;
  applicationInstructions: string;
  status: RoleStatus;
  rotationAngle: number;
};

export type GalleryTag = 'Team' | 'Client work' | 'Office' | 'Travel' | 'Festivals';

export type GalleryImage = {
  id: string;
  caption: string;
  dateTaken: string;
  tags: GalleryTag[];
  alt: string;
  imageUrl?: string;
  placeholderTone: 'mid-purple-3' | 'mid-purple-4' | 'mid-purple-5' | 'cork-base';
  ratio: '1:1' | '3:4' | '4:5' | '4:3' | '3:2' | '16:9' | '5:4';
};

// SINGLE UNIFIED TEAMEMBER TYPE - NO DUPLICATES
export type TeamMember = {
  id: number;
  name: string;
  role: string;
  primaryImageSrc: string;
  primaryAlt: string;
  rotation: number;
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