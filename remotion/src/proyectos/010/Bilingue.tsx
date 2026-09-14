/**
 * TEXTO BILINGÜE — subtítulos y rótulos del 010, sobre el mismo esqueleto.
 *
 * TODO EL TEXTO DE LA PIEZA COMPARTE UNA SOLA LÍNEA DE BASE (`ANCLA_ABAJO`), y
 * esa es la decisión que sostiene el resto. El bloque se ancla por ABAJO, nunca
 * por arriba: una frase de dos líneas y una de una línea acaban en el mismo
 * píxel, y el bloque no sube y baja entre corte y corte. Anclado por arriba —lo
 * que sale solo si no lo piensas— cada cambio de longitud mueve el texto, y en
 * 26 subtítulos eso es un temblor constante durante todo el vídeo.
 *
 * Como el rótulo de gancho y el de cierre usan la MISMA ancla, tampoco hay salto
 * cuando el gancho (5,86 s) cede el turno a los subtítulos: cambia el tamaño,
 * no el sitio.
 *
 * EL INGLÉS ES SEGUNDO Y TIENE QUE PARECERLO. 68 % del tamaño del español y algo
 * menos de blanco (0,88): en una línea de dos idiomas, si los dos pesan igual el
 * ojo no sabe cuál leer y acaba sin leer ninguno. El 68 % está dentro del 65-70 %
 * pedido y es el punto en que el inglés todavía se lee en un móvil a 1080.
 *
 * MÁRGENES SEGUROS. `bottom: 300` deja el 15,6 % inferior libre: en Reels y en
 * TikTok esa banda la ocupan el texto del post, el autor y los botones. Y el
 * ancho se limita al 88 % para no meterse bajo la columna de iconos de la
 * derecha.
 */
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Marca } from "../../motor/marca";
import type { Cue, Rotulo } from "./subtitulos-010";

const FUENTE = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif';

/** Píxeles desde el borde inferior hasta la base del bloque de texto. */
const ANCLA_ABAJO = 300;
/**
 * Debajo del `SelloCampana` (top 84 + alto ≈ 52 → acaba en 136).
 *
 * 196 y no 168: a 168 quedaban 32 px entre la píldora y el rótulo, y en el frame
 * renderizado los dos se leían como un solo bloque de marca —la nota perdía su
 * condición de frase y parecía el subtítulo del sello.
 */
const ANCLA_ARRIBA = 196;

const SOMBRA = "0 2px 10px rgba(0,0,0,0.92), 0 0 34px rgba(0,0,0,0.6)";

/**
 * El AZUL del inglés. Antes era blanco al 88 %.
 *
 * El azul hace el trabajo que hacía la opacidad —decir «esta es la segunda
 * voz»— pero mejor: separa los dos idiomas por HUE en vez de por brillo, así
 * que el inglés deja de parecer un español desvaído y el ojo distingue los dos
 * bloques de un vistazo, que es lo que hace falta cuando pasan en 2 segundos.
 *
 * MEDIDO, no elegido a ojo: 8,47:1 contra el velo inferior (el negro de marca
 * al 72 % sobre metraje de luma ~110). Se compararon cuatro tonos y este es el
 * punto donde todavía se lee AZUL y no se ha perdido contraste — el siguiente
 * hacia abajo (#7FC4E8) baja a 6,18:1 y sobre los planos claros empieza a
 * costar. Va a opacidad plena: la jerarquía ya la marcan el tamaño y el tono, y
 * restarle alfa encima solo quitaría legibilidad.
 */
const AZUL_EN = "#B8E0F5";

/**
 * Entrada/salida: fundido + 8 px de subida. Nada más — el encargo pide sobriedad.
 *
 * Se llama `useFundido` y no `usaFundido` aunque el resto del repo esté en
 * español: llama a hooks de Remotion, y `react-hooks/rules-of-hooks` solo
 * reconoce como hook lo que empieza por `use`. Con el nombre en español el
 * linter no puede vigilar que se llame siempre y en el mismo orden — que es
 * justo la garantía que aquí hace falta, porque hay frames sin subtítulo.
 */
