// CategoryTabs.tsx
import React from 'react';
import type { CategoryType } from './types';
import { categoryTabs } from './data';

const FranchiseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="new-franchise-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A855F7" />
        <stop offset="1" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <g
      stroke="url(#new-franchise-gradient)"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M16 20H48L54 32H10L16 20Z" />
      <path d="M24 20L22 32" />
      <path d="M40 20L42 32" />
      <path d="M10 32C12 38 18 38 22 32C26 38 32 38 36 32C40 38 46 38 50 32C52 38 58 38 54 32" />
      <path d="M16 32V50H48V32" />
      <path d="M28 50V40C28 37.8 29.8 36 32 36C34.2 36 36 37.8 36 40V50" />
      <rect x="10" y="50" width="44" height="6" rx="2" />
    </g>
  </svg>
);

const ExistingBusinessIcon = () => (
  <svg width="18" height="18" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="existing-business-gradient" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#22C55E" />
        <stop offset="1" stopColor="#16A34A" />
      </linearGradient>
    </defs>
    <g
      stroke="url(#existing-business-gradient)"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M16 16H48L54 30H10L16 16Z" />
      <path d="M24 16L22 30" />
      <path d="M40 16L42 30" />
      <path d="M10 30C12 36 18 36 22 30C26 36 32 36 36 30C40 36 46 36 50 30C52 36 58 36 54 30" />
      <path d="M16 30V50H48V30" />
      <path d="M24 50V39C24 36.8 25.8 35 28 35H32C34.2 35 36 36.8 36 39V50" />
      <path d="M31 42V42.5" />
      <rect x="40" y="36" width="10" height="8" rx="1.5" />
      <rect x="10" y="50" width="44" height="6" rx="2" />
    </g>
  </svg>
);

const TruckIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
    <path d="M3 6h11v11H3z" />
    <path d="M14 9h4l3 3v5h-7z" />
    <path d="M18 12h-2" />
    <circle cx="7.5" cy="17.5" r="2" />
    <circle cx="16.5" cy="17.5" r="2" />
  </svg>
);

const CartIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
    <path d="M3 4h2l2.5 10h11l2.5-7H6.5" />
    <circle cx="9" cy="18" r="1.5" />
    <circle cx="17" cy="18" r="1.5" />
    <path d="M9 14h8" />
  </svg>
);

const categoryConfig: Record<string, { icon: React.FC<{ color: string }>; color: string }> = {
  franchise: { icon: FranchiseIcon, color: '#7C3AED' },
  existing: { icon: ExistingBusinessIcon, color: '#059669' },
  distribution: { icon: TruckIcon, color: '#2563EB' },
  movable: { icon: CartIcon, color: '#EA580C' },
};

interface CategoryTabsProps {
  activeCategory: CategoryType;
  onCategoryChange: (cat: CategoryType) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div 
      className="w-full px-1 py-1 bg-transparent"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="grid grid-cols-4 gap-0.5 w-full">
        {categoryTabs.map((cat) => {
          const isActive = activeCategory === cat.id;
          const config = categoryConfig[cat.id] || categoryConfig.franchise;
          const Icon = config.icon;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id as CategoryType)}
              className="flex flex-row items-center justify-center gap-1 px-0.5 py-1.5 rounded-[4px] bg-white border transition-all duration-200 active:scale-95 focus-visible:outline-none min-w-0"
              style={{
                borderColor: isActive ? config.color : '#E2E8F0',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              }}
            >
              <div className="shrink-0 flex items-center justify-center">
                <Icon color={config.color} />
              </div>
              
              <span
                className="text-[8px] font-medium leading-[1.15] tracking-tight text-left transition-colors duration-200 min-w-0"
                style={{ color: isActive ? config.color : '#0F172A' }}
              >
                {cat.label.split(' ').map((word, idx) => (
                  <React.Fragment key={idx}>
                    {word}
                    {idx !== cat.label.split(' ').length - 1 && <br />}
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