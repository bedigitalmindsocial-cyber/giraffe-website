'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero CTA Section
 * Two buttons: "Join Our Team" (primary) and "See Our Work" (secondary)
 * - Primary button scrolls to #apply section
 * - Secondary button scrolls to #work section with same hover as primary
 * - Uses existing .btn-primary style and custom secondary style
 * - Added to hero section with proper spacing
 */
export function HeroCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const node = containerRef.current;
    if (!node) return;

    // Trigger reveal animation after a slight delay
    const id = setTimeout(
      () => {
        node.classList.add('is-in');
      },
      reduce ? 0 : 800, // Stagger after headline animation
    );

    return () => clearTimeout(id);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="reveal flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start items-center mt-12 sm:mt-16"
    >
      {/* Primary CTA Button - Join Our Team */}
      <a
        href="#apply"
        onClick={(e) => handleScroll(e, 'apply')}
        className="btn-primary"
      >
        Join Our Team
        <span className="arrow">→</span>
      </a>

      {/* Secondary CTA Button - See Our Work */}
      <a
        href="#work"
        onClick={(e) => handleScroll(e, 'work')}
        className="btn-secondary"
      >
        See Our Work
        <span className="arrow">→</span>
      </a>
    </div>
  );
}
