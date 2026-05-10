import Link from "next/link";
import Image from "next/image";
import AppShell from "./components/shell/AppShell";
import PrimaryButton from "./components/ui/PrimaryButton";
import { featureFlow } from "./data/mock";

export default function Home() {
  return (
    <AppShell title="Devuelve la vida a tus recuerdos" activeTab="/">
      <section className="pt-5">
        <p className="screen-title max-w-[15ch]">Recupera cada detalle de tus fotos antiguas</p>
        <p className="text-[var(--color-muted)] text-sm mt-3 mb-5">
          Transformamos tus fotos antiguas en historias que cobran vida.
        </p>
        <Link href="/upload" className="block">
          <PrimaryButton>Subir foto</PrimaryButton>
        </Link>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <article className="soft-card p-3">
            <p className="text-xs text-[var(--color-muted)]">Tiempo promedio</p>
            <p className="text-sm font-semibold mt-1">30 - 60 segundos</p>
          </article>
          <article className="soft-card p-3">
            <p className="text-xs text-[var(--color-muted)]">Formato de salida</p>
            <p className="text-sm font-semibold mt-1">Alta definicion</p>
          </article>
        </div>
      </section>
      <section className="mt-8 pb-3">
        <h2 className="font-semibold mb-3">Asi funciona</h2>
        <div className="grid grid-cols-3 gap-2">
          {featureFlow.map((step) => (
            <article key={step.id} className="soft-card p-2">
              <Image
                src={step.image}
                alt={step.title}
                width={120}
                height={120}
                className="w-full h-20 rounded-xl object-cover bg-[var(--color-surface)] border border-[var(--color-border)]"
              />
              <p className="mt-2 text-xs font-semibold leading-tight">{step.title}</p>
              <p className="text-[11px] text-[var(--color-muted)]">{step.subtitle}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
