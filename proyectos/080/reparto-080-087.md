# Suite Go Living (El Poblado) — las variantes B 080-087 (V61-V68) con «lo vendible antes del segundo 10»

> 2026-11-10. Pedido: «Monta los reels 071 a 078 de Suite Go Living con la estructura nueva … como proyectos nuevos 080 a 087». El andamio es el 079 (la 070 hecha así). **Cada pieza es la variante B de su original**: misma terna de voz, mismo exterior, misma canción con la misma entrada (por eso REPITE canción: declarado en `combinaciones.md` y en `archivos/musica/registro-de-uso.md`). Cambia el ORDEN y entra la ficha en su versión.

## 0. La estructura (igual en las ocho; `recorrido-luxur` §3)

1. Toma inicial, la de la pieza original, sin texto ni voz · 2. el hook de Isabella (el original) · 3. DOS planos rápidos, a corte, ≤ 2,5 s cada uno, que empiezan antes del segundo 10 · 4. la mitad de Isabella (la original), a corte antes de los 11 s · 5. UN solo recorrido inmersivo, sin voz, con la vista o el clímax como último y más largo · 6. el CTA de Isabella (en su mismo golpe) y la tarjeta oscura con el logo y la web.

Dos versiones por pieza, nunca mezcladas: `RecorridoNNN` (subtítulos en UNA sola fuente, sin ficha) y `RecorridoNNNFicha` (sin subtítulos, ficha abajo —y 1220—, entera en el recorte 1:1, desde el hook hasta el CTA).

## 1. El reparto

| Pieza | V (origen) | Canción | Terna · exterior | Dos planos rápidos | Entran en | Mitad en | Recorrido | Duración | Prueba normal | Prueba ficha |
|---|---|---|---|---|---|---|---|---|---|---|
| **080** | V61 (071) | Heaven on Earth | HK08 · MD06 · CT09 · DR08 | RC08 1,9 s + RC03 2,2 s | 6,9 / 8,8 s | 10,9 s | RC09 → RC02 → RC05 → RC06 → RC07 | 31,7 s | -15.1 LUFS · 9 MB | 10 MB |
| **081** | V62 (072) | I Feel It Coming | HK11 · MD08 · CT11 · DR05 | DR03 1,5 s + RC13 1,9 s | 6,3 / 7,8 s | 9,8 s | DR01 → RC03 → RC05 → RC04 → RC07 | 35,7 s | -15.1 LUFS · 11 MB | 12 MB |
| **082** | V63 (073) | Chillin' (Chillstep Mix) | HK10 · MD01 · CT10 · DR09 | DR02 1,6 s + RC10 2,1 s | 6,8 / 8,4 s | 10,5 s | RC12 → RC02 → RC03 → RC11 → RC06 → RC07 | 41,0 s | -15.4 LUFS · 13 MB | 13 MB |
| **083** | V64 (074) | Some Say | HK09 · MD09 · CT12 · DR06 | ZS01 1,8 s + DR01 1,4 s | 6,9 / 8,7 s | 10,1 s | ZS02 → ZS03 → DR07 → DR03 | 36,5 s | -15.2 LUFS · 15 MB | 15 MB |
| **084** | V65 (075) | Street Level Sessions on the Green | HK06 · MD03 · CT08 · DR10 | RC06 1,8 s + RC09 1,6 s | 7,3 / 9,1 s | 10,7 s | RC12 → RC08 → RC02 → RC01 → RC07 | 38,0 s | -15.0 LUFS · 11 MB | 12 MB |
| **085** | V66 (076) | Luxury, Elegance, Refined | HK02 · MD04 · CT06 · DR10 | ZS01 2,2 s + RC11 2,1 s | 6,3 / 8,5 s | 10,6 s | ZS05 → ZS02 → RC08 → RC07 | 31,9 s | -15.3 LUFS · 10 MB | 11 MB |
| **086** | V67 (077) | Light Fills the Room | HK03 · HK05 · CT04 · DR04 | ZS02 1,4 s + RC08 1,5 s | 7,1 / 8,5 s | 10,0 s | RC11 → ZS01 → ZS05 → DR05 | 31,2 s | -15.1 LUFS · 10 MB | 10 MB |
| **087** | V68 (078) | Ivory Skyline Reverie | HK07 · MD02 · CT03 · DR09 | ZS03 2,3 s + RC11 2,5 s | 6,0 / 8,2 s | 10,7 s | ZS02 → RC03 → RC05 → RC07 | 33,0 s | -15.1 LUFS · 9 MB | 10 MB |

