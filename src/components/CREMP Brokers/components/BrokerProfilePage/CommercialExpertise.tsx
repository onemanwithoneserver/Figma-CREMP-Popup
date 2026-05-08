import { useRef, useState, useEffect, useCallback } from 'react';
import type { Broker } from '../../types/broker.types';
import { EXPERTISE_SVG } from './icons';

interface CommercialExpertiseProps {
  broker: Broker;
  isDesktop: boolean;
}

export function CommercialExpertise({ broker, isDesktop }: CommercialExpertiseProps) {
  const expertises = broker.specialties.length > 0 ? broker.specialties : ['Office'];

  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScroll = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    if (isDesktop) return;
    const el = stripRef.current;
    if (!el) return;
    updateScroll();
    el.addEventListener('scroll', updateScroll, { passive: true });
    const ro = new ResizeObserver(updateScroll);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', updateScroll); ro.disconnect(); };
  }, [isDesktop, updateScroll]);

  function scrollStrip(dir: 'left' | 'right') {
    stripRef.current?.scrollBy({ left: dir === 'left' ? -120 : 120, behavior: 'smooth' });
  }

  return (
    <div className={`shrink-0 bg-white border-b border-black/[0.05] ${isDesktop ? 'px-5 py-4' : 'px-3 py-3.5'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-[3px] h-[14px] rounded-full bg-[#d4af37] shrink-0 block" />
          <span className="text-[13px] font-bold text-[#0a1128] font-['Outfit',sans-serif]">
            Commercial Expertise
          </span>
          <span className="text-[11px] font-semibold text-[#a0aabf] font-['Outfit',sans-serif]">
            {expertises.length} specialties
          </span>
        </div>
      </div>

      {isDesktop ? (
        <div className="flex flex-wrap gap-2">
          {expertises.map(exp => <ExpertiseChip key={exp} exp={exp} isDesktop={isDesktop} />)}
        </div>
      ) : (
        <div className="relative">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollStrip('left')}
              aria-label="Scroll left"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full flex items-center justify-center focus-visible:outline-none"
              style={{ background: '#fff', border: '1px solid rgba(10,17,40,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.13)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><path d="M10 12L6 8l4-4"/></svg>
            </button>
          )}

          <div
            ref={stripRef}
            className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ paddingLeft: canScrollLeft ? 28 : 0, paddingRight: canScrollRight ? 28 : 0 }}
          >
            {expertises.map(exp => <ExpertiseChip key={exp} exp={exp} isDesktop={isDesktop} />)}
          </div>

          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollStrip('right')}
              aria-label="Scroll right"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full flex items-center justify-center focus-visible:outline-none"
              style={{ background: '#fff', border: '1px solid rgba(10,17,40,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.13)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><path d="M6 4l4 4-4 4"/></svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ExpertiseChip({ exp, isDesktop }: { exp: string; isDesktop: boolean }) {
  return (
    <div
      className={`flex flex-col items-center gap-1.5 shrink-0 rounded-[6px] bg-[#0a1128]/[0.03] border border-[#0a1128]/[0.07] ${
        isDesktop ? 'px-[12px] py-[10px] min-w-[64px]' : 'px-[10px] py-[8px] min-w-[56px]'
      }`}
    >
      <span className="text-[#4d6080]">
        {EXPERTISE_SVG[exp] ?? EXPERTISE_SVG.Office}
      </span>
      <span className="text-[9.5px] font-semibold leading-tight text-center whitespace-nowrap text-[#3b4d67] font-['Outfit',sans-serif]">
        {exp}
      </span>
    </div>
  );
}