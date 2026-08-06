---
name: video-noticias
description: >-
  Convierte una NOTICIA (un enlace, un titular, un texto pegado) en un short
  vertical 9:16 de explicación periodística con el look editorial del sistema:
  fondo papel beige + acento naranja, titulares en serif y subtítulos en sans,
  sin avatar en pantalla (voz en off + motion graphics + metraje enmarcado),
  corte rápido de 1-4 s por toma y watermark de marca. Cubre la estructura
  narrativa de 7 beats (gancho · contexto · conflicto · explicación · datos ·
  clímax · cierre), el doble registro visual (papel = explica / negro = muestra),
  las 9 tomas del formato, el plan COMO DATOS (`TomaNoticia` → `PistaNoticia`)
  con validador `revisaNoticia()`, y el reparto con las capas del sistema
  (sonido → diseno-sonoro · b-roll → director §3h · subtítulos → edicion-video).
  Úsalo SIEMPRE que se pida montar un vídeo a partir de una noticia, una
  actualidad, un caso o una polémica; o replicar el look "explicador de noticias
  tech". Triggers: "vídeo de esta noticia", "monta esta noticia", "explica esta
  noticia en vídeo", "short de noticias", "vídeo estilo noticias", "formato
  noticias", "explicador", "news short", "haz un vídeo de este titular",
  "convierte este artículo en vídeo", "vídeo editorial", "papel y naranja".
user-invocable: true
metadata:
  type: reference
---

# 📰 Formato NOTICIAS — de un titular a un short

> **Regla maestra.** Una noticia no es una lista de hechos: es **una cosa que el espectador cree y que resulta no ser así**. El vídeo existe para mover esa creencia. Todo lo demás —el color, el serif, los sliders, el metraje— sirve a eso. **Si una toma no cambia lo que el espectador cree, sobra.**

Root: **`/Users/nicecode/Work/jalvarez/video-creator`**. Este skill es un **formato completo** montado sobre el motor Remotion: trae su propio look, su propia estructura narrativa y su propia capa declarativa. A diferencia del resto del sistema, **no hay avatar en pantalla**: manda la voz en off y lo que se ve son gráficos y metraje.

🔗 Entra por [director-video](../director-video/SKILL.md) si el vídeo mezcla este formato con avatar. Motor y render: [edicion-video](../edicion-video/SKILL.md). Animación: [motion-graphics](../motion-graphics/SKILL.md). Sonido: [diseno-sonoro](../diseno-sonoro/SKILL.md).

📂 **Partes:** [recetario-tomas.md](recetario-tomas.md) (las 9 tomas en detalle) · [artefactos/01-noticia.md](artefactos/01-noticia.md) (el artefacto que se rellena ANTES de tocar código).

---

## 1. El doble registro (la gramática del formato)

El formato alterna **dos mundos** y esa alternancia *es* el look. No es decoración:

| Registro | Fondo | Significa | Tipografía | Se usa en |
|---|---|---|---|---|
| **Papel** | beige `#ECE8DF` + grano | «esto **significa**» | serif en titulares, sans en apoyos, tinta `#111` | gráficos, cifras, comparaciones, prensa, cronologías |
| **Cine** | negro `#000` + foco cenital | «esto **pasó**» | serif blanco | metraje, retratos, reconstrucciones, el cierre |

**Nunca mezcles los dos registros dentro de una toma.** Un gráfico vectorial sobre metraje real, o una foto a sangre sobre papel, es lo que hace que una pieza de este formato se lea como "plantilla mal usada".

Dos consecuencias que se olvidan:
- El **metraje real sobre papel va SIEMPRE enmarcado** (borde naranja + sombra, `TarjetaFoto`). A sangre solo sobre negro. La razón es de lectura: enmarcado se lee como *prueba dentro del artículo*; a sangre sobre papel se lee como *otro vídeo pegado*.
- **Máximo 3 tomas `cine` seguidas.** Más y se pierde el registro editorial y la pieza pasa a parecer un montaje de archivo. `revisaNoticia()` lo avisa.

---

## 2. Los 7 beats (la estructura que retiene)

Para un short de **60-90 s**. Los tiempos son el punto de partida, no una ley:

