"""Mide cada foto de una carpeta (HEIC, JPG, PNG) y guarda un JSON con todas.

Uso (desde la raíz):
  uv run --with pillow --with pillow-heif proyectos/097/herramientas/medir-fotos.py <carpeta> <salida.json>

Por qué: igual que con los vídeos (R01, R19), antes de colocar una foto hay que
saber sus medidas REALES. El iPhone guarda muchas fotos en horizontal con la
orientación como etiqueta EXIF, así que el ancho y el alto se dan ya girados
(y la etiqueta original queda en «orientacion_exif»). El código FTNN sale del
orden de captura.
La hora sale de DateTimeOriginal con su desfase (la de los vídeos va en local,
−05:00) para situar cada foto en la misma cronología que los HZ y VT.

Privacidad: si la foto lleva GPS solo se apunta que lo lleva, nunca las
coordenadas. Este JSON se versiona y el lugar es la casa donde viven las niñas.
"""
import io
import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path

from PIL import ExifTags, Image, ImageCms
from pillow_heif import open_heif, register_heif_opener

register_heif_opener()

IFD_EXIF = ExifTags.IFD.Exif
IFD_GPS = ExifTags.IFD.GPSInfo
GIRAN = {5, 6, 7, 8}  # orientaciones EXIF que intercambian ancho y alto
FOTO = {".heic", ".heif", ".jpg", ".jpeg", ".png"}
VIDEO = {".mp4", ".mov"}
# Marcas de HDR que deja el iPhone: el gain map (iOS 14.1+; en iOS 18 también el
# estándar ISO 21496-1) va como imagen auxiliar en el HEIC y como segunda imagen
# MPF + XMP en el JPG.
MARCAS_GAINMAP = (b"hdrgainmap", b"HDRGainMap", b"apple:photo:2020:aux", b"urn:iso:std:iso:ts:21496")


# CustomRendered del iPhone (valores de Apple, fuera del estándar EXIF).
MODOS = {0: "normal", 1: "personalizado", 2: "HDR", 3: "HDR", 4: "original de HDR", 6: "panorámica", 7: "Retrato HDR", 8: "Retrato"}


def perfil(im) -> str | None:
    p = im.info.get("icc_profile")
    if not p:
        return None
    try:
        return ImageCms.getProfileDescription(ImageCms.ImageCmsProfile(io.BytesIO(p))).strip()
    except Exception:
        return "ICC ilegible"


def fecha(exif) -> str | None:
    e = exif.get_ifd(IFD_EXIF)
    h = e.get(36867) or e.get(36868) or exif.get(306)  # DateTimeOriginal, DateTimeDigitized, DateTime
    if not h:
        return None
    d = datetime.strptime(str(h).strip("\x00"), "%Y:%m:%d %H:%M:%S")
    off = e.get(36881) or e.get(36882) or e.get(36880)  # OffsetTimeOriginal…
    s = d.strftime("%Y-%m-%dT%H:%M:%S")
    return s + str(off).replace(":", "").strip("\x00") if off else s


def heif_aux(ruta: Path) -> list[str]:
    try:
        h = open_heif(ruta)
        aux = h.info.get("aux") or {}
        return sorted(aux.keys())
    except Exception:
        return []


def medir_foto(ruta: Path) -> dict:
    with Image.open(ruta) as im:
        exif = im.getexif()
        w, h = im.size
        # pillow-heif ya gira el HEIC al abrirlo y deja la etiqueta en 1: la
        # original va en info["original_orientation"]. El JPG llega sin girar.
        if "original_orientation" in im.info:
            ori = int(im.info["original_orientation"] or 1)
        else:
            ori = int(exif.get(274, 1))
            if ori in GIRAN:
                w, h = h, w
        e = exif.get_ifd(IFD_EXIF)
        gps = exif.get_ifd(IFD_GPS)
        datos = ruta.read_bytes()
        aux = heif_aux(ruta) if ruta.suffix.lower() in {".heic", ".heif"} else []
        gainmap = any(m in datos for m in MARCAS_GAINMAP) or any("gainmap" in a.lower() for a in aux)
        # «HDR» de la app Cámara: el iPhone lo deja en CustomRendered (3 = HDR, 4 = HDR
        # con la original guardada) en modelos antiguos; en los recientes el HDR es
        # siempre «Smart HDR» y lo que importa al montar es el gain map.
        cr = e.get(41985)
        return {
            "archivo": ruta.name,
            "tipo": "foto",
            "formato": (im.format or ruta.suffix[1:]).upper(),
            "ancho": w,
            "alto": h,
            "orientacion": "vertical" if h > w else ("horizontal" if w > h else "cuadrada"),
            "orientacion_exif": ori,
            "proporcion": f"{w / h:.3f}",
            "fecha": fecha(exif),
            "camara": " ".join(str(x).strip("\x00") for x in (exif.get(271), exif.get(272)) if x) or None,
            "lente": (str(e.get(42036)).strip("\x00") if e.get(42036) else None),
            "software": (str(exif.get(305)).strip("\x00") if exif.get(305) else None),
            "focal_35mm": e.get(41989),
            "iso": e.get(34855),
            "exposicion_s": float(e[33434]) if 33434 in e else None,
            "apertura": float(e[33437]) if 33437 in e else None,
            "hdr_gainmap": gainmap,
            "modo": MODOS.get(cr, cr),
            "profundidad": any("portraiteffectsmatte" in a for a in aux),
            "aux_heif": aux,
            "perfil_color": perfil(im),
            "gps": bool(gps),
            "bytes": ruta.stat().st_size,
        }


