---
name: diseno-sonoro
description: >-
  Diseño sonoro automático para vídeos en Remotion: cuándo y cómo añadir efectos
  de sonido sincronizados al frame y con función narrativa (nunca decorativos).
  Parte de las 4 funciones base (whoosh, riser, impact, click) y elige el efecto
  MÁS ESPECÍFICO del set según el tipo de motion graphic, su movimiento,
  material, estilo e intención (pop, chime, glitch, scribble, liquid, metal,
  sparkle, ui, typing, boing…), además de texturas/loops continuos, ambientes y
  foley (clase `texture`). Cubre detección de eventos, sincronización al momento
  reconocible (el golpe del archivo se MIDE), peso/dirección, coherencia
  material, prioridad de la voz, ducking, scoring de selección, anti-repetición,
  presets, volúmenes de mezcla, capas por tipo de elemento y la implementación
  con `SoundCue` + `PistaSonido`. Úsalo siempre que haya que poner o ajustar
  SFX, ambientes, música o mezcla. Catálogo por motion graphic:
  `recetario-motion-graphics.md`.
metadata:
  type: reference
---

# 🔊 Diseño sonoro automático (Remotion)

> **Regla final:** el sonido REFUERZA lo que ocurre visualmente, no compite.
> *No añadas sonido porque hay un corte; añádelo porque el corte representa **movimiento, anticipación, impacto o ritmo**.* Cada efecto necesita una función narrativa y un `reason`. Si no puedes justificarlo, no lo pongas.
>
> **Regla de especificidad (nueva):** *no uses un whoosh para todo.* Primero busca el efecto que representa DIRECTAMENTE el motion graphic, su material o su comportamiento (un botón → **click UI**; una línea dibujándose → **scribble**; un líquido → **liquid**; una foto → **camera**). El whoosh/riser/impact/click son el **complemento** para reforzar movimiento, anticipación, llegada o ritmo.

**Cuándo se usa (disparadores):** "diseño sonoro", "poner sonidos", "efectos de sonido", "SFX", "sonorizar motion graphic", "whoosh", "riser", "impacto", "click", "pop", "glitch", "chime", "sonido de texto/logo/botón/gráfica", "ambiente", "textura", "loop", "foley", "música", "música de fondo", "mezcla", "ducking", "sincronizar audio".

SFX del producto: `remotion/public/sfx/` — el set **sintetizado y redistribuible** de [`sfx-base/`](sfx-base/) (55 archivos con los nombres que espera `cues.ts`; los deja ahí `node herramientas/setup.mjs` si faltan) · gestor del set: `node manuales/diseno-sonoro/scripts/sfx.mjs` (`sintetizar` genera el set en `sfx-base/` con ffmpeg · `desde-base` lo copia a `remotion/public/sfx/`, que es lo que hace el instalador · `desde-banco <mapa.json>` trae un banco propio · `medir [archivo…]` da golpe, pico y `vol` sugerido; `--help` lista las opciones) · Catálogo por motion graphic: [`recetario-motion-graphics.md`](recetario-motion-graphics.md) · Motor: `remotion/src/motor/sound/`.

---

## 1. Taxonomía sonora

**Las 4 funciones base** (siempre aplican como refuerzo de movimiento/ritmo):

| Función narrativa | Sonido | Variantes en el sistema |
|---|---|---|
| **Movimiento / transición** | `whoosh` | light · whip · heavy · wind · swoosh |
| **Anticipación / tensión** | `riser` | low-rumble · cymbal |
| **Impacto / énfasis / llegada** | `impact` | deep · sharp · boom · metal |
| **Ritmo rápido / interfaz** | `click` | camera · mouse · pen · ui |

**Familias específicas** (elige estas ANTES que un genérico cuando el motion graphic lo permita):

