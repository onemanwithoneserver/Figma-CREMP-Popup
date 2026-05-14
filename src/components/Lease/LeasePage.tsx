import { useState } from 'react';
import Header from '../Home/Header';
import TopTabs from '../Home/TopTabs';
import SearchBar from '../Home/SearchBar';
import BottomNavbar from '../Home/BottomNavbar';
import LeaseCategoryTabs from './LeaseCategoryTabs';
import LeaseMapSection from './LeaseMapSection';
import LeasePropertyList from './LeasePropertyList';
import { leaseProperties } from './data';
import type { LeaseCategory } from './types';
import type { MainTab } from '../Home/types';

interface LeasePageProps {
  onHomePress?: () => void;
}

export default function LeasePage({ onHomePress }: LeasePageProps) {
  const [activeCategory, setActiveCategory] = useState<LeaseCategory>('full-space');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>('1');
  const [activeNav, setActiveNav] = useState('cremp');

  // Allow switching top-level tabs (Lease is active by default; routing to other tabs is a no-op here)
  const handleTabChange = (_tab: MainTab) => {
    // Navigation between top-level tabs would be handled by a router layer.
    // Within this standalone page the tab is always "lease".
  };

  return (
    <main
      className="flex flex-col w-full h-full overflow-hidden relative mx-auto bg-[#0a1128]"
      style={{ maxWidth: 430, fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── Dark top bar: header + tab strip + category tabs ──────────── */}
      <div className="shrink-0 w-full bg-[#0a1128] z-20 relative">
        <Header />
        <TopTabs activeTab="lease" onTabChange={handleTabChange} />
        <LeaseCategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* ── Map fills remaining space; search floats at top of map ────── */}
      <div className="flex-1 relative overflow-hidden z-0">
        {/* Full-height map canvas */}
        <div className="absolute inset-0 flex flex-col">
          <LeaseMapSection
            selectedMarkerId={selectedMarkerId}
            onMarkerClick={setSelectedMarkerId}
          />
        </div>

        {/* Search floating at top of map */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="px-3 pt-2.5 pb-2.5">
            <SearchBar
              query={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search offices, retail, warehouses..."
            />
          </div>
        </div>
      </div>

      {/* ── Property cards list ───────────────────────────────────────── */}
      <div className="shrink-0 w-full z-10">
        <LeasePropertyList properties={leaseProperties} />
      </div>

      {/* ── Bottom navigation ─────────────────────────────────────────── */}
      <div className="shrink-0 w-full z-20">
        <BottomNavbar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          onLogoPress={onHomePress}
        />
      </div>
    </main>
  );
}
