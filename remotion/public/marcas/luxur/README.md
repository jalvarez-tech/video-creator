# Marca Luxur — el logo

`Propiedade-Luxur-Logo.png` es el logo del canal: el monograma «PL» y «© Propiedades Luxur», en **blanco sobre transparente**
(1000×518, RGBA; el logo en sí ocupa x 54-945 e y 63-444). Está pensado para fondos oscuros: lo usa el **cierre** de los
recorridos (`cierre-NNN.ts`, `LOGO = "marcas/luxur/Propiedade-Luxur-Logo.png"`), sobre la tarjeta oscura, a 440 px de ancho y
al 60 % de opacidad, con `PropiedadesLuxur.com` debajo.

- **De dónde viene.** Lo entregó el usuario como `Propiedade-Luxur-Logo.png` en su carpeta de marca
  (`Propiedades Luxur/` de su estudio, fuera de este repo) el 2026-10-03; esta es una copia byte a byte (sha256 `3e82f5a8…`).
  Hay una versión anterior en VERDE OSCURO y sin «©» (de septiembre) que NO es la que se usa en vídeo.
- **Por qué está en `remotion/public/`.** Remotion solo sirve desde ahí (`staticFile("marcas/luxur/…")`), y es de la zona
  del estudio (`herramientas/zonas.mjs`): no viaja al producto. A diferencia de los medios de cada pieza
  (`remotion/public/recorrido-NNN/`, que `.gitignore` deja fuera), el logo SÍ se versiona: sin él una copia nueva del
  repo no puede renderizar el cierre.
- **Si cambia el logo,** se sustituye aquí con el mismo nombre y se vuelve a pasar la puerta de cada pieza
  (`node proyectos/NNN/revisar-NNN.mjs`, sección del cierre: mide el logo en px y que quepa en las zonas seguras). Un logo con
  otras proporciones mueve el bloque logo + web del cierre (`LOGO_PNG` en `cierre-NNN.ts`).
