import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { alfa, BANDA_SUB, clamp01, FONT, hard, SAFE_X, SIM, SNAP, W, wipe } from "./mundo-003";

/**
 * MOTION GRAPHICS del proyecto 003 — vectores mecánicos sobre el fondo plano.
 * Guía: manuales/motion-graphics/SKILL.md · director-video/SKILL.md.
 *
 * LEY DE MOVIMIENTO (la firma de la pieza): el fondo está quieto (degradado plano,
 * luz derivando muy despacio); todo lo que hay aquí encima entra DE GOLPE. La
 * tipografía nunca hace fade: aparece con un barrido duro de `SNAP` frames
 * (0.15 s = 4 @25fps) y se va con un corte seco. Nada de spring, nada de rebote.
 *
 * COLOR = INFORMACIÓN (simbología en mundo-003 · `SIM`). No hay ni un color
 * decorativo: cada elemento toma el color de LO QUE SIGNIFICA.
 *   · rojo   #FF453A → se va · falla · se descarta
 *   · verde  #25D366 → el mensaje que llega · el lead que se salva (verde WhatsApp)
 *   · ámbar  #FFB020 → el dato neutro · lo que pones de tu bolsillo
 *   · gris   #8A929E → contexto, lo que no pide atención
 * Regla de aplicación: el HERO de la escena lleva su color simbólico a plena
 * saturación; los apoyos, el mismo color rebajado; el contexto, gris. Dos colores
 * simbólicos a la vez SOLO cuando la escena compara dos cosas de signo opuesto
 * (los 5 verdes entre los 95 rojos; HOY rojo frente a HACE 3 MESES verde).
 *
 * COMPOSICIÓN: dos tipos de toma, nunca mezcladas (sin split, sin PiP).
 *   · Sobre el avatar → SELLO en la BANDA DE SUBTÍTULOS (y ≈ 1340 px), con scrim
 *     inferior. El scrim OSCURECE: es lo único que se superpone al avatar, que
 *     va a color y con su exposición original.
 *   · Toma de gráfico → pantalla completa sobre el degradado plano (Fondo003);
 *     el avatar no se ve y la cámara reposa (mundo-003 · TOMAS_GRAFICAS).
 *
 * Frames absolutos @25 fps (comp 1153 f = el clip entero). Los tiempos salen de la
 * transcripción real del clip (proyectos/003/transcripcion.json), no del guion.
 */

const gris = (a: number): string => alfa(SIM.neutro, a);

// ── Primitivos ────────────────────────────────────────────────────────────────

/**
 * Entrada de tipografía: barrido duro de izquierda a derecha en `SNAP` frames.
 * NO es un fade — la opacidad salta a 1 en el primer frame y lo que progresa es
 * el recorte. Una línea viaja en el borde del barrido, en el color del elemento
 * que está entrando (el detalle mecánico también informa).
 *
 * OJO: antes de `at` el hijo se sigue montando (recortado al 100 %), no se
 * devuelve null. Así el bloque RESERVA su sitio y los elementos ya visibles no
 * se recolocan cuando entra el siguiente — un salto de maqueta se lee como error.
 */
const Snap: React.FC<{
  at: number;
  children: React.ReactNode;
  barra?: string;
  dur?: number;
}> = ({ at, children, barra, dur = SNAP }) => {
  const frame = useCurrentFrame();
  const p = wipe(frame, at, dur);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{ clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }}>{children}</div>
      {barra && frame >= at && p < 1 ? (
        <div
          style={{
            position: "absolute",
            top: "-4%",
            left: `${p * 100}%`,
            width: 4,
            height: "108%",
            background: barra,
            boxShadow: `0 0 18px ${alfa(barra, 0.9)}`,
          }}
        />
      ) : null}
    </div>
  );
};

/** Regla que se extiende mecánicamente (lineal, sin easing), en su color simbólico. */
const Regla: React.FC<{ at: number; ancho: number; color: string; dur?: number; alto?: number }> = ({
  at,
  ancho,
  color,
  dur = 6,
  alto = 4,
}) => {
  const frame = useCurrentFrame();
  const w = ancho * wipe(frame, at, dur);
  return <div style={{ width: w, height: alto, background: color, boxShadow: `0 0 16px ${alfa(color, 0.5)}` }} />;
};

