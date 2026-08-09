import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE, SPRING } from "../motion";
import { LAYOUT, MARCA, N, T, alfaN } from "./theme-noticias";

/**
 * PRIMITIVAS DEL FORMATO NOTICIAS — lo que NO estaba en la biblioteca general.
 *
 * La biblioteca de `plantillas/graficos/` (37 primitivas) cubre el 80 % del
 * trabajo: Titular, Cifra, Contador, Subrayado, Aspa, Check, Barras, Particulas…
 * y se sigue usando aquí. Lo que NO cubría es el vocabulario propio del formato
 * editorial claro:
 *
 *   FondoPapel   el beige con grano — el fondo dominante del formato
 *   FondoCine    el negro low-key — el otro registro
 *   Sello        el watermark persistente de marca
 *   TarjetaFoto  foto/vídeo enmarcado con borde naranja + sombra
 *   RecortePrensa titular de periódico con subrayado de rotulador
 *   ChipIcono    cuadrado glossy naranja + icono + label (comparaciones)
 *   Cronologia   línea de tiempo vertical entre dos años
 *   Medidor      slider de valor (control vs. beneficio)
 *
 * Regla de la casa (motion-graphics §1): antes de escribir un gráfico, mira si
 * ya existe. Estos ocho existen porque el look claro los pedía y no los había.
 *
 * Determinismo: todo desde useCurrentFrame(). Ningún Math.random() sin sembrar,
 * ningún timer, ninguna CSS animation.
 */

// ── Fondos: los dos registros del formato ────────────────────────────────────

/**
 * El fondo dominante: papel beige con grano sutil.
 *
 * El grano importa más de lo que parece. Un beige plano se lee como "diapositiva
 * de PowerPoint"; el mismo beige con textura se lee como papel, y es lo que da
 * el aire editorial de gama alta. Se hace con gradientes repetidos (no con una
 * imagen ni con cientos de nodos) para no pagarlo en render.
 *
 * `grano` por encima de 0.05 deja de ser textura y empieza a ser ruido visible.
 */
