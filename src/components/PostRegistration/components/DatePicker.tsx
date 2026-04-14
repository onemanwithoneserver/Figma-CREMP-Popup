import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import type { InputHTMLAttributes } from 'react';

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const BASE =
  "w-full border rounded-[7px] pl-9 pr-3 py-2 text-[#0a1128] text-sm outline-none transition-all duration-300 font-light font-['Outfit'] cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer";

const NORMAL =
  'border-black/5 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 bg-[#fafafb] focus:bg-white';

const ERR = 'border-[#e05252] bg-[#fff5f5]';

export default function DatePicker({ error, className = '', ...props }: DatePickerProps) {
  return (
    <div className="flex flex-col">
      <div className="relative flex items-center">
        <CalendarTodayOutlinedIcon
          sx={{ fontSize: 16, color: '#d4af37' }}
          className="absolute left-3 pointer-events-none z-10"
        />
        <input
          type="date"
          className={`${BASE} ${error ? ERR : NORMAL} ${className}`.trim()}
          {...props}
        />
      </div>
      {error && <p className="text-[#e05252] text-[11px] mt-1 font-light">{error}</p>}
    </div>
  );
}