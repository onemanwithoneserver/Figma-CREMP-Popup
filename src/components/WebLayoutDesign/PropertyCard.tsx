import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface PropertyCardProps {
  id: number;
  title: string;
  details: string;
  location: string;
  price: string;
  image: string;
}

export default function PropertyCard({ title, price, image, details }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-sm border border-gray-100 shadow-sm flex flex-col w-full overflow-hidden">
      {/* Image Container */}
      <div className="h-[140px] overflow-hidden bg-[#f8fafc]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col bg-white">
        <h3 className="text-[14px] font-bold text-slate-800 leading-tight mb-1">{title}</h3>
        <p className="text-[11px] text-slate-500 mb-2">{details}</p>
        <p className="text-[16px] font-extrabold text-slate-900 mb-4">{price}</p>

        <button className="w-full py-2 bg-[#c9a34e] hover:bg-[#b38b3a] text-white text-[12px] font-semibold rounded-[4px] flex justify-center items-center gap-1 transition-colors">
          <span>View Details</span>
          <ChevronRightIcon sx={{ fontSize: 16 }} />
        </button>
      </div>
    </div>
  );
}