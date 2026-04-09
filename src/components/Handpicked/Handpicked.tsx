import { useState } from 'react';
import { Search } from '@mui/icons-material';
import PremiumTabs from '../ui/PremiumTabs';
import HandpickedHeader from './sections/HandpickedHeader';
import PropertyGrid from './sections/PropertyGrid';

type TabId = 'all' | 'income' | 'vacant' | 'franchisee' | 'others';

const tabs: { label: string; value: TabId }[] = [
  { label: 'All', value: 'all' },
  { label: 'Income Generating', value: 'income' },
  { label: 'Vacant', value: 'vacant' },
  { label: 'Franchisee', value: 'franchisee' },
  { label: 'Others', value: 'others' },
];

export interface Property {
  id: string;
  name: string;
  tagline: string;
  category: string;
  investmentRange: string;
  monthlyRevenue: string;
  location: string;
  image: string;
  tags: string[];
  isVerified?: boolean;
}

export const handpickedData: Property[] = [
  {
    id: '1',
    name: 'DLF sky plaza',
    tagline: 'Premium Commercial Space',
    category: 'Real Estate',
    investmentRange: '₹ 8Cr',
    monthlyRevenue: '₹ 4L',
    location: 'Hitech city, Hyderabad',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop',
    tags: ['Income Generating'],
    isVerified: true,
  },
  {
    id: '2',
    name: 'Burger King',
    tagline: 'Fast Food Franchise',
    category: 'Food & Beverage',
    investmentRange: '₹ 2.5Cr', // Changed from 4L/Month to a fixed number
    monthlyRevenue: '₹ 4.5L',  // Added missing earnings
    location: 'Hitech city, Hyderabad',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop',
    tags: ['Franchisee'],
    isVerified: true,
  },
  {
    id: '3',
    name: 'Profitable Gym & Fitness Center',
    tagline: 'Health & Fitness',
    category: 'Health & Fitness',
    investmentRange: '₹ 55L',   // Changed from empty to fixed number
    monthlyRevenue: '₹ 2L',
    location: 'Hitech city, Hyderabad',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop',
    tags: ['Income Generating', 'Others'],
    isVerified: true,
  },
  {
    id: '4',
    name: 'PVR cinemas',
    tagline: 'Entertainment & Multiplex',
    category: 'Entertainment',
    investmentRange: '₹ 14Cr',
    monthlyRevenue: '₹ 8.5L',
    location: 'Hitech city, Hyderabad',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop',
    tags: ['Income Generating'],
    isVerified: true,
  },
];

interface HandpickedProps {
  viewMode: 'desktop' | 'mobile';
}

export default function Handpicked({ viewMode }: HandpickedProps) {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const isDesktop = viewMode === 'desktop';

  const filteredProperties = handpickedData.filter((property) => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'income' && property.tags.includes('Income Generating')) ||
      (activeTab === 'vacant' && property.tags.includes('Vacant')) ||
      (activeTab === 'franchisee' && property.tags.includes('Franchisee')) ||
      (activeTab === 'others' && property.tags.includes('Others'));

    const matchesSearch = 
      searchTerm === '' ||
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div
      className={`w-full flex flex-col items-center overflow-hidden ${
        isDesktop ? 'bg-[#f4f7f9]' : 'h-screen bg-white'
      }`}
    >
      <div
        className={`transition-all duration-500 mx-auto overflow-hidden shadow-2xl bg-white flex flex-col ${
          isDesktop
            ? 'max-w-[100%] w-[100%] rounded-none border border-[#1c2a44]/10'
            : 'w-[24.375rem] shrink-0 pt-2 rounded-none'
        }`}
        style={{ height: isDesktop ? 'calc(100vh - 6.25rem)' : '48.75rem' }}
      >
        <div className="relative h-full flex flex-col overflow-hidden">
          <div
            className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth [&::-webkit-scrollbar]:w-[0.25rem] [&::-webkit-scrollbar-thumb]:bg-[#1c2a44]/15 [&::-webkit-scrollbar-thumb]:rounded"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <HandpickedHeader isDesktop={isDesktop} />

            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
              <div className={`max-w-[80rem] mx-auto ${isDesktop ? 'px-10 py-1' : 'px-4 py-1'}`}>
                <div className={`flex ${isDesktop ? 'flex-row items-center gap-4' : 'flex-col gap-2'}`}>
                  
                  {/* Tabs Section - Reduced Spacing */}
                  <div className={`flex-1 overflow-x-auto custom-scrollbar ${!isDesktop ? '-mx-1 px-1' : ''}`}>
                    <PremiumTabs
                      tabs={tabs}
                      value={activeTab}
                      onChange={(v) => setActiveTab(v as TabId)}
                      isDesktop={isDesktop}
                    />
                  </div>

                  {/* Search Bar - Swapped to Left */}
                  <div className={`relative ${isDesktop ? 'w-72 shrink-0' : 'w-full'}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search sx={{ fontSize: '1.25rem' }} className="text-[#94a3b8]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search handpicked..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[4px] text-sm focus:outline-none focus:bg-white focus:border-[#c9a34e] focus:ring-1 focus:ring-[#c9a34e]/50 transition-all duration-300 text-[#1c2a44] placeholder:text-[#94a3b8]"
                    />
                  </div>

                

                </div>
              </div>
            </div>

            <div className={isDesktop ? 'max-w-[80rem] mx-auto px-10 py-4' : 'px-3 py-4 pb-20'}>
              <PropertyGrid
                properties={filteredProperties}
                isDesktop={isDesktop}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}