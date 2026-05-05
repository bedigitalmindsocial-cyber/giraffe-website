'use client';

import { useEffect } from 'react';

/**
 * Custom cursor matching the giraffe.partners pattern:
 * - 10px brand-purple dot following the mouse exactly (mix-blend-mode: multiply)
 * - 5px lighter purple "trail" lerping behind at 0.12 factor
 * - Both grow / change colour when hovering links and buttons (.is-link)
 * - Disabled entirely on coarse pointers (touch devices)
 *
 * Body has `cursor: none` set in globals.css so the native cursor is hidden.
 */
export function CursorSystem() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
    if (!cursor || !trail) return;

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;
    let raf: number;

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const loop = () => {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    // Event delegation: any pointer over an interactive element grows the cursor
    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;
      if (target.closest('a, button, [role="button"], input, select, textarea, label')) {
        cursor.classList.add('is-link');
      }
    };
    const onOut = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const related = event.relatedTarget as Element | null;
      if (!target) return;
      if (
        target.closest('a, button, [role="button"], input, select, textarea, label') &&
        !related?.closest('a, button, [role="button"], input, select, textarea, label')
      ) {
        cursor.classList.remove('is-link');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor" className="cursor" aria-hidden="true" />
      <div id="cursor-trail" className="cursor-trail" aria-hidden="true" />
    </>
  );
}
