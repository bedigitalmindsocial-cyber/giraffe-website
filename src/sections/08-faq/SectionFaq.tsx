import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { faqItems } from '@/lib/mock-data';
import { FaqAccordion } from './FaqAccordion';

export function SectionFaq() {
  return (
    <section
      aria-label="Frequently asked questions"
      className="bg-paper text-ink border-y border-rule"
    >
      <div className="container-content section-padding">
        <SectionHeading
          eyebrow="The practical answers."
          heading="The questions you would not ask in a first interview, answered first."
        />
        <Reveal delay={1}>
          <FaqAccordion items={faqItems} />
        </Reveal>
      </div>
    </section>
  );
}
