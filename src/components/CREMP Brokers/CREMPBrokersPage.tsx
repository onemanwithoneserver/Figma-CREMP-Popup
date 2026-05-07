import { useState, useEffect } from 'react';
import './styles/cremp-brokers.css';
import BrokerHeader from './components/BrokerHeader';
import BrokerSearch from './components/BrokerSearch';
import BrokerFilters from './components/BrokerFilters';
import BrokerCard from './components/BrokerCard';
import BrokerProfileDialog from './components/BrokerProfileDialog';
import BrokerMapDrawer from './components/BrokerMapDrawer';
import EmptyState from './components/EmptyState';
import { useBrokerFilters } from './hooks/useBrokerFilters';
import { brokersData } from './data/brokersData';
import { ctaBanner } from './data/marketplaceData';
import type { Broker } from './types/broker.types';

interface CREMPBrokersPageProps {
  viewMode?: 'desktop' | 'mobile';
}

const SKELETON_COUNT = 6;

export default function CREMPBrokersPage({ viewMode = 'desktop' }: CREMPBrokersPageProps) {
  const isDesktop = viewMode === 'desktop';

  const [isLoading, setIsLoading] = useState(true);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [mapPanelOpen, setMapPanelOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);

  const {
    filters,
    sortOption,
    setSortOption,
    filteredBrokers,
    setSearch,
    toggleSpecialty,
    toggleLocation,
    toggleDealType,
    toggleDealSize,
    setExperience,
    clearAllFilters,
    activeFilterCount,
  } = useBrokerFilters();

  // Simulate initial data loading
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const hasActiveFilters =
    activeFilterCount > 0 || filters.search.trim().length > 0;

  const sharedFilterProps = {
    isOpen: filterPanelOpen,
    onClose: () => setFilterPanelOpen(false),
    filters,
    sortOption,
    activeFilterCount,
    onToggleSpecialty: toggleSpecialty,
    onToggleLocation: toggleLocation,
    onToggleDealType: toggleDealType,
    onToggleDealSize: toggleDealSize,
    onSetExperience: setExperience,
    onSetSort: setSortOption,
    onReset: clearAllFilters,
  };

  if (isDesktop) {
    return (
        <div
          className="w-full flex items-start justify-center bg-[#fafafb] overflow-hidden"
          style={{ height: 'calc(100vh - 64px)', fontFamily: 'Outfit, sans-serif' }}
        >
        <div className="w-full h-full flex flex-col overflow-hidden relative">

        {/* Header */}
        <BrokerHeader isDesktop />

        <div className="cb-sticky-bar px-4 py-1 flex items-center gap-3">
          {/* Filter icon toggle */}
          <button
            onClick={() => setFilterPanelOpen(true)}
            aria-label="Open filters"
            className={`shrink-0 flex items-center gap-1.5 text-[11px] font-semibold rounded-lg px-3 py-[7px] border transition-colors shadow-sm whitespace-nowrap
              ${activeFilterCount > 0
                ? 'bg-[#0a1128] text-white border-[#0a1128]'
                : 'bg-white text-[#0a1128] border-black/[0.08] hover:text-[#d4af37]'
              }`}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke={activeFilterCount > 0 ? '#ffffff' : '#0a1128'} strokeWidth="1.6" strokeLinecap="round" className="w-3.5 h-3.5 shrink-0">
              <path d="M2 4h12M4 8h8M6 12h4" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-[#d4af37] text-[#0a1128] rounded-full text-[9px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <BrokerSearch
            value={filters.search}
            onChange={setSearch}
            className="flex-1"
          />
          {/* Map button — right of search field */}
          <button
            onClick={() => setMapPanelOpen(true)}
            aria-label="Open map view"
            title="View brokers on map"
            className={`shrink-0 flex items-center gap-1.5 text-[11px] font-semibold rounded-lg px-3 py-[7px] border transition-colors shadow-sm whitespace-nowrap
              ${mapPanelOpen
                ? 'bg-[#0a1128] text-[#d4af37] border-[#0a1128]'
                : 'bg-white text-[#0a1128] border-black/[0.08] hover:text-[#d4af37] hover:border-[#d4af37]/40'
              }`}
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 shrink-0">
              <path d="M10 2C7.24 2 5 4.24 5 7c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5z" fill="currentColor" />
              <circle cx="10" cy="7" r="2.2" fill="white" />
            </svg>
            Map
          </button>
        </div>

        {/* Body: full-width grid */}
        <div className="flex flex-1 overflow-hidden">

          {/* Content */}
          <main className="flex-1 overflow-y-auto cb-scroll-thin px-3 pb-2">
            {/* Section heading */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
              </div>
              {hasActiveFilters && !isLoading && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-semibold text-[#ef4444] hover:text-[#dc2626]"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Grid */}
            {!isLoading && filteredBrokers.length === 0 ? (
              <EmptyState hasFilters={hasActiveFilters} onClearFilters={clearAllFilters} />
            ) : (
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                {isLoading
                  ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                      <BrokerCard
                        key={`sk-${i}`}
                        broker={brokersData[0]}
                        isDesktop
                        isLoading
                      />
                    ))
                  : filteredBrokers.map((broker) => (
                      <BrokerCard key={broker.id} broker={broker} isDesktop onViewProfile={setSelectedBroker} />
                    ))}
              </div>
            )}

            {/* CTA Banner */}
            {!isLoading && (
              <div className="mt-8 mb-2 rounded-[8px] bg-gradient-to-br from-[#0a1128] to-[#1a3463] border border-white/10 px-8 py-6 flex items-center justify-between gap-6">
                <div>
                  <h3
                    className="text-white text-[15px] font-bold leading-tight"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {ctaBanner.heading}
                  </h3>
                  <p
                    className="text-white/60 text-[12px] font-light mt-1 max-w-[320px]"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {ctaBanner.subHeading}
                  </p>
                </div>
                <button className="cb-btn-primary px-6 py-3 text-[13px] shrink-0">
                  {ctaBanner.cta}
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Desktop filter drawer */}
        <BrokerFilters {...sharedFilterProps} isDesktop={true} />
        {/* Desktop map drawer */}
        <BrokerMapDrawer isOpen={mapPanelOpen} onClose={() => setMapPanelOpen(false)} isDesktop brokerCount={filteredBrokers.length} />
        {/* ── Broker Profile dialog (desktop) ── */}
        {selectedBroker && (
          <BrokerProfileDialog
            broker={selectedBroker}
            isDesktop
            onClose={() => setSelectedBroker(null)}
          />
        )}
        </div>
      </div>
    );
  }

  // ── Mobile Layout ──────────────────────────────────────────
  return (
    <div
      className="w-full flex flex-col items-center justify-start bg-[#fafafb] overflow-hidden"
      style={{ height: 'calc(100vh - 64px)', fontFamily: 'Outfit, sans-serif' }}
    >
      <div
        className="w-[24.375rem] shrink-0 h-full flex flex-col overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.08)] relative"
      >
        {/* Header */}
        <BrokerHeader isDesktop={false} />

        {/* Sticky search + filter bar */}
        <div className="cb-sticky-bar px-4 py-3 flex flex-col gap-2 shrink-0">
          {/* Filter icon LEFT of search */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterPanelOpen(true)}
              aria-label="Open filters"
              className={`shrink-0 w-[38px] h-[38px] flex items-center justify-center rounded-lg border transition-colors shadow-sm relative
                ${activeFilterCount > 0
                  ? 'bg-[#0a1128] text-white border-[#0a1128]'
                  : 'bg-white text-[#0a1128] border-black/[0.08] hover:text-[#d4af37]'
                }`}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke={activeFilterCount > 0 ? '#ffffff' : '#0a1128'} strokeWidth="1.6" strokeLinecap="round" className="w-3.5 h-3.5">
                <path d="M2 4h12M4 8h8M6 12h4" />
              </svg>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d4af37] text-[#0a1128] rounded-full text-[9px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <BrokerSearch value={filters.search} onChange={setSearch} className="flex-1" />
            {/* Map button — right of search */}
            <button
              onClick={() => setMapPanelOpen(true)}
              aria-label="Open map view"
              className={`shrink-0 w-[38px] h-[38px] flex items-center justify-center rounded-lg border transition-colors shadow-sm
                ${mapPanelOpen
                  ? 'bg-[#0a1128] text-[#d4af37] border-[#0a1128]'
                  : 'bg-white text-[#0a1128] border-black/[0.08] hover:text-[#d4af37]'
                }`}
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                <path d="M10 2C7.24 2 5 4.24 5 7c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5z" fill="currentColor" />
                <circle cx="10" cy="7" r="2.2" fill="white" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable broker list */}
        <div className="flex-1 overflow-y-auto cb-scroll-thin px-4 pb-4">
        {/* Cards */}
          {!isLoading && filteredBrokers.length === 0 ? (
            <EmptyState hasFilters={hasActiveFilters} onClearFilters={clearAllFilters} />
          ) : (
            <div className="flex flex-col gap-3">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <BrokerCard
                      key={`sk-${i}`}
                      broker={brokersData[0]}
                      isDesktop={false}
                      isLoading
                    />
                  ))
                : filteredBrokers.map((broker) => (
                    <BrokerCard key={broker.id} broker={broker} isDesktop={false} onViewProfile={setSelectedBroker} />
                  ))}
            </div>
          )}

          {/* CTA Banner */}
          {!isLoading && (
            <div className="mt-5 rounded-[8px] bg-gradient-to-br from-[#0a1128] to-[#1a3463] border border-white/10 px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
                    <circle cx="10" cy="10" r="8" />
                    <path d="M10 6v4M10 14h.01" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-white text-[13px] font-bold leading-tight"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {ctaBanner.heading}
                  </h3>
                  <p
                    className="text-white/55 text-[11px] font-light mt-0.5 leading-snug"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {ctaBanner.subHeading}
                  </p>
                  <button className="mt-2.5 cb-btn-primary px-4 py-2 text-[12px]">
                    {ctaBanner.cta}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Mobile filter bottom sheet */}
        <BrokerFilters {...sharedFilterProps} isDesktop={false} />
        {/* Mobile map bottom sheet */}
        <BrokerMapDrawer isOpen={mapPanelOpen} onClose={() => setMapPanelOpen(false)} isDesktop={false} brokerCount={filteredBrokers.length} />
        {/* ── Broker Profile dialog (mobile) ── */}
        {selectedBroker && (
          <BrokerProfileDialog
            broker={selectedBroker}
            isDesktop={false}
            onClose={() => setSelectedBroker(null)}
          />
        )}
      </div>
    </div>
  );
}
