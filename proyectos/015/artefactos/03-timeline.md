# 015 · Timeline (30 fps · 1563 f · 52,1 s)

> Con el [01-plan.md](01-plan.md) y el [02-layout.md](02-layout.md) delante.
> Todo en frames ABSOLUTOS de la comp. Lo comprueba `node proyectos/015/revisar-015.mjs`.

## Montaje: nueve cortes, ocho fundidos

`desde` = frame de la FUENTE en el que el plano es opaco. La voz arranca un
frame después de ese `en` (el primero, seis) y termina 14 f antes del `en`
siguiente: 2 f de margen + los 12 del fundido.

| corte | clip | en | dur | desde (f fuente) | voz en la comp | fundido de entrada | ganancia |
|---|---|---|---|---|---|---|---|
| c01 | IMG_2592 | 0 | 100 | 20 | f6 → f86 | — (f0 = miniatura) | +1,5 dB |
| c02 | IMG_2593 | 100 | 194 | 21 | f101 → f280 | f88–f100 | +4,8 dB |
| c03 | IMG_2598 | 294 | 107 | 18 | f295 → f387 | f282–f294 | +2,5 dB |
| c04 | IMG_2601 | 401 | 136 | 13 | f402 → f523 | f389–f401 | +0,7 dB |
| c05 | IMG_2603 | 537 | 152 | 25 | f538 → f675 | f525–f537 | +0,8 dB |
| c06 | IMG_2614 | 689 | 136 | 17 | f690 → f811 | f677–f689 | −1,0 dB |
| c07 | IMG_2617 | 825 | 297 | 14 | f826 → f1108 | f813–f825 | −1,0 dB |
| c08 | IMG_2624 | 1122 | 254 | 16 | f1123 → f1362 | f1110–f1122 | −1,2 dB |
| c09 | IMG_2626 | 1376 | 187 | 19 | f1377 → f1537 | f1364–f1376 | −0,4 dB |

- **Silencio recortado**: de 60,1 s de material quedan 52,1; entre frases,
  siempre 15 f (0,5 s). 6 f de aire antes de la primera palabra y 26 f después
  de la última (la sonrisa bajo la cuenta).
- **Cruce de voz**: en los 6 últimos frames de cada fundido (`CRUCE_VOZ`), seno
  / coseno. Ninguna palabra dentro (la puerta lo mide).
- **El prerrollo más justo**: c04 empieza a hablar a los 0,48 s, así que su
  fundido arranca en el f1 del clip. Es lo que impide un fundido más largo.

## Textos y sonidos

| f | toma | entra | sobre qué palabra | sonido |
|---|---|---|---|---|
| 0 | g01 | LO QUE APRENDÍ EN APEX · Lo más valioso / no fueron las propiedades | puesto en el f0 | — |
| 100 | g02 | Fueron las ideas / y las oportunidades | «Fueron» (f101) | whoosh light |
| 197 | g03 | Detrás de cada problema / hay una oportunidad | «tras» (f203) | swoosh |
| 294 | g04 | HOY APRENDIMOS | «Hoy aprendimos» (f295) | whoosh light-02 |
| 317 | g04 | ✗ Solo resolver problemas | «no solo» (f323) | clic |
| 414 | g04 | ✓ Crear estrategias | «crear» (f420) | chime |
| 537 | g05 | ALGO TODAVÍA MÁS IMPORTANTE | «Y algo…» (f538) | swoosh-02 |
| 585 | g05 | Tu red cambia / tus oportunidades | «tu red» (f591) | pop |
| 689 | g06 | RELACIÓNATE CON ESTRATEGIA | «Cuando aprendes…» (f690) | whoosh light |
| 763 | g06 | Tus posibilidades | «tus posibilidades» (f771) | pop-03 |
| 797 | g06 | escalan | «escalan» (f803) | pop |
| 825 | g07 | UNA FRASE QUE ME MARCÓ | «También hubo una frase…» (f826) | swoosh |
| 895 | g07 | «No siempre gana / el mejor producto» | «no siempre» (f901) | pop-03 |
| 970/976 | g08 | «Gana el que el mercado / entiende mejor» | «gana» (f976), en su pausa de 0,47 s | whoosh light-02 (f976) |
| 1079 | g08 | IMPORTA CÓMO COMUNICAS | «cómo comunicas» (f1085) | pop |
| 1122 | g09 | La lección / más importante | «la lección más importante» (f1123…) | swoosh-02 |
| 1240 | g10 | LA PREGUNTA CORRECTA | «dejar de preguntarte» | whoosh light |
| 1246 | g10 | ✗ ¿Qué vendo? | «qué vender» (f1252) | clic-02 |
| 1330 | g10 | ✓ ¿Cómo puedo ayudar? | «cómo» (f1336) | chime-02 |
| 1376 | g11 | Isabella Cadavid | «Soy Isabella» (f1377) | swoosh |
| 1464 | g12 | ESCRÍBEME Y HABLAMOS | pausa antes de «Si te gustó» (f1470) | whoosh light-02 |
| 1470 | g12 | @propiedadesluxur (+ iconos en f1476) | «Si te gustó» | notificación |

