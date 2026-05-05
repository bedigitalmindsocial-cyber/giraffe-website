/**
 * Render a "how long ago was this posted" label in the format the corkboard
 * memo wants. The reference time defaults to "now" but is injectable so the
 * function is easily tested and gives stable SSR output on a fixed date.
 */
export function postedRelative(postedISO: string, nowISO?: string): string {
  const posted = new Date(postedISO);
  const now = nowISO ? new Date(nowISO) : new Date();

  const dayMs = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor(
    (now.getTime() - posted.getTime()) / dayMs,
  );

  if (diffDays <= 0) return 'POSTED TODAY';
  if (diffDays === 1) return 'POSTED YESTERDAY';
  if (diffDays >= 2 && diffDays <= 7) return `${diffDays} DAYS AGO`;
  if (diffDays >= 8 && diffDays <= 14) return 'POSTED LAST WEEK';
  if (diffDays >= 15 && diffDays <= 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} WEEKS AGO`;
  }
  // Older: "POSTED IN [MONTH]"
  const month = posted
    .toLocaleString('en-US', { month: 'long' })
    .toUpperCase();
  return `POSTED IN ${month}`;
}

/**
 * Stamp shown on the upper right of each memo, e.g. "POSTED 12 NOV".
 */
export function postedStamp(postedISO: string): string {
  const d = new Date(postedISO);
  const day = String(d.getDate()).padStart(2, '0');
  const month = d
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase();
  return `POSTED ${day} ${month}`;
}
