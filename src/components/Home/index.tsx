import { useState } from 'react';
import Header from './Header';
import TopTabs from './TopTabs';
import CategoryTabs from './CategoryTabs';
import SearchBar from './SearchBar';
import MapSection from './MapSection';
import PropertyCard from './PropertyCard';
import BottomNavbar from './BottomNavbar';
import { featuredProperty } from './data';
import type { MainTab, CategoryType } from './types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<MainTab>('business');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('franchise');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>('1');
  const [activeNav, setActiveNav] = useState('cremp');

  return (
    <main
      className="flex flex-col w-full h-full overflow-hidden relative mx-auto bg-[#0a1128]"
      style={{
        maxWidth: 430,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div className="shrink-0 w-full bg-[#0a1128] z-20 relative pb-[24px]">
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        <div className="absolute left-0 right-0 bottom-[-20px] z-30 px-2">
          <div className="transition-all duration-500 ease-out">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </div>

      {/* Map fills all remaining space */}
      <div className="flex-1 relative overflow-hidden bg-[#E8EEF4] z-0 pt-[24px]">
        {/* Full-height map canvas */}
        <div className="absolute inset-0 flex flex-col">
          <MapSection
            selectedMarkerId={selectedMarkerId}
            onMarkerClick={setSelectedMarkerId}
          />
        </div>
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