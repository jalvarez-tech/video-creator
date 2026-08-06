# 🎞️ Recetario de tomas — formato noticias

> Detalle de las **9 tomas** de [SKILL.md §3](SKILL.md). Cada ficha trae: para qué
> sirve, cuándo NO usarla, sus props en `TomaNoticia` y el sonido de partida.
> El sonido definitivo se declara en `cues-NNN.ts` ([diseno-sonoro](../diseno-sonoro/SKILL.md)).

Código: [`noticias/plan.ts`](../../remotion/src/plantillas/noticias/plan.ts) (el tipo) ·
[`noticias/PistaNoticia.tsx`](../../remotion/src/plantillas/noticias/PistaNoticia.tsx) (el intérprete) ·
[`noticias/Editorial.tsx`](../../remotion/src/plantillas/noticias/Editorial.tsx) (las primitivas).
Ejemplo completo: [`noticia-demo.ts`](../../remotion/src/plantillas/noticia-demo.ts) (comp `NoticiaDemo` del Studio).

---

## `titular` — el mensaje

**Para qué:** decir la cosa. Es la toma más frecuente del formato y la que sostiene los beats `gancho`, `conflicto` y `clímax`.
**Cuándo NO:** cuando el subtítulo ya dice exactamente eso. Texto duplicado en pantalla se lee como error.

```ts
toma("t01", "titular", "gancho", [0, 78], {
  registro: "cine",              // opcional: por defecto "papel"
  kicker: "OpenAI",              // antetítulo. NUNCA lleva el mensaje
  titular: "Sam Altman no fundó OpenAI",
  etiqueta: "Fue Elon Musk.",    // el remate, más pequeño
}, "Contradice la creencia por defecto en los 3 primeros segundos")
```

- El `kicker` entra primero, el `titular` 4 f después, la `etiqueta` a los 10 f. Ese stagger es lo que hace que se lea en orden en vez de aparecer como bloque.
- Máximo **7-8 palabras** en el titular. Si no cabe, son dos tomas.
- **Sonido:** `impact` / `deep` sobre la palabra clave, no al inicio de la toma.

---

## `prensa` — la prueba

**Para qué:** sostener una afirmación con un recorte real. Es el gesto de credibilidad del formato.
**Cuándo NO:** si no tienes el titular textual y el medio. **Un recorte inventado quema la pieza entera.**

```ts
toma("t03", "prensa", "conflicto", [186, 300], {
  kicker: "Reuters",                          // el medio: sostiene todo el bloque
  titular: "Elon Musk demanda a OpenAI y a su CEO Sam Altman por incumplimiento de contrato",
  resaltar: "incumplimiento de contrato",     // se busca literal dentro del titular
}, "Ancla el conflicto en una fuente real")
```

- El rotulador entra **14 f después** que el recorte, a propósito: primero se ve la prueba, luego se marca. Al revés no se entiende qué se subraya.
- `resaltar` busca el fragmento **literal** (case-insensitive). Si no lo encuentra, no resalta nada — comprueba la cadena.
- La tarjeta va rotada -1.2° por defecto: es lo que la hace leerse como recorte y no como caja.
- **Sonido:** `paper` al entrar + `pen` en el frame en que arranca el rotulador.

---

## `comparador` — A vs B

**Para qué:** dos o tres opciones enfrentadas en chips naranjas glossy. El «esto sí / esto no».
**Cuándo NO:** con un solo ítem. Un chip solo no compara nada — lo que querías era una etiqueta.

```ts
toma("t02", "comparador", "contexto", [78, 186], {
  titular: "Lo fundó sin ánimo de lucro",
  items: [
    { label: "Non Profit", glifo: "manos", activo: true },
    { label: "For Profit", glifo: "caja", activo: false },   // false = se apaga a gris
  ],
  etiqueta: "Para que la IA no acabara en manos de las grandes tecnológicas",
}, "Fija la premisa original en una imagen")
```

- Glifos disponibles: `manos` (dar / non-profit) · `caja` (guardar / for-profit) · `balanza` (ley, juicio) · `rayo` (velocidad, disrupción).
- `activo: false` apaga el chip a gris: marca la opción descartada **sin** añadir un aspa encima. Si además pones un aspa, hay dos gestos diciendo lo mismo.
- Entran con stagger de 6 f: se comparan en el orden del array. **El orden es una decisión narrativa.**
- **Sonido:** un `pop` por chip, alternando `variantIndex` para que no suenen idénticos.

---

## `cronologia` — el viaje entre fechas

**Para qué:** explicar que lo de hoy nace de una decisión de antes. Sin fecha, un conflicto no tiene causa.
**Cuándo NO:** con más de 4 hitos. A partir de ahí no es una cronología, es una tabla — y una tabla no se lee en 3 segundos.

```ts
toma("t04", "cronologia", "conflicto", [300, 420], {
  kicker: "Todo empieza antes",
  hitos: [
    { año: "2026", texto: "La demanda" },
    { año: "2018", texto: "Elon intenta fusionar OpenAI con Tesla" },
  ],
  dur: 40,   // frames que tarda el raíl en recorrerse
}, "Explica que el pleito de hoy nace de una decisión de 2018")
```

- **El orden del array es la dirección del viaje.** Primero de dónde sales. Ir hacia atrás (2026 → 2018) es información, no un descuido.
- El raíl se dibuja **lineal**, sin easing: con easing mentiría sobre la velocidad del recorrido temporal.
- **Sonido:** `whoosh light` al arrancar el raíl + un `tick` en cada hito que se alcanza.

---

## `cifra` — el dato como argumento

**Para qué:** cuando la **magnitud** es el mensaje. El ojo mide el recorrido, no el resultado.
**Cuándo NO:** para un número que solo acompaña. Si el dato no es el argumento de la toma, va como `etiqueta` de un `titular`.

