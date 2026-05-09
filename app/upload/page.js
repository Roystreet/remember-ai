import AppShell from "../components/shell/AppShell";
import UploadCard from "../components/flow/UploadCard";

export default function UploadPage() {
  return (
    <AppShell title="Sube tu recuerdo">
      <section className="pt-5 space-y-4">
        <p className="text-sm text-[var(--color-muted)]">
          Sube una foto para iniciar la restauracion. Este flujo aun no envia datos al backend.
        </p>
        <UploadCard />
      </section>
    </AppShell>
  );
}

