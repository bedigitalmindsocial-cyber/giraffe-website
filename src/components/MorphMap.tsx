'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Point = { x: number; y: number };
type Polygon = Array<[number, number]>;
type ShapeDef = {
  label: string;
  positive: Polygon[];
  negative?: Polygon[];
};

/**
 * Hand-authored shape outlines in a 0–100 normalised square. Each shape is
 * built from one or more "positive" polygons (where dots can land) and
 * optionally "negative" polygons (cutouts, e.g. the Thames running through
 * London). All shapes are stylised, not cartographically exact.
 */
const SHAPES: ShapeDef[] = [
  {
    label: 'LONDON',
    positive: [
      [
        [50, 12], [70, 14], [85, 22], [92, 35], [90, 50],
        [88, 65], [82, 75], [68, 82], [50, 85], [32, 82],
        [18, 75], [12, 65], [10, 50], [12, 35], [20, 22], [35, 14],
      ],
    ],
    negative: [
      // Wavy Thames cutout running west to east
      [
        [10, 50], [22, 52], [34, 49], [46, 51], [58, 48],
        [70, 51], [82, 50], [92, 52],
        [92, 56], [82, 56], [70, 55], [58, 55],
        [46, 56], [34, 53], [22, 56], [10, 54],
      ],
    ],
  },
  {
    label: 'MAURITIUS',
    positive: [
      [
        [50, 22], [62, 26], [70, 36], [72, 50], [68, 64],
        [58, 74], [44, 76], [32, 70], [28, 56], [30, 42],
        [38, 30],
      ],
    ],
  },
  {
    label: 'DUBAI',
    positive: [
      // Coastal strip — diagonal NE–SW belt
      [
        [8, 60], [28, 50], [50, 40], [72, 30], [88, 32],
        [90, 42], [82, 55], [62, 68], [40, 75], [18, 78],
        [8, 72],
      ],
      // Palm Jumeirah — small offshore blob
      [
        [60, 78], [70, 78], [76, 84], [70, 90], [62, 90], [56, 84],
      ],
    ],
  },
  {
    label: 'INDIA',
    positive: [
      [
        [22, 12], [42, 8], [62, 12], [78, 18], [88, 28],
        [82, 42], [78, 55], [66, 70], [52, 88], [42, 80],
        [32, 65], [24, 50], [16, 35], [14, 22],
      ],
    ],
  },
];

const DOT_COUNT = 240;

function pointInPolygon(point: Point, polygon: Polygon): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isInShape(p: Point, shape: ShapeDef): boolean {
  const inPositive = shape.positive.some((poly) => pointInPolygon(p, poly));
  if (!inPositive) return false;
  if (shape.negative?.some((poly) => pointInPolygon(p, poly))) return false;
  return true;
}

// Seeded LCG so dot positions are stable across renders.
function seededRandom(seed: number) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function sampleShape(shape: ShapeDef, count: number, seed: number): Point[] {
  const random = seededRandom(seed);
  const result: Point[] = [];
  let attempts = 0;
  const maxAttempts = count * 200;
  while (result.length < count && attempts < maxAttempts) {
    const x = random() * 100;
    const y = random() * 100;
    if (isInShape({ x, y }, shape)) {
      result.push({ x, y });
    }
    attempts++;
  }
  // If we couldn't sample enough (very small shape), pad with last point
  while (result.length < count) {
    result.push(result[result.length - 1] ?? { x: 50, y: 50 });
  }
  return result;
}

// Pre-compute dots for each shape at module load.
const SHAPE_DOTS = SHAPES.map((shape, i) => ({
  label: shape.label,
  dots: sampleShape(shape, DOT_COUNT, 9001 + i * 137),
}));

function generateScatter(seed: number): Point[] {
  const random = seededRandom(seed);
  const out: Point[] = [];
  for (let i = 0; i < DOT_COUNT; i++) {
    out.push({
      x: 5 + random() * 90,
      y: 5 + random() * 90,
    });
  }
  return out;
}

// Per-dot transition delay so the scatter and rejoin feel organic, not synced.
function generateDelays(seed: number): number[] {
  const random = seededRandom(seed);
  return Array.from({ length: DOT_COUNT }, () =>
    Math.round(random() * 280),
  );
}

const HOLD_MS = 2000;
const SCATTER_MS = 700;
const REJOIN_MS = 700;

export function MorphMap() {
  const [shapeIndex, setShapeIndex] = useState(0);
  const [phase, setPhase] = useState<'show' | 'scatter'>('show');
  const scatterRef = useRef<Point[]>(generateScatter(11));
  const [scatterTick, setScatterTick] = useState(0);

  const delays = useMemo(() => generateDelays(7), []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // Honour reduced motion — no animation cycle

    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      // Show phase
      setPhase('show');
      timer = setTimeout(() => {
        // Scatter phase
        scatterRef.current = generateScatter(Date.now());
        setScatterTick((t) => t + 1);
        setPhase('scatter');
        timer = setTimeout(() => {
          // Move to next shape — entering 'show' again triggers the rejoin
          setShapeIndex((s) => (s + 1) % SHAPES.length);
          tick();
        }, SCATTER_MS);
      }, HOLD_MS + REJOIN_MS); // Hold, plus the time the rejoin transition is visible
    };

    tick();
    return () => clearTimeout(timer);
  }, []);

  const current = SHAPE_DOTS[shapeIndex];
  const positions =
    phase === 'show' ? current.dots : scatterRef.current;

  // Re-render key forces React to keep dot identity stable across phases
  const renderKey = `${phase}-${shapeIndex}-${scatterTick}`;

  return (
    <figure className="w-full">
      <div className="relative w-full aspect-square">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label={`Map of ${current.label}`}
          key={renderKey}
        >
          <g fill="#FAF9FC">
            {positions.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={0.55}
                style={{
                  transition: `cx ${SCATTER_MS}ms cubic-bezier(.4, 0, .2, 1) ${delays[i]}ms, cy ${SCATTER_MS}ms cubic-bezier(.4, 0, .2, 1) ${delays[i]}ms`,
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      <figcaption
        aria-live="polite"
        className="mt-6 text-center font-mono text-[14px] tracking-[0.32em] uppercase text-paper transition-opacity duration-500"
        style={{ opacity: phase === 'show' ? 1 : 0 }}
      >
        {current.label}
      </figcaption>
    </figure>
  );
}
