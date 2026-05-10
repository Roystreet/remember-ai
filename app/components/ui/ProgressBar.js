export default function ProgressBar({ value }) {
  return (
    <div className="w-full">
      <div className="h-2.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--color-primary)] transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-[var(--color-muted)]">
        <span>Progreso</span>
        <span>{value}%</span>
      </div>
    </div>
  );
}
