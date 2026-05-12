import type { PropertyCategory } from './types';

// ── inline SVG icons ─────────────────────────────────────────────────────────
const VacantIcon = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
);

const FractionalIcon = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 3v1.5M12 19.5V21M3 12H1.5M22.5 12H21M5.636 5.636l-1.06-1.06M19.424 19.424l-1.06-1.06M5.636 18.364l-1.06 1.06M19.424 4.576l-1.06 1.06" />
    <circle cx="12" cy="12" r="4.5" />
  </svg>
);

const PreLeasedIcon = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GridIcon = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const tabs: { id: PropertyCategory; label: string; Icon: React.FC<{ color: string }> }[] = [
  { id: 'vacant',     label: 'Vacant',     Icon: VacantIcon     },
  { id: 'fractional', label: 'Fractional', Icon: FractionalIcon },
  { id: 'preleased',  label: 'Pre-Leased', Icon: PreLeasedIcon  },
  { id: 'all',        label: 'All',        Icon: GridIcon        },
];

interface Props {
  active: PropertyCategory;
  onChange: (c: PropertyCategory) => void;
}

export default function PropertyCategoryTabs({ active, onChange }: Props) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-2 w-full overflow-x-auto no-scrollbar shrink-0"
      style={{ backgroundColor: '#0B1320', fontFamily: "'Outfit', sans-serif" }}
      role="tablist"
      aria-label="Property category"
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`
              flex items-center gap-1.5 px-3 h-[32px] rounded-full shrink-0 border transition-all duration-200
              active:scale-95 focus-visible:outline-none text-[12px] font-semibold whitespace-nowrap
              ${isActive
                ? 'bg-[#FBBF24] border-[#FBBF24] text-[#0B1320] shadow-[0_2px_8px_rgba(251,191,36,0.35)]'
                : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.07] hover:border-white/20'
              }
            `}
          >
            <Icon color={isActive ? '#0B1320' : '#94A3B8'} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
