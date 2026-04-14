import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// Removed ChevronLeftIcon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { listings as ListingsType } from '../data';

interface ListingsGridProps {
  listings: typeof ListingsType;
  selectedListingId: string | null;
  onSelect: (id: string | null) => void;
  isDesktop: boolean;
  onViewDetails?: (id: string) => void;
}

function formatInr(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

function formatRange(min: number, max: number): string {
  return `${formatInr(min)} – ${formatInr(max)}`;
}



function ViewDetailsBtn({ onClick, isDesktop = true }: { onClick: (e: React.MouseEvent) => void; isDesktop?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center justify-evenly transition-all duration-300 ease-out font-medium overflow-hidden relative bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-px active:translate-y-0 tracking-wide ${isDesktop
          ? 'rounded-[4px] w-[150px] pl-2 pr-2 h-[32px] text-[13px]'
          : 'rounded-[4px] w-full py-1 mt-1 text-[13px]'
        }`}
    >
      <span className="relative z-10 transition-transform group-hover:-translate-x-1">
        View Details
      </span>

      <div className="relative w-[16px] h-[16px] flex items-center justify-center overflow-hidden z-10">
        <ChevronRightIcon
          sx={{ fontSize: 16 }}
          className="absolute transition-all duration-300 opacity-100 translate-x-0 group-hover:opacity-0 group-hover:translate-x-4 text-white"
        />
        <ArrowForwardIcon
          sx={{ fontSize: 14 }}
          className="absolute transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-white"
        />
      </div>
    </button>
  );
}

function getImageUrl(category: string) {
  switch (category) {
    case 'Middle Eastern': return 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&q=80';
    case 'Food & Beverage': return 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80';
    case 'North Indian': return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80';
    case 'Beverages': return 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80';
    case 'Desserts': return 'https://images.unsplash.com/photo-1557142046-c704a3adf8f6?w=400&q=80';
    case 'Fast Food': return 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80';
    default: return 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80';
  }
}

function ListingCard({
  listing,
  isSelected,
  onSelect,
  isDesktop,
  isFeatured,
  onViewDetails,
}: {
  listing: (typeof ListingsType)[number];
  isSelected: boolean;
  onSelect: (id: string) => void;
  isDesktop: boolean;
  isFeatured?: boolean;
  onViewDetails?: (id: string) => void;
}) {
  const imageUrl = getImageUrl(listing.category);

  // === DESKTOP VIEW (Image-first vertical cards, 2 per row) ===
  if (isDesktop) {
    const typeLabel = listing.type === 'franchise-new' ? 'Franchise' : listing.type === 'running-business' ? 'Running Business' : listing.type === 'restaurant-lease' ? 'For Lease' : '';

    return (
      <div
        id={`listing-${listing.id}`}
        onClick={() => {
          onSelect(listing.id);
          onViewDetails?.(listing.id);
        }}
        className={`group bg-white rounded-[7px] border flex flex-col overflow-hidden transition-all duration-300 ease-out cursor-pointer h-full ${isSelected
          ? 'border-[#c9a34e] shadow-[0_8px_30px_rgba(201,163,78,0.2)] ring-1 ring-[#c9a34e]/30 -translate-y-1'
          : 'border-[#e8edf2] hover:border-[#c9a34e]/30 hover:shadow-[0_12px_36px_rgba(15,31,61,0.12)] hover:-translate-y-1'
          }`}
      >
        {/* === IMAGE ZONE === */}
        <div className="relative overflow-hidden h-[140px] flex-shrink-0">
          <img
            src={imageUrl}
            alt={listing.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        </div>

        {/* === CONTENT ZONE === */}
        <div className="flex flex-col flex-1 p-1.5 pt-1">
          {/* Header Area */}
          <div className="mb-2">
            <div className="flex justify-between items-start mb-0.5">
              <h3 className="font-extrabold text-[#0a162b] text-[15px] leading-tight tracking-tight line-clamp-1">
                {listing.name}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#1a3566] bg-[#eef2f8] px-1.5 py-0.5 rounded-[3px]">
                {listing.category}
              </span>
              {typeLabel && (
                <span className="text-[10px] font-semibold text-[#8a99b0]">• {typeLabel}</span>
              )}
            </div>
          </div>

          {/* Metrics - Compact tag-style layout */}
          <div className="flex flex-wrap gap-2 mb-2">
            {(listing.investmentMin !== undefined || listing.salePrice !== undefined) && (
              <div className="bg-[#f8fafc] border border-[#e8edf2] rounded-[5px] px-2 py-1 flex items-center gap-1.5">
                <span className="text-[10px] font-medium text-[#7a88a0]">Inv:</span>
                <span className="text-[11.5px] font-extrabold text-[#0a162b]">
                  {listing.investmentMin !== undefined
                    ? formatRange(listing.investmentMin, listing.investmentMax!)
                    : formatInr(listing.salePrice!)}
                </span>
              </div>
            )}
            {(listing.areaMin !== undefined || listing.area !== undefined) && (
              <div className="bg-[#f8fafc] border border-[#e8edf2] rounded-[5px] px-2 py-1 flex items-center gap-1.5">
                <span className="text-[10px] font-medium text-[#7a88a0]">Area:</span>
                <span className="text-[11.5px] font-extrabold text-[#0a162b]">
                  {listing.areaMin !== undefined
                    ? `${listing.areaMin}\u2013${listing.areaMax} sqft`
                    : `${listing.area} sqft`}
                </span>
              </div>
            )}
            {listing.monthlyRent !== undefined && (
              <div className="bg-[#f8fafc] border border-[#e8edf2] rounded-[5px] px-2 py-1 flex items-center gap-1.5">
                <span className="text-[10px] font-medium text-[#7a88a0]">Rent:</span>
                <span className="text-[11.5px] font-extrabold text-[#0a162b]">{formatInr(listing.monthlyRent)}</span>
              </div>
            )}
          </div>


          {/* CTA */}
          <div className="mt-auto flex justify-end">
            <ViewDetailsBtn
              onClick={() => {}}
              isDesktop={true}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isFeatured) {
    const typeLabel = listing.type === 'franchise-new' ? 'Franchise' : listing.type === 'running-business' ? 'Running Business' : listing.type === 'restaurant-lease' ? 'For Lease' : '';

    return (
      <div
        id={`listing-${listing.id}`}
        onClick={() => {
          onSelect(listing.id);
          onViewDetails?.(listing.id);
        }}
        className={`relative bg-white rounded-[7px] border border-[#e8edf2] transition-all duration-300 ease-out cursor-pointer overflow-hidden flex flex-row w-full ${isSelected
          ? 'shadow-[0_8px_30px_rgba(201,163,78,0.15)] ring-1 ring-[#c9a34e]/30'
          : 'hover:shadow-[0_12px_40px_rgba(15,31,61,0.08)]'
          }`}
      >
        {/* Premium Gradient Top Line */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#0a162b] via-[#637089] to-[#c9a34e] z-10" />

        <div className="flex flex-col flex-1 p-4 pr-3 pt-5">
          <div className="mb-3">
            <h3 className="font-extrabold text-[#0a162b] text-[16px] leading-tight mb-1 tracking-tight">
              {listing.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#1a3566] bg-[#eef2f8] px-1.5 py-0.5 rounded-[3px]">
                {listing.category}
              </span>
              {typeLabel && (
                <span className="text-[10px] font-semibold text-[#8a99b0]">• {typeLabel}</span>
              )}
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 mb-2">
            {(listing.investmentMin !== undefined || listing.salePrice !== undefined) && (
              <div className="flex flex-col">
                <span className="text-[9px] font-semibold text-[#7a88a0] mb-[1px]">Investment</span>
                <span className="text-[11px] font-bold text-[#0a162b] leading-none">
                  {listing.investmentMin !== undefined
                    ? formatRange(listing.investmentMin, listing.investmentMax!)
                    : formatInr(listing.salePrice!)}
                </span>
              </div>
            )}
            {(listing.areaMin !== undefined || listing.area !== undefined) && (
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-[#7a88a0] mb-[1px]">Area</span>
                <span className="text-[11px] font-bold text-[#0a162b] leading-none">
                  {listing.areaMin !== undefined ? `${listing.areaMin}ft²` : `${listing.area}ft²`}
                </span>
              </div>
            )}
            {listing.monthlyRent !== undefined && (
              <div className="flex flex-col">
                <span className="text-[9px] font-semibold text-[#7a88a0] mb-[1px]">Rent</span>
                <span className="text-[11px] font-bold text-[#0a162b] leading-none">{formatInr(listing.monthlyRent)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Image Section with Hover Action */}
        <div className="relative w-[45%] flex-shrink-0 min-h-[140px] group/img overflow-hidden">
          <img
            src={imageUrl}
            alt={listing.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
            <button
              className="bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white text-[11px] font-medium px-4 py-2 rounded-[4px] shadow-[0_4px_10px_rgba(212,175,55,0.2)] tracking-wide flex items-center gap-1.5 transform translate-y-4 group-hover/img:translate-y-0 transition-all duration-300"
            >
              View Details
              <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === MOBILE VIEW: GRID ITEM (Bento Box Half Width) ===
  const typeLabel = listing.type === 'franchise-new' ? 'Franchise' : listing.type === 'running-business' ? 'Running Business' : listing.type === 'restaurant-lease' ? 'For Lease' : '';

  return (
    <div
      id={`listing-${listing.id}`}
      onClick={() => {
        onSelect(listing.id);
        onViewDetails?.(listing.id);
      }}
      className={`group bg-white rounded-[7px] border border-[#e8edf2] transition-all duration-300 ease-out cursor-pointer overflow-hidden flex flex-col h-full ${isSelected
        ? 'border-[#c9a34e] shadow-[0_6px_24px_rgba(201,163,78,0.15)] ring-1 ring-[#c9a34e]/30'
        : 'hover:border-transparent hover:shadow-[0_8px_24px_rgba(15,31,61,0.06)] hover:-translate-y-0.5'
        }`}
    >
      <div className="relative w-full h-[120px]">
        <img src={imageUrl} alt={listing.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col flex-1 p-3">
        <div className="mb-2">
          <h3 className="font-extrabold text-[#0a162b] text-[14px] leading-tight tracking-tight line-clamp-1 mb-1">
            {listing.name}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[9px] font-bold text-[#1a3566] bg-[#eef2f8] px-1 py-0.5 rounded-[2px]  tracking-wider">
              {listing.category}
            </span>
            {typeLabel && (
              <span className="text-[9px] font-semibold text-[#8a99b0]">{typeLabel}</span>
            )}
          </div>
        </div>

        <div className="mt-auto pt-1 flex flex-col gap-1.5 text-[12px] mb-3">
          {(listing.investmentMin !== undefined || listing.salePrice !== undefined) && (
            <div className="text-[#637089] font-medium tracking-tight flex justify-between">
              <span>Inv:</span>
              <span className="text-[#0a162b] font-bold ml-0.5">
                {listing.investmentMin !== undefined
                  ? formatRange(listing.investmentMin, listing.investmentMax!)
                  : formatInr(listing.salePrice!)}
              </span>
            </div>
          )}
          {(listing.areaMin !== undefined || listing.area !== undefined) && (
            <div className="text-[#637089] font-medium tracking-tight flex justify-between">
              <span>Area:</span>
              <span className="text-[#0a162b] font-bold ml-0.5">
                {listing.areaMin !== undefined ? `${listing.areaMin}ft²` : `${listing.area}ft²`}
              </span>
            </div>
          )}
          {listing.monthlyRent !== undefined && (
            <div className="text-[#637089] font-medium tracking-tight flex justify-between">
              <span>Rent:</span>
              <span className="text-[#0a162b] font-bold ml-0.5">{formatInr(listing.monthlyRent)}</span>
            </div>
          )}
        </div>

        <ViewDetailsBtn
          onClick={() => {}}
          isDesktop={false}
        />
      </div>
    </div>
  );
}

export default function ListingsGrid({ listings, selectedListingId, onSelect, isDesktop, onViewDetails }: ListingsGridProps) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-[#9aa5b8]">
        <LocationOnIcon sx={{ fontSize: 40, opacity: 0.3 }} />
        <p className="mt-3 text-sm font-medium">No listings found</p>
        <p className="text-xs">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-5 ${isDesktop ? 'grid-cols-2' : 'grid-cols-2 p-2'}`}>
      {listings.map((listing, index) => {
        const isFeatured = !isDesktop && index === 0;
        return (
          <div key={listing.id} className={isFeatured ? 'col-span-2' : 'col-span-1'}>
            <ListingCard
              listing={listing}
              isSelected={listing.id === selectedListingId}
              onSelect={onSelect}
              isDesktop={isDesktop}
              isFeatured={isFeatured}
              onViewDetails={onViewDetails}
            />
          </div>
        );
      })}
    </div>
  );
}
