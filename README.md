# 🎬 Video Creator — Sistema de edición de vídeo con IA

Root de **todos** los proyectos de vídeo. Combina cinco motores, dirigidos por una capa de skills:

| Motor | Para qué | Dónde vive |
|---|---|---|
| **Remotion** | Vídeo programático (intros, títulos, animaciones, gráficos, cámara virtual) | `remotion/` |
| **Auto-Editor** | Cortar silencios de un vídeo grabado | CLI global (`auto-editor`) |
| **HeyGen** | Avatar talking-head a partir de un guion | `manuales/edicion-video/scripts/heygen.py` |
| **ElevenLabs** | Voz en off (texto → audio) cuando la pieza **no** lleva avatar | `manuales/edicion-video/scripts/elevenlabs.py` |
| **Grok Imagine** (API directa de xAI) | Generar b-roll con IA (texto/imagen → vídeo) | `manuales/edicion-video/scripts/grok.py` |

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

Auto-Editor es global: `auto-editor --version` funciona desde cualquier carpeta. El b-roll se genera con `python3 manuales/edicion-video/scripts/grok.py --help`, y la voz en off con `python3 manuales/edicion-video/scripts/elevenlabs.py voces`.

---

## 🎬 Empezar un vídeo

La puerta de entrada es la skill **`director-video`** (`/director-video`, o simplemente pídelo: *"monta el vídeo con este guion"*). Coordina todas las capas y delega el detalle en las demás skills.

El primer paso que dará es crear los artefactos del proyecto:

```bash
bash manuales/director-video/scripts/artefactos.sh 005
```

Eso genera `proyectos/005/artefactos/` con `01-plan.md` → `02-layout.md` → `03-timeline.md`, que se escriben **antes** de tocar código. Del timeline salen los cuatro planes declarativos: `camara-005.ts`, `graficos-005.ts`, `cues-005.ts` y `subtitulos-005.ts`.

### 📰 Si el vídeo sale de una noticia

Ese es otro formato y tiene su propia puerta: la skill **`video-noticias`** (*"monta esta noticia"*). Short vertical 9:16 de explicación periodística, **sin avatar en pantalla**: papel beige + acento naranja, voz en off y motion graphics. Trae su propio theme (`motor/noticias/`), porque el del sistema asume vídeo oscuro con texto blanco.

Cambia el recorrido en tres puntos:

1. El artefacto es [01-noticia.md](manuales/video-noticias/artefactos/01-noticia.md), y **exige tabla de fuentes verificadas** antes de renderizar: cada cifra y cada titular con medio y fecha.
2. **La voz se genera antes que el plan y manda sobre él.** Se locuta una pista por toma y se cronometra; de esa medición salen los frames, nunca al revés.
3. El plan es uno solo — `noticia-NNN.ts` (`TomaNoticia[]` → `<PistaNoticia>`, o directamente un `Plan` del núcleo como en el 006) — en vez de los cuatro de arriba, y se valida sin abrir el Studio:

```bash
node manuales/video-noticias/scripts/revisar-plan.mjs remotion/src/proyectos/005/noticia-005.ts
```

Pasa los **dos** validadores y **sale con 1 si hay avisos**, para que sirva de puerta y no de informe: `revisaNoticia()` sobre las tomas (huecos, solapes, duraciones, `reason`, beat de gancho) y `revisaPlan()` sobre el plan compilado con la misma `compilaNoticia()` que usa `<PistaNoticia>` (R08 alto, R09 ancho, tintas de marca, reglas de cada pieza). Corría solo el primero, y eso firmaba «✅ Plan limpio» sobre planes que el motor sí marcaba.

Referencia real montada de punta a punta: `proyectos/004/` (17 tomas, 73,5 s).

---

## 📁 Estructura

