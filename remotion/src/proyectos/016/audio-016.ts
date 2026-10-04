/**
 * EL SONIDO DEL 016 — un solo tramo: la canción.
 *
 * No hay voz: la música ES la pieza, y por eso no baja en ningún momento. Lo
 * único que se decide es su NIVEL. «Contact» está masterizada muy fuerte (−8,2
 * LUFS en este tramo, con picos a +0,2 dBFS); las plataformas normalizan a
 * unos −14, y subida así la bajarían ellas con su propio limitador. Se deja en
 * −14 aquí, con una ganancia medida y nada más: sin compresor, sin loudnorm,
 * que le cambiaría la dinámica.
 *
 * Datos puros: la puerta lo carga con node.
 */
import { gananciaHasta } from "../../motor/sound/tramos";
import type { TramoAudio } from "../../motor/sound/tramos";
import { DURACION_016, INICIO_MUSICA } from "./metraje-016";

/** Sonoridad integrada de la canción entre el 52,55 y el 75,1 s (ebur128). */
const LUFS_TRAMO = -8.2;
/** El nivel de las plataformas. */
const OBJETIVO_LUFS = -14;

export const audio016: readonly TramoAudio[] = [
  {
    id: "musica",
    src: "rd-016/musica-016.wav",
    en: 0,
    dur: DURACION_016,
    desde: INICIO_MUSICA,
    ganancia: gananciaHasta(LUFS_TRAMO, OBJETIVO_LUFS),
    // 3 f para que el frame 0 no haga clic; 45 f (1,5 s) de salida, a la vez
    // que el último plano funde a negro.
    entra: 3,
    sale: 45,
    reason: "«Contact», de 16 golpes antes del drop al final de la frase siguiente: la subida para el titular y el drop para la acción.",
  },
];
