import Link from "next/link";
import Image from "next/image";
import AppShell from "./components/shell/AppShell";
import PrimaryButton from "./components/ui/PrimaryButton";
import { featureFlow } from "./data/mock";

export default function Home() {
  return (
    <AppShell title="Devuelve la vida a tus recuerdos" activeTab="/">
      <section className="pt-5">
        <p className="text-[var(--color-muted)] text-sm mb-4">
          Transformamos tus fotos antiguas en historias que cobran vida.
        </p>
        <Link href="/upload" className="block">
          <PrimaryButton>Subir foto</PrimaryButton>
        </Link>
      </section>
      <section className="mt-8">
        <h2 className="font-semibold mb-3">Asi funciona</h2>
        <div className="grid grid-cols-3 gap-2">
          {featureFlow.map((step) => (
            <article key={step.id} className="surface-card p-2">
              <Image
                src={step.image}
                alt={step.title}
                width={120}
                height={120}
                className="w-full h-20 rounded-lg object-cover bg-white border border-[var(--color-border)]"
              />
              <p className="mt-2 text-xs font-semibold">{step.title}</p>
              <p className="text-[11px] text-[var(--color-muted)]">{step.subtitle}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
