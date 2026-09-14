# Música del 008 — pendiente por permiso de la API key

La pieza pide **piano minimalista → cuerdas cálidas → esperanza** (~65 s en la
v2 vigente). El plan de composición por secciones ya está escrito en
[`plan-composicion.json`](plan-composicion.json) (4 chunks: intro piano 12 s ·
cuerdas 14 s · solidaridad 26 s · esperanza y cierre 13 s — ajustados a la v2).

**Por qué no está generada:** la API key de ElevenLabs del `.env` devuelve
`401 missing_permissions: music_generation` (2026-08-13). Es un ajuste de la
key, no del plan: en elevenlabs.io → API Keys, edita la key y habilita
**Music**, o crea una nueva con ese permiso.

Con el permiso activo:

```bash
KEY=$(grep '^ELEVENLABS_API_KEY=' .env | cut -d= -f2-) && curl -sS -X POST \
  "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128" \
  -H "xi-api-key: $KEY" -H "Content-Type: application/json" \
  -d @proyectos/008/musica/plan-composicion.json \
  --output proyectos/008/musica/008-musica.mp3
cp proyectos/008/musica/008-musica.mp3 remotion/public/noticias/008-musica.mp3
```

Y en `remotion/src/proyectos/008/Noticia008.tsx` pon `HAY_MUSICA = true`.
La envolvente de volumen (respeta la voz, el silencio de sil5 y el frente del
cierre) ya está programada — no hay que mezclar nada a mano.

También sirve cualquier MP3 licenciado con esa curva emocional: mismo destino,
mismo booleano.
