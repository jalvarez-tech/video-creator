---
name: diseno-sonoro
description: >-
  Diseño sonoro automático para vídeos en Remotion: cuándo y cómo añadir efectos
  de sonido sincronizados al frame y con función narrativa (nunca decorativos).
  Parte de las 4 funciones base (whoosh, riser, impact, click) y elige el efecto
  MÁS ESPECÍFICO del banco según el tipo de motion graphic, su movimiento, material,
  estilo e intención (pop, chime, glitch, scribble, liquid, metal, sparkle, ui,
  typing, boing…), además de texturas/loops continuos, ambientes y foley (clase de
  sincronización `texture`). Cubre detección de eventos, sincronización al momento
  reconocible, peso/dirección, coherencia material, prioridad de la voz, ducking,
  scoring de selección, anti-repetición, presets, volúmenes de mezcla, capas por tipo
  de elemento y la implementación con `SoundCue` + `PistaSonido`. Úsalo siempre que
  haya que poner/ajustar SFX, ambientes, música o mezcla. Catálogo por motion graphic:
  `recetario-motion-graphics.md`. Triggers: "diseño sonoro", "poner sonidos",
  "efectos de sonido", "SFX", "sonorizar motion graphic", "whoosh", "riser",
  "impacto", "click", "pop", "glitch", "chime", "sonido de texto/logo/botón/gráfica",
  "ambiente", "textura", "loop", "foley", "música", "música de fondo", "mezcla",
  "ducking", "sincronizar audio".
user-invocable: true
metadata:
  type: reference
---

# 🔊 Diseño sonoro automático (Remotion)

> **Regla final:** el sonido REFUERZA lo que ocurre visualmente, no compite.
> *No añadas sonido porque hay un corte; añádelo porque el corte representa **movimiento, anticipación, impacto o ritmo**.* Cada efecto necesita una función narrativa y un `reason`. Si no puedes justificarlo, no lo pongas.
>
> **Regla de especificidad (nueva):** *no uses un whoosh para todo.* Primero busca el efecto que representa DIRECTAMENTE el motion graphic, su material o su comportamiento (un botón → **click UI**; una línea dibujándose → **scribble**; un líquido → **liquid**; una foto → **camera**). El whoosh/riser/impact/click son el **complemento** para reforzar movimiento, anticipación, llegada o ritmo.

Banco: [`sonido/MAPA-SONIDOS.md`](../../sonido/MAPA-SONIDOS.md) · Catálogo por motion graphic: [`recetario-motion-graphics.md`](recetario-motion-graphics.md) · Motor: `remotion/src/motor/sound/` · SFX listos: `remotion/public/sfx/`.

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

> El banco físico ya tiene carpeta para casi todas estas familias (POP, DING, GLITCH, METAL SLICE, LÍQUIDO, PAPEL, ELÉCTRICO, DATA…). El mapa `SFX` de `cues.ts` apunta a un archivo representativo por variante; para más matices copia otra variante del banco (ver README de `public/sfx/`).

---

## 2. Qué detectar en cada evento

Antes de elegir un sonido, describe el evento (`MotionGraphicEvent`):

`elementType` (text · title · logo · icon · button · card · chart · shape · particle · glitch · drawing · photo · map · interface · object) · `animation` (fade · slide · scale · bounce · spring · rotate · draw · morph · wipe · reveal · count · glitch · expand · contract) · `startFrame` · `targetFrame` · `endFrame` · `speed` (slow/medium/fast) · `size` (small/medium/large) · `importance` (low/medium/high) · `direction` (left/right/up/down/neutral) · `style` (corporate · technological · cinematic · luxury · educational · social · organic · comedic) · `material?` (digital · paper · metal · glass · liquid · wood · rubber · organic) · `hasDialogue`.

**`targetFrame`** = el frame que recibe la máxima sincronización: el cambio de escena, el pico de velocidad, el frame de contacto, la primera aparición de una revelación/texto, o el fin de un zoom/paneo. **El pico perceptible del sonido coincide con él.**

---

## 3. Reglas de oro

**3.1 Sincroniza el momento RECONOCIBLE, no el inicio del archivo:**
whoosh → pico de velocidad · riser → fin del crescendo · impact/pop → golpe inicial · click/tick → transiente · texture/loop → arranca en el target y se extiende. *(El helper `startFromTarget(type, targetFrame, dur)` lo calcula.)*

