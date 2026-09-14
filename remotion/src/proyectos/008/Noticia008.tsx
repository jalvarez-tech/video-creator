import { useMemo } from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { avisaDelPlan } from "../../motor/avisos";
import { aplana, revisaMontaje } from "../../motor/plan/nucleo";
import { fondosNoticiaDe, MONTADORES_NOTICIA, SelloNoticia } from "../../motor/noticias/montadores";
import { CHOCO } from "../../marcas/choco";
import type { TomaEditorial } from "../../motor/noticias/dialecto";
import { cues008 } from "./cues-008";
import { noticia008 } from "./noticia-008";

/**
 * 008 · «La tragedia no termina cuando deja de ser noticia.» (v4)
 * Campaña de ayuda para las familias del terremoto en Chocó — Juan Papitas.
 * Plan, criterio editorial y versiones: proyectos/008/artefactos/.
 *
 * Capas (de atrás a delante):
 *   1. <PistaGraficos>   las 23 tomas (papel/cine) con su b-roll
 *   2. <Audio>           LA VOZ DEL CLIENTE (v4: su propia grabación,
 *                        Voz-en-off-choco.wav cortada por palabra y montada
 *                        con generar-vo.sh --motor propio · v5 ritmo
 *                        continuo, sin pausas: 73,85 s = 2215 f · v6 STREET CATS, Caldas)
 *   3. <AtmosferasChoco> camas de ambiente por sección (v4): lluvia en el
 *                        dolor, viento en la decisión, lluvia suave en el
 *                        cierre — SIEMPRE bajo la voz y bajo los SFX, y en
 *                        silencio absoluto durante el versículo
 *   4. <Audio> música    la cama (piano→cuerdas) con envolvente — pendiente
 *                        del permiso `music_generation` de la key
 *   5. <PistaSonido>     SFX (whips de barrido, pops, papers, sharp+2 deep),
 *                        ducking −5 dB
 *
 * SUBTÍTULOS: fuera a propósito (004–008): los titulares condensan la voz.
 */

/** MÚSICA — pendiente (401 missing_permissions `music_generation`, 2026-08-13).
 *  Cuando exista public/noticias/008-musica.mp3: HAY_MUSICA = true y ya. */
const HAY_MUSICA = false;

const dbAGain = (db: number): number => Math.pow(10, db / 20);

/** Envolvente de la cama musical (recalculada para la v4, 2346 f). */
const volumenMusica = (f: number): number => {
  const db = interpolate(
    f,
    //  piano solo   cuerdas     sostenido    swell (granito→)  foto    final muere
    [0, 270, 280, 816, 826, 1510, 1520, 1858, 2035, 2215],
    [-26, -26, -24, -24, -22, -22, -18, -14, -18, -44],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return dbAGain(db);
};

const MusicaCama: React.FC = () => {
  const frame = useCurrentFrame();
  return <Audio src={staticFile("noticias/008-musica.mp3")} volume={volumenMusica(frame)} />;
};

/**
 * ATMÓSFERAS POR SECCIÓN (v4) — «dependiendo de lo que digan».
 *
 * Tres camas en loop, bien por debajo de la voz y de los SFX (objetivo pico
 * ≈ −30/−36 dBFS, el rango `ambient` de la guía de mezcla):
 *
 *   LLUVIA (dolor)      [0 → 660]     la lluvia del Pacífico bajo el daño
 *                                     real, la playa brumosa y «sin poder
 *                                     volver a casa»; muere en la decisión.
 *   VIENTO (decisión)   [603 → 850]   aire abierto bajo «queremos llegar
 *                                     después» y el camión de 8 t.
 *   LLUVIA (cierre)     [1862 → 2095] vuelve suave con la frase final y la
 *                                     foto de los niños… y CALLA antes del
 *                                     versículo: sil10 es silencio absoluto.
 *
 * Volúmenes como envolventes por frame RELATIVO a cada <Sequence> (fades de
 * entrada/salida incluidos), deterministas.
 *
 * GANANCIAS CALIBRADAS AL ARCHIVO (medido con volumedetect, no a ojo): la
 * lluvia del banco pica en −11,4 dBFS y el viento en −6,6 — la ganancia de
 * cada cama compensa el pico REAL de su archivo para caer en el objetivo
 * ambient (pico ≈ −30/−34): lluvia −19 dB (→ ≈ −30), viento −25 (→ ≈ −32),
 * lluvia del cierre −23 (→ ≈ −34, más lejana).
 */
const AtmosferasChoco: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={650}>
        <Audio
          loop
          src={staticFile("noticias/008-atmos-lluvia.mp3")}
          volume={(f) =>
            interpolate(f, [0, 25, 580, 650], [0, dbAGain(-19), dbAGain(-19), 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
      <Sequence from={593} durationInFrames={257}>
        <Audio
          loop
          src={staticFile("sfx/ambient-wind.mp3")}
          volume={(f) =>
            interpolate(f, [0, 30, 220, 257], [0, dbAGain(-25), dbAGain(-25), 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
      <Sequence from={1862} durationInFrames={233}>
        <Audio
          loop
          src={staticFile("noticias/008-atmos-lluvia.mp3")}
          volume={(f) =>
            interpolate(f, [0, 40, 190, 233], [0, dbAGain(-23), dbAGain(-23), 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
    </>
  );
};

export const Noticia008: React.FC = () => {
  /** Validador cruzado plan ↔ cues (sin cámara: no hay avatar). */
  const avisos = useMemo(() => revisaMontaje([aplana(noticia008)], cues008, []), []);
  avisaDelPlan("montaje", avisos);

  return (
    <AbsoluteFill>
      <PistaGraficos
        plan={noticia008}
        montadores={MONTADORES_NOTICIA}
        fondos={fondosNoticiaDe(CHOCO)}
        scrimColor={CHOCO.color.negro}
        encima={(t: TomaEditorial) => <SelloNoticia molde={t.molde} marca={CHOCO} />}
      />
      <Audio src={staticFile("noticias/008-vo.wav")} />
      <AtmosferasChoco />
      {HAY_MUSICA ? <MusicaCama /> : null}
      <PistaSonido cues={cues008} duckDb={-5} />
    </AbsoluteFill>
  );
};