| Familia | Variante | Se usa cuando el elemento… |
|---|---|---|
| Aparición elástica | `pop` · `boing` | aparece con scale/bounce/spring |
| Notificación / app | `notification` · `msg-send` | es UI, mensaje, confirmación de app |
| Datos / tech | `data` · `digital` · `glitch` · `electric` · `spin` · `typing` | es gráfica, contador, escaneo, giro, escritura, transformación digital |
| Ritmo / conteo | `tick` | avanza palabra a palabra, cuenta, reloj |
| Acierto / error / dinero | `chime` · `success` · `error` · `money` · `coin` | confirma, falla, suma ventas/leads |
| Materiales / trazo / partículas | `scribble` · `paper` · `liquid` · `sparkle` | dibujo a mano, papel, líquido, brillo |
| Logo / inverso / cómico / ambiente | `logo` · `reverse` · `cartoon` · `ambient-wind` | reveal de marca, cierre/suction, remate cómico, textura de fondo |

> El mapa `SFX` de `cues.ts` apunta a un archivo por variante, con el nombre estándar que espera el motor. Para más matices añade a `remotion/public/sfx/` un archivo propio con un nombre nuevo del mismo patrón (`pop-04.mp3`…), mídelo con `node manuales/diseno-sonoro/scripts/sfx.mjs medir` y dalo de alta en `POOL` (§11, §12).

---

## 2. Qué detectar en cada evento

Antes de elegir un sonido, describe el evento (`MotionGraphicEvent`):

`elementType` (text · title · logo · icon · button · card · chart · shape · particle · glitch · drawing · photo · map · interface · object) · `animation` (fade · slide · scale · bounce · spring · rotate · draw · morph · wipe · reveal · count · glitch · expand · contract) · `startFrame` · `targetFrame` · `endFrame` · `speed` (slow/medium/fast) · `size` (small/medium/large) · `importance` (low/medium/high) · `direction` (left/right/up/down/neutral) · `style` (corporate · technological · cinematic · lujo · educational · social · organic · comedic) · `material?` (digital · paper · metal · glass · liquid · wood · rubber · organic) · `hasDialogue`.

**`targetFrame`** = el frame que recibe la máxima sincronización: el cambio de escena, el pico de velocidad, el frame de contacto, la primera aparición de una revelación/texto, o el fin de un zoom/paneo. **El pico perceptible del sonido coincide con él.**

---

## 3. Reglas de oro

**3.1 Sincroniza el momento RECONOCIBLE, no el inicio del archivo:**
whoosh → pico de velocidad · riser → fin del crescendo · impact/pop → golpe inicial · click/tick → transiente · texture/loop → arranca en el target y se extiende. *(El helper `startFromTarget(type, targetFrame, dur)` lo calcula.)*

**3.2 Peso visual → intensidad:** pequeño/lejano → ligero · grande/cercano → pesado · lento → largo y suave · rápido → corto y agudo.

**3.3 Dirección:** el sonido sigue el movimiento (paneo I↔D, ascendente/descendente, acercar = subir intensidad, alejar = bajarla). *En Remotion `pan`/`direction` son metadato (no hay paneo estéreo nativo); úsalos eligiendo la variante con la tonalidad adecuada.*

**3.4 La voz manda (prioridad absoluta):** reduce los SFX bajo la voz · evita impactos sobre palabras clave · coloca efectos en pausas naturales · aplica **ducking** a la música · un riser nunca tapa el final de una frase.

**3.5 Moderación:** añade un efecto solo si (a) ayuda a percibir movimiento, (b) conecta dos escenas, (c) prepara una revelación, (d) destaca un momento, (e) refuerza el ritmo de un montaje, o (f) mejora un momento cómico/dramático.

