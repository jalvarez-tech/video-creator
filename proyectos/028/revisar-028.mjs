#!/usr/bin/env node
/**
 * PUERTA DEL 028 — el recorrido entero de One Living en UNA SOLA TOMA (RC14), acelerada en los tránsitos (V12 del registro).
 *
 *   node proyectos/028/revisar-028.mjs            (durante el montaje: avisa de lo «por confirmar»)
 *   node proyectos/028/revisar-028.mjs --final    (antes de exportar: lo «por confirmar» es un fallo)
 *
 * Las comprobaciones del FORMATO salen de `revisar-metraje.mjs` (línea de tiempo, metraje, tramos, encuadre, color). Encima, lo que esta pieza
 * promete y ningún frame enseña:
 *
 *   2. LA TOMA ENTERA: todos los planos son RC14, en orden, y la fuente AVANZA en cada fotograma de la comp (ni retrocede ni se repite ni salta
 *      más de lo que su velocidad dice): es un paseo sin cortes, y un fotograma repetido o un salto de 3 f en una frontera se ve como un tirón. Las
 *      velocidades, entre ×1 y ×4, cambian de 0,5 en 0,5 como mucho entre dos planos (las rampas son escaleras, no saltos), y las dos ventanas de voz
 *      caen enteras en los dos planos a ×1 que llevan `audio` (ningún otro lo lleva).
 *   3. LOS GOLPES: cada cambio de velocidad es un instante que se ve; el arranque de cada meseta cae a ≤ 2 f de su golpe MEDIDO (los de `GOLPE` en
 *      metraje-028.ts tienen que estar en `musica/golpes-028.json`), de ≥ 9 dB. La llegada a la alcoba del CTA, declarada: no tiene golpe.
 *   4. LAS REGLAS FIJAS DEL CANAL: el frame 0 sin texto ni voz, nada arriba, ninguna cuenta, NUNCA el sello; y el cierre (tarjeta oscura, logo al
 *      60 %, la web), sin congelar nada.
 *   5. LA VOZ y LA MÚSICA: cada WAV con su tramo, ninguna palabra en un desclic, la ganancia por toma sensata, la cola tras la última palabra; la
 *      música entra en su golpe, baja ANTES de que ella hable, vuelve arriba antes del golpe en que arranca la cámara, queda ≥ 9 LU bajo la voz y se
 *      acaba antes que la pieza.
 *   6. LOS SUBTÍTULOS: su validador sin un aviso, con las letras del canal; cada trozo dentro de una ventana de voz; todo abajo, a 90 %; la cursiva
 *      8 px menor; ninguna cifra.
 *   7b. Lo que comparte con las versiones anteriores de One Living (informa: aquí es TODO RC14, y eso es el encargo).
 *
 * Carga los módulos TypeScript DE VERDAD (`abrePuerta` → esbuild): lo que mide es lo que se renderiza. Sale con 1 si algo falla.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ejecutar } from "../../herramientas/comun.mjs";
import { abrePuerta, cargaTs, PUBLICO, RAIZ } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

/**
 * La pieza ABRE con Isabella, como la V6-V11 (pedido del usuario en la V6: «empecemos directamente con el hook»): aquí el hook es la misma toma que
 * todo lo demás. La regla fija que sí se cumple: el frame 0 (la puerta entreabierta) sale sin texto ni voz; ella habla desde el f28.
 */
const ABRE_CON_EL_HOOK = true;

const CLIP = "recorrido-028/rc14.mp4";
const FRAMES_CLIP = 1495; // RC14 normalizado: 1495 fotogramas a 30 fps (49,83 s)
const TECHO_ZOOM = 1.2;
const TOPE_SEGUNDOS = 55;
const VELOCIDAD = [1, 4]; // la cámara nunca va más despacio que la toma ni más deprisa que ×4 (a ×5 el vaivén del paso marea)
const SALTO_MAX = 0.5; // cambio de velocidad entre dos planos seguidos: una rampa sube o baja de 0,5 en 0,5
const AVANCE_TOLERANCIA = 0.5; // f de fuente que el redondeo de `trimBefore` puede mover una frontera
const TOLERANCIA_GOLPE = 2; // f entre el arranque de una meseta y el golpe en que cae (una rampa no es un corte seco: el cambio dura 4-6 f)
const FUERZA_MIN = 9.0; // dB por 15 ms
const COLA_FINAL = [45, 120]; // f desde la última palabra del CTA hasta el final: lo que queda de toma + la tarjeta
const TARJETA_FRAMES = [45, 75];
const HOLGURA_TROZO = 3; // f que un trozo puede adelantarse a su palabra
const ACENTO_MENOS_PEDIDO = 8;
const VOZ_OBJETIVO = -15; // LUFS de la voz (rev. 1, pedido del usuario: más fuerte sin saturar; las versiones anteriores, −21)
const TECHO_VOZ_DBTP = -1.0; // pico real de la voz en lo que suena, con su ganancia
const OPACIDAD_PEDIDA = 0.9;
/** Mesetas cuyo arranque no tiene golpe, y por qué. Una que ya no haga falta tumba la puerta. */
const SIN_GOLPE = {
  cta: "la llegada a la alcoba del ventanal de esquina: la canción no tiene golpes ≥ 9 dB entre 199,63 y 204,80 s (va hacia su final), así que la cámara frena despacio (escalones de 4 f) en vez de en un golpe",
};

