import { useState } from 'react';
import type { MapMarker, MarkerType } from './types';

// ── Inline SVG icons (matches Home/PropertyMarker.tsx style) ─────────────────
const StoreIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H19.5m-11.85-6h2.12m-2.12 3h2.12M15 6.75H9m3 0V3m-9 8.25h18M3 11.25l.842-5.464A2.25 2.25 0 016.05 4.5h11.9a2.25 2.25 0 012.208 1.286L21 11.25m-18 0v9a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 20.25v-9" />
  </svg>
);

const StorefrontIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H19.5m-17.14-9l1.492-5.965A2.25 2.25 0 016.035 4.5h11.93a2.25 2.25 0 012.186 1.705L21.64 12m-19.28 0h19.28m-19.28 0a2.25 2.25 0 002.25 2.25h14.78a2.25 2.25 0 002.25-2.25" />
  </svg>
);

const CartIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const markerConfig: Record<MarkerType, { pinBg: string; Icon: React.FC<{ color: string }> }> = {
  franchise: { pinBg: '#6D28D9', Icon: StoreIcon },
  business:  { pinBg: '#059669', Icon: StorefrontIcon },
  movable:   { pinBg: '#EA580C', Icon: CartIcon },
};

interface SingleMarkerProps {
  marker: MapMarker;
  isSelected: boolean;
  onClick: (id: string) => void;
}

function SingleMarker({ marker, isSelected, onClick }: SingleMarkerProps) {
  const config = markerConfig[marker.type] || markerConfig.franchise;

  return (
    <button
      onClick={() => onClick(marker.id)}
      className="absolute group focus-visible:outline-none transition-transform duration-300 hover:scale-105 active:scale-95"
      style={{
        top: `${marker.lat}%`,
        left: `${marker.lng}%`,
        transform: 'translate(-16px, -100%)',
        zIndex: isSelected ? 30 : 10,
        fontFamily: "'Outfit', sans-serif",
      }}
      aria-label={`${marker.brandName} ${marker.opportunityType} – ${marker.investment}`}
    >
      {/* Pin circle + tail */}
      <div className="flex flex-col items-center drop-shadow-md relative z-10">
        <div
          className="w-[32px] h-[32px] rounded-full flex items-center justify-center shadow-sm"
          style={{ backgroundColor: config.pinBg }}
        >
          <config.Icon color="#FFFFFF" />
        </div>
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `8px solid ${config.pinBg}`,
            marginTop: -0.5,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Info card to the right */}
      <div
        className="absolute w-max bg-white rounded-[12px] py-1.5 px-2.5 text-left transition-all duration-200 z-20"
        style={{
          top: '16px',
          left: '32px',
          transform: 'translateY(-50%)',
          marginLeft: '6px',
          boxShadow: isSelected ? '0 6px 16px rgba(0,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.08)',
          border: `1px solid ${isSelected ? config.pinBg : '#F1F5F9'}`,
        }}
      >
        <div className="text-[12px] font-bold text-[#111827] leading-none mb-1">
          {marker.investment}
        </div>
        <div className="flex flex-col">
          <span className="text-[9.5px] font-medium text-[#475569] leading-[1.25]">
            {marker.brandName}
          </span>
          <span className="text-[9.5px] font-medium text-[#475569] leading-[1.25]">
            {marker.opportunityType}
          </span>
        </div>
      </div>
    </button>
  );
}

interface SelectedMarkersProps {
  markers: MapMarker[];
}

export default function SelectedMarkers({ markers }: SelectedMarkersProps) {
  const [selectedId, setSelectedId] = useState<string | null>('1');

  return (
    <>
      {markers.map((m) => (
        <SingleMarker
          key={m.id}
          marker={m}
          isSelected={selectedId === m.id}
          onClick={setSelectedId}
        />
      ))}
    </>
  );
}
// End of file — removed duplicate implementation (keeps inline-SVG/first implementation above).