Todas las duraciones son las de su original (el CTA entra en el mismo golpe): lo que se movió es la mitad (de ≈ 15-19 s a ≈ 10-11 s) y el paseo, que ahora va seguido. Cada corte cae en un golpe MEDIDO de su canción (`node proyectos/NNN/revisar-NNN.mjs`, sección 4) y los niveles de la música se midieron de nuevo en las ventanas nuevas (`proyectos/NNN/medidas/ventanas-musica.json`).

## 2. Los planos exactos, comparados antes de renderizar

`node proyectos/080/herramientas/comparar-piezas.mjs` (079-087): **ninguna pieza abre con el mismo par de planos rápidos que otra** ni se solapa con sus tramos (la 079 usa RC05 0,50-2,60 s y RC04 0,60-2,07 s). La vista grande (RC07) no está en ningún plano rápido y cierra el recorrido de la 080, 081, 082, 084, 085 y 087; en la 083 y la 086 (las de zonas sociales y edificio) el clímax es la fachada (DR03 y DR05), como en sus originales. Se solapan entre piezas, y se declara en cada `combinaciones.md`, el tramo final de RC07 (≈ 3 s de la subida al ventanal, el único plano de la ciudad con esa amplitud) y algo del gimnasio, la tienda y RC11 entre la 085 y la 086.

## 3. Las palabras «POR CONFIRMAR AL OÍDO», con su segundo

Siguen sin oírse (no puedo oír el audio: es la confianza de whisper). La puerta con `--final` falla SOLO por ellas.

### 080 (V61, «Tu inversión no debería convertirse en otro trabajo»)

1. «Una suite hotelera» (MD06, f342 = 11,4 s del vídeo): whisper oye «Un asfito atelera» (confianza baja) y solo desde «con» en adelante entiende la frase; la lectura sale del contexto (el anuncio, el CTA de esta suite y la métrica de sílabas: «u-na sui-te ho-te-le-ra» son 7 entre 0,53 y 1,52 s).
2. «todo» en el hook (HK08, f157 = 5,2 s del vídeo): el corte final de whisper oye «en todo otro trabajo»; los cortes parciales oyen «en otro trabajo». Se pintó «convertirse en otro trabajo».

### 081 (V62, «En inversión inmobiliaria, la ubicación lo cambia todo»)

1. «Oviedo» (MD08, f324 = 10,8 s del vídeo): whisper oyó «odio» (0,02) y «abierto» en un corte aislado; por el contexto —y el anuncio, que cita el C.C. Oviedo— se lee «Oviedo».
2. «EAFIT» (MD08, f366 = 12,2 s del vídeo): whisper oyó «Eafid» y «Eafit» (0,34). **No está en el anuncio** (cita Oviedo, Santa Fe, la estación Aguacatala y la Milla de Oro): es una frase suya y se confirma con el usuario.
3. «Aguacatala» (MD08, f386 = 12,9 s del vídeo): whisper oyó «Acuacatala» (0,42); el anuncio escribe «Aguacatala» y su inicio exacto es ambiguo entre «estación» y «Aguacatala».
4. «déjate» (CT11, f935 = 31,2 s del vídeo): whisper oyó «déjate» con 0,05 y «hasta» en cortes aislados.

### 082 (V63, «¿Vives fuera de Colombia y quieres invertir en Medellín?»)

1. «vives» (HK10, f110 = 3,7 s del vídeo): whisper oye «Vivo» en la toma entera (confianza 0,16-0,14); «¿Vives fuera de Colombia…?» es la lectura por gramática y por la pregunta que sigue. Y «Medellín» (0,36).
2. «en edificios con reconocimiento» (MD01, f405 = 13,5 s del vídeo): una afirmación de Isabella que el anuncio no recoge; hay que confirmarla con el usuario además de oírla. Y «matrícula independiente» (consta en el anuncio).
3. «Haz» (CT10, f1026 = 34,2 s del vídeo): whisper la oye con confianza 0,14 (es la sílaba suelta de 0,62-0,74 s, antes del cierre de la «c»).
4. «Go Living Suites» (CT10, f1108 = 36,9 s del vídeo): whisper oye «StatSuite» (0,04); el anuncio dice «Go Living Suites».

