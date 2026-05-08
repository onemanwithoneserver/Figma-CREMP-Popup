import type { Broker } from '../../types/broker.types';

// ─── Stats Bar ────────────────────────────────────────────────────────────────
export function StatsBar({ broker, isDesktop }: { broker: Broker; isDesktop: boolean }) {
  const stats = [
    { value: broker.sqFtTransacted,               label: 'Sq Ft Transacted' },
    { value: `${broker.dealsClosed}+`,            label: 'Deals Closed' },
    { value: broker.dealValue ?? '—',             label: 'Deal Value' },
    { value: `${broker.enterpriseClients ?? 0}+`, label: 'Enterprise Clients' },
  ];
  return (
    <div className="shrink-0" style={{ background: 'linear-gradient(90deg,#0f1e3d 0%,#162040 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className={`flex ${isDesktop ? 'divide-x divide-white/[0.07]' : 'overflow-x-auto'}`} style={{ scrollbarWidth: 'none' }}>
        {stats.map((s, i) => (
          <div key={i} className={`flex flex-col items-center justify-center text-center ${isDesktop ? 'flex-1 py-4' : 'shrink-0 px-4 py-3 border-r border-white/[0.06] last:border-0'}`} style={{ minWidth: isDesktop ? 0 : 80 }}>
            <span className="text-white font-bold leading-tight" style={{ fontSize: isDesktop ? '1.1rem' : '0.95rem', fontFamily: 'Outfit, sans-serif' }}>{s.value}</span>
            <span className="text-white/40 font-medium leading-tight mt-0.5" style={{ fontSize: isDesktop ? '10px' : '9px', fontFamily: 'Outfit, sans-serif' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
