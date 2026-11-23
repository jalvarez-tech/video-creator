# 01 · Plan narrativo — proyecto 098 · «Tú estás aquí»

> Paso 1 de 3. Fundación MAS · Casa Sobre la Roca, campaña «MAS Estrellitas 2026». Uno de tres vídeos de 1 minuto
> hechos con el material del 097 (`proyectos/097/material/analisis-videos.md`), uno por canción: este es el de
> **«Tu Estás Aquí»** (Samy Galí, piano). Los otros: 099 «A Tus Pies» (adoración y gratitud) y 100 «Lo harás otra
> vez» (alegría y esperanza). Siguiente: [02-layout.md](02-layout.md).

## Cabecera (los supuestos declarados)

| | |
|---|---|
| Material | el del 097, ya normalizado en `remotion/public/mas-097/` (solo lectura) + tres fotos nuevas en `remotion/public/mas-098/` (receta `proyectos/098/normalizar.mjs`) |
| Composición | `TuEstasAqui098` · 1920×1080 · **30 fps** · **1794 f (59,8 s)** |
| Formato | 16:9 horizontal (redes, YouTube, pantallas de la iglesia) |
| Estilo | **íntimo** (lujo sobrio: pocos cambios, lentos, nada rebota salvo la estrellita) |
| Texto | las tiras de papel del 097, una por frase de niña, entre «»; **sin voz en off** |
| Música | «Tu Estás Aquí», piano solo (whisper no oye voz cantada), **de 26,55 a 86,35 s**, entera y de corrido |

## La idea (una frase)

Dios no se ve, pero está: lo dicen ellas con sus palabras —una relación que a veces se acerca y a veces se aleja,
perdonar, un regalo que se da con amor, querer a Cristo en la vida— y lo dice la imagen del círculo visto desde el
cielo, con una estrella que baja a su centro vacío. Después, cómo ser parte de MAS Estrellitas.

## Por qué ese tramo de la canción

La pieza (4:27) va por frases, sin pulso fijo (rubato: `rejilla.py` no encuentra recta). 0-86 s es el piano íntimo;
en 86,66 entra la segunda parte, llena. **26,55-86,35 s es un párrafo musical cerrado:** empieza en el silencio que
precede a una frase (−33 dBFS en 26,5 s, primera nota en 26,61) y acaba en el ÚNICO respiro de la pieza (85,5-86,3 s,
−34 dBFS), justo antes de que entre la parte llena. Dentro: frases suaves (0-20 s del vídeo), una parte más ligada
(20-36 s), una subida con el golpe más fuerte en 71,8 s (f1357) y la última frase que se apaga (f1595-f1794).
El vídeo cae así: la palabra en la parte suave, la estrella en la cima, el papel en la última frase.

## Escenas

| # | Tramo (s) | Narrativa | Idea | Hero |
|---|---|---|---|---|
| 1 | 0,0–4,6 | gancho | el atardecer sobre las montañas, la cámara sube hacia el cielo | b-roll (VT36) |
| 2 | 4,6–16,3 | revelación | «¿Cómo va tu relación con Cristo?» y el testimonio entero de VT07 | ella |
| 3 | 16,3–21,3 | — | «…trato de aferrarme a la verdad de Cristo» sobre las manos unidas (FT30): aferrarse = manos | foto |
| 4 | 21,3–30,1 | explicación | «¿Qué aprendiste de Dios este año?» → «perdonar»; «¿Qué es lo más bonito de recibir un regalo?» → «cariño y amor» | ellas |
| 5 | 30,1–37,5 | respiro | el corazón con las manos bajo la palmera (FT32) y la niña que señala el cielo (FT43) | fotos |
| 6 | 37,5–41,4 | revelación | «Yo lo que quiero en Navidad es a Cristo en mi vida» (HZ17, sin la Biblia) | ella |
| 7 | 41,4–49,3 | conclusión | el círculo desde el cielo (DR07); en la cima de la música aparece la estrella y baja a su centro | b-roll |
| 8 | 49,3–59,8 | cta | el papel: más de 3.000 regalos, los tres pasos con la cuenta, «Miles de corazones unidos por amor.», firma CSR \| MAS | gráfico |

## Decisiones tomadas (y las descartadas)

- **Sin palabras inventadas:** solo hablan ellas; el único texto que no es suyo es el del CTA, copiado del 097 (aprobado).
  **Descartado:** un hero «Tú estás aquí.» sobre el círculo; sería una tercera voz. La estrella lo dice sin palabras.
- **No repite el núcleo de 099 ni de 100** (nota en las notas compartidas): fuera las cualidades (HZ01/HZ05), los gritos
  (HZ08/HZ10/HZ19/HZ32), los sueños (VT13), los deseos (HZ14-16), los regalos en alto (HZ28) y el dron del pasillo.
  HZ17 entra solo con «a Cristo en mi vida».
- **Fuera:** VT11 (un nombre de niña y la voz del usuario), VT19, VT32, VT33 (su hogar), la fecha «20 de noviembre» y «la Nuestra»
  (por confirmar con MAS). El kicker del frame 0 dice «MAS Estrellitas 2026».
- **Menores:** las caras de FT32 y de los planos ya aprobados en el 097 (autorización de los padres, 097 rev. 1).
  FT30 y FT43 no enseñan cara. Las fotos salen de HEIC con GPS: se convierten a sRGB SIN EXIF.
