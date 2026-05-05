type Tone = 'mid-purple-3' | 'mid-purple-4' | 'mid-purple-5' | 'cork-base';
type Ratio =
  | '1:1'
  | '3:4'
  | '4:5'
  | '4:3'
  | '3:2'
  | '16:9'
  | '5:4';

type ImagePlaceholderProps = {
  alt: string;
  caption?: string;
  tone?: Tone;
  ratio?: Ratio;
  className?: string;
  /** When provided, the real image is rendered. The tone is still used as a
   *  background colour while the image loads. */
  src?: string;
};

const toneToBg: Record<Tone, string> = {
  'mid-purple-3': 'bg-mid-purple-3',
  'mid-purple-4': 'bg-mid-purple-4',
  'mid-purple-5': 'bg-mid-purple-5',
  'cork-base': 'bg-cork-base',
};

const ratioToClass: Record<Ratio, string> = {
  '1:1': 'aspect-square',
  '3:4': 'aspect-[3/4]',
  '4:5': 'aspect-[4/5]',
  '4:3': 'aspect-[4/3]',
  '3:2': 'aspect-[3/2]',
  '16:9': 'aspect-[16/9]',
  '5:4': 'aspect-[5/4]',
};

/**
 * Image slot for the LWG site.
 * - With `src`: renders the real image, object-cover, alt text on the img.
 * - Without `src`: renders a flat-tone placeholder block sized to its
 *   aspect ratio, with the alt text visible inside.
 *
 * Either way it occupies the same physical space, so layouts don't shift
 * when real images get uploaded.
 */
export function ImagePlaceholder({
  alt,
  caption,
  tone = 'mid-purple-3',
  ratio = '4:5',
  className = '',
  src,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div
        className={`relative w-full ${ratioToClass[ratio]} ${toneToBg[tone]} overflow-hidden ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  const inlineLabel = caption ?? alt;

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full ${ratioToClass[ratio]} ${toneToBg[tone]} ${className}`}
    >
      <span className="absolute inset-0 flex items-end p-3 font-mono text-[11px] uppercase tracking-wider text-ink/55">
        {inlineLabel}
      </span>
    </div>
  );
}
