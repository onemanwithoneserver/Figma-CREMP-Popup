// CategoryTabs.tsx
import React from 'react';
import type { CategoryType } from './types';
import { categoryTabs } from './data';

const StorefrontIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
    <path d="M3 9l1.5-4.5h15L21 9" />
    <path d="M3 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M7 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M11 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M15 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M19 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M4 11v8h16v-8" />
    <path d="M8 19v-5h3v5" />
    <path d="M13 13h3v3h-3z" />
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
  franchise: { icon: StorefrontIcon, color: '#7C3AED' }, // Purple
  existing: { icon: StorefrontIcon, color: '#059669' },  // Green
  distribution: { icon: TruckIcon, color: '#2563EB' },   // Blue
  movable: { icon: CartIcon, color: '#EA580C' },         // Orange
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