```
video-creator/
├── .claude/skills/           # Las 6 skills del sistema (symlinks a manuales/)
│                             #   + las de ElevenLabs (⛔ fuera del repo, ver abajo)
├── manuales/                 # La capa de dirección — el "cómo se decide"
│   ├── director-video/       #   🚪 ORQUESTADOR: entra por aquí
│   │   ├── artefactos/       #   plantillas 01-plan · 02-layout · 03-timeline
│   │   └── scripts/          #   artefactos.sh
│   ├── edicion-video/        #   motor, pipeline, reglas (R01+), proceso, heygen
│   │   └── scripts/          #   heygen.py · grok.py (b-roll) · elevenlabs.py (voz)
│   ├── video-noticias/       #   📰 FORMATO noticias 9:16 + recetario de tomas
│   │   └── scripts/          #   generar-vo.sh (cronometra) · revisar-plan.mjs
│   ├── motion-graphics/      #   dirección de gráficos + catalogo-graficos.md
│   ├── camara-avatar/        #   cámara virtual del avatar
│   └── diseno-sonoro/        #   SFX, mezcla, ducking + recetario
├── remotion/                 # MOTOR (proyecto npm)
│   ├── public/sfx/           #   55 efectos calibrados (de los que dependen los renders)
│   └── src/
│       ├── motor/            #   LO REUTILIZABLE — un proyecto lo usa, él no usa proyectos
│       │   ├── graficos/     #     biblioteca de gráficos + catálogo DERIVADO + PistaGraficos
│       │   ├── noticias/     #     formato noticias: theme CLARO + TomaNoticia + PistaNoticia
│       │   ├── sound/        #     SoundCue + PistaSonido
│       │   └── demos/        #     los planes de ejemplo que se copian para empezar
│       └── proyectos/00N/    #   UN VÍDEO: sus planes como datos + su JSX propio
│                             #   (el límite lo vigila eslint.config.mjs, no la buena fe)
├── proyectos/                # UN proyecto por carpeta numerada
│   └── 00N/
│       ├── artefactos/           # 01-plan · 02-layout · 03-timeline (se escriben primero)
│       │                         #   (formato noticias: 01-noticia.md, con fuentes)
│       ├── transcripcion.json    # transcripción con tiempos (whisper.cpp)
│       ├── guion-limpio.md       # guion depurado
│       ├── guion-vo.txt          # guion de la voz en off (esto SÍ se versiona)
│       ├── aprendizajes.md       # qué funcionó y qué evitar
│       ├── avatar/ vo/ finales/ pruebas-720p/ vistas-previas/   # ⛔ fuera del repo
│       └── corte-auto-editor/    # salida de Auto-Editor (FCPXML)
├── sonido/                   # Banco completo: 1227 efectos en 37 categorías
│                             #   índice: sonido/MAPA-SONIDOS.md
├── archivos/                 # Biblioteca reutilizable (marca, música, capturas, whisper)
├── avatar/ · entrada/        # ⛔ material de vídeo, fuera del repo
└── .env                      # ⛔ secretos (plantilla: .env.example)
```

---

## 📚 Biblioteca de gráficos

Antes de escribir un gráfico nuevo, mira si ya existe:

- **Catálogo vivo:** composición `Catalogo` en el Studio — cada cosa animándose de verdad, con su ficha y la RUTA que se escribe en el plan.
- **Lista:** [manuales/motion-graphics/catalogo-graficos.md](manuales/motion-graphics/catalogo-graficos.md) (generado; no editar a mano).

```bash
node manuales/motion-graphics/scripts/generar-catalogo.mjs   # regenera el markdown
node manuales/motion-graphics/scripts/revisar-catalogo.mjs   # test: toda ficha tiene ruta y toda ruta tiene ficha
```

El catálogo se DERIVA del código (registro `PIEZAS`, `MOLDES_GRAFICOS` y los tipos del núcleo), así que no puede anunciar algo que el plan no sepa escribir — que es exactamente el fallo que tenía: anunciaba 37 gráficos y el plan servía 16. Hoy son **52 entradas** agrupadas por cómo se alcanzan: moldes, gramática, piezas, entradas, envolturas y ambiente. Los componentes se importan de una sola pieza:

```ts
import { Titular, Contador, Subrayado, Particulas } from "./graficos";
```

Lo repetitivo (títulos, cifras, listas, remates, CTA) no se escribe en JSX: se declara como datos en `graficos-NNN.ts` y lo monta `<PistaGraficos>`, con `revisaPlan()` validando las reglas del sistema antes de renderizar.

> **El formato noticias tiene su propia biblioteca**, aparte y fuera de este catálogo: `motor/noticias/Editorial.tsx` (`FondoPapel`, `RecortePrensa`, `ChipIcono`, `Cronologia`, `Medidor`…). Está separada a propósito — estos tokens son para fondo **claro** y los de arriba asumen vídeo oscuro con texto blanco, así que mezclarlos da blanco sobre beige. Las primitivas neutras (`Subrayado`, `Aspa`, `Check`, `Flecha`, `Particulas`) sí se reusan en ambos. Su ficha está en [recetario-tomas.md](manuales/video-noticias/recetario-tomas.md), no en el catálogo generado.

---

## ⛔ Qué NO está en el repo (y cómo reponerlo)

Para que el repo sea manejable, el material pesado se queda fuera (ver [.gitignore](.gitignore)):

