interface HandpickedHeaderProps {
  isDesktop: boolean;
}

export default function HandpickedHeader({ isDesktop }: HandpickedHeaderProps) {
  return (
    <div className="w-full bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] flex justify-center relative overflow-hidden shadow-inner">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a34e]/5 blur-3xl -translate-y-1/2 translate-x-1/3 rounded-[4px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#4e7ec9]/5 blur-3xl translate-y-1/2 -translate-x-1/4 rounded-[4px]" />
      
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className={`w-full max-w-[80rem] relative z-10 ${isDesktop ? 'px-10 py-12' : 'px-4 py-8'}`}>
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <h1 className={`font-light text-white m-0 leading-tight ${isDesktop ? 'text-[2.75rem]' : 'text-[2rem]'}`}>
              Handpicked <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e6c475] to-[#c9a34e]">Opportunities</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}