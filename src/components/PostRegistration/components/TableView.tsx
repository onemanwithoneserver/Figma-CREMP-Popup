import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export interface Column<T> {
  key: string;
  label: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

interface TableViewProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  expandableContent?: (item: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export default function TableView<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  expandableContent,
  onRowClick,
  emptyMessage = 'No records found.',
}: TableViewProps<T>) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-[13px] font-light text-[#637089]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[7px] border border-black/[0.03] shadow-[0_4px_16px_rgba(0,0,0,0.02)] bg-white">
      <table className="w-full min-w-[560px] border-collapse">
        <thead>
          <tr className="border-b border-black/5 bg-[#fafafb]">
            {expandableContent && <th className="w-10 px-3 py-3" />}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3.5 text-left text-[13px] font-semibold text-[#0a1128] ${col.width ?? ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const rowKey = keyExtractor(item);
            const isExpanded = expandedRow === rowKey;
            
            return (
              <React.Fragment key={rowKey}>
                <tr
                  className={`border-b border-black/[0.03] transition-colors duration-300 ${
                    onRowClick || expandableContent ? 'cursor-pointer hover:bg-black/[0.02]' : ''
                  } ${isExpanded ? 'bg-black/[0.02]' : ''}`}
                  onClick={() => {
                    if (expandableContent) {
                      setExpandedRow(isExpanded ? null : rowKey);
                    } else {
                      onRowClick?.(item);
                    }
                  }}
                >
                  {expandableContent && (
                    <td className="px-3 py-3.5 w-10 text-center">
                      {isExpanded
                        ? <KeyboardArrowUpIcon sx={{ fontSize: 18, color: '#d4af37' }} />
                        : <KeyboardArrowDownIcon sx={{ fontSize: 18, color: '#a0aabf' }} />}
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3.5 text-sm font-light text-[#637089]">
                      {col.render ? col.render(item) : String(item[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
                {isExpanded && expandableContent && (
                  <tr className="bg-[#fafafb] border-b border-black/[0.03]">
                    <td
                      colSpan={columns.length + (expandableContent ? 1 : 0)}
                      className="px-6 py-5 relative"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37]" />
                      {expandableContent(item)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}