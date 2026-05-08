import type { Broker } from '../../types/broker.types';
import { TIER_COLORS, MAP_PINS_BY_TIER } from './constants';
import { SectionHeader } from './SectionHeader';

interface ServiceableLocationsSectionProps {
  broker: Broker;
  isDesktop: boolean;
  onViewMap: () => void;
}

export function ServiceableLocationsSection({ broker, isDesktop, onViewMap }: ServiceableLocationsSectionProps) {
  const locations = broker.serviceableLocations ?? [];

  return (
    <div className={isDesktop ? 'px-5 py-4' : 'px-3 py-3.5'}>
      <SectionHeader title="Serviceable Locations" action="View Full Map" onAction={onViewMap} />
      
      <div className={`flex gap-3 ${isDesktop ? 'items-start' : 'flex-col'}`}>
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

        {isDesktop && (
          <div 
            className="flex-1 relative rounded-xl overflow-hidden cursor-pointer group min-h-[170px] bg-[#eef1f8] border border-[#0a1128]/[0.06]" 
            onClick={onViewMap}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,31,61,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,31,61,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {(Object.entries(MAP_PINS_BY_TIER) as [keyof typeof MAP_PINS_BY_TIER, { x: number; y: number }[]][]).map(([tier, pins]) =>
              pins.slice(0, 3).map((pin, i) => (
                <div 
                  key={`m-${tier}-${i}`} 
                  className="absolute -translate-x-1/2 -translate-y-1/2" 
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                >
                  <div 
                    className="w-2.5 h-2.5 rounded-full opacity-65" 
                    style={{ 
                      background: TIER_COLORS[tier].dot, 
                      boxShadow: `0 0 0 4px ${TIER_COLORS[tier].dot}25` 
                    }} 
                  />
                </div>
              ))
            )}
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#0a1128]/[0.06]">
              <div className="bg-white/90 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow text-[11px] font-bold text-[#0a1128] font-['Outfit',sans-serif]">
                <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="1.8" strokeLinecap="round" className="w-3.5 h-3.5">
                  <path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3 4 9 4 9s4-6 4-9c0-2.21-1.79-4-4-4z" />
                  <circle cx="8" cy="5.5" r="1.5" />
                </svg>
                View Full Map
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}