const SearchIcon = ({ color }: { color: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    aria-hidden="true"
    className="transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const FilterIcon = ({ color }: { color: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
    />
  </svg>
);

interface SearchBarProps {
  query: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  query,
  onChange,
  placeholder = "Search franchise brands or areas",
}: SearchBarProps) {
  return (
    <div
      className="w-full pb-0.5"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <form
        className="flex items-center w-full h-[40px] pl-3 pr-1 bg-white rounded transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-[#FBBF24]/50 shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] group"
        onSubmit={(e) => e.preventDefault()}
        role="search"
      >
        <div className="flex items-center justify-center shrink-0">
          <SearchIcon color="#64748B" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="flex-1 h-full min-w-0 px-2.5 text-[11px] font-medium leading-tight text-[#0F172A] bg-transparent outline-none placeholder:text-[#94A3B8] transition-colors duration-300"
        />

        <button
          type="button"
          className="flex items-center justify-center shrink-0 w-[32px] h-[32px] rounded transition-all duration-300 ease-out hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24]/50 bg-[#0a1128] hover:bg-[#121c33] shadow-[0_2px_8px_rgba(10,17,40,0.2)]"
          aria-label="Open filter options"
          aria-haspopup="dialog"
        >
          <FilterIcon color="#FBBF24" />
        </button>
      </form>
    </div>
  );
}