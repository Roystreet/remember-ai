import Link from "next/link";
import AppShell from "../components/shell/AppShell";
import MemoryCard from "../components/ui/MemoryCard";
import { historyItems } from "../data/mock";

export default function HistoryPage() {
  return (
    <AppShell title="Historial" activeTab="/history">
      <section className="pt-5 space-y-3">
        {historyItems.map((item) => (
          <Link href="/result" key={item.id} className="block">
            <MemoryCard item={item} />
          </Link>
        ))}
      </section>
    </AppShell>
  );
}

