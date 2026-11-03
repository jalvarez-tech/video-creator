# Reparto fijo — 3 reels del Lote en San Cristóbal (066-068 · V48-V50)

> **Estado (2026-10-24, noche):** las tres FINALES están exportadas con el OK del usuario a las pruebas: `proyectos/NNN/finales/` con máster CRF 12, CRF 16, `.srt`, portada, versión con ficha y `caption.md` (en `proyectos/NNN/`). **066 · 40,6 s · 067 · 38,3 s · 068 · 37,1 s.** Puertas y lint en verde; `--final` falla solo por las palabras por oír, que se exportaron anotadas. **Copiadas al SSD (`…/Lote - San Cristobal/Videos Social Media/`, sha256 verificado); sin commit y sin push.**

> Encargo del 2026-10-24: «Haz 3 videos» para el [lote de 5.170 m² en San Cristóbal](https://propiedadesluxur.com/es/propiedades/medellin/san-cristobal/lote-en-venta-en-san-cristobal-medellin-de-5170-m2). Material: [`catalogo/catalogo-material.md`](catalogo/catalogo-material.md). **Este archivo manda** sobre lo que elija cada pieza.
> Numeración: la sesión hermana del Lote San Vicente Ferrer (worktree `property-videos-creation-b77e80`) ocupa 063-065 (V45-V47): estas son **066 · 067 · 068** (V48 · V49 · V50).

## Estructura del canal (igual para las tres) — Dron · Hook · Recorrido · Mitad · Recorrido · CTA

Tres frases de Isabella (≈ 15 s de voz en 36-42 s), el resto es la propiedad con música. Memoria `preferencia-estructura-reel-propiedad`: nunca un montaje de solo tomas a cámara.

1. **Dron de apertura**, SIN texto y SIN voz (regla fija 1); el frame 0 es la miniatura limpia.
2. **Hook** de Isabella (disuelve desde el dron si la toma tiene ≥ 12 f de aire antes de su primera palabra; si no, a corte).
3. **Recorrido** (2-3 planos mudos con música): dron y paneos del prado, en el orden del paseo, sin volver atrás.
4. **Mitad** de Isabella.
5. **Recorrido** (2-3 planos): sube hacia la vista; **el plano más largo del bloque es la vista** (la ciudad al horizonte), en el clímax de la canción.
6. **CTA** de Isabella y **tarjeta oscura** (logo 440 px al 60 % + `PropiedadesLuxur.com`), sin congelar ni `@propiedadesluxur`.

Texto en pantalla: **`editorial`** (modo del canal): la transcripción de lo que ELLA DICE, en trozos de 1-4 palabras, **sin cifras ni rótulos propios** (la ficha, el precio y la superficie van al caption y a la versión con ficha). Voz a **−15 LUFS** (cadena `VOZ_TRATADA`). Color por plano (`COLOR_BASE` + ajuste medido). Música que baja con curva y ACABA de bajar antes de la primera palabra.

## La tabla (la terna, el aéreo y la canción)

| Proy. | V | Ángulo | Hook | Mitad | CTA | Paneos (`4 Recorrido`) | Drones (rangos del clip, en s) | Canción (repetida de OTRA propiedad: autorizado, `musica-repetir-entre-propiedades`) |
|---|---|---|---|---|---|---|---|---|
| **066** | V48 | **«Con esta vista, muy pocos»**: la escasez de un lote de este tamaño con esta vista | **HK05** (`0959`) «…lotes de 5.000 metros, con esta vista, muy pocos.» | **MD03** (`0975`) «Hay una versión de tu vida donde ya no tienes que salir a buscar paz los fines de semana porque ya vives dentro de ella.» | **CT04** (`0967`) «Si deseas más información, haz clic en el enlace.» | RC01 · RC04 | **DR01 entero** (el reveal) · **DR02 entero** · **DR05 0-60 s** | ***Flying Into the Sun*** (V3, Los Patios: «ascenso, libertad, esperanza», sin pulso: por golpes medidos). Alternativa: *Utopia* |
| **067** | V49 | **«Este no es para ti»**: el filtro del comprador serio (no el más barato, el que sabe lo que quiere dejar de sentir) | **HK02** (`0951`) «Si estás buscando lo más barato de la zona, con todo respeto, este no es para ti.» | **MD01** (`0944`) «Aprendí a reconocer al comprador serio desde la primera fase [whisper oye «fase» con confianza 0,98: se pinta «fase»; POR CONFIRMAR]. No habla de metros, habla de lo que quiere dejar de sentir.» | **CT05** (`0986`) «5.000 metros, infinitas posibilidades. Haz clic en el enlace y hablemos.» | RC02 · RC03 | **DR03 entero** · **DR06 0-60 s** · **DR04 60-98,5 s** | ***Return to Oasis*** (V2, Los Patios: pulso constante de 110 BPM, el CTA cae sobre un piano). Alternativa: *Light Fills the Room* |
| **068** | V50 | **«El verdadero estatus es la privacidad»**: el refugio, el silencio, nadie que te apure | **HK04** (`0953`) «El verdadero estatus no es la fachada que muestras, es la privacidad que puedes tener.» | **MD02** (`0973`) «Imagina que el éxito por fin se siente como se ve: en silencio, con la montaña al frente y sin nadie que te apure.» | **CT01** (`0963`) «Tu [bosque o refugio: POR CONFIRMAR; 068 pinta «bosque»] privado, a solo 20 minutos de Medellín, escríbeme y agendemos una visita.» | RC05 · RC06 · RC07 | **DR04 0-60 s** · **DR05 60-121 s** · **DR06 60-119 s** | ***Heaven on Earth*** (V9 Los Patios y V38 Casa Los Bravos: «sereno, cálido, celestial», plana, por golpes). Alternativa: *Begin Again* |

**Por qué esta terna.** Las tres combinaciones usan las **9 tomas más limpias** del rodaje, **sin repetir ninguna frase entre piezas**; cada pieza lleva **una sola cifra dicha** como mucho (066: «5.000 metros» en el hook; 067: «5.000 metros» solo en el CTA; 068: «20 minutos» solo en el CTA) y ningún otro bloque la repite. Quedan libres para una cuarta pieza: HK01, HK03 (fallida), HK06 (otra toma de HK05), HK07 («Imagina construir tu casa campestre cerca de la ciudad y alejada del ruido»), HK08 y HK09 (dudosas), MD04, MD05, CT02 y CT03.

**Los drones no se pisan entre piezas** (los rangos de arriba son disjuntos por clip). Si a una pieza le falta metraje, saca otro tramo DENTRO de sus rangos antes de pedir prestado; si acaba compartiendo un plano, lo declara en su `combinaciones.md`. Los paneos RC se reparten igual: si repites uno, declaras el tramo.

## Lo que se dice y lo que NO se dice

- Solo lo que está en la ficha o lo que Isabella dice en su toma. **Sin energía, sin uso del suelo, sin vías, sin «apto para construir», sin valorización**.
- «**5.000 metros**» (ella) ≠ **5.170 m²** (ficha): los subtítulos llevan lo que ella dice, **sin corregirla**; la ficha, el caption y la portada llevan 5.170 m². Se avisa al usuario (decisión suya).
- «**a solo 20 minutos de Medellín**» (CT01, 068) no está en la ficha («a pocos minutos»): se declara y se pregunta antes de la final.
- Palabras dudosas (R31): se **MIDEN** (`segmentos.py`, `formantes.py`) y se dejan como «POR CONFIRMAR AL OÍDO» en el plan y en `combinaciones.md`; la puerta con `--final` falla mientras queden. En CT01 («refugio», «agendemos»), HK02-HK05 si algo no cuadra y en el hook de 067 («lo más barato de la zona»).

## Reglas que no se discuten (el canal)

- **Los clips de Isabella son 1080×1920 verticales de verdad**, no anamórficos: ni zoom extra ni recorte (a diferencia de Tierra Grata y San Vicente).
- **Los drones verticales** (`rotation=90`) se rotan sin tone-map (SDR) y a 29,97 fps llevan `setpts=PTS*1000/1001` antes de `fps=30`. Los apaisados no se usan.
- Primera toma sin texto ni voz; nunca el sello «PROPIEDADES LUXUR»; cierre con la tarjeta oscura; sin congelar.
- Voz a −15 LUFS; la música baja con curva de coseno y acaba de bajar antes de la primera palabra; cada corte SECO sobre un golpe que suena, comprobado sobre el audio del render (R33).
- Cifra dicha = cifra escrita.
- **Prueba primero**: se entrega un MP4 de 540×960 con fotogramas y la puerta en verde, y **no se exporta la final sin el OK del usuario** (R22). Sin commit ni push.

## Lo que entrega cada sesión (en `proyectos/NNN/finales/`, tras el OK)

1. `NNN-recorrido.mp4` (CRF 12) y `NNN-recorrido-crf16.mp4`.
2. `NNN.srt`.
3. La **portada 9:16** (`portada-luxur`): locación **SAN CRISTÓBAL**, negocio **VENTA**, un fotograma del dron distinto en cada pieza.
4. `NNN-recorrido-ficha.mp4` (`ficha-luxur`): sin subtítulos, **«LOTE EN VENTA» · San Cristóbal · EOLIA · $ 797 M COP** abajo del 1:1.
5. `proyectos/NNN/caption.md`: 📍 ubicación → esencial → especial → precio → CTA (DM/WhatsApp, no «enlace»), 2-3 emojis, 5 hashtags, un público por vídeo, versión resumida.
6. `proyectos/NNN/combinaciones.md` y `aprendizajes.md`.
Las finales irán a `/Volumes/SSK SSD/Work/Propiedades Luxur/Lote - San Cristobal/Videos Social/` cuando el usuario las apruebe.
