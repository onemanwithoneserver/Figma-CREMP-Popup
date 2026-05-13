import HomeSearch from '../../Home/SearchBar';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  isDesktop: boolean;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full">
      {/* Reuse main Home SearchBar for consistent look */}
      <HomeSearch query={value} onChange={onChange} placeholder="Search area, locality…" />
    </div>
  );
}
