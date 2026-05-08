import type { Broker } from '../../types/broker.types';
import { SectionHeader } from './SectionHeader';

interface RERASectionProps {
  broker: Broker;
  isDesktop: boolean;
}

export function RERASection({ broker, isDesktop }: RERASectionProps) {
  if (!broker.reraNumber) return null;

  return (
    <div className={isDesktop ? 'px-5 py-4' : 'px-3 py-3.5'}>
      <SectionHeader title="RERA Verification" />
      <div className="bg-white rounded-xl overflow-hidden border border-[#0a1128]/5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className={`flex ${isDesktop ? 'items-center gap-5 px-5 py-4' : 'flex-col px-4 py-3.5 gap-2.5'}`}>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-bold text-[#0a1128] font-['Outfit',sans-serif]">
                RERA Registration
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-[9px] font-bold bg-[#047857]/10 text-[#047857] border border-[#047857]/20 font-['Outfit',sans-serif]">
                <svg viewBox="0 0 10 10" fill="none" stroke="#047857" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2">
                  <path d="M1 5l2.5 3 5-6" />
                </svg>
                Verified
              </span>
            </div>
            <p className="text-[1.1rem] font-bold text-[#1a3463] tracking-wide font-['Outfit',sans-serif] break-all">
              {broker.reraNumber}
            </p>
            <p className="text-[11px] text-[#637089] font-medium mt-0.5 font-['Outfit',sans-serif]">
              {broker.reraBody ?? 'RERA'}
            </p>
          </div>
          <div className={`flex ${isDesktop ? 'flex-col gap-0.5 items-end' : 'items-center justify-between'}`}>
            <div className={isDesktop ? 'text-right' : ''}>
              <p className="text-[10px] text-[#637089] font-medium font-['Outfit',sans-serif]">
                Registered · Valid till
              </p>
              <p className="text-[12px] font-bold text-[#0a1128] font-['Outfit',sans-serif]">
                {broker.reraValidTill ?? '—'}
              </p>
            </div>
            <button 
              type="button" 
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1a3463] hover:text-[#8a6b22] transition-colors focus-visible:outline-none mt-1 font-['Outfit',sans-serif]"
            >
              View Certificate
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-2.5 h-2.5">
                <path d="M2 2h6v6M8 2L2 8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}