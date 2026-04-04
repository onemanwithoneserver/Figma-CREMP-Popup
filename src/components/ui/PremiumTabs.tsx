
export type PremiumTabOption<T> = {
  label: string;
  value: T;
};

interface PremiumTabsProps<T> {
  tabs: PremiumTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string; // Added so parent wrappers can pass styles
}

const PremiumTabs = <T extends string>({ tabs, value, onChange, className = '' }: PremiumTabsProps<T>) => {
  return (
    <div className={`flex items-end w-full space-x-[-20px] sm:space-x-[-28px] px-1 pt-1 overflow-hidden shadow-none drop-shadow-none ${className}`}>
      {tabs.map((tab, index) => {
        const isActive = tab.value === value;
        const activeGradId = `grad-active-${tab.value}`;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            style={{ zIndex: isActive ? 50 : 40 - index }}
            className="relative h-[32px] sm:h-[36px] flex-1 min-w-[80px] outline-none group transition-transform duration-200  bg-transparent"
          >
            <svg 
              className={`absolute inset-0 block size-full ${isActive ? '' : ''}`} 
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
              className={`relative z-10 flex items-center justify-center w-full h-full text-[12px] sm:text-[14px] tracking-wide ${
                isActive 
                  ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-[#C69C44]' 
                  : 'text-[#626168] font-medium underline underline-offset-8 decoration-1 decoration-[#e0e0e0]'
              }`}
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