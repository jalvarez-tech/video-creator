# 🎬 Video Creator — Sistema de edición de vídeo con IA

Root de **todos** los proyectos de vídeo. Combina siete motores, dirigidos por una capa de skills:

| Motor | Para qué | Dónde vive |
|---|---|---|
| **Remotion** | Vídeo programático (intros, títulos, animaciones, gráficos, cámara virtual). **El motor por defecto** | `remotion/` |
| **HyperFrames** | Segundo motor: vídeo desde HTML+GSAP, render local y gratis. Se **elige** por pieza, no se hereda | `npx hyperframes` · `manuales/motor-hyperframes/` |
| **Auto-Editor** | Cortar silencios de un vídeo grabado | CLI global (`auto-editor`) |
| **HeyGen** | Avatar talking-head a partir de un guion | `manuales/edicion-video/scripts/heygen.py` |
| **ElevenLabs** | Voz en off (texto → audio) cuando la pieza **no** lleva avatar | `manuales/edicion-video/scripts/elevenlabs.py` |
| **Grok Imagine** (API directa de xAI) | Generar b-roll de lo que **no existe** (texto/imagen → vídeo) | `manuales/edicion-video/scripts/grok.py` |
| **Pexels** (banco gratuito) | Traer b-roll de **archivo**: lugares, objetos y gestos reales, con manifiesto de licencias | `manuales/edicion-video/scripts/bancos.py` |

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

Auto-Editor es global: `auto-editor --version` funciona desde cualquier carpeta. La voz en off sale de `python3 manuales/edicion-video/scripts/elevenlabs.py voces`.

