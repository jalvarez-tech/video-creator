/**
 * LA SONORIDAD DE LA CANCIÓN, segundo a segundo (LUFS momentáneos de 0,4 s, ebur128), de 99 a 176 s de «Softly I Judah Earl & BRANDON BLACK #music #cinematic #orchestralmusic». GENERADO por
 * `node proyectos/069/herramientas/curva-cancion.mjs` + `curva-a-ts.mjs`: no se edita a mano. El valor `i` es la media de potencia del segundo `CURVA_DESDE + i`.
 */
export const CURVA_DESDE = 99;
export const CURVA_LUFS: readonly number[] = [-11.7,-13.7,-16,-19.2,-22,-23.8,-24.1,-25.4,-27.9,-30.3,-33.9,-30.5,-26.5,-24.8,-24.1,-24.4,-26,-27.8,-29.4,-26,-26.3,-30.8,-31.8,-27.8,-24.1,-19.8,-19.8,-20.2,-19.9,-18.2,-18.1,-17,-18.7,-20.5,-19.8,-20.3,-21.8,-19.2,-18.5,-19.4,-18.4,-17.7,-16.9,-15.8,-16.2,-17.6,-15.5,-13.6,-10.3,-10.9,-11.2,-12.7,-13.1,-13.5,-11.9,-12.1,-11.9,-12.3,-12.3,-12,-10.3,-11.1,-12.3,-14.2,-15.2,-14.2,-11.4,-10.6,-11.8,-12.7,-12.5,-12.3,-10,-10.5,-10.8,-11.8,-12.7,-12.4];

/** La sonoridad de la canción (LUFS) en el segundo `t` de la pista, por interpolación lineal entre los centros de cada segundo. */
export const lufsDeLaCancion = (t: number): number => {
  const x = Math.min(CURVA_LUFS.length - 1, Math.max(0, t - CURVA_DESDE - 0.5));
  const i = Math.floor(x);
  const k = x - i;
  return CURVA_LUFS[i] * (1 - k) + CURVA_LUFS[Math.min(CURVA_LUFS.length - 1, i + 1)] * k;
};
