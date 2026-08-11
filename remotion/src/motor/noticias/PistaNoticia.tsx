import { useMemo } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { PistaGraficos } from "../graficos/PistaGraficos";
import { compilaNoticia } from "./dialecto";
import type { TomaEditorial } from "./dialecto";
import { FONDOS_NOTICIA, MONTADORES_NOTICIA, SelloNoticia } from "./montadores";
import type { TomaNoticia } from "./plan";
import { N } from "./theme-noticias";

/**
 * EL INTÉRPRETE del plan de noticia — y ya no es un intérprete, es un
 * ENVOLTORIO. Guía: manuales/video-noticias/SKILL.md
 *
 *   <PistaNoticia tomas={noticia005} />   ← la API no cambia: 004 y 005 igual
 *
 * Este archivo eran 215 líneas: un `switch` de nueve casos que maquetaba a mano
 * cada tipo de toma, con sus `<Entra at={…}>` repartidos y su propio validador.
 * Hacía, peor, lo mismo que <PistaGraficos>: montar un plan declarativo. La
 * duplicación no era teórica — el sistema tenía DOS gramáticas para "una escena
 * con tres elementos coreografiados", y la que se usaba en producción era la que
 * no podía crecer.
 *
 * Ahora hay una sola:
 *   `compilaNoticia`  (dialecto.ts)     traduce el DSL de autor al sustrato
 *   MONTADORES_NOTICIA (montadores.tsx) dice cómo se dibuja cada pieza
 *   <PistaGraficos>   (graficos/)       monta el plan, sea de la capa que sea
 *
 * Lo que se gana y no se ve aquí: el validador del núcleo (tiempos RESUELTOS,
 * altura del bloque contra el presupuesto del molde, coherencia dentro de cada
 * pieza) más las reglas del formato, que antes vivían en `revisaNoticia` y ahora
 * son `dialecto.reglas`. Lo llama <PistaGraficos>, con `plan.capa` = "noticia".
 *
 * Lo que este envoltorio SIGUE sin hacer, a propósito:
 *   · no pone sonido        → cues-NNN.ts + <PistaSonido> (diseno-sonoro)
 *   · no pone subtítulos    → subtitulos-NNN.ts + <SubtitulosSync>
 *   · no genera el b-roll   → grok.py (director §3h)
 * Se montan como hermanos suyos en la composición, en ese orden de z.
 */
export const PistaNoticia: React.FC<{ tomas: TomaNoticia[] }> = ({ tomas }) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  // La compilación es pura y el plan no cambia entre frames: sin `useMemo` se
  // reconstruiría el árbol entero en cada uno de los 2.205 frames y, peor, la
  // identidad de los nodos cambiaría en cada render — y `resuelveMomentos`
  // indexa los momentos POR IDENTIDAD de objeto.
  const plan = useMemo(
    () => compilaNoticia(tomas, { ancho: width, alto: height, fps, duracion: durationInFrames }),
    [tomas, width, height, fps, durationInFrames]
  );

  return (
    <AbsoluteFill>
      <PistaGraficos
        plan={plan}
        montadores={MONTADORES_NOTICIA}
        // Los dos registros del formato: el fondo viene con el molde y el plan
        // no puede elegirlo aparte (una toma de papel con fondo de cine es lo
        // que la gramática del formato prohíbe).
        fondos={FONDOS_NOTICIA}
        // El scrim del `escenario` es NEGRO puro, no el casi-negro azulado de la
        // capa de gráficos: sobre `FondoCine` (#000) cualquier tinte se ve.
        scrimColor={N.negro}
        // El watermark va en TODOS los frames y fuera del punch-in. Que sea una
        // capa del formato y no una pieza del plan es deliberado: un plan que
        // pudiera olvidarlo es un plan que lo olvidará.
        encima={(t: TomaEditorial) => <SelloNoticia molde={t.molde} />}
      />
    </AbsoluteFill>
  );
};
