"use client";

import { useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";

export default function UploadCard() {
  const [previewUrl, setPreviewUrl] = useState("");

  const onFileChange = (event) => {
    const nextFile = event.target.files?.[0] ?? null;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(nextFile ? URL.createObjectURL(nextFile) : "");
  };

  return (
    <section className="surface-card p-4">
      <label className="block text-sm font-semibold mb-2">Selecciona una foto</label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="w-full text-sm"
      />
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview local"
          className="mt-4 h-52 w-full rounded-xl object-cover border border-[var(--color-border)]"
        />
      ) : (
        <div className="mt-4 h-52 w-full rounded-xl border border-dashed border-[var(--color-border)] bg-white grid place-content-center text-sm text-[var(--color-muted)]">
          Aun no hay imagen cargada
        </div>
      )}
      <PrimaryButton className="mt-4">Iniciar restauracion</PrimaryButton>
    </section>
  );
}
