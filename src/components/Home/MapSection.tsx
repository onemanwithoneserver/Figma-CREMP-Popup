import React, { useState, useRef } from 'react';

const sharedEffects = {
  interactive: "transition-all duration-200 active:scale-95 focus-visible:outline-none",
  markerHover: "transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none group",
};

type ViewMode = 'map' | 'list';

interface MapMarkerData {
  id: string;
  lat: number;
  lng: number;
  type: string;
  investment: string;
  brandName: string;
  opportunityType: string;
}

const mapMarkers: MapMarkerData[] = [
  { id: '1', lat: 30, lng: 28, type: 'franchise', investment: '₹ 18 L', brandName: 'Chai Point', opportunityType: 'Franchise' },
  { id: '2', lat: 36, lng: 48, type: 'existing', investment: '₹ 42 L', brandName: 'QSR Brand', opportunityType: 'Franchise' },
  { id: '3', lat: 28, lng: 63, type: 'franchise', investment: '₹ 25 L', brandName: 'Salon Brand', opportunityType: 'Franchise' },
  { id: '4', lat: 52, lng: 29, type: 'existing', investment: '₹ 35 L', brandName: 'Education Brand', opportunityType: 'Franchise' },
  { id: '5', lat: 58, lng: 48, type: 'franchise', investment: '₹ 50 L', brandName: 'EV Charging', opportunityType: 'Franchise' },
  { id: '6', lat: 50, lng: 65, type: 'existing', investment: '₹ 22 L', brandName: 'Gym Brand', opportunityType: 'Franchise' },
  { id: '7', lat: 68, lng: 30, type: 'movable', investment: '₹ 12 L', brandName: 'Food Truck', opportunityType: '(Movable)' },
];

const mapLabels = [
  { label: 'MADHAPUR',          top: 28, left: 40 },
  { label: 'KUKATPALLY',        top: 26, left: 62 },
  { label: 'GACHIBOWLI',        top: 55, left: 28 },
  { label: 'FINANCIAL DISTRICT',top: 68, left: 28 },
  { label: 'JUBILEE HILLS',     top: 62, left: 48 },
  { label: 'BANJARA HILLS',     top: 66, left: 46 },
  { label: 'LB NAGAR',          top: 68, left: 64 },
  { label: 'KOMPALLY',          top: 40, left: 68 },
];

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
  marker: MapMarkerData;
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

function PropertyMarker({ marker, isSelected, onClick }: PropertyMarkerProps) {
  const config = markerConfig[marker.type] || markerConfig.franchise;

  return (
    <button
      onClick={() => onClick(marker.id)}
      className={`absolute ${sharedEffects.markerHover}`}
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

interface MapSectionProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedMarkerId: string | null;
  onMarkerClick: (id: string) => void;
}

export default function MapSection({
  viewMode: _viewMode,
  onViewModeChange: _onViewModeChange,
  selectedMarkerId,
  onMarkerClick,
}: MapSectionProps) {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className="relative flex-1 flex flex-col w-full overflow-hidden bg-[#F8FAFC]"
      style={{ fontFamily: "'Outfit', sans-serif", minHeight: 0, touchAction: 'none' }}
    >
      <div
        className={`absolute inset-0 z-10 w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%]"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <ellipse cx="55" cy="35" rx="12" ry="8" fill="#E2F5E9" opacity="0.6" />
            <ellipse cx="25" cy="65" rx="10" ry="7" fill="#E2F5E9" opacity="0.6" />
            <ellipse cx="80" cy="70" rx="8" ry="6" fill="#E2F5E9" opacity="0.6" />
            <ellipse cx="45" cy="85" rx="15" ry="9" fill="#E2F5E9" opacity="0.4" />
            <ellipse cx="60" cy="50" rx="6" ry="4" fill="#DBEAFE" opacity="0.7" />
            <ellipse cx="85" cy="40" rx="4" ry="3" fill="#DBEAFE" opacity="0.6" />

            <path d="M 5 5 Q 50 0 95 10 Q 100 50 90 95 Q 50 100 5 90 Q 0 50 5 5" fill="none" stroke="#F1F5F9" strokeWidth="2.5" />
            <line x1="10" y1="10" x2="90" y2="80" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="0" y1="45" x2="100" y2="55" stroke="#F8FAFC" strokeWidth="1.2" />
            <line x1="5" y1="75" x2="95" y2="70" stroke="#F8FAFC" strokeWidth="1.0" />
            <line x1="45" y1="0" x2="55" y2="100" stroke="#F1F5F9" strokeWidth="1.2" />
            <line x1="20" y1="0" x2="25" y2="100" stroke="#F8FAFC" strokeWidth="0.8" />
            <line x1="80" y1="0" x2="75" y2="100" stroke="#F8FAFC" strokeWidth="0.8" />
            <path d="M 20 25 Q 50 20 80 30 Q 85 50 75 80 Q 50 85 20 75 Q 15 50 20 25" fill="none" stroke="#F1F5F9" strokeWidth="1.5" />
            <line x1="75" y1="40" x2="85" y2="60" stroke="#E2E8F0" strokeWidth="1.2" />
            <line x1="10" y1="75" x2="25" y2="90" stroke="#E2E8F0" strokeWidth="1.2" />
          </svg>

          {mapLabels.map((lbl) => (
            <span
              key={lbl.label}
              className="absolute text-[8.5px] font-bold tracking-[0.15em] text-[#94A3B8] select-none pointer-events-none uppercase"
              style={{ top: `${lbl.top}%`, left: `${lbl.left}%`, transform: 'translate(-50%, -50%)' }}
              aria-hidden="true"
            >
              {lbl.label}
            </span>
          ))}

          <div className="absolute flex items-center justify-center w-[20px] h-[20px] rounded border border-[#CBD5E1] bg-white shadow-sm pointer-events-none"
            style={{ top: '44%', left: '68%' }} aria-hidden="true">
            <span className="text-[8px] font-bold text-[#64748B]">44</span>
          </div>
          <div className="absolute flex items-center justify-center w-[20px] h-[20px] rounded border border-[#CBD5E1] bg-white shadow-sm pointer-events-none"
            style={{ top: '62%', left: '28%' }} aria-hidden="true">
            <span className="text-[8px] font-bold text-[#64748B]">65</span>
          </div>

          <span className="absolute text-[8.5px] font-bold tracking-[0.15em] text-[#94A3B8] select-none pointer-events-none"
            style={{ top: '12%', left: '8%', transform: 'rotate(-50deg)' }} aria-hidden="true">
            ORR
          </span>
          <span className="absolute text-[8.5px] font-bold tracking-[0.15em] text-[#94A3B8] select-none pointer-events-none"
            style={{ top: '15%', left: '48%', transform: 'rotate(20deg)' }} aria-hidden="true">
            ORR
          </span>

          <div
            className="absolute pointer-events-none"
            style={{ top: '50%', left: '60%', transform: 'translate(-50%, -50%)' }}
            aria-label="Current location"
          >
            <div className="relative flex items-center justify-center">
              <div
                className="absolute rounded-full"
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'rgba(59, 130, 246, 0.12)',
                }}
              />
              <div
                className="relative rounded-full flex items-center justify-center border-[2px] border-white"
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: '#3B82F6',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }}
              />
            </div>
          </div>

          {mapMarkers.map((marker) => (
            <div
              key={marker.id}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <PropertyMarker
                marker={marker}
                isSelected={selectedMarkerId === marker.id}
                onClick={onMarkerClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}