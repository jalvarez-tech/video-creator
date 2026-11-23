#!/usr/bin/env node
/**
 * normalizar.mjs — repone `remotion/public/mas-098/` (lo que el 098 no toma ya hecho de `mas-097/`).
 *
 *   node proyectos/098/normalizar.mjs            (lee de proyectos/097/original/ y de archivos/musica/)
 *   node proyectos/098/normalizar.mjs --forzar   (rehace aunque ya exista la salida)
 *
 * PIEZA 098 · «Tú estás aquí» · MAS Estrellitas 2026 (Fundación MAS). Plan: proyectos/098/artefactos/.
 * Los vídeos (VT36, VT07, VT10, VT06a/b, HZ17, DR07) y sus WAV se leen de `remotion/public/mas-097/`, que repone la receta
 * del 097 (`proyectos/097/normalizar.mjs`). Aquí solo:
 *   · tres FOTOS del iPhone (HEIC, Display P3, con gain map y CON EL GPS DE LA CASA): FT30 (las manos), FT32 (el corazón) y
 *     FT43 (la niña que señala el cielo). Salen a JPG sRGB, recortadas a la franja 16:9 del mapa (`material/mapa-fotos.md`),
 *     a 2304×1296 y SIN EXIF (`herramientas/fotos.py`). La puerta comprueba que no lleven GPS.
 *   · la MÚSICA, «Tu Estás Aquí» (Samy Galí, piano), ENTERA a WAV 48 kHz estéreo sin normalizar: el tramo lo elige el plan.
 * El material es de la fundación y sale MENORES: no entra en git. En el repo quedan esta receta y los sha256 (8).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { RAIZ, ejecutar, flags, log, relativa } from "../../herramientas/comun.mjs";

const ORIGEN = path.join(RAIZ, "proyectos", "097", "original", "fotos");
const DESTINO = path.join(RAIZ, "remotion", "public", "mas-098");
const f = flags();

/** archivo · salida · sha256 (8) · y de la franja 16:9 (mapa de fotos) · sombras · por qué. */
const FOTOS = [
  ["IMG_5582.HEIC", "ft30", "f092536b", 0.22, 0.0, "FT30: las manos apiladas, sin una cara (franja 22-64 %)"],
  ["IMG_5584.HEIC", "ft32", "10c03c61", 0.45, 0.25, "FT32: el corazón con las manos bajo la palmera (franja 45-87 %: aire sobre las cabezas; contraluz: sombras arriba)"],
  ["IMG_5597.HEIC", "ft43", "e10d883c", 0.02, 0.2, "FT43: de espaldas, señala el cielo sobre las montañas (franja 2-44 %: la del mapa, 20-62, corta la mano que señala)"],
];
const MUSICA = [
  path.join(RAIZ, "archivos", "musica", "Samy Galí - (Piano + Letra) Tu Estás Aquí [Jesús Adrián Romero & Marcela Gándara].mp3"),
  "musica-tu-estas-aqui",
  "acf54a08",
];

const sha8 = (archivo) => crypto.createHash("sha256").update(fs.readFileSync(archivo)).digest("hex").slice(0, 8);

fs.mkdirSync(DESTINO, { recursive: true });
let malos = 0;
for (const [ruta, esperado] of [...FOTOS.map((x) => [path.join(ORIGEN, x[0]), x[2]]), [MUSICA[0], MUSICA[2]]]) {
  if (!fs.existsSync(ruta)) {
    log.error(`falta ${relativa(ruta)}`);
    malos++;
  } else if (sha8(ruta) !== esperado) {
    log.error(`${relativa(ruta)}: sha256 ${sha8(ruta)}, se esperaba ${esperado}`);
    malos++;
  }
}
if (malos) {
  log.error("el material no es el del plan: revísalo antes de normalizar");
  process.exit(1);
}

for (const [archivo, nombre, , y, sombras, por] of FOTOS) {
  const salida = path.join(DESTINO, `${nombre}.jpg`);
  if (fs.existsSync(salida) && !f.forzar) {
    log.info(`${nombre}.jpg ya está`);
    continue;
  }
  ejecutar(
    "uv",
    ["run", "--with", "pillow", "--with", "pillow-heif", "proyectos/098/herramientas/fotos.py", path.join(ORIGEN, archivo), salida, String(y), "--sombras", String(sombras)],
    { check: true, cwd: RAIZ }
  );
  log.ok(`${nombre}.jpg · ${por}`);
}

const wav = path.join(DESTINO, `${MUSICA[1]}.wav`);
if (!fs.existsSync(wav) || f.forzar) {
  ejecutar("ffmpeg", ["-nostdin", "-y", "-v", "error", "-i", MUSICA[0], "-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2", wav], { check: true });
  log.ok(`${MUSICA[1]}.wav (la pista entera, 48 kHz estéreo, sin normalizar)`);
} else log.info(`${MUSICA[1]}.wav ya está`);
log.ok(`listo: ${relativa(DESTINO)}`);
