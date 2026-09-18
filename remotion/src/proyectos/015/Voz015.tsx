/**
 * LA VOZ DEL 015 — la capa de audio que `<PistaMetraje>` no tiene.
 *
 * El intérprete del montaje pinta el vídeo SIEMPRE mudo (R19) y deja dicho que
 * «si una pieza necesita el sonido de un clip, va en su propia capa de audio y
 * con su volumen». Ésta es esa capa: un `<Audio>` por corte, leído del WAV de
 * su toma (`normalizar.sh`) con EL MISMO `trimBefore` que su imagen, así que
 * boca y voz caen en la misma muestra.
 *
 * EL CRUCE ENTRE TOMAS, y por qué no es la disolvencia entera. La imagen funde
 * en 12 f; la voz, en los ÚLTIMOS `CRUCE` = 6 de esos 12 y en potencia
 * constante (seno/coseno). Las dos cosas están medidas contra el plan: la
 * última palabra de una toma termina 14 f antes del `en` de la siguiente y la
 * primera palabra de ésta empieza en `en + 1` (`metraje-015.ts`), así que en
 * los 6 frames del cruce no suena ninguna palabra, solo el aire de dos sitios
 * distintos (el vestíbulo, el jardín) pasándose el relevo. Fundir los 12
 * enteros empezaría 2 f después de la última palabra y se comería la cola de
 * las «s» finales, que el detector de voz corta antes de tiempo (se ve en el
 * espectrograma de c04, «soluciones»: ~0,15 s de fricativa fuera del umbral).
 *
 * `volume` puede pasar de 1: es la ganancia por toma de `gananciaVoz` (la
 * segunda toma sube 4,8 dB). Remotion 4 solo rechaza volúmenes negativos y la
 * aplica al renderizar; la prueba 720p lo mide por tramo (03-timeline.md).
 */
import React from "react";
import { Audio, interpolate, Sequence, staticFile, useVideoConfig } from "remotion";
import { solapeDe } from "../../motor/metraje";
import { CRUCE_VOZ as CRUCE, gananciaVoz, type Corte } from "./metraje-015";

/** Frames del fundido de salida de la voz al final de la pieza (el aire tras «hablamos»). */
const FUNDIDO_FINAL = 12;
/** Frames de entrada de la primera toma: solo para que el f0 no haga clic. */
const DESCLIC = 3;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Voz015: React.FC<{ cortes: readonly Corte[] }> = ({ cortes }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {cortes.map((c, i) => {
        const siguiente = cortes[i + 1];
        const cruzaAlEntrar = solapeDe(c) > 0;
        const cruzaAlSalir = siguiente !== undefined && solapeDe(siguiente) > 0;
        const antes = cruzaAlEntrar ? CRUCE : 0;
        const dur = c.dur + antes;
        const g = gananciaVoz(c);
        // f = 0 en el primer frame en que suena ESTE corte.
        const volumen = (f: number): number => {
          const entra = cruzaAlEntrar
            ? Math.sin((Math.PI / 2) * interpolate(f, [0, CRUCE], [0, 1], CLAMP))
            : interpolate(f, [0, DESCLIC], [0, 1], CLAMP);
          const sale = cruzaAlSalir
            ? Math.cos((Math.PI / 2) * interpolate(f, [dur - CRUCE, dur], [0, 1], CLAMP))
            : interpolate(f, [dur - FUNDIDO_FINAL, dur], [1, 0], CLAMP);
          return g * entra * sale;
        };
        return (
          <Sequence key={c.id} from={c.en - antes} durationInFrames={dur} name={`voz ${c.id}`} layout="none">
            <Audio
              src={staticFile(c.audio)}
              // El mismo arranque que la imagen (`desde` en segundos → frames), menos
              // los frames del cruce: la voz del entrante empieza a sonar ahí.
              trimBefore={Math.round((c.desde ?? 0) * fps) - antes}
              volume={volumen}
            />
          </Sequence>
        );
      })}
    </>
  );
};
