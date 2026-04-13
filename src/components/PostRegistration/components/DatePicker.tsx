import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import type { InputHTMLAttributes } from 'react';

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const BASE =
  "w-full border rounded-[7px] pl-9 pr-3 py-2 text-[#0a1128] text-sm outline-none transition-all duration-300 font-light font-['Outfit'] cursor-pointer";
const NORMAL =
  'border-black/5 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 bg-[#fafafb] focus:bg-white';
const ERR = 'border-[#e05252] bg-[#fff5f5]';

export default function DatePicker({ error, className = '', ...props }: DatePickerProps) {
  return (
    <>
      <div className="relative">
        <CalendarTodayOutlinedIcon
          sx={{ fontSize: 14, color: '#a0aabf' }}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
        <input
          type="date"
          className={`${BASE} ${error ? ERR : NORMAL} ${className}`.trimEnd()}
          {...props}
        />
      </div>
      {error && <p className="text-[#e05252] text-[11px] mt-1 font-light">{error}</p>}
    </>
  );
}
