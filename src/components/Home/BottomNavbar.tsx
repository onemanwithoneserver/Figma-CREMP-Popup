import React, { memo } from 'react';

interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  active?: boolean;
}

const UserProfileInlineSVG = ({ width = '100%', height = '100%', className = '', active }: SvgIconProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <circle cx="10" cy="7" r="4.5" stroke={active ? 'url(#goldGrad1)' : 'white'} strokeWidth="1.5" />
    <path d="M3 21v-2a6 6 0 0 1 8-5.5" stroke={active ? 'url(#goldGrad1)' : 'white'} strokeWidth="1.5" />
    <circle cx="17.5" cy="16.5" r="3.5" stroke={active ? 'url(#goldGrad1)' : 'white'} strokeWidth="1.5" />
    <path d="M17.5 16.5v.01" stroke={active ? 'url(#goldGrad1)' : 'white'} strokeWidth="1.5" />
  </svg>
);

const HandPickedInlineSVG = ({ width = '100%', height = '100%', className = '', active }: SvgIconProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <path d="M12 2.5a1.5 1.5 0 0 1 1 .5l1.5 1.5a1.5 1.5 0 0 0 1 .5h2a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 0 .5 1l1.5 1.5a1.5 1.5 0 0 1 0 2l-1.5 1.5a1.5 1.5 0 0 0-.5 1v2a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 0-1 .5l-1.5 1.5a1.5 1.5 0 0 1-2 0l-1.5-1.5a1.5 1.5 0 0 0-1-.5h-2a1.5 1.5 0 0 1-1.5-1.5v-2a1.5 1.5 0 0 0-.5-1l-1.5-1.5a1.5 1.5 0 0 1 0-2l1.5-1.5a1.5 1.5 0 0 0 .5-1v-2A1.5 1.5 0 0 1 5.5 6h2a1.5 1.5 0 0 0 1-.5l1.5-1.5a1.5 1.5 0 0 1 1-.5z" 
      stroke={active ? 'url(#goldGrad2)' : 'white'} strokeWidth="1.5" />
    <polygon points="12 7.5 13.5 10 16.5 10.5 14 12.5 14.5 15.5 12 14 9.5 15.5 10 12.5 7.5 10.5 10.5 10" 
      stroke={active ? 'url(#goldGrad2)' : 'white'} strokeWidth="1.5" />
  </svg>
);

const VideoSearchInlineSVG = ({ width = '100%', height = '100%', className = '', active }: SvgIconProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="goldGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <path d="M15 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" stroke={active ? 'url(#goldGrad3)' : 'white'} strokeWidth="1.5" />
    <polygon points="9 9 13 11 9 13" stroke={active ? 'url(#goldGrad3)' : 'white'} strokeWidth="1.5" />
    <circle cx="17" cy="16" r="3.5" stroke={active ? 'url(#goldGrad3)' : 'white'} strokeWidth="1.5" />
    <path d="m19.5 18.5 2 2" stroke={active ? 'url(#goldGrad3)' : 'white'} strokeWidth="1.5" />
  </svg>
);

const DocumentAddInlineSVG = ({ width = '100%', height = '100%', className = '', active }: SvgIconProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="goldGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <path d="M14 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" stroke={active ? 'url(#goldGrad4)' : 'white'} strokeWidth="1.5" />
    <path d="M7 8h6" stroke={active ? 'url(#goldGrad4)' : 'white'} strokeWidth="1.5" />
    <path d="M7 12h6" stroke={active ? 'url(#goldGrad4)' : 'white'} strokeWidth="1.5" />
    <path d="M7 16h3" stroke={active ? 'url(#goldGrad4)' : 'white'} strokeWidth="1.5" />
    <circle cx="17.5" cy="16.5" r="4.5" stroke={active ? 'url(#goldGrad4)' : 'white'} strokeWidth="1.5" />
    <path d="M17.5 14v5M15 16.5h5" stroke={active ? 'url(#goldGrad4)' : 'white'} strokeWidth="1.5" />
  </svg>
);

interface IconProps {
  active: boolean;
  size?: string;
}

