import AppShell from "../components/shell/AppShell";

const settings = [
  "Cuenta y suscripcion",
  "Preferencias de restauracion",
  "Privacidad y seguridad",
  "Ayuda",
];

export default function ProfilePage() {
  return (
    <AppShell title="Perfil" activeTab="/profile">
      <section className="pt-5 space-y-3">
        <article className="surface-card p-4">
          <p className="text-sm font-semibold">Plan actual</p>
          <p className="text-xs text-[var(--color-muted)] mt-1">Free - 3 restauraciones por mes</p>
        </article>
        {settings.map((label) => (
          <article key={label} className="soft-card p-4 text-sm">
            <p className="font-medium">{label}</p>
            <p className="text-[var(--color-muted)] text-xs mt-1">Disponible en proximas iteraciones</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
