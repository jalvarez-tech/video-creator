# 01 · Plan de noticia — proyecto 006

> Guía: [SKILL.md](../../../manuales/video-noticias/SKILL.md) · tomas: [recetario-tomas.md](../../../manuales/video-noticias/recetario-tomas.md).

## Cabecera

| | |
|---|---|
| Noticia / fuente principal | «¿Qué hacer si encuentra grietas en su vivienda luego de un temblor?» · El Colombiano (Antioquia) · Brian Ferney Valencia Ríos · 2026-08-10 · [URL](https://www.elcolombiano.com/antioquia/que-hacer-si-se-encuentra-una-grieta-despues-de-un-terremoto-KE39790497) |
| Hecho que la origina | Sismo de **magnitud 7,4**, epicentro en San José del Palmar (Chocó), 2026-08-10. La pieza **no cita el balance de víctimas** — ver abajo. |
| Voz en off | **ElevenLabs · voz clonada del canal** (`John Stevans v 0.1`, es-colombian) · modelo **`eleven_v3`** · `--idioma es` · preset `noticias` · **stitching OFF** (ver abajo) · 12 líneas / 1.336 caracteres · guion en [`guion-vo.txt`](../guion-vo.txt) |
| Composición | 1080×1920 · **30 fps** · **2409 f (80,3 s) — MEDIDO** sobre la voz (80,24 s = 2407 f + 2 de cola) |
| Formato | 9:16 vertical · sin avatar |
| Marca (`MARCA.sello`) | `PROPIEDADES LUXUR` |
| Destino | Shorts · Reels · TikTok |
| ¿Hay parte 2? | no → el cierre es la ruta oficial, no un CTA de marca |

---

## Decisión editorial: esta pieza NO usa el formato completo

El formato de noticias abre con un **gancho que contradice lo que el espectador
cree** y sube a un **clímax** de tensión. Aquí las dos cosas están mal, y no por
gusto:

- El hecho tiene **muertos de hoy**. Optimizar los tres primeros segundos para la
  retención, con una afirmación que descoloque, es usar un desastre como reclamo.
- El clímax del formato sube la tensión antes del cierre. En una pieza de
  seguridad, lo que toca antes del cierre es **bajarla**: decir lo que el vídeo
  NO puede hacer.

Lo que se conserva del formato es la estructura de tomas y el registro visual.
Lo que cambia es la intención de dos beats:

| beat | en el formato | aquí |
|---|---|---|
| `gancho` | contradice una creencia | enuncia la situación, sin adorno |
| `climax` | sube la tensión | **la baja**: «no hay fórmula exacta a simple vista» |

Es el mismo criterio que el canal ya aplica en lo jurídico —se dice qué exige la
norma, nunca qué debe hacer alguien— trasladado a seguridad estructural.

---

## Los tres límites que la pieza no cruza

1. **El vídeo no dice si una casa es segura.** El artículo cita a los expertos:
   *no hay fórmula exacta para saber a simple vista si una estructura es segura*.
   Esa frase no es un adorno del cierre: es el motivo por el que la pieza existe
   como ruta hacia una inspección, y no como sustituto de ella.
2. **El umbral de 2-3 mm es un disparador, no un aprobado.** El artículo dice que
   por encima de ese ancho hay que contactar YA a ingenieros civiles o a los
   organismos de emergencia. No dice que por debajo no pase nada, y la pieza
   tampoco lo dirá.
3. **Toda clasificación de grietas es la del artículo**, no una interpretación
   nuestra. Si una toma afirma un nivel de riesgo, sale de esa fuente.

---

## Datos que la pieza afirma, y de dónde salen

Todos del artículo de El Colombiano. No se añade ninguna cifra propia.

| dato | uso en la pieza |
|---|---|
| Magnitud **7,4**; centro y occidente de Colombia | toma `n02-magnitud` |
| Fisuras superficiales: grosor de un cabello; solo revoque, estuco o pintura | `n05` |
| Grietas verticales: riesgo bajo a moderado; requieren monitoreo | `n06` |
| Grietas horizontales: empujes, deflexiones o deformaciones; riesgo moderado a alto | `n07` |
| Grietas en X, diagonales o en escalera: riesgo alto; **pueden fallar súbitamente sin previo aviso** | `n08` |
| Ancho **> 2-3 mm** → contactar ingenieros civiles u organismos de emergencia | `n09` |
| Puertas y ventanas que se traban · separación entre muros y marcos · desniveles en placas o techos | `n10` |
| «No hay fórmula exacta para saber a simple vista si una estructura es segura» | `n11` |
| Línea **123** · Medellín: **DAGRD**, inspección técnica **gratuita** · Antioquia: **Dagran** o bomberos | `n12` |

Dato del artículo que la pieza **no** usa: daños en columnas o vigas, concreto
desprendido, óxido y acero expuesto. Es material de una parte 2 si la hay; meterlo
aquí obligaría a recortar la clasificación de grietas, que es el cuerpo del vídeo.

### La única cifra que NO sale del artículo

El artículo es del día del sismo y dice «más de 100 fallecidos». Al día siguiente
(2026-08-11) el balance verificado iba por **132-138 muertos y ~570 heridos**
—[Infobae](https://www.infobae.com/colombia/2026/08/11/mas-de-130-muertos-570-heridos-viviendas-y-vias-danadas-y-aeropuertos-cerrados-las-dramaticas-cifras-que-deja-hasta-ahora-el-terremoto-en-colombia/),
[La Jornada](https://www.jornada.com.mx/noticia/2026/08/10/mundo/terremoto-de-74-en-colombia-deja-danos-y-heridos)—,
así que publicar el número del artículo habría sido publicar un dato ya falso.

La toma `n02` dice **«más de 130»**, en cota inferior y no en cifra exacta. Es
deliberado: un recuento que sigue subiendo solo puede hacer MÁS cierta una cota
inferior, mientras que cualquier número exacto caduca en dos días y la pieza se
ve durante semanas. Si el vídeo se republica más adelante, ese «130» se revisa
al alza; no hay ninguna otra cifra de la pieza que dependa del tiempo.

---

## El balance de víctimas: por qué la pieza ya no lo cita

Hubo una toma (`n02b-balance`) con «Más de 130 personas fallecidas» y su golpe
grave. **Se quitó por decisión editorial.**

El razonamiento: esto es un explicador de servicio de un canal inmobiliario, y
enseña a leer una grieta en tu propia pared. El recuento de muertos daba gravedad
al encuadre pero **no ayuda a nadie a decidir si llama a un ingeniero** — y en un
canal que no cubre sucesos, abrir con víctimas se acerca más a usar el desastre
que a informar sobre él. Del contexto queda la **magnitud**, que es lo que explica
por qué hay grietas nuevas en tantas casas: lo único del suceso que la pieza
necesita para hacer su trabajo.

**Lo que NO cambia por esto:** el hecho de fondo sigue teniendo muertos, así que
la pieza sigue sin gancho de retención y con un clímax que baja la tensión en vez
de subirla. La restricción es del hecho, no de si el vídeo lo menciona.

Efecto secundario en el sonido: el `impact deep` era el golpe de tres momentos y
ahora marca exactamente dos —«pueden fallar sin previo aviso» y el cierre—, que es
mejor reparto. El sonido más pesado del banco no se gasta tres veces.

> Queda registrado por si vuelve en una parte 2: el artículo decía «más de 100»
> el día del sismo y al día siguiente el balance verificado iba por 132-138 —
> [Infobae](https://www.infobae.com/colombia/2026/08/11/mas-de-130-muertos-570-heridos-viviendas-y-vias-danadas-y-aeropuertos-cerrados-las-dramaticas-cifras-que-deja-hasta-ahora-el-terremoto-en-colombia/).
> Cualquier cifra exacta caduca en días; si vuelve, vuelve en cota inferior.

## La atribución pasó a ser solo visual

La línea 3 del guion era «El Colombiano reunió lo que dicen los ingenieros sobre
cuándo una grieta es peligrosa» y ahora es **«¿Cuándo una grieta es peligrosa?»**:
una pregunta que abre el bloque de la clasificación en vez de una presentación de
la fuente.

**La pregunta va también en pantalla, no solo en la voz.** Al principio esta toma
era solo el recorte: se oía «¿cuándo una grieta es peligrosa?» y se leía otro
titular distinto («¿qué hacer si encuentra grietas…?»). Son preguntas parecidas
pero no la misma, y el ojo y el oído tirando de dos frases a la vez es el ruido
que el formato evita cuando prohíbe repetir texto — solo que aquí el problema no
era repetir, era **divergir**.

Ahora la toma monta la pregunta en display y el recorte debajo. El recorte se
queda —encogerlo o quitarlo era la otra salida— porque desde que la voz dejó de
decir «El Colombiano» **es la única atribución de la pieza**: si algún día alguien
lo quita por espacio, el vídeo se queda sin fuente. Debajo de la pregunta ya no
compite con ella: pasa de ser el mensaje a ser la prueba, que es su papel en el
formato.

El `gap` de esa columna es 34 y no los 18-26 del resto: lo que se separa no son
dos textos sino un texto y una tarjeta con borde y sombra propios, y con el gap de
un texto el descendente de «peligrosa?» queda pegado al canto.

La línea pasó de 86 a 32 caracteres, así que su ventana cayó a 64 f (2,1 s) — no
da tiempo a leer un titular de prensa. La toma se extiende a **84 f** tomando 20 f
prestados de `n04-forma` (que se queda en 66 y le sobran). Es la única ventana del
plan que no coincide con su línea de voz, y es deliberado: el recorte aguantando
sobre el principio de la respuesta se lee como el artículo contestando la pregunta
que acaba de oírse.

## La voz: por qué `eleven_v3` y qué cuesta

La pieza se locutó primero con `eleven_multilingual_v2` (94,93 s) y luego con
**`eleven_v3`**, que es la que está montada. v3 da más rango emocional y es el
único modelo que acepta `--idioma es`. De paso salió más corta, y con los dos
recortes editoriales de arriba la pieza queda en **80,24 s**, holgadamente dentro
de la ventana de 60-90 s del formato.

> Al reescribir dos líneas del guion, `elevenlabs.py` regeneró **solo esas dos**
> (79 caracteres en vez de 1.336): sin stitching los vecinos salen de la firma
> del sidecar, así que tocar una línea ya no obliga a repagar las de al lado.

**El precio: v3 no admite request stitching.** La API rechaza `previous_text` /
`next_text` con ese modelo, así que cada línea se generó sin saber qué va antes
ni después. El stitching existe justo para que un guion locutado frase a frase no
salte de tono en las junturas, así que hay 11 junturas sin esa red. Hay que
escucharlas antes de publicar.

Si alguna salta, la salida **no** es repetir la v3: es volver a
`eleven_multilingual_v2`, cuya pista sigue en
`proyectos/006/vo/006-vo-multilingual-v2.wav` y sus partes en `vo/partes/`, ya
pagadas. Eso obliga a recronometrar las 24 ventanas otra vez (los frames de la
v2 están en el historial de `generar-vo.sh`).

> `elevenlabs.py` no podía hacer esto: mandaba los vecinos siempre, así que
> `guion --modelo eleven_v3` moría con un 400 en la primera línea — una
> combinación que la ayuda del propio script anunciaba. Ahora detecta los modelos
> sin stitching (`SIN_STITCHING`), los omite, **avisa** de la consecuencia antes
> de facturar y los saca de la firma del sidecar (si los vecinos no viajan en la
> petición, no influyen en el audio y no deben invalidar la caché).

## Por qué el plan pasó de 12 tomas a 24

El plan original repartía 1740 f **estimados** (≈2,7 palabras/s) sobre 12 tomas.
Al locutar y medir, la voz real iba a **2,34 palabras/s**. Pegados los frames
medidos sobre el plan de 12, **nueve de las doce pasaban del techo de 6 s** del
formato: `n12` se iba a 14,5 s y `n08` a 10,6 s.

La salida no era acelerar la voz ni recortar el guion —la locución es correcta y
el contenido ya estaba al hueso—, sino que el plan tenía mal **el tamaño de la
unidad**. Una toma que aguanta 10 s está contando tres cosas, y el formato pide
*una idea por toma*. Así que cada tramo largo se parte por las juntas que ya
tenía dentro (la frase) y cada trozo se queda con una idea. **La voz no cambia ni
un frame**; lo que cambia es cuántas veces cambia la imagen mientras suena.

Las juntas se sitúan por posición de carácter dentro de su línea del guion — lo
más cerca de la prosodia real sin alineación forzada.

## Mapa de tomas (23 · 2409 f · 30 fps)

| # | id | beat | molde | frames | dur | contenido | cue |
|---|---|---|---|---|---|---|---|
| 1 | `n01a-sismo` | gancho | papel | 0-96 | 3.2 s | La situación, enunciada | `s01-abre` |
| 2 | `n01b-no-iguales` | gancho | papel | 96-153 | 1.9 s | «No todas significan lo mismo» | `s02-giro` |
| 3 | `n02-magnitud` | contexto | cine | 153-256 | 3.4 s | 7,4 de magnitud | `s03-magnitud` |
| 4 | `n03-fuente` | contexto | papel | 256-340 | 2.8 s | **¿Cuándo una grieta es peligrosa?** + recorte | `s05-recorte` |
| 5 | `n04-forma` | explicacion | papel | 340-406 | 2.2 s | La **forma** dice el riesgo | `s06-forma` |
| 6 | `n05a-fisura` | explicacion | papel | 406-506 | 3.3 s | Fisuras superficiales · bajo + **diagrama** | `s07-bajo` |
| 7 | `n05b-superficial` | explicacion | papel | 506-609 | 3.4 s | «No tocan la estructura» | `s08-superficial` |
| 8 | `n06a-vertical` | explicacion | papel | 609-710 | 3.4 s | Verticales · bajo a moderado + **diagrama** | `s09-moderado` |
| 9 | `n06b-vigilar` | explicacion | papel | 710-786 | 2.5 s | «Pero hay que vigilarlas» | `s10-vigilar` |
| 10 | `n07a-horizontal` | explicacion | papel | 786-893 | 3.6 s | Horizontales · moderado a alto + **diagrama** | `s11-alto` |
| 11 | `n07b-empujes` | explicacion | papel | 893-1001 | 3.6 s | Empujes o deformaciones | `s12-empujes` |
| 12 | `n08a-diagonal` | conflicto | papel | 1001-1120 | 4.0 s | En X, diagonal o escalera · alto + **diagrama** | `s13-grave` |
| 13 | `n08b-donde` | conflicto | papel | 1120-1188 | 2.3 s | Sobre muros, vigas o columnas | `s14-riser` |
| 14 | `n08c-sin-aviso` | conflicto | papel | 1188-1296 | 3.6 s | **Pueden fallar sin previo aviso** | `s15-sin-aviso` |
| 15 | `n09a-umbral` | datos | cine | 1296-1424 | 4.3 s | 2 a 3 mm | `s16-umbral` |
| 16 | `n09b-llamar` | datos | papel | 1424-1540 | 3.9 s | Contactar a un ingeniero civil | `s17-llamar` |
| 17 | `n10a-no-solo` | datos | papel | 1540-1633 | 3.1 s | «No todo son grietas» | `s18-reencuadre` |
| 18 | `n10b-senales` | datos | papel | 1633-1767 | 4.5 s | Puertas · muros · placas | `s19a/b/c-chip` |
| 19 | `n11a-sin-formula` | climax | papel | 1767-1902 | 4.5 s | No hay fórmula exacta | `s20-sin-formula` |
| 20 | `n11b-limite` | climax | papel | 1902-2026 | 4.1 s | No reemplaza una inspección | **silencio** |
| 21 | `n12a-linea` | cierre | cine | 2026-2154 | 4.3 s | 123 | `s21-linea` |
| 22 | `n12b-medellin` | cierre | papel | 2154-2290 | 4.5 s | DAGRD · inspección gratuita | `s22-gratuita` |
| 23 | `n12c-antioquia` | cierre | cine | 2290-2409 | 4.0 s | Dagran o bomberos | `s23-cierre` |

Sin huecos ni solapes; la toma más corta dura 1,9 s y la más larga 4,5 s; ninguna
racha de cuatro tomas `cine`. Lo comprueba `dialecto.reglas` al montar y
`revisar-plan.mjs` desde la CLI (sale **limpio**, incluidas R08 y R09).

`revisaMontaje` cruza además las dos capas en `Noticia006.tsx`: cada `sonido` de
la tabla tiene que existir en `cues-006.ts` **y** disparar dentro de la ventana de
su toma. No es teórico — cazó el riser de `n08b`, que apuntaba al primer frame
fuera de su propia ventana.

---

## Las imágenes de apoyo: por qué son dibujos y no fotos

La pieza sabía **nombrar** formas de grieta («en X», «horizontales, en la parte
alta de los muros») y no sabía **enseñarlas**. Quien está mirando su propia pared
no tiene con qué comparar, y eso es justo el hueco que un texto no puede tapar.

**No se usan imágenes generadas ni metraje del sismo, y es una decisión de fondo.**
Una foto —real o generada— de un edificio agrietado en Colombia se lee como
*registro del suceso*, no como ilustración. Meter una imagen generativa aquí sería
fabricar prueba documental de un hecho con más de 130 muertos, que es la misma
línea que el formato ya traza para el texto: «un recorte de prensa es de un medio
real o no existe».

Un trazo esquemático no finge ser nada. Y de paso: es nítido a cualquier
resolución, no depende de lo que devuelva ningún generador, y aísla la geometría
en vez de enterrarla en la textura de una pared real.

### Cómo está hecho

Pieza nueva del registro editorial: **`grieta`** (`DiagramaGrieta`, en
`Editorial.tsx`). Un panel de muro con la grieta **dibujándose** encima con la
primitiva `Trazo` — progreso 0→1, igual que el rotulador del recorte de prensa:
una grieta que aparece de golpe se lee como error de render; una que avanza, como
una grieta abriéndose.

El camino se genera con desvío perpendicular modulado por `sin(πt)`: cero en los
extremos, máximo en el centro. Es lo que separa una grieta de un rayo — nace en un
punto y muere en otro. El ruido es `random()` de Remotion con semilla fija, no
`Math.random`, o el trazo temblaría entre frames.

| toma | tipo | color | por qué |
|---|---|---|---|
| `n05a` | `fisura` | tinta | Trazo de **3 px**: el artículo la describe «del grosor de un cabello», y pintarla gruesa contradiría su propio «riesgo bajo» |
| `n06a` | `vertical` | tinta | Recorre el muro de arriba abajo |
| `n07a` | `horizontal` | **acento** | Dibujada **arriba**, que es donde el artículo las sitúa |
| `n08a` | `diagonal` | **acento** | La X, con la segunda diagonal 9 f después: dos grietas que se encuentran, no un aspa |

Los cuatro van a **520×340** y en el mismo orden dentro de la toma (nombre →
dibujo → explicación): son una serie, y una serie que cambia de tamaño entre
planos deja de leerse como comparación. El color escala con el riesgo por el mismo
canal que el kicker, así que el dibujo y el texto nunca se contradicen.

**Lo que no se dibuja:** la grieta *en escalera*, que el titular de `n08a` nombra.
Tres diagramas en 4 s no se leen, y la X es el icono de la categoría. Queda dicha
y no dibujada; es material de una parte 2.

> La ficha de `grieta` en el dialecto **avisa** si se le pasa un `grosor` > 4 a una
> fisura, por ese motivo exacto.

**Nada de esto tocó la locución ni el cronometraje:** los diagramas entran dentro
de las ventanas que ya existían.

---

## Pendiente antes de publicar

1. ~~**Locución.**~~ **HECHA (2026-08-11).** Voz clonada del canal, 94,93 s. Las
   ventanas están recronometradas sobre ella y la comp lleva `calculateMetadata`
   con `framesDePlanYVoz`, así que dura lo mayor de plan y voz — el clip manda.
2. ~~**Verificar que las cifras siguen vigentes.**~~ **HECHO (2026-08-11).** La
   cifra del artículo (+100) ya había caducado; la pieza dice ahora «más de 130»
   en cota inferior. Ver «La única cifra que NO sale del artículo», arriba.
3. **Confirmar los canales oficiales** (123 · DAGRD · Dagran) antes de publicar:
   son la parte accionable y la que más daño hace si está mal. Salen del artículo
   y no se han verificado contra la web de cada organismo — que es lo que habría
   que hacer, porque en emergencia las líneas cambian.
4. **Subtítulos sincronizados.** El guion está segmentado en
   [`guion-vo.txt`](../guion-vo.txt), así que salen de ahí sin volver a
   transcribir. **Ojo:** ahora hay 24 tomas y 12 líneas de guion, así que la
   correspondencia ya no es 1:1 — los subtítulos van contra el guion, no contra
   el plan.

---

## Estado

| | |
|---|---|
| Plan | ✅ 23 tomas · 4 con diagrama · `revisar-plan.mjs`, `tsc` y `eslint` limpios |
| Voz | ✅ **APROBADA** · `eleven_v3` · `remotion/public/noticias/006-vo.wav` · respaldo v2 en `vo/006-vo-multilingual-v2.wav` |
| Sonido | ✅ 22 cues en `cues-006.ts` · cruzado con el plan por `revisaMontaje` |
| Frames de control | ✅ 11 en `remotion/out/006-frames/` + 4 diagramas en `out/006-grietas/` |
| Prueba 720p | ✅ `pruebas-720p/006-prueba.mp4` (720×1280 · 80,36 s · con audio) |
| Render final | ✅ `finales/006-grietas-tras-el-sismo.mp4` · 1080×1920 · 30 fps · 80,36 s · H.264 + AAC 48 kHz estéreo · 12,9 MB · pico −3,6 dB |
| Subtítulos | ⏳ pendientes (punto 4) — el final se sacó SIN ellos |
