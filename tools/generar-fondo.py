# Genera img/fondo-wire.svg (uso: python3 tools/generar-fondo.py img/fondo-wire.svg): figuras de karting en 3D (perspectiva caballera), solo contorno.
import math, sys
OUT = sys.argv[1]
CZ, SZ = 0.42, 0.24   # proyección del eje de profundidad z
def P(x, y, z): return (x + CZ*z, -y - SZ*z)
def f(v): return f"{v:.1f}"
class Fig:
    def __init__(s): s.near=[]; s.far=[]
    def add(s, d, far=False): (s.far if far else s.near).append(d)
    def poly(s, pts, close=False, far=False):
        q=[P(*p) for p in pts]
        s.add("M"+" L".join(f(a)+" "+f(b) for a,b in q)+(" Z" if close else ""), far)
    def box(s, x0,y0,z0, x1,y1,z1, far=False):
        c=lambda x,y,z:(x,y,z)
        s.poly([c(x0,y0,z0),c(x1,y0,z0),c(x1,y1,z0),c(x0,y1,z0)],True,far)            # cara cercana
        s.poly([c(x0,y0,z1),c(x1,y0,z1),c(x1,y1,z1),c(x0,y1,z1)],True,True)           # cara lejana
        for x,y in [(x0,y0),(x1,y0),(x1,y1),(x0,y1)]: s.poly([c(x,y,z0),c(x,y,z1)],far=(x,y)==(x0,y0) or far)
    def circle_xy(s, cx, cy, z, r, far=False):
        x,y=P(cx,cy,z); s.add(f"M{f(x-r)} {f(y)} a{f(r)} {f(r)} 0 1 0 {f(2*r)} 0 a{f(r)} {f(r)} 0 1 0 {f(-2*r)} 0", far)
    def cyl_z(s, cx, cy, z0, z1, r, hub=0):  # rueda: eje en z
        s.circle_xy(cx,cy,z0,r); s.circle_xy(cx,cy,z1,r,far=True)
        if hub: s.circle_xy(cx,cy,z0,hub); s.circle_xy(cx,cy,z0,hub*0.45)
        # tangentes perpendiculares a la dirección de proyección de z
        dx,dy=CZ,-SZ; L=math.hypot(dx,dy); nx,ny=-dy/L,dx/L
        for sg in (1,-1):
            a=P(cx,cy,z0); b=P(cx,cy,z1)
            s.add(f"M{f(a[0]+sg*nx*r)} {f(a[1]+sg*ny*r)} L{f(b[0]+sg*nx*r)} {f(b[1]+sg*ny*r)}")
        for k in range(8):   # dibujo de la banda de rodadura
            t=k*math.pi/4+0.3; px,py=math.cos(t)*r, math.sin(t)*r
            a=P(cx+px,cy+py,z0); b=P(cx+px,cy+py,z1)
            s.add(f"M{f(a[0])} {f(a[1])} L{f(b[0])} {f(b[1])}", far=True)
    def ell(s, cx, cy, rx, ry, far=False, half=None):
        if half=='front': s.add(f"M{f(cx-rx)} {f(cy)} A{f(rx)} {f(ry)} 0 0 0 {f(cx+rx)} {f(cy)}", far)
        elif half=='back': s.add(f"M{f(cx-rx)} {f(cy)} A{f(rx)} {f(ry)} 0 0 1 {f(cx+rx)} {f(cy)}", far)
        else: s.add(f"M{f(cx-rx)} {f(cy)} a{f(rx)} {f(ry)} 0 1 0 {f(2*rx)} 0 a{f(rx)} {f(ry)} 0 1 0 {f(-2*rx)} 0", far)
    def svg(s):
        return ('<path class="l" d="'+" ".join(s.far)+'"/>' if s.far else '')+'<path d="'+" ".join(s.near)+'"/>'