/**
 * Oscurece el TERCIO INFERIOR para que el sello sea legible en la banda de
 * subtítulos. Con el avatar sin gradar y las manos gesticulando justo ahí, este
 * degradado aporta todo el contraste del texto: por eso llega casi opaco.
 * Entra en 4 frames (un scrim instantáneo se vería como un parpadeo negro) y
 * SALE de golpe, con el texto: si se fundiera, los últimos frames del sello se
 * leerían sobre las manos. Se va todo junto = corte, no desvanecido.
 */
const ScrimInf: React.FC<{ from: number; to: number; alto?: number }> = ({ from, to, alto = 830 }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  const p = interpolate(frame - from, [0, 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: alto,
        background:
          "linear-gradient(0deg, rgba(14,16,21,0.94) 0%, rgba(14,16,21,0.92) 58%, rgba(14,16,21,0.58) 80%, rgba(14,16,21,0) 100%)",
        opacity: p,
      }}
    />
  );
};

/** Bloque de sello en la banda de subtítulos: bajo el pecho, nunca sobre la cara. */
const Sello: React.FC<{ from: number; to: number; children: React.ReactNode; gap?: number }> = ({
  from,
  to,
  children,
  gap = 16,
}) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return (
    <>
      <ScrimInf from={from} to={to} />
      <div
        style={{
          position: "absolute",
          top: BANDA_SUB.top,
          left: SAFE_X,
          right: SAFE_X,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap,
          fontFamily: FONT,
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </>
  );
};

/** Toma a pantalla completa: centrado vertical sobre el degradado, sin fondo propio. */
const TomaGrafico: React.FC<{ from: number; to: number; children: React.ReactNode; gap?: number }> = ({
  from,
  to,
  children,
  gap = 0,
}) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: SAFE_X,
        paddingRight: SAFE_X,
        fontFamily: FONT,
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap, width: "100%" }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

/** Contexto: gris por defecto. Si lleva color, es porque APOYA a un hero de ese color. */
const Kicker: React.FC<{ children: React.ReactNode; px?: number; color?: string }> = ({
  children,
  px = 34,
  color = gris(0.82),
}) => (
  <span style={{ fontSize: px, fontWeight: 700, letterSpacing: px * 0.2, textTransform: "uppercase", color }}>
    {children}
  </span>
);

/** Palabra clave. `color` es OBLIGATORIO: no hay tipografía clave sin significado. */
const Clave: React.FC<{ children: React.ReactNode; px: number; color: string }> = ({ children, px, color }) => (
  <span
    style={{
      fontSize: px,
      fontWeight: 700,
      letterSpacing: -px * 0.035,
      lineHeight: 1.02,
      whiteSpace: "nowrap",
      textTransform: "uppercase",
      color,
      fontVariantNumeric: "tabular-nums",
      textShadow: `0 0 54px ${alfa(color, 0.4)}`,
    }}
  >
    {children}
  </span>
);

// ── S0 · Hook: "…está hecho para DESHACERTE" (sello, 4.20 s) ──────────────────
// DESHACERTE = descarte → ROJO. Es la misma idea que cierra la pieza (DESCARTA),
// así que comparten color: el espectador cierra el círculo sin que se lo digan.

const S0Deshacerte: React.FC = () => (
  <Sello from={98} to={178} gap={14}>
    <Snap at={98}>
      <Kicker px={32}>Tu embudo está hecho para</Kicker>
    </Snap>
    <Snap at={105} barra={SIM.perdida}>
      <Clave px={104} color={SIM.perdida}>
        Deshacerte
      </Clave>
    </Snap>
    <Regla at={110} ancho={430} color={SIM.perdida} />
  </Sello>
);

// ── S1 · Dato: de cada 100 clics, 95 no compran (toma de gráfico 198–313) ─────
// La única escena con dos colores simbólicos a la vez, porque compara: los 95 que
// se van (ROJO) contra los 5 que compran (VERDE). El 100 de partida es ÁMBAR
// porque es lo que pagas.

/** Los 5 que sí compran. Elegidos fijos (determinismo) y repartidos por la malla. */
const SOBREVIVEN = new Set([7, 23, 46, 68, 91]);
const COLS = 10;
const CELDA = 66;
const PUNTO = 24;

