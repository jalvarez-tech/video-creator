/**
 * BIBLIOTECA DE GRÁFICOS — punto de entrada único.
 *
 *   import { Titular, Contador, Subrayado, Particulas } from "./graficos";
 *
 * Qué hay dentro y por qué (mapa rápido; la ficha completa de cada pieza está
 * en `catalogo.ts` y se ve animada en la composición `Catalogo` del Studio):
 *
 *   estilos.ts      tokens de FORMA (color, sombra, escalas tipográficas)
 *   Entradas.tsx    el CUÁNDO aparece: Escena/Aparece/Barrido/Latido/Ranura
 *   Texto.tsx       los cuatro roles tipográficos + sello, chip y tachado
 *   Fondos.tsx      capas de atmósfera y legibilidad (scrim, viñeta, rejilla…)
 *   Datos.tsx       contador, barra, lista y gráfica de barras
 *   Trazo.tsx       todo lo DIBUJADO con @remotion/paths (subrayar, rodear, señalar)
 *   Particulas.tsx  sistema determinista de partículas (estallido/ambiente/lluvia)
 *   Tarjeta3D.tsx   la capa 3D CSS (volteo, panel que llega, paralaje por capas)
 *   Glitch.tsx      corrupción de señal como recurso puntual
 *   coreografia.ts  el plan de gráficos COMO DATOS (GraficoCue) + validador
 *   PistaGraficos   el intérprete de ese plan
 *
 * Regla de la casa: si vas a escribir un gráfico, mira antes si ya está aquí.
 * Y si escribes uno nuevo que sirva para más de una pieza, súbelo a la
 * biblioteca y añade su ficha al catálogo — es lo único que evita que dentro de
 * tres proyectos vuelvas a escribir el mismo contador desde cero.
 */

export * from "./estilos";
export * from "./Entradas";
export * from "./Texto";
export * from "./Fondos";
export * from "./Datos";
export * from "./Trazo";
export * from "./Particulas";
export * from "./Tarjeta3D";
export * from "./Glitch";
export * from "./coreografia";
export * from "./PistaGraficos";
export * from "./fichas";
export { Catalogo, PASO } from "./Catalogo";
