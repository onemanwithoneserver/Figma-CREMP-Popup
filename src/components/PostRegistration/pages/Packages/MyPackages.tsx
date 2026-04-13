import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { PricingTable } from './data';
import { PRICING_TABLES } from './data';

interface MyPackagesProps {
  isDesktop: boolean;
}

function PricingTableCard({ table, isDesktop }: { table: PricingTable; isDesktop: boolean }) {
  return (
    <div className="bg-white rounded-[7px] border border-black/[0.03] shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Table header */}
      <div className="px-4 py-3 border-b border-black/[0.03] bg-[#fafafb] flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-[#0a1128]">{table.title}</h3>
          <p className="text-[11px] font-light text-[#637089] mt-0.5">{table.validity}</p>
        </div>
        {table.notes && table.notes.length > 0 && (
          <div className="flex flex-col gap-0.5">
            {table.notes.map((n) => (
              <div key={n} className="flex items-center gap-1 text-[10px] font-light text-[#a0aabf]">
                <InfoOutlinedIcon sx={{ fontSize: 11 }} />
                {n}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scrollable table */}
      <div className={`overflow-x-auto ${isDesktop ? '' : 'text-[11px]'}`}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128]">
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-white/80 whitespace-nowrap min-w-[120px]">
                {table.slabLabel}
              </th>
              {table.columns.map((col) => (
                <th key={col} className="px-3 py-2.5 text-[11px] font-semibold text-[#e5c158] whitespace-nowrap text-center">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr
                key={row.slab}
                className={`border-b border-black/[0.03] transition-colors hover:bg-[#fafafb] ${
                  ri % 2 === 0 ? 'bg-white' : 'bg-[#fafafb]/50'
                }`}
              >
                <td className="px-4 py-2.5 text-xs font-semibold text-[#0a1128] whitespace-nowrap">
                  {row.slab}
                </td>
                {row.prices.map((price, ci) => (
                  <td key={ci} className="px-3 py-2.5 text-xs font-light text-[#637089] text-center whitespace-nowrap">
                    {price}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MyPackages({ isDesktop }: MyPackagesProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-[#0a1128] tracking-wide">Rate Card</h2>
      {PRICING_TABLES.map((table) => (
        <PricingTableCard key={table.id} table={table} isDesktop={isDesktop} />
      ))}
    </div>
  );
}
