export default function IconButton({ icon, label, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`surface-card flex flex-col items-center justify-center gap-2 px-3 py-3 text-sm ${className}`}
      {...props}
    >
      <span className="text-base text-[var(--color-primary)]">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

