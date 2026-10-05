(()=>{document.querySelectorAll("form.waitlist").forEach(i=>{let e=i.querySelector(".status");i.addEventListener("submit",()=>{e.textContent=i.dataset.opened})});var fc=[1.6,4.2],td={1:1.1,2:1.6,3:2.2},Wm=51,qi=["threads","people","places"],hc=[0,1,-1,2,-2],uc={sigma:1.6,background:.08},or={base:470,cap:12e4,trail:18e3},ri={inner:900,outer:1600,stars:9e3,halo:.015,band:.35,tilt:.6,thickness:.16},Vt={core:4,reach:3.2,gap:12,future:44,twist:2.2,swirl:.9,inner:.22,depth:4,room:3,ahead:[.3,.7],today:.06,sweep:1.9*Math.PI,growth:1.75,rise:26},ks=.25,Xm=i=>/^\d{4}$/.test(i)?"year":/^\d{4}-\d{2}$/.test(i)?"month":null,sd=(i=Date.now())=>{let e=new Date(i),t=e.getFullYear(),n=Date.UTC(t,e.getMonth(),e.getDate());return t+(n-Date.UTC(t,0,1))/(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))},Ha=(i,e=Date.now())=>{let[t,n]=i.split("-").map(Number),r=new Date(e);return(t-r.getFullYear())*12+(n-1-r.getMonth())},Wa=(i,e)=>!Number.isFinite(i)||i<0?"":new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(i,"month");var Kr=i=>i-1980;function qm(i){let e=new Map;i.forEach(({date:n})=>e.set(n,(e.get(n)??0)+1));let t=new Map;return i.map(({date:n})=>{let r=Xm(n);if(!r)throw new Error(`date "${n}" is neither YYYY nor YYYY-MM`);let s=+n.slice(0,4),a=t.get(n)??0;t.set(n,a+1);let o=(a+.5)/e.get(n);return r==="month"?s+(+n.slice(5,7)-1+o)/12:s+o})}function jm(i,e){let t=[];return i.map((n,r)=>{let s=new Set;for(let a=r-1;a>=0&&n-i[a]<=e;a--)s.add(t[a]);return t[r]=hc.find(a=>!s.has(a))??hc[r%hc.length],t[r]})}function Ym(i){return i.map(e=>{let t=i.filter(n=>Math.abs(n-e)<=.6).length;return Math.min(1,1/Math.sqrt(Math.max(1,t/2)))})}var Qr=i=>Math.min(1,Math.max(0,i)),$m=(i,e)=>(Math.sqrt(i.inner*i.inner+2*i.spin*e)-i.inner)/i.spin;function Jr(i,e,t=0){let n=$m(i,e),r=i.inner+i.spin*n+t;return[r*Math.sin(n)-i.pole[0],r*Math.cos(n)-i.pole[1],-7+Vt.rise*(e/i.length-.5)]}function Zm(i,e,t,n){let r=Array.from({length:t},()=>[]),s=Array.from({length:t},()=>0);i.forEach((v,g)=>{e[g]<0||(r[e[g]].push(v),s[e[g]]+=1)});let a=[];r.forEach((v,g)=>a.push(v.length?Math.min(...v):a[g-1]??1980));let o=s.map(v=>Vt.core+Vt.reach*Math.sqrt(v)),c=o.reduce((v,g)=>v+2*g,0)+Vt.gap*t+Vt.future,l=2*c/(Vt.sweep*(1+Vt.growth)),h={inner:l,spin:l*(Vt.growth-1)/Vt.sweep,length:c,pole:[0,0]},p=0,d=o.map(v=>{let g=p+v;return p+=2*v+Vt.gap,g}),u=[...d.map((v,g)=>[Jr(h,v),o[g]]),...Array.from({length:9},(v,g)=>[Jr(h,p+Vt.future*g/8),3])],m=[0,1].map(v=>[Math.min(...u.map(([g,_])=>g[v]-_)),Math.max(...u.map(([g,_])=>g[v]+_))]);h.pole=m.map(([v,g])=>(v+g)/2);let f=o.map((v,g)=>{let _=a.slice(g+1).find((N,B)=>r[g+1+B].length&&N>a[g]),b=Math.max(_??Math.max(n,...r[g]),a[g]+1),T=r[g].length,S=r[g].length?Math.max(...r[g])-Math.min(...r[g])+1:1,M=Qr(S/12)*(1-.7*Qr(s[g]/50)),C={ratio:pc.stretch?1+pc.stretch*.9*M:1,angle:(g*Vt.twist+T*.37)%Math.PI};return{start:a[g],end:b,count:T,radius:v,turn:g*Vt.twist,along:d[g],centre:Jr(h,d[g]),axis:C}});return{...h,ahead:p,list:f}}var Ga=(i,e)=>{let t=i.list.findIndex(n=>e<n.end);return t<0?i.list.length-1:t},Xa=(i,e)=>Qr((e-i.start)/(i.end-i.start)),nd=[1,2,5,10,20,50,100];function ad(i,e=8){let t=Math.ceil(i.start+1e-9),n=Math.floor(i.end+1e-9),r=a=>Array.from({length:Math.max(0,n-t+1)},(o,c)=>t+c).filter(o=>o%a===0),s=nd.find(a=>r(a).length<=e)??nd.at(-1);return r(s).map(a=>({year:a,radius:i.radius*(Vt.inner+(1-Vt.inner)*Xa(i,a))}))}var id=(i,e)=>(Ga(i,e)+Xa(i.list[Ga(i,e)],e))/i.list.length;function od(i,e){if(e>=1)return 1/0;let t=Math.max(0,e)*i.list.length,n=i.list[Math.min(i.list.length-1,Math.floor(t))];return n.start+(t-Math.floor(t))*(n.end-n.start)}function ld(i,e,t,n,r=0,s=0){let a=i.arms?.[Math.max(0,e)],o=(a?a.centre:Math.PI*2/Math.max(1,t)*Math.max(0,e))+i.turn+(i.swirl??Vt.swirl)*n+r,c=Math.max(.4,i.radius*(Vt.inner+(1-Vt.inner)*n)+s),[l,h]=lr(i,c*Math.sin(o),c*Math.cos(o));return[i.centre[0]+l,i.centre[1]+h,i.centre[2]+Vt.depth*(n-.5)]}var dc=(i,e,t=0)=>Jr(i,i.ahead+e*Vt.future,t);function Jm(i,e,t,n,r){let s=r.map(()=>0);t.forEach((u,m)=>{let f=r.indexOf(u.threads?.[0]);n[m]===e&&f>=0&&s[f]++});let a=s.map((u,m)=>[m,u]).filter(([,u])=>u>0),o=a.reduce((u,[,m])=>u+m,0)||1,c=Math.PI*2/Math.max(1,a.length)/4,l=a.map(([,u])=>Math.max(c,Math.PI*2*u/o)),h=Math.PI*2/l.reduce((u,m)=>u+m,0),p=0;i.arms={},a.forEach(([u],m)=>{let f=l[m]*h;i.arms[u]={centre:p+f/2,width:f},p+=f});let d=i.end-i.start;i.swirl=Vt.swirl*(.7+.8*Qr(d/14))}function mc(i,e,{periods:t=[],today:n=1980+Wm,threads:r=[]}={}){let s=i.map(c=>t.length?t.indexOf(c.period):0),a=i.find((c,l)=>s[l]<0);if(a)throw new Error(`memory ${a.id}: period "${a.period}" is not one of ${t.join(", ")}`);let o={...Zm(e,s,Math.max(1,t.length),n),periodOf:s};return pc.arms&&r.length&&o.list.forEach((c,l)=>Jm(c,l,i,s,r)),o}function cd(i,e={},t={}){let n=qm(i),r=Ym(n),s=qi.filter(d=>e[d]?.length),a=i.map(d=>Object.fromEntries(s.map(u=>[u,(d[u]??[]).map(m=>e[u].indexOf(m)).filter(m=>m>=0)]))),o=e.threads?.length??0,c=mc(i,n,{...t,threads:e.threads??[]}),l=[],h=new Map;i.forEach((d,u)=>{let m=`${c.periodOf[u]}:${a[u].threads?.[0]??0}`;h.set(m,[...h.get(m)??[],u])});let p=Math.PI*2/Math.max(1,o);return h.forEach(d=>{let u=c.list[c.periodOf[d[0]]],m=(u.end-u.start)/(u.radius*(1-Vt.inner));jm(d.map(f=>n[f]),Vt.room*m).forEach((f,v)=>{let g=d[v],_=Xa(u,n[g]),b=u.radius*(Vt.inner+(1-Vt.inner)*_),T=u.arms?.[a[g].threads?.[0]??0]?.width??p,S=Math.max(-.45*T,Math.min(.45*T,f*Vt.room/Math.max(b,2)));l[g]=ld(u,a[g].threads?.[0]??0,o,_,S)})}),n.map((d,u)=>({id:i[u].id,year:d,position:l[u],spread:(td[i[u].weight]??td[1])*r[u],weight:i[u].weight,members:a[u],period:c.periodOf[u],links:i[u].links??[]}))}function hd(i){let[e,t]=Vt.ahead.map(n=>dc(i,n));return{today:dc(i,Vt.today),book:e,clone:t}}var ud=(i,e)=>e.reduce((t,n)=>t+n.weight*Math.exp(-(((i-n.year)/1.6)**2)),0),dd=i=>Math.max(...i.map(e=>ud(e.year,i)),1e-6);function Km(i,e,t=dd(e)){return Math.min(1,ud(i,e)/t)}function Qm(i,e,t,n){let r=Math.ceil((n-1980)/ks)+1,s=new Float32Array(r*Math.max(1,t)),a=Math.ceil(uc.sigma*3/ks);for(let o of i)(o.members[e]??[]).forEach((c,l)=>{let h=(o.year-1980)/ks;for(let p=Math.max(0,Math.floor(h)-a);p<=Math.min(r-1,Math.ceil(h)+a);p++){let d=(p*ks-(o.year-1980))/uc.sigma;s[p*t+c]+=o.weight*(l===0?1:.5)*Math.exp(-d*d)/3}});return{table:s,count:t,bins:r}}function pd({table:i,count:e,bins:t},n,r){return Math.min(1,i[Math.min(t-1,Math.max(0,Math.round((n-1980)/ks)))*e+r])}function rd(i,e,t){let n=Array.from({length:i.count},(s,a)=>uc.background+pd(i,e,a)),r=t()*n.reduce((s,a)=>s+a,0);for(let s=0;s<i.count;s++)if((r-=n[s])<=0)return s;return i.count-1}function qa(i,e=ri.inner,t=ri.outer){let n=i()*2-1,r=i()*Math.PI*2,s=e+(t-e)*i(),a=Math.sqrt(1-n*n)*s;return[a*Math.cos(r),a*Math.sin(r),n*s]}function fd(i){let e=i()*Math.PI*2,t=ar(i)*ri.thickness,[n,r,s]=[Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t)];return[n,r*Math.cos(ri.tilt)-s*Math.sin(ri.tilt),r*Math.sin(ri.tilt)+s*Math.cos(ri.tilt)]}function md({count:i=ri.stars,random:e}){let t={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i),halo:new Float32Array(i)};for(let n=0;n<i;n++){let r=e()<ri.halo,s=r?.8+.2*e():.7*e()**7,a=!r&&e()<ri.band?fd(e):qa(e,1,1),o=ri.outer-(ri.outer-ri.inner)*s;t.position.set(a.map(c=>c*o),n*3),t.seed[n]=e(),t.bright[n]=s,t.halo[n]=r?1:0,t.size[n]=1+1.2*s}return t}var pc={stretch:.5,arms:1};function lr(i,e,t){let n=i.axis;if(!n||n.ratio===1)return[e,t];let[r,s,a]=[Math.cos(n.angle),Math.sin(n.angle),Math.sqrt(n.ratio)],o=(e*r+t*s)*a,c=(-e*s+t*r)/a;return[o*r-c*s,o*s+c*r]}var gc=["personal","professional","product","education"],On={deep:{count:16e3,mobile:6e3,alpha:[.1,.8],band:.35,radius:1650,inner:400},far:{count:36,alpha:[.15,.4],radius:[5,14]},haze:{alpha:.08},glow:{max:.15,scale:2.6}},eg=([i,e,t])=>[Math.atan2(e,i)/(2*Math.PI)+.5,Math.acos(Math.max(-1,Math.min(1,t)))/Math.PI];function gd({count:i=On.deep.count,random:e,centre:t=[0,0,0],inner:n=On.deep.inner,outer:r=On.deep.radius}){let[s,a]=On.deep.alpha,o={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i)};for(let c=0;c<i;c++){let l=e()<On.deep.band?fd(e):qa(e,1,1),h=Math.hypot(...l),p=Math.log(r/(n*(r/n)**e()))/Math.log(r/n),d=r*(n/r)**p;o.position.set(l.map((u,m)=>t[m]+u/h*d),c*3),o.seed[c]=e(),o.bright[c]=Math.min(a,(s+(a-s)*e()**4)*(1+.6*p**3)),o.size[c]=1+1.4*p**4}return o}function _d({count:i=On.far.count,random:e}){let[t,n]=On.far.alpha,[r,s]=On.far.radius;return Array.from({length:i},()=>{let[a,o]=eg(qa(e,1,1));return{u:a,v:o,radius:r+(s-r)*e(),squash:.35+.5*e(),angle:e()*Math.PI,alpha:t+(n-t)*e()}})}function vd(i,e){return{scale:i.radius*On.glow.scale,strength:On.glow.max*(.25+.75*(i.count/Math.max(1,e)))}}var ar=i=>Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i());function tg(i,{base:e=or.base,cap:t=or.cap}={}){let n=i.reduce((r,s)=>r+s.weight**1.5,0)||1;return Math.min(e,t/n)}function xd({marks:i,sky:e,today:t,random:n,base:r=or.base,cap:s=or.cap,trail:a=or.trail,facets:o={}}){let c=tg(i,{base:r,cap:s}),l=T=>Math.max(8,Math.round(c*T.weight**1.5)),h=qi.filter(T=>o[T]?.length),p=i.reduce((T,S)=>T+l(S),0)+a,d={count:p,position:new Float32Array(p*3),center:new Float32Array(p*3),from:new Float32Array(p*3),facet:Object.fromEntries(qi.map(T=>[T,new Float32Array(p).fill(-1)])),u:new Float32Array(p),order:new Float32Array(p),seed:new Float32Array(p),size:new Float32Array(p),ahead:new Float32Array(p),kind:new Float32Array(p),memory:new Float32Array(p),galaxy:new Float32Array(p).fill(-1)},u=(T,S,M,C,N,B,L,X,F)=>{d.position.set(S,T*3),d.center.set(M,T*3),d.from.set(qa(n),T*3),d.u[T]=C,d.order[T]=F,d.seed[T]=n(),d.size[T]=N,d.ahead[T]=B,d.kind[T]=L,d.memory[T]=X},m=0;i.forEach((T,S)=>{for(let M=0,C=l(T);M<C;M++,m++){let N=[ar(n),ar(n),ar(n)*.8],B=T.spread*Math.abs(ar(n))*.55,L=Math.hypot(...N)||1,X=N.map(F=>F/L*B);u(m,T.position.map((F,K)=>F+X[K]),T.position,Kr(T.year),.1+n()*.16,0,1,S,id(e,T.year)),d.galaxy[m]=T.period;for(let F of h)d.facet[F][m]=T.members[F][0]??-1}});let f=t+fc[1]+.4,v=Object.fromEntries(h.map(T=>[T,Qm(i,T,o[T].length,f)])),g=o.threads?.length??0,_=Math.PI*2/Math.max(1,g),b=dd(i);for(let T=0;T<a;T++,m++){let S=n()<.06,M=S?t+n()*(f-t):1980+n()*(t-1980),C=v.threads?S?Math.floor(n()*g):rd(v.threads,M,n):-1,N=C>=0&&!S?pd(v.threads,M,C):Km(M,i,b),B;if(S)B=dc(e,n(),ar(n)*2.4);else{let L=e.list[Ga(e,M)],X=n()<.14,F=X?n()*.2:Xa(L,M);B=ld(L,C,g,F,ar(n)*(L.arms?.[Math.max(0,C)]?.width??_)*(X?1.2:.14),ar(n)*(.5+.9*N))}for(let L of h)d.facet[L][m]=L==="threads"?C:S?Math.floor(n()*o[L].length):rd(v[L],M,n);u(m,B,B,Kr(M),.05+n()*.07,S?1:0,0,-1,S?1:id(e,M)),d.galaxy[m]=S?-1:Ga(e,M)}return d}var $n={start:1980,end:2031,book:2027.8,clone:2029.6},yd={seconds:16},Sd=(i,e,t=1980,n=yd.seconds)=>t+(e-t)*Qr(i/n),Md=(i,e,t=1980,n=yd.seconds)=>Qr((i-t)/(e-t))*n,es=i=>(i-$n.start)/($n.end-$n.start)*100,xi={rate:.004,ramp:6,slots:16},ng=i=>xi.rate*12/(i.radius+12),ig=i=>i<=0?0:i-xi.ramp*(1-Math.exp(-i/xi.ramp)),bd=(i,e)=>ng(i)*ig(e);var rg=24;document.querySelectorAll(".countdown[data-until]").forEach(i=>{let e=Ha(i.dataset.until);if(!(e>=0)){i.hidden=!0;return}i.querySelector(".remaining").textContent=` \xB7 ${Wa(e,document.documentElement.lang)}`,i.querySelector(".scale").style.setProperty("--months",Math.min(e,rg))});var sp=0,Jc=1,ap=2;var wa=1,op=2,As=3,Rs=0,kn=1,Fi=2,Bi=0,mi=1,tr=2,Kc=3,Qc=4,lp=5;var Cs=100,cp=101,hp=102,up=103,dp=104,pp=200,fp=201,mp=202,gp=203,_p=204,vp=205,xp=206,yp=207,Sp=208,Mp=209,bp=210,Tp=211,Ep=212,wp=213,Ap=214,eh=0,th=1,nh=2,yl=3,ih=4,rh=5,sh=6,ah=7,Rp=0,Cp=1,Ip=2,wi=0,oh=1,lh=2,ch=3,hh=4,uh=5,dh=6,ph=7;var Is=301,Br=302,Sl=303,Ml=304,Aa=306,bl=1e3,Tl=1001,Pp=1002,Ai=1003,Lp=1004;var Ra=1005;var Gn=1006,El=1007;var zr=1008;var Ri=1009,Np=1010,Dp=1011,Ca=1012,fh=1013,Mr=1014,gi=1015,zi=1016,mh=1017,gh=1018,Ps=1020,Up=35902,Op=35899,Fp=1021,Bp=1022,Vi=1023,Vr=1026,kr=1027,Ia=1028,_h=1029,Gr=1030,vh=1031;var xh=1033,wl=33776,Al=33777,Rl=33778,Cl=33779,yh=35840,Sh=35841,Mh=35842,bh=35843,Th=36196,Eh=37492,wh=37496,Ah=37488,Rh=37489,Il=37490,Ch=37491,Ih=37808,Ph=37809,Lh=37810,Nh=37811,Dh=37812,Uh=37813,Oh=37814,Fh=37815,Bh=37816,zh=37817,Vh=37818,kh=37819,Gh=37820,Hh=37821,Wh=36492,Xh=36494,qh=36495,jh=36283,Yh=36284,Pl=36285,$h=36286;var Zh=0,zp=1,Hr="",Jh="srgb",Ll="srgb-linear",Kh="linear",Wt="srgb";var Vp=512,kp=513,Gp=514,Nl=515,Hp=516,Wp=517,Dl=518,Xp=519;var Ul=35048;var Qh="300 es",eu=2e3;function sg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ag(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Qs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qp(){let i=Qs("canvas");return i.style.display="block",i}var Td={},_s=null;function ea(...i){let e="THREE."+i.shift();_s?_s("log",e,...i):console.log(e,...i)}function jp(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ze(...i){let e="THREE."+(i=jp(i)).shift();if(_s)_s("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Qe(...i){let e="THREE."+(i=jp(i)).shift();if(_s)_s("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Pr(...i){let e=i.join(" ");e in Td||(Td[e]=!0,Ze(...i))}function Yp(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var $p={[eh]:1,[nh]:6,[ih]:7,[yl]:5,[th]:0,[sh]:2,[ah]:4,[rh]:3},Di=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Eo=Math.PI/180,wo=180/Math.PI;function Qi(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Fn[255&i]+Fn[i>>8&255]+Fn[i>>16&255]+Fn[i>>24&255]+"-"+Fn[255&e]+Fn[e>>8&255]+"-"+Fn[e>>16&15|64]+Fn[e>>24&255]+"-"+Fn[63&t|128]+Fn[t>>8&255]+"-"+Fn[t>>16&255]+Fn[t>>24&255]+Fn[255&n]+Fn[n>>8&255]+Fn[n>>16&255]+Fn[n>>24&255]).toLowerCase()}function gt(i,e,t){return Math.max(e,Math.min(t,i))}function og(i,e){return(i%e+e)%e}function _c(i,e,t){return(1-t)*i+t*e}function Pi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function kt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:case Uint8ClampedArray:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var su=class su{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};su.prototype.isVector2=!0;var ge=su,fi=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],h=n[r+2],p=n[r+3],d=s[a+0],u=s[a+1],m=s[a+2],f=s[a+3];if(p!==f||c!==d||l!==u||h!==m){let v=c*d+l*u+h*m+p*f;v<0&&(d=-d,u=-u,m=-m,f=-f,v=-v);let g=1-o;if(v<.9995){let _=Math.acos(v),b=Math.sin(_);g=Math.sin(g*_)/b,c=c*g+d*(o=Math.sin(o*_)/b),l=l*g+u*o,h=h*g+m*o,p=p*g+f*o}else{c=c*g+d*o,l=l*g+u*o,h=h*g+m*o,p=p*g+f*o;let _=1/Math.sqrt(c*c+l*l+h*h+p*p);c*=_,l*=_,h*=_,p*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],c=n[r+1],l=n[r+2],h=n[r+3],p=s[a],d=s[a+1],u=s[a+2],m=s[a+3];return e[t]=o*m+h*p+c*u-l*d,e[t+1]=c*m+h*d+l*p-o*u,e[t+2]=l*m+h*u+o*d-c*p,e[t+3]=h*m-o*p-c*d-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(r/2),p=o(s/2),d=c(n/2),u=c(r/2),m=c(s/2);switch(a){case"XYZ":this._x=d*h*p+l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p-d*u*m;break;case"YXZ":this._x=d*h*p+l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p+d*u*m;break;case"ZXY":this._x=d*h*p-l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p-d*u*m;break;case"ZYX":this._x=d*h*p-l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p+d*u*m;break;case"YZX":this._x=d*h*p+l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p-d*u*m;break;case"XZY":this._x=d*h*p-l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p+d*u*m;break;default:Ze("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],p=t[10],d=n+o+p;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-c)*u,this._y=(s-l)*u,this._z=(a-r)*u}else if(n>o&&n>p){let u=2*Math.sqrt(1+n-o-p);this._w=(h-c)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+l)/u}else if(o>p){let u=2*Math.sqrt(1+o-n-p);this._w=(s-l)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(c+h)/u}else{let u=2*Math.sqrt(1+p-n-o);this._w=(a-r)/u,this._x=(s+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-r*o,this._w=a*h-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},au=class au{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ed.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ed.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),h=2*(o*t-s*r),p=2*(s*n-a*t);return this.x=t+c*l+a*p-o*h,this.y=n+c*h+o*l-s*p,this.z=r+c*p+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vc.copy(this).projectOnVector(e),this.sub(vc)}reflect(e){return this.sub(vc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};au.prototype.isVector3=!0;var I=au,vc=new I,Ed=new fi,ou=class ou{constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],p=n[7],d=n[2],u=n[5],m=n[8],f=r[0],v=r[3],g=r[6],_=r[1],b=r[4],T=r[7],S=r[2],M=r[5],C=r[8];return s[0]=a*f+o*_+c*S,s[3]=a*v+o*b+c*M,s[6]=a*g+o*T+c*C,s[1]=l*f+h*_+p*S,s[4]=l*v+h*b+p*M,s[7]=l*g+h*T+p*C,s[2]=d*f+u*_+m*S,s[5]=d*v+u*b+m*M,s[8]=d*g+u*T+m*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+r*s*l-r*a*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=h*a-o*l,d=o*c-h*s,u=l*s-a*c,m=t*p+n*d+r*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let f=1/m;return e[0]=p*f,e[1]=(r*l-h*n)*f,e[2]=(o*n-r*a)*f,e[3]=d*f,e[4]=(h*t-r*c)*f,e[5]=(r*s-o*t)*f,e[6]=u*f,e[7]=(n*c-l*t)*f,e[8]=(a*t-n*s)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Pr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xc.makeScale(e,t)),this}rotate(e){return Pr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xc.makeRotation(-e)),this}translate(e,t){return Pr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ou.prototype.isMatrix3=!0;var rt=ou,xc=new rt,wd=new rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ad=new rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lg(){let i={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer==="srgb"&&(r.r=er(r.r),r.g=er(r.g),r.b=er(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer==="srgb"&&(r.r=gs(r.r),r.g=gs(r.g),r.b=gs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?"linear":this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Pr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Pr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ll]:{primaries:e,whitePoint:n,transfer:"linear",toXYZ:wd,fromXYZ:Ad,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},[Jh]:{primaries:e,whitePoint:n,transfer:"srgb",toXYZ:wd,fromXYZ:Ad,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),i}var Tt=lg();function er(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function gs(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var ts,Ao=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ts===void 0&&(ts=Qs("canvas")),ts.width=e.width,ts.height=e.height;let r=ts.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=ts}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*er(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*er(t[n]/255)):t[n]=er(t[n]);return{data:t,width:e.width,height:e.height}}return Ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},cg=0,vs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:cg++}),this.uuid=Qi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(yc(r[a].image)):s.push(yc(r[a]))}else s=yc(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function yc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ao.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ze("Texture: Unable to serialize Texture."),{})}var hg=0,Sc=new I,Jn=class i extends Di{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,c=1009,l=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hg++}),this.uuid=Qi(),this.name="",this.source=new vs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Sc).x}get height(){return this.source.getSize(Sc).y}get depth(){return this.source.getSize(Sc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:Ze(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Jn.DEFAULT_IMAGE=null,Jn.DEFAULT_MAPPING=300,Jn.DEFAULT_ANISOTROPY=1;var lu=class lu{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,l=c[0],h=c[4],p=c[8],d=c[1],u=c[5],m=c[9],f=c[2],v=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(p-f)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+f)<.1&&Math.abs(m+v)<.1&&Math.abs(l+u+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(l+1)/2,T=(u+1)/2,S=(g+1)/2,M=(h+d)/4,C=(p+f)/4,N=(m+v)/4;return b>T&&b>S?b<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(b),r=M/n,s=C/n):T>S?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=M/r,s=N/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=C/s,r=N/s),this.set(n,r,s,t),this}let _=Math.sqrt((v-m)*(v-m)+(p-f)*(p-f)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(v-m)/_,this.y=(p-f)/_,this.z=(d-h)/_,this.w=Math.acos((l+u+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this.w=gt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this.w=gt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};lu.prototype.isVector4=!0;var Ht=lu,Ro=class extends Di{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ht(0,0,e,t),this.scissorTest=!1,this.viewport=new Ht(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new Jn(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new vs(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ni=class extends Ro{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ta=class extends Jn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Co=class extends Jn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var xl=class xl{constructor(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v)}set(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=p,g[14]=d,g[3]=u,g[7]=m,g[11]=f,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/ns.setFromMatrixColumn(e,0).length(),s=1/ns.setFromMatrixColumn(e,1).length(),a=1/ns.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=c*h,t[4]=-c*p,t[8]=l,t[1]=u+m*l,t[5]=d-f*l,t[9]=-o*c,t[2]=f-d*l,t[6]=m+u*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,u=c*p,m=l*h,f=l*p;t[0]=d+f*o,t[4]=m*o-u,t[8]=a*l,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=u*o-m,t[6]=f+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,u=c*p,m=l*h,f=l*p;t[0]=d-f*o,t[4]=-a*p,t[8]=m+u*o,t[1]=u+m*o,t[5]=a*h,t[9]=f-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=c*h,t[4]=m*l-u,t[8]=d*l+f,t[1]=c*p,t[5]=f*l+d,t[9]=u*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,u=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=f-d*p,t[8]=m*p+u,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=u*p+m,t[10]=d-f*p}else if(e.order==="XZY"){let d=a*c,u=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=-p,t[8]=l*h,t[1]=d*p+f,t[5]=a*h,t[9]=u*p-m,t[2]=m*p-u,t[6]=o*h,t[10]=f*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ug,e,dg)}lookAt(e,t,n){let r=this.elements;return si.subVectors(e,t),si.lengthSq()===0&&(si.z=1),si.normalize(),cr.crossVectors(n,si),cr.lengthSq()===0&&(Math.abs(n.z)===1?si.x+=1e-4:si.z+=1e-4,si.normalize(),cr.crossVectors(n,si)),cr.normalize(),ja.crossVectors(si,cr),r[0]=cr.x,r[4]=ja.x,r[8]=si.x,r[1]=cr.y,r[5]=ja.y,r[9]=si.y,r[2]=cr.z,r[6]=ja.z,r[10]=si.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],p=n[5],d=n[9],u=n[13],m=n[2],f=n[6],v=n[10],g=n[14],_=n[3],b=n[7],T=n[11],S=n[15],M=r[0],C=r[4],N=r[8],B=r[12],L=r[1],X=r[5],F=r[9],K=r[13],te=r[2],ae=r[6],W=r[10],k=r[14],Z=r[3],he=r[7],ce=r[11],re=r[15];return s[0]=a*M+o*L+c*te+l*Z,s[4]=a*C+o*X+c*ae+l*he,s[8]=a*N+o*F+c*W+l*ce,s[12]=a*B+o*K+c*k+l*re,s[1]=h*M+p*L+d*te+u*Z,s[5]=h*C+p*X+d*ae+u*he,s[9]=h*N+p*F+d*W+u*ce,s[13]=h*B+p*K+d*k+u*re,s[2]=m*M+f*L+v*te+g*Z,s[6]=m*C+f*X+v*ae+g*he,s[10]=m*N+f*F+v*W+g*ce,s[14]=m*B+f*K+v*k+g*re,s[3]=_*M+b*L+T*te+S*Z,s[7]=_*C+b*X+T*ae+S*he,s[11]=_*N+b*F+T*W+S*ce,s[15]=_*B+b*K+T*k+S*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],p=e[6],d=e[10],u=e[14],m=e[3],f=e[7],v=e[11],g=e[15],_=c*u-l*d,b=o*u-l*p,T=o*d-c*p,S=a*u-l*h,M=a*d-c*h,C=a*p-o*h;return t*(f*_-v*b+g*T)-n*(m*_-v*S+g*M)+r*(m*b-f*S+g*C)-s*(m*T-f*M+v*C)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(s*h-o*c)+r*(s*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=e[9],d=e[10],u=e[11],m=e[12],f=e[13],v=e[14],g=e[15],_=t*o-n*a,b=t*c-r*a,T=t*l-s*a,S=n*c-r*o,M=n*l-s*o,C=r*l-s*c,N=h*f-p*m,B=h*v-d*m,L=h*g-u*m,X=p*v-d*f,F=p*g-u*f,K=d*g-u*v,te=_*K-b*F+T*X+S*L-M*B+C*N;if(te===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let ae=1/te;return e[0]=(o*K-c*F+l*X)*ae,e[1]=(r*F-n*K-s*X)*ae,e[2]=(f*C-v*M+g*S)*ae,e[3]=(d*M-p*C-u*S)*ae,e[4]=(c*L-a*K-l*B)*ae,e[5]=(t*K-r*L+s*B)*ae,e[6]=(v*T-m*C-g*b)*ae,e[7]=(h*C-d*T+u*b)*ae,e[8]=(a*F-o*L+l*N)*ae,e[9]=(n*L-t*F-s*N)*ae,e[10]=(m*M-f*T+g*_)*ae,e[11]=(p*T-h*M-u*_)*ae,e[12]=(o*B-a*X-c*N)*ae,e[13]=(t*X-n*B+r*N)*ae,e[14]=(f*b-m*S-v*_)*ae,e[15]=(h*S-p*b+d*_)*ae,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+n,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,p=o+o,d=s*l,u=s*h,m=s*p,f=a*h,v=a*p,g=o*p,_=c*l,b=c*h,T=c*p,S=n.x,M=n.y,C=n.z;return r[0]=(1-(f+g))*S,r[1]=(u+T)*S,r[2]=(m-b)*S,r[3]=0,r[4]=(u-T)*M,r[5]=(1-(d+g))*M,r[6]=(v+_)*M,r[7]=0,r[8]=(m+b)*C,r[9]=(v-_)*C,r[10]=(1-(d+f))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=ns.set(r[0],r[1],r[2]).length(),o=ns.set(r[4],r[5],r[6]).length(),c=ns.set(r[8],r[9],r[10]).length();s<0&&(a=-a),yi.copy(this);let l=1/a,h=1/o,p=1/c;return yi.elements[0]*=l,yi.elements[1]*=l,yi.elements[2]*=l,yi.elements[4]*=h,yi.elements[5]*=h,yi.elements[6]*=h,yi.elements[8]*=p,yi.elements[9]*=p,yi.elements[10]*=p,t.setFromRotationMatrix(yi),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),p=2*s/(n-r),d=(t+e)/(t-e),u=(n+r)/(n-r),m,f;if(c)m=s/(a-s),f=a*s/(a-s);else if(o===2e3)m=-(a+s)/(a-s),f=-2*a*s/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),f=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=p,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),p=2/(n-r),d=-(t+e)/(t-e),u=-(n+r)/(n-r),m,f;if(c)m=1/(a-s),f=a/(a-s);else if(o===2e3)m=-2/(a-s),f=-(a+s)/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),f=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=p,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};xl.prototype.isMatrix4=!0;var ut=xl,ns=new I,yi=new ut,ug=new I(0,0,0),dg=new I(1,1,1),cr=new I,ja=new I,si=new I,Rd=new ut,Cd=new fi,gr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],p=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,u),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-gt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cd.setFromEuler(this),this.setFromQuaternion(Cd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gr.DEFAULT_ORDER="XYZ";var na=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},pg=0,Id=new I,is=new fi,ji=new ut,Ya=new I,Gs=new I,fg=new I,mg=new fi,Pd=new I(1,0,0),Ld=new I(0,1,0),Nd=new I(0,0,1),Dd={type:"added"},gg={type:"removed"},rs={type:"childadded",child:null},Mc={type:"childremoved",child:null},Kn=class i extends Di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pg++}),this.uuid=Qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new I,t=new gr,n=new fi,r=new I(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ut},normalMatrix:{value:new rt}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new na,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(Pd,e)}rotateY(e){return this.rotateOnAxis(Ld,e)}rotateZ(e){return this.rotateOnAxis(Nd,e)}translateOnAxis(e,t){return Id.copy(e).applyQuaternion(this.quaternion),this.position.add(Id.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pd,e)}translateY(e){return this.translateOnAxis(Ld,e)}translateZ(e){return this.translateOnAxis(Nd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ji.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ya.copy(e):Ya.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ji.lookAt(Gs,Ya,this.up):ji.lookAt(Ya,Gs,this.up),this.quaternion.setFromRotationMatrix(ji),r&&(ji.extractRotation(r.matrixWorld),is.setFromRotationMatrix(ji),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dd),rs.child=e,this.dispatchEvent(rs),rs.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gg),Mc.child=e,this.dispatchEvent(Mc),Mc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ji.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ji.multiply(e.parent.matrixWorld)),e.applyMatrix4(ji),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dd),rs.child=e,this.dispatchEvent(rs),rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,e,fg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,mg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let p=c[l];s(e.shapes,p)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),p=a(e.shapes),d=a(e.skeletons),u=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Kn.DEFAULT_UP=new I(0,1,0),Kn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Kn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ki=class extends Kn{constructor(){super(),this.isGroup=!0,this.type="Group"}},_g={type:"move"},xs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let f of e.hand.values()){let v=t.getJointPose(f,n),g=this._getHandJoint(l,f);v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=v.radius),g.visible=v!==null}let h=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],d=h.position.distanceTo(p.position),u=.02,m=.005;l.inputState.pinching&&d>u+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=u-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_g)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ki;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Zp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hr={h:0,s:0,l:0},$a={h:0,s:0,l:0};function bc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var at=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Tt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Tt.workingColorSpace){if(e=og(e,1),t=gt(t,0,1),n=gt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=bc(a,s,e+1/3),this.g=bc(a,s,e),this.b=bc(a,s,e-1/3)}return Tt.colorSpaceToWorking(this,r),this}setStyle(e,t="srgb"){function n(s){s!==void 0&&parseFloat(s)<1&&Ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=Zp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=er(e.r),this.g=er(e.g),this.b=er(e.b),this}copyLinearToSRGB(e){return this.r=gs(e.r),this.g=gs(e.g),this.b=gs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return Tt.workingToColorSpace(Bn.copy(this),e),65536*Math.round(gt(255*Bn.r,0,255))+256*Math.round(gt(255*Bn.g,0,255))+Math.round(gt(255*Bn.b,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.workingToColorSpace(Bn.copy(this),t);let n=Bn.r,r=Bn.g,s=Bn.b,a=Math.max(n,r,s),o=Math.min(n,r,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let p=a-o;switch(l=h<=.5?p/(a+o):p/(2-a-o),a){case n:c=(r-s)/p+(r<s?6:0);break;case r:c=(s-n)/p+2;break;case s:c=(n-r)/p+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Tt.workingColorSpace){return Tt.workingToColorSpace(Bn.copy(this),t),e.r=Bn.r,e.g=Bn.g,e.b=Bn.b,e}getStyle(e="srgb"){Tt.workingToColorSpace(Bn.copy(this),e);let t=Bn.r,n=Bn.g,r=Bn.b;return e!=="srgb"?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(hr),this.setHSL(hr.h+e,hr.s+t,hr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hr),e.getHSL($a);let n=_c(hr.h,$a.h,t),r=_c(hr.s,$a.s,t),s=_c(hr.l,$a.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Bn=new at;at.NAMES=Zp;var ia=class extends Kn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gr,this.environmentIntensity=1,this.environmentRotation=new gr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Si=new I,Yi=new I,Tc=new I,$i=new I,ss=new I,as=new I,Ud=new I,Ec=new I,wc=new I,Ac=new I,Rc=new Ht,Cc=new Ht,Ic=new Ht,Li=class i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Si.subVectors(e,t),r.cross(Si);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Si.subVectors(r,t),Yi.subVectors(n,t),Tc.subVectors(e,t);let a=Si.dot(Si),o=Si.dot(Yi),c=Si.dot(Tc),l=Yi.dot(Yi),h=Yi.dot(Tc),p=a*l-o*o;if(p===0)return s.set(0,0,0),null;let d=1/p,u=(l*c-o*h)*d,m=(a*h-o*c)*d;return s.set(1-u-m,m,u)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,$i)!==null&&$i.x>=0&&$i.y>=0&&$i.x+$i.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,$i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,$i.x),c.addScaledVector(a,$i.y),c.addScaledVector(o,$i.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return Rc.setScalar(0),Cc.setScalar(0),Ic.setScalar(0),Rc.fromBufferAttribute(e,t),Cc.fromBufferAttribute(e,n),Ic.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Rc,s.x),a.addScaledVector(Cc,s.y),a.addScaledVector(Ic,s.z),a}static isFrontFacing(e,t,n,r){return Si.subVectors(n,t),Yi.subVectors(e,t),Si.cross(Yi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Si.subVectors(this.c,this.b),Yi.subVectors(this.a,this.b),.5*Si.cross(Yi).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;ss.subVectors(r,n),as.subVectors(s,n),Ec.subVectors(e,n);let c=ss.dot(Ec),l=as.dot(Ec);if(c<=0&&l<=0)return t.copy(n);wc.subVectors(e,r);let h=ss.dot(wc),p=as.dot(wc);if(h>=0&&p<=h)return t.copy(r);let d=c*p-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ss,a);Ac.subVectors(e,s);let u=ss.dot(Ac),m=as.dot(Ac);if(m>=0&&u<=m)return t.copy(s);let f=u*l-c*m;if(f<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(as,o);let v=h*m-u*p;if(v<=0&&p-h>=0&&u-m>=0)return Ud.subVectors(s,r),o=(p-h)/(p-h+(u-m)),t.copy(r).addScaledVector(Ud,o);let g=1/(v+f+d);return a=f*g,o=d*g,t.copy(n).addScaledVector(ss,a).addScaledVector(as,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ti=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mi):Mi.fromBufferAttribute(s,a),Mi.applyMatrix4(e.matrixWorld),this.expandByPoint(Mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Za.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Za.copy(n.boundingBox)),Za.applyMatrix4(e.matrixWorld),this.union(Za)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mi),Mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hs),Ja.subVectors(this.max,Hs),os.subVectors(e.a,Hs),ls.subVectors(e.b,Hs),cs.subVectors(e.c,Hs),ur.subVectors(ls,os),dr.subVectors(cs,ls),Ar.subVectors(os,cs);let t=[0,-ur.z,ur.y,0,-dr.z,dr.y,0,-Ar.z,Ar.y,ur.z,0,-ur.x,dr.z,0,-dr.x,Ar.z,0,-Ar.x,-ur.y,ur.x,0,-dr.y,dr.x,0,-Ar.y,Ar.x,0];return!!Pc(t,os,ls,cs,Ja)&&(t=[1,0,0,0,1,0,0,0,1],!!Pc(t,os,ls,cs,Ja)&&(Ka.crossVectors(ur,dr),t=[Ka.x,Ka.y,Ka.z],Pc(t,os,ls,cs,Ja)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Mi).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Zi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zi)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Zi=[new I,new I,new I,new I,new I,new I,new I,new I],Mi=new I,Za=new Ti,os=new I,ls=new I,cs=new I,ur=new I,dr=new I,Ar=new I,Hs=new I,Ja=new I,Ka=new I,Rr=new I;function Pc(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Rr.fromArray(i,s);let o=r.x*Math.abs(Rr.x)+r.y*Math.abs(Rr.y)+r.z*Math.abs(Rr.z),c=e.dot(Rr),l=t.dot(Rr),h=n.dot(Rr);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var D1=vg();function vg(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,r[c]=24,r[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,r[c]=-l-1,r[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,r[c]=13,r[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,r[c]=24,r[256|c]=24):(n[c]=31744,n[256|c]=64512,r[c]=13,r[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var gn=new I,Qa=new ge,xg=0,Ct=class extends Di{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qa.fromBufferAttribute(this,t),Qa.applyMatrix3(e),this.setXY(t,Qa.x,Qa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix3(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix4(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyNormalMatrix(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.transformDirection(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pi(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pi(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pi(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array),s=kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var ra=class extends Ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var sa=class extends Ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var je=class extends Ct{constructor(e,t,n){super(new Float32Array(e),t,n)}},yg=new Ti,Ws=new I,Lc=new I,Ei=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):yg.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ws.subVectors(e,this.center);let t=Ws.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(Ws,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ws.copy(e.center).add(Lc)),this.expandByPoint(Ws.copy(e.center).sub(Lc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Sg=0,pi=new ut,Nc=new Kn,hs=new I,ai=new Ti,Xs=new Ti,Cn=new I,yt=class i extends Di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sg++}),this.uuid=Qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(sg(e)?sa:ra)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new rt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return pi.makeRotationFromQuaternion(e),this.applyMatrix4(pi),this}rotateX(e){return pi.makeRotationX(e),this.applyMatrix4(pi),this}rotateY(e){return pi.makeRotationY(e),this.applyMatrix4(pi),this}rotateZ(e){return pi.makeRotationZ(e),this.applyMatrix4(pi),this}translate(e,t,n){return pi.makeTranslation(e,t,n),this.applyMatrix4(pi),this}scale(e,t,n){return pi.makeScale(e,t,n),this.applyMatrix4(pi),this}lookAt(e){return Nc.lookAt(e),Nc.updateMatrix(),this.applyMatrix4(Nc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new je(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];ai.setFromBufferAttribute(s),this.morphTargetsRelative?(Cn.addVectors(this.boundingBox.min,ai.min),this.boundingBox.expandByPoint(Cn),Cn.addVectors(this.boundingBox.max,ai.max),this.boundingBox.expandByPoint(Cn)):(this.boundingBox.expandByPoint(ai.min),this.boundingBox.expandByPoint(ai.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new I,1/0);if(e){let n=this.boundingSphere.center;if(ai.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Xs.setFromBufferAttribute(o),this.morphTargetsRelative?(Cn.addVectors(ai.min,Xs.min),ai.expandByPoint(Cn),Cn.addVectors(ai.max,Xs.max),ai.expandByPoint(Cn)):(ai.expandByPoint(Xs.min),ai.expandByPoint(Xs.max))}ai.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Cn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Cn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Cn.fromBufferAttribute(o,l),c&&(hs.fromBufferAttribute(e,l),Cn.add(hs)),r=Math.max(r,n.distanceToSquared(Cn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");a!==void 0&&a.count===n.count||(a=new Ct(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let N=0;N<n.count;N++)o[N]=new I,c[N]=new I;let l=new I,h=new I,p=new I,d=new ge,u=new ge,m=new ge,f=new I,v=new I;function g(N,B,L){l.fromBufferAttribute(n,N),h.fromBufferAttribute(n,B),p.fromBufferAttribute(n,L),d.fromBufferAttribute(s,N),u.fromBufferAttribute(s,B),m.fromBufferAttribute(s,L),h.sub(l),p.sub(l),u.sub(d),m.sub(d);let X=1/(u.x*m.y-m.x*u.y);isFinite(X)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-u.y).multiplyScalar(X),v.copy(p).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(X),o[N].add(f),o[B].add(f),o[L].add(f),c[N].add(v),c[B].add(v),c[L].add(v))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let N=0,B=_.length;N<B;++N){let L=_[N],X=L.start;for(let F=X,K=X+L.count;F<K;F+=3)g(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let b=new I,T=new I,S=new I,M=new I;function C(N){S.fromBufferAttribute(r,N),M.copy(S);let B=o[N];b.copy(B),b.sub(S.multiplyScalar(S.dot(B))).normalize(),T.crossVectors(M,B);let L=T.dot(c[N])<0?-1:1;a.setXYZW(N,b.x,b.y,b.z,L)}for(let N=0,B=_.length;N<B;++N){let L=_[N],X=L.start;for(let F=X,K=X+L.count;F<K;F+=3)C(e.getX(F+0)),C(e.getX(F+1)),C(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Ct(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let r=new I,s=new I,a=new I,o=new I,c=new I,l=new I,h=new I,p=new I;if(e)for(let d=0,u=e.count;d<u;d+=3){let m=e.getX(d+0),f=e.getX(d+1),v=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,f),a.fromBufferAttribute(t,v),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,f),l.fromBufferAttribute(n,v),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(v,l.x,l.y,l.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Cn.fromBufferAttribute(e,t),Cn.normalize(),e.setXYZ(t,Cn.x,Cn.y,Cn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,p=o.normalized,d=new l.constructor(c.length*h),u=0,m=0;for(let f=0,v=c.length;f<v;f++){u=o.isInterleavedBufferAttribute?c[f]*o.data.stride+o.offset:c[f]*h;for(let g=0;g<h;g++)d[m++]=l[u++]}return new Ct(d,h,p)}if(this.index===null)return Ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let c=e(r[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,p=l.length;h<p;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let p=0,d=l.length;p<d;p++){let u=l[p];h.push(u.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let l in r){let h=r[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],p=s[l];for(let d=0,u=p.length;d<u;d++)h.push(p[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Io=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=Qi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Zn=new I,aa=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.applyMatrix4(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.applyNormalMatrix(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.transformDirection(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array),s=kt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ea("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ea("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Dc=new I,Mg=new I,bg=new rt,bi=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Dc.subVectors(n,t).cross(Mg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Dc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||bg.getNormalMatrix(e),r=this.coplanarPoint(Dc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},us,Tg=0,Ui=class extends Di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=Qi(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ze(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:Ze(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new at().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new bi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ge().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ge().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ys=class extends Ui{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qs=new I,ds=new I,ps=new I,fs=new ge,js=new ge,Jp=new ut,eo=new I,Ys=new I,to=new I,Od=new ge,Uc=new ge,Fd=new ge,oa=class extends Kn{constructor(e=new ys){if(super(),this.isSprite=!0,this.type="Sprite",us===void 0){us=new yt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Io(t,5);us.setIndex([0,1,2,0,2,3]),us.setAttribute("position",new aa(n,3,0,!1)),us.setAttribute("uv",new aa(n,2,3,!1))}this.geometry=us,this.material=e,this.center=new ge(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Qe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ds.setFromMatrixScale(this.matrixWorld),Jp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ps.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ds.multiplyScalar(-ps.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;no(eo.set(-.5,-.5,0),ps,a,ds,r,s),no(Ys.set(.5,-.5,0),ps,a,ds,r,s),no(to.set(.5,.5,0),ps,a,ds,r,s),Od.set(0,0),Uc.set(1,0),Fd.set(1,1);let o=e.ray.intersectTriangle(eo,Ys,to,!1,qs);if(o===null&&(no(Ys.set(-.5,.5,0),ps,a,ds,r,s),Uc.set(0,1),o=e.ray.intersectTriangle(eo,to,Ys,!1,qs),o===null))return;let c=e.ray.origin.distanceTo(qs);c<e.near||c>e.far||t.push({distance:c,point:qs.clone(),uv:Li.getInterpolation(qs,eo,Ys,to,Od,Uc,Fd,new ge),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function no(i,e,t,n,r,s){fs.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(js.x=s*fs.x-r*fs.y,js.y=r*fs.x+s*fs.y):js.copy(fs),i.copy(e),i.x+=js.x,i.y+=js.y,i.applyMatrix4(Jp)}var U1=new I,O1=new I;var Ji=new I,Oc=new I,io=new I,ro=new I,Lr=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ji)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ji.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ji.copy(this.origin).addScaledVector(this.direction,t),Ji.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Oc.copy(e).add(t).multiplyScalar(.5),io.copy(t).sub(e).normalize(),ro.copy(this.origin).sub(Oc);let s=.5*e.distanceTo(t),a=-this.direction.dot(io),o=ro.dot(this.direction),c=-ro.dot(io),l=ro.lengthSq(),h=Math.abs(1-a*a),p,d,u,m;if(h>0)if(p=a*c-o,d=a*o-c,m=s*h,p>=0)if(d>=-m)if(d<=m){let f=1/h;p*=f,d*=f,u=p*(p+a*d+2*o)+d*(a*p+d+2*c)+l}else d=s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;else d=-s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;else d<=-m?(p=Math.max(0,-(-a*s+o)),d=p>0?-s:Math.min(Math.max(-s,-c),s),u=-p*p+d*(d+2*c)+l):d<=m?(p=0,d=Math.min(Math.max(-s,-c),s),u=d*(d+2*c)+l):(p=Math.max(0,-(a*s+o)),d=p>0?s:Math.min(Math.max(-s,-c),s),u=-p*p+d*(d+2*c)+l);else d=a>0?-s:s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Oc).addScaledVector(io,d),u}intersectSphere(e,t){if(e.radius<0)return null;Ji.subVectors(e.center,this.origin);let n=Ji.dot(this.direction),r=Ji.dot(Ji)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-d.z)*p,c=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,c=(e.min.z-d.z)*p),n>c||o>r?null:((o>n||n!=n)&&(n=o),(c<r||r!=r)&&(r=c),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,Ji)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,p=e.x-a.x,d=e.y-a.y,u=e.z-a.z,m=t.x-a.x,f=t.y-a.y,v=t.z-a.z,g=n.x-a.x,_=n.y-a.y,b=n.z-a.z,T=Math.abs(c),S=Math.abs(l),M=Math.abs(h),C,N,B,L,X,F,K,te,ae,W,k,Z;if(T>=S&&T>=M?(B=c,F=p,ae=m,Z=g,c>=0?(C=l,N=h,L=d,X=u,K=f,te=v,W=_,k=b):(C=h,N=l,L=u,X=d,K=v,te=f,W=b,k=_)):S>=M?(B=l,F=d,ae=f,Z=_,l>=0?(C=h,N=c,L=u,X=p,K=v,te=m,W=b,k=g):(C=c,N=h,L=p,X=u,K=m,te=v,W=g,k=b)):(B=h,F=u,ae=v,Z=b,h>=0?(C=c,N=l,L=p,X=d,K=m,te=f,W=g,k=_):(C=l,N=c,L=d,X=p,K=f,te=m,W=_,k=g)),B===0)return null;let he=C/B,ce=N/B,re=L-he*F,xe=X-ce*F,pe=K-he*ae,le=te-ce*ae,ie=W-he*Z,fe=k-ce*Z,Se=ie*le-fe*pe,we=re*fe-xe*ie,w=pe*xe-le*re;if(r){if(Se<0||we<0||w<0)return null}else if((Se<0||we<0||w<0)&&(Se>0||we>0||w>0))return null;let E=Se+we+w;if(E===0)return null;let P=1/B*(Se*F+we*ae+w*Z);return(E>0?P<0:P>0)?null:this.at(P/E,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},la=class extends Ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Bd=new ut,Cr=new Lr,so=new Ei,zd=new I,ao=new I,oo=new I,lo=new I,Fc=new I,co=new I,Vd=new I,ho=new I,Vn=class extends Kn{constructor(e=new yt,t=new la){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){co.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],p=s[c];h!==0&&(Fc.fromBufferAttribute(p,e),a?co.addScaledVector(Fc,h):co.addScaledVector(Fc.sub(t),h))}t.add(co)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(s),Cr.copy(e.ray).recast(e.near),so.containsPoint(Cr.origin)===!1&&(Cr.intersectSphere(so,zd)===null||Cr.origin.distanceToSquared(zd)>(e.far-e.near)**2))return;Bd.copy(s).invert(),Cr.copy(e.ray).applyMatrix4(Bd),n.boundingBox!==null&&Cr.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Cr)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),b=Math.min(o.count,Math.min(v.start+v.count,u.start+u.count));_<b;_+=3)r=uo(this,g,e,n,l,h,p,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(o.count,u.start+u.count);m<f;m+=3)r=uo(this,a,e,n,l,h,p,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(c!==void 0)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),b=Math.min(c.count,Math.min(v.start+v.count,u.start+u.count));_<b;_+=3)r=uo(this,g,e,n,l,h,p,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(c.count,u.start+u.count);m<f;m+=3)r=uo(this,a,e,n,l,h,p,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};function Eg(i,e,t,n,r,s,a,o){let c;if(c=e.side===1?n.intersectTriangle(a,s,r,!0,o):n.intersectTriangle(r,s,a,e.side===0,o),c===null)return null;ho.copy(o),ho.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(ho);return l<t.near||l>t.far?null:{distance:l,point:ho.clone(),object:i}}function uo(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,ao),i.getVertexPosition(c,oo),i.getVertexPosition(l,lo);let h=Eg(i,e,t,n,ao,oo,lo,Vd);if(h){let p=new I;Li.getBarycoord(Vd,ao,oo,lo,p),r&&(h.uv=Li.getInterpolatedAttribute(r,o,c,l,p,new ge)),s&&(h.uv1=Li.getInterpolatedAttribute(s,o,c,l,p,new ge)),a&&(h.normal=Li.getInterpolatedAttribute(a,o,c,l,p,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new I,materialIndex:0};Li.getNormal(ao,oo,lo,d.normal),h.face=d,h.barycoord=p}return h}var F1=new Ht,B1=new Ht,z1=new Ht,V1=new Ht,k1=new ut,G1=new I,H1=new Ei,W1=new ut,X1=new Lr;var Nr=class extends Jn{constructor(e=null,t=1,n=1,r,s,a,o,c,l=1003,h=1003,p,d){super(null,a,o,c,l,h,r,s,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},q1=new ut,j1=new ut;var Y1=new ut,$1=new ut;var Z1=new Ti,J1=new ut,K1=new Vn,Q1=new Ei;var Ir=new Ei,wg=new ge(.5,.5),po=new I,_r=class{constructor(e=new bi,t=new bi,n=new bi,r=new bi,s=new bi,a=new bi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],p=s[5],d=s[6],u=s[7],m=s[8],f=s[9],v=s[10],g=s[11],_=s[12],b=s[13],T=s[14],S=s[15];if(r[0].setComponents(l-a,u-h,g-m,S-_).normalize(),r[1].setComponents(l+a,u+h,g+m,S+_).normalize(),r[2].setComponents(l+o,u+p,g+f,S+b).normalize(),r[3].setComponents(l-o,u-p,g-f,S-b).normalize(),n)r[4].setComponents(c,d,v,T).normalize(),r[5].setComponents(l-c,u-d,g-v,S-T).normalize();else if(r[4].setComponents(l-c,u-d,g-v,S-T).normalize(),t===2e3)r[5].setComponents(l+c,u+d,g+v,S+T).normalize();else{if(t!==2001)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(c,d,v,T).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ir.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ir.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ir)}intersectsSprite(e){Ir.center.set(0,0,0);let t=wg.distanceTo(e.center);return Ir.radius=.7071067811865476+t,Ir.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ir)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(po.x=r.normal.x>0?e.max.x:e.min.x,po.y=r.normal.y>0?e.max.y:e.min.y,po.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(po)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},kd=new ut,Po=class i{constructor(){this.coordinateSystem=2e3,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];kd.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new _r),n[r].setFromProjectionMatrix(kd,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new _r),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Wc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},eS=new ut,tS=new at(1,1,1),nS=new _r,iS=new Po,rS=new Ti,sS=new Ei,aS=new I,oS=new I,lS=new I,cS=new Wc,hS=new Vn;var Dr=class extends Ui{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new at(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Lo=new I,No=new I,Gd=new ut,$s=new Lr,fo=new Ei,Bc=new I,Hd=new I,Do=class extends Kn{constructor(e=new yt,t=new Dr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Lo.fromBufferAttribute(t,r-1),No.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Lo.distanceTo(No);e.setAttribute("lineDistance",new je(n,1))}else Ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fo.copy(n.boundingSphere),fo.applyMatrix4(r),fo.radius+=s,e.ray.intersectsSphere(fo)===!1)return;Gd.copy(r).invert(),$s.copy(e.ray).applyMatrix4(Gd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),u=Math.min(h.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=l){let v=h.getX(m),g=h.getX(m+1),_=mo(this,e,$s,c,v,g,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(u-1),f=h.getX(d),v=mo(this,e,$s,c,m,f,u-1);v&&t.push(v)}}else{let d=Math.max(0,a.start),u=Math.min(p.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=l){let v=mo(this,e,$s,c,m,m+1,m);v&&t.push(v)}if(this.isLineLoop){let m=mo(this,e,$s,c,u-1,d,u-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function mo(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(Lo.fromBufferAttribute(o,r),No.fromBufferAttribute(o,s),t.distanceSqToSegment(Lo,No,Bc,Hd)>n)return;Bc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Bc);return c<e.near||c>e.far?void 0:{distance:c,point:Hd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Wd=new I,Xd=new I,Ur=class extends Do{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Wd.fromBufferAttribute(t,r),Xd.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Wd.distanceTo(Xd);e.setAttribute("lineDistance",new je(n,1))}else Ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ss=class extends Ui{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qd=new ut,Xc=new Lr,go=new Ei,_o=new I,Oi=class extends Kn{constructor(e=new yt,t=new Ss){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),go.copy(n.boundingSphere),go.applyMatrix4(r),go.radius+=s,e.ray.intersectsSphere(go)===!1)return;qd.copy(r).invert(),Xc.copy(e.ray).applyMatrix4(qd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null)for(let p=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);p<d;p++){let u=l.getX(p);_o.fromBufferAttribute(h,u),jd(_o,u,c,r,e,t,this)}else for(let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);p<d;p++)_o.fromBufferAttribute(h,p),jd(_o,p,c,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function jd(i,e,t,n,r,s,a){let o=Xc.distanceSqToPoint(i);if(o<t){let c=new I;Xc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ca=class extends Jn{constructor(e=[],t=301,n,r,s,a,o,c,l,h){super(e,t,n,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},vr=class extends Jn{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var xr=class extends Jn{constructor(e,t,n=1014,r,s,a,o=1003,c=1003,l,h=1026,p=1){if(h!==1026&&h!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:p},r,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new vs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Uo=class extends xr{constructor(e,t=1014,n=301,r,s,a=1003,o=1003,c,l=1026){let h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ha=class extends Jn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Or=class i extends yt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],p=[],d=0,u=0;function m(f,v,g,_,b,T,S,M,C,N,B){let L=T/C,X=S/N,F=T/2,K=S/2,te=M/2,ae=C+1,W=N+1,k=0,Z=0,he=new I;for(let ce=0;ce<W;ce++){let re=ce*X-K;for(let xe=0;xe<ae;xe++){let pe=xe*L-F;he[f]=pe*_,he[v]=re*b,he[g]=te,l.push(he.x,he.y,he.z),he[f]=0,he[v]=0,he[g]=M>0?1:-1,h.push(he.x,he.y,he.z),p.push(xe/C),p.push(1-ce/N),k+=1}}for(let ce=0;ce<N;ce++)for(let re=0;re<C;re++){let xe=d+re+ae*ce,pe=d+re+ae*(ce+1),le=d+(re+1)+ae*(ce+1),ie=d+(re+1)+ae*ce;c.push(xe,pe,ie),c.push(pe,le,ie),Z+=6}o.addGroup(u,Z,B),u+=Z,d+=k}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Oo=class i extends yt{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,p=Math.PI/2*e,d=t,u=2*p+d,m=2*n+s,f=r+1,v=new I,g=new I;for(let _=0;_<=m;_++){let b=0,T=0,S=0,M=0;if(_<=n){let B=_/n,L=B*Math.PI/2;T=-h-e*Math.cos(L),S=e*Math.sin(L),M=-e*Math.cos(L),b=B*p}else if(_<=n+s){let B=(_-n)/s;T=B*t-h,S=e,M=0,b=p+B*d}else{let B=(_-n-s)/n,L=B*Math.PI/2;T=h+e*Math.sin(L),S=e*Math.cos(L),M=e*Math.sin(L),b=p+d+B*p}let C=Math.max(0,Math.min(1,b/u)),N=0;_===0?N=.5/r:_===m&&(N=-.5/r);for(let B=0;B<=r;B++){let L=B/r,X=L*Math.PI*2,F=Math.sin(X),K=Math.cos(X);g.x=-S*K,g.y=T,g.z=S*F,o.push(g.x,g.y,g.z),v.set(-S*K,M,S*F),v.normalize(),c.push(v.x,v.y,v.z),l.push(L+N,C)}if(_>0){let B=(_-1)*f;for(let L=0;L<r;L++){let X=B+L,F=B+L+1,K=_*f+L,te=_*f+L+1;a.push(X,F,K),a.push(F,te,K)}}}this.setIndex(a),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(c,3)),this.setAttribute("uv",new je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Fo=class i extends yt{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new I,h=new ge;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let p=0,d=3;p<=t;p++,d+=3){let u=n+p/t*r;l.x=e*Math.cos(u),l.y=e*Math.sin(u),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let p=1;p<=t;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(o,3)),this.setAttribute("uv",new je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ua=class i extends yt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let h=[],p=[],d=[],u=[],m=0,f=[],v=n/2,g=0;function _(b){let T=m,S=new ge,M=new I,C=0,N=b===!0?e:t,B=b===!0?1:-1;for(let X=1;X<=r;X++)p.push(0,v*B,0),d.push(0,B,0),u.push(.5,.5),m++;let L=m;for(let X=0;X<=r;X++){let F=X/r*c+o,K=Math.cos(F),te=Math.sin(F);M.x=N*te,M.y=v*B,M.z=N*K,p.push(M.x,M.y,M.z),d.push(0,B,0),S.x=.5*K+.5,S.y=.5*te*B+.5,u.push(S.x,S.y),m++}for(let X=0;X<r;X++){let F=T+X,K=L+X;b===!0?h.push(K,K+1,F):h.push(K+1,K,F),C+=3}l.addGroup(g,C,b===!0?1:2),g+=C}(function(){let b=new I,T=new I,S=0,M=(t-e)/n;for(let C=0;C<=s;C++){let N=[],B=C/s,L=B*(t-e)+e;for(let X=0;X<=r;X++){let F=X/r,K=F*c+o,te=Math.sin(K),ae=Math.cos(K);T.x=L*te,T.y=-B*n+v,T.z=L*ae,p.push(T.x,T.y,T.z),b.set(te,M,ae).normalize(),d.push(b.x,b.y,b.z),u.push(F,1-B),N.push(m++)}f.push(N)}for(let C=0;C<r;C++)for(let N=0;N<s;N++){let B=f[N][C],L=f[N+1][C],X=f[N+1][C+1],F=f[N][C+1];(e>0||N!==0)&&(h.push(B,L,F),S+=3),(t>0||N!==s-1)&&(h.push(L,X,F),S+=3)}l.addGroup(g,S,0),g+=S})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Bo=class i extends ua{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},yr=class i extends yt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(u,m,f,v){let g=v+1,_=[];for(let b=0;b<=g;b++){_[b]=[];let T=u.clone().lerp(f,b/g),S=m.clone().lerp(f,b/g),M=g-b;for(let C=0;C<=M;C++)_[b][C]=C===0&&b===g?T:T.clone().lerp(S,C/M)}for(let b=0;b<g;b++)for(let T=0;T<2*(g-b)-1;T++){let S=Math.floor(T/2);T%2==0?(c(_[b][S+1]),c(_[b+1][S]),c(_[b][S])):(c(_[b][S+1]),c(_[b+1][S+1]),c(_[b+1][S]))}}function c(u){s.push(u.x,u.y,u.z)}function l(u,m){let f=3*u;m.x=e[f+0],m.y=e[f+1],m.z=e[f+2]}function h(u,m,f,v){v<0&&u.x===1&&(a[m]=u.x-1),f.x===0&&f.z===0&&(a[m]=v/2/Math.PI+.5)}function p(u){return Math.atan2(u.z,-u.x)}function d(u){return Math.atan2(-u.y,Math.sqrt(u.x*u.x+u.z*u.z))}(function(u){let m=new I,f=new I,v=new I;for(let g=0;g<t.length;g+=3)l(t[g+0],m),l(t[g+1],f),l(t[g+2],v),o(m,f,v,u)})(r),(function(u){let m=new I;for(let f=0;f<s.length;f+=3)m.x=s[f+0],m.y=s[f+1],m.z=s[f+2],m.normalize().multiplyScalar(u),s[f+0]=m.x,s[f+1]=m.y,s[f+2]=m.z})(n),(function(){let u=new I;for(let m=0;m<s.length;m+=3){u.x=s[m+0],u.y=s[m+1],u.z=s[m+2];let f=p(u)/2/Math.PI+.5,v=d(u)/Math.PI+.5;a.push(f,1-v)}(function(){let m=new I,f=new I,v=new I,g=new I,_=new ge,b=new ge,T=new ge;for(let S=0,M=0;S<s.length;S+=9,M+=6){m.set(s[S+0],s[S+1],s[S+2]),f.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),_.set(a[M+0],a[M+1]),b.set(a[M+2],a[M+3]),T.set(a[M+4],a[M+5]),g.copy(m).add(f).add(v).divideScalar(3);let C=p(g);h(_,M+0,m,C),h(b,M+2,f,C),h(T,M+4,v,C)}})(),(function(){for(let m=0;m<a.length;m+=6){let f=a[m+0],v=a[m+2],g=a[m+4],_=Math.max(f,v,g),b=Math.min(f,v,g);_>.9&&b<.1&&(f<.2&&(a[m+0]+=1),v<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new je(s,3)),this.setAttribute("normal",new je(s.slice(),3)),this.setAttribute("uv",new je(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},zo=class i extends yr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},vo=new I,xo=new I,zc=new I,yo=new Li,Vo=class extends yt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(Eo*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],p=new Array(3),d={},u=[];for(let m=0;m<c;m+=3){a?(l[0]=a.getX(m),l[1]=a.getX(m+1),l[2]=a.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);let{a:f,b:v,c:g}=yo;if(f.fromBufferAttribute(o,l[0]),v.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),yo.getNormal(zc),p[0]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,p[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,p[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,p[0]!==p[1]&&p[1]!==p[2]&&p[2]!==p[0])for(let _=0;_<3;_++){let b=(_+1)%3,T=p[_],S=p[b],M=yo[h[_]],C=yo[h[b]],N=`${T}_${S}`,B=`${S}_${T}`;B in d&&d[B]?(zc.dot(d[B].normal)<=s&&(u.push(M.x,M.y,M.z),u.push(C.x,C.y,C.z)),d[B]=null):N in d||(d[N]={index0:l[_],index1:l[b],normal:zc.clone()})}}for(let m in d)if(d[m]){let{index0:f,index1:v}=d[m];vo.fromBufferAttribute(o,f),xo.fromBufferAttribute(o,v),u.push(vo.x,vo.y,vo.z),u.push(xo.x,xo.y,xo.z)}this.setAttribute("position",new je(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},li=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ze("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(r=Math.floor(c+(l-c)/2),o=n[r]-a,o<0)c=r+1;else{if(!(o>0)){l=r;break}l=r-1}if(r=l,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),c=t||(a.isVector2?new ge:new I);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new I,r=[],s=[],a=[],o=new I,c=new ut;for(let u=0;u<=e;u++){let m=u/e;r[u]=this.getTangentAt(m,new I)}s[0]=new I,a[0]=new I;let l=Number.MAX_VALUE,h=Math.abs(r[0].x),p=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),p<=l&&(l=p,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(gt(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(c.makeRotationAxis(o,m))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(gt(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(r[m],u*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ms=class extends li{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ge){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=c-this.aX,u=l-this.aY;c=d*h-u*p+this.aX,l=d*p+u*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ko=class extends Ms{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function tu(){let i=0,e=0,t=0,n=0;function r(s,a,o,c){i=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){r(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,p){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,u=(o-a)/h-(c-a)/(h+p)+(c-o)/p;d*=h,u*=h,r(a,o,d,u)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var Yd=new I,$d=new I,Vc=new tu,kc=new tu,Gc=new tu,Go=class extends li{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new I){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=r[(l-1)%s]:($d.subVectors(r[0],r[1]).add(r[0]),o=$d);let p=r[l%s],d=r[(l+1)%s];if(this.closed||l+2<s?c=r[(l+2)%s]:(Yd.subVectors(r[s-1],r[s-2]).add(r[s-1]),c=Yd),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(p),u),f=Math.pow(p.distanceToSquared(d),u),v=Math.pow(d.distanceToSquared(c),u);f<1e-4&&(f=1),m<1e-4&&(m=f),v<1e-4&&(v=f),Vc.initNonuniformCatmullRom(o.x,p.x,d.x,c.x,m,f,v),kc.initNonuniformCatmullRom(o.y,p.y,d.y,c.y,m,f,v),Gc.initNonuniformCatmullRom(o.z,p.z,d.z,c.z,m,f,v)}else this.curveType==="catmullrom"&&(Vc.initCatmullRom(o.x,p.x,d.x,c.x,this.tension),kc.initCatmullRom(o.y,p.y,d.y,c.y,this.tension),Gc.initCatmullRom(o.z,p.z,d.z,c.z,this.tension));return n.set(Vc.calc(h),kc.calc(h),Gc.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Zd(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function Ag(i,e){let t=1-i;return t*t*e}function Rg(i,e){return 2*(1-i)*i*e}function Cg(i,e){return i*i*e}function Js(i,e,t,n){return Ag(i,e)+Rg(i,t)+Cg(i,n)}function Ig(i,e){let t=1-i;return t*t*t*e}function Pg(i,e){let t=1-i;return 3*t*t*i*e}function Lg(i,e){return 3*(1-i)*i*i*e}function Ng(i,e){return i*i*i*e}function Ks(i,e,t,n,r){return Ig(i,e)+Pg(i,t)+Lg(i,n)+Ng(i,r)}var da=class extends li{constructor(e=new ge,t=new ge,n=new ge,r=new ge){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ge){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ks(e,r.x,s.x,a.x,o.x),Ks(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ho=class extends li{constructor(e=new I,t=new I,n=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new I){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ks(e,r.x,s.x,a.x,o.x),Ks(e,r.y,s.y,a.y,o.y),Ks(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},pa=class extends li{constructor(e=new ge,t=new ge){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ge){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ge){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Wo=class extends li{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fa=class extends li{constructor(e=new ge,t=new ge,n=new ge){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ge){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Js(e,r.x,s.x,a.x),Js(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ma=class extends li{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Js(e,r.x,s.x,a.x),Js(e,r.y,s.y,a.y),Js(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ga=class extends li{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ge){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,c=r[a===0?a:a-1],l=r[a],h=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return n.set(Zd(o,c.x,l.x,h.x,p.x),Zd(o,c.y,l.y,h.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ge().fromArray(r))}return this}},Xo=Object.freeze({__proto__:null,ArcCurve:ko,CatmullRomCurve3:Go,CubicBezierCurve:da,CubicBezierCurve3:Ho,EllipseCurve:Ms,LineCurve:pa,LineCurve3:Wo,QuadraticBezierCurve:fa,QuadraticBezierCurve3:ma,SplineCurve:ga}),qo=class extends li{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new Xo[r.type]().fromJSON(r))}return this}},_a=class extends qo{constructor(e){super(),this.type="Path",this.currentPoint=new ge,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new pa(this.currentPoint.clone(),new ge(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new fa(this.currentPoint.clone(),new ge(e,t),new ge(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new da(this.currentPoint.clone(),new ge(e,t),new ge(n,r),new ge(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ga(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,r,s,a,o,c),this}absellipse(e,t,n,r,s,a,o,c){let l=new Ms(e,t,n,r,s,a,o,c);if(this.curves.length>0){let p=l.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},va=class extends _a{constructor(e){super(e),this.uuid=Qi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new _a().fromJSON(r))}return this}};function Dg(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Kp(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=zg(i,e,s,t)),i.length>80*t){o=i[0],c=i[1];let h=o,p=c;for(let d=t;d<r;d+=t){let u=i[d],m=i[d+1];u<o&&(o=u),m<c&&(c=m),u>h&&(h=u),m>p&&(p=m)}l=Math.max(h-o,p-c),l=l!==0?32767/l:0}return xa(s,a,t,o,c,l,0),a}function Kp(i,e,t,n,r){let s;if(r===Zg(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=Jd(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Jd(a/n|0,i[a],i[a+1],s);return s&&bs(s,s.next)&&(Sa(s),s=s.next),s}function Fr(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!bs(n,n.next)&&an(n.prev,n,n.next)!==0)n=n.next;else{if(Sa(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function xa(i,e,t,n,r,s,a){if(!i)return;!a&&s&&Wg(i,n,r,s);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(s?Og(i,n,r,s):Ug(i))e.push(c.i,i.i,l.i),Sa(i),i=l.next,o=l.next;else if((i=l)===o){a?a===1?xa(i=Fg(Fr(i),e),e,t,n,r,s,2):a===2&&Bg(i,e,t,n,r,s):xa(Fr(i),e,t,n,r,s,1);break}}}function Ug(i){let e=i.prev,t=i,n=i.next;if(an(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(r,s,a),p=Math.min(o,c,l),d=Math.max(r,s,a),u=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=p&&m.y<=u&&Zs(r,o,s,c,a,l,m.x,m.y)&&an(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Og(i,e,t,n){let r=i.prev,s=i,a=i.next;if(an(r,s,a)>=0)return!1;let o=r.x,c=s.x,l=a.x,h=r.y,p=s.y,d=a.y,u=Math.min(o,c,l),m=Math.min(h,p,d),f=Math.max(o,c,l),v=Math.max(h,p,d),g=qc(u,m,e,t,n),_=qc(f,v,e,t,n),b=i.prevZ,T=i.nextZ;for(;b&&b.z>=g&&T&&T.z<=_;){if(b.x>=u&&b.x<=f&&b.y>=m&&b.y<=v&&b!==r&&b!==a&&Zs(o,h,c,p,l,d,b.x,b.y)&&an(b.prev,b,b.next)>=0||(b=b.prevZ,T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&Zs(o,h,c,p,l,d,T.x,T.y)&&an(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;b&&b.z>=g;){if(b.x>=u&&b.x<=f&&b.y>=m&&b.y<=v&&b!==r&&b!==a&&Zs(o,h,c,p,l,d,b.x,b.y)&&an(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;T&&T.z<=_;){if(T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&Zs(o,h,c,p,l,d,T.x,T.y)&&an(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function Fg(i,e){let t=i;do{let n=t.prev,r=t.next.next;!bs(n,r)&&ef(n,t,t.next,r)&&ya(n,r)&&ya(r,n)&&(e.push(n.i,t.i,r.i),Sa(t),Sa(t.next),t=i=r),t=t.next}while(t!==i);return Fr(t)}function Bg(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&jg(a,o)){let c=tf(a,o);return a=Fr(a,a.next),c=Fr(c,c.next),xa(a,e,t,n,r,s,0),void xa(c,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function zg(i,e,t,n){let r=[];for(let s=0,a=e.length;s<a;s++){let o=Kp(i,e[s]*n,s<a-1?e[s+1]*n:i.length,n,!1);o===o.next&&(o.steiner=!0),r.push(qg(o))}r.sort(Vg);for(let s=0;s<r.length;s++)t=kg(r[s],t);return t}function Vg(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function kg(i,e){let t=Gg(i,e);if(!t)return e;let n=tf(t,i);return Fr(n,n.next),Fr(t,t.next)}function Gg(i,e){let t=e,n=i.x,r=i.y,s,a=-1/0;if(bs(i,t))return t;do{if(bs(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let p=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>a&&(a=p,s=t.x<t.next.x?t:t.next,p===n))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,c=s.x,l=s.y,h=1/0;t=s;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Qp(r<l?n:a,r,c,l,r<l?a:n,r,t.x,t.y)){let p=Math.abs(r-t.y)/(n-t.x);ya(t,i)&&(p<h||p===h&&(t.x>s.x||t.x===s.x&&Hg(s,t)))&&(s=t,h=p)}t=t.next}while(t!==o);return s}function Hg(i,e){return an(i.prev,i,e.prev)<0&&an(e.next,i,i.next)<0}function Wg(i,e,t,n){let r=i;do r.z===0&&(r.z=qc(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Xg(r)}function Xg(i){let e,t=1;do{let n,r=i;i=null;let s=null;for(e=0;r;){e++;let a=r,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||r.z<=a.z)?(n=r,r=r.nextZ,o--):(n=a,a=a.nextZ,c--),s?s.nextZ=n:i=n,n.prevZ=s,s=n;r=a}s.nextZ=null,t*=2}while(e>1);return i}function qc(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function qg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Qp(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Zs(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Qp(i,e,t,n,r,s,a,o)}function jg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Yg(i,e)&&(ya(i,e)&&ya(e,i)&&$g(i,e)&&(an(i.prev,i,e.prev)||an(i,e.prev,e))||bs(i,e)&&an(i.prev,i,i.next)>0&&an(e.prev,e,e.next)>0)}function an(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function bs(i,e){return i.x===e.x&&i.y===e.y}function ef(i,e,t,n){let r=Mo(an(i,e,t)),s=Mo(an(i,e,n)),a=Mo(an(t,n,i)),o=Mo(an(t,n,e));return r!==s&&a!==o||!(r!==0||!So(i,t,e))||!(s!==0||!So(i,n,e))||!(a!==0||!So(t,i,n))||!(o!==0||!So(t,e,n))}function So(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Mo(i){return i>0?1:i<0?-1:0}function Yg(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&ef(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ya(i,e){return an(i.prev,i,i.next)<0?an(i,e,i.next)>=0&&an(i,i.prev,e)>=0:an(i,e,i.prev)<0||an(i,i.next,e)<0}function $g(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function tf(i,e){let t=jc(i.i,i.x,i.y),n=jc(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Jd(i,e,t,n){let r=jc(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Sa(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function jc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Zg(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var Yc=class{static triangulate(e,t,n=2){return Dg(e,t,n)}},Ni=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Kd(e),Qd(n,e);let a=e.length;t.forEach(Kd);for(let c=0;c<t.length;c++)r.push(a),a+=t[c].length,Qd(n,t[c]);let o=Yc.triangulate(n,r);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Kd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Qd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var jo=class i extends yt{constructor(e=new va([new ge(.5,.5),new ge(-.5,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:u-.1,f=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Jg,b,T,S,M,C,N=!1;if(g){b=g.getSpacedPoints(h),N=!0,d=!1;let P=!!g.isCatmullRomCurve3&&g.closed;T=g.computeFrenetFrames(h,P),S=new I,M=new I,C=new I}d||(v=0,u=0,m=0,f=0);let B=o.extractPoints(l),L=B.shape,X=B.holes;if(!Ni.isClockWise(L)){L=L.reverse();for(let P=0,O=X.length;P<O;P++){let y=X[P];Ni.isClockWise(y)&&(X[P]=y.reverse())}}function F(P){let O=10000000000000001e-36,y=P[0];for(let z=1;z<=P.length;z++){let D=z%P.length,R=P[D],q=R.x-y.x,$=R.y-y.y,J=q*q+$*$,ue=Math.max(Math.abs(R.x),Math.abs(R.y),Math.abs(y.x),Math.abs(y.y));J<=O*ue*ue?(P.splice(D,1),z--):y=R}}F(L),X.forEach(F);let K=X.length,te=L;for(let P=0;P<K;P++){let O=X[P];L=L.concat(O)}function ae(P,O,y){return O||Qe("ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(O,y)}let W=L.length;function k(P,O,y){let z,D,R,q=P.x-O.x,$=P.y-O.y,J=y.x-P.x,ue=y.y-P.y,Ue=q*q+$*$,Ne=q*ue-$*J;if(Math.abs(Ne)>Number.EPSILON){let Me=Math.sqrt(Ue),He=Math.sqrt(J*J+ue*ue),de=O.x-$/Me,ye=O.y+q/Me,_e=((y.x-ue/He-de)*ue-(y.y+J/He-ye)*J)/(q*ue-$*J);z=de+q*_e-P.x,D=ye+$*_e-P.y;let oe=z*z+D*D;if(oe<=2)return new ge(z,D);R=Math.sqrt(oe/2)}else{let Me=!1;q>Number.EPSILON?J>Number.EPSILON&&(Me=!0):q<-Number.EPSILON?J<-Number.EPSILON&&(Me=!0):Math.sign($)===Math.sign(ue)&&(Me=!0),Me?(z=-$,D=q,R=Math.sqrt(Ue)):(z=q,D=$,R=Math.sqrt(Ue/2))}return new ge(z/R,D/R)}let Z=[];for(let P=0,O=te.length,y=O-1,z=P+1;P<O;P++,y++,z++)y===O&&(y=0),z===O&&(z=0),Z[P]=k(te[P],te[y],te[z]);let he=[],ce,re,xe=Z.concat();for(let P=0,O=K;P<O;P++){let y=X[P];ce=[];for(let z=0,D=y.length,R=D-1,q=z+1;z<D;z++,R++,q++)R===D&&(R=0),q===D&&(q=0),ce[z]=k(y[z],y[R],y[q]);he.push(ce),xe=xe.concat(ce)}if(v===0)re=Ni.triangulateShape(te,X);else{let P=[],O=[];for(let y=0;y<v;y++){let z=y/v,D=u*Math.cos(z*Math.PI/2),R=m*Math.sin(z*Math.PI/2)+f;for(let q=0,$=te.length;q<$;q++){let J=ae(te[q],Z[q],R);fe(J.x,J.y,-D),z===0&&P.push(J)}for(let q=0,$=K;q<$;q++){let J=X[q];ce=he[q];let ue=[];for(let Ue=0,Ne=J.length;Ue<Ne;Ue++){let Me=ae(J[Ue],ce[Ue],R);fe(Me.x,Me.y,-D),z===0&&ue.push(Me)}z===0&&O.push(ue)}}re=Ni.triangulateShape(P,O)}let pe=re.length,le=m+f;for(let P=0;P<W;P++){let O=d?ae(L[P],xe[P],le):L[P];N?(M.copy(T.normals[0]).multiplyScalar(O.x),S.copy(T.binormals[0]).multiplyScalar(O.y),C.copy(b[0]).add(M).add(S),fe(C.x,C.y,C.z)):fe(O.x,O.y,0)}for(let P=1;P<=h;P++)for(let O=0;O<W;O++){let y=d?ae(L[O],xe[O],le):L[O];N?(M.copy(T.normals[P]).multiplyScalar(y.x),S.copy(T.binormals[P]).multiplyScalar(y.y),C.copy(b[P]).add(M).add(S),fe(C.x,C.y,C.z)):fe(y.x,y.y,p/h*P)}for(let P=v-1;P>=0;P--){let O=P/v,y=u*Math.cos(O*Math.PI/2),z=m*Math.sin(O*Math.PI/2)+f;for(let D=0,R=te.length;D<R;D++){let q=ae(te[D],Z[D],z);fe(q.x,q.y,p+y)}for(let D=0,R=X.length;D<R;D++){let q=X[D];ce=he[D];for(let $=0,J=q.length;$<J;$++){let ue=ae(q[$],ce[$],z);N?fe(ue.x,ue.y+b[h-1].y,b[h-1].x+y):fe(ue.x,ue.y,p+y)}}}function ie(P,O){let y=P.length;for(;--y>=0;){let z=y,D=y-1;D<0&&(D=P.length-1);for(let R=0,q=h+2*v;R<q;R++){let $=W*R,J=W*(R+1);we(O+z+$,O+D+$,O+D+J,O+z+J)}}}function fe(P,O,y){c.push(P),c.push(O),c.push(y)}function Se(P,O,y){w(P),w(O),w(y);let z=r.length/3,D=_.generateTopUV(n,r,z-3,z-2,z-1);E(D[0]),E(D[1]),E(D[2])}function we(P,O,y,z){w(P),w(O),w(z),w(O),w(y),w(z);let D=r.length/3,R=_.generateSideWallUV(n,r,D-6,D-3,D-2,D-1);E(R[0]),E(R[1]),E(R[3]),E(R[1]),E(R[2]),E(R[3])}function w(P){r.push(c[3*P+0]),r.push(c[3*P+1]),r.push(c[3*P+2])}function E(P){s.push(P.x),s.push(P.y)}(function(){let P=r.length/3;if(d){let O=0,y=W*O;for(let z=0;z<pe;z++){let D=re[z];Se(D[2]+y,D[1]+y,D[0]+y)}O=h+2*v,y=W*O;for(let z=0;z<pe;z++){let D=re[z];Se(D[0]+y,D[1]+y,D[2]+y)}}else{for(let O=0;O<pe;O++){let y=re[O];Se(y[2],y[1],y[0])}for(let O=0;O<pe;O++){let y=re[O];Se(y[0]+W*h,y[1]+W*h,y[2]+W*h)}}n.addGroup(P,r.length/3-P,0)})(),(function(){let P=r.length/3,O=0;ie(te,O),O+=te.length;for(let y=0,z=X.length;y<z;y++){let D=X[y];ie(D,O),O+=D.length}n.addGroup(P,r.length/3-P,1)})()}this.setAttribute("position",new je(r,3)),this.setAttribute("uv",new je(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return Kg(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Xo[r.type]().fromJSON(r)),new i(n,e.options)}},Jg={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*r],h=e[3*r+1];return[new ge(s,a),new ge(o,c),new ge(l,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],p=e[3*n+2],d=e[3*r],u=e[3*r+1],m=e[3*r+2],f=e[3*s],v=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new ge(a,1-c),new ge(l,1-p),new ge(d,1-m),new ge(f,1-g)]:[new ge(o,1-c),new ge(h,1-p),new ge(u,1-m),new ge(v,1-g)]}};function Kg(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Yo=class i extends yr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},$o=class i extends yt{constructor(e=[new ge(0,-.5),new ge(.5,0),new ge(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=gt(r,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,p=new I,d=new ge,u=new I,m=new I,f=new I,v=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,f.copy(u),u.normalize(),c.push(u.x,u.y,u.z);break;case e.length-1:c.push(f.x,f.y,f.z);break;default:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,m.copy(u),u.x+=f.x,u.y+=f.y,u.z+=f.z,u.normalize(),c.push(u.x,u.y,u.z),f.copy(m)}for(let _=0;_<=t;_++){let b=n+_*h*r,T=Math.sin(b),S=Math.cos(b);for(let M=0;M<=e.length-1;M++){p.x=e[M].x*T,p.y=e[M].y,p.z=e[M].x*S,a.push(p.x,p.y,p.z),d.x=_/t,d.y=M/(e.length-1),o.push(d.x,d.y);let C=c[3*M+0]*T,N=c[3*M+1],B=c[3*M+0]*S;l.push(C,N,B)}}for(let _=0;_<t;_++)for(let b=0;b<e.length-1;b++){let T=b+_*e.length,S=T,M=T+e.length,C=T+e.length+1,N=T+1;s.push(S,M,N),s.push(C,N,M)}this.setIndex(s),this.setAttribute("position",new je(a,3)),this.setAttribute("uv",new je(o,2)),this.setAttribute("normal",new je(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Zo=class i extends yr{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ts=class i extends yt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,h=c+1,p=e/o,d=t/c,u=[],m=[],f=[],v=[];for(let g=0;g<h;g++){let _=g*d-a;for(let b=0;b<l;b++){let T=b*p-s;m.push(T,-_,0),f.push(0,0,1),v.push(b/o),v.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let b=_+l*g,T=_+l*(g+1),S=_+1+l*(g+1),M=_+1+l*g;u.push(b,T,M),u.push(T,S,M)}this.setIndex(u),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Jo=class i extends yt{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],p=e,d=(t-e)/(r=Math.max(1,r)),u=new I,m=new ge;for(let f=0;f<=r;f++){for(let v=0;v<=n;v++){let g=s+v/n*a;u.x=p*Math.cos(g),u.y=p*Math.sin(g),c.push(u.x,u.y,u.z),l.push(0,0,1),m.x=(u.x/t+1)/2,m.y=(u.y/t+1)/2,h.push(m.x,m.y)}p+=d}for(let f=0;f<r;f++){let v=f*(n+1);for(let g=0;g<n;g++){let _=g+v,b=_,T=_+n+1,S=_+n+2,M=_+1;o.push(b,T,M),o.push(T,S,M)}}this.setIndex(o),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Ko=class i extends yt{constructor(e=new va([new ge(0,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let p=r.length/3,d=h.extractPoints(t),u=d.shape,m=d.holes;Ni.isClockWise(u)===!1&&(u=u.reverse());for(let v=0,g=m.length;v<g;v++){let _=m[v];Ni.isClockWise(_)===!0&&(m[v]=_.reverse())}let f=Ni.triangulateShape(u,m);for(let v=0,g=m.length;v<g;v++){let _=m[v];u=u.concat(_)}for(let v=0,g=u.length;v<g;v++){let _=u[v];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let v=0,g=f.length;v<g;v++){let _=f[v],b=_[0]+p,T=_[1]+p,S=_[2]+p;n.push(b,T,S),c+=3}}this.setIndex(n),this.setAttribute("position",new je(r,3)),this.setAttribute("normal",new je(s,3)),this.setAttribute("uv",new je(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return Qg(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function Qg(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var Es=class i extends yt{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],p=new I,d=new I,u=[],m=[],f=[],v=[];for(let g=0;g<=n;g++){let _=[],b=g/n,T=a+b*o,S=e*Math.cos(T),M=Math.sqrt(e*e-S*S),C=0;g===0&&a===0?C=.5/t:g===n&&c===Math.PI&&(C=-.5/t);for(let N=0;N<=t;N++){let B=N/t,L=r+B*s;p.x=-M*Math.cos(L),p.y=S,p.z=M*Math.sin(L),m.push(p.x,p.y,p.z),d.copy(p).normalize(),f.push(d.x,d.y,d.z),v.push(B+C,1-b),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let b=h[g][_+1],T=h[g][_],S=h[g+1][_],M=h[g+1][_+1];(g!==0||a>0)&&u.push(b,T,M),(g!==n-1||c<Math.PI)&&u.push(T,S,M)}this.setIndex(u),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Qo=class i extends yr{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},el=class i extends yt{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI,a=0,o=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let c=[],l=[],h=[],p=[],d=new I,u=new I,m=new I;for(let f=0;f<=n;f++){let v=a+f/n*o;for(let g=0;g<=r;g++){let _=g/r*s;u.x=(e+t*Math.cos(v))*Math.cos(_),u.y=(e+t*Math.cos(v))*Math.sin(_),u.z=t*Math.sin(v),l.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),m.subVectors(u,d).normalize(),h.push(m.x,m.y,m.z),p.push(g/r),p.push(f/n)}}for(let f=1;f<=n;f++)for(let v=1;v<=r;v++){let g=(r+1)*f+v-1,_=(r+1)*(f-1)+v-1,b=(r+1)*(f-1)+v,T=(r+1)*f+v;c.push(g,_,T),c.push(_,b,T)}this.setIndex(c),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},tl=class i extends yt{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],c=[],l=[],h=[],p=new I,d=new I,u=new I,m=new I,f=new I,v=new I,g=new I;for(let b=0;b<=n;++b){let T=b/n*s*Math.PI*2;_(T,s,a,e,u),_(T+.01,s,a,e,m),v.subVectors(m,u),g.addVectors(m,u),f.crossVectors(v,g),g.crossVectors(f,v),f.normalize(),g.normalize();for(let S=0;S<=r;++S){let M=S/r*Math.PI*2,C=-t*Math.cos(M),N=t*Math.sin(M);p.x=u.x+(C*g.x+N*f.x),p.y=u.y+(C*g.y+N*f.y),p.z=u.z+(C*g.z+N*f.z),c.push(p.x,p.y,p.z),d.subVectors(p,u).normalize(),l.push(d.x,d.y,d.z),h.push(b/n),h.push(S/r)}}for(let b=1;b<=n;b++)for(let T=1;T<=r;T++){let S=(r+1)*(b-1)+(T-1),M=(r+1)*b+(T-1),C=(r+1)*b+T,N=(r+1)*(b-1)+T;o.push(S,M,N),o.push(M,C,N)}function _(b,T,S,M,C){let N=Math.cos(b),B=Math.sin(b),L=S/T*b,X=Math.cos(L);C.x=M*(2+X)*.5*N,C.y=M*(2+X)*B*.5,C.z=M*Math.sin(L)*.5}this.setIndex(o),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},nl=class i extends yt{constructor(e=new ma(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new I,c=new I,l=new ge,h=new I,p=[],d=[],u=[],m=[];function f(v){h=e.getPointAt(v/t,h);let g=a.normals[v],_=a.binormals[v];for(let b=0;b<=r;b++){let T=b/r*Math.PI*2,S=Math.sin(T),M=-Math.cos(T);c.x=M*g.x+S*_.x,c.y=M*g.y+S*_.y,c.z=M*g.z+S*_.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,p.push(o.x,o.y,o.z)}}(function(){for(let v=0;v<t;v++)f(v);f(s===!1?t:0),(function(){for(let v=0;v<=t;v++)for(let g=0;g<=r;g++)l.x=v/t,l.y=g/r,u.push(l.x,l.y)})(),(function(){for(let v=1;v<=t;v++)for(let g=1;g<=r;g++){let _=(r+1)*(v-1)+(g-1),b=(r+1)*v+(g-1),T=(r+1)*v+g,S=(r+1)*(v-1)+g;m.push(_,b,S),m.push(b,T,S)}})()})(),this.setIndex(m),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Xo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},il=class extends yt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new I,s=new I;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let p=c[l],d=p.start;for(let u=d,m=d+p.count;u<m;u+=3)for(let f=0;f<3;f++){let v=o.getX(u+f),g=o.getX(u+(f+1)%3);r.fromBufferAttribute(a,v),s.fromBufferAttribute(a,g),ep(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,p=3*o+(l+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,p),ep(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new je(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function ep(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var uS=Object.freeze({__proto__:null,BoxGeometry:Or,CapsuleGeometry:Oo,CircleGeometry:Fo,ConeGeometry:Bo,CylinderGeometry:ua,DodecahedronGeometry:zo,EdgesGeometry:Vo,ExtrudeGeometry:jo,IcosahedronGeometry:Yo,LatheGeometry:$o,OctahedronGeometry:Zo,PlaneGeometry:Ts,PolyhedronGeometry:yr,RingGeometry:Jo,ShapeGeometry:Ko,SphereGeometry:Es,TetrahedronGeometry:Qo,TorusGeometry:el,TorusKnotGeometry:tl,TubeGeometry:nl,WireframeGeometry:il});function Wr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(tp(r))r.isRenderTargetTexture?(Ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(tp(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Hn(i){let e={};for(let t=0;t<i.length;t++){let n=Wr(i[t]);for(let r in n)e[r]=n[r]}return e}function tp(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function e0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function nu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Tt.workingColorSpace}var nf={clone:Wr,merge:Hn},t0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_n=class extends Ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=t0,this.fragmentShader=n0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wr(e.uniforms),this.uniformsGroups=e0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new at().setHex(r.value);break;case"v2":this.uniforms[n].value=new ge().fromArray(r.value);break;case"v3":this.uniforms[n].value=new I().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Ht().fromArray(r.value);break;case"m3":this.uniforms[n].value=new rt().fromArray(r.value);break;case"m4":this.uniforms[n].value=new ut().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},rl=class extends _n{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var sl=class extends Ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},al=class extends Ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Ma=class extends Dr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ms(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function Hc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Sr=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ol=class extends Sr{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,o=2*t-n;break;case 2402:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+r[1]-r[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(n-t)/(r-t),f=m*m,v=f*m,g=-d*v+2*d*f-d*m,_=(1+d)*v+(-1.5-2*d)*f+(-.5+d)*m+1,b=(-1-u)*v+(1.5+u)*f+.5*m,T=u*v-u*f;for(let S=0;S!==o;++S)s[S]=g*a[h+S]+_*a[l+S]+b*a[c+S]+T*a[p+S];return s}},ll=class extends Sr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(r-t),p=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*p+a[c+d]*h;return s}},cl=class extends Sr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},hl=class extends Sr{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let m=(n-t)/(r-t),f=1-m;for(let v=0;v!==o;++v)s[v]=a[l+v]*f+a[c+v]*m;return s}let d=2*o,u=e-1;for(let m=0;m!==o;++m){let f=a[l+m],v=a[c+m],g=u*d+2*m,_=p[g],b=p[g+1],T=e*d+2*m,S=h[T],M=h[T+1],C=r0(n,t,_,S,r);s[m]=rf(C,f,b,M,v)}return s}};function rf(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function i0(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function r0(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=rf(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let c=i0(s,e,t,n,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}var oi=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ms(t,this.TimeBufferType),this.values=ms(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ms(e.times,Array),values:ms(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),Hc(e.settings)&&(n.settings={inTangents:ms(e.settings.inTangents,Array),outTangents:ms(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new cl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ll(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ol(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new hl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return Ze("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Hc(this.settings)&&(np(this.settings.inTangents,e),np(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Qe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Qe("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Qe("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(r!==void 0&&ag(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){Qe("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===2302,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(r)c=!0;else{let h=o*n,p=h-n,d=h+n;for(let u=0;u!==n;++u){let m=t[h+u];if(m!==t[p+u]||m!==t[d+u]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,p=a*n;for(let d=0;d!==n;++d)t[p+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,Hc(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function np(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}oi.prototype.ValueTypeName="",oi.prototype.TimeBufferType=Float32Array,oi.prototype.ValueBufferType=Float32Array,oi.prototype.DefaultInterpolation=2301;var fr=class extends oi{constructor(e,t,n){super(e,t,n)}};fr.prototype.ValueTypeName="bool",fr.prototype.ValueBufferType=Array,fr.prototype.DefaultInterpolation=2300,fr.prototype.InterpolantFactoryMethodLinear=void 0,fr.prototype.InterpolantFactoryMethodSmooth=void 0;var ul=class extends oi{constructor(e,t,n,r){super(e,t,n,r)}};ul.prototype.ValueTypeName="color";var dl=class extends oi{constructor(e,t,n,r){super(e,t,n,r)}};dl.prototype.ValueTypeName="number";var pl=class extends Sr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(r-t),l=e*o;for(let h=l+o;l!==h;l+=4)fi.slerpFlat(s,0,a,l-o,a,l,c);return s}},ba=class extends oi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new pl(this.times,this.values,this.getValueSize(),e)}};ba.prototype.ValueTypeName="quaternion",ba.prototype.InterpolantFactoryMethodSmooth=void 0;var mr=class extends oi{constructor(e,t,n){super(e,t,n)}};mr.prototype.ValueTypeName="string",mr.prototype.ValueBufferType=Array,mr.prototype.DefaultInterpolation=2300,mr.prototype.InterpolantFactoryMethodLinear=void 0,mr.prototype.InterpolantFactoryMethodSmooth=void 0;var fl=class extends oi{constructor(e,t,n,r){super(e,t,n,r)}};fl.prototype.ValueTypeName="vector";var ml=class{constructor(e,t,n){let r=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){c++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,c),o===c&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,p){return l.push(h,p),this},this.removeHandler=function(h){let p=l.indexOf(h);return p!==-1&&l.splice(p,2),this},this.getHandler=function(h){for(let p=0,d=l.length;p<d;p+=2){let u=l[p],m=l[p+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},sf=new ml,gl=class{constructor(e){this.manager=e!==void 0?e:sf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};gl.DEFAULT_MATERIAL_NAME="__DEFAULT";var dS=new ut,pS=new I,fS=new I;var bo=new I,To=new fi,Ii=new I,ws=class extends Kn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(bo,To,Ii),Ii.x===1&&Ii.y===1&&Ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bo,To,Ii.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(bo,To,Ii),Ii.x===1&&Ii.y===1&&Ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bo,To,Ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},pr=new I,ip=new ge,rp=new ge,zn=class extends ws{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*wo*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Eo*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*wo*Math.atan(Math.tan(.5*Eo*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){pr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pr.x,pr.y).multiplyScalar(-e/pr.z),pr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pr.x,pr.y).multiplyScalar(-e/pr.z)}getViewSize(e,t){return this.getViewBounds(e,ip,rp),t.subVectors(rp,ip)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Eo*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ta=class extends ws{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var mS=new ut,gS=new ut,_S=new ut;var _l=class extends Kn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new zn(-90,1,e,t);r.layers=this.layers,this.add(r);let s=new zn(-90,1,e,t);s.layers=this.layers,this.add(s);let a=new zn(-90,1,e,t);a.layers=this.layers,this.add(a);let o=new zn(-90,1,e,t);o.layers=this.layers,this.add(o);let c=new zn(-90,1,e,t);c.layers=this.layers,this.add(c);let l=new zn(-90,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==2001)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;v=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=f,e.setRenderTarget(n,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,d,u),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},vl=class extends zn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ea=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=s0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function s0(){this._document.hidden===!1&&this.reset()}var vS=new I,xS=new fi,yS=new I,SS=new I,MS=new I;var bS=new I,TS=new fi,ES=new I,wS=new I;var a0=new RegExp("[\\[\\]\\.:\\/]","g"),iu="[^\\[\\]\\.:\\/]",o0="[^"+"\\[\\]\\.:\\/".replace("\\.","")+"]",l0=/((?:WC+[\/:])*)/.source.replace("WC",iu),c0=/(WCOD+)?/.source.replace("WCOD",o0),h0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",iu),u0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",iu),d0=new RegExp("^"+l0+c0+h0+u0+"$"),p0=["material","materials","bones","map"],$c=class{constructor(e,t,n){let r=n||Jt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Jt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(a0,"")}static parseTrackName(e){let t=d0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);p0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void Ze("PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void Qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void Qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void Qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void Qe("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void Qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[r];if(a===void 0)return void Qe("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+r+" but it wasn't found.",e);let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Jt.Composite=$c,Jt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Jt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Jt.prototype.GetterByBindingType=[Jt.prototype._getValue_direct,Jt.prototype._getValue_array,Jt.prototype._getValue_arrayElement,Jt.prototype._getValue_toArray],Jt.prototype.SetterByBindingTypeAndVersioning=[[Jt.prototype._setValue_direct,Jt.prototype._setValue_direct_setNeedsUpdate,Jt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Jt.prototype._setValue_array,Jt.prototype._setValue_array_setNeedsUpdate,Jt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Jt.prototype._setValue_arrayElement,Jt.prototype._setValue_arrayElement_setNeedsUpdate,Jt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Jt.prototype._setValue_fromArray,Jt.prototype._setValue_fromArray_setNeedsUpdate,Jt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var AS=new Float32Array(1);var RS=new ut;var cu=class cu{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};cu.prototype.isMatrix2=!0;var Zc=cu,CS=new ge;var IS=new I,PS=new I,LS=new I,NS=new I,DS=new I,US=new I,OS=new I;var FS=new I;var BS=new I,zS=new ut,VS=new ut;var kS=new I,GS=new at,HS=new at;var WS=new I,XS=new I,qS=new I;var jS=new I,YS=new ws;var $S=new Ti;var ZS=new I;function ru(i,e,t,n){let r=f0(n);switch(t){case 1021:return i*e;case 1028:case 1029:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case 1023:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:case 37496:case 37490:case 37491:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function f0(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}})),typeof window<"u"&&(window.__THREE__?Ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Af(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function g0(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=i.createBuffer(),p;if(i.bindBuffer(a,h),i.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)p=i.HALF_FLOAT;else if(o instanceof Uint16Array)p=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)p=i.SHORT;else if(o instanceof Uint32Array)p=i.UNSIGNED_INT;else if(o instanceof Int32Array)p=i.INT;else if(o instanceof Int8Array)p=i.BYTE;else if(o instanceof Uint8Array)p=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);p=i.UNSIGNED_BYTE}return{buffer:h,type:p,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(i.bindBuffer(o,s),l.length===0)i.bufferSubData(o,0,c);else{l.sort((p,d)=>p.start-d.start);let h=0;for(let p=1;p<l.length;p++){let d=l[h],u=l[p];u.start<=d.start+d.count+1?d.count=Math.max(d.count,u.start+u.count-d.start):(++h,l[h]=u)}l.length=h+1;for(let p=0,d=l.length;p<d;p++){let u=l[p];i.bufferSubData(o,u.start*c.BYTES_PER_ELEMENT,c,u.start,u.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var _0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,v0=`#ifdef USE_ALPHAHASH
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
#endif`,x0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,y0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,S0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,M0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,b0=`#ifdef USE_AOMAP
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
#endif`,T0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,E0=`#ifdef USE_BATCHING
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
#endif`,w0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,A0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,R0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,C0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,I0=`#ifdef USE_IRIDESCENCE
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
#endif`,P0=`#ifdef USE_BUMPMAP
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
#endif`,L0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,O0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,F0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,B0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,V0=`#define PI 3.141592653589793
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
} // validated`,k0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,G0=`vec3 transformedNormal = objectNormal;
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
#endif`,H0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,W0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,X0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,j0="gl_FragColor = linearToOutputTexel( gl_FragColor );",Y0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$0=`#ifdef USE_ENVMAP
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
#endif`,Z0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,J0=`#ifdef USE_ENVMAP
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
#endif`,K0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Q0=`#ifdef USE_ENVMAP
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
#endif`,e_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,t_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,n_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,r_=`#ifdef USE_GRADIENTMAP
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
}`,s_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,a_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,o_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,l_=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,c_=`#ifdef USE_ENVMAP
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
#endif`,h_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,u_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,d_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,p_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,f_=`PhysicalMaterial material;
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
#endif`,m_=`uniform sampler2D dfgLUT;
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
}`,g_=`
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
#endif`,__=`#if defined( RE_IndirectDiffuse )
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
#endif`,v_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,x_=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,y_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,S_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,T_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,E_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,w_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,A_=`#if defined( USE_POINTS_UV )
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
#endif`,R_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,C_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,I_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,P_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,L_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,N_=`#ifdef USE_MORPHTARGETS
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
#endif`,D_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,O_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,F_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,z_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,V_=`#ifdef USE_NORMALMAP
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
#endif`,k_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,G_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,H_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,W_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,X_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,j_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Y_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Z_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,J_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,K_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Q_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ev=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,nv=`float getShadowMask() {
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
}`,iv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rv=`#ifdef USE_SKINNING
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
#endif`,sv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,av=`#ifdef USE_SKINNING
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
#endif`,ov=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,uv=`#ifdef USE_TRANSMISSION
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
#endif`,dv=`#ifdef USE_TRANSMISSION
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
#endif`,pv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,_v=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vv=`uniform sampler2D t2D;
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
}`,xv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Sv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bv=`#include <common>
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
}`,Tv=`#if DEPTH_PACKING == 3200
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
}`,Ev=`#define DISTANCE
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
}`,wv=`#define DISTANCE
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
}`,Av=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cv=`uniform float scale;
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
}`,Iv=`uniform vec3 diffuse;
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
}`,Pv=`#include <common>
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
}`,Lv=`uniform vec3 diffuse;
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
}`,Nv=`#define LAMBERT
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
}`,Dv=`#define LAMBERT
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
}`,Uv=`#define MATCAP
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
}`,Ov=`#define MATCAP
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
}`,Fv=`#define NORMAL
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
}`,Bv=`#define NORMAL
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
}`,zv=`#define PHONG
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
}`,Vv=`#define PHONG
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
}`,kv=`#define STANDARD
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
}`,Gv=`#define STANDARD
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
}`,Hv=`#define TOON
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
}`,Wv=`#define TOON
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
}`,Xv=`uniform float size;
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
}`,qv=`uniform vec3 diffuse;
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
}`,jv=`#include <common>
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
}`,Yv=`uniform vec3 color;
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
}`,$v=`uniform float rotation;
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
}`,Zv=`uniform vec3 diffuse;
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
}`,dt={alphahash_fragment:_0,alphahash_pars_fragment:v0,alphamap_fragment:x0,alphamap_pars_fragment:y0,alphatest_fragment:S0,alphatest_pars_fragment:M0,aomap_fragment:b0,aomap_pars_fragment:T0,batching_pars_vertex:E0,batching_vertex:w0,begin_vertex:A0,beginnormal_vertex:R0,bsdfs:C0,iridescence_fragment:I0,bumpmap_pars_fragment:P0,clipping_planes_fragment:L0,clipping_planes_pars_fragment:N0,clipping_planes_pars_vertex:D0,clipping_planes_vertex:U0,color_fragment:O0,color_pars_fragment:F0,color_pars_vertex:B0,color_vertex:z0,common:V0,cube_uv_reflection_fragment:k0,defaultnormal_vertex:G0,displacementmap_pars_vertex:H0,displacementmap_vertex:W0,emissivemap_fragment:X0,emissivemap_pars_fragment:q0,colorspace_fragment:j0,colorspace_pars_fragment:Y0,envmap_fragment:$0,envmap_common_pars_fragment:Z0,envmap_pars_fragment:J0,envmap_pars_vertex:K0,envmap_physical_pars_fragment:c_,envmap_vertex:Q0,fog_vertex:e_,fog_pars_vertex:t_,fog_fragment:n_,fog_pars_fragment:i_,gradientmap_pars_fragment:r_,lightmap_pars_fragment:s_,lights_lambert_fragment:a_,lights_lambert_pars_fragment:o_,lights_pars_begin:l_,lights_toon_fragment:h_,lights_toon_pars_fragment:u_,lights_phong_fragment:d_,lights_phong_pars_fragment:p_,lights_physical_fragment:f_,lights_physical_pars_fragment:m_,lights_fragment_begin:g_,lights_fragment_maps:__,lights_fragment_end:v_,lightprobes_pars_fragment:x_,logdepthbuf_fragment:y_,logdepthbuf_pars_fragment:S_,logdepthbuf_pars_vertex:M_,logdepthbuf_vertex:b_,map_fragment:T_,map_pars_fragment:E_,map_particle_fragment:w_,map_particle_pars_fragment:A_,metalnessmap_fragment:R_,metalnessmap_pars_fragment:C_,morphinstance_vertex:I_,morphcolor_vertex:P_,morphnormal_vertex:L_,morphtarget_pars_vertex:N_,morphtarget_vertex:D_,normal_fragment_begin:U_,normal_fragment_maps:O_,normal_pars_fragment:F_,normal_pars_vertex:B_,normal_vertex:z_,normalmap_pars_fragment:V_,clearcoat_normal_fragment_begin:k_,clearcoat_normal_fragment_maps:G_,clearcoat_pars_fragment:H_,iridescence_pars_fragment:W_,opaque_fragment:X_,packing:q_,premultiplied_alpha_fragment:j_,project_vertex:Y_,dithering_fragment:$_,dithering_pars_fragment:Z_,roughnessmap_fragment:J_,roughnessmap_pars_fragment:K_,shadowmap_pars_fragment:Q_,shadowmap_pars_vertex:ev,shadowmap_vertex:tv,shadowmask_pars_fragment:nv,skinbase_vertex:iv,skinning_pars_vertex:rv,skinning_vertex:sv,skinnormal_vertex:av,specularmap_fragment:ov,specularmap_pars_fragment:lv,tonemapping_fragment:cv,tonemapping_pars_fragment:hv,transmission_fragment:uv,transmission_pars_fragment:dv,uv_pars_fragment:pv,uv_pars_vertex:fv,uv_vertex:mv,worldpos_vertex:gv,background_vert:_v,background_frag:vv,backgroundCube_vert:xv,backgroundCube_frag:yv,cube_vert:Sv,cube_frag:Mv,depth_vert:bv,depth_frag:Tv,distance_vert:Ev,distance_frag:wv,equirect_vert:Av,equirect_frag:Rv,linedashed_vert:Cv,linedashed_frag:Iv,meshbasic_vert:Pv,meshbasic_frag:Lv,meshlambert_vert:Nv,meshlambert_frag:Dv,meshmatcap_vert:Uv,meshmatcap_frag:Ov,meshnormal_vert:Fv,meshnormal_frag:Bv,meshphong_vert:zv,meshphong_frag:Vv,meshphysical_vert:kv,meshphysical_frag:Gv,meshtoon_vert:Hv,meshtoon_frag:Wv,points_vert:Xv,points_frag:qv,shadow_vert:jv,shadow_frag:Yv,sprite_vert:$v,sprite_frag:Zv},Ie={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},envMapRotation:{value:new rt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},Gi={basic:{uniforms:Hn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:Hn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new at(0)},envMapIntensity:{value:1}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:Hn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:Hn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:Hn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new at(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:Hn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:Hn([Ie.points,Ie.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:Hn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:Hn([Ie.common,Ie.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:Hn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:Hn([Ie.sprite,Ie.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new rt}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distance:{uniforms:Hn([Ie.common,Ie.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distance_vert,fragmentShader:dt.distance_frag},shadow:{uniforms:Hn([Ie.lights,Ie.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};Gi.physical={uniforms:Hn([Gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};var Ol={r:0,b:0,g:0},Jv=new ut,Rf=new rt;function Kv(i,e,t,n,r,s){let a=new at(0),o,c,l=r===!0?0:1,h=null,p=0,d=null;function u(f){let v=f.isScene===!0?f.background:null;if(v&&v.isTexture){let g=f.backgroundBlurriness>0;v=e.get(v,g)}return v}function m(f,v){f.getRGB(Ol,nu(i)),t.buffers.color.setClear(Ol.r,Ol.g,Ol.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(f,v=1){a.set(f),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,m(a,l)},render:function(f){let v=!1,g=u(f);g===null?m(a,l):g&&g.isColor&&(m(g,1),v=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,s):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,v){let g=u(v);g&&(g.isCubeTexture||g.mapping===Aa)?(c===void 0&&(c=new Vn(new Or(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Wr(Gi.backgroundCube.uniforms),vertexShader:Gi.backgroundCube.vertexShader,fragmentShader:Gi.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=g,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Jv.makeRotationFromEuler(v.backgroundRotation)).transpose(),g.isCubeTexture&&g.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Rf),c.material.toneMapped=Tt.getTransfer(g.colorSpace)!==Wt,h===g&&p===g.version&&d===i.toneMapping||(c.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null)):g&&g.isTexture&&(o===void 0&&(o=new Vn(new Ts(2,2),new _n({name:"BackgroundMaterial",uniforms:Wr(Gi.background.uniforms),vertexShader:Gi.background.vertexShader,fragmentShader:Gi.background.fragmentShader,side:Rs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=g,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=Tt.getTransfer(g.colorSpace)!==Wt,g.matrixAutoUpdate===!0&&g.updateMatrix(),o.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&p===g.version&&d===i.toneMapping||(o.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),o.layers.enableAll(),f.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function Qv(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=l(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function c(g){return i.deleteVertexArray(g)}function l(g){let _=[],b=[],T=[];for(let S=0;S<t;S++)_[S]=0,b[S]=0,T[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:b,attributeDivisors:T,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,b=g.length;_<b;_++)g[_]=0}function p(g){d(g,0)}function d(g,_){let b=s.newAttributes,T=s.enabledAttributes,S=s.attributeDivisors;b[g]=1,T[g]===0&&(i.enableVertexAttribArray(g),T[g]=1),S[g]!==_&&(i.vertexAttribDivisor(g,_),S[g]=_)}function u(){let g=s.newAttributes,_=s.enabledAttributes;for(let b=0,T=_.length;b<T;b++)_[b]!==g[b]&&(i.disableVertexAttribArray(b),_[b]=0)}function m(g,_,b,T,S,M,C){C===!0?i.vertexAttribIPointer(g,_,b,S,M):i.vertexAttribPointer(g,_,b,T,S,M)}function f(){v(),a=!0,s!==r&&(s=r,o(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,b,T,S){let M=!1,C=(function(N,B,L,X){let F=X.wireframe===!0,K=n[B.id];K===void 0&&(K={},n[B.id]=K);let te=N.isInstancedMesh===!0?N.id:0,ae=K[te];ae===void 0&&(ae={},K[te]=ae);let W=ae[L.id];W===void 0&&(W={},ae[L.id]=W);let k=W[F];return k===void 0&&(k=l(i.createVertexArray()),W[F]=k),k})(g,T,b,_);s!==C&&(s=C,o(s.object)),M=(function(N,B,L,X){let F=s.attributes,K=B.attributes,te=0,ae=L.getAttributes();for(let W in ae)if(ae[W].location>=0){let k=F[W],Z=K[W];if(Z===void 0&&(W==="instanceMatrix"&&N.instanceMatrix&&(Z=N.instanceMatrix),W==="instanceColor"&&N.instanceColor&&(Z=N.instanceColor)),k===void 0||k.attribute!==Z||Z&&k.data!==Z.data)return!0;te++}return s.attributesNum!==te||s.index!==X})(g,T,b,S),M&&(function(N,B,L,X){let F={},K=B.attributes,te=0,ae=L.getAttributes();for(let W in ae)if(ae[W].location>=0){let k=K[W];k===void 0&&(W==="instanceMatrix"&&N.instanceMatrix&&(k=N.instanceMatrix),W==="instanceColor"&&N.instanceColor&&(k=N.instanceColor));let Z={};Z.attribute=k,k&&k.data&&(Z.data=k.data),F[W]=Z,te++}s.attributes=F,s.attributesNum=te,s.index=X})(g,T,b,S),S!==null&&e.update(S,i.ELEMENT_ARRAY_BUFFER),(M||a)&&(a=!1,(function(N,B,L,X){h();let F=X.attributes,K=L.getAttributes(),te=B.defaultAttributeValues;for(let ae in K){let W=K[ae];if(W.location>=0){let k=F[ae];if(k===void 0&&(ae==="instanceMatrix"&&N.instanceMatrix&&(k=N.instanceMatrix),ae==="instanceColor"&&N.instanceColor&&(k=N.instanceColor)),k!==void 0){let Z=k.normalized,he=k.itemSize,ce=e.get(k);if(ce===void 0)continue;let re=ce.buffer,xe=ce.type,pe=ce.bytesPerElement,le=xe===i.INT||xe===i.UNSIGNED_INT||k.gpuType===fh;if(k.isInterleavedBufferAttribute){let ie=k.data,fe=ie.stride,Se=k.offset;if(ie.isInstancedInterleavedBuffer){for(let we=0;we<W.locationSize;we++)d(W.location+we,ie.meshPerAttribute);N.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let we=0;we<W.locationSize;we++)p(W.location+we);i.bindBuffer(i.ARRAY_BUFFER,re);for(let we=0;we<W.locationSize;we++)m(W.location+we,he/W.locationSize,xe,Z,fe*pe,(Se+he/W.locationSize*we)*pe,le)}else{if(k.isInstancedBufferAttribute){for(let ie=0;ie<W.locationSize;ie++)d(W.location+ie,k.meshPerAttribute);N.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let ie=0;ie<W.locationSize;ie++)p(W.location+ie);i.bindBuffer(i.ARRAY_BUFFER,re);for(let ie=0;ie<W.locationSize;ie++)m(W.location+ie,he/W.locationSize,xe,Z,he*pe,he/W.locationSize*ie*pe,le)}}else if(te!==void 0){let Z=te[ae];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(W.location,Z);break;case 3:i.vertexAttrib3fv(W.location,Z);break;case 4:i.vertexAttrib4fv(W.location,Z);break;default:i.vertexAttrib1fv(W.location,Z)}}}}u()})(g,_,b,T),S!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(S).buffer))},reset:f,resetDefaultState:v,dispose:function(){f();for(let g in n){let _=n[g];for(let b in _){let T=_[b];for(let S in T){let M=T[S];for(let C in M)c(M[C].object),delete M[C];delete T[S]}}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let b in _){let T=_[b];for(let S in T){let M=T[S];for(let C in M)c(M[C].object),delete M[C];delete T[S]}}delete n[g.id]},releaseStatesOfObject:function(g){for(let _ in n){let b=n[_],T=g.isInstancedMesh===!0?g.id:0,S=b[T];if(S!==void 0){for(let M in S){let C=S[M];for(let N in C)c(C[N].object),delete C[N];delete S[M]}delete b[T],Object.keys(b).length===0&&delete n[_]}}},releaseStatesOfProgram:function(g){for(let _ in n){let b=n[_];for(let T in b){let S=b[T];if(S[g.id]===void 0)continue;let M=S[g.id];for(let C in M)c(M[C].object),delete M[C];delete S[g.id]}}},initAttributes:h,enableAttribute:p,disableUnusedAttributes:u}}function ex(i,e,t){let n;this.setMode=function(r){n=r},this.render=function(r,s){i.drawArrays(n,r,s),t.update(s,n,1)},this.renderInstances=function(r,s,a){a!==0&&(i.drawArraysInstanced(n,r,s,a),t.update(s,n,a))},this.renderMultiDraw=function(r,s,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,s,0,a);let o=0;for(let c=0;c<a;c++)o+=s[c];t.update(o,n,1)}}function tx(i,e,t,n){let r;function s(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(Ze("WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&l===!1&&Ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let h=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(h){return h===Vi||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let p=h===zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==Ri&&h!==gi&&!p&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:i.getParameter(i.MAX_SAMPLES),samples:i.getParameter(i.SAMPLES)}}function nx(i){let e=this,t=null,n=0,r=!1,s=!1,a=new bi,o=new rt,c={value:null,needsUpdate:!1};function l(h,p,d,u){let m=h!==null?h.length:0,f=null;if(m!==0){if(f=c.value,u!==!0||f===null){let v=d+4*m,g=p.matrixWorldInverse;o.getNormalMatrix(g),(f===null||f.length<v)&&(f=new Float32Array(v));for(let _=0,b=d;_!==m;++_,b+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(f,b),f[b+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let d=h.length!==0||p||n!==0||r;return r=p,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=l(h,p,0)},this.setState=function(h,p,d){let u=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,v=i.get(h);if(!r||u===null||u.length===0||s&&!f)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,b=v.clippingState||null;c.value=b,b=l(u,p,_,d);for(let T=0;T!==_;++T)b[T]=t[T];v.clippingState=b,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}Rf.set(-1,0,0,0,1,0,0,0,1);var Pa=new Ta,af=new at,hu=null,uu=0,du=0,pu=!1,ix=new I,Xr=new I,Bl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=ix}=s;hu=this._renderer.getRenderTarget(),uu=this._renderer.getActiveCubeFace(),du=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(hu,uu,du),this._renderer.xr.enabled=pu,e.scissorTest=!1,Ls(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Is||e.mapping===Br?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hu=this._renderer.getRenderTarget(),uu=this._renderer.getActiveCubeFace(),du=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:zi,format:Vi,colorSpace:Ll,depthBuffer:!1},r=of(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=of(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=rx(s)),this._blurMaterial=ax(s,e,t),this._ggxMaterial=sx(s,e,t)}return r}_compileMaterial(e){let t=new Vn(new yt,e);this._renderer.compile(t,Pa)}_sceneToCubeUV(e,t,n,r,s){let a=new zn(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,p=l.toneMapping;l.getClearColor(af),l.toneMapping=wi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(r),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Vn(new Or,new la({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,m=!1,f=e.background;f?f.isColor&&(u.color.copy(f),e.background=null,m=!0):(u.color.copy(af),m=!0);for(let v=0;v<6;v++){let g=v%3;g===0?(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[v],s.y,s.z)):g===1?(a.up.set(0,0,o[v]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[v],s.z)):(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[v]));let _=this._cubeSize;Ls(r,g*_,v>2?_:0,_,_),l.setRenderTarget(r),m&&l.render(d,a),l.render(e,a)}l.toneMapping=p,l.autoClear=h,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Is||e.mapping===Br;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=cf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lf());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s,s.uniforms.envMap.value=e;let o=this._cubeSize;Ls(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Pa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-h*h)*(1.25*l),{_lodMax:d}=this,u=this._sizeLods[n],m=3*u*(n>d-4?n-d+4:0),f=4*(this._cubeSize-u);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=d-t,Ls(s,m,f,3*u,2*u),r.setRenderTarget(s),r.render(o,Pa),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=d-n,Ls(e,m,f,3*u,2*u),r.setRenderTarget(e),r.render(o,Pa)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[r];Ls(t,3*h*(r>this._lodMax-4?r-this._lodMax+4:0),4*(this._cubeSize-h),3*h,2*h),a.setRenderTarget(t),a.render(c,Pa)}};function rx(i){let e=[],t=[],n=i,r=i-4+1+6;for(let s=0;s<r;s++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],p=6,d=6,u=3,m=new Float32Array(u*d*p),f=new Float32Array(u*d*p);for(let g=0;g<p;g++){let _=g%3*2/3-1,b=g>2?0:-1,T=[_,b,0,_+2/3,b,0,_+2/3,b+1,0,_,b,0,_+2/3,b+1,0,_,b+1,0];m.set(T,u*d*g);for(let S=0;S<d;S++){let M=2*h[2*S]-1,C=2*h[2*S+1]-1;g===0?Xr.set(1,C,M):g===1?Xr.set(-M,1,-C):g===2?Xr.set(-M,C,1):g===3?Xr.set(-1,C,-M):g===4?Xr.set(-M,-1,C):Xr.set(M,C,-1),Xr.toArray(f,(g*d+S)*u)}}let v=new yt;v.setAttribute("position",new Ct(m,u)),v.setAttribute("outputDirection",new Ct(f,u)),t.push(new Vn(v,null)),n>4&&n--}return{lodMeshes:t,sizeLods:e}}function of(i,e,t){let n=new ni(i,e,t);return n.texture.mapping=Aa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ls(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function sx(i,e,t){return new _n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:kl(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function ax(i,e,t){return new _n({name:"SphericalGaussianBlur",defines:{SAMPLES:20,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:kl(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function lf(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kl(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function cf(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function kl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var zl=class extends ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ca(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Or(5,5,5),s=new _n({name:"CubemapFromEquirect",uniforms:Wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:kn,blending:Bi});s.uniforms.tEquirect.value=t;let a=new Vn(r,s),o=t.minFilter;return t.minFilter===zr&&(t.minFilter=Gn),new _l(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function ox(i){let e=new WeakMap,t=new WeakMap,n=null;function r(o,c){return c===Sl?o.mapping=Is:c===Ml&&(o.mapping=Br),o}function s(o){let c=o.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(o){let c=o.target;c.removeEventListener("dispose",a);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}return{get:function(o,c=!1){return o==null?null:c?(function(l){if(l&&l.isTexture){let h=l.mapping,p=h===Sl||h===Ml,d=h===Is||h===Br;if(p||d){let u=t.get(l),m=u!==void 0?u.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return n===null&&(n=new Bl(i)),u=p?n.fromEquirectangular(l,u):n.fromCubemap(l,u),u.texture.pmremVersion=l.pmremVersion,t.set(l,u),u.texture;if(u!==void 0)return u.texture;{let f=l.image;return p&&f&&f.height>0||d&&f&&(function(v){let g=0,_=6;for(let b=0;b<_;b++)v[b]!==void 0&&g++;return g===_})(f)?(n===null&&(n=new Bl(i)),u=p?n.fromEquirectangular(l):n.fromCubemap(l),u.texture.pmremVersion=l.pmremVersion,t.set(l,u),l.addEventListener("dispose",a),u.texture):null}}}return l})(o):(function(l){if(l&&l.isTexture){let h=l.mapping;if(h===Sl||h===Ml){if(e.has(l))return r(e.get(l).texture,l.mapping);{let p=l.image;if(p&&p.height>0){let d=new zl(p.height);return d.fromEquirectangularTexture(i,l),e.set(l,d),l.addEventListener("dispose",s),r(d.texture,l.mapping)}return null}}}return l})(o)},dispose:function(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function lx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Pr("WebGLRenderer: "+n+" extension not supported."),r}}}function cx(i,e,t,n){let r={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let p in l.attributes)e.remove(l.attributes[p]);l.removeEventListener("dispose",a),delete r[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,p=c.attributes.position,d=0;if(p===void 0)return;if(h!==null){let f=h.array;d=h.version;for(let v=0,g=f.length;v<g;v+=3){let _=f[v+0],b=f[v+1],T=f[v+2];l.push(_,b,b,T,T,_)}}else{let f=p.array;d=p.version;for(let v=0,g=f.length/3-1;v<g;v+=3){let _=v+0,b=v+1,T=v+2;l.push(_,b,b,T,T,_)}}let u=new(p.count>=65535?sa:ra)(l,1);u.version=d;let m=s.get(c);m&&e.remove(m),s.set(c,u)}return{get:function(c,l){return r[l.id]===!0||(l.addEventListener("dispose",a),r[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function hx(i,e,t){let n,r,s;this.setMode=function(a){n=a},this.setIndex=function(a){r=a.type,s=a.bytesPerElement},this.render=function(a,o){i.drawElements(n,o,r,a*s),t.update(o,n,1)},this.renderInstances=function(a,o,c){c!==0&&(i.drawElementsInstanced(n,o,r,a*s,c),t.update(o,n,c))},this.renderMultiDraw=function(a,o,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,o,0,r,a,0,c);let l=0;for(let h=0;h<c;h++)l+=o[h];t.update(l,n,1)}}function ux(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:Qe("WebGLInfo: Unknown draw mode:",n)}}}}function dx(i,e,t){let n=new WeakMap,r=new Ht;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,p=n.get(a);if(p===void 0||p.count!==h){p!==void 0&&p.texture.dispose();let d=a.morphAttributes.position!==void 0,u=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),u===!0&&(_=2),m===!0&&(_=3);let b=a.attributes.position.count*_,T=1;b>e.maxTextureSize&&(T=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let S=new Float32Array(b*T*4*h),M=new ta(S,b,T,h);M.type=gi,M.needsUpdate=!0;let C=4*_;for(let N=0;N<h;N++){let B=f[N],L=v[N],X=g[N],F=b*T*4*N;for(let K=0;K<B.count;K++){let te=K*C;d===!0&&(r.fromBufferAttribute(B,K),S[F+te+0]=r.x,S[F+te+1]=r.y,S[F+te+2]=r.z,S[F+te+3]=0),u===!0&&(r.fromBufferAttribute(L,K),S[F+te+4]=r.x,S[F+te+5]=r.y,S[F+te+6]=r.z,S[F+te+7]=0),m===!0&&(r.fromBufferAttribute(X,K),S[F+te+8]=r.x,S[F+te+9]=r.y,S[F+te+10]=r.z,S[F+te+11]=X.itemSize===4?r.w:1)}}p={count:h,texture:M,size:new ge(b,T)},n.set(a,p),a.addEventListener("dispose",function N(){M.dispose(),n.delete(a),a.removeEventListener("dispose",N)})}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let d=0;for(let m=0;m<c.length;m++)d+=c[m];let u=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",u),o.getUniforms().setValue(i,"morphTargetInfluences",c)}o.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}}}function px(i,e,t,n,r){let s=new WeakMap;function a(o){let c=o.target;c.removeEventListener("dispose",a),n.releaseStatesOfObject(c),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:function(o){let c=r.render.frame,l=o.geometry,h=e.get(o,l);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==c&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,c))),o.isSkinnedMesh){let p=o.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return h},dispose:function(){s=new WeakMap}}}var fx={[oh]:"LINEAR_TONE_MAPPING",[lh]:"REINHARD_TONE_MAPPING",[ch]:"CINEON_TONE_MAPPING",[hh]:"ACES_FILMIC_TONE_MAPPING",[dh]:"AGX_TONE_MAPPING",[ph]:"NEUTRAL_TONE_MAPPING",[uh]:"CUSTOM_TONE_MAPPING"};function mx(i,e,t,n,r,s){let a=new ni(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new yt;l.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new je([0,2,0,0,2,0],2));let h=new rl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new Vn(l,h),d=new Ta(-1,1,1,-1,0,1),u,m=null,f=null,v=!1,g=null,_=[],b=!1;this.setSize=function(T,S){a.setSize(T,S),o!==null&&o.setSize(T,S),c!==null&&c.setSize(T,S);for(let M=0;M<_.length;M++){let C=_[M];C.setSize&&C.setSize(T,S)}},this.setEffects=function(T){_=T,b=_.length>0&&_[0].isRenderPass===!0;let S=a.width,M=a.height;_.length>0&&o===null&&(o=new ni(S,M,{type:zi,depthBuffer:!1,stencilBuffer:!1}),c=new ni(S,M,{type:zi,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<_.length;C++){let N=_[C];N.setSize&&N.setSize(S,M)}},this.begin=function(T,S){if(v||T.toneMapping===wi&&_.length===0)return!1;if(g=S,S!==null){let M=S.width,C=S.height;a.width===M&&a.height===C||this.setSize(M,C)}return b===!1&&T.setRenderTarget(a),u=T.toneMapping,T.toneMapping=wi,!0},this.hasRenderPass=function(){return b},this.end=function(T,S){T.toneMapping=u,v=!0;let M=a,C=o;for(let N=0;N<_.length;N++){let B=_[N];B.enabled!==!1&&(B.render(T,C,M,S),B.needsSwap!==!1&&(M=C,C=C===o?c:o))}if(m!==T.outputColorSpace||f!==T.toneMapping){m=T.outputColorSpace,f=T.toneMapping,h.defines={},Tt.getTransfer(m)===Wt&&(h.defines.SRGB_TRANSFER="");let N=fx[f];N&&(h.defines[N]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,T.setRenderTarget(g),T.render(p,d),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Cf=new Jn,gu=new xr(1,1),If=new ta,Pf=new Co,Lf=new ca,hf=[],uf=[],df=new Float32Array(16),pf=new Float32Array(9),ff=new Float32Array(4);function Ds(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=hf[r];if(s===void 0&&(s=new Float32Array(r),hf[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function bn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Gl(i,e){let t=uf[e];t===void 0&&(t=new Int32Array(e),uf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function gx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function _x(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;i.uniform2fv(this.addr,e),Tn(t,e)}}function vx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bn(t,e))return;i.uniform3fv(this.addr,e),Tn(t,e)}}function xx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;i.uniform4fv(this.addr,e),Tn(t,e)}}function yx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tn(t,e)}else{if(bn(t,n))return;ff.set(n),i.uniformMatrix2fv(this.addr,!1,ff),Tn(t,n)}}function Sx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tn(t,e)}else{if(bn(t,n))return;pf.set(n),i.uniformMatrix3fv(this.addr,!1,pf),Tn(t,n)}}function Mx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tn(t,e)}else{if(bn(t,n))return;df.set(n),i.uniformMatrix4fv(this.addr,!1,df),Tn(t,n)}}function bx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Tx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;i.uniform2iv(this.addr,e),Tn(t,e)}}function Ex(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bn(t,e))return;i.uniform3iv(this.addr,e),Tn(t,e)}}function wx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;i.uniform4iv(this.addr,e),Tn(t,e)}}function Ax(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Rx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;i.uniform2uiv(this.addr,e),Tn(t,e)}}function Cx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bn(t,e))return;i.uniform3uiv(this.addr,e),Tn(t,e)}}function Ix(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;i.uniform4uiv(this.addr,e),Tn(t,e)}}function Px(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(gu.compareFunction=t.isReversedDepthBuffer()?Dl:Nl,s=gu):s=Cf,t.setTexture2D(e||s,r)}function Lx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Pf,r)}function Nx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Lf,r)}function Dx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||If,r)}function Ux(i){switch(i){case 5126:return gx;case 35664:return _x;case 35665:return vx;case 35666:return xx;case 35674:return yx;case 35675:return Sx;case 35676:return Mx;case 5124:case 35670:return bx;case 35667:case 35671:return Tx;case 35668:case 35672:return Ex;case 35669:case 35673:return wx;case 5125:return Ax;case 36294:return Rx;case 36295:return Cx;case 36296:return Ix;case 35678:case 36198:case 36298:case 36306:case 35682:return Px;case 35679:case 36299:case 36307:return Lx;case 35680:case 36300:case 36308:case 36293:return Nx;case 36289:case 36303:case 36311:case 36292:return Dx}}function Ox(i,e){i.uniform1fv(this.addr,e)}function Fx(i,e){let t=Ds(e,this.size,2);i.uniform2fv(this.addr,t)}function Bx(i,e){let t=Ds(e,this.size,3);i.uniform3fv(this.addr,t)}function zx(i,e){let t=Ds(e,this.size,4);i.uniform4fv(this.addr,t)}function Vx(i,e){let t=Ds(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function kx(i,e){let t=Ds(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Gx(i,e){let t=Ds(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Hx(i,e){i.uniform1iv(this.addr,e)}function Wx(i,e){i.uniform2iv(this.addr,e)}function Xx(i,e){i.uniform3iv(this.addr,e)}function qx(i,e){i.uniform4iv(this.addr,e)}function jx(i,e){i.uniform1uiv(this.addr,e)}function Yx(i,e){i.uniform2uiv(this.addr,e)}function $x(i,e){i.uniform3uiv(this.addr,e)}function Zx(i,e){i.uniform4uiv(this.addr,e)}function Jx(i,e,t){let n=this.cache,r=e.length,s=Gl(t,r),a;bn(n,s)||(i.uniform1iv(this.addr,s),Tn(n,s)),a=this.type===i.SAMPLER_2D_SHADOW?gu:Cf;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Kx(i,e,t){let n=this.cache,r=e.length,s=Gl(t,r);bn(n,s)||(i.uniform1iv(this.addr,s),Tn(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Pf,s[a])}function Qx(i,e,t){let n=this.cache,r=e.length,s=Gl(t,r);bn(n,s)||(i.uniform1iv(this.addr,s),Tn(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Lf,s[a])}function ey(i,e,t){let n=this.cache,r=e.length,s=Gl(t,r);bn(n,s)||(i.uniform1iv(this.addr,s),Tn(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||If,s[a])}function ty(i){switch(i){case 5126:return Ox;case 35664:return Fx;case 35665:return Bx;case 35666:return zx;case 35674:return Vx;case 35675:return kx;case 35676:return Gx;case 5124:case 35670:return Hx;case 35667:case 35671:return Wx;case 35668:case 35672:return Xx;case 35669:case 35673:return qx;case 5125:return jx;case 36294:return Yx;case 36295:return $x;case 36296:return Zx;case 35678:case 36198:case 36298:case 36306:case 35682:return Jx;case 35679:case 36299:case 36307:return Kx;case 35680:case 36300:case 36308:case 36293:return Qx;case 36289:case 36303:case 36311:case 36292:return ey}}var _u=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ux(t.type)}},vu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ty(t.type)}},xu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},fu=/(\w+)(\])?(\[|\.)?/g;function mf(i,e){i.seq.push(e),i.map[e.id]=e}function ny(i,e,t){let n=i.name,r=n.length;for(fu.lastIndex=0;;){let s=fu.exec(n),a=fu.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===r){mf(t,l===void 0?new _u(o,i,e):new vu(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new xu(o),mf(t,h)),t=h}}}var Ns=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a);ny(o,e.getUniformLocation(t,o.name),this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function gf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var iy=0;function ry(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var _f=new rt;function sy(i){Tt._getMatrix(_f,Tt.workingColorSpace,i);let e=`mat3( ${_f.elements.map(t=>t.toFixed(4))} )`;switch(Tt.getTransfer(i)){case Kh:return[e,"LinearTransferOETF"];case Wt:return[e,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function vf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+ry(i.getShaderSource(e),a)}return r}function ay(i,e){let t=sy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var oy={[oh]:"Linear",[lh]:"Reinhard",[ch]:"Cineon",[hh]:"ACESFilmic",[dh]:"AgX",[ph]:"Neutral",[uh]:"Custom"};function ly(i,e){let t=oy[e];return t===void 0?(Ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Fl=new I;function cy(){return Tt.getLuminanceCoefficients(Fl),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Fl.x.toFixed(4)}, ${Fl.y.toFixed(4)}, ${Fl.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Na).join(`
`)}function uy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function dy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Na(i){return i!==""}function xf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var py=/^[ \t]*#include +<([\w\d./]+)>/gm;function yu(i){return i.replace(py,my)}var fy=new Map;function my(i,e){let t=dt[e];if(t===void 0){let n=fy.get(e);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=dt[n],Ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return yu(t)}var gy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sf(i){return i.replace(gy,_y)}function _y(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Mf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var vy={[wa]:"SHADOWMAP_TYPE_PCF",[As]:"SHADOWMAP_TYPE_VSM"};function xy(i){return vy[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var yy={[Is]:"ENVMAP_TYPE_CUBE",[Br]:"ENVMAP_TYPE_CUBE",[Aa]:"ENVMAP_TYPE_CUBE_UV"};function Sy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":yy[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var My={[Br]:"ENVMAP_MODE_REFRACTION"};function by(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":My[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ty={[Rp]:"ENVMAP_BLENDING_MULTIPLY",[Cp]:"ENVMAP_BLENDING_MIX",[Ip]:"ENVMAP_BLENDING_ADD"};function Ey(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Ty[i.combine]||"ENVMAP_BLENDING_NONE"}function wy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Ay(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=xy(t),l=Sy(t),h=by(t),p=Ey(t),d=wy(t),u=hy(t),m=uy(s),f=r.createProgram(),v,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Na).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Na).join(`
`),g.length>0&&(g+=`
`)):(v=[Mf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Na).join(`
`),g=[Mf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wi?"#define TONE_MAPPING":"",t.toneMapping!==wi?dt.tonemapping_pars_fragment:"",t.toneMapping!==wi?ly("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,ay("linearToOutputTexel",t.outputColorSpace),cy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Na).join(`
`)),a=yu(a),a=xf(a,t),a=yf(a,t),o=yu(o),o=xf(o,t),o=yf(o,t),a=Sf(a),o=Sf(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===Qh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let b=_+v+a,T=_+g+o,S=gf(r,r.VERTEX_SHADER,b),M=gf(r,r.FRAGMENT_SHADER,T);function C(X){if(i.debug.checkShaderErrors){let F=r.getProgramInfoLog(f)||"",K=r.getShaderInfoLog(S)||"",te=r.getShaderInfoLog(M)||"",ae=F.trim(),W=K.trim(),k=te.trim(),Z=!0,he=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,f,S,M);else{let ce=vf(r,S,"vertex"),re=vf(r,M,"fragment");Qe("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+X.name+`
Material Type: `+X.type+`

Program Info Log: `+ae+`
`+ce+`
`+re)}else ae!==""?Ze("WebGLProgram: Program Info Log:",ae):W!==""&&k!==""||(he=!1);he&&(X.diagnostics={runnable:Z,programLog:ae,vertexShader:{log:W,prefix:v},fragmentShader:{log:k,prefix:g}})}r.deleteShader(S),r.deleteShader(M),N=new Ns(r,f),B=dy(r,f)}let N,B;r.attachShader(f,S),r.attachShader(f,M),t.index0AttributeName!==void 0?r.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f),this.getUniforms=function(){return N===void 0&&C(this),N},this.getAttributes=function(){return B===void 0&&C(this),B};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(f,37297)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=iy++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=S,this.fragmentShader=M,this}var Ry=0,Su=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Mu(e),t.set(e,n)),n}},Mu=class{constructor(e){this.id=Ry++,this.code=e,this.usedTimes=0}};function Cy(i){return i===Gr||i===Il||i===Pl}function Iy(i,e,t,n,r,s){let a=new na,o=new Su,c=new Set,l=[],h=new Map,p=n.logarithmicDepthBuffer,d=n.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,g,_,b,T){let S=_.fog,M=b.geometry,C=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?_.environment:null,N=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,B=e.get(f.envMap||C,N),L=B&&B.mapping===Aa?B.image.height:null,X=u[f.type];f.precision!==null&&(d=n.getMaxPrecision(f.precision),d!==f.precision&&Ze("WebGLProgram.getParameters:",f.precision,"not supported, using",d,"instead."));let F=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,K=F!==void 0?F.length:0,te,ae,W,k,Z=0;if(M.morphAttributes.position!==void 0&&(Z=1),M.morphAttributes.normal!==void 0&&(Z=2),M.morphAttributes.color!==void 0&&(Z=3),X){let tn=Gi[X];te=tn.vertexShader,ae=tn.fragmentShader}else{te=f.vertexShader,ae=f.fragmentShader;let tn=o.getVertexShaderStage(f),Kt=o.getFragmentShaderStage(f);o.update(f,tn,Kt),W=tn.id,k=Kt.id}let he=i.getRenderTarget(),ce=i.state.buffers.depth.getReversed(),re=b.isInstancedMesh===!0,xe=b.isBatchedMesh===!0,pe=!!f.map,le=!!f.matcap,ie=!!B,fe=!!f.aoMap,Se=!!f.lightMap,we=!!f.bumpMap&&f.wireframe===!1,w=!!f.normalMap,E=!!f.displacementMap,P=!!f.emissiveMap,O=!!f.metalnessMap,y=!!f.roughnessMap,z=f.anisotropy>0,D=f.clearcoat>0,R=f.dispersion>0,q=f.retroreflectivity>0,$=f.iridescence>0,J=f.sheen>0,ue=f.transmission>0,Ue=z&&!!f.anisotropyMap,Ne=D&&!!f.clearcoatMap,Me=D&&!!f.clearcoatNormalMap,He=D&&!!f.clearcoatRoughnessMap,de=$&&!!f.iridescenceMap,ye=$&&!!f.iridescenceThicknessMap,_e=J&&!!f.sheenColorMap,oe=J&&!!f.sheenRoughnessMap,_t=!!f.specularMap,Xe=!!f.specularColorMap,Lt=!!f.specularIntensityMap,Yt=ue&&!!f.transmissionMap,De=ue&&!!f.thicknessMap,Et=!!f.gradientMap,$e=!!f.alphaMap,$t=f.alphaTest>0,St=!!f.alphaHash,wt=!!f.extensions,Nt=wi;f.toneMapped&&(he!==null&&he.isXRRenderTarget!==!0||(Nt=i.toneMapping));let vn={shaderID:X,shaderType:f.type,shaderName:f.name,vertexShader:te,fragmentShader:ae,defines:f.defines,customVertexShaderID:W,customFragmentShaderID:k,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:d,batching:xe,batchingColor:xe&&b._colorsTexture!==null,instancing:re,instancingColor:re&&b.instanceColor!==null,instancingMorph:re&&b.morphTexture!==null,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Tt.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:pe,matcap:le,envMap:ie,envMapMode:ie&&B.mapping,envMapCubeUVHeight:L,aoMap:fe,lightMap:Se,bumpMap:we,normalMap:w,displacementMap:E,emissiveMap:P,normalMapObjectSpace:w&&f.normalMapType===zp,normalMapTangentSpace:w&&f.normalMapType===Zh,packedNormalMap:w&&f.normalMapType===Zh&&Cy(f.normalMap.format),metalnessMap:O,roughnessMap:y,anisotropy:z,anisotropyMap:Ue,clearcoat:D,clearcoatMap:Ne,clearcoatNormalMap:Me,clearcoatRoughnessMap:He,dispersion:R,retroreflection:q,iridescence:$,iridescenceMap:de,iridescenceThicknessMap:ye,sheen:J,sheenColorMap:_e,sheenRoughnessMap:oe,specularMap:_t,specularColorMap:Xe,specularIntensityMap:Lt,transmission:ue,transmissionMap:Yt,thicknessMap:De,gradientMap:Et,opaque:f.transparent===!1&&f.blending===mi&&f.alphaToCoverage===!1,alphaMap:$e,alphaTest:$t,alphaHash:St,combine:f.combine,mapUv:pe&&m(f.map.channel),aoMapUv:fe&&m(f.aoMap.channel),lightMapUv:Se&&m(f.lightMap.channel),bumpMapUv:we&&m(f.bumpMap.channel),normalMapUv:w&&m(f.normalMap.channel),displacementMapUv:E&&m(f.displacementMap.channel),emissiveMapUv:P&&m(f.emissiveMap.channel),metalnessMapUv:O&&m(f.metalnessMap.channel),roughnessMapUv:y&&m(f.roughnessMap.channel),anisotropyMapUv:Ue&&m(f.anisotropyMap.channel),clearcoatMapUv:Ne&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:Me&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:He&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:oe&&m(f.sheenRoughnessMap.channel),specularMapUv:_t&&m(f.specularMap.channel),specularColorMapUv:Xe&&m(f.specularColorMap.channel),specularIntensityMapUv:Lt&&m(f.specularIntensityMap.channel),transmissionMapUv:Yt&&m(f.transmissionMap.channel),thicknessMapUv:De&&m(f.thicknessMap.channel),alphaMapUv:$e&&m(f.alphaMap.channel),vertexTangents:!!M.attributes.tangent&&(w||z),vertexNormals:!!M.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!M.attributes.uv&&(pe||$e),fog:!!S,useFog:f.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||M.attributes.normal===void 0&&w===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:ce,skinning:b.isSkinnedMesh===!0,hasPositionAttribute:M.attributes.position!==void 0,morphTargets:M.morphAttributes.position!==void 0,morphNormals:M.morphAttributes.normal!==void 0,morphColors:M.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:Z,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:T.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&g.length>0,shadowMapType:i.shadowMap.type,toneMapping:Nt,decodeVideoTexture:pe&&f.map.isVideoTexture===!0&&Tt.getTransfer(f.map.colorSpace)===Wt,decodeVideoTextureEmissive:P&&f.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(f.emissiveMap.colorSpace)===Wt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Fi,flipSided:f.side===kn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:wt&&f.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(wt&&f.extensions.multiDraw===!0||xe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return vn.vertexUv1s=c.has(1),vn.vertexUv2s=c.has(2),vn.vertexUv3s=c.has(3),c.clear(),vn},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let g in f.defines)v.push(g),v.push(f.defines[g]);return f.isRawShaderMaterial===!1&&((function(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numSunLights),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numSunLightShadows),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)})(v,f),(function(g,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.retroreflection&&a.enable(24),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),g.push(a.mask)})(v,f),v.push(i.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=u[f.type],g;if(v){let _=Gi[v];g=nf.clone(_.uniforms)}else g=f.uniforms;return g},acquireProgram:function(f,v){let g=h.get(v);return g!==void 0?++g.usedTimes:(g=new Ay(i,v,f,r),l.push(g),h.set(v,g)),g},releaseProgram:function(f){if(--f.usedTimes===0){let v=l.indexOf(f);l[v]=l[l.length-1],l.pop(),h.delete(f.cacheKey),f.destroy()}},releaseShaderCache:function(f){o.remove(f)},programs:l,dispose:function(){o.dispose()}}}function Py(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function Ly(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function bf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Tf(){let i=[],e=0,t=[],n=[],r=[];function s(o){let c=0;return o.isInstancedMesh&&(c+=2),o.isSkinnedMesh&&(c+=1),c}function a(o,c,l,h,p,d){let u=i[e];return u===void 0?(u={id:o.id,object:o,geometry:c,material:l,materialVariant:s(o),groupOrder:h,renderOrder:o.renderOrder,z:p,group:d},i[e]=u):(u.id=o.id,u.object=o,u.geometry=c,u.material=l,u.materialVariant=s(o),u.groupOrder=h,u.renderOrder=o.renderOrder,u.z=p,u.group=d),e++,u}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,c,l,h,p,d,u){u.reversedDepth===!0&&(p=-p);let m=a(o,c,l,h,p,d);l.transmission>0?n.push(m):l.transparent===!0?r.push(m):t.push(m)},unshift:function(o,c,l,h,p,d){let u=a(o,c,l,h,p,d);l.transmission>0?n.unshift(u):l.transparent===!0?r.unshift(u):t.unshift(u)},finish:function(){for(let o=e,c=i.length;o<c;o++){let l=i[o];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(o,c){t.length>1&&t.sort(o||Ly),n.length>1&&n.sort(c||bf),r.length>1&&r.sort(c||bf)}}}function Ny(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new Tf,i.set(e,[r])):t>=n.length?(r=new Tf,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function Dy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new I,color:new at};break;case"SpotLight":t={position:new I,direction:new I,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new at,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new at,groundColor:new at};break;case"RectAreaLight":t={color:new at,position:new I,halfWidth:new I,halfHeight:new I}}return i[e.id]=t,t}}}function Uy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3}}return i[e.id]=t,t}}}var Oy=0;function Fy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function By(i){let e=new Dy,t=Uy(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new I);let r=new I,s=new ut,a=new ut;return{setup:function(o){let c=0,l=0,h=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let p=0,d=0,u=0,m=0,f=0,v=0,g=0,_=0,b=0,T=0,S=0,M=0,C=0,N=0;o.sort(Fy);for(let L=0,X=o.length;L<X;L++){let F=o[L],K=F.color,te=F.intensity,ae=F.distance,W=null;if(F.shadow&&F.shadow.map&&(W=F.shadow.map.texture.format===Gr?F.shadow.map.texture:F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)c+=K.r*te,l+=K.g*te,h+=K.b*te;else if(F.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(F.sh.coefficients[k],te);N++}else if(F.isSunLight){let k=e.get(F);if(k.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let Z=F.shadow,he=t.get(F);he.shadowIntensity=Z.intensity,he.shadowBias=Z.bias,he.shadowNormalBias=Z.normalBias,he.shadowRadius=Z.radius,he.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),n.sunShadow[d]=he,n.sunShadowMap[d]=W;let ce=Z.getViewportCount();for(let re=0;re<ce;re++)n.sunShadowMatrix[u+re]=Z.getMatrix(re),n.sunShadowCascade[u+re]=Z._cascadeData[re];u+=ce,d++}n.sun[p]=k,p++}else if(F.isDirectionalLight){let k=e.get(F);if(k.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let Z=F.shadow,he=t.get(F);he.shadowIntensity=Z.intensity,he.shadowBias=Z.bias,he.shadowNormalBias=Z.normalBias,he.shadowRadius=Z.radius,he.shadowMapSize=Z.mapSize,n.directionalShadow[m]=he,n.directionalShadowMap[m]=W,n.directionalShadowMatrix[m]=F.shadow.matrix,b++}n.directional[m]=k,m++}else if(F.isSpotLight){let k=e.get(F);k.position.setFromMatrixPosition(F.matrixWorld),k.color.copy(K).multiplyScalar(te),k.distance=ae,k.coneCos=Math.cos(F.angle),k.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),k.decay=F.decay,n.spot[v]=k;let Z=F.shadow;if(F.map&&(n.spotLightMap[M]=F.map,M++,Z.updateMatrices(F),F.castShadow&&C++),n.spotLightMatrix[v]=Z.matrix,F.castShadow){let he=t.get(F);he.shadowIntensity=Z.intensity,he.shadowBias=Z.bias,he.shadowNormalBias=Z.normalBias,he.shadowRadius=Z.radius,he.shadowMapSize=Z.mapSize,n.spotShadow[v]=he,n.spotShadowMap[v]=W,S++}v++}else if(F.isRectAreaLight){let k=e.get(F);k.color.copy(K).multiplyScalar(te),k.halfWidth.set(.5*F.width,0,0),k.halfHeight.set(0,.5*F.height,0),n.rectArea[g]=k,g++}else if(F.isPointLight){let k=e.get(F);if(k.color.copy(F.color).multiplyScalar(F.intensity),k.distance=F.distance,k.decay=F.decay,F.castShadow){let Z=F.shadow,he=t.get(F);he.shadowIntensity=Z.intensity,he.shadowBias=Z.bias,he.shadowNormalBias=Z.normalBias,he.shadowRadius=Z.radius,he.shadowMapSize=Z.mapSize,he.shadowCameraNear=Z.camera.near,he.shadowCameraFar=Z.camera.far,n.pointShadow[f]=he,n.pointShadowMap[f]=W,n.pointShadowMatrix[f]=F.shadow.matrix,T++}n.point[f]=k,f++}else if(F.isHemisphereLight){let k=e.get(F);k.skyColor.copy(F.color).multiplyScalar(te),k.groundColor.copy(F.groundColor).multiplyScalar(te),n.hemi[_]=k,_++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let B=n.hash;B.sunLength===p&&B.directionalLength===m&&B.pointLength===f&&B.spotLength===v&&B.rectAreaLength===g&&B.hemiLength===_&&B.numSunShadows===d&&B.numDirectionalShadows===b&&B.numPointShadows===T&&B.numSpotShadows===S&&B.numSpotMaps===M&&B.numLightProbes===N||(n.sun.length=p,n.directional.length=m,n.spot.length=v,n.rectArea.length=g,n.point.length=f,n.hemi.length=_,n.sunShadow.length=d,n.sunShadowMap.length=d,n.sunShadowMatrix.length=u,n.sunShadowCascade.length=u,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=S,n.spotShadowMap.length=S,n.spotLightMatrix.length=S+M-C,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=N,B.sunLength=p,B.directionalLength=m,B.pointLength=f,B.spotLength=v,B.rectAreaLength=g,B.hemiLength=_,B.numSunShadows=d,B.numDirectionalShadows=b,B.numPointShadows=T,B.numSpotShadows=S,B.numSpotMaps=M,B.numLightProbes=N,n.version=Oy++)},setupView:function(o,c){let l=0,h=0,p=0,d=0,u=0,m=0,f=c.matrixWorldInverse;for(let v=0,g=o.length;v<g;v++){let _=o[v];if(_.isSunLight){let b=n.sun[l];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(f),l++}else if(_.isDirectionalLight){let b=n.directional[h];b.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(f),h++}else if(_.isSpotLight){let b=n.spot[d];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(f),b.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(f),d++}else if(_.isRectAreaLight){let b=n.rectArea[u];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(f),a.identity(),s.copy(_.matrixWorld),s.premultiply(f),a.extractRotation(s),b.halfWidth.set(.5*_.width,0,0),b.halfHeight.set(0,.5*_.height,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),u++}else if(_.isPointLight){let b=n.point[p];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){let b=n.hemi[m];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(f),m++}}},state:n}}function Ef(i){let e=new By(i),t=[],n=[],r=[],s={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,t.length=0,n.length=0,r.length=0},state:s,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){r.push(a)}}}function zy(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new Ef(i),e.set(t,[s])):n>=r.length?(s=new Ef(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}var Vy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ky=`uniform sampler2D shadow_pass;
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
}`,Gy=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],Hy=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],wf=new ut,La=new I,mu=new I;function Wy(i,e,t){let n=new _r,r=new ge,s=new ge,a=new Ht,o=new sl,c=new al,l={},h=t.maxTextureSize,p={[Rs]:kn,[kn]:Rs,[Fi]:Fi},d=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:Vy,fragmentShader:ky}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new yt;m.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let f=new Vn(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wa;let g=this.type;function _(M,C){let N=e.update(f);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,u.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),M.mapPass===null?M.mapPass=new ni(r.x,r.y,{format:Gr,type:zi}):M.mapPass.width===M.map.width&&M.mapPass.height===M.map.height||M.mapPass.setSize(M.map.width,M.map.height),d.uniforms.shadow_pass.value=M.map.depthTexture,d.uniforms.resolution.value.set(M.map.width,M.map.height),d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(C,null,N,d,f,null),u.uniforms.shadow_pass.value=M.mapPass.texture,u.uniforms.resolution.value.set(M.map.width,M.map.height),u.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(C,null,N,u,f,null)}function b(M,C,N,B){let L=null,X=N.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(X!==void 0)L=X;else if(L=N.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let F=L.uuid,K=C.uuid,te=l[F];te===void 0&&(te={},l[F]=te);let ae=te[K];ae===void 0&&(ae=L.clone(),te[K]=ae,C.addEventListener("dispose",S)),L=ae}return L.visible=C.visible,L.wireframe=C.wireframe,L.side=B===As?C.shadowSide!==null?C.shadowSide:C.side:C.shadowSide!==null?C.shadowSide:p[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,N.isPointLight===!0&&L.isMeshDistanceMaterial===!0&&(i.properties.get(L).light=N),L}function T(M,C,N,B,L){if(M.visible===!1)return;if(M.layers.test(C.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&L===As)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,M.matrixWorld);let F=e.update(M),K=M.material;if(Array.isArray(K)){let te=F.groups;for(let ae=0,W=te.length;ae<W;ae++){let k=te[ae],Z=K[k.materialIndex];if(Z&&Z.visible){let he=b(M,Z,B,L);M.onBeforeShadow(i,M,C,N,F,he,k),i.renderBufferDirect(N,null,F,he,M,k),M.onAfterShadow(i,M,C,N,F,he,k)}}}else if(K.visible){let te=b(M,K,B,L);M.onBeforeShadow(i,M,C,N,F,te,null),i.renderBufferDirect(N,null,F,te,M,null),M.onAfterShadow(i,M,C,N,F,te,null)}}let X=M.children;for(let F=0,K=X.length;F<K;F++)T(X[F],C,N,B,L)}function S(M){M.target.removeEventListener("dispose",S);for(let C in l){let N=l[C],B=M.target.uuid;B in N&&(N[B].dispose(),delete N[B])}}this.render=function(M,C,N){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||M.length===0)return;this.type===op&&(Ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=wa);let B=i.getRenderTarget(),L=i.getActiveCubeFace(),X=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Bi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let K=g!==this.type;K&&C.traverse(function(te){te.material&&(Array.isArray(te.material)?te.material.forEach(ae=>ae.needsUpdate=!0):te.material.needsUpdate=!0)});for(let te=0,ae=M.length;te<ae;te++){let W=M[te],k=W.shadow;if(k===void 0){Ze("WebGLShadowMap:",W,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);let Z=k.getFrameExtents();r.multiply(Z),s.copy(k.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Z.x),r.x=s.x*Z.x,k.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Z.y),r.y=s.y*Z.y,k.mapSize.y=s.y));let he=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=he,k.map===null||K===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===As){if(W.isPointLight){Ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new ni(r.x,r.y,{format:Gr,type:zi,minFilter:Gn,magFilter:Gn,generateMipmaps:!1}),k.map.texture.name=W.name+".shadowMap",k.map.depthTexture=new xr(r.x,r.y,gi),k.map.depthTexture.name=W.name+".shadowMapDepth",k.map.depthTexture.format=Vr,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ai,k.map.depthTexture.magFilter=Ai}else W.isPointLight?(k.map=new zl(r.x),k.map.depthTexture=new Uo(r.x,Mr)):(k.map=new ni(r.x,r.y),k.map.depthTexture=new xr(r.x,r.y,Mr)),k.map.depthTexture.name=W.name+".shadowMap",k.map.depthTexture.format=Vr,this.type===wa?(k.map.depthTexture.compareFunction=he?Dl:Nl,k.map.depthTexture.minFilter=Gn,k.map.depthTexture.magFilter=Gn):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ai,k.map.depthTexture.magFilter=Ai);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget===!0||k.map.width===r.x&&k.map.height===r.y||k.map.setSize(r.x,r.y);let ce=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();W.isPointLight!==!0&&k.updateMatrices(W,N);for(let re=0;re<ce;re++){let xe=k.getCamera(re);if(W.isPointLight){let pe=k.camera,le=k.matrix,ie=W.distance||pe.far;ie!==pe.far&&(pe.far=ie,pe.updateProjectionMatrix()),La.setFromMatrixPosition(W.matrixWorld),pe.position.copy(La),mu.copy(pe.position),mu.add(Gy[re]),pe.up.copy(Hy[re]),pe.lookAt(mu),pe.updateMatrixWorld(),le.makeTranslation(-La.x,-La.y,-La.z),wf.multiplyMatrices(pe.projectionMatrix,pe.matrixWorldInverse),k._frustum.setFromProjectionMatrix(wf,pe.coordinateSystem,pe.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,re),i.clear();else{re===0&&(i.setRenderTarget(k.map),i.clear());let pe=k.getViewport(re);a.set(s.x*pe.x,s.y*pe.y,s.x*pe.z,s.y*pe.w),F.viewport(a)}n=k.getFrustum(re),T(C,N,xe,W,this.type)}k.isPointLightShadow!==!0&&this.type===As&&_(k,N),k.needsUpdate=!1}g=this.type,v.needsUpdate=!1,i.setRenderTarget(B,L,X)}}function Xy(i,e){let t=new function(){let y=!1,z=new Ht,D=null,R=new Ht(0,0,0,0);return{setMask:function(q){D===q||y||(i.colorMask(q,q,q,q),D=q)},setLocked:function(q){y=q},setClear:function(q,$,J,ue,Ue){Ue===!0&&(q*=ue,$*=ue,J*=ue),z.set(q,$,J,ue),R.equals(z)===!1&&(i.clearColor(q,$,J,ue),R.copy(z))},reset:function(){y=!1,D=null,R.set(-1,0,0,0)}}},n=new function(){let y=!1,z=!1,D=null,R=null,q=null;return{setReversed:function($){if(z!==$){let J=e.get("EXT_clip_control");$?J.clipControlEXT(J.LOWER_LEFT_EXT,J.ZERO_TO_ONE_EXT):J.clipControlEXT(J.LOWER_LEFT_EXT,J.NEGATIVE_ONE_TO_ONE_EXT),z=$;let ue=q;q=null,this.setClear(ue)}},getReversed:function(){return z},setTest:function($){$?ie(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function($){D===$||y||(i.depthMask($),D=$)},setFunc:function($){if(z&&($=$p[$]),R!==$){switch($){case eh:i.depthFunc(i.NEVER);break;case th:i.depthFunc(i.ALWAYS);break;case nh:i.depthFunc(i.LESS);break;case yl:i.depthFunc(i.LEQUAL);break;case ih:i.depthFunc(i.EQUAL);break;case rh:i.depthFunc(i.GEQUAL);break;case sh:i.depthFunc(i.GREATER);break;case ah:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}R=$}},setLocked:function($){y=$},setClear:function($){q!==$&&(q=$,z&&($=1-$),i.clearDepth($))},reset:function(){y=!1,D=null,R=null,q=null,z=!1}}},r=new function(){let y=!1,z=null,D=null,R=null,q=null,$=null,J=null,ue=null,Ue=null;return{setTest:function(Ne){y||(Ne?ie(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(Ne){z===Ne||y||(i.stencilMask(Ne),z=Ne)},setFunc:function(Ne,Me,He){D===Ne&&R===Me&&q===He||(i.stencilFunc(Ne,Me,He),D=Ne,R=Me,q=He)},setOp:function(Ne,Me,He){$===Ne&&J===Me&&ue===He||(i.stencilOp(Ne,Me,He),$=Ne,J=Me,ue=He)},setLocked:function(Ne){y=Ne},setClear:function(Ne){Ue!==Ne&&(i.clearStencil(Ne),Ue=Ne)},reset:function(){y=!1,z=null,D=null,R=null,q=null,$=null,J=null,ue=null,Ue=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,b=null,T=null,S=new at(0,0,0),M=0,C=!1,N=null,B=null,L=null,X=null,F=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,ae=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(W)[1]),te=ae>=1):W.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),te=ae>=2);let k=null,Z={},he=i.getParameter(i.SCISSOR_BOX),ce=i.getParameter(i.VIEWPORT),re=new Ht().fromArray(he),xe=new Ht().fromArray(ce);function pe(y,z,D,R){let q=new Uint8Array(4),$=i.createTexture();i.bindTexture(y,$),i.texParameteri(y,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(y,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let J=0;J<D;J++)y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?i.texImage3D(z,0,i.RGBA,1,1,R,0,i.RGBA,i.UNSIGNED_BYTE,q):i.texImage2D(z+J,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,q);return $}let le={};function ie(y){o[y]!==!0&&(i.enable(y),o[y]=!0)}function fe(y){o[y]!==!1&&(i.disable(y),o[y]=!1)}le[i.TEXTURE_2D]=pe(i.TEXTURE_2D,i.TEXTURE_2D,1),le[i.TEXTURE_CUBE_MAP]=pe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[i.TEXTURE_2D_ARRAY]=pe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),le[i.TEXTURE_3D]=pe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),ie(i.DEPTH_TEST),n.setFunc(yl),E(!1),P(Jc),ie(i.CULL_FACE),w(Bi);let Se={[Cs]:i.FUNC_ADD,[cp]:i.FUNC_SUBTRACT,[hp]:i.FUNC_REVERSE_SUBTRACT};Se[up]=i.MIN,Se[dp]=i.MAX;let we={[pp]:i.ZERO,[fp]:i.ONE,[mp]:i.SRC_COLOR,[_p]:i.SRC_ALPHA,[bp]:i.SRC_ALPHA_SATURATE,[Sp]:i.DST_COLOR,[xp]:i.DST_ALPHA,[gp]:i.ONE_MINUS_SRC_COLOR,[vp]:i.ONE_MINUS_SRC_ALPHA,[Mp]:i.ONE_MINUS_DST_COLOR,[yp]:i.ONE_MINUS_DST_ALPHA,[Tp]:i.CONSTANT_COLOR,[Ep]:i.ONE_MINUS_CONSTANT_COLOR,[wp]:i.CONSTANT_ALPHA,[Ap]:i.ONE_MINUS_CONSTANT_ALPHA};function w(y,z,D,R,q,$,J,ue,Ue,Ne){if(y!==Bi){if(u===!1&&(ie(i.BLEND),u=!0),y===lp)q=q||z,$=$||D,J=J||R,z===f&&q===_||(i.blendEquationSeparate(Se[z],Se[q]),f=z,_=q),D===v&&R===g&&$===b&&J===T||(i.blendFuncSeparate(we[D],we[R],we[$],we[J]),v=D,g=R,b=$,T=J),ue.equals(S)!==!1&&Ue===M||(i.blendColor(ue.r,ue.g,ue.b,Ue),S.copy(ue),M=Ue),m=y,C=!1;else if(y!==m||Ne!==C){if(f===Cs&&_===Cs||(i.blendEquation(i.FUNC_ADD),f=Cs,_=Cs),Ne)switch(y){case mi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tr:i.blendFunc(i.ONE,i.ONE);break;case Kc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Qc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Qe("WebGLState: Invalid blending: ",y)}else switch(y){case mi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Kc:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qc:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",y)}v=null,g=null,b=null,T=null,S.set(0,0,0),M=0,m=y,C=Ne}}else u===!0&&(fe(i.BLEND),u=!1)}function E(y){N!==y&&(y?i.frontFace(i.CW):i.frontFace(i.CCW),N=y)}function P(y){y!==sp?(ie(i.CULL_FACE),y!==B&&(y===Jc?i.cullFace(i.BACK):y===ap?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),B=y}function O(y,z,D){y?(ie(i.POLYGON_OFFSET_FILL),X===z&&F===D||(X=z,F=D,n.getReversed()&&(z=-z),i.polygonOffset(z,D))):fe(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:ie,disable:fe,bindFramebuffer:function(y,z){return l[y]!==z&&(i.bindFramebuffer(y,z),l[y]=z,y===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=z),y===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=z),!0)},drawBuffers:function(y,z){let D=p,R=!1;if(y){D=h.get(z),D===void 0&&(D=[],h.set(z,D));let q=y.textures;if(D.length!==q.length||D[0]!==i.COLOR_ATTACHMENT0){for(let $=0,J=q.length;$<J;$++)D[$]=i.COLOR_ATTACHMENT0+$;D.length=q.length,R=!0}}else D[0]!==i.BACK&&(D[0]=i.BACK,R=!0);R&&i.drawBuffers(D)},useProgram:function(y){return d!==y&&(i.useProgram(y),d=y,!0)},setBlending:w,setMaterial:function(y,z){y.side===Fi?fe(i.CULL_FACE):ie(i.CULL_FACE);let D=y.side===kn;z&&(D=!D),E(D),y.blending===mi&&y.transparent===!1?w(Bi):w(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),n.setFunc(y.depthFunc),n.setTest(y.depthTest),n.setMask(y.depthWrite),t.setMask(y.colorWrite);let R=y.stencilWrite;r.setTest(R),R&&(r.setMask(y.stencilWriteMask),r.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),r.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),O(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:P,setLineWidth:function(y){y!==L&&(te&&i.lineWidth(y),L=y)},setPolygonOffset:O,setScissorTest:function(y){y?ie(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)},activeTexture:function(y){y===void 0&&(y=i.TEXTURE0+K-1),k!==y&&(i.activeTexture(y),k=y)},bindTexture:function(y,z,D){D===void 0&&(D=k===null?i.TEXTURE0+K-1:k);let R=Z[D];R===void 0&&(R={type:void 0,texture:void 0},Z[D]=R),R.type===y&&R.texture===z||(k!==D&&(i.activeTexture(D),k=D),i.bindTexture(y,z||le[y]),R.type=y,R.texture=z)},unbindTexture:function(){let y=Z[k];y!==void 0&&y.type!==void 0&&(i.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},pixelStorei:function(y,z){c[y]!==z&&(i.pixelStorei(y,z),c[y]=z)},getParameter:function(y){return c[y]!==void 0?c[y]:i.getParameter(y)},updateUBOMapping:function(y,z){let D=a.get(z);D===void 0&&(D=new WeakMap,a.set(z,D));let R=D.get(y);R===void 0&&(R=i.getUniformBlockIndex(z,y.name),D.set(y,R))},uniformBlockBinding:function(y,z){let D=a.get(z).get(y);s.get(z)!==D&&(i.uniformBlockBinding(z,D,y.__bindingPointIndex),s.set(z,D))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},scissor:function(y){re.equals(y)===!1&&(i.scissor(y.x,y.y,y.z,y.w),re.copy(y))},viewport:function(y){xe.equals(y)===!1&&(i.viewport(y.x,y.y,y.z,y.w),xe.copy(y))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),o={},c={},k=null,Z={},l={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,b=null,T=null,S=new at(0,0,0),M=0,C=!1,N=null,B=null,L=null,X=null,F=null,re.set(0,0,i.canvas.width,i.canvas.height),xe.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function qy(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new ge,h=new WeakMap,p=new Set,d,u=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(w,E){return m?new OffscreenCanvas(w,E):Qs("canvas")}function v(w,E,P){let O=1,y=we(w);if((y.width>P||y.height>P)&&(O=P/Math.max(y.width,y.height)),O<1){if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let z=Math.floor(O*y.width),D=Math.floor(O*y.height);d===void 0&&(d=f(z,D));let R=E?f(z,D):d;return R.width=z,R.height=D,R.getContext("2d").drawImage(w,0,0,z,D),Ze("WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+z+"x"+D+")."),R}return"data"in w&&Ze("WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),w}return w}function g(w){return w.generateMipmaps}function _(w){i.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(w,E,P,O,y,z=!1){if(w!==null){if(i[w]!==void 0)return i[w];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let D;O&&(D=e.get("EXT_texture_norm16"),D||Ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let R=E;if(E===i.RED&&(P===i.FLOAT&&(R=i.R32F),P===i.HALF_FLOAT&&(R=i.R16F),P===i.UNSIGNED_BYTE&&(R=i.R8),P===i.UNSIGNED_SHORT&&D&&(R=D.R16_EXT),P===i.SHORT&&D&&(R=D.R16_SNORM_EXT)),E===i.RED_INTEGER&&(P===i.UNSIGNED_BYTE&&(R=i.R8UI),P===i.UNSIGNED_SHORT&&(R=i.R16UI),P===i.UNSIGNED_INT&&(R=i.R32UI),P===i.BYTE&&(R=i.R8I),P===i.SHORT&&(R=i.R16I),P===i.INT&&(R=i.R32I)),E===i.RG&&(P===i.FLOAT&&(R=i.RG32F),P===i.HALF_FLOAT&&(R=i.RG16F),P===i.UNSIGNED_BYTE&&(R=i.RG8),P===i.UNSIGNED_SHORT&&D&&(R=D.RG16_EXT),P===i.SHORT&&D&&(R=D.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(P===i.UNSIGNED_BYTE&&(R=i.RG8UI),P===i.UNSIGNED_SHORT&&(R=i.RG16UI),P===i.UNSIGNED_INT&&(R=i.RG32UI),P===i.BYTE&&(R=i.RG8I),P===i.SHORT&&(R=i.RG16I),P===i.INT&&(R=i.RG32I)),E===i.RGB_INTEGER&&(P===i.UNSIGNED_BYTE&&(R=i.RGB8UI),P===i.UNSIGNED_SHORT&&(R=i.RGB16UI),P===i.UNSIGNED_INT&&(R=i.RGB32UI),P===i.BYTE&&(R=i.RGB8I),P===i.SHORT&&(R=i.RGB16I),P===i.INT&&(R=i.RGB32I)),E===i.RGBA_INTEGER&&(P===i.UNSIGNED_BYTE&&(R=i.RGBA8UI),P===i.UNSIGNED_SHORT&&(R=i.RGBA16UI),P===i.UNSIGNED_INT&&(R=i.RGBA32UI),P===i.BYTE&&(R=i.RGBA8I),P===i.SHORT&&(R=i.RGBA16I),P===i.INT&&(R=i.RGBA32I)),E===i.RGB&&(P===i.UNSIGNED_SHORT&&D&&(R=D.RGB16_EXT),P===i.SHORT&&D&&(R=D.RGB16_SNORM_EXT),P===i.UNSIGNED_INT_5_9_9_9_REV&&(R=i.RGB9_E5),P===i.UNSIGNED_INT_10F_11F_11F_REV&&(R=i.R11F_G11F_B10F)),E===i.RGBA){let q=z?Kh:Tt.getTransfer(y);P===i.FLOAT&&(R=i.RGBA32F),P===i.HALF_FLOAT&&(R=i.RGBA16F),P===i.UNSIGNED_BYTE&&(R=q===Wt?i.SRGB8_ALPHA8:i.RGBA8),P===i.UNSIGNED_SHORT&&D&&(R=D.RGBA16_EXT),P===i.SHORT&&D&&(R=D.RGBA16_SNORM_EXT),P===i.UNSIGNED_SHORT_4_4_4_4&&(R=i.RGBA4),P===i.UNSIGNED_SHORT_5_5_5_1&&(R=i.RGB5_A1)}return R!==i.R16F&&R!==i.R32F&&R!==i.RG16F&&R!==i.RG32F&&R!==i.RGBA16F&&R!==i.RGBA32F||e.get("EXT_color_buffer_float"),R}function S(w,E){let P;return w?E===null||E===Mr||E===Ps?P=i.DEPTH24_STENCIL8:E===gi?P=i.DEPTH32F_STENCIL8:E===Ca&&(P=i.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Mr||E===Ps?P=i.DEPTH_COMPONENT24:E===gi?P=i.DEPTH_COMPONENT32F:E===Ca&&(P=i.DEPTH_COMPONENT16),P}function M(w,E){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ai&&w.minFilter!==Gn?Math.log2(Math.max(E.width,E.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?E.mipmaps.length:1}function C(w){let E=w.target;E.removeEventListener("dispose",C),(function(P){let O=n.get(P);if(O.__webglInit===void 0)return;let y=P.source,z=u.get(y);if(z){let D=z[O.__cacheKey];D.usedTimes--,D.usedTimes===0&&B(P),Object.keys(z).length===0&&u.delete(y)}n.remove(P)})(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&p.delete(E)}function N(w){let E=w.target;E.removeEventListener("dispose",N),(function(P){let O=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(O.__webglFramebuffer[z]))for(let D=0;D<O.__webglFramebuffer[z].length;D++)i.deleteFramebuffer(O.__webglFramebuffer[z][D]);else i.deleteFramebuffer(O.__webglFramebuffer[z]);O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer[z])}else{if(Array.isArray(O.__webglFramebuffer))for(let z=0;z<O.__webglFramebuffer.length;z++)i.deleteFramebuffer(O.__webglFramebuffer[z]);else i.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&i.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let z=0;z<O.__webglColorRenderbuffer.length;z++)O.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(O.__webglColorRenderbuffer[z]);O.__webglDepthRenderbuffer&&i.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let y=P.textures;for(let z=0,D=y.length;z<D;z++){let R=n.get(y[z]);R.__webglTexture&&(i.deleteTexture(R.__webglTexture),a.memory.textures--),n.remove(y[z])}n.remove(P)})(E)}function B(w){let E=n.get(w);i.deleteTexture(E.__webglTexture);let P=w.source;delete u.get(P)[E.__cacheKey],a.memory.textures--}let L=0;function X(w,E){let P=n.get(w);if(w.isVideoTexture&&(function(O){let y=a.render.frame;h.get(O)!==y&&(h.set(O,y),O.update())})(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&P.__version!==w.version){let O=w.image;if(O===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else{if(O.complete!==!1)return void Z(P,w,E);Ze("WebGLRenderer: Texture marked for update but image is incomplete")}}else w.isExternalTexture&&(P.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,P.__webglTexture,i.TEXTURE0+E)}let F={[bl]:i.REPEAT,[Tl]:i.CLAMP_TO_EDGE,[Pp]:i.MIRRORED_REPEAT},K={[Ai]:i.NEAREST,[Lp]:i.NEAREST_MIPMAP_NEAREST,[Ra]:i.NEAREST_MIPMAP_LINEAR,[Gn]:i.LINEAR,[El]:i.LINEAR_MIPMAP_NEAREST,[zr]:i.LINEAR_MIPMAP_LINEAR},te={[Vp]:i.NEVER,[Xp]:i.ALWAYS,[kp]:i.LESS,[Nl]:i.LEQUAL,[Gp]:i.EQUAL,[Dl]:i.GEQUAL,[Hp]:i.GREATER,[Wp]:i.NOTEQUAL};function ae(w,E){if(E.type!==gi||e.has("OES_texture_float_linear")!==!1||E.magFilter!==Gn&&E.magFilter!==El&&E.magFilter!==Ra&&E.magFilter!==zr&&E.minFilter!==Gn&&E.minFilter!==El&&E.minFilter!==Ra&&E.minFilter!==zr||Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,F[E.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,F[E.wrapT]),w!==i.TEXTURE_3D&&w!==i.TEXTURE_2D_ARRAY||i.texParameteri(w,i.TEXTURE_WRAP_R,F[E.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,K[E.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,K[E.minFilter]),E.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,te[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ai||E.minFilter!==Ra&&E.minFilter!==zr||E.type===gi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let P=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function W(w,E){let P=!1;w.__webglInit===void 0&&(w.__webglInit=!0,E.addEventListener("dispose",C));let O=E.source,y=u.get(O);y===void 0&&(y={},u.set(O,y));let z=(function(D){let R=[];return R.push(D.wrapS),R.push(D.wrapT),R.push(D.wrapR||0),R.push(D.magFilter),R.push(D.minFilter),R.push(D.anisotropy),R.push(D.internalFormat),R.push(D.format),R.push(D.type),R.push(D.generateMipmaps),R.push(D.premultiplyAlpha),R.push(D.flipY),R.push(D.unpackAlignment),R.push(D.colorSpace),R.join()})(E);if(z!==w.__cacheKey){y[z]===void 0&&(y[z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,P=!0),y[z].usedTimes++;let D=y[w.__cacheKey];D!==void 0&&(y[w.__cacheKey].usedTimes--,D.usedTimes===0&&B(E)),w.__cacheKey=z,w.__webglTexture=y[z].texture}return P}function k(w,E,P){return Math.floor(Math.floor(w/P)/E)}function Z(w,E,P){let O=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(O=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(O=i.TEXTURE_3D);let y=W(w,E),z=E.source;t.bindTexture(O,w.__webglTexture,i.TEXTURE0+P);let D=n.get(z);if(z.version!==D.__version||y===!0){if(t.activeTexture(i.TEXTURE0+P),!(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)){let ye=Tt.getPrimaries(Tt.workingColorSpace),_e=E.colorSpace===Hr?null:Tt.getPrimaries(E.colorSpace),oe=E.colorSpace===Hr||ye===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let R=v(E.image,!1,r.maxTextureSize);R=Se(E,R);let q=s.convert(E.format,E.colorSpace),$=s.convert(E.type),J,ue=T(E.internalFormat,q,$,E.normalized,E.colorSpace,E.isVideoTexture);ae(O,E);let Ue=E.mipmaps,Ne=E.isVideoTexture!==!0,Me=D.__version===void 0||y===!0,He=z.dataReady,de=M(E,R);if(E.isDepthTexture)ue=S(E.format===kr,E.type),Me&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,ue,R.width,R.height):t.texImage2D(i.TEXTURE_2D,0,ue,R.width,R.height,0,q,$,null));else if(E.isDataTexture)if(Ue.length>0){Ne&&Me&&t.texStorage2D(i.TEXTURE_2D,de,ue,Ue[0].width,Ue[0].height);for(let ye=0,_e=Ue.length;ye<_e;ye++)J=Ue[ye],Ne?He&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,J.width,J.height,q,$,J.data):t.texImage2D(i.TEXTURE_2D,ye,ue,J.width,J.height,0,q,$,J.data);E.generateMipmaps=!1}else Ne?(Me&&t.texStorage2D(i.TEXTURE_2D,de,ue,R.width,R.height),He&&(function(ye,_e,oe,_t){let Xe=ye.updateRanges;if(Xe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e.width,_e.height,oe,_t,_e.data);else{Xe.sort(($e,$t)=>$e.start-$t.start);let Lt=0;for(let $e=1;$e<Xe.length;$e++){let $t=Xe[Lt],St=Xe[$e],wt=$t.start+$t.count,Nt=k(St.start,_e.width,4),vn=k($t.start,_e.width,4);St.start<=wt+1&&Nt===vn&&k(St.start+St.count-1,_e.width,4)===Nt?$t.count=Math.max($t.count,St.start+St.count-$t.start):(++Lt,Xe[Lt]=St)}Xe.length=Lt+1;let Yt=t.getParameter(i.UNPACK_ROW_LENGTH),De=t.getParameter(i.UNPACK_SKIP_PIXELS),Et=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_e.width);for(let $e=0,$t=Xe.length;$e<$t;$e++){let St=Xe[$e],wt=Math.floor(St.start/4),Nt=Math.ceil(St.count/4),vn=wt%_e.width,tn=Math.floor(wt/_e.width),Kt=Nt;t.pixelStorei(i.UNPACK_SKIP_PIXELS,vn),t.pixelStorei(i.UNPACK_SKIP_ROWS,tn),t.texSubImage2D(i.TEXTURE_2D,0,vn,tn,Kt,1,oe,_t,_e.data)}ye.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Yt),t.pixelStorei(i.UNPACK_SKIP_PIXELS,De),t.pixelStorei(i.UNPACK_SKIP_ROWS,Et)}})(E,R,q,$)):t.texImage2D(i.TEXTURE_2D,0,ue,R.width,R.height,0,q,$,R.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ne&&Me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,ue,Ue[0].width,Ue[0].height,R.depth);for(let ye=0,_e=Ue.length;ye<_e;ye++)if(J=Ue[ye],E.format!==Vi)if(q!==null)if(Ne){if(He)if(E.layerUpdates.size>0){let oe=ru(J.width,J.height,E.format,E.type);for(let _t of E.layerUpdates){let Xe=J.data.subarray(_t*oe/J.data.BYTES_PER_ELEMENT,(_t+1)*oe/J.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,_t,J.width,J.height,1,q,Xe)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,0,J.width,J.height,R.depth,q,J.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ye,ue,J.width,J.height,R.depth,0,J.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?He&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,0,J.width,J.height,R.depth,q,$,J.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ye,ue,J.width,J.height,R.depth,0,q,$,J.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Ne&&Me&&t.texStorage2D(i.TEXTURE_2D,de,ue,Ue[0].width,Ue[0].height);for(let ye=0,_e=Ue.length;ye<_e;ye++)J=Ue[ye],E.format!==Vi?q!==null?Ne?He&&t.compressedTexSubImage2D(i.TEXTURE_2D,ye,0,0,J.width,J.height,q,J.data):t.compressedTexImage2D(i.TEXTURE_2D,ye,ue,J.width,J.height,0,J.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?He&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,J.width,J.height,q,$,J.data):t.texImage2D(i.TEXTURE_2D,ye,ue,J.width,J.height,0,q,$,J.data)}else if(E.isDataArrayTexture)if(Ne){if(Me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,ue,R.width,R.height,R.depth),He)if(E.layerUpdates.size>0){let ye=ru(R.width,R.height,E.format,E.type);for(let _e of E.layerUpdates){let oe=R.data.subarray(_e*ye/R.data.BYTES_PER_ELEMENT,(_e+1)*ye/R.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,_e,R.width,R.height,1,q,$,oe)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,R.width,R.height,R.depth,q,$,R.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ue,R.width,R.height,R.depth,0,q,$,R.data);else if(E.isData3DTexture)Ne?(Me&&t.texStorage3D(i.TEXTURE_3D,de,ue,R.width,R.height,R.depth),He&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,R.width,R.height,R.depth,q,$,R.data)):t.texImage3D(i.TEXTURE_3D,0,ue,R.width,R.height,R.depth,0,q,$,R.data);else if(E.isFramebufferTexture){if(Me)if(Ne)t.texStorage2D(i.TEXTURE_2D,de,ue,R.width,R.height);else{let ye=R.width,_e=R.height;for(let oe=0;oe<de;oe++)t.texImage2D(i.TEXTURE_2D,oe,ue,ye,_e,0,q,$,null),ye>>=1,_e>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let ye=i.canvas;if(ye.hasAttribute("layoutsubtree")||ye.setAttribute("layoutsubtree","true"),R.parentNode!==ye)return ye.appendChild(R),p.add(E),ye.onpaint=_e=>{let oe=_e.changedElements;for(let _t of p)oe.includes(_t.image)&&(_t.needsUpdate=!0)},void ye.requestPaint();if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,R);else{let oe=i.RGBA,_t=i.RGBA,Xe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,oe,_t,Xe,R)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(Ne&&Me){let ye=we(Ue[0]);t.texStorage2D(i.TEXTURE_2D,de,ue,ye.width,ye.height)}for(let ye=0,_e=Ue.length;ye<_e;ye++)J=Ue[ye],Ne?He&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,q,$,J):t.texImage2D(i.TEXTURE_2D,ye,ue,q,$,J);E.generateMipmaps=!1}else if(Ne){if(Me){let ye=we(R);t.texStorage2D(i.TEXTURE_2D,de,ue,ye.width,ye.height)}He&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,q,$,R)}else t.texImage2D(i.TEXTURE_2D,0,ue,q,$,R);g(E)&&_(O),D.__version=z.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function he(w,E,P,O,y,z){let D=s.convert(P.format,P.colorSpace),R=s.convert(P.type),q=T(P.internalFormat,D,R,P.normalized,P.colorSpace),$=n.get(E),J=n.get(P);if(J.__renderTarget=E,!$.__hasExternalTextures){let ue=Math.max(1,E.width>>z),Ue=Math.max(1,E.height>>z);y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?t.texImage3D(y,z,q,ue,Ue,E.depth,0,D,R,null):t.texImage2D(y,z,q,ue,Ue,0,D,R,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),fe(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,O,y,J.__webglTexture,0,ie(E)):(y===i.TEXTURE_2D||y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,O,y,J.__webglTexture,z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ce(w,E,P){if(i.bindRenderbuffer(i.RENDERBUFFER,w),E.depthBuffer){let O=E.depthTexture,y=O&&O.isDepthTexture?O.type:null,z=S(E.stencilBuffer,y),D=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;fe(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie(E),z,E.width,E.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie(E),z,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,z,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,D,i.RENDERBUFFER,w)}else{let O=E.textures;for(let y=0;y<O.length;y++){let z=O[y],D=s.convert(z.format,z.colorSpace),R=s.convert(z.type),q=T(z.internalFormat,D,R,z.normalized,z.colorSpace);fe(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie(E),q,E.width,E.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie(E),q,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,q,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function re(w,E,P){let O=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let y=n.get(E.depthTexture);if(y.__renderTarget=E,y.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),O){if(y.__webglInit===void 0&&(y.__webglInit=!0,E.depthTexture.addEventListener("dispose",C)),y.__webglTexture===void 0){y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture),ae(i.TEXTURE_CUBE_MAP,E.depthTexture);let $=s.convert(E.depthTexture.format),J=s.convert(E.depthTexture.type),ue;E.depthTexture.format===Vr?ue=i.DEPTH_COMPONENT24:E.depthTexture.format===kr&&(ue=i.DEPTH24_STENCIL8);for(let Ue=0;Ue<6;Ue++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ue,0,ue,E.width,E.height,0,$,J,null)}}else X(E.depthTexture,0);let z=y.__webglTexture,D=ie(E),R=O?i.TEXTURE_CUBE_MAP_POSITIVE_X+P:i.TEXTURE_2D,q=E.depthTexture.format===kr?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===Vr)fe(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,R,z,0,D):i.framebufferTexture2D(i.FRAMEBUFFER,q,R,z,0);else{if(E.depthTexture.format!==kr)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");fe(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,R,z,0,D):i.framebufferTexture2D(i.FRAMEBUFFER,q,R,z,0)}}function xe(w){let E=n.get(w),P=w.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==w.depthTexture){let O=w.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),O){let y=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,O.removeEventListener("dispose",y)};O.addEventListener("dispose",y),E.__depthDisposeCallback=y}E.__boundDepthTexture=O}if(w.depthTexture&&!E.__autoAllocateDepthBuffer)if(P)for(let O=0;O<6;O++)re(E.__webglFramebuffer[O],w,O);else{let O=w.texture.mipmaps;O&&O.length>0?re(E.__webglFramebuffer[0],w,0):re(E.__webglFramebuffer,w,0)}else if(P){E.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[O]),E.__webglDepthbuffer[O]===void 0)E.__webglDepthbuffer[O]=i.createRenderbuffer(),ce(E.__webglDepthbuffer[O],w,!1);else{let y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=E.__webglDepthbuffer[O];i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,z)}}else{let O=w.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ce(E.__webglDepthbuffer,w,!1);else{let y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,z)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let pe=[],le=[];function ie(w){return Math.min(r.maxSamples,w.samples)}function fe(w){let E=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Se(w,E){let P=w.colorSpace,O=w.format,y=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||P!==Ll&&P!==Hr&&(Tt.getTransfer(P)===Wt?O===Vi&&y===Ri||Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",P)),E}function we(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=function(){let w=L;return w>=r.maxTextures&&Ze("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+r.maxTextures),L+=1,w},this.resetTextureUnits=function(){L=0},this.getTextureUnits=function(){return L},this.setTextureUnits=function(w){L=w},this.setTexture2D=X,this.setTexture2DArray=function(w,E){let P=n.get(w);w.isRenderTargetTexture===!1&&w.version>0&&P.__version!==w.version?Z(P,w,E):(w.isExternalTexture&&(P.__webglTexture=w.sourceTexture?w.sourceTexture:null),t.bindTexture(i.TEXTURE_2D_ARRAY,P.__webglTexture,i.TEXTURE0+E))},this.setTexture3D=function(w,E){let P=n.get(w);w.isRenderTargetTexture===!1&&w.version>0&&P.__version!==w.version?Z(P,w,E):t.bindTexture(i.TEXTURE_3D,P.__webglTexture,i.TEXTURE0+E)},this.setTextureCube=function(w,E){let P=n.get(w);w.isCubeDepthTexture!==!0&&w.version>0&&P.__version!==w.version?(function(O,y,z){if(y.image.length!==6)return;let D=W(O,y),R=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+z);let q=n.get(R);if(R.version!==q.__version||D===!0){t.activeTexture(i.TEXTURE0+z);let $=Tt.getPrimaries(Tt.workingColorSpace),J=y.colorSpace===Hr?null:Tt.getPrimaries(y.colorSpace),ue=y.colorSpace===Hr||$===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let Ue=y.isCompressedTexture||y.image[0].isCompressedTexture,Ne=y.image[0]&&y.image[0].isDataTexture,Me=[];for(let De=0;De<6;De++)Me[De]=Ue||Ne?Ne?y.image[De].image:y.image[De]:v(y.image[De],!0,r.maxCubemapSize),Me[De]=Se(y,Me[De]);let He=Me[0],de=s.convert(y.format,y.colorSpace),ye=s.convert(y.type),_e=T(y.internalFormat,de,ye,y.normalized,y.colorSpace),oe=y.isVideoTexture!==!0,_t=q.__version===void 0||D===!0,Xe=R.dataReady,Lt,Yt=M(y,He);if(ae(i.TEXTURE_CUBE_MAP,y),Ue){oe&&_t&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Yt,_e,He.width,He.height);for(let De=0;De<6;De++){Lt=Me[De].mipmaps;for(let Et=0;Et<Lt.length;Et++){let $e=Lt[Et];y.format!==Vi?de!==null?oe?Xe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,Et,0,0,$e.width,$e.height,de,$e.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,Et,_e,$e.width,$e.height,0,$e.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):oe?Xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,Et,0,0,$e.width,$e.height,de,ye,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,Et,_e,$e.width,$e.height,0,de,ye,$e.data)}}}else{if(Lt=y.mipmaps,oe&&_t){Lt.length>0&&Yt++;let De=we(Me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Yt,_e,De.width,De.height)}for(let De=0;De<6;De++)if(Ne){oe?Xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,0,0,Me[De].width,Me[De].height,de,ye,Me[De].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,_e,Me[De].width,Me[De].height,0,de,ye,Me[De].data);for(let Et=0;Et<Lt.length;Et++){let $e=Lt[Et].image[De].image;oe?Xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,Et+1,0,0,$e.width,$e.height,de,ye,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,Et+1,_e,$e.width,$e.height,0,de,ye,$e.data)}}else{oe?Xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,0,0,de,ye,Me[De]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,_e,de,ye,Me[De]);for(let Et=0;Et<Lt.length;Et++){let $e=Lt[Et];oe?Xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,Et+1,0,0,de,ye,$e.image[De]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,Et+1,_e,de,ye,$e.image[De])}}}g(y)&&_(i.TEXTURE_CUBE_MAP),q.__version=R.version,y.onUpdate&&y.onUpdate(y)}O.__version=y.version})(P,w,E):t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+E)},this.rebindTextures=function(w,E,P){let O=n.get(w);E!==void 0&&he(O.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),P!==void 0&&xe(w)},this.setupRenderTarget=function(w){let E=w.texture,P=n.get(w),O=n.get(E);w.addEventListener("dispose",N);let y=w.textures,z=w.isWebGLCubeRenderTarget===!0,D=y.length>1;if(D||(O.__webglTexture===void 0&&(O.__webglTexture=i.createTexture()),O.__version=E.version,a.memory.textures++),z){P.__webglFramebuffer=[];for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0){P.__webglFramebuffer[R]=[];for(let q=0;q<E.mipmaps.length;q++)P.__webglFramebuffer[R][q]=i.createFramebuffer()}else P.__webglFramebuffer[R]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){P.__webglFramebuffer=[];for(let R=0;R<E.mipmaps.length;R++)P.__webglFramebuffer[R]=i.createFramebuffer()}else P.__webglFramebuffer=i.createFramebuffer();if(D)for(let R=0,q=y.length;R<q;R++){let $=n.get(y[R]);$.__webglTexture===void 0&&($.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&fe(w)===!1){P.__webglMultisampledFramebuffer=i.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let R=0;R<y.length;R++){let q=y[R];P.__webglColorRenderbuffer[R]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,P.__webglColorRenderbuffer[R]);let $=s.convert(q.format,q.colorSpace),J=s.convert(q.type),ue=T(q.internalFormat,$,J,q.normalized,q.colorSpace,w.isXRRenderTarget===!0),Ue=ie(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue,ue,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+R,i.RENDERBUFFER,P.__webglColorRenderbuffer[R])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(P.__webglDepthRenderbuffer=i.createRenderbuffer(),ce(P.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(z){t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture),ae(i.TEXTURE_CUBE_MAP,E);for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0)for(let q=0;q<E.mipmaps.length;q++)he(P.__webglFramebuffer[R][q],w,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,q);else he(P.__webglFramebuffer[R],w,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,0);g(E)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(D){for(let R=0,q=y.length;R<q;R++){let $=y[R],J=n.get($),ue=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ue=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,J.__webglTexture),ae(ue,$),he(P.__webglFramebuffer,w,$,i.COLOR_ATTACHMENT0+R,ue,0),g($)&&_(ue)}t.unbindTexture()}else{let R=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(R=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(R,O.__webglTexture),ae(R,E),E.mipmaps&&E.mipmaps.length>0)for(let q=0;q<E.mipmaps.length;q++)he(P.__webglFramebuffer[q],w,E,i.COLOR_ATTACHMENT0,R,q);else he(P.__webglFramebuffer,w,E,i.COLOR_ATTACHMENT0,R,0);g(E)&&_(R),t.unbindTexture()}w.depthBuffer&&xe(w)},this.updateRenderTargetMipmap=function(w){let E=w.textures;for(let P=0,O=E.length;P<O;P++){let y=E[P];if(g(y)){let z=b(w),D=n.get(y).__webglTexture;t.bindTexture(z,D),_(z),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(w){if(w.samples>0){if(fe(w)===!1){let E=w.textures,P=w.width,O=w.height,y=i.COLOR_BUFFER_BIT,z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,D=n.get(w),R=E.length>1;if(R)for(let $=0;$<E.length;$++)t.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,D.__webglMultisampledFramebuffer);let q=w.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,D.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,D.__webglFramebuffer);for(let $=0;$<E.length;$++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(y|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(y|=i.STENCIL_BUFFER_BIT)),R){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,D.__webglColorRenderbuffer[$]);let J=n.get(E[$]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,P,O,0,0,P,O,y,i.NEAREST),c===!0&&(pe.length=0,le.length=0,pe.push(i.COLOR_ATTACHMENT0+$),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(pe.push(z),le.push(z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),R)for(let $=0;$<E.length;$++){t.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,D.__webglColorRenderbuffer[$]);let J=n.get(E[$]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.TEXTURE_2D,J,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,D.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&c){let E=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=he,this.useMultisampledRTT=fe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function jy(i,e){return{convert:function(t,n=Hr){let r,s=Tt.getTransfer(n);if(t===Ri)return i.UNSIGNED_BYTE;if(t===mh)return i.UNSIGNED_SHORT_4_4_4_4;if(t===gh)return i.UNSIGNED_SHORT_5_5_5_1;if(t===Up)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===Op)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===Np)return i.BYTE;if(t===Dp)return i.SHORT;if(t===Ca)return i.UNSIGNED_SHORT;if(t===fh)return i.INT;if(t===Mr)return i.UNSIGNED_INT;if(t===gi)return i.FLOAT;if(t===zi)return i.HALF_FLOAT;if(t===Fp)return i.ALPHA;if(t===Bp)return i.RGB;if(t===Vi)return i.RGBA;if(t===Vr)return i.DEPTH_COMPONENT;if(t===kr)return i.DEPTH_STENCIL;if(t===Ia)return i.RED;if(t===_h)return i.RED_INTEGER;if(t===Gr)return i.RG;if(t===vh)return i.RG_INTEGER;if(t===xh)return i.RGBA_INTEGER;if(t===wl||t===Al||t===Rl||t===Cl)if(s===Wt){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===wl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Al)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Rl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Cl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===wl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Al)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Rl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Cl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===yh||t===Sh||t===Mh||t===bh){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===yh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Sh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Mh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===bh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Th||t===Eh||t===wh||t===Ah||t===Rh||t===Il||t===Ch){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===Th||t===Eh)return s===Wt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===wh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(t===Ah)return r.COMPRESSED_R11_EAC;if(t===Rh)return r.COMPRESSED_SIGNED_R11_EAC;if(t===Il)return r.COMPRESSED_RG11_EAC;if(t===Ch)return r.COMPRESSED_SIGNED_RG11_EAC}if(t===Ih||t===Ph||t===Lh||t===Nh||t===Dh||t===Uh||t===Oh||t===Fh||t===Bh||t===zh||t===Vh||t===kh||t===Gh||t===Hh){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===Ih)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Ph)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Lh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Nh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Dh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Uh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Oh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Fh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Bh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===zh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Vh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===kh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Gh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Hh)return s===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Wh||t===Xh||t===qh){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Wh)return s===Wt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Xh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===qh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===jh||t===Yh||t===Pl||t===$h){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===jh)return r.COMPRESSED_RED_RGTC1_EXT;if(t===Yh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Pl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===$h)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Ps?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var Yy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$y=`
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

}`,bu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ha(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new _n({vertexShader:Yy,fragmentShader:$y,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Vn(new Ts(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tu=class extends Di{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,p=null,d=null,u=null,m=null,f=typeof XRWebGLBinding<"u",v=new bu,g={},_=t.getContextAttributes(),b=null,T=null,S=[],M=[],C=new ge,N=null,B=null,L=new zn;L.viewport=new Ht;let X=new zn;X.viewport=new Ht;let F=[L,X],K=new vl,te=null,ae=null;function W(le){let ie=M.indexOf(le.inputSource);if(ie===-1)return;let fe=S[ie];fe!==void 0&&(fe.update(le.inputSource,le.frame,l||a),fe.dispatchEvent({type:le.type,data:le.inputSource}))}function k(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",Z);for(let le=0;le<S.length;le++){let ie=M[le];ie!==null&&(M[le]=null,S[le].disconnect(ie))}te=null,ae=null,v.reset();for(let le in g)delete g[le];if(e.setRenderTarget(b),u=null,d=null,p=null,r=null,T=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(C.width,C.height,!1),B!==null){let le=B.camera;le.fov=B.fov,le.zoom=B.zoom,le.updateProjectionMatrix(),B=null}n.dispatchEvent({type:"sessionend"})}function Z(le){for(let ie=0;ie<le.removed.length;ie++){let fe=le.removed[ie],Se=M.indexOf(fe);Se>=0&&(M[Se]=null,S[Se].disconnect(fe))}for(let ie=0;ie<le.added.length;ie++){let fe=le.added[ie],Se=M.indexOf(fe);if(Se===-1){for(let w=0;w<S.length;w++){if(w>=M.length){M.push(fe),Se=w;break}if(M[w]===null){M[w]=fe,Se=w;break}}if(Se===-1)break}let we=S[Se];we&&we.connect(fe)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(le){let ie=S[le];return ie===void 0&&(ie=new xs,S[le]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(le){let ie=S[le];return ie===void 0&&(ie=new xs,S[le]=ie),ie.getGripSpace()},this.getHand=function(le){let ie=S[le];return ie===void 0&&(ie=new xs,S[le]=ie),ie.getHandSpace()},this.setFramebufferScaleFactor=function(le){s=le,n.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(le){o=le,n.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(le){l=le},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return p===null&&f&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(le){if(r=le,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",k),r.addEventListener("inputsourceschange",Z),_.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(C),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,fe=null,Se=null;_.depth&&(Se=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=_.stencil?kr:Vr,fe=_.stencil?Ps:Mr);let we={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};p=this.getBinding(),d=p.createProjectionLayer(we),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new ni(d.textureWidth,d.textureHeight,{format:Vi,type:Ri,depthTexture:new xr(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ie={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),T=new ni(u.framebufferWidth,u.framebufferHeight,{format:Vi,type:Ri,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let he=new I,ce=new I;function re(le,ie){ie===null?le.matrixWorld.copy(le.matrix):le.matrixWorld.multiplyMatrices(ie.matrixWorld,le.matrix),le.matrixWorldInverse.copy(le.matrixWorld).invert()}this.updateCamera=function(le){if(r===null)return;let ie=le.near,fe=le.far;v.texture!==null&&(v.depthNear>0&&(ie=v.depthNear),v.depthFar>0&&(fe=v.depthFar)),K.near=X.near=L.near=ie,K.far=X.far=L.far=fe,te===K.near&&ae===K.far||(r.updateRenderState({depthNear:K.near,depthFar:K.far}),te=K.near,ae=K.far),K.layers.mask=6|le.layers.mask,L.layers.mask=-5&K.layers.mask,X.layers.mask=-3&K.layers.mask;let Se=le.parent,we=K.cameras;re(K,Se);for(let w=0;w<we.length;w++)re(we[w],Se);we.length===2?(function(w,E,P){he.setFromMatrixPosition(E.matrixWorld),ce.setFromMatrixPosition(P.matrixWorld);let O=he.distanceTo(ce),y=E.projectionMatrix.elements,z=P.projectionMatrix.elements,D=y[14]/(y[10]-1),R=y[14]/(y[10]+1),q=(y[9]+1)/y[5],$=(y[9]-1)/y[5],J=(y[8]-1)/y[0],ue=(z[8]+1)/z[0],Ue=D*J,Ne=D*ue,Me=O/(-J+ue),He=Me*-J;if(E.matrixWorld.decompose(w.position,w.quaternion,w.scale),w.translateX(He),w.translateZ(Me),w.matrixWorld.compose(w.position,w.quaternion,w.scale),w.matrixWorldInverse.copy(w.matrixWorld).invert(),y[10]===-1)w.projectionMatrix.copy(E.projectionMatrix),w.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let de=D+Me,ye=R+Me,_e=Ue-He,oe=Ne+(O-He),_t=q*R/ye*de,Xe=$*R/ye*de;w.projectionMatrix.makePerspective(_e,oe,_t,Xe,de,ye),w.projectionMatrixInverse.copy(w.projectionMatrix).invert()}})(K,L,X):K.projectionMatrix.copy(L.projectionMatrix),B===null&&le.isPerspectiveCamera&&(B={camera:le,fov:le.fov,zoom:le.zoom}),(function(w,E,P){P===null?w.matrix.copy(E.matrixWorld):(w.matrix.copy(P.matrixWorld),w.matrix.invert(),w.matrix.multiply(E.matrixWorld)),w.matrix.decompose(w.position,w.quaternion,w.scale),w.updateMatrixWorld(!0),w.projectionMatrix.copy(E.projectionMatrix),w.projectionMatrixInverse.copy(E.projectionMatrixInverse),w.isPerspectiveCamera&&(w.fov=2*wo*Math.atan(1/w.projectionMatrix.elements[5]),w.zoom=1)})(le,K,Se)},this.getCamera=function(){return K},this.getFoveation=function(){if(d!==null||u!==null)return c},this.setFoveation=function(le){c=le,d!==null&&(d.fixedFoveation=le),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=le)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(K)},this.getCameraTexture=function(le){return g[le]};let xe=null,pe=new Af;pe.setAnimationLoop(function(le,ie){if(h=ie.getViewerPose(l||a),m=ie,h!==null){let fe=h.views;u!==null&&(e.setRenderTargetFramebuffer(T,u.framebuffer),e.setRenderTarget(T));let Se=!1;fe.length!==K.cameras.length&&(K.cameras.length=0,Se=!0);for(let w=0;w<fe.length;w++){let E=fe[w],P=null;if(u!==null)P=u.getViewport(E);else{let y=p.getViewSubImage(d,E);P=y.viewport,w===0&&(e.setRenderTargetTextures(T,y.colorTexture,y.depthStencilTexture),e.setRenderTarget(T))}let O=F[w];O===void 0&&(O=new zn,O.layers.enable(w),O.viewport=new Ht,F[w]=O),O.matrix.fromArray(E.transform.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale),O.projectionMatrix.fromArray(E.projectionMatrix),O.projectionMatrixInverse.copy(O.projectionMatrix).invert(),O.viewport.set(P.x,P.y,P.width,P.height),w===0&&(K.matrix.copy(O.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale)),Se===!0&&K.cameras.push(O)}let we=r.enabledFeatures;if(we&&we.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&f){p=n.getBinding();let w=p.getDepthInformation(fe[0]);w&&w.isValid&&w.texture&&v.init(w,r.renderState)}if(we&&we.includes("camera-access")&&f){e.state.unbindTexture(),p=n.getBinding();for(let w=0;w<fe.length;w++){let E=fe[w].camera;if(E){let P=g[E];P||(P=new ha,g[E]=P);let O=p.getCameraImage(E);P.sourceTexture=O}}}}for(let fe=0;fe<S.length;fe++){let Se=M[fe],we=S[fe];Se!==null&&we!==void 0&&we.update(Se,ie,l||a)}xe&&xe(le,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),m=null}),this.setAnimationLoop=function(le){xe=le},this.dispose=function(){}}},Zy=new ut,Nf=new rt;function Jy(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===kn&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===kn&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(r.envMap.value=o,r.envMapRotation.value.setFromMatrix4(Zy.makeRotationFromEuler(c)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply(Nf),r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,nu(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,c){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(r,s):s.isMeshLambertMaterial?(n(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(r,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(r,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(l,h,p){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===kn&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.retroreflectivity>0&&(l.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=p.texture,l.transmissionSamplerSize.value.set(p.width,p.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(r,s,c)):s.isMeshMatcapMaterial?(n(r,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(l,h){let p=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(p.matrixWorld),l.nearDistance.value=p.shadow.camera.near,l.farDistance.value=p.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(l,h,p,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*p,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function Ky(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(d,u,m,f){if((function(v,g,_,b){let T=v.value,S=g+"_"+_;if(b[S]===void 0)return typeof T=="number"||typeof T=="boolean"?b[S]=T:ArrayBuffer.isView(T)?b[S]=T.slice():b[S]=T.clone(),!0;{let M=b[S];if(typeof T=="number"||typeof T=="boolean"){if(M!==T)return b[S]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(M.equals(T)===!1)return M.copy(T),!0}}return!1})(d,u,m,f)===!0){let v=d.__offset,g=d.value;if(Array.isArray(g)){let _=0;for(let b=0;b<g.length;b++){let T=g[b],S=h(T);l(T,d.__data,_),typeof T=="number"||typeof T=="boolean"||T.isMatrix3||ArrayBuffer.isView(T)||(_+=S.storage/Float32Array.BYTES_PER_ELEMENT)}}else l(g,d.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,d.__data)}}function l(d,u,m){typeof d=="number"||typeof d=="boolean"?u[0]=d:d.isMatrix3?(u[0]=d.elements[0],u[1]=d.elements[1],u[2]=d.elements[2],u[3]=0,u[4]=d.elements[3],u[5]=d.elements[4],u[6]=d.elements[5],u[7]=0,u[8]=d.elements[6],u[9]=d.elements[7],u[10]=d.elements[8],u[11]=0):ArrayBuffer.isView(d)?u.set(new d.constructor(d.buffer,d.byteOffset,u.length)):d.toArray(u,m)}function h(d){let u={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(u.boundary=4,u.storage=4):d.isVector2?(u.boundary=8,u.storage=8):d.isVector3||d.isColor?(u.boundary=16,u.storage=12):d.isVector4?(u.boundary=16,u.storage=16):d.isMatrix3?(u.boundary=48,u.storage=48):d.isMatrix4?(u.boundary=64,u.storage=64):d.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(d)?(u.boundary=16,u.storage=d.byteLength):Ze("WebGLRenderer: Unsupported uniform value type.",d),u}function p(d){let u=d.target;u.removeEventListener("dispose",p);let m=a.indexOf(u.__bindingPointIndex);a.splice(m,1),i.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}return{bind:function(d,u){let m=u.program;n.uniformBlockBinding(d,m)},update:function(d,u){let m=r[d.id];m===void 0&&((function(g){let _=g.uniforms,b=0,T=16;for(let M=0,C=_.length;M<C;M++){let N=Array.isArray(_[M])?_[M]:[_[M]];for(let B=0,L=N.length;B<L;B++){let X=N[B],F=Array.isArray(X.value)?X.value:[X.value];for(let K=0,te=F.length;K<te;K++){let ae=h(F[K]),W=b%T,k=W%ae.boundary,Z=W+k;b+=k,Z!==0&&T-Z<ae.storage&&(b+=T-Z),X.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=b,b+=ae.storage}}}let S=b%T;S>0&&(b+=T-S),g.__size=b,g.__cache={}})(d),m=(function(g){let _=(function(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=_;let b=i.createBuffer(),T=g.__size,S=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,T,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,b),b})(d),r[d.id]=m,d.addEventListener("dispose",p));let f=u.program;n.updateUBOMapping(d,f);let v=e.render.frame;s[d.id]!==v&&((function(g){let _=r[g.id],b=g.uniforms,T=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let S=0,M=b.length;S<M;S++){let C=b[S];if(Array.isArray(C))for(let N=0,B=C.length;N<B;N++)c(C[N],S,N,T);else c(C,S,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)})(d),s[d.id]=v)},dispose:function(){for(let d in r)i.deleteBuffer(r[d]);a=[],r={},s={}}}}Nf.set(-1,0,0,0,1,0,0,0,1);var Qy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ki=null;function e1(){return ki===null&&(ki=new Nr(Qy,16,16,Gr,zi),ki.name="DFG_LUT",ki.minFilter=Gn,ki.magFilter=Gn,ki.wrapS=Tl,ki.wrapT=Tl,ki.generateMipmaps=!1,ki.needsUpdate=!0),ki}var Vl=class{constructor(e={}){let{canvas:t=qp(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Ri}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let f=u,v=new Set([xh,vh,_h]),g=new Set([Ri,Mr,Ca,Ps,mh,gh]),_=new Uint32Array(4),b=new Int32Array(4),T=new I,S=null,M=null,C=[],N=[],B=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,X=!1,F=null,K=null,te=null,ae=null;this._outputColorSpace=Jh;let W=0,k=0,Z=null,he=-1,ce=null,re=new Ht,xe=new Ht,pe=null,le=new at(0),ie=0,fe=t.width,Se=t.height,we=1,w=null,E=null,P=new Ht(0,0,fe,Se),O=new Ht(0,0,fe,Se),y=!1,z=new _r,D=!1,R=!1,q=new ut,$=new I,J=new Ht,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ue=!1;function Ne(){return Z===null?we:1}let Me,He,de,ye,_e,oe,_t,Xe,Lt,Yt,De,Et,$e,$t,St,wt,Nt,vn,tn,Kt,un,cn,Xt,G=n;function dn(A,H){return t.getContext(A,H)}try{let A={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",ot,!1),t.addEventListener("webglcontextrestored",Zt,!1),t.addEventListener("webglcontextcreationerror",Wi,!1),G===null){let H="webgl2";if(G=dn(H,A),G===null)throw dn(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ge()}catch(A){throw t.removeEventListener("webglcontextlost",ot,!1),t.removeEventListener("webglcontextrestored",Zt,!1),t.removeEventListener("webglcontextcreationerror",Wi,!1),Qe("WebGLRenderer: "+A.message),A}function Ge(){Me=new lx(G),Me.init(),un=new jy(G,Me),He=new tx(G,Me,e,un),de=new Xy(G,Me),He.reversedDepthBuffer&&d&&de.buffers.depth.setReversed(!0),K=G.createFramebuffer(),te=G.createFramebuffer(),ae=G.createFramebuffer(),ye=new ux(G),_e=new Py,oe=new qy(G,Me,de,_e,He,un,ye),_t=new ox(L),Xe=new g0(G),cn=new Qv(G,Xe),Lt=new cx(G,Xe,ye,cn),Yt=new px(G,Lt,Xe,cn,ye),vn=new dx(G,He,oe),St=new nx(_e),De=new Iy(L,_t,Me,He,cn,St),Et=new Jy(L,_e),$e=new Ny,$t=new zy(Me),Nt=new Kv(L,_t,de,Yt,m,c),wt=new Wy(L,Yt,He),Xt=new Ky(G,ye,He,de),tn=new ex(G,Me,ye),Kt=new hx(G,Me,ye),ye.programs=De.programs,L.capabilities=He,L.extensions=Me,L.properties=_e,L.renderLists=$e,L.shadowMap=wt,L.state=de,L.info=ye}f!==Ri&&(B=new mx(f,t.width,t.height,o,r,s));let pt=new Tu(L,G);function ot(A){A.preventDefault(),ea("WebGLRenderer: Context Lost."),X=!0}function Zt(){ea("WebGLRenderer: Context Restored."),X=!1;let A=ye.autoReset,H=wt.enabled,ee=wt.autoUpdate,se=wt.needsUpdate,ne=wt.type;Ge(),ye.autoReset=A,wt.enabled=H,wt.autoUpdate=ee,wt.needsUpdate=se,wt.type=ne}function Wi(A){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Xi(A){let H=A.target;H.removeEventListener("dispose",Xi),(function(ee){(function(se){let ne=_e.get(se).programs;ne!==void 0&&(ne.forEach(function(ve){De.releaseProgram(ve)}),se.isShaderMaterial&&De.releaseShaderCache(se))})(ee),_e.remove(ee)})(H)}function qe(A,H,ee,se){F!==null&&A.isNodeMaterial&&F.setObject(se,A),D===!0&&St.setState(A,ee,!1),A.transparent===!0&&A.side===Fi&&A.forceSinglePass===!1?(A.side=kn,A.needsUpdate=!0,on(A,H,se),A.side=Rs,A.needsUpdate=!0,on(A,H,se),A.side=Fi):on(A,H,se)}this.xr=pt,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let A=Me.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Me.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return we},this.setPixelRatio=function(A){A!==void 0&&(we=A,this.setSize(fe,Se,!1))},this.getSize=function(A){return A.set(fe,Se)},this.setSize=function(A,H,ee=!0){pt.isPresenting?Ze("WebGLRenderer: Can't change size while VR device is presenting."):(fe=A,Se=H,t.width=Math.floor(A*we),t.height=Math.floor(H*we),ee===!0&&(t.style.width=A+"px",t.style.height=H+"px"),B!==null&&B.setSize(t.width,t.height),this.setViewport(0,0,A,H))},this.getDrawingBufferSize=function(A){return A.set(fe*we,Se*we).floor()},this.setDrawingBufferSize=function(A,H,ee){fe=A,Se=H,we=ee,t.width=Math.floor(A*ee),t.height=Math.floor(H*ee),this.setViewport(0,0,A,H)},this.setEffects=function(A){if(f!==Ri){if(A){for(let H=0;H<A.length;H++)if(A[H].isOutputPass===!0){Ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(A||[])}else Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(A){return A.copy(re)},this.getViewport=function(A){return A.copy(P)},this.setViewport=function(A,H,ee,se){A.isVector4?P.set(A.x,A.y,A.z,A.w):P.set(A,H,ee,se),de.viewport(re.copy(P).multiplyScalar(we).round())},this.getScissor=function(A){return A.copy(O)},this.setScissor=function(A,H,ee,se){A.isVector4?O.set(A.x,A.y,A.z,A.w):O.set(A,H,ee,se),de.scissor(xe.copy(O).multiplyScalar(we).round())},this.getScissorTest=function(){return y},this.setScissorTest=function(A){de.setScissorTest(y=A)},this.setOpaqueSort=function(A){w=A},this.setTransparentSort=function(A){E=A},this.getClearColor=function(A){return A.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor(...arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha(...arguments)},this.clear=function(A=!0,H=!0,ee=!0){let se=0;if(A){let ne=!1;if(Z!==null){let ve=Z.texture.format;ne=v.has(ve)}if(ne){let ve=Z.texture.type,Ee=g.has(ve),be=Nt.getClearColor(),Ce=Nt.getClearAlpha(),Ve=be.r,lt=be.g,mt=be.b;Ee?(_[0]=Ve,_[1]=lt,_[2]=mt,_[3]=Ce,G.clearBufferuiv(G.COLOR,0,_)):(b[0]=Ve,b[1]=lt,b[2]=mt,b[3]=Ce,G.clearBufferiv(G.COLOR,0,b))}else se|=G.COLOR_BUFFER_BIT}H&&(se|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ee&&(se|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),se!==0&&G.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),F=A},this.dispose=function(){t.removeEventListener("webglcontextlost",ot,!1),t.removeEventListener("webglcontextrestored",Zt,!1),t.removeEventListener("webglcontextcreationerror",Wi,!1),Nt.dispose(),$e.dispose(),$t.dispose(),_e.dispose(),_t.dispose(),Yt.dispose(),cn.dispose(),Xt.dispose(),De.dispose(),pt.dispose(),pt.removeEventListener("sessionstart",Ft),pt.removeEventListener("sessionend",ii),Wn.stop()},this.renderBufferDirect=function(A,H,ee,se,ne,ve){H===null&&(H=ue);let Ee=ne.isMesh&&ne.matrixWorld.determinantAffine()<0,be=(function(j,me,Ae,Te,Re){me.isScene!==!0&&(me=ue),oe.resetTextureUnits();let Oe=me.fog,Bt=Te.isMeshStandardMaterial||Te.isMeshLambertMaterial||Te.isMeshPhongMaterial?me.environment:null,Dt=Z===null?L.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Tt.workingColorSpace,zt=Te.isMeshStandardMaterial||Te.isMeshLambertMaterial&&!Te.envMap||Te.isMeshPhongMaterial&&!Te.envMap,Je=_t.get(Te.envMap||Bt,zt),vt=Te.vertexColors===!0&&!!Ae.attributes.color&&Ae.attributes.color.itemSize===4,Ke=!!Ae.attributes.tangent&&(!!Te.normalMap||Te.anisotropy>0),pn=!!Ae.morphAttributes.position,xn=!!Ae.morphAttributes.normal,ci=!!Ae.morphAttributes.color,hi=wi;Te.toneMapped&&(Z!==null&&Z.isXRRenderTarget!==!0||(hi=L.toneMapping));let Ci=Ae.morphAttributes.position||Ae.morphAttributes.normal||Ae.morphAttributes.color,rr=Ci!==void 0?Ci.length:0,ke=_e.get(Te),qt=M.state.lights;if(D===!0&&(R===!0||j!==ce)){let Ut=j===ce&&Te.id===he;St.setState(Te,j,Ut)}let jt=!1;Te.version===ke.__version?ke.needsLights&&ke.lightsStateVersion!==qt.state.version||ke.outputColorSpace!==Dt||Re.isBatchedMesh&&ke.batching===!1?jt=!0:Re.isBatchedMesh||ke.batching!==!0?Re.isBatchedMesh&&ke.batchingColor===!0&&Re._colorsTexture===null||Re.isBatchedMesh&&ke.batchingColor===!1&&Re._colorsTexture!==null||Re.isInstancedMesh&&ke.instancing===!1?jt=!0:Re.isInstancedMesh||ke.instancing!==!0?Re.isSkinnedMesh&&ke.skinning===!1?jt=!0:Re.isSkinnedMesh||ke.skinning!==!0?Re.isInstancedMesh&&ke.instancingColor===!0&&Re.instanceColor===null||Re.isInstancedMesh&&ke.instancingColor===!1&&Re.instanceColor!==null||Re.isInstancedMesh&&ke.instancingMorph===!0&&Re.morphTexture===null||Re.isInstancedMesh&&ke.instancingMorph===!1&&Re.morphTexture!==null||ke.envMap!==Je||Te.fog===!0&&ke.fog!==Oe?jt=!0:ke.numClippingPlanes===void 0||ke.numClippingPlanes===St.numPlanes&&ke.numIntersection===St.numIntersection?(ke.vertexAlphas!==vt||ke.vertexTangents!==Ke||ke.morphTargets!==pn||ke.morphNormals!==xn||ke.morphColors!==ci||ke.toneMapping!==hi||ke.morphTargetsCount!==rr||!!ke.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(jt=!0):jt=!0:jt=!0:jt=!0:jt=!0:(jt=!0,ke.__version=Te.version);let wn=ke.currentProgram;jt===!0&&(wn=on(Te,me,Re),F&&Te.isNodeMaterial&&F.onUpdateProgram(Te,wn,ke));let ei=!1,en=!1,yn=!1,At=wn.getUniforms(),hn=ke.uniforms;if(de.useProgram(wn.program)&&(ei=!0,en=!0,yn=!0),Te.id!==he&&(he=Te.id,en=!0),ke.needsLights){let Ut=(function(An,Pe){if(An.length===0)return null;if(An.length===1)return An[0].texture!==null?An[0]:null;T.setFromMatrixPosition(Pe.matrixWorld);for(let Rt=0,Pn=An.length;Rt<Pn;Rt++){let ti=An[Rt];if(ti.texture!==null&&ti.boundingBox.containsPoint(T))return ti}return null})(M.state.lightProbeGridArray,Re);ke.lightProbeGrid!==Ut&&(ke.lightProbeGrid=Ut,en=!0)}if(ei||ce!==j){de.buffers.depth.getReversed()&&j.reversedDepth!==!0&&(j._reversedDepth=!0,j.updateProjectionMatrix()),At.setValue(G,"projectionMatrix",j.projectionMatrix),At.setValue(G,"viewMatrix",j.matrixWorldInverse);let Ut=At.map.cameraPosition;Ut!==void 0&&Ut.setValue(G,$.setFromMatrixPosition(j.matrixWorld)),He.logarithmicDepthBuffer&&At.setValue(G,"logDepthBufFC",2/(Math.log(j.far+1)/Math.LN2)),(Te.isMeshPhongMaterial||Te.isMeshToonMaterial||Te.isMeshLambertMaterial||Te.isMeshBasicMaterial||Te.isMeshStandardMaterial||Te.isShaderMaterial)&&At.setValue(G,"isOrthographic",j.isOrthographicCamera===!0),ce!==j&&(ce=j,en=!0,yn=!0)}if(ke.needsLights&&(qt.state.sunShadowMap.length>0&&At.setValue(G,"sunShadowMap",qt.state.sunShadowMap,oe),qt.state.directionalShadowMap.length>0&&At.setValue(G,"directionalShadowMap",qt.state.directionalShadowMap,oe),qt.state.spotShadowMap.length>0&&At.setValue(G,"spotShadowMap",qt.state.spotShadowMap,oe),qt.state.pointShadowMap.length>0&&At.setValue(G,"pointShadowMap",qt.state.pointShadowMap,oe)),Re.isSkinnedMesh){At.setOptional(G,Re,"bindMatrix"),At.setOptional(G,Re,"bindMatrixInverse");let Ut=Re.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),At.setValue(G,"boneTexture",Ut.boneTexture,oe))}Re.isBatchedMesh&&(At.setOptional(G,Re,"batchingTexture"),At.setValue(G,"batchingTexture",Re._matricesTexture,oe),At.setOptional(G,Re,"batchingIdTexture"),At.setValue(G,"batchingIdTexture",Re._indirectTexture,oe),At.setOptional(G,Re,"batchingColorTexture"),Re._colorsTexture!==null&&At.setValue(G,"batchingColorTexture",Re._colorsTexture,oe));let sr=Ae.morphAttributes;if(sr.position===void 0&&sr.normal===void 0&&sr.color===void 0||vn.update(Re,Ae,wn),(en||ke.receiveShadow!==Re.receiveShadow)&&(ke.receiveShadow=Re.receiveShadow,At.setValue(G,"receiveShadow",Re.receiveShadow)),(Te.isMeshStandardMaterial||Te.isMeshLambertMaterial||Te.isMeshPhongMaterial)&&Te.envMap===null&&me.environment!==null&&(hn.envMapIntensity.value=me.environmentIntensity),hn.dfgLUT!==void 0&&(hn.dfgLUT.value=e1()),en){if(At.setValue(G,"toneMappingExposure",L.toneMappingExposure),ke.needsLights&&(fn=yn,(ln=hn).ambientLightColor.needsUpdate=fn,ln.lightProbe.needsUpdate=fn,ln.sunLights.needsUpdate=fn,ln.sunLightShadows.needsUpdate=fn,ln.directionalLights.needsUpdate=fn,ln.directionalLightShadows.needsUpdate=fn,ln.pointLights.needsUpdate=fn,ln.pointLightShadows.needsUpdate=fn,ln.spotLights.needsUpdate=fn,ln.spotLightShadows.needsUpdate=fn,ln.rectAreaLights.needsUpdate=fn,ln.hemisphereLights.needsUpdate=fn),Oe&&Te.fog===!0&&Et.refreshFogUniforms(hn,Oe),Et.refreshMaterialUniforms(hn,Te,we,Se,M.state.transmissionRenderTarget[j.id]),ke.needsLights&&ke.lightProbeGrid){let Ut=ke.lightProbeGrid;hn.probesSH.value=Ut.texture,hn.probesMin.value.copy(Ut.boundingBox.min),hn.probesMax.value.copy(Ut.boundingBox.max),hn.probesResolution.value.copy(Ut.resolution)}Ns.upload(G,En(ke),hn,oe)}var ln,fn;if(Te.isShaderMaterial&&Te.uniformsNeedUpdate===!0&&(Ns.upload(G,En(ke),hn,oe),Te.uniformsNeedUpdate=!1),Te.isSpriteMaterial&&At.setValue(G,"center",Re.center),At.setValue(G,"modelViewMatrix",Re.modelViewMatrix),At.setValue(G,"normalMatrix",Re.normalMatrix),At.setValue(G,"modelMatrix",Re.matrixWorld),Te.uniformsGroups!==void 0){let Ut=Te.uniformsGroups;for(let An=0,Pe=Ut.length;An<Pe;An++){let Rt=Ut[An];Xt.update(Rt,wn),Xt.bind(Rt,wn)}}return wn})(A,H,ee,se,ne);de.setMaterial(se,Ee);let Ce=ee.index,Ve=1;if(se.wireframe===!0){if(Ce=Lt.getWireframeAttribute(ee),Ce===void 0)return;Ve=2}let lt=ee.drawRange,mt=ee.attributes.position,Be=lt.start*Ve,tt=(lt.start+lt.count)*Ve;ve!==null&&(Be=Math.max(Be,ve.start*Ve),tt=Math.min(tt,(ve.start+ve.count)*Ve)),Ce!==null?(Be=Math.max(Be,0),tt=Math.min(tt,Ce.count)):mt!=null&&(Be=Math.max(Be,0),tt=Math.min(tt,mt.count));let Pt=tt-Be;if(Pt<0||Pt===1/0)return;let ze;cn.setup(ne,se,be,ee,Ce);let V=tn;if(Ce!==null&&(ze=Xe.get(Ce),V=Kt,V.setIndex(ze)),ne.isMesh)se.wireframe===!0?(de.setLineWidth(se.wireframeLinewidth*Ne()),V.setMode(G.LINES)):V.setMode(G.TRIANGLES);else if(ne.isLine){let j=se.linewidth;j===void 0&&(j=1),de.setLineWidth(j*Ne()),ne.isLineSegments?V.setMode(G.LINES):ne.isLineLoop?V.setMode(G.LINE_LOOP):V.setMode(G.LINE_STRIP)}else ne.isPoints?V.setMode(G.POINTS):ne.isSprite&&V.setMode(G.TRIANGLES);if(ne.isBatchedMesh)if(Me.get("WEBGL_multi_draw"))V.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{let j=ne._multiDrawStarts,me=ne._multiDrawCounts,Ae=ne._multiDrawCount,Te=Ce?Xe.get(Ce).bytesPerElement:1,Re=_e.get(se).currentProgram.getUniforms();for(let Oe=0;Oe<Ae;Oe++)Re.setValue(G,"_gl_DrawID",Oe),V.render(j[Oe]/Te,me[Oe])}else if(ne.isInstancedMesh)V.renderInstances(Be,Pt,ne.count);else if(ee.isInstancedBufferGeometry){let j=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,me=Math.min(ee.instanceCount,j);V.renderInstances(Be,Pt,me)}else V.render(Be,Pt)},this.compile=function(A,H,ee=null){ee===null&&(ee=A),F!==null&&F.renderStart(A,H,ee),M=$t.get(ee),M.init(H),N.push(M),ee.traverseVisible(function(ne){ne.isLight&&ne.layers.test(H.layers)&&(M.pushLight(ne),ne.castShadow&&M.pushShadow(ne))}),A!==ee&&A.traverseVisible(function(ne){ne.isLight&&ne.layers.test(H.layers)&&(M.pushLight(ne),ne.castShadow&&M.pushShadow(ne))}),M.setupLights(),F!==null&&F.updateLights(M.state.lightsArray),R=this.localClippingEnabled,D=St.init(this.clippingPlanes,R),D===!0&&St.setGlobalState(this.clippingPlanes,H),F!==null&&wt.render(M.state.shadowsArray,ee,H);let se=new Set;return A.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;let ve=ne.material;if(ve)if(Array.isArray(ve))for(let Ee=0;Ee<ve.length;Ee++){let be=ve[Ee];qe(be,ee,H,ne),se.add(be)}else qe(ve,ee,H,ne),se.add(ve)}),M=N.pop(),F!==null&&F.renderEnd(),se},this.compileAsync=function(A,H,ee=null){let se=this.compile(A,H,ee);return new Promise(ne=>{function ve(){se.forEach(function(Ee){let be=_e.get(Ee).currentProgram;(be===void 0||be.isReady())&&se.delete(Ee)}),se.size!==0?setTimeout(ve,10):ne(A)}Me.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let Ot=null;function Ft(){Wn.stop()}function ii(){Wn.start()}let Wn=new Af;function Dn(A,H,ee,se){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)ee=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLightProbeGrid)M.pushLightProbeGrid(A);else if(A.isLight)M.pushLight(A),A.castShadow&&M.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(z)){se&&J.setFromMatrixPosition(A.matrixWorld).applyMatrix4(q);let ve=Yt.update(A),Ee=A.material;Ee.visible&&S.push(A,ve,Ee,ee,J.z,null,H)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(z))){let ve=Yt.update(A),Ee=A.material;if(se&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),J.copy(A.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),J.copy(ve.boundingSphere.center)),J.applyMatrix4(A.matrixWorld).applyMatrix4(q)),Array.isArray(Ee)){let be=ve.groups;for(let Ce=0,Ve=be.length;Ce<Ve;Ce++){let lt=be[Ce],mt=Ee[lt.materialIndex];mt&&mt.visible&&S.push(A,ve,mt,ee,J.z,lt,H)}}else Ee.visible&&S.push(A,ve,Ee,ee,J.z,null,H)}}let ne=A.children;for(let ve=0,Ee=ne.length;ve<Ee;ve++)Dn(ne[ve],H,ee,se)}function Xn(A,H,ee,se){let{opaque:ne,transmissive:ve,transparent:Ee}=A;M.setupLightsView(ee),D===!0&&St.setGlobalState(L.clippingPlanes,ee),se&&de.viewport(re.copy(se)),ne.length>0&&Qn(ne,H,ee),ve.length>0&&Qn(ve,H,ee),Ee.length>0&&Qn(Ee,H,ee),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function In(A,H,ee,se){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[se.id]===void 0){let mt=Me.has("EXT_color_buffer_half_float")||Me.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[se.id]=new ni(1,1,{generateMipmaps:!0,type:mt?zi:Ri,minFilter:zr,samples:Math.max(4,He.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Tt.workingColorSpace})}let ne=M.state.transmissionRenderTarget[se.id],ve=se.viewport||re;ne.setSize(ve.z*L.transmissionResolutionScale,ve.w*L.transmissionResolutionScale);let Ee=L.getRenderTarget(),be=L.getActiveCubeFace(),Ce=L.getActiveMipmapLevel();L.setRenderTarget(ne),L.getClearColor(le),ie=L.getClearAlpha(),ie<1&&L.setClearColor(16777215,.5),L.clear(),Ue&&Nt.render(ee);let Ve=L.toneMapping;L.toneMapping=wi;let lt=se.viewport;if(se.viewport!==void 0&&(se.viewport=void 0),M.setupLightsView(se),D===!0&&St.setGlobalState(L.clippingPlanes,se),Qn(A,ee,se),oe.updateMultisampleRenderTarget(ne),oe.updateRenderTargetMipmap(ne),Me.has("WEBGL_multisampled_render_to_texture")===!1){let mt=!1;for(let Be=0,tt=H.length;Be<tt;Be++){let Pt=H[Be],{object:ze,geometry:V,material:j,group:me}=Pt;if(j.side===Fi&&ze.layers.test(se.layers)){let Ae=j.side;j.side=kn,j.needsUpdate=!0,Qt(ze,ee,se,V,j,me),j.side=Ae,j.needsUpdate=!0,mt=!0}}mt===!0&&(oe.updateMultisampleRenderTarget(ne),oe.updateRenderTargetMipmap(ne))}L.setRenderTarget(Ee,be,Ce),L.setClearColor(le,ie),lt!==void 0&&(se.viewport=lt),L.toneMapping=Ve}function Qn(A,H,ee){let se=H.isScene===!0?H.overrideMaterial:null;for(let ne=0,ve=A.length;ne<ve;ne++){let Ee=A[ne],{object:be,geometry:Ce,group:Ve}=Ee,lt=Ee.material;lt.allowOverride===!0&&se!==null&&(lt=se),be.layers.test(ee.layers)&&Qt(be,H,ee,Ce,lt,Ve)}}function Qt(A,H,ee,se,ne,ve){F!==null&&ne.isNodeMaterial&&F.setObject(A,ne),A.onBeforeRender(L,H,ee,se,ne,ve),A.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ne.onBeforeRender(L,H,ee,se,A,ve),ne.transparent===!0&&ne.side===Fi&&ne.forceSinglePass===!1?(ne.side=kn,ne.needsUpdate=!0,L.renderBufferDirect(ee,H,se,ne,A,ve),ne.side=Rs,ne.needsUpdate=!0,L.renderBufferDirect(ee,H,se,ne,A,ve),ne.side=Fi):L.renderBufferDirect(ee,H,se,ne,A,ve),A.onAfterRender(L,H,ee,se,ne,ve)}function on(A,H,ee){H.isScene!==!0&&(H=ue);let se=_e.get(A),ne=M.state.lights,ve=M.state.shadowsArray,Ee=ne.state.version,be=De.getParameters(A,ne.state,ve,H,ee,M.state.lightProbeGridArray),Ce=De.getProgramCacheKey(be),Ve=se.programs;se.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?H.environment:null,se.fog=H.fog;let lt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;se.envMap=_t.get(A.envMap||se.environment,lt),se.envMapRotation=se.environment!==null&&A.envMap===null?H.environmentRotation:A.envMapRotation,Ve===void 0&&(A.addEventListener("dispose",Xi),Ve=new Map,se.programs=Ve);let mt=Ve.get(Ce);if(mt!==void 0){if(se.currentProgram===mt&&se.lightsStateVersion===Ee)return nn(A,be),mt}else be.uniforms=De.getUniforms(A),F!==null&&A.isNodeMaterial&&F.build(A,ee,be),A.onBeforeCompile(be,L),mt=De.acquireProgram(be,Ce),Ve.set(Ce,mt),se.uniforms=be.uniforms;let Be=se.uniforms;return(A.isShaderMaterial||A.isRawShaderMaterial)&&A.clipping!==!0||(Be.clippingPlanes=St.uniform),nn(A,be),se.needsLights=(function(tt){return tt.isMeshLambertMaterial||tt.isMeshToonMaterial||tt.isMeshPhongMaterial||tt.isMeshStandardMaterial||tt.isShadowMaterial||tt.isShaderMaterial&&tt.lights===!0})(A),se.lightsStateVersion=Ee,se.needsLights&&(Be.ambientLightColor.value=ne.state.ambient,Be.lightProbe.value=ne.state.probe,Be.sunLights.value=ne.state.sun,Be.sunLightShadows.value=ne.state.sunShadow,Be.directionalLights.value=ne.state.directional,Be.directionalLightShadows.value=ne.state.directionalShadow,Be.spotLights.value=ne.state.spot,Be.spotLightShadows.value=ne.state.spotShadow,Be.rectAreaLights.value=ne.state.rectArea,Be.ltc_1.value=ne.state.rectAreaLTC1,Be.ltc_2.value=ne.state.rectAreaLTC2,Be.pointLights.value=ne.state.point,Be.pointLightShadows.value=ne.state.pointShadow,Be.hemisphereLights.value=ne.state.hemi,Be.sunShadowMatrix.value=ne.state.sunShadowMatrix,Be.sunShadowCascade.value=ne.state.sunShadowCascade,Be.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,Be.spotLightMatrix.value=ne.state.spotLightMatrix,Be.spotLightMap.value=ne.state.spotLightMap,Be.pointShadowMatrix.value=ne.state.pointShadowMatrix),se.lightProbeGrid=M.state.lightProbeGridArray.length>0,se.currentProgram=mt,se.uniformsList=null,mt}function En(A){if(A.uniformsList===null){let H=A.currentProgram.getUniforms();A.uniformsList=Ns.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function nn(A,H){let ee=_e.get(A);ee.outputColorSpace=H.outputColorSpace,ee.batching=H.batching,ee.batchingColor=H.batchingColor,ee.instancing=H.instancing,ee.instancingColor=H.instancingColor,ee.instancingMorph=H.instancingMorph,ee.skinning=H.skinning,ee.morphTargets=H.morphTargets,ee.morphNormals=H.morphNormals,ee.morphColors=H.morphColors,ee.morphTargetsCount=H.morphTargetsCount,ee.numClippingPlanes=H.numClippingPlanes,ee.numIntersection=H.numClipIntersection,ee.vertexAlphas=H.vertexAlphas,ee.vertexTangents=H.vertexTangents,ee.toneMapping=H.toneMapping}function qn(A){let H=_e.get(A);return H.__readFormat===A.format&&H.__readType===A.type||(H.__readFormat=A.format,H.__readType=A.type,H.__formatReadable=He.textureFormatReadable(A.format),H.__typeReadable=He.textureTypeReadable(A.type)),H}Wn.setAnimationLoop(function(A){Ot&&Ot(A)}),typeof self<"u"&&Wn.setContext(self),this.setAnimationLoop=function(A){Ot=A,pt.setAnimationLoop(A),A===null?Wn.stop():Wn.start()},pt.addEventListener("sessionstart",Ft),pt.addEventListener("sessionend",ii),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0)return void Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(X===!0)return;F!==null&&F.renderStart(A,H);let ee=pt.enabled===!0&&pt.isPresenting===!0,se=B!==null&&(Z===null||ee)&&B.begin(L,Z);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),pt.enabled!==!0||pt.isPresenting!==!0||B!==null&&B.isCompositing()!==!1||(pt.cameraAutoUpdate===!0&&pt.updateCamera(H),H=pt.getCamera()),A.isScene===!0&&A.onBeforeRender(L,A,H,Z),M=$t.get(A,N.length),M.init(H),M.state.textureUnits=oe.getTextureUnits(),N.push(M),q.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),z.setFromProjectionMatrix(q,eu,H.reversedDepth),R=this.localClippingEnabled,D=St.init(this.clippingPlanes,R),S=$e.get(A,C.length),S.init(),C.push(S),pt.enabled===!0&&pt.isPresenting===!0){let ve=L.xr.getDepthSensingMesh();ve!==null&&Dn(ve,H,-1/0,L.sortObjects)}Dn(A,H,0,L.sortObjects),S.finish(),F!==null&&F.updateLights(M.state.lightsArray),L.sortObjects===!0&&S.sort(w,E),Ue=pt.enabled===!1||pt.isPresenting===!1||pt.hasDepthSensing()===!1,Ue&&Nt.addToRenderList(S,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),D===!0&&St.beginShadows();let ne=M.state.shadowsArray;if(wt.render(ne,A,H),D===!0&&St.endShadows(),(se&&B.hasRenderPass())===!1){let ve=S.opaque,Ee=S.transmissive;if(M.setupLights(),H.isArrayCamera){let be=H.cameras;if(Ee.length>0)for(let Ce=0,Ve=be.length;Ce<Ve;Ce++)In(ve,Ee,A,be[Ce]);Ue&&Nt.render(A);for(let Ce=0,Ve=be.length;Ce<Ve;Ce++){let lt=be[Ce];Xn(S,A,lt,lt.viewport)}}else Ee.length>0&&In(ve,Ee,A,H),Ue&&Nt.render(A),Xn(S,A,H)}Z!==null&&k===0&&(oe.updateMultisampleRenderTarget(Z),oe.updateRenderTargetMipmap(Z)),se&&B.end(L),A.isScene===!0&&A.onAfterRender(L,A,H),cn.resetDefaultState(),he=-1,ce=null,N.pop(),N.length>0?(M=N[N.length-1],oe.setTextureUnits(M.state.textureUnits),D===!0&&St.setGlobalState(L.clippingPlanes,M.state.camera)):M=null,C.pop(),S=C.length>0?C[C.length-1]:null,F!==null&&F.renderEnd()},this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return Z},this.setRenderTargetTextures=function(A,H,ee){let se=_e.get(A);se.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,se.__autoAllocateDepthBuffer===!1&&(se.__useRenderToTexture=!1),_e.get(A.texture).__webglTexture=H,_e.get(A.depthTexture).__webglTexture=se.__autoAllocateDepthBuffer?void 0:ee,se.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,H){let ee=_e.get(A);ee.__webglFramebuffer=H,ee.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(A,H=0,ee=0){Z=A,W=H,k=ee;let se=null,ne=!1,ve=!1;if(A){let Ee=_e.get(A);if(Ee.__useDefaultFramebuffer!==void 0)return de.bindFramebuffer(G.FRAMEBUFFER,Ee.__webglFramebuffer),re.copy(A.viewport),xe.copy(A.scissor),pe=A.scissorTest,de.viewport(re),de.scissor(xe),de.setScissorTest(pe),void(he=-1);if(Ee.__webglFramebuffer===void 0)oe.setupRenderTarget(A);else if(Ee.__hasExternalTextures)oe.rebindTextures(A,_e.get(A.texture).__webglTexture,_e.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ve=A.depthTexture;if(Ee.__boundDepthTexture!==Ve){if(Ve!==null&&_e.has(Ve)&&(A.width!==Ve.image.width||A.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");oe.setupDepthRenderbuffer(A)}}let be=A.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(ve=!0);let Ce=_e.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(se=Array.isArray(Ce[H])?Ce[H][ee]:Ce[H],ne=!0):se=A.samples>0&&oe.useMultisampledRTT(A)===!1?_e.get(A).__webglMultisampledFramebuffer:Array.isArray(Ce)?Ce[ee]:Ce,re.copy(A.viewport),xe.copy(A.scissor),pe=A.scissorTest}else re.copy(P).multiplyScalar(we).floor(),xe.copy(O).multiplyScalar(we).floor(),pe=y;if(ee!==0&&(se=K),de.bindFramebuffer(G.FRAMEBUFFER,se)&&de.drawBuffers(A,se),de.viewport(re),de.scissor(xe),de.setScissorTest(pe),ne){let Ee=_e.get(A.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ee.__webglTexture,ee)}else if(ve){let Ee=H;for(let be=0;be<A.textures.length;be++){let Ce=_e.get(A.textures[be]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+be,Ce.__webglTexture,ee,Ee)}}else if(A!==null&&ee!==0){let Ee=_e.get(A.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ee.__webglTexture,ee)}he=-1},this.readRenderTargetPixels=function(A,H,ee,se,ne,ve,Ee,be=0){if(!A||!A.isWebGLRenderTarget)return void Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=_e.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ce=Ce[Ee]),Ce){de.bindFramebuffer(G.FRAMEBUFFER,Ce);try{let Ve=A.textures[be],lt=Ve.format,mt=Ve.type;A.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+be);let Be=qn(Ve);if(Be.__formatReadable===!1)return void Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(Be.__typeReadable===!1)return void Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");H>=0&&H<=A.width-se&&ee>=0&&ee<=A.height-ne&&G.readPixels(H,ee,se,ne,un.convert(lt),un.convert(mt),ve)}finally{let Ve=Z!==null?_e.get(Z).__webglFramebuffer:null;de.bindFramebuffer(G.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(A,H,ee,se,ne,ve,Ee,be=0){if(!A||!A.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=_e.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ce=Ce[Ee]),Ce){if(H>=0&&H<=A.width-se&&ee>=0&&ee<=A.height-ne){de.bindFramebuffer(G.FRAMEBUFFER,Ce);let Ve=A.textures[be],lt=Ve.format,mt=Ve.type;A.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+be);let Be=qn(Ve);if(Be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let tt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,tt),G.bufferData(G.PIXEL_PACK_BUFFER,ve.byteLength,G.STREAM_READ),G.readPixels(H,ee,se,ne,un.convert(lt),un.convert(mt),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let Pt=Z!==null?_e.get(Z).__webglFramebuffer:null;de.bindFramebuffer(G.FRAMEBUFFER,Pt);let ze=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await Yp(G,ze,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,tt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,ve),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(tt),G.deleteSync(ze),ve}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,H=null,ee=0){let se=Math.pow(2,-ee),ne=Math.floor(A.image.width*se),ve=Math.floor(A.image.height*se),Ee=H!==null?H.x:0,be=H!==null?H.y:0;oe.setTexture2D(A,0),G.copyTexSubImage2D(G.TEXTURE_2D,ee,0,0,Ee,be,ne,ve),de.unbindTexture()},this.copyTextureToTexture=function(A,H,ee=null,se=null,ne=0,ve=0){let Ee,be,Ce,Ve,lt,mt,Be,tt,Pt,ze=A.isCompressedTexture?A.mipmaps[ve]:A.image;if(ee!==null)Ee=ee.max.x-ee.min.x,be=ee.max.y-ee.min.y,Ce=ee.isBox3?ee.max.z-ee.min.z:1,Ve=ee.min.x,lt=ee.min.y,mt=ee.isBox3?ee.min.z:0;else{let Je=Math.pow(2,-ne);Ee=Math.floor(ze.width*Je),be=Math.floor(ze.height*Je),Ce=A.isDataArrayTexture?ze.depth:A.isData3DTexture?Math.floor(ze.depth*Je):1,Ve=0,lt=0,mt=0}se!==null?(Be=se.x,tt=se.y,Pt=se.z):(Be=0,tt=0,Pt=0);let V=un.convert(H.format),j=un.convert(H.type),me;H.isData3DTexture?(oe.setTexture3D(H,0),me=G.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(oe.setTexture2DArray(H,0),me=G.TEXTURE_2D_ARRAY):(oe.setTexture2D(H,0),me=G.TEXTURE_2D),de.activeTexture(G.TEXTURE0),de.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,H.flipY),de.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),de.pixelStorei(G.UNPACK_ALIGNMENT,H.unpackAlignment);let Ae=de.getParameter(G.UNPACK_ROW_LENGTH),Te=de.getParameter(G.UNPACK_IMAGE_HEIGHT),Re=de.getParameter(G.UNPACK_SKIP_PIXELS),Oe=de.getParameter(G.UNPACK_SKIP_ROWS),Bt=de.getParameter(G.UNPACK_SKIP_IMAGES);de.pixelStorei(G.UNPACK_ROW_LENGTH,ze.width),de.pixelStorei(G.UNPACK_IMAGE_HEIGHT,ze.height),de.pixelStorei(G.UNPACK_SKIP_PIXELS,Ve),de.pixelStorei(G.UNPACK_SKIP_ROWS,lt),de.pixelStorei(G.UNPACK_SKIP_IMAGES,mt);let Dt=A.isDataArrayTexture||A.isData3DTexture,zt=H.isDataArrayTexture||H.isData3DTexture;if(A.isDepthTexture){let Je=_e.get(A),vt=_e.get(H),Ke=_e.get(Je.__renderTarget),pn=_e.get(vt.__renderTarget);de.bindFramebuffer(G.READ_FRAMEBUFFER,Ke.__webglFramebuffer),de.bindFramebuffer(G.DRAW_FRAMEBUFFER,pn.__webglFramebuffer);for(let xn=0;xn<Ce;xn++)Dt&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,_e.get(A).__webglTexture,ne,mt+xn),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,_e.get(H).__webglTexture,ve,Pt+xn)),G.blitFramebuffer(Ve,lt,Ee,be,Be,tt,Ee,be,G.DEPTH_BUFFER_BIT,G.NEAREST);de.bindFramebuffer(G.READ_FRAMEBUFFER,null),de.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(ne!==0||A.isRenderTargetTexture||_e.has(A)){let Je=_e.get(A),vt=_e.get(H);de.bindFramebuffer(G.READ_FRAMEBUFFER,te),de.bindFramebuffer(G.DRAW_FRAMEBUFFER,ae);for(let Ke=0;Ke<Ce;Ke++)Dt?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Je.__webglTexture,ne,mt+Ke):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Je.__webglTexture,ne),zt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,vt.__webglTexture,ve,Pt+Ke):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,vt.__webglTexture,ve),ne!==0?G.blitFramebuffer(Ve,lt,Ee,be,Be,tt,Ee,be,G.COLOR_BUFFER_BIT,G.NEAREST):zt?G.copyTexSubImage3D(me,ve,Be,tt,Pt+Ke,Ve,lt,Ee,be):G.copyTexSubImage2D(me,ve,Be,tt,Ve,lt,Ee,be);de.bindFramebuffer(G.READ_FRAMEBUFFER,null),de.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else zt?A.isDataTexture||A.isData3DTexture?G.texSubImage3D(me,ve,Be,tt,Pt,Ee,be,Ce,V,j,ze.data):H.isCompressedArrayTexture?G.compressedTexSubImage3D(me,ve,Be,tt,Pt,Ee,be,Ce,V,ze.data):G.texSubImage3D(me,ve,Be,tt,Pt,Ee,be,Ce,V,j,ze):A.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,ve,Be,tt,Ee,be,V,j,ze.data):A.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,ve,Be,tt,ze.width,ze.height,V,ze.data):G.texSubImage2D(G.TEXTURE_2D,ve,Be,tt,Ee,be,V,j,ze);de.pixelStorei(G.UNPACK_ROW_LENGTH,Ae),de.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Te),de.pixelStorei(G.UNPACK_SKIP_PIXELS,Re),de.pixelStorei(G.UNPACK_SKIP_ROWS,Oe),de.pixelStorei(G.UNPACK_SKIP_IMAGES,Bt),ve===0&&H.generateMipmaps&&G.generateMipmap(me),de.unbindTexture()},this.initRenderTarget=function(A){_e.get(A).__webglFramebuffer===void 0&&oe.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?oe.setTextureCube(A,0):A.isData3DTexture?oe.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?oe.setTexture2DArray(A,0):oe.setTexture2D(A,0),de.unbindTexture()},this.resetState=function(){W=0,k=0,Z=null,de.reset(),cn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return eu}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Tt._getUnpackColorSpace()}};var nr={normal:1,related:.85,weak:.5,quiet:.3,away:.1},Of=3,wu=i=>i.normalize("NFD").replace(/\p{M}/gu,"").toLowerCase();function Au(i,e,t=8){let n=wu(e).split(/\s+/).filter(Boolean);return n.length?i.map(r=>{let s=wu(r.title),a=wu(`${r.title} ${r.body} ${r.extra}`);if(!n.every(c=>a.includes(c)))return null;let o=n.reduce((c,l)=>c+(s.startsWith(l)?3:s.includes(l)?2:1),0)+r.weight*.1;return{item:r,score:o}}).filter(Boolean).sort((r,s)=>s.score-r.score||r.item.order-s.item.order).slice(0,t).map(({item:r})=>r):[]}function Hl(i,e){let t=i[e],n=new Map(i.map((a,o)=>[a.id,o])),r=new Set(t.links.filter(a=>n.has(a)&&a!==t.id).map(a=>n.get(a)));i.forEach((a,o)=>o!==e&&a.links.includes(t.id)&&r.add(o));let s=new Set;for(let[a,o]of Object.entries(t.members))for(let c of o){let l=i.map((p,d)=>p.members[a]?.includes(c)?d:-1).filter(p=>p>=0),h=l.indexOf(e);for(let p of[l[h-1],l[h+1]])p!==void 0&&!r.has(p)&&s.add(p)}return{links:[...r].sort((a,o)=>a-o),near:[...s].sort((a,o)=>a-o)}}function Ru(i,e,t=Of){let n=i[e],{links:r,near:s}=Hl(i,e),a=new Set(r),o=l=>Object.entries(n.members).reduce((h,[p,d])=>h+d.filter(u=>l.members[p]?.includes(u)).length,0),c=l=>(a.has(l)?100:0)+o(i[l])*10+1/(1+Math.abs(i[l].year-n.year));return[...r,...s].sort((l,h)=>c(h)-c(l)||l-h).slice(0,t)}function Ff(i,e,t=Of){let{links:n}=Hl(i,e);return Ru(i,e,1/0).filter(r=>n.includes(r)).slice(0,t)}function Cu(i,e,t=4){return i.map((n,r)=>[n,r]).filter(([n])=>n.period===e).sort((n,r)=>r[0].weight-n[0].weight||n[0].year-r[0].year||n[1]-r[1]).slice(0,t).map(([,n])=>n)}function Bf(i,e,t=null){if(!t)return{previous:e>0?e-1:null,next:e<i.length-1?e+1:null};let n=Wl(i,t),r=n.indexOf(e);return r<0?{previous:n.findLast(s=>s<e)??null,next:n.find(s=>s>e)??null}:{previous:n[r-1]??null,next:n[r+1]??null}}function zf(i,e,t,n,r=3){let s=qi.flatMap(a=>(e[a]??[]).map((o,c)=>({facet:a,item:c,title:t[a]?.[o]??o,body:"",extra:"",count:Wl(i,{facet:a,item:c}).length}))).filter(a=>a.count>0);return Au(s.map((a,o)=>({...a,weight:Math.min(3,a.count/4),order:o})),n,r)}function Vf(i,{selected:e=-1,near:t=new Set,weak:n=new Set,filter:r=null}){return i.map((s,a)=>{let o=nr.normal;return e>=0&&(o=a===e?1:t.has(a)?nr.related:n.has(a)?nr.weak:nr.quiet),r&&!(s.members[r.facet]??[]).includes(r.item)&&(o=a===e?1:Math.min(o,nr.away)),o})}var kf=(i,e)=>i.map((t,n)=>e.has(n)?1:nr.quiet),Gf=(i,e)=>[...i].map(t=>[t,e,!0]),Wl=(i,e)=>e?i.map((t,n)=>(t.members[e.facet]??[]).includes(e.item)?n:-1).filter(t=>t>=0):[];function Hf(i,e){let t=[];return e.forEach((n,r)=>r>0&&t.push([e[r-1],n,i[e[r-1]].period!==i[n].period])),t}function Wf(i,e,t){let n=new Array(t).fill(0);for(let r of e)i[r].period>=0&&n[i[r].period]++;return n}var t1=10,n1=3,i1=8,Df=[[1,0],[-1,0],[0,1],[0,-1]],Uf=[[1,1],[-1,1],[1,-1],[-1,-1]];function Xf({x:i,y:e,r:t},{width:n,height:r},s,a=12){let o=t+t1,c=(d,u,m,f)=>{let v=u===0?i+d*m-(d<0?n:0):Math.min(Math.max(i-n/2,a),s-n-a),g=u===0?e-r/2:u>0?e+m-2:e-m+2-r;return{left:v,right:v+n,top:g,bottom:g+r,far:f}},l=(d,u,m,f)=>{let v=i+d*m-(d<0?n:0),g=e+u*m-(u<0?r:0);return{left:v,right:v+n,top:g,bottom:g+r,far:f}},h=r+4,p=Array.from({length:n1},(d,u)=>o+(u+1)*h);return[...Df.map(([d,u])=>c(d,u,o,!1)),...Uf.map(([d,u])=>l(d,u,o,!1)),...p.flatMap(d=>[...Df.map(([u,m])=>c(u,m,d,!0)),...Uf.map(([u,m])=>l(u,m,d,!0))])]}function qf(i,{free:e,clear:t,inside:n,forced:r=!1,keep:s=-1}){let a=s>=0?i.find(o=>o.slot===s):void 0;return a&&e(a)&&t(a)?a:i.find(o=>e(o)&&t(o))??i.find(e)??(r?i.find(o=>o.far===!1&&n(o))??i[0]:null)}function jf(i,{x:e,y:t,r:n}){let r=Math.min(Math.max(e,i.left),i.right),s=Math.min(Math.max(t,i.top),i.bottom),a=Math.hypot(e-r,t-s)-n*.45;return a>4?{x:r-i.left,y:s-i.top,length:a,angle:Math.atan2(t-s,e-r)}:null}var Yf=i=>Math.min(i,70)+i1;function Iu(i){let e=new Map;return i.forEach((t,n)=>{if(t.period<0)return;let r=e.get(t.period);(r===void 0||t.weight>i[r].weight||t.weight===i[r].weight&&t.year<i[r].year)&&e.set(t.period,n)}),[...e.entries()].sort((t,n)=>t[0]-n[0]).map(([,t])=>t)}function $f(i,e){let t=n=>n.visible!==!1&&n.x>=e.left&&n.x<=e.right&&n.y>=e.top&&n.y<=e.bottom;for(let n=1;n<i.length;n++){let r=i[n-1],s=i[n];if(!t(r)||t(s))continue;let a=0,o=1;for(let c=0;c<18;c++){let l=(a+o)/2;t({visible:s.visible,x:r.x+(s.x-r.x)*l,y:r.y+(s.y-r.y)*l})?a=l:o=l}return{t:(n-1+a)/(i.length-1),x:r.x+(s.x-r.x)*a,y:r.y+(s.y-r.y)*a,angle:Math.atan2(s.y-r.y,s.x-r.x)}}return null}function Zf(i,e){return[[Math.abs(i.y-e.top),"top"],[Math.abs(i.x-e.right),"right"],[Math.abs(i.y-e.bottom),"bottom"],[Math.abs(i.x-e.left),"left"]].reduce((n,r)=>r[0]<n[0]?r:n)[1]}function Jf(i,e,{width:t,height:n},r,s=8){let a=h=>Math.min(Math.max(h,r.left),Math.max(r.left,r.right-t)),o=h=>Math.min(Math.max(h,r.top),Math.max(r.top,r.bottom-n)),c=e==="left"?i.x+s:e==="right"?i.x-s-t:a(i.x-t/2),l=e==="top"?i.y+s:e==="bottom"?i.y-s-n:o(i.y-n/2);return{left:c,right:c+t,top:l,bottom:l+n}}function Kf(i,e,t=4,n=[]){let r=[...n],s=.5,a=(o,c)=>o.left<c.right+t-s&&o.right+t>c.left+s&&o.top<c.bottom+t-s&&o.bottom+t>c.top+s;for(let o of i){let c=o.side==="top"||o.side==="bottom"?"top":"left",l=c==="top"?o.box.bottom-o.box.top:o.box.right-o.box.left,h=o.side==="bottom"||o.side==="right"?-1:1,p=o.box;for(let u=0;u<4&&r.some(m=>a(p,m));u++){let m=(l+t)*h*(u+1);p=c==="top"?{...o.box,top:o.box.top+m,bottom:o.box.bottom+m}:{...o.box,left:o.box.left+m,right:o.box.right+m}}p.left>=e.left-1&&p.right<=e.right+1&&p.top>=e.top-1&&p.bottom<=e.bottom+1&&!r.some(u=>a(p,u))?(r.push(p),o.box=p,o.shown=!0):o.shown=!1}return i}function Qf(i,{width:e,height:t,pad:n=6}){let r=i.map(u=>u[0]),s=i.map(u=>u[1]),[a,o,c,l]=[Math.min(...r),Math.max(...r),Math.min(...s),Math.max(...s)],h=Math.min((e-2*n)/(o-a||1),(t-2*n)/(l-c||1)),p=(e-(o-a)*h)/2,d=(t-(l-c)*h)/2;return{scale:h,to:([u,m])=>[p+(u-a)*h,d+(l-m)*h],from:([u,m])=>[a+(u-p)/h,l-(m-d)/h]}}function em(i,[e,t],n=1.35){let r=-1,s=n;return i.forEach((a,o)=>{let c=Math.hypot(a.centre[0]-e,a.centre[1]-t)/a.radius;c<s&&([r,s]=[o,c])}),r}var r1=.75,tm=(i,e,t=520,n=!0)=>i<r1&&e>=t&&n,ir={tiers:[{keep:1,ratio:1/0},{keep:.65,ratio:1.5},{keep:.4,ratio:1}],slow:1e3/30,window:90,windows:3},nm=i=>i.length?i.reduce((e,t)=>e+t,0)/i.length:0,im=(i,e)=>e>ir.slow&&i<ir.tiers.length-1?i+1:i;function rm(i,e=5){let t=Iu(i);return t.length<=e?t:Array.from({length:e},(n,r)=>t[Math.floor(r*t.length/e)])}function sm(i,{now:e,idleSince:t,eligible:n,plan:r},{wait:s=20,hold:a=6}={}){if(!r.length)return{state:i,open:null};if(i.phase==="off")return{state:i,open:null};if(i.phase==="touring"){if(t>i.at||!n)return{state:{phase:"off",step:0,at:e},open:null,stopped:!0};if(e-i.at<a)return{state:i,open:null};let o=i.step+1;return o>=r.length?{state:{phase:"off",step:0,at:e},open:null,done:!0}:{state:{phase:"touring",step:o,at:e},open:r[o]}}return n&&e-Math.max(t,i.at)>=s?{state:{phase:"touring",step:0,at:e},open:r[0]}:{state:i,open:null}}var Xl={minDistance:6,maxDistance:640,minPitch:-1.3,maxPitch:1.3},Ln=(i,e,t)=>Math.min(t,Math.max(e,i));function am({target:i,distance:e,yaw:t,pitch:n}){let r=Math.cos(n);return[i[0]+e*r*Math.sin(t),i[1]+e*Math.sin(n),i[2]+e*r*Math.cos(t)]}var Pu=(i,e)=>Ln(i*Math.exp(e),Xl.minDistance,Xl.maxDistance),om=({yaw:i,pitch:e},t,n)=>({yaw:i+t,pitch:Ln(e+n,Xl.minPitch,Xl.maxPitch)});function lm({target:i,distance:e,yaw:t,pitch:n},r,s,a,o){let c=2*e*Math.tan(o/2)/a,l=[Math.cos(t),0,-Math.sin(t)],h=[-Math.sin(n)*Math.sin(t),Math.cos(n),-Math.sin(n)*Math.cos(t)];return i.map((p,d)=>p-l[d]*r*c+h[d]*s*c)}var qr=(i,e,t,n)=>Number.isFinite(i)?i+(e-i)*(1-Math.exp(-n*Math.max(0,t))):e,s1=(i,e)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i));function cm(i,e,t,n){return{target:i.target.map((r,s)=>qr(r,e.target[s],t,n)),distance:Math.exp(qr(Math.log(i.distance),Math.log(e.distance),t,n)),yaw:qr(i.yaw,s1(i.yaw,e.yaw),t,n),pitch:qr(i.pitch,e.pitch,t,n)}}var ql=[0,2,4,7,9],Lu=[{root:0,pad:[0,7,14,16]},{root:-7,pad:[0,7,9,16]},{root:-3,pad:[4,9,14,19]},{root:-5,pad:[2,9,14,21]},{root:2,pad:[2,5,9,12]}],Ye={tuning:432,base:432*2**(-7/12),octaves:2,from:1980,to:2030,master:.7,soften:2200,floor:30,fade:9,chordFrom:24,chordTo:38,detune:4,padCut:760,padSwing:220,padLevel:.0052,shimmerLevel:7e-4,subLevel:.007,airLevel:.012,airCut:520,room:1,reverb:5,reach:.03,bed:{pad:[.35,.8],shimmer:[.1,1],air:[.2,.9],sub:[1,0]},note:[.8,1],hover:[.15,1],swell:[.3,1],travel:[.15,1],tick:432,tickGap:1.4,tickPeak:.01,noteGap:.3,swellPeak:.022,travelPeak:.015,arrival:.4,voices:4,crowd:.5,fadeIn:3.5,fadeOut:.7,suspendAfter:4e3,interval:2e3,horizon:4},jl=-19,a1=-43,Da=i=>Ye.tuning*2**(i/12),Us=i=>Math.min(1,Math.max(0,i));function hm(i){let e=ql.length*Ye.octaves,t=Math.min(e-1,Math.floor(Us((i-Ye.from)/(Ye.to-Ye.from))*e)),n=ql[t%ql.length]+12*Math.floor(t/ql.length);return Ye.base*2**(n/12)}var um=i=>({1:3,2:4.5,3:6})[i]??3,dm=i=>.024+.007*Math.min(3,Math.max(1,i)),pm=i=>Da(i==="clone"?jl:jl-7),fm=i=>1/(1+Ye.crowd*i),Nu=(i,e,t=Ye.tickGap)=>i-e>=t;function mm(i){let{root:e,pad:t}=Lu[i%Lu.length];return{sub:Da(a1+(e%12+12)%12),pad:t.map(n=>Da(jl+n)),shimmer:t.slice(2).map(n=>Da(jl+n+12))}}function gm(i,e){let t=Lu.map((n,r)=>r).filter(n=>n!==i);return t[Math.min(t.length-1,Math.floor(Us(e)*t.length))]}var _m=i=>Ye.chordFrom+Us(i)*(Ye.chordTo-Ye.chordFrom);function vm(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,e|1);return t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function xm(i,e){let t=vm(e),n=new Float32Array(i),r=0,s=0;for(let a=0;a<i;a++)r=(r+.04*(t()*2-1))/1.04,n[a]=r,s=Math.max(s,Math.abs(r));for(let a=0;a<i;a++)n[a]/=s;return n}function ym(i,e=1){let t=Math.floor(i*Ye.reverb*1.1);return[0,1].map(n=>{let r=vm(e+n*7919),s=new Float32Array(t),a=0;for(let o=0;o<t;o++){let c=o/i,l=Us((c-Ye.reach)/.05),h=Math.exp(-6.9078*c/Ye.reverb),p=Us((t-o)/(i*.4)),d=3200*(600/3200)**Us(c/Ye.reverb);a+=(1-Math.exp(-2*Math.PI*d/i))*(r()*2-1-a),s[o]=a*l*h*p}return s})}var o1=[[1,1,1],[2,.22,.5],[3,.08,.3],[4.07,.03,.2]],l1=[[1,1,1],[1.5,.25,1.2]],c1=[[1,1,1]];function h1(i,e=Math.random){let t=i.sampleRate,n={at:i.currentTime+.05,chord:0,lastNote:-1/0,lastTick:-1/0,period:-1,year:0,voices:[]},r=(ce=0)=>{let re=i.createGain();return re.gain.value=ce,re},s=(ce,re,xe=.5)=>{let pe=i.createBiquadFilter();return pe.type=ce,pe.frequency.value=re,pe.Q.value=xe,pe},a=(ce,re,xe=0)=>{let pe=i.createOscillator();return pe.type=ce,pe.frequency.value=re,pe.detune.value=xe,pe},o=ce=>{let re=i.createBuffer(ce.length,ce[0].length,t);return ce.forEach((xe,pe)=>re.getChannelData(pe).set(xe)),re},c=(ce,re,xe)=>{let pe=a("sine",ce),le=r(re);pe.connect(le),le.connect(xe),pe.start()},l=r(0),h=s("highpass",Ye.floor,.7),p=s("lowpass",Ye.soften,.5),d=r(1);d.connect(p),p.connect(h),h.connect(l),l.connect(i.destination);let u=i.createConvolver();u.buffer=o(ym(t));let m=r(Ye.room);u.connect(m),m.connect(d);let f=([ce,re])=>{let xe=r(ce),pe=r(re);return xe.connect(d),pe.connect(u),[xe,pe]},v=(ce,re)=>re.forEach(xe=>ce.connect(xe)),g=f(Ye.bed.pad),_=f(Ye.bed.shimmer),b=f(Ye.bed.air),T=f(Ye.bed.sub),S=f(Ye.note),M=f(Ye.hover),C=f(Ye.swell),N=f(Ye.travel),B=s("lowpass",Ye.padCut,.3),L=r(1);B.connect(L),v(L,g),c(.031,Ye.padSwing,B.frequency);let X=r(.6);v(X,_),c(.057,.4,X.gain);let F=o([xm(t*6,11)]),K=i.createBufferSource(),te=s("bandpass",Ye.airCut,.6),ae=r(Ye.airLevel);K.buffer=F,K.loop=!0,K.connect(te),te.connect(ae),v(ae,b),c(.043,Ye.airLevel*.6,ae.gain),K.start();let W=ce=>()=>ce.forEach(re=>re.disconnect()),k=(ce,re,xe)=>{let{sub:pe,pad:le,shimmer:ie}=mm(ce),fe=re+xe+Ye.fade,Se=(w,E,P)=>{let O=r(0);O.gain.setValueAtTime(0,re),O.gain.linearRampToValueAtTime(E,re+Ye.fade),O.gain.setValueAtTime(E,fe-Ye.fade),O.gain.linearRampToValueAtTime(0,fe),w.connect(O),O.connect(P),w.start(re),w.stop(fe+.1),w.onended=W([w,O])};le.forEach(w=>[-Ye.detune,Ye.detune].forEach(E=>Se(a("triangle",w,E),Ye.padLevel,B))),ie.forEach(w=>Se(a("sine",w),Ye.shimmerLevel,X));let we=r(1);v(we,T),Se(a("sine",pe),Ye.subLevel,we)},Z=(ce,{peak:re,attack:xe,length:pe,partials:le,outputs:ie,when:fe})=>{let Se=Math.max(fe,i.currentTime),we=pe/4.6,w=xe*3,E=r(1);v(E,ie),n.voices=n.voices.filter(D=>D.end>Se),n.voices.length>=Ye.voices&&n.voices.shift().duck.gain.setTargetAtTime(0,Se,.15);let P=re*fm(n.voices.length),O=Se,y=null,z=[E];for(let[D,R,q]of le){let $=a("sine",ce*D),J=r(0);J.gain.setValueAtTime(0,Se),J.gain.setTargetAtTime(P*R,Se,xe),J.gain.setTargetAtTime(0,Se+w,we*q),$.connect(J),J.connect(E),$.start(Se);let ue=Se+w+we*q*8;$.stop(ue),ue>=O&&(O=ue,y=$),z.push($,J)}y.onended=W(z),n.voices.push({end:O,duck:E})},he=(ce,re)=>{let xe=Math.max(re,i.currentTime),[pe,le]=ce>=0?[220,680]:[680,220],ie=i.createBufferSource(),fe=s("bandpass",pe,1.2),Se=r(0);ie.buffer=F,ie.loop=!0,fe.frequency.setValueAtTime(pe,xe),fe.frequency.exponentialRampToValueAtTime(le,xe+3.2),Se.gain.setValueAtTime(0,xe),Se.gain.setTargetAtTime(Ye.travelPeak,xe,.5),Se.gain.setTargetAtTime(0,xe+1.5,.6),ie.connect(fe),fe.connect(Se),v(Se,N),ie.start(xe,e()*2),ie.stop(xe+6.5),ie.onended=W([ie,fe,Se])};return{master:l,run(ce=Ye.horizon){for(;n.at<i.currentTime+ce;){let re=_m(e());k(n.chord,n.at,re),n.at+=re,n.chord=gm(n.chord,e())}},fade(ce){let re=i.currentTime;l.gain.cancelScheduledValues(re),l.gain.setTargetAtTime(ce?Ye.master:0,re,ce?Ye.fadeIn:Ye.fadeOut)},memory({year:ce,weight:re,period:xe=-1},pe=i.currentTime){if(!Nu(pe,n.lastNote,Ye.noteGap))return;n.lastNote=pe;let le=xe>=0&&n.period>=0&&xe!==n.period;le&&he(ce>=n.year?1:-1,pe),n.period=xe,n.year=ce,Z(hm(ce),{peak:dm(re),attack:.02,length:um(re),partials:o1,outputs:S,when:pe+(le?Ye.arrival:0)})},swell(ce,re=i.currentTime){Z(pm(ce),{peak:Ye.swellPeak,attack:.9,length:6,partials:l1,outputs:C,when:re})},tick(ce=i.currentTime){Nu(ce,n.lastTick)&&(n.lastTick=ce,Z(Ye.tick,{peak:Ye.tickPeak,attack:.15,length:1.4,partials:c1,outputs:M,when:ce}))},travel(ce,re=i.currentTime){he(ce,re)}}}function Sm(){let i=globalThis.AudioContext??globalThis.webkitAudioContext,e={context:null,graph:null,on:!0,timer:0,stopTimer:0};if(!i)return{supported:!1,toggle:()=>!1,start:()=>!1,running:()=>!1,isOn:()=>!1,memory(){},swell(){},tick(){},travel(){},pause(){},close(){}};let t=()=>e.on&&e.graph,n=()=>{e.context||(e.context=new i,e.graph=h1(e.context));let{context:r,graph:s}=e;clearTimeout(e.stopTimer),clearInterval(e.timer),s.fade(!0),r.resume?.(),s.run(),e.timer=setInterval(()=>s.run(),Ye.interval)};return{supported:!0,isOn:()=>e.on,running:()=>e.context?.state==="running",start(){return e.on&&!document.hidden&&n(),e.on},toggle(){return!e.context&&e.on?(e.on=!1,!1):(e.on=!e.on,e.on?n():(clearTimeout(e.stopTimer),clearInterval(e.timer),e.graph.fade(!1),e.stopTimer=setTimeout(()=>!e.on&&e.context.suspend?.(),Ye.suspendAfter)),e.on)},memory(r){t()&&e.graph.memory(r)},swell(r){t()&&e.graph.swell(r)},tick(){t()&&e.graph.tick()},travel(r){t()&&e.graph.travel(r)},pause(r){!e.context||!e.on||(r?e.context.suspend?.():e.context.resume?.())},close(){clearTimeout(e.stopTimer),clearInterval(e.timer),e.on=!0,e.context?.close?.(),e.context=null,e.graph=null}}}var Hi={order:.6,jitter:.08,flight:.3,arrive:.54,swirl:2.6,burst:.17,glow:.07},Fs={sky:1.4,seed:.9,wait:6,delay:.3,seconds:4,dolly:6,from:1.6,card:.85,first:.9},Mm={sky:.5,delay:0,seconds:1.4,card:0},Zl={strength:.12,night:["#ecd2b0","#b8cdea","#b8cdea","#ecd2b0"],paper:["#8a5a2b","#2f5f99","#2f5f99","#8a5a2b"]},Yl={spin:.07,breath:.05,pace:.5,still:.92},$l={radius:.2,push:.04,rate:6},Os={pull:.1,glow:.3,grow:.12,inRate:2.2,outRate:1.2};var Du=i=>i>=1?1/0:Math.min(1,Math.max(0,(i-Hi.arrive*Hi.flight)/Hi.order)),bm=`
  #define DISCOVER_ORDER ${Hi.order.toFixed(2)}
  #define DISCOVER_JITTER ${Hi.jitter.toFixed(2)}
  #define DISCOVER_FLIGHT ${Hi.flight.toFixed(2)}
  #define DISCOVER_SWIRL ${Hi.swirl.toFixed(2)}
  #define DISCOVER_ARRIVE ${Hi.arrive.toFixed(2)}
  #define DISCOVER_BURST ${Hi.burst.toFixed(2)}
  #define DISCOVER_GLOW ${Hi.glow.toFixed(2)}
  #define SPIN_SLOTS ${xi.slots}
  #define CLOUD_SPIN ${Yl.spin.toFixed(3)}
  #define CLOUD_BREATH ${Yl.breath.toFixed(3)}
  #define CLOUD_PACE ${Yl.pace.toFixed(2)}
  #define CLOUD_STILL ${Yl.still.toFixed(2)}
  #define ENTRANCE_FIRST ${Fs.first.toFixed(2)}
  #define POINTER_RADIUS ${$l.radius.toFixed(2)}
  #define POINTER_PUSH ${$l.push.toFixed(3)}
  #define HOVER_PULL ${Os.pull.toFixed(3)}
  #define HOVER_GLOW ${Os.glow.toFixed(2)}
  #define HOVER_GROW ${Os.grow.toFixed(2)}
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
    vAlpha = mix(0.09, 0.9, level) * mix(1.0, 0.3, aAhead) * body * uGain * haze * near * (1.0 - 0.55 * uFar * aKind);
    gl_PointSize = clamp(aSize * uScale / -mv.z * (0.8 + 0.5 * level) * (1.0 + uFar * 1.3 * aKind), 1.3, 12.0);
    vAlpha = mix(uGain * (0.2 + 0.6 * aSeed * aSeed) * near, vAlpha, m) * (1.0 - smoothstep(uReveal - 0.2, uReveal + 0.4, aU));
    gl_PointSize = mix(1.1 + 1.6 * aSeed * aSeed, gl_PointSize, m);
    vAlpha = min(1.0, vAlpha * lit * smoothstep(0.0, 0.5, pulse) * (1.0 + 1.2 * flash)) * mix(1.0, uSeedOn, isSeed);
    gl_PointSize *= 1.0 + 0.8 * flash + HOVER_GROW * hovered;
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
`,Tm=`
  uniform vec3 uInk;
  uniform vec3 uTints[4];
  uniform float uTint;
  varying float vAlpha;
  varying float vKind;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    vec3 colour = uInk;
    if (vKind > -0.5) colour = mix(uInk, uTints[int(vKind + 0.5)], uTint);
    gl_FragColor = vec4(colour, smoothstep(1.0, 0.3, d) * vAlpha);
  }
`,Em=`
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
`,wm=`
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
`,Jl=`
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
`,Kl=`
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
`;var Bs=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,jr=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},br=(i,e,t)=>i+(e-i)*t;function Am(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function Yr(i){return()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var u1={deep:.6,far:.5,haze:.5,glow:.7},d1=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,p1=`
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
`,f1=i=>1/Math.max(.2,Math.sin(i*Math.PI));function m1(i){let e=document.createElement("canvas");e.width=i,e.height=i/2;let t=e.getContext("2d");t.fillStyle="#000",t.fillRect(0,0,i,i/2),t.globalCompositeOperation="lighter";let n=Yr(7),r=(s,a)=>`rgba(${s===0?255:0},${s===1?255:0},${s===2?255:0},${a})`;for(let s of _d({random:n})){t.save(),t.translate(s.u*i,s.v*(i/2)),t.rotate(s.angle),t.scale(f1(s.v),s.squash);let a=t.createRadialGradient(0,0,0,0,0,s.radius);a.addColorStop(0,r(1,s.alpha)),a.addColorStop(.35,r(1,s.alpha*.35)),a.addColorStop(1,r(1,0)),t.fillStyle=a,t.beginPath(),t.arc(0,0,s.radius,0,Math.PI*2),t.fill(),t.restore()}return e}function g1(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.4,"rgba(255,255,255,0.35)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),new vr(i)}function Rm({scene:i,sky:e,mobile:t,ink:n,star:r}){let s=Bs(),a={...u1},o=new vr(m1(2048));o.minFilter=o.magFilter=Gn,o.generateMipmaps=!1,o.wrapS=bl;let c={uMap:{value:o},uInk:n,uOffset:{value:new I},uTime:{value:0},uFar:{value:0},uHaze:{value:0},uHazeMax:{value:On.haze.alpha}},l=new _n({uniforms:c,vertexShader:d1,fragmentShader:p1,transparent:!0,side:kn,depthTest:!1,depthWrite:!1}),h=new Vn(new Es(1500,48,24),l);h.frustumCulled=!1,h.renderOrder=-3,i.add(h);let p=[0,1,2].map(C=>e.list.reduce((N,B)=>N+B.centre[C],0)/e.list.length),d=Math.max(...e.list.map(C=>Math.hypot(...C.centre.map((N,B)=>N-p[B]))+C.radius*2)),u=gd({count:t?On.deep.mobile:On.deep.count,random:Yr(7),centre:p,inner:Math.min(On.deep.radius/3,Math.max(d*1.15,On.deep.inner/4))}),m=new yt;m.setAttribute("position",new Ct(u.position,3)),m.setAttribute("aSeed",new Ct(u.seed,1)),m.setAttribute("aBright",new Ct(u.bright,1)),m.setAttribute("aHalo",new Ct(new Float32Array(u.count),1)),m.setAttribute("aSize",new Ct(u.size,1));let f={uTime:r.uTime,uPixel:r.uPixel,uInk:n,uGain:{value:0},uHalo:{value:0}},v=new _n({uniforms:f,vertexShader:Jl,fragmentShader:Kl,transparent:!0,depthTest:!1,depthWrite:!1}),g=new Oi(m,v);g.frustumCulled=!1,g.renderOrder=-2,i.add(g);let _=Math.max(1,...e.list.map(C=>C.count)),b=g1(),T=e.list.map(C=>{let{scale:N,strength:B}=vd(C,_),L=new oa(new ys({map:b,color:16777215,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0}));return L.position.set(...C.centre),L.scale.set(N,N,1),L.renderOrder=-2,i.add(L),{sprite:L,strength:B,scale:N,galaxy:C,reveal:0}}),S={night:!0,quiet:!1,dim:1,formed:1/0,sky:1,boost:1},M=()=>{f.uGain.value=a.deep*S.sky*S.boost*(S.night?1.25:.4),g.visible=a.deep>.001,c.uFar.value=a.far*S.sky,c.uHaze.value=S.quiet?0:a.haze*S.sky,h.visible=c.uFar.value+c.uHaze.value>.001,T.forEach(({sprite:C,strength:N,scale:B,galaxy:L})=>{let X=jr(L.start,L.end,S.formed);C.scale.set(B*(.55+.45*X),B*(.55+.45*X),1),C.material.opacity=N*a.glow*S.dim*X*(S.night?1:.5),C.visible=C.material.opacity>.002,C.material.color.copy(n.value)})};return{applyTheme:C=>{S.night=C,l.blending=C?tr:mi,l.needsUpdate=!0,v.blending=C?tr:mi,v.needsUpdate=!0,T.forEach(({sprite:N})=>{N.material.blending=C?tr:mi,N.material.needsUpdate=!0}),M()},setTier:C=>{S.quiet=C>=2,M()},setDim:C=>{S.dim=C,M()},update:(C,N,B,L=1,X=1)=>{(B!==S.formed||L!==S.sky||X!==S.boost)&&(S.formed=B,S.sky=L,S.boost=X,M()),h.position.copy(N.position),c.uOffset.value.copy(N.position).multiplyScalar(4e-4),c.uTime.value=s?0:C*.01}}}var Uu=-.27,zu=.35,Ou=[0,0,-7],Tr=18,Cm=40,_1=6,v1=.5,Fu=4.2,Bu=900,x1=.9,Ql=10,Ua={rate:.11,yaw:.14,pitch:.02,rest:2.5};function Im({canvas:i,cloud:e,marks:t,future:n,today:r,mobile:s,sky:a,kinds:o=[]}){let c=new Vl({canvas:i,antialias:!1,powerPreference:"high-performance"});c.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2));let l=new ia,h=new zn(36,innerWidth/innerHeight,.1,4e3),p=r+fc[1]+.4,d=new Float32Array(e.count*3);for(let V=0;V<d.length;V++)d[V]=e.position[V]-e.center[V];let u=new yt,m=(V,j)=>new Ct(V,j).setUsage(Ul);u.setAttribute("position",new Ct(d,3)),u.setAttribute("aFrom",new Ct(e.from,3)),u.setAttribute("aCenter",new Ct(e.center,3)),Object.entries({u:"aU",order:"aOrder",seed:"aSeed",size:"aSize",ahead:"aAhead",kind:"aKind",memory:"aMemory",galaxy:"aGalaxy"}).forEach(([V,j])=>u.setAttribute(j,new Ct(e[V],1))),["threads","people","places"].forEach((V,j)=>u.setAttribute(`aFacet${j}`,new Ct(e.facet[V],1)));let v=new Float32Array(Math.max(1,t.length)).fill(1),g=new Float32Array(v),_=new Nr(v,v.length,1,Ia,gi);_.minFilter=_.magFilter=Ai,_.needsUpdate=!0;let b=new Float32Array(v.length).fill(-1);o.forEach((V,j)=>b[j]=gc.indexOf(V));let T=new Nr(b,b.length,1,Ia,gi);T.minFilter=T.magFilter=Ai,T.needsUpdate=!0;let S=gc.map(()=>new at),M=()=>(Ge.night?Zl.night:Zl.paper).forEach((V,j)=>S[j].set(V)),C={value:new at},N=md({count:s?4e3:void 0,random:Yr(2026)}),B=new yt;B.setAttribute("position",new Ct(N.position,3)),B.setAttribute("aSeed",new Ct(N.seed,1)),B.setAttribute("aBright",new Ct(N.bright,1)),B.setAttribute("aHalo",new Ct(N.halo,1)),B.setAttribute("aSize",new Ct(N.size,1));let L=1.25,X={uTime:{value:0},uPixel:{value:1},uGain:{value:.6},uHalo:{value:1},uInk:C},F=new _n({uniforms:X,vertexShader:Jl,fragmentShader:Kl,transparent:!0,depthTest:!1,depthWrite:!1}),K=new Oi(B,F);K.frustumCulled=!1,K.renderOrder=-1,l.add(K);let te=Rm({scene:l,sky:a,mobile:s,ink:C,star:X}),ae=t.reduce((V,j,me)=>j.year<t[V].year?me:V,0),W=Math.min(1,Math.sqrt(6e4/e.count)),k={uMix:{value:0},uTime:{value:0},uScale:{value:1},uFar:{value:1},uGain:{value:1},uFocusU:{value:0},uFocusW:{value:7},uFocusOn:{value:0},uFilterFacet:{value:-1},uFilterItem:{value:-1},uAway:{value:.12},uReveal:{value:1e4},uLevelCount:{value:v.length},uLevels:{value:_},uKinds:{value:T},uTints:{value:S},uTint:{value:Zl.strength},uSpin:{value:new Float32Array(xi.slots)},uPivot:{value:Array.from({length:xi.slots},(V,j)=>new I(...a.list[j]?.centre??[0,0,0]))},uKeep:{value:1},uSeed:{value:ae},uSeedOn:{value:0},uKick:{value:0},uPointer:{value:new I(0,0,0)},uHover:{value:new ge(-1,0)},uInk:C},Z=new _n({uniforms:k,vertexShader:bm,fragmentShader:Tm,transparent:!0,depthTest:!1,depthWrite:!1}),he=new Oi(u,Z);he.frustumCulled=!1,l.add(he);let ce=[...t.map(V=>V.position),n.today,n.today,n.book,n.clone],re=new Float32Array(xi.slots),xe=(V,j)=>{j.set(...ce[V]);let me=V<t.length?t[V].period:-1;if(me>=0&&me<xi.slots&&re[me]){let Ae=a.list[me].centre,[Te,Re]=[j.x-Ae[0],j.y-Ae[1]];j.x=Ae[0]+Math.cos(re[me])*Te-Math.sin(re[me])*Re,j.y=Ae[1]+Math.sin(re[me])*Te+Math.cos(re[me])*Re}return j},pe=[{size:1.3,state:1,order:.96},{size:2.4,state:3,order:.96},{size:2.4,state:2,order:.98},{size:2.4,state:2,order:1},{size:8,state:4,order:0},{size:8,state:4,order:0}],le=4,ie=5,fe=m(new Float32Array(pe.length*3),3),Se=m(Float32Array.from(pe.map(V=>V.size)),1),we=m(new Float32Array(pe.length).fill(1),1),w=new yt;w.setAttribute("position",fe),w.setAttribute("aSize",Se),w.setAttribute("aFade",we),w.setAttribute("aFirst",new Ct(Float32Array.from(pe.map((V,j)=>j===ae?1:0)),1)),w.setAttribute("aState",new Ct(Float32Array.from(pe.map(V=>V.state)),1)),w.setAttribute("aOrder",new Ct(Float32Array.from(pe.map(V=>V.order)),1));let E={uScale:{value:1},uTime:{value:0},uReveal:{value:0},uSeedOn:{value:0},uInk:C},P=new _n({uniforms:E,vertexShader:Em,fragmentShader:wm,transparent:!0,depthTest:!1,depthWrite:!1}),O=new Oi(w,P);O.frustumCulled=!1,l.add(O);let y=[],z=(V,j=!1)=>{let me=j?new Ma({transparent:!0,dashSize:.8,gapSize:.9,depthTest:!1}):new Dr({transparent:!0,depthTest:!1});return y.push({material:me,opacity:V}),me},D=V=>new yt().setAttribute("position",new je(V,3)),R=(()=>{let V=document.createElement("canvas");V.width=V.height=32;let j=V.getContext("2d"),me=j.createRadialGradient(16,16,0,16,16,16);return me.addColorStop(0,"rgba(255,255,255,1)"),me.addColorStop(.5,"rgba(255,255,255,1)"),me.addColorStop(.75,"rgba(255,255,255,0.3)"),me.addColorStop(1,"rgba(255,255,255,0)"),j.fillStyle=me,j.fillRect(0,0,32,32),new vr(V)})(),q=1.6,$=1.5,J=new I,ue=new Float32Array(3*1024),Ue=V=>{let j=new Float32Array(Bu*3),me=new Ct(j,3).setUsage(Ul),Ae=new yt().setAttribute("position",me);Ae.setDrawRange(0,0);let Te=new Ss({map:R,size:3,sizeAttenuation:!1,transparent:!0,depthTest:!1,depthWrite:!1});V&&y.push({material:Te,opacity:V});let Re=new Oi(Ae,Te);return Re.frustumCulled=!1,Re.userData.lay=(Oe,Bt=!1)=>{let Dt=Oe.length/3,zt=Math.min(1023,Bt?Dt+1:Dt);for(let Ke=0;Ke<zt;Ke++){let pn=Ke%Dt*3;J.set(Oe[pn],Oe[pn+1],Oe[pn+2]).project(h),ue[Ke*3]=(J.x*.5+.5)*innerWidth,ue[Ke*3+1]=(-J.y*.5+.5)*innerHeight,ue[Ke*3+2]=J.z>-1&&J.z<1?1:0}let Je=0,vt=0;for(let Ke=0;Ke<zt-1&&vt<Bu;Ke++){let[pn,xn,ci,hi,Ci,rr]=[ue[Ke*3],ue[Ke*3+1],ue[Ke*3+2],ue[Ke*3+3],ue[Ke*3+4],ue[Ke*3+5]];if(!ci||!rr){Je=0;continue}let ke=Math.hypot(hi-pn,Ci-xn);if(ke<1e-6)continue;let qt=120,jt=(en,yn)=>(en<-qt?1:en>innerWidth+qt?2:0)|(yn<-qt?4:yn>innerHeight+qt?8:0);if(jt(pn,xn)&jt(hi,Ci)){Je=((Je-ke)%Ql+Ql)%Ql;continue}let wn=Ke%Dt*3,ei=(Ke+1)%Dt*3;for(;Je<=ke&&vt<Bu;){let en=Je/ke;for(let yn=0;yn<3;yn++)j[vt*3+yn]=Oe[wn+yn]+(Oe[ei+yn]-Oe[wn+yn])*en;vt++,Je+=Ql}Je-=ke}Ae.setDrawRange(0,vt),me.needsUpdate=!0,Te.size=q*(Re.userData.outer?$:1)*c.getPixelRatio()},Re},Ne=[],Me=new Ki,He=(V,j,me=1980)=>(V.frustumCulled=!1,V.userData.opacity=j,V.userData.year=me,Me.add(V),V),de=[];(()=>{let V=Oe=>Oe.members.threads?.[0]??0,j=new Map,me=a.list.map(()=>({open:[],shadow:[]}));t.forEach(Oe=>{let Bt=`${Oe.period}:${V(Oe)}`;j.has(Bt)&&me[Oe.period].open.push(...j.get(Bt),...Oe.position),j.set(Bt,Oe.position)}),me.forEach((Oe,Bt)=>{let Dt=a.list[Bt].centre;for(let[zt,Je]of[["open",.34],["shadow",.13]]){if(!Oe[zt].length)continue;let vt=He(new Ur(D(Oe[zt].map((Ke,pn)=>Ke-Dt[pn%3])),z(Je)),Je,a.list[Bt].end);vt.position.set(...Dt),vt.userData.constellation=!0,de.push({lines:vt,k:Bt})}});let Ae=(Oe,Bt)=>{let Dt=[],zt=Math.max(8,Math.ceil((Bt-Oe)/1.5));for(let Je=0;Je<=zt;Je++)Dt.push(...Jr(a,Oe+(Bt-Oe)*Je/zt));return Dt};a.list.forEach((Oe,Bt)=>{let Dt=[];for(let vt=0;vt<120;vt++){let Ke=Math.PI*2*vt/120,[pn,xn]=lr(Oe,Math.sin(Ke)*(Oe.radius+1.6),Math.cos(Ke)*(Oe.radius+1.6));Dt.push(Oe.centre[0]+pn,Oe.centre[1]+xn,Oe.centre[2])}let zt=He(Ue(.8),.8,Oe.start);zt.userData.dots=!0,zt.userData.outer=!0,Ne.push({points:zt,vertices:Dt,closed:!0});let Je=a.list[Bt+1];if(Je){let vt=He(Ue(.7),.7,Je.start);vt.userData.dots=!0,Ne.push({points:vt,vertices:Ae(Oe.along+Oe.radius+1.6,Je.along-Je.radius-1.6),closed:!1})}});let Te=a.list.at(-1),Re=He(Ue(.7),.7,r);Re.userData.dots=!0,Ne.push({points:Re,vertices:Ae(Te.along+Te.radius+1.6,a.length),closed:!1})})(),l.add(Me);let oe=Array.from({length:8},()=>{let V=Ue(0);return V.visible=!1,l.add(V),V}),_t=new Float32Array(288),Xe={list:[],centre:[0,0,0],want:0,fade:0,galaxy:{}},Lt=V=>{let j=new Float32Array(Cm*Tr*6),me=m(j,3),Ae=new Ur(new yt().setAttribute("position",me),z(V));return Ae.frustumCulled=!1,Ae.geometry.setDrawRange(0,0),l.add(Ae),{lines:Ae,attribute:me,positions:j,indices:[],fade:0,opacity:V}},Yt=Lt(.7),De=Lt(.3),Et=Lt(1),$e=160,$t=new Float32Array($e*Tr*6),St=m($t,3),wt=new Ur(new yt().setAttribute("position",St),z(.6));wt.frustumCulled=!1,wt.geometry.setDrawRange(0,0),l.add(wt);let Nt={pairs:[],fade:0},vn=(V,j,me,Ae,Te,Re=1)=>{for(let Oe=0;Oe<Tr;Oe++)for(let[Bt,Dt]of[[0,Oe/Tr*Re],[1,(Oe+1)/Tr*Re]]){let zt=((j*Tr+Oe)*2+Bt)*3;V[zt]=br(me.x,Ae.x,Dt),V[zt+1]=br(me.y,Ae.y,Dt),V[zt+2]=br(me.z,Ae.z,Dt)+4*Dt*(1-Dt)*Te}},tn={map:new Map},Kt=new I,un=new I,cn=new I,Xt={target:[...Ou],distance:700,yaw:0,pitch:Uu},G={target:[...Ou],distance:340,yaw:0,pitch:Uu},dn={x:0,y:0,goalX:0,goalY:0},Ge={reveal:null,follow:-1,idle:!0,hover:-1,selection:-1,preview:-1,previewFade:0,ringFade:0,portrait:innerWidth/innerHeight<1,drift:0,touched:-1e9},pt=Math.max(...[...t.map(V=>V.position),n.book,n.clone].map(V=>Math.hypot(V[0],V[1])))+12,ot=()=>Math.max(160,pt*4.3)*(Ge.portrait?1.3:1),Zt=V=>Math.min(84,V*(Ge.portrait?1.5:1)),Wi=t.length+2,Xi=V=>V<t.length?V:V+2,qe=Array.from({length:Wi},()=>({x:0,y:0,r:0,on:!1,depth:0})),Ot=new I,Ft=new I,ii=(V,j={})=>(Ft.copy(V).project(h),j.x=(Ft.x*.5+.5)*innerWidth,j.y=(-Ft.y*.5+.5)*innerHeight,j.visible=Ft.z>-1&&Ft.z<1,j),Wn=({target:V,distance:j,yaw:me,pitch:Ae,follow:Te=-1}={})=>{V&&(G.target=[...V]),j!==void 0&&(G.distance=Ln(j,6,640)),me!==void 0&&(G.yaw=me),Ae!==void 0&&(G.pitch=Ae),Ge.follow=Te},Dn=(V=Uu)=>Wn({target:Ou,distance:ot(),yaw:0,pitch:V}),Xn=new at,In=()=>{let V=getComputedStyle(document.documentElement);Xn.set(V.getPropertyValue("--bg").trim()),C.value.set(V.getPropertyValue("--fg").trim()),y.forEach(({material:me})=>me.color.copy(C.value));let j=Xn.getHSL({}).l<.5;c.setClearColor(Xn,1),Z.blending=F.blending=j?tr:mi,L=j?1.25:.4,X.uHalo.value=j?1:0,F.needsUpdate=!0,te.applyTheme(j),Ge.night=j,M(),P.blending=mi,k.uGain.value=(j?.55:.6)*W,Z.needsUpdate=!0};In();let Qn=()=>{Ge.portrait=innerWidth/innerHeight<1,h.aspect=innerWidth/innerHeight,c.setSize(innerWidth,innerHeight,!1)};Qn();let Qt=new Map,on={index:-1,mix:0},En={x:0,y:0,on:!1,fine:matchMedia("(pointer: fine)").matches&&!Bs(),strength:0},nn={moved:!1,pinch:0,button:0},qn={hover:()=>{},click:()=>{},frame:()=>{},touch:()=>{},error:V=>console.error(V)},A=!0,H=(V,j)=>{let me=-1,Ae=1;return qe.forEach((Te,Re)=>{if(!Te.on)return;let Oe=Math.max(26,Te.r*.9),Bt=Math.hypot(Te.x-V,Te.y-j)/Oe;Bt<Ae&&([me,Ae]=[Re,Bt])}),me},ee=()=>{Ge.idle=!1,Ge.touched=performance.now()/1e3,qn.touch()},se=(V,j)=>{G.target=lm(G,V,j,innerHeight,h.fov*Math.PI/180),Ge.follow=-1};i.addEventListener("pointerdown",V=>{if(!(V.pointerType==="mouse"&&V.button>2)){if(i.setPointerCapture(V.pointerId),Qt.set(V.pointerId,{x:V.clientX,y:V.clientY,startX:V.clientX,startY:V.clientY}),Qt.size===1&&Object.assign(nn,{moved:!1,button:V.button,pinch:0,shift:V.shiftKey}),Qt.size===2){let[j,me]=[...Qt.values()];nn.pinch=Math.hypot(j.x-me.x,j.y-me.y),nn.moved=!0}ee()}}),i.addEventListener("pointermove",V=>{let j=Qt.get(V.pointerId);if(!j){V.pointerType==="mouse"&&qn.hover(H(V.clientX,V.clientY),V);return}let me=V.clientX-j.x,Ae=V.clientY-j.y;if(Math.hypot(V.clientX-j.startX,V.clientY-j.startY)>_1&&(nn.moved=!0),[j.x,j.y]=[V.clientX,V.clientY],Qt.size===2){let[Te,Re]=[...Qt.values()],Oe=Math.hypot(Te.x-Re.x,Te.y-Re.y);nn.pinch>0&&Oe>0&&(G.distance=Pu(G.distance,Math.log(nn.pinch/Oe))),nn.pinch=Oe,se(me/2,Ae/2);return}nn.moved&&(nn.button===2||nn.button===1||nn.shift?se(me,Ae):Object.assign(G,om(G,-me*.005,Ae*.004)))});let ne=V=>{let j=Qt.get(V.pointerId);Qt.delete(V.pointerId),j&&!nn.moved&&Qt.size===0&&V.type==="pointerup"&&nn.button===0&&qn.click(H(V.clientX,V.clientY),V)};i.addEventListener("pointerup",ne),i.addEventListener("pointercancel",ne),i.addEventListener("pointerleave",()=>{En.on=!1,qn.hover(-1)}),i.addEventListener("pointermove",V=>{V.pointerType==="mouse"&&(En.on=En.fine,En.x=V.clientX/innerWidth*2-1,En.y=-(V.clientY/innerHeight)*2+1)}),i.addEventListener("contextmenu",V=>V.preventDefault()),i.addEventListener("wheel",V=>{V.preventDefault();let j=V.deltaY*(V.deltaMode===1?40:V.deltaMode===2?innerHeight:1);G.distance=Pu(G.distance,Ln(j*(V.ctrlKey?.012:.0016),-.5,.5)),ee()},{passive:!1});let ve=new Ea,Ee=new I,be=new I,Ce=Fs,Ve=null,lt=null,mt=!1,Be=!1,tt=null,Pt=!0,ze=V=>{if(!A)return;ve.update(V);let j=Math.min(Math.max(ve.getDelta(),0),.25);if(document.hidden){requestAnimationFrame(ze);return}let me=ve.getElapsed();lt??(lt=me);let Ae=Ln(ot()*Ce.from,6,640);mt&&Ve===null&&(Ve=me,tt=Be?null:{from:Ae});let Te=Ve===null?0:me-Ve,Re=Math.min(1,Math.max(0,(Te-Ce.delay)/Ce.seconds)),Oe=jr(0,Ce.sky,me-lt);Ge.follow>=0&&(xe(Ge.follow,be),G.target=be.toArray());let Bt=cm(Xt,G,j,Fu);if(Object.assign(Xt,Bt),Ve===null)Xt.distance=Ae;else if(tt){let Pe=Math.min(1,Te/Ce.dolly);Pe>=1||!Ge.idle?tt=null:Xt.distance=Math.exp(br(Math.log(tt.from),Math.log(G.distance),1-(1-Pe)**3))}dn.x+=(dn.goalX-dn.x)*(1-Math.exp(-Fu*j)),dn.y+=(dn.goalY-dn.y)*(1-Math.exp(-Fu*j)),Ge.drift+=((Qt.size===0&&performance.now()/1e3-Ge.touched>Ua.rest?1:0)-Ge.drift)*(1-Math.exp(-j*.6));let[Dt,zt,Je]=am({...Xt,yaw:Xt.yaw+Math.sin(me*Ua.rate)*Ua.yaw*Ge.drift,pitch:Xt.pitch+Math.sin(me*Ua.rate*.75+1)*Ua.pitch*Ge.drift});h.position.set(Dt,zt,Je),h.fov=Zt(36),h.updateProjectionMatrix(),h.lookAt(Xt.target[0],Xt.target[1],Xt.target[2]),h.setViewOffset(innerWidth,innerHeight,-dn.x,-dn.y,innerWidth,innerHeight),h.updateMatrixWorld();let vt=innerHeight/(2*Math.tan(h.fov*Math.PI/360)),Ke=jr(.35,.75,Xt.distance/ot()),pn=Math.max(0,Te-Ce.delay-Ce.seconds-.5);a.list.forEach((Pe,Rt)=>{Rt>=xi.slots||(re[Rt]=bd(Pe,pn),k.uSpin.value[Rt]=re[Rt])}),de.forEach(({lines:Pe,k:Rt})=>Pe.rotation.z=re[Rt]??0);let xn=re[0].toFixed(3);i.dataset.spin!==xn&&(i.dataset.spin=xn),En.strength=qr(En.strength,En.on?1:0,j,$l.rate),k.uPointer.value.set(En.x,En.y,En.strength);let ci=Ge.hover>=0&&Ge.hover<t.length;ci&&on.index!==Ge.hover&&(on.mix*=.4,on.index=Ge.hover),on.mix=qr(on.mix,ci?1:0,j,ci?Os.inRate:Os.outRate),k.uHover.value.set(on.index,on.mix);let hi=En.strength.toFixed(2);i.dataset.pointer!==hi&&(i.dataset.pointer=hi);let Ci=Ve===null?jr(Ce.seed,Ce.seed+1.6,me-lt):1,rr=Te>0?Math.min(1,Te/.45*Math.exp(1-Te/.45)):0;k.uSeedOn.value=E.uSeedOn.value=Ci,k.uKick.value=rr,k.uMix.value=Re;let ke=od(a,Du(Re));k.uTime.value=E.uTime.value=X.uTime.value=me,X.uPixel.value=c.getPixelRatio(),k.uFar.value=Ke,k.uScale.value=E.uScale.value=c.domElement.height/(2*Math.tan(h.fov*Math.PI/360)),E.uReveal.value=Math.min(1,Du(Re)),Pt=!1;for(let Pe=0;Pe<v.length;Pe++){let Rt=g[Pe]-v[Pe];Math.abs(Rt)>.002?(v[Pe]+=Rt*(1-Math.exp(-7*j)),Pt=!0):v[Pe]=g[Pe]}Pt&&(_.needsUpdate=!0);let qt=(Pe,Rt)=>{xe(t.length+Pe,Ot),fe.setXYZ(Pe,Ot.x,Ot.y,Ot.z),we.setX(Pe,Rt)},jt=Pe=>k.uReveal.value>=Kr(Pe)?1:0;qt(0,jt(r)),qt(1,jt(r)),qt(2,jt(p)),qt(3,jt(p)),Ge.selection>=0&&(xe(Ge.selection,Ot),fe.setXYZ(le,Ot.x,Ot.y,Ot.z),Se.setX(le,2.2*t[Ge.selection].spread+2)),Ge.ringFade+=((Ge.selection>=0?1:0)-Ge.ringFade)*(1-Math.exp(-6*j)),we.setX(le,Ge.ringFade),Ge.preview>=0&&(xe(Ge.preview,cn),fe.setXYZ(ie,cn.x,cn.y,cn.z),Se.setX(ie,2.2*t[Ge.preview].spread+2)),Ge.previewFade+=((Ge.preview>=0?1:0)-Ge.previewFade)*(1-Math.exp(-9*j)),we.setX(ie,Ge.previewFade),fe.needsUpdate=Se.needsUpdate=we.needsUpdate=!0;let wn=`${Xt.yaw.toFixed(2)},${Xt.pitch.toFixed(2)},${Xt.distance.toFixed(0)}`;i.dataset.view!==wn&&(i.dataset.view=wn);let en=Math.abs(Math.log(Xt.distance/G.distance))<.004&&Math.abs(Math.sin(Xt.yaw-G.yaw))<.003&&Math.abs(Xt.pitch-G.pitch)<.003&&Xt.target.every((Pe,Rt)=>Math.abs(Pe-G.target[Rt])<.03)&&Math.abs(dn.x-dn.goalX)<.5&&Math.abs(dn.y-dn.goalY)<.5?"1":"";i.dataset.rest!==en&&(i.dataset.rest=en);let yn=Ge.selection>=0?`${Ot.x.toFixed(2)},${Ot.y.toFixed(2)},${Ot.z.toFixed(2)}`:"";i.dataset.ring!==yn&&(i.dataset.ring=yn);let At=Ge.preview>=0?String(Ge.preview):"";i.dataset.preview!==At&&(i.dataset.preview=At);let hn=jr(.25,.9,Re),sr=Math.min(ke,Ge.reveal??1/0);Me.visible=hn>.01,Me.children.forEach(Pe=>Pe.material.opacity=Pe.userData.opacity*hn*(Pe.userData.constellation?1-Ke:1)*(Pe.userData.dots?Pe.userData.outer?.4+.25*(1-Ke):.75+.1*(1-Ke):1)*Math.min(1,Math.max(0,(sr-Pe.userData.year)/2))),Et.indices=Ge.preview>=0&&Ge.selection>=0&&Ge.preview!==Ge.selection?[Ge.preview]:[];for(let Pe of[Yt,De,Et]){let Rt=Pe.indices.length?1:0;Pe.fade+=(Rt-Pe.fade)*(1-Math.exp(-5*j));let Pn=Math.min(Pe.indices.length,Cm);Pn&&(xe(Ge.selection,be),Pe.indices.slice(0,Pn).forEach((ti,ui)=>{xe(ti,Ee),vn(Pe.positions,ui,be,Ee,be.distanceTo(Ee)*.22,tn.map.get(ti)??1)}),Pe.attribute.needsUpdate=!0),Pe.lines.geometry.setDrawRange(0,Pn*Tr*2),Pe.lines.material.opacity=Pe.opacity*Pe.fade,Pe.lines.visible=Pe.fade>.01}Xe.fade+=(Xe.want-Xe.fade)*(1-Math.exp(-5*j)),q=1.15+.1*(1-Ke),$=1+.3*(1-Ke),Ne.forEach(({points:Pe,vertices:Rt,closed:Pn})=>Pe.userData.lay(Rt,Pn)),oe.forEach((Pe,Rt)=>{let Pn=Xe.list[Rt],ti=!!Pn&&Xe.fade>.01;if(Pe.visible=ti,!!ti){for(let ui=0;ui<96;ui++){let Fa=Math.PI*2*ui/96,[zs,Ba]=lr(Xe.galaxy,Math.sin(Fa)*Pn.radius,Math.cos(Fa)*Pn.radius);_t[ui*3]=Xe.centre[0]+zs,_t[ui*3+1]=Xe.centre[1]+Ba,_t[ui*3+2]=Xe.centre[2]}Pe.userData.lay(_t,!0),Pe.material.color.copy(C.value),Pe.material.opacity=.3*(1-.35*(Rt/Math.max(1,Xe.list.length-1)))*Xe.fade*hn}});let ln=Xe.want&&Xe.fade>.5?String(Xe.list.length):"";i.dataset.rings!==ln&&(i.dataset.rings=ln);let fn=hn;Nt.fade+=((Nt.pairs.length?1:0)-Nt.fade)*(1-Math.exp(-5*j));let Ut=Math.min(Nt.pairs.length,$e);Ut&&fn>.01&&(Nt.pairs.slice(0,Ut).forEach(([Pe,Rt,Pn],ti)=>{xe(Pe,be),xe(Rt,Ee),vn($t,ti,be,Ee,be.distanceTo(Ee)*(Pn?.3:.12))}),St.needsUpdate=!0),wt.geometry.setDrawRange(0,Ut*Tr*2),wt.material.opacity=.6*Nt.fade*fn,wt.visible=wt.material.opacity>.01,i.dataset.jumps=wt.visible?String(Ut):"";let An=1+x1*(1-Ke);X.uGain.value=L*Oe*An,te.update(me,h,ke,Oe,An),c.render(l,h),qe.forEach((Pe,Rt)=>{xe(Xi(Rt),Ot),Ft.copy(Ot).project(h),Pe.x=(Ft.x*.5+.5)*innerWidth,Pe.y=(-Ft.y*.5+.5)*innerHeight,Pe.depth=h.position.distanceTo(Ot),Pe.r=(t[Rt]?.spread??v1)*2.4*vt/Pe.depth,Pe.on=Ft.z>-1&&Ft.z<1&&Pe.x>0&&Pe.x<innerWidth&&Pe.y>0&&Pe.y<innerHeight});try{qn.frame({time:me,dt:j,intro:Re,formed:ke,far:Ke,cssScale:vt,projected:qe,camera:h,entered:Re>=Ce.card,seen:Ve===null&&me-lt>Ce.seed+1.2,seedIndex:ae})}catch(Pe){A=!1,qn.error(Pe);return}A&&requestAnimationFrame(ze)};return{camera:h,view:Xt,goal:G,inset:dn,state:Ge,projected:qe,on:(V,j)=>qn[V]=j,stop:()=>A=!1,setQuality:V=>{let j=ir.tiers[Math.min(V,ir.tiers.length-1)];k.uKeep.value=j.keep,te.setTier(V),c.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2,j.ratio)),c.setSize(innerWidth,innerHeight,!1)},start:()=>requestAnimationFrame(ze),begin:(V="full")=>{mt=!0,Be=V!=="full",V==="direct"&&(Ce={...Fs,...Mm})},home:Dn,homeDistance:ot,fly:Wn,pick:H,centerOf:V=>xe(V,new I),project:ii,resize:Qn,applyTheme:In,setLevels:V=>V.forEach((j,me)=>g[me]=j),setFilter:V=>{k.uFilterFacet.value=V?["threads","people","places"].indexOf(V.facet):-1,k.uFilterItem.value=V?V.item:-1,te.setDim(V?.45:1)},setFocus:V=>{k.uFocusOn.value=V===null?0:1,V!==null&&(k.uFocusU.value=Kr(V))},setSelection:V=>Ge.selection=V,setHover:V=>Ge.hover=V,setPreview:V=>Ge.preview=V,setJumps:V=>Nt.pairs=V,slotOf:V=>({today:t.length,book:t.length+2,clone:t.length+3})[V],setReveal:V=>{k.uReveal.value=V===null?1e4:Kr(V),Ge.reveal=V},setLinks:(V,j)=>{Yt.indices=V,De.indices=j,i.dataset.links=String(V.length+j.length)},setInset:(V,j)=>{dn.goalX=V,dn.goalY=j},setIdle:V=>Ge.idle=V,setLinkReach:V=>tn.map=V,groundAt:(V,j,me)=>{Ft.set(V/innerWidth*2-1,-(j/innerHeight)*2+1,.5).unproject(h),Ft.sub(h.position).normalize();let Ae=(me-h.position.z)/Ft.z,Te=2600,Re=Number.isFinite(Ae)&&Ae>0?Math.min(Ae,Te):Te;return[h.position.x+Ft.x*Re,h.position.y+Ft.y*Re]},arcScreen:(V,j,me,Ae={})=>(xe(V,Kt),xe(j,un),cn.set(br(Kt.x,un.x,me),br(Kt.y,un.y,me),br(Kt.z,un.z,me)+4*me*(1-me)*Kt.distanceTo(un)*.22),ii(cn,Ae)),setYearRings:(V,j,me={})=>{j.length?Object.assign(Xe,{list:j,centre:V,galaxy:me,want:1}):Xe.want=0}}}var y1="(min-height: 520px) and (min-width: 320px)",S1="(max-width: 900px), (max-aspect-ratio: 1/1)",Vu=74,M1=124,b1=24,ku=8,T1=[0,22],Pm={today:2.4,book:1.2,clone:1.2},Lm=8,Nm=20,Dm=2,E1=.6,w1=40,$r={width:104,height:100,top:118},Um="http://www.w3.org/2000/svg",Gu=matchMedia(S1),Om=.9,A1=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],R1=new Set(["hero","contact"]),C1=["1","2","3"],Nn=[],tc=()=>{for(;Nn.length;)Nn.pop()();document.documentElement.classList.remove("immersive"),document.documentElement.classList.add("flat")};function Bm(){if(!Am()||Bs())return tc();let i=matchMedia(y1);if(i.addEventListener("change",()=>location.reload()),!i.matches)return tc();I1().catch(e=>{console.error(e),tc()})}function Fm(i){let e=0,t=n=>{[...n.childNodes].forEach(r=>{if(r.nodeType===Node.TEXT_NODE){let s=document.createDocumentFragment();r.textContent.split(/(\s+)/).forEach(a=>{if(!a)return;if(/^\s+$/.test(a))return s.append(a);let o=document.createElement("span");o.className="w",o.style.setProperty("--i",e++),o.textContent=a,s.append(o)}),r.replaceWith(s)}else r.nodeType===Node.ELEMENT_NODE&&t(r)})};t(i)}var ht=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n},Hu=i=>i?i.split(","):[];async function I1(){let i=document.getElementById("scene"),e=document.querySelector(".stage"),t=document.querySelector("main.story"),n=document.querySelector(".hud"),r=document.querySelector(".rail"),s=document.querySelector(".masthead"),a=document.querySelector(".explore"),o=sd(),c=matchMedia("(max-width: 760px)").matches,l=JSON.parse(a.dataset.facets),h=JSON.parse(a.dataset.ahead),p=JSON.parse(a.dataset.periods??"[]"),d=[...t.querySelectorAll("[data-station]")].map((x,U)=>({element:x,kind:x.dataset.station,id:x.id,label:x.dataset.hud,t:U,panel:x.matches("[data-panel]")?x:x.querySelector("[data-panel]")})),u=d.length-1,m=x=>d.findIndex(U=>U.kind===x),[f,v,g,_]=["book","clone","contact","hero"].map(m),b=d.filter(x=>x.kind==="milestone"),T=b.map(({element:x})=>({id:x.dataset.milestone,date:x.dataset.date,weight:+x.dataset.weight,period:x.dataset.period,links:Hu(x.dataset.links),...Object.fromEntries(qi.map(U=>[U,Hu(x.dataset[U])]))})),S=cd(T,l,{periods:p,today:o}),M=mc(T,S.map(x=>x.year),{periods:p,today:o,threads:l.threads}),C=new Map(b.map((x,U)=>[x.t,U])),N=new Map([...t.querySelectorAll("li[data-ask]")].map(x=>[x.dataset.ask,new Set(Hu(x.dataset.memories).map(U=>b.findIndex(Q=>Q.element.dataset.milestone===U)).filter(U=>U>=0))])),B=null,L=Object.fromEntries(qi.map(x=>[x,{}]));t.querySelectorAll("ul.facets").forEach(x=>x.querySelectorAll("li").forEach(U=>L[x.dataset.facet][U.dataset.item]=U.textContent));let X=b.map(x=>({time:x.element.querySelector("time").textContent,title:x.element.querySelector("h3").textContent,body:x.element.querySelector("p:not(.kicker):not(.intro)").textContent})),F=b.map((x,U)=>({index:U,id:x.id,title:X[U].title,body:X[U].body,extra:`${X[U].time} ${qi.flatMap(Q=>(S[U].members[Q]??[]).map(Le=>L[Q][l[Q][Le]]??"")).join(" ")}`,weight:S[U].weight,order:U})),K=xd({marks:S,today:o,random:Yr(1980),facets:l,sky:M,cap:c?55e3:or.cap,trail:c?12e3:or.trail}),te=hd(M),ae=new Set(Iu(S)),W=Im({canvas:i,cloud:K,marks:S,future:te,today:o,mobile:c,sky:M,kinds:b.map(x=>x.element.dataset.kind)}),k=document.documentElement,Z=!1,he=new Set,ce=0,re=()=>{clearTimeout(ce),Z=!0,k.dataset.entering="1",ce=setTimeout(()=>xe(),2e4)},xe=()=>{Z&&(Z=!1,clearTimeout(ce),k.dataset.entering="out",ce=setTimeout(()=>delete k.dataset.entering,1600))};Nn.push(()=>{clearTimeout(ce),delete k.dataset.entering});let pe=navigator.webdriver,le=location.hash.length>1;!pe&&!le&&re(),W.home(),W.start();let ie=S.reduce((x,U,Q)=>U.year<S[x].year?Q:x,0),fe=ht("button","seed");fe.type="button",fe.setAttribute("aria-label",X[ie].title);let Se=!1,we=0,w=["pointerup","touchend","click","keydown"],E=()=>w.forEach(x=>document.removeEventListener(x,P,!0));function P(){Se||(Se=!0,clearTimeout(we),E(),W.begin(pe?"still":le?"direct":"full"),fe.dataset.gone="1",setTimeout(()=>fe.remove(),1600))}pe||le?P():(document.body.append(fe),we=setTimeout(P,Fs.wait*1e3),w.forEach(x=>document.addEventListener(x,P,!0))),Nn.push(()=>{clearTimeout(we),E(),fe.remove()});let O=new URLSearchParams(location.search).get("quality"),y=O==="low"?ir.tiers.length-1:0,z=O!=="full"&&O!=="low",D={frames:[],windows:0,from:0};W.setQuality(y),i.dataset.quality=String(y);let R=Sm(),q=ht("div","labels");e.append(q),Nn.push(()=>q.remove());let $=S.map((x,U)=>{let Q=ht("div","tag");return Q.innerHTML='<b></b><span></span><i class="leader"></i>',Q.querySelector("b").textContent=X[U].time,Q.querySelector("span").textContent=X[U].title,Q.setAttribute("aria-hidden","true"),q.append(Q),{node:Q,leader:Q.querySelector(".leader"),width:0,height:0,on:!1}}),J=Array.from({length:Dm},()=>{let x=ht("button","edge-mark");return x.type="button",x.hidden=!0,x.tabIndex=-1,x.setAttribute("aria-hidden","true"),x.innerHTML="<span></span><i></i>",q.append(x),x.addEventListener("click",()=>Ae(on(+x.dataset.memory))),{node:x,label:x.querySelector("span"),arrow:x.querySelector("i"),width:0,height:0}}),ue="",Ue=Array.from({length:Nm+1},()=>({x:0,y:0,visible:!0})),Ne=[],Me=(x,U,Q,Le,We=1980,it=0,Mt=-1)=>{let Fe=ht("div",Q,x);return Fe.setAttribute("aria-hidden","true"),q.append(Fe),Ne.push({node:Fe,world:U,base:Le,year:We,kind:Q,ring:it,spotAt:Mt,width:0,height:0,shown:-1}),Fe},He=x=>new I(...x);Me(e.dataset.today,He(te.today),"ahead now",1,o,Pm.today),Ne.at(-1).kind="ahead";let de=[];M.list.forEach((x,U)=>{let Q=t.querySelector(`#period-${p[U]} [data-station]`);if(!Q)return;let[Le,We,it]=x.centre,[Mt,Fe]=[Le+M.pole[0],We+M.pole[1]],bt=Math.hypot(Mt,Fe)||1,nt=x.radius+9,[jn,Un]=lr(x,Mt/bt*nt,Fe/bt*nt),[Yn,di]=(Q.querySelector(".kicker")?.textContent??p[U]).split(" \xB7 "),Zr=Me("",He([Le+jn,We+Un,it]),"galaxy",.9,(x.start+x.end)/2);Zr.append(ht("span","",Yn),...di?[ht("span","galaxy-years",` \xB7 ${di}`)]:[],ht("b","galaxy-count")),de[U]=Ne.at(-1),de[U].centre=He(x.centre),Zr.dataset.go=`period-${p[U]}`,Zr.addEventListener("click",_i=>{_i.stopImmediatePropagation(),Va(Zt===U?"top":Zr.dataset.go)})});let ye=Array.from({length:Lm},()=>(Me("",new I,"ring-year",.8,1980),Ne.at(-1).dim=0,Ne.at(-1))),_e=e.dataset.until?Ha(e.dataset.until):-1;_e>=0&&Me(Wa(_e,document.documentElement.lang),He(te.today.map((x,U)=>(x+te.book[U])/2)),"countdown-mark",.8,o),[["book",a.dataset.book],["clone",a.dataset.clone]].forEach(([x,U],Q)=>Me(U,He(te[x]),"ahead",.6,1/0,Pm[x],S.length+Q));let oe=ht("aside","card");oe.setAttribute("tabindex","-1");let _t=ht("div","card-body"),Xe=ht("nav","card-steps"),Lt=ht("button","step",""),Yt=ht("button","step","");Lt.type=Yt.type="button",Lt.dataset.step="previous",Yt.dataset.step="next",Xe.append(Lt,Yt);let De=new Map,Et=ht("p","visually-hidden");Et.setAttribute("role","status"),t.querySelectorAll(".waitlist").forEach(x=>{let U=ht("div","card-form");U.hidden=!0,U.dataset.for=x.dataset.list;let[Q,Le]=[x.parentNode,x.nextSibling];U.append(x),De.set(x.dataset.list,U),Nn.push(()=>Q.insertBefore(x,Le))});let $e=ht("button","card-close","\u2715");$e.type="button",$e.dataset.go="top",$e.setAttribute("aria-label",a.dataset.overview),$e.setAttribute("title",a.dataset.overview),oe.append($e,_t,...De.values(),Xe,Et),oe.id="card",e.after(oe),Nn.push(()=>oe.remove());let $t=ht("div","nudge");$t.hidden=!0;let St=ht("a",""),wt=ht("button","","\u2715");wt.type="button",$t.append(St,wt),Xe.before($t);let Nt=[...t.querySelectorAll("a, button, input, select, textarea")];Nt.forEach(x=>x.setAttribute("tabindex","-1")),Nn.push(()=>Nt.forEach(x=>x.removeAttribute("tabindex")));let vn=document.querySelector(".skip");vn&&(vn.setAttribute("href","#card"),Nn.push(()=>vn.setAttribute("href","#main")));let tn=Qf([...M.list.flatMap(x=>[[x.centre[0]-x.radius,x.centre[1]-x.radius],[x.centre[0]+x.radius,x.centre[1]+x.radius]]),te.today,te.book,te.clone].map(x=>[x[0],x[1]]),$r),Kt=ht("div","minimap");Kt.hidden=!0,Kt.setAttribute("aria-hidden","true");let un=document.createElementNS(Um,"svg");un.setAttribute("viewBox",`0 0 ${$r.width} ${$r.height}`);let cn=(x,U)=>{let Q=document.createElementNS(Um,x);return Object.entries(U).forEach(([Le,We])=>Q.setAttribute(Le,We)),un.append(Q),Q};M.list.forEach(x=>{let[U,Q]=tn.to(x.centre),Le=Array.from({length:48},(We,it)=>tn.to(lr(x,Math.sin(Math.PI*2*it/48)*x.radius,Math.cos(Math.PI*2*it/48)*x.radius).map((Mt,Fe)=>x.centre[Fe]+Mt)));cn("polygon",{points:Le.map(([We,it])=>`${We.toFixed(1)},${it.toFixed(1)}`).join(" "),class:"mini-galaxy"})});let Xt=S.map(x=>{let[U,Q]=tn.to(x.position);return cn("circle",{cx:U.toFixed(1),cy:Q.toFixed(1),r:(.6+x.weight*.35).toFixed(2),class:"mini-dot"})}),G=0;[te.book,te.clone].forEach(x=>{let[U,Q]=tn.to(x);cn("circle",{cx:U.toFixed(1),cy:Q.toFixed(1),r:2,class:"mini-future"})});let dn=cn("polygon",{class:"mini-frame"}),Ge=cn("circle",{r:3.4,class:"mini-here"});Kt.append(un),oe.after(Kt),Nn.push(()=>Kt.remove()),Kt.addEventListener("click",x=>{let U=Kt.getBoundingClientRect(),Q=tn.from([(x.clientX-U.left)*$r.width/U.width,(x.clientY-U.top)*$r.height/U.height]),Le=em(M.list,Q);Le>=0&&Va(`period-${p[Le]}`)});let pt={related:a.dataset.related,earlier:a.dataset.earlier,later:a.dataset.later,filter:a.dataset.filter,unfilter:a.dataset.unfilter,more:a.dataset.more,lit:a.dataset.lit,all:a.dataset.all,fewer:a.dataset.fewer,nudgebook:a.dataset.nudgebook,nudgeclone:a.dataset.nudgeclone,nudgeclose:a.dataset.nudgeclose,periodstart:a.dataset.periodstart},ot=0,Zt=-1,Wi=new Set,Xi=()=>Zt>=0?-1:Qt(ot),qe=null,Ot=-1,Ft={on:!1,over:0,away:0},ii={links:[],near:[]},Wn=[],Dn=!1,Xn={x:0,y:0},In={on:!1,seen:!1,from:null},Qn={opened:new Set,sawClone:!1,closed:!1},Qt=x=>C.get(x)??-1,on=x=>b[x].t,En=x=>{let U=d[x];if(U.kind==="hero")return{previous:null,next:b[0].t};if(U.kind==="milestone"){let{previous:Q,next:Le}=Bf(S,Qt(x),qe);return{previous:Q!==null?on(Q):!qe&&Qt(x)===0?0:null,next:Le!==null?on(Le):qe?null:f}}return U.kind==="book"?{previous:b.at(-1).t,next:v}:U.kind==="clone"?{previous:f,next:g}:U.kind==="contact"?{previous:v,next:null}:{previous:null,next:null}},nn=()=>{let x=Xi();ii=x>=0?Hl(S,x):{links:[],near:[]};let U=[...ii.links,...ii.near];Wn=x<0?[]:Dn?U:Ff(S,x);let Q=new Set(Wn),Le=B?N.get(B):null,We=Le?kf(S,Le):Zt>=0?S.map(nt=>nt.period===Zt?nr.normal:nr.quiet):Vf(S,{selected:x,near:Q,weak:new Set(U.filter(nt=>!Q.has(nt))),filter:qe});W.setLevels(We),e.dataset.levels=[...new Set(We)].sort((nt,jn)=>nt-jn).join(","),W.setLinks(ii.links.filter(nt=>Q.has(nt)),ii.near.filter(nt=>Q.has(nt))),W.setSelection(x);let it=Zt>=0?Zt:x>=0?S[x].period:-1,Mt=(!In.on||Zt>=0)&&it>=0?ad(M.list[it],Lm):[],Fe=it>=0?M.list[it]:null;W.setYearRings(Fe?.centre??null,Mt,Fe??{}),ye.forEach((nt,jn)=>{let Un=Mt[jn];if(nt.dim=Un?1:0,!Un)return;nt.node.textContent=String(Un.year);let[Yn,di]=lr(Fe,Un.radius*Math.sin(Om),Un.radius*Math.cos(Om));nt.world.set(Fe.centre[0]+Yn,Fe.centre[1]+di,Fe.centre[2]),nt.width=0}),W.setFocus(x>=0?S[x].year:null),W.setFilter(qe);let bt=Wl(S,qe);if(W.setJumps(Le?Gf(Le,W.slotOf("clone")):Hf(S,bt)),M){let nt=Wf(S,bt,M.list.length);de.forEach((jn,Un)=>{jn&&(jn.dim=it>=0&&it!==Un?0:qe&&!nt[Un]?.3:1,jn.node.querySelector(".galaxy-count").textContent=qe?` \xB7 ${nt[Un]}`:"",jn.width=0)})}},qn=x=>{let U=d[x];if(Zt>=0){let Q=M.list[Zt];return W.fly({target:Q.centre,distance:Ln(Q.radius*4.2+16,40,130),pitch:Ln(W.goal.pitch,-.45,.5)}),W.setIdle(!1)}if(U.kind==="milestone"){let Q=S[Qt(x)],Le=M.list[Q.period];W.fly({target:Le.centre.map((We,it)=>We+(Q.position[it]-We)*.35),distance:Ln(Le.radius*4.2+16,40,130),pitch:Ln(W.goal.pitch,-.45,.5)})}else U.kind==="book"||U.kind==="clone"?W.fly({target:te[U.kind],distance:54,pitch:Ln(W.goal.pitch,-.45,.5)}):U.kind==="contact"?W.fly({target:[0,0,-7],distance:W.homeDistance(),yaw:0,pitch:zu}):W.home();W.setIdle(U.kind==="hero")},A=x=>x.querySelectorAll("li[data-ask]").forEach(U=>{let Q=ht("button","ask-q",U.querySelector(".ask-q").textContent);Q.type="button",Q.dataset.ask=U.dataset.ask,Q.setAttribute("aria-pressed",String(B===U.dataset.ask)),U.replaceChildren(Q)}),H=x=>{if(B=x&&N.has(x)&&d[ot].kind==="clone"?x:null,e.dataset.asked=B??"",oe.querySelectorAll(".ask-q").forEach(Q=>Q.setAttribute("aria-pressed",String(Q.dataset.ask===B))),nn(),!B)return qn(ot);W.fly({target:[0,0,-7],distance:W.homeDistance(),yaw:0,pitch:zu});let U=[...N.get(B)].map(Q=>b[Q].element.querySelector("h3").textContent);Et.textContent=pt.lit.replace("{n}",()=>String(U.length)).replace("{names}",()=>U.join(", "))},ee=x=>x.querySelectorAll("ul.facets").forEach(U=>{let Q=U.dataset.facet;U.querySelectorAll("li").forEach(Le=>{let We=ht("button","chip",Le.textContent);We.type="button",We.dataset.facet=Q,We.dataset.item=Le.dataset.item,We.setAttribute("aria-pressed",String(qe?.facet===Q&&l[Q][qe.item]===Le.dataset.item)),We.setAttribute("title",pt.filter.replace("{thread}",Le.textContent)),Le.replaceChildren(We)})}),se=(x,U)=>{let Q=[...ii.links,...ii.near];if(!Q.length)return;let Le=Ru(S,U),We=Dn?Q.slice(0,ku):Le,it=ht("div","related");it.append(ht("p","kicker",pt.related));let Mt=ht("ul");if(We.forEach(Fe=>{let bt=ht("li"),nt=ht("button","peer");nt.type="button",nt.dataset.memory=String(Fe),nt.append(ht("time","",X[Fe].time),ht("span","",X[Fe].title)),bt.append(nt),Mt.append(bt)}),Mt.addEventListener("scroll",()=>ve()),it.append(Mt),Q.length>Le.length){let Fe=ht("button","expander",Dn?pt.fewer:pt.all.replace("{n}",String(Math.min(Q.length,ku))));Fe.type="button",Fe.setAttribute("aria-expanded",String(Dn)),it.append(Fe)}x.append(it)},ne=()=>{let x=_t.firstElementChild,U=Xi();!x||U<0||(x.querySelector(".related")?.remove(),se(x,U),oe.dataset.collapsed=x.querySelector(".expander")&&!Dn?"1":"",ve(),_t.querySelector(".expander")?.focus({preventScroll:!0}))},ve=()=>{let x=oe.querySelector(".related"),U=x?.querySelector("ul");if(!U)return;let Q=U.getBoundingClientRect().bottom+2,Le=[...U.children].filter(We=>We.getBoundingClientRect().bottom>Q).length;x.dataset.more=U.scrollHeight>U.clientHeight+2&&Le?pt.more.replace("{n}",String(Le)):""},Ee=-1,be=x=>{Ee!==x&&(Ee=x,W.setPreview(x))},Ce=()=>{if(delete oe.dataset.fit,!!R1.has(oe.dataset.kind)){oe.classList.add("measure");for(let x of C1){if(oe.scrollHeight<=oe.clientHeight)break;oe.dataset.fit=x}oe.classList.remove("measure")}},Ve=()=>{let x=d[ot],U=x.panel.cloneNode(!0);["data-station","data-panel","id"].forEach(Fe=>U.removeAttribute(Fe)),U.querySelectorAll("[id]").forEach(Fe=>Fe.removeAttribute("id")),[...U.children].forEach(Fe=>Fe.matches(".kicker, .period-head")||Fe.remove()),U.querySelectorAll("h1, h2, h3").forEach(Fm);let Q=ht("button","period-start",pt.periodstart.replace("{title}",()=>x.element.querySelector("h3")?.textContent??""));Q.type="button",Q.dataset.go=x.id;let Le=S.filter(Fe=>Fe.period===Zt),We=[[Le.length,a.dataset.countMemories],[new Set(Le.flatMap(Fe=>Fe.members.people??[])).size,a.dataset.countPeople],[new Set(Le.flatMap(Fe=>Fe.members.places??[])).size,a.dataset.countPlaces]].filter(([Fe,bt])=>Fe>0&&bt).map(([Fe,bt])=>bt.replace("{n}",String(Fe)));U.append(ht("p","period-facts kicker",We.join(" \xB7 ")),Q),be(-1),_t.replaceChildren(U),oe.dataset.collapsed="",oe.dataset.kind="period",De.forEach(Fe=>Fe.hidden=!0);let it=Fe=>Fe>=0&&Fe<p.length&&S.some(bt=>bt.period===Fe)?Fe:null,Mt=(Fe,bt,nt)=>{Fe.hidden=bt===null,Fe.dataset.to="",Fe.dataset.periodTo=bt??"",Fe.textContent=nt};Mt(Lt,it(Zt-1),`\u2190 ${pt.earlier}`),Mt(Yt,it(Zt+1),`${pt.later} \u2192`),Xe.hidden=Lt.hidden&&Yt.hidden,$e.hidden=!1,ze.running=!1,ze.year=null,W.setReveal(null),V()},lt=()=>{if(Zt>=0)return Ve();let x=d[ot],U=x.panel.cloneNode(!0);U.removeAttribute("data-station"),U.removeAttribute("data-panel"),U.removeAttribute("id"),U.querySelectorAll("[id]").forEach(Mt=>Mt.removeAttribute("id")),U.querySelectorAll("[tabindex]").forEach(Mt=>Mt.removeAttribute("tabindex")),U.querySelectorAll("h1, h2, h3").forEach(Fm),ee(U),A(U);let Q=Xi();Q>=0&&se(U,Q),x.kind==="milestone"&&U.querySelector(".period-head")?.remove(),be(-1),_t.replaceChildren(U),oe.dataset.collapsed=U.querySelector(".expander")&&!Dn?"1":"",oe.dataset.kind=x.kind,De.forEach((Mt,Fe)=>Mt.hidden=x.kind!==Fe);let{previous:Le,next:We}=En(ot),it=(Mt,Fe,bt)=>{Mt.hidden=Fe===null,Mt.dataset.to=Fe??"",Mt.textContent=bt};it(Lt,Le,`\u2190 ${pt.earlier}`),it(Yt,We,`${pt.later} \u2192`),Xe.hidden=x.kind==="hero"||Le===null&&We===null,$e.hidden=x.kind==="hero",Ce(),ve(),oe.classList.remove("live"),oe.offsetWidth,oe.classList.add("live"),oe.scrollTop=0,ue="",x.kind!=="hero"&&De.get(x.kind)?.scrollIntoView({block:"nearest"}),me||(Et.textContent=x.label),tt()},mt=()=>{let x=d[ot];return x.kind==="hero"?$n.start:x.kind==="milestone"?S[Qt(ot)].year:{book:$n.book,clone:$n.clone}[x.kind]??$n.end},Be=()=>{let x=d[ot],U=!Qn.closed&&Qn.opened.size>=3&&x.kind==="milestone"&&Zt<0&&!x.element.dataset.quiet;if($t.hidden=!U,!U)return;let Q=Qn.sawClone?"clone":"book";St.dataset.go=Q,St.href=`#${Q}`,St.textContent=pt[Q==="clone"?"nudgeclone":"nudgebook"],wt.setAttribute("aria-label",pt.nudgeclose),wt.setAttribute("title",pt.nudgeclose)};wt.addEventListener("click",()=>{Qn.closed=!0,Be(),oe.focus({preventScroll:!0})});let tt=()=>{let x=oe.getBoundingClientRect(),U=Math.max(Vu,a.getBoundingClientRect().bottom+6);Gu.matches?W.setInset(0,(U+Math.max(U+120,x.top))/2-innerHeight/2):W.setInset((x.right+innerWidth)/2-innerWidth/2,(U+innerHeight-M1)/2-innerHeight/2)},Pt=r?.querySelector("[data-play]"),ze={running:!1,year:null,from:0},V=()=>{if(!Pt)return;Pt.setAttribute("aria-pressed",String(ze.running));let x=ze.running?Pt.dataset.pauseLabel:Pt.dataset.playLabel;Pt.setAttribute("aria-label",x),Pt.setAttribute("title",x),Pt.querySelector(".rail-name").textContent=ze.running?Pt.dataset.pauseName:Pt.dataset.playName,r.dataset.playing=ze.year===null?"":ze.running?"1":"paused"},j=()=>{ze.year!==null&&(ze.running=!1,ze.year=null,W.setReveal(null),V())},me=!1,Ae=(x,{push:U=!0,hush:Q=!1}={})=>{me=Q,j(),ot=Ln(x,0,u),Zt=-1,Wi=new Set,e.dataset.period="",B=null,Dn=!1,e.dataset.asked="",d[ot].kind==="milestone"&&!In.seen&&(In.seen=!0,In.on=!0,In.from={...Xn},e.dataset.gentle="1");let Le=d[ot];if(document.documentElement.dataset.at=ot,n.textContent=Le.label,nn(),qn(ot),d[ot].kind==="milestone"&&!Q&&Qn.opened.add(ot),d[ot].kind==="clone"&&(Qn.sawClone=!0),lt(),Be(),r&&r.querySelector(".rail-cursor")?.style.setProperty("--x",`${es(mt()).toFixed(2)}%`),Le.kind==="milestone"?R.memory(S[Qt(ot)]):(Le.kind==="book"||Le.kind==="clone")&&R.swell(Le.kind),U)try{history.replaceState(null,"",Le.kind==="hero"?`${location.pathname}${location.search}`:`#${Le.id}`)}catch{return}},Te=(x,{push:U=!0}={})=>{let Q=S.findIndex(Le=>Le.period===x);if(!(Q<0)&&(me=!1,j(),ot=on(Q),Zt=x,Wi=new Set(Cu(S,x)),B=null,Dn=!1,e.dataset.asked="",e.dataset.period=p[x],document.documentElement.dataset.at=ot,n.textContent=d[ot].element.querySelector(".kicker")?.textContent??"",nn(),qn(ot),lt(),Be(),r?.querySelector(".rail-cursor")?.style.setProperty("--x",`${es(mt()).toFixed(2)}%`),R.memory(S[Cu(S,x,1)[0]]),U))try{history.replaceState(null,"",`#period-${p[x]}`)}catch{return}},Re=x=>{qe=x,a.querySelectorAll(".legend button").forEach(U=>{let Q=U.closest(".legend").dataset.facet;U.setAttribute("aria-pressed",String(!!qe&&qe.facet===Q&&l[Q][qe.item]===U.dataset.item))}),oe.querySelectorAll(".chip").forEach(U=>U.setAttribute("aria-pressed",String(!!qe&&qe.facet===U.dataset.facet&&l[U.dataset.facet][qe.item]===U.dataset.item))),e.dataset.filter=qe?`${qe.facet}:${l[qe.facet][qe.item]}`:"",Oe.hidden=!qe,en.dataset.active=qe?"1":"",en.setAttribute("aria-label",qe?`${yn} \xB7 ${L[qe.facet][l[qe.facet][qe.item]]??""}`:yn),qe&&(Oe.textContent=`\u2715 ${L[qe.facet][l[qe.facet][qe.item]]??""}`,Oe.setAttribute("aria-label",`${pt.unfilter}: ${L[qe.facet][l[qe.facet][qe.item]]??""}`)),nn(),d[ot].kind==="milestone"&&Zt<0&&lt()},Oe=a.querySelector("[data-unfilter]");Oe.addEventListener("click",()=>Re(null));let Bt=(x,U)=>{let Q=l[x].indexOf(U);Re(qe?.facet===x&&qe.item===Q?null:{facet:x,item:Q})};a.querySelectorAll(".legend button").forEach(x=>x.addEventListener("click",()=>Bt(x.closest(".legend").dataset.facet,x.dataset.item)));let Dt=[...a.querySelectorAll(".legend")];Dt.forEach(x=>x.hidden=!1),Nn.push(()=>Dt.forEach(x=>x.hidden=!0));let zt=a.querySelector("[data-legend-toggle]");zt?.addEventListener("click",()=>{let x=a.dataset.legend!=="open";x&&ei(!1),a.dataset.legend=x?"open":"",zt.setAttribute("aria-expanded",String(x)),tt()}),e.dataset.filter="";let Je=a.querySelector(".finder"),vt=Je.querySelector("input"),Ke=Je.querySelector(".results"),pn=Je.querySelector(".none"),xn=a.querySelector("[data-find]"),ci=Je.querySelector(".preview"),hi=x=>{ci.dataset.on=x>=0?"1":"",!(x<0)&&(ci.querySelector("time").textContent=X[x].time,ci.querySelector("strong").textContent=X[x].title,ci.querySelector("p").textContent=X[x].body.match(/^.*?[.!?](?=\s|$)/)?.[0]??X[x].body)},Ci=x=>{let U=x.target.closest?.(".peer[data-memory]"),Q=U&&Je.contains(U)?+U.dataset.memory:-1;hi(Q),be(Q)},rr=x=>{let U=ht("li"),Q=ht("button","peer");return Q.type="button",Q.dataset.memory=String(x),Q.append(ht("time","",X[x].time),ht("span","",X[x].title)),U.append(Q),U},ke=()=>Ke.replaceChildren(...[...t.querySelectorAll("section.period")].flatMap(x=>{let U=[...x.querySelectorAll("[data-station='milestone']")].map(Le=>Qt(d.findIndex(We=>We.element===Le))),Q=ht("li","group",x.querySelector(".kicker")?.textContent??"");return Q.setAttribute("aria-hidden","true"),[Q,...U.map(rr)]})),qt=x=>{Je.hidden=!x,xn.setAttribute("aria-expanded",String(x)),x?(vt.value.trim()||ke(),jt.hidden||ei(!1),vt.focus()):(hi(-1),be(-1),Je.contains(document.activeElement)&&document.activeElement.blur(),vt.value="",Ke.replaceChildren(),pn.textContent="")};xn.addEventListener("click",()=>qt(Je.hidden)),Je.addEventListener("focusin",Ci),Ke.addEventListener("pointerover",Ci),Ke.addEventListener("pointerleave",()=>{(!Je.contains(document.activeElement)||document.activeElement===vt)&&(hi(-1),be(-1))}),vt.addEventListener("input",()=>{let x=Au(F,vt.value),U=zf(S,l,L,vt.value);Ke.replaceChildren(...U.map(Q=>{let Le=ht("li"),We=ht("button","peer show");return We.type="button",We.dataset.facet=Q.facet,We.dataset.item=l[Q.facet][Q.item],We.append(ht("time","",String(Q.count)),ht("span","",pt.filter.replace("{thread}",Q.title))),Le.append(We),Le}),...x.map(Q=>rr(Q.index))),vt.value.trim()||ke(),pn.textContent=vt.value.trim()&&!x.length&&!U.length?pn.dataset.none:""}),Je.addEventListener("submit",x=>{x.preventDefault(),Ke.querySelector("button")?.click()}),Ke.addEventListener("click",x=>{let U=x.target.closest("button");if(U){if(qt(!1),U.dataset.facet){let Q=l[U.dataset.facet].indexOf(U.dataset.item);return Re(qe?.facet===U.dataset.facet&&qe.item===Q?qe:{facet:U.dataset.facet,item:Q})}Ae(on(+U.dataset.memory)),oe.focus({preventScroll:!0})}}),Je.addEventListener("keydown",x=>{if(x.key==="ArrowDown"||x.key==="ArrowUp"){let U=[...Ke.querySelectorAll("button")];if(!U.length)return;x.preventDefault();let Q=U.indexOf(document.activeElement);U[Ln(Q+(x.key==="ArrowDown"?1:-1),0,U.length-1)]?.focus(),Q===0&&x.key==="ArrowUp"&&vt.focus()}}),a.querySelector("[data-surprise]").addEventListener("click",()=>{let x=Qt(ot),U=x;for(;U===x&&S.length>1;)U=Math.floor(Math.random()*S.length);Ae(on(U))});let jt=a.querySelector(".guide"),wn=a.querySelector("[data-guide-toggle]"),ei=x=>{jt.hidden=!x,wn.setAttribute("aria-expanded",String(x)),x&&(qt(!1),a.dataset.legend="",zt?.setAttribute("aria-expanded","false"))};wn.addEventListener("click",()=>ei(jt.hidden)),xn.addEventListener("click",()=>!Je.hidden&&ei(!1));let en=a.querySelector("[data-more-toggle]"),yn=en.getAttribute("aria-label"),At=x=>{a.dataset.sheet=x?"open":"",en.setAttribute("aria-expanded",String(x))};en.addEventListener("click",()=>At(a.dataset.sheet!=="open"));let hn=a.querySelector(".sheet");hn.addEventListener("click",x=>{let U=x.target.closest("button, a");if(!U||U.matches(".lang"))return U&&At(!1);At(!1),((U.matches("[data-legend-toggle]")?a.querySelector(".legend button"):en)??en).focus()}),hn.addEventListener("focusout",x=>a.dataset.sheet==="open"&&!hn.contains(x.relatedTarget)&&x.relatedTarget!==en&&At(!1));let sr=x=>a.dataset.sheet==="open"&&!x.target.closest(".sheet, [data-more-toggle]")&&At(!1);document.addEventListener("pointerdown",sr),i.addEventListener("pointerdown",()=>ei(!1)),Nn.push(()=>document.removeEventListener("pointerdown",sr));let ln=a.querySelector("[data-sound]");if(R.supported){ln.hidden=!1,ln.setAttribute("aria-pressed","true"),ln.addEventListener("click",()=>ln.setAttribute("aria-pressed",String(R.toggle())));let x=We=>{if(R.running())return Q();We.target.closest?.("[data-sound]")||R.start()},U=["pointerup","touchend","click","keydown"],Q=()=>U.forEach(We=>document.removeEventListener(We,x,!0));U.forEach(We=>document.addEventListener(We,x,!0));let Le=()=>R.pause(document.hidden);document.addEventListener("visibilitychange",Le),Nn.push(()=>{Q(),document.removeEventListener("visibilitychange",Le),R.close(),ln.setAttribute("aria-pressed","false"),ln.hidden=!0})}let fn=ht("p","visually-hidden");fn.setAttribute("role","status"),e.append(fn);let Ut=null,An=()=>document.documentElement.dataset.focus==="1",Pe=x=>{document.documentElement.dataset.focus=x?"1":"",fn.textContent=x?a.dataset.focusNote:"",Ut=x?{...Xn}:null,x&&(ei(!1),At(!1),qt(!1))},Rt=()=>An()&&Pe(!1),Pn=()=>{In.on&&(In.on=!1,e.dataset.gentle="",nn())},ti=performance.now()/1e3,ui=()=>ti=performance.now()/1e3,Fa=x=>{Xn.x=x.clientX,Xn.y=x.clientY,Ut&&Math.hypot(Xn.x-Ut.x,Xn.y-Ut.y)>12&&Rt(),In.on&&Math.hypot(Xn.x-In.from.x,Xn.y-In.from.y)>12&&Pn(),Math.abs(x.movementX)+Math.abs(x.movementY)>6&&ui()},zs=()=>{Rt(),Pn(),ui()},Ba=[["pointermove",Fa],["pointerdown",zs],["wheel",zs],["touchstart",zs]];Ba.forEach(([x,U])=>addEventListener(x,U,{passive:!0})),Nn.push(()=>{Ba.forEach(([x,U])=>removeEventListener(x,U)),delete document.documentElement.dataset.focus});let zm=rm(S),nc={phase:"waiting",step:0,at:0};oe.addEventListener("pointerover",x=>{let U=x.target.closest(".related .peer");be(U?+U.dataset.memory:-1)}),oe.addEventListener("pointerleave",()=>be(-1)),oe.addEventListener("focusin",x=>{let U=x.target.closest(".related .peer");U&&be(+U.dataset.memory)}),oe.addEventListener("focusout",()=>be(-1)),oe.addEventListener("click",x=>{let U=x.target.closest(".chip");if(U)return Bt(U.dataset.facet,U.dataset.item);if(x.target.closest(".expander"))return Dn=!Dn,nn(),ne();let Le=x.target.closest(".ask-q");if(Le)return H(B===Le.dataset.ask?null:Le.dataset.ask);let We=x.target.closest(".peer");if(We)return Ae(on(+We.dataset.memory)),oe.focus({preventScroll:!0});let it=x.target.closest(".step");if(it&&it.dataset.periodTo)return Te(+it.dataset.periodTo),oe.focus({preventScroll:!0});if(it&&it.dataset.to!=="")return Ae(+it.dataset.to),oe.focus({preventScroll:!0});let Mt=x.target.closest("[data-go]");Mt&&Er.has(Mt.dataset.go)&&(x.preventDefault(),Va(Mt.dataset.go))});let Er=new Map(d.map(x=>[x.id,x.t])),za=new Map(p.map((x,U)=>[`period-${x}`,U]));document.querySelectorAll("section.period").forEach(x=>{let U=x.querySelector("[data-station]");Er.set(x.id,d.findIndex(Q=>Q.element===U))});let Va=x=>{if(!Er.has(x))return;if(za.has(x))return Te(za.get(x));let U=Er.get(x);Ae(U),d[U].kind!=="hero"&&De.get(d[U].kind)?.querySelector("input, a, button")?.focus()},ic=()=>{let x;try{x=decodeURIComponent(location.hash.slice(1))}catch{return}if(!x)return Ae(0,{push:!1});if(za.has(x))return Te(za.get(x),{push:!1});Er.has(x)&&Ae(Er.get(x),{push:!1})};document.querySelectorAll("[data-go]").forEach(x=>x.addEventListener("click",U=>{oe.contains(x)||!Er.has(x.dataset.go)||(U.preventDefault(),Va(x.dataset.go))})),addEventListener("hashchange",ic),Nn.push(()=>removeEventListener("hashchange",ic)),t.addEventListener("focusin",x=>{let U=d.find(Q=>Q.element.contains(x.target));U&&U.t!==ot&&Ae(U.t)});let Wu={hero:_,book:f,clone:v};De.forEach((x,U)=>x.addEventListener("focusin",()=>ot!==Wu[U]&&Ae(Wu[U])));let Xu={ArrowDown:1,ArrowRight:1,PageDown:1," ":1,ArrowUp:-1,ArrowLeft:-1,PageUp:-1},qu=x=>{if(!(x.metaKey||x.ctrlKey||x.altKey)&&(ui(),Pn(),!(An()&&x.key.toLowerCase()!=="h"&&(Pe(!1),x.key==="Escape")))){if(x.key==="Escape"){if(!jt.hidden)ei(!1),wn.focus();else if(a.dataset.sheet==="open")At(!1),en.focus();else if(!Je.hidden)qt(!1),xn.focus();else{if(x.target.closest("input, textarea, select"))return;B?H(null):qe?Re(null):ot!==0&&Ae(0)}return}if(!x.target.closest("input, textarea, select, .finder")){if(x.key==="/")return x.preventDefault(),qt(!0);if(x.key==="?")return x.preventDefault(),ei(jt.hidden);if(x.key.toLowerCase()==="h")return x.preventDefault(),x.repeat?void 0:Pe(!An());if(!(x.key===" "&&x.target.closest("button, a, summary, [role='button']"))){if(x.key==="Home")x.preventDefault(),Ae(0);else if(x.key==="End")x.preventDefault(),Ae(g);else if(x.key in Xu){x.preventDefault();let U=x.key===" "&&x.shiftKey?-1:Xu[x.key],{previous:Q,next:Le}=En(ot),We=U>0?Le:Q;We!==null&&Ae(We)}}}}};addEventListener("keydown",qu),Nn.push(()=>removeEventListener("keydown",qu)),W.on("hover",x=>{x>=0&&x!==Ot&&R.tick(),Ot=x,W.setHover(x),i.style.cursor=x>=0?"pointer":""});let Vm=x=>x===S.length?f:x===S.length+1?v:-1;W.on("click",x=>{x>=0&&Ae(x<S.length?on(x):Vm(x))});let ju=d.filter(x=>["milestone","book","clone"].includes(x.kind)),rc=d.map(x=>x.kind==="milestone"?S[Qt(x.t)].year:{hero:$n.start,book:$n.book,clone:$n.clone}[x.kind]??$n.end);if(r){let x=r.querySelector(".rail-track"),U=r.querySelector(".rail-tip");r.querySelector(".rail-today")?.style.setProperty("--x",`${es(o).toFixed(2)}%`);let Q=bt=>{let nt=x.getBoundingClientRect();return $n.start+Ln((bt.clientX-nt.left)/nt.width,0,1)*($n.end-$n.start)},Le=bt=>ju.reduce((nt,jn)=>Math.abs(rc[jn.t]-bt)<Math.abs(rc[nt.t]-bt)?jn:nt,ju[0]),We=bt=>`${bt.element.querySelector("time")?.textContent??""} \xB7 ${bt.element.querySelector("h3, h2")?.textContent??""}`.replace(/^ · /,""),it=!1,Mt=-1,Fe=bt=>{let nt=Le(Q(bt));return U.textContent=We(nt),U.style.setProperty("--x",`${es(rc[nt.t]).toFixed(2)}%`),U.dataset.on="1",nt};x.addEventListener("pointerdown",bt=>{it=!0,x.setPointerCapture(bt.pointerId);let nt=Fe(bt);Mt=nt.t,Ae(nt.t)}),x.addEventListener("pointermove",bt=>{let nt=Fe(bt);it&&nt.t!==Mt&&(Mt=nt.t,Ae(nt.t))}),x.addEventListener("pointerup",()=>it=!1),x.addEventListener("pointerleave",()=>U.dataset.on="")}Pt?.addEventListener("click",()=>{if(ze.running)return ze.running=!1,V();ze.year===null&&(ot!==0&&Ae(0),ze.year=1980),ze.running=!0,ze.from=performance.now()/1e3-Md(ze.year,o),V()});let km=()=>{let x=[oe,a,n,r].filter(Boolean).map(Q=>Q.getBoundingClientRect()),U=Je.hidden?null:Je.getBoundingClientRect();return U&&x.push(U),x},wr=(x,U)=>x.left<U.right&&x.right>U.left&&x.top<U.bottom&&x.bottom>U.top;W.on("frame",({formed:x,projected:U,camera:Q,cssScale:Le,time:We,dt:it,intro:Mt,entered:Fe,seen:bt})=>{if(fe.isConnected){let Y=U[ie];fe.style.left=`${Y.x}px`,fe.style.top=`${Y.y}px`,fe.style.visibility=Y.on?"visible":"hidden"}if(Z&&(Number.isFinite(x)&&M.list.forEach((Y,et)=>{if(he.has(et)||x<Y.start)return;he.add(et);let Gt=S.findIndex(xt=>xt.year>=Y.start-.01);Gt>=0&&R.memory({...S[Gt],period:-1})}),Fe&&xe()),z&&D.windows<ir.windows&&Mt>=1&&(D.from||(D.from=We+1),We>=D.from&&(D.frames.push(it*1e3),D.frames.length>=ir.window))){let Y=im(y,nm(D.frames));D.frames=[],D.windows++,Y!==y&&(y=Y,W.setQuality(y),i.dataset.quality=String(y))}let nt=performance.now()/1e3,jn=!document.hidden&&Je.hidden&&jt.hidden&&a.dataset.sheet!=="open"&&!qe&&ze.year===null&&!An()&&!document.activeElement?.closest?.("input, textarea, select, button, a, .finder, .card, .masthead, .rail")&&!oe.matches(":hover"),Un=sm(nc,{now:nt,idleSince:ti,eligible:jn&&(nc.phase==="touring"||ot===0),plan:zm},{wait:+a.dataset.idle||20,hold:+a.dataset.tourHold||6});nc=Un.state,Un.open!==null?Ae(on(Un.open),{push:!1,hush:!0}):Un.done&&Ae(0,{push:!1,hush:!0}),ze.running&&(ze.year=Sd(performance.now()/1e3-ze.from,o),W.setReveal(ze.year),r.querySelector(".rail-cursor")?.style.setProperty("--x",`${es(ze.year).toFixed(2)}%`),n.textContent=String(Math.floor(ze.year)),ze.year>=o&&(j(),n.textContent=d[ot].label)),Ft.over=Ot>=0?Ft.over+it:0,Ft.away=Ot>=0?0:Ft.away+it,Ft.over>.35?Ft.on=!0:Ft.away>.8&&(Ft.on=!1);let Yn=Xi(),di=W.view.distance/W.homeDistance(),Zr=new Set(Wn.slice(0,ku)),_i=km().map(Y=>({left:Y.left-12,right:Y.right+12,top:Y.top-12,bottom:Y.bottom+12}));_i.push({left:0,right:innerWidth,top:0,bottom:Math.max(Vu,(s?.getBoundingClientRect().bottom??0)+4)},{left:0,right:innerWidth,top:innerHeight-60,bottom:innerHeight});let sc=[],Gm=Gu.matches,Vs=!In.on&&tm(di,innerWidth,520,!Gm||oe.getBoundingClientRect().top>=$r.top+$r.height+8),$u=Vs?"on":"off";e.dataset.map!==$u&&(e.dataset.map=$u),Kt.hidden===Vs&&(Kt.hidden=!Vs);let vi=Vs?Kt.getBoundingClientRect():null;if(Vs&&Yn>=0){let Y=S[Yn].position[2];G++%8===0&&Xt.forEach((st,Sn)=>{let rn=W.centerOf(Sn),[ft,Mn]=tn.to([rn.x,rn.y]);st.setAttribute("cx",ft.toFixed(1)),st.setAttribute("cy",Mn.toFixed(1))}),dn.setAttribute("points",[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([st,Sn])=>tn.to(W.groundAt(st,Sn,Y)).map(rn=>rn.toFixed(1)).join(",")).join(" "));let et=W.centerOf(Yn),[Gt,xt]=tn.to([et.x,et.y]);Ge.setAttribute("cx",Gt.toFixed(1)),Ge.setAttribute("cy",xt.toFixed(1))}vi&&(_i.push({left:vi.left-8,right:vi.right+8,top:vi.top-8,bottom:vi.bottom+8}),sc.push(vi));let Zu=new Map,Ju=[],ac=[];if(Yn>=0&&ze.year===null){let Y=oe.getBoundingClientRect(),et=Gu.matches,Gt={left:et?12:Y.right+12,right:innerWidth-12,top:Math.max(Vu,a.getBoundingClientRect().bottom+6),bottom:Math.min((r?.getBoundingClientRect().top??innerHeight-100)-8,et?Y.top-8:1/0)},xt=U[Yn],st=Math.min(innerWidth,innerHeight)/2,Sn=xt&&xt.x>=Gt.left&&xt.x<=Gt.right&&xt.y>=Gt.top&&xt.y<=Gt.bottom?{left:Math.max(Gt.left,xt.x-st),right:Math.min(Gt.right,xt.x+st),top:Math.max(Gt.top,xt.y-st),bottom:Math.min(Gt.bottom,xt.y+st)}:Gt;Wn.slice(0,w1).forEach(ft=>{let Mn=Ue.map((ct,sn)=>W.arcScreen(Yn,ft,sn/Nm,ct)),It=$f(Mn,Sn);It&&Ju.push({j:ft,...It})});let rn=Ju.slice(0,Dm).map((ft,Mn)=>{let It=J[Mn],ct=`${X[ft.j].title} \xB7 ${X[ft.j].time}`;It.label.textContent!==ct&&(It.label.textContent=ct,It.width=It.height=0),It.node.hidden=!1,It.width||(It.width=It.node.offsetWidth),It.height||(It.height=It.node.offsetHeight);let sn=Zf(ft,Sn);return{mark:It,exit:ft,side:sn,box:Jf(ft,sn,It,Sn),shown:!1}});Kf(rn,Sn,4,vi?[{left:vi.left,right:vi.right,top:vi.top,bottom:vi.bottom}]:[]),J.forEach((ft,Mn)=>{let It=rn[Mn];It?.shown?ft.keep=E1:ft.keep>0&&ft.held&&(!It||It.exit.j===ft.held.exit.j)?ft.keep-=it:ft.held=null;let ct=It?.shown?It:ft.held;ft.held=ct??null,ft.node.hidden=!ct,ct&&(ft.node.style.transform=`translate3d(${ct.box.left.toFixed(1)}px, ${ct.box.top.toFixed(1)}px, 0)`,ft.node.dataset.memory=String(ct.exit.j),ft.node.dataset.side=ct.side,Zu.set(ct.exit.j,ct.exit.t),ac.push(ct.exit.j),sc.push(ct.box),ft.arrow.style.cssText=`left: ${(ct.exit.x-ct.box.left).toFixed(1)}px; top: ${(ct.exit.y-ct.box.top).toFixed(1)}px; --a: ${ct.exit.angle.toFixed(3)}rad`,_i.push({left:ct.box.left-4,right:ct.box.right+4,top:ct.box.top-4,bottom:ct.box.bottom+4}))})}else J.forEach(Y=>{Y.node.hidden=!0,Y.held=null});W.setLinkReach(Zu),e.dataset.edges=String(J.filter(Y=>!Y.node.hidden).length||"");let Ku=ac.join(",");if(Ku!==ue){ue=Ku;let Y=new Set(ac.map(String));oe.querySelectorAll(".peer[data-memory]").forEach(et=>et.dataset.out=Y.has(et.dataset.memory)?"1":"")}let Rn={x:0,y:0,visible:!1},oc={x:0,y:0,visible:!1};Ne.forEach(Y=>{let et=Y.base*(Y.year<=x?1:0);if(ze.year!==null&&Y.year>ze.year&&(et=0),et*=Y.dim??1,W.project(Y.world,Rn),!Rn.visible)et=0;else if(Y.width||(Y.width=Y.node.offsetWidth),Y.height||(Y.height=Y.node.offsetHeight),Y.kind==="ahead"){let{width:xt,height:st}=Y,Sn=Y.spotAt>=0?U[Y.spotAt].r:Y.ring*Le/Q.position.distanceTo(Y.world),rn=Yf(Sn),ft=T1.flatMap(Mn=>A1.map(([It,ct])=>{let sn=rn+Mn,mn=Rn.x+It*sn-(It<0?xt:It===0?xt/2:0),ka=Rn.y+ct*sn-(ct<0?st:ct===0?st/2:0);return{left:mn,right:mn+xt,top:ka,bottom:ka+st}})).find(Mn=>Mn.left>=12&&Mn.right<=innerWidth-12&&!_i.some(It=>wr(Mn,It)));ft?(Y.node.style.transform=`translate3d(${ft.left.toFixed(1)}px, ${ft.top.toFixed(1)}px, 0)`,Y.node.style.setProperty("--cx",Rn.x.toFixed(1)),Y.node.style.setProperty("--cy",Rn.y.toFixed(1)),Y.node.style.setProperty("--r",Math.min(Sn,70).toFixed(1)),et>.2&&_i.push({left:ft.left-4,right:ft.right+4,top:ft.top-4,bottom:ft.bottom+4})):et=0}else{if(Y.centre){W.project(Y.centre,oc);let[rn,ft]=[Rn.x-oc.x,Rn.y-oc.y],Mn=Math.hypot(rn,ft)||1,It=Math.abs(rn)/Mn*(Y.width/2)+Math.abs(ft)/Mn*(Y.height/2);Rn.x+=rn/Mn*It,Rn.y+=ft/Mn*It}Rn.x=Ln(Rn.x,Y.width/2+12,innerWidth-Y.width/2-12),Y.node.style.transform=`translate3d(${Rn.x.toFixed(1)}px, ${Rn.y.toFixed(1)}px, 0)`;let xt=Y.kind==="ring-year"||Y.kind==="countdown-mark"?1:4,st={left:Rn.x-Y.width/2-xt,right:Rn.x+Y.width/2+xt,top:Rn.y-Y.height/2-xt,bottom:Rn.y+Y.height/2+xt};(Y.kind==="ring-year"||Y.kind==="countdown-mark")&&_i.some(rn=>wr(st,rn))&&(et=0);let Sn={left:st.left+4,right:st.right-4,top:st.top+4,bottom:st.bottom-4};Y.kind==="galaxy"&&(sc.some(rn=>wr(Sn,rn))||_i.some(rn=>wr(Sn,rn)))&&(et=0),et>.2&&_i.push(st)}let Gt=Math.round(et*100)/100;Gt!==Y.shown&&(Y.shown=Gt,Y.node.style.opacity=Gt,Y.node.style.visibility=Gt>0?"visible":"hidden")});let Hm=innerWidth<=760?8:di>.8?14:b1,lc=[],Qu=[];U.forEach((Y,et)=>et<S.length&&Y.on&&Y.r>3&&Qu.push({j:et,left:Y.x-Y.r*.7,right:Y.x+Y.r*.7,top:Y.y-Y.r*.7,bottom:Y.y+Y.r*.7})),$.forEach((Y,et)=>{let Gt=U[et],xt=S[et],st=0;et===Yn?st=1e3:et===Ot?st=900:et===Ee?st=880:Zr.has(et)?st=500+xt.weight:qe&&xt.members[qe.facet]?.includes(qe.item)?st=300+xt.weight:ae.has(et)&&di>=.6&&!qe?st=40:xt.weight>=3&&di<.6?st=30:xt.weight===2&&di<.5?st=20:di<.22&&(st=10),Yn>=0&&st<500&&(st=0),Ft.on&&et!==Ot&&st===40&&(st=0),xt.year+3>x&&et!==Yn&&(st=0),!Se&&bt&&et===ie&&(st=900),Zt>=0&&(st=et===Ot?900:Wi.has(et)&&Ot<0?40:0),ze.year!==null&&(st=xt.year<=ze.year&&xt.year>ze.year-2.5?800+xt.weight:0),st>0&&Gt.on?lc.push({tag:Y,spot:Gt,priority:st,i:et}):Y.on&&(Y.on=!1,Y.node.dataset.on="")}),lc.sort((Y,et)=>et.priority-Y.priority||Y.i-et.i);let cc=[];for(let{tag:Y,spot:et,priority:Gt,i:xt}of lc){let st=Gt===40||Gt===900&&xt===Ot&&Yn<0&&Zt<0&&di>=.6?"1":"",Sn=xt===Yn||xt===Ot?"1":"";(Y.node.dataset.name!==st||Y.node.dataset.hot!==Sn)&&(Y.glide=Y.node.dataset.hot!==Sn,Y.node.dataset.cool=Y.node.dataset.hot==="1"&&!Sn?"1":"",Y.node.dataset.name=st,Y.node.dataset.hot=Sn,Y.width=Y.height=0),Y.width||(Y.width=Y.node.offsetWidth),Y.height||(Y.height=Y.node.offsetHeight);let rn=Xf(et,{width:Y.width,height:Y.height},innerWidth);if(rn.forEach((sn,mn)=>sn.slot=mn),Gt>=900){let sn=Ln(et.x-Y.width/2,12,innerWidth-Y.width-12);rn.splice(8,0,{left:sn,right:sn+Y.width,top:et.y-Y.height/2,bottom:et.y+Y.height/2,far:!1})}let ft=sn=>sn.left>=12&&sn.right<=innerWidth-12,ct=qf(rn,{free:sn=>ft(sn)&&!_i.some(mn=>wr(sn,mn))&&!cc.some(mn=>wr(sn,{left:mn.left-6,right:mn.right+6,top:mn.top-4,bottom:mn.bottom+4})),clear:sn=>!Qu.some(mn=>mn.j!==xt&&wr(sn,mn)),inside:ft,forced:Gt>=900,keep:Y.on?Y.slot:-1});if(ct&&cc.length<Hm){cc.push(ct);let sn=Y.on&&Y.slot!==void 0&&Y.slot!==ct.slot;Y.slot=ct.slot;let mn=ct.far?jf(ct,et):null;mn?(Object.assign(Y.leader.style,{left:`${mn.x.toFixed(1)}px`,top:`${mn.y.toFixed(1)}px`,width:`${mn.length.toFixed(1)}px`,transform:`rotate(${mn.angle.toFixed(3)}rad)`}),Y.node.dataset.leader="1"):Y.node.dataset.leader="",(Y.glide||sn)&&Y.on&&Y.last&&(Y.slide=[Y.last.left-ct.left,Y.last.top-ct.top]),Y.glide=!1,Y.last={left:ct.left,top:ct.top};let ka=Math.exp(-3*it);Y.slide=Y.slide?Y.slide.map(ed=>Math.abs(ed)<.3?0:ed*ka):[0,0],Y.node.style.transform=`translate3d(${(ct.left+Y.slide[0]).toFixed(1)}px, ${(ct.top+Y.slide[1]).toFixed(1)}px, 0)`,Y.node.style.setProperty("--cx",et.x.toFixed(1)),Y.node.style.setProperty("--cy",et.y.toFixed(1)),Y.on||(Y.on=!0,Y.node.dataset.on="1")}else Y.on&&(Y.on=!1,Y.node.dataset.on="")}}),new ResizeObserver(tt).observe(oe);let Yu=()=>{W.resize(),Ce(),ve(),tt(),d[ot].kind==="hero"?W.home():qn(ot)};addEventListener("resize",Yu),addEventListener("themechange",W.applyTheme),Nn.push(()=>{removeEventListener("resize",Yu),removeEventListener("themechange",W.applyTheme)}),W.on("error",x=>{console.error(x),tc()}),document.documentElement.classList.add("immersive"),document.fonts?.ready.then(()=>{$.forEach(x=>(x.width=0,x.height=0)),Ce(),ve(),tt()}),a.dataset.ready="1",Ae(0,{push:!1}),ic(),tt()}Bm();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
