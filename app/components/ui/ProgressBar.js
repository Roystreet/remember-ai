export default function ProgressBar({ value }) {
  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-[var(--color-border)]">
        <div
          className="h-full rounded-full bg-[var(--color-primary)] transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-2 text-right text-sm text-[var(--color-muted)]">{value}%</p>
    </div>
  );
}

