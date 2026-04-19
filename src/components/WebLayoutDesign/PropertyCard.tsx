import React from 'react';

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
    <div className="bg-white rounded-[8px] overflow-hidden shadow-sm border border-gray-200 flex flex-col w-full">
      <div className="w-full relative h-[170px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col bg-white">
        <h3 className="text-[17px] font-bold text-[#06264c] leading-tight mb-1.5">{title}</h3>
        <p className="text-[13px] font-normal text-[#5b6e8a] mb-3">{details}</p>

        <p className="text-[20px] font-bold text-[#06264c] leading-none mb-4">{price}</p>

        <button className="w-full py-2.5 bg-[#c29c3f] hover:bg-[#b08c35] text-white text-[14px] font-bold rounded-[6px] flex justify-center items-center relative transition-colors shadow-sm">
          <span>View Details</span>
          <svg className="absolute right-3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}