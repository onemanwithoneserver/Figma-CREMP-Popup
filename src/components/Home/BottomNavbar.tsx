import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

const AMBER = '#F5A623';
const AMBER_BG = 'rgba(245, 166, 35, 0.13)';
const INACTIVE_ICON = 'rgba(255,255,255,0.42)';
const INACTIVE_LABEL = 'rgba(255,255,255,0.38)';

const SavedIcon = (active: boolean) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? AMBER : INACTIVE_ICON}
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    <path d="M9 3v9l3-2 3 2V3" strokeWidth="1.4" />
  </svg>
);

const HireBrokerIcon = (active: boolean) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? AMBER : INACTIVE_ICON}
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3.5" />
    <path d="M2 21v-1.5C2 16.46 5.13 14 9 14s7 2.46 7 5.5V21" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M22 21v-1a5 5 0 0 0-3.5-4.77" />
  </svg>
);

const HandpickedIcon = (active: boolean) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? AMBER : INACTIVE_ICON}
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const VideoToursIcon = (active: boolean) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? AMBER : INACTIVE_ICON}
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="16" height="13" rx="2.5" />
    <polygon points="9 7.5 9 12.5 13.5 10" fill={active ? AMBER : INACTIVE_ICON} stroke="none" />
    <circle cx="18" cy="18" r="3" />
    <line x1="20.1" y1="20.1" x2="22" y2="22" />
  </svg>
);

const PostReqIcon = (active: boolean) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? AMBER : INACTIVE_ICON}
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="12" x2="12" y2="18" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);

const navItems: NavItem[] = [
  { id: 'saved',      label: 'Saved',       icon: SavedIcon },
  { id: 'broker',     label: 'Hire Broker', icon: HireBrokerIcon },
  { id: 'handpicked', label: 'Handpicked',  icon: HandpickedIcon },
  { id: 'video',      label: 'Video Tours', icon: VideoToursIcon },
  { id: 'post',       label: 'Post Req.',   icon: PostReqIcon },
];

interface AppFooterProps {
  activeNav: string;
  onNavChange: (id: string) => void;
}

export default function AppFooter({ activeNav, onNavChange }: AppFooterProps) {
  return (
    <footer
      role="navigation"
      style={{
        position: 'relative',
        zIndex: 50,
        width: '100%',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        background: '#0B1320',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        fontFamily: "'SF Pro Text', 'Inter', system-ui, sans-serif",
      }}
    >
      {navItems.map((item) => {
        const isActive = activeNav === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              padding: '10px 4px 12px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
              position: 'relative',
            }}
          >
            {/* Amber pill behind icon */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 7,
                left: '50%',
                transform: 'translateX(-50%)',
                width: isActive ? 46 : 0,
                height: 32,
                borderRadius: 10,
                background: AMBER_BG,
                opacity: isActive ? 1 : 0,
                transition: 'width 300ms cubic-bezier(0.34,1.56,0.64,1), opacity 200ms ease',
                pointerEvents: 'none',
              }}
            />

            {/* Icon wrapper — consistent 22×22 box */}
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                flexShrink: 0,
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 280ms cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              {item.icon(isActive)}
            </span>

            {/* Label */}
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: 10,
                lineHeight: 1.3,
                textAlign: 'center',
                letterSpacing: '0.015em',
                wordBreak: 'break-word',
                width: '100%',
                paddingLeft: 2,
                paddingRight: 2,
                color: isActive ? AMBER : INACTIVE_LABEL,
                fontWeight: isActive ? 600 : 400,
                transition: 'color 200ms ease',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </footer>
  );
}