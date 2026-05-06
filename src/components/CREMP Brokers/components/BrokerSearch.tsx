import { useRef } from 'react';

interface BrokerSearchProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export default function BrokerSearch({
  value,
  onChange,
  placeholder = 'Search by name, expertise or location…',
  className = '',
}: BrokerSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`w-3/4 relative flex items-center bg-white border border-black/[0.08] rounded-xl shadow-sm hover:border-[#d4af37]/50 focus-within:border-[#d4af37] focus-within:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] transition-all ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Search Icon */}
      <div className="pl-3.5 shrink-0 text-[#a0aabf]">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="9" cy="9" r="6" />
          <path d="M15 15l3 3" />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[13px] text-[#0a1128] placeholder-[#a0aabf] font-medium px-3 py-2.5 outline-none min-w-0"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="mr-3 shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-black/[0.06] text-[#637089] hover:bg-black/[0.1] transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-2.5 h-2.5">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      )}
    </div>
  );
}
