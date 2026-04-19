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
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Prestige Business Hub',
    subtitle: 'Luxury Retail & 50 Lac...',
    location: 'Banjara Hills, Hyderabad',
    price: '₹ 2.5 Cr',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Brigade Jewel',
    subtitle: 'Retail & Health Club',
    location: 'Gachibowli, Hyderabad',
    price: '₹ 4 Cr',
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'Brigade Jewel',
    subtitle: 'Retail & Health Club',
    location: 'Gachibowli, Hyderabad',
    price: '₹ 5 Cr',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
];

export default function WebLayoutDesign() {
  return (
    <div className="w-full h-screen bg-[#f8fafc] font-sans flex flex-col lg:flex-row overflow-hidden">

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