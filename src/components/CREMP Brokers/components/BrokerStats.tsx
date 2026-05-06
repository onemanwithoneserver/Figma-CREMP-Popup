interface StatItem {
  label: string;
  value: string;
}

interface BrokerStatsProps {
  sqFt: string;
  deals: number;
  experience: number;
  layout?: 'row' | 'grid';
  className?: string;
}

function Stat({ label, value }: StatItem) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[13px] font-bold text-[#0a1128] leading-tight">{value}</span>
      <span className="text-[10px] text-[#637089] font-medium leading-tight whitespace-nowrap">{label}</span>
    </div>
  );
}

export default function BrokerStats({
  sqFt,
  deals,
  experience,
  layout = 'row',
  className = '',
}: BrokerStatsProps) {
  const stats: StatItem[] = [
    { label: 'Sq Ft Transacted', value: sqFt },
    { label: 'Deals Closed', value: `${deals}+` },
    { label: 'Experience', value: `${experience}+ Yrs` },
  ];

  if (layout === 'grid') {
    return (
      <div className={`grid grid-cols-3 gap-2 ${className}`}>
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center bg-[#fafafb] rounded-lg py-2 px-1 border border-black/[0.05]"
          >
            <Stat {...s} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3">
          <Stat {...s} />
          {i < stats.length - 1 && (
            <span className="w-px h-6 bg-black/[0.07] block" />
          )}
        </div>
      ))}
    </div>
  );
}
