/**
 * BrokerMapDrawer.tsx
 * Desktop:  right-side slide-in drawer (same pattern as BrokerFilters)
 * Mobile:   bottom-sheet modal with drag-to-close
 */

import { useState, useEffect, useRef } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface BrokerMapDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDesktop: boolean;
  brokerCount: number;
}

// ─── Animated mount hook (identical to BrokerFilters) ───────────────────────

function useAnimatedMount(isOpen: boolean, durationMs = 320) {
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), durationMs);
      return () => clearTimeout(t);
    }
  }, [isOpen, durationMs]);

  return { mounted, visible };
}

// ─── Map data ────────────────────────────────────────────────────────────────

const mapPins = [
  { x: 22, y: 30, label: 'HITEC City',       city: 'Hyderabad', price: '₹85L',   count: 12, active: true  },
  { x: 55, y: 22, label: 'Banjara Hills',    city: 'Hyderabad', price: '₹1.2Cr', count: 8,  active: false },
  { x: 72, y: 48, label: 'BKC',              city: 'Mumbai',    price: '₹3.4Cr', count: 15, active: false },
  { x: 38, y: 60, label: 'Gachibowli',       city: 'Hyderabad', price: '₹2.8Cr', count: 10, active: false },
  { x: 65, y: 70, label: 'Whitefield',       city: 'Bengaluru', price: '₹1.8Cr', count: 9,  active: false },
  { x: 18, y: 65, label: 'Connaught Place',  city: 'Delhi',     price: '₹4.0Cr', count: 6,  active: false },
  { x: 84, y: 35, label: 'Andheri',          city: 'Mumbai',    price: '₹2.1Cr', count: 7,  active: false },
  { x: 48, y: 82, label: 'OMR',              city: 'Chennai',   price: '₹95L',   count: 5,  active: false },
];

const cityColors: Record<string, string> = {
  Hyderabad: '#0a1128',
  Mumbai:    '#7c3aed',
  Bengaluru: '#0369a1',
  Delhi:     '#be185d',
  Chennai:   '#0369a1',
  Pune:      '#d97706',
};

// ─── City hierarchy (for searchable combobox) ────────────────────────────────

const cityHierarchy = [
  { city: 'Hyderabad', localities: ['Gachibowli', 'Madhapur', 'Kondapur', 'Hitech City'] },
  { city: 'Mumbai',    localities: ['Andheri', 'Bandra', 'Powai', 'BKC'] },
  { city: 'Bengaluru', localities: ['Whitefield', 'Indiranagar', 'Electronic City', 'Koramangala'] },
  { city: 'Delhi',     localities: ['Saket', 'Rohini', 'Dwarka', 'Connaught Place'] },
  { city: 'Chennai',   localities: ['OMR', 'T Nagar', 'Velachery'] },
];

interface CitySelection {
  city: string | null;
  locality: string | null;
  label: string;
}

// ─── City Combobox ────────────────────────────────────────────────────────────

