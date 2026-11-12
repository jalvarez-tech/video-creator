#!/usr/bin/env node
/**
 * documentar-pieza.mjs — escribe los tres artefactos (`01-plan`, `02-layout`, `03-timeline`) y `combinaciones.md` de una pieza de la tanda 080-087 a partir de su plan REAL (el `metraje-NNN.ts` que se renderiza)
 * y de su `pieza.json`: los números salen del plan, no se copian a mano.
 *
 *   node proyectos/080/herramientas/documentar-pieza.mjs 081
 *
 * Se vuelve a ejecutar cada vez que cambia el plan. Lo que no sale del plan (el ángulo, los porqués, lo por confirmar) sale de `pieza.json`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const NNN = process.argv[2];
if (!/^08[0-7]$/.test(NNN ?? "")) {
  console.error("uso: node proyectos/080/herramientas/documentar-pieza.mjs NNN   (080-087)");
  process.exit(1);
}
const lee = (rel) => fs.readFileSync(path.join(RAIZ, rel), "utf8");
const escribe = (rel, t) => {
  fs.mkdirSync(path.dirname(path.join(RAIZ, rel)), { recursive: true });
  fs.writeFileSync(path.join(RAIZ, rel), t);
};
const spec = JSON.parse(lee(`proyectos/${NNN}/pieza.json`));
const O = JSON.parse(lee(`proyectos/${NNN}/origen.json`));
const ORIG = spec.origen;
const FPS = 30;
const seg = (f) => (f / FPS).toFixed(1).replace(".", ",");
const s2 = (x) => x.toFixed(2).replace(".", ",");

const m = await cargaTs({ m: `remotion/src/proyectos/${NNN}/metraje-${NNN}.ts`, a: `remotion/src/proyectos/${NNN}/audio-${NNN}.ts`, c: `remotion/src/proyectos/${NNN}/cierre-${NNN}.ts` });
const plan = m.m[`metraje${NNN}`];
const GOLPE = m.m.GOLPE;
const golpeExacto = m.m.golpeExacto;
const DURACION = m.m[`DURACION_${NNN}`];
const A = m.a;
const clip = (c) => c.src.split("/").pop().replace(/\.(mp4|png)$/, "").toUpperCase();
const exterior = plan[0];
const hook = plan.find((c) => c.bloque === 2);
const rapidos = plan.filter((c) => c.bloque === 3);
const mitad = plan.find((c) => c.bloque === 4);
const recorrido = plan.filter((c) => c.bloque === 5);
const cta = plan.find((c) => c.bloque === 6 && c.audio);
const tarjeta = plan.at(-1);
const claveDe = (c) => {
  if (c === exterior) return "e0";
  if (c === hook) return "hook";
  if (c === rapidos[0]) return "rapido1";
  if (c === rapidos[1]) return "rapido2";
  if (c === mitad) return "mitad";
  if (c === cta) return "cta";
  const i = recorrido.indexOf(c);
  return i === recorrido.length - 1 ? "vista" : `r${i + 1}`;
};
const golpeDe = (c) => {
  const g = GOLPE[claveDe(c)];
  return g && c !== tarjeta ? `${g.t} s · ${g.db} dB` : "—";
};
const vozDe = (c) => ({ ini: c.en + Math.round(c.voz.s0 * FPS) - Math.round((c.desde ?? 0) * FPS), fin: c.en + Math.round(c.voz.s1 * FPS) - Math.round((c.desde ?? 0) * FPS) });
const tomas = { hook: vozDe(hook), mitad: vozDe(mitad), cta: vozDe(cta) };
const codigo = (c) => clip(c);
const terna = `${codigo(hook)} · ${codigo(mitad)} · ${codigo(cta)}`;

/* ── Metraje que comparte con las demás piezas del lote (070-087) ───────── */
const worktrees = path.join(RAIZ, "..");
const buscaPlan = (n) => {
  const rel = `remotion/src/proyectos/${n}/metraje-${n}.ts`;
  const cand = [path.join(RAIZ, rel), ...fs.readdirSync(worktrees).map((d) => path.join(worktrees, d, rel))];
  return cand.find((r) => fs.existsSync(r)) ?? null;
};
const tramos = (lista) =>
  lista
    .filter((c) => c.tipo === "video" && !c.audio)
    .map((c) => {
      const s = c.entra === "disolver" ? 12 : 0;
      const ini = (c.desde ?? 0) + s / FPS;
      return { id: c.id, clip: c.src.split("/").pop().replace(".mp4", ""), a: ini, b: ini + c.dur / FPS };
    });
