---
name: camara-avatar
description: >-
  Cámara virtual dinámica para vídeos con avatar (HeyGen) en Remotion: cuando el
  avatar es el elemento principal, no lo dejes todo el vídeo en el mismo tamaño y
  posición. Genera variaciones sutiles (acercamientos, alejamientos, reencuadres
  laterales, "hacer espacio") MOTIVADAS por la narrativa —intención de la frase,
  importancia, ritmo, cambios de sección, entrada de motion graphics— para retener
  la atención sin marear. Cubre tipos de plano, zoom in/out, reencuadre y el
  acople zoom↔desplazamiento del cover, continuidad/match cuts, capas
  (avatar dentro de la cámara; subtítulos y gráficos fuera), reposo bajo gráficos
  a pantalla completa, sonido de cámara (whoosh/impact/riser al mínimo, bajo la
  voz) y la implementación determinista con `CameraCue` + `camara.ts` +
  `CamaraVirtual`. Úsalo siempre que el elemento principal del vídeo sea un avatar
  talking-head. Triggers: "cámara del avatar", "cámara virtual", "zoom del avatar",
  "acercar/alejar avatar", "reencuadre", "plano medio/primer plano", "punch in",
  "que no se vea estático", "mover la cámara", "cámara dinámica", "CameraCue".
user-invocable: true
metadata:
  type: reference
---

# 🎥 Cámara virtual dinámica para avatar (Remotion)

> **Regla maestra.** La cámara cambia para **recuperar la atención**, **reforzar una idea** o **liberar espacio** — nunca solo "para que no parezca estático". Cada **acercamiento comunica importancia**; cada **alejamiento, contexto**; cada **desplazamiento crea espacio**; cada **pausa permite comprender**. El avatar es la BASE estable; la cámara la reencuadra con intención.
> Antes de cada movimiento responde: **¿coincide con una frase importante? ¿aporta variedad sin distraer? ¿la cara sigue bien encuadrada? ¿no hay ya otro cambio visual fuerte?** Si dudas → **cámara quieta**.

Motor: [`camara.ts`](../../remotion/src/plantillas/camara.ts) (tipo `CameraCue` · tokens `SHOT`/`LIMITS` · hook `useCamara` · `clampOffset`) · wrapper [`CamaraVirtual.tsx`](../../remotion/src/plantillas/CamaraVirtual.tsx) · plan de ejemplo [`camara-001.ts`](../../remotion/src/plantillas/camara-001.ts) · demo viva [`CamaraDemo.tsx`](../../remotion/src/plantillas/CamaraDemo.tsx) (comp `CamaraDemo`).
🔗 **Gráficos:** [motion-graphics](../motion-graphics/SKILL.md) ([R08](../edicion-video/reglas.md) fuera de la cara). · **Sonido:** [diseno-sonoro](../diseno-sonoro/SKILL.md) (whooshes de cámara al mínimo). · **Motor y flujo:** [edicion-video](../edicion-video/SKILL.md).

---

## ⚠️ Invariante del cover (leer primero)

El avatar es un `<OffthreadVideo … objectFit:"cover">` que a **`scale` 1.0 ya llena el frame EXACTO**. De ahí dos reglas que el motor (`camara.ts`) garantiza —y que rompen la intuición de una cámara "real":

1. **`scale` nunca baja de 1.0.** El "plano abierto" de un cover **no** es `scale < 1` (mostraría bordes negros); es la **base 1.0**. Para "abrir" de verdad, aleja *desde* un plano más cerrado hacia 1.0.
2. **Desplazamiento ACOPLADO al zoom.** Solo puedes mover el encuadre dentro del margen que crea el zoom: a escala `s` hay `(s−1)·W/2` px de margen horizontal antes del borde. `clampOffset()` lo recorta. **Un desplazamiento grande exige más zoom** — para el 14 % del ancho (151 px @1080) necesitas `scale ≳ 1.28`.

`useCamara(cues)` aplica ambas y devuelve un `transform` seguro. No animes `top/left/width/height`: solo `translate3d + scale`.

---

## 1. Tipos de plano (token `SHOT`)

| Plano | `scale` | Uso | Nota |
|---|---|---|---|
| **wide** | **1.00** | base / respiración visual | el cover llena exacto; no bajar de 1.0 |
| **medium** | 1.05–1.12 | encuadre principal de explicación | el "hogar" al que se vuelve |
| **close** | 1.15–1.28 | frase importante, emoción, pregunta, CTA | destaca |
| **detail** | 1.30–1.35 | solo hooks / máxima importancia | tope duro 1.35 |

