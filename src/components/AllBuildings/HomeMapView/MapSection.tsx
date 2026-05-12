import { useState, useRef, useCallback } from 'react';
import type { PropertyListing } from './types';
import { mapListings, mapLabels } from './data';

// ── marker color map ──────────────────────────────────────────────────────────
const markerColors: Record<PropertyListing['markerType'], string> = {
  retail:    '#7C3AED',
  office:    '#2563EB',
  warehouse: '#059669',
  showroom:  '#DC2626',
  plot:      '#EA580C',
  movable:   '#0891B2',
};

// ── floating card icon ────────────────────────────────────────────────────────
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? '#EF4444' : 'none'} stroke={filled ? '#EF4444' : '#94A3B8'} strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const LocationPinIcon = ({ color }: { color: string }) => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const AreaIcon = ({ color }: { color: string }) => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

const LocateIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" fill={color} stroke="none" />
    <circle cx="12" cy="12" r="7" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

const LayersIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
);

const NavIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

// ── Floating property card ────────────────────────────────────────────────────
interface FloatingCardProps {
  listing: PropertyListing;
  style: React.CSSProperties;
  isActive?: boolean;
  onSelect: (id: string) => void;
}

function FloatingCard({ listing, style, isActive, onSelect }: FloatingCardProps) {
  const [imgErr, setImgErr] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <button
      onPointerDown={(e) => { e.stopPropagation(); onSelect(listing.id); }}
      className="absolute focus-visible:outline-none active:scale-[0.97] transition-transform"
      style={{
        ...style,
        zIndex: isActive ? 50 : 20,
        fontFamily: "'Outfit', sans-serif",
      }}
      aria-label={`${listing.type} – ${listing.price}`}
    >
      {/* marker dot above card */}
      <div className="flex flex-col items-center">
        <div
          className="flex items-center gap-1.5 bg-white rounded-[12px] overflow-hidden"
          style={{
            boxShadow: isActive
              ? `0 8px 24px rgba(0,0,0,0.22), 0 0 0 1.5px ${markerColors[listing.markerType]}`
              : '0 4px 16px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)',
            minWidth: listing.id === '3' ? 148 : 128,
            maxWidth: listing.id === '3' ? 148 : 128,
          }}
        >
          {/* image */}
          <div className="w-[48px] h-[56px] shrink-0 bg-[#F1F5F9] overflow-hidden">
            {!imgErr && listing.imageUrl ? (
              <img
                src={listing.imageUrl}
                alt={listing.type}
                onError={() => setImgErr(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#E2E8F0]">
                <AreaIcon color="#94A3B8" />
              </div>
            )}
          </div>

          {/* info */}
          <div className="flex flex-col py-1.5 pr-2 pl-1 flex-1 min-w-0 relative">
            {/* heart */}
            <button
              onPointerDown={(e) => { e.stopPropagation(); setSaved((s) => !s); }}
              className="absolute top-1.5 right-1 focus-visible:outline-none active:scale-95 transition-transform"
              aria-label="Save listing"
            >
              <HeartIcon filled={saved} />
            </button>

            <span className="text-[12.5px] font-extrabold text-[#0F172A] leading-none mt-0.5 pr-4">
              {listing.price}
            </span>

            <span
              className="mt-[3px] text-[9.5px] font-semibold leading-none truncate"
              style={{ color: markerColors[listing.markerType] }}
            >
              {listing.type}
            </span>

            <div className="mt-[4px] flex items-center gap-[3px]">
              <AreaIcon color="#64748B" />
              <span className="text-[9px] text-[#64748B] font-medium leading-none">
                {listing.area} {listing.areaUnit}
              </span>
            </div>

            <div className="mt-[3px] flex items-center gap-[3px]">
              <LocationPinIcon color="#64748B" />
              <span className="text-[9px] text-[#64748B] font-medium leading-none truncate max-w-[74px]">
                {listing.location}
              </span>
            </div>
          </div>
        </div>

        {/* pin tail */}
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: `6px solid white`,
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.12))',
          }}
        />
      </div>
    </button>
  );
}

