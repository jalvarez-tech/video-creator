# 01 · Plan narrativo — proyecto 008 · pieza GRACIAS («8 toneladas de puro amor»)

> Tercera pieza de la campaña «Ayudemos a Chocó». La primera (Noticia008) instaló
> la tesis —la ayuda de verdad llega después de los titulares—; la segunda
> (Avatar008) dio los tres puntos de recolección con dirección. Ésta es la que
> DEVUELVE: Juan Pablo agradece el apoyo recibido y da parte del avance.
> El clip es una grabación REAL del cliente (iPhone, selfie de exterior al
> atardecer), no un avatar HeyGen.

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Clip fuente | `IMG_1443.MOV` → `remotion/public/avatar-008-gracias.mp4` (HEVC 1920×1080 con rotación −90 → H.264 1080×1920, rotación horneada) |
| Medidas (R01) | 1080×1920 · **30 fps** · 47.02 s = **1410 frames** · AAC 48 kHz estéreo |
| Composición | `Gracias008` · 1080×1920 · 30 fps · duración = frames del clip |
| Formato | 9:16 vertical — avatar real + overlays (`PistaGraficos` + cámara + sonido) |
| Estilo | **Redes, sobrio** (el mismo de Avatar008): entradas cortas, cámara contada, SFX mínimos, sin sonidos de premio |
| Marca | `CHOCO` (`src/marcas/choco.ts`) — el watermark es el de la campaña, no el del negocio |
| Subtítulos | **fuera**, como el resto de la campaña: las tarjetas condensan la voz y la banda inferior ya es la zona de lectura (R14) |
| Destino | Instagram Reels / historias de la campaña |

## Por qué 30 fps

Igual que en Avatar008: la regla «avatar 9:16 = 25 fps» (§3a director) nació de
los clips HeyGen. El fuente real es 30/1 exactos y R01 manda — re-tiempar a 25
tiraría 1 de cada 6 frames de un rostro hablando.

## La transcripción manda (R02)

`proyectos/008/gracias/transcripcion.json` (whisper small) +
`transcripcion-palabras.json` (tokens con offsets — de ahí salen TODAS las
ventanas del timeline). Erratas de whisper corregidas contra el contexto de la
campaña: «kit diaseos» = kits de aseo, «nuestras edades» = nuestras sedes,
«Antioqueno» = antioqueño, «achocó» = a Chocó, «ese mes» = este mes.

Guion real (47,0 s): la duda resuelta («pensamos que 8 toneladas serían mucho
pero lo estamos logrando») → **gracias** («a todas las personas que se están
uniendo») → qué se recoge (kits de aseo · medicinas básicas · alimentos no
perecederos) → dónde (Medellín · Caldas · Oriente antioqueño) → la puerta abierta
(«si todavía no has llevado tu aporte… todavía tenemos tiempo») → el plazo y el
destino («a fin de este mes con el camión a Chocó, a las comunidades más
necesitadas») → el encargo concreto («nos han pedido medicinas puntuales para
los niños y los adultos mayores») → el corazón («cualquier ayuda por menor que
sea, todo suma, todo suma») → el remate («8 toneladas de puro amor hacia el
Chocó») → el cierre («Dios los bendiga, nuevamente muchas gracias a todos»).

## LA DECISIÓN DE ESTA PIEZA: la simbología del color

Avatar008 usaba **un** color (ámbar = lo operativo) y dejaba `logro` sin tocar a
propósito, con una nota escrita: *no había nada logrado todavía*. Aquí sí lo hay,
y —esto es lo que cambia el diseño— **el mérito no es de quien habla**. Así que el
color deja de ser un acento de marca y pasa a repartir autoría:

| Color | Significa | Dónde |
|---|---|---|
| **verde monte `#74C46A`** (`logro`) | **lo que ya se logró, y es de la gente** | «lo estamos **logrando**» · **GRACIAS** · **TODO SUMA** · el **8** del remate · **GRACIAS** final |
| **ámbar `#D97706`** (`marca`, acento oscuro del canal) | la campaña y **lo que falta por hacer** | chip de insumos, las tres sedes, «tenemos **tiempo**», «A FIN DE MES», «al **Chocó**» |
| **blanco** (`texto`) | **su voz**: el dato neutro, lo que él dice tal cual | titulares, listas, apoyos |
| **sin color** | **quien recibe** | la toma de los niños y los adultos mayores: blanco liso, ni un acento |

Las dos reglas que hacen que esto sea un sistema y no una paleta:

1. **El verde nunca aparece sobre algo que hizo él.** Aparece cinco veces y las
   cinco son de quien donó. Si alguna vez se usa para un dato de logística, deja
   de significar nada.
2. **Quien recibe no se decora.** Es la regla que la marca ya traía escrita («el
   dolor no lleva color: lleva silencio», `marcas/choco.ts`) llevada un paso más
   allá: los niños y los adultos mayores no son un argumento de campaña, así que
   su tarjeta no lleva acento **ni un solo efecto de sonido**.

`dato` y `perdida` siguen sin usarse. Un cuarto significado sería un color que
nadie puede aprender en 47 segundos.

