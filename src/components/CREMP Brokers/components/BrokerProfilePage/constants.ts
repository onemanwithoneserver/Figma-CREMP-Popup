// ─── Fallback defaults ────────────────────────────────────────────────────────
export const DEFAULT_DEAL_TYPES = ['Sale', 'Leasing', 'Investment'];
export const DEFAULT_WORKS_WITH = ['Corporate Clients', 'HNI Investors', 'NRI Buyers'];

// ─── Map tier colours/labels ──────────────────────────────────────────────────
export const TIER_COLORS = {
  'most-active':       { dot: '#0a1128', label: 'Most Active' },
  'moderately-active': { dot: '#3b82f6', label: 'Moderately Active' },
  'based-on-request':  { dot: '#f59e0b', label: 'Based on Request' },
};

export const MAP_PINS_BY_TIER = {
  'most-active':       [{ x: 30, y: 55 }, { x: 38, y: 38 }, { x: 45, y: 48 }, { x: 33, y: 65 }, { x: 50, y: 58 }],
  'moderately-active': [{ x: 58, y: 42 }, { x: 65, y: 55 }, { x: 55, y: 68 }, { x: 62, y: 30 }, { x: 70, y: 48 }],
  'based-on-request':  [{ x: 78, y: 38 }, { x: 82, y: 56 }, { x: 75, y: 68 }, { x: 85, y: 70 }],
};
