import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

interface CompareItem {
  id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  franchiseFee: string;
  investmentRange: string;
  royalty: string;
  liquidCapital: string;
  locations: string;
  yearEstablished: string;
  type: string;
}

const AVAILABLE_ITEMS: CompareItem[] = [
  {
    id: '1', title: "McDonald's", category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80',
    location: 'Pan India', franchiseFee: '₹30L', investmentRange: '₹1.5Cr – ₹2Cr',
    royalty: '5%', liquidCapital: '₹50L', locations: '400+', yearEstablished: '1990', type: 'New Franchise',
  },
  {
    id: '2', title: "Domino's Pizza", category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80',
    location: 'Pan India', franchiseFee: '₹10L', investmentRange: '₹30L – ₹50L',
    royalty: '5.5%', liquidCapital: '₹15L', locations: '1500+', yearEstablished: '1995', type: 'New Franchise',
  },
  {
    id: '3', title: 'NIIT Education', category: 'Education',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=80',
    location: 'Metro Cities', franchiseFee: '₹5L', investmentRange: '₹15L – ₹25L',
    royalty: '10%', liquidCapital: '₹8L', locations: '200+', yearEstablished: '1981', type: 'New Franchise',
  },
  {
    id: '4', title: 'Apollo Pharmacy', category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=300&q=80',
    location: 'Pan India', franchiseFee: '₹3L', investmentRange: '₹20L – ₹35L',
    royalty: '0%', liquidCapital: '₹10L', locations: '5000+', yearEstablished: '1996', type: 'Retail Franchise',
  },
  {
    id: '5', title: 'Anytime Fitness', category: 'Fitness & Wellness',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80',
    location: 'Tier 1 & 2', franchiseFee: '₹20L', investmentRange: '₹50L – ₹80L',
    royalty: '7%', liquidCapital: '₹25L', locations: '80+', yearEstablished: '2010', type: 'New Franchise',
  },
];

const COMPARE_ROWS: { label: string; key: keyof CompareItem }[] = [
  { label: 'Category',         key: 'category' },
  { label: 'Location',         key: 'location' },
  { label: 'Type',             key: 'type' },
  { label: 'Year Established', key: 'yearEstablished' },
  { label: 'Franchise Fee',    key: 'franchiseFee' },
  { label: 'Investment Range', key: 'investmentRange' },
  { label: 'Liquid Capital',   key: 'liquidCapital' },
  { label: 'Royalty',         key: 'royalty' },
  { label: 'No. of Locations', key: 'locations' },
];

const MAX_COMPARE = 4;
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80';

interface CompareProps {
  isDesktop: boolean;
}

export default function Compare({ isDesktop }: CompareProps) {
  const [selected, setSelected] = useState<CompareItem[]>([AVAILABLE_ITEMS[0], AVAILABLE_ITEMS[1]]);
  const [pickerOpen, setPickerOpen] = useState(false);

  const addItem = (item: CompareItem) => {
    if (selected.length < MAX_COMPARE && !selected.find((s) => s.id === item.id)) {
      setSelected((prev) => [...prev, item]);
    }
    setPickerOpen(false);
  };

  const removeItem = (id: string) => {
    setSelected((prev) => prev.filter((s) => s.id !== id));
  };

  const available = AVAILABLE_ITEMS.filter((a) => !selected.find((s) => s.id === a.id));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm font-light text-[#637089]">
          Comparing <span className="font-semibold text-[#0a1128]">{selected.length}</span> of{' '}
          <span className="font-semibold text-[#0a1128]">{MAX_COMPARE}</span> franchises
        </p>
        {selected.length < MAX_COMPARE && (
          <button
            onClick={() => setPickerOpen((p) => !p)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[7px] bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white text-xs font-light tracking-wider hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(10,17,40,0.15)]"
          >
            <AddCircleOutlineIcon sx={{ fontSize: 15 }} />
            Add Franchise
          </button>
        )}
      </div>

      {/* Franchise picker */}
      {pickerOpen && (
        <div className="bg-white rounded-[7px] border border-[#d4af37]/30 shadow-[0_8px_24px_rgba(212,175,55,0.1)] p-4">
          <p className="text-xs font-semibold text-[#637089] tracking-wide mb-3">
            Select a franchise to compare
          </p>
          <div className="flex flex-wrap gap-2">
            {available.length === 0 ? (
              <p className="text-sm font-light text-[#a0aabf]">No more franchises available.</p>
            ) : (
              available.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="flex items-center gap-2 px-3 py-2 rounded-[7px] border border-black/5 text-sm font-light text-[#0a1128] hover:border-[#d4af37]/40 hover:bg-[#fafafb] transition-all duration-200 bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-6 h-6 rounded-[4px] object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                  />
                  {item.title}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {selected.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-sm font-light text-[#637089]">Add at least 2 franchises to compare.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[7px] border border-black/[0.03] shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: `${200 + selected.length * 180}px` }}>
              {/* Header row with franchise cards */}
              <thead>
                <tr>
                  <th className="w-36 px-4 py-4 border-b border-black/[0.04] text-left text-xs font-semibold text-[#637089] tracking-wide">
                    Attribute
                  </th>
                  {selected.map((item) => (
                    <th key={item.id} className="px-4 py-4 border-b border-black/[0.04] text-left" style={{ minWidth: 180 }}>
                      <div className="flex flex-col gap-2">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-24 object-cover rounded-[7px] bg-[#f0f0f5]"
                            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                          />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center hover:bg-white shadow-sm transition-colors"
                          >
                            <CloseIcon sx={{ fontSize: 12, color: '#637089' }} />
                          </button>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#0a1128] truncate">{item.title}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <LocationOnOutlinedIcon sx={{ fontSize: 11, color: '#a0aabf' }} />
                            <span className="text-[11px] text-[#a0aabf] font-light truncate">{item.location}</span>
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Data rows */}
              <tbody>
                {COMPARE_ROWS.map(({ label, key }, rowIdx) => (
                  <tr key={key} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#fafafb]'}>
                    <td className="px-4 py-3 text-xs font-semibold text-[#637089] tracking-wide border-r border-black/[0.03]">
                      {label}
                    </td>
                    {selected.map((item) => (
                      <td key={item.id} className="px-4 py-3 text-sm font-light text-[#0a1128]">
                        {String(item[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

              {/* Verdict row */}
              {isDesktop && selected.length >= 2 && (
                <tfoot>
                  <tr className="border-t border-black/[0.04]">
                    <td className="px-4 py-3 text-xs font-semibold text-[#637089] tracking-wide">
                      Best For
                    </td>
                    {selected.map((item, i) => (
                      <td key={item.id} className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-[4px] font-medium ${
                          i === 0
                            ? 'bg-gradient-to-br from-[#bf953f] via-[#d4af37] to-[#b38728] text-white'
                            : 'bg-[#fafafb] text-[#637089] border border-black/5'
                        }`}>
                          {i === 0 && <CheckIcon sx={{ fontSize: 11 }} />}
                          {i === 0 ? 'Top Pick' : 'Alternate'}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
