---
name: director-video
description: >-
  Director/orquestador del sistema "video-creator": la PUERTA DE ENTRADA. Con una
  instrucción simple ("monta el vídeo del avatar con este guion", "arma la
  composición", "haz el vídeo con todos los recursos"), coordina TODAS las capas y
  motores del proyecto —motor Remotion + pipeline (edicion-video), cámara virtual
  del avatar (camara-avatar), motion graphics (motion-graphics), sonido/SFX
  (diseno-sonoro), b-roll IA (Grok Imagine por la API de xAI), avatar (heygen)—
  en una sola composición coherente. Decide el
  orden de trabajo, reparte el espacio y la atención entre
  capas (quién manda cuándo), fija el fps único y el z-order, y valida con frames
  antes de exportar. Abre SIEMPRE los artefactos del proyecto
  (proyectos/NNN/artefactos/: 01-plan, 02-layout, 03-timeline) antes de escribir
  código, y usa la biblioteca de gráficos ya existente (motor/graficos/ +
  su catálogo) en vez de reinventar cada gráfico. Úsalo SIEMPRE que se pida
  montar/ensamblar/producir un vídeo completo, empezar un vídeo o proyecto nuevo,
  o "usar todo lo del proyecto"; delega el detalle de cada capa en su skill.
  Triggers: "monta el vídeo", "arma la composición", "haz el vídeo completo",
  "produce el vídeo", "usa todos los recursos", "compón el vídeo del avatar",
  "vídeo con cámara + gráficos + sonido", "ensambla la escena", "empezar un
  vídeo", "vídeo nuevo", "nuevo proyecto de vídeo", "proyecto 004".
user-invocable: true
metadata:
  type: reference
---

# 🎬 Director de vídeo — orquestador del sistema

> **Regla maestra.** La **NARRATIVA** manda; cada capa (cámara · gráficos · sonido · subtítulos) sirve a la MISMA intención. El director no diseña cada capa —**delega** en su skill— sino que decide **el orden**, **el fps único**, **el z-order**, y **quién cede a quién** cuando dos capas compiten. **Un solo protagonista a la vez.** Ante la duda, **menos**.

Root: **`/Users/nicecode/Work/jalvarez/video-creator`**. Este skill es la **capa de arriba**: recibe la instrucción, reparte el trabajo entre los skills especializados y ensambla la composición final en Remotion.

---

## 1. Mapa de recursos (a quién delega cada decisión)

| Decisión / capa | Skill | Motor / archivos |
|---|---|---|
| Motor, estructura, formato, cortes, transcripción, render, publicación | [edicion-video](../edicion-video/SKILL.md) · [proceso](../edicion-video/proceso-edicion.md) · [reglas](../edicion-video/reglas.md) | `remotion/`, `presets.ts`, `plantillas/`, `auto-editor`, `transcribir.sh` |
| **Cámara** del avatar (zoom / reencuadre / hacer espacio) | [camara-avatar](../camara-avatar/SKILL.md) | `camara.ts` · `CamaraVirtual.tsx` · `camara-NNN.ts` |
| **Motion graphics** (títulos, datos, transiciones, CTA) | [motion-graphics](../motion-graphics/SKILL.md) | `motion.ts` · `theme.ts` · **biblioteca `motor/graficos/`** ([catálogo](../motion-graphics/catalogo-graficos.md)) · `graficos-NNN.ts` + `PistaGraficos` |
| **Sonido** (SFX, mezcla, ducking) | [diseno-sonoro](../diseno-sonoro/SKILL.md) | `sound/cues.ts` · `PistaSonido.tsx` · `cues-NNN.ts` |
| **B-roll** generado con IA | **Grok Imagine**, API directa de xAI (único motor — ver §3h; `seedance-20` sin suscripción, no usar) | `scripts/grok.py` · clips en `proyectos/NNN/broll/grok/` |
| **Avatar** talking-head (fuente) | [heygen](../edicion-video/heygen.md) | `scripts/heygen.py` |
| **Noticias** (formato completo, sin avatar) | [video-noticias](../video-noticias/SKILL.md) · [recetario](../video-noticias/recetario-tomas.md) | `noticias/` (theme + `TomaNoticia` + `PistaNoticia`) · `noticia-NNN.ts` |
| Subtítulos sincronizados | edicion-video | `SubtitulosSync.tsx` · `subtitulos-NNN.ts` |

**No repitas** aquí lo que ya dice cada skill: cuando toca diseñar una capa, **abre su SKILL.md** y sigue sus tablas.

> **Excepción — el formato NOTICIAS no es una capa, es una pieza entera.**
> [video-noticias](../video-noticias/SKILL.md) trae su propio look (papel beige +
> naranja, serif/sans), su propia estructura narrativa (7 beats) y su propia capa
> declarativa (`TomaNoticia[]` → `<PistaNoticia>`), y **no lleva avatar**. Si la
> instrucción es "monta esta noticia", entra directo por ahí y el director solo
> interviene si además hay avatar, en cuyo caso este formato aporta el look de
> las tomas de gráfico y el avatar sigue las reglas de §3.

---

## 2. Flujo de una instrucción (orden de decisiones)

Sigue [proceso-edicion.md](../edicion-video/proceso-edicion.md) (Fase 3, 7 pasos, con **puertas de control**: Claude entrega evidencias y ESPERA; no exporta a ciegas). Orden creativo del director:

> **Antes del paso 0 — abre los artefactos.**
> `bash manuales/director-video/scripts/artefactos.sh NNN` crea
> `proyectos/NNN/artefactos/` con `01-plan.md` · `02-layout.md` · `03-timeline.md`.
> Los pasos 0-3 se escriben ahí (plan), los 4-6 salen de ahí (timeline). No es
> burocracia: es lo que evita releer 781 líneas de JSX para mover una escena 8
> frames, y lo que deja registro de POR QUÉ cada elemento entra donde entra
> ([por qué](artefactos/README.md)).

0. **Narrativa** — clasifica el vídeo y sus escenas (`hook · contexto · explicación · demostración · comparación · revelación · conclusión · cta`) y elige **UN estilo** (§4). No animes/mueves todo con la misma intensidad.
1. **Formato + comp** ([R03](../edicion-video/reglas.md)) — elige plantilla/preset y **fija `width`/`height`/`fps`** en la `<Composition>` ANTES de animar. Con avatar real: `ffprobe` da fps/resolución/duración ([R01](../edicion-video/reglas.md)).
2. **Guion + subtítulos** ([R02](../edicion-video/reglas.md)) — transcribe si hace falta (`transcribir.sh`) → `subtitulos-NNN.ts`. *(Avatar HeyGen: habla limpia → se salta cortes y, si el guion es conocido, transcripción — ver proceso §variante.)*
3. **Escenas / tramos** ([R04](../edicion-video/reglas.md)) — divide en bloques ~10 s; marca en el guion dónde va cada refuerzo visual y cada cambio.
3·bis. **B-roll** (solo si alguna escena lo pide) → genera **ya**, no al final: tarda minutos y el resto del plan depende de su duración real. Motor (`scripts/grok.py`) y límites en **§3h**. El script ya descarga el MP4 a `proyectos/NNN/broll/grok/raw/` **en la misma llamada** (las URLs caducan); mide con `ffprobe` antes de contar frames.
4. **Plan de CÁMARA** (si hay avatar) → `camara-NNN.ts` con [camara-avatar](../camara-avatar/SKILL.md). Movimientos motivados, en frames absolutos al fps de la comp.
5. **Plan de MOTION GRAPHICS** → `graficos-NNN.ts` (`GraficoCue[]`) con la biblioteca de [motion-graphics](../motion-graphics/SKILL.md); lo único de la pieza, a mano. Franja superior ([R08](../edicion-video/reglas.md)) o toma a pantalla completa. **1 hero a la vez** — `revisaPlan()` lo comprueba.
6. **Plan de SONIDO** → `cues-NNN.ts` con [diseno-sonoro](../diseno-sonoro/SKILL.md). La voz manda; SFX debajo + ducking.
7. **Ensamblar** la comp (z-order §3) y **validar**: frames reales ([R05](../edicion-video/reglas.md)) → prueba 720p ([R06](../edicion-video/reglas.md)) → final.

---

## 3. Contrato compartido (cómo encajan las capas sin pelearse)

Esto es lo que **solo el director** posee — la coordinación transversal que ninguna capa ve por sí sola:

**a) Un fps único por comp.** Avatar 9:16 = **25 fps** · plantillas 16:9/9:16/1:1 y avatar 16:9 = **30 fps**. **Todo** (cámara, MG, sonido) se calcula en **frames absolutos** a ESE fps con `seg(fps, s)`. Nunca mezcles fps entre capas.