// ── Map dot marker (no card) ──────────────────────────────────────────────────
function DotMarker({ listing, isActive, onSelect }: { listing: PropertyListing; isActive: boolean; onSelect: (id: string) => void }) {
  return (
    <button
      onPointerDown={(e) => { e.stopPropagation(); onSelect(listing.id); }}
      className="absolute focus-visible:outline-none active:scale-90 transition-transform"
      style={{
        top: `${listing.lat}%`,
        left: `${listing.lng}%`,
        transform: 'translate(-50%,-50%)',
        zIndex: isActive ? 40 : 15,
      }}
      aria-label={`${listing.type} marker`}
    >
      <div
        className="rounded-full border-2 border-white"
        style={{
          width: isActive ? 14 : 10,
          height: isActive ? 14 : 10,
          backgroundColor: markerColors[listing.markerType],
          boxShadow: `0 0 0 3px ${markerColors[listing.markerType]}33`,
        }}
      />
    </button>
  );
}

// ── Card layout config per listing ───────────────────────────────────────────
function cardStyle(listing: PropertyListing): React.CSSProperties {
  // Place the card slightly offset from the dot with a caret pointing down
  // Using absolute positioning inside the pan-able map canvas (200%×200% layer)
  return {
    top: `${listing.lat}%`,
    left: `${listing.lng}%`,
    transform: 'translate(-50%, -100%) translateY(-8px)',
  };
}

