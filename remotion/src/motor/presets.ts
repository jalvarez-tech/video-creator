/**
 * Presets canónicos de las 3 plantillas iniciales.
 * Son la "decisión reusable": el componente los lee y no hay que re-preguntar nada.
 * La doc humana de cada uno está en:
 *   manuales/edicion-video/plantillas/<slug>.md
 */

export type Preset = {
  slug: string;
  nombre: string;
  formato: {
    aspecto: string;
    width: number;
    height: number;
    fps: number;
    layout: string;
    zonaSeguraPct: number;
  };
  subtitulos: {
    tipografia: string;
    tamanoPx: number;
    posicionYpct: number; // 0 = arriba, 100 = abajo
    palabrasPorLinea: number;
    barra: boolean; // caja de fondo tenue tras el texto
  };
  titulos: {
    variante: "lower-third" | "hook" | "banda";
    margenPx: number;
    duracionFrames: number;
  };
  exportacion: {
    codec: string;
    audio: { codec: string; bitrate: string; normalizar: boolean };
    nombre: string; // patrón de nombre de archivo final
    carpeta: string;
  };
};

// T1 — Tutoriales / demos horizontales para YouTube
export const tutorialYT: Preset = {
  slug: "tutorial-yt-16x9",
  nombre: "Tutorial YouTube 16:9",
  formato: {
    aspecto: "16:9",
    width: 1920,
    height: 1080,
    fps: 30,
    layout: "alterna-pantalla-camara",
    zonaSeguraPct: 5,
  },
  subtitulos: {
    tipografia: "Inter",
    tamanoPx: 40,
    posicionYpct: 86,
    palabrasPorLinea: 8,
    barra: false,
  },
  titulos: { variante: "lower-third", margenPx: 64, duracionFrames: 120 },
  exportacion: {
    codec: "h264",
    audio: { codec: "aac", bitrate: "192k", normalizar: true },
    nombre: "{proyecto}-{titulo}-16x9.mp4",
    carpeta: "finales/",
  },
};

// T2 — Clips cortos / talking-head verticales para Reels/TikTok/Shorts
export const verticalSocial: Preset = {
  slug: "vertical-social-9x16",
  nombre: "Vertical Social 9:16",
  formato: {
    aspecto: "9:16",
    width: 1080,
    height: 1920,
    fps: 30,
    layout: "talking-head",
    zonaSeguraPct: 11,
  },
  subtitulos: {
    tipografia: "Inter",
    tamanoPx: 56,
    posicionYpct: 70, // subido para no chocar con la UI de la app
    palabrasPorLinea: 4,
    barra: false,
  },
  titulos: { variante: "hook", margenPx: 56, duracionFrames: 75 },
  exportacion: {
    codec: "h264",
    audio: { codec: "aac", bitrate: "192k", normalizar: true },
    nombre: "{proyecto}-{titulo}-9x16.mp4",
    carpeta: "finales/",
  },
};

// T3 — Repurpose para feed cuadrado (Instagram / LinkedIn)
export const feedCuadrado: Preset = {
  slug: "feed-cuadrado-1x1",
  nombre: "Feed Cuadrado 1:1",
  formato: {
    aspecto: "1:1",
    width: 1080,
    height: 1080,
    fps: 30,
    layout: "centrado",
    zonaSeguraPct: 8,
  },
  subtitulos: {
    tipografia: "Inter",
    tamanoPx: 46,
    posicionYpct: 83,
    palabrasPorLinea: 6,
    barra: true, // barra tenue para el feed
  },
  titulos: { variante: "banda", margenPx: 48, duracionFrames: 90 },
  exportacion: {
    codec: "h264",
    audio: { codec: "aac", bitrate: "192k", normalizar: true },
    nombre: "{proyecto}-{titulo}-1x1.mp4",
    carpeta: "finales/",
  },
};

export const PRESETS = { tutorialYT, verticalSocial, feedCuadrado };
