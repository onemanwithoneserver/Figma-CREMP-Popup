import React, { useState, useRef } from 'react';

const sharedEffects = {
  interactive: "transition-all duration-300 active:scale-95 focus-visible:outline-none",
  markerHover: "transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none group",
  floatingPanel: "bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#E5E7EB]",
  iconButton: "flex items-center justify-center transition-colors hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-none",
  cardBase: "bg-white rounded-[16px] border border-[#F1F5F9] shadow-[0_8px_24px_rgba(15,23,42,0.06)]",
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
  { id: '1', lat: 30, lng: 20, type: 'franchise', investment: '₹ 18 L', brandName: 'Chai Point', opportunityType: 'Franchise' },
  { id: '2', lat: 40, lng: 45, type: 'existing', investment: '₹ 42 L', brandName: 'QSR Brand', opportunityType: 'Franchise' },
  { id: '3', lat: 55, lng: 15, type: 'existing', investment: '₹ 35 L', brandName: 'Education Brand', opportunityType: 'Franchise' },
  { id: '4', lat: 70, lng: 45, type: 'franchise', investment: '₹ 50 L', brandName: 'EV Charging', opportunityType: 'Franchise' },
  { id: '5', lat: 85, lng: 20, type: 'movable', investment: '₹ 12 L', brandName: 'Food Truck', opportunityType: '(Movable)' },
  { id: '6', lat: 65, lng: 80, type: 'existing', investment: '₹ 22 L', brandName: 'Gym Brand', opportunityType: 'Franchise' },
  { id: '7', lat: 25, lng: 75, type: 'franchise', investment: '₹ 25 L', brandName: 'Salon Brand', opportunityType: 'Franchise' },
];

const mapLabels = [
  { label: 'MADHAPUR', top: 25, left: 45 },
  { label: 'KUKATPALLY', top: 15, left: 80 },
  { label: 'GACHIBOWLI', top: 60, left: 15 },
  { label: 'FINANCIAL DISTRICT', top: 75, left: 15 },
  { label: 'JUBILEE HILLS', top: 65, left: 50 },
  { label: 'BANJARA HILLS', top: 90, left: 55 },
  { label: 'LB NAGAR', top: 95, left: 85 },
  { label: 'KOMPALLY', top: 45, left: 95 },
];

const InfoIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01" />
  </svg>
);

const MapIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const ListIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

const LocateIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" fill={color} stroke="none" />
    <circle cx="12" cy="12" r="7" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

const LayersIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
);

const NavigateIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

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

const TruckIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const CartIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

interface PropertyMarkerProps {
  marker: MapMarkerData;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const markerConfig: Record<string, { pinBg: string; Icon: React.FC<{ color: string }> }> = {
  franchise: { pinBg: '#6D28D9', Icon: StoreIcon },
  existing: { pinBg: '#059669', Icon: StorefrontIcon },
  business: { pinBg: '#059669', Icon: StorefrontIcon },
  distribution: { pinBg: '#3B82F6', Icon: TruckIcon },
  movable: { pinBg: '#EA580C', Icon: CartIcon },
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
        transform: 'translate(-16px, -100%)',
        zIndex: isSelected ? 30 : 10,
        fontFamily: "'Outfit', sans-serif",
      }}
      aria-label={`${marker.brandName} ${marker.opportunityType} marker. Investment: ${marker.investment}`}
      aria-pressed={isSelected}
    >
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

interface MapSectionProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedMarkerId: string | null;
  onMarkerClick: (id: string) => void;
}

