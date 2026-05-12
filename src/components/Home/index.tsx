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
  const [activeNav, setActiveNav] = useState('home');

  return (
    <main
      className="flex flex-col w-full overflow-hidden"
      style={{
        maxWidth: 430,
        margin: '0 auto',
        height: '100dvh',
        backgroundColor: '#0A0F1A',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
      }}
    >
      <div className="shrink-0 w-full bg-[#0F1626] border-b border-white/5">
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="shrink-0 w-full bg-[#0F1626] z-10 shadow-sm">
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-[#0A0F1A] relative z-0">
        <MapSection
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedMarkerId={selectedMarkerId}
          onMarkerClick={setSelectedMarkerId}
        />
      </div>

      <div className="shrink-0 w-full bg-transparent absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col">
        <div className="px-3 pb-3 pointer-events-auto">
          <PropertyCard property={featuredProperty} />
        </div>
        <div className="pointer-events-auto">
          <BottomNavbar activeNav={activeNav} onNavChange={setActiveNav} />
        </div>
      </div>
    </main>
  );
}