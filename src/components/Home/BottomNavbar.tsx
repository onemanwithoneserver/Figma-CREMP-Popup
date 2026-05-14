import React, { memo } from 'react';
import cremeLogo from './Logo.png';

interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  active?: boolean;
}

const UserProfileInlineSVG = ({ width = '100%', height = '100%', className = '', active }: SvgIconProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <path d="M5 21v-2a7 7 0 0 1 11.2-5.6" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <circle cx="16.5" cy="16.5" r="2" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
  </svg>
);

const HandPickedInlineSVG = ({ width = '100%', height = '100%', className = '', active }: SvgIconProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5a1.5 1.5 0 0 1 1 .5l1.5 1.5a1.5 1.5 0 0 0 1 .5h2a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 0 .5 1l1.5 1.5a1.5 1.5 0 0 1 0 2l-1.5 1.5a1.5 1.5 0 0 0-.5 1v2a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 0-1 .5l-1.5 1.5a1.5 1.5 0 0 1-2 0l-1.5-1.5a1.5 1.5 0 0 0-1-.5h-2a1.5 1.5 0 0 1-1.5-1.5v-2a1.5 1.5 0 0 0-.5-1l-1.5-1.5a1.5 1.5 0 0 1 0-2l1.5-1.5a1.5 1.5 0 0 0 .5-1v-2A1.5 1.5 0 0 1 5.5 6h2a1.5 1.5 0 0 0 1-.5l1.5-1.5a1.5 1.5 0 0 1 1-.5z" 
      stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <polygon points="12 8 13.1 10.5 16 11 14 13.1 14.5 16 12 14.5 9.5 16 10 13.1 8 11 10.9 10.5" 
      stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
  </svg>
);

const VideoSearchInlineSVG = ({ width = '100%', height = '100%', className = '', active }: SvgIconProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <polygon points="10 9 14 11 10 13" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <circle cx="17" cy="16" r="3" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <line x1="19.5" y1="18.5" x2="22" y2="21" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
  </svg>
);

const DocumentAddInlineSVG = ({ width = '100%', height = '100%', className = '', active }: SvgIconProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10l5 5v4" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <line x1="7" y1="8" x2="13" y2="8" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <line x1="7" y1="12" x2="17" y2="12" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <line x1="7" y1="16" x2="11" y2="16" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <circle cx="18" cy="18" r="4" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <line x1="18" y1="16" x2="18" y2="20" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
    <line x1="16" y1="18" x2="20" y2="18" stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" />
  </svg>
);

interface IconProps {
  active: boolean;
}

const CrempIcon = memo(({ active }: IconProps) => (
  <div className="flex items-center justify-center w-full h-full">
    <img
      src={cremeLogo}
      alt="CREMP"
      draggable={false}
      className={`max-w-[28px] max-h-[28px] object-contain transition-all duration-300 ${
        active 
          ? 'filter-none drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' 
          : 'brightness-0 invert opacity-90'
      }`}
    />
  </div>
));

const SavedIcon = memo(({ active }: IconProps) => (
  <div className="w-[24px] h-[24px]">
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
      stroke={active ? 'url(#goldGradient)' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </div>
));

const HireBrokerIcon = memo(({ active }: IconProps) => <div className="w-[24px] h-[24px]"><UserProfileInlineSVG active={active} /></div>);
const HandpickedIcon = memo(({ active }: IconProps) => <div className="w-[24px] h-[24px]"><HandPickedInlineSVG active={active} /></div>);
const VideoSearchIcon = memo(({ active }: IconProps) => <div className="w-[24px] h-[24px]"><VideoSearchInlineSVG active={active} /></div>);
const PostRequirementIcon = memo(({ active }: IconProps) => <div className="w-[24px] h-[24px]"><DocumentAddInlineSVG active={active} /></div>);

interface NavItem {
  id: string;
  label: string;
  Icon: React.FC<IconProps>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'cremp',      label: 'CREMP',            Icon: CrempIcon },
  { id: 'saved',      label: 'Saved',            Icon: SavedIcon },
  { id: 'broker',     label: 'Hire Broker',      Icon: HireBrokerIcon },
  { id: 'handpicked', label: 'Handpicked',     Icon: HandpickedIcon },
  { id: 'video',      label: 'Video Search',     Icon: VideoSearchIcon },
  { id: 'post',       label: 'Post\nRequi', Icon: PostRequirementIcon },
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
      style={{
        fontFamily: "'Outfit', sans-serif",
        borderRadius: '0',
      }}
      className={`
        ${fixed ? 'fixed top-0' : 'relative'} left-0 right-0 z-50
        flex flex-col w-full overflow-hidden
        bg-[#0B131E]
        border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]
        select-none
      `}
    >
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" /> 
            <stop offset="50%" stopColor="#fbbf24" /> 
            <stop offset="100%" stopColor="#f59e0b" /> 
          </linearGradient>
        </defs>
      </svg>

      <div className="flex items-stretch w-full relative h-[4.5rem]">
        {NAV_ITEMS.map((item, index) => {
          const isCremp = item.id === 'cremp';
          const isActive = activeNav === item.id || isCremp;
          const Icon = item.Icon;

          return (
            <React.Fragment key={item.id}>
              {index > 0 && (
                <div className="flex items-center shrink-0">
                  <div className="w-px h-[28px] bg-white/[0.12]" />
                </div>
              )}

              <button
                onClick={() => {
                  onNavChange(item.id);
                  if (isCremp) onLogoPress?.();
                }}
                aria-label={item.label.replace('\n', ' ')}
                aria-current={activeNav === item.id ? 'page' : undefined}
                className="
                  relative group flex flex-1 min-w-0 flex-col items-center justify-center
                  px-0.5 bg-transparent border-none cursor-pointer outline-none
                  transition-all duration-300 ease-out
                  hover:bg-white/[0.02] active:bg-white/[0.05]
                  [-webkit-tap-highlight-color:transparent]
                "
              >
                {isActive && !isCremp && (
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
                )}
                <div 
                  className={`
                    absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-b-full
                    bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500
                    transition-all duration-300 ease-out
                    ${isActive && !isCremp ? 'w-[45%] opacity-100 shadow-[0_2px_8px_rgba(251,191,36,0.8)]' : 'w-0 opacity-0'}
                  `}
                />
                <div className="flex flex-col items-center justify-start mt-1">
                  
                  <div className={`
                    flex items-center justify-center h-[28px] w-full
                    transition-all duration-300 ease-out will-change-transform
                    ${isActive
                      ? 'scale-[1.05] drop-shadow-[0_0_6px_rgba(251,191,36,0.25)]'
                      : 'scale-100 group-hover:-translate-y-0.5 group-hover:scale-105'}
                  `}>
                    <Icon active={isActive} />
                  </div>
                  <span
                    className={`
                      block w-full text-center leading-[1.2] whitespace-pre-wrap mt-1.5
                      transition-all duration-300 ease-out
                      ${isActive && !isCremp
                        ? 'bg-gradient-to-r from-yellow-200 to-amber-500 bg-clip-text text-transparent font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'
                        : isCremp
                          ? 'text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
                          : 'text-white/85 font-normal group-hover:text-white'}
                      ${isCremp
                        ? 'text-[8px] tracking-[0.03rem] uppercase'
                        : 'text-[8px] tracking-tight'}
                    `}
                  >
                    {item.label}
                  </span>

                </div>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}