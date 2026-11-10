# Reparto fijo — 3 reels del Lote San Vicente Ferrer (063-065 · V45-V47)

> **Rev. 2 del 2026-10-22.** La rev. 1 se descartó: el usuario cambió el material (dejó solo los cuatro mejores drones y movió `medio2` a hooks) y pidió otro planteamiento —**partir las tomas por el «ven, te muestro» y tapar los huecos con infografía**—. Las tres piezas se rehacen desde aquí.
> Material: [`catalogo/catalogo-material.md`](catalogo/catalogo-material.md). **Este archivo manda.**

## El problema que resuelve esta rev. 2

Después de los cambios del usuario el material hablado se queda en **cinco frases** para **seis huecos** (tres hooks + tres mitades), y encima una toma era un duplicado:

- `hook4.mp4` **no es una segunda toma**: es **copia exacta** de `Hook1.mp4` (mismos tiempos palabra a palabra). **Descartada**.
- `medio2.mp4` ya no está en `2 Mitad`: ahora es `1 Hooks/Hook5.mp4`. En `2 Mitad` **solo queda `Medio3.mp4`**.

La salida no es repetir una frase, sino **cortar donde la propia Isabella invita a mirar**. Las cuatro tomas de hook terminan en «**ven, te muestro**» o «**ven, te enseño cómo**»: esa coletilla se separa y se usa como **puente** hacia el dron, que es exactamente lo que la frase anuncia. Y donde ella dice «te muestro **cómo**» o enumera, entra un **infográfico** con los datos de la ficha. Así cada pieza mantiene sus tres frases sin que ninguna se repita.

## Los cortes, medidos (whisper `--palabras`, en segundos de cada clip)

| Toma | Parte A — la afirmación | Parte B — la invitación |
|---|---|---|
| `Hook1.mp4` | **0,03 → 7,74** «El error no es comprar un lote barato, es comprarlo sin todas las acometidas legales.» | **7,74 → 9,60** «Ven, te enseño cómo evitar esto.» |
| `Hook2.mp4` | **0,00 → 13,84** «Un lote cerca de Medellín por 350 millones, sí, y tiene 3.244 metros cuadrados.» | **13,84 → 14,58** «Ven, te muestro.» |
| `Hook3.mp4` | **0,01 → 16,82** «3.244 metros cuadrados a solo 15 minutos de la autopista Medellín-Bogotá y por solo 350 millones.» | **16,82 → 17,40** «Ven, te muestro.» |
| `Hook5.mp4` (ex-`medio2`) | **0,01 → 13,10** «No necesitas estar a tres horas de Medellín para tener 3.244 metros cuadrados.» | **13,10 → 17,76** «Ven, te muestro, este es un [precio] de lote.» |
| `Medio3.mp4` | **0,05 → 6,64** «Antes de enamorarte de un lote, [fíjate] en tres cosas,» · **6,64 → 8,80** «ubicación, agua y escrituras,» · **8,80 → 11,54** «y este lote empieza con todas esas cosas sobre la mesa.» | — |

Los tiempos salen del reparto de whisper, que clava el principio de frase y se va hasta 0,35 s largo al final: **cada sesión afina su corte al frame mirando la onda**, y deja ~0,15 s de aire tras la última sílaba para no comerse la «s» final (pasó en la 054).

## La estructura nueva, igual para las tres

1. **Dron de apertura**, sin texto y sin voz (regla fija del canal).
2. **Hook**: la parte A, cortada justo antes del «ven, te…».
3. **La invitación** (parte B), **a corte** sobre su propia imagen.
4. **Dron + INFOGRÁFICO**: los datos entran sobre el vuelo, encadenados a lo que ella acaba de prometer.
5. **Mitad**: otra frase.
6. **Dron**.
7. **CTA** y tarjeta oscura.

La infografía se construye con el motor (`motion-graphics`, mira el catálogo antes de inventar un gráfico) y sigue lo que hizo la **060**: **cifras sin animar**, que entran completas una a una y se quedan; nada de contadores. Y como en la 060, **la banda de la ficha no se pisa con las cifras** en la versión `-ficha`: mientras haya infográfico, la banda se va.

## La tabla

