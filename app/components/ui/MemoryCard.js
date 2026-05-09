import Image from "next/image";

export default function MemoryCard({ item }) {
  return (
    <article className="surface-card p-3">
      <div className="grid grid-cols-[48px_1fr] gap-3 items-center">
        <Image
          src={item.restoredSrc}
          alt={item.title}
          width={48}
          height={48}
          className="rounded-lg border border-[var(--color-border)]"
        />
        <div>
          <p className="font-semibold text-sm">{item.title}</p>
          <p className="text-xs text-[var(--color-muted)]">{item.createdAt}</p>
          <p className="text-xs mt-1">Estado: {item.status}</p>
        </div>
      </div>
    </article>
  );
}

