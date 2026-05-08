import type { Broker } from '../../types/broker.types';

interface StatsBarProps {
  broker: Broker;
  isDesktop: boolean;
}

export function StatsBar({ broker, isDesktop }: StatsBarProps) {
  const stats = [
    { value: broker.sqFtTransacted,               label: 'Sq Ft Transacted' },
    { value: `${broker.dealsClosed}+`,            label: 'Deals Closed' },
    { value: broker.dealValue ?? '—',             label: 'Deal Value' },
    { value: `${broker.enterpriseClients ?? 0}+`, label: 'Enterprise Clients' },
  ];

  return (
    <div className="shrink-0 bg-gradient-to-r from-[#0f1e3d] to-[#162040] border-b border-white/[0.06]">
      <div 
        className={`flex ${
          isDesktop 
            ? 'divide-x divide-white/[0.07]' 
            : 'overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        }`}
      >
        {stats.map((s, i) => (
          <div 
            key={i} 
            className={`flex flex-col items-center justify-center text-center ${
              isDesktop 
                ? 'flex-1 py-4 min-w-0' 
                : 'shrink-0 px-4 py-3 border-r border-white/[0.06] last:border-0 min-w-[80px]'
            }`}
          >
            <span 
              className={`text-white font-bold leading-tight font-['Outfit',sans-serif] ${
                isDesktop ? 'text-[1.1rem]' : 'text-[0.95rem]'
              }`}
            >
              {s.value}
            </span>
            <span 
              className={`font-medium leading-tight mt-0.5 font-['Outfit',sans-serif] text-white/70 ${
                isDesktop ? 'text-[10px]' : 'text-[9px]'
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}