| Fuera | Cómo reponerlo en un clon nuevo |
|---|---|
| Clips del avatar (`avatar/*.mp4`, `remotion/public/*.mp4`) | copia los MP4 desde tu disco o regénéralos con HeyGen |
| Renders (`finales/`, `pruebas-720p/`, `vistas-previas/`, `remotion/out/`) | se regeneran renderizando |
| Modelo de whisper (`archivos/whisper/*.bin`, 465 MB) | descárgalo de [whisper.cpp](https://github.com/ggerganov/whisper.cpp) |
| `.env` con las claves | `cp .env.example .env` y rellena `HEYGEN_API_KEY` |
| Clave de xAI (b-roll con Grok) | va en el mismo `.env`, como `XAI_API_KEY` (empieza por `xai-`; se saca en https://console.x.ai). Comprueba con `python3 manuales/edicion-video/scripts/grok.py modelos` |
| Clave de ElevenLabs (voz en off) | va en el mismo `.env`, como `ELEVENLABS_API_KEY` (se saca en https://elevenlabs.io → API Keys). Comprueba con `python3 manuales/edicion-video/scripts/elevenlabs.py voces` |
| Voz en off ya locutada (`proyectos/*/vo/`) | se regenera entera desde `guion-vo.txt`, que **sí** está versionado — es el guion lo que define la pieza, no el WAV |
| Skills de ElevenLabs (`.agents/`, con sus symlinks en `.claude/skills/`) | `npx skills experimental_install` — las repone desde `skills-lock.json`, que sí está versionado |
| `node_modules/` | `cd remotion && npm install` |

Consecuencia: tras clonar, el Studio abre y las composiciones de plantilla y `Catalogo` renderizan; **`Avatar002`, `Avatar003` y `Noticia004` no**, hasta que repongas su medio:

| Composición | Qué le falta | Cómo reponerlo |
|---|---|---|
| `Avatar002`, `Avatar003` | los MP4 del avatar | copia tus clips a `remotion/public/` |
| `Noticia004` | la voz en off `public/noticias/004-vo.wav` | relocuta el guion (ver más abajo) y copia el WAV que deja `generar-vo.sh` |

`Noticia004` falla de forma **silenciosa**: `staticFile()` solo construye una URL, así que la imagen se ve y lo que falta es la voz, con un 404 en la consola del Studio. Para reponerla:

```bash
bash manuales/video-noticias/scripts/generar-vo.sh proyectos/004/guion-vo.txt --motor say --fps 30
cp proyectos/004/vo/004-vo.wav remotion/public/noticias/
```

El banco de sonidos **sí** está en el repo: los renders dependen de él.

---

## ✅ Estado verificado

- Remotion **4.0.496** · Node **25.8** · `@remotion/paths`, `@remotion/shapes` y `@remotion/media-parser` (duraciones leídas del medio).
- **Sin Tailwind**: no se usaba ni una clase (`grep -rc className src/` = 0). Lo único que aportaba era su *preflight*, que ahora está explícito como reset mínimo en `src/index.css` — verificado píxel a píxel en 4 composiciones.
- **13 composiciones** registradas en `remotion/src/Root.tsx` (plantillas, avatares 001-003, `Catalogo`, `GraficosDemo`, `NoticiaDemo`, `Noticia004`).
- Auto-Editor **29.3.1** (pipx) · whisper.cpp con `ggml-small.bin`.
- B-roll con Grok Imagine vía `scripts/grok.py` (API directa de xAI): la clave autentica correctamente, pero **el equipo de xAI aún no tiene créditos** → hasta comprarlos en console.x.ai no genera nada.
- Voz en off: **el 005 está locutado de punta a punta con la voz clonada del canal** (`John Stevans v 0.1`, ElevenLabs) — 16 tomas, cronometradas con `generar-vo.sh --motor elevenlabs`. El **004** sigue con la voz GUÍA del sistema (`--motor say`, Paulina es_MX): sus 17 tomas están cronometradas contra esa pista, así que para publicarlo hay que relocutarlo. `elevenlabs.py guion` es reanudable: reejecutarlo no vuelve a facturar lo que ya está en disco (comprobado en el 005 — al acortar una frase refacturó 3 tomas de 16, esa y sus dos vecinas del stitching).
- `npm run lint` (eslint + tsc) en verde.

📖 **Antes de editar un vídeo real, lee** [manuales/edicion-video/SKILL.md](manuales/edicion-video/SKILL.md) — o entra directamente por el [director](manuales/director-video/SKILL.md). Si la pieza sale de una noticia, por [video-noticias](manuales/video-noticias/SKILL.md).
