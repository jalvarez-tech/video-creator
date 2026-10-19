#!/usr/bin/env node
/**
 * ficha.mjs — la FICHA fija de una propiedad de Propiedades Luxur sobre un reel ya exportado:
 * el tipo y el negocio arriba («APARTAMENTO EN VENTA»), debajo el lugar y el precio, en
 * Montserrat, alineada a la izquierda con un filete dorado y DENTRO del cuadrado 1:1, durante
 * todo el vídeo hasta la tarjeta oscura del cierre.
 *
 * Uso (desde la raíz del repo):
 *   node .claude/skills/ficha-luxur/scripts/ficha.mjs png   <propiedad> [--salida ficha.png] [--fondo frame.jpg]
 *   node .claude/skills/ficha-luxur/scripts/ficha.mjs video <propiedad> <entrada.mp4> [--audio final.mp4] [--salida salida.mp4] [--cierre auto|no|<segundo>]
 *   node .claude/skills/ficha-luxur/scripts/ficha.mjs lote  <propiedad> --carpeta "<carpeta de los reels>" --limpios <carpeta> [--patron -recorrido.mp4] [--solo 022,024] [--rehacer]
 *   node .claude/skills/ficha-luxur/scripts/ficha.mjs hoja  <video.mp4> [--cierre <segundo>] [--salida hoja.jpg]
 *
 * <propiedad> es el nombre de un JSON de `../propiedades/` (p. ej. `los-patios`) o la ruta a uno.
 *
 * LA BASE ES EL REEL SIN SUBTÍTULOS (encargo del 2026-10-17: «que no salgan los subtítulos»). Cada
 * `RecorridoNNN` acepta `sinSubtitulos`; se renderiza mudo y casi sin pérdida (`NNN-limpio.mp4`) y
 * aquí se le pone la ficha y el AUDIO DEL FINAL PUBLICADO (`--audio`, o el final de la carpeta en
 * `lote`), copiado tal cual. Sin `--audio`, el audio sale del propio vídeo de entrada.
 *
 * POR QUÉ ASÍ Y NO EN REMOTION. La ficha se pone sobre reels que YA están exportados (y
 * publicados): volver a montarlos movería fotogramas y el audio (el AAC del render de Remotion
 * sale ≈ 43 ms tarde). Aquí el vídeo se recodifica una vez con la ficha encima y el audio se
 * COPIA tal cual: lo que suena es exactamente lo publicado. La ficha es estática, así que basta
 * un PNG con transparencia (lo pinta el mismo Chrome con el que renderiza Remotion, con la misma
 * Montserrat) y dos fundidos de su alfa.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { RAIZ, ES_WINDOWS, ejecutar, relativa } from "../../../../herramientas/comun.mjs";

const DIR_SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR_PROPIEDADES = path.join(DIR_SKILL, "propiedades");
const MONTSERRAT = path.join(RAIZ, "remotion", "public", "fuentes", "montserrat", "Montserrat-Variable.ttf");

/**
 * EL DISEÑO aprobado el 2026-10-17 (propuesta B, revisión 1: «a la izquierda, el APARTAMENTO
 * EN VENTA un poco más grande»). En píxeles de un lienzo 1080 × 1920: con otro tamaño 9:16 se
 * pinta igual a otra escala. No son opciones: si el usuario cambia algo, se cambia aquí y en
 * la tabla de SKILL.md.
 */
