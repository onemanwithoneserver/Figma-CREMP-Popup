import { useState } from 'react';
import type { LeaseProperty, LeaseCategory } from './types';

// ── Tag config ────────────────────────────────────────────────────────────

const TAG_CONFIG: Record<LeaseCategory, { bg: string; color: string }> = {
  'full-space': { bg: '#EDE9FE', color: '#7C3AED' },
  'sub-lease':  { bg: '#D1FAE5', color: '#059669' },
  'co-working': { bg: '#FFEDD5', color: '#F97316' },
};

// ── Icons ─────────────────────────────────────────────────────────────────

const PinIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const AreaIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18M3 9h18M3 15h18" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill={filled ? '#EF4444' : 'none'}
    stroke={filled ? '#EF4444' : '#CBD5E1'}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

// ── Single card ───────────────────────────────────────────────────────────

interface LeasePropertyCardProps {
  property: LeaseProperty;
}

function LeasePropertyCard({ property }: LeasePropertyCardProps) {
  const [saved, setSaved] = useState(false);
  const [imgError, setImgError] = useState(false);
  const tag = TAG_CONFIG[property.tag];

  return (
    <div
      className="shrink-0 flex flex-col bg-white rounded-[12px] overflow-hidden border border-[#F1F5F9]"
      style={{
        width: 112,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Image */}
      <div className="relative w-full" style={{ height: 90 }}>
        {!imgError && property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-[#F1F5F9] flex items-center justify-center">
            <AreaIcon />
          </div>
        )}

        {/* Heart button */}
        <button
          className="absolute top-1.5 right-1.5 w-[22px] h-[22px] rounded-full bg-white/90 backdrop-blur-[2px] flex items-center justify-center shadow-sm active:scale-90 transition-transform focus-visible:outline-none"
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? 'Remove from saved' : 'Save property'}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col px-1.5 pt-1.5 pb-2 gap-[3px]">
        {/* Tag badge */}
        <span
          className="self-start text-[7.5px] font-bold px-1.5 py-[2px] rounded-[4px] leading-tight"
          style={{ backgroundColor: tag.bg, color: tag.color }}
        >
          {property.tagLabel}
        </span>

        {/* Title */}
        <h3 className="text-[10.5px] font-bold text-[#0F172A] leading-tight line-clamp-1 mt-[1px]">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-[3px]">
          <PinIcon />
          <span className="text-[8.5px] font-medium text-[#475569] truncate leading-none">
            {property.location}
          </span>
        </div>

        {/* Size */}
        <div className="flex items-center gap-[3px]">
          <AreaIcon />
          <span className="text-[8px] font-medium text-[#64748B] leading-none">
            {property.sizeLabel}
          </span>
        </div>

        {/* Price */}
        <div className="mt-[2px]">
          <span className="text-[11px] font-extrabold text-[#0F172A] leading-tight tracking-tight">
            {property.price}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Horizontal list ───────────────────────────────────────────────────────

interface LeasePropertyListProps {
  properties: LeaseProperty[];
}

export default function LeasePropertyList({ properties }: LeasePropertyListProps) {
  return (
    <div
      className="w-full bg-white border-t border-[#F1F5F9]"
      style={{ boxShadow: '0 -4px 16px rgba(0,0,0,0.04)' }}
    >
      <div
        className="flex gap-2.5 px-2.5 py-2.5 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {properties.map((p) => (
          <LeasePropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
