import "./index.css";
import { Composition } from "remotion";
import { Prueba } from "./Prueba";
import { TutorialYT } from "./plantillas/TutorialYT";
import { VerticalSocial } from "./plantillas/VerticalSocial";
import { FeedCuadrado } from "./plantillas/FeedCuadrado";
import { AvatarClip } from "./plantillas/AvatarClip";
import { AvatarVertical } from "./plantillas/AvatarVertical";
import { CamaraDemo } from "./plantillas/CamaraDemo";
import { Avatar002 } from "./plantillas/Avatar002";
import { Avatar003 } from "./plantillas/Avatar003";
import { GraficosDemo } from "./plantillas/GraficosDemo";
import { NoticiaDemo } from "./plantillas/NoticiaDemo";
import { noticiaDemo } from "./plantillas/noticia-demo";
import { Noticia004 } from "./plantillas/Noticia004";
import { noticia004 } from "./plantillas/noticia-004";
import { duracionPlan } from "./plantillas/noticias";
import { Catalogo, CATALOGO, PASO } from "./plantillas/graficos";
import { tutorialYT, verticalSocial, feedCuadrado } from "./plantillas/presets";

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

      {/* ── Plantillas (biblioteca reusable) ──
          Dimensiones y fps salen del preset de cada plantilla.
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
          durationInFrames debe = duración del clip * fps. El stand-in dura 3s→90.
          Para tu clip real: ffprobe da la duración y ajustamos aquí. */}
      <Composition
        id="Avatar16x9"
        component={AvatarClip}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Avatar HeyGen 9:16 → public/avatar-9x16.mp4
          Clip real: 1080x1920 · 25 fps · 43.64s (1091 frames). */}
      <Composition
        id="Avatar9x16"
        component={AvatarVertical}
        durationInFrames={1091}
        fps={25}
        width={1080}
        height={1920}
      />
      {/* Demo del skill camara-avatar: mismo clip 9:16 dentro de <CamaraVirtual>
          con el plan camara-001.ts. Manual: manuales/camara-avatar/SKILL.md. */}
      <Composition
        id="CamaraDemo"
        component={CamaraDemo}
        durationInFrames={1091}
        fps={25}
        width={1080}
        height={1920}
      />
      {/* Proyecto 002 — avatar_1.mp4 + motion graphics estilo Apple + cámara + sonido.
          Ensamblado por director-video. Clip: 1080×1920 · 25 fps · 883 frames. */}
      <Composition
        id="Avatar002"
        component={Avatar002}
        durationInFrames={883}
        fps={25}
        width={1080}
        height={1920}
      />
      {/* Proyecto 003 — avatar_2.mp4 + mundo líquido ámbar (STYLE GUIDE del cliente).
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
      />

      {/* ── Biblioteca de gráficos (plantillas/graficos/) ──
          Catalogo — el escaparate VIVO: una ficha cada PASO frames, con el
          gráfico animándose de verdad. Se navega arrastrando la cabeza lectora.
          Antes de escribir un gráfico nuevo, míralo aquí: probablemente ya está.
          Doc equivalente fuera del Studio: manuales/motion-graphics/catalogo-graficos.md
          (se regenera con `node manuales/motion-graphics/generar-catalogo.mjs`). */}
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
          para el plan `graficos-004.ts` de un proyecto real. */}
      <Composition
        id="GraficosDemo"
        component={GraficosDemo}
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
      {/* Proyecto 004 — «¿Por qué la gente se quiere ir al Valle de San Nicolás?»
          El Colombiano · 2026-07-25. 16 tomas, todas gráficas (sin b-roll).
          Duración PROVISIONAL: sale del guion estimado, no de la voz en off.
          Cuando exista el audio, `ffprobe` manda y se re-cronometra el plan.
          Artefacto: proyectos/004/artefactos/01-noticia.md */}
      <Composition
        id="Noticia004"
        component={Noticia004}
        durationInFrames={duracionPlan(noticia004)}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
