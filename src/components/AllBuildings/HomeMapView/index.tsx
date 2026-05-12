import { useState } from 'react';
// ── Reuse identical header / top-tabs / bottom-nav from Home ─────────────────
import Header       from '../../Home/Header';
import TopTabs      from '../../Home/TopTabs';
import BottomNavbar from '../../Home/BottomNavbar';
import SearchBar    from '../../Home/SearchBar';
import type { MainTab } from '../../Home/types';
// ── AllBuildings-specific center content ─────────────────────────────────────
import PropertyCategoryTabs from './PropertyCategoryTabs';
import MapSection           from './MapSection';
import type { PropertyCategory } from './types';

export default function AllBuildingsHomeMapView() {
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
      <div className="shrink-0 w-full bg-[#070C15] border-b border-white/5">
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* ── Category pills + search ─────────────────────────────────────────── */}
      <div className="shrink-0 w-full bg-[#0B1320] border-b border-white/[0.06] z-10">
        <PropertyCategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* ── Map area (flex-1 fills remaining height) ─────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-0" style={{ minHeight: 0 }}>
        <MapSection />
      </div>

      {/* ── Bottom navigation ───────────────────────────────────────────────── */}
      <div className="shrink-0 w-full">
        <BottomNavbar activeNav={activeNav} onNavChange={setActiveNav} />
      </div>
    </div>
  );
}
