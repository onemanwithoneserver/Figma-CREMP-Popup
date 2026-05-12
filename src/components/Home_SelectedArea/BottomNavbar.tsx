import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.FC<{ color: string }>;
}

const SavedIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const BrokerIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <circle cx="12" cy="7" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 21v-2a7 7 0 0114 0v2" />
    <circle cx="16.5" cy="15.5" r="3.5" fill="#070C15" />
    <circle cx="16.5" cy="15.5" r="3.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 15.5m-1 0a1 1 0 102 0 1 1 0 10-2 0" />
  </svg>
);

const HandpickedIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25l2.454 2.454L17.92 4.5l.206 3.466L21 9.75l-2.08 2.756.634 3.414-3.13 1.488-1.576 3.092L12 19.5l-2.848 1.002-1.576-3.092-3.13-1.488.634-3.414L3 9.75l2.874-1.784.206-3.466 3.466.206L12 2.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25l1.036 2.344 2.564.216-1.942 1.688.584 2.502L12 13.65l-2.242 1.35.584-2.502-1.942-1.688 2.564-.216L12 8.25z" />
  </svg>
);

const VideoIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <rect x="3" y="5" width="16" height="12" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 8.5l4 2.5-4 2.5v-5z" />
    <circle cx="17.5" cy="17.5" r="4.5" fill="#070C15" />
    <circle cx="16.5" cy="16.5" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 18.5L21.5 21.5" />
  </svg>
);

const PostIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 21H6a2 2 0 01-2-2V5a2 2 0 012-2h8l4 4v3" />
    <circle cx="18" cy="17" r="5" fill="#070C15" />
    <circle cx="18" cy="17" r="5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 17h4M18 15v4" />
  </svg>
);

const navItems: NavItem[] = [
  { id: 'saved',      label: 'Saved',            icon: SavedIcon },
  { id: 'broker',     label: 'Hire Broker',      icon: BrokerIcon },
  { id: 'handpicked', label: 'Handpicked',       icon: HandpickedIcon },
  { id: 'video',      label: 'Video Search',     icon: VideoIcon },
  { id: 'post',       label: 'Post Requirement', icon: PostIcon },
];

interface BottomNavbarProps {
  activeNav: string;
  onNavChange: (id: string) => void;
}

export default function BottomNavbar({ activeNav, onNavChange }: BottomNavbarProps) {
  return (
    <nav
      className="w-full shrink-0 flex items-center justify-between px-1 pb-3 border-t border-white/10"
      style={{ backgroundColor: '#070C15', fontFamily: "'Outfit', sans-serif" }}
      role="navigation"
    >
      {navItems.map((item, index) => {
        const isActive = activeNav === item.id;
        const iconColor = isActive ? '#FBBF24' : '#FFFFFF';

        return (
          <React.Fragment key={item.id}>
            <button
              onClick={() => onNavChange(item.id)}
              className="flex flex-col items-center justify-center gap-1.5 flex-1 transition-all duration-200 active:scale-95 focus-visible:outline-none"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative flex items-center justify-center h-7 w-7">
                <item.icon color={iconColor} />
              </div>
              <span
                className={`text-[9.5px] text-center transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#FBBF24] font-medium' : 'text-[#E2E8F0] font-normal'
                }`}
                style={{ letterSpacing: '0.2px' }}
              >
                {item.id === 'post' ? (<>Post<br />Requirement</>) : item.label}
              </span>
            </button>

            {index < navItems.length - 1 && (
              <div className="w-[1px] h-9 bg-[#1E293B] shrink-0" aria-hidden="true" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
