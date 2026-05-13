import type { SelectedRegion } from './types';

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const LocationIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const InfoIcon = ({ color }: { color: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
  </svg>
);

const CloseIcon = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface AreaInfoCardProps {
  region: SelectedRegion;
  onClear: () => void;
}

export default function AreaInfoCard({
  region,
  onClear,
}: AreaInfoCardProps) {
  return (
    <div
      className="flex flex-col gap-2 px-3 py-2.5 bg-[#F8FAFC]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Selected area badge */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-[12px] bg-white border border-[#E2E8F0]"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
      >
        {/* Purple location icon */}
        <div className="w-7 h-7 rounded-full bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
          <LocationIcon color="#7C3AED" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold text-[#111827] leading-tight truncate">
            {region.name}
          </p>
          <p className="text-[10px] text-[#64748B] leading-tight truncate">
            {region.subLabel}
          </p>
        </div>

        {/* Count */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[11px] font-bold text-[#7C3AED]">{region.opportunityCount}</span>
          <InfoIcon color="#94A3B8" />
        </div>

        {/* Clear */}
        <button
          onClick={onClear}
          className="w-6 h-6 rounded-full bg-[#F1F5F9] flex items-center justify-center active:bg-[#E2E8F0] transition-colors shrink-0 focus-visible:outline-none"
          aria-label="Clear selection"
        >
          <CloseIcon color="#64748B" />
        </button>
      </div>

      {/* Showing results text only */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#64748B] font-medium">
          Showing results in selected area
        </span>
      </div>
    </div>
  );
}
