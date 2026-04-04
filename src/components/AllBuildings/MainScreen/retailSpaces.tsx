import React from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const FeaturedCard: React.FC = () => (
  <div className="relative flex items-stretch h-[140px] m-1 p-1 rounded-md border border-[#1c2a44]/10 border-t-0 shadow-md shadow-[#1c2a44]/5 bg-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#1c2a44]/10 group overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#1c2a44] via-[#3b5998] to-[#D4AF37] z-10" />

    <div className="flex-1 flex flex-col justify-between p-1">
      <div>
        <h3 className="text-[1rem] font-bold text-[#1c2a44] leading-tight">
          Retail Unit A105
        </h3>
        <p className="text-[0.8rem] text-[#1c2a44]/70 mt-1">
          Ground Floor | 1,200 sq.ft.
        </p>

        <div className="inline-flex items-center gap-1 mt-1 p-1 rounded bg-[#f8fafc] border border-[#1c2a44]/5">
          <div className="w-[6px] h-[6px] rounded-full bg-[#D4AF37]" />
          <span className="text-[0.7rem] font-semibold text-[#1c2a44]">
            Tenant: Starbucks
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-1">
        <span className="text-[0.7rem] text-[#1c2a44]/70">Sale Value:</span>
        <span className="text-[0.9rem] font-bold text-[#1c2a44]">₹ 2.5 Crore</span>
      </div>
    </div>

    <div className="w-[160px] rounded overflow-hidden shrink-0 relative bg-[#f8fafc]">
      <img
        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
        alt="Retail Unit A105"
        className="w-full h-full object-cover block"
      />

      <div className="absolute inset-0 bg-[#1c2a44]/60 flex items-center justify-center opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-20">
        {/* Added Tailwind arbitrary targeting to override MUI inline styles */}
        <div className="flex items-center justify-center gap-6 px-2 py-1 rounded bg-[#1c2a44] text-white cursor-pointer transition-colors duration-200 hover:bg-[#111A2B] group [&:hover_.chevron-icon]:!hidden [&:hover_.arrow-icon]:!block">
          <span className="text-[0.75rem] font-semibold tracking-wide text-white">
            View Details
          </span>
          <ChevronRightIcon className="chevron-icon" sx={{ fontSize: 16, display: 'block', color: '#FFFFFF' }} />
          <ArrowForwardIcon className="arrow-icon" sx={{ fontSize: 16, display: 'none', color: '#FFFFFF' }} />
        </div>
      </div>
    </div>
  </div>
);

interface UnitCardData {
  name: string;
  tag: string;
  tagIcon: React.ReactNode;
  image: string;
  floor: string;
  area?: string;
  price: string;
  priceLabel: string;
  imageCount?: string;
  justViewed?: boolean;
}

const retailCards: UnitCardData[] = [
  {
    name: 'Retail Unit A215',
    tag: 'Retail',
    tagIcon: <ApartmentIcon sx={{ fontSize: 12, color: '#FFFFFF' }} />,
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=400&q=80',
    floor: 'Second Floor',
    price: '₹ 2.5 Crore',
    priceLabel: 'Sale Value',
    imageCount: '1/6',
    justViewed: true,
  },
  {
    name: 'Retail Unit G08',
    tag: 'Retail',
    tagIcon: <ApartmentIcon sx={{ fontSize: 12, color: '#FFFFFF' }} />,
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=400&q=80',
    floor: 'Ground Floor',
    area: '950 sq.ft.',
    price: '₹ 1.8 Lakh/mo',
    priceLabel: 'Rent',
    imageCount: '1/4',
  },
];

const UnitCard: React.FC<{ unit: UnitCardData }> = ({ unit }) => (
  <div className="flex flex-col rounded-md border border-[#1c2a44]/10 shadow-sm shadow-[#1c2a44]/5 bg-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-md hover:shadow-[#1c2a44]/10">
    <div className="relative h-[110px] bg-[#f8fafc]">
      <img
        src={unit.image}
        alt={unit.name}
        className="w-full h-full object-cover block"
      />

      {unit.justViewed && (
        <div className="absolute inset-0 bg-[#1c2a44]/45 flex items-center justify-center z-10">
          <span className="text-[0.8rem] font-bold text-white italic tracking-wide drop-shadow-md">
            Just Viewed
          </span>
        </div>
      )}

      <div className="absolute top-1/2 left-1 -translate-y-1/2 bg-[#1c2a44]/40 hover:bg-[#1c2a44]/80 rounded-full p-[2px] cursor-pointer z-20 transition-colors">
        <ChevronLeftIcon sx={{ color: '#FFFFFF', fontSize: 16 }} />
      </div>
      <div className="absolute top-1/2 right-1 -translate-y-1/2 bg-[#1c2a44]/40 hover:bg-[#1c2a44]/80 rounded-full p-[2px] cursor-pointer z-20 transition-colors">
        <ChevronRightIcon sx={{ color: '#FFFFFF', fontSize: 16 }} />
      </div>

      {unit.imageCount && (
        <div className="absolute bottom-1 right-1 px-1 py-[2px] rounded bg-[#1c2a44]/90 z-20">
          <span className="text-[0.65rem] text-[#D4AF37] font-bold">
            {unit.imageCount}
          </span>
        </div>
      )}
    </div>

    <div className="p-1 flex flex-col">
      <h4 className="text-[0.85rem] font-bold text-[#1c2a44] leading-tight">
        {unit.name}
      </h4>
      
      <div className="flex items-center gap-1 mt-1">
        <span className="text-[0.65rem] text-[#1c2a44]/70">
          {unit.floor}
          {unit.area ? ` | ${unit.area}` : ''}
        </span>
      </div>

      <span className="text-[0.9rem] font-bold text-[#1c2a44] mt-1">
        {unit.price}
      </span>
      <span className="text-[0.6rem] text-[#1c2a44]/70">
        {unit.priceLabel}
      </span>
      <div className="mt-1 flex items-center justify-center gap-6 p-1  rounded bg-[#1c2a44] text-white cursor-pointer hover:bg-[#111A2B] transition-colors group [&:hover_.chevron-icon]:!hidden [&:hover_.arrow-icon]:!block">
        <span className="text-[0.7rem] font-semibold tracking-wide text-white">
          View Details
        </span>
        <ChevronRightIcon className="chevron-icon" sx={{ fontSize: 16, display: 'block', color: '#FFFFFF' }} />
        <ArrowForwardIcon className="arrow-icon" sx={{ fontSize: 16, display: 'none', color: '#FFFFFF' }} />
      </div>
    </div>
  </div>
);

const RetailSpaces: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 p-1">
      <FeaturedCard />
      <div className="grid grid-cols-2 gap-1">
        {retailCards.map((unit, idx) => (
          <UnitCard key={idx} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default RetailSpaces;