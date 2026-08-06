import { AbsoluteFill, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE, SPRING } from "../motion";
import { ChipIcono, CifraContada, Cronologia, FondoCine, FondoPapel, GLIFO, Medidor, RecortePrensa, Sello, TarjetaFoto, formateaN } from "./Editorial";
import { LAYOUT, N, T } from "./theme-noticias";
import { REGISTRO_POR_TIPO, type TomaNoticia } from "./plan";

/**
 * EL INTÉRPRETE del plan de noticia — hermano de <PistaGraficos> y <PistaSonido>.
 * Guía: manuales/video-noticias/SKILL.md
 *
 * Recibe `TomaNoticia[]` y monta la pieza entera: cada toma en su <Sequence>
 * (frames LOCALES para sus hijos), con su fondo, su contenido y el watermark
 * encima. El plan decide QUÉ y CUÁNDO; este archivo decide CÓMO se dibuja, y esa
 * separación es lo que permite recronometrar la pieza sin volver a maquetarla.
 *
 * Lo que este intérprete NO hace, a propósito:
 *   · no pone sonido        → cues-NNN.ts + <PistaSonido> (diseno-sonoro)
 *   · no pone subtítulos    → subtitulos-NNN.ts + <SubtitulosSync>
 *   · no genera el b-roll   → grok.py (director §3h)
 * Se montan como hermanos suyos en la composición, en ese orden de z.
 */

/** Contenedor centrado con los márgenes seguros del formato. */
const Centro: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 34 }) => (
  <AbsoluteFill
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      paddingLeft: LAYOUT.margen,
      paddingRight: LAYOUT.margen,
      gap,
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Entrada estándar de una toma de papel: sube y asienta, sin rebote. */
const Entra: React.FC<{ children: React.ReactNode; at?: number; y?: number }> = ({ children, at = 0, y = 46 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - at;
  const e = spring({ frame: f, fps, config: SPRING.contador });
  const op = interpolate(f, [0, 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ opacity: op, transform: `translateY(${interpolate(e, [0, 1], [y, 0])}px)` }}>{children}</div>
  );
};

/** Media de la toma: vídeo, imagen, o el marco vacío mientras no exista. */
const Media: React.FC<{ src?: string; esVideo?: boolean }> = ({ src, esVideo }) => {
  if (!src) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#DBD5C9",
          fontFamily: T.kicker.fontFamily,
          fontSize: 26,
          letterSpacing: 3,
          color: N.tintaSuave,
          textTransform: "uppercase",
        }}
      >
        pendiente
      </div>
    );
  }
  const estilo: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
  return esVideo ? <OffthreadVideo src={staticFile(src)} style={estilo} /> : <Img src={staticFile(src)} style={estilo} />;
};

