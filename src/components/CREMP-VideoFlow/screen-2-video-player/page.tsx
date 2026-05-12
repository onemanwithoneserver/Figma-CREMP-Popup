import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MoreVertical, Maximize } from 'lucide-react';
import type { PropertyVideo } from '../shared/theme/videoflow.types';
import { propertyVideos } from './data';
import { playerMetaMap } from './data';
import ActionIcons from './components/ActionIcons';
import PropertyOverlay from './components/PropertyOverlay';
import { fadeIn } from '../shared/animations/videoflow.animations';

interface VideoPlayerPageProps {
  selectedVideo?: PropertyVideo;
  onBack?: () => void;
  onSwipeNext?: (video: PropertyVideo) => void;
}

const PROGRESS_DURATION = 30; // seconds simulated

export default function VideoPlayerPage({
  selectedVideo,
  onBack,
  onSwipeNext,
}: VideoPlayerPageProps) {
  const video = selectedVideo ?? propertyVideos[0];
  const meta = playerMetaMap[video.id] ?? playerMetaMap['v1'];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 100 / (PROGRESS_DURATION * 10);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [video.id]);

  const handleSwipeNext = () => {
    const currentIndex = propertyVideos.findIndex((v) => v.id === video.id);
    const next = propertyVideos[(currentIndex + 1) % propertyVideos.length];
    onSwipeNext?.(next);
  };

  return (
    <motion.div
      className="relative w-full h-full bg-black font-sans overflow-hidden"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div className="relative w-full h-full">
        <img src={video.thumbnail} alt="Video" className="absolute inset-0 w-full h-full object-cover" />

        {/* Top Gradient */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />

        {/* Header */}
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

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 inset-x-0 h-[60%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

        {/* Action Icons (Right Side) */}
        <div className="absolute right-4 bottom-32 z-20 flex flex-col items-center gap-6">
          <ActionIcons video={video} />
        </div>

        {/* Property Details (Bottom Left) */}
        <div className="absolute bottom-0 left-0 right-16 px-4 pb-8 z-20">
          <PropertyOverlay
            video={video}
            agentName={meta.agentName}
            agentAvatarUrl={meta.agentAvatarUrl}
            highlights={meta.highlights}
            onViewProperty={handleSwipeNext}
          />
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-10 flex items-center justify-between px-4 z-30">
          <span className="text-[11px] font-medium text-white/80">0:06 / {video.duration}</span>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <div className="w-3 h-2 bg-white rounded-[1px]" />
              <div className="w-1.5 h-2 bg-red-600 rounded-[1px]" />
            </div>
            <Maximize size={16} className="text-white/80" />
          </div>
        </div>

        <div className="absolute bottom-10 left-4 right-4 h-0.5 bg-white/30 z-30 overflow-hidden">
          <div className="h-full bg-red-600 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.div>
  );
}