import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface RoleGuardProps {
  allowed: ('seller' | 'buyer')[];
  currentRole: 'seller' | 'buyer';
  children: React.ReactNode;
}

export default function RoleGuard({ allowed, currentRole, children }: RoleGuardProps) {
  if (!allowed.includes(currentRole)) {
    const readable = allowed.length === 1 ? allowed[0] : allowed.join(' or ');
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20 px-6">
        <div className="w-14 h-14 rounded-[7px] bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] flex items-center justify-center shadow-[0_10px_20px_rgba(10,17,40,0.15)]">
          <LockOutlinedIcon sx={{ fontSize: '1.5rem', color: '#e5c158' }} />
        </div>
        <div className="text-center">
          <h3 className="text-base font-light text-[#0a1128] mb-1">Access Restricted</h3>
          <p className="text-sm font-light text-[#637089] max-w-xs leading-relaxed">
            This section is only available for{' '}
            <span className="font-medium capitalize text-[#0a1128]">{readable}</span> accounts.
          </p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
