/**
 * RÓTULO DEL RELEVO — proyecto 011: «Y ahora… ¡LA FIESTA!».
 *
 * Pedido del cliente sobre la prueba v2, junto con el fundido de Turning Page.
 * Cuenta con palabras lo que la música hace en el mismo instante:
 *
 *   f2281  «Y ahora» aparece mientras el piano se apaga (fundido f2250–2334)
 *   f2296  los tres puntos van cayendo uno a uno: la espera
 *   f2334  el piano ya calla; 0,2 s de silencio
 *   f2340  RELEVO — primer golpe de El Preso, la novia levanta el cuchillo y
 *          entra «¡LA FIESTA!» de golpe
 *   f2420  se van los dos, antes de que el plano pase a la pista (f2484)
 *
 * DOS VOCES DE LA MISMA FAMILIA. «Y ahora…» sigue en Didot itálica —la voz del
 * título de apertura y de la balada—; «¡LA FIESTA!» es Didot en negrita y
 * versales: misma familia, otro volumen. Cambiar de tipografía para la rumba
 * habría hecho dos piezas; subir peso y caja hace una que levanta la voz.
 *
 * MOVIMIENTO. «Y ahora…» entra en estilo «lujo» (lento, sin rebote), porque
 * todavía suena la balada. «¡LA FIESTA!» entra en estilo «redes»: en 7 f, desde
 * escala 1,35 y con el tracking cerrándose de 0,34 a 0,05 em, que se lee como un
 * golpe. Es el único movimiento rápido de todo el texto de la pieza, y cae
 * exactamente en el único golpe que lo justifica.
 *
 * DÓNDE. Arriba, sobre la pared de madera (bloque centrado en y≈190 px).
 * Medido sobre los stills de `r06`: las caras de los novios ocupan el 16–36 % del
 * alto, el pastel y las velas el 64–87 %, y el centro es el vestido blanco, donde
 * un texto blanco no se lee. La franja alta es la única con contraste que no tapa
 * ni caras (R08) ni el cuchillo ni el pastel. Un velo degradado desde arriba (solo
 * mientras hay texto) asegura la lectura sobre las flores del arco.
 */
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { RELEVO } from "./metraje-011";

/** Todo se cuenta desde el RELEVO: si el relevo se mueve, el rótulo se mueve con él. */
const ENTRA_Y_AHORA = RELEVO - 59; // f2281
const PUNTOS = [RELEVO - 44, RELEVO - 34, RELEVO - 24]; // f2296 · f2306 · f2316
const GOLPE = RELEVO; // f2340
const SALE = RELEVO + 80; // f2420
const FIN = SALE + 16; // f2436

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SERIF = "Didot, 'Bodoni 72', 'Bodoni MT', serif";

export const RotuloFiesta011: React.FC = () => {
  const f = useCurrentFrame();
  if (f < ENTRA_Y_AHORA || f >= FIN) return null;

  const salida = interpolate(f, [SALE, FIN], [0, 1], { ...CLAMP, easing: Easing.in(Easing.cubic) });

  // «Y ahora»: entrada lenta (lujo) de 14 f, subiendo 16 px.
  const eYa = interpolate(f, [ENTRA_Y_AHORA, ENTRA_Y_AHORA + 14], [0, 1], { ...CLAMP, easing: Easing.out(Easing.cubic) });

  // «¡LA FIESTA!»: golpe (redes) de 7 f.
  const eFi = interpolate(f, [GOLPE, GOLPE + 7], [0, 1], { ...CLAMP, easing: Easing.out(Easing.cubic) });
  const escalaFi = interpolate(eFi, [0, 1], [1.35, 1]);
  const trackingFi = interpolate(eFi, [0, 1], [0.34, 0.05]);
  const opacidadFi = interpolate(f, [GOLPE, GOLPE + 3], [0, 1], CLAMP);

  const opacidadBloque = 1 - salida;
  const sube = -18 * salida;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: opacidadBloque }}>
      {/* Velo superior: solo mientras hay texto, y se va con él. */}
      <AbsoluteFill
        style={{
          opacity: eYa,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.32) 11%, rgba(0,0,0,0) 24%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 96,
          transform: `translateY(${sube.toFixed(2)}px)`,
          textAlign: "center",
          color: "#FFFFFF",
          fontFamily: SERIF,
          textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontStyle: "italic",
            lineHeight: 1.1,
            opacity: eYa,
            transform: `translateY(${((1 - eYa) * 16).toFixed(2)}px)`,
            whiteSpace: "nowrap",
          }}
        >
          Y ahora
          {PUNTOS.map((p) => (
            // Los tres puntos siempre ocupan su sitio (opacidad 0 → 1): si se
            // añadieran al texto, la línea centrada se desplazaría con cada uno.
            <span key={p} style={{ opacity: f >= p ? 1 : 0 }}>
              .
            </span>
          ))}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 6,
            letterSpacing: `${trackingFi.toFixed(3)}em`,
            // La sangría compensa el tracking que queda detrás de la última letra.
            textIndent: `${trackingFi.toFixed(3)}em`,
            opacity: opacidadFi,
            transform: `scale(${escalaFi.toFixed(4)})`,
            whiteSpace: "nowrap",
          }}
        >
          ¡LA FIESTA!
        </div>
      </div>
    </AbsoluteFill>
  );
};
