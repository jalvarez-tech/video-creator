#!/usr/bin/env node
/**
 * armar-docs.mjs NNN — escribe `proyectos/NNN/artefactos/01-plan.md`, `02-layout.md`, `03-timeline.md` y `combinaciones.md` desde `pieza.json` y `medidas/reparto.json` (lo que `montar-retiro.mjs` calculó).
 * Los números de las tablas son los del plan: si el reparto cambia, se vuelve a ejecutar. Lo que se escribe a mano (decisiones, dudas) vive en `pieza.json` (`decisiones`, `confirmar`, `pendiente`).
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const N = process.argv[2];
const J = (rel) => JSON.parse(fs.readFileSync(path.join(RAIZ, rel), "utf8"));
const P = J(`proyectos/${N}/pieza.json`);
const R = J(`proyectos/${N}/medidas/reparto.json`);
const MED = J(`proyectos/${N}/medidas/ventanas-musica.json`);
const s = (f) => (f / 30).toFixed(1).replace(".", ",");
const filas = [...R.planos.map((p) => ({ ...p })), { id: "c11-cta", en: R.cta.en, dur: R.cta.dur, db: R.cta.db }];
const por = Object.fromEntries(filas.map((f) => [f.id, f]));
const dur = R.duracion;
const sub = (id) => P[{ "c02-hook": "hook", "c05-mitad": "mitad", "c11-cta": "cta" }[id]];
const tomas = [
  ["c02-hook", "Hook", P.hook],
  ["c05-mitad", "Mitad", P.mitad],
  ["c11-cta", "CTA", P.cta],
];
const clipDe = (id) => (id === "c01-exterior" ? P.apertura : id === "c11-cta" ? P.cta : id === "c02-hook" ? P.hook : id === "c05-mitad" ? P.mitad : [...P.rapidos, ...P.recorrido].find((r) => r.id === id));
const hoy = "2026-11-11";
const rutaMusica = path.join(RAIZ, "proyectos", N, "original", P.musicaOriginal);
const shaMusica = fs.existsSync(rutaMusica) ? crypto.createHash("sha256").update(fs.readFileSync(rutaMusica)).digest("hex") : "(el corte no está en original/)";

const plan = `# 01 · Plan narrativo — proyecto ${N} (${P.v})

> ${P.titulo} Reel 9:16 de **Casa El Retiro · Senderos de Compostela** (Propiedades Luxur, COP 2.800 M), montado el ${hoy} con el rodaje de ese día. Estilo de música: **${P.estilo}**.

## Cabecera

\`9:16 · 1080×1920 · 30 fps · ${dur} f (${s(dur)} s) · estilo «Lujo / Redes» del canal Luxur · texto \`editorial\` en UNA sola fuente, SIN ficha (la versión con ficha va después del visto bueno) · marca Luxur SIN sello\`

| | |
|---|---|
| Material | Del rodaje del 2026-11-11 (\`archivos/material/casa-el-retiro-senderos-de-compostela.md\`): ${[P.hook, P.mitad, P.cta].map((t) => t.clip.toUpperCase()).join(" · ")} (guion ${P.guion}), ${P.apertura.clip.toUpperCase()}, ${[...P.rapidos, ...P.recorrido].map((r) => r.clip.toUpperCase()).join(" · ")}. Normalizado con \`proyectos/${N}/normalizar.mjs\` en \`remotion/public/recorrido-${N}/\` |
| Canción | «${P.cancion}» — ${P.fuenteMusica}. Entra en el segundo ${R.inicioMusica.toFixed(3)} del corte (golpe de ${R.golpeEntrada.db} dB en el f3). **Sin oír**: el reparto por estilo es por tono medido |
| Destino | Reels |
| Objetivo | Que quien solo mira diez segundos haya visto la casa, a Isabella y dos planos vistosos, y la mitad entre en el segundo ${s(por["c05-mitad"].en)} |

## La estructura («lo vendible antes del segundo 10», \`recorrido-luxur\` §3)

| # | Bloque | Qué | Tiempo |
|---|---|---|---|
| 1 | Toma inicial | ${P.apertura.clip.toUpperCase()}: ${P.apertura.titulo}. Sin texto ni voz | 0,0-${s(por["c02-hook"].en)} s |
| 2 | Hook | Isabella (${P.hook.clip.toUpperCase()}): «${P.hook.voz.dice}» | ${s(por["c02-hook"].en)}-${s(por[P.rapidos[0].id].en)} s |
| 3 | Dos planos rápidos | ${P.rapidos.map((r) => `${r.clip.toUpperCase()} (${s(por[r.id].dur)} s)`).join(" · ")} | ${s(por[P.rapidos[0].id].en)}-${s(por["c05-mitad"].en)} s |
| 4 | Mitad | Isabella (${P.mitad.clip.toUpperCase()}): «${P.mitad.voz.dice}» | ${s(por["c05-mitad"].en)}-${s(por[P.recorrido[0].id].en)} s |
| 5 | Recorrido inmersivo | ${P.recorrido.map((r) => r.clip.toUpperCase()).join(" → ")} (la vista, el plano más largo) | ${s(por[P.recorrido[0].id].en)}-${s(por["c11-cta"].en)} s |
| 6 | CTA y cierre | Isabella (${P.cta.clip.toUpperCase()}): «${P.cta.voz.dice}» · tarjeta oscura con el logo y la web | ${s(por["c11-cta"].en)}-${s(dur)} s |

## Por qué (decisiones)

${(P.decisiones ?? []).map((d) => `- ${d}`).join("\n") || "- (ver \`combinaciones.md\`)"}

## Reglas del canal que cumple (y la puerta comprueba)

Primera toma sin texto ni voz · nunca el sello · cierre = tarjeta oscura con logo (440 px, 60 %) y web · nada congelado (el CTA funde a negro y no se repite el último fotograma) · una sola fuente en los subtítulos · ficha y subtítulos nunca juntos (esta es la versión normal: sin ficha) ·
voz a −15 LUFS con pico real ≤ −1 dBTP · música sola a −15 LUFS y ≈ ${-15 - (P.musicaBajoVoz ?? -30)} LU bajo la voz mientras habla, con curva de coseno que **acaba antes de la primera palabra** · cada corte seco, en un golpe MEDIDO de la canción.

## Supuestos sin confirmar / por decidir

${(P.pendiente ?? []).map((d) => `- ${d}`).join("\n") || "- (ninguno)"}
${(P.confirmar ?? []).map((d) => `- **POR CONFIRMAR AL OÍDO:** ${d}`).join("\n")}

## Lo que NO se cuenta

Valorización ni rentabilidad; el precio (COP 2.800 M) y las áreas van al caption y a la versión con ficha: Isabella no dice ninguna cifra en estas tres tomas.
`;

const layout = `# 02 · Layout — proyecto ${N}

Lienzo 1080×1920 (9:16). Texto en modo \`editorial\`, una sola fuente (Montserrat), al 90 % de opacidad, **abajo**: bloque de subtítulos con el borde superior al 74,5 % del alto (y ≈ 1430), hasta tres líneas, sin pasar de y 1690. **Arriba no hay texto**, ni dato, ni sello.
Velo de los subtítulos: degradado inferior de 780 px (alfa 0,72 → 0,5 → 0), solo mientras hay texto. La versión con ficha (después) lleva la ficha en y 1220-1420 (dentro del recorte 1:1, y 420-1500) y no lleva subtítulos.
Cierre: tarjeta oscura (negro de la marca) con el logo de 440 px al 60 % y «PropiedadesLuxur.com» (Montserrat 500, 54 px), centrados en y ≈ 795-1085.
Isabella ocupa el centro del cuadro en las tres tomas; los planos de recorrido y dron van a pantalla completa, con zoom de 1,0 (quietos: la cámara ya se mueve).
`;

const lineas = filas
  .map((f) => {
    const c = clipDe(f.id);
    const voz = sub(f.id);
    return `| ${f.id} | ${(c?.reason ?? "").split(":")[0].split(" (")[0].slice(0, 40)} | ${c?.clip?.toUpperCase() ?? ""} | ${f.en} | ${f.dur} | ${c?.desde ?? (voz?.desdeF ?? Math.max(0, Math.round(voz.voz.s0 * 30) - 12)) + " f"} | ${voz ? `${voz.voz.s0}-${voz.voz.s1} s` : "—"} | corte | ${f.db.toFixed(1)} dB |`;
  })
  .join("\n");
const timeline = `# 03 · Timeline — proyecto ${N}

30 fps · ${dur} f (${s(dur)} s). Cada plano entra A CORTE en un golpe MEDIDO de la canción (\`GOLPE\` de \`metraje-${N}.ts\`; \`proyectos/${N}/musica/golpes-cancion-entera.json\`). Planos contiguos.

| plano | espacio / función | clip | \`en\` | \`dur\` | \`desde\` | voz en el clip | entrada | golpe |
|---|---|---|---|---|---|---|---|---|
| c01-exterior | ${P.apertura.titulo} (la promesa) | ${P.apertura.clip.toUpperCase()} | 0 | ${R.planos[0].en} | ${P.apertura.desde} | — | corte (f3: ${R.golpeEntrada.db} dB) | — |
${lineas}
| c12-cierre | tarjeta oscura (logo y web) | foto | ${R.cta.en + R.cta.dur} | ${dur - R.cta.en - R.cta.dur} | — | — | corte | — |

## Por plano (por qué se ve ahora)

${filas.map((f) => `- **${f.id}** (f${f.en}-${f.en + f.dur}, ${s(f.dur)} s): ${clipDe(f.id).reason}`).join("\n")}

## La música, en LUFS (ebur128 sobre cada ventana de la canción; \`medidas/ventanas-musica.json\`)

| tramo | canción sola | ganancia para −15 LUFS |
|---|---|---|
| apertura (f3-f${R.planos[0].en}) | ${MED.apertura.lufs} LUFS · pico ${MED.apertura.pico} dBFS | ${(-15 - MED.apertura.lufs).toFixed(1)} dB |
| dos planos rápidos | ${MED.paseo.lufs} LUFS · pico ${MED.paseo.pico} dBFS | ${(-15 - MED.paseo.lufs).toFixed(1)} dB |
| recorrido | ${MED.bloque5.lufs} LUFS · pico ${MED.bloque5.pico} dBFS | ${(-15 - MED.bloque5.lufs).toFixed(1)} dB |
| bajo el hook · la mitad · el CTA | ${MED["c02-hook"].lufs} · ${MED["c05-mitad"].lufs} · ${MED["c11-cta"].lufs} LUFS | a ${P.musicaBajoVoz ?? -30} LUFS (${-15 - (P.musicaBajoVoz ?? -30)} LU bajo la voz de −15) |
`;

const comb = `# Combinaciones — proyecto ${N} (${P.v})

## Versiones

| versión | proyecto | qué | estado |
|---|---|---|---|
| ${P.v} | ${N} | guion ${P.guion} (${P.hook.clip.toUpperCase()} · ${P.mitad.clip.toUpperCase()} · ${P.cta.clip.toUpperCase()}) con «${P.cancion}» (${P.estilo.split(" — ")[0]}); versión NORMAL (subtítulos, sin ficha) | prueba 720p ${hoy}, sin oír; **la final, la portada y la versión con ficha esperan el visto bueno** |

## Cómo cambiar cada pieza

- **Un plano:** en \`proyectos/${N}/pieza.json\` el \`clip\` y el \`desde\` del plano (y sus \`min\`/\`max\`); \`node proyectos/088/herramientas/montar-retiro.mjs ${N}\` rehace \`metraje-${N}.ts\` y \`audio-${N}.ts\` con cada corte en un golpe medido. Si el clip es nuevo, entra en \`MATERIAL\` de \`normalizar.mjs\` (con su sha) y se normaliza. Después \`node proyectos/088/herramientas/armar-subtitulos.mjs ${N}\` (los frames de los subtítulos dependen de dónde entra cada toma) y \`node proyectos/${N}/revisar-${N}.mjs\`.
- **La música:** \`golpeEntrada\` (el golpe de la canción que cae en el f3; \`--entrada <t> --solo-plan\` prueba otras sin escribir) y \`musicaOriginal\`; la pista se corta del WAV decodificado del mix (nunca con \`-ss\` sobre el MP3) y se mide con \`medir-pista.py --json\`.
- **Una frase de Isabella:** su \`voz.s0/s1\` (\`limites-voz.py --margen 40\`), el guion marcado \`voz/<toma>.txt\` y la ganancia de \`normalizar.mjs\` (\`probar-voz.py --proyecto ${N}\`).

## Música

${P.fuenteMusica}. MP3 del mix: \`/Volumes/SSK SSD/Work/Propiedades Luxur/Casa - El Retiro - Senderos de Compostela/\` (no se versiona). El corte usado está en \`proyectos/${N}/original/${P.musicaOriginal}\` (gitignored) y su reserva en \`archivos/musica/registro-de-uso.md\`. **sha256 del corte (WAV de 48 kHz estéreo):** \`${shaMusica}\`.

## Metraje que comparte con las otras piezas de la casa

${(P.comparte ?? []).map((d) => `- ${d}`).join("\n") || "- (ver la sección 7b de la puerta)"}

## Por confirmar

${(P.confirmar ?? []).map((d) => `- **Al oído:** ${d}`).join("\n")}
${(P.pendiente ?? []).map((d) => `- ${d}`).join("\n")}
`;
const w = (rel, t) => fs.writeFileSync(path.join(RAIZ, rel), t);
w(`proyectos/${N}/artefactos/01-plan.md`, plan);
w(`proyectos/${N}/artefactos/02-layout.md`, layout);
w(`proyectos/${N}/artefactos/03-timeline.md`, timeline);
w(`proyectos/${N}/combinaciones.md`, comb);
console.log(`artefactos y combinaciones de ${N} escritos`);