**3.2 Peso visual → intensidad:** pequeño/lejano → ligero · grande/cercano → pesado · lento → largo y suave · rápido → corto y agudo.

**3.3 Dirección:** el sonido sigue el movimiento (paneo I↔D, ascendente/descendente, acercar = subir intensidad, alejar = bajarla). *En Remotion `pan`/`direction` son metadato (no hay paneo estéreo nativo); úsalos eligiendo la variante con la tonalidad adecuada.*

**3.4 La voz manda (prioridad absoluta):** reduce los SFX bajo la voz · evita impactos sobre palabras clave · coloca efectos en pausas naturales · aplica **ducking** a la música · un riser nunca tapa el final de una frase.

**3.5 Moderación:** añade un efecto solo si (a) ayuda a percibir movimiento, (b) conecta dos escenas, (c) prepara una revelación, (d) destaca un momento, (e) refuerza el ritmo de un montaje, o (f) mejora un momento cómico/dramático.

**3.6 Coherencia material (módulo 27):** cuando el motion graphic representa un material reconocible, el sonido lo respeta — papel→`paper`/`scribble`, metal→`metal`, cristal→`chime`/`sparkle`, líquido→`liquid`, goma→`boing`, madera→golpe seco apagado (`sharp`/`metal` a bajo volumen; banco 06-CAÍDAS Y GOLPES), orgánico→`liquid`/`ambient-wind`/`scribble`, tecnología→`digital`/`glitch`/`ui`. Cualquier material sin familia dedicada cae a un impact suave o a las 4 funciones base (§3.7). No apliques sonidos metálicos a objetos visualmente suaves salvo intención estilística.

**3.7 Intención antes que literalidad (módulo 28):** el sonido puede representar el material real, la sensación del movimiento, la intención narrativa o el tono general. Elige **una** intención principal; no uses todos los sonidos posibles. (Una tarjeta digital entrando: literal→`ui`+swipe, sensación→`light` whoosh, intención positiva→`chime`, tono cómico→`cartoon`.)

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

**4.1 Scoring cuando hay varias opciones compatibles (módulo 21):**

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

**Smash cut:** riser ascendente y, en el frame objetivo, **todo a 0** (música, sfx, ambiente). Más recetas en el recetario (módulo 26).

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

Capas máximas **por tipo de elemento** (módulo 25):

```
Elemento pequeño/secundario  → 1 efecto   (click · pop · tick · soft whoosh)
Elemento mediano             → 2 efectos  (whoosh + pop · digital + click · scribble + tick)
Elemento principal           → 3 efectos  (riser + whoosh + impact · low-rumble + logo + chime)
```

**Excepción:** un ambiente/textura continua (`ambient-wind`, type `texture`) no cuenta como impacto si se mantiene en segundo plano. No apiles whooshes/clicks/impacts en el mismo frame sin razón.

---

## 9. Duración → envolvente y sincronización por frames

**Ajusta el efecto a la duración del movimiento (módulo 23):**

```
< 8 frames    → transiente muy corto (tick, click, pop)
8–20 frames   → efecto corto (whoosh, pop, chime)
20–45 frames  → efecto medio (whoosh pesado, impact con cola, glitch)
> 45 frames   → textura / loop / efecto prolongado (typing, data, ambient) → type `texture`
```

No estires un sonido corto: prefiere otro archivo más largo, un loop, o una combinación *inicio + textura + final* (`activation → loop → confirmation`).

**Mapeo a frames (módulo 24):**

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

En el motor `volume` es ganancia **lineal 0–1**: `lineal = 10^(dBFS/20)` (helper `dbToGain`). Los `vol` por defecto de cada variante ya están **calibrados por el pico real medido** de su archivo (ffmpeg, en `copiar-sfx.sh`) para caer en el objetivo de su familia — `TARGET_DBFS` = general **−21** · whoosh/impact **−27** · ambient **−30** (punto medio de cada rango). Si cambias un archivo, `copiar-sfx.sh` mide el pico y **sugiere el nuevo `vol`**.