**El verde no es el `logro` de fábrica.** El de la paleta del sistema (`#34d399`)
es una menta fría de dashboard y al lado del ámbar tierra de la campaña canta.
`#74C46A` comparte temperatura con el acento y da ≈6:1 sobre el scrim carbón —muy
por encima del 3:1 que pide un display—, la misma comprobación que hizo nacer
`acentoOscuro` en `marcas/choco.ts`.

## El sonido firma la misma frase

No es una capa aparte que «acompañe»: dice lo mismo con otro material.

- El **`impact deep` suena exactamente tres veces** y las tres caen sobre un
  titular VERDE: «GRACIAS», «TODO SUMA» y el «GRACIAS» final. Ningún dato de
  logística se lleva un deep, por importante que sea el plazo.
- La toma de **quien recibe entra con su whoosh y calla**: sus dos ítems no
  llevan pop, que es la misma decisión que dejarla sin color.
- Y el tramo 786–888 («ya nos hemos comunicado, nos han pedido…») va **sin
  gráfico y sin SFX**: es donde deja de hablar de logística y empieza a hablar de
  personas. Lo lleva su cara y el punch-in de cámara.

## Reparto de la pantalla (decisión de layout — ver 02)

Igual que en Avatar008 y por el mismo motivo, aunque el fondo sea otro: el clip
está grabado contra un **cielo de atardecer** y la franja superior no tiene
contraste para texto (el molde `franja` no lleva scrim). **Todo el texto vive en
la banda inferior** (moldes `sello`/`cta`: ancla 69,8 %, scrim carbón desde
abajo). Arriba solo el watermark de campaña, con su propia píldora oscura y
usando **el mismo componente** que la pieza anterior (`SelloCampana`): un
watermark que se desalinea entre vídeos de la misma serie se lee como error.

## El gancho (decisión del cliente, 2026-08-15)

El hook abre **planteando la duda entera y con la cifra dentro**, en tres tiempos
que caen cada uno sobre su palabra:

```
PENSAMOS QUE          f16
8 TONELADAS           f28  ← exactamente cuando la dice
era mucho             f48
        ↓ releva en f80
Lo estamos LOGRANDO   (verde)
```

Por qué así y no con un kicker pequeño: la primera versión resumía el
planteamiento en un antetítulo («pensamos que era mucho») y la cifra no aparecía
hasta el final de la pieza. Con la cifra ARRIBA, el que mira sin sonido tiene
las dos mitades del argumento —la meta y el logro— en los primeros tres
segundos, y el **8 abre y cierra** la pieza («8 toneladas de puro amor»).

La cifra va como `titular` con `lineas: [["8 TONELADAS"]]` y no como `texto`
suelto: con `lineas` el validador mide la línea entera y garantiza que no parte
(**R18**). Y el bloque es una `ranura`, no dos tarjetas: es la misma frase
cambiando de signo, igual que la objeción de g05.

## LA PRUEBA — las fotos de lo recogido (aportadas por el cliente, 2026-08-15)

Tres fotos REALES de la campaña, a pantalla completa bajo la tarjeta de insumos
(`g03`, f206–336), una por ítem y cada una en el frame de su palabra:

| frames | foto | ítem que ilustra |
|---|---|---|
| 206–249 | jabones, toallas higiénicas, papel | **Kits de aseo** |
| 249–286 | Ibuprofeno 800 mg y Acetaminofén 500 mg | **Medicinas básicas** |
| 286–336 | spaghetti y arroz apilados | **Alimentos no perecederos** |

**Por qué aquí y solo aquí.** Es el único tramo en que él ENUMERA, y una lista de
tres palabras leída sobre una cara vale menos que la cosa. En el resto de la
pieza el hero es él: si las fotos aparecieran también en «TODO SUMA» o en el
cierre dejarían de ser prueba y serían decoración.

**Por qué pueden estar.** Son **material propio del cliente**, no de banco: por
eso pueden afirmar un hecho. Generar esto con IA sería fabricar prueba
documental, que es lo que la campaña ya se prohibió en el 006 (director §3h).
Origen, sha256 y qué se ve en cada una: `proyectos/008/gracias/fotos/manifiesto.json`.

**Lo que no se disimula.** Dos de las tres miden 899×1599 y se escalan ~1,2 %
por encima del formato. Es una foto de móvil de una campaña de barrio y ése es
su registro; se le aplica el look del canal (velo cálido, grano compartido,
viñeta) para que lea con el clip, no para que parezca otra cosa.

## Qué NO lleva

- Ni b-roll de banco ni tomas `pantalla` del plan: el mensaje ES su cara
  agradeciendo, y lo único que interrumpe son las fotos propias de arriba.
- **Ni barra de progreso, ni contador, ni «X de 8 toneladas».** Él dice «lo
  estamos logrando» y no da una cifra intermedia; dibujar una proporción sería
  inventar el dato que falta. La duda se resuelve con palabras suyas y color, no
  con una barra que miente sobre cuánto se lleva.
- Ni música: sigue sin permiso `music_generation` en la key (README de `musica/`),
  y en este clip el viento real del exterior ya es la cama.
- Ni cama de ambiente del banco: el clip es de exterior y ya trae la suya.