**b) Z-order (capas, de atrás a delante).** El orden NO es negociable:
```tsx
<AbsoluteFill>                              {/* fondo (negro / B-roll) */}
  <CamaraVirtual cues={camaraNNN}>          {/* SOLO el avatar se reencuadra */}
    <OffthreadVideo src={staticFile("avatar-9x16.mp4")}
      style={{ width:"100%", height:"100%", objectFit:"cover" }} />
  </CamaraVirtual>
  <PistaGraficos cues={graficos001} />       {/* overlay FIJO — el plan de gráficos */}
  <MotionPropio001 />                        {/* + lo ÚNICO de esta pieza, a mano */}
  <SubtitulosSync segmentos={subtitulos001} yPct={70} />   {/* overlay FIJO */}
  <PistaSonido cues={cues001} duckDb={-4.5} />             {/* voz manda + ducking */}
</AbsoluteFill>
```
Regla: **solo el avatar va dentro de `<CamaraVirtual>`**; MG y subtítulos son overlays fijos ([R09](../edicion-video/reglas.md)).

Las **tres capas declarativas** del sistema son hermanas y se leen igual: `camara-NNN.ts` → `<CamaraVirtual>` · `graficos-NNN.ts` → `<PistaGraficos>` · `cues-NNN.ts` → `<PistaSonido>`. Lo repetitivo (títulos, cifras, listas, remates, CTA) va en el plan de datos; el JSX a mano queda para la idea visual propia de la pieza (como el mundo líquido del 003).

