import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { weekMoments } from '@/lib/mock-data';
import { WeekMomentRow } from './WeekMomentRow';

export function SectionWeek() {
  return (
    <section
      aria-label="A week at Giraffe"
      className="bg-paper text-ink border-y border-rule"
    >
      <div className="container-content section-padding">
        <SectionHeading
          eyebrow="What working here actually looks like."
          heading="Three moments from a working week."
        />

        <div className="space-y-16 md:space-y-24">
          {weekMoments.map((moment, i) => (
            <Reveal key={moment.timestamp} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <WeekMomentRow moment={moment} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
