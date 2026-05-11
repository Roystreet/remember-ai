"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PrimaryButton from "../ui/PrimaryButton";

export default function UploadCard() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [isRestoring, setIsRestoring] = useState(false);

  const onFileChange = (event) => {
    const nextFile = event.target.files?.[0] ?? null;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(nextFile);
    setPreviewUrl(nextFile ? URL.createObjectURL(nextFile) : "");
    setError("");
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const onRestore = async () => {
    if (!selectedFile) {
      setError("Selecciona una imagen antes de iniciar la restauracion.");
      return;
    }

    setIsRestoring(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const [originalSrc, response] = await Promise.all([
        fileToDataUrl(selectedFile),
        fetch("/api/images/restore", {
          method: "POST",
          body: formData,
        }),
      ]);

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "No se pudo restaurar la imagen.");
      }

      sessionStorage.setItem(
        "rememberAiResult",
        JSON.stringify({
          title: "Tu recuerdo esta listo",
          originalSrc,
          restoredSrc: payload.image.dataUrl,
        }),
      );

      router.push("/result");
    } catch (restoreError) {
      setError(
        restoreError instanceof Error
          ? restoreError.message
          : "No se pudo restaurar la imagen.",
      );
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <section className="surface-card p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <p className="text-sm font-semibold">Carga de imagen</p>
          <p className="text-xs text-[var(--color-muted)] mt-1">JPG, PNG o WEBP - hasta 20 MB</p>
        </div>
        <span className="status-pill">Paso 1</span>
      </div>
      <label className="block text-sm font-medium mb-2">Selecciona una foto</label>
      <div className="flex items-center gap-3">
        <label
          htmlFor="upload-photo-input"
          className={`inline-flex cursor-pointer items-center rounded-lg border px-4 py-2 text-sm font-medium transition ${isRestoring
              ? "cursor-not-allowed border-[var(--color-border)] bg-gray-100 text-[var(--color-muted)]"
              : "border-[var(--color-border)] bg-white hover:bg-gray-50"
            }`}
        >
          {selectedFile ? "Cambiar foto" : "Seleccionar foto"}
        </label>
        <span className="text-xs text-[var(--color-muted)]">
          {selectedFile ? `Archivo: ${selectedFile.name}` : "Ningun archivo seleccionado"}
        </span>
      </div>
      <input
        id="upload-photo-input"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        disabled={isRestoring}
        className="sr-only"
      />
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Preview local"
          width={960}
          height={720}
          unoptimized
          className="mt-4 h-52 w-full rounded-xl object-contain bg-[var(--color-surface)] border border-[var(--color-border)]"
        />
      ) : (
        <div className="mt-4 h-52 w-full rounded-xl border border-dashed border-[var(--color-border)] bg-white grid place-content-center text-center px-4">
          <p className="text-sm font-medium">Arrastra tu foto aqui o cargala desde tu equipo</p>
          <p className="text-xs text-[var(--color-muted)] mt-1">La vista previa se muestra solo en este dispositivo.</p>
        </div>
      )}
      {error ? <p className="mt-3 text-sm font-medium text-[var(--color-danger)]">{error}</p> : null}
      <PrimaryButton className="mt-4 cursor-pointer" onClick={onRestore} disabled={isRestoring}>
        {isRestoring ? "Restaurando imagen..." : "Iniciar restauracion"}
      </PrimaryButton>
    </section>
  );
}
