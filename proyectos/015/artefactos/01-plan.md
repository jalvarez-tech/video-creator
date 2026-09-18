# 015 · Plan — «Lo que aprendí en APEX»

> Isabella Cadavid (la presentadora del 013) cuenta lo que se lleva del primer
> día de **APEX · El Wall Street Inmobiliario** (Cartagena, 17 de septiembre de
> 2026), en nueve tomas de iPhone: una frase por toma, cada una en un sitio del
> hotel. Pieza de **Propiedades Luxur**.

## El encargo, literal

1. «Ayúdame a agregar textos a este video con Fx de sonido, al final agrega las
   redes sociales @propiedadesluxur».
2. A mitad de trabajo: «recorta los espacios de silencio, y haz que las
   transiciones entre video tengan un fade in o out en opacidad».

«Este video» es la carpeta `~/Downloads/Videos APEX`: nueve clips que, puestos
en orden de grabación, son UN discurso (se comprobó transcribiéndolos: cada uno
continúa la frase del anterior y el último se despide).

## Cabecera

| | |
|---|---|
| **formato** | 9:16 vertical |
| **comp** | `Apex015` · 1080 × 1920 |
| **fps** | **30** — el de los nueve clips (30/1 exactos) |
| **duración** | **1563 f = 52,1 s** — sale del plan (de 60,1 s de material) |
| **estilo** | corporativo / lujo **con presencia** (director §4): el canal pide contención, el encargo pide OÍR los efectos |
| **marca** | **Propiedades Luxur**, con el acento **verde** de las piezas de APEX (el del 013) y su sello en todos los frames |
| **subtítulos** | **NO** — todo el texto en la banda inferior (R14). Es la preferencia del cliente en sus piezas de gente a cámara y el molde del 013 |
| **cámara** | no: es un montaje (director §3i). Cada plano lleva un empuje suave (1,00 → 1,04) |

## Material

| clip | toma | dur. | voz (s) | dice |
|---|---|---|---|---|
| IMG_2592 | photocall APEX | 4,13 | 0,87–3,52 | Lo más valioso de APEX no fueron las propiedades. |
| IMG_2593 | stand, andando | 7,27 | 0,72–6,70 | Fueron las ideas, las oportunidades, y entender que [tras] de cada problema hay una oportunidad. |
| IMG_2598 | jardín interior | 4,53 | 0,64–3,71 | Hoy aprendimos que no solo se trata de resolver problemas. |
| IMG_2601 | plantas, ventanal | 5,27 | 0,48–4,49 | Se trata de crear estrategias que conviertan esas oportunidades en soluciones. |
| IMG_2603 | pasillo de velas | 6,13 | 0,86–5,44 | Y algo todavía más importante: tu red cambia las oportunidades a las que tienes acceso. |
| IMG_2614 | fachada, noche | 5,27 | 0,61–4,63 | Cuando aprendes a relacionarte estratégicamente, tus posibilidades escalan. |
| IMG_2617 | rampa junto al agua | 10,87 | 0,49–9,89 | También hubo una frase que me quedó muy marcada: no siempre gana el mejor producto, gana el que el mercado entiende mejor. Por eso es muy importante cómo comunicas. |
| IMG_2624 | flores | 9,60 | 0,58–8,52 | Pero quizás la lección más importante del primer día es que tienes que dejar de preguntarte [qué vender] y empezar a preguntarte cómo [puedes] ayudar. |
| IMG_2626 | palmeras | 7,03 | 0,65–6,00 | Soy Isabella Cadavid, [realtor] de la ciudad de [Medellín]. Si te gustó la información, escríbeme y hablamos. |

Entre corchetes, lo que whisper-small no oye con garantías (ver «Lo dudoso»).

**Lo que traían los originales y no se ve en un frame** (`normalizar.sh`):

- **Rotación (R19)**: 1920×1080 + `rotation=-90` → la pantalla son 1080×1920.
- **HDR HLG (R21)** en los nueve: tone-map con VideoToolbox. La receta para si
  entra un SDR.
