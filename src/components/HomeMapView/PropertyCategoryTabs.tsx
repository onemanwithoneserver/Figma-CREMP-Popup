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

const tabs: { id: PropertyCategory; label: string; Icon: React.FC<{ color: string }>; activeBg: string; activeBorder: string; activeText: string; activeIcon: string; inactiveText: string }[] = [
  { id: 'vacant', label: 'Vacant', Icon: VacantIcon, activeBg: 'bg-[#FEF3C7]', activeBorder: 'border-[#FDE68A]', activeText: 'text-[#111827]', activeIcon: '#D97706', inactiveText: 'text-[#111827]' },
  { id: 'fractional', label: 'Fractional', Icon: FractionalIcon, activeBg: 'bg-[#F3E8FF]', activeBorder: 'border-[#D8B4FE]', activeText: 'text-[#111827]', activeIcon: '#7C3AED', inactiveText: 'text-[#111827]' },
  { id: 'preleased', label: 'Pre-Leased', Icon: PreLeasedIcon, activeBg: 'bg-[#DCFCE7]', activeBorder: 'border-[#86EFAC]', activeText: 'text-[#059669]', activeIcon: '#059669', inactiveText: 'text-[#059669]' },
  { id: 'all', label: 'All', Icon: GridIcon, activeBg: 'bg-[#F1F5F9]', activeBorder: 'border-[#CBD5E1]', activeText: 'text-[#475569]', activeIcon: '#475569', inactiveText: 'text-[#475569]' },
];

interface Props {
  active: PropertyCategory;
  onChange: (c: PropertyCategory) => void;
}

export default function PropertyCategoryTabs({ active, onChange }: Props) {
  return (
    <div
      className="flex items-center gap-2 px-3 pt-2 pb-1 w-full overflow-x-auto no-scrollbar shrink-0 bg-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
      role="tablist"
      aria-label="Property category"
    >
      {tabs.map(({ id, label, Icon, activeBg, activeBorder, activeText, activeIcon, inactiveText }) => {
        const isActive = active === id;

        // When active, use its specific active styling.
        // When inactive, use white background, gray border, and specific inactive text/icon colors.
        const iconColor = isActive ? activeIcon : (id === 'vacant' ? '#D97706' : (id === 'fractional' ? '#7C3AED' : (id === 'preleased' ? '#059669' : '#475569')));
        const textColor = isActive ? activeText : inactiveText;
        const bgClass = isActive ? activeBg : 'bg-white';
        const borderClass = isActive ? activeBorder : 'border-[#E5E7EB]';

        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`
              flex items-center gap-1.5 px-3.5 h-[34px] rounded-[8px] shrink-0 border transition-all duration-200
              active:scale-95 focus-visible:outline-none text-[12px] font-semibold whitespace-nowrap
              ${bgClass} ${borderClass} ${textColor}
              ${isActive ? 'shadow-sm' : 'hover:bg-gray-50'}
            `}
          >
            <Icon color={iconColor} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
