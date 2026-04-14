import { LocationOn, TrendingUp, DeleteOutline } from '@mui/icons-material';
import type { WishlistItem } from '../types';

interface WishlistGridProps {
  items: WishlistItem[];
  isDesktop?: boolean;
  onRemove: (id: string) => void;
}

export default function WishlistGrid({ items, isDesktop, onRemove }: WishlistGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 rounded-full bg-[#f8fafc] flex items-center justify-center mb-4">
          <TrendingUp sx={{ fontSize: '2rem', color: '#94a3b8' }} />
        </div>
        <p className="text-[#64748b] font-medium text-base">No items in this folder</p>
        <p className="text-[#94a3b8] text-sm mt-1">Add items to your wishlist to see them here</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'}`}>
      {items.map((item) => (
        <WishlistCard
          key={item.id}
          item={item}
          isDesktop={isDesktop}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

interface WishlistCardProps {
  item: WishlistItem;
  isDesktop?: boolean;
  onRemove: (id: string) => void;
}

function WishlistCard({ item, isDesktop, onRemove }: WishlistCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col border border-[#eef0f3] group">
      <div className="relative">
        <div className={`w-full bg-[#f8fafc] ${isDesktop ? 'h-[12rem]' : 'h-[8rem]'}`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={(e) => { e.preventDefault(); onRemove(item.id); }}
          className={`absolute z-10 rounded-full flex items-center justify-center transition-all duration-300 group/btn ${
            isDesktop
              ? 'top-3 right-3 p-2 bg-white/40 backdrop-blur-md border border-white/50 text-[#1e293b] shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-white hover:text-red-500 hover:shadow-[0_8px_20px_rgba(239,68,68,0.15)] hover:border-white'
              : 'top-2 right-2 p-1.5 bg-white/50 backdrop-blur-md border border-white/50 text-[#1e293b] shadow-sm active:bg-white active:text-red-500'
          }`}
          title="Remove from wishlist"
        >
          <DeleteOutline 
            sx={{ fontSize: isDesktop ? '1.2rem' : '1.1rem' }} 
            className="transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:-rotate-3" 
          />
        </button>

        <div className={`absolute bottom-0 right-0 px-2 py-1 bg-[#1a2640]/95 text-white font-medium rounded-tl ${
          isDesktop ? 'text-sm' : 'text-xs'
        }`}>
          {item.category}
        </div>
      </div>

      <div className={`flex flex-col flex-1 ${isDesktop ? 'p-2' : 'p-2'}`}>
        <h3 className={`font-bold text-[#192339] leading-tight mb-1 line-clamp-1 ${
          isDesktop ? 'text-lg' : 'text-sm'
        }`}>
          {item.name}
        </h3>

        <p className={`text-[#64748b] line-clamp-1 mb-3 ${isDesktop ? 'text-[0.95rem]' : 'text-xs'}`}>
          {item.tagline}
        </p>
        
        {item.investmentRange && (
          <div className={`text-[#334155] mb-2 ${isDesktop ? 'text-[0.95rem]' : 'text-xs'}`}>
            <span className="text-[#334155] ">Investment: </span>
            <span className="font-bold text-green-600">{item.investmentRange}</span>
          </div>
        )}

        <div className={`flex items-center gap-1 text-[#64748b] ${isDesktop ? 'text-sm' : 'text-[0.625rem]'}`}>
          <LocationOn sx={{ fontSize: isDesktop ? '1.1rem' : '0.875rem', color: '#dca54a' }} />
          <span className="line-clamp-1">{item.location}</span>
        </div>

        <div className="flex items-center justify-end  p-1">
          <button className={`rounded-[4px] bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white font-medium text-sm shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide ${
            isDesktop ? 'px-6 py-2.5' : 'w-full py-2'
          }`}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}