---
name: motion-graphics
description: >-
  Dirección de motion graphics en Remotion: convertir cada escena en una
  composición clara y con intención (no efectos al azar). Cubre jerarquía de
  movimiento (hero/supporting/ambient), los principios de animación,
  timing/easing en frames, stagger y coreografía, continuidad causal,
  tipografía cinética, composición por formato, color de marca y la
  implementación determinista con tokens (`motion.ts`) + `Sequence`. Incluye la
  BIBLIOTECA de gráficos ya resueltos (`plantillas/graficos/`: tipografía,
  fondos, datos, trazo dibujado, partículas, 3D, glitch), su CATÁLOGO (comp
  `Catalogo` del Studio + catalogo-graficos.md) y el plan de gráficos COMO DATOS
  (`GraficoCue` → `PistaGraficos`) con validador `revisaPlan()`. Mira el catálogo
  ANTES de escribir un gráfico nuevo. El sonido se delega a `diseno-sonoro`.
  Úsalo siempre que haya que diseñar, animar o revisar un gráfico, título,
  contador, transición, lower-third, logo o CTA en vídeo. Triggers: "motion
  graphics", "animación", "animar", "gráfico en pantalla", "título", "lower
  third", "contador", "transición", "logo reveal", "spring", "easing", "timing",
  "coreografía", "cinético", "subrayar", "subrayado", "rodear una palabra",
  "flecha", "partículas", "confeti", "3D", "voltear tarjeta", "glitch",
  "gráfica de barras", "catálogo de gráficos", "qué gráficos tengo".
user-invocable: true
metadata:
  type: reference
---

# 🎬 Dirección de motion graphics (Remotion)

> **Principio maestro.** El **DISEÑO** decide *qué* se ve · la **ANIMACIÓN** decide *cuándo y cómo* aparece · el **SONIDO** decide *qué se siente* · la **NARRATIVA** decide *por qué* existe cada elemento.
> No añadas una animación porque hay un corte, un texto o un dato. Antes de añadir cualquier recurso responde: **¿qué función narrativa cumple? ¿cuál es el frame más importante? ¿la escena mejora de verdad con esto?** Si no hay respuesta clara, no lo pongas. **Ante la duda, simplifica.**

Motor: `remotion/src/plantillas/` — tokens en [`motion.ts`](../../remotion/src/plantillas/motion.ts) · tema en [`theme.ts`](../../remotion/src/plantillas/theme.ts) · formatos en [`presets.ts`](../../remotion/src/plantillas/presets.ts) · ejemplos reales trabajados en [`MotionGraphicsFull.tsx`](../../remotion/src/plantillas/MotionGraphicsFull.tsx) y [`MotionApple002.tsx`](../../remotion/src/plantillas/MotionApple002.tsx).

📚 **Biblioteca de gráficos** — [`plantillas/graficos/`](../../remotion/src/plantillas/graficos/): 37 primitivas ya resueltas (tipografía, fondos, datos, **trazo dibujado**, **partículas**, **3D**, **glitch**) + el plan de gráficos **como datos** (`GraficoCue` → `<PistaGraficos>`).
**Míralo ANTES de escribir un gráfico:** catálogo vivo en la composición `Catalogo` del Studio · lista en [catalogo-graficos.md](catalogo-graficos.md) (se regenera con `node manuales/motion-graphics/scripts/generar-catalogo.mjs`).
🔗 **Sonido:** [`diseno-sonoro/SKILL.md`](../diseno-sonoro/SKILL.md) + [recetario por motion graphic](../diseno-sonoro/recetario-motion-graphics.md). · **Reglas operativas:** [reglas.md](../edicion-video/reglas.md) (R03 formato, R05 frames, **R08 fuera de la cara**). · **Teoría completa:** [referencia.md](referencia.md).

---

## 1. Proceso obligatorio (4 fases, en orden)

1. **Comprender la narrativa** — qué debe *entender* y *sentir* el espectador; qué es principal y qué secundario; clasifica la escena: `hook · contexto · explicación · demostración · comparación · revelación · conclusión · cta`. No animes todas las escenas con la misma intensidad.
2. **Una sola idea** — 1 mensaje, 1 elemento protagonista, **máx. 2 secundarios**. Si hay más información, divídela en varias escenas (secuencia temporal, no simultaneidad).
3. **Validar el frame estático** — imagina/renderiza el frame principal ([R05](../edicion-video/reglas.md): `npx remotion still <id> out/check.png --frame=N`). Debe entenderse **sin movimiento**: punto focal, jerarquía, legibilidad, contraste, alineación, marca. **No uses animación para tapar un mal diseño.**
4. **Jerarquía de movimiento** — asigna cada movimiento a una capa (§2) y anímalo.