**3.6 Coherencia material:** cuando el motion graphic representa un material reconocible, el sonido lo respeta — papel→`paper`/`scribble`, metal→`metal`, cristal→`chime`/`sparkle`, líquido→`liquid`, goma→`boing`, madera→golpe seco apagado (`sharp`/`metal` a bajo volumen), orgánico→`liquid`/`ambient-wind`/`scribble`, tecnología→`digital`/`glitch`/`ui`. Cualquier material sin familia dedicada cae a un impact suave o a las 4 funciones base (§3.7). No apliques sonidos metálicos a objetos visualmente suaves salvo intención estilística.

**3.7 Intención antes que literalidad:** el sonido puede representar el material real, la sensación del movimiento, la intención narrativa o el tono general. Elige **una** intención principal; no uses todos los sonidos posibles. (Una tarjeta digital entrando: literal→`ui`+swipe, sensación→`light` whoosh, intención positiva→`chime`, tono cómico→`cartoon`.)

---

## 4. Proceso de selección

```text
ANALIZAR EL MOTION GRAPHIC (elementType, animation, material, estilo, importancia)
        ↓
IDENTIFICAR MOVIMIENTO Y FUNCIÓN (¿aparece? ¿se mueve? ¿transforma? ¿confirma?)
        ↓
BUSCAR FAMILIAS COMPATIBLES (§1 + recetario) — la MÁS específica primero
        ↓
PUNTUAR Y ELEGIR (§4.1) — un solo ganador por encima del umbral
        ↓
SINCRONIZAR con el targetFrame (§3.1, §9) y ajustar a la duración (§9)
```

**4.1 Scoring cuando hay varias opciones compatibles:**

```text
soundScore =
  motionMatch    * 0.25   // encaja con el tipo de elemento + su animación
  + styleMatch   * 0.20   // encaja con el estilo del vídeo (§7)
  + intensityMatch * 0.15 // encaja con el peso/intensidad visual
  + durationMatch  * 0.10 // encaja con la duración del movimiento (§9)
  + directionMatch * 0.10 // encaja con la dirección
  + materialMatch  * 0.10 // coherencia material (§3.6)
  − dialogueConflict * 0.20  // penaliza si pisa la voz
  − repetitionPenalty * 0.15 // penaliza si se usó hace poco (§12)
  − layerPenalty     * 0.15  // penaliza exceso de capas (§8)

IF soundScore < umbral  →  NO agregar sonido.
```

Prefiere siempre el efecto específico sobre el genérico: botón→`ui`/`mouse` > whoosh · línea dibujándose→`scribble` > whoosh · líquido→`liquid` > `digital` · foto→`camera` > impact · elástico→`pop`/`boing` > sharp.

---

## 5. Árbol de decisión (rápido)

```
¿El elemento representa un material/acción reconocible? (papel, metal, líquido, foto, dibujo, botón, glitch…)
├── Sí → usa la familia específica (§1, §3.6, recetario)  ⟵ PRIMERO
└── No → cae a las 4 funciones:
    ¿Hay movimiento visible?
    ├── Grande/pesado/cercano → Heavy Whoosh · Muy rápido → Whip · Ligero/gráfico → Light · Aéreo → Wind
    └── No ¿Se prepara una revelación? → Riser (low-rumble sutil / cymbal urgente / ambos en clímax)
         └── No ¿Frame a destacar? → Impact (deep cinematográfico / sharp físico)
              └── No ¿Montaje rápido (3–4 tomas <1s)? → Click en cada corte · si no → NO agregar
```

El catálogo completo por tipo de motion graphic (texto, título, logo, ícono, botón, tarjeta, gráfica, forma, spring, morph, máscara, partícula, glitch, mecánico, líquido, dibujo, foto, mapa, 3D, cómico) está en **[`recetario-motion-graphics.md`](recetario-motion-graphics.md)**.

---

## 6. Presets de combinación