const SavedIcon = memo(({ active, size = '100%' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
    <defs>
      <linearGradient id="goldGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <path 
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
      stroke={active ? 'url(#goldGrad5)' : 'white'} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={`transition-all duration-300 ${active ? 'fill-amber-500/20' : 'fill-none'}`}
    />
  </svg>
));

const HireBrokerIcon = memo(({ active, size = '100%' }: IconProps) => <UserProfileInlineSVG active={active} width={size} height={size} />);
const HandpickedIcon = memo(({ active, size = '100%' }: IconProps) => <HandPickedInlineSVG active={active} width={size} height={size} />);
const VideoSearchIcon = memo(({ active, size = '100%' }: IconProps) => <VideoSearchInlineSVG active={active} width={size} height={size} />);
const PostRequirementIcon = memo(({ active, size = '100%' }: IconProps) => <DocumentAddInlineSVG active={active} width={size} height={size} />);

interface NavItem {
  id: string;
  label: string;
  Icon?: React.FC<IconProps>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'cremp',      label: 'CREMP' },
  { id: 'saved',      label: 'Saved',            Icon: SavedIcon },
  { id: 'broker',     label: 'Hire Broker',      Icon: HireBrokerIcon },
  { id: 'handpicked', label: 'Hand Picked',       Icon: HandpickedIcon },
  { id: 'video',      label: 'Video Search',     Icon: VideoSearchIcon },
  { id: 'post',       label: 'Post\nRequirement', Icon: PostRequirementIcon },
];

interface NavigationBarProps {
  activeNav: string;
  onNavChange: (id: string) => void;
  onLogoPress?: () => void;
  fixed?: boolean;
}

export default function NavigationBar({
  activeNav,
  onNavChange,
  onLogoPress,
  fixed = false,
}: NavigationBarProps) {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`
        ${fixed ? 'fixed top-0' : 'relative'} left-0 right-0 z-50
        flex flex-col w-full overflow-hidden
        bg-gradient-to-b from-[#162638] to-[#0a121d]
        border-t border-white/[0.08] shadow-[0_-8px_30px_rgba(0,0,0,0.4)]
        select-none font-['Outfit',sans-serif]
      `}
    >
      <div className="flex items-stretch w-full relative">
        {NAV_ITEMS.map((item, index) => {
          const isCremp = item.id === 'cremp';
          const isFirst = index === 0;
          if (isCremp) {
            return (
              <React.Fragment key={item.id}>
                <button
                  type="button"
                  onClick={onLogoPress}
                  className="flex flex-1 min-w-0 flex-col items-center justify-center gap-1 py-2 px-1 bg-transparent border-none cursor-pointer outline-none"
                  aria-label="Go to CREMP home"
                >
                  <div className="w-10 h-8 flex items-center justify-center shrink-0">
                    <img 
                      src="./src/components/Home/Logo.png" 
                      alt="CREMP Logo"
                      style={{ width: '150%', height: '150%', objectFit: 'contain' }}
                    />
                  </div>
                  <span className="block w-full text-center leading-tight whitespace-pre-wrap text-[0.45rem] tracking-wider font-bold uppercase text-white/90">
                    {item.label}
                  </span>
                </button>
              </React.Fragment>
            );
          }

          const isActive = activeNav === item.id;
          const Icon = item.Icon!;

          return (
            <React.Fragment key={item.id}>
              {!isFirst && (
                <div className="self-stretch flex items-center py-3 shrink-0">
                  <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-50" />
                </div>
              )}

              <button
                onClick={() => onNavChange(item.id)}
                aria-label={item.label.replace('\n', ' ')}
                aria-current={isActive ? 'page' : undefined}
                className="
                  relative group flex flex-1 min-w-0 flex-col items-center justify-center
                  gap-1 py-2 px-1
                  bg-transparent border-none cursor-pointer outline-none
                  transition-all duration-300 ease-out
                  hover:bg-white/[0.03] active:bg-white/[0.06]
                  [-webkit-tap-highlight-color:transparent]
                  overflow-hidden
                "
              >
                {/* Replaced animation-fadeIn with standard Tailwind transition */}
                <div className={`absolute inset-0 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                <div 
                  className={`
                    absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-b-full
                    bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500
                    transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${isActive ? 'w-[35%] opacity-100 shadow-[0_2px_12px_rgba(251,191,36,0.9)]' : 'w-0 opacity-0'}
                  `}
                />

                <div
                  className={`
                    flex items-center justify-center shrink-0 w-6 h-6
                    transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform
                    ${isActive
                      ? 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                      : 'scale-100 group-hover:-translate-y-0.5 group-hover:scale-105'}
                  `}
                >
                  <Icon active={isActive} size="100%" />
                </div>

                <span
                  className={`
                    block w-full text-center leading-tight whitespace-pre-wrap
                    transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    text-[0.55rem] tracking-wide
                    ${isActive
                      ? 'bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                      : 'text-white/70 font-normal group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'}
                  `}
                >
                  {item.label}
                </span>

                {isActive && (
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)] animate-pulse"
                  />
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}