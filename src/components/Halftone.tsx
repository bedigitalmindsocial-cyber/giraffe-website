type Direction =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'tl'
  | 'tr'
  | 'bl'
  | 'br'
  | 'center';

type HalftoneProps = {
  cols?: number;
  rows?: number;
  color?: string;
  direction?: Direction;
  /** Max dot radius as a fraction of the cell (default 0.42). */
  maxR?: number;
  opacity?: number;
  className?: string;
};

/**
 * SSR-safe port of the giraffe.partners halftone painter. Generates an SVG
 * grid of dots whose radius varies with a directional gradient, the brand's
 * signature pattern from the visiting cards.
 */
export function Halftone({
  cols = 36,
  rows = 18,
  color = '#4B2F79',
  direction = 'bottom',
  maxR = 0.42,
  opacity = 1,
  className = '',
}: HalftoneProps) {
  const dots: { cx: number; cy: number; r: number }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = (c + 0.5) / cols;
      const v = (r + 0.5) / rows;
      let f: number;
      switch (direction) {
        case 'top': f = 1 - v; break;
        case 'bottom': f = v; break;
        case 'left': f = 1 - u; break;
        case 'right': f = u; break;
        case 'tl': f = ((1 - u) + (1 - v)) / 2; break;
        case 'tr': f = (u + (1 - v)) / 2; break;
        case 'bl': f = ((1 - u) + v) / 2; break;
        case 'br': f = (u + v) / 2; break;
        case 'center': {
          const dx = u - 0.5;
          const dy = v - 0.5;
          f = 1 - Math.min(1, Math.sqrt(dx * dx + dy * dy) * 2);
          break;
        }
        default: f = v;
      }
      const radius = Math.pow(Math.max(0, f), 1.4) * maxR;
      if (radius < 0.04) continue;
      dots.push({ cx: c + 0.5, cy: r + 0.5, r: parseFloat(radius.toFixed(3)) });
    }
  }

  return (
    <div className={`halftone ${className}`} aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${cols} ${rows}`}
        preserveAspectRatio="none"
        style={{ opacity }}
      >
        <g fill={color}>
          {dots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={d.r} />
          ))}
        </g>
      </svg>
    </div>
  );
}
