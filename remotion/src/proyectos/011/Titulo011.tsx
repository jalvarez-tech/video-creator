/**
 * TÍTULO DE APERTURA — proyecto 011: «BODA · María & Daniel».
 *
 * Lo único escrito a mano de la pieza (director §2·5: «lo único de la pieza, a
 * mano»). No pasa por la biblioteca de gráficos: sus piezas son editoriales
 * (titulares, cifras, listas) y un título de boda es otra voz.
 *
 * ESTILO «LUJO» (director §4, motion-graphics §5): lento, distancias cortas,
 * sin rebote, una sola unidad de animación —la frase entera—.
 *
 * LAS TRES DECISIONES:
 *
 * 1. VISIBLE DESDE EL FRAME 0, sin entrada. El frame 0 es la miniatura que
 *    enseñan WhatsApp y el feed (lección del gancho del 010): si el título
 *    entrara con un fundido, la portada del vídeo sería un plano sin nombres.
 *    La vida la pone el movimiento ambiental —el bloque crece un 3 % y el
 *    «BODA» se abre de 0,46 a 0,56 em— al ritmo del punch-in del plano.
 * 2. DIDOT ITÁLICA para los nombres, a 112 px. Se compararon cuatro fuentes
 *    sobre el fotograma real (Didot itálica · Snell Roundhand · Bodoni 72 en
 *    dos líneas · Savoye LET): la Snell se salía de la zona segura del 11 %, la
 *    Savoye tiene el trazo demasiado fino para un móvil y partir «María /
 *    & Daniel» separaba a la pareja. «María & Daniel» mide ≈760 px de los 842
 *    útiles. ⚠ Didot es una fuente del SISTEMA (macOS): en otra máquina cae a
 *    Bodoni 72 o a la serif por defecto y el título cambia de voz.
 * 3. UN VELO PROPIO, no de franja. El plano de apertura tiene el lago gris
 *    claro justo detrás de los nombres, y blanco sobre gris claro no se lee sin
 *    ayuda. Una elipse oscura al 40 % detrás del bloque —que se va con él— y
 *    una sombra difusa bastan sin oscurecer el resto del plano.
 *
 * SALIDA: frames 126–150 (0,8 s) con ease-in, subiendo 14 px y desenfocando
 * 3 px. Termina en el f150, justo cuando empieza la disolvencia de `c02`: el
 * título no se cruza con el segundo plano.
 */
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

const KICKER = "BODA";
const NOMBRES = "María & Daniel";

/** Frames: el título empieza a irse en `SALE` y ha desaparecido en `FIN`. */
const SALE = 126;
const FIN = 150;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', serif";

export const Titulo011: React.FC = () => {
  const f = useCurrentFrame();
  if (f >= FIN) return null;

  // Ambiente: lineal, porque acompaña al punch-in lineal del plano de debajo.
  const escala = interpolate(f, [0, FIN], [1, 1.03], CLAMP);
  const tracking = interpolate(f, [0, FIN], [0.46, 0.56], CLAMP);
  // Salida: ease-in (empieza lento y acelera), como pide la guía para salir.
  const s = interpolate(f, [SALE, FIN], [0, 1], { ...CLAMP, easing: Easing.in(Easing.cubic) });
  const opacidad = 1 - s;
  const sube = interpolate(f, [0, FIN], [0, -10], CLAMP) - 14 * s;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: opacidad }}>
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 62% 15% at 50% 44%, rgba(0,0,0,0.40), rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "44%",
          transform: `translateY(calc(-50% + ${sube.toFixed(2)}px)) scale(${escala.toFixed(4)})`,
          textAlign: "center",
          color: "#FFFFFF",
          fontFamily: SERIF,
          filter: s > 0 ? `blur(${(3 * s).toFixed(2)}px)` : undefined,
          textShadow: "0 2px 28px rgba(0,0,0,0.50), 0 1px 3px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            fontSize: 40,
            letterSpacing: `${tracking.toFixed(3)}em`,
            // El tracking también se añade detrás de la última letra: sin esta
            // sangría igual, «BODA» quedaría descentrado hacia la izquierda.
            textIndent: `${tracking.toFixed(3)}em`,
            color: "rgba(255,255,255,0.94)",
          }}
        >
          {KICKER}
        </div>
        <div style={{ fontSize: 112, fontStyle: "italic", lineHeight: 1.05, marginTop: 22, whiteSpace: "nowrap" }}>
          {NOMBRES}
        </div>
      </div>
    </AbsoluteFill>
  );
};
