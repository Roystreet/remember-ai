import Image from "next/image";

export default function ImagePreview({ originalSrc, restoredSrc, mode = "stack" }) {
  if (mode === "single") {
    return (
      <div className="surface-card p-2">
        <Image
          src={restoredSrc}
          alt="Imagen restaurada"
          width={600}
          height={420}
          className="h-72 w-full object-cover rounded-xl"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="surface-card p-2">
        <p className="px-1 pb-2 text-sm font-semibold">Imagen original</p>
        <Image
          src={originalSrc}
          alt="Imagen original"
          width={600}
          height={420}
          className="h-40 w-full object-cover rounded-xl"
        />
      </div>
      <div className="surface-card p-2">
        <p className="px-1 pb-2 text-sm font-semibold">Imagen restaurada</p>
        <Image
          src={restoredSrc}
          alt="Imagen restaurada"
          width={600}
          height={420}
          className="h-40 w-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}

