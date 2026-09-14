/**
 * PROYECTO 011 — Boda · María & Daniel.
 *
 * 1080×1920 · 30 fps · 3600 f (120 s) · estilo CINEMATOGRÁFICO en la boda y
 * REDES en la rumba · sin avatar, sin voz, sin marca · un solo texto (el título).
 * Artefactos: proyectos/011/artefactos/{01-plan,02-layout,03-timeline}.md
 *
 * EL Z-ORDER (director §3b), cuatro capas:
 *
 *   1. <PistaMetraje>      los 33 planos mudos, su punch-in, su grado y el look
 *   2. <Titulo011>         «BODA · María & Daniel», f0–150, con su propio velo
 *   3. <RotuloFiesta011>   «Y ahora… ¡LA FIESTA!», f2281–2436, anclado al RELEVO
 *   4. <Audio> × 2         Turning Page (0:00–1:18) y El Preso (1:18–2:00)
 *
 * No hay <CamaraVirtual> (no hay un sujeto al que seguir: en una pieza de
 * metraje el movimiento ES el montaje) ni sello: una boda no es un canal, y un
 * watermark encima sería una marca en el vídeo de otra familia.
 *
 * §música — DOS CANCIONES, UN RELEVO EN EL 1:18 (f2340). La primera prueba lo
 * tenía en el 1:00; el cliente lo pidió en el 1:18, que es donde la novia
 * levanta el cuchillo del pastel. Stems en WAV (proyectos/011/musica/README.md):
 * Turning Page desde 1,40 s durante 78 s a −16,49 LUFS, y El Preso desde 0,25 s
 * durante 42 s a −14,00 LUFS.
 *
 * Con la MISMA entrada de 1,40 s, el 1:18 cae en otro respiro de Turning Page
 * (79,25–79,55 s de la canción), así que mover el relevo no obligó a tocar los
 * cortes ni el beso del primer minuto.
 *
 * §fundido — v3, a petición del cliente: en la v2 la balada se apagaba en 6 f
 * dentro de ese respiro y el cambio sonaba a corte. Ahora se va en 2,8 s
 * (f2250–2334) con curva de coseno y deja 0,2 s de silencio antes del golpe.
 * Ese silencio corto es a propósito: es la pausa antes del «¡LA FIESTA!» del
 * rótulo, y hace que la entrada de la salsa se oiga más grande de lo que es.
 */
import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from "remotion";
import { PistaMetraje, type Look } from "./PistaMetraje";
import { RotuloFiesta011 } from "./RotuloFiesta011";
import { Titulo011 } from "./Titulo011";
import { DURACION_011, metraje011, RELEVO } from "./metraje-011";

/**
 * El look. Suave a propósito: el material ya viene bien expuesto después del
 * tone-mapping, y una boda graduada «con estilo» envejece mal. El velo cálido
 * compensa la luz de fluorescente del salón; la viñeta centra.
 */
const LOOK_011: Look = {
  saturacion: 1.0,
  contraste: 1.03,
  calido: 0.05,
  colorCalido: "#F2B880",
  grano: 0.025,
  vineta: 0.2,
};

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Turning Page: 3 f de entrada (solo evitar el clic) y un FUNDIDO de 2,8 s que
 * termina 6 f antes del relevo (§fundido). Coseno y no rampa lineal: arranca y
 * llega a cero sin quiebro, como un fader bajado a mano.
 */
const FUNDIDO_BODA = { desde: RELEVO - 90, hasta: RELEVO - 6 } as const; // f2250 → f2334
const volumenBoda = (f: number): number => {
  const entrada = interpolate(f, [0, 3], [0, 1], CLAMP);
  const p = interpolate(f, [FUNDIDO_BODA.desde, FUNDIDO_BODA.hasta], [0, 1], CLAMP);
  return entrada * 0.5 * (1 + Math.cos(Math.PI * p));
};

/**
 * El Preso: SIN rampa de entrada. El stem arranca en 0,25 s, que en la canción
 * es silencio digital (−99 dB) 20 ms antes del primer golpe: no hay clic que
 * tapar, y una rampa se comería justo el ataque que abre la rumba. Se va en 3 s
 * con curva de coseno, que suena a fader y no a rampa; la imagen se funde a
 * negro solo en el último segundo y medio, así que la música empieza a irse
 * antes que la imagen.
 */
const COLA_RUMBA = 90;
const volumenRumba = (f: number): number => {
  const total = DURACION_011 - RELEVO;
  const p = interpolate(f, [total - COLA_RUMBA, total], [0, 1], CLAMP);
  return 0.5 * (1 + Math.cos(Math.PI * p));
};

export const Boda011: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <PistaMetraje cortes={metraje011} look={LOOK_011} />
    <Titulo011 />
    <RotuloFiesta011 />
    <Sequence durationInFrames={RELEVO} name="música · Turning Page">
      <Audio src={staticFile("boda-011/011-boda-turning-page.wav")} volume={volumenBoda} />
    </Sequence>
    <Sequence from={RELEVO} durationInFrames={DURACION_011 - RELEVO} name="música · El Preso">
      <Audio src={staticFile("boda-011/011-rumba-el-preso.wav")} volume={volumenRumba} />
    </Sequence>
  </AbsoluteFill>
);