```ts
toma("t07", "cifra", "datos", [630, 744], {
  kicker: "Aunque OpenAI gane 500 $",
  de: 0, valor: 100, prefijo: "$",
  etiqueta: "El inversor se queda en 100. El resto vuelve al brazo sin ánimo de lucro",
  color: "#FF5500",   // por defecto N.naranja
}, "El tope es el corazón de la noticia: hay que ver el número frenar")
```

- `de` importa tanto como `valor`: el recorrido es el argumento. Contar de 0 a 100 y contar de 500 a 100 cuentan historias opuestas.
- Lleva **punch** al aterrizar (SPRING.punch). Solo la cifra clave de la pieza debería llevarlo; si todas hacen punch, ninguna destaca.
- Usa `CifraContada`, **no** el `Contador` de la biblioteca general: aquél nace blanco con halo (fondo oscuro) y sobre papel se ve como una mancha.
- **Sonido:** `data` como textura durante el conteo + `chime` en el frame en que llega.

---

## `medidor` — lo que sube o baja

**Para qué:** dos magnitudes que se mueven a la vez y cuentan una injusticia (mucho dinero, cero control).
**Cuándo NO:** con más de 2 medidores. Tres sliders bajando a la vez no se leen.

```ts
toma("t08", "medidor", "climax", [744, 864], {
  titular: "Lo que compran los inversores",
  medidas: [
    { label: "Control",   de: 60,  a: 0,   sufijo: "%",  max: 100 },
    { label: "Beneficio", de: 500, a: 100, prefijo: "$", max: 500 },
  ],
}, "La frustración de los fondos se entiende viendo bajar ambos")
```

- `max` fija la escala de la barra. Sin él se toma `max(de, a)` — que suele ser lo que quieres, pero explícito se lee mejor.
- El primer medidor va en naranja (el que importa), el segundo en tinta. Es jerarquía, no variedad.
- **Sonido:** `ui` al aparecer el control + `data` mientras los números se mueven.

---

## `retrato` — metraje enmarcado

**Para qué:** meter una foto o un clip real **dentro** del artículo, sobre papel.
**Cuándo NO:** para un plano que necesita impacto a pantalla completa → usa `escenario`.

```ts
toma("t05", "retrato", "conflicto", [420, 510], {
  media: "noticias/musk-lavabo.jpg",   // ruta dentro de remotion/public/
  esVideo: false,                       // true → OffthreadVideo
  titular: "Elon se fue",
}, "Pone cara al momento de ruptura")
```

- Borde naranja + sombra al 15 % + esquinas redondeadas. **Nunca a sangre sobre papel.**
- Ken Burns automático (escala 1 → 1.06 durante la ventana): una foto fija sin deriva se congela.
- **Sin `media` monta el marco vacío con "pendiente"** — sirve para maquetar antes de generar el b-roll. Aparece en los avisos de `revisaNoticia()`.
- Como va enmarcado (~640 px de ancho), **perdona resolución baja**: es la toma correcta para b-roll de Grok mientras no se confirme su resolución de salida ([director §3h](../director-video/SKILL.md)).
- **Sonido:** `camera` (si es foto) o `whoosh light` (si es clip).

---

## `escenario` — metraje a sangre

**Para qué:** el registro «esto está pasando». Sube la apuesta de la pieza.
**Cuándo NO:** más de 3 seguidas (se pierde el registro editorial) ni con material de baja resolución sin scrim.

```ts
toma("t10", "escenario", "climax", [954, 1050], {
  media: "noticias/altman-casablanca.mp4",
  esVideo: true,
  titular: "Y la IA ya es política",
}, "Deja de ser corporativo y pasa a ser poder público")
```

- Lleva **scrim inferior automático**: sin él, el titular blanco desaparece en cuanto el metraje se aclara.
- El titular va abajo (`paddingBottom: 560`), por encima de la zona de subtítulos.
- Material de archivo en **blanco y negro** funciona especialmente bien aquí: contrasta con el naranja del resto y refuerza el «esto es documento».
- **Sonido:** `whoosh heavy` en el corte de entrada.

---

## `cierre` — el remate

**Para qué:** negro, una palabra en serif, y el gancho a la parte 2. El formato vive de que la historia no cierre del todo.
**Cuándo NO:** si no hay parte 2 ni CTA real. Un «Parte 2» que nunca llega quema la confianza del canal.

```ts
toma("t11", "cierre", "cierre", [1050, 1140], {
  titular: "Parte 2",
  etiqueta: "Por qué Elon dice que es una traición",
}, "Gancho a la continuación")
```

- Una o dos palabras. Un cierre de 6 palabras no es un cierre.
- **Sonido:** `impact` / `deep` con cola larga que se apaga con el vídeo.

---

## Tabla rápida de props

| Prop | Tipo | Usan |
|---|---|---|
| `kicker` | string | titular · prensa (el medio) · cronologia · cifra |
| `titular` | string | todas menos `cronologia` |
| `etiqueta` | string | titular · prensa · comparador · cifra · cierre |
| `resaltar` | string | prensa |
| `de` `valor` `prefijo` `sufijo` | number/string | cifra |
| `items` | `ItemComparador[]` | comparador |
| `hitos` | `Hito[]` | cronologia |
| `medidas` | `Medida[]` | medidor |
| `media` `esVideo` | string/bool | retrato · escenario |
| `registro` | `"papel"\|"cine"` | override del registro por defecto |
| `color` | string | cifra · medidor |
| `dur` | number | cronologia · cifra · medidor |
| `soundCueId` | string | todas (enlaza con `cues-NNN.ts`) |
| `reason` | string | **todas — obligatorio** |