export default function MapSection({
  viewMode,
  onViewModeChange,
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

  const resetPan = () => {
    setPan({ x: 0, y: 0 });
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
              className="absolute text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] select-none pointer-events-none uppercase"
              style={{ top: `${lbl.top}%`, left: `${lbl.left}%`, transform: 'translate(-50%, -50%)' }}
              aria-hidden="true"
            >
              {lbl.label}
            </span>
          ))}

          <div className="absolute flex items-center justify-center w-[22px] h-[22px] rounded border border-[#CBD5E1] bg-white shadow-sm pointer-events-none"
            style={{ top: '48%', left: '78%' }} aria-hidden="true">
            <span className="text-[9px] font-bold text-[#64748B]">44</span>
          </div>
          <div className="absolute flex items-center justify-center w-[22px] h-[22px] rounded border border-[#CBD5E1] bg-white shadow-sm pointer-events-none"
            style={{ top: '68%', left: '8%' }} aria-hidden="true">
            <span className="text-[9px] font-bold text-[#64748B]">65</span>
          </div>

          <span className="absolute text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] select-none pointer-events-none"
            style={{ top: '12%', left: '8%', transform: 'rotate(-50deg)' }} aria-hidden="true">
            ORR
          </span>
          <span className="absolute text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] select-none pointer-events-none"
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
                  width: 80,
                  height: 80,
                  backgroundColor: 'rgba(59, 130, 246, 0.12)',
                }}
              />
              <div
                className="relative rounded-full flex items-center justify-center border-[2.5px] border-white"
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: '#3B82F6',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
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

      <div className="absolute top-3 left-0 right-0 flex items-center justify-between px-3 z-40 pointer-events-none gap-2">
        {/* Left: opportunity count */}
        <div className="flex items-center gap-1.5 h-[36px] px-3 rounded-[10px] bg-white border border-[#E5E7EB] shadow-[0_2px_10px_rgba(0,0,0,0.08)] pointer-events-auto shrink-0">
          <span className="text-[12px] font-bold text-[#111827] leading-none whitespace-nowrap">48 Opportunities</span>
          <InfoIcon color="#9CA3AF" />
        </div>

        {/* Right: Map / List toggle */}
        <div
          className="flex items-center p-[3px] h-[36px] rounded-[10px] bg-white border border-[#E5E7EB] shadow-[0_2px_10px_rgba(0,0,0,0.08)] pointer-events-auto shrink-0"
          role="group"
          aria-label="View mode toggle"
        >
          <button
            onClick={() => onViewModeChange('map')}
            className={`flex items-center gap-1 px-2.5 h-[28px] text-[11.5px] font-semibold rounded-[7px] transition-all focus-visible:outline-none whitespace-nowrap ${viewMode === 'map'
              ? 'bg-[#0B1320] text-white shadow-sm'
              : 'bg-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            aria-pressed={viewMode === 'map'}
          >
            <MapIcon color={viewMode === 'map' ? '#FFFFFF' : '#6B7280'} />
            Map View
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`flex items-center gap-1 px-2.5 h-[28px] text-[11.5px] font-semibold rounded-[7px] transition-all focus-visible:outline-none whitespace-nowrap ${viewMode === 'list'
              ? 'bg-[#0B1320] text-white shadow-sm'
              : 'bg-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            aria-pressed={viewMode === 'list'}
          >
            <ListIcon color={viewMode === 'list' ? '#FFFFFF' : '#6B7280'} />
            List View
          </button>
        </div>
      </div>

      <div className={`absolute right-4  z-[999] flex flex-col overflow-hidden pointer-events-auto ${sharedEffects.floatingPanel}`} style={{ bottom: 'clamp(250px, calc(35% + 20px), 300px)' }}>
        <button
          onClick={resetPan}
          className={`w-10 h-10 border-b border-[#F3F4F6] ${sharedEffects.iconButton}`}
          aria-label="Locate Me (Reset Pan)"
        >
          <LocateIcon color="#0F172A" />
        </button>
        <button
          className={`w-10 h-10 border-b border-[#F3F4F6] ${sharedEffects.iconButton}`}
          aria-label="Map Layers"
        >
          <LayersIcon color="#0F172A" />
        </button>
        <button
          className={`w-10 h-10 ${sharedEffects.iconButton}`}
          aria-label="Navigate"
        >
          <NavigateIcon color="#0F172A" />
        </button>
      </div>

    </div>
  );
}