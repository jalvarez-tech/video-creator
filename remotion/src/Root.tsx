import "./index.css";
import { Composition } from "remotion";
import { Prueba } from "./Prueba";
import { TutorialYT } from "./motor/TutorialYT";
import { VerticalSocial } from "./motor/VerticalSocial";
import { FeedCuadrado } from "./motor/FeedCuadrado";
import { AvatarClip } from "./motor/AvatarClip";
import { AvatarVertical } from "./proyectos/001/AvatarVertical";
import { CamaraDemo } from "./proyectos/001/CamaraDemo";
import { Avatar002 } from "./proyectos/002/Avatar002";
import { Avatar003 } from "./proyectos/003/Avatar003";
import { GraficosDemo } from "./motor/demos/GraficosDemo";
import { PlanDemo } from "./motor/demos/PlanDemo";
import { NoticiaDemo } from "./motor/demos/NoticiaDemo";
import { noticiaDemo } from "./motor/demos/noticia-demo";
import { Noticia004 } from "./proyectos/004/Noticia004";
import { noticia004 } from "./proyectos/004/noticia-004";
import { Noticia005 } from "./proyectos/005/Noticia005";
import { Noticia006 } from "./proyectos/006/Noticia006";
import { noticia006 } from "./proyectos/006/noticia-006";
import { noticia005 } from "./proyectos/005/noticia-005";
import { duracionPlan } from "./motor/noticias";
import { framesDelMedio, framesDePlanYVoz } from "./motor/duracion";
import { Catalogo, CATALOGO, PASO } from "./motor/graficos";
import { tutorialYT, verticalSocial, feedCuadrado } from "./motor/presets";

