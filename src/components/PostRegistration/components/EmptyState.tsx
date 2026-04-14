import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12 px-6">
      <div className="w-16 h-16 rounded-[7px] bg-gradient-to-br from-white to-[#fafafb] border border-[#d4af37]/20 flex items-center justify-center shadow-[0_8px_24px_rgba(212,175,55,0.08)]">
        {icon ?? <InboxOutlinedIcon sx={{ fontSize: '1.75rem', color: '#d4af37' }} />}
      </div>
      <div className="text-center space-y-1.5">
        <h3 className="text-lg font-semibold text-[#0a1128]">{title}</h3>
        <p className="text-[13px] font-light text-[#637089] max-w-[260px] mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}