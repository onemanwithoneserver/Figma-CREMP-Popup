import { useEffect, useRef, useState } from 'react';
import type { Broker } from '../types/broker.types';
import BrokerProfilePage from './BrokerProfilePage/index';

export interface BrokerProfileDialogProps {
  broker: Broker;
  isDesktop: boolean;
  onClose: () => void;
}

function useBodyScrollLock() {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}

function useAnimatedMount() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, []);
  return visible;
}

function DesktopDialog({ broker, onClose }: BrokerProfileDialogProps) {
  const visible = useAnimatedMount();
  useBodyScrollLock();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[120px] pb-8 px-8 bg-[#0a1128]/60 backdrop-blur-[4px]"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 300ms ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-[940px]"
        style={{
          height: 'min(82vh, 840px)',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out',
          opacity: visible ? 1 : 0,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute -top-3 -right-3 z-20 w-8 h-8 bg-white rounded-lg shadow-xl border border-black/5 flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.5" strokeLinecap="round" className="w-3 h-3">
            <path d="M4 4l8 8M12 4L4 12" />
          </svg>
        </button>

        <div
          role="dialog"
          aria-modal="true"
          className="w-full h-full bg-[#fafafb] rounded-xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
        >
          <BrokerProfilePage broker={broker} isDesktop />
        </div>
      </div>
    </div>
  );
}

const SHEET_MIN_VH = 30;
const SHEET_MAX_VH = 90;
const DISMISS_VH = 25;

function MobileDialog({ broker, onClose }: BrokerProfileDialogProps) {
  const visible = useAnimatedMount();
  useBodyScrollLock();

  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const startVh = useRef(0);
  const dragging = useRef(false);
  const [sheetVh, setSheetVh] = useState(SHEET_MAX_VH);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    startY.current = e.touches[0].clientY;
    startVh.current = sheetVh;
    if (sheetRef.current) sheetRef.current.style.transition = 'none';
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    const deltaVh = ((startY.current - e.touches[0].clientY) / window.innerHeight) * 100;
    const next = Math.min(SHEET_MAX_VH, Math.max(SHEET_MIN_VH, startVh.current + deltaVh));
    if (sheetRef.current) sheetRef.current.style.height = `${next}vh`;
  };

  const onTouchEnd = () => {
    dragging.current = false;
    if (!sheetRef.current) return;
    const currentVh = (sheetRef.current.getBoundingClientRect().height / window.innerHeight) * 100;
    if (currentVh < DISMISS_VH) {
      onClose();
    } else {
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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full bg-[#fafafb] shadow-[0_-8px_40px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden"
        style={{
          height: `${sheetVh}vh`,
          maxHeight: `${SHEET_MAX_VH}vh`,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 340ms cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        <div
          className="shrink-0 relative flex items-center justify-center pt-3 pb-3 touch-none select-none cursor-grab active:cursor-grabbing border-b border-white/[0.08]"
          style={{ background: 'linear-gradient(135deg, #0a1128 0%, #0d1630 100%)' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            aria-label="Drag to resize panel"
            className="w-12 h-4 flex items-center justify-center rounded-full focus-visible:outline-none"
          >
            <span className="w-10 h-1.5 rounded-full bg-white/[0.3] pointer-events-none" />
          </button>
          
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-white rounded-[4px] shadow-sm hover:bg-gray-100 transition-colors focus-visible:outline-none"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" className="w-3.5 h-3.5">
              <path d="M4 4l8 8M12 4L4 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <BrokerProfilePage broker={broker} isDesktop={false} />
        </div>
      </div>
    </div>
  );
}

export default function BrokerProfileDialog(props: BrokerProfileDialogProps) {
  return props.isDesktop ? <DesktopDialog {...props} /> : <MobileDialog {...props} />;
}