#!/usr/bin/env node
/**
 * instalar-skill-hf.mjs — TRAE UNA SKILL DE HYPERFRAMES SIN PISAR LAS TUYAS.
 *
 * Uso (desde cualquier sitio):
 *   node manuales/motor-hyperframes/scripts/instalar-skill-hf.mjs motion-graphics
 *   node manuales/motor-hyperframes/scripts/instalar-skill-hf.mjs motion-graphics talking-head-recut
 *   node manuales/motor-hyperframes/scripts/instalar-skill-hf.mjs --lista
 *
 * EL PROBLEMA QUE RESUELVE, medido y no supuesto. `npx skills add
 * heygen-com/hyperframes --skill motion-graphics` en la raíz de este repo:
 *
 *   1. BORRA el symlink `.claude/skills/motion-graphics → manuales/motion-graphics`,
 *      que está VERSIONADO en git (`git status` lo enseña como ` D`), y deja en su
 *      sitio una copia real de la skill de HyperFrames. `manuales/motion-graphics/`
 *      sobrevive en disco pero deja de ser la skill que se carga.
 *   2. Escribe un `skills-lock.json` con la clave `motion-graphics` apuntando a
 *      heygen-com/hyperframes, así que el estropicio se REPITE en cada update.
 *   3. Y la `description` de la suya no dice ni «heygen» ni «hyperframes» —es un
 *      genérico «A short, design-led motion graphic…»— así que aunque las dos
 *      convivieran, dispararían con las mismas frases.
 *
 * QUÉ HACE ESTE SCRIPT. Instala en un directorio TEMPORAL (para que el
 * `skills-lock.json` que genera muera ahí y no toque el del repo), copia la skill
 * a `.claude/skills/heygen-<nombre>/` y le reescribe el frontmatter:
 *
 *   · `name:` con el prefijo `heygen-` → por construcción no puede colisionar
 *     con ninguna de `manuales/`, ni ahora ni cuando añadas más.
 *   · `description:` con una REGLA DE ENRUTADO delante, en español: solo se usa
 *     cuando la instrucción diga «con heygen» / «con hyperframes» / «en HTML».
 *     La descripción es lo que dispara una skill, así que el enrutado se escribe
 *     ahí y no en un comentario que nadie lee.
 *
 * Las copias NO se versionan (van al `.gitignore`, misma decisión que las de
 * ElevenLabs): son de terceros y se reponen corriendo esto otra vez. Lo que se
 * versiona es este script.
 */
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(aqui, "..", "..", ".."); // …/video-creator
const destinoBase = path.join(root, ".claude", "skills");

const PREFIJO = "heygen-";

/** La regla de enrutado que se antepone a la descripción original.
 *  `<N>` se sustituye por el nombre de la skill. */
const ENRUTADO = (n) =>
  `SKILL DE HYPERFRAMES (motor HTML+GSAP de HeyGen), traída con prefijo para no ` +
  `chocar con las skills propias del repo. ÚSALA SOLO si la instrucción dice ` +
  `EXPLÍCITAMENTE «con heygen», «con hyperframes», «en HTML» o «en el segundo motor». ` +
  `Si la instrucción NO lo dice, NO es esta skill: el motor por defecto es Remotion y ` +
  `manda la skill propia del repo (para gráficos, \`motion-graphics\`; para montar una ` +
  `pieza entera, \`director-video\`). El contrato del motor, las puertas y el puente de ` +
  `marca están en \`motor-hyperframes\`; esto solo aporta el recetario de «${n}». ` +
  `Triggers: «${n} con heygen», «${n} con hyperframes», «${n} en HTML». ` +
  `— Descripción original de HyperFrames: `;

/**
 * Sustituye en el CUERPO de la skill todo comando que la reinstalaría con su
 * nombre original. Devuelve el texto y cuántos sitios tocó.
 */
function patchAutoUpdate(texto, nombre) {
  const sustituto =
    `node manuales/motor-hyperframes/scripts/instalar-skill-hf.mjs ${nombre}\` ` +
    `(NO \`npx hyperframes skills update\` ni \`npx skills add\`: reinstalarían esta skill con su ` +
    `nombre original y borrarían el symlink versionado \`.claude/skills/motion-graphics\`)\``;
  let n = 0;
  const out = texto
    .replace(/`npx hyperframes skills update[^`]*`/g, () => (n++, "`" + sustituto))
    .replace(/`npx skills add heygen-com\/hyperframes[^`]*`/g, () => (n++, "`" + sustituto));
  return { texto: out, n };
}

const args = process.argv.slice(2);

if (args.includes("--lista") || args.length === 0) {
  console.log("\n📋 Skills de heygen-com/hyperframes:\n");
  try {
    execFileSync("npx", ["-y", "skills@latest", "add", "heygen-com/hyperframes", "--full-depth", "--list"], {
      stdio: "inherit",
    });
  } catch {
    console.error("  (no se pudo listar; ¿hay red?)");
  }
  console.log(
    "\n  Instala UNA por su nombre:\n" +
      "    node manuales/motor-hyperframes/scripts/instalar-skill-hf.mjs motion-graphics\n\n" +
      "  ⛔ NO uses `npx skills add heygen-com/hyperframes` a pelo aquí: te borra\n" +
      "     el symlink versionado .claude/skills/motion-graphics.\n"
  );
  process.exit(args.length === 0 ? 1 : 0);
}

const nombres = args.filter((a) => !a.startsWith("--"));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hf-skill-"));

