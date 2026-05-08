import { useState } from 'react';
import type { Broker } from '../../types/broker.types';
import { TIER_COLORS } from './constants';
import { StarRating } from './StarRating';

// ─── Profile Header ───────────────────────────────────────────────────────────
export function ProfileHeader({ broker, isDesktop, onViewMap }: { broker: Broker; isDesktop: boolean; onViewMap: () => void }) {
  const [imgError, setImgError] = useState(false);

  const renderAvatar = (size: number) => (
    <div className="relative shrink-0">
      <div className="rounded-xl overflow-hidden flex items-center justify-center font-bold text-white ring-[2px] ring-white/[0.15]" style={{ width: size, height: size, background: `linear-gradient(135deg,${broker.avatarColor} 0%,${broker.avatarColor}cc 100%)`, fontSize: size * 0.27 }}>
        {broker.avatarUrl && !imgError ? (
          <img src={broker.avatarUrl} alt={broker.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
        ) : (
          <span style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.avatarInitials}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0a1128 0%,#111c38 55%,#0d1630 100%)' }}>
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%)', transform: 'translate(30%,-40%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className={`relative z-10 ${isDesktop ? 'px-6 pt-5 pb-5' : 'px-4 pt-4 pb-4'}`}>
        {isDesktop ? (
          <div className="flex gap-5 items-start">
            {renderAvatar(80)}

            {/* Identity */}
            <div className="flex-1 min-w-0">
              {broker.isVerified && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2" style={{ background: 'rgba(212,175,55,0.14)', border: '1px solid rgba(212,175,55,0.3)' }}>
                  <svg viewBox="0 0 16 16" fill="#d4af37" className="w-3 h-3"><path fillRule="evenodd" d="M8 1.25a.75.75 0 00-.454.152L2.546 4.8A.75.75 0 002.25 5.4v4.85a.75.75 0 00.296.6l5 3.75a.75.75 0 00.908 0l5-3.75a.75.75 0 00.296-.6V5.4a.75.75 0 00-.296-.6L8.454 1.402A.75.75 0 008 1.25Zm2.78 5.47a.75.75 0 00-1.06-1.06L7.25 8.13 6.28 7.16a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.06 0l3-3Z" clipRule="evenodd" /></svg>
                  <span className="text-[10px] font-bold text-[#d4af37] tracking-[0.04em]" style={{ fontFamily: 'Outfit, sans-serif' }}>VERIFIED CREMP PARTNER</span>
                </div>
              )}
              <h1 className="text-[1.25rem] font-bold text-white leading-tight mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.name}</h1>
              <div className="flex items-center gap-1.5 mb-1">
                <svg viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeLinecap="round" className="w-3 h-3 shrink-0"><rect x="2" y="4" width="12" height="9" rx="1" /><path d="M2 7h12M5 4V2M11 4V2" /></svg>
                <p className="text-white/55 text-[12px] font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.company}</p>
              </div>
              {broker.reraNumber && (
                <div className="flex items-center gap-1.5 mb-1.5">
                  <svg viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeLinecap="round" className="w-3 h-3 shrink-0"><rect x="2" y="2" width="12" height="12" rx="1" /><path d="M5 8h6M5 11h4M5 5h6" /></svg>
                  <span className="text-white/40 text-[11px] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>RERA Reg No.: <span className="text-white/65 font-semibold">{broker.reraNumber}</span></span>
                  <span className="text-[10px] font-bold text-[#d4af37] cursor-pointer hover:text-[#f0cc5a] transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>· Verify</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 mb-2">
                <svg viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeLinecap="round" className="w-3 h-3 shrink-0"><path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3 4 9 4 9s4-6 4-9c0-2.21-1.79-4-4-4z" /><circle cx="8" cy="5.5" r="1.5" /></svg>
                <span className="text-white/50 text-[11px] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.location}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {broker.experienceBadge && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#d4af37', fontFamily: 'Outfit, sans-serif' }}>
                    {broker.experienceBadge}
                  </span>
                )}
                {broker.responseTime && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24', fontFamily: 'Outfit, sans-serif' }}>
                    ⚡ {broker.responseTime}
                  </span>
                )}
              </div>
            </div>

            {/* Serviceable locations mini-card */}
            <div className="shrink-0 w-44">
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>
                <div className="px-3 py-2 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-[9px] font-bold text-white/60 tracking-[0.06em]" style={{ fontFamily: 'Outfit, sans-serif' }}>SERVICEABLE LOCATIONS</p>
                </div>
                {(Object.entries(TIER_COLORS) as [keyof typeof TIER_COLORS, typeof TIER_COLORS[keyof typeof TIER_COLORS]][]).map(([tier, c]) => {
                  const count = broker.serviceableLocations?.filter(l => l.tier === tier).length ?? 0;
                  return (
                    <div key={tier} className="flex items-center gap-2 px-3 py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.dot }} />
                      <span className="text-[9.5px] font-semibold text-white/55 flex-1 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{c.label}</span>
                      <span className="text-[10px] font-bold text-white/75 shrink-0" style={{ fontFamily: 'Outfit, sans-serif' }}>{count > 0 ? count : '12+'}</span>
                    </div>
                  );
                })}
                <button type="button" onClick={onViewMap} className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-bold text-[#d4af37] hover:text-[#f0cc5a] transition-colors focus-visible:outline-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-3 h-3"><path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3 4 9 4 9s4-6 4-9c0-2.21-1.79-4-4-4z" /><circle cx="8" cy="5.5" r="1.5" /></svg>
                  View Full Map
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Mobile layout — polished two-row design */
          <div>
            {/* Row 1: Avatar + core identity */}
            <div className="flex gap-3.5 items-start">
              {renderAvatar(68)}
              <div className="flex-1 min-w-0 pt-0.5">
                {broker.isVerified && (
                  <div className="inline-flex items-center gap-1 px-2 py-[3px] rounded-full mb-1.5" style={{ background: 'rgba(212,175,55,0.14)', border: '1px solid rgba(212,175,55,0.28)' }}>
                    <svg viewBox="0 0 16 16" fill="#d4af37" className="w-2.5 h-2.5"><path fillRule="evenodd" d="M8 1.25a.75.75 0 00-.454.152L2.546 4.8A.75.75 0 002.25 5.4v4.85a.75.75 0 00.296.6l5 3.75a.75.75 0 00.908 0l5-3.75a.75.75 0 00.296-.6V5.4a.75.75 0 00-.296-.6L8.454 1.402A.75.75 0 008 1.25Zm2.78 5.47a.75.75 0 00-1.06-1.06L7.25 8.13 6.28 7.16a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.06 0l3-3Z" clipRule="evenodd" /></svg>
                    <span className="text-[9px] font-bold text-[#d4af37] tracking-[0.04em]" style={{ fontFamily: 'Outfit, sans-serif' }}>VERIFIED CREMP PARTNER</span>
                  </div>
                )}
                <h1 className="text-[1.1rem] font-bold text-white leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.name}</h1>
                <p className="text-white/55 text-[11.5px] font-semibold mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.company}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <svg viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" strokeLinecap="round" className="w-2.5 h-2.5 shrink-0"><path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3 4 9 4 9s4-6 4-9c0-2.21-1.79-4-4-4z" /><circle cx="8" cy="5.5" r="1.5" /></svg>
                  <span className="text-white/45 text-[11px] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.location}</span>
                  {broker.reraNumber && (
                    <></>
                  )}
                </div>
              </div>
            </div>
            {/* Row 2: Badges + rating */}
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              {broker.experienceBadge && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.28)', color: '#d4af37', fontFamily: 'Outfit, sans-serif' }}>{broker.experienceBadge}</span>
              )}
              {broker.responseTime && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24', fontFamily: 'Outfit, sans-serif' }}>
                  <svg viewBox="0 0 16 16" fill="#fbbf24" className="w-2.5 h-2.5"><path d="M9 2L4 9h5l-2 5 7-7H9l2-5z" /></svg>
                  {broker.responseTime}
                </span>
              )}
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-[#d4af37] font-bold text-[13px]" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.rating.toFixed(1)}</span>
                <StarRating rating={broker.rating} size="sm" />
                <span className="text-white/40 text-[10.5px] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.reviewCount} reviews</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
