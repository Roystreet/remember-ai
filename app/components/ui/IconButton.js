export default function IconButton({ icon, label, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`soft-card flex flex-col items-center justify-center gap-2 px-3 py-3 text-sm hover:shadow-md transition disabled:opacity-50 ${className}`}
      {...props}
    >
      <span className="h-8 w-8 rounded-xl grid place-content-center text-[11px] font-bold text-[var(--color-primary)] bg-[var(--color-surface)] border border-[var(--color-border)]">
        {icon}
      </span>
      <span className="text-[13px] font-medium">{label}</span>
    </button>
  );
}
