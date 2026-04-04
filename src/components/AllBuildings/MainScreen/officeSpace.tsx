import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface OfficeUnitData {
  name: string;
  image: string;
  floor: string;
  area: string;
  price: string;
  priceLabel: string;
  imageCount: string;
  justViewed?: boolean;
}

const officeUnits: OfficeUnitData[] = [
  {
    name: 'Office Unit B508',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80',
    floor: '5th Floor',
    area: '1,500 sq.ft.',
    price: '₹ 1.9 Crore',
    priceLabel: 'Rent',
    imageCount: '1/6',
  },
  {
    name: 'Office Unit C1009',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    floor: '10th Floor',
    area: '2,000 sq.ft.',
    price: '₹ 2.8 Crore',
    priceLabel: 'Rent',
    imageCount: '1/6',
    justViewed: true,
  },
  {
    name: 'Office Unit A712',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    floor: '7th Floor',
    area: '800 sq.ft.',
    price: '₹ 90 Lakh',
    priceLabel: 'Sale Value',
    imageCount: '1/6',
  },
];

const OfficeCard: React.FC<{ unit: OfficeUnitData }> = ({ unit }) => (
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
          {unit.floor} | {unit.area}
        </span>
      </div>

      <span className="text-[0.9rem] font-bold text-[#1c2a44] mt-1">
        {unit.price}
      </span>
      <span className="text-[0.6rem] text-[#1c2a44]/70">
        {unit.priceLabel}
      </span>

      <div className="mt-1 flex items-center justify-center gap-6 p-1 rounded bg-[#1c2a44] text-white cursor-pointer hover:bg-[#111A2B] transition-colors group [&:hover_.chevron-icon]:!hidden [&:hover_.arrow-icon]:!block">
        <span className="text-[0.7rem] font-semibold tracking-wide text-white">
          View Details
        </span>
        <ChevronRightIcon className="chevron-icon" sx={{ fontSize: 16, display: 'block', color: '#FFFFFF' }} />
        <ArrowForwardIcon className="arrow-icon" sx={{ fontSize: 16, display: 'none', color: '#FFFFFF' }} />
      </div>
    </div>
  </div>
);

const OfficeSpace: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-1 p-1">
      {officeUnits.map((unit, idx) => (
        <OfficeCard key={idx} unit={unit} />
      ))}
    </div>
  );
};

export default OfficeSpace;