// Las versiones de One Living que usaron RC14 viven SIN commit en los worktrees del estudio (no viajan con git): se leen por ruta relativa a este checkout.
// NO se compara con Los Patios: los códigos de clip chocan entre propiedades.
const VERSIONES_ANTERIORES = [
  { nombre: "la V7 (023)", plan: "../reel-023/remotion/src/proyectos/023/metraje-023.ts", cortes: "metraje023" },
  { nombre: "la V10 (026)", plan: "../reel-v9-one-living-08781e/remotion/src/proyectos/026/metraje-026.ts", cortes: "metraje026" },
  { nombre: "la V11 (027)", plan: "../determined-mendel-d8afd4/remotion/src/proyectos/027/metraje-027.ts", cortes: "metraje027" },
];

const puerta = await abrePuerta({
  proyecto: "028",
  plan: "remotion/src/proyectos/028/metraje-028.ts",
  cortes: "metraje028",
  receta: "node proyectos/028/normalizar.mjs",
  extras: {
    audio: "remotion/src/proyectos/028/audio-028.ts",
    subtitulos: "remotion/src/proyectos/028/subtitulos-028.ts",
    tramos: "remotion/src/motor/sound/tramos.ts",
    editorial: "remotion/src/motor/subtitulos-editoriales.ts",
    marca: "remotion/src/marcas/luxur.ts",
    cierre: "remotion/src/proyectos/028/cierre-028.ts",
  },
}).catch((e) => {
  console.log(`\n❌ el plan del 028 no carga: ${e.message}\n`);
  process.exit(1);
});
const { cortes, fps, fallos, mal, ok, seccion } = puerta;
const M = puerta.plan;
const F = puerta.modulos.formato;
const A = puerta.modulos.audio;
const T = puerta.modulos.tramos;
const E = puerta.modulos.editorial;
const CI = puerta.modulos.cierre;
const CANAL = puerta.modulos.marca.LUXUR;
const bloques = puerta.modulos.subtitulos.subtitulos028;
const DURACION = M.DURACION_028;
const videos = cortes.filter((c) => c.tipo !== "foto");
const tarjeta = cortes.at(-1);
const conVoz = cortes.filter((c) => c.audio);
const vozDe = (c) => ({ ini: T.frameDeFuente(c.en, c.desde, c.voz.s0, fps), fin: T.frameDeFuente(c.en, c.desde, c.voz.s1, fps) });
const byId = (id) => {
  const c = cortes.find((x) => x.id === id);
  if (!c) throw new Error(`falta el plano ${id} en metraje-028.ts`);
  return c;
};
const fuenteComp = readFileSync(join(RAIZ, "remotion", "src", "proyectos", "028", "Recorrido028.tsx"), "utf8");
const sinComentarios = fuenteComp.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

/* 1 · línea de tiempo ───────────────────────────────────────────────────── */
seccion("1. línea de tiempo");
puerta.lineaDeTiempo({ duracion: DURACION });