| Beat | Tiempo | Qué hace | Si falta |
|---|---|---|---|
| **gancho** | 0-4 s | Una afirmación que **contradice** lo que el espectador cree saber | No hay vídeo: se van en el segundo 2 |
| **contexto** | 4-10 s | Qué está pasando y por qué debería importarle | El conflicto no tiene contra qué medirse |
| **conflicto** | 10-22 s | Las dos fuerzas que chocan + **cuándo** empezó | Parece una polémica sin causa |
| **explicación** | 22-40 s | **El mecanismo**: cómo funciona realmente la cosa | El vídeo es un titular largo, no un explicador |
| **datos** | 40-52 s | Las cifras que sostienen la explicación | La explicación suena a opinión |
| **clímax** | 52-68 s | Qué está en juego **ahora**, qué se rompe | La noticia no es de hoy |
| **cierre** | 68-75 s | Remate + gancho a la parte 2 (o CTA) | Se acaba sin que nadie vuelva |

**El bloque que justifica que esto sea un vídeo es `explicación`.** Un titular se lee en 3 segundos; lo que nadie tiene es el *mecanismo*. Si tu plan salta de `conflicto` a `clímax` sin explicar cómo funciona la cosa, has hecho una noticia hablada, no un explicador.

**Gancho — las tres formas que funcionan:**
1. **Desmentido** — «Sam Altman no fundó OpenAI.» (el de la referencia)
2. **Cifra imposible** — «Perdieron 5.000 millones y subieron de valor.»
3. **Consecuencia oculta** — «Esta ley cambia lo que puedes hacer con tus fotos.»

Lo que **no** funciona: preguntar («¿Sabías que…?»), presentarse, o resumir el vídeo antes de darlo.

---

## 3. Las 9 tomas

Cada toma es un tipo de `TomaNoticia`. Detalle completo, props y sonido en [recetario-tomas.md](recetario-tomas.md).

| Toma | Registro | Para qué | Dura | Sonido de partida |
|---|---|---|---|---|
| `titular` | papel · cine | El mensaje de la escena, en serif. La más frecuente | 2-3.5 s | `impact deep` en la palabra clave |
| `prensa` | papel | La **prueba**: recorte real + rotulador amarillo | 3-4 s | `paper` + `pen` al subrayar |
| `comparador` | papel | A vs B en chips naranjas (esto sí / esto no) | 3-4 s | `pop` por chip (alterna variantIndex) |
| `cronologia` | papel | El viaje entre dos fechas. El orden = la dirección | 3-4 s | `whoosh light` + `tick` por hito |
| `cifra` | papel | El dato como argumento. El **recorrido** es el mensaje | 3-4 s | `data` (textura) + `chime` al llegar |
| `medidor` | papel | Lo que sube o baja mientras miras (control vs. dinero) | 3-4 s | `ui` + `data` |
| `retrato` | papel | Foto/clip **enmarcado** con Ken Burns | 2.5-3.5 s | `camera` o `whoosh light` |
| `escenario` | cine | Metraje a sangre sobre negro | 2.5-3.5 s | `whoosh heavy` al entrar |
| `cierre` | cine | Negro + una palabra. El gancho a la parte 2 | 2.5-3 s | `impact deep` + cola |

**Una idea por toma.** Si una toma necesita dos titulares, son dos tomas.

---

## 4. La ficha de estilo (tokens, no números sueltos)

Todo vive en [`noticias/theme-noticias.ts`](../../remotion/src/plantillas/noticias/theme-noticias.ts). **No escribas colores ni tamaños a mano en una toma** — si hace falta un valor nuevo, se añade al theme.

| Rol | Token | Valor |
|---|---|---|
| Fondo papel | `N.papel` | `#ECE8DF` (+ grano 0.025) |
| Fondo tarjeta | `N.hueso` | `#F7F5EF` |
| Fondo cine | `N.negro` | `#000000` |
| Texto principal | `N.tinta` | `#111111` (nunca `#000` sobre beige: vibra) |
| Texto de apoyo | `N.tintaSuave` | `#57524A` (gris **cálido**, no azulado) |
| **Acento** | `N.naranja` | `#FF5500` — el único color vivo |
| Chips isométricos | `N.naranjaChip` | `#E8863A` |
| Rotulador | `N.resalte` | `#FFE24A` |

**Tipografía — la decisión de firma:** **serif** (`Georgia`) para lo que **afirma** (titulares, cifras, años, cierre) · **sans** (`Inter`) para lo que **acompaña** (kickers, etiquetas, labels, chips, subtítulos). Esa mezcla es lo que separa este look de un TikTok genérico: el serif da voz editorial, y el sans mantiene legible lo que se lee a velocidad de habla.

