import { useState } from 'react';
import { Heart, MapPin, HandCoins, LayoutGrid, ArrowRight } from 'lucide-react';

export interface PropertyData {
  id: string;
  tag: string;
  title: string;
  location: string;
  distance: string;
  investment: string;
  area: string;
  category?: string;
  imageUrl?: string;
}

interface PropertyCardProps {
  property?: PropertyData;
}

const defaultProperty: PropertyData = {
  id: '1',
  tag: 'New Franchise',
  title: 'Chai Point Franchise',
  location: 'Madhapur, Hyderabad',
  distance: '0.8 km from you',
  investment: '₹ 18 L',
  area: '250 - 500 sq.ft',
  imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop&q=80',
};

export default function PropertyCard({ property = defaultProperty }: PropertyCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className="w-full bg-white rounded-[16px] p-3 flex gap-3.5 border border-[#F1F5F9] shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="w-[100px] h-[100px] shrink-0 rounded-[12px] bg-[#F8FAFC] overflow-hidden relative">
        {!imgError && property.imageUrl ? (
          <img 
            src={property.imageUrl} 
            alt={property.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F8FAFC]">
            <LayoutGrid size={24} className="text-[#CBD5E1]" />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
        <div className="flex flex-col">
          <div className="flex items-start justify-between">
            <span className="bg-[#F3E8FF] text-[#7C3AED] text-[10px] font-semibold px-2.5 py-1 rounded-md leading-none tracking-wide">
              {property.tag}
            </span>
            <button 
              className="text-[#64748B] hover:text-[#EF4444] active:scale-95 transition-all focus-visible:outline-none -mt-0.5 -mr-0.5"
              aria-label="Save to favorites"
            >
              <Heart size={16} strokeWidth={2} />
            </button>
          </div>

          <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight line-clamp-1 mt-1.5">
            {property.title}
          </h3>

          <div className="flex items-start gap-1.5 text-[#64748B] mt-1">
            <div className="mt-[2px]">
              <MapPin size={12} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-medium truncate max-w-[130px] leading-none mt-[1px]">
                {property.location}
              </span>
              <span className="text-[10px] text-[#94A3B8] leading-none whitespace-nowrap">
                {property.distance}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between w-full pt-2">
          <div className="flex items-center gap-4 flex-1 min-w-0 pr-2">
            
            <div className="flex gap-1.5 items-start shrink-0">
              <div className="pt-[1px]">
                <HandCoins size={14} strokeWidth={2} className="text-[#64748B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#0F172A] leading-none">
                  {property.investment}
                </span>
                <span className="text-[9px] text-[#64748B] mt-1 leading-none">
                  Investment
                </span>
              </div>
            </div>

            <div className="flex gap-1.5 items-start shrink-0">
              <div className="pt-[1px]">
                <LayoutGrid size={14} strokeWidth={2} className="text-[#64748B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#0F172A] leading-none">
                  {property.area}
                </span>
                <span className="text-[9px] text-[#64748B] mt-1 leading-none">
                  Area
                </span>
              </div>
            </div>

          </div>

          <button 
            className="w-[32px] h-[32px] rounded-full bg-[#0B1320] text-white flex items-center justify-center shrink-0 hover:bg-[#1E293B] active:scale-95 transition-transform shadow-md focus-visible:outline-none"
            aria-label={`View details for ${property.title}`}
          >
            <ArrowRight size={16} strokeWidth={2} color="#FFFFFF" />
          </button>
        </div>
      </div>
    </div>
  );
}