import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PropertyCardProps {
  title?: string;
  details?: string;
  price?: string;
  image?: string;
}

export default function PropertyCard({
  title = "Office Unit B508",
  details = "5th Floor | 1,500 sq.ft.",
  price = "₹ 1.9 Crore",
  image = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
}: PropertyCardProps) {
  return (
    <div className="bg-white rounded-[4px] border border-[#1c2a44]/10 shadow-md shadow-[#1c2a44]/5 flex flex-col w-full transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-[#1c2a44]/10">
      <div className="w-full relative h-[170px] bg-[#f8fafc]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col bg-white rounded-b-[4px]">
        <h3 className="text-[1rem] font-bold text-[#1c2a44] leading-tight mb-1">{title}</h3>
        <p className="text-[0.8rem] font-medium text-[#1c2a44]/70 mb-3">{details}</p>

        <p className="text-[1.1rem] font-bold text-[#1c2a44] leading-none mb-4">{price}</p>

        <button className="w-full py-2 bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white text-[0.85rem] font-medium tracking-wide rounded-[4px] flex justify-center items-center gap-2 shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 group [&:hover_.chevron-icon]:!hidden [&:hover_.arrow-icon]:!flex">
          <span>View Details</span>
          <div className="flex items-center justify-center">
            <ChevronRightIcon className="chevron-icon" sx={{ fontSize: 18, color: '#FFFFFF' }} />
            <ArrowForwardIcon className="arrow-icon" sx={{ fontSize: 18, color: '#FFFFFF', display: 'none' }} />
          </div>
        </button>
      </div>
    </div>
  );
}