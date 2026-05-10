"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/shell/AppShell";
import ProcessStepper from "../components/flow/ProcessStepper";
import ImagePreview from "../components/flow/ImagePreview";
import { processSteps, resultMock } from "../data/mock";

export default function ProcessPage() {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 5));
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const currentStep = progress >= 70 ? 2 : progress >= 35 ? 1 : 0;

  const steps = useMemo(
    () =>
      processSteps.map((step, index) => ({
        ...step,
        state: index < currentStep ? "done" : index === currentStep ? "active" : "pending",
      })),
    [currentStep]
  );

  return (
    <AppShell title="Procesando tu recuerdo">
      <section className="pt-5 space-y-4">
        <ProcessStepper steps={steps} currentStep={currentStep} progress={progress} />
        <ImagePreview originalSrc={resultMock.originalSrc} restoredSrc={resultMock.restoredSrc} />
        <article className="soft-card p-4">
          <p className="text-sm font-medium">Que estamos mejorando ahora</p>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            Limpieza de ruido, recuperacion de textura y balance de color para salida en alta calidad.
          </p>
        </article>
      </section>
    </AppShell>
  );
}
