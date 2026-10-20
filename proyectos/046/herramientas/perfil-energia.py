# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
import sys, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt
w, t0, t1 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
paso = float(sys.argv[4]) if len(sys.argv) > 4 else 0.04
x, sr = sf.read(w)
if x.ndim > 1: x = x.mean(1)
sos = butter(4, [300, 3400], "band", fs=sr, output="sos")
b = sosfilt(sos, x)
t = t0
while t < t1:
    s = b[int(t*sr):int((t+paso)*sr)]
    full = x[int(t*sr):int((t+paso)*sr)]
    db = 20*np.log10(np.sqrt(np.mean(s**2))+1e-9); dbf = 20*np.log10(np.sqrt(np.mean(full**2))+1e-9)
    print(f"{t:6.2f}  voz {db:6.1f}  total {dbf:6.1f}  {'#'*max(0,int((db+80)/2))}")
    t += paso
