import { useState } from 'react';

export default function MapView() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="flex-1 relative bg-[#e8e9ec] flex flex-col h-full w-full" style={{ minHeight: 500 }}>
      <div
        className="flex-1 bg-[#e8e9ec] transition-transform duration-300 w-full h-full"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute top-4 right-4 flex flex-col gap-1 z-10">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.2, 2.5))}
          className="w-8 h-8 bg-white rounded-[4px] flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.12)] hover:bg-gray-50 transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.2, 0.4))}
          className="w-8 h-8 bg-white rounded-[4px] flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.12)] hover:bg-gray-50 transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14" />
          </svg>
        </button>
        <button className="w-8 h-8 bg-white rounded-[4px] flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.12)] hover:bg-gray-50 transition-colors mt-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8">
            <circle cx="12" cy="12" r="2" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
            <path d="M12 2l1.5 5.5L12 10l-1.5-2.5L12 2z" fill="#374151" strokeWidth="0" />
          </svg>
        </button>
      </div>
    </div>
  );
}