**c) Reparto del espacio (9:16).** Cara al centro · MG en franja superior `y < 340px` ([R08](../edicion-video/reglas.md)) · subtítulos `y ≈ 70%` · la cámara **abre headroom** (baja el avatar) cuando un overlay superior lo necesita. Nada tapa la cara ni el subtítulo.

**d) Prioridad de atención (quién cede).** **1 hero a la vez.** Si hay **gráfico a pantalla completa** o un cambio visual fuerte → la **cámara REPOSA** ([camara-avatar §7](../camara-avatar/SKILL.md)) y el gráfico manda. Si el avatar hace el punto → **MG al mínimo**. Nunca dos protagonistas compitiendo.

**e) Sincronía con el discurso.** Movimientos de cámara y entradas de MG caen **sobre frases importantes**, nunca en medio de una palabra. El sonido sincroniza su **momento reconocible** al `targetFrame` (whoosh ~65% dentro, riser termina en target, impact al inicio).

**f) Mezcla.** La **VOZ manda** siempre. SFX por debajo; **whooshes de cámara e impacts aún más bajos** + ducking (`DUCK_DIALOGUE_DB`). Un whoosh de cámara nunca cubre la voz.

**g) Determinismo.** Todo desde `useCurrentFrame()`/`useVideoConfig()`. Prohibido `Math.random()` sin sembrar, timers, `Date.now()`, CSS `animation`/`transition` para el movimiento (rompen la coherencia entre renders).

**h) B-roll generado por IA — motor y límites.** El b-roll es un **asset externo** que entra en la capa de **fondo** (z-order, §3·b), no una capa declarativa: no tiene plan `broll-NNN.ts`; se genera, se descarga y se referencia como `<OffthreadVideo>`.

**Motor único: Grok Imagine por la API DIRECTA de xAI** (`api.x.ai`), con el script `manuales/edicion-video/scripts/grok.py` (stdlib, hermano de `heygen.py`). Clave **`XAI_API_KEY`** en el `.env` de la raíz. **No se usa RunAPI**: era un revendedor con cuenta y factura aparte; yendo directo se paga solo a xAI.

