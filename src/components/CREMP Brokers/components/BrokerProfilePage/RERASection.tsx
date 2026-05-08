import type { Broker } from '../../types/broker.types';
import { SectionHeader } from './SectionHeader';

// ─── RERA Verification ────────────────────────────────────────────────────────
export function RERASection({ broker, isDesktop }: { broker: Broker; isDesktop: boolean }) {
  if (!broker.reraNumber) return null;
  return (
    <div className={`${isDesktop ? 'px-5 pt-4 pb-4' : 'px-3 pt-3.5 pb-3.5'}`}>
      <SectionHeader title="RERA Verification" />
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid rgba(10,17,40,0.05)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className={`flex ${isDesktop ? 'items-center gap-5 px-5 py-4' : 'flex-col px-4 py-3.5 gap-2.5'}`}>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-bold text-[#0a1128]" style={{ fontFamily: 'Outfit, sans-serif' }}>RERA Registration</span>
              <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-[9px] font-bold" style={{ background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)', fontFamily: 'Outfit, sans-serif' }}>
                <svg viewBox="0 0 10 10" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2"><path d="M1 5l2.5 3 5-6" /></svg>
                Verified
              </span>
            </div>
            <p className="text-[1.1rem] font-bold text-[#1a3463] tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.reraNumber}</p>
            <p className="text-[11px] text-[#637089] font-medium mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.reraBody ?? 'RERA'}</p>
          </div>
          <div className={`flex ${isDesktop ? 'flex-col gap-0.5 items-end' : 'items-center justify-between'}`}>
            <div className={isDesktop ? 'text-right' : ''}>
              <p className="text-[10px] text-[#a0aabf] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>Registered · Valid till</p>
              <p className="text-[12px] font-bold text-[#0a1128]" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.reraValidTill ?? '—'}</p>
            </div>
            <button type="button" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1a3463] hover:text-[#d4af37] transition-colors focus-visible:outline-none mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
              View Certificate
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-2.5 h-2.5"><path d="M2 2h6v6M8 2L2 8" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
