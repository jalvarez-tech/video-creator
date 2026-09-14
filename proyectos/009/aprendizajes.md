# Aprendizajes — proyecto 009 · Street Cats (primer reel de b-roll del repo)

Lo que esta pieza enseñó y que no estaba escrito en ningún sitio. El 009 es la
primera del repo **sin avatar y sin voz**, así que casi todo lo que aparece aquí
es de esa categoría nueva.

## 1. Una pieza sin avatar necesita una capa que el motor no tenía

Con avatar, el movimiento lo pone `camara-NNN.ts` sobre un clip único. Sin
avatar hay N clips y el movimiento **es el montaje**. Eso no era una variante de
la cámara: era una capa que faltaba. Se resolvió con el mismo patrón que las
otras cuatro —datos puros + intérprete— y encaja sin tocar el motor:

```
metraje-009.ts  (Corte[])  →  <PistaMetraje>
```

`Corte` lleva `desde` en **segundos** y no en frames, y esa es la decisión que
más se paga si se toma mal: los cinco clips llegaron a 23,976 · 25 · 29,97 fps
para una comp de 30. Los segundos son lo único que no depende del fps de nadie.

**Si aparece un segundo reel de b-roll, esto sube a `motor/`.** Hoy no, porque
ha servido una vez y no se sabe todavía qué parte era del formato y cuál de
este vídeo.

## 2. `tinta: "marca"` NO es el color de la marca que le pasas al dialecto

El error más caro del proyecto, y silencioso. `dialectoDe({ marca: STREETCATS })`
tiñe el metraje y la tipografía, pero su `paleta` cae por defecto en
`PALETA_MARCA`, donde `marca: theme.accent` = **el teal de plantilla**. Sin
override, el reel entero sale en verde azulado y **`revisaPlan` dice LIMPIO**:
no hay ninguna regla que compare la paleta del dialecto con la marca que se le
pasa al lado.

```ts
dialectoDe({ piezas: PIEZAS, marca: STREETCATS,
  paleta: { ...PALETA_MARCA, marca: STREETCATS.color.acento, … } })  // ← no es opcional
```

Es la deuda que `motor/marca.ts` ya declara en `acentoOscuro` («dos marcas
conviviendo sin saberlo»), vista desde el lado del que estrena canal. **Candidata
a regla nueva:** que `dialectoDe` derive la paleta de `marca` cuando no se le
pase una, o que una regla avise si `paleta.marca !== marca.color.acento`.

## 3. El acento de un canal se juzga contra SU registro, no en abstracto

`acento-luxur-contraste` dejó dicho que el naranja de Luxur daba 2,62:1 y no
servía de tinta de texto. La conclusión NO es «los ámbares no valen»: es que
aquel iba sobre **papel**. El `#FFB020` de Street Cats da **11:1** sobre el negro
del velo y es tinta de titular sin problema — y daría **2,04:1** sobre blanco,
que es justo por qué este canal no tiene registro claro. El contraste es del
PAR, no del color.

## 4. Sin voz, los volúmenes del motor dejan la pieza muda

`TARGET_DBFS` (general −21, whoosh/impact −27) existe para dejar sitio a una
narración. Sin narración hay que levantarlos, y conviene hacerlo con un factor
declarado (`ALZA`) en vez de escribir 18 volúmenes a ojo — así se ve de dónde
sale cada número y se deshace de una vez si la pieza llega a llevar voz.

Medido: ×4 en whoosh/impact y ×2,2 en generales. `underDialogue` y `duckDb` se
quedan fuera: duckear contra una voz que no existe resta 4,5 dB a todo por igual.

> Con solo esta capa la pieza quedaba en −40 dB de media: correcta de pico y
> vacía. Lo que la llenó fue la cama diegética (§11-16), que subió la media a
> −30 dB sin tocar los picos. **El nivel entregado es −19,98 LUFS / −3,66 dBTP.**

## 5. El molde `sello` no sirve en un Reel

Es donde va el copy en las cinco piezas con avatar del repo (004-008), y ancla
al 69,8 % del alto = y 1340. En el feed de Instagram esa banda la tapan el texto
del post, el usuario y los botones. **En vertical para Reels el copy va en
`franja`** (y 117-457), que existía para «ir por encima de la cara» y resulta ser
también la única banda alta segura.

