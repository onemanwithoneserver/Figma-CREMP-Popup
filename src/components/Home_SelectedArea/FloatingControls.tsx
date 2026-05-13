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
  return null;
}
