import React from 'react';
import type { PropertyCategory } from './types';

// ── inline SVG icons ─────────────────────────────────────────────────────────
const VacantIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

const PreLeasedIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
    <rect x="2" y="20" width="20" height="2" />
    <polygon points="12 2 2 8 22 8" />
    <line x1="6" y1="8" x2="6" y2="20" />
    <line x1="10" y1="8" x2="10" y2="20" />
    <line x1="14" y1="8" x2="14" y2="20" />
    <line x1="18" y1="8" x2="18" y2="20" />
  </svg>
);

const GridIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
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
  color: string;
}[] = [
  { id: 'vacant',     label: 'Vacant',     Icon: VacantIcon,     color: '#D97706' },
  { id: 'fractional', label: 'Fractional', Icon: FractionalIcon, color: '#7C3AED' },
  { id: 'preleased',  label: 'Pre Leased', Icon: PreLeasedIcon,  color: '#059669' },
  { id: 'all',        label: 'All',        Icon: GridIcon,       color: '#2563EB' },
];

interface Props {
  active: PropertyCategory;
  onChange: (c: PropertyCategory) => void;
}

export default function PropertyCategoryTabs({ active, onChange }: Props) {
  return (
    <div
      className="w-full px-1 py-1 bg-transparent"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="grid grid-cols-4 gap-0.5 w-full" role="tablist" aria-label="Property category">
        {tabs.map(({ id, label, Icon, color }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(id)}
              className="flex flex-row items-center justify-center gap-1 px-0.5 py-1.5 rounded-[4px] bg-white border transition-all duration-200 active:scale-95 focus-visible:outline-none min-w-0"
              style={{
                borderColor: isActive ? color : '#E2E8F0',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              }}
            >
              <div className="shrink-0 flex items-center justify-center">
                <Icon color={color} />
              </div>
              <span
                className="text-[8px] font-medium leading-[1.15] tracking-tight text-left transition-colors duration-200 min-w-0"
                style={{ color: isActive ? color : '#0F172A' }}
              >
                {label.split(' ').map((word, idx, arr) => (
                  <React.Fragment key={idx}>
                    {word}
                    {idx !== arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
