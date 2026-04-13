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
  "w-full appearance-none cursor-pointer border rounded-[7px] px-3 py-2 pr-8 text-[#0a1128] text-sm outline-none transition-all duration-300 font-light font-['Outfit']";
const COMPACT_BASE =
  "appearance-none cursor-pointer border rounded-[7px] px-3 py-1.5 pr-7 text-[#637089] text-xs font-light outline-none transition-all duration-200 font-['Outfit']";
const NORMAL =
  'border-black/5 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 bg-[#fafafb] focus:bg-white';
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
    <>
      <div className="relative">
        <select
          className={`${base} ${error ? ERR : NORMAL} ${className}`.trimEnd()}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <KeyboardArrowDownIcon
          sx={{ fontSize: compact ? 14 : 16, color: '#a0aabf' }}
          className={`absolute ${compact ? 'right-2' : 'right-2.5'} top-1/2 -translate-y-1/2 pointer-events-none`}
        />
      </div>
      {error && <p className="text-[#e05252] text-[11px] mt-1 font-light">{error}</p>}
    </>
  );
}
