# 01 · Plan narrativo — proyecto 008 · pieza AVATAR («ya hay 3 puntos»)

> Segunda pieza de la campaña «Ayudemos a Chocó». La primera (Noticia008) instaló
> la tesis — la ayuda de verdad llega después de los titulares. Esta es el
> ANUNCIO OPERATIVO: Juan Pablo, a cámara, confirma los tres puntos de
> recolección con direcciones reales y la fecha del camión (fin de mes).
> El clip es una grabación REAL del cliente (iPhone), no un avatar HeyGen.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Clip fuente | `IMG_1398.MOV` → `remotion/public/avatar-008.mp4` (H.264, rotación horneada) |
| Medidas (R01) | 1080×1920 · **30 fps** · 43.82 s = **1314 frames** · AAC 48 kHz estéreo |
| Composición | `Avatar008` · 1080×1920 · 30 fps · duración = frames del clip |
| Formato | 9:16 vertical — avatar real + overlays (`PistaGraficos` + cámara + sonido) |
| Estilo | **Redes, sobrio**: entradas cortas de tarjeta, cámara contada, SFX mínimos. Sin sonidos de premio (criterio 008) |
| Marca | `CHOCO` (`src/marcas/choco.ts`) — acento ámbar `#D97706` (registro oscuro: las tarjetas van sobre vídeo + scrim) |
| Subtítulos | **fuera** (como 004–008): las tarjetas condensan la voz; el dato operativo va en pantalla, no en un carril literal |
| Destino | Instagram Reels / historias de la campaña |

## Por qué 30 fps y no 25

La regla «avatar 9:16 = 25 fps» (§3a director) nació de los clips HeyGen. Aquí
el fuente REAL es 30/1 exactos (R01: el fps original manda): re-tiempar a 25
tiraría 1 de cada 6 frames de un rostro hablando. Comp a 30 fps.

## La transcripción manda (R02)

`proyectos/008/avatar/transcripcion.json` (whisper small) + `transcripcion-palabras.json`
(tokens con offsets — de ahí salen TODAS las ventanas del timeline). Erratas de
whisper corregidas a mano contra el brief del cliente: «Calazán» = Calasanz,
«Antioca» = Antioquia, «Ivoral» = Viboral, «Anzocreño» = antioqueño, «burto» = bulto.

Guion real (43.8 s): saludo y anuncio («tres puntos de recolección») → Medellín,
3 sedes de Juan Papitas (Calasanz · Santa Lucía · 20 de Julio) → Caldas
(Street Cats, «el negocio de mi hermana») → El Carmen de Viboral («voy a
habilitar mi casa», «recogiendo en el Oriente antioqueño») → la súplica
(«cualquier ayuda por más mínima que usted piense que sea») → el camión
(«8 toneladas… a fin de mes») → CTA («comparte estos vídeos, hazlo») → remate
(«granito a granito vamos llenando el bulto. Dios los bendiga»).

## Direcciones (dato confirmado por el cliente, 2026-08-14)

| Ciudad | Punto | Dirección |
|---|---|---|
| Medellín | Juan Papitas · Calasanz | Calle 50A # 86-52 |
| Medellín | Juan Papitas · Santa Lucía | Calle 47B # 89-24 |
| Medellín | Juan Papitas · 20 de Julio | Calle 38A # 109-11 |
| Caldas (Antioquia) | Street Cats | Cra 48 # 132A sur-24 |
| El Carmen de Viboral | Su casa | Calle 23A # 22-03 |

En la lista de Medellín el ORDEN es el de la voz (Calasanz → Santa Lucía → 20 de
Julio), no el del brief: cada ítem aterriza cuando él la nombra.

**La fecha del camión ya no es placeholder:** él mismo dice «a fin de mes» →
chip «EL CAMIÓN SALE A FIN DE MES». (Cierra el pendiente de la memoria del
proyecto; si el cliente da día exacto, se cambia el texto del chip y se
re-renderiza.)

## Reparto de la pantalla (decisión de layout — ver 02)

El encuadre real (stills del fuente): cara en el centro-superior (≈18–55 % del
alto), techo blanco arriba, torso abajo. La franja superior NO tiene contraste
para texto (techo claro, sin scrim en el molde `franja`), así que **todo el
texto vive en la banda inferior** (moldes `sello`/`cta`: ancla 69.8 %, scrim
oscuro desde abajo — patrón R14: sin subtítulos, esa banda es la zona de
lectura). Arriba solo el watermark de campaña, con su propia píldora oscura.

## Un color = una cosa (R15)

| Color | Significa | Dónde |
|---|---|---|
| ámbar `#D97706` (acento CHOCO oscuro) | la campaña / lo operativo | chips de ciudad, «3», el 8, borde del CTA, punto del watermark |
| blanco sobre scrim carbón | la voz / el dato | titulares, direcciones |
| ninguno más | — | (`dato`/`logro`/`perdida` de la paleta no se usan) |

## Sonido (criterio heredado del 008)

Sin `sparkle`/`chime`/`coin`/`success`. Whooshes de tarjeta y pops de ítem por
debajo de la voz (ducking −4.5 dB); exactamente **dos `impact deep`** en toda la
pieza: el aterrizaje del 8 y el remate «granito a granito». La súplica
(f638–800) va EN SILENCIO de SFX: es el tramo emocional y lo lleva su voz.

## Cámara (motivada, nunca bajo una tarjeta)

Los 4 movimientos caen SOLO en ventanas sin tarjeta (el hero no se pisa):
hook (saludo) · punch-in en la súplica · alejar antes de la cifra · empujón en
«si quieres unir, ayudar». Bajo las tarjetas la cámara REPOSA.

## Qué NO lleva

- Ni b-roll ni tomas `pantalla`: el mensaje ES su cara. 43 s no dan para cortar.
- Ni música: la pieza es él hablando; el permiso `music_generation` sigue
  bloqueado de todos modos (README de musica/).
- Ni partículas de ambiente: campaña humanitaria, no lanzamiento.
