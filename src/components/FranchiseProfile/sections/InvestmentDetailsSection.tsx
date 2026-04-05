import { AccountBalanceWallet, TrendingUp } from '@mui/icons-material';
import { data } from '../data';
import { Card, SectionTitle, LabelValueRow } from '../SharedUI';

export default function InvestmentDetailsSection({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Top Highlights Grid */}
      <Card>
        <div className={`grid ${isDesktop ? 'grid-cols-4 gap-4' : 'grid-cols-2 gap-2'}`}>
          {[
            { label: 'Investment', value: data.highlights.investmentRange, gold: true },
            { label: 'Franchise Fee', value: data.highlights.franchiseFee, gold: true },
            { label: 'Locations', value: data.highlights.availableLocations, gold: false },
            { label: 'Outlets', value: data.highlights.totalOutlets, gold: false, trending: true },
          ].map((item, i) => (
            <div key={i} className={`flex flex-col gap-1.5 px-3 py-2.5 rounded border ${item.gold ? 'border-[#e3c980]/40 bg-gradient-to-br from-[#fdfaf3] to-[#f5f6f8]' : 'border-[#eef0f3] bg-[#f5f6f8]'}`}>
              <span className={`${isDesktop ? 'text-[0.875rem]' : 'text-[0.75rem]'} font-extrabold leading-none ${item.gold ? 'text-[#b8903c]' : 'text-[#6b7280]'}`}>
                {item.label}
              </span>
              <span className={`text-[#0f1f3d] font-extrabold ${isDesktop ? 'text-[1.25rem]' : 'text-[1rem]'} leading-none flex items-center gap-1`}>
                {item.trending && <TrendingUp sx={{ fontSize: isDesktop ? '1.125rem' : '1rem', color: '#22c55e' }} />}
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Breakout Table Section */}
      <Card>
        <SectionTitle
          title="Investment Details"
          icon={<AccountBalanceWallet sx={{ fontSize: isDesktop ? '1.5rem' : '1.25rem' }} />}
          isDesktop={isDesktop}
        />

        <div className="mt-4 flex flex-col gap-2">
          {/* Desktop Table Header */}
          {isDesktop && (
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#eef0f3]">
              <span className="text-[0.875rem] text-[#6b7280] font-extrabold leading-none">Item</span>
              <span className="text-[0.875rem] text-[#6b7280] font-extrabold leading-none text-right">Amount</span>
            </div>
          )}

          {/* Table Rows */}
          <div className="flex flex-col gap-0">
            {data.investmentDetails.map((item, i) => (
              <div key={i} className={`flex items-center border-b border-[#f5f6f8] last:border-0 ${isDesktop ? 'min-h-[3rem] grid grid-cols-2 gap-2' : 'min-h-[2.5rem] justify-between gap-3'}`}>
                <span className={`${isDesktop ? 'text-[1rem]' : 'text-[0.875rem]'} text-[#6b7280] font-bold`}>
                  {item.item}
                </span>
                <span className={`${isDesktop ? 'text-[1rem] text-right' : 'text-[0.875rem] shrink-0'} text-[#0f1f3d] font-extrabold`}>
                  {item.amount}
                </span>
              </div>
            ))}
          </div>

          {/* Total Sum Bar */}
          <div className={`mt-2 bg-gradient-to-r from-[#c9a34e] to-[#b8903c] rounded px-4 flex items-center justify-between ${isDesktop ? 'h-[3.5rem]' : 'h-[3rem]'}`}>
            <span className={`text-white font-bold opacity-90 ${isDesktop ? 'text-[1rem]' : 'text-[0.875rem]'}`}>
              Total Range
            </span>
            <span className={`text-white font-extrabold ${isDesktop ? 'text-[1.25rem]' : 'text-[1.125rem]'}`}>
              {data.totalInvestmentRange}
            </span>
          </div>
        </div>
      </Card>

      {/* Franchise Model Section */}
      <Card>
        <SectionTitle title="Franchise Model" isDesktop={isDesktop} />
        <div className="flex flex-col gap-0 mt-3">
          <LabelValueRow
            label="Model Type"
            value={
              <span className={`inline-flex items-center px-2.5 py-1 bg-[#eef0f3] border border-[#d9dde3] text-[#1f3b73] font-extrabold rounded ${isDesktop ? 'text-[0.875rem]' : 'text-[0.75rem]'}`}>
                {data.franchiseModel.modelType}
              </span>
            }
          />
          <LabelValueRow
            label="Unit Type"
            value={
              <span className={`font-extrabold text-[#0f1f3d] ${isDesktop ? 'text-[1rem]' : 'text-[0.875rem]'}`}>
                {data.franchiseModel.unitType}
              </span>
            }
          />
        </div>
      </Card>
    </div>
  );
}