import { useState } from 'react';

const MenuIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const ChevronDownIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const UserOutlineIcon = ({ color = "#FBBF24" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <circle cx="12" cy="8" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 20c0-3.5 3.5-6 7-6s7 2.5 7 6" />
    <circle cx="12" cy="12" r="11" />
  </svg>
);

const MapIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>
);

const SearchMapIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h12a2 2 0 012 2v3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16a2 2 0 01-2-2V8a2 2 0 012-2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 18H4" />
    <polygon points="9,9 13,11 9,13" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="16" r="4" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 18.5L22 22" />
  </svg>
);

export default function LeaseHeader() {
  const [activeView, setActiveView] = useState<'map' | 'video'>('map');

  return (
    <header className="flex items-center justify-between px-2 py-1.5 w-full bg-[#0a1128] relative z-50 font-['Outfit',sans-serif]">

      <div className="flex items-center gap-2">
        <button
          className="p-1 text-white hover:text-white/80 hover:scale-110 active:scale-95 transition-all outline-none"
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </button>

        <button
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-[#121c33] hover:bg-[#1a2542] hover:-translate-y-[1px] active:scale-95 transition-all outline-none"
          aria-label="Change location"
        >
          <span className="text-white font-medium text-[11px] tracking-wide">
            Hyderabad
          </span>
          <ChevronDownIcon color="#64748B" />
        </button>
      </div>

      <div className="flex items-center p-0.5 bg-[#121c33] border border-white/10 rounded overflow-hidden relative z-10">
        <button
          onClick={() => setActiveView('map')}
          className={`flex items-center justify-center h-6 rounded-sm transition-all outline-none ${activeView === 'map'
            ? 'w-10 bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] shadow-[0_2px_8px_rgba(212,175,55,0.25)] hover:-translate-y-[0.5px]'
            : 'w-7 hover:bg-white/5 hover:scale-105'
            }`}
          aria-label="Switch to Map view"
        >
          {activeView === 'map' ? (
            <span className="text-white font-bold text-[9px] tracking-widest">
              Map
            </span>
          ) : (
            <MapIcon color="#64748B" />
          )}
        </button>

        <button
          onClick={() => setActiveView('video')}
          className={`flex items-center justify-center h-6 rounded-sm transition-all outline-none ${activeView === 'video'
            ? 'w-[84px] bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] shadow-[0_2px_8px_rgba(212,175,55,0.25)] hover:-translate-y-[0.5px]'
            : 'w-7 hover:bg-white/5 hover:scale-105'
            }`}
          aria-label="Switch to Video Search view"
        >
          {activeView === 'video' ? (
            <span className="text-white font-bold text-[9px] tracking-widest whitespace-nowrap">
              VideoSearch
            </span>
          ) : (
            <SearchMapIcon color="#94A3B8" />
          )}
        </button>
      </div>

      <button
        className="flex flex-col items-center p-0.5 hover:scale-105 hover:-translate-y-[1px] active:scale-95 transition-all outline-none group"
        aria-label="Log in to your account"
      >
        <div className="group-hover:drop-shadow-[0_0_5px_rgba(251,191,36,0.4)] transition-all">
          <UserOutlineIcon color="#FBBF24" />
        </div>
        <span className="text-white/90 group-hover:text-white text-[8px] font-bold tracking-wider transition-colors mt-[1px]">
          Login
        </span>
      </button>

    </header>
  );
}