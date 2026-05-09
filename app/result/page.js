"use client";

import { useState } from "react";
import AppShell from "../components/shell/AppShell";
import AIBadge from "../components/ui/AIBadge";
import ImagePreview from "../components/flow/ImagePreview";
import ResultActions from "../components/flow/ResultActions";
import HDDownloadCTA from "../components/flow/HDDownloadCTA";
import { resultMock } from "../data/mock";

export default function ResultPage() {
  const [saved, setSaved] = useState(false);

  return (
    <AppShell title={resultMock.title} activeTab="/history">
      <section className="pt-5 space-y-4">
        <ImagePreview
          originalSrc={resultMock.originalSrc}
          restoredSrc={resultMock.restoredSrc}
          mode="single"
        />
        <AIBadge />
        <ResultActions
          onDownload={() => {}}
          onShare={() => {}}
          onSave={() => setSaved((value) => !value)}
          disabled={false}
        />
        {saved ? <p className="text-sm text-[var(--color-muted)]">Guardado en tu historial.</p> : null}
        <HDDownloadCTA />
      </section>
    </AppShell>
  );
}

