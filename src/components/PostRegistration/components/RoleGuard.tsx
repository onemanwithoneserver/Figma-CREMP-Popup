import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import type { ReactNode } from 'react';

interface RoleGuardProps {
  allowed: ('seller' | 'buyer')[];
  currentRole: 'seller' | 'buyer';
  children: ReactNode;
}

export default function RoleGuard({ allowed, currentRole, children }: RoleGuardProps) {
  if (!allowed.includes(currentRole)) {
    const readable = allowed.length === 1 ? allowed[0] : allowed.join(' or ');
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12 px-6">
        <div className="w-16 h-16 rounded-[7px] bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] flex items-center justify-center shadow-[0_8px_24px_rgba(10,17,40,0.15)]">
          <LockOutlinedIcon sx={{ fontSize: '1.75rem', color: '#d4af37' }} />
        </div>
        <div className="text-center space-y-1.5">
          <h3 className="text-lg font-semibold text-[#0a1128]">Access Restricted</h3>
          <p className="text-[13px] font-light text-[#637089] max-w-[260px] mx-auto leading-relaxed">
            This section is exclusively available for{' '}
            <span className="font-medium capitalize text-[#0a1128]">{readable}</span> accounts.
          </p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}