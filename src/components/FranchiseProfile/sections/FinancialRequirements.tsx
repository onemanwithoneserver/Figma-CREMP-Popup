import React from 'react';
import { data } from '../data';

interface FinancialRequirementsProps {
  isDesktop: boolean;
}

const FinancialRequirements: React.FC<FinancialRequirementsProps> = ({ isDesktop }) => {
  return (
    <div className={isDesktop ? 'py-[0.5rem]' : 'px-[1rem] py-[0.75rem]'}>
      <h3
        className={`font-semibold text-[#064e3b] m-0 mb-[1rem] ${
          isDesktop ? 'text-[1.25rem]' : 'text-[1rem]'
        }`}
      >
        Cost Breakdown
      </h3>

      {/* Main Ledger Container */}
      <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[0.25rem] overflow-hidden shadow-sm">
        
        {/* Breakdown Items */}
        <div className={`grid ${isDesktop ? 'grid-cols-2 gap-x-[0.5rem] p-[1rem]' : 'grid-cols-1 p-[0.5rem]'}`}>
          {data.investmentDetails.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-[0.25rem] border-b border-[#bbf7d0]/60 md:last:border-b-0"
            >
              <div className="flex items-center gap-[0.25rem]">
                <span className="w-[0.25rem] h-[0.25rem] rounded-full bg-[#10b981] opacity-70" />
                <span className={`font-medium text-[#047857] ${isDesktop ? 'text-[0.9rem]' : 'text-[0.85rem]'}`}>
                  {item.item}
                </span>
              </div>
              <span className={`font-semibold text-[#064e3b] ${isDesktop ? 'text-[1.125rem]' : 'text-[1rem]'}`}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Total Row */}
        <div className={`flex items-center justify-between bg-gradient-to-r from-[#059669] to-[#10b981] ${isDesktop ? 'p-[1.5rem]' : 'px-[0.5rem] py-[0.5rem]'}`}>
          <span className={`font-medium text-emerald-50 ${isDesktop ? 'text-[1rem]' : 'text-[0.875rem]'}`}>
            Estimated Total
          </span>
          <span className={`font-bold text-white tracking-tight ${isDesktop ? 'text-[1.375rem]' : 'text-[1.125rem]'}`}>
            {data.totalInvestmentRange}
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default FinancialRequirements;