`escalaDe(shot)` da el valor medio. **Nunca** cruces `LIMITS.scaleMax = 1.35`: por encima corta rostro, cabeza o manos.

---

## 2. Acercar (zoom in) y alejar (zoom out)

**Acercar** cuando el avatar: empieza una frase importante · presenta un beneficio · hace una afirmación fuerte · plantea una pregunta · introduce el CTA. El zoom debe **empezar un pelo antes** de la palabra clave, llegar al máximo **durante** la frase y **mantenerse estable** al cerrar la idea. Easing suave, sin brusquedad.

**Alejar** cuando: termina una idea · empieza una explicación amplia · aparece info adicional · hay que liberar espacio para un gráfico · bajar la intensidad tras un momento fuerte · preparar el siguiente acercamiento.

| Movimiento | `scale` | Duración (s) | @25fps | @30fps | Easing |
|---|---|---|---|---|---|
| Zoom in estándar | 1.00 → 1.15 | 0.8–1.8 | 20–45 | 24–54 | `ease-out` / `ease-in-out` |
| Zoom in hook fuerte | 1.00 → 1.22 | 0.5–1.0 | 13–25 | 15–30 | `ease-out` |
| Zoom out | 1.15 → 1.00 | 0.8–1.5 | 20–38 | 24–45 | `ease-in-out` |

Duración en frames = `Math.round(s · fps)` (helper `seg` de [`motion.ts`](../../remotion/src/plantillas/motion.ts)). **No** encadenes primeros planos fuertes sin reposo entre ellos.

---

## 3. Reencuadre lateral y "hacer espacio"

No mantengas al avatar siempre centrado cuando entra texto/gráfica. **Recuerda el acople** (§Invariante): un desplazamiento exige zoom que lo permita.

- Gráfico a la **derecha** → desplaza el avatar a la **izquierda** (`endX` negativo). Y viceversa.
- Rango: **4 %–14 %** del ancho/alto (`LIMITS.panPctMax = 0.14`); `clampOffset` no deja pasarse.
- Mantén el rostro en zona segura, la mirada hacia el contenido y equilibrio en la composición. **No** zigzaguees al avatar en cada frase.

**En 9:16 de este sistema** los motion graphics viven en la **franja superior**, sobre la cabeza ([R08](../edicion-video/reglas.md)) — o son **tomas a pantalla completa**. Así que "hacer espacio" aquí suele ser **bajar un poco el avatar + zoom suave** para abrir *headroom* bajo el overlay superior (p. ej. el botón "Seguir" del CTA), no un paneo lateral largo. El reencuadre lateral fuerte es sobre todo un recurso de **16:9** (avatar a un lado, gráfico al otro).

**Combinado** (siempre pequeño): `scale 1.00→1.12` **+** `translateX 0→−40` **+** `translateY 0→−10`. Nunca combines a la vez zoom fuerte + paneo largo + rotación + shake + desenfoque.

---

## 4. Cámara según la narrativa

| Momento | Movimiento | Detalle |
|---|---|---|
| **Hook (0–3 s)** | medium → close moderado | acercamiento corto en la 1.ª frase; cambia el encuadre **antes de los 3–5 s** |
| **Pregunta** | zoom in sutil + pausa | mantén breve reposo visual tras la pregunta |
| **Beneficio principal** | close | acerca y **reduce** movimientos secundarios |
| **Explicación extensa** | medium / wide | libera espacio para gráficos; cámara calmada |
| **Cambio de sección** | cambia el encuadre | medium↔wide · centro→lateral · close→zoom out |
| **CTA** | acercamiento progresivo | avatar **estable** durante la frase final |

Los cambios coinciden con el **ritmo del discurso**. Prioriza variación en: primeros 3 s · preguntas · datos · cambios de tema · frases emocionales · objeciones · beneficios · antes/después · revelaciones · CTA. **No** cambies de plano en medio de una palabra.

---

## 5. Frecuencia (no estática, pero no en movimiento constante)

| Estilo | Cambio visual cada | Intensidad de cámara |
|---|---|---|
| **Redes sociales** | 2–5 s | zooms rápidos pero controlados; alterna avatar/texto/B-roll |
| **Educativo** | 4–8 s | reencuadres para liberar espacio; zoom in en conceptos |
| **Corporativo** | 5–10 s | zooms suaves, desplazamientos pequeños, sin shakes |
| **Cinematográfico / lujo** | 6–12 s | movimientos lentos, muy sutiles, aterrizajes suaves, sin rebote |
| **Cómico** | según gag | punch in/out repentino, pausa visual |