> **Antes de escribir código, decide con qué lo montas:**
> **(a)** ¿Existe ya en la biblioteca? → [catálogo](catalogo-graficos.md). Si existe parecido, añade una prop; no dupliques el componente.
> **(b)** ¿Es un gráfico repetitivo (título, cifra, lista, subrayado, remate)? → declara un `GraficoCue` en `graficos-NNN.ts` y móntalo con `<PistaGraficos>`; valida con `revisaPlan(cues, fps)`.
> **(c)** ¿Es la idea visual PROPIA de esta pieza? → JSX a mano, con las primitivas de la biblioteca como material.
> Si escribes algo reutilizable, súbelo a `plantillas/graficos/`, añade su ficha en `fichas.ts` y su demo en `Catalogo.tsx`, y regenera el catálogo.

---

## 2. Jerarquía de movimiento (regla del protagonista)

| Capa | Intensidad | Qué es | Ejemplos |
|---|---|---|---|
| **Hero** | 100 % | El movimiento principal. **Solo uno a la vez.** | Entrada del titular · crecimiento del dato · revelación del resultado · reveal de logo |
| **Supporting** | 40–60 % | Ayuda a comprender el hero. | Flecha que acompaña una cifra · ✓ de confirmación · etiqueta que explica |
| **Ambient** | 10–25 % | Da vida sin pedir atención. | Gradiente lento · parallax mínimo · brillo suave |

Si varios elementos compiten, **reduce el movimiento de todos menos del protagonista**. En este sistema el hero es literalmente **1 gráfico a la vez** en la franja superior ([R08](../edicion-video/reglas.md)); ver el patrón `Scene` en `MotionGraphicsFull.tsx`.

---

## 3. Principios de animación (aplícalos, no todos a la vez)

| Principio | Qué hacer | Cuándo NO |
|---|---|---|
| **Anticipación** | Preparación breve antes de una acción importante (comprimir un botón antes de activarlo; riser antes de un impacto). `ANTICIPACIÓN → ACCIÓN → RESULTADO`. | En cada microacción. |
| **Staging** | Durante el hero: fondo estable, reduce lo secundario, reserva el mayor contraste para el protagonista. | — |
| **Follow-through** | No detengas todo a la vez: desfasa colas **2–5 frames** (la tarjeta aterriza → el texto se asienta → la sombra recupera). | — |
| **Acción secundaria** | Refuerza el hero (la cifra sube → una flecha sube). | Contador + confeti + zoom + partículas + rotación juntos. |
| **Squash & stretch** | `scaleX 1.08 / scaleY 0.92` → vuelve a `1/1`. Íconos, botones, pops, burbujas. | Logos elegantes, corporativo serio, gráficas, lujo. |
| **Exageración** | Adáptala al estilo: corporativo/lujo **baja** · educativo **media** · redes **media-alta** · cómico **alta** · cinemático **alta en escala/profundidad**. | — |

---

## 4. Timing (segundos → frames al fps de la composición)

`seg(fps, s) = Math.round(s * fps)` (helper en `motion.ts`). **Este sistema:** avatar 9:16 = **25 fps**; plantillas `TutorialYT`/`VerticalSocial`/`FeedCuadrado` = **30 fps**.

| `DUR` (motion.ts) | Segundos | @25 fps | @30 fps | Uso |
|---|---|---|---|---|
| `micro` | 0.15 | 4 | 5 | microacción, tick |
| `pop` | 0.27 | 7 | 8 | pop pequeño |
| `entradaRapida` | 0.35 | 9 | 11 | entrada rápida (redes) |
| `entrada` | 0.50 | 13 | 15 | entrada estándar |
| `tarjeta` | 0.60 | 15 | 18 | tarjeta / bloque |
| `hero` | 0.80 | 20 | 24 | hero motion |
| `revelacion` | 1.40 | 35 | 42 | revelación dramática |

Son **puntos de partida**: ajústalos al ritmo de la voz y la música. La animación siguiente puede empezar cuando la anterior lleva **60–80 %** (no esperes a que termine del todo).

---

## 5. Easing y spring (tokens en `motion.ts`)

**Easing** (`EASE`): entrada / count-up → `outCubic` (rápido→suave) · reposicionamiento (p. ej. 3→0) → `inOutCubic` · movimiento mecánico continuo (barras, marquees, escáner) → `Easing.linear`. Salida → `ease-in` (empieza lento, acelera).

**Spring** (`SPRING`) — elige por **intención**, no pongas spring en todo:

