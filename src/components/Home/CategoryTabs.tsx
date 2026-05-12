import React from 'react';
import type { CategoryType } from './types';
import { categoryTabs } from './data';

const StoreIcon = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
    <path d="M3 9l1.5-4.5h15L21 9" />
    <path d="M3 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M7 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M11 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M15 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M19 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M4 11v8h16v-8" />
    <path d="M8 19v-5h3v5" />
    <circle cx="9.5" cy="16.5" r="0.5" fill={color} style={{ transition: 'fill 0.3s ease' }} />
    <path d="M2 19h20" />
  </svg>
);

const StorefrontIcon = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
    <path d="M3 9l1.5-4.5h15L21 9" />
    <path d="M3 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M7 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M11 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M15 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M19 9v2a2 2 0 0 0 4 0v-2" />
    <path d="M4 11v8h16v-8" />
    <path d="M6 19v-4h3v4" />
    <rect x="13" y="14" width="4" height="2.5" rx="0.5" />
    <path d="M2 19h20" />
  </svg>
);

const TruckIcon = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
    <path d="M3 6h11v11H3z" />
    <path d="M14 9h4l3 3v5h-7z" />
    <path d="M18 12h-2" />
    <circle cx="7.5" cy="17.5" r="2" />
    <circle cx="16.5" cy="17.5" r="2" />
  </svg>
);

const CartIcon = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
    <path d="M3 4h2l2.5 10h11l2.5-7H6.5" />
    <circle cx="9" cy="18" r="1.5" />
    <circle cx="17" cy="18" r="1.5" />
    <path d="M9 14h8" />
  </svg>
);

const categoryConfig: Record<string, { icon: React.FC<{ color: string }>; color: string }> = {
  franchise: { icon: StoreIcon, color: '#7C3AED' },
  existing: { icon: StorefrontIcon, color: '#10B981' },
  distribution: { icon: TruckIcon, color: '#3B82F6' },
  movable: { icon: CartIcon, color: '#F97316' },
};

interface CategoryTabsProps {
  activeCategory: CategoryType;
  onCategoryChange: (cat: CategoryType) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div 
      className="w-full px-2 py-2 bg-[#F8FAFC]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="grid grid-cols-4 gap-1.5 w-full">
        {categoryTabs.map((cat) => {
          const isActive = activeCategory === cat.id;
          const config = categoryConfig[cat.id] || categoryConfig.franchise;
          const Icon = config.icon;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id as CategoryType)}
              className="flex flex-col items-center justify-center gap-1.5 p-1 min-h-[58px] bg-white rounded-[10px] border transition-all duration-300 ease-out active:scale-95 focus-visible:outline-none"
              style={{
                borderColor: isActive ? config.color : '#E2E8F0',
                boxShadow: isActive 
                  ? `0 6px 16px ${config.color}35, 0 2px 4px ${config.color}20` 
                  : '0 2px 6px rgba(0,0,0,0.03)',
                transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              <div 
                className="shrink-0 flex items-center justify-center transition-transform duration-300"
                style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
              >
                <Icon color={isActive ? config.color : '#64748B'} />
              </div>
              
              <span
                className="text-[9.5px] font-semibold leading-[1.1] text-center transition-colors duration-300"
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