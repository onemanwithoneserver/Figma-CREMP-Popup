import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.FC<{ color: string }>;
}

const SavedIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    <path d="M15 4v5l2-1.5L19 9V4h-4z" />
  </svg>
);

const AgentsIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21v-2.5C5.5 15.46 8.46 13 12 13" />
    <path d="M18.5 21v-2.5C18.5 15.46 15.54 13 12 13" />
    <path d="M12 15v6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const HandpickedIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
    <path d="M12 6l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L12 15l-4 2.5 1.5-4.5L6 10.5h4.5z" />
  </svg>
);

const VideoToursIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="15" height="13" rx="2" />
    <path d="M10 8.5l4 3-4 3V8.5z" />
    <circle cx="18.5" cy="16" r="2.5" />
    <path d="M20.5 18l2.5 2.5" />
  </svg>
);

const PostReqIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <rect x="8" y="1" width="8" height="4" rx="1" />
    <path d="M8 11h8" />
    <path d="M8 15h5" />
    <path d="M17 18v-3" />
    <path d="M15.5 16.5h3" />
  </svg>
);

const navItems: NavItem[] = [
  { id: 'saved', label: 'Saved', icon: SavedIcon },
  { id: 'agents', label: 'Hire Broker', icon: AgentsIcon },
  { id: 'handpicked', label: 'Handpicked', icon: HandpickedIcon },
  { id: 'video', label: 'Video Tours', icon: VideoToursIcon },
  { id: 'post', label: 'Post Req.', icon: PostReqIcon },
];

interface AppFooterProps {
  activeNav: string;
  onNavChange: (id: string) => void;
}

export default function AppFooter({ activeNav, onNavChange }: AppFooterProps) {
  return (
    <footer
      className="relative z-50 w-full flex items-stretch justify-between bg-[#0B1320]/90 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] pb-safe"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      role="navigation"
    >
      {navItems.map((item) => {
        const isActive = activeNav === item.id;
        const iconColor = isActive ? '#F5A623' : '#FFFFFF';

        return (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className="group relative flex flex-col items-center justify-start flex-1 px-1 pt-2.5 pb-2.5 focus-visible:outline-none overflow-hidden min-w-0"
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2.5px] bg-[#F5A623] rounded-b-full shadow-[0_2px_10px_rgba(245,166,35,0.8)] transition-all duration-300 ease-out ${
                isActive ? 'w-8 opacity-100' : 'w-0 opacity-0'
              }`}
            />

            <div className="relative flex items-center justify-center mb-1.5 shrink-0" style={{ width: 22, height: 22 }}>
              <div
                className={`absolute inset-0 bg-[#F5A623] blur-[10px] rounded-full transition-opacity duration-300 ease-out ${
                  isActive ? 'opacity-30' : 'opacity-0'
                }`}
              />
              <div
                className={`relative z-10 transition-transform duration-300 ease-out group-active:scale-90 ${
                  isActive ? 'scale-[1.12]' : 'scale-100'
                }`}
              >
                <item.icon color={iconColor} />
              </div>
            </div>

            <span
              className={`text-[10px] leading-tight tracking-wide text-center break-words w-full px-0.5 transition-all duration-300 ease-out ${
                isActive
                  ? 'text-[#F5A623] font-semibold'
                  : 'text-white/60 font-medium'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </footer>
  );
}