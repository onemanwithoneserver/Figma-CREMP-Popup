import { useRef, useState, useCallback } from 'react';
import SelectedBoundary from './SelectedBoundary';
import SelectedMarkers from './SelectedMarkers';
import { mapMarkers, mapLabels, selectedRegion } from './data';
import type { ViewMode } from './types';

const InfoIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01" />
  </svg>
);

const MapIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const ListIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

interface SelectedMapProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function SelectedMap({ viewMode, onViewModeChange }: SelectedMapProps) {
  const polyPoints = selectedRegion.polygonPoints;

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; lastX: number; lastY: number }>({
    active: false, startX: 0, startY: 0, lastX: 0, lastY: 0,
  });

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, lastX: pan.x, lastY: pan.y };
  }, [pan]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    setPan({ x: d.lastX + (e.clientX - d.startX), y: d.lastY + (e.clientY - d.startY) });
  }, []);

  const onPointerUp = useCallback(() => { dragRef.current.active = false; }, []);

  return (
    <div
      className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ backgroundColor: '#F8FAFC', minHeight: 0, flex: 1 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%]"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <ellipse cx="55" cy="35" rx="8"  ry="5"   fill="#DCFCE7" opacity="0.6" />
          <ellipse cx="30" cy="60" rx="6"  ry="4"   fill="#DCFCE7" opacity="0.5" />
          <ellipse cx="75" cy="65" rx="5"  ry="3.5" fill="#DCFCE7" opacity="0.5" />
          <path d="M 8 5 Q 50 2 92 8 Q 97 50 92 92 Q 50 97 8 92 Q 3 50 8 5" fill="none" stroke="#CBD5E1" strokeWidth="1.8" />
          <line x1="15" y1="15" x2="85" y2="78" stroke="#CBD5E1" strokeWidth="1.2" />
          <line x1="5"  y1="48" x2="95" y2="52" stroke="#CBD5E1" strokeWidth="1.0" />
          <line x1="5"  y1="70" x2="95" y2="72" stroke="#E2E8F0" strokeWidth="0.8" />
          <line x1="48" y1="5"  x2="52" y2="95" stroke="#CBD5E1" strokeWidth="1.0" />
          <line x1="25" y1="5"  x2="22" y2="95" stroke="#E2E8F0" strokeWidth="0.7" />
          <line x1="75" y1="5"  x2="72" y2="95" stroke="#E2E8F0" strokeWidth="0.7" />
          <path d="M 25 20 Q 50 15 75 22 Q 82 48 76 75 Q 50 82 24 75 Q 18 50 25 20" fill="none" stroke="#D1D9E0" strokeWidth="1.0" />
          <line x1="70" y1="35" x2="80" y2="55" stroke="#CBD5E1" strokeWidth="0.9" />
          <line x1="8"  y1="72" x2="18" y2="85" stroke="#CBD5E1" strokeWidth="0.9" />
          <SelectedBoundary points={polyPoints} />
        </svg>

        {mapLabels.map((lbl) => (
          <span
            key={lbl.label}
            className="absolute text-[8px] font-bold tracking-widest text-[#94A3B8] select-none pointer-events-none"
            style={{ top: `${lbl.top}%`, left: `${lbl.left}%` }}
          >
            {lbl.label}
          </span>
        ))}

        <div
          className="absolute flex items-center justify-center w-6 h-6 rounded-full border border-[#CBD5E1] bg-[#F8FAFC]"
          style={{ top: '41%', left: '73%' }}
        >
          <span className="text-[8px] font-bold text-[#94A3B8]">44</span>
        </div>
        <div
          className="absolute flex items-center justify-center w-6 h-6 rounded-full border border-[#CBD5E1] bg-[#F8FAFC]"
          style={{ top: '74%', left: '5%' }}
        >
          <span className="text-[8px] font-bold text-[#94A3B8]">65</span>
        </div>

        {[
          { top: '8%',  left: '6%',  rotate: '-60deg' },
          { top: '30%', left: '2%',  rotate: '-80deg' },
          { top: '15%', left: '48%', rotate: '0deg'   },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute text-[8px] font-bold tracking-widest text-[#94A3B8] select-none pointer-events-none"
            style={{ top: s.top, left: s.left, transform: `rotate(${s.rotate})` }}
          >
            ORR
          </span>
        ))}

        <div
          className="absolute pointer-events-none"
          style={{ top: '50%', left: '60%', transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 80, height: 80,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 28, height: 28,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(59,130,246,0.12)',
              border: '1.5px solid rgba(59,130,246,0.25)',
            }}
          />
          <div
            className="relative rounded-full"
            style={{
              width: 18, height: 18,
              backgroundColor: '#3B82F6',
              border: '2.5px solid white',
              boxShadow: '0 0 0 3px rgba(59,130,246,0.2)',
            }}
          />
        </div>

        <SelectedMarkers markers={mapMarkers} />
      </div>

      <div className="absolute top-3 left-0 right-0 flex items-center justify-between px-3 z-40 pointer-events-none gap-2 hidden">
        {/* Left: opportunity count */}
        <div className="flex items-center gap-1.5 h-[36px] px-3 rounded-[10px] bg-white border border-[#E5E7EB] shadow-[0_2px_10px_rgba(0,0,0,0.08)] pointer-events-auto shrink-0">
          <span className="text-[12px] font-bold text-[#111827] leading-none whitespace-nowrap">
            {selectedRegion.opportunityCount} Opportunities
          </span>
          <InfoIcon color="#9CA3AF" />
        </div>

        {/* Right: Map / List toggle */}
        <div
          className="flex items-center p-[3px] h-[36px] rounded-[10px] bg-white border border-[#E5E7EB] shadow-[0_2px_10px_rgba(0,0,0,0.08)] pointer-events-auto shrink-0"
          role="group"
          aria-label="View mode toggle"
        >
          <button
            onClick={() => onViewModeChange('map')}
            className={`flex items-center gap-1 px-2.5 h-[28px] text-[11.5px] font-semibold rounded-[7px] transition-all focus-visible:outline-none whitespace-nowrap ${viewMode === 'map'
              ? 'bg-[#0a1128] text-white shadow-sm'
              : 'bg-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            aria-pressed={viewMode === 'map'}
          >
            <MapIcon color={viewMode === 'map' ? '#FFFFFF' : '#6B7280'} />
            Map View
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`flex items-center gap-1 px-2.5 h-[28px] text-[11.5px] font-semibold rounded-[7px] transition-all focus-visible:outline-none whitespace-nowrap ${viewMode === 'list'
              ? 'bg-[#0a1128] text-white shadow-sm'
              : 'bg-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            aria-pressed={viewMode === 'list'}
          >
            <ListIcon color={viewMode === 'list' ? '#FFFFFF' : '#6B7280'} />
            List View
          </button>
        </div>
      </div>

      {/* Floating controls removed */}
    </div>
  );
}
