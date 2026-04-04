import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const FeaturedCoWorking: React.FC = () => (
  <div className="relative flex items-stretch m-1 p-1 rounded-md border border-[#1c2a44]/10 border-t-0 shadow-md shadow-[#1c2a44]/5 bg-white transition-all duration-300 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#1c2a44]/10 group overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#1c2a44] via-[#3b5998] to-[#D4AF37] z-10" />

    <div className="flex flex-1 gap-1">
      <div className="flex-1 flex flex-col justify-between p-1">
        <div>
          <h3 className="text-[0.9rem] font-bold text-[#1c2a44] leading-tight">
            Co-Work Hub 305
          </h3>
          <p className="text-[0.75rem] text-[#1c2a44]/70 mt-1">
            3rd Floor <span className="text-[#D4AF37]">•</span> 50 Seats
          </p>

          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-1">
              <WifiIcon sx={{ fontSize: 14 }} className="text-[#D4AF37]" />
              <span className="text-[0.6rem] text-[#1c2a44]/70 tracking-wide">High-Speed</span>
            </div>
            <div className="flex items-center gap-1">
              <LocalCafeIcon sx={{ fontSize: 14 }} className="text-[#D4AF37]" />
              <span className="text-[0.6rem] text-[#1c2a44]/70 tracking-wide">Cafeteria</span>
            </div>
            <div className="flex items-center gap-1">
              <MeetingRoomIcon sx={{ fontSize: 14 }} className="text-[#D4AF37]" />
              <span className="text-[0.6rem] text-[#1c2a44]/70 tracking-wide">Meeting</span>
            </div>
          </div>
        </div>

        <div className="flex gap-1 mt-1">
          <div className="pr-1">
            <span className="block text-[0.6rem] text-[#1c2a44]/70 tracking-wide">Per Seat</span>
            <span className="block text-[0.8rem] font-bold text-[#1c2a44]">₹ 8,500/mo</span>
          </div>
          <div>
            <span className="block text-[0.6rem] text-[#1c2a44]/70 tracking-wide">Full Floor</span>
            <span className="block text-[0.8rem] font-bold text-[#1c2a44]">₹ 3.5 Lakh/mo</span>
          </div>
        </div>
      </div>

      <div className="w-[80px] shrink-0 rounded border border-[#1c2a44]/5 bg-[#f8fafc] flex items-center justify-center">
        <GroupsIcon sx={{ fontSize: 28 }} className="text-[#D4AF37]" />
      </div>
    </div>
  </div>
);

interface CoWorkUnit {
  name: string;
  floor: string;
  seats: string;
  price: string;
  priceLabel: string;
}

const coWorkUnits: CoWorkUnit[] = [
  {
    name: 'Flex Desk Zone',
    floor: '4th Floor',
    seats: '30 Seats',
    price: '₹ 6,000/mo',
    priceLabel: 'Per Seat',
  },
  {
    name: 'Private Suite 601',
    floor: '6th Floor',
    seats: '10 Seats',
    price: '₹ 1.2 Lakh/mo',
    priceLabel: 'Full Suite',
  },
  {
    name: 'Hot Desk Area',
    floor: '2nd Floor',
    seats: '80 Seats',
    price: '₹ 4,500/mo',
    priceLabel: 'Per Seat',
  },
];

const CoWorkCard: React.FC<{ unit: CoWorkUnit }> = ({ unit }) => (
  <div className="flex flex-col rounded-md border border-[#1c2a44]/10 shadow-sm shadow-[#1c2a44]/5 bg-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-md hover:shadow-[#1c2a44]/10">
    <div className="relative h-[110px] bg-[#f8fafc] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=400&q=80"
        alt={unit.name}
        className="w-full h-full object-cover block"
      />
    </div>

    <div className="p-1 flex flex-col">
      <h4 className="text-[0.85rem] font-bold text-[#1c2a44] leading-tight">
        {unit.name}
      </h4>
      
      <div className="flex items-center gap-1 mt-1">
        <span className="text-[0.65rem] text-[#1c2a44]/70">
          {unit.floor} <span className="text-[#D4AF37]">•</span> {unit.seats}
        </span>
      </div>

      <span className="text-[0.9rem] font-bold text-[#1c2a44] mt-1">
        {unit.price}
      </span>
      <span className="text-[0.6rem] text-[#1c2a44]/70 tracking-wide">
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

const CoWorkingSpaces: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 p-1">
      <FeaturedCoWorking />
      <div className="grid grid-cols-2 gap-1">
        {coWorkUnits.map((unit, idx) => (
          <CoWorkCard key={idx} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default CoWorkingSpaces;