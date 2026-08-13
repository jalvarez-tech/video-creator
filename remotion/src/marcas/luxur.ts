/**
 * PROPIEDADES LUXUR — el perfil de un canal.
 *
 * Inmobiliaria colombiana; el formato dominante son shorts verticales de
 * noticias sobre compraventa de vivienda. Papel beige, un solo color vivo
 * (naranja) y San Francisco: elegancia por contención, no por adorno.
 *
 * QUÉ ES ESTE ARCHIVO Y QUÉ NO. Es DATO, no código: un objeto `Marca` y nada
 * más. El motor no lo importa —no conoce ningún canal— y por eso dar de alta un
 * segundo canal es escribir un fichero hermano de éste, no tocar el motor.
 * Quien lo pasa es la COMPOSICIÓN:
 *
 *   <PistaNoticia tomas={noticia004} marca={LUXUR} />
 *   capa(dialectoEditorialDe(LUXUR), "noticia")     // planes nativos (006, 007)
 *   fondos={fondosNoticiaDe(LUXUR)}                 // <PistaGraficos> a pelo
 *
 * DE DÓNDE SALEN LOS VALORES. De `MARCA_BASE`, que es el suelo del motor y
 * arrastra los colores con los que este repo lleva pintando desde el principio
 * —que son, históricamente, los de este canal—. Se hereda en vez de copiarse
 * para que no haya dos verdades sobre el mismo hex; lo que este archivo declara
 * es lo que de verdad IDENTIFICA al canal: su nombre y su sello. El día que el
 * paso 8 quite los `N.naranja` por defecto de `Editorial.tsx`, `MARCA_BASE` se
 * podrá vaciar y entonces este archivo pasará a declarar la paleta entera.
 *
 * LA LETRA DE LA CAPA DE GRÁFICOS. Este canal NO la declara, así que esa capa
 * usa su defecto: Inter (`LETRA_GRAFICOS`). No es un olvido ni una deuda — es
 * una decisión de legibilidad del dialecto, que se dibuja encima de vídeo que
 * no controla. Si algún día este canal quisiera su San Francisco también ahí,
 * se pide EXPRESAMENTE y con la tabla medida al lado:
 *
 *   letraPorCapa: {
 *     graficos: { display: SF, texto: SF, tablas: { 500: "sf500", … } },
 *   }
 *
 * Lo que sigue siendo deuda de verdad es `ColorMarca.acentoOscuro`: el teal de
 * plantilla que la capa de gráficos usa como acento, distinto del naranja de
 * este canal. Unificarlos mueve píxeles de las piezas de avatar ya publicadas,
 * así que es una decisión de dirección y no un efecto colateral.
 */
import { MARCA_BASE } from "../motor/marca";
import type { Marca } from "../motor/marca";

export const LUXUR: Marca = {
  ...MARCA_BASE,
  nombre: "Propiedades Luxur",
  /** El watermark de la píldora inferior, en TODOS los frames de la pieza. */
  sello: { texto: "PROPIEDADES LUXUR" },
};
