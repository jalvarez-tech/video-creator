# archivos/musica — el catálogo y el registro de uso de la música

Esta carpeta es la de la música de quien usa el sistema (`herramientas/zonas.mjs`: zona del estudio, no viaja al producto). Aquí SÍ se versiona:

| Archivo | Qué es |
|---|---|
| [`catalogo-musica.md`](catalogo-musica.md) | 43 pistas de la biblioteca de Luxur: género, sentimiento, BPM y, para cada duración de reel (30, 45, 60 y 80 s), el segundo de la pista donde empezar (`desde`), con la calidad del gancho. Es lo que se lee para elegir y para cortar una canción. |
| [`registro-de-uso.md`](registro-de-uso.md) | Qué canción, hook, mitad, CTA y dron usó cada versión de un reel (las tachadas no se vuelven a elegir), el sha256 de cada pista y la tabla de versiones con el siguiente número libre. Su protocolo —reservar en el acto y publicar la reserva— está en el propio archivo. |

**El audio NO está aquí, y `.gitignore` lo deja fuera a propósito** (`archivos/musica/*.mp3`, `*.wav`…): son canciones comerciales y este repo es público; subirlas sería redistribuirlas. La biblioteca (los MP3) vive fuera del repo, en la carpeta de música del estudio. Una pista elegida se copia desde allí a `proyectos/NNN/original/` y su sha256 (8) tiene que coincidir con el del registro: lo comprueba la receta de normalizado (`proyectos/NNN/normalizar.mjs`). Si hace falta versionar también el audio, va a un repo PRIVADO (o Git LFS en uno privado), no a este.
