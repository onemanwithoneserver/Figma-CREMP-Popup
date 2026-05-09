import { useState } from 'react';
import type { Broker } from '../../types/broker.types';
import { StarRating } from './StarRating';
import { SectionHeader } from './SectionHeader';

export function TestimonialCard({ t }: { t: NonNullable<Broker['testimonials']>[number] }) {
  return (
    <div className="bg-white rounded-xl p-3.5 flex flex-col h-full border border-[#0a1128]/5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-start gap-2.5 mb-2.5">
        <div 
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 ring-2 ring-black/[0.05] font-['Outfit',sans-serif]" 
          style={{ backgroundColor: t.companyColor }}
        >
          {t.companyInitials}
        </div>
        <div>
          <StarRating rating={t.rating} />
          <p className="text-[10px] text-[#637089] font-semibold mt-0.5 font-['Outfit',sans-serif]">
            {t.companyName}
          </p>
        </div>
      </div>
      <p className="text-[12px] text-[#3d4f6b] leading-relaxed font-medium flex-1 mb-2.5 font-['Outfit',sans-serif]">
        "{t.text}"
      </p>
      <div className="pt-2.5 border-t border-[#0a1128]/5">
        <p className="text-[11px] font-bold text-[#0a1128] leading-tight font-['Outfit',sans-serif]">
          — {t.author}
        </p>
        <p className="text-[10px] text-[#637089] font-medium leading-tight mt-0.5 font-['Outfit',sans-serif]">
          {t.role}
        </p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {[t.dealType, t.sqFt ?? t.value, t.location].filter(Boolean).map((tag, i) => (
            <span 
              key={i} 
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[#1a3463]/[0.06] text-[#4d6080] border border-[#1a3463]/[0.08] font-['Outfit',sans-serif]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const DESKTOP_PAGE = 3;

interface TestimonialsSectionProps {
  broker: Broker;
  isDesktop: boolean;
}

export function TestimonialsSection({ broker, isDesktop }: TestimonialsSectionProps) {
  const testimonials = broker.testimonials ?? [];
  const [idx, setIdx] = useState(0);
  
  if (testimonials.length === 0) return null;

  if (isDesktop) {
    const totalPages = Math.ceil(testimonials.length / DESKTOP_PAGE);
    const pageIdx = Math.min(idx, totalPages - 1);
    const start = pageIdx * DESKTOP_PAGE;
    const visible = testimonials.slice(start, start + DESKTOP_PAGE);
    const hasPrev = pageIdx > 0;
    const hasNext = pageIdx < totalPages - 1;

    return (
      <div className="px-5 py-4">
        <SectionHeader title="Client Testimonials" action="View All" />
        <div className="relative">
          <div 
            className="grid gap-3" 
            style={{ gridTemplateColumns: `repeat(${Math.min(DESKTOP_PAGE, testimonials.length)}, minmax(0, 1fr))` }}
          >
            {visible.map((t, i) => <TestimonialCard key={start + i} t={t} />)}
          </div>

          {hasPrev && (
            <button
              type="button"
              onClick={() => setIdx(pageIdx - 1)}
              aria-label="Previous testimonials"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1128]/30 z-10 bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {hasNext && (
            <button
              type="button"
              onClick={() => setIdx(pageIdx + 1)}
              aria-label="Next testimonials"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1128]/30 z-10 bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i} 
                type="button" 
                onClick={() => setIdx(i)} 
                aria-label={`Page ${i + 1}`} 
                className={`rounded-full transition-all duration-200 focus-visible:outline-none h-1.5 ${i === pageIdx ? 'w-4 bg-[#0a1128]' : 'w-1.5 bg-[#9ca3af]'}`} 
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const lastIdx = testimonials.length - 1;
  
  return (
    <div className="px-3 py-3.5">
      <SectionHeader title="Client Testimonials" action="View All" />
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]" 
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-full shrink-0">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
          aria-label="Previous testimonial"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1128]/30 disabled:opacity-0 disabled:pointer-events-none bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setIdx(i => Math.min(lastIdx, i + 1))}
          disabled={idx === lastIdx}
          aria-label="Next testimonial"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1128]/30 disabled:opacity-0 disabled:pointer-events-none bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              type="button" 
              onClick={() => setIdx(i)} 
              aria-label={`Testimonial ${i + 1}`} 
              className={`rounded-full transition-all duration-200 focus-visible:outline-none h-1.5 ${i === idx ? 'w-4 bg-[#0a1128]' : 'w-1.5 bg-[#9ca3af]'}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
}