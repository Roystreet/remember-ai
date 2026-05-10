import ProgressBar from "../ui/ProgressBar";

export default function ProcessStepper({ steps, currentStep, progress }) {
  return (
    <section className="surface-card p-4">
      <ol className="grid grid-cols-3 gap-2 mb-5">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const done = index < currentStep;
          return (
            <li key={step.id} className="text-center">
              <span
                className={`mx-auto mb-2 grid h-9 w-9 place-content-center rounded-full text-xs font-semibold transition ${
                  done
                    ? "bg-[var(--color-primary)] text-white"
                    : isActive
                    ? "bg-[var(--color-surface-strong)] border border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "bg-white border border-[var(--color-border)] text-[var(--color-muted)]"
                }`}
              >
                {index + 1}
              </span>
              <p className={`text-[11px] ${isActive ? "font-semibold" : "font-medium"} leading-tight`}>{step.label}</p>
            </li>
          );
        })}
      </ol>
      <p className="text-sm mb-2 font-medium">Estamos reconstruyendo este recuerdo...</p>
      <ProgressBar value={progress} />
    </section>
  );
}
