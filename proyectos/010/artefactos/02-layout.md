# 010 · Layout — dónde vive cada cosa en 1080×1920

## El reparto vertical

```
   0 ┌──────────────────────────────────┐
     │        VELO SUPERIOR (360 px)    │   degradado 0,42 → 0
  84 │        ● AYUDEMOS A CHOCÓ        │   SelloCampana (008), alto ≈52
 136 │                                  │
 196 │        ESTO LO HICIMOS…          │   rótulo `arriba` (solo 35,05–38,49 s)
     │                                  │
     │                                  │
     │            METRAJE               │   <PistaMetraje> · pantalla completa
     │         (30 planos)              │
 960 │   LLEGAMOS DONDE SOLO SE PODÍA…  │   rótulo `centro` (solo 0–5,86 s)
     │                                  │
1160 │        ░░ VELO INFERIOR ░░       │   degradado 0 → 0,72 (760 px)
     │                                  │
     │      Español · 56 px · 800 · #FFF│
     │      English · 38 px · 600 · azul│   ← bloque anclado por ABAJO
1620 │            ▬▬ filete ámbar       │
     │                                  │
     │        ZONA MUERTA (300 px)      │   ← UI de Reels/TikTok
1920 └──────────────────────────────────┘
```

## Las cuatro decisiones que sostienen esto

**1. Todo el texto corrido comparte una sola línea de base.** El bloque bilingüe
se ancla por `bottom: 300`, y los dos rótulos de cierre usan **ese mismo ancla**.
Un subtítulo de una línea y otro de dos acaban en el mismo píxel, así que el
bloque no tiembla en 26 cambios. Anclar por arriba —lo que sale solo si no se
piensa— habría hecho que cada cambio de longitud moviera el texto todo el vídeo.

**La excepción es el GANCHO, y se la puede permitir porque está solo.** Va
centrado verticalmente (`donde: "centro"`) y **a plena opacidad desde el
fotograma 0**. En esos 5,86 s no hay subtítulo debajo con el que alinearse, así
que no hay salto que evitar; y un titular de apertura centrado se lee como
portada, mientras que abajo se leía como pie de una imagen. El fundido de
entrada se quita (`entrada: 0`) porque el frame 0 es la miniatura del feed y lo
primero que ve quien hace scroll: medio segundo de titular invisible es medio
segundo tirado en el único formato donde el primer segundo lo decide todo.

Contraste comprobado en los tres planos del gancho — luma media de la banda que
ocupa el texto (y 840-1130): **110 · 102 · 97**. Los tres por debajo del medio,
así que el blanco con sombra se lee sin necesidad de velo central.

**2. El inglés pesa 68 % del tamaño y va en AZUL CLARO (`#B8E0F5`).** El 68 %
está dentro del 65-70 % pedido, y es el extremo alto porque a 1080 de ancho, por
debajo de ~36 px el inglés deja de leerse en un móvil.

El azul sustituye al blanco al 88 % que había antes, y hace el mismo trabajo
mejor: separa los dos idiomas por **tono** en vez de por brillo, así que el
inglés deja de parecer un español desvaído y el ojo distingue los dos bloques de
un vistazo — que es lo que hace falta cuando pasan en dos segundos. El tono está
medido, no elegido a ojo: **8,47:1** contra el velo inferior. Se compararon
cuatro; el siguiente hacia abajo (`#7FC4E8`) cae a 6,18:1 y sobre los planos
claros empieza a costar. Va a opacidad plena — la jerarquía ya la marcan el
tamaño y el color, y restarle alfa encima solo quitaría legibilidad.

**3. Los 300 px de abajo no se tocan.** Es el 15,6 % inferior, que en Reels y en
TikTok ocupan el texto del post, el autor y los botones. El ancho se limita al
88 % (`left/right = 6 %`) por la columna de iconos de la derecha.

**4. Hay dos velos y son asimétricos** (arriba 0,42/360 px · abajo 0,72/760 px).
No es un descuido de simetría: arriba solo hay que sostener una píldora que ya
trae borde propio y un rótulo de 3 s; abajo hay dos pisos de texto durante 65 s
sobre metraje sin control de exposición. Arriba estaba a 0,55 y el frame de
apertura perdía el cielo del Pacífico, que es medio plano.

## Lo que NO hay, y por qué

- **Ni una franja de gráficos, ni tarjetas, ni contadores.** El encargo pide que
  no parezca publicidad, y la biblioteca `motor/graficos/` está diseñada para
  explicar (cifras, plazos, listas). Aquí no hay nada que explicar: hay algo que
  mostrar. Se miró el catálogo antes de decidir esto, que es lo que pide el §7b
  del director; la conclusión fue que la pieza correcta era ninguna.
- **Ni logo de apertura ni pantalla de título.** Prohibido por encargo y
  castigado por el feed.
- **Ni barra de progreso ni CTA final con enlace.** El cierre es una frase, no
  una conversión.
