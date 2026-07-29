# 🎬 Video Creator — Sistema de edición de vídeo con IA

Root de **todos** los proyectos de vídeo. Combina cuatro motores, dirigidos por una capa de skills:

| Motor | Para qué | Dónde vive |
|---|---|---|
| **Remotion** | Vídeo programático (intros, títulos, animaciones, gráficos, cámara virtual) | `remotion/` |
| **Auto-Editor** | Cortar silencios de un vídeo grabado | CLI global (`auto-editor`) |
| **HeyGen** | Avatar talking-head a partir de un guion | `manuales/edicion-video/scripts/heygen.py` |
| **Seedance 2.0** | Generar b-roll con IA (texto/imagen → vídeo) | skill `seedance-20` |

> **Regla de oro:** primero el motor y la estructura, luego el vídeo. Nunca se edita desde Descargas ni desde un archivo suelto: cada vídeo tiene su sitio.

---

## 🚀 Arrancar (desde la raíz del repo)

Todas las rutas de este README son **relativas a la raíz del repo** — la carpeta donde está este archivo.

```bash
cd remotion && npm install
```

```bash
npm run dev
```

Abre el **Remotion Studio** en http://localhost:3000. Para cerrarlo: `Ctrl + C` en esa terminal.

Comandos útiles del motor (siempre desde `remotion/`):

```bash
npx remotion compositions src/index.ts
```

```bash
npx remotion still src/index.ts Catalogo out/ficha.png --frame=2140
```

```bash
npm run lint
```

Auto-Editor es global: `auto-editor --version` funciona desde cualquier carpeta.

---

## 🎬 Empezar un vídeo

La puerta de entrada es la skill **`director-video`** (`/director-video`, o simplemente pídelo: *"monta el vídeo con este guion"*). Coordina todas las capas y delega el detalle en las demás skills.

El primer paso que dará es crear los artefactos del proyecto:

```bash
bash manuales/director-video/scripts/artefactos.sh 004
```

Eso genera `proyectos/004/artefactos/` con `01-plan.md` → `02-layout.md` → `03-timeline.md`, que se escriben **antes** de tocar código. Del timeline salen los cuatro planes declarativos: `camara-004.ts`, `graficos-004.ts`, `cues-004.ts` y `subtitulos-004.ts`.

---

## 📁 Estructura

```
video-creator/
├── .claude/skills/           # Las 5 skills del sistema (symlinks a manuales/)
├── manuales/                 # La capa de dirección — el "cómo se decide"
│   ├── director-video/       #   🚪 ORQUESTADOR: entra por aquí
│   │   ├── artefactos/       #   plantillas 01-plan · 02-layout · 03-timeline
│   │   └── scripts/          #   artefactos.sh
│   ├── edicion-video/        #   motor, pipeline, reglas (R01+), proceso, heygen
│   ├── motion-graphics/      #   dirección de gráficos + catalogo-graficos.md
│   ├── camara-avatar/        #   cámara virtual del avatar
│   └── diseno-sonoro/        #   SFX, mezcla, ducking + recetario
├── remotion/                 # MOTOR (proyecto npm)
│   ├── public/sfx/           #   55 efectos calibrados (de los que dependen los renders)
│   └── src/plantillas/       #   presets, theme, motion, camara, sound, subtítulos
│       └── graficos/         #   biblioteca de 37 gráficos + catálogo + PistaGraficos
├── proyectos/                # UN proyecto por carpeta numerada
│   └── 00N/
│       ├── artefactos/           # 01-plan · 02-layout · 03-timeline (se escriben primero)
│       ├── transcripcion.json    # transcripción con tiempos (whisper.cpp)
│       ├── guion-limpio.md       # guion depurado
│       ├── aprendizajes.md       # qué funcionó y qué evitar
│       ├── avatar/ finales/ pruebas-720p/ vistas-previas/   # ⛔ fuera del repo
│       └── corte-auto-editor/    # salida de Auto-Editor (FCPXML)
├── sonido/                   # Banco completo: 1231 efectos en 37 categorías
│                             #   índice: sonido/MAPA-SONIDOS.md
├── archivos/                 # Biblioteca reutilizable (marca, música, capturas, whisper)
├── avatar/ · entrada/        # ⛔ material de vídeo, fuera del repo
└── .env                      # ⛔ secretos (plantilla: .env.example)
```

---

## 📚 Biblioteca de gráficos

Antes de escribir un gráfico nuevo, mira si ya existe:

- **Catálogo vivo:** composición `Catalogo` en el Studio — cada gráfico animándose de verdad, con su ficha.
- **Lista:** [manuales/motion-graphics/catalogo-graficos.md](manuales/motion-graphics/catalogo-graficos.md) (generado; no editar a mano).

```bash
node manuales/motion-graphics/scripts/generar-catalogo.mjs
```

37 primitivas en 8 familias: tipografía, fondos, datos, trazo dibujado (`@remotion/paths`), partículas deterministas, 3D CSS y glitch. Se importan de una sola pieza:

```ts
import { Titular, Contador, Subrayado, Particulas } from "./graficos";
```

Lo repetitivo (títulos, cifras, listas, remates, CTA) no se escribe en JSX: se declara como datos en `graficos-NNN.ts` y lo monta `<PistaGraficos>`, con `revisaPlan()` validando las reglas del sistema antes de renderizar.

---

## ⛔ Qué NO está en el repo (y cómo reponerlo)

Para que el repo sea manejable, el material pesado se queda fuera (ver [.gitignore](.gitignore)):

| Fuera | Cómo reponerlo en un clon nuevo |
|---|---|
| Clips del avatar (`avatar/*.mp4`, `remotion/public/*.mp4`) | copia los MP4 desde tu disco o regénéralos con HeyGen |
| Renders (`finales/`, `pruebas-720p/`, `vistas-previas/`, `remotion/out/`) | se regeneran renderizando |
| Modelo de whisper (`archivos/whisper/*.bin`, 465 MB) | descárgalo de [whisper.cpp](https://github.com/ggerganov/whisper.cpp) |
| `.env` con las claves | `cp .env.example .env` y rellena `HEYGEN_API_KEY` |
| `node_modules/` | `cd remotion && npm install` |

Consecuencia: tras clonar, el Studio abre y las composiciones de plantilla y `Catalogo` renderizan; **`Avatar002` y `Avatar003` no**, hasta que copies sus MP4 a `remotion/public/`.

El banco de sonidos **sí** está en el repo: los renders dependen de él.

---

## ✅ Estado verificado

- Remotion **4.0.496** · Node **25.8** · Tailwind v4 · `@remotion/paths` y `@remotion/shapes`.
- **11 composiciones** registradas en `remotion/src/Root.tsx` (plantillas, avatares 001-003, `Catalogo`, `GraficosDemo`).
- Auto-Editor **29.3.1** (pipx) · whisper.cpp con `ggml-small.bin`.
- `npm run lint` (eslint + tsc) en verde.

📖 **Antes de editar un vídeo real, lee** [manuales/edicion-video/SKILL.md](manuales/edicion-video/SKILL.md) — o entra directamente por el [director](manuales/director-video/SKILL.md).