/** El contenido de UNA toma, ya en frames locales. */
const Toma: React.FC<{ t: TomaNoticia; len: number }> = ({ t, len }) => {
  const frame = useCurrentFrame();
  const registro = t.registro ?? REGISTRO_POR_TIPO[t.tipo];
  const color = t.color ?? N.naranja;

  const cuerpo = (() => {
    switch (t.tipo) {
      // El mensaje en serif. La toma más frecuente del formato.
      case "titular":
        return (
          <Centro>
            {t.kicker ? (
              <Entra y={22}>
                <span style={{ ...T.kicker }}>{t.kicker}</span>
              </Entra>
            ) : null}
            <Entra at={t.kicker ? 4 : 0}>
              <span style={{ ...T.titular, color: registro === "cine" ? N.blanco : N.tinta }}>{t.titular}</span>
            </Entra>
            {t.etiqueta ? (
              <Entra at={10} y={26}>
                <span style={{ ...T.etiqueta, color: registro === "cine" ? "rgba(255,255,255,0.75)" : N.tintaSuave }}>
                  {t.etiqueta}
                </span>
              </Entra>
            ) : null}
          </Centro>
        );

      // La prueba periodística: recorte + rotulador amarillo.
      case "prensa":
        return (
          <Centro gap={40}>
            <RecortePrensa titular={t.titular ?? ""} fuente={t.kicker} resaltar={t.resaltar} at={2} />
            {t.etiqueta ? (
              <Entra at={26} y={22}>
                <span style={{ ...T.etiqueta }}>{t.etiqueta}</span>
              </Entra>
            ) : null}
          </Centro>
        );

      // A vs B. Los chips entran con stagger: se comparan en el orden del array.
      case "comparador":
        return (
          <Centro gap={56}>
            {t.titular ? (
              <Entra y={24}>
                <span style={{ ...T.titular, fontSize: 68 }}>{t.titular}</span>
              </Entra>
            ) : null}
            <div style={{ display: "flex", gap: 90, alignItems: "flex-start", justifyContent: "center" }}>
              {(t.items ?? []).map((it, i) => (
                <ChipIcono
                  key={it.label}
                  glifo={GLIFO[it.glifo]}
                  label={it.label}
                  activo={it.activo !== false}
                  at={(t.titular ? 8 : 2) + i * 6}
                />
              ))}
            </div>
            {t.etiqueta ? (
              <Entra at={22} y={22}>
                <span style={{ ...T.etiqueta }}>{t.etiqueta}</span>
              </Entra>
            ) : null}
          </Centro>
        );

      // El viaje entre fechas. El orden del array es la dirección.
      case "cronologia":
        return (
          <Centro gap={44}>
            {t.kicker ? (
              <Entra y={20}>
                <span style={{ ...T.kicker }}>{t.kicker}</span>
              </Entra>
            ) : null}
            <Cronologia hitos={t.hitos ?? []} at={4} dur={t.dur ?? Math.min(40, len - 10)} />
          </Centro>
        );

      // El dato como argumento: el recorrido del contador ES el mensaje.
      case "cifra":
        return (
          <Centro gap={18}>
            {t.kicker ? (
              <Entra y={20}>
                <span style={{ ...T.kicker }}>{t.kicker}</span>
              </Entra>
            ) : null}
            <Entra at={3} y={30}>
              <CifraContada
                de={t.de ?? 0}
                a={t.valor ?? 0}
                at={4}
                dur={t.dur ?? Math.min(34, len - 12)}
                prefijo={t.prefijo}
                sufijo={t.sufijo}
                color={color}
              />
            </Entra>
            {t.etiqueta ? (
              <Entra at={12} y={24}>
                <span style={{ ...T.etiqueta }}>{t.etiqueta}</span>
              </Entra>
            ) : null}
          </Centro>
        );

      // Lo que sube o baja mientras el espectador mira.
      case "medidor":
        return (
          <Centro gap={64}>
            {t.titular ? (
              <Entra y={24}>
                <span style={{ ...T.titular, fontSize: 64 }}>{t.titular}</span>
              </Entra>
            ) : null}
            <div style={{ display: "flex", flexDirection: "column", gap: 60, width: "100%", alignItems: "center" }}>
              {(t.medidas ?? []).map((m, i) => (
                <Medidor
                  key={m.label}
                  label={m.label}
                  de={m.de}
                  a={m.a}
                  max={m.max}
                  at={(t.titular ? 8 : 2) + i * 8}
                  dur={t.dur ?? 34}
                  color={i === 0 ? color : N.tinta}
                  formato={(v) => `${m.prefijo ?? ""}${formateaN(v, m.decimales ?? 0)}${m.sufijo ?? ""}`}
                />
              ))}
            </div>
          </Centro>
        );

      // Foto enmarcada sobre papel: metraje real DENTRO del artículo.
      case "retrato":
        return (
          <Centro gap={38}>
            <TarjetaFoto at={2} duracion={len} ancho={640} alto={820}>
              <Media src={t.media} esVideo={t.esVideo} />
            </TarjetaFoto>
            {t.titular ? (
              <Entra at={12} y={24}>
                <span style={{ ...T.titular, fontSize: 62 }}>{t.titular}</span>
              </Entra>
            ) : null}
          </Centro>
        );

      // Metraje a sangre sobre negro: el otro registro, "esto pasó".
      case "escenario":
        return (
          <>
            <AbsoluteFill>
              <Media src={t.media} esVideo={t.esVideo} />
            </AbsoluteFill>
            {/* Scrim inferior: sin él, el titular blanco desaparece sobre metraje claro. */}
            <AbsoluteFill
              style={{
                background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 34%, transparent 62%)",
              }}
            />
            {t.titular ? (
              <AbsoluteFill
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: 560,
                  paddingLeft: LAYOUT.margen,
                  paddingRight: LAYOUT.margen,
                  textAlign: "center",
                }}
              >
                <Entra at={4} y={30}>
                  <span style={{ ...T.titular, fontSize: 74, color: N.blanco, textShadow: N.sombraTexto }}>
                    {t.titular}
                  </span>
                </Entra>
              </AbsoluteFill>
            ) : null}
          </>
        );

      // El remate: negro y una sola palabra. El gancho a la parte 2.
      case "cierre":
        return (
          <Centro gap={24}>
            <Entra y={34}>
              <span style={{ ...T.titular, fontSize: 104, color: N.blanco }}>{t.titular}</span>
            </Entra>
            {t.etiqueta ? (
              <Entra at={10} y={22}>
                <span style={{ ...T.etiqueta, color: "rgba(255,255,255,0.72)" }}>{t.etiqueta}</span>
              </Entra>
            ) : null}
          </Centro>
        );

      default:
        return null;
    }
  })();

  // Punch-in de toma: escala muy leve durante toda la ventana. Es lo que impide
  // que una toma de gráfico se lea como una diapositiva congelada. 1.5 % basta:
  // por encima del 4 % se percibe como zoom y compite con el contenido.
  const punch = interpolate(frame, [0, len], [1, 1.015], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.inOutCubic,
  });

  return (
    <AbsoluteFill>
      {registro === "papel" ? <FondoPapel /> : <FondoCine />}
      <AbsoluteFill style={{ transform: `scale(${punch})` }}>{cuerpo}</AbsoluteFill>
      <Sello sobre={registro} />
    </AbsoluteFill>
  );
};

/**
 * Monta el plan completo. Cada toma es una <Sequence>, así que dentro de ella
 * `useCurrentFrame()` empieza en 0 y mover una toma es cambiar un número.
 */
export const PistaNoticia: React.FC<{ tomas: TomaNoticia[] }> = ({ tomas }) => (
  <AbsoluteFill>
    {tomas.map((t) => {
      const len = Math.max(1, t.endFrame - t.startFrame);
      return (
        <Sequence key={t.id} from={t.startFrame} durationInFrames={len} name={`${t.beat}:${t.id}`} layout="none">
          <Toma t={t} len={len} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
