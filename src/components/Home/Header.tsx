const MenuIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const LocationIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const ChevronDownIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const UserCircleIcon = ({ color = "#FBBF24" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <circle cx="12" cy="8" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6" />
  </svg>
);

export default function Header() {
  return (
    <header
      className="flex items-center justify-between px-4 py-3 w-full border-b border-white/5 shadow-sm relative z-50"
      style={{
        fontFamily: "'Outfit', sans-serif",
        backgroundColor: '#070C15',
      }}
    >
      <div className="flex items-center gap-3">
        <button
          className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full active:scale-95 transition-all hover:bg-white/5 focus-visible:outline-none"
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </button>

        <button
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] active:scale-95 transition-all focus-visible:outline-none"
          aria-label="Change location"
        >
          <LocationIcon color="#94A3B8" />
          <span className="text-white font-medium text-[13px] tracking-wide mt-[1px]">
            Hyderabad
          </span>
          <ChevronDownIcon color="#94A3B8" />
        </button>
      </div>

      <button
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full active:scale-95 transition-all focus-visible:outline-none bg-[#FBBF24]/10 border border-[#FBBF24]/20 hover:bg-[#FBBF24]/20 group"
        aria-label="Log in to your account"
      >
        <UserCircleIcon color="#FBBF24" />
        <span className="text-[#FBBF24] text-[13px] font-semibold tracking-wide mt-[1px] pr-1 transition-colors group-hover:text-[#FCD34D]">
          Login
        </span>
      </button>
    </header>
  );
}