// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="w-[3px] h-[14px] rounded-full bg-[#d4af37] shrink-0 block" />
        <h2 className="text-[13px] font-bold text-[#0a1128] tracking-[0.01em]" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h2>
      </div>
      {action && (
        <button type="button" onClick={onAction} className="text-[11px] font-semibold text-[#1a3463] hover:text-[#d4af37] transition-colors focus-visible:outline-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {action} →
        </button>
      )}
    </div>
  );
}
