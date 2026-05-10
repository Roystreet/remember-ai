import Link from "next/link";

export default function TopBar({ title }) {
  return (
    <header className="px-5 pt-5 pb-4 border-b border-[var(--color-border)] bg-white">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 font-semibold text-sm">
          <span className="h-6 w-6 rounded-full grid place-content-center text-white text-[10px] font-bold bg-[var(--color-primary)]">
            RA
          </span>
          Remember AI
        </Link>
        <button
          type="button"
          aria-label="Configuracion"
          className="h-9 w-9 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] bg-[var(--color-surface)]"
        >
          CG
        </button>
      </div>
      {title ? <p className="mt-4 text-xl font-semibold leading-tight">{title}</p> : null}
    </header>
  );
}