/* 2 · la toma entera ────────────────────────────────────────────────────── */
seccion("2. la toma entera: RC14 en orden, la fuente avanza en cada fotograma, rampas de 0,5 en 0,5");
{
  const n = fallos.length;
  const ajenos = videos.filter((c) => c.src !== CLIP);
  if (ajenos.length) mal(`hay planos que no son RC14: ${ajenos.map((c) => `${c.id} (${c.src})`).join(", ")}; el encargo es TODO con «recorrido caminando.MOV»`);
  if (cortes.some((c) => c.entra && c.entra !== "corte")) mal("hay planos que entran con otra cosa que un corte: es la misma toma, una disolvencia la duplicaría");
  // El fotograma de RC14 que enseña cada frame de la comp, como lo calcula Remotion: trimBefore + f · velocidad.
  const fuenteEn = [];
  for (const c of videos) {
    const vel = c.velocidad ?? 1;
    if (vel < VELOCIDAD[0] || vel > VELOCIDAD[1]) mal(`${c.id}: velocidad ${vel}, fuera de [${VELOCIDAD.join(", ")}]`);
    const trim = Math.round(c.desde * fps);
    for (let f = 0; f < c.dur; f++) fuenteEn[c.en + f] = { id: c.id, src: trim + f * vel, vel };
  }
  let peorAvance = { d: 0 };
  for (let f = 1; f < fuenteEn.length; f++) {
    const [p, q] = [fuenteEn[f - 1], fuenteEn[f]];
    if (!p || !q) continue;
    const d = q.src - p.src;
    // entre dos frames la fuente avanza lo que dice la velocidad del frame anterior (± el redondeo de una frontera)
    const esperado = p.vel;
    if (Math.abs(d - esperado) > AVANCE_TOLERANCIA + 1e-9 && Math.abs(d - q.vel) > AVANCE_TOLERANCIA + 1e-9) {
      mal(`f${f - 1}→f${f} (${p.id} → ${q.id}): la fuente pasa del fotograma ${p.src.toFixed(1)} al ${q.src.toFixed(1)} (${d >= 0 ? "+" : ""}${d.toFixed(1)}); a ×${p.vel} tendría que avanzar ${esperado}`);
    }
    if (d <= 0) mal(`f${f - 1}→f${f}: la fuente no avanza (${p.src} → ${q.src}): un fotograma repetido es un tirón`);
    if (Math.abs(d - esperado) > Math.abs(peorAvance.d)) peorAvance = { d: d - esperado, f };
  }
  for (let i = 1; i < videos.length; i++) {
    const [a, b] = [videos[i - 1].velocidad ?? 1, videos[i].velocidad ?? 1];
    if (Math.abs(b - a) > SALTO_MAX + 1e-9) mal(`${videos[i - 1].id} (×${a}) → ${videos[i].id} (×${b}): un salto de velocidad de ${Math.abs(b - a)}; la rampa cambia de ${SALTO_MAX} en ${SALTO_MAX}`);
  }
  const primero = videos[0];
  const ultimoSrc = Math.round(videos.at(-1).desde * fps) + videos.at(-1).dur - 1;
  if (ultimoSrc > FRAMES_CLIP - 1) mal(`el último plano pide el fotograma ${ultimoSrc} de RC14 y tiene ${FRAMES_CLIP} (0-${FRAMES_CLIP - 1})`);
  // La voz: los dos planos con `audio` van a ×1 y contienen ENTERA su ventana de voz; ningún otro trozo de la toma pisa una ventana de voz a otra velocidad.
  const ventanas = [M.VOZ_HOOK, M.VOZ_CTA];
  if (conVoz.length !== 2) mal(`${conVoz.length} planos con \`audio\`; son dos (el hook y el CTA)`);
  for (const w of ventanas) {
    const dueno = conVoz.find((c) => c.voz === w || (c.voz && c.voz.s0 === w.s0));
    if (!dueno) {
      mal(`la ventana de voz ${w.s0}-${w.s1} s no la lleva ningún plano con \`audio\``);
      continue;
    }
    if ((dueno.velocidad ?? 1) !== 1) mal(`${dueno.id}: lleva voz y va a ×${dueno.velocidad}`);
    const desde = dueno.desde;
    const hasta = dueno.desde + dueno.dur / fps;
    if (w.s0 < desde + T.DESCLIC_VOZ / fps || w.s1 > hasta - 2 / fps) mal(`${dueno.id} (${desde.toFixed(2)}-${hasta.toFixed(2)} s de RC14) no contiene entera su voz (${w.s0}-${w.s1} s) con aire`);
  }
  const fuera = videos.filter((c) => !c.audio && ventanas.some((w) => c.desde < w.s1 && c.desde + (c.dur * (c.velocidad ?? 1)) / fps > w.s0));
  if (fuera.length) mal(`trozos sin voz que pisan una ventana de voz: ${fuera.map((c) => c.id).join(", ")}`);
  if (fallos.length === n) {
    const mesetas = [...new Set(videos.map((c) => c.meseta))];
    ok(
      `${videos.length} trozos de RC14 en ${mesetas.length} mesetas, del fotograma ${Math.round(primero.desde * fps)} al ${ultimoSrc} · la fuente avanza en cada frame (peor desvío ${peorAvance.d >= 0 ? "+" : ""}${peorAvance.d.toFixed(1)} f) · ×${Math.min(...videos.map((c) => c.velocidad ?? 1))}-×${Math.max(...videos.map((c) => c.velocidad ?? 1))}, rampas de ${SALTO_MAX} en ${SALTO_MAX} · la voz entera en los dos trozos a ×1`
    );
  }
}

