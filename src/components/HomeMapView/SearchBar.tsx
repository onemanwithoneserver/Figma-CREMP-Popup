// ── inline filter/search icons ────────────────────────────────────────────────
const SearchIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const FilterIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

interface Props {
  query: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ query, onChange }: Props) {
  return (
    <form
      className="flex items-center gap-2 px-3 py-2 shrink-0 w-full"
      style={{ backgroundColor: '#0B1320', fontFamily: "'Outfit', sans-serif" }}
      onSubmit={(e) => e.preventDefault()}
      role="search"
    >
      {/* search input */}
      <div
        className="flex-1 flex items-center gap-2.5 bg-white/[0.05] border border-white/10 rounded-[14px] h-[44px] px-3.5
                   transition-all focus-within:border-[#FBBF24]/60 focus-within:bg-white/[0.07]"
      >
        <SearchIcon color="#64748B" />
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search shops, offices, warehouses..."
          aria-label="Search commercial properties"
          className="flex-1 bg-transparent text-white text-[12.5px] placeholder-[#475569]
                     outline-none font-medium leading-tight min-w-0"
        />
      </div>

      {/* filter button */}
      <button
        type="button"
        className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center shrink-0
                   bg-[#FBBF24] active:scale-95 transition-transform focus-visible:outline-none
                   shadow-[0_4px_12px_rgba(251,191,36,0.35)]"
        aria-label="Open filter options"
        aria-haspopup="dialog"
      >
        <FilterIcon color="#0B1320" />
      </button>
    </form>
  );
}