Con el b-roll hay **dos caminos, y elegir mal no es un problema de coste sino de honestidad**: lo que existe se **trae** de un banco (`bancos.py glosario` para empezar), y lo que no existe se **genera** (`grok.py --help`). Un lugar o un hecho reales generados con IA son prueba documental fabricada — la regla completa está en [director-video §3h](manuales/director-video/SKILL.md).

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
node manuales/video-noticias/scripts/revisar-broll.mjs remotion/src/proyectos/005/noticia-005.ts
node manuales/video-noticias/scripts/revisar-velo.mjs
```

`revisar-broll.mjs` es el único que mira el DISCO: que el `media` esté donde dice, que tenga los píxeles que pide su hueco, que el clip no sea más corto que su toma y que su crédito esté en el manifiesto. Cuando falta el archivo pero el plan declara `buscarMedia`, imprime el comando de `bancos.py` que hay que correr.

Pasa los **dos** validadores y **sale con 1 si hay avisos**, para que sirva de puerta y no de informe: `revisaNoticia()` sobre las tomas (huecos, solapes, duraciones, `reason`, beat de gancho) y `revisaPlan()` sobre el plan compilado con la misma `compilaNoticia()` que usa `<PistaNoticia>` (R08 alto, R09 ancho, tintas de marca, reglas de cada pieza). Corría solo el primero, y eso firmaba «✅ Plan limpio» sobre planes que el motor sí marcaba.

Referencia real montada de punta a punta: `proyectos/004/` (17 tomas, 73,5 s).

### 🧱 Si la pieza va en el segundo motor

Remotion es el motor **por defecto**; HyperFrames se **elige**, no se hereda. La skill **`motor-hyperframes`** tiene la tabla de decisión — resumida: el plan de gráficos como dato, las entradas de muelle y la reserva con `<Freeze>` **se quedan en Remotion**; el layout y el contraste que hay que **medir**, el recorte de fondo del avatar y las piezas cortas y gráficas ganan en HyperFrames.

```bash
node manuales/motor-hyperframes/scripts/nuevo-hf.mjs 008 --canal luxur --formato 9:16 --fps 25
node manuales/motor-hyperframes/scripts/revisar-hf.mjs 008     # invariantes del repo
bash manuales/motor-hyperframes/scripts/render-hf.sh 008       # las dos puertas + render
```

La marca **no se copia, se genera**: `marca-a-css.mjs` lee el mismo `src/marcas/<canal>.ts` que lee Remotion y emite las custom properties, así que cambiar el canal mueve los dos motores a la vez.

---

## 📁 Estructura

```
video-creator/
├── .claude/skills/           # Las 7 skills del sistema (symlinks a manuales/)
│                             #   + las de ElevenLabs (⛔ fuera del repo, ver abajo)
├── manuales/                 # La capa de dirección — el "cómo se decide"
│   ├── director-video/       #   🚪 ORQUESTADOR: entra por aquí
│   │   ├── artefactos/       #   plantillas 01-plan · 02-layout · 03-timeline
│   │   └── scripts/          #   artefactos.sh
│   ├── edicion-video/        #   motor, pipeline, reglas (R01+), proceso, heygen
│   │   └── scripts/          #   heygen.py · grok.py (b-roll IA) · bancos.py (b-roll de archivo)
│   │                         #   elevenlabs.py (voz) · revisar-bancos.py (test sin red)
│   ├── video-noticias/       #   📰 FORMATO noticias 9:16 + recetario de tomas
│   │   └── scripts/          #   generar-vo.sh (cronometra) · revisar-plan.mjs
│   │                         #   revisar-broll.mjs (mira el disco) · revisar-velo.mjs
│   ├── motion-graphics/      #   dirección de gráficos + catalogo-graficos.md
│   │   └── scripts/          #   generar/revisar-catalogo · medir-anchos (R09)
│   │                         #   revisar-marca (invariantes) · sonda-frames + revisar-sonda
│   ├── camara-avatar/        #   cámara virtual del avatar
│   ├── diseno-sonoro/        #   SFX, mezcla, ducking + recetario
│   └── motor-hyperframes/    #   🧱 SEGUNDO MOTOR: vídeo desde HTML+GSAP (HeyGen)
│       ├── plantilla/        #   la composición 9:16 ya renderizada y mirada
│       └── scripts/          #   nuevo-hf · marca-a-css (la marca, generada)
│                             #   revisar-hf (invariantes) · render-hf.sh (las 2 puertas)
│                             #   instalar-skill-hf (trae skills de HF con prefijo
│                             #   heygen-*, sin pisar la motion-graphics propia)
├── remotion/                 # MOTOR (proyecto npm)
│   ├── public/sfx/           #   55 efectos calibrados (de los que dependen los renders)
│   └── src/
│       ├── marcas/           #   LOS CANALES — un fichero por marca (luxur.ts). El motor
│       │                      #   NO los importa: llegan por parámetro desde la composición
│       ├── motor/            #   LO REUTILIZABLE — un proyecto lo usa, él no usa proyectos
│       │   ├── plan/         #     EL NÚCLEO: la gramática del plan (piezas, moldes, reglas)
│       │   ├── marca.ts      #     el TIPO `Marca` + `MARCA_BASE` (el suelo, sin canal)
│       │   ├── letra.ts      #     con qué tipografía dibuja y MIDE cada capa
│       │   ├── piezas/       #     REGISTRO COMPARTIDO: las polaridad-neutras que sirven
│       │   │                 #     a los dos dialectos (regla + las cinco de trazo)
│       │   ├── graficos/     #     biblioteca de gráficos + catálogo DERIVADO + PistaGraficos
│       │   ├── noticias/     #     formato noticias: theme CLARO + TomaNoticia + PistaNoticia
│       │   ├── metraje/      #     formato MONTAJE (sin avatar): Corte[] + PistaMetraje +
│       │   │                 #     la puerta genérica (revisar-metraje.mjs)
│       │   ├── sound/        #     SoundCue + PistaSonido
│       │   └── demos/        #     los planes de ejemplo que se copian para empezar
│       └── proyectos/00N/    #   UN VÍDEO: sus planes como datos + su JSX propio
│                             #   (el límite lo vigila eslint.config.mjs, no la buena fe)
├── proyectos/                # UN proyecto por carpeta numerada
│   └── 00N/
│       ├── artefactos/           # 01-plan · 02-layout · 03-timeline (se escriben primero)
│       │                         #   (formato noticias: 01-noticia.md, con fuentes)
│       ├── broll/
│       │   ├── manifiesto.json   #   ⭐ ESTO SÍ se versiona: de quién es cada plano,
│       │   │                     #      bajo qué licencia y con qué sha256
│       │   └── pexels/raw/ · cache/ · contactos/   # ⛔ el binario, fuera (bancos.py reponer)
│       ├── transcripcion.json    # transcripción con tiempos (whisper.cpp)
│       ├── guion-limpio.md       # guion depurado
│       ├── guion-vo.txt          # guion de la voz en off (esto SÍ se versiona)
│       ├── aprendizajes.md       # qué funcionó y qué evitar
│       ├── avatar/ vo/ finales/ pruebas-720p/ vistas-previas/   # ⛔ fuera del repo
│       ├── corte-auto-editor/    # salida de Auto-Editor (FCPXML)
│       └── hf/                   # si la pieza va en HyperFrames: index.html +
│                                 #   marca.css (GENERADO) + vendor/ + assets/
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