**Marca:** `MARCA.sello` en el mismo archivo. `null` = sin watermark (y sin hueco en la maqueta). Ponle el nombre del canal y aparece la píldora inferior en **todos** los frames, invirtiendo color según el registro.

**Sombras:** proyectadas al **15 %** (`N.sombra`). Más y la pieza pasa de editorial a "plantilla de Canva".

---

## 5. Flujo: de la noticia al vídeo

> **Antes del paso 1 — abre el artefacto.** Copia [artefactos/01-noticia.md](artefactos/01-noticia.md) a `proyectos/NNN/artefactos/01-noticia.md` y **rellénalo**. Es donde se decide qué se cuenta y qué NO; escribir tomas sin esto produce piezas que enumeran hechos en vez de mover una creencia.

1. **Leer la noticia y extraer la CREENCIA a mover.** Una frase: «la gente cree X, y en realidad Y». Si no sale, aún no tienes vídeo — tienes un artículo.
2. **Verificar los hechos y anotar las FUENTES.** Cada cifra y cada titular de la toma `prensa` necesita medio y fecha en el artefacto. El formato *vende* credibilidad; una cifra inventada la quema entera. Si un dato no se puede sostener, se cae del plan.
3. **Guion de voz en off** (~140-160 palabras/minuto). Escribe primero el gancho, y que quepa en 4 s.
4. **Generar la voz** y **medir su duración real** con `ffprobe` ([R01](../edicion-video/reglas.md)). **La voz manda sobre el plan**, nunca al revés: la comp dura lo que dura la voz.
5. **Repartir los 7 beats** sobre esa duración → tabla de tomas con frames absolutos **a 30 fps**.
6. **B-roll y metraje** (solo si alguna toma lo pide) → **genera ya**, antes de escribir el plan: tarda minutos y su duración real condiciona el resto. Motor y los 4 límites en [director §3h](../director-video/SKILL.md). Recuerda que aquí el b-roll casi siempre va **enmarcado** (toma `retrato`), lo que perdona resolución baja.
7. **Escribir `noticia-NNN.ts`** (`TomaNoticia[]`) copiando [`noticia-demo.ts`](../../remotion/src/plantillas/noticia-demo.ts). **Valida con `revisaNoticia(tomas, 30)`** antes de renderizar.
8. **Subtítulos** (`subtitulos-NNN.ts` + `<SubtitulosSync yPct={78}>`) y **sonido** (`cues-NNN.ts` + `<PistaSonido>`, ver §7).
9. **Validar**: frames reales ([R05](../edicion-video/reglas.md)) → prueba 720p ([R06](../edicion-video/reglas.md)) → **esperar OK** → final.

---

## 6. Ritmo (lo que hace que se vea entero)

- **1-4 s por toma.** Por debajo de 0.8 s nadie lee el titular; por encima de 6 s en un short se pierde al 30 %. `revisaNoticia()` avisa de ambos.
- **Sin huecos ni solapes.** El formato es una **sucesión**, no capas apiladas: la toma N+1 empieza exactamente donde acaba la N. El validador lo comprueba.
- **Punch-in permanente.** Cada toma escala un 1.5 % durante su ventana (lo hace `PistaNoticia` sola). Es lo que impide que una toma de gráfico se lea como diapositiva congelada. Por encima del 4 % se percibe como zoom y compite con el contenido.
- **Corta sobre la frase, nunca en medio de una palabra.** El cambio de toma cae donde la voz cierra una idea.
- **Match cut de forma** cuando la haya (el círculo del logo pasa a ser la moneda, la moneda a ser el punto de la cronología). Es gratis y es lo que hace que la pieza parezca dirigida.

---

## 7. Sonido (delegado, con tres reglas propias)

El detalle está en [diseno-sonoro](../diseno-sonoro/SKILL.md) y el [recetario por gráfico](../diseno-sonoro/recetario-motion-graphics.md); el `soundCueId` de cada toma enlaza con su `SoundCue` en `cues-NNN.ts`. Lo específico de este formato:

1. **La voz manda siempre.** Todos los SFX por debajo, con `duckDb={-4.5}`. Un whoosh que tapa una cifra ha arruinado el dato.
2. **Un SFX por toma, no tres.** El formato ya corta cada 2-3 segundos: si cada corte trae whoosh + impact + pop, en 20 segundos es ruido. Elige **el momento reconocible** de la toma (el chip que aterriza, el rotulador que marca, la cifra que frena) y sonoriza **ese**.
3. **El efecto MÁS específico, no un whoosh genérico:** papel → `paper` · rotulador → `pen` · chips → `pop` · cifras → `data` + `chime` · sliders → `ui` · cronología → `tick`.

