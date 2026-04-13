import { useState } from 'react';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormSelect from './FormSelect';

interface FiltersProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (cat: string) => void;
  sortOptions?: { value: string; label: string }[];
  selectedSort?: string;
  onSortChange?: (sort: string) => void;
  isDesktop: boolean;
}

export default function Filters({
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortOptions,
  selectedSort,
  onSortChange,
  isDesktop,
}: FiltersProps) {
  const [expanded, setExpanded] = useState(isDesktop);
  const hasExtras = !!(categories || sortOptions);

  return (
    <div className="bg-white border border-black/[0.03] rounded-[7px] shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex-1 relative">
          <SearchOutlinedIcon
            sx={{ fontSize: 16, color: '#a0aabf' }}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border border-black/5 rounded-[7px] pl-9 pr-3 py-2 text-[#0a1128] text-sm outline-none transition-all duration-300 placeholder:text-[#a0aabf] font-light font-['Outfit'] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 bg-[#fafafb] focus:bg-white"
          />
        </div>
        {!isDesktop && hasExtras && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-2 rounded-[7px] border border-black/5 text-[#637089] text-xs font-medium hover:border-[#d4af37]/40 hover:text-[#0a1128] transition-all duration-200 bg-[#fafafb] shrink-0"
          >
            <FilterListOutlinedIcon sx={{ fontSize: 15 }} />
            Filters
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 14,
                transition: 'transform 0.2s',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
        )}
      </div>

      {hasExtras && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded || isDesktop ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2 px-4 pb-3">
            {categories && onCategoryChange && (
              <>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`px-3 py-1 rounded-[4px] text-xs font-medium border transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white border-[#0a1128]'
                        : 'bg-white text-[#637089] border-black/5 hover:border-[#d4af37]/40 hover:text-[#0a1128]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </>
            )}
            {sortOptions && onSortChange && (
              <div className="ml-auto">
                <FormSelect
                  compact
                  value={selectedSort}
                  onChange={(e) => onSortChange(e.target.value)}
                  options={sortOptions}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
