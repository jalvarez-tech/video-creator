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
import { LUXUR } from "./marcas/luxur";
import { NoticiaDemo } from "./motor/demos/NoticiaDemo";
import { noticiaDemo } from "./motor/demos/noticia-demo";
import { Noticia004 } from "./proyectos/004/Noticia004";
import { noticia004 } from "./proyectos/004/noticia-004";
import { Noticia005 } from "./proyectos/005/Noticia005";
import { Noticia006 } from "./proyectos/006/Noticia006";
import { noticia006 } from "./proyectos/006/noticia-006";
import { Noticia007 } from "./proyectos/007/Noticia007";
import { noticia007 } from "./proyectos/007/noticia-007";
import { Noticia008 } from "./proyectos/008/Noticia008";
import { noticia008 } from "./proyectos/008/noticia-008";
import { Avatar008 } from "./proyectos/008/Avatar008";
import { Gracias008 } from "./proyectos/008/Gracias008";
import { Reel009 } from "./proyectos/009/Reel009";
import { DURACION_009 } from "./proyectos/009/metraje-009";
import { Documental010 } from "./proyectos/010/Documental010";
import { DURACION_010 } from "./proyectos/010/metraje-010";
import { Boda011 } from "./proyectos/011/Boda011";
import { DURACION_011 } from "./proyectos/011/metraje-011";
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
        defaultProps={{ marca: LUXUR }}
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

      {/* ⚠️ BLOQUE RECONSTRUIDO (2026-08-13). El registro original se perdió al
          revertir Root.tsx con `git checkout` durante el paso 10; era trabajo sin
          commitear. Los datos son los correctos —comprobados contra
          `noticia-007.ts` y contra la duración que registraba el Studio antes de
          perderse (2417 f · 80,57 s)— pero esta prosa NO es la original.

          Sello: PROPIEDADES LUXUR. Artefacto: proyectos/007/artefactos/01-noticia.md */}
      <Composition
        id="Noticia007"
        component={Noticia007}
        durationInFrames={noticia007.formato.duracion}
        fps={noticia007.formato.fps}
        width={noticia007.formato.ancho}
        height={noticia007.formato.alto}
      />

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

      {/* ── PROYECTO 009 · REEL DE COMIDA ── (src/proyectos/009/Reel009.tsx)
          «Te reto a ver esto sin antojarte»: reel viral para STREET CATS
          (@streetcats.food, Caldas · Antioquia), el negocio que en el 008 salía
          como punto de recolección. Marca nueva: src/marcas/streetcats.ts.

          Es la PRIMERA pieza del repo sin avatar Y sin voz: no hay clip que
          mande el fps ni transcripción que dé las ventanas. Manda el MONTAJE
          (`metraje-009.ts`, 11 cortes sobre 5 planos de b-roll), y de ahí sale
          también la duración — por eso `DURACION_009` se calcula del plan en vez
          de escribirse a mano aquí: alargar un corte reajusta la composición
          sola, sin `calculateMetadata` ni medir ningún medio.
          Artefactos: proyectos/009/artefactos/0{1,2,3}-*.md */}
      <Composition
        id="Reel009"
        component={Reel009}
        durationInFrames={DURACION_009}
        fps={30}
        width={1080}
        height={1920}
      />

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
      {/* ── PROYECTO 011 · BODA ── (src/proyectos/011/)
          Montaje de 2 minutos con TODO el material de la carpeta Boda (27
          vídeos de iPhone en HDR + 1 de mensajería + 1 foto): el primer minuto,
          la boda con «Turning Page»; el segundo, la rumba con «El Preso». Sin
          voz, sin texto y sin marca. El metraje se repone con
          `bash proyectos/011/normalizar.sh` y se comprueba con
          `node proyectos/011/revisar-011.mjs`.
          Artefactos: proyectos/011/artefactos/0{1,2,3}-*.md */}
      <Composition
        id="Boda011"
        component={Boda011}
        durationInFrames={DURACION_011}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