const D = {
  ancho: 1080,
  alto: 1920,
  izquierda: 96, // el filete
  // En el tercio de abajo del cuadrado 1:1: arriba (y = 500) tapaba la cara de Isabella en sus
  // planos medios, y sin subtítulos esa franja queda libre. El bloque mide ≈ 200 px y acaba
  // ≈ 80 px antes del borde del cuadrado (y = 1500), por encima del pie de Instagram.
  arriba: 1220,
  sangria: 34, // del filete al texto
  filete: 2,
  dorado: "#c6a878", // el de la línea de la portada (portada-luxur)
  tipo: { peso: 500, px: 36, espaciado: 0.28, minimo: 28 },
  lugar: { peso: 400, px: 54, espaciado: 0.005, separacion: 20, minimo: 42 },
  precio: { peso: 500, px: 50, espaciado: 0.03, separacion: 14, minimo: 40 },
  moneda: { px: 24, espaciado: 0.3 },
  anchoMaximo: 840, // de x = 130 a 970: a esta altura, a la derecha, van los iconos de Instagram
  cuadrado: { arriba: 420, abajo: 1500 }, // el recorte 1:1 del 9:16
  // El velo: solo detrás del texto y sin caja. Lo justo para que el blanco se lea sobre
  // ladrillo y follaje (la fachada de Los Patios era el peor caso de la maqueta).
  velo: "radial-gradient(ellipse 72% 52% at 30% 50%, rgba(0,0,0,.6), rgba(0,0,0,.18) 70%, rgba(0,0,0,0) 100%)",
  veloCaja: { x: 0, y: 1060, ancho: 1000, alto: 520 },
  sombra: "0 1px 2px rgba(0,0,0,.25), 0 2px 18px rgba(0,0,0,.35)",
};

/** Los tiempos: entra en el primer medio segundo y se va justo antes de la tarjeta oscura. */
const ENTRADA = 0.5;
const SALIDA = 0.4;
/** Luma media (8 bits, rango limitado) por debajo de la cual un fotograma es la tarjeta oscura. */
const UMBRAL_CIERRE = 32;
/** La tarjeta del cierre dura segundos; un fundido a negro de un instante no lo es. */
const CIERRE_MINIMO = 0.8;
const CRF = 12;

const NEGOCIOS = { venta: "en venta", renta: "en renta", ambos: "en venta y renta" };

// ─── la propiedad ────────────────────────────────────────────────────────────

function leePropiedad(nombre) {
  if (!nombre) throw new Error("falta la propiedad (un JSON de propiedades/ o una ruta)");
  const ruta = fs.existsSync(nombre) ? nombre : path.join(DIR_PROPIEDADES, nombre.replace(/\.json$/, "") + ".json");
  if (!fs.existsSync(ruta)) {
    const hay = fs.existsSync(DIR_PROPIEDADES) ? fs.readdirSync(DIR_PROPIEDADES).filter((n) => n.endsWith(".json")) : [];
    throw new Error(`no encuentro la propiedad «${nombre}». Hay: ${hay.map((n) => n.replace(/\.json$/, "")).join(", ") || "ninguna"}`);
  }
  const p = JSON.parse(fs.readFileSync(ruta, "utf8"));
  for (const campo of ["tipo", "negocio", "lugar", "precio"]) {
    if (p[campo] === undefined || p[campo] === "") throw new Error(`${relativa(ruta)}: falta «${campo}»`);
  }
  // El negocio no se supone nunca: «Venta» en una propiedad que se renta es un dato falso.
  if (!NEGOCIOS[p.negocio]) throw new Error(`${relativa(ruta)}: «negocio» es venta, renta o ambos (no «${p.negocio}»)`);
  if (!Number.isFinite(p.precio) || p.precio <= 0) throw new Error(`${relativa(ruta)}: «precio» va en MILLONES de COP y como número (3550, no "3.550")`);
  p.slug = path.basename(ruta, ".json");
  return p;
}

/** 3550 → «3.550»: el separador de miles colombiano, sin depender del ICU de cada Node. */
const miles = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function textos(p) {
  return {
    tipo: `${p.tipo} ${NEGOCIOS[p.negocio]}`.toUpperCase(),
    lugar: p.lugar,
    precio: `$ ${miles(p.precio)} M`,
    moneda: "COP",
  };
}

// ─── el PNG ──────────────────────────────────────────────────────────────────

