interface VerifiedBadgeProps {
  size?: 'sm' | 'md';
  className?: string;
}

export default function VerifiedBadge({ size = 'sm', className = '' }: VerifiedBadgeProps) {
  const isMd = size === 'md';

  return (
    <span
      className={`inline-flex items-center gap-[3px] rounded-full font-bold tracking-wide cb-verified-pulse
        ${isMd
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] px-2.5 py-[3px]'
          : 'bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] px-2 py-[2px]'
        } ${className}`}
    >
      {/* Checkmark shield icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className={isMd ? 'w-3 h-3' : 'w-2.5 h-2.5'}
      >
        <path
          fillRule="evenodd"
          d="M8 1.25a.75.75 0 0 0-.454.152L2.546 4.8A.75.75 0 0 0 2.25 5.4v4.85a.75.75 0 0 0 .296.6l5 3.75a.75.75 0 0 0 .908 0l5-3.75a.75.75 0 0 0 .296-.6V5.4a.75.75 0 0 0-.296-.6L8.454 1.402A.75.75 0 0 0 8 1.25Zm2.78 5.47a.75.75 0 0 0-1.06-1.06L7.25 8.13 6.28 7.16a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.06 0l3-3Z"
          clipRule="evenodd"
        />
      </svg>
      VERIFIED
    </span>
  );
}
