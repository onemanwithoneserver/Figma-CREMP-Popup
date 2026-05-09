import { useState } from 'react';
import type { Broker } from '../../types/broker.types';
import { TIER_COLORS, MAP_PINS_BY_TIER } from './constants';
import { SectionHeader } from './SectionHeader';

interface ServiceableLocationsSectionProps {
  broker: Broker;
  isDesktop: boolean;
}

export function ServiceableLocationsSection({ broker, isDesktop }: ServiceableLocationsSectionProps) {
  const [zoom, setZoom] = useState(1);
  const locations = broker.serviceableLocations ?? [];
  const tierCounts = {
    'most-active': locations.filter((l) => l.tier === 'most-active').length,
    'moderately-active': locations.filter((l) => l.tier === 'moderately-active').length,
    'based-on-request': locations.filter((l) => l.tier === 'based-on-request').length,
  };

  return (
    <div className={isDesktop ? 'px-5 py-4' : 'px-3 py-3.5'}>
      <SectionHeader title="Serviceable Locations" />

      <div className={`flex gap-3 ${isDesktop ? 'items-start' : 'flex-col'}`}>
        {/* Tier location lists */}
        <div className={`flex flex-col gap-2 ${isDesktop ? 'min-w-[220px] flex-none' : ''}`}>
          {(['most-active', 'moderately-active', 'based-on-request'] as const).map(tier => {
            const c = TIER_COLORS[tier];
            const locs = locations.filter(l => l.tier === tier);

            return (
              <div
                key={tier}
                className="bg-white rounded-xl overflow-hidden border border-[#0a1128]/5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#0a1128]/[0.04] bg-[#0a1128]/[0.016]">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: c.dot }}
                  />
                  <span className="text-[11px] font-bold text-[#0a1128] flex-1 font-['Outfit',sans-serif]">
                    {c.label}
                  </span>
                  <span className="text-[10px] font-semibold text-[#a0aabf] font-['Outfit',sans-serif]">
                    {locs.length > 0 ? locs.length : '12+'} Locations
                  </span>
                  <svg viewBox="0 0 10 10" fill="none" stroke="#a0aabf" strokeWidth="1.5" strokeLinecap="round" className="w-3 h-3">
                    <path d="M2.5 4L5 6.5 7.5 4" />
                  </svg>
                </div>

                {locs.length > 0 && (
                  <div className="px-3 py-1.5 flex flex-wrap gap-1">
                    {locs.slice(0, 6).map(loc => (
                      <span
                        key={loc.label}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md font-['Outfit',sans-serif]"
                        style={{
                          background: c.dot === '#0a1128' ? 'rgba(10,17,40,0.06)' : `${c.dot}15`,
                          color: c.dot === '#0a1128' ? '#1a3463' : c.dot,
                          border: `1px solid ${c.dot === '#0a1128' ? 'rgba(10,17,40,0.1)' : c.dot + '30'}`
                        }}
                      >
                        {loc.label}
                      </span>
                    ))}
                    {locs.length > 6 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-[#a0aabf] bg-[#0a1128]/[0.04] border border-[#0a1128]/[0.06] font-['Outfit',sans-serif]">
                        +{locs.length - 6}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Inline map — always visible */}
        <div
          className={`flex flex-col rounded-xl overflow-hidden border border-[#0a1128]/[0.06] bg-[#eef1f8] ${
            isDesktop ? 'flex-1' : 'w-full'
          }`}
        >
          {/* Map canvas */}
          <div className={`relative overflow-hidden ${isDesktop ? 'min-h-[200px] flex-1' : 'h-[180px]'}`}>
            <div
              className="absolute inset-0 transition-transform duration-300 origin-center bg-[linear-gradient(rgba(15,31,61,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,31,61,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"
              style={{ transform: `scale(${zoom})` }}
            >
              {(Object.entries(MAP_PINS_BY_TIER) as [keyof typeof MAP_PINS_BY_TIER, { x: number; y: number }[]][]).map(([tier, pins]) =>
                pins.slice(0, tierCounts[tier]).map((pin, i) => {
                  const label = locations.filter((l) => l.tier === tier)[i]?.label ?? '';
                  return (
                    <div
                      key={`${tier}-${i}`}
                      className="absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-full"
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

            {/* Zoom controls */}
            <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
                aria-label="Zoom in"
                className="w-6 h-6 bg-white rounded flex items-center justify-center shadow-sm border border-black/[0.08] hover:bg-[#f5f6f8] transition-colors"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-2.5 h-2.5">
                  <path d="M8 3v10M3 8h10" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
                aria-label="Zoom out"
                className="w-6 h-6 bg-white rounded flex items-center justify-center shadow-sm border border-black/[0.08] hover:bg-[#f5f6f8] transition-colors"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-2.5 h-2.5">
                  <path d="M3 8h10" />
                </svg>
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="shrink-0 bg-white border-t border-black/[0.06] px-3 py-2 flex flex-wrap gap-x-3 gap-y-1">
            {(Object.entries(TIER_COLORS) as [keyof typeof TIER_COLORS, typeof TIER_COLORS[keyof typeof TIER_COLORS]][]).map(([tier, c]) => (
              <div key={tier} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: c.dot }} />
                <span className="text-[10px] font-semibold text-[#3d4f6b] font-['Outfit',sans-serif]">{c.label}</span>
                <span className="text-[9px] text-[#a0aabf] font-medium font-['Outfit',sans-serif]">{tierCounts[tier]} loc</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}