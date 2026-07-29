import { AbsoluteFill, useVideoConfig } from "remotion";
import { STAGGER } from "../motion";
import { Barras, BarraProgreso, Contador, ItemLista } from "./Datos";
import { Aparece, Barrido, Escena, Ranura } from "./Entradas";
import { G } from "./estilos";
import { Scrim } from "./Fondos";
import { Glitch } from "./Glitch";
import { GraficoCue, ZonaGrafico } from "./coreografia";
import { Particulas } from "./Particulas";
import { Panel3D, Escena3D } from "./Tarjeta3D";
import { Aspa, Check, Flecha, Rodea, Subrayado } from "./Trazo";
import { Cifra, Columna, Etiqueta, Kicker, Sello, Titular } from "./Texto";

/**
 * INTÉRPRETE de un plan de gráficos (`GraficoCue[]` → JSX).
 * Hermano de <CamaraVirtual> (plan de cámara) y <PistaSonido> (plan de sonido).
 *
 *   <PistaGraficos cues={graficos004} />
 *
 * No decide NADA: monta lo que dice el plan, en la zona que dice el plan, con la
 * entrada que dice el plan. Todas las decisiones viven en el archivo de datos,
 * que es donde se pueden leer de un vistazo y revisar con `revisaPlan()`.
 *
 * Cada cue se monta dentro de su <Escena>, es decir, dentro de un <Sequence>:
 * los componentes ven frames LOCALES (empiezan en 0). Por eso `dur` siempre es
 * "frames desde que aparece", nunca un frame absoluto de la composición.
 */

/**
 * Coloca el contenido según la zona; las bandas se derivan del alto real de la
 * comp (así el mismo plan sirve en 9:16 y en 16:9). `dy` ajusta dentro de la
 * banda: dos cues en la misma zona comparten sitio a propósito.
 */
const Zona: React.FC<{ zona: ZonaGrafico; dy?: number; children: React.ReactNode }> = ({ zona, dy = 0, children }) => {
  const { height } = useVideoConfig();
  if (zona === "pantalla") return <AbsoluteFill>{children}</AbsoluteFill>;
  if (zona === "centro")
    return (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", transform: `translateY(${dy}px)` }}>
        {children}
      </AbsoluteFill>
    );
  if (zona === "inferior")
    return <Ranura bottom={Math.round(height * 0.16) - dy}>{children}</Ranura>;
  return <Ranura top={Math.round(height * 0.11) + dy}>{children}</Ranura>;
};

/** Aplica la entrada declarada. `corte` monta sin animación: es una decisión válida. */
const Entrada: React.FC<{ cue: GraficoCue; children: React.ReactNode }> = ({ cue, children }) => {
  if (cue.entrada === "corte") return <>{children}</>;
  if (cue.entrada === "barrido")
    return (
      <Barrido at={0} dur={cue.dur ?? 4} barra={cue.color ?? G.teal}>
        {children}
      </Barrido>
    );
  return (
    <Aparece at={0} y={cue.zona === "inferior" ? 26 : -26} desenfoque={cue.jerarquia === "hero" ? 8 : 0}>
      {children}
    </Aparece>
  );
};

