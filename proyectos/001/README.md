# Proyecto 001

Plantilla de proyecto. Copia esta carpeta (`002`, `003`, …) para cada vídeo nuevo.

## Flujo dentro de este proyecto

1. **Colocar el fuente:** deja el vídeo grabado aquí como `original.mp4`.
2. **Cortar silencios:** pasa `original.mp4` por Auto-Editor → la salida va a `corte-auto-editor/`.
3. **Transcribir:** genera `transcripcion.json` (Whisper u otro) y limpia el guion en `guion-limpio.md`.
4. **Montar en Remotion:** intros, títulos y animaciones desde el motor `../../remotion/`.
5. **Probar barato:** exporta a `pruebas-720p/` antes de un final.
6. **Aprobar:** el render bueno va a `finales/`.
7. **Registrar:** anota decisiones y errores en `aprendizajes.md`.

## Contenido de cada carpeta

| Archivo / carpeta | Qué contiene |
|---|---|
| `original.mp4` | Vídeo fuente sin tocar. **Colócalo tú.** No lo sobrescribas nunca. |
| `corte-auto-editor/` | XML/timeline y logs de Auto-Editor. |
| `transcripcion.json` | Transcripción con timestamps. |
| `guion-limpio.md` | Guion depurado, listo para leer/editar. |
| `vistas-previas/` | Previews rápidas para revisar cortes. |
| `pruebas-720p/` | Renders de prueba baratos (720p). |
| `finales/` | Renders finales aprobados. |
| `aprendizajes.md` | Qué funcionó y qué evitar en este vídeo. |
