import { motion } from 'framer-motion';
import { LayoutGrid, Store, PieChart, Building2, Tag, GraduationCap } from 'lucide-react';
import type { VideoCategory } from '../../shared/theme/videoflow.types';

interface CategoryChipsProps {
  categories: VideoCategory[];
  active: VideoCategory;
  onChange: (cat: VideoCategory) => void;
}

const CHIP_CONFIG: Record<string, { icon: React.ElementType; colorClass: string }> = {
  'All': { icon: LayoutGrid, colorClass: 'text-[#d4af37]' },
  'Franchise': { icon: Store, colorClass: 'text-emerald-600' },
  'Fractional': { icon: PieChart, colorClass: 'text-[#d4af37]' },
  'Commercial': { icon: Building2, colorClass: 'text-blue-600' },
  'Pre-Leased': { icon: Tag, colorClass: 'text-teal-600' },
  'Education': { icon: GraduationCap, colorClass: 'text-amber-600' },
};

const FALLBACK_CONFIG = { icon: LayoutGrid, colorClass: 'text-slate-500' };

export default function CategoryChips({ categories, active, onChange }: CategoryChipsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto touch-pan-x px-3 pb-3 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((cat) => {
        const isActive = active === cat;
        const config = CHIP_CONFIG[cat] || FALLBACK_CONFIG;
        const Icon = config.icon;

        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[4px] px-3.5 py-[7px] text-[12px] transition-all duration-300 ${isActive
              ? 'vf-pill-luxury-active font-semibold'
              : 'vf-pill-luxury-inactive font-medium'
              }`}
            style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.01em' }}
          >
            <Icon
              size={12}
              strokeWidth={isActive ? 2.5 : 2}
              className={isActive ? 'text-white' : config.colorClass}
            />
            {cat}
          </motion.button>
        );
      })}
    </div>
  );
}