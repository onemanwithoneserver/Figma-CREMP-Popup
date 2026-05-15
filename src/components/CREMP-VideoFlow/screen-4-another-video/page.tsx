import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, MoreVertical } from 'lucide-react';
import type { PropertyVideo } from '../shared/theme/videoflow.types';
import { propertyVideos, suggestedLabels } from './data';
import SuggestedPreviewStrip from './components/SuggestedPreviewStrip';
import ActionIcons from '../screen-2-video-player/components/ActionIcons';
import BottomNavbar from '../../Home/BottomNavbar';
import { fadeIn, slideUp } from '../shared/animations/videoflow.animations';

interface AnotherVideoPageProps {
  currentVideo?: PropertyVideo;
  currentIndex?: number;
  onBack?: () => void;
  onSelectVideo?: (video: PropertyVideo) => void;
}

export default function AnotherVideoPage({
  currentVideo,
  currentIndex = 2,
  onBack,
  onSelectVideo,
}: AnotherVideoPageProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  const video = currentVideo ?? propertyVideos[activeIndex];

  const handleSelectVideo = (v: PropertyVideo) => {
    const idx = propertyVideos.findIndex((p) => p.id === v.id);
    setActiveIndex(idx >= 0 ? idx : 0);
    onSelectVideo?.(v);
  };

  const handleShuffle = () => {
    const randomIdx = Math.floor(Math.random() * propertyVideos.length);
    setActiveIndex(randomIdx);
    onSelectVideo?.(propertyVideos[randomIdx]);
  };

  const trendingVideos = [...propertyVideos].sort((a, b) => b.likes - a.likes).slice(0, 5);
  const highROIVideos = [...propertyVideos].sort((a, b) => parseFloat(b.returns) - parseFloat(a.returns)).slice(0, 5);
  const newlyListedVideos = propertyVideos.slice(-5).reverse();

  const videoSets = [trendingVideos, highROIVideos, newlyListedVideos];

  return (
    <motion.div
      className="flex flex-col relative w-full h-full bg-neutral-950 font-sans overflow-hidden"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={video.id}
          className="relative w-full aspect-[9/14] shrink-0 overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
          
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 pt-12 pb-16 bg-gradient-to-b from-black/80 to-transparent z-10">
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors" 
              onClick={onBack}
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
                onClick={handleShuffle}
              >
                <RefreshCw size={18} />
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-[50%] bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none z-10" />

          <div className="absolute right-4 bottom-6 z-20">
            <ActionIcons video={video} />
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="px-5 py-4 shrink-0 border-b border-white/5 bg-neutral-950 z-20 relative"
        variants={slideUp}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="text-[16px] font-bold text-white truncate drop-shadow-sm">
              {video.title}
            </p>
            <p className="text-[12px] font-medium text-slate-400">
              {video.location}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[15px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                {video.price}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wide bg-violet-600">
                {video.tag}
              </span>
            </div>
          </div>
          <button className="flex items-center justify-center px-6 py-3 bg-white text-black font-bold text-[13px] rounded-xl hover:bg-slate-200 transition-colors shrink-0 shadow-lg">
            View
          </button>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto pb-24 pt-5 flex flex-col gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden z-10">
        <p className="text-[15px] font-bold text-white px-5 tracking-wide">
          Continue Exploring
        </p>
        <div className="flex flex-col gap-6">
          {suggestedLabels.map((sl, i) => (
            <SuggestedPreviewStrip
              key={sl.key}
              label={sl.label}
              labelColor={sl.color}
              videos={videoSets[i]}
              onSelect={handleSelectVideo}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-50">
        <BottomNavbar activeNav="video" onNavChange={() => {}} />
      </div>
    </motion.div>
  );
}