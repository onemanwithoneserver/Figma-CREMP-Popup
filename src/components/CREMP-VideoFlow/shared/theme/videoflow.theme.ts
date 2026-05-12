// ─────────────────────────────────────────────────────────
// videoflow.theme.ts — Dark cinematic luxury theme tokens
// ─────────────────────────────────────────────────────────

export const vfTheme = {
  // Backgrounds
  bg: {
    base:      '#080c14',
    card:      'rgba(255,255,255,0.04)',
    cardHover: 'rgba(255,255,255,0.07)',
    glass:     'rgba(15,25,45,0.75)',
    overlay:   'rgba(8,12,20,0.85)',
    gradient: {
      hero:   'linear-gradient(180deg, rgba(8,12,20,0) 0%, rgba(8,12,20,0.95) 100%)',
      top:    'linear-gradient(180deg, rgba(8,12,20,0.85) 0%, rgba(8,12,20,0) 40%)',
      gold:   'linear-gradient(135deg, #c9a34e 0%, #b8903c 100%)',
      nav:    'linear-gradient(135deg, #0a1128 0%, #1a3463 100%)',
      dark:   'linear-gradient(180deg, #0d1527 0%, #080c14 100%)',
    },
  },
  // Typography
  text: {
    primary:   '#ffffff',
    secondary: 'rgba(255,255,255,0.65)',
    muted:     'rgba(255,255,255,0.38)',
    gold:      '#d4af37',
    goldLight: '#f0d060',
  },
  // Borders
  border: {
    subtle:  'rgba(255,255,255,0.07)',
    glass:   'rgba(255,255,255,0.10)',
    gold:    'rgba(212,175,55,0.30)',
    bright:  'rgba(255,255,255,0.14)',
  },
  // Accents
  accent: {
    gold:      '#c9a34e',
    goldDark:  '#b8903c',
    goldGlow:  'rgba(201,163,78,0.25)',
    navy:      '#0f1f3d',
    navyLight: '#1a3463',
    green:     '#10b981',
    blue:      '#3b82f6',
  },
  // Font
  font: "'Outfit', sans-serif",
  // Radii
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    pill: '999px',
  },
  // Shadows
  shadow: {
    card:  '0 4px 24px rgba(0,0,0,0.5)',
    glow:  '0 0 24px rgba(201,163,78,0.18)',
    heavy: '0 8px 40px rgba(0,0,0,0.7)',
  },
} as const;
