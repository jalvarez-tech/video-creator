/**
 * LAS PIEZAS DEL 097 — el sistema de «papel recortado y trazo a mano» del cartel de MAS
 * Estrellitas 2026 (`proyectos/097/artefactos/02-layout.md` §4), pieza a pieza.
 *
 * Son del PROYECTO y no del motor: el módulo editorial del motor pinta blanco sin caja, y el
 * catálogo no tiene estrella, pegatina ni tira de papel. Si una segunda pieza de MAS las pide,
 * `TiraPapel` y `Estrellita` son las candidatas a subir a `motor/graficos/` con su ficha.
 *
 * TODO depende solo del frame (`useCurrentFrame`) y de semillas fijas (`random`): ni tiempo real
 * ni aleatorio sin semilla. Sin sombras ni degradados (el cartel no los tiene); el relieve lo pone
 * el papel arrugado (`mas-097/papel.png`) y el borde rasgado.
 */
import React from "react";
import { Easing, Img, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE } from "../../motor/motion";

// ── Identidad (proyectos/097/identidad-mas.md §2) ──────────────────────────────

export const C = {
  papel: "#FFE400",
  tinta: "#382A74",
  azul: "#419AFF",
  verde: "#0CD175",
  lavanda: "#A5A6E7",
  rojo: "#FB0A3F",
  crema: "#FFFEC0",
  blanco: "#FFFFFF",
} as const;

/** Dosis con la g de un solo ojo (ss03), la decisión del 2026-11-22. Montserrat de respaldo y para las cifras. */
export const DOSIS: React.CSSProperties = { fontFamily: "'Dosis', 'Montserrat', sans-serif", fontFeatureSettings: '"ss03"' };
/** Las cifras van en Montserrat: el cero de Dosis lleva un punto dentro y en 220 px se ve (02-layout §4.1). */
export const MONTSERRAT: React.CSSProperties = { fontFamily: "'Montserrat', sans-serif" };

export const PAPEL_URL = staticFile("mas-097/papel.png");
/** El papel como fondo, anclado a la PANTALLA (no a la caja): una tira y la hoja del CTA comparten las mismas arrugas. */
export const fondoPapel = (color: string = C.papel): React.CSSProperties => ({
  backgroundColor: color,
  backgroundImage: color === C.papel ? `url(${PAPEL_URL})` : undefined,
  backgroundSize: "2208px 1242px",
  backgroundAttachment: "fixed",
});

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const rampa = (f: number, a: number, b: number, de = 0, hasta = 1, easing = EASE.outCubic) =>
  interpolate(f, [a, b], [de, hasta], { ...CLAMP, easing });

/** Muelle suave de entrada (sin rebote visible en texto que se lee). */
export const useMuelle = (en: number, cfg: { damping?: number; mass?: number; stiffness?: number } = {}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - en, fps, config: { damping: 16, mass: 0.7, stiffness: 140, ...cfg } });
};

// ── Bordes rasgados ────────────────────────────────────────────────────────────

/**
 * Un `clip-path` con los cuatro bordes rasgados, en coordenadas de la CAJA (porcentajes con un
 * diente en px): así vale para una caja de cualquier tamaño sin medir el texto.
 */
export const bordeRasgado = (semilla: string, dientes = 22, amp = 5): string => {
  const j = (k: string) => (random(`${semilla}-${k}`) * amp).toFixed(1);
  const pts: string[] = [];
  for (let i = 0; i <= dientes; i++) pts.push(`${((i / dientes) * 100).toFixed(2)}% ${j(`a${i}`)}px`);
  for (let i = 0; i <= 4; i++) pts.push(`calc(100% - ${j(`d${i}`)}px) ${((i / 4) * 100).toFixed(1)}%`);
  for (let i = dientes; i >= 0; i--) pts.push(`${((i / dientes) * 100).toFixed(2)}% calc(100% - ${j(`b${i}`)}px)`);
  for (let i = 4; i >= 0; i--) pts.push(`${j(`i${i}`)}px ${((i / 4) * 100).toFixed(1)}%`);
  return `polygon(${pts.join(", ")})`;
};

