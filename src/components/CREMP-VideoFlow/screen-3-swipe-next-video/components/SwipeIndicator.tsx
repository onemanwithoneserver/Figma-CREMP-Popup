import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SwipeIndicatorProps {
  showUp?: boolean;
  showDown?: boolean;
  dragProgress?: number;
}

export default function SwipeIndicator({ showUp = true, showDown = true, dragProgress = 0 }: SwipeIndicatorProps) {
  const upOpacity = Math.max(0, -dragProgress * 2);
  const downOpacity = Math.max(0, dragProgress * 2);

  return (
    <>
      {showUp && (
        <motion.div
          className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 pointer-events-none z-30"
          animate={{ opacity: 0.45 + upOpacity * 0.55 }}
          transition={{ duration: 0.15 }}
        >
          <ChevronUp size={20} className="text-white/70" />
          <span className="text-[10px] text-white/50 font-sans font-bold tracking-widest">
            PREV
          </span>
        </motion.div>
      )}

      {showDown && (
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 pointer-events-none z-30 animate-bounce"
          animate={{ opacity: 0.45 + downOpacity * 0.55 }}
          transition={{ duration: 0.15 }}
        >
          <span className="text-[10px] text-white/50 font-sans font-bold tracking-widest">
            NEXT
          </span>
          <ChevronDown size={20} className="text-white/70" />
        </motion.div>
      )}
    </>
  );
}