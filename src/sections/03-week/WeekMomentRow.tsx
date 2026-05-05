import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import type { WeekMoment } from '@/lib/types';

type WeekMomentRowProps = {
  moment: WeekMoment;
};

export function WeekMomentRow({ moment }: WeekMomentRowProps) {
  const photoLeft = moment.photoSide === 'left';

  // Source order is photo → text. Visual side is set with `order` so the
  // alternation is layout-only. Flex avoids the col-start vs col-span
  // shorthand conflict the grid version was hitting.
  const photoOrder = photoLeft ? 'md:order-1' : 'md:order-2';
  const textOrder = photoLeft ? 'md:order-2' : 'md:order-1';

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
      <div className={`relative md:w-5/12 md:flex-shrink-0 ${photoOrder}`}>
        <span
          aria-hidden="true"
          className="hidden md:block absolute -left-2 top-0 bottom-0 w-px bg-accent-purple"
        />
        <ImagePlaceholder
          alt={moment.photoAlt}
          ratio="4:5"
          tone="mid-purple-3"
        />
      </div>

      <div className={`md:flex-1 md:sticky md:top-24 md:self-start ${textOrder}`}>
        <p className="font-mono uppercase tracking-[0.05em] text-[13px] text-mid-purple-1">
          {moment.timestamp}
        </p>
        <h3 className="font-editorial italic text-accent-purple text-[26px] leading-[1.3] mt-2">
          {moment.headline}
        </h3>
        <p className="font-sans text-body-sm text-ink mt-4 leading-[1.7]">
          {moment.body}
        </p>
      </div>
    </div>
  );
}