// ── Texto con acento: «*palabra*» va en 800 y puede llevar subrayado u óvalo ─────

export type Marca = { tipo: "subrayado" | "ovalo"; en: number; dur?: number; color?: string };

/**
 * Pinta un texto con acentos marcados entre asteriscos. A cada acento se le puede dar un trazo
 * (subrayado u óvalo) que se dibuja en su frame; los trazos van en el orden de los acentos.
 */
export const TextoAcento: React.FC<{
  texto: string;
  marcas?: (Marca | null)[];
  colorAcento?: string;
  pesoAcento?: number;
  escalaAcento?: { en: number; dur: number; hasta: number } | null;
}> = ({ texto, marcas = [], colorAcento, pesoAcento = 800, escalaAcento = null }) => {
  const frame = useCurrentFrame();
  const trozos = texto.split("*");
  let k = -1;
  return (
    <>
      {trozos.map((t, i) => {
        if (i % 2 === 0) return <React.Fragment key={i}>{t}</React.Fragment>;
        k++;
        const m = marcas[k] ?? null;
        const esc = escalaAcento ? rampa(frame, escalaAcento.en, escalaAcento.en + escalaAcento.dur, 1, escalaAcento.hasta, Easing.out(Easing.back(1.7))) : 1;
        // Crece con el CUERPO de letra (la línea se reajusta) y no con `scale`, que se montaba sobre la palabra de al lado.
        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              fontWeight: pesoAcento,
              color: colorAcento,
              fontSize: esc !== 1 ? `${esc.toFixed(4)}em` : undefined,
            }}
          >
            {t}
            {m ? m.tipo === "subrayado" ? <Subraya en={m.en} dur={m.dur} color={m.color} semilla={`${t}-${m.en}`} /> : <Ovalo en={m.en} dur={m.dur} color={m.color} semilla={`${t}-${m.en}`} /> : null}
          </span>
        );
      })}
    </>
  );
};

