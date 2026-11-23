#!/usr/bin/env node
/**
 * datos-prueba.mjs — vuelca a JSON lo que `verificar-prueba.py` necesita del plan del 100 (sin reescribir sus cuentas):
 * el nivel de la música frame a frame (`nivelMusica`), las ventanas de voz medidas, los tramos de voz y los cortes.
 *
 *   node proyectos/100/herramientas/datos-prueba.mjs proyectos/100/pruebas-720p/datos-prueba.json
 */
import fs from "node:fs";
import { cargaTs } from "../../../remotion/src/motor/metraje/revisar-metraje.mjs";

const salida = process.argv[2];
const { m, a, vo } = await cargaTs({
  m: "remotion/src/proyectos/100/metraje-100.ts",
  a: "remotion/src/proyectos/100/audio-100.ts",
  vo: "remotion/src/proyectos/100/voces-100.ts",
});
const D = m.DURACION_100;
const musica = [];
for (let f = 0; f <= D; f++) musica.push(+a.nivelMusica(f).toFixed(5));
const datos = {
  fps: 30,
  duracion: D,
  inicioMusica: m.INICIO_MUSICA,
  musicaSrc: a.musica100[0].src,
  musica,
  voces: a.voces100.map((t) => ({ id: t.id, src: t.src, en: t.en, dur: t.dur, desde: t.desde, ganancia: t.ganancia, ventana: vo.VOCES_100[t.id.replace(/^voz-/, "")] ?? null })),
  cortes: [...m.metraje100.slice(1).map((c) => ({ id: c.id, f: c.en })), { id: "papel", f: m.EMPIEZA_PAPEL }],
};
fs.writeFileSync(salida, JSON.stringify(datos));
console.log(`✅ ${salida}`);