def kart():
    k=Fig()
    for x,r in [(28,15),(128,12)]:
        k.cyl_z(x,r,-4,12,r,hub=r*0.55); k.cyl_z(x,r,66,82,r,hub=0)
    k.poly([(14,8,10),(150,8,18),(150,8,62),(14,8,70)],True)                     # chasis
    k.poly([(28,15,12),(28,15,66)],far=True); k.poly([(128,12,12),(128,12,66)],far=True)  # ejes
    k.poly([(2,10,6),(2,24,6),(2,24,74),(2,10,74)],True)                          # paragolpes trasero
    k.poly([(2,17,6),(14,10,12)]); k.poly([(2,17,74),(14,10,68)],far=True)
    k.box(46,6,-2, 106,18,10); k.poly([(46,18,-2),(52,24,-2),(100,24,-2),(106,18,-2)])  # pontón cercano
    k.box(46,6,70, 106,18,82,far=True)
    k.poly([(122,8,16),(160,8,22),(160,8,58),(122,8,64)],True)                    # trompa
    k.poly([(122,8,16),(126,22,22),(156,16,26),(160,8,22)]); k.poly([(126,22,22),(126,22,58),(156,16,54),(156,16,26)],True)
    k.poly([(126,22,58),(122,8,64)],far=True); k.poly([(156,16,54),(160,8,58)],far=True)
    k.box(14,10,50, 38,30,70)                                                      # motor
    k.poly([(48,10,30),(44,42,30),(56,42,30),(60,12,30)]); k.poly([(48,10,50),(44,42,50),(56,42,50),(60,12,50)],far=True)  # butaca
    k.poly([(44,42,30),(44,42,50)]); k.poly([(56,42,30),(56,42,50)])
    k.poly([(108,10,40),(92,36,40)])                                               # columna
    cx,cy=P(90,38,40); k.ell(cx,cy,10,5)                                           # volante
    k.poly([(54,40,40),(66,46,40),(86,40,34)]); k.poly([(66,46,40),(86,40,46)],far=True)   # piloto
    k.poly([(56,26,40),(78,20,40),(98,12,40)])
    hx,hy=P(58,58,40); k.add(f"M{f(hx-11)} {f(hy)} a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0")
    k.ell(hx+3,hy-1,8.5,4,half='front'); k.add(f"M{f(hx-11)} {f(hy)} Q{f(hx)} {f(hy+5)} {f(hx+11)} {f(hy)}")
    return k.svg()

def cubierta():
    k=Fig(); k.cyl_z(0,0,0,26,30,hub=17); return k.svg()

def cono():
    k=Fig(); rx,ry=24,8
    k.poly([(-34,0,-14),(34,0,-14),(34,0,22),(-34,0,22)],True)   # placa
    k.poly([(-34,0,-14),(-34,-5,-14),(34,-5,-14),(34,0,-14)])
    k.poly([(34,-5,-14),(34,-5,22),(34,0,22)])
    bx,by=P(0,0,4); ax,ay=P(0,70,4)
    k.ell(bx,by,rx,ry,half='front'); k.ell(bx,by,rx,ry,far=True,half='back')
    k.add(f"M{f(bx-rx)} {f(by)} L{f(ax-3)} {f(ay)} L{f(ax+3)} {f(ay)} L{f(bx+rx)} {f(by)}")
    for t in (0.32,0.62):
        r=rx*(1-t)+3*t; yy=by+(ay-by)*t; k.ell(bx,yy,r,ry*(1-t)+1.5,half='front'); k.ell(bx,yy,r,ry*(1-t)+1.5,far=True,half='back')
    return k.svg()

def copa():
    k=Fig(); prof=[(0,0,20,5),(1,6,20,5),(2,6,7,2),(3,14,4,1.2),(4,30,4,1.2),(5,36,12,3),(6,64,24,7)]
    for i,y,r,ry in prof:
        k.ell(0,-y,r,ry,half='front'); k.ell(0,-y,r,ry,far=(i!=6),half='back')
    pts=[(0,20),(6,20),(6,7),(14,4),(30,4),(36,12),(64,24)]
    for sg in (1,-1):
        k.add("M"+" L".join(f"{f(sg*r)} {f(-y)}" for y,r in pts))
    k.add("M-22 -60 C-34 -60 -34 -46 -15 -42 M22 -60 C34 -60 34 -46 15 -42")
    k.ell(0,-64,17,4.5,far=True)
    return k.svg()

def volante():
    k=Fig(); 
    for d,far in [(0,False),(6,True)]:
        k.ell(0,d,34,20,far); k.ell(0,d,26,14.5,far)
    k.add("M-34 0 L-34 6 M34 0 L34 6")
    k.ell(0,2,7,4); k.add("M-26 -1 L-7 1 M26 -1 L7 1 M0 6 L0 14")
    return k.svg()

