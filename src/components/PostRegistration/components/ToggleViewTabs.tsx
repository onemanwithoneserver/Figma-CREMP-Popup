import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';

interface ToggleViewTabsProps {
  view: 'grid' | 'list';
  onChange: (view: 'grid' | 'list') => void;
}

export default function ToggleViewTabs({ view, onChange }: ToggleViewTabsProps) {
  return (
    <div className="flex bg-[#fafafb] border border-black/[0.03] rounded-[7px] p-0.5 gap-0.5">
      {(['grid', 'list'] as const).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-medium transition-all duration-200 ${
            view === v
              ? 'bg-white text-[#0a1128] shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
              : 'text-[#637089] hover:text-[#0a1128]'
          }`}
        >
          {v === 'grid' ? (
            <GridViewOutlinedIcon sx={{ fontSize: 14 }} />
          ) : (
            <TableRowsOutlinedIcon sx={{ fontSize: 14 }} />
          )}
          {v === 'grid' ? 'Grid' : 'List'}
        </button>
      ))}
    </div>
  );
}
