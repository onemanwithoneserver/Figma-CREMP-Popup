import { motion } from 'framer-motion';
import { Share2, Bookmark, ChevronLeft, EyeOff, Maximize2 } from 'lucide-react';
import type { PropertyVideo } from '../../shared/theme/videoflow.types';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const YoutubeLogo = () => (
  <svg width="24" height="16" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
    <path
      d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"
      fill="#FF0000"
    />
    <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" fill="white" />
  </svg>
);

interface VideoCardViewProps {
  video: PropertyVideo;
  broker: string;
  featuresText: string;
  ctaLabel: string;
  sharesCount: number;
  onClose: () => void;
  onSelect: (video: PropertyVideo) => void;
  onHide?: (video: PropertyVideo) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

const bottomVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24, delay: 0.1 } },
};

export default function VideoCardView({
  video,
  broker,
  featuresText,
  ctaLabel,
  sharesCount,
  onClose,
  onSelect,
  onHide,
}: VideoCardViewProps) {
  return (
    <>
      <div className="absolute left-3 top-3 z-20 flex items-center">
        <motion.button
          key="back"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-colors hover:bg-black/40 border border-white/10"
        >
          <ChevronLeft size={18} strokeWidth={2.5} className="text-white pr-0.5" />
        </motion.button>
      </div>

      <motion.div
        key="active-layers"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/50 to-transparent pb-3"
      >
        <div className="relative flex w-full flex-col px-3 pb-1">
          <div className="flex w-full items-end justify-between gap-3 pb-3">
            <motion.div
              variants={bottomVariants}
              initial="hidden"
              animate="show"
              className="flex flex-1 flex-col gap-1.5 pt-2 drop-shadow-lg"
            >
              <h3 className="m-0 text-[18px] font-bold leading-tight tracking-tight text-white">
                {video.title}
              </h3>

              <p className="m-0 text-[13px] leading-snug text-white/85">
                {featuresText}
              </p>

              <div className="flex items-center gap-2 pt-1.5">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border-[1.5px] border-[#d4af37]/70 shadow-md">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      broker.slice(0, 1)
                    )}&background=1a2540&color=d4af37&size=64`}
                    alt={broker}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-[12.5px] text-white/80">
                  By{' '}
                  <span className="font-semibold tracking-wide text-white">
                    {broker}
                    <svg
                      viewBox="0 0 22 22"
                      fill="none"
                      className="relative -top-[1px] ml-0.5 inline-block h-3.5 w-3.5"
                    >
                      <path
                        d="M22 11L19.56 8.21L19.9 4.52L16.29 3.7L14.4 0.5L11 1.96L7.6 0.5L5.71 3.69L2.1 4.51L2.44 8.2L0 11L2.44 13.8L2.1 17.49L5.71 18.31L7.6 21.5L11 20.03L14.4 21.49L16.29 18.3L19.9 17.48L19.56 13.79L22 11ZM11 16L7 12L8.41 10.59L11 13.17L17.59 6.58L19 8L11 16Z"
                        fill="#60a5fa"
                      />
                    </svg>
                  </span>
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center gap-3 pt-2"
            >
              {[
                { icon: Share2, count: sharesCount, ariaLabel: 'Share' },
                { icon: Bookmark, label: 'Save', ariaLabel: 'Save' },
                { icon: EyeOff, label: 'Hide', ariaLabel: 'Hide' },
              ].map(({ icon: Icon, count, label, ariaLabel }) => (
                <motion.div variants={itemVariants} key={ariaLabel} className="flex flex-col items-center gap-1 group">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={ariaLabel}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (ariaLabel === 'Hide' && onHide) {
                        onHide(video);
                      }
                    }}
                    className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 border border-white/5 shadow-lg"
                  >
                    <Icon
                      size={16}
                      className="text-white drop-shadow-md"
                      fill={ariaLabel === 'Save' && video.isBookmarked ? '#d4af37' : 'none'}
                      color={ariaLabel === 'Save' && video.isBookmarked ? '#d4af37' : 'white'}
                    />
                  </motion.button>
                  {count !== undefined && (
                    <span className="text-[10px] font-semibold tracking-wide text-white drop-shadow-md">{count}</span>
                  )}
                  {label && (
                    <span className="text-[10px] font-semibold tracking-wide text-white drop-shadow-md">{label}</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.button
            variants={bottomVariants}
            initial="hidden"
            animate="show"
            aria-label={ctaLabel}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(video);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 py-2.5 shadow-[0_4px_20px_rgb(0,0,0,0.3)]"
            style={{
              background: video.category === 'Franchise' ? 'linear-gradient(135deg, rgba(6,95,70,0.95), rgba(4,120,87,0.95))' : 'linear-gradient(135deg, rgba(29,78,216,0.95), rgba(37,99,235,0.95))',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className="whitespace-nowrap text-[14px] font-bold text-white tracking-wide">{ctaLabel}</span>
            <ArrowIcon />
          </motion.button>
        </div>

        <motion.div
          variants={bottomVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex w-full flex-col px-3 pt-3"
        >
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
            <motion.div
              layoutId="progress"
              className="h-full rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-200"
              style={{
                background: video.category === 'Franchise' ? '#4ade80' : '#d4af37',
                width: `${((video.currentTime ?? 0) / (video.totalDuration ?? 1)) * 100}%`,
              }}
            />
          </div>

          <div className="flex w-full items-center justify-between pt-2">
            <span className="text-[11px] font-semibold tracking-widest text-white/80 drop-shadow-md">
              {video.category === 'Commercial' ? '0:05' : video.category === 'Franchise' ? '0:03' : '0:02'} /{' '}
              {video.category === 'Commercial' ? '0:42' : video.category === 'Franchise' ? '0:36' : '0:45'}
            </span>
            <div className="flex items-center gap-3">
              <YoutubeLogo />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <Maximize2 size={16} className="text-white drop-shadow-md" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}