export function GalleryLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Tag chips skeleton */}
      <div className="flex flex-wrap gap-2 mb-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-mid-purple-4 rounded-sm animate-pulse"
          />
        ))}
      </div>

      {/* Gallery grid skeleton */}
      <ul className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {[...Array(12)].map((_, i) => (
          <li key={i} className="mb-6 break-inside-avoid">
            <div className="space-y-2">
              {/* Image placeholder */}
              <div className="w-full aspect-[4/5] bg-mid-purple-4 rounded-sm animate-pulse" />
              {/* Caption placeholder */}
              <div className="h-4 bg-mid-purple-4 rounded animate-pulse w-3/4" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