| Token | Config | Para | Rebote |
|---|---|---|---|
| `contador` | damping 16, mass 0.7 | cifras que suben | sin rebote |
| `entrada` | damping 14, mass 0.7 | slides, chips, burbujas | sutil |
| `tarjeta` | damping 14, mass 0.7, stiff 120 | cards con cuerpo | sutil |
| `cta` | damping 14, mass 0.8, stiff 120 | botón / CTA | sutil |
| `golpe` | damping 14 | aparición seca (aspa, scaleX) | mínimo |
| `flip` | damping 12 | giro 3D (TUYO/DE OTRO) | medio |
| `pulso` | damping 8 | latido de énfasis | medio |
| `punch` | damping 8, stiff 220 | pop de una cifra | fuerte (overshoot) |
| `tap` | damping 9, stiff 200 | compresión de botón | fuerte |

Guía de rebote: texto informativo → sin/mínimo · card UI → sutil · ícono social → medio · cómico → alto · **logo de lujo → sin rebote visible**.

---

## 6. Stagger y coreografía

`STAGGER` (motion.ts): mismo grupo **3** · lista **4** · independientes **6** frames. No hagas aparecer todo a la vez.

Coreografía informativa: `contenedor → título → dato principal → apoyos → énfasis → CTA`. · Revelación de producto: `anticipación → cambio de fondo/luz → producto → nombre → beneficio → detalle → CTA`. · Estadística: `contexto → cifra → unidad → explicación → indicador ↑/↓`.

**Continuidad causal** — todo movimiento parece *causado* por algo, y las direcciones conservan significado: `izquierda = anterior · derecha = siguiente · arriba = crecimiento · abajo = caída/cierre · adelante = importancia · atrás = contexto`. Evita que un elemento salga a la izquierda y el siguiente entre desde arriba sin motivo.

---

## 7. Tipografía cinética

Unidad de animación según el contenido: emocional → **frase** · educativo → **palabra/concepto** · titular comercial → **bloques de 2–4 palabras** · dato → **número y unidad por separado** · técnico → **líneas/grupos**.

Reglas: máx. **2 familias** y **3 pesos** · destaca **una sola** palabra por bloque · **no** animes letra a letra un texto largo · **no** muevas párrafos mientras se leen · números con `fontVariantNumeric: "tabular-nums"` (evita saltos de ancho — ya se usa en los contadores). Si el texto no cabe: reduce contenido → mejora saltos de línea → agranda contenedor → baja tamaño. **Nunca cortes texto ni permitas overflow.**

---

## 8. Composición por formato (valores reales de `presets.ts`)

| Formato | Comp / fps | Zona segura | Subtítulo Y | Motion graphics |
|---|---|---|---|---|
| Tutorial 16:9 | `TutorialYT` · 30 | 5 % | 86 % | lower-third; libertad en el tercio superior |
| Vertical 9:16 | `VerticalSocial` / avatar · 30 / 25 | 11 % | 70 % | **franja superior** (`y < 340 px` en 1080×1920), fuera de cara y subtítulo ([R08](../edicion-video/reglas.md)) |
| Feed 1:1 | `FeedCuadrado` · 30 | 8 % | 83 % | banda; centrado |

Elige **una** alineación dominante (izq/centro/der). Profundidad = tamaño · contraste · blur · sombra · superposición · parallax (los cercanos se mueven algo más rápido que los lejanos).

---

## 9. Color (roles → `theme.ts`)

`accent` `#0F766E` = color de marca (cámbialo en `theme.ts` y afecta a todo) · `text` `#FFFFFF` · `textMuted` · paleta MG en `motion.ts` (`teal`=accent, `green`, `cyan`, `amber`, `red`, `white`). **Reserva el mayor contraste** para lo único importante (palabra clave, dato, producto, CTA, estado que cambia). Un cambio de color debe *significar* algo: estado, progreso, éxito (`green`), error (`red`), transformación. No pintes todo con el acento.

---

## 10. Implementación determinista (Remotion)

`useCurrentFrame()` · `useVideoConfig()` · `interpolate()` · `spring()` · `<Sequence>` · `<Audio>`. Anima **`transform` + `opacity`** (evita `top/left/width/height`). **Prohibido** para el movimiento principal: CSS `animation`/`transition`, timers, estado asíncrono o `Math.random()` sin sembrar (rompe el determinismo entre renders).

```tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING, EASE, seg, MG } from "./motion";
import { PistaSonido } from "./sound/PistaSonido";
import { cue } from "./sound/cues";

const Dato: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame, fps, config: SPRING.contador });          // muelle por intención
  const y = interpolate(e, [0, 1], [40, 0]);
  const op = interpolate(frame, [0, seg(fps, 0.5)], [0, 1], { extrapolateRight: "clamp" });
  const n = Math.round(interpolate(frame, [seg(fps, 0.5), seg(fps, 1.5)], [0, 200],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outCubic }));
  return <div style={{ opacity: op, transform: `translateY(${y}px)`, color: MG.green }}>{n}</div>;
};

// El sonido va POR ENCIMA del vídeo; la voz manda. Variante y mezcla → diseno-sonoro (recetario).
// 30 = fps de ESTA comp; usa el fps REAL de tu composición (avatar 9:16 = 25, plantillas = 30).
const cues = [cue("dato", "impact", "chime", seg(30, 1.5), 18, "La cifra llega al valor final", { priority: "high" })];
// <PistaSonido cues={cues} />
```

