import { useState } from 'react';
import { Heart, MapPin, ArrowRight } from 'lucide-react';

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
  category: 'Food & Beverage',
  imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop&q=80',
};

const InvestmentIcon = ({ color }: { color: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 12h8M12 8v8"/>
  </svg>
);

const AreaIcon = ({ color }: { color: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
);

const CategoryIcon = ({ color }: { color: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l1.5-4.5h15L21 9"/>
    <path d="M3 9v2a2 2 0 004 0v-2"/>
    <path d="M7 9v2a2 2 0 004 0v-2"/>
    <path d="M11 9v2a2 2 0 004 0v-2"/>
    <path d="M15 9v2a2 2 0 004 0v-2"/>
    <path d="M19 9v2a2 2 0 004 0v-2"/>
    <path d="M4 11v8h16v-8"/>
  </svg>
);

export default function PropertyCard({ property = defaultProperty }: PropertyCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className="w-full max-w-[360px] mx-auto bg-white rounded-[12px] p-2 flex gap-2.5 border border-[#F1F5F9] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="w-[84px] h-[84px] shrink-0 rounded-[8px] bg-[#F8FAFC] overflow-hidden relative">
        {!imgError && property.imageUrl ? (
          <img 
            src={property.imageUrl} 
            alt={property.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F8FAFC]">
            <CategoryIcon color="#CBD5E1" />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col min-w-0 py-0.5 pr-0.5">
        <div className="flex items-start justify-between">
          <span className="bg-[#d4af37]/10 text-[#b8903c] text-[8px] font-semibold px-1.5 py-0.5 rounded leading-tight tracking-wide">
            {property.tag}
          </span>
          <button 
            className="text-[#0F172A] hover:text-[#d4af37] active:scale-95 transition-all focus-visible:outline-none -mt-0.5"
            aria-label="Save to favorites"
          >
            <Heart size={14} strokeWidth={1.8} />
          </button>
        </div>

        <h3 className="text-[12.5px] font-bold text-[#0F172A] leading-tight line-clamp-1 mt-1">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 mt-1">
          <MapPin size={9} strokeWidth={2.5} className="text-[#64748B] shrink-0" />
          <div className="flex items-center gap-1 text-[8.5px] min-w-0">
            <span className="font-medium text-[#475569] truncate leading-none mt-[1px]">
              {property.location}
            </span>
            <div className="w-[1px] h-2 bg-[#CBD5E1] shrink-0" />
            <span className="text-[#64748B] whitespace-nowrap leading-none mt-[1px]">
              {property.distance}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between w-full mt-auto pt-1.5">
          <div className="flex items-center gap-2 flex-1 min-w-0 pr-1">
            
            <div className="flex gap-1 items-start shrink-0">
              <div className="pt-[1.5px]">
                <InvestmentIcon color="#475569" />
              </div>
              <div className="flex flex-col gap-[1px]">
                <span className="text-[8.5px] font-bold text-[#0F172A] leading-none">
                  {property.investment}
                </span>
                <span className="text-[7px] font-medium text-[#64748B] leading-none">
                  Investment
                </span>
              </div>
            </div>

            <div className="flex gap-1 items-start shrink-0">
              <div className="pt-[1.5px]">
                <AreaIcon color="#475569" />
              </div>
              <div className="flex flex-col gap-[1px]">
                <span className="text-[8.5px] font-bold text-[#0F172A] leading-none">
                  {property.area}
                </span>
                <span className="text-[7px] font-medium text-[#64748B] leading-none">
                  Area
                </span>
              </div>
            </div>

          </div>

          <button 
            className="w-[24px] h-[24px] rounded-full text-white flex items-center justify-center shrink-0 active:scale-95 transition-transform shadow-md focus-visible:outline-none"
            style={{ background: 'linear-gradient(135deg, #0a1128 0%, #1a3463 100%)' }}
            aria-label={`View details for ${property.title}`}
          >
            <ArrowRight size={12} strokeWidth={2.5} color="#FFFFFF" />
          </button>
        </div>
      </div>
    </div>
  );
}