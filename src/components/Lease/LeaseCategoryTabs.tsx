import type { LeaseCategory } from './types';

const FullSpaceIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 ${className || ''}`}
  >
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M12 7h2v2h-2z" />
    <path d="M12 11h2v2h-2z" />
    <path d="M12 15h2v2h-2z" />
    <path d="M7 7h3v2H7z" />
    <path d="M7 11h3v2H7z" />
    <path d="M7 15h3v2H7z" />
  </svg>
);

const SubLeaseIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 ${className || ''}`}
  >
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M10 3v18" />
    <path d="M4 10h6" />
    <path d="M4 15h6" />
    <path d="M13 6h4" />
    <path d="M13 9h4" />
    <path d="M13 12h4" />
    <path d="M13 15h4" />
  </svg>
);

const CoWorkingIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 ${className || ''}`}
  >
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="16" cy="8" r="2.5" />
    <path d="M3 17v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2" />
    <path d="M11 17v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2" />
  </svg>
);

const TABS: Array<{
  id: LeaseCategory;
  label: string;
  colorClass: string;
  borderClass: string;
  ringClass: string;
  shadowClass: string;
  Icon: React.FC<{ className?: string }>;
}> = [
    {
      id: 'full-space',
      label: 'Full Space',
      colorClass: 'text-[#8B5CF6]',
      borderClass: 'border-[#8B5CF6]',
      ringClass: 'ring-[#8B5CF6]/20',
      shadowClass: 'shadow-[#8B5CF6]/20',
      Icon: FullSpaceIcon,
    },
    {
      id: 'sub-lease',
      label: 'Sub Lease',
      colorClass: 'text-[#10B981]',
      borderClass: 'border-[#10B981]',
      ringClass: 'ring-[#10B981]/20',
      shadowClass: 'shadow-[#10B981]/20',
      Icon: SubLeaseIcon,
    },
    {
      id: 'co-working',
      label: 'Co-Working',
      colorClass: 'text-[#F97316]',
      borderClass: 'border-[#F97316]',
      ringClass: 'ring-[#F97316]/20',
      shadowClass: 'shadow-[#F97316]/20',
      Icon: CoWorkingIcon,
    },
  ];

interface LeaseCategoryTabsProps {
  activeCategory: LeaseCategory;
  onCategoryChange: (cat: LeaseCategory) => void;
}

export default function LeaseCategoryTabs({
  activeCategory,
  onCategoryChange,
}: LeaseCategoryTabsProps) {
  return (
    <div className="w-full px-1 py-1 bg-transparent font-['Outfit',_sans-serif]">
      <div className="flex items-center justify-between gap-1 w-full" aria-label="Lease property categories">
        {TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          const Icon = tab.Icon;

          return (
            <button
              key={tab.id}
              onClick={() => onCategoryChange(tab.id)}
              aria-label={tab.label}
              className={`flex flex-row items-center justify-center flex-1 gap-1 px-1 py-1 rounded-md bg-white transition-all duration-300 ease-out active:scale-95 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group focus-visible:outline-none ${isActive
                ? `border ${tab.borderClass} shadow-md ${tab.shadowClass} scale-[1.02]`
                : 'border border-transparent shadow-[0_2px_6px_rgba(0,0,0,0.05)]'
                }`}
            >
              <div className="shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Icon className={tab.colorClass} />
              </div>
              <span
                className={`font-medium whitespace-nowrap text-[10px] transition-colors duration-300 ${isActive ? tab.colorClass : 'text-[#334155] group-hover:text-[#0f172a]'
                  }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}