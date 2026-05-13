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
import PropertyCard         from '../Home/PropertyCard';
import { featuredProperty } from '../Home/data';

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
        backgroundColor: '#0A0F1A',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
      }}
    >
      {/* ── Dark header block ──────────────────────────────────────────────── */}
      <div className="shrink-0 w-full bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] border-b border-white/5">
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* ── Category pills + search ─────────────────────────────────────────── */}
      <div className="shrink-0 w-full bg-white z-10 shadow-sm rounded-t-[20px] -mt-4 pt-3 relative">
        <PropertyCategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <SearchBar 
          query={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search shops, offices, warehouses..."
        />
      </div>

      {/* ── Map area (flex-1 fills remaining height) ─────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-0" style={{ minHeight: 0 }}>
        <MapSection />
      </div>

      {/* ── Bottom navigation ───────────────────────────────────────────────── */}
      <div className="shrink-0 w-full bg-transparent absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col">
        <div className="px-3 pb-3 pointer-events-auto">
          <PropertyCard property={featuredProperty} />
        </div>
        <div className="pointer-events-auto">
          <BottomNavbar activeNav={activeNav} onNavChange={setActiveNav} />
        </div>
      </div>
    </div>
  );
}