**Con narración (ducking):**
- Reduce TODOS los SFX **3–6 dB extra** mientras hay voz → monta la pista con `<PistaSonido cues={cues} duckDb={-4.5} />`.
- Un cue que caiga sobre una palabra importante: márcalo `underDialogue: true` (reducción extra `DUCK_DIALOGUE_DB`) o, mejor, muévelo a una pausa.
- **Evita que whooshes o impacts cubran palabras clave.** La voz manda siempre.
- **Evita clipping/saturación/picos:** mantén los `vol` calibrados y no apiles varias capas fuertes en el mismo frame.

**Ducking de música:** baja la música progresivamente ANTES del targetFrame, mantén la voz por encima, recupérala tras la cola. En smash cut, `music = sfx = ambient = 0` exactamente en el frame objetivo.

---

## 11. Implementación en este sistema

**Tipo `SoundCue`** (`remotion/src/motor/sound/cues.ts`) — `reason` **obligatorio**. `type` = clase de sincronización (whoosh/riser/impact/click/**texture**), `variant` = timbre (39 variantes mapeadas a `public/sfx/` en el objeto `SFX`; 38 archivos distintos porque `deep` y `boom` comparten `impact-deep.mp3`).

```tsx
import { PistaSonido } from "./sound/PistaSonido";
import { cue } from "./sound/cues";

const cues = [
  cue("txt-in",   "whoosh", "light", 200, 16, "Entra el titular (movimiento)"),
  cue("draw",     "whoosh", "scribble", 240, 30, "Se dibuja la línea del gráfico"),
  cue("count",    "texture","data",   300, 60, "Contador subiendo", { fadeInFrames: 4, fadeOutFrames: 6 }),
  cue("count-end","impact", "chime",  360, 18, "El contador llega al valor final", { priority: "high" }),
  cue("btn",      "click",  "ui",     420, 10, "Se pulsa el botón Seguir"),
  cue("ok",       "impact", "success",432, 16, "Confirmación «Siguiendo ✓»"),
];

// dentro de la composición, por ENCIMA del vídeo (la voz sigue mandando):
<PistaSonido cues={cues} />
```

- **`cue(id, type, variant, targetFrame, dur, reason, opts)`** calcula `startFrame` (sincroniza el momento reconocible según `type`) y el `volume` por defecto **ya calibrado** al objetivo dBFS de la familia (§10).
- **Mezcla / ducking:** monta la pista con `<PistaSonido cues={cues} duckDb={-4.5} />` si el clip tiene narración continua (baja todos los SFX); marca un cue con `underDialogue: true` si cae sobre una palabra importante (§10).
- **Loops/ambientes:** `type: "texture"` + duración larga + `fadeInFrames`/`fadeOutFrames` + `loopable`. **Colas largas:** marca `hasLongTail` (planifica que invadan la escena siguiente).
- **Anti-repetición (§12):** las familias con pool (`pop`, `glitch`, `light`, `swoosh`, `metal`, `mouse`, `sparkle`, `chime`) alternan con `variantIndex` — p. ej. `cue(..., { variantIndex: 1 })`. `resolveSound(variant, i)` elige el archivo+volumen de `POOL[variant]`.
- **Cambiar un sonido / añadir variantes:** copia otro archivo del banco a `public/sfx/` con el nombre estándar (o amplía un pool con sufijo `pop-04`…), edita `copiar-sfx.sh` y reejecútalo; el script **mide el pico y sugiere el `vol`** para copiarlo al mapa.

---

## 12. Evitar la repetición (módulo 22)

```
No repetir el mismo archivo en eventos consecutivos.
No repetir un efecto distintivo más de 2 veces en 10 s.
Alternar variaciones de una misma familia (pop-01 / pop-02 / pop-03).
Mantener consistencia (mismo timbre dentro de una UI) sin caer en monotonía.
```

**Pools listos:** `POOL` (en `cues.ts`) trae ya 3 variaciones calibradas para las familias más propensas a repetirse — `pop`, `glitch`, `light` (whoosh), `swoosh`, `metal`, `mouse`, `sparkle`, `chime`. Álternalas con `variantIndex` (0 = base): en un montaje de 5 cortes, `variantIndex: 0,1,2,0,1`. El banco tiene decenas más por familia (84 whooshes, 68 glitches, 63 metal slices, 17 pops) para ampliar el pool en `copiar-sfx.sh`.

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
