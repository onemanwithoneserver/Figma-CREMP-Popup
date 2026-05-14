import React from 'react';
import type { MapMarker } from './types';

const StoreIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H19.5m-11.85-6h2.12m-2.12 3h2.12M15 6.75H9m3 0V3m-9 8.25h18M3 11.25l.842-5.464A2.25 2.25 0 016.05 4.5h11.9a2.25 2.25 0 012.208 1.286L21 11.25m-18 0v9a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 20.25v-9" />
  </svg>
);

const StorefrontIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H19.5m-17.14-9l1.492-5.965A2.25 2.25 0 016.035 4.5h11.93a2.25 2.25 0 012.186 1.705L21.64 12m-19.28 0h19.28m-19.28 0a2.25 2.25 0 002.25 2.25h14.78a2.25 2.25 0 002.25-2.25" />
  </svg>
);

const TruckIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const CartIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

interface PropertyMarkerProps {
  marker: MapMarker;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const markerConfig: Record<string, { pinBg: string; Icon: React.FC<{ color: string }> }> = {
  franchise: { pinBg: '#7C3AED', Icon: StoreIcon },
  existing: { pinBg: '#10B981', Icon: StorefrontIcon },
  business: { pinBg: '#10B981', Icon: StorefrontIcon },
  distribution: { pinBg: '#3B82F6', Icon: TruckIcon },
  movable: { pinBg: '#F97316', Icon: CartIcon },
};

export default function PropertyMarker({ marker, isSelected, onClick }: PropertyMarkerProps) {
  const config = markerConfig[marker.type] || markerConfig.franchise;

  return (
    <button
      onClick={() => onClick(marker.id)}
      className="absolute group focus-visible:outline-none transition-transform duration-200 hover:scale-105 active:scale-95"
      style={{
        top: `${marker.lat}%`,
        left: `${marker.lng}%`,
        transform: 'translate(-14px, -100%)', 
        zIndex: isSelected ? 30 : 10,
        fontFamily: "'Outfit', sans-serif",
      }}
      aria-label={`${marker.brandName} ${marker.opportunityType} marker. Investment: ${marker.investment}`}
      aria-current={isSelected ? 'location' : undefined}
    >
      <div className="flex flex-col items-center drop-shadow-sm relative z-10">
        <div
          className="w-[28px] h-[28px] rounded-full flex items-center justify-center shadow-md border-[1.5px] border-white"
          style={{ backgroundColor: config.pinBg }}
        >
          <config.Icon color="#FFFFFF" />
        </div>
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: `6px solid ${config.pinBg}`,
            marginTop: -1,
          }}
          aria-hidden="true"
        />
      </div>

      <div
        className="absolute w-max bg-white rounded-lg py-1 px-2 text-left transition-all duration-200 z-20"
        style={{
          top: '14px', 
          left: '28px',
          transform: 'translateY(-50%)',
          marginLeft: '4px',
          boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 6px rgba(0,0,0,0.06)',
          border: `1px solid ${isSelected ? config.pinBg : '#F1F5F9'}`,
        }}
      >
        <div className="text-[10px] font-bold text-[#0F172A] leading-tight mb-0.5">
          {marker.investment}
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-medium text-[#475569] leading-tight">
            {marker.brandName}
          </span>
          <span className="text-[8px] font-medium text-[#64748B] leading-tight">
            {marker.opportunityType}
          </span>
        </div>
      </div>
    </button>
  );
}