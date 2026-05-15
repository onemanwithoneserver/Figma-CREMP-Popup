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
      <div className="shrink-0 w-full bg-[#0a1128] z-20 relative pb-[24px]">
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <PropertyCategoryTabs active={activeCategory} onChange={setActiveCategory} />

        <div className="absolute left-0 right-0 bottom-[-20px] z-30 px-2">
          <div className="transition-all duration-500 ease-out">
            <SearchBar
              query={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search shops, offices, warehouses…"
            />
          </div>
        </div>
      </div>

      {/* ── Map fills remaining space ─────────── */}
      <div className="flex-1 relative overflow-hidden z-0 pt-[24px]" style={{ backgroundColor: '#E8EEF4', minHeight: 0 }}>
        {/* Full-height map canvas */}
        <div className="absolute inset-0 flex flex-col">
          <MapSection />
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
