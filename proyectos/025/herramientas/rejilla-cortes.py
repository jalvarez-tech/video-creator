#!/usr/bin/env python3
"""
rejilla-cortes.py — ¿qué canción deja una REJILLA DE CORTES válida para el recorrido? (buscador de fuerza bruta sobre los golpes medidos)

Uso (desde la raíz del repo):
  uv run proyectos/025/herramientas/medir-pista.py "ruta/Cancion.mp3" --desde <caída-48> --dur 52 --json golpes.json
  python3 proyectos/025/herramientas/rejilla-cortes.py golpes.json <t_caida> <min_dB_disolvencia=9.0> <ventana_s=4.5>

  <t_caida>  instante (s de la canción) en que cae la nota/fundido final (`curva.py`); el golpe de entrada del CTA tiene que quedar en [t_caida − ventana, t_caida].
Imprime, ordenadas por «plano más corto del bloque 5» y fuerza del golpe más débil, las combinaciones de golpes (en s de la canción) para:
  c03 c04 c05 c06 | mitad | c08 c09 c11 | vista | CTA, con sus fuerzas, las duraciones del bloque 3, la pareja de la mitad (160-167 f), las del bloque 5 y la vista.
RESTRICCIONES (las del 025; se cambian en R1/R2 y en `tipos`): mitad con su pareja de golpes a 160-167 f; la vista el plano MÁS LARGO del bloque 5 (75-103 f);
disolvencias en golpes ≥ MIND y cortes secos ≥ 7,4 dB; planos de ≥ 1,5 s. 0 soluciones = la canción no sirve para esta estructura.
Es de la V7 (025): si el montaje cambia, se reescriben los rangos. Fue lo que dejó a *Yeshua* como la única libre con caída completa a silencio.
"""
import json,sys,itertools
d=json.load(open(sys.argv[1]))['golpes']; fall_hi=float(sys.argv[2]); MINDB=7.4; MIND=float(sys.argv[3])
W=float(sys.argv[4]) if len(sys.argv)>4 else 4.3
G=[(g['t'],g['db']) for g in d if g['db']>=MINDB]
# rangos de duración (frames) por plano en orden: c03,c04,c05,c06 | mitad | c08,c09,c10,c11,c12
R1=[(60,130),(80,150),(60,110),(45,110)]
R2=[(50,110),(50,110),(50,80)]
PREF1=[93,118,93,61]; PREF2=[85,85,71]
def fr(t0,t1): return round((t1-t0)*30)
def nxt(i,lo,hi):
    out=[]
    for j in range(i+1,len(G)):
        f=fr(G[i][0],G[j][0])
        if f>hi: break
        if f>=lo: out.append(j)
    return out
sols=[]
for i0 in range(len(G)):
    # R1
    def r1(i,k,acc):
        if k==4: yield i,acc; return
        for j in nxt(i,*R1[k]): yield from r1(j,k+1,acc+[j])
    for im,acc1 in r1(i0,0,[]):
        for ip in nxt(im,158,167):
            def r2(i,k,acc):
                if k==3: yield i,acc; return
                for j in nxt(i,*R2[k]): yield from r2(j,k+1,acc+[j])
            for iv,acc2 in r2(ip,0,[]):
                durs2=[fr(G[a][0],G[b][0]) for a,b in zip([ip]+acc2,acc2)]
                for ic in nxt(iv,75,103):
                    vista=fr(G[iv][0],G[ic][0])
                    if vista<=max(durs2): continue
                    tc=G[ic][0]
                    if not (fall_hi-W<=tc<=fall_hi): continue
                    cuts=[i0]+acc1+[ip]+acc2+[ic]
                    tipos="dcddddd"+"cdc"+"d"
                    tipos=["d","c","d","d","d","d","d","d","c","d"]
                    minD=min(G[c][1] for c,t in zip(cuts,tipos) if t=="d")
                    minC=min(G[c][1] for c,t in zip(cuts,tipos) if t=="c")
                    if minD<MIND or minC<7.4: continue
                    durs1=[fr(G[a][0],G[b][0]) for a,b in zip([i0]+acc1,acc1)]
                    pen=sum(abs(a-b) for a,b in zip(durs1,PREF1))+sum(abs(a-b) for a,b in zip(durs2,PREF2))+abs(vista-92)
                    sols.append((round(minD,1),round(minC,1),-pen,[round(G[c][0],3) for c in cuts],[round(G[c][1]) for c in cuts],durs1,fr(G[acc1[-1]][0],G[ip][0]),durs2,vista))
sols.sort(key=lambda s:(-min(min(s[7]),60),-min(s[0],11),s[2]))
print(len(sols))
for s in sols[:6]: print(s)