/* 3 · los golpes ────────────────────────────────────────────────────────── */
seccion("3. cada cambio de velocidad en un golpe medido de la canción");
{
  const n = fallos.length;
  const medidos = JSON.parse(readFileSync(join(RAIZ, "proyectos", "028", "musica", "golpes-028.json"), "utf8")).golpes;
  const filas = [];
  const usadas = new Set();
  M.MESETAS.forEach((m, i) => {
    const suyos = videos.filter((c) => c.meseta === m.nombre);
    if (!suyos.length) return mal(`la meseta «${m.nombre}» no tiene ningún trozo`);
    // El instante que se ve: un tránsito, cuando empieza a acelerar (su primer trozo); un destino, cuando la cámara YA va a su velocidad (su trozo
    // propio, tras la rampa de bajada del tránsito anterior, que pertenece a ese tránsito).
    const propio = suyos.find((c) => c.id === `m${String(i + 1).padStart(2, "0")}-${m.nombre}`);
    const arranque = i === 0 ? 0 : (suyos[0].id.includes("-sube") ? suyos[0] : propio).en;
    if (SIN_GOLPE[m.nombre]) {
      usadas.add(m.nombre);
      console.log(`  ⚠️  «${m.nombre}» arranca en f${arranque} sin golpe — declarado: ${SIN_GOLPE[m.nombre]}`);
      return;
    }
    const g = M.GOLPE[m.nombre];
    if (!g) return mal(`la meseta «${m.nombre}» no tiene golpe en GOLPE (metraje-028.ts) ni excepción en SIN_GOLPE`);
    const real = medidos.find((x) => Math.abs(x.t - g.t) <= 0.004);
    if (!real) mal(`el golpe de «${m.nombre}» (${g.t} s) no está entre los medidos (musica/golpes-028.json)`);
    else if (Math.abs(real.db - g.db) > 0.5) mal(`el golpe de «${m.nombre}» mide ${real.db} dB y metraje-028.ts dice ${g.db}`);
    if (g.db < FUERZA_MIN) mal(`«${m.nombre}» arranca en un golpe de ${g.db} dB; el mínimo es ${FUERZA_MIN}`);
    const d = arranque - M.golpeExacto(g.t);
    if (Math.abs(d) > TOLERANCIA_GOLPE) mal(`«${m.nombre}» arranca en f${arranque} y su golpe (${g.t} s) suena en f${M.golpeExacto(g.t).toFixed(1)} (${d >= 0 ? "+" : ""}${d.toFixed(1)} f; tolerancia ${TOLERANCIA_GOLPE})`);
    filas.push(`${m.nombre} ${d >= 0 ? "+" : ""}${d.toFixed(1)}`);
  });
  for (const id of Object.keys(SIN_GOLPE)) if (!usadas.has(id)) mal(`sobra la excepción «${id}» de SIN_GOLPE: esa meseta ya no existe, quítala`);
  // La entrada de la música es un frame entero (el intérprete redondea `desde`) y su golpe suena en el f0.
  if (Math.abs(M.INICIO_MUSICA * fps - Math.round(M.INICIO_MUSICA * fps)) > 1e-6) mal(`INICIO_MUSICA = ${M.INICIO_MUSICA} no es un frame entero: \`trimBefore\` lo movería`);
  const f0 = M.golpeExacto(M.GOLPE.puerta.t);
  if (f0 < -0.5 || f0 > 1) mal(`el golpe de entrada de la canción suena en f${f0.toFixed(2)}; tiene que sonar en el f0`);
  if (fallos.length === n) ok(`${filas.length} arranques a ≤ ${TOLERANCIA_GOLPE} f de su golpe (${filas.join(" · ")} f) · la canción entra con su golpe en f${f0.toFixed(1)}`);
}

