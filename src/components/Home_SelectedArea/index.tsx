import { useState } from 'react';
import Header from '../Home/Header';
import TopTabs from '../Home/TopTabs';
import SearchBar from '../Home/SearchBar';
import PropertyCard from '../Home/PropertyCard';
import BottomNavbar from '../Home/BottomNavbar';
import SelectedMap from './SelectedMap';
import { featuredProperty } from './data';
import type { MainTab, ViewMode } from './types';

export default function HomeSelectedArea() {
  const [activeTab, setActiveTab] = useState<MainTab>('business');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [activeNav, setActiveNav] = useState('saved');

  return (
    <div className="relative flex flex-col w-full h-full max-w-[430px] mx-auto overflow-hidden bg-[#0a1128] font-['Outfit']">
      
      <div className="relative z-20 shrink-0 w-full bg-[#0a1128]">
        <Header />
        <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="relative z-0 flex-1 overflow-hidden bg-[#E8EEF4]">
        
        <div className="absolute inset-0 flex flex-col">
          <SelectedMap viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        <div className="absolute top-0 left-0 right-0 z-20 px-3 pt-4">
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
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