const Malla: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "relative",
        width: COLS * CELDA,
        height: COLS * CELDA,
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${CELDA}px)`,
        gridTemplateRows: `repeat(${COLS}, ${CELDA}px)`,
      }}
    >
      {Array.from({ length: 100 }, (_, i) => {
        // llenado: barrido mecánico rapidísimo, 100 puntos en ~27 frames
        const entra = 211 + i * 0.27;
        if (frame < entra) return <div key={i} />;
        const queda = SOBREVIVEN.has(i);
        // vaciado: los 95 se apagan en escalera y caen.
        // No desaparecen del todo: dejan un rastro rojo al 13 % para que la malla
        // de 100 siga legible — así se LEE "95 de 100", no "quedan 5 sueltos".
        const sale = 258 + ((i * 7) % 23) * 0.42;
        const p = queda ? 0 : clamp01((frame - sale) / 8);
        const dy = p * 26;
        const op = 1 - p * 0.87;
        // Los 100 son IGUALES mientras son "clics que pagas" (ámbar): si los 5 que
        // compran salieran verdes desde el principio, destriparían el remate. El
        // color solo se revela en el drenaje: 95 → rojo (pérdida), 5 → verde.
        const revelado = frame >= 258;
        const color = queda
          ? revelado
            ? SIM.mensaje
            : alfa(SIM.dato, 0.72)
          : p > 0
            ? SIM.perdida
            : alfa(SIM.dato, 0.72);
        const marcado = queda && frame >= 262;
        const tam = marcado ? PUNTO + 6 : PUNTO;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: tam,
                height: tam,
                borderRadius: "50%",
                background: color,
                opacity: op,
                transform: `translateY(${dy}px)`,
                boxShadow: marcado ? `0 0 26px ${alfa(SIM.mensaje, 0.9)}` : "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const S1Dato: React.FC = () => (
  <TomaGrafico from={198} to={313} gap={64}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 22 }}>
      <Snap at={201}>
        <Kicker px={40}>De cada</Kicker>
      </Snap>
      <Snap at={211} barra={SIM.dato}>
        <Clave px={116} color={SIM.dato}>
          100
        </Clave>
      </Snap>
      <Snap at={228}>
        <Kicker px={40}>clics</Kicker>
      </Snap>
    </div>
    <Malla />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <Snap at={258} barra={SIM.perdida}>
        <Clave px={150} color={SIM.perdida}>
          95
        </Clave>
      </Snap>
      {/* el apoyo va en el rojo del hero, rebajado: se lee como una sola unidad */}
      <Snap at={276}>
        <Kicker px={40} color={alfa(SIM.perdida, 0.85)}>
          no te compran nunca
        </Kicker>
      </Snap>
    </div>
  </TomaGrafico>
);

// ── S2 · "Hace sólo 3 COSAS" (sello, 16.25 s) ─────────────────────────────────
// Las tres barras ya salen en los tres colores de las tres funciones: plantan la
// tríada rojo·ámbar·verde ANTES de las tarjetas, así cada tarjeta llega esperada.

const COLOR_FUNCION = [SIM.perdida, SIM.dato, SIM.mensaje] as const;

const S2TresCosas: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Sello from={397} to={433} gap={18}>
      <Snap at={398}>
        <Kicker px={32}>Hace sólo</Kicker>
      </Snap>
      <Snap at={407} barra={SIM.dato}>
        <Clave px={96} color={SIM.dato}>
          3 cosas
        </Clave>
      </Snap>
      <div style={{ display: "flex", gap: 16 }}>
        {[408, 411, 414].map((at, i) => (
          <div
            key={at}
            style={{
              width: 76,
              height: 6,
              background: COLOR_FUNCION[i],
              opacity: hard(frame, at),
              boxShadow: `0 0 14px ${alfa(COLOR_FUNCION[i], 0.6)}`,
            }}
          />
        ))}
      </div>
    </Sello>
  );
};

// ── S3 · Las tres tarjetas: DESCARTA / ORDENA / RECUPERA ──────────────────────
// Mismo molde exacto las tres veces (la repetición literal ES el mensaje: "hace
// sólo tres cosas") y lo único que cambia de verdad es EL COLOR, porque lo único
// que cambia de verdad es lo que hace cada función:
//   01 DESCARTA → rojo   (saca gente fuera)
//   02 ORDENA   → ámbar  (clasifica, no juzga)
//   03 RECUPERA → verde  (salva el lead que no estaba listo)

const Tarjeta: React.FC<{
  from: number;
  to: number;
  indice: number;
  verbo: string;
  descriptor: string;
}> = ({ from, to, indice, verbo, descriptor }) => {
  const color = COLOR_FUNCION[indice - 1];
  return (
    <TomaGrafico from={from} to={to} gap={26}>
      {/* progreso 01·02·03 con la tríada completa: la activa a plena saturación */}
      <div style={{ display: "flex", gap: 16, marginBottom: 22 }}>
        {COLOR_FUNCION.map((c, i) => (
          <div
            key={i}
            style={{
              width: 72,
              height: 6,
              background: i === indice - 1 ? c : alfa(c, 0.3),
              boxShadow: i === indice - 1 ? `0 0 16px ${alfa(c, 0.7)}` : "none",
            }}
          />
        ))}
      </div>
      <Snap at={from + 2}>
        <Kicker px={38} color={alfa(color, 0.9)}>{`0${indice}`}</Kicker>
      </Snap>
      <Snap at={from + 3} barra={color}>
        <Clave px={146} color={color}>
          {verbo}
        </Clave>
      </Snap>
      <Regla at={from + 7} ancho={520} color={color} />
      <Snap at={from + 12}>
        <Kicker px={40}>{descriptor}</Kicker>
      </Snap>
    </TomaGrafico>
  );
};

// ── S4 · El lead sin contexto (sello sobre el avatar, 25.20 s) ────────────────
// «Buenas, ¿precio?» es EL lead que hay que descartar → ROJO. Antes iba en gris
// y se leía como un dato neutro; en rojo se entiende que es el problema.

const S4Buenas: React.FC = () => (
  <Sello from={627} to={700} gap={14}>
    <Snap at={627}>
      <Kicker px={30}>Lo que llega hoy</Kicker>
    </Snap>
    <Snap at={630} barra={SIM.perdida}>
      {/* 64 px + nowrap: a 78 px partía en dos líneas (ver aprendizajes §8) */}
      <span
        style={{
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: -1,
          whiteSpace: "nowrap",
          textTransform: "uppercase",
          color: SIM.perdida,
          textShadow: `0 0 44px ${alfa(SIM.perdida, 0.35)}`,
        }}
      >
        «Buenas, ¿precio?»
      </span>
    </Snap>
  </Sello>
);

// ── S5 · "SE GUARDA" (sello, 31.98 s) ─────────────────────────────────────────
// El lead que no estaba listo NO se pierde → VERDE. Es el contrapunto exacto del
// rojo de «buenas, ¿precio?»: mismo sitio, mismo tamaño, significado opuesto.

const S5Guarda: React.FC = () => (
  <Sello from={793} to={819} gap={14}>
    <Snap at={793}>
      <Kicker px={32}>No se pierde</Kicker>
    </Snap>
    <Snap at={799} barra={SIM.mensaje}>
      <Clave px={110} color={SIM.mensaje}>
        Se guarda
      </Clave>
    </Snap>
  </Sello>
);

// ── S6 · Revelación: la línea de tiempo rota (toma de gráfico 819–995) ────────
// Segunda escena que compara: HOY (rojo, donde NO está el comprador) contra HACE
// 3 MESES (verde, donde sí estaba). El enlace punteado sale VERDE del pasado —
// es el mensaje que deberías haber mandado — y se corta a mitad de camino.

// El eje se mete hacia dentro (250/830) para que las etiquetas CENTRADAS bajo
// cada nodo quepan enteras dentro de la zona segura (SAFE_X = 118).
const EJE_X0 = 250;
const EJE_X1 = 830;
const EJE_Y = 1080;

const Nodo: React.FC<{ x: number; at: number; r: number; color: string; relleno: boolean }> = ({
  x,
  at,
  r,
  color,
  relleno,
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: EJE_Y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        border: `5px solid ${color}`,
        background: relleno ? color : W.bg,
        boxShadow: `0 0 30px ${alfa(color, 0.75)}`,
      }}
    />
  );
};

/** Etiqueta centrada bajo un nodo del eje (ancho fijo: nunca parte la línea). */
const EtiquetaNodo: React.FC<{ x: number; at: number; color: string; children: React.ReactNode }> = ({
  x,
  at,
  color,
  children,
}) => (
  <div style={{ position: "absolute", left: x - 190, top: EJE_Y + 52, width: 380, textAlign: "center" }}>
    <Snap at={at}>
      <span
        style={{
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          color,
        }}
      >
        {children}
      </span>
    </Snap>
  </div>
);

const S6Revelacion: React.FC = () => {
  const frame = useCurrentFrame();
  const from = 819;
  const to = 995;
  if (frame < from || frame >= to) return null;

  const eje = (EJE_X1 - EJE_X0) * wipe(frame, 842, 13);
  // el enlace intenta llegar de "hace 3 meses" a "hoy" y se corta al 38 %
  const enlace = (EJE_X1 - EJE_X0) * 0.38 * wipe(frame, 962, 13);

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {/* kicker */}
      <div style={{ position: "absolute", top: 500, left: SAFE_X, right: SAFE_X, display: "flex", justifyContent: "center" }}>
        <Snap at={823}>
          <Kicker px={38}>El que te compra este mes</Kicker>
        </Snap>
      </div>

      {/* statement — cambio DURO en 924: HOY (rojo) → HACE 3 MESES (verde) */}
      <div
        style={{
          position: "absolute",
          top: 660,
          left: SAFE_X,
          right: SAFE_X,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {frame < 924 ? (
          <>
            <Snap at={883}>
              <Clave px={80} color={gris(0.9)}>
                No te escribió
              </Clave>
            </Snap>
            <Snap at={910} barra={SIM.perdida}>
              <Clave px={104} color={SIM.perdida}>
                Hoy
              </Clave>
            </Snap>
          </>
        ) : (
          <>
            <Snap at={924}>
              <Clave px={80} color={gris(0.9)}>
                Te escribió hace
              </Clave>
            </Snap>
            <Snap at={928} barra={SIM.mensaje}>
              <Clave px={104} color={SIM.mensaje}>
                3 meses
              </Clave>
            </Snap>
          </>
        )}
      </div>

      {/* eje temporal: izquierda = pasado, derecha = ahora (continuidad §6) */}
      <div style={{ position: "absolute", left: EJE_X0, top: EJE_Y - 2, width: eje, height: 4, background: gris(0.5) }} />
      {[EJE_X0 + 193, EJE_X0 + 387].map((x) => (
        <div
          key={x}
          style={{
            position: "absolute",
            left: x,
            top: EJE_Y - 13,
            width: 3,
            height: 26,
            background: gris(0.38),
            opacity: hard(frame, 848 + (x - EJE_X0) / 115),
          }}
        />
      ))}
      {/* el enlace roto: el mensaje que sale del pasado (VERDE) y NO llega */}
      <div
        style={{
          position: "absolute",
          left: EJE_X0,
          top: EJE_Y - 4,
          width: enlace,
          height: 8,
          background: `repeating-linear-gradient(90deg, ${SIM.mensaje} 0 18px, transparent 18px 34px)`,
        }}
      />
      <Nodo x={EJE_X1} at={883} r={20} color={SIM.perdida} relleno={false} />
      <Nodo x={EJE_X0} at={924} r={26} color={SIM.mensaje} relleno />
      {/* tachón sobre HOY: no fue hoy */}
      {frame >= 910 ? (
        <div
          style={{
            position: "absolute",
            left: EJE_X1 - 38,
            top: EJE_Y - 3,
            width: 76 * wipe(frame, 910, 3),
            height: 6,
            background: SIM.perdida,
            transform: "rotate(-40deg)",
            transformOrigin: "center center",
          }}
        />
      ) : null}

      <EtiquetaNodo x={EJE_X0} at={928} color={alfa(SIM.mensaje, 0.95)}>
        Hace 3 meses
      </EtiquetaNodo>
      <EtiquetaNodo x={EJE_X1} at={887} color={alfa(SIM.perdida, frame >= 910 ? 0.6 : 0.95)}>
        Hoy
      </EtiquetaNodo>

      {/* remate del bloque: el fallo → ROJO */}
      <div
        style={{
          position: "absolute",
          top: 1330,
          left: SAFE_X,
          right: SAFE_X,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Snap at={964}>
          <Clave px={62} color={SIM.perdida}>
            Y nunca le
          </Clave>
        </Snap>
        <Snap at={968}>
          <Clave px={62} color={SIM.perdida}>
            volviste a hablar
          </Clave>
        </Snap>
      </div>
    </AbsoluteFill>
  );
};

// ── S7 · Remate: "el embudo no vende" → DESCARTA (sello, cambio duro) ─────────
// La creencia falsa va en GRIS (contexto que se corrige); la tesis en ROJO, el
// mismo del hook y de la tarjeta 01.

const S7Remate: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Sello from={1002} to={1060} gap={14}>
      {frame < 1037 ? (
        <Snap at={1004}>
          <Clave px={62} color={gris(0.9)}>
            El embudo no vende
          </Clave>
        </Snap>
      ) : (
        // cambio DURO en el mismo sitio: la tesis se queda con una sola palabra
        <Snap at={1037} barra={SIM.perdida}>
          <Clave px={140} color={SIM.perdida}>
            Descarta
          </Clave>
        </Snap>
      )}
    </Sello>
  );
};

// ── S8 · CTA: escríbeme EMBUDO ────────────────────────────────────────────────
// Es literalmente un mensaje de WhatsApp → todo el lockup en VERDE WhatsApp. Es
// el único sitio de la pieza donde el verde no significa "se salva" sino "aquí se
// escribe": las dos lecturas apuntan al mismo gesto, así que no hay ambigüedad.

const Glifo: React.FC<{ px?: number }> = ({ px = 46 }) => (
  <svg width={px} height={px} viewBox="0 0 24 24" fill="none" style={{ flex: "0 0 auto" }}>
    <path
      d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H9l-4 4v-4H6.5A2.5 2.5 0 0 1 4 12.5z"
      fill={SIM.mensaje}
    />
  </svg>
);

const S8Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const from = 1060;
  if (frame < from) return null;
  const caret = Math.floor((frame - from) / 9) % 2 === 0 ? 1 : 0;
  return (
    <>
      <ScrimInf from={from} to={2000} alto={880} />
      <div
        style={{
          position: "absolute",
          top: BANDA_SUB.top,
          left: SAFE_X,
          right: SAFE_X,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          fontFamily: FONT,
        }}
      >
        <Snap at={1063}>
          <Kicker px={30}>Escríbeme</Kicker>
        </Snap>
        <div
          style={{
            width: "100%",
            height: 108,
            borderRadius: 18,
            border: `2px solid ${alfa(SIM.mensaje, 0.55)}`,
            background: W.ink,
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "0 28px",
            opacity: hard(frame, 1063),
            boxShadow: `0 18px 50px rgba(0,0,0,0.55), 0 0 40px ${alfa(SIM.mensaje, 0.16)}`,
          }}
        >
          <Glifo />
          <Snap at={1079} barra={SIM.mensaje}>
            <span
              style={{
                fontSize: 62,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: SIM.mensaje,
                textShadow: `0 0 40px ${alfa(SIM.mensaje, 0.45)}`,
              }}
            >
              Embudo
            </span>
          </Snap>
          <div style={{ width: 4, height: 56, background: SIM.mensaje, opacity: caret * 0.9 }} />
        </div>
        <Snap at={1108}>
          <Kicker px={28}>Y te muestro el tuyo</Kicker>
        </Snap>
      </div>
    </>
  );
};

// ── Montaje ───────────────────────────────────────────────────────────────────

export const Motion003: React.FC = () => (
  <AbsoluteFill>
    <S0Deshacerte />
    <S1Dato />
    <S2TresCosas />
    <Tarjeta from={433} to={495} indice={1} verbo="Descarta" descriptor="Antes de que te escriba" />
    <Tarjeta from={539} to={601} indice={2} verbo="Ordena" descriptor="Llega con contexto" />
    <Tarjeta from={703} to={764} indice={3} verbo="Recupera" descriptor="No se pierde" />
    <S4Buenas />
    <S5Guarda />
    <S6Revelacion />
    <S7Remate />
    <S8Cta />
  </AbsoluteFill>
);
