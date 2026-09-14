#!/usr/bin/env node
/**
 * PUERTA DEL 009 — la del formato montaje, con lo que este reel ya tiene dicho.
 *
 *   node proyectos/009/revisar-009.mjs
 *
 * El 009 no tuvo puerta: fue el primer reel de b-roll y se revisó por frames.
 * Pasado por la genérica (`remotion/src/motor/metraje/revisar-metraje.mjs`)
 * salen tres cosas, y las tres se DECLARAN en vez de arreglarse porque el reel
 * está publicado:
 *
 *   · `c11-cta` repite el plano de la salsa, y es a propósito (cabecera de
 *     `metraje-009.ts`).
 *   · Dos franjas negras de unos frames que la revisión por frames no vio,
 *     porque ningún frame revisado caía en ellas: el whip de `c04-papas` entra
 *     con menos zoom del que su desplazamiento necesita, y `c08-porciones` pide
 *     más `pan` del que cubre su escala inicial (§encuadre en `corte.ts`).
 *     Arreglarlas mueve píxeles del 009.
 *
 * El whip no es del formato, así que la puerta lo mide ejecutando la misma
 * función que lo pinta (`entradas-009.ts`), cargada junto al plan.
 *
 * Si el 009 se vuelve a renderizar con las franjas corregidas, sus dos
 * excepciones sobran, y la puerta falla hasta que se quiten.
 *
 * Sale con 1 si algo falla. No necesita Remotion: ejecuta los datos, no el JSX.
 */
import { abrePuerta } from "../../remotion/src/motor/metraje/revisar-metraje.mjs";

const puerta = await abrePuerta({
  proyecto: "009",
  plan: "remotion/src/proyectos/009/metraje-009.ts",
  cortes: "metraje009",
  extras: { entradas: "remotion/src/proyectos/009/entradas-009.ts" },
});

puerta.seccion("1. línea de tiempo");
puerta.lineaDeTiempo();

puerta.seccion("2. metraje disponible");
puerta.metrajeDisponible();

puerta.seccion("3. tramos disjuntos");
puerta.tramosDisjuntos({
  declarados: {
    "c11-cta":
      "repetición a propósito: bajo la tarjeta de dirección el metraje va al 45 % y cierra con el gesto que abrió el clímax",
  },
});

puerta.seccion("4. encuadre");
puerta.encuadre({
  entradas: puerta.modulos.entradas.ENTRADAS_009,
  declarados: {
    "c04-papas": "PUBLICADO así; arreglarlo mueve píxeles del 009",
    "c08-porciones": "PUBLICADO así; arreglarlo mueve píxeles del 009",
  },
});

puerta.cierra("el plan del 009 pasa las cuatro puertas");