Y `franja` no trae scrim, así que el degradado que hace legible su texto hay que
ponerlo en la capa de metraje. Son dos números en dos archivos que nada ata
(`MOLDES_GRAFICOS.franja.ancla` = 0,061 y el `alto` de `VELOS_009` = 620, en
`Reel009.tsx`): deuda declarada.

## 6. El punch-in puede ser RESCATE y no estilo — y entonces decide el archivo

El plano más repetido del vídeo (3 de 11 cortes) tenía la comida en una banda al
76 % del alto y dos tercios de pantalón vaquero desenfocado encima. Con el
punch-in suave que llevaba (1,02) se leía como una pierna azul. Rescatarlo pedía
zoom 1,60-1,78 con `pan` 22-32 — y **eso obligó a rehacer el archivo a 4K**,
porque a 1440 px de ancho ese punch era un reescalado de 1,27×.

El orden correcto es: mirar el plano → decidir el encuadre → y **de ahí** sale la
resolución a la que hay que guardarlo. Al revés (transcodificar «para que no
pese» y luego encuadrar) se descubre tarde y hay que rehacerlo.

Las dos ecuaciones del `pan` están en `metraje-009.ts §pan`. La que muerde es la
de cobertura (`pan ≤ 50·(z−1)`): pedir mucho desplazamiento **obliga** a mucho
zoom, y si no se comprueba aparece una franja negra en un borde que puede no
caer en el frame que revisas.

## 7. Tres cosas que solo desmintió el frame renderizado (R05)

Ninguna se ve en el plan y las tres estaban «bien» sobre el papel:

1. el velo de `pantalla` al 82 % sumaba tres oscurecimientos (velo + viñeta del
   molde + viñeta del metraje) y dejaba las dos últimas tomas en negro plano;
2. el flash ámbar a 0,5 de alfa parecía un error de codificación, no un golpe;
3. la segunda línea del hook a 46 px se leía como un pie de foto y no como la
   mitad de la frase.

## 8. El banco NUNCA dice que no — y aquí dijo que no dos veces

Dos búsquedas enteras (`cheese pull` y `alguien mordiendo`) devolvieron nueve
candidatos cada una y **ninguno servía**: pasta y malvaviscos la primera, pizza y
perros calientes sobre fondo liso claro la segunda. Se descartaron enteras. Que
`results.length > 0` no significa nada estaba escrito en el SKILL; lo que este
proyecto añade es que **descartar una búsqueda completa es un resultado normal**,
no una señal de que haya que bajar el listón. El cheese pull ya estaba en el
material del cliente y el plano de alguien comiendo habría roto el registro
oscuro de los otros cinco.

## 9. Publicidad de comida invierte el `metraje` del canal documental

CHOCÓ desatura (0,8) y mete grano para no parecer publicidad. Esto ES publicidad:
saturación **1,08**, contraste 1,14, viñeta 0,32 y grano al mínimo (0,028), que
en el dorado de la papa solo ensucia. Es el mismo campo del mismo tipo con el
signo cambiado, y es lo que confirma que `metraje` era de marca y no de formato.

## 10. Grok Imagine estaba caído y la pieza no lo necesitaba

`XAI_API_KEY` válida, equipo **sin créditos** (403). Y el b-roll que faltaba eran
*alitas*, que es una cosa real y filmable: por §3h ese plano le tocaba al **banco
aunque Grok funcionase**. Lo generativo servía para lo imposible (una papa en
ingravidez), que es decoración, no la promesa de marca.

**La lección operativa:** comprobar el motor generativo **antes** de planificar
con él —`grok.py modelos` tarda dos segundos y contesta si hay créditos—, y
tener claro de antemano qué planos de la lista son *reales* (banco), cuáles
*imposibles* (IA) y cuáles *no tienen referente filmable* (gráfico). Si al
tacharlos todos la pieza sigue en pie, el motor caído no bloquea nada.


---

# Segunda tanda — la cama de sabor (audio diegético)

## 11. En un reel de comida el antojo lo produce el SIZZLE, no la música

El encargo fue «un audio que provoque antojo». El reflejo es música; la
respuesta correcta era **sonido diegético**: aceite, brasa, salsa, un mordisco.
Dos capas de audio con trabajos opuestos, y por eso dos archivos:

    cues-009.ts    ESTRUCTURAL — «aquí hay un corte» (impact, whoosh, riser)
    sabor-009.ts   DIEGÉTICO   — «esto está chisporroteando»