const mios = tramos(plan);
const comparte = [];
for (const n of ["070", "071", "072", "073", "074", "075", "076", "077", "078", "079", "080", "081", "082", "083", "084", "085", "086", "087"]) {
  if (n === NNN) continue;
  const ruta = buscaPlan(n);
  if (!ruta) continue;
  try {
    const o = await cargaTs({ p: ruta });
    const suyos = tramos(o.p[`metraje${n}`]);
    const filas = [];
    let total = 0;
    for (const x of mios) for (const y of suyos) {
      if (x.clip !== y.clip) continue;
      const s = Math.min(x.b, y.b) - Math.max(x.a, y.a);
      if (s > 0.3) { filas.push(`${x.clip.toUpperCase()} ${s.toFixed(1).replace(".", ",")} s`); total += s; }
    }
    if (filas.length) comparte.push({ n, total, texto: filas.join(", ") });
  } catch {
    /* un plan que no carga no impide documentar */
  }
}

/* ── 01-plan.md ──────────────────────────────────────────────────────────── */
const confirmar = (spec.porConfirmar ?? []).map((n, i) => {
  const f = (t) => (t === "hook" ? tomas.hook : t === "mitad" ? tomas.mitad : tomas.cta);
  let texto = n.texto;
  if (n.s !== undefined) {
    const v = n.toma === "hook" ? hook : n.toma === "mitad" ? mitad : cta;
    const fr = v.en + Math.round(n.s * FPS) - Math.round((v.desde ?? 0) * FPS);
    texto = texto.replace("{hora}", `f${fr} = ${seg(fr)} s del vídeo`);
  }
  void f;
  return `${i + 1}. ${texto}`;
});
const filaEscena = (n, c, a, b, idea, hero, que) => `| ${n} | ${seg(a)}-${seg(b)} | ${c} | ${idea} | ${hero} | ${que} |`;
const escenas = [
  filaEscena(1, "El exterior", 0, hook.en, "la promesa", "el edificio", `${codigo(exterior)} ${s2(exterior.desde ?? 0)}-${s2((exterior.desde ?? 0) + hook.en / FPS)} s · solo música: golpe de ${GOLPE.e0.db} dB en el f3 · SIN texto ni voz`),
  filaEscena(2, "Hook", hook.en, rapidos[0].en, "la pregunta o la tesis", "Isabella", `${codigo(hook)} · «${hook.voz.dice}» (en la versión con ficha, la ficha entra en este mismo fotograma)`),
  filaEscena(3, "DOS planos rápidos", rapidos[0].en, mitad.en, "lo más vistoso, antes del segundo 10", rapidos.map(codigo).join(" + "), `${rapidos.map((c) => `${codigo(c)} ${s2(c.desde ?? 0)}-${s2((c.desde ?? 0) + c.dur / FPS)} s (${(c.dur / FPS).toFixed(1).replace(".", ",")} s)`).join(" → ")} · solo música, a corte`),
  filaEscena(4, "Mitad", mitad.en, recorrido[0].en, "la condición, dicha", "Isabella", `${codigo(mitad)} · «${mitad.voz.dice}» (a corte, antes de los 11 s)`),
  filaEscena(5, "Recorrido inmersivo", recorrido[0].en, cta.en, "cómo se vive → la vista", codigo(recorrido.at(-1)), `${recorrido.map(codigo).join(" → ")} · solo música; la vista es el plano más largo (${(recorrido.at(-1).dur / FPS).toFixed(1).replace(".", ",")} s)`),
  filaEscena(6, "CTA y cierre", cta.en, DURACION, "invitar", "Isabella", `${codigo(cta)} · «${cta.voz.dice}» → funde a negro → tarjeta con el logo y la web`),
];
escribe(
  `proyectos/${NNN}/artefactos/01-plan.md`,
  `# 01 · Plan narrativo — proyecto ${NNN} (${spec.v})

> Variante B de la ${ORIG} (\`proyectos/${ORIG}\` en el worktree \`suite-hotelera-videos-e02d0b\`, sin commit) con la estructura «lo vendible antes del segundo 10» (\`recorrido-luxur\` §3, 2026-11-10). El andamio es el proyecto 079 (la 070 hecha así); el reparto de los cortes y los ficheros los escribe \`proyectos/080/herramientas/montar-pieza.mjs\` desde \`pieza.json\`.

## Cabecera

\`9:16 · 1080×1920 · 30 fps · ${DURACION} f (${seg(DURACION)} s) · estilo «Lujo / Redes» del canal Luxur · DOS versiones: normal (\`Recorrido${NNN}\`: subtítulos en una sola fuente, sin ficha) y con ficha (\`Recorrido${NNN}Ficha\`: sin subtítulos, ficha abajo) · marca Luxur SIN sello\`

| | |
|---|---|
| Pedido | «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva» como proyectos 080-087 (V61-V68); este es el ${ORIG} → ${NNN} (**${spec.v}**). |
| La propiedad | Suite hotelera en **venta** en Go Living Suites, El Poblado: 28,5 m², piso 9, se vende a puerta cerrada. Precio en la ficha: **539 M COP** (\`.claude/skills/ficha-luxur/propiedades/suite-go-living.json\`). |
| Terna de voz | ${terna} (la de la ${ORIG}, sin cambios) · exterior ${codigo(exterior)} |
| Canción | «${spec.cancion}», la de la ${ORIG} y con la MISMA entrada (${O.INICIO_MUSICA.toFixed(3)} s). **No es una versión nueva de la propiedad sino la variante B de la ${spec.v === "V61" ? "V52" : `V${Number(spec.v.slice(1)) - 9}`}: por eso repite canción (declarado).** |
| Material | El normalizado de la ${ORIG} (\`remotion/public/recorrido-${NNN}/\`, clon de \`recorrido-${ORIG}/\` y de sus hermanos): ${[...new Set(plan.filter((c) => c.tipo === "video").map(codigo))].join(" · ")} |
| Destino | Reels · y la versión con ficha para anuncios (1:1) |
| Objetivo | Que quien solo mira diez segundos sepa qué se vende, dónde y a cuánto, y haya visto la suite |

## El ángulo: ${spec.angulo}

Lo dicho es lo de la ${ORIG}: ${hook.voz.dice} · ${mitad.voz.dice} · ${cta.voz.dice} Nada de lo que se dice ni se escribe promete valorización ni rentabilidad ni afirma qué exige el POT.

## La estructura

| # | Tramo (s) | Bloque | Idea | Hero | Lo que se ve / se oye |
|---|---|---|---|---|---|
${escenas.join("\n")}

## Decisiones

- **El orden cambia, lo dicho no.** El hook sigue en el mismo frame (f${hook.en}); la mitad entra en el f${mitad.en} (${seg(mitad.en)} s, antes de los 11 s${(mitad.desde ?? 0) > 0 && mitad.entra === "corte" ? `; \`desde\` ${Math.round(mitad.desde * FPS)} f para que la frase quepa entre este golpe y el del f${recorrido[0].en}` : ""}) y el CTA, en el mismo golpe de la ${ORIG} (f${cta.en}).
- **Los dos planos rápidos** son ${rapidos.map((c) => `${codigo(c)} (${(c.dur / FPS).toFixed(1).replace(".", ",")} s)`).join(" y ")}: empiezan en ${seg(rapidos[0].en)} y ${seg(rapidos[1].en)} s (antes del 10) y ninguno pasa de 2,5 s. Ninguna otra pieza de la tanda abre con ese par ni con un tramo suyo.
- **Un solo recorrido** de ${recorrido.length} planos (${recorrido.map(codigo).join(" → ")}), cada cambio en un golpe medido; la vista (${codigo(recorrido.at(-1))}) es el último y el más largo.
- **La música baja bajo la voz y sube tras ella** con curva de coseno; sus niveles se midieron de nuevo en las ventanas nuevas (\`medidas/ventanas-musica.json\`: apertura ${A.LUFS_TRAMO.apertura} · dos planos rápidos ${A.LUFS_TRAMO.paseo} · recorrido ${A.LUFS_TRAMO.bloque5} LUFS de la canción).
${spec.T1SinGolpe ? `- **Excepción heredada de la ${ORIG}:** la salida del hook (f${rapidos[0].en}) no cae en un golpe: el clip del hook acaba pocos frames tras su última palabra; la música sube sobre el corte.\n` : ""}${spec.fuerzaMinEntrada ? `- **Golpe de entrada más flojo (${GOLPE.e0.db} dB, heredado de la ${ORIG})**: la puerta lo admite declarado (\`fuerzaMinEntrada\`).\n` : ""}
## Por confirmar al oído (R31)

${confirmar.join("\n") || "Ninguna."}

## Lo que NO se cuenta

Qué exige el POT ni que la suite lo cumpla; valorización ni rentabilidad. No se usa MD05 ni CT05 (prometen valorización) ni MD07; la tienda (ZS05) solo desde donde ya no se lee la marca de terceros.
`
);

/* ── 02-layout.md ────────────────────────────────────────────────────────── */
const ficha = m.m;
void ficha;
escribe(
  `proyectos/${NNN}/artefactos/02-layout.md`,
  `# 02 · Layout — proyecto ${NNN}

Lienzo 1080 × 1920. Dos composiciones con el mismo metraje y el mismo audio; ficha y subtítulos NUNCA juntos.

| Capa | Dónde | Normal (\`Recorrido${NNN}\`) | Con ficha (\`Recorrido${NNN}Ficha\`) |
|---|---|---|---|
| \`PistaMetraje\` + \`FundidoACierre\` | cuadro entero | sí | sí |
| Velo + subtítulos (90 %, UNA sola fuente: Montserrat) | abajo, y ≈ 1440-1600, centrados | mientras habla Isabella | no |
| Ficha (\`ficha-${NNN}.ts\`) | abajo a la izquierda: filete dorado en x 96, texto en x 130, y 1220-1420; velo radial | no | f${hook.en} (entra en 15 f) → f${cta.en + cta.dur - 1 - 6} (sale en 12 f) |
| Logo y web | centrados, y ≈ 940 | tarjeta del cierre | tarjeta del cierre |

- La ficha cabe ENTERA en el recorte 1:1 de Facebook y del feed (y 420-1500), con 80 px de aire por debajo: es el diseño aprobado de \`ficha-luxur\`, sin mover.
- Frame 0: el exterior limpio en las dos versiones (regla fija del canal). La ficha entra con el hook, no en el fotograma 0.
`
);

/* ── 03-timeline.md ──────────────────────────────────────────────────────── */
const filaT = (c) => {
  const idx = plan.indexOf(c);
  const voz = c.audio ? `f${vozDe(c).ini}-${vozDe(c).fin} «${c.voz.dice}»` : "—";
  const musica = c === exterior ? "sola" : c === hook || c === mitad ? "baja en 10 f; sube tras la última palabra" : c === cta ? "baja en 10 f; se apaga con curva" : c === tarjeta ? "llega a cero" : "sola";
  return `| ${c.en}-${c.en + c.dur} | ${seg(c.en)}-${seg(c.en + c.dur)} | ${c.bloque} | ${c.tipo === "foto" ? "tarjeta oscura, logo y web" : `${clip(c)}${c.audio ? ", Isabella" : ""} desde ${s2(c.desde ?? 0)} s`} | ${c.entra ?? "corte"} | ${golpeDe(c)} | ${voz} | ${musica} |`.replace("undefined", String(idx));
};
const nivel = (t) => `${t} LUFS`;
escribe(
  `proyectos/${NNN}/artefactos/03-timeline.md`,
  `# 03 · Timeline — proyecto ${NNN}

30 fps, frames absolutos. Cada cambio de plano cae en un golpe MEDIDO de «${spec.cancion}» (\`musica/golpes-cancion-entera.json\`); el frame sale de \`golpe()\` en \`metraje-${NNN}.ts\`. La puerta (\`node proyectos/${NNN}/revisar-${NNN}.mjs\`) sale con 0.

| frames | s | bloque | imagen | entra | golpe (s de la canción · dB) | voz | música |
|---|---|---|---|---|---|---|---|
${plan.map(filaT).join("\n")}

## La mezcla (niveles medidos con ebur128 sobre la canción, en las ventanas de ESTA pieza)

| Tramo | Canción (LUFS) | Música sola | Voz |
|---|---|---|---|
| Apertura (f0-${hook.en}) | ${nivel(A.LUFS_TRAMO.apertura)} (pico ${A.PICO_TRAMO.apertura} dBFS) | ${A.OBJETIVO_MUSICA.apertura} LUFS | — |
| Hook (f${hook.en}-${rapidos[0].en}) | ${nivel(Object.values(A.LUFS_CANCION_EN_VOZ)[0])} | baja a −26 LUFS en ${A.FADE_OUT.hook} f desde el golpe; sube tras la última palabra (f${tomas.hook.fin}) | −15 LUFS |
| Dos planos rápidos (f${rapidos[0].en}-${mitad.en}) | ${nivel(A.LUFS_TRAMO.paseo)} (pico ${A.PICO_TRAMO.paseo} dBFS) | ${A.OBJETIVO_MUSICA.paseo} LUFS | — |
| Mitad (f${mitad.en}-${recorrido[0].en}) | ${nivel(Object.values(A.LUFS_CANCION_EN_VOZ)[1])} | baja a −26 LUFS en ${A.FADE_OUT.mitad} f desde el golpe; sube tras la última palabra (f${tomas.mitad.fin}) antes del golpe del f${recorrido[0].en} | −15 LUFS |
| Recorrido (f${recorrido[0].en}-${cta.en}) | ${nivel(A.LUFS_TRAMO.bloque5)} (pico ${A.PICO_TRAMO.bloque5} dBFS) | ${A.OBJETIVO_MUSICA.bloque5} LUFS | — |
| CTA (f${cta.en}-${DURACION}) | ${nivel(Object.values(A.LUFS_CANCION_EN_VOZ)[2])} | baja a −26 LUFS en ${A.FADE_OUT.cta} f desde el golpe; tras la última palabra (f${tomas.cta.fin}) se apaga con curva hasta cero en el f${m.m[`FIN_MUSICA_${NNN}`]} | −15 LUFS |

Voz: cadena de \`normalizar.mjs\` (graves fuera 100 Hz · puerta suave · compresor 3,5:1 · ganancia buscada tras el compresor · limitador −2,5 dBFS), un WAV \`<toma>-voz.wav\` en silencio fuera de su frase. Excepción a R29, por encargo permanente del canal.
`
);

/* ── combinaciones.md ────────────────────────────────────────────────────── */
const filaCambia = (que, donde) => `| ${que} | ${donde} |`;
escribe(
  `proyectos/${NNN}/combinaciones.md`,
  `# ${NNN} — combinaciones y cómo cambiar cada parte

**${spec.v} · variante B de la ${ORIG}.** Misma terna (${terna}), mismo exterior (${codigo(exterior)}), misma canción («${spec.cancion}») y misma entrada. Cambia el ORDEN (estructura del 2026-11-10: \`artefactos/01-plan.md\`) y entra la ficha en pantalla. **Repite canción a propósito** (el usuario lo pidió: es la variante B de su original, no una versión nueva): declarado aquí y en \`archivos/musica/registro-de-uso.md\`.

| Qué | Dónde |
|---|---|
${filaCambia("El orden y la duración de los planos", `\`proyectos/${NNN}/pieza.json\` (los anclajes: T1 ${rapidos[0].en} · T2 ${rapidos[1].en} · T3 ${mitad.en} · B ${recorrido[0].en}; el CTA, en su golpe de la ${ORIG}) y \`node proyectos/080/herramientas/montar-pieza.mjs ${NNN}\`, que reescribe \`metraje-${NNN}.ts\`, \`audio-${NNN}.ts\`, \`subtitulos-${NNN}.ts\` y la puerta`)}
${filaCambia("Los dos planos rápidos", `\`pieza.json\` → \`rapidos\` (${rapidos.map((c) => `${codigo(c)} ${s2(c.desde ?? 0)}-${s2((c.desde ?? 0) + c.dur / FPS)} s`).join(" · ")})`)}
${filaCambia("El recorrido", `\`pieza.json\` → \`recorrido\` (${recorrido.map((c) => `${codigo(c)} ${s2(c.desde ?? 0)}-${s2((c.desde ?? 0) + c.dur / FPS)} s`).join(" → ")}); el generador reparte los cortes sobre los golpes medidos`)}
${filaCambia("El texto de la ficha", `\`ficha-${NNN}.ts\` (\`FICHA_${NNN}\`) Y \`.claude/skills/ficha-luxur/propiedades/suite-go-living.json\`: la puerta (2g) exige que coincidan`)}
${filaCambia("Las dos versiones", `\`composiciones.tsx\`: \`Recorrido${NNN}\` (normal: subtítulos en una fuente, sin ficha) y \`Recorrido${NNN}Ficha\` (prop \`ficha\`: ficha abajo, sin subtítulos). Nunca juntas`)}
${filaCambia("La música bajo la voz", `\`audio-${NNN}.ts\` (niveles medidos el 2026-11-10 sobre las ventanas nuevas: \`medidas/ventanas-musica.json\`, \`node proyectos/080/herramientas/montar-pieza.mjs ${NNN} --medir\`)`)}

