import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  body?: string;
  tone?: 'dark' | 'light';
};

export function SectionHeading({
  eyebrow,
  heading,
  body,
  tone = 'dark',
}: SectionHeadingProps) {
  const eyebrowClass = tone === 'light' ? 'eyebrow eyebrow-light' : 'eyebrow';
  const headingColour = tone === 'light' ? 'text-paper' : 'text-ink';
  const bodyColour =
    tone === 'light' ? 'text-mid-purple-2' : 'text-ink/70';

  return (
    <div className="max-w-[820px] mb-12 md:mb-16 lg:mb-20">
      <Reveal>
        <p className={eyebrowClass}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className={`display-h2 mt-4 ${headingColour}`}>{heading}</h2>
      </Reveal>
      {body && (
        <Reveal delay={2}>
          <p
            className={`font-sans mt-6 text-[16px] md:text-[17px] leading-[1.7] max-w-prose ${bodyColour}`}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
