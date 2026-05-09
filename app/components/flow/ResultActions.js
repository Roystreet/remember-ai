"use client";

import IconButton from "../ui/IconButton";

export default function ResultActions({ onDownload, onShare, onSave, disabled }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <IconButton icon="DL" label="Descargar" onClick={onDownload} disabled={disabled} />
      <IconButton icon="SH" label="Compartir" onClick={onShare} disabled={disabled} />
      <IconButton icon="SV" label="Guardar" onClick={onSave} disabled={disabled} />
    </div>
  );
}

