# 01 · Plan narrativo — proyecto 009 · Street Cats

> Paso 1 de 3. Se escribe **antes** de tocar Remotion.
> Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Pieza | Reel viral de comida — **sin avatar, sin voz en off**: metraje + tipografía + SFX |
| Marca | **Street Cats** (`src/marcas/streetcats.ts`) — @streetcats.food, Caldas (Antioquia) |
| Composición | 1080×1920 · **30 fps** · **942 f (31,4 s)** |
| Formato | 9:16 vertical (`verticalSocial`) |
| Estilo | **redes** — cortes de 2,0–2,8 s, entradas cortas, sonido con presencia (§4) |
| Destino | Instagram Reels (límite pedido: **40 s** — se entrega en 31,4 s) |
| Objetivo | Que quien lo ve **sienta hambre en menos de 2 s** y se quede con la dirección |

**Por qué 31 s y no 40.** El encargo dice «máximo 40». En un Reel de comida el
material manda: hay 5 planos reales y estirarlos a 40 s obliga a repetir cada
uno tres veces. 31,4 s deja cada plano usado dos veces como mucho, mantiene el
corte cada ~2,2 s y llega al CTA con el espectador todavía dentro.

## Promesa y CTA

- **Promesa (primeros 3 s):** un reto — «no vas a poder ver esto sin antojarte».
  No es una afirmación sobre el negocio: es una apuesta sobre el espectador, y
  por eso no puede ser falsa.
- **Acción que se pide al final:** ir (dirección completa en pantalla) o pedir a
  domicilio.
- **Lo que NO se cuenta:** precios (no los tengo), horarios (no los tengo), y
  **nada que afirme que este metraje es la cocina de Street Cats** — ver §
  Honestidad.

## Honestidad del metraje (la decisión que condiciona TODO el copy)

Los 4 clips que aporta el cliente y el 5.º del banco son **metraje de archivo**:
comida real, cocinas reales, pero **no las de Street Cats**. Eso es normal y
legal en publicidad de comida (licencia Pexels, uso comercial), y aun así fija
una frontera que el copy respeta línea a línea:

- ✅ Se puede decir lo que la marca **es** y el dueño puede sostener: que vende
  alitas y papas, la dirección, que hay domicilios.
- ✅ Se puede describir **lo que se ve en el plano**: «ahogadas en salsa»,
  «crujientes por fuera».
- ⛔ **No** se escribe «nuestra cocina», «así se ve tu pedido», «así las hacemos»
  ni ningún deíctico que convierta el archivo en prueba documental. Es el mismo
  precedente del 006 —renunciar a metraje del sismo y dibujar un esquema— leído
  para el caso comercial (SKILL §3h).

Esto es lo único del plan que **el cliente tiene que validar**: si quiere decir
«así las hacemos», hay que rodar en el local.

## Escenas

`hero` = b-roll en todas menos la revelación: en una pieza sin avatar el metraje
es el protagonista y el texto es el que **cede**, no al revés.

| # | Tramo (s) | Narrativa | Idea | Hero | Texto en pantalla |
|---|---|---|---|---|---|
| 1 | 0,0–2,8 | hook | El reto | b-roll | «TE RETO» → «A VER ESTO SIN ANTOJARTE» |
| 2 | 2,8–5,2 | demostración | La mitad alitas de la promesa | b-roll | «ALITAS AL CARBÓN» |
| 3 | 5,2–7,4 | demostración | Hechas al momento, no recalentadas | b-roll | «HECHAS AL MOMENTO» |
| 4 | 7,4–9,6 | demostración | La otra mitad: papas | b-roll | «PAPAS RECIÉN HECHAS» |
| 5 | 9,6–11,8 | demostración | La salsa | b-roll | «AHOGADAS EN SALSA» |
| 6 | 11,8–13,8 | explicación | Textura (1/2) | b-roll | «CRUJIENTES POR FUERA» |
| 7 | 13,8–15,8 | explicación | Textura (2/2) | b-roll | «JUGOSAS POR DENTRO» |
| 8 | 15,8–17,8 | explicación | Cantidad | b-roll | «Y PORCIONES QUE SÍ LLENAN» |
| 9 | 17,8–21,0 | clímax | Se cobra el reto | b-roll | «¿YA TE ANTOJASTE?» |
| 10 | 21,0–24,2 | revelación | Quién es | **gráfico** | «STREET CATS» / «ALITAS Y PAPAS» |
| 11 | 24,2–31,4 | cta | Dónde y cómo | b-roll | dirección + domicilios + @ |

**El arco.** Reto (1) → pruebas (2-8, cada vez más rápidas) → se cobra el reto
(9) → recién entonces el nombre (10) → dónde (11). La marca llega **a los 21 s**,
cuando el hambre ya está creada; ponerla antes gasta el hook en publicidad.

**Rima de montaje.** El plano 1 (papas volando) vuelve en el 9 como fondo del
clímax: el mismo plano que abrió el reto es el que lo cobra.

