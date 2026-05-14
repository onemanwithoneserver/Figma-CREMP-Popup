import type { LeaseCategory } from './types';

// ── Icons ──────────────────────────────────────────────────────────────────

const FullSpaceIcon = ({ color }: { color: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
    <path d="M3 9h6" />
    <path d="M3 15h6" />
    <path d="M12 8h6" />
    <path d="M12 12h6" />
    <path d="M12 16h6" />
  </svg>
);

const SubLeaseIcon = ({ color }: { color: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="6" width="10" height="14" rx="1.5" />
    <rect x="12" y="2" width="10" height="14" rx="1.5" />
    <path d="M5 10h4" />
    <path d="M5 13h4" />
    <path d="M15 6h4" />
    <path d="M15 9h4" />
    <path d="M8 20v-4" />
    <path d="M16 16v4" />
  </svg>
);

const CoWorkingIcon = ({ color }: { color: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="7" r="2.5" />
    <circle cx="15" cy="7" r="2.5" />
    <path d="M3 19v-1.5C3 15.46 5.69 14 9 14" />
    <path d="M21 19v-1.5C21 15.46 18.31 14 15 14s-6 1.46-6 3.5V19" />
  </svg>
);

// ── Config ────────────────────────────────────────────────────────────────

const TABS: Array<{
  id: LeaseCategory;
  label: string;
  color: string;
  Icon: React.FC<{ color: string }>;
}> = [
  { id: 'full-space', label: 'Full Space', color: '#7C3AED', Icon: FullSpaceIcon },
  { id: 'sub-lease', label: 'Sub Lease', color: '#059669', Icon: SubLeaseIcon },
  { id: 'co-working', label: 'Co-Working', color: '#F97316', Icon: CoWorkingIcon },
];

// ── Component ─────────────────────────────────────────────────────────────

interface LeaseCategoryTabsProps {
  activeCategory: LeaseCategory;
  onCategoryChange: (cat: LeaseCategory) => void;
}

export default function LeaseCategoryTabs({
  activeCategory,
  onCategoryChange,
}: LeaseCategoryTabsProps) {
  return (
    <div
      className="w-full px-1.5 pt-1.5 pb-1 bg-transparent"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="grid grid-cols-3 gap-1 w-full" aria-label="Lease property categories">
        {TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          const Icon = tab.Icon;

          return (
            <button
              key={tab.id}
              onClick={() => onCategoryChange(tab.id)}
              aria-label={tab.label}
              className="flex flex-row items-center justify-center gap-1.5 px-1 py-2 rounded-[8px] bg-white border transition-all duration-200 active:scale-95 focus-visible:outline-none"
              style={{
                borderColor: isActive ? tab.color : '#E2E8F0',
                boxShadow: isActive
                  ? `0 0 0 1px ${tab.color}22, 0 2px 8px ${tab.color}14`
                  : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div className="shrink-0">
                <Icon color={isActive ? tab.color : '#94A3B8'} />
              </div>
              <span
                className="text-[10px] font-semibold leading-tight tracking-tight transition-colors"
                style={{ color: isActive ? tab.color : '#475569' }}
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