/* 4 · reglas fijas y cierre ─────────────────────────────────────────────── */
seccion("4. reglas fijas del canal: frame 0 limpio, nada arriba, ninguna cuenta, nunca el sello; el cierre en la tarjeta oscura");
{
  const n = fallos.length;
  const hook = byId("m02-hook");
  const primerTexto = Math.min(...bloques.map((b) => b.trozos[0].desde));
  if (primerTexto <= 0) mal(`el primer subtítulo entra en f${primerTexto}: el frame 0 (la miniatura) sale sin texto`);
  if (vozDe(hook).ini <= 0) mal("Isabella habla en el frame 0: sale sin voz");
  if (!ABRE_CON_EL_HOOK && primerTexto < hook.en + hook.dur) mal("con ABRE_CON_EL_HOOK = false, la primera toma sale entera sin texto");
  if (bloques.some((b) => b.posicion === "arriba")) mal("hay texto arriba: ni hook escrito ni cuenta");
  if (bloques.some((b) => b.trozos.some((t) => /@/.test(t.texto)))) mal("hay una cuenta de texto (@…): el cierre lleva el logo y la web");
  if (/SelloCampana/.test(sinComentarios)) mal("la composición usa `SelloCampana`: el sello no se pone NUNCA");
  if (/PROPIEDADES LUXUR/.test(sinComentarios)) mal("la composición escribe «PROPIEDADES LUXUR» a mano: el sello no se pone NUNCA");
  // El cierre: la tarjeta sigue a la toma sin hueco, no se congela nada, la imagen funde a negro en el último fotograma.
  const cta = byId("m14-cta");
  const png = (ruta) => {
    const b = readFileSync(ruta);
    return b.length > 26 && b.subarray(1, 4).toString() === "PNG" ? { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20), color: b[25] } : null;
  };
  if (tarjeta.tipo !== "foto" || tarjeta.src !== CI.TARJETA) mal(`el último plano tiene que ser la tarjeta ${CI.TARJETA}`);
  if (tarjeta.en !== cta.en + cta.dur) mal(`la tarjeta entra en f${tarjeta.en} y el CTA acaba en f${cta.en + cta.dur}`);
  if (cortes.filter((c) => c.tipo === "foto").length !== 1) mal("hay otra foto además de la tarjeta: nada se congela");
  if (tarjeta.dur !== CI.DUR_TARJETA || tarjeta.dur < TARJETA_FRAMES[0] || tarjeta.dur > TARJETA_FRAMES[1]) mal(`la tarjeta dura ${tarjeta.dur} f (cierre-028.ts: ${CI.DUR_TARJETA}; entre ${TARJETA_FRAMES.join(" y ")})`);
  const rutaTarjeta = join(PUBLICO, CI.TARJETA);
  if (!existsSync(rutaTarjeta)) mal(`no existe remotion/public/${CI.TARJETA} (node proyectos/028/normalizar.mjs)`);
  else {
    const t = png(rutaTarjeta);
    if (!t || t.ancho < 1296 || t.alto < 2304) mal(`${CI.TARJETA} no cubre el cuadro (1296×2304)`);
    const r = ejecutar("ffmpeg", ["-nostdin", "-v", "error", "-i", rutaTarjeta, "-vf", "signalstats,metadata=print:key=lavfi.signalstats.YMAX:file=-", "-f", "null", "-"]);
    const mY = /YMAX=(\d+)/.exec(r.stdout);
    if (!mY || Number(mY[1]) > 24) mal(`la tarjeta no es oscura: luma máxima ${mY ? mY[1] : "no medible"}`);
  }
  const ultimaDeIsabella = cta.en + cta.dur - 1;
  if (!(CI.FUNDIDO_A_OSCURO >= 4 && CI.FUNDIDO_A_OSCURO <= 8)) mal(`FUNDIDO_A_OSCURO = ${CI.FUNDIDO_A_OSCURO}; entre 4 y 8`);
  if (ultimaDeIsabella - CI.FUNDIDO_A_OSCURO < vozDe(cta).fin - 6) mal(`el fundido a negro empieza en f${ultimaDeIsabella - CI.FUNDIDO_A_OSCURO}, más de 6 f antes de que ella acabe (f${vozDe(cta).fin})`);
  if (!/<FundidoACierre\s*\/>/.test(sinComentarios) || !/interpolate\(frame,\s*\[ULTIMA_DE_ISABELLA\s*-\s*FUNDIDO_A_OSCURO,\s*ULTIMA_DE_ISABELLA\]/.test(sinComentarios)) mal("el fundido a negro no está montado o no acaba en el último fotograma de Isabella");
  if (Math.abs(CI.LOGO_OPACIDAD - 0.6) > 1e-9 || CI.LOGO_ANCHO !== 440) mal(`el logo: ${CI.LOGO_ANCHO} px al ${CI.LOGO_OPACIDAD * 100} %; el canal pide 440 px al 60 %`);
  if (!/\*\s*LOGO_OPACIDAD/.test(sinComentarios) || !/<LogoCierre\s*\/>/.test(sinComentarios)) mal("el logo no está montado con su opacidad");
  if (!existsSync(join(PUBLICO, CI.LOGO))) mal(`no existe remotion/public/${CI.LOGO}`);
  if (CI.WEB !== "PropiedadesLuxur.com" || !/<WebCierre\s*\/>/.test(sinComentarios)) mal("la web «PropiedadesLuxur.com» no está montada");
  const letraBase = E.letraSubtitulosDe(CANAL).base;
  const anchoWeb = E.anchoLinea(CI.WEB, letraBase, CI.WEB_PX);
  const util = 1080 - 2 * E.margenDe({ ancho: 1080, alto: 1920 });
  if (anchoWeb === null || anchoWeb > util) mal(`la web mide ≈ ${anchoWeb} px y el ancho útil son ${util}`);
  if (CI.LOGO_ENSI.arriba < 1920 * 0.125 || CI.WEB_ARRIBA + CI.WEB_ALTO_LINEA > 1920 * 0.88) mal("el logo o la web se salen de las zonas seguras");
  if (tarjeta.en + CI.WEB_RETRASO + CI.WEB_ENTRA + 30 > DURACION) mal("la web no llega a estar entera 1 s antes del final");
  if (bloques.some((b) => b.hasta > tarjeta.en + 4)) mal("hay subtítulos sobre la tarjeta");
  if (DURACION / fps > TOPE_SEGUNDOS) mal(`${(DURACION / fps).toFixed(1)} s: pasa de ${TOPE_SEGUNDOS} s`);
  if (fallos.length === n) {
    ok(`el frame 0 sale sin texto ni voz (ella habla desde f${vozDe(hook).ini}; ABRE_CON_EL_HOOK como la V6-V11) · nada arriba, ninguna cuenta, sin sello · nada se congela: funde a negro en f${ultimaDeIsabella} y tarjeta de ${(tarjeta.dur / fps).toFixed(1)} s con el logo (440 px, 60 %) y «${CI.WEB}» · ${(DURACION / fps).toFixed(1)} s`);
  }
}

/* 4b · color ────────────────────────────────────────────────────────────── */
seccion("4b. el color (colorCorrection, R32): el mismo en los 49 trozos");
{
  const n = fallos.length;
  puerta.colorCine();
  const claves = (c) => JSON.stringify(Object.entries(c.color ?? {}).sort(([x], [y]) => x.localeCompare(y)));
  const distintos = new Set(videos.map(claves));
  if (videos.some((c) => c.color === undefined)) mal("hay trozos sin `color`: todos pasan por el efecto (y por el mismo camino de decodificación)");
  if (distintos.size !== 1) mal(`hay ${distintos.size} colores distintos: es una toma partida, un color distinto en un trozo se vería como un salto`);
  const k = videos[0]?.color ?? {};
  if ((k.vibrance ?? 0) > 0.05) mal(`vibrance ${k.vibrance} > 0,05`);
  if ((k.saturation ?? 1) > 1.06) mal(`saturation ${k.saturation} > 1,06: Isabella está en cuadro casi siempre y su piel no se toca`);
  if (tarjeta.color !== undefined) mal("la tarjeta no se gradúa");
  if (fallos.length === n) ok(`un solo color para los ${videos.length} trozos (saturation ${k.saturation ?? 1}, vibrance ${k.vibrance ?? 0}) · render con --gl=angle`);
}

