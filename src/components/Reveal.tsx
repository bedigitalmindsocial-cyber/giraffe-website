'use client';

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in 1..5 — maps to .delay-1 ... .delay-5. */
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  /** Render as a different tag (default div). */
  as?: ElementType;
  className?: string;
  id?: string;
};

/**
 * Wraps children in a `.reveal` element that fades up when scrolled into
 * view. Matches the giraffe.partners pattern exactly:
 *   - threshold 0.18, rootMargin '0px 0px -8% 0px'
 *   - 0.95s ease-out-quart transition
 *   - delay-1..5 stagger (0.08s steps)
 *   - unobserved once revealed (one-shot)
 *
 * For repeated stagger inside a section, give each child its own <Reveal delay={n}>.
 */
export function Reveal({
  children,
  delay = 0,
  as,
  className = '',
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      node.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Tag = (as ?? 'div') as ElementType;
  const delayClass = delay > 0 ? `delay-${delay}` : '';

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal ${delayClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
