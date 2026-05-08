// ─── Star Rating ─────────────────────────────────────────────────────────────
export function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const sz = size === 'md' ? 'w-3.5 h-3.5' : 'w-3 h-3';
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const half = !filled && hasHalf && i === full;
        return (
          <svg key={i} viewBox="0 0 16 16" className={`${sz} ${filled || half ? 'text-[#f59e0b]' : 'text-[#dde1e9]'}`} fill="currentColor">
            {half ? (
              <>
                <defs>
                  <linearGradient id={`hg-${i}-${size}`} x1="0" x2="1">
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#dde1e9" />
                  </linearGradient>
                </defs>
                <path fill={`url(#hg-${i}-${size})`} d="M8 1.2l1.9 3.8 4.2.6-3 2.9.7 4.2L8 10.5 4.2 12.7l.7-4.2-3-2.9 4.2-.6z" />
              </>
            ) : (
              <path d="M8 1.2l1.9 3.8 4.2.6-3 2.9.7 4.2L8 10.5 4.2 12.7l.7-4.2-3-2.9 4.2-.6z" />
            )}
          </svg>
        );
      })}
    </div>
  );
}