/* 5 · voz y música ──────────────────────────────────────────────────────── */
seccion("5. la voz de Isabella y la música bajo ella");
{
  const n = fallos.length;
  for (const a of T.revisaAudio(A.audio028, { fps, duracion: DURACION })) mal(`revisaAudio: ${a}`);
  const ganancias = [];
  for (const c of conVoz) {
    if (!existsSync(join(PUBLICO, c.audio))) {
      mal(`${c.id}: no existe remotion/public/${c.audio}`);
      continue;
    }
    const { ini, fin } = vozDe(c);
    if (ini < c.en + T.DESCLIC_VOZ) mal(`${c.id}: empieza a hablar en f${ini}, dentro del desclic de entrada (hasta f${c.en + T.DESCLIC_VOZ})`);
    if (fin > c.en + c.dur - T.DESCLIC_VOZ) mal(`${c.id}: su última palabra acaba en f${fin}, dentro del desclic de salida`);
    const g = 20 * Math.log10(T.gananciaHasta(c.voz.lufs, M.OBJETIVO_LUFS));
    if (Math.abs(g) > 6) mal(`${c.id}: ganancia de voz ${g.toFixed(1)} dB (|g| > 6)`);
    ganancias.push(`${c.id.replace(/^m\d+-/, "")} ${g >= 0 ? "+" : ""}${g.toFixed(1)} dB`);
  }
  const cta = byId("m14-cta");
  const hook = byId("m02-hook");
  // REV. 1 («necesito que la voz cuando habla Isabella tenga más decibeles sin saturar»): la voz a −15 LUFS (el nivel de la música sola) y, en lo
  // que SUENA —el WAV tratado, en la ventana de su tramo, con su ganancia—, el pico real por debajo de −1 dBTP. Medido, no supuesto: ebur128.
  if (M.OBJETIVO_LUFS !== VOZ_OBJETIVO) mal(`OBJETIVO_LUFS = ${M.OBJETIVO_LUFS}; el usuario pidió la voz más fuerte: ${VOZ_OBJETIVO} LUFS`);
  for (const t of A.vocesTomas) {
    if (!/rc14-voz\.wav$/.test(t.src)) mal(`${t.id}: suena ${t.src}; la voz que suena es la tratada (rc14-voz.wav), la cruda satura a −15 LUFS`);
    const r = ejecutar("ffmpeg", ["-nostdin", "-hide_banner", "-ss", String(t.desde), "-t", String(t.dur / fps), "-i", join(PUBLICO, t.src), "-af", "ebur128=peak=true:framelog=quiet", "-f", "null", "-"]);
    const tp = Number((/Peak:\s+(-?[\d.]+) dBFS/.exec(r.stderr ?? r.stdout) ?? [])[1]);
    const g = typeof t.ganancia === "number" ? t.ganancia : 1;
    const pico = tp + 20 * Math.log10(g);
    if (!Number.isFinite(pico) || pico > TECHO_VOZ_DBTP) mal(`${t.id}: pico real ${Number.isFinite(pico) ? pico.toFixed(1) : "no medible"} dBTP con su ganancia; el techo es ${TECHO_VOZ_DBTP} (más, y satura)`);
    else ganancias.push(`pico ${pico.toFixed(1)} dBTP`);
  }
  const vozCta = A.vocesTomas.find((t) => t.id === `voz-${cta.id}`);
  if (!vozCta || vozCta.en + vozCta.dur > vozDe(cta).fin + A.COLA_VOZ_CTA) mal(`la voz del CTA sigue sonando después de f${vozDe(cta).fin + A.COLA_VOZ_CTA}: tras «contáctame» el micro solo recoge golpes graves`);
  const cola = DURACION - vozDe(cta).fin;
  if (cola < COLA_FINAL[0] || cola > COLA_FINAL[1]) mal(`${cola} f entre la última palabra y el final (entre ${COLA_FINAL.join(" y ")})`);
  const musica = A.audio028.find((t) => t.id === "musica");
  if (!musica || musica.src !== "recorrido-028/musica-028.wav") mal("no suena «Street Level Sessions on the Green» (recorrido-028/musica-028.wav)");
  else {
    const nivel = (f) => T.volumenDe(musica, f - musica.en);
    const arriba = A.ALTO;
    if (Math.abs(musica.desde - M.INICIO_MUSICA) > 1e-9) mal(`la música arranca en ${musica.desde} s y INICIO_MUSICA dice ${M.INICIO_MUSICA}`);
    const finArchivo = (M.FIN_PISTA - M.INICIO_MUSICA) * fps;
    if (musica.en !== 0 || musica.dur !== M.FIN_MUSICA_028) mal(`la música ocupa f${musica.en}-${musica.en + musica.dur}; va de 0 a FIN_MUSICA_028 (f${M.FIN_MUSICA_028})`);
    if (M.FIN_MUSICA_028 > finArchivo + 1e-9) mal(`la música acaba en f${M.FIN_MUSICA_028} y la canción llega al silencio en f${finArchivo.toFixed(1)}`);
    if (M.FIN_MUSICA_028 > DURACION - 2) mal(`la música acaba en f${M.FIN_MUSICA_028} y la pieza en f${DURACION}: ≥ 2 f antes`);
    const durWav = puerta.duracionDe(musica.src);
    if (M.INICIO_MUSICA + musica.dur / fps > durWav) mal(`la música se lee hasta ${(M.INICIO_MUSICA + musica.dur / fps).toFixed(2)} s y el WAV dura ${durWav.toFixed(2)}`);
    // El golpe de entrada suena a su nivel (el f0 impacta).
    if (nivel(1) < arriba * 0.95) mal("en el f1 la música no está a su nivel: el golpe de entrada tiene que sonar entero");
    // Baja ANTES de que ella hable, se queda abajo mientras habla y queda ≥ 9 LU bajo su voz.
    let techoLufs = -Infinity;
    const filas = [];
    for (const c of conVoz) {
      const { ini, fin } = vozDe(c);
      if (nivel(ini) > arriba * 0.2) mal(`${c.id}: la música aún no ha bajado cuando entra su primera palabra (f${ini}): la curva acaba ANTES de que hable`);
      let peor = 0;
      for (let f = ini; f <= fin; f++) peor = Math.max(peor, nivel(f));
      if (peor > arriba * 0.2) mal(`${c.id}: durante su voz la música llega a ${(20 * Math.log10(peor / arriba)).toFixed(1)} dB bajo su nivel; tiene que estar por debajo de −14 dB`);
      const lufs = A.LUFS_CANCION_EN_VOZ[c.id];
      if (lufs === undefined) mal(`${c.id}: falta su sonoridad medida en LUFS_CANCION_EN_VOZ (audio-028.ts)`);
      else techoLufs = Math.max(techoLufs, lufs + 20 * Math.log10(peor));
      filas.push(`${c.id.replace(/^m\d+-/, "")} ${(20 * Math.log10(peor / arriba)).toFixed(1)} dB`);
    }
    const bajoVoz = M.OBJETIVO_LUFS - techoLufs;
    if (bajoVoz < 9) mal(`bajo la voz la música llega a ${techoLufs.toFixed(1)} LUFS: ${bajoVoz.toFixed(1)} LU bajo ella; tienen que ser ≥ 9`);
    // Vuelve arriba antes del golpe en que la cámara arranca por la sala.
    const sala = videos.find((c) => c.meseta === "sala");
    if (nivel(sala.en) < arriba * 0.95) mal(`en el golpe en que la cámara arranca por la sala (f${sala.en}) la música está a ${(20 * Math.log10(nivel(sala.en) / arriba)).toFixed(1)} dB: tiene que haber vuelto arriba`);
    // Todo el paseo, arriba (el respiro es de la canción, no de la mezcla).
    for (let f = sala.en; f < vozDe(cta).ini - 20; f++) {
      if (nivel(f) < arriba * 0.95) {
        mal(`f${f}: en pleno paseo la música está bajada (${(20 * Math.log10(nivel(f) / arriba)).toFixed(1)} dB)`);
        break;
      }
    }
    if (fallos.length === n) {
      ok(
        `2 tomas con su WAV, ninguna palabra en un desclic, a ${M.OBJETIVO_LUFS} LUFS (${ganancias.join(" · ")}) · ${cola} f desde la última palabra hasta el final · la música entra en su golpe a su nivel, baja a ${filas.join(" · ")} antes de cada voz, ${bajoVoz.toFixed(1)} LU bajo ella como poco, vuelve arriba en f${sala.en} y se acaba en f${M.FIN_MUSICA_028}`
      );
    }
  }
  void hook;
}