Un "cambio visual" también es: entrada de texto, gráfica, B-roll, cambio de fondo o transición. **Si ya hay uno fuerte (o un gráfico a pantalla completa), la cámara REPOSA** — no sumes movimiento (§7 y demo `camara-001.ts`).

---

## 6. Continuidad y match cuts

Entre cues la cámara **se queda donde aterrizó** el último (lo hace `useCamara`); antes del primero, en identidad. Al cambiar de encuadre conserva: posición/dirección de la mirada, iluminación, fondo, escala lógica, movimiento continuo y **sincronización labial**. Evita saltos donde la cabeza cambie de golpe. Para un cambio rápido: motion blur sutil, whip muy corto, corte sobre movimiento o transición de escala — **nunca** algo que rompa el lip-sync.

---

## 7. Capas: qué se mueve y qué no

**Solo el avatar va dentro de `<CamaraVirtual>`.** Subtítulos y motion graphics son **overlays fijos, FUERA** de la cámara: cuando el avatar se desplaza para hacer espacio, el gráfico se queda anclado.

```tsx
<AbsoluteFill>
  <CamaraVirtual cues={planCamara}>
    <OffthreadVideo src={staticFile("avatar-9x16.mp4")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </CamaraVirtual>
  <MotionGraphicsFull />                                 {/* overlays FUERA */}
  <SubtitulosSync segmentos={subtitulos001} yPct={70} />
</AbsoluteFill>
```

**B-roll / gráficos a pantalla completa:** el avatar no ocupa toda la pantalla todo el vídeo. Alterna: avatar full · avatar desplazado con texto · avatar pequeño sobre B-roll · avatar en tarjeta/split · gráfico full · regreso al avatar **con acercamiento suave**. Mientras un gráfico full está en pantalla, **la cámara del avatar reposa** (no se ve). En la demo, `MotionGraphicsFull` oculta al avatar en `200–468` y `520–905`; el plan `camara-001.ts` **no** pone cues ahí.

---

## 8. Sonido de cámara (delegado a `diseno-sonoro`)

Los movimientos se acompañan de SFX **sutiles, más sentidos que escuchados**, y **siempre por debajo de la voz**. Enlaza cada `CameraCue.soundCueId` con un `SoundCue` de [`cues.ts`](../../remotion/src/plantillas/sound/cues.ts) (lo reproduce `PistaSonido`).

| Movimiento de cámara | `type` / `variant` | Bucket (mezcla) |
|---|---|---|
| Zoom in rápido | `whoosh` / `light` (o `whip`) | `whoosh` (−27 dBFS) |
| Zoom out | `whoosh` / `reverse` (o `light`) | `whoosh` |
| Reencuadre lateral | `whoosh` / `swoosh` + `direction` | `whoosh` |
| Cambio de plano importante | `impact` / `deep` (suave) | `impact` (−27 dBFS) |
| Cambio cinematográfico | `riser`/`low-rumble` + `whoosh` + `impact` discreto | mixto |

Whooshes e impacts de cámara van **aún más bajos** que el resto de SFX y con **ducking** bajo narración (`DUCK_DIALOGUE_DB`). **Nunca** un whoosh fuerte en cada cambio. Mezcla y variantes: [diseno-sonoro §10](../diseno-sonoro/SKILL.md).

---

## 9. Intensidad por estilo

**Corporativo** zooms suaves, desplazamientos pequeños, sin shake. · **Educativo** reencuadres para liberar espacio, zoom in en conceptos, zoom out para diagramas. · **Redes** cambios más frecuentes, zooms rápidos controlados. · **Lujo** movimientos lentos, zooms muy sutiles, pocos cambios, aterrizajes suaves, sin rebote/whip agresivo. · **Cinematográfico** zooms largos, parallax sutil, profundidad, movimiento ambiental lento. · **Cómico** punch in/out repentino, pausa visual, record scratch opcional.

---

## 10. `CameraCue` e implementación (determinista)

Tipo real en [`camara.ts`](../../remotion/src/plantillas/camara.ts) (`reason` **obligatorio**; si no lo justificas, no lo pongas):

```ts
type CameraCue = {
  id: string; startFrame: number; endFrame: number;
  shot: "wide" | "medium" | "close" | "detail";
  startScale: number; endScale: number;
  startX: number; endX: number; startY: number; endY: number;   // px @ resolución comp
  easing: "linear" | "ease-in" | "ease-out" | "ease-in-out" | "spring";
  purpose: "hook" | "emphasis" | "question" | "explanation" | "make-space" | "transition" | "reveal" | "cta";
  soundCueId?: string; reason: string;
};
```

