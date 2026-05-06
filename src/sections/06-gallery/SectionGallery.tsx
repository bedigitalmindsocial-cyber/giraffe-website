import { SectionHeading } from '@/components/SectionHeading';
import { fetchGalleryImages } from '@/lib/wp-api';
import { Gallery } from './Gallery';

export async function SectionGallery() {
  const images = await fetchGalleryImages();

  return (
    <section id="gallery" aria-label="Life at Giraffe" className="bg-paper text-ink">
      <div className="container-content section-padding">
        <SectionHeading
          eyebrow="The working life."
          heading="The work, the team, the days in between."
          body="Photographs from the working life of the firm. Project handoffs. The occasional team dinner. The Diwali week."
        />
        <Gallery images={images} />
      </div>
    </section>
  );
}