- **Audio mono AAC de un micro de solapa** (se ve en el top). Es la voz de la
  pieza y va aparte en WAV, sin tratar.
- **Sin grado por clip**: la luma media va de 94 a 119, pero la marca el
  fondo (el photocall oscuro, el jardín de noche); la piel se ve pareja en la
  hoja de los nueve (`vistas-previas/normalizados.png`).
- **Normalizados a 1296×2304** (1080 × 1,2): cada plano lleva un empuje de 4 %
  y a esa escala todavía se reduce.

## Las decisiones

1. **La voz marca el tiempo.** Cada toma va de su primera a su última palabra,
   con **0,5 s (15 f) entre frases**: la pausa que ella misma hace dentro de las
   tomas (0,3-0,7 s). Quedan fuera 8 s de entradas en cuadro, colocarse y
   sonrisas. Las pausas INTERNAS se respetan (la mayor, 0,73 s antes de «Si te
   gustó»): son su ritmo, y cortarlas pediría saltos dentro de un mismo plano,
   lo contrario de un fundido.
2. **Los límites de cada frase se miden por energía, no con whisper.** Sus
   marcas por palabra ponían la primera siempre en 0,00 s aunque ella empezaba
   a hablar a los 0,48-0,87 s. Detector en la banda de voz (ahora
   `manuales/edicion-video/scripts/limites-voz.py`), contrastado con el
   espectrograma de cada toma.
3. **Fundido de opacidad (12 f) en las ocho transiciones, dentro del hueco
   entre frases**: empieza 2 f después de la última palabra y acaba 1 f antes
   de la siguiente. Ninguna palabra suena con su imagen a medio fundir.
4. **La voz, en su propia capa** (`Voz015`): el WAV de cada toma con el mismo
   `trimBefore` que su imagen, y un cruce de 6 f en potencia constante al final
   de cada fundido (en esos frames no suena ninguna palabra: lo comprueba la
   puerta).
5. **Una ganancia por toma, y nada más.** Las nueve frases iban de −25,8 a
   −19,8 LUFS (las de dentro, más bajas); se igualan a −21 LUFS (la mediana,
   el mínimo movimiento posible). Sin filtro, sin compresor, sin limpiar el
   fondo: en el 013 la misma presentadora prefirió su audio sin tratar, y esto
   no cambia cómo suena cada toma, solo que suenen igual de fuertes.
6. **Textos: una idea por toma y la banda nunca espera vacía** (12 tomas de
   texto). Hook de promesa en el f0, la respuesta, las lecciones sobre sus
   palabras, la cita entre comillas, dos comparaciones ✗/✓ con el mismo gesto,
   su nombre y el cierre.
7. **Al final, la cuenta y sus redes**: «escríbeme y hablamos» /
   **@propiedadesluxur** (verde) / Instagram · TikTok · Facebook, desde la pausa
   antes de «Si te gustó la información» hasta el último frame (3,3 s).
8. **Un sonido por texto que entra** (21), cinco gestos que suenan siempre
   igual: whoosh en cada relevo, pop cuando aterriza una frase clave, clic en
   los ✗, chime en los ✓ y una notificación en la cuenta.

## Promesa y CTA

- **Promesa (f0, la miniatura):** «LO QUE APRENDÍ EN APEX · Lo más valioso /
  **no fueron las propiedades**» — su propia frase de apertura, que ya es una
  promesa: en un canal de propiedades, lo valioso no son las propiedades.
- **CTA:** el suyo («escríbeme y hablamos») con la cuenta del canal debajo.
- **Lo que no se cuenta:** su cargo y su ciudad (ver «Lo dudoso»).

## Lo dudoso (no está en pantalla hasta que alguien lo confirme)

- **«realtor de la ciudad de Medellín».** Whisper lo oye así en una de cuatro
  pasadas; en las otras, «director de la Ciudad de MDG/MEDG». En pantalla va
  SOLO su nombre, que el cliente confirmó en el 013. Si se confirma, entra como
  chip bajo el nombre (una línea en `graficos-015.ts`).
