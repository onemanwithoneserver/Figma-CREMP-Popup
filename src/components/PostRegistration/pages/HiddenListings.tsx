import { useState } from 'react';
import ListingCard from '../components/ListingCard';
import type { ListingItem } from '../components/ListingCard';
import ToggleViewTabs from '../components/ToggleViewTabs';
import Filters from '../components/Filters';
import EmptyState from '../components/EmptyState';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

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

const CATEGORIES = ['All', 'Food & Beverage', 'Retail', 'Education', 'Healthcare'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

interface HiddenListingsProps {
  isDesktop: boolean;
}

export default function HiddenListings({ isDesktop }: HiddenListingsProps) {
  const [listings, setListings] = useState<ListingItem[]>(INITIAL_HIDDEN);
  const [view, setView]       = useState<'grid' | 'list'>('grid');
  const [search, setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort]       = useState('newest');

  const handleUnhide = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const filtered = listings
    .filter((l) =>
      (category === 'All' || l.category === category) &&
      (l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.location.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) =>
      sort === 'oldest'
        ? (a.savedDate ?? '').localeCompare(b.savedDate ?? '')
        : (b.savedDate ?? '').localeCompare(a.savedDate ?? '')
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm font-light text-[#637089]">
          <span className="font-semibold text-[#0a1128]">{listings.length}</span> hidden franchises
        </p>
        <ToggleViewTabs view={view} onChange={setView} />
      </div>

      <div className="flex items-center gap-2 text-xs font-light text-[#637089] bg-amber-50 border border-amber-100 rounded-[7px] px-3 py-2">
        <VisibilityOffOutlinedIcon sx={{ fontSize: 14, color: '#b45309' }} />
        <span>Tap the eye icon on a listing to unhide it and make it visible again.</span>
      </div>

      <Filters
        searchPlaceholder="Search hidden listings..."
        searchValue={search}
        onSearchChange={setSearch}
        categories={CATEGORIES}
        selectedCategory={category}
        onCategoryChange={setCategory}
        sortOptions={SORT_OPTIONS}
        selectedSort={sort}
        onSortChange={setSort}
        isDesktop={isDesktop}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={<VisibilityOffOutlinedIcon sx={{ fontSize: '1.5rem', color: '#a0aabf' }} />}
          title="No hidden listings"
          description="Franchises you hide while browsing will be stored here. You can unhide them at any time."
        />
      ) : view === 'grid' ? (
        <div className={`grid gap-4 ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {filtered.map((item) => (
            <ListingCard
              key={item.id}
              item={item}
              mode="grid"
              showHideAction
              onHide={handleUnhide}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[7px] border border-black/[0.03] shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
          {filtered.map((item) => (
            <ListingCard
              key={item.id}
              item={item}
              mode="list"
              showHideAction
              onHide={handleUnhide}
            />
          ))}
        </div>
      )}
    </div>
  );
}
