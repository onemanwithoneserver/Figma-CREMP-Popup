import { LocationOn, DeleteOutline, Star } from '@mui/icons-material';
import type { WishlistItem } from '../types';

interface WishlistListProps {
  items: WishlistItem[];
  isDesktop?: boolean;
  onRemove: (id: string) => void;
}

export default function WishlistList({ items, isDesktop, onRemove }: WishlistListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 rounded-full bg-[#f8fafc] flex items-center justify-center mb-4">
          <Star sx={{ fontSize: '2rem', color: '#94a3b8' }} />
        </div>
        <p className="text-[#64748b] font-medium text-base">No items in this folder</p>
        <p className="text-[#94a3b8] text-sm mt-1">Add items to your wishlist to see them here</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isDesktop ? 'gap-4' : 'gap-3'}`}>
      {items.map((item) => (
        <WishlistListItem
          key={item.id}
          item={item}
          isDesktop={isDesktop}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

interface WishlistListItemProps {
  item: WishlistItem;
  isDesktop?: boolean;
  onRemove: (id: string) => void;
}

function WishlistListItem({ item, isDesktop, onRemove }: WishlistListItemProps) {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex border border-[#eef0f3] group">
      <div className={`relative shrink-0 overflow-hidden bg-[#f8fafc] ${isDesktop ? 'w-[16rem] min-h-[12rem]' : 'w-[8.5rem] min-h-[8.5rem]'}`}>
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className={`absolute bottom-0 right-0 px-2 py-1 bg-[#1a2640]/95 text-white font-medium rounded-tl ${
          isDesktop ? 'text-sm' : 'text-xs'
        }`}>
          {item.category}
        </div>
      </div>

      {/* ULTRA-PREMIUM DELETE ICON: Soft, muted flat style for white backgrounds */}
      <button
        onClick={(e) => { e.preventDefault(); onRemove(item.id); }}
        className={`absolute z-10 rounded-full flex items-center justify-center transition-all duration-300 group/btn ${
          isDesktop 
            ? 'top-4 right-4 p-2 bg-[#f8fafc] border border-transparent text-[#94a3b8] hover:bg-red-50 hover:border-red-100 hover:text-red-500' 
            : 'top-3 right-3 p-1.5 bg-[#f8fafc] border border-transparent text-[#94a3b8] active:bg-red-50 active:text-red-500'
        }`}
        title="Remove from wishlist"
      >
        <DeleteOutline 
          sx={{ fontSize: isDesktop ? '1.25rem' : '1.1rem' }} 
          className="transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:-rotate-3" 
        />
      </button>

      <div className={`flex-1 flex flex-col justify-center ${isDesktop ? 'p-4' : 'p-2.5'}`}>
        <div className={`flex items-start justify-between ${isDesktop ? 'gap-3 pr-8' : 'gap-2 pr-6'}`}>
          <div className="flex-1 min-w-0">
            <div className={`flex items-center gap-2 ${isDesktop ? 'mb-1' : 'mb-0.5'}`}>
              <h3 className={`font-bold text-[#192339] leading-tight truncate ${
                isDesktop ? 'text-xl' : 'text-[0.95rem]'
              }`}>
                {item.name}
              </h3>
            </div>

            <p className={`text-[#64748b] truncate ${isDesktop ? 'text-base mb-2' : 'text-xs mb-1.5'}`}>
              {item.tagline}
            </p>
          </div>
        </div>

        <div className={`flex flex-wrap items-center mt-auto ${
          isDesktop ? 'gap-4 pt-3 text-[0.95rem]' : 'gap-x-3 gap-y-1 pt-1.5 text-[0.75rem]'
        }`}>
          {item.investmentRange && (
            <div className="flex items-center gap-1">
              <span className="text-[#334155] ">Investment:</span>
              <span className="font-semibold text-[#192339]">{item.investmentRange}</span>
            </div>
          )}



          <div className={`flex items-center gap-1 ml-auto ${isDesktop ? '' : 'w-full mt-0.5'}`}>
            <LocationOn sx={{ fontSize: isDesktop ? '1.1rem' : '0.85rem', color: '#dca54a' }} />
            <span className="text-[#64748b] truncate">{item.location}</span>
          </div>
        </div>

        {/* Desktop View Details Button */}
        {isDesktop && (
          <div className="flex items-center justify-end mt-3 pt-2 ]">
            <button className="px-8 py-2.5 rounded-[4px] bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white text-sm font-medium shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide">
              View Details
            </button>
          </div>
        )}

        {/* Mobile View Details Button */}
        {!isDesktop && (
          <div className="mt-2.5 flex items-center gap-2">
            <button className="flex-1 px-3 py-2 rounded-[4px] bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white text-sm font-medium shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide">
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}