// ── Main MapSection ───────────────────────────────────────────────────────────
export default function MapSection() {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [activeId, setActiveId] = useState<string | null>('3'); // big office card selected by default
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
  const resetPan = useCallback(() => setPan({ x: 0, y: 0 }), []);

  return (
    <div
      className="relative flex-1 w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ backgroundColor: '#EBF0F5', minHeight: 0, touchAction: 'none', fontFamily: "'Outfit', sans-serif" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* ── Pan layer ── */}
      <div
        className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%]"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
      >
        {/* SVG road/boundary sketch */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* light green parks */}
          <ellipse cx="52" cy="32" rx="9"  ry="6"  fill="#D1FAE5" opacity="0.7" />
          <ellipse cx="28" cy="62" rx="7"  ry="5"  fill="#D1FAE5" opacity="0.6" />
          <ellipse cx="78" cy="66" rx="6"  ry="4"  fill="#D1FAE5" opacity="0.6" />
          {/* water */}
          <ellipse cx="60" cy="52" rx="4"  ry="2.5" fill="#BFDBFE" opacity="0.7" />
          {/* outer ring road */}
          <path d="M8 5 Q50 0 92 8 Q97 50 90 92 Q50 98 8 90 Q3 50 8 5"
            fill="none" stroke="#D1D5DB" strokeWidth="1.8" />
          {/* major roads */}
          <line x1="12" y1="10" x2="88" y2="82" stroke="#CBD5E1" strokeWidth="1.4" />
          <line x1="2"  y1="46" x2="98" y2="54" stroke="#CBD5E1" strokeWidth="1.2" />
          <line x1="4"  y1="72" x2="96" y2="70" stroke="#E2E8F0" strokeWidth="1.0" />
          <line x1="46" y1="2"  x2="54" y2="98" stroke="#CBD5E1" strokeWidth="1.2" />
          <line x1="22" y1="2"  x2="20" y2="98" stroke="#E2E8F0" strokeWidth="0.8" />
          <line x1="78" y1="2"  x2="74" y2="98" stroke="#E2E8F0" strokeWidth="0.8" />
          <path d="M22 22 Q50 16 78 24 Q84 50 76 78 Q50 84 22 76 Q16 50 22 22"
            fill="none" stroke="#E2E8F0" strokeWidth="1.2" />
          <line x1="68" y1="33" x2="82" y2="56" stroke="#CBD5E1" strokeWidth="1.0" />
          <line x1="6"  y1="74" x2="20" y2="88" stroke="#CBD5E1" strokeWidth="1.0" />
        </svg>

        {/* Map area labels */}
        {mapLabels.map((lbl) => (
          <span
            key={lbl.label}
            className="absolute text-[7.5px] font-bold tracking-[0.12em] text-[#94A3B8] select-none pointer-events-none uppercase"
            style={{ top: `${lbl.top}%`, left: `${lbl.left}%`, transform: 'translate(-50%,-50%)' }}
            aria-hidden="true"
          >
            {lbl.label}
          </span>
        ))}

        {/* Road number badges */}
        {[{ top: '47%', left: '77%', n: '44' }, { top: '68%', left: '8%', n: '65' }].map((b) => (
          <div
            key={b.n}
            className="absolute flex items-center justify-center rounded border border-[#CBD5E1] bg-white/90 shadow-sm pointer-events-none"
            style={{ top: b.top, left: b.left, width: 22, height: 22 }}
            aria-hidden="true"
          >
            <span className="text-[9px] font-bold text-[#64748B]">{b.n}</span>
          </div>
        ))}

        {/* ORR labels */}
        {[{ top: '12%', left: '8%', r: '-52deg' }, { top: '16%', left: '48%', r: '18deg' }].map((s, i) => (
          <span
            key={i}
            className="absolute text-[7.5px] font-bold tracking-[0.12em] text-[#94A3B8] select-none pointer-events-none"
            style={{ top: s.top, left: s.left, transform: `rotate(${s.r})` }}
            aria-hidden="true"
          >
            ORR
          </span>
        ))}

        {/* Current location dot */}
        <div
          className="absolute pointer-events-none"
          style={{ top: '52%', left: '58%', transform: 'translate(-50%,-50%)' }}
          aria-label="Current location"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute rounded-full" style={{ width: 72, height: 72, backgroundColor: 'rgba(37,99,235,0.10)' }} />
            <div
              className="relative rounded-full border-[2.5px] border-white"
              style={{ width: 16, height: 16, backgroundColor: '#2563EB', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
            />
          </div>
        </div>

        {/* Dot markers */}
        {mapListings.map((l) => (
          <DotMarker key={l.id} listing={l} isActive={activeId === l.id} onSelect={setActiveId} />
        ))}

        {/* Floating property cards */}
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

      {/* ── Fixed overlays ── */}

      {/* Top-left: property count */}
      <div className="absolute top-3 left-3 z-30 pointer-events-none">
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white/95"
          style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.10)', border: '1px solid #E5E7EB', backdropFilter: 'blur(6px)' }}
        >
          <span className="text-[12px] font-bold text-[#111827]">124 Properties</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
          </svg>
        </div>
      </div>

      {/* Top-right: Premium Listings badge */}
      <div className="absolute top-3 right-3 z-30 pointer-events-none">
        <div
          className="flex flex-col items-center px-3 py-1.5 rounded-[10px]"
          style={{
            background: 'linear-gradient(135deg, #0F1626 0%, #1a2540 100%)',
            border: '1px solid rgba(251,191,36,0.30)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="text-[11px] font-bold text-[#FBBF24]">Premium Listings</span>
          </div>
          <span className="text-[9px] text-white/60 leading-none mt-0.5">Top 5 premium listings shown</span>
        </div>
      </div>

      {/* Centre badge: listings count */}
      <div
        className="absolute z-30 pointer-events-none"
        style={{ top: '47%', left: '50%', transform: 'translate(-50%,-50%)' }}
      >
        <div
          className="flex flex-col items-center justify-center rounded-full border-[2px] border-white"
          style={{
            width: 44,
            height: 44,
            backgroundColor: '#1E293B',
            boxShadow: '0 4px 16px rgba(0,0,0,0.30)',
          }}
        >
          <span className="text-[13px] font-extrabold text-white leading-none">18</span>
          <span className="text-[7px] text-white/60 leading-none mt-0.5">Listings</span>
        </div>
      </div>

      {/* Right: floating control buttons */}
      <div
        className="absolute right-3 z-30 flex flex-col overflow-hidden rounded-[10px] bg-white border border-[#E5E7EB] pointer-events-auto"
        style={{ bottom: 'clamp(200px, calc(30% + 20px), 280px)', boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
      >
        <button
          onClick={resetPan}
          className="w-[40px] h-[40px] flex items-center justify-center border-b border-[#F3F4F6] hover:bg-gray-50 active:bg-gray-100 transition-colors focus-visible:outline-none"
          aria-label="Locate me"
        >
          <LocateIcon color="#111827" />
        </button>
        <button
          className="w-[40px] h-[40px] flex items-center justify-center border-b border-[#F3F4F6] hover:bg-gray-50 active:bg-gray-100 transition-colors focus-visible:outline-none"
          aria-label="Map layers"
        >
          <LayersIcon color="#111827" />
        </button>
        <button
          className="w-[40px] h-[40px] flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors focus-visible:outline-none"
          aria-label="Navigate"
        >
          <NavIcon color="#111827" />
        </button>
      </div>
    </div>
  );
}
