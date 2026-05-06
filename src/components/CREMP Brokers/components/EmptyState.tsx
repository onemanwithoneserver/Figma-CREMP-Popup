interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
}

export default function EmptyState({ hasFilters, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Icon */}
      <div className="w-16 h-16 bg-[#fafafb] rounded-2xl border border-black/[0.05] flex items-center justify-center mb-4">
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
          <circle cx="18" cy="18" r="11" stroke="#a0aabf" strokeWidth="2" />
          <path d="M27 27l7 7" stroke="#a0aabf" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 18h8M18 14v8" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <h3
        className="text-[15px] font-bold text-[#0a1128] mb-1"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        {hasFilters ? 'No brokers match your filters' : 'No brokers found'}
      </h3>
      <p
        className="text-[12px] text-[#637089] font-medium max-w-[240px] leading-relaxed"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        {hasFilters
          ? 'Try adjusting your search or clearing filters to see more results.'
          : 'We couldn\'t find any brokers. Please try again later.'}
      </p>

      {hasFilters && onClearFilters && (
        <button
          onClick={onClearFilters}
          className="mt-4 cb-btn-outline text-[12px] px-5 py-2"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
