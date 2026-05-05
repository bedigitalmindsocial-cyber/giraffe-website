import { roles } from './mock-data';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Giraffe Partners',
    description:
      'A consultancy that works with brands and serious businesses across India, Mauritius, Dubai, and London.',
    email: 'coffee@giraffe.partners',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abohar',
      addressRegion: 'Punjab',
      addressCountry: 'IN',
    },
  } as const;
}

export function jobPostingSchemas() {
  return roles
    .filter((r) => r.status === 'open')
    .map((role) => ({
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: role.title,
      description: role.description,
      datePosted: role.postedDate,
      employmentType:
        role.type === 'Full time'
          ? 'FULL_TIME'
          : role.type === 'Part time'
            ? 'PART_TIME'
            : 'CONTRACTOR',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Giraffe Partners',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: role.location === 'Remote' ? 'Remote' : 'Abohar',
          addressRegion: 'Punjab',
          addressCountry: 'IN',
        },
      },
      jobLocationType: role.location === 'Remote' ? 'TELECOMMUTE' : undefined,
    }));
}
