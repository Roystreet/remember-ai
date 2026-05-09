import Link from "next/link";

export default function TopBar({ title }) {
  return (
    <header className="px-5 pt-5 pb-3 border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-semibold text-sm">
          Remember AI
        </Link>
        <button
          type="button"
          aria-label="Configuracion"
          className="h-8 w-8 rounded-full border border-[var(--color-border)] text-[var(--color-muted)]"
        >
          CG
        </button>
      </div>
      {title ? <p className="mt-3 text-lg font-semibold">{title}</p> : null}
    </header>
  );
}
