'use client';
import { Halftone } from '@/components/Halftone';
import { Reveal } from '@/components/Reveal';
import { TimeZoneClocks } from '@/components/TimeZoneClocks';
import { HeroHeadline } from './HeroHeadline';
import { HeroCTA } from '@/components/HeroCTA';

export function SectionHero() {
  return (
    <section
      aria-label="Introduction"
      className="relative bg-deep-purple text-paper overflow-hidden"
    >
      {/* Halftone now constrained to the bottom-left of the section so it
          stays clear of the right column where the morph map lives. */}
      <Halftone
        cols={48}
        rows={32}
        color="#9382AE"
        direction="tr"
        maxR={0.26}
        opacity={0.13}
      />
      <div className="container-content section-padding relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-light">A career that compounds.</p>
            </Reveal>
            <HeroHeadline />
            <Reveal delay={2}>
              <p className="font-sans text-[15px] sm:text-[17px] mt-8 max-w-[640px] text-mid-purple-3 leading-[1.7]">
                We are a brand and communications consultancy working out of
                Abohar for founders and finance firms in India, Singapore, Mauritius, and Quebec. Engagements here run with three or four
                people, a senior partner among them. Most of our people will
                tell you the first year here taught them more than the three
                before it, combined.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p className="font-editorial italic text-[18px] sm:text-[20px] mt-6 max-w-[640px] text-mid-purple-2">
                A senior partner on every brief. No middle layer between the
                team and the founder. The work that ships carries the names of
                the people who built it.
              </p>
            </Reveal>
            
            {/* CTA Buttons */}
            <HeroCTA />
          </div>
          <aside className="lg:col-span-5">
            <TimeZoneClocks />
          </aside>
        </div>
      </div>
    </section>
  );
}
