/**
 * clonar-al-copiar.cjs — hace que `fs.promises.copyFile` CLONE (`cp -c`, APFS `clonefile`) en vez de duplicar los bytes.
 *
 *   NODE_OPTIONS="--require $PWD/proyectos/061/herramientas/clonar-al-copiar.cjs" node proyectos/061/herramientas/stills-multiples.mjs …
 *   NODE_OPTIONS="--require $PWD/proyectos/061/herramientas/clonar-al-copiar.cjs" npx remotion render …
 *
 * POR QUÉ. El empaquetador de Remotion copia `remotion/public/` ENTERO al tmp en cada still, render o sonda (aquí, 1,6 GB de clips): con el disco al 100 %
 * (901 de 926 GB, 2026-10-09) esa copia no cabe y el still falla con ENOSPC. `COPYFILE_FICLONE` de Node NO clona en macOS (medido: 234 MB consumidos por una copia de 234 MB), pero
 * `cp -c` sí: origen y destino van al mismo volumen, la copia cuesta unos milisegundos y 0 bytes. Si el clonado falla (otro volumen), se copia como siempre.
 * Los enlaces simbólicos en `public/` NO sirven: el empaquetador los respeta y el servidor de Remotion responde 404 a lo que apunta fuera del bundle.
 */
const fs = require("node:fs");
const { execFile } = require("node:child_process");
const original = fs.promises.copyFile.bind(fs.promises);
fs.promises.copyFile = (origen, destino, modo) =>
  new Promise((resolve, reject) => {
    execFile("cp", ["-c", String(origen), String(destino)], (error) => {
      if (!error) return resolve();
      original(origen, destino, modo).then(resolve, reject);
    });
  });
