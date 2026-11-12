/**
 * LA SONORIDAD DE LA CANCIÓN, segundo a segundo (LUFS momentáneos de 0,4 s, ebur128), de 123 a 196 s de «Aleksey Chistilin - We Are». GENERADO por
 * `node proyectos/069/herramientas/curva-cancion.mjs` + `curva-a-ts.mjs`: no se edita a mano. El valor `i` es la media de potencia del segundo `CURVA_DESDE + i`.
 */
export const CURVA_DESDE = 123;
export const CURVA_LUFS: readonly number[] = [-10.5,-10.3,-8.6,-11.5,-14.4,-18.2,-20.2,-20,-20.5,-20.4,-22.1,-21.1,-20.5,-19.9,-21.4,-22.5,-20.4,-17.6,-21.6,-22.6,-16.7,-22.5,-22.8,-18.9,-20.2,-19.2,-18.9,-17.1,-13.8,-17.4,-17.1,-17.2,-14.3,-13.9,-15.9,-17.2,-15,-15.9,-16.6,-15.4,-12.9,-13,-13.1,-9.4,-12.1,-10.5,-9.6,-11.6,-10.8,-11.2,-9.5,-9.7,-11.1,-9.4,-8.7,-9.2,-8.3,-9.9,-8.9,-9.6,-10.8,-10.1,-10.7,-10.2,-10.3,-10.6,-9.8,-11,-9.5,-8.9,-9.1,-9.3,-9.1,-9.3];

/** La sonoridad de la canción (LUFS) en el segundo `t` de la pista, por interpolación lineal entre los centros de cada segundo. */
export const lufsDeLaCancion = (t: number): number => {
  const x = Math.min(CURVA_LUFS.length - 1, Math.max(0, t - CURVA_DESDE - 0.5));
  const i = Math.floor(x);
  const k = x - i;
  return CURVA_LUFS[i] * (1 - k) + CURVA_LUFS[Math.min(CURVA_LUFS.length - 1, i + 1)] * k;
};
