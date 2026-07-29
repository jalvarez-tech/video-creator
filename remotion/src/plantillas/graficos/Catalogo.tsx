import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CATALOGO, FichaGrafico } from "./fichas";
import { Barras, BarraProgreso, Contador, ItemLista, Regla } from "./Datos";
import { Aparece, Barrido, Escena, Latido, Ranura } from "./Entradas";
import { alfa, FONT, G, SOMBRA } from "./estilos";
import { Halo, Puntos, Rejilla, Resplandor, Scrim, Vineta } from "./Fondos";
import { Aberracion, Glitch, Scanlines } from "./Glitch";
import { Particulas } from "./Particulas";
import { Capas3D, Escena3D, Panel3D, Tarjeta3D } from "./Tarjeta3D";
import { Chip, Cifra, Columna, Etiqueta, Kicker, Sello, Tachado, Titular } from "./Texto";
import { Aspa, Check, Flecha, Rodea, Subrayado, Trazo } from "./Trazo";

/**
 * CATÁLOGO VIVO — el escaparate de la biblioteca, dentro del Studio.
 *
 * Cada ficha de `catalogo.ts` ocupa `PASO` frames: se navega arrastrando la
 * cabeza lectora del Studio, y cada gráfico se ve ANIMÁNDOSE DE VERDAD, no en
 * una captura. Es la respuesta a "¿esto ya existe?" antes de escribir nada.
 *
 * Se eligió el Studio y no una app aparte (Next.js + @remotion/player, como el
 * repo de referencia) porque el Studio YA es el reproductor del sistema: montar
 * un segundo stack solo para navegar la biblioteca añade mantenimiento sin
 * añadir información. Para leer el catálogo fuera del Studio está el markdown
 * que genera `manuales/motion-graphics/generar-catalogo.mjs`.
 */

/** Frames por ficha (a 30 fps = 3 s). */
export const PASO = 90;

