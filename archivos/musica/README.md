# archivos/musica — la biblioteca, el catálogo y el registro de uso de la música

Esta carpeta es la de la música de quien usa el sistema (`herramientas/zonas.mjs`: zona del estudio, no viaja al producto). Aquí se versiona todo:

| Archivo | Qué es |
|---|---|
| `*.mp3` | Las 43 pistas de la biblioteca, con su nombre original. |
| [`catalogo-musica.md`](catalogo-musica.md) | 43 pistas de la biblioteca de Luxur: género, sentimiento, BPM y, para cada duración de reel (30, 45, 60 y 80 s), el segundo de la pista donde empezar (`desde`), con la calidad del gancho. Es lo que se lee para elegir y para cortar una canción. |
| [`registro-de-uso.md`](registro-de-uso.md) | Qué canción, hook, mitad, CTA y dron usó cada versión de un reel (las tachadas no se vuelven a elegir), el sha256 de cada pista y la tabla de versiones con el siguiente número libre. Su protocolo —reservar en el acto y publicar la reserva— está en el propio archivo. |

**El audio SÍ está aquí** (desde el 2026-10-07): los 43 MP3 de la biblioteca de Luxur (≈ 203 MB) se versionan junto al catálogo, por decisión del dueño. Ojo: son canciones comerciales y este repo es **público**, así que quedan expuestas en su historial; la licencia de uso no está verificada en ninguna (véase el registro). `archivos/` es zona de estudio en `herramientas/zonas.mjs`, así que el audio **no viaja al producto** exportado. Una pista elegida se copia desde aquí (o desde la carpeta de música del estudio, que es idéntica) a `proyectos/NNN/original/` y su sha256 (8) tiene que coincidir con el del registro: lo comprueba la receta de normalizado (`proyectos/NNN/normalizar.mjs`). Los WAV recortados y normalizados de cada reel no se versionan (`proyectos/*/musica/*.wav`).
