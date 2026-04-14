import { LocationOn, TrendingUp } from '@mui/icons-material';
import type { Property } from '../Handpicked';

interface PropertyGridProps {
  properties: Property[];
  isDesktop: boolean;
}

export default function PropertyGrid({ properties, isDesktop }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-full bg-[#f8fafc] flex items-center justify-center mb-3">
          <TrendingUp sx={{ fontSize: '2rem', color: '#94a3b8' }} />
        </div>
        <p className="text-[#64748b] font-medium text-base">No properties found</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'}`}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} isDesktop={isDesktop} />
      ))}
    </div>
  );
}

function PropertyCard({ property, isDesktop }: { property: Property; isDesktop: boolean }) {
  const badgeText = property.tags && property.tags.length > 0 ? property.tags[0] : property.category;

  const formatEarnings = (val: string) => {
    if (!val) return 'Contact for details';
    const lowerVal = val.toLowerCase();
    return lowerVal.includes('month') || lowerVal.includes('/') ? val : `${val} per month`;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col border border-[#eef0f3] group">
      <div className="relative">
        <div className={`w-full bg-[#f8fafc] ${isDesktop ? 'h-[12rem]' : 'h-[7.5rem]'}`}>
          <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
        </div>
        {badgeText && (
          <div className={`absolute bottom-0 right-0 px-2 py-1 bg-[#1a2640]/95 text-white font-medium rounded-tl ${isDesktop ? 'text-[0.85rem]' : 'text-[0.65rem]'}`}>
            {badgeText}
          </div>
        )}
      </div>

      <div className={`flex flex-col flex-1 ${isDesktop ? 'p-2' : 'p-1.5'}`}>
        <h3 className={`font-bold text-[#192339] leading-tight mb-1 line-clamp-1 ${isDesktop ? 'text-lg' : 'text-sm'}`}>
          {property.name}
        </h3>
        
        <p className={`text-[#64748b] line-clamp-1 mb-3 ${isDesktop ? 'text-base' : 'text-[0.7rem]'}`}>
          {property.tagline}
        </p>

        <div className="space-y-1 mb-2">
          <div className={`${isDesktop ? 'text-[0.95rem]' : 'text-[0.75rem]'} flex items-center gap-1.5`}>
            <span className="text-[#94a3b8]">Investment:</span>
            <span className="font-bold text-[#192339]">
              {property.investmentRange || 'N/A'}
            </span>
          </div>
          
          <div className={`${isDesktop ? 'text-[0.95rem]' : 'text-[0.75rem]'} flex items-center gap-1.5`}>
            <span className="text-[#94a3b8]">Earns:</span>
            <span className="font-bold text-green-600">
              {formatEarnings(property.monthlyRevenue)}
            </span>
          </div>
        </div>

        <div className={`flex items-center gap-1.5 text-[#64748b] mb-4 mt-auto ${isDesktop ? 'text-sm' : 'text-[0.6rem]'}`}>
          <LocationOn sx={{ fontSize: isDesktop ? '1.15rem' : '0.8rem', color: '#dca54a' }} />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center justify-end  p-1">
          <button className={`bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white font-medium text-sm rounded-[4px] shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide ${
            isDesktop ? 'px-6 py-2.5' : 'w-full py-2'
          }`}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}