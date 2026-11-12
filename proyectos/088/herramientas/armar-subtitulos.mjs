#!/usr/bin/env node
/**
 * armar-subtitulos.mjs NNN — escribe `remotion/src/proyectos/NNN/subtitulos-NNN.ts` desde los guiones marcados `proyectos/NNN/voz/<toma>.txt` (hook, mitad y CTA) y su transcripción por palabra
 * (`transcribir.mjs --palabras` → `voz/<toma>.json`), con los frames de `proyectos/NNN/medidas/reparto.json` (dónde entra cada toma) y `pieza.json` (desde de cada una y su primera palabra medida por energía).
 *
 *   node proyectos/088/herramientas/armar-subtitulos.mjs 089
 *
 * Es el punto de partida MEDIDO que pide `recorrido-luxur` (montaje §8): cada línea entra en el arranque de su palabra (anclada a la energía de la voz SOLA tras cada pausa, el resto, al DTW de whisper, que va de 1 a 3 f
 * pronto). Después se mira cada línea contra la voz sola (`onsets-voz.py`, `lineas-vs-onsets.py`) y se corrige a mano lo que haga falta en el `.ts`.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const N = process.argv[2];
const P = JSON.parse(fs.readFileSync(path.join(RAIZ, "proyectos", N, "pieza.json"), "utf8"));
const R = JSON.parse(fs.readFileSync(path.join(RAIZ, "proyectos", N, "medidas", "reparto.json"), "utf8"));
const en = (id) => (id === "c11-cta" ? R.cta.en : R.planos.find((p) => p.id === id).en);
const fuentes = [
  ["c02-hook", P.hook, "h"],
  ["c05-mitad", P.mitad, "m"],
  ["c11-cta", P.cta, "c"],
];
let bloques = "";
for (const [id, t, prefijo] of fuentes) {
  const desdeF = t.desdeF ?? Math.max(0, Math.round(t.voz.s0 * 30) - 12);
  const sal = execFileSync(
    "node",
    [
      "manuales/edicion-video/scripts/trozos-editoriales.mjs",
      `proyectos/${N}/voz/${t.clip}.txt`,
      `proyectos/${N}/voz/${t.clip}.json`,
      "--en", String(en(id)),
      "--desde", String(desdeF / 30),
      "--s0", String(t.voz.s0),
      "--audio", `remotion/public/recorrido-${N}/${t.clip}.wav`,
      "--prefijo", prefijo,
    ],
    { cwd: RAIZ, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
  );
  const cab = { "c02-hook": "Bloque 2 · el hook DICHO", "c05-mitad": "Bloque 4 · la mitad DICHA", "c11-cta": "Bloque 6 · el CTA DICHO (el cierre es el logo, no un bloque de texto)" }[id];
  bloques += `  // ── ${cab} (${t.clip.toUpperCase()}): entra a corte en el f${en(id)}, primera palabra en el f${(en(id) + (t.voz.s0 * 30 - desdeF)).toFixed(1)} ──\n${sal.replace(/\s+$/, "")}\n`;
}
const confirmar = (P.confirmar ?? []).map((c) => ` *   · ${c}`).join("\n");
const ts = `/**
 * UNA SOLA FUENTE (pedido del usuario, 2026-11-10): todo va en la Montserrat de base; NINGÚN trozo lleva \`estilo: "acento"\` (la Playfair itálica). La puerta (2f) falla si vuelve a aparecer uno.
 *
 * LOS SUBTÍTULOS EDITORIALES DEL RECORRIDO ${N} — \`BloqueEditorial[]\`. GENERADO por \`proyectos/088/herramientas/armar-subtitulos.mjs ${N}\` y corregido a mano.
 *
 * Todo lo que se dice, en trozos de una a cinco palabras (skill \`recorrido-luxur\`, \`subtitulos-editoriales.md\`). Frames ABSOLUTOS de la composición, a 30 fps. El texto sale del guion marcado
 * (\`proyectos/${N}/voz/*.txt\`: lo que se OYE) y los tiempos, de la voz: cada línea llevada al arranque de su palabra sobre la voz SOLA (R31). Cada línea entra 0-3 f ANTES de su palabra.
 *
 * NO HAY \`portada\` NI \`cuenta\` (reglas fijas del canal, \`SKILL.md\` §0). LA PRIMERA TOMA SALE SIN TEXTO NI VOZ (la casa de lejos): el primer subtítulo entra con la primera palabra del hook. El cierre lleva el LOGO,
 * que es una imagen (\`LogoCierre\` en \`Recorrido${N}.tsx\`) y no un bloque de texto.
 *
 * NO HAY CIFRAS EN PANTALLA de más de lo que dice Isabella (los 554 m², los 3.816 m² del lote y el precio van al caption y a la versión con ficha).
 *
 * POR CONFIRMAR AL OÍDO (R31; la puerta con \`--final\` falla SOLO por ellas):
${confirmar || " *   · (ninguna)"}
 */

import { segmentosDe } from "../../motor/subtitulos-editoriales";
import type { BloqueEditorial } from "../../motor/subtitulos-editoriales";
import { FPS_${N} } from "./metraje-${N}";

/** LA CURSIVA, 8 PX MÁS PEQUEÑA, como en las demás piezas del canal (el 017 lo pidió así): los px que se le restan a las líneas de acento. Aquí no hay acentos; la constante la exige la puerta y la composición. */
export const ACENTO_MENOS_${N} = 8;

export const subtitulos${N}: readonly BloqueEditorial[] = [
${bloques}];

/** El mismo plan en segundos, para \`exportar-srt.mjs\`: la pista de captions de la plataforma (R14). */
export const subtitulos${N}Srt = segmentosDe(subtitulos${N}, FPS_${N});
`;
fs.writeFileSync(path.join(RAIZ, "remotion", "src", "proyectos", N, `subtitulos-${N}.ts`), ts);
console.log(`remotion/src/proyectos/${N}/subtitulos-${N}.ts escrito`);