/* 6 · subtítulos ────────────────────────────────────────────────────────── */
seccion("6. subtítulos editoriales");
{
  const n = fallos.length;
  if (E.modoTextoDe(CANAL) !== "editorial") mal(`el canal está en modo «${E.modoTextoDe(CANAL)}»`);
  const letra = E.letraSubtitulosDe(CANAL);
  const acentoMenos = puerta.modulos.subtitulos.ACENTO_MENOS_028;
  for (const a of E.revisaSubtitulosEditoriales(bloques, { fps, ancho: 1080, alto: 1920, duracion: DURACION, letra, acentoMenos })) mal(`revisaSubtitulosEditoriales: ${a}`);
  if (acentoMenos !== ACENTO_MENOS_PEDIDO) mal(`ACENTO_MENOS_028 = ${acentoMenos}; el canal pide ${ACENTO_MENOS_PEDIDO}`);
  if (!/<SubtitulosEditoriales\b[^>]*\bacentoMenos=\{ACENTO_MENOS_028\}/.test(fuenteComp)) mal("la composición no le pasa `acentoMenos={ACENTO_MENOS_028}` a <SubtitulosEditoriales>");
  const mOp = /export const OPACIDAD_SUBTITULOS\s*=\s*([0-9.]+)/.exec(fuenteComp);
  if (!mOp || Math.abs(Number(mOp[1]) - OPACIDAD_PEDIDA) > 1e-9) mal(`OPACIDAD_SUBTITULOS = ${mOp ? mOp[1] : "?"}; el canal pide ${OPACIDAD_PEDIDA}`);
  for (const b of bloques) if ((b.posicion ?? "abajo") !== "abajo") mal(`[${b.id}] va ${b.posicion}: los subtítulos de Isabella van abajo`);
  const ventanas = conVoz.map(vozDe);
  for (const b of bloques) for (const t of b.trozos) if (!ventanas.some((v) => t.desde >= v.ini - HOLGURA_TROZO && t.desde <= v.fin)) mal(`[${b.id}] «${t.texto}» entra en f${t.desde}, donde nadie habla`);
  const texto = bloques.flatMap((b) => b.trozos.map((t) => t.texto)).join(" ");
  if (/\d/.test(texto)) mal("hay una cifra en los subtítulos: esta pieza no lleva ninguna");
  if (bloques.some((b) => b.trozos.some((t) => t.estilo === "dato"))) mal("hay un dato grande: esta pieza no lleva ninguno");
  const acentos = bloques.reduce((s, b) => s + b.trozos.filter((t) => t.estilo === "acento").length, 0);
  if (fallos.length === n) ok(`${bloques.length} bloques, ${acentos} acentos · validador sin avisos con las letras del canal · todo abajo, a ${OPACIDAD_PEDIDA * 100} % · cursiva ${ACENTO_MENOS_PEDIDO} px menor · cada trozo sobre su voz · sin cifras`);
}

