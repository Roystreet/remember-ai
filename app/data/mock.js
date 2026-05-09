export const featureFlow = [
  {
    id: "original",
    title: "Foto original",
    subtitle: "Danada y antigua",
    image: "/window.svg",
  },
  {
    id: "restored",
    title: "Foto restaurada",
    subtitle: "Mejorada con IA",
    image: "/globe.svg",
  },
  {
    id: "video",
    title: "Video generado",
    subtitle: "Tu recuerdo cobra vida",
    image: "/file.svg",
  },
];

export const processSteps = [
  { id: "restore", label: "Restaurando", state: "active" },
  { id: "enhance", label: "Mejorando", state: "pending" },
  { id: "video", label: "Generando video", state: "pending" },
];

export const resultMock = {
  title: "Tu recuerdo esta listo",
  originalSrc: "/window.svg",
  restoredSrc: "/next.svg",
  videoPreviewSrc: "/vercel.svg",
};

export const historyItems = [
  {
    id: "h-01",
    title: "Cumpleanos 1984",
    createdAt: "2026-05-04",
    status: "listo",
    originalSrc: "/window.svg",
    restoredSrc: "/next.svg",
  },
  {
    id: "h-02",
    title: "Boda de mis padres",
    createdAt: "2026-05-07",
    status: "procesando",
    originalSrc: "/file.svg",
    restoredSrc: "/globe.svg",
  },
];

