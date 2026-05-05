'use client';

import { useEffect, useState } from 'react';

type Zone = {
  city: string;
  timeZone: string;
};

const ZONES: Zone[] = [
  { city: 'India', timeZone: 'Asia/Kolkata' },
  { city: 'Singapore', timeZone: 'Asia/Singapore' },
  { city: 'Mauritius', timeZone: 'Indian/Mauritius' },
  { city: 'Quebec', timeZone: 'America/Toronto' },
];

type Time = { h: number; m: number; s: number };

const ZERO_TIME: Time = { h: 0, m: 0, s: 0 };

function readTime(timeZone: string): Time {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { h: get('hour') % 24, m: get('minute'), s: get('second') };
}

function readOffset(timeZone: string): string {
  try {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
    });
    const parts = fmt.formatToParts(new Date());
    const offset = parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
    // Normalise: "GMT+5:30" → "GMT+5:30", "GMT" → "GMT+0"
    return offset === 'GMT' ? 'GMT+0' : offset;
  } catch {
    return '';
  }
}

export function TimeZoneClocks() {
  return (
    <figure className="w-full">
      <figcaption className="text-center font-mono text-[11px] tracking-[0.32em] uppercase text-paper mb-8 md:mb-10 ps-[0.32em]">
        Where the clients are, right now.
      </figcaption>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 max-w-md mx-auto">
        {ZONES.map((zone, i) => (
          <Clock key={zone.timeZone} zone={zone} index={i} />
        ))}
      </div>
    </figure>
  );
}

function Clock({ zone, index }: { zone: Zone; index: number }) {
  // Start at zero so SSR and the first client render agree, then update on mount.
  const [time, setTime] = useState<Time>(ZERO_TIME);
  const [offset, setOffset] = useState<string>('');

  useEffect(() => {
    setTime(readTime(zone.timeZone));
    setOffset(readOffset(zone.timeZone));
    const id = setInterval(() => {
      setTime(readTime(zone.timeZone));
    }, 1000);
    return () => clearInterval(id);
  }, [zone.timeZone]);

  const hourAngle = ((time.h % 12) * 30) + time.m * 0.5;
  const minuteAngle = time.m * 6 + time.s * 0.1;
  const secondAngle = time.s * 6;

  const digital = `${String(time.h).padStart(2, '0')}:${String(time.m).padStart(2, '0')}`;

  return (
    <div
      className="flex flex-col items-center gap-4 stamp-in"
      style={{ animationDelay: `${index * 220}ms` }}
    >
      <div className="text-center">
        <p className="font-mono text-[14px] tracking-[0.22em] uppercase text-paper">
          {zone.city}
        </p>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mid-purple-1 mt-1">
          {offset || ' '}
        </p>
      </div>

      <svg
        viewBox="-50 -50 100 100"
        className="w-full max-w-[160px] aspect-square"
        role="img"
        aria-label={`Analog clock showing ${zone.city} time`}
      >
        {/* Face */}
        <circle
          cx="0"
          cy="0"
          r="46"
          fill="rgba(250, 249, 252, 0.04)"
          stroke="#9382AE"
          strokeWidth="0.8"
        />

        {/* Hour ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = ((i * 30 - 90) * Math.PI) / 180;
          const cos = Math.cos(a);
          const sin = Math.sin(a);
          const isMain = i % 3 === 0;
          const inner = isMain ? 38 : 41;
          const outer = 45;
          return (
            <line
              key={i}
              x1={inner * cos}
              y1={inner * sin}
              x2={outer * cos}
              y2={outer * sin}
              stroke="#FAF9FC"
              strokeWidth={isMain ? 1.2 : 0.5}
              opacity={isMain ? 0.85 : 0.4}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-22"
          stroke="#FAF9FC"
          strokeWidth="2.4"
          strokeLinecap="round"
          transform={`rotate(${hourAngle})`}
        />

        {/* Minute hand */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-32"
          stroke="#FAF9FC"
          strokeWidth="1.4"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle})`}
        />

        {/* Second hand */}
        <line
          x1="0"
          y1="6"
          x2="0"
          y2="-37"
          stroke="#DBD5E4"
          strokeWidth="0.7"
          strokeLinecap="round"
          transform={`rotate(${secondAngle})`}
        />

        {/* Center cap */}
        <circle cx="0" cy="0" r="1.8" fill="#FAF9FC" />
        <circle cx="0" cy="0" r="0.8" fill="#2A1D4B" />
      </svg>

      <p className="font-mono text-[20px] text-paper tracking-[0.08em] tabular-nums">
        {digital}
      </p>
    </div>
  );
}
