#!/usr/bin/env node
/**
 * reparto-tanda.mjs — escribe `proyectos/080/reparto-080-087.md`: el reparto de las ocho variantes B (080-087, V61-V68) de las piezas 071-078 de Suite Go Living, con lo que HAY que decirle al usuario
 * (las palabras por confirmar con su segundo, el metraje que comparten, las excepciones declaradas) y, si existen, las medidas de las pruebas de 540×960.
 *
 *   node proyectos/080/herramientas/reparto-tanda.mjs
 *
 * Los números salen de los planes reales (`metraje-NNN.ts`) y de `pieza.json`; las medidas, de ffprobe y ebur128 sobre `proyectos/NNN/pruebas-720p/`.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const FPS = 30;
const seg = (f) => (f / FPS).toFixed(1).replace(".", ",");
const lee = (rel) => fs.readFileSync(path.join(RAIZ, rel), "utf8");
const N = ["080", "081", "082", "083", "084", "085", "086", "087"];
const medida = (ruta) => {
  if (!fs.existsSync(ruta)) return null;
  const dur = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", ruta]).toString().trim());
  const e = execFileSync("sh", ["-c", `ffmpeg -nostdin -hide_banner -i "${ruta}" -af ebur128=peak=true -f null - 2>&1`], { encoding: "utf8" });
  const l = [...e.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1);
  const p = [...e.matchAll(/Peak:\s+(-?[\d.]+) dBFS/g)].at(-1);
  const mb = (fs.statSync(ruta).size / 1e6).toFixed(0);
  return { dur, lufs: l ? l[1] : "?", pico: p ? p[1] : "?", mb };
};
const filas = [];
const bloquesConfirmar = [];
for (const n of N) {
  const sp = JSON.parse(lee(`proyectos/${n}/pieza.json`));
  const m = await cargaTs({ m: `remotion/src/proyectos/${n}/metraje-${n}.ts` });
  const plan = m.m[`metraje${n}`];
  const DUR = m.m[`DURACION_${n}`];
  const cl = (c) => c.src.split("/").pop().replace(/\.(mp4|png)$/, "").toUpperCase();
  const ex = plan[0];
  const hk = plan.find((c) => c.bloque === 2);
  const rap = plan.filter((c) => c.bloque === 3);
  const mi = plan.find((c) => c.bloque === 4);
  const rec = plan.filter((c) => c.bloque === 5);
  const ct = plan.find((c) => c.bloque === 6 && c.audio);
  const norm = medida(path.join(RAIZ, `proyectos/${n}/pruebas-720p/${n}-recorrido.mp4`));
  const fi = medida(path.join(RAIZ, `proyectos/${n}/pruebas-720p/${n}-recorrido-ficha.mp4`));
  filas.push(
    `| **${n}** | ${sp.v} (${sp.origen}) | ${sp.cancion} | ${cl(hk)} · ${cl(mi)} · ${cl(ct)} · ${cl(ex)} | ${rap.map((c) => `${cl(c)} ${(c.dur / FPS).toFixed(1).replace(".", ",")} s`).join(" + ")} | ${seg(rap[0].en)} / ${seg(rap[1].en)} s | ${seg(mi.en)} s | ${rec.map(cl).join(" → ")} | ${seg(DUR)} s | ${norm ? `${norm.lufs} LUFS · ${norm.mb} MB` : "—"} | ${fi ? `${fi.mb} MB` : "—"} |`
  );
  const nota = lee(`proyectos/${n}/artefactos/01-plan.md`);
  const a = nota.indexOf("## Por confirmar al oído (R31)");
  const b = nota.indexOf("## Lo que NO se cuenta");
  bloquesConfirmar.push(`### ${n} (${sp.v}, ${sp.angulo.split("→")[0].trim()})\n\n${nota.slice(a + "## Por confirmar al oído (R31)".length, b).trim()}`);
}

const doc = `# Suite Go Living (El Poblado) — las variantes B 080-087 (V61-V68) con «lo vendible antes del segundo 10»

> 2026-11-10. Pedido: «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva … como proyectos nuevos 080 a 087». El andamio es el 079 (la 070 hecha así). **Cada pieza es la variante B de su original**: misma terna de voz, mismo exterior, misma canción con la misma entrada (por eso REPITE canción: declarado en \`combinaciones.md\` y en \`archivos/musica/registro-de-uso.md\`). Cambia el ORDEN y entra la ficha en su versión.

## 0. La estructura (igual en las ocho; \`recorrido-luxur\` §3)

1. Toma inicial, la de la pieza original, sin texto ni voz · 2. el hook de Isabella (el original) · 3. DOS planos rápidos, a corte, ≤ 2,5 s cada uno, que empiezan antes del segundo 10 · 4. la mitad de Isabella (la original), a corte antes de los 11 s · 5. UN solo recorrido inmersivo, sin voz, con la vista o el clímax como último y más largo · 6. el CTA de Isabella (en su mismo golpe) y la tarjeta oscura con el logo y la web.

Dos versiones por pieza, nunca mezcladas: \`RecorridoNNN\` (subtítulos en UNA sola fuente, sin ficha) y \`RecorridoNNNFicha\` (sin subtítulos, ficha abajo —y 1220—, entera en el recorte 1:1, desde el hook hasta el CTA).

## 1. El reparto

| Pieza | V (origen) | Canción | Terna · exterior | Dos planos rápidos | Entran en | Mitad en | Recorrido | Duración | Prueba normal | Prueba ficha |
|---|---|---|---|---|---|---|---|---|---|---|
${filas.join("\n")}

Todas las duraciones son las de su original (el CTA entra en el mismo golpe): lo que se movió es la mitad (de ≈ 15-19 s a ≈ 10-11 s) y el paseo, que ahora va seguido. Cada corte cae en un golpe MEDIDO de su canción (\`node proyectos/NNN/revisar-NNN.mjs\`, sección 4) y los niveles de la música se midieron de nuevo en las ventanas nuevas (\`proyectos/NNN/medidas/ventanas-musica.json\`).

## 2. Los planos exactos, comparados antes de renderizar

\`node proyectos/080/herramientas/comparar-piezas.mjs\` (079-087): **ninguna pieza abre con el mismo par de planos rápidos que otra** ni se solapa con sus tramos (la 079 usa RC05 0,50-2,60 s y RC04 0,60-2,07 s). La vista grande (RC07) no está en ningún plano rápido y cierra el recorrido de la 080, 081, 082, 084, 085 y 087; en la 083 y la 086 (las de zonas sociales y edificio) el clímax es la fachada (DR03 y DR05), como en sus originales. Se solapan entre piezas, y se declara en cada \`combinaciones.md\`, el tramo final de RC07 (≈ 3 s de la subida al ventanal, el único plano de la ciudad con esa amplitud) y algo del gimnasio, la tienda y RC11 entre la 085 y la 086.

## 3. Las palabras «POR CONFIRMAR AL OÍDO», con su segundo

Siguen sin oírse (no puedo oír el audio: es la confianza de whisper). La puerta con \`--final\` falla SOLO por ellas.

${bloquesConfirmar.join("\n\n")}

## 4. Excepciones declaradas

- **080**: el golpe de entrada de «Heaven on Earth» mide 10,2 dB (el mínimo del canal es 12; la 071 y la 056 entraron en el mismo): \`fuerzaMinEntrada: 10\`. El clip de HK08 acaba 6 f tras su última palabra: 6 f entre el hook y el primer plano rápido (\`minSubida\`).
- **081**: la salida del hook (f190) no cae en un golpe (como en la 072): la música sube sobre el corte (\`subidaPorEncima\`).
- **082**: la canción está floja en el pasaje de los dos planos rápidos (−21,7 LUFS): la música sola va a −19,4 LUFS ahí (el golpe de la mitad, de 21,5 dB, suena entero con esa ganancia y el pico llega a −1 dBFS) y a −15,8 en el recorrido (la ganancia no pasa de +6 dB ni el pico de −1 dBFS).
- **084**: el hook de la 075 dice «generar ingresos» (pregunta: «¿Y si tu próxima propiedad también pudiera generar ingresos?»): la puerta lo admite como en la 075 (\`permiteIngresos\`); no promete cifra ni valorización.
- **085**: música a −15,6 y −15,4 LUFS en los dos tramos sin voz (pico de la canción a −0,1 dBFS).
- **086**: HK05 hace de mitad (como en la 077): \`desde\` 2 f y bajada de la música en 9 f para que la frase quepa entre dos golpes.
- La tienda (ZS05) solo entra desde 4,3 s, donde ya no se lee la marca WEGO; ZS04 no se usa. Ninguna pieza usa MD05, CT05 ni MD07.
`;
fs.writeFileSync(path.join(RAIZ, "proyectos/080/reparto-080-087.md"), doc);
console.log("✅ proyectos/080/reparto-080-087.md");