| Preset | Cadena | Usos |
|---|---|---|
| **1 · Revelación dramática** | Riser → **Deep Impact** (riser termina en el target; impact en ese frame; la cola sigue en la escena nueva) | producto, antes/después, resultado, giro |
| **2 · Transición dinámica** | **Whoosh → Impact** (pico del whoosh en el corte; impact en el 1er frame de B) | whip-pan, zoom agresivo, entrada de gráfico grande |
| **3 · Máxima tensión** | Low Rumble + Cymbal → **Silencio o Impact** | hook, clímax, smash cut |
| **4 · Movimiento con contacto** | **Whoosh → Sharp/Metal Impact** | objeto lanzado que golpea, panel que entra y se detiene |
| **5 · Montaje rápido** | **Click ×N** (+ Light Whoosh opcional debajo) | secuencia de cortes cortos |
| **6 · Logo de lujo** | Soft Riser → `logo` → `chime`/`sparkle` | reveal de marca elegante |
| **7 · Contador** | `data`/`tick` (loop) → `chime` final | estadísticas, cifras |
| **8 · Elemento dibujado** | `scribble` → `tick` | línea/subrayado a mano |

**Smash cut:** riser ascendente y, en el frame objetivo, **todo a 0** (música, sfx, ambiente). Más recetas en el recetario (§22).

---

## 7. Estilo visual → familia sonora

| Estilo | Preferir | Evitar |
|---|---|---|
| **Corporate** | `ui` · `light` · `pop` limpio · `tick` · `chime` sutil | cómicos, impacts constantes, glitch agresivo |
| **Tecnológico** | `digital` · `data` · `glitch` limpio · `electric` · `ui` | orgánicos, cartoon |
| **Cinematográfico** | `low-rumble` · `heavy` · `deep` · `cymbal` · `metal` | cartoon, ui excesivo |
| **Lujo / elegante** | `chime` · `sparkle` · `logo` · impacts refinados con cola limpia | cómicos, agresivos, glitch |
| **Educativo** | `mouse`/`ui` · `pop` · `tick` · `light` · `chime` | impacts cinematográficos constantes |
| **Social / dinámico** | `whip` · `pop` · `mouse` · `sharp` · `glitch` controlado · ritmo de `tick` | colas largas, ambientes lentos |
| **Orgánico** | `paper` · `scribble` · `liquid` · `ambient-wind` | `digital`/`glitch` sobre animación manual |
| **Cómico** | `cartoon` · `boing` · `pop` · record-scratch | mezclar con escenas serias/lujo |

---

## 8. Prioridad y límite de capas

Cuando un evento admita varios sonidos, gana: **1** acción física sincronizada (foley) · **2** revelación / punto narrativo · **3** movimiento principal · **4** cambio de escena · **5** ritmo secundario · **6** decoración.

Capas máximas **por tipo de elemento**:

```
Elemento pequeño/secundario  → 1 efecto   (click · pop · tick · soft whoosh)
Elemento mediano             → 2 efectos  (whoosh + pop · digital + click · scribble + tick)
Elemento principal           → 3 efectos  (riser + whoosh + impact · low-rumble + logo + chime)
```

**Excepción:** un ambiente/textura continua (`ambient-wind`, type `texture`) no cuenta como impacto si se mantiene en segundo plano. No apiles whooshes/clicks/impacts en el mismo frame sin razón.

---

## 9. Duración → envolvente y sincronización por frames

**Ajusta el efecto a la duración del movimiento:**

```
< 8 frames    → transiente muy corto (tick, click, pop)
8–20 frames   → efecto corto (whoosh, pop, chime)
20–45 frames  → efecto medio (whoosh pesado, impact con cola, glitch)
> 45 frames   → textura / loop / efecto prolongado (typing, data, ambient) → type `texture`
```

No estires un sonido corto: prefiere otro archivo más largo, un loop, o una combinación *inicio + textura + final* (`activation → loop → confirmation`).

**Mapeo a frames:**

