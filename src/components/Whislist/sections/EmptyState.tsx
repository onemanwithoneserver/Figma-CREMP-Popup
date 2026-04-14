import { FavoriteBorder } from '@mui/icons-material';

interface EmptyStateProps {
  isDesktop: boolean;
}

export default function EmptyState({ isDesktop }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className={`rounded-full bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center mb-6 ${
        isDesktop ? 'w-24 h-24' : 'w-20 h-20'
      }`}>
        <FavoriteBorder
          sx={{
            fontSize: isDesktop ? '3rem' : '2.5rem',
            color: '#cbd5e1'
          }}
        />
      </div>

      <h2 className={`font-bold text-[#1c2a44] mb-2 ${isDesktop ? 'text-2xl' : 'text-xl'}`}>
        Your wishlist is empty
      </h2>

      <p className={`text-[#64748b] text-center max-w-md mb-6 ${isDesktop ? 'text-base' : 'text-sm'}`}>
        Start exploring franchise opportunities and save your favorites here.
        You can organize them into custom folders for easy access.
      </p>

      <button className={`px-6 py-2.5 rounded-[4px] bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white font-medium text-sm shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide`}>
        Explore Opportunities
      </button>
    </div>
  );
}
