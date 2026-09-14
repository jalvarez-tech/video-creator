# 03 · Timeline — proyecto 008 · pieza AVATAR (30 fps · 1314 f)

Fuente de tiempos: `proyectos/008/avatar/transcripcion-palabras.json` (tokens
whisper, s×30 = frame). Los frames de voz clave, medidos:

| palabra | s | frame |
|---|---|---|
| «buenas noticias» | 2.10 | 63 |
| «tres puntos» | 3.76 | 113 |
| «en Medellín» | 5.70–6.76 | 171–203 |
| «Calasanz» | 7.23 | 217 |
| «Santa Lucía» | 8.03 | 241 |
| «el 20 de julio» | 8.96–9.60 | 269–288 |
| «en Caldas» | 10.28 | 308 |
| «el negocio de mi hermana» | 12.14–13.71 | 364–411 |
| «Street Cats» | 14.08 | 422 |
| «Carmen de Viboral» | 15.89–16.67 | 477–500 |
| «mi casa» | 17.51 | 525 |
| «Oriente antioqueño» | 19.91–21.04 | 597–631 |
| «cualquier ayuda por más mínima…» | 21.27–24.54 | 638–736 |
| «este camión» | 25.82–26.76 | 775–803 |
| «8» | 27.44 | 823 |
| «toneladas» | 27.70–28.12 | 831–844 |
| «a fin de mes» | 29.38–30.00 | 881–900 |
| «unir, ayudar» | 32.60–33.93 | 978–1018 |
| «compartir estos vídeos» | 35.14–37.20 | 1054–1116 |
| «hazlo» | 37.49 | 1125 |
| «granito a granito» | 40.52–41.64 | 1216–1249 |
| «vamos llenando el bulto» | 41.64–42.60 | 1249–1278 |
| «Dios los bendiga» | 42.71–fin | 1281–1314 |

## Mapa de escenas (formato director §6)

| frames | narrativa | cámara | motion graphic (banda inf.) | sonido | voz |
|---|---|---|---|---|---|
| 0–62 | saludo | **hook** 1.0→1.08 [0–22] | — | whoosh light f6 | «muy buenos días…» |
| 63–165 | gancho | reposo 1.08 | **g01** kicker BUENAS NOTICIAS → titular «3 puntos de recolección» (en 50 → f113) | whoosh light f113 | «…tres puntos de recolección» |
| 171–302 | datos·Medellín | reposo | **g02** chip MEDELLÍN + «Las 3 sedes de Juan Papitas» + lista (en 46, paso 26 → ítems f217/243/269) | swoosh f171 · pops f217/243/269 | «Calasanz, Santa Lucía, el 20 de julio» |
| 308–470 | datos·Caldas | reposo | **g03** chip CALDAS · ANTIOQUIA + «El negocio de mi hermana» (en 56) + lista Street Cats (en 114 → f422) | whoosh f308 · pop f422 | «…se llama Street Cats» |
| 477–633 | datos·Carmen | reposo | **g04** chip EL CARMEN DE VIBORAL + lista «Mi casa · Calle 23A # 22-03» (en 48 → f525) + «recogiendo por todo el Oriente antioqueño» (en 120 → f597) | whoosh f477 · pop f525 | «voy a habilitar mi casa…» |
| 638–800 | la súplica | **punch-in** 1.08→1.18 [660–720] · **alejar** 1.18→1.06 [770–800] | — (el avatar hace el punto) | — (silencio de SFX) | «cualquier ayuda por más mínima…» |
| 806–955 | prueba·la cifra | reposo 1.06 | **g05** contador 0→**8** (en 12, dur 20, golpe → aterriza f838) + «toneladas de ayuda para el Chocó» + chip EL CAMIÓN SALE A FIN DE MES (en 74 → f880) | data f818 · **impact deep f838 (1/2)** · pop f880 | «son 8 toneladas… a fin de mes» |
| 978–1013 | puente CTA | **empujón** 1.06→1.12 [975–1000] | — | — | «si quieres unir, ayudar» |
| 1018–1170 | cta | reposo 1.12 | **g06** caja sello ámbar: SI QUIERES AYUDAR + «COMPARTE ESTE VIDEO» (en 36 → f1054) | swoosh f1018 · pop f1054 | «…compartir estos vídeos, hazlo» |
| 1200–1314 | remate | reposo 1.12 | **g07** titular «Granito a granito» (en 14 → f1214) + «vamos llenando el bulto» (tras) | **impact deep f1214 (2/2)** | «granito a granito… Dios los bendiga» |

Huecos entre tarjetas consecutivas: 6–7 f (165→171 · 302→308 · 470→477) — corte
y muelle de entrada, ritmo de la enumeración. Ningún molde `cubre`, así que no
hay parpadeo de avatar posible.

## Archivos

- `remotion/src/proyectos/008/graficos-008-avatar.ts` — el plan (7 tomas, marca CHOCO, paleta.marca=#D97706)
- `remotion/src/proyectos/008/camara-008-avatar.ts` — 4 cues
- `remotion/src/proyectos/008/cues-008-avatar.ts` — 16 cues de SFX
- `remotion/src/proyectos/008/Avatar008.tsx` — ensamblado + SelloCampana
- Registro: `Root.tsx` → comp `Avatar008` (30 fps, calculateMetadata del clip)
