# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "scipy", "soundfile"]
# ///
import sys, numpy as np, soundfile as sf
from scipy.fftpack import dct
from scipy.signal import resample_poly
SR=16000
def carga(p):
    y,sr=sf.read(p); y=y if y.ndim==1 else y.mean(1)
    return resample_poly(y,SR,sr)
def mfcc(y,t0,t1,nm=26,nc=13):
    seg=y[int(t0*SR):int(t1*SR)]
    seg=np.append(seg[0],seg[1:]-0.97*seg[:-1])
    w=int(.025*SR); h=int(.010*SR)
    n=1+(len(seg)-w)//h
    fr=np.stack([seg[i*h:i*h+w]*np.hamming(w) for i in range(n)])
    P=np.abs(np.fft.rfft(fr,512))**2
    f=np.linspace(0,SR/2,P.shape[1]); mel=lambda x:2595*np.log10(1+x/700); imel=lambda m:700*(10**(m/2595)-1)
    pts=imel(np.linspace(mel(80),mel(7000),nm+2))
    fb=np.zeros((nm,len(f)))
    for i in range(nm):
        a,b,c=pts[i],pts[i+1],pts[i+2]
        fb[i]=np.clip(np.minimum((f-a)/(b-a),(c-f)/(c-b)),0,None)
    S=np.log(P@fb.T+1e-10)
    C=dct(S,type=2,axis=1,norm='ortho')[:,1:nc]   # sin c0 (energía)
    return C-C.mean(0)  # CMN
def dtw(A,B):
    n,m=len(A),len(B)
    D=np.linalg.norm(A[:,None,:]-B[None,:,:],axis=2)
    C=np.full((n+1,m+1),np.inf); C[0,0]=0
    for i in range(1,n+1):
        for j in range(1,m+1):
            C[i,j]=D[i-1,j-1]+min(C[i-1,j],C[i,j-1],C[i-1,j-1])
    return C[n,m]/(n+m)
voz="voz/"
def seg(f,a,b): return mfcc(carga(voz+f+".wav"),a,b)
hk4=lambda a,b: seg("HK04",a,b)
cand={"HK04 [1.80-2.28]":hk4(1.80,2.28)}
refs={
 "HK03 «estudio» [3.70-4.10]":seg("HK03",3.70,4.10),
 "HK03 «este estudio» [3.34-4.10]":seg("HK03",3.34,4.10),
}
print("distancia DTW normalizada (menor = más parecido)")
for k,v in cand.items():
    for r,x in refs.items(): print(f"  {k}  vs  {r}: {dtw(v,x):.3f}")
# baselines: misma palabra / palabra distinta
print("\nlíneas base")
print("  «Medellín» HK04[4.40-5.00] vs MD04[0.18-0.90]:", f"{dtw(seg('HK04',4.40,5.00),seg('MD04',0.18,0.90)):.3f}")
print("  «Medellín» HK04[4.40-5.00] vs HK02[0.00-0.95]:", f"{dtw(seg('HK04',4.40,5.00),seg('HK02',0.00,0.95)):.3f}")
print("  «rentas cortas» HK04[3.60-4.28] vs MD04[4.72-5.76]:", f"{dtw(seg('HK04',3.60,4.28),seg('MD04',4.72,5.76)):.3f}")
print("  «rentas cortas» HK04[3.60-4.28] vs HK02[2.83-3.48]:", f"{dtw(seg('HK04',3.60,4.28),seg('HK02',2.83,3.48)):.3f}")
print("  «Laureles» HK04[2.28-2.80] vs HK03[5.95-6.75]:", f"{dtw(seg('HK04',2.28,2.80),seg('HK03',5.95,6.75)):.3f}")
print("  «Medellín» HK04 vs «estudio» HK03 (palabras distintas):", f"{dtw(seg('HK04',4.40,5.00),seg('HK03',3.70,4.10)):.3f}")
print("  «habilitado» HK04[2.88-3.40] vs «estudio» HK03 (distintas):", f"{dtw(seg('HK04',2.88,3.40),seg('HK03',3.70,4.10)):.3f}")
print("  «presento» HK04[0.58-1.10] vs «estudio» HK03 (distintas):", f"{dtw(seg('HK04',0.58,1.10),seg('HK03',3.70,4.10)):.3f}")
