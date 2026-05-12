// ─────────────────────────────────────────────────────────
// videoflow.animations.ts — Shared Framer Motion variants
// ─────────────────────────────────────────────────────────

import type { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
  exit: { opacity: 0, y: -16, transition: { duration: 0.28 } },
};

export const slideUpFull: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.38, ease: [0.55, 0, 1, 0.45] } },
};

export const slideDownFull: Variants = {
  hidden: { opacity: 0, y: '-100%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: '-100%', transition: { duration: 0.38, ease: [0.55, 0, 1, 0.45] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const hoverScale = {
  whileHover: { scale: 1.03 } as const,
  whileTap: { scale: 0.97 } as const,
};

export const floatUp: Variants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const pageTransition = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
};
