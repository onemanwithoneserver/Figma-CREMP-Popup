// ── Inline SVG icons (matches Home/MapSection style) ─────────────────────────
const LocateIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" fill={color} stroke="none" />
    <circle cx="12" cy="12" r="7" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

const LayersIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
);

const NavigateIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const sharedEffects = {
  floatingPanel: "bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#E5E7EB]",
  iconButton: "flex items-center justify-center transition-colors hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-none",
};

interface FloatingControlsProps {
  onLocate: () => void;
}

export default function FloatingControls({ onLocate }: FloatingControlsProps) {
  return (
    <div
      className={`absolute right-4 z-[999] flex flex-col overflow-hidden pointer-events-auto ${sharedEffects.floatingPanel}`}
      style={{ bottom: 'clamp(250px, calc(35% + 20px), 300px)' }}
      role="group"
      aria-label="Map controls"
    >
      <button
        onClick={onLocate}
        className={`w-10 h-10 border-b border-[#F3F4F6] ${sharedEffects.iconButton}`}
        aria-label="Locate Me (Reset Pan)"
        title="Locate Me"
      >
        <LocateIcon color="#0F172A" />
      </button>

      <button
        className={`w-10 h-10 border-b border-[#F3F4F6] ${sharedEffects.iconButton}`}
        aria-label="Map Layers"
        title="Layers"
      >
        <LayersIcon color="#0F172A" />
      </button>

      <button
        className={`w-10 h-10 ${sharedEffects.iconButton}`}
        aria-label="Navigate"
        title="Navigate"
      >
        <NavigateIcon color="#0F172A" />
      </button>
    </div>
  );
}
