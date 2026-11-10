# Dónde está la final del 066

> **Copiado al SSD el 2026-10-24** (18 archivos, sha256 verificado uno a uno; los originales siguen en `proyectos/066/finales/`): `/Volumes/SSK SSD/Work/Propiedades Luxur/Lote - San Cristobal/Videos Social Media/` — el máster, la ligera, la versión con ficha, el `.srt` y `066-caption.md` junto a cada reel, y la portada en `Portadas/066-portada.png`. Receta: `proyectos/066/herramientas/copiar-al-ssd.sh`.

El montaje vive aquí; **los archivos entregados, no**: pesan y el repo no los lleva (`proyectos/*/finales/` está en el `.gitignore`). Quedan en `proyectos/066/finales/` de este worktree hasta que el usuario diga a qué carpeta del SSD van (la propiedad tiene `…/Lote - San Cristobal/Videos`, `imagenes` y `videos editados`; todavía no tiene carpeta de publicación).

| Archivo | Qué es |
|---|---|
| `066-recorrido.mp4` | el máster, CRF 12 |
| `066-recorrido-crf16.mp4` | la versión ligera |
| `066-recorrido-ficha.mp4` | la versión con ficha (sin subtítulos, con el precio abajo) |
| `066-portada.png` | la portada 9:16 |
| `066.srt` | los subtítulos |
| `caption.md` | el caption de Instagram (en `proyectos/066/`) |

Propiedad: **Lote campestre de 5.170 m² en EOLIA Condominio, San Cristóbal (Medellín), COP 797 M, venta**.

Para volver a renderizar: el material sigue en `remotion/public/recorrido-066/` y `proyectos/066/original/` (gitignored); si se borra, `node proyectos/066/normalizar.mjs` lo repone con los originales de `/Volumes/SSK SSD/Work/Propiedades Luxur/Lote - San Cristobal/Videos/videos/` (el script comprueba sus sha256). Los renders de entrega: `proyectos/066/herramientas/exportar-066.sh` y `arreglar-etiquetas.sh`.
