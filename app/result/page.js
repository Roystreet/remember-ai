"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/shell/AppShell";
import AIBadge from "../components/ui/AIBadge";
import ImagePreview from "../components/flow/ImagePreview";
import ResultActions from "../components/flow/ResultActions";
import HDDownloadCTA from "../components/flow/HDDownloadCTA";
import { resultMock } from "../data/mock";

export default function ResultPage() {
  const [saved, setSaved] = useState(false);
  const [restorationResult, setRestorationResult] = useState(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("rememberAiResult");
    if (!storedResult) return;
    let isMounted = true;

    try {
      const parsedResult = JSON.parse(storedResult);
      queueMicrotask(() => {
        if (isMounted) setRestorationResult(parsedResult);
      });
    } catch {
      sessionStorage.removeItem("rememberAiResult");
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const result = restorationResult ?? resultMock;

  const downloadHref = useMemo(() => result.restoredSrc, [result.restoredSrc]);

  const onDownload = () => {
    const anchor = document.createElement("a");
    anchor.href = downloadHref;
    anchor.download = "remember-ai-restored.png";
    anchor.click();
  };

  return (
    <AppShell title={result.title} activeTab="/history">
      <section className="pt-5 space-y-4">
        <ImagePreview
          originalSrc={result.originalSrc}
          restoredSrc={result.restoredSrc}
          mode="single"
        />
        <div className="soft-card p-3">
          <p className="text-sm font-medium">Vista previa final</p>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            Puedes descargarla, guardarla en historial o compartirla directamente.
          </p>
        </div>
        <AIBadge />
        <ResultActions
          onDownload={onDownload}
          onShare={() => {}}
          onSave={() => setSaved((value) => !value)}
          disabled={false}
        />
        {saved ? <p className="text-sm text-[var(--color-success)] font-medium">Guardado en tu historial.</p> : null}
        <HDDownloadCTA />
      </section>
    </AppShell>
  );
}
