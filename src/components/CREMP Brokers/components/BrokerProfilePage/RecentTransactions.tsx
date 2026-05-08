import type { Broker } from '../../types/broker.types';
import { TRANSACTION_SVG } from './icons';
import { SectionHeader } from './SectionHeader';

interface RecentTransactionsSectionProps {
  broker: Broker;
  isDesktop: boolean;
}

export function RecentTransactionsSection({ broker, isDesktop }: RecentTransactionsSectionProps) {
  const transactions = broker.recentTransactions ?? [];
  
  if (transactions.length === 0) return null;

  return (
    <div className={isDesktop ? 'px-5 py-4' : 'px-3 py-3.5'}>
      <SectionHeader title="Recent Transactions" action="View All" />
      <div className={`grid gap-2 ${isDesktop ? 'grid-cols-5' : 'grid-cols-1'}`}>
        {transactions.map((tx, i) => (
          <div 
            key={i} 
            className="bg-white rounded-xl p-3 flex items-center gap-3 hover:shadow-md transition-shadow border border-[#0a1128]/5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#1a3463]/[0.08]">
              <span className="text-[#1a3463]">
                {TRANSACTION_SVG[tx.icon] ?? TRANSACTION_SVG.office}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11.5px] font-bold text-[#0a1128] leading-tight truncate font-['Outfit',sans-serif]">
                {tx.type}
              </p>
              <p className="text-[10px] text-[#637089] font-medium leading-tight mt-0.5 truncate font-['Outfit',sans-serif]">
                {tx.location}
              </p>
              <p className={`text-[10px] font-bold leading-tight mt-0.5 font-['Outfit',sans-serif] ${tx.value ? 'text-[#8a6b22]' : 'text-[#637089]'}`}>
                {tx.value ?? tx.size}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}