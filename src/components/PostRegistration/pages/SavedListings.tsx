import { useState } from 'react';
import ListingCard from '../components/ListingCard';
import type { ListingItem } from '../components/ListingCard';
import ToggleViewTabs from '../components/ToggleViewTabs';
import Filters from '../components/Filters';
import EmptyState from '../components/EmptyState';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

const INITIAL_LISTINGS: ListingItem[] = [
  {
    id: '1', title: "McDonald's Franchise", category: 'Food & Beverage',
    price: '₹1.5Cr – ₹2Cr', location: 'Mumbai, Maharashtra',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    savedDate: '12 Apr 2026', isSaved: true,
  },
  {
    id: '2', title: "Domino's Pizza", category: 'Food & Beverage',
    price: '₹30L – ₹50L', location: 'Delhi NCR',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    savedDate: '10 Apr 2026', isSaved: true,
  },
  {
    id: '3', title: 'NIIT Education Centre', category: 'Education',
    price: '₹15L – ₹25L', location: 'Pune, Maharashtra',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
    savedDate: '08 Apr 2026', isSaved: true,
  },
  {
    id: '4', title: 'Apollo Pharmacy', category: 'Healthcare',
    price: '₹20L – ₹35L', location: 'Hyderabad, Telangana',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&q=80',
    savedDate: '05 Apr 2026', isSaved: true,
  },
  {
    id: '5', title: 'Anytime Fitness', category: 'Fitness & Wellness',
    price: '₹50L – ₹80L', location: 'Bengaluru, Karnataka',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    savedDate: '02 Apr 2026', isSaved: true,
  },
  {
    id: '6', title: 'Jockey Exclusive Store', category: 'Retail',
    price: '₹25L – ₹40L', location: 'Chennai, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    savedDate: '28 Mar 2026', isSaved: true,
  },
];

const CATEGORIES = ['All', 'Food & Beverage', 'Education', 'Healthcare', 'Retail', 'Fitness & Wellness'];
const SORT_OPTIONS = [
  { value: 'newest',  label: 'Newest First' },
  { value: 'oldest',  label: 'Oldest First' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

interface SavedListingsProps {
  isDesktop: boolean;
}

export default function SavedListings({ isDesktop }: SavedListingsProps) {
  const [listings, setListings] = useState<ListingItem[]>(INITIAL_LISTINGS);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');

  const handleUnsave = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const filtered = listings
    .filter((l) =>
      (category === 'All' || l.category === category) &&
      (l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.location.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === 'oldest') return (a.savedDate ?? '').localeCompare(b.savedDate ?? '');
      return (b.savedDate ?? '').localeCompare(a.savedDate ?? '');
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm font-light text-[#637089]">
          <span className="font-semibold text-[#0a1128]">{listings.length}</span> saved franchises
        </p>
        <ToggleViewTabs view={view} onChange={setView} />
      </div>

      <Filters
        searchPlaceholder="Search saved listings..."
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
          icon={<BookmarkBorderOutlinedIcon sx={{ fontSize: '1.5rem', color: '#a0aabf' }} />}
          title="No saved listings"
          description="Franchises you save while browsing will appear here."
        />
      ) : view === 'grid' ? (
        <div className={`grid gap-4 ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {filtered.map((item) => (
            <ListingCard
              key={item.id}
              item={item}
              mode="grid"
              showSaveAction
              onSave={handleUnsave}
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
              showSaveAction
              onSave={handleUnsave}
            />
          ))}
        </div>
      )}
    </div>
  );
}
