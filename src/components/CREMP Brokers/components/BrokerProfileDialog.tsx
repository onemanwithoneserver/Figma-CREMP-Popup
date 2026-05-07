/**
 * BrokerProfileDialog.tsx
 * Desktop:  centered modal dialog with backdrop
 * Mobile:   full-height bottom sheet
 * Both animate in smoothly and close on backdrop click or ESC.
 */

import { useEffect, useRef, useState } from 'react';
import type { Broker } from '../types/broker.types';
import BrokerProfilePage from './BrokerProfilePage';

export interface BrokerProfileDialogProps {
  broker: Broker;
  isDesktop: boolean;
  onClose: () => void;
}

// ─── Animated mount (same hook pattern used across the module) ───────────────
function useAnimatedMount(_durationMs = 300) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Double rAF so CSS transition fires after paint
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, []);

  return visible;
}

// ─── Desktop centered dialog ─────────────────────────────────────────────────
function DesktopDialog({ broker, onClose }: BrokerProfileDialogProps) {
  const visible = useAnimatedMount(280);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      role="presentation"
      className="absolute inset-0 z-[200] flex items-center justify-center px-8 py-6"
      style={{
        background: 'rgba(10,17,40,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 240ms ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Wrapper — relative so the X button can float outside overflow-hidden panel */}
      <div
        className="relative"
        style={{
          width: 'min(920px, calc(100vw - 64px))',
          height: '80vh',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Floating close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute -top-3 -right-3 z-[10] w-8 h-8 bg-white rounded-[4px] border border-black/[0.1] flex items-center justify-center shadow-md hover:bg-[#f5f5f5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/40"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-3.5 h-3.5">
            <path d="M4 4l8 8M12 4L4 12" />
          </svg>
        </button>

        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Profile: ${broker.name}`}
          className="w-full h-full bg-[#fafafb] rounded-[4px] shadow-[0_32px_80px_rgba(0,0,0,0.28)] overflow-hidden flex flex-col"
        >
          {/* Profile page fills the dialog */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <BrokerProfilePage broker={broker} isDesktop />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile draggable bottom-sheet ───────────────────────────────────────────
const SHEET_MIN_VH = 30;
const SHEET_MAX_VH = 90;
const DISMISS_VH   = 25; // below this → dismiss

function MobileDialog({ broker, onClose }: BrokerProfileDialogProps) {
  const visible    = useAnimatedMount(320);
  const sheetRef   = useRef<HTMLDivElement>(null);
  const startY     = useRef(0);
  const startVh    = useRef(0);
  const dragging   = useRef(false);
  const [sheetVh, setSheetVh] = useState(90); // initial height — 10% space at top

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current  = true;
    startY.current    = e.touches[0].clientY;
    startVh.current   = sheetVh;
    if (sheetRef.current) sheetRef.current.style.transition = 'none';
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    // drag up → positive delta → taller; drag down → shorter
    const deltaVh = ((startY.current - e.touches[0].clientY) / window.innerHeight) * 100;
    const next    = Math.min(SHEET_MAX_VH, Math.max(SHEET_MIN_VH, startVh.current + deltaVh));
    if (sheetRef.current) sheetRef.current.style.height = `${next}vh`;
  };

  const onTouchEnd = () => {
    dragging.current = false;
    if (!sheetRef.current) return;
    const currentVh = (sheetRef.current.getBoundingClientRect().height / window.innerHeight) * 100;
    if (currentVh < DISMISS_VH) {
      onClose();
    } else {
      // restore transition and lock in new height via state
      sheetRef.current.style.transition = '';
      setSheetVh(Math.round(currentVh));
    }
  };

  return (
    <div
      role="presentation"
      className="absolute inset-0 z-[200] flex flex-col justify-end"
      style={{
        background: 'rgba(10,17,40,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 240ms ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Profile: ${broker.name}`}
        className="relative w-full bg-[#fafafb] rounded-t-[12px] shadow-[0_-8px_40px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden"
        style={{
          height: `${sheetVh}vh`,
          maxHeight: `${SHEET_MAX_VH}vh`,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 340ms cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* ── Drag handle row — matches profile header ── */}
        <div
          className="shrink-0 relative flex items-center justify-center pt-3 pb-2 touch-none select-none cursor-grab active:cursor-grabbing"
          style={{ background: 'linear-gradient(135deg,#0a1128 0%,#111c38 60%,#0a1128 100%)' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            aria-label="Drag to resize panel. Use Up/Down arrow keys to expand or collapse."
            aria-roledescription="drag handle"
            className="w-10 h-4 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            onKeyDown={(e) => {
              const STEP = 10;
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                const next = Math.min(SHEET_MAX_VH, sheetVh + STEP);
                setSheetVh(next);
              } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const next = sheetVh - STEP;
                if (next < DISMISS_VH) { onClose(); } else { setSheetVh(Math.max(SHEET_MIN_VH, next)); }
              }
            }}
          >
            <span className="w-10 h-1 rounded-full bg-white/[0.3] pointer-events-none" />
          </button>
          {/* Close button pinned right of drag row */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-white rounded-[4px] border border-white/[0.15] hover:bg-white/[0.9] transition-colors focus-visible:outline-none"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-3 h-3">
              <path d="M4 4l8 8M12 4L4 12" />
            </svg>
          </button>
        </div>

        {/* Profile content */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <BrokerProfilePage broker={broker} isDesktop={false} />
        </div>
      </div>
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────
export default function BrokerProfileDialog(props: BrokerProfileDialogProps) {
  return props.isDesktop
    ? <DesktopDialog {...props} />
    : <MobileDialog {...props} />;
}
