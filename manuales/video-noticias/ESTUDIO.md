# 📓 video-noticias — cuaderno del estudio (no va al producto)

> Lo que la skill decía de los proyectos del dueño y ya no dice, porque el producto se escribe neutro. Ninguna de estas notas cambia una regla: son el **precedente** de cada una. Este archivo está en `.gitignore` (`**/ESTUDIO*.md`).

## De dónde sale el formato

- El formato se sacó de un vídeo de referencia de terceros (un «explicador de noticias tech» sobre el pleito entre el cofundador y el CEO de una empresa de IA). Hasta 2026-09-22 `noticia-demo.ts` y el recetario reconstruían **ese** caso con nombres reales, y el gancho de ejemplo era «Sam Altman no fundó OpenAI». Se sustituyó por el caso ficticio «Talvia Labs» (empresa de software inventada, cooperativa de cuarenta socios → sociedad, retorno con tope 1 $ → 100 $ aunque gane 500 $, cronología 2019 → 2026, medio «Gaceta del Sector») porque un ejemplo con personas reales afirma cosas que el manual no puede sostener. El molde de las 11 tomas es el mismo; solo cambió el contenido.
- **Referencia real montada de punta a punta:** `proyectos/004/` (17 tomas, 73,5 s) con el DSL de tomas, y el 005. El **006** y el **007** son las dos piezas escritas como `Plan` nativo (`capa(dialectoEditorialDe(LUXUR), "noticia")`): son el único ejemplo de esa segunda superficie, porque el producto no trae una demo editorial nativa. El 008 también usa el plan nativo.

## Tipografía

- Hasta 2026-08-09 el formato firmaba con un serif pesado (`Georgia`). Se cambió a San Francisco por decisión de marca de **Propiedades Luxur**. Las marcas del estudio (`luxur.ts`, `choco.ts`, `streetcats.ts`) siguen declarando `LETRA_SF_SISTEMA` para no mover un píxel de las piezas publicadas; por eso `MARCA_BASE` conserva SF y solo `ejemplo.ts` lleva Inter.
- Las tablas de avances `sf500`…`sf800` de `plan/avances.ts` se midieron en este Mac con `generar-avances.mjs`. En Windows no se pinta SF, así que R09 estima con tablas de otra letra: las piezas 004-008 solo se re-renderizan idénticas aquí.

## Voz

- El **005** está locutado de punta a punta con la voz clonada del canal (`John Stevans v 0.1`, ElevenLabs): 16 tomas, cronometradas con `generar-vo.sh --motor elevenlabs`. Al acortar una frase refacturó 3 tomas de 16 (esa y sus dos vecinas del stitching): es la prueba de que `elevenlabs.py guion` es reanudable.
- El **004** sigue con la voz GUÍA del sistema (`--motor say`, Paulina es_MX): sus 17 tomas están cronometradas contra esa pista, así que para publicarlo hay que relocutarlo.
- En este Mac están instaladas, además de `text-to-speech`, las skills `sound-effects`, `voice-changer`, `voice-isolator` y `speech-to-text` de elevenlabs/skills (`.agents/skills/`, repuestas con `npx skills experimental_install` desde `skills-lock.json`). Son de terceros y no viajan con el producto.
- `generar-vo.sh` (bash, `say` por defecto) fue sustituido por `generar-vo.mjs` (node; `say` solo en macOS, `sapi` en Windows). Los WAV de 004-006 en `remotion/public/noticias/` se copiaron a mano desde `proyectos/NNN/vo/`.

## B-roll

- **Precedente del «no ilustres un hecho con una imagen generada»:** el 006 (una noticia sobre un sismo) renunció a metraje del sismo y dibujó esquemas (`grieta`, «La grieta que nadie miró»). La pieza `grieta` del dialecto nació ahí.
- La clave de xAI del estudio autentica pero el equipo no tiene créditos (403): `grok.py modelos` lo dice. Pexels sí funciona y es lo que se usó en el 014.