> **`seedance-20` NO está disponible** — el usuario no tiene suscripción (2026-08-05). El skill sigue instalado, pero es un pack de *prompt-directing*, **no** el modelo: sin suscripción no genera nada. **No lo propongas como alternativa ni planifiques contando con él.** Si algún día se contrata, vuelve a entrar como motor de respaldo para el caso del punto 1.

Llamada base (`--help` para el resto):

```shell
python3 manuales/edicion-video/scripts/grok.py video "plano del hall al atardecer, cámara que retrocede" --duracion 6 --salida proyectos/NNN/broll/grok/raw/shot-01.mp4
```

El script sondea hasta que termina, **descarga el MP4 él mismo** y guarda el JSON de la llamada en `broll/grok/prompts/` para poder regenerar.

Cuatro límites que **solo el director** vigila, porque cruzan capas:

1. **La resolución del b-roll está POR CONFIRMAR — mídela en el primer clip.** La doc pública de xAI no fija la resolución de salida, así que **no la des por supuesta**: en cuanto salga el primer MP4, `ffprobe` y anótalo en el plan. Hasta entonces trabaja asumiendo lo peor (≤720p frente a comps de 1080×1920 / 1920×1080): colócalo **detrás del avatar** (fondo), **desenfocado/oscurecido** como scrim, o en un **plano escalado o enmarcado** que no llegue al borde. Y como **no hay motor alternativo**, si una escena pide un plano **nítido a pantalla completa** y la medición confirma que no llega, el b-roll IA **no es la herramienta**: resuélvelo con la biblioteca de gráficos ([motion-graphics](../motion-graphics/SKILL.md)), con metraje real, o replanteando la escena. Nunca subas un 720p a 1080 esperando que no se note.
2. **Las URLs caducan.** Las que devuelve la API son temporales: nunca guardes la URL en el código ni en un artefacto. `grok.py` ya descarga el MP4 en la misma llamada — no lo puentees. Copia a `remotion/public/` lo que use la comp. Un proyecto tiene que poder re-renderizar dentro de un año.
3. **El fps de la comp manda (§3a).** El clip llega con el fps que le dé la gana al modelo. **Nunca** cambies el fps de la comp para encajar un b-roll: mide con `ffprobe` ([R01](../edicion-video/reglas.md)) y re-tiempa en Remotion.
4. **El texto va en Remotion, nunca en el prompt.** Lo que cualquier modelo generativo escribe en pantalla es poco fiable. Los títulos son motion graphics (§1).

**Cómo conseguir 9:16.** La doc de xAI **no documenta** un parámetro de aspect ratio para vídeo. Dos vías, en este orden: (1) **imagen → vídeo** — genera primero un still vertical (`grok.py imagen`), súbelo a una URL pública y pásalo con `--imagen`; el encuadre de partida manda, y es la vía que no depende de campos sin documentar. (2) Probar `--extra '{"aspect_ratio":"9:16"}'`, que inyecta el campo tal cual por si la API lo acepta aunque no esté escrito. Si ninguna funciona, genera en el ratio que dé y **recorta en Remotion** — asumiendo que recortar cuesta resolución, que es justo lo que vigila el punto 1.

---

## 4. Un estilo, tres capas (coherencia)

Elige **UN** estilo y propágalo coherente a cámara + MG + sonido:

| Estilo | Cámara (frecuencia / intensidad) | Motion graphics | Sonido |
|---|---|---|---|
| **Corporativo** | suave, cada 5–10 s | controlado, alineaciones rígidas | discreto, pocos SFX |
| **Educativo** | reencuadres para liberar espacio, cada 4–8 s | secuencias claras, highlights, pausas de lectura | marca conceptos, sin saturar |
| **Redes** | zooms rápidos controlados, cada 2–5 s | entradas cortas, whip, stagger cerrado | más presencia, variado |
| **Lujo** | lento y muy sutil, pocos cambios | distancias cortas, sin rebote | mínimo, aterrizajes suaves |
| **Cinematográfico** | zooms largos, parallax | escala, profundidad, risers+impactos | diseño sonoro con cuerpo (bajo la voz) |
| **Cómico** | punch in/out repentino | exageración, boings, cortes | cartoon/record-scratch puntual |