def medir_video(ruta: Path) -> dict:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", str(ruta)],
        capture_output=True, text=True, check=True,
    ).stdout
    d = json.loads(out)
    v = next(s for s in d["streams"] if s["codec_type"] == "video")
    a = [s for s in d["streams"] if s["codec_type"] == "audio"]
    rot = 0
    for sd in v.get("side_data_list", []):
        if "rotation" in sd:
            rot = int(sd["rotation"])
    w, h = int(v["width"]), int(v["height"])
    if abs(rot) == 90:
        w, h = h, w
    num, den = (int(x) for x in v["avg_frame_rate"].split("/"))
    tags = d["format"].get("tags", {})
    return {
        "archivo": ruta.name,
        "tipo": "video",
        "formato": d["format"].get("format_name"),
        "ancho": w,
        "alto": h,
        "orientacion": "vertical" if h > w else "horizontal",
        "rotacion": rot,
        "duracion": round(float(d["format"]["duration"]), 3),
        "fps": round(num / den, 3) if den else None,
        "codec": v.get("codec_name"),
        "transferencia": v.get("color_transfer"),
        "hdr": v.get("color_transfer") in {"arib-std-b67", "smpte2084"},
        "audio": bool(a),
        "audio_canales": a[0].get("channels") if a else 0,
        # Mismo formato que las fotos («…-0500»), para ordenarlas juntas como texto.
        "fecha": (tags.get("com.apple.quicktime.creationdate") or tags.get("creation_time") or "").replace("-05:00", "-0500") or None,
        "camara": " ".join(x for x in (tags.get("com.apple.quicktime.make"), tags.get("com.apple.quicktime.model")) if x) or None,
        "encoder": tags.get("encoder") or v.get("tags", {}).get("encoder"),
        "gps": any("location" in k for k in tags),
        "bytes": ruta.stat().st_size,
    }


def main() -> None:
    carpeta, salida = Path(sys.argv[1]), Path(sys.argv[2])
    filas = []
    for ruta in sorted(carpeta.iterdir()):
        ext = ruta.suffix.lower()
        if ext in FOTO:
            filas.append(medir_foto(ruta))
        elif ext in VIDEO:
            filas.append(medir_video(ruta))
    # Orden de captura; lo que no trae fecha, al final y por nombre.
    filas.sort(key=lambda f: (f["fecha"] is None, f["fecha"] or "", f["archivo"]))
    # El código FTNN sale de ese orden, como los HZ y VT: con él se piden las fotos
    # sin ambigüedad (hay dos números IMG con HEIC y JPG a la vez).
    for i, f in enumerate(filas, 1):
        f["codigo"] = f"FT{i:02d}"
        f["hora"] = f["fecha"][11:19] if f["fecha"] else None
    filas = [{"codigo": f.pop("codigo"), "hora": f.pop("hora"), **f} for f in filas]
    salida.write_text(json.dumps(filas, ensure_ascii=False, indent=1) + "\n")
    for f in filas:
        print(f'{f["codigo"]} {f["archivo"]:44} {f["ancho"]:>5}×{f["alto"]:<5} {f["orientacion"]:10} {f["fecha"]}  {f.get("camara")}  gm={f.get("hdr_gainmap")}')
    print(f"{len(filas)} piezas → {salida}")


if __name__ == "__main__":
    main()