/**
 * EL REGISTRO DE COMPOSICIONES — y el único sitio donde motor y proyectos se
 * tocan.
 *
 *   src/motor/          lo reutilizable: contratos, intérpretes, biblioteca de
 *                       gráficos, formato noticias, sonido, plantillas y demos.
 *   src/proyectos/00N/  un vídeo concreto: sus planes como datos y su JSX propio.
 *
 * La dependencia va en UNA dirección (proyecto → motor) y lo vigila el linter
 * (eslint.config.mjs), no la buena voluntad. Para arrancar el 005 se crea
 * `src/proyectos/005/` y se registra aquí abajo; no hay que tocar el motor.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/*
        Composición de PRUEBA del motor.
        NO borrar: es el test de arranque.
      */}
      <Composition
        id="Prueba"
        component={Prueba}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ── PLANTILLAS del motor (src/motor/) ── las de verdad: no traen datos
          de ningún vídeo. Dimensiones y fps salen del preset de cada una.
          La duración real la fija cada proyecto; 150 = 5 s de demo. */}
      <Composition
        id="TutorialYT"
        component={TutorialYT}
        durationInFrames={150}
        fps={tutorialYT.formato.fps}
        width={tutorialYT.formato.width}
        height={tutorialYT.formato.height}
      />
      <Composition
        id="VerticalSocial"
        component={VerticalSocial}
        durationInFrames={150}
        fps={verticalSocial.formato.fps}
        width={verticalSocial.formato.width}
        height={verticalSocial.formato.height}
      />
      <Composition
        id="FeedCuadrado"
        component={FeedCuadrado}
        durationInFrames={150}
        fps={feedCuadrado.formato.fps}
        width={feedCuadrado.formato.width}
        height={feedCuadrado.formato.height}
      />

      {/* ── Avatar HeyGen sobre plantilla ──
          Composita remotion/public/avatar.mp4 (tu clip) + título + subtítulo.
          La duración la LEE del propio clip (calculateMetadata + framesDelMedio):
          cambia el MP4 y la comp se ajusta sola. El número escrito es solo el
          respaldo para un clon sin material. */}
      <Composition
        id="Avatar16x9"
        component={AvatarClip}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        calculateMetadata={async () => ({
          durationInFrames: await framesDelMedio("avatar.mp4", 30, 90),
        })}
      />
      {/* ── PROYECTO 001 ── (src/proyectos/001/)
          OJO: `Avatar9x16` y `CamaraDemo` NO son plantillas reutilizables, por
          mucho que el nombre lo sugiera: hardcodean subtitulos-001, cues-001 y
          camara-001. Son el proyecto 001 con dos montajes distintos. Para un
          vídeo nuevo, copia la ESTRUCTURA, no el archivo.
          Clip: 1080x1920 · 25 fps · 43.64 s (1091 frames). */}
      <Composition
        id="Avatar9x16"
        component={AvatarVertical}
        durationInFrames={1091}
        fps={25}
        width={1080}
        height={1920}
        calculateMetadata={async () => ({
          durationInFrames: await framesDelMedio("avatar-9x16.mp4", 25, 1091),
        })}
      />
      {/* Mismo clip del 001 dentro de <CamaraVirtual> con su plan de cámara:
          sirve de demo del skill camara-avatar. Manual: manuales/camara-avatar/SKILL.md. */}
      <Composition
        id="CamaraDemo"
        component={CamaraDemo}
        durationInFrames={1091}
        fps={25}
        width={1080}
        height={1920}
        calculateMetadata={async () => ({
          durationInFrames: await framesDelMedio("avatar-9x16.mp4", 25, 1091),
        })}
      />
      {/* ── PROYECTO 002 ── (src/proyectos/002/)
           avatar_1.mp4 + motion graphics estilo Apple + cámara + sonido.
          Ensamblado por director-video. Clip: 1080×1920 · 25 fps · 883 frames. */}
      <Composition
        id="Avatar002"
        component={Avatar002}
        durationInFrames={883}
        fps={25}
        width={1080}
        height={1920}
        calculateMetadata={async () => ({
          durationInFrames: await framesDelMedio("avatar-002.mp4", 25, 883),
        })}
      />
      {/* ── PROYECTO 003 ── (src/proyectos/003/)
           avatar_2.mp4 + mundo líquido ámbar (STYLE GUIDE del cliente).
          Reglas del sistema: el fps ORIGINAL del clip manda (R01 · avatar 9:16 =
          25 fps) y la comp dura lo que dura el clip (director §5).
          Clip: 1080×1920 · 25 fps · 1153 f (46.12 s). */}
      <Composition
        id="Avatar003"
        component={Avatar003}
        durationInFrames={1153}
        fps={25}
        width={1080}
        height={1920}
        calculateMetadata={async () => ({
          durationInFrames: await framesDelMedio("avatar-003.mp4", 25, 1153),
        })}
      />

      {/* ── Biblioteca de gráficos (motor/graficos/) ──
          Catalogo — el escaparate VIVO: una ficha cada PASO frames, animándose de
          verdad y con la RUTA que se escribe en el plan. Se navega arrastrando la
          cabeza lectora. Antes de escribir un gráfico nuevo, míralo aquí.
          El catálogo se DERIVA (registro PIEZAS + moldes + tipos del núcleo), así
          que su duración cambia sola al añadir una pieza.
          Doc equivalente fuera del Studio: manuales/motion-graphics/catalogo-graficos.md
          (`node manuales/motion-graphics/scripts/generar-catalogo.mjs`, y
           `revisar-catalogo.mjs` como test de que no miente). */}
      <Composition
        id="Catalogo"
        component={Catalogo}
        durationInFrames={CATALOGO.length * PASO}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* GraficosDemo — la coreografía COMO DATOS: el plan graficos-demo.ts
          montado por <PistaGraficos>, sin JSX por gráfico. Plantilla a copiar
          para el plan `graficos-004.ts` de un proyecto real.
          Enseña el repertorio corto de overlay sobre avatar: gancho en la
          franja alta, cifra con remate, lista y CTA con piel de sello. */}
      <Composition
        id="GraficosDemo"
        component={GraficosDemo}
        durationInFrames={300}
        fps={25}
        width={1080}
        height={1920}
      />
      {/* PlanDemo — el MISMO intérprete y el mismo dialecto que GraficosDemo,
          con el plan de referencia largo: recorre los cuatro moldes, los tres
          ejes de grupo, una piel, dos envolturas y `tras()`. GraficosDemo es el
          repertorio corto; éste es el que se abre para ver qué sabe hacer la
          gramática entera antes de escribir un `graficos-00N.ts`. */}
      <Composition
        id="PlanDemo"
        component={PlanDemo}
        durationInFrames={300}
        fps={25}
        width={1080}
        height={1920}
      />

      {/* ── Formato NOTICIAS (plantillas/noticias/) ──
          El look editorial claro: papel beige + acento naranja, serif en
          titulares y sans en subtítulos, sin avatar (voz en off + gráficos).
          El plan es DATOS (noticia-demo.ts → TomaNoticia[]) y lo monta
          <PistaNoticia>, igual que graficos-NNN.ts → <PistaGraficos>.
          La duración sale del propio plan: en un proyecto real la fija la voz.
          Manual: manuales/video-noticias/SKILL.md */}
      <Composition
        id="NoticiaDemo"
        component={NoticiaDemo}
        durationInFrames={duracionPlan(noticiaDemo)}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* ── PROYECTO 004 ── (src/proyectos/004/)
           «¿Por qué la gente se quiere ir al Valle de San Nicolás?»
          El Colombiano · 2026-07-25. 17 tomas, todas gráficas (sin b-roll).
          Frames MEDIDOS con generar-vo.sh sobre la voz GUÍA (say · Paulina), no
          estimados. La duración sale del plan y, si la voz es más larga, de la
          voz — lo resuelve el `calculateMetadata` de justo aquí abajo, con
          `framesDePlanYVoz` (plantillas/duracion.ts). Al relocutar con la voz
          definitiva, vuelve a correr generar-vo.sh y pega la tabla.
          Artefacto: proyectos/004/artefactos/01-noticia.md */}
      <Composition
        id="Noticia004"
        component={Noticia004}
        durationInFrames={duracionPlan(noticia004)}
        fps={30}
        width={1080}
        height={1920}
        calculateMetadata={async () => ({
          durationInFrames: await framesDePlanYVoz("noticias/004-vo.wav", 30, duracionPlan(noticia004)),
        })}
      />

      {/* ── PROYECTO 005 ── (src/proyectos/005/)
          «Firmaste la escritura. Todavía no eres el dueño.»
          Disparador: Ciencuadras · 2026-07-14. 16 tomas, todas gráficas.
          Frames MEDIDOS sobre la voz DEFINITIVA (voz clonada del canal), no una
          guía: la duración sale del plan y del audio, lo mayor de los dos.
          Sello: PROPIEDADES LUXUR. Artefacto: proyectos/005/artefactos/01-noticia.md */}
      <Composition
        id="Noticia005"
        component={Noticia005}
        durationInFrames={duracionPlan(noticia005)}
        fps={30}
        width={1080}
        height={1920}
        calculateMetadata={async () => ({
          durationInFrames: await framesDePlanYVoz("noticias/005-vo.wav", 30, duracionPlan(noticia005)),
        })}
      />

      {/* Noticia006 — la PRIMERA pieza escrita nativamente en la gramática nueva:
          un `Plan` del núcleo montado por <PistaGraficos>, sin pasar por
          `compilaNoticia`. El 004 y el 005 siguen entrando por `TomaNoticia[]`.

          YA TIENE `calculateMetadata`, y eso es lo que cambió: hasta ahora la
          duración salía del plan y era una estimación declarada. Hay locución
          (voz clonada del canal, 94,93 s = 2848 f), las 24 ventanas están
          recronometradas sobre ella y la comp dura lo MAYOR de plan y voz — el
          clip manda (aprendizaje del 002). Los 2850 f del plan cubren los 2848
          del WAV con dos frames de cola. */}
      <Composition
        id="Noticia006"
        component={Noticia006}
        durationInFrames={noticia006.formato.duracion}
        fps={noticia006.formato.fps}
        width={noticia006.formato.ancho}
        height={noticia006.formato.alto}
        calculateMetadata={async () => ({
          durationInFrames: await framesDePlanYVoz(
            "noticias/006-vo.wav",
            noticia006.formato.fps,
            noticia006.formato.duracion
          ),
        })}
      />
    </>
  );
};
