import Image from "next/image";

export default function ImagePreview({ originalSrc, restoredSrc, mode = "stack" }) {
  if (mode === "single") {
    return (
      <div className="soft-card p-2">
        <Image
          src={restoredSrc}
          alt="Imagen restaurada"
          width={600}
          height={420}
          unoptimized
          className="h-72 w-full object-contain rounded-xl bg-[var(--color-surface)]"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="soft-card p-2">
        <p className="px-1 pb-2 text-sm font-semibold">Imagen original</p>
        <Image
          src={originalSrc}
          alt="Imagen original"
          width={600}
          height={420}
          unoptimized
          className="h-52 w-full object-contain rounded-xl bg-[var(--color-surface)]"
        />
      </div>
      <div className="soft-card p-2">
        <p className="px-1 pb-2 text-sm font-semibold">Imagen restaurada</p>
        <Image
          src={restoredSrc}
          alt="Imagen restaurada"
          width={600}
          height={420}
          unoptimized
          className="h-52 w-full object-contain rounded-xl bg-[var(--color-surface)]"
        />
      </div>
    </div>
  );
}