/** Subrayado de rotulador bajo la caja que lo contiene (se adapta a su ancho: `pathLength`). */
export const Subraya: React.FC<{ en: number; dur?: number; color?: string; semilla?: string; grosor?: number; abajo?: number; lineal?: boolean }> = ({
  en,
  dur = 13,
  color = C.azul,
  semilla = "s",
  grosor = 7,
  abajo = -6,
  lineal = false,
}) => {
  const frame = useCurrentFrame();
  const p = lineal ? interpolate(frame, [en, en + dur], [0, 1], CLAMP) : rampa(frame, en, en + dur);
  if (p <= 0) return null;
  const j = (k: string) => (random(`${semilla}-${k}`) - 0.5) * 3;
  const d = `M 1 ${6 + j("a")} Q 30 ${4 + j("b")}, 55 ${6 + j("c")} T 99 ${5 + j("d")}`;
  // El trazo se DESCUBRE de izquierda a derecha con un recorte: con `vector-effect: non-scaling-stroke`
  // el discontinuo (`pathLength`) se calcula en pantalla y el subrayado salía a trozos.
  return (
    <div style={{ position: "absolute", left: "-3%", width: "106%", bottom: abajo, height: 16, clipPath: `inset(-12px ${((1 - p) * 100).toFixed(2)}% -12px -12px)`, pointerEvents: "none" }}>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
        <path d={d} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};

/** Óvalo de rotulador alrededor de la palabra, con el exceso al cerrar (nadie cierra un óvalo exacto). */
export const Ovalo: React.FC<{ en: number; dur?: number; color?: string; semilla?: string; grosor?: number }> = ({
  en,
  dur = 16,
  color = C.azul,
  semilla = "o",
  grosor = 7,
}) => {
  const frame = useCurrentFrame();
  const p = rampa(frame, en, en + dur);
  if (p <= 0) return null;
  const pasos = 40;
  const total = Math.PI * 2 * 1.08;
  const inicio = -Math.PI * 0.6;
  let d = "";
  for (let i = 0; i <= pasos; i++) {
    const t = inicio + (i / pasos) * total;
    const w = (random(`${semilla}-${i}`) - 0.5) * 2.4;
    const x = 50 + (45 + w) * Math.cos(t);
    const y = 50 + (42 + w) * Math.sin(t);
    d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  // Se dibuja con una máscara CÓNICA que barre desde el ángulo en que arranca el trazo (−108° en SVG = −18° en CSS, que cuenta desde las 12).
  const grados = (p * 360).toFixed(1);
  const mascara = `conic-gradient(from -18deg at 50% 50%, #000 ${grados}deg, transparent ${grados}deg)`;
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", left: "-14%", top: "-16%", width: "128%", height: "132%", overflow: "visible", pointerEvents: "none", maskImage: mascara, WebkitMaskImage: mascara }}
    >
      <path d={d} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

// ── La tira de cita (las niñas) y la de la voz en off (MAS) ─────────────────────

/**
 * La tira: papel amarillo rasgado con la cita en índigo entre «», o índigo con letra blanca y sin
 * comillas para la voz en off (así, sin sonido, se sabe quién habla). Se despega de izquierda a
 * derecha en 8 f; la frase sube 6 px y aparece en 10 f; sale con un fundido de 6 f. El texto NO se
 * mueve mientras se lee.
 */
export const TiraPapel: React.FC<{
  en: number;
  sale: number;
  piel?: "papel" | "indigo";
  semilla: string;
  children: React.ReactNode;
  x?: number;
  abajo?: number;
  maxAncho?: number;
  px?: number;
  giro?: number;
  centrada?: boolean;
  /** Lo que va pegado a la tira pero FUERA de su recorte (la estrellita), anclado a su esquina superior derecha. */
  extra?: React.ReactNode;
}> = ({ en, sale, piel = "papel", semilla, children, x = 96, abajo = 90, maxAncho = 1460, px = 54, giro = -1, centrada = false, extra }) => {
  const frame = useCurrentFrame();
  if (frame < en || frame >= sale) return null;
  const abre = rampa(frame, en, en + 8, 0, 100, EASE.outCubic);
  const textoOp = rampa(frame, en + 3, en + 13);
  const textoY = rampa(frame, en + 3, en + 13, 6, 0);
  const fuera = rampa(frame, sale - 6, sale, 1, 0, EASE.inOutCubic);
  const indigo = piel === "indigo";
  return (
    <div
      style={{
        position: "absolute",
        left: centrada ? 0 : x,
        right: centrada ? 0 : undefined,
        bottom: abajo,
        display: "flex",
        justifyContent: centrada ? "center" : "flex-start",
        opacity: fuera,
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative", transform: `rotate(${giro}deg)` }}>
      <div style={{ clipPath: `inset(-20px ${(100 - abre).toFixed(2)}% -20px -20px)` }}>
        <div
          style={{
            ...(indigo ? { backgroundColor: C.tinta } : fondoPapel()),
            clipPath: bordeRasgado(semilla),
            padding: `${Math.round(px * 0.36)}px ${Math.round(px * 0.66)}px ${Math.round(px * 0.44)}px`,
            maxWidth: maxAncho,
          }}
        >
          <div
            style={{
              ...DOSIS,
              fontWeight: 600,
              fontSize: px,
              lineHeight: 1.18,
              color: indigo ? C.blanco : C.tinta,
              opacity: textoOp,
              transform: `translateY(${textoY.toFixed(2)}px)`,
              textAlign: centrada ? "center" : "left",
            }}
          >
            {children}
          </div>
        </div>
      </div>
      {extra ? <div style={{ position: "absolute", right: 0, top: 0, width: 0, height: 0 }}>{extra}</div> : null}
      </div>
    </div>
  );
};

// ── La estrellita ──────────────────────────────────────────────────────────────

/** La estrella de 5 puntas del cartel (el objeto real de la campaña: el «bono» azul de cartón). */
const caminoEstrella = (() => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 50 : 22;
    const t = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(50 + r * Math.cos(t)).toFixed(2)},${(52 + r * Math.sin(t)).toFixed(2)}`);
  }
  return pts.join(" ");
})();

export const EstrellaSvg: React.FC<{ tam: number; color?: string; numero?: number | string; giro?: number }> = ({ tam, color = C.azul, numero, giro = 0 }) => (
  <div style={{ position: "relative", width: tam, height: tam, transform: `rotate(${giro}deg)` }}>
    <svg viewBox="0 0 100 100" width={tam} height={tam} style={{ overflow: "visible" }}>
      <polygon points={caminoEstrella} fill={color} stroke={color} strokeWidth={9} strokeLinejoin="round" />
    </svg>
    {numero !== undefined ? (
      <div
        style={{
          ...DOSIS,
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: tam * 0.08,
          fontWeight: 800,
          fontSize: tam * 0.42,
          color: C.blanco,
        }}
      >
        {numero}
      </div>
    ) : null}
  </div>
);

/** El destello del ancla: ocho rayos cortos que salen y se apagan, y tres chispas de cuatro puntas. */
export const Destello: React.FC<{ en: number; tam: number; color?: string }> = ({ en, tam, color = C.blanco }) => {
  const frame = useCurrentFrame();
  const f = frame - en;
  if (f < 0 || f > 18) return null;
  const p = rampa(frame, en, en + 14);
  const op = rampa(frame, en + 6, en + 18, 1, 0);
  const rayos = Array.from({ length: 8 }, (_, i) => {
    const t = (i * Math.PI) / 4 + Math.PI / 8;
    const r0 = tam * (0.42 + 0.2 * p);
    const r1 = tam * (0.5 + 0.38 * p);
    return (
      <line
        key={i}
        x1={tam + r0 * Math.cos(t)}
        y1={tam + r0 * Math.sin(t)}
        x2={tam + r1 * Math.cos(t)}
        y2={tam + r1 * Math.sin(t)}
        stroke={color}
        strokeWidth={Math.max(3, tam * 0.05)}
        strokeLinecap="round"
      />
    );
  });
  return (
    <svg width={tam * 2} height={tam * 2} style={{ position: "absolute", left: -tam / 2, top: -tam / 2, opacity: op, overflow: "visible", pointerEvents: "none" }}>
      {rayos}
    </svg>
  );
};

/**
 * La estrellita que se pega: escala 0→1 con muelle, un giro de 8° que se asienta y el destello.
 * `x`/`y` son el CENTRO de la estrella en la pantalla.
 */
export const Estrellita: React.FC<{
  en: number;
  x: number;
  y: number;
  tam: number;
  sale?: number;
  numero?: number | string;
  destello?: boolean;
  colorDestello?: string;
}> = ({ en, x, y, tam, sale, numero, destello = true, colorDestello = C.blanco }) => {
  const frame = useCurrentFrame();
  const m = useMuelle(en, { damping: 11, mass: 0.6, stiffness: 160 });
  if (frame < en) return null;
  const op = sale !== undefined ? rampa(frame, sale - 6, sale, 1, 0) : 1;
  if (op <= 0) return null;
  const giro = interpolate(m, [0, 1], [-28, 0]);
  return (
    <div style={{ position: "absolute", left: x - tam / 2, top: y - tam / 2, width: tam, height: tam, opacity: op, pointerEvents: "none" }}>
      {destello ? <Destello en={en + 2} tam={tam} color={colorDestello} /> : null}
      <div style={{ transform: `scale(${m.toFixed(4)})` }}>
        <EstrellaSvg tam={tam} numero={numero} giro={giro} />
      </div>
    </div>
  );
};

// ── Regalo en línea y corazón (iconos del cartel) ──────────────────────────────

export const Regalo: React.FC<{ tam: number; color?: string; grosor?: number }> = ({ tam, color = C.tinta, grosor = 5 }) => (
  <svg viewBox="0 0 64 64" width={tam} height={tam} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="26" width="46" height="31" rx="2" />
    <rect x="5" y="17" width="54" height="10" rx="2" />
    <path d="M32 17v40" />
    <path d="M32 17c-4-9-15-12-15-4 0 4 7 4 15 4" />
    <path d="M32 17c4-9 15-12 15-4 0 4-7 4-15 4" />
  </svg>
);

export const Corazon: React.FC<{ en: number; x: number; y: number; tam: number; dura?: number }> = ({ en, x, y, tam, dura = 30 }) => {
  const frame = useCurrentFrame();
  const m = useMuelle(en, { damping: 12, mass: 0.5 });
  if (frame < en || frame > en + dura) return null;
  const sube = rampa(frame, en, en + dura, 0, -22, EASE.outCubic);
  const op = rampa(frame, en + dura - 10, en + dura, 1, 0);
  return (
    <svg
      viewBox="0 0 64 60"
      width={tam}
      height={tam}
      style={{ position: "absolute", left: x - tam / 2, top: y - tam / 2, transform: `translateY(${sube}px) scale(${m.toFixed(4)})`, opacity: op, overflow: "visible" }}
    >
      <path
        d="M32 54C14 40 5 30 5 19 5 11 11 5 19 5c6 0 10 3 13 8 3-5 7-8 13-8 8 0 14 6 14 14 0 11-9 21-27 35z"
        fill="none"
        stroke={C.blanco}
        strokeWidth={5.5}
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ── La pegatina de deseo ───────────────────────────────────────────────────────

/** Trozo de papel amarillo con borde blanco y el deseo en 800, más un regalo en línea. Se pega con un muelle y un giro que se asienta. */
export const Pegatina: React.FC<{ en: number; texto: string; giro: number; apaga?: number; sale?: number }> = ({ en, texto, giro, apaga, sale }) => {
  const frame = useCurrentFrame();
  const m = useMuelle(en, { damping: 13, mass: 0.6, stiffness: 170 });
  if (frame < en) return null;
  const sal = sale !== undefined ? rampa(frame, sale - 8, sale, 1, 0) : 1;
  const atenua = apaga !== undefined ? rampa(frame, apaga, apaga + 10, 1, 0.45) : 1;
  if (sal <= 0) return null;
  const esc = interpolate(m, [0, 1], [0.35, 1]) * (sale !== undefined ? interpolate(sal, [0, 1], [0.8, 1]) : 1);
  return (
    <div
      style={{
        transform: `rotate(${(giro + (1 - m) * 10).toFixed(2)}deg) scale(${esc.toFixed(4)})`,
        opacity: Math.min(1, m * 1.4) * sal * atenua,
        backgroundColor: C.blanco,
        padding: 8,
      }}
    >
      <div style={{ ...fondoPapel(), display: "flex", alignItems: "center", gap: 18, padding: "16px 30px 18px 22px" }}>
        <Regalo tam={58} />
        <span style={{ ...DOSIS, fontWeight: 800, fontSize: 52, color: C.tinta, whiteSpace: "nowrap" }}>{texto}</span>
      </div>
    </div>
  );
};

// ── Bloque de papel grande (hero) ──────────────────────────────────────────────

export const HeroPapel: React.FC<{
  en: number;
  sale: number;
  semilla: string;
  children: React.ReactNode;
  estilo?: React.CSSProperties;
  giro?: number;
  px?: number;
  /** Lo que va FUERA del papel recortado (la estrellita), anclado a la esquina superior derecha del bloque. */
  extra?: React.ReactNode;
}> = ({ en, sale, semilla, children, estilo, giro = -1.5, px = 100, extra }) => {
  const frame = useCurrentFrame();
  const m = useMuelle(en, { damping: 15, mass: 0.7, stiffness: 150 });
  if (frame < en || frame >= sale) return null;
  const fuera = rampa(frame, sale - 8, sale, 1, 0);
  return (
    <div style={{ position: "absolute", pointerEvents: "none", opacity: fuera, ...estilo }}>
      <div
        style={{
          transform: `rotate(${giro}deg) scale(${interpolate(m, [0, 1], [0.86, 1]).toFixed(4)})`,
          opacity: Math.min(1, m * 1.6),
          transformOrigin: "50% 60%",
          position: "relative",
        }}
      >
        <div style={{ ...fondoPapel(), clipPath: bordeRasgado(semilla, 26, 7), padding: `${px * 0.24}px ${px * 0.48}px ${px * 0.3}px` }}>
          <div style={{ ...DOSIS, fontWeight: 800, fontSize: px, lineHeight: 1.06, color: C.tinta, textAlign: "center" }}>{children}</div>
        </div>
        {extra ? <div style={{ position: "absolute", right: 0, top: 0, width: 0, height: 0 }}>{extra}</div> : null}
      </div>
    </div>
  );
};

// ── La foto-pegatina ───────────────────────────────────────────────────────────

export const FotoPegatina: React.FC<{ en: number; src: string; ancho: number; x: number; y: number; giro?: number; pie?: React.ReactNode; enPie?: number }> = ({
  en,
  src,
  ancho,
  x,
  y,
  giro = -3,
  pie,
  enPie,
}) => {
  const frame = useCurrentFrame();
  const m = useMuelle(en, { damping: 15, mass: 0.8, stiffness: 120 });
  if (frame < en) return null;
  const sube = interpolate(m, [0, 1], [140, 0]);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ancho, transform: `translateY(${sube}px) rotate(${(giro + (1 - m) * 6).toFixed(2)}deg)`, opacity: Math.min(1, m * 1.5) }}>
      <div style={{ backgroundColor: C.blanco, padding: 16, paddingBottom: pie ? 64 : 16 }}>
        <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />
        {pie ? (
          <div
            style={{
              ...DOSIS,
              position: "absolute",
              left: 22,
              right: 22,
              bottom: 14,
              fontWeight: 500,
              fontSize: 34,
              color: C.tinta,
              opacity: enPie !== undefined ? rampa(frame, enPie, enPie + 10) : 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {pie}
          </div>
        ) : null}
      </div>
    </div>
  );
};

// ── El QR de la página de donación ─────────────────────────────────────────────

/**
 * Hasta que MAS dé la dirección de la página de donación, el QR es un HUECO marcado: un QR
 * inventado llevaría a la gente a ninguna parte. Cuando llegue, `src` apunta al PNG generado
 * a partir de la dirección (y se prueba con un móvil en la pantalla y a 3 m).
 */
export const QrPapel: React.FC<{ en: number; tam: number; x: number; y: number; src?: string }> = ({ en, tam, x, y, src }) => {
  const frame = useCurrentFrame();
  if (frame < en) return null;
  const op = rampa(frame, en, en + 10);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: tam + 28, opacity: op, backgroundColor: C.blanco, padding: 14 }}>
      {src ? (
        <Img src={staticFile(src)} style={{ width: tam, height: tam, display: "block" }} />
      ) : (
        <div
          style={{
            ...DOSIS,
            width: tam,
            height: tam,
            border: `5px dashed ${C.tinta}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: C.tinta,
            textAlign: "center",
            fontWeight: 700,
            fontSize: tam * 0.1,
            lineHeight: 1.1,
            boxSizing: "border-box",
            padding: tam * 0.06,
          }}
        >
          <span style={{ fontWeight: 800, fontSize: tam * 0.26 }}>QR</span>
          <span>por confirmar</span>
          <span>con MAS</span>
        </div>
      )}
    </div>
  );
};

// ── Camino punteado entre dos puntos (el del cartel) ───────────────────────────

export const Camino: React.FC<{ en: number; dur: number; d: string; ancho: number; alto: number; x: number; y: number; color?: string }> = ({
  en,
  dur,
  d,
  ancho,
  alto,
  x,
  y,
  color = C.blanco,
}) => {
  const frame = useCurrentFrame();
  const p = rampa(frame, en, en + dur, 0, 1, EASE.inOutCubic);
  if (p <= 0) return null;
  const id = `camino-${en}`;
  return (
    <svg width={ancho} height={alto} style={{ position: "absolute", left: x, top: y, overflow: "visible", pointerEvents: "none" }}>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse">
          <path d={d} pathLength={1} fill="none" stroke="#FFFFFF" strokeWidth={14} strokeDasharray="1 1" strokeDashoffset={1 - p} />
        </mask>
      </defs>
      <path d={d} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeDasharray="2 16" mask={`url(#${id})`} />
    </svg>
  );
};
