import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowLeft, MoreVertical, Maximize } from 'lucide-react';
import type { PropertyVideo } from '../shared/theme/videoflow.types';
import { propertyVideos } from './data';
import { swipeConfig } from './data';
import SwipeTransition from './components/SwipeTransition';
import SwipeIndicator from './components/SwipeIndicator';
import ActionIcons from '../screen-2-video-player/components/ActionIcons';
import PropertyOverlay from '../screen-2-video-player/components/PropertyOverlay';
import { playerMetaMap } from '../screen-2-video-player/data';
import { fadeIn } from '../shared/animations/videoflow.animations';

interface SwipeNextVideoPageProps {
  currentVideo?: PropertyVideo;
  currentIndex?: number;
  onBack?: () => void;
  onVideoChange?: (video: PropertyVideo, index: number) => void;
}

export default function SwipeNextVideoPage({
  currentVideo,
  currentIndex = 0,
  onBack,
  onVideoChange,
}: SwipeNextVideoPageProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDir, setTransitionDir] = useState<'up' | 'down'>('up');

  const video = currentVideo ?? propertyVideos[activeIndex];
  const nextVideo = propertyVideos[(activeIndex + 1) % propertyVideos.length];
  const prevVideo = propertyVideos[(activeIndex - 1 + propertyVideos.length) % propertyVideos.length];
  const meta = playerMetaMap[video.id] ?? playerMetaMap['v1'];

  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const dragProgress = useTransform(y, [-200, 0, 200], [-1, 0, 1]);
  const overlayY = useTransform(y, [-200, 200], [8, -8]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionDir('up');
    setTimeout(() => {
      const nextIndex = (activeIndex + 1) % propertyVideos.length;
      setActiveIndex(nextIndex);
      onVideoChange?.(propertyVideos[nextIndex], nextIndex);
      setIsTransitioning(false);
      animate(y, 0, { duration: 0 });
    }, 480);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionDir('down');
    setTimeout(() => {
      const prevIndex = (activeIndex - 1 + propertyVideos.length) % propertyVideos.length;
      setActiveIndex(prevIndex);
      onVideoChange?.(propertyVideos[prevIndex], prevIndex);
      setIsTransitioning(false);
      animate(y, 0, { duration: 0 });
    }, 480);
  };

  const handleDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    const { offset, velocity } = info;
    if (
      offset.y < -swipeConfig.swipeThreshold ||
      velocity.y < -swipeConfig.velocityThreshold
    ) {
      goToNext();
    } else if (
      offset.y > swipeConfig.swipeThreshold ||
      velocity.y > swipeConfig.velocityThreshold
    ) {
      goToPrev();
    } else {
      animate(y, 0, { type: 'spring', stiffness: 400, damping: 35 });
    }
  };

  return (
    <motion.div
      className="relative w-full h-full bg-black font-sans overflow-hidden flex items-center justify-center"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >

      <motion.div
        ref={containerRef}
        drag="y"
        dragConstraints={{ top: -120, bottom: 120 }}
        dragElastic={swipeConfig.dragElasticity}
        onDragEnd={handleDragEnd}
        style={{ y, width: '100%', height: '100%' }}
        className="relative overflow-hidden z-10 shadow-2xl border-none cursor-grab touch-pan-x bg-neutral-900 shrink-0 flex flex-col"
        whileDrag={{ cursor: 'grabbing' }}
      >
        {/* Simulating Video Element for smooth transitions */}
        <img src={video.thumbnail} alt="Video" className="absolute inset-0 w-full h-full object-cover" />

        <SwipeIndicator
          showUp={activeIndex > 0}
          showDown={true}
          dragProgress={dragProgress.get()}
        />

        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
          
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 pt-12 pb-4 z-20">
            <button
              className="p-2 -ml-2 text-white/90 hover:text-white transition-colors"
              onClick={onBack}
            >
              <ArrowLeft size={24} />
            </button>
            <button className="p-2 -mr-2 text-white/90 hover:text-white transition-colors">
              <MoreVertical size={24} />
            </button>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-[60%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

        <motion.div
          style={{ y: overlayY }}
          className="absolute right-4 bottom-32 z-20 flex flex-col items-center gap-6"
        >
          <ActionIcons video={video} />
        </motion.div>

        <motion.div
          style={{ y: overlayY }}
          className="absolute bottom-0 left-0 right-16 px-4 pb-8 z-20"
        >
          <PropertyOverlay
            video={video}
            agentName={meta.agentName}
            agentAvatarUrl={meta.agentAvatarUrl}
            highlights={meta.highlights}
            onViewProperty={goToNext}
          />
        </motion.div>

        {/* YouTube Controls / Bottom Bar */}
        <div className="absolute bottom-0 inset-x-0 h-10 flex items-center justify-between px-4 z-30">
            <span className="text-[11px] font-medium text-white/80">0:03 / 0:36</span>
            <div className="flex items-center gap-4">
                <div className="flex gap-1">
                    <div className="w-3 h-2 bg-white rounded-[1px]"/>
                    <div className="w-1.5 h-2 bg-red-600 rounded-[1px]"/>
                </div>
                <Maximize size={16} className="text-white/80"/>
            </div>
        </div>

        <div className="absolute bottom-10 left-4 right-4 h-0.5 bg-white/30 z-30 overflow-hidden">
            <div className="h-full bg-red-600 w-[10%]"/>
        </div>

        {isTransitioning && (
          <SwipeTransition
            nextVideo={transitionDir === 'up' ? nextVideo : prevVideo}
            direction={transitionDir}
          />
        )}
      </motion.div>
    </motion.div>
  );
}