function CityComboBox({ value, onChange }: { value: CitySelection; onChange: (v: CitySelection) => void }) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState('');
  const containerRef      = useRef<HTMLDivElement>(null);
  const inputRef          = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const filtered = query.trim()
    ? cityHierarchy.flatMap((g) => {
        const cityMatch = g.city.toLowerCase().includes(query.toLowerCase());
        const locMatches = g.localities.filter((l) => l.toLowerCase().includes(query.toLowerCase()));
        if (!cityMatch && locMatches.length === 0) return [];
        return [{ city: g.city, localities: cityMatch ? g.localities : locMatches }];
      })
    : cityHierarchy;

  const select = (v: CitySelection) => { onChange(v); setOpen(false); setQuery(''); };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-[#e5e7eb] rounded-[4px] text-[12px] font-semibold text-[#0a1128] hover:border-[#d4af37]/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37]/50 transition-colors"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        <span className="flex items-center gap-1.5 min-w-0">
          <svg viewBox="0 0 16 16" fill="none" stroke="#d4af37" strokeWidth="1.6" strokeLinecap="round" className="w-3 h-3 shrink-0">
            <path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3 4 9 4 9s4-6 4-9c0-2.21-1.79-4-4-4z" />
            <circle cx="8" cy="5.5" r="1.5" fill="#d4af37" stroke="none" />
          </svg>
          <span className="truncate">{value.label}</span>
        </span>
        <svg
          viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"
          className={`w-3 h-3 shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e5e7eb] rounded-[4px] shadow-lg z-50 flex flex-col"
          style={{ maxHeight: 240 }}
        >
          {/* Search input */}
          <div className="p-2 border-b border-[#f0f1f3] shrink-0">
            <div className="relative">
              <svg viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <circle cx="7" cy="7" r="4" /><path d="M11 11l3 3" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city or area…"
                className="w-full pl-7 pr-3 py-1.5 text-[11px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] placeholder-[#9ca3af] text-[#0a1128] focus:outline-none focus:ring-1 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/60"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              />
            </div>
          </div>

          {/* Options list */}
          <div className="overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {/* All cities */}
            <button
              type="button"
              onClick={() => select({ city: null, locality: null, label: 'All cities' })}
              className={`w-full text-left px-3 py-2 text-[12px] font-semibold flex items-center gap-2 hover:bg-[#f9fafb] transition-colors ${value.city === null ? 'text-[#d4af37] bg-[#faf8f0]' : 'text-[#0a1128]'}`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-3 h-3 shrink-0">
                <circle cx="8" cy="8" r="5.5" /><path d="M2.5 8h11M8 2.5a10 10 0 010 11M8 2.5a10 10 0 000 11" />
              </svg>
              All cities
              {value.city === null && (
                <svg viewBox="0 0 16 16" fill="none" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 ml-auto shrink-0">
                  <path d="M3 8l3.5 3.5 6.5-7" />
                </svg>
              )}
            </button>

            {/* City groups */}
            {filtered.map((group) => (
              <div key={group.city}>
                {/* City row */}
                <button
                  type="button"
                  onClick={() => select({ city: group.city, locality: null, label: group.city })}
                  className={`w-full text-left px-3 py-2 text-[12px] font-bold flex items-center gap-2 hover:bg-[#f9fafb] transition-colors border-t border-[#f0f1f3] ${value.city === group.city && !value.locality ? 'text-[#d4af37] bg-[#faf8f0]' : 'text-[#0a1128]'}`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  <span className="w-2 h-2 rounded-[2px] shrink-0" style={{ background: cityColors[group.city] ?? '#0a1128' }} />
                  {group.city}
                  {value.city === group.city && !value.locality && (
                    <svg viewBox="0 0 16 16" fill="none" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 ml-auto shrink-0">
                      <path d="M3 8l3.5 3.5 6.5-7" />
                    </svg>
                  )}
                </button>
                {/* Locality rows */}
                {group.localities.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => select({ city: group.city, locality: loc, label: `${loc}, ${group.city}` })}
                    className={`w-full text-left pl-7 pr-3 py-1.5 text-[11px] font-medium flex items-center gap-2 hover:bg-[#f9fafb] transition-colors ${value.locality === loc ? 'text-[#d4af37] bg-[#faf8f0]' : 'text-[#637089]'}`}
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    <span className="w-px h-3 bg-[#e5e7eb] shrink-0" />
                    {loc}
                    {value.locality === loc && (
                      <svg viewBox="0 0 16 16" fill="none" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 ml-auto shrink-0">
                        <path d="M3 8l3.5 3.5 6.5-7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="px-3 py-5 text-[12px] text-[#a0aabf] text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
                No results for &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Map Panel Content ────────────────────────────────────────────────────────

function MapContent({ onClose }: { onClose: () => void }) {
  const [activePin, setActivePin]         = useState<number | null>(null);
  const [zoom, setZoom]                   = useState(1);
  const [citySelection, setCitySelection] = useState<CitySelection>({ city: null, locality: null, label: 'All cities' });

  const visiblePins = (() => {
    if (!citySelection.city) return mapPins;
    if (citySelection.locality) {
      return mapPins.filter((p) =>
        p.city === citySelection.city &&
        p.label.toLowerCase().includes(citySelection.locality!.toLowerCase())
      );
    }
    return mapPins.filter((p) => p.city === citySelection.city);
  })();

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'Outfit, sans-serif' }}>

      {/* ── City combobox + Done ── */}
      <div className="shrink-0 px-2.5 py-1.5 border-b border-[#f0f1f3] flex items-center gap-2 bg-white">
        <div className="flex-1 min-w-0">
          <CityComboBox value={citySelection} onChange={setCitySelection} />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 px-4 py-2 rounded-[4px] bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white text-[12px] font-semibold tracking-wide shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Done
        </button>
      </div>

      {/* ── Map canvas ── */}
      <div className="flex-1 relative overflow-hidden" style={{ background: 'linear-gradient(160deg,#e8edf5 0%,#dde4f0 40%,#e4e9f2 100%)' }}>

        {/* Scalable canvas */}
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(10,17,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,17,40,0.04) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          {/* Road / territory SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.18 }}>
            {/* Major highways */}
            <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#0a1128" strokeWidth="2.5" strokeDasharray="0" />
            <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#0a1128" strokeWidth="2.5" />
            {/* Secondary roads */}
            <line x1="0%" y1="25%" x2="100%" y2="72%" stroke="#0a1128" strokeWidth="1.4" />
            <line x1="0%" y1="75%" x2="100%" y2="28%" stroke="#0a1128" strokeWidth="1.4" />
            <line x1="20%" y1="0%" x2="80%" y2="100%" stroke="#0a1128" strokeWidth="0.9" />
            <line x1="80%" y1="0%" x2="20%" y2="100%" stroke="#0a1128" strokeWidth="0.9" />
            {/* Ring roads */}
            <circle cx="50%" cy="50%" r="90"  stroke="#0a1128" strokeWidth="1.4" fill="none" />
            <circle cx="50%" cy="50%" r="170" stroke="#0a1128" strokeWidth="1"   fill="none" />
            <circle cx="50%" cy="50%" r="240" stroke="#0a1128" strokeWidth="0.6" fill="none" strokeDasharray="6 4" />
            {/* Zone fills */}
            <circle cx="50%" cy="50%" r="80" fill="rgba(10,17,40,0.025)" />
          </svg>

          {/* Pins */}
          {visiblePins.map((pin) => {
            const idx = mapPins.indexOf(pin);
            const isActive = activePin === idx;
            const color = cityColors[pin.city] ?? '#0a1128';
            return (
              <button
                key={idx}
                onClick={() => setActivePin(isActive ? null : idx)}
                aria-label={`${pin.label}, ${pin.city}: ${pin.price}`}
                className="absolute flex flex-col items-center focus-visible:outline-none"
                style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%,-100%)', zIndex: isActive ? 20 : 2 }}
              >
                {/* Price bubble */}
                <div
                  className="px-2.5 py-[4px] text-[11px] font-bold whitespace-nowrap transition-all duration-200"
                  style={{
                    background: isActive ? color : '#ffffff',
                    color: isActive ? '#ffffff' : '#0a1128',
                    borderRadius: 4,
                    border: isActive ? `1.5px solid ${color}` : '1.5px solid rgba(10,17,40,0.12)',
                    boxShadow: isActive ? `0 4px 14px ${color}44` : '0 2px 6px rgba(0,0,0,0.1)',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    fontFamily: 'Outfit, sans-serif',
                  }}
                >
                  {pin.price}
                  {isActive && <span className="ml-1 opacity-70 text-[9px]">· {pin.count}</span>}
                </div>
                {/* Teardrop stem */}
                <svg width="10" height="7" viewBox="0 0 10 7" className="transition-all duration-200" style={{ marginTop: -1 }}>
                  <polygon points="0,0 10,0 5,7" fill={isActive ? color : '#0a1128'} opacity={isActive ? 1 : 0.55} />
                </svg>
                {/* Dot */}
                <div
                  className="w-2 h-2 rounded-full transition-all duration-200"
                  style={{
                    background: isActive ? color : '#0a1128',
                    opacity: isActive ? 1 : 0.45,
                    boxShadow: isActive ? `0 0 0 5px ${color}2e` : 'none',
                    marginTop: -2,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Zoom controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
            aria-label="Zoom in"
            className="w-8 h-8 bg-white rounded-[4px] flex items-center justify-center shadow-md border border-black/[0.07] hover:bg-[#f5f6f8] active:scale-95 transition-all"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-3.5 h-3.5">
              <path d="M8 3v10M3 8h10" />
            </svg>
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
            aria-label="Zoom out"
            className="w-8 h-8 bg-white rounded-[4px] flex items-center justify-center shadow-md border border-black/[0.07] hover:bg-[#f5f6f8] active:scale-95 transition-all"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-3.5 h-3.5">
              <path d="M3 8h10" />
            </svg>
          </button>
          <button
            onClick={() => { setZoom(1); setActivePin(null); }}
            aria-label="Reset view"
            className="w-8 h-8 bg-white rounded-[4px] flex items-center justify-center shadow-md border border-black/[0.07] hover:bg-[#f5f6f8] active:scale-95 transition-all mt-1"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="1.8" strokeLinecap="round" className="w-3.5 h-3.5">
              <circle cx="8" cy="8" r="2" />
              <path d="M8 1v3M8 12v3M1 8h3M12 8h3" />
            </svg>
          </button>
        </div>

        {/* Active pin detail card */}
        {activePin !== null && (
          <div
            className="absolute bottom-3 left-3 right-3 rounded-[4px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-black/[0.05]"
            style={{ animation: 'cb-slide-up 0.2s ease', zIndex: 20 }}
          >
            {/* Dark header strip */}
            <div
              className="flex items-center justify-between px-3.5 py-2.5"
              style={{ background: `linear-gradient(135deg,${cityColors[mapPins[activePin].city] ?? '#0a1128'} 0%,${cityColors[mapPins[activePin].city] ?? '#0a1128'}cc 100%)` }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 shrink-0">
                  <path d="M10 2C7.24 2 5 4.24 5 7c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5z" fill="white" />
                  <circle cx="10" cy="7" r="2.2" fill={cityColors[mapPins[activePin].city] ?? '#0a1128'} />
                </svg>
                <p className="text-[13px] font-bold text-white truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {mapPins[activePin].label}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-white/70 shrink-0 ml-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {mapPins[activePin].city}
              </span>
            </div>
            {/* Info row */}
            <div className="bg-white flex items-center justify-between px-3.5 py-2.5">
              <div>
                <p className="text-[11px] text-[#637089] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {mapPins[activePin].count} brokers active
                </p>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-bold text-[#d4af37]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {mapPins[activePin].price}
                </p>
                <p className="text-[10px] text-[#a0aabf] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>avg. listing</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Quick stats strip ── */}
      <div className="shrink-0 px-3 py-1.5 border-t border-[#f0f1f3] bg-white grid grid-cols-3 gap-2">
        {[
          { label: 'Active Cities', value: cityHierarchy.length.toString() },
          { label: 'Total Brokers', value: '140+' },
          { label: 'Listings', value: '320+' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-[13px] font-bold text-[#d4af37]" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
            <p className="text-[10px] text-[#a0aabf] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.label}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

// ─── Desktop Drawer ───────────────────────────────────────────────────────────

function DesktopMapDrawer({ isOpen, onClose }: BrokerMapDrawerProps) {
  const { mounted, visible } = useAnimatedMount(isOpen, 300);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        aria-hidden="true"
        className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Map View"
        className="absolute right-0 top-0 h-full z-[101] bg-white shadow-2xl flex flex-col"
        style={{
          width: 'clamp(340px, 37.5vw, 500px)',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {/* Header — close button only */}
        <div className="shrink-0 flex items-center justify-end px-3 py-2 border-b border-[#f0f1f3] bg-white">
          <button
            type="button"
            aria-label="Close map panel"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-[4px] bg-[#f5f6f8] border border-black/[0.08] hover:bg-[#eef0f4] transition-colors focus-visible:outline-none"
          >
            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <MapContent onClose={onClose} />
        </div>
      </div>
    </>
  );
}

// ─── Mobile Bottom Sheet ──────────────────────────────────────────────────────

function MobileMapSheet({ isOpen, onClose }: BrokerMapDrawerProps) {
  const { mounted, visible } = useAnimatedMount(isOpen, 340);
  const sheetRef    = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const dragY       = useRef(0);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    dragY.current = 0;
    if (sheetRef.current) sheetRef.current.style.transition = 'none';
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    dragY.current = Math.max(0, delta);
    if (sheetRef.current) sheetRef.current.style.transform = `translateY(${dragY.current}px)`;
  };

  const handleTouchEnd = () => {
    if (sheetRef.current) sheetRef.current.style.transition = '';
    if (dragY.current > 90) {
      onClose();
    } else if (sheetRef.current) {
      sheetRef.current.style.transform = visible ? 'translateY(0)' : 'translateY(100%)';
    }
  };

  if (!mounted) return null;

  return (
    <>
      <div
        role="presentation"
        aria-hidden="true"
        className="absolute inset-0 z-[100] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Map View"
        className="absolute bottom-0 left-0 right-0 z-[101] bg-white rounded-t-[12px] shadow-[0_-8px_40px_rgba(0,0,0,0.16)] flex flex-col overflow-hidden"
        style={{
          height: '88vh',
          maxHeight: '88vh',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 320ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Drag handle row */}
        <div
          className="shrink-0 relative flex items-center justify-center pt-3 pb-2 touch-none select-none cursor-grab active:cursor-grabbing bg-white border-b border-[#f0f1f3]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <span className="w-10 h-1 rounded-full bg-black/[0.12] pointer-events-none" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close map"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-[#f5f6f8] rounded-[4px] border border-black/[0.08] hover:bg-[#eef0f4] transition-colors focus-visible:outline-none"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-3 h-3">
              <path d="M4 4l8 8M12 4L4 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <MapContent onClose={onClose} />
        </div>
      </div>
    </>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export default function BrokerMapDrawer(props: BrokerMapDrawerProps) {
  return props.isDesktop
    ? <DesktopMapDrawer {...props} />
    : <MobileMapSheet {...props} />;
}
