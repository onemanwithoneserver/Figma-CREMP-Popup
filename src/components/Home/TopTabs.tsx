import React from 'react';
import type { MainTab } from './types';
import { topTabs } from './data';

const BuildingIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

const CalendarIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 13.5h.008v.008H8.25v-.008zm4.5 0h.008v.008H12.75v-.008zm-4.5 3h.008v.008H8.25v-.008zm4.5 0h.008v.008H12.75v-.008z" />
  </svg>
);

const BriefcaseIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.89 1.982-1.982 1.982H5.732c-1.092 0-1.982-.888-1.982-1.982v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

const tabIcons: Record<string, React.FC<{ color: string }>> = {
  buy: BuildingIcon,
  lease: CalendarIcon,
  business: BriefcaseIcon,
};

interface TopTabsProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
}

export default function TopTabs({ activeTab, onTabChange }: TopTabsProps) {
  return (
    <nav 
      className="w-full px-2 pb-1 bg-transparent"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div 
        className="flex items-stretch w-full rounded-[10px] border border-[#b3bbc8] overflow-hidden"
        role="tablist"
        aria-label="Main property categories"
      >
        {topTabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const Icon = tabIcons[tab.id];
          
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id as MainTab)}
              className={`
                flex items-center justify-center gap-1 h-[40px] relative
                transition-all duration-200 hover:bg-white/[0.02] active:bg-white/5
                focus-visible:outline-none
                ${index < topTabs.length - 1 ? 'border-r border-[#b3bbc8]' : ''}
                ${tab.id === 'business' ? 'flex-[1.45]' : 'flex-1'}
              `}
            >
              <div className="shrink-0 flex items-center justify-center">
                <Icon color={isActive ? '#FBBF24' : '#FFFFFF'} />
              </div>

              <span
                className={`font-medium text-left transition-colors ${
                  isActive ? 'text-[#FBBF24]' : 'text-white'
                } ${tab.id === 'business' ? 'text-[10px] leading-[1.1] tracking-tight' : 'text-[12px] tracking-tight'}`}
              >
                {tab.id === 'business' ? (
                  <>Business<br/>Opportunities</>
                ) : (
                  tab.label
                )}
              </span>

              {isActive && (
                <div 
                  className="absolute bottom-0 left-3 right-3 h-[2px] rounded-t-full bg-[#FBBF24]" 
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}