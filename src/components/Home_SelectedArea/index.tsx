import { useState } from 'react';
// ── Shared components from Home (identical styling) ──────────────────────────
import Header       from '../Home/Header';
import TopTabs      from '../Home/TopTabs';
import CategoryTabs from '../Home/CategoryTabs';
import SearchBar    from '../Home/SearchBar';
import PropertyCard from '../Home/PropertyCard';
// ── Selected-area specific components ───────────────────────────────────────
import AreaInfoCard  from './AreaInfoCard';
import SelectedMap   from './SelectedMap';
import BottomNavbar  from './BottomNavbar';
// ── Data & types ─────────────────────────────────────────────────────────────
import { featuredProperty, selectedRegion } from './data';
import type { MainTab, CategoryType, ViewMode } from './types';

export default function HomeSelectedArea() {
  const [activeTab,      setActiveTab]      = useState<MainTab>('business');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('franchise');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [viewMode,       setViewMode]       = useState<ViewMode>('map');
  const [activeNav,      setActiveNav]      = useState('saved');
  const [areaActive,     setAreaActive]     = useState(true);

  return (
    <div
      className="flex flex-col w-full overflow-hidden font-['Outfit']"
      style={{
        maxWidth: 430,
        margin: '0 auto',
        height: '100%',
        backgroundColor: '#0A0F1A',
        position: 'relative',
      }}
    >
      {/* ── Dark header block ─────────────────────────────────────────── */}
      <div
        className="shrink-0 w-full border-b border-white/5"
        style={{ backgroundColor: '#0F1626' }}
      >
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* ── Category pills + search ──────────────────────────────────── */}
      <div
        className="shrink-0 w-full z-10 shadow-sm"
        style={{ backgroundColor: '#0F1626' }}
      >
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* ── Selected area info + Map/List toggle ──────────────────────── */}
      {areaActive && (
        <AreaInfoCard
          region={selectedRegion}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onClear={() => setAreaActive(false)}
        />
      )}

      {/* ── Map + absolute bottom overlay ─────────────────────────────── */}
      <div
        className="flex-1 flex flex-col overflow-hidden relative z-0"
        style={{ backgroundColor: '#0A0F1A' }}
      >
        {/* Map takes full area */}
        <SelectedMap />

        {/* Bottom overlay: PropertyCard + BottomNavbar float above the map */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col">
          <div className="px-3 pb-3 pointer-events-auto">
            <PropertyCard property={featuredProperty} />
          </div>
          <div className="pointer-events-auto">
            <BottomNavbar activeNav={activeNav} onNavChange={setActiveNav} />
          </div>
        </div>
      </div>
    </div>
  );
}
