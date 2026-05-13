import { useState } from 'react';
import Header from './Header';
import TopTabs from './TopTabs';
import CategoryTabs from './CategoryTabs';
import SearchBar from './SearchBar';
import MapSection from './MapSection';
import PropertyCard from './PropertyCard';
import BottomNavbar from './BottomNavbar';
import { featuredProperty } from './data';
import type { MainTab, CategoryType, ViewMode } from './types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<MainTab>('business');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('franchise');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>('1');
  const [activeNav, setActiveNav] = useState('cremp');

  return (
    <main
      className="flex flex-col w-full h-full overflow-hidden relative mx-auto bg-[#0B1320]"
      style={{
        maxWidth: 430,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div className="shrink-0 w-full bg-[#0B1320] z-20 relative">
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="shrink-0 w-full bg-[#F8FAFC] z-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] relative">
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-[#E2E8F0] relative z-0">
        <MapSection
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedMarkerId={selectedMarkerId}
          onMarkerClick={setSelectedMarkerId}
        />
      </div>

      <div className="shrink-0 w-full bg-transparent absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col justify-end">
        <div className="px-2.5 pb-2 pointer-events-auto">
          <PropertyCard property={featuredProperty} />
        </div>
        <div className="pointer-events-auto">
          <BottomNavbar activeNav={activeNav} onNavChange={setActiveNav} />
        </div>
      </div>
    </main>
  );
}