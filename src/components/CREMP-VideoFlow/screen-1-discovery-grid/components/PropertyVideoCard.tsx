import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PropertyVideo } from '../../shared/theme/videoflow.types';
import { slideUp } from '../../shared/animations/videoflow.animations';
import VideoCardView from './VideoCardView';

interface PropertyVideoCardProps {
  video: PropertyVideo;
  index: number;
  isTall?: boolean;
  compact?: boolean;
  onSelect: (video: PropertyVideo) => void;
}

const BROKER_MAP: Record<string, string> = {
  Commercial: 'PropVest Realty',
  Franchise: 'Chai Point',
  'Pre-Leased': 'SquareEdge Advisors',
  Fractional: 'FracProp India',
  Education: 'EduSpace Ventures',
};

const CTA_MAP: Record<string, string> = {
  Franchise: 'View Franchise',
  Education: 'View Program',
};

const TAG_BG: Record<string, string> = {
  Commercial: 'rgba(29,78,216,0.88)',
  Franchise: 'rgba(6,95,70,0.90)',
  Fractional: 'rgba(91,33,182,0.90)',
  'Pre-Leased': 'rgba(5,120,85,0.90)',
  Education: 'rgba(146,64,14,0.90)',
};

// Custom icons removed, moved to VideoCardView

export default function PropertyVideoCard({ video, index, compact = false, onSelect }: PropertyVideoCardProps) {
  const [isActive, setIsActive] = useState(false);

  const broker = BROKER_MAP[video.category] ?? 'CREMP Verified';
  const ctaLabel = CTA_MAP[video.category] ?? 'View Property';
  const tagBg = TAG_BG[video.category] ?? 'rgba(30,41,59,0.88)';

  const featuresText = useMemo(() => {
    const features = [];
    if (video.category === 'Commercial') {
      features.push('Prime location', 'High rental yield', 'Grade A construction');
    } else if (video.category === 'Franchise') {
      features.push('Low investment', 'High returns', 'Proven brand');
    } else if (video.category === 'Pre-Leased') {
      features.push('High rental yield', 'Grade A asset', 'Excellent connectivity');
    } else {
      features.push(video.location.split(',')[0].trim());
      if (video.returns) features.push(video.returns);
      if (video.area && video.area !== 'Fractional') features.push(video.area);
      else if (video.price) features.push(video.price);
    }
    return features.join(' • ');
  }, [video]);

  // Handle counts based on category for examples to look real
  const likesCount = video.category === 'Commercial' ? 128 : video.category === 'Franchise' ? 96 : 84;
  const commentsCount = video.category === 'Commercial' ? 18 : video.category === 'Franchise' ? 12 : 14;
  const sharesCount = video.category === 'Commercial' ? 24 : video.category === 'Franchise' ? 16 : 20;

  return (
    <motion.div
      variants={slideUp}
      custom={index}
      initial="hidden"
      animate="visible"
      layout
      onClick={() => !isActive && setIsActive(true)}
      className={
        isActive
          ? 'absolute inset-0 z-[100] flex flex-col overflow-hidden bg-[#0a0f1c]'
          : 'relative w-full cursor-pointer select-none overflow-hidden'
      }
      style={{
        borderRadius: isActive ? 0 : 4,
        background: '#0a0f1c',
        boxShadow: isActive ? 'none' : '0 4px 18px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.1)',
        fontFamily: 'Outfit, sans-serif',
        transition: 'box-shadow 0.35s ease, border-radius 0.35s ease',
      }}
    >
      <motion.div
        animate={{ height: isActive ? '100%' : compact ? 160 : 220 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="relative w-full flex-shrink-0"
        style={{ borderRadius: isActive ? 0 : 4, minHeight: isActive ? '100%' : 'auto' }}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0 }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isActive
              ? 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.98) 100%)'
              : 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.88) 100%)',
            zIndex: 1,
            transition: 'background 0.3s ease',
          }}
        />

        <div
          className={`absolute flex items-center ${compact && !isActive ? 'left-1.5 top-1.5' : 'left-4 top-4'}`}
          style={{ zIndex: 10 }}
        >
          <AnimatePresence mode="wait">
            {!isActive && (
              <motion.span
                key="tag"
                className={`rounded-[2px] px-1.5 py-[2px] font-bold tracking-widest text-white ${compact && !isActive ? 'text-[6px]' : 'text-[9px]'
                  }`}
                style={{
                  background: tagBg,
                  backdropFilter: 'blur(10px)',
                  border: compact && !isActive ? 'none' : '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {video.tag}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!isActive && !compact && (
            <motion.div
              key="idle-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 bottom-0 flex flex-col gap-[5px] px-3 pb-3"
              style={{ zIndex: 3 }}
            >
              <h3
                className="m-0 line-clamp-2 text-[14px] font-bold leading-snug text-white"
                style={{ letterSpacing: '-0.012em', fontFamily: 'Outfit, sans-serif' }}
              >
                {video.title}
              </h3>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <span
                  className="shrink-0 text-[10px] font-semibold"
                  style={{ color: '#d4af37', fontFamily: 'Outfit, sans-serif' }}
                >
                  {video.returns}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 9 }}>·</span>
                <span
                  className="truncate text-[10px] font-medium"
                  style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Outfit, sans-serif' }}
                >
                  {video.location}
                </span>
              </div>
            </motion.div>
          )}
          {!isActive && compact && (
            <motion.div
              key="idle-compact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-2 pb-2"
              style={{ zIndex: 3 }}
            >
              <p
                className="m-0 line-clamp-3 text-[10.5px] font-bold leading-tight text-white"
                style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.01em' }}
              >
                {video.title.split(' ').map((word, i) => {
                  const cleanWord = word.replace(/[^a-zA-Z-]/g, '');
                  const highlightColors: Record<string, string> = {
                    Franchise: '#4ade80',
                    Business: '#4ade80',
                    Kompally: '#60a5fa',
                    Warehouse: '#60a5fa',
                    Fractional: '#c084fc',
                  };
                  const color = highlightColors[cleanWord];
                  return color ? (
                    <span key={i} style={{ color: color }}>
                      {word}{' '}
                    </span>
                  ) : (
                    <span key={i} style={{ color: 'rgba(255,255,255,0.9)' }}>
                      {word}{' '}
                    </span>
                  );
                })}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isActive && (
            <VideoCardView
              video={video}
              broker={broker}
              featuresText={featuresText}
              ctaLabel={ctaLabel}
              likesCount={likesCount}
              commentsCount={commentsCount}
              sharesCount={sharesCount}
              onClose={() => setIsActive(false)}
              onSelect={onSelect}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}