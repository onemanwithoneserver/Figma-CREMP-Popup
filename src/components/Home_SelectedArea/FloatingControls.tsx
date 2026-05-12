// ── Inline SVG icons (matches Home/MapSection style) ─────────────────────────
const LocateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2m-8.5-8.5a7 7 0 110 14 7 7 0 010-14z" />
    <circle cx="12" cy="12" r="3" fill="#374151" />
  </svg>
);

const LayersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const NavigateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 12h4v7l5-5 5 5v-7h4L12 2z" />
  </svg>
);

interface FloatingControlsProps {
  onLocate: () => void;
}

export default function FloatingControls({ onLocate }: FloatingControlsProps) {
  return (
    <div
      className="absolute z-[999] flex flex-col overflow-hidden"
      style={{
        right: 16,
        bottom: 250,
        borderRadius: 4,
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        width: 40,
      }}
      role="group"
      aria-label="Map controls"
    >
      {/* Locate */}
      <button
        onClick={onLocate}
        className="w-10 h-10 flex items-center justify-center border-b border-[#F3F4F6] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors focus-visible:outline-none"
        aria-label="Center on current location"
        title="Locate"
      >
        <LocateIcon />
      </button>

      {/* Layers */}
      <button
        className="w-10 h-10 flex items-center justify-center border-b border-[#F3F4F6] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors focus-visible:outline-none"
        aria-label="Map layers"
        title="Layers"
      >
        <LayersIcon />
      </button>

      {/* Navigate */}
      <button
        className="w-10 h-10 flex items-center justify-center hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors focus-visible:outline-none"
        aria-label="Navigate"
        title="Navigate"
      >
        <NavigateIcon />
      </button>
    </div>
  );
}
