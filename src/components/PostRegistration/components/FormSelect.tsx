import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  /** Compact variant — smaller size for filter/sort bars */
  compact?: boolean;
}

const FORM_BASE =
  "w-full appearance-none cursor-pointer border rounded-[7px] px-3 py-2 pr-10 text-[#0a1128] text-sm outline-none transition-all duration-300 font-light font-['Outfit']";

const COMPACT_BASE =
  "appearance-none cursor-pointer border rounded-[7px] px-3 py-1.5 pr-8 text-[#637089] text-[13px] font-medium outline-none transition-all duration-300 font-['Outfit'] hover:shadow-[0_2px_8px_rgba(212,175,55,0.08)]";

const NORMAL =
  'border-black/5 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 bg-[#fafafb] focus:bg-white hover:border-[#d4af37]/40';

const ERR = 'border-[#e05252] bg-[#fff5f5]';

export default function FormSelect({
  options,
  placeholder,
  error,
  compact = false,
  className = '',
  ...props
}: FormSelectProps) {
  const base = compact ? COMPACT_BASE : FORM_BASE;
  
  return (
    <div className={`flex flex-col ${compact ? '' : 'w-full'}`}>
      <div className="relative flex items-center">
        <select
          className={`${base} ${error ? ERR : NORMAL} ${className}`.trim()}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden className="text-[#a0aabf]">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-[#0a1128]">
              {opt.label}
            </option>
          ))}
        </select>
        <KeyboardArrowDownIcon
          sx={{ fontSize: compact ? 16 : 18, color: compact ? '#a0aabf' : '#d4af37' }}
          className={`absolute ${compact ? 'right-2' : 'right-3'} pointer-events-none z-10 transition-colors duration-300`}
        />
      </div>
      {error && <p className="text-[#e05252] text-[11px] mt-1 font-light">{error}</p>}
    </div>
  );
}