- **«qué vender» / «qué vendes».** Whisper oye «qué ven de él / de ir». El ✗ no
  la cita: dice «¿Qué vendo?», la pregunta en primera persona, que vale para
  las dos.
- **Las tres redes.** El encargo dice «las redes sociales @propiedadesluxur» y
  no cuáles. Van Instagram, TikTok y Facebook; si la cuenta no está en alguna,
  se quita su línea del plan.

## Escenas

| # | frames | narrativa | lo que dice | texto | sonido |
|---|---|---|---|---|---|
| 1 | 0–100 | hook | «Lo más valioso de APEX no fueron las propiedades» | LO QUE APRENDÍ EN APEX · Lo más valioso / **no fueron las propiedades** | — (puesto en f0) |
| 2 | 100–197 | revelación | «Fueron las ideas, las oportunidades…» | Fueron las **ideas** / y las **oportunidades** | whoosh |
| 3 | 197–294 | revelación | «…y entender que tras de cada problema hay una oportunidad» | Detrás de cada problema / hay una **oportunidad** | whoosh |
| 4 | 294–537 | explicación | «Hoy aprendimos que no solo…» / «Se trata de crear estrategias…» | HOY APRENDIMOS · ✗ Solo resolver problemas · ✓ Crear estrategias | whoosh · clic · chime |
| 5 | 537–689 | explicación | «Y algo todavía más importante: tu red…» | ALGO TODAVÍA MÁS IMPORTANTE · Tu **red** cambia / tus oportunidades | whoosh · pop |
| 6 | 689–825 | explicación | «…tus posibilidades escalan» | RELACIÓNATE CON ESTRATEGIA · Tus posibilidades / **escalan** | whoosh · pop · pop |
| 7 | 825–970 | demostración | «…no siempre gana el mejor producto» | UNA FRASE QUE ME MARCÓ · «No siempre gana / el mejor producto» | whoosh · pop |
| 8 | 970–1122 | demostración | «…gana el que el mercado entiende mejor. Por eso… cómo comunicas» | «Gana el que el mercado / **entiende mejor**» · IMPORTA CÓMO COMUNICAS | whoosh · pop |
| 9 | 1122–1240 | conclusión | «Pero quizás la lección más importante…» | La lección / **más importante** | whoosh |
| 10 | 1240–1376 | conclusión | «…dejar de preguntarte qué vender… cómo puedes ayudar» | LA PREGUNTA CORRECTA · ✗ ¿Qué vendo? · ✓ ¿Cómo puedo ayudar? | whoosh · clic · chime |
| 11 | 1376–1464 | cta | «Soy Isabella Cadavid…» | Isabella Cadavid | whoosh |
| 12 | 1464–1563 | cta | «Si te gustó la información, escríbeme y hablamos» | ESCRÍBEME Y HABLAMOS · **@propiedadesluxur** · IG · TikTok · FB | whoosh · notificación |

## Archivos

| capa | archivo |
|---|---|
| receta del material | `proyectos/015/normalizar.sh` → `remotion/public/apex-015/` (9 MP4 mudos + 9 WAV) |
| montaje | `remotion/src/proyectos/015/metraje-015.ts` → `<PistaMetraje>` |
| voz | `remotion/src/proyectos/015/Voz015.tsx` |
| look | `remotion/src/proyectos/015/look-015.ts` (`LOOK_015` + `LOOK_METRAJE_015`) |
| textos | `remotion/src/proyectos/015/graficos-015.ts` → `<PistaGraficos>` |
| sonido | `remotion/src/proyectos/015/cues-015.ts` → `<PistaSonido>` (lee sus frames del plan de textos) |
| composición | `remotion/src/proyectos/015/Apex015.tsx` · registrada en `Root.tsx` |
| puerta | `node proyectos/015/revisar-015.mjs` |
