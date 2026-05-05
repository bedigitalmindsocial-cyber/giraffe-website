import { Halftone } from '@/components/Halftone';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { fetchWork } from '@/lib/wp-api';
import { WorkDesktop } from './WorkDesktop';

export async function SectionWork() {
  const { folders, samples } = await fetchWork();

  return (
    <section
      id="work"
      aria-label="The work"
      className="relative bg-mid-purple-5 text-ink overflow-hidden"
    >
      <Halftone
        cols={42}
        rows={28}
        color="#DBD5E4"
        direction="br"
        maxR={0.32}
        opacity={0.55}
      />
      <div className="container-content section-padding relative z-[1]">
        <SectionHeading
          eyebrow="The work, organised the way we used to organise everything."
          heading="A folder for everything we have shipped."
          body="Click into any folder. Inside is a working sample, a short note about what it was, and the kind of brief it answered."
        />

        <Reveal delay={1}>
          <WorkDesktop folders={folders} samples={samples} />
        </Reveal>
      </div>
    </section>
  );
}
