/**
 * Pixel-flat Windows-95-style manila folder. Yellow body, darker yellow tab,
 * single-pixel dark border, plus a small highlight on the front lip. Drawn
 * intentionally squared-off — no rounded corners.
 */
export function WindowsFolderIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 80"
      role="img"
      aria-hidden="true"
      className={className}
      shapeRendering="crispEdges"
    >
      {/* Back of folder (the part sticking up behind the front) */}
      <rect x="2" y="10" width="92" height="60" fill="#C9A748" />
      {/* Tab on the upper left */}
      <polygon points="2,10 4,4 36,4 38,10" fill="#E2C04E" />
      <polyline
        points="2,10 4,4 36,4 38,10"
        fill="none"
        stroke="#8A6D2D"
        strokeWidth="1"
      />
      {/* Front of folder */}
      <rect x="2" y="14" width="92" height="56" fill="#F0D170" />
      {/* Border */}
      <rect
        x="2"
        y="10"
        width="92"
        height="60"
        fill="none"
        stroke="#8A6D2D"
        strokeWidth="1"
      />
      <rect
        x="2"
        y="14"
        width="92"
        height="56"
        fill="none"
        stroke="#8A6D2D"
        strokeWidth="1"
      />
      {/* Highlight on the top edge of the front */}
      <line x1="3" y1="15" x2="93" y2="15" stroke="#F8DF8E" strokeWidth="1" />
      {/* Drop shadow strip on the bottom */}
      <line x1="3" y1="69" x2="93" y2="69" stroke="#A6862F" strokeWidth="1" />
    </svg>
  );
}
