import { motion } from 'framer-motion';
import { Play, Eye } from 'lucide-react';
import type { PropertyVideo } from '../../shared/theme/videoflow.types';
import { slideUp } from '../../shared/animations/videoflow.animations';

interface PropertyVideoCardProps {
  video: PropertyVideo;
  index: number;
  isTall?: boolean;
  onSelect: (video: PropertyVideo) => void;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

const getTagClass = (tag: string): string => {
  const t = tag.toLowerCase();
  if (t.includes('commercial')) return 'vf-tag-commercial';
  if (t.includes('franchise'))  return 'vf-tag-franchise';
  if (t.includes('fractional')) return 'vf-tag-fractional';
  if (t.includes('pre-leased') || t.includes('preleased')) return 'vf-tag-preleased';
  if (t.includes('education'))  return 'vf-tag-education';
  return 'vf-tag-default';
};

export default function PropertyVideoCard({ video, index, isTall = false, onSelect }: PropertyVideoCardProps) {
  return (
    <motion.div
      variants={slideUp}
      custom={index}
      initial="hidden"
      animate="visible"
      onClick={() => onSelect(video)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.97 }}
      className={`vf-luxury-card w-full ${isTall ? 'h-[270px]' : 'h-[215px]'}`}
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ zIndex: 0 }}
      />

      {/* Top vignette — darkens sky/top for tag legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(6,10,18,0.6) 0%, rgba(6,10,18,0) 42%)',
          zIndex: 1,
        }}
      />

      {/* Bottom cinematic overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 32%, rgba(5,8,16,0.98) 100%)',
          zIndex: 1,
        }}
      />

      {/* Category tag — top left */}
      <div className="absolute top-2.5 left-2.5" style={{ zIndex: 3 }}>
        <span
          className={`px-2 py-[3px] rounded-[5px] text-[9px] font-bold text-white uppercase tracking-widest ${getTagClass(video.tag)}`}
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {video.tag}
        </span>
      </div>

      {/* Duration pill — top right */}
      <div className="absolute top-2.5 right-2.5" style={{ zIndex: 3 }}>
        <span
          className="px-2 py-[3px] rounded-[5px] text-[10px] font-semibold text-white"
          style={{
            background: 'rgba(0,0,0,0.52)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          {video.duration}
        </span>
      </div>

      {/* Card info — bottom */}
      <div
        className="absolute bottom-0 inset-x-0 px-3 pb-3 flex flex-col gap-[5px]"
        style={{ zIndex: 3 }}
      >
        {/* View count */}
        <div className="flex items-center gap-1">
          <Eye size={9} strokeWidth={2.5} style={{ color: 'rgba(255,255,255,0.42)' }} />
          <span
            className="text-[9.5px] font-semibold"
            style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Outfit, sans-serif' }}
          >
            {formatCount(video.likes)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[13px] font-semibold text-white leading-snug line-clamp-2 m-0"
          style={{ letterSpacing: '-0.01em', fontFamily: 'Outfit, sans-serif' }}
        >
          {video.title}
        </h3>

        {/* Returns · Location */}
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span
            className="text-[10px] font-semibold shrink-0"
            style={{ color: '#d4af37', fontFamily: 'Outfit, sans-serif' }}
          >
            {video.returns}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 9 }}>·</span>
          <span
            className="text-[10px] font-medium truncate"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit, sans-serif' }}
          >
            {video.location}
          </span>
        </div>
      </div>

      {/* Play button — revealed on hover via CSS (.vf-play-overlay) */}
      <div
        className="vf-play-overlay absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 4 }}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.24)',
          }}
        >
          <Play size={17} fill="white" style={{ color: 'white', marginLeft: 2 }} />
        </div>
      </div>
    </motion.div>
  );
}