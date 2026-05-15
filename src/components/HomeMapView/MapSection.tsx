import { useState, useRef, useCallback } from 'react';
import type { PropertyListing } from './types';
import { mapListings, mapLabels } from './data';

const categoryColors: Record<string, string> = {
  'Retail Shop': '#2563EB',
  'Showroom': '#7C3AED',
  'Office Space': '#6D28D9',
  'Warehouse': '#B45309',
  'Commercial Plot': '#EA580C',
};

const markerColors: Record<PropertyListing['markerType'], string> = {
  retail: '#2563EB',
  office: '#6D28D9',
  warehouse: '#B45309',
  showroom: '#7C3AED',
  plot: '#EA580C',
  movable: '#0891B2',
};

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? '#EF4444' : 'none'} stroke={filled ? '#EF4444' : '#CBD5E1'} strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const LocationPinIcon = ({ color }: { color: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const AreaIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

const MapPin = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="none">
    <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" fill={color} />
    <circle cx="12" cy="9" r="3" fill="#FFFFFF" />
  </svg>
);

interface FloatingCardProps {
  listing: PropertyListing;
  style: React.CSSProperties;
  isActive?: boolean;
  onSelect: (id: string) => void;
}

function FloatingCard({ listing, style, isActive, onSelect }: FloatingCardProps) {
  const [imgErr, setImgErr] = useState(false);
  const [saved, setSaved] = useState(false);

  const catColor = categoryColors[listing.type] || '#2563EB';
  const cardWidth = listing.id === '3' ? 132 : listing.id === '2' || listing.id === '5' ? 128 : 120;

  return (
    <button
      onPointerDown={(e) => { e.stopPropagation(); onSelect(listing.id); }}
      className={`absolute focus-visible:outline-none active:scale-95 transition-transform font-['Outfit',_sans-serif] ${isActive ? 'z-50' : 'z-20'}`}
      style={style}
      aria-label={`${listing.type} – ${listing.price}`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md transition-all duration-300 ${isActive ? 'border-none' : 'border border-black/5'}`}
          style={{
            width: cardWidth,
            boxShadow: isActive
              ? `0 10px 24px rgba(0,0,0,0.14), 0 0 0 1.5px ${catColor}50`
              : '0 4px 16px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)',
          }}
        >
          {/* Image specifically placed above the price and details */}
          <div className="relative w-full h-[70px] overflow-hidden">
            {!imgErr && listing.imageUrl ? (
              <img
                src={listing.imageUrl}
                alt={listing.type}
                onError={() => setImgErr(true)}
                className="w-full h-full object-cover block"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                <AreaIcon color="#94A3B8" />
              </div>
            )}

            <button
              onPointerDown={(e) => { e.stopPropagation(); setSaved((s) => !s); }}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus-visible:outline-none active:scale-90 transition-transform"
              aria-label="Save listing"
            >
              <HeartIcon filled={saved} />
            </button>
          </div>

          <div className="pt-2 px-2.5 pb-2.5 text-left">
            <span className="block text-[13px] font-extrabold text-gray-900 leading-none tracking-tight">
              {listing.price}
            </span>

            <span
              className="inline-block mt-1 text-[8.5px] font-bold px-1.5 py-[2px] rounded tracking-[0.02em] leading-none"
              style={{
                color: catColor,
                backgroundColor: `${catColor}15`,
              }}
            >
              {listing.type}
            </span>

            <div className="mt-1 flex items-center gap-1">
              <span className="text-[9.5px] font-semibold text-slate-600 leading-none">
                {listing.area} {listing.areaUnit}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-1">
              <LocationPinIcon color="#94A3B8" />
              <span
                className="text-[9px] font-medium text-slate-500 leading-none truncate"
                style={{ maxWidth: cardWidth - 30 }}
              >
                {listing.location}
              </span>
            </div>
          </div>
        </div>

        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-white/95 drop-shadow-[0_2px_2px_rgba(0,0,0,0.08)]" />
      </div>
    </button>
  );
}

function DotMarker({ listing, isActive, onSelect }: { listing: PropertyListing; isActive: boolean; onSelect: (id: string) => void }) {
  return (
    <button
      onPointerDown={(e) => { e.stopPropagation(); onSelect(listing.id); }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none active:scale-90 transition-transform ${isActive ? 'z-40' : 'z-15'}`}
      style={{
        top: `${listing.lat}%`,
        left: `${listing.lng}%`,
      }}
      aria-label={`${listing.type} marker`}
    >
      <div className={`transition-transform duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] ${isActive ? 'scale-125' : 'scale-100'}`}>
        <MapPin color={markerColors[listing.markerType]} />
      </div>
    </button>
  );
}

function cardStyle(listing: PropertyListing): React.CSSProperties {
  return {
    top: `${listing.lat}%`,
    left: `${listing.lng}%`,
    transform: 'translate(-50%, -100%) translateY(-6px)',
  };
}

export default function MapSection() {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom] = useState(0.85); // Removed setZoom since controls are gone
  const [activeId, setActiveId] = useState<string | null>('1');
  const dragRef = useRef<{ active: boolean; sx: number; sy: number; lx: number; ly: number }>({
    active: false, sx: 0, sy: 0, lx: 0, ly: 0,
  });

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    dragRef.current = { active: true, sx: e.clientX, sy: e.clientY, lx: pan.x, ly: pan.y };
  }, [pan]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    setPan({ x: d.lx + (e.clientX - d.sx), y: d.ly + (e.clientY - d.sy) });
  }, []);

  const onPointerUp = useCallback(() => { dragRef.current.active = false; }, []);

  return (
    <div
      className="relative w-full h-full flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none bg-[#EEF1F6] min-h-0 touch-none font-['Outfit',_sans-serif]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] origin-center transition-transform duration-100 ease-out"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <ellipse cx="52" cy="32" rx="9" ry="6" fill="#D1FAE5" opacity="0.7" />
          <ellipse cx="28" cy="62" rx="7" ry="5" fill="#D1FAE5" opacity="0.6" />
          <ellipse cx="78" cy="66" rx="6" ry="4" fill="#D1FAE5" opacity="0.6" />
          <ellipse cx="60" cy="52" rx="4" ry="2.5" fill="#BFDBFE" opacity="0.7" />
          <path d="M8 5 Q50 0 92 8 Q97 50 90 92 Q50 98 8 90 Q3 50 8 5" fill="none" stroke="#D1D5DB" strokeWidth="1.8" />
          <line x1="12" y1="10" x2="88" y2="82" stroke="#CBD5E1" strokeWidth="1.4" />
          <line x1="2" y1="46" x2="98" y2="54" stroke="#CBD5E1" strokeWidth="1.2" />
          <line x1="4" y1="72" x2="96" y2="70" stroke="#E2E8F0" strokeWidth="1.0" />
          <line x1="46" y1="2" x2="54" y2="98" stroke="#CBD5E1" strokeWidth="1.2" />
          <line x1="22" y1="2" x2="20" y2="98" stroke="#E2E8F0" strokeWidth="0.8" />
          <line x1="78" y1="2" x2="74" y2="98" stroke="#E2E8F0" strokeWidth="0.8" />
          <path d="M22 22 Q50 16 78 24 Q84 50 76 78 Q50 84 22 76 Q16 50 22 22" fill="none" stroke="#E2E8F0" strokeWidth="1.2" />
          <line x1="68" y1="33" x2="82" y2="56" stroke="#CBD5E1" strokeWidth="1.0" />
          <line x1="6" y1="74" x2="20" y2="88" stroke="#CBD5E1" strokeWidth="1.0" />
        </svg>

        {mapLabels.map((lbl) => (
          <span
            key={lbl.label}
            className="absolute select-none pointer-events-none uppercase -translate-x-1/2 -translate-y-1/2 text-[7.5px] font-bold tracking-[0.14em] text-slate-400"
            style={{
              top: `${lbl.top}%`,
              left: `${lbl.left}%`,
            }}
            aria-hidden="true"
          >
            {lbl.label}
          </span>
        ))}

        {[{ top: '47%', left: '77%', n: '44' }, { top: '68%', left: '8%', n: '65' }].map((b) => (
          <div
            key={b.n}
            className="absolute flex items-center justify-center pointer-events-none w-5 h-5 rounded border border-slate-300 bg-white/90 shadow-sm"
            style={{ top: b.top, left: b.left }}
            aria-hidden="true"
          >
            <span className="text-[8.5px] font-bold text-slate-500">{b.n}</span>
          </div>
        ))}

        {[{ top: '12%', left: '8%', r: '-52deg' }, { top: '16%', left: '48%', r: '18deg' }].map((s, i) => (
          <span
            key={i}
            className="absolute select-none pointer-events-none text-[7.5px] font-bold tracking-[0.12em] text-slate-400"
            style={{ top: s.top, left: s.left, transform: `rotate(${s.r})` }}
            aria-hidden="true"
          >
            ORR
          </span>
        ))}

        {mapListings.map((l) => (
          <DotMarker key={l.id} listing={l} isActive={activeId === l.id} onSelect={setActiveId} />
        ))}

        {mapListings.map((l) => (
          <FloatingCard
            key={l.id}
            listing={l}
            style={cardStyle(l)}
            isActive={activeId === l.id}
            onSelect={setActiveId}
          />
        ))}
      </div>
    </div>
  );
}