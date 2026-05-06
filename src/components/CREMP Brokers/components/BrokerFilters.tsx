/**
 * BrokerFilters.tsx
 * Desktop: right-side slide-in drawer (3/8 viewport)
 * Mobile:  bottom-sheet modal with drag-to-close
 * WCAG AA compliant — all interactive elements have focus-visible rings,
 * ARIA roles, labels, and aria-pressed / aria-expanded states.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ActiveFilters, BrokerSortOption } from '../types/broker.types';
import { sortOptions } from '../data/filtersData';

// ─── Inline filter data (panel-specific) ──────────────────────────────────

const locationOptions = [
  { id: 'Hyderabad', label: 'HITEC City' },
  { id: 'Gachibowli', label: 'Gachibowli' },
  { id: 'Mumbai', label: 'BKC' },
  { id: 'Bengaluru', label: 'Whitefield' },
  { id: 'Delhi', label: 'Connaught Place' },
  { id: 'Pune', label: 'Hinjewadi' },
  { id: 'Chennai', label: 'OMR' },
  { id: 'Koramangala', label: 'Koramangala' },
];

const propertyExpertise = [
  { id: 'Office',     label: 'Office',     icon: 'office'     },
  { id: 'Retail',     label: 'Retail',     icon: 'retail'     },
  { id: 'Industrial', label: 'Industrial', icon: 'industrial' },
  { id: 'Warehouse',  label: 'Warehouse',  icon: 'warehouse'  },
  { id: 'Land',       label: 'Land',       icon: 'land'       },
  { id: 'Investment', label: 'Investment', icon: 'investment' },
  { id: 'Co-working', label: 'Co-working', icon: 'coworking'  },
  { id: 'Mixed Use',  label: 'Mixed Use',  icon: 'mixed'      },
];

const dealTypeOptions = [
  { id: 'Sale',        label: 'Sale'        },
  { id: 'Leasing',     label: 'Leasing'     },
  { id: 'Investment',  label: 'Investment'  },
  { id: 'Pre-leased',  label: 'Pre-leased'  },
];

const dealSizeOptions = [
  { id: 'under-50l',  label: 'Under ₹50L'   },
  { id: '50l-2cr',    label: '₹50L – ₹2Cr'  },
  { id: '2cr-10cr',   label: '₹2Cr – ₹10Cr' },
  { id: '10cr-50cr',  label: '₹10Cr – ₹50Cr'},
  { id: '50cr+',      label: '₹50Cr+'        },
];

const experienceOptions = [
  { id: '0-3',  label: '0–3 Years'  },
  { id: '3-5',  label: '3–5 Years'  },
  { id: '5-10', label: '5–10 Years' },
  { id: '10+',  label: '10+ Years'  },
];

const QUICK_LOC_COUNT = 4;

// ─── Props ─────────────────────────────────────────────────────────────────

export interface BrokerFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  isDesktop: boolean;
  filters: ActiveFilters;
  sortOption: BrokerSortOption;
  activeFilterCount: number;
  onToggleSpecialty: (s: string) => void;
  onToggleLocation:  (l: string) => void;
  onToggleDealType:  (v: string) => void;
  onToggleDealSize:  (v: string) => void;
  onSetExperience:   (e: string | null) => void;
  onSetSort:         (s: BrokerSortOption) => void;
  onReset:           () => void;
}

// ─── Animation hook ────────────────────────────────────────────────────────

function useAnimatedMount(isOpen: boolean, durationMs = 320) {
  const [mounted,  setMounted]  = useState(isOpen);
  const [visible,  setVisible]  = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Double rAF ensures element is painted before CSS transition fires
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), durationMs);
      return () => clearTimeout(t);
    }
  }, [isOpen, durationMs]);

  return { mounted, visible };
}

// ─── Expertise icon sprites ────────────────────────────────────────────────

function ExpertiseIcon({ type, active }: { type: string; active: boolean }) {
  const s = { className: 'w-5 h-5', fill: 'none', strokeWidth: '1.5', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, stroke: active ? '#d4af37' : '#9ca3af' };
  const map: Record<string, React.ReactNode> = {
    office: (
      <svg viewBox="0 0 24 24" {...s}>
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 8h.01M12 8h.01M15 8h.01M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>
      </svg>
    ),
    retail: (
      <svg viewBox="0 0 24 24" {...s}>
        <path d="M4 7h16L18 3H6L4 7zM4 7v13a1 1 0 001 1h14a1 1 0 001-1V7"/>
        <path d="M9 21v-8h6v8"/>
      </svg>
    ),
    industrial: (
      <svg viewBox="0 0 24 24" {...s}>
        <path d="M2 20V8l6-4v4l6-4v4l6-4v16H2z"/>
        <rect x="7" y="14" width="3" height="6"/><rect x="14" y="14" width="3" height="6"/>
      </svg>
    ),
    warehouse: (
      <svg viewBox="0 0 24 24" {...s}>
        <path d="M2 9l10-7 10 7v11a1 1 0 01-1 1H3a1 1 0 01-1-1V9z"/>
        <path d="M8 21V12h8v9"/>
      </svg>
    ),
    land: (
      <svg viewBox="0 0 24 24" {...s}>
        <path d="M3 20h18M3 20l5-9 4 5 4-7 4 11"/>
        <circle cx="7" cy="7" r="2"/>
      </svg>
    ),
    investment: (
      <svg viewBox="0 0 24 24" {...s}>
        <path d="M3 17l5-5 4 4 8-9"/><path d="M17 7h4v4"/>
      </svg>
    ),
    coworking: (
      <svg viewBox="0 0 24 24" {...s}>
        <circle cx="8" cy="7" r="3"/><circle cx="16" cy="7" r="3"/>
        <path d="M2 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M14 11a4 4 0 014 4v2"/>
      </svg>
    ),
    mixed: (
      <svg viewBox="0 0 24 24" {...s}>
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  };
  return <>{map[type] ?? null}</>;
}

// ─── Section icons ─────────────────────────────────────────────────────────

const sectionIcons: Record<string, React.ReactNode> = {
  location: (
    <svg viewBox="0 0 20 20" className="w-[17px] h-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2a6 6 0 016 6c0 4.5-6 10-6 10S4 12.5 4 8a6 6 0 016-6z"/>
      <circle cx="10" cy="8" r="2"/>
    </svg>
  ),
  expertise: (
    <svg viewBox="0 0 20 20" className="w-[17px] h-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="11" rx="1"/>
      <path d="M6 7V5a4 4 0 018 0v2"/>
    </svg>
  ),
  dealType: (
    <svg viewBox="0 0 20 20" className="w-[17px] h-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h14M7 10h10M3 14h6"/>
      <path d="M17 14l2 2-2 2"/>
    </svg>
  ),
  dealSize: (
    <svg viewBox="0 0 20 20" className="w-[17px] h-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8"/>
      <path d="M10 7v3.5l2.5 1.5"/>
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 20 20" className="w-[17px] h-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="7" r="4"/>
      <path d="M3 18c0-3.3 3.1-6 7-6s7 2.7 7 6"/>
    </svg>
  ),
  sort: (
    <svg viewBox="0 0 20 20" className="w-[17px] h-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 5h14M5 10h10M7 15h6"/>
    </svg>
  ),
};

// ─── Accordion ─────────────────────────────────────────────────────────────

function AccordionSection({
  id, label, isExpanded, onToggle, children,
}: {
  id: string; label: string; isExpanded: boolean;
  onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#f0f1f3]" role="region" aria-labelledby={`fs-${id}`}>
      <button
        id={`fs-${id}`}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`fc-${id}`}
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-[14px] text-left
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4af37]/30
          transition-all
          ${isExpanded ? 'bg-gradient-to-r from-[#d4af37]/[0.04] to-transparent' : 'hover:bg-[#fafafa]'}`}
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        <span className="flex items-center gap-2.5">
          <span className={`transition-colors ${isExpanded ? 'text-[#d4af37]' : 'text-[#9ca3af]'}`}>
            {sectionIcons[id]}
          </span>
          <span className="text-[13px] font-semibold text-[#0a1128]">{label}</span>
        </span>
        <span
          aria-hidden
          className={`transition-all duration-200 ease-in-out ${isExpanded ? 'rotate-180 text-[#d4af37]' : 'rotate-0 text-[#9ca3af]'}`}
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </span>
      </button>
      <div
        id={`fc-${id}`}
        role="group"
        aria-label={`${label} filter options`}
        className="overflow-hidden transition-all duration-200 ease-in-out"
        style={{ maxHeight: isExpanded ? '600px' : '0px', opacity: isExpanded ? 1 : 0 }}
      >
        <div className="px-5 pb-5 pt-0.5">{children}</div>
      </div>
    </div>
  );
}

// ─── Filter Chip ───────────────────────────────────────────────────────────

function FilterChip({
  label, active, onClick, ariaLabel,
}: {
  label: string; active: boolean; onClick: () => void; ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center px-3.5 py-[7px] rounded-[8px]
        text-[13px] font-medium border min-h-[36px] min-w-[44px]
        transition-all duration-150 cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#d4af37]/40
        ${active
          ? 'bg-gradient-to-br from-[#0a1128] to-[#1a3463] text-white border-[#0a1128] shadow-sm'
          : 'bg-white text-[#637089] border-[#e5e7eb] hover:border-[#d4af37]/50 hover:text-[#0a1128] hover:bg-[#d4af37]/[0.04]'
        }
      `}
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {label}
    </button>
  );
}

// ─── Shared panel content ──────────────────────────────────────────────────

function FilterPanelContent({
  filters, sortOption, activeFilterCount,
  isDesktop,
  onToggleSpecialty, onToggleLocation,
  onToggleDealType, onToggleDealSize,
  onSetExperience, onSetSort,
  onClose, onReset,
}: Omit<BrokerFiltersProps, 'isOpen'> & { onClose: () => void }) {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(['location', 'expertise', 'dealType', 'dealSize', 'experience', 'sort'])
  );
  const [locSearch, setLocSearch] = useState('');
  const [showAllLoc, setShowAllLoc] = useState(false);

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const filteredLocs = locSearch.trim()
    ? locationOptions.filter((o) => o.label.toLowerCase().includes(locSearch.toLowerCase()))
    : locationOptions;
  const visibleLocs = showAllLoc ? filteredLocs : filteredLocs.slice(0, QUICK_LOC_COUNT);

  return (
    <div className="flex flex-col h-full">
      {/* ── Scrollable sections ── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,175,55,0.2) transparent' }}
      >

        {/* Location */}
        <AccordionSection id="location" label="Location" isExpanded={expanded.has('location')} onToggle={() => toggle('location')}>
          <div className="relative mb-3">
            <span aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="7" cy="7" r="4"/><path d="M11 11l3 3"/>
              </svg>
            </span>
            <input
              type="search"
              aria-label="Search locations"
              placeholder="Search location"
              value={locSearch}
              onChange={(e) => setLocSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2.5 text-[13px] rounded-[8px] border border-[#e5e7eb]
                bg-[#f9fafb] text-[#0a1128] placeholder-[#9ca3af]
                focus:outline-none focus:ring-2 focus:ring-[#d4af37]/25 focus:border-[#d4af37]/50
                transition-all"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {visibleLocs.map((opt) => (
              <FilterChip
                key={opt.id}
                label={opt.label}
                active={filters.locations.includes(opt.id)}
                onClick={() => onToggleLocation(opt.id)}
                ariaLabel={`Filter by ${opt.label}`}
              />
            ))}
          </div>
          {!locSearch && filteredLocs.length > QUICK_LOC_COUNT && (
            <button
              type="button"
              onClick={() => setShowAllLoc((v) => !v)}
              className="mt-3 text-[12px] font-semibold text-[#d4af37] hover:text-[#e5c158]
                transition-colors focus-visible:outline-none focus-visible:underline"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {showAllLoc ? '– Less' : `+ ${filteredLocs.length - QUICK_LOC_COUNT} More`}
            </button>
          )}
        </AccordionSection>

        {/* Property Expertise */}
        <AccordionSection id="expertise" label="Property Expertise" isExpanded={expanded.has('expertise')} onToggle={() => toggle('expertise')}>
          <div className="grid grid-cols-4 gap-2" role="group" aria-label="Property Expertise options">
            {propertyExpertise.map((opt) => {
              const active = filters.specialties.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="checkbox"
                  aria-checked={active}
                  aria-label={`${opt.label} expertise`}
                  onClick={() => onToggleSpecialty(opt.id)}
                  className={`
                    flex flex-col items-center gap-1.5 py-3 px-1 rounded-[8px] border
                    transition-all duration-150 text-center cursor-pointer min-h-[72px]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1128]/35 focus-visible:ring-offset-1
                    ${active
                      ? 'bg-[#d4af37]/10 border-[#d4af37]/60 text-[#0a1128] shadow-sm'
                      : 'bg-white border-[#e5e7eb] text-[#637089] hover:border-[#d4af37]/40 hover:bg-[#d4af37]/[0.04] hover:text-[#0a1128]'
                    }
                  `}
                >
                  <ExpertiseIcon type={opt.icon} active={active} />
                  <span
                    className="text-[10px] font-semibold leading-tight"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </AccordionSection>

        {/* Deal Type */}
        <AccordionSection id="dealType" label="Deal Type" isExpanded={expanded.has('dealType')} onToggle={() => toggle('dealType')}>
          <div className="flex flex-wrap gap-2">
            {dealTypeOptions.map((opt) => (
              <FilterChip
                key={opt.id}
                label={opt.label}
                active={filters.dealTypes.includes(opt.id)}
                onClick={() => onToggleDealType(opt.id)}
                ariaLabel={`Deal type: ${opt.label}`}
              />
            ))}
          </div>
        </AccordionSection>

        {/* Deal Size Range */}
        <AccordionSection id="dealSize" label="Deal Size Range" isExpanded={expanded.has('dealSize')} onToggle={() => toggle('dealSize')}>
          <div className="flex flex-wrap gap-2">
            {dealSizeOptions.map((opt) => (
              <FilterChip
                key={opt.id}
                label={opt.label}
                active={filters.dealSizes.includes(opt.id)}
                onClick={() => onToggleDealSize(opt.id)}
                ariaLabel={`Deal size: ${opt.label}`}
              />
            ))}
          </div>
        </AccordionSection>

        {/* Experience */}
        <AccordionSection id="experience" label="Experience" isExpanded={expanded.has('experience')} onToggle={() => toggle('experience')}>
          <div className="flex flex-wrap gap-2">
            {experienceOptions.map((opt) => {
              const active = filters.experience === opt.id;
              return (
                <FilterChip
                  key={opt.id}
                  label={opt.label}
                  active={active}
                  onClick={() => onSetExperience(active ? null : opt.id)}
                  ariaLabel={`Experience: ${opt.label}`}
                />
              );
            })}
          </div>
        </AccordionSection>

        {/* Sort By */}
        <AccordionSection id="sort" label="Sort By" isExpanded={expanded.has('sort')} onToggle={() => toggle('sort')}>
          <div className="flex flex-col gap-0.5" role="radiogroup" aria-label="Sort brokers by">
            {sortOptions.map((opt) => {
              const active = sortOption === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onSetSort(opt.id as BrokerSortOption)}
                  className={`
                    flex items-center gap-3 py-2.5 px-2 w-full text-left rounded-[6px] min-h-[44px]
                    transition-all hover:bg-[#fafafa]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/30 focus-visible:ring-inset
                    ${active ? 'bg-gradient-to-r from-[#d4af37]/[0.06] to-transparent' : ''}
                  `}
                >
                  <span
                    aria-hidden
                    className={`w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                      ${active ? 'border-[#d4af37]' : 'border-[#d1d5db]'}`}
                  >
                    {active && <span className="w-[9px] h-[9px] rounded-full bg-[#d4af37]" />}
                  </span>
                  <span
                    className={`text-[13px] ${active ? 'font-semibold text-[#0a1128]' : 'font-medium text-[#6b7280]'}`}
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </AccordionSection>

      </div>

      {/* ── Footer ── */}
      <div className="shrink-0 px-5 pt-4 pb-5 bg-gradient-to-b from-white to-[#fafafa] border-t border-black/[0.04] flex flex-row items-center gap-2.5">
        {isDesktop && (
          <button
            type="button"
            onClick={() => { onReset(); onClose(); }}
            className="
              flex-1 py-3.5 rounded-[8px] border border-[#e5e7eb] bg-white
              text-[14px] font-semibold text-[#637089]
              hover:border-[#d4af37]/50 hover:text-[#d4af37] active:scale-[0.99] transition-all
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/25 focus-visible:ring-offset-1
            "
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Reset
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="
            flex-[2] py-3.5 rounded-[8px] bg-gradient-to-br from-[#0a1128] to-[#1a3463]
            text-white text-[14px] font-semibold shadow-sm
            hover:from-[#111d3a] hover:to-[#1f3f7a] active:scale-[0.99] transition-all
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50 focus-visible:ring-offset-2
          "
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Apply{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
        </button>
      </div>
    </div>
  );
}

// ─── Desktop Drawer ────────────────────────────────────────────────────────

function DesktopDrawer(props: BrokerFiltersProps) {
  const { isOpen, onClose, activeFilterCount, onReset } = props;
  const { mounted, visible } = useAnimatedMount(isOpen, 300);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        aria-hidden="true"
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter Options"
        className="fixed right-0 top-0 h-full z-[101] bg-white shadow-2xl flex flex-col"
        style={{
          width: 'clamp(340px, 37.5vw, 480px)',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {/* Drawer header — PostReg dark gradient */}
        <div className="relative shrink-0 bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] border-b border-white/[0.05] overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4af37]/10 blur-[50px] -translate-y-1/3 translate-x-1/4 rounded-full pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-2.5">
              <span className="text-[#d4af37]">
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 5h14M5 10h10M7 15h6"/>
                </svg>
              </span>
              <h2
                className="text-[16px] font-bold text-white"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 text-[11px] font-semibold text-[#d4af37] bg-[#d4af37]/15 rounded-full px-2 py-0.5">
                    {activeFilterCount}
                  </span>
                )}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={onReset}
                  className="text-[12px] font-semibold text-[#d4af37] hover:text-[#e5c158]
                    transition-colors focus-visible:outline-none focus-visible:underline"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Clear All
                </button>
              )}
              <button
                type="button"
                aria-label="Close filter panel"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-[8px]
                  bg-white/10 text-white/80 border border-white/10
                  hover:bg-white/20 hover:text-white
                  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <FilterPanelContent {...props} onClose={onClose} />
        </div>
      </div>
    </>
  );
}

// ─── Mobile Bottom Sheet ───────────────────────────────────────────────────

function MobileSheet(props: BrokerFiltersProps) {
  const { isOpen, onClose, activeFilterCount, onReset } = props;
  const { mounted, visible } = useAnimatedMount(isOpen, 340);

  const sheetRef   = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const dragY       = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    dragY.current = 0;
    if (sheetRef.current) sheetRef.current.style.transition = 'none';
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    dragY.current = Math.max(0, delta);
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${dragY.current}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (sheetRef.current) {
      sheetRef.current.style.transition = '';
    }
    if (dragY.current > 90) {
      onClose();
    } else if (sheetRef.current) {
      sheetRef.current.style.transform = 'translateY(0)';
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        aria-hidden="true"
        className="absolute inset-0 z-50 bg-black/50 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter Options"
        className="absolute bottom-0 left-0 right-0 z-50 bg-white flex flex-col"
        style={{
          height: '88%',
          borderRadius: '20px 20px 0 0',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 330ms cubic-bezier(0.32, 0.72, 0, 1)',
          boxShadow: '0 -6px 40px rgba(0,0,0,0.14)',
          willChange: 'transform',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {/* Drag handle */}
        <div
          className="flex justify-center py-3 shrink-0 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-hidden="true"
        >
          <div className="w-10 h-[3px] rounded-full bg-[#d1d5db]" />
        </div>

        {/* Sheet header — drag handle only */}
        {activeFilterCount > 0 && (
          <div className="shrink-0 flex justify-end px-5 pt-2 pb-1">
            <button
              type="button"
              onClick={onReset}
              className="text-[12px] font-semibold text-[#d4af37] hover:text-[#e5c158]
                transition-colors focus-visible:outline-none focus-visible:underline"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <FilterPanelContent {...props} onClose={onClose} />
        </div>
      </div>
    </>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────

export default function BrokerFilters(props: BrokerFiltersProps) {
  if (props.isDesktop) return <DesktopDrawer {...props} />;
  return <MobileSheet {...props} />;
}

// ─── Active chips bar (used inline in CREMPBrokersPage) ───────────────────

export function ActiveFilterChips({
  filters,
  onToggleSpecialty,
  onToggleLocation,
  onToggleDealType,
  onToggleDealSize,
  onClearAll,
}: {
  filters: ActiveFilters;
  onToggleSpecialty: (s: string) => void;
  onToggleLocation:  (l: string) => void;
  onToggleDealType:  (v: string) => void;
  onToggleDealSize:  (v: string) => void;
  onClearAll: () => void;
}) {
  const all = [
    ...filters.specialties.map((v) => ({ label: v, remove: () => onToggleSpecialty(v) })),
    ...filters.locations.map((v) => {
      const loc = locationOptions.find((o) => o.id === v);
      return { label: loc?.label ?? v, remove: () => onToggleLocation(v) };
    }),
    ...filters.dealTypes.map((v) => ({ label: v, remove: () => onToggleDealType(v) })),
    ...filters.dealSizes.map((v) => {
      const sz = dealSizeOptions.find((o) => o.id === v);
      return { label: sz?.label ?? v, remove: () => onToggleDealSize(v) };
    }),
  ];
  if (all.length === 0) return null;
  return (
    <div
      className="flex items-center gap-2 flex-wrap px-6 py-2.5 border-b border-black/[0.04] bg-[#fafafb]"
      role="list"
      aria-label="Active filters"
    >
      {all.map((chip, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Remove filter: ${chip.label}`}
          onClick={chip.remove}
          className="flex items-center gap-1 text-[11px] font-semibold
            bg-[#d4af37]/15 text-[#b8903c] border border-[#d4af37]/30
            rounded-full px-3 py-[5px] whitespace-nowrap
            hover:bg-[#d4af37]/25 transition-colors
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {chip.label}
          <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8"/>
          </svg>
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        aria-label="Clear all filters"
        className="text-[11px] font-semibold text-[#ef4444] hover:text-[#dc2626]
          shrink-0 px-1 focus-visible:outline-none focus-visible:underline"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        Clear all
      </button>
    </div>
  );
}