| Proy. | V | Ángulo | Hook (parte A) | Invitación (parte B) | INFOGRÁFICO | Mitad | CTA | Drones | Canción |
|---|---|---|---|---|---|---|---|---|---|
| **063** | V45 | **El error**: comprar barato sin papeles | `Hook1` 0,03-7,74 | `Hook1` 7,74-9,60 «ven, te enseño **cómo** evitar esto» | **LO QUE SÍ TIENE**: ✔ Derecho de acueducto · ✔ Escrituras al 100 % · ✔ 3.244 m² | `Medio3` entera, con **UBICACIÓN · AGUA · ESCRITURAS** apareciendo según las dice (6,64-8,80) | CT02 `cta2.mp4` | **DR02** entero + **DR01 0-24 s** | *Oceans (Where Feet May Fail)* |
| **064** | V46 | **No hace falta irse lejos** | `Hook2` 0,00-13,84 | `Hook2` 13,84-14,58 | **DISTANCIAS**: 15 min de la autopista Medellín-Bogotá · 1 hora de Medellín | `Hook5` 0,01-13,10 («no necesitas estar a tres horas…») | CT03 `cta3.mp4` | **DR03** entero + **DR01 24-48 s** | *Cornfield Chase* |
| **065** | V47 | **15 minutos**: la decisión | `Hook3` 0,01-16,82 | `Hook3` 16,82-17,40 | **LA FICHA**: 3.244 m² · $ 350 M negociable · Acueducto · Escrituras 100 % | **CT05** `cta5.mp4` («¿lo comprarías para construir o para invertir?») en posición de mitad | CT01 `cta1.mp4` («comenta "lote"») | **DR04** entero + **DR01 48-73,5 s** | *deadmau5 - Strobe* |

**Por qué la 065 lleva dos CTA**: no queda ninguna frase de hook ni de mitad libre, y `cta5` es una **pregunta**, no una llamada a la acción: funciona como bisagra en mitad de la pieza y deja el cierre a `cta1`. Son dos frases distintas, así que no hay repetición; queda declarado en su `combinaciones.md`.

**Drones sin pisarse**: solo hay cuatro clips (183 s) para tres piezas, así que **DR01 se parte en tres tramos disjuntos** y cada pieza se queda además con un clip entero para ella. Si a alguna le falta metraje, saca otro tramo **de los suyos** antes de pedir prestado; si acaba compartiendo un plano, lo declara.

**Libres**: CT04, CT06, CT07 y la parte B de `Hook5` («ven, te muestro, este es un precio de lote»). `hook4` está descartada por duplicada.

## Lo que la infografía puede decir — y lo que no

Solo datos que están en la ficha de la web: **3.244 m²**, **COP 350 M negociable**, **derecho de acueducto**, **escrituras al 100 %**, **15 min de la autopista Medellín-Bogotá**, **~1 h de Medellín**, **topografía mixta**, **parcelación abierta sin portería**, **vereda La Porquera**.

**Nada de energía, uso del suelo ni tipo de vía de acceso**: la web no los dice. Y nada de «apto para construir»: la propia ficha avisa de que el uso depende de la normativa. La palabra «amenidades» del encargo se traduce aquí en **lo que el lote sí tiene**, que es justo lo que responde al miedo del hook.

## Lo que entrega cada sesión (en `proyectos/NNN/finales/`)

1. `NNN-recorrido.mp4` (máster CRF 12) y `NNN-recorrido-crf16.mp4`.
2. `NNN.srt`.
3. La **portada 9:16** (`portada-luxur`): locación en Safira March + línea + **VENTA**, isotipo PL abajo.
4. `NNN-recorrido-ficha.mp4` (`ficha-luxur`): **sin subtítulos**, tipo · lugar · **COP 350 M** abajo del 1:1, con el audio del final copiado y **la banda oculta mientras haya infográfico**.
5. `proyectos/NNN/caption.md`: 📍 ubicación → esencial → especial → precio → CTA, 2-3 emojis, 5 hashtags, un público, versión resumida.

Las finales las mueve la **sesión madre** a `/Volumes/SSK SSD/Work/Propiedades Luxur/Lote San Vicente Ferrer/Videos Social/`.

## Reglas que no se discuten

- **Las tomas de Isabella son ANAMÓRFICAS** (`1920×1080`, SAR 81:256 = 9:16 real): se escalan enteras con `setsar=1` y **nunca se recortan**.
- Los drones van a 29,97 fps: `setpts=PTS*1000/1001` antes de `fps=30`.
- Primera toma **sin texto y sin voz**; **nunca** el sello «PROPIEDADES LUXUR» sobre la imagen; cierre con la **tarjeta oscura** (logo 440 px al 60 % y PropiedadesLuxur.com), sin congelar ni `@propiedadesluxur`.
- **Voz de Isabella a −15 LUFS**; la música baja con curva de coseno y **acaba de bajar antes de la primera palabra**.
- Cifra dicha = **cifra escrita**.
- Palabras por oír, las mismas de siempre: **«fíjate en tres cosas»** (`Medio3` ≈ 5,2 s) y **«un precio de lote»** (`Hook5` ≈ 14,4 s, si se usa esa parte). Si no se cierran al oído, se miden (`formantes.py`) y se declaran.