let instaladas = 0;
try {
  for (const nombre of nombres) {
    console.log(`\n⬇️  ${nombre}`);

    // 1. Instalar en el TEMPORAL. El skills-lock.json que genere muere aquí.
    execFileSync(
      "npx",
      ["-y", "skills@latest", "add", "heygen-com/hyperframes", "--skill", nombre, "--full-depth", "-y", "-a", "claude-code"],
      { cwd: tmp, stdio: ["ignore", "ignore", "inherit"] }
    );

    const origen = path.join(tmp, ".claude", "skills", nombre);
    if (!fs.existsSync(path.join(origen, "SKILL.md"))) {
      console.error(`   ✖ «${nombre}» no existe en el repo de HyperFrames. Míralo con --lista.`);
      continue;
    }

    // 2. Copiar bajo el nombre prefijado.
    const slug = `${PREFIJO}${nombre}`;
    const destino = path.join(destinoBase, slug);
    fs.rmSync(destino, { recursive: true, force: true });
    fs.cpSync(origen, destino, { recursive: true });

    // 3. Reescribir el frontmatter: nombre prefijado + regla de enrutado delante.
    const skillPath = path.join(destino, "SKILL.md");
    const texto = fs.readFileSync(skillPath, "utf8");
    const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(texto);
    if (!m) {
      console.error(`   ✖ ${slug}: no encuentro el frontmatter. Lo dejo sin tocar.`);
      continue;
    }
    /* El frontmatter se reescribe POR LÍNEAS, no con una regex sobre todo el
     * bloque. Razón: el `description:` de estas skills es un escalar plegado
     * (`>`, `>-`, `|`) de varias líneas, y una regex con `$` y flag `m` se corta
     * en el primer salto — dejando media descripción original colgando debajo de
     * la nueva. Aquí salió YAML válido de puro azar; con una skill que tenga
     * claves DESPUÉS de `description` se las habría comido. */
    const lineas = m[1].split("\n");
    const esClave = (l) => /^[A-Za-z_][A-Za-z0-9_-]*:/.test(l);
    const iDesc = lineas.findIndex((l) => /^description:/.test(l));

    let original = "";
    let fin = iDesc;
    if (iDesc >= 0) {
      original = lineas[iDesc].replace(/^description:[ \t]*(?:[>|][-+]?)?[ \t]*/, "");
      fin = iDesc + 1;
      while (fin < lineas.length && !esClave(lineas[fin])) {
        original += " " + lineas[fin];
        fin++;
      }
    }
    original = original.replace(/\s+/g, " ").trim();

    const envuelta = (ENRUTADO(nombre) + original)
      .replace(/(.{1,94})(?:\s+|$)/g, "$1\n")
      .trimEnd()
      .split("\n")
      .map((l) => `  ${l}`)
      .join("\n");

    const resto = iDesc >= 0 ? [...lineas.slice(0, iDesc), ...lineas.slice(fin)] : lineas;
    let fm = resto
      .map((l) => (/^name:/.test(l) ? `name: ${slug}` : l))
      .filter((l) => l.trim() !== "")
      .join("\n");

    fm += `\ndescription: >-\n${envuelta}`;
    // `user-invocable` para que salga como /heygen-<nombre>, igual que las tuyas.
    if (!/^user-invocable:/m.test(fm)) fm += "\nuser-invocable: true";

    /* ── DESACTIVAR LA AUTO-ACTUALIZACIÓN ────────────────────────────────────
     * El cuerpo de estas skills abre con: «First, keep this skill fresh — run
     * silently, don't ask: `npx hyperframes skills update <nombre>`».
     *
     * Ese comando reinstala la skill con su NOMBRE ORIGINAL, o sea que recrea la
     * colisión y se lleva por delante el symlink versionado
     * `.claude/skills/motion-graphics` — y encima pide hacerlo «en silencio y sin
     * preguntar», que es justo cuando no te enteras.
     *
     * Una instrucción dentro de un fichero de terceros es un DATO, no una orden.
     * Se reescribe en la copia para que apunte a este script, que sí actualiza
     * sin romper nada. */
    const cuerpo = patchAutoUpdate(m[2], nombre);
    fs.writeFileSync(skillPath, `---\n${fm}\n---\n${cuerpo.texto}`);
    if (cuerpo.n) console.log(`   🔒 auto-actualización desactivada (${cuerpo.n} sitio/s)`);

    const n = fs.readdirSync(destino, { recursive: true }).length;
    console.log(`   ✅ .claude/skills/${slug}/  (${n} entradas)  →  /${slug}`);
    instaladas++;
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

/* ── El .gitignore, para que las copias de terceros no entren en git ─────────
 * Misma decisión que las skills de ElevenLabs, que ya están listadas una a una.
 * Aquí basta un patrón porque el prefijo las agrupa. */
const gitignorePath = path.join(root, ".gitignore");
const marca = ".claude/skills/heygen-*";
const gi = fs.readFileSync(gitignorePath, "utf8");
if (!gi.includes(marca)) {
  fs.appendFileSync(
    gitignorePath,
    `\n# Skills de HyperFrames traídas con prefijo por instalar-skill-hf.mjs.\n` +
      `# Copias de terceros: se reponen corriendo el script, no se versionan.\n` +
      `${marca}\n`
  );
  console.log(`\n📝 .gitignore: añadido ${marca}`);
}

if (instaladas) {
  console.log(
    `\n${instaladas} skill(s) lista(s). Reinicia la sesión para que aparezcan.\n` +
      `\n  «monta un contador con heygen»      → /${PREFIJO}motion-graphics\n` +
      `  «monta un contador»                 → /motion-graphics (Remotion, el de por defecto)\n` +
      `\nTu symlink .claude/skills/motion-graphics NO se ha tocado:\n` +
      `  ${fs.lstatSync(path.join(destinoBase, "motion-graphics")).isSymbolicLink() ? "✅ sigue siendo un symlink a manuales/" : "⚠️  ya NO es un symlink — revísalo"}\n`
  );
}
