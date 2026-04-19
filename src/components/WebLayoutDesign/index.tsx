import React from 'react';
import PropertyCard from './PropertyCard';
import MapView from './MapView';
import MobileMapView from './MobileMapView';

const properties = [
  {
    id: 1,
    title: 'Fairmount Kompally',
    subtitle: 'Commercial & Shops Available',
    location: 'Kompally, Hyderabad',
    price: '₹ 80 Lakh',
    image: '/property_commercial.png', // Replace with actual image path
  },
  {
    id: 2,
    title: 'Prestige Business Hub',
    subtitle: 'Luxury Retail & 50 Lac...',
    location: 'Banjara Hills, Hyderabad',
    price: '₹ 2.5 Cr',
    image: '/property_villa.png', // Replace with actual image path
  },
  {
    id: 3,
    title: 'Brigade Jewel',
    subtitle: 'Retail & Health Club',
    location: 'Gachibowli, Hyderabad',
    price: '₹ 4 Cr',
    image: '/property_commercial.png', // Replace with actual image path
  },
  {
    id: 4,
    title: 'Brigade Jewel',
    subtitle: 'Retail & Health Club',
    location: 'Gachibowli, Hyderabad',
    price: '₹ 5 Cr',
    image: '/property_villa.png', // Replace with actual image path
  },
];

export default function WebLayoutDesign() {
  return (
    <div className="w-full h-screen bg-[#f4f5f8] font-sans flex flex-col lg:flex-row overflow-hidden">

      {/* --- DESKTOP VIEW --- */}

      {/* Left Floating Cards */}
      <div className="hidden lg:flex w-[540px] items-center justify-center gap-6 px-8 z-10 shrink-0">
        {/* Outer Left (Higher) */}
        <div className="w-[240px] transform -translate-y-16">
          <PropertyCard {...properties[0]} />
        </div>
        {/* Inner Left (Lower) */}
        <div className="w-[240px] transform translate-y-12">
          <PropertyCard {...properties[1]} />
        </div>
      </div>

      {/* Middle Map View */}
      <div className="hidden lg:block flex-1 h-full shadow-[0_0_40px_rgba(0,0,0,0.1)] z-20 relative">
        <MapView />
      </div>

      {/* Right Floating Cards */}
      <div className="hidden lg:flex w-[540px] items-center justify-center gap-6 px-8 z-10 shrink-0">
        {/* Inner Right (Lower) */}
        <div className="w-[240px] transform translate-y-12">
          <PropertyCard {...properties[2]} />
        </div>
        {/* Outer Right (Higher) */}
        <div className="w-[240px] transform -translate-y-16">
          <PropertyCard {...properties[3]} />
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="lg:hidden w-full h-full flex flex-col relative">
        <MobileMapView properties={properties} />
      </div>

    </div>
  );
}