**Al tocar el motor: los invariantes de marca.** 39 aserciones que el compilador no puede ver porque son de identidad y de valor, no de tipo — que dos marcas coexisten, que los memos devuelven el mismo objeto, que el registro compartido es una sola verdad, que el orden de `PIEZAS` no se movió:

```bash
node manuales/motion-graphics/scripts/revisar-marca.mjs
```

Cazó dos fallos reales el día que se escribió, y ninguno movía un píxel: un plan publicado que compilaba **sin canal**, y un comentario del núcleo que afirmaba una identidad ya falsa. Es el hermano de la sonda y se complementan — **la sonda dice si algo se movió; esto dice si algo dejó de ser cierto**.

**Antes y después de tocar el motor: la sonda de frames.** Es el único control de no-regresión **visual** que hay. Captura una tanda antes del cambio, otra después, y compara:

```bash
node manuales/motion-graphics/scripts/sonda-frames.mjs antes
node manuales/motion-graphics/scripts/revisar-sonda.mjs antes despues
```

Saca 8 frames de cada composición (136 en total, ~5 min) a `remotion/out/sonda/`, que está en `.gitignore`. Sale 0 si no hay regresiones y 2 si las hay, así que se encadena con el resto. **Tiene suelo de ruido medido**: dos tandas del MISMO código mueven 2-3 frames con delta ≤ 8 —los que llevan `<OffthreadVideo>`, donde el *seek* del decodificador no cae siempre en el mismo sitio—, y por eso el comparador usa un umbral de 12. Un cambio de color de marca no se le parece: delta 200-255 en menos del 1 % del cuadro. Para un cambio deliberadamente pequeño, `--umbral 1`.

> La sonda dice si algo se movió, **no si el cambio es correcto**. Un refactor que no mueve un píxel puede haber desconectado el gancho que decía arreglar. Al lado va siempre la prueba POSITIVA: mueve a propósito el valor que acabas de parametrizar y comprueba que el render lo obedece.

⚠️ **Para la prueba positiva, apunta a frames concretos con `--frames`.** El reparto automático se salta las tomas cortas y eso invalida la prueba sin avisar: comprobando un cambio en los chips del 006 —que viven en `[1633,1767]`— la sonda muestreaba 1606 y 1874, pasaba por encima y decía «no cambia nada», que era falso. Localiza primero en qué tomas está la pieza afectada:

```bash
node manuales/motion-graphics/scripts/sonda-frames.mjs antes --comps Noticia007 --frames 967,2224
```

