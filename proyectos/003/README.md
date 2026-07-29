# Proyecto 003 — "Tu embudo no vende. Descarta."

Vertical 9:16 · 1080×1920 · **25 fps** · **1153 f (46.12 s)** · comp **`Avatar003`**.
Ensamblado por [director-video](../../manuales/director-video/SKILL.md).

fps y duración siguen las reglas del sistema: el **fps original del clip manda**
([R01](../../manuales/edicion-video/reglas.md) · director §3a: avatar 9:16 = 25 fps)
y la **duración de la comp = los frames del clip** (director §5). Sin remuestreo:
cada frame de la comp es un frame del clip y el lip-sync es exacto.

## La dirección de arte en una frase

**Avatar a color y limpio** + **fondos de degradado plano** en carbón (#0E1015)
con **vectores que entran de golpe y cuyo color SIGNIFICA algo**. El fondo está
quieto, la tipografía entra seca: nada intermedio.

### Simbología de color

El color no es marca, es **información**. Cuatro colores contados, cada uno con un
único significado (`mundo-003.ts · SIM`):

| color | significa | dónde |
|---|---|---|
| 🔴 `#FF453A` | se va · falla · se descarta | DESHACERTE · los 95 · «BUENAS ¿PRECIO?» · 01 DESCARTA · HOY tachado · "nunca le volviste a hablar" · DESCARTA final |
| 🟢 `#25D366` | el mensaje que llega · el lead que se salva | los 5 que compran · 03 RECUPERA · SE GUARDA · HACE 3 MESES · el campo del CTA |
| 🟡 `#FFB020` | el dato neutro · lo que pones de tu bolsillo | los 100 clics · 3 COSAS · 02 ORDENA |
| ⚪️ `#8A929E` | contexto · lo que no pide atención | kickers, descriptores, el eje temporal |

El verde es **el de WhatsApp** a propósito: el espectador ya sabe qué significa
ese verde antes de leer nada.

Tres decisiones que hacen que el sistema se lea solo:
- **Las tres funciones = tres colores.** 01 DESCARTA rojo (saca fuera) · 02 ORDENA
  ámbar (clasifica) · 03 RECUPERA verde (salva). Las tarjetas son idénticas en
  maqueta; lo único que cambia de verdad es el color, porque es lo único que
  cambia de verdad en lo que hacen.
- **La tríada se planta antes.** En "HACE SÓLO 3 COSAS" las tres barras ya salen
  rojo·ámbar·verde, así cada tarjeta llega esperada.
- **El foco del fondo lleva el mismo color** que la toma, y en la escena del dato
  **cambia de golpe** (ámbar → rojo en el frame 258) porque el asunto cambia de
  signo: de lo que pagas a lo que pierdes.

Tres cosas que no se tocan:
- **Nada se superpone al avatar** salvo el scrim de la franja superior, que
  OSCURECE. Ninguna capa que sume luz ([R13](../../manuales/edicion-video/reglas.md)):
  el clip está bien expuesto (YMAX 237/255) y cualquier `screen`/`soft-light`
  encima lo hace parecer quemado.
- **Los fondos no tienen textura** ([R12](../../manuales/edicion-video/reglas.md)).
  Lo que da continuidad entre tomas de gráfico es el reparto de luz: el mismo
  degradado base ("la sala") con el foco en distinta posición por toma ("el ángulo
  de cámara"). El **color** de ese foco lo dicta la simbología, no la marca.
- **Los sellos viven en la banda de subtítulos** (y ≈ 1340 px, 70 %), no sobre la
  cabeza. La cara queda entera y limpia; el scrim inferior deja las manos como
  silueta detrás del texto ([R14](../../manuales/edicion-video/reglas.md)).

## Mapa de escenas (frames @25 fps)

| frames | s | narrativa | toma | cámara | motion graphic | sonido |
|---|---|---|---|---|---|---|
| 0–98 | 0.0–3.9 | hook | avatar | push 1.00→1.09 + headroom | — | whoosh muy bajo |
| 98–178 | 3.9–7.1 | hook | avatar | close 1.09→1.17 | sello **DESHACERTE** 🔴 (banda subtítulos) | metal |
| **198–313** | 7.9–12.5 | dato | **gráfico** | *reposa* | malla 10×10: 100 🟡 → **95 se apagan en 🔴**, quedan **5 🟢** · cifra **95** 🔴 | **liquid + deep**, `data`, metal |
| 313–433 | 12.5–17.3 | tesis | avatar | push 1.02→1.12 | sello **3 COSAS** + 3 barras (banda subtítulos) | 3 × tick |
| **433–495** | 17.3–19.8 | explicación | **gráfico** | *reposa* | tarjeta **01 DESCARTA** 🔴 | whip + metal |
| 495–539 | 19.8–21.6 | explicación | avatar | close 1.06→1.14 | — | — |
| **539–601** | 21.6–24.0 | explicación | **gráfico** | *reposa* | tarjeta **02 ORDENA** 🟡 | whip + metal |
| 601–703 | 24.0–28.1 | explicación | avatar | push largo 1.03→1.14 | sello **«BUENAS, ¿PRECIO?»** 🔴 | — |
| **703–764** | 28.1–30.6 | explicación | **gráfico** | *reposa* | tarjeta **03 RECUPERA** 🟢 | whip + metal |
| 764–819 | 30.6–32.8 | explicación | avatar | close 1.05→1.15 | sello **SE GUARDA** 🟢 | chime (única nota cálida) |
| **819–995** | 32.8–39.8 | revelación | **gráfico** | *reposa* | eje temporal: **HOY** 🔴 tachado → **HACE 3 MESES** 🟢 → el enlace 🟢 **se rompe** | liquid, metal, sharp, **deep**, whip |
| 995–1060 | 39.8–42.4 | conclusión | avatar | close 1.04→1.16 | "el embudo no vende" ⚪️ → **cambio duro** → **DESCARTA** 🔴 | **deep** |
| 1060–1153 | 42.4–46.1 | cta | avatar | 1.16→1.21, luego estable | campo de mensaje con **EMBUDO** 🟢 (verde WhatsApp) | ui + metal |

**En negrita** las tomas de gráfico a pantalla completa: ahí el avatar no se ve y
la cámara reposa ([R09](../../manuales/edicion-video/reglas.md)). El foco ámbar de
cada una está en `mundo-003.ts · TOMAS_GRAFICAS` (`cx`/`cy`): mismo degradado,
distinta luz → los cortes se leen como cambios de plano en un mismo espacio.

La voz acaba en 45.48 s (f 1137): los últimos 16 frames son el silencio natural
del clip, que le da al CTA su latido de cierre.

## Archivos

| Qué | Dónde |
|---|---|
| Tokens del mundo (color, fuente, snap, ventanas de toma) | `remotion/src/plantillas/mundo-003.ts` |
| Fondos de degradado plano + viñeta | `remotion/src/plantillas/Fondo003.tsx` |
| Motion graphics (todas las escenas) | `remotion/src/plantillas/Motion003.tsx` |
| Plan de cámara | `remotion/src/plantillas/camara-003.ts` |
| Plan de sonido (34 cues) | `remotion/src/plantillas/cues-003.ts` |
| Subtítulos (listos, **desconectados**) | `remotion/src/plantillas/subtitulos-003.ts` |
| Ensamblaje | `remotion/src/plantillas/Avatar003.tsx` |
| Fuente Futura por `local()` | `remotion/src/index.css` |
| Transcripción con timestamps por token | `proyectos/003/transcripcion.json` |
| Guion, tiempos y palabras clave | `proyectos/003/guion-limpio.md` |

## Comandos

```bash
cd remotion && npx remotion studio
```

```bash
cd remotion && npx remotion render Avatar003 ../proyectos/003/finales/003-embudo-9x16.mp4
```

Prueba ligera (ojo: `--scale=0.6666667` falla porque 1920×0.6666667 no es entero):

```bash
cd remotion && npx remotion render Avatar003 ../proyectos/003/pruebas-720p/003-prueba.mp4 --scale=0.5
```

## Decisiones que conviene saber

- **Sin subtítulos quemados.** El mensaje lo llevan los sellos de palabra clave;
  una banda de subtítulo competiría con ellos. `subtitulos-003.ts` está listo y se
  activa con una línea (ver cabecera del archivo).
- **El avatar va a color, sin gradar.** La v1 lo desaturaba y lo arrastraba al
  carbón para cumplir el "no other colors anywhere" del brief; el cliente pidió
  color natural, así que el vídeo pasa tal cual.
- **El "un solo acento" del brief queda sustituido por simbología de color**
  (ver arriba). La disciplina no desaparece, se mueve: siguen siendo cuatro
  colores contados y ninguno aparece porque quedaba bien
  ([R15](../../manuales/edicion-video/reglas.md)).
- **Los fondos son degradados planos.** La v1 tenía un sustrato líquido
  (`feTurbulence` + manchas + grano); se sustituyó por degradados limpios
  ([R12](../../manuales/edicion-video/reglas.md)).
- **La voz va en su propio `<Audio>`** porque el vídeo se desmonta en las tomas de
  gráfico ([R10](../../manuales/edicion-video/reglas.md)).
- **Desfase de audio del pipeline: −42.7 ms** (priming de AAC). Medido idéntico en
  el final del proyecto 002, así que es del render de Remotion, no de esta comp.
  Está dentro del umbral imperceptible (≤45 ms de retardo). Si alguna vez se
  quiere a cero: `ffmpeg -i final.mp4 -itsoffset -0.0427 -i final.mp4 -map 0:v -map 1:a -c copy salida.mp4`.
