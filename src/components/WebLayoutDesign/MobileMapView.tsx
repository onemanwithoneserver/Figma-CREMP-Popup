import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
}

interface MobileMapViewProps {
  properties: Property[];
}

export default function MobileMapView({ properties }: MobileMapViewProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const tabs = [
    {
      id: 'home', label: 'Home',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#c9a34e' : '#9aa4b8'}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      id: 'rent', label: 'Rent/Lease',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#c9a34e' : '#9aa4b8'}>
          <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
      ),
    },
    {
      id: 'buy', label: 'Buy',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#c9a34e' : '#9aa4b8'}>
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
        </svg>
      ),
    },
    {
      id: 'business', label: 'Business',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#c9a34e' : '#9aa4b8'}>
          <path d="M20 6h-2.18c.07-.44.18-.86.18-1.3C18 2.12 15.88 0 13.3 0c-1.3 0-2.4.52-3.22 1.35L8 3.37 5.92 1.35C5.1.52 4 0 2.7 0 .12 0-2 2.12-2 4.7c0 .44.11.86.18 1.3H-2v2h2v12h18V8h2V6z" />
        </svg>
      ),
    },
    {
      id: 'saved', label: 'Saved',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#c9a34e' : '#9aa4b8'}>
          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      ),
    },
  ];

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 60) setCurrentIndex((p) => (p + 1) % properties.length);
    if (touchStart - touchEnd < -60) setCurrentIndex((p) => (p - 1 + properties.length) % properties.length);
  };

  const prop = properties[currentIndex];

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] w-full">
      <div
        className="flex-1 relative bg-[#e8e9ec] w-full overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
          <button className="w-7 h-7 bg-white rounded-[4px] flex items-center justify-center shadow-sm shadow-[#1c2a44]/5 border border-[#1c2a44]/10 hover:bg-[#f8fafc] transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1c2a44" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button className="w-7 h-7 bg-white rounded-[4px] flex items-center justify-center shadow-sm shadow-[#1c2a44]/5 border border-[#1c2a44]/10 hover:bg-[#f8fafc] transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1c2a44" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14" />
            </svg>
          </button>
          <button className="w-7 h-7 bg-white rounded-[4px] flex items-center justify-center shadow-sm shadow-[#1c2a44]/5 border border-[#1c2a44]/10 hover:bg-[#f8fafc] transition-colors mt-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1c2a44" strokeWidth="1.8">
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
              <path d="M12 2l1.5 5.5L12 10l-1.5-2.5L12 2z" fill="#1c2a44" strokeWidth="0" />
            </svg>
          </button>
        </div>

        <div
          className="absolute bottom-6 left-0 w-full px-4 z-20"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-white rounded-[4px] border border-[#1c2a44]/10 shadow-md shadow-[#1c2a44]/5 flex flex-col w-full transition-all duration-300">
            <div style={{ height: 160 }} className="overflow-hidden relative bg-[#f8fafc]">
              <div className="absolute top-0 left-0 bg-[#1c2a44] text-[#D4AF37] text-[9px] font-bold px-2 py-1 tracking-wider  z-10 rounded-br-[4px]">
                SPONSORED
              </div>
              <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
            </div>
            <div className="px-4 pt-3 pb-4 flex flex-col bg-white rounded-b-[4px]">
              <p className="text-[0.8rem] font-medium text-[#1c2a44]/70 mb-1">{prop.location}</p>
              <h3 className="text-[1rem] font-bold text-[#1c2a44] leading-tight mb-1">{prop.title}</h3>
              <p className="text-[1.1rem] font-bold text-[#1c2a44] leading-none mb-4">{prop.price}</p>
              <button className="w-full py-2 bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white text-[0.85rem] font-medium tracking-wide rounded-[4px] flex justify-center items-center gap-2 shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] transition-all duration-300 group [&:hover_.chevron-icon]:!hidden [&:hover_.arrow-icon]:!flex">
                <span>View Details</span>
                <div className="flex items-center justify-center">
                  <ChevronRightIcon className="chevron-icon" sx={{ fontSize: 18, color: '#FFFFFF' }} />
                  <ArrowForwardIcon className="arrow-icon" sx={{ fontSize: 18, color: '#FFFFFF', display: 'none' }} />
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-4 mb-2">
            {properties.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-6 bg-[#0a1128]' : 'w-1.5 bg-[#d1d5e0]'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-[#f0f1f3] px-3 py-2 grid grid-cols-5 sticky bottom-0 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex flex-col items-center gap-0.5 py-1">
              {tab.icon(active)}
              <span className={`text-[9px] font-medium ${active ? 'text-[#c9a34e]' : 'text-[#9aa4b8]'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}