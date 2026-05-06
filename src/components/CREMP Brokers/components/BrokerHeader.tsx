import { actionCards } from '../data/marketplaceData';


interface BrokerHeaderProps {
  isDesktop: boolean;
}

export default function BrokerHeader({ isDesktop }: BrokerHeaderProps) {
  return (
    <div className="w-full bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] relative overflow-hidden shrink-0 border-b border-white/[0.05]">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#d4af37]/10 blur-[80px] -translate-y-1/3 translate-x-1/4 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] translate-y-1/3 -translate-x-1/4 rounded-full pointer-events-none" />
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className={`relative z-10 ${isDesktop ? 'px-8 py-6' : 'px-4 py-5'}`}>
        {/* Title row */}
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <h1
              className={`font-extralight text-white tracking-wide m-0 leading-tight ${
                isDesktop ? 'text-[1.6rem]' : 'text-[1.25rem]'
              }`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Find{' '}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728]">
                CREMP Brokers
              </span>
            </h1>
          </div>

          {/* Broker count chip (desktop only) */}
          {isDesktop && (
            <div className="">
            </div>
          )}
        </div>

        {/* Action cards */}
        <div className={`grid gap-3 mt-4 ${isDesktop ? 'grid-cols-2 max-w-2xl' : 'grid-cols-2'}`}>
          {actionCards.map((card) => (
            <button
              key={card.id}
              className={`bg-gradient-to-br ${card.gradient} rounded-xl border border-white/10 text-left transition-all
                hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 active:translate-y-0
                ${isDesktop ? 'px-5 py-4' : 'px-3.5 py-3'}`}
            >
              <div className="flex items-start gap-2">
                <span className={isDesktop ? 'text-xl' : 'text-base'}>{card.icon}</span>
                <div className="min-w-0">
                  <p
                    className={`text-white font-semibold leading-tight ${
                      isDesktop ? 'text-[13px]' : 'text-[12px]'
                    }`}
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {card.title}
                  </p>
                  <p
                    className={`text-white/55 font-light leading-snug mt-0.5 ${
                      isDesktop ? 'text-[11px]' : 'text-[10px]'
                    }`}
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {card.subtitle}
                  </p>
                  <p
                    className={`text-[#d4af37] font-semibold mt-1.5 ${
                      isDesktop ? 'text-[11px]' : 'text-[10px]'
                    }`}
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {card.cta}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>


      </div>
    </div>
  );
}