Y una arquitectura que va contra el instinto: **una cama continua + acentos**,
no un ambiente por corte. Once ambientes en 31 s se oyen como once cortes de
audio, no como una cocina.

Además resolvió el bloqueo de música: `music_generation` sigue sin permiso en la
key (igual que en el 008), pero **`sound-generation` sí funciona**. Se comprueba
con un POST a `/v1/sound-generation`; son endpoints y permisos distintos.

## 12. Un SFX generativo se VERSIONA — al revés que la voz y el b-roll

La norma de la casa deja el material fuera de git porque lo que lo define sí
está dentro (el guion define la voz; el manifiesto define el b-roll de banco).
Con un modelo generativo eso **no se cumple**: relanzar el mismo prompt devuelve
otro sonido. El prompt no define el archivo, así que el archivo es la fuente de
verdad y va al repo (`remotion/public/sabor-009/`).

## 13. La API devuelve niveles incomparables — y el MODO de igualarlos importa

Spread medido entre los seis efectos: **20,5 LUFS** (plancha −12,2 contra
bandeja −32,7), y tres ya venían clipeando por encima de 0 dBTP. Igualarlos es
tan obligatorio como igualar el grado de cinco clips de vídeo, y el orden es el
mismo: primero se corrige el elemento, después el plan aplica su nivel artístico.

Lo que no se podía planificar era el MODO:

- **camas continuas → dinámico** (`linear=false`). Normalizadas como los golpes
  (−27 LUFS, lineal), un chisporroteo es todo transientes y ya llega a −3 dBTP:
  no admite ni 3 dB de ganancia y la mezcla se queda clavada en −23 LUFS. El
  limitador en una cama continua no se oye — nadie echa de menos la transiente
  de una burbuja de aceite.
- **golpes → lineal**. Comprimir el crujido le quita el ataque, que es
  literalmente lo que provoca el antojo.

## 14. Un déficit de LUFS no se arregla subiendo el pico

Le puse `ganancia: 1.5` a la salsa porque se había quedado 4 dB por debajo de su
objetivo de sonoridad. La mezcla pasó a clipear (+1,0 dBTP). El error: su LRA es
18,9, o sea que su media es baja **porque** sus picos son altos y aislados. No
había headroom que rellenar. LUFS mide media; el clipeo lo decide el pico.

## 15. ⚠️ EL HALLAZGO GRANDE: `startFromTarget` supone que el sonido empieza en el frame 0

Y los archivos del banco no cumplen eso. Medido:

    impact-deep.mp3        52 f de silencio antes del golpe
    whoosh-swoosh-07.wav   32 f
    whoosh-light-02.wav    27 f
    riser-low.mp3          20 f
    pop.mp3                18 f

**Consecuencia:** un cue de `deep` con 18 frames de duración reproduce 18 frames
de un archivo cuyo golpe está en el 52. Silencio. En este reel eso dejaba mudos
el golpe de apertura (f0), la revelación de la marca (f630) y el pop del CTA
(f778) — los tres sonidos que más importan. **Ninguno daba error:** el cue
existía, el volumen era correcto, el archivo sonaba solo en el reproductor.

Solo se ve midiendo el RMS del render por segundo. `s-domi` estaba en −99 dB,
silencio digital absoluto, con el plan diciendo LIMPIO.

Lo corrige `cueReal()` en `cues-009.ts`, y el detalle que casi se me escapa:
**el ataque se indexa por ARCHIVO, no por variante**. Con `variantIndex` una
misma variante resuelve a archivos distintos del POOL y las tres alternas de
`light` van de 3 a 27 frames — un mapa por variante habría corregido bien el
índice 0 y mal los otros dos, que es peor que no corregir.

**Está sin arreglar en el motor a propósito** (afecta a 001-008, publicados).
Candidatos, para cuando se decida:

- añadir un campo `ataque` a la tabla `SFX`/`POOL` y descontarlo en
  `startFromTarget` — la solución de raíz, y mueve el audio de 8 proyectos;
- o recortar el silencio de cabeza de los archivos en `copiar-sfx.sh`, que ya
  mide el pico para calibrar `vol` y podría medir esto en la misma pasada.

## 16. El silencio también se planifica

Los 9,4 s del CTA van sin cama y sin SFX salvo tres entradas. Después de 21 s de
fritura, el corte a nada es exactamente lo que hace que se lea la dirección.
