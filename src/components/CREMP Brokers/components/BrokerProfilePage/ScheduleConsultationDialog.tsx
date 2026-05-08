import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import type { Broker } from '../../types/broker.types';
import type { JSX } from 'react';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getNextDays(count: number): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function getSlotsForDate(date: Date): { time: string; available: boolean }[] {
  const isSunday = date.getDay() === 0;
  const base = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM',
  ];
  return base.map((time, i) => ({
    time,
    available: !isSunday && i % 3 !== 2,
  }));
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

type MeetingType = 'video' | 'phone' | 'in-person';

interface ScheduleConsultationDialogProps {
  broker: Broker;
  isDesktop: boolean;
  onClose: () => void;
}

export function ScheduleConsultationDialog({ broker, isDesktop, onClose }: ScheduleConsultationDialogProps) {
  const days = getNextDays(14);
  const today = days[0];

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [meetingType, setMeetingType] = useState<MeetingType>('video');
  const [note, setNote] = useState('');
  const [scheduled, setScheduled] = useState(false);

  const dateStripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = dateStripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = dateStripRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', updateScrollState); ro.disconnect(); };
  }, [updateScrollState]);

  function scrollDates(dir: 'left' | 'right') {
    const el = dateStripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -140 : 140, behavior: 'smooth' });
  }

  const slots = getSlotsForDate(selectedDate);

  useEffect(() => { setSelectedTime(null); }, [selectedDate]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const canSchedule = selectedTime !== null;

  function handleSchedule() {
    if (!canSchedule) return;
    setScheduled(true);
  }

  if (scheduled) {
    return (
      <Backdrop onClose={onClose}>
        <Sheet isDesktop={isDesktop} onClose={onClose}>
          <div className="flex flex-col items-center justify-center gap-3 py-8 px-4 text-center font-['Outfit',sans-serif] animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-[4px] flex items-center justify-center bg-[#047857]/10 animate-bounce">
              <svg viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M4 12l5 5L20 6" />
              </svg>
            </div>
            <div>
              <p className="text-[16px] font-bold text-[#0a1128]">Consultation Scheduled!</p>
              <p className="text-[12px] text-[#637089] mt-1">
                {MONTH_LABELS[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()} · {selectedTime}
              </p>
              <p className="text-[12px] text-[#637089] mt-0.5">{broker.name} will confirm shortly.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-8 py-2 rounded-[4px] text-sm font-medium text-white focus-visible:outline-none bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide font-['Outfit',sans-serif]"
            >
              Done
            </button>
          </div>
        </Sheet>
      </Backdrop>
    );
  }

  return (
    <Backdrop onClose={onClose}>
      <Sheet isDesktop={isDesktop} onClose={onClose}>
        <div className="flex items-center justify-between px-3.5 pt-3.5 pb-2.5 border-b border-black/[0.06] font-['Outfit',sans-serif]">
          <div>
            <p className="text-[14px] font-bold text-[#0a1128]">Schedule Consultation</p>
            <p className="text-[11px] text-[#637089] mt-0.5">with {broker.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-7 h-7 rounded-[4px] flex items-center justify-center hover:bg-black/[0.06] hover:rotate-90 active:scale-90 transition-all duration-300 focus-visible:outline-none"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="#3d4f6b" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-3.5 py-2.5 space-y-4 font-['Outfit',sans-serif]">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-[3px] h-[12px] rounded-full bg-[#d4af37] shrink-0 block" />
              <p className="text-[12px] font-bold text-[#0a1128]">Meeting Type</p>
            </div>
            <div className="flex gap-1.5">
              {(['video', 'phone', 'in-person'] as MeetingType[]).map(type => {
                const active = meetingType === type;
                const iconColor = active ? '#ffffff' : 'currentColor';
                const icons: Record<MeetingType, JSX.Element> = {
                  video: (
                    <svg viewBox="0 0 16 16" fill="none" stroke={iconColor} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <rect x="1" y="4" width="10" height="8" rx="1.5" />
                      <path d="M11 6.5l4-2v7l-4-2" />
                    </svg>
                  ),
                  phone: (
                    <svg viewBox="0 0 16 16" fill="none" stroke={iconColor} strokeWidth="1.7" strokeLinecap="round" className="w-3.5 h-3.5">
                      <path d="M3 2h3l1.5 3.5-1.75 1a7 7 0 003.75 3.75l1-1.75L14 11v3a1 1 0 01-1 1A11 11 0 012 4a1 1 0 011-1z" />
                    </svg>
                  ),
                  'in-person': (
                    <svg viewBox="0 0 16 16" fill="none" stroke={iconColor} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <circle cx="8" cy="5" r="2.5" />
                      <path d="M2.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" />
                    </svg>
                  ),
                };
                const labels: Record<MeetingType, string> = { video: 'Video Call', phone: 'Phone Call', 'in-person': 'In Person' };
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMeetingType(type)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-[4px] text-[11.5px] font-semibold border hover:-translate-y-[1px] hover:shadow-sm active:scale-95 active:translate-y-0 transition-all duration-200 focus-visible:outline-none ${
                      active 
                        ? 'bg-[#0a1128] text-white border-[#0a1128]' 
                        : 'bg-[#f5f6fa] text-[#3d4f6b] border-[#0a1128]/10 hover:border-[#0a1128]/30 hover:bg-[#0a1128]/[0.02]'
                    }`}
                  >
                    {icons[type]}
                    {labels[type]}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-[3px] h-[12px] rounded-full bg-[#d4af37] shrink-0 block" />
              <p className="text-[12px] font-bold text-[#0a1128]">Select Date</p>
            </div>
            <div className="relative">
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => scrollDates('left')}
                  aria-label="Scroll dates left"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-[4px] flex items-center justify-center focus-visible:outline-none bg-white border border-[#0a1128]/[0.12] shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:scale-110 active:scale-90 transition-transform duration-200"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><path d="M10 12L6 8l4-4"/></svg>
                </button>
              )}

              <div
                ref={dateStripRef}
                className={`flex gap-1 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
                  canScrollLeft ? 'pl-6' : 'pl-0'
                } ${
                  canScrollRight ? 'pr-6' : 'pr-0'
                }`}
              >
                {days.map((day, i) => {
                  const active = isSameDay(day, selectedDate);
                  const isToday = i === 0;
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-[4px] shrink-0 border hover:-translate-y-[1px] hover:shadow-sm active:scale-95 active:translate-y-0 transition-all duration-200 focus-visible:outline-none min-w-[42px] ${
                        active 
                          ? 'bg-[#0a1128] border-[#0a1128]' 
                          : 'bg-[#f5f6fa] border-[#0a1128]/[0.08] hover:border-[#0a1128]/20'
                      }`}
                    >
                      <span className={`text-[8.5px] font-semibold tracking-wide ${active ? 'text-white/90' : 'text-[#637089]'}`}>
                        {isToday ? 'Today' : DAY_LABELS[day.getDay()]}
                      </span>
                      <span className={`text-[14px] font-bold leading-none ${active ? 'text-white' : 'text-[#0a1128]'}`}>
                        {day.getDate()}
                      </span>
                      <span className={`text-[8.5px] font-medium ${active ? 'text-white/80' : 'text-[#637089]'}`}>
                        {MONTH_LABELS[day.getMonth()]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {canScrollRight && (
                <button
                  type="button"
                  onClick={() => scrollDates('right')}
                  aria-label="Scroll dates right"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-[4px] flex items-center justify-center focus-visible:outline-none bg-white border border-[#0a1128]/[0.12] shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:scale-110 active:scale-90 transition-transform duration-200"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="#0a1128" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><path d="M6 4l4 4-4 4"/></svg>
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-[3px] h-[12px] rounded-full bg-[#d4af37] shrink-0 block" />
              <p className="text-[12px] font-bold text-[#0a1128]">Available Times</p>
            </div>
            {slots.every(s => !s.available) ? (
              <p className="text-[11.5px] text-[#637089] py-2.5 text-center bg-[#f5f6fa] rounded-[4px]">No slots available on this day</p>
            ) : (
              <div className="grid grid-cols-4 gap-1">
                {slots.map(({ time, available }) => {
                  const active = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={!available}
                      onClick={() => setSelectedTime(time)}
                      className={`py-1 rounded-[4px] text-[10.5px] font-semibold border transition-all duration-200 focus-visible:outline-none disabled:opacity-35 disabled:cursor-not-allowed ${
                        active 
                          ? 'bg-[#d4af37] text-[#0a1128] border-[#d4af37] shadow-sm scale-105' 
                          : available 
                            ? 'bg-[#f5f6fa] text-[#0a1128] border-[#0a1128]/[0.09] hover:bg-[#0a1128]/5 hover:border-[#0a1128]/20 hover:-translate-y-[1px] hover:shadow-sm active:scale-95' 
                            : 'bg-[#f5f6fa] text-[#9ca3af] border-[#0a1128]/5'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-[3px] h-[12px] rounded-full bg-[#d4af37] shrink-0 block" />
              <p className="text-[12px] font-bold text-[#0a1128]">
                Note <span className="font-normal text-[#637089]">(optional)</span>
              </p>
            </div>
            <textarea
              rows={2}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="E.g. Looking for 5,000 sq ft office in Gachibowli…"
              className="w-full resize-none rounded-[4px] border px-2.5 py-1.5 text-[11.5px] text-[#0a1128] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#0a1128]/20 focus:-translate-y-[1px] focus:shadow-sm transition-all duration-200 bg-[#f5f6fa] border-[#0a1128]/10 font-['Outfit',sans-serif]"
            />
          </div>
        </div>

        <div className="px-3.5 pb-3.5 pt-2.5 border-t border-black/[0.06] font-['Outfit',sans-serif]">
          {selectedTime && (
            <p className="text-[10.5px] font-medium text-[#637089] mb-1.5 text-center animate-in fade-in slide-in-from-bottom-1 duration-300">
              {MONTH_LABELS[selectedDate.getMonth()]} {selectedDate.getDate()} · {selectedTime} · {meetingType === 'video' ? 'Video Call' : meetingType === 'phone' ? 'Phone Call' : 'In Person'}
            </p>
          )}
          <button
            type="button"
            disabled={!canSchedule}
            onClick={handleSchedule}
            className={`w-full flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-[4px] text-sm font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50 disabled:opacity-40 disabled:cursor-not-allowed font-['Outfit',sans-serif] ${
              canSchedule 
                ? 'bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0' 
                : 'bg-[#e5e7eb] text-[#6b7280] shadow-none'
            }`}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <rect x="2" y="2" width="12" height="12" rx="1" />
              <path d="M5 2V0M11 2V0M2 6h12" />
            </svg>
            {canSchedule ? 'Confirm Consultation' : 'Select a Time Slot'}
          </button>
        </div>
      </Sheet>
    </Backdrop>
  );
}

function Backdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center bg-[#0a1128]/45 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );
}

function Sheet({ children, isDesktop, onClose }: { children: React.ReactNode; isDesktop: boolean; onClose: () => void }) {
  void onClose;
  return (
    <div
      className={`w-full flex flex-col bg-white overflow-hidden shadow-[0_24px_80px_rgba(10,17,40,0.28)] transition-transform duration-500 ease-out animate-in slide-in-from-bottom-8 ${
        isDesktop
          ? 'max-w-[440px] rounded-[4px] max-h-[88vh]'
          : 'mt-auto rounded-t-[4px] max-h-[90vh]' 
      }`}
      onClick={e => e.stopPropagation()}
    >
      {!isDesktop && (
        <div className="flex justify-center pt-2.5 pb-1 shrink-0">
          <div className="w-9 h-1 rounded-[4px] bg-[#d1d5db]" />
        </div>
      )}
      {children}
    </div>
  );
}