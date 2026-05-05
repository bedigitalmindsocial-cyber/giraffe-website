'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import type { Role } from '@/lib/types';
import { Memo } from './Memo';
import { RoleDetailModal } from './RoleDetailModal';
import { slotsFor } from './memoSlots';
import { dispatchApplyRole } from '@/lib/applyEvent';

type CorkboardProps = {
  roles: Role[];
};

const PER_PAGE = 3;

export function Corkboard({ roles }: CorkboardProps) {
  const [page, setPage] = useState(0);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(roles.length / PER_PAGE));
  const start = page * PER_PAGE;
  const visible = roles.slice(start, start + PER_PAGE);
  const slots = useMemo(() => slotsFor(visible.length), [visible.length]);

  const openRole = roles.find((r) => r.slug === openSlug) ?? null;

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const empty = roles.length === 0;

  return (
    <div className="relative">
      {/* Wooden frame */}
      <div className="relative bg-wooden-frame rounded-sm p-[6px] md:p-[10px] max-w-corkboard mx-auto shadow-[inset_0_0_0_1px_rgba(15,10,26,0.1)]">
        {/* Cork base */}
        <div
          className="cork-texture relative w-full overflow-hidden rounded-[2px]"
          style={{ minHeight: '480px' }}
        >
          {empty ? <EmptyMemo /> : null}

          {!empty &&
            visible.map((role, i) => {
              const slot = slots[i];
              const positionStyle: CSSProperties = {
                left: `${slot.leftPct}%`,
                top: `${slot.topPct}%`,
                animation: 'memoFadeIn 250ms ease-out both',
                animationDelay: `${i * 100}ms`,
              };
              return (
                <div
                  key={role.slug}
                  className="absolute hidden md:block"
                  style={positionStyle}
                >
                  <Memo
                    role={role}
                    rotationDeg={role.rotationAngle}
                    onOpen={() => setOpenSlug(role.slug)}
                    fadeDelayMs={i * 100}
                  />
                </div>
              );
            })}

          {/* Mobile: stack memos vertically */}
          {!empty && (
            <div className="md:hidden flex flex-col items-center gap-10 py-12">
              {visible.map((role, i) => (
                <Memo
                  key={role.slug}
                  role={role}
                  rotationDeg={role.rotationAngle}
                  onOpen={() => setOpenSlug(role.slug)}
                  fadeDelayMs={i * 100}
                />
              ))}
            </div>
          )}

          {/* Pagination arrows on the frame (desktop) */}
          {!empty && totalPages > 1 && (
            <>
              <button
                type="button"
                onClick={() => canPrev && setPage(page - 1)}
                disabled={!canPrev}
                aria-label="Previous roles"
                className="hidden md:flex absolute -left-7 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-wooden-frame border-2 border-paper items-center justify-center text-paper shadow-[0_4px_12px_rgba(15,10,26,0.3)] hover:bg-wooden-frame-hover hover:scale-110 transition-all disabled:opacity-25 disabled:hover:scale-100 disabled:hover:bg-wooden-frame"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <polygon points="16,4 6,12 16,20" fill="currentColor" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => canNext && setPage(page + 1)}
                disabled={!canNext}
                aria-label="Next roles"
                className="hidden md:flex absolute -right-7 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-wooden-frame border-2 border-paper items-center justify-center text-paper shadow-[0_4px_12px_rgba(15,10,26,0.3)] hover:bg-wooden-frame-hover hover:scale-110 transition-all disabled:opacity-25 disabled:hover:scale-100 disabled:hover:bg-wooden-frame"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <polygon points="8,4 18,12 8,20" fill="currentColor" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Pagination arrows below corkboard (mobile) */}
      {!empty && totalPages > 1 && (
        <div className="md:hidden flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => canPrev && setPage(page - 1)}
            disabled={!canPrev}
            aria-label="Previous roles"
            className="w-12 h-12 rounded-full bg-wooden-frame border-2 border-paper text-paper inline-flex items-center justify-center disabled:opacity-25"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <polygon points="16,4 6,12 16,20" fill="currentColor" />
            </svg>
          </button>
          <p className="font-mono text-[12px] text-mid-purple-1 uppercase tracking-wide">
            Page {page + 1} of {totalPages}
          </p>
          <button
            type="button"
            onClick={() => canNext && setPage(page + 1)}
            disabled={!canNext}
            aria-label="Next roles"
            className="w-12 h-12 rounded-full bg-wooden-frame border-2 border-paper text-paper inline-flex items-center justify-center disabled:opacity-25"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <polygon points="8,4 18,12 8,20" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}

      <RoleDetailModal role={openRole} onClose={() => setOpenSlug(null)} />
    </div>
  );
}

function EmptyMemo() {
  const handleSayHello = () => {
    dispatchApplyRole('general');
    setTimeout(() => {
      const target = document.getElementById('apply');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="memo relative block w-[300px] bg-paper border border-rule shadow-memo p-6 rotate-[-1deg]">
        <span
          aria-hidden="true"
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-purple border border-deep-purple shadow-[1px_2px_3px_rgba(15,10,26,0.35)]"
        >
          <span className="absolute top-[2px] left-[2px] w-1 h-1 rounded-full bg-mid-purple-2" />
        </span>
        <p className="font-mono text-memo-stamp text-mid-purple-2 uppercase">
          Posted right now
        </p>
        <h3 className="mt-3 font-mono text-memo-title font-bold text-ink uppercase">
          No roles open
        </h3>
        <hr className="my-3 border-rule" />
        <p className="font-mono text-memo-body text-ink leading-[1.6]">
          The team is fully staffed at the moment.
        </p>
        <p className="mt-3 font-mono text-memo-body text-ink leading-[1.6]">
          We still read every email at{' '}
          <a
            href="mailto:coffee@giraffe.partners"
            className="underline text-accent-purple"
          >
            coffee@giraffe.partners
          </a>
          . Send a note if any of this resonated. We hire when a real seat
          opens.
        </p>
        <button
          type="button"
          onClick={handleSayHello}
          className="mt-4 font-mono text-memo-cta text-accent-purple uppercase tracking-wide hover:text-deep-purple"
        >
          → Say hello anyway
        </button>
      </div>
    </div>
  );
}
