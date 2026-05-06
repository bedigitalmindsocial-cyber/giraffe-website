'use client';

import { useMemo, useState, useEffect } from 'react';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import type { GalleryImage, GalleryTag } from '@/lib/types';
import { GalleryLoadingSkeleton } from '@/components/GalleryLoadingSkeleton';

type GalleryProps = {
  images: GalleryImage[];
};

const PAGE_SIZE = 12;

export function Gallery({ images }: GalleryProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTag, setActiveTag] = useState<GalleryTag | 'All'>('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setMounted(true);
  }, []);

  const allTags = useMemo<GalleryTag[]>(() => {
    const set = new Set<GalleryTag>();
    images.forEach((img) => img.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [images]);

  const filtered = useMemo(() => {
    if (activeTag === 'All') return images;
    return images.filter((img) => img.tags.includes(activeTag));
  }, [activeTag, images]);

  const shown = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  // Show loading skeleton while mounting
  if (!mounted) {
    return <GalleryLoadingSkeleton />;
  }

  if (images.length === 0) {
    return (
      <p className="font-sans text-body-sm text-mid-purple-1 italic text-center mt-12">
        The gallery is being put together. Check back in a few weeks.
      </p>
    );
  }

  return (
    <>
      <div aria-label="Filter gallery by tag" className="flex flex-wrap gap-2 mb-10">
        <TagChip
          label="All"
          active={activeTag === 'All'}
          onClick={() => {
            setActiveTag('All');
            setVisibleCount(PAGE_SIZE);
          }}
        />
        {allTags.map((tag) => (
          <TagChip
            key={tag}
            label={tag}
            active={activeTag === tag}
            onClick={() => {
              setActiveTag(tag);
              setVisibleCount(PAGE_SIZE);
            }}
          />
        ))}
      </div>

      <ul className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {shown.map((img) => (
          <li
            key={img.id}
            className="mb-6 break-inside-avoid"
          >
            <div className="block w-full text-left">
              <ImagePlaceholder
                alt={img.alt}
                ratio={img.ratio}
                tone={img.placeholderTone}
                src={img.imageUrl}
                className="transition-transform duration-300 ease-out-quart hover:scale-[1.02]"
              />
              <p className="font-sans italic text-mid-purple-1 text-[12px] mt-2">
                {img.caption}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            className="group inline-flex items-center gap-3 bg-accent-purple text-paper font-sans font-medium text-[13px] uppercase tracking-[0.04em] rounded-full px-8 py-4 hover:bg-deep-purple transition-all"
          >
            <span>Show more</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </button>
        </div>
      )}
    </>
  );
}

function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`font-sans font-medium text-[12px] rounded-sm py-2 px-3 transition-colors ${
        active
          ? 'bg-accent-purple text-paper'
          : 'bg-mid-purple-4 text-accent-purple hover:bg-mid-purple-3'
      }`}
    >
      {label}
    </button>
  );
}