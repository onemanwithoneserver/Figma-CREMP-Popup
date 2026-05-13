import { useState, useRef, useCallback } from 'react';
import type { PropertyListing } from './types';
import { mapListings, mapLabels } from './data';

// ── Category colour map ──────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  'Retail Shop':      '#2563EB',
  'Showroom':         '#7C3AED',
  'Office Space':     '#6D28D9',
  'Warehouse':        '#B45309',
  'Commercial Plot':  '#EA580C',
};

// ── marker color map ──────────────────────────────────────────────────────────
const markerColors: Record<PropertyListing['markerType'], string> = {
  retail:    '#2563EB',
  office:    '#6D28D9',
  warehouse: '#B45309',
  showroom:  '#7C3AED',
  plot:      '#EA580C',
  movable:   '#0891B2',
};

// ── SVG icons ─────────────────────────────────────────────────────────────────
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#EF4444' : 'none'} stroke={filled ? '#EF4444' : '#CBD5E1'} strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const LocationPinIcon = ({ color }: { color: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const LocateIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" fill={color} stroke="none" />
    <circle cx="12" cy="12" r="7" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

const NavIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const AreaIcon = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

const MapPin = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="none">
    <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" fill={color} />
    <circle cx="12" cy="9" r="3" fill="#FFFFFF" />
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

  const catColor = categoryColors[listing.type] || '#2563EB';

  // Determine card width based on property type for natural variety
  const cardWidth = listing.id === '3' ? 162 : listing.id === '2' || listing.id === '5' ? 154 : 148;

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
      <div className="flex flex-col items-center">
        {/* ── Card body ── */}
        <div
          style={{
            width: cardWidth,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: isActive
              ? `0 12px 32px rgba(0,0,0,0.16), 0 0 0 1.5px ${catColor}40`
              : '0 6px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
            border: isActive ? 'none' : '1px solid rgba(0,0,0,0.04)',
            transition: 'box-shadow 0.3s, transform 0.3s',
          }}
        >
          {/* ── Thumbnail ── */}
          <div className="relative" style={{ width: '100%', height: 90, overflow: 'hidden' }}>
            {!imgErr && listing.imageUrl ? (
              <img
                src={listing.imageUrl}
                alt={listing.type}
                onError={() => setImgErr(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#F1F5F9' }}>
                <AreaIcon color="#94A3B8" />
              </div>
            )}

            {/* Heart icon */}
            <button
              onPointerDown={(e) => { e.stopPropagation(); setSaved((s) => !s); }}
              className="absolute focus-visible:outline-none active:scale-90 transition-transform"
              style={{
                top: 8,
                right: 8,
                width: 26,
                height: 26,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              }}
              aria-label="Save listing"
            >
              <HeartIcon filled={saved} />
            </button>
          </div>

          {/* ── Card info ── */}
          <div style={{ padding: '10px 12px 12px' }}>
            {/* Price */}
            <span
              style={{
                display: 'block',
                fontSize: 15,
                fontWeight: 800,
                color: '#111827',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {listing.price}
            </span>

            {/* Category badge */}
            <span
              style={{
                display: 'inline-block',
                marginTop: 6,
                fontSize: 9.5,
                fontWeight: 700,
                color: catColor,
                backgroundColor: `${catColor}10`,
                padding: '3px 8px',
                borderRadius: 6,
                letterSpacing: '0.02em',
                lineHeight: 1,
              }}
            >
              {listing.type}
            </span>

            {/* Area */}
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: '#475569', lineHeight: 1 }}>
                {listing.area} {listing.areaUnit}
              </span>
            </div>

            {/* Location row */}
            <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 3 }}>
              <LocationPinIcon color="#94A3B8" />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: '#64748B',
                  lineHeight: 1,
                  maxWidth: cardWidth - 40,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {listing.location}
              </span>
            </div>
          </div>
        </div>

        {/* ── Pin tail ── */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '7px solid rgba(255,255,255,0.97)',
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.10))',
          }}
        />
      </div>
    </button>
  );
}

// ── Map dot marker ────────────────────────────────────────────────────────────
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
      <div style={{ transform: isActive ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }}>
        <MapPin color={markerColors[listing.markerType]} />
      </div>
    </button>
  );
}

// ── Card layout config ───────────────────────────────────────────────────────
function cardStyle(listing: PropertyListing): React.CSSProperties {
  return {
    top: `${listing.lat}%`,
    left: `${listing.lng}%`,
    transform: 'translate(-50%, -100%) translateY(-10px)',
  };
}

