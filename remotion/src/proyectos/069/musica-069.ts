/**
 * LA SONORIDAD DE LA CANCIÓN, segundo a segundo (LUFS momentáneos de 0,4 s, ebur128), de 1 a 74 s de «Aleksey Chistilin - We Are». GENERADO por
 * `node proyectos/069/herramientas/curva-cancion.mjs` + `curva-a-ts.mjs`: no se edita a mano. El valor `i` es la media de potencia del segundo `CURVA_DESDE + i`.
 */
export const CURVA_DESDE = 1;
export const CURVA_LUFS: readonly number[] = [-20.1,-16.5,-14.8,-14.7,-15.2,-16.4,-17.5,-15,-15.5,-17,-12.5,-13,-14.4,-18.7,-19.7,-14.6,-12.5,-8.8,-10.1,-10.9,-11.4,-13.4,-11.1,-11.4,-10.5,-8.4,-9,-13.4,-16.1,-13.1,-11.2,-11.4,-10.5,-12.5,-13.8,-13.9,-12.6,-12.8,-11.9,-10.9,-9.9,-13.1,-16.2,-18,-18.3,-15.3,-15.7,-16.1,-18.8,-15,-17.1,-15.4,-16.1,-16.9,-17.8,-18.7,-24.2,-23.9,-18.8,-19.7,-20.8,-17.5,-18,-19.5,-19,-17.5,-17.5,-18.2,-17,-15.1,-16.9,-16.2,-13.1,-12.3];

/** La sonoridad de la canción (LUFS) en el segundo `t` de la pista, por interpolación lineal entre los centros de cada segundo. */
export const lufsDeLaCancion = (t: number): number => {
  const x = Math.min(CURVA_LUFS.length - 1, Math.max(0, t - CURVA_DESDE - 0.5));
  const i = Math.floor(x);
  const k = x - i;
  return CURVA_LUFS[i] * (1 - k) + CURVA_LUFS[Math.min(CURVA_LUFS.length - 1, i + 1)] * k;
};
