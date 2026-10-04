import { Composition } from "remotion";
import { Documental010 } from "./Documental010";
import { DURACION_010 } from "./metraje-010";

/**
 * REGISTRO del proyecto 010. Lo descubre `src/estudio.tsx` por el nombre de
 * este archivo; `Root.tsx` no lo importa. El bloque es el mismo que registraba
 * `Root.tsx` (id, fps, tamaño y duración): moverlo aquí no cambia ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 010 · MINI DOCUMENTAL HUMANITARIO ── (src/proyectos/010/)
        «Gracias, Chocó»: el cierre del arco que abrió el 008. Allí se pedía
        ayuda; aquí se rinde cuentas de que llegó y se pide no olvidar.

        Es la primera pieza SIN avatar pero CON voz, y esa combinación cambia
        quién manda: no hay clip de avatar que fije el fps, pero sí una
        locución de 72,46 s que fija TODO lo demás — los ocho beats salen de
        la transcripción por palabra, no de una retícula redonda.

        Dos cosas que no tiene ninguna pieza anterior:
          · SUBTÍTULOS BILINGÜES a dos pisos (es 100 % / en 68 %), anclados por
            abajo para que el bloque no tiemble entre los 26 cues.
          · METRAJE 100 % REAL — ni banco ni IA. Con 105 s de vídeo propio y 8
            fotos para 74 s de pieza, traer stock habría sido fabricar prueba
            documental de algo que la pieza afirma que pasó (director §3h).

        `DURACION_010` sale del plan de montaje, igual que en el 009. Son 60 f
        MÁS que la voz: los ~2 s de rótulo limpio del cierre.
        Artefactos: proyectos/010/artefactos/0{1,2,3}-*.md */}
    <Composition
      id="Documental010"
      component={Documental010}
      durationInFrames={DURACION_010}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
