// Importa SOLO los datos (`coreografia`), no el barril: un plan es una lista de
// decisiones y no debe arrastrar ni un componente. Así se puede validar con
// Node sin montar React (ver `revisaPlan` más abajo).
import { MG } from "../motion";
import { gfx, GraficoCue } from "../graficos/coreografia";

/**
 * PLAN DE GRÁFICOS de ejemplo — la plantilla a copiar para un proyecto real
 * (en el 004 se llamaría `graficos-004.ts`, junto a `camara-004.ts` y `cues-004.ts`).
 *
 * Formato de referencia: 9:16 · 25 fps · 300 f (12 s).
 * Se monta con: <PistaGraficos cues={graficosDemo} />
 *
 * CÓMO SE ESCRIBE UN PLAN (el orden importa):
 *   1. Marca los frames desde la TRANSCRIPCIÓN real del clip, no desde el guion
 *      (proyectos/00X/transcripcion.json). El gráfico entra cuando la voz llega
 *      a la idea, ni antes ni después.
 *   2. Escribe el `reason` ANTES que el resto del cue. Si no sale una frase
 *      honesta, ese gráfico no va: no lo pongas y sigue con el siguiente.
 *   3. Marca la jerarquía. Solo UN `hero` a la vez — `revisaPlan()` lo comprueba.
 *   4. Enlaza el sonido por id (`soundCueId`) con el cue equivalente de
 *      `cues-00X.ts`; el diseño sonoro sigue viviendo en su propio archivo.
 *
 * Comprueba el plan antes de renderizar:
 *   console.log(revisaPlan(graficosDemo, 25))   // [] = limpio
 */
export const graficosDemo: GraficoCue[] = [
  gfx(
    "g-hook",
    "titular",
    [8, 70],
    { texto: "Tu embudo no vende", texto2: "el problema", zona: "superior", entrada: "muelle", soundCueId: "sfx-hook" },
    "hero",
    "Fija la promesa en pantalla mientras la voz la enuncia: el espectador la lee y la oye a la vez"
  ),
  gfx(
    "g-ambiente",
    "particulas",
    [8, 300],
    { modo: "ambiente", valor: 26, zona: "pantalla", color: "#22d3ee" },
    "ambiente",
    "Capa de atmósfera continua para que el fondo plano no se lea como imagen congelada"
  ),
  gfx(
    "g-dato",
    "contador",
    [78, 150],
    { de: 0, valor: 87, sufijo: "%", texto: "de leads sin respuesta", zona: "superior", color: MG.amber, soundCueId: "sfx-data" },
    "hero",
    "La magnitud ES el argumento: verla subir de 0 comunica el tamaño del problema mejor que decirlo"
  ),
  gfx(
    "g-subraya",
    "subrayado",
    [120, 150],
    // dy = 310 → cuelga el trazo por debajo del bloque cifra+etiqueta: dos cues
    // en la misma zona comparten banda, y `dy` es lo que los ordena.
    { ancho: 520, zona: "superior", color: MG.amber, dur: 16, dy: 310 },
    "apoyo",
    "Remata la cifra con un gesto de mano para que el ojo cierre ahí antes del corte"
  ),
  gfx(
    "g-lista",
    "lista",
    [155, 235],
    {
      lineas: ["Contestas en 5 min", "Sin turnos ni excusas", "Cero leads perdidos"],
      zona: "centro",
      color: "#34d399",
      soundCueId: "sfx-pop",
    },
    "hero",
    "Los tres puntos de la solución, escalonados al ritmo en que la voz los enumera"
  ),
  gfx(
    "g-sello",
    "sello",
    [240, 285],
    { texto: "Escríbeme «EMBUDO»", texto2: "siguiente paso", zona: "inferior", soundCueId: "sfx-cta" },
    "hero",
    "CTA en la banda de subtítulos, con scrim, en los últimos segundos: es la única acción que se pide"
  ),
  gfx(
    "g-confeti",
    "particulas",
    [240, 300],
    { modo: "estallido", valor: 50, zona: "pantalla" },
    "apoyo",
    "Refuerza el CTA con un golpe de celebración; dura lo justo para no tapar el texto"
  ),
];
