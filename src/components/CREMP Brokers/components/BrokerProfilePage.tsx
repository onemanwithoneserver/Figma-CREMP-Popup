import { useCallback, useEffect, useRef, useState } from 'react';
import type { Broker } from '../types/broker.types';
import VerifiedBadge from './VerifiedBadge';

interface BrokerProfilePageProps {
  broker: Broker;
  isDesktop: boolean;
}

// ── Sample listing data ──────────────────────────────────
const sampleListings = [
  { id: 'l1', title: 'Prestige Business Hub', area: '2,400 sq.ft.', floor: '8th Floor', location: 'Banjara Hills, Hyderabad', price: '₹ 1.2 Cr', type: 'Office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
  { id: 'l2', title: 'HITEC Towers', area: '1,800 sq.ft.', floor: '3rd Floor', location: 'HITEC City, Hyderabad', price: '₹ 85 Lakh', type: 'Retail', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80' },
  { id: 'l3', title: 'Gachibowli Prime', area: '3,200 sq.ft.', floor: 'Ground Floor', location: 'Gachibowli, Hyderabad', price: '₹ 2.8 Cr', type: 'Investment', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80' },
  { id: 'l4', title: 'Jubilee Corporate Park', area: '4,100 sq.ft.', floor: '12th Floor', location: 'Jubilee Hills, Hyderabad', price: '₹ 3.5 Cr', type: 'Office', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80' },
  { id: 'l5', title: 'Madhapur Retail Strip', area: '900 sq.ft.', floor: 'Ground Floor', location: 'Madhapur, Hyderabad', price: '₹ 60 Lakh', type: 'Retail', image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=600&q=80' },
  { id: 'l6', title: 'Raidurg Tech Hub', area: '6,500 sq.ft.', floor: '5th Floor', location: 'Raidurg, Hyderabad', price: '₹ 5.2 Cr', type: 'Investment', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=600&q=80' },
];

// ── Map pins ─────────────────────────────────────────────
const mapPins = [
  { x: 38, y: 42, label: 'HITEC City',    price: '₹85L'   },
  { x: 58, y: 35, label: 'Banjara Hills', price: '₹1.2Cr' },
  { x: 65, y: 60, label: 'Gachibowli',   price: '₹2.8Cr' },
  { x: 28, y: 65, label: 'Madhapur',     price: '₹72L'   },
  { x: 72, y: 48, label: 'Jubilee Hills', price: '₹1.8Cr' },
];

// ── Map Overlay ───────────────────────────────────────────
function BrokerMapOverlay({ broker, isDesktop, onClose }: { broker: Broker; isDesktop: boolean; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [activePin, setActivePin] = useState<number | null>(0);
  return (
    <div className="absolute inset-0 z-50 flex flex-col" style={{ background: 'rgba(10,17,40,0.6)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)', animation: 'cb-fade-in 0.2s ease' }}>
      <div className="flex-1 flex flex-col overflow-hidden" style={{ margin: isDesktop ? '20px' : '0', borderRadius: isDesktop ? '14px' : '0', background: '#f8fafc', boxShadow: isDesktop ? '0 24px 60px rgba(0,0,0,0.22)' : 'none', animation: 'cb-slide-up 0.28s cubic-bezier(0.16,1,0.3,1)' }}>
        <div className="flex items-center justify-between px-4 py-3 shrink-0 bg-white border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0a1128] to-[#1a3463] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5"><path d="M10 2C7.24 2 5 4.24 5 7c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5z" fill="#d4af37" /><circle cx="10" cy="7" r="2" fill="#fff" /></svg>
            </div>
            <div>
              <p className="text-[12px] font-bold text-[#0a1128]" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.name}'s Listings Map</p>
              <p className="text-[11px] text-[#637089] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.cityArea} · {sampleListings.length} active listings</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close map" className="w-7 h-7 rounded-lg border border-black/[0.08] flex items-center justify-center hover:bg-[#f5f6f8] transition-colors bg-white">
            <svg viewBox="0 0 16 16" fill="none" stroke="#637089" strokeWidth="2" strokeLinecap="round" className="w-3 h-3"><path d="M3 3l10 10M13 3L3 13" /></svg>
          </button>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-300" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', backgroundImage: 'linear-gradient(rgba(15,31,61,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(15,31,61,0.04) 1px,transparent 1px)', backgroundSize: '36px 36px', backgroundColor: '#f0f2f7' }}>
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
              <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#0a1128" strokeWidth="2" />
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#0a1128" strokeWidth="2" />
              <line x1="0%" y1="30%" x2="100%" y2="70%" stroke="#0a1128" strokeWidth="1.5" />
              <line x1="0%" y1="70%" x2="100%" y2="30%" stroke="#0a1128" strokeWidth="1.5" />
              <circle cx="50%" cy="50%" r="100" stroke="#0a1128" strokeWidth="1" fill="none" />
            </svg>
            {mapPins.map((pin, i) => (
              <button key={i} onClick={() => setActivePin(activePin === i ? null : i)} aria-label={`${pin.label}: ${pin.price}`} className="absolute flex flex-col items-center gap-0.5" style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -100%)' }}>
                <div className="px-2 py-0.5 rounded-md text-[11px] font-bold shadow-md transition-all duration-200 whitespace-nowrap" style={{ background: activePin === i ? '#0a1128' : '#fff', color: activePin === i ? '#d4af37' : '#0a1128', border: `1.5px solid ${activePin === i ? '#d4af37' : 'rgba(0,0,0,0.1)'}`, transform: activePin === i ? 'scale(1.08)' : 'scale(1)', fontFamily: 'Outfit, sans-serif' }}>{pin.price}</div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: activePin === i ? '#d4af37' : '#0a1128', boxShadow: activePin === i ? '0 0 0 3px rgba(212,175,55,0.25)' : '0 0 0 2px rgba(10,17,40,0.15)', transition: 'all 0.2s ease' }} />
                {activePin === i && <div className="absolute top-full mt-1 px-2 py-1 rounded-md shadow-lg text-[10px] font-semibold text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg,#0a1128,#1a3463)', fontFamily: 'Outfit, sans-serif', zIndex: 10 }}>{pin.label}</div>}
              </button>
            ))}
          </div>
          <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
            <button onClick={() => setZoom(z => Math.min(z + 0.25, 2.5))} aria-label="Zoom in" className="w-7 h-7 bg-white rounded flex items-center justify-center shadow-sm border border-black/[0.08] hover:bg-[#f5f6f8] transition-colors"><svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-3 h-3"><path d="M8 3v10M3 8h10" /></svg></button>
            <button onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))} aria-label="Zoom out" className="w-7 h-7 bg-white rounded flex items-center justify-center shadow-sm border border-black/[0.08] hover:bg-[#f5f6f8] transition-colors"><svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-3 h-3"><path d="M3 8h10" /></svg></button>
          </div>
          {activePin !== null && (
            <div className="absolute bottom-3 left-3 right-3 bg-white rounded-xl shadow-lg border border-black/[0.06] p-3 flex items-center gap-3" style={{ animation: 'cb-slide-up 0.2s ease', zIndex: 10 }}>
              <img src={sampleListings[activePin % sampleListings.length]?.image} alt="" className="w-11 h-11 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-[#0a1128] truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>{mapPins[activePin].label}</p>
                <p className="text-[11px] text-[#637089] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>{sampleListings[activePin % sampleListings.length]?.area}</p>
                <p className="text-[12px] font-bold text-[#d4af37]" style={{ fontFamily: 'Outfit, sans-serif' }}>{mapPins[activePin].price}</p>
              </div>
              <button className="cb-btn-primary px-3 py-1.5 text-[11px] shrink-0">View</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Rating Stars ─────────────────────────────────────────
function RatingStars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const sz = size === 'md' ? 'w-3.5 h-3.5' : 'w-3 h-3';
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const half = !filled && hasHalf && i === full;
        return (
          <svg key={i} viewBox="0 0 16 16" className={`${sz} ${filled || half ? 'text-[#f59e0b]' : 'text-[#d1d5db]'}`} fill="currentColor">
            {half ? (<><defs><linearGradient id={`h-${i}-${size}`} x1="0" x2="1"><stop offset="50%" stopColor="#f59e0b" /><stop offset="50%" stopColor="#d1d5db" /></linearGradient></defs><path fill={`url(#h-${i}-${size})`} d="M8 1.2l1.9 3.8 4.2.6-3 2.9.7 4.2L8 10.5 4.2 12.7l.7-4.2-3-2.9 4.2-.6z" /></>) : (<path d="M8 1.2l1.9 3.8 4.2.6-3 2.9.7 4.2L8 10.5 4.2 12.7l.7-4.2-3-2.9 4.2-.6z" />)}
          </svg>
        );
      })}
    </div>
  );
}

// ── Section divider ───────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-[3px] h-[14px] rounded-full bg-[#d4af37] shrink-0" />
      <span className="text-[12px] font-bold text-[#0a1128] tracking-[0.025em]" style={{ fontFamily: 'Outfit, sans-serif' }}>{label}</span>
      <div className="h-px flex-1 bg-black/[0.05] ml-0.5" />
    </div>
  );
}

// ── Main Profile Page ─────────────────────────────────────
export default function BrokerProfilePage({ broker, isDesktop }: BrokerProfilePageProps) {
  const [showMap,    setShowMap]    = useState(false);
  const [contacted,  setContacted]  = useState(false);
  const [activeTab,  setActiveTab]  = useState<'listings' | 'about' | 'reviews'>('listings');

  const scrollRef   = useRef<HTMLDivElement>(null);
  const listingsRef = useRef<HTMLDivElement>(null);
  const aboutRef    = useRef<HTMLDivElement>(null);
  const reviewsRef  = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((tab: 'listings' | 'about' | 'reviews') => {
    setActiveTab(tab);
    const elMap = { listings: listingsRef, about: aboutRef, reviews: reviewsRef };
    const el = elMap[tab].current;
    const container = scrollRef.current;
    if (el && container) container.scrollTo({ top: el.offsetTop - 2, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveTab(visible[0].target.id as 'listings' | 'about' | 'reviews');
      },
      { root: container, threshold: 0.25, rootMargin: '0px 0px -55% 0px' },
    );
    [listingsRef, aboutRef, reviewsRef].forEach(r => { if (r.current) observer.observe(r.current); });
    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: 'listings' as const, label: `Listings (${sampleListings.length})` },
    { id: 'about'    as const, label: 'About' },
    { id: 'reviews'  as const, label: 'Reviews' },
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative bg-[#fafafb]" style={{ fontFamily: 'Outfit, sans-serif' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="shrink-0 bg-gradient-to-br from-[#0a1128] via-[#111c38] to-[#0a1128] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/[0.07] blur-[56px] -translate-y-1/2 translate-x-1/4 rounded-full pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className={`relative z-10 ${isDesktop ? 'px-6 pt-4 pb-5' : 'px-4 pt-3 pb-4'}`}>
         

          {/* Identity */}
          <div className={`flex gap-3.5 ${isDesktop ? 'items-center' : 'items-start'}`}>
            <div className="shrink-0 rounded-full flex items-center justify-center font-bold text-white ring-[3px] ring-white/[0.12]"
              style={{ width: isDesktop ? 58 : 50, height: isDesktop ? 58 : 50, background: `linear-gradient(135deg,${broker.avatarColor} 0%,${broker.avatarColor}bb 100%)`, fontSize: isDesktop ? 17 : 15, letterSpacing: '0.04em' }}>
              {broker.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className={`font-bold text-white leading-tight ${isDesktop ? 'text-[1.15rem]' : 'text-[1.05rem]'}`}>{broker.name}</h1>
                {broker.isVerified && <VerifiedBadge size="sm" />}
              </div>
              <p className="text-white/55 text-[12px] font-medium leading-tight mt-0.5">{broker.company}</p>
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span className="text-[#d4af37] font-bold text-[12px]">{broker.rating.toFixed(1)}</span>
                <RatingStars rating={broker.rating} size="sm" />
                <span className="text-white/25">·</span>
                <span className="text-white/45 text-[11px] font-medium">{broker.reviewCount} reviews</span>
                <span className="text-white/25">·</span>
                <span className="text-white/45 text-[11px] font-medium">{broker.location}</span>
              </div>
            </div>
            {isDesktop && (
              <button
                onClick={() => setContacted(!contacted)}
                aria-label={contacted ? 'Requirement sent' : 'Send requirement'}
                className={`shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60 ${
                  contacted
                    ? 'rounded-lg text-[12px] font-bold transition-all duration-200'
                    : 'bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white font-medium text-sm rounded-[4px] shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide px-6 py-2.5'
                }`}
                style={contacted
                  ? { padding: '8px 14px', background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1.5px solid rgba(52,211,153,0.3)', fontFamily: 'Outfit, sans-serif' }
                  : { fontFamily: 'Outfit, sans-serif' }
                }
              >
                {contacted ? (
                  <>
                    <svg viewBox="0 0 16 16" fill="none" stroke="#34d399" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M3 8l3.5 3.5 6.5-7" /></svg>
                    Sent
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.9" strokeLinecap="round" className="w-3 h-3"><path d="M2 8h10M8 4l4 4-4 4" /></svg>
                    Send Requirement
                  </>
                )}
              </button>
            )}
          </div>


        </div>
      </div>

      {/* ── Sticky Tab Bar ─────────────────────────────────── */}
      <div className="shrink-0 bg-white border-b border-black/[0.06] z-20" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }}>
        <div role="tablist" aria-label="Profile sections" className="flex overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {tabs.map(tab => (
            <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} aria-controls={`section-${tab.id}`}
              onClick={() => scrollToSection(tab.id)}
              className={`px-5 py-3 text-[13px] font-semibold whitespace-nowrap border-b-2 -mb-px transition-all duration-200 min-h-[44px] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4af37]/40 ${activeTab === tab.id ? 'text-[#0a1128] border-[#d4af37]' : 'text-[#637089] border-transparent hover:text-[#0a1128] hover:border-[#d4af37]/40'}`}
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable content ──────────────────────────────── */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto cb-scroll-thin bg-[#fafafb]">

        {/* LISTINGS */}
        <div ref={listingsRef} id="listings" className="px-3 pt-4 pb-2">
          <div className={`grid gap-3 ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
            {sampleListings.map(listing => (
              <div key={listing.id} className="bg-white rounded-xl border border-black/[0.05] shadow-sm overflow-hidden cursor-pointer group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="relative overflow-hidden" style={{ height: isDesktop ? 144 : 156 }}>
                  <img src={listing.image} alt={listing.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <span className="absolute top-2 left-2.5 px-2 py-[3px] rounded-full text-[9px] font-bold text-white  tracking-wide" style={{ background: 'rgba(10,17,40,0.72)', backdropFilter: 'blur(4px)', fontFamily: 'Outfit, sans-serif' }}>{listing.type}</span>
                  <p className="absolute bottom-2.5 left-3 text-white font-bold text-[15px] drop-shadow" style={{ fontFamily: 'Outfit, sans-serif' }}>{listing.price}</p>
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-[13px] font-bold text-[#0a1128] truncate leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{listing.title}</p>
                  <p className="text-[11px] text-[#637089] font-medium mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{listing.area} · {listing.floor}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <svg viewBox="0 0 16 16" fill="none" stroke="#b0bac9" strokeWidth="1.5" strokeLinecap="round" className="w-2.5 h-2.5 shrink-0"><path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3 4 9 4 9s4-6 4-9c0-2.21-1.79-4-4-4z" /><circle cx="8" cy="5.5" r="1.5" /></svg>
                    <span className="text-[11px] text-[#a0aabf] font-medium truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>{listing.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <div ref={aboutRef} id="about" className="px-3 pt-4 pb-2">
          <SectionDivider label="About" />
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-xl border border-black/[0.05] shadow-sm p-4">
                <p className="text-[13px] text-[#3d4f6b] leading-relaxed font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {broker.bio ? broker.bio + ' ' : ''}
                  With over {broker.experienceYears}+ years in commercial real estate, {broker.name.split(' ')[0]} has closed {broker.dealsClosed}+ deals and transacted {broker.sqFtTransacted} of sq.ft. across prime markets. A trusted name at {broker.company}, combining deep market insight with a client-first approach to deliver results across office, retail, and industrial properties.
                </p>
              </div>
            {/* Specializations card */}
            <div className="bg-white rounded-xl border border-black/[0.05] shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/[0.04] bg-[#fafafb]">
                <svg viewBox="0 0 16 16" fill="none" stroke="#d4af37" strokeWidth="1.6" strokeLinecap="round" className="w-3.5 h-3.5 shrink-0"><path d="M8 1l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9l-3 1.5.5-3.5L3 4.5 6.5 4z" /></svg>
                <span className="text-[11px] font-bold text-[#0a1128] tracking-[0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>Specializations</span>
              </div>
              <div className="px-4 py-3 flex flex-wrap gap-1.5">
                {broker.specialties.map(s => (
                  <span key={s} className="inline-flex items-center px-2.5 py-[5px] text-[11px] font-semibold text-[#1a3463] rounded-lg border border-[#1a3463]/[0.12] bg-[#1a3463]/[0.05] hover:bg-[#1a3463]/[0.09] transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="bg-white rounded-xl border border-black/[0.05] shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/[0.04] bg-[#fafafb]">
                <svg viewBox="0 0 16 16" fill="none" stroke="#d4af37" strokeWidth="1.6" strokeLinecap="round" className="w-3.5 h-3.5 shrink-0"><path d="M3 2h3l1.5 3.5-1.75 1a7 7 0 003.75 3.75l1-1.75L14 11v3a1 1 0 01-1 1A11 11 0 012 4a1 1 0 011-1z" /></svg>
                <span className="text-[11px] font-bold text-[#0a1128] tracking-[0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>Contact</span>
              </div>
              <div className="px-4 py-3 flex flex-col divide-y divide-black/[0.04]">
                {broker.phone && (
                  <div className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#a0aabf] font-medium leading-none mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>Phone</p>
                      <p className="text-[13px] text-[#0a1128] font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.phone}</p>
                    </div>
                    <a href={`tel:${broker.phone}`} aria-label="Call broker" className="w-7 h-7 rounded-lg bg-[#0a1128] flex items-center justify-center hover:bg-[#1a3463] transition-colors shrink-0">
                      <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" className="w-3 h-3"><path d="M3 2h3l1.5 3.5-1.75 1a7 7 0 003.75 3.75l1-1.75L14 11v3a1 1 0 01-1 1A11 11 0 012 4a1 1 0 011-1z" /></svg>
                    </a>
                  </div>
                )}
                {broker.whatsapp && (
                  <div className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#a0aabf] font-medium leading-none mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>WhatsApp</p>
                      <p className="text-[13px] text-[#0a1128] font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.whatsapp}</p>
                    </div>
                    <a href={`https://wa.me/${broker.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp broker" className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center hover:bg-[#1ebd5b] transition-colors shrink-0">
                      <svg viewBox="0 0 16 16" fill="white" className="w-3.5 h-3.5"><path d="M13.6 2.4A7.84 7.84 0 008 0 7.96 7.96 0 00.78 11.9L0 16l4.2-.78A7.94 7.94 0 008 16a7.96 7.96 0 007.96-8 7.84 7.84 0 00-2.36-5.6zm-5.6 12.26a6.6 6.6 0 01-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25A6.61 6.61 0 118 14.66zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.51.64-.63.77-.11.13-.23.15-.43.05a5.42 5.42 0 01-1.6-.98 5.9 5.9 0 01-1.1-1.37c-.12-.2 0-.3.09-.4l.3-.35c.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.44-1.08-.61-1.47-.16-.38-.32-.33-.44-.34H5.5c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.65s.72 1.92.82 2.05c.1.13 1.4 2.14 3.4 3 .47.2.84.33 1.13.42.47.15.9.13 1.24.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.09-.18-.14-.38-.24z" /></svg>
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <div className="w-7 h-7 rounded-lg bg-[#f5f3ff] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 16 16" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5"><path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3 4 9 4 9s4-6 4-9c0-2.21-1.79-4-4-4z" /><circle cx="8" cy="5.5" r="1.5" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#a0aabf] font-medium leading-none mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>Location</p>
                    <p className="text-[13px] text-[#0a1128] font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.location}</p>
                  </div>
                </div>
              </div>
            </div>
            {!isDesktop && (
              <button
                onClick={() => setContacted(!contacted)}
                aria-label={contacted ? 'Requirement sent' : 'Send requirement'}
                className={`w-full flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50 ${
                  contacted
                    ? 'rounded-xl text-[13px] font-bold transition-all duration-200'
                    : 'bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white font-medium text-sm rounded-[4px] shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide px-6 py-2.5'
                }`}
                style={contacted
                  ? { padding: '13px 20px', background: 'rgba(16,185,129,0.08)', color: '#059669', border: '1.5px solid rgba(16,185,129,0.22)', fontFamily: 'Outfit, sans-serif' }
                  : { fontFamily: 'Outfit, sans-serif' }
                }
              >
                {contacted ? (
                  <>
                    <svg viewBox="0 0 16 16" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M3 8l3.5 3.5 6.5-7" /></svg>
                    Requirement Sent
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.9" strokeLinecap="round" className="w-3 h-3"><path d="M2 8h10M8 4l4 4-4 4" /></svg>
                    Send Requirement
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* REVIEWS */}
        <div ref={reviewsRef} id="reviews" className="px-3 pt-4 pb-5">
          <SectionDivider label="Reviews" />
          <div className="bg-white rounded-xl border border-black/[0.05] shadow-sm p-4 flex items-center gap-5 mb-3">
            <div className="flex flex-col items-center shrink-0 min-w-[56px]">
              <span className="text-[2.1rem] font-bold text-[#0a1128] leading-none" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.rating.toFixed(1)}</span>
              <RatingStars rating={broker.rating} size="md" />
              <span className="text-[10px] text-[#637089] font-medium mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{broker.reviewCount} reviews</span>
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              {[5, 4, 3, 2, 1].map(star => {
                const pct = star === 5 ? 70 : star === 4 ? 22 : star === 3 ? 6 : 1;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-[#637089] w-2.5 text-right shrink-0" style={{ fontFamily: 'Outfit, sans-serif' }}>{star}</span>
                    <svg viewBox="0 0 10 10" fill="#f59e0b" className="w-2.5 h-2.5 shrink-0"><path d="M5 1l1.2 2.4 2.6.4-1.9 1.8.45 2.6L5 7l-2.35 1.2.45-2.6L1.2 3.8l2.6-.4z" /></svg>
                    <div className="flex-1 bg-[#f0f2f7] rounded-full h-1.5 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f59e0b]" style={{ width: `${pct}%`, transition: 'width 0.6s ease' }} /></div>
                    <span className="text-[10px] text-[#a0aabf] font-medium w-5 text-right shrink-0" style={{ fontFamily: 'Outfit, sans-serif' }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { name: 'Vikram S.',  initials: 'VS', color: '#0369a1', rating: 5, text: 'Exceptional service. Closed our office deal in 3 weeks with zero friction. Highly recommended.', time: '2 weeks ago' },
              { name: 'Ananya R.', initials: 'AR', color: '#be185d', rating: 5, text: 'Very professional and deeply knowledgeable about the Hyderabad commercial market.', time: '1 month ago' },
              { name: 'Suresh M.', initials: 'SM', color: '#7c3aed', rating: 4, text: 'Great communication throughout the entire leasing process. Would work with again.', time: '2 months ago' },
            ].map((rev, i) => (
              <div key={i} className="bg-white rounded-xl border border-black/[0.05] shadow-sm p-3.5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: rev.color, fontFamily: 'Outfit, sans-serif' }}>{rev.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12px] font-bold text-[#0a1128]" style={{ fontFamily: 'Outfit, sans-serif' }}>{rev.name}</span>
                      <span className="text-[10px] text-[#a0aabf] font-medium shrink-0" style={{ fontFamily: 'Outfit, sans-serif' }}>{rev.time}</span>
                    </div>
                    <RatingStars rating={rev.rating} size="sm" />
                  </div>
                </div>
                <p className="text-[12px] text-[#4d5f7a] font-medium leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>"{rev.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showMap && <BrokerMapOverlay broker={broker} isDesktop={isDesktop} onClose={() => setShowMap(false)} />}
    </div>
  );
}
