import type { Broker } from '../../types/broker.types';
import { TRANSACTION_SVG } from './icons';
import { SectionHeader } from './SectionHeader';

// ─── Recent Transactions ──────────────────────────────────────────────────────
export function RecentTransactionsSection({ broker, isDesktop }: { broker: Broker; isDesktop: boolean }) {
  const transactions = broker.recentTransactions ?? [];
  if (transactions.length === 0) return null;

  return (
    <div className={`${isDesktop ? 'px-5 pt-4 pb-4' : 'px-3 pt-3.5 pb-3.5'}`}>
      <SectionHeader title="Recent Transactions" action="View All" />
      <div className={`grid gap-2 ${isDesktop ? 'grid-cols-5' : 'grid-cols-1'}`}>
        {transactions.map((tx, i) => (
          <div key={i} className="bg-white rounded-xl p-3 flex items-center gap-3 hover:shadow-md transition-shadow" style={{ border: '1px solid rgba(10,17,40,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(26,52,99,0.08)' }}>
              <span className="text-[#1a3463]">{TRANSACTION_SVG[tx.icon] ?? TRANSACTION_SVG.office}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11.5px] font-bold text-[#0a1128] leading-tight truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>{tx.type}</p>
              <p className="text-[10px] text-[#637089] font-medium leading-tight mt-0.5 truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>{tx.location}</p>
              <p className="text-[10px] font-bold leading-tight mt-0.5" style={{ color: tx.value ? '#d4af37' : '#637089', fontFamily: 'Outfit, sans-serif' }}>{tx.value ?? tx.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
