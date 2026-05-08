import type { Broker } from '../../types/broker.types';
import { DEFAULT_WORKS_WITH } from './constants';
import { SectionHeader } from './SectionHeader';

interface AboutSectionProps {
  broker: Broker;
  isDesktop: boolean;
}

export function AboutSection({ broker, isDesktop }: AboutSectionProps) {
  const {
    aboutHighlights = [],
    keyMetrics = [],
    bio,
    experienceYears,
    name,
    dealsClosed,
    languages = ['English'],
    worksWithTypes = DEFAULT_WORKS_WITH,
  } = broker;

  const firstName = name.split(' ')[0];
  const hasMetrics = keyMetrics.length > 0;
  const hasLanguages = languages.length > 0;
  const hasWorksWithTypes = worksWithTypes.length > 0;

  return (
    <div className={isDesktop ? 'px-5 py-4' : 'px-3 py-3.5'}>
      <div className={isDesktop && hasMetrics ? 'grid grid-cols-2 gap-4' : ''}>
        
        {/* --- About Column --- */}
        <div>
          <SectionHeader title="About" />
          <div className="bg-white rounded-xl p-4 border border-[#0a1128]/5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <p className="text-[12.5px] text-[#3d4f6b] leading-relaxed font-medium mb-3 font-['Outfit',sans-serif]">
              {bio ? `${bio} ` : ''}
              With over {experienceYears}+ years in commercial real estate, {firstName} has closed {dealsClosed}+ deals across prime markets.
            </p>

            {aboutHighlights.length > 0 && (
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                {aboutHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-[#d4af37]/[0.12]">
                      <svg viewBox="0 0 10 10" fill="none" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2">
                        <path d="M1.5 5L3.5 7.5 8.5 2" />
                      </svg>
                    </div>
                    <span className="text-[10.5px] font-semibold text-[#3d4f6b] font-['Outfit',sans-serif]">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {hasLanguages && (
              <div className="mt-3 pt-2.5 border-t border-[#0a1128]/5">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[9px] font-bold text-[#a0aabf] tracking-[0.06em] uppercase shrink-0 font-['Outfit',sans-serif]">
                    Speaks
                  </span>
                  {languages.map((lang) => (
                    <span 
                      key={lang} 
                      className="text-[10px] font-semibold px-2 py-[3px] rounded-full bg-[#0a1128]/5 text-[#3d4f6b] border border-[#0a1128]/[0.08] font-['Outfit',sans-serif]"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {hasWorksWithTypes && (
                  <div className="flex flex-wrap gap-1.5 items-center mt-1.5">
                    <span className="text-[9px] font-bold text-[#a0aabf] tracking-[0.06em] uppercase shrink-0 font-['Outfit',sans-serif]">
                      Works with
                    </span>
                    {worksWithTypes.map((type) => (
                      <span 
                        key={type} 
                        className="text-[10px] font-semibold px-2 py-[3px] rounded-full bg-[#d4af37]/[0.07] text-[#b8903c] border border-[#d4af37]/[0.18] font-['Outfit',sans-serif]"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* --- Key Metrics Column (Desktop) --- */}
        {hasMetrics && isDesktop && (
          <div>
            <SectionHeader title="Key Metrics" action="View Details" />
            <div className="bg-white rounded-xl overflow-hidden border border-[#0a1128]/5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              {keyMetrics.map((metric, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between px-4 py-2.5 ${
                    index < keyMetrics.length - 1 ? 'border-b border-[#0a1128]/[0.04]' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded flex items-center justify-center shrink-0 bg-[#0a1128]/5">
                      <svg viewBox="0 0 12 12" fill="none" stroke="#637089" strokeWidth="1.5" strokeLinecap="round" className="w-2.5 h-2.5">
                        <line x1="10" y1="10" x2="10" y2="6" />
                        <line x1="6" y1="10" x2="6" y2="2" />
                        <line x1="2" y1="10" x2="2" y2="7" />
                        <line x1="0" y1="10" x2="12" y2="10" />
                      </svg>
                    </div>
                    <span className="text-[11.5px] font-medium text-[#637089] font-['Outfit',sans-serif]">
                      {metric.label}
                    </span>
                  </div>
                  <span className="text-[13px] font-bold text-[#0a1128] ml-3 shrink-0 font-['Outfit',sans-serif]">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Key Metrics (Mobile) --- */}
      {!isDesktop && hasMetrics && (
        <div className="mt-3">
          <SectionHeader title="Key Metrics" action="View Details" />
          <div className="bg-white rounded-xl overflow-hidden border border-[#0a1128]/5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            {keyMetrics.slice(0, 4).map((metric, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between px-3.5 py-2.5 ${
                  index < Math.min(keyMetrics.length, 4) - 1 ? 'border-b border-[#0a1128]/[0.04]' : ''
                }`}
              >
                <span className="text-[11.5px] font-medium text-[#637089] font-['Outfit',sans-serif]">
                  {metric.label}
                </span>
                <span className="text-[13px] font-bold text-[#0a1128] font-['Outfit',sans-serif]">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}