Los frames de los sonidos NO están escritos en `cues-015.ts`: cada texto
declara su `sonido` en el plan y `anclasDeSonido()` devuelve su frame resuelto.
Cada nodo que cae sobre una palabra lleva además su `abs` (el frame de la
tabla): si se mueve, `revisaPlan` avisa. Probado moviendo a propósito siete
frames el titular «Detrás de cada problema»: «declara abs:197 y el plan lo
resuelve en 190».

## Medido en el render

**La voz** (pista de voz sola, rendida a WAV; ventana de voz de cada toma):
c01 −20,9 · c02 −21,0 · c03 −21,0 · c04 −21,0 · c05 −21,0 · c06 −21,0 · c07 −21,0
· c08 −21,1 · c09 −21,1 LUFS. La ganancia por encima de 1 (c02, +4,8 dB) la
aplica Remotion al renderizar (solo rechaza volúmenes negativos).

**Los efectos** (pista de SFX sola, R26 §4): los 21 golpean en su frame, a
−27 dBFS de RMS (33 ms) los whoosh, pop, chime y la notificación, y a −30 los
clics. Contra la voz que los rodea (RMS de 0,5 s): mediana **−1,9 dB**, de −7,4
(sobre una palabra fuerte) a +5,6 (en una pausa). La misma relación que el 014,
donde sí se oían; el whoosh de f1464 cae en la pausa de 0,7 s y ahí destaca
(+10 dB sobre el aire), que es lo que tiene que hacer el cierre.

**La mezcla** (máster): **−20,9 LUFS · −5,0 dBTP**, LRA 2,7. El nivel de la voz
tal como se grabó, sin limitador. El pico queda 3 dB por debajo del que da
cada WAV con su ganancia (c03: −1,6 dBTP calculado, −4,6 medido en el render):
Remotion reparte el micro mono en los dos canales a −3 dB cada uno, y la
sonoridad no cambia.

**El vídeo**: 1563 frames, 1080×1920, BT.709 en el VUI (1/1/1, rango limitado)
y en el `colr` del contenedor (R22), en el máster y en la versión para
compartir.

## Checklist

- [x] Puerta del 015 en verde (10 secciones) · tsc + eslint
- [x] Puertas del 009, 010 y 011 en verde tras quitar la cola de la disolvencia del motor
- [x] 011 renderizado antes y después del cambio del motor en la zona afectada (f163-172): idéntico byte a byte
- [x] Frames clave (f0, relevos exactos y el siguiente, mitad de un fundido, último frame)
- [x] Hoja de contactos del render y tira de un fundido (`vistas-previas/`)
- [x] Velo medido sin texto en f0 y en el primer frame de cada relevo (02-layout.md)
- [x] Voz y SFX medidos por separado (arriba)
- [x] Prueba 720p (`pruebas-720p/prueba.mp4`)
- [x] Máster BT.709 + versión para compartir (`finales/`)
