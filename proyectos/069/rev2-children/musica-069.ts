/**
 * LA SONORIDAD DE LA CANCIÓN, segundo a segundo (LUFS momentáneos de 0,4 s, ebur128), de 110 a 186 s de «Armin van Buuren - Children (from 'Piano' album)». GENERADO por
 * `node proyectos/069/herramientas/curva-cancion.mjs` + `curva-a-ts.mjs`: no se edita a mano. El valor `i` es la media de potencia del segundo `CURVA_DESDE + i`.
 */
export const CURVA_DESDE = 110;
export const CURVA_LUFS: readonly number[] = [-10,-7.7,-10.2,-11.9,-16.5,-20.6,-24.9,-23.8,-16.4,-18.7,-22.4,-19.4,-20,-19.1,-23.1,-25.7,-29.5,-33.3,-36.8,-42.6,-44.4,-31.8,-31.8,-28.3,-26.6,-25.1,-23.2,-22.8,-24.3,-22.6,-24.8,-25.1,-21.8,-20.2,-20.2,-19.8,-18.3,-19.8,-20.3,-18.6,-18.5,-17.6,-17.7,-17.2,-17.2,-16.4,-15.8,-14.4,-15.5,-16.9,-15.6,-15.1,-14,-13.9,-14.6,-11.7,-10.5,-12.9,-12.7,-12.3,-12,-12.5,-11.3,-11.2,-12.4,-11.3,-11.1,-9.3,-10.4,-12.2,-10.3,-11.5,-10.3,-11.9,-11.2,-11.4,-10.3];

/** La sonoridad de la canción (LUFS) en el segundo `t` de la pista, por interpolación lineal entre los centros de cada segundo. */
export const lufsDeLaCancion = (t: number): number => {
  const x = Math.min(CURVA_LUFS.length - 1, Math.max(0, t - CURVA_DESDE - 0.5));
  const i = Math.floor(x);
  const k = x - i;
  return CURVA_LUFS[i] * (1 - k) + CURVA_LUFS[Math.min(CURVA_LUFS.length - 1, i + 1)] * k;
};
