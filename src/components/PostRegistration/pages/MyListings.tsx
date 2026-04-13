import { useState } from 'react';
import ListingCard from '../components/ListingCard';
import type { ListingItem } from '../components/ListingCard';
import ToggleViewTabs from '../components/ToggleViewTabs';
import Filters from '../components/Filters';
import EmptyState from '../components/EmptyState';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

const INITIAL_LISTINGS: ListingItem[] = [
  {
    id: '1', title: "Sunrise Café Franchise", category: 'Food & Beverage',
    price: '₹30L – ₹50L', location: 'Mumbai, Maharashtra',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
    status: 'active',
  },
  {
    id: '2', title: 'TechLearn Academy', category: 'Education',
    price: '₹20L – ₹35L', location: 'Pune, Maharashtra',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80',
    status: 'active',
  },
  {
    id: '3', title: 'FitZone Gym', category: 'Fitness & Wellness',
    price: '₹45L – ₹70L', location: 'Delhi NCR',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    status: 'pending',
  },
  {
    id: '4', title: 'MediCare Pharmacy', category: 'Healthcare',
    price: '₹18L – ₹28L', location: 'Hyderabad, Telangana',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&q=80',
    status: 'expired',
  },
  {
    id: '5', title: 'AutoCare Workshop', category: 'Automotive',
    price: '₹35L – ₹55L', location: 'Bengaluru, Karnataka',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80',
    status: 'active',
  },
];

const CATEGORIES = ['All', 'Food & Beverage', 'Education', 'Healthcare', 'Fitness & Wellness', 'Automotive'];
const SORT_OPTIONS = [
  { value: 'newest',  label: 'Newest First' },
  { value: 'status',  label: 'By Status' },
];

interface MyListingsProps {
  isDesktop: boolean;
}

const STATUS_COUNT = (listings: ListingItem[]) => ({
  active:  listings.filter((l) => l.status === 'active').length,
  pending: listings.filter((l) => l.status === 'pending').length,
  expired: listings.filter((l) => l.status === 'expired').length,
});

export default function MyListings({ isDesktop }: MyListingsProps) {
  const [listings, setListings] = useState<ListingItem[]>(INITIAL_LISTINGS);
  const [view, setView]       = useState<'grid' | 'list'>('grid');
  const [search, setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'expired'>('all');
  const [sort, setSort]       = useState('newest');

  const handleDelete = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const counts = STATUS_COUNT(listings);

  const filtered = listings.filter((l) => {
    const matchSearch   = l.title.toLowerCase().includes(search.toLowerCase()) ||
                          l.location.toLowerCase().includes(search.toLowerCase());
    const matchCat     = category === 'All' || l.category === category;
    const matchStatus  = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Summary stat chips */}
      <div className="flex items-center gap-3 flex-wrap">
        {([
          ['all',     'All',     listings.length, 'bg-[#fafafb] text-[#637089] border-black/5'],
          ['active',  'Active',  counts.active,   'bg-emerald-50 text-emerald-700 border-emerald-100'],
          ['pending', 'Pending', counts.pending,  'bg-amber-50 text-amber-700 border-amber-100'],
          ['expired', 'Expired', counts.expired,  'bg-red-50 text-red-600 border-red-100'],
        ] as const).map(([val, label, count, cls]) => (
          <button
            key={val}
            onClick={() => setStatusFilter(val)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-[7px] text-xs font-medium border transition-all duration-200 ${
              statusFilter === val ? cls.replace('bg-', 'bg-') + ' ring-1 ring-offset-1 ring-current' : cls
            }`}
          >
            {label}
            <span className="bg-white/60 px-1.5 py-0.5 rounded-[3px] font-semibold">{count}</span>
          </button>
        ))}
        <div className="ml-auto">
          <ToggleViewTabs view={view} onChange={setView} />
        </div>
      </div>

      <Filters
        searchPlaceholder="Search your listings..."
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
          icon={<ListAltOutlinedIcon sx={{ fontSize: '1.5rem', color: '#a0aabf' }} />}
          title="No listings found"
          description="Your listed franchises will appear here."
        />
      ) : view === 'grid' ? (
        <div className={`grid gap-4 ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {filtered.map((item) => (
            <div key={item.id} className="relative">
              <ListingCard
                item={item}
                mode="grid"
                showStatus
                showEditAction
                showDeleteAction
                onDelete={handleDelete}
              />
              {/* View leads CTA */}
              <button className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-medium text-[#637089] hover:text-[#d4af37] transition-colors duration-200">
                <PeopleAltOutlinedIcon sx={{ fontSize: 12 }} />
                View Leads
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[7px] border border-black/[0.03] shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
          {filtered.map((item) => (
            <ListingCard
              key={item.id}
              item={item}
              mode="list"
              showStatus
              showEditAction
              showDeleteAction
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
