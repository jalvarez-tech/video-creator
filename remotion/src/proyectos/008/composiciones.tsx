import { Composition } from "remotion";
import { Noticia008 } from "./Noticia008";
import { noticia008 } from "./noticia-008";
import { Avatar008 } from "./Avatar008";
import { Gracias008 } from "./Gracias008";
import { framesDelMedio, framesDePlanYVoz } from "../../motor/duracion";

/**
 * REGISTRO del proyecto 008 (tres piezas). Lo descubre `src/estudio.tsx` por el
 * nombre de este archivo; `Root.tsx` no lo importa. Los bloques son los mismos
 * que registraba `Root.tsx` (id, fps, tamaño, duración y respaldo): moverlos
 * aquí no cambia ningún píxel.
 */
export const Composiciones: React.FC = () => (
  <>
    {/* ── PROYECTO 008 ── (src/proyectos/008/)
        «La tragedia no termina cuando deja de ser noticia.»
        Campaña de ayuda por el terremoto en Chocó (Quibdó) — Juan Papita.
        Sin avatar: VOZ PROPIA del cliente (v4: 78,21 s = 2346 f, cortada
        por palabra con Whisper y montada con generar-vo.sh --motor propio)
        + 25 tomas papel/cine, textos con barrido disruptivo y atmósferas
        de lluvia/viento por sección. La comp dura lo mayor de plan y voz.
        Marca: AYUDEMOS A CHOCÓ (marcas/choco.ts).
        Artefactos: proyectos/008/artefactos/01-plan.md · 03-timeline.md */}
    <Composition
      id="Noticia008"
      component={Noticia008}
      durationInFrames={noticia008.formato.duracion}
      fps={noticia008.formato.fps}
      width={noticia008.formato.ancho}
      height={noticia008.formato.alto}
      calculateMetadata={async () => ({
        durationInFrames: await framesDePlanYVoz(
          "noticias/008-vo.wav",
          noticia008.formato.fps,
          noticia008.formato.duracion
        ),
      })}
    />

    {/* ── PROYECTO 008 · pieza AVATAR ── (src/proyectos/008/Avatar008.tsx)
        «Ya hay 3 puntos»: clip REAL del cliente anunciando los puntos de
        recolección, con las direcciones en tarjetas de banda inferior +
        cámara + SFX. Marca AYUDEMOS A CHOCÓ (watermark propio en franja alta).
        Clip: avatar-008.mp4 · 1080×1920 · 30 fps (fuente real de iPhone, R01:
        el fps original manda — el 25 de §3a es para clips HeyGen) · 1314 f.
        Artefactos: proyectos/008/artefactos/0{1,2,3}-*-avatar.md */}
    <Composition
      id="Avatar008"
      component={Avatar008}
      durationInFrames={1314}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDelMedio("avatar-008.mp4", 30, 1314),
      })}
    />

    {/* ── PROYECTO 008 · pieza GRACIAS ── (src/proyectos/008/Gracias008.tsx)
        «8 toneladas de puro amor»: el cliente agradece el apoyo recibido y da
        parte del avance de la campaña. Es la pieza donde el color deja de ser
        un acento y pasa a repartir autoría — VERDE lo que logró la gente,
        ÁMBAR lo que falta por hacer, BLANCO su voz y SIN COLOR quien recibe
        (graficos-008-gracias.ts §simbología). El plan de sonido dice lo mismo:
        tres `impact deep`, los tres sobre verde.
        Clip: avatar-008-gracias.mp4 · 1080×1920 · 30 fps (fuente real de
        iPhone, R01: el fps original manda) · 1410 f.
        Artefactos: proyectos/008/artefactos/0{1,2,3}-*-gracias.md */}
    <Composition
      id="Gracias008"
      component={Gracias008}
      durationInFrames={1410}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={async () => ({
        durationInFrames: await framesDelMedio("avatar-008-gracias.mp4", 30, 1410),
      })}
    />
  </>
);
