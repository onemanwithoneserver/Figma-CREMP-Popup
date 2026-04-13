import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20 px-6">
      <div className="w-14 h-14 rounded-[7px] bg-[#fafafb] border border-black/[0.03] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        {icon ?? <InboxOutlinedIcon sx={{ fontSize: '1.5rem', color: '#a0aabf' }} />}
      </div>
      <div className="text-center">
        <h3 className="text-base font-light text-[#0a1128] mb-1">{title}</h3>
        <p className="text-sm font-light text-[#637089] max-w-xs leading-relaxed">{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
