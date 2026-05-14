import React, { useState, useRef } from 'react';
import type { LeaseMarker, LeaseMarkerType } from './types';
import { leaseMapMarkers, leaseMapLabels } from './data';

// ── Marker icon config ────────────────────────────────────────────────────

const BuildingIcon = ({ color }: { color: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1.5" />
    <path d="M9 3v18" />
    <path d="M3 9h6M3 15h6M12 8h7M12 12h7M12 16h7" />
  </svg>
);

const SubLeaseMarkerIcon = ({ color }: { color: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="9" height="13" rx="1" />
    <rect x="13" y="3" width="9" height="13" rx="1" />
    <path d="M5 11h3M5 14h3M16 7h3M16 10h3" />
  </svg>
);

const CoWorkingMarkerIcon = ({ color }: { color: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="7" r="2.5" />
    <circle cx="16" cy="7" r="2.5" />
    <path d="M2 19v-1C2 15.9 4.7 14 8 14" />
    <path d="M22 19v-1c0-2.1-2.7-4-6-4s-6 1.9-6 4v1" />
  </svg>
);

const markerConfig: Record<LeaseMarkerType, { pinBg: string; Icon: React.FC<{ color: string }>; labelColor: string }> = {
  'full-space': { pinBg: '#7C3AED', Icon: BuildingIcon, labelColor: '#7C3AED' },
  'sub-lease':  { pinBg: '#059669', Icon: SubLeaseMarkerIcon, labelColor: '#059669' },
  'co-working': { pinBg: '#F97316', Icon: CoWorkingMarkerIcon, labelColor: '#F97316' },
};

// ── Single pin ─────────────────────────────────────────────────────────────

interface MarkerProps {
  marker: LeaseMarker;
  isSelected: boolean;
  onClick: (id: string) => void;
}

function LeaseMarkerPin({ marker, isSelected, onClick }: MarkerProps) {
  const cfg = markerConfig[marker.type];

  return (
    <button
      onClick={() => onClick(marker.id)}
      className="absolute transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none"
      style={{
        top: `${marker.lat}%`,
        left: `${marker.lng}%`,
        transform: 'translate(-14px, -100%)',
        zIndex: isSelected ? 30 : 10,
        fontFamily: "'Outfit', sans-serif",
      }}
      aria-label={`${marker.propertyType} at ${marker.location}: ${marker.price}`}
    >
      {/* Pin head */}
      <div className="flex flex-col items-center relative z-10">
        <div
          className="w-[28px] h-[28px] rounded-full flex items-center justify-center shadow-md border-[1.5px] border-white"
          style={{ backgroundColor: cfg.pinBg }}
        >
          <cfg.Icon color="#FFFFFF" />
        </div>
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: `6px solid ${cfg.pinBg}`,
            marginTop: -1,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Popup card */}
      <div
        className="absolute w-max bg-white rounded-[10px] py-1.5 px-2.5 text-left z-20 transition-all duration-200"
        style={{
          top: '12px',
          left: '28px',
          transform: 'translateY(-50%)',
          marginLeft: '5px',
          boxShadow: isSelected
            ? `0 4px 16px rgba(0,0,0,0.12), 0 0 0 1.5px ${cfg.pinBg}`
            : '0 2px 8px rgba(0,0,0,0.08)',
          border: `1px solid ${isSelected ? cfg.pinBg : '#F1F5F9'}`,
          minWidth: 96,
        }}
      >
        <div className="text-[10px] font-extrabold text-[#0F172A] leading-tight mb-[2px]">
          {marker.price}
        </div>
        <div
          className="text-[8.5px] font-semibold leading-tight"
          style={{ color: cfg.labelColor }}
        >
          {marker.propertyType}
        </div>
        <div className="text-[8px] font-medium text-[#64748B] leading-tight">
          {marker.detail}
        </div>
        <div className="text-[8px] font-medium text-[#94A3B8] leading-tight">
          {marker.location}
        </div>
      </div>
    </button>
  );
}

// ── Map Section ────────────────────────────────────────────────────────────

interface LeaseMapSectionProps {
  selectedMarkerId: string | null;
  onMarkerClick: (id: string) => void;
}

export default function LeaseMapSection({ selectedMarkerId, onMarkerClick }: LeaseMapSectionProps) {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className="relative flex-1 flex flex-col w-full overflow-hidden bg-[#EEF2F8]"
      style={{ fontFamily: "'Outfit', sans-serif", minHeight: 0, touchAction: 'none' }}
    >
      {/* Draggable map canvas */}
      <div
        className={`absolute inset-0 z-10 w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%]"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2,0.8,0.2,1)',
          }}
        >
          {/* Map SVG background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Green patches (parks/trees) */}
            <ellipse cx="55" cy="30" rx="11" ry="7" fill="#D1FAE5" opacity="0.65" />
            <ellipse cx="22" cy="62" rx="9"  ry="6" fill="#D1FAE5" opacity="0.55" />
            <ellipse cx="78" cy="68" rx="8"  ry="5" fill="#D1FAE5" opacity="0.5" />
            <ellipse cx="44" cy="84" rx="14" ry="8" fill="#D1FAE5" opacity="0.4" />
            <ellipse cx="62" cy="50" rx="5"  ry="4" fill="#DBEAFE" opacity="0.7" />
            {/* Water body */}
            <ellipse cx="85" cy="38" rx="4"  ry="3" fill="#BFDBFE" opacity="0.7" />

            {/* Outer ring road */}
            <path d="M 5 5 Q 50 0 95 10 Q 100 52 90 96 Q 50 100 5 90 Q 0 52 5 5"
              fill="none" stroke="#D1D5DB" strokeWidth="2" opacity="0.6" />

            {/* Main roads */}
            <line x1="5"  y1="50" x2="95" y2="50" stroke="#E5E7EB" strokeWidth="1.4" />
            <line x1="48" y1="5"  x2="52" y2="95" stroke="#E5E7EB" strokeWidth="1.4" />
            <line x1="10" y1="10" x2="90" y2="82" stroke="#F3F4F6" strokeWidth="1.2" />
            <line x1="5"  y1="70" x2="95" y2="65" stroke="#F3F4F6" strokeWidth="1.0" />
            <line x1="20" y1="5"  x2="25" y2="95" stroke="#F9FAFB" strokeWidth="0.9" />
            <line x1="78" y1="5"  x2="75" y2="95" stroke="#F9FAFB" strokeWidth="0.9" />
          </svg>

          {/* Area labels */}
          {leaseMapLabels.map((lbl) => (
            <span
              key={lbl.label}
              className="absolute text-[8px] font-bold tracking-[0.14em] text-[#94A3B8] select-none pointer-events-none uppercase"
              style={{
                top: `${lbl.top}%`,
                left: `${lbl.left}%`,
                transform: 'translate(-50%, -50%)',
              }}
              aria-hidden="true"
            >
              {lbl.label}
            </span>
          ))}

          {/* Road labels */}
          <span className="absolute text-[8px] font-bold tracking-[0.14em] text-[#94A3B8] select-none pointer-events-none"
            style={{ top: '12%', left: '9%', transform: 'rotate(-50deg)' }} aria-hidden="true">
            ORR
          </span>
          <span className="absolute text-[8px] font-bold tracking-[0.14em] text-[#94A3B8] select-none pointer-events-none"
            style={{ top: '15%', left: '48%', transform: 'rotate(20deg)' }} aria-hidden="true">
            ORR
          </span>

          {/* Highway badges */}
          <div className="absolute flex items-center justify-center w-[20px] h-[20px] rounded border border-[#CBD5E1] bg-white shadow-sm pointer-events-none"
            style={{ top: '46%', left: '91%' }} aria-hidden="true">
            <span className="text-[8px] font-bold text-[#64748B]">44</span>
          </div>
          <div className="absolute flex items-center justify-center w-[20px] h-[20px] rounded border border-[#CBD5E1] bg-white shadow-sm pointer-events-none"
            style={{ top: '68%', left: '9%' }} aria-hidden="true">
            <span className="text-[8px] font-bold text-[#64748B]">65</span>
          </div>

          {/* Current-location dot */}
          <div
            className="absolute pointer-events-none"
            style={{ top: '50%', left: '48%', transform: 'translate(-50%, -50%)' }}
            aria-label="Current location"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute rounded-full" style={{ width: 56, height: 56, backgroundColor: 'rgba(59,130,246,0.11)' }} />
              <div
                className="relative rounded-full border-[2px] border-white"
                style={{ width: 13, height: 13, backgroundColor: '#3B82F6', boxShadow: '0 2px 6px rgba(0,0,0,0.18)' }}
              />
            </div>
          </div>

          {/* Markers */}
          {leaseMapMarkers.map((marker) => (
            <div key={marker.id} onPointerDown={(e) => e.stopPropagation()}>
              <LeaseMarkerPin
                marker={marker}
                isSelected={selectedMarkerId === marker.id}
                onClick={onMarkerClick}
              />
            </div>
          ))}
        </div>
      </div>



      <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">

      </div>
    </div>
  );
}
