import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Bookmark, Play, X } from 'lucide-react';
import type { PropertyVideo } from '../../shared/theme/videoflow.types';
import { slideUp } from '../../shared/animations/videoflow.animations';

interface PropertyVideoCardProps {
  video: PropertyVideo;
  index: number;
  isTall?: boolean;
  compact?: boolean;
  onSelect: (video: PropertyVideo) => void;
}

const BROKER_MAP: Record<string, string> = {
  Commercial:   'PropVest Realty',
  Franchise:    'Franchise India',
  'Pre-Leased': 'SquareEdge Advisors',
  Fractional:   'FracProp India',
  Education:    'EduSpace Ventures',
};

const CTA_MAP: Record<string, string> = {
  Franchise: 'View Franchise',
  Education: 'View Program',
};

const TAG_BG: Record<string, string> = {
  Commercial:   'rgba(29,78,216,0.88)',
  Franchise:    'rgba(6,95,70,0.90)',
  Fractional:   'rgba(91,33,182,0.90)',
  'Pre-Leased': 'rgba(5,120,85,0.90)',
  Education:    'rgba(146,64,14,0.90)',
};

export default function PropertyVideoCard({ video, index, compact = false, onSelect }: PropertyVideoCardProps) {
  const [isActive, setIsActive] = useState(false);

  const broker   = BROKER_MAP[video.category]  ?? 'CREMP Verified';
  const ctaLabel = CTA_MAP[video.category]     ?? 'View Property';
  const tagBg    = TAG_BG[video.category]      ?? 'rgba(30,41,59,0.88)';

  const bullets: string[] = [];
  const city = video.location.split(',')[0].trim();
  if (city)                                      bullets.push(city);
  if (video.returns)                             bullets.push(video.returns);
  if (video.area && video.area !== 'Fractional') bullets.push(video.area);
  else if (video.price)                          bullets.push(video.price);

  return (
    <motion.div
      variants={slideUp}
      custom={index}
      initial="hidden"
      animate="visible"
      layout
      onClick={() => !isActive && setIsActive(true)}
      className="relative w-full overflow-hidden cursor-pointer select-none"
      style={{
        borderRadius: 18,
        background: '#0a0f1c',
        boxShadow: isActive
          ? '0 12px 48px rgba(0,0,0,0.38), 0 4px 12px rgba(0,0,0,0.2)'
          : '0 4px 18px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.1)',
        fontFamily: 'Outfit, sans-serif',
        transition: 'box-shadow 0.35s ease',
      }}
    >
      {/* ── Height controller ── */}
      <motion.div
        animate={{ height: isActive ? (compact ? 260 : 480) : (compact ? 160 : 220) }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="relative w-full overflow-hidden"
        style={{ borderRadius: 18 }}
      >
        {/* Full-bleed thumbnail */}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />

        {/* Cinematic gradient — lightens top, darkens bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isActive
              ? 'linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.96) 100%)'
              : 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.88) 100%)',
            zIndex: 1,
            transition: 'background 0.3s ease',
          }}
        />

        {/* ─────────────────────────────────
            ALWAYS VISIBLE — tag + compact info
        ───────────────────────────────── */}

        {/* Top row: tag + (close btn when active, duration when idle) */}
        <div
          className="absolute top-3 left-3 right-3 flex items-center justify-between"
          style={{ zIndex: 4 }}
        >
          <span
            className="px-2.5 py-[3.5px] rounded-md text-[9px] font-bold uppercase tracking-widest text-white"
            style={{
              background: tagBg,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {video.tag}
          </span>

          <AnimatePresence mode="wait">
            {isActive ? (
              /* Close / collapse button */
              <motion.button
                key="close"
                aria-label="Collapse"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                onClick={(e) => { e.stopPropagation(); setIsActive(false); }}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(0,0,0,0.52)',
                  border: '1px solid rgba(255,255,255,0.14)',
                }}
              >
                <X size={13} style={{ color: 'rgba(255,255,255,0.8)' }} />
              </motion.button>
            ) : (
              /* Duration pill */
              <motion.span
                key="duration"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="px-2 py-[3px] rounded-[5px] text-[10px] font-semibold text-white"
                style={{
                  background: 'rgba(0,0,0,0.52)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {video.duration}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* ─────────────────────────────────
            IDLE ONLY — compact bottom info
        ───────────────────────────────── */}
        <AnimatePresence>
          {!isActive && !compact && (
            <motion.div
              key="idle-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 inset-x-0 px-3 pb-3 flex flex-col gap-[5px]"
              style={{ zIndex: 3 }}
            >
              <h3
                className="m-0 text-[14px] font-bold text-white leading-snug line-clamp-2"
                style={{ letterSpacing: '-0.012em', fontFamily: 'Outfit, sans-serif' }}
              >
                {video.title}
              </h3>
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
              className="absolute bottom-0 inset-x-0 px-2 pb-2"
              style={{ zIndex: 3 }}
            >
              <p
                className="m-0 text-[10px] font-semibold text-white leading-tight line-clamp-2"
                style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.01em' }}
              >
                {video.title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─────────────────────────────────
            ACTIVE ONLY — all full-detail layers
        ───────────────────────────────── */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="active-layers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.12 }}
              className="absolute inset-0"
              style={{ zIndex: 3 }}
            >
              {/* Right-side action stack */}
              <div
                className="absolute right-3 flex flex-col items-center gap-4"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                {[
                  { icon: Share2,   label: null,    ariaLabel: 'Share',    color: 'white',                                   fill: 'none' },
                  { icon: Bookmark, label: 'Save',  ariaLabel: 'Save',     color: video.isBookmarked ? '#d4af37' : 'white', fill: video.isBookmarked ? '#d4af37' : 'none' },
                ].map(({ icon: Icon, label, ariaLabel, color, fill }) => (
                  <div key={ariaLabel} className="flex flex-col items-center gap-[3px]">
                    <button
                      aria-label={ariaLabel}
                      onClick={(e) => e.stopPropagation()}
                      className="w-[38px] h-[38px] rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(0,0,0,0.38)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                    >
                      <Icon size={17} style={{ color }} fill={fill} />
                    </button>
                    {label && <span className="text-[10px] font-semibold text-white leading-none">{label}</span>}
                  </div>
                ))}
              </div>

              {/* Play button — centre */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.22)',
                  }}
                >
                  <Play size={22} fill="white" style={{ color: 'white', marginLeft: 3 }} />
                </div>
              </div>

              {/* Bottom info: broker + title + bullets */}
              <div
                className="absolute left-3 right-14 flex flex-col gap-[6px]"
                style={{ bottom: 50 }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full overflow-hidden shrink-0"
                    style={{ border: '1.5px solid rgba(212,175,55,0.5)' }}
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(broker.slice(0, 1))}&background=1a2540&color=d4af37&size=56`}
                      alt={broker}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10.5px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    By <span className="font-semibold text-white">{broker}</span>
                    {'  '}<span style={{ color: '#4ade80', fontSize: 10 }}>●</span>
                  </span>
                </div>

                <h3
                  className="m-0 text-[15px] font-bold text-white leading-snug line-clamp-2"
                  style={{ letterSpacing: '-0.015em' }}
                >
                  {video.title}
                </h3>

                <p className="m-0 text-[10.5px] leading-snug" style={{ color: 'rgba(255,255,255,0.48)' }}>
                  {bullets.join(' • ')}
                </p>
              </div>

              {/* YouTube control bar */}
              <div
                className="absolute left-0 right-0 bottom-[3px] flex items-center justify-between px-3"
                style={{
                  height: 44,
                  background: 'rgba(0,0,0,0.72)',
                  backdropFilter: 'blur(10px)',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <svg width="17" height="12" viewBox="0 0 18 13" fill="none">
                    <path d="M17.63 2.04C17.43 1.3 16.85.72 16.11.52 14.7 0 9 0 9 0S3.3 0 1.89.52C1.15.72.57 1.3.37 2.04 0 3.45 0 6.5 0 6.5s0 3.05.37 4.46c.2.74.78 1.32 1.52 1.52C3.3 13 9 13 9 13s5.7 0 7.11-.52c.74-.2 1.32-.78 1.52-1.52C18 9.55 18 6.5 18 6.5s0-3.05-.37-4.46z" fill="#FF0000" />
                    <path d="M7.2 9.25L11.86 6.5 7.2 3.75v5.5z" fill="white" />
                  </svg>
                  <span className="text-[9.5px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    0:05 / {video.duration}
                  </span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.36)" strokeWidth="2" style={{ marginLeft: 2 }}>
                    <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
                    <path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
                  </svg>
                </div>

                <button
                  aria-label={ctaLabel}
                  onClick={(e) => { e.stopPropagation(); onSelect(video); }}
                  className="flex items-center gap-1.5 px-3.5 py-[6px] rounded-[8px]"
                  style={{
                    background: '#7c3aed',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(124,58,237,0.35)',
                  }}
                >
                  <span className="text-[11px] font-semibold text-white whitespace-nowrap">{ctaLabel}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              {/* YouTube progress bar */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: 3, background: 'rgba(255,255,255,0.14)' }}
              >
                <div style={{ width: '15%', height: '100%', background: '#ff0000', borderRadius: '0 2px 2px 0' }} />
                <div style={{
                  position: 'absolute', left: '15%', top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 10, height: 10, borderRadius: '50%', background: '#ff0000',
                }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
