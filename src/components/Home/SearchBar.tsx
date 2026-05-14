const SearchIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const FilterIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
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
    <div className="w-full px-1.5 pb-1 " style={{ fontFamily: "'Outfit', sans-serif" }}>
      <form 
        className="flex items-center w-full bg-white border border-[#E2E8F0] rounded-[12px] h-[40px] pl-3 pr-1.5 transition-all focus-within:border-[#94A3B8] focus-within:shadow-sm"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
        onSubmit={(e) => e.preventDefault()}
        role="search"
      >
        <div className="shrink-0 flex items-center justify-center">
          <SearchIcon color="#64748B" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="flex-1 bg-transparent text-[#0F172A] text-[11px] placeholder-[#94A3B8] outline-none font-medium leading-tight px-2.5 min-w-0 h-full"
        />

        <button
          type="button"
          className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center shrink-0 bg-[#0B1320] active:scale-95 transition-transform focus-visible:outline-none"
          aria-label="Open filter options"
          aria-haspopup="dialog"
        >
          <FilterIcon color="#FBBF24" />
        </button>
      </form>
    </div>
  );
}