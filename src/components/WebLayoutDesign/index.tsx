import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import MapView from './MapView';
import MobileMapView from './MobileMapView';

const properties = [
  {
    id: 1,
    title: 'Fairmount Kompally',
    details: '5th Floor | 1,500 sq.ft.',
    location: 'Kompally, Hyderabad',
    price: '₹ 80 Lakh',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Prestige Business Hub',
    details: '5th Floor | 1,500 sq.ft.',
    location: 'Banjara Hills, Hyderabad',
    price: '₹ 2.5 Cr',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Brigade Jewel',
    details: '5th Floor | 1,500 sq.ft.',
    location: 'Gachibowli, Hyderabad',
    price: '₹ 4 Cr',
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'Brigade Jewel',
    details: '5th Floor | 1,500 sq.ft.',
    location: 'Gachibowli, Hyderabad',
    price: '₹ 5 Cr',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
];

export default function WebLayoutDesign() {
  const floatTransition = {
    type: "spring" as const,
    stiffness: 50,
    damping: 20,
    duration: 1.5
  };

  return (
    <div className="w-full h-screen bg-[#f8fafc] font-sans flex flex-col lg:flex-row overflow-hidden">
      <div className="hidden lg:flex w-[540px] items-center justify-center gap-6 px-8 z-10 shrink-0">
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -160, opacity: 1 }}
          transition={floatTransition}
          className="w-[240px]"
        >
          <PropertyCard {...properties[0]} />
        </motion.div>

        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 160, opacity: 1 }}
          transition={{ ...floatTransition, delay: 0.2 }}
          className="w-[240px]"
        >
          <PropertyCard {...properties[1]} />
        </motion.div>
      </div>

      <div className="hidden lg:block flex-1 h-full shadow-[0_0_40px_rgba(0,0,0,0.1)] z-20 relative">
        <MapView />
      </div>

      <div className="hidden lg:flex w-[540px] items-center justify-center gap-6 px-8 z-10 shrink-0">
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 160, opacity: 1 }}
          transition={{ ...floatTransition, delay: 0.4 }}
          className="w-[240px]"
        >
          <PropertyCard {...properties[2]} />
        </motion.div>

        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -160, opacity: 1 }}
          transition={{ ...floatTransition, delay: 0.6 }}
          className="w-[240px]"
        >
          <PropertyCard {...properties[3]} />
        </motion.div>
      </div>

      <div className="lg:hidden w-full h-full flex flex-col relative">
        <MobileMapView properties={properties} />
      </div>
    </div>
  );
}