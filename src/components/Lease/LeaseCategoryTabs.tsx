import type { LeaseCategory } from './types';

const FullSpaceIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
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
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
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
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
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
    colorClass: 'text-violet-600',
    borderClass: 'border-violet-600',
    ringClass: 'ring-violet-600/20',
    shadowClass: 'shadow-violet-600/10',
    Icon: FullSpaceIcon,
  },
  {
    id: 'sub-lease',
    label: 'Sub Lease',
    colorClass: 'text-emerald-600',
    borderClass: 'border-emerald-600',
    ringClass: 'ring-emerald-600/20',
    shadowClass: 'shadow-emerald-600/10',
    Icon: SubLeaseIcon,
  },
  {
    id: 'co-working',
    label: 'Co-Working',
    colorClass: 'text-orange-500',
    borderClass: 'border-orange-500',
    ringClass: 'ring-orange-500/20',
    shadowClass: 'shadow-orange-500/10',
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
    <div className="w-full px-1.5 pt-1.5 pb-1 bg-transparent font-['Outfit',_sans-serif] [container-type:inline-size]">
      <div className="grid grid-cols-3 gap-1.5 w-full" aria-label="Lease property categories">
        {TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          const Icon = tab.Icon;

          return (
            <button
              key={tab.id}
              onClick={() => onCategoryChange(tab.id)}
              aria-label={tab.label}
              className={`flex flex-row items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-white border transition-all duration-200 active:scale-95 focus-visible:outline-none ${
                isActive
                  ? `${tab.borderClass} ring-1 ${tab.ringClass} shadow-md ${tab.shadowClass}`
                  : 'border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
              }`}
            >
              <div className="shrink-0 flex items-center justify-center">
                <Icon className={isActive ? tab.colorClass : 'text-slate-400'} />
              </div>
              <span
                className={`font-semibold whitespace-nowrap leading-tight tracking-tight transition-colors text-[clamp(10px,3.5cqi,14px)] ${
                  isActive ? tab.colorClass : 'text-slate-600'
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