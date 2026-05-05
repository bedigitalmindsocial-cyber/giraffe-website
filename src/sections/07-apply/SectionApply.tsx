import { Halftone } from '@/components/Halftone';
import { Reveal } from '@/components/Reveal';
import { fetchOpenRoles } from '@/lib/wp-api';
import { ApplyForm } from './ApplyForm';

export async function SectionApply() {
  const openRoles = await fetchOpenRoles();

  return (
    <section
      id="apply"
      aria-label="Apply"
      className="relative bg-deep-purple text-paper"
    >
      <Halftone
        cols={48}
        rows={32}
        color="#9382AE"
        direction="bl"
        maxR={0.32}
        opacity={0.18}
      />

      <div className="container-content section-padding relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 lg:items-start">
          <div className="lg:col-span-5 lg:order-2 lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <p className="eyebrow eyebrow-light">Ready to apply</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="display-h2 mt-4 text-paper">
                Send us your <em>application</em>.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 font-sans text-[16px] text-mid-purple-2 leading-[1.7]">
                Pick the role that fits and send us your CV. A senior partner
                reads every application within a week. We reply whether or not
                there is a fit.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p className="mt-4 font-sans text-[16px] text-mid-purple-2 leading-[1.7]">
                Still have questions? Keep scrolling. The answers are below.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <p className="mt-6 font-editorial italic text-[16px] text-mid-purple-1">
                We do not run open job listings. We hire when we have a real
                seat and the right person walks in.
              </p>
            </Reveal>
          </div>

          <Reveal delay={2} className="lg:col-span-7 lg:order-1">
            <ApplyForm roles={openRoles} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