Escribe el plan con el builder `cam()` (como `cue()` para el sonido) — ver `camara-001.ts`:

```ts
import { cam, CameraCue } from "./camara";
export const camara001: CameraCue[] = [
  cam("cam-hook", 0, 18, "close", { s: 1.0 }, { s: 1.16, y: -6 }, "ease-out", "hook",
    "El acercamiento refuerza la primera frase y crea un cambio visual en los primeros segundos.",
    { soundCueId: "cam-whoosh-hook" }),
  // … reposo bajo los gráficos full; más cues en las ventanas donde el avatar se ve.
];
```

`useCamara` deriva todo de `useCurrentFrame()`/`useVideoConfig()` (fps y W/H reales de la comp — avatar 9:16 = **25 fps**, 16:9 = **30 fps**), interpola `scale`/`x`/`y`, aplica `clampOffset` y devuelve el `transform`. **Prohibido** para el movimiento: CSS `animation`/`transition`, timers, estado async, `Math.random()` sin sembrar (rompen el determinismo entre renders).

---

## 11. Límites (lo que NO se hace)

Mover la cámara continuamente · cambiar de plano en cada oración · zooms agresivos sin motivo · acercarse tanto que corte ojos/boca/cabeza/manos · desplazamientos que saquen la cara de la zona segura · combinar zoom + rotación + shake a la vez · whoosh fuerte en cada cambio · cualquier movimiento que afecte el lip-sync · cambios aleatorios entre renders · **mover la cámara mientras el espectador lee un texto largo** · moverla cuando ya hay un gráfico full o un cambio visual fuerte.

---

## 12. Validación y puntuación (/100)

Antes de aprobar cada movimiento: ¿coincide con una frase importante? ¿aporta variedad sin distraer? ¿la cara queda bien encuadrada (render un frame, [R05](../edicion-video/reglas.md))? ¿hay espacio para los gráficos? ¿es coherente con el movimiento anterior (continuidad)? ¿se mantiene el lip-sync? ¿el sonido de transición es bajo? ¿ya hay otro cambio visual ahí? **¿la escena sería mejor con la cámara quieta?**

Motivación 25 · Encuadre/seguridad de la cara 20 · Continuidad/match cut 15 · Timing/easing 15 · Coordinación con gráficos y reposo 10 · Sonido bajo la voz 8 · Determinismo 5 · Sutileza (sin marear) 2.

| Penalización | Motivo |
|---|---|
| −15 | corta cara/cabeza/manos, o bordes negros (scale<1 / pan sin zoom) |
| −12 | movimiento sin motivo narrativo |
| −10 | cámara en movimiento sobre texto largo o gráfico full |
| −8 | salto de continuidad / lip-sync afectado |
| −6 | zoom demasiado brusco (sin easing) |
| −5 | whoosh de cámara por encima de la voz |

**Bandas:** `90–100` excelente · `80–89` bueno · `70–79` funcional/genérico · `<70` rediseñar. No apruebes < 80 sin explicar sus límites.

---

## 13. Formato de respuesta por escena (obligatorio)

Antes de escribir código, entrega por escena: `MOMENTO NARRATIVO · MOVIMIENTO (shot→shot, scale, x, y) · DURACIÓN (s→frames al fps de la comp) · EASING · PROPÓSITO · SONIDO (soundCueId + intención; mezcla → diseno-sonoro) · CAPAS (qué queda fuera de la cámara) · CONTINUIDAD con el cue anterior · REASON · RIESGOS (encuadre/lip-sync) · PUNTUACIÓN`. Luego: plan de cues (`CameraCue[]`) → wrap del avatar en `<CamaraVirtual>` → validación con frames reales.

---

## ✅ Estado verificado del motor (2026-07-24)

- `camara.ts` + `CamaraVirtual.tsx` + `camara-001.ts` + comp **`CamaraDemo`** → `npm run lint` (eslint + `tsc`) en verde.
- Stills renderizados de `CamaraDemo` (`remotion/out/cam-*.png`): hook (zoom in, subtítulo fijo), reentrada (reencuadre lateral con cara encuadrada), CTA (baja el avatar y abre headroom para el overlay "Seguir"). Reposo correcto bajo los gráficos a pantalla completa.
- La comp `Avatar9x16` (verificada) queda **intacta**; la cámara es una capa opcional y por proyecto.