```
Whoosh / sweep / spin  → startFrame … targetFrame   (pico en el target)
Riser                  → antes del targetFrame       (crescendo termina en el target)
Impact / pop / chime   → targetFrame                 (golpe con cola)
Click / tick           → frame exacto del cambio
Loop / textura / ambient → startFrame … endFrame     (type `texture`, con fades)
Reverse / suction      → frame de salida             (variant `reverse`)
```

Forma de la envolvente según el efecto: *click* ataque inmediato/salida rápida · *impact* ataque inmediato/cola natural · *whoosh* crescendo hacia el pico · *riser* crescendo hasta el target · *ambient* fade in/out suaves · *loop* volumen estable con entrada/salida suaves.

---

## 10. Volumen y mezcla — política de niveles (dBFS)

**TODOS los SFX van por DEBAJO de la voz y de la música principal.** La voz es siempre el elemento principal. Whooshes e impacts van **aún más bajos**: refuerzan el movimiento sin dominar la escena. En dBFS, un valor más negativo = más bajo.

Objetivos de **pico** iniciales (se ajustan según la normalización de cada archivo):

| Familia de mezcla | Objetivo dBFS |
|---|---|
| Efectos generales (ui, pop, click, tick, chime, data, glitch, scribble, liquid…) | **−18 a −24** |
| Whooshes | **−24 a −30** |
| Impacts | **−24 a −30** |
| Efectos ambientales / texturas | **−26 a −34** |

En el motor `volume` es ganancia **lineal 0–1**: `lineal = 10^(dBFS/20)` (helper `dbToGain`). Los `vol` por defecto de cada variante ya están **calibrados por el pico real** de su archivo para caer en el objetivo de su familia — `TARGET_DBFS` = general **−21** · whoosh/impact **−27** · ambient **−30** (punto medio de cada rango). El set sintetizado del producto (`sfx-base/`) se normaliza al MISMO pico que implica cada `vol`, así que los valores de `cues.ts` valen tal cual. El `vol` calibrado es del ARCHIVO concreto, no de la variante: si sustituyes un archivo por uno propio, mídelo con `node manuales/diseno-sonoro/scripts/sfx.mjs medir <archivo>` y pon en `SFX`/`POOL` el `vol` que **sugiere**.

**Con narración (ducking):**
- Reduce TODOS los SFX **3–6 dB extra** mientras hay voz → monta la pista con `<PistaSonido cues={cues} duckDb={-4.5} />`.
- Un cue que caiga sobre una palabra importante: márcalo `underDialogue: true` (reducción extra `DUCK_DIALOGUE_DB`) o, mejor, muévelo a una pausa.
- **Evita que whooshes o impacts cubran palabras clave.** La voz manda siempre.
- **Evita clipping/saturación/picos:** mantén los `vol` calibrados y no apiles varias capas fuertes en el mismo frame.

**Ducking de música:** baja la música progresivamente ANTES del targetFrame, mantén la voz por encima, recupérala tras la cola. En smash cut, `music = sfx = ambient = 0` exactamente en el frame objetivo.

---

## 11. Implementación en este sistema

