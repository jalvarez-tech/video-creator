# /// script
# dependencies = ["numpy","scipy"]
# ///
# Energía en banda de voz (150-4000 Hz) cada 33 ms (1 f a 30 fps): índice de frame, tiempo y dB. Imprime solo desde/hasta.
import sys, numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
f=sys.argv[1]; a=float(sys.argv[2]); b=float(sys.argv[3])
sr,x=wavfile.read(f); x=x.astype(float)/32768
y=sosfilt(butter(4,[150,4000],btype='band',fs=sr,output='sos'),x)
win=int(sr/30)
out=[]
for i in range(int(a*30),int(b*30)):
    seg=y[i*win:(i+1)*win]
    if len(seg)<win: break
    out.append(f'{i}:{20*np.log10(np.sqrt(np.mean(seg**2))+1e-9):.0f}')
print(f.split('/')[-1], ' '.join(out))