Rendimiento: SVG para formas, `transform`/`opacity`, assets optimizados, memoiza datos estáticos. Evita cientos de partículas DOM y blurs enormes sobre toda la composición.

---

## 11. Presets visuales (guía de estilo)

`clean` (opacity+translate, sin rebote) · `corporate` (controlado, alineaciones rígidas) · `technological` (grids, sweeps, glitch limpio, pulsos) · `cinematic` (escala, profundidad, cámara, risers+impactos) · `luxury` (lento, distancias cortas, máscaras, sin rebote) · `educational` (secuencias claras, stagger ordenado, highlights, pausas de lectura) · `energetic` (duraciones cortas, whip, stagger cerrado) · `organic` (papel/tinta/líquido) · `playful` (spring, squash, pops) · `comedic` (exageración, boings, cortes abruptos). Detalle y presets sonoros en [referencia.md](referencia.md).

**Puente a sonido** — el `style` de [`diseno-sonoro`](../diseno-sonoro/SKILL.md) §7 usa casi el mismo vocabulario; equivalencias no obvias para el salto motion→sonido: `clean` → corporate · `energetic` → social · `playful` → social/cómico. (diseno-sonoro no tiene clean/energetic/playful; motion no tiene "social".)

---

## 12. Reglas prohibidas (las más caras)

1. Animar todo al mismo tiempo.
2. Más de **un hero** simultáneo.
3. Spring en todos los elementos.
4. Cambiar de dirección sin motivo.
5. Mover texto largo mientras se lee.
6. 3+ estilos de animación en un mismo elemento.
7. Glitch/sonido cómico en contenido de lujo o serio.
8. Zoom de cámara cuando basta una escala local.
9. Repetir el mismo preset todo el rato.
10. **Tapar un mal diseño con efectos.**
11. Sacrificar legibilidad por dinamismo.
12. Mantener una animación solo porque "se ve llamativa".

---

## 13. Calidad — puntúa cada escena /100

Claridad 15 · Composición/jerarquía 15 · Tipografía/legibilidad 10 · Calidad del movimiento 20 · Timing/easing 10 · Coreografía/continuidad 10 · Marca 8 · Sonido 7 · Rendimiento 3 · Accesibilidad 2.

| Penalización | Motivo |
|---|---|
| −10 | dos protagonistas compiten |
| −10 | texto ilegible o cortado |
| −8 | movimiento sin propósito |
| −8 | direcciones incoherentes |
| −7 | rebote excesivo |
| −6 | entrada demasiado rápida |
| −6 | sin tiempo de lectura |
| −5 | preset repetido |
| −5 | sonido desproporcionado |

**Bandas:** `90–100` excelente · `80–89` bueno (ajustes menores) · `70–79` funcional pero genérico · `60–69` sobrecargado/poco claro · `<60` rediseñar. **No apruebes una escena con <80 sin explicar sus límites.** *(Mismas bandas en [referencia.md §21](referencia.md).)*

---

## 14. Formato de respuesta por escena (obligatorio)

Antes de escribir código, entrega para cada escena: `PROPÓSITO · MENSAJE · PROTAGONISTA · SECUNDARIOS · COMPOSICIÓN · ESTILO · ENTRADA · PRINCIPAL · SALIDA · TIMING · EASING · STAGGER · SONIDOS (frame + intención de sync; variante y mezcla → diseno-sonoro) · RAZÓN DE DISEÑO · RIESGOS · PUNTUACIÓN`. Luego: plan de escenas → tokens de movimiento → cues de sonido → estructura de componentes → código Remotion → validación.

---

## 15. Checklist antes de aprobar una escena

1. ¿Se entiende **sin audio** y **sin movimiento** (frame estático)?
2. ¿Hay **un** protagonista claro (un solo hero)?
3. ¿Cada movimiento tiene una **causa** y las direcciones son coherentes?
4. ¿Hay **tiempo de lectura** suficiente y el texto no se corta?
5. ¿El movimiento y el sonido **corresponden a la marca**?
6. ¿El código es **determinista** (frame-based, sin CSS/timers/random)?
7. **¿La escena funciona mejor con todos estos efectos o sería más clara quitando alguno?**

**Si dudas en la 7 → quita.**
