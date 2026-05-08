import { useState } from 'react';
import type { Broker } from '../../types/broker.types';
import { DEFAULT_DEAL_TYPES } from './constants';
import { SectionHeader } from './SectionHeader';

interface DealSectionProps {
  broker: Broker;
  isDesktop: boolean;
}

export function DealSection({ broker, isDesktop }: DealSectionProps) {
  const dealTypes = broker.dealTypes ?? DEFAULT_DEAL_TYPES;
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? dealTypes : dealTypes.slice(0, 6);

  return (
    <div className={isDesktop ? 'px-5 pt-4 pb-3' : 'px-3 pt-3.5 pb-3'}>
      <SectionHeader title="Deal Type Expertise" />
      <div className="flex flex-wrap gap-1.5">
        {visible.map((dt) => (
          <span 
            key={dt} 
            className="inline-flex items-center px-2.5 py-[5px] rounded-lg text-[11px] font-semibold text-[#1a3463] bg-[#1a3463]/[0.07] border border-[#1a3463]/[0.12] font-['Outfit',sans-serif]"
          >
            {dt}
          </span>
        ))}
        {dealTypes.length > 6 && !showAll && (
          <button 
            type="button" 
            onClick={() => setShowAll(true)} 
            className="inline-flex items-center px-2.5 py-[5px] rounded-lg text-[11px] font-semibold focus-visible:outline-none hover:bg-[#d4af37]/10 transition-colors bg-[#d4af37]/[0.06] border border-[#d4af37]/[0.2] text-[#8a6b22] font-['Outfit',sans-serif]"
          >
            + {dealTypes.length - 6} More
          </button>
        )}
      </div>
    </div>
  );
}