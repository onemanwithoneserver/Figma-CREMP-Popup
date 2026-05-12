import { motion } from 'framer-motion';
import type { PropertyVideo } from '../../shared/theme/videoflow.types';

interface SwipeTransitionProps {
  nextVideo: PropertyVideo;
  direction: 'up' | 'down';
}

export default function SwipeTransition({ nextVideo, direction }: SwipeTransitionProps) {
  const yFrom = direction === 'up' ? '100%' : '-100%';

  return (
    <motion.div
      className="absolute inset-0 z-50 overflow-hidden"
      initial={{ y: yFrom, opacity: 0.7 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={nextVideo.thumbnail}
        alt={nextVideo.title}
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <motion.div
          className="w-14 h-14 rounded-full border-[3px] border-white/10 border-t-violet-600 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        
        <div className="flex flex-col items-center gap-1.5 text-center px-6">
          <p className="text-[18px] font-bold text-white font-sans m-0 drop-shadow-lg tracking-wide">
            {nextVideo.title}
          </p>
          <p className="text-[13px] font-medium text-emerald-400 font-sans m-0 drop-shadow-md">
            {nextVideo.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}