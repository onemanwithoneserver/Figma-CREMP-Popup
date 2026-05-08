import { useState } from 'react';
import type { Broker } from '../../types/broker.types';
import { StarRating } from './StarRating';
import { SectionHeader } from './SectionHeader';

// ─── Testimonial Card ─────────────────────────────────────────────────────────
export function TestimonialCard({ t }: { t: NonNullable<Broker['testimonials']>[number] }) {
  return (
    <div className="bg-white rounded-xl p-3.5 flex flex-col h-full" style={{ border: '1px solid rgba(10,17,40,0.05)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div className="flex items-start gap-2.5 mb-2.5">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 ring-2 ring-black/[0.05]" style={{ background: t.companyColor, fontFamily: 'Outfit, sans-serif' }}>{t.companyInitials}</div>
        <div>
          <StarRating rating={t.rating} />
          <p className="text-[10px] text-[#a0aabf] font-semibold mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{t.companyName}</p>
        </div>
      </div>
      <p className="text-[12px] text-[#3d4f6b] leading-relaxed font-medium flex-1 mb-2.5" style={{ fontFamily: 'Outfit, sans-serif' }}>"{t.text}"</p>
      <div className="pt-2.5" style={{ borderTop: '1px solid rgba(10,17,40,0.05)' }}>
        <p className="text-[11px] font-bold text-[#0a1128] leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>— {t.author}</p>
        <p className="text-[10px] text-[#637089] font-medium leading-tight mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{t.role}</p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {[t.dealType, t.sqFt ?? t.value, t.location].filter(Boolean).map((tag, i) => (
            <span key={i} className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: 'rgba(26,52,99,0.06)', color: '#4d6080', border: '1px solid rgba(26,52,99,0.08)', fontFamily: 'Outfit, sans-serif' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────
const DESKTOP_PAGE = 3; // cards visible per desktop "page"

export function TestimonialsSection({ broker, isDesktop }: { broker: Broker; isDesktop: boolean }) {
  const testimonials = broker.testimonials ?? [];
  const [idx, setIdx] = useState(0);
  if (testimonials.length === 0) return null;

  if (isDesktop) {
    // Desktop: show DESKTOP_PAGE cards at once; arrows float on the grid when there are more
    const totalPages = Math.ceil(testimonials.length / DESKTOP_PAGE);
    const pageIdx = Math.min(idx, totalPages - 1);
    const start = pageIdx * DESKTOP_PAGE;
    const visible = testimonials.slice(start, start + DESKTOP_PAGE);
    const hasPrev = pageIdx > 0;
    const hasNext = pageIdx < totalPages - 1;

    return (
      <div className="px-5 pt-4 pb-4">
        <SectionHeader title="Client Testimonials" action="View All" />
        <div className="relative">
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(DESKTOP_PAGE, testimonials.length)}, 1fr)` }}>
            {visible.map((t, i) => <TestimonialCard key={start + i} t={t} />)}
          </div>

          {/* Floating left arrow — only when navigable */}
          {hasPrev && (
            <button
              type="button"
              onClick={() => setIdx(pageIdx - 1)}
              aria-label="Previous testimonials"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1128]/30 z-10"
              style={{ background: '#fff', border: '1px solid rgba(10,17,40,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
          )}

          {/* Floating right arrow — only when navigable */}
          {hasNext && (
            <button
              type="button"
              onClick={() => setIdx(pageIdx + 1)}
              aria-label="Next testimonials"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1128]/30 z-10"
              style={{ background: '#fff', border: '1px solid rgba(10,17,40,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          )}
        </div>

        {/* Page dots — only when multiple pages */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} type="button" onClick={() => setIdx(i)} aria-label={`Page ${i + 1}`} className="rounded-full transition-all duration-200 focus-visible:outline-none" style={{ width: i === pageIdx ? 16 : 6, height: 6, background: i === pageIdx ? '#0a1128' : '#d1d5db' }} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Mobile: single-card carousel with floating arrows
  const lastIdx = testimonials.length - 1;
  return (
    <div className="px-3 pt-3.5 pb-3.5">
      <SectionHeader title="Client Testimonials" action="View All" />
      <div className="relative">
        {/* Slide track */}
        <div className="overflow-hidden">
          <div className="flex" style={{ transform: `translateX(-${idx * 100}%)`, transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="w-full shrink-0"><TestimonialCard t={t} /></div>
            ))}
          </div>
        </div>

        {/* Left floating arrow */}
        <button
          type="button"
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
          aria-label="Previous testimonial"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1128]/30 disabled:opacity-0 disabled:pointer-events-none"
          style={{ background: '#fff', border: '1px solid rgba(10,17,40,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        {/* Right floating arrow */}
        <button
          type="button"
          onClick={() => setIdx(i => Math.min(lastIdx, i + 1))}
          disabled={idx === lastIdx}
          aria-label="Next testimonial"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1128]/30 disabled:opacity-0 disabled:pointer-events-none"
          style={{ background: '#fff', border: '1px solid rgba(10,17,40,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      {/* Dot indicators */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          {testimonials.map((_, i) => (
            <button key={i} type="button" onClick={() => setIdx(i)} aria-label={`Testimonial ${i + 1}`} className="rounded-full transition-all duration-200 focus-visible:outline-none" style={{ width: i === idx ? 16 : 6, height: 6, background: i === idx ? '#0a1128' : '#d1d5db' }} />
          ))}
        </div>
      )}
    </div>
  );
}
