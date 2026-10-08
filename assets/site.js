(()=>{document.querySelectorAll("form.waitlist").forEach(i=>{let e=i.querySelector(".status");i.addEventListener("submit",()=>{e.textContent=i.dataset.opened})});var Wc=[1.6,4.2],Od={1:1.1,2:1.6,3:2.2},zg=51,lr=["threads","people","places"],kc=[0,1,-1,2,-2],Vc={sigma:1.6,background:.08},Rr={base:470,cap:12e4,trail:18e3},Si={inner:900,outer:1600,stars:9e3,halo:.015,band:.35,tilt:.6,thickness:.16},Qt={core:4,reach:3.2,gap:12,future:44,twist:2.2,swirl:.9,inner:.22,depth:4,room:3,ahead:[.3,.7],today:.06,sweep:1.9*Math.PI,growth:1.75,rise:26},pa=.25,kg=i=>/^\d{4}$/.test(i)?"year":/^\d{4}-\d{2}$/.test(i)?"month":null,kd=(i=Date.now())=>{let e=new Date(i),t=e.getFullYear(),n=Date.UTC(t,e.getMonth(),e.getDate());return t+(n-Date.UTC(t,0,1))/(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))},vo=(i,e=Date.now())=>{let[t,n]=i.split("-").map(Number),r=new Date(e);return(t-r.getFullYear())*12+(n-1-r.getMonth())},xo=(i,e)=>!Number.isFinite(i)||i<0?"":new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(i,"month");var ys=i=>i-1980;function Vg(i){let e=new Map;i.forEach(({date:n})=>e.set(n,(e.get(n)??0)+1));let t=new Map;return i.map(({date:n})=>{let r=kg(n);if(!r)throw new Error(`date "${n}" is neither YYYY nor YYYY-MM`);let s=+n.slice(0,4),a=t.get(n)??0;t.set(n,a+1);let o=(a+.5)/e.get(n);return r==="month"?s+(+n.slice(5,7)-1+o)/12:s+o})}function Gg(i,e){let t=[];return i.map((n,r)=>{let s=new Set;for(let a=r-1;a>=0&&n-i[a]<=e;a--)s.add(t[a]);return t[r]=kc.find(a=>!s.has(a))??kc[r%kc.length],t[r]})}function Hg(i){return i.map(e=>{let t=i.filter(n=>Math.abs(n-e)<=.6).length;return Math.min(1,1/Math.sqrt(Math.max(1,t/2)))})}var Ss=i=>Math.min(1,Math.max(0,i)),Wg=(i,e)=>(Math.sqrt(i.inner*i.inner+2*i.spin*e)-i.inner)/i.spin;function xs(i,e,t=0){let n=Wg(i,e),r=i.inner+i.spin*n+t;return[r*Math.sin(n)-i.pole[0],r*Math.cos(n)-i.pole[1],-7+Qt.rise*(e/i.length-.5)]}function Xg(i,e,t,n){let r=Array.from({length:t},()=>[]),s=Array.from({length:t},()=>0);i.forEach((v,g)=>{e[g]<0||(r[e[g]].push(v),s[e[g]]+=1)});let a=[];r.forEach((v,g)=>a.push(v.length?Math.min(...v):a[g-1]??1980));let o=s.map(v=>Qt.core+Qt.reach*Math.sqrt(v)),l=o.reduce((v,g)=>v+2*g,0)+Qt.gap*t+Qt.future,c=2*l/(Qt.sweep*(1+Qt.growth)),h={inner:c,spin:c*(Qt.growth-1)/Qt.sweep,length:l,pole:[0,0]},p=0,d=o.map(v=>{let g=p+v;return p+=2*v+Qt.gap,g}),u=[...d.map((v,g)=>[xs(h,v),o[g]]),...Array.from({length:9},(v,g)=>[xs(h,p+Qt.future*g/8),3])],m=[0,1].map(v=>[Math.min(...u.map(([g,_])=>g[v]-_)),Math.max(...u.map(([g,_])=>g[v]+_))]);h.pole=m.map(([v,g])=>(v+g)/2);let f=o.map((v,g)=>{let _=a.slice(g+1).find((O,k)=>r[g+1+k].length&&O>a[g]),M=Math.max(_??Math.max(n,...r[g]),a[g]+1),T=r[g].length,S=r[g].length?Math.max(...r[g])-Math.min(...r[g])+1:1,b=Ss(S/12)*(1-.7*Ss(s[g]/50)),I={ratio:Hc.stretch?1+Hc.stretch*.9*b:1,angle:(g*Qt.twist+T*.37)%Math.PI};return{start:a[g],end:M,count:T,radius:v,turn:g*Qt.twist,along:d[g],centre:xs(h,d[g]),axis:I}});return{...h,ahead:p,list:f}}var _o=(i,e)=>{let t=i.list.findIndex(n=>e<n.end);return t<0?i.list.length-1:t},yo=(i,e)=>Ss((e-i.start)/(i.end-i.start)),Fd=[1,2,5,10,20,50,100];function Vd(i,e=8){let t=Math.ceil(i.start+1e-9),n=Math.floor(i.end+1e-9),r=a=>Array.from({length:Math.max(0,n-t+1)},(o,l)=>t+l).filter(o=>o%a===0),s=Fd.find(a=>r(a).length<=e)??Fd.at(-1);return r(s).map(a=>({year:a,radius:i.radius*(Qt.inner+(1-Qt.inner)*yo(i,a))}))}var Bd=(i,e)=>(_o(i,e)+yo(i.list[_o(i,e)],e))/i.list.length;function Gd(i,e){if(e>=1)return 1/0;let t=Math.max(0,e)*i.list.length,n=i.list[Math.min(i.list.length-1,Math.floor(t))];return n.start+(t-Math.floor(t))*(n.end-n.start)}function Hd(i,e,t,n,r=0,s=0){let a=i.arms?.[Math.max(0,e)],o=(a?a.centre:Math.PI*2/Math.max(1,t)*Math.max(0,e))+i.turn+(i.swirl??Qt.swirl)*n+r,l=Math.max(.4,i.radius*(Qt.inner+(1-Qt.inner)*n)+s),[c,h]=Cr(i,l*Math.sin(o),l*Math.cos(o));return[i.centre[0]+c,i.centre[1]+h,i.centre[2]+Qt.depth*(n-.5)]}var Gc=(i,e,t=0)=>xs(i,i.ahead+e*Qt.future,t);function qg(i,e,t,n,r){let s=r.map(()=>0);t.forEach((u,m)=>{let f=r.indexOf(u.threads?.[0]);n[m]===e&&f>=0&&s[f]++});let a=s.map((u,m)=>[m,u]).filter(([,u])=>u>0),o=a.reduce((u,[,m])=>u+m,0)||1,l=Math.PI*2/Math.max(1,a.length)/4,c=a.map(([,u])=>Math.max(l,Math.PI*2*u/o)),h=Math.PI*2/c.reduce((u,m)=>u+m,0),p=0;i.arms={},a.forEach(([u],m)=>{let f=c[m]*h;i.arms[u]={centre:p+f/2,width:f},p+=f});let d=i.end-i.start;i.swirl=Qt.swirl*(.7+.8*Ss(d/14))}function Xc(i,e,{periods:t=[],today:n=1980+zg,threads:r=[]}={}){let s=i.map(l=>t.length?t.indexOf(l.period):0),a=i.find((l,c)=>s[c]<0);if(a)throw new Error(`memory ${a.id}: period "${a.period}" is not one of ${t.join(", ")}`);let o={...Xg(e,s,Math.max(1,t.length),n),periodOf:s};return Hc.arms&&r.length&&o.list.forEach((l,c)=>qg(l,c,i,s,r)),o}function Wd(i,e={},t={}){let n=Vg(i),r=Hg(n),s=lr.filter(d=>e[d]?.length),a=i.map(d=>Object.fromEntries(s.map(u=>[u,(d[u]??[]).map(m=>e[u].indexOf(m)).filter(m=>m>=0)]))),o=e.threads?.length??0,l=Xc(i,n,{...t,threads:e.threads??[]}),c=[],h=new Map;i.forEach((d,u)=>{let m=`${l.periodOf[u]}:${a[u].threads?.[0]??0}`;h.set(m,[...h.get(m)??[],u])});let p=Math.PI*2/Math.max(1,o);return h.forEach(d=>{let u=l.list[l.periodOf[d[0]]],m=(u.end-u.start)/(u.radius*(1-Qt.inner));Gg(d.map(f=>n[f]),Qt.room*m).forEach((f,v)=>{let g=d[v],_=yo(u,n[g]),M=u.radius*(Qt.inner+(1-Qt.inner)*_),T=u.arms?.[a[g].threads?.[0]??0]?.width??p,S=Math.max(-.45*T,Math.min(.45*T,f*Qt.room/Math.max(M,2)));c[g]=Hd(u,a[g].threads?.[0]??0,o,_,S)})}),n.map((d,u)=>({id:i[u].id,year:d,position:c[u],spread:(Od[i[u].weight]??Od[1])*r[u],weight:i[u].weight,members:a[u],period:l.periodOf[u],links:i[u].links??[]}))}function Xd(i){let[e,t]=Qt.ahead.map(n=>Gc(i,n));return{today:Gc(i,Qt.today),book:e,clone:t}}var qd=(i,e)=>e.reduce((t,n)=>t+n.weight*Math.exp(-(((i-n.year)/1.6)**2)),0),jd=i=>Math.max(...i.map(e=>qd(e.year,i)),1e-6);function jg(i,e,t=jd(e)){return Math.min(1,qd(i,e)/t)}function Yg(i,e,t,n){let r=Math.ceil((n-1980)/pa)+1,s=new Float32Array(r*Math.max(1,t)),a=Math.ceil(Vc.sigma*3/pa);for(let o of i)(o.members[e]??[]).forEach((l,c)=>{let h=(o.year-1980)/pa;for(let p=Math.max(0,Math.floor(h)-a);p<=Math.min(r-1,Math.ceil(h)+a);p++){let d=(p*pa-(o.year-1980))/Vc.sigma;s[p*t+l]+=o.weight*(c===0?1:.5)*Math.exp(-d*d)/3}});return{table:s,count:t,bins:r}}function Yd({table:i,count:e,bins:t},n,r){return Math.min(1,i[Math.min(t-1,Math.max(0,Math.round((n-1980)/pa)))*e+r])}function zd(i,e,t){let n=Array.from({length:i.count},(s,a)=>Vc.background+Yd(i,e,a)),r=t()*n.reduce((s,a)=>s+a,0);for(let s=0;s<i.count;s++)if((r-=n[s])<=0)return s;return i.count-1}function So(i,e=Si.inner,t=Si.outer){let n=i()*2-1,r=i()*Math.PI*2,s=e+(t-e)*i(),a=Math.sqrt(1-n*n)*s;return[a*Math.cos(r),a*Math.sin(r),n*s]}function $d(i){let e=i()*Math.PI*2,t=Ar(i)*Si.thickness,[n,r,s]=[Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t)];return[n,r*Math.cos(Si.tilt)-s*Math.sin(Si.tilt),r*Math.sin(Si.tilt)+s*Math.cos(Si.tilt)]}function Zd({count:i=Si.stars,random:e}){let t={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i),halo:new Float32Array(i)};for(let n=0;n<i;n++){let r=e()<Si.halo,s=r?.8+.2*e():.7*e()**7,a=!r&&e()<Si.band?$d(e):So(e,1,1),o=Si.outer-(Si.outer-Si.inner)*s;t.position.set(a.map(l=>l*o),n*3),t.seed[n]=e(),t.bright[n]=s,t.halo[n]=r?1:0,t.size[n]=1+1.2*s}return t}var Hc={stretch:.5,arms:1};function Cr(i,e,t){let n=i.axis;if(!n||n.ratio===1)return[e,t];let[r,s,a]=[Math.cos(n.angle),Math.sin(n.angle),Math.sqrt(n.ratio)],o=(e*r+t*s)*a,l=(-e*s+t*r)/a;return[o*r-l*s,o*s+l*r]}var qc=["personal","professional","product","education"],Jn={deep:{count:16e3,mobile:6e3,alpha:[.1,.8],band:.35,radius:1650,inner:400},far:{count:36,alpha:[.15,.4],radius:[5,14]},haze:{alpha:.08},glow:{max:.15,scale:2.6}},$g=([i,e,t])=>[Math.atan2(e,i)/(2*Math.PI)+.5,Math.acos(Math.max(-1,Math.min(1,t)))/Math.PI];function Jd({count:i=Jn.deep.count,random:e,centre:t=[0,0,0],inner:n=Jn.deep.inner,outer:r=Jn.deep.radius}){let[s,a]=Jn.deep.alpha,o={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i)};for(let l=0;l<i;l++){let c=e()<Jn.deep.band?$d(e):So(e,1,1),h=Math.hypot(...c),p=Math.log(r/(n*(r/n)**e()))/Math.log(r/n),d=r*(n/r)**p;o.position.set(c.map((u,m)=>t[m]+u/h*d),l*3),o.seed[l]=e(),o.bright[l]=Math.min(a,(s+(a-s)*e()**4)*(1+.6*p**3)),o.size[l]=1+1.4*p**4}return o}function Kd({count:i=Jn.far.count,random:e}){let[t,n]=Jn.far.alpha,[r,s]=Jn.far.radius;return Array.from({length:i},()=>{let[a,o]=$g(So(e,1,1));return{u:a,v:o,radius:r+(s-r)*e(),squash:.35+.5*e(),angle:e()*Math.PI,alpha:t+(n-t)*e()}})}function Qd(i,e){return{scale:i.radius*Jn.glow.scale,strength:Jn.glow.max*(.25+.75*(i.count/Math.max(1,e)))}}var Ar=i=>Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i());function Zg(i,{base:e=Rr.base,cap:t=Rr.cap}={}){let n=i.reduce((r,s)=>r+s.weight**1.5,0)||1;return Math.min(e,t/n)}function ep({marks:i,sky:e,today:t,random:n,base:r=Rr.base,cap:s=Rr.cap,trail:a=Rr.trail,facets:o={}}){let l=Zg(i,{base:r,cap:s}),c=T=>Math.max(8,Math.round(l*T.weight**1.5)),h=lr.filter(T=>o[T]?.length),p=i.reduce((T,S)=>T+c(S),0)+a,d={count:p,position:new Float32Array(p*3),center:new Float32Array(p*3),from:new Float32Array(p*3),facet:Object.fromEntries(lr.map(T=>[T,new Float32Array(p).fill(-1)])),u:new Float32Array(p),order:new Float32Array(p),seed:new Float32Array(p),size:new Float32Array(p),ahead:new Float32Array(p),kind:new Float32Array(p),memory:new Float32Array(p),galaxy:new Float32Array(p).fill(-1)},u=(T,S,b,I,O,k,D,q,B)=>{d.position.set(S,T*3),d.center.set(b,T*3),d.from.set(So(n),T*3),d.u[T]=I,d.order[T]=B,d.seed[T]=n(),d.size[T]=O,d.ahead[T]=k,d.kind[T]=D,d.memory[T]=q},m=0;i.forEach((T,S)=>{for(let b=0,I=c(T);b<I;b++,m++){let O=[Ar(n),Ar(n),Ar(n)*.8],k=T.spread*Math.abs(Ar(n))*.55,D=Math.hypot(...O)||1,q=O.map(B=>B/D*k);u(m,T.position.map((B,ee)=>B+q[ee]),T.position,ys(T.year),.1+n()*.16,0,1,S,Bd(e,T.year)),d.galaxy[m]=T.period;for(let B of h)d.facet[B][m]=T.members[B][0]??-1}});let f=t+Wc[1]+.4,v=Object.fromEntries(h.map(T=>[T,Yg(i,T,o[T].length,f)])),g=o.threads?.length??0,_=Math.PI*2/Math.max(1,g),M=jd(i);for(let T=0;T<a;T++,m++){let S=n()<.06,b=S?t+n()*(f-t):1980+n()*(t-1980),I=v.threads?S?Math.floor(n()*g):zd(v.threads,b,n):-1,O=I>=0&&!S?Yd(v.threads,b,I):jg(b,i,M),k;if(S)k=Gc(e,n(),Ar(n)*2.4);else{let D=e.list[_o(e,b)],q=n()<.14,B=q?n()*.2:yo(D,b);k=Hd(D,I,g,B,Ar(n)*(D.arms?.[Math.max(0,I)]?.width??_)*(q?1.2:.14),Ar(n)*(.5+.9*O))}for(let D of h)d.facet[D][m]=D==="threads"?I:S?Math.floor(n()*o[D].length):zd(v[D],b,n);u(m,k,k,ys(b),.05+n()*.07,S?1:0,0,-1,S?1:Bd(e,b)),d.galaxy[m]=S?-1:_o(e,b)}return d}var si={start:1980,end:2031,book:2027.8,clone:2029.6},tp={seconds:16},np=(i,e,t=1980,n=tp.seconds)=>t+(e-t)*Ss(i/n),ip=(i,e,t=1980,n=tp.seconds)=>Ss((i-t)/(e-t))*n,Ms=i=>(i-si.start)/(si.end-si.start)*100,Ai={rate:.05,ramp:6,slots:16,near:.2},Jg=i=>Ai.rate*12/(i.radius+12),Kg=i=>i<=0?0:i-Ai.ramp*(1-Math.exp(-i/Ai.ramp)),rp=(i,e)=>-Jg(i)*Kg(e);var Qg=24;document.querySelectorAll(".countdown[data-until]").forEach(i=>{let e=vo(i.dataset.until);if(!(e>=0)){i.hidden=!0;return}i.querySelector(".remaining").textContent=` \xB7 ${xo(e,document.documentElement.lang)}`,i.querySelector(".scale").style.setProperty("--months",Math.min(e,Qg))});var kp=0,Ah=1,Vp=2;var Ka=1,Gp=2,$s=3,Zs=0,ni=1,er=2,tr=0,Ii=1,_r=2,Rh=3,Ch=4,Hp=5;var Js=100,Wp=101,Xp=102,qp=103,jp=104,Yp=200,$p=201,Zp=202,Jp=203,Kp=204,Qp=205,ef=206,tf=207,nf=208,rf=209,sf=210,af=211,of=212,lf=213,cf=214,Ih=0,Ph=1,Lh=2,Yl=3,Nh=4,Dh=5,Uh=6,Oh=7,hf=0,uf=1,df=2,Vi=0,Fh=1,Bh=2,zh=3,kh=4,Vh=5,Gh=6,Hh=7;var Ks=301,ss=302,$l=303,Zl=304,Qa=306,Jl=1e3,Kl=1001,pf=1002,Gi=1003,ff=1004;var eo=1005;var ii=1006,Ql=1007;var as=1008;var Hi=1009,mf=1010,gf=1011,to=1012,Wh=1013,Hr=1014,Pi=1015,nr=1016,Xh=1017,qh=1018,Qs=1020,_f=35902,vf=35899,xf=1021,yf=1022,ir=1023,os=1026,ls=1027,no=1028,jh=1029,cs=1030,Yh=1031;var $h=1033,ec=33776,tc=33777,nc=33778,ic=33779,Zh=35840,Jh=35841,Kh=35842,Qh=35843,eu=36196,tu=37492,nu=37496,iu=37488,ru=37489,rc=37490,su=37491,au=37808,ou=37809,lu=37810,cu=37811,hu=37812,uu=37813,du=37814,pu=37815,fu=37816,mu=37817,gu=37818,_u=37819,vu=37820,xu=37821,yu=36492,Su=36494,Mu=36495,bu=36283,Tu=36284,sc=36285,Eu=36286;var wu=0,Sf=1,hs="",Au="srgb",ac="srgb-linear",Ru="linear",on="srgb";var Mf=512,bf=513,Tf=514,oc=515,Ef=516,wf=517,lc=518,Af=519;var cc=35048;var Cu="300 es",Iu=2e3;function e0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function t0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ea(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Rf(){let i=Ea("canvas");return i.style.display="block",i}var sp={},zs=null;function wa(...i){let e="THREE."+i.shift();zs?zs("log",e,...i):console.log(e,...i)}function Cf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function et(...i){let e="THREE."+(i=Cf(i)).shift();if(zs)zs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function it(...i){let e="THREE."+(i=Cf(i)).shift();if(zs)zs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Kr(...i){let e=i.join(" ");e in sp||(sp[e]=!0,et(...i))}function If(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Pf={[Ih]:1,[Lh]:6,[Nh]:7,[Yl]:5,[Ph]:0,[Uh]:2,[Oh]:4,[Dh]:3},Ji=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Kn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Qo=Math.PI/180,el=180/Math.PI;function mr(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Kn[255&i]+Kn[i>>8&255]+Kn[i>>16&255]+Kn[i>>24&255]+"-"+Kn[255&e]+Kn[e>>8&255]+"-"+Kn[e>>16&15|64]+Kn[e>>24&255]+"-"+Kn[63&t|128]+Kn[t>>8&255]+"-"+Kn[t>>16&255]+Kn[t>>24&255]+Kn[255&n]+Kn[n>>8&255]+Kn[n>>16&255]+Kn[n>>24&255]).toLowerCase()}function wt(i,e,t){return Math.max(e,Math.min(t,i))}function n0(i,e){return(i%e+e)%e}function jc(i,e,t){return(1-t)*i+t*e}function Yi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function en(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:case Uint8ClampedArray:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Uu=class Uu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(wt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Uu.prototype.isVector2=!0;var _e=Uu,Ci=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],p=n[r+3],d=s[a+0],u=s[a+1],m=s[a+2],f=s[a+3];if(p!==f||l!==d||c!==u||h!==m){let v=l*d+c*u+h*m+p*f;v<0&&(d=-d,u=-u,m=-m,f=-f,v=-v);let g=1-o;if(v<.9995){let _=Math.acos(v),M=Math.sin(_);g=Math.sin(g*_)/M,l=l*g+d*(o=Math.sin(o*_)/M),c=c*g+u*o,h=h*g+m*o,p=p*g+f*o}else{l=l*g+d*o,c=c*g+u*o,h=h*g+m*o,p=p*g+f*o;let _=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=_,c*=_,h*=_,p*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],p=s[a],d=s[a+1],u=s[a+2],m=s[a+3];return e[t]=o*m+h*p+l*u-c*d,e[t+1]=l*m+h*d+c*p-o*u,e[t+2]=c*m+h*u+o*d-l*p,e[t+3]=h*m-o*p-l*d-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),p=o(s/2),d=l(n/2),u=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=d*h*p+c*u*m,this._y=c*u*p-d*h*m,this._z=c*h*m+d*u*p,this._w=c*h*p-d*u*m;break;case"YXZ":this._x=d*h*p+c*u*m,this._y=c*u*p-d*h*m,this._z=c*h*m-d*u*p,this._w=c*h*p+d*u*m;break;case"ZXY":this._x=d*h*p-c*u*m,this._y=c*u*p+d*h*m,this._z=c*h*m+d*u*p,this._w=c*h*p-d*u*m;break;case"ZYX":this._x=d*h*p-c*u*m,this._y=c*u*p+d*h*m,this._z=c*h*m-d*u*p,this._w=c*h*p+d*u*m;break;case"YZX":this._x=d*h*p+c*u*m,this._y=c*u*p+d*h*m,this._z=c*h*m-d*u*p,this._w=c*h*p-d*u*m;break;case"XZY":this._x=d*h*p-c*u*m,this._y=c*u*p-d*h*m,this._z=c*h*m+d*u*p,this._w=c*h*p+d*u*m;break;default:et("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],p=t[10],d=n+o+p;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-l)*u,this._y=(s-c)*u,this._z=(a-r)*u}else if(n>o&&n>p){let u=2*Math.sqrt(1+n-o-p);this._w=(h-l)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+c)/u}else if(o>p){let u=2*Math.sqrt(1+o-n-p);this._w=(s-c)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+p-n-o);this._w=(a-r)/u,this._x=(s+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ou=class Ou{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ap.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ap.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),p=2*(s*n-a*t);return this.x=t+l*c+a*p-o*h,this.y=n+l*h+o*c-s*p,this.z=r+l*p+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this.z=wt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this.z=wt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(wt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yc.copy(this).projectOnVector(e),this.sub(Yc)}reflect(e){return this.sub(Yc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ou.prototype.isVector3=!0;var P=Ou,Yc=new P,ap=new Ci,Fu=class Fu{constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],p=n[7],d=n[2],u=n[5],m=n[8],f=r[0],v=r[3],g=r[6],_=r[1],M=r[4],T=r[7],S=r[2],b=r[5],I=r[8];return s[0]=a*f+o*_+l*S,s[3]=a*v+o*M+l*b,s[6]=a*g+o*T+l*I,s[1]=c*f+h*_+p*S,s[4]=c*v+h*M+p*b,s[7]=c*g+h*T+p*I,s[2]=d*f+u*_+m*S,s[5]=d*v+u*M+m*b,s[8]=d*g+u*T+m*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],p=h*a-o*c,d=o*l-h*s,u=c*s-a*l,m=t*p+n*d+r*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let f=1/m;return e[0]=p*f,e[1]=(r*c-h*n)*f,e[2]=(o*n-r*a)*f,e[3]=d*f,e[4]=(h*t-r*l)*f,e[5]=(r*s-o*t)*f,e[6]=u*f,e[7]=(n*l-c*t)*f,e[8]=(a*t-n*s)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Kr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($c.makeScale(e,t)),this}rotate(e){return Kr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($c.makeRotation(-e)),this}translate(e,t){return Kr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($c.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Fu.prototype.isMatrix3=!0;var pt=Fu,$c=new pt,op=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lp=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function i0(){let i={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer==="srgb"&&(r.r=gr(r.r),r.g=gr(r.g),r.b=gr(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer==="srgb"&&(r.r=Bs(r.r),r.g=Bs(r.g),r.b=Bs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?"linear":this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Kr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Kr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ac]:{primaries:e,whitePoint:n,transfer:"linear",toXYZ:op,fromXYZ:lp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},[Au]:{primaries:e,whitePoint:n,transfer:"srgb",toXYZ:op,fromXYZ:lp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),i}var It=i0();function gr(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Bs(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var bs,tl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{bs===void 0&&(bs=Ea("canvas")),bs.width=e.width,bs.height=e.height;let r=bs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=bs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ea("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*gr(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*gr(t[n]/255)):t[n]=gr(t[n]);return{data:t,width:e.width,height:e.height}}return et("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},r0=0,ks=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=mr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Zc(r[a].image)):s.push(Zc(r[a]))}else s=Zc(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Zc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?tl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(et("Texture: Unable to serialize Texture."),{})}var s0=0,Jc=new P,oi=class i extends Ji{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,l=1009,c=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=mr(),this.name="",this.source=new ks(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _e(0,0),this.repeat=new _e(1,1),this.center=new _e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Jc).x}get height(){return this.source.getSize(Jc).y}get depth(){return this.source.getSize(Jc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){et(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:et(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};oi.DEFAULT_IMAGE=null,oi.DEFAULT_MAPPING=300,oi.DEFAULT_ANISOTROPY=1;var Bu=class Bu{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],p=l[8],d=l[1],u=l[5],m=l[9],f=l[2],v=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(p-f)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+f)<.1&&Math.abs(m+v)<.1&&Math.abs(c+u+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,T=(u+1)/2,S=(g+1)/2,b=(h+d)/4,I=(p+f)/4,O=(m+v)/4;return M>T&&M>S?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=b/n,s=I/n):T>S?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=b/r,s=O/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=I/s,r=O/s),this.set(n,r,s,t),this}let _=Math.sqrt((v-m)*(v-m)+(p-f)*(p-f)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(v-m)/_,this.y=(p-f)/_,this.z=(d-h)/_,this.w=Math.acos((c+u+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this.z=wt(this.z,e.z,t.z),this.w=wt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this.z=wt(this.z,e,t),this.w=wt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(wt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Bu.prototype.isVector4=!0;var an=Bu,nl=class extends Ji{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new an(0,0,e,t),this.scissorTest=!1,this.viewport=new an(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new oi(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new ks(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},pi=class extends nl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Aa=class extends oi{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var il=class extends oi{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var jl=class jl{constructor(e,t,n,r,s,a,o,l,c,h,p,d,u,m,f,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,p,d,u,m,f,v)}set(e,t,n,r,s,a,o,l,c,h,p,d,u,m,f,v){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=p,g[14]=d,g[3]=u,g[7]=m,g[11]=f,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new jl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Ts.setFromMatrixColumn(e,0).length(),s=1/Ts.setFromMatrixColumn(e,1).length(),a=1/Ts.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=l*h,t[4]=-l*p,t[8]=c,t[1]=u+m*c,t[5]=d-f*c,t[9]=-o*l,t[2]=f-d*c,t[6]=m+u*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,u=l*p,m=c*h,f=c*p;t[0]=d+f*o,t[4]=m*o-u,t[8]=a*c,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=u*o-m,t[6]=f+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,u=l*p,m=c*h,f=c*p;t[0]=d-f*o,t[4]=-a*p,t[8]=m+u*o,t[1]=u+m*o,t[5]=a*h,t[9]=f-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=l*h,t[4]=m*c-u,t[8]=d*c+f,t[1]=l*p,t[5]=f*c+d,t[9]=u*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,u=a*c,m=o*l,f=o*c;t[0]=l*h,t[4]=f-d*p,t[8]=m*p+u,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=u*p+m,t[10]=d-f*p}else if(e.order==="XZY"){let d=a*l,u=a*c,m=o*l,f=o*c;t[0]=l*h,t[4]=-p,t[8]=c*h,t[1]=d*p+f,t[5]=a*h,t[9]=u*p-m,t[2]=m*p-u,t[6]=o*h,t[10]=f*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(a0,e,o0)}lookAt(e,t,n){let r=this.elements;return Mi.subVectors(e,t),Mi.lengthSq()===0&&(Mi.z=1),Mi.normalize(),Ir.crossVectors(n,Mi),Ir.lengthSq()===0&&(Math.abs(n.z)===1?Mi.x+=1e-4:Mi.z+=1e-4,Mi.normalize(),Ir.crossVectors(n,Mi)),Ir.normalize(),Mo.crossVectors(Mi,Ir),r[0]=Ir.x,r[4]=Mo.x,r[8]=Mi.x,r[1]=Ir.y,r[5]=Mo.y,r[9]=Mi.y,r[2]=Ir.z,r[6]=Mo.z,r[10]=Mi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],p=n[5],d=n[9],u=n[13],m=n[2],f=n[6],v=n[10],g=n[14],_=n[3],M=n[7],T=n[11],S=n[15],b=r[0],I=r[4],O=r[8],k=r[12],D=r[1],q=r[5],B=r[9],ee=r[13],ae=r[2],re=r[6],ie=r[10],N=r[14],J=r[3],le=r[7],Ne=r[11],ve=r[15];return s[0]=a*b+o*D+l*ae+c*J,s[4]=a*I+o*q+l*re+c*le,s[8]=a*O+o*B+l*ie+c*Ne,s[12]=a*k+o*ee+l*N+c*ve,s[1]=h*b+p*D+d*ae+u*J,s[5]=h*I+p*q+d*re+u*le,s[9]=h*O+p*B+d*ie+u*Ne,s[13]=h*k+p*ee+d*N+u*ve,s[2]=m*b+f*D+v*ae+g*J,s[6]=m*I+f*q+v*re+g*le,s[10]=m*O+f*B+v*ie+g*Ne,s[14]=m*k+f*ee+v*N+g*ve,s[3]=_*b+M*D+T*ae+S*J,s[7]=_*I+M*q+T*re+S*le,s[11]=_*O+M*B+T*ie+S*Ne,s[15]=_*k+M*ee+T*N+S*ve,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],p=e[6],d=e[10],u=e[14],m=e[3],f=e[7],v=e[11],g=e[15],_=l*u-c*d,M=o*u-c*p,T=o*d-l*p,S=a*u-c*h,b=a*d-l*h,I=a*p-o*h;return t*(f*_-v*M+g*T)-n*(m*_-v*S+g*b)+r*(m*M-f*S+g*I)-s*(m*T-f*b+v*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(s*h-o*l)+r*(s*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],p=e[9],d=e[10],u=e[11],m=e[12],f=e[13],v=e[14],g=e[15],_=t*o-n*a,M=t*l-r*a,T=t*c-s*a,S=n*l-r*o,b=n*c-s*o,I=r*c-s*l,O=h*f-p*m,k=h*v-d*m,D=h*g-u*m,q=p*v-d*f,B=p*g-u*f,ee=d*g-u*v,ae=_*ee-M*B+T*q+S*D-b*k+I*O;if(ae===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let re=1/ae;return e[0]=(o*ee-l*B+c*q)*re,e[1]=(r*B-n*ee-s*q)*re,e[2]=(f*I-v*b+g*S)*re,e[3]=(d*b-p*I-u*S)*re,e[4]=(l*D-a*ee-c*k)*re,e[5]=(t*ee-r*D+s*k)*re,e[6]=(v*T-m*I-g*M)*re,e[7]=(h*I-d*T+u*M)*re,e[8]=(a*B-o*D+c*O)*re,e[9]=(n*D-t*B-s*O)*re,e[10]=(m*b-f*T+g*_)*re,e[11]=(p*T-h*b-u*_)*re,e[12]=(o*k-a*q-l*O)*re,e[13]=(t*q-n*k+r*O)*re,e[14]=(f*M-m*S-v*_)*re,e[15]=(h*S-p*M+d*_)*re,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,p=o+o,d=s*c,u=s*h,m=s*p,f=a*h,v=a*p,g=o*p,_=l*c,M=l*h,T=l*p,S=n.x,b=n.y,I=n.z;return r[0]=(1-(f+g))*S,r[1]=(u+T)*S,r[2]=(m-M)*S,r[3]=0,r[4]=(u-T)*b,r[5]=(1-(d+g))*b,r[6]=(v+_)*b,r[7]=0,r[8]=(m+M)*I,r[9]=(v-_)*I,r[10]=(1-(d+f))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Ts.set(r[0],r[1],r[2]).length(),o=Ts.set(r[4],r[5],r[6]).length(),l=Ts.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Ui.copy(this);let c=1/a,h=1/o,p=1/l;return Ui.elements[0]*=c,Ui.elements[1]*=c,Ui.elements[2]*=c,Ui.elements[4]*=h,Ui.elements[5]*=h,Ui.elements[6]*=h,Ui.elements[8]*=p,Ui.elements[9]*=p,Ui.elements[10]*=p,t.setFromRotationMatrix(Ui),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2*s/(t-e),p=2*s/(n-r),d=(t+e)/(t-e),u=(n+r)/(n-r),m,f;if(l)m=s/(a-s),f=a*s/(a-s);else if(o===2e3)m=-(a+s)/(a-s),f=-2*a*s/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),f=-a*s/(a-s)}return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=p,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=f,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2/(t-e),p=2/(n-r),d=-(t+e)/(t-e),u=-(n+r)/(n-r),m,f;if(l)m=1/(a-s),f=a/(a-s);else if(o===2e3)m=-2/(a-s),f=-(a+s)/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),f=-s/(a-s)}return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=p,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=m,c[14]=f,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};jl.prototype.isMatrix4=!0;var vt=jl,Ts=new P,Ui=new vt,a0=new P(0,0,0),o0=new P(1,1,1),Ir=new P,Mo=new P,Mi=new P,cp=new vt,hp=new Ci,Fr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],p=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-wt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:et("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hp.setFromEuler(this),this.setFromQuaternion(hp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fr.DEFAULT_ORDER="XYZ";var Ra=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},l0=0,up=new P,Es=new Ci,cr=new vt,bo=new P,fa=new P,c0=new P,h0=new Ci,dp=new P(1,0,0),pp=new P(0,1,0),fp=new P(0,0,1),mp={type:"added"},u0={type:"removed"},ws={type:"childadded",child:null},Kc={type:"childremoved",child:null},li=class i extends Ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:l0++}),this.uuid=mr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new Fr,n=new Ci,r=new P(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new pt}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ra,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Es.setFromAxisAngle(e,t),this.quaternion.multiply(Es),this}rotateOnWorldAxis(e,t){return Es.setFromAxisAngle(e,t),this.quaternion.premultiply(Es),this}rotateX(e){return this.rotateOnAxis(dp,e)}rotateY(e){return this.rotateOnAxis(pp,e)}rotateZ(e){return this.rotateOnAxis(fp,e)}translateOnAxis(e,t){return up.copy(e).applyQuaternion(this.quaternion),this.position.add(up.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(dp,e)}translateY(e){return this.translateOnAxis(pp,e)}translateZ(e){return this.translateOnAxis(fp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(cr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bo.copy(e):bo.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),fa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cr.lookAt(fa,bo,this.up):cr.lookAt(bo,fa,this.up),this.quaternion.setFromRotationMatrix(cr),r&&(cr.extractRotation(r.matrixWorld),Es.setFromRotationMatrix(cr),this.quaternion.premultiply(Es.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mp),ws.child=e,this.dispatchEvent(ws),ws.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(u0),Kc.child=e,this.dispatchEvent(Kc),Kc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),cr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),cr.multiply(e.parent.matrixWorld)),e.applyMatrix4(cr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mp),ws.child=e,this.dispatchEvent(ws),ws.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fa,e,c0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fa,h0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),p=a(e.shapes),d=a(e.skeletons),u=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};li.DEFAULT_UP=new P(0,1,0),li.DEFAULT_MATRIX_AUTO_UPDATE=!0,li.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fr=class extends li{constructor(){super(),this.isGroup=!0,this.type="Group"}},d0={type:"move"},Vs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let f of e.hand.values()){let v=t.getJointPose(f,n),g=this._getHandJoint(c,f);v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=v.radius),g.visible=v!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],d=h.position.distanceTo(p.position),u=.02,m=.005;c.inputState.pinching&&d>u+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=u-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(d0)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new fr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Lf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pr={h:0,s:0,l:0},To={h:0,s:0,l:0};function Qc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var _t=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,It.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=It.workingColorSpace){return this.r=e,this.g=t,this.b=n,It.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=It.workingColorSpace){if(e=n0(e,1),t=wt(t,0,1),n=wt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Qc(a,s,e+1/3),this.g=Qc(a,s,e),this.b=Qc(a,s,e-1/3)}return It.colorSpaceToWorking(this,r),this}setStyle(e,t="srgb"){function n(s){s!==void 0&&parseFloat(s)<1&&et("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:et("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);et("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=Lf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):et("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gr(e.r),this.g=gr(e.g),this.b=gr(e.b),this}copyLinearToSRGB(e){return this.r=Bs(e.r),this.g=Bs(e.g),this.b=Bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return It.workingToColorSpace(Qn.copy(this),e),65536*Math.round(wt(255*Qn.r,0,255))+256*Math.round(wt(255*Qn.g,0,255))+Math.round(wt(255*Qn.b,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=It.workingColorSpace){It.workingToColorSpace(Qn.copy(this),t);let n=Qn.r,r=Qn.g,s=Qn.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let p=a-o;switch(c=h<=.5?p/(a+o):p/(2-a-o),a){case n:l=(r-s)/p+(r<s?6:0);break;case r:l=(s-n)/p+2;break;case s:l=(n-r)/p+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=It.workingColorSpace){return It.workingToColorSpace(Qn.copy(this),t),e.r=Qn.r,e.g=Qn.g,e.b=Qn.b,e}getStyle(e="srgb"){It.workingToColorSpace(Qn.copy(this),e);let t=Qn.r,n=Qn.g,r=Qn.b;return e!=="srgb"?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(Pr),this.setHSL(Pr.h+e,Pr.s+t,Pr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pr),e.getHSL(To);let n=jc(Pr.h,To.h,t),r=jc(Pr.s,To.s,t),s=jc(Pr.l,To.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qn=new _t;_t.NAMES=Lf;var Ca=class extends li{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fr,this.environmentIntensity=1,this.environmentRotation=new Fr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Oi=new P,hr=new P,eh=new P,ur=new P,As=new P,Rs=new P,gp=new P,th=new P,nh=new P,ih=new P,rh=new an,sh=new an,ah=new an,$i=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Oi.subVectors(e,t),r.cross(Oi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Oi.subVectors(r,t),hr.subVectors(n,t),eh.subVectors(e,t);let a=Oi.dot(Oi),o=Oi.dot(hr),l=Oi.dot(eh),c=hr.dot(hr),h=hr.dot(eh),p=a*c-o*o;if(p===0)return s.set(0,0,0),null;let d=1/p,u=(c*l-o*h)*d,m=(a*h-o*l)*d;return s.set(1-u-m,m,u)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ur)!==null&&ur.x>=0&&ur.y>=0&&ur.x+ur.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,ur)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ur.x),l.addScaledVector(a,ur.y),l.addScaledVector(o,ur.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return rh.setScalar(0),sh.setScalar(0),ah.setScalar(0),rh.fromBufferAttribute(e,t),sh.fromBufferAttribute(e,n),ah.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(rh,s.x),a.addScaledVector(sh,s.y),a.addScaledVector(ah,s.z),a}static isFrontFacing(e,t,n,r){return Oi.subVectors(n,t),hr.subVectors(e,t),Oi.cross(hr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Oi.subVectors(this.c,this.b),hr.subVectors(this.a,this.b),.5*Oi.cross(hr).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;As.subVectors(r,n),Rs.subVectors(s,n),th.subVectors(e,n);let l=As.dot(th),c=Rs.dot(th);if(l<=0&&c<=0)return t.copy(n);nh.subVectors(e,r);let h=As.dot(nh),p=Rs.dot(nh);if(h>=0&&p<=h)return t.copy(r);let d=l*p-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(As,a);ih.subVectors(e,s);let u=As.dot(ih),m=Rs.dot(ih);if(m>=0&&u<=m)return t.copy(s);let f=u*c-l*m;if(f<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Rs,o);let v=h*m-u*p;if(v<=0&&p-h>=0&&u-m>=0)return gp.subVectors(s,r),o=(p-h)/(p-h+(u-m)),t.copy(r).addScaledVector(gp,o);let g=1/(v+f+d);return a=f*g,o=d*g,t.copy(n).addScaledVector(As,a).addScaledVector(Rs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zi=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Fi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Fi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Fi):Fi.fromBufferAttribute(s,a),Fi.applyMatrix4(e.matrixWorld),this.expandByPoint(Fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Eo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Eo.copy(n.boundingBox)),Eo.applyMatrix4(e.matrixWorld),this.union(Eo)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fi),Fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ma),wo.subVectors(this.max,ma),Cs.subVectors(e.a,ma),Is.subVectors(e.b,ma),Ps.subVectors(e.c,ma),Lr.subVectors(Is,Cs),Nr.subVectors(Ps,Is),Yr.subVectors(Cs,Ps);let t=[0,-Lr.z,Lr.y,0,-Nr.z,Nr.y,0,-Yr.z,Yr.y,Lr.z,0,-Lr.x,Nr.z,0,-Nr.x,Yr.z,0,-Yr.x,-Lr.y,Lr.x,0,-Nr.y,Nr.x,0,-Yr.y,Yr.x,0];return!!oh(t,Cs,Is,Ps,wo)&&(t=[1,0,0,0,1,0,0,0,1],!!oh(t,Cs,Is,Ps,wo)&&(Ao.crossVectors(Lr,Nr),t=[Ao.x,Ao.y,Ao.z],oh(t,Cs,Is,Ps,wo)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Fi).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(dr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},dr=[new P,new P,new P,new P,new P,new P,new P,new P],Fi=new P,Eo=new zi,Cs=new P,Is=new P,Ps=new P,Lr=new P,Nr=new P,Yr=new P,ma=new P,wo=new P,Ao=new P,$r=new P;function oh(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){$r.fromArray(i,s);let o=r.x*Math.abs($r.x)+r.y*Math.abs($r.y)+r.z*Math.abs($r.z),l=e.dot($r),c=t.dot($r),h=n.dot($r);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var OS=p0();function p0(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,r[l]=24,r[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,r[l]=-c-1,r[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,r[l]=13,r[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,r[l]=24,r[256|l]=24):(n[l]=31744,n[256|l]=64512,r[l]=13,r[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var In=new P,Ro=new _e,f0=0,Dt=class extends Ji{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:f0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ro.fromBufferAttribute(this,t),Ro.applyMatrix3(e),this.setXY(t,Ro.x,Ro.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)In.fromBufferAttribute(this,t),In.applyMatrix3(e),this.setXYZ(t,In.x,In.y,In.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)In.fromBufferAttribute(this,t),In.applyMatrix4(e),this.setXYZ(t,In.x,In.y,In.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)In.fromBufferAttribute(this,t),In.applyNormalMatrix(e),this.setXYZ(t,In.x,In.y,In.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)In.fromBufferAttribute(this,t),In.transformDirection(e),this.setXYZ(t,In.x,In.y,In.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Yi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ia=class extends Dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Pa=class extends Dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Je=class extends Dt{constructor(e,t,n){super(new Float32Array(e),t,n)}},m0=new zi,ga=new P,lh=new P,ki=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):m0.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ga.subVectors(e,this.center);let t=ga.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(ga,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ga.copy(e.center).add(lh)),this.expandByPoint(ga.copy(e.center).sub(lh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},g0=0,Ri=new vt,ch=new li,Ls=new P,bi=new zi,_a=new zi,Gn=new P,Rt=class i extends Ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:g0++}),this.uuid=mr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(e0(e)?Pa:Ia)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new pt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ri.makeRotationFromQuaternion(e),this.applyMatrix4(Ri),this}rotateX(e){return Ri.makeRotationX(e),this.applyMatrix4(Ri),this}rotateY(e){return Ri.makeRotationY(e),this.applyMatrix4(Ri),this}rotateZ(e){return Ri.makeRotationZ(e),this.applyMatrix4(Ri),this}translate(e,t,n){return Ri.makeTranslation(e,t,n),this.applyMatrix4(Ri),this}scale(e,t,n){return Ri.makeScale(e,t,n),this.applyMatrix4(Ri),this}lookAt(e){return ch.lookAt(e),ch.updateMatrix(),this.applyMatrix4(ch.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Je(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&et("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];bi.setFromBufferAttribute(s),this.morphTargetsRelative?(Gn.addVectors(this.boundingBox.min,bi.min),this.boundingBox.expandByPoint(Gn),Gn.addVectors(this.boundingBox.max,bi.max),this.boundingBox.expandByPoint(Gn)):(this.boundingBox.expandByPoint(bi.min),this.boundingBox.expandByPoint(bi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ki);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new P,1/0);if(e){let n=this.boundingSphere.center;if(bi.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];_a.setFromBufferAttribute(o),this.morphTargetsRelative?(Gn.addVectors(bi.min,_a.min),bi.expandByPoint(Gn),Gn.addVectors(bi.max,_a.max),bi.expandByPoint(Gn)):(bi.expandByPoint(_a.min),bi.expandByPoint(_a.max))}bi.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Gn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Gn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Gn.fromBufferAttribute(o,c),l&&(Ls.fromBufferAttribute(e,c),Gn.add(Ls)),r=Math.max(r,n.distanceToSquared(Gn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");a!==void 0&&a.count===n.count||(a=new Dt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let O=0;O<n.count;O++)o[O]=new P,l[O]=new P;let c=new P,h=new P,p=new P,d=new _e,u=new _e,m=new _e,f=new P,v=new P;function g(O,k,D){c.fromBufferAttribute(n,O),h.fromBufferAttribute(n,k),p.fromBufferAttribute(n,D),d.fromBufferAttribute(s,O),u.fromBufferAttribute(s,k),m.fromBufferAttribute(s,D),h.sub(c),p.sub(c),u.sub(d),m.sub(d);let q=1/(u.x*m.y-m.x*u.y);isFinite(q)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-u.y).multiplyScalar(q),v.copy(p).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(q),o[O].add(f),o[k].add(f),o[D].add(f),l[O].add(v),l[k].add(v),l[D].add(v))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let O=0,k=_.length;O<k;++O){let D=_[O],q=D.start;for(let B=q,ee=q+D.count;B<ee;B+=3)g(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let M=new P,T=new P,S=new P,b=new P;function I(O){S.fromBufferAttribute(r,O),b.copy(S);let k=o[O];M.copy(k),M.sub(S.multiplyScalar(S.dot(k))).normalize(),T.crossVectors(b,k);let D=T.dot(l[O])<0?-1:1;a.setXYZW(O,M.x,M.y,M.z,D)}for(let O=0,k=_.length;O<k;++O){let D=_[O],q=D.start;for(let B=q,ee=q+D.count;B<ee;B+=3)I(e.getX(B+0)),I(e.getX(B+1)),I(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Dt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let r=new P,s=new P,a=new P,o=new P,l=new P,c=new P,h=new P,p=new P;if(e)for(let d=0,u=e.count;d<u;d+=3){let m=e.getX(d+0),f=e.getX(d+1),v=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,f),a.fromBufferAttribute(t,v),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,f),c.fromBufferAttribute(n,v),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(f,l.x,l.y,l.z),n.setXYZ(v,c.x,c.y,c.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gn.fromBufferAttribute(e,t),Gn.normalize(),e.setXYZ(t,Gn.x,Gn.y,Gn.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,p=o.normalized,d=new c.constructor(l.length*h),u=0,m=0;for(let f=0,v=l.length;f<v;f++){u=o.isInterleavedBufferAttribute?l[f]*o.data.stride+o.offset:l[f]*h;for(let g=0;g<h;g++)d[m++]=c[u++]}return new Dt(d,h,p)}if(this.index===null)return et("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=e(r[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,p=c.length;h<p;h++){let d=e(c[h],n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,d=c.length;p<d;p++){let u=c[p];h.push(u.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],p=s[c];for(let d=0,u=p.length;d<u;d++)h.push(p[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},rl=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=mr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},ai=new P,La=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.applyMatrix4(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.applyNormalMatrix(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.transformDirection(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Yi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Yi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Yi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Yi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Yi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array),s=en(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){wa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Dt(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){wa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},hh=new P,_0=new P,v0=new pt,Bi=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=hh.subVectors(n,t).cross(_0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(hh),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||v0.getNormalMatrix(e),r=this.coplanarPoint(hh).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ns,x0=0,Ki=class extends Ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=mr(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){et(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:et(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new _t().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Bi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new _e().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Gs=class extends Ki{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},va=new P,Ds=new P,Us=new P,Os=new _e,xa=new _e,Nf=new vt,Co=new P,ya=new P,Io=new P,_p=new _e,uh=new _e,vp=new _e,Na=class extends li{constructor(e=new Gs){if(super(),this.isSprite=!0,this.type="Sprite",Ns===void 0){Ns=new Rt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new rl(t,5);Ns.setIndex([0,1,2,0,2,3]),Ns.setAttribute("position",new La(n,3,0,!1)),Ns.setAttribute("uv",new La(n,2,3,!1))}this.geometry=Ns,this.material=e,this.center=new _e(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&it('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ds.setFromMatrixScale(this.matrixWorld),Nf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Us.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ds.multiplyScalar(-Us.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;Po(Co.set(-.5,-.5,0),Us,a,Ds,r,s),Po(ya.set(.5,-.5,0),Us,a,Ds,r,s),Po(Io.set(.5,.5,0),Us,a,Ds,r,s),_p.set(0,0),uh.set(1,0),vp.set(1,1);let o=e.ray.intersectTriangle(Co,ya,Io,!1,va);if(o===null&&(Po(ya.set(-.5,.5,0),Us,a,Ds,r,s),uh.set(0,1),o=e.ray.intersectTriangle(Co,Io,ya,!1,va),o===null))return;let l=e.ray.origin.distanceTo(va);l<e.near||l>e.far||t.push({distance:l,point:va.clone(),uv:$i.getInterpolation(va,Co,ya,Io,_p,uh,vp,new _e),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Po(i,e,t,n,r,s){Os.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(xa.x=s*Os.x-r*Os.y,xa.y=r*Os.x+s*Os.y):xa.copy(Os),i.copy(e),i.x+=xa.x,i.y+=xa.y,i.applyMatrix4(Nf)}var FS=new P,BS=new P;var pr=new P,dh=new P,Lo=new P,No=new P,Qr=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=pr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pr.copy(this.origin).addScaledVector(this.direction,t),pr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){dh.copy(e).add(t).multiplyScalar(.5),Lo.copy(t).sub(e).normalize(),No.copy(this.origin).sub(dh);let s=.5*e.distanceTo(t),a=-this.direction.dot(Lo),o=No.dot(this.direction),l=-No.dot(Lo),c=No.lengthSq(),h=Math.abs(1-a*a),p,d,u,m;if(h>0)if(p=a*l-o,d=a*o-l,m=s*h,p>=0)if(d>=-m)if(d<=m){let f=1/h;p*=f,d*=f,u=p*(p+a*d+2*o)+d*(a*p+d+2*l)+c}else d=s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*l)+c;else d=-s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*l)+c;else d<=-m?(p=Math.max(0,-(-a*s+o)),d=p>0?-s:Math.min(Math.max(-s,-l),s),u=-p*p+d*(d+2*l)+c):d<=m?(p=0,d=Math.min(Math.max(-s,-l),s),u=d*(d+2*l)+c):(p=Math.max(0,-(a*s+o)),d=p>0?s:Math.min(Math.max(-s,-l),s),u=-p*p+d*(d+2*l)+c);else d=a>0?-s:s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(dh).addScaledVector(Lo,d),u}intersectSphere(e,t){if(e.radius<0)return null;pr.subVectors(e.center,this.origin);let n=pr.dot(this.direction),r=pr.dot(pr)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-d.z)*p,l=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,l=(e.min.z-d.z)*p),n>l||o>r?null:((o>n||n!=n)&&(n=o),(l<r||r!=r)&&(r=l),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,pr)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,p=e.x-a.x,d=e.y-a.y,u=e.z-a.z,m=t.x-a.x,f=t.y-a.y,v=t.z-a.z,g=n.x-a.x,_=n.y-a.y,M=n.z-a.z,T=Math.abs(l),S=Math.abs(c),b=Math.abs(h),I,O,k,D,q,B,ee,ae,re,ie,N,J;if(T>=S&&T>=b?(k=l,B=p,re=m,J=g,l>=0?(I=c,O=h,D=d,q=u,ee=f,ae=v,ie=_,N=M):(I=h,O=c,D=u,q=d,ee=v,ae=f,ie=M,N=_)):S>=b?(k=c,B=d,re=f,J=_,c>=0?(I=h,O=l,D=u,q=p,ee=v,ae=m,ie=M,N=g):(I=l,O=h,D=p,q=u,ee=m,ae=v,ie=g,N=M)):(k=h,B=u,re=v,J=M,h>=0?(I=l,O=c,D=p,q=d,ee=m,ae=f,ie=g,N=_):(I=c,O=l,D=d,q=p,ee=f,ae=m,ie=_,N=g)),k===0)return null;let le=I/k,Ne=O/k,ve=D-le*B,Oe=q-Ne*B,be=ee-le*re,de=ae-Ne*re,X=ie-le*J,ne=N-Ne*J,he=X*de-ne*be,oe=ve*ne-Oe*X,w=be*Oe-de*ve;if(r){if(he<0||oe<0||w<0)return null}else if((he<0||oe<0||w<0)&&(he>0||oe>0||w>0))return null;let E=he+oe+w;if(E===0)return null;let C=1/k*(he*B+oe*re+w*J);return(E>0?C<0:C>0)?null:this.at(C/E,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Da=class extends Ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},xp=new vt,Zr=new Qr,Do=new ki,yp=new P,Uo=new P,Oo=new P,Fo=new P,ph=new P,Bo=new P,Sp=new P,zo=new P,ti=class extends li{constructor(e=new Rt,t=new Da){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Bo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],p=s[l];h!==0&&(ph.fromBufferAttribute(p,e),a?Bo.addScaledVector(ph,h):Bo.addScaledVector(ph.sub(t),h))}t.add(Bo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Do.copy(n.boundingSphere),Do.applyMatrix4(s),Zr.copy(e.ray).recast(e.near),Do.containsPoint(Zr.origin)===!1&&(Zr.intersectSphere(Do,yp)===null||Zr.origin.distanceToSquared(yp)>(e.far-e.near)**2))return;xp.copy(s).invert(),Zr.copy(e.ray).applyMatrix4(xp),n.boundingBox!==null&&Zr.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Zr)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),M=Math.min(o.count,Math.min(v.start+v.count,u.start+u.count));_<M;_+=3)r=ko(this,g,e,n,c,h,p,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(o.count,u.start+u.count);m<f;m+=3)r=ko(this,a,e,n,c,h,p,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(l!==void 0)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),M=Math.min(l.count,Math.min(v.start+v.count,u.start+u.count));_<M;_+=3)r=ko(this,g,e,n,c,h,p,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(l.count,u.start+u.count);m<f;m+=3)r=ko(this,a,e,n,c,h,p,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};function y0(i,e,t,n,r,s,a,o){let l;if(l=e.side===1?n.intersectTriangle(a,s,r,!0,o):n.intersectTriangle(r,s,a,e.side===0,o),l===null)return null;zo.copy(o),zo.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(zo);return c<t.near||c>t.far?null:{distance:c,point:zo.clone(),object:i}}function ko(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Uo),i.getVertexPosition(l,Oo),i.getVertexPosition(c,Fo);let h=y0(i,e,t,n,Uo,Oo,Fo,Sp);if(h){let p=new P;$i.getBarycoord(Sp,Uo,Oo,Fo,p),r&&(h.uv=$i.getInterpolatedAttribute(r,o,l,c,p,new _e)),s&&(h.uv1=$i.getInterpolatedAttribute(s,o,l,c,p,new _e)),a&&(h.normal=$i.getInterpolatedAttribute(a,o,l,c,p,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new P,materialIndex:0};$i.getNormal(Uo,Oo,Fo,d.normal),h.face=d,h.barycoord=p}return h}var zS=new an,kS=new an,VS=new an,GS=new an,HS=new vt,WS=new P,XS=new ki,qS=new vt,jS=new Qr;var es=class extends oi{constructor(e=null,t=1,n=1,r,s,a,o,l,c=1003,h=1003,p,d){super(null,a,o,l,c,h,r,s,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},YS=new vt,$S=new vt;var ZS=new vt,JS=new vt;var KS=new zi,QS=new vt,eM=new ti,tM=new ki;var Jr=new ki,S0=new _e(.5,.5),Vo=new P,Br=class{constructor(e=new Bi,t=new Bi,n=new Bi,r=new Bi,s=new Bi,a=new Bi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],p=s[5],d=s[6],u=s[7],m=s[8],f=s[9],v=s[10],g=s[11],_=s[12],M=s[13],T=s[14],S=s[15];if(r[0].setComponents(c-a,u-h,g-m,S-_).normalize(),r[1].setComponents(c+a,u+h,g+m,S+_).normalize(),r[2].setComponents(c+o,u+p,g+f,S+M).normalize(),r[3].setComponents(c-o,u-p,g-f,S-M).normalize(),n)r[4].setComponents(l,d,v,T).normalize(),r[5].setComponents(c-l,u-d,g-v,S-T).normalize();else if(r[4].setComponents(c-l,u-d,g-v,S-T).normalize(),t===2e3)r[5].setComponents(c+l,u+d,g+v,S+T).normalize();else{if(t!==2001)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(l,d,v,T).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jr)}intersectsSprite(e){Jr.center.set(0,0,0);let t=S0.distanceTo(e.center);return Jr.radius=.7071067811865476+t,Jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Vo.x=r.normal.x>0?e.max.x:e.min.x,Vo.y=r.normal.y>0?e.max.y:e.min.y,Vo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Vo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Mp=new vt,sl=class i{constructor(){this.coordinateSystem=2e3,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];Mp.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new Br),n[r].setFromProjectionMatrix(Mp,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Br),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new i().copy(this)}};var yh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},nM=new vt,iM=new _t(1,1,1),rM=new Br,sM=new sl,aM=new zi,oM=new ki,lM=new P,cM=new P,hM=new P,uM=new yh,dM=new ti;var ts=class extends Ki{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},al=new P,ol=new P,bp=new vt,Sa=new Qr,Go=new ki,fh=new P,Tp=new P,ll=class extends li{constructor(e=new Rt,t=new ts){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)al.fromBufferAttribute(t,r-1),ol.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=al.distanceTo(ol);e.setAttribute("lineDistance",new Je(n,1))}else et("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Go.copy(n.boundingSphere),Go.applyMatrix4(r),Go.radius+=s,e.ray.intersectsSphere(Go)===!1)return;bp.copy(r).invert(),Sa.copy(e.ray).applyMatrix4(bp);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),u=Math.min(h.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=c){let v=h.getX(m),g=h.getX(m+1),_=Ho(this,e,Sa,l,v,g,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(u-1),f=h.getX(d),v=Ho(this,e,Sa,l,m,f,u-1);v&&t.push(v)}}else{let d=Math.max(0,a.start),u=Math.min(p.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=c){let v=Ho(this,e,Sa,l,m,m+1,m);v&&t.push(v)}if(this.isLineLoop){let m=Ho(this,e,Sa,l,u-1,d,u-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ho(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(al.fromBufferAttribute(o,r),ol.fromBufferAttribute(o,s),t.distanceSqToSegment(al,ol,fh,Tp)>n)return;fh.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(fh);return l<e.near||l>e.far?void 0:{distance:l,point:Tp.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Ep=new P,wp=new P,ns=class extends ll{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Ep.fromBufferAttribute(t,r),wp.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ep.distanceTo(wp);e.setAttribute("lineDistance",new Je(n,1))}else et("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Hs=class extends Ki{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ap=new vt,Sh=new Qr,Wo=new ki,Xo=new P,Qi=class extends li{constructor(e=new Rt,t=new Hs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wo.copy(n.boundingSphere),Wo.applyMatrix4(r),Wo.radius+=s,e.ray.intersectsSphere(Wo)===!1)return;Ap.copy(r).invert(),Sh.copy(e.ray).applyMatrix4(Ap);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null)for(let p=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);p<d;p++){let u=c.getX(p);Xo.fromBufferAttribute(h,u),Rp(Xo,u,l,r,e,t,this)}else for(let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);p<d;p++)Xo.fromBufferAttribute(h,p),Rp(Xo,p,l,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Rp(i,e,t,n,r,s,a){let o=Sh.distanceSqToPoint(i);if(o<t){let l=new P;Sh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Ua=class extends oi{constructor(e=[],t=301,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},zr=class extends oi{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var kr=class extends oi{constructor(e,t,n=1014,r,s,a,o=1003,l=1003,c,h=1026,p=1){if(h!==1026&&h!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:p},r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ks(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},cl=class extends kr{constructor(e,t=1014,n=301,r,s,a=1003,o=1003,l,c=1026){let h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Oa=class extends oi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},is=class i extends Rt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],p=[],d=0,u=0;function m(f,v,g,_,M,T,S,b,I,O,k){let D=T/I,q=S/O,B=T/2,ee=S/2,ae=b/2,re=I+1,ie=O+1,N=0,J=0,le=new P;for(let Ne=0;Ne<ie;Ne++){let ve=Ne*q-ee;for(let Oe=0;Oe<re;Oe++){let be=Oe*D-B;le[f]=be*_,le[v]=ve*M,le[g]=ae,c.push(le.x,le.y,le.z),le[f]=0,le[v]=0,le[g]=b>0?1:-1,h.push(le.x,le.y,le.z),p.push(Oe/I),p.push(1-Ne/O),N+=1}}for(let Ne=0;Ne<O;Ne++)for(let ve=0;ve<I;ve++){let Oe=d+ve+re*Ne,be=d+ve+re*(Ne+1),de=d+(ve+1)+re*(Ne+1),X=d+(ve+1)+re*Ne;l.push(Oe,be,X),l.push(be,de,X),J+=6}o.addGroup(u,J,k),u+=J,d+=N}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Je(c,3)),this.setAttribute("normal",new Je(h,3)),this.setAttribute("uv",new Je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},hl=class i extends Rt{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],l=[],c=[],h=t/2,p=Math.PI/2*e,d=t,u=2*p+d,m=2*n+s,f=r+1,v=new P,g=new P;for(let _=0;_<=m;_++){let M=0,T=0,S=0,b=0;if(_<=n){let k=_/n,D=k*Math.PI/2;T=-h-e*Math.cos(D),S=e*Math.sin(D),b=-e*Math.cos(D),M=k*p}else if(_<=n+s){let k=(_-n)/s;T=k*t-h,S=e,b=0,M=p+k*d}else{let k=(_-n-s)/n,D=k*Math.PI/2;T=h+e*Math.sin(D),S=e*Math.cos(D),b=e*Math.sin(D),M=p+d+k*p}let I=Math.max(0,Math.min(1,M/u)),O=0;_===0?O=.5/r:_===m&&(O=-.5/r);for(let k=0;k<=r;k++){let D=k/r,q=D*Math.PI*2,B=Math.sin(q),ee=Math.cos(q);g.x=-S*ee,g.y=T,g.z=S*B,o.push(g.x,g.y,g.z),v.set(-S*ee,b,S*B),v.normalize(),l.push(v.x,v.y,v.z),c.push(D+O,I)}if(_>0){let k=(_-1)*f;for(let D=0;D<r;D++){let q=k+D,B=k+D+1,ee=_*f+D,ae=_*f+D+1;a.push(q,B,ee),a.push(B,ae,ee)}}}this.setIndex(a),this.setAttribute("position",new Je(o,3)),this.setAttribute("normal",new Je(l,3)),this.setAttribute("uv",new Je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},ul=class i extends Rt{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new P,h=new _e;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let p=0,d=3;p<=t;p++,d+=3){let u=n+p/t*r;c.x=e*Math.cos(u),c.y=e*Math.sin(u),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let p=1;p<=t;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new Je(a,3)),this.setAttribute("normal",new Je(o,3)),this.setAttribute("uv",new Je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Fa=class i extends Rt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],p=[],d=[],u=[],m=0,f=[],v=n/2,g=0;function _(M){let T=m,S=new _e,b=new P,I=0,O=M===!0?e:t,k=M===!0?1:-1;for(let q=1;q<=r;q++)p.push(0,v*k,0),d.push(0,k,0),u.push(.5,.5),m++;let D=m;for(let q=0;q<=r;q++){let B=q/r*l+o,ee=Math.cos(B),ae=Math.sin(B);b.x=O*ae,b.y=v*k,b.z=O*ee,p.push(b.x,b.y,b.z),d.push(0,k,0),S.x=.5*ee+.5,S.y=.5*ae*k+.5,u.push(S.x,S.y),m++}for(let q=0;q<r;q++){let B=T+q,ee=D+q;M===!0?h.push(ee,ee+1,B):h.push(ee+1,ee,B),I+=3}c.addGroup(g,I,M===!0?1:2),g+=I}(function(){let M=new P,T=new P,S=0,b=(t-e)/n;for(let I=0;I<=s;I++){let O=[],k=I/s,D=k*(t-e)+e;for(let q=0;q<=r;q++){let B=q/r,ee=B*l+o,ae=Math.sin(ee),re=Math.cos(ee);T.x=D*ae,T.y=-k*n+v,T.z=D*re,p.push(T.x,T.y,T.z),M.set(ae,b,re).normalize(),d.push(M.x,M.y,M.z),u.push(B,1-k),O.push(m++)}f.push(O)}for(let I=0;I<r;I++)for(let O=0;O<s;O++){let k=f[O][I],D=f[O+1][I],q=f[O+1][I+1],B=f[O][I+1];(e>0||O!==0)&&(h.push(k,D,B),S+=3),(t>0||O!==s-1)&&(h.push(D,q,B),S+=3)}c.addGroup(g,S,0),g+=S})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Je(p,3)),this.setAttribute("normal",new Je(d,3)),this.setAttribute("uv",new Je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},dl=class i extends Fa{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Vr=class i extends Rt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(u,m,f,v){let g=v+1,_=[];for(let M=0;M<=g;M++){_[M]=[];let T=u.clone().lerp(f,M/g),S=m.clone().lerp(f,M/g),b=g-M;for(let I=0;I<=b;I++)_[M][I]=I===0&&M===g?T:T.clone().lerp(S,I/b)}for(let M=0;M<g;M++)for(let T=0;T<2*(g-M)-1;T++){let S=Math.floor(T/2);T%2==0?(l(_[M][S+1]),l(_[M+1][S]),l(_[M][S])):(l(_[M][S+1]),l(_[M+1][S+1]),l(_[M+1][S]))}}function l(u){s.push(u.x,u.y,u.z)}function c(u,m){let f=3*u;m.x=e[f+0],m.y=e[f+1],m.z=e[f+2]}function h(u,m,f,v){v<0&&u.x===1&&(a[m]=u.x-1),f.x===0&&f.z===0&&(a[m]=v/2/Math.PI+.5)}function p(u){return Math.atan2(u.z,-u.x)}function d(u){return Math.atan2(-u.y,Math.sqrt(u.x*u.x+u.z*u.z))}(function(u){let m=new P,f=new P,v=new P;for(let g=0;g<t.length;g+=3)c(t[g+0],m),c(t[g+1],f),c(t[g+2],v),o(m,f,v,u)})(r),(function(u){let m=new P;for(let f=0;f<s.length;f+=3)m.x=s[f+0],m.y=s[f+1],m.z=s[f+2],m.normalize().multiplyScalar(u),s[f+0]=m.x,s[f+1]=m.y,s[f+2]=m.z})(n),(function(){let u=new P;for(let m=0;m<s.length;m+=3){u.x=s[m+0],u.y=s[m+1],u.z=s[m+2];let f=p(u)/2/Math.PI+.5,v=d(u)/Math.PI+.5;a.push(f,1-v)}(function(){let m=new P,f=new P,v=new P,g=new P,_=new _e,M=new _e,T=new _e;for(let S=0,b=0;S<s.length;S+=9,b+=6){m.set(s[S+0],s[S+1],s[S+2]),f.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),_.set(a[b+0],a[b+1]),M.set(a[b+2],a[b+3]),T.set(a[b+4],a[b+5]),g.copy(m).add(f).add(v).divideScalar(3);let I=p(g);h(_,b+0,m,I),h(M,b+2,f,I),h(T,b+4,v,I)}})(),(function(){for(let m=0;m<a.length;m+=6){let f=a[m+0],v=a[m+2],g=a[m+4],_=Math.max(f,v,g),M=Math.min(f,v,g);_>.9&&M<.1&&(f<.2&&(a[m+0]+=1),v<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new Je(s,3)),this.setAttribute("normal",new Je(s.slice(),3)),this.setAttribute("uv",new Je(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},pl=class i extends Vr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},qo=new P,jo=new P,mh=new P,Yo=new $i,fl=class extends Rt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(Qo*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],p=new Array(3),d={},u=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:f,b:v,c:g}=Yo;if(f.fromBufferAttribute(o,c[0]),v.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),Yo.getNormal(mh),p[0]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,p[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,p[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,p[0]!==p[1]&&p[1]!==p[2]&&p[2]!==p[0])for(let _=0;_<3;_++){let M=(_+1)%3,T=p[_],S=p[M],b=Yo[h[_]],I=Yo[h[M]],O=`${T}_${S}`,k=`${S}_${T}`;k in d&&d[k]?(mh.dot(d[k].normal)<=s&&(u.push(b.x,b.y,b.z),u.push(I.x,I.y,I.z)),d[k]=null):O in d||(d[O]={index0:c[_],index1:c[M],normal:mh.clone()})}}for(let m in d)if(d[m]){let{index0:f,index1:v}=d[m];qo.fromBufferAttribute(o,f),jo.fromBufferAttribute(o,v),u.push(qo.x,qo.y,qo.z),u.push(jo.x,jo.y,jo.z)}this.setAttribute("position",new Je(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Ei=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){et("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(r=Math.floor(l+(c-l)/2),o=n[r]-a,o<0)l=r+1;else{if(!(o>0)){c=r;break}c=r-1}if(r=c,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new _e:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,r=[],s=[],a=[],o=new P,l=new vt;for(let u=0;u<=e;u++){let m=u/e;r[u]=this.getTangentAt(m,new P)}s[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),p=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),p<=c&&(c=p,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(wt(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(l.makeRotationAxis(o,m))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(wt(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],u*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ws=class extends Ei{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new _e){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=l-this.aX,u=c-this.aY;l=d*h-u*p+this.aX,c=d*p+u*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ml=class extends Ws{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Pu(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,p){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+p)+(l-o)/p;d*=h,u*=h,r(a,o,d,u)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var Cp=new P,Ip=new P,gh=new Pu,_h=new Pu,vh=new Pu,gl=class extends Ei{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new P){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=r[(c-1)%s]:(Ip.subVectors(r[0],r[1]).add(r[0]),o=Ip);let p=r[c%s],d=r[(c+1)%s];if(this.closed||c+2<s?l=r[(c+2)%s]:(Cp.subVectors(r[s-1],r[s-2]).add(r[s-1]),l=Cp),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(p),u),f=Math.pow(p.distanceToSquared(d),u),v=Math.pow(d.distanceToSquared(l),u);f<1e-4&&(f=1),m<1e-4&&(m=f),v<1e-4&&(v=f),gh.initNonuniformCatmullRom(o.x,p.x,d.x,l.x,m,f,v),_h.initNonuniformCatmullRom(o.y,p.y,d.y,l.y,m,f,v),vh.initNonuniformCatmullRom(o.z,p.z,d.z,l.z,m,f,v)}else this.curveType==="catmullrom"&&(gh.initCatmullRom(o.x,p.x,d.x,l.x,this.tension),_h.initCatmullRom(o.y,p.y,d.y,l.y,this.tension),vh.initCatmullRom(o.z,p.z,d.z,l.z,this.tension));return n.set(gh.calc(h),_h.calc(h),vh.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new P().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Pp(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function M0(i,e){let t=1-i;return t*t*e}function b0(i,e){return 2*(1-i)*i*e}function T0(i,e){return i*i*e}function ba(i,e,t,n){return M0(i,e)+b0(i,t)+T0(i,n)}function E0(i,e){let t=1-i;return t*t*t*e}function w0(i,e){let t=1-i;return 3*t*t*i*e}function A0(i,e){return 3*(1-i)*i*i*e}function R0(i,e){return i*i*i*e}function Ta(i,e,t,n,r){return E0(i,e)+w0(i,t)+A0(i,n)+R0(i,r)}var Ba=class extends Ei{constructor(e=new _e,t=new _e,n=new _e,r=new _e){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new _e){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ta(e,r.x,s.x,a.x,o.x),Ta(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},_l=class extends Ei{constructor(e=new P,t=new P,n=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ta(e,r.x,s.x,a.x,o.x),Ta(e,r.y,s.y,a.y,o.y),Ta(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},za=class extends Ei{constructor(e=new _e,t=new _e){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new _e){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new _e){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vl=class extends Ei{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ka=class extends Ei{constructor(e=new _e,t=new _e,n=new _e){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new _e){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(ba(e,r.x,s.x,a.x),ba(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Va=class extends Ei{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(ba(e,r.x,s.x,a.x),ba(e,r.y,s.y,a.y),ba(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ga=class extends Ei{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new _e){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return n.set(Pp(o,l.x,c.x,h.x,p.x),Pp(o,l.y,c.y,h.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new _e().fromArray(r))}return this}},xl=Object.freeze({__proto__:null,ArcCurve:ml,CatmullRomCurve3:gl,CubicBezierCurve:Ba,CubicBezierCurve3:_l,EllipseCurve:Ws,LineCurve:za,LineCurve3:vl,QuadraticBezierCurve:ka,QuadraticBezierCurve3:Va,SplineCurve:Ga}),yl=class extends Ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new xl[r.type]().fromJSON(r))}return this}},Ha=class extends yl{constructor(e){super(),this.type="Path",this.currentPoint=new _e,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new za(this.currentPoint.clone(),new _e(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new ka(this.currentPoint.clone(),new _e(e,t),new _e(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new Ba(this.currentPoint.clone(),new _e(e,t),new _e(n,r),new _e(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ga(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new Ws(e,t,n,r,s,a,o,l);if(this.curves.length>0){let p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Wa=class extends Ha{constructor(e){super(e),this.uuid=mr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Ha().fromJSON(r))}return this}};function C0(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Df(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=D0(i,e,s,t)),i.length>80*t){o=i[0],l=i[1];let h=o,p=l;for(let d=t;d<r;d+=t){let u=i[d],m=i[d+1];u<o&&(o=u),m<l&&(l=m),u>h&&(h=u),m>p&&(p=m)}c=Math.max(h-o,p-l),c=c!==0?32767/c:0}return Xa(s,a,t,o,l,c,0),a}function Df(i,e,t,n,r){let s;if(r===X0(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=Lp(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Lp(a/n|0,i[a],i[a+1],s);return s&&Xs(s,s.next)&&(ja(s),s=s.next),s}function rs(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!Xs(n,n.next)&&Sn(n.prev,n,n.next)!==0)n=n.next;else{if(ja(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Xa(i,e,t,n,r,s,a){if(!i)return;!a&&s&&z0(i,n,r,s);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(s?P0(i,n,r,s):I0(i))e.push(l.i,i.i,c.i),ja(i),i=c.next,o=c.next;else if((i=c)===o){a?a===1?Xa(i=L0(rs(i),e),e,t,n,r,s,2):a===2&&N0(i,e,t,n,r,s):Xa(rs(i),e,t,n,r,s,1);break}}}function I0(i){let e=i.prev,t=i,n=i.next;if(Sn(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(r,s,a),p=Math.min(o,l,c),d=Math.max(r,s,a),u=Math.max(o,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=p&&m.y<=u&&Ma(r,o,s,l,a,c,m.x,m.y)&&Sn(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function P0(i,e,t,n){let r=i.prev,s=i,a=i.next;if(Sn(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,p=s.y,d=a.y,u=Math.min(o,l,c),m=Math.min(h,p,d),f=Math.max(o,l,c),v=Math.max(h,p,d),g=Mh(u,m,e,t,n),_=Mh(f,v,e,t,n),M=i.prevZ,T=i.nextZ;for(;M&&M.z>=g&&T&&T.z<=_;){if(M.x>=u&&M.x<=f&&M.y>=m&&M.y<=v&&M!==r&&M!==a&&Ma(o,h,l,p,c,d,M.x,M.y)&&Sn(M.prev,M,M.next)>=0||(M=M.prevZ,T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&Ma(o,h,l,p,c,d,T.x,T.y)&&Sn(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;M&&M.z>=g;){if(M.x>=u&&M.x<=f&&M.y>=m&&M.y<=v&&M!==r&&M!==a&&Ma(o,h,l,p,c,d,M.x,M.y)&&Sn(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;T&&T.z<=_;){if(T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&Ma(o,h,l,p,c,d,T.x,T.y)&&Sn(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function L0(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Xs(n,r)&&Of(n,t,t.next,r)&&qa(n,r)&&qa(r,n)&&(e.push(n.i,t.i,r.i),ja(t),ja(t.next),t=i=r),t=t.next}while(t!==i);return rs(t)}function N0(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&G0(a,o)){let l=Ff(a,o);return a=rs(a,a.next),l=rs(l,l.next),Xa(a,e,t,n,r,s,0),void Xa(l,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function D0(i,e,t,n){let r=[];for(let s=0,a=e.length;s<a;s++){let o=Df(i,e[s]*n,s<a-1?e[s+1]*n:i.length,n,!1);o===o.next&&(o.steiner=!0),r.push(V0(o))}r.sort(U0);for(let s=0;s<r.length;s++)t=O0(r[s],t);return t}function U0(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function O0(i,e){let t=F0(i,e);if(!t)return e;let n=Ff(t,i);return rs(n,n.next),rs(t,t.next)}function F0(i,e){let t=e,n=i.x,r=i.y,s,a=-1/0;if(Xs(i,t))return t;do{if(Xs(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let p=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>a&&(a=p,s=t.x<t.next.x?t:t.next,p===n))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,l=s.x,c=s.y,h=1/0;t=s;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Uf(r<c?n:a,r,l,c,r<c?a:n,r,t.x,t.y)){let p=Math.abs(r-t.y)/(n-t.x);qa(t,i)&&(p<h||p===h&&(t.x>s.x||t.x===s.x&&B0(s,t)))&&(s=t,h=p)}t=t.next}while(t!==o);return s}function B0(i,e){return Sn(i.prev,i,e.prev)<0&&Sn(e.next,i,i.next)<0}function z0(i,e,t,n){let r=i;do r.z===0&&(r.z=Mh(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,k0(r)}function k0(i){let e,t=1;do{let n,r=i;i=null;let s=null;for(e=0;r;){e++;let a=r,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||r.z<=a.z)?(n=r,r=r.nextZ,o--):(n=a,a=a.nextZ,l--),s?s.nextZ=n:i=n,n.prevZ=s,s=n;r=a}s.nextZ=null,t*=2}while(e>1);return i}function Mh(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function V0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Uf(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Ma(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Uf(i,e,t,n,r,s,a,o)}function G0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!H0(i,e)&&(qa(i,e)&&qa(e,i)&&W0(i,e)&&(Sn(i.prev,i,e.prev)||Sn(i,e.prev,e))||Xs(i,e)&&Sn(i.prev,i,i.next)>0&&Sn(e.prev,e,e.next)>0)}function Sn(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Xs(i,e){return i.x===e.x&&i.y===e.y}function Of(i,e,t,n){let r=Zo(Sn(i,e,t)),s=Zo(Sn(i,e,n)),a=Zo(Sn(t,n,i)),o=Zo(Sn(t,n,e));return r!==s&&a!==o||!(r!==0||!$o(i,t,e))||!(s!==0||!$o(i,n,e))||!(a!==0||!$o(t,i,n))||!(o!==0||!$o(t,e,n))}function $o(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Zo(i){return i>0?1:i<0?-1:0}function H0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Of(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function qa(i,e){return Sn(i.prev,i,i.next)<0?Sn(i,e,i.next)>=0&&Sn(i,i.prev,e)>=0:Sn(i,e,i.prev)<0||Sn(i,i.next,e)<0}function W0(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ff(i,e){let t=bh(i.i,i.x,i.y),n=bh(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Lp(i,e,t,n){let r=bh(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function ja(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function bh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function X0(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var Th=class{static triangulate(e,t,n=2){return C0(e,t,n)}},Zi=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Np(e),Dp(n,e);let a=e.length;t.forEach(Np);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Dp(n,t[l]);let o=Th.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function Np(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Dp(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Sl=class i extends Rt{constructor(e=new Wa([new _e(.5,.5),new _e(-.5,.5),new _e(-.5,-.5),new _e(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:u-.1,f=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:q0,M,T,S,b,I,O=!1;if(g){M=g.getSpacedPoints(h),O=!0,d=!1;let C=!!g.isCatmullRomCurve3&&g.closed;T=g.computeFrenetFrames(h,C),S=new P,b=new P,I=new P}d||(v=0,u=0,m=0,f=0);let k=o.extractPoints(c),D=k.shape,q=k.holes;if(!Zi.isClockWise(D)){D=D.reverse();for(let C=0,U=q.length;C<U;C++){let y=q[C];Zi.isClockWise(y)&&(q[C]=y.reverse())}}function B(C){let U=10000000000000001e-36,y=C[0];for(let z=1;z<=C.length;z++){let F=z%C.length,R=C[F],j=R.x-y.x,Y=R.y-y.y,K=j*j+Y*Y,ue=Math.max(Math.abs(R.x),Math.abs(R.y),Math.abs(y.x),Math.abs(y.y));K<=U*ue*ue?(C.splice(F,1),z--):y=R}}B(D),q.forEach(B);let ee=q.length,ae=D;for(let C=0;C<ee;C++){let U=q[C];D=D.concat(U)}function re(C,U,y){return U||it("ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(U,y)}let ie=D.length;function N(C,U,y){let z,F,R,j=C.x-U.x,Y=C.y-U.y,K=y.x-C.x,ue=y.y-C.y,Ee=j*j+Y*Y,Se=j*ue-Y*K;if(Math.abs(Se)>Number.EPSILON){let fe=Math.sqrt(Ee),Be=Math.sqrt(K*K+ue*ue),ce=U.x-Y/fe,me=U.y+j/fe,ge=((y.x-ue/Be-ce)*ue-(y.y+K/Be-me)*K)/(j*ue-Y*K);z=ce+j*ge-C.x,F=me+Y*ge-C.y;let Ie=z*z+F*F;if(Ie<=2)return new _e(z,F);R=Math.sqrt(Ie/2)}else{let fe=!1;j>Number.EPSILON?K>Number.EPSILON&&(fe=!0):j<-Number.EPSILON?K<-Number.EPSILON&&(fe=!0):Math.sign(Y)===Math.sign(ue)&&(fe=!0),fe?(z=-Y,F=j,R=Math.sqrt(Ee)):(z=j,F=Y,R=Math.sqrt(Ee/2))}return new _e(z/R,F/R)}let J=[];for(let C=0,U=ae.length,y=U-1,z=C+1;C<U;C++,y++,z++)y===U&&(y=0),z===U&&(z=0),J[C]=N(ae[C],ae[y],ae[z]);let le=[],Ne,ve,Oe=J.concat();for(let C=0,U=ee;C<U;C++){let y=q[C];Ne=[];for(let z=0,F=y.length,R=F-1,j=z+1;z<F;z++,R++,j++)R===F&&(R=0),j===F&&(j=0),Ne[z]=N(y[z],y[R],y[j]);le.push(Ne),Oe=Oe.concat(Ne)}if(v===0)ve=Zi.triangulateShape(ae,q);else{let C=[],U=[];for(let y=0;y<v;y++){let z=y/v,F=u*Math.cos(z*Math.PI/2),R=m*Math.sin(z*Math.PI/2)+f;for(let j=0,Y=ae.length;j<Y;j++){let K=re(ae[j],J[j],R);ne(K.x,K.y,-F),z===0&&C.push(K)}for(let j=0,Y=ee;j<Y;j++){let K=q[j];Ne=le[j];let ue=[];for(let Ee=0,Se=K.length;Ee<Se;Ee++){let fe=re(K[Ee],Ne[Ee],R);ne(fe.x,fe.y,-F),z===0&&ue.push(fe)}z===0&&U.push(ue)}}ve=Zi.triangulateShape(C,U)}let be=ve.length,de=m+f;for(let C=0;C<ie;C++){let U=d?re(D[C],Oe[C],de):D[C];O?(b.copy(T.normals[0]).multiplyScalar(U.x),S.copy(T.binormals[0]).multiplyScalar(U.y),I.copy(M[0]).add(b).add(S),ne(I.x,I.y,I.z)):ne(U.x,U.y,0)}for(let C=1;C<=h;C++)for(let U=0;U<ie;U++){let y=d?re(D[U],Oe[U],de):D[U];O?(b.copy(T.normals[C]).multiplyScalar(y.x),S.copy(T.binormals[C]).multiplyScalar(y.y),I.copy(M[C]).add(b).add(S),ne(I.x,I.y,I.z)):ne(y.x,y.y,p/h*C)}for(let C=v-1;C>=0;C--){let U=C/v,y=u*Math.cos(U*Math.PI/2),z=m*Math.sin(U*Math.PI/2)+f;for(let F=0,R=ae.length;F<R;F++){let j=re(ae[F],J[F],z);ne(j.x,j.y,p+y)}for(let F=0,R=q.length;F<R;F++){let j=q[F];Ne=le[F];for(let Y=0,K=j.length;Y<K;Y++){let ue=re(j[Y],Ne[Y],z);O?ne(ue.x,ue.y+M[h-1].y,M[h-1].x+y):ne(ue.x,ue.y,p+y)}}}function X(C,U){let y=C.length;for(;--y>=0;){let z=y,F=y-1;F<0&&(F=C.length-1);for(let R=0,j=h+2*v;R<j;R++){let Y=ie*R,K=ie*(R+1);oe(U+z+Y,U+F+Y,U+F+K,U+z+K)}}}function ne(C,U,y){l.push(C),l.push(U),l.push(y)}function he(C,U,y){w(C),w(U),w(y);let z=r.length/3,F=_.generateTopUV(n,r,z-3,z-2,z-1);E(F[0]),E(F[1]),E(F[2])}function oe(C,U,y,z){w(C),w(U),w(z),w(U),w(y),w(z);let F=r.length/3,R=_.generateSideWallUV(n,r,F-6,F-3,F-2,F-1);E(R[0]),E(R[1]),E(R[3]),E(R[1]),E(R[2]),E(R[3])}function w(C){r.push(l[3*C+0]),r.push(l[3*C+1]),r.push(l[3*C+2])}function E(C){s.push(C.x),s.push(C.y)}(function(){let C=r.length/3;if(d){let U=0,y=ie*U;for(let z=0;z<be;z++){let F=ve[z];he(F[2]+y,F[1]+y,F[0]+y)}U=h+2*v,y=ie*U;for(let z=0;z<be;z++){let F=ve[z];he(F[0]+y,F[1]+y,F[2]+y)}}else{for(let U=0;U<be;U++){let y=ve[U];he(y[2],y[1],y[0])}for(let U=0;U<be;U++){let y=ve[U];he(y[0]+ie*h,y[1]+ie*h,y[2]+ie*h)}}n.addGroup(C,r.length/3-C,0)})(),(function(){let C=r.length/3,U=0;X(ae,U),U+=ae.length;for(let y=0,z=q.length;y<z;y++){let F=q[y];X(F,U),U+=F.length}n.addGroup(C,r.length/3-C,1)})()}this.setAttribute("position",new Je(r,3)),this.setAttribute("uv",new Je(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return j0(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new xl[r.type]().fromJSON(r)),new i(n,e.options)}},q0={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*r],h=e[3*r+1];return[new _e(s,a),new _e(o,l),new _e(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],p=e[3*n+2],d=e[3*r],u=e[3*r+1],m=e[3*r+2],f=e[3*s],v=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new _e(a,1-l),new _e(c,1-p),new _e(d,1-m),new _e(f,1-g)]:[new _e(o,1-l),new _e(h,1-p),new _e(u,1-m),new _e(v,1-g)]}};function j0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ml=class i extends Vr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},bl=class i extends Rt{constructor(e=[new _e(0,-.5),new _e(.5,0),new _e(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=wt(r,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,p=new P,d=new _e,u=new P,m=new P,f=new P,v=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,f.copy(u),u.normalize(),l.push(u.x,u.y,u.z);break;case e.length-1:l.push(f.x,f.y,f.z);break;default:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,m.copy(u),u.x+=f.x,u.y+=f.y,u.z+=f.z,u.normalize(),l.push(u.x,u.y,u.z),f.copy(m)}for(let _=0;_<=t;_++){let M=n+_*h*r,T=Math.sin(M),S=Math.cos(M);for(let b=0;b<=e.length-1;b++){p.x=e[b].x*T,p.y=e[b].y,p.z=e[b].x*S,a.push(p.x,p.y,p.z),d.x=_/t,d.y=b/(e.length-1),o.push(d.x,d.y);let I=l[3*b+0]*T,O=l[3*b+1],k=l[3*b+0]*S;c.push(I,O,k)}}for(let _=0;_<t;_++)for(let M=0;M<e.length-1;M++){let T=M+_*e.length,S=T,b=T+e.length,I=T+e.length+1,O=T+1;s.push(S,b,O),s.push(I,O,b)}this.setIndex(s),this.setAttribute("position",new Je(a,3)),this.setAttribute("uv",new Je(o,2)),this.setAttribute("normal",new Je(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Tl=class i extends Vr{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},qs=class i extends Rt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,p=e/o,d=t/l,u=[],m=[],f=[],v=[];for(let g=0;g<h;g++){let _=g*d-a;for(let M=0;M<c;M++){let T=M*p-s;m.push(T,-_,0),f.push(0,0,1),v.push(M/o),v.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){let M=_+c*g,T=_+c*(g+1),S=_+1+c*(g+1),b=_+1+c*g;u.push(M,T,b),u.push(T,S,b)}this.setIndex(u),this.setAttribute("position",new Je(m,3)),this.setAttribute("normal",new Je(f,3)),this.setAttribute("uv",new Je(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},El=class i extends Rt{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],p=e,d=(t-e)/(r=Math.max(1,r)),u=new P,m=new _e;for(let f=0;f<=r;f++){for(let v=0;v<=n;v++){let g=s+v/n*a;u.x=p*Math.cos(g),u.y=p*Math.sin(g),l.push(u.x,u.y,u.z),c.push(0,0,1),m.x=(u.x/t+1)/2,m.y=(u.y/t+1)/2,h.push(m.x,m.y)}p+=d}for(let f=0;f<r;f++){let v=f*(n+1);for(let g=0;g<n;g++){let _=g+v,M=_,T=_+n+1,S=_+n+2,b=_+1;o.push(M,T,b),o.push(T,S,b)}}this.setIndex(o),this.setAttribute("position",new Je(l,3)),this.setAttribute("normal",new Je(c,3)),this.setAttribute("uv",new Je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},wl=class i extends Rt{constructor(e=new Wa([new _e(0,.5),new _e(-.5,-.5),new _e(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let p=r.length/3,d=h.extractPoints(t),u=d.shape,m=d.holes;Zi.isClockWise(u)===!1&&(u=u.reverse());for(let v=0,g=m.length;v<g;v++){let _=m[v];Zi.isClockWise(_)===!0&&(m[v]=_.reverse())}let f=Zi.triangulateShape(u,m);for(let v=0,g=m.length;v<g;v++){let _=m[v];u=u.concat(_)}for(let v=0,g=u.length;v<g;v++){let _=u[v];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let v=0,g=f.length;v<g;v++){let _=f[v],M=_[0]+p,T=_[1]+p,S=_[2]+p;n.push(M,T,S),l+=3}}this.setIndex(n),this.setAttribute("position",new Je(r,3)),this.setAttribute("normal",new Je(s,3)),this.setAttribute("uv",new Je(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return Y0(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function Y0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var js=class i extends Rt{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],p=new P,d=new P,u=[],m=[],f=[],v=[];for(let g=0;g<=n;g++){let _=[],M=g/n,T=a+M*o,S=e*Math.cos(T),b=Math.sqrt(e*e-S*S),I=0;g===0&&a===0?I=.5/t:g===n&&l===Math.PI&&(I=-.5/t);for(let O=0;O<=t;O++){let k=O/t,D=r+k*s;p.x=-b*Math.cos(D),p.y=S,p.z=b*Math.sin(D),m.push(p.x,p.y,p.z),d.copy(p).normalize(),f.push(d.x,d.y,d.z),v.push(k+I,1-M),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let M=h[g][_+1],T=h[g][_],S=h[g+1][_],b=h[g+1][_+1];(g!==0||a>0)&&u.push(M,T,b),(g!==n-1||l<Math.PI)&&u.push(T,S,b)}this.setIndex(u),this.setAttribute("position",new Je(m,3)),this.setAttribute("normal",new Je(f,3)),this.setAttribute("uv",new Je(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Al=class i extends Vr{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Rl=class i extends Rt{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI,a=0,o=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let l=[],c=[],h=[],p=[],d=new P,u=new P,m=new P;for(let f=0;f<=n;f++){let v=a+f/n*o;for(let g=0;g<=r;g++){let _=g/r*s;u.x=(e+t*Math.cos(v))*Math.cos(_),u.y=(e+t*Math.cos(v))*Math.sin(_),u.z=t*Math.sin(v),c.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),m.subVectors(u,d).normalize(),h.push(m.x,m.y,m.z),p.push(g/r),p.push(f/n)}}for(let f=1;f<=n;f++)for(let v=1;v<=r;v++){let g=(r+1)*f+v-1,_=(r+1)*(f-1)+v-1,M=(r+1)*(f-1)+v,T=(r+1)*f+v;l.push(g,_,T),l.push(_,M,T)}this.setIndex(l),this.setAttribute("position",new Je(c,3)),this.setAttribute("normal",new Je(h,3)),this.setAttribute("uv",new Je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},Cl=class i extends Rt{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],l=[],c=[],h=[],p=new P,d=new P,u=new P,m=new P,f=new P,v=new P,g=new P;for(let M=0;M<=n;++M){let T=M/n*s*Math.PI*2;_(T,s,a,e,u),_(T+.01,s,a,e,m),v.subVectors(m,u),g.addVectors(m,u),f.crossVectors(v,g),g.crossVectors(f,v),f.normalize(),g.normalize();for(let S=0;S<=r;++S){let b=S/r*Math.PI*2,I=-t*Math.cos(b),O=t*Math.sin(b);p.x=u.x+(I*g.x+O*f.x),p.y=u.y+(I*g.y+O*f.y),p.z=u.z+(I*g.z+O*f.z),l.push(p.x,p.y,p.z),d.subVectors(p,u).normalize(),c.push(d.x,d.y,d.z),h.push(M/n),h.push(S/r)}}for(let M=1;M<=n;M++)for(let T=1;T<=r;T++){let S=(r+1)*(M-1)+(T-1),b=(r+1)*M+(T-1),I=(r+1)*M+T,O=(r+1)*(M-1)+T;o.push(S,b,O),o.push(b,I,O)}function _(M,T,S,b,I){let O=Math.cos(M),k=Math.sin(M),D=S/T*M,q=Math.cos(D);I.x=b*(2+q)*.5*O,I.y=b*(2+q)*k*.5,I.z=b*Math.sin(D)*.5}this.setIndex(o),this.setAttribute("position",new Je(l,3)),this.setAttribute("normal",new Je(c,3)),this.setAttribute("uv",new Je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Il=class i extends Rt{constructor(e=new Va(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,l=new P,c=new _e,h=new P,p=[],d=[],u=[],m=[];function f(v){h=e.getPointAt(v/t,h);let g=a.normals[v],_=a.binormals[v];for(let M=0;M<=r;M++){let T=M/r*Math.PI*2,S=Math.sin(T),b=-Math.cos(T);l.x=b*g.x+S*_.x,l.y=b*g.y+S*_.y,l.z=b*g.z+S*_.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,p.push(o.x,o.y,o.z)}}(function(){for(let v=0;v<t;v++)f(v);f(s===!1?t:0),(function(){for(let v=0;v<=t;v++)for(let g=0;g<=r;g++)c.x=v/t,c.y=g/r,u.push(c.x,c.y)})(),(function(){for(let v=1;v<=t;v++)for(let g=1;g<=r;g++){let _=(r+1)*(v-1)+(g-1),M=(r+1)*v+(g-1),T=(r+1)*v+g,S=(r+1)*(v-1)+g;m.push(_,M,S),m.push(M,T,S)}})()})(),this.setIndex(m),this.setAttribute("position",new Je(p,3)),this.setAttribute("normal",new Je(d,3)),this.setAttribute("uv",new Je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new xl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Pl=class extends Rt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new P,s=new P;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let p=l[c],d=p.start;for(let u=d,m=d+p.count;u<m;u+=3)for(let f=0;f<3;f++){let v=o.getX(u+f),g=o.getX(u+(f+1)%3);r.fromBufferAttribute(a,v),s.fromBufferAttribute(a,g),Up(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,p=3*o+(c+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,p),Up(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Je(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Up(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var pM=Object.freeze({__proto__:null,BoxGeometry:is,CapsuleGeometry:hl,CircleGeometry:ul,ConeGeometry:dl,CylinderGeometry:Fa,DodecahedronGeometry:pl,EdgesGeometry:fl,ExtrudeGeometry:Sl,IcosahedronGeometry:Ml,LatheGeometry:bl,OctahedronGeometry:Tl,PlaneGeometry:qs,PolyhedronGeometry:Vr,RingGeometry:El,ShapeGeometry:wl,SphereGeometry:js,TetrahedronGeometry:Al,TorusGeometry:Rl,TorusKnotGeometry:Cl,TubeGeometry:Il,WireframeGeometry:Pl});function us(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(Op(r))r.isRenderTargetTexture?(et("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Op(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function ri(i){let e={};for(let t=0;t<i.length;t++){let n=us(i[t]);for(let r in n)e[r]=n[r]}return e}function Op(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function $0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Lu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:It.workingColorSpace}var Bf={clone:us,merge:ri},Z0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,J0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Pn=class extends Ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Z0,this.fragmentShader=J0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=us(e.uniforms),this.uniformsGroups=$0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new _t().setHex(r.value);break;case"v2":this.uniforms[n].value=new _e().fromArray(r.value);break;case"v3":this.uniforms[n].value=new P().fromArray(r.value);break;case"v4":this.uniforms[n].value=new an().fromArray(r.value);break;case"m3":this.uniforms[n].value=new pt().fromArray(r.value);break;case"m4":this.uniforms[n].value=new vt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ll=class extends Pn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Nl=class extends Ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Dl=class extends Ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Ya=class extends ts{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Fs(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function xh(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Gr=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ul=class extends Gr{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,o=2*t-n;break;case 2402:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,l=2*n-t;break;case 2402:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(n-t)/(r-t),f=m*m,v=f*m,g=-d*v+2*d*f-d*m,_=(1+d)*v+(-1.5-2*d)*f+(-.5+d)*m+1,M=(-1-u)*v+(1.5+u)*f+.5*m,T=u*v-u*f;for(let S=0;S!==o;++S)s[S]=g*a[h+S]+_*a[c+S]+M*a[l+S]+T*a[p+S];return s}},Ol=class extends Gr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),p=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*p+a[l+d]*h;return s}},Fl=class extends Gr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Bl=class extends Gr{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let m=(n-t)/(r-t),f=1-m;for(let v=0;v!==o;++v)s[v]=a[c+v]*f+a[l+v]*m;return s}let d=2*o,u=e-1;for(let m=0;m!==o;++m){let f=a[c+m],v=a[l+m],g=u*d+2*m,_=p[g],M=p[g+1],T=e*d+2*m,S=h[T],b=h[T+1],I=Q0(n,t,_,S,r);s[m]=zf(I,f,M,b,v)}return s}};function zf(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function K0(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function Q0(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=zf(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let l=K0(s,e,t,n,r);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var Ti=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fs(t,this.TimeBufferType),this.values=Fs(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Fs(e.times,Array),values:Fs(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),xh(e.settings)&&(n.settings={inTangents:Fs(e.settings.inTangents,Array),outTangents:Fs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Fl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ol(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ul(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Bl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return et("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;xh(this.settings)&&(Fp(this.settings.inTangents,e),Fp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(it("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(it("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){it("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){it("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&t0(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){it("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===2302,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(r)l=!0;else{let h=o*n,p=h-n,d=h+n;for(let u=0;u!==n;++u){let m=t[h+u];if(m!==t[p+u]||m!==t[d+u]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,p=a*n;for(let d=0;d!==n;++d)t[p+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,xh(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Fp(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Ti.prototype.ValueTypeName="",Ti.prototype.TimeBufferType=Float32Array,Ti.prototype.ValueBufferType=Float32Array,Ti.prototype.DefaultInterpolation=2301;var Ur=class extends Ti{constructor(e,t,n){super(e,t,n)}};Ur.prototype.ValueTypeName="bool",Ur.prototype.ValueBufferType=Array,Ur.prototype.DefaultInterpolation=2300,Ur.prototype.InterpolantFactoryMethodLinear=void 0,Ur.prototype.InterpolantFactoryMethodSmooth=void 0;var zl=class extends Ti{constructor(e,t,n,r){super(e,t,n,r)}};zl.prototype.ValueTypeName="color";var kl=class extends Ti{constructor(e,t,n,r){super(e,t,n,r)}};kl.prototype.ValueTypeName="number";var Vl=class extends Gr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)Ci.slerpFlat(s,0,a,c-o,a,c,l);return s}},$a=class extends Ti{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Vl(this.times,this.values,this.getValueSize(),e)}};$a.prototype.ValueTypeName="quaternion",$a.prototype.InterpolantFactoryMethodSmooth=void 0;var Or=class extends Ti{constructor(e,t,n){super(e,t,n)}};Or.prototype.ValueTypeName="string",Or.prototype.ValueBufferType=Array,Or.prototype.DefaultInterpolation=2300,Or.prototype.InterpolantFactoryMethodLinear=void 0,Or.prototype.InterpolantFactoryMethodSmooth=void 0;var Gl=class extends Ti{constructor(e,t,n,r){super(e,t,n,r)}};Gl.prototype.ValueTypeName="vector";var Hl=class{constructor(e,t,n){let r=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){l++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,l),o===l&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,d=c.length;p<d;p+=2){let u=c[p],m=c[p+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},kf=new Hl,Wl=class{constructor(e){this.manager=e!==void 0?e:kf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Wl.DEFAULT_MATERIAL_NAME="__DEFAULT";var fM=new vt,mM=new P,gM=new P;var Jo=new P,Ko=new Ci,ji=new P,Ys=class extends li{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Jo,Ko,ji),ji.x===1&&ji.y===1&&ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jo,Ko,ji.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Jo,Ko,ji),ji.x===1&&ji.y===1&&ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jo,Ko,ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Dr=new P,Bp=new _e,zp=new _e,ei=class extends Ys{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*el*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Qo*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*el*Math.atan(Math.tan(.5*Qo*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Dr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Dr.x,Dr.y).multiplyScalar(-e/Dr.z),Dr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Dr.x,Dr.y).multiplyScalar(-e/Dr.z)}getViewSize(e,t){return this.getViewBounds(e,Bp,zp),t.subVectors(zp,Bp)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Qo*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Za=class extends Ys{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var _M=new vt,vM=new vt,xM=new vt;var Xl=class extends li{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ei(-90,1,e,t);r.layers=this.layers,this.add(r);let s=new ei(-90,1,e,t);s.layers=this.layers,this.add(s);let a=new ei(-90,1,e,t);a.layers=this.layers,this.add(a);let o=new ei(-90,1,e,t);o.layers=this.layers,this.add(o);let l=new ei(-90,1,e,t);l.layers=this.layers,this.add(l);let c=new ei(-90,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==2001)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;v=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=f,e.setRenderTarget(n,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,d,u),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ql=class extends ei{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ja=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=e_.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function e_(){this._document.hidden===!1&&this.reset()}var yM=new P,SM=new Ci,MM=new P,bM=new P,TM=new P;var EM=new P,wM=new Ci,AM=new P,RM=new P;var t_=new RegExp("[\\[\\]\\.:\\/]","g"),Nu="[^\\[\\]\\.:\\/]",n_="[^"+"\\[\\]\\.:\\/".replace("\\.","")+"]",i_=/((?:WC+[\/:])*)/.source.replace("WC",Nu),r_=/(WCOD+)?/.source.replace("WCOD",n_),s_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nu),a_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nu),o_=new RegExp("^"+i_+r_+s_+a_+"$"),l_=["material","materials","bones","map"],Eh=class{constructor(e,t,n){let r=n||mn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},mn=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(t_,"")}static parseTrackName(e){let t=o_.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);l_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void et("PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void it("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void it("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void it("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void it("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void it("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void it("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void it("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[r];if(a===void 0)return void it("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+r+" but it wasn't found.",e);let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void it("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void it("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};mn.Composite=Eh,mn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},mn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},mn.prototype.GetterByBindingType=[mn.prototype._getValue_direct,mn.prototype._getValue_array,mn.prototype._getValue_arrayElement,mn.prototype._getValue_toArray],mn.prototype.SetterByBindingTypeAndVersioning=[[mn.prototype._setValue_direct,mn.prototype._setValue_direct_setNeedsUpdate,mn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mn.prototype._setValue_array,mn.prototype._setValue_array_setNeedsUpdate,mn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mn.prototype._setValue_arrayElement,mn.prototype._setValue_arrayElement_setNeedsUpdate,mn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mn.prototype._setValue_fromArray,mn.prototype._setValue_fromArray_setNeedsUpdate,mn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var CM=new Float32Array(1);var IM=new vt;var zu=class zu{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};zu.prototype.isMatrix2=!0;var wh=zu,PM=new _e;var LM=new P,NM=new P,DM=new P,UM=new P,OM=new P,FM=new P,BM=new P;var zM=new P;var kM=new P,VM=new vt,GM=new vt;var HM=new P,WM=new _t,XM=new _t;var qM=new P,jM=new P,YM=new P;var $M=new P,ZM=new Ys;var JM=new zi;var KM=new P;function Du(i,e,t,n){let r=c_(n);switch(t){case 1021:return i*e;case 1028:case 1029:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case 1023:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:case 37496:case 37490:case 37491:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function c_(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}})),typeof window<"u"&&(window.__THREE__?et("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function lm(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function u_(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=i.createBuffer(),p;if(i.bindBuffer(a,h),i.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)p=i.HALF_FLOAT;else if(o instanceof Uint16Array)p=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)p=i.SHORT;else if(o instanceof Uint32Array)p=i.UNSIGNED_INT;else if(o instanceof Int32Array)p=i.INT;else if(o instanceof Int8Array)p=i.BYTE;else if(o instanceof Uint8Array)p=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);p=i.UNSIGNED_BYTE}return{buffer:h,type:p,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(i.bindBuffer(o,s),c.length===0)i.bufferSubData(o,0,l);else{c.sort((p,d)=>p.start-d.start);let h=0;for(let p=1;p<c.length;p++){let d=c[h],u=c[p];u.start<=d.start+d.count+1?d.count=Math.max(d.count,u.start+u.count-d.start):(++h,c[h]=u)}c.length=h+1;for(let p=0,d=c.length;p<d;p++){let u=c[p];i.bufferSubData(o,u.start*l.BYTES_PER_ELEMENT,l,u.start,u.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var d_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,p_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,f_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,m_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,g_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,__=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,v_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,x_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,y_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,S_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,M_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,b_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,T_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,E_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,w_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,A_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,R_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,C_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,I_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,P_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,L_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,N_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,D_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,U_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,O_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,F_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,B_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,z_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,k_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,V_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,G_="gl_FragColor = linearToOutputTexel( gl_FragColor );",H_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,W_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,X_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,q_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,j_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Y_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Z_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,J_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,K_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Q_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ev=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,iv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,rv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,sv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,av=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ov=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,hv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,uv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fv=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,mv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_v=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Mv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ev=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Av=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Cv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Iv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Uv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ov=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Gv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,$v=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Zv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Kv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ex=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ix=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ax=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ox=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ux=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,dx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,px=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_x=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,yx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Sx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Mx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ex=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ax=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ix=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Px=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Nx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Dx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ux=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ox=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Fx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Vx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Mt={alphahash_fragment:d_,alphahash_pars_fragment:p_,alphamap_fragment:f_,alphamap_pars_fragment:m_,alphatest_fragment:g_,alphatest_pars_fragment:__,aomap_fragment:v_,aomap_pars_fragment:x_,batching_pars_vertex:y_,batching_vertex:S_,begin_vertex:M_,beginnormal_vertex:b_,bsdfs:T_,iridescence_fragment:E_,bumpmap_pars_fragment:w_,clipping_planes_fragment:A_,clipping_planes_pars_fragment:R_,clipping_planes_pars_vertex:C_,clipping_planes_vertex:I_,color_fragment:P_,color_pars_fragment:L_,color_pars_vertex:N_,color_vertex:D_,common:U_,cube_uv_reflection_fragment:O_,defaultnormal_vertex:F_,displacementmap_pars_vertex:B_,displacementmap_vertex:z_,emissivemap_fragment:k_,emissivemap_pars_fragment:V_,colorspace_fragment:G_,colorspace_pars_fragment:H_,envmap_fragment:W_,envmap_common_pars_fragment:X_,envmap_pars_fragment:q_,envmap_pars_vertex:j_,envmap_physical_pars_fragment:rv,envmap_vertex:Y_,fog_vertex:$_,fog_pars_vertex:Z_,fog_fragment:J_,fog_pars_fragment:K_,gradientmap_pars_fragment:Q_,lightmap_pars_fragment:ev,lights_lambert_fragment:tv,lights_lambert_pars_fragment:nv,lights_pars_begin:iv,lights_toon_fragment:sv,lights_toon_pars_fragment:av,lights_phong_fragment:ov,lights_phong_pars_fragment:lv,lights_physical_fragment:cv,lights_physical_pars_fragment:hv,lights_fragment_begin:uv,lights_fragment_maps:dv,lights_fragment_end:pv,lightprobes_pars_fragment:fv,logdepthbuf_fragment:mv,logdepthbuf_pars_fragment:gv,logdepthbuf_pars_vertex:_v,logdepthbuf_vertex:vv,map_fragment:xv,map_pars_fragment:yv,map_particle_fragment:Sv,map_particle_pars_fragment:Mv,metalnessmap_fragment:bv,metalnessmap_pars_fragment:Tv,morphinstance_vertex:Ev,morphcolor_vertex:wv,morphnormal_vertex:Av,morphtarget_pars_vertex:Rv,morphtarget_vertex:Cv,normal_fragment_begin:Iv,normal_fragment_maps:Pv,normal_pars_fragment:Lv,normal_pars_vertex:Nv,normal_vertex:Dv,normalmap_pars_fragment:Uv,clearcoat_normal_fragment_begin:Ov,clearcoat_normal_fragment_maps:Fv,clearcoat_pars_fragment:Bv,iridescence_pars_fragment:zv,opaque_fragment:kv,packing:Vv,premultiplied_alpha_fragment:Gv,project_vertex:Hv,dithering_fragment:Wv,dithering_pars_fragment:Xv,roughnessmap_fragment:qv,roughnessmap_pars_fragment:jv,shadowmap_pars_fragment:Yv,shadowmap_pars_vertex:$v,shadowmap_vertex:Zv,shadowmask_pars_fragment:Jv,skinbase_vertex:Kv,skinning_pars_vertex:Qv,skinning_vertex:ex,skinnormal_vertex:tx,specularmap_fragment:nx,specularmap_pars_fragment:ix,tonemapping_fragment:rx,tonemapping_pars_fragment:sx,transmission_fragment:ax,transmission_pars_fragment:ox,uv_pars_fragment:lx,uv_pars_vertex:cx,uv_vertex:hx,worldpos_vertex:ux,background_vert:dx,background_frag:px,backgroundCube_vert:fx,backgroundCube_frag:mx,cube_vert:gx,cube_frag:_x,depth_vert:vx,depth_frag:xx,distance_vert:yx,distance_frag:Sx,equirect_vert:Mx,equirect_frag:bx,linedashed_vert:Tx,linedashed_frag:Ex,meshbasic_vert:wx,meshbasic_frag:Ax,meshlambert_vert:Rx,meshlambert_frag:Cx,meshmatcap_vert:Ix,meshmatcap_frag:Px,meshnormal_vert:Lx,meshnormal_frag:Nx,meshphong_vert:Dx,meshphong_frag:Ux,meshphysical_vert:Ox,meshphysical_frag:Fx,meshtoon_vert:Bx,meshtoon_frag:zx,points_vert:kx,points_frag:Vx,shadow_vert:Gx,shadow_frag:Hx,sprite_vert:Wx,sprite_frag:Xx},Re={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new _e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new _e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},sr={basic:{uniforms:ri([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:Mt.meshbasic_vert,fragmentShader:Mt.meshbasic_frag},lambert:{uniforms:ri([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new _t(0)},envMapIntensity:{value:1}}]),vertexShader:Mt.meshlambert_vert,fragmentShader:Mt.meshlambert_frag},phong:{uniforms:ri([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Mt.meshphong_vert,fragmentShader:Mt.meshphong_frag},standard:{uniforms:ri([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Mt.meshphysical_vert,fragmentShader:Mt.meshphysical_frag},toon:{uniforms:ri([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new _t(0)}}]),vertexShader:Mt.meshtoon_vert,fragmentShader:Mt.meshtoon_frag},matcap:{uniforms:ri([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:Mt.meshmatcap_vert,fragmentShader:Mt.meshmatcap_frag},points:{uniforms:ri([Re.points,Re.fog]),vertexShader:Mt.points_vert,fragmentShader:Mt.points_frag},dashed:{uniforms:ri([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Mt.linedashed_vert,fragmentShader:Mt.linedashed_frag},depth:{uniforms:ri([Re.common,Re.displacementmap]),vertexShader:Mt.depth_vert,fragmentShader:Mt.depth_frag},normal:{uniforms:ri([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:Mt.meshnormal_vert,fragmentShader:Mt.meshnormal_frag},sprite:{uniforms:ri([Re.sprite,Re.fog]),vertexShader:Mt.sprite_vert,fragmentShader:Mt.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Mt.background_vert,fragmentShader:Mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:Mt.backgroundCube_vert,fragmentShader:Mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Mt.cube_vert,fragmentShader:Mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Mt.equirect_vert,fragmentShader:Mt.equirect_frag},distance:{uniforms:ri([Re.common,Re.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Mt.distance_vert,fragmentShader:Mt.distance_frag},shadow:{uniforms:ri([Re.lights,Re.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:Mt.shadow_vert,fragmentShader:Mt.shadow_frag}};sr.physical={uniforms:ri([sr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new _e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new _e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new _e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:Mt.meshphysical_vert,fragmentShader:Mt.meshphysical_frag};var hc={r:0,b:0,g:0},qx=new vt,cm=new pt;function jx(i,e,t,n,r,s){let a=new _t(0),o,l,c=r===!0?0:1,h=null,p=0,d=null;function u(f){let v=f.isScene===!0?f.background:null;if(v&&v.isTexture){let g=f.backgroundBlurriness>0;v=e.get(v,g)}return v}function m(f,v){f.getRGB(hc,Lu(i)),t.buffers.color.setClear(hc.r,hc.g,hc.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(f,v=1){a.set(f),c=v,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(f){c=f,m(a,c)},render:function(f){let v=!1,g=u(f);g===null?m(a,c):g&&g.isColor&&(m(g,1),v=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,s):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,v){let g=u(v);g&&(g.isCubeTexture||g.mapping===Qa)?(l===void 0&&(l=new ti(new is(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:us(sr.backgroundCube.uniforms),vertexShader:sr.backgroundCube.vertexShader,fragmentShader:sr.backgroundCube.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,M,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=g,l.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(qx.makeRotationFromEuler(v.backgroundRotation)).transpose(),g.isCubeTexture&&g.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(cm),l.material.toneMapped=It.getTransfer(g.colorSpace)!==on,h===g&&p===g.version&&d===i.toneMapping||(l.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):g&&g.isTexture&&(o===void 0&&(o=new ti(new qs(2,2),new Pn({name:"BackgroundMaterial",uniforms:us(sr.background.uniforms),vertexShader:sr.background.vertexShader,fragmentShader:sr.background.fragmentShader,side:Zs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=g,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=It.getTransfer(g.colorSpace)!==on,g.matrixAutoUpdate===!0&&g.updateMatrix(),o.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&p===g.version&&d===i.toneMapping||(o.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),o.layers.enableAll(),f.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function Yx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function l(g){return i.deleteVertexArray(g)}function c(g){let _=[],M=[],T=[];for(let S=0;S<t;S++)_[S]=0,M[S]=0,T[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:M,attributeDivisors:T,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,M=g.length;_<M;_++)g[_]=0}function p(g){d(g,0)}function d(g,_){let M=s.newAttributes,T=s.enabledAttributes,S=s.attributeDivisors;M[g]=1,T[g]===0&&(i.enableVertexAttribArray(g),T[g]=1),S[g]!==_&&(i.vertexAttribDivisor(g,_),S[g]=_)}function u(){let g=s.newAttributes,_=s.enabledAttributes;for(let M=0,T=_.length;M<T;M++)_[M]!==g[M]&&(i.disableVertexAttribArray(M),_[M]=0)}function m(g,_,M,T,S,b,I){I===!0?i.vertexAttribIPointer(g,_,M,S,b):i.vertexAttribPointer(g,_,M,T,S,b)}function f(){v(),a=!0,s!==r&&(s=r,o(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,M,T,S){let b=!1,I=(function(O,k,D,q){let B=q.wireframe===!0,ee=n[k.id];ee===void 0&&(ee={},n[k.id]=ee);let ae=O.isInstancedMesh===!0?O.id:0,re=ee[ae];re===void 0&&(re={},ee[ae]=re);let ie=re[D.id];ie===void 0&&(ie={},re[D.id]=ie);let N=ie[B];return N===void 0&&(N=c(i.createVertexArray()),ie[B]=N),N})(g,T,M,_);s!==I&&(s=I,o(s.object)),b=(function(O,k,D,q){let B=s.attributes,ee=k.attributes,ae=0,re=D.getAttributes();for(let ie in re)if(re[ie].location>=0){let N=B[ie],J=ee[ie];if(J===void 0&&(ie==="instanceMatrix"&&O.instanceMatrix&&(J=O.instanceMatrix),ie==="instanceColor"&&O.instanceColor&&(J=O.instanceColor)),N===void 0||N.attribute!==J||J&&N.data!==J.data)return!0;ae++}return s.attributesNum!==ae||s.index!==q})(g,T,M,S),b&&(function(O,k,D,q){let B={},ee=k.attributes,ae=0,re=D.getAttributes();for(let ie in re)if(re[ie].location>=0){let N=ee[ie];N===void 0&&(ie==="instanceMatrix"&&O.instanceMatrix&&(N=O.instanceMatrix),ie==="instanceColor"&&O.instanceColor&&(N=O.instanceColor));let J={};J.attribute=N,N&&N.data&&(J.data=N.data),B[ie]=J,ae++}s.attributes=B,s.attributesNum=ae,s.index=q})(g,T,M,S),S!==null&&e.update(S,i.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(O,k,D,q){h();let B=q.attributes,ee=D.getAttributes(),ae=k.defaultAttributeValues;for(let re in ee){let ie=ee[re];if(ie.location>=0){let N=B[re];if(N===void 0&&(re==="instanceMatrix"&&O.instanceMatrix&&(N=O.instanceMatrix),re==="instanceColor"&&O.instanceColor&&(N=O.instanceColor)),N!==void 0){let J=N.normalized,le=N.itemSize,Ne=e.get(N);if(Ne===void 0)continue;let ve=Ne.buffer,Oe=Ne.type,be=Ne.bytesPerElement,de=Oe===i.INT||Oe===i.UNSIGNED_INT||N.gpuType===Wh;if(N.isInterleavedBufferAttribute){let X=N.data,ne=X.stride,he=N.offset;if(X.isInstancedInterleavedBuffer){for(let oe=0;oe<ie.locationSize;oe++)d(ie.location+oe,X.meshPerAttribute);O.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let oe=0;oe<ie.locationSize;oe++)p(ie.location+oe);i.bindBuffer(i.ARRAY_BUFFER,ve);for(let oe=0;oe<ie.locationSize;oe++)m(ie.location+oe,le/ie.locationSize,Oe,J,ne*be,(he+le/ie.locationSize*oe)*be,de)}else{if(N.isInstancedBufferAttribute){for(let X=0;X<ie.locationSize;X++)d(ie.location+X,N.meshPerAttribute);O.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let X=0;X<ie.locationSize;X++)p(ie.location+X);i.bindBuffer(i.ARRAY_BUFFER,ve);for(let X=0;X<ie.locationSize;X++)m(ie.location+X,le/ie.locationSize,Oe,J,le*be,le/ie.locationSize*X*be,de)}}else if(ae!==void 0){let J=ae[re];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(ie.location,J);break;case 3:i.vertexAttrib3fv(ie.location,J);break;case 4:i.vertexAttrib4fv(ie.location,J);break;default:i.vertexAttrib1fv(ie.location,J)}}}}u()})(g,_,M,T),S!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(S).buffer))},reset:f,resetDefaultState:v,dispose:function(){f();for(let g in n){let _=n[g];for(let M in _){let T=_[M];for(let S in T){let b=T[S];for(let I in b)l(b[I].object),delete b[I];delete T[S]}}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let M in _){let T=_[M];for(let S in T){let b=T[S];for(let I in b)l(b[I].object),delete b[I];delete T[S]}}delete n[g.id]},releaseStatesOfObject:function(g){for(let _ in n){let M=n[_],T=g.isInstancedMesh===!0?g.id:0,S=M[T];if(S!==void 0){for(let b in S){let I=S[b];for(let O in I)l(I[O].object),delete I[O];delete S[b]}delete M[T],Object.keys(M).length===0&&delete n[_]}}},releaseStatesOfProgram:function(g){for(let _ in n){let M=n[_];for(let T in M){let S=M[T];if(S[g.id]===void 0)continue;let b=S[g.id];for(let I in b)l(b[I].object),delete b[I];delete S[g.id]}}},initAttributes:h,enableAttribute:p,disableUnusedAttributes:u}}function $x(i,e,t){let n;this.setMode=function(r){n=r},this.render=function(r,s){i.drawArrays(n,r,s),t.update(s,n,1)},this.renderInstances=function(r,s,a){a!==0&&(i.drawArraysInstanced(n,r,s,a),t.update(s,n,a))},this.renderMultiDraw=function(r,s,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,s,0,a);let o=0;for(let l=0;l<a;l++)o+=s[l];t.update(o,n,1)}}function Zx(i,e,t,n){let r;function s(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(et("WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&c===!1&&et("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let h=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(h){return h===ir||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let p=h===nr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==Hi&&h!==Pi&&!p&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:i.getParameter(i.MAX_SAMPLES),samples:i.getParameter(i.SAMPLES)}}function Jx(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Bi,o=new pt,l={value:null,needsUpdate:!1};function c(h,p,d,u){let m=h!==null?h.length:0,f=null;if(m!==0){if(f=l.value,u!==!0||f===null){let v=d+4*m,g=p.matrixWorldInverse;o.getNormalMatrix(g),(f===null||f.length<v)&&(f=new Float32Array(v));for(let _=0,M=d;_!==m;++_,M+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(f,M),f[M+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let d=h.length!==0||p||n!==0||r;return r=p,n=h.length,d},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=c(h,p,0)},this.setState=function(h,p,d){let u=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,v=i.get(h);if(!r||u===null||u.length===0||s&&!f)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,M=v.clippingState||null;l.value=M,M=c(u,p,_,d);for(let T=0;T!==_;++T)M[T]=t[T];v.clippingState=M,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}cm.set(-1,0,0,0,1,0,0,0,1);var io=new Za,Vf=new _t,ku=null,Vu=0,Gu=0,Hu=!1,Kx=new P,ds=new P,dc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=Kx}=s;ku=this._renderer.getRenderTarget(),Vu=this._renderer.getActiveCubeFace(),Gu=this._renderer.getActiveMipmapLevel(),Hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ku,Vu,Gu),this._renderer.xr.enabled=Hu,e.scissorTest=!1,ea(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ks||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ku=this._renderer.getRenderTarget(),Vu=this._renderer.getActiveCubeFace(),Gu=this._renderer.getActiveMipmapLevel(),Hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:nr,format:ir,colorSpace:ac,depthBuffer:!1},r=Gf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gf(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Qx(s)),this._blurMaterial=ty(s,e,t),this._ggxMaterial=ey(s,e,t)}return r}_compileMaterial(e){let t=new ti(new Rt,e);this._renderer.compile(t,io)}_sceneToCubeUV(e,t,n,r,s){let a=new ei(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,p=c.toneMapping;c.getClearColor(Vf),c.toneMapping=Vi,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ti(new is,new Da({name:"PMREM.Background",side:ni,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,m=!1,f=e.background;f?f.isColor&&(u.color.copy(f),e.background=null,m=!0):(u.color.copy(Vf),m=!0);for(let v=0;v<6;v++){let g=v%3;g===0?(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[v],s.y,s.z)):g===1?(a.up.set(0,0,o[v]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[v],s.z)):(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[v]));let _=this._cubeSize;ea(r,g*_,v>2?_:0,_,_),c.setRenderTarget(r),m&&c.render(d,a),c.render(e,a)}c.toneMapping=p,c.autoClear=h,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Ks||e.mapping===ss;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hf());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s,s.uniforms.envMap.value=e;let o=this._cubeSize;ea(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,io)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(c*c-h*h)*(1.25*c),{_lodMax:d}=this,u=this._sizeLods[n],m=3*u*(n>d-4?n-d+4:0),f=4*(this._cubeSize-u);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=d-t,ea(s,m,f,3*u,2*u),r.setRenderTarget(s),r.render(o,io),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=d-n,ea(e,m,f,3*u,2*u),r.setRenderTarget(e),r.render(o,io)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[r];ea(t,3*h*(r>this._lodMax-4?r-this._lodMax+4:0),4*(this._cubeSize-h),3*h,2*h),a.setRenderTarget(t),a.render(l,io)}};function Qx(i){let e=[],t=[],n=i,r=i-4+1+6;for(let s=0;s<r;s++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,d=6,u=3,m=new Float32Array(u*d*p),f=new Float32Array(u*d*p);for(let g=0;g<p;g++){let _=g%3*2/3-1,M=g>2?0:-1,T=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];m.set(T,u*d*g);for(let S=0;S<d;S++){let b=2*h[2*S]-1,I=2*h[2*S+1]-1;g===0?ds.set(1,I,b):g===1?ds.set(-b,1,-I):g===2?ds.set(-b,I,1):g===3?ds.set(-1,I,-b):g===4?ds.set(-b,-1,I):ds.set(b,I,-1),ds.toArray(f,(g*d+S)*u)}}let v=new Rt;v.setAttribute("position",new Dt(m,u)),v.setAttribute("outputDirection",new Dt(f,u)),t.push(new ti(v,null)),n>4&&n--}return{lodMeshes:t,sizeLods:e}}function Gf(i,e,t){let n=new pi(i,e,t);return n.texture.mapping=Qa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ea(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function ey(i,e,t){return new Pn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:mc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:tr,depthTest:!1,depthWrite:!1})}function ty(i,e,t){return new Pn({name:"SphericalGaussianBlur",defines:{SAMPLES:20,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:mc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:tr,depthTest:!1,depthWrite:!1})}function Hf(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:tr,depthTest:!1,depthWrite:!1})}function Wf(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:tr,depthTest:!1,depthWrite:!1})}function mc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var pc=class extends pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ua(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new is(5,5,5),s=new Pn({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ni,blending:tr});s.uniforms.tEquirect.value=t;let a=new ti(r,s),o=t.minFilter;return t.minFilter===as&&(t.minFilter=ii),new Xl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function ny(i){let e=new WeakMap,t=new WeakMap,n=null;function r(o,l){return l===$l?o.mapping=Ks:l===Zl&&(o.mapping=ss),o}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(o){let l=o.target;l.removeEventListener("dispose",a);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}return{get:function(o,l=!1){return o==null?null:l?(function(c){if(c&&c.isTexture){let h=c.mapping,p=h===$l||h===Zl,d=h===Ks||h===ss;if(p||d){let u=t.get(c),m=u!==void 0?u.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==m)return n===null&&(n=new dc(i)),u=p?n.fromEquirectangular(c,u):n.fromCubemap(c,u),u.texture.pmremVersion=c.pmremVersion,t.set(c,u),u.texture;if(u!==void 0)return u.texture;{let f=c.image;return p&&f&&f.height>0||d&&f&&(function(v){let g=0,_=6;for(let M=0;M<_;M++)v[M]!==void 0&&g++;return g===_})(f)?(n===null&&(n=new dc(i)),u=p?n.fromEquirectangular(c):n.fromCubemap(c),u.texture.pmremVersion=c.pmremVersion,t.set(c,u),c.addEventListener("dispose",a),u.texture):null}}}return c})(o):(function(c){if(c&&c.isTexture){let h=c.mapping;if(h===$l||h===Zl){if(e.has(c))return r(e.get(c).texture,c.mapping);{let p=c.image;if(p&&p.height>0){let d=new pc(p.height);return d.fromEquirectangularTexture(i,c),e.set(c,d),c.addEventListener("dispose",s),r(d.texture,c.mapping)}return null}}}return c})(o)},dispose:function(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function iy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Kr("WebGLRenderer: "+n+" extension not supported."),r}}}function ry(i,e,t,n){let r={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let p in c.attributes)e.remove(c.attributes[p]);c.removeEventListener("dispose",a),delete r[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,p=l.attributes.position,d=0;if(p===void 0)return;if(h!==null){let f=h.array;d=h.version;for(let v=0,g=f.length;v<g;v+=3){let _=f[v+0],M=f[v+1],T=f[v+2];c.push(_,M,M,T,T,_)}}else{let f=p.array;d=p.version;for(let v=0,g=f.length/3-1;v<g;v+=3){let _=v+0,M=v+1,T=v+2;c.push(_,M,M,T,T,_)}}let u=new(p.count>=65535?Pa:Ia)(c,1);u.version=d;let m=s.get(l);m&&e.remove(m),s.set(l,u)}return{get:function(l,c){return r[c.id]===!0||(c.addEventListener("dispose",a),r[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function sy(i,e,t){let n,r,s;this.setMode=function(a){n=a},this.setIndex=function(a){r=a.type,s=a.bytesPerElement},this.render=function(a,o){i.drawElements(n,o,r,a*s),t.update(o,n,1)},this.renderInstances=function(a,o,l){l!==0&&(i.drawElementsInstanced(n,o,r,a*s,l),t.update(o,n,l))},this.renderMultiDraw=function(a,o,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,o,0,r,a,0,l);let c=0;for(let h=0;h<l;h++)c+=o[h];t.update(c,n,1)}}function ay(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:it("WebGLInfo: Unknown draw mode:",n)}}}}function oy(i,e,t){let n=new WeakMap,r=new an;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,p=n.get(a);if(p===void 0||p.count!==h){p!==void 0&&p.texture.dispose();let d=a.morphAttributes.position!==void 0,u=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),u===!0&&(_=2),m===!0&&(_=3);let M=a.attributes.position.count*_,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let S=new Float32Array(M*T*4*h),b=new Aa(S,M,T,h);b.type=Pi,b.needsUpdate=!0;let I=4*_;for(let O=0;O<h;O++){let k=f[O],D=v[O],q=g[O],B=M*T*4*O;for(let ee=0;ee<k.count;ee++){let ae=ee*I;d===!0&&(r.fromBufferAttribute(k,ee),S[B+ae+0]=r.x,S[B+ae+1]=r.y,S[B+ae+2]=r.z,S[B+ae+3]=0),u===!0&&(r.fromBufferAttribute(D,ee),S[B+ae+4]=r.x,S[B+ae+5]=r.y,S[B+ae+6]=r.z,S[B+ae+7]=0),m===!0&&(r.fromBufferAttribute(q,ee),S[B+ae+8]=r.x,S[B+ae+9]=r.y,S[B+ae+10]=r.z,S[B+ae+11]=q.itemSize===4?r.w:1)}}p={count:h,texture:b,size:new _e(M,T)},n.set(a,p),a.addEventListener("dispose",function O(){b.dispose(),n.delete(a),a.removeEventListener("dispose",O)})}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let d=0;for(let m=0;m<l.length;m++)d+=l[m];let u=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",u),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}}}function ly(i,e,t,n,r){let s=new WeakMap;function a(o){let l=o.target;l.removeEventListener("dispose",a),n.releaseStatesOfObject(l),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:function(o){let l=r.render.frame,c=o.geometry,h=e.get(o,c);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==l&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,l))),o.isSkinnedMesh){let p=o.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return h},dispose:function(){s=new WeakMap}}}var cy={[Fh]:"LINEAR_TONE_MAPPING",[Bh]:"REINHARD_TONE_MAPPING",[zh]:"CINEON_TONE_MAPPING",[kh]:"ACES_FILMIC_TONE_MAPPING",[Gh]:"AGX_TONE_MAPPING",[Hh]:"NEUTRAL_TONE_MAPPING",[Vh]:"CUSTOM_TONE_MAPPING"};function hy(i,e,t,n,r,s){let a=new pi(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Rt;c.setAttribute("position",new Je([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Je([0,2,0,0,2,0],2));let h=new Ll({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new ti(c,h),d=new Za(-1,1,1,-1,0,1),u,m=null,f=null,v=!1,g=null,_=[],M=!1;this.setSize=function(T,S){a.setSize(T,S),o!==null&&o.setSize(T,S),l!==null&&l.setSize(T,S);for(let b=0;b<_.length;b++){let I=_[b];I.setSize&&I.setSize(T,S)}},this.setEffects=function(T){_=T,M=_.length>0&&_[0].isRenderPass===!0;let S=a.width,b=a.height;_.length>0&&o===null&&(o=new pi(S,b,{type:nr,depthBuffer:!1,stencilBuffer:!1}),l=new pi(S,b,{type:nr,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<_.length;I++){let O=_[I];O.setSize&&O.setSize(S,b)}},this.begin=function(T,S){if(v||T.toneMapping===Vi&&_.length===0)return!1;if(g=S,S!==null){let b=S.width,I=S.height;a.width===b&&a.height===I||this.setSize(b,I)}return M===!1&&T.setRenderTarget(a),u=T.toneMapping,T.toneMapping=Vi,!0},this.hasRenderPass=function(){return M},this.end=function(T,S){T.toneMapping=u,v=!0;let b=a,I=o;for(let O=0;O<_.length;O++){let k=_[O];k.enabled!==!1&&(k.render(T,I,b,S),k.needsSwap!==!1&&(b=I,I=I===o?l:o))}if(m!==T.outputColorSpace||f!==T.toneMapping){m=T.outputColorSpace,f=T.toneMapping,h.defines={},It.getTransfer(m)===on&&(h.defines.SRGB_TRANSFER="");let O=cy[f];O&&(h.defines[O]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,T.setRenderTarget(g),T.render(p,d),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var hm=new oi,qu=new kr(1,1),um=new Aa,dm=new il,pm=new Ua,Xf=[],qf=[],jf=new Float32Array(16),Yf=new Float32Array(9),$f=new Float32Array(4);function na(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=Xf[r];if(s===void 0&&(s=new Float32Array(r),Xf[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Fn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Bn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function gc(i,e){let t=qf[e];t===void 0&&(t=new Int32Array(e),qf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function uy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function dy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Fn(t,e))return;i.uniform2fv(this.addr,e),Bn(t,e)}}function py(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Fn(t,e))return;i.uniform3fv(this.addr,e),Bn(t,e)}}function fy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Fn(t,e))return;i.uniform4fv(this.addr,e),Bn(t,e)}}function my(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Fn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Bn(t,e)}else{if(Fn(t,n))return;$f.set(n),i.uniformMatrix2fv(this.addr,!1,$f),Bn(t,n)}}function gy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Fn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Bn(t,e)}else{if(Fn(t,n))return;Yf.set(n),i.uniformMatrix3fv(this.addr,!1,Yf),Bn(t,n)}}function _y(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Fn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Bn(t,e)}else{if(Fn(t,n))return;jf.set(n),i.uniformMatrix4fv(this.addr,!1,jf),Bn(t,n)}}function vy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function xy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Fn(t,e))return;i.uniform2iv(this.addr,e),Bn(t,e)}}function yy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Fn(t,e))return;i.uniform3iv(this.addr,e),Bn(t,e)}}function Sy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Fn(t,e))return;i.uniform4iv(this.addr,e),Bn(t,e)}}function My(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function by(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Fn(t,e))return;i.uniform2uiv(this.addr,e),Bn(t,e)}}function Ty(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Fn(t,e))return;i.uniform3uiv(this.addr,e),Bn(t,e)}}function Ey(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Fn(t,e))return;i.uniform4uiv(this.addr,e),Bn(t,e)}}function wy(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(qu.compareFunction=t.isReversedDepthBuffer()?lc:oc,s=qu):s=hm,t.setTexture2D(e||s,r)}function Ay(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||dm,r)}function Ry(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||pm,r)}function Cy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||um,r)}function Iy(i){switch(i){case 5126:return uy;case 35664:return dy;case 35665:return py;case 35666:return fy;case 35674:return my;case 35675:return gy;case 35676:return _y;case 5124:case 35670:return vy;case 35667:case 35671:return xy;case 35668:case 35672:return yy;case 35669:case 35673:return Sy;case 5125:return My;case 36294:return by;case 36295:return Ty;case 36296:return Ey;case 35678:case 36198:case 36298:case 36306:case 35682:return wy;case 35679:case 36299:case 36307:return Ay;case 35680:case 36300:case 36308:case 36293:return Ry;case 36289:case 36303:case 36311:case 36292:return Cy}}function Py(i,e){i.uniform1fv(this.addr,e)}function Ly(i,e){let t=na(e,this.size,2);i.uniform2fv(this.addr,t)}function Ny(i,e){let t=na(e,this.size,3);i.uniform3fv(this.addr,t)}function Dy(i,e){let t=na(e,this.size,4);i.uniform4fv(this.addr,t)}function Uy(i,e){let t=na(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Oy(i,e){let t=na(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Fy(i,e){let t=na(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function By(i,e){i.uniform1iv(this.addr,e)}function zy(i,e){i.uniform2iv(this.addr,e)}function ky(i,e){i.uniform3iv(this.addr,e)}function Vy(i,e){i.uniform4iv(this.addr,e)}function Gy(i,e){i.uniform1uiv(this.addr,e)}function Hy(i,e){i.uniform2uiv(this.addr,e)}function Wy(i,e){i.uniform3uiv(this.addr,e)}function Xy(i,e){i.uniform4uiv(this.addr,e)}function qy(i,e,t){let n=this.cache,r=e.length,s=gc(t,r),a;Fn(n,s)||(i.uniform1iv(this.addr,s),Bn(n,s)),a=this.type===i.SAMPLER_2D_SHADOW?qu:hm;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function jy(i,e,t){let n=this.cache,r=e.length,s=gc(t,r);Fn(n,s)||(i.uniform1iv(this.addr,s),Bn(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||dm,s[a])}function Yy(i,e,t){let n=this.cache,r=e.length,s=gc(t,r);Fn(n,s)||(i.uniform1iv(this.addr,s),Bn(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||pm,s[a])}function $y(i,e,t){let n=this.cache,r=e.length,s=gc(t,r);Fn(n,s)||(i.uniform1iv(this.addr,s),Bn(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||um,s[a])}function Zy(i){switch(i){case 5126:return Py;case 35664:return Ly;case 35665:return Ny;case 35666:return Dy;case 35674:return Uy;case 35675:return Oy;case 35676:return Fy;case 5124:case 35670:return By;case 35667:case 35671:return zy;case 35668:case 35672:return ky;case 35669:case 35673:return Vy;case 5125:return Gy;case 36294:return Hy;case 36295:return Wy;case 36296:return Xy;case 35678:case 36198:case 36298:case 36306:case 35682:return qy;case 35679:case 36299:case 36307:return jy;case 35680:case 36300:case 36308:case 36293:return Yy;case 36289:case 36303:case 36311:case 36292:return $y}}var ju=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Iy(t.type)}},Yu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zy(t.type)}},$u=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},Wu=/(\w+)(\])?(\[|\.)?/g;function Zf(i,e){i.seq.push(e),i.map[e.id]=e}function Jy(i,e,t){let n=i.name,r=n.length;for(Wu.lastIndex=0;;){let s=Wu.exec(n),a=Wu.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===r){Zf(t,c===void 0?new ju(o,i,e):new Yu(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new $u(o),Zf(t,h)),t=h}}}var ta=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a);Jy(o,e.getUniformLocation(t,o.name),this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function Jf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Ky=0;function Qy(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Kf=new pt;function e1(i){It._getMatrix(Kf,It.workingColorSpace,i);let e=`mat3( ${Kf.elements.map(t=>t.toFixed(4))} )`;switch(It.getTransfer(i)){case Ru:return[e,"LinearTransferOETF"];case on:return[e,"sRGBTransferOETF"];default:return et("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Qf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Qy(i.getShaderSource(e),a)}return r}function t1(i,e){let t=e1(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var n1={[Fh]:"Linear",[Bh]:"Reinhard",[zh]:"Cineon",[kh]:"ACESFilmic",[Gh]:"AgX",[Hh]:"Neutral",[Vh]:"Custom"};function i1(i,e){let t=n1[e];return t===void 0?(et("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var uc=new P;function r1(){return It.getLuminanceCoefficients(uc),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${uc.x.toFixed(4)}, ${uc.y.toFixed(4)}, ${uc.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function s1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(so).join(`
`)}function a1(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function o1(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function so(i){return i!==""}function em(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tm(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var l1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zu(i){return i.replace(l1,h1)}var c1=new Map;function h1(i,e){let t=Mt[e];if(t===void 0){let n=c1.get(e);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=Mt[n],et('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Zu(t)}var u1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nm(i){return i.replace(u1,d1)}function d1(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function im(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var p1={[Ka]:"SHADOWMAP_TYPE_PCF",[$s]:"SHADOWMAP_TYPE_VSM"};function f1(i){return p1[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var m1={[Ks]:"ENVMAP_TYPE_CUBE",[ss]:"ENVMAP_TYPE_CUBE",[Qa]:"ENVMAP_TYPE_CUBE_UV"};function g1(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":m1[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var _1={[ss]:"ENVMAP_MODE_REFRACTION"};function v1(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":_1[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var x1={[hf]:"ENVMAP_BLENDING_MULTIPLY",[uf]:"ENVMAP_BLENDING_MIX",[df]:"ENVMAP_BLENDING_ADD"};function y1(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":x1[i.combine]||"ENVMAP_BLENDING_NONE"}function S1(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function M1(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=f1(t),c=g1(t),h=v1(t),p=y1(t),d=S1(t),u=s1(t),m=a1(s),f=r.createProgram(),v,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(so).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(so).join(`
`),g.length>0&&(g+=`
`)):(v=[im(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(so).join(`
`),g=[im(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vi?"#define TONE_MAPPING":"",t.toneMapping!==Vi?Mt.tonemapping_pars_fragment:"",t.toneMapping!==Vi?i1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Mt.colorspace_pars_fragment,t1("linearToOutputTexel",t.outputColorSpace),r1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(so).join(`
`)),a=Zu(a),a=em(a,t),a=tm(a,t),o=Zu(o),o=em(o,t),o=tm(o,t),a=nm(a),o=nm(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===Cu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=_+v+a,T=_+g+o,S=Jf(r,r.VERTEX_SHADER,M),b=Jf(r,r.FRAGMENT_SHADER,T);function I(q){if(i.debug.checkShaderErrors){let B=r.getProgramInfoLog(f)||"",ee=r.getShaderInfoLog(S)||"",ae=r.getShaderInfoLog(b)||"",re=B.trim(),ie=ee.trim(),N=ae.trim(),J=!0,le=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,f,S,b);else{let Ne=Qf(r,S,"vertex"),ve=Qf(r,b,"fragment");it("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+q.name+`
Material Type: `+q.type+`

Program Info Log: `+re+`
`+Ne+`
`+ve)}else re!==""?et("WebGLProgram: Program Info Log:",re):ie!==""&&N!==""||(le=!1);le&&(q.diagnostics={runnable:J,programLog:re,vertexShader:{log:ie,prefix:v},fragmentShader:{log:N,prefix:g}})}r.deleteShader(S),r.deleteShader(b),O=new ta(r,f),k=o1(r,f)}let O,k;r.attachShader(f,S),r.attachShader(f,b),t.index0AttributeName!==void 0?r.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f),this.getUniforms=function(){return O===void 0&&I(this),O},this.getAttributes=function(){return k===void 0&&I(this),k};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(f,37297)),D},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ky++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=S,this.fragmentShader=b,this}var b1=0,Ju=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ku(e),t.set(e,n)),n}},Ku=class{constructor(e){this.id=b1++,this.code=e,this.usedTimes=0}};function T1(i){return i===cs||i===rc||i===sc}function E1(i,e,t,n,r,s){let a=new Ra,o=new Ju,l=new Set,c=[],h=new Map,p=n.logarithmicDepthBuffer,d=n.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,g,_,M,T){let S=_.fog,b=M.geometry,I=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?_.environment:null,O=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,k=e.get(f.envMap||I,O),D=k&&k.mapping===Qa?k.image.height:null,q=u[f.type];f.precision!==null&&(d=n.getMaxPrecision(f.precision),d!==f.precision&&et("WebGLProgram.getParameters:",f.precision,"not supported, using",d,"instead."));let B=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,ee=B!==void 0?B.length:0,ae,re,ie,N,J=0;if(b.morphAttributes.position!==void 0&&(J=1),b.morphAttributes.normal!==void 0&&(J=2),b.morphAttributes.color!==void 0&&(J=3),q){let ke=sr[q];ae=ke.vertexShader,re=ke.fragmentShader}else{ae=f.vertexShader,re=f.fragmentShader;let ke=o.getVertexShaderStage(f),$t=o.getFragmentShaderStage(f);o.update(f,ke,$t),ie=ke.id,N=$t.id}let le=i.getRenderTarget(),Ne=i.state.buffers.depth.getReversed(),ve=M.isInstancedMesh===!0,Oe=M.isBatchedMesh===!0,be=!!f.map,de=!!f.matcap,X=!!k,ne=!!f.aoMap,he=!!f.lightMap,oe=!!f.bumpMap&&f.wireframe===!1,w=!!f.normalMap,E=!!f.displacementMap,C=!!f.emissiveMap,U=!!f.metalnessMap,y=!!f.roughnessMap,z=f.anisotropy>0,F=f.clearcoat>0,R=f.dispersion>0,j=f.retroreflectivity>0,Y=f.iridescence>0,K=f.sheen>0,ue=f.transmission>0,Ee=z&&!!f.anisotropyMap,Se=F&&!!f.clearcoatMap,fe=F&&!!f.clearcoatNormalMap,Be=F&&!!f.clearcoatRoughnessMap,ce=Y&&!!f.iridescenceMap,me=Y&&!!f.iridescenceThicknessMap,ge=K&&!!f.sheenColorMap,Ie=K&&!!f.sheenRoughnessMap,Pt=!!f.specularMap,xt=!!f.specularColorMap,Ft=!!f.specularIntensityMap,ln=ue&&!!f.transmissionMap,ze=ue&&!!f.thicknessMap,at=!!f.gradientMap,ot=!!f.alphaMap,Yt=f.alphaTest>0,Ut=!!f.alphaHash,cn=!!f.extensions,rt=Vi;f.toneMapped&&(le!==null&&le.isXRRenderTarget!==!0||(rt=i.toneMapping));let bn={shaderID:q,shaderType:f.type,shaderName:f.name,vertexShader:ae,fragmentShader:re,defines:f.defines,customVertexShaderID:ie,customFragmentShaderID:N,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:d,batching:Oe,batchingColor:Oe&&M._colorsTexture!==null,instancing:ve,instancingColor:ve&&M.instanceColor!==null,instancingMorph:ve&&M.morphTexture!==null,outputColorSpace:le===null?i.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:It.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:be,matcap:de,envMap:X,envMapMode:X&&k.mapping,envMapCubeUVHeight:D,aoMap:ne,lightMap:he,bumpMap:oe,normalMap:w,displacementMap:E,emissiveMap:C,normalMapObjectSpace:w&&f.normalMapType===Sf,normalMapTangentSpace:w&&f.normalMapType===wu,packedNormalMap:w&&f.normalMapType===wu&&T1(f.normalMap.format),metalnessMap:U,roughnessMap:y,anisotropy:z,anisotropyMap:Ee,clearcoat:F,clearcoatMap:Se,clearcoatNormalMap:fe,clearcoatRoughnessMap:Be,dispersion:R,retroreflection:j,iridescence:Y,iridescenceMap:ce,iridescenceThicknessMap:me,sheen:K,sheenColorMap:ge,sheenRoughnessMap:Ie,specularMap:Pt,specularColorMap:xt,specularIntensityMap:Ft,transmission:ue,transmissionMap:ln,thicknessMap:ze,gradientMap:at,opaque:f.transparent===!1&&f.blending===Ii&&f.alphaToCoverage===!1,alphaMap:ot,alphaTest:Yt,alphaHash:Ut,combine:f.combine,mapUv:be&&m(f.map.channel),aoMapUv:ne&&m(f.aoMap.channel),lightMapUv:he&&m(f.lightMap.channel),bumpMapUv:oe&&m(f.bumpMap.channel),normalMapUv:w&&m(f.normalMap.channel),displacementMapUv:E&&m(f.displacementMap.channel),emissiveMapUv:C&&m(f.emissiveMap.channel),metalnessMapUv:U&&m(f.metalnessMap.channel),roughnessMapUv:y&&m(f.roughnessMap.channel),anisotropyMapUv:Ee&&m(f.anisotropyMap.channel),clearcoatMapUv:Se&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:fe&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:me&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&m(f.sheenRoughnessMap.channel),specularMapUv:Pt&&m(f.specularMap.channel),specularColorMapUv:xt&&m(f.specularColorMap.channel),specularIntensityMapUv:Ft&&m(f.specularIntensityMap.channel),transmissionMapUv:ln&&m(f.transmissionMap.channel),thicknessMapUv:ze&&m(f.thicknessMap.channel),alphaMapUv:ot&&m(f.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(w||z),vertexNormals:!!b.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:M.isPoints===!0&&!!b.attributes.uv&&(be||ot),fog:!!S,useFog:f.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||b.attributes.normal===void 0&&w===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Ne,skinning:M.isSkinnedMesh===!0,hasPositionAttribute:b.attributes.position!==void 0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:J,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:T.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&g.length>0,shadowMapType:i.shadowMap.type,toneMapping:rt,decodeVideoTexture:be&&f.map.isVideoTexture===!0&&It.getTransfer(f.map.colorSpace)===on,decodeVideoTextureEmissive:C&&f.emissiveMap.isVideoTexture===!0&&It.getTransfer(f.emissiveMap.colorSpace)===on,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===er,flipSided:f.side===ni,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:cn&&f.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(cn&&f.extensions.multiDraw===!0||Oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return bn.vertexUv1s=l.has(1),bn.vertexUv2s=l.has(2),bn.vertexUv3s=l.has(3),l.clear(),bn},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let g in f.defines)v.push(g),v.push(f.defines[g]);return f.isRawShaderMaterial===!1&&((function(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numSunLights),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numSunLightShadows),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)})(v,f),(function(g,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.retroreflection&&a.enable(24),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),g.push(a.mask)})(v,f),v.push(i.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=u[f.type],g;if(v){let _=sr[v];g=Bf.clone(_.uniforms)}else g=f.uniforms;return g},acquireProgram:function(f,v){let g=h.get(v);return g!==void 0?++g.usedTimes:(g=new M1(i,v,f,r),c.push(g),h.set(v,g)),g},releaseProgram:function(f){if(--f.usedTimes===0){let v=c.indexOf(f);c[v]=c[c.length-1],c.pop(),h.delete(f.cacheKey),f.destroy()}},releaseShaderCache:function(f){o.remove(f)},programs:c,dispose:function(){o.dispose()}}}function w1(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function A1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function rm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function sm(){let i=[],e=0,t=[],n=[],r=[];function s(o){let l=0;return o.isInstancedMesh&&(l+=2),o.isSkinnedMesh&&(l+=1),l}function a(o,l,c,h,p,d){let u=i[e];return u===void 0?(u={id:o.id,object:o,geometry:l,material:c,materialVariant:s(o),groupOrder:h,renderOrder:o.renderOrder,z:p,group:d},i[e]=u):(u.id=o.id,u.object=o,u.geometry=l,u.material=c,u.materialVariant=s(o),u.groupOrder=h,u.renderOrder=o.renderOrder,u.z=p,u.group=d),e++,u}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,l,c,h,p,d,u){u.reversedDepth===!0&&(p=-p);let m=a(o,l,c,h,p,d);c.transmission>0?n.push(m):c.transparent===!0?r.push(m):t.push(m)},unshift:function(o,l,c,h,p,d){let u=a(o,l,c,h,p,d);c.transmission>0?n.unshift(u):c.transparent===!0?r.unshift(u):t.unshift(u)},finish:function(){for(let o=e,l=i.length;o<l;o++){let c=i[o];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(o,l){t.length>1&&t.sort(o||A1),n.length>1&&n.sort(l||rm),r.length>1&&r.sort(l||rm)}}}function R1(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new sm,i.set(e,[r])):t>=n.length?(r=new sm,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function C1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new _t};break;case"SpotLight":t={position:new P,direction:new P,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new _t,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":t={color:new _t,position:new P,halfWidth:new P,halfHeight:new P}}return i[e.id]=t,t}}}function I1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e,shadowCameraNear:1,shadowCameraFar:1e3}}return i[e.id]=t,t}}}var P1=0;function L1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function N1(i){let e=new C1,t=I1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new P);let r=new P,s=new vt,a=new vt;return{setup:function(o){let l=0,c=0,h=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let p=0,d=0,u=0,m=0,f=0,v=0,g=0,_=0,M=0,T=0,S=0,b=0,I=0,O=0;o.sort(L1);for(let D=0,q=o.length;D<q;D++){let B=o[D],ee=B.color,ae=B.intensity,re=B.distance,ie=null;if(B.shadow&&B.shadow.map&&(ie=B.shadow.map.texture.format===cs?B.shadow.map.texture:B.shadow.map.depthTexture||B.shadow.map.texture),B.isAmbientLight)l+=ee.r*ae,c+=ee.g*ae,h+=ee.b*ae;else if(B.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(B.sh.coefficients[N],ae);O++}else if(B.isSunLight){let N=e.get(B);if(N.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let J=B.shadow,le=t.get(B);le.shadowIntensity=J.intensity,le.shadowBias=J.bias,le.shadowNormalBias=J.normalBias,le.shadowRadius=J.radius,le.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[d]=le,n.sunShadowMap[d]=ie;let Ne=J.getViewportCount();for(let ve=0;ve<Ne;ve++)n.sunShadowMatrix[u+ve]=J.getMatrix(ve),n.sunShadowCascade[u+ve]=J._cascadeData[ve];u+=Ne,d++}n.sun[p]=N,p++}else if(B.isDirectionalLight){let N=e.get(B);if(N.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let J=B.shadow,le=t.get(B);le.shadowIntensity=J.intensity,le.shadowBias=J.bias,le.shadowNormalBias=J.normalBias,le.shadowRadius=J.radius,le.shadowMapSize=J.mapSize,n.directionalShadow[m]=le,n.directionalShadowMap[m]=ie,n.directionalShadowMatrix[m]=B.shadow.matrix,M++}n.directional[m]=N,m++}else if(B.isSpotLight){let N=e.get(B);N.position.setFromMatrixPosition(B.matrixWorld),N.color.copy(ee).multiplyScalar(ae),N.distance=re,N.coneCos=Math.cos(B.angle),N.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),N.decay=B.decay,n.spot[v]=N;let J=B.shadow;if(B.map&&(n.spotLightMap[b]=B.map,b++,J.updateMatrices(B),B.castShadow&&I++),n.spotLightMatrix[v]=J.matrix,B.castShadow){let le=t.get(B);le.shadowIntensity=J.intensity,le.shadowBias=J.bias,le.shadowNormalBias=J.normalBias,le.shadowRadius=J.radius,le.shadowMapSize=J.mapSize,n.spotShadow[v]=le,n.spotShadowMap[v]=ie,S++}v++}else if(B.isRectAreaLight){let N=e.get(B);N.color.copy(ee).multiplyScalar(ae),N.halfWidth.set(.5*B.width,0,0),N.halfHeight.set(0,.5*B.height,0),n.rectArea[g]=N,g++}else if(B.isPointLight){let N=e.get(B);if(N.color.copy(B.color).multiplyScalar(B.intensity),N.distance=B.distance,N.decay=B.decay,B.castShadow){let J=B.shadow,le=t.get(B);le.shadowIntensity=J.intensity,le.shadowBias=J.bias,le.shadowNormalBias=J.normalBias,le.shadowRadius=J.radius,le.shadowMapSize=J.mapSize,le.shadowCameraNear=J.camera.near,le.shadowCameraFar=J.camera.far,n.pointShadow[f]=le,n.pointShadowMap[f]=ie,n.pointShadowMatrix[f]=B.shadow.matrix,T++}n.point[f]=N,f++}else if(B.isHemisphereLight){let N=e.get(B);N.skyColor.copy(B.color).multiplyScalar(ae),N.groundColor.copy(B.groundColor).multiplyScalar(ae),n.hemi[_]=N,_++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let k=n.hash;k.sunLength===p&&k.directionalLength===m&&k.pointLength===f&&k.spotLength===v&&k.rectAreaLength===g&&k.hemiLength===_&&k.numSunShadows===d&&k.numDirectionalShadows===M&&k.numPointShadows===T&&k.numSpotShadows===S&&k.numSpotMaps===b&&k.numLightProbes===O||(n.sun.length=p,n.directional.length=m,n.spot.length=v,n.rectArea.length=g,n.point.length=f,n.hemi.length=_,n.sunShadow.length=d,n.sunShadowMap.length=d,n.sunShadowMatrix.length=u,n.sunShadowCascade.length=u,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=S,n.spotShadowMap.length=S,n.spotLightMatrix.length=S+b-I,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=O,k.sunLength=p,k.directionalLength=m,k.pointLength=f,k.spotLength=v,k.rectAreaLength=g,k.hemiLength=_,k.numSunShadows=d,k.numDirectionalShadows=M,k.numPointShadows=T,k.numSpotShadows=S,k.numSpotMaps=b,k.numLightProbes=O,n.version=P1++)},setupView:function(o,l){let c=0,h=0,p=0,d=0,u=0,m=0,f=l.matrixWorldInverse;for(let v=0,g=o.length;v<g;v++){let _=o[v];if(_.isSunLight){let M=n.sun[c];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(f),c++}else if(_.isDirectionalLight){let M=n.directional[h];M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),h++}else if(_.isSpotLight){let M=n.spot[d];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),d++}else if(_.isRectAreaLight){let M=n.rectArea[u];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),a.identity(),s.copy(_.matrixWorld),s.premultiply(f),a.extractRotation(s),M.halfWidth.set(.5*_.width,0,0),M.halfHeight.set(0,.5*_.height,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),u++}else if(_.isPointLight){let M=n.point[p];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(f),m++}}},state:n}}function am(i){let e=new N1(i),t=[],n=[],r=[],s={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,t.length=0,n.length=0,r.length=0},state:s,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){r.push(a)}}}function D1(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new am(i),e.set(t,[s])):n>=r.length?(s=new am(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}var U1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,F1=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],B1=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],om=new vt,ro=new P,Xu=new P;function z1(i,e,t){let n=new Br,r=new _e,s=new _e,a=new an,o=new Nl,l=new Dl,c={},h=t.maxTextureSize,p={[Zs]:ni,[ni]:Zs,[er]:er},d=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _e},radius:{value:4}},vertexShader:U1,fragmentShader:O1}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new Rt;m.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let f=new ti(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ka;let g=this.type;function _(b,I){let O=e.update(f);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,u.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),b.mapPass===null?b.mapPass=new pi(r.x,r.y,{format:cs,type:nr}):b.mapPass.width===b.map.width&&b.mapPass.height===b.map.height||b.mapPass.setSize(b.map.width,b.map.height),d.uniforms.shadow_pass.value=b.map.depthTexture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(I,null,O,d,f,null),u.uniforms.shadow_pass.value=b.mapPass.texture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(I,null,O,u,f,null)}function M(b,I,O,k){let D=null,q=O.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(q!==void 0)D=q;else if(D=O.isPointLight===!0?l:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let B=D.uuid,ee=I.uuid,ae=c[B];ae===void 0&&(ae={},c[B]=ae);let re=ae[ee];re===void 0&&(re=D.clone(),ae[ee]=re,I.addEventListener("dispose",S)),D=re}return D.visible=I.visible,D.wireframe=I.wireframe,D.side=k===$s?I.shadowSide!==null?I.shadowSide:I.side:I.shadowSide!==null?I.shadowSide:p[I.side],D.alphaMap=I.alphaMap,D.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,D.map=I.map,D.clipShadows=I.clipShadows,D.clippingPlanes=I.clippingPlanes,D.clipIntersection=I.clipIntersection,D.displacementMap=I.displacementMap,D.displacementScale=I.displacementScale,D.displacementBias=I.displacementBias,D.wireframeLinewidth=I.wireframeLinewidth,D.linewidth=I.linewidth,O.isPointLight===!0&&D.isMeshDistanceMaterial===!0&&(i.properties.get(D).light=O),D}function T(b,I,O,k,D){if(b.visible===!1)return;if(b.layers.test(I.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&D===$s)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld);let B=e.update(b),ee=b.material;if(Array.isArray(ee)){let ae=B.groups;for(let re=0,ie=ae.length;re<ie;re++){let N=ae[re],J=ee[N.materialIndex];if(J&&J.visible){let le=M(b,J,k,D);b.onBeforeShadow(i,b,I,O,B,le,N),i.renderBufferDirect(O,null,B,le,b,N),b.onAfterShadow(i,b,I,O,B,le,N)}}}else if(ee.visible){let ae=M(b,ee,k,D);b.onBeforeShadow(i,b,I,O,B,ae,null),i.renderBufferDirect(O,null,B,ae,b,null),b.onAfterShadow(i,b,I,O,B,ae,null)}}let q=b.children;for(let B=0,ee=q.length;B<ee;B++)T(q[B],I,O,k,D)}function S(b){b.target.removeEventListener("dispose",S);for(let I in c){let O=c[I],k=b.target.uuid;k in O&&(O[k].dispose(),delete O[k])}}this.render=function(b,I,O){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||b.length===0)return;this.type===Gp&&(et("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ka);let k=i.getRenderTarget(),D=i.getActiveCubeFace(),q=i.getActiveMipmapLevel(),B=i.state;B.setBlending(tr),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let ee=g!==this.type;ee&&I.traverse(function(ae){ae.material&&(Array.isArray(ae.material)?ae.material.forEach(re=>re.needsUpdate=!0):ae.material.needsUpdate=!0)});for(let ae=0,re=b.length;ae<re;ae++){let ie=b[ae],N=ie.shadow;if(N===void 0){et("WebGLShadowMap:",ie,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);let J=N.getFrameExtents();r.multiply(J),s.copy(N.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/J.x),r.x=s.x*J.x,N.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/J.y),r.y=s.y*J.y,N.mapSize.y=s.y));let le=i.state.buffers.depth.getReversed();if(N.camera._reversedDepth=le,N.map===null||ee===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===$s){if(ie.isPointLight){et("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new pi(r.x,r.y,{format:cs,type:nr,minFilter:ii,magFilter:ii,generateMipmaps:!1}),N.map.texture.name=ie.name+".shadowMap",N.map.depthTexture=new kr(r.x,r.y,Pi),N.map.depthTexture.name=ie.name+".shadowMapDepth",N.map.depthTexture.format=os,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Gi,N.map.depthTexture.magFilter=Gi}else ie.isPointLight?(N.map=new pc(r.x),N.map.depthTexture=new cl(r.x,Hr)):(N.map=new pi(r.x,r.y),N.map.depthTexture=new kr(r.x,r.y,Hr)),N.map.depthTexture.name=ie.name+".shadowMap",N.map.depthTexture.format=os,this.type===Ka?(N.map.depthTexture.compareFunction=le?lc:oc,N.map.depthTexture.minFilter=ii,N.map.depthTexture.magFilter=ii):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Gi,N.map.depthTexture.magFilter=Gi);N.camera.updateProjectionMatrix()}N.map.isWebGLCubeRenderTarget===!0||N.map.width===r.x&&N.map.height===r.y||N.map.setSize(r.x,r.y);let Ne=N.map.isWebGLCubeRenderTarget?6:N.getViewportCount();ie.isPointLight!==!0&&N.updateMatrices(ie,O);for(let ve=0;ve<Ne;ve++){let Oe=N.getCamera(ve);if(ie.isPointLight){let be=N.camera,de=N.matrix,X=ie.distance||be.far;X!==be.far&&(be.far=X,be.updateProjectionMatrix()),ro.setFromMatrixPosition(ie.matrixWorld),be.position.copy(ro),Xu.copy(be.position),Xu.add(F1[ve]),be.up.copy(B1[ve]),be.lookAt(Xu),be.updateMatrixWorld(),de.makeTranslation(-ro.x,-ro.y,-ro.z),om.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),N._frustum.setFromProjectionMatrix(om,be.coordinateSystem,be.reversedDepth)}if(N.map.isWebGLCubeRenderTarget)i.setRenderTarget(N.map,ve),i.clear();else{ve===0&&(i.setRenderTarget(N.map),i.clear());let be=N.getViewport(ve);a.set(s.x*be.x,s.y*be.y,s.x*be.z,s.y*be.w),B.viewport(a)}n=N.getFrustum(ve),T(I,O,Oe,ie,this.type)}N.isPointLightShadow!==!0&&this.type===$s&&_(N,O),N.needsUpdate=!1}g=this.type,v.needsUpdate=!1,i.setRenderTarget(k,D,q)}}function k1(i,e){let t=new function(){let y=!1,z=new an,F=null,R=new an(0,0,0,0);return{setMask:function(j){F===j||y||(i.colorMask(j,j,j,j),F=j)},setLocked:function(j){y=j},setClear:function(j,Y,K,ue,Ee){Ee===!0&&(j*=ue,Y*=ue,K*=ue),z.set(j,Y,K,ue),R.equals(z)===!1&&(i.clearColor(j,Y,K,ue),R.copy(z))},reset:function(){y=!1,F=null,R.set(-1,0,0,0)}}},n=new function(){let y=!1,z=!1,F=null,R=null,j=null;return{setReversed:function(Y){if(z!==Y){let K=e.get("EXT_clip_control");Y?K.clipControlEXT(K.LOWER_LEFT_EXT,K.ZERO_TO_ONE_EXT):K.clipControlEXT(K.LOWER_LEFT_EXT,K.NEGATIVE_ONE_TO_ONE_EXT),z=Y;let ue=j;j=null,this.setClear(ue)}},getReversed:function(){return z},setTest:function(Y){Y?X(i.DEPTH_TEST):ne(i.DEPTH_TEST)},setMask:function(Y){F===Y||y||(i.depthMask(Y),F=Y)},setFunc:function(Y){if(z&&(Y=Pf[Y]),R!==Y){switch(Y){case Ih:i.depthFunc(i.NEVER);break;case Ph:i.depthFunc(i.ALWAYS);break;case Lh:i.depthFunc(i.LESS);break;case Yl:i.depthFunc(i.LEQUAL);break;case Nh:i.depthFunc(i.EQUAL);break;case Dh:i.depthFunc(i.GEQUAL);break;case Uh:i.depthFunc(i.GREATER);break;case Oh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}R=Y}},setLocked:function(Y){y=Y},setClear:function(Y){j!==Y&&(j=Y,z&&(Y=1-Y),i.clearDepth(Y))},reset:function(){y=!1,F=null,R=null,j=null,z=!1}}},r=new function(){let y=!1,z=null,F=null,R=null,j=null,Y=null,K=null,ue=null,Ee=null;return{setTest:function(Se){y||(Se?X(i.STENCIL_TEST):ne(i.STENCIL_TEST))},setMask:function(Se){z===Se||y||(i.stencilMask(Se),z=Se)},setFunc:function(Se,fe,Be){F===Se&&R===fe&&j===Be||(i.stencilFunc(Se,fe,Be),F=Se,R=fe,j=Be)},setOp:function(Se,fe,Be){Y===Se&&K===fe&&ue===Be||(i.stencilOp(Se,fe,Be),Y=Se,K=fe,ue=Be)},setLocked:function(Se){y=Se},setClear:function(Se){Ee!==Se&&(i.clearStencil(Se),Ee=Se)},reset:function(){y=!1,z=null,F=null,R=null,j=null,Y=null,K=null,ue=null,Ee=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,M=null,T=null,S=new _t(0,0,0),b=0,I=!1,O=null,k=null,D=null,q=null,B=null,ee=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ae=!1,re=0,ie=i.getParameter(i.VERSION);ie.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(ie)[1]),ae=re>=1):ie.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),ae=re>=2);let N=null,J={},le=i.getParameter(i.SCISSOR_BOX),Ne=i.getParameter(i.VIEWPORT),ve=new an().fromArray(le),Oe=new an().fromArray(Ne);function be(y,z,F,R){let j=new Uint8Array(4),Y=i.createTexture();i.bindTexture(y,Y),i.texParameteri(y,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(y,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let K=0;K<F;K++)y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?i.texImage3D(z,0,i.RGBA,1,1,R,0,i.RGBA,i.UNSIGNED_BYTE,j):i.texImage2D(z+K,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,j);return Y}let de={};function X(y){o[y]!==!0&&(i.enable(y),o[y]=!0)}function ne(y){o[y]!==!1&&(i.disable(y),o[y]=!1)}de[i.TEXTURE_2D]=be(i.TEXTURE_2D,i.TEXTURE_2D,1),de[i.TEXTURE_CUBE_MAP]=be(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[i.TEXTURE_2D_ARRAY]=be(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),de[i.TEXTURE_3D]=be(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),X(i.DEPTH_TEST),n.setFunc(Yl),E(!1),C(Ah),X(i.CULL_FACE),w(tr);let he={[Js]:i.FUNC_ADD,[Wp]:i.FUNC_SUBTRACT,[Xp]:i.FUNC_REVERSE_SUBTRACT};he[qp]=i.MIN,he[jp]=i.MAX;let oe={[Yp]:i.ZERO,[$p]:i.ONE,[Zp]:i.SRC_COLOR,[Kp]:i.SRC_ALPHA,[sf]:i.SRC_ALPHA_SATURATE,[nf]:i.DST_COLOR,[ef]:i.DST_ALPHA,[Jp]:i.ONE_MINUS_SRC_COLOR,[Qp]:i.ONE_MINUS_SRC_ALPHA,[rf]:i.ONE_MINUS_DST_COLOR,[tf]:i.ONE_MINUS_DST_ALPHA,[af]:i.CONSTANT_COLOR,[of]:i.ONE_MINUS_CONSTANT_COLOR,[lf]:i.CONSTANT_ALPHA,[cf]:i.ONE_MINUS_CONSTANT_ALPHA};function w(y,z,F,R,j,Y,K,ue,Ee,Se){if(y!==tr){if(u===!1&&(X(i.BLEND),u=!0),y===Hp)j=j||z,Y=Y||F,K=K||R,z===f&&j===_||(i.blendEquationSeparate(he[z],he[j]),f=z,_=j),F===v&&R===g&&Y===M&&K===T||(i.blendFuncSeparate(oe[F],oe[R],oe[Y],oe[K]),v=F,g=R,M=Y,T=K),ue.equals(S)!==!1&&Ee===b||(i.blendColor(ue.r,ue.g,ue.b,Ee),S.copy(ue),b=Ee),m=y,I=!1;else if(y!==m||Se!==I){if(f===Js&&_===Js||(i.blendEquation(i.FUNC_ADD),f=Js,_=Js),Se)switch(y){case Ii:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _r:i.blendFunc(i.ONE,i.ONE);break;case Rh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ch:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:it("WebGLState: Invalid blending: ",y)}else switch(y){case Ii:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _r:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Rh:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ch:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",y)}v=null,g=null,M=null,T=null,S.set(0,0,0),b=0,m=y,I=Se}}else u===!0&&(ne(i.BLEND),u=!1)}function E(y){O!==y&&(y?i.frontFace(i.CW):i.frontFace(i.CCW),O=y)}function C(y){y!==kp?(X(i.CULL_FACE),y!==k&&(y===Ah?i.cullFace(i.BACK):y===Vp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ne(i.CULL_FACE),k=y}function U(y,z,F){y?(X(i.POLYGON_OFFSET_FILL),q===z&&B===F||(q=z,B=F,n.getReversed()&&(z=-z),i.polygonOffset(z,F))):ne(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:X,disable:ne,bindFramebuffer:function(y,z){return c[y]!==z&&(i.bindFramebuffer(y,z),c[y]=z,y===i.DRAW_FRAMEBUFFER&&(c[i.FRAMEBUFFER]=z),y===i.FRAMEBUFFER&&(c[i.DRAW_FRAMEBUFFER]=z),!0)},drawBuffers:function(y,z){let F=p,R=!1;if(y){F=h.get(z),F===void 0&&(F=[],h.set(z,F));let j=y.textures;if(F.length!==j.length||F[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,K=j.length;Y<K;Y++)F[Y]=i.COLOR_ATTACHMENT0+Y;F.length=j.length,R=!0}}else F[0]!==i.BACK&&(F[0]=i.BACK,R=!0);R&&i.drawBuffers(F)},useProgram:function(y){return d!==y&&(i.useProgram(y),d=y,!0)},setBlending:w,setMaterial:function(y,z){y.side===er?ne(i.CULL_FACE):X(i.CULL_FACE);let F=y.side===ni;z&&(F=!F),E(F),y.blending===Ii&&y.transparent===!1?w(tr):w(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),n.setFunc(y.depthFunc),n.setTest(y.depthTest),n.setMask(y.depthWrite),t.setMask(y.colorWrite);let R=y.stencilWrite;r.setTest(R),R&&(r.setMask(y.stencilWriteMask),r.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),r.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),U(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?X(i.SAMPLE_ALPHA_TO_COVERAGE):ne(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:C,setLineWidth:function(y){y!==D&&(ae&&i.lineWidth(y),D=y)},setPolygonOffset:U,setScissorTest:function(y){y?X(i.SCISSOR_TEST):ne(i.SCISSOR_TEST)},activeTexture:function(y){y===void 0&&(y=i.TEXTURE0+ee-1),N!==y&&(i.activeTexture(y),N=y)},bindTexture:function(y,z,F){F===void 0&&(F=N===null?i.TEXTURE0+ee-1:N);let R=J[F];R===void 0&&(R={type:void 0,texture:void 0},J[F]=R),R.type===y&&R.texture===z||(N!==F&&(i.activeTexture(F),N=F),i.bindTexture(y,z||de[y]),R.type=y,R.texture=z)},unbindTexture:function(){let y=J[N];y!==void 0&&y.type!==void 0&&(i.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(y){it("WebGLState:",y)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(y){it("WebGLState:",y)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(y){it("WebGLState:",y)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(y){it("WebGLState:",y)}},pixelStorei:function(y,z){l[y]!==z&&(i.pixelStorei(y,z),l[y]=z)},getParameter:function(y){return l[y]!==void 0?l[y]:i.getParameter(y)},updateUBOMapping:function(y,z){let F=a.get(z);F===void 0&&(F=new WeakMap,a.set(z,F));let R=F.get(y);R===void 0&&(R=i.getUniformBlockIndex(z,y.name),F.set(y,R))},uniformBlockBinding:function(y,z){let F=a.get(z).get(y);s.get(z)!==F&&(i.uniformBlockBinding(z,F,y.__bindingPointIndex),s.set(z,F))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(y){it("WebGLState:",y)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(y){it("WebGLState:",y)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(y){it("WebGLState:",y)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(y){it("WebGLState:",y)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(y){it("WebGLState:",y)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(y){it("WebGLState:",y)}},scissor:function(y){ve.equals(y)===!1&&(i.scissor(y.x,y.y,y.z,y.w),ve.copy(y))},viewport:function(y){Oe.equals(y)===!1&&(i.viewport(y.x,y.y,y.z,y.w),Oe.copy(y))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),o={},l={},N=null,J={},c={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,M=null,T=null,S=new _t(0,0,0),b=0,I=!1,O=null,k=null,D=null,q=null,B=null,ve.set(0,0,i.canvas.width,i.canvas.height),Oe.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function V1(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new _e,h=new WeakMap,p=new Set,d,u=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(w,E){return m?new OffscreenCanvas(w,E):Ea("canvas")}function v(w,E,C){let U=1,y=oe(w);if((y.width>C||y.height>C)&&(U=C/Math.max(y.width,y.height)),U<1){if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let z=Math.floor(U*y.width),F=Math.floor(U*y.height);d===void 0&&(d=f(z,F));let R=E?f(z,F):d;return R.width=z,R.height=F,R.getContext("2d").drawImage(w,0,0,z,F),et("WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+z+"x"+F+")."),R}return"data"in w&&et("WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),w}return w}function g(w){return w.generateMipmaps}function _(w){i.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(w,E,C,U,y,z=!1){if(w!==null){if(i[w]!==void 0)return i[w];et("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let F;U&&(F=e.get("EXT_texture_norm16"),F||et("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let R=E;if(E===i.RED&&(C===i.FLOAT&&(R=i.R32F),C===i.HALF_FLOAT&&(R=i.R16F),C===i.UNSIGNED_BYTE&&(R=i.R8),C===i.UNSIGNED_SHORT&&F&&(R=F.R16_EXT),C===i.SHORT&&F&&(R=F.R16_SNORM_EXT)),E===i.RED_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.R8UI),C===i.UNSIGNED_SHORT&&(R=i.R16UI),C===i.UNSIGNED_INT&&(R=i.R32UI),C===i.BYTE&&(R=i.R8I),C===i.SHORT&&(R=i.R16I),C===i.INT&&(R=i.R32I)),E===i.RG&&(C===i.FLOAT&&(R=i.RG32F),C===i.HALF_FLOAT&&(R=i.RG16F),C===i.UNSIGNED_BYTE&&(R=i.RG8),C===i.UNSIGNED_SHORT&&F&&(R=F.RG16_EXT),C===i.SHORT&&F&&(R=F.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RG8UI),C===i.UNSIGNED_SHORT&&(R=i.RG16UI),C===i.UNSIGNED_INT&&(R=i.RG32UI),C===i.BYTE&&(R=i.RG8I),C===i.SHORT&&(R=i.RG16I),C===i.INT&&(R=i.RG32I)),E===i.RGB_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RGB8UI),C===i.UNSIGNED_SHORT&&(R=i.RGB16UI),C===i.UNSIGNED_INT&&(R=i.RGB32UI),C===i.BYTE&&(R=i.RGB8I),C===i.SHORT&&(R=i.RGB16I),C===i.INT&&(R=i.RGB32I)),E===i.RGBA_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RGBA8UI),C===i.UNSIGNED_SHORT&&(R=i.RGBA16UI),C===i.UNSIGNED_INT&&(R=i.RGBA32UI),C===i.BYTE&&(R=i.RGBA8I),C===i.SHORT&&(R=i.RGBA16I),C===i.INT&&(R=i.RGBA32I)),E===i.RGB&&(C===i.UNSIGNED_SHORT&&F&&(R=F.RGB16_EXT),C===i.SHORT&&F&&(R=F.RGB16_SNORM_EXT),C===i.UNSIGNED_INT_5_9_9_9_REV&&(R=i.RGB9_E5),C===i.UNSIGNED_INT_10F_11F_11F_REV&&(R=i.R11F_G11F_B10F)),E===i.RGBA){let j=z?Ru:It.getTransfer(y);C===i.FLOAT&&(R=i.RGBA32F),C===i.HALF_FLOAT&&(R=i.RGBA16F),C===i.UNSIGNED_BYTE&&(R=j===on?i.SRGB8_ALPHA8:i.RGBA8),C===i.UNSIGNED_SHORT&&F&&(R=F.RGBA16_EXT),C===i.SHORT&&F&&(R=F.RGBA16_SNORM_EXT),C===i.UNSIGNED_SHORT_4_4_4_4&&(R=i.RGBA4),C===i.UNSIGNED_SHORT_5_5_5_1&&(R=i.RGB5_A1)}return R!==i.R16F&&R!==i.R32F&&R!==i.RG16F&&R!==i.RG32F&&R!==i.RGBA16F&&R!==i.RGBA32F||e.get("EXT_color_buffer_float"),R}function S(w,E){let C;return w?E===null||E===Hr||E===Qs?C=i.DEPTH24_STENCIL8:E===Pi?C=i.DEPTH32F_STENCIL8:E===to&&(C=i.DEPTH24_STENCIL8,et("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Hr||E===Qs?C=i.DEPTH_COMPONENT24:E===Pi?C=i.DEPTH_COMPONENT32F:E===to&&(C=i.DEPTH_COMPONENT16),C}function b(w,E){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Gi&&w.minFilter!==ii?Math.log2(Math.max(E.width,E.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?E.mipmaps.length:1}function I(w){let E=w.target;E.removeEventListener("dispose",I),(function(C){let U=n.get(C);if(U.__webglInit===void 0)return;let y=C.source,z=u.get(y);if(z){let F=z[U.__cacheKey];F.usedTimes--,F.usedTimes===0&&k(C),Object.keys(z).length===0&&u.delete(y)}n.remove(C)})(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&p.delete(E)}function O(w){let E=w.target;E.removeEventListener("dispose",O),(function(C){let U=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(U.__webglFramebuffer[z]))for(let F=0;F<U.__webglFramebuffer[z].length;F++)i.deleteFramebuffer(U.__webglFramebuffer[z][F]);else i.deleteFramebuffer(U.__webglFramebuffer[z]);U.__webglDepthbuffer&&i.deleteRenderbuffer(U.__webglDepthbuffer[z])}else{if(Array.isArray(U.__webglFramebuffer))for(let z=0;z<U.__webglFramebuffer.length;z++)i.deleteFramebuffer(U.__webglFramebuffer[z]);else i.deleteFramebuffer(U.__webglFramebuffer);if(U.__webglDepthbuffer&&i.deleteRenderbuffer(U.__webglDepthbuffer),U.__webglMultisampledFramebuffer&&i.deleteFramebuffer(U.__webglMultisampledFramebuffer),U.__webglColorRenderbuffer)for(let z=0;z<U.__webglColorRenderbuffer.length;z++)U.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(U.__webglColorRenderbuffer[z]);U.__webglDepthRenderbuffer&&i.deleteRenderbuffer(U.__webglDepthRenderbuffer)}let y=C.textures;for(let z=0,F=y.length;z<F;z++){let R=n.get(y[z]);R.__webglTexture&&(i.deleteTexture(R.__webglTexture),a.memory.textures--),n.remove(y[z])}n.remove(C)})(E)}function k(w){let E=n.get(w);i.deleteTexture(E.__webglTexture);let C=w.source;delete u.get(C)[E.__cacheKey],a.memory.textures--}let D=0;function q(w,E){let C=n.get(w);if(w.isVideoTexture&&(function(U){let y=a.render.frame;h.get(U)!==y&&(h.set(U,y),U.update())})(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&C.__version!==w.version){let U=w.image;if(U===null)et("WebGLRenderer: Texture marked for update but no image data found.");else{if(U.complete!==!1)return void J(C,w,E);et("WebGLRenderer: Texture marked for update but image is incomplete")}}else w.isExternalTexture&&(C.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,C.__webglTexture,i.TEXTURE0+E)}let B={[Jl]:i.REPEAT,[Kl]:i.CLAMP_TO_EDGE,[pf]:i.MIRRORED_REPEAT},ee={[Gi]:i.NEAREST,[ff]:i.NEAREST_MIPMAP_NEAREST,[eo]:i.NEAREST_MIPMAP_LINEAR,[ii]:i.LINEAR,[Ql]:i.LINEAR_MIPMAP_NEAREST,[as]:i.LINEAR_MIPMAP_LINEAR},ae={[Mf]:i.NEVER,[Af]:i.ALWAYS,[bf]:i.LESS,[oc]:i.LEQUAL,[Tf]:i.EQUAL,[lc]:i.GEQUAL,[Ef]:i.GREATER,[wf]:i.NOTEQUAL};function re(w,E){if(E.type!==Pi||e.has("OES_texture_float_linear")!==!1||E.magFilter!==ii&&E.magFilter!==Ql&&E.magFilter!==eo&&E.magFilter!==as&&E.minFilter!==ii&&E.minFilter!==Ql&&E.minFilter!==eo&&E.minFilter!==as||et("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,B[E.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,B[E.wrapT]),w!==i.TEXTURE_3D&&w!==i.TEXTURE_2D_ARRAY||i.texParameteri(w,i.TEXTURE_WRAP_R,B[E.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ee[E.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ee[E.minFilter]),E.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ae[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Gi||E.minFilter!==eo&&E.minFilter!==as||E.type===Pi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let C=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function ie(w,E){let C=!1;w.__webglInit===void 0&&(w.__webglInit=!0,E.addEventListener("dispose",I));let U=E.source,y=u.get(U);y===void 0&&(y={},u.set(U,y));let z=(function(F){let R=[];return R.push(F.wrapS),R.push(F.wrapT),R.push(F.wrapR||0),R.push(F.magFilter),R.push(F.minFilter),R.push(F.anisotropy),R.push(F.internalFormat),R.push(F.format),R.push(F.type),R.push(F.generateMipmaps),R.push(F.premultiplyAlpha),R.push(F.flipY),R.push(F.unpackAlignment),R.push(F.colorSpace),R.join()})(E);if(z!==w.__cacheKey){y[z]===void 0&&(y[z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,C=!0),y[z].usedTimes++;let F=y[w.__cacheKey];F!==void 0&&(y[w.__cacheKey].usedTimes--,F.usedTimes===0&&k(E)),w.__cacheKey=z,w.__webglTexture=y[z].texture}return C}function N(w,E,C){return Math.floor(Math.floor(w/C)/E)}function J(w,E,C){let U=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(U=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(U=i.TEXTURE_3D);let y=ie(w,E),z=E.source;t.bindTexture(U,w.__webglTexture,i.TEXTURE0+C);let F=n.get(z);if(z.version!==F.__version||y===!0){if(t.activeTexture(i.TEXTURE0+C),!(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)){let me=It.getPrimaries(It.workingColorSpace),ge=E.colorSpace===hs?null:It.getPrimaries(E.colorSpace),Ie=E.colorSpace===hs||me===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let R=v(E.image,!1,r.maxTextureSize);R=he(E,R);let j=s.convert(E.format,E.colorSpace),Y=s.convert(E.type),K,ue=T(E.internalFormat,j,Y,E.normalized,E.colorSpace,E.isVideoTexture);re(U,E);let Ee=E.mipmaps,Se=E.isVideoTexture!==!0,fe=F.__version===void 0||y===!0,Be=z.dataReady,ce=b(E,R);if(E.isDepthTexture)ue=S(E.format===ls,E.type),fe&&(Se?t.texStorage2D(i.TEXTURE_2D,1,ue,R.width,R.height):t.texImage2D(i.TEXTURE_2D,0,ue,R.width,R.height,0,j,Y,null));else if(E.isDataTexture)if(Ee.length>0){Se&&fe&&t.texStorage2D(i.TEXTURE_2D,ce,ue,Ee[0].width,Ee[0].height);for(let me=0,ge=Ee.length;me<ge;me++)K=Ee[me],Se?Be&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,K.width,K.height,j,Y,K.data):t.texImage2D(i.TEXTURE_2D,me,ue,K.width,K.height,0,j,Y,K.data);E.generateMipmaps=!1}else Se?(fe&&t.texStorage2D(i.TEXTURE_2D,ce,ue,R.width,R.height),Be&&(function(me,ge,Ie,Pt){let xt=me.updateRanges;if(xt.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge.width,ge.height,Ie,Pt,ge.data);else{xt.sort((ot,Yt)=>ot.start-Yt.start);let Ft=0;for(let ot=1;ot<xt.length;ot++){let Yt=xt[Ft],Ut=xt[ot],cn=Yt.start+Yt.count,rt=N(Ut.start,ge.width,4),bn=N(Yt.start,ge.width,4);Ut.start<=cn+1&&rt===bn&&N(Ut.start+Ut.count-1,ge.width,4)===rt?Yt.count=Math.max(Yt.count,Ut.start+Ut.count-Yt.start):(++Ft,xt[Ft]=Ut)}xt.length=Ft+1;let ln=t.getParameter(i.UNPACK_ROW_LENGTH),ze=t.getParameter(i.UNPACK_SKIP_PIXELS),at=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,ge.width);for(let ot=0,Yt=xt.length;ot<Yt;ot++){let Ut=xt[ot],cn=Math.floor(Ut.start/4),rt=Math.ceil(Ut.count/4),bn=cn%ge.width,ke=Math.floor(cn/ge.width),$t=rt;t.pixelStorei(i.UNPACK_SKIP_PIXELS,bn),t.pixelStorei(i.UNPACK_SKIP_ROWS,ke),t.texSubImage2D(i.TEXTURE_2D,0,bn,ke,$t,1,Ie,Pt,ge.data)}me.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ln),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ze),t.pixelStorei(i.UNPACK_SKIP_ROWS,at)}})(E,R,j,Y)):t.texImage2D(i.TEXTURE_2D,0,ue,R.width,R.height,0,j,Y,R.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Se&&fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,ue,Ee[0].width,Ee[0].height,R.depth);for(let me=0,ge=Ee.length;me<ge;me++)if(K=Ee[me],E.format!==ir)if(j!==null)if(Se){if(Be)if(E.layerUpdates.size>0){let Ie=Du(K.width,K.height,E.format,E.type);for(let Pt of E.layerUpdates){let xt=K.data.subarray(Pt*Ie/K.data.BYTES_PER_ELEMENT,(Pt+1)*Ie/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,Pt,K.width,K.height,1,j,xt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,0,K.width,K.height,R.depth,j,K.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,me,ue,K.width,K.height,R.depth,0,K.data,0,0);else et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Se?Be&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,me,0,0,0,K.width,K.height,R.depth,j,Y,K.data):t.texImage3D(i.TEXTURE_2D_ARRAY,me,ue,K.width,K.height,R.depth,0,j,Y,K.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Se&&fe&&t.texStorage2D(i.TEXTURE_2D,ce,ue,Ee[0].width,Ee[0].height);for(let me=0,ge=Ee.length;me<ge;me++)K=Ee[me],E.format!==ir?j!==null?Se?Be&&t.compressedTexSubImage2D(i.TEXTURE_2D,me,0,0,K.width,K.height,j,K.data):t.compressedTexImage2D(i.TEXTURE_2D,me,ue,K.width,K.height,0,K.data):et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?Be&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,K.width,K.height,j,Y,K.data):t.texImage2D(i.TEXTURE_2D,me,ue,K.width,K.height,0,j,Y,K.data)}else if(E.isDataArrayTexture)if(Se){if(fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,ue,R.width,R.height,R.depth),Be)if(E.layerUpdates.size>0){let me=Du(R.width,R.height,E.format,E.type);for(let ge of E.layerUpdates){let Ie=R.data.subarray(ge*me/R.data.BYTES_PER_ELEMENT,(ge+1)*me/R.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ge,R.width,R.height,1,j,Y,Ie)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,R.width,R.height,R.depth,j,Y,R.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ue,R.width,R.height,R.depth,0,j,Y,R.data);else if(E.isData3DTexture)Se?(fe&&t.texStorage3D(i.TEXTURE_3D,ce,ue,R.width,R.height,R.depth),Be&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,R.width,R.height,R.depth,j,Y,R.data)):t.texImage3D(i.TEXTURE_3D,0,ue,R.width,R.height,R.depth,0,j,Y,R.data);else if(E.isFramebufferTexture){if(fe)if(Se)t.texStorage2D(i.TEXTURE_2D,ce,ue,R.width,R.height);else{let me=R.width,ge=R.height;for(let Ie=0;Ie<ce;Ie++)t.texImage2D(i.TEXTURE_2D,Ie,ue,me,ge,0,j,Y,null),me>>=1,ge>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let me=i.canvas;if(me.hasAttribute("layoutsubtree")||me.setAttribute("layoutsubtree","true"),R.parentNode!==me)return me.appendChild(R),p.add(E),me.onpaint=ge=>{let Ie=ge.changedElements;for(let Pt of p)Ie.includes(Pt.image)&&(Pt.needsUpdate=!0)},void me.requestPaint();if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,R);else{let Ie=i.RGBA,Pt=i.RGBA,xt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ie,Pt,xt,R)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ee.length>0){if(Se&&fe){let me=oe(Ee[0]);t.texStorage2D(i.TEXTURE_2D,ce,ue,me.width,me.height)}for(let me=0,ge=Ee.length;me<ge;me++)K=Ee[me],Se?Be&&t.texSubImage2D(i.TEXTURE_2D,me,0,0,j,Y,K):t.texImage2D(i.TEXTURE_2D,me,ue,j,Y,K);E.generateMipmaps=!1}else if(Se){if(fe){let me=oe(R);t.texStorage2D(i.TEXTURE_2D,ce,ue,me.width,me.height)}Be&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,j,Y,R)}else t.texImage2D(i.TEXTURE_2D,0,ue,j,Y,R);g(E)&&_(U),F.__version=z.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function le(w,E,C,U,y,z){let F=s.convert(C.format,C.colorSpace),R=s.convert(C.type),j=T(C.internalFormat,F,R,C.normalized,C.colorSpace),Y=n.get(E),K=n.get(C);if(K.__renderTarget=E,!Y.__hasExternalTextures){let ue=Math.max(1,E.width>>z),Ee=Math.max(1,E.height>>z);y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?t.texImage3D(y,z,j,ue,Ee,E.depth,0,F,R,null):t.texImage2D(y,z,j,ue,Ee,0,F,R,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),ne(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,U,y,K.__webglTexture,0,X(E)):(y===i.TEXTURE_2D||y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,U,y,K.__webglTexture,z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(w,E,C){if(i.bindRenderbuffer(i.RENDERBUFFER,w),E.depthBuffer){let U=E.depthTexture,y=U&&U.isDepthTexture?U.type:null,z=S(E.stencilBuffer,y),F=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ne(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X(E),z,E.width,E.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,X(E),z,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,z,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,F,i.RENDERBUFFER,w)}else{let U=E.textures;for(let y=0;y<U.length;y++){let z=U[y],F=s.convert(z.format,z.colorSpace),R=s.convert(z.type),j=T(z.internalFormat,F,R,z.normalized,z.colorSpace);ne(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X(E),j,E.width,E.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,X(E),j,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,j,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ve(w,E,C){let U=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let y=n.get(E.depthTexture);if(y.__renderTarget=E,y.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),U){if(y.__webglInit===void 0&&(y.__webglInit=!0,E.depthTexture.addEventListener("dispose",I)),y.__webglTexture===void 0){y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture),re(i.TEXTURE_CUBE_MAP,E.depthTexture);let Y=s.convert(E.depthTexture.format),K=s.convert(E.depthTexture.type),ue;E.depthTexture.format===os?ue=i.DEPTH_COMPONENT24:E.depthTexture.format===ls&&(ue=i.DEPTH24_STENCIL8);for(let Ee=0;Ee<6;Ee++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,ue,E.width,E.height,0,Y,K,null)}}else q(E.depthTexture,0);let z=y.__webglTexture,F=X(E),R=U?i.TEXTURE_CUBE_MAP_POSITIVE_X+C:i.TEXTURE_2D,j=E.depthTexture.format===ls?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===os)ne(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,R,z,0,F):i.framebufferTexture2D(i.FRAMEBUFFER,j,R,z,0);else{if(E.depthTexture.format!==ls)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");ne(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,R,z,0,F):i.framebufferTexture2D(i.FRAMEBUFFER,j,R,z,0)}}function Oe(w){let E=n.get(w),C=w.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==w.depthTexture){let U=w.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),U){let y=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,U.removeEventListener("dispose",y)};U.addEventListener("dispose",y),E.__depthDisposeCallback=y}E.__boundDepthTexture=U}if(w.depthTexture&&!E.__autoAllocateDepthBuffer)if(C)for(let U=0;U<6;U++)ve(E.__webglFramebuffer[U],w,U);else{let U=w.texture.mipmaps;U&&U.length>0?ve(E.__webglFramebuffer[0],w,0):ve(E.__webglFramebuffer,w,0)}else if(C){E.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[U]),E.__webglDepthbuffer[U]===void 0)E.__webglDepthbuffer[U]=i.createRenderbuffer(),Ne(E.__webglDepthbuffer[U],w,!1);else{let y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=E.__webglDepthbuffer[U];i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,z)}}else{let U=w.texture.mipmaps;if(U&&U.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),Ne(E.__webglDepthbuffer,w,!1);else{let y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,z)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let be=[],de=[];function X(w){return Math.min(r.maxSamples,w.samples)}function ne(w){let E=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function he(w,E){let C=w.colorSpace,U=w.format,y=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||C!==ac&&C!==hs&&(It.getTransfer(C)===on?U===ir&&y===Hi||et("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",C)),E}function oe(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=function(){let w=D;return w>=r.maxTextures&&et("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+r.maxTextures),D+=1,w},this.resetTextureUnits=function(){D=0},this.getTextureUnits=function(){return D},this.setTextureUnits=function(w){D=w},this.setTexture2D=q,this.setTexture2DArray=function(w,E){let C=n.get(w);w.isRenderTargetTexture===!1&&w.version>0&&C.__version!==w.version?J(C,w,E):(w.isExternalTexture&&(C.__webglTexture=w.sourceTexture?w.sourceTexture:null),t.bindTexture(i.TEXTURE_2D_ARRAY,C.__webglTexture,i.TEXTURE0+E))},this.setTexture3D=function(w,E){let C=n.get(w);w.isRenderTargetTexture===!1&&w.version>0&&C.__version!==w.version?J(C,w,E):t.bindTexture(i.TEXTURE_3D,C.__webglTexture,i.TEXTURE0+E)},this.setTextureCube=function(w,E){let C=n.get(w);w.isCubeDepthTexture!==!0&&w.version>0&&C.__version!==w.version?(function(U,y,z){if(y.image.length!==6)return;let F=ie(U,y),R=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+z);let j=n.get(R);if(R.version!==j.__version||F===!0){t.activeTexture(i.TEXTURE0+z);let Y=It.getPrimaries(It.workingColorSpace),K=y.colorSpace===hs?null:It.getPrimaries(y.colorSpace),ue=y.colorSpace===hs||Y===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let Ee=y.isCompressedTexture||y.image[0].isCompressedTexture,Se=y.image[0]&&y.image[0].isDataTexture,fe=[];for(let ze=0;ze<6;ze++)fe[ze]=Ee||Se?Se?y.image[ze].image:y.image[ze]:v(y.image[ze],!0,r.maxCubemapSize),fe[ze]=he(y,fe[ze]);let Be=fe[0],ce=s.convert(y.format,y.colorSpace),me=s.convert(y.type),ge=T(y.internalFormat,ce,me,y.normalized,y.colorSpace),Ie=y.isVideoTexture!==!0,Pt=j.__version===void 0||F===!0,xt=R.dataReady,Ft,ln=b(y,Be);if(re(i.TEXTURE_CUBE_MAP,y),Ee){Ie&&Pt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ln,ge,Be.width,Be.height);for(let ze=0;ze<6;ze++){Ft=fe[ze].mipmaps;for(let at=0;at<Ft.length;at++){let ot=Ft[at];y.format!==ir?ce!==null?Ie?xt&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,at,0,0,ot.width,ot.height,ce,ot.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,at,ge,ot.width,ot.height,0,ot.data):et("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?xt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,at,0,0,ot.width,ot.height,ce,me,ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,at,ge,ot.width,ot.height,0,ce,me,ot.data)}}}else{if(Ft=y.mipmaps,Ie&&Pt){Ft.length>0&&ln++;let ze=oe(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ln,ge,ze.width,ze.height)}for(let ze=0;ze<6;ze++)if(Se){Ie?xt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,0,0,fe[ze].width,fe[ze].height,ce,me,fe[ze].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,ge,fe[ze].width,fe[ze].height,0,ce,me,fe[ze].data);for(let at=0;at<Ft.length;at++){let ot=Ft[at].image[ze].image;Ie?xt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,at+1,0,0,ot.width,ot.height,ce,me,ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,at+1,ge,ot.width,ot.height,0,ce,me,ot.data)}}else{Ie?xt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,0,0,ce,me,fe[ze]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,0,ge,ce,me,fe[ze]);for(let at=0;at<Ft.length;at++){let ot=Ft[at];Ie?xt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,at+1,0,0,ce,me,ot.image[ze]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ze,at+1,ge,ce,me,ot.image[ze])}}}g(y)&&_(i.TEXTURE_CUBE_MAP),j.__version=R.version,y.onUpdate&&y.onUpdate(y)}U.__version=y.version})(C,w,E):t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+E)},this.rebindTextures=function(w,E,C){let U=n.get(w);E!==void 0&&le(U.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),C!==void 0&&Oe(w)},this.setupRenderTarget=function(w){let E=w.texture,C=n.get(w),U=n.get(E);w.addEventListener("dispose",O);let y=w.textures,z=w.isWebGLCubeRenderTarget===!0,F=y.length>1;if(F||(U.__webglTexture===void 0&&(U.__webglTexture=i.createTexture()),U.__version=E.version,a.memory.textures++),z){C.__webglFramebuffer=[];for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0){C.__webglFramebuffer[R]=[];for(let j=0;j<E.mipmaps.length;j++)C.__webglFramebuffer[R][j]=i.createFramebuffer()}else C.__webglFramebuffer[R]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){C.__webglFramebuffer=[];for(let R=0;R<E.mipmaps.length;R++)C.__webglFramebuffer[R]=i.createFramebuffer()}else C.__webglFramebuffer=i.createFramebuffer();if(F)for(let R=0,j=y.length;R<j;R++){let Y=n.get(y[R]);Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&ne(w)===!1){C.__webglMultisampledFramebuffer=i.createFramebuffer(),C.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let R=0;R<y.length;R++){let j=y[R];C.__webglColorRenderbuffer[R]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,C.__webglColorRenderbuffer[R]);let Y=s.convert(j.format,j.colorSpace),K=s.convert(j.type),ue=T(j.internalFormat,Y,K,j.normalized,j.colorSpace,w.isXRRenderTarget===!0),Ee=X(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,ue,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+R,i.RENDERBUFFER,C.__webglColorRenderbuffer[R])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(C.__webglDepthRenderbuffer=i.createRenderbuffer(),Ne(C.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(z){t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture),re(i.TEXTURE_CUBE_MAP,E);for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0)for(let j=0;j<E.mipmaps.length;j++)le(C.__webglFramebuffer[R][j],w,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,j);else le(C.__webglFramebuffer[R],w,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,0);g(E)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(F){for(let R=0,j=y.length;R<j;R++){let Y=y[R],K=n.get(Y),ue=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ue=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,K.__webglTexture),re(ue,Y),le(C.__webglFramebuffer,w,Y,i.COLOR_ATTACHMENT0+R,ue,0),g(Y)&&_(ue)}t.unbindTexture()}else{let R=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(R=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(R,U.__webglTexture),re(R,E),E.mipmaps&&E.mipmaps.length>0)for(let j=0;j<E.mipmaps.length;j++)le(C.__webglFramebuffer[j],w,E,i.COLOR_ATTACHMENT0,R,j);else le(C.__webglFramebuffer,w,E,i.COLOR_ATTACHMENT0,R,0);g(E)&&_(R),t.unbindTexture()}w.depthBuffer&&Oe(w)},this.updateRenderTargetMipmap=function(w){let E=w.textures;for(let C=0,U=E.length;C<U;C++){let y=E[C];if(g(y)){let z=M(w),F=n.get(y).__webglTexture;t.bindTexture(z,F),_(z),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(w){if(w.samples>0){if(ne(w)===!1){let E=w.textures,C=w.width,U=w.height,y=i.COLOR_BUFFER_BIT,z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,F=n.get(w),R=E.length>1;if(R)for(let Y=0;Y<E.length;Y++)t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,F.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,F.__webglMultisampledFramebuffer);let j=w.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglFramebuffer);for(let Y=0;Y<E.length;Y++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(y|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(y|=i.STENCIL_BUFFER_BIT)),R){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,F.__webglColorRenderbuffer[Y]);let K=n.get(E[Y]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,K,0)}i.blitFramebuffer(0,0,C,U,0,0,C,U,y,i.NEAREST),l===!0&&(be.length=0,de.length=0,be.push(i.COLOR_ATTACHMENT0+Y),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(be.push(z),de.push(z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,de)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,be))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),R)for(let Y=0;Y<E.length;Y++){t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,F.__webglColorRenderbuffer[Y]);let K=n.get(E[Y]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,F.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,K,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){let E=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=le,this.useMultisampledRTT=ne,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function G1(i,e){return{convert:function(t,n=hs){let r,s=It.getTransfer(n);if(t===Hi)return i.UNSIGNED_BYTE;if(t===Xh)return i.UNSIGNED_SHORT_4_4_4_4;if(t===qh)return i.UNSIGNED_SHORT_5_5_5_1;if(t===_f)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===vf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===mf)return i.BYTE;if(t===gf)return i.SHORT;if(t===to)return i.UNSIGNED_SHORT;if(t===Wh)return i.INT;if(t===Hr)return i.UNSIGNED_INT;if(t===Pi)return i.FLOAT;if(t===nr)return i.HALF_FLOAT;if(t===xf)return i.ALPHA;if(t===yf)return i.RGB;if(t===ir)return i.RGBA;if(t===os)return i.DEPTH_COMPONENT;if(t===ls)return i.DEPTH_STENCIL;if(t===no)return i.RED;if(t===jh)return i.RED_INTEGER;if(t===cs)return i.RG;if(t===Yh)return i.RG_INTEGER;if(t===$h)return i.RGBA_INTEGER;if(t===ec||t===tc||t===nc||t===ic)if(s===on){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===ec)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===tc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===nc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===ic)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===ec)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===tc)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===nc)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===ic)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Zh||t===Jh||t===Kh||t===Qh){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===Zh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Jh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Kh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Qh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===eu||t===tu||t===nu||t===iu||t===ru||t===rc||t===su){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===eu||t===tu)return s===on?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===nu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(t===iu)return r.COMPRESSED_R11_EAC;if(t===ru)return r.COMPRESSED_SIGNED_R11_EAC;if(t===rc)return r.COMPRESSED_RG11_EAC;if(t===su)return r.COMPRESSED_SIGNED_RG11_EAC}if(t===au||t===ou||t===lu||t===cu||t===hu||t===uu||t===du||t===pu||t===fu||t===mu||t===gu||t===_u||t===vu||t===xu){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===au)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===ou)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===lu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===cu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===hu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===uu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===du)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===pu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===fu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===mu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===gu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===_u)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===vu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===xu)return s===on?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===yu||t===Su||t===Mu){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===yu)return s===on?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Su)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Mu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===bu||t===Tu||t===sc||t===Eu){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===bu)return r.COMPRESSED_RED_RGTC1_EXT;if(t===Tu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===sc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Eu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Qs?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var H1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,W1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Qu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Oa(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Pn({vertexShader:H1,fragmentShader:W1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ti(new qs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ed=class extends Ji{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,p=null,d=null,u=null,m=null,f=typeof XRWebGLBinding<"u",v=new Qu,g={},_=t.getContextAttributes(),M=null,T=null,S=[],b=[],I=new _e,O=null,k=null,D=new ei;D.viewport=new an;let q=new ei;q.viewport=new an;let B=[D,q],ee=new ql,ae=null,re=null;function ie(de){let X=b.indexOf(de.inputSource);if(X===-1)return;let ne=S[X];ne!==void 0&&(ne.update(de.inputSource,de.frame,c||a),ne.dispatchEvent({type:de.type,data:de.inputSource}))}function N(){r.removeEventListener("select",ie),r.removeEventListener("selectstart",ie),r.removeEventListener("selectend",ie),r.removeEventListener("squeeze",ie),r.removeEventListener("squeezestart",ie),r.removeEventListener("squeezeend",ie),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",J);for(let de=0;de<S.length;de++){let X=b[de];X!==null&&(b[de]=null,S[de].disconnect(X))}ae=null,re=null,v.reset();for(let de in g)delete g[de];if(e.setRenderTarget(M),u=null,d=null,p=null,r=null,T=null,be.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(I.width,I.height,!1),k!==null){let de=k.camera;de.fov=k.fov,de.zoom=k.zoom,de.updateProjectionMatrix(),k=null}n.dispatchEvent({type:"sessionend"})}function J(de){for(let X=0;X<de.removed.length;X++){let ne=de.removed[X],he=b.indexOf(ne);he>=0&&(b[he]=null,S[he].disconnect(ne))}for(let X=0;X<de.added.length;X++){let ne=de.added[X],he=b.indexOf(ne);if(he===-1){for(let w=0;w<S.length;w++){if(w>=b.length){b.push(ne),he=w;break}if(b[w]===null){b[w]=ne,he=w;break}}if(he===-1)break}let oe=S[he];oe&&oe.connect(ne)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(de){let X=S[de];return X===void 0&&(X=new Vs,S[de]=X),X.getTargetRaySpace()},this.getControllerGrip=function(de){let X=S[de];return X===void 0&&(X=new Vs,S[de]=X),X.getGripSpace()},this.getHand=function(de){let X=S[de];return X===void 0&&(X=new Vs,S[de]=X),X.getHandSpace()},this.setFramebufferScaleFactor=function(de){s=de,n.isPresenting===!0&&et("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(de){o=de,n.isPresenting===!0&&et("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(de){c=de},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return p===null&&f&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(de){if(r=de,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",ie),r.addEventListener("selectstart",ie),r.addEventListener("selectend",ie),r.addEventListener("squeeze",ie),r.addEventListener("squeezestart",ie),r.addEventListener("squeezeend",ie),r.addEventListener("end",N),r.addEventListener("inputsourceschange",J),_.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(I),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let X=null,ne=null,he=null;_.depth&&(he=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,X=_.stencil?ls:os,ne=_.stencil?Qs:Hr);let oe={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};p=this.getBinding(),d=p.createProjectionLayer(oe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new pi(d.textureWidth,d.textureHeight,{format:ir,type:Hi,depthTexture:new kr(d.textureWidth,d.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let X={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,X),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),T=new pi(u.framebufferWidth,u.framebufferHeight,{format:ir,type:Hi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),be.setContext(r),be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let le=new P,Ne=new P;function ve(de,X){X===null?de.matrixWorld.copy(de.matrix):de.matrixWorld.multiplyMatrices(X.matrixWorld,de.matrix),de.matrixWorldInverse.copy(de.matrixWorld).invert()}this.updateCamera=function(de){if(r===null)return;let X=de.near,ne=de.far;v.texture!==null&&(v.depthNear>0&&(X=v.depthNear),v.depthFar>0&&(ne=v.depthFar)),ee.near=q.near=D.near=X,ee.far=q.far=D.far=ne,ae===ee.near&&re===ee.far||(r.updateRenderState({depthNear:ee.near,depthFar:ee.far}),ae=ee.near,re=ee.far),ee.layers.mask=6|de.layers.mask,D.layers.mask=-5&ee.layers.mask,q.layers.mask=-3&ee.layers.mask;let he=de.parent,oe=ee.cameras;ve(ee,he);for(let w=0;w<oe.length;w++)ve(oe[w],he);oe.length===2?(function(w,E,C){le.setFromMatrixPosition(E.matrixWorld),Ne.setFromMatrixPosition(C.matrixWorld);let U=le.distanceTo(Ne),y=E.projectionMatrix.elements,z=C.projectionMatrix.elements,F=y[14]/(y[10]-1),R=y[14]/(y[10]+1),j=(y[9]+1)/y[5],Y=(y[9]-1)/y[5],K=(y[8]-1)/y[0],ue=(z[8]+1)/z[0],Ee=F*K,Se=F*ue,fe=U/(-K+ue),Be=fe*-K;if(E.matrixWorld.decompose(w.position,w.quaternion,w.scale),w.translateX(Be),w.translateZ(fe),w.matrixWorld.compose(w.position,w.quaternion,w.scale),w.matrixWorldInverse.copy(w.matrixWorld).invert(),y[10]===-1)w.projectionMatrix.copy(E.projectionMatrix),w.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let ce=F+fe,me=R+fe,ge=Ee-Be,Ie=Se+(U-Be),Pt=j*R/me*ce,xt=Y*R/me*ce;w.projectionMatrix.makePerspective(ge,Ie,Pt,xt,ce,me),w.projectionMatrixInverse.copy(w.projectionMatrix).invert()}})(ee,D,q):ee.projectionMatrix.copy(D.projectionMatrix),k===null&&de.isPerspectiveCamera&&(k={camera:de,fov:de.fov,zoom:de.zoom}),(function(w,E,C){C===null?w.matrix.copy(E.matrixWorld):(w.matrix.copy(C.matrixWorld),w.matrix.invert(),w.matrix.multiply(E.matrixWorld)),w.matrix.decompose(w.position,w.quaternion,w.scale),w.updateMatrixWorld(!0),w.projectionMatrix.copy(E.projectionMatrix),w.projectionMatrixInverse.copy(E.projectionMatrixInverse),w.isPerspectiveCamera&&(w.fov=2*el*Math.atan(1/w.projectionMatrix.elements[5]),w.zoom=1)})(de,ee,he)},this.getCamera=function(){return ee},this.getFoveation=function(){if(d!==null||u!==null)return l},this.setFoveation=function(de){l=de,d!==null&&(d.fixedFoveation=de),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=de)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(ee)},this.getCameraTexture=function(de){return g[de]};let Oe=null,be=new lm;be.setAnimationLoop(function(de,X){if(h=X.getViewerPose(c||a),m=X,h!==null){let ne=h.views;u!==null&&(e.setRenderTargetFramebuffer(T,u.framebuffer),e.setRenderTarget(T));let he=!1;ne.length!==ee.cameras.length&&(ee.cameras.length=0,he=!0);for(let w=0;w<ne.length;w++){let E=ne[w],C=null;if(u!==null)C=u.getViewport(E);else{let y=p.getViewSubImage(d,E);C=y.viewport,w===0&&(e.setRenderTargetTextures(T,y.colorTexture,y.depthStencilTexture),e.setRenderTarget(T))}let U=B[w];U===void 0&&(U=new ei,U.layers.enable(w),U.viewport=new an,B[w]=U),U.matrix.fromArray(E.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(E.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(C.x,C.y,C.width,C.height),w===0&&(ee.matrix.copy(U.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale)),he===!0&&ee.cameras.push(U)}let oe=r.enabledFeatures;if(oe&&oe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&f){p=n.getBinding();let w=p.getDepthInformation(ne[0]);w&&w.isValid&&w.texture&&v.init(w,r.renderState)}if(oe&&oe.includes("camera-access")&&f){e.state.unbindTexture(),p=n.getBinding();for(let w=0;w<ne.length;w++){let E=ne[w].camera;if(E){let C=g[E];C||(C=new Oa,g[E]=C);let U=p.getCameraImage(E);C.sourceTexture=U}}}}for(let ne=0;ne<S.length;ne++){let he=b[ne],oe=S[ne];he!==null&&oe!==void 0&&oe.update(he,X,c||a)}Oe&&Oe(de,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),m=null}),this.setAnimationLoop=function(de){Oe=de},this.dispose=function(){}}},X1=new vt,fm=new pt;function q1(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===ni&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===ni&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(r.envMap.value=o,r.envMapRotation.value.setFromMatrix4(X1.makeRotationFromEuler(l)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply(fm),r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,Lu(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,l){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(r,s):s.isMeshLambertMaterial?(n(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(r,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(r,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(c,h,p){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ni&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.retroreflectivity>0&&(c.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=p.texture,c.transmissionSamplerSize.value.set(p.width,p.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(r,s,l)):s.isMeshMatcapMaterial?(n(r,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(c,h){let p=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(p.matrixWorld),c.nearDistance.value=p.shadow.camera.near,c.farDistance.value=p.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(c,h,p,d){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*p,c.scale.value=.5*d,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function j1(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(d,u,m,f){if((function(v,g,_,M){let T=v.value,S=g+"_"+_;if(M[S]===void 0)return typeof T=="number"||typeof T=="boolean"?M[S]=T:ArrayBuffer.isView(T)?M[S]=T.slice():M[S]=T.clone(),!0;{let b=M[S];if(typeof T=="number"||typeof T=="boolean"){if(b!==T)return M[S]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(b.equals(T)===!1)return b.copy(T),!0}}return!1})(d,u,m,f)===!0){let v=d.__offset,g=d.value;if(Array.isArray(g)){let _=0;for(let M=0;M<g.length;M++){let T=g[M],S=h(T);c(T,d.__data,_),typeof T=="number"||typeof T=="boolean"||T.isMatrix3||ArrayBuffer.isView(T)||(_+=S.storage/Float32Array.BYTES_PER_ELEMENT)}}else c(g,d.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,d.__data)}}function c(d,u,m){typeof d=="number"||typeof d=="boolean"?u[0]=d:d.isMatrix3?(u[0]=d.elements[0],u[1]=d.elements[1],u[2]=d.elements[2],u[3]=0,u[4]=d.elements[3],u[5]=d.elements[4],u[6]=d.elements[5],u[7]=0,u[8]=d.elements[6],u[9]=d.elements[7],u[10]=d.elements[8],u[11]=0):ArrayBuffer.isView(d)?u.set(new d.constructor(d.buffer,d.byteOffset,u.length)):d.toArray(u,m)}function h(d){let u={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(u.boundary=4,u.storage=4):d.isVector2?(u.boundary=8,u.storage=8):d.isVector3||d.isColor?(u.boundary=16,u.storage=12):d.isVector4?(u.boundary=16,u.storage=16):d.isMatrix3?(u.boundary=48,u.storage=48):d.isMatrix4?(u.boundary=64,u.storage=64):d.isTexture?et("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(d)?(u.boundary=16,u.storage=d.byteLength):et("WebGLRenderer: Unsupported uniform value type.",d),u}function p(d){let u=d.target;u.removeEventListener("dispose",p);let m=a.indexOf(u.__bindingPointIndex);a.splice(m,1),i.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}return{bind:function(d,u){let m=u.program;n.uniformBlockBinding(d,m)},update:function(d,u){let m=r[d.id];m===void 0&&((function(g){let _=g.uniforms,M=0,T=16;for(let b=0,I=_.length;b<I;b++){let O=Array.isArray(_[b])?_[b]:[_[b]];for(let k=0,D=O.length;k<D;k++){let q=O[k],B=Array.isArray(q.value)?q.value:[q.value];for(let ee=0,ae=B.length;ee<ae;ee++){let re=h(B[ee]),ie=M%T,N=ie%re.boundary,J=ie+N;M+=N,J!==0&&T-J<re.storage&&(M+=T-J),q.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=M,M+=re.storage}}}let S=M%T;S>0&&(M+=T-S),g.__size=M,g.__cache={}})(d),m=(function(g){let _=(function(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=_;let M=i.createBuffer(),T=g.__size,S=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,T,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,M),M})(d),r[d.id]=m,d.addEventListener("dispose",p));let f=u.program;n.updateUBOMapping(d,f);let v=e.render.frame;s[d.id]!==v&&((function(g){let _=r[g.id],M=g.uniforms,T=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let S=0,b=M.length;S<b;S++){let I=M[S];if(Array.isArray(I))for(let O=0,k=I.length;O<k;O++)l(I[O],S,O,T);else l(I,S,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)})(d),s[d.id]=v)},dispose:function(){for(let d in r)i.deleteBuffer(r[d]);a=[],r={},s={}}}}fm.set(-1,0,0,0,1,0,0,0,1);var Y1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),rr=null;function $1(){return rr===null&&(rr=new es(Y1,16,16,cs,nr),rr.name="DFG_LUT",rr.minFilter=ii,rr.magFilter=ii,rr.wrapS=Kl,rr.wrapT=Kl,rr.generateMipmaps=!1,rr.needsUpdate=!0),rr}var fc=class{constructor(e={}){let{canvas:t=Rf(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Hi}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let f=u,v=new Set([$h,Yh,jh]),g=new Set([Hi,Hr,to,Qs,Xh,qh]),_=new Uint32Array(4),M=new Int32Array(4),T=new P,S=null,b=null,I=[],O=[],k=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,q=!1,B=null,ee=null,ae=null,re=null;this._outputColorSpace=Au;let ie=0,N=0,J=null,le=-1,Ne=null,ve=new an,Oe=new an,be=null,de=new _t(0),X=0,ne=t.width,he=t.height,oe=1,w=null,E=null,C=new an(0,0,ne,he),U=new an(0,0,ne,he),y=!1,z=new Br,F=!1,R=!1,j=new vt,Y=new P,K=new an,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ee=!1;function Se(){return J===null?oe:1}let fe,Be,ce,me,ge,Ie,Pt,xt,Ft,ln,ze,at,ot,Yt,Ut,cn,rt,bn,ke,$t,Gt,zn,ci,W=n;function fi(A,H){return t.getContext(A,H)}try{let A={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Ht,!1),t.addEventListener("webglcontextrestored",dn,!1),t.addEventListener("webglcontextcreationerror",Ve,!1),W===null){let H="webgl2";if(W=fi(H,A),W===null)throw fi(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Hn()}catch(A){throw t.removeEventListener("webglcontextlost",Ht,!1),t.removeEventListener("webglcontextrestored",dn,!1),t.removeEventListener("webglcontextcreationerror",Ve,!1),it("WebGLRenderer: "+A.message),A}function Hn(){fe=new iy(W),fe.init(),Gt=new G1(W,fe),Be=new Zx(W,fe,e,Gt),ce=new k1(W,fe),Be.reversedDepthBuffer&&d&&ce.buffers.depth.setReversed(!0),ee=W.createFramebuffer(),ae=W.createFramebuffer(),re=W.createFramebuffer(),me=new ay(W),ge=new w1,Ie=new V1(W,fe,ce,ge,Be,Gt,me),Pt=new ny(D),xt=new u_(W),zn=new Yx(W,xt),Ft=new ry(W,xt,me,zn),ln=new ly(W,Ft,xt,zn,me),bn=new oy(W,Be,Ie),Ut=new Jx(ge),ze=new E1(D,Pt,fe,Be,zn,Ut),at=new q1(D,ge),ot=new R1,Yt=new D1(fe),rt=new jx(D,Pt,ce,ln,m,l),cn=new z1(D,ln,Be),ci=new j1(W,me,Be,ce),ke=new $x(W,fe,me),$t=new sy(W,fe,me),me.programs=ze.programs,D.capabilities=Be,D.extensions=fe,D.properties=ge,D.renderLists=ot,D.shadowMap=cn,D.state=ce,D.info=me}f!==Hi&&(k=new hy(f,t.width,t.height,o,r,s));let ut=new ed(D,W);function Ht(A){A.preventDefault(),wa("WebGLRenderer: Context Lost."),q=!0}function dn(){wa("WebGLRenderer: Context Restored."),q=!1;let A=me.autoReset,H=cn.enabled,Z=cn.autoUpdate,te=cn.needsUpdate,Q=cn.type;Hn(),me.autoReset=A,cn.enabled=H,cn.autoUpdate=Z,cn.needsUpdate=te,cn.type=Q}function Ve(A){it("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Sr(A){let H=A.target;H.removeEventListener("dispose",Sr),(function(Z){(function(te){let Q=ge.get(te).programs;Q!==void 0&&(Q.forEach(function(pe){ze.releaseProgram(pe)}),te.isShaderMaterial&&ze.releaseShaderCache(te))})(Z),ge.remove(Z)})(H)}function jn(A,H,Z,te){B!==null&&A.isNodeMaterial&&B.setObject(te,A),F===!0&&Ut.setState(A,Z,!1),A.transparent===!0&&A.side===er&&A.forceSinglePass===!1?(A.side=ni,A.needsUpdate=!0,Ot(A,H,te),A.side=Zs,A.needsUpdate=!0,Ot(A,H,te),A.side=er):Ot(A,H,te)}this.xr=ut,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let A=fe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=fe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(A){A!==void 0&&(oe=A,this.setSize(ne,he,!1))},this.getSize=function(A){return A.set(ne,he)},this.setSize=function(A,H,Z=!0){ut.isPresenting?et("WebGLRenderer: Can't change size while VR device is presenting."):(ne=A,he=H,t.width=Math.floor(A*oe),t.height=Math.floor(H*oe),Z===!0&&(t.style.width=A+"px",t.style.height=H+"px"),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,A,H))},this.getDrawingBufferSize=function(A){return A.set(ne*oe,he*oe).floor()},this.setDrawingBufferSize=function(A,H,Z){ne=A,he=H,oe=Z,t.width=Math.floor(A*Z),t.height=Math.floor(H*Z),this.setViewport(0,0,A,H)},this.setEffects=function(A){if(f!==Hi){if(A){for(let H=0;H<A.length;H++)if(A[H].isOutputPass===!0){et("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}k.setEffects(A||[])}else it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(A){return A.copy(ve)},this.getViewport=function(A){return A.copy(C)},this.setViewport=function(A,H,Z,te){A.isVector4?C.set(A.x,A.y,A.z,A.w):C.set(A,H,Z,te),ce.viewport(ve.copy(C).multiplyScalar(oe).round())},this.getScissor=function(A){return A.copy(U)},this.setScissor=function(A,H,Z,te){A.isVector4?U.set(A.x,A.y,A.z,A.w):U.set(A,H,Z,te),ce.scissor(Oe.copy(U).multiplyScalar(oe).round())},this.getScissorTest=function(){return y},this.setScissorTest=function(A){ce.setScissorTest(y=A)},this.setOpaqueSort=function(A){w=A},this.setTransparentSort=function(A){E=A},this.getClearColor=function(A){return A.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor(...arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha(...arguments)},this.clear=function(A=!0,H=!0,Z=!0){let te=0;if(A){let Q=!1;if(J!==null){let pe=J.texture.format;Q=v.has(pe)}if(Q){let pe=J.texture.type,Me=g.has(pe),we=rt.getClearColor(),Pe=rt.getClearAlpha(),Ye=we.r,Ke=we.g,tt=we.b;Me?(_[0]=Ye,_[1]=Ke,_[2]=tt,_[3]=Pe,W.clearBufferuiv(W.COLOR,0,_)):(M[0]=Ye,M[1]=Ke,M[2]=tt,M[3]=Pe,W.clearBufferiv(W.COLOR,0,M))}else te|=W.COLOR_BUFFER_BIT}H&&(te|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(te|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),te!==0&&W.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),B=A},this.dispose=function(){t.removeEventListener("webglcontextlost",Ht,!1),t.removeEventListener("webglcontextrestored",dn,!1),t.removeEventListener("webglcontextcreationerror",Ve,!1),rt.dispose(),ot.dispose(),Yt.dispose(),ge.dispose(),Pt.dispose(),ln.dispose(),zn.dispose(),ci.dispose(),ze.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",Mr),ut.removeEventListener("sessionend",Xi),hi.stop()},this.renderBufferDirect=function(A,H,Z,te,Q,pe){H===null&&(H=ue);let Me=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,we=(function(gt,Bt,tn,$e,qe){Bt.isScene!==!0&&(Bt=ue),Ie.resetTextureUnits();let Rn=Bt.fog,Tr=$e.isMeshStandardMaterial||$e.isMeshLambertMaterial||$e.isMeshPhongMaterial?Bt.environment:null,V=J===null?D.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:It.workingColorSpace,se=$e.isMeshStandardMaterial||$e.isMeshLambertMaterial&&!$e.envMap||$e.isMeshPhongMaterial&&!$e.envMap,xe=Pt.get($e.envMap||Tr,se),Ze=$e.vertexColors===!0&&!!tn.attributes.color&&tn.attributes.color.itemSize===4,Qe=!!tn.attributes.tangent&&(!!$e.normalMap||$e.anisotropy>0),Fe=!!tn.morphAttributes.position,je=!!tn.morphAttributes.normal,Zt=!!tn.morphAttributes.color,kt=Vi;$e.toneMapped&&(J!==null&&J.isXRRenderTarget!==!0||(kt=D.toneMapping));let lt=tn.morphAttributes.position||tn.morphAttributes.normal||tn.morphAttributes.color,_n=lt!==void 0?lt.length:0,Ce=ge.get($e),Lt=b.state.lights;if(F===!0&&(R===!0||gt!==Ne)){let rn=gt===Ne&&$e.id===le;Ut.setState($e,gt,rn)}let Tt=!1;$e.version===Ce.__version?Ce.needsLights&&Ce.lightsStateVersion!==Lt.state.version||Ce.outputColorSpace!==V||qe.isBatchedMesh&&Ce.batching===!1?Tt=!0:qe.isBatchedMesh||Ce.batching!==!0?qe.isBatchedMesh&&Ce.batchingColor===!0&&qe._colorsTexture===null||qe.isBatchedMesh&&Ce.batchingColor===!1&&qe._colorsTexture!==null||qe.isInstancedMesh&&Ce.instancing===!1?Tt=!0:qe.isInstancedMesh||Ce.instancing!==!0?qe.isSkinnedMesh&&Ce.skinning===!1?Tt=!0:qe.isSkinnedMesh||Ce.skinning!==!0?qe.isInstancedMesh&&Ce.instancingColor===!0&&qe.instanceColor===null||qe.isInstancedMesh&&Ce.instancingColor===!1&&qe.instanceColor!==null||qe.isInstancedMesh&&Ce.instancingMorph===!0&&qe.morphTexture===null||qe.isInstancedMesh&&Ce.instancingMorph===!1&&qe.morphTexture!==null||Ce.envMap!==xe||$e.fog===!0&&Ce.fog!==Rn?Tt=!0:Ce.numClippingPlanes===void 0||Ce.numClippingPlanes===Ut.numPlanes&&Ce.numIntersection===Ut.numIntersection?(Ce.vertexAlphas!==Ze||Ce.vertexTangents!==Qe||Ce.morphTargets!==Fe||Ce.morphNormals!==je||Ce.morphColors!==Zt||Ce.toneMapping!==kt||Ce.morphTargetsCount!==_n||!!Ce.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Tt=!0):Tt=!0:Tt=!0:Tt=!0:Tt=!0:(Tt=!0,Ce.__version=$e.version);let vn=Ce.currentProgram;Tt===!0&&(vn=Ot($e,Bt,qe),B&&$e.isNodeMaterial&&B.onUpdateProgram($e,vn,Ce));let mi=!1,Xt=!1,Cn=!1,Et=vn.getUniforms(),Mn=Ce.uniforms;if(ce.useProgram(vn.program)&&(mi=!0,Xt=!0,Cn=!0),$e.id!==le&&(le=$e.id,Xt=!0),Ce.needsLights){let rn=(function(kn,ui){if(kn.length===0)return null;if(kn.length===1)return kn[0].texture!==null?kn[0]:null;T.setFromMatrixPosition(ui.matrixWorld);for(let un=0,gi=kn.length;un<gi;un++){let or=kn[un];if(or.texture!==null&&or.boundingBox.containsPoint(T))return or}return null})(b.state.lightProbeGridArray,qe);Ce.lightProbeGrid!==rn&&(Ce.lightProbeGrid=rn,Xt=!0)}if(mi||Ne!==gt){ce.buffers.depth.getReversed()&&gt.reversedDepth!==!0&&(gt._reversedDepth=!0,gt.updateProjectionMatrix()),Et.setValue(W,"projectionMatrix",gt.projectionMatrix),Et.setValue(W,"viewMatrix",gt.matrixWorldInverse);let rn=Et.map.cameraPosition;rn!==void 0&&rn.setValue(W,Y.setFromMatrixPosition(gt.matrixWorld)),Be.logarithmicDepthBuffer&&Et.setValue(W,"logDepthBufFC",2/(Math.log(gt.far+1)/Math.LN2)),($e.isMeshPhongMaterial||$e.isMeshToonMaterial||$e.isMeshLambertMaterial||$e.isMeshBasicMaterial||$e.isMeshStandardMaterial||$e.isShaderMaterial)&&Et.setValue(W,"isOrthographic",gt.isOrthographicCamera===!0),Ne!==gt&&(Ne=gt,Xt=!0,Cn=!0)}if(Ce.needsLights&&(Lt.state.sunShadowMap.length>0&&Et.setValue(W,"sunShadowMap",Lt.state.sunShadowMap,Ie),Lt.state.directionalShadowMap.length>0&&Et.setValue(W,"directionalShadowMap",Lt.state.directionalShadowMap,Ie),Lt.state.spotShadowMap.length>0&&Et.setValue(W,"spotShadowMap",Lt.state.spotShadowMap,Ie),Lt.state.pointShadowMap.length>0&&Et.setValue(W,"pointShadowMap",Lt.state.pointShadowMap,Ie)),qe.isSkinnedMesh){Et.setOptional(W,qe,"bindMatrix"),Et.setOptional(W,qe,"bindMatrixInverse");let rn=qe.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),Et.setValue(W,"boneTexture",rn.boneTexture,Ie))}qe.isBatchedMesh&&(Et.setOptional(W,qe,"batchingTexture"),Et.setValue(W,"batchingTexture",qe._matricesTexture,Ie),Et.setOptional(W,qe,"batchingIdTexture"),Et.setValue(W,"batchingIdTexture",qe._indirectTexture,Ie),Et.setOptional(W,qe,"batchingColorTexture"),qe._colorsTexture!==null&&Et.setValue(W,"batchingColorTexture",qe._colorsTexture,Ie));let Nn=tn.morphAttributes;if(Nn.position===void 0&&Nn.normal===void 0&&Nn.color===void 0||bn.update(qe,tn,vn),(Xt||Ce.receiveShadow!==qe.receiveShadow)&&(Ce.receiveShadow=qe.receiveShadow,Et.setValue(W,"receiveShadow",qe.receiveShadow)),($e.isMeshStandardMaterial||$e.isMeshLambertMaterial||$e.isMeshPhongMaterial)&&$e.envMap===null&&Bt.environment!==null&&(Mn.envMapIntensity.value=Bt.environmentIntensity),Mn.dfgLUT!==void 0&&(Mn.dfgLUT.value=$1()),Xt){if(Et.setValue(W,"toneMappingExposure",D.toneMappingExposure),Ce.needsLights&&(xn=Cn,(nn=Mn).ambientLightColor.needsUpdate=xn,nn.lightProbe.needsUpdate=xn,nn.sunLights.needsUpdate=xn,nn.sunLightShadows.needsUpdate=xn,nn.directionalLights.needsUpdate=xn,nn.directionalLightShadows.needsUpdate=xn,nn.pointLights.needsUpdate=xn,nn.pointLightShadows.needsUpdate=xn,nn.spotLights.needsUpdate=xn,nn.spotLightShadows.needsUpdate=xn,nn.rectAreaLights.needsUpdate=xn,nn.hemisphereLights.needsUpdate=xn),Rn&&$e.fog===!0&&at.refreshFogUniforms(Mn,Rn),at.refreshMaterialUniforms(Mn,$e,oe,he,b.state.transmissionRenderTarget[gt.id]),Ce.needsLights&&Ce.lightProbeGrid){let rn=Ce.lightProbeGrid;Mn.probesSH.value=rn.texture,Mn.probesMin.value.copy(rn.boundingBox.min),Mn.probesMax.value.copy(rn.boundingBox.max),Mn.probesResolution.value.copy(rn.resolution)}ta.upload(W,qi(Ce),Mn,Ie)}var nn,xn;if($e.isShaderMaterial&&$e.uniformsNeedUpdate===!0&&(ta.upload(W,qi(Ce),Mn,Ie),$e.uniformsNeedUpdate=!1),$e.isSpriteMaterial&&Et.setValue(W,"center",qe.center),Et.setValue(W,"modelViewMatrix",qe.modelViewMatrix),Et.setValue(W,"normalMatrix",qe.normalMatrix),Et.setValue(W,"modelMatrix",qe.matrixWorld),$e.uniformsGroups!==void 0){let rn=$e.uniformsGroups;for(let kn=0,ui=rn.length;kn<ui;kn++){let un=rn[kn];ci.update(un,vn),ci.bind(un,vn)}}return vn})(A,H,Z,te,Q);ce.setMaterial(te,Me);let Pe=Z.index,Ye=1;if(te.wireframe===!0){if(Pe=Ft.getWireframeAttribute(Z),Pe===void 0)return;Ye=2}let Ke=Z.drawRange,tt=Z.attributes.position,Le=Ke.start*Ye,dt=(Ke.start+Ke.count)*Ye;pe!==null&&(Le=Math.max(Le,pe.start*Ye),dt=Math.min(dt,(pe.start+pe.count)*Ye)),Pe!==null?(Le=Math.max(Le,0),dt=Math.min(dt,Pe.count)):tt!=null&&(Le=Math.max(Le,0),dt=Math.min(dt,tt.count));let pn=dt-Le;if(pn<0||pn===1/0)return;let zt;zn.setup(Q,te,we,Z,Pe);let Wt=ke;if(Pe!==null&&(zt=xt.get(Pe),Wt=$t,Wt.setIndex(zt)),Q.isMesh)te.wireframe===!0?(ce.setLineWidth(te.wireframeLinewidth*Se()),Wt.setMode(W.LINES)):Wt.setMode(W.TRIANGLES);else if(Q.isLine){let gt=te.linewidth;gt===void 0&&(gt=1),ce.setLineWidth(gt*Se()),Q.isLineSegments?Wt.setMode(W.LINES):Q.isLineLoop?Wt.setMode(W.LINE_LOOP):Wt.setMode(W.LINE_STRIP)}else Q.isPoints?Wt.setMode(W.POINTS):Q.isSprite&&Wt.setMode(W.TRIANGLES);if(Q.isBatchedMesh)if(fe.get("WEBGL_multi_draw"))Wt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{let gt=Q._multiDrawStarts,Bt=Q._multiDrawCounts,tn=Q._multiDrawCount,$e=Pe?xt.get(Pe).bytesPerElement:1,qe=ge.get(te).currentProgram.getUniforms();for(let Rn=0;Rn<tn;Rn++)qe.setValue(W,"_gl_DrawID",Rn),Wt.render(gt[Rn]/$e,Bt[Rn])}else if(Q.isInstancedMesh)Wt.renderInstances(Le,pn,Q.count);else if(Z.isInstancedBufferGeometry){let gt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Bt=Math.min(Z.instanceCount,gt);Wt.renderInstances(Le,pn,Bt)}else Wt.render(Le,pn)},this.compile=function(A,H,Z=null){Z===null&&(Z=A),B!==null&&B.renderStart(A,H,Z),b=Yt.get(Z),b.init(H),O.push(b),Z.traverseVisible(function(Q){Q.isLight&&Q.layers.test(H.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),A!==Z&&A.traverseVisible(function(Q){Q.isLight&&Q.layers.test(H.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),b.setupLights(),B!==null&&B.updateLights(b.state.lightsArray),R=this.localClippingEnabled,F=Ut.init(this.clippingPlanes,R),F===!0&&Ut.setGlobalState(this.clippingPlanes,H),B!==null&&cn.render(b.state.shadowsArray,Z,H);let te=new Set;return A.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;let pe=Q.material;if(pe)if(Array.isArray(pe))for(let Me=0;Me<pe.length;Me++){let we=pe[Me];jn(we,Z,H,Q),te.add(we)}else jn(pe,Z,H,Q),te.add(pe)}),b=O.pop(),B!==null&&B.renderEnd(),te},this.compileAsync=function(A,H,Z=null){let te=this.compile(A,H,Z);return new Promise(Q=>{function pe(){te.forEach(function(Me){let we=ge.get(Me).currentProgram;(we===void 0||we.isReady())&&te.delete(Me)}),te.size!==0?setTimeout(pe,10):Q(A)}fe.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Yn=null;function Mr(){hi.stop()}function Xi(){hi.start()}let hi=new lm;function wn(A,H,Z,te){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)Z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLightProbeGrid)b.pushLightProbeGrid(A);else if(A.isLight)b.pushLight(A),A.castShadow&&b.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(z)){te&&K.setFromMatrixPosition(A.matrixWorld).applyMatrix4(j);let pe=ln.update(A),Me=A.material;Me.visible&&S.push(A,pe,Me,Z,K.z,null,H)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(z))){let pe=ln.update(A),Me=A.material;if(te&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),K.copy(A.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),K.copy(pe.boundingSphere.center)),K.applyMatrix4(A.matrixWorld).applyMatrix4(j)),Array.isArray(Me)){let we=pe.groups;for(let Pe=0,Ye=we.length;Pe<Ye;Pe++){let Ke=we[Pe],tt=Me[Ke.materialIndex];tt&&tt.visible&&S.push(A,pe,tt,Z,K.z,Ke,H)}}else Me.visible&&S.push(A,pe,Me,Z,K.z,null,H)}}let Q=A.children;for(let pe=0,Me=Q.length;pe<Me;pe++)wn(Q[pe],H,Z,te)}function An(A,H,Z,te){let{opaque:Q,transmissive:pe,transparent:Me}=A;b.setupLightsView(Z),F===!0&&Ut.setGlobalState(D.clippingPlanes,Z),te&&ce.viewport(ve.copy(te)),Q.length>0&&gn(Q,H,Z),pe.length>0&&gn(pe,H,Z),Me.length>0&&gn(Me,H,Z),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function br(A,H,Z,te){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[te.id]===void 0){let tt=fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[te.id]=new pi(1,1,{generateMipmaps:!0,type:tt?nr:Hi,minFilter:as,samples:Math.max(4,Be.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:It.workingColorSpace})}let Q=b.state.transmissionRenderTarget[te.id],pe=te.viewport||ve;Q.setSize(pe.z*D.transmissionResolutionScale,pe.w*D.transmissionResolutionScale);let Me=D.getRenderTarget(),we=D.getActiveCubeFace(),Pe=D.getActiveMipmapLevel();D.setRenderTarget(Q),D.getClearColor(de),X=D.getClearAlpha(),X<1&&D.setClearColor(16777215,.5),D.clear(),Ee&&rt.render(Z);let Ye=D.toneMapping;D.toneMapping=Vi;let Ke=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),b.setupLightsView(te),F===!0&&Ut.setGlobalState(D.clippingPlanes,te),gn(A,Z,te),Ie.updateMultisampleRenderTarget(Q),Ie.updateRenderTargetMipmap(Q),fe.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let Le=0,dt=H.length;Le<dt;Le++){let pn=H[Le],{object:zt,geometry:Wt,material:gt,group:Bt}=pn;if(gt.side===er&&zt.layers.test(te.layers)){let tn=gt.side;gt.side=ni,gt.needsUpdate=!0,ft(zt,Z,te,Wt,gt,Bt),gt.side=tn,gt.needsUpdate=!0,tt=!0}}tt===!0&&(Ie.updateMultisampleRenderTarget(Q),Ie.updateRenderTargetMipmap(Q))}D.setRenderTarget(Me,we,Pe),D.setClearColor(de,X),Ke!==void 0&&(te.viewport=Ke),D.toneMapping=Ye}function gn(A,H,Z){let te=H.isScene===!0?H.overrideMaterial:null;for(let Q=0,pe=A.length;Q<pe;Q++){let Me=A[Q],{object:we,geometry:Pe,group:Ye}=Me,Ke=Me.material;Ke.allowOverride===!0&&te!==null&&(Ke=te),we.layers.test(Z.layers)&&ft(we,H,Z,Pe,Ke,Ye)}}function ft(A,H,Z,te,Q,pe){B!==null&&Q.isNodeMaterial&&B.setObject(A,Q),A.onBeforeRender(D,H,Z,te,Q,pe),A.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Q.onBeforeRender(D,H,Z,te,A,pe),Q.transparent===!0&&Q.side===er&&Q.forceSinglePass===!1?(Q.side=ni,Q.needsUpdate=!0,D.renderBufferDirect(Z,H,te,Q,A,pe),Q.side=Zs,Q.needsUpdate=!0,D.renderBufferDirect(Z,H,te,Q,A,pe),Q.side=er):D.renderBufferDirect(Z,H,te,Q,A,pe),A.onAfterRender(D,H,Z,te,Q,pe)}function Ot(A,H,Z){H.isScene!==!0&&(H=ue);let te=ge.get(A),Q=b.state.lights,pe=b.state.shadowsArray,Me=Q.state.version,we=ze.getParameters(A,Q.state,pe,H,Z,b.state.lightProbeGridArray),Pe=ze.getProgramCacheKey(we),Ye=te.programs;te.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?H.environment:null,te.fog=H.fog;let Ke=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;te.envMap=Pt.get(A.envMap||te.environment,Ke),te.envMapRotation=te.environment!==null&&A.envMap===null?H.environmentRotation:A.envMapRotation,Ye===void 0&&(A.addEventListener("dispose",Sr),Ye=new Map,te.programs=Ye);let tt=Ye.get(Pe);if(tt!==void 0){if(te.currentProgram===tt&&te.lightsStateVersion===Me)return De(A,we),tt}else we.uniforms=ze.getUniforms(A),B!==null&&A.isNodeMaterial&&B.build(A,Z,we),A.onBeforeCompile(we,D),tt=ze.acquireProgram(we,Pe),Ye.set(Pe,tt),te.uniforms=we.uniforms;let Le=te.uniforms;return(A.isShaderMaterial||A.isRawShaderMaterial)&&A.clipping!==!0||(Le.clippingPlanes=Ut.uniform),De(A,we),te.needsLights=(function(dt){return dt.isMeshLambertMaterial||dt.isMeshToonMaterial||dt.isMeshPhongMaterial||dt.isMeshStandardMaterial||dt.isShadowMaterial||dt.isShaderMaterial&&dt.lights===!0})(A),te.lightsStateVersion=Me,te.needsLights&&(Le.ambientLightColor.value=Q.state.ambient,Le.lightProbe.value=Q.state.probe,Le.sunLights.value=Q.state.sun,Le.sunLightShadows.value=Q.state.sunShadow,Le.directionalLights.value=Q.state.directional,Le.directionalLightShadows.value=Q.state.directionalShadow,Le.spotLights.value=Q.state.spot,Le.spotLightShadows.value=Q.state.spotShadow,Le.rectAreaLights.value=Q.state.rectArea,Le.ltc_1.value=Q.state.rectAreaLTC1,Le.ltc_2.value=Q.state.rectAreaLTC2,Le.pointLights.value=Q.state.point,Le.pointLightShadows.value=Q.state.pointShadow,Le.hemisphereLights.value=Q.state.hemi,Le.sunShadowMatrix.value=Q.state.sunShadowMatrix,Le.sunShadowCascade.value=Q.state.sunShadowCascade,Le.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Le.spotLightMatrix.value=Q.state.spotLightMatrix,Le.spotLightMap.value=Q.state.spotLightMap,Le.pointShadowMatrix.value=Q.state.pointShadowMatrix),te.lightProbeGrid=b.state.lightProbeGridArray.length>0,te.currentProgram=tt,te.uniformsList=null,tt}function qi(A){if(A.uniformsList===null){let H=A.currentProgram.getUniforms();A.uniformsList=ta.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function De(A,H){let Z=ge.get(A);Z.outputColorSpace=H.outputColorSpace,Z.batching=H.batching,Z.batchingColor=H.batchingColor,Z.instancing=H.instancing,Z.instancingColor=H.instancingColor,Z.instancingMorph=H.instancingMorph,Z.skinning=H.skinning,Z.morphTargets=H.morphTargets,Z.morphNormals=H.morphNormals,Z.morphColors=H.morphColors,Z.morphTargetsCount=H.morphTargetsCount,Z.numClippingPlanes=H.numClippingPlanes,Z.numIntersection=H.numClipIntersection,Z.vertexAlphas=H.vertexAlphas,Z.vertexTangents=H.vertexTangents,Z.toneMapping=H.toneMapping}function hn(A){let H=ge.get(A);return H.__readFormat===A.format&&H.__readType===A.type||(H.__readFormat=A.format,H.__readType=A.type,H.__formatReadable=Be.textureFormatReadable(A.format),H.__typeReadable=Be.textureTypeReadable(A.type)),H}hi.setAnimationLoop(function(A){Yn&&Yn(A)}),typeof self<"u"&&hi.setContext(self),this.setAnimationLoop=function(A){Yn=A,ut.setAnimationLoop(A),A===null?hi.stop():hi.start()},ut.addEventListener("sessionstart",Mr),ut.addEventListener("sessionend",Xi),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0)return void it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(q===!0)return;B!==null&&B.renderStart(A,H);let Z=ut.enabled===!0&&ut.isPresenting===!0,te=k!==null&&(J===null||Z)&&k.begin(D,J);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ut.enabled!==!0||ut.isPresenting!==!0||k!==null&&k.isCompositing()!==!1||(ut.cameraAutoUpdate===!0&&ut.updateCamera(H),H=ut.getCamera()),A.isScene===!0&&A.onBeforeRender(D,A,H,J),b=Yt.get(A,O.length),b.init(H),b.state.textureUnits=Ie.getTextureUnits(),O.push(b),j.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),z.setFromProjectionMatrix(j,Iu,H.reversedDepth),R=this.localClippingEnabled,F=Ut.init(this.clippingPlanes,R),S=ot.get(A,I.length),S.init(),I.push(S),ut.enabled===!0&&ut.isPresenting===!0){let pe=D.xr.getDepthSensingMesh();pe!==null&&wn(pe,H,-1/0,D.sortObjects)}wn(A,H,0,D.sortObjects),S.finish(),B!==null&&B.updateLights(b.state.lightsArray),D.sortObjects===!0&&S.sort(w,E),Ee=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,Ee&&rt.addToRenderList(S,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),F===!0&&Ut.beginShadows();let Q=b.state.shadowsArray;if(cn.render(Q,A,H),F===!0&&Ut.endShadows(),(te&&k.hasRenderPass())===!1){let pe=S.opaque,Me=S.transmissive;if(b.setupLights(),H.isArrayCamera){let we=H.cameras;if(Me.length>0)for(let Pe=0,Ye=we.length;Pe<Ye;Pe++)br(pe,Me,A,we[Pe]);Ee&&rt.render(A);for(let Pe=0,Ye=we.length;Pe<Ye;Pe++){let Ke=we[Pe];An(S,A,Ke,Ke.viewport)}}else Me.length>0&&br(pe,Me,A,H),Ee&&rt.render(A),An(S,A,H)}J!==null&&N===0&&(Ie.updateMultisampleRenderTarget(J),Ie.updateRenderTargetMipmap(J)),te&&k.end(D),A.isScene===!0&&A.onAfterRender(D,A,H),zn.resetDefaultState(),le=-1,Ne=null,O.pop(),O.length>0?(b=O[O.length-1],Ie.setTextureUnits(b.state.textureUnits),F===!0&&Ut.setGlobalState(D.clippingPlanes,b.state.camera)):b=null,I.pop(),S=I.length>0?I[I.length-1]:null,B!==null&&B.renderEnd()},this.getActiveCubeFace=function(){return ie},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(A,H,Z){let te=ge.get(A);te.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),ge.get(A.texture).__webglTexture=H,ge.get(A.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:Z,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,H){let Z=ge.get(A);Z.__webglFramebuffer=H,Z.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(A,H=0,Z=0){J=A,ie=H,N=Z;let te=null,Q=!1,pe=!1;if(A){let Me=ge.get(A);if(Me.__useDefaultFramebuffer!==void 0)return ce.bindFramebuffer(W.FRAMEBUFFER,Me.__webglFramebuffer),ve.copy(A.viewport),Oe.copy(A.scissor),be=A.scissorTest,ce.viewport(ve),ce.scissor(Oe),ce.setScissorTest(be),void(le=-1);if(Me.__webglFramebuffer===void 0)Ie.setupRenderTarget(A);else if(Me.__hasExternalTextures)Ie.rebindTextures(A,ge.get(A.texture).__webglTexture,ge.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ye=A.depthTexture;if(Me.__boundDepthTexture!==Ye){if(Ye!==null&&ge.has(Ye)&&(A.width!==Ye.image.width||A.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(A)}}let we=A.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(pe=!0);let Pe=ge.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(te=Array.isArray(Pe[H])?Pe[H][Z]:Pe[H],Q=!0):te=A.samples>0&&Ie.useMultisampledRTT(A)===!1?ge.get(A).__webglMultisampledFramebuffer:Array.isArray(Pe)?Pe[Z]:Pe,ve.copy(A.viewport),Oe.copy(A.scissor),be=A.scissorTest}else ve.copy(C).multiplyScalar(oe).floor(),Oe.copy(U).multiplyScalar(oe).floor(),be=y;if(Z!==0&&(te=ee),ce.bindFramebuffer(W.FRAMEBUFFER,te)&&ce.drawBuffers(A,te),ce.viewport(ve),ce.scissor(Oe),ce.setScissorTest(be),Q){let Me=ge.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+H,Me.__webglTexture,Z)}else if(pe){let Me=H;for(let we=0;we<A.textures.length;we++){let Pe=ge.get(A.textures[we]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+we,Pe.__webglTexture,Z,Me)}}else if(A!==null&&Z!==0){let Me=ge.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Me.__webglTexture,Z)}le=-1},this.readRenderTargetPixels=function(A,H,Z,te,Q,pe,Me,we=0){if(!A||!A.isWebGLRenderTarget)return void it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Me!==void 0&&(Pe=Pe[Me]),Pe){ce.bindFramebuffer(W.FRAMEBUFFER,Pe);try{let Ye=A.textures[we],Ke=Ye.format,tt=Ye.type;A.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+we);let Le=hn(Ye);if(Le.__formatReadable===!1)return void it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(Le.__typeReadable===!1)return void it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");H>=0&&H<=A.width-te&&Z>=0&&Z<=A.height-Q&&W.readPixels(H,Z,te,Q,Gt.convert(Ke),Gt.convert(tt),pe)}finally{let Ye=J!==null?ge.get(J).__webglFramebuffer:null;ce.bindFramebuffer(W.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(A,H,Z,te,Q,pe,Me,we=0){if(!A||!A.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Me!==void 0&&(Pe=Pe[Me]),Pe){if(H>=0&&H<=A.width-te&&Z>=0&&Z<=A.height-Q){ce.bindFramebuffer(W.FRAMEBUFFER,Pe);let Ye=A.textures[we],Ke=Ye.format,tt=Ye.type;A.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+we);let Le=hn(Ye);if(Le.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Le.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let dt=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,dt),W.bufferData(W.PIXEL_PACK_BUFFER,pe.byteLength,W.STREAM_READ),W.readPixels(H,Z,te,Q,Gt.convert(Ke),Gt.convert(tt),0),W.bindBuffer(W.PIXEL_PACK_BUFFER,null);let pn=J!==null?ge.get(J).__webglFramebuffer:null;ce.bindFramebuffer(W.FRAMEBUFFER,pn);let zt=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await If(W,zt,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,dt),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,pe),W.bindBuffer(W.PIXEL_PACK_BUFFER,null),W.deleteBuffer(dt),W.deleteSync(zt),pe}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,H=null,Z=0){let te=Math.pow(2,-Z),Q=Math.floor(A.image.width*te),pe=Math.floor(A.image.height*te),Me=H!==null?H.x:0,we=H!==null?H.y:0;Ie.setTexture2D(A,0),W.copyTexSubImage2D(W.TEXTURE_2D,Z,0,0,Me,we,Q,pe),ce.unbindTexture()},this.copyTextureToTexture=function(A,H,Z=null,te=null,Q=0,pe=0){let Me,we,Pe,Ye,Ke,tt,Le,dt,pn,zt=A.isCompressedTexture?A.mipmaps[pe]:A.image;if(Z!==null)Me=Z.max.x-Z.min.x,we=Z.max.y-Z.min.y,Pe=Z.isBox3?Z.max.z-Z.min.z:1,Ye=Z.min.x,Ke=Z.min.y,tt=Z.isBox3?Z.min.z:0;else{let xe=Math.pow(2,-Q);Me=Math.floor(zt.width*xe),we=Math.floor(zt.height*xe),Pe=A.isDataArrayTexture?zt.depth:A.isData3DTexture?Math.floor(zt.depth*xe):1,Ye=0,Ke=0,tt=0}te!==null?(Le=te.x,dt=te.y,pn=te.z):(Le=0,dt=0,pn=0);let Wt=Gt.convert(H.format),gt=Gt.convert(H.type),Bt;H.isData3DTexture?(Ie.setTexture3D(H,0),Bt=W.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(Ie.setTexture2DArray(H,0),Bt=W.TEXTURE_2D_ARRAY):(Ie.setTexture2D(H,0),Bt=W.TEXTURE_2D),ce.activeTexture(W.TEXTURE0),ce.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,H.flipY),ce.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),ce.pixelStorei(W.UNPACK_ALIGNMENT,H.unpackAlignment);let tn=ce.getParameter(W.UNPACK_ROW_LENGTH),$e=ce.getParameter(W.UNPACK_IMAGE_HEIGHT),qe=ce.getParameter(W.UNPACK_SKIP_PIXELS),Rn=ce.getParameter(W.UNPACK_SKIP_ROWS),Tr=ce.getParameter(W.UNPACK_SKIP_IMAGES);ce.pixelStorei(W.UNPACK_ROW_LENGTH,zt.width),ce.pixelStorei(W.UNPACK_IMAGE_HEIGHT,zt.height),ce.pixelStorei(W.UNPACK_SKIP_PIXELS,Ye),ce.pixelStorei(W.UNPACK_SKIP_ROWS,Ke),ce.pixelStorei(W.UNPACK_SKIP_IMAGES,tt);let V=A.isDataArrayTexture||A.isData3DTexture,se=H.isDataArrayTexture||H.isData3DTexture;if(A.isDepthTexture){let xe=ge.get(A),Ze=ge.get(H),Qe=ge.get(xe.__renderTarget),Fe=ge.get(Ze.__renderTarget);ce.bindFramebuffer(W.READ_FRAMEBUFFER,Qe.__webglFramebuffer),ce.bindFramebuffer(W.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let je=0;je<Pe;je++)V&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ge.get(A).__webglTexture,Q,tt+je),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ge.get(H).__webglTexture,pe,pn+je)),W.blitFramebuffer(Ye,Ke,Me,we,Le,dt,Me,we,W.DEPTH_BUFFER_BIT,W.NEAREST);ce.bindFramebuffer(W.READ_FRAMEBUFFER,null),ce.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(Q!==0||A.isRenderTargetTexture||ge.has(A)){let xe=ge.get(A),Ze=ge.get(H);ce.bindFramebuffer(W.READ_FRAMEBUFFER,ae),ce.bindFramebuffer(W.DRAW_FRAMEBUFFER,re);for(let Qe=0;Qe<Pe;Qe++)V?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,xe.__webglTexture,Q,tt+Qe):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,xe.__webglTexture,Q),se?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ze.__webglTexture,pe,pn+Qe):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Ze.__webglTexture,pe),Q!==0?W.blitFramebuffer(Ye,Ke,Me,we,Le,dt,Me,we,W.COLOR_BUFFER_BIT,W.NEAREST):se?W.copyTexSubImage3D(Bt,pe,Le,dt,pn+Qe,Ye,Ke,Me,we):W.copyTexSubImage2D(Bt,pe,Le,dt,Ye,Ke,Me,we);ce.bindFramebuffer(W.READ_FRAMEBUFFER,null),ce.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else se?A.isDataTexture||A.isData3DTexture?W.texSubImage3D(Bt,pe,Le,dt,pn,Me,we,Pe,Wt,gt,zt.data):H.isCompressedArrayTexture?W.compressedTexSubImage3D(Bt,pe,Le,dt,pn,Me,we,Pe,Wt,zt.data):W.texSubImage3D(Bt,pe,Le,dt,pn,Me,we,Pe,Wt,gt,zt):A.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,pe,Le,dt,Me,we,Wt,gt,zt.data):A.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,pe,Le,dt,zt.width,zt.height,Wt,zt.data):W.texSubImage2D(W.TEXTURE_2D,pe,Le,dt,Me,we,Wt,gt,zt);ce.pixelStorei(W.UNPACK_ROW_LENGTH,tn),ce.pixelStorei(W.UNPACK_IMAGE_HEIGHT,$e),ce.pixelStorei(W.UNPACK_SKIP_PIXELS,qe),ce.pixelStorei(W.UNPACK_SKIP_ROWS,Rn),ce.pixelStorei(W.UNPACK_SKIP_IMAGES,Tr),pe===0&&H.generateMipmaps&&W.generateMipmap(Bt),ce.unbindTexture()},this.initRenderTarget=function(A){ge.get(A).__webglFramebuffer===void 0&&Ie.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Ie.setTextureCube(A,0):A.isData3DTexture?Ie.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Ie.setTexture2DArray(A,0):Ie.setTexture2D(A,0),ce.unbindTexture()},this.resetState=function(){ie=0,N=0,J=null,ce.reset(),zn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Iu}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=It._getDrawingBufferColorSpace(e),t.unpackColorSpace=It._getUnpackColorSpace()}};var vr={normal:1,related:.85,weak:.5,quiet:.3,away:.1},_m=3,nd=i=>i.normalize("NFD").replace(/\p{M}/gu,"").toLowerCase();function id(i,e,t=8){let n=nd(e).split(/\s+/).filter(Boolean);return n.length?i.map(r=>{let s=nd(r.title),a=nd(`${r.title} ${r.body} ${r.extra}`);if(!n.every(l=>a.includes(l)))return null;let o=n.reduce((l,c)=>l+(s.startsWith(c)?3:s.includes(c)?2:1),0)+r.weight*.1;return{item:r,score:o}}).filter(Boolean).sort((r,s)=>s.score-r.score||r.item.order-s.item.order).slice(0,t).map(({item:r})=>r):[]}function _c(i,e){let t=i[e],n=new Map(i.map((a,o)=>[a.id,o])),r=new Set(t.links.filter(a=>n.has(a)&&a!==t.id).map(a=>n.get(a)));i.forEach((a,o)=>o!==e&&a.links.includes(t.id)&&r.add(o));let s=new Set;for(let[a,o]of Object.entries(t.members))for(let l of o){let c=i.map((p,d)=>p.members[a]?.includes(l)?d:-1).filter(p=>p>=0),h=c.indexOf(e);for(let p of[c[h-1],c[h+1]])p!==void 0&&!r.has(p)&&s.add(p)}return{links:[...r].sort((a,o)=>a-o),near:[...s].sort((a,o)=>a-o)}}function rd(i,e,t=_m){let n=i[e],{links:r,near:s}=_c(i,e),a=new Set(r),o=c=>Object.entries(n.members).reduce((h,[p,d])=>h+d.filter(u=>c.members[p]?.includes(u)).length,0),l=c=>(a.has(c)?100:0)+o(i[c])*10+1/(1+Math.abs(i[c].year-n.year));return[...r,...s].sort((c,h)=>l(h)-l(c)||c-h).slice(0,t)}function vm(i,e,t=_m){let{links:n}=_c(i,e);return rd(i,e,1/0).filter(r=>n.includes(r)).slice(0,t)}function xm(i,e,t=3,n=3){let r=i.map((a,o)=>[a,o]).filter(([a])=>a.period===e).sort((a,o)=>o[0].weight-a[0].weight||a[0].year-o[0].year||a[1]-o[1]),s=[];for(let[a,o]of r){if(s.length>=t)break;s.every(([l])=>!a.position||!l.position||Math.hypot(...a.position.map((c,h)=>c-l.position[h]))>=n)&&s.push([a,o])}return s.map(([,a])=>a)}function ym(i,e,t=null){if(!t)return{previous:e>0?e-1:null,next:e<i.length-1?e+1:null};let n=ao(i,t),r=n.indexOf(e);return r<0?{previous:n.findLast(s=>s<e)??null,next:n.find(s=>s>e)??null}:{previous:n[r-1]??null,next:n[r+1]??null}}function Sm(i,e,t,n,r=3){let s=lr.flatMap(a=>(e[a]??[]).map((o,l)=>({facet:a,item:l,title:t[a]?.[o]??o,body:"",extra:"",count:ao(i,{facet:a,item:l}).length}))).filter(a=>a.count>0);return id(s.map((a,o)=>({...a,weight:Math.min(3,a.count/4),order:o})),n,r)}function Mm(i,{selected:e=-1,near:t=new Set,weak:n=new Set,filter:r=null}){return i.map((s,a)=>{let o=vr.normal;return e>=0&&(o=a===e?1:t.has(a)?vr.related:n.has(a)?vr.weak:vr.quiet),r&&!(s.members[r.facet]??[]).includes(r.item)&&(o=a===e?1:Math.min(o,vr.away)),o})}var bm=(i,e)=>i.map((t,n)=>e.has(n)?1:vr.quiet),Tm=(i,e)=>[...i].map(t=>[t,e,!0]),ao=(i,e)=>e?i.map((t,n)=>(t.members[e.facet]??[]).includes(e.item)?n:-1).filter(t=>t>=0):[],Em={threads:"thread-",people:"person-",places:"place-"},sd=(i,e)=>`${Em[i]}${e}`;function wm(i,e){let[t,n]=Object.entries(Em).find(([,s])=>i.startsWith(s))??[],r=t?(e[t]??[]).indexOf(i.slice(n.length)):-1;return r>=0?{facet:t,item:r}:null}var Am=.06;function vc(i,e,t=n=>i[n].position){if(e.length<2)return[];let n=new Map(e.map(o=>[o,t(o)])),r=(o,l)=>Math.hypot(n.get(o)[0]-n.get(l)[0],n.get(o)[1]-n.get(l)[1]),s=new Map(e.slice(1).map(o=>[o,{from:e[0],d:r(e[0],o)}])),a=[];for(;s.size;){let o=-1,l=1/0;for(let[h,{d:p}]of s)(p<l||p===l&&h<o)&&([o,l]=[h,p]);let{from:c}=s.get(o);s.delete(o),a.push([c,o,i[c].period!==i[o].period]);for(let[h,p]of s){let d=r(o,h);d<p.d&&s.set(h,{from:o,d})}}return a}function Rm(i,e){let t=e.map(n=>Math.floor(i[n].year));return{count:e.length,from:Math.min(...t),to:Math.max(...t)}}var Cm=({count:i,from:e,to:t},{one:n,many:r})=>`${(i===1?n:r).replace("{n}",String(i))} \xB7 ${e===t?e:`${e}\u2013${t}`}`;function Im(i,e,t){let n=new Array(t).fill(0);for(let r of e)i[r].period>=0&&n[i[r].period]++;return n}var Z1=10,J1=3,K1=8,mm=[[1,0],[-1,0],[0,1],[0,-1]],gm=[[1,1],[-1,1],[1,-1],[-1,-1]];function Pm({x:i,y:e,r:t},{width:n,height:r},s,a=12){let o=t+Z1,l=(d,u,m,f)=>{let v=u===0?i+d*m-(d<0?n:0):Math.min(Math.max(i-n/2,a),s-n-a),g=u===0?e-r/2:u>0?e+m-2:e-m+2-r;return{left:v,right:v+n,top:g,bottom:g+r,far:f}},c=(d,u,m,f)=>{let v=i+d*m-(d<0?n:0),g=e+u*m-(u<0?r:0);return{left:v,right:v+n,top:g,bottom:g+r,far:f}},h=r+4,p=Array.from({length:J1},(d,u)=>o+(u+1)*h);return[...mm.map(([d,u])=>l(d,u,o,!1)),...gm.map(([d,u])=>c(d,u,o,!1)),...p.flatMap(d=>[...mm.map(([u,m])=>l(u,m,d,!0)),...gm.map(([u,m])=>c(u,m,d,!0))])]}function Lm(i,{free:e,clear:t,inside:n,forced:r=!1,keep:s=-1}){let a=s>=0?i.find(o=>o.slot===s):void 0;return a&&e(a)&&t(a)?a:i.find(o=>e(o)&&t(o))??i.find(e)??(r?i.find(o=>o.far===!1&&n(o))??i[0]:null)}function ad(i,{x:e,y:t,r:n}){let r=Math.min(Math.max(e,i.left),i.right),s=Math.min(Math.max(t,i.top),i.bottom),a=Math.hypot(e-r,t-s)-n*.45;return a>4?{x:r-i.left,y:s-i.top,length:a,angle:Math.atan2(t-s,e-r)}:null}var Nm=i=>Math.min(i,70)+K1;function Dm(i){let e=new Map;return i.forEach((t,n)=>{if(t.period<0)return;let r=e.get(t.period);(r===void 0||t.weight>i[r].weight||t.weight===i[r].weight&&t.year<i[r].year)&&e.set(t.period,n)}),[...e.entries()].sort((t,n)=>t[0]-n[0]).map(([,t])=>t)}function Um(i,e){let t=n=>n.visible!==!1&&n.x>=e.left&&n.x<=e.right&&n.y>=e.top&&n.y<=e.bottom;for(let n=1;n<i.length;n++){let r=i[n-1],s=i[n];if(!t(r)||t(s))continue;let a=0,o=1;for(let l=0;l<18;l++){let c=(a+o)/2;t({visible:s.visible,x:r.x+(s.x-r.x)*c,y:r.y+(s.y-r.y)*c})?a=c:o=c}return{t:(n-1+a)/(i.length-1),x:r.x+(s.x-r.x)*a,y:r.y+(s.y-r.y)*a,angle:Math.atan2(s.y-r.y,s.x-r.x)}}return null}function Om(i,e){return[[Math.abs(i.y-e.top),"top"],[Math.abs(i.x-e.right),"right"],[Math.abs(i.y-e.bottom),"bottom"],[Math.abs(i.x-e.left),"left"]].reduce((n,r)=>r[0]<n[0]?r:n)[1]}function Fm(i,e,{width:t,height:n},r,s=8){let a=h=>Math.min(Math.max(h,r.left),Math.max(r.left,r.right-t)),o=h=>Math.min(Math.max(h,r.top),Math.max(r.top,r.bottom-n)),l=e==="left"?i.x+s:e==="right"?i.x-s-t:a(i.x-t/2),c=e==="top"?i.y+s:e==="bottom"?i.y-s-n:o(i.y-n/2);return{left:l,right:l+t,top:c,bottom:c+n}}function Bm(i,e,t=4,n=[]){let r=[...n],s=.5,a=(o,l)=>o.left<l.right+t-s&&o.right+t>l.left+s&&o.top<l.bottom+t-s&&o.bottom+t>l.top+s;for(let o of i){let l=o.side==="top"||o.side==="bottom"?"top":"left",c=l==="top"?o.box.bottom-o.box.top:o.box.right-o.box.left,h=o.side==="bottom"||o.side==="right"?-1:1,p=o.box;for(let u=0;u<4&&r.some(m=>a(p,m));u++){let m=(c+t)*h*(u+1);p=l==="top"?{...o.box,top:o.box.top+m,bottom:o.box.bottom+m}:{...o.box,left:o.box.left+m,right:o.box.right+m}}p.left>=e.left-1&&p.right<=e.right+1&&p.top>=e.top-1&&p.bottom<=e.bottom+1&&!r.some(u=>a(p,u))?(r.push(p),o.box=p,o.shown=!0):o.shown=!1}return i}function zm(i,{width:e,height:t,pad:n=6}){let r=i.map(u=>u[0]),s=i.map(u=>u[1]),[a,o,l,c]=[Math.min(...r),Math.max(...r),Math.min(...s),Math.max(...s)],h=Math.min((e-2*n)/(o-a||1),(t-2*n)/(c-l||1)),p=(e-(o-a)*h)/2,d=(t-(c-l)*h)/2;return{scale:h,to:([u,m])=>[p+(u-a)*h,d+(c-m)*h],from:([u,m])=>[a+(u-p)/h,c-(m-d)/h]}}function km(i,[e,t],n=1.35){let r=-1,s=n;return i.forEach((a,o)=>{let l=Math.hypot(a.centre[0]-e,a.centre[1]-t)/a.radius;l<s&&([r,s]=[o,l])}),r}var Q1=.75,Vm=(i,e,t=520,n=!0)=>i<Q1&&e>=t&&n,xr={tiers:[{keep:1,ratio:1/0},{keep:.65,ratio:1.5},{keep:.4,ratio:1}],slow:1e3/30,window:90,windows:3},xc={fps:24,hidden:1},Gm=(i,e,t=xc.fps)=>{let n=1e3/t,r=e-i.last;return r<n-1?!1:(i.last=e-Math.min(Math.max(r-n,0),n/2),!0)},Hm=(i,e=xc.fps)=>Math.max(0,i-1e3/e)+1e3/60,eS={days:45},Wm=(i,e=new Date)=>{if(!/^\d{4}-\d{2}$/.test(i??""))return!1;let t=(e-new Date(+i.slice(0,4),+i.slice(5,7)-1,1))/864e5;return t>=0&&t<eS.days},Xm=i=>i.length?i.reduce((e,t)=>e+t,0)/i.length:0,qm=(i,e)=>e>xr.slow&&i<xr.tiers.length-1?i+1:i;function jm(i){return[...[...new Set(i.map(t=>t.period).filter(t=>t>=0))].sort((t,n)=>t-n).map(t=>({age:t})),{ahead:"book"},{ahead:"clone"}]}function Ym(i,{now:e,idleSince:t,eligible:n,plan:r},{wait:s=20,hold:a=6}={}){if(!r.length)return{state:i,open:null};if(i.phase==="off")return{state:i,open:null};if(i.phase==="touring"){if(t>i.at||!n)return{state:{phase:"off",step:0,at:e},open:null,stopped:!0};if(e-i.at<a)return{state:i,open:null};let o=i.step+1;return o>=r.length?{state:{phase:"off",step:0,at:e},open:null,done:!0}:{state:{phase:"touring",step:o,at:e},open:r[o]}}return n&&e-Math.max(t,i.at)>=s?{state:{phase:"touring",step:0,at:e},open:r[0]}:{state:i,open:null}}var yc={minDistance:6,maxDistance:640,minPitch:-1.3,maxPitch:1.3},Ln=(i,e,t)=>Math.min(t,Math.max(e,i));function $m({target:i,distance:e,yaw:t,pitch:n}){let r=Math.cos(n);return[i[0]+e*r*Math.sin(t),i[1]+e*Math.sin(n),i[2]+e*r*Math.cos(t)]}var od=(i,e)=>Ln(i*Math.exp(e),yc.minDistance,yc.maxDistance),Zm=({yaw:i,pitch:e},t,n)=>({yaw:i+t,pitch:Ln(e+n,yc.minPitch,yc.maxPitch)});function Jm({target:i,distance:e,yaw:t,pitch:n},r,s,a,o){let l=2*e*Math.tan(o/2)/a,c=[Math.cos(t),0,-Math.sin(t)],h=[-Math.sin(n)*Math.sin(t),Math.cos(n),-Math.sin(n)*Math.cos(t)];return i.map((p,d)=>p-c[d]*r*l+h[d]*s*l)}var yr=(i,e,t,n)=>Number.isFinite(i)?i+(e-i)*(1-Math.exp(-n*Math.max(0,t))):e,tS=(i,e)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i));function Km(i,e,t,n){return{target:i.target.map((r,s)=>yr(r,e.target[s],t,n)),distance:Math.exp(yr(Math.log(i.distance),Math.log(e.distance),t,n)),yaw:yr(i.yaw,tS(i.yaw,e.yaw),t,n),pitch:yr(i.pitch,e.pitch,t,n)}}var Sc=[0,2,4,7,9],sa=[{root:0,pad:[0,7,14,16]},{root:-7,pad:[0,7,9,16]},{root:-3,pad:[4,9,14,19]},{root:-5,pad:[2,9,14,21]},{root:2,pad:[2,5,9,12]}],We={tuning:432,base:432*2**(-7/12),octaves:2,from:1980,to:2030,master:.7,soften:2200,floor:30,fade:9,chordFrom:24,chordTo:38,detune:4,padCut:760,padSwing:220,padLevel:.0052,shimmerLevel:7e-4,subLevel:.007,airLevel:.012,airCut:520,room:1,reach:.03,bed:{pad:[.35,.8],shimmer:[.1,1],air:[.2,.9],sub:[1,0]},note:[.8,1],hover:[.15,1],swell:[.3,1],travel:[.15,1],tick:432,tickGap:1.4,tickPeak:.01,noteGap:.3,swellPeak:.022,travelPeak:.015,arrival:.4,voices:4,crowd:.5,fadeIn:3.5,fadeOut:.7,suspendAfter:4e3,interval:2e3,horizon:4,breath:{period:11,inhale:.4,pad:.25,air:.3,harmonics:12},pink:{level:.0108,low:110,high:1500}},ld={now:{breath:!1,pink:!1,chordTick:!1,change:3,reverb:5},next:{breath:!0,pink:!0,chordTick:!0,change:5,reverb:5}},oo=-19,nS=-43,ia=i=>We.tuning*2**(i/12),ra=i=>Math.min(1,Math.max(0,i));function Qm(i){let e=Sc.length*We.octaves,t=Math.min(e-1,Math.floor(ra((i-We.from)/(We.to-We.from))*e)),n=Sc[t%Sc.length]+12*Math.floor(t/Sc.length);return We.base*2**(n/12)}var eg=i=>({1:3,2:4.5,3:6})[i]??3,tg=i=>.024+.007*Math.min(3,Math.max(1,i)),ng=i=>ia(i==="clone"?oo:oo-7),ig=i=>1/(1+We.crowd*i),cd=(i,e,t=We.tickGap)=>i-e>=t;function rg(i){let{root:e,pad:t}=sa[i%sa.length];return{sub:ia(nS+(e%12+12)%12),pad:t.map(n=>ia(oo+n)),shimmer:t.slice(2).map(n=>ia(oo+n+12))}}function iS(i,e){let t=sa.map((n,r)=>r).filter(n=>n!==i);return t[Math.min(t.length-1,Math.floor(ra(e)*t.length))]}var hd=i=>i<0?0:i%sa.length,ud=(i,e,t)=>i===null?iS(e,t):hd(i),dd=i=>We.chordFrom+ra(i)*(We.chordTo-We.chordFrom);function pd(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,e|1);return t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function sg(i,e){let t=pd(e),n=new Float32Array(i),r=0,s=0;for(let a=0;a<i;a++)r=(r+.04*(t()*2-1))/1.04,n[a]=r,s=Math.max(s,Math.abs(r));for(let a=0;a<i;a++)n[a]/=s;return n}function ag(i,e){let t=pd(e),n=new Float32Array(i),[r,s,a]=[0,0,0],o=0;for(let l=0;l<i;l++){let c=t()*2-1;r=.99765*r+c*.099046,s=.963*s+c*.2965164,a=.57*a+c*1.0526913,n[l]=r+s+a+c*.1848,o=Math.max(o,Math.abs(n[l]))}for(let l=0;l<i;l++)n[l]/=o;return n}function fd(i,e=We.breath.inhale){let t=i-Math.floor(i);return t<e?-Math.cos(Math.PI*t/e):Math.cos(Math.PI*(t-e)/(1-e))}function og(i=We.breath.inhale,e=We.breath.harmonics,t=2048){let n=new Float32Array(e+1),r=new Float32Array(e+1);for(let s=0;s<t;s++){let a=s/t,o=fd(a,i);for(let l=1;l<=e;l++)n[l]+=2*o*Math.cos(2*Math.PI*l*a)/t,r[l]+=2*o*Math.sin(2*Math.PI*l*a)/t}return{real:n,imag:r}}function lg(i){let e=n=>Math.abs(Math.log2(n/We.tick)),t=n=>n*2**Math.round(Math.log2(We.tick/n));return sa[i%sa.length].pad.map(n=>t(ia(oo+n))).reduce((n,r)=>e(r)<e(n)-1e-9?r:n)}function cg(i,e=1,t=ld.next.reverb){let n=Math.floor(i*t*1.1);return[0,1].map(r=>{let s=pd(e+r*7919),a=new Float32Array(n),o=0;for(let l=0;l<n;l++){let c=l/i,h=ra((c-We.reach)/.05),p=Math.exp(-6.9078*c/t),d=ra((n-l)/(i*.4)),u=3200*(600/3200)**ra(c/t);o+=(1-Math.exp(-2*Math.PI*u/i))*(s()*2-1-o),a[l]=o*h*p*d}return a})}var rS=[[1,1,1],[2,.22,.5],[3,.08,.3],[4.07,.03,.2]],sS=[[1,1,1],[1.5,.25,1.2]],aS=[[1,1,1]];function oS(i,{random:e=Math.random,profile:t=ld.next,output:n=i.destination}={}){let r=i.sampleRate,s={at:i.currentTime+.05,chord:0,lastNote:-1/0,lastTick:-1/0,period:-1,year:0,voices:[],layers:[],hold:null,stopped:!1},a=(X=0)=>{let ne=i.createGain();return ne.gain.value=X,ne},o=(X,ne,he=.5)=>{let oe=i.createBiquadFilter();return oe.type=X,oe.frequency.value=ne,oe.Q.value=he,oe},l=(X,ne,he=0)=>{let oe=i.createOscillator();return oe.type=X,oe.frequency.value=ne,oe.detune.value=he,oe},c=X=>{let ne=i.createBuffer(X.length,X[0].length,r);return X.forEach((he,oe)=>ne.getChannelData(oe).set(he)),ne},h=[],p=(X,ne,he)=>{let oe=l("sine",X);h.push(oe);let w=a(ne);oe.connect(w),w.connect(he),oe.start()},d=a(0),u=o("highpass",We.floor,.7),m=o("lowpass",We.soften,.5),f=a(1);f.connect(m),m.connect(u),u.connect(d),d.connect(n);let v=i.createConvolver();v.buffer=c(cg(r,1,t.reverb));let g=a(We.room);v.connect(g),g.connect(f);let _=([X,ne])=>{let he=a(X),oe=a(ne);return he.connect(f),oe.connect(v),[he,oe]},M=(X,ne)=>ne.forEach(he=>X.connect(he)),T=_(We.bed.pad),S=_(We.bed.shimmer),b=_(We.bed.air),I=_(We.bed.sub),O=_(We.note),k=_(We.hover),D=_(We.swell),q=_(We.travel),B=o("lowpass",We.padCut,.3),ee=a(1);B.connect(ee),M(ee,T),p(.031,We.padSwing,B.frequency);let ae=a(.6);M(ae,S),p(.057,.4,ae.gain);let re=c([sg(r*6,11)]),ie=i.createBufferSource(),N=a(t.pink?We.pink.level:We.airLevel),J=a(1);if(t.pink){let X=o("highpass",We.pink.low,.5),ne=o("lowpass",We.pink.high,.5);ie.buffer=c([ag(r*6,11)]),ie.connect(X),X.connect(ne),ne.connect(N)}else{let X=o("bandpass",We.airCut,.6);ie.buffer=re,ie.connect(X),X.connect(N)}ie.loop=!0,N.connect(J),M(J,b),p(.043,N.gain.value*.6,N.gain),ie.start(),h.push(ie);let le={start:i.currentTime,period:We.breath.period};if(t.breath){let{real:X,imag:ne}=og(),he=i.createOscillator();he.setPeriodicWave(i.createPeriodicWave(X,ne,{disableNormalization:!0})),he.frequency.value=1/le.period,[[ee,We.breath.pad],[J,We.breath.air]].forEach(([oe,w])=>{let E=a(w);he.connect(E),E.connect(oe.gain)}),le.start=i.currentTime,he.start(le.start),h.push(he)}let Ne=X=>()=>X.forEach(ne=>ne.disconnect()),ve=(X,ne,he,oe=We.fade)=>{let{sub:w,pad:E,shimmer:C}=rg(X),U=ne+he+We.fade;s.layers=s.layers.filter(Y=>Y.end>i.currentTime);let y=new Map,z=Y=>{if(!y.has(Y)){let K=a(1);K.connect(Y),y.set(Y,K)}return y.get(Y)},F={buses:y,oscillators:[],end:U,start:ne,index:X};s.layers.push(F);let R=(Y,K,ue)=>{let Ee=a(0);F.oscillators.push(Y),Ee.gain.setValueAtTime(0,ne),Ee.gain.linearRampToValueAtTime(K,ne+oe),Ee.gain.setValueAtTime(K,U-We.fade),Ee.gain.linearRampToValueAtTime(0,U),Y.connect(Ee),Ee.connect(z(ue)),Y.start(ne),Y.stop(U+.1),Y.onended=Ne([Y,Ee])};E.forEach(Y=>[-We.detune,We.detune].forEach(K=>R(l("triangle",Y,K),We.padLevel,B))),C.forEach(Y=>R(l("sine",Y),We.shimmerLevel,ae));let j=a(1);M(j,I),R(l("sine",w),We.subLevel,j)},Oe=(X,{peak:ne,attack:he,length:oe,partials:w,outputs:E,when:C})=>{let U=Math.max(C,i.currentTime),y=oe/4.6,z=he*3,F=a(1);M(F,E),s.voices=s.voices.filter(ue=>ue.end>U),s.voices.length>=We.voices&&s.voices.shift().duck.gain.setTargetAtTime(0,U,.15);let R=ne*ig(s.voices.length),j=U,Y=null,K=[F];for(let[ue,Ee,Se]of w){let fe=l("sine",X*ue),Be=a(0);Be.gain.setValueAtTime(0,U),Be.gain.setTargetAtTime(R*Ee,U,he),Be.gain.setTargetAtTime(0,U+z,y*Se),fe.connect(Be),Be.connect(F),fe.start(U);let ce=U+z+y*Se*8;fe.stop(ce),ce>=j&&(j=ce,Y=fe),K.push(fe,Be)}Y.onended=Ne(K),s.voices.push({end:j,duck:F})},be=(X,ne)=>{let he=Math.max(ne,i.currentTime),[oe,w]=X>=0?[220,680]:[680,220],E=i.createBufferSource(),C=o("bandpass",oe,1.2),U=a(0);E.buffer=re,E.loop=!0,C.frequency.setValueAtTime(oe,he),C.frequency.exponentialRampToValueAtTime(w,he+3.2),U.gain.setValueAtTime(0,he),U.gain.setTargetAtTime(We.travelPeak,he,.5),U.gain.setTargetAtTime(0,he+1.5,.6),E.connect(C),C.connect(U),M(U,q),E.start(he,e()*2),E.stop(he+6.5),E.onended=Ne([E,C,U])},de=X=>s.layers.filter(ne=>ne.start<=X&&ne.end>X).at(-1)?.index??s.chord;return{master:d,breathing:(X=i.currentTime)=>t.breath?(fd((X-le.start)/le.period)+1)/2:null,run(X=We.horizon){if(!s.stopped)for(;s.at<i.currentTime+X;){let ne=dd(e());ve(s.chord,s.at,ne),s.at+=ne,s.chord=ud(s.hold,s.chord,e())}},age(X){if(s.stopped)return;let ne=X<0?null:X;if(ne===s.hold)return;s.hold=ne;let he=i.currentTime;s.layers.forEach(({buses:w,oscillators:E,end:C})=>{C<=he||(w.forEach(U=>U.gain.setTargetAtTime(0,he,t.change/3)),E.forEach(U=>{try{U.stop(he+t.change*2)}catch{}}))}),s.layers=[],s.chord=hd(X);let oe=dd(e());ve(s.chord,he,oe,t.change),s.at=he+oe,s.chord=ud(s.hold,s.chord,e())},fade(X){if(s.stopped)return;let ne=i.currentTime;d.gain.cancelScheduledValues(ne),d.gain.setTargetAtTime(X?We.master:0,ne,X?We.fadeIn:We.fadeOut)},memory({year:X,weight:ne,period:he=-1},oe=i.currentTime){if(s.stopped||!cd(oe,s.lastNote,We.noteGap))return;s.lastNote=oe;let w=he>=0&&s.period>=0&&he!==s.period;w&&be(X>=s.year?1:-1,oe),s.period=he,s.year=X,Oe(Qm(X),{peak:tg(ne),attack:.02,length:eg(ne),partials:rS,outputs:O,when:oe+(w?We.arrival:0)})},swell(X,ne=i.currentTime){s.stopped||Oe(ng(X),{peak:We.swellPeak,attack:.9,length:6,partials:sS,outputs:D,when:ne})},tick(X=i.currentTime){s.stopped||cd(X,s.lastTick)&&(s.lastTick=X,Oe(t.chordTick?lg(de(X)):We.tick,{peak:We.tickPeak,attack:.15,length:1.4,partials:aS,outputs:k,when:X}))},travel(X,ne=i.currentTime){s.stopped||be(X,ne)},stop(){s.stopped||(s.stopped=!0,[...h,...s.layers.flatMap(X=>X.oscillators)].forEach(X=>{try{X.stop(i.currentTime)}catch{}}),s.layers=[],d.disconnect())}}}function hg(){let i=globalThis.AudioContext??globalThis.webkitAudioContext,e={context:null,graph:null,on:!0,timer:0,stopTimer:0,age:-1};if(!i)return{supported:!1,toggle:()=>!1,start:()=>!1,running:()=>!1,isOn:()=>!1,memory(){},age(){},swell(){},tick(){},travel(){},pause(){},close(){}};let t=()=>e.on&&e.graph,n=()=>{e.context||(e.context=new i,e.graph=oS(e.context));let{context:r,graph:s}=e;clearTimeout(e.stopTimer),clearInterval(e.timer),s.fade(!0),r.resume?.(),s.age(e.age),s.run(),e.timer=setInterval(()=>s.run(),We.interval)};return{supported:!0,isOn:()=>e.on,running:()=>e.context?.state==="running",start(){return e.on&&!document.hidden&&n(),e.on},toggle(){return!e.context&&e.on?(e.on=!1,!1):(e.on=!e.on,e.on?n():(clearTimeout(e.stopTimer),clearInterval(e.timer),e.graph.fade(!1),e.stopTimer=setTimeout(()=>!e.on&&e.context.suspend?.(),We.suspendAfter)),e.on)},memory(r){t()&&e.graph.memory(r)},swell(r){t()&&e.graph.swell(r)},age(r){e.age=r,t()&&e.graph.age(r)},tick(){t()&&e.graph.tick()},travel(r){t()&&e.graph.travel(r)},pause(r){!e.context||!e.on||(r?e.context.suspend?.():e.context.resume?.())},close(){clearTimeout(e.stopTimer),clearInterval(e.timer),e.on=!0,e.context?.close?.(),e.context=null,e.graph=null}}}var ar={order:.6,jitter:.08,flight:.3,arrive:.54,swirl:2.6,burst:.17,glow:.07},ps={period:2.4,rise:.12,fall:6,glow:.8,grow:.35,rate:2},Tc={sky:1.4,seed:.9,delay:.3,seconds:4,dolly:6,from:1.6,card:.85,first:.9},dg={sky:.5,delay:0,seconds:1.4,card:0},Ec={strength:.12,night:["#ecd2b0","#b8cdea","#b8cdea","#ecd2b0"],paper:["#8a5a2b","#2f5f99","#2f5f99","#8a5a2b"]},Mc={spin:.07,breath:.05,pace:.5,still:.92},md={dim:.97,reach:2.6,dust:1.4},bc={radius:.2,push:.04,rate:6},pg=.35,ug={ink:.42,edge:0},lo={light:.8,grow:.12},Wr={pull:.1,glow:.3,grow:.12,inRate:2.2,outRate:1.2};var gd=i=>i>=1?1/0:Math.min(1,Math.max(0,(i-ar.arrive*ar.flight)/ar.order)),fg=`
  #define DISCOVER_ORDER ${ar.order.toFixed(2)}
  #define DISCOVER_JITTER ${ar.jitter.toFixed(2)}
  #define DISCOVER_FLIGHT ${ar.flight.toFixed(2)}
  #define DISCOVER_SWIRL ${ar.swirl.toFixed(2)}
  #define DISCOVER_ARRIVE ${ar.arrive.toFixed(2)}
  #define DISCOVER_BURST ${ar.burst.toFixed(2)}
  #define DISCOVER_GLOW ${ar.glow.toFixed(2)}
  #define SPIN_SLOTS ${Ai.slots}
  #define CLOUD_SPIN ${Mc.spin.toFixed(3)}
  #define CLOUD_BREATH ${Mc.breath.toFixed(3)}
  #define CLOUD_PACE ${Mc.pace.toFixed(2)}
  #define CLOUD_STILL ${Mc.still.toFixed(2)}
  #define ENTRANCE_FIRST ${Tc.first.toFixed(2)}
  #define CALL_PERIOD ${ps.period.toFixed(2)}
  #define CALL_RISE ${ps.rise.toFixed(2)}
  #define CALL_FALL ${ps.fall.toFixed(2)}
  #define CALL_GLOW ${ps.glow.toFixed(2)}
  #define CALL_GROW ${ps.grow.toFixed(2)}
  #define CORE_DIM ${md.dim.toFixed(2)}
  #define CORE_REACH ${md.reach.toFixed(2)}
  #define FAR_DUST ${md.dust.toFixed(2)}
  #define POINTER_RADIUS ${bc.radius.toFixed(2)}
  #define POINTER_PUSH ${bc.push.toFixed(3)}
  #define HOVER_PULL ${Wr.pull.toFixed(3)}
  #define HOVER_GLOW ${Wr.glow.toFixed(2)}
  #define HOVER_GROW ${Wr.grow.toFixed(2)}
  attribute vec3 aFrom;
  attribute vec3 aCenter;
  attribute float aU;
  attribute float aOrder;
  attribute float aSeed;
  attribute float aSize;
  attribute float aAhead;
  attribute float aKind;
  attribute float aMemory;
  attribute float aGalaxy;
  attribute float aFacet0;
  attribute float aFacet1;
  attribute float aFacet2;
  uniform float uSpin[SPIN_SLOTS];
  uniform vec3 uPivot[SPIN_SLOTS];
  uniform float uKeep;
  uniform vec3 uPointer;
  uniform vec2 uHover;
  uniform float uSeed;
  uniform float uSeedOn;
  uniform float uKick;
  uniform float uCall;
  uniform float uMix;
  uniform float uTime;
  uniform float uScale;
  uniform float uFar;
  uniform float uGain;
  uniform float uFocusU;
  uniform float uFocusW;
  uniform float uFocusOn;
  uniform float uFilterFacet;
  uniform float uFilterItem;
  uniform float uAway;
  uniform float uReveal;
  uniform float uLevelCount;
  uniform sampler2D uLevels;
  uniform sampler2D uKinds;
  varying float vAlpha;
  varying float vKind;
  void main() {
    if (aSeed > (aKind > 0.5 ? max(uKeep, 0.55) : uKeep)) {
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      gl_PointSize = 0.0;
      vAlpha = 0.0;
      return;
    }
    float delay = DISCOVER_ORDER * aOrder + DISCOVER_JITTER * aSeed;
    float m = smoothstep(delay, delay + DISCOVER_FLIGHT, uMix);
    float since = uMix - (DISCOVER_ORDER * aOrder + DISCOVER_ARRIVE * DISCOVER_FLIGHT);
    float isSeed = (aKind > 0.5 && abs(aMemory - uSeed) < 0.5) ? 1.0 : 0.0;
    since = max(since, isSeed * uSeedOn * 0.6);
    float lit = aKind > 0.5 ? step(0.0, since) : 1.0;
    float pulse = max(since, 0.0) / DISCOVER_GLOW;
    float flash = aKind > 0.5 ? lit * pulse * exp(1.0 - pulse) * (1.0 + ENTRANCE_FIRST * (1.0 - smoothstep(0.0, 0.06, aOrder))) : 0.0;
    flash = max(flash, isSeed * uKick);
    if (aKind > 0.5) m = lit;
    vec3 centre = aCenter;
    int galaxy = int(aGalaxy + 0.5);
    if (aGalaxy > -0.5 && galaxy < SPIN_SLOTS) {
      float turn = uSpin[galaxy];
      vec2 around = centre.xy - uPivot[galaxy].xy;
      centre.xy = uPivot[galaxy].xy + vec2(cos(turn) * around.x - sin(turn) * around.y, sin(turn) * around.x + cos(turn) * around.y);
    }
    vec3 off = position;
    float spin = uTime * CLOUD_SPIN * (0.35 + 0.65 * aSeed) * aKind;
    float c = cos(spin);
    float s = sin(spin);
    float calm = 1.0 - CLOUD_STILL * uFar;
    off.xy = mix(off.xy, vec2(c * off.x - s * off.y, s * off.x + c * off.y), calm);
    off *= 1.0 + calm * CLOUD_BREATH * aKind * sin(uTime * CLOUD_PACE + aSeed * 20.0);
    float hovered = aKind > 0.5 ? (1.0 - step(0.5, abs(aMemory - uHover.x))) * uHover.y : 0.0;
    off *= 1.0 - HOVER_PULL * hovered;
    float e = 1.0 - pow(1.0 - m, 3.0);
    vec3 target = centre + off;
    vec3 rel = aFrom - target;
    float twist = (1.0 - e) * DISCOVER_SWIRL;
    rel.xy = vec2(cos(twist) * rel.x - sin(twist) * rel.y, sin(twist) * rel.x + cos(twist) * rel.y);
    vec3 p = target + rel * (1.0 - e);
    if (aKind > 0.5) p = centre + off * smoothstep(0.0, 1.0, clamp(since / DISCOVER_BURST, 0.0, 1.0));
    p += vec3(sin(aSeed * 91.7 + uTime * 0.35), cos(aSeed * 57.3 + uTime * 0.31), sin(aSeed * 33.1 + uTime * 0.27)) * (0.05 * calm + 0.5 * (1.0 - m));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vKind = aKind > 0.5 ? texture2D(uKinds, vec2((aMemory + 0.5) / uLevelCount, 0.5)).r : -1.0;
    float level;
    if (aKind > 0.5) {
      level = texture2D(uLevels, vec2((aMemory + 0.5) / uLevelCount, 0.5)).r;
    } else {
      float own = uFilterFacet < 0.5 ? aFacet0 : (uFilterFacet < 1.5 ? aFacet1 : aFacet2);
      float inside = (uFilterFacet < -0.5 || abs(own - uFilterItem) < 0.5) ? 1.0 : 0.0;
      float window = 1.0 - smoothstep(uFocusW * 0.35, uFocusW, abs(aU - uFocusU));
      level = mix(1.0, mix(0.22, 1.0, window), uFocusOn) * mix(uAway, 1.0, inside);
    }
    float haze = clamp(1.35 + mv.z / 620.0, 0.35, 1.0);
    float near = smoothstep(2.0, 7.0, -mv.z);
    float body = mix(0.5, 1.0, aKind);
    float core = 1.0 - smoothstep(0.0, CORE_REACH, length(off));
    vAlpha = mix(0.09, 0.9, level) * mix(1.0, 0.3, aAhead) * body * uGain * haze * near * (1.0 - 0.55 * uFar * aKind) * (1.0 - CORE_DIM * core * aKind) * (1.0 + FAR_DUST * uFar * (1.0 - aKind));
    gl_PointSize = clamp(aSize * uScale / -mv.z * (0.8 + 0.5 * level) * (1.0 + uFar * 1.3 * aKind), 1.3, 12.0);
    vAlpha = mix(uGain * (0.2 + 0.6 * aSeed * aSeed) * near, vAlpha, m) * (1.0 - smoothstep(uReveal - 0.2, uReveal + 0.4, aU));
    gl_PointSize = mix(1.1 + 1.6 * aSeed * aSeed, gl_PointSize, m);
    vAlpha = min(1.0, vAlpha * lit * smoothstep(0.0, 0.5, pulse) * (1.0 + 1.2 * flash)) * mix(1.0, uSeedOn, isSeed);
    float beat = fract(uTime / CALL_PERIOD);
    float call = isSeed * uCall * (beat < CALL_RISE ? smoothstep(0.0, CALL_RISE, beat) : exp(-(beat - CALL_RISE) * CALL_FALL));
    vAlpha = min(1.0, vAlpha * (1.0 + CALL_GLOW * call));
    gl_PointSize *= 1.0 + 0.8 * flash + HOVER_GROW * hovered + CALL_GROW * call;
    vAlpha = min(1.0, vAlpha * (1.0 + HOVER_GLOW * hovered));
    if (aKind < 0.5 && uPointer.z > 0.001) {
      float ratio = projectionMatrix[1][1] / projectionMatrix[0][0];
      vec2 away = (gl_Position.xy / gl_Position.w - uPointer.xy) * vec2(ratio, 1.0);
      float gap = max(length(away), 0.0001);
      float fall = 1.0 - smoothstep(0.0, POINTER_RADIUS, gap);
      vec2 dir = away / gap * vec2(1.0 / ratio, 1.0);
      gl_Position.xy += dir * fall * fall * POINTER_PUSH * uPointer.z * calm * gl_Position.w;
    }
  }
`,mg=`
  #define PAPER_INK ${ug.ink.toFixed(2)}
  #define PAPER_EDGE ${ug.edge.toFixed(2)}
  uniform vec3 uInk;
  uniform float uPaper;
  uniform vec3 uTints[4];
  uniform float uTint;
  varying float vAlpha;
  varying float vKind;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    vec3 colour = uInk;
    if (vKind > -0.5) colour = mix(uInk, uTints[int(vKind + 0.5)], uTint);
    gl_FragColor = vec4(colour, smoothstep(1.0, mix(0.3, PAPER_EDGE, uPaper), d) * vAlpha * mix(1.0, PAPER_INK, uPaper));
  }
`,gg=`
  attribute float aSize;
  attribute float aState;
  attribute float aOrder;
  attribute float aFade;
  attribute float aFirst;
  uniform float uSeedOn;
  uniform float uScale;
  uniform float uTime;
  uniform float uReveal;
  varying float vState;
  varying float vFade;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float pulse = fract(uTime * 0.35);
    float low = max(aOrder - 0.14, 0.0001);
    float reveal = mix(smoothstep(low, max(aOrder, low + 0.02), uReveal), uSeedOn, aFirst);
    float size = aSize * (0.45 + 0.55 * reveal);
    if (aState > 2.5 && aState < 3.5) size *= 1.0 + 2.0 * pulse;
    vState = aState;
    vFade = ((aState > 2.5 && aState < 3.5) ? 1.0 - pulse : 1.0) * reveal * aFade;
    gl_PointSize = clamp(size * uScale / -mv.z, 2.0, 140.0);
  }
`,_g=`
  uniform vec3 uInk;
  varying float vState;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float alpha;
    if (vState > 3.5) alpha = smoothstep(0.9, 0.95, d) * smoothstep(1.0, 0.97, d) * 0.7;
    else if (vState > 2.5) alpha = smoothstep(0.78, 0.88, d) * smoothstep(1.0, 0.94, d) * 0.9;
    else if (vState > 1.5) alpha = smoothstep(0.7, 0.8, d) * smoothstep(0.98, 0.9, d) + 0.08 * smoothstep(0.7, 0.0, d);
    else alpha = max(smoothstep(0.62, 0.45, d), 0.25 * smoothstep(1.0, 0.1, d));
    gl_FragColor = vec4(uInk, alpha * vFade);
  }
`,wc=`
  attribute float aSeed;
  attribute float aBright;
  attribute float aHalo;
  attribute float aSize;
  uniform float uTime;
  uniform float uPixel;
  uniform float uGain;
  uniform float uHalo;
  varying float vAlpha;
  varying float vHalo;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.75 + 0.25 * sin(uTime * (0.3 + 1.4 * fract(aSeed * 113.0)) + aSeed * 71.0);
    vAlpha = uGain * (0.4 + 0.6 * aBright) * twinkle;
    vHalo = aHalo * uHalo;
    gl_PointSize = aSize * uPixel * (1.0 + 3.0 * vHalo);
  }
`,Ac=`
  uniform vec3 uInk;
  varying float vAlpha;
  varying float vHalo;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float plain = smoothstep(1.0, 0.2, d);
    float haloed = max(smoothstep(0.3, 0.0, d), 0.55 * pow(1.0 - d, 3.0));
    gl_FragColor = vec4(uInk, mix(plain, haloed, vHalo) * vAlpha);
  }
`;var aa=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,fs=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},Li=(i,e,t)=>i+(e-i)*t;function vg(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function ms(i){return()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var lS={deep:.6,far:.5,haze:.5,glow:.7},cS=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,hS=`
  uniform sampler2D uMap;
  uniform vec3 uInk;
  uniform vec3 uOffset;
  uniform float uTime;
  uniform float uFar;
  uniform float uHaze;
  uniform float uHazeMax;
  varying vec3 vDir;
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  void main() {
    vec3 dir = normalize(vDir);
    vec2 uv = vec2(atan(dir.y, dir.x) / 6.2831853 + 0.5, acos(clamp(dir.z, -1.0, 1.0)) / 3.1415927);
    vec4 t = texture2D(uMap, uv);
    vec3 q = dir * 2.2 + uOffset + vec3(uTime, uTime * 0.6, 0.0);
    float cloud = 0.55 * noise(q) + 0.3 * noise(q * 2.1) + 0.15 * noise(q * 4.3);
    float haze = uHaze * uHazeMax * smoothstep(0.38, 0.8, cloud);
    gl_FragColor = vec4(uInk, clamp(t.g * uFar + haze, 0.0, 1.0));
  }
`,uS=i=>1/Math.max(.2,Math.sin(i*Math.PI));function dS(i){let e=document.createElement("canvas");e.width=i,e.height=i/2;let t=e.getContext("2d");t.fillStyle="#000",t.fillRect(0,0,i,i/2),t.globalCompositeOperation="lighter";let n=ms(7),r=(s,a)=>`rgba(${s===0?255:0},${s===1?255:0},${s===2?255:0},${a})`;for(let s of Kd({random:n})){t.save(),t.translate(s.u*i,s.v*(i/2)),t.rotate(s.angle),t.scale(uS(s.v),s.squash);let a=t.createRadialGradient(0,0,0,0,0,s.radius);a.addColorStop(0,r(1,s.alpha)),a.addColorStop(.35,r(1,s.alpha*.35)),a.addColorStop(1,r(1,0)),t.fillStyle=a,t.beginPath(),t.arc(0,0,s.radius,0,Math.PI*2),t.fill(),t.restore()}return e}function pS(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.4,"rgba(255,255,255,0.35)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),new zr(i)}function xg({scene:i,sky:e,mobile:t,ink:n,star:r}){let s=aa(),a={...lS},o=new zr(dS(2048));o.minFilter=o.magFilter=ii,o.generateMipmaps=!1,o.wrapS=Jl;let l={uMap:{value:o},uInk:n,uOffset:{value:new P},uTime:{value:0},uFar:{value:0},uHaze:{value:0},uHazeMax:{value:Jn.haze.alpha}},c=new Pn({uniforms:l,vertexShader:cS,fragmentShader:hS,transparent:!0,side:ni,depthTest:!1,depthWrite:!1}),h=new ti(new js(1500,48,24),c);h.frustumCulled=!1,h.renderOrder=-3,i.add(h);let p=[0,1,2].map(I=>e.list.reduce((O,k)=>O+k.centre[I],0)/e.list.length),d=Math.max(...e.list.map(I=>Math.hypot(...I.centre.map((O,k)=>O-p[k]))+I.radius*2)),u=Jd({count:t?Jn.deep.mobile:Jn.deep.count,random:ms(7),centre:p,inner:Math.min(Jn.deep.radius/3,Math.max(d*1.15,Jn.deep.inner/4))}),m=new Rt;m.setAttribute("position",new Dt(u.position,3)),m.setAttribute("aSeed",new Dt(u.seed,1)),m.setAttribute("aBright",new Dt(u.bright,1)),m.setAttribute("aHalo",new Dt(new Float32Array(u.count),1)),m.setAttribute("aSize",new Dt(u.size,1));let f={uTime:r.uTime,uPixel:r.uPixel,uInk:n,uGain:{value:0},uHalo:{value:0}},v=new Pn({uniforms:f,vertexShader:wc,fragmentShader:Ac,transparent:!0,depthTest:!1,depthWrite:!1}),g=new Qi(m,v);g.frustumCulled=!1,g.renderOrder=-2,i.add(g);let _=Math.max(1,...e.list.map(I=>I.count)),M=pS(),T=e.list.map(I=>{let{scale:O,strength:k}=Qd(I,_),D=new Na(new Gs({map:M,color:16777215,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0}));return D.position.set(...I.centre),D.scale.set(O,O,1),D.renderOrder=-2,i.add(D),{sprite:D,strength:k,scale:O,galaxy:I,reveal:0}}),S={night:!0,quiet:!1,dim:1,formed:1/0,sky:1,boost:1},b=()=>{f.uGain.value=a.deep*S.sky*S.boost*(S.night?1.25:.4),g.visible=a.deep>.001,l.uFar.value=a.far*S.sky,l.uHaze.value=S.quiet?0:a.haze*S.sky,h.visible=l.uFar.value+l.uHaze.value>.001,T.forEach(({sprite:I,strength:O,scale:k,galaxy:D})=>{let q=fs(D.start,D.end,S.formed);I.scale.set(k*(.55+.45*q),k*(.55+.45*q),1),I.material.opacity=O*a.glow*S.dim*q*(S.night?1:.5),I.visible=I.material.opacity>.002,I.material.color.copy(n.value)})};return{applyTheme:I=>{S.night=I,c.blending=I?_r:Ii,c.needsUpdate=!0,v.blending=I?_r:Ii,v.needsUpdate=!0,T.forEach(({sprite:O})=>{O.material.blending=I?_r:Ii,O.material.needsUpdate=!0}),b()},setTier:I=>{S.quiet=I>=2,b()},setDim:I=>{S.dim=I,b()},update:(I,O,k,D=1,q=1)=>{(k!==S.formed||D!==S.sky||q!==S.boost)&&(S.formed=k,S.sky=D,S.boost=q,b()),h.position.copy(O.position),l.uOffset.value.copy(O.position).multiplyScalar(4e-4),l.uTime.value=s?0:I*.01}}}var _d=-.27,Sd=.35,vd=[0,0,-7],Wi=18,yg=40,fS=6,mS=.5,xd=4.2,yd=900,gS=.9,co=10,_S=6,ho={rate:.11,yaw:.14,pitch:.02,rest:2.5};function Sg({canvas:i,cloud:e,marks:t,future:n,today:r,mobile:s,sky:a,kinds:o=[]}){let l=new fc({canvas:i,antialias:!1,powerPreference:"high-performance"});l.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2));let c=new Ca,h=new ei(36,innerWidth/innerHeight,.1,4e3),p=r+Wc[1]+.4,d=new Float32Array(e.count*3);for(let V=0;V<d.length;V++)d[V]=e.position[V]-e.center[V];let u=new Rt,m=(V,se)=>new Dt(V,se).setUsage(cc);u.setAttribute("position",new Dt(d,3)),u.setAttribute("aFrom",new Dt(e.from,3)),u.setAttribute("aCenter",new Dt(e.center,3)),Object.entries({u:"aU",order:"aOrder",seed:"aSeed",size:"aSize",ahead:"aAhead",kind:"aKind",memory:"aMemory",galaxy:"aGalaxy"}).forEach(([V,se])=>u.setAttribute(se,new Dt(e[V],1))),["threads","people","places"].forEach((V,se)=>u.setAttribute(`aFacet${se}`,new Dt(e.facet[V],1)));let v=new Float32Array(Math.max(1,t.length)).fill(1),g=new Float32Array(v),_=new es(v,v.length,1,no,Pi);_.minFilter=_.magFilter=Gi,_.needsUpdate=!0;let M=new Float32Array(v.length).fill(-1);o.forEach((V,se)=>M[se]=qc.indexOf(V));let T=new es(M,M.length,1,no,Pi);T.minFilter=T.magFilter=Gi,T.needsUpdate=!0;let S=qc.map(()=>new _t),b=()=>(Ve.night?Ec.night:Ec.paper).forEach((V,se)=>S[se].set(V)),I={value:new _t},O=Zd({count:s?4e3:void 0,random:ms(2026)}),k=new Rt;k.setAttribute("position",new Dt(O.position,3)),k.setAttribute("aSeed",new Dt(O.seed,1)),k.setAttribute("aBright",new Dt(O.bright,1)),k.setAttribute("aHalo",new Dt(O.halo,1)),k.setAttribute("aSize",new Dt(O.size,1));let D=1.25,q={uTime:{value:0},uPixel:{value:1},uGain:{value:.6},uHalo:{value:1},uInk:I},B=new Pn({uniforms:q,vertexShader:wc,fragmentShader:Ac,transparent:!0,depthTest:!1,depthWrite:!1}),ee=new Qi(k,B);ee.frustumCulled=!1,ee.renderOrder=-1,c.add(ee);let ae=xg({scene:c,sky:a,mobile:s,ink:I,star:q}),re=t.reduce((V,se,xe)=>se.year<t[V].year?xe:V,0),ie=Math.min(1,Math.sqrt(6e4/e.count)),N={uMix:{value:0},uTime:{value:0},uScale:{value:1},uFar:{value:1},uGain:{value:1},uFocusU:{value:0},uFocusW:{value:7},uFocusOn:{value:0},uFilterFacet:{value:-1},uFilterItem:{value:-1},uAway:{value:.12},uReveal:{value:1e4},uLevelCount:{value:v.length},uLevels:{value:_},uKinds:{value:T},uTints:{value:S},uTint:{value:Ec.strength},uPaper:{value:0},uSpin:{value:new Float32Array(Ai.slots)},uPivot:{value:Array.from({length:Ai.slots},(V,se)=>new P(...a.list[se]?.centre??[0,0,0]))},uKeep:{value:1},uSeed:{value:re},uSeedOn:{value:0},uKick:{value:0},uCall:{value:0},uPointer:{value:new P(0,0,0)},uHover:{value:new _e(-1,0)},uInk:I},J=new Pn({uniforms:N,vertexShader:fg,fragmentShader:mg,transparent:!0,depthTest:!1,depthWrite:!1}),le=new Qi(u,J);le.frustumCulled=!1,c.add(le);let Ne=[...t.map(V=>V.position),n.today,n.today,n.book,n.clone],ve=new Float32Array(Ai.slots),Oe=(V,se)=>{se.set(...Ne[V]);let xe=V<t.length?t[V].period:-1;if(xe>=0&&xe<Ai.slots&&ve[xe]){let Ze=a.list[xe].centre,[Qe,Fe]=[se.x-Ze[0],se.y-Ze[1]];se.x=Ze[0]+Math.cos(ve[xe])*Qe-Math.sin(ve[xe])*Fe,se.y=Ze[1]+Math.sin(ve[xe])*Qe+Math.cos(ve[xe])*Fe}return se},be=[{size:1.3,state:1,order:.96},{size:2.4,state:3,order:.96},{size:2.4,state:2,order:.98},{size:2.4,state:2,order:1},{size:8,state:4,order:0},{size:8,state:4,order:0}],de=4,X=[0,0],ne=[],he=5,oe=m(new Float32Array(be.length*3),3),w=m(Float32Array.from(be.map(V=>V.size)),1),E=m(new Float32Array(be.length).fill(1),1),C=new Rt;C.setAttribute("position",oe),C.setAttribute("aSize",w),C.setAttribute("aFade",E),C.setAttribute("aFirst",new Dt(Float32Array.from(be.map((V,se)=>se===re?1:0)),1)),C.setAttribute("aState",new Dt(Float32Array.from(be.map(V=>V.state)),1)),C.setAttribute("aOrder",new Dt(Float32Array.from(be.map(V=>V.order)),1));let U={uScale:{value:1},uTime:{value:0},uReveal:{value:0},uSeedOn:{value:0},uInk:I},y=new Pn({uniforms:U,vertexShader:gg,fragmentShader:_g,transparent:!0,depthTest:!1,depthWrite:!1}),z=new Qi(C,y);z.frustumCulled=!1,c.add(z);let F=[],R=(V,se=!1)=>{let xe=se?new Ya({transparent:!0,dashSize:.8,gapSize:.9,depthTest:!1}):new ts({transparent:!0,depthTest:!1});return F.push({material:xe,opacity:V}),xe},j=V=>new Rt().setAttribute("position",new Je(V,3)),Y=(()=>{let V=document.createElement("canvas");V.width=V.height=32;let se=V.getContext("2d"),xe=se.createRadialGradient(16,16,0,16,16,16);return xe.addColorStop(0,"rgba(255,255,255,1)"),xe.addColorStop(.5,"rgba(255,255,255,1)"),xe.addColorStop(.75,"rgba(255,255,255,0.3)"),xe.addColorStop(1,"rgba(255,255,255,0)"),se.fillStyle=xe,se.fillRect(0,0,32,32),new zr(V)})(),K=1.6,ue=1.5,Ee=new P,Se=new Float32Array(3*1024),fe=V=>{let se=new Float32Array(yd*3),xe=new Dt(se,3).setUsage(cc),Ze=new Rt().setAttribute("position",xe);Ze.setDrawRange(0,0);let Qe=new Hs({map:Y,size:3,sizeAttenuation:!1,transparent:!0,depthTest:!1,depthWrite:!1});V&&F.push({material:Qe,opacity:V});let Fe=new Qi(Ze,Qe);return Fe.frustumCulled=!1,Fe.userData.lay=(je,Zt=!1,kt=0)=>{let lt=je.length/3,_n=Math.min(1023,Zt?lt+1:lt);for(let Tt=0;Tt<_n;Tt++){let vn=Tt%lt*3;Ee.set(je[vn],je[vn+1],je[vn+2]).project(h),Se[Tt*3]=(Ee.x*.5+.5)*innerWidth,Se[Tt*3+1]=(-Ee.y*.5+.5)*innerHeight,Se[Tt*3+2]=Ee.z>-1&&Ee.z<1?1:0}let Ce=kt,Lt=0;for(let Tt=0;Tt<_n-1&&Lt<yd;Tt++){let[vn,mi,Xt,Cn,Et,Mn]=[Se[Tt*3],Se[Tt*3+1],Se[Tt*3+2],Se[Tt*3+3],Se[Tt*3+4],Se[Tt*3+5]];if(!Xt||!Mn){Ce=0;continue}let Nn=Math.hypot(Cn-vn,Et-mi);if(Nn<1e-6)continue;let nn=120,xn=(ui,un)=>(ui<-nn?1:ui>innerWidth+nn?2:0)|(un<-nn?4:un>innerHeight+nn?8:0);if(xn(vn,mi)&xn(Cn,Et)){Ce=((Ce-Nn)%co+co)%co;continue}let rn=Tt%lt*3,kn=(Tt+1)%lt*3;for(;Ce<=Nn&&Lt<yd;){let ui=Ce/Nn;for(let un=0;un<3;un++)se[Lt*3+un]=je[rn+un]+(je[kn+un]-je[rn+un])*ui;Lt++,Ce+=co}Ce-=Nn}Ze.setDrawRange(0,Lt),xe.needsUpdate=!0,Qe.size=K*(Fe.userData.outer?ue:1)*l.getPixelRatio()},Fe},Be=[],ce=new fr,me=(V,se,xe=1980)=>(V.frustumCulled=!1,V.userData.opacity=se,V.userData.year=xe,ce.add(V),V),ge=[];(()=>{let V=je=>je.members.threads?.[0]??0,se=new Map,xe=a.list.map(()=>({open:[],shadow:[]}));t.forEach((je,Zt)=>{let kt=`${je.period}:${V(je)}`;se.set(kt,[...se.get(kt)??[],Zt])}),se.forEach(je=>vc(t,je).forEach(([Zt,kt])=>xe[t[Zt].period].open.push(...t[Zt].position,...t[kt].position))),xe.forEach((je,Zt)=>{let kt=a.list[Zt].centre;for(let[lt,_n]of[["open",.34],["shadow",.13]]){if(!je[lt].length)continue;let Ce=me(new ns(j(je[lt].map((Lt,Tt)=>Lt-kt[Tt%3])),R(_n)),_n,a.list[Zt].end);Ce.position.set(...kt),Ce.userData.constellation=!0,ge.push({lines:Ce,k:Zt})}});let Ze=(je,Zt)=>{let kt=[],lt=Math.max(8,Math.ceil((Zt-je)/1.5));for(let _n=0;_n<=lt;_n++)kt.push(...xs(a,je+(Zt-je)*_n/lt));return kt};a.list.forEach((je,Zt)=>{let kt=[];for(let Ce=0;Ce<120;Ce++){let Lt=Math.PI*2*Ce/120,[Tt,vn]=Cr(je,Math.sin(Lt)*(je.radius+1.6),Math.cos(Lt)*(je.radius+1.6));kt.push(je.centre[0]+Tt,je.centre[1]+vn,je.centre[2])}let lt=me(fe(.8),.8,je.start);lt.userData.dots=!0,lt.userData.outer=!0,Be.push({points:lt,vertices:kt,closed:!0});let _n=a.list[Zt+1];if(_n){let Ce=me(fe(.7),.7,_n.start);Ce.userData.dots=!0,Be.push({points:Ce,vertices:Ze(je.along+je.radius+1.6,_n.along-_n.radius-1.6),closed:!1})}});let Qe=a.list.at(-1),Fe=me(fe(.7),.7,r);Fe.userData.dots=!0,Be.push({points:Fe,vertices:Ze(Qe.along+Qe.radius+1.6,a.length),closed:!1})})(),c.add(ce);let xt=Array.from({length:8},()=>{let V=fe(0);return V.visible=!1,c.add(V),V}),Ft=new Float32Array(288),ln=[],ze=new Float32Array((Wi+1)*3),at={list:[],centre:[0,0,0],want:0,fade:0,galaxy:{}},ot=V=>{let se=new Float32Array(yg*Wi*6),xe=m(se,3),Ze=new ns(new Rt().setAttribute("position",xe),R(V));return Ze.frustumCulled=!1,Ze.geometry.setDrawRange(0,0),c.add(Ze),{lines:Ze,attribute:xe,positions:se,indices:[],fade:0,opacity:V}},Yt=ot(.7),Ut=ot(.3),cn=ot(1),rt=400,bn=new Float32Array(rt*Wi*6),ke=m(bn,3),$t=new ns(new Rt().setAttribute("position",ke),R(.6));$t.frustumCulled=!1,$t.geometry.setDrawRange(0,0),c.add($t);let Gt={pairs:[],fade:0,figure:!1},zn=(V,se,xe,Ze,Qe,Fe=1)=>{for(let je=0;je<Wi;je++)for(let[Zt,kt]of[[0,je/Wi*Fe],[1,(je+1)/Wi*Fe]]){let lt=((se*Wi+je)*2+Zt)*3;V[lt]=Li(xe.x,Ze.x,kt),V[lt+1]=Li(xe.y,Ze.y,kt),V[lt+2]=Li(xe.z,Ze.z,kt)+4*kt*(1-kt)*Qe}},ci={map:new Map},W=new P,fi=new P,Hn=new P,ut={target:[...vd],distance:700,yaw:0,pitch:_d},Ht={target:[...vd],distance:340,yaw:0,pitch:_d},dn={x:0,y:0,goalX:0,goalY:0},Ve={reveal:null,follow:-1,idle:!0,hover:-1,selection:-1,preview:-1,previewFade:0,ringFade:0,portrait:innerWidth/innerHeight<1,drift:0,turned:0,ring:-1,touched:-1e9},Sr=Math.max(...[...t.map(V=>V.position),n.book,n.clone].map(V=>Math.hypot(V[0],V[1])))+12,jn=()=>Math.max(160,Sr*4.3)*(Ve.portrait?1.3:1),Yn=V=>Math.min(84,V*(Ve.portrait?1.5:1)),Mr=t.length+2,Xi=V=>V<t.length?V:V+2,hi=Array.from({length:Mr},()=>({x:0,y:0,r:0,on:!1,depth:0})),wn=new P,An=new P,br=(V,se={})=>(An.copy(V).project(h),se.x=(An.x*.5+.5)*innerWidth,se.y=(-An.y*.5+.5)*innerHeight,se.visible=An.z>-1&&An.z<1,se),gn=({target:V,distance:se,yaw:xe,pitch:Ze,follow:Qe=-1}={})=>{V&&(Ht.target=[...V]),se!==void 0&&(Ht.distance=Ln(se,6,640)),xe!==void 0&&(Ht.yaw=xe),Ze!==void 0&&(Ht.pitch=Ze),Ve.follow=Qe},ft=(V=_d)=>gn({target:vd,distance:jn(),yaw:0,pitch:V}),Ot=new _t,qi=()=>{let V=getComputedStyle(document.documentElement);Ot.set(V.getPropertyValue("--bg").trim()),I.value.set(V.getPropertyValue("--fg").trim()),F.forEach(({material:xe})=>xe.color.copy(I.value));let se=Ot.getHSL({}).l<.5;l.setClearColor(Ot,1),J.blending=B.blending=se?_r:Ii,D=se?1.25:.4,q.uHalo.value=se?1:0,B.needsUpdate=!0,ae.applyTheme(se),Ve.night=se,b(),y.blending=Ii,N.uGain.value=(se?.55:.6)*ie,N.uPaper.value=se?0:1,J.needsUpdate=!0};qi();let De=()=>{Ve.portrait=innerWidth/innerHeight<1,h.aspect=innerWidth/innerHeight,l.setSize(innerWidth,innerHeight,!1)};De();let hn=new Map,A={index:-1,mix:0},H={x:0,y:0,on:!1,fine:matchMedia("(pointer: fine)").matches&&!aa(),strength:0},Z={moved:!1,pinch:0,button:0},te={hover:()=>{},click:()=>{},frame:()=>{},touch:()=>{},error:V=>console.error(V)},Q=!0,pe=(V,se)=>{let xe=-1,Ze=1;return hi.forEach((Qe,Fe)=>{if(!Qe.on)return;let je=Math.max(26,Qe.r*.9),Zt=Math.hypot(Qe.x-V,Qe.y-se)/je;Zt<Ze&&([xe,Ze]=[Fe,Zt])}),xe},Me=()=>{Ve.idle=!1,Ve.touched=performance.now()/1e3,te.touch()},we=(V,se)=>{Ht.target=Jm(Ht,V,se,innerHeight,h.fov*Math.PI/180),Ve.follow=-1};i.addEventListener("pointerdown",V=>{if(!(V.pointerType==="mouse"&&V.button>2)){if(i.setPointerCapture(V.pointerId),hn.set(V.pointerId,{x:V.clientX,y:V.clientY,startX:V.clientX,startY:V.clientY}),hn.size===1&&Object.assign(Z,{moved:!1,button:V.button,pinch:0,shift:V.shiftKey}),hn.size===2){let[se,xe]=[...hn.values()];Z.pinch=Math.hypot(se.x-xe.x,se.y-xe.y),Z.moved=!0}Me()}}),i.addEventListener("pointermove",V=>{let se=hn.get(V.pointerId);if(!se){V.pointerType==="mouse"&&te.hover(pe(V.clientX,V.clientY),V);return}let xe=V.clientX-se.x,Ze=V.clientY-se.y;if(Math.hypot(V.clientX-se.startX,V.clientY-se.startY)>fS&&(Z.moved=!0),[se.x,se.y]=[V.clientX,V.clientY],hn.size===2){let[Qe,Fe]=[...hn.values()],je=Math.hypot(Qe.x-Fe.x,Qe.y-Fe.y);Z.pinch>0&&je>0&&(Ht.distance=od(Ht.distance,Math.log(Z.pinch/je))),Z.pinch=je,we(xe/2,Ze/2);return}Z.moved&&(Z.button===2||Z.button===1||Z.shift?we(xe,Ze):Object.assign(Ht,Zm(Ht,-xe*.005,Ze*.004)))});let Pe=V=>{let se=hn.get(V.pointerId);hn.delete(V.pointerId),se&&!Z.moved&&hn.size===0&&V.type==="pointerup"&&Z.button===0&&te.click(pe(V.clientX,V.clientY),V)};i.addEventListener("pointerup",Pe),i.addEventListener("pointercancel",Pe),i.addEventListener("pointerleave",()=>{H.on=!1,te.hover(-1)}),i.addEventListener("pointermove",V=>{V.pointerType==="mouse"&&(H.on=H.fine,H.x=V.clientX/innerWidth*2-1,H.y=-(V.clientY/innerHeight)*2+1)}),i.addEventListener("contextmenu",V=>V.preventDefault()),i.addEventListener("wheel",V=>{V.preventDefault();let se=V.deltaY*(V.deltaMode===1?40:V.deltaMode===2?innerHeight:1);Ht.distance=od(Ht.distance,Ln(se*(V.ctrlKey?.012:.0016),-.5,.5)),Me()},{passive:!1});let Ye=new Ja,Ke=new P,tt=new P,Le=Tc,dt=null,pn=null,zt=!1,Wt=0,gt=!1,Bt=null,tn=!0,$e={last:-1/0},qe=0,Rn=()=>{let V=++qe;document.hidden?setTimeout(()=>qe===V&&Tr(performance.now()),1e3/xc.hidden):requestAnimationFrame(se=>qe===V&&Tr(se))};document.addEventListener("visibilitychange",()=>Q&&Rn());let Tr=V=>{if(!Q)return;if(!document.hidden&&!Gm($e,V))return Rn();Ye.update(V);let se=Math.min(Math.max(Ye.getDelta(),0),.25),xe=Ye.getElapsed();pn??(pn=xe);let Ze=Ln(jn()*Le.from,6,640);zt&&dt===null&&(dt=xe,Bt=gt?null:{from:Ze});let Qe=dt===null?0:xe-dt,Fe=Math.min(1,Math.max(0,(Qe-Le.delay)/Le.seconds)),je=fs(0,Le.sky,xe-pn);Ve.follow>=0&&(Oe(Ve.follow,tt),Ht.target=tt.toArray());let Zt=Km(ut,Ht,se,xd);if(Object.assign(ut,Zt),dt===null)ut.distance=Ze;else if(Bt){let ye=Math.min(1,Qe/Le.dolly);ye>=1||!Ve.idle?Bt=null:ut.distance=Math.exp(Li(Math.log(Bt.from),Math.log(Ht.distance),1-(1-ye)**3))}dn.x+=(dn.goalX-dn.x)*(1-Math.exp(-xd*se)),dn.y+=(dn.goalY-dn.y)*(1-Math.exp(-xd*se)),Ve.drift+=((hn.size===0&&performance.now()/1e3-Ve.touched>ho.rest?1:0)-Ve.drift)*(1-Math.exp(-se*.6));let[kt,lt,_n]=$m({...ut,yaw:ut.yaw+Math.sin(xe*ho.rate)*ho.yaw*Ve.drift,pitch:ut.pitch+Math.sin(xe*ho.rate*.75+1)*ho.pitch*Ve.drift});h.position.set(kt,lt,_n),h.fov=Yn(36),h.updateProjectionMatrix(),h.lookAt(ut.target[0],ut.target[1],ut.target[2]),h.setViewOffset(innerWidth,innerHeight,-dn.x,-dn.y,innerWidth,innerHeight),h.updateMatrixWorld();let Ce=innerHeight/(2*Math.tan(h.fov*Math.PI/360)),Lt=fs(.35,.75,ut.distance/jn());Qe-Le.delay-Le.seconds-.5>0&&(Ve.turned+=se*Li(Ai.near,1,Lt));let Tt=Ve.turned;a.list.forEach((ye,yt)=>{yt>=Ai.slots||(ve[yt]=rp(ye,Tt),N.uSpin.value[yt]=ve[yt])}),ge.forEach(({lines:ye,k:yt})=>ye.rotation.z=ve[yt]??0);let vn=ve[0].toFixed(3);i.dataset.spin!==vn&&(i.dataset.spin=vn),H.strength=yr(H.strength,H.on?1:0,se,bc.rate),N.uPointer.value.set(H.x,H.y,H.strength);let mi=Ve.hover>=0&&Ve.hover<t.length;mi&&A.index!==Ve.hover&&(A.mix*=.4,A.index=Ve.hover),A.mix=yr(A.mix,mi?1:0,se,mi?Wr.inRate:Wr.outRate),N.uHover.value.set(A.index,A.mix);let Xt=H.strength.toFixed(2);i.dataset.pointer!==Xt&&(i.dataset.pointer=Xt);let Cn=dt===null?fs(Le.seed,Le.seed+1.6,xe-pn):1,Et=Qe>0?Math.min(1,Qe/.45*Math.exp(1-Qe/.45)):0;N.uSeedOn.value=U.uSeedOn.value=Cn,N.uKick.value=Et,Wt=yr(Wt,zt?0:1,se,ps.rate),N.uCall.value=Wt*Cn,N.uMix.value=Fe;let Mn=Gd(a,gd(Fe));N.uTime.value=U.uTime.value=q.uTime.value=xe,q.uPixel.value=l.getPixelRatio(),N.uFar.value=Lt,N.uScale.value=U.uScale.value=l.domElement.height/(2*Math.tan(h.fov*Math.PI/360)),U.uReveal.value=Math.min(1,gd(Fe)),tn=!1;for(let ye=0;ye<v.length;ye++){let yt=g[ye]-v[ye];Math.abs(yt)>.002?(v[ye]+=yt*(1-Math.exp(-7*se)),tn=!0):v[ye]=g[ye]}for(let ye of ne)v[ye]=g[ye]*(1+pg*(.5+.5*Math.sin(xe*.9)));(tn||ne.length)&&(_.needsUpdate=!0);let Nn=(ye,yt)=>{Oe(t.length+ye,wn),oe.setXYZ(ye,wn.x,wn.y,wn.z),E.setX(ye,yt)},nn=ye=>N.uReveal.value>=ys(ye)?1:0;Nn(0,nn(r)),Nn(1,nn(r)),X.forEach((ye,yt)=>X[yt]=yr(ye,Ve.ring===yt?1:0,se,Ve.ring===yt?Wr.inRate:Wr.outRate)),Nn(2,nn(p)*(1+lo.light*X[0])),Nn(3,nn(p)*(1+lo.light*X[1])),w.setX(2,be[2].size*(1+lo.grow*X[0])),w.setX(3,be[3].size*(1+lo.grow*X[1])),Ve.selection>=0&&(Oe(Ve.selection,wn),oe.setXYZ(de,wn.x,wn.y,wn.z),w.setX(de,2.2*t[Ve.selection].spread+2)),Ve.ringFade+=((Ve.selection>=0?1:0)-Ve.ringFade)*(1-Math.exp(-6*se)),E.setX(de,Ve.ringFade),Ve.preview>=0&&(Oe(Ve.preview,Hn),oe.setXYZ(he,Hn.x,Hn.y,Hn.z),w.setX(he,2.2*t[Ve.preview].spread+2)),Ve.previewFade+=((Ve.preview>=0?1:0)-Ve.previewFade)*(1-Math.exp(-9*se)),E.setX(he,Ve.previewFade),oe.needsUpdate=w.needsUpdate=E.needsUpdate=!0;let xn=`${ut.yaw.toFixed(2)},${ut.pitch.toFixed(2)},${ut.distance.toFixed(0)}`;i.dataset.view!==xn&&(i.dataset.view=xn);let kn=Math.abs(Math.log(ut.distance/Ht.distance))<.004&&Math.abs(Math.sin(ut.yaw-Ht.yaw))<.003&&Math.abs(ut.pitch-Ht.pitch)<.003&&ut.target.every((ye,yt)=>Math.abs(ye-Ht.target[yt])<.03)&&Math.abs(dn.x-dn.goalX)<.5&&Math.abs(dn.y-dn.goalY)<.5?"1":"";i.dataset.rest!==kn&&(i.dataset.rest=kn);let ui=Ve.selection>=0?`${wn.x.toFixed(2)},${wn.y.toFixed(2)},${wn.z.toFixed(2)}`:"";i.dataset.ring!==ui&&(i.dataset.ring=ui);let un=Ve.preview>=0?String(Ve.preview):"";i.dataset.preview!==un&&(i.dataset.preview=un);let gi=fs(.25,.9,Fe),or=Math.min(Mn,Ve.reveal??1/0);ce.visible=gi>.01,ce.children.forEach(ye=>ye.material.opacity=ye.userData.opacity*gi*(ye.userData.constellation?1-Lt:1)*(ye.userData.dots?ye.userData.outer?.4+.25*(1-Lt):.75+.1*(1-Lt):1)*Math.min(1,Math.max(0,(or-ye.userData.year)/2))),cn.indices=Ve.preview>=0&&Ve.selection>=0&&Ve.preview!==Ve.selection?[Ve.preview]:[];for(let ye of[Yt,Ut,cn]){let yt=ye.indices.length?1:0;ye.fade+=(yt-ye.fade)*(1-Math.exp(-5*se));let Dn=Math.min(ye.indices.length,yg);Dn&&(Oe(Ve.selection,tt),ye.indices.slice(0,Dn).forEach((Wn,Vn)=>{Oe(Wn,Ke),zn(ye.positions,Vn,tt,Ke,tt.distanceTo(Ke)*.22,ci.map.get(Wn)??1)}),ye.attribute.needsUpdate=!0),ye.lines.geometry.setDrawRange(0,Dn*Wi*2),ye.lines.material.opacity=ye.opacity*ye.fade,ye.lines.visible=ye.fade>.01}at.fade+=(at.want-at.fade)*(1-Math.exp(-5*se)),K=1.15+.1*(1-Lt),ue=1+.3*(1-Lt),Be.forEach(({points:ye,vertices:yt,closed:Dn})=>ye.userData.lay(yt,Dn)),xt.forEach((ye,yt)=>{let Dn=at.list[yt],Wn=!!Dn&&at.fade>.01;if(ye.visible=Wn,!!Wn){for(let Vn=0;Vn<96;Vn++){let ha=Math.PI*2*Vn/96,[ua,po]=Cr(at.galaxy,Math.sin(ha)*Dn.radius,Math.cos(ha)*Dn.radius);Ft[Vn*3]=at.centre[0]+ua,Ft[Vn*3+1]=at.centre[1]+po,Ft[Vn*3+2]=at.centre[2]}ye.userData.lay(Ft,!0),ye.material.color.copy(I.value),ye.material.opacity=.3*(1-.35*(yt/Math.max(1,at.list.length-1)))*at.fade*gi}});let Ni=at.want&&at.fade>.5?String(at.list.length):"";i.dataset.rings!==Ni&&(i.dataset.rings=Ni);let _i=gi;Gt.fade+=((Gt.pairs.length?1:0)-Gt.fade)*(1-Math.exp(-5*se));let _s=Math.min(Gt.pairs.length,rt),vi=[],vs=0;for(_s&&_i>.01&&(Gt.pairs.slice(0,_s).forEach(([ye,yt,Dn])=>{if(Gt.figure&&Dn)return vi.push(t[ye].year<=t[yt].year?[ye,yt]:[yt,ye]);Oe(ye,tt),Oe(yt,Ke),zn(bn,vs++,tt,Ke,tt.distanceTo(Ke)*(Gt.figure?0:Dn?.3:.12))}),ke.needsUpdate=!0),$t.geometry.setDrawRange(0,vs*Wi*2);ln.length<vi.length;){let ye=fe(0);c.add(ye),ln.push(ye)}ln.forEach((ye,yt)=>{if(ye.visible=yt<vi.length,!ye.visible)return;Oe(vi[yt][0],tt),Oe(vi[yt][1],Ke);let Dn=tt.distanceTo(Ke)*Am;for(let Wn=0;Wn<=Wi;Wn++){let Vn=Wn/Wi;ze[Wn*3]=Li(tt.x,Ke.x,Vn),ze[Wn*3+1]=Li(tt.y,Ke.y,Vn),ze[Wn*3+2]=Li(tt.z,Ke.z,Vn)+4*Vn*(1-Vn)*Dn}ye.userData.lay(ze,!1,xe*_S%co),ye.material.color.copy(I.value),ye.material.opacity=.75*Gt.fade*_i}),$t.material.opacity=.6*Gt.fade*_i,$t.visible=$t.material.opacity>.01,i.dataset.jumps=$t.visible?String(_s):"";let ca=1+gS*(1-Lt);q.uGain.value=D*je*ca,ae.update(xe,h,Mn,je,ca),l.render(c,h),hi.forEach((ye,yt)=>{Oe(Xi(yt),wn),An.copy(wn).project(h),ye.x=(An.x*.5+.5)*innerWidth,ye.y=(-An.y*.5+.5)*innerHeight,ye.depth=h.position.distanceTo(wn),ye.r=(t[yt]?.spread??mS)*2.4*Ce/ye.depth,ye.on=An.z>-1&&An.z<1&&ye.x>0&&ye.x<innerWidth&&ye.y>0&&ye.y<innerHeight});try{te.frame({time:xe,dt:se,intro:Fe,formed:Mn,far:Lt,cssScale:Ce,projected:hi,camera:h,entered:Fe>=Le.card,seen:dt===null&&xe-pn>Le.seed+1.2,seedIndex:re})}catch(ye){Q=!1,te.error(ye);return}Q&&Rn()};return{camera:h,view:ut,goal:Ht,inset:dn,state:Ve,projected:hi,on:(V,se)=>te[V]=se,stop:()=>Q=!1,setQuality:V=>{let se=xr.tiers[Math.min(V,xr.tiers.length-1)];N.uKeep.value=se.keep,ae.setTier(V),l.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2,se.ratio)),l.setSize(innerWidth,innerHeight,!1)},start:()=>Rn(),begin:(V="full")=>{zt=!0,gt=V!=="full",V==="direct"&&(Le={...Tc,...dg})},home:ft,homeDistance:jn,fly:gn,pick:pe,centerOf:V=>Oe(V,new P),project:br,resize:De,applyTheme:qi,setLevels:V=>V.forEach((se,xe)=>g[xe]=se),setFilter:V=>{N.uFilterFacet.value=V?["threads","people","places"].indexOf(V.facet):-1,N.uFilterItem.value=V?V.item:-1,ae.setDim(V?.45:1)},setFocus:V=>{N.uFocusOn.value=V===null?0:1,V!==null&&(N.uFocusU.value=ys(V))},setSelection:V=>Ve.selection=V,setHover:V=>Ve.hover=V,setRingGlow:V=>Ve.ring=V,setFresh:V=>ne=V,setPreview:V=>Ve.preview=V,setJumps:(V,se=!1)=>Object.assign(Gt,{pairs:V,figure:se}),slotOf:V=>({today:t.length,book:t.length+2,clone:t.length+3})[V],setReveal:V=>{N.uReveal.value=V===null?1e4:ys(V),Ve.reveal=V},setLinks:(V,se)=>{Yt.indices=V,Ut.indices=se,i.dataset.links=String(V.length+se.length)},setInset:(V,se)=>{dn.goalX=V,dn.goalY=se},setIdle:V=>Ve.idle=V,setLinkReach:V=>ci.map=V,groundAt:(V,se,xe)=>{An.set(V/innerWidth*2-1,-(se/innerHeight)*2+1,.5).unproject(h),An.sub(h.position).normalize();let Ze=(xe-h.position.z)/An.z,Qe=2600,Fe=Number.isFinite(Ze)&&Ze>0?Math.min(Ze,Qe):Qe;return[h.position.x+An.x*Fe,h.position.y+An.y*Fe]},arcScreen:(V,se,xe,Ze={})=>(Oe(V,W),Oe(se,fi),Hn.set(Li(W.x,fi.x,xe),Li(W.y,fi.y,xe),Li(W.z,fi.z,xe)+4*xe*(1-xe)*W.distanceTo(fi)*.22),br(Hn,Ze)),setYearRings:(V,se,xe={})=>{se.length?Object.assign(at,{list:se,centre:V,galaxy:xe,want:1}):at.want=0}}}var vS="(min-height: 520px) and (min-width: 320px)",xS="(max-width: 900px), (max-aspect-ratio: 1/1)",Md=74,yS=124,SS=24,MS=2.2,bS=.6,oa=18,la=160,TS=24,ES=400,Mg=8,wS=[0,22],bg={today:2.4,book:1.2,clone:1.2},Tg=8,bd={quiet:.4,current:.9},Eg=20,wg=2,AS=.6,RS=40,gs={width:104,height:100,top:118},Ag="http://www.w3.org/2000/svg",Td=matchMedia(xS),Rg=.9,CS=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],IS=new Set(["hero","contact"]),PS=["1","2","3"],qn=[],Cc=()=>{for(;qn.length;)qn.pop()();delete document.documentElement.dataset.entering,document.documentElement.classList.remove("immersive"),document.documentElement.classList.add("flat")};function Ig(){if(!vg()||aa())return Cc();let i=matchMedia(vS);if(i.addEventListener("change",()=>location.reload()),!i.matches)return Cc();LS().catch(e=>{console.error(e),Cc()})}function Cg(i){let e=0,t=n=>{[...n.childNodes].forEach(r=>{if(r.nodeType===Node.TEXT_NODE){let s=document.createDocumentFragment();r.textContent.split(/(\s+)/).forEach(a=>{if(!a)return;if(/^\s+$/.test(a))return s.append(a);let o=document.createElement("span");o.className="w",o.style.setProperty("--i",e++),o.textContent=a,s.append(o)}),r.replaceWith(s)}else r.nodeType===Node.ELEMENT_NODE&&t(r)})};t(i)}var Xe=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n},Ed=i=>i?i.split(","):[];async function LS(){let i=document.getElementById("scene"),e=document.querySelector(".stage"),t=document.querySelector("main.story"),n=document.querySelector(".hud"),r=document.querySelector(".rail"),s=document.querySelector(".masthead"),a=document.querySelector(".explore"),o=kd(),l=matchMedia("(max-width: 760px)").matches,c=JSON.parse(a.dataset.facets),h=JSON.parse(a.dataset.ahead),p=JSON.parse(a.dataset.periods??"[]"),d=[...t.querySelectorAll("[data-station]")].map((x,L)=>({element:x,kind:x.dataset.station,id:x.id,label:x.dataset.hud,t:L,panel:x.matches("[data-panel]")?x:x.querySelector("[data-panel]")})),u=d.length-1,m=x=>d.findIndex(L=>L.kind===x),[f,v,g,_]=["book","clone","contact","hero"].map(m),M=d.filter(x=>x.kind==="milestone"),T=M.map(({element:x})=>({id:x.dataset.milestone,date:x.dataset.date,weight:+x.dataset.weight,period:x.dataset.period,links:Ed(x.dataset.links),...Object.fromEntries(lr.map(L=>[L,Ed(x.dataset[L])]))})),S=Wd(T,c,{periods:p,today:o}),b=Xc(T,S.map(x=>x.year),{periods:p,today:o,threads:c.threads}),I=new Map(M.map((x,L)=>[x.t,L])),O=new Map([...t.querySelectorAll("li[data-ask]")].map(x=>[x.dataset.ask,new Set(Ed(x.dataset.memories).map(L=>M.findIndex($=>$.element.dataset.milestone===L)).filter(L=>L>=0))])),k=null,D=Object.fromEntries(lr.map(x=>[x,{}]));t.querySelectorAll("ul.facets").forEach(x=>x.querySelectorAll("li").forEach(L=>D[x.dataset.facet][L.dataset.item]=L.textContent));let q=M.map(x=>({time:x.element.querySelector("time").textContent,title:x.element.querySelector("h3").textContent,body:[...x.element.querySelectorAll(":scope > p:not(.kicker):not(.intro)")].map(L=>L.textContent).join(" ")})),B=M.flatMap((x,L)=>{let $=x.element.querySelector(".fresh");return!$||!Wm($.dataset.added)?[]:($.hidden=!1,[L])}),ee=M.map((x,L)=>({index:L,id:x.id,title:q[L].title,body:q[L].body,extra:`${q[L].time} ${x.element.dataset.alt??""} ${lr.flatMap($=>(S[L].members[$]??[]).map(Te=>D[$][c[$][Te]]??"")).join(" ")}`,weight:S[L].weight,order:L})),ae=ep({marks:S,today:o,random:ms(1980),facets:c,sky:b,cap:l?55e3:Rr.cap,trail:l?12e3:Rr.trail}),re=Xd(b),ie=new Set(Dm(S)),N=Sg({canvas:i,cloud:ae,marks:S,future:re,today:o,mobile:l,sky:b,kinds:M.map(x=>x.element.dataset.kind)});N.setFresh(B);let J=document.documentElement,le=!1,Ne=new Set,ve=0,Oe=()=>{clearTimeout(ve),le=!0,J.dataset.entering="1"},be=()=>{le&&(le=!1,clearTimeout(ve),J.dataset.entering="out",ve=setTimeout(()=>delete J.dataset.entering,1600))},de=x=>{!le||x.target.closest?.(".seed")||(Y(),be())};document.addEventListener("focusin",de),qn.push(()=>{clearTimeout(ve),document.removeEventListener("focusin",de),delete J.dataset.entering});let X=navigator.webdriver,ne=location.hash.length>1;!X&&!ne&&Oe(),N.home(),N.start();let he=S.reduce((x,L,$)=>L.year<S[x].year?$:x,0),oe=Xe("button","seed");oe.type="button",oe.setAttribute("aria-label",q[he].title);let w=Xe("p","begin-hint");w.id="begin-hint",oe.setAttribute("aria-describedby",w.id);let E=0,C=!1,U=["pointerup","touchend","click","keydown"],y=()=>U.forEach(x=>document.removeEventListener(x,Y,!0)),z=["pointerdown","pointermove","pointerup","mousedown","mouseup","click","dblclick","contextmenu","touchstart","touchmove","touchend","wheel","keydown"],F=x=>{x.stopPropagation(),(x.type==="contextmenu"||x.type==="wheel"&&x.ctrlKey)&&x.preventDefault()},R=()=>z.forEach(x=>document.removeEventListener(x,F,!0)),j=0;function Y(x){C||x?.type==="keydown"&&["Escape","Shift","Control","Alt","Meta","CapsLock"].includes(x.key)||(C=!0,j=performance.now()/1e3,y(),setTimeout(R,bS*1e3),N.begin(X?"still":ne?"direct":"full"),le&&(ve=setTimeout(()=>be(),2e4)),oe.dataset.gone="1",clearTimeout(E),delete w.dataset.shown,setTimeout(()=>(oe.remove(),w.remove()),1600))}X||ne?Y():(document.body.append(oe,w),E=setTimeout(()=>w.dataset.shown="1",MS*1e3),U.forEach(x=>document.addEventListener(x,Y,!0)),z.forEach(x=>document.addEventListener(x,F,{capture:!0,passive:!1}))),qn.push(()=>{clearTimeout(E),y(),R(),oe.remove(),w.remove()});let K=new URLSearchParams(location.search).get("quality"),ue=K==="low"?xr.tiers.length-1:0,Ee=K!=="full"&&K!=="low",Se={frames:[],windows:0,from:0};N.setQuality(ue),i.dataset.quality=String(ue);let fe=hg();w.append(Xe("span","",a.dataset.begin));let Be=Xe("div","labels");e.append(Be),qn.push(()=>Be.remove());let ce=S.map((x,L)=>{let $=Xe("div","tag");return $.innerHTML='<b></b><span></span><i class="leader"></i>',$.querySelector("b").textContent=q[L].time,$.querySelector("span").textContent=q[L].title,$.setAttribute("aria-hidden","true"),Be.append($),{node:$,leader:$.querySelector(".leader"),width:0,height:0,on:!1}}),me=Array.from({length:wg},()=>{let x=Xe("button","edge-mark");return x.type="button",x.hidden=!0,x.tabIndex=-1,x.setAttribute("aria-hidden","true"),x.innerHTML="<span></span><i></i>",Be.append(x),x.addEventListener("click",()=>lt(Pe(+x.dataset.memory))),{node:x,label:x.querySelector("span"),arrow:x.querySelector("i"),width:0,height:0}}),ge="",Ie=Array.from({length:Eg+1},()=>({x:0,y:0,visible:!0})),Pt=[],xt=(x,L,$,Te,Ue=1980,ct=0,Ct=-1)=>{let At=Xe("div",$,x);return At.setAttribute("aria-hidden","true"),Be.append(At),Pt.push({node:At,world:L,base:Te,year:Ue,kind:$,ring:ct,spotAt:Ct,width:0,height:0,shown:-1}),At},Ft=x=>new P(...x);xt(e.dataset.today,Ft(re.today),"ahead now",1,o,bg.today),Pt.at(-1).kind="ahead";let ln=[];b.list.forEach((x,L)=>{let $=t.querySelector(`#period-${p[L]} [data-station]`);if(!$)return;let[Te,Ue,ct]=x.centre,[Ct,At]=[Te+b.pole[0],Ue+b.pole[1]],qt=Math.hypot(Ct,At)||1,Ae=x.radius*.8+2,[Nt,fn]=Cr(x,Ct/qt*Ae,At/qt*Ae),[Tn,Di]=($.querySelector(".kicker")?.textContent??p[L]).split(" \xB7 "),Un=xt("",Ft([Te+Nt,Ue+fn,ct]),"galaxy",.9,(x.start+x.end)/2),qr=Xe("span","galaxy-hint",t.querySelector(`#period-${p[L]}`)?.dataset.hint??""),[Uc,...Er]=Tn.split(" / "),da=Xe("span","galaxy-title");da.append(Xe("span","galaxy-number",Uc),...Er.length?[Xe("span","galaxy-name",` / ${Er.join(" / ")}`)]:[]),Un.append(da,Xe("b","galaxy-count"),...Di?[Xe("span","galaxy-years",Di)]:[],qr,Xe("i","leader")),ln[L]=Pt.at(-1),ln[L].hint=qr,ln[L].leader=Un.querySelector(".leader"),ln[L].centre=Ft(x.centre),Un.dataset.go=`period-${p[L]}`,Un.addEventListener("click",yi=>{yi.stopImmediatePropagation(),mo(Ot===L?"top":Un.dataset.go)})});let ze=Array.from({length:Tg},()=>(xt("",new P,"ring-year",bd.quiet,1980),Pt.at(-1).dim=0,Pt.at(-1))),at=e.dataset.until?vo(e.dataset.until):-1;at>=0&&xt(xo(at,document.documentElement.lang),Ft(re.today.map((x,L)=>(x+re.book[L])/2)),"countdown-mark",.8,o);let ot=[["book",a.dataset.book,a.dataset.bookHint],["clone",a.dataset.clone,a.dataset.cloneHint]].map(([x,L,$],Te)=>{let Ue=xt(L,Ft(re[x]),"ahead",.6,1/0,bg[x],S.length+Te);return $&&Ue.append(Xe("span","ahead-hint",$)),Pt.at(-1)}),Yt=Xe("div","figure-name");Yt.setAttribute("aria-hidden","true");let Ut=Xe("span","figure-title"),cn=Xe("span","figure-count");Yt.append(Ut,cn),Be.append(Yt);let rt={key:"",chain:[],edges:[],option:null,width:0,height:0,shown:-1},bn=x=>{ot.forEach((L,$)=>{let Te=x===S.length+$;Te!==(L.node.dataset.hot==="1")&&(L.node.dataset.hot=Te?"1":"")}),N.setRingGlow(x>=S.length?x-S.length:-1)};document.querySelectorAll('.masthead nav a[data-go="book"], .masthead nav a[data-go="clone"]').forEach(x=>{let L=S.length+(x.dataset.go==="book"?0:1);x.addEventListener("pointerenter",()=>bn(L)),x.addEventListener("focus",()=>bn(L)),x.addEventListener("pointerleave",()=>bn(hn)),x.addEventListener("blur",()=>bn(hn))});let ke=Xe("aside","card");ke.setAttribute("tabindex","-1");let $t=Xe("div","card-body"),Gt=Xe("nav","card-steps"),zn=Xe("button","step",""),ci=Xe("button","step","");zn.type=ci.type="button",zn.dataset.step="previous",ci.dataset.step="next",Gt.append(zn,ci);let W=new Map,fi=Xe("p","visually-hidden");fi.setAttribute("role","status"),t.querySelectorAll(".waitlist").forEach(x=>{let L=Xe("div","card-form");L.hidden=!0,L.dataset.for=x.dataset.list;let[$,Te]=[x.parentNode,x.nextSibling];L.append(x),W.set(x.dataset.list,L),qn.push(()=>$.insertBefore(x,Te))});let Hn=Xe("button","card-close","\u2715");Hn.type="button",Hn.dataset.go="top",Hn.setAttribute("aria-label",a.dataset.overview),Hn.setAttribute("title",a.dataset.overview),ke.append(Hn,$t,...W.values(),Gt,fi),ke.id="card",e.after(ke),qn.push(()=>ke.remove());let ut=Xe("div","nudge");ut.hidden=!0;let Ht=Xe("a",""),dn=Xe("button","","\u2715");dn.type="button",ut.append(Ht,dn),Gt.before(ut);let Ve=[...t.querySelectorAll("a, button, input, select, textarea")];Ve.forEach(x=>x.setAttribute("tabindex","-1")),qn.push(()=>Ve.forEach(x=>x.removeAttribute("tabindex")));let Sr=document.querySelector(".skip");Sr&&(Sr.setAttribute("href","#card"),qn.push(()=>Sr.setAttribute("href","#main")));let jn=zm([...b.list.flatMap(x=>[[x.centre[0]-x.radius,x.centre[1]-x.radius],[x.centre[0]+x.radius,x.centre[1]+x.radius]]),re.today,re.book,re.clone].map(x=>[x[0],x[1]]),gs),Yn=Xe("div","minimap");Yn.hidden=!0,Yn.setAttribute("aria-hidden","true");let Mr=document.createElementNS(Ag,"svg");Mr.setAttribute("viewBox",`0 0 ${gs.width} ${gs.height}`);let Xi=(x,L)=>{let $=document.createElementNS(Ag,x);return Object.entries(L).forEach(([Te,Ue])=>$.setAttribute(Te,Ue)),Mr.append($),$};b.list.forEach(x=>{let[L,$]=jn.to(x.centre),Te=Array.from({length:48},(Ue,ct)=>jn.to(Cr(x,Math.sin(Math.PI*2*ct/48)*x.radius,Math.cos(Math.PI*2*ct/48)*x.radius).map((Ct,At)=>x.centre[At]+Ct)));Xi("polygon",{points:Te.map(([Ue,ct])=>`${Ue.toFixed(1)},${ct.toFixed(1)}`).join(" "),class:"mini-galaxy"})});let hi=S.map(x=>{let[L,$]=jn.to(x.position);return Xi("circle",{cx:L.toFixed(1),cy:$.toFixed(1),r:(.6+x.weight*.35).toFixed(2),class:"mini-dot"})}),wn=0;[re.book,re.clone].forEach(x=>{let[L,$]=jn.to(x);Xi("circle",{cx:L.toFixed(1),cy:$.toFixed(1),r:2,class:"mini-future"})});let An=Xi("polygon",{class:"mini-frame"}),br=Xi("circle",{r:3.4,class:"mini-here"});Yn.append(Mr),ke.after(Yn),qn.push(()=>Yn.remove()),Yn.addEventListener("click",x=>{let L=Yn.getBoundingClientRect(),$=jn.from([(x.clientX-L.left)*gs.width/L.width,(x.clientY-L.top)*gs.height/L.height]),Te=km(b.list,$);Te>=0&&mo(`period-${p[Te]}`)});let gn={related:a.dataset.related,earlier:a.dataset.earlier,later:a.dataset.later,filter:a.dataset.filter,unfilter:a.dataset.unfilter,more:a.dataset.more,lit:a.dataset.lit,all:a.dataset.all,fewer:a.dataset.fewer,nudgebook:a.dataset.nudgebook,nudgeclone:a.dataset.nudgeclone,nudgeclose:a.dataset.nudgeclose,periodstart:a.dataset.periodstart},ft=0,Ot=-1,qi=()=>Ot>=0?-1:we(ft),De=null,hn=-1,A={on:!1,over:0,away:0},H={links:[],near:[]},Z=[],te=!1,Q={x:0,y:0},pe={on:!1,seen:!1,from:null},Me={opened:new Set,sawClone:!1,closed:!1},we=x=>I.get(x)??-1,Pe=x=>M[x].t,Ye=x=>{let L=d[x];if(L.kind==="hero")return{previous:null,next:M[0].t};if(L.kind==="milestone"){let{previous:$,next:Te}=ym(S,we(x),De);return{previous:$!==null?Pe($):!De&&we(x)===0?0:null,next:Te!==null?Pe(Te):De?null:f}}return L.kind==="book"?{previous:M.at(-1).t,next:v}:L.kind==="clone"?{previous:f,next:g}:L.kind==="contact"?{previous:v,next:null}:{previous:null,next:null}},Ke=()=>{let x=qi();H=x>=0?_c(S,x):{links:[],near:[]};let L=[...H.links,...H.near];Z=x<0?[]:te?L:vm(S,x);let $=new Set(Z),Te=k?O.get(k):null,Ue=Te?bm(S,Te):Ot>=0?S.map(Ae=>Ae.period===Ot?vr.normal:vr.quiet):Mm(S,{selected:x,near:$,weak:new Set(L.filter(Ae=>!$.has(Ae))),filter:De});N.setLevels(Ue),e.dataset.levels=[...new Set(Ue)].sort((Ae,Nt)=>Ae-Nt).join(","),N.setLinks(H.links.filter(Ae=>$.has(Ae)),H.near.filter(Ae=>$.has(Ae))),N.setSelection(x);let ct=Ot>=0?Ot:x>=0?S[x].period:-1;fe.age(ct);let Ct=(!pe.on||Ot>=0)&&ct>=0?Vd(b.list[ct],Tg):[],At=ct>=0?b.list[ct]:null;N.setYearRings(At?.centre??null,Ct,At??{}),ze.forEach((Ae,Nt)=>{let fn=Ct[Nt];if(Ae.dim=fn?1:0,!fn)return;Ae.node.textContent=String(fn.year),Ae.base=x>=0&&fn.year===Math.floor(S[x].year)?bd.current:bd.quiet;let[Tn,Di]=Cr(At,fn.radius*Math.sin(Rg),fn.radius*Math.cos(Rg));Ae.world.set(At.centre[0]+Tn,At.centre[1]+Di,At.centre[2]),Ae.width=0}),N.setFocus(x>=0?S[x].year:null),N.setFilter(De);let qt=ao(S,De);if(N.setJumps(Te?Tm(Te,N.slotOf("clone")):rt.edges,!Te),b){let Ae=Im(S,qt,b.list.length);ln.forEach((Nt,fn)=>{Nt&&(Nt.dim=ct>=0&&ct!==fn||["book","clone"].includes(d[ft].kind)?0:De&&!Ae[fn]?.3:1,Nt.pin=ct===fn,Nt.node.dataset.pin=Nt.pin?"1":"",Nt.pin?Nt.node.setAttribute("title",a.dataset.overview):Nt.node.removeAttribute("title"),Nt.hint.hidden=x>=0||!!De,Nt.node.querySelector(".galaxy-count").textContent=De?` \xB7 ${Ae[fn]}`:"",Nt.width=0)})}},tt=x=>{let L=d[x];if(Ot>=0){let $=b.list[Ot];return N.fly({target:$.centre,distance:Ln($.radius*4.2+16,40,130),pitch:Ln(N.goal.pitch,-.45,.5)}),N.setIdle(!1)}if(L.kind==="milestone"){let $=S[we(x)],Te=b.list[$.period];N.fly({target:Te.centre.map((Ue,ct)=>Ue+($.position[ct]-Ue)*.35),distance:Ln(Te.radius*4.2+16,40,130),pitch:Ln(N.goal.pitch,-.45,.5)})}else L.kind==="book"||L.kind==="clone"?N.fly({target:re[L.kind],distance:54,pitch:Ln(N.goal.pitch,-.45,.5)}):L.kind==="contact"?N.fly({target:[0,0,-7],distance:N.homeDistance(),yaw:0,pitch:Sd}):N.home();N.setIdle(L.kind==="hero")},Le=x=>x.querySelectorAll("li[data-ask]").forEach(L=>{let $=Xe("button","ask-q",L.querySelector(".ask-q").textContent);$.type="button",$.dataset.ask=L.dataset.ask,$.setAttribute("aria-pressed",String(k===L.dataset.ask)),L.replaceChildren($)}),dt=x=>{if(k=x&&O.has(x)&&d[ft].kind==="clone"?x:null,e.dataset.asked=k??"",ke.querySelectorAll(".ask-q").forEach($=>$.setAttribute("aria-pressed",String($.dataset.ask===k))),Ke(),!k)return tt(ft);N.fly({target:[0,0,-7],distance:N.homeDistance(),yaw:0,pitch:Sd});let L=[...O.get(k)].map($=>M[$].element.querySelector("h3").textContent);fi.textContent=gn.lit.replace("{n}",()=>String(L.length)).replace("{names}",()=>L.join(", "))},pn=x=>x.querySelectorAll("ul.facets").forEach(L=>{let $=L.dataset.facet;L.querySelectorAll("li").forEach(Te=>{let Ue=Xe("button","chip",Te.textContent);Ue.type="button",Ue.dataset.facet=$,Ue.dataset.item=Te.dataset.item,Ue.setAttribute("aria-pressed",String(De?.facet===$&&c[$][De.item]===Te.dataset.item)),Ue.setAttribute("title",gn.filter.replace("{thread}",Te.textContent)),Te.replaceChildren(Ue)})}),zt=(x,L)=>{let $=[...H.links,...H.near];if(!$.length)return;let Te=rd(S,L),Ue=te?$.slice(0,Mg):Te,ct=Xe("div","related");ct.append(Xe("p","kicker",gn.related));let Ct=Xe("ul");if(Ue.forEach(At=>{let qt=Xe("li"),Ae=Xe("button","peer");Ae.type="button",Ae.dataset.memory=String(At),Ae.append(Xe("time","",q[At].time),Xe("span","",q[At].title)),qt.append(Ae),Ct.append(qt)}),Ct.addEventListener("scroll",()=>tn()),ct.append(Ct),$.length>Te.length){let At=Xe("button","expander",te?gn.fewer:gn.all.replace("{n}",String(Math.min($.length,Mg))));At.type="button",At.setAttribute("aria-expanded",String(te)),ct.append(At)}x.append(ct)},Wt=()=>{let x=$t.firstElementChild,L=qi();!x||L<0||(x.querySelector(".related")?.remove(),zt(x,L),ke.dataset.collapsed=x.querySelector(".expander")&&!te?"1":"",tn(),$t.querySelector(".expander")?.focus({preventScroll:!0}))},gt=Xe("p","more-cue",a.dataset.continues??"");gt.setAttribute("aria-hidden","true"),ke.append(gt);let Bt=()=>{let x=$t.scrollHeight>$t.clientHeight+4&&$t.scrollTop+$t.clientHeight<$t.scrollHeight-4,L=x?"1":"";ke.dataset.overflow!==L&&(ke.dataset.overflow=L),x&&(gt.style.bottom=`${(Gt.hidden?0:Gt.offsetHeight)+10}px`)};$t.addEventListener("scroll",Bt,{passive:!0});let tn=()=>{Bt();let x=ke.querySelector(".related"),L=x?.querySelector("ul");if(!L)return;let $=L.getBoundingClientRect().bottom+2,Te=[...L.children].filter(Ue=>Ue.getBoundingClientRect().bottom>$).length;x.dataset.more=L.scrollHeight>L.clientHeight+2&&Te?gn.more.replace("{n}",String(Te)):""},$e=-1,qe=x=>{$e!==x&&($e=x,N.setPreview(x))},Rn=()=>{if(delete ke.dataset.fit,!!IS.has(ke.dataset.kind)){ke.classList.add("measure");for(let x of PS){if(ke.scrollHeight<=ke.clientHeight)break;ke.dataset.fit=x}ke.classList.remove("measure")}},Tr=()=>{let x=d[ft],L=x.panel.cloneNode(!0);["data-station","data-panel","id"].forEach(Ae=>L.removeAttribute(Ae)),L.querySelectorAll("[id]").forEach(Ae=>Ae.removeAttribute("id")),[...L.children].forEach(Ae=>Ae.matches(".kicker, .period-head")||Ae.remove()),L.querySelectorAll("h1, h2, h3").forEach(Cg);let $=Xe("button","period-start",gn.periodstart.replace("{title}",()=>x.element.querySelector("h3")?.textContent??""));$.type="button",$.dataset.go=x.id;let Te=S.filter(Ae=>Ae.period===Ot),Ue=[[Te.length,a.dataset.countMemories],[new Set(Te.flatMap(Ae=>Ae.members.people??[])).size,a.dataset.countPeople],[new Set(Te.flatMap(Ae=>Ae.members.places??[])).size,a.dataset.countPlaces]].filter(([Ae,Nt])=>Ae>0&&Nt).map(([Ae,Nt])=>Nt.replace("{n}",String(Ae))),ct=Xe("div","related"),Ct=Xe("ul");S.forEach((Ae,Nt)=>{if(Ae.period!==Ot)return;let fn=Xe("li"),Tn=Xe("button","peer");Tn.type="button",Tn.dataset.memory=String(Nt),Tn.append(Xe("time","",q[Nt].time),Xe("span","",q[Nt].title)),fn.append(Tn),Ct.append(fn)}),ct.append(Ct),L.append(Xe("p","period-facts kicker",Ue.join(" \xB7 ")),$,ct),qe(-1),$t.replaceChildren(L),ke.dataset.collapsed="",ke.dataset.kind="period",W.forEach(Ae=>Ae.hidden=!0);let At=Ae=>Ae>=0&&Ae<p.length&&S.some(Nt=>Nt.period===Ae)?Ae:null,qt=(Ae,Nt,fn)=>{Ae.hidden=Nt===null,Ae.dataset.to="",Ae.dataset.periodTo=Nt??"",Ae.textContent=fn};qt(zn,At(Ot-1),`\u2190 ${gn.earlier}`),qt(ci,At(Ot+1),`${gn.later} \u2192`),Gt.hidden=zn.hidden&&ci.hidden,Hn.hidden=!1,Fe.running=!1,Fe.year=null,N.setReveal(null),je()},V=()=>{if(Ot>=0)return Tr(),requestAnimationFrame(Bt);let x=d[ft],L=x.panel.cloneNode(!0);L.removeAttribute("data-station"),L.removeAttribute("data-panel"),L.removeAttribute("id"),L.querySelectorAll("[id]").forEach(Ct=>Ct.removeAttribute("id")),L.querySelectorAll("[tabindex]").forEach(Ct=>Ct.removeAttribute("tabindex")),L.querySelectorAll("h1, h2, h3").forEach(Cg),pn(L),Le(L);let $=qi();$>=0&&zt(L,$),x.kind==="milestone"&&L.querySelector(".period-head")?.remove(),qe(-1),$t.replaceChildren(L),ke.dataset.collapsed=L.querySelector(".expander")&&!te?"1":"",ke.dataset.kind=x.kind,W.forEach((Ct,At)=>Ct.hidden=x.kind!==At);let{previous:Te,next:Ue}=Ye(ft),ct=(Ct,At,qt)=>{Ct.hidden=At===null,Ct.dataset.to=At??"",Ct.textContent=qt};ct(zn,Te,`\u2190 ${gn.earlier}`),ct(ci,Ue,`${gn.later} \u2192`),Gt.hidden=x.kind==="hero"||Te===null&&Ue===null,Hn.hidden=x.kind==="hero",Rn(),tn(),ke.classList.remove("live"),ke.offsetWidth,ke.classList.add("live"),ke.scrollTop=0,ge="",x.kind!=="hero"&&W.get(x.kind)?.scrollIntoView({block:"nearest"}),kt||(fi.textContent=x.label),Ze()},se=()=>{let x=d[ft];return x.kind==="hero"?si.start:x.kind==="milestone"?S[we(ft)].year:{book:si.book,clone:si.clone}[x.kind]??si.end},xe=()=>{let x=d[ft],L=!Me.closed&&Me.opened.size>=3&&x.kind==="milestone"&&Ot<0&&!x.element.dataset.quiet;if(ut.hidden=!L,!L)return;let $=Me.sawClone?"clone":"book";Ht.dataset.go=$,Ht.href=`#${$}`,Ht.textContent=gn[$==="clone"?"nudgeclone":"nudgebook"],dn.setAttribute("aria-label",gn.nudgeclose),dn.setAttribute("title",gn.nudgeclose)};dn.addEventListener("click",()=>{Me.closed=!0,xe(),ke.focus({preventScroll:!0})});let Ze=()=>{let x=ke.getBoundingClientRect(),L=Math.max(Md,a.getBoundingClientRect().bottom+6);Td.matches?N.setInset(0,(L+Math.max(L+120,x.top))/2-innerHeight/2):N.setInset((x.right+innerWidth)/2-innerWidth/2,(L+innerHeight-yS)/2-innerHeight/2)},Qe=r?.querySelector("[data-play]"),Fe={running:!1,year:null,from:0},je=()=>{if(!Qe)return;Qe.setAttribute("aria-pressed",String(Fe.running));let x=Fe.running?Qe.dataset.pauseLabel:Qe.dataset.playLabel;Qe.setAttribute("aria-label",x),Qe.setAttribute("title",x),Qe.querySelector(".rail-name").textContent=Fe.running?Qe.dataset.pauseName:Qe.dataset.playName,r.dataset.playing=Fe.year===null?"":Fe.running?"1":"paused"},Zt=()=>{Fe.year!==null&&(Fe.running=!1,Fe.year=null,N.setReveal(null),je())},kt=!1,lt=(x,{push:L=!0,hush:$=!1}={})=>{kt=$,Zt();let Te=Ot>=0||d[ft].kind!=="hero";ft=Ln(x,0,u),Ot=-1,e.dataset.period="",k=null,te=!1,e.dataset.asked="",De&&Te&&d[ft].kind==="hero"&&Ce(null),d[ft].kind==="milestone"&&!pe.seen&&(pe.seen=!0,pe.on=!0,pe.from={...Q},e.dataset.gentle="1");let Ue=d[ft];if(document.documentElement.dataset.at=ft,n.textContent=Ue.label,Ke(),tt(ft),d[ft].kind==="milestone"&&!$&&Me.opened.add(ft),d[ft].kind==="clone"&&(Me.sawClone=!0),V(),xe(),r&&r.querySelector(".rail-cursor")?.style.setProperty("--x",`${Ms(se()).toFixed(2)}%`),Ue.kind==="milestone"?fe.memory(S[we(ft)]):(Ue.kind==="book"||Ue.kind==="clone")&&fe.swell(Ue.kind),L)try{history.replaceState(null,"",Ue.kind!=="hero"?`#${Ue.id}`:De?`#${sd(De.facet,c[De.facet][De.item])}`:`${location.pathname}${location.search}`)}catch{return}},_n=(x,{push:L=!0}={})=>{let $=S.findIndex(Te=>Te.period===x);if(!($<0)&&(kt=!1,Zt(),ft=Pe($),Ot=x,k=null,te=!1,e.dataset.asked="",e.dataset.period=p[x],document.documentElement.dataset.at=ft,n.textContent=d[ft].element.querySelector(".kicker")?.textContent??"",Ke(),tt(ft),V(),xe(),r?.querySelector(".rail-cursor")?.style.setProperty("--x",`${Ms(se()).toFixed(2)}%`),fe.memory(S[xm(S,x,1)[0]]),L))try{history.replaceState(null,"",`#period-${p[x]}`)}catch{return}},Ce=x=>{De=x;let L=De?`${De.facet}:${De.item}`:"";if(L!==rt.key){let $=ao(S,De),Te=Rm(S,$);Object.assign(rt,{key:L,chain:$,edges:vc(S,$,Ue=>N.centerOf(Ue).toArray()),option:null,width:0,height:0}),Ut.textContent=De?D[De.facet][c[De.facet][De.item]]??"":"",cn.textContent=$.length?Cm(Te,{one:a.dataset.countMemory,many:a.dataset.countMemories}):""}if(a.querySelectorAll(".legend button").forEach($=>{let Te=$.closest(".legend").dataset.facet;$.setAttribute("aria-pressed",String(!!De&&De.facet===Te&&c[Te][De.item]===$.dataset.item))}),ke.querySelectorAll(".chip").forEach($=>$.setAttribute("aria-pressed",String(!!De&&De.facet===$.dataset.facet&&c[$.dataset.facet][De.item]===$.dataset.item))),e.dataset.filter=De?`${De.facet}:${c[De.facet][De.item]}`:"",Lt.hidden=!De,_i.dataset.active=De?"1":"",_i.setAttribute("aria-label",De?`${_s} \xB7 ${D[De.facet][c[De.facet][De.item]]??""}`:_s),De&&(Lt.textContent=`\u2715 ${D[De.facet][c[De.facet][De.item]]??""}`,Lt.setAttribute("aria-label",`${gn.unfilter}: ${D[De.facet][c[De.facet][De.item]]??""}`)),d[ft].kind==="hero"&&Ot<0)try{history.replaceState(null,"",De?`#${sd(De.facet,c[De.facet][De.item])}`:`${location.pathname}${location.search}`)}catch{}Ke(),d[ft].kind==="milestone"&&Ot<0&&V()},Lt=a.querySelector("[data-unfilter]");Lt.addEventListener("click",()=>Ce(null));let Tt=(x,L)=>{let $=c[x].indexOf(L);Ce(De?.facet===x&&De.item===$?null:{facet:x,item:$})};a.querySelectorAll(".legend button").forEach(x=>x.addEventListener("click",()=>Tt(x.closest(".legend").dataset.facet,x.dataset.item)));let vn=[...a.querySelectorAll(".legend")];vn.forEach(x=>x.hidden=!1),qn.push(()=>vn.forEach(x=>x.hidden=!0));let mi=a.querySelector("[data-legend-toggle]");mi?.addEventListener("click",()=>{let x=a.dataset.legend!=="open";x&&Ni(!1),a.dataset.legend=x?"open":"",mi.setAttribute("aria-expanded",String(x)),Ze()}),e.dataset.filter="";let Xt=a.querySelector(".finder"),Cn=Xt.querySelector("input"),Et=Xt.querySelector(".results"),Mn=Xt.querySelector(".none"),Nn=a.querySelector("[data-find]"),nn=Xt.querySelector(".preview"),xn=x=>{nn.dataset.on=x>=0?"1":"",!(x<0)&&(nn.querySelector("time").textContent=q[x].time,nn.querySelector("strong").textContent=q[x].title,nn.querySelector("p").textContent=q[x].body.match(/^.*?[.!?](?=\s|$)/)?.[0]??q[x].body)},rn=x=>{let L=x.target.closest?.(".peer[data-memory]"),$=L&&Xt.contains(L)?+L.dataset.memory:-1;xn($),qe($)},kn=x=>{let L=Xe("li"),$=Xe("button","peer");return $.type="button",$.dataset.memory=String(x),$.append(Xe("time","",q[x].time),Xe("span","",q[x].title)),L.append($),L},ui=()=>Et.replaceChildren(...[...t.querySelectorAll("section.period")].flatMap(x=>{let L=[...x.querySelectorAll("[data-station='milestone']")].map(Te=>we(d.findIndex(Ue=>Ue.element===Te))),$=Xe("li","group",x.querySelector(".kicker")?.textContent??"");return $.setAttribute("aria-hidden","true"),[$,...L.map(kn)]})),un=x=>{Xt.hidden=!x,Nn.setAttribute("aria-expanded",String(x)),x?(Cn.value.trim()||ui(),gi.hidden||Ni(!1),Cn.focus()):(xn(-1),qe(-1),Xt.contains(document.activeElement)&&document.activeElement.blur(),Cn.value="",Et.replaceChildren(),Mn.textContent="")};Nn.addEventListener("click",()=>un(Xt.hidden)),Xt.addEventListener("focusin",rn),Et.addEventListener("pointerover",rn),Et.addEventListener("pointerleave",()=>{(!Xt.contains(document.activeElement)||document.activeElement===Cn)&&(xn(-1),qe(-1))}),Cn.addEventListener("input",()=>{let x=id(ee,Cn.value),L=Sm(S,c,D,Cn.value);Et.replaceChildren(...L.map($=>{let Te=Xe("li"),Ue=Xe("button","peer show");return Ue.type="button",Ue.dataset.facet=$.facet,Ue.dataset.item=c[$.facet][$.item],Ue.append(Xe("time","",String($.count)),Xe("span","",gn.filter.replace("{thread}",$.title))),Te.append(Ue),Te}),...x.map($=>kn($.index))),Cn.value.trim()||ui(),Mn.textContent=Cn.value.trim()&&!x.length&&!L.length?Mn.dataset.none:""}),Xt.addEventListener("submit",x=>{x.preventDefault(),Et.querySelector("button")?.click()}),Et.addEventListener("click",x=>{let L=x.target.closest("button");if(L){if(un(!1),L.dataset.facet){let $=c[L.dataset.facet].indexOf(L.dataset.item);return Ce(De?.facet===L.dataset.facet&&De.item===$?De:{facet:L.dataset.facet,item:$})}lt(Pe(+L.dataset.memory)),ke.focus({preventScroll:!0})}}),Xt.addEventListener("keydown",x=>{if(x.key==="ArrowDown"||x.key==="ArrowUp"){let L=[...Et.querySelectorAll("button")];if(!L.length)return;x.preventDefault();let $=L.indexOf(document.activeElement);L[Ln($+(x.key==="ArrowDown"?1:-1),0,L.length-1)]?.focus(),$===0&&x.key==="ArrowUp"&&Cn.focus()}}),a.querySelector("[data-surprise]").addEventListener("click",()=>{let x=we(ft),L=x;for(;L===x&&S.length>1;)L=Math.floor(Math.random()*S.length);lt(Pe(L))});let gi=a.querySelector(".guide"),or=a.querySelector("[data-guide-toggle]"),Ni=x=>{gi.hidden=!x,or.setAttribute("aria-expanded",String(x)),x&&(un(!1),a.dataset.legend="",mi?.setAttribute("aria-expanded","false"))};or.addEventListener("click",()=>Ni(gi.hidden)),Nn.addEventListener("click",()=>!Xt.hidden&&Ni(!1));let _i=a.querySelector("[data-more-toggle]"),_s=_i.getAttribute("aria-label"),vi=x=>{a.dataset.sheet=x?"open":"",_i.setAttribute("aria-expanded",String(x))};_i.addEventListener("click",()=>vi(a.dataset.sheet!=="open"));let vs=a.querySelector(".sheet");vs.addEventListener("click",x=>{let L=x.target.closest("button, a");if(!L||L.matches(".lang"))return L&&vi(!1);vi(!1),((L.matches("[data-legend-toggle]")?a.querySelector(".legend button"):_i)??_i).focus()}),vs.addEventListener("focusout",x=>a.dataset.sheet==="open"&&!vs.contains(x.relatedTarget)&&x.relatedTarget!==_i&&vi(!1));let ca=x=>a.dataset.sheet==="open"&&!x.target.closest(".sheet, [data-more-toggle]")&&vi(!1);document.addEventListener("pointerdown",ca),i.addEventListener("pointerdown",()=>Ni(!1)),qn.push(()=>document.removeEventListener("pointerdown",ca));let ye=a.querySelector("[data-sound]");if(fe.supported){ye.hidden=!1,ye.setAttribute("aria-pressed","true"),ye.addEventListener("click",()=>ye.setAttribute("aria-pressed",String(fe.toggle())));let x=Ue=>{if(fe.running())return $();Ue.target.closest?.("[data-sound]")||fe.start()},L=["pointerup","touchend","click","keydown"],$=()=>L.forEach(Ue=>document.removeEventListener(Ue,x,!0));L.forEach(Ue=>document.addEventListener(Ue,x,!0));let Te=()=>fe.pause(document.hidden);document.addEventListener("visibilitychange",Te),qn.push(()=>{$(),document.removeEventListener("visibilitychange",Te),fe.close(),ye.setAttribute("aria-pressed","false"),ye.hidden=!0})}let yt=Xe("p","visually-hidden");yt.setAttribute("role","status"),e.append(yt);let Dn=null,Wn=()=>document.documentElement.dataset.focus==="1",Vn=x=>{document.documentElement.dataset.focus=x?"1":"",yt.textContent=x?a.dataset.focusNote:"",Dn=x?{...Q}:null,x&&(Ni(!1),vi(!1),un(!1))},ha=()=>Wn()&&Vn(!1),ua=()=>{pe.on&&(pe.on=!1,e.dataset.gentle="",Ke())},po=performance.now()/1e3,Ic=()=>po=performance.now()/1e3,Pg=x=>{Q.x=x.clientX,Q.y=x.clientY,Dn&&Math.hypot(Q.x-Dn.x,Q.y-Dn.y)>12&&ha(),pe.on&&Math.hypot(Q.x-pe.from.x,Q.y-pe.from.y)>12&&ua(),Math.abs(x.movementX)+Math.abs(x.movementY)>6&&Ic()},Pc=()=>{ha(),ua(),Ic()},wd=[["pointermove",Pg],["pointerdown",Pc],["wheel",Pc],["touchstart",Pc]];wd.forEach(([x,L])=>addEventListener(x,L,{passive:!0})),qn.push(()=>{wd.forEach(([x,L])=>removeEventListener(x,L)),delete document.documentElement.dataset.focus});let Lg=jm(S),Lc={phase:"waiting",step:0,at:0};ke.addEventListener("pointerover",x=>{let L=x.target.closest(".related .peer");qe(L?+L.dataset.memory:-1)}),ke.addEventListener("pointerleave",()=>qe(-1)),ke.addEventListener("focusin",x=>{let L=x.target.closest(".related .peer");L&&qe(+L.dataset.memory)}),ke.addEventListener("focusout",()=>qe(-1)),ke.addEventListener("click",x=>{let L=x.target.closest(".chip");if(L)return Tt(L.dataset.facet,L.dataset.item);if(x.target.closest(".expander"))return te=!te,Ke(),Wt();let Te=x.target.closest(".ask-q");if(Te)return dt(k===Te.dataset.ask?null:Te.dataset.ask);let Ue=x.target.closest(".peer");if(Ue)return lt(Pe(+Ue.dataset.memory)),ke.focus({preventScroll:!0});let ct=x.target.closest(".step");if(ct&&ct.dataset.periodTo)return _n(+ct.dataset.periodTo),ke.focus({preventScroll:!0});if(ct&&ct.dataset.to!=="")return lt(+ct.dataset.to),ke.focus({preventScroll:!0});let Ct=x.target.closest("[data-go]");Ct&&Xr.has(Ct.dataset.go)&&(x.preventDefault(),mo(Ct.dataset.go))});let Xr=new Map(d.map(x=>[x.id,x.t])),fo=new Map(p.map((x,L)=>[`period-${x}`,L]));document.querySelectorAll("section.period").forEach(x=>{let L=x.querySelector("[data-station]");Xr.set(x.id,d.findIndex($=>$.element===L))});let mo=x=>{if(!Xr.has(x))return;if(fo.has(x))return _n(fo.get(x));let L=Xr.get(x);lt(L),d[L].kind!=="hero"&&W.get(d[L].kind)?.querySelector("input, a, button")?.focus()},Nc=()=>{let x;try{x=decodeURIComponent(location.hash.slice(1))}catch{return}if(!x)return lt(0,{push:!1});if(C||Y(),fo.has(x))return _n(fo.get(x),{push:!1});let L=wm(x,c);if(L)return(d[ft].kind!=="hero"||Ot>=0)&&lt(0,{push:!1}),Ce(L);Xr.has(x)&&lt(Xr.get(x),{push:!1})};document.querySelectorAll("[data-go]").forEach(x=>x.addEventListener("click",L=>{ke.contains(x)||!Xr.has(x.dataset.go)||(L.preventDefault(),mo(x.dataset.go))})),addEventListener("hashchange",Nc),qn.push(()=>removeEventListener("hashchange",Nc)),t.addEventListener("focusin",x=>{let L=d.find($=>$.element.contains(x.target));L&&L.t!==ft&&lt(L.t)});let Ad={hero:_,book:f,clone:v};W.forEach((x,L)=>x.addEventListener("focusin",()=>ft!==Ad[L]&&lt(Ad[L])));let Rd={ArrowDown:1,ArrowRight:1,PageDown:1," ":1,ArrowUp:-1,ArrowLeft:-1,PageUp:-1},Cd=x=>{if(!(x.metaKey||x.ctrlKey||x.altKey)&&(Ic(),ua(),!(Wn()&&x.key.toLowerCase()!=="h"&&(Vn(!1),x.key==="Escape")))){if(x.key==="Escape"){if(!gi.hidden)Ni(!1),or.focus();else if(a.dataset.sheet==="open")vi(!1),_i.focus();else if(!Xt.hidden)un(!1),Nn.focus();else{if(x.target.closest("input, textarea, select"))return;k?dt(null):De?Ce(null):ft!==0&&lt(0)}return}if(!x.target.closest("input, textarea, select, .finder")){if(x.key==="/")return x.preventDefault(),un(!0);if(x.key==="?")return x.preventDefault(),Ni(gi.hidden);if(x.key.toLowerCase()==="h")return x.preventDefault(),x.repeat?void 0:Vn(!Wn());if(!(x.key===" "&&x.target.closest("button, a, summary, [role='button']"))){if(x.key==="Home")x.preventDefault(),lt(0);else if(x.key==="End")x.preventDefault(),lt(g);else if(x.key in Rd){x.preventDefault();let L=x.key===" "&&x.shiftKey?-1:Rd[x.key],{previous:$,next:Te}=Ye(ft),Ue=L>0?Te:$;Ue!==null&&lt(Ue)}}}}};addEventListener("keydown",Cd),qn.push(()=>removeEventListener("keydown",Cd)),N.on("hover",x=>{if(x>=0&&x!==hn&&fe.tick(),hn=x,ke.querySelectorAll(".peer[data-lit]").forEach(L=>delete L.dataset.lit),x>=0){let L=ke.querySelector(`.related .peer[data-memory="${x}"]`);if(L){L.dataset.lit="1";let $=L.closest("ul");L.offsetTop<$.scrollTop?$.scrollTop=L.offsetTop:L.offsetTop+L.offsetHeight>$.scrollTop+$.clientHeight&&($.scrollTop=L.offsetTop+L.offsetHeight-$.clientHeight)}}N.setHover(x),bn(x),i.style.cursor=x>=0?"pointer":""});let Ng=x=>x===S.length?f:x===S.length+1?v:-1;N.on("click",x=>{x>=0&&lt(x<S.length?Pe(x):Ng(x))});let Id=d.filter(x=>["milestone","book","clone"].includes(x.kind)),Dc=d.map(x=>x.kind==="milestone"?S[we(x.t)].year:{hero:si.start,book:si.book,clone:si.clone}[x.kind]??si.end);if(r){let x=r.querySelector(".rail-track"),L=r.querySelector(".rail-tip");r.querySelector(".rail-today")?.style.setProperty("--x",`${Ms(o).toFixed(2)}%`);let $=qt=>{let Ae=x.getBoundingClientRect();return si.start+Ln((qt.clientX-Ae.left)/Ae.width,0,1)*(si.end-si.start)},Te=qt=>Id.reduce((Ae,Nt)=>Math.abs(Dc[Nt.t]-qt)<Math.abs(Dc[Ae.t]-qt)?Nt:Ae,Id[0]),Ue=qt=>`${qt.element.querySelector("time")?.textContent??""} \xB7 ${qt.element.querySelector("h3, h2")?.textContent??""}`.replace(/^ · /,""),ct=!1,Ct=-1,At=qt=>{let Ae=Te($(qt));return L.textContent=Ue(Ae),L.style.setProperty("--x",`${Ms(Dc[Ae.t]).toFixed(2)}%`),L.dataset.on="1",Ae};x.addEventListener("pointerdown",qt=>{ct=!0,x.setPointerCapture(qt.pointerId);let Ae=At(qt);Ct=Ae.t,lt(Ae.t)}),x.addEventListener("pointermove",qt=>{let Ae=At(qt);ct&&Ae.t!==Ct&&(Ct=Ae.t,lt(Ae.t))}),x.addEventListener("pointerup",()=>ct=!1),x.addEventListener("pointerleave",()=>L.dataset.on="")}Qe?.addEventListener("click",()=>{if(Fe.running)return Fe.running=!1,je();Fe.year===null&&(ft!==0&&lt(0),Fe.year=1980),Fe.running=!0,Fe.from=performance.now()/1e3-ip(Fe.year,o),je()});let Dg=()=>{let x=[ke,a,n,r].filter(Boolean).map($=>$.getBoundingClientRect()),L=Xt.hidden?null:Xt.getBoundingClientRect();return L&&x.push(L),x},xi=(x,L)=>x.left<L.right&&x.right>L.left&&x.top<L.bottom&&x.bottom>L.top;N.on("frame",({formed:x,projected:L,camera:$,cssScale:Te,time:Ue,dt:ct,intro:Ct,entered:At,seen:qt})=>{if(oe.isConnected){let G=L[he];oe.style.left=`${G.x}px`,oe.style.top=`${G.y}px`,oe.style.visibility=G.on?"visible":"hidden"}if(le&&(Number.isFinite(x)&&b.list.forEach((G,He)=>{if(Ne.has(He)||x<G.start)return;Ne.add(He);let bt=S.findIndex(Ge=>Ge.year>=G.start-.01);bt>=0&&fe.memory({...S[bt],period:-1})}),At&&be()),Ee&&Se.windows<xr.windows&&Ct>=1&&!document.hidden&&(Se.from||(Se.from=Ue+1),Ue>=Se.from&&(Se.frames.push(Hm(ct*1e3)),Se.frames.length>=xr.window))){let G=qm(ue,Xm(Se.frames));Se.frames=[],Se.windows++,G!==ue&&(ue=G,N.setQuality(ue),i.dataset.quality=String(ue))}let Ae=performance.now()/1e3,Nt=!document.hidden&&Xt.hidden&&gi.hidden&&a.dataset.sheet!=="open"&&!De&&Fe.year===null&&!Wn()&&!document.activeElement?.closest?.("input, textarea, select, button, a, .finder, .card, .masthead, .rail")&&!ke.matches(":hover"),fn=Ym(Lc,{now:Ae,idleSince:Math.max(po,j),eligible:C&&Nt&&(Lc.phase==="touring"||ft===0),plan:Lg},{wait:+a.dataset.idle||20,hold:+a.dataset.tourHold||6});Lc=fn.state,fn.open?.age!==void 0?_n(fn.open.age,{push:!1}):fn.open?lt(fn.open.ahead==="book"?f:v,{push:!1,hush:!0}):fn.done&&lt(0,{push:!1,hush:!0}),Fe.running&&(Fe.year=np(performance.now()/1e3-Fe.from,o),N.setReveal(Fe.year),r.querySelector(".rail-cursor")?.style.setProperty("--x",`${Ms(Fe.year).toFixed(2)}%`),n.textContent=String(Math.floor(Fe.year)),Fe.year>=o&&(Zt(),n.textContent=d[ft].label)),A.over=hn>=0?A.over+ct:0,A.away=hn>=0?0:A.away+ct,A.over>.35?A.on=!0:A.away>.8&&(A.on=!1);let Tn=qi(),Di=N.view.distance/N.homeDistance(),Un=Dg().map(G=>({left:G.left-12,right:G.right+12,top:G.top-12,bottom:G.bottom+12}));Un.push({left:0,right:innerWidth,top:0,bottom:Math.max(Md,(s?.getBoundingClientRect().bottom??0)+4)},{left:0,right:innerWidth,top:innerHeight-60,bottom:innerHeight});let qr=[],Uc=Td.matches,Er=!pe.on&&Vm(Di,innerWidth,520,!Uc||ke.getBoundingClientRect().top>=gs.top+gs.height+8),da=Er?"on":"off";e.dataset.map!==da&&(e.dataset.map=da),Yn.hidden===Er&&(Yn.hidden=!Er);let yi=Er?Yn.getBoundingClientRect():null;if(Er&&Tn>=0){let G=S[Tn].position[2];wn++%8===0&&hi.forEach((mt,yn)=>{let jt=N.centerOf(yn),[nt,Jt]=jn.to([jt.x,jt.y]);mt.setAttribute("cx",nt.toFixed(1)),mt.setAttribute("cy",Jt.toFixed(1))}),An.setAttribute("points",[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([mt,yn])=>jn.to(N.groundAt(mt,yn,G)).map(jt=>jt.toFixed(1)).join(",")).join(" "));let He=N.centerOf(Tn),[bt,Ge]=jn.to([He.x,He.y]);br.setAttribute("cx",bt.toFixed(1)),br.setAttribute("cy",Ge.toFixed(1))}yi&&(Un.push({left:yi.left-8,right:yi.right+8,top:yi.top-8,bottom:yi.bottom+8}),qr.push(yi));let Ld=new Map,Nd=[],Oc=[];if(Tn>=0&&Fe.year===null&&!De){let G=ke.getBoundingClientRect(),He=Td.matches,bt={left:He?12:G.right+12,right:innerWidth-12,top:Math.max(Md,a.getBoundingClientRect().bottom+6),bottom:Math.min((r?.getBoundingClientRect().top??innerHeight-100)-8,He?G.top-8:1/0)},Ge=L[Tn],mt=Math.min(innerWidth,innerHeight)/2,yn=Ge&&Ge.x>=bt.left&&Ge.x<=bt.right&&Ge.y>=bt.top&&Ge.y<=bt.bottom?{left:Math.max(bt.left,Ge.x-mt),right:Math.min(bt.right,Ge.x+mt),top:Math.max(bt.top,Ge.y-mt),bottom:Math.min(bt.bottom,Ge.y+mt)}:bt;Z.slice(0,RS).forEach(nt=>{let Jt=Ie.map((Kt,Vt)=>N.arcScreen(Tn,nt,Vt/Eg,Kt)),St=Um(Jt,yn),st=L[nt]?.on&&!xi({left:L[nt].x,right:L[nt].x,top:L[nt].y,bottom:L[nt].y},G);St&&!st&&Nd.push({j:nt,...St})});let jt=Nd.slice(0,wg).map((nt,Jt)=>{let St=me[Jt],st=`${q[nt.j].title} \xB7 ${q[nt.j].time}`;St.label.textContent!==st&&(St.label.textContent=st,St.width=St.height=0),St.node.hidden=!1,St.width||(St.width=St.node.offsetWidth),St.height||(St.height=St.node.offsetHeight);let Kt=Om(nt,yn);return{mark:St,exit:nt,side:Kt,box:Fm(nt,Kt,St,yn),shown:!1}});Bm(jt,yn,4,yi?[{left:yi.left,right:yi.right,top:yi.top,bottom:yi.bottom}]:[]),me.forEach((nt,Jt)=>{let St=jt[Jt];St?.shown?nt.keep=AS:nt.keep>0&&nt.held&&(!St||St.exit.j===nt.held.exit.j)?nt.keep-=ct:nt.held=null;let st=St?.shown?St:nt.held;nt.held=st??null,nt.node.hidden=!st,st&&(nt.node.style.transform=`translate3d(${st.box.left.toFixed(1)}px, ${st.box.top.toFixed(1)}px, 0)`,nt.node.dataset.memory=String(st.exit.j),nt.node.dataset.side=st.side,Ld.set(st.exit.j,st.exit.t),Oc.push(st.exit.j),qr.push(st.box),nt.arrow.style.cssText=`left: ${(st.exit.x-st.box.left).toFixed(1)}px; top: ${(st.exit.y-st.box.top).toFixed(1)}px; --a: ${st.exit.angle.toFixed(3)}rad`,Un.push({left:st.box.left-4,right:st.box.right+4,top:st.box.top-4,bottom:st.box.bottom+4}))})}else me.forEach(G=>{G.node.hidden=!0,G.held=null});N.setLinkReach(Ld),e.dataset.edges=String(me.filter(G=>!G.node.hidden).length||"");let Dd=Oc.join(",");if(Dd!==ge){ge=Dd;let G=new Set(Oc.map(String));ke.querySelectorAll(".peer[data-memory]").forEach(He=>He.dataset.out=G.has(He.dataset.memory)?"1":"")}let sn={x:0,y:0,visible:!1},$n={x:0,y:0,visible:!1},Ug=ln.filter(G=>G&&G.dim>0).map(G=>{N.project(G.centre,$n);let[He,bt]=[$n.x,$n.y];return N.project(G.world,sn),{item:G,x:He,y:bt,r:Math.hypot(sn.x-He,sn.y-bt)}}),Og=L.slice(S.length).filter(G=>G.on).map(G=>({item:null,x:G.x,y:G.y,r:Math.max(G.r,12)}));Pt.forEach(G=>{let He=G.base*(G.year<=x?1:0);if(Fe.year!==null&&G.year>Fe.year&&(He=0),He*=G.dim??1,N.project(G.world,sn),!sn.visible)He=0;else if(G.width||(G.width=G.node.offsetWidth),G.height||(G.height=G.node.offsetHeight),G.kind==="ahead"){let{width:Ge,height:mt}=G,yn=G.spotAt>=0?L[G.spotAt].r:G.ring*Te/$.position.distanceTo(G.world),jt=Nm(yn),nt=wS.flatMap(Jt=>CS.map(([St,st])=>{let Kt=jt+Jt,Vt=sn.x+St*Kt-(St<0?Ge:St===0?Ge/2:0),On=sn.y+st*Kt-(st<0?mt:st===0?mt/2:0);return{left:Vt,right:Vt+Ge,top:On,bottom:On+mt}})).find(Jt=>Jt.left>=12&&Jt.right<=innerWidth-12&&!Un.some(St=>xi(Jt,St)));nt?(G.node.style.transform=`translate3d(${nt.left.toFixed(1)}px, ${nt.top.toFixed(1)}px, 0)`,G.node.style.setProperty("--cx",sn.x.toFixed(1)),G.node.style.setProperty("--cy",sn.y.toFixed(1)),G.node.style.setProperty("--r",Math.min(yn,70).toFixed(1)),He>.2&&Un.push({left:nt.left-4,right:nt.right+4,top:nt.top-4,bottom:nt.bottom+4})):He=0}else{if(G.centre){N.project(G.centre,$n);let jt=Math.atan2(sn.y-$n.y,sn.x-$n.x),nt=Math.hypot(sn.x-$n.x,sn.y-$n.y),Jt=({turn:Xn,scale:En})=>{let[jr,di]=[Math.cos(jt+Xn*(Math.PI/4)),Math.sin(jt+Xn*(Math.PI/4))],Zn=Math.abs(jr)*(G.width/2)+Math.abs(di)*(G.height/2)+4,wr=Ln($n.x+jr*(nt*En+Zn),G.width/2+12,innerWidth-G.width/2-12),zc=$n.y+di*(nt*En+Zn);return{x:wr,y:zc,box:{left:wr-G.width/2,right:wr+G.width/2,top:zc-G.height/2,bottom:zc+G.height/2}}},St=({box:Xn})=>!Un.some(En=>xi(Xn,En))&&!qr.some(En=>xi(Xn,En)),st=Xn=>{let{box:En}=Jt(Xn);return[...Ug,...Og].reduce((jr,di)=>jr+Math.max(0,di.r*.95-Math.hypot(Ln(di.x,En.left,En.right)-di.x,Ln(di.y,En.top,En.bottom)-di.y))*(di.item===G?.6:di.item===null?1.5:1),0)},Vt=(G.option&&St(Jt(G.option))&&st(G.option)===0?G.option:null)??(()=>{let Xn=[1,1.5,2.1,2.8].flatMap(Zn=>[0,1,-1,2,-2,3,-3,4,.5,-.5,1.5,-1.5,2.5,-2.5,3.5,-3.5].map(wr=>({turn:wr,scale:Zn}))),En=Xn.filter(Zn=>St(Jt(Zn))).map(Zn=>({candidate:Zn,cost:st(Zn)+(Zn.scale-1)*18})),jr=En.reduce((Zn,wr)=>wr.cost<Zn.cost-.5?wr:Zn,{candidate:Xn[0],cost:1/0}),di=En.find(Zn=>Zn.candidate.turn===G.option?.turn&&Zn.candidate.scale===G.option?.scale);return di&&di.cost<=jr.cost+8?di.candidate:jr.candidate})();G.option=Vt;let On=Jt(Vt);sn.x=On.x,sn.y=On.y;let ht=ad(On.box,{x:$n.x,y:$n.y,r:nt*2});G.node.dataset.leader=ht&&ht.length>10&&!G.pin?"1":"",ht&&Object.assign(G.leader.style,{left:`${ht.x.toFixed(1)}px`,top:`${ht.y.toFixed(1)}px`,width:`${ht.length.toFixed(1)}px`,transform:`rotate(${ht.angle.toFixed(3)}rad)`});let wi=`${$n.x.toFixed(0)},${$n.y.toFixed(0)},${nt.toFixed(0)}`;G.mass!==wi&&(G.mass=wi,G.node.style.setProperty("--cx",$n.x.toFixed(0)),G.node.style.setProperty("--cy",$n.y.toFixed(0)),G.node.style.setProperty("--r",nt.toFixed(0)))}if(sn.x=Ln(sn.x,G.width/2+12,innerWidth-G.width/2-12),G.pin){let jt=G.height+6,nt=[0,1,-1,2,-2,3,-3].map(Jt=>sn.y+Jt*jt).find(Jt=>!Un.some(St=>xi({left:sn.x-G.width/2,right:sn.x+G.width/2,top:Jt-G.height/2,bottom:Jt+G.height/2},St)));nt!==void 0&&(sn.y=nt)}G.node.style.transform=`translate3d(${sn.x.toFixed(1)}px, ${sn.y.toFixed(1)}px, 0)`;let Ge=G.kind==="ring-year"||G.kind==="countdown-mark"?1:4,mt={left:sn.x-G.width/2-Ge,right:sn.x+G.width/2+Ge,top:sn.y-G.height/2-Ge,bottom:sn.y+G.height/2+Ge};(G.kind==="ring-year"||G.kind==="countdown-mark")&&Un.some(jt=>xi(mt,jt))&&(He=0);let yn={left:mt.left+4,right:mt.right-4,top:mt.top+4,bottom:mt.bottom-4};G.kind==="galaxy"&&!G.pin&&(qr.some(jt=>xi(yn,jt))||Un.some(jt=>xi(yn,jt)))&&(He=0),He>.2&&Un.push(mt)}let bt=Math.round(He*100)/100;bt!==G.shown&&(G.shown=bt,G.node.style.opacity=bt,G.node.style.visibility=bt>0?"visible":"hidden")});let Fg=d[ft].kind==="hero"&&Tn<0&&Ot<0&&Fe.year===null,go=0;if(De&&rt.chain.length&&Fg){let G=rt.chain.map(He=>L[He]).filter(He=>He.on);if(G.length){rt.width||(rt.width=Yt.offsetWidth),rt.height||(rt.height=Yt.offsetHeight);let{width:He,height:bt}=rt,Ge={left:Math.min(...G.map(ht=>ht.x-ht.r)),right:Math.max(...G.map(ht=>ht.x+ht.r)),top:Math.min(...G.map(ht=>ht.y-ht.r)),bottom:Math.max(...G.map(ht=>ht.y+ht.r))},mt=(Ge.top+Ge.bottom-bt)/2,yn=[[Ge.left,Ge.top-oa-bt],[Ge.right-He,Ge.top-oa-bt],[Ge.left-oa-He,mt],[Ge.right+oa,mt],[Ge.left,Ge.bottom+oa],[Ge.right-He,Ge.bottom+oa]],jt=([ht,wi])=>({left:ht,top:wi,right:ht+He,bottom:wi+bt}),nt=G.map(ht=>({left:ht.x-ht.r*.7,right:ht.x+ht.r*.7,top:ht.y-ht.r*.7,bottom:ht.y+ht.r*.7})),Jt=ht=>ht.left>=12&&ht.right<=innerWidth-12&&ht.top>=12&&ht.bottom<=innerHeight-12&&!Un.some(wi=>xi(ht,wi))&&!nt.some(wi=>xi(ht,wi)),St=rt.option&&jt(rt.option.side>=0?yn[rt.option.side]:[Ge.left+rt.option.dx,Ge.top+rt.option.dy]),st=()=>{let ht=[],wi=Math.max(TS,Math.ceil(Math.sqrt((Ge.right-Ge.left+2*la)*(Ge.bottom-Ge.top+2*la)/ES)));for(let Xn=Ge.top-la;Xn<=Ge.bottom+la-bt;Xn+=wi)for(let En=Ge.left-la;En<=Ge.right+la-He;En+=wi)ht.push([En,Xn]);return ht.sort((Xn,En)=>Math.hypot(Xn[0]-Ge.left,Xn[1]+bt-Ge.top)-Math.hypot(En[0]-Ge.left,En[1]+bt-Ge.top))},Kt=St&&Jt(St)?St:null,Vt=Kt?-1:yn.findIndex(ht=>Jt(jt(ht))),On=Kt??(Vt>=0?jt(yn[Vt]):st().map(jt).find(Jt));Kt||(rt.option=Vt>=0?{side:Vt}:On?{side:-1,dx:On.left-Ge.left,dy:On.top-Ge.top}:null),On&&(Yt.style.transform=`translate3d(${On.left.toFixed(1)}px, ${On.top.toFixed(1)}px, 0)`,Un.push({left:On.left-8,right:On.right+8,top:On.top-8,bottom:On.bottom+8}),go=1)}}go!==rt.shown&&(rt.shown=go,Yt.dataset.on=go?"1":"");let Bg=innerWidth<=760?8:Di>.8?14:SS,Fc=[],Ud=[];L.forEach((G,He)=>He<S.length&&G.on&&G.r>3&&(He===he||S[He].year<=x)&&Ud.push({j:He,left:G.x-G.r*.7,right:G.x+G.r*.7,top:G.y-G.r*.7,bottom:G.y+G.r*.7})),ce.forEach((G,He)=>{let bt=L[He],Ge=S[He],mt=0;He===Tn?mt=1e3:He===hn?mt=900:He===$e?mt=880:De?mt=0:Ge.weight>=3&&Di<.6?mt=30:Ge.weight===2&&Di<.5?mt=20:Di<.22&&(mt=10),Tn>=0&&mt<500&&(mt=0),A.on&&He!==hn&&mt===40&&(mt=0),Ge.year+3>x&&He!==Tn&&(mt=0),!C&&qt&&He===he&&(mt=900),Ot>=0&&(mt=He===hn||He===$e?900:0),Fe.year!==null&&(mt=Ge.year<=Fe.year&&Ge.year>Fe.year-2.5?800+Ge.weight:0),mt>0&&bt.on?Fc.push({tag:G,spot:bt,priority:mt,i:He}):G.on&&(G.on=!1,G.node.dataset.on="")}),Fc.sort((G,He)=>He.priority-G.priority||G.i-He.i);let Bc=[];for(let{tag:G,spot:He,priority:bt,i:Ge}of Fc){let mt=bt===40||bt===900&&Ge===hn&&Tn<0&&Ot<0&&Di>=.6?"1":"",yn=Ge===Tn||Ge===hn?"1":"";(G.node.dataset.name!==mt||G.node.dataset.hot!==yn)&&(G.glide=G.node.dataset.hot!==yn,G.node.dataset.cool=G.node.dataset.hot==="1"&&!yn?"1":"",G.node.dataset.name=mt,G.node.dataset.hot=yn,G.width=G.height=0),G.width||(G.width=G.node.offsetWidth),G.height||(G.height=G.node.offsetHeight);let jt=Pm(He,{width:G.width,height:G.height},innerWidth);if(jt.forEach((Kt,Vt)=>Kt.slot=Vt),bt>=900){let Kt=Ln(He.x-G.width/2,12,innerWidth-G.width-12);jt.splice(8,0,{left:Kt,right:Kt+G.width,top:He.y-G.height/2,bottom:He.y+G.height/2,far:!1})}let nt=Kt=>Kt.left>=12&&Kt.right<=innerWidth-12,st=Lm(jt,{free:Kt=>nt(Kt)&&!Un.some(Vt=>xi(Kt,Vt))&&!Bc.some(Vt=>xi(Kt,{left:Vt.left-6,right:Vt.right+6,top:Vt.top-4,bottom:Vt.bottom+4})),clear:Kt=>!Ud.some(Vt=>Vt.j!==Ge&&xi(Kt,Vt)),inside:nt,forced:bt>=900,keep:G.on?G.slot:-1});if(st&&!(st.far&&bt<900)&&Bc.length<Bg){Bc.push(st);let Kt=G.on&&G.slot!==void 0&&G.slot!==st.slot;G.slot=st.slot;let Vt=st.far?ad(st,He):null;Vt?(Object.assign(G.leader.style,{left:`${Vt.x.toFixed(1)}px`,top:`${Vt.y.toFixed(1)}px`,width:`${Vt.length.toFixed(1)}px`,transform:`rotate(${Vt.angle.toFixed(3)}rad)`}),G.node.dataset.leader="1"):G.node.dataset.leader="",(G.glide||Kt)&&G.on&&G.last&&(G.slide=[G.last.left-st.left,G.last.top-st.top]),G.glide=!1,G.last={left:st.left,top:st.top};let On=Math.exp(-3*ct);G.slide=G.slide?G.slide.map(ht=>Math.abs(ht)<.3?0:ht*On):[0,0],G.node.style.transform=`translate3d(${(st.left+G.slide[0]).toFixed(1)}px, ${(st.top+G.slide[1]).toFixed(1)}px, 0)`,G.node.style.setProperty("--cx",He.x.toFixed(1)),G.node.style.setProperty("--cy",He.y.toFixed(1)),G.on||(G.on=!0,G.node.dataset.on="1")}else G.on&&(G.on=!1,G.node.dataset.on="")}}),new ResizeObserver(Ze).observe(ke);let Pd=()=>{rt.width=rt.height=0,N.resize(),Rn(),tn(),Ze(),d[ft].kind==="hero"?N.home():tt(ft)};addEventListener("resize",Pd),addEventListener("themechange",N.applyTheme),qn.push(()=>{removeEventListener("resize",Pd),removeEventListener("themechange",N.applyTheme)}),N.on("error",x=>{console.error(x),Cc()}),document.documentElement.classList.add("immersive"),document.fonts?.ready.then(()=>{ce.forEach(x=>(x.width=0,x.height=0)),rt.width=rt.height=0,Rn(),tn(),Ze()}),a.dataset.ready="1",lt(0,{push:!1}),Nc(),Ze()}Ig();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
