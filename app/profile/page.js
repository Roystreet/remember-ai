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
        {settings.map((label) => (
          <article key={label} className="surface-card p-4 text-sm">
            <p className="font-medium">{label}</p>
            <p className="text-[var(--color-muted)] text-xs mt-1">Disponible en proximas iteraciones</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}

