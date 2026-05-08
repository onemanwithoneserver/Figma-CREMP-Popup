import { useState } from 'react';
import type { Broker } from '../../types/broker.types';

// ─── Bottom CTA Bar ───────────────────────────────────────────────────────────
export function BottomCTABar({ broker, isDesktop }: { broker: Broker; isDesktop: boolean }) {
  const [contacted, setContacted] = useState(false);

  return (
    <div className="shrink-0 bg-white border-t border-black/[0.06]" style={{ boxShadow: '0 -2px 12px rgba(0,0,0,0.06)' }}>
      <div className={`flex items-center gap-1 border-b border-black/[0.04] ${isDesktop ? 'px-5 py-1' : 'px-3 py-0.5'}`}>
        {broker.phone && (
          <a href={`tel:${broker.phone}`} aria-label="Call broker" className="flex-1 flex flex-col items-center gap-0.5 py-1 rounded-xl hover:bg-black/[0.04] transition-colors focus-visible:outline-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="#3d4f6b" strokeWidth="1.6" strokeLinecap="round" className="w-4 h-4"><path d="M3 2h3l1.5 3.5-1.75 1a7 7 0 003.75 3.75l1-1.75L14 11v3a1 1 0 01-1 1A11 11 0 012 4a1 1 0 011-1z" /></svg>
            <span className="text-[10px] font-semibold text-[#3d4f6b]">Call</span>
          </a>
        )}
        {broker.whatsapp && (
          <a href={`https://wa.me/${broker.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp broker" className="flex-1 flex flex-col items-center gap-0.5 py-1 rounded-xl hover:bg-[#25D366]/[0.07] transition-colors focus-visible:outline-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <svg viewBox="0 0 16 16" fill="#25D366" className="w-4 h-4"><path d="M13.6 2.4A7.84 7.84 0 008 0 7.96 7.96 0 00.78 11.9L0 16l4.2-.78A7.94 7.94 0 008 16a7.96 7.96 0 007.96-8 7.84 7.84 0 00-2.36-5.6zm-5.6 12.26a6.6 6.6 0 01-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25A6.61 6.61 0 118 14.66zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.51.64-.63.77-.11.13-.23.15-.43.05a5.42 5.42 0 01-1.6-.98 5.9 5.9 0 01-1.1-1.37c-.12-.2 0-.3.09-.4l.3-.35c.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.44-1.08-.61-1.47-.16-.38-.32-.33-.44-.34H5.5c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.65s.72 1.92.82 2.05c.1.13 1.4 2.14 3.4 3 .47.2.84.33 1.13.42.47.15.9.13 1.24.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.09-.18-.14-.38-.24z" /></svg>
            <span className="text-[10px] font-semibold text-[#25D366]">WhatsApp</span>
          </a>
        )}
        <button type="button" className="flex-1 flex flex-col items-center gap-0.5 py-1 rounded-xl hover:bg-black/[0.04] transition-colors focus-visible:outline-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="#3d4f6b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M13.5 9.5A1 1 0 0112.5 10.5H4L2 13V3.5A1 1 0 013 2.5H12.5A1 1 0 0113.5 3.5v6z" /></svg>
          <span className="text-[10px] font-semibold text-[#3d4f6b]">Chat</span>
        </button>
        <button type="button" className="flex-1 flex flex-col items-center gap-0.5 py-1 rounded-xl hover:bg-black/[0.04] transition-colors focus-visible:outline-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {/* MUI Share icon — three nodes connected */}
          <svg viewBox="0 0 24 24" fill="none" stroke="#3d4f6b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <circle cx="18" cy="5" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="19" r="2.5" />
            <line x1="8.39" y1="10.95" x2="15.61" y2="6.05" />
            <line x1="8.39" y1="13.05" x2="15.61" y2="17.95" />
          </svg>
          <span className="text-[10px] font-semibold text-[#3d4f6b]">Share</span>
        </button>
      </div>
      <div className={`flex gap-2 ${isDesktop ? 'px-5 py-2' : 'px-3 py-1.5'}`}>
        <button
          type="button"
          onClick={() => setContacted(!contacted)}
          aria-label={contacted ? 'Requirement sent' : 'Send requirement'}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl text-[13px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50 transition-all duration-300"
          style={contacted
            ? { background: 'rgba(5,150,105,0.08)', color: '#059669', border: '1.5px solid rgba(5,150,105,0.22)', fontFamily: 'Outfit, sans-serif', padding: isDesktop ? '10px 16px' : '9px 16px' }
            : { background: 'linear-gradient(135deg,#0a1128 0%,#1a3463 100%)', color: '#fff', fontFamily: 'Outfit, sans-serif', boxShadow: '0 4px 14px rgba(10,17,40,0.25)', padding: isDesktop ? '10px 16px' : '9px 16px' }
          }
        >
          {contacted ? (
            <><svg viewBox="0 0 16 16" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M3 8l3.5 3.5 6.5-7" /></svg>Requirement Sent</>
          ) : (
            <><svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" className="w-3.5 h-3.5"><path d="M2 8h10M8 4l4 4-4 4" /></svg>Send Requirement</>
          )}
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl text-[13px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50 transition-all duration-200 hover:bg-[#d4af37]/10"
          style={{ background: 'rgba(212,175,55,0.07)', color: '#b8903c', border: '1.5px solid rgba(212,175,55,0.3)', fontFamily: 'Outfit, sans-serif', padding: isDesktop ? '10px 16px' : '9px 16px' }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="#b8903c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="2" y="2" width="12" height="12" rx="1" /><path d="M5 2V0M11 2V0M2 6h12" /></svg>
          Schedule Consultation
        </button>
      </div>
    </div>
  );
}