**Tipo `SoundCue`** (`remotion/src/motor/sound/cues.ts`) — `reason` **obligatorio**. `type` = clase de sincronización (whoosh/riser/impact/click/**texture**), `variant` = timbre (40 variantes mapeadas a `public/sfx/` en el objeto `SFX`; 39 archivos distintos porque `deep` y `boom` comparten `impact-deep.mp3`; más 16 alternas en `POOL` = 55 archivos, los mismos nombres en el set sintetizado y en uno propio).

```tsx
import { PistaSonido } from "./sound/PistaSonido";
import { cue } from "./sound/cues";

const cues = [
  cue("txt-in",   "whoosh", "light", 200, 16, "Entra el titular (movimiento)"),
  cue("draw",     "whoosh", "scribble", 240, 30, "Se dibuja la línea del gráfico"),
  cue("count",    "texture","data",   300, 60, "Contador subiendo", { fadeInFrames: 4, fadeOutFrames: 6 }),
  cue("count-end","impact", "chime",  360, 18, "El contador llega al valor final", { priority: "high" }),
  cue("btn",      "click",  "ui",     420, 10, "Se pulsa el botón del CTA"),
  cue("ok",       "impact", "success",432, 16, "Confirmación ✓ tras pulsar"),
];

// dentro de la composición, por ENCIMA del vídeo (la voz sigue mandando):
<PistaSonido cues={cues} />
```

- **`cue(id, type, variant, targetFrame, dur, reason, opts)`** calcula `startFrame` (sincroniza el momento reconocible según `type`) y el `volume` por defecto **ya calibrado** al objetivo dBFS de la familia (§10).
- **Mezcla / ducking:** monta la pista con `<PistaSonido cues={cues} duckDb={-4.5} />` si el clip tiene narración continua (baja todos los SFX); marca un cue con `underDialogue: true` si cae sobre una palabra importante (§10).
- **Loops/ambientes:** `type: "texture"` + duración larga + `fadeInFrames`/`fadeOutFrames` + `loopable`. **Colas largas:** marca `hasLongTail` (planifica que invadan la escena siguiente).
- **Anti-repetición (§12):** las familias con pool (`pop`, `glitch`, `light`, `swoosh`, `metal`, `mouse`, `sparkle`, `chime`) alternan con `variantIndex` — p. ej. `cue(..., { variantIndex: 1 })`. `resolveSound(variant, i)` elige el archivo+volumen de `POOL[variant]`.
- **Cambiar un sonido / añadir variantes:** copia tu archivo a `remotion/public/sfx/` con el nombre estándar (o amplía un pool con sufijo `pop-04`…), mídelo con `node manuales/diseno-sonoro/scripts/sfx.mjs medir <archivo>` y copia al mapa el `vol` que sugiere. Para traer un banco propio ENTERO: un mapa JSON (`origen`, `destino`, `sha256` por archivo) y `node manuales/diseno-sonoro/scripts/sfx.mjs desde-banco <mapa.json>`; deja `.origen.json` con `modo: "banco"` y desde entonces `sintetizar` se niega a pisarlo (solo con `--forzar`).
- **⚠️ El golpe del archivo se MIDE antes de escribir el cue ([R26](../edicion-video/reglas.md)):** `node manuales/diseno-sonoro/scripts/sfx.mjs medir <archivo…>` (con `--fps 25` para el avatar) da el frame del golpe, la ventana audible y su RMS. En el set sintetizado el golpe está en **t = 0** en impactos, clicks, pops y dings, al **~65 %** en los whooshes y **al final** en los risers: exactamente lo que `startFromTarget` supone, así que `cue()` sincroniza bien tal cual. Con archivos de un banco real NO: no están recortados, y medidos hay golpes hasta 2-3 s dentro (`impact-deep` audible a 1158 ms y pico a 2184 ms · `metal` 1199-1288 ms · `notification` 1125 ms · `click-pen` 609 ms · `click-camera` 607 ms · `boing` 1780 ms · `chime-03` 2809 ms), y `startFromTarget` + la `<Sequence>` recortada reproducen su silencio inicial sin que nada avise. Con esos archivos escribe `startFrame = target − pico` y `durationInFrames ≥ fin audible + cola` con `fadeOutFrames` (una tabla `PICO` por proyecto y un builder propio sobre `cue()`; `cue()` no se toca: cambiarlo movería el audio de piezas ya publicadas). Y el `vol` de tabla iguala picos de MUESTRA, no lo que se oye: bajo una voz continua, el nivel se pone por RMS medido y se verifica rindiendo la pista de SFX sola a WAV.

**Voz y música: `TramoAudio` + `<PistaAudio>`** (`remotion/src/motor/sound/tramos.ts` · `PistaAudio.tsx`). `<PistaSonido>` es para EFECTOS: un archivo de `public/sfx/` anclado a un golpe. Lo que no es un efecto —la voz de una toma, una locución, una música— va por esta otra pista, hermana y más simple: un tramo empieza en su `en`, dura su `dur`, arranca en el segundo `desde` de su fuente y lleva una `ganancia` (un número, o una envolvente de puntos `[frame de la comp, ganancia]`), con fundidos `entra`/`sale` lineales o en potencia constante. `reason` obligatorio, como en un cue.

```tsx
import { PistaAudio } from "../../motor/sound/PistaAudio";
import { envolventeBajoVoz, gananciaHasta, vocesDeCortes } from "../../motor/sound/tramos";

// La voz de las tomas NO se escribe: sale de los cortes del montaje que traen `audio`.
const voces = vocesDeCortes(metrajeNNN, { fps: 30, objetivoLufs: -21 });
const locucion = [{ id: "off", src: "pieza-NNN/off.wav", en: 930, dur: 300, ganancia: gananciaHasta(-22.4, -21), entra: 3, sale: 8, reason: "…" }];
// La música baja SOLA bajo la voz: la envolvente se calcula, no se escribe.
const musica = [{ id: "musica", src: "pieza-NNN/musica.wav", en: 0, dur: DURACION, reason: "…",
  ganancia: envolventeBajoVoz([...voces, ...locucion], { alto: 0.5, bajo: 0.16, rampa: 12, duracion: DURACION, entrada: 3, cola: 36 }) }];

<PistaAudio tramos={[...voces, ...locucion, ...musica]} />   // en la RAÍZ de la composición, al final
```

- **`audio` y `voz` no son del `Corte` del motor: los añade la pieza.** En su `metraje-NNN.ts`: `export interface Corte extends CorteDelFormato<Entrada> { audio?: string; voz?: { s0: number; s1: number; lufs: number; dice?: string } }` (el mínimo que lee el motor es `CorteConVoz`, en `sound/tramos.ts`). `audio` es el WAV del plano: sin él no hay tramo, y la pieza sale sin esa voz sin que nada falle. `voz` sale de `uv run manuales/edicion-video/scripts/limites-voz.py` ([R29](../edicion-video/reglas.md)); sin `voz.lufs`, `objetivoLufs` no hace nada. `frameDeFuente(en, desde, segundo, fps)` dice en qué frame de la composición cae un instante medido en el clip: es con lo que se coloca un texto o un SFX sobre una palabra.
- **Cómo sale la voz de una toma lo decide el plano SIGUIENTE:** si disuelve, cruza con él en potencia constante dentro de la disolvencia (si ese vecino es mudo, esos 6 frames son un fundido, no un cruce); si entra a corte, un desclic de 3 frames; si es la última, un fundido de 12. Por eso la última palabra de una toma tiene que acabar antes de que empiece la disolvencia del plano siguiente, y la de la pieza, al menos 12 frames antes del final: lo comprueba la puerta del proyecto, que es la que sabe dónde acaba cada palabra.
- **La voz manda y no se trata:** una ganancia por toma hasta la mediana (`gananciaHasta(lufs, objetivo)`) y nada más ([R29](../edicion-video/reglas.md)). Voz en **WAV**: el AAC arrastra 1024 muestras de priming que la desplazan contra su imagen.
- **El ducking de la música es un dato.** `envolventeBajoVoz` la baja en los `rampa` frames de ANTES de cada voz, la sube después y funde dos voces con poco hueco en una sola bajada. Con los tramos de `vocesDeCortes` la música queda abajo todo el plano; para que vuelva en cuanto se calla, se le pasan las ventanas de voz medidas. `alto` y `bajo` solo significan algo con la música normalizada a un nivel conocido (p. ej. −16 LUFS).
- **Puerta:** `node manuales/diseno-sonoro/scripts/revisar-audio.mjs <audio-NNN.ts> --fps 30 --duracion N` (frames enteros, fundidos que caben, ganancias, que cada archivo exista y tenga el tramo que se le pide). Que dos VOCES no suenen a la vez lo comprueba la puerta de cada pieza: un tramo no dice si es voz o música.
- `<PistaAudio>` va en la raíz de la composición: dentro de otro `<Sequence>` sus frames dejarían de ser absolutos.
- **La música de un montaje se mide antes de cortar contra ella.** Golpes ≥ 6 dB con su fuerza y la sonoridad cada 5 s de la ventana que se va a usar (el `desde` de un catálogo es un punto de partida, no la respuesta); la rejilla es de FRASES (golpes tras un respiro, cada 8 pulsos) o de PULSO (una recta, en un arpegio de pulso constante), y los cortes grandes caen en los golpes más fuertes. Y cada corte SECO se comprueba sobre el audio del render, uno a uno ([R33](../edicion-video/reglas.md)): un pulso de la recta puede no sonar. Una canción que cae a un lecho suave (un piano) bajo la voz del cierre pide un ducking propio MENOS profundo que el de las demás tomas —bajarla otros 16 dB la dejaría inaudible—: el objetivo es ≈ 10 LU por debajo de la voz, medido.

---

## 12. Evitar la repetición

```
No repetir el mismo archivo en eventos consecutivos.
No repetir un efecto distintivo más de 2 veces en 10 s.
Alternar variaciones de una misma familia (pop-01 / pop-02 / pop-03).
Mantener consistencia (mismo timbre dentro de una UI) sin caer en monotonía.
```

**Pools listos:** `POOL` (en `cues.ts`) trae ya 3 variaciones calibradas para las familias más propensas a repetirse — `pop`, `glitch`, `light` (whoosh), `swoosh`, `metal`, `mouse`, `sparkle`, `chime`. Altérnalas con `variantIndex` (0 = base): en un montaje de 5 cortes, `variantIndex: 0,1,2,0,1`. Para ampliar un pool, añade archivos propios a `public/sfx/` con sufijo (`pop-04`…), mídelos con `sfx.mjs medir` y dalos de alta en `POOL` con su `vol`.

---

## 13. Validación final — checklist antes de aprobar CADA efecto

1. ¿Qué elemento se anima y qué **tipo de movimiento** hace?
2. ¿Qué **material/estilo** representa? ¿Cuál es el **frame** de mayor importancia (`targetFrame`)?
3. ¿Qué **función** cumple el sonido? ¿Hay una opción **más específica** que un whoosh genérico?
4. ¿La **variante** corresponde al **peso**, **tono** y **duración** de la escena?
5. ¿Interfiere con la **voz** u otro sonido? ¿Se **usó recientemente**?
6. ¿La escena funciona **mejor con** el efecto que sin él?

**Si la 6 es "no" o "no estoy seguro" → no lo agregues.**

---

## 14. Regla maestra

```
MATERIAL / ELEMENTO RECONOCIBLE → SU FAMILIA ESPECÍFICA   ⟵ primero
MOVIMIENTO GENERAL     → WHOOSH        ANTICIPACIÓN        → RISER
PUNTO DE LLEGADA       → IMPACT        RITMO RÁPIDO        → CLICK / TICK
APARICIÓN ELÁSTICA     → POP / BOING   INTERFAZ            → UI
TRANSFORMACIÓN DIGITAL → DIGITAL / GLITCH   TRAZO MANUAL   → SCRIBBLE / PAPER
PARTÍCULAS Y LUZ       → SPARKLE       MOVIMIENTO LÍQUIDO  → LIQUID
ACCIÓN REAL            → FOLEY         AMBIENTE CONTINUO   → AMBIENT (texture)
ACCIÓN CÓMICA          → CARTOON

No uses un whoosh para todo. Busca primero el efecto que representa directamente
el motion graphic, su material o su comportamiento; usa whoosh/impact/riser/click
como complemento de movimiento, llegada, anticipación o ritmo.
```
