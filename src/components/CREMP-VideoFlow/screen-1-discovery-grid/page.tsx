import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../Home/Header';
import SearchBar from '../../Home/SearchBar';
import type { PropertyVideo, VideoCategory } from '../shared/theme/videoflow.types';
import { propertyVideos, categories } from './data';
import PropertyVideoCard from './components/PropertyVideoCard';
import CategoryChips from './components/CategoryChips';
import VideoCardSkeleton from '../shared/components/VideoCardSkeleton';
import BottomNavbar from '../../Home/BottomNavbar';
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
      <div className="shrink-0 w-full bg-[#0a1128] z-20 relative pb-[24px]">
        <Header />

        <div className="absolute left-0 right-0 bottom-[-20px] z-30 px-2">
          <div className="transition-all duration-500 ease-out">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <SearchBar query={search} onChange={setSearch} placeholder="Search investment videos, opportunities, franchises..." />
          </div>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto pt-[24px] pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        {/* Luxury category chips */}
        <CategoryChips categories={categories} active={activeCategory} onChange={setActiveCategory} />

        {/* Masonry video grid */}
        {isLoading ? (
          <div className="grid grid-cols-3 gap-2 px-3 pb-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <VideoCardSkeleton key={i} heightClass="h-[160px]" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + search}
              className="grid grid-cols-3 gap-2 px-3 pb-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((video, i) => (
                <PropertyVideoCard
                  key={video.id}
                  video={video}
                  index={i}
                  compact
                  onSelect={onVideoSelect ?? (() => { })}
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
      <div className="absolute bottom-0 left-0 right-0 z-50">
        <BottomNavbar activeNav="video" onNavChange={() => { }} />
      </div>
    </motion.div>
  );
}