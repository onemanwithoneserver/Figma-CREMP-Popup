import type { PropertyCategory } from './types';

// ── inline SVG icons ─────────────────────────────────────────────────────────
const VacantIcon = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M2 22h20" />
    <circle cx="9.5" cy="8" r="1.2" fill={color} stroke="none" />
    <circle cx="14.5" cy="8" r="1.2" fill={color} stroke="none" />
    <circle cx="9.5" cy="13" r="1.2" fill={color} stroke="none" />
    <circle cx="14.5" cy="13" r="1.2" fill={color} stroke="none" />
  </svg>
);

const FractionalIcon = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

const PreLeasedIcon = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="20" width="20" height="2" />
    <polygon points="12 2 2 8 22 8" />
    <line x1="6" y1="8" x2="6" y2="20" />
    <line x1="10" y1="8" x2="10" y2="20" />
    <line x1="14" y1="8" x2="14" y2="20" />
    <line x1="18" y1="8" x2="18" y2="20" />
  </svg>
);

const GridIcon = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const tabs: {
  id: PropertyCategory;
  label: string;
  Icon: React.FC<{ color: string }>;
  activeAccent: string;
  activeBg: string;
  activeBorder: string;
}[] = [
  {
    id: 'vacant',
    label: 'Vacant',
    Icon: VacantIcon,
    activeAccent: '#D97706',
    activeBg: 'rgba(251,191,36,0.12)',
    activeBorder: 'rgba(251,191,36,0.35)',
  },
  {
    id: 'fractional',
    label: 'Fractional',
    Icon: FractionalIcon,
    activeAccent: '#7C3AED',
    activeBg: 'rgba(124,58,237,0.08)',
    activeBorder: 'rgba(124,58,237,0.25)',
  },
  {
    id: 'preleased',
    label: 'Pre-Leased',
    Icon: PreLeasedIcon,
    activeAccent: '#059669',
    activeBg: 'rgba(5,150,105,0.08)',
    activeBorder: 'rgba(5,150,105,0.25)',
  },
  {
    id: 'all',
    label: 'All',
    Icon: GridIcon,
    activeAccent: '#475569',
    activeBg: 'rgba(71,85,105,0.06)',
    activeBorder: 'rgba(71,85,105,0.18)',
  },
];

interface Props {
  active: PropertyCategory;
  onChange: (c: PropertyCategory) => void;
}

export default function PropertyCategoryTabs({ active, onChange }: Props) {
  return (
    <div
      className="px-4 pt-3 pb-1.5 w-full shrink-0"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div
        className="flex items-center w-full"
        style={{
          borderRadius: 10,
          border: '1px solid rgba(0,0,0,0.07)',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}
        role="tablist"
        aria-label="Property category"
      >
        {tabs.map(({ id, label, Icon, activeAccent, activeBg, activeBorder }, index) => {
          const isActive = active === id;
          const iconColor = isActive ? activeAccent : '#94A3B8';

          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(id)}
              className="flex-1 flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.97] focus-visible:outline-none text-[11px] font-semibold whitespace-nowrap"
              style={{
                height: 36,
                backgroundColor: isActive ? activeBg : 'transparent',
                color: isActive ? '#1E293B' : '#64748B',
                borderRight: index < tabs.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                borderBottom: isActive ? `2px solid ${activeAccent}` : '2px solid transparent',
                position: 'relative',
              }}
            >
              <Icon color={iconColor} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