## B-roll

Resuelto en el paso 3·bis. **Cinco planos**, todos 9:16 nativos, todos sin audio.

| id | plano | origen | medida real | duración |
|---|---|---|---|---|
| `papas-vuelan` | papas cayendo de la canastilla, en el aire | cliente | 1080×1920 · 23,976 fps | 4,38 s |
| `alitas` | alitas glaseadas al carbón, con humo | **Pexels** — Aghyad Najjar | 1080×1920 · 29,97 fps | 8,24 s |
| `grill` | manos volteando pollo con pinzas | cliente | **2160×3840** → 1440×2560 · 25 fps | 11,08 s |
| `emplatado` | espátula sirviendo papas y carne en bandeja | cliente | 1080×1920 · 23,976 fps | 8,22 s |
| `salsa` | salsa cayendo sobre papas con queso | cliente | 1080×1920 · 23,976 fps | 7,92 s |

- **Tres fps distintos (23,976 · 25 · 29,97) y la comp va a 30.** No se toca el
  fps de la comp (§3a·3): re-tiempa Remotion.
- `grill` llegaba en **4K y 47 MB**; se transcodifica a 1440×2560 (8,1 MB). 1440
  sigue dando margen para un punch-in de 1,33× sin subir nada.
- El clip del banco lleva **autor, licencia y sha256** en
  `proyectos/009/broll/manifiesto.json`; `bancos.py creditos --proyecto 009` saca
  el bloque de atribución para la descripción.
- ⚠️ `remotion/public/broll/` está en `.gitignore`. El plano del banco lo repone
  `bancos.py reponer --proyecto 009`; **los 4 del cliente no**, porque no vienen
  de ningún banco. Su origen queda anotado aquí para poder reponerlos a mano.

### Lo que se buscó y se descartó (el paso que no se salta)

`contactos` monta la hoja y la elección se hace **mirando**. Dos búsquedas
enteras acabaron en nada, y eso es el resultado correcto, no un fallo:

- **`p06-queso`** (cheese pull): la hoja devolvió pasta, malvaviscos, nueces y
  leche condensada. Cero quesos fundidos sobre papa. **Descartada entera** — y
  no hace falta: el clip `salsa` del cliente YA tiene el queso derretido.
- **`p08-comer`** (alguien mordiendo): pizza, perro caliente, fideos y una
  hamburguesa, casi todos sobre fondo liso claro. Ilustran «comida rápida», no
  «papas y alitas», y su luz clara rompería el registro oscuro de los otros
  cinco. **Descartada entera** (checklist §8: ante la duda, quita).

### Grok Imagine: **bloqueado, no omitido**

El encargo pedía escenas generadas con `/grok-imagine`. No se han podido hacer:

- **API directa de xAI** (la ruta del sistema): la clave `XAI_API_KEY` es válida
  pero el equipo **no tiene créditos** — `403 permission-denied: "Your newly
  created team doesn't have any credits or licenses yet"`. Se arregla comprando
  crédito en <https://console.x.ai> → Billing.
- **RunAPI** (la ruta del skill `/grok-imagine`): no hay clave configurada en el
  `.env`, y además el sistema la descartó a propósito por ser un revendedor.
- `seedance-20` no es alternativa: sin suscripción no genera (SKILL §3h).

**Qué se hizo en su lugar y por qué no es un parche.** El b-roll que faltaba era
*alitas*, que es una cosa **real y filmable**: por la regla de §3h ese plano le
tocaba al **banco** aunque Grok funcionase. Lo generativo habría servido para
planos imposibles (una papa en ingravidez, una explosión de sal), que son
decoración, no la promesa de marca. La pieza está **completa** sin ellos.

**Para añadirlos cuando haya crédito:** son 2-3 planos de textura y un cambio de
una línea en `metraje-009.ts` por plano. Candidatos anotados en
[03-timeline.md](03-timeline.md) § Grok pendiente.

## Sonido

Sin voz en off y sin música (el permiso `music_generation` de la key de
ElevenLabs sigue sin estar — memoria `proyecto-008-choco`). Eso cambia la mezcla:
**aquí los SFX no van por debajo de nada**, son la única capa de audio. Siguen
por debajo de sí mismos en jerarquía (el impacto del corte manda sobre la
textura), pero sin ducking de diálogo porque no hay diálogo.

⚠️ **El Reel se publica con SFX pero sin música.** En Instagram lo normal es
añadir un audio de tendencia desde la propia app al publicar: eso es una
decisión del cliente y se hace en el momento de subir, no aquí.

## Checklist del director

- [x] Una sola idea por escena, un solo hero
- [x] Nada tapa el sujeto del plano ni cae en la zona de UI de Reels
- [x] Todos los tiempos en frames a 30 fps
- [x] Cada corte y cada entrada con `reason`
- [x] Determinista (sin `Math.random`, sin `Date.now`)
- [x] B-roll descargado y medido; ninguna URL de API en el código
- [x] Crédito del plano de banco en el manifiesto