Música de fondo: opcional y **muy** baja. Si la pieza necesita música para no aburrir, el problema está en el guion.

---

## 8. Voz y subtítulos

**Motor de voz: ElevenLabs** (`scripts/elevenlabs.py`, clave `ELEVENLABS_API_KEY`). Devuelve **audio directo** y se factura por caracteres.

> **Dos piezas, no una.** El skill **oficial** de ElevenLabs (`.agents/skills/text-to-speech/`, instalado desde [elevenlabs/skills](https://github.com/elevenlabs/skills)) es la **documentación de la API**: modelos, ajustes de voz, formatos, stitching, streaming. `elevenlabs.py` es la **herramienta de pipeline** de este proyecto: locuta un guion por tomas y encaja con `generar-vo.sh`, que cronometra el plan. Cuando dudes de un parámetro, mira el skill oficial; cuando quieras locutar un proyecto, usa el script. También quedaron instalados `sound-effects`, `voice-changer`, `voice-isolator` y `speech-to-text`, útiles para otras capas del sistema.

> **No uses HeyGen para la voz de este formato.** HeyGen solo genera **vídeo de avatar**: para quedarte con la pista hay que renderizar el avatar entero y tirar la imagen. Aquí no hay avatar en pantalla, así que es pagar un render que no se usa. HeyGen sigue siendo el motor correcto cuando la pieza **sí** lleva avatar ([heygen.md](../edicion-video/heygen.md)).

Flujo, y el orden importa — **primero se locuta, luego se cronometra**:

```bash
# 1. Ver qué voces tienes (las 'cloned'/'professional' son tuyas)
python3 manuales/edicion-video/scripts/elevenlabs.py voces

# 2. Ensayo en seco: cuántos caracteres cuesta el guion, sin gastar cuota
python3 manuales/edicion-video/scripts/elevenlabs.py guion proyectos/NNN/guion-vo.txt \
  --voz <voice_id> --salida proyectos/NNN/vo/partes --simular

# 3. Locutar de verdad (un MP3 por toma)
python3 manuales/edicion-video/scripts/elevenlabs.py guion proyectos/NNN/guion-vo.txt \
  --voz <voice_id> --salida proyectos/NNN/vo/partes

# 4. Montar la pista y OBTENER LA TABLA DE FRAMES del plan
bash manuales/video-noticias/scripts/generar-vo.sh proyectos/NNN/guion-vo.txt \
  --motor elevenlabs --partes proyectos/NNN/vo/partes
```

**Un audio por toma, no uno por vídeo:** cada ventana del plan sale de la duración real de *su* línea. Con un único archivo habría que segmentarlo a oído después, que es el paso manual que este sistema existe para evitar.

**Y por qué eso no suena a trozos pegados — tres ajustes que no son opcionales:**

| Ajuste | Valor | Por qué |
|---|---|---|
| **Request stitching** | automático | Cada llamada lleva el texto anterior y el siguiente (`previous_text`/`next_text`). Sin esto, generar frase a frase produce **saltos de tono y pausas raras en cada juntura** — que es justo lo que se oye al concatenar después. |
| **Preset `noticias`** | `stability 0.8 · similarity 0.6 · style 0` | Es el preset "News/Professional" del skill oficial. Con los valores conversacionales (0.4) la voz **cambia de tono entre frases**, y ese vaivén es lo que delata a un TTS. |
| **Formato `mp3_44100_128`** | por defecto | Es el único disponible en **todos** los planes. Los sin pérdida (`wav_44100`, `pcm_44100`) exigen **Pro** y devuelven `403` por debajo — no los pongas de default o la primera locución de una cuenta nueva falla. Con plan Pro, `--formato wav_44100` ahorra una generación con pérdida; sobre voz hablada a 128 kbps la diferencia es inaudible. |

Modelo por defecto `eleven_multilingual_v2` (el que el skill marca para *long-form*). `--modelo eleven_v3` da más rango emocional y es el único que admite `--idioma es`.

Otros motores del mismo script: `--motor propio` (te grabaste tú: pásale la carpeta de audios) · `--motor say` (voz de sistema macOS — **pista guía** para fijar el ritmo y revisar la pieza, nunca para publicar).

**Escribir para que lo lea una máquina** — dos reglas que ahorran un ciclo entero:
1. **Números en letra** ("tres mil novecientas ochenta y cinco"). Los TTS los pronuncian mejor, pero además **se leen mucho más lento** de lo que sugiere contarlos como palabras: una línea cargada de cifras rompe cualquier estimación de duración.
2. **Siglas fuera.** "POT" se lee bien en pantalla y no se entiende dicho en voz alta si no eres del sector: en la voz va "ordenamiento territorial", en el gráfico va "POT".

- **Voz en off**, no avatar. Tono narrativo, ágil, con modulación — el formato se sostiene en la voz.
- **Subtítulos sincronizados** en **sans pesada** (`T.subtitulo`), `yPct ≈ 78` (por encima del watermark), 3-5 palabras por línea, con la palabra clave en naranja.
- Los subtítulos son **overlay fijo**: no entran en el punch-in de la toma ni se reencuadran. Si un titular de toma y el subtítulo dicen lo mismo a la vez, **quita el titular** — no repitas texto en pantalla.

---

## 9. Checklist antes de exportar

1. ¿El **gancho contradice** algo en los primeros 4 s, sin pregunta y sin presentación?
2. ¿Hay un bloque de **explicación** real (el mecanismo), o el vídeo es un titular estirado?
3. ¿**Cada cifra y cada titular de prensa** tiene fuente anotada en el artefacto?
4. ¿**Una sola idea por toma** y ningún registro mezclado (gráfico sobre metraje, foto a sangre sobre papel)?
5. ¿El metraje sobre papel va **enmarcado**? ¿No hay más de 3 tomas `cine` seguidas?
6. ¿`revisaNoticia(tomas, 30)` sale **limpio** (sin huecos, solapes, tomas cortas ni `reason` vacíos)?
7. ¿Los colores y tamaños salen de **`theme-noticias.ts`** y no hay hex sueltos en las tomas?
8. ¿La **voz** queda por encima de todo SFX, y hay **un** efecto por toma?
9. ¿El subtítulo **no repite** el titular que ya está en pantalla?
10. ¿Validaste con **frames reales** y prueba 720p antes del final?

---

## 10. Qué NO hace este formato

- **No** pone avatar en pantalla. Si el vídeo lo lleva, el que orquesta es [director-video](../director-video/SKILL.md) y este skill aporta solo el look de las tomas de gráfico.
- **No** inventa cifras, fechas, citas ni titulares de prensa. Un recorte de `prensa` es de un medio real o no existe. **Si te falta el dato, dilo — no lo rellenes.**
- **No** mete texto en el prompt del generador de b-roll: los títulos son motion graphics ([director §3h](../director-video/SKILL.md)).
- **No** usa los tokens de `graficos/estilos.ts` para color: aquél asume fondo oscuro y aquí el fondo es claro. Las **primitivas** de la biblioteca general (Subrayado, Rodea, Aspa, Check, Flecha, Particulas) sí se reusan tal cual.
- **No** añade una toma porque "hay hueco". Ante la duda, **quita**.

---

## 11. Formato de respuesta a "monta esta noticia" (obligatorio)

1. **Cabecera:** `creencia a mover · duración de la voz · comp 1080×1920 · 30 fps · nº de tomas`.
2. **La creencia en una frase:** «la gente cree X; en realidad Y».
3. **Mapa de beats** (una fila por toma):

| frames | beat | toma | registro | contenido | sonido |
|---|---|---|---|---|---|
| 0-78 | gancho | titular | cine | "Sam Altman no fundó OpenAI" | impact deep |
| 78-186 | contexto | comparador | papel | Non Profit / For Profit | pop ×2 |

4. **Fuentes** de cada cifra y cada recorte (medio + fecha). Sin esto no se renderiza.
5. **Genera:** `artefactos/01-noticia.md` → `noticia-NNN.ts` → `subtitulos-NNN.ts` → `cues-NNN.ts` → la comp.
6. **Puertas de control:** frames clave → prueba 720p → **espera OK** → final.
7. **Guarda lo que funcionó** en `proyectos/NNN/aprendizajes.md`.

> **En una frase:** el formato noticias convierte *"monta esta noticia"* en una sucesión de tomas cortas que alternan papel (explica) y negro (muestra), con la voz al mando, una idea por toma y cada cifra sostenida por una fuente.
