import { useState } from 'react';
// ── Shared components from Home (identical styling) ──────────────────────────
import Header       from '../Home/Header';
import TopTabs      from '../Home/TopTabs';
import CategoryTabs from '../Home/CategoryTabs';
import SearchBar    from '../Home/SearchBar';
import PropertyCard from '../Home/PropertyCard';
import BottomNavbar from '../Home/BottomNavbar';
// ── Selected-area specific components ───────────────────────────────────────

import SelectedMap  from './SelectedMap';
// ── Data & types ─────────────────────────────────────────────────────────────
import { featuredProperty } from './data';
import type { MainTab, CategoryType, ViewMode } from './types';

export default function HomeSelectedArea() {
  const [activeTab,      setActiveTab]      = useState<MainTab>('business');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('franchise');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [viewMode,       setViewMode]       = useState<ViewMode>('map');
  const [activeNav,      setActiveNav]      = useState('saved');


  return (
    <div
      className="flex flex-col w-full overflow-hidden font-['Outfit']"
      style={{
        maxWidth: 430,
        margin: '0 auto',
        height: '100%',
        backgroundColor: '#0a1128',
        position: 'relative',
      }}
    >
      {/* ── Dark header block ─────────────────────────────────────────── */}
      <div className="shrink-0 w-full bg-[#0a1128] z-20 relative">
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* ── Category cards + search bar ──────────────────────────────────── */}
      <div className="shrink-0 w-full bg-[#F8FAFC] z-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] relative">
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
      </div>



      {/* ── Map + absolute bottom overlay ─────────────────────────────── */}
      <div
        className="flex-1 flex flex-col overflow-hidden relative z-0"
        style={{ backgroundColor: '#0a1128' }}
      >
        {/* Map takes full area */}
        <SelectedMap viewMode={viewMode} onViewModeChange={setViewMode} />

        {/* Bottom overlay: PropertyCard + BottomNavbar float above the map */}
        <div className="shrink-0 w-full bg-transparent absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col">
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