El catálogo se DERIVA del código (registro `PIEZAS`, `MOLDES_GRAFICOS` y los tipos del núcleo), así que no puede anunciar algo que el plan no sepa escribir — que es exactamente el fallo que tenía: anunciaba 37 gráficos y el plan servía 16. Hoy son **52 entradas** agrupadas por cómo se alcanzan: moldes, gramática, piezas, entradas, envolturas y ambiente. Los componentes se importan de una sola pieza:

```ts
import { Titular, Contador, Subrayado, Particulas } from "./graficos";
```

Lo repetitivo (títulos, cifras, listas, remates, CTA) no se escribe en JSX: se declara como datos en `graficos-NNN.ts` y lo monta `<PistaGraficos>`, con `revisaPlan()` validando las reglas del sistema antes de renderizar.

> **El formato noticias tiene su propia biblioteca**, aparte y fuera de este catálogo: `motor/noticias/Editorial.tsx` (`FondoPapel`, `RecortePrensa`, `ChipIcono`, `Cronologia`, `Medidor`…). Está separada a propósito — estos tokens son para fondo **claro** y los de arriba asumen vídeo oscuro con texto blanco, así que mezclarlos da blanco sobre beige. Su ficha está en [recetario-tomas.md](manuales/video-noticias/recetario-tomas.md), no en el catálogo generado.
>
> **Lo que SÍ comparten las dos capas** vive en `motor/piezas/`: `regla`, `subrayado`, `rodea`, `flecha`, `check` y `aspa`. Antes esto se decía de otra forma —«las primitivas neutras se reusan en ambos»— y era cierto **en JSX** y falso **desde un plan**: una toma editorial no podía pedir un subrayado aunque el componente existiera. Ahora las seis están en los dos registros, son el mismo objeto, y el contrato para entrar ahí es duro: **pintan solo con `ctx.color`**. Las uniones de tinta de los dos dialectos son disjuntas, así que un montador compartido no tiene ni un nombre de color que pueda escribir — y `ctx.color`, que ya viene resuelto contra `molde.tinta`, sale carbón sobre papel y blanco sobre cine sin saber en cuál está. Por eso `lista` y `barras` NO entraron: colorean partes con `logro`/`perdida`, que solo existen en gráficos.

---

## 🎨 Una marca, un fichero

`video-creator` sirve a **cualquier canal**, no solo al que está configurado hoy. La marca no es una constante del motor: es un dato que llega por parámetro.

```
src/marcas/luxur.ts        ← el perfil del canal (colores, letra, sello, look del metraje)
src/motor/marca.ts         ← el TIPO `Marca` y `MARCA_BASE`. El motor NO conoce ningún canal
```

**Dar de alta un canal es escribir un fichero hermano de `luxur.ts` y pasarlo.** El motor no se toca. Quien lo elige es la composición, que es donde tiene sentido decir para quién se monta:

```tsx
<PistaNoticia tomas={noticia004} marca={LUXUR} />        // 004 y 005
capa(dialectoEditorialDe(LUXUR), "noticia")              // planes nativos (006, 007)
fondos={fondosNoticiaDe(LUXUR)}                          // <PistaGraficos> a pelo
```

Las tres capas y qué decide cada una — la regla que evita que esto se convierta en un cajón:

| | Qué decide | Dónde vive |
|---|---|---|
| **Sustrato** | cómo se monta un plan | `plan/nucleo.ts` + `PistaGraficos.tsx` — genérico, no se toca |
| **Dialecto** | el VOCABULARIO: qué piezas, qué moldes, qué beats, y la POLARIDAD | `motor/graficos/` · `motor/noticias/` |
| **Marca** | los VALORES: colores, tipografía, sello, radio, look del metraje | `src/marcas/` |

Y el FORMATO (margen seguro, carril de subtítulos) sale de `presets.ts`, que no es ninguna de las tres.

