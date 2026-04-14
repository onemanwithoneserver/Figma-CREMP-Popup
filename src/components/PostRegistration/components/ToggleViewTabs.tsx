import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';

interface ToggleViewTabsProps {
  view: 'grid' | 'list';
  onChange: (view: 'grid' | 'list') => void;
}

export default function ToggleViewTabs({ view, onChange }: ToggleViewTabsProps) {
  return (
    <div className="flex bg-[#fafafb] border border-black/5 rounded-[7px] p-1 gap-1 shrink-0 h-full">
      {(['grid', 'list'] as const).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`flex items-center justify-center gap-1.5 px-2 md:px-3 py-1.5 rounded-[4px] text-[13px] font-medium transition-all duration-300 ${
            view === v
              ? 'bg-white text-[#0a1128] shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
              : 'text-[#637089] hover:bg-black/[0.02] hover:text-[#0a1128]'
          }`}
        >
          {v === 'grid' ? (
            <GridViewOutlinedIcon sx={{ fontSize: 16, color: view === 'grid' ? '#d4af37' : 'inherit' }} />
          ) : (
            <TableRowsOutlinedIcon sx={{ fontSize: 16, color: view === 'list' ? '#d4af37' : 'inherit' }} />
          )}
          <span className="capitalize hidden md:block">{v}</span>
        </button>
      ))}
    </div>
  );
}