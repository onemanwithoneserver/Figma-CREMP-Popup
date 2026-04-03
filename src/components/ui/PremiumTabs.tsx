
export type PremiumTabOption<T> = {
  label: string;
  value: T;
};

interface PremiumTabsProps<T> {
  tabs: PremiumTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const PremiumTabs = <T extends string>({ tabs, value, onChange }: PremiumTabsProps<T>) => {
  return (
    <div className="flex items-end w-full space-x-[-20px] sm:space-x-[-28px] px-2 pt-2 overflow-hidden">
      {tabs.map((tab, index) => {
        const isActive = tab.value === value;
        const activeGradId = `grad-active-${tab.value}`;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            style={{ zIndex: isActive ? 50 : 40 - index }}
            // 1. Decreased height (h-[32px] sm:h-[36px])
            // 2. Removed max-w to let flex-1 stretch the tabs across the full line
            className="relative h-[32px] sm:h-[36px] flex-1 min-w-[80px] outline-none group transition-transform duration-200"
          >
            <svg 
              className={`absolute inset-0 block size-full ${isActive ? '' : 'drop-shadow-[-4px_0px_8px_rgba(0,0,0,0.12)]'}`} 
              fill="none" 
              preserveAspectRatio="none" 
              viewBox="0 0 200 40"
            >
              <defs>
                <linearGradient id={activeGradId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1C2A44" />
                  <stop offset="100%" stopColor="#154eb1" />
                </linearGradient>
              </defs>
              <path 
                d="M 0 40 L 16 8 C 20 2 26 0 32 0 L 168 0 C 174 0 180 2 184 8 L 200 40 Z" 
                fill={isActive ? `url(#${activeGradId})` : '#FFFFFF'} 
              />
            </svg>
            
            <span 
              // Slightly reduced text size to fit the shorter height gracefully
              className={`relative z-10 flex items-center justify-center w-full h-full text-[12px] sm:text-[14px] tracking-wide ${isActive ? 'text-white font-semibold' : 'text-[#626168] font-medium'}`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PremiumTabs;