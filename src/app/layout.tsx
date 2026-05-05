import type { Metadata } from 'next';
import {
  Bebas_Neue,
  DM_Sans,
  JetBrains_Mono,
  Playfair_Display,
} from 'next/font/google';
import { CursorSystem } from '@/components/CursorSystem';
import { Navigation } from '@/components/Navigation';
import { jobPostingSchemas, organizationSchema } from '@/lib/schema';
import './globals.css';

const display = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const editorial = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
  display: 'swap',
});

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Life with Giraffe',
  description:
    'A consultancy that works with brands and serious businesses across India, Mauritius, Dubai, and London. Built for people who want their work to carry their name from day one.',
  openGraph: {
    title: 'Life with Giraffe',
    description:
      'A consultancy that works with brands and serious businesses across India, Mauritius, Dubai, and London. Built for people who want their work to carry their name from day one.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Life with Giraffe',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = organizationSchema();
  const jobSchemas = jobPostingSchemas();

  return (
    <html
      lang="en"
      className={`${display.variable} ${editorial.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {jobSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <CursorSystem />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
