import type { SelectedRegion, ViewMode } from './types';

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

const MapIcon = ({ color }: { color: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const ListIcon = ({ color }: { color: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

interface AreaInfoCardProps {
  region: SelectedRegion;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
  onClear: () => void;
}

export default function AreaInfoCard({
  region,
  viewMode,
  onViewModeChange,
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

      {/* Map / List toggle row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#64748B] font-medium">
          Showing results in selected area
        </span>

        <div
          className="flex items-center p-1 rounded-[12px] bg-white border border-[#E5E7EB]"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          role="group"
          aria-label="View mode toggle"
        >
          <button
            onClick={() => onViewModeChange('map')}
            className={`flex items-center gap-1 px-3 h-[28px] text-[11px] font-semibold rounded-[8px] transition-all focus-visible:outline-none ${
              viewMode === 'map' ? 'bg-[#0B1320] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
            aria-label="Map view"
          >
            <MapIcon color={viewMode === 'map' ? '#FFFFFF' : '#6B7280'} />
            Map
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`flex items-center gap-1 px-3 h-[28px] text-[11px] font-semibold rounded-[8px] transition-all focus-visible:outline-none ${
              viewMode === 'list' ? 'bg-[#0B1320] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
            aria-label="List view"
          >
            <ListIcon color={viewMode === 'list' ? '#FFFFFF' : '#6B7280'} />
            List
          </button>
        </div>
      </div>
    </div>
  );
}