def bandera():
    k=Fig(); W,H,N,M=72,40,6,4
    def pt(i,j):
        u=i/N; v=j/M; x=u*W; z=u*26; y=-v*H+ math.sin(u*math.pi*1.6)*6*(1)
        X,Y=P(x,0,z); return X, Y+y
    for i in range(N+1): k.add("M"+" L".join(f"{f(pt(i,j)[0])} {f(pt(i,j)[1])}" for j in range(M+1)), far=(0<i<N))
    for j in range(M+1):
        seg=[pt(i,j) for i in range(N+1)]
        k.add("M"+" L".join(f"{f(a)} {f(b)}" for a,b in seg), far=(0<j<M))
    for i in range(N):
        for j in range(M):
            if (i+j)%2==0:
                a,b,c,d=pt(i,j),pt(i+1,j),pt(i+1,j+1),pt(i,j+1)
                k.add(f"M{f(a[0])} {f(a[1])} L{f(c[0])} {f(c[1])} M{f(b[0])} {f(b[1])} L{f(d[0])} {f(d[1])}", far=True)
    k.add("M-2 2 L-2 86 M2 2 L2 86"); k.ell(0,2,2,1)
    return k.svg()

def crono():
    k=Fig()
    for d,far in [(0,False),(7,True)]: k.ell(0,d,26,26,far)
    k.add("M-26 0 L-26 7 M26 0 L26 7"); k.ell(0,0,21,21)
    k.add("M-5 -30 L5 -30 L5 -26 L-5 -26 Z M0 -26 L0 -22 M17 -20 L22 -25")
    k.add("M0 0 L0 -15 M0 0 L10 6"); 
    for a in range(12):
        t=a*math.pi/6; k.add(f"M{f(18*math.cos(t))} {f(18*math.sin(t))} L{f(21*math.cos(t))} {f(21*math.sin(t))}")
    return k.svg()

def casco():
    k=Fig()
    casco_d="M-30 14 C-34 -26 -6 -36 10 -34 C32 -32 40 -14 38 6 L36 18 C36 22 32 24 28 24 L-22 24 C-28 24 -30 20 -30 14 Z"
    ox,oy=CZ*-22, SZ*22   # cara de atrás del casco, corrida en profundidad
    import re
    def mover(d):
        toks=re.split(r"(-?\d+\.?\d*)",d); res=[]; i=0
        for t in toks:
            if re.fullmatch(r"-?\d+\.?\d*",t): res.append(f(float(t)+(ox if i%2==0 else oy))); i+=1
            else: res.append(t)
        return "".join(res)
    k.add(mover(casco_d), far=True)
    for x,y in [(-30,14),(10,-34),(38,6),(28,24)]: k.add(f"M{x} {y} L{f(x+ox)} {f(y+oy)}", far=True)
    k.add(casco_d)
    k.add("M-22 24 C-18 30 26 30 28 24", far=True)
    k.add("M-2 -10 L36 -10 C40 -2 40 6 37 10 L4 10 C-2 10 -4 4 -2 -10 Z")
    k.add("M2 -6 L34 -6 M0 6 L36 6", far=True)
    k.add("M-30 14 C-10 10 6 12 22 18 M-26 -6 C-14 -14 -4 -18 10 -20", far=True)
    return k.svg()

piezas = [
  (kart(), 30, 250, 1.4, 0), (casco(), 450, 170, 1.15, -6), (bandera(), 600, 100, 1.1, 0),
  (volante(), 120, 430, 1.3, -8), (cubierta(), 370, 440, 1.0, 0), (crono(), 660, 430, 1.1, 10),
  (cono(), 90, 720, 1.05, 0), (kart(), 290, 690, 1.0, 0), (copa(), 640, 760, 1.05, 0),
]
g="".join(f'<g transform="translate({x} {y}) rotate({r}) scale({s})">{svg}</g>' for svg,x,y,s,r in piezas)
out=f'''<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <!-- Fondo: figuras de karting en 3D (perspectiva), solo contorno rojo. Generado; se repite como mosaico. -->
  <defs>
    <filter id="neon" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <style>path{{fill:none;stroke:#ff1e28;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}} path.l{{stroke-opacity:.42;stroke-width:1.1}}</style>
  </defs>
  <g filter="url(#neon)" opacity=".9">{g}</g>
</svg>
'''
open(OUT,"w").write(out)
