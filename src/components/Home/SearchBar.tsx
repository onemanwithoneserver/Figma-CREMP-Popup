// JSX automatic runtime - no default React import required

const SearchIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const FilterIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

interface SearchBarProps {
  query: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({ query, onChange, placeholder = "Search franchise brands or areas in Hyderabad" }: SearchBarProps) {
  return (
    <form 
      className="w-full flex items-center px-1 pb-1 pt-1" 
      style={{ fontFamily: "'Outfit', sans-serif" }}
      onSubmit={(e) => e.preventDefault()}
      role="search"
    >
      <div
        className="flex-1 flex items-center gap-2.5 bg-white border border-[#E5E7EB] rounded-[16px] h-[48px] px-4 transition-all focus-within:border-[#0B1320] focus-within:ring-1 focus-within:ring-[#0B1320]"
        style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
      >
        <SearchIcon color="#6B7280" />
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="flex-1 bg-transparent text-[#111827] text-[13px] placeholder-[#9CA3AF] outline-none font-medium leading-tight min-w-0"
        />
      </div>

      <button
        type="button"
        className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center shrink-0 bg-[#0B1320] active:scale-95 transition-transform focus-visible:outline-none border border-[#1F2937]"
        style={{ boxShadow: '0 4px 12px rgba(11, 19, 32, 0.15)' }}
        aria-label="Open filter options"
        aria-haspopup="dialog"
      >
        <FilterIcon color="#FBBF24" />
      </button>
    </form>
  );
}