/** Un cue → su primitiva. Aquí solo hay traducción, ninguna decisión de diseño. */
const Grafico: React.FC<{ cue: GraficoCue }> = ({ cue }) => {
  const len = cue.endFrame - cue.startFrame;
  switch (cue.tipo) {
    case "kicker":
      return <Kicker color={cue.color} px={cue.px}>{cue.texto}</Kicker>;
    case "titular":
      return (
        <Columna gap={16}>
          {cue.texto2 ? <Kicker color={cue.color}>{cue.texto2}</Kicker> : null}
          <Titular color={cue.color} px={cue.px}>{cue.texto}</Titular>
        </Columna>
      );
    case "cifra":
      return (
        <Columna gap={10}>
          <Cifra color={cue.color} px={cue.px}>{cue.texto ?? cue.valor}</Cifra>
          {cue.texto2 ? <Etiqueta>{cue.texto2}</Etiqueta> : null}
        </Columna>
      );
    case "contador":
      return (
        <Columna gap={10}>
          <Contador
            de={cue.de ?? 0}
            a={cue.valor ?? 0}
            dur={cue.dur ?? Math.min(45, len - 10)}
            prefijo={cue.prefijo}
            sufijo={cue.sufijo}
            color={cue.color}
            px={cue.px}
            punch={cue.jerarquia === "hero"}
          />
          {cue.texto ? <Etiqueta>{cue.texto}</Etiqueta> : null}
        </Columna>
      );
    case "sello":
      return (
        <Sello>
          {cue.texto2 ? <Kicker color={cue.color}>{cue.texto2}</Kicker> : null}
          <Etiqueta px={cue.px}>{cue.texto}</Etiqueta>
        </Sello>
      );
    case "lista":
      return (
        <Columna gap={22} estilo={{ alignItems: "flex-start" }}>
          {(cue.lineas ?? []).map((l, i) => (
            <ItemLista key={l} indice={i} paso={cue.dur ?? STAGGER.lista} color={cue.color} px={cue.px}>
              {l}
            </ItemLista>
          ))}
        </Columna>
      );
    case "barras":
      return <Barras datos={cue.datos ?? []} dur={cue.dur ?? 24} color={cue.color} alto={cue.alto ?? 420} />;
    case "barra":
      return (
        <Columna gap={16}>
          {cue.texto ? <Etiqueta>{cue.texto}</Etiqueta> : null}
          <BarraProgreso valor={cue.valor ?? 0} dur={cue.dur ?? 30} ancho={cue.ancho ?? 720} color={cue.color} />
        </Columna>
      );
    case "subrayado":
      return <Subrayado ancho={cue.ancho ?? 520} dur={cue.dur ?? 18} color={cue.color} />;
    case "rodea":
      return <Rodea ancho={cue.ancho ?? 520} alto={cue.alto ?? 180} dur={cue.dur ?? 26} color={cue.color} />;
    case "flecha":
      return (
        <Flecha
          de={cue.desde ?? [0, 0]}
          a={cue.hasta ?? [400, 200]}
          dur={cue.dur ?? 20}
          color={cue.color}
        />
      );
    case "check":
      return <Check tam={cue.px ?? 120} dur={cue.dur ?? 14} color={cue.color} />;
    case "aspa":
      return <Aspa tam={cue.px ?? 120} dur={cue.dur ?? 10} color={cue.color} />;
    case "particulas":
      return (
        <Particulas
          n={cue.valor ?? 48}
          modo={cue.modo ?? "estallido"}
          dur={cue.dur ?? len}
          semilla={cue.id}
          colores={cue.color ? [cue.color] : undefined}
        />
      );
    case "glitch":
      return (
        <Glitch at={0} dur={cue.dur ?? len} semilla={cue.id}>
          <Titular color={cue.color} px={cue.px}>{cue.texto}</Titular>
        </Glitch>
      );
    case "panel":
      return (
        <Escena3D>
          <Panel3D ancho={cue.ancho ?? 820} alto={cue.alto ?? 460} brillo={cue.color ?? G.teal}>
            {cue.texto2 ? <Kicker color={cue.color}>{cue.texto2}</Kicker> : null}
            <Titular px={cue.px ?? 72}>{cue.texto}</Titular>
          </Panel3D>
        </Escena3D>
      );
    default:
      return null;
  }
};

/**
 * Monta el plan completo. El orden del array ES el z-order (lo último, encima),
 * igual que en el resto del sistema: si un gráfico debe ir por debajo de otro,
 * muévelo en el plan, no le pongas zIndex.
 */
export const PistaGraficos: React.FC<{ cues: GraficoCue[] }> = ({ cues }) => (
  <>
    {cues.map((cue) => (
      <Escena key={cue.id} from={cue.startFrame} to={cue.endFrame} nombre={`gfx:${cue.id}`}>
        {cue.zona === "inferior" && cue.scrim !== false ? (
          <Aparece at={0} rampa={3}>
            <Scrim alto={620} />
          </Aparece>
        ) : null}
        <Zona zona={cue.zona} dy={cue.dy}>
          {cue.tipo === "particulas" || cue.tipo === "glitch" ? (
            <Grafico cue={cue} />
          ) : (
            <Entrada cue={cue}>
              <Grafico cue={cue} />
            </Entrada>
          )}
        </Zona>
      </Escena>
    ))}
  </>
);
