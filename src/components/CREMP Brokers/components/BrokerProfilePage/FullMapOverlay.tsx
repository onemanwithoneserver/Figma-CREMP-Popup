import { useState } from 'react';
import type { Broker } from '../../types/broker.types';
import { TIER_COLORS, MAP_PINS_BY_TIER } from './constants';

interface FullMapOverlayProps {
  broker: Broker;
  isDesktop: boolean;
  onClose: () => void;
}

export function FullMapOverlay({ broker, isDesktop, onClose }: FullMapOverlayProps) {
  const [zoom, setZoom] = useState(1);
  const locations = broker.serviceableLocations ?? [];
  const tierCounts = {
    'most-active': locations.filter((l) => l.tier === 'most-active').length,
    'moderately-active': locations.filter((l) => l.tier === 'moderately-active').length,
    'based-on-request': locations.filter((l) => l.tier === 'based-on-request').length,
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#0a1128]/60 backdrop-blur-[3px] [animation:cb-fade-in_0.2s_ease]">
      <div 
        className={`flex-1 flex flex-col overflow-hidden bg-[#f8fafc] [animation:cb-slide-up_0.28s_cubic-bezier(0.16,1,0.3,1)] ${
          isDesktop ? 'm-[20px] rounded-[14px] shadow-[0_24px_60px_rgba(0,0,0,0.22)]' : 'm-0 rounded-none shadow-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0 bg-white border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0a1128] to-[#1a3463] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
                <path d="M10 2C7.24 2 5 4.24 5 7c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5z" fill="#d4af37" />
                <circle cx="10" cy="7" r="2" fill="#fff" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-bold text-[#0a1128] font-['Outfit',sans-serif]">
                Serviceable Locations
              </p>
              <p className="text-[11px] text-[#637089] font-medium font-['Outfit',sans-serif]">
                {broker.cityArea} · {locations.length} locations
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            aria-label="Close map" 
            className="w-7 h-7 rounded-lg border border-black/[0.08] flex items-center justify-center hover:bg-[#f5f6f8] transition-colors bg-white"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="#637089" strokeWidth="2" strokeLinecap="round" className="w-3 h-3">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="absolute inset-0 transition-transform duration-300 origin-center bg-[#eef1f8] bg-[linear-gradient(rgba(15,31,61,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,31,61,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" 
            style={{ transform: `scale(${zoom})` }}
          >
            {(Object.entries(MAP_PINS_BY_TIER) as [keyof typeof MAP_PINS_BY_TIER, { x: number; y: number }[]][]).map(([tier, pins]) =>
              pins.slice(0, tierCounts[tier]).map((pin, i) => {
                const label = locations.filter((l) => l.tier === tier)[i]?.label ?? '';
                return (
                  <div 
                    key={`${tier}-${i}`} 
                    className="absolute flex flex-col items-center gap-0.5 group -translate-x-1/2 -translate-y-full" 
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  >
                    <div 
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold shadow whitespace-nowrap bg-white text-[#0a1128] font-['Outfit',sans-serif] border-[1.5px] border-solid" 
                      style={{ borderColor: `${TIER_COLORS[tier].dot}30` }}
                    >
                      {label}
                    </div>
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ 
                        background: TIER_COLORS[tier].dot, 
                        boxShadow: `0 0 0 3px ${TIER_COLORS[tier].dot}25` 
                      }} 
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
            <button 
              onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))} 
              aria-label="Zoom in" 
              className="w-7 h-7 bg-white rounded flex items-center justify-center shadow-sm border border-black/[0.08] hover:bg-[#f5f6f8] transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-3 h-3">
                <path d="M8 3v10M3 8h10" />
              </svg>
            </button>
            <button 
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))} 
              aria-label="Zoom out" 
              className="w-7 h-7 bg-white rounded flex items-center justify-center shadow-sm border border-black/[0.08] hover:bg-[#f5f6f8] transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-3 h-3">
                <path d="M3 8h10" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer Legend */}
        <div className="shrink-0 bg-white border-t border-black/[0.06] px-4 py-2.5 flex flex-wrap gap-3">
          {(Object.entries(TIER_COLORS) as [keyof typeof TIER_COLORS, typeof TIER_COLORS[keyof typeof TIER_COLORS]][]).map(([tier, c]) => (
            <div key={tier} className="flex items-center gap-1.5">
              <div 
                className="w-2.5 h-2.5 rounded-full shrink-0" 
                style={{ background: c.dot }} 
              />
              <span className="text-[11px] font-semibold text-[#3d4f6b] font-['Outfit',sans-serif]">
                {c.label}
              </span>
              <span className="text-[10px] text-[#a0aabf] font-medium font-['Outfit',sans-serif]">
                {tierCounts[tier]} loc
              </span>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}