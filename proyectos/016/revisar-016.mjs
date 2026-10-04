#!/usr/bin/env node
/**
 * PUERTA DEL 016 — «República Dominicana 2027».
 *
 *   node proyectos/016/revisar-016.mjs
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de
 * tiempo, metraje, tramos, encuadre, todos los archivos). Encima, lo que pidió
 * el encargo con palabras y ningún frame enseña:
 *
 *   2. «con los videos de esta carpeta»: los diez salen en pantalla.
 *   3. «la musica de fondo Glenn Morrison - Contact»: es ESA canción, el tramo
 *      cabe en el archivo y cada corte cae a 1 frame o menos de un golpe.
 *   4. «de subtitulos y texto agrega al inicio»: el titular dice lo que pidió,
 *      está ENTERO en el frame 0 (la miniatura) y pasa su validador. Tras la
 *      primera prueba pidió «deja solo República Dominicana 2027 centrado»:
 *      una sola línea y en `posicion: "centro"`.
 *
 * Sale con 1 si algo falla.
 */
import { join } from "node:path";
import { abrePuerta, duracionDe, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const TECHO_ZOOM = 1.2; // clips normalizados a 1296 px = 1080 × 1,2
const TOLERANCIA_GOLPE = 1; // f
const TITULAR = ["República Dominicana 2027"];

const puerta = await abrePuerta({
  proyecto: "016",
  plan: "remotion/src/proyectos/016/metraje-016.ts",
  cortes: "metraje016",
  receta: "node proyectos/016/normalizar.mjs",
  extras: {
    audio: "remotion/src/proyectos/016/audio-016.ts",
    subtitulos: "remotion/src/proyectos/016/subtitulos-016.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
    editorial: "remotion/src/motor/subtitulos-editoriales.ts",
    marca: "remotion/src/marcas/luxur.ts",
  },
}).catch((e) => {
  console.log(`\n❌ el plan del 016 no carga: ${e.message}\n`);
  process.exit(1);
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const T = puerta.modulos.tramos;
const E = puerta.modulos.editorial;
const audio = puerta.modulos.audio.audio016;
const bloques = puerta.modulos.subtitulos.subtitulos016;
const DURACION = M.DURACION_016;

seccion("1. línea de tiempo");
puerta.lineaDeTiempo({ duracion: DURACION });

seccion("2. los diez clips de la carpeta");
puerta.todosLosArchivos({ carpeta: "rd-016", origen: join(RAIZ, "proyectos", "016", "original"), extensiones: /\.mp4$/i });

seccion("3. la música y los golpes");
{
  const n = fallos.length;
  for (const a of T.revisaAudio(audio, { fps, duracion: DURACION })) mal(`revisaAudio: ${a}`);
  const musica = audio.find((t) => t.id === "musica");
  if (!musica || musica.src !== "rd-016/musica-016.wav") mal("no suena la canción del encargo (rd-016/musica-016.wav)");
  else {
    const hasta = (Math.round(musica.desde * fps) + musica.dur) / fps;
    const dura = duracionDe(musica.src);
    if (hasta > dura) mal(`la música se lee hasta ${hasta.toFixed(2)} s y el archivo dura ${dura.toFixed(2)} s`);
    // Cada corte, contra la rejilla MEDIDA en la canción y tal como SUENA en el
    // render (con su retardo), no contra `golpe()`, que es la misma cuenta y
    // daría siempre verde.
    const inicio = Math.round(musica.desde * fps) / fps - M.RETARDO_AUDIO;
    const lejos = [];
    for (const c of cortes) {
      const t = inicio + c.en / fps;
      const k = Math.round((t - M.DROP) / M.PERIODO);
      const d = (t - (M.DROP + k * M.PERIODO)) * fps;
      if (Math.abs(d) > TOLERANCIA_GOLPE) lejos.push(`${c.id} a ${d.toFixed(1)} f`);
    }
    if (lejos.length) mal(`cortes fuera del golpe: ${lejos.join(" · ")}`);
    const drop = cortes.find((c) => c.id === "c04-buggy");
    const tDrop = inicio + drop.en / fps;
    if (Math.abs(tDrop - M.DROP) * fps > TOLERANCIA_GOLPE) mal(`el plano del drop entra a ${((tDrop - M.DROP) * fps).toFixed(1)} f del drop`);
  }
  if (fallos.length === n) {
    const g = 20 * Math.log10(musica.ganancia);
    ok(`«Contact» desde el ${musica.desde.toFixed(3)} s · ${cortes.length} cortes a ≤${TOLERANCIA_GOLPE} f de un golpe · el buggy en el drop · ganancia ${g.toFixed(1)} dB`);
  }
}

seccion("4. el titular");
{
  const n = fallos.length;
  for (const a of E.revisaSubtitulosEditoriales(bloques, { fps, ancho: 1080, alto: 1920, duracion: DURACION, letra: E.letraSubtitulosDe(puerta.modulos.marca.LUXUR) })) mal(`revisaSubtitulosEditoriales: ${a}`);
  const b = bloques[0];
  const textos = b ? b.trozos.map((t) => t.texto) : [];
  if (JSON.stringify(textos) !== JSON.stringify(TITULAR)) mal(`el titular dice ${JSON.stringify(textos)} y el encargo, ${JSON.stringify(TITULAR)}`);
  if (!b || b.entrada !== 0 || !b.trozos.every((t) => t.desde === 0)) mal("el titular no está ENTERO en el frame 0: la miniatura sale sin él (R23)");
  if (b && b.posicion !== "centro") mal(`el titular va en «${b.posicion ?? "abajo"}» y se pidió centrado`);
  if (b && b.hasta > cortes[1].en) mal(`el titular sigue en pantalla (f${b.hasta}) después del corte al segundo plano (f${cortes[1].en})`);
  if (fallos.length === n) ok(`«${TITULAR.join(" · ")}» entero en el frame 0 hasta el f${b.hasta} · validador sin avisos`);
}

seccion("5. metraje disponible");
puerta.metrajeDisponible();
seccion("6. tramos disjuntos");
puerta.tramosDisjuntos();
seccion("7. encuadre");
puerta.encuadre({ techoZoom: TECHO_ZOOM });

puerta.cierra(`el 016 pasa la puerta: ${cortes.length} planos, ${(DURACION / fps).toFixed(2)} s`);
