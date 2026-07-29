#!/usr/bin/env node
/**
 * generar-catalogo.mjs — regenera `manuales/motion-graphics/catalogo-graficos.md`
 * a partir de las fichas de la biblioteca.
 *
 * Uso (desde cualquier sitio):
 *   node manuales/motion-graphics/scripts/generar-catalogo.mjs
 *
 * Por qué un generador y no un markdown a mano: un catálogo escrito a mano se
 * desincroniza en la tercera animación que añades, y entonces deja de servir
 * para lo único que sirve un catálogo — saber qué existe ya sin abrir el código.
 * La ÚNICA fuente de verdad es `remotion/src/plantillas/graficos/fichas.ts`.
 *
 * Cómo lee TypeScript sin dependencias nuevas: transpila `fichas.ts` con el
 * esbuild que Remotion ya trae instalado y lo importa. `fichas.ts` es datos
 * puros (sin React, sin imports), así que el bundle es trivial.
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(aqui, "..", "..", ".."); // …/video-creator
const fichasTs = path.join(root, "remotion", "src", "plantillas", "graficos", "fichas.ts");
const salidaMd = path.join(root, "manuales", "motion-graphics", "catalogo-graficos.md");

// esbuild vive en remotion/node_modules → resolvemos desde allí, no desde aquí.
const require = createRequire(path.join(root, "remotion", "package.json"));
const esbuild = require("esbuild");

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "catalogo-"));
const bundle = path.join(tmp, "fichas.cjs");

await esbuild.build({
  entryPoints: [fichasTs],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: bundle,
  logLevel: "error",
});

const { CATALOGO, FAMILIAS } = require(bundle);
fs.rmSync(tmp, { recursive: true, force: true });

const escapa = (s) => String(s).replace(/\|/g, "\\|");

let md = `# Catálogo de gráficos

> ⚠️ **Archivo generado.** No lo edites a mano: sale de
> \`remotion/src/plantillas/graficos/fichas.ts\`. Para actualizarlo:
> \`node manuales/motion-graphics/scripts/generar-catalogo.mjs\`

La versión VIVA de este catálogo es la composición **\`Catalogo\`** del Remotion
Studio (\`npm run dev\` en \`remotion/\`): ahí cada gráfico se ve animándose de
verdad, con su ficha al lado. Este markdown es para consultarlo sin abrir el Studio.

Uso: \`import { Titular, Contador, Subrayado } from "./graficos";\`

**${CATALOGO.length} gráficos** en ${FAMILIAS.length} familias.

`;

for (const fam of FAMILIAS) {
  const fichas = CATALOGO.filter((c) => c.familia === fam.id);
  if (fichas.length === 0) continue;
  md += `## ${fam.nombre}\n\n`;
  md += `| Gráfico | Qué es | Cuándo usarlo | Sonido | Archivo |\n`;
  md += `|---|---|---|---|---|\n`;
  for (const f of fichas) {
    md += `| **${escapa(f.nombre)}** | ${escapa(f.que)} | ${escapa(f.cuando)} | ${
      f.sonido ? escapa(f.sonido) : "—"
    } | \`${f.archivo}\` |\n`;
  }
  md += `\n`;
}

md += `---

## Cómo se usa la biblioteca

1. **Mira aquí antes de escribir un gráfico.** Si ya existe, úsalo; si existe
   parecido, añádele una prop en vez de duplicar el componente.
2. **Escribe el plan, no el JSX.** Para lo repetitivo (títulos, cifras, listas,
   remates) declara \`GraficoCue[]\` en \`graficos-00X.ts\` y móntalo con
   \`<PistaGraficos>\`. Valida el plan con \`revisaPlan(cues, fps)\` antes de renderizar.
3. **Lo único de la pieza se sigue escribiendo a mano.** La biblioteca cubre el
   80 % repetido para dejar tiempo al 20 % que hace que la pieza sea suya.
4. **Si escribes un gráfico reutilizable, súbelo** a \`plantillas/graficos/\`,
   añade su ficha en \`fichas.ts\`, su demo en \`Catalogo.tsx\` y regenera este archivo.

El sonido de cada gráfico se declara aparte, en \`cues-00X.ts\`
(ver \`manuales/diseno-sonoro/recetario-motion-graphics.md\`): la columna «Sonido»
de estas tablas es solo la sugerencia de partida.
`;

fs.writeFileSync(salidaMd, md, "utf8");
console.log(`✅ ${path.relative(root, salidaMd)} — ${CATALOGO.length} fichas en ${FAMILIAS.length} familias`);