**Para comprobar:** \`node proyectos/${NNN}/revisar-${NNN}.mjs\` · prueba: \`bash proyectos/080/herramientas/render-prueba.sh ${NNN}\` (la normal) y \`… ${NNN} ficha\`.

## Metraje compartido con otras piezas (informa; repetirlo es una decisión)

${comparte.length ? comparte.map((c) => `- **${c.n}**: ${c.texto}`).join("\n") : "Ninguno."}

Los dos planos rápidos de esta pieza no se solapan con los de ninguna otra de la tanda (\`node proyectos/080/herramientas/comparar-piezas.mjs\`). La vista (RC07 o su equivalente) acaba cada recorrido: es el único plano de la ciudad con esa amplitud y se declara.

## Por confirmar al oído

${confirmar.join("\n") || "Ninguna."}

## Dónde está lo demás

Los \`voz/*.txt\` y \`voz/*.json\` son los de la ${ORIG} (las mismas tomas); \`normalizar.mjs\` es su receta con el número cambiado y no se ha vuelto a ejecutar: el material de \`remotion/public/recorrido-${NNN}/\` es un clon del normalizado de la ${ORIG}. La final, la ficha y la portada se hacen con el sí del usuario (\`render-final.sh\`, \`render-ficha-comp.sh\`, \`portada-luxur\`, \`mover-al-ssd.sh\`).
`
);
console.log(`✅ ${NNN}: artefactos y combinaciones escritos (${comparte.length} piezas comparten metraje)`);
