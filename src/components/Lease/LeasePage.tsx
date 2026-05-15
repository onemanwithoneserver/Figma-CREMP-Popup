import { useState } from 'react';
import LeaseHeader from './LeaseHeader';
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

  const handleTabChange = (_tab: MainTab) => { };

  return (
    <main
      className="flex flex-col w-full h-full overflow-hidden relative mx-auto bg-[#0a1128]"
      style={{ maxWidth: 430, fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="shrink-0 w-full bg-[#0a1128] z-20 relative pb-2">
        <LeaseHeader />
        <TopTabs activeTab="lease" onTabChange={handleTabChange} />
        <LeaseCategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="absolute left-0 right-0 bottom-[-32px] z-30 px-2">
          <div className="transition-all duration-500 ease-out">
            <SearchBar
              query={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search offices, retail, warehouses..."
            />
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden z-0 pt-2">
        <div className="absolute inset-0 flex flex-col">
          <LeaseMapSection
            selectedMarkerId={selectedMarkerId}
            onMarkerClick={setSelectedMarkerId}
          />
        </div>
      </div>

      <div className="shrink-0 w-full z-10">
        <LeasePropertyList properties={leaseProperties} />
      </div>

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