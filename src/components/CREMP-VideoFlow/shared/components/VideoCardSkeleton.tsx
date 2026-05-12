// ─────────────────────────────────────────────────────────
// VideoCardSkeleton.tsx — Loading skeleton for property cards
// ─────────────────────────────────────────────────────────

interface VideoCardSkeletonProps {
  /** Legacy: aspect-ratio class (e.g. 'aspect-[9/14]') used by other screens */
  aspectClass?: string;
  /** Explicit height class used by the luxury discovery grid (e.g. 'h-[240px]') */
  heightClass?: string;
}

export default function VideoCardSkeleton({ aspectClass, heightClass }: VideoCardSkeletonProps) {
  // Luxury variant when an explicit height is provided
  if (heightClass) {
    return (
      <div
        className={`vf-luxury-skeleton ${heightClass} w-full relative overflow-hidden`}
        style={{ borderRadius: 20 }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-2"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }}
        >
          <div className="h-2.5 w-2/3 rounded" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="h-2 w-1/2 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>
      </div>
    );
  }

  // Original variant (backward-compatible with other screens)
  const sizeClass = aspectClass ?? 'aspect-[9/14]';
  return (
    <div className={`vf-card ${sizeClass} relative overflow-hidden`}>
      <div className="vf-skeleton absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-2">
        <div className="vf-skeleton h-3 w-3/4 rounded" />
        <div className="vf-skeleton h-2.5 w-1/2 rounded" />
        <div className="flex gap-1.5 mt-1">
          <div className="vf-skeleton h-4 w-14 rounded-full" />
          <div className="vf-skeleton h-4 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