Puente motion↔sonido (vocabulario casi común) en [motion-graphics §11](../motion-graphics/SKILL.md). No mezcles estilos entre capas (glitch cómico sobre cámara de lujo, etc.).

---

## 5. Entrada mínima (qué necesita el director)

Con **una instrucción simple**, el director **infiere** del proyecto y **declara** sus supuestos; solo pregunta lo que bloquea:

- **Necesita:** el clip del avatar (o el guion) y el destino. Si falta el guion, lo pide.
- **Infiere:** fps/resolución/duración (`ffprobe`), formato por defecto del perfil (16:9 tutoriales · 9:16 talking-head · 1:1 repurpose), estilo por defecto (limpio/educativo) y duración de la comp = `frames del clip`.
- **Confirma en 1 línea** antes de producir: `formato · comp · fps · duración · estilo`. Si el usuario no corrige, procede.

---

## 6. Formato de respuesta a "monta el vídeo" (obligatorio)

1. **Cabecera:** `formato · comp · fps · duración · estilo` (supuestos declarados).
2. **Mapa de escenas** (una fila por tramo):

| frames | narrativa | cámara | motion graphic | sonido | subtítulo |
|---|---|---|---|---|---|
| 0–50 | hook | close 1.0→1.16 | — | soft-whoosh | "…" |
| 200–330 | dato | *reposa* | stat full-screen | impact + count | — |

3. **Genera los artefactos:** `proyectos/NNN/artefactos/01-plan.md` · `02-layout.md` · `03-timeline.md` → y de ahí `camara-NNN.ts` · `graficos-NNN.ts` · `cues-NNN.ts` · el JSX propio de la pieza · `subtitulos-NNN.ts` · la comp ensamblada (z-order §3).
4. **Puertas de control:** muestra **frames** clave ([R05](../edicion-video/reglas.md)) → **prueba 720p** ([R06](../edicion-video/reglas.md)) → espera OK → **final**.
5. **Guarda lo que funcionó** en `proyectos/NNN/aprendizajes.md` y las reglas nuevas con la siguiente R libre de [reglas.md](../edicion-video/reglas.md) ([R07](../edicion-video/reglas.md)).

---

## 7. Checklist del director (antes de exportar)

1. ¿Hay **una sola idea** por escena y **un solo hero** a la vez?
2. ¿La **cámara reposa** cuando hay gráfico full o cambio visual fuerte?
3. ¿Los MG están **fuera de la cara y el subtítulo** (R08) y solo el avatar se reencuadra (R09)?
4. ¿Todos los tiempos están en **frames al fps de la comp**?
5. ¿La **voz** queda por encima de todo SFX (whooshes/impacts aún más bajos + ducking)?
6. ¿Cada movimiento/gráfico/sonido cae sobre una **frase importante** con `reason`?
7. ¿El código es **determinista** y validaste con **frames reales**?
7b. ¿Los tres **artefactos** están escritos y coinciden con lo que se renderizó? ¿Miraste el **catálogo** antes de escribir un gráfico nuevo?
7c. Si hay **b-roll**: ¿está **descargado** en `proyectos/NNN/broll/` (ninguna URL de la API en el código), **medido con `ffprobe`** y colocado de forma que su resolución real aguante el formato (§3h)?
8. **¿La escena mejora con todas las capas, o sería más clara quitando alguna?** Si dudas → **quita**.

---

## 8. Qué NO hace el director

- **No** re-explica ni duplica cada skill: delega y enlaza.
- **No** añade una capa porque "toca" (un corte, un dato, un silencio) sin función narrativa.
- **No** deja dos protagonistas compitiendo, ni mueve la cámara bajo un gráfico full.
- **No** exporta el final sin pasar por frames + prueba 720p.
- **No** inventa recursos: usa los motores/plantillas existentes; si falta algo, lo dice.

> **En una frase:** el director convierte *"monta el vídeo"* en un plan coordinado de cámara + gráficos + sonido + subtítulos sobre el motor Remotion, con la narrativa al mando y una sola cosa importante a la vez.
