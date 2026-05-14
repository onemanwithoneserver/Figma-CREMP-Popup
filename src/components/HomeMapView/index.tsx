import { useState } from 'react';
// ── Reuse identical header / top-tabs / bottom-nav from Home ─────────────────
import Header       from '../Home/Header';
import TopTabs      from '../Home/TopTabs';
import BottomNavbar from '../Home/BottomNavbar';
import SearchBar    from '../Home/SearchBar';
import type { MainTab } from '../Home/types';
// ── AllBuildings-specific center content ─────────────────────────────────────
import PropertyCategoryTabs from './PropertyCategoryTabs';
import MapSection           from './MapSection';
import type { PropertyCategory } from './types';


export default function HomeMapView() {
  const [activeTab,      setActiveTab]      = useState<MainTab>('buy');
  const [activeCategory, setActiveCategory] = useState<PropertyCategory>('vacant');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [activeNav,      setActiveNav]      = useState('saved');

  return (
    <div
      className="flex flex-col w-full overflow-hidden"
      style={{
        maxWidth: 430,
        margin: '0 auto',
        height: '100%',
        backgroundColor: '#0a1128',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
      }}
    >
      {/* ── Dark header block ──────────────────────────────────────────────── */}
      <div className="shrink-0 w-full bg-[#0a1128] z-20 relative">
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* ── Map fills remaining space; search floats at the top ─────────── */}
      <div className="flex-1 relative overflow-hidden z-0" style={{ backgroundColor: '#E8EEF4', minHeight: 0 }}>
        {/* Full-height map canvas */}
        <div className="absolute inset-0 flex flex-col">
          <MapSection />
        </div>

        {/* Filter + search floating at top of map */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <PropertyCategoryTabs active={activeCategory} onChange={setActiveCategory} />
          <div className="px-3 pb-2.5">
            <div>
              <SearchBar
                query={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search shops, offices, warehouses…"
              />
            </div>
          </div>
        </div>

        {/* Bottom navigation floating above the map */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col">
          <div className="pointer-events-auto">
            <BottomNavbar activeNav={activeNav} onNavChange={setActiveNav} />
          </div>
        </div>
      </div>
    </div>
  );
}
