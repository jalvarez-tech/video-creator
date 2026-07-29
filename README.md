# 🎬 Video Creator — Sistema de edición de vídeo con IA

Root de **todos** los proyectos de vídeo. Combina tres motores:

| Motor | Para qué | Dónde vive |
|---|---|---|
| **Remotion** | Vídeo programático (intros, títulos, animaciones, lower-thirds) | `remotion/` |
| **Auto-Editor** | Cortar silencios de un vídeo grabado | CLI global (`auto-editor`) |
| **Seedance 2.0** | Generar clips con IA (texto/imagen → vídeo) | assets en `archivos/` o `proyectos/NNN/` |

> **Regla de oro:** primero el motor y la estructura, luego el vídeo. Nunca se edita desde Descargas ni desde un archivo suelto: cada vídeo tiene su sitio.

---

## 📁 Estructura

```
video-creator/
├── entrada/                  # Vídeos que llegan, sin clasificar todavía
├── archivos/                 # Biblioteca reutilizable (no es de un proyecto)
│   ├── marca/                #   logos, tipografías, colores, brand kit
│   ├── musica/               #   pistas y librería de audio
│   ├── capturas/             #   screenshots, b-roll, recursos
│   └── ejemplos/             #   referencias e inspiración
├── proyectos/                # UN proyecto por carpeta numerada
│   └── 001/
│       ├── original.mp4          # el vídeo fuente (lo pones tú aquí)
│       ├── corte-auto-editor/    # salida de Auto-Editor (XML/timeline)
│       ├── transcripcion.json    # transcripción (Whisper u otro)
│       ├── guion-limpio.md       # guion depurado, listo para editar
│       ├── vistas-previas/       # previews rápidas para revisar
│       ├── pruebas-720p/         # renders de prueba en 720p (baratos)
│       ├── finales/              # renders finales aprobados
│       └── aprendizajes.md       # qué funcionó y qué evitar en este vídeo
├── remotion/                 # MOTOR Remotion (proyecto npm oficial)
└── manuales/
    └── edicion-video/SKILL.md    # 📖 Manual operativo (leer antes de editar)
```

---

## 🚀 Cómo reabrir el proyecto MAÑANA (3 pasos)

1. **Ir al motor:**
   ```bash
   cd /Users/nicecode/Work/jalvarez/video-creator/remotion
   ```
2. **(Solo si es un equipo nuevo o borraste node_modules) reinstalar dependencias:**
   ```bash
   npm install
   ```
3. **Abrir Remotion Studio (la vista previa):**
   ```bash
   npm run dev
   ```
   Se abre en **http://localhost:3000**. Para cerrarlo: `Ctrl + C` en esa terminal.

> Auto-Editor es global: `auto-editor --version` funciona desde cualquier carpeta.

---

## ✅ Estado del motor (verificado)

- Remotion **4.0.496** · Node **25** · plantilla oficial Tailwind v4.
- Composición de prueba **`Prueba`** (1920×1080 · 30fps · 3 s) → renderiza y anima.
- Render de prueba confirmado: [frame PNG](remotion/out/prueba-frame.png) + [clip 720p](remotion/out/prueba-720p.mp4).
- Auto-Editor **29.3.1** instalado (pipx).

📖 **Antes de editar cualquier vídeo real, lee** [manuales/edicion-video/SKILL.md](manuales/edicion-video/SKILL.md).
