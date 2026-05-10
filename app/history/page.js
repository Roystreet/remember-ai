import Link from "next/link";
import AppShell from "../components/shell/AppShell";
import MemoryCard from "../components/ui/MemoryCard";
import { historyItems } from "../data/mock";

export default function HistoryPage() {
  return (
    <AppShell title="Historial" activeTab="/history">
      <section className="pt-5 space-y-3">
        <article className="soft-card p-4">
          <p className="text-sm font-medium">Tus recuerdos restaurados</p>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            Aqui encuentras tus restauraciones recientes y procesos activos.
          </p>
        </article>
        {historyItems.map((item) => (
          <Link href="/result" key={item.id} className="block">
            <MemoryCard item={item} />
          </Link>
        ))}
      </section>
    </AppShell>
  );
}
