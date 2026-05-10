import Image from "next/image";

export default function MemoryCard({ item }) {
  return (
    <article className="soft-card p-3">
      <div className="grid grid-cols-[56px_1fr_auto] gap-3 items-center">
        <Image
          src={item.restoredSrc}
          alt={item.title}
          width={56}
          height={56}
          className="h-14 w-14 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] object-cover"
        />
        <div>
          <p className="font-semibold text-[13px] leading-tight">{item.title}</p>
          <p className="text-xs text-[var(--color-muted)] mt-1">{item.createdAt}</p>
        </div>
        <span className="status-pill" data-status={item.status}>
          {item.status}
        </span>
      </div>
    </article>
  );
}