// ── Main MapSection ───────────────────────────────────────────────────────────
export default function MapSection() {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [activeId, setActiveId] = useState<string | null>('3');
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
  const resetPan = useCallback(() => { setPan({ x: 0, y: 0 }); setZoom(1); }, []);
  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.2, 2)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.2, 0.6)), []);

  return (
    <div
      className="relative flex-1 w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{
        backgroundColor: '#EEF1F6',
        minHeight: 0,
        touchAction: 'none',
        fontFamily: "'Outfit', sans-serif",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* ── Pan layer ── */}
      <div
        className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%]"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.15s ease-out' }}
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
            className="absolute select-none pointer-events-none uppercase"
            style={{
              top: `${lbl.top}%`,
              left: `${lbl.left}%`,
              transform: 'translate(-50%,-50%)',
              fontSize: 7.5,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#94A3B8',
            }}
            aria-hidden="true"
          >
            {lbl.label}
          </span>
        ))}

        {/* Road number badges */}
        {[{ top: '47%', left: '77%', n: '44' }, { top: '68%', left: '8%', n: '65' }].map((b) => (
          <div
            key={b.n}
            className="absolute flex items-center justify-center pointer-events-none"
            style={{
              top: b.top,
              left: b.left,
              width: 24,
              height: 24,
              borderRadius: 6,
              border: '1px solid #CBD5E1',
              backgroundColor: 'rgba(255,255,255,0.92)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
            aria-hidden="true"
          >
            <span style={{ fontSize: 9, fontWeight: 700, color: '#64748B' }}>{b.n}</span>
          </div>
        ))}

        {/* ORR labels */}
        {[{ top: '12%', left: '8%', r: '-52deg' }, { top: '16%', left: '48%', r: '18deg' }].map((s, i) => (
          <span
            key={i}
            className="absolute select-none pointer-events-none"
            style={{
              top: s.top,
              left: s.left,
              transform: `rotate(${s.r})`,
              fontSize: 7.5,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#94A3B8',
            }}
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
            <div
              className="absolute rounded-full"
              style={{
                width: 72,
                height: 72,
                backgroundColor: 'rgba(37,99,235,0.08)',
              }}
            />
            <div
              className="relative rounded-full"
              style={{
                width: 16,
                height: 16,
                backgroundColor: '#2563EB',
                border: '2.5px solid #FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              }}
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
      <div className="absolute top-3 left-5 z-30 pointer-events-none">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          <span style={{ fontSize: 12.5, fontWeight: 700, color: '#111827', lineHeight: 1 }}>
            124 Properties
          </span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
          </svg>
        </div>
      </div>

      {/* Top-right: Premium Listings badge */}
      <div className="absolute top-3 right-5 z-30 pointer-events-none">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '8px 14px',
            borderRadius: 14,
            backgroundColor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Shield icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="none">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4z" fill="#0B1320" />
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FBBF24" transform="scale(0.5) translate(12, 10)" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', lineHeight: 1 }}>
              Premium Listings
            </span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 500, color: '#64748B', lineHeight: 1, marginTop: 4, marginLeft: 22 }}>
            Top 5 premium listings shown
          </span>
        </div>
      </div>



      {/* Right: floating control buttons */}
      <div
        className="absolute right-5 z-30 flex flex-col gap-2.5 pointer-events-none"
        style={{ bottom: 'clamp(24px, calc(35% + 20px), 300px)' }}
      >
        <button
          onClick={resetPan}
          className="flex items-center justify-center focus-visible:outline-none pointer-events-auto active:scale-95 transition-all"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
          aria-label="Locate me"
        >
          <LocateIcon color="#111827" />
        </button>
        <button
          className="flex items-center justify-center focus-visible:outline-none pointer-events-auto active:scale-95 transition-all"
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
          aria-label="Navigate"
        >
          <NavIcon color="#111827" />
        </button>

        {/* Zoom controls */}
        <div
          style={{
            borderRadius: 14,
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
          className="pointer-events-auto"
        >
          <button
            onClick={zoomIn}
            className="flex items-center justify-center focus-visible:outline-none active:bg-gray-100 transition-colors"
            style={{ width: 44, height: 40 }}
            aria-label="Zoom in"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <div style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.06)' }} />
          <button
            onClick={zoomOut}
            className="flex items-center justify-center focus-visible:outline-none active:bg-gray-100 transition-colors"
            style={{ width: 44, height: 40 }}
            aria-label="Zoom out"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