### 083 (V64, «Las buenas inversiones empiezan con buenas decisiones»)

1. «estratégica» (MD09, f339 = 11,3 s del vídeo, dentro de «Una ubicación estratégica», que entra en el f321): whisper la oye con confianza 0,24 («estrategica», «técnica» según el corte).
2. «esto» (CT12, f940 = 31,3 s del vídeo): whisper oye «eso» (0,03-0,34); el guion dice «esto».
3. «Go Living Suites» (CT12, f988 = 32,9 s del vídeo): whisper oye «Goblin en Suiz», «Governing suits»…; el anuncio dice «Go Living Suites». Es el nombre propio del edificio.

### 084 (V65, «¿Y si tu próxima propiedad también pudiera generar ingresos?»)

1. «Y» inicial del hook (HK06, f113 = 3,8 s del vídeo): whisper la oye con confianza 0,37; sin ella sería «Si tu próxima propiedad…».
2. «hotelera» (MD03, f342 = 11,4 s del vídeo): whisper la oye con confianza 0,13 («hotelera» sale «hotelera» en la toma entera).
3. «Poblado» (MD03, f404 = 13,5 s del vídeo): whisper la oye con confianza 0,20 («Poblado», «polado» o «poblado» según el corte).
4. «Agendemos» (CT08, f977 = 32,6 s del vídeo): whisper oye «Ajenlemos» (0,14).
5. «Go Living Suites» (CT08, f1038 = 34,6 s del vídeo): whisper oye «Go Living Sweets» (Go 0,37, Sweets 0,24); el anuncio dice «Go Living Suites».

### 085 (V66, «Una buena inversión empieza por la tranquilidad»)

1. La interjección RECORTADA al principio de HK02 (1,22-1,53 s de la toma, antes del primer plano de esta pieza): whisper la oye «Hoy,» (0,81) y, cortando desde 1,215 s, «Hoy, una buena inversión…». Se quita porque el catálogo da la frase sin ella y el hueco de −60 dB que la separa de «una» (1,57-1,61 s) permite un corte limpio; si Isabella dijo otra cosa y se la quiere oír, hay que cambiar `VENTANA_VOZ` de `normalizar.mjs`.
2. «ubicación» y «estratégica» (MD04, f411 = 13,7 s del vídeo): whisper las oye «y ubicaciones estratégicas» (plural) y «en la educación estratégica» en cortes distintos; la lectura es «ubicación estratégica» (el anuncio la usa: «a unos metros de la Avenida El Poblado»).
3. «Agenda» y «una» (CT06, f794 = 26,5 s del vídeo): whisper oye «Ag» (0,36) y «una» (0,56); la «A» es muy suave (−57 → −40 dB en 20 ms). Sin ella sería «genda una visita».

### 086 (V67, «Antes de invertir en Airbnb, hay algo que debes saber»)

1. «Descubre una suite» (HK05 como mitad, f310 = 10,3 s del vídeo): whisper oye «Descubro en EZID» (confianzas 0,31-0,58); «una suite» va tan rápido que se oye «nezit».
2. «hotelera» (HK05 como mitad, f381 = 12,7 s del vídeo): whisper la oye con confianza 0,51.
3. «contáctame» (CT04, f837 = 27,9 s del vídeo): whisper oye «contacta a mí» (0,42-0,50).

### 087 (V68, «No se trata solo de comprar una propiedad»)

1. «solo de» (HK07, f104 = 3,5 s del vídeo): whisper oye «sólo hay que» (confianza 0,27 / 0,45) y, en un corte desde 1,585 s, también «sólo hay que»; el catálogo lo lee «solo de». Las dos lecturas tienen 2-3 sílabas en los 0,3 s que hay entre «solo» y «comprar»: la energía no las distingue (`onsets-voz.py`). Si dice «solo hay que comprar una propiedad» el trozo cambia a «solo hay que».
2. «Conoce» (CT03, f845 = 28,2 s del vídeo): whisper oye «Conocer» (0,24) y en un corte aislado «Conocí»; por el contexto («esta oportunidad») es el imperativo «Conoce».

