'use client';

import { useEffect, useCallback } from 'react';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import type { GalleryImage } from '@/lib/types';

type GalleryLightboxProps = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function GalleryLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const open = index !== null;
  const current = open ? images[index] : null;

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, handleKey]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/85 p-4 sm:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center text-paper hover:bg-paper/10 rounded-sm font-sans text-2xl"
      >
        ×
      </button>

      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous image"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 inline-flex items-center justify-center text-paper hover:bg-paper/10 rounded-full"
      >
        <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true">
          <polygon points="9,2 3,6 9,10" fill="currentColor" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next image"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 inline-flex items-center justify-center text-paper hover:bg-paper/10 rounded-full"
      >
        <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true">
          <polygon points="3,2 9,6 3,10" fill="currentColor" />
        </svg>
      </button>

      <div className="max-w-3xl w-full max-h-[80vh] flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <ImagePlaceholder
            alt={current.alt}
            ratio={current.ratio}
            tone={current.placeholderTone}
            src={current.imageUrl}
          />
        </div>
        <p className="mt-4 font-sans italic text-mid-purple-2 text-[14px] text-center max-w-prose">
          {current.caption}
        </p>
      </div>
    </div>
  );
}
