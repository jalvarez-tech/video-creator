# Dónde está la final del 069

El montaje vive aquí; **los archivos entregados, no**: pesan y el repo no los lleva (`proyectos/*/finales/` está en el `.gitignore`).

| Archivo | Qué es |
|---|---|
| `proyectos/069/finales/botswana-069-final-SIN-VOCES.mp4` | la **final exportada el 2026-10-28** (rev. 9, **con la serenata de su boda del 0:15,9 al 0:21,9**; sustituye a la primera exportación, de la rev. 7): 1080×1920 · 30 fps · 69,37 s · H.264 High, BT.709 (VUI y `colr`), CRF 16 preset slow · AAC 320k con el audio alineado · 101 MB · −16,4 LUFS, pico −3,5 dBFS. **SIN las 5 locuciones y con el rótulo «[Información oficial para realizar aportes]»: NO es para publicar.** |

No se ha copiado al SSD: se exportó a petición de ellos («me convence, exporta el video») sabiendo que faltaban las voces y los datos de aporte. Cuando lleguen: `node proyectos/069/herramientas/exportar-final.mjs` (sin `--sin-voces`; exige que la puerta `--final` pase) deja `botswana-069-final.mp4`. Receta y motivos (render por tramos de 400 f, `--concurrency=2` y vigilancia del disco: el swap llenaba el volumen): `aprendizajes.md`, sección «Exportación de la final».

Para volver a renderizar hace falta el material normalizado de `remotion/public/botswana-069/` (≈ 650 MB, ignorado por git; se repone con `node proyectos/069/normalizar.mjs` desde `~/Downloads/Botswana` y las 3 publicaciones de @jalvarez.tech, ver `aprendizajes.md`).
