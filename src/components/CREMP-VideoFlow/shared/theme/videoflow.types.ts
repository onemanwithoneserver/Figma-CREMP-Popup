// ─────────────────────────────────────────────────────────
// videoflow.types.ts — Shared TypeScript types
// ─────────────────────────────────────────────────────────

export type VideoCategory =
  | 'All'
  | 'Commercial'
  | 'Franchise'
  | 'Pre-Leased'
  | 'Fractional'
  | 'Education';

export interface PropertyVideo {
  id: string;
  title: string;
  location: string;
  thumbnail: string;
  videoUrl: string;       // YouTube video ID or full URL
  returns: string;        // e.g. "9.5% ROI"
  category: VideoCategory;
  duration: string;       // e.g. "2:34"
  likes: number;
  comments: number;
  shares: number;
  price: string;          // e.g. "₹4.8 Cr"
  area: string;           // e.g. "3,200 sq ft"
  tag: string;            // highlight tag e.g. "Pre-leased"
  isBookmarked?: boolean;
  isLiked?: boolean;
}

export type VideoFlowScreen = 'discovery' | 'player' | 'swipe' | 'continue';
