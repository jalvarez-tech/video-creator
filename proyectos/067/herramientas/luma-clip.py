#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "pillow"]
# ///
"""luma-clip.py <clip.mp4> t0 t1 [paso=0.5] — luma media (72 % de arriba) de un clip normalizado cada `paso` s, SIN graduar: para elegir un tramo cuyo principio y final no salten contra sus vecinos."""
import subprocess, sys, io
import numpy as np
from PIL import Image
clip, t0, t1 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
paso = float(sys.argv[4]) if len(sys.argv) > 4 else 0.5
t = t0
while t <= t1 + 1e-9:
    raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-ss", f"{t:.3f}", "-i", clip, "-frames:v", "1", "-vf", "scale=270:-2", "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True, check=True).stdout
    a = np.asarray(Image.open(io.BytesIO(raw)).convert("RGB"), dtype=float)
    a = a[: int(a.shape[0] * 0.72)]
    y = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    print(f"{t:6.2f} s  luma {y.mean():6.1f}  p5 {np.percentile(y,5):4.0f}  p95 {np.percentile(y,95):4.0f}")
    t += paso