const useFundido = (from: number, to: number, dentro = 0.18, fuera = 0.18) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  // `dentro = 0` significa «ya estás puesto en el primer fotograma». Igual que
  // `fuera = 0` más abajo, hay que tratarlo aparte: el rango [from, from] hace
  // reventar a `interpolate`, que es la forma ruidosa de un caso legítimo.
  const entra =
    dentro > 0
      ? interpolate(t, [from, from + dentro], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;
  // `fuera = 0` significa «no te apagues», y hay que tratarlo aparte: pasarle a
  // `interpolate` el rango [to, to] revienta («inputRange must be strictly
  // monotonically increasing»), que es la forma ruidosa de un caso legítimo.
  const sale =
    fuera > 0
      ? interpolate(t, [to - fuera, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : 1;
  const op = Math.min(entra, sale);
  // Sin fundido tampoco hay desplazamiento: los 8 px acompañan a la aparición,
  // y un texto que ya está puesto no aparece.
  const sube =
    dentro > 0
      ? interpolate(t, [from, from + dentro], [8, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  return { op, sube };
};

/**
 * El español con sus palabras destacadas.
 *
 * Se parte por espacios y se compara SIN signos de puntuación, porque la palabra
 * que carga la frase suele ser la última («No podemos olvidarlos.») y venía
 * pegada al punto: comparar el token crudo no casaba nunca y el ámbar no salía.
 */
const Espanol: React.FC<{ texto: string; destaca?: readonly string[]; color: string }> = ({
  texto,
  destaca,
  color,
}) => {
  if (!destaca?.length) return <>{texto}</>;
  const limpia = (s: string) => s.replace(/[.,;:¡!¿?"«»]/g, "").toLowerCase();
  const marcadas = new Set(destaca.map(limpia));
  return (
    <>
      {texto.split(" ").map((palabra, i) => (
        <React.Fragment key={i}>
          {i > 0 ? " " : ""}
          {marcadas.has(limpia(palabra)) ? <span style={{ color }}>{palabra}</span> : palabra}
        </React.Fragment>
      ))}
    </>
  );
};

const Bloque: React.FC<{
  es: React.ReactNode;
  en: string;
  tamEs: number;
  tamEn: number;
  pesoEs: number;
  espaciado?: number;
  marca: Marca;
}> = ({ es, en, tamEs, tamEn, pesoEs, espaciado = 0, marca }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: Math.round(tamEn * 0.32) }}>
    <div
      style={{
        fontFamily: FUENTE,
        fontSize: tamEs,
        fontWeight: pesoEs,
        letterSpacing: espaciado,
        lineHeight: 1.22,
        color: "#FFFFFF",
        textAlign: "center",
        textShadow: SOMBRA,
        whiteSpace: "pre-line",
      }}
    >
      {es}
    </div>
    <div
      style={{
        fontFamily: FUENTE,
        fontSize: tamEn,
        fontWeight: 600,
        letterSpacing: espaciado * 0.6,
        lineHeight: 1.24,
        color: AZUL_EN,
        textAlign: "center",
        textShadow: SOMBRA,
        whiteSpace: "pre-line",
      }}
    >
      {en}
    </div>
    {/* Filete ámbar: separa los dos idiomas sin meter una línea entre ellos.
     *  Va DEBAJO del bloque, no en medio, para no cortar la lectura vertical. */}
    <div style={{ width: 54, height: 3, borderRadius: 2, background: marca.color.acentoOscuro, opacity: 0.75 }} />
  </div>
);

export const SubtitulosBilingues: React.FC<{ cues: readonly Cue[]; marca: Marca }> = ({ cues, marca }) => {
  const f = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const t = f / fps;
  const activo = cues.find((c) => t >= c.from && t < c.to);

  // Los hooks tienen que llamarse SIEMPRE y en el mismo orden, también en los
  // frames sin subtítulo (gancho y cierre): por eso el fundido se calcula antes
  // del return y con una ventana inofensiva cuando no hay cue.
  const { op, sube } = useFundido(activo?.from ?? 0, activo?.to ?? 0, 0.18, 0.12);
  if (!activo) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: width * 0.06,
        right: width * 0.06,
        bottom: ANCLA_ABAJO,
        display: "flex",
        justifyContent: "center",
        opacity: op,
        transform: `translateY(${sube.toFixed(2)}px)`,
        pointerEvents: "none",
      }}
    >
      <Bloque
        es={<Espanol texto={activo.es} destaca={activo.destaca} color={marca.color.acentoOscuro} />}
        en={activo.en}
        tamEs={56}
        tamEn={38}
        pesoEs={800}
        marca={marca}
      />
    </div>
  );
};

const UnRotulo: React.FC<{ rotulo: Rotulo; marca: Marca }> = ({ rotulo, marca }) => {
  const { width } = useVideoConfig();
  const { op, sube } = useFundido(
    rotulo.from,
    rotulo.to,
    rotulo.entrada ?? 0.35,
    rotulo.salida ?? 0.3
  );
  const arriba = rotulo.donde === "arriba";
  const centro = rotulo.donde === "centro";
  const tam =
    rotulo.tono === "gancho"
      ? { es: 64, en: 43, peso: 900, esp: 1.2 }
      : rotulo.tono === "cierre"
        ? { es: 56, en: 38, peso: 800, esp: 0.8 }
        : { es: 33, en: 23, peso: 800, esp: 1.6 };

  return (
    <div
      style={{
        position: "absolute",
        left: width * 0.06,
        right: width * 0.06,
        // `centro` estira la caja de arriba abajo y centra dentro; los otros dos
        // anclan por un borde. Se centra respecto al CUADRO ENTERO y no respecto
        // al hueco libre entre los velos: el gancho no convive con nada, así que
        // el centro óptico y el geométrico coinciden.
        ...(centro
          ? { top: 0, bottom: 0, alignItems: "center" }
          : arriba
            ? { top: ANCLA_ARRIBA }
            : { bottom: ANCLA_ABAJO }),
        display: "flex",
        justifyContent: "center",
        opacity: op,
        transform: `translateY(${(arriba ? -sube : sube).toFixed(2)}px)`,
        pointerEvents: "none",
      }}
    >
      <Bloque
        es={rotulo.es}
        en={rotulo.en}
        tamEs={tam.es}
        tamEn={tam.en}
        pesoEs={tam.peso}
        espaciado={tam.esp}
        marca={marca}
      />
    </div>
  );
};

export const Rotulos: React.FC<{ rotulos: readonly Rotulo[]; marca: Marca }> = ({ rotulos, marca }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  return (
    <>
      {rotulos
        .filter((r) => t >= r.from - 0.4 && t < r.to + 0.4)
        .map((r) => (
          <UnRotulo key={`${r.from}-${r.donde}`} rotulo={r} marca={marca} />
        ))}
    </>
  );
};