/** Lienzo de pruebas: relativo y con recorte, para que las capas AbsoluteFill se queden dentro. */
const Escenario: React.FC<{ children: React.ReactNode; fondo?: string }> = ({ children, fondo = "#0B0F1A" }) => (
  <div
    style={{
      position: "relative",
      width: 980,
      height: 620,
      borderRadius: 24,
      overflow: "hidden",
      background: fondo,
      border: `1px solid ${G.linea}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

/** Fondo de "vídeo" simulado, para demostrar las capas que van sobre el avatar. */
const FalsoVideo: React.FC = () => (
  <>
    <Resplandor color={G.amber} cx={38} cy={40} intensidad={0.35} />
    <Resplandor color={G.teal} cx={72} cy={66} intensidad={0.28} />
    <Puntos opacidad={0.06} />
  </>
);

const DEMOS: Record<string, React.FC> = {
  // ── Estructura y entradas ──
  Escena: () => {
    const f = useCurrentFrame();
    return (
      <Columna gap={18}>
        <Kicker>frame local dentro de la escena</Kicker>
        <Cifra px={150}>{f}</Cifra>
      </Columna>
    );
  },
  Aparece: () => (
    <Aparece at={8} y={60} desenfoque={12}>
      <Titular px={80}>Aparece</Titular>
    </Aparece>
  ),
  Barrido: () => (
    <Barrido at={8} dur={8} barra={G.cyan}>
      <Titular px={80}>Barrido duro</Titular>
    </Barrido>
  ),
  Latido: () => (
    <Latido amplitud={0.03} periodo={30}>
      <Cifra px={170} color={G.green}>
        200
      </Cifra>
    </Latido>
  ),
  Ranura: () => (
    <div style={{ position: "relative", width: 300, height: 533, border: `1px dashed ${G.tenue}`, borderRadius: 12 }}>
      <Ranura top={40}>
        <Chip px={22}>banda alta</Chip>
      </Ranura>
      <Ranura bottom={70}>
        <Chip px={22} color={G.amber}>
          banda de subtítulos
        </Chip>
      </Ranura>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: FONT, color: G.tenue, fontSize: 26 }}>cara (R08)</span>
      </div>
    </div>
  ),

  // ── Tipografía ──
  Kicker: () => <Kicker px={44}>Antetítulo de sección</Kicker>,
  Titular: () => <Titular px={92}>El mensaje va aquí</Titular>,
  Cifra: () => (
    <Columna gap={8}>
      <Cifra px={220} color={G.cyan}>
        87%
      </Cifra>
      <Etiqueta>de los leads no contesta</Etiqueta>
    </Columna>
  ),
  Etiqueta: () => <Etiqueta px={54}>Frase de apoyo</Etiqueta>,
  Sello: () => (
    <Sello>
      <Kicker px={26}>ahorro estimado</Kicker>
      <Etiqueta px={54}>4 h / semana</Etiqueta>
    </Sello>
  ),
  Chip: () => (
    <div style={{ display: "flex", gap: 18 }}>
      <Chip color={G.green}>incluido</Chip>
      <Chip color={G.red}>fuera</Chip>
      <Chip color={G.amber}>opcional</Chip>
    </div>
  ),
  Tachado: () => {
    const f = useCurrentFrame();
    return <Tachado progreso={Math.min(1, Math.max(0, (f - 10) / 16))} px={64}>Más anuncios</Tachado>;
  },

  // ── Fondos ──
  Scrim: () => {
    const f = useCurrentFrame();
    return (
      <>
        <FalsoVideo />
        <Scrim alto={300} opacidad={Math.min(1, f / 4)} />
        <Ranura bottom={70}>
          <Etiqueta px={52}>texto legible sobre el vídeo</Etiqueta>
        </Ranura>
      </>
    );
  },
  Vineta: () => (
    <>
      <FalsoVideo />
      <Vineta intensidad={0.75} />
    </>
  ),
  Rejilla: () => (
    <>
      <Rejilla color={G.teal} opacidad={0.12} paso={54} />
      <Kicker px={34}>rejilla · blueprint</Kicker>
    </>
  ),
  Puntos: () => (
    <>
      <Puntos opacidad={0.16} paso={38} />
      <Kicker px={34}>trama de puntos</Kicker>
    </>
  ),
  Resplandor: () => {
    const f = useCurrentFrame();
    return (
      <>
        <Resplandor color={G.teal} cx={30 + (f / PASO) * 40} cy={45} intensidad={0.4} pulso={0.06} />
        <Kicker px={34}>la luz deriva: misma sala, otro ángulo</Kicker>
      </>
    );
  },
  Halo: () => (
    <Halo color={G.amber} radio={340} intensidad={0.5}>
      <Cifra px={200} color={G.amber}>
        €
      </Cifra>
    </Halo>
  ),

  // ── Datos ──
  Contador: () => (
    <Contador de={0} a={12480} at={6} dur={50} prefijo="€" color={G.green} px={170} punch />
  ),
  BarraProgreso: () => (
    <Columna gap={22}>
      <Etiqueta px={40}>presupuesto consumido</Etiqueta>
      <BarraProgreso valor={0.72} at={6} dur={34} ancho={760} alto={22} color={G.amber} pico={0.5} />
    </Columna>
  ),
  Barras: () => (
    <Barras
      at={6}
      alto={340}
      ancho={110}
      datos={[
        { etiqueta: "Ene", valor: 12 },
        { etiqueta: "Feb", valor: 19 },
        { etiqueta: "Mar", valor: 31, color: G.green },
        { etiqueta: "Abr", valor: 24 },
      ]}
    />
  ),
  ItemLista: () => (
    <Columna gap={26} estilo={{ alignItems: "flex-start" }}>
      {["Guion en 1 hora", "Avatar sin grabar", "Montaje automático"].map((t, i) => (
        <ItemLista key={t} indice={i} at={6} px={50}>
          {t}
        </ItemLista>
      ))}
    </Columna>
  ),
  Regla: () => (
    <Columna gap={16}>
      <Titular px={78}>Subrayado limpio</Titular>
      <Regla at={10} ancho={620} color={G.teal} dur={10} />
    </Columna>
  ),

  // ── Trazo ──
  Trazo: () => (
    <Trazo
      d="M 40 300 C 240 60, 460 540, 700 200 S 900 120, 940 260"
      ancho={980}
      alto={420}
      at={4}
      dur={40}
      color={G.cyan}
      grosor={10}
      cabeza
    />
  ),
  Subrayado: () => (
    <Columna gap={4}>
      <Titular px={86}>lo importante</Titular>
      <Subrayado ancho={520} at={12} dur={16} color={G.amber} />
    </Columna>
  ),
  Rodea: () => (
    <div style={{ position: "relative" }}>
      <Titular px={86}>este dato</Titular>
      <div style={{ position: "absolute", top: -50, left: -60 }}>
        <Rodea ancho={560} alto={210} at={8} dur={28} color={G.red} />
      </div>
    </div>
  ),
  Flecha: () => (
    <div style={{ position: "relative", width: 820, height: 380 }}>
      <div style={{ position: "absolute", left: 0, top: 150 }}>
        <Chip px={30}>problema</Chip>
      </div>
      <div style={{ position: "absolute", right: 0, top: 150 }}>
        <Chip px={30} color={G.green}>
          solución
        </Chip>
      </div>
      <Flecha de={[180, 175]} a={[640, 175]} curvatura={0.3} at={8} dur={24} color={G.teal} />
    </div>
  ),
  Check: () => <Check tam={260} at={6} dur={18} />,
  Aspa: () => <Aspa tam={240} at={6} dur={12} />,

  // ── Partículas ──
  Particulas: () => (
    <>
      <Particulas modo="ambiente" n={30} opacidad={0.5} semilla="cat-amb" />
      <Particulas modo="estallido" n={56} at={10} dur={70} semilla="cat-est" forma="cinta" />
      <Kicker px={34}>estallido + ambiente</Kicker>
    </>
  ),

  // ── 3D ──
  Escena3D: () => (
    <Escena3D perspectiva={900}>
      <div
        style={{
          width: 420,
          height: 300,
          background: G.tinta,
          border: `1px solid ${G.linea}`,
          borderRadius: 20,
          transform: "rotateY(28deg) rotateX(12deg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Kicker px={28}>perspective 900</Kicker>
      </div>
    </Escena3D>
  ),
  Tarjeta3D: () => (
    <Escena3D>
      <Tarjeta3D
        at={16}
        ancho={620}
        alto={380}
        frente={
          <>
            <Kicker px={26}>lo que crees</Kicker>
            <Titular px={62}>Falta tráfico</Titular>
          </>
        }
        dorso={
          <>
            <Kicker px={26}>lo que pasa</Kicker>
            <Titular px={62} color={G.green}>
              Falta respuesta
            </Titular>
          </>
        }
      />
    </Escena3D>
  ),
  Panel3D: () => (
    <Escena3D>
      <Panel3D at={6} ancho={700} alto={380} brillo={G.cyan}>
        <Kicker px={26}>llega desde el fondo</Kicker>
        <Titular px={64}>Panel3D</Titular>
      </Panel3D>
    </Escena3D>
  ),
  Capas3D: () => (
    <Escena3D perspectiva={1100}>
      <Capas3D separacion={110} giro={9} ancho={520} alto={420}>
        {[G.teal, G.cyan, G.amber].map((c, i) => (
          <div
            key={c}
            style={{
              width: 380 - i * 40,
              height: 240 - i * 30,
              borderRadius: 18,
              border: `2px solid ${c}`,
              background: alfa(c, 0.1),
              boxShadow: `0 0 40px ${alfa(c, 0.35)}`,
            }}
          />
        ))}
      </Capas3D>
    </Escena3D>
  ),

  // ── Efectos ──
  Glitch: () => (
    // densidad alta a propósito: en el catálogo interesa VER el efecto; en una
    // pieza real se deja en 0.4-0.5 para que sean ráfagas y no ruido continuo.
    <Glitch at={10} dur={70} intensidad={1} densidad={0.85} semilla="cat-glitch">
      <Titular px={110}>SEÑAL</Titular>
    </Glitch>
  ),
  Scanlines: () => (
    <>
      <FalsoVideo />
      <Scanlines opacidad={0.3} paso={5} />
      <Kicker px={34}>textura de pantalla</Kicker>
    </>
  ),
  Aberracion: () => (
    <Aberracion separacion={5}>
      <Titular px={100}>Aberración</Titular>
    </Aberracion>
  ),
};

/** Ficha de texto a la derecha del escenario. */
const Ficha: React.FC<{ f: FichaGrafico; i: number }> = ({ f, i }) => (
  <div style={{ width: 760, display: "flex", flexDirection: "column", gap: 18, fontFamily: FONT }}>
    <span style={{ fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: G.teal }}>
      {f.familia} · {f.archivo}
    </span>
    <span style={{ fontSize: 84, fontWeight: 800, color: G.white, letterSpacing: -1, textShadow: SOMBRA.texto }}>
      {f.nombre}
    </span>
    <span style={{ fontSize: 34, lineHeight: 1.35, color: G.white }}>{f.que}</span>
    <span style={{ fontSize: 30, lineHeight: 1.4, color: G.apagado }}>{f.cuando}</span>
    {f.sonido ? (
      <span style={{ fontSize: 26, color: G.amber, letterSpacing: 1 }}>♪ {f.sonido}</span>
    ) : null}
    <span style={{ marginTop: "auto", fontSize: 24, color: G.tenue }}>
      {i + 1} / {CATALOGO.length} · arrastra la cabeza lectora para navegar
    </span>
  </div>
);

/**
 * Composición del catálogo. Duración = CATALOGO.length * PASO (ver Root.tsx).
 * Si añades una ficha sin demo, aparece el aviso en el escenario: es el
 * recordatorio de que la biblioteca y su escaparate van juntos.
 */
export const Catalogo: React.FC = () => (
  <AbsoluteFill style={{ background: "#07090F", fontFamily: FONT }}>
    <Rejilla color={G.teal} opacidad={0.035} paso={80} />
    {CATALOGO.map((f, i) => {
      const Demo = DEMOS[f.id];
      return (
        <Escena key={f.id} from={i * PASO} to={(i + 1) * PASO} nombre={`ficha:${f.id}`}>
          <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", gap: 60, padding: 70 }}>
            <Escenario>
              {Demo ? (
                <Demo />
              ) : (
                <Kicker px={30}>sin demo — añádela en Catalogo.tsx · DEMOS</Kicker>
              )}
            </Escenario>
            <Ficha f={f} i={i} />
          </AbsoluteFill>
        </Escena>
      );
    })}
  </AbsoluteFill>
);