export const FondoPapel: React.FC<{ color?: string; grano?: number }> = ({ color = N.papel, grano = 0.025 }) => (
  <AbsoluteFill style={{ background: color }}>
    <AbsoluteFill
      style={{
        backgroundImage: `repeating-conic-gradient(${alfaN("#8A8172", grano)} 0% 25%, transparent 0% 50%)`,
        backgroundSize: "6px 6px",
        pointerEvents: "none",
      }}
    />
    {/* Vignette cálida muy leve: hunde las esquinas sin ensuciar el centro. */}
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 45%, transparent 58%, ${alfaN("#6B6055", 0.14)} 100%)`,
        pointerEvents: "none",
      }}
    />
  </AbsoluteFill>
);

/**
 * El otro registro: negro cinematográfico con foco cenital.
 *
 * Es la "sala oscura" del formato — donde van los retratos, el metraje y las
 * reconstrucciones. `cy` bajo (30-40) coloca la luz arriba, que es lo que
 * produce la iluminación tipo softbox cenital de la referencia.
 */
export const FondoCine: React.FC<{ cx?: number; cy?: number; intensidad?: number }> = ({
  cx = 50,
  cy = 34,
  intensidad = 0.13,
}) => (
  <AbsoluteFill style={{ background: N.negro }}>
    <AbsoluteFill
      style={{
        background: `radial-gradient(58% 44% at ${cx}% ${cy}%, ${alfaN("#FFFFFF", intensidad)}, transparent 66%)`,
        pointerEvents: "none",
      }}
    />
  </AbsoluteFill>
);

// ── Marca ────────────────────────────────────────────────────────────────────

/**
 * Watermark persistente: píldora inferior centrada con el nombre del canal.
 *
 * Va en TODOS los frames de la pieza (en la referencia no falta ni uno). Se
 * adapta al registro: sobre papel es tinta sobre traslúcido claro; sobre negro
 * es blanco sobre traslúcido oscuro. Sin esa inversión desaparece en la mitad
 * de las escenas.
 *
 * Devuelve null si `MARCA.sello` es null — un canal sin sello no debe pagar un
 * hueco en la maqueta.
 */
export const Sello: React.FC<{ texto?: string | null; sobre?: "papel" | "cine" }> = ({
  texto = MARCA.sello,
  sobre = "papel",
}) => {
  if (!texto) return null;
  const claro = sobre === "cine";
  return (
    <div
      style={{
        position: "absolute",
        bottom: LAYOUT.selloBottom,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 30px",
          borderRadius: 999,
          border: `2px solid ${claro ? alfaN("#FFFFFF", 0.55) : alfaN("#111111", 0.3)}`,
          background: claro ? alfaN("#000000", 0.35) : alfaN("#FFFFFF", 0.45),
          fontFamily: T.pie.fontFamily,
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: 1.5,
          color: claro ? N.blanco : N.tinta,
        }}
      >
        {/* Globo: dos elipses y un círculo, sin dependencias de icon set. */}
        <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="4" ry="9.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M2.8 9h18.4M2.8 15h18.4" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        {texto}
      </div>
    </div>
  );
};

// ── Media enmarcada ──────────────────────────────────────────────────────────

/**
 * Foto o clip enmarcado: borde naranja fino, esquinas redondeadas y sombra
 * proyectada, flotando sobre el papel.
 *
 * La regla del formato: el metraje real NUNCA va a sangre sobre el papel. Un
 * vídeo a sangre rompe el registro editorial y se lee como "otro vídeo pegado";
 * enmarcado se lee como "una prueba dentro del artículo". Sobre fondo NEGRO sí
 * puede ir a sangre (usa `escenario` del plan) — ahí el registro ya es el otro.
 *
 * `deriva` es el Ken Burns: escala lenta de 1 a 1+deriva durante la ventana.
 * Sirve para que una foto fija no se congele. 0.05-0.08 basta; más marea.
 */
export const TarjetaFoto: React.FC<{
  children: React.ReactNode;
  ancho?: number;
  alto?: number;
  at?: number;
  deriva?: number;
  duracion?: number;
  borde?: string;
}> = ({ children, ancho = 620, alto = 800, at = 0, deriva = 0.06, duracion = 200, borde = N.naranja }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - at;
  const e = spring({ frame: f, fps, config: SPRING.tarjeta });
  const op = interpolate(f, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kb = interpolate(f, [0, duracion], [1, 1 + deriva], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.inOutCubic,
  });
  return (
    <div
      style={{
        width: ancho,
        height: alto,
        borderRadius: LAYOUT.radio,
        border: `${LAYOUT.borde}px solid ${borde}`,
        boxShadow: N.sombra,
        background: N.hueso,
        overflow: "hidden",
        opacity: op,
        transform: `translateY(${interpolate(e, [0, 1], [40, 0])}px) scale(${interpolate(e, [0, 1], [0.94, 1])})`,
      }}
    >
      <div style={{ width: "100%", height: "100%", transform: `scale(${kb})` }}>{children}</div>
    </div>
  );
};

// ── Evidencia periodística ───────────────────────────────────────────────────

/**
 * Recorte de prensa: tarjeta blanca con el titular real de la noticia y un
 * subrayado de rotulador que se dibuja sobre las palabras que importan.
 *
 * Es el gesto de "veracidad probatoria" del formato. El subrayado se DIBUJA
 * (progreso 0→1), no aparece: un resaltado que aparece de golpe se lee como
 * error de render; uno que se dibuja se lee como alguien marcando el periódico.
 *
 * `fuente` es el medio (CNN, Reuters…). Va arriba, en sans pequeña: es el que
 * sostiene la credibilidad de todo el bloque.
 */
export const RecortePrensa: React.FC<{
  titular: string;
  fuente?: string;
  resaltar?: string;
  at?: number;
  ancho?: number;
  rotacion?: number;
}> = ({ titular, fuente, resaltar, at = 0, ancho = 840, rotacion = -1.2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - at;
  const e = spring({ frame: f, fps, config: SPRING.tarjeta });
  const op = interpolate(f, [0, 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // El rotulador entra DESPUÉS de que el recorte aterrice: primero se ve la
  // prueba, luego se marca. Al revés no se entiende qué se está subrayando.
  const marca = interpolate(f, [14, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.outCubic,
  });

  // Partimos el titular para envolver SOLO el fragmento a resaltar.
  const i = resaltar ? titular.toLowerCase().indexOf(resaltar.toLowerCase()) : -1;
  const antes = i >= 0 ? titular.slice(0, i) : titular;
  const medio = i >= 0 ? titular.slice(i, i + (resaltar as string).length) : "";
  const despues = i >= 0 ? titular.slice(i + (resaltar as string).length) : "";

  return (
    <div
      style={{
        width: ancho,
        padding: "34px 40px 40px",
        borderRadius: 10,
        background: N.hueso,
        boxShadow: N.sombra,
        opacity: op,
        transform: `rotate(${rotacion}deg) translateY(${interpolate(e, [0, 1], [36, 0])}px)`,
      }}
    >
      {fuente ? (
        <div style={{ ...T.kicker, fontSize: 24, letterSpacing: 4, marginBottom: 14 }}>{fuente}</div>
      ) : null}
      <div style={{ fontFamily: T.titular.fontFamily, fontSize: 52, fontWeight: 700, lineHeight: 1.18, color: N.tinta }}>
        {antes}
        {medio ? (
          <span style={{ position: "relative", display: "inline" }}>
            <span
              style={{
                position: "absolute",
                left: -4,
                right: -4,
                bottom: 2,
                top: "18%",
                background: alfaN(N.resalte, 0.85),
                transform: `scaleX(${marca})`,
                transformOrigin: "left center",
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>{medio}</span>
          </span>
        ) : null}
        {despues}
      </div>
    </div>
  );
};

// ── Comparaciones ────────────────────────────────────────────────────────────

/**
 * Chip de icono: cuadrado glossy naranja con un glifo negro y su label debajo.
 *
 * Es la unidad de comparación del formato ("Non Profit" vs "For Profit"). Van
 * SIEMPRE en pareja o en trío — un chip solo no compara nada y entonces lo que
 * querías era una etiqueta.
 *
 * `activo=false` lo apaga a gris: sirve para marcar la opción descartada sin
 * añadir un aspa encima.
 */
export const ChipIcono: React.FC<{
  glifo: React.ReactNode;
  label: string;
  at?: number;
  tam?: number;
  activo?: boolean;
}> = ({ glifo, label, at = 0, tam = 150, activo = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - at;
  const e = spring({ frame: f, fps, config: SPRING.entrada });
  const op = interpolate(f, [0, 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const base = activo ? N.naranjaChip : "#B9B3A7";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        opacity: op,
        transform: `translateY(${interpolate(e, [0, 1], [34, 0])}px) scale(${interpolate(e, [0, 1], [0.86, 1])})`,
      }}
    >
      <div
        style={{
          width: tam,
          height: tam,
          borderRadius: 26,
          // El "glossy" es un degradado claro→base, no un brillo pegado encima.
          background: `linear-gradient(160deg, ${alfaN("#FFFFFF", 0.42)} 0%, ${base} 42%, ${base} 100%)`,
          boxShadow: N.sombraCorta,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: N.tinta,
        }}
      >
        {glifo}
      </div>
      <span style={{ ...T.pie, fontSize: Math.round(tam * 0.19) }}>{label}</span>
    </div>
  );
};

/** Glifos mínimos para los chips, sin dependencias de icon set. */
export const GLIFO = {
  /** Manos abiertas que sostienen algo: dar sin quedarse. El "non profit". */
  manos: (
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="6.4" r="2.6" fill="currentColor" stroke="none" />
      <path d="M11.4 13.5 7.2 11.2a1.7 1.7 0 0 0-2.4.8L2.6 17.4l6 3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.6 13.5l4.2-2.3a1.7 1.7 0 0 1 2.4.8l2.2 5.4-6 3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  caja: (
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M3 8l9-4 9 4v8l-9 4-9-4V8z" strokeLinejoin="round" />
      <path d="M3 8l9 4 9-4M12 12v8" />
    </svg>
  ),
  balanza: (
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 3v18M5 21h14M4 8h16M4 8l-2 6h4l-2-6zM20 8l-2 6h4l-2-6z" strokeLinejoin="round" />
    </svg>
  ),
  rayo: (
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  ),
  /** Vivienda unifamiliar / casa / finca. */
  casa: (
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M3 10.4 12 3.5l9 6.9V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.6z" strokeLinejoin="round" />
      <path d="M9.5 21v-6h5v6" strokeLinejoin="round" />
    </svg>
  ),
  /** Multifamiliar / desarrollo en altura / ciudad. */
  edificio: (
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M4 21V6.5L12 3v18M12 21V9l8 3v9M4 21h16" strokeLinejoin="round" />
      <path d="M7 10h2M7 14h2M15.5 14h1.5M15.5 17.5h1.5" strokeLinecap="round" />
    </svg>
  ),
  /** Aeropuerto / conectividad aérea. */
  avion: (
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 15.5 13.6 11V4.8a1.6 1.6 0 1 0-3.2 0V11L3 15.5v2.1l7.4-2.3v4.2l-2.2 1.5v1.4l3.8-1 3.8 1v-1.4l-2.2-1.5v-4.2l7.4 2.3v-2.1z" />
    </svg>
  ),
  /** Naturaleza / aire limpio / calidad de vida. */
  hoja: (
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M20 4c0 9-5.5 14-11.5 14A5.5 5.5 0 0 1 3 12.5C3 7 9 4 20 4z" strokeLinejoin="round" />
      <path d="M4.5 21C7 15 12 11 18 8.5" strokeLinecap="round" />
    </svg>
  ),
  /** Dinero / crédito / capacidad de pago. */
  moneda: (
    <svg width="58%" height="58%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 6.6v10.8M14.9 9.2c-.7-.8-1.8-1.1-2.9-1.1-1.6 0-2.9.8-2.9 2.1 0 3 5.8 1.6 5.8 4.5 0 1.4-1.3 2.2-2.9 2.2-1.2 0-2.3-.4-3-1.2" strokeLinecap="round" />
    </svg>
  ),
} as const;

// ── Cifras ───────────────────────────────────────────────────────────────────

/** Separador de miles sin depender del locale del render (determinista). */
/** Reexportada de `formato.ts` (era idéntica a `formatea` salvo el nombre). */
import { formatea as formateaN } from "../formato";
export { formateaN };

/**
 * El dato como argumento, en clave editorial.
 *
 * Existe aparte del `Contador` de la biblioteca general porque aquél está
 * calibrado para fondo oscuro: nace blanco (`theme.text`) y lleva un halo de
 * 70 px que sobre papel beige se ve como una mancha. Aquí la cifra es tinta o
 * naranja, sin resplandor, y en SERIF — que es la firma del formato.
 *
 * El número SE FORMA (outCubic): el ojo mide el recorrido, no el resultado. Por
 * eso `de` importa tanto como `a`.
 */
export const CifraContada: React.FC<{
  de?: number;
  a: number;
  at?: number;
  dur?: number;
  decimales?: number;
  prefijo?: string;
  sufijo?: string;
  color?: string;
  px?: number;
  punch?: boolean;
}> = ({ de = 0, a, at = 0, dur = 34, decimales = 0, prefijo = "", sufijo = "", color = N.tinta, px, punch = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - at;
  const v = interpolate(f, [0, dur], [de, a], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.outCubic,
  });
  // Golpe al ATERRIZAR: solo en la cifra clave. Si todas lo hacen, ninguna destaca.
  const golpe =
    punch && f >= dur ? interpolate(spring({ frame: f - dur, fps, config: SPRING.punch }), [0, 1], [1.12, 1]) : 1;
  return (
    <span
      style={{
        ...T.cifra,
        fontSize: px ?? T.cifra.fontSize,
        color,
        display: "inline-block",
        transform: `scale(${golpe})`,
      }}
    >
      {prefijo}
      {formateaN(v, decimales)}
      {sufijo}
    </span>
  );
};

// ── Cronología ───────────────────────────────────────────────────────────────

/**
 * Línea de tiempo vertical entre dos hitos: la cámara "viaja" de un año al otro.
 *
 * En la referencia el viaje es de 2026 a 2018 — hacia ATRÁS. Esa dirección es
 * información (motion-graphics §continuidad causal: arriba = presente, abajo =
 * pasado), así que el orden del array manda: el primer hito es de donde sales.
 *
 * La línea se dibuja mecánicamente (linear), no con easing: con easing mentiría
 * sobre la velocidad del recorrido temporal.
 */
export const Cronologia: React.FC<{
  hitos: { año: string; texto: string }[];
  at?: number;
  dur?: number;
  alto?: number;
}> = ({ hitos, at = 0, dur = 30, alto = 560 }) => {
  const frame = useCurrentFrame();
  const f = frame - at;
  const p = interpolate(f, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Los hitos se centran sobre su punto del raíl, así que el primero y el
  // último sobresalen media altura. `respiro` reserva ese espacio dentro del
  // bloque: sin él, el hito de arriba se sube encima del kicker de la toma.
  const respiro = 70;
  const util = alto - respiro * 2;
  const RAIL = 44;

  return (
    <div style={{ position: "relative", height: alto, width: 780 }}>
      {/* Raíl punteado completo: el recorrido que existe */}
      <div
        style={{
          position: "absolute",
          left: RAIL,
          top: respiro,
          height: util,
          width: 3,
          backgroundImage: `repeating-linear-gradient(180deg, ${N.linea} 0 10px, transparent 10px 22px)`,
        }}
      />
      {/* Raíl recorrido: dónde va la cabeza */}
      <div
        style={{ position: "absolute", left: RAIL, top: respiro, height: util * p, width: 3, background: N.naranja }}
      />
      {hitos.map((h, i) => {
        const enPos = hitos.length > 1 ? i / (hitos.length - 1) : 0;
        const alcanzado = p >= enPos - 0.02;
        const op = interpolate(p, [enPos - 0.08, enPos + 0.02], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={h.año}
            style={{
              position: "absolute",
              top: respiro + util * enPos,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              gap: 32,
              transform: "translateY(-50%)",
              opacity: op,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                marginLeft: RAIL - 13,
                borderRadius: "50%",
                background: alcanzado ? N.naranja : N.papel,
                border: `4px solid ${N.naranja}`,
                boxShadow: N.sombraCorta,
                flexShrink: 0,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "left", maxWidth: 600 }}>
              <span style={{ fontFamily: T.cifra.fontFamily, fontSize: 78, fontWeight: 700, color: N.tinta, lineHeight: 1 }}>
                {h.año}
              </span>
              <span style={{ ...T.etiqueta, fontSize: 34, lineHeight: 1.2 }}>{h.texto}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Medidores ────────────────────────────────────────────────────────────────

/**
 * Slider de valor con número que fluctúa: el gesto de "mira lo que te queda".
 *
 * En la referencia son dos: Control (60 % → 0 %) y Profit ($500 → $100). La
 * gracia está en que el número BAJA mientras el usuario mira: el recorrido es
 * el argumento, no el valor final (motion-graphics §Contador).
 *
 * `formato` recibe el valor interpolado y devuelve el texto — así el mismo
 * componente sirve para porcentajes, dólares o multiplicadores.
 */
export const Medidor: React.FC<{
  label: string;
  de: number;
  a: number;
  at?: number;
  dur?: number;
  max?: number;
  formato?: (v: number) => string;
  color?: string;
}> = ({ label, de, a, at = 0, dur = 30, max, formato = (v) => `${Math.round(v)}`, color = N.naranja }) => {
  const frame = useCurrentFrame();
  const f = frame - at;
  const v = interpolate(f, [0, dur], [de, a], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.outCubic,
  });
  const tope = max ?? Math.max(de, a);
  const p = tope > 0 ? Math.max(0, Math.min(1, v / tope)) : 0;
  const op = interpolate(f, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ width: 760, opacity: op }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <span style={{ ...T.kicker, fontSize: 30 }}>{label}</span>
        <span
          style={{
            fontFamily: T.cifra.fontFamily,
            fontSize: 70,
            fontWeight: 700,
            color,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formato(v)}
        </span>
      </div>
      <div style={{ position: "relative", height: 16, borderRadius: 999, background: alfaN("#111111", 0.1) }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${p * 100}%`,
            borderRadius: 999,
            background: color,
          }}
        />
        {/* Puño del slider: lo que convierte una barra en un control. */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${p * 100}%`,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: N.hueso,
            border: `5px solid ${color}`,
            boxShadow: N.sombraCorta,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
};
