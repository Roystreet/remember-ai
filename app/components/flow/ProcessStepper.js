import ProgressBar from "../ui/ProgressBar";

export default function ProcessStepper({ steps, currentStep, progress }) {
  return (
    <section className="surface-card p-4">
      <ol className="grid grid-cols-3 gap-2 mb-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const done = index < currentStep;
          return (
            <li key={step.id} className="text-center">
              <span
                className={`mx-auto mb-2 grid h-8 w-8 place-content-center rounded-full text-xs font-semibold ${
                  done
                    ? "bg-[var(--color-primary)] text-white"
                    : isActive
                    ? "bg-[var(--color-surface)] border border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "bg-white border border-[var(--color-border)] text-[var(--color-muted)]"
                }`}
              >
                {index + 1}
              </span>
              <p className="text-[11px] font-medium">{step.label}</p>
            </li>
          );
        })}
      </ol>
      <p className="text-sm mb-2">Estamos reconstruyendo este recuerdo...</p>
      <ProgressBar value={progress} />
    </section>
  );
}

