import AppShell from "../components/shell/AppShell";
import UploadCard from "../components/flow/UploadCard";

export default function UploadPage() {
  return (
    <AppShell title="Sube tu recuerdo">
      <section className="pt-5 space-y-4">
        <article className="soft-card p-4">
          <p className="text-sm font-medium">Checklist rapido antes de restaurar</p>
          <ul className="mt-2 space-y-1 text-xs text-[var(--color-muted)]">
            <li>Buena iluminacion en el rostro principal.</li>
            <li>Evita capturas borrosas de baja resolucion extrema.</li>
            <li>Carga una sola foto por cada proceso.</li>
          </ul>
        </article>
        <UploadCard />
      </section>
    </AppShell>
  );
}
