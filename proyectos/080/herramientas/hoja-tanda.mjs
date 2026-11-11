#!/usr/bin/env node
/**
 * hoja-tanda.mjs — una hoja de contactos con las pruebas de 540×960 de las piezas 080-087: una fila por pieza (la versión normal en 9 momentos clave y la de ficha en 3), sacada de los MP4 de
 * `proyectos/NNN/pruebas-720p/`. Deja `proyectos/080/pruebas-720p/hoja-tanda.jpg`. Los momentos salen del plan real: hook, los dos planos rápidos, la mitad, el recorrido (inicio, medio y vista), el CTA y la tarjeta.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const tmp = fs.mkdtempSync(path.join(process.env.TMPDIR ?? "/tmp", "hoja-tanda-"));
const filas = [];
for (const n of ["080", "081", "082", "083", "084", "085", "086", "087"]) {
  const m = await cargaTs({ m: `remotion/src/proyectos/${n}/metraje-${n}.ts` });
  const p = m.m[`metraje${n}`];
  const hook = p.find((c) => c.bloque === 2), rap = p.filter((c) => c.bloque === 3), mit = p.find((c) => c.bloque === 4), rec = p.filter((c) => c.bloque === 5), cta = p.find((c) => c.bloque === 6 && c.audio), tj = p.at(-1);
  const normal = [1, hook.en + 20, rap[0].en + 12, rap[1].en + 12, mit.en + 45, rec[0].en + 12, rec[Math.floor(rec.length / 2)].en + 12, rec.at(-1).en + 30, cta.en + 45];
  const ficha = [hook.en + 20, mit.en + 45, cta.en + 45];
  const saca = (ruta, frames, pref) => frames.map((f, i) => {
    const out = path.join(tmp, `${n}-${pref}-${i}.png`);
    execFileSync("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", ruta, "-vf", `select=eq(n\\,${f}),scale=120:213`, "-frames:v", "1", out]);
    return out;
  });
  const a = saca(path.join(RAIZ, `proyectos/${n}/pruebas-720p/${n}-recorrido.mp4`), normal, "n");
  const b = saca(path.join(RAIZ, `proyectos/${n}/pruebas-720p/${n}-recorrido-ficha.mp4`), ficha, "f");
  const fila = path.join(tmp, `${n}.png`);
  const args = [...a, ...b].flatMap((x) => ["-i", x]);
  execFileSync("ffmpeg", ["-nostdin", "-y", "-v", "error", ...args, "-filter_complex", `hstack=inputs=${a.length + b.length}`, fila]);
  filas.push(fila);
}
const salida = path.join(RAIZ, "proyectos/080/pruebas-720p/hoja-tanda.jpg");
fs.mkdirSync(path.dirname(salida), { recursive: true });
execFileSync("ffmpeg", ["-nostdin", "-y", "-v", "error", ...filas.flatMap((x) => ["-i", x]), "-filter_complex", `vstack=inputs=${filas.length}`, "-q:v", "3", salida]);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`✅ ${salida}`);
