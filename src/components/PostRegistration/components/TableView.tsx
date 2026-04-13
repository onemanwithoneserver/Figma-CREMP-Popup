import { useState } from 'react';
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
      <div className="py-12 text-center text-sm font-light text-[#637089]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px]">
        <thead>
          <tr className="border-b border-black/[0.05]">
            {expandableContent && <th className="w-10 px-3 py-3" />}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-xs font-semibold text-[#637089] tracking-wide ${col.width ?? ''}`}
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
              <>
                <tr
                  key={rowKey}
                  className={`border-b border-black/[0.03] transition-colors duration-150 ${
                    onRowClick || expandableContent ? 'cursor-pointer hover:bg-[#fafafb]' : ''
                  } ${isExpanded ? 'bg-[#fafafb]' : ''}`}
                  onClick={() => {
                    if (expandableContent) {
                      setExpandedRow(isExpanded ? null : rowKey);
                    } else {
                      onRowClick?.(item);
                    }
                  }}
                >
                  {expandableContent && (
                    <td className="px-3 py-3 w-10">
                      {isExpanded
                        ? <KeyboardArrowUpIcon sx={{ fontSize: 18, color: '#637089' }} />
                        : <KeyboardArrowDownIcon sx={{ fontSize: 18, color: '#a0aabf' }} />}
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm font-light text-[#0a1128]">
                      {col.render ? col.render(item) : String(item[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
                {isExpanded && expandableContent && (
                  <tr key={`${rowKey}-expanded`}>
                    <td
                      colSpan={columns.length + 1}
                      className="px-6 py-4 border-b border-black/[0.03] bg-[#fafafb]"
                    >
                      {expandableContent(item)}
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