function buscaChrome() {
  const raices = [RAIZ];
  // En un worktree no hay node_modules: el Chrome de Remotion está en el checkout principal.
  const git = ejecutar("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], { cwd: RAIZ });
  if (git.status === 0 && git.stdout.trim()) raices.push(path.dirname(git.stdout.trim()));
  const exe = ES_WINDOWS ? "chrome-headless-shell.exe" : "chrome-headless-shell";
  for (const raiz of raices) {
    const base = path.join(raiz, "remotion", "node_modules", ".remotion", "chrome-headless-shell");
    if (!fs.existsSync(base)) continue;
    for (const plataforma of fs.readdirSync(base)) {
      const dir = path.join(base, plataforma);
      if (!fs.statSync(dir).isDirectory()) continue;
      for (const sub of fs.readdirSync(dir)) {
        const candidato = path.join(dir, sub, exe);
        if (fs.existsSync(candidato)) return candidato;
      }
    }
  }
  throw new Error("no encuentro el Chrome headless de Remotion: node herramientas/setup.mjs");
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function html(p, { fondo } = {}) {
  const t = textos(p);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: "Montserrat"; src: url("${pathToFileURL(MONTSERRAT).href}") format("truetype"); font-weight: 100 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: transparent; width: ${D.ancho}px; height: ${D.alto}px; overflow: hidden; }
  #lienzo { position: relative; width: ${D.ancho}px; height: ${D.alto}px; overflow: hidden; }
  #fondo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  #velo { position: absolute; left: ${D.veloCaja.x}px; top: ${D.veloCaja.y}px; width: ${D.veloCaja.ancho}px; height: ${D.veloCaja.alto}px; background: ${D.velo}; }
  #ficha { position: absolute; left: ${D.izquierda}px; top: ${D.arriba}px; padding-left: ${D.sangria}px;
           border-left: ${D.filete}px solid ${D.dorado}; color: #fff; font-family: "Montserrat"; white-space: nowrap; }
  #ficha span { display: inline-block; text-shadow: ${D.sombra}; }
  #tipo   { font-weight: ${D.tipo.peso}; font-size: ${D.tipo.px}px; letter-spacing: ${D.tipo.espaciado}em; }
  #lugar  { font-weight: ${D.lugar.peso}; font-size: ${D.lugar.px}px; letter-spacing: ${D.lugar.espaciado}em; line-height: 1.15; }
  #precio { font-weight: ${D.precio.peso}; font-size: ${D.precio.px}px; letter-spacing: ${D.precio.espaciado}em; }
  #moneda { font-size: ${D.moneda.px}px; letter-spacing: ${D.moneda.espaciado}em; margin-left: .45em; }
  .l2 { margin-top: ${D.lugar.separacion}px; } .l3 { margin-top: ${D.precio.separacion}px; }
  #medidas { display: none; }
</style></head><body><div id="lienzo">
  ${fondo ? `<img id="fondo" src="${pathToFileURL(path.resolve(fondo)).href}">` : ""}
  <div id="velo"></div>
  <div id="ficha">
    <div><span id="tipo">${esc(t.tipo)}</span></div>
    <div class="l2"><span id="lugar">${esc(t.lugar)}</span></div>
    <div class="l3"><span id="precio">${esc(t.precio)}<span id="moneda">${esc(t.moneda)}</span></span></div>
  </div>
</div><pre id="medidas"></pre>
<script>
  // Si una línea no cabe en el ancho máximo, baja de 2 en 2 hasta su mínimo (y se avisa).
  document.fonts.load('400 54px "Montserrat"').then(() => document.fonts.ready).then(() => {
    const m = {};
    for (const [id, minimo] of [["tipo", ${D.tipo.minimo}], ["lugar", ${D.lugar.minimo}], ["precio", ${D.precio.minimo}]]) {
      const el = document.getElementById(id);
      const original = parseFloat(getComputedStyle(el).fontSize);
      let px = original;
      while (el.getBoundingClientRect().width > ${D.anchoMaximo} && px > minimo) { px -= 2; el.style.fontSize = px + "px"; }
      m[id] = { px, original, ancho: Math.round(el.getBoundingClientRect().width) };
    }
    const r = document.getElementById("ficha").getBoundingClientRect();
    m.caja = { x: Math.round(r.left), y: Math.round(r.top), derecha: Math.round(r.right), abajo: Math.round(r.bottom) };
    m.fuente = document.fonts.check('500 36px "Montserrat"');
    document.getElementById("medidas").textContent = JSON.stringify(m);
  });
</script></body></html>`;
}

function chrome(args) {
  return ejecutar(buscaChrome(), [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--virtual-time-budget=5000",
    ...args,
  ]);
}

/**
 * Pinta la ficha. Sin `fondo`, un PNG transparente del tamaño del vídeo (`escala` = ancho/1080).
 * Devuelve las medidas: tamaños finales, ancho de cada línea y la caja del bloque.
 */
function pintaFicha(p, salida, { fondo, escala = 1 } = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ficha-luxur-"));
  const pagina = path.join(dir, "ficha.html");
  fs.writeFileSync(pagina, html(p, { fondo }));
  const url = pathToFileURL(pagina).href;
  const ventana = `--window-size=${D.ancho},${D.alto}`;
  const dom = chrome([ventana, "--dump-dom", url]);
  const json = (dom.stdout.match(/<pre id="medidas">([^<]*)<\/pre>/) || [])[1];
  if (!json) throw new Error(`Chrome no midió la ficha:\n${dom.stderr.slice(-1500)}`);
  const medidas = JSON.parse(json.replace(/&quot;/g, '"'));
  if (!medidas.fuente) throw new Error("Chrome no cargó la Montserrat del motor: " + relativa(MONTSERRAT));
  fs.mkdirSync(path.dirname(path.resolve(salida)), { recursive: true });
  const shot = chrome([
    ventana,
    `--force-device-scale-factor=${escala}`,
    "--default-background-color=00000000",
    `--screenshot=${path.resolve(salida)}`,
    url,
  ]);
  if (!fs.existsSync(salida)) throw new Error(`Chrome no hizo la captura:\n${shot.stderr.slice(-1500)}`);
  fs.rmSync(dir, { recursive: true, force: true });
  return medidas;
}

function compruebaMedidas(m) {
  const avisos = [];
  for (const id of ["tipo", "lugar", "precio"]) {
    if (m[id].px !== m[id].original) avisos.push(`«${id}» no cabía en ${D.anchoMaximo} px: baja de ${m[id].original} a ${m[id].px} px`);
    if (m[id].ancho > D.anchoMaximo) avisos.push(`«${id}» sigue sin caber (${m[id].ancho} px): acórtalo`);
  }
  if (m.caja.y < D.cuadrado.arriba || m.caja.abajo > D.cuadrado.abajo) avisos.push(`el bloque (y ${m.caja.y}-${m.caja.abajo}) se sale del cuadrado 1:1 (y ${D.cuadrado.arriba}-${D.cuadrado.abajo})`);
  return avisos;
}

// ─── el vídeo ────────────────────────────────────────────────────────────────

function sonda(video) {
  const r = ejecutar("ffprobe", ["-v", "error", "-show_entries",
    "stream=index,codec_type,width,height,r_frame_rate,nb_frames,color_primaries,color_transfer,color_space,color_range:format=duration",
    "-of", "json", video], { check: true });
  const j = JSON.parse(r.stdout);
  const v = j.streams.find((s) => s.codec_type === "video");
  if (!v) throw new Error(`${video}: no tiene vídeo`);
  const [a, b] = v.r_frame_rate.split("/").map(Number);
  return {
    ancho: v.width,
    alto: v.height,
    fps: v.r_frame_rate,
    fpsNum: a / (b || 1),
    fotogramas: Number(v.nb_frames) || null,
    duracion: Number(j.format.duration),
    audio: j.streams.some((s) => s.codec_type === "audio"),
    color: {
      primaries: v.color_primaries || "bt709",
      trc: v.color_transfer || "bt709",
      space: v.color_space || "bt709",
      range: v.color_range || "tv",
    },
  };
}

/** Luma media de cada fotograma desde `desde` hasta el final, con su segundo absoluto. */
function lumas(video, desde) {
  const r = ejecutar("ffmpeg", ["-v", "error", "-ss", String(desde), "-copyts", "-i", video, "-an",
    "-vf", "signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-", "-f", "null", "-"], { check: true });
  const muestras = [];
  let t = null;
  for (const linea of r.stdout.split(/\r?\n/)) {
    const mt = linea.match(/pts_time:([\d.]+)/);
    if (mt) t = Number(mt[1]);
    const my = linea.match(/YAVG=([\d.]+)/);
    if (my && t !== null) muestras.push({ t, y: Number(my[1]) });
  }
  return muestras;
}

/**
 * El segundo en que empieza la tarjeta oscura del cierre (fondo casi negro con el logo y la
 * web): la cola del vídeo cuya luma media no pasa de UMBRAL_CIERRE. Null si no la hay.
 */
function detectaCierre(video, info) {
  const muestras = lumas(video, Math.max(0, info.duracion - 12));
  if (!muestras.length || muestras.at(-1).y >= UMBRAL_CIERRE) return null;
  let i = muestras.length - 1;
  while (i > 0 && muestras[i - 1].y < UMBRAL_CIERRE) i--;
  if (info.duracion - muestras[i].t < CIERRE_MINIMO) return null;
  return muestras[i].t;
}

function ponFicha(p, entrada, salida, { cierre = "auto", audio } = {}) {
  const info = sonda(entrada);
  // El audio sale del final publicado: tiene que ser la misma pieza, o sea, los mismos
  // fotogramas de imagen. (La duración del contenedor no sirve: el AAC del final acaba
  // unas decenas de ms después que la imagen, y así se queda en la versión con ficha.)
  const fuenteAudio = audio || entrada;
  const infoAudio = audio ? sonda(audio) : info;
  if (audio) {
    const mismos = info.fotogramas && infoAudio.fotogramas
      ? info.fotogramas === infoAudio.fotogramas
      : Math.abs(infoAudio.duracion - info.duracion) < 0.25;
    if (!mismos) {
      throw new Error(`${path.basename(audio)} (${infoAudio.fotogramas ?? "?"} fotogramas, ${infoAudio.duracion} s) y ${path.basename(entrada)} (${info.fotogramas ?? "?"}, ${info.duracion} s) no son la misma pieza`);
    }
  }
  if (Math.abs(info.ancho / info.alto - 9 / 16) > 0.01) throw new Error(`${path.basename(entrada)} es ${info.ancho}×${info.alto}: la ficha está diseñada para 9:16`);
  const escala = info.ancho / D.ancho;

  let fin = null;
  if (cierre === "auto") fin = detectaCierre(entrada, info);
  else if (cierre !== "no") fin = Number(cierre);
  if (fin !== null && !(fin > ENTRADA + SALIDA && fin <= info.duracion)) throw new Error(`cierre fuera del vídeo: ${fin}`);

  const png = path.join(os.tmpdir(), `ficha-luxur-${p.slug}-${info.ancho}.png`);
  const medidas = pintaFicha(p, png, { escala });
  const avisos = compruebaMedidas(medidas);

  // El alfa del PNG entra y sale con fundidos; el PNG se pasa a YUV con la matriz del vídeo
  // (BT.709) para que el dorado no vire, y se mezcla en 4:2:0 sin remuestrear el croma del
  // original más que donde está la ficha.
  let alfa = `fade=t=in:st=0:d=${ENTRADA}:alpha=1`;
  if (fin !== null) alfa += `,fade=t=out:st=${(fin - SALIDA).toFixed(3)}:d=${SALIDA}:alpha=1`;
  const matriz = info.color.space === "bt709" ? "bt709" : "bt601";
  const filtro =
    `[1:v]format=rgba,${alfa},scale=out_color_matrix=${matriz}:out_range=${info.color.range === "pc" ? "pc" : "tv"},format=yuva420p[f];` +
    `[0:v][f]overlay=0:0:format=yuv420:shortest=1,format=yuv420p[v]`;

  const parcial = salida.replace(/\.mp4$/i, "") + ".parcial.mp4";
  fs.mkdirSync(path.dirname(path.resolve(salida)), { recursive: true });
  ejecutar("ffmpeg", [
    "-v", "error", "-y",
    "-i", entrada,
    "-loop", "1", "-framerate", info.fps, "-i", png,
    ...(audio ? ["-i", audio] : []),
    "-filter_complex", filtro,
    "-map", "[v]", ...(infoAudio.audio ? ["-map", audio ? "2:a" : "0:a"] : []),
    "-c:v", "libx264", "-preset", "slow", "-crf", String(CRF), "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-color_primaries", info.color.primaries, "-color_trc", info.color.trc, "-colorspace", info.color.space, "-color_range", info.color.range,
    "-r", info.fps, "-video_track_timescale", "90000",
    ...(infoAudio.audio ? ["-c:a", "copy"] : []),
    "-movflags", "+faststart",
    parcial,
  ], { check: true });

  // La salida tiene que durar lo mismo que la entrada: ni un fotograma de más ni de menos.
  const fuera = sonda(parcial);
  if (info.fotogramas && fuera.fotogramas && info.fotogramas !== fuera.fotogramas) {
    throw new Error(`${path.basename(salida)}: ${fuera.fotogramas} fotogramas y la entrada tiene ${info.fotogramas} (queda en ${parcial})`);
  }
  fs.renameSync(parcial, salida);
  return { info, fin, medidas, avisos, fuenteAudio };
}

// ─── la hoja para revisar ────────────────────────────────────────────────────

function hoja(video, salida, { cierre } = {}) {
  const info = sonda(video);
  const fin = cierre ?? detectaCierre(video, info) ?? info.duracion;
  const tiempos = [0, 0.25, 0.6];
  const a = 2, b = Math.max(a + 1, fin - 1);
  for (let k = 0; k < 6; k++) tiempos.push(a + ((b - a) * k) / 5);
  tiempos.push(Math.max(0, fin - SALIDA / 2), Math.min(info.duracion - 0.05, fin + 0.1), Math.max(0, info.duracion - 0.2));
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ficha-hoja-"));
  // Sin rótulos: no todos los ffmpeg traen drawtext. Los segundos, en orden, los imprime la orden.
  tiempos.forEach((t, i) => {
    ejecutar("ffmpeg", ["-v", "error", "-y", "-ss", t.toFixed(3), "-i", video, "-frames:v", "1",
      "-vf", "scale=300:-2", path.join(dir, `f${String(i).padStart(2, "0")}.png`)], { check: true });
  });
  fs.mkdirSync(path.dirname(path.resolve(salida)), { recursive: true });
  ejecutar("ffmpeg", ["-v", "error", "-y", "-i", path.join(dir, "f%02d.png"), "-vf", "tile=6x2:padding=6:color=0x141414", "-frames:v", "1", "-q:v", "3", salida], { check: true });
  fs.rmSync(dir, { recursive: true, force: true });
  return { tiempos, fin };
}

// ─── la línea de comandos ────────────────────────────────────────────────────

function opciones(argv) {
  const pos = [];
  const op = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const clave = a.slice(2);
      const sig = argv[i + 1];
      if (sig === undefined || sig.startsWith("--")) op[clave] = true;
      else { op[clave] = sig; i++; }
    } else pos.push(a);
  }
  return { pos, op };
}

function informe(nombre, r) {
  const s = (x) => x.toFixed(2).replace(".", ",");
  const cierre = r.fin === null ? "sin tarjeta oscura: la ficha llega hasta el final" : `tarjeta oscura en ${s(r.fin)} s: la ficha se va de ${s(r.fin - SALIDA)} a ${s(r.fin)} s`;
  console.log(`✅ ${nombre} — ${s(r.info.duracion)} s · ${cierre}`);
  for (const a of r.avisos) console.log(`   ⚠️  ${a}`);
}

function main() {
  const [orden, ...resto] = process.argv.slice(2);
  const { pos, op } = opciones(resto);
  if (orden === "png") {
    const p = leePropiedad(pos[0]);
    const salida = op.salida || path.join(os.tmpdir(), `ficha-luxur-${p.slug}.png`);
    const m = pintaFicha(p, salida, { fondo: op.fondo });
    console.log(`✅ ${salida}`);
    console.log(`   ${JSON.stringify(textos(p))}`);
    console.log(`   tipo ${m.tipo.px} px (${m.tipo.ancho} px de ancho) · lugar ${m.lugar.px} px (${m.lugar.ancho}) · precio ${m.precio.px} px (${m.precio.ancho}) · bloque y ${m.caja.y}-${m.caja.abajo}`);
    for (const a of compruebaMedidas(m)) console.log(`   ⚠️  ${a}`);
  } else if (orden === "video") {
    const p = leePropiedad(pos[0]);
    const entrada = pos[1];
    if (!entrada || !fs.existsSync(entrada)) throw new Error("falta el vídeo de entrada");
    const salida = op.salida || entrada.replace(/\.mp4$/i, "-ficha.mp4");
    if (path.resolve(salida) === path.resolve(entrada)) throw new Error("la salida no puede pisar la entrada");
    if (op.audio && !fs.existsSync(op.audio)) throw new Error(`no existe ${op.audio}`);
    informe(path.basename(salida), ponFicha(p, entrada, salida, { cierre: op.cierre || "auto", audio: op.audio || undefined }));
  } else if (orden === "lote") {
    const p = leePropiedad(pos[0]);
    const carpeta = op.carpeta;
    if (!carpeta || !fs.existsSync(carpeta)) throw new Error("falta --carpeta (la de los reels publicados de la propiedad)");
    const patron = typeof op.patron === "string" ? op.patron : "-recorrido.mp4";
    const solo = typeof op.solo === "string" ? op.solo.split(",").map((s) => s.trim()) : null;
    // Base limpia (sin subtítulos) de cada reel: <limpios>/NNN-limpio.mp4. El final de la carpeta
    // pone el audio y el nombre; la salida va a su lado, con otro nombre: nunca lo pisa.
    const limpios = typeof op.limpios === "string" ? op.limpios : null;
    if (!limpios || !fs.existsSync(limpios)) throw new Error("falta --limpios (la carpeta con los NNN-limpio.mp4 renderizados sin subtítulos)");
    const hojas = path.join(os.tmpdir(), "ficha-luxur", p.slug);
    const archivos = fs.readdirSync(carpeta)
      .filter((n) => !n.startsWith("._") && n.endsWith(patron))
      .filter((n) => !solo || solo.some((s) => n.startsWith(s)))
      .sort();
    if (!archivos.length) throw new Error(`ningún «*${patron}» en ${carpeta}`);
    console.log(`${p.slug}: ${archivos.length} vídeo(s) en ${carpeta}`);
    console.log(`   ${JSON.stringify(textos(p))}`);
    for (const n of archivos) {
      const salida = path.join(carpeta, n.replace(/\.mp4$/i, "-ficha.mp4"));
      if (fs.existsSync(salida) && !op.rehacer) { console.log(`⏭️  ${path.basename(salida)} ya existe (--rehacer para repetirlo)`); continue; }
      const base = path.join(limpios, n.slice(0, 3) + "-limpio.mp4");
      if (!fs.existsSync(base)) { console.log(`⚠️  ${n}: falta ${base}, se salta`); continue; }
      const r = ponFicha(p, base, salida, { audio: path.join(carpeta, n) });
      informe(path.basename(salida), r);
      const h = path.join(hojas, n.replace(/\.mp4$/i, "-hoja.jpg"));
      hoja(salida, h, { cierre: r.fin ?? undefined });
      console.log(`   hoja: ${h}`);
    }
  } else if (orden === "hoja") {
    const video = pos[0];
    if (!video || !fs.existsSync(video)) throw new Error("falta el vídeo");
    const salida = op.salida || video.replace(/\.mp4$/i, "-hoja.jpg");
    const r = hoja(video, salida, { cierre: op.cierre !== undefined ? Number(op.cierre) : undefined });
    console.log(`✅ ${salida}  (segundos: ${r.tiempos.map((t) => t.toFixed(2)).join(" · ")})`);
  } else {
    console.log(fs.readFileSync(new URL(import.meta.url), "utf8").split("*/")[0]);
    process.exit(orden ? 1 : 0);
  }
}

try {
  main();
} catch (e) {
  console.error(`❌ ${e.message}`);
  process.exit(1);
}