/* 7 · formato ───────────────────────────────────────────────────────────── */
seccion("7. metraje disponible");
puerta.metrajeDisponible();
seccion("7a. tramos disjuntos");
puerta.tramosDisjuntos();

/* 7b · lo que comparte con las versiones anteriores (informa) ─────────────── */
seccion("7b. metraje que comparte con las versiones anteriores de One Living (informa: el encargo es TODO RC14)");
{
  const tramos = (lista) => {
    const porClip = new Map();
    for (const c of lista) {
      if (c.tipo === "foto") continue;
      const vel = c.velocidad ?? 1;
      const solape = F.solapeDe(c);
      const inicio = Math.max(0, F.arranqueEnFuente(c, solape, fps)) + solape * vel;
      const clip = c.src.split("/").pop();
      if (!porClip.has(clip)) porClip.set(clip, []);
      porClip.get(clip).push({ id: c.id, a: inicio / fps, b: (inicio + c.dur * vel) / fps });
    }
    return porClip;
  };
  const mios = tramos(cortes).get("rc14.mp4") ?? [];
  for (const v of VERSIONES_ANTERIORES) {
    if (!existsSync(join(RAIZ, v.plan))) {
      console.log(`  ℹ️  no hay ${v.plan}: nada que comparar con ${v.nombre}`);
      continue;
    }
    const otra = await cargaTs({ v: join(RAIZ, v.plan) });
    const suyos = (tramos(otra.v[v.cortes]).get("rc14.mp4") ?? []);
    for (const y of suyos) {
      const comun = mios.reduce((s, x) => s + Math.max(0, Math.min(x.b, y.b) - Math.max(x.a, y.a)), 0);
      if (comun > 0.05) console.log(`  ℹ️  RC14 ${y.a.toFixed(1)}-${y.b.toFixed(1)} s (el ${y.id} de ${v.nombre}) sale aquí también: ${comun.toFixed(1)} s de fuente`);
    }
  }
}
seccion("8. encuadre");
puerta.encuadre({ techoZoom: TECHO_ZOOM });

/* 11 · nada «por confirmar» (solo con --final) ──────────────────────────── */
{
  const final = process.argv.includes("--final");
  const carpetas = [join(RAIZ, "remotion", "src", "proyectos", "028"), join(RAIZ, "proyectos", "028", "voz")];
  const marcador = /por confirmar|confirmar al o[ií]do/i;
  const pendientes = [];
  for (const carpeta of carpetas) {
    if (!existsSync(carpeta)) continue;
    for (const nombre of readdirSync(carpeta)) {
      if (!/\.(ts|tsx|txt)$/.test(nombre)) continue;
      readFileSync(join(carpeta, nombre), "utf8")
        .split("\n")
        .forEach((linea, i) => {
          if (marcador.test(linea)) pendientes.push(`${nombre}:${i + 1}: ${linea.trim().slice(0, 140)}`);
        });
    }
  }
  seccion(`11. nada por confirmar${final ? " (--final)" : " (avisa; con --final falla)"}`);
  if (!pendientes.length) ok("ni un «por confirmar» en los planos ni en los guiones de voz");
  else if (final) for (const p of pendientes) mal(`pendiente con el usuario: ${p}`);
  else for (const p of pendientes) console.log(`  ⚠️  por confirmar: ${p}`);
}

puerta.cierra(`el 028 pasa la puerta: ${videos.length} trozos de RC14, ${bloques.length} bloques de texto, ${A.audio028.length} tramos de audio`);
