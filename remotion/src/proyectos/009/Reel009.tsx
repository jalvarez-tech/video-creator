/**
 * PROYECTO 009 — «Te reto a ver esto sin antojarte.»
 * Reel de Instagram para STREET CATS (@streetcats.food) · Caldas, Antioquia.
 *
 * 1080×1920 · 30 fps · 942 f (31,4 s) · estilo REDES · sin avatar y sin voz.
 * Artefactos: proyectos/009/artefactos/{01-plan,02-layout,03-timeline}.md
 *
 * EL Z-ORDER (SKILL §3b), y en qué se diferencia del de una pieza con avatar:
 *
 *   1. <PistaMetraje>   los 5 planos, su punch-in, su grado y EL VELO del texto
 *   2. <PistaGraficos>  los carteles — overlay FIJO, nunca se reencuadra
 *   3. <PistaSabor>     la cama DIEGÉTICA: aceite, brasa, salsa, crujido
 *   4. <PistaSonido>    los SFX ESTRUCTURALES: golpes, whooshes, riser
 *
 * LAS DOS CAPAS DE AUDIO SON DOS Y NO UNA, y el orden importa poco (se suman)
 * pero la distinción sí: 3 habla de la COMIDA («esto chisporrotea») y 4 habla
 * del MONTAJE («aquí hay un corte»). El antojo lo produce la 3; la 4 solo
 * ordena. Sin voz que duckear, las dos conviven sin ceder terreno.
 *
 * No hay `<CamaraVirtual>` porque no hay un sujeto al que seguir: en una pieza
 * de b-roll el movimiento ES el montaje, y vive dentro de la capa 1.
 *
 * DOS PARÁMETROS QUE SE OLVIDAN DE UNO EN UNO, y los dos son de marca:
 *   · `marca={STREETCATS}` en <PistaMetraje> → el LOOK del metraje.
 *   · la `paleta` del dialecto en `graficos-009.ts` → el COLOR del texto.
 * Se pasan en sitios distintos porque son cosas distintas, y faltando cualquiera
 * de los dos el render SALE IGUAL DE BIEN, solo que con el color equivocado.
 *
 * SIN WATERMARK PERSISTENTE, y es una decisión, no el olvido que avisa el §5b
 * del SKILL (`sello.texto: null` → composición sin marca). `STREETCATS.sello`
 * SÍ trae su texto; lo que pasa es que aquí no se monta `encima`, por dos
 * razones que solo se ven juntas: el copy vive en la franja ALTA los 31 s (un
 * sello arriba chocaría con él) y en el feed de Reels la banda BAJA la tapan el
 * texto del post y los botones. Entre poner el sello donde estorba y ponerlo
 * donde no se ve, la pieza se lo juega a que la marca ocupe los últimos 10 s
 * entera: nombre a los 21 s, arroba a los 27 s.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { MONTADORES_BASE, PistaGraficos } from "../../motor/graficos/PistaGraficos";
import { PistaMetraje, type Velos } from "../../motor/metraje";
import { PistaSonido } from "../../motor/sound/PistaSonido";
import { STREETCATS } from "../../marcas/streetcats";
import { ENTRADAS_009 } from "./entradas-009";
import { PistaSabor } from "./PistaSabor";
import { metraje009 } from "./metraje-009";
import { graficos009 } from "./graficos-009";
import { cues009 } from "./cues-009";
import { sabor009 } from "./sabor-009";

/**
 * El fondo del molde `pantalla`, sustituido.
 *
 * De fábrica, `FONDOS_BASE.toma` es un degradado azul-gris OPACO: tapa el vídeo
 * entero, que es lo correcto en una pieza con avatar (ahí `pantalla` significa
 * «el avatar se desmonta y el gráfico es la escena»). Aquí no hay avatar y el
 * metraje es lo único que hay, así que taparlo del todo dejaría la revelación y
 * el CTA sobre un fondo plano y muerto.
 *
 * Un velo al 72 % hace las dos cosas a la vez: la comida sigue moviéndose
 * debajo y el texto se lee. Se probó primero al 82 y el frame renderizado lo
 * desmintió: con la viñeta que el molde `pantalla` ya trae de serie (`vineta:
 * true`) más la del propio metraje, el 82 sumaba tres oscurecimientos y dejaba
 * las dos últimas tomas en negro plano — o sea, tiraba 10 s de comida para
 * ganar un contraste que ya estaba ganado. Al 72 el blanco del titular sigue
 * por encima de 12:1 contra lo más claro que llega a haber debajo (el plano de
 * la salsa, luma 105 ya corregida a 0,86) y la salsa se ve caer.
 */
const VeloPantalla: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: STREETCATS.color.fondoOscuro, opacity: 0.72 }} />
);

/**
 * EL VELO DEL TEXTO — la capa que el z-order nombra y que casi siempre se
 * olvida. Todo el copy vive en el molde `franja` (y ∈ 117-457), que no trae
 * scrim: sin este degradado un titular blanco sobre el humo blanco de las
 * alitas no se lee, y el fallo no aparece hasta que se renderiza ese plano
 * concreto. Alto en px reales y no en %, porque lo que tiene que cubrir es la
 * caja del molde, que está en px. Si se mueve el molde, se mueve el velo.
 */
const VELOS_009: Velos = { arriba: { alto: 620, borde: 0.82, medio: 0.55, parada: 0.55 } };

export const Reel009: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: STREETCATS.color.negro }}>
    <PistaMetraje cortes={metraje009} marca={STREETCATS} velos={VELOS_009} entradas={ENTRADAS_009} />
    <PistaGraficos
      plan={graficos009}
      montadores={MONTADORES_BASE}
      fondos={{ toma: VeloPantalla }}
      scrimColor={STREETCATS.color.fondoOscuro}
    />
    <PistaSabor sabores={sabor009} />
    {/* duckDb 0: no hay voz contra la que duckear (ver cabecera de cues-009). */}
    <PistaSonido cues={cues009} duckDb={0} />
  </AbsoluteFill>
);
