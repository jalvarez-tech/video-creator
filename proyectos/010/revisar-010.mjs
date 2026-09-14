#!/usr/bin/env node
/**
 * PUERTA DEL 010 — mide lo que no se ve en ningún frame.
 *
 *   node proyectos/010/revisar-010.mjs
 *
 * Las comprobaciones del FORMATO (tiempo, metraje, tramos, encuadre) son las de
 * `remotion/src/motor/metraje/revisar-metraje.mjs`, que nació de esta puerta y
 * de la del 011. Aquí queda lo de este encargo:
 *
 *   4. los subtítulos no se solapan y caben dentro de la voz
 *   5. la duración del plan coincide con la voz (+ el margen del cierre)
 *
 * UNA EXCEPCIÓN DECLARADA, y la encontró la puerta genérica al subir al motor:
 * `c10-nina` disuelve desde el 0,05 s de `v-ninos`, y a su velocidad la
 * disolvencia pide 0,27 s de clip ANTES de ese punto, que no existen. El
 * intérprete recorta el arranque a 0, el plano entero sale 0,2 s más tarde en la
 * fuente y, al cortar a `c11-mano`, esos 0,2 s se ven dos veces (unos 9 frames
 * desde el f678). La puerta de antes no lo veía porque no contaba el prerrollo.
 * Está PUBLICADO así: arreglarlo mueve píxeles del 010.
 *
 * Sale con 1 si algo falla. No necesita Remotion: ejecuta los datos, no el JSX.
 */
import { abrePuerta } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const DUR_VOZ = 72.4595;
const MARGEN_CIERRE = 60; // frames de rótulo limpio más allá de la voz

const puerta = await abrePuerta({
  proyecto: "010",
  plan: "remotion/src/proyectos/010/metraje-010.ts",
  cortes: "metraje010",
  receta: "bash proyectos/010/normalizar.sh",
  extras: { subtitulos: "remotion/src/proyectos/010/subtitulos-010.ts" },
});
const { fps, fallos, mal, ok, seccion } = puerta;

/** Ver la cabecera. */
const C10_PUBLICADO = "PUBLICADO así; arreglarlo mueve píxeles del 010 (cabecera de revisar-010.mjs)";

seccion("1. línea de tiempo");
const cursor = puerta.lineaDeTiempo();

seccion("2. metraje disponible");
puerta.metrajeDisponible({ declarados: { "c10-nina": C10_PUBLICADO } });

seccion("3. tramos disjuntos");
puerta.tramosDisjuntos({ declarados: { "c10-nina": C10_PUBLICADO } });

/* 4 · subtítulos ───────────────────────────────────────────────────────────── */
seccion("4. subtítulos");
const n4 = fallos.length;
const cues = puerta.modulos.subtitulos.subtitulos010;
for (let i = 0; i < cues.length; i++) {
  if (cues[i].to <= cues[i].from) mal(`cue ${i}: to <= from`);
  if (i && cues[i].from < cues[i - 1].to - 0.001) mal(`cue ${i}: solapa con el anterior`);
}
const ultimo = cues.at(-1);
if (ultimo.to > DUR_VOZ + 0.01) mal(`el último subtítulo (${ultimo.to}) pasa del final de la voz`);
if (fallos.length === n4) ok(`${cues.length} cues en orden y dentro de la voz`);

/* 5 · duración total ───────────────────────────────────────────────────────── */
seccion("5. duración");
const esperado = Math.round(DUR_VOZ * fps) + MARGEN_CIERRE;
if (cursor !== esperado) mal(`el plan dura ${cursor} f y la voz + margen piden ${esperado} f`);
else ok(`${cursor} f = voz (${Math.round(DUR_VOZ * fps)} f) + cierre (${MARGEN_CIERRE} f)`);

/* 6 · encuadre, con el techo de §techo en metraje-010.ts ───────────────────── */
seccion("6. encuadre");
puerta.encuadre({ techoZoom: 1.2 });

puerta.cierra("el plan del 010 pasa las seis puertas");
