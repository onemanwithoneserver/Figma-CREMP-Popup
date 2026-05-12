import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, MapPin, Play } from 'lucide-react';
import type { PropertyVideo, VideoCategory } from '../shared/theme/videoflow.types';
import { propertyVideos, categories } from './data';
import PropertyVideoCard from './components/PropertyVideoCard';
import CategoryChips from './components/CategoryChips';
import VideoCardSkeleton from '../shared/components/VideoCardSkeleton';
import BottomNav from '../shared/components/BottomNav';
import { fadeIn, staggerContainer, slideUp } from '../shared/animations/videoflow.animations';
import '../shared/theme/videoflow.css';

interface DiscoveryGridPageProps {
  onVideoSelect?: (video: PropertyVideo) => void;
}

export default function DiscoveryGridPage({ onVideoSelect }: DiscoveryGridPageProps) {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('All');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = propertyVideos.filter((v) => {
    const matchCat = activeCategory === 'All' || v.category === activeCategory;
    const matchSearch =
      search.trim() === '' ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });



  return (
    <motion.div
      className="flex flex-col relative w-full h-full font-sans overflow-hidden vf-luxury-page"
      style={{ fontFamily: "'Outfit', sans-serif" }}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {/* ── Premium Dark Header (CREMP Brokers palette) ── */}
      <div className="vf-premium-header shrink-0 px-4 pt-4 pb-5">
        {/* Decorative ambient gold blur */}
        <div
          className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
            transform: 'translate(25%, -35%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-44 h-44 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            transform: 'translate(-28%, 35%)',
          }}
        />

        {/* Nav row */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          {/* Location selector */}
          <button className="vf-location-pill">
            <MapPin size={13} style={{ color: '#d4af37', flexShrink: 0 }} />
            <span
              className="text-[13px] font-semibold text-white tracking-wide"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Hyderabad
            </span>
            <ChevronDown size={12} style={{ color: 'rgba(255,255,255,0.45)', flexShrink: 0 }} />
          </button>

          {/* Right icons */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <button
                aria-label="Notifications"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Bell size={14} style={{ color: 'rgba(255,255,255,0.65)' }} />
              </button>
              <div
                className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full"
                style={{ background: '#d4af37', border: '1.5px solid #0a1128' }}
              />
            </div>
            <div
              className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
              style={{ border: '1.5px solid rgba(212,175,55,0.4)' }}
            >
              <img
                src="https://ui-avatars.com/api/?name=User&background=1a2540&color=d4af37"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Brand row */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
            style={{
              background: 'rgba(212,175,55,0.12)',
              border: '1px solid rgba(212,175,55,0.22)',
            }}
          >
            <Play size={17} fill="#d4af37" style={{ color: '#d4af37', marginLeft: 2 }} />
          </div>
          <div>
            <h1
              className="text-[20px] font-extralight text-white tracking-wide leading-tight m-0"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Video{' '}
              <span className="font-semibold vf-gold-text">Search</span>
            </h1>
            <p
              className="text-[10px] font-light tracking-widest uppercase m-0"
              style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Outfit, sans-serif' }}
            >
              Discover opportunities through video
            </p>
          </div>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        {/* Crystal-glass search row */}
        <div className="px-3 pt-4 pb-1 flex items-center gap-2">
          <div className="vf-crystal-search flex-1 flex items-center gap-2.5 px-4 py-[11px]">
            <Search size={15} style={{ color: '#7c3aed', flexShrink: 0 }} />
            <input
              className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium"
              style={{
                color: '#0a1128',
                fontFamily: 'Outfit, sans-serif',
              }}
              placeholder="Search investment videos, opportunities, franchises..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="vf-filter-btn" aria-label="Filter">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 21v-7"/><path d="M4 10V3"/>
              <path d="M12 21v-9"/><path d="M12 8V3"/>
              <path d="M20 21v-5"/><path d="M20 12V3"/>
              <path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/>
            </svg>
          </button>
        </div>

        {/* Luxury category chips */}
        <CategoryChips categories={categories} active={activeCategory} onChange={setActiveCategory} />

        {/* Masonry video grid */}
        {isLoading ? (
          <div className="flex flex-col gap-3 px-3 pb-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <VideoCardSkeleton key={i} heightClass="h-[480px]" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + search}
              className="flex flex-col gap-3 px-3 pb-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((video, i) => (
                <PropertyVideoCard
                  key={video.id}
                  video={video}
                  index={i}
                  onSelect={onVideoSelect ?? (() => {})}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && filtered.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-20"
            variants={slideUp}
            initial="hidden"
            animate="visible"
          >
            <p
              className="text-[14px] font-medium"
              style={{ color: '#94a3b8', fontFamily: 'Outfit, sans-serif' }}
            >
              No properties found matching your criteria
            </p>
          </motion.div>
        )}
      </div>

      {/* ── Dark luxury bottom nav ── */}
      <div className="absolute bottom-0 left-0 right-0 pb-safe">
        <BottomNav activeKey="home" />
      </div>
    </motion.div>
  );
}