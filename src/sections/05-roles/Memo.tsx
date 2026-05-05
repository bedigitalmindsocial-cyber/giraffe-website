'use client';

import { useId, type CSSProperties } from 'react';
import type { Role } from '@/lib/types';
import { postedRelative, postedStamp } from '@/lib/dateRelative';

type MemoProps = {
  role: Role;
  rotationDeg: number;
  onOpen: () => void;
  /** Stagger delay for the cross-fade-in when a page changes. */
  fadeDelayMs?: number;
};

type CSSVars = CSSProperties & {
  '--rot'?: string;
  '--fade-delay'?: string;
};

export function Memo({ role, rotationDeg, onOpen, fadeDelayMs = 0 }: MemoProps) {
  const titleId = useId();
  const stamp = postedStamp(role.postedDate);
  const relative = postedRelative(role.postedDate);

  const style: CSSVars = {
    '--rot': `${rotationDeg}deg`,
    '--fade-delay': `${fadeDelayMs}ms`,
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-labelledby={titleId}
      style={style}
      className="memo group relative block w-[280px] h-[340px] bg-paper border border-rule shadow-memo p-5 text-left [transform:rotate(var(--rot))] hover:[transform:rotate(0deg)_scale(1.05)] hover:shadow-memo-hover hover:z-30 transition-all duration-[250ms] ease-out-quart focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-purple focus-visible:outline-offset-2"
    >
      {/* Thumbtack */}
      <span
        aria-hidden="true"
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-purple border border-deep-purple shadow-[1px_2px_3px_rgba(15,10,26,0.35)]"
      >
        <span className="absolute top-[2px] left-[2px] w-1 h-1 rounded-full bg-mid-purple-2" />
      </span>

      {/* Posted stamp */}
      <p
        aria-hidden="true"
        className="absolute right-4 top-3 font-mono text-memo-stamp text-mid-purple-2 uppercase rotate-[-1.5deg]"
      >
        {stamp}
      </p>

      <div className="mt-6">
        <h3
          id={titleId}
          className="font-mono text-memo-title font-bold text-ink uppercase leading-tight"
        >
          {role.title}
        </h3>

        <p className="mt-1 font-mono text-memo-meta text-mid-purple-1 uppercase tracking-wide">
          {role.location} <span aria-hidden="true">·</span> {role.type}{' '}
          <span aria-hidden="true">·</span> {relative}
        </p>

        <hr className="my-3 border-rule" />

        <p className="font-mono text-memo-body text-ink leading-[1.6] line-clamp-3">
          {role.summary}
        </p>

        <p className="mt-3 font-mono text-memo-cta text-accent-purple uppercase tracking-wide">
          → Read full role
        </p>
      </div>
    </button>
  );
}
