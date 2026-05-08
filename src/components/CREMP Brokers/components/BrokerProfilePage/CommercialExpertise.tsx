import type { Broker } from '../../types/broker.types';
import { EXPERTISE_SVG } from './icons';

// ─── Commercial Expertise ─────────────────────────────────────────────────────
export function CommercialExpertise({ broker, isDesktop }: { broker: Broker; isDesktop: boolean }) {
  const expertises = broker.specialties.length > 0 ? broker.specialties : ['Office'];

  return (
    <div className={`shrink-0 bg-white border-b border-black/[0.05] ${isDesktop ? 'px-5 py-4' : 'px-3 py-3.5'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-[3px] h-[14px] rounded-full bg-[#d4af37] shrink-0 block" />
          <span className="text-[13px] font-bold text-[#0a1128]" style={{ fontFamily: 'Outfit, sans-serif' }}>Commercial Expertise</span>
          <span className="text-[11px] font-semibold text-[#a0aabf]" style={{ fontFamily: 'Outfit, sans-serif' }}>{expertises.length} specialties</span>
        </div>
      </div>
      <div className={`flex gap-2 ${!isDesktop ? 'overflow-x-auto pb-1' : 'flex-wrap'}`} style={{ scrollbarWidth: 'none' }}>
        {expertises.map(exp => (
          <div
            key={exp}
            className="flex flex-col items-center gap-1.5 shrink-0 rounded-xl"
            style={{
              padding: isDesktop ? '10px 12px' : '8px 10px',
              background: 'rgba(10,17,40,0.03)',
              border: '1px solid rgba(10,17,40,0.07)',
              minWidth: isDesktop ? 64 : 56,
            }}
          >
            <span style={{ color: '#4d6080' }}>
              {EXPERTISE_SVG[exp] ?? EXPERTISE_SVG.Office}
            </span>
            <span
              className="text-[9.5px] font-semibold leading-tight text-center whitespace-nowrap"
              style={{ color: '#3b4d67', fontFamily: 'Outfit, sans-serif' }}
            >
              {exp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
