/**
 * EL INTÉRPRETE DEL AUDIO POR TRAMOS — `TramoAudio[]` → un `<Audio>` por tramo.
 *
 *   <PistaAudio tramos={[...vocesDeCortes(metrajeNNN, { fps: 30 }), ...musicaNNN]} />
 *
 * POR QUÉ EXISTE. `<PistaMetraje>` monta el vídeo SIEMPRE mudo y `<PistaSonido>`
 * solo reproduce efectos de `public/sfx/` anclados a un golpe. La voz de una
 * toma, una locución y una música no cabían en ninguna de las dos, y la única
 * capa de voz por corte que había era de UN proyecto: otra pieza no puede
 * importarla (un proyecto no importa de otro; lo que comparten dos vídeos es
 * del motor). Ésta es esa capa, ya sin nada de aquella pieza dentro: qué suena,
 * cuándo y a qué nivel lo dicen los datos (`tramos.ts`), y aquí solo se monta.
 *
 * Hermana de `<PistaSonido>` y deliberadamente más tonta: no sabe de familias
 * de mezcla, de ducking ni de anclar un pico a un frame. Un tramo empieza en su
 * `en`, dura su `dur` y lleva el volumen que dice `volumenDe`. Si la música
 * tiene que bajar bajo la voz, eso es una envolvente en sus datos
 * (`envolventeBajoVoz`), no una decisión de este componente.
 *
 * DÓNDE VA. El audio no tiene z-order, pero se monta AL FINAL de la composición,
 * después de todo lo que se ve y junto a `<PistaSonido>`: así la lista de capas
 * se lee de atrás a delante y el sonido siempre está en el mismo sitio. Y en la
 * RAÍZ, no dentro de otro `<Sequence>`: los `en` y los puntos de una envolvente
 * son frames absolutos de la composición, y dentro de una secuencia pasarían a
 * contarse desde ella.
 *
 * Determinista: el volumen es una función pura del frame que Remotion le pasa,
 * sin estado ni tiempo real. Va con `volume` como función —y no un número leído
 * de `useCurrentFrame()`— porque es la forma que Remotion pide para un nivel que
 * cambia: el frame que recibe se cuenta desde que la fuente empieza a sonar, y
 * el Studio dibuja la curva en la línea de tiempo.
 */
import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { volumenDe, type TramoAudio } from "./tramos";

export const PistaAudio: React.FC<{ tramos: readonly TramoAudio[] }> = ({ tramos }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {tramos.map((t) => {
        // Remotion cuenta el frame del volumen desde que la fuente EMPIEZA A
        // SONAR. En un tramo que nace antes del frame 0 eso es el frame 0 de la
        // comp, no el primero del tramo: se le suma lo que quedó fuera para que
        // `volumenDe` siga recibiendo su frame local. (La puerta avisa de esos
        // tramos igualmente: su fundido de entrada no llega a sonar.)
        const fuera = Math.max(0, -t.en);
        // …salvo en un BUCLE. Dentro de una secuencia con `from` negativo Remotion
        // solo descuenta lo de antes del frame 0 en la PRIMERA vuelta; desde la
        // segunda el frame ya llega local, y sumarle `fuera` adelantaba la
        // envolvente y el fundido de salida esos mismos frames (medido: con
        // `en` = −40, una envolvente que calla en el f60 callaba en el f20). No
        // hay forma de saber aquí en qué vuelta se está —la duración de la fuente
        // la lee Remotion al cargarla—, así que ese tramo se monta recortado al
        // frame 0: sin `from` negativo el frame es el mismo en todas las vueltas.
        // Lo que se pierde es la fase: la primera vuelta arranca en el frame 0
        // por el principio de la fuente y no `fuera` frames dentro, que en algo
        // que se repite no es un sitio. La puerta lo dice.
        const recortado = t.bucle === true && fuera > 0;
        const dur = recortado ? t.dur - fuera : t.dur;
        // Un bucle que acaba antes del frame 0 no suena, y una secuencia de 0 frames no se puede montar.
        if (recortado && dur <= 0) return null;
        return (
          <Sequence key={t.id} from={recortado ? 0 : t.en} durationInFrames={dur} name={`audio:${t.id}`} layout="none">
            <Audio
              src={staticFile(t.src)}
              // `desde` en segundos → frames de la comp, con el mismo redondeo que
              // `<PistaMetraje>` aplica a la imagen: un tramo y un plano con el
              // mismo `desde` arrancan en la misma muestra.
              trimBefore={Math.round((t.desde ?? 0) * fps)}
              volume={(f) => volumenDe(t, f + fuera)}
              loop={t.bucle}
              // En un bucle Remotion reinicia por defecto el frame del volumen en
              // cada vuelta, y los fundidos y la envolvente se repetirían con la
              // fuente. `extend` lo deja correr sobre el tramo entero.
              loopVolumeCurveBehavior={t.bucle ? "extend" : "repeat"}
            />
          </Sequence>
        );
      })}
    </>
  );
};
