import type { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const BASE =
  "w-full border rounded-[7px] px-3 py-2 text-[#0a1128] text-sm outline-none transition-all duration-300 placeholder:text-[#a0aabf] font-light font-['Outfit']";

const NORMAL =
  'border-black/5 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 bg-[#fafafb] focus:bg-white';

const ERR = 'border-[#e05252] bg-[#fff5f5]';

export default function FormInput({ error, className = '', ...props }: FormInputProps) {
  return (
    <div className="flex flex-col w-full">
      <input
        className={`${BASE} ${error ? ERR : NORMAL} ${className}`.trim()}
        {...props}
      />
      {error && <p className="text-[#e05252] text-[11px] mt-1 font-light">{error}</p>}
    </div>
  );
}