> ⚠️ `MARCA_BASE` **no es un canal** y se nota en que su `sello.texto` es `null`. Una composición que olvide pasar su marca sale **sin watermark** — un fallo que se ve en el primer frame, no uno que se publica. Lo que sí arrastra son los colores históricos del canal, porque `Editorial.tsx` todavía los usa como valor por defecto en algún sitio.

**La tipografía es por CAPA, no solo por marca.** La editorial dibuja en San Francisco y la de overlays sobre vídeo en Inter, y eso no es un descuido: la segunda va encima de metraje que no controla y una display de marca ahí se cae. Cada dialecto trae su letra por defecto y una marca la sobrescribe **si lo pide**:

```ts
letraPorCapa: { graficos: { display: MiSans, texto: MiSans, tablas: { 500: "…", … } } }
```

Las `tablas` son las que mide R09. El tipo impide nombrar una tabla que no existe, pero no puede comprobar que corresponda a la familia que declaras: **mide con `generar-avances.mjs` antes de dar de alta una fuente**, o R09 estimará mal y no se quejará.

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
| Clave de Pexels (b-roll de archivo) | va en el mismo `.env`, como `PEXELS_API_KEY` (gratis e instantánea en https://www.pexels.com/api/). Comprueba con `python3 manuales/edicion-video/scripts/bancos.py buscar --proyecto 006 --consulta "grieta en la pared"` |
| Binario del b-roll (`proyectos/*/broll/*/raw/`, `cache/`, `contactos/`, `remotion/public/broll/`) | `python3 manuales/edicion-video/scripts/bancos.py reponer --proyecto NNN`. Funciona porque el **manifiesto sí se versiona**: de él salen la URL, el autor, la licencia y el sha256 con el que se comprueba que lo repuesto es lo que se aprobó |
| Voz en off ya locutada (`proyectos/*/vo/`) | se regenera entera desde `guion-vo.txt`, que **sí** está versionado — es el guion lo que define la pieza, no el WAV |
| Skills de ElevenLabs (`.agents/`, con sus symlinks en `.claude/skills/`) | `npx skills experimental_install` — las repone desde `skills-lock.json`, que sí está versionado |
| `node_modules/` | `cd remotion && npm install` |

Consecuencia: tras clonar, el Studio abre y las composiciones de plantilla y `Catalogo` renderizan; **`Avatar002`, `Avatar003` y las tres piezas de noticias no**, hasta que repongas su medio:

| Composición | Qué le falta | Cómo reponerlo |
|---|---|---|
| `Avatar002`, `Avatar003` | los MP4 del avatar | copia tus clips a `remotion/public/` |
| `Noticia004` | la voz en off `public/noticias/004-vo.wav` | relocuta el guion (ver abajo) y copia el WAV que deja `generar-vo.sh` |
| `Noticia005`, `Noticia006` | sus WAV `public/noticias/005-vo.wav` y `006-vo.wav` | ídem, con `--motor elevenlabs` (están locutadas con la voz clonada del canal) |

Falla de forma **silenciosa**: `staticFile()` solo construye una URL, así que la imagen se ve y lo que falta es la voz, con un 404 en la consola del Studio. Y en el 005 y el 006 no falta solo el sonido: las dos entran por `calculateMetadata`, que toma **lo más largo entre el plan y la voz**, así que sin el WAV la comp dura menos que la pieza aprobada. Para reponerlas:

```bash
bash manuales/video-noticias/scripts/generar-vo.sh proyectos/004/guion-vo.txt --motor say --fps 30
cp proyectos/004/vo/004-vo.wav remotion/public/noticias/
```

El banco de sonidos **sí** está en el repo: los renders dependen de él.

---

## ✅ Estado verificado

- Remotion **4.0.496** · Node **25.8** · `@remotion/paths`, `@remotion/shapes` y `@remotion/media-parser` (duraciones leídas del medio).
- **Sin Tailwind**: no se usaba ni una clase (`grep -rc className src/` = 0). Lo único que aportaba era su *preflight*, que ahora está explícito como reset mínimo en `src/index.css` — verificado píxel a píxel en 4 composiciones.
- **16 composiciones** registradas en `remotion/src/Root.tsx` (plantillas, avatares 001-003, `Catalogo`, `GraficosDemo`, `PlanDemo`, `NoticiaDemo`, `Noticia004`, `Noticia005`, `Noticia006`).
- Auto-Editor **29.3.1** (pipx) · whisper.cpp con `ggml-small.bin`.
- B-roll con Grok Imagine vía `scripts/grok.py` (API directa de xAI): la clave autentica correctamente, pero **el equipo de xAI aún no tiene créditos** → hasta comprarlos en console.x.ai no genera nada.
- **B-roll de ARCHIVO: funciona hoy y sin gastar un peso.** `scripts/bancos.py` (`buscar` · `contactos` · `traer` · `reponer` · `gradar` · `creditos` · `glosario`) contra Pexels, con clave gratuita. Probado de punta a punta contra la API real: filtra por la medida real del hueco, quita el audio del clip, congela autor y licencia en el manifiesto, y monta una hoja de contactos numerada para elegir mirando — que hace falta, porque **Pexels nunca devuelve cero**. Test sin red: `python3 manuales/edicion-video/scripts/revisar-bancos.py`.
- Voz en off: **el 005 está locutado de punta a punta con la voz clonada del canal** (`John Stevans v 0.1`, ElevenLabs) — 16 tomas, cronometradas con `generar-vo.sh --motor elevenlabs`. El **004** sigue con la voz GUÍA del sistema (`--motor say`, Paulina es_MX): sus 17 tomas están cronometradas contra esa pista, así que para publicarlo hay que relocutarlo. `elevenlabs.py guion` es reanudable: reejecutarlo no vuelve a facturar lo que ya está en disco (comprobado en el 005 — al acortar una frase refacturó 3 tomas de 16, esa y sus dos vecinas del stitching).
- `npm run lint` (eslint + tsc) en verde.
- **Segundo motor: HyperFrames `0.7.107`, renderizado de verdad en este Mac (2026-08-13).** Composición 9:16 propia → MP4 **1080×1920, 25 fps, 200 frames, 8,0 s**, con `data-fps` respetado sin pasar `--fps`, GSAP vendorizado (sin CDN) y dos SFX del banco de `sonido/` mezclados a **AAC 48 kHz estéreo**. Las cinco pasadas de `hyperframes check` en verde: lint, runtime, **9 muestras de layout** y **21/21 de contraste**. Sin API key y sin tocar servidores de HeyGen: el render local es gratis.
  - Hallazgo de esa puerta, y es sobre la MARCA, no sobre el motor: el acento `#FF5500` sobre el papel `#ECE8DF` mide **2.62:1**, por debajo del 3:1 de WCAG para texto grande. Como el acento **sí** es una tinta de texto del dialecto editorial (`noticias/dialecto.ts`), afecta a piezas ya publicadas. `marca-a-css.mjs` deriva una variante `--acento-texto` (`#eb4e00` para Luxur) para el segundo motor; **en Remotion sigue sin corregir**.
  - Tipografía: HyperFrames **no usa San Francisco** — sustituye las familias por webfonts deterministas que cachea en `~/.cache/hyperframes/fonts/`. Los renders son reproducibles entre máquinas, pero las tablas de avances de `plan/avances.ts` (`sf500`…`sf800`) **no valen** para este motor.

📖 **Antes de editar un vídeo real, lee** [manuales/edicion-video/SKILL.md](manuales/edicion-video/SKILL.md) — o entra directamente por el [director](manuales/director-video/SKILL.md). Si la pieza sale de una noticia, por [video-noticias](manuales/video-noticias/SKILL.md).
