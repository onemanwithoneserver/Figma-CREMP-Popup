import { motion } from 'framer-motion';
import { Play, TrendingUp } from 'lucide-react';
import type { PropertyVideo } from '../../shared/theme/videoflow.types';
import { hoverScale } from '../../shared/animations/videoflow.animations';

interface SuggestedPreviewStripProps {
  label: string;
  labelColor: string;
  videos: PropertyVideo[];
  onSelect: (video: PropertyVideo) => void;
}

export default function SuggestedPreviewStrip({
  label,
  labelColor,
  videos,
  onSelect,
}: SuggestedPreviewStripProps) {
  return (
    <div className="flex flex-col gap-3">
      <p 
        className="text-[13px] font-bold tracking-wide px-4" 
        style={{ color: labelColor }}
      >
        {label}
      </p>

      <div className="flex gap-3 px-4 overflow-x-auto touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {videos.map((video) => (
          <motion.button
            key={video.id}
            onClick={() => onSelect(video)}
            className="shrink-0 w-[130px] h-[180px] rounded-xl overflow-hidden relative border border-white/10 bg-transparent cursor-pointer p-0 group"
            {...hoverScale}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 border border-white/30 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <Play size={14} fill="white" className="text-white ml-0.5" />
            </div>
            
            <div className="absolute bottom-0 inset-x-0 p-2.5 flex flex-col items-start text-left">
              <p className="text-[11px] font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
                {video.title}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={10} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-400 drop-shadow-sm">
                  {video.returns}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}