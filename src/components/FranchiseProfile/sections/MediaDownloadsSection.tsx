

export default function MediaDownloadsSection({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div className={`w-full flex flex-col items-center overflow-hidden ${isDesktop ? 'pb-8 pt-6 bg-[#f8f9fa] min-h-screen' : 'h-screen bg-white'}`}>
      <div className={`transition-all duration-500 mx-auto overflow-hidden shadow-2xl bg-white ${isDesktop
        ? 'max-w-[1280px] w-[95%] rounded-2xl border border-[#1c2a44]/10' 
        : 'w-[390px] shrink-0 pt-4'
        }`}
        style={{ height: isDesktop ? 'calc(100vh - 80px)' : '780px' }}> 
      </div>
    </div>
  );
} 