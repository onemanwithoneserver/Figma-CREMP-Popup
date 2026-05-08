import type { Broker } from '../../types/broker.types';
import { DEFAULT_WORKS_WITH } from './constants';
import { SectionHeader } from './SectionHeader';

// ─── About + Key Metrics ──────────────────────────────────────────────────────
export function AboutSection({ broker, isDesktop }: { broker: Broker; isDesktop: boolean }) {
  const highlights = broker.aboutHighlights ?? [];
  const metrics = broker.keyMetrics ?? [];

  return (
    <div className={`${isDesktop ? 'px-5 pt-4 pb-4' : 'px-3 pt-3.5 pb-3.5'}`}>
      <div className={isDesktop && metrics.length > 0 ? 'grid grid-cols-2 gap-4' : ''}>
        <div>
          <SectionHeader title="About" />
          <div className="bg-white rounded-xl p-4" style={{ border: '1px solid rgba(10,17,40,0.05)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <p className="text-[12.5px] text-[#3d4f6b] leading-relaxed font-medium mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {broker.bio ? `${broker.bio} ` : ''}
              With over {broker.experienceYears}+ years in commercial real estate, {broker.name.split(' ')[0]} has closed {broker.dealsClosed}+ deals across prime markets.
            </p>
            {highlights.length > 0 && (
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(212,175,55,0.12)' }}>
                      <svg viewBox="0 0 10 10" fill="none" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2"><path d="M1.5 5L3.5 7.5 8.5 2" /></svg>
                    </div>
                    <span className="text-[10.5px] font-semibold text-[#3d4f6b]" style={{ fontFamily: 'Outfit, sans-serif' }}>{h}</span>
                  </div>
                ))}
              </div>
            )}
            {(broker.languages ?? []).length > 0 && (
              <div className="mt-3 pt-2.5" style={{ borderTop: '1px solid rgba(10,17,40,0.05)' }}>
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[9px] font-bold text-[#a0aabf] tracking-[0.06em] uppercase shrink-0" style={{ fontFamily: 'Outfit, sans-serif' }}>Speaks</span>
                  {(broker.languages ?? ['English']).map(lang => (
                    <span key={lang} className="text-[10px] font-semibold px-2 py-[3px] rounded-full" style={{ background: 'rgba(10,17,40,0.05)', color: '#3d4f6b', border: '1px solid rgba(10,17,40,0.08)', fontFamily: 'Outfit, sans-serif' }}>{lang}</span>
                  ))}
                </div>
                {(broker.worksWithTypes ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center mt-1.5">
                    <span className="text-[9px] font-bold text-[#a0aabf] tracking-[0.06em] uppercase shrink-0" style={{ fontFamily: 'Outfit, sans-serif' }}>Works with</span>
                    {(broker.worksWithTypes ?? DEFAULT_WORKS_WITH).map(w => (
                      <span key={w} className="text-[10px] font-semibold px-2 py-[3px] rounded-full" style={{ background: 'rgba(212,175,55,0.07)', color: '#b8903c', border: '1px solid rgba(212,175,55,0.18)', fontFamily: 'Outfit, sans-serif' }}>{w}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {metrics.length > 0 && isDesktop && (
          <div>
            <SectionHeader title="Key Metrics" action="View Details" />
            <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid rgba(10,17,40,0.05)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              {metrics.map((m, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: i < metrics.length - 1 ? '1px solid rgba(10,17,40,0.04)' : 'none' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded flex items-center justify-center shrink-0" style={{ background: 'rgba(10,17,40,0.05)' }}>
                      <svg viewBox="0 0 12 12" fill="none" stroke="#637089" strokeWidth="1.5" strokeLinecap="round" className="w-2.5 h-2.5"><line x1="10" y1="10" x2="10" y2="6" /><line x1="6" y1="10" x2="6" y2="2" /><line x1="2" y1="10" x2="2" y2="7" /><line x1="0" y1="10" x2="12" y2="10" /></svg>
                    </div>
                    <span className="text-[11.5px] font-medium text-[#637089]" style={{ fontFamily: 'Outfit, sans-serif' }}>{m.label}</span>
                  </div>
                  <span className="text-[13px] font-bold text-[#0a1128] ml-3 shrink-0" style={{ fontFamily: 'Outfit, sans-serif' }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Mobile key metrics */}
      {!isDesktop && metrics.length > 0 && (
        <div className="mt-3">
          <SectionHeader title="Key Metrics" action="View Details" />
          <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid rgba(10,17,40,0.05)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            {metrics.slice(0, 4).map((m, i) => (
              <div key={i} className="flex items-center justify-between px-3.5 py-2.5" style={{ borderBottom: i < Math.min(metrics.length, 4) - 1 ? '1px solid rgba(10,17,40,0.04)' : 'none' }}>
                <span className="text-[11.5px] font-medium text-[#637089]" style={{ fontFamily: 'Outfit, sans-serif' }}>{m.label}</span>
                <span className="text-[13px] font-bold text-[#0a1128]" style={{ fontFamily: 'Outfit, sans-serif' }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