## 4. Excepciones declaradas

- **080**: el golpe de entrada de «Heaven on Earth» mide 10,2 dB (el mínimo del canal es 12; la 071 y la 056 entraron en el mismo): `fuerzaMinEntrada: 10`. El clip de HK08 acaba 6 f tras su última palabra: 6 f entre el hook y el primer plano rápido (`minSubida`).
- **081**: la salida del hook (f190) no cae en un golpe (como en la 072): la música sube sobre el corte (`subidaPorEncima`).
- **082**: la canción está floja en el pasaje de los dos planos rápidos (−21,7 LUFS): la música sola va a −19,4 LUFS ahí (el golpe de la mitad, de 21,5 dB, suena entero con esa ganancia y el pico llega a −1 dBFS) y a −15,8 en el recorrido (la ganancia no pasa de +6 dB ni el pico de −1 dBFS).
- **084**: el hook de la 075 dice «generar ingresos» (pregunta: «¿Y si tu próxima propiedad también pudiera generar ingresos?»): la puerta lo admite como en la 075 (`permiteIngresos`); no promete cifra ni valorización.
- **085**: música a −15,6 y −15,4 LUFS en los dos tramos sin voz (pico de la canción a −0,1 dBFS).
- **086**: HK05 hace de mitad (como en la 077): `desde` 2 f y bajada de la música en 9 f para que la frase quepa entre dos golpes.
- La tienda (ZS05) solo entra desde 4,3 s, donde ya no se lee la marca WEGO; ZS04 no se usa. Ninguna pieza usa MD05, CT05 ni MD07.

## 5. Entrega (2026-11-10, tras el «Sí, exporta»)

Las ocho exportadas con las palabras de §3 SIN OÍR (la nota «POR CONFIRMAR AL OÍDO» se queda en cada plan). Por pieza: máster CRF 12, ligera CRF 16, versión con ficha (audio copiado del máster), portada, `.srt` y caption (el de su original con la primera línea cambiada), todo en `/Volumes/SSK SSD/Work/Propiedades Luxur/Suite Go Living/Videos Social Media/` con el sha256 comprobado; los mp4 y las portadas ya no están en `proyectos/NNN/finales/`.

| Pieza | Máster · ligera · ficha | Final | Portada (plano) | Contraste texto · isotipo |
|---|---|---|---|---|
| 080 | 72 · 38 · 72 MB | −15,1 LUFS · −2,8 dBFS | RC09, de la cama al escritorio (16,2 s) | 11,5 · 5,0 |
| 081 | 90 · 46 · 90 MB | −15,1 LUFS · −3,5 dBFS | RC04, el sofá, la mesa y la cama (24,0 s) | 6,7 · 10,6 |
| 082 | 100 · 52 · 100 MB | −15,4 LUFS · −1,1 dBFS | RC11, el televisor con la cama en primer plano (26,2 s) | 15,5 · 11,3 |
| 083 | 102 · 57 · 102 MB | −15,2 LUFS · −1,4 dBFS | DR06, el muro vegetal con el «GO» del edificio (1,4 s) | 6,3 · 5,1 |
| 084 | 93 · 47 · 93 MB | −15,0 LUFS · −3,4 dBFS | DR10, la entrada del edificio y la calle (1,4 s) | 9,1 · 4,5 |
| 085 | 76 · 40 · 78 MB | −15,3 LUFS · −1,1 dBFS | RC07, la vista desde el ventanal (24,6 s) | 8,1 · 7,3 |
| 086 | 72 · 37 · 74 MB | −15,1 LUFS · −3,2 dBFS | DR04, las hojas blancas sobre la fachada (1,5 s) | 13,3 · 5,1 |
| 087 | 72 · 37 · 72 MB | −15,1 LUFS · −1,8 dBFS | ZS02, los discos de pesas (17,2 s) | 8,5 · 7,9 |

Las ocho finales llevan 1080×1920, 30 fps y BT.709 (VUI y `colr`); la ligera y la de ficha tienen el audio idéntico al del máster y los mismos fotogramas. Las fichas dicen «SUITE HOTELERA EN VENTA · El Poblado · Go Living Suites · $ 539 M COP» (`suite-go-living.json`).
