#!/usr/bin/env node
/**
 * PUERTA DEL 069 — «Unidos por Botswana», vídeo de ayuda para reconstruir el salón de eventos donde se casaron John e Isabella.
 *
 *   node proyectos/069/revisar-069.mjs            (lo pendiente —las voces en off, los datos de aportes— sale como aviso)
 *   node proyectos/069/revisar-069.mjs --final    (lo pendiente FALLA: no se exporta una final con los huecos sin llenar)
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de tiempo, metraje, tramos, encuadre). Encima, lo que el encargo promete y ningún frame enseña:
 *
 *   2. la ESTRUCTURA: las seis escenas en orden; las de voz en off (1, 3 y 5) con el tiempo del guion; la foto del beso en el frame 0, el corte al incendio SECO, la escena 1 a negro.
 *   2a. los dos MOV RECORTADOS A SU VOZ: el plano arranca 0,05-0,15 s antes de la primera sílaba y acaba 0,05-0,25 s después de la última; dentro del metraje del clip; su voz casa con su plano.
 *   2b. el punch-in: el incendio (464×832) ≤ 1,04, el MOV 1 (1620 px) ≤ 1,5 y todo lo demás ≤ 1,12.
 *   3. la VOZ de los MOV: su WAV tratado a −15 LUFS en su frase, pico ≤ −1,5 dBFS, silencio fuera de ella; y que el inicio y el final medidos coinciden con los del plan.
 *   4. LA MÚSICA: la pista es la del registro (sha256), los CORTES de imagen caen en GOLPES medidos de la canción (a ≤ 2 f; el corte al incendio en uno de ≥ 9 dB; el frame 0 en el golpe de 10 dB),
 *      la canción CAE ≥ 8 dB donde entra el incendio y SUBE ≥ 8 dB hasta la meseta, y la mezcla: meseta a −15 LUFS, ≤ −24,5 LUFS bajo cada voz, apagada al final y el pico real ≤ −1 dBFS.
 *   4b. el AUDIO entero (`revisaAudio`) y que NADA más suene (los MP4 van mudos).
 *   5. los HUECOS DE LA VOZ EN OFF: ordenados, dentro de su escena, sin pisarse; con la locución entregada, que CABE; sin ella, avisa.
 *   6. la TARJETA FINAL: todo entra y se queda ≥ 3 s con el cuadro completo; los datos de APORTES llenos y dentro del marco (avisa mientras estén vacíos).
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): lo que mide es lo que se renderiza. Sale con 1 si algo falla.
 */
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ejecutar } from "../../herramientas/comun.mjs";
import { abrePuerta, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const FINAL = process.argv.includes("--final");
const FPS = 30;
const seg = (s) => Math.round(s * FPS);

/** La duración que el guion de ellos le da a cada escena CON voz en off: el montaje no puede dejarlas más cortas (la frase no cabría). */
const MIN_ESCENA = { 1: seg(8), 3: seg(19), 5: seg(12) };
const TECHO_ZOOM = 1.5; // el archivo de mov1 está a 1620 px = 1080 × 1,5
const TECHO_ZOOM_INCENDIO = 1.04; // 464×832 ampliados ×2,8: más zoom es más borroso
const TECHO_ZOOM_MOV1 = 1.5;
const TECHO_ZOOM_RESTO = 1.12; // los demás archivos están a 1296 px = 1080 × 1,2
const SEGUNDOS_CON_TODO = 3; // la tarjeta se queda al menos esto con todo en pantalla

/** La ventana de voz de cada MOV tratado (segundos de la fuente): la misma que `normalizar.mjs`. */
const VOZ = {
  // `crudo` es el WAV sin tratar: el inicio y el final de la voz se miden ahí (el tratado lleva +30 dB y sube el ruido de sala por encima del umbral). `margen`: la ventana de esa medida.
  "voz-mov1": { id: "c13-juntos-caminan", archivo: "botswana-069/mov1-voz.wav", crudo: "botswana-069/mov1.wav", desde: 11.55, hasta: 20.75, margen: [11.2, 21.5] },
  "voz-mov2": { id: "c25-juntos-unirnos", archivo: "botswana-069/mov2-voz.wav", crudo: "botswana-069/mov2.wav", desde: 5.95, hasta: 14.65, margen: [5.4, 15.2] },
};
const LUFS_OBJETIVO = -15;
const TOLERANCIA_LUFS = 0.6;
const PICO_MAX = -1.5;
/** Cuánto antes de la primera sílaba arranca el plano y cuánto después de la última acaba (segundos). */
const AIRE_ANTES = [0.05, 0.15];
const AIRE_DESPUES = [0.05, 0.25];

/** El sha256 (8) de la canción, el del registro de uso (`archivos/musica/registro-de-uso.md`). */
const SHA_CANCION = "c5aea0ad";
const MUSICA_MP3 = "proyectos/069/original/musica/we-are.mp3";
const GOLPES_JSON = "proyectos/069/musica/golpes-musica-we-are.json";
const TOLERANCIA_GOLPE_F = 2; // frames entre el `en` de un plano y el golpe de la canción que lo sostiene (la tolerancia de la casa: «cada corte a ≤ 2 f de un golpe»)
const FUERZA_MIN_CORTE = 4; // dB: la menor subida de nivel (en 15 ms) que cuenta como golpe en esta pieza. Solo las cuatro últimas fotos felices (la cola de la sección fuerte, que ya cae) bajan de 5
const FUERZA_CORTE_AL_INCENDIO = 9; // dB: el corte seco al incendio cae en un golpe contundente
const FUERZA_FRAME_0 = 9; // dB: el golpe de entrada de la canción, en el frame 0-3
const CAIDA_MIN_DB = 8; // lo que cae la canción donde entra el incendio
const SUBIDA_MIN_DB = 8; // lo que sube hasta la meseta
const LUFS_MESETA_PEDIDO = -15;
const LUFS_BAJO_VOZ_MAX = -24.5;
const PICO_MAX_MUSICA = -1;

const puerta = await abrePuerta({
  proyecto: "069",
  plan: "remotion/src/proyectos/069/metraje-069.ts",
  cortes: "metraje069",
  fps: FPS,
  receta: "node proyectos/069/normalizar.mjs",
  extras: {
    voz: "remotion/src/proyectos/069/voz-069.ts",
    voces: "remotion/src/proyectos/069/voces-069.ts",
    audio: "remotion/src/proyectos/069/audio-069.ts",
    musica: "remotion/src/proyectos/069/musica-069.ts",
    cierre: "remotion/src/proyectos/069/cierre-069.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
  },
});
const { ok, mal, seccion, cortes, modulos } = puerta;
const { plan, voz, voces, audio, musica, cierre, tramos } = modulos;
const ids = new Map(cortes.map((c) => [c.id, c]));
const pendientes = [];
/** Algo pendiente: aviso, y con `--final` es un fallo. */
const pendiente = (m) => {
  pendientes.push(m);
  if (FINAL) mal(`${m} (pendiente: con --final falla)`);
  else console.log(`  ⚠️  ${m}`);
};

/** Sonoridad integrada y pico real de una ventana de un archivo, medidos con ebur128. */
function mide(archivo, desde, hasta) {
  const r = ejecutar("ffmpeg", ["-nostdin", "-v", "info", "-ss", String(desde), "-to", String(hasta), "-i", join(PUBLICO, archivo), "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const cola = r.stderr.split("\n").slice(-16).join("\n");
  const i = /\n\s+I:\s+(-?[\d.]+) LUFS/.exec(cola);
  const p = /\n\s+Peak:\s+(-?[\d.]+) dBFS/.exec(cola);
  return { lufs: i ? Number(i[1]) : NaN, pico: p ? Number(p[1]) : NaN };
}

/** Lo más alto que suena en una ventana (volumedetect), para comprobar el silencio fuera de la frase. */
function maximo(archivo, desde, hasta) {
  const r = ejecutar("ffmpeg", ["-nostdin", "-v", "info", "-ss", String(desde), "-to", String(hasta), "-i", join(PUBLICO, archivo), "-vn", "-af", "volumedetect", "-f", "null", "-"]);
  const m = /max_volume:\s+(-?[\d.]+) dB/.exec(r.stderr);
  return m ? Number(m[1]) : NaN;
}

/**
 * Primer y último instante con voz de un archivo SIN TRATAR, dentro de una ventana. Energía de 20 ms entre 150 y 4000 Hz: la voz es lo que pasa de −45 dBFS y se EXTIENDE hacia cada lado mientras haya
 * algo por encima de −55 dBFS en los 100 ms siguientes (la cola de la última palabra queda a −50/−53 y con la ganancia de +31 dB se oye; el suelo de estos MOV es −64 y sus ruidos sueltos no pasan de −57).
 */
function limitesDeVoz(archivoAbs, desde, hasta) {
  // spawnSync a pelo: `ejecutar` devuelve texto y esto es PCM binario.
  const r = spawnSync("ffmpeg", ["-nostdin", "-v", "error", "-ss", String(desde), "-to", String(hasta), "-i", archivoAbs, "-vn", "-af", "highpass=f=150,lowpass=f=4000", "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], { maxBuffer: 1 << 28 });
  const pcm = new Int16Array(r.stdout.buffer, r.stdout.byteOffset, Math.floor(r.stdout.length / 2));
  const e = [];
  for (let i = 0; i + 320 <= pcm.length; i += 320) {
    let s = 0;
    for (let j = i; j < i + 320; j++) s += (pcm[j] / 32768) ** 2;
    e.push(10 * Math.log10(s / 320 + 1e-12));
  }
  const fuertes = e.map((x, i) => (x > -45 ? i : -1)).filter((i) => i >= 0);
  if (!fuertes.length) return { primero: null, ultimo: null };
  const GAP = 5; // 100 ms
  const extiende = (i, paso) => {
    let hueco = 0;
    let borde = i;
    for (let k = i + paso; k >= 0 && k < e.length && hueco <= GAP; k += paso) {
      if (e[k] > -55) {
        borde = k;
        hueco = 0;
      } else hueco++;
    }
    return borde;
  };
  const i0 = extiende(fuertes[0], -1);
  const i1 = extiende(fuertes[fuertes.length - 1], 1);
  return { primero: desde + i0 * 0.02, ultimo: desde + (i1 + 1) * 0.02 };
}

/* ── 1 · el formato ───────────────────────────────────────────────────────────────────────────────────────────────── */
seccion("1. línea de tiempo");
puerta.lineaDeTiempo({ duracion: plan.DURACION_069 });
seccion("1a. metraje (cada archivo existe y cada vídeo tiene el clip que el plano consume)");
puerta.metrajeDisponible();
seccion("1b. tramos de fuente (dos planos del mismo clip no se repiten)");
puerta.tramosDisjuntos();
seccion("1c. encuadre (ninguna franja negra con el zoom y el pan del plano)");
puerta.encuadre({ techoZoom: TECHO_ZOOM });

/* ── 2 · la estructura ────────────────────────────────────────────────────────────────────────────────────────────── */
seccion("2. la estructura (las seis escenas, el frame 0, el corte al incendio)");
{
  const n = puerta.fallos.length;
  let anterior = -1;
  for (const e of [1, 2, 3, 4, 5, 6]) {
    const inicio = plan.INICIO_ESCENA[e];
    if (inicio === undefined) mal(`falta la escena ${e}`);
    else if (inicio <= anterior) mal(`la escena ${e} empieza antes que la anterior`);
    anterior = inicio ?? anterior;
  }
  const dur = (e) => (e === 6 ? plan.DURACION_069 : plan.INICIO_ESCENA[e + 1]) - plan.INICIO_ESCENA[e];
  for (const [e, min] of Object.entries(MIN_ESCENA)) {
    if (dur(Number(e)) < min) mal(`la escena ${e} dura ${dur(Number(e))} f (${(dur(Number(e)) / FPS).toFixed(1)} s) y el guion le da ${(min / FPS).toFixed(1)}: la voz en off no cabría`);
  }
  const tarjeta = cortes.find((c) => c.escena === 6);
  if (!tarjeta || tarjeta.dur !== cierre.DUR_TARJETA) mal(`la tarjeta final dura ${tarjeta?.dur} f y DUR_TARJETA es ${cierre.DUR_TARJETA}`);
  if (tarjeta && tarjeta.en + tarjeta.dur !== plan.DURACION_069) mal("la tarjeta no es lo último de la pieza");
  const primero = cortes[0];
  if (primero.en !== 0 || primero.entra !== "corte" || primero.tipo !== "foto") mal("el frame 0 tiene que ser la foto del beso, a corte (es la miniatura): ni negro ni vídeo");
  const incendio = ids.get("c10-incendio-palapa");
  if (!incendio || incendio.entra !== "corte") mal(`el corte al incendio tiene que ser SECO; es «${incendio?.entra}»`);
  const ultimaFeliz = ids.get("c09-baile");
  if (!ultimaFeliz || ultimaFeliz.en + ultimaFeliz.dur !== incendio?.en) mal("el incendio tiene que entrar justo después de la última foto feliz");
  const e1 = cortes.filter((c) => c.escena === 1).at(-1);
  if (e1?.salidaNegro === undefined) mal("la escena 1 no acaba a negro: respira antes de ellos dos");
  if (ids.get("c13-juntos-caminan")?.entra !== "corte") mal("el MOV 1 entra a CORTE en un golpe (tras el negro del incendio)");
  const fotosFelices = cortes.filter((c) => c.escena === 1 && c.tipo === "foto").length;
  if (fotosFelices < 8) mal(`solo ${fotosFelices} fotos felices antes del incendio (el guion pide «fotografías rápidas»: ≥ 8)`);
  if (puerta.fallos.length === n) ok(`seis escenas en orden · escenas de voz en off de ${(dur(1) / FPS).toFixed(1)} · ${(dur(3) / FPS).toFixed(1)} · ${(dur(5) / FPS).toFixed(1)} s (guion: 8 · 19 · 12) · ${fotosFelices} fotos felices · incendio seco`);
}

seccion("2a. los dos MOV recortados a su voz (de la primera sílaba a la última)");
{
  const n = puerta.fallos.length;
  for (const [vozId, v] of Object.entries(VOZ)) {
    const c = ids.get(v.id);
    const datos = plan.VOZ_EN_MOV[v.id];
    if (!c || !datos) {
      mal(`${vozId}: falta ${v.id} en el plan o en VOZ_EN_MOV`);
      continue;
    }
    // 1. que el plan diga lo mismo que el WAV: el primer y el último instante con voz, medidos aquí otra vez.
    const abs = join(PUBLICO, v.crudo);
    if (!existsSync(abs)) {
      mal(`${vozId}: no existe remotion/public/${v.crudo}`);
      continue;
    }
    const m = limitesDeVoz(abs, v.margen[0], v.margen[1]);
    if (m.primero === null) {
      mal(`${vozId}: no encuentro voz en su ventana`);
      continue;
    }
    if (Math.abs(m.primero - datos.s0) > 0.05) mal(`${v.id}: la primera sílaba suena a los ${m.primero.toFixed(2)} s y el plan dice ${datos.s0} s`);
    if (Math.abs(m.ultimo - datos.s1) > 0.08) mal(`${v.id}: la última sílaba acaba a los ${m.ultimo.toFixed(2)} s y el plan dice ${datos.s1} s`);
    // 2. que el plano empiece justo antes de la primera y acabe justo después de la última.
    const antes = datos.s0 - c.desde;
    const finFuente = c.desde + c.dur / FPS;
    const despues = finFuente - datos.s1;
    if (antes < AIRE_ANTES[0] - 1e-9 || antes > AIRE_ANTES[1] + 1e-9) mal(`${v.id}: arranca ${antes.toFixed(2)} s antes de la primera sílaba (tiene que ser ${AIRE_ANTES[0]}-${AIRE_ANTES[1]} s)`);
    if (despues < AIRE_DESPUES[0] - 1e-9 || despues > AIRE_DESPUES[1] + 1e-9) mal(`${v.id}: acaba ${despues.toFixed(2)} s después de la última sílaba (tiene que ser ${AIRE_DESPUES[0]}-${AIRE_DESPUES[1]} s)`);
    if (c.velocidad !== undefined && c.velocidad !== 1) mal(`${v.id}: velocidad ${c.velocidad}: la voz del MOV va a 1 o se desfasa`);
    // 3. el tramo de voz casa con el plano.
    const t = audio.audio069.find((x) => x.id === vozId);
    if (!t) mal(`${vozId}: no está en audio-069.ts`);
    else if (t.en !== c.en || t.dur !== c.dur || t.desde !== c.desde) mal(`${vozId}: su tramo (en ${t.en} · dur ${t.dur} · desde ${t.desde}) no coincide con el plano (en ${c.en} · dur ${c.dur} · desde ${c.desde}): la voz no cae en su boca`);
    console.log(`     ${v.id}: ${c.dur} f (${(c.dur / FPS).toFixed(2)} s) · voz de ${datos.s0} a ${datos.s1} s · aire antes ${antes.toFixed(2)} s, después ${despues.toFixed(2)} s`);
  }
  if (puerta.fallos.length === n) ok("los dos planos empiezan en la primera sílaba (con 3 f de aire) y acaban en la última (0,10-0,23 s después), y su voz casa con ellos");
}

seccion("2b. punch-in (incendio ≤ 1,04 · MOV 1 ≤ 1,5 · todo lo demás ≤ 1,12)");
{
  const n = puerta.fallos.length;
  for (const c of cortes) {
    const techo = c.src.includes("/inc0") ? TECHO_ZOOM_INCENDIO : c.id === "c13-juntos-caminan" ? TECHO_ZOOM_MOV1 : TECHO_ZOOM_RESTO;
    for (const z of c.zoom) if (z > techo + 1e-9) mal(`${c.id}: zoom ${z} pasa de ${techo}`);
    if (c.velocidad !== undefined && c.velocidad !== 1) mal(`${c.id}: velocidad ${c.velocidad}; esta pieza no cambia la velocidad de nada`);
  }
  if (puerta.fallos.length === n) ok("el incendio con ≤ 1,04, el MOV 1 (a 1620 px) con ≤ 1,5 y todo lo demás con ≤ 1,12");
}

/* ── 3 · la voz de los MOV ────────────────────────────────────────────────────────────────────────────────────────── */
seccion("3. la voz de los MOV (tratada a −15 LUFS, silencio fuera de la frase)");
{
  const n = puerta.fallos.length;
  for (const [id, v] of Object.entries(VOZ)) {
    if (!existsSync(join(PUBLICO, v.archivo))) {
      mal(`${id}: no existe remotion/public/${v.archivo} (node proyectos/069/normalizar.mjs)`);
      continue;
    }
    const m = mide(v.archivo, v.desde, v.hasta);
    if (!Number.isFinite(m.lufs) || Math.abs(m.lufs - LUFS_OBJETIVO) > TOLERANCIA_LUFS) mal(`${id}: ${m.lufs} LUFS en su frase; tiene que estar en ${LUFS_OBJETIVO} ± ${TOLERANCIA_LUFS}`);
    if (!Number.isFinite(m.pico) || m.pico > PICO_MAX) mal(`${id}: pico real ${m.pico} dBFS; el tope es ${PICO_MAX}`);
    const antes = maximo(v.archivo, 0, Math.max(0.1, v.desde - 0.15));
    if (!(antes < -60)) mal(`${id}: antes de la frase suena a ${antes} dB (tiene que ser silencio, < −60): la ganancia de +30 dB subiría los ruidos de la toma`);
    const despues = maximo(v.archivo, v.hasta + 0.15, v.hasta + 6);
    if (!(despues < -60)) mal(`${id}: después de la frase suena a ${despues} dB (tiene que ser silencio, < −60)`);
    if (puerta.fallos.length === n) console.log(`     ${id}: ${m.lufs} LUFS · pico ${m.pico} dBFS · silencio fuera de ${v.desde}-${v.hasta} s`);
  }
  if (puerta.fallos.length === n) ok("las dos voces a −15 LUFS, pico ≤ −1,5 dBFS y mudas fuera de su frase");
}

/* ── 4 · la música ────────────────────────────────────────────────────────────────────────────────────────────────── */
seccion("4. la canción (la del registro; los cortes caen en sus golpes; la forma de la pista es la de la pieza)");
{
  const n = puerta.fallos.length;
  const mp3 = join(RAIZ, MUSICA_MP3);
  if (!existsSync(mp3)) mal(`falta ${MUSICA_MP3}: cópiala de archivos/musica/ («Aleksey Chistilin - We Are.mp3»)`);
  else {
    const sha = crypto.createHash("sha256").update(readFileSync(mp3)).digest("hex").slice(0, 8);
    if (sha !== SHA_CANCION) mal(`${MUSICA_MP3}: sha256 ${sha}; el registro de uso dice ${SHA_CANCION}`);
  }
  const wav = join(PUBLICO, audio.CANCION.src);
  if (!existsSync(wav)) mal(`falta remotion/public/${audio.CANCION.src} (la canción decodificada: ffmpeg -i we-are.mp3 -c:a pcm_s16le -ar 48000 -ac 2)`);
  if (!audio.HAY_MUSICA) mal("HAY_MUSICA es false: la pieza saldría sin música");
  const golpesPath = join(RAIZ, GOLPES_JSON);
  if (!existsSync(golpesPath)) {
    mal(`falta ${GOLPES_JSON} (node proyectos/069/herramientas/golpes.mjs remotion/public/botswana-069/musica-we-are.wav)`);
  } else {
    const { golpes } = JSON.parse(readFileSync(golpesPath, "utf8"));
    const dondeSuena = (f) => plan.INICIO_MUSICA + f / FPS;
    /** El golpe ≥ `min` dB más cercano al frame `f`: [segundo, dB, error en frames]. */
    const cercano = (f, min = FUERZA_MIN_CORTE) => {
      let mejor = null;
      for (const [t, db] of golpes) {
        if (db < min) continue;
        const e = (t - dondeSuena(f)) * FPS;
        if (mejor === null || Math.abs(e) < Math.abs(mejor[2])) mejor = [t, db, e];
      }
      return mejor;
    };
    const fila = [];
    for (const c of cortes) {
      if (c.en === 0) continue;
      const g = cercano(c.en);
      const exigido = c.id === "c10-incendio-palapa" ? FUERZA_CORTE_AL_INCENDIO : FUERZA_MIN_CORTE;
      if (!g || Math.abs(g[2]) > TOLERANCIA_GOLPE_F + 1e-9) mal(`${c.id}: entra en el f${c.en} (${dondeSuena(c.en).toFixed(3)} s de la canción) y el golpe más cercano de ≥ ${FUERZA_MIN_CORTE} dB está a ${g ? g[2].toFixed(1) : "—"} f`);
      else if (g[1] < exigido) mal(`${c.id}: cae en un golpe de ${g[1]} dB y tiene que ser de ≥ ${exigido} dB`);
      else fila.push(`${c.id.slice(0, 3)} f${c.en}→${g[0].toFixed(2)}(${g[1]})${c.entra === "disolver" ? "d" : ""}`);
    }
    const g0 = cercano(1, FUERZA_FRAME_0);
    if (!g0 || Math.abs(g0[2]) > 2) mal(`el frame 0 no cae en un golpe de ≥ ${FUERZA_FRAME_0} dB (el más cercano: ${g0 ? `${g0[1]} dB a ${g0[2].toFixed(1)} f` : "ninguno"})`);
    else fila.push(`f0→${g0[0].toFixed(2)}(${g0[1]})`);
    if (puerta.fallos.length === n) console.log(`     ${fila.length} golpes (dB entre paréntesis; d = disolvencia que ACABA en él):\n     ${fila.join("  ")}`);
  }
  // La FORMA: cae donde entra el incendio y sube hasta la meseta (la curva de ebur128 de `musica-069.ts`).
  const media = (a, b) => {
    let s = 0;
    let k = 0;
    for (let t = a; t < b; t += 0.25) {
      s += 10 ** (musica.lufsDeLaCancion(t) / 10);
      k++;
    }
    return 10 * Math.log10(s / k);
  };
  const incendio = ids.get("c10-incendio-palapa");
  if (incendio) {
    const tc = dondeSuenaCorte(incendio.en);
    const antes = media(tc - 3.8, tc - 0.3);
    const despues = media(tc + 1, tc + 4);
    if (antes - despues < CAIDA_MIN_DB) mal(`la canción cae ${(antes - despues).toFixed(1)} dB donde entra el incendio (${antes.toFixed(1)} → ${despues.toFixed(1)} LUFS); tiene que caer ≥ ${CAIDA_MIN_DB}`);
    else console.log(`     la canción cae ${(antes - despues).toFixed(1)} dB donde entra el incendio (${antes.toFixed(1)} → ${despues.toFixed(1)} LUFS)`);
  }
  const mov2 = ids.get("c25-juntos-unirnos");
  const tarjeta = ids.get("c31-tarjeta");
  if (mov2 && tarjeta) {
    const meseta = media(dondeSuenaCorte(mov2.en + mov2.dur) + 1, dondeSuenaCorte(tarjeta.en));
    const suelo = media(dondeSuenaCorte(ids.get("c13-juntos-caminan").en) + 1, dondeSuenaCorte(ids.get("c13-juntos-caminan").en + ids.get("c13-juntos-caminan").dur));
    if (meseta - suelo < SUBIDA_MIN_DB) mal(`la canción sube ${(meseta - suelo).toFixed(1)} dB desde el MOV 1 (${suelo.toFixed(1)}) hasta el mensaje final (${meseta.toFixed(1)}); tiene que subir ≥ ${SUBIDA_MIN_DB}`);
    else console.log(`     sube ${(meseta - suelo).toFixed(1)} dB desde el MOV 1 (${suelo.toFixed(1)} LUFS) hasta el mensaje final (${meseta.toFixed(1)} LUFS)`);
    const lufsMeseta = meseta + 20 * Math.log10(audio.gananciaMusica(mov2.en + mov2.dur + 40));
    if (Math.abs(lufsMeseta - LUFS_MESETA_PEDIDO) > 1.5) mal(`la música sola en la meseta queda a ${lufsMeseta.toFixed(1)} LUFS; tiene que estar en ${LUFS_MESETA_PEDIDO} ± 1,5`);
    else console.log(`     meseta con la ganancia base: ${lufsMeseta.toFixed(1)} LUFS`);
  }
  /** El segundo de la canción en que suena el frame `f`. */
  function dondeSuenaCorte(f) {
    return plan.INICIO_MUSICA + f / FPS;
  }
  if (puerta.fallos.length === n) ok("canción del registro, cortes en golpes medidos, cae donde entra el incendio y sube hasta el mensaje final");
}

seccion("4a. la mezcla (la música baja bajo cada voz y se apaga al final)");
{
  const n = puerta.fallos.length;
  // Bajo cada voz: la música, con su ganancia, no pasa de −24,5 LUFS entre la primera palabra y la última.
  for (const v of audio.ventanasDeVoz) {
    let peor = -99;
    for (let f = v.w0; f <= v.w1; f += 3) {
      const lufs = musica.lufsDeLaCancion(plan.INICIO_MUSICA + f / FPS) + 20 * Math.log10(audio.gananciaMusica(f));
      if (lufs > peor) peor = lufs;
    }
    if (peor > LUFS_BAJO_VOZ_MAX) mal(`${v.id}: la música suena a ${peor.toFixed(1)} LUFS bajo su voz (de f${v.w0} a f${v.w1}); tiene que estar por debajo de ${LUFS_BAJO_VOZ_MAX}`);
    else console.log(`     ${v.id}: música ≤ ${peor.toFixed(1)} LUFS bajo la voz (f${v.w0}-f${v.w1})`);
    // La bajada acaba ANTES de la primera palabra.
    const pre = audio.profundidadDe(v, v.w0 - audio.BAJADA);
    if (Math.abs(pre) > 1e-6) mal(`${v.id}: la bajada empieza con ${pre.toFixed(1)} dB ya aplicados`);
  }
  const ultimo = plan.DURACION_069 - 1;
  const g = audio.gananciaMusica(ultimo - 1);
  if (g > 0.01) mal(`la música no se apaga al final: ganancia ${g.toFixed(3)} en el f${ultimo - 1}`);
  // El pico real de la canción en la pieza, con la ganancia máxima.
  if (existsSync(join(PUBLICO, audio.CANCION.src))) {
    const m = mide(audio.CANCION.src, plan.INICIO_MUSICA, plan.INICIO_MUSICA + plan.DURACION_069 / FPS);
    let gmax = 0;
    for (let f = 0; f < plan.DURACION_069; f += 2) gmax = Math.max(gmax, audio.gananciaMusica(f));
    const picoFinal = m.pico + 20 * Math.log10(gmax);
    if (picoFinal > PICO_MAX_MUSICA) mal(`el pico real de la música en la pieza es ${picoFinal.toFixed(1)} dBFS (canción ${m.pico} dBFS ${20 * Math.log10(gmax) >= 0 ? "+" : ""}${(20 * Math.log10(gmax)).toFixed(1)} dB); el tope es ${PICO_MAX_MUSICA}`);
    else console.log(`     pico real de la música: ${picoFinal.toFixed(1)} dBFS (canción ${m.pico} dBFS con ${(20 * Math.log10(gmax)).toFixed(1)} dB de ganancia máxima)`);
  }
  if (puerta.fallos.length === n) ok("la música baja a ≤ −24,5 LUFS bajo cada voz con la bajada completa antes de su primera palabra, se apaga al final y no pasa de −1 dBFS");
}

seccion("4b. el audio entero (revisaAudio) y los clips mudos");
{
  const n = puerta.fallos.length;
  for (const a of tramos.revisaAudio(audio.audio069, { fps: FPS, duracion: plan.DURACION_069 })) mal(`audio: ${a}`);
  for (const t of audio.audio069) if (!existsSync(join(PUBLICO, t.src))) mal(`${t.id}: no existe remotion/public/${t.src}`);
  // Los trozos de la música son consecutivos, de la misma canción y sin huecos.
  const trozos = audio.musica069;
  trozos.forEach((t, i) => {
    if (i === 0 && (t.en !== 0 || t.desde !== plan.INICIO_MUSICA)) mal(`${t.id}: el primer trozo tiene que arrancar en el f0 y en el segundo ${plan.INICIO_MUSICA} de la canción`);
    if (i > 0) {
      const p = trozos[i - 1];
      if (t.en !== p.en + p.dur) mal(`${t.id}: empieza en el f${t.en} y ${p.id} acaba en el f${p.en + p.dur}`);
      if (Math.abs(t.desde - (plan.INICIO_MUSICA + t.en / FPS)) > 1e-6) mal(`${t.id}: su \`desde\` (${t.desde}) no es la muestra de la canción que le toca`);
    }
  });
  const fin = trozos.length ? trozos[trozos.length - 1].en + trozos[trozos.length - 1].dur : 0;
  if (fin !== plan.DURACION_069) mal(`la música acaba en el f${fin} y la pieza en el f${plan.DURACION_069}`);
  if (puerta.fallos.length === n) ok(`${audio.audio069.length} tramos válidos (${audio.vocesMov.length} voces de los MOV · ${audio.locuciones.length} locuciones de ${voz.HUECOS_VOZ.length} · ${trozos.length} trozos de música)`);
}

/* ── 5 · los huecos de la voz en off ──────────────────────────────────────────────────────────────────────────────── */
seccion("5. los huecos de la voz en off de John y de Isabella");
{
  const n = puerta.fallos.length;
  const huecos = voz.HUECOS_VOZ;
  let fin = -1;
  const idsVistos = new Set();
  for (const h of huecos) {
    if (idsVistos.has(h.id)) mal(`${h.id}: id repetido`);
    idsVistos.add(h.id);
    const e0 = plan.INICIO_ESCENA[h.escena];
    const e1 = h.escena === 5 ? plan.INICIO_ESCENA[6] : plan.INICIO_ESCENA[h.escena + 1];
    if (h.en < e0 || h.hasta > e1) mal(`${h.id}: va de ${h.en} a ${h.hasta} y su escena ${h.escena} es de ${e0} a ${e1}`);
    if (h.en <= fin) mal(`${h.id}: empieza en el f${h.en} y el hueco anterior llega hasta el f${fin}: se pisarían`);
    if (h.hasta <= h.en) mal(`${h.id}: hasta ≤ en`);
    fin = h.hasta;
    if (h.pega && !ids.has(h.pega.corte)) mal(`${h.id}: pega un plano («${h.pega.corte}») que no existe`);
    const v = voces.VOCES_ENTREGADAS[h.id];
    const cabe = h.hasta - h.en;
    if (!v) {
      pendiente(`${h.id} (${h.quien}, ${(cabe / FPS).toFixed(1)} s): locución sin grabar — «${h.texto.slice(0, 48)}…»`);
      continue;
    }
    const durF = Math.ceil(v.dur * FPS) + 1;
    if (durF > cabe) mal(`${h.id}: la locución dura ${v.dur} s (${durF} f) y el hueco da ${cabe} f (${(cabe / FPS).toFixed(2)} s): no cabe; mueve el corte del plano que la acompaña`);
    else console.log(`     ${h.id}: ${v.dur} s en un hueco de ${(cabe / FPS).toFixed(1)} s · llegó a ${v.lufsOriginal} LUFS`);
    if (!existsSync(join(PUBLICO, v.src))) mal(`${h.id}: no existe remotion/public/${v.src} (node proyectos/069/normalizar.mjs --voz)`);
  }
  if (puerta.fallos.length === n) ok(`${huecos.length} huecos ordenados, dentro de su escena y sin pisarse · ${Object.keys(voces.VOCES_ENTREGADAS).length} locuciones entregadas`);
}

/* ── 6 · la tarjeta final ─────────────────────────────────────────────────────────────────────────────────────────── */
seccion("6. la tarjeta final (todo entra, se lee y los datos de aportes llevan lo suyo)");
{
  const n = puerta.fallos.length;
  const entradas = [cierre.FRASE_FUEGO, cierre.FRASE_AMOR, cierre.CORAZON, cierre.FIRMA, cierre.PARRAFO, cierre.APORTES].map((b) => [b.id, b.entra]);
  for (let i = 1; i < entradas.length; i++) if (entradas[i][1] <= entradas[i - 1][1]) mal(`«${entradas[i][0]}» entra en el f${entradas[i][1]} y «${entradas[i - 1][0]}» en el f${entradas[i - 1][1]}: la escalera tiene que ir en orden`);
  const todoEnPantalla = Math.max(...entradas.map(([, e]) => e)) + cierre.ENTRADA_BLOQUE.frames;
  const conTodo = cierre.DUR_TARJETA - todoEnPantalla;
  if (conTodo < seg(SEGUNDOS_CON_TODO)) mal(`la tarjeta se queda ${conTodo} f (${(conTodo / FPS).toFixed(1)} s) con todo en pantalla; el mínimo es ${SEGUNDOS_CON_TODO} s para leerla y captar los datos`);
  else console.log(`     todo en pantalla a los ${todoEnPantalla} f; se queda ${(conTodo / FPS).toFixed(1)} s con el cuadro completo`);
  const a = cierre.APORTES;
  if (a.lineas.length > a.maxLineas) mal(`aportes: ${a.lineas.length} líneas y caben ${a.maxLineas}`);
  for (const l of a.lineas) if (l.length > a.maxCaracteres) mal(`aportes: «${l}» tiene ${l.length} caracteres y caben ${a.maxCaracteres}`);
  if (a.lineas.length === 0) pendiente("la información oficial para realizar aportes (APORTES.lineas en cierre-069.ts) está vacía: la tarjeta enseña el rótulo entre corchetes");
  if (puerta.fallos.length === n) ok("la escalera de textos va en orden y deja la tarjeta completa el tiempo de leerla");
}

if (pendientes.length) console.log(`\n⚠️  ${pendientes.length} cosa(s) PENDIENTE(S) — con --final fallan:\n${pendientes.map((p) => `   · ${p}`).join("\n")}`);
puerta.cierra("el plan del 069 pasa la puerta");
