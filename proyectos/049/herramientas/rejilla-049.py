#!/usr/bin/env python3
"""
rejilla-049.py — ¿qué golpes de «In This Together» dan una rejilla de cortes para la estructura de la V31?

Uso (desde la raíz del repo, tras `medir-pista.py … --desde 0 --dur 216 > proyectos/049/musica/together-todo.txt`):
  python3 proyectos/049/herramientas/rejilla-049.py

La canción NO tiene pulso fijo: la rejilla son sus golpes medidos (≥ 7,4 dB, el mínimo del canal). Se busca, para cada golpe
de entrada ≥ 9 dB, la cadena apertura (1,5-3,6 s) → hook (5,75-6,0 s) → 2-4 planos de la unidad (2,0-3,8 s) → mitad (3,6-4,2 s) →
2-3 planos del apartamento (2,0-3,6 s) → vista (3,8-4,65 s) → CTA, con el CTA entre el 199 y el 204,2 s (donde la canción cae sola).
Imprime las cadenas ordenadas por su golpe más débil. Con estos rangos salen 46: las de entrada 161,638 s (45,7-46,8 s, planos de 2,6-3,7 s) y las de entrada 167,452 s (≈ 40 s,
planos de 2,0-2,5 s y apertura de 1,55 s). Con los rangos más estrechos (apertura ≥ 1,8 s, planos ≥ 2,4 s, vista 4,0-4,65 s) solo quedan 2, las dos de entrada 161,638 s: la usada
(vista 197,082 → CTA 201,283 s, la que entra en un golpe de 8,9 dB; la otra entra en uno de 7,5 dB).
"""
import re,sys
hits=[]
for l in open('proyectos/049/musica/together-todo.txt'):
    m=re.match(r'\s+([\d.]+) s\s+\|\s+([\d.]+) s\s+\|\s+([\d.]+)',l)
    if m: hits.append((float(m.group(1)),float(m.group(3))))
H=[h for h in hits if h[1]>=7.4]
def nxt(t0,lo,hi,minimo=7.4):
    return [h for h in H if lo<=h[0]-t0<=hi and h[1]>=minimo]
def seq(cur,n,lo,hi,minimo=7.4):
    if n==0:
        yield []; return
    for h in nxt(cur[0],lo,hi,minimo):
        for rest in seq(h,n-1,lo,hi,minimo):
            yield [h]+rest
Es=[h for h in H if h[1]>=9 and 150<=h[0]<=190]
out=[]
for E in Es:
  for ap in nxt(E[0],1.5,3.6,7.4):             # fin de apertura = entra el hook
    for hk in nxt(ap[0],5.75,6.0,8.0):         # fin del hook = entra la unidad
      for Nu in (2,3,4):
        for au in seq(hk,Nu,2.0,3.8):           # fin de cada plano de la unidad (el último = entra MD05)
          for md in nxt(au[-1][0],3.6,4.2,7.4): # fin de MD05 = entra el apartamento
            for Na in (2,3):
              for aa in seq(md,Na,2.0,3.6):      # fin de cada plano del apartamento (el último = entra la vista)
                for vi in nxt(aa[-1][0],3.8,4.65,7.4):  # fin de la vista = entra el CTA
                  if 199.0<=vi[0]<=204.2:
                    out.append((E,ap,hk,au,md,aa,vi,Nu,Na))
print(len(out))
def score(o):
    E,ap,hk,au,md,aa,vi,Nu,Na=o
    return min(x[1] for x in [E,ap,hk,md,vi]+au+aa)
out.sort(key=lambda o:(-score(o),-o[7]))
for o in out[:30]:
    E,ap,hk,au,md,aa,vi,Nu,Na=o
    print(f"E{E[0]:.3f}({E[1]}) hook@{ap[0]:.3f}({ap[1]}) unidad@{hk[0]:.3f}({hk[1]}) u{[(round(x[0],3),x[1]) for x in au]} md@{au[-1][0]:.3f}->{md[0]:.3f}({md[1]}) a{[(round(x[0],3),x[1]) for x in aa]} vista@{aa[-1][0]:.3f}->cta@{vi[0]:.3f}({vi[1]}) min{score(o)} Nu{Nu} Na{Na} total={vi[0]-E[0]+5.17+2:.1f}s")
