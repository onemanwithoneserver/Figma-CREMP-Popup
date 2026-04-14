import { useState } from 'react';
import ListingCard from '../components/ListingCard';
import type { ListingItem } from '../components/ListingCard';
import ToggleViewTabs from '../components/ToggleViewTabs';
import EmptyState from '../components/EmptyState';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const INITIAL_HIDDEN: ListingItem[] = [
  {
    id: '1', title: "Subway Franchise", category: 'Food & Beverage',
    price: '₹15L – ₹25L', location: 'Mumbai, Maharashtra',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
    savedDate: '11 Apr 2026', isHidden: true,
  },
  {
    id: '2', title: 'Kalyan Jewellers', category: 'Retail',
    price: '₹1Cr – ₹2Cr', location: 'Kochi, Kerala',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
    savedDate: '09 Apr 2026', isHidden: true,
  },
  {
    id: '3', title: 'Kidzee Pre-School', category: 'Education',
    price: '₹12L – ₹20L', location: 'Ahmedabad, Gujarat',
    image: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=400&q=80',
    savedDate: '07 Apr 2026', isHidden: true,
  },
  {
    id: '4', title: 'Medi Assist Network', category: 'Healthcare',
    price: '₹8L – ₹15L', location: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80',
    savedDate: '03 Apr 2026', isHidden: true,
  },
];

const CATEGORIES = ['Food & Beverage', 'Retail', 'Education', 'Healthcare'];

interface ModernDropdownProps {
  icon: React.ElementType;
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
  align?: 'left' | 'right';
  isDesktop: boolean;
}

function ModernDropdown({ icon: Icon, placeholder, value, options, onChange, align = 'left', isDesktop }: ModernDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className={`relative w-full ${isDesktop ? 'w-auto' : ''} ${isOpen ? 'z-50' : 'z-10'}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-1 py-2 bg-white border rounded-[4px] transition-all duration-300 font-medium shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none h-[38px] ${
          isDesktop ? 'px-3 text-[13px]' : 'px-2 text-[11px]'
        } ${isOpen ? 'border-[#d4af37] ring-1 ring-[#d4af37]/20' : 'border-black/5 hover:border-[#d4af37]/40'}`}
      >
        <div className="flex items-center gap-1.5 overflow-hidden">
          <Icon sx={{ fontSize: 16, color: value ? '#d4af37' : '#a0aabf' }} className="shrink-0 transition-colors" />
          <span className={`truncate ${value ? 'text-[#0a1128]' : 'text-[#637089] font-light'}`}>
            {selectedLabel || placeholder}
          </span>
        </div>
        <KeyboardArrowDownIcon
          sx={{ fontSize: 14, color: '#a0aabf' }}
          className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} />
          <div className={`absolute top-[calc(100%+6px)] ${align === 'right' ? 'right-0' : 'left-0'} min-w-[150px] ${isDesktop ? 'min-w-[180px]' : ''} bg-white border border-black/5 rounded-[4px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200`}>
            <button
              onClick={() => { onChange(''); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2 font-medium transition-colors hover:bg-[#fafafb] hover:text-[#d4af37] ${isDesktop ? 'text-[13px]' : 'text-[12px]'} ${
                value === '' ? 'text-[#d4af37] bg-[#fafafb]' : 'text-[#0a1128]'
              }`}
            >
              All {placeholder}s
            </button>
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`w-full text-left px-4 py-2 font-medium transition-colors hover:bg-[#fafafb] hover:text-[#d4af37] ${isDesktop ? 'text-[13px]' : 'text-[12px]'} ${
                  value === opt.value ? 'text-[#d4af37] bg-[#fafafb]' : 'text-[#0a1128]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface HiddenListingsProps {
  isDesktop: boolean;
}

export default function HiddenListings({ isDesktop }: HiddenListingsProps) {
  const [listings, setListings] = useState<ListingItem[]>(INITIAL_HIDDEN);
  const [search, setSearch]     = useState('');
  const [view, setView]         = useState<'grid' | 'list'>('grid');
  
  const [sector, setSector]   = useState('');
  const [capital, setCapital] = useState('');
  const [region, setRegion]   = useState('');

  const handleUnhide = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const filtered = listings.filter((l) =>
    (sector === '' || l.category === sector) &&
    (l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-[4px] border border-black/[0.03] shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-[13px] font-light text-[#637089]">
        <InfoOutlinedIcon sx={{ fontSize: 18, color: '#d4af37' }} />
        <span>Tap the eye icon on a listing to unhide it and make it visible again in your main feed.</span>
      </div>

      <div className={`flex ${isDesktop ? 'flex-row gap-3' : 'flex-col gap-2.5'} w-full`}>
        <div className={`flex items-center gap-2.5 w-full ${isDesktop ? 'flex-1' : ''}`}>
          <div className="relative flex-1 flex items-center bg-white border border-black/5 rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37]/20 hover:border-[#d4af37]/40 h-[38px]">
            <SearchOutlinedIcon
              sx={{ fontSize: 18, color: search ? '#d4af37' : '#a0aabf' }}
              className="absolute left-3 pointer-events-none transition-colors"
            />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full bg-transparent pl-9 pr-3 text-[#0a1128] text-[13px] outline-none placeholder:text-[#a0aabf] font-light font-['Outfit'] rounded-[4px]"
            />
          </div>

          {!isDesktop && (
            <div className="shrink-0 flex items-center h-[38px]">
              <ToggleViewTabs view={view} onChange={setView} />
            </div>
          )}
        </div>

        <div className={`${isDesktop ? 'flex items-center w-auto' : 'grid grid-cols-3 w-full'} gap-2`}>
          <ModernDropdown
            isDesktop={isDesktop}
            icon={CategoryOutlinedIcon}
            placeholder="Sector"
            value={sector}
            options={CATEGORIES.map(c => ({ value: c, label: c }))}
            onChange={setSector}
            align="left"
          />
          <ModernDropdown
            isDesktop={isDesktop}
            icon={CurrencyRupeeOutlinedIcon}
            placeholder="Capital"
            value={capital}
            options={[
              { value: 'under-25', label: 'Under ₹25L' },
              { value: '25-50', label: '₹25L - ₹50L' },
              { value: '50-100', label: '₹50L - ₹1Cr' }
            ]}
            onChange={setCapital}
            align={isDesktop ? 'left' : 'left'}
          />
          <ModernDropdown
            isDesktop={isDesktop}
            icon={LocationOnOutlinedIcon}
            placeholder="Region"
            value={region}
            options={[
              { value: 'north', label: 'North India' },
              { value: 'south', label: 'South India' }
            ]}
            onChange={setRegion}
            align="right"
          />
        </div>

        {isDesktop && (
          <div className="flex shrink-0 ml-auto items-center h-[38px]">
            <ToggleViewTabs view={view} onChange={setView} />
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<VisibilityOffOutlinedIcon sx={{ fontSize: '1.75rem', color: '#d4af37' }} />}
          title="No hidden listings"
          description="Franchises you hide while browsing will be securely stored here. You can unhide them at any time."
        />
      ) : view === 'grid' ? (
        <div className={`grid gap-4 ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'}`}>
          {filtered.map((item) => {
            if (!item) return null;
            return (
              <ListingCard
                key={item.id}
                item={item}
                mode="grid"
                isDesktop={isDesktop}
                showHideAction
                onHide={handleUnhide}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col">
          {filtered.map((item) => {
            if (!item) return null;
            return (
              <ListingCard
                key={item.id}
                item={item}
                mode="list"
                isDesktop={isDesktop}
                showHideAction
                onHide={handleUnhide}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}