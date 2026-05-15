import { useState } from 'react';

const MenuIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const LocationIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const ChevronDownIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const UserCircleIcon = ({ color = "#FBBF24" }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <circle cx="12" cy="7" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21.5C4.5 17.358 7.858 14 12 14c4.142 0 7.5 3.358 7.5 7.5" />
  </svg>
);

const MapIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>
);

const VideoIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h12a2 2 0 012 2v3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16a2 2 0 01-2-2V8a2 2 0 012-2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 18H4" />
    <polygon points="9,9 13,11 9,13" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="16" r="4" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 18.5L22 22" />
  </svg>
);

export default function Header() {
  const [activeView, setActiveView] = useState<'map' | 'video'>('map');

  return (
    <header
      className="flex items-center justify-between px-2 pt-1.5 w-full bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] border-b border-white/[0.06] relative z-50 overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Decorative gold glow */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-[#d4af37]/10 blur-[48px] -translate-y-1/2 translate-x-1/4 rounded-full pointer-events-none" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />
      
      <div className="flex items-center gap-1.5 relative z-10">
        <button
          className="p-1 text-white hover:text-white/80 active:scale-95 transition-all outline-none"
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </button>

        <button
          className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/10 bg-[#121c33] hover:bg-[#1a3463] active:scale-95 transition-all outline-none"
          aria-label="Change location"
        >
          <LocationIcon color="#94A3B8" />
          <span className="text-white font-medium text-[11px] tracking-wide">
            Hyderabad
          </span>
          <ChevronDownIcon color="#64748B" />
        </button>
      </div>

      <div className="flex items-center p-0.5 bg-[#121c33] border border-white/10 rounded-[4px] relative z-10">
        <button
          onClick={() => setActiveView('map')}
          className={`flex items-center justify-center h-6 rounded-[3px] transition-all duration-300 outline-none ${
            activeView === 'map' 
              ? 'w-12 bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)]' 
              : 'w-7 hover:bg-white/5'
          }`}
          aria-label="Switch to Map view"
        >
          {activeView === 'map' ? (
            <span className="text-white font-semibold text-[9px] tracking-widest ">
              MAP
            </span>
          ) : (
            <MapIcon color="#64748B" />
          )}
        </button>

        <button
          onClick={() => setActiveView('video')}
          className={`flex items-center justify-center h-6 rounded-[3px] transition-all duration-300 outline-none ${
            activeView === 'video' 
              ? 'w-12 bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)]' 
              : 'w-7 hover:bg-white/5'
          }`}
          aria-label="Switch to Video view"
        >
          {activeView === 'video' ? (
            <span className="text-white font-semibold text-[9px] tracking-widest ">
              VIDEO
            </span>
          ) : (
            <VideoIcon color="#64748B" />
          )}
        </button>
      </div>

      <button
        className="flex flex-col items-center gap-0.5 p-1 active:scale-95 transition-all outline-none hover:opacity-80 relative z-10"
        aria-label="Log in to your account"
      >
        <UserCircleIcon color="#FBBF24" />
        <span className="text-white/90 text-[8px] font-semibold tracking-widest ">
          LOGIN
        </span>
      </button>
    </header>
  );
}