/**
 * Position slots on the corkboard for 1, 2, or 3 memos. Values are percentages
 * of the cork inner area, with the memo's transform-origin at top-left after
 * we offset by the memo's own size. The spec calls these out exactly so the
 * file is the source of truth.
 */

export type Slot = {
  leftPct: number;
  topPct: number;
};

export function slotsFor(count: number): Slot[] {
  if (count <= 1) {
    return [{ leftPct: 50, topPct: 50 }];
  }
  if (count === 2) {
    return [
      { leftPct: 30, topPct: 30 },
      { leftPct: 65, topPct: 35 },
    ];
  }
  return [
    { leftPct: 20, topPct: 25 },
    { leftPct: 65, topPct: 25 },
    { leftPct: 40, topPct: 65 },
  ];
}
