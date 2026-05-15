import { useState } from 'react';
import Header from '../Home/Header';
import TopTabs from '../Home/TopTabs';
import CategoryTabs from '../Home/CategoryTabs';
import SearchBar from '../Home/SearchBar';
import PropertyCard from '../Home/PropertyCard';
import BottomNavbar from '../Home/BottomNavbar';
import SelectedMap from './SelectedMap';
import { featuredProperty } from './data';
import type { MainTab, ViewMode } from './types';
import type { CategoryType } from '../Home/types';

export default function HomeSelectedArea() {
  const [activeTab, setActiveTab] = useState<MainTab>('business');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('franchise');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [activeNav, setActiveNav] = useState('saved');

  return (
    <div className="relative flex flex-col w-full h-full max-w-[430px] mx-auto overflow-hidden bg-[#0a1128] font-['Outfit']">
      
      <div className="relative z-20 shrink-0 w-full bg-[#0a1128] pb-[24px]">
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        
        <div className="absolute left-0 right-0 bottom-[-20px] z-30 px-2">
          <div className="transition-all duration-500 ease-out">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </div>

      <div className="relative z-0 flex-1 overflow-hidden bg-[#E8EEF4] pt-[24px]">
        
        <div className="absolute inset-0 flex flex-col">
          <SelectedMap viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col pointer-events-none">
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