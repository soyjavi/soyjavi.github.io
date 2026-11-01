(()=>{document.querySelectorAll("form.waitlist").forEach(i=>{let e=i.querySelector(".status");i.addEventListener("submit",()=>{e.textContent=i.dataset.opened})});var jc=[1.6,4.2],qd={1:1.1,2:1.6,3:2.2},s0=51,hr=["threads","people","places"],Hc=[0,1,-1,2,-2],Wc={sigma:1.6,background:.08},Rr={base:470,cap:12e4,trail:18e3},yi={inner:900,outer:1600,stars:9e3,halo:.015,band:.35,tilt:.6,thickness:.16},en={core:4,reach:3.2,gap:12,future:44,twist:2.2,swirl:.9,inner:.22,depth:4,room:3,ahead:[.3,.7],today:.06,sweep:1.9*Math.PI,growth:1.75,rise:26},ma=.25,a0=i=>/^\d{4}$/.test(i)?"year":/^\d{4}-\d{2}$/.test(i)?"month":null,Zd=(i=Date.now())=>{let e=new Date(i),t=e.getFullYear(),n=Date.UTC(t,e.getMonth(),e.getDate());return t+(n-Date.UTC(t,0,1))/(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))},xo=(i,e=Date.now())=>{let[t,n]=i.split("-").map(Number),r=new Date(e);return(t-r.getFullYear())*12+(n-1-r.getMonth())},yo=(i,e)=>!Number.isFinite(i)||i<0?"":new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(i,"month");var Ts=i=>i-1980;function o0(i){let e=new Map;i.forEach(({date:n})=>e.set(n,(e.get(n)??0)+1));let t=new Map;return i.map(({date:n})=>{let r=a0(n);if(!r)throw new Error(`date "${n}" is neither YYYY nor YYYY-MM`);let s=+n.slice(0,4),a=t.get(n)??0;t.set(n,a+1);let o=(a+.5)/e.get(n);return r==="month"?s+(+n.slice(5,7)-1+o)/12:s+o})}function l0(i,e){let t=[];return i.map((n,r)=>{let s=new Set;for(let a=r-1;a>=0&&n-i[a]<=e;a--)s.add(t[a]);return t[r]=Hc.find(a=>!s.has(a))??Hc[r%Hc.length],t[r]})}function c0(i){return i.map(e=>{let t=i.filter(n=>Math.abs(n-e)<=.6).length;return Math.min(1,1/Math.sqrt(Math.max(1,t/2)))})}var Es=i=>Math.min(1,Math.max(0,i)),h0=(i,e)=>(Math.sqrt(i.inner*i.inner+2*i.spin*e)-i.inner)/i.spin;function bs(i,e,t=0){let n=h0(i,e),r=i.inner+i.spin*n+t;return[r*Math.sin(n)-i.pole[0],r*Math.cos(n)-i.pole[1],-7+en.rise*(e/i.length-.5)]}function u0(i,e,t,n){let r=Array.from({length:t},()=>[]),s=Array.from({length:t},()=>0);i.forEach((v,g)=>{e[g]<0||(r[e[g]].push(v),s[e[g]]+=1)});let a=[];r.forEach((v,g)=>a.push(v.length?Math.min(...v):a[g-1]??1980));let o=s.map(v=>en.core+en.reach*Math.sqrt(v)),c=o.reduce((v,g)=>v+2*g,0)+en.gap*t+en.future,l=2*c/(en.sweep*(1+en.growth)),h={inner:l,spin:l*(en.growth-1)/en.sweep,length:c,pole:[0,0]},p=0,d=o.map(v=>{let g=p+v;return p+=2*v+en.gap,g}),u=[...d.map((v,g)=>[bs(h,v),o[g]]),...Array.from({length:9},(v,g)=>[bs(h,p+en.future*g/8),3])],m=[0,1].map(v=>[Math.min(...u.map(([g,_])=>g[v]-_)),Math.max(...u.map(([g,_])=>g[v]+_))]);h.pole=m.map(([v,g])=>(v+g)/2);let f=o.map((v,g)=>{let _=a.slice(g+1).find((U,z)=>r[g+1+z].length&&U>a[g]),M=Math.max(_??Math.max(n,...r[g]),a[g]+1),T=r[g].length,S=r[g].length?Math.max(...r[g])-Math.min(...r[g])+1:1,b=Es(S/12)*(1-.7*Es(s[g]/50)),I={ratio:qc.stretch?1+qc.stretch*.9*b:1,angle:(g*en.twist+T*.37)%Math.PI};return{start:a[g],end:M,count:T,radius:v,turn:g*en.twist,along:d[g],centre:bs(h,d[g]),axis:I}});return{...h,ahead:p,list:f}}var vo=(i,e)=>{let t=i.list.findIndex(n=>e<n.end);return t<0?i.list.length-1:t},So=(i,e)=>Es((e-i.start)/(i.end-i.start)),jd=[1,2,5,10,20,50,100];function Jd(i,e=8){let t=Math.ceil(i.start+1e-9),n=Math.floor(i.end+1e-9),r=a=>Array.from({length:Math.max(0,n-t+1)},(o,c)=>t+c).filter(o=>o%a===0),s=jd.find(a=>r(a).length<=e)??jd.at(-1);return r(s).map(a=>({year:a,radius:i.radius*(en.inner+(1-en.inner)*So(i,a))}))}var Yd=(i,e)=>(vo(i,e)+So(i.list[vo(i,e)],e))/i.list.length;function Kd(i,e){if(e>=1)return 1/0;let t=Math.max(0,e)*i.list.length,n=i.list[Math.min(i.list.length-1,Math.floor(t))];return n.start+(t-Math.floor(t))*(n.end-n.start)}function Qd(i,e,t,n,r=0,s=0){let a=i.arms?.[Math.max(0,e)],o=(a?a.centre:Math.PI*2/Math.max(1,t)*Math.max(0,e))+i.turn+(i.swirl??en.swirl)*n+r,c=Math.max(.4,i.radius*(en.inner+(1-en.inner)*n)+s),[l,h]=Cr(i,c*Math.sin(o),c*Math.cos(o));return[i.centre[0]+l,i.centre[1]+h,i.centre[2]+en.depth*(n-.5)]}var Xc=(i,e,t=0)=>bs(i,i.ahead+e*en.future,t);function d0(i,e,t,n,r){let s=r.map(()=>0);t.forEach((u,m)=>{let f=r.indexOf(u.threads?.[0]);n[m]===e&&f>=0&&s[f]++});let a=s.map((u,m)=>[m,u]).filter(([,u])=>u>0),o=a.reduce((u,[,m])=>u+m,0)||1,c=Math.PI*2/Math.max(1,a.length)/4,l=a.map(([,u])=>Math.max(c,Math.PI*2*u/o)),h=Math.PI*2/l.reduce((u,m)=>u+m,0),p=0;i.arms={},a.forEach(([u],m)=>{let f=l[m]*h;i.arms[u]={centre:p+f/2,width:f},p+=f});let d=i.end-i.start;i.swirl=en.swirl*(.7+.8*Es(d/14))}function Yc(i,e,{periods:t=[],today:n=1980+s0,threads:r=[]}={}){let s=i.map(c=>t.length?t.indexOf(c.period):0),a=i.find((c,l)=>s[l]<0);if(a)throw new Error(`memory ${a.id}: period "${a.period}" is not one of ${t.join(", ")}`);let o={...u0(e,s,Math.max(1,t.length),n),periodOf:s};return qc.arms&&r.length&&o.list.forEach((c,l)=>d0(c,l,i,s,r)),o}function ep(i,e={},t={}){let n=o0(i),r=c0(n),s=hr.filter(d=>e[d]?.length),a=i.map(d=>Object.fromEntries(s.map(u=>[u,(d[u]??[]).map(m=>e[u].indexOf(m)).filter(m=>m>=0)]))),o=e.threads?.length??0,c=Yc(i,n,{...t,threads:e.threads??[]}),l=[],h=new Map;i.forEach((d,u)=>{let m=`${c.periodOf[u]}:${a[u].threads?.[0]??0}`;h.set(m,[...h.get(m)??[],u])});let p=Math.PI*2/Math.max(1,o);return h.forEach(d=>{let u=c.list[c.periodOf[d[0]]],m=(u.end-u.start)/(u.radius*(1-en.inner));l0(d.map(f=>n[f]),en.room*m).forEach((f,v)=>{let g=d[v],_=So(u,n[g]),M=u.radius*(en.inner+(1-en.inner)*_),T=u.arms?.[a[g].threads?.[0]??0]?.width??p,S=Math.max(-.45*T,Math.min(.45*T,f*en.room/Math.max(M,2)));l[g]=Qd(u,a[g].threads?.[0]??0,o,_,S)})}),n.map((d,u)=>({id:i[u].id,year:d,position:l[u],spread:(qd[i[u].weight]??qd[1])*r[u],weight:i[u].weight,members:a[u],period:c.periodOf[u],links:i[u].links??[]}))}function tp(i){let[e,t]=en.ahead.map(n=>Xc(i,n));return{today:Xc(i,en.today),book:e,clone:t}}var np=(i,e)=>e.reduce((t,n)=>t+n.weight*Math.exp(-(((i-n.year)/1.6)**2)),0),ip=i=>Math.max(...i.map(e=>np(e.year,i)),1e-6);function p0(i,e,t=ip(e)){return Math.min(1,np(i,e)/t)}function f0(i,e,t,n){let r=Math.ceil((n-1980)/ma)+1,s=new Float32Array(r*Math.max(1,t)),a=Math.ceil(Wc.sigma*3/ma);for(let o of i)(o.members[e]??[]).forEach((c,l)=>{let h=(o.year-1980)/ma;for(let p=Math.max(0,Math.floor(h)-a);p<=Math.min(r-1,Math.ceil(h)+a);p++){let d=(p*ma-(o.year-1980))/Wc.sigma;s[p*t+c]+=o.weight*(l===0?1:.5)*Math.exp(-d*d)/3}});return{table:s,count:t,bins:r}}function rp({table:i,count:e,bins:t},n,r){return Math.min(1,i[Math.min(t-1,Math.max(0,Math.round((n-1980)/ma)))*e+r])}function $d(i,e,t){let n=Array.from({length:i.count},(s,a)=>Wc.background+rp(i,e,a)),r=t()*n.reduce((s,a)=>s+a,0);for(let s=0;s<i.count;s++)if((r-=n[s])<=0)return s;return i.count-1}function Mo(i,e=yi.inner,t=yi.outer){let n=i()*2-1,r=i()*Math.PI*2,s=e+(t-e)*i(),a=Math.sqrt(1-n*n)*s;return[a*Math.cos(r),a*Math.sin(r),n*s]}function sp(i){let e=i()*Math.PI*2,t=Ar(i)*yi.thickness,[n,r,s]=[Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t)];return[n,r*Math.cos(yi.tilt)-s*Math.sin(yi.tilt),r*Math.sin(yi.tilt)+s*Math.cos(yi.tilt)]}function ap({count:i=yi.stars,random:e}){let t={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i),halo:new Float32Array(i)};for(let n=0;n<i;n++){let r=e()<yi.halo,s=r?.8+.2*e():.7*e()**7,a=!r&&e()<yi.band?sp(e):Mo(e,1,1),o=yi.outer-(yi.outer-yi.inner)*s;t.position.set(a.map(c=>c*o),n*3),t.seed[n]=e(),t.bright[n]=s,t.halo[n]=r?1:0,t.size[n]=1+1.2*s}return t}var qc={stretch:.5,arms:1};function Cr(i,e,t){let n=i.axis;if(!n||n.ratio===1)return[e,t];let[r,s,a]=[Math.cos(n.angle),Math.sin(n.angle),Math.sqrt(n.ratio)],o=(e*r+t*s)*a,c=(-e*s+t*r)/a;return[o*r-c*s,o*s+c*r]}var $c=["personal","professional","product","education"],Zn={deep:{count:16e3,mobile:6e3,alpha:[.1,.8],band:.35,radius:1650,inner:400},far:{count:36,alpha:[.15,.4],radius:[5,14]},haze:{alpha:.08},glow:{max:.15,scale:2.6}},m0=([i,e,t])=>[Math.atan2(e,i)/(2*Math.PI)+.5,Math.acos(Math.max(-1,Math.min(1,t)))/Math.PI];function op({count:i=Zn.deep.count,random:e,centre:t=[0,0,0],inner:n=Zn.deep.inner,outer:r=Zn.deep.radius}){let[s,a]=Zn.deep.alpha,o={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i)};for(let c=0;c<i;c++){let l=e()<Zn.deep.band?sp(e):Mo(e,1,1),h=Math.hypot(...l),p=Math.log(r/(n*(r/n)**e()))/Math.log(r/n),d=r*(n/r)**p;o.position.set(l.map((u,m)=>t[m]+u/h*d),c*3),o.seed[c]=e(),o.bright[c]=Math.min(a,(s+(a-s)*e()**4)*(1+.6*p**3)),o.size[c]=1+1.4*p**4}return o}function lp({count:i=Zn.far.count,random:e}){let[t,n]=Zn.far.alpha,[r,s]=Zn.far.radius;return Array.from({length:i},()=>{let[a,o]=m0(Mo(e,1,1));return{u:a,v:o,radius:r+(s-r)*e(),squash:.35+.5*e(),angle:e()*Math.PI,alpha:t+(n-t)*e()}})}function cp(i,e){return{scale:i.radius*Zn.glow.scale,strength:Zn.glow.max*(.25+.75*(i.count/Math.max(1,e)))}}var Ar=i=>Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i());function g0(i,{base:e=Rr.base,cap:t=Rr.cap}={}){let n=i.reduce((r,s)=>r+s.weight**1.5,0)||1;return Math.min(e,t/n)}function hp({marks:i,sky:e,today:t,random:n,base:r=Rr.base,cap:s=Rr.cap,trail:a=Rr.trail,facets:o={}}){let c=g0(i,{base:r,cap:s}),l=T=>Math.max(8,Math.round(c*T.weight**1.5)),h=hr.filter(T=>o[T]?.length),p=i.reduce((T,S)=>T+l(S),0)+a,d={count:p,position:new Float32Array(p*3),center:new Float32Array(p*3),from:new Float32Array(p*3),facet:Object.fromEntries(hr.map(T=>[T,new Float32Array(p).fill(-1)])),u:new Float32Array(p),order:new Float32Array(p),seed:new Float32Array(p),size:new Float32Array(p),ahead:new Float32Array(p),kind:new Float32Array(p),memory:new Float32Array(p),galaxy:new Float32Array(p).fill(-1)},u=(T,S,b,I,U,z,N,j,F)=>{d.position.set(S,T*3),d.center.set(b,T*3),d.from.set(Mo(n),T*3),d.u[T]=I,d.order[T]=F,d.seed[T]=n(),d.size[T]=U,d.ahead[T]=z,d.kind[T]=N,d.memory[T]=j},m=0;i.forEach((T,S)=>{for(let b=0,I=l(T);b<I;b++,m++){let U=[Ar(n),Ar(n),Ar(n)*.8],z=T.spread*Math.abs(Ar(n))*.55,N=Math.hypot(...U)||1,j=U.map(F=>F/N*z);u(m,T.position.map((F,ee)=>F+j[ee]),T.position,Ts(T.year),.1+n()*.16,0,1,S,Yd(e,T.year)),d.galaxy[m]=T.period;for(let F of h)d.facet[F][m]=T.members[F][0]??-1}});let f=t+jc[1]+.4,v=Object.fromEntries(h.map(T=>[T,f0(i,T,o[T].length,f)])),g=o.threads?.length??0,_=Math.PI*2/Math.max(1,g),M=ip(i);for(let T=0;T<a;T++,m++){let S=n()<.06,b=S?t+n()*(f-t):1980+n()*(t-1980),I=v.threads?S?Math.floor(n()*g):$d(v.threads,b,n):-1,U=I>=0&&!S?rp(v.threads,b,I):p0(b,i,M),z;if(S)z=Xc(e,n(),Ar(n)*2.4);else{let N=e.list[vo(e,b)],j=n()<.14,F=j?n()*.2:So(N,b);z=Qd(N,I,g,F,Ar(n)*(N.arms?.[Math.max(0,I)]?.width??_)*(j?1.2:.14),Ar(n)*(.5+.9*U))}for(let N of h)d.facet[N][m]=N==="threads"?I:S?Math.floor(n()*o[N].length):$d(v[N],b,n);u(m,z,z,Ts(b),.05+n()*.07,S?1:0,0,-1,S?1:Yd(e,b)),d.galaxy[m]=S?-1:vo(e,b)}return d}var up=2026,Zc=(i=up)=>({start:1980,end:i+5,book:i+1.8,clone:i+3.6}),dp=i=>Math.max(up,Math.floor(i)),ai=Zc();var pp={seconds:16},fp=(i,e,t=1980,n=pp.seconds)=>t+(e-t)*Es(i/n),mp=(i,e,t=1980,n=pp.seconds)=>Es((i-t)/(e-t))*n,Ir=(i,e=ai)=>(i-e.start)/(e.end-e.start)*100,Ai={rate:.05,ramp:6,slots:16,near:.2},_0=i=>Ai.rate*12/(i.radius+12),v0=i=>i<=0?0:i-Ai.ramp*(1-Math.exp(-i/Ai.ramp)),gp=(i,e)=>-_0(i)*v0(e);var x0=24;document.querySelectorAll(".countdown[data-until]").forEach(i=>{let e=xo(i.dataset.until);if(!(e>=0)){i.hidden=!0;return}i.querySelector(".remaining").textContent=` \xB7 ${yo(e,document.documentElement.lang)}`,i.querySelector(".scale").style.setProperty("--months",Math.min(e,x0))});var Kp=0,Ph=1,Qp=2;var eo=1,ef=2,Ks=3,Qs=0,ti=1,tr=2,nr=0,Ii=1,xr=2,Lh=3,Nh=4,tf=5;var ea=100,nf=101,rf=102,sf=103,af=104,of=200,lf=201,cf=202,hf=203,uf=204,df=205,pf=206,ff=207,mf=208,gf=209,_f=210,vf=211,xf=212,yf=213,Sf=214,Dh=0,Uh=1,Oh=2,$l=3,Fh=4,Bh=5,zh=6,kh=7,Mf=0,bf=1,Tf=2,Vi=0,Vh=1,Gh=2,Hh=3,Wh=4,Xh=5,qh=6,jh=7;var ta=301,as=302,Zl=303,Jl=304,to=306,Kl=1e3,Ql=1001,Ef=1002,Gi=1003,wf=1004;var no=1005;var ni=1006,ec=1007;var os=1008;var Hi=1009,Af=1010,Rf=1011,io=1012,Yh=1013,Wr=1014,Pi=1015,ir=1016,$h=1017,Zh=1018,na=1020,Cf=35902,If=35899,Pf=1021,Lf=1022,rr=1023,ls=1026,cs=1027,ro=1028,Jh=1029,hs=1030,Kh=1031;var Qh=1033,tc=33776,nc=33777,ic=33778,rc=33779,eu=35840,tu=35841,nu=35842,iu=35843,ru=36196,su=37492,au=37496,ou=37488,lu=37489,sc=37490,cu=37491,hu=37808,uu=37809,du=37810,pu=37811,fu=37812,mu=37813,gu=37814,_u=37815,vu=37816,xu=37817,yu=37818,Su=37819,Mu=37820,bu=37821,Tu=36492,Eu=36494,wu=36495,Au=36283,Ru=36284,ac=36285,Cu=36286;var Iu=0,Nf=1,us="",Pu="srgb",oc="srgb-linear",Lu="linear",ln="srgb";var Df=512,Uf=513,Of=514,lc=515,Ff=516,Bf=517,cc=518,zf=519;var hc=35048;var Nu="300 es",Du=2e3;function y0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function S0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Aa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kf(){let i=Aa("canvas");return i.style.display="block",i}var _p={},Gs=null;function Ra(...i){let e="THREE."+i.shift();Gs?Gs("log",e,...i):console.log(e,...i)}function Vf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function tt(...i){let e="THREE."+(i=Vf(i)).shift();if(Gs)Gs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function st(...i){let e="THREE."+(i=Vf(i)).shift();if(Gs)Gs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Qr(...i){let e=i.join(" ");e in _p||(_p[e]=!0,tt(...i))}function Gf(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Hf={[Dh]:1,[Oh]:6,[Fh]:7,[$l]:5,[Uh]:0,[zh]:2,[kh]:4,[Bh]:3},Ki=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Jn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var el=Math.PI/180,tl=180/Math.PI;function _r(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Jn[255&i]+Jn[i>>8&255]+Jn[i>>16&255]+Jn[i>>24&255]+"-"+Jn[255&e]+Jn[e>>8&255]+"-"+Jn[e>>16&15|64]+Jn[e>>24&255]+"-"+Jn[63&t|128]+Jn[t>>8&255]+"-"+Jn[t>>16&255]+Jn[t>>24&255]+Jn[255&n]+Jn[n>>8&255]+Jn[n>>16&255]+Jn[n>>24&255]).toLowerCase()}function Ct(i,e,t){return Math.max(e,Math.min(t,i))}function M0(i,e){return(i%e+e)%e}function Jc(i,e,t){return(1-t)*i+t*e}function $i(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function tn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:case Uint8ClampedArray:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var zu=class zu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};zu.prototype.isVector2=!0;var pe=zu,Ci=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],h=n[r+2],p=n[r+3],d=s[a+0],u=s[a+1],m=s[a+2],f=s[a+3];if(p!==f||c!==d||l!==u||h!==m){let v=c*d+l*u+h*m+p*f;v<0&&(d=-d,u=-u,m=-m,f=-f,v=-v);let g=1-o;if(v<.9995){let _=Math.acos(v),M=Math.sin(_);g=Math.sin(g*_)/M,c=c*g+d*(o=Math.sin(o*_)/M),l=l*g+u*o,h=h*g+m*o,p=p*g+f*o}else{c=c*g+d*o,l=l*g+u*o,h=h*g+m*o,p=p*g+f*o;let _=1/Math.sqrt(c*c+l*l+h*h+p*p);c*=_,l*=_,h*=_,p*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],c=n[r+1],l=n[r+2],h=n[r+3],p=s[a],d=s[a+1],u=s[a+2],m=s[a+3];return e[t]=o*m+h*p+c*u-l*d,e[t+1]=c*m+h*d+l*p-o*u,e[t+2]=l*m+h*u+o*d-c*p,e[t+3]=h*m-o*p-c*d-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(r/2),p=o(s/2),d=c(n/2),u=c(r/2),m=c(s/2);switch(a){case"XYZ":this._x=d*h*p+l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p-d*u*m;break;case"YXZ":this._x=d*h*p+l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p+d*u*m;break;case"ZXY":this._x=d*h*p-l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p-d*u*m;break;case"ZYX":this._x=d*h*p-l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p+d*u*m;break;case"YZX":this._x=d*h*p+l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p-d*u*m;break;case"XZY":this._x=d*h*p-l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p+d*u*m;break;default:tt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],p=t[10],d=n+o+p;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-c)*u,this._y=(s-l)*u,this._z=(a-r)*u}else if(n>o&&n>p){let u=2*Math.sqrt(1+n-o-p);this._w=(h-c)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+l)/u}else if(o>p){let u=2*Math.sqrt(1+o-n-p);this._w=(s-l)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(c+h)/u}else{let u=2*Math.sqrt(1+p-n-o);this._w=(a-r)/u,this._x=(s+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-r*o,this._w=a*h-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ku=class ku{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),h=2*(o*t-s*r),p=2*(s*n-a*t);return this.x=t+c*l+a*p-o*h,this.y=n+c*h+o*l-s*p,this.z=r+c*p+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this.z=Ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this.z=Ct(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Kc.copy(this).projectOnVector(e),this.sub(Kc)}reflect(e){return this.sub(Kc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ku.prototype.isVector3=!0;var P=ku,Kc=new P,vp=new Ci,Vu=class Vu{constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],p=n[7],d=n[2],u=n[5],m=n[8],f=r[0],v=r[3],g=r[6],_=r[1],M=r[4],T=r[7],S=r[2],b=r[5],I=r[8];return s[0]=a*f+o*_+c*S,s[3]=a*v+o*M+c*b,s[6]=a*g+o*T+c*I,s[1]=l*f+h*_+p*S,s[4]=l*v+h*M+p*b,s[7]=l*g+h*T+p*I,s[2]=d*f+u*_+m*S,s[5]=d*v+u*M+m*b,s[8]=d*g+u*T+m*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+r*s*l-r*a*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=h*a-o*l,d=o*c-h*s,u=l*s-a*c,m=t*p+n*d+r*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let f=1/m;return e[0]=p*f,e[1]=(r*l-h*n)*f,e[2]=(o*n-r*a)*f,e[3]=d*f,e[4]=(h*t-r*c)*f,e[5]=(r*s-o*t)*f,e[6]=u*f,e[7]=(n*c-l*t)*f,e[8]=(a*t-n*s)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Qr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Qc.makeScale(e,t)),this}rotate(e){return Qr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Qc.makeRotation(-e)),this}translate(e,t){return Qr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Qc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Vu.prototype.isMatrix3=!0;var ft=Vu,Qc=new ft,xp=new ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yp=new ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function b0(){let i={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer==="srgb"&&(r.r=vr(r.r),r.g=vr(r.g),r.b=vr(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer==="srgb"&&(r.r=Vs(r.r),r.g=Vs(r.g),r.b=Vs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?"linear":this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Qr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Qr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[oc]:{primaries:e,whitePoint:n,transfer:"linear",toXYZ:xp,fromXYZ:yp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},[Pu]:{primaries:e,whitePoint:n,transfer:"srgb",toXYZ:xp,fromXYZ:yp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),i}var Lt=b0();function vr(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Vs(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var ws,nl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ws===void 0&&(ws=Aa("canvas")),ws.width=e.width,ws.height=e.height;let r=ws.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=ws}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Aa("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*vr(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*vr(t[n]/255)):t[n]=vr(t[n]);return{data:t,width:e.width,height:e.height}}return tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},T0=0,Hs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:T0++}),this.uuid=_r(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(eh(r[a].image)):s.push(eh(r[a]))}else s=eh(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function eh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(tt("Texture: Unable to serialize Texture."),{})}var E0=0,th=new P,li=class i extends Ki{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,c=1009,l=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:E0++}),this.uuid=_r(),this.name="",this.source=new Hs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(th).x}get height(){return this.source.getSize(th).y}get depth(){return this.source.getSize(th).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){tt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:tt(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};li.DEFAULT_IMAGE=null,li.DEFAULT_MAPPING=300,li.DEFAULT_ANISOTROPY=1;var Gu=class Gu{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,l=c[0],h=c[4],p=c[8],d=c[1],u=c[5],m=c[9],f=c[2],v=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(p-f)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+f)<.1&&Math.abs(m+v)<.1&&Math.abs(l+u+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(l+1)/2,T=(u+1)/2,S=(g+1)/2,b=(h+d)/4,I=(p+f)/4,U=(m+v)/4;return M>T&&M>S?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=b/n,s=I/n):T>S?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=b/r,s=U/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=I/s,r=U/s),this.set(n,r,s,t),this}let _=Math.sqrt((v-m)*(v-m)+(p-f)*(p-f)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(v-m)/_,this.y=(p-f)/_,this.z=(d-h)/_,this.w=Math.acos((l+u+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ct(this.x,e.x,t.x),this.y=Ct(this.y,e.y,t.y),this.z=Ct(this.z,e.z,t.z),this.w=Ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ct(this.x,e,t),this.y=Ct(this.y,e,t),this.z=Ct(this.z,e,t),this.w=Ct(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Gu.prototype.isVector4=!0;var on=Gu,il=class extends Ki{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new on(0,0,e,t),this.scissorTest=!1,this.viewport=new on(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new li(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Hs(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},gi=class extends il{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ca=class extends li{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var rl=class extends li{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Yl=class Yl{constructor(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v)}set(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=p,g[14]=d,g[3]=u,g[7]=m,g[11]=f,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Yl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/As.setFromMatrixColumn(e,0).length(),s=1/As.setFromMatrixColumn(e,1).length(),a=1/As.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=c*h,t[4]=-c*p,t[8]=l,t[1]=u+m*l,t[5]=d-f*l,t[9]=-o*c,t[2]=f-d*l,t[6]=m+u*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,u=c*p,m=l*h,f=l*p;t[0]=d+f*o,t[4]=m*o-u,t[8]=a*l,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=u*o-m,t[6]=f+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,u=c*p,m=l*h,f=l*p;t[0]=d-f*o,t[4]=-a*p,t[8]=m+u*o,t[1]=u+m*o,t[5]=a*h,t[9]=f-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=c*h,t[4]=m*l-u,t[8]=d*l+f,t[1]=c*p,t[5]=f*l+d,t[9]=u*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,u=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=f-d*p,t[8]=m*p+u,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=u*p+m,t[10]=d-f*p}else if(e.order==="XZY"){let d=a*c,u=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=-p,t[8]=l*h,t[1]=d*p+f,t[5]=a*h,t[9]=u*p-m,t[2]=m*p-u,t[6]=o*h,t[10]=f*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(w0,e,A0)}lookAt(e,t,n){let r=this.elements;return Si.subVectors(e,t),Si.lengthSq()===0&&(Si.z=1),Si.normalize(),Pr.crossVectors(n,Si),Pr.lengthSq()===0&&(Math.abs(n.z)===1?Si.x+=1e-4:Si.z+=1e-4,Si.normalize(),Pr.crossVectors(n,Si)),Pr.normalize(),bo.crossVectors(Si,Pr),r[0]=Pr.x,r[4]=bo.x,r[8]=Si.x,r[1]=Pr.y,r[5]=bo.y,r[9]=Si.y,r[2]=Pr.z,r[6]=bo.z,r[10]=Si.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],p=n[5],d=n[9],u=n[13],m=n[2],f=n[6],v=n[10],g=n[14],_=n[3],M=n[7],T=n[11],S=n[15],b=r[0],I=r[4],U=r[8],z=r[12],N=r[1],j=r[5],F=r[9],ee=r[13],ae=r[2],re=r[6],X=r[10],k=r[14],Q=r[3],he=r[7],Ie=r[11],ye=r[15];return s[0]=a*b+o*N+c*ae+l*Q,s[4]=a*I+o*j+c*re+l*he,s[8]=a*U+o*F+c*X+l*Ie,s[12]=a*z+o*ee+c*k+l*ye,s[1]=h*b+p*N+d*ae+u*Q,s[5]=h*I+p*j+d*re+u*he,s[9]=h*U+p*F+d*X+u*Ie,s[13]=h*z+p*ee+d*k+u*ye,s[2]=m*b+f*N+v*ae+g*Q,s[6]=m*I+f*j+v*re+g*he,s[10]=m*U+f*F+v*X+g*Ie,s[14]=m*z+f*ee+v*k+g*ye,s[3]=_*b+M*N+T*ae+S*Q,s[7]=_*I+M*j+T*re+S*he,s[11]=_*U+M*F+T*X+S*Ie,s[15]=_*z+M*ee+T*k+S*ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],p=e[6],d=e[10],u=e[14],m=e[3],f=e[7],v=e[11],g=e[15],_=c*u-l*d,M=o*u-l*p,T=o*d-c*p,S=a*u-l*h,b=a*d-c*h,I=a*p-o*h;return t*(f*_-v*M+g*T)-n*(m*_-v*S+g*b)+r*(m*M-f*S+g*I)-s*(m*T-f*b+v*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(s*h-o*c)+r*(s*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=e[9],d=e[10],u=e[11],m=e[12],f=e[13],v=e[14],g=e[15],_=t*o-n*a,M=t*c-r*a,T=t*l-s*a,S=n*c-r*o,b=n*l-s*o,I=r*l-s*c,U=h*f-p*m,z=h*v-d*m,N=h*g-u*m,j=p*v-d*f,F=p*g-u*f,ee=d*g-u*v,ae=_*ee-M*F+T*j+S*N-b*z+I*U;if(ae===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let re=1/ae;return e[0]=(o*ee-c*F+l*j)*re,e[1]=(r*F-n*ee-s*j)*re,e[2]=(f*I-v*b+g*S)*re,e[3]=(d*b-p*I-u*S)*re,e[4]=(c*N-a*ee-l*z)*re,e[5]=(t*ee-r*N+s*z)*re,e[6]=(v*T-m*I-g*M)*re,e[7]=(h*I-d*T+u*M)*re,e[8]=(a*F-o*N+l*U)*re,e[9]=(n*N-t*F-s*U)*re,e[10]=(m*b-f*T+g*_)*re,e[11]=(p*T-h*b-u*_)*re,e[12]=(o*z-a*j-c*U)*re,e[13]=(t*j-n*z+r*U)*re,e[14]=(f*M-m*S-v*_)*re,e[15]=(h*S-p*M+d*_)*re,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+n,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,p=o+o,d=s*l,u=s*h,m=s*p,f=a*h,v=a*p,g=o*p,_=c*l,M=c*h,T=c*p,S=n.x,b=n.y,I=n.z;return r[0]=(1-(f+g))*S,r[1]=(u+T)*S,r[2]=(m-M)*S,r[3]=0,r[4]=(u-T)*b,r[5]=(1-(d+g))*b,r[6]=(v+_)*b,r[7]=0,r[8]=(m+M)*I,r[9]=(v-_)*I,r[10]=(1-(d+f))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=As.set(r[0],r[1],r[2]).length(),o=As.set(r[4],r[5],r[6]).length(),c=As.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Ui.copy(this);let l=1/a,h=1/o,p=1/c;return Ui.elements[0]*=l,Ui.elements[1]*=l,Ui.elements[2]*=l,Ui.elements[4]*=h,Ui.elements[5]*=h,Ui.elements[6]*=h,Ui.elements[8]*=p,Ui.elements[9]*=p,Ui.elements[10]*=p,t.setFromRotationMatrix(Ui),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),p=2*s/(n-r),d=(t+e)/(t-e),u=(n+r)/(n-r),m,f;if(c)m=s/(a-s),f=a*s/(a-s);else if(o===2e3)m=-(a+s)/(a-s),f=-2*a*s/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),f=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=p,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),p=2/(n-r),d=-(t+e)/(t-e),u=-(n+r)/(n-r),m,f;if(c)m=1/(a-s),f=a/(a-s);else if(o===2e3)m=-2/(a-s),f=-(a+s)/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),f=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=p,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Yl.prototype.isMatrix4=!0;var St=Yl,As=new P,Ui=new St,w0=new P(0,0,0),A0=new P(1,1,1),Pr=new P,bo=new P,Si=new P,Sp=new St,Mp=new Ci,Br=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],p=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(Ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,u),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ct(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-Ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mp.setFromEuler(this),this.setFromQuaternion(Mp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Br.DEFAULT_ORDER="XYZ";var Ia=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},R0=0,bp=new P,Rs=new Ci,ur=new St,To=new P,ga=new P,C0=new P,I0=new Ci,Tp=new P(1,0,0),Ep=new P(0,1,0),wp=new P(0,0,1),Ap={type:"added"},P0={type:"removed"},Cs={type:"childadded",child:null},nh={type:"childremoved",child:null},ci=class i extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=_r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new Br,n=new Ci,r=new P(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new ft}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ia,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.multiply(Rs),this}rotateOnWorldAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.premultiply(Rs),this}rotateX(e){return this.rotateOnAxis(Tp,e)}rotateY(e){return this.rotateOnAxis(Ep,e)}rotateZ(e){return this.rotateOnAxis(wp,e)}translateOnAxis(e,t){return bp.copy(e).applyQuaternion(this.quaternion),this.position.add(bp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Tp,e)}translateY(e){return this.translateOnAxis(Ep,e)}translateZ(e){return this.translateOnAxis(wp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ur.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?To.copy(e):To.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ga.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ur.lookAt(ga,To,this.up):ur.lookAt(To,ga,this.up),this.quaternion.setFromRotationMatrix(ur),r&&(ur.extractRotation(r.matrixWorld),Rs.setFromRotationMatrix(ur),this.quaternion.premultiply(Rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(st("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ap),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null):st("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(P0),nh.child=e,this.dispatchEvent(nh),nh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ur.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ur.multiply(e.parent.matrixWorld)),e.applyMatrix4(ur),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ap),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,e,C0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,I0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let p=c[l];s(e.shapes,p)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),p=a(e.shapes),d=a(e.skeletons),u=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ci.DEFAULT_UP=new P(0,1,0),ci.DEFAULT_MATRIX_AUTO_UPDATE=!0,ci.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gr=class extends ci{constructor(){super(),this.isGroup=!0,this.type="Group"}},L0={type:"move"},Ws=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let f of e.hand.values()){let v=t.getJointPose(f,n),g=this._getHandJoint(l,f);v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=v.radius),g.visible=v!==null}let h=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],d=h.position.distanceTo(p.position),u=.02,m=.005;l.inputState.pinching&&d>u+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=u-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(L0)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new gr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Lr={h:0,s:0,l:0},Eo={h:0,s:0,l:0};function ih(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var _t=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Lt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Lt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Lt.workingColorSpace){if(e=M0(e,1),t=Ct(t,0,1),n=Ct(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ih(a,s,e+1/3),this.g=ih(a,s,e),this.b=ih(a,s,e-1/3)}return Lt.colorSpaceToWorking(this,r),this}setStyle(e,t="srgb"){function n(s){s!==void 0&&parseFloat(s)<1&&tt("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:tt("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);tt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=Wf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):tt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}copyLinearToSRGB(e){return this.r=Vs(e.r),this.g=Vs(e.g),this.b=Vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return Lt.workingToColorSpace(Kn.copy(this),e),65536*Math.round(Ct(255*Kn.r,0,255))+256*Math.round(Ct(255*Kn.g,0,255))+Math.round(Ct(255*Kn.b,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Lt.workingColorSpace){Lt.workingToColorSpace(Kn.copy(this),t);let n=Kn.r,r=Kn.g,s=Kn.b,a=Math.max(n,r,s),o=Math.min(n,r,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let p=a-o;switch(l=h<=.5?p/(a+o):p/(2-a-o),a){case n:c=(r-s)/p+(r<s?6:0);break;case r:c=(s-n)/p+2;break;case s:c=(n-r)/p+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Lt.workingColorSpace){return Lt.workingToColorSpace(Kn.copy(this),t),e.r=Kn.r,e.g=Kn.g,e.b=Kn.b,e}getStyle(e="srgb"){Lt.workingToColorSpace(Kn.copy(this),e);let t=Kn.r,n=Kn.g,r=Kn.b;return e!=="srgb"?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(Lr),this.setHSL(Lr.h+e,Lr.s+t,Lr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Lr),e.getHSL(Eo);let n=Jc(Lr.h,Eo.h,t),r=Jc(Lr.s,Eo.s,t),s=Jc(Lr.l,Eo.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Kn=new _t;_t.NAMES=Wf;var Pa=class extends ci{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Br,this.environmentIntensity=1,this.environmentRotation=new Br,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Oi=new P,dr=new P,rh=new P,pr=new P,Is=new P,Ps=new P,Rp=new P,sh=new P,ah=new P,oh=new P,lh=new on,ch=new on,hh=new on,Zi=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Oi.subVectors(e,t),r.cross(Oi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Oi.subVectors(r,t),dr.subVectors(n,t),rh.subVectors(e,t);let a=Oi.dot(Oi),o=Oi.dot(dr),c=Oi.dot(rh),l=dr.dot(dr),h=dr.dot(rh),p=a*l-o*o;if(p===0)return s.set(0,0,0),null;let d=1/p,u=(l*c-o*h)*d,m=(a*h-o*c)*d;return s.set(1-u-m,m,u)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,pr)!==null&&pr.x>=0&&pr.y>=0&&pr.x+pr.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,pr)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,pr.x),c.addScaledVector(a,pr.y),c.addScaledVector(o,pr.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return lh.setScalar(0),ch.setScalar(0),hh.setScalar(0),lh.fromBufferAttribute(e,t),ch.fromBufferAttribute(e,n),hh.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(lh,s.x),a.addScaledVector(ch,s.y),a.addScaledVector(hh,s.z),a}static isFrontFacing(e,t,n,r){return Oi.subVectors(n,t),dr.subVectors(e,t),Oi.cross(dr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Oi.subVectors(this.c,this.b),dr.subVectors(this.a,this.b),.5*Oi.cross(dr).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;Is.subVectors(r,n),Ps.subVectors(s,n),sh.subVectors(e,n);let c=Is.dot(sh),l=Ps.dot(sh);if(c<=0&&l<=0)return t.copy(n);ah.subVectors(e,r);let h=Is.dot(ah),p=Ps.dot(ah);if(h>=0&&p<=h)return t.copy(r);let d=c*p-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Is,a);oh.subVectors(e,s);let u=Is.dot(oh),m=Ps.dot(oh);if(m>=0&&u<=m)return t.copy(s);let f=u*l-c*m;if(f<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Ps,o);let v=h*m-u*p;if(v<=0&&p-h>=0&&u-m>=0)return Rp.subVectors(s,r),o=(p-h)/(p-h+(u-m)),t.copy(r).addScaledVector(Rp,o);let g=1/(v+f+d);return a=f*g,o=d*g,t.copy(n).addScaledVector(Is,a).addScaledVector(Ps,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zi=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Fi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Fi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Fi):Fi.fromBufferAttribute(s,a),Fi.applyMatrix4(e.matrixWorld),this.expandByPoint(Fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wo.copy(n.boundingBox)),wo.applyMatrix4(e.matrixWorld),this.union(wo)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fi),Fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_a),Ao.subVectors(this.max,_a),Ls.subVectors(e.a,_a),Ns.subVectors(e.b,_a),Ds.subVectors(e.c,_a),Nr.subVectors(Ns,Ls),Dr.subVectors(Ds,Ns),$r.subVectors(Ls,Ds);let t=[0,-Nr.z,Nr.y,0,-Dr.z,Dr.y,0,-$r.z,$r.y,Nr.z,0,-Nr.x,Dr.z,0,-Dr.x,$r.z,0,-$r.x,-Nr.y,Nr.x,0,-Dr.y,Dr.x,0,-$r.y,$r.x,0];return!!uh(t,Ls,Ns,Ds,Ao)&&(t=[1,0,0,0,1,0,0,0,1],!!uh(t,Ls,Ns,Ds,Ao)&&(Ro.crossVectors(Nr,Dr),t=[Ro.x,Ro.y,Ro.z],uh(t,Ls,Ns,Ds,Ao)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Fi).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(fr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},fr=[new P,new P,new P,new P,new P,new P,new P,new P],Fi=new P,wo=new zi,Ls=new P,Ns=new P,Ds=new P,Nr=new P,Dr=new P,$r=new P,_a=new P,Ao=new P,Ro=new P,Zr=new P;function uh(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Zr.fromArray(i,s);let o=r.x*Math.abs(Zr.x)+r.y*Math.abs(Zr.y)+r.z*Math.abs(Zr.z),c=e.dot(Zr),l=t.dot(Zr),h=n.dot(Zr);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var rM=N0();function N0(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,r[c]=24,r[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,r[c]=-l-1,r[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,r[c]=13,r[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,r[c]=24,r[256|c]=24):(n[c]=31744,n[256|c]=64512,r[c]=13,r[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var Cn=new P,Co=new pe,D0=0,Dt=class extends Ki{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:D0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Co.fromBufferAttribute(this,t),Co.applyMatrix3(e),this.setXY(t,Co.x,Co.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.applyMatrix3(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.applyMatrix4(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.applyNormalMatrix(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.transformDirection(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$i(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$i(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$i(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$i(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),r=tn(r,this.array),s=tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var La=class extends Dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Na=class extends Dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ke=class extends Dt{constructor(e,t,n){super(new Float32Array(e),t,n)}},U0=new zi,va=new P,dh=new P,ki=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):U0.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;va.subVectors(e,this.center);let t=va.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(va,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(va.copy(e.center).add(dh)),this.expandByPoint(va.copy(e.center).sub(dh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},O0=0,Ri=new St,ph=new ci,Us=new P,Mi=new zi,xa=new zi,kn=new P,Pt=class i extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:O0++}),this.uuid=_r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(y0(e)?Na:La)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ft().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ri.makeRotationFromQuaternion(e),this.applyMatrix4(Ri),this}rotateX(e){return Ri.makeRotationX(e),this.applyMatrix4(Ri),this}rotateY(e){return Ri.makeRotationY(e),this.applyMatrix4(Ri),this}rotateZ(e){return Ri.makeRotationZ(e),this.applyMatrix4(Ri),this}translate(e,t,n){return Ri.makeTranslation(e,t,n),this.applyMatrix4(Ri),this}scale(e,t,n){return Ri.makeScale(e,t,n),this.applyMatrix4(Ri),this}lookAt(e){return ph.lookAt(e),ph.updateMatrix(),this.applyMatrix4(ph.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ke(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return st("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Mi.setFromBufferAttribute(s),this.morphTargetsRelative?(kn.addVectors(this.boundingBox.min,Mi.min),this.boundingBox.expandByPoint(kn),kn.addVectors(this.boundingBox.max,Mi.max),this.boundingBox.expandByPoint(kn)):(this.boundingBox.expandByPoint(Mi.min),this.boundingBox.expandByPoint(Mi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&st('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ki);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return st("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new P,1/0);if(e){let n=this.boundingSphere.center;if(Mi.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];xa.setFromBufferAttribute(o),this.morphTargetsRelative?(kn.addVectors(Mi.min,xa.min),Mi.expandByPoint(kn),kn.addVectors(Mi.max,xa.max),Mi.expandByPoint(kn)):(Mi.expandByPoint(xa.min),Mi.expandByPoint(xa.max))}Mi.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)kn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(kn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)kn.fromBufferAttribute(o,l),c&&(Us.fromBufferAttribute(e,l),kn.add(Us)),r=Math.max(r,n.distanceToSquared(kn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&st('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void st("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");a!==void 0&&a.count===n.count||(a=new Dt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let U=0;U<n.count;U++)o[U]=new P,c[U]=new P;let l=new P,h=new P,p=new P,d=new pe,u=new pe,m=new pe,f=new P,v=new P;function g(U,z,N){l.fromBufferAttribute(n,U),h.fromBufferAttribute(n,z),p.fromBufferAttribute(n,N),d.fromBufferAttribute(s,U),u.fromBufferAttribute(s,z),m.fromBufferAttribute(s,N),h.sub(l),p.sub(l),u.sub(d),m.sub(d);let j=1/(u.x*m.y-m.x*u.y);isFinite(j)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-u.y).multiplyScalar(j),v.copy(p).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(j),o[U].add(f),o[z].add(f),o[N].add(f),c[U].add(v),c[z].add(v),c[N].add(v))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let U=0,z=_.length;U<z;++U){let N=_[U],j=N.start;for(let F=j,ee=j+N.count;F<ee;F+=3)g(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let M=new P,T=new P,S=new P,b=new P;function I(U){S.fromBufferAttribute(r,U),b.copy(S);let z=o[U];M.copy(z),M.sub(S.multiplyScalar(S.dot(z))).normalize(),T.crossVectors(b,z);let N=T.dot(c[U])<0?-1:1;a.setXYZW(U,M.x,M.y,M.z,N)}for(let U=0,z=_.length;U<z;++U){let N=_[U],j=N.start;for(let F=j,ee=j+N.count;F<ee;F+=3)I(e.getX(F+0)),I(e.getX(F+1)),I(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Dt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let r=new P,s=new P,a=new P,o=new P,c=new P,l=new P,h=new P,p=new P;if(e)for(let d=0,u=e.count;d<u;d+=3){let m=e.getX(d+0),f=e.getX(d+1),v=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,f),a.fromBufferAttribute(t,v),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,f),l.fromBufferAttribute(n,v),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(v,l.x,l.y,l.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kn.fromBufferAttribute(e,t),kn.normalize(),e.setXYZ(t,kn.x,kn.y,kn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,p=o.normalized,d=new l.constructor(c.length*h),u=0,m=0;for(let f=0,v=c.length;f<v;f++){u=o.isInterleavedBufferAttribute?c[f]*o.data.stride+o.offset:c[f]*h;for(let g=0;g<h;g++)d[m++]=l[u++]}return new Dt(d,h,p)}if(this.index===null)return tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let c=e(r[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,p=l.length;h<p;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let p=0,d=l.length;p<d;p++){let u=l[p];h.push(u.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let l in r){let h=r[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],p=s[l];for(let d=0,u=p.length;d<u;d++)h.push(p[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},sl=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=_r()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_r()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_r()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},oi=new P,Da=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)oi.fromBufferAttribute(this,t),oi.applyMatrix4(e),this.setXYZ(t,oi.x,oi.y,oi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)oi.fromBufferAttribute(this,t),oi.applyNormalMatrix(e),this.setXYZ(t,oi.x,oi.y,oi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)oi.fromBufferAttribute(this,t),oi.transformDirection(e),this.setXYZ(t,oi.x,oi.y,oi.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=$i(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=$i(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=$i(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=$i(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=$i(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),r=tn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),r=tn(r,this.array),s=tn(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Ra("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Dt(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ra("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},fh=new P,F0=new P,B0=new ft,Bi=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=fh.subVectors(n,t).cross(F0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(fh),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||B0.getNormalMatrix(e),r=this.coplanarPoint(fh).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Os,z0=0,Qi=class extends Ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=_r(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){tt(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:tt(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new _t().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Bi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new pe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new pe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Xs=class extends Qi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ya=new P,Fs=new P,Bs=new P,zs=new pe,Sa=new pe,Xf=new St,Io=new P,Ma=new P,Po=new P,Cp=new pe,mh=new pe,Ip=new pe,Ua=class extends ci{constructor(e=new Xs){if(super(),this.isSprite=!0,this.type="Sprite",Os===void 0){Os=new Pt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new sl(t,5);Os.setIndex([0,1,2,0,2,3]),Os.setAttribute("position",new Da(n,3,0,!1)),Os.setAttribute("uv",new Da(n,2,3,!1))}this.geometry=Os,this.material=e,this.center=new pe(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&st('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fs.setFromMatrixScale(this.matrixWorld),Xf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Bs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fs.multiplyScalar(-Bs.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;Lo(Io.set(-.5,-.5,0),Bs,a,Fs,r,s),Lo(Ma.set(.5,-.5,0),Bs,a,Fs,r,s),Lo(Po.set(.5,.5,0),Bs,a,Fs,r,s),Cp.set(0,0),mh.set(1,0),Ip.set(1,1);let o=e.ray.intersectTriangle(Io,Ma,Po,!1,ya);if(o===null&&(Lo(Ma.set(-.5,.5,0),Bs,a,Fs,r,s),mh.set(0,1),o=e.ray.intersectTriangle(Io,Po,Ma,!1,ya),o===null))return;let c=e.ray.origin.distanceTo(ya);c<e.near||c>e.far||t.push({distance:c,point:ya.clone(),uv:Zi.getInterpolation(ya,Io,Ma,Po,Cp,mh,Ip,new pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Lo(i,e,t,n,r,s){zs.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(Sa.x=s*zs.x-r*zs.y,Sa.y=r*zs.x+s*zs.y):Sa.copy(zs),i.copy(e),i.x+=Sa.x,i.y+=Sa.y,i.applyMatrix4(Xf)}var sM=new P,aM=new P;var mr=new P,gh=new P,No=new P,Do=new P,es=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=mr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mr.copy(this.origin).addScaledVector(this.direction,t),mr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){gh.copy(e).add(t).multiplyScalar(.5),No.copy(t).sub(e).normalize(),Do.copy(this.origin).sub(gh);let s=.5*e.distanceTo(t),a=-this.direction.dot(No),o=Do.dot(this.direction),c=-Do.dot(No),l=Do.lengthSq(),h=Math.abs(1-a*a),p,d,u,m;if(h>0)if(p=a*c-o,d=a*o-c,m=s*h,p>=0)if(d>=-m)if(d<=m){let f=1/h;p*=f,d*=f,u=p*(p+a*d+2*o)+d*(a*p+d+2*c)+l}else d=s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;else d=-s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;else d<=-m?(p=Math.max(0,-(-a*s+o)),d=p>0?-s:Math.min(Math.max(-s,-c),s),u=-p*p+d*(d+2*c)+l):d<=m?(p=0,d=Math.min(Math.max(-s,-c),s),u=d*(d+2*c)+l):(p=Math.max(0,-(a*s+o)),d=p>0?s:Math.min(Math.max(-s,-c),s),u=-p*p+d*(d+2*c)+l);else d=a>0?-s:s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(gh).addScaledVector(No,d),u}intersectSphere(e,t){if(e.radius<0)return null;mr.subVectors(e.center,this.origin);let n=mr.dot(this.direction),r=mr.dot(mr)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-d.z)*p,c=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,c=(e.min.z-d.z)*p),n>c||o>r?null:((o>n||n!=n)&&(n=o),(c<r||r!=r)&&(r=c),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,mr)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,p=e.x-a.x,d=e.y-a.y,u=e.z-a.z,m=t.x-a.x,f=t.y-a.y,v=t.z-a.z,g=n.x-a.x,_=n.y-a.y,M=n.z-a.z,T=Math.abs(c),S=Math.abs(l),b=Math.abs(h),I,U,z,N,j,F,ee,ae,re,X,k,Q;if(T>=S&&T>=b?(z=c,F=p,re=m,Q=g,c>=0?(I=l,U=h,N=d,j=u,ee=f,ae=v,X=_,k=M):(I=h,U=l,N=u,j=d,ee=v,ae=f,X=M,k=_)):S>=b?(z=l,F=d,re=f,Q=_,l>=0?(I=h,U=c,N=u,j=p,ee=v,ae=m,X=M,k=g):(I=c,U=h,N=p,j=u,ee=m,ae=v,X=g,k=M)):(z=h,F=u,re=v,Q=M,h>=0?(I=c,U=l,N=p,j=d,ee=m,ae=f,X=g,k=_):(I=l,U=c,N=d,j=p,ee=f,ae=m,X=_,k=g)),z===0)return null;let he=I/z,Ie=U/z,ye=N-he*F,Ue=j-Ie*F,we=ee-he*re,ue=ae-Ie*re,q=X-he*Q,ie=k-Ie*Q,le=q*ue-ie*we,oe=ye*ie-Ue*q,w=we*Ue-ue*ye;if(r){if(le<0||oe<0||w<0)return null}else if((le<0||oe<0||w<0)&&(le>0||oe>0||w>0))return null;let E=le+oe+w;if(E===0)return null;let C=1/z*(le*F+oe*re+w*Q);return(E>0?C<0:C>0)?null:this.at(C/E,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Oa=class extends Qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Br,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Pp=new St,Jr=new es,Uo=new ki,Lp=new P,Oo=new P,Fo=new P,Bo=new P,_h=new P,zo=new P,Np=new P,ko=new P,ei=class extends ci{constructor(e=new Pt,t=new Oa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){zo.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],p=s[c];h!==0&&(_h.fromBufferAttribute(p,e),a?zo.addScaledVector(_h,h):zo.addScaledVector(_h.sub(t),h))}t.add(zo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Uo.copy(n.boundingSphere),Uo.applyMatrix4(s),Jr.copy(e.ray).recast(e.near),Uo.containsPoint(Jr.origin)===!1&&(Jr.intersectSphere(Uo,Lp)===null||Jr.origin.distanceToSquared(Lp)>(e.far-e.near)**2))return;Pp.copy(s).invert(),Jr.copy(e.ray).applyMatrix4(Pp),n.boundingBox!==null&&Jr.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Jr)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),M=Math.min(o.count,Math.min(v.start+v.count,u.start+u.count));_<M;_+=3)r=Vo(this,g,e,n,l,h,p,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(o.count,u.start+u.count);m<f;m+=3)r=Vo(this,a,e,n,l,h,p,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(c!==void 0)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),M=Math.min(c.count,Math.min(v.start+v.count,u.start+u.count));_<M;_+=3)r=Vo(this,g,e,n,l,h,p,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(c.count,u.start+u.count);m<f;m+=3)r=Vo(this,a,e,n,l,h,p,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};function k0(i,e,t,n,r,s,a,o){let c;if(c=e.side===1?n.intersectTriangle(a,s,r,!0,o):n.intersectTriangle(r,s,a,e.side===0,o),c===null)return null;ko.copy(o),ko.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(ko);return l<t.near||l>t.far?null:{distance:l,point:ko.clone(),object:i}}function Vo(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,Oo),i.getVertexPosition(c,Fo),i.getVertexPosition(l,Bo);let h=k0(i,e,t,n,Oo,Fo,Bo,Np);if(h){let p=new P;Zi.getBarycoord(Np,Oo,Fo,Bo,p),r&&(h.uv=Zi.getInterpolatedAttribute(r,o,c,l,p,new pe)),s&&(h.uv1=Zi.getInterpolatedAttribute(s,o,c,l,p,new pe)),a&&(h.normal=Zi.getInterpolatedAttribute(a,o,c,l,p,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new P,materialIndex:0};Zi.getNormal(Oo,Fo,Bo,d.normal),h.face=d,h.barycoord=p}return h}var oM=new on,lM=new on,cM=new on,hM=new on,uM=new St,dM=new P,pM=new ki,fM=new St,mM=new es;var ts=class extends li{constructor(e=null,t=1,n=1,r,s,a,o,c,l=1003,h=1003,p,d){super(null,a,o,c,l,h,r,s,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},gM=new St,_M=new St;var vM=new St,xM=new St;var yM=new zi,SM=new St,MM=new ei,bM=new ki;var Kr=new ki,V0=new pe(.5,.5),Go=new P,zr=class{constructor(e=new Bi,t=new Bi,n=new Bi,r=new Bi,s=new Bi,a=new Bi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],p=s[5],d=s[6],u=s[7],m=s[8],f=s[9],v=s[10],g=s[11],_=s[12],M=s[13],T=s[14],S=s[15];if(r[0].setComponents(l-a,u-h,g-m,S-_).normalize(),r[1].setComponents(l+a,u+h,g+m,S+_).normalize(),r[2].setComponents(l+o,u+p,g+f,S+M).normalize(),r[3].setComponents(l-o,u-p,g-f,S-M).normalize(),n)r[4].setComponents(c,d,v,T).normalize(),r[5].setComponents(l-c,u-d,g-v,S-T).normalize();else if(r[4].setComponents(l-c,u-d,g-v,S-T).normalize(),t===2e3)r[5].setComponents(l+c,u+d,g+v,S+T).normalize();else{if(t!==2001)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(c,d,v,T).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){Kr.center.set(0,0,0);let t=V0.distanceTo(e.center);return Kr.radius=.7071067811865476+t,Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Go.x=r.normal.x>0?e.max.x:e.min.x,Go.y=r.normal.y>0?e.max.y:e.min.y,Go.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Go)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Dp=new St,al=class i{constructor(){this.coordinateSystem=2e3,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];Dp.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new zr),n[r].setFromProjectionMatrix(Dp,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new zr),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Th=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},TM=new St,EM=new _t(1,1,1),wM=new zr,AM=new al,RM=new zi,CM=new ki,IM=new P,PM=new P,LM=new P,NM=new Th,DM=new ei;var ns=class extends Qi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ol=new P,ll=new P,Up=new St,ba=new es,Ho=new ki,vh=new P,Op=new P,cl=class extends ci{constructor(e=new Pt,t=new ns){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)ol.fromBufferAttribute(t,r-1),ll.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=ol.distanceTo(ll);e.setAttribute("lineDistance",new Ke(n,1))}else tt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ho.copy(n.boundingSphere),Ho.applyMatrix4(r),Ho.radius+=s,e.ray.intersectsSphere(Ho)===!1)return;Up.copy(r).invert(),ba.copy(e.ray).applyMatrix4(Up);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),u=Math.min(h.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=l){let v=h.getX(m),g=h.getX(m+1),_=Wo(this,e,ba,c,v,g,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(u-1),f=h.getX(d),v=Wo(this,e,ba,c,m,f,u-1);v&&t.push(v)}}else{let d=Math.max(0,a.start),u=Math.min(p.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=l){let v=Wo(this,e,ba,c,m,m+1,m);v&&t.push(v)}if(this.isLineLoop){let m=Wo(this,e,ba,c,u-1,d,u-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Wo(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(ol.fromBufferAttribute(o,r),ll.fromBufferAttribute(o,s),t.distanceSqToSegment(ol,ll,vh,Op)>n)return;vh.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(vh);return c<e.near||c>e.far?void 0:{distance:c,point:Op.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Fp=new P,Bp=new P,is=class extends cl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Fp.fromBufferAttribute(t,r),Bp.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Fp.distanceTo(Bp);e.setAttribute("lineDistance",new Ke(n,1))}else tt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var qs=class extends Qi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},zp=new St,Eh=new es,Xo=new ki,qo=new P,er=class extends ci{constructor(e=new Pt,t=new qs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xo.copy(n.boundingSphere),Xo.applyMatrix4(r),Xo.radius+=s,e.ray.intersectsSphere(Xo)===!1)return;zp.copy(r).invert(),Eh.copy(e.ray).applyMatrix4(zp);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null)for(let p=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);p<d;p++){let u=l.getX(p);qo.fromBufferAttribute(h,u),kp(qo,u,c,r,e,t,this)}else for(let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);p<d;p++)qo.fromBufferAttribute(h,p),kp(qo,p,c,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function kp(i,e,t,n,r,s,a){let o=Eh.distanceSqToPoint(i);if(o<t){let c=new P;Eh.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Fa=class extends li{constructor(e=[],t=301,n,r,s,a,o,c,l,h){super(e,t,n,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},kr=class extends li{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Vr=class extends li{constructor(e,t,n=1014,r,s,a,o=1003,c=1003,l,h=1026,p=1){if(h!==1026&&h!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:p},r,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Hs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},hl=class extends Vr{constructor(e,t=1014,n=301,r,s,a=1003,o=1003,c,l=1026){let h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ba=class extends li{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},rs=class i extends Pt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],p=[],d=0,u=0;function m(f,v,g,_,M,T,S,b,I,U,z){let N=T/I,j=S/U,F=T/2,ee=S/2,ae=b/2,re=I+1,X=U+1,k=0,Q=0,he=new P;for(let Ie=0;Ie<X;Ie++){let ye=Ie*j-ee;for(let Ue=0;Ue<re;Ue++){let we=Ue*N-F;he[f]=we*_,he[v]=ye*M,he[g]=ae,l.push(he.x,he.y,he.z),he[f]=0,he[v]=0,he[g]=b>0?1:-1,h.push(he.x,he.y,he.z),p.push(Ue/I),p.push(1-Ie/U),k+=1}}for(let Ie=0;Ie<U;Ie++)for(let ye=0;ye<I;ye++){let Ue=d+ye+re*Ie,we=d+ye+re*(Ie+1),ue=d+(ye+1)+re*(Ie+1),q=d+(ye+1)+re*Ie;c.push(Ue,we,q),c.push(we,ue,q),Q+=6}o.addGroup(u,Q,z),u+=Q,d+=k}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},ul=class i extends Pt{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,p=Math.PI/2*e,d=t,u=2*p+d,m=2*n+s,f=r+1,v=new P,g=new P;for(let _=0;_<=m;_++){let M=0,T=0,S=0,b=0;if(_<=n){let z=_/n,N=z*Math.PI/2;T=-h-e*Math.cos(N),S=e*Math.sin(N),b=-e*Math.cos(N),M=z*p}else if(_<=n+s){let z=(_-n)/s;T=z*t-h,S=e,b=0,M=p+z*d}else{let z=(_-n-s)/n,N=z*Math.PI/2;T=h+e*Math.sin(N),S=e*Math.cos(N),b=e*Math.sin(N),M=p+d+z*p}let I=Math.max(0,Math.min(1,M/u)),U=0;_===0?U=.5/r:_===m&&(U=-.5/r);for(let z=0;z<=r;z++){let N=z/r,j=N*Math.PI*2,F=Math.sin(j),ee=Math.cos(j);g.x=-S*ee,g.y=T,g.z=S*F,o.push(g.x,g.y,g.z),v.set(-S*ee,b,S*F),v.normalize(),c.push(v.x,v.y,v.z),l.push(N+U,I)}if(_>0){let z=(_-1)*f;for(let N=0;N<r;N++){let j=z+N,F=z+N+1,ee=_*f+N,ae=_*f+N+1;a.push(j,F,ee),a.push(F,ae,ee)}}}this.setIndex(a),this.setAttribute("position",new Ke(o,3)),this.setAttribute("normal",new Ke(c,3)),this.setAttribute("uv",new Ke(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},dl=class i extends Pt{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new P,h=new pe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let p=0,d=3;p<=t;p++,d+=3){let u=n+p/t*r;l.x=e*Math.cos(u),l.y=e*Math.sin(u),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let p=1;p<=t;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new Ke(a,3)),this.setAttribute("normal",new Ke(o,3)),this.setAttribute("uv",new Ke(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},za=class i extends Pt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let h=[],p=[],d=[],u=[],m=0,f=[],v=n/2,g=0;function _(M){let T=m,S=new pe,b=new P,I=0,U=M===!0?e:t,z=M===!0?1:-1;for(let j=1;j<=r;j++)p.push(0,v*z,0),d.push(0,z,0),u.push(.5,.5),m++;let N=m;for(let j=0;j<=r;j++){let F=j/r*c+o,ee=Math.cos(F),ae=Math.sin(F);b.x=U*ae,b.y=v*z,b.z=U*ee,p.push(b.x,b.y,b.z),d.push(0,z,0),S.x=.5*ee+.5,S.y=.5*ae*z+.5,u.push(S.x,S.y),m++}for(let j=0;j<r;j++){let F=T+j,ee=N+j;M===!0?h.push(ee,ee+1,F):h.push(ee+1,ee,F),I+=3}l.addGroup(g,I,M===!0?1:2),g+=I}(function(){let M=new P,T=new P,S=0,b=(t-e)/n;for(let I=0;I<=s;I++){let U=[],z=I/s,N=z*(t-e)+e;for(let j=0;j<=r;j++){let F=j/r,ee=F*c+o,ae=Math.sin(ee),re=Math.cos(ee);T.x=N*ae,T.y=-z*n+v,T.z=N*re,p.push(T.x,T.y,T.z),M.set(ae,b,re).normalize(),d.push(M.x,M.y,M.z),u.push(F,1-z),U.push(m++)}f.push(U)}for(let I=0;I<r;I++)for(let U=0;U<s;U++){let z=f[U][I],N=f[U+1][I],j=f[U+1][I+1],F=f[U][I+1];(e>0||U!==0)&&(h.push(z,N,F),S+=3),(t>0||U!==s-1)&&(h.push(N,j,F),S+=3)}l.addGroup(g,S,0),g+=S})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ke(p,3)),this.setAttribute("normal",new Ke(d,3)),this.setAttribute("uv",new Ke(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},pl=class i extends za{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Gr=class i extends Pt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(u,m,f,v){let g=v+1,_=[];for(let M=0;M<=g;M++){_[M]=[];let T=u.clone().lerp(f,M/g),S=m.clone().lerp(f,M/g),b=g-M;for(let I=0;I<=b;I++)_[M][I]=I===0&&M===g?T:T.clone().lerp(S,I/b)}for(let M=0;M<g;M++)for(let T=0;T<2*(g-M)-1;T++){let S=Math.floor(T/2);T%2==0?(c(_[M][S+1]),c(_[M+1][S]),c(_[M][S])):(c(_[M][S+1]),c(_[M+1][S+1]),c(_[M+1][S]))}}function c(u){s.push(u.x,u.y,u.z)}function l(u,m){let f=3*u;m.x=e[f+0],m.y=e[f+1],m.z=e[f+2]}function h(u,m,f,v){v<0&&u.x===1&&(a[m]=u.x-1),f.x===0&&f.z===0&&(a[m]=v/2/Math.PI+.5)}function p(u){return Math.atan2(u.z,-u.x)}function d(u){return Math.atan2(-u.y,Math.sqrt(u.x*u.x+u.z*u.z))}(function(u){let m=new P,f=new P,v=new P;for(let g=0;g<t.length;g+=3)l(t[g+0],m),l(t[g+1],f),l(t[g+2],v),o(m,f,v,u)})(r),(function(u){let m=new P;for(let f=0;f<s.length;f+=3)m.x=s[f+0],m.y=s[f+1],m.z=s[f+2],m.normalize().multiplyScalar(u),s[f+0]=m.x,s[f+1]=m.y,s[f+2]=m.z})(n),(function(){let u=new P;for(let m=0;m<s.length;m+=3){u.x=s[m+0],u.y=s[m+1],u.z=s[m+2];let f=p(u)/2/Math.PI+.5,v=d(u)/Math.PI+.5;a.push(f,1-v)}(function(){let m=new P,f=new P,v=new P,g=new P,_=new pe,M=new pe,T=new pe;for(let S=0,b=0;S<s.length;S+=9,b+=6){m.set(s[S+0],s[S+1],s[S+2]),f.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),_.set(a[b+0],a[b+1]),M.set(a[b+2],a[b+3]),T.set(a[b+4],a[b+5]),g.copy(m).add(f).add(v).divideScalar(3);let I=p(g);h(_,b+0,m,I),h(M,b+2,f,I),h(T,b+4,v,I)}})(),(function(){for(let m=0;m<a.length;m+=6){let f=a[m+0],v=a[m+2],g=a[m+4],_=Math.max(f,v,g),M=Math.min(f,v,g);_>.9&&M<.1&&(f<.2&&(a[m+0]+=1),v<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new Ke(s,3)),this.setAttribute("normal",new Ke(s.slice(),3)),this.setAttribute("uv",new Ke(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},fl=class i extends Gr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},jo=new P,Yo=new P,xh=new P,$o=new Zi,ml=class extends Pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(el*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],p=new Array(3),d={},u=[];for(let m=0;m<c;m+=3){a?(l[0]=a.getX(m),l[1]=a.getX(m+1),l[2]=a.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);let{a:f,b:v,c:g}=$o;if(f.fromBufferAttribute(o,l[0]),v.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),$o.getNormal(xh),p[0]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,p[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,p[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,p[0]!==p[1]&&p[1]!==p[2]&&p[2]!==p[0])for(let _=0;_<3;_++){let M=(_+1)%3,T=p[_],S=p[M],b=$o[h[_]],I=$o[h[M]],U=`${T}_${S}`,z=`${S}_${T}`;z in d&&d[z]?(xh.dot(d[z].normal)<=s&&(u.push(b.x,b.y,b.z),u.push(I.x,I.y,I.z)),d[z]=null):U in d||(d[U]={index0:l[_],index1:l[M],normal:xh.clone()})}}for(let m in d)if(d[m]){let{index0:f,index1:v}=d[m];jo.fromBufferAttribute(o,f),Yo.fromBufferAttribute(o,v),u.push(jo.x,jo.y,jo.z),u.push(Yo.x,Yo.y,Yo.z)}this.setAttribute("position",new Ke(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Ti=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){tt("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(r=Math.floor(c+(l-c)/2),o=n[r]-a,o<0)c=r+1;else{if(!(o>0)){l=r;break}l=r-1}if(r=l,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),c=t||(a.isVector2?new pe:new P);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,r=[],s=[],a=[],o=new P,c=new St;for(let u=0;u<=e;u++){let m=u/e;r[u]=this.getTangentAt(m,new P)}s[0]=new P,a[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(r[0].x),p=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),p<=l&&(l=p,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Ct(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(c.makeRotationAxis(o,m))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(Ct(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(r[m],u*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},js=class extends Ti{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new pe){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=c-this.aX,u=l-this.aY;c=d*h-u*p+this.aX,l=d*p+u*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},gl=class extends js{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Uu(){let i=0,e=0,t=0,n=0;function r(s,a,o,c){i=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){r(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,p){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,u=(o-a)/h-(c-a)/(h+p)+(c-o)/p;d*=h,u*=h,r(a,o,d,u)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var Vp=new P,Gp=new P,yh=new Uu,Sh=new Uu,Mh=new Uu,_l=class extends Ti{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new P){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=r[(l-1)%s]:(Gp.subVectors(r[0],r[1]).add(r[0]),o=Gp);let p=r[l%s],d=r[(l+1)%s];if(this.closed||l+2<s?c=r[(l+2)%s]:(Vp.subVectors(r[s-1],r[s-2]).add(r[s-1]),c=Vp),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(p),u),f=Math.pow(p.distanceToSquared(d),u),v=Math.pow(d.distanceToSquared(c),u);f<1e-4&&(f=1),m<1e-4&&(m=f),v<1e-4&&(v=f),yh.initNonuniformCatmullRom(o.x,p.x,d.x,c.x,m,f,v),Sh.initNonuniformCatmullRom(o.y,p.y,d.y,c.y,m,f,v),Mh.initNonuniformCatmullRom(o.z,p.z,d.z,c.z,m,f,v)}else this.curveType==="catmullrom"&&(yh.initCatmullRom(o.x,p.x,d.x,c.x,this.tension),Sh.initCatmullRom(o.y,p.y,d.y,c.y,this.tension),Mh.initCatmullRom(o.z,p.z,d.z,c.z,this.tension));return n.set(yh.calc(h),Sh.calc(h),Mh.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new P().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Hp(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function G0(i,e){let t=1-i;return t*t*e}function H0(i,e){return 2*(1-i)*i*e}function W0(i,e){return i*i*e}function Ea(i,e,t,n){return G0(i,e)+H0(i,t)+W0(i,n)}function X0(i,e){let t=1-i;return t*t*t*e}function q0(i,e){let t=1-i;return 3*t*t*i*e}function j0(i,e){return 3*(1-i)*i*i*e}function Y0(i,e){return i*i*i*e}function wa(i,e,t,n,r){return X0(i,e)+q0(i,t)+j0(i,n)+Y0(i,r)}var ka=class extends Ti{constructor(e=new pe,t=new pe,n=new pe,r=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new pe){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(wa(e,r.x,s.x,a.x,o.x),wa(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},vl=class extends Ti{constructor(e=new P,t=new P,n=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(wa(e,r.x,s.x,a.x,o.x),wa(e,r.y,s.y,a.y,o.y),wa(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Va=class extends Ti{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xl=class extends Ti{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ga=class extends Ti{constructor(e=new pe,t=new pe,n=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new pe){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ea(e,r.x,s.x,a.x),Ea(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ha=class extends Ti{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ea(e,r.x,s.x,a.x),Ea(e,r.y,s.y,a.y),Ea(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Wa=class extends Ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,c=r[a===0?a:a-1],l=r[a],h=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return n.set(Hp(o,c.x,l.x,h.x,p.x),Hp(o,c.y,l.y,h.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new pe().fromArray(r))}return this}},yl=Object.freeze({__proto__:null,ArcCurve:gl,CatmullRomCurve3:_l,CubicBezierCurve:ka,CubicBezierCurve3:vl,EllipseCurve:js,LineCurve:Va,LineCurve3:xl,QuadraticBezierCurve:Ga,QuadraticBezierCurve3:Ha,SplineCurve:Wa}),Sl=class extends Ti{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new yl[r.type]().fromJSON(r))}return this}},Xa=class extends Sl{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Va(this.currentPoint.clone(),new pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Ga(this.currentPoint.clone(),new pe(e,t),new pe(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new ka(this.currentPoint.clone(),new pe(e,t),new pe(n,r),new pe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Wa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,r,s,a,o,c),this}absellipse(e,t,n,r,s,a,o,c){let l=new js(e,t,n,r,s,a,o,c);if(this.curves.length>0){let p=l.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},qa=class extends Xa{constructor(e){super(e),this.uuid=_r(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Xa().fromJSON(r))}return this}};function $0(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=qf(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=e_(i,e,s,t)),i.length>80*t){o=i[0],c=i[1];let h=o,p=c;for(let d=t;d<r;d+=t){let u=i[d],m=i[d+1];u<o&&(o=u),m<c&&(c=m),u>h&&(h=u),m>p&&(p=m)}l=Math.max(h-o,p-c),l=l!==0?32767/l:0}return ja(s,a,t,o,c,l,0),a}function qf(i,e,t,n,r){let s;if(r===u_(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=Wp(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Wp(a/n|0,i[a],i[a+1],s);return s&&Ys(s,s.next)&&($a(s),s=s.next),s}function ss(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!Ys(n,n.next)&&_n(n.prev,n,n.next)!==0)n=n.next;else{if($a(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function ja(i,e,t,n,r,s,a){if(!i)return;!a&&s&&s_(i,n,r,s);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(s?J0(i,n,r,s):Z0(i))e.push(c.i,i.i,l.i),$a(i),i=l.next,o=l.next;else if((i=l)===o){a?a===1?ja(i=K0(ss(i),e),e,t,n,r,s,2):a===2&&Q0(i,e,t,n,r,s):ja(ss(i),e,t,n,r,s,1);break}}}function Z0(i){let e=i.prev,t=i,n=i.next;if(_n(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(r,s,a),p=Math.min(o,c,l),d=Math.max(r,s,a),u=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=p&&m.y<=u&&Ta(r,o,s,c,a,l,m.x,m.y)&&_n(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function J0(i,e,t,n){let r=i.prev,s=i,a=i.next;if(_n(r,s,a)>=0)return!1;let o=r.x,c=s.x,l=a.x,h=r.y,p=s.y,d=a.y,u=Math.min(o,c,l),m=Math.min(h,p,d),f=Math.max(o,c,l),v=Math.max(h,p,d),g=wh(u,m,e,t,n),_=wh(f,v,e,t,n),M=i.prevZ,T=i.nextZ;for(;M&&M.z>=g&&T&&T.z<=_;){if(M.x>=u&&M.x<=f&&M.y>=m&&M.y<=v&&M!==r&&M!==a&&Ta(o,h,c,p,l,d,M.x,M.y)&&_n(M.prev,M,M.next)>=0||(M=M.prevZ,T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&Ta(o,h,c,p,l,d,T.x,T.y)&&_n(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;M&&M.z>=g;){if(M.x>=u&&M.x<=f&&M.y>=m&&M.y<=v&&M!==r&&M!==a&&Ta(o,h,c,p,l,d,M.x,M.y)&&_n(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;T&&T.z<=_;){if(T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&Ta(o,h,c,p,l,d,T.x,T.y)&&_n(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function K0(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Ys(n,r)&&Yf(n,t,t.next,r)&&Ya(n,r)&&Ya(r,n)&&(e.push(n.i,t.i,r.i),$a(t),$a(t.next),t=i=r),t=t.next}while(t!==i);return ss(t)}function Q0(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&l_(a,o)){let c=$f(a,o);return a=ss(a,a.next),c=ss(c,c.next),ja(a,e,t,n,r,s,0),void ja(c,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function e_(i,e,t,n){let r=[];for(let s=0,a=e.length;s<a;s++){let o=qf(i,e[s]*n,s<a-1?e[s+1]*n:i.length,n,!1);o===o.next&&(o.steiner=!0),r.push(o_(o))}r.sort(t_);for(let s=0;s<r.length;s++)t=n_(r[s],t);return t}function t_(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function n_(i,e){let t=i_(i,e);if(!t)return e;let n=$f(t,i);return ss(n,n.next),ss(t,t.next)}function i_(i,e){let t=e,n=i.x,r=i.y,s,a=-1/0;if(Ys(i,t))return t;do{if(Ys(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let p=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>a&&(a=p,s=t.x<t.next.x?t:t.next,p===n))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,c=s.x,l=s.y,h=1/0;t=s;do{if(n>=t.x&&t.x>=c&&n!==t.x&&jf(r<l?n:a,r,c,l,r<l?a:n,r,t.x,t.y)){let p=Math.abs(r-t.y)/(n-t.x);Ya(t,i)&&(p<h||p===h&&(t.x>s.x||t.x===s.x&&r_(s,t)))&&(s=t,h=p)}t=t.next}while(t!==o);return s}function r_(i,e){return _n(i.prev,i,e.prev)<0&&_n(e.next,i,i.next)<0}function s_(i,e,t,n){let r=i;do r.z===0&&(r.z=wh(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,a_(r)}function a_(i){let e,t=1;do{let n,r=i;i=null;let s=null;for(e=0;r;){e++;let a=r,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||r.z<=a.z)?(n=r,r=r.nextZ,o--):(n=a,a=a.nextZ,c--),s?s.nextZ=n:i=n,n.prevZ=s,s=n;r=a}s.nextZ=null,t*=2}while(e>1);return i}function wh(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function o_(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function jf(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Ta(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&jf(i,e,t,n,r,s,a,o)}function l_(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!c_(i,e)&&(Ya(i,e)&&Ya(e,i)&&h_(i,e)&&(_n(i.prev,i,e.prev)||_n(i,e.prev,e))||Ys(i,e)&&_n(i.prev,i,i.next)>0&&_n(e.prev,e,e.next)>0)}function _n(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ys(i,e){return i.x===e.x&&i.y===e.y}function Yf(i,e,t,n){let r=Jo(_n(i,e,t)),s=Jo(_n(i,e,n)),a=Jo(_n(t,n,i)),o=Jo(_n(t,n,e));return r!==s&&a!==o||!(r!==0||!Zo(i,t,e))||!(s!==0||!Zo(i,n,e))||!(a!==0||!Zo(t,i,n))||!(o!==0||!Zo(t,e,n))}function Zo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Jo(i){return i>0?1:i<0?-1:0}function c_(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Yf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ya(i,e){return _n(i.prev,i,i.next)<0?_n(i,e,i.next)>=0&&_n(i,i.prev,e)>=0:_n(i,e,i.prev)<0||_n(i,i.next,e)<0}function h_(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function $f(i,e){let t=Ah(i.i,i.x,i.y),n=Ah(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Wp(i,e,t,n){let r=Ah(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function $a(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ah(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function u_(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var Rh=class{static triangulate(e,t,n=2){return $0(e,t,n)}},Ji=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Xp(e),qp(n,e);let a=e.length;t.forEach(Xp);for(let c=0;c<t.length;c++)r.push(a),a+=t[c].length,qp(n,t[c]);let o=Rh.triangulate(n,r);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Xp(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function qp(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ml=class i extends Pt{constructor(e=new qa([new pe(.5,.5),new pe(-.5,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:u-.1,f=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:d_,M,T,S,b,I,U=!1;if(g){M=g.getSpacedPoints(h),U=!0,d=!1;let C=!!g.isCatmullRomCurve3&&g.closed;T=g.computeFrenetFrames(h,C),S=new P,b=new P,I=new P}d||(v=0,u=0,m=0,f=0);let z=o.extractPoints(l),N=z.shape,j=z.holes;if(!Ji.isClockWise(N)){N=N.reverse();for(let C=0,D=j.length;C<D;C++){let y=j[C];Ji.isClockWise(y)&&(j[C]=y.reverse())}}function F(C){let D=10000000000000001e-36,y=C[0];for(let B=1;B<=C.length;B++){let O=B%C.length,R=C[O],Y=R.x-y.x,Z=R.y-y.y,K=Y*Y+Z*Z,de=Math.max(Math.abs(R.x),Math.abs(R.y),Math.abs(y.x),Math.abs(y.y));K<=D*de*de?(C.splice(O,1),B--):y=R}}F(N),j.forEach(F);let ee=j.length,ae=N;for(let C=0;C<ee;C++){let D=j[C];N=N.concat(D)}function re(C,D,y){return D||st("ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(D,y)}let X=N.length;function k(C,D,y){let B,O,R,Y=C.x-D.x,Z=C.y-D.y,K=y.x-C.x,de=y.y-C.y,Se=Y*Y+Z*Z,Me=Y*de-Z*K;if(Math.abs(Me)>Number.EPSILON){let _e=Math.sqrt(Se),Ge=Math.sqrt(K*K+de*de),ce=D.x-Z/_e,fe=D.y+Y/_e,me=((y.x-de/Ge-ce)*de-(y.y+K/Ge-fe)*K)/(Y*de-Z*K);B=ce+Y*me-C.x,O=fe+Z*me-C.y;let Ee=B*B+O*O;if(Ee<=2)return new pe(B,O);R=Math.sqrt(Ee/2)}else{let _e=!1;Y>Number.EPSILON?K>Number.EPSILON&&(_e=!0):Y<-Number.EPSILON?K<-Number.EPSILON&&(_e=!0):Math.sign(Z)===Math.sign(de)&&(_e=!0),_e?(B=-Z,O=Y,R=Math.sqrt(Se)):(B=Y,O=Z,R=Math.sqrt(Se/2))}return new pe(B/R,O/R)}let Q=[];for(let C=0,D=ae.length,y=D-1,B=C+1;C<D;C++,y++,B++)y===D&&(y=0),B===D&&(B=0),Q[C]=k(ae[C],ae[y],ae[B]);let he=[],Ie,ye,Ue=Q.concat();for(let C=0,D=ee;C<D;C++){let y=j[C];Ie=[];for(let B=0,O=y.length,R=O-1,Y=B+1;B<O;B++,R++,Y++)R===O&&(R=0),Y===O&&(Y=0),Ie[B]=k(y[B],y[R],y[Y]);he.push(Ie),Ue=Ue.concat(Ie)}if(v===0)ye=Ji.triangulateShape(ae,j);else{let C=[],D=[];for(let y=0;y<v;y++){let B=y/v,O=u*Math.cos(B*Math.PI/2),R=m*Math.sin(B*Math.PI/2)+f;for(let Y=0,Z=ae.length;Y<Z;Y++){let K=re(ae[Y],Q[Y],R);ie(K.x,K.y,-O),B===0&&C.push(K)}for(let Y=0,Z=ee;Y<Z;Y++){let K=j[Y];Ie=he[Y];let de=[];for(let Se=0,Me=K.length;Se<Me;Se++){let _e=re(K[Se],Ie[Se],R);ie(_e.x,_e.y,-O),B===0&&de.push(_e)}B===0&&D.push(de)}}ye=Ji.triangulateShape(C,D)}let we=ye.length,ue=m+f;for(let C=0;C<X;C++){let D=d?re(N[C],Ue[C],ue):N[C];U?(b.copy(T.normals[0]).multiplyScalar(D.x),S.copy(T.binormals[0]).multiplyScalar(D.y),I.copy(M[0]).add(b).add(S),ie(I.x,I.y,I.z)):ie(D.x,D.y,0)}for(let C=1;C<=h;C++)for(let D=0;D<X;D++){let y=d?re(N[D],Ue[D],ue):N[D];U?(b.copy(T.normals[C]).multiplyScalar(y.x),S.copy(T.binormals[C]).multiplyScalar(y.y),I.copy(M[C]).add(b).add(S),ie(I.x,I.y,I.z)):ie(y.x,y.y,p/h*C)}for(let C=v-1;C>=0;C--){let D=C/v,y=u*Math.cos(D*Math.PI/2),B=m*Math.sin(D*Math.PI/2)+f;for(let O=0,R=ae.length;O<R;O++){let Y=re(ae[O],Q[O],B);ie(Y.x,Y.y,p+y)}for(let O=0,R=j.length;O<R;O++){let Y=j[O];Ie=he[O];for(let Z=0,K=Y.length;Z<K;Z++){let de=re(Y[Z],Ie[Z],B);U?ie(de.x,de.y+M[h-1].y,M[h-1].x+y):ie(de.x,de.y,p+y)}}}function q(C,D){let y=C.length;for(;--y>=0;){let B=y,O=y-1;O<0&&(O=C.length-1);for(let R=0,Y=h+2*v;R<Y;R++){let Z=X*R,K=X*(R+1);oe(D+B+Z,D+O+Z,D+O+K,D+B+K)}}}function ie(C,D,y){c.push(C),c.push(D),c.push(y)}function le(C,D,y){w(C),w(D),w(y);let B=r.length/3,O=_.generateTopUV(n,r,B-3,B-2,B-1);E(O[0]),E(O[1]),E(O[2])}function oe(C,D,y,B){w(C),w(D),w(B),w(D),w(y),w(B);let O=r.length/3,R=_.generateSideWallUV(n,r,O-6,O-3,O-2,O-1);E(R[0]),E(R[1]),E(R[3]),E(R[1]),E(R[2]),E(R[3])}function w(C){r.push(c[3*C+0]),r.push(c[3*C+1]),r.push(c[3*C+2])}function E(C){s.push(C.x),s.push(C.y)}(function(){let C=r.length/3;if(d){let D=0,y=X*D;for(let B=0;B<we;B++){let O=ye[B];le(O[2]+y,O[1]+y,O[0]+y)}D=h+2*v,y=X*D;for(let B=0;B<we;B++){let O=ye[B];le(O[0]+y,O[1]+y,O[2]+y)}}else{for(let D=0;D<we;D++){let y=ye[D];le(y[2],y[1],y[0])}for(let D=0;D<we;D++){let y=ye[D];le(y[0]+X*h,y[1]+X*h,y[2]+X*h)}}n.addGroup(C,r.length/3-C,0)})(),(function(){let C=r.length/3,D=0;q(ae,D),D+=ae.length;for(let y=0,B=j.length;y<B;y++){let O=j[y];q(O,D),D+=O.length}n.addGroup(C,r.length/3-C,1)})()}this.setAttribute("position",new Ke(r,3)),this.setAttribute("uv",new Ke(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return p_(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new yl[r.type]().fromJSON(r)),new i(n,e.options)}},d_={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*r],h=e[3*r+1];return[new pe(s,a),new pe(o,c),new pe(l,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],p=e[3*n+2],d=e[3*r],u=e[3*r+1],m=e[3*r+2],f=e[3*s],v=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new pe(a,1-c),new pe(l,1-p),new pe(d,1-m),new pe(f,1-g)]:[new pe(o,1-c),new pe(h,1-p),new pe(u,1-m),new pe(v,1-g)]}};function p_(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var bl=class i extends Gr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Tl=class i extends Pt{constructor(e=[new pe(0,-.5),new pe(.5,0),new pe(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Ct(r,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,p=new P,d=new pe,u=new P,m=new P,f=new P,v=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,f.copy(u),u.normalize(),c.push(u.x,u.y,u.z);break;case e.length-1:c.push(f.x,f.y,f.z);break;default:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,m.copy(u),u.x+=f.x,u.y+=f.y,u.z+=f.z,u.normalize(),c.push(u.x,u.y,u.z),f.copy(m)}for(let _=0;_<=t;_++){let M=n+_*h*r,T=Math.sin(M),S=Math.cos(M);for(let b=0;b<=e.length-1;b++){p.x=e[b].x*T,p.y=e[b].y,p.z=e[b].x*S,a.push(p.x,p.y,p.z),d.x=_/t,d.y=b/(e.length-1),o.push(d.x,d.y);let I=c[3*b+0]*T,U=c[3*b+1],z=c[3*b+0]*S;l.push(I,U,z)}}for(let _=0;_<t;_++)for(let M=0;M<e.length-1;M++){let T=M+_*e.length,S=T,b=T+e.length,I=T+e.length+1,U=T+1;s.push(S,b,U),s.push(I,U,b)}this.setIndex(s),this.setAttribute("position",new Ke(a,3)),this.setAttribute("uv",new Ke(o,2)),this.setAttribute("normal",new Ke(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},El=class i extends Gr{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},$s=class i extends Pt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,h=c+1,p=e/o,d=t/c,u=[],m=[],f=[],v=[];for(let g=0;g<h;g++){let _=g*d-a;for(let M=0;M<l;M++){let T=M*p-s;m.push(T,-_,0),f.push(0,0,1),v.push(M/o),v.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let M=_+l*g,T=_+l*(g+1),S=_+1+l*(g+1),b=_+1+l*g;u.push(M,T,b),u.push(T,S,b)}this.setIndex(u),this.setAttribute("position",new Ke(m,3)),this.setAttribute("normal",new Ke(f,3)),this.setAttribute("uv",new Ke(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},wl=class i extends Pt{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],p=e,d=(t-e)/(r=Math.max(1,r)),u=new P,m=new pe;for(let f=0;f<=r;f++){for(let v=0;v<=n;v++){let g=s+v/n*a;u.x=p*Math.cos(g),u.y=p*Math.sin(g),c.push(u.x,u.y,u.z),l.push(0,0,1),m.x=(u.x/t+1)/2,m.y=(u.y/t+1)/2,h.push(m.x,m.y)}p+=d}for(let f=0;f<r;f++){let v=f*(n+1);for(let g=0;g<n;g++){let _=g+v,M=_,T=_+n+1,S=_+n+2,b=_+1;o.push(M,T,b),o.push(T,S,b)}}this.setIndex(o),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(l,3)),this.setAttribute("uv",new Ke(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Al=class i extends Pt{constructor(e=new qa([new pe(0,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let p=r.length/3,d=h.extractPoints(t),u=d.shape,m=d.holes;Ji.isClockWise(u)===!1&&(u=u.reverse());for(let v=0,g=m.length;v<g;v++){let _=m[v];Ji.isClockWise(_)===!0&&(m[v]=_.reverse())}let f=Ji.triangulateShape(u,m);for(let v=0,g=m.length;v<g;v++){let _=m[v];u=u.concat(_)}for(let v=0,g=u.length;v<g;v++){let _=u[v];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let v=0,g=f.length;v<g;v++){let _=f[v],M=_[0]+p,T=_[1]+p,S=_[2]+p;n.push(M,T,S),c+=3}}this.setIndex(n),this.setAttribute("position",new Ke(r,3)),this.setAttribute("normal",new Ke(s,3)),this.setAttribute("uv",new Ke(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return f_(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function f_(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var Zs=class i extends Pt{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],p=new P,d=new P,u=[],m=[],f=[],v=[];for(let g=0;g<=n;g++){let _=[],M=g/n,T=a+M*o,S=e*Math.cos(T),b=Math.sqrt(e*e-S*S),I=0;g===0&&a===0?I=.5/t:g===n&&c===Math.PI&&(I=-.5/t);for(let U=0;U<=t;U++){let z=U/t,N=r+z*s;p.x=-b*Math.cos(N),p.y=S,p.z=b*Math.sin(N),m.push(p.x,p.y,p.z),d.copy(p).normalize(),f.push(d.x,d.y,d.z),v.push(z+I,1-M),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let M=h[g][_+1],T=h[g][_],S=h[g+1][_],b=h[g+1][_+1];(g!==0||a>0)&&u.push(M,T,b),(g!==n-1||c<Math.PI)&&u.push(T,S,b)}this.setIndex(u),this.setAttribute("position",new Ke(m,3)),this.setAttribute("normal",new Ke(f,3)),this.setAttribute("uv",new Ke(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Rl=class i extends Gr{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Cl=class i extends Pt{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI,a=0,o=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let c=[],l=[],h=[],p=[],d=new P,u=new P,m=new P;for(let f=0;f<=n;f++){let v=a+f/n*o;for(let g=0;g<=r;g++){let _=g/r*s;u.x=(e+t*Math.cos(v))*Math.cos(_),u.y=(e+t*Math.cos(v))*Math.sin(_),u.z=t*Math.sin(v),l.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),m.subVectors(u,d).normalize(),h.push(m.x,m.y,m.z),p.push(g/r),p.push(f/n)}}for(let f=1;f<=n;f++)for(let v=1;v<=r;v++){let g=(r+1)*f+v-1,_=(r+1)*(f-1)+v-1,M=(r+1)*(f-1)+v,T=(r+1)*f+v;c.push(g,_,T),c.push(_,M,T)}this.setIndex(c),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},Il=class i extends Pt{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],c=[],l=[],h=[],p=new P,d=new P,u=new P,m=new P,f=new P,v=new P,g=new P;for(let M=0;M<=n;++M){let T=M/n*s*Math.PI*2;_(T,s,a,e,u),_(T+.01,s,a,e,m),v.subVectors(m,u),g.addVectors(m,u),f.crossVectors(v,g),g.crossVectors(f,v),f.normalize(),g.normalize();for(let S=0;S<=r;++S){let b=S/r*Math.PI*2,I=-t*Math.cos(b),U=t*Math.sin(b);p.x=u.x+(I*g.x+U*f.x),p.y=u.y+(I*g.y+U*f.y),p.z=u.z+(I*g.z+U*f.z),c.push(p.x,p.y,p.z),d.subVectors(p,u).normalize(),l.push(d.x,d.y,d.z),h.push(M/n),h.push(S/r)}}for(let M=1;M<=n;M++)for(let T=1;T<=r;T++){let S=(r+1)*(M-1)+(T-1),b=(r+1)*M+(T-1),I=(r+1)*M+T,U=(r+1)*(M-1)+T;o.push(S,b,U),o.push(b,I,U)}function _(M,T,S,b,I){let U=Math.cos(M),z=Math.sin(M),N=S/T*M,j=Math.cos(N);I.x=b*(2+j)*.5*U,I.y=b*(2+j)*z*.5,I.z=b*Math.sin(N)*.5}this.setIndex(o),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(l,3)),this.setAttribute("uv",new Ke(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Pl=class i extends Pt{constructor(e=new Ha(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,c=new P,l=new pe,h=new P,p=[],d=[],u=[],m=[];function f(v){h=e.getPointAt(v/t,h);let g=a.normals[v],_=a.binormals[v];for(let M=0;M<=r;M++){let T=M/r*Math.PI*2,S=Math.sin(T),b=-Math.cos(T);c.x=b*g.x+S*_.x,c.y=b*g.y+S*_.y,c.z=b*g.z+S*_.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,p.push(o.x,o.y,o.z)}}(function(){for(let v=0;v<t;v++)f(v);f(s===!1?t:0),(function(){for(let v=0;v<=t;v++)for(let g=0;g<=r;g++)l.x=v/t,l.y=g/r,u.push(l.x,l.y)})(),(function(){for(let v=1;v<=t;v++)for(let g=1;g<=r;g++){let _=(r+1)*(v-1)+(g-1),M=(r+1)*v+(g-1),T=(r+1)*v+g,S=(r+1)*(v-1)+g;m.push(_,M,S),m.push(M,T,S)}})()})(),this.setIndex(m),this.setAttribute("position",new Ke(p,3)),this.setAttribute("normal",new Ke(d,3)),this.setAttribute("uv",new Ke(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new yl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Ll=class extends Pt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new P,s=new P;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let p=c[l],d=p.start;for(let u=d,m=d+p.count;u<m;u+=3)for(let f=0;f<3;f++){let v=o.getX(u+f),g=o.getX(u+(f+1)%3);r.fromBufferAttribute(a,v),s.fromBufferAttribute(a,g),jp(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,p=3*o+(l+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,p),jp(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ke(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function jp(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var UM=Object.freeze({__proto__:null,BoxGeometry:rs,CapsuleGeometry:ul,CircleGeometry:dl,ConeGeometry:pl,CylinderGeometry:za,DodecahedronGeometry:fl,EdgesGeometry:ml,ExtrudeGeometry:Ml,IcosahedronGeometry:bl,LatheGeometry:Tl,OctahedronGeometry:El,PlaneGeometry:$s,PolyhedronGeometry:Gr,RingGeometry:wl,ShapeGeometry:Al,SphereGeometry:Zs,TetrahedronGeometry:Rl,TorusGeometry:Cl,TorusKnotGeometry:Il,TubeGeometry:Pl,WireframeGeometry:Ll});function ds(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(Yp(r))r.isRenderTargetTexture?(tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Yp(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function ii(i){let e={};for(let t=0;t<i.length;t++){let n=ds(i[t]);for(let r in n)e[r]=n[r]}return e}function Yp(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function m_(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ou(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Lt.workingColorSpace}var Zf={clone:ds,merge:ii},g_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,__=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,In=class extends Qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=g_,this.fragmentShader=__,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ds(e.uniforms),this.uniformsGroups=m_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new _t().setHex(r.value);break;case"v2":this.uniforms[n].value=new pe().fromArray(r.value);break;case"v3":this.uniforms[n].value=new P().fromArray(r.value);break;case"v4":this.uniforms[n].value=new on().fromArray(r.value);break;case"m3":this.uniforms[n].value=new ft().fromArray(r.value);break;case"m4":this.uniforms[n].value=new St().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Nl=class extends In{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Dl=class extends Qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ul=class extends Qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Za=class extends ns{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ks(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function bh(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Hr=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ol=class extends Hr{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,o=2*t-n;break;case 2402:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+r[1]-r[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(n-t)/(r-t),f=m*m,v=f*m,g=-d*v+2*d*f-d*m,_=(1+d)*v+(-1.5-2*d)*f+(-.5+d)*m+1,M=(-1-u)*v+(1.5+u)*f+.5*m,T=u*v-u*f;for(let S=0;S!==o;++S)s[S]=g*a[h+S]+_*a[l+S]+M*a[c+S]+T*a[p+S];return s}},Fl=class extends Hr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(r-t),p=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*p+a[c+d]*h;return s}},Bl=class extends Hr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},zl=class extends Hr{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let m=(n-t)/(r-t),f=1-m;for(let v=0;v!==o;++v)s[v]=a[l+v]*f+a[c+v]*m;return s}let d=2*o,u=e-1;for(let m=0;m!==o;++m){let f=a[l+m],v=a[c+m],g=u*d+2*m,_=p[g],M=p[g+1],T=e*d+2*m,S=h[T],b=h[T+1],I=x_(n,t,_,S,r);s[m]=Jf(I,f,M,b,v)}return s}};function Jf(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function v_(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function x_(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=Jf(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let c=v_(s,e,t,n,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}var bi=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ks(t,this.TimeBufferType),this.values=ks(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ks(e.times,Array),values:ks(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),bh(e.settings)&&(n.settings={inTangents:ks(e.settings.inTangents,Array),outTangents:ks(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Bl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Fl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ol(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new zl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return tt("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;bh(this.settings)&&($p(this.settings.inTangents,e),$p(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(st("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(st("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){st("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){st("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(r!==void 0&&S0(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){st("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===2302,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(r)c=!0;else{let h=o*n,p=h-n,d=h+n;for(let u=0;u!==n;++u){let m=t[h+u];if(m!==t[p+u]||m!==t[d+u]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,p=a*n;for(let d=0;d!==n;++d)t[p+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,bh(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function $p(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}bi.prototype.ValueTypeName="",bi.prototype.TimeBufferType=Float32Array,bi.prototype.ValueBufferType=Float32Array,bi.prototype.DefaultInterpolation=2301;var Or=class extends bi{constructor(e,t,n){super(e,t,n)}};Or.prototype.ValueTypeName="bool",Or.prototype.ValueBufferType=Array,Or.prototype.DefaultInterpolation=2300,Or.prototype.InterpolantFactoryMethodLinear=void 0,Or.prototype.InterpolantFactoryMethodSmooth=void 0;var kl=class extends bi{constructor(e,t,n,r){super(e,t,n,r)}};kl.prototype.ValueTypeName="color";var Vl=class extends bi{constructor(e,t,n,r){super(e,t,n,r)}};Vl.prototype.ValueTypeName="number";var Gl=class extends Hr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(r-t),l=e*o;for(let h=l+o;l!==h;l+=4)Ci.slerpFlat(s,0,a,l-o,a,l,c);return s}},Ja=class extends bi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Gl(this.times,this.values,this.getValueSize(),e)}};Ja.prototype.ValueTypeName="quaternion",Ja.prototype.InterpolantFactoryMethodSmooth=void 0;var Fr=class extends bi{constructor(e,t,n){super(e,t,n)}};Fr.prototype.ValueTypeName="string",Fr.prototype.ValueBufferType=Array,Fr.prototype.DefaultInterpolation=2300,Fr.prototype.InterpolantFactoryMethodLinear=void 0,Fr.prototype.InterpolantFactoryMethodSmooth=void 0;var Hl=class extends bi{constructor(e,t,n,r){super(e,t,n,r)}};Hl.prototype.ValueTypeName="vector";var Wl=class{constructor(e,t,n){let r=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){c++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,c),o===c&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,p){return l.push(h,p),this},this.removeHandler=function(h){let p=l.indexOf(h);return p!==-1&&l.splice(p,2),this},this.getHandler=function(h){for(let p=0,d=l.length;p<d;p+=2){let u=l[p],m=l[p+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Kf=new Wl,Xl=class{constructor(e){this.manager=e!==void 0?e:Kf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Xl.DEFAULT_MATERIAL_NAME="__DEFAULT";var OM=new St,FM=new P,BM=new P;var Ko=new P,Qo=new Ci,Yi=new P,Js=class extends ci{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ko,Qo,Yi),Yi.x===1&&Yi.y===1&&Yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ko,Qo,Yi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ko,Qo,Yi),Yi.x===1&&Yi.y===1&&Yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ko,Qo,Yi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ur=new P,Zp=new pe,Jp=new pe,Qn=class extends Js{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*tl*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*el*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*tl*Math.atan(Math.tan(.5*el*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ur.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ur.x,Ur.y).multiplyScalar(-e/Ur.z),Ur.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ur.x,Ur.y).multiplyScalar(-e/Ur.z)}getViewSize(e,t){return this.getViewBounds(e,Zp,Jp),t.subVectors(Jp,Zp)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*el*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ka=class extends Js{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var zM=new St,kM=new St,VM=new St;var ql=class extends ci{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Qn(-90,1,e,t);r.layers=this.layers,this.add(r);let s=new Qn(-90,1,e,t);s.layers=this.layers,this.add(s);let a=new Qn(-90,1,e,t);a.layers=this.layers,this.add(a);let o=new Qn(-90,1,e,t);o.layers=this.layers,this.add(o);let c=new Qn(-90,1,e,t);c.layers=this.layers,this.add(c);let l=new Qn(-90,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==2001)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;v=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=f,e.setRenderTarget(n,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,d,u),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},jl=class extends Qn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Qa=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=y_.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function y_(){this._document.hidden===!1&&this.reset()}var GM=new P,HM=new Ci,WM=new P,XM=new P,qM=new P;var jM=new P,YM=new Ci,$M=new P,ZM=new P;var S_=new RegExp("[\\[\\]\\.:\\/]","g"),Fu="[^\\[\\]\\.:\\/]",M_="[^"+"\\[\\]\\.:\\/".replace("\\.","")+"]",b_=/((?:WC+[\/:])*)/.source.replace("WC",Fu),T_=/(WCOD+)?/.source.replace("WCOD",M_),E_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fu),w_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fu),A_=new RegExp("^"+b_+T_+E_+w_+"$"),R_=["material","materials","bones","map"],Ch=class{constructor(e,t,n){let r=n||un.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},un=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(S_,"")}static parseTrackName(e){let t=A_.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);R_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void tt("PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void st("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void st("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void st("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void st("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void st("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void st("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void st("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[r];if(a===void 0)return void st("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+r+" but it wasn't found.",e);let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void st("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void st("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};un.Composite=Ch,un.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},un.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},un.prototype.GetterByBindingType=[un.prototype._getValue_direct,un.prototype._getValue_array,un.prototype._getValue_arrayElement,un.prototype._getValue_toArray],un.prototype.SetterByBindingTypeAndVersioning=[[un.prototype._setValue_direct,un.prototype._setValue_direct_setNeedsUpdate,un.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[un.prototype._setValue_array,un.prototype._setValue_array_setNeedsUpdate,un.prototype._setValue_array_setMatrixWorldNeedsUpdate],[un.prototype._setValue_arrayElement,un.prototype._setValue_arrayElement_setNeedsUpdate,un.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[un.prototype._setValue_fromArray,un.prototype._setValue_fromArray_setNeedsUpdate,un.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var JM=new Float32Array(1);var KM=new St;var Hu=class Hu{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};Hu.prototype.isMatrix2=!0;var Ih=Hu,QM=new pe;var eb=new P,tb=new P,nb=new P,ib=new P,rb=new P,sb=new P,ab=new P;var ob=new P;var lb=new P,cb=new St,hb=new St;var ub=new P,db=new _t,pb=new _t;var fb=new P,mb=new P,gb=new P;var _b=new P,vb=new Js;var xb=new zi;var yb=new P;function Bu(i,e,t,n){let r=C_(n);switch(t){case 1021:return i*e;case 1028:case 1029:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case 1023:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:case 37496:case 37490:case 37491:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function C_(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}})),typeof window<"u"&&(window.__THREE__?tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function ym(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function P_(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=i.createBuffer(),p;if(i.bindBuffer(a,h),i.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)p=i.HALF_FLOAT;else if(o instanceof Uint16Array)p=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)p=i.SHORT;else if(o instanceof Uint32Array)p=i.UNSIGNED_INT;else if(o instanceof Int32Array)p=i.INT;else if(o instanceof Int8Array)p=i.BYTE;else if(o instanceof Uint8Array)p=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);p=i.UNSIGNED_BYTE}return{buffer:h,type:p,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(i.bindBuffer(o,s),l.length===0)i.bufferSubData(o,0,c);else{l.sort((p,d)=>p.start-d.start);let h=0;for(let p=1;p<l.length;p++){let d=l[h],u=l[p];u.start<=d.start+d.count+1?d.count=Math.max(d.count,u.start+u.count-d.start):(++h,l[h]=u)}l.length=h+1;for(let p=0,d=l.length;p<d;p++){let u=l[p];i.bufferSubData(o,u.start*c.BYTES_PER_ELEMENT,c,u.start,u.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var L_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,N_=`#ifdef USE_ALPHAHASH
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
#endif`,D_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,U_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,O_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,F_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,B_=`#ifdef USE_AOMAP
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
#endif`,z_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,k_=`#ifdef USE_BATCHING
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
#endif`,V_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,G_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,H_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,W_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,X_=`#ifdef USE_IRIDESCENCE
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
#endif`,q_=`#ifdef USE_BUMPMAP
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
#endif`,j_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Y_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Z_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,J_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,K_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Q_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ev=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,tv=`#define PI 3.141592653589793
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
} // validated`,nv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,iv=`vec3 transformedNormal = objectNormal;
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
#endif`,rv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,av=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ov=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lv="gl_FragColor = linearToOutputTexel( gl_FragColor );",cv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hv=`#ifdef USE_ENVMAP
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
#endif`,uv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,dv=`#ifdef USE_ENVMAP
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
#endif`,pv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fv=`#ifdef USE_ENVMAP
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
#endif`,mv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_v=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xv=`#ifdef USE_GRADIENTMAP
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
}`,yv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Tv=`#ifdef USE_ENVMAP
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
#endif`,Ev=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Av=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cv=`PhysicalMaterial material;
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
#endif`,Iv=`uniform sampler2D dfgLUT;
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
}`,Pv=`
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
#endif`,Lv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Nv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dv=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Uv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ov=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gv=`#if defined( USE_POINTS_UV )
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
#endif`,Hv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yv=`#ifdef USE_MORPHTARGETS
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
#endif`,$v=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Kv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ex=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,tx=`#ifdef USE_NORMALMAP
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
#endif`,nx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ix=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ax=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ox=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,lx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ux=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,px=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_x=`float getShadowMask() {
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
}`,vx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xx=`#ifdef USE_SKINNING
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
#endif`,yx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sx=`#ifdef USE_SKINNING
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
#endif`,Mx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ex=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wx=`#ifdef USE_TRANSMISSION
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
#endif`,Ax=`#ifdef USE_TRANSMISSION
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
#endif`,Rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Px=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Lx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nx=`uniform sampler2D t2D;
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
}`,Dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ux=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bx=`#include <common>
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
}`,zx=`#if DEPTH_PACKING == 3200
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
}`,kx=`#define DISTANCE
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
}`,Vx=`#define DISTANCE
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
}`,Gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wx=`uniform float scale;
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
}`,Xx=`uniform vec3 diffuse;
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
}`,qx=`#include <common>
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
}`,jx=`uniform vec3 diffuse;
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
}`,Yx=`#define LAMBERT
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
}`,$x=`#define LAMBERT
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
}`,Zx=`#define MATCAP
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
}`,Jx=`#define MATCAP
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
}`,Kx=`#define NORMAL
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
}`,Qx=`#define NORMAL
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
}`,ey=`#define PHONG
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
}`,ty=`#define PHONG
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
}`,ny=`#define STANDARD
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
}`,iy=`#define STANDARD
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
}`,ry=`#define TOON
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
}`,sy=`#define TOON
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
}`,ay=`uniform float size;
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
}`,oy=`uniform vec3 diffuse;
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
}`,ly=`#include <common>
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
}`,cy=`uniform vec3 color;
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
}`,hy=`uniform float rotation;
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
}`,uy=`uniform vec3 diffuse;
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
}`,Et={alphahash_fragment:L_,alphahash_pars_fragment:N_,alphamap_fragment:D_,alphamap_pars_fragment:U_,alphatest_fragment:O_,alphatest_pars_fragment:F_,aomap_fragment:B_,aomap_pars_fragment:z_,batching_pars_vertex:k_,batching_vertex:V_,begin_vertex:G_,beginnormal_vertex:H_,bsdfs:W_,iridescence_fragment:X_,bumpmap_pars_fragment:q_,clipping_planes_fragment:j_,clipping_planes_pars_fragment:Y_,clipping_planes_pars_vertex:$_,clipping_planes_vertex:Z_,color_fragment:J_,color_pars_fragment:K_,color_pars_vertex:Q_,color_vertex:ev,common:tv,cube_uv_reflection_fragment:nv,defaultnormal_vertex:iv,displacementmap_pars_vertex:rv,displacementmap_vertex:sv,emissivemap_fragment:av,emissivemap_pars_fragment:ov,colorspace_fragment:lv,colorspace_pars_fragment:cv,envmap_fragment:hv,envmap_common_pars_fragment:uv,envmap_pars_fragment:dv,envmap_pars_vertex:pv,envmap_physical_pars_fragment:Tv,envmap_vertex:fv,fog_vertex:mv,fog_pars_vertex:gv,fog_fragment:_v,fog_pars_fragment:vv,gradientmap_pars_fragment:xv,lightmap_pars_fragment:yv,lights_lambert_fragment:Sv,lights_lambert_pars_fragment:Mv,lights_pars_begin:bv,lights_toon_fragment:Ev,lights_toon_pars_fragment:wv,lights_phong_fragment:Av,lights_phong_pars_fragment:Rv,lights_physical_fragment:Cv,lights_physical_pars_fragment:Iv,lights_fragment_begin:Pv,lights_fragment_maps:Lv,lights_fragment_end:Nv,lightprobes_pars_fragment:Dv,logdepthbuf_fragment:Uv,logdepthbuf_pars_fragment:Ov,logdepthbuf_pars_vertex:Fv,logdepthbuf_vertex:Bv,map_fragment:zv,map_pars_fragment:kv,map_particle_fragment:Vv,map_particle_pars_fragment:Gv,metalnessmap_fragment:Hv,metalnessmap_pars_fragment:Wv,morphinstance_vertex:Xv,morphcolor_vertex:qv,morphnormal_vertex:jv,morphtarget_pars_vertex:Yv,morphtarget_vertex:$v,normal_fragment_begin:Zv,normal_fragment_maps:Jv,normal_pars_fragment:Kv,normal_pars_vertex:Qv,normal_vertex:ex,normalmap_pars_fragment:tx,clearcoat_normal_fragment_begin:nx,clearcoat_normal_fragment_maps:ix,clearcoat_pars_fragment:rx,iridescence_pars_fragment:sx,opaque_fragment:ax,packing:ox,premultiplied_alpha_fragment:lx,project_vertex:cx,dithering_fragment:hx,dithering_pars_fragment:ux,roughnessmap_fragment:dx,roughnessmap_pars_fragment:px,shadowmap_pars_fragment:fx,shadowmap_pars_vertex:mx,shadowmap_vertex:gx,shadowmask_pars_fragment:_x,skinbase_vertex:vx,skinning_pars_vertex:xx,skinning_vertex:yx,skinnormal_vertex:Sx,specularmap_fragment:Mx,specularmap_pars_fragment:bx,tonemapping_fragment:Tx,tonemapping_pars_fragment:Ex,transmission_fragment:wx,transmission_pars_fragment:Ax,uv_pars_fragment:Rx,uv_pars_vertex:Cx,uv_vertex:Ix,worldpos_vertex:Px,background_vert:Lx,background_frag:Nx,backgroundCube_vert:Dx,backgroundCube_frag:Ux,cube_vert:Ox,cube_frag:Fx,depth_vert:Bx,depth_frag:zx,distance_vert:kx,distance_frag:Vx,equirect_vert:Gx,equirect_frag:Hx,linedashed_vert:Wx,linedashed_frag:Xx,meshbasic_vert:qx,meshbasic_frag:jx,meshlambert_vert:Yx,meshlambert_frag:$x,meshmatcap_vert:Zx,meshmatcap_frag:Jx,meshnormal_vert:Kx,meshnormal_frag:Qx,meshphong_vert:ey,meshphong_frag:ty,meshphysical_vert:ny,meshphysical_frag:iy,meshtoon_vert:ry,meshtoon_frag:sy,points_vert:ay,points_frag:oy,shadow_vert:ly,shadow_frag:cy,sprite_vert:hy,sprite_frag:uy},Re={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ft}},envmap:{envMap:{value:null},envMapRotation:{value:new ft},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ft},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0},uvTransform:{value:new ft}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}}},ar={basic:{uniforms:ii([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:Et.meshbasic_vert,fragmentShader:Et.meshbasic_frag},lambert:{uniforms:ii([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new _t(0)},envMapIntensity:{value:1}}]),vertexShader:Et.meshlambert_vert,fragmentShader:Et.meshlambert_frag},phong:{uniforms:ii([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Et.meshphong_vert,fragmentShader:Et.meshphong_frag},standard:{uniforms:ii([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Et.meshphysical_vert,fragmentShader:Et.meshphysical_frag},toon:{uniforms:ii([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new _t(0)}}]),vertexShader:Et.meshtoon_vert,fragmentShader:Et.meshtoon_frag},matcap:{uniforms:ii([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:Et.meshmatcap_vert,fragmentShader:Et.meshmatcap_frag},points:{uniforms:ii([Re.points,Re.fog]),vertexShader:Et.points_vert,fragmentShader:Et.points_frag},dashed:{uniforms:ii([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Et.linedashed_vert,fragmentShader:Et.linedashed_frag},depth:{uniforms:ii([Re.common,Re.displacementmap]),vertexShader:Et.depth_vert,fragmentShader:Et.depth_frag},normal:{uniforms:ii([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:Et.meshnormal_vert,fragmentShader:Et.meshnormal_frag},sprite:{uniforms:ii([Re.sprite,Re.fog]),vertexShader:Et.sprite_vert,fragmentShader:Et.sprite_frag},background:{uniforms:{uvTransform:{value:new ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Et.background_vert,fragmentShader:Et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ft}},vertexShader:Et.backgroundCube_vert,fragmentShader:Et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Et.cube_vert,fragmentShader:Et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Et.equirect_vert,fragmentShader:Et.equirect_frag},distance:{uniforms:ii([Re.common,Re.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Et.distance_vert,fragmentShader:Et.distance_frag},shadow:{uniforms:ii([Re.lights,Re.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:Et.shadow_vert,fragmentShader:Et.shadow_frag}};ar.physical={uniforms:ii([ar.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ft},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ft},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ft},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ft},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ft},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ft},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ft}}]),vertexShader:Et.meshphysical_vert,fragmentShader:Et.meshphysical_frag};var uc={r:0,b:0,g:0},dy=new St,Sm=new ft;function py(i,e,t,n,r,s){let a=new _t(0),o,c,l=r===!0?0:1,h=null,p=0,d=null;function u(f){let v=f.isScene===!0?f.background:null;if(v&&v.isTexture){let g=f.backgroundBlurriness>0;v=e.get(v,g)}return v}function m(f,v){f.getRGB(uc,Ou(i)),t.buffers.color.setClear(uc.r,uc.g,uc.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(f,v=1){a.set(f),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,m(a,l)},render:function(f){let v=!1,g=u(f);g===null?m(a,l):g&&g.isColor&&(m(g,1),v=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,s):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,v){let g=u(v);g&&(g.isCubeTexture||g.mapping===to)?(c===void 0&&(c=new ei(new rs(1,1,1),new In({name:"BackgroundCubeMaterial",uniforms:ds(ar.backgroundCube.uniforms),vertexShader:ar.backgroundCube.vertexShader,fragmentShader:ar.backgroundCube.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,M,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=g,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(dy.makeRotationFromEuler(v.backgroundRotation)).transpose(),g.isCubeTexture&&g.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Sm),c.material.toneMapped=Lt.getTransfer(g.colorSpace)!==ln,h===g&&p===g.version&&d===i.toneMapping||(c.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null)):g&&g.isTexture&&(o===void 0&&(o=new ei(new $s(2,2),new In({name:"BackgroundMaterial",uniforms:ds(ar.background.uniforms),vertexShader:ar.background.vertexShader,fragmentShader:ar.background.fragmentShader,side:Qs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=g,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=Lt.getTransfer(g.colorSpace)!==ln,g.matrixAutoUpdate===!0&&g.updateMatrix(),o.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&p===g.version&&d===i.toneMapping||(o.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),o.layers.enableAll(),f.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function fy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=l(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function c(g){return i.deleteVertexArray(g)}function l(g){let _=[],M=[],T=[];for(let S=0;S<t;S++)_[S]=0,M[S]=0,T[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:M,attributeDivisors:T,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,M=g.length;_<M;_++)g[_]=0}function p(g){d(g,0)}function d(g,_){let M=s.newAttributes,T=s.enabledAttributes,S=s.attributeDivisors;M[g]=1,T[g]===0&&(i.enableVertexAttribArray(g),T[g]=1),S[g]!==_&&(i.vertexAttribDivisor(g,_),S[g]=_)}function u(){let g=s.newAttributes,_=s.enabledAttributes;for(let M=0,T=_.length;M<T;M++)_[M]!==g[M]&&(i.disableVertexAttribArray(M),_[M]=0)}function m(g,_,M,T,S,b,I){I===!0?i.vertexAttribIPointer(g,_,M,S,b):i.vertexAttribPointer(g,_,M,T,S,b)}function f(){v(),a=!0,s!==r&&(s=r,o(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,M,T,S){let b=!1,I=(function(U,z,N,j){let F=j.wireframe===!0,ee=n[z.id];ee===void 0&&(ee={},n[z.id]=ee);let ae=U.isInstancedMesh===!0?U.id:0,re=ee[ae];re===void 0&&(re={},ee[ae]=re);let X=re[N.id];X===void 0&&(X={},re[N.id]=X);let k=X[F];return k===void 0&&(k=l(i.createVertexArray()),X[F]=k),k})(g,T,M,_);s!==I&&(s=I,o(s.object)),b=(function(U,z,N,j){let F=s.attributes,ee=z.attributes,ae=0,re=N.getAttributes();for(let X in re)if(re[X].location>=0){let k=F[X],Q=ee[X];if(Q===void 0&&(X==="instanceMatrix"&&U.instanceMatrix&&(Q=U.instanceMatrix),X==="instanceColor"&&U.instanceColor&&(Q=U.instanceColor)),k===void 0||k.attribute!==Q||Q&&k.data!==Q.data)return!0;ae++}return s.attributesNum!==ae||s.index!==j})(g,T,M,S),b&&(function(U,z,N,j){let F={},ee=z.attributes,ae=0,re=N.getAttributes();for(let X in re)if(re[X].location>=0){let k=ee[X];k===void 0&&(X==="instanceMatrix"&&U.instanceMatrix&&(k=U.instanceMatrix),X==="instanceColor"&&U.instanceColor&&(k=U.instanceColor));let Q={};Q.attribute=k,k&&k.data&&(Q.data=k.data),F[X]=Q,ae++}s.attributes=F,s.attributesNum=ae,s.index=j})(g,T,M,S),S!==null&&e.update(S,i.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(U,z,N,j){h();let F=j.attributes,ee=N.getAttributes(),ae=z.defaultAttributeValues;for(let re in ee){let X=ee[re];if(X.location>=0){let k=F[re];if(k===void 0&&(re==="instanceMatrix"&&U.instanceMatrix&&(k=U.instanceMatrix),re==="instanceColor"&&U.instanceColor&&(k=U.instanceColor)),k!==void 0){let Q=k.normalized,he=k.itemSize,Ie=e.get(k);if(Ie===void 0)continue;let ye=Ie.buffer,Ue=Ie.type,we=Ie.bytesPerElement,ue=Ue===i.INT||Ue===i.UNSIGNED_INT||k.gpuType===Yh;if(k.isInterleavedBufferAttribute){let q=k.data,ie=q.stride,le=k.offset;if(q.isInstancedInterleavedBuffer){for(let oe=0;oe<X.locationSize;oe++)d(X.location+oe,q.meshPerAttribute);U.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let oe=0;oe<X.locationSize;oe++)p(X.location+oe);i.bindBuffer(i.ARRAY_BUFFER,ye);for(let oe=0;oe<X.locationSize;oe++)m(X.location+oe,he/X.locationSize,Ue,Q,ie*we,(le+he/X.locationSize*oe)*we,ue)}else{if(k.isInstancedBufferAttribute){for(let q=0;q<X.locationSize;q++)d(X.location+q,k.meshPerAttribute);U.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let q=0;q<X.locationSize;q++)p(X.location+q);i.bindBuffer(i.ARRAY_BUFFER,ye);for(let q=0;q<X.locationSize;q++)m(X.location+q,he/X.locationSize,Ue,Q,he*we,he/X.locationSize*q*we,ue)}}else if(ae!==void 0){let Q=ae[re];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(X.location,Q);break;case 3:i.vertexAttrib3fv(X.location,Q);break;case 4:i.vertexAttrib4fv(X.location,Q);break;default:i.vertexAttrib1fv(X.location,Q)}}}}u()})(g,_,M,T),S!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(S).buffer))},reset:f,resetDefaultState:v,dispose:function(){f();for(let g in n){let _=n[g];for(let M in _){let T=_[M];for(let S in T){let b=T[S];for(let I in b)c(b[I].object),delete b[I];delete T[S]}}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let M in _){let T=_[M];for(let S in T){let b=T[S];for(let I in b)c(b[I].object),delete b[I];delete T[S]}}delete n[g.id]},releaseStatesOfObject:function(g){for(let _ in n){let M=n[_],T=g.isInstancedMesh===!0?g.id:0,S=M[T];if(S!==void 0){for(let b in S){let I=S[b];for(let U in I)c(I[U].object),delete I[U];delete S[b]}delete M[T],Object.keys(M).length===0&&delete n[_]}}},releaseStatesOfProgram:function(g){for(let _ in n){let M=n[_];for(let T in M){let S=M[T];if(S[g.id]===void 0)continue;let b=S[g.id];for(let I in b)c(b[I].object),delete b[I];delete S[g.id]}}},initAttributes:h,enableAttribute:p,disableUnusedAttributes:u}}function my(i,e,t){let n;this.setMode=function(r){n=r},this.render=function(r,s){i.drawArrays(n,r,s),t.update(s,n,1)},this.renderInstances=function(r,s,a){a!==0&&(i.drawArraysInstanced(n,r,s,a),t.update(s,n,a))},this.renderMultiDraw=function(r,s,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,s,0,a);let o=0;for(let c=0;c<a;c++)o+=s[c];t.update(o,n,1)}}function gy(i,e,t,n){let r;function s(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(tt("WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&l===!1&&tt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let h=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(h){return h===rr||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let p=h===ir&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==Hi&&h!==Pi&&!p&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:i.getParameter(i.MAX_SAMPLES),samples:i.getParameter(i.SAMPLES)}}function _y(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Bi,o=new ft,c={value:null,needsUpdate:!1};function l(h,p,d,u){let m=h!==null?h.length:0,f=null;if(m!==0){if(f=c.value,u!==!0||f===null){let v=d+4*m,g=p.matrixWorldInverse;o.getNormalMatrix(g),(f===null||f.length<v)&&(f=new Float32Array(v));for(let _=0,M=d;_!==m;++_,M+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(f,M),f[M+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let d=h.length!==0||p||n!==0||r;return r=p,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=l(h,p,0)},this.setState=function(h,p,d){let u=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,v=i.get(h);if(!r||u===null||u.length===0||s&&!f)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,M=v.clippingState||null;c.value=M,M=l(u,p,_,d);for(let T=0;T!==_;++T)M[T]=t[T];v.clippingState=M,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}Sm.set(-1,0,0,0,1,0,0,0,1);var so=new Ka,Qf=new _t,Wu=null,Xu=0,qu=0,ju=!1,vy=new P,ps=new P,pc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=vy}=s;Wu=this._renderer.getRenderTarget(),Xu=this._renderer.getActiveCubeFace(),qu=this._renderer.getActiveMipmapLevel(),ju=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wu,Xu,qu),this._renderer.xr.enabled=ju,e.scissorTest=!1,ia(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ta||e.mapping===as?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wu=this._renderer.getRenderTarget(),Xu=this._renderer.getActiveCubeFace(),qu=this._renderer.getActiveMipmapLevel(),ju=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ni,minFilter:ni,generateMipmaps:!1,type:ir,format:rr,colorSpace:oc,depthBuffer:!1},r=em(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=em(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=xy(s)),this._blurMaterial=Sy(s,e,t),this._ggxMaterial=yy(s,e,t)}return r}_compileMaterial(e){let t=new ei(new Pt,e);this._renderer.compile(t,so)}_sceneToCubeUV(e,t,n,r,s){let a=new Qn(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,p=l.toneMapping;l.getClearColor(Qf),l.toneMapping=Vi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(r),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ei(new rs,new Oa({name:"PMREM.Background",side:ti,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,m=!1,f=e.background;f?f.isColor&&(u.color.copy(f),e.background=null,m=!0):(u.color.copy(Qf),m=!0);for(let v=0;v<6;v++){let g=v%3;g===0?(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[v],s.y,s.z)):g===1?(a.up.set(0,0,o[v]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[v],s.z)):(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[v]));let _=this._cubeSize;ia(r,g*_,v>2?_:0,_,_),l.setRenderTarget(r),m&&l.render(d,a),l.render(e,a)}l.toneMapping=p,l.autoClear=h,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===ta||e.mapping===as;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=nm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tm());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s,s.uniforms.envMap.value=e;let o=this._cubeSize;ia(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,so)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-h*h)*(1.25*l),{_lodMax:d}=this,u=this._sizeLods[n],m=3*u*(n>d-4?n-d+4:0),f=4*(this._cubeSize-u);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=d-t,ia(s,m,f,3*u,2*u),r.setRenderTarget(s),r.render(o,so),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=d-n,ia(e,m,f,3*u,2*u),r.setRenderTarget(e),r.render(o,so)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[r];ia(t,3*h*(r>this._lodMax-4?r-this._lodMax+4:0),4*(this._cubeSize-h),3*h,2*h),a.setRenderTarget(t),a.render(c,so)}};function xy(i){let e=[],t=[],n=i,r=i-4+1+6;for(let s=0;s<r;s++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],p=6,d=6,u=3,m=new Float32Array(u*d*p),f=new Float32Array(u*d*p);for(let g=0;g<p;g++){let _=g%3*2/3-1,M=g>2?0:-1,T=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];m.set(T,u*d*g);for(let S=0;S<d;S++){let b=2*h[2*S]-1,I=2*h[2*S+1]-1;g===0?ps.set(1,I,b):g===1?ps.set(-b,1,-I):g===2?ps.set(-b,I,1):g===3?ps.set(-1,I,-b):g===4?ps.set(-b,-1,I):ps.set(b,I,-1),ps.toArray(f,(g*d+S)*u)}}let v=new Pt;v.setAttribute("position",new Dt(m,u)),v.setAttribute("outputDirection",new Dt(f,u)),t.push(new ei(v,null)),n>4&&n--}return{lodMeshes:t,sizeLods:e}}function em(i,e,t){let n=new gi(i,e,t);return n.texture.mapping=to,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ia(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function yy(i,e,t){return new In({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:gc(),fragmentShader:`

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
		`,blending:nr,depthTest:!1,depthWrite:!1})}function Sy(i,e,t){return new In({name:"SphericalGaussianBlur",defines:{SAMPLES:20,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:gc(),fragmentShader:`

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
		`,blending:nr,depthTest:!1,depthWrite:!1})}function tm(){return new In({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gc(),fragmentShader:`

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
		`,blending:nr,depthTest:!1,depthWrite:!1})}function nm(){return new In({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:nr,depthTest:!1,depthWrite:!1})}function gc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var fc=class extends gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Fa(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new rs(5,5,5),s=new In({name:"CubemapFromEquirect",uniforms:ds(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ti,blending:nr});s.uniforms.tEquirect.value=t;let a=new ei(r,s),o=t.minFilter;return t.minFilter===os&&(t.minFilter=ni),new ql(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function My(i){let e=new WeakMap,t=new WeakMap,n=null;function r(o,c){return c===Zl?o.mapping=ta:c===Jl&&(o.mapping=as),o}function s(o){let c=o.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(o){let c=o.target;c.removeEventListener("dispose",a);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}return{get:function(o,c=!1){return o==null?null:c?(function(l){if(l&&l.isTexture){let h=l.mapping,p=h===Zl||h===Jl,d=h===ta||h===as;if(p||d){let u=t.get(l),m=u!==void 0?u.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return n===null&&(n=new pc(i)),u=p?n.fromEquirectangular(l,u):n.fromCubemap(l,u),u.texture.pmremVersion=l.pmremVersion,t.set(l,u),u.texture;if(u!==void 0)return u.texture;{let f=l.image;return p&&f&&f.height>0||d&&f&&(function(v){let g=0,_=6;for(let M=0;M<_;M++)v[M]!==void 0&&g++;return g===_})(f)?(n===null&&(n=new pc(i)),u=p?n.fromEquirectangular(l):n.fromCubemap(l),u.texture.pmremVersion=l.pmremVersion,t.set(l,u),l.addEventListener("dispose",a),u.texture):null}}}return l})(o):(function(l){if(l&&l.isTexture){let h=l.mapping;if(h===Zl||h===Jl){if(e.has(l))return r(e.get(l).texture,l.mapping);{let p=l.image;if(p&&p.height>0){let d=new fc(p.height);return d.fromEquirectangularTexture(i,l),e.set(l,d),l.addEventListener("dispose",s),r(d.texture,l.mapping)}return null}}}return l})(o)},dispose:function(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function by(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Qr("WebGLRenderer: "+n+" extension not supported."),r}}}function Ty(i,e,t,n){let r={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let p in l.attributes)e.remove(l.attributes[p]);l.removeEventListener("dispose",a),delete r[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,p=c.attributes.position,d=0;if(p===void 0)return;if(h!==null){let f=h.array;d=h.version;for(let v=0,g=f.length;v<g;v+=3){let _=f[v+0],M=f[v+1],T=f[v+2];l.push(_,M,M,T,T,_)}}else{let f=p.array;d=p.version;for(let v=0,g=f.length/3-1;v<g;v+=3){let _=v+0,M=v+1,T=v+2;l.push(_,M,M,T,T,_)}}let u=new(p.count>=65535?Na:La)(l,1);u.version=d;let m=s.get(c);m&&e.remove(m),s.set(c,u)}return{get:function(c,l){return r[l.id]===!0||(l.addEventListener("dispose",a),r[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Ey(i,e,t){let n,r,s;this.setMode=function(a){n=a},this.setIndex=function(a){r=a.type,s=a.bytesPerElement},this.render=function(a,o){i.drawElements(n,o,r,a*s),t.update(o,n,1)},this.renderInstances=function(a,o,c){c!==0&&(i.drawElementsInstanced(n,o,r,a*s,c),t.update(o,n,c))},this.renderMultiDraw=function(a,o,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,o,0,r,a,0,c);let l=0;for(let h=0;h<c;h++)l+=o[h];t.update(l,n,1)}}function wy(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:st("WebGLInfo: Unknown draw mode:",n)}}}}function Ay(i,e,t){let n=new WeakMap,r=new on;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,p=n.get(a);if(p===void 0||p.count!==h){p!==void 0&&p.texture.dispose();let d=a.morphAttributes.position!==void 0,u=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),u===!0&&(_=2),m===!0&&(_=3);let M=a.attributes.position.count*_,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let S=new Float32Array(M*T*4*h),b=new Ca(S,M,T,h);b.type=Pi,b.needsUpdate=!0;let I=4*_;for(let U=0;U<h;U++){let z=f[U],N=v[U],j=g[U],F=M*T*4*U;for(let ee=0;ee<z.count;ee++){let ae=ee*I;d===!0&&(r.fromBufferAttribute(z,ee),S[F+ae+0]=r.x,S[F+ae+1]=r.y,S[F+ae+2]=r.z,S[F+ae+3]=0),u===!0&&(r.fromBufferAttribute(N,ee),S[F+ae+4]=r.x,S[F+ae+5]=r.y,S[F+ae+6]=r.z,S[F+ae+7]=0),m===!0&&(r.fromBufferAttribute(j,ee),S[F+ae+8]=r.x,S[F+ae+9]=r.y,S[F+ae+10]=r.z,S[F+ae+11]=j.itemSize===4?r.w:1)}}p={count:h,texture:b,size:new pe(M,T)},n.set(a,p),a.addEventListener("dispose",function U(){b.dispose(),n.delete(a),a.removeEventListener("dispose",U)})}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let d=0;for(let m=0;m<c.length;m++)d+=c[m];let u=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",u),o.getUniforms().setValue(i,"morphTargetInfluences",c)}o.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}}}function Ry(i,e,t,n,r){let s=new WeakMap;function a(o){let c=o.target;c.removeEventListener("dispose",a),n.releaseStatesOfObject(c),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:function(o){let c=r.render.frame,l=o.geometry,h=e.get(o,l);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==c&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,c))),o.isSkinnedMesh){let p=o.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return h},dispose:function(){s=new WeakMap}}}var Cy={[Vh]:"LINEAR_TONE_MAPPING",[Gh]:"REINHARD_TONE_MAPPING",[Hh]:"CINEON_TONE_MAPPING",[Wh]:"ACES_FILMIC_TONE_MAPPING",[qh]:"AGX_TONE_MAPPING",[jh]:"NEUTRAL_TONE_MAPPING",[Xh]:"CUSTOM_TONE_MAPPING"};function Iy(i,e,t,n,r,s){let a=new gi(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Pt;l.setAttribute("position",new Ke([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ke([0,2,0,0,2,0],2));let h=new Nl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new ei(l,h),d=new Ka(-1,1,1,-1,0,1),u,m=null,f=null,v=!1,g=null,_=[],M=!1;this.setSize=function(T,S){a.setSize(T,S),o!==null&&o.setSize(T,S),c!==null&&c.setSize(T,S);for(let b=0;b<_.length;b++){let I=_[b];I.setSize&&I.setSize(T,S)}},this.setEffects=function(T){_=T,M=_.length>0&&_[0].isRenderPass===!0;let S=a.width,b=a.height;_.length>0&&o===null&&(o=new gi(S,b,{type:ir,depthBuffer:!1,stencilBuffer:!1}),c=new gi(S,b,{type:ir,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<_.length;I++){let U=_[I];U.setSize&&U.setSize(S,b)}},this.begin=function(T,S){if(v||T.toneMapping===Vi&&_.length===0)return!1;if(g=S,S!==null){let b=S.width,I=S.height;a.width===b&&a.height===I||this.setSize(b,I)}return M===!1&&T.setRenderTarget(a),u=T.toneMapping,T.toneMapping=Vi,!0},this.hasRenderPass=function(){return M},this.end=function(T,S){T.toneMapping=u,v=!0;let b=a,I=o;for(let U=0;U<_.length;U++){let z=_[U];z.enabled!==!1&&(z.render(T,I,b,S),z.needsSwap!==!1&&(b=I,I=I===o?c:o))}if(m!==T.outputColorSpace||f!==T.toneMapping){m=T.outputColorSpace,f=T.toneMapping,h.defines={},Lt.getTransfer(m)===ln&&(h.defines.SRGB_TRANSFER="");let U=Cy[f];U&&(h.defines[U]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,T.setRenderTarget(g),T.render(p,d),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Mm=new li,Zu=new Vr(1,1),bm=new Ca,Tm=new rl,Em=new Fa,im=[],rm=[],sm=new Float32Array(16),am=new Float32Array(9),om=new Float32Array(4);function sa(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=im[r];if(s===void 0&&(s=new Float32Array(r),im[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Un(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function On(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function _c(i,e){let t=rm[e];t===void 0&&(t=new Int32Array(e),rm[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Py(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ly(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Un(t,e))return;i.uniform2fv(this.addr,e),On(t,e)}}function Ny(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Un(t,e))return;i.uniform3fv(this.addr,e),On(t,e)}}function Dy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Un(t,e))return;i.uniform4fv(this.addr,e),On(t,e)}}function Uy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Un(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),On(t,e)}else{if(Un(t,n))return;om.set(n),i.uniformMatrix2fv(this.addr,!1,om),On(t,n)}}function Oy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Un(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),On(t,e)}else{if(Un(t,n))return;am.set(n),i.uniformMatrix3fv(this.addr,!1,am),On(t,n)}}function Fy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Un(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),On(t,e)}else{if(Un(t,n))return;sm.set(n),i.uniformMatrix4fv(this.addr,!1,sm),On(t,n)}}function By(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function zy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Un(t,e))return;i.uniform2iv(this.addr,e),On(t,e)}}function ky(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Un(t,e))return;i.uniform3iv(this.addr,e),On(t,e)}}function Vy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Un(t,e))return;i.uniform4iv(this.addr,e),On(t,e)}}function Gy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Hy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Un(t,e))return;i.uniform2uiv(this.addr,e),On(t,e)}}function Wy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Un(t,e))return;i.uniform3uiv(this.addr,e),On(t,e)}}function Xy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Un(t,e))return;i.uniform4uiv(this.addr,e),On(t,e)}}function qy(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(Zu.compareFunction=t.isReversedDepthBuffer()?cc:lc,s=Zu):s=Mm,t.setTexture2D(e||s,r)}function jy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Tm,r)}function Yy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Em,r)}function $y(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||bm,r)}function Zy(i){switch(i){case 5126:return Py;case 35664:return Ly;case 35665:return Ny;case 35666:return Dy;case 35674:return Uy;case 35675:return Oy;case 35676:return Fy;case 5124:case 35670:return By;case 35667:case 35671:return zy;case 35668:case 35672:return ky;case 35669:case 35673:return Vy;case 5125:return Gy;case 36294:return Hy;case 36295:return Wy;case 36296:return Xy;case 35678:case 36198:case 36298:case 36306:case 35682:return qy;case 35679:case 36299:case 36307:return jy;case 35680:case 36300:case 36308:case 36293:return Yy;case 36289:case 36303:case 36311:case 36292:return $y}}function Jy(i,e){i.uniform1fv(this.addr,e)}function Ky(i,e){let t=sa(e,this.size,2);i.uniform2fv(this.addr,t)}function Qy(i,e){let t=sa(e,this.size,3);i.uniform3fv(this.addr,t)}function e1(i,e){let t=sa(e,this.size,4);i.uniform4fv(this.addr,t)}function t1(i,e){let t=sa(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function n1(i,e){let t=sa(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function i1(i,e){let t=sa(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function r1(i,e){i.uniform1iv(this.addr,e)}function s1(i,e){i.uniform2iv(this.addr,e)}function a1(i,e){i.uniform3iv(this.addr,e)}function o1(i,e){i.uniform4iv(this.addr,e)}function l1(i,e){i.uniform1uiv(this.addr,e)}function c1(i,e){i.uniform2uiv(this.addr,e)}function h1(i,e){i.uniform3uiv(this.addr,e)}function u1(i,e){i.uniform4uiv(this.addr,e)}function d1(i,e,t){let n=this.cache,r=e.length,s=_c(t,r),a;Un(n,s)||(i.uniform1iv(this.addr,s),On(n,s)),a=this.type===i.SAMPLER_2D_SHADOW?Zu:Mm;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function p1(i,e,t){let n=this.cache,r=e.length,s=_c(t,r);Un(n,s)||(i.uniform1iv(this.addr,s),On(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Tm,s[a])}function f1(i,e,t){let n=this.cache,r=e.length,s=_c(t,r);Un(n,s)||(i.uniform1iv(this.addr,s),On(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Em,s[a])}function m1(i,e,t){let n=this.cache,r=e.length,s=_c(t,r);Un(n,s)||(i.uniform1iv(this.addr,s),On(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||bm,s[a])}function g1(i){switch(i){case 5126:return Jy;case 35664:return Ky;case 35665:return Qy;case 35666:return e1;case 35674:return t1;case 35675:return n1;case 35676:return i1;case 5124:case 35670:return r1;case 35667:case 35671:return s1;case 35668:case 35672:return a1;case 35669:case 35673:return o1;case 5125:return l1;case 36294:return c1;case 36295:return h1;case 36296:return u1;case 35678:case 36198:case 36298:case 36306:case 35682:return d1;case 35679:case 36299:case 36307:return p1;case 35680:case 36300:case 36308:case 36293:return f1;case 36289:case 36303:case 36311:case 36292:return m1}}var Ju=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Zy(t.type)}},Ku=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=g1(t.type)}},Qu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},Yu=/(\w+)(\])?(\[|\.)?/g;function lm(i,e){i.seq.push(e),i.map[e.id]=e}function _1(i,e,t){let n=i.name,r=n.length;for(Yu.lastIndex=0;;){let s=Yu.exec(n),a=Yu.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===r){lm(t,l===void 0?new Ju(o,i,e):new Ku(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new Qu(o),lm(t,h)),t=h}}}var ra=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a);_1(o,e.getUniformLocation(t,o.name),this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function cm(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var v1=0;function x1(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var hm=new ft;function y1(i){Lt._getMatrix(hm,Lt.workingColorSpace,i);let e=`mat3( ${hm.elements.map(t=>t.toFixed(4))} )`;switch(Lt.getTransfer(i)){case Lu:return[e,"LinearTransferOETF"];case ln:return[e,"sRGBTransferOETF"];default:return tt("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function um(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+x1(i.getShaderSource(e),a)}return r}function S1(i,e){let t=y1(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var M1={[Vh]:"Linear",[Gh]:"Reinhard",[Hh]:"Cineon",[Wh]:"ACESFilmic",[qh]:"AgX",[jh]:"Neutral",[Xh]:"Custom"};function b1(i,e){let t=M1[e];return t===void 0?(tt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var dc=new P;function T1(){return Lt.getLuminanceCoefficients(dc),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${dc.x.toFixed(4)}, ${dc.y.toFixed(4)}, ${dc.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function E1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(oo).join(`
`)}function w1(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function A1(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function oo(i){return i!==""}function dm(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pm(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var R1=/^[ \t]*#include +<([\w\d./]+)>/gm;function ed(i){return i.replace(R1,I1)}var C1=new Map;function I1(i,e){let t=Et[e];if(t===void 0){let n=C1.get(e);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=Et[n],tt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return ed(t)}var P1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fm(i){return i.replace(P1,L1)}function L1(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function mm(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var N1={[eo]:"SHADOWMAP_TYPE_PCF",[Ks]:"SHADOWMAP_TYPE_VSM"};function D1(i){return N1[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var U1={[ta]:"ENVMAP_TYPE_CUBE",[as]:"ENVMAP_TYPE_CUBE",[to]:"ENVMAP_TYPE_CUBE_UV"};function O1(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":U1[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var F1={[as]:"ENVMAP_MODE_REFRACTION"};function B1(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":F1[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var z1={[Mf]:"ENVMAP_BLENDING_MULTIPLY",[bf]:"ENVMAP_BLENDING_MIX",[Tf]:"ENVMAP_BLENDING_ADD"};function k1(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":z1[i.combine]||"ENVMAP_BLENDING_NONE"}function V1(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function G1(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=D1(t),l=O1(t),h=B1(t),p=k1(t),d=V1(t),u=E1(t),m=w1(s),f=r.createProgram(),v,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(oo).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(oo).join(`
`),g.length>0&&(g+=`
`)):(v=[mm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(oo).join(`
`),g=[mm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vi?"#define TONE_MAPPING":"",t.toneMapping!==Vi?Et.tonemapping_pars_fragment:"",t.toneMapping!==Vi?b1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Et.colorspace_pars_fragment,S1("linearToOutputTexel",t.outputColorSpace),T1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(oo).join(`
`)),a=ed(a),a=dm(a,t),a=pm(a,t),o=ed(o),o=dm(o,t),o=pm(o,t),a=fm(a),o=fm(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===Nu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=_+v+a,T=_+g+o,S=cm(r,r.VERTEX_SHADER,M),b=cm(r,r.FRAGMENT_SHADER,T);function I(j){if(i.debug.checkShaderErrors){let F=r.getProgramInfoLog(f)||"",ee=r.getShaderInfoLog(S)||"",ae=r.getShaderInfoLog(b)||"",re=F.trim(),X=ee.trim(),k=ae.trim(),Q=!0,he=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,f,S,b);else{let Ie=um(r,S,"vertex"),ye=um(r,b,"fragment");st("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+j.name+`
Material Type: `+j.type+`

Program Info Log: `+re+`
`+Ie+`
`+ye)}else re!==""?tt("WebGLProgram: Program Info Log:",re):X!==""&&k!==""||(he=!1);he&&(j.diagnostics={runnable:Q,programLog:re,vertexShader:{log:X,prefix:v},fragmentShader:{log:k,prefix:g}})}r.deleteShader(S),r.deleteShader(b),U=new ra(r,f),z=A1(r,f)}let U,z;r.attachShader(f,S),r.attachShader(f,b),t.index0AttributeName!==void 0?r.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f),this.getUniforms=function(){return U===void 0&&I(this),U},this.getAttributes=function(){return z===void 0&&I(this),z};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(f,37297)),N},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=v1++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=S,this.fragmentShader=b,this}var H1=0,td=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new nd(e),t.set(e,n)),n}},nd=class{constructor(e){this.id=H1++,this.code=e,this.usedTimes=0}};function W1(i){return i===hs||i===sc||i===ac}function X1(i,e,t,n,r,s){let a=new Ia,o=new td,c=new Set,l=[],h=new Map,p=n.logarithmicDepthBuffer,d=n.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,g,_,M,T){let S=_.fog,b=M.geometry,I=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?_.environment:null,U=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,z=e.get(f.envMap||I,U),N=z&&z.mapping===to?z.image.height:null,j=u[f.type];f.precision!==null&&(d=n.getMaxPrecision(f.precision),d!==f.precision&&tt("WebGLProgram.getParameters:",f.precision,"not supported, using",d,"instead."));let F=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,ee=F!==void 0?F.length:0,ae,re,X,k,Q=0;if(b.morphAttributes.position!==void 0&&(Q=1),b.morphAttributes.normal!==void 0&&(Q=2),b.morphAttributes.color!==void 0&&(Q=3),j){let cn=ar[j];ae=cn.vertexShader,re=cn.fragmentShader}else{ae=f.vertexShader,re=f.fragmentShader;let cn=o.getVertexShaderStage(f),dn=o.getFragmentShaderStage(f);o.update(f,cn,dn),X=cn.id,k=dn.id}let he=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),ye=M.isInstancedMesh===!0,Ue=M.isBatchedMesh===!0,we=!!f.map,ue=!!f.matcap,q=!!z,ie=!!f.aoMap,le=!!f.lightMap,oe=!!f.bumpMap&&f.wireframe===!1,w=!!f.normalMap,E=!!f.displacementMap,C=!!f.emissiveMap,D=!!f.metalnessMap,y=!!f.roughnessMap,B=f.anisotropy>0,O=f.clearcoat>0,R=f.dispersion>0,Y=f.retroreflectivity>0,Z=f.iridescence>0,K=f.sheen>0,de=f.transmission>0,Se=B&&!!f.anisotropyMap,Me=O&&!!f.clearcoatMap,_e=O&&!!f.clearcoatNormalMap,Ge=O&&!!f.clearcoatRoughnessMap,ce=Z&&!!f.iridescenceMap,fe=Z&&!!f.iridescenceThicknessMap,me=K&&!!f.sheenColorMap,Ee=K&&!!f.sheenRoughnessMap,Ot=!!f.specularMap,Mt=!!f.specularColorMap,Ft=!!f.specularIntensityMap,Sn=de&&!!f.transmissionMap,Be=de&&!!f.thicknessMap,ct=!!f.gradientMap,$e=!!f.alphaMap,fn=f.alphaTest>0,Ut=!!f.alphaHash,at=!!f.extensions,jt=Vi;f.toneMapped&&(he!==null&&he.isXRRenderTarget!==!0||(jt=i.toneMapping));let Oe={shaderID:j,shaderType:f.type,shaderName:f.name,vertexShader:ae,fragmentShader:re,defines:f.defines,customVertexShaderID:X,customFragmentShaderID:k,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:d,batching:Ue,batchingColor:Ue&&M._colorsTexture!==null,instancing:ye,instancingColor:ye&&M.instanceColor!==null,instancingMorph:ye&&M.morphTexture!==null,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Lt.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:we,matcap:ue,envMap:q,envMapMode:q&&z.mapping,envMapCubeUVHeight:N,aoMap:ie,lightMap:le,bumpMap:oe,normalMap:w,displacementMap:E,emissiveMap:C,normalMapObjectSpace:w&&f.normalMapType===Nf,normalMapTangentSpace:w&&f.normalMapType===Iu,packedNormalMap:w&&f.normalMapType===Iu&&W1(f.normalMap.format),metalnessMap:D,roughnessMap:y,anisotropy:B,anisotropyMap:Se,clearcoat:O,clearcoatMap:Me,clearcoatNormalMap:_e,clearcoatRoughnessMap:Ge,dispersion:R,retroreflection:Y,iridescence:Z,iridescenceMap:ce,iridescenceThicknessMap:fe,sheen:K,sheenColorMap:me,sheenRoughnessMap:Ee,specularMap:Ot,specularColorMap:Mt,specularIntensityMap:Ft,transmission:de,transmissionMap:Sn,thicknessMap:Be,gradientMap:ct,opaque:f.transparent===!1&&f.blending===Ii&&f.alphaToCoverage===!1,alphaMap:$e,alphaTest:fn,alphaHash:Ut,combine:f.combine,mapUv:we&&m(f.map.channel),aoMapUv:ie&&m(f.aoMap.channel),lightMapUv:le&&m(f.lightMap.channel),bumpMapUv:oe&&m(f.bumpMap.channel),normalMapUv:w&&m(f.normalMap.channel),displacementMapUv:E&&m(f.displacementMap.channel),emissiveMapUv:C&&m(f.emissiveMap.channel),metalnessMapUv:D&&m(f.metalnessMap.channel),roughnessMapUv:y&&m(f.roughnessMap.channel),anisotropyMapUv:Se&&m(f.anisotropyMap.channel),clearcoatMapUv:Me&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:_e&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:me&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(f.sheenRoughnessMap.channel),specularMapUv:Ot&&m(f.specularMap.channel),specularColorMapUv:Mt&&m(f.specularColorMap.channel),specularIntensityMapUv:Ft&&m(f.specularIntensityMap.channel),transmissionMapUv:Sn&&m(f.transmissionMap.channel),thicknessMapUv:Be&&m(f.thicknessMap.channel),alphaMapUv:$e&&m(f.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(w||B),vertexNormals:!!b.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:M.isPoints===!0&&!!b.attributes.uv&&(we||$e),fog:!!S,useFog:f.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||b.attributes.normal===void 0&&w===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Ie,skinning:M.isSkinnedMesh===!0,hasPositionAttribute:b.attributes.position!==void 0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:Q,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:T.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&g.length>0,shadowMapType:i.shadowMap.type,toneMapping:jt,decodeVideoTexture:we&&f.map.isVideoTexture===!0&&Lt.getTransfer(f.map.colorSpace)===ln,decodeVideoTextureEmissive:C&&f.emissiveMap.isVideoTexture===!0&&Lt.getTransfer(f.emissiveMap.colorSpace)===ln,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===tr,flipSided:f.side===ti,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:at&&f.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&f.extensions.multiDraw===!0||Ue)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let g in f.defines)v.push(g),v.push(f.defines[g]);return f.isRawShaderMaterial===!1&&((function(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numSunLights),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numSunLightShadows),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)})(v,f),(function(g,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.retroreflection&&a.enable(24),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),g.push(a.mask)})(v,f),v.push(i.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=u[f.type],g;if(v){let _=ar[v];g=Zf.clone(_.uniforms)}else g=f.uniforms;return g},acquireProgram:function(f,v){let g=h.get(v);return g!==void 0?++g.usedTimes:(g=new G1(i,v,f,r),l.push(g),h.set(v,g)),g},releaseProgram:function(f){if(--f.usedTimes===0){let v=l.indexOf(f);l[v]=l[l.length-1],l.pop(),h.delete(f.cacheKey),f.destroy()}},releaseShaderCache:function(f){o.remove(f)},programs:l,dispose:function(){o.dispose()}}}function q1(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function j1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function gm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function _m(){let i=[],e=0,t=[],n=[],r=[];function s(o){let c=0;return o.isInstancedMesh&&(c+=2),o.isSkinnedMesh&&(c+=1),c}function a(o,c,l,h,p,d){let u=i[e];return u===void 0?(u={id:o.id,object:o,geometry:c,material:l,materialVariant:s(o),groupOrder:h,renderOrder:o.renderOrder,z:p,group:d},i[e]=u):(u.id=o.id,u.object=o,u.geometry=c,u.material=l,u.materialVariant=s(o),u.groupOrder=h,u.renderOrder=o.renderOrder,u.z=p,u.group=d),e++,u}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,c,l,h,p,d,u){u.reversedDepth===!0&&(p=-p);let m=a(o,c,l,h,p,d);l.transmission>0?n.push(m):l.transparent===!0?r.push(m):t.push(m)},unshift:function(o,c,l,h,p,d){let u=a(o,c,l,h,p,d);l.transmission>0?n.unshift(u):l.transparent===!0?r.unshift(u):t.unshift(u)},finish:function(){for(let o=e,c=i.length;o<c;o++){let l=i[o];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(o,c){t.length>1&&t.sort(o||j1),n.length>1&&n.sort(c||gm),r.length>1&&r.sort(c||gm)}}}function Y1(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new _m,i.set(e,[r])):t>=n.length?(r=new _m,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function $1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new _t};break;case"SpotLight":t={position:new P,direction:new P,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new _t,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":t={color:new _t,position:new P,halfWidth:new P,halfHeight:new P}}return i[e.id]=t,t}}}function Z1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3}}return i[e.id]=t,t}}}var J1=0;function K1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Q1(i){let e=new $1,t=Z1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new P);let r=new P,s=new St,a=new St;return{setup:function(o){let c=0,l=0,h=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let p=0,d=0,u=0,m=0,f=0,v=0,g=0,_=0,M=0,T=0,S=0,b=0,I=0,U=0;o.sort(K1);for(let N=0,j=o.length;N<j;N++){let F=o[N],ee=F.color,ae=F.intensity,re=F.distance,X=null;if(F.shadow&&F.shadow.map&&(X=F.shadow.map.texture.format===hs?F.shadow.map.texture:F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)c+=ee.r*ae,l+=ee.g*ae,h+=ee.b*ae;else if(F.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(F.sh.coefficients[k],ae);U++}else if(F.isSunLight){let k=e.get(F);if(k.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let Q=F.shadow,he=t.get(F);he.shadowIntensity=Q.intensity,he.shadowBias=Q.bias,he.shadowNormalBias=Q.normalBias,he.shadowRadius=Q.radius,he.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[d]=he,n.sunShadowMap[d]=X;let Ie=Q.getViewportCount();for(let ye=0;ye<Ie;ye++)n.sunShadowMatrix[u+ye]=Q.getMatrix(ye),n.sunShadowCascade[u+ye]=Q._cascadeData[ye];u+=Ie,d++}n.sun[p]=k,p++}else if(F.isDirectionalLight){let k=e.get(F);if(k.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let Q=F.shadow,he=t.get(F);he.shadowIntensity=Q.intensity,he.shadowBias=Q.bias,he.shadowNormalBias=Q.normalBias,he.shadowRadius=Q.radius,he.shadowMapSize=Q.mapSize,n.directionalShadow[m]=he,n.directionalShadowMap[m]=X,n.directionalShadowMatrix[m]=F.shadow.matrix,M++}n.directional[m]=k,m++}else if(F.isSpotLight){let k=e.get(F);k.position.setFromMatrixPosition(F.matrixWorld),k.color.copy(ee).multiplyScalar(ae),k.distance=re,k.coneCos=Math.cos(F.angle),k.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),k.decay=F.decay,n.spot[v]=k;let Q=F.shadow;if(F.map&&(n.spotLightMap[b]=F.map,b++,Q.updateMatrices(F),F.castShadow&&I++),n.spotLightMatrix[v]=Q.matrix,F.castShadow){let he=t.get(F);he.shadowIntensity=Q.intensity,he.shadowBias=Q.bias,he.shadowNormalBias=Q.normalBias,he.shadowRadius=Q.radius,he.shadowMapSize=Q.mapSize,n.spotShadow[v]=he,n.spotShadowMap[v]=X,S++}v++}else if(F.isRectAreaLight){let k=e.get(F);k.color.copy(ee).multiplyScalar(ae),k.halfWidth.set(.5*F.width,0,0),k.halfHeight.set(0,.5*F.height,0),n.rectArea[g]=k,g++}else if(F.isPointLight){let k=e.get(F);if(k.color.copy(F.color).multiplyScalar(F.intensity),k.distance=F.distance,k.decay=F.decay,F.castShadow){let Q=F.shadow,he=t.get(F);he.shadowIntensity=Q.intensity,he.shadowBias=Q.bias,he.shadowNormalBias=Q.normalBias,he.shadowRadius=Q.radius,he.shadowMapSize=Q.mapSize,he.shadowCameraNear=Q.camera.near,he.shadowCameraFar=Q.camera.far,n.pointShadow[f]=he,n.pointShadowMap[f]=X,n.pointShadowMatrix[f]=F.shadow.matrix,T++}n.point[f]=k,f++}else if(F.isHemisphereLight){let k=e.get(F);k.skyColor.copy(F.color).multiplyScalar(ae),k.groundColor.copy(F.groundColor).multiplyScalar(ae),n.hemi[_]=k,_++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let z=n.hash;z.sunLength===p&&z.directionalLength===m&&z.pointLength===f&&z.spotLength===v&&z.rectAreaLength===g&&z.hemiLength===_&&z.numSunShadows===d&&z.numDirectionalShadows===M&&z.numPointShadows===T&&z.numSpotShadows===S&&z.numSpotMaps===b&&z.numLightProbes===U||(n.sun.length=p,n.directional.length=m,n.spot.length=v,n.rectArea.length=g,n.point.length=f,n.hemi.length=_,n.sunShadow.length=d,n.sunShadowMap.length=d,n.sunShadowMatrix.length=u,n.sunShadowCascade.length=u,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=S,n.spotShadowMap.length=S,n.spotLightMatrix.length=S+b-I,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=U,z.sunLength=p,z.directionalLength=m,z.pointLength=f,z.spotLength=v,z.rectAreaLength=g,z.hemiLength=_,z.numSunShadows=d,z.numDirectionalShadows=M,z.numPointShadows=T,z.numSpotShadows=S,z.numSpotMaps=b,z.numLightProbes=U,n.version=J1++)},setupView:function(o,c){let l=0,h=0,p=0,d=0,u=0,m=0,f=c.matrixWorldInverse;for(let v=0,g=o.length;v<g;v++){let _=o[v];if(_.isSunLight){let M=n.sun[l];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(f),l++}else if(_.isDirectionalLight){let M=n.directional[h];M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),h++}else if(_.isSpotLight){let M=n.spot[d];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),d++}else if(_.isRectAreaLight){let M=n.rectArea[u];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),a.identity(),s.copy(_.matrixWorld),s.premultiply(f),a.extractRotation(s),M.halfWidth.set(.5*_.width,0,0),M.halfHeight.set(0,.5*_.height,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),u++}else if(_.isPointLight){let M=n.point[p];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(f),m++}}},state:n}}function vm(i){let e=new Q1(i),t=[],n=[],r=[],s={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,t.length=0,n.length=0,r.length=0},state:s,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){r.push(a)}}}function eS(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new vm(i),e.set(t,[s])):n>=r.length?(s=new vm(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}var tS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nS=`uniform sampler2D shadow_pass;
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
}`,iS=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],rS=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],xm=new St,ao=new P,$u=new P;function sS(i,e,t){let n=new zr,r=new pe,s=new pe,a=new on,o=new Dl,c=new Ul,l={},h=t.maxTextureSize,p={[Qs]:ti,[ti]:Qs,[tr]:tr},d=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:tS,fragmentShader:nS}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new Pt;m.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let f=new ei(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=eo;let g=this.type;function _(b,I){let U=e.update(f);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,u.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),b.mapPass===null?b.mapPass=new gi(r.x,r.y,{format:hs,type:ir}):b.mapPass.width===b.map.width&&b.mapPass.height===b.map.height||b.mapPass.setSize(b.map.width,b.map.height),d.uniforms.shadow_pass.value=b.map.depthTexture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(I,null,U,d,f,null),u.uniforms.shadow_pass.value=b.mapPass.texture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(I,null,U,u,f,null)}function M(b,I,U,z){let N=null,j=U.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(j!==void 0)N=j;else if(N=U.isPointLight===!0?c:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let F=N.uuid,ee=I.uuid,ae=l[F];ae===void 0&&(ae={},l[F]=ae);let re=ae[ee];re===void 0&&(re=N.clone(),ae[ee]=re,I.addEventListener("dispose",S)),N=re}return N.visible=I.visible,N.wireframe=I.wireframe,N.side=z===Ks?I.shadowSide!==null?I.shadowSide:I.side:I.shadowSide!==null?I.shadowSide:p[I.side],N.alphaMap=I.alphaMap,N.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,N.map=I.map,N.clipShadows=I.clipShadows,N.clippingPlanes=I.clippingPlanes,N.clipIntersection=I.clipIntersection,N.displacementMap=I.displacementMap,N.displacementScale=I.displacementScale,N.displacementBias=I.displacementBias,N.wireframeLinewidth=I.wireframeLinewidth,N.linewidth=I.linewidth,U.isPointLight===!0&&N.isMeshDistanceMaterial===!0&&(i.properties.get(N).light=U),N}function T(b,I,U,z,N){if(b.visible===!1)return;if(b.layers.test(I.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&N===Ks)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,b.matrixWorld);let F=e.update(b),ee=b.material;if(Array.isArray(ee)){let ae=F.groups;for(let re=0,X=ae.length;re<X;re++){let k=ae[re],Q=ee[k.materialIndex];if(Q&&Q.visible){let he=M(b,Q,z,N);b.onBeforeShadow(i,b,I,U,F,he,k),i.renderBufferDirect(U,null,F,he,b,k),b.onAfterShadow(i,b,I,U,F,he,k)}}}else if(ee.visible){let ae=M(b,ee,z,N);b.onBeforeShadow(i,b,I,U,F,ae,null),i.renderBufferDirect(U,null,F,ae,b,null),b.onAfterShadow(i,b,I,U,F,ae,null)}}let j=b.children;for(let F=0,ee=j.length;F<ee;F++)T(j[F],I,U,z,N)}function S(b){b.target.removeEventListener("dispose",S);for(let I in l){let U=l[I],z=b.target.uuid;z in U&&(U[z].dispose(),delete U[z])}}this.render=function(b,I,U){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||b.length===0)return;this.type===ef&&(tt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=eo);let z=i.getRenderTarget(),N=i.getActiveCubeFace(),j=i.getActiveMipmapLevel(),F=i.state;F.setBlending(nr),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let ee=g!==this.type;ee&&I.traverse(function(ae){ae.material&&(Array.isArray(ae.material)?ae.material.forEach(re=>re.needsUpdate=!0):ae.material.needsUpdate=!0)});for(let ae=0,re=b.length;ae<re;ae++){let X=b[ae],k=X.shadow;if(k===void 0){tt("WebGLShadowMap:",X,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);let Q=k.getFrameExtents();r.multiply(Q),s.copy(k.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Q.x),r.x=s.x*Q.x,k.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Q.y),r.y=s.y*Q.y,k.mapSize.y=s.y));let he=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=he,k.map===null||ee===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Ks){if(X.isPointLight){tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new gi(r.x,r.y,{format:hs,type:ir,minFilter:ni,magFilter:ni,generateMipmaps:!1}),k.map.texture.name=X.name+".shadowMap",k.map.depthTexture=new Vr(r.x,r.y,Pi),k.map.depthTexture.name=X.name+".shadowMapDepth",k.map.depthTexture.format=ls,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Gi,k.map.depthTexture.magFilter=Gi}else X.isPointLight?(k.map=new fc(r.x),k.map.depthTexture=new hl(r.x,Wr)):(k.map=new gi(r.x,r.y),k.map.depthTexture=new Vr(r.x,r.y,Wr)),k.map.depthTexture.name=X.name+".shadowMap",k.map.depthTexture.format=ls,this.type===eo?(k.map.depthTexture.compareFunction=he?cc:lc,k.map.depthTexture.minFilter=ni,k.map.depthTexture.magFilter=ni):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Gi,k.map.depthTexture.magFilter=Gi);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget===!0||k.map.width===r.x&&k.map.height===r.y||k.map.setSize(r.x,r.y);let Ie=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();X.isPointLight!==!0&&k.updateMatrices(X,U);for(let ye=0;ye<Ie;ye++){let Ue=k.getCamera(ye);if(X.isPointLight){let we=k.camera,ue=k.matrix,q=X.distance||we.far;q!==we.far&&(we.far=q,we.updateProjectionMatrix()),ao.setFromMatrixPosition(X.matrixWorld),we.position.copy(ao),$u.copy(we.position),$u.add(iS[ye]),we.up.copy(rS[ye]),we.lookAt($u),we.updateMatrixWorld(),ue.makeTranslation(-ao.x,-ao.y,-ao.z),xm.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),k._frustum.setFromProjectionMatrix(xm,we.coordinateSystem,we.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,ye),i.clear();else{ye===0&&(i.setRenderTarget(k.map),i.clear());let we=k.getViewport(ye);a.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),F.viewport(a)}n=k.getFrustum(ye),T(I,U,Ue,X,this.type)}k.isPointLightShadow!==!0&&this.type===Ks&&_(k,U),k.needsUpdate=!1}g=this.type,v.needsUpdate=!1,i.setRenderTarget(z,N,j)}}function aS(i,e){let t=new function(){let y=!1,B=new on,O=null,R=new on(0,0,0,0);return{setMask:function(Y){O===Y||y||(i.colorMask(Y,Y,Y,Y),O=Y)},setLocked:function(Y){y=Y},setClear:function(Y,Z,K,de,Se){Se===!0&&(Y*=de,Z*=de,K*=de),B.set(Y,Z,K,de),R.equals(B)===!1&&(i.clearColor(Y,Z,K,de),R.copy(B))},reset:function(){y=!1,O=null,R.set(-1,0,0,0)}}},n=new function(){let y=!1,B=!1,O=null,R=null,Y=null;return{setReversed:function(Z){if(B!==Z){let K=e.get("EXT_clip_control");Z?K.clipControlEXT(K.LOWER_LEFT_EXT,K.ZERO_TO_ONE_EXT):K.clipControlEXT(K.LOWER_LEFT_EXT,K.NEGATIVE_ONE_TO_ONE_EXT),B=Z;let de=Y;Y=null,this.setClear(de)}},getReversed:function(){return B},setTest:function(Z){Z?q(i.DEPTH_TEST):ie(i.DEPTH_TEST)},setMask:function(Z){O===Z||y||(i.depthMask(Z),O=Z)},setFunc:function(Z){if(B&&(Z=Hf[Z]),R!==Z){switch(Z){case Dh:i.depthFunc(i.NEVER);break;case Uh:i.depthFunc(i.ALWAYS);break;case Oh:i.depthFunc(i.LESS);break;case $l:i.depthFunc(i.LEQUAL);break;case Fh:i.depthFunc(i.EQUAL);break;case Bh:i.depthFunc(i.GEQUAL);break;case zh:i.depthFunc(i.GREATER);break;case kh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}R=Z}},setLocked:function(Z){y=Z},setClear:function(Z){Y!==Z&&(Y=Z,B&&(Z=1-Z),i.clearDepth(Z))},reset:function(){y=!1,O=null,R=null,Y=null,B=!1}}},r=new function(){let y=!1,B=null,O=null,R=null,Y=null,Z=null,K=null,de=null,Se=null;return{setTest:function(Me){y||(Me?q(i.STENCIL_TEST):ie(i.STENCIL_TEST))},setMask:function(Me){B===Me||y||(i.stencilMask(Me),B=Me)},setFunc:function(Me,_e,Ge){O===Me&&R===_e&&Y===Ge||(i.stencilFunc(Me,_e,Ge),O=Me,R=_e,Y=Ge)},setOp:function(Me,_e,Ge){Z===Me&&K===_e&&de===Ge||(i.stencilOp(Me,_e,Ge),Z=Me,K=_e,de=Ge)},setLocked:function(Me){y=Me},setClear:function(Me){Se!==Me&&(i.clearStencil(Me),Se=Me)},reset:function(){y=!1,B=null,O=null,R=null,Y=null,Z=null,K=null,de=null,Se=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,M=null,T=null,S=new _t(0,0,0),b=0,I=!1,U=null,z=null,N=null,j=null,F=null,ee=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ae=!1,re=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(X)[1]),ae=re>=1):X.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),ae=re>=2);let k=null,Q={},he=i.getParameter(i.SCISSOR_BOX),Ie=i.getParameter(i.VIEWPORT),ye=new on().fromArray(he),Ue=new on().fromArray(Ie);function we(y,B,O,R){let Y=new Uint8Array(4),Z=i.createTexture();i.bindTexture(y,Z),i.texParameteri(y,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(y,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let K=0;K<O;K++)y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?i.texImage3D(B,0,i.RGBA,1,1,R,0,i.RGBA,i.UNSIGNED_BYTE,Y):i.texImage2D(B+K,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Y);return Z}let ue={};function q(y){o[y]!==!0&&(i.enable(y),o[y]=!0)}function ie(y){o[y]!==!1&&(i.disable(y),o[y]=!1)}ue[i.TEXTURE_2D]=we(i.TEXTURE_2D,i.TEXTURE_2D,1),ue[i.TEXTURE_CUBE_MAP]=we(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[i.TEXTURE_2D_ARRAY]=we(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ue[i.TEXTURE_3D]=we(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),q(i.DEPTH_TEST),n.setFunc($l),E(!1),C(Ph),q(i.CULL_FACE),w(nr);let le={[ea]:i.FUNC_ADD,[nf]:i.FUNC_SUBTRACT,[rf]:i.FUNC_REVERSE_SUBTRACT};le[sf]=i.MIN,le[af]=i.MAX;let oe={[of]:i.ZERO,[lf]:i.ONE,[cf]:i.SRC_COLOR,[uf]:i.SRC_ALPHA,[_f]:i.SRC_ALPHA_SATURATE,[mf]:i.DST_COLOR,[pf]:i.DST_ALPHA,[hf]:i.ONE_MINUS_SRC_COLOR,[df]:i.ONE_MINUS_SRC_ALPHA,[gf]:i.ONE_MINUS_DST_COLOR,[ff]:i.ONE_MINUS_DST_ALPHA,[vf]:i.CONSTANT_COLOR,[xf]:i.ONE_MINUS_CONSTANT_COLOR,[yf]:i.CONSTANT_ALPHA,[Sf]:i.ONE_MINUS_CONSTANT_ALPHA};function w(y,B,O,R,Y,Z,K,de,Se,Me){if(y!==nr){if(u===!1&&(q(i.BLEND),u=!0),y===tf)Y=Y||B,Z=Z||O,K=K||R,B===f&&Y===_||(i.blendEquationSeparate(le[B],le[Y]),f=B,_=Y),O===v&&R===g&&Z===M&&K===T||(i.blendFuncSeparate(oe[O],oe[R],oe[Z],oe[K]),v=O,g=R,M=Z,T=K),de.equals(S)!==!1&&Se===b||(i.blendColor(de.r,de.g,de.b,Se),S.copy(de),b=Se),m=y,I=!1;else if(y!==m||Me!==I){if(f===ea&&_===ea||(i.blendEquation(i.FUNC_ADD),f=ea,_=ea),Me)switch(y){case Ii:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xr:i.blendFunc(i.ONE,i.ONE);break;case Lh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:st("WebGLState: Invalid blending: ",y)}else switch(y){case Ii:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Lh:st("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nh:st("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:st("WebGLState: Invalid blending: ",y)}v=null,g=null,M=null,T=null,S.set(0,0,0),b=0,m=y,I=Me}}else u===!0&&(ie(i.BLEND),u=!1)}function E(y){U!==y&&(y?i.frontFace(i.CW):i.frontFace(i.CCW),U=y)}function C(y){y!==Kp?(q(i.CULL_FACE),y!==z&&(y===Ph?i.cullFace(i.BACK):y===Qp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ie(i.CULL_FACE),z=y}function D(y,B,O){y?(q(i.POLYGON_OFFSET_FILL),j===B&&F===O||(j=B,F=O,n.getReversed()&&(B=-B),i.polygonOffset(B,O))):ie(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:q,disable:ie,bindFramebuffer:function(y,B){return l[y]!==B&&(i.bindFramebuffer(y,B),l[y]=B,y===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=B),y===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=B),!0)},drawBuffers:function(y,B){let O=p,R=!1;if(y){O=h.get(B),O===void 0&&(O=[],h.set(B,O));let Y=y.textures;if(O.length!==Y.length||O[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,K=Y.length;Z<K;Z++)O[Z]=i.COLOR_ATTACHMENT0+Z;O.length=Y.length,R=!0}}else O[0]!==i.BACK&&(O[0]=i.BACK,R=!0);R&&i.drawBuffers(O)},useProgram:function(y){return d!==y&&(i.useProgram(y),d=y,!0)},setBlending:w,setMaterial:function(y,B){y.side===tr?ie(i.CULL_FACE):q(i.CULL_FACE);let O=y.side===ti;B&&(O=!O),E(O),y.blending===Ii&&y.transparent===!1?w(nr):w(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),n.setFunc(y.depthFunc),n.setTest(y.depthTest),n.setMask(y.depthWrite),t.setMask(y.colorWrite);let R=y.stencilWrite;r.setTest(R),R&&(r.setMask(y.stencilWriteMask),r.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),r.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),D(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?q(i.SAMPLE_ALPHA_TO_COVERAGE):ie(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:C,setLineWidth:function(y){y!==N&&(ae&&i.lineWidth(y),N=y)},setPolygonOffset:D,setScissorTest:function(y){y?q(i.SCISSOR_TEST):ie(i.SCISSOR_TEST)},activeTexture:function(y){y===void 0&&(y=i.TEXTURE0+ee-1),k!==y&&(i.activeTexture(y),k=y)},bindTexture:function(y,B,O){O===void 0&&(O=k===null?i.TEXTURE0+ee-1:k);let R=Q[O];R===void 0&&(R={type:void 0,texture:void 0},Q[O]=R),R.type===y&&R.texture===B||(k!==O&&(i.activeTexture(O),k=O),i.bindTexture(y,B||ue[y]),R.type=y,R.texture=B)},unbindTexture:function(){let y=Q[k];y!==void 0&&y.type!==void 0&&(i.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(y){st("WebGLState:",y)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(y){st("WebGLState:",y)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(y){st("WebGLState:",y)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(y){st("WebGLState:",y)}},pixelStorei:function(y,B){c[y]!==B&&(i.pixelStorei(y,B),c[y]=B)},getParameter:function(y){return c[y]!==void 0?c[y]:i.getParameter(y)},updateUBOMapping:function(y,B){let O=a.get(B);O===void 0&&(O=new WeakMap,a.set(B,O));let R=O.get(y);R===void 0&&(R=i.getUniformBlockIndex(B,y.name),O.set(y,R))},uniformBlockBinding:function(y,B){let O=a.get(B).get(y);s.get(B)!==O&&(i.uniformBlockBinding(B,O,y.__bindingPointIndex),s.set(B,O))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(y){st("WebGLState:",y)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(y){st("WebGLState:",y)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(y){st("WebGLState:",y)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(y){st("WebGLState:",y)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(y){st("WebGLState:",y)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(y){st("WebGLState:",y)}},scissor:function(y){ye.equals(y)===!1&&(i.scissor(y.x,y.y,y.z,y.w),ye.copy(y))},viewport:function(y){Ue.equals(y)===!1&&(i.viewport(y.x,y.y,y.z,y.w),Ue.copy(y))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),o={},c={},k=null,Q={},l={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,M=null,T=null,S=new _t(0,0,0),b=0,I=!1,U=null,z=null,N=null,j=null,F=null,ye.set(0,0,i.canvas.width,i.canvas.height),Ue.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function oS(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new pe,h=new WeakMap,p=new Set,d,u=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(w,E){return m?new OffscreenCanvas(w,E):Aa("canvas")}function v(w,E,C){let D=1,y=oe(w);if((y.width>C||y.height>C)&&(D=C/Math.max(y.width,y.height)),D<1){if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let B=Math.floor(D*y.width),O=Math.floor(D*y.height);d===void 0&&(d=f(B,O));let R=E?f(B,O):d;return R.width=B,R.height=O,R.getContext("2d").drawImage(w,0,0,B,O),tt("WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+B+"x"+O+")."),R}return"data"in w&&tt("WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),w}return w}function g(w){return w.generateMipmaps}function _(w){i.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(w,E,C,D,y,B=!1){if(w!==null){if(i[w]!==void 0)return i[w];tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let O;D&&(O=e.get("EXT_texture_norm16"),O||tt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let R=E;if(E===i.RED&&(C===i.FLOAT&&(R=i.R32F),C===i.HALF_FLOAT&&(R=i.R16F),C===i.UNSIGNED_BYTE&&(R=i.R8),C===i.UNSIGNED_SHORT&&O&&(R=O.R16_EXT),C===i.SHORT&&O&&(R=O.R16_SNORM_EXT)),E===i.RED_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.R8UI),C===i.UNSIGNED_SHORT&&(R=i.R16UI),C===i.UNSIGNED_INT&&(R=i.R32UI),C===i.BYTE&&(R=i.R8I),C===i.SHORT&&(R=i.R16I),C===i.INT&&(R=i.R32I)),E===i.RG&&(C===i.FLOAT&&(R=i.RG32F),C===i.HALF_FLOAT&&(R=i.RG16F),C===i.UNSIGNED_BYTE&&(R=i.RG8),C===i.UNSIGNED_SHORT&&O&&(R=O.RG16_EXT),C===i.SHORT&&O&&(R=O.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RG8UI),C===i.UNSIGNED_SHORT&&(R=i.RG16UI),C===i.UNSIGNED_INT&&(R=i.RG32UI),C===i.BYTE&&(R=i.RG8I),C===i.SHORT&&(R=i.RG16I),C===i.INT&&(R=i.RG32I)),E===i.RGB_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RGB8UI),C===i.UNSIGNED_SHORT&&(R=i.RGB16UI),C===i.UNSIGNED_INT&&(R=i.RGB32UI),C===i.BYTE&&(R=i.RGB8I),C===i.SHORT&&(R=i.RGB16I),C===i.INT&&(R=i.RGB32I)),E===i.RGBA_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RGBA8UI),C===i.UNSIGNED_SHORT&&(R=i.RGBA16UI),C===i.UNSIGNED_INT&&(R=i.RGBA32UI),C===i.BYTE&&(R=i.RGBA8I),C===i.SHORT&&(R=i.RGBA16I),C===i.INT&&(R=i.RGBA32I)),E===i.RGB&&(C===i.UNSIGNED_SHORT&&O&&(R=O.RGB16_EXT),C===i.SHORT&&O&&(R=O.RGB16_SNORM_EXT),C===i.UNSIGNED_INT_5_9_9_9_REV&&(R=i.RGB9_E5),C===i.UNSIGNED_INT_10F_11F_11F_REV&&(R=i.R11F_G11F_B10F)),E===i.RGBA){let Y=B?Lu:Lt.getTransfer(y);C===i.FLOAT&&(R=i.RGBA32F),C===i.HALF_FLOAT&&(R=i.RGBA16F),C===i.UNSIGNED_BYTE&&(R=Y===ln?i.SRGB8_ALPHA8:i.RGBA8),C===i.UNSIGNED_SHORT&&O&&(R=O.RGBA16_EXT),C===i.SHORT&&O&&(R=O.RGBA16_SNORM_EXT),C===i.UNSIGNED_SHORT_4_4_4_4&&(R=i.RGBA4),C===i.UNSIGNED_SHORT_5_5_5_1&&(R=i.RGB5_A1)}return R!==i.R16F&&R!==i.R32F&&R!==i.RG16F&&R!==i.RG32F&&R!==i.RGBA16F&&R!==i.RGBA32F||e.get("EXT_color_buffer_float"),R}function S(w,E){let C;return w?E===null||E===Wr||E===na?C=i.DEPTH24_STENCIL8:E===Pi?C=i.DEPTH32F_STENCIL8:E===io&&(C=i.DEPTH24_STENCIL8,tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Wr||E===na?C=i.DEPTH_COMPONENT24:E===Pi?C=i.DEPTH_COMPONENT32F:E===io&&(C=i.DEPTH_COMPONENT16),C}function b(w,E){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Gi&&w.minFilter!==ni?Math.log2(Math.max(E.width,E.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?E.mipmaps.length:1}function I(w){let E=w.target;E.removeEventListener("dispose",I),(function(C){let D=n.get(C);if(D.__webglInit===void 0)return;let y=C.source,B=u.get(y);if(B){let O=B[D.__cacheKey];O.usedTimes--,O.usedTimes===0&&z(C),Object.keys(B).length===0&&u.delete(y)}n.remove(C)})(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&p.delete(E)}function U(w){let E=w.target;E.removeEventListener("dispose",U),(function(C){let D=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(D.__webglFramebuffer[B]))for(let O=0;O<D.__webglFramebuffer[B].length;O++)i.deleteFramebuffer(D.__webglFramebuffer[B][O]);else i.deleteFramebuffer(D.__webglFramebuffer[B]);D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer[B])}else{if(Array.isArray(D.__webglFramebuffer))for(let B=0;B<D.__webglFramebuffer.length;B++)i.deleteFramebuffer(D.__webglFramebuffer[B]);else i.deleteFramebuffer(D.__webglFramebuffer);if(D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer),D.__webglMultisampledFramebuffer&&i.deleteFramebuffer(D.__webglMultisampledFramebuffer),D.__webglColorRenderbuffer)for(let B=0;B<D.__webglColorRenderbuffer.length;B++)D.__webglColorRenderbuffer[B]&&i.deleteRenderbuffer(D.__webglColorRenderbuffer[B]);D.__webglDepthRenderbuffer&&i.deleteRenderbuffer(D.__webglDepthRenderbuffer)}let y=C.textures;for(let B=0,O=y.length;B<O;B++){let R=n.get(y[B]);R.__webglTexture&&(i.deleteTexture(R.__webglTexture),a.memory.textures--),n.remove(y[B])}n.remove(C)})(E)}function z(w){let E=n.get(w);i.deleteTexture(E.__webglTexture);let C=w.source;delete u.get(C)[E.__cacheKey],a.memory.textures--}let N=0;function j(w,E){let C=n.get(w);if(w.isVideoTexture&&(function(D){let y=a.render.frame;h.get(D)!==y&&(h.set(D,y),D.update())})(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&C.__version!==w.version){let D=w.image;if(D===null)tt("WebGLRenderer: Texture marked for update but no image data found.");else{if(D.complete!==!1)return void Q(C,w,E);tt("WebGLRenderer: Texture marked for update but image is incomplete")}}else w.isExternalTexture&&(C.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,C.__webglTexture,i.TEXTURE0+E)}let F={[Kl]:i.REPEAT,[Ql]:i.CLAMP_TO_EDGE,[Ef]:i.MIRRORED_REPEAT},ee={[Gi]:i.NEAREST,[wf]:i.NEAREST_MIPMAP_NEAREST,[no]:i.NEAREST_MIPMAP_LINEAR,[ni]:i.LINEAR,[ec]:i.LINEAR_MIPMAP_NEAREST,[os]:i.LINEAR_MIPMAP_LINEAR},ae={[Df]:i.NEVER,[zf]:i.ALWAYS,[Uf]:i.LESS,[lc]:i.LEQUAL,[Of]:i.EQUAL,[cc]:i.GEQUAL,[Ff]:i.GREATER,[Bf]:i.NOTEQUAL};function re(w,E){if(E.type!==Pi||e.has("OES_texture_float_linear")!==!1||E.magFilter!==ni&&E.magFilter!==ec&&E.magFilter!==no&&E.magFilter!==os&&E.minFilter!==ni&&E.minFilter!==ec&&E.minFilter!==no&&E.minFilter!==os||tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,F[E.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,F[E.wrapT]),w!==i.TEXTURE_3D&&w!==i.TEXTURE_2D_ARRAY||i.texParameteri(w,i.TEXTURE_WRAP_R,F[E.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ee[E.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ee[E.minFilter]),E.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ae[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Gi||E.minFilter!==no&&E.minFilter!==os||E.type===Pi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let C=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function X(w,E){let C=!1;w.__webglInit===void 0&&(w.__webglInit=!0,E.addEventListener("dispose",I));let D=E.source,y=u.get(D);y===void 0&&(y={},u.set(D,y));let B=(function(O){let R=[];return R.push(O.wrapS),R.push(O.wrapT),R.push(O.wrapR||0),R.push(O.magFilter),R.push(O.minFilter),R.push(O.anisotropy),R.push(O.internalFormat),R.push(O.format),R.push(O.type),R.push(O.generateMipmaps),R.push(O.premultiplyAlpha),R.push(O.flipY),R.push(O.unpackAlignment),R.push(O.colorSpace),R.join()})(E);if(B!==w.__cacheKey){y[B]===void 0&&(y[B]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,C=!0),y[B].usedTimes++;let O=y[w.__cacheKey];O!==void 0&&(y[w.__cacheKey].usedTimes--,O.usedTimes===0&&z(E)),w.__cacheKey=B,w.__webglTexture=y[B].texture}return C}function k(w,E,C){return Math.floor(Math.floor(w/C)/E)}function Q(w,E,C){let D=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(D=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(D=i.TEXTURE_3D);let y=X(w,E),B=E.source;t.bindTexture(D,w.__webglTexture,i.TEXTURE0+C);let O=n.get(B);if(B.version!==O.__version||y===!0){if(t.activeTexture(i.TEXTURE0+C),!(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)){let fe=Lt.getPrimaries(Lt.workingColorSpace),me=E.colorSpace===us?null:Lt.getPrimaries(E.colorSpace),Ee=E.colorSpace===us||fe===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let R=v(E.image,!1,r.maxTextureSize);R=le(E,R);let Y=s.convert(E.format,E.colorSpace),Z=s.convert(E.type),K,de=T(E.internalFormat,Y,Z,E.normalized,E.colorSpace,E.isVideoTexture);re(D,E);let Se=E.mipmaps,Me=E.isVideoTexture!==!0,_e=O.__version===void 0||y===!0,Ge=B.dataReady,ce=b(E,R);if(E.isDepthTexture)de=S(E.format===cs,E.type),_e&&(Me?t.texStorage2D(i.TEXTURE_2D,1,de,R.width,R.height):t.texImage2D(i.TEXTURE_2D,0,de,R.width,R.height,0,Y,Z,null));else if(E.isDataTexture)if(Se.length>0){Me&&_e&&t.texStorage2D(i.TEXTURE_2D,ce,de,Se[0].width,Se[0].height);for(let fe=0,me=Se.length;fe<me;fe++)K=Se[fe],Me?Ge&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,K.width,K.height,Y,Z,K.data):t.texImage2D(i.TEXTURE_2D,fe,de,K.width,K.height,0,Y,Z,K.data);E.generateMipmaps=!1}else Me?(_e&&t.texStorage2D(i.TEXTURE_2D,ce,de,R.width,R.height),Ge&&(function(fe,me,Ee,Ot){let Mt=fe.updateRanges;if(Mt.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,me.width,me.height,Ee,Ot,me.data);else{Mt.sort(($e,fn)=>$e.start-fn.start);let Ft=0;for(let $e=1;$e<Mt.length;$e++){let fn=Mt[Ft],Ut=Mt[$e],at=fn.start+fn.count,jt=k(Ut.start,me.width,4),Oe=k(fn.start,me.width,4);Ut.start<=at+1&&jt===Oe&&k(Ut.start+Ut.count-1,me.width,4)===jt?fn.count=Math.max(fn.count,Ut.start+Ut.count-fn.start):(++Ft,Mt[Ft]=Ut)}Mt.length=Ft+1;let Sn=t.getParameter(i.UNPACK_ROW_LENGTH),Be=t.getParameter(i.UNPACK_SKIP_PIXELS),ct=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,me.width);for(let $e=0,fn=Mt.length;$e<fn;$e++){let Ut=Mt[$e],at=Math.floor(Ut.start/4),jt=Math.ceil(Ut.count/4),Oe=at%me.width,cn=Math.floor(at/me.width),dn=jt;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Oe),t.pixelStorei(i.UNPACK_SKIP_ROWS,cn),t.texSubImage2D(i.TEXTURE_2D,0,Oe,cn,dn,1,Ee,Ot,me.data)}fe.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Sn),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Be),t.pixelStorei(i.UNPACK_SKIP_ROWS,ct)}})(E,R,Y,Z)):t.texImage2D(i.TEXTURE_2D,0,de,R.width,R.height,0,Y,Z,R.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Me&&_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,de,Se[0].width,Se[0].height,R.depth);for(let fe=0,me=Se.length;fe<me;fe++)if(K=Se[fe],E.format!==rr)if(Y!==null)if(Me){if(Ge)if(E.layerUpdates.size>0){let Ee=Bu(K.width,K.height,E.format,E.type);for(let Ot of E.layerUpdates){let Mt=K.data.subarray(Ot*Ee/K.data.BYTES_PER_ELEMENT,(Ot+1)*Ee/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,Ot,K.width,K.height,1,Y,Mt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,K.width,K.height,R.depth,Y,K.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,fe,de,K.width,K.height,R.depth,0,K.data,0,0);else tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Me?Ge&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,K.width,K.height,R.depth,Y,Z,K.data):t.texImage3D(i.TEXTURE_2D_ARRAY,fe,de,K.width,K.height,R.depth,0,Y,Z,K.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Me&&_e&&t.texStorage2D(i.TEXTURE_2D,ce,de,Se[0].width,Se[0].height);for(let fe=0,me=Se.length;fe<me;fe++)K=Se[fe],E.format!==rr?Y!==null?Me?Ge&&t.compressedTexSubImage2D(i.TEXTURE_2D,fe,0,0,K.width,K.height,Y,K.data):t.compressedTexImage2D(i.TEXTURE_2D,fe,de,K.width,K.height,0,K.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Me?Ge&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,K.width,K.height,Y,Z,K.data):t.texImage2D(i.TEXTURE_2D,fe,de,K.width,K.height,0,Y,Z,K.data)}else if(E.isDataArrayTexture)if(Me){if(_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,de,R.width,R.height,R.depth),Ge)if(E.layerUpdates.size>0){let fe=Bu(R.width,R.height,E.format,E.type);for(let me of E.layerUpdates){let Ee=R.data.subarray(me*fe/R.data.BYTES_PER_ELEMENT,(me+1)*fe/R.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,R.width,R.height,1,Y,Z,Ee)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,R.width,R.height,R.depth,Y,Z,R.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,de,R.width,R.height,R.depth,0,Y,Z,R.data);else if(E.isData3DTexture)Me?(_e&&t.texStorage3D(i.TEXTURE_3D,ce,de,R.width,R.height,R.depth),Ge&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,R.width,R.height,R.depth,Y,Z,R.data)):t.texImage3D(i.TEXTURE_3D,0,de,R.width,R.height,R.depth,0,Y,Z,R.data);else if(E.isFramebufferTexture){if(_e)if(Me)t.texStorage2D(i.TEXTURE_2D,ce,de,R.width,R.height);else{let fe=R.width,me=R.height;for(let Ee=0;Ee<ce;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,de,fe,me,0,Y,Z,null),fe>>=1,me>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let fe=i.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),R.parentNode!==fe)return fe.appendChild(R),p.add(E),fe.onpaint=me=>{let Ee=me.changedElements;for(let Ot of p)Ee.includes(Ot.image)&&(Ot.needsUpdate=!0)},void fe.requestPaint();if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,R);else{let Ee=i.RGBA,Ot=i.RGBA,Mt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ee,Ot,Mt,R)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Se.length>0){if(Me&&_e){let fe=oe(Se[0]);t.texStorage2D(i.TEXTURE_2D,ce,de,fe.width,fe.height)}for(let fe=0,me=Se.length;fe<me;fe++)K=Se[fe],Me?Ge&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,Y,Z,K):t.texImage2D(i.TEXTURE_2D,fe,de,Y,Z,K);E.generateMipmaps=!1}else if(Me){if(_e){let fe=oe(R);t.texStorage2D(i.TEXTURE_2D,ce,de,fe.width,fe.height)}Ge&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Y,Z,R)}else t.texImage2D(i.TEXTURE_2D,0,de,Y,Z,R);g(E)&&_(D),O.__version=B.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function he(w,E,C,D,y,B){let O=s.convert(C.format,C.colorSpace),R=s.convert(C.type),Y=T(C.internalFormat,O,R,C.normalized,C.colorSpace),Z=n.get(E),K=n.get(C);if(K.__renderTarget=E,!Z.__hasExternalTextures){let de=Math.max(1,E.width>>B),Se=Math.max(1,E.height>>B);y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?t.texImage3D(y,B,Y,de,Se,E.depth,0,O,R,null):t.texImage2D(y,B,Y,de,Se,0,O,R,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),ie(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,D,y,K.__webglTexture,0,q(E)):(y===i.TEXTURE_2D||y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,D,y,K.__webglTexture,B),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(w,E,C){if(i.bindRenderbuffer(i.RENDERBUFFER,w),E.depthBuffer){let D=E.depthTexture,y=D&&D.isDepthTexture?D.type:null,B=S(E.stencilBuffer,y),O=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ie(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,q(E),B,E.width,E.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,q(E),B,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,B,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,O,i.RENDERBUFFER,w)}else{let D=E.textures;for(let y=0;y<D.length;y++){let B=D[y],O=s.convert(B.format,B.colorSpace),R=s.convert(B.type),Y=T(B.internalFormat,O,R,B.normalized,B.colorSpace);ie(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,q(E),Y,E.width,E.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,q(E),Y,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Y,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ye(w,E,C){let D=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let y=n.get(E.depthTexture);if(y.__renderTarget=E,y.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),D){if(y.__webglInit===void 0&&(y.__webglInit=!0,E.depthTexture.addEventListener("dispose",I)),y.__webglTexture===void 0){y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture),re(i.TEXTURE_CUBE_MAP,E.depthTexture);let Z=s.convert(E.depthTexture.format),K=s.convert(E.depthTexture.type),de;E.depthTexture.format===ls?de=i.DEPTH_COMPONENT24:E.depthTexture.format===cs&&(de=i.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,de,E.width,E.height,0,Z,K,null)}}else j(E.depthTexture,0);let B=y.__webglTexture,O=q(E),R=D?i.TEXTURE_CUBE_MAP_POSITIVE_X+C:i.TEXTURE_2D,Y=E.depthTexture.format===cs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===ls)ie(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,R,B,0,O):i.framebufferTexture2D(i.FRAMEBUFFER,Y,R,B,0);else{if(E.depthTexture.format!==cs)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");ie(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,R,B,0,O):i.framebufferTexture2D(i.FRAMEBUFFER,Y,R,B,0)}}function Ue(w){let E=n.get(w),C=w.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==w.depthTexture){let D=w.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),D){let y=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,D.removeEventListener("dispose",y)};D.addEventListener("dispose",y),E.__depthDisposeCallback=y}E.__boundDepthTexture=D}if(w.depthTexture&&!E.__autoAllocateDepthBuffer)if(C)for(let D=0;D<6;D++)ye(E.__webglFramebuffer[D],w,D);else{let D=w.texture.mipmaps;D&&D.length>0?ye(E.__webglFramebuffer[0],w,0):ye(E.__webglFramebuffer,w,0)}else if(C){E.__webglDepthbuffer=[];for(let D=0;D<6;D++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[D]),E.__webglDepthbuffer[D]===void 0)E.__webglDepthbuffer[D]=i.createRenderbuffer(),Ie(E.__webglDepthbuffer[D],w,!1);else{let y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=E.__webglDepthbuffer[D];i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,B)}}else{let D=w.texture.mipmaps;if(D&&D.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),Ie(E.__webglDepthbuffer,w,!1);else{let y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,B)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let we=[],ue=[];function q(w){return Math.min(r.maxSamples,w.samples)}function ie(w){let E=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function le(w,E){let C=w.colorSpace,D=w.format,y=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||C!==oc&&C!==us&&(Lt.getTransfer(C)===ln?D===rr&&y===Hi||tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):st("WebGLTextures: Unsupported texture color space:",C)),E}function oe(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=function(){let w=N;return w>=r.maxTextures&&tt("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+r.maxTextures),N+=1,w},this.resetTextureUnits=function(){N=0},this.getTextureUnits=function(){return N},this.setTextureUnits=function(w){N=w},this.setTexture2D=j,this.setTexture2DArray=function(w,E){let C=n.get(w);w.isRenderTargetTexture===!1&&w.version>0&&C.__version!==w.version?Q(C,w,E):(w.isExternalTexture&&(C.__webglTexture=w.sourceTexture?w.sourceTexture:null),t.bindTexture(i.TEXTURE_2D_ARRAY,C.__webglTexture,i.TEXTURE0+E))},this.setTexture3D=function(w,E){let C=n.get(w);w.isRenderTargetTexture===!1&&w.version>0&&C.__version!==w.version?Q(C,w,E):t.bindTexture(i.TEXTURE_3D,C.__webglTexture,i.TEXTURE0+E)},this.setTextureCube=function(w,E){let C=n.get(w);w.isCubeDepthTexture!==!0&&w.version>0&&C.__version!==w.version?(function(D,y,B){if(y.image.length!==6)return;let O=X(D,y),R=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+B);let Y=n.get(R);if(R.version!==Y.__version||O===!0){t.activeTexture(i.TEXTURE0+B);let Z=Lt.getPrimaries(Lt.workingColorSpace),K=y.colorSpace===us?null:Lt.getPrimaries(y.colorSpace),de=y.colorSpace===us||Z===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);let Se=y.isCompressedTexture||y.image[0].isCompressedTexture,Me=y.image[0]&&y.image[0].isDataTexture,_e=[];for(let Be=0;Be<6;Be++)_e[Be]=Se||Me?Me?y.image[Be].image:y.image[Be]:v(y.image[Be],!0,r.maxCubemapSize),_e[Be]=le(y,_e[Be]);let Ge=_e[0],ce=s.convert(y.format,y.colorSpace),fe=s.convert(y.type),me=T(y.internalFormat,ce,fe,y.normalized,y.colorSpace),Ee=y.isVideoTexture!==!0,Ot=Y.__version===void 0||O===!0,Mt=R.dataReady,Ft,Sn=b(y,Ge);if(re(i.TEXTURE_CUBE_MAP,y),Se){Ee&&Ot&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Sn,me,Ge.width,Ge.height);for(let Be=0;Be<6;Be++){Ft=_e[Be].mipmaps;for(let ct=0;ct<Ft.length;ct++){let $e=Ft[ct];y.format!==rr?ce!==null?Ee?Mt&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,ct,0,0,$e.width,$e.height,ce,$e.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,ct,me,$e.width,$e.height,0,$e.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ee?Mt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,ct,0,0,$e.width,$e.height,ce,fe,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,ct,me,$e.width,$e.height,0,ce,fe,$e.data)}}}else{if(Ft=y.mipmaps,Ee&&Ot){Ft.length>0&&Sn++;let Be=oe(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Sn,me,Be.width,Be.height)}for(let Be=0;Be<6;Be++)if(Me){Ee?Mt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,_e[Be].width,_e[Be].height,ce,fe,_e[Be].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,me,_e[Be].width,_e[Be].height,0,ce,fe,_e[Be].data);for(let ct=0;ct<Ft.length;ct++){let $e=Ft[ct].image[Be].image;Ee?Mt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,ct+1,0,0,$e.width,$e.height,ce,fe,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,ct+1,me,$e.width,$e.height,0,ce,fe,$e.data)}}else{Ee?Mt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,ce,fe,_e[Be]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,me,ce,fe,_e[Be]);for(let ct=0;ct<Ft.length;ct++){let $e=Ft[ct];Ee?Mt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,ct+1,0,0,ce,fe,$e.image[Be]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Be,ct+1,me,ce,fe,$e.image[Be])}}}g(y)&&_(i.TEXTURE_CUBE_MAP),Y.__version=R.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version})(C,w,E):t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+E)},this.rebindTextures=function(w,E,C){let D=n.get(w);E!==void 0&&he(D.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),C!==void 0&&Ue(w)},this.setupRenderTarget=function(w){let E=w.texture,C=n.get(w),D=n.get(E);w.addEventListener("dispose",U);let y=w.textures,B=w.isWebGLCubeRenderTarget===!0,O=y.length>1;if(O||(D.__webglTexture===void 0&&(D.__webglTexture=i.createTexture()),D.__version=E.version,a.memory.textures++),B){C.__webglFramebuffer=[];for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0){C.__webglFramebuffer[R]=[];for(let Y=0;Y<E.mipmaps.length;Y++)C.__webglFramebuffer[R][Y]=i.createFramebuffer()}else C.__webglFramebuffer[R]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){C.__webglFramebuffer=[];for(let R=0;R<E.mipmaps.length;R++)C.__webglFramebuffer[R]=i.createFramebuffer()}else C.__webglFramebuffer=i.createFramebuffer();if(O)for(let R=0,Y=y.length;R<Y;R++){let Z=n.get(y[R]);Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&ie(w)===!1){C.__webglMultisampledFramebuffer=i.createFramebuffer(),C.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let R=0;R<y.length;R++){let Y=y[R];C.__webglColorRenderbuffer[R]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,C.__webglColorRenderbuffer[R]);let Z=s.convert(Y.format,Y.colorSpace),K=s.convert(Y.type),de=T(Y.internalFormat,Z,K,Y.normalized,Y.colorSpace,w.isXRRenderTarget===!0),Se=q(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,de,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+R,i.RENDERBUFFER,C.__webglColorRenderbuffer[R])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(C.__webglDepthRenderbuffer=i.createRenderbuffer(),Ie(C.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(B){t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture),re(i.TEXTURE_CUBE_MAP,E);for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0)for(let Y=0;Y<E.mipmaps.length;Y++)he(C.__webglFramebuffer[R][Y],w,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,Y);else he(C.__webglFramebuffer[R],w,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,0);g(E)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(O){for(let R=0,Y=y.length;R<Y;R++){let Z=y[R],K=n.get(Z),de=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(de=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,K.__webglTexture),re(de,Z),he(C.__webglFramebuffer,w,Z,i.COLOR_ATTACHMENT0+R,de,0),g(Z)&&_(de)}t.unbindTexture()}else{let R=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(R=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(R,D.__webglTexture),re(R,E),E.mipmaps&&E.mipmaps.length>0)for(let Y=0;Y<E.mipmaps.length;Y++)he(C.__webglFramebuffer[Y],w,E,i.COLOR_ATTACHMENT0,R,Y);else he(C.__webglFramebuffer,w,E,i.COLOR_ATTACHMENT0,R,0);g(E)&&_(R),t.unbindTexture()}w.depthBuffer&&Ue(w)},this.updateRenderTargetMipmap=function(w){let E=w.textures;for(let C=0,D=E.length;C<D;C++){let y=E[C];if(g(y)){let B=M(w),O=n.get(y).__webglTexture;t.bindTexture(B,O),_(B),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(w){if(w.samples>0){if(ie(w)===!1){let E=w.textures,C=w.width,D=w.height,y=i.COLOR_BUFFER_BIT,B=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,O=n.get(w),R=E.length>1;if(R)for(let Z=0;Z<E.length;Z++)t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,O.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,O.__webglMultisampledFramebuffer);let Y=w.texture.mipmaps;Y&&Y.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,O.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,O.__webglFramebuffer);for(let Z=0;Z<E.length;Z++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(y|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(y|=i.STENCIL_BUFFER_BIT)),R){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,O.__webglColorRenderbuffer[Z]);let K=n.get(E[Z]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,K,0)}i.blitFramebuffer(0,0,C,D,0,0,C,D,y,i.NEAREST),c===!0&&(we.length=0,ue.length=0,we.push(i.COLOR_ATTACHMENT0+Z),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(we.push(B),ue.push(B),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ue)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,we))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),R)for(let Z=0;Z<E.length;Z++){t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,O.__webglColorRenderbuffer[Z]);let K=n.get(E[Z]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,O.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.TEXTURE_2D,K,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,O.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&c){let E=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=he,this.useMultisampledRTT=ie,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function lS(i,e){return{convert:function(t,n=us){let r,s=Lt.getTransfer(n);if(t===Hi)return i.UNSIGNED_BYTE;if(t===$h)return i.UNSIGNED_SHORT_4_4_4_4;if(t===Zh)return i.UNSIGNED_SHORT_5_5_5_1;if(t===Cf)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===If)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===Af)return i.BYTE;if(t===Rf)return i.SHORT;if(t===io)return i.UNSIGNED_SHORT;if(t===Yh)return i.INT;if(t===Wr)return i.UNSIGNED_INT;if(t===Pi)return i.FLOAT;if(t===ir)return i.HALF_FLOAT;if(t===Pf)return i.ALPHA;if(t===Lf)return i.RGB;if(t===rr)return i.RGBA;if(t===ls)return i.DEPTH_COMPONENT;if(t===cs)return i.DEPTH_STENCIL;if(t===ro)return i.RED;if(t===Jh)return i.RED_INTEGER;if(t===hs)return i.RG;if(t===Kh)return i.RG_INTEGER;if(t===Qh)return i.RGBA_INTEGER;if(t===tc||t===nc||t===ic||t===rc)if(s===ln){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===tc)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===nc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===ic)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===rc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===tc)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===nc)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===ic)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===rc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===eu||t===tu||t===nu||t===iu){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===eu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===tu)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===nu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===iu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===ru||t===su||t===au||t===ou||t===lu||t===sc||t===cu){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===ru||t===su)return s===ln?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===au)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(t===ou)return r.COMPRESSED_R11_EAC;if(t===lu)return r.COMPRESSED_SIGNED_R11_EAC;if(t===sc)return r.COMPRESSED_RG11_EAC;if(t===cu)return r.COMPRESSED_SIGNED_RG11_EAC}if(t===hu||t===uu||t===du||t===pu||t===fu||t===mu||t===gu||t===_u||t===vu||t===xu||t===yu||t===Su||t===Mu||t===bu){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===hu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===uu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===du)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===pu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===fu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===mu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===gu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===_u)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===vu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===xu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===yu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Su)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Mu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===bu)return s===ln?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Tu||t===Eu||t===wu){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Tu)return s===ln?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Eu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===wu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Au||t===Ru||t===ac||t===Cu){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===Au)return r.COMPRESSED_RED_RGTC1_EXT;if(t===Ru)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===ac)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Cu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===na?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var cS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hS=`
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

}`,id=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ba(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new In({vertexShader:cS,fragmentShader:hS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ei(new $s(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},rd=class extends Ki{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,p=null,d=null,u=null,m=null,f=typeof XRWebGLBinding<"u",v=new id,g={},_=t.getContextAttributes(),M=null,T=null,S=[],b=[],I=new pe,U=null,z=null,N=new Qn;N.viewport=new on;let j=new Qn;j.viewport=new on;let F=[N,j],ee=new jl,ae=null,re=null;function X(ue){let q=b.indexOf(ue.inputSource);if(q===-1)return;let ie=S[q];ie!==void 0&&(ie.update(ue.inputSource,ue.frame,l||a),ie.dispatchEvent({type:ue.type,data:ue.inputSource}))}function k(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",Q);for(let ue=0;ue<S.length;ue++){let q=b[ue];q!==null&&(b[ue]=null,S[ue].disconnect(q))}ae=null,re=null,v.reset();for(let ue in g)delete g[ue];if(e.setRenderTarget(M),u=null,d=null,p=null,r=null,T=null,we.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(I.width,I.height,!1),z!==null){let ue=z.camera;ue.fov=z.fov,ue.zoom=z.zoom,ue.updateProjectionMatrix(),z=null}n.dispatchEvent({type:"sessionend"})}function Q(ue){for(let q=0;q<ue.removed.length;q++){let ie=ue.removed[q],le=b.indexOf(ie);le>=0&&(b[le]=null,S[le].disconnect(ie))}for(let q=0;q<ue.added.length;q++){let ie=ue.added[q],le=b.indexOf(ie);if(le===-1){for(let w=0;w<S.length;w++){if(w>=b.length){b.push(ie),le=w;break}if(b[w]===null){b[w]=ie,le=w;break}}if(le===-1)break}let oe=S[le];oe&&oe.connect(ie)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ue){let q=S[ue];return q===void 0&&(q=new Ws,S[ue]=q),q.getTargetRaySpace()},this.getControllerGrip=function(ue){let q=S[ue];return q===void 0&&(q=new Ws,S[ue]=q),q.getGripSpace()},this.getHand=function(ue){let q=S[ue];return q===void 0&&(q=new Ws,S[ue]=q),q.getHandSpace()},this.setFramebufferScaleFactor=function(ue){s=ue,n.isPresenting===!0&&tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ue){o=ue,n.isPresenting===!0&&tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ue){l=ue},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return p===null&&f&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(ue){if(r=ue,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",k),r.addEventListener("inputsourceschange",Q),_.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(I),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let q=null,ie=null,le=null;_.depth&&(le=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=_.stencil?cs:ls,ie=_.stencil?na:Wr);let oe={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:s};p=this.getBinding(),d=p.createProjectionLayer(oe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new gi(d.textureWidth,d.textureHeight,{format:rr,type:Hi,depthTexture:new Vr(d.textureWidth,d.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let q={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,q),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),T=new gi(u.framebufferWidth,u.framebufferHeight,{format:rr,type:Hi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),we.setContext(r),we.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let he=new P,Ie=new P;function ye(ue,q){q===null?ue.matrixWorld.copy(ue.matrix):ue.matrixWorld.multiplyMatrices(q.matrixWorld,ue.matrix),ue.matrixWorldInverse.copy(ue.matrixWorld).invert()}this.updateCamera=function(ue){if(r===null)return;let q=ue.near,ie=ue.far;v.texture!==null&&(v.depthNear>0&&(q=v.depthNear),v.depthFar>0&&(ie=v.depthFar)),ee.near=j.near=N.near=q,ee.far=j.far=N.far=ie,ae===ee.near&&re===ee.far||(r.updateRenderState({depthNear:ee.near,depthFar:ee.far}),ae=ee.near,re=ee.far),ee.layers.mask=6|ue.layers.mask,N.layers.mask=-5&ee.layers.mask,j.layers.mask=-3&ee.layers.mask;let le=ue.parent,oe=ee.cameras;ye(ee,le);for(let w=0;w<oe.length;w++)ye(oe[w],le);oe.length===2?(function(w,E,C){he.setFromMatrixPosition(E.matrixWorld),Ie.setFromMatrixPosition(C.matrixWorld);let D=he.distanceTo(Ie),y=E.projectionMatrix.elements,B=C.projectionMatrix.elements,O=y[14]/(y[10]-1),R=y[14]/(y[10]+1),Y=(y[9]+1)/y[5],Z=(y[9]-1)/y[5],K=(y[8]-1)/y[0],de=(B[8]+1)/B[0],Se=O*K,Me=O*de,_e=D/(-K+de),Ge=_e*-K;if(E.matrixWorld.decompose(w.position,w.quaternion,w.scale),w.translateX(Ge),w.translateZ(_e),w.matrixWorld.compose(w.position,w.quaternion,w.scale),w.matrixWorldInverse.copy(w.matrixWorld).invert(),y[10]===-1)w.projectionMatrix.copy(E.projectionMatrix),w.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let ce=O+_e,fe=R+_e,me=Se-Ge,Ee=Me+(D-Ge),Ot=Y*R/fe*ce,Mt=Z*R/fe*ce;w.projectionMatrix.makePerspective(me,Ee,Ot,Mt,ce,fe),w.projectionMatrixInverse.copy(w.projectionMatrix).invert()}})(ee,N,j):ee.projectionMatrix.copy(N.projectionMatrix),z===null&&ue.isPerspectiveCamera&&(z={camera:ue,fov:ue.fov,zoom:ue.zoom}),(function(w,E,C){C===null?w.matrix.copy(E.matrixWorld):(w.matrix.copy(C.matrixWorld),w.matrix.invert(),w.matrix.multiply(E.matrixWorld)),w.matrix.decompose(w.position,w.quaternion,w.scale),w.updateMatrixWorld(!0),w.projectionMatrix.copy(E.projectionMatrix),w.projectionMatrixInverse.copy(E.projectionMatrixInverse),w.isPerspectiveCamera&&(w.fov=2*tl*Math.atan(1/w.projectionMatrix.elements[5]),w.zoom=1)})(ue,ee,le)},this.getCamera=function(){return ee},this.getFoveation=function(){if(d!==null||u!==null)return c},this.setFoveation=function(ue){c=ue,d!==null&&(d.fixedFoveation=ue),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=ue)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(ee)},this.getCameraTexture=function(ue){return g[ue]};let Ue=null,we=new ym;we.setAnimationLoop(function(ue,q){if(h=q.getViewerPose(l||a),m=q,h!==null){let ie=h.views;u!==null&&(e.setRenderTargetFramebuffer(T,u.framebuffer),e.setRenderTarget(T));let le=!1;ie.length!==ee.cameras.length&&(ee.cameras.length=0,le=!0);for(let w=0;w<ie.length;w++){let E=ie[w],C=null;if(u!==null)C=u.getViewport(E);else{let y=p.getViewSubImage(d,E);C=y.viewport,w===0&&(e.setRenderTargetTextures(T,y.colorTexture,y.depthStencilTexture),e.setRenderTarget(T))}let D=F[w];D===void 0&&(D=new Qn,D.layers.enable(w),D.viewport=new on,F[w]=D),D.matrix.fromArray(E.transform.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale),D.projectionMatrix.fromArray(E.projectionMatrix),D.projectionMatrixInverse.copy(D.projectionMatrix).invert(),D.viewport.set(C.x,C.y,C.width,C.height),w===0&&(ee.matrix.copy(D.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale)),le===!0&&ee.cameras.push(D)}let oe=r.enabledFeatures;if(oe&&oe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&f){p=n.getBinding();let w=p.getDepthInformation(ie[0]);w&&w.isValid&&w.texture&&v.init(w,r.renderState)}if(oe&&oe.includes("camera-access")&&f){e.state.unbindTexture(),p=n.getBinding();for(let w=0;w<ie.length;w++){let E=ie[w].camera;if(E){let C=g[E];C||(C=new Ba,g[E]=C);let D=p.getCameraImage(E);C.sourceTexture=D}}}}for(let ie=0;ie<S.length;ie++){let le=b[ie],oe=S[ie];le!==null&&oe!==void 0&&oe.update(le,q,l||a)}Ue&&Ue(ue,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),m=null}),this.setAnimationLoop=function(ue){Ue=ue},this.dispose=function(){}}},uS=new St,wm=new ft;function dS(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===ti&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===ti&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(r.envMap.value=o,r.envMapRotation.value.setFromMatrix4(uS.makeRotationFromEuler(c)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply(wm),r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,Ou(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,c){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(r,s):s.isMeshLambertMaterial?(n(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(r,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(r,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(l,h,p){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ti&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.retroreflectivity>0&&(l.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=p.texture,l.transmissionSamplerSize.value.set(p.width,p.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(r,s,c)):s.isMeshMatcapMaterial?(n(r,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(l,h){let p=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(p.matrixWorld),l.nearDistance.value=p.shadow.camera.near,l.farDistance.value=p.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(l,h,p,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*p,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function pS(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(d,u,m,f){if((function(v,g,_,M){let T=v.value,S=g+"_"+_;if(M[S]===void 0)return typeof T=="number"||typeof T=="boolean"?M[S]=T:ArrayBuffer.isView(T)?M[S]=T.slice():M[S]=T.clone(),!0;{let b=M[S];if(typeof T=="number"||typeof T=="boolean"){if(b!==T)return M[S]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(b.equals(T)===!1)return b.copy(T),!0}}return!1})(d,u,m,f)===!0){let v=d.__offset,g=d.value;if(Array.isArray(g)){let _=0;for(let M=0;M<g.length;M++){let T=g[M],S=h(T);l(T,d.__data,_),typeof T=="number"||typeof T=="boolean"||T.isMatrix3||ArrayBuffer.isView(T)||(_+=S.storage/Float32Array.BYTES_PER_ELEMENT)}}else l(g,d.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,d.__data)}}function l(d,u,m){typeof d=="number"||typeof d=="boolean"?u[0]=d:d.isMatrix3?(u[0]=d.elements[0],u[1]=d.elements[1],u[2]=d.elements[2],u[3]=0,u[4]=d.elements[3],u[5]=d.elements[4],u[6]=d.elements[5],u[7]=0,u[8]=d.elements[6],u[9]=d.elements[7],u[10]=d.elements[8],u[11]=0):ArrayBuffer.isView(d)?u.set(new d.constructor(d.buffer,d.byteOffset,u.length)):d.toArray(u,m)}function h(d){let u={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(u.boundary=4,u.storage=4):d.isVector2?(u.boundary=8,u.storage=8):d.isVector3||d.isColor?(u.boundary=16,u.storage=12):d.isVector4?(u.boundary=16,u.storage=16):d.isMatrix3?(u.boundary=48,u.storage=48):d.isMatrix4?(u.boundary=64,u.storage=64):d.isTexture?tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(d)?(u.boundary=16,u.storage=d.byteLength):tt("WebGLRenderer: Unsupported uniform value type.",d),u}function p(d){let u=d.target;u.removeEventListener("dispose",p);let m=a.indexOf(u.__bindingPointIndex);a.splice(m,1),i.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}return{bind:function(d,u){let m=u.program;n.uniformBlockBinding(d,m)},update:function(d,u){let m=r[d.id];m===void 0&&((function(g){let _=g.uniforms,M=0,T=16;for(let b=0,I=_.length;b<I;b++){let U=Array.isArray(_[b])?_[b]:[_[b]];for(let z=0,N=U.length;z<N;z++){let j=U[z],F=Array.isArray(j.value)?j.value:[j.value];for(let ee=0,ae=F.length;ee<ae;ee++){let re=h(F[ee]),X=M%T,k=X%re.boundary,Q=X+k;M+=k,Q!==0&&T-Q<re.storage&&(M+=T-Q),j.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=M,M+=re.storage}}}let S=M%T;S>0&&(M+=T-S),g.__size=M,g.__cache={}})(d),m=(function(g){let _=(function(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return st("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=_;let M=i.createBuffer(),T=g.__size,S=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,T,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,M),M})(d),r[d.id]=m,d.addEventListener("dispose",p));let f=u.program;n.updateUBOMapping(d,f);let v=e.render.frame;s[d.id]!==v&&((function(g){let _=r[g.id],M=g.uniforms,T=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let S=0,b=M.length;S<b;S++){let I=M[S];if(Array.isArray(I))for(let U=0,z=I.length;U<z;U++)c(I[U],S,U,T);else c(I,S,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)})(d),s[d.id]=v)},dispose:function(){for(let d in r)i.deleteBuffer(r[d]);a=[],r={},s={}}}}wm.set(-1,0,0,0,1,0,0,0,1);var fS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),sr=null;function mS(){return sr===null&&(sr=new ts(fS,16,16,hs,ir),sr.name="DFG_LUT",sr.minFilter=ni,sr.magFilter=ni,sr.wrapS=Ql,sr.wrapT=Ql,sr.generateMipmaps=!1,sr.needsUpdate=!0),sr}var mc=class{constructor(e={}){let{canvas:t=kf(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Hi}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let f=u,v=new Set([Qh,Kh,Jh]),g=new Set([Hi,Wr,io,na,$h,Zh]),_=new Uint32Array(4),M=new Int32Array(4),T=new P,S=null,b=null,I=[],U=[],z=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,j=!1,F=null,ee=null,ae=null,re=null;this._outputColorSpace=Pu;let X=0,k=0,Q=null,he=-1,Ie=null,ye=new on,Ue=new on,we=null,ue=new _t(0),q=0,ie=t.width,le=t.height,oe=1,w=null,E=null,C=new on(0,0,ie,le),D=new on(0,0,ie,le),y=!1,B=new zr,O=!1,R=!1,Y=new St,Z=new P,K=new on,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Me(){return Q===null?oe:1}let _e,Ge,ce,fe,me,Ee,Ot,Mt,Ft,Sn,Be,ct,$e,fn,Ut,at,jt,Oe,cn,dn,Zt,Fn,ri,W=n;function Wn(A,G){return t.getContext(A,G)}try{let A={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Gt,!1),t.addEventListener("webglcontextrestored",vn,!1),t.addEventListener("webglcontextcreationerror",ze,!1),W===null){let G="webgl2";if(W=Wn(G,A),W===null)throw Wn(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ui()}catch(A){throw t.removeEventListener("webglcontextlost",Gt,!1),t.removeEventListener("webglcontextrestored",vn,!1),t.removeEventListener("webglcontextcreationerror",ze,!1),st("WebGLRenderer: "+A.message),A}function ui(){_e=new by(W),_e.init(),Zt=new lS(W,_e),Ge=new gy(W,_e,e,Zt),ce=new aS(W,_e),Ge.reversedDepthBuffer&&d&&ce.buffers.depth.setReversed(!0),ee=W.createFramebuffer(),ae=W.createFramebuffer(),re=W.createFramebuffer(),fe=new wy(W),me=new q1,Ee=new oS(W,_e,ce,me,Ge,Zt,fe),Ot=new My(N),Mt=new P_(W),Fn=new fy(W,Mt),Ft=new Ty(W,Mt,fe,Fn),Sn=new Ry(W,Ft,Mt,Fn,fe),Oe=new Ay(W,Ge,Ee),Ut=new _y(me),Be=new X1(N,Ot,_e,Ge,Fn,Ut),ct=new dS(N,me),$e=new Y1,fn=new eS(_e),jt=new py(N,Ot,ce,Sn,m,c),at=new sS(N,Sn,Ge),ri=new pS(W,fe,Ge,ce),cn=new my(W,_e,fe),dn=new Ey(W,_e,fe),fe.programs=Be.programs,N.capabilities=Ge,N.extensions=_e,N.properties=me,N.renderLists=$e,N.shadowMap=at,N.state=ce,N.info=fe}f!==Hi&&(z=new Iy(f,t.width,t.height,o,r,s));let dt=new rd(N,W);function Gt(A){A.preventDefault(),Ra("WebGLRenderer: Context Lost."),j=!0}function vn(){Ra("WebGLRenderer: Context Restored."),j=!1;let A=fe.autoReset,G=at.enabled,J=at.autoUpdate,ne=at.needsUpdate,te=at.type;ui(),fe.autoReset=A,at.enabled=G,at.autoUpdate=J,at.needsUpdate=ne,at.type=te}function ze(A){st("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function _i(A){let G=A.target;G.removeEventListener("dispose",_i),(function(J){(function(ne){let te=me.get(ne).programs;te!==void 0&&(te.forEach(function(xe){Be.releaseProgram(xe)}),ne.isShaderMaterial&&Be.releaseShaderCache(ne))})(J),me.remove(J)})(G)}function Bn(A,G,J,ne){F!==null&&A.isNodeMaterial&&F.setObject(ne,A),O===!0&&Ut.setState(A,J,!1),A.transparent===!0&&A.side===tr&&A.forceSinglePass===!1?(A.side=ti,A.needsUpdate=!0,vi(A,G,ne),A.side=Qs,A.needsUpdate=!0,vi(A,G,ne),A.side=tr):vi(A,G,ne)}this.xr=dt,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let A=_e.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=_e.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(A){A!==void 0&&(oe=A,this.setSize(ie,le,!1))},this.getSize=function(A){return A.set(ie,le)},this.setSize=function(A,G,J=!0){dt.isPresenting?tt("WebGLRenderer: Can't change size while VR device is presenting."):(ie=A,le=G,t.width=Math.floor(A*oe),t.height=Math.floor(G*oe),J===!0&&(t.style.width=A+"px",t.style.height=G+"px"),z!==null&&z.setSize(t.width,t.height),this.setViewport(0,0,A,G))},this.getDrawingBufferSize=function(A){return A.set(ie*oe,le*oe).floor()},this.setDrawingBufferSize=function(A,G,J){ie=A,le=G,oe=J,t.width=Math.floor(A*J),t.height=Math.floor(G*J),this.setViewport(0,0,A,G)},this.setEffects=function(A){if(f!==Hi){if(A){for(let G=0;G<A.length;G++)if(A[G].isOutputPass===!0){tt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}z.setEffects(A||[])}else st("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(A){return A.copy(ye)},this.getViewport=function(A){return A.copy(C)},this.setViewport=function(A,G,J,ne){A.isVector4?C.set(A.x,A.y,A.z,A.w):C.set(A,G,J,ne),ce.viewport(ye.copy(C).multiplyScalar(oe).round())},this.getScissor=function(A){return A.copy(D)},this.setScissor=function(A,G,J,ne){A.isVector4?D.set(A.x,A.y,A.z,A.w):D.set(A,G,J,ne),ce.scissor(Ue.copy(D).multiplyScalar(oe).round())},this.getScissorTest=function(){return y},this.setScissorTest=function(A){ce.setScissorTest(y=A)},this.setOpaqueSort=function(A){w=A},this.setTransparentSort=function(A){E=A},this.getClearColor=function(A){return A.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,J=!0){let ne=0;if(A){let te=!1;if(Q!==null){let xe=Q.texture.format;te=v.has(xe)}if(te){let xe=Q.texture.type,Ae=g.has(xe),Te=jt.getClearColor(),Pe=jt.getClearAlpha(),Ye=Te.r,Qe=Te.g,nt=Te.b;Ae?(_[0]=Ye,_[1]=Qe,_[2]=nt,_[3]=Pe,W.clearBufferuiv(W.COLOR,0,_)):(M[0]=Ye,M[1]=Qe,M[2]=nt,M[3]=Pe,W.clearBufferiv(W.COLOR,0,M))}else ne|=W.COLOR_BUFFER_BIT}G&&(ne|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(ne|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&W.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),F=A},this.dispose=function(){t.removeEventListener("webglcontextlost",Gt,!1),t.removeEventListener("webglcontextrestored",vn,!1),t.removeEventListener("webglcontextcreationerror",ze,!1),jt.dispose(),$e.dispose(),fn.dispose(),me.dispose(),Ot.dispose(),Sn.dispose(),Fn.dispose(),ri.dispose(),Be.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",Xi),dt.removeEventListener("sessionend",xs),di.stop()},this.renderBufferDirect=function(A,G,J,ne,te,xe){G===null&&(G=de);let Ae=te.isMesh&&te.matrixWorld.determinantAffine()<0,Te=(function(mt,zt,nn,Ze,He){zt.isScene!==!0&&(zt=de),Ee.resetTextureUnits();let An=zt.fog,br=Ze.isMeshStandardMaterial||Ze.isMeshLambertMaterial||Ze.isMeshPhongMaterial?zt.environment:null,V=Q===null?N.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Lt.workingColorSpace,se=Ze.isMeshStandardMaterial||Ze.isMeshLambertMaterial&&!Ze.envMap||Ze.isMeshPhongMaterial&&!Ze.envMap,ve=Ot.get(Ze.envMap||br,se),Je=Ze.vertexColors===!0&&!!nn.attributes.color&&nn.attributes.color.itemSize===4,et=!!nn.attributes.tangent&&(!!Ze.normalMap||Ze.anisotropy>0),Fe=!!nn.morphAttributes.position,qe=!!nn.morphAttributes.normal,Jt=!!nn.morphAttributes.color,Wt=Vi;Ze.toneMapped&&(Q!==null&&Q.isXRRenderTarget!==!0||(Wt=N.toneMapping));let rn=nn.morphAttributes.position||nn.morphAttributes.normal||nn.morphAttributes.color,bn=rn!==void 0?rn.length:0,Le=me.get(Ze),Nt=b.state.lights;if(O===!0&&(R===!0||mt!==Ie)){let Bt=mt===Ie&&Ze.id===he;Ut.setState(Ze,mt,Bt)}let wt=!1;Ze.version===Le.__version?Le.needsLights&&Le.lightsStateVersion!==Nt.state.version||Le.outputColorSpace!==V||He.isBatchedMesh&&Le.batching===!1?wt=!0:He.isBatchedMesh||Le.batching!==!0?He.isBatchedMesh&&Le.batchingColor===!0&&He._colorsTexture===null||He.isBatchedMesh&&Le.batchingColor===!1&&He._colorsTexture!==null||He.isInstancedMesh&&Le.instancing===!1?wt=!0:He.isInstancedMesh||Le.instancing!==!0?He.isSkinnedMesh&&Le.skinning===!1?wt=!0:He.isSkinnedMesh||Le.skinning!==!0?He.isInstancedMesh&&Le.instancingColor===!0&&He.instanceColor===null||He.isInstancedMesh&&Le.instancingColor===!1&&He.instanceColor!==null||He.isInstancedMesh&&Le.instancingMorph===!0&&He.morphTexture===null||He.isInstancedMesh&&Le.instancingMorph===!1&&He.morphTexture!==null||Le.envMap!==ve||Ze.fog===!0&&Le.fog!==An?wt=!0:Le.numClippingPlanes===void 0||Le.numClippingPlanes===Ut.numPlanes&&Le.numIntersection===Ut.numIntersection?(Le.vertexAlphas!==Je||Le.vertexTangents!==et||Le.morphTargets!==Fe||Le.morphNormals!==qe||Le.morphColors!==Jt||Le.toneMapping!==Wt||Le.morphTargetsCount!==bn||!!Le.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(wt=!0):wt=!0:wt=!0:wt=!0:wt=!0:(wt=!0,Le.__version=Ze.version);let vt=Le.currentProgram;wt===!0&&(vt=vi(Ze,zt,He),F&&Ze.isNodeMaterial&&F.onUpdateProgram(Ze,vt,Le));let si=!1,Ln=!1,fi=!1,kt=vt.getUniforms(),Tn=Le.uniforms;if(ce.useProgram(vt.program)&&(si=!0,Ln=!0,fi=!0),Ze.id!==he&&(he=Ze.id,Ln=!0),Le.needsLights){let Bt=(function(Rn,Xn){if(Rn.length===0)return null;if(Rn.length===1)return Rn[0].texture!==null?Rn[0]:null;T.setFromMatrixPosition(Xn.matrixWorld);for(let pn=0,qi=Rn.length;pn<qi;pn++){let Tr=Rn[pn];if(Tr.texture!==null&&Tr.boundingBox.containsPoint(T))return Tr}return null})(b.state.lightProbeGridArray,He);Le.lightProbeGrid!==Bt&&(Le.lightProbeGrid=Bt,Ln=!0)}if(si||Ie!==mt){ce.buffers.depth.getReversed()&&mt.reversedDepth!==!0&&(mt._reversedDepth=!0,mt.updateProjectionMatrix()),kt.setValue(W,"projectionMatrix",mt.projectionMatrix),kt.setValue(W,"viewMatrix",mt.matrixWorldInverse);let Bt=kt.map.cameraPosition;Bt!==void 0&&Bt.setValue(W,Z.setFromMatrixPosition(mt.matrixWorld)),Ge.logarithmicDepthBuffer&&kt.setValue(W,"logDepthBufFC",2/(Math.log(mt.far+1)/Math.LN2)),(Ze.isMeshPhongMaterial||Ze.isMeshToonMaterial||Ze.isMeshLambertMaterial||Ze.isMeshBasicMaterial||Ze.isMeshStandardMaterial||Ze.isShaderMaterial)&&kt.setValue(W,"isOrthographic",mt.isOrthographicCamera===!0),Ie!==mt&&(Ie=mt,Ln=!0,fi=!0)}if(Le.needsLights&&(Nt.state.sunShadowMap.length>0&&kt.setValue(W,"sunShadowMap",Nt.state.sunShadowMap,Ee),Nt.state.directionalShadowMap.length>0&&kt.setValue(W,"directionalShadowMap",Nt.state.directionalShadowMap,Ee),Nt.state.spotShadowMap.length>0&&kt.setValue(W,"spotShadowMap",Nt.state.spotShadowMap,Ee),Nt.state.pointShadowMap.length>0&&kt.setValue(W,"pointShadowMap",Nt.state.pointShadowMap,Ee)),He.isSkinnedMesh){kt.setOptional(W,He,"bindMatrix"),kt.setOptional(W,He,"bindMatrixInverse");let Bt=He.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),kt.setValue(W,"boneTexture",Bt.boneTexture,Ee))}He.isBatchedMesh&&(kt.setOptional(W,He,"batchingTexture"),kt.setValue(W,"batchingTexture",He._matricesTexture,Ee),kt.setOptional(W,He,"batchingIdTexture"),kt.setValue(W,"batchingIdTexture",He._indirectTexture,Ee),kt.setOptional(W,He,"batchingColorTexture"),He._colorsTexture!==null&&kt.setValue(W,"batchingColorTexture",He._colorsTexture,Ee));let zn=nn.morphAttributes;if(zn.position===void 0&&zn.normal===void 0&&zn.color===void 0||Oe.update(He,nn,vt),(Ln||Le.receiveShadow!==He.receiveShadow)&&(Le.receiveShadow=He.receiveShadow,kt.setValue(W,"receiveShadow",He.receiveShadow)),(Ze.isMeshStandardMaterial||Ze.isMeshLambertMaterial||Ze.isMeshPhongMaterial)&&Ze.envMap===null&&zt.environment!==null&&(Tn.envMapIntensity.value=zt.environmentIntensity),Tn.dfgLUT!==void 0&&(Tn.dfgLUT.value=mS()),Ln){if(kt.setValue(W,"toneMappingExposure",N.toneMappingExposure),Le.needsLights&&(Xt=fi,(bt=Tn).ambientLightColor.needsUpdate=Xt,bt.lightProbe.needsUpdate=Xt,bt.sunLights.needsUpdate=Xt,bt.sunLightShadows.needsUpdate=Xt,bt.directionalLights.needsUpdate=Xt,bt.directionalLightShadows.needsUpdate=Xt,bt.pointLights.needsUpdate=Xt,bt.pointLightShadows.needsUpdate=Xt,bt.spotLights.needsUpdate=Xt,bt.spotLightShadows.needsUpdate=Xt,bt.rectAreaLights.needsUpdate=Xt,bt.hemisphereLights.needsUpdate=Xt),An&&Ze.fog===!0&&ct.refreshFogUniforms(Tn,An),ct.refreshMaterialUniforms(Tn,Ze,oe,le,b.state.transmissionRenderTarget[mt.id]),Le.needsLights&&Le.lightProbeGrid){let Bt=Le.lightProbeGrid;Tn.probesSH.value=Bt.texture,Tn.probesMin.value.copy(Bt.boundingBox.min),Tn.probesMax.value.copy(Bt.boundingBox.max),Tn.probesResolution.value.copy(Bt.resolution)}ra.upload(W,Ce(Le),Tn,Ee)}var bt,Xt;if(Ze.isShaderMaterial&&Ze.uniformsNeedUpdate===!0&&(ra.upload(W,Ce(Le),Tn,Ee),Ze.uniformsNeedUpdate=!1),Ze.isSpriteMaterial&&kt.setValue(W,"center",He.center),kt.setValue(W,"modelViewMatrix",He.modelViewMatrix),kt.setValue(W,"normalMatrix",He.normalMatrix),kt.setValue(W,"modelMatrix",He.matrixWorld),Ze.uniformsGroups!==void 0){let Bt=Ze.uniformsGroups;for(let Rn=0,Xn=Bt.length;Rn<Xn;Rn++){let pn=Bt[Rn];ri.update(pn,vt),ri.bind(pn,vt)}}return vt})(A,G,J,ne,te);ce.setMaterial(ne,Ae);let Pe=J.index,Ye=1;if(ne.wireframe===!0){if(Pe=Ft.getWireframeAttribute(J),Pe===void 0)return;Ye=2}let Qe=J.drawRange,nt=J.attributes.position,Ne=Qe.start*Ye,pt=(Qe.start+Qe.count)*Ye;xe!==null&&(Ne=Math.max(Ne,xe.start*Ye),pt=Math.min(pt,(xe.start+xe.count)*Ye)),Pe!==null?(Ne=Math.max(Ne,0),pt=Math.min(pt,Pe.count)):nt!=null&&(Ne=Math.max(Ne,0),pt=Math.min(pt,nt.count));let hn=pt-Ne;if(hn<0||hn===1/0)return;let Ht;Fn.setup(te,ne,Te,J,Pe);let Yt=cn;if(Pe!==null&&(Ht=Mt.get(Pe),Yt=dn,Yt.setIndex(Ht)),te.isMesh)ne.wireframe===!0?(ce.setLineWidth(ne.wireframeLinewidth*Me()),Yt.setMode(W.LINES)):Yt.setMode(W.TRIANGLES);else if(te.isLine){let mt=ne.linewidth;mt===void 0&&(mt=1),ce.setLineWidth(mt*Me()),te.isLineSegments?Yt.setMode(W.LINES):te.isLineLoop?Yt.setMode(W.LINE_LOOP):Yt.setMode(W.LINE_STRIP)}else te.isPoints?Yt.setMode(W.POINTS):te.isSprite&&Yt.setMode(W.TRIANGLES);if(te.isBatchedMesh)if(_e.get("WEBGL_multi_draw"))Yt.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{let mt=te._multiDrawStarts,zt=te._multiDrawCounts,nn=te._multiDrawCount,Ze=Pe?Mt.get(Pe).bytesPerElement:1,He=me.get(ne).currentProgram.getUniforms();for(let An=0;An<nn;An++)He.setValue(W,"_gl_DrawID",An),Yt.render(mt[An]/Ze,zt[An])}else if(te.isInstancedMesh)Yt.renderInstances(Ne,hn,te.count);else if(J.isInstancedBufferGeometry){let mt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,zt=Math.min(J.instanceCount,mt);Yt.renderInstances(Ne,hn,zt)}else Yt.render(Ne,hn)},this.compile=function(A,G,J=null){J===null&&(J=A),F!==null&&F.renderStart(A,G,J),b=fn.get(J),b.init(G),U.push(b),J.traverseVisible(function(te){te.isLight&&te.layers.test(G.layers)&&(b.pushLight(te),te.castShadow&&b.pushShadow(te))}),A!==J&&A.traverseVisible(function(te){te.isLight&&te.layers.test(G.layers)&&(b.pushLight(te),te.castShadow&&b.pushShadow(te))}),b.setupLights(),F!==null&&F.updateLights(b.state.lightsArray),R=this.localClippingEnabled,O=Ut.init(this.clippingPlanes,R),O===!0&&Ut.setGlobalState(this.clippingPlanes,G),F!==null&&at.render(b.state.shadowsArray,J,G);let ne=new Set;return A.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;let xe=te.material;if(xe)if(Array.isArray(xe))for(let Ae=0;Ae<xe.length;Ae++){let Te=xe[Ae];Bn(Te,J,G,te),ne.add(Te)}else Bn(xe,J,G,te),ne.add(xe)}),b=U.pop(),F!==null&&F.renderEnd(),ne},this.compileAsync=function(A,G,J=null){let ne=this.compile(A,G,J);return new Promise(te=>{function xe(){ne.forEach(function(Ae){let Te=me.get(Ae).currentProgram;(Te===void 0||Te.isReady())&&ne.delete(Ae)}),ne.size!==0?setTimeout(xe,10):te(A)}_e.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let lr=null;function Xi(){di.stop()}function xs(){di.start()}let di=new ym;function wn(A,G,J,ne){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)J=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLightProbeGrid)b.pushLightProbeGrid(A);else if(A.isLight)b.pushLight(A),A.castShadow&&b.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(B)){ne&&K.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Y);let xe=Sn.update(A),Ae=A.material;Ae.visible&&S.push(A,xe,Ae,J,K.z,null,G)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(B))){let xe=Sn.update(A),Ae=A.material;if(ne&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),K.copy(A.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),K.copy(xe.boundingSphere.center)),K.applyMatrix4(A.matrixWorld).applyMatrix4(Y)),Array.isArray(Ae)){let Te=xe.groups;for(let Pe=0,Ye=Te.length;Pe<Ye;Pe++){let Qe=Te[Pe],nt=Ae[Qe.materialIndex];nt&&nt.visible&&S.push(A,xe,nt,J,K.z,Qe,G)}}else Ae.visible&&S.push(A,xe,Ae,J,K.z,null,G)}}let te=A.children;for(let xe=0,Ae=te.length;xe<Ae;xe++)wn(te[xe],G,J,ne)}function Mn(A,G,J,ne){let{opaque:te,transmissive:xe,transparent:Ae}=A;b.setupLightsView(J),O===!0&&Ut.setGlobalState(N.clippingPlanes,J),ne&&ce.viewport(ye.copy(ne)),te.length>0&&ot(te,G,J),xe.length>0&&ot(xe,G,J),Ae.length>0&&ot(Ae,G,J),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function mn(A,G,J,ne){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[ne.id]===void 0){let nt=_e.has("EXT_color_buffer_half_float")||_e.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[ne.id]=new gi(1,1,{generateMipmaps:!0,type:nt?ir:Hi,minFilter:os,samples:Math.max(4,Ge.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Lt.workingColorSpace})}let te=b.state.transmissionRenderTarget[ne.id],xe=ne.viewport||ye;te.setSize(xe.z*N.transmissionResolutionScale,xe.w*N.transmissionResolutionScale);let Ae=N.getRenderTarget(),Te=N.getActiveCubeFace(),Pe=N.getActiveMipmapLevel();N.setRenderTarget(te),N.getClearColor(ue),q=N.getClearAlpha(),q<1&&N.setClearColor(16777215,.5),N.clear(),Se&&jt.render(J);let Ye=N.toneMapping;N.toneMapping=Vi;let Qe=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),b.setupLightsView(ne),O===!0&&Ut.setGlobalState(N.clippingPlanes,ne),ot(A,J,ne),Ee.updateMultisampleRenderTarget(te),Ee.updateRenderTargetMipmap(te),_e.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let Ne=0,pt=G.length;Ne<pt;Ne++){let hn=G[Ne],{object:Ht,geometry:Yt,material:mt,group:zt}=hn;if(mt.side===tr&&Ht.layers.test(ne.layers)){let nn=mt.side;mt.side=ti,mt.needsUpdate=!0,Vt(Ht,J,ne,Yt,mt,zt),mt.side=nn,mt.needsUpdate=!0,nt=!0}}nt===!0&&(Ee.updateMultisampleRenderTarget(te),Ee.updateRenderTargetMipmap(te))}N.setRenderTarget(Ae,Te,Pe),N.setClearColor(ue,q),Qe!==void 0&&(ne.viewport=Qe),N.toneMapping=Ye}function ot(A,G,J){let ne=G.isScene===!0?G.overrideMaterial:null;for(let te=0,xe=A.length;te<xe;te++){let Ae=A[te],{object:Te,geometry:Pe,group:Ye}=Ae,Qe=Ae.material;Qe.allowOverride===!0&&ne!==null&&(Qe=ne),Te.layers.test(J.layers)&&Vt(Te,G,J,Pe,Qe,Ye)}}function Vt(A,G,J,ne,te,xe){F!==null&&te.isNodeMaterial&&F.setObject(A,te),A.onBeforeRender(N,G,J,ne,te,xe),A.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),te.onBeforeRender(N,G,J,ne,A,xe),te.transparent===!0&&te.side===tr&&te.forceSinglePass===!1?(te.side=ti,te.needsUpdate=!0,N.renderBufferDirect(J,G,ne,te,A,xe),te.side=Qs,te.needsUpdate=!0,N.renderBufferDirect(J,G,ne,te,A,xe),te.side=tr):N.renderBufferDirect(J,G,ne,te,A,xe),A.onAfterRender(N,G,J,ne,te,xe)}function vi(A,G,J){G.isScene!==!0&&(G=de);let ne=me.get(A),te=b.state.lights,xe=b.state.shadowsArray,Ae=te.state.version,Te=Be.getParameters(A,te.state,xe,G,J,b.state.lightProbeGridArray),Pe=Be.getProgramCacheKey(Te),Ye=ne.programs;ne.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?G.environment:null,ne.fog=G.fog;let Qe=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;ne.envMap=Ot.get(A.envMap||ne.environment,Qe),ne.envMapRotation=ne.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,Ye===void 0&&(A.addEventListener("dispose",_i),Ye=new Map,ne.programs=Ye);let nt=Ye.get(Pe);if(nt!==void 0){if(ne.currentProgram===nt&&ne.lightsStateVersion===Ae)return pi(A,Te),nt}else Te.uniforms=Be.getUniforms(A),F!==null&&A.isNodeMaterial&&F.build(A,J,Te),A.onBeforeCompile(Te,N),nt=Be.acquireProgram(Te,Pe),Ye.set(Pe,nt),ne.uniforms=Te.uniforms;let Ne=ne.uniforms;return(A.isShaderMaterial||A.isRawShaderMaterial)&&A.clipping!==!0||(Ne.clippingPlanes=Ut.uniform),pi(A,Te),ne.needsLights=(function(pt){return pt.isMeshLambertMaterial||pt.isMeshToonMaterial||pt.isMeshPhongMaterial||pt.isMeshStandardMaterial||pt.isShadowMaterial||pt.isShaderMaterial&&pt.lights===!0})(A),ne.lightsStateVersion=Ae,ne.needsLights&&(Ne.ambientLightColor.value=te.state.ambient,Ne.lightProbe.value=te.state.probe,Ne.sunLights.value=te.state.sun,Ne.sunLightShadows.value=te.state.sunShadow,Ne.directionalLights.value=te.state.directional,Ne.directionalLightShadows.value=te.state.directionalShadow,Ne.spotLights.value=te.state.spot,Ne.spotLightShadows.value=te.state.spotShadow,Ne.rectAreaLights.value=te.state.rectArea,Ne.ltc_1.value=te.state.rectAreaLTC1,Ne.ltc_2.value=te.state.rectAreaLTC2,Ne.pointLights.value=te.state.point,Ne.pointLightShadows.value=te.state.pointShadow,Ne.hemisphereLights.value=te.state.hemi,Ne.sunShadowMatrix.value=te.state.sunShadowMatrix,Ne.sunShadowCascade.value=te.state.sunShadowCascade,Ne.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Ne.spotLightMatrix.value=te.state.spotLightMatrix,Ne.spotLightMap.value=te.state.spotLightMap,Ne.pointShadowMatrix.value=te.state.pointShadowMatrix),ne.lightProbeGrid=b.state.lightProbeGridArray.length>0,ne.currentProgram=nt,ne.uniformsList=null,nt}function Ce(A){if(A.uniformsList===null){let G=A.currentProgram.getUniforms();A.uniformsList=ra.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function pi(A,G){let J=me.get(A);J.outputColorSpace=G.outputColorSpace,J.batching=G.batching,J.batchingColor=G.batchingColor,J.instancing=G.instancing,J.instancingColor=G.instancingColor,J.instancingMorph=G.instancingMorph,J.skinning=G.skinning,J.morphTargets=G.morphTargets,J.morphNormals=G.morphNormals,J.morphColors=G.morphColors,J.morphTargetsCount=G.morphTargetsCount,J.numClippingPlanes=G.numClippingPlanes,J.numIntersection=G.numClipIntersection,J.vertexAlphas=G.vertexAlphas,J.vertexTangents=G.vertexTangents,J.toneMapping=G.toneMapping}function xn(A){let G=me.get(A);return G.__readFormat===A.format&&G.__readType===A.type||(G.__readFormat=A.format,G.__readType=A.type,G.__formatReadable=Ge.textureFormatReadable(A.format),G.__typeReadable=Ge.textureTypeReadable(A.type)),G}di.setAnimationLoop(function(A){lr&&lr(A)}),typeof self<"u"&&di.setContext(self),this.setAnimationLoop=function(A){lr=A,dt.setAnimationLoop(A),A===null?di.stop():di.start()},dt.addEventListener("sessionstart",Xi),dt.addEventListener("sessionend",xs),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0)return void st("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(j===!0)return;F!==null&&F.renderStart(A,G);let J=dt.enabled===!0&&dt.isPresenting===!0,ne=z!==null&&(Q===null||J)&&z.begin(N,Q);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),dt.enabled!==!0||dt.isPresenting!==!0||z!==null&&z.isCompositing()!==!1||(dt.cameraAutoUpdate===!0&&dt.updateCamera(G),G=dt.getCamera()),A.isScene===!0&&A.onBeforeRender(N,A,G,Q),b=fn.get(A,U.length),b.init(G),b.state.textureUnits=Ee.getTextureUnits(),U.push(b),Y.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),B.setFromProjectionMatrix(Y,Du,G.reversedDepth),R=this.localClippingEnabled,O=Ut.init(this.clippingPlanes,R),S=$e.get(A,I.length),S.init(),I.push(S),dt.enabled===!0&&dt.isPresenting===!0){let xe=N.xr.getDepthSensingMesh();xe!==null&&wn(xe,G,-1/0,N.sortObjects)}wn(A,G,0,N.sortObjects),S.finish(),F!==null&&F.updateLights(b.state.lightsArray),N.sortObjects===!0&&S.sort(w,E),Se=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,Se&&jt.addToRenderList(S,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),O===!0&&Ut.beginShadows();let te=b.state.shadowsArray;if(at.render(te,A,G),O===!0&&Ut.endShadows(),(ne&&z.hasRenderPass())===!1){let xe=S.opaque,Ae=S.transmissive;if(b.setupLights(),G.isArrayCamera){let Te=G.cameras;if(Ae.length>0)for(let Pe=0,Ye=Te.length;Pe<Ye;Pe++)mn(xe,Ae,A,Te[Pe]);Se&&jt.render(A);for(let Pe=0,Ye=Te.length;Pe<Ye;Pe++){let Qe=Te[Pe];Mn(S,A,Qe,Qe.viewport)}}else Ae.length>0&&mn(xe,Ae,A,G),Se&&jt.render(A),Mn(S,A,G)}Q!==null&&k===0&&(Ee.updateMultisampleRenderTarget(Q),Ee.updateRenderTargetMipmap(Q)),ne&&z.end(N),A.isScene===!0&&A.onAfterRender(N,A,G),Fn.resetDefaultState(),he=-1,Ie=null,U.pop(),U.length>0?(b=U[U.length-1],Ee.setTextureUnits(b.state.textureUnits),O===!0&&Ut.setGlobalState(N.clippingPlanes,b.state.camera)):b=null,I.pop(),S=I.length>0?I[I.length-1]:null,F!==null&&F.renderEnd()},this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(A,G,J){let ne=me.get(A);ne.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),me.get(A.texture).__webglTexture=G,me.get(A.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:J,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){let J=me.get(A);J.__webglFramebuffer=G,J.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(A,G=0,J=0){Q=A,X=G,k=J;let ne=null,te=!1,xe=!1;if(A){let Ae=me.get(A);if(Ae.__useDefaultFramebuffer!==void 0)return ce.bindFramebuffer(W.FRAMEBUFFER,Ae.__webglFramebuffer),ye.copy(A.viewport),Ue.copy(A.scissor),we=A.scissorTest,ce.viewport(ye),ce.scissor(Ue),ce.setScissorTest(we),void(he=-1);if(Ae.__webglFramebuffer===void 0)Ee.setupRenderTarget(A);else if(Ae.__hasExternalTextures)Ee.rebindTextures(A,me.get(A.texture).__webglTexture,me.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ye=A.depthTexture;if(Ae.__boundDepthTexture!==Ye){if(Ye!==null&&me.has(Ye)&&(A.width!==Ye.image.width||A.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ee.setupDepthRenderbuffer(A)}}let Te=A.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(xe=!0);let Pe=me.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(ne=Array.isArray(Pe[G])?Pe[G][J]:Pe[G],te=!0):ne=A.samples>0&&Ee.useMultisampledRTT(A)===!1?me.get(A).__webglMultisampledFramebuffer:Array.isArray(Pe)?Pe[J]:Pe,ye.copy(A.viewport),Ue.copy(A.scissor),we=A.scissorTest}else ye.copy(C).multiplyScalar(oe).floor(),Ue.copy(D).multiplyScalar(oe).floor(),we=y;if(J!==0&&(ne=ee),ce.bindFramebuffer(W.FRAMEBUFFER,ne)&&ce.drawBuffers(A,ne),ce.viewport(ye),ce.scissor(Ue),ce.setScissorTest(we),te){let Ae=me.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ae.__webglTexture,J)}else if(xe){let Ae=G;for(let Te=0;Te<A.textures.length;Te++){let Pe=me.get(A.textures[Te]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+Te,Pe.__webglTexture,J,Ae)}}else if(A!==null&&J!==0){let Ae=me.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Ae.__webglTexture,J)}he=-1},this.readRenderTargetPixels=function(A,G,J,ne,te,xe,Ae,Te=0){if(!A||!A.isWebGLRenderTarget)return void st("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=me.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ae!==void 0&&(Pe=Pe[Ae]),Pe){ce.bindFramebuffer(W.FRAMEBUFFER,Pe);try{let Ye=A.textures[Te],Qe=Ye.format,nt=Ye.type;A.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+Te);let Ne=xn(Ye);if(Ne.__formatReadable===!1)return void st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(Ne.__typeReadable===!1)return void st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");G>=0&&G<=A.width-ne&&J>=0&&J<=A.height-te&&W.readPixels(G,J,ne,te,Zt.convert(Qe),Zt.convert(nt),xe)}finally{let Ye=Q!==null?me.get(Q).__webglFramebuffer:null;ce.bindFramebuffer(W.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(A,G,J,ne,te,xe,Ae,Te=0){if(!A||!A.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=me.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ae!==void 0&&(Pe=Pe[Ae]),Pe){if(G>=0&&G<=A.width-ne&&J>=0&&J<=A.height-te){ce.bindFramebuffer(W.FRAMEBUFFER,Pe);let Ye=A.textures[Te],Qe=Ye.format,nt=Ye.type;A.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+Te);let Ne=xn(Ye);if(Ne.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ne.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let pt=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,pt),W.bufferData(W.PIXEL_PACK_BUFFER,xe.byteLength,W.STREAM_READ),W.readPixels(G,J,ne,te,Zt.convert(Qe),Zt.convert(nt),0),W.bindBuffer(W.PIXEL_PACK_BUFFER,null);let hn=Q!==null?me.get(Q).__webglFramebuffer:null;ce.bindFramebuffer(W.FRAMEBUFFER,hn);let Ht=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await Gf(W,Ht,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,pt),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,xe),W.bindBuffer(W.PIXEL_PACK_BUFFER,null),W.deleteBuffer(pt),W.deleteSync(Ht),xe}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,G=null,J=0){let ne=Math.pow(2,-J),te=Math.floor(A.image.width*ne),xe=Math.floor(A.image.height*ne),Ae=G!==null?G.x:0,Te=G!==null?G.y:0;Ee.setTexture2D(A,0),W.copyTexSubImage2D(W.TEXTURE_2D,J,0,0,Ae,Te,te,xe),ce.unbindTexture()},this.copyTextureToTexture=function(A,G,J=null,ne=null,te=0,xe=0){let Ae,Te,Pe,Ye,Qe,nt,Ne,pt,hn,Ht=A.isCompressedTexture?A.mipmaps[xe]:A.image;if(J!==null)Ae=J.max.x-J.min.x,Te=J.max.y-J.min.y,Pe=J.isBox3?J.max.z-J.min.z:1,Ye=J.min.x,Qe=J.min.y,nt=J.isBox3?J.min.z:0;else{let ve=Math.pow(2,-te);Ae=Math.floor(Ht.width*ve),Te=Math.floor(Ht.height*ve),Pe=A.isDataArrayTexture?Ht.depth:A.isData3DTexture?Math.floor(Ht.depth*ve):1,Ye=0,Qe=0,nt=0}ne!==null?(Ne=ne.x,pt=ne.y,hn=ne.z):(Ne=0,pt=0,hn=0);let Yt=Zt.convert(G.format),mt=Zt.convert(G.type),zt;G.isData3DTexture?(Ee.setTexture3D(G,0),zt=W.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Ee.setTexture2DArray(G,0),zt=W.TEXTURE_2D_ARRAY):(Ee.setTexture2D(G,0),zt=W.TEXTURE_2D),ce.activeTexture(W.TEXTURE0),ce.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,G.flipY),ce.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),ce.pixelStorei(W.UNPACK_ALIGNMENT,G.unpackAlignment);let nn=ce.getParameter(W.UNPACK_ROW_LENGTH),Ze=ce.getParameter(W.UNPACK_IMAGE_HEIGHT),He=ce.getParameter(W.UNPACK_SKIP_PIXELS),An=ce.getParameter(W.UNPACK_SKIP_ROWS),br=ce.getParameter(W.UNPACK_SKIP_IMAGES);ce.pixelStorei(W.UNPACK_ROW_LENGTH,Ht.width),ce.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Ht.height),ce.pixelStorei(W.UNPACK_SKIP_PIXELS,Ye),ce.pixelStorei(W.UNPACK_SKIP_ROWS,Qe),ce.pixelStorei(W.UNPACK_SKIP_IMAGES,nt);let V=A.isDataArrayTexture||A.isData3DTexture,se=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){let ve=me.get(A),Je=me.get(G),et=me.get(ve.__renderTarget),Fe=me.get(Je.__renderTarget);ce.bindFramebuffer(W.READ_FRAMEBUFFER,et.__webglFramebuffer),ce.bindFramebuffer(W.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let qe=0;qe<Pe;qe++)V&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,me.get(A).__webglTexture,te,nt+qe),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,me.get(G).__webglTexture,xe,hn+qe)),W.blitFramebuffer(Ye,Qe,Ae,Te,Ne,pt,Ae,Te,W.DEPTH_BUFFER_BIT,W.NEAREST);ce.bindFramebuffer(W.READ_FRAMEBUFFER,null),ce.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(te!==0||A.isRenderTargetTexture||me.has(A)){let ve=me.get(A),Je=me.get(G);ce.bindFramebuffer(W.READ_FRAMEBUFFER,ae),ce.bindFramebuffer(W.DRAW_FRAMEBUFFER,re);for(let et=0;et<Pe;et++)V?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ve.__webglTexture,te,nt+et):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,ve.__webglTexture,te),se?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Je.__webglTexture,xe,hn+et):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Je.__webglTexture,xe),te!==0?W.blitFramebuffer(Ye,Qe,Ae,Te,Ne,pt,Ae,Te,W.COLOR_BUFFER_BIT,W.NEAREST):se?W.copyTexSubImage3D(zt,xe,Ne,pt,hn+et,Ye,Qe,Ae,Te):W.copyTexSubImage2D(zt,xe,Ne,pt,Ye,Qe,Ae,Te);ce.bindFramebuffer(W.READ_FRAMEBUFFER,null),ce.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else se?A.isDataTexture||A.isData3DTexture?W.texSubImage3D(zt,xe,Ne,pt,hn,Ae,Te,Pe,Yt,mt,Ht.data):G.isCompressedArrayTexture?W.compressedTexSubImage3D(zt,xe,Ne,pt,hn,Ae,Te,Pe,Yt,Ht.data):W.texSubImage3D(zt,xe,Ne,pt,hn,Ae,Te,Pe,Yt,mt,Ht):A.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,xe,Ne,pt,Ae,Te,Yt,mt,Ht.data):A.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,xe,Ne,pt,Ht.width,Ht.height,Yt,Ht.data):W.texSubImage2D(W.TEXTURE_2D,xe,Ne,pt,Ae,Te,Yt,mt,Ht);ce.pixelStorei(W.UNPACK_ROW_LENGTH,nn),ce.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Ze),ce.pixelStorei(W.UNPACK_SKIP_PIXELS,He),ce.pixelStorei(W.UNPACK_SKIP_ROWS,An),ce.pixelStorei(W.UNPACK_SKIP_IMAGES,br),xe===0&&G.generateMipmaps&&W.generateMipmap(zt),ce.unbindTexture()},this.initRenderTarget=function(A){me.get(A).__webglFramebuffer===void 0&&Ee.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Ee.setTextureCube(A,0):A.isData3DTexture?Ee.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Ee.setTexture2DArray(A,0):Ee.setTexture2D(A,0),ce.unbindTexture()},this.resetState=function(){X=0,k=0,Q=null,ce.reset(),Fn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Du}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Lt._getUnpackColorSpace()}};var yr={normal:1,related:.85,weak:.5,quiet:.3,away:.1},Cm=3;function Im({arrived:i,opened:e,closed:t,sawClone:n,memory:r,quiet:s,age:a}){return t||!r||s||a?null:i&&e<2?"arrival":e<(i?2:3)?null:n?"clone":"book"}var ad=i=>i.normalize("NFD").replace(/\p{M}/gu,"").toLowerCase(),od=/[^\p{L}\p{N}]+/u;function ld(i,e){let t=ad(e).split(od).filter(Boolean);return t.length?i.map(n=>{let r=ad(n.title),s=new Set(ad(`${n.title} ${n.body} ${n.extra}`).split(od)),a=c=>[...s].some(l=>l.startsWith(c));if(!t.every(a))return null;let o=t.reduce((c,l)=>c+(r.startsWith(l)?3:r.split(od).some(h=>h.startsWith(l))?2:1),0)+n.weight*.1;return{item:n,score:o}}).filter(Boolean).sort((n,r)=>r.score-n.score||n.item.order-r.item.order).map(({item:n})=>n):[]}var cd=8,gS=(i,e,t=cd)=>ld(i,e).slice(0,t),Pm=(i,e,t)=>i.replace("{shown}",String(e)).replace("{total}",String(t));function vc(i,e){let t=i[e],n=new Map(i.map((a,o)=>[a.id,o])),r=new Set(t.links.filter(a=>n.has(a)&&a!==t.id).map(a=>n.get(a)));i.forEach((a,o)=>o!==e&&a.links.includes(t.id)&&r.add(o));let s=new Set;for(let[a,o]of Object.entries(t.members))for(let c of o){let l=i.map((p,d)=>p.members[a]?.includes(c)?d:-1).filter(p=>p>=0),h=l.indexOf(e);for(let p of[l[h-1],l[h+1]])p!==void 0&&!r.has(p)&&s.add(p)}return{links:[...r].sort((a,o)=>a-o),near:[...s].sort((a,o)=>a-o)}}function hd(i,e,t=Cm){let n=i[e],{links:r,near:s}=vc(i,e),a=new Set(r),o=l=>Object.entries(n.members).reduce((h,[p,d])=>h+d.filter(u=>l.members[p]?.includes(u)).length,0),c=l=>(a.has(l)?100:0)+o(i[l])*10+1/(1+Math.abs(i[l].year-n.year));return[...r,...s].sort((l,h)=>c(h)-c(l)||l-h).slice(0,t)}function Lm(i,e,t=Cm){let{links:n}=vc(i,e);return hd(i,e,1/0).filter(r=>n.includes(r)).slice(0,t)}function Nm(i,e,t=3,n=3){let r=i.map((a,o)=>[a,o]).filter(([a])=>a.period===e).sort((a,o)=>o[0].weight-a[0].weight||a[0].year-o[0].year||a[1]-o[1]),s=[];for(let[a,o]of r){if(s.length>=t)break;s.every(([c])=>!a.position||!c.position||Math.hypot(...a.position.map((l,h)=>l-c.position[h]))>=n)&&s.push([a,o])}return s.map(([,a])=>a)}var ud=(i,e,t)=>t?.facet==="threads"?["book","clone"].find(n=>i?.[n]===e.threads[t.item])??null:null,dd=(i,e,t)=>t?`${t} \xB7 ${e}`:i,Dm=(i,e)=>!i&&e.startsWith("#")?"push":"replace",xc=(i,e,t)=>t>=0&&t<e&&i.some(n=>n.period===t)?t:null;function Um(i,e,t,n,r=Math.random){let s=(e?fs(i,e):i.map((c,l)=>l)).filter(c=>c!==t);if(!s.length)return null;let a=s.filter(c=>!n.has(c)),o=a.length?a:s;return o[Math.floor(r()*o.length)]}function Om(i,e,t=null){if(!t)return{previous:e>0?e-1:null,next:e<i.length-1?e+1:null};let n=fs(i,t),r=n.indexOf(e);return r<0?{previous:n.findLast(s=>s<e)??null,next:n.find(s=>s>e)??null}:{previous:n[r-1]??null,next:n[r+1]??null}}var Fm=(i,e,t,n,r)=>t&&fs(i,t).at(-1)===e?ud(n,r,t):null;function Bm(i,e,t,n,r=3){let s=hr.flatMap(a=>(e[a]??[]).map((o,c)=>({facet:a,item:c,title:t[a]?.[o]??o,body:"",extra:"",count:fs(i,{facet:a,item:c}).length}))).filter(a=>a.count>0);return gS(s.map((a,o)=>({...a,weight:Math.min(3,a.count/4),order:o})),n,r)}function zm(i,{selected:e=-1,near:t=new Set,weak:n=new Set,filter:r=null}){return i.map((s,a)=>{let o=yr.normal;return e>=0&&(o=a===e?1:t.has(a)?yr.related:n.has(a)?yr.weak:yr.quiet),r&&!(s.members[r.facet]??[]).includes(r.item)&&(o=a===e?1:Math.min(o,yr.away)),o})}var km=(i,e)=>i.map((t,n)=>e.has(n)?1:yr.quiet),Vm=(i,e)=>[...i].map(t=>[t,e,!0]),fs=(i,e)=>e?i.map((t,n)=>(t.members[e.facet]??[]).includes(e.item)?n:-1).filter(t=>t>=0):[],Gm={threads:"thread-",people:"person-",places:"place-"},pd=(i,e)=>`${Gm[i]}${e}`;function Hm(i,e){let[t,n]=Object.entries(Gm).find(([,s])=>i.startsWith(s))??[],r=t?(e[t]??[]).indexOf(i.slice(n.length)):-1;return r>=0?{facet:t,item:r}:null}var Wm=.06;function yc(i,e,t=n=>i[n].position){if(e.length<2)return[];let n=new Map(e.map(o=>[o,t(o)])),r=(o,c)=>Math.hypot(n.get(o)[0]-n.get(c)[0],n.get(o)[1]-n.get(c)[1]),s=new Map(e.slice(1).map(o=>[o,{from:e[0],d:r(e[0],o)}])),a=[];for(;s.size;){let o=-1,c=1/0;for(let[h,{d:p}]of s)(p<c||p===c&&h<o)&&([o,c]=[h,p]);let{from:l}=s.get(o);s.delete(o),a.push([l,o,i[l].period!==i[o].period]);for(let[h,p]of s){let d=r(o,h);d<p.d&&s.set(h,{from:o,d})}}return a}function Xm(i,e){let t=e.map(n=>Math.floor(i[n].year));return{count:e.length,from:Math.min(...t),to:Math.max(...t)}}var qm=({count:i,from:e,to:t},{one:n,many:r})=>`${(i===1?n:r).replace("{n}",String(i))} \xB7 ${e===t?e:`${e}\u2013${t}`}`;function jm(i,e,t){let n=new Array(t).fill(0);for(let r of e)i[r].period>=0&&n[i[r].period]++;return n}var _S=10,vS=3,xS=8,Am=[[1,0],[-1,0],[0,1],[0,-1]],Rm=[[1,1],[-1,1],[1,-1],[-1,-1]];function Ym({x:i,y:e,r:t},{width:n,height:r},s,a=12){let o=t+_S,c=(d,u,m,f)=>{let v=u===0?i+d*m-(d<0?n:0):Math.min(Math.max(i-n/2,a),s-n-a),g=u===0?e-r/2:u>0?e+m-2:e-m+2-r;return{left:v,right:v+n,top:g,bottom:g+r,far:f}},l=(d,u,m,f)=>{let v=i+d*m-(d<0?n:0),g=e+u*m-(u<0?r:0);return{left:v,right:v+n,top:g,bottom:g+r,far:f}},h=r+4,p=Array.from({length:vS},(d,u)=>o+(u+1)*h);return[...Am.map(([d,u])=>c(d,u,o,!1)),...Rm.map(([d,u])=>l(d,u,o,!1)),...p.flatMap(d=>[...Am.map(([u,m])=>c(u,m,d,!0)),...Rm.map(([u,m])=>l(u,m,d,!0))])]}function $m(i,{free:e,clear:t,inside:n,forced:r=!1,keep:s=-1}){let a=s>=0?i.find(o=>o.slot===s):void 0;return a&&e(a)&&t(a)?a:i.find(o=>e(o)&&t(o))??i.find(e)??(r?i.find(o=>o.far===!1&&n(o))??i[0]:null)}function fd(i,{x:e,y:t,r:n}){let r=Math.min(Math.max(e,i.left),i.right),s=Math.min(Math.max(t,i.top),i.bottom),a=Math.hypot(e-r,t-s)-n*.45;return a>4?{x:r-i.left,y:s-i.top,length:a,angle:Math.atan2(t-s,e-r)}:null}var Zm=i=>Math.min(i,70)+xS;function Jm(i,e){let t=n=>n.visible!==!1&&n.x>=e.left&&n.x<=e.right&&n.y>=e.top&&n.y<=e.bottom;for(let n=1;n<i.length;n++){let r=i[n-1],s=i[n];if(!t(r)||t(s))continue;let a=0,o=1;for(let c=0;c<18;c++){let l=(a+o)/2;t({visible:s.visible,x:r.x+(s.x-r.x)*l,y:r.y+(s.y-r.y)*l})?a=l:o=l}return{t:(n-1+a)/(i.length-1),x:r.x+(s.x-r.x)*a,y:r.y+(s.y-r.y)*a,angle:Math.atan2(s.y-r.y,s.x-r.x)}}return null}function Km(i,e){return[[Math.abs(i.y-e.top),"top"],[Math.abs(i.x-e.right),"right"],[Math.abs(i.y-e.bottom),"bottom"],[Math.abs(i.x-e.left),"left"]].reduce((n,r)=>r[0]<n[0]?r:n)[1]}function Qm(i,e,{width:t,height:n},r,s=8){let a=h=>Math.min(Math.max(h,r.left),Math.max(r.left,r.right-t)),o=h=>Math.min(Math.max(h,r.top),Math.max(r.top,r.bottom-n)),c=e==="left"?i.x+s:e==="right"?i.x-s-t:a(i.x-t/2),l=e==="top"?i.y+s:e==="bottom"?i.y-s-n:o(i.y-n/2);return{left:c,right:c+t,top:l,bottom:l+n}}var hi=(i,e,t=0,n=0)=>i.left<e.right+t-n&&i.right+t>e.left+n&&i.top<e.bottom+t-n&&i.bottom+t>e.top+n,eg=(i,e,t)=>i.reduce((n,r)=>Math.abs(t(r)-e)<Math.abs(t(n)-e)?r:n,i[0]),tg=i=>[i.length,new Set(i.flatMap(e=>e.members.people??[])).size,new Set(i.flatMap(e=>e.members.places??[])).size];function ng(i,e,t=4,n=[]){let r=[...n],s=.5,a=(o,c)=>hi(o,c,t,s);for(let o of i){let c=o.side==="top"||o.side==="bottom"?"top":"left",l=c==="top"?o.box.bottom-o.box.top:o.box.right-o.box.left,h=o.side==="bottom"||o.side==="right"?-1:1,p=o.box;for(let u=0;u<4&&r.some(m=>a(p,m));u++){let m=(l+t)*h*(u+1);p=c==="top"?{...o.box,top:o.box.top+m,bottom:o.box.bottom+m}:{...o.box,left:o.box.left+m,right:o.box.right+m}}p.left>=e.left-1&&p.right<=e.right+1&&p.top>=e.top-1&&p.bottom<=e.bottom+1&&!r.some(u=>a(p,u))?(r.push(p),o.box=p,o.shown=!0):o.shown=!1}return i}function ig(i,{width:e,height:t,pad:n=6}){let r=i.map(u=>u[0]),s=i.map(u=>u[1]),[a,o,c,l]=[Math.min(...r),Math.max(...r),Math.min(...s),Math.max(...s)],h=Math.min((e-2*n)/(o-a||1),(t-2*n)/(l-c||1)),p=(e-(o-a)*h)/2,d=(t-(l-c)*h)/2;return{scale:h,to:([u,m])=>[p+(u-a)*h,d+(l-m)*h],from:([u,m])=>[a+(u-p)/h,l-(m-d)/h]}}function rg(i,[e,t],n=1.35){let r=-1,s=n;return i.forEach((a,o)=>{let c=Math.hypot(a.centre[0]-e,a.centre[1]-t)/a.radius;c<s&&([r,s]=[o,c])}),r}var yS=.75,sg=(i,e,t=520,n=!0)=>i<yS&&e>=t&&n,Sr={tiers:[{keep:1,ratio:1/0},{keep:.65,ratio:1.5},{keep:.4,ratio:1}],slow:1e3/30,window:90,windows:3},Sc={fps:24,hidden:1},ag=(i,e,t=Sc.fps)=>{let n=1e3/t,r=e-i.last;return r<n-1?!1:(i.last=e-Math.min(Math.max(r-n,0),n/2),!0)},og=(i,e=Sc.fps)=>Math.max(0,i-1e3/e)+1e3/60,SS={days:45},lg=(i,e=new Date)=>{if(!/^\d{4}-\d{2}$/.test(i??""))return!1;let t=(e-new Date(+i.slice(0,4),+i.slice(5,7)-1,1))/864e5;return t>=0&&t<SS.days},cg=i=>i.length?i.reduce((e,t)=>e+t,0)/i.length:0,hg=(i,e)=>e>Sr.slow&&i<Sr.tiers.length-1?i+1:i;function ug(i){return[...[...new Set(i.map(t=>t.period).filter(t=>t>=0))].sort((t,n)=>t-n).map(t=>({age:t})),{ahead:"book"},{ahead:"clone"}]}function dg(i,{now:e,idleSince:t,eligible:n,plan:r},{wait:s=20,hold:a=6}={}){if(!r.length)return{state:i,open:null};if(i.phase==="off")return{state:i,open:null};if(i.phase==="touring"){if(t>i.at||!n)return{state:{phase:"off",step:0,at:e},open:null,stopped:!0};if(e-i.at<a)return{state:i,open:null};let o=i.step+1;return o>=r.length?{state:{phase:"off",step:0,at:e},open:null,done:!0}:{state:{phase:"touring",step:o,at:e},open:r[o]}}return n&&e-Math.max(t,i.at)>=s?{state:{phase:"touring",step:0,at:e},open:r[0]}:{state:i,open:null}}var Mc={minDistance:6,maxDistance:640,minPitch:-1.3,maxPitch:1.3},Pn=(i,e,t)=>Math.min(t,Math.max(e,i));function pg({target:i,distance:e,yaw:t,pitch:n}){let r=Math.cos(n);return[i[0]+e*r*Math.sin(t),i[1]+e*Math.sin(n),i[2]+e*r*Math.cos(t)]}var md=(i,e)=>Pn(i*Math.exp(e),Mc.minDistance,Mc.maxDistance),fg=({yaw:i,pitch:e},t,n)=>({yaw:i+t,pitch:Pn(e+n,Mc.minPitch,Mc.maxPitch)});function mg({target:i,distance:e,yaw:t,pitch:n},r,s,a,o){let c=2*e*Math.tan(o/2)/a,l=[Math.cos(t),0,-Math.sin(t)],h=[-Math.sin(n)*Math.sin(t),Math.cos(n),-Math.sin(n)*Math.cos(t)];return i.map((p,d)=>p-l[d]*r*c+h[d]*s*c)}var Mr=(i,e,t,n)=>Number.isFinite(i)?i+(e-i)*(1-Math.exp(-n*Math.max(0,t))):e,MS=(i,e)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i));function gg(i,e,t,n){return{target:i.target.map((r,s)=>Mr(r,e.target[s],t,n)),distance:Math.exp(Mr(Math.log(i.distance),Math.log(e.distance),t,n)),yaw:Mr(i.yaw,MS(i.yaw,e.yaw),t,n),pitch:Mr(i.pitch,e.pitch,t,n)}}var bc=[0,2,4,7,9],la=[{root:0,pad:[0,7,14,16]},{root:-7,pad:[0,7,9,16]},{root:-3,pad:[4,9,14,19]},{root:-5,pad:[2,9,14,21]},{root:2,pad:[2,5,9,12]}],We={tuning:432,base:432*2**(-7/12),octaves:2,from:1980,to:2030,master:.7,soften:2200,floor:30,fade:9,chordFrom:24,chordTo:38,detune:4,padCut:760,padSwing:220,padLevel:.0052,shimmerLevel:7e-4,subLevel:.007,airLevel:.012,airCut:520,room:1,reach:.03,bed:{pad:[.35,.8],shimmer:[.1,1],air:[.2,.9],sub:[1,0]},note:[.8,1],hover:[.15,1],swell:[.3,1],travel:[.15,1],tick:432,tickGap:1.4,tickPeak:.01,noteGap:.3,swellPeak:.022,travelPeak:.015,arrival:.4,voices:4,crowd:.5,fadeIn:3.5,fadeOut:.7,suspendAfter:4e3,interval:2e3,horizon:4,breath:{period:11,inhale:.4,pad:.25,air:.3,harmonics:12},pink:{level:.0108,low:110,high:1500}},gd={now:{breath:!1,pink:!1,chordTick:!1,change:3,reverb:5},next:{breath:!0,pink:!0,chordTick:!0,change:5,reverb:5}},lo=-19,bS=-43,aa=i=>We.tuning*2**(i/12),oa=i=>Math.min(1,Math.max(0,i));function _g(i){let e=bc.length*We.octaves,t=Math.min(e-1,Math.floor(oa((i-We.from)/(We.to-We.from))*e)),n=bc[t%bc.length]+12*Math.floor(t/bc.length);return We.base*2**(n/12)}var vg=i=>({1:3,2:4.5,3:6})[i]??3,xg=i=>.024+.007*Math.min(3,Math.max(1,i)),yg=i=>aa(i==="clone"?lo:lo-7),Sg=i=>1/(1+We.crowd*i),_d=(i,e,t=We.tickGap)=>i-e>=t;function Mg(i){let{root:e,pad:t}=la[i%la.length];return{sub:aa(bS+(e%12+12)%12),pad:t.map(n=>aa(lo+n)),shimmer:t.slice(2).map(n=>aa(lo+n+12))}}function TS(i,e){let t=la.map((n,r)=>r).filter(n=>n!==i);return t[Math.min(t.length-1,Math.floor(oa(e)*t.length))]}var vd=i=>i<0?0:i%la.length,xd=(i,e,t)=>i===null?TS(e,t):vd(i),yd=i=>We.chordFrom+oa(i)*(We.chordTo-We.chordFrom);function Sd(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,e|1);return t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function bg(i,e){let t=Sd(e),n=new Float32Array(i),r=0,s=0;for(let a=0;a<i;a++)r=(r+.04*(t()*2-1))/1.04,n[a]=r,s=Math.max(s,Math.abs(r));for(let a=0;a<i;a++)n[a]/=s;return n}function Tg(i,e){let t=Sd(e),n=new Float32Array(i),[r,s,a]=[0,0,0],o=0;for(let c=0;c<i;c++){let l=t()*2-1;r=.99765*r+l*.099046,s=.963*s+l*.2965164,a=.57*a+l*1.0526913,n[c]=r+s+a+l*.1848,o=Math.max(o,Math.abs(n[c]))}for(let c=0;c<i;c++)n[c]/=o;return n}function Md(i,e=We.breath.inhale){let t=i-Math.floor(i);return t<e?-Math.cos(Math.PI*t/e):Math.cos(Math.PI*(t-e)/(1-e))}function Eg(i=We.breath.inhale,e=We.breath.harmonics,t=2048){let n=new Float32Array(e+1),r=new Float32Array(e+1);for(let s=0;s<t;s++){let a=s/t,o=Md(a,i);for(let c=1;c<=e;c++)n[c]+=2*o*Math.cos(2*Math.PI*c*a)/t,r[c]+=2*o*Math.sin(2*Math.PI*c*a)/t}return{real:n,imag:r}}function wg(i){let e=n=>Math.abs(Math.log2(n/We.tick)),t=n=>n*2**Math.round(Math.log2(We.tick/n));return la[i%la.length].pad.map(n=>t(aa(lo+n))).reduce((n,r)=>e(r)<e(n)-1e-9?r:n)}function Ag(i,e=1,t=gd.next.reverb){let n=Math.floor(i*t*1.1);return[0,1].map(r=>{let s=Sd(e+r*7919),a=new Float32Array(n),o=0;for(let c=0;c<n;c++){let l=c/i,h=oa((l-We.reach)/.05),p=Math.exp(-6.9078*l/t),d=oa((n-c)/(i*.4)),u=3200*(600/3200)**oa(l/t);o+=(1-Math.exp(-2*Math.PI*u/i))*(s()*2-1-o),a[c]=o*h*p*d}return a})}var ES=[[1,1,1],[2,.22,.5],[3,.08,.3],[4.07,.03,.2]],wS=[[1,1,1],[1.5,.25,1.2]],AS=[[1,1,1]];function RS(i,{random:e=Math.random,profile:t=gd.next,output:n=i.destination}={}){let r=i.sampleRate,s={at:i.currentTime+.05,chord:0,lastNote:-1/0,lastTick:-1/0,period:-1,year:0,voices:[],layers:[],hold:null,stopped:!1},a=(q=0)=>{let ie=i.createGain();return ie.gain.value=q,ie},o=(q,ie,le=.5)=>{let oe=i.createBiquadFilter();return oe.type=q,oe.frequency.value=ie,oe.Q.value=le,oe},c=(q,ie,le=0)=>{let oe=i.createOscillator();return oe.type=q,oe.frequency.value=ie,oe.detune.value=le,oe},l=q=>{let ie=i.createBuffer(q.length,q[0].length,r);return q.forEach((le,oe)=>ie.getChannelData(oe).set(le)),ie},h=[],p=(q,ie,le)=>{let oe=c("sine",q);h.push(oe);let w=a(ie);oe.connect(w),w.connect(le),oe.start()},d=a(0),u=o("highpass",We.floor,.7),m=o("lowpass",We.soften,.5),f=a(1);f.connect(m),m.connect(u),u.connect(d),d.connect(n);let v=i.createConvolver();v.buffer=l(Ag(r,1,t.reverb));let g=a(We.room);v.connect(g),g.connect(f);let _=([q,ie])=>{let le=a(q),oe=a(ie);return le.connect(f),oe.connect(v),[le,oe]},M=(q,ie)=>ie.forEach(le=>q.connect(le)),T=_(We.bed.pad),S=_(We.bed.shimmer),b=_(We.bed.air),I=_(We.bed.sub),U=_(We.note),z=_(We.hover),N=_(We.swell),j=_(We.travel),F=o("lowpass",We.padCut,.3),ee=a(1);F.connect(ee),M(ee,T),p(.031,We.padSwing,F.frequency);let ae=a(.6);M(ae,S),p(.057,.4,ae.gain);let re=l([bg(r*6,11)]),X=i.createBufferSource(),k=a(t.pink?We.pink.level:We.airLevel),Q=a(1);if(t.pink){let q=o("highpass",We.pink.low,.5),ie=o("lowpass",We.pink.high,.5);X.buffer=l([Tg(r*6,11)]),X.connect(q),q.connect(ie),ie.connect(k)}else{let q=o("bandpass",We.airCut,.6);X.buffer=re,X.connect(q),q.connect(k)}X.loop=!0,k.connect(Q),M(Q,b),p(.043,k.gain.value*.6,k.gain),X.start(),h.push(X);let he={start:i.currentTime,period:We.breath.period};if(t.breath){let{real:q,imag:ie}=Eg(),le=i.createOscillator();le.setPeriodicWave(i.createPeriodicWave(q,ie,{disableNormalization:!0})),le.frequency.value=1/he.period,[[ee,We.breath.pad],[Q,We.breath.air]].forEach(([oe,w])=>{let E=a(w);le.connect(E),E.connect(oe.gain)}),he.start=i.currentTime,le.start(he.start),h.push(le)}let Ie=q=>()=>q.forEach(ie=>ie.disconnect()),ye=(q,ie,le,oe=We.fade)=>{let{sub:w,pad:E,shimmer:C}=Mg(q),D=ie+le+We.fade;s.layers=s.layers.filter(Z=>Z.end>i.currentTime);let y=new Map,B=Z=>{if(!y.has(Z)){let K=a(1);K.connect(Z),y.set(Z,K)}return y.get(Z)},O={buses:y,oscillators:[],end:D,start:ie,index:q};s.layers.push(O);let R=(Z,K,de)=>{let Se=a(0);O.oscillators.push(Z),Se.gain.setValueAtTime(0,ie),Se.gain.linearRampToValueAtTime(K,ie+oe),Se.gain.setValueAtTime(K,D-We.fade),Se.gain.linearRampToValueAtTime(0,D),Z.connect(Se),Se.connect(B(de)),Z.start(ie),Z.stop(D+.1),Z.onended=Ie([Z,Se])};E.forEach(Z=>[-We.detune,We.detune].forEach(K=>R(c("triangle",Z,K),We.padLevel,F))),C.forEach(Z=>R(c("sine",Z),We.shimmerLevel,ae));let Y=a(1);M(Y,I),R(c("sine",w),We.subLevel,Y)},Ue=(q,{peak:ie,attack:le,length:oe,partials:w,outputs:E,when:C})=>{let D=Math.max(C,i.currentTime),y=oe/4.6,B=le*3,O=a(1);M(O,E),s.voices=s.voices.filter(de=>de.end>D),s.voices.length>=We.voices&&s.voices.shift().duck.gain.setTargetAtTime(0,D,.15);let R=ie*Sg(s.voices.length),Y=D,Z=null,K=[O];for(let[de,Se,Me]of w){let _e=c("sine",q*de),Ge=a(0);Ge.gain.setValueAtTime(0,D),Ge.gain.setTargetAtTime(R*Se,D,le),Ge.gain.setTargetAtTime(0,D+B,y*Me),_e.connect(Ge),Ge.connect(O),_e.start(D);let ce=D+B+y*Me*8;_e.stop(ce),ce>=Y&&(Y=ce,Z=_e),K.push(_e,Ge)}Z.onended=Ie(K),s.voices.push({end:Y,duck:O})},we=(q,ie)=>{let le=Math.max(ie,i.currentTime),[oe,w]=q>=0?[220,680]:[680,220],E=i.createBufferSource(),C=o("bandpass",oe,1.2),D=a(0);E.buffer=re,E.loop=!0,C.frequency.setValueAtTime(oe,le),C.frequency.exponentialRampToValueAtTime(w,le+3.2),D.gain.setValueAtTime(0,le),D.gain.setTargetAtTime(We.travelPeak,le,.5),D.gain.setTargetAtTime(0,le+1.5,.6),E.connect(C),C.connect(D),M(D,j),E.start(le,e()*2),E.stop(le+6.5),E.onended=Ie([E,C,D])},ue=q=>s.layers.filter(ie=>ie.start<=q&&ie.end>q).at(-1)?.index??s.chord;return{master:d,breathing:(q=i.currentTime)=>t.breath?(Md((q-he.start)/he.period)+1)/2:null,run(q=We.horizon){if(!s.stopped)for(;s.at<i.currentTime+q;){let ie=yd(e());ye(s.chord,s.at,ie),s.at+=ie,s.chord=xd(s.hold,s.chord,e())}},age(q){if(s.stopped)return;let ie=q<0?null:q;if(ie===s.hold)return;s.hold=ie;let le=i.currentTime;s.layers.forEach(({buses:w,oscillators:E,end:C})=>{C<=le||(w.forEach(D=>D.gain.setTargetAtTime(0,le,t.change/3)),E.forEach(D=>{try{D.stop(le+t.change*2)}catch{}}))}),s.layers=[],s.chord=vd(q);let oe=yd(e());ye(s.chord,le,oe,t.change),s.at=le+oe,s.chord=xd(s.hold,s.chord,e())},fade(q){if(s.stopped)return;let ie=i.currentTime;d.gain.cancelScheduledValues(ie),d.gain.setTargetAtTime(q?We.master:0,ie,q?We.fadeIn:We.fadeOut)},memory({year:q,weight:ie,period:le=-1},oe=i.currentTime){if(s.stopped||!_d(oe,s.lastNote,We.noteGap))return;s.lastNote=oe;let w=le>=0&&s.period>=0&&le!==s.period;w&&we(q>=s.year?1:-1,oe),s.period=le,s.year=q,Ue(_g(q),{peak:xg(ie),attack:.02,length:vg(ie),partials:ES,outputs:U,when:oe+(w?We.arrival:0)})},swell(q,ie=i.currentTime){s.stopped||Ue(yg(q),{peak:We.swellPeak,attack:.9,length:6,partials:wS,outputs:N,when:ie})},tick(q=i.currentTime){s.stopped||_d(q,s.lastTick)&&(s.lastTick=q,Ue(t.chordTick?wg(ue(q)):We.tick,{peak:We.tickPeak,attack:.15,length:1.4,partials:AS,outputs:z,when:q}))},travel(q,ie=i.currentTime){s.stopped||we(q,ie)},stop(){s.stopped||(s.stopped=!0,[...h,...s.layers.flatMap(q=>q.oscillators)].forEach(q=>{try{q.stop(i.currentTime)}catch{}}),s.layers=[],d.disconnect())}}}function Rg(){let i=globalThis.AudioContext??globalThis.webkitAudioContext,e={context:null,graph:null,on:!0,timer:0,stopTimer:0,age:-1};if(!i)return{supported:!1,toggle:()=>!1,start:()=>!1,running:()=>!1,isOn:()=>!1,memory(){},age(){},swell(){},tick(){},travel(){},pause(){},close(){}};let t=()=>e.on&&e.graph,n=()=>{e.context||(e.context=new i,e.graph=RS(e.context));let{context:r,graph:s}=e;clearTimeout(e.stopTimer),clearInterval(e.timer),s.fade(!0),r.resume?.(),s.age(e.age),s.run(),e.timer=setInterval(()=>s.run(),We.interval)};return{supported:!0,isOn:()=>e.on,running:()=>e.context?.state==="running",start(){return e.on&&!document.hidden&&n(),e.on},toggle(){return!e.context&&e.on?(e.on=!1,!1):(e.on=!e.on,e.on?n():(clearTimeout(e.stopTimer),clearInterval(e.timer),e.graph.fade(!1),e.stopTimer=setTimeout(()=>!e.on&&e.context.suspend?.(),We.suspendAfter)),e.on)},memory(r){t()&&e.graph.memory(r)},swell(r){t()&&e.graph.swell(r)},age(r){e.age=r,t()&&e.graph.age(r)},tick(){t()&&e.graph.tick()},travel(r){t()&&e.graph.travel(r)},pause(r){!e.context||!e.on||(r?e.context.suspend?.():e.context.resume?.())},close(){clearTimeout(e.stopTimer),clearInterval(e.timer),e.on=!0,e.context?.close?.(),e.context=null,e.graph=null}}}var or={order:.6,jitter:.08,flight:.3,arrive:.54,swirl:2.6,burst:.17,glow:.07},ms={period:2.4,rise:.12,fall:6,glow:.8,grow:.35,rate:2},wc={sky:1.4,seed:.9,delay:.3,seconds:4,dolly:6,from:1.6,card:.85,first:.9},Ig={sky:.5,delay:0,seconds:1.4,card:0},Ac={strength:.12,night:["#ecd2b0","#b8cdea","#b8cdea","#ecd2b0"],paper:["#8a5a2b","#2f5f99","#2f5f99","#8a5a2b"]},Tc={spin:.07,breath:.05,pace:.5,still:.92},bd={dim:.97,reach:2.6,dust:1.4},Ec={radius:.2,push:.04,rate:6},Pg=.35,Cg={ink:.42,edge:0},co={light:.8,grow:.12},Xr={pull:.1,glow:.3,grow:.12,inRate:2.2,outRate:1.2};var Td=i=>i>=1?1/0:Math.min(1,Math.max(0,(i-or.arrive*or.flight)/or.order)),Lg=`
  #define DISCOVER_ORDER ${or.order.toFixed(2)}
  #define DISCOVER_JITTER ${or.jitter.toFixed(2)}
  #define DISCOVER_FLIGHT ${or.flight.toFixed(2)}
  #define DISCOVER_SWIRL ${or.swirl.toFixed(2)}
  #define DISCOVER_ARRIVE ${or.arrive.toFixed(2)}
  #define DISCOVER_BURST ${or.burst.toFixed(2)}
  #define DISCOVER_GLOW ${or.glow.toFixed(2)}
  #define SPIN_SLOTS ${Ai.slots}
  #define CLOUD_SPIN ${Tc.spin.toFixed(3)}
  #define CLOUD_BREATH ${Tc.breath.toFixed(3)}
  #define CLOUD_PACE ${Tc.pace.toFixed(2)}
  #define CLOUD_STILL ${Tc.still.toFixed(2)}
  #define ENTRANCE_FIRST ${wc.first.toFixed(2)}
  #define CALL_PERIOD ${ms.period.toFixed(2)}
  #define CALL_RISE ${ms.rise.toFixed(2)}
  #define CALL_FALL ${ms.fall.toFixed(2)}
  #define CALL_GLOW ${ms.glow.toFixed(2)}
  #define CALL_GROW ${ms.grow.toFixed(2)}
  #define CORE_DIM ${bd.dim.toFixed(2)}
  #define CORE_REACH ${bd.reach.toFixed(2)}
  #define FAR_DUST ${bd.dust.toFixed(2)}
  #define POINTER_RADIUS ${Ec.radius.toFixed(2)}
  #define POINTER_PUSH ${Ec.push.toFixed(3)}
  #define HOVER_PULL ${Xr.pull.toFixed(3)}
  #define HOVER_GLOW ${Xr.glow.toFixed(2)}
  #define HOVER_GROW ${Xr.grow.toFixed(2)}
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
`,Ng=`
  #define PAPER_INK ${Cg.ink.toFixed(2)}
  #define PAPER_EDGE ${Cg.edge.toFixed(2)}
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
`,Dg=`
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
`,Ug=`
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
`,Rc=`
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
`,Cc=`
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
`;var ca=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,gs=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},Li=(i,e,t)=>i+(e-i)*t;function Og(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function _s(i){return()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var CS={deep:.6,far:.5,haze:.5,glow:.7},IS=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,PS=`
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
    float haze = 0.0;
    if (uHaze > 0.0) {
      vec3 q = dir * 2.2 + uOffset + vec3(uTime, uTime * 0.6, 0.0);
      float cloud = 0.55 * noise(q) + 0.3 * noise(q * 2.1) + 0.15 * noise(q * 4.3);
      haze = uHaze * uHazeMax * smoothstep(0.38, 0.8, cloud);
    }
    gl_FragColor = vec4(uInk, clamp(t.g * uFar + haze, 0.0, 1.0));
  }
`,LS=i=>1/Math.max(.2,Math.sin(i*Math.PI));function NS(i){let e=document.createElement("canvas");e.width=i,e.height=i/2;let t=e.getContext("2d");t.fillStyle="#000",t.fillRect(0,0,i,i/2),t.globalCompositeOperation="lighter";let n=_s(7),r=(s,a)=>`rgba(${s===0?255:0},${s===1?255:0},${s===2?255:0},${a})`;for(let s of lp({random:n})){t.save(),t.translate(s.u*i,s.v*(i/2)),t.rotate(s.angle),t.scale(LS(s.v),s.squash);let a=t.createRadialGradient(0,0,0,0,0,s.radius);a.addColorStop(0,r(1,s.alpha)),a.addColorStop(.35,r(1,s.alpha*.35)),a.addColorStop(1,r(1,0)),t.fillStyle=a,t.beginPath(),t.arc(0,0,s.radius,0,Math.PI*2),t.fill(),t.restore()}return e}function DS(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.4,"rgba(255,255,255,0.35)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),new kr(i)}function Fg({scene:i,sky:e,mobile:t,ink:n,star:r}){let s=ca(),a={...CS},o=new kr(NS(2048));o.minFilter=o.magFilter=ni,o.generateMipmaps=!1,o.wrapS=Kl;let c={uMap:{value:o},uInk:n,uOffset:{value:new P},uTime:{value:0},uFar:{value:0},uHaze:{value:0},uHazeMax:{value:Zn.haze.alpha}},l=new In({uniforms:c,vertexShader:IS,fragmentShader:PS,transparent:!0,side:ti,depthTest:!1,depthWrite:!1}),h=new ei(new Zs(1500,48,24),l);h.frustumCulled=!1,h.renderOrder=-3,i.add(h);let p=[0,1,2].map(I=>e.list.reduce((U,z)=>U+z.centre[I],0)/e.list.length),d=Math.max(...e.list.map(I=>Math.hypot(...I.centre.map((U,z)=>U-p[z]))+I.radius*2)),u=op({count:t?Zn.deep.mobile:Zn.deep.count,random:_s(7),centre:p,inner:Math.min(Zn.deep.radius/3,Math.max(d*1.15,Zn.deep.inner/4))}),m=new Pt;m.setAttribute("position",new Dt(u.position,3)),m.setAttribute("aSeed",new Dt(u.seed,1)),m.setAttribute("aBright",new Dt(u.bright,1)),m.setAttribute("aHalo",new Dt(new Float32Array(u.count),1)),m.setAttribute("aSize",new Dt(u.size,1));let f={uTime:r.uTime,uPixel:r.uPixel,uInk:n,uGain:{value:0},uHalo:{value:0}},v=new In({uniforms:f,vertexShader:Rc,fragmentShader:Cc,transparent:!0,depthTest:!1,depthWrite:!1}),g=new er(m,v);g.frustumCulled=!1,g.renderOrder=-2,i.add(g);let _=Math.max(1,...e.list.map(I=>I.count)),M=DS(),T=e.list.map(I=>{let{scale:U,strength:z}=cp(I,_),N=new Ua(new Xs({map:M,color:16777215,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0}));return N.position.set(...I.centre),N.scale.set(U,U,1),N.renderOrder=-2,i.add(N),{sprite:N,strength:z,scale:U,galaxy:I,reveal:0}}),S={night:!0,quiet:!1,dim:1,formed:1/0,sky:1,boost:1},b=()=>{f.uGain.value=a.deep*S.sky*S.boost*(S.night?1.25:.4),g.visible=a.deep>.001,c.uFar.value=a.far*S.sky,c.uHaze.value=S.quiet?0:a.haze*S.sky,h.visible=c.uFar.value+c.uHaze.value>.001,T.forEach(({sprite:I,strength:U,scale:z,galaxy:N})=>{let j=gs(N.start,N.end,S.formed);I.scale.set(z*(.55+.45*j),z*(.55+.45*j),1),I.material.opacity=U*a.glow*S.dim*j*(S.night?1:.5),I.visible=I.material.opacity>.002,I.material.color.copy(n.value)})};return{applyTheme:I=>{S.night=I,l.blending=I?xr:Ii,l.needsUpdate=!0,v.blending=I?xr:Ii,v.needsUpdate=!0,T.forEach(({sprite:U})=>{U.material.blending=I?xr:Ii,U.material.needsUpdate=!0}),b()},setTier:I=>{S.quiet=I>=2,b()},setDim:I=>{S.dim=I,b()},update:(I,U,z,N=1,j=1)=>{(z!==S.formed||N!==S.sky||j!==S.boost)&&(S.formed=z,S.sky=N,S.boost=j,b()),h.position.copy(U.position),c.uOffset.value.copy(U.position).multiplyScalar(4e-4),c.uTime.value=s?0:I*.01}}}var Ed=-.27,Cd=.35,wd=[0,0,-7],Wi=18,Bg=40,US=6,OS=.5,Ad=4.2,Rd=900,FS=.9,ho=10,BS=6,uo={rate:.11,yaw:.14,pitch:.02,rest:2.5};function zg({canvas:i,cloud:e,marks:t,future:n,today:r,mobile:s,sky:a,kinds:o=[]}){let c=new mc({canvas:i,antialias:!1,powerPreference:"default"});c.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2));let l=new Pa,h=new Qn(36,innerWidth/innerHeight,.1,4e3),p=r+jc[1]+.4,d=new Float32Array(e.count*3);for(let V=0;V<d.length;V++)d[V]=e.position[V]-e.center[V];let u=new Pt,m=(V,se)=>new Dt(V,se).setUsage(hc);u.setAttribute("position",new Dt(d,3)),u.setAttribute("aFrom",new Dt(e.from,3)),u.setAttribute("aCenter",new Dt(e.center,3)),Object.entries({u:"aU",order:"aOrder",seed:"aSeed",size:"aSize",ahead:"aAhead",kind:"aKind",memory:"aMemory",galaxy:"aGalaxy"}).forEach(([V,se])=>u.setAttribute(se,new Dt(e[V],1))),["threads","people","places"].forEach((V,se)=>u.setAttribute(`aFacet${se}`,new Dt(e.facet[V],1)));let v=new Float32Array(Math.max(1,t.length)).fill(1),g=new Float32Array(v),_=new ts(v,v.length,1,ro,Pi);_.minFilter=_.magFilter=Gi,_.needsUpdate=!0;let M=new Float32Array(v.length).fill(-1);o.forEach((V,se)=>M[se]=$c.indexOf(V));let T=new ts(M,M.length,1,ro,Pi);T.minFilter=T.magFilter=Gi,T.needsUpdate=!0;let S=$c.map(()=>new _t),b=()=>(ze.night?Ac.night:Ac.paper).forEach((V,se)=>S[se].set(V)),I={value:new _t},U=ap({count:s?4e3:void 0,random:_s(2026)}),z=new Pt;z.setAttribute("position",new Dt(U.position,3)),z.setAttribute("aSeed",new Dt(U.seed,1)),z.setAttribute("aBright",new Dt(U.bright,1)),z.setAttribute("aHalo",new Dt(U.halo,1)),z.setAttribute("aSize",new Dt(U.size,1));let N=1.25,j={uTime:{value:0},uPixel:{value:1},uGain:{value:.6},uHalo:{value:1},uInk:I},F=new In({uniforms:j,vertexShader:Rc,fragmentShader:Cc,transparent:!0,depthTest:!1,depthWrite:!1}),ee=new er(z,F);ee.frustumCulled=!1,ee.renderOrder=-1,l.add(ee);let ae=Fg({scene:l,sky:a,mobile:s,ink:I,star:j}),re=t.reduce((V,se,ve)=>se.year<t[V].year?ve:V,0),X=Math.min(1,Math.sqrt(6e4/e.count)),k={uMix:{value:0},uTime:{value:0},uScale:{value:1},uFar:{value:1},uGain:{value:1},uFocusU:{value:0},uFocusW:{value:7},uFocusOn:{value:0},uFilterFacet:{value:-1},uFilterItem:{value:-1},uAway:{value:.12},uReveal:{value:1e4},uLevelCount:{value:v.length},uLevels:{value:_},uKinds:{value:T},uTints:{value:S},uTint:{value:Ac.strength},uPaper:{value:0},uSpin:{value:new Float32Array(Ai.slots)},uPivot:{value:Array.from({length:Ai.slots},(V,se)=>new P(...a.list[se]?.centre??[0,0,0]))},uKeep:{value:1},uSeed:{value:re},uSeedOn:{value:0},uKick:{value:0},uCall:{value:0},uPointer:{value:new P(0,0,0)},uHover:{value:new pe(-1,0)},uInk:I},Q=new In({uniforms:k,vertexShader:Lg,fragmentShader:Ng,transparent:!0,depthTest:!1,depthWrite:!1}),he=new er(u,Q);he.frustumCulled=!1,l.add(he);let Ie=[...t.map(V=>V.position),n.today,n.today,n.book,n.clone],ye=new Float32Array(Ai.slots),Ue=(V,se)=>{se.set(...Ie[V]);let ve=V<t.length?t[V].period:-1;if(ve>=0&&ve<Ai.slots&&ye[ve]){let Je=a.list[ve].centre,[et,Fe]=[se.x-Je[0],se.y-Je[1]];se.x=Je[0]+Math.cos(ye[ve])*et-Math.sin(ye[ve])*Fe,se.y=Je[1]+Math.sin(ye[ve])*et+Math.cos(ye[ve])*Fe}return se},we=[{size:1.3,state:1,order:.96},{size:2.4,state:3,order:.96},{size:2.4,state:2,order:.98},{size:2.4,state:2,order:1},{size:8,state:4,order:0},{size:8,state:4,order:0}],ue=4,q=[0,0],ie=[],le=5,oe=m(new Float32Array(we.length*3),3),w=m(Float32Array.from(we.map(V=>V.size)),1),E=m(new Float32Array(we.length).fill(1),1),C=new Pt;C.setAttribute("position",oe),C.setAttribute("aSize",w),C.setAttribute("aFade",E),C.setAttribute("aFirst",new Dt(Float32Array.from(we.map((V,se)=>se===re?1:0)),1)),C.setAttribute("aState",new Dt(Float32Array.from(we.map(V=>V.state)),1)),C.setAttribute("aOrder",new Dt(Float32Array.from(we.map(V=>V.order)),1));let D={uScale:{value:1},uTime:{value:0},uReveal:{value:0},uSeedOn:{value:0},uInk:I},y=new In({uniforms:D,vertexShader:Dg,fragmentShader:Ug,transparent:!0,depthTest:!1,depthWrite:!1}),B=new er(C,y);B.frustumCulled=!1,l.add(B);let O=[],R=(V,se=!1)=>{let ve=se?new Za({transparent:!0,dashSize:.8,gapSize:.9,depthTest:!1}):new ns({transparent:!0,depthTest:!1});return O.push({material:ve,opacity:V}),ve},Y=V=>new Pt().setAttribute("position",new Ke(V,3)),Z=(()=>{let V=document.createElement("canvas");V.width=V.height=32;let se=V.getContext("2d"),ve=se.createRadialGradient(16,16,0,16,16,16);return ve.addColorStop(0,"rgba(255,255,255,1)"),ve.addColorStop(.5,"rgba(255,255,255,1)"),ve.addColorStop(.75,"rgba(255,255,255,0.3)"),ve.addColorStop(1,"rgba(255,255,255,0)"),se.fillStyle=ve,se.fillRect(0,0,32,32),new kr(V)})(),K=1.6,de=1.5,Se=new P,Me=new Float32Array(3*1024),_e=V=>{let se=new Float32Array(Rd*3),ve=new Dt(se,3).setUsage(hc),Je=new Pt().setAttribute("position",ve);Je.setDrawRange(0,0);let et=new qs({map:Z,size:3,sizeAttenuation:!1,transparent:!0,depthTest:!1,depthWrite:!1});V&&O.push({material:et,opacity:V});let Fe=new er(Je,et);return Fe.frustumCulled=!1,Fe.userData.lay=(qe,Jt=!1,Wt=0)=>{let rn=qe.length/3,bn=Math.min(1023,Jt?rn+1:rn);for(let wt=0;wt<bn;wt++){let vt=wt%rn*3;Se.set(qe[vt],qe[vt+1],qe[vt+2]).project(h),Me[wt*3]=(Se.x*.5+.5)*innerWidth,Me[wt*3+1]=(-Se.y*.5+.5)*innerHeight,Me[wt*3+2]=Se.z>-1&&Se.z<1?1:0}let Le=Wt,Nt=0;for(let wt=0;wt<bn-1&&Nt<Rd;wt++){let[vt,si,Ln,fi,kt,Tn]=[Me[wt*3],Me[wt*3+1],Me[wt*3+2],Me[wt*3+3],Me[wt*3+4],Me[wt*3+5]];if(!Ln||!Tn){Le=0;continue}let zn=Math.hypot(fi-vt,kt-si);if(zn<1e-6)continue;let bt=120,Xt=(Xn,pn)=>(Xn<-bt?1:Xn>innerWidth+bt?2:0)|(pn<-bt?4:pn>innerHeight+bt?8:0);if(Xt(vt,si)&Xt(fi,kt)){Le=((Le-zn)%ho+ho)%ho;continue}let Bt=wt%rn*3,Rn=(wt+1)%rn*3;for(;Le<=zn&&Nt<Rd;){let Xn=Le/zn;for(let pn=0;pn<3;pn++)se[Nt*3+pn]=qe[Bt+pn]+(qe[Rn+pn]-qe[Bt+pn])*Xn;Nt++,Le+=ho}Le-=zn}Je.setDrawRange(0,Nt),ve.needsUpdate=!0,et.size=K*(Fe.userData.outer?de:1)*c.getPixelRatio()},Fe},Ge=[],ce=new gr,fe=(V,se,ve=1980)=>(V.frustumCulled=!1,V.userData.opacity=se,V.userData.year=ve,ce.add(V),V),me=[];(()=>{let V=qe=>qe.members.threads?.[0]??0,se=new Map,ve=a.list.map(()=>({open:[],shadow:[]}));t.forEach((qe,Jt)=>{let Wt=`${qe.period}:${V(qe)}`;se.set(Wt,[...se.get(Wt)??[],Jt])}),se.forEach(qe=>yc(t,qe).forEach(([Jt,Wt])=>ve[t[Jt].period].open.push(...t[Jt].position,...t[Wt].position))),ve.forEach((qe,Jt)=>{let Wt=a.list[Jt].centre;for(let[rn,bn]of[["open",.34],["shadow",.13]]){if(!qe[rn].length)continue;let Le=fe(new is(Y(qe[rn].map((Nt,wt)=>Nt-Wt[wt%3])),R(bn)),bn,a.list[Jt].end);Le.position.set(...Wt),Le.userData.constellation=!0,me.push({lines:Le,k:Jt})}});let Je=(qe,Jt)=>{let Wt=[],rn=Math.max(8,Math.ceil((Jt-qe)/1.5));for(let bn=0;bn<=rn;bn++)Wt.push(...bs(a,qe+(Jt-qe)*bn/rn));return Wt};a.list.forEach((qe,Jt)=>{let Wt=[];for(let Le=0;Le<120;Le++){let Nt=Math.PI*2*Le/120,[wt,vt]=Cr(qe,Math.sin(Nt)*(qe.radius+1.6),Math.cos(Nt)*(qe.radius+1.6));Wt.push(qe.centre[0]+wt,qe.centre[1]+vt,qe.centre[2])}let rn=fe(_e(.8),.8,qe.start);rn.userData.dots=!0,rn.userData.outer=!0,Ge.push({points:rn,vertices:Wt,closed:!0});let bn=a.list[Jt+1];if(bn){let Le=fe(_e(.7),.7,bn.start);Le.userData.dots=!0,Ge.push({points:Le,vertices:Je(qe.along+qe.radius+1.6,bn.along-bn.radius-1.6),closed:!1})}});let et=a.list.at(-1),Fe=fe(_e(.7),.7,r);Fe.userData.dots=!0,Ge.push({points:Fe,vertices:Je(et.along+et.radius+1.6,a.length),closed:!1})})(),l.add(ce);let Mt=Array.from({length:8},()=>{let V=_e(0);return V.visible=!1,l.add(V),V}),Ft=new Float32Array(288),Sn=[],Be=new Float32Array((Wi+1)*3),ct={list:[],centre:[0,0,0],want:0,fade:0,galaxy:{}},$e=V=>{let se=new Float32Array(Bg*Wi*6),ve=m(se,3),Je=new is(new Pt().setAttribute("position",ve),R(V));return Je.frustumCulled=!1,Je.geometry.setDrawRange(0,0),l.add(Je),{lines:Je,attribute:ve,positions:se,indices:[],fade:0,opacity:V}},fn=$e(.7),Ut=$e(.3),at=$e(1),jt=400,Oe=new Float32Array(jt*Wi*6),cn=m(Oe,3),dn=new is(new Pt().setAttribute("position",cn),R(.6));dn.frustumCulled=!1,dn.geometry.setDrawRange(0,0),l.add(dn);let Zt={pairs:[],fade:0,figure:!1},Fn=(V,se,ve,Je,et,Fe=1)=>{for(let qe=0;qe<Wi;qe++)for(let[Jt,Wt]of[[0,qe/Wi*Fe],[1,(qe+1)/Wi*Fe]]){let rn=((se*Wi+qe)*2+Jt)*3;V[rn]=Li(ve.x,Je.x,Wt),V[rn+1]=Li(ve.y,Je.y,Wt),V[rn+2]=Li(ve.z,Je.z,Wt)+4*Wt*(1-Wt)*et}},ri={map:new Map},W=new P,Wn=new P,ui=new P,dt={target:[...wd],distance:700,yaw:0,pitch:Ed},Gt={target:[...wd],distance:340,yaw:0,pitch:Ed},vn={x:0,y:0,goalX:0,goalY:0},ze={reveal:null,follow:-1,idle:!0,hover:-1,selection:-1,preview:-1,previewFade:0,ringFade:0,portrait:innerWidth/innerHeight<1,drift:0,turned:0,ring:-1,touched:-1e9},_i=Math.max(...[...t.map(V=>V.position),n.book,n.clone].map(V=>Math.hypot(V[0],V[1])))+12,Bn=()=>Math.max(160,_i*4.3)*(ze.portrait?1.3:1),lr=V=>Math.min(84,V*(ze.portrait?1.5:1)),Xi=t.length+2,xs=V=>V<t.length?V:V+2,di=Array.from({length:Xi},()=>({x:0,y:0,r:0,on:!1,depth:0})),wn=new P,Mn=new P,mn=(V,se={})=>(Mn.copy(V).project(h),se.x=(Mn.x*.5+.5)*innerWidth,se.y=(-Mn.y*.5+.5)*innerHeight,se.visible=Mn.z>-1&&Mn.z<1,se),ot=({target:V,distance:se,yaw:ve,pitch:Je,follow:et=-1}={})=>{V&&(Gt.target=[...V]),se!==void 0&&(Gt.distance=Pn(se,6,640)),ve!==void 0&&(Gt.yaw=ve),Je!==void 0&&(Gt.pitch=Je),ze.follow=et},Vt=(V=Ed)=>ot({target:wd,distance:Bn(),yaw:0,pitch:V}),vi=new _t,Ce=()=>{let V=getComputedStyle(document.documentElement);vi.set(V.getPropertyValue("--bg").trim()),I.value.set(V.getPropertyValue("--fg").trim()),O.forEach(({material:ve})=>ve.color.copy(I.value));let se=vi.getHSL({}).l<.5;c.setClearColor(vi,1),Q.blending=F.blending=se?xr:Ii,N=se?1.25:.4,j.uHalo.value=se?1:0,F.needsUpdate=!0,ae.applyTheme(se),ze.night=se,b(),y.blending=Ii,k.uGain.value=(se?.55:.6)*X,k.uPaper.value=se?0:1,Q.needsUpdate=!0};Ce();let pi=()=>{ze.portrait=innerWidth/innerHeight<1,h.aspect=innerWidth/innerHeight,c.setSize(innerWidth,innerHeight,!1)};pi();let xn=new Map,A={index:-1,mix:0},G={x:0,y:0,on:!1,fine:matchMedia("(pointer: fine)").matches&&!ca(),strength:0},J={moved:!1,pinch:0,button:0},ne={hover:()=>{},click:()=>{},frame:()=>{},touch:()=>{},error:V=>console.error(V)},te=!0,xe=(V,se)=>{let ve=-1,Je=1;return di.forEach((et,Fe)=>{if(!et.on)return;let qe=Math.max(26,et.r*.9),Jt=Math.hypot(et.x-V,et.y-se)/qe;Jt<Je&&([ve,Je]=[Fe,Jt])}),ve},Ae=()=>{ze.idle=!1,ze.touched=performance.now()/1e3,ne.touch()},Te=(V,se)=>{Gt.target=mg(Gt,V,se,innerHeight,h.fov*Math.PI/180),ze.follow=-1};i.addEventListener("pointerdown",V=>{if(!(V.pointerType==="mouse"&&V.button>2)){if(i.setPointerCapture(V.pointerId),xn.set(V.pointerId,{x:V.clientX,y:V.clientY,startX:V.clientX,startY:V.clientY}),xn.size===1&&Object.assign(J,{moved:!1,button:V.button,pinch:0,shift:V.shiftKey}),xn.size===2){let[se,ve]=[...xn.values()];J.pinch=Math.hypot(se.x-ve.x,se.y-ve.y),J.moved=!0}Ae()}}),i.addEventListener("pointermove",V=>{let se=xn.get(V.pointerId);if(!se){V.pointerType==="mouse"&&ne.hover(xe(V.clientX,V.clientY),V);return}let ve=V.clientX-se.x,Je=V.clientY-se.y;if(Math.hypot(V.clientX-se.startX,V.clientY-se.startY)>US&&(J.moved=!0),[se.x,se.y]=[V.clientX,V.clientY],xn.size===2){let[et,Fe]=[...xn.values()],qe=Math.hypot(et.x-Fe.x,et.y-Fe.y);J.pinch>0&&qe>0&&(Gt.distance=md(Gt.distance,Math.log(J.pinch/qe))),J.pinch=qe,Te(ve/2,Je/2);return}J.moved&&(J.button===2||J.button===1||J.shift?Te(ve,Je):Object.assign(Gt,fg(Gt,-ve*.005,Je*.004)))});let Pe=V=>{let se=xn.get(V.pointerId);xn.delete(V.pointerId),se&&!J.moved&&xn.size===0&&V.type==="pointerup"&&J.button===0&&ne.click(xe(V.clientX,V.clientY),V)};i.addEventListener("pointerup",Pe),i.addEventListener("pointercancel",Pe),i.addEventListener("pointerleave",()=>{G.on=!1,ne.hover(-1)}),i.addEventListener("pointermove",V=>{V.pointerType==="mouse"&&(G.on=G.fine,G.x=V.clientX/innerWidth*2-1,G.y=-(V.clientY/innerHeight)*2+1)}),i.addEventListener("contextmenu",V=>V.preventDefault()),i.addEventListener("wheel",V=>{V.preventDefault();let se=V.deltaY*(V.deltaMode===1?40:V.deltaMode===2?innerHeight:1);Gt.distance=md(Gt.distance,Pn(se*(V.ctrlKey?.012:.0016),-.5,.5)),Ae()},{passive:!1});let Ye=new Qa,Qe=new P,nt=new P,Ne=wc,pt=null,hn=null,Ht=!1,Yt=0,mt=!1,zt=null,nn=!0,Ze={last:-1/0},He=0,An=()=>{let V=++He;document.hidden?setTimeout(()=>He===V&&br(performance.now()),1e3/Sc.hidden):requestAnimationFrame(se=>He===V&&br(se))};document.addEventListener("visibilitychange",()=>te&&An());let br=V=>{if(!te)return;if(!document.hidden&&!ag(Ze,V))return An();Ye.update(V);let se=Math.min(Math.max(Ye.getDelta(),0),.25),ve=Ye.getElapsed();hn??(hn=ve);let Je=Pn(Bn()*Ne.from,6,640);Ht&&pt===null&&(pt=ve,zt=mt?null:{from:Je});let et=pt===null?0:ve-pt,Fe=Math.min(1,Math.max(0,(et-Ne.delay)/Ne.seconds)),qe=gs(0,Ne.sky,ve-hn);ze.follow>=0&&(Ue(ze.follow,nt),Gt.target=nt.toArray());let Jt=gg(dt,Gt,se,Ad);if(Object.assign(dt,Jt),pt===null)dt.distance=Je;else if(zt){let ge=Math.min(1,et/Ne.dolly);ge>=1||!ze.idle?zt=null:dt.distance=Math.exp(Li(Math.log(zt.from),Math.log(Gt.distance),1-(1-ge)**3))}vn.x+=(vn.goalX-vn.x)*(1-Math.exp(-Ad*se)),vn.y+=(vn.goalY-vn.y)*(1-Math.exp(-Ad*se)),ze.drift+=((xn.size===0&&performance.now()/1e3-ze.touched>uo.rest?1:0)-ze.drift)*(1-Math.exp(-se*.6));let[Wt,rn,bn]=pg({...dt,yaw:dt.yaw+Math.sin(ve*uo.rate)*uo.yaw*ze.drift,pitch:dt.pitch+Math.sin(ve*uo.rate*.75+1)*uo.pitch*ze.drift});h.position.set(Wt,rn,bn),h.fov=lr(36),h.updateProjectionMatrix(),h.lookAt(dt.target[0],dt.target[1],dt.target[2]),h.setViewOffset(innerWidth,innerHeight,-vn.x,-vn.y,innerWidth,innerHeight),h.updateMatrixWorld();let Le=innerHeight/(2*Math.tan(h.fov*Math.PI/360)),Nt=gs(.35,.75,dt.distance/Bn());et-Ne.delay-Ne.seconds-.5>0&&(ze.turned+=se*Li(Ai.near,1,Nt));let wt=ze.turned;a.list.forEach((ge,At)=>{At>=Ai.slots||(ye[At]=gp(ge,wt),k.uSpin.value[At]=ye[At])}),me.forEach(({lines:ge,k:At})=>ge.rotation.z=ye[At]??0);let vt=ye[0].toFixed(3);i.dataset.spin!==vt&&(i.dataset.spin=vt),G.strength=Mr(G.strength,G.on?1:0,se,Ec.rate),k.uPointer.value.set(G.x,G.y,G.strength);let si=ze.hover>=0&&ze.hover<t.length;si&&A.index!==ze.hover&&(A.mix*=.4,A.index=ze.hover),A.mix=Mr(A.mix,si?1:0,se,si?Xr.inRate:Xr.outRate),k.uHover.value.set(A.index,A.mix);let Ln=G.strength.toFixed(2);i.dataset.pointer!==Ln&&(i.dataset.pointer=Ln);let fi=pt===null?gs(Ne.seed,Ne.seed+1.6,ve-hn):1,kt=et>0?Math.min(1,et/.45*Math.exp(1-et/.45)):0;k.uSeedOn.value=D.uSeedOn.value=fi,k.uKick.value=kt,Yt=Mr(Yt,Ht?0:1,se,ms.rate),k.uCall.value=Yt*fi,k.uMix.value=Fe;let Tn=Kd(a,Td(Fe));k.uTime.value=D.uTime.value=j.uTime.value=ve,j.uPixel.value=c.getPixelRatio(),k.uFar.value=Nt,k.uScale.value=D.uScale.value=c.domElement.height/(2*Math.tan(h.fov*Math.PI/360)),D.uReveal.value=Math.min(1,Td(Fe)),nn=!1;for(let ge=0;ge<v.length;ge++){let At=g[ge]-v[ge];Math.abs(At)>.002?(v[ge]+=At*(1-Math.exp(-7*se)),nn=!0):v[ge]=g[ge]}for(let ge of ie)v[ge]=g[ge]*(1+Pg*(.5+.5*Math.sin(ve*.9)));(nn||ie.length)&&(_.needsUpdate=!0);let zn=(ge,At)=>{Ue(t.length+ge,wn),oe.setXYZ(ge,wn.x,wn.y,wn.z),E.setX(ge,At)},bt=ge=>k.uReveal.value>=Ts(ge)?1:0;zn(0,bt(r)),zn(1,bt(r)),q.forEach((ge,At)=>q[At]=Mr(ge,ze.ring===At?1:0,se,ze.ring===At?Xr.inRate:Xr.outRate)),zn(2,bt(p)*(1+co.light*q[0])),zn(3,bt(p)*(1+co.light*q[1])),w.setX(2,we[2].size*(1+co.grow*q[0])),w.setX(3,we[3].size*(1+co.grow*q[1])),ze.selection>=0&&(Ue(ze.selection,wn),oe.setXYZ(ue,wn.x,wn.y,wn.z),w.setX(ue,2.2*t[ze.selection].spread+2)),ze.ringFade+=((ze.selection>=0?1:0)-ze.ringFade)*(1-Math.exp(-6*se)),E.setX(ue,ze.ringFade),ze.preview>=0&&(Ue(ze.preview,ui),oe.setXYZ(le,ui.x,ui.y,ui.z),w.setX(le,2.2*t[ze.preview].spread+2)),ze.previewFade+=((ze.preview>=0?1:0)-ze.previewFade)*(1-Math.exp(-9*se)),E.setX(le,ze.previewFade),oe.needsUpdate=w.needsUpdate=E.needsUpdate=!0;let Xt=`${dt.yaw.toFixed(2)},${dt.pitch.toFixed(2)},${dt.distance.toFixed(0)}`;i.dataset.view!==Xt&&(i.dataset.view=Xt);let Rn=Math.abs(Math.log(dt.distance/Gt.distance))<.004&&Math.abs(Math.sin(dt.yaw-Gt.yaw))<.003&&Math.abs(dt.pitch-Gt.pitch)<.003&&dt.target.every((ge,At)=>Math.abs(ge-Gt.target[At])<.03)&&Math.abs(vn.x-vn.goalX)<.5&&Math.abs(vn.y-vn.goalY)<.5?"1":"";i.dataset.rest!==Rn&&(i.dataset.rest=Rn);let Xn=ze.selection>=0?`${wn.x.toFixed(2)},${wn.y.toFixed(2)},${wn.z.toFixed(2)}`:"";i.dataset.ring!==Xn&&(i.dataset.ring=Xn);let pn=ze.preview>=0?String(ze.preview):"";i.dataset.preview!==pn&&(i.dataset.preview=pn);let qi=gs(.25,.9,Fe),Tr=Math.min(Tn,ze.reveal??1/0);ce.visible=qi>.01,ce.children.forEach(ge=>ge.material.opacity=ge.userData.opacity*qi*(ge.userData.constellation?1-Nt:1)*(ge.userData.dots?ge.userData.outer?.4+.25*(1-Nt):.75+.1*(1-Nt):1)*Math.min(1,Math.max(0,(Tr-ge.userData.year)/2))),at.indices=ze.preview>=0&&ze.selection>=0&&ze.preview!==ze.selection?[ze.preview]:[];for(let ge of[fn,Ut,at]){let At=ge.indices.length?1:0;ge.fade+=(At-ge.fade)*(1-Math.exp(-5*se));let yn=Math.min(ge.indices.length,Bg);yn&&(Ue(ze.selection,nt),ge.indices.slice(0,yn).forEach((qn,Vn)=>{Ue(qn,Qe),Fn(ge.positions,Vn,nt,Qe,nt.distanceTo(Qe)*.22,ri.map.get(qn)??1)}),ge.attribute.needsUpdate=!0),ge.lines.geometry.setDrawRange(0,yn*Wi*2),ge.lines.material.opacity=ge.opacity*ge.fade,ge.lines.visible=ge.fade>.01}ct.fade+=(ct.want-ct.fade)*(1-Math.exp(-5*se)),K=1.15+.1*(1-Nt),de=1+.3*(1-Nt),Ge.forEach(({points:ge,vertices:At,closed:yn})=>ge.userData.lay(At,yn)),Mt.forEach((ge,At)=>{let yn=ct.list[At],qn=!!yn&&ct.fade>.01;if(ge.visible=qn,!!qn){for(let Vn=0;Vn<96;Vn++){let cr=Math.PI*2*Vn/96,[pa,Ms]=Cr(ct.galaxy,Math.sin(cr)*yn.radius,Math.cos(cr)*yn.radius);Ft[Vn*3]=ct.centre[0]+pa,Ft[Vn*3+1]=ct.centre[1]+Ms,Ft[Vn*3+2]=ct.centre[2]}ge.userData.lay(Ft,!0),ge.material.color.copy(I.value),ge.material.opacity=.3*(1-.35*(At/Math.max(1,ct.list.length-1)))*ct.fade*qi}});let da=ct.want&&ct.fade>.5?String(ct.list.length):"";i.dataset.rings!==da&&(i.dataset.rings=da);let ys=qi;Zt.fade+=((Zt.pairs.length?1:0)-Zt.fade)*(1-Math.exp(-5*se));let ji=Math.min(Zt.pairs.length,jt),Ei=[],Ss=0;for(ji&&ys>.01&&(Zt.pairs.slice(0,ji).forEach(([ge,At,yn])=>{if(Zt.figure&&yn)return Ei.push(t[ge].year<=t[At].year?[ge,At]:[At,ge]);Ue(ge,nt),Ue(At,Qe),Fn(Oe,Ss++,nt,Qe,nt.distanceTo(Qe)*(Zt.figure?0:yn?.3:.12))}),cn.needsUpdate=!0),dn.geometry.setDrawRange(0,Ss*Wi*2);Sn.length<Ei.length;){let ge=_e(0);l.add(ge),Sn.push(ge)}Sn.forEach((ge,At)=>{if(ge.visible=At<Ei.length,!ge.visible)return;Ue(Ei[At][0],nt),Ue(Ei[At][1],Qe);let yn=nt.distanceTo(Qe)*Wm;for(let qn=0;qn<=Wi;qn++){let Vn=qn/Wi;Be[qn*3]=Li(nt.x,Qe.x,Vn),Be[qn*3+1]=Li(nt.y,Qe.y,Vn),Be[qn*3+2]=Li(nt.z,Qe.z,Vn)+4*Vn*(1-Vn)*yn}ge.userData.lay(Be,!1,ve*BS%ho),ge.material.color.copy(I.value),ge.material.opacity=.75*Zt.fade*ys}),dn.material.opacity=.6*Zt.fade*ys,dn.visible=dn.material.opacity>.01,i.dataset.jumps=dn.visible?String(ji):"";let Ni=1+FS*(1-Nt);j.uGain.value=N*qe*Ni,ae.update(ve,h,Tn,qe,Ni),c.render(l,h),di.forEach((ge,At)=>{Ue(xs(At),wn),Mn.copy(wn).project(h),ge.x=(Mn.x*.5+.5)*innerWidth,ge.y=(-Mn.y*.5+.5)*innerHeight,ge.depth=h.position.distanceTo(wn),ge.r=(t[At]?.spread??OS)*2.4*Le/ge.depth,ge.on=Mn.z>-1&&Mn.z<1&&ge.x>0&&ge.x<innerWidth&&ge.y>0&&ge.y<innerHeight});try{ne.frame({time:ve,dt:se,intro:Fe,formed:Tn,far:Nt,cssScale:Le,projected:di,camera:h,entered:Fe>=Ne.card,seen:pt===null&&ve-hn>Ne.seed+1.2,seedIndex:re})}catch(ge){te=!1,ne.error(ge);return}te&&An()};return{camera:h,view:dt,goal:Gt,inset:vn,state:ze,projected:di,on:(V,se)=>ne[V]=se,stop:()=>te=!1,setQuality:V=>{let se=Sr.tiers[Math.min(V,Sr.tiers.length-1)];k.uKeep.value=se.keep,ae.setTier(V),c.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2,se.ratio)),c.setSize(innerWidth,innerHeight,!1)},start:()=>An(),begin:(V="full")=>{Ht=!0,mt=V!=="full",V==="direct"&&(Ne={...wc,...Ig})},home:Vt,homeDistance:Bn,fly:ot,pick:xe,centerOf:V=>Ue(V,new P),project:mn,resize:pi,applyTheme:Ce,setLevels:V=>V.forEach((se,ve)=>g[ve]=se),setFilter:V=>{k.uFilterFacet.value=V?["threads","people","places"].indexOf(V.facet):-1,k.uFilterItem.value=V?V.item:-1,ae.setDim(V?.45:1)},setFocus:V=>{k.uFocusOn.value=V===null?0:1,V!==null&&(k.uFocusU.value=Ts(V))},setSelection:V=>ze.selection=V,setHover:V=>ze.hover=V,setRingGlow:V=>ze.ring=V,setFresh:V=>ie=V,setPreview:V=>ze.preview=V,setJumps:(V,se=!1)=>Object.assign(Zt,{pairs:V,figure:se}),slotOf:V=>({today:t.length,book:t.length+2,clone:t.length+3})[V],setReveal:V=>{k.uReveal.value=V===null?1e4:Ts(V),ze.reveal=V},setLinks:(V,se)=>{fn.indices=V,Ut.indices=se,i.dataset.links=String(V.length+se.length)},setInset:(V,se)=>{vn.goalX=V,vn.goalY=se},setIdle:V=>ze.idle=V,setLinkReach:V=>ri.map=V,groundAt:(V,se,ve)=>{Mn.set(V/innerWidth*2-1,-(se/innerHeight)*2+1,.5).unproject(h),Mn.sub(h.position).normalize();let Je=(ve-h.position.z)/Mn.z,et=2600,Fe=Number.isFinite(Je)&&Je>0?Math.min(Je,et):et;return[h.position.x+Mn.x*Fe,h.position.y+Mn.y*Fe]},arcScreen:(V,se,ve,Je={})=>(Ue(V,W),Ue(se,Wn),ui.set(Li(W.x,Wn.x,ve),Li(W.y,Wn.y,ve),Li(W.z,Wn.z,ve)+4*ve*(1-ve)*W.distanceTo(Wn)*.22),mn(ui,Je)),setYearRings:(V,se,ve={})=>{se.length?Object.assign(ct,{list:se,centre:V,galaxy:ve,want:1}):ct.want=0}}}var zS="(min-height: 520px) and (min-width: 320px)",kS="(max-width: 900px), (max-aspect-ratio: 1/1)",Id=74,VS=124,GS=24,HS=2.2,WS=.6,ha=18,ua=160,XS=24,qS=400,kg=8,jS=[0,22],Vg={today:2.4,book:1.2,clone:1.2},Gg=8,Pd={quiet:.4,current:.9},Hg=20,Wg=2,YS=.6,$S=40,vs={width:104,height:100,top:118},Xg="http://www.w3.org/2000/svg",Ld=matchMedia(kS),ZS=matchMedia("(pointer: coarse)"),qg=.9,JS=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],KS=new Set(["hero","contact"]),QS=["1","2","3"],Hn=[],Pc=()=>{for(;Hn.length;)Hn.pop()();delete document.documentElement.dataset.entering,document.documentElement.classList.remove("immersive"),document.documentElement.classList.add("flat")};function Yg(){if(!Og()||ca())return Pc();let i=matchMedia(zS);if(i.addEventListener("change",()=>location.reload()),!i.matches)return Pc();eM().catch(e=>{console.error(e),Pc()})}function jg(i){let e=0;i.setAttribute("aria-label",i.textContent.replace(/\s+/g," ").trim());let t=n=>{[...n.childNodes].forEach(r=>{if(r.nodeType===Node.TEXT_NODE){let s=document.createDocumentFragment();r.textContent.split(/(\s+)/).forEach(a=>{if(!a)return;if(/^\s+$/.test(a))return s.append(a);let o=document.createElement("span");o.className="w",o.setAttribute("aria-hidden","true"),o.style.setProperty("--i",e++),o.textContent=a,s.append(o)}),r.replaceWith(s)}else r.nodeType===Node.ELEMENT_NODE&&t(r)})};t(i)}var Xe=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n},Nd=i=>i?i.split(","):[];async function eM(){let i=document.getElementById("scene"),e=document.querySelector(".stage"),t=document.querySelector("main.story"),n=document.querySelector(".hud"),r=document.querySelector(".rail"),s=document.querySelector(".masthead"),a=document.querySelector(".explore"),o=Zd();Object.assign(ai,Zc(dp(o)));let c=matchMedia("(max-width: 760px)").matches,l=JSON.parse(a.dataset.facets),h=JSON.parse(a.dataset.ahead),p=JSON.parse(a.dataset.periods??"[]"),d=[...t.querySelectorAll("[data-station]")].map((x,L)=>({element:x,kind:x.dataset.station,id:x.id,label:x.dataset.hud,t:L,panel:x.matches("[data-panel]")?x:x.querySelector("[data-panel]")})),u=d.length-1,m=x=>d.findIndex(L=>L.kind===x),[f,v,g,_]=["book","clone","contact","hero"].map(m),M=d.filter(x=>x.kind==="milestone"),T=M.map(({element:x})=>({id:x.dataset.milestone,date:x.dataset.date,weight:+x.dataset.weight,period:x.dataset.period,links:Nd(x.dataset.links),...Object.fromEntries(hr.map(L=>[L,Nd(x.dataset[L])]))})),S=ep(T,l,{periods:p,today:o}),b=Yc(T,S.map(x=>x.year),{periods:p,today:o,threads:l.threads}),I=new Map(M.map((x,L)=>[x.t,L])),U=new Map([...t.querySelectorAll("li[data-ask]")].map(x=>[x.dataset.ask,new Set(Nd(x.dataset.memories).map(L=>M.findIndex($=>$.element.dataset.milestone===L)).filter(L=>L>=0))])),z=null,N=Object.fromEntries(hr.map(x=>[x,{}]));t.querySelectorAll("ul.facets").forEach(x=>x.querySelectorAll("li").forEach(L=>N[x.dataset.facet][L.dataset.item]=L.textContent));let j=M.map(x=>({time:x.element.querySelector("time").textContent,title:x.element.querySelector("h3").textContent,body:[...x.element.querySelectorAll(":scope > p:not(.kicker):not(.intro)")].map(L=>L.textContent).join(" ")})),F=M.flatMap((x,L)=>{let $=x.element.querySelector(".fresh");return!$||!lg($.dataset.added)?[]:($.hidden=!1,[L])}),ee=M.map((x,L)=>({index:L,id:x.id,title:j[L].title,body:j[L].body,extra:`${j[L].time} ${x.element.dataset.alt??""} ${hr.flatMap($=>(S[L].members[$]??[]).map(be=>N[$][l[$][be]]??"")).join(" ")}`,weight:S[L].weight,order:L})),ae=hp({marks:S,today:o,random:_s(1980),facets:l,sky:b,cap:c?55e3:Rr.cap,trail:c?12e3:Rr.trail}),re=tp(b),X=zg({canvas:i,cloud:ae,marks:S,future:re,today:o,mobile:c,sky:b,kinds:M.map(x=>x.element.dataset.kind)});X.setFresh(F);let k=document.documentElement,Q=!1,he=new Set,Ie=0,ye=()=>{clearTimeout(Ie),Q=!0,k.dataset.entering="1"},Ue=()=>{Q&&(Q=!1,clearTimeout(Ie),k.dataset.entering="out",Ie=setTimeout(()=>delete k.dataset.entering,1600))},we=x=>{!Q||x.target.closest?.(".seed")||(Y(),Ue())};document.addEventListener("focusin",we),Hn.push(()=>{clearTimeout(Ie),document.removeEventListener("focusin",we),delete k.dataset.entering});let ue=navigator.webdriver,q=location.hash.length>1;!ue&&!q&&ye(),X.home(),X.start();let ie=S.reduce((x,L,$)=>L.year<S[x].year?$:x,0),le=Xe("button","seed");le.type="button",le.setAttribute("aria-label",j[ie].title);let oe=Xe("p","begin-hint");oe.id="begin-hint",le.setAttribute("aria-describedby",oe.id);let w=0,E=!1,C=["pointerup","touchend","click","keydown"],D=()=>C.forEach(x=>document.removeEventListener(x,Y,!0)),y=["pointerdown","pointermove","pointerup","mousedown","mouseup","click","dblclick","contextmenu","touchstart","touchmove","touchend","wheel","keydown"],B=x=>{x.stopPropagation(),(x.type==="contextmenu"||x.type==="wheel"&&x.ctrlKey)&&x.preventDefault()},O=()=>y.forEach(x=>document.removeEventListener(x,B,!0)),R=0;function Y(x){E||x?.type==="keydown"&&["Escape","Shift","Control","Alt","Meta","CapsLock"].includes(x.key)||(E=!0,R=performance.now()/1e3,D(),setTimeout(O,WS*1e3),X.begin(ue?"still":q?"direct":"full"),Q&&(Ie=setTimeout(()=>Ue(),2e4)),le.dataset.gone="1",clearTimeout(w),delete oe.dataset.shown,setTimeout(()=>(le.remove(),oe.remove()),1600))}ue||q?Y():(document.body.append(le,oe),w=setTimeout(()=>oe.dataset.shown="1",HS*1e3),C.forEach(x=>document.addEventListener(x,Y,!0)),y.forEach(x=>document.addEventListener(x,B,{capture:!0,passive:!1}))),Hn.push(()=>{clearTimeout(w),D(),O(),le.remove(),oe.remove()});let Z=new URLSearchParams(location.search).get("quality"),K=Z==="low"?Sr.tiers.length-1:0,de=Z!=="full"&&Z!=="low",Se={frames:[],windows:0,from:0};X.setQuality(K),i.dataset.quality=String(K);let Me=Rg();oe.append(Xe("span","",a.dataset.begin));let _e=Xe("div","labels");e.append(_e),Hn.push(()=>_e.remove());let Ge=S.map((x,L)=>{let $=Xe("div","tag");return $.innerHTML='<b></b><span></span><i class="leader"></i>',$.querySelector("b").textContent=j[L].time,$.querySelector("span").textContent=j[L].title,$.setAttribute("aria-hidden","true"),_e.append($),{node:$,leader:$.querySelector(".leader"),width:0,height:0,on:!1}}),ce=Array.from({length:Wg},()=>{let x=Xe("button","edge-mark");return x.type="button",x.hidden=!0,x.tabIndex=-1,x.setAttribute("aria-hidden","true"),x.innerHTML="<span></span><i></i>",_e.append(x),x.addEventListener("click",()=>vt(Pe(+x.dataset.memory))),{node:x,label:x.querySelector("span"),arrow:x.querySelector("i"),width:0,height:0}}),fe="",me=Array.from({length:Hg+1},()=>({x:0,y:0,visible:!0})),Ee=[],Ot=(x,L,$,be,De=1980,je=0,sn=-1)=>{let gt=Xe("div",$,x);return gt.setAttribute("aria-hidden","true"),_e.append(gt),Ee.push({node:gt,world:L,base:be,year:De,kind:$,ring:je,spotAt:sn,width:0,height:0,shown:-1}),gt},Mt=x=>new P(...x);Ot(e.dataset.today,Mt(re.today),"ahead now",1,o,Vg.today),Ee.at(-1).kind="ahead";let Ft=[];b.list.forEach((x,L)=>{let $=t.querySelector(`#period-${p[L]} [data-station]`);if(!$)return;let[be,De,je]=x.centre,[sn,gt]=[be+b.pole[0],De+b.pole[1]],yt=Math.hypot(sn,gt)||1,ht=x.radius*.8+2,[it,It]=Cr(x,sn/yt*ht,gt/yt*ht),[jn,Di]=($.querySelector(".kicker")?.textContent??p[L]).split(" \xB7 "),Nn=Ot("",Mt([be+it,De+It,je]),"galaxy",.9,(x.start+x.end)/2),jr=Xe("span","galaxy-hint",t.querySelector(`#period-${p[L]}`)?.dataset.hint??""),[Bc,...Er]=jn.split(" / "),fa=Xe("span","galaxy-title");fa.append(Xe("span","galaxy-number",Bc),...Er.length?[Xe("span","galaxy-name",` / ${Er.join(" / ")}`)]:[]),Nn.append(fa,Xe("b","galaxy-count"),...Di?[Xe("span","galaxy-years",Di)]:[],jr,Xe("i","leader")),Ft[L]=Ee.at(-1),Ft[L].hint=jr,Ft[L].leader=Nn.querySelector(".leader"),Ft[L].centre=Mt(x.centre),Nn.dataset.go=`period-${p[L]}`,Nn.addEventListener("click",xi=>{xi.stopImmediatePropagation(),go(Vt===L?"top":Nn.dataset.go)})});let Sn=Array.from({length:Gg},()=>(Ot("",new P,"ring-year",Pd.quiet,1980),Ee.at(-1).dim=0,Ee.at(-1))),Be=e.dataset.until?xo(e.dataset.until):-1;Be>=0&&Ot(yo(Be,document.documentElement.lang),Mt(re.today.map((x,L)=>(x+re.book[L])/2)),"countdown-mark",.8,o);let ct=[["book",a.dataset.book,a.dataset.bookHint],["clone",a.dataset.clone,a.dataset.cloneHint]].map(([x,L,$],be)=>{let De=Ot(L,Mt(re[x]),"ahead",.6,1/0,Vg[x],S.length+be);return $&&De.append(Xe("span","ahead-hint",$)),Ee.at(-1)}),$e=Xe("div","figure-name");$e.setAttribute("aria-hidden","true");let fn=Xe("span","figure-title"),Ut=Xe("span","figure-count");$e.append(fn,Ut),_e.append($e);let at={key:"",chain:[],edges:[],option:null,width:0,height:0,shown:-1},jt=x=>{ct.forEach((L,$)=>{let be=x===S.length+$;be!==(L.node.dataset.hot==="1")&&(L.node.dataset.hot=be?"1":"")}),X.setRingGlow(x>=S.length?x-S.length:-1)};document.querySelectorAll('.masthead nav a[data-go="book"], .masthead nav a[data-go="clone"]').forEach(x=>{let L=S.length+(x.dataset.go==="book"?0:1);x.addEventListener("pointerenter",()=>jt(L)),x.addEventListener("focus",()=>jt(L)),x.addEventListener("pointerleave",()=>jt(pi)),x.addEventListener("blur",()=>jt(pi))});let Oe=Xe("aside","card");Oe.setAttribute("tabindex","-1");let cn=Xe("div","card-body"),dn=Xe("nav","card-steps"),Zt=Xe("button","step",""),Fn=Xe("button","step","");Zt.type=Fn.type="button",Zt.dataset.step="previous",Fn.dataset.step="next",dn.append(Zt,Fn);let ri=new Map,W=Xe("p","visually-hidden");W.setAttribute("role","status"),t.querySelectorAll(".waitlist").forEach(x=>{let L=Xe("div","card-form");L.hidden=!0,L.dataset.for=x.dataset.list;let[$,be]=[x.parentNode,x.nextSibling];L.append(x),ri.set(x.dataset.list,L),Hn.push(()=>$.insertBefore(x,be))});let Wn=Xe("button","card-close","\u2715");Wn.type="button",Wn.dataset.go="top",Wn.setAttribute("aria-label",a.dataset.overview),Wn.setAttribute("title",a.dataset.overview),Oe.append(Wn,cn,...ri.values(),dn,W),Oe.id="card",e.after(Oe),Hn.push(()=>Oe.remove());let ui=Xe("div","nudge");ui.hidden=!0;let dt=Xe("a",""),Gt=Xe("button","","\u2715");Gt.type="button",ui.append(dt,Gt),dn.before(ui);let vn=[...t.querySelectorAll("a, button, input, select, textarea")];vn.forEach(x=>x.setAttribute("tabindex","-1")),Hn.push(()=>vn.forEach(x=>x.removeAttribute("tabindex")));let ze=document.querySelector(".skip");ze&&(ze.setAttribute("href","#card"),Hn.push(()=>ze.setAttribute("href","#main")));let _i=ig([...b.list.flatMap(x=>[[x.centre[0]-x.radius,x.centre[1]-x.radius],[x.centre[0]+x.radius,x.centre[1]+x.radius]]),re.today,re.book,re.clone].map(x=>[x[0],x[1]]),vs),Bn=Xe("div","minimap");Bn.hidden=!0,Bn.setAttribute("aria-hidden","true");let lr=document.createElementNS(Xg,"svg");lr.setAttribute("viewBox",`0 0 ${vs.width} ${vs.height}`);let Xi=(x,L)=>{let $=document.createElementNS(Xg,x);return Object.entries(L).forEach(([be,De])=>$.setAttribute(be,De)),lr.append($),$};b.list.forEach(x=>{let[L,$]=_i.to(x.centre),be=Array.from({length:48},(De,je)=>_i.to(Cr(x,Math.sin(Math.PI*2*je/48)*x.radius,Math.cos(Math.PI*2*je/48)*x.radius).map((sn,gt)=>x.centre[gt]+sn)));Xi("polygon",{points:be.map(([De,je])=>`${De.toFixed(1)},${je.toFixed(1)}`).join(" "),class:"mini-galaxy"})});let xs=S.map(x=>{let[L,$]=_i.to(x.position);return Xi("circle",{cx:L.toFixed(1),cy:$.toFixed(1),r:(.6+x.weight*.35).toFixed(2),class:"mini-dot"})}),di=0;[re.book,re.clone].forEach(x=>{let[L,$]=_i.to(x);Xi("circle",{cx:L.toFixed(1),cy:$.toFixed(1),r:2,class:"mini-future"})});let wn=Xi("polygon",{class:"mini-frame"}),Mn=Xi("circle",{r:3.4,class:"mini-here"});Bn.append(lr),Oe.after(Bn),Hn.push(()=>Bn.remove()),Bn.addEventListener("click",x=>{let L=Bn.getBoundingClientRect(),$=_i.from([(x.clientX-L.left)*vs.width/L.width,(x.clientY-L.top)*vs.height/L.height]),be=rg(b.list,$);be>=0&&go(`period-${p[be]}`)});let mn={related:a.dataset.related,earlier:a.dataset.earlier,later:a.dataset.later,filter:a.dataset.filter,unfilter:a.dataset.unfilter,more:a.dataset.more,lit:a.dataset.lit,all:a.dataset.all,fewer:a.dataset.fewer,nudgearrival:a.dataset.nudgearrival,nudgebook:a.dataset.nudgebook,nudgeclone:a.dataset.nudgeclone,nudgeclose:a.dataset.nudgeclose,periodstart:a.dataset.periodstart},ot=0,Vt=-1,vi=()=>Vt>=0?-1:Te(ot),Ce=null,pi=-1,xn={links:[],near:[]},A=[],G=!1,J={x:0,y:0},ne={on:!1,seen:!1,from:null},te={opened:new Set,sawClone:!1,closed:!1},xe=!1,Ae=!1,Te=x=>I.get(x)??-1,Pe=x=>M[x].t,Ye=x=>{let L=d[x];if(L.kind==="hero")return{previous:null,next:M[0].t};if(L.kind==="milestone"){let{previous:$,next:be}=Om(S,Te(x),Ce);return{previous:$!==null?Pe($):!Ce&&Te(x)===0?0:null,next:be!==null?Pe(be):Ce?{book:f,clone:v}[Fm(S,Te(x),Ce,h,l)]??null:f}}return L.kind==="book"?{previous:M.at(-1).t,next:v}:L.kind==="clone"?{previous:f,next:g}:L.kind==="contact"?{previous:v,next:null}:{previous:null,next:null}},Qe=()=>{let x=vi();xn=x>=0?vc(S,x):{links:[],near:[]};let L=[...xn.links,...xn.near];A=x<0?[]:G?L:Lm(S,x);let $=new Set(A),be=z?U.get(z):null,De=be?km(S,be):Vt>=0?S.map(ht=>ht.period===Vt?yr.normal:yr.quiet):zm(S,{selected:x,near:$,weak:new Set(L.filter(ht=>!$.has(ht))),filter:Ce});X.setLevels(De),e.dataset.levels=[...new Set(De)].sort((ht,it)=>ht-it).join(","),X.setLinks(xn.links.filter(ht=>$.has(ht)),xn.near.filter(ht=>$.has(ht))),X.setSelection(x);let je=Vt>=0?Vt:x>=0?S[x].period:-1;Me.age(je);let sn=(!ne.on||Vt>=0)&&je>=0?Jd(b.list[je],Gg):[],gt=je>=0?b.list[je]:null;X.setYearRings(gt?.centre??null,sn,gt??{}),Sn.forEach((ht,it)=>{let It=sn[it];if(ht.dim=It?1:0,!It)return;ht.node.textContent=String(It.year),ht.base=x>=0&&It.year===Math.floor(S[x].year)?Pd.current:Pd.quiet;let[jn,Di]=Cr(gt,It.radius*Math.sin(qg),It.radius*Math.cos(qg));ht.world.set(gt.centre[0]+jn,gt.centre[1]+Di,gt.centre[2]),ht.width=0}),X.setFocus(x>=0?S[x].year:null),X.setFilter(Ce);let yt=fs(S,Ce);if(X.setJumps(be?Vm(be,X.slotOf("clone")):at.edges,!be),b){let ht=jm(S,yt,b.list.length);Ft.forEach((it,It)=>{it&&(it.dim=je>=0&&je!==It||["book","clone"].includes(d[ot].kind)?0:Ce&&!ht[It]?.3:1,it.pin=je===It,it.node.dataset.pin=it.pin?"1":"",it.pin?it.node.setAttribute("title",a.dataset.overview):it.node.removeAttribute("title"),it.hint.hidden=x>=0||!!Ce,it.node.querySelector(".galaxy-count").textContent=Ce?` \xB7 ${ht[It]}`:"",it.width=0)})}},nt=x=>{let L=d[x];if(Vt>=0){let $=b.list[Vt];return X.fly({target:$.centre,distance:Pn($.radius*4.2+16,40,130),pitch:Pn(X.goal.pitch,-.45,.5)}),X.setIdle(!1)}if(L.kind==="milestone"){let $=S[Te(x)],be=b.list[$.period];X.fly({target:be.centre.map((De,je)=>De+($.position[je]-De)*.35),distance:Pn(be.radius*4.2+16,40,130),pitch:Pn(X.goal.pitch,-.45,.5)})}else L.kind==="book"||L.kind==="clone"?X.fly({target:re[L.kind],distance:54,pitch:Pn(X.goal.pitch,-.45,.5)}):L.kind==="contact"?X.fly({target:[0,0,-7],distance:X.homeDistance(),yaw:0,pitch:Cd}):X.home();X.setIdle(L.kind==="hero")},Ne=x=>x.querySelectorAll("li[data-ask]").forEach(L=>{let $=Xe("button","ask-q",L.querySelector(".ask-q").textContent);$.type="button",$.dataset.ask=L.dataset.ask,$.setAttribute("aria-pressed",String(z===L.dataset.ask)),L.replaceChildren($)}),pt=x=>{if(z=x&&U.has(x)&&d[ot].kind==="clone"?x:null,e.dataset.asked=z??"",Oe.querySelectorAll(".ask-q").forEach($=>$.setAttribute("aria-pressed",String($.dataset.ask===z))),Qe(),!z)return nt(ot);X.fly({target:[0,0,-7],distance:X.homeDistance(),yaw:0,pitch:Cd});let L=[...U.get(z)].map($=>M[$].element.querySelector("h3").textContent);W.textContent=mn.lit.replace("{n}",()=>String(L.length)).replace("{names}",()=>L.join(", "))},hn=x=>x.querySelectorAll("ul.facets").forEach(L=>{let $=L.dataset.facet;L.querySelectorAll("li").forEach(be=>{let De=Xe("button","chip",be.textContent);De.type="button",De.dataset.facet=$,De.dataset.item=be.dataset.item,De.setAttribute("aria-pressed",String(Ce?.facet===$&&l[$][Ce.item]===be.dataset.item)),De.setAttribute("title",mn.filter.replace("{thread}",be.textContent)),be.replaceChildren(De)})}),Ht=(x,L)=>{let $=[...xn.links,...xn.near];if(!$.length)return;let be=hd(S,L),De=G?$.slice(0,kg):be,je=Xe("div","related");je.append(Xe("p","kicker",mn.related));let sn=Xe("ul");if(De.forEach(gt=>{let yt=Xe("li"),ht=Xe("button","peer");ht.type="button",ht.dataset.memory=String(gt),ht.append(Xe("time","",j[gt].time),Xe("span","",j[gt].title)),yt.append(ht),sn.append(yt)}),sn.addEventListener("scroll",()=>nn()),je.append(sn),$.length>be.length){let gt=Xe("button","expander",G?mn.fewer:mn.all.replace("{n}",String(Math.min($.length,kg))));gt.type="button",gt.setAttribute("aria-expanded",String(G)),je.append(gt)}x.append(je)},Yt=()=>{let x=cn.firstElementChild,L=vi();!x||L<0||(x.querySelector(".related")?.remove(),Ht(x,L),Oe.dataset.collapsed=x.querySelector(".expander")&&!G?"1":"",nn(),cn.querySelector(".expander")?.focus({preventScroll:!0}))},mt=Xe("p","more-cue",a.dataset.continues??"");mt.setAttribute("aria-hidden","true"),Oe.append(mt);let zt=()=>{let x=cn.scrollHeight>cn.clientHeight+4&&cn.scrollTop+cn.clientHeight<cn.scrollHeight-4,L=x?"1":"";Oe.dataset.overflow!==L&&(Oe.dataset.overflow=L),x&&(mt.style.bottom=`${(dn.hidden?0:dn.offsetHeight)+10}px`)};cn.addEventListener("scroll",zt,{passive:!0});let nn=()=>{zt();let x=Oe.querySelector(".related"),L=x?.querySelector("ul");if(!L)return;let $=L.getBoundingClientRect().bottom+2,be=[...L.children].filter(De=>De.getBoundingClientRect().bottom>$).length;x.dataset.more=L.scrollHeight>L.clientHeight+2&&be?mn.more.replace("{n}",String(be)):""},Ze=-1,He=x=>{Ze!==x&&(Ze=x,X.setPreview(x))},An=()=>{if(delete Oe.dataset.fit,!!KS.has(Oe.dataset.kind)){Oe.classList.add("measure");for(let x of QS){if(Oe.scrollHeight<=Oe.clientHeight)break;Oe.dataset.fit=x}Oe.classList.remove("measure")}},br=()=>{let x=d[ot],L=x.panel.cloneNode(!0);["data-station","data-panel","id"].forEach(yt=>L.removeAttribute(yt)),L.querySelectorAll("[id]").forEach(yt=>yt.removeAttribute("id")),[...L.children].forEach(yt=>yt.matches(".kicker, .period-head")||yt.remove()),L.querySelectorAll("h1, h2, h3").forEach(jg);let $=Xe("button","period-start",mn.periodstart.replace("{title}",()=>x.element.querySelector("h3")?.textContent??""));$.type="button",$.dataset.go=x.id;let be=S.filter(yt=>yt.period===Vt),De=tg(be).map((yt,ht)=>[yt,[a.dataset.countMemories,a.dataset.countPeople,a.dataset.countPlaces][ht]]).filter(([yt,ht])=>yt>0&&ht).map(([yt,ht])=>ht.replace("{n}",String(yt))),je=Xe("div","related"),sn=Xe("ul");S.forEach((yt,ht)=>{if(yt.period!==Vt)return;let it=Xe("li"),It=Xe("button","peer");It.type="button",It.dataset.memory=String(ht),It.append(Xe("time","",j[ht].time),Xe("span","",j[ht].title)),it.append(It),sn.append(it)}),je.append(sn),L.append(Xe("p","period-facts kicker",De.join(" \xB7 ")),$,je),He(-1),cn.replaceChildren(L),Oe.dataset.collapsed="",Oe.dataset.kind="period",ri.forEach(yt=>yt.hidden=!0);let gt=(yt,ht,it)=>{yt.hidden=ht===null,yt.dataset.to="",yt.dataset.periodTo=ht??"",yt.textContent=it};gt(Zt,xc(S,p.length,Vt-1),`\u2190 ${mn.earlier}`),gt(Fn,xc(S,p.length,Vt+1),`${mn.later} \u2192`),dn.hidden=Zt.hidden&&Fn.hidden,Wn.hidden=!1,Fe.running=!1,Fe.year=null,X.setReveal(null),qe()},V=()=>{if(Vt>=0)return br(),requestAnimationFrame(zt);let x=d[ot],L=x.panel.cloneNode(!0);L.removeAttribute("data-station"),L.removeAttribute("data-panel"),L.removeAttribute("id"),L.querySelectorAll("[id]").forEach(gt=>gt.removeAttribute("id")),L.querySelectorAll("[tabindex]").forEach(gt=>gt.removeAttribute("tabindex")),L.querySelectorAll("h1, h2, h3").forEach(jg),hn(L),Ne(L);let $=vi();$>=0&&Ht(L,$),x.kind==="milestone"&&L.querySelector(".period-head")?.remove(),He(-1),cn.replaceChildren(L),Oe.dataset.collapsed=L.querySelector(".expander")&&!G?"1":"",Oe.dataset.kind=x.kind,ri.forEach((gt,yt)=>gt.hidden=x.kind!==yt);let{previous:be,next:De}=Ye(ot),je=(gt,yt,ht)=>{gt.hidden=yt===null,gt.dataset.to=yt??"",gt.textContent=ht};je(Zt,be,`\u2190 ${mn.earlier}`);let sn=Ce&&x.kind==="milestone"?{[f]:a.dataset.book,[v]:a.dataset.clone}[De]:void 0;je(Fn,De,`${sn??mn.later} \u2192`),dn.hidden=x.kind==="hero"||be===null&&De===null,Wn.hidden=x.kind==="hero",An(),nn(),Oe.classList.remove("live"),Oe.offsetWidth,Oe.classList.add("live"),Oe.scrollTop=0,fe="",x.kind!=="hero"&&ri.get(x.kind)?.scrollIntoView({block:"nearest"}),Wt||(W.textContent=x.label),Je()},se=()=>{let x=d[ot];return x.kind==="hero"?ai.start:x.kind==="milestone"?S[Te(ot)].year:{book:ai.book,clone:ai.clone}[x.kind]??ai.end},ve=()=>{let x=d[ot],L=Im({arrived:xe,opened:te.opened.size,closed:te.closed,sawClone:te.sawClone,memory:x.kind==="milestone",quiet:!!x.element.dataset.quiet,age:Vt>=0});if(ui.hidden=L===null,L===null)return;let $=L==="arrival"?"top":L;dt.dataset.go=$,dt.href=`#${$}`,dt.textContent=L==="arrival"?mn.nudgearrival.replace("{n}",String(S.length)):mn[L==="clone"?"nudgeclone":"nudgebook"],Gt.setAttribute("aria-label",mn.nudgeclose),Gt.setAttribute("title",mn.nudgeclose)};Gt.addEventListener("click",()=>{te.closed=!0,ve(),Oe.focus({preventScroll:!0})});let Je=()=>{let x=Oe.getBoundingClientRect(),L=Math.max(Id,a.getBoundingClientRect().bottom+6);Ld.matches?X.setInset(0,(L+Math.max(L+120,x.top))/2-innerHeight/2):X.setInset((x.right+innerWidth)/2-innerWidth/2,(L+innerHeight-VS)/2-innerHeight/2)},et=r?.querySelector("[data-play]"),Fe={running:!1,year:null,from:0},qe=()=>{if(!et)return;et.setAttribute("aria-pressed",String(Fe.running));let x=Fe.running?et.dataset.pauseLabel:et.dataset.playLabel;et.setAttribute("aria-label",x),et.setAttribute("title",x),et.querySelector(".rail-name").textContent=Fe.running?et.dataset.pauseName:et.dataset.playName,r.dataset.playing=Fe.year===null?"":Fe.running?"1":"paused"},Jt=()=>{Fe.year!==null&&(Fe.running=!1,Fe.year=null,X.setReveal(null),qe())},Wt=!1,rn=document.title,bn=document.querySelector('meta[property="og:site_name"]')?.content??"",Le=!1,Nt=!1,wt=x=>{if(!Le)try{if(Nt&&!x.startsWith("#"))return Nt=!1,history.back();let L=Dm(location.hash,x);history[L==="push"?"pushState":"replaceState"](null,"",x),L==="push"&&(Nt=!0)}catch{}},vt=(x,{push:L=!0,hush:$=!1}={})=>{Wt=$,Jt();let be=Vt>=0||d[ot].kind!=="hero";ot=Pn(x,0,u),Vt=-1,e.dataset.period="",z=null,G=!1,e.dataset.asked="",Ce&&be&&d[ot].kind==="hero"&&Ln(null),d[ot].kind==="milestone"&&!ne.seen&&(ne.seen=!0,ne.on=!0,ne.from={...J},e.dataset.gentle="1");let De=d[ot];document.documentElement.dataset.at=ot,n.textContent=De.label,document.title=dd(rn,bn,De.kind==="hero"?"":De.element.querySelector("h3, h2")?.textContent),Qe(),nt(ot),d[ot].kind==="milestone"&&!$&&te.opened.add(ot),d[ot].kind==="clone"&&(te.sawClone=!0),d[ot].kind==="hero"&&(xe=!1),V(),ve(),r&&r.querySelector(".rail-cursor")?.style.setProperty("--x",`${Ir(se()).toFixed(2)}%`),De.kind==="milestone"?Me.memory(S[Te(ot)]):(De.kind==="book"||De.kind==="clone")&&Me.swell(De.kind),L&&wt(De.kind!=="hero"?`#${De.id}`:Ce?`#${pd(Ce.facet,l[Ce.facet][Ce.item])}`:`${location.pathname}${location.search}`)},si=(x,{push:L=!0}={})=>{let $=S.findIndex(be=>be.period===x);$<0||(Wt=!1,Jt(),ot=Pe($),Vt=x,z=null,G=!1,e.dataset.asked="",e.dataset.period=p[x],document.documentElement.dataset.at=ot,n.textContent=d[ot].element.querySelector(".kicker")?.textContent??"",document.title=dd(rn,bn,n.textContent),Qe(),nt(ot),V(),ve(),r?.querySelector(".rail-cursor")?.style.setProperty("--x",`${Ir(se()).toFixed(2)}%`),Me.memory(S[Nm(S,x,1)[0]]),L&&wt(`#period-${p[x]}`))},Ln=x=>{Ce=x;let L=Ce?`${Ce.facet}:${Ce.item}`:"";if(L!==at.key){let $=fs(S,Ce),be=Xm(S,$);Object.assign(at,{key:L,chain:$,edges:yc(S,$,je=>X.centerOf(je).toArray()),option:null,width:0,height:0});let De=ud(h,l,Ce);$.length&&De&&at.edges.push([$.at(-1),X.slotOf(De),!1]),fn.textContent=Ce?N[Ce.facet][l[Ce.facet][Ce.item]]??"":"",Ut.textContent=$.length?qm(be,{one:a.dataset.countMemory,many:a.dataset.countMemories}):""}a.querySelectorAll(".legend button").forEach($=>{let be=$.closest(".legend").dataset.facet;$.setAttribute("aria-pressed",String(!!Ce&&Ce.facet===be&&l[be][Ce.item]===$.dataset.item))}),Oe.querySelectorAll(".chip").forEach($=>$.setAttribute("aria-pressed",String(!!Ce&&Ce.facet===$.dataset.facet&&l[$.dataset.facet][Ce.item]===$.dataset.item))),e.dataset.filter=Ce?`${Ce.facet}:${l[Ce.facet][Ce.item]}`:"",fi.hidden=!Ce,ge.dataset.active=Ce?"1":"",ge.setAttribute("aria-label",Ce?`${At} \xB7 ${N[Ce.facet][l[Ce.facet][Ce.item]]??""}`:At),Ce&&(fi.textContent=`\u2715 ${N[Ce.facet][l[Ce.facet][Ce.item]]??""}`,fi.setAttribute("aria-label",`${mn.unfilter}: ${N[Ce.facet][l[Ce.facet][Ce.item]]??""}`)),d[ot].kind==="hero"&&Vt<0&&wt(Ce?`#${pd(Ce.facet,l[Ce.facet][Ce.item])}`:`${location.pathname}${location.search}`),Qe(),d[ot].kind==="milestone"&&Vt<0&&V()},fi=a.querySelector("[data-unfilter]");fi.addEventListener("click",()=>Ln(null));let kt=(x,L)=>{let $=l[x].indexOf(L);Ln(Ce?.facet===x&&Ce.item===$?null:{facet:x,item:$})};a.querySelectorAll(".legend button").forEach(x=>x.addEventListener("click",()=>kt(x.closest(".legend").dataset.facet,x.dataset.item)));let Tn=[...a.querySelectorAll(".legend")];Tn.forEach(x=>x.hidden=!1),Hn.push(()=>Tn.forEach(x=>x.hidden=!0));let zn=a.querySelector("[data-legend-toggle]");zn?.addEventListener("click",()=>{let x=a.dataset.legend!=="open";x&&Ni(!1),a.dataset.legend=x?"open":"",zn.setAttribute("aria-expanded",String(x)),Je()}),e.dataset.filter="";let bt=a.querySelector(".finder"),Xt=bt.querySelector("input"),Bt=bt.querySelector(".results"),Rn=bt.querySelector(".none"),Xn=a.querySelector("[data-find]"),pn=bt.querySelector(".preview"),qi=x=>{pn.dataset.on=x>=0?"1":"",!(x<0)&&(pn.querySelector("time").textContent=j[x].time,pn.querySelector("strong").textContent=j[x].title,pn.querySelector("p").textContent=j[x].body.match(/^.*?[.!?](?=\s|$)/)?.[0]??j[x].body)},Tr=x=>{let L=x.target.closest?.(".peer[data-memory]"),$=L&&bt.contains(L)?+L.dataset.memory:-1;qi($),He($)},da=x=>{let L=Xe("li"),$=Xe("button","peer");return $.type="button",$.dataset.memory=String(x),$.append(Xe("time","",j[x].time),Xe("span","",j[x].title)),L.append($),L},ys=()=>Bt.replaceChildren(...[...t.querySelectorAll("section.period")].flatMap(x=>{let L=[...x.querySelectorAll("[data-station='milestone']")].map(be=>Te(d.findIndex(De=>De.element===be))),$=Xe("li","group",x.querySelector(".kicker")?.textContent??"");return $.setAttribute("aria-hidden","true"),[$,...L.map(da)]})),ji=x=>{bt.hidden=!x,Xn.setAttribute("aria-expanded",String(x)),x?(Xt.value.trim()||ys(),Ei.hidden||Ni(!1),Xt.focus()):(qi(-1),He(-1),bt.contains(document.activeElement)&&document.activeElement.blur(),Xt.value="",Bt.replaceChildren(),Rn.textContent="")};Xn.addEventListener("click",()=>ji(bt.hidden)),bt.addEventListener("focusin",Tr),Bt.addEventListener("pointerover",Tr),Bt.addEventListener("pointerleave",()=>{(!bt.contains(document.activeElement)||document.activeElement===Xt)&&(qi(-1),He(-1))}),Xt.addEventListener("input",()=>{let x=ld(ee,Xt.value),L=x.slice(0,cd),$=Bm(S,l,N,Xt.value);Bt.replaceChildren(...$.map(be=>{let De=Xe("li"),je=Xe("button","peer show");return je.type="button",je.dataset.facet=be.facet,je.dataset.item=l[be.facet][be.item],je.append(Xe("time","",String(be.count)),Xe("span","",mn.filter.replace("{thread}",be.title))),De.append(je),De}),...L.map(be=>da(be.index))),Xt.value.trim()||ys(),Rn.textContent=Xt.value.trim()?L.length?Pm(Rn.dataset.count,L.length,x.length):$.length?"":Rn.dataset.none:""}),bt.addEventListener("submit",x=>{x.preventDefault(),Bt.querySelector("button")?.click()}),Bt.addEventListener("click",x=>{let L=x.target.closest("button");if(L){if(ji(!1),L.dataset.facet){let $=l[L.dataset.facet].indexOf(L.dataset.item);return Ln(Ce?.facet===L.dataset.facet&&Ce.item===$?Ce:{facet:L.dataset.facet,item:$})}vt(Pe(+L.dataset.memory)),Oe.focus({preventScroll:!0})}}),bt.addEventListener("keydown",x=>{if(x.key==="ArrowDown"||x.key==="ArrowUp"){let L=[...Bt.querySelectorAll("button")];if(!L.length)return;x.preventDefault();let $=L.indexOf(document.activeElement);L[Pn($+(x.key==="ArrowDown"?1:-1),0,L.length-1)]?.focus(),$===0&&x.key==="ArrowUp"&&Xt.focus()}}),a.querySelector("[data-surprise]").addEventListener("click",()=>{let x=Um(S,Ce,Te(ot),new Set([...te.opened].map(Te)));x!==null&&vt(Pe(x))});let Ei=a.querySelector(".guide"),Ss=a.querySelector("[data-guide-toggle]"),Ni=x=>{Ei.hidden=!x,Ss.setAttribute("aria-expanded",String(x)),x&&(ji(!1),a.dataset.legend="",zn?.setAttribute("aria-expanded","false"))};Ss.addEventListener("click",()=>Ni(Ei.hidden)),Xn.addEventListener("click",()=>!bt.hidden&&Ni(!1));let ge=a.querySelector("[data-more-toggle]"),At=ge.getAttribute("aria-label"),yn=x=>{a.dataset.sheet=x?"open":"",ge.setAttribute("aria-expanded",String(x))};ge.addEventListener("click",()=>yn(a.dataset.sheet!=="open"));let qn=a.querySelector(".sheet");qn.addEventListener("click",x=>{let L=x.target.closest("button, a");if(!L||L.matches(".lang"))return L&&yn(!1);yn(!1),((L.matches("[data-legend-toggle]")?a.querySelector(".legend button"):ge)??ge).focus()}),qn.addEventListener("focusout",x=>a.dataset.sheet==="open"&&!qn.contains(x.relatedTarget)&&x.relatedTarget!==ge&&yn(!1));let Vn=x=>a.dataset.sheet==="open"&&!x.target.closest(".sheet, [data-more-toggle]")&&yn(!1);document.addEventListener("pointerdown",Vn),i.addEventListener("pointerdown",()=>Ni(!1)),Hn.push(()=>document.removeEventListener("pointerdown",Vn));let cr=a.querySelector("[data-sound]");if(Me.supported){cr.hidden=!1,cr.setAttribute("aria-pressed","true"),cr.addEventListener("click",()=>cr.setAttribute("aria-pressed",String(Me.toggle())));let x=De=>{if(Me.running())return $();De.target.closest?.("[data-sound]")||Me.start()},L=["pointerup","touchend","click","keydown"],$=()=>L.forEach(De=>document.removeEventListener(De,x,!0));L.forEach(De=>document.addEventListener(De,x,!0));let be=()=>Me.pause(document.hidden);document.addEventListener("visibilitychange",be),Hn.push(()=>{$(),document.removeEventListener("visibilitychange",be),Me.close(),cr.setAttribute("aria-pressed","false"),cr.hidden=!0})}let pa=Xe("p","visually-hidden");pa.setAttribute("role","status"),e.append(pa);let Ms=null,fo=()=>document.documentElement.dataset.focus==="1",Lc=x=>{document.documentElement.dataset.focus=x?"1":"",pa.textContent=x?a.dataset.focusNote:"",Ms=x?{...J}:null,x&&(Ni(!1),yn(!1),ji(!1))},Dd=()=>fo()&&Lc(!1),Nc=()=>{ne.on&&(ne.on=!1,e.dataset.gentle="",Qe())},Ud=performance.now()/1e3,Dc=()=>Ud=performance.now()/1e3,$g=x=>{J.x=x.clientX,J.y=x.clientY,Ms&&Math.hypot(J.x-Ms.x,J.y-Ms.y)>12&&Dd(),ne.on&&Math.hypot(J.x-ne.from.x,J.y-ne.from.y)>12&&Nc(),Math.abs(x.movementX)+Math.abs(x.movementY)>6&&Dc()},Uc=()=>{Dd(),Nc(),Dc()},Od=[["pointermove",$g],["pointerdown",Uc],["wheel",Uc],["touchstart",Uc]];Od.forEach(([x,L])=>addEventListener(x,L,{passive:!0})),Hn.push(()=>{Od.forEach(([x,L])=>removeEventListener(x,L)),delete document.documentElement.dataset.focus});let Zg=ug(S),Oc={phase:"waiting",step:0,at:0};Oe.addEventListener("pointerover",x=>{let L=x.target.closest(".related .peer");He(L?+L.dataset.memory:-1)}),Oe.addEventListener("pointerleave",()=>He(-1)),Oe.addEventListener("focusin",x=>{let L=x.target.closest(".related .peer");L&&He(+L.dataset.memory)}),Oe.addEventListener("focusout",()=>He(-1)),Oe.addEventListener("click",x=>{let L=x.target.closest(".chip");if(L)return kt(L.dataset.facet,L.dataset.item);if(x.target.closest(".expander"))return G=!G,Qe(),Yt();let be=x.target.closest(".ask-q");if(be)return pt(z===be.dataset.ask?null:be.dataset.ask);let De=x.target.closest(".peer");if(De)return vt(Pe(+De.dataset.memory)),Oe.focus({preventScroll:!0});let je=x.target.closest(".step");if(je&&je.dataset.periodTo)return si(+je.dataset.periodTo),Oe.focus({preventScroll:!0});if(je&&je.dataset.to!=="")return vt(+je.dataset.to),Oe.focus({preventScroll:!0});let sn=x.target.closest("[data-go]");sn&&qr.has(sn.dataset.go)&&(x.preventDefault(),go(sn.dataset.go))});let qr=new Map(d.map(x=>[x.id,x.t])),mo=new Map(p.map((x,L)=>[`period-${x}`,L]));document.querySelectorAll("section.period").forEach(x=>{let L=x.querySelector("[data-station]");qr.set(x.id,d.findIndex($=>$.element===L))});let go=x=>{if(!qr.has(x))return;if(mo.has(x))return si(mo.get(x));let L=qr.get(x);vt(L);let $=d[L].kind!=="hero"?ri.get(d[L].kind):null;$&&ZS.matches?Oe.focus({preventScroll:!0}):$?.querySelector("input, a, button")?.focus()},Jg=()=>{let x=!Ae;Ae=!0;let L;try{L=decodeURIComponent(location.hash.slice(1))}catch{return}if(!L){Nt=!1,vt(0,{push:!1}),Ce&&Ln(null);return}if(E||Y(),mo.has(L))return si(mo.get(L),{push:!1});let $=Hm(L,l);if($)return(d[ot].kind!=="hero"||Vt>=0)&&vt(0,{push:!1}),Ln($);qr.has(L)&&(vt(qr.get(L),{push:!1}),x&&L.startsWith("m-")&&(xe=!0),ve())},Fc=()=>{Le=!0;try{Jg()}finally{Le=!1}};document.querySelectorAll("[data-go]").forEach(x=>x.addEventListener("click",L=>{Oe.contains(x)||!qr.has(x.dataset.go)||(L.preventDefault(),go(x.dataset.go))})),addEventListener("hashchange",Fc),Hn.push(()=>removeEventListener("hashchange",Fc)),t.addEventListener("focusin",x=>{let L=d.find($=>$.element.contains(x.target));L&&L.t!==ot&&vt(L.t)});let Fd={hero:_,book:f,clone:v};ri.forEach((x,L)=>x.addEventListener("focusin",()=>ot!==Fd[L]&&vt(Fd[L])));let Bd={ArrowDown:1,ArrowRight:1,PageDown:1," ":1,ArrowUp:-1,ArrowLeft:-1,PageUp:-1},zd=x=>{if(!(x.metaKey||x.ctrlKey||x.altKey)&&(Dc(),Nc(),!(fo()&&x.key.toLowerCase()!=="h"&&(Lc(!1),x.key==="Escape")))){if(x.key==="Escape"){if(!Ei.hidden)Ni(!1),Ss.focus();else if(a.dataset.sheet==="open")yn(!1),ge.focus();else if(!bt.hidden)ji(!1),Xn.focus();else{if(x.target.closest("input, textarea, select"))return;z?pt(null):Ce?Ln(null):ot!==0&&vt(0)}return}if(!x.target.closest("input, textarea, select, .finder")){if(x.key==="/")return x.preventDefault(),ji(!0);if(x.key==="?")return x.preventDefault(),Ni(Ei.hidden);if(x.key.toLowerCase()==="h")return x.preventDefault(),x.repeat?void 0:Lc(!fo());if(!(x.key===" "&&x.target.closest("button, a, summary, [role='button']"))){if(x.key==="Home")x.preventDefault(),vt(0);else if(x.key==="End")x.preventDefault(),vt(g);else if(x.key in Bd){x.preventDefault();let L=x.key===" "&&x.shiftKey?-1:Bd[x.key];if(Vt>=0){let $=xc(S,p.length,Vt+L);$!==null&&si($)}else{let{previous:$,next:be}=Ye(ot),De=L>0?be:$;De!==null&&vt(De)}}}}}};addEventListener("keydown",zd),Hn.push(()=>removeEventListener("keydown",zd)),X.on("hover",x=>{if(x>=0&&x!==pi&&Me.tick(),pi=x,Oe.querySelectorAll(".peer[data-lit]").forEach(L=>delete L.dataset.lit),x>=0){let L=Oe.querySelector(`.related .peer[data-memory="${x}"]`);if(L){L.dataset.lit="1";let $=L.closest("ul");L.offsetTop<$.scrollTop?$.scrollTop=L.offsetTop:L.offsetTop+L.offsetHeight>$.scrollTop+$.clientHeight&&($.scrollTop=L.offsetTop+L.offsetHeight-$.clientHeight)}}X.setHover(x),jt(x),i.style.cursor=x>=0?"pointer":""});let Kg=x=>x===S.length?f:x===S.length+1?v:-1;X.on("click",x=>{x>=0&&vt(x<S.length?Pe(x):Kg(x))});let Qg=d.filter(x=>["milestone","book","clone"].includes(x.kind)),kd=d.map(x=>x.kind==="milestone"?S[Te(x.t)].year:{hero:ai.start,book:ai.book,clone:ai.clone}[x.kind]??ai.end);if(r){let x=r.querySelector(".rail-track"),L=r.querySelector(".rail-tip");r.querySelector(".rail-today")?.style.setProperty("--x",`${Ir(o).toFixed(2)}%`),r.querySelectorAll("[data-year]").forEach(it=>it.style.setProperty("--x",`${Ir(+it.dataset.year).toFixed(2)}%`)),r.querySelectorAll("[data-ahead]").forEach(it=>it.style.setProperty("--x",`${Ir(ai[it.dataset.ahead]).toFixed(2)}%`));let $=it=>{let It=x.getBoundingClientRect();return ai.start+Pn((it.clientX-It.left)/It.width,0,1)*(ai.end-ai.start)},be=it=>eg(Qg,it,It=>kd[It.t]),De=it=>`${it.element.querySelector("time")?.textContent??""} \xB7 ${it.element.querySelector("h3, h2")?.textContent??""}`.replace(/^ · /,""),je=!1,sn=-1,gt=it=>{let It=be($(it));return L.textContent=De(It),L.style.setProperty("--x",`${Ir(kd[It.t]).toFixed(2)}%`),L.dataset.on="1",It},yt=it=>{sn=it.t,He(it.kind==="milestone"?Te(it.t):-1)};x.addEventListener("pointerdown",it=>{it.button===0&&(je=!0,x.setPointerCapture(it.pointerId),yt(gt(it)))}),x.addEventListener("pointermove",it=>{let It=gt(it);je&&It.t!==sn&&yt(It)}),x.addEventListener("pointerup",it=>{je&&(je=!1,vt(gt(it).t))});let ht=()=>{je=!1,He(-1)};x.addEventListener("pointercancel",ht),x.addEventListener("lostpointercapture",()=>je&&ht()),x.addEventListener("pointerleave",()=>L.dataset.on="")}et?.addEventListener("click",()=>{if(Fe.running)return Fe.running=!1,qe();Fe.year===null&&(ot!==0&&vt(0),Fe.year=1980),Fe.running=!0,Fe.from=performance.now()/1e3-mp(Fe.year,o),qe()});let e0=()=>{let x=[Oe,a,n,r].filter(Boolean).map($=>$.getBoundingClientRect()),L=bt.hidden?null:bt.getBoundingClientRect();return L&&x.push(L),x};X.on("frame",({formed:x,projected:L,camera:$,cssScale:be,time:De,dt:je,intro:sn,entered:gt,seen:yt})=>{if(le.isConnected){let H=L[ie];le.style.left=`${H.x}px`,le.style.top=`${H.y}px`,le.style.visibility=H.on?"visible":"hidden"}if(Q&&(Number.isFinite(x)&&b.list.forEach((H,Ve)=>{if(he.has(Ve)||x<H.start)return;he.add(Ve);let Rt=S.findIndex(ke=>ke.year>=H.start-.01);Rt>=0&&Me.memory({...S[Rt],period:-1})}),gt&&Ue()),de&&Se.windows<Sr.windows&&sn>=1&&!document.hidden&&(Se.from||(Se.from=De+1),De>=Se.from&&(Se.frames.push(og(je*1e3)),Se.frames.length>=Sr.window))){let H=hg(K,cg(Se.frames));Se.frames=[],Se.windows++,H!==K&&(K=H,X.setQuality(K),i.dataset.quality=String(K))}let ht=performance.now()/1e3,it=!document.hidden&&bt.hidden&&Ei.hidden&&a.dataset.sheet!=="open"&&!Ce&&Fe.year===null&&!fo()&&!document.activeElement?.closest?.("input, textarea, select, button, a, .finder, .card, .masthead, .rail")&&!Oe.matches(":hover"),It=dg(Oc,{now:ht,idleSince:Math.max(Ud,R),eligible:E&&it&&(Oc.phase==="touring"||ot===0),plan:Zg},{wait:+a.dataset.idle||20,hold:+a.dataset.tourHold||6});Oc=It.state,It.open?.age!==void 0?si(It.open.age,{push:!1}):It.open?vt(It.open.ahead==="book"?f:v,{push:!1,hush:!0}):It.done&&vt(0,{push:!1,hush:!0}),Fe.running&&(Fe.year=fp(performance.now()/1e3-Fe.from,o),X.setReveal(Fe.year),r.querySelector(".rail-cursor")?.style.setProperty("--x",`${Ir(Fe.year).toFixed(2)}%`),n.textContent=String(Math.floor(Fe.year)),Fe.year>=o&&(Jt(),n.textContent=d[ot].label));let jn=vi(),Di=X.view.distance/X.homeDistance(),Nn=e0().map(H=>({left:H.left-12,right:H.right+12,top:H.top-12,bottom:H.bottom+12}));Nn.push({left:0,right:innerWidth,top:0,bottom:Math.max(Id,(s?.getBoundingClientRect().bottom??0)+4)},{left:0,right:innerWidth,top:innerHeight-60,bottom:innerHeight});let jr=[],Bc=Ld.matches,Er=!ne.on&&sg(Di,innerWidth,520,!Bc||Oe.getBoundingClientRect().top>=vs.top+vs.height+8),fa=Er?"on":"off";e.dataset.map!==fa&&(e.dataset.map=fa),Bn.hidden===Er&&(Bn.hidden=!Er);let xi=Er?Bn.getBoundingClientRect():null;if(Er&&jn>=0){let H=S[jn].position[2];di++%8===0&&xs.forEach((xt,gn)=>{let $t=X.centerOf(gn),[rt,Kt]=_i.to([$t.x,$t.y]);xt.setAttribute("cx",rt.toFixed(1)),xt.setAttribute("cy",Kt.toFixed(1))}),wn.setAttribute("points",[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([xt,gn])=>_i.to(X.groundAt(xt,gn,H)).map($t=>$t.toFixed(1)).join(",")).join(" "));let Ve=X.centerOf(jn),[Rt,ke]=_i.to([Ve.x,Ve.y]);Mn.setAttribute("cx",Rt.toFixed(1)),Mn.setAttribute("cy",ke.toFixed(1))}xi&&(Nn.push({left:xi.left-8,right:xi.right+8,top:xi.top-8,bottom:xi.bottom+8}),jr.push(xi));let Gd=new Map,Hd=[],zc=[];if(jn>=0&&Fe.year===null&&!Ce){let H=Oe.getBoundingClientRect(),Ve=Ld.matches,Rt={left:Ve?12:H.right+12,right:innerWidth-12,top:Math.max(Id,a.getBoundingClientRect().bottom+6),bottom:Math.min((r?.getBoundingClientRect().top??innerHeight-100)-8,Ve?H.top-8:1/0)},ke=L[jn],xt=Math.min(innerWidth,innerHeight)/2,gn=ke&&ke.x>=Rt.left&&ke.x<=Rt.right&&ke.y>=Rt.top&&ke.y<=Rt.bottom?{left:Math.max(Rt.left,ke.x-xt),right:Math.min(Rt.right,ke.x+xt),top:Math.max(Rt.top,ke.y-xt),bottom:Math.min(Rt.bottom,ke.y+xt)}:Rt;A.slice(0,$S).forEach(rt=>{let Kt=me.map((Qt,qt)=>X.arcScreen(jn,rt,qt/Hg,Qt)),Tt=Jm(Kt,gn),lt=L[rt]?.on&&!hi({left:L[rt].x,right:L[rt].x,top:L[rt].y,bottom:L[rt].y},H);Tt&&!lt&&Hd.push({j:rt,...Tt})});let $t=Hd.slice(0,Wg).map((rt,Kt)=>{let Tt=ce[Kt],lt=`${j[rt.j].title} \xB7 ${j[rt.j].time}`;Tt.label.textContent!==lt&&(Tt.label.textContent=lt,Tt.width=Tt.height=0),Tt.node.hidden=!1,Tt.width||(Tt.width=Tt.node.offsetWidth),Tt.height||(Tt.height=Tt.node.offsetHeight);let Qt=Km(rt,gn);return{mark:Tt,exit:rt,side:Qt,box:Qm(rt,Qt,Tt,gn),shown:!1}});ng($t,gn,4,xi?[{left:xi.left,right:xi.right,top:xi.top,bottom:xi.bottom}]:[]),ce.forEach((rt,Kt)=>{let Tt=$t[Kt];Tt?.shown?rt.keep=YS:rt.keep>0&&rt.held&&(!Tt||Tt.exit.j===rt.held.exit.j)?rt.keep-=je:rt.held=null;let lt=Tt?.shown?Tt:rt.held;rt.held=lt??null,rt.node.hidden=!lt,lt&&(rt.node.style.transform=`translate3d(${lt.box.left.toFixed(1)}px, ${lt.box.top.toFixed(1)}px, 0)`,rt.node.dataset.memory=String(lt.exit.j),rt.node.dataset.side=lt.side,Gd.set(lt.exit.j,lt.exit.t),zc.push(lt.exit.j),jr.push(lt.box),rt.arrow.style.cssText=`left: ${(lt.exit.x-lt.box.left).toFixed(1)}px; top: ${(lt.exit.y-lt.box.top).toFixed(1)}px; --a: ${lt.exit.angle.toFixed(3)}rad`,Nn.push({left:lt.box.left-4,right:lt.box.right+4,top:lt.box.top-4,bottom:lt.box.bottom+4}))})}else ce.forEach(H=>{H.node.hidden=!0,H.held=null});X.setLinkReach(Gd),e.dataset.edges=String(ce.filter(H=>!H.node.hidden).length||"");let Wd=zc.join(",");if(Wd!==fe){fe=Wd;let H=new Set(zc.map(String));Oe.querySelectorAll(".peer[data-memory]").forEach(Ve=>Ve.dataset.out=H.has(Ve.dataset.memory)?"1":"")}let an={x:0,y:0,visible:!1},Yn={x:0,y:0,visible:!1},t0=Ft.filter(H=>H&&H.dim>0).map(H=>{X.project(H.centre,Yn);let[Ve,Rt]=[Yn.x,Yn.y];return X.project(H.world,an),{item:H,x:Ve,y:Rt,r:Math.hypot(an.x-Ve,an.y-Rt)}}),n0=L.slice(S.length).filter(H=>H.on).map(H=>({item:null,x:H.x,y:H.y,r:Math.max(H.r,12)}));Ee.forEach(H=>{let Ve=H.base*(H.year<=x?1:0);if(Fe.year!==null&&H.year>Fe.year&&(Ve=0),Ve*=H.dim??1,X.project(H.world,an),!an.visible)Ve=0;else if(H.width||(H.width=H.node.offsetWidth),H.height||(H.height=H.node.offsetHeight),H.kind==="ahead"){let{width:ke,height:xt}=H,gn=H.spotAt>=0?L[H.spotAt].r:H.ring*be/$.position.distanceTo(H.world),$t=Zm(gn),rt=jS.flatMap(Kt=>JS.map(([Tt,lt])=>{let Qt=$t+Kt,qt=an.x+Tt*Qt-(Tt<0?ke:Tt===0?ke/2:0),Dn=an.y+lt*Qt-(lt<0?xt:lt===0?xt/2:0);return{left:qt,right:qt+ke,top:Dn,bottom:Dn+xt}})).find(Kt=>Kt.left>=12&&Kt.right<=innerWidth-12&&!Nn.some(Tt=>hi(Kt,Tt)));rt?(H.node.style.transform=`translate3d(${rt.left.toFixed(1)}px, ${rt.top.toFixed(1)}px, 0)`,H.node.style.setProperty("--cx",an.x.toFixed(1)),H.node.style.setProperty("--cy",an.y.toFixed(1)),H.node.style.setProperty("--r",Math.min(gn,70).toFixed(1)),Ve>.2&&Nn.push({left:rt.left-4,right:rt.right+4,top:rt.top-4,bottom:rt.bottom+4})):Ve=0}else{if(H.centre){X.project(H.centre,Yn);let $t=Math.atan2(an.y-Yn.y,an.x-Yn.x),rt=Math.hypot(an.x-Yn.x,an.y-Yn.y),Kt=({turn:Gn,scale:En})=>{let[Yr,mi]=[Math.cos($t+Gn*(Math.PI/4)),Math.sin($t+Gn*(Math.PI/4))],$n=Math.abs(Yr)*(H.width/2)+Math.abs(mi)*(H.height/2)+4,wr=Pn(Yn.x+Yr*(rt*En+$n),H.width/2+12,innerWidth-H.width/2-12),Gc=Yn.y+mi*(rt*En+$n);return{x:wr,y:Gc,box:{left:wr-H.width/2,right:wr+H.width/2,top:Gc-H.height/2,bottom:Gc+H.height/2}}},Tt=({box:Gn})=>!Nn.some(En=>hi(Gn,En))&&!jr.some(En=>hi(Gn,En)),lt=Gn=>{let{box:En}=Kt(Gn);return[...t0,...n0].reduce((Yr,mi)=>Yr+Math.max(0,mi.r*.95-Math.hypot(Pn(mi.x,En.left,En.right)-mi.x,Pn(mi.y,En.top,En.bottom)-mi.y))*(mi.item===H?.6:mi.item===null?1.5:1),0)},qt=(H.option&&Tt(Kt(H.option))&&lt(H.option)===0?H.option:null)??(()=>{let Gn=[1,1.5,2.1,2.8].flatMap($n=>[0,1,-1,2,-2,3,-3,4,.5,-.5,1.5,-1.5,2.5,-2.5,3.5,-3.5].map(wr=>({turn:wr,scale:$n}))),En=Gn.filter($n=>Tt(Kt($n))).map($n=>({candidate:$n,cost:lt($n)+($n.scale-1)*18})),Yr=En.reduce(($n,wr)=>wr.cost<$n.cost-.5?wr:$n,{candidate:Gn[0],cost:1/0}),mi=En.find($n=>$n.candidate.turn===H.option?.turn&&$n.candidate.scale===H.option?.scale);return mi&&mi.cost<=Yr.cost+8?mi.candidate:Yr.candidate})();H.option=qt;let Dn=Kt(qt);an.x=Dn.x,an.y=Dn.y;let ut=fd(Dn.box,{x:Yn.x,y:Yn.y,r:rt*2});H.node.dataset.leader=ut&&ut.length>10&&!H.pin?"1":"",ut&&Object.assign(H.leader.style,{left:`${ut.x.toFixed(1)}px`,top:`${ut.y.toFixed(1)}px`,width:`${ut.length.toFixed(1)}px`,transform:`rotate(${ut.angle.toFixed(3)}rad)`});let wi=`${Yn.x.toFixed(0)},${Yn.y.toFixed(0)},${rt.toFixed(0)}`;H.mass!==wi&&(H.mass=wi,H.node.style.setProperty("--cx",Yn.x.toFixed(0)),H.node.style.setProperty("--cy",Yn.y.toFixed(0)),H.node.style.setProperty("--r",rt.toFixed(0)))}if(an.x=Pn(an.x,H.width/2+12,innerWidth-H.width/2-12),H.pin){let $t=H.height+6,rt=[0,1,-1,2,-2,3,-3].map(Kt=>an.y+Kt*$t).find(Kt=>!Nn.some(Tt=>hi({left:an.x-H.width/2,right:an.x+H.width/2,top:Kt-H.height/2,bottom:Kt+H.height/2},Tt)));rt!==void 0&&(an.y=rt)}H.node.style.transform=`translate3d(${an.x.toFixed(1)}px, ${an.y.toFixed(1)}px, 0)`;let ke=H.kind==="ring-year"||H.kind==="countdown-mark"?1:4,xt={left:an.x-H.width/2-ke,right:an.x+H.width/2+ke,top:an.y-H.height/2-ke,bottom:an.y+H.height/2+ke};(H.kind==="ring-year"||H.kind==="countdown-mark")&&Nn.some($t=>hi(xt,$t))&&(Ve=0);let gn={left:xt.left+4,right:xt.right-4,top:xt.top+4,bottom:xt.bottom-4};H.kind==="galaxy"&&!H.pin&&(jr.some($t=>hi(gn,$t))||Nn.some($t=>hi(gn,$t)))&&(Ve=0),Ve>.2&&Nn.push(xt)}let Rt=Math.round(Ve*100)/100;Rt!==H.shown&&(H.shown=Rt,H.node.style.opacity=Rt,H.node.style.visibility=Rt>0?"visible":"hidden")});let i0=d[ot].kind==="hero"&&jn<0&&Vt<0&&Fe.year===null,_o=0;if(Ce&&at.chain.length&&i0){let H=at.chain.map(Ve=>L[Ve]).filter(Ve=>Ve.on);if(H.length){at.width||(at.width=$e.offsetWidth),at.height||(at.height=$e.offsetHeight);let{width:Ve,height:Rt}=at,ke={left:Math.min(...H.map(ut=>ut.x-ut.r)),right:Math.max(...H.map(ut=>ut.x+ut.r)),top:Math.min(...H.map(ut=>ut.y-ut.r)),bottom:Math.max(...H.map(ut=>ut.y+ut.r))},xt=(ke.top+ke.bottom-Rt)/2,gn=[[ke.left,ke.top-ha-Rt],[ke.right-Ve,ke.top-ha-Rt],[ke.left-ha-Ve,xt],[ke.right+ha,xt],[ke.left,ke.bottom+ha],[ke.right-Ve,ke.bottom+ha]],$t=([ut,wi])=>({left:ut,top:wi,right:ut+Ve,bottom:wi+Rt}),rt=H.map(ut=>({left:ut.x-ut.r*.7,right:ut.x+ut.r*.7,top:ut.y-ut.r*.7,bottom:ut.y+ut.r*.7})),Kt=ut=>ut.left>=12&&ut.right<=innerWidth-12&&ut.top>=12&&ut.bottom<=innerHeight-12&&!Nn.some(wi=>hi(ut,wi))&&!rt.some(wi=>hi(ut,wi)),Tt=at.option&&$t(at.option.side>=0?gn[at.option.side]:[ke.left+at.option.dx,ke.top+at.option.dy]),lt=()=>{let ut=[],wi=Math.max(XS,Math.ceil(Math.sqrt((ke.right-ke.left+2*ua)*(ke.bottom-ke.top+2*ua)/qS)));for(let Gn=ke.top-ua;Gn<=ke.bottom+ua-Rt;Gn+=wi)for(let En=ke.left-ua;En<=ke.right+ua-Ve;En+=wi)ut.push([En,Gn]);return ut.sort((Gn,En)=>Math.hypot(Gn[0]-ke.left,Gn[1]+Rt-ke.top)-Math.hypot(En[0]-ke.left,En[1]+Rt-ke.top))},Qt=Tt&&Kt(Tt)?Tt:null,qt=Qt?-1:gn.findIndex(ut=>Kt($t(ut))),Dn=Qt??(qt>=0?$t(gn[qt]):lt().map($t).find(Kt));Qt||(at.option=qt>=0?{side:qt}:Dn?{side:-1,dx:Dn.left-ke.left,dy:Dn.top-ke.top}:null),Dn&&($e.style.transform=`translate3d(${Dn.left.toFixed(1)}px, ${Dn.top.toFixed(1)}px, 0)`,Nn.push({left:Dn.left-8,right:Dn.right+8,top:Dn.top-8,bottom:Dn.bottom+8}),_o=1)}}_o!==at.shown&&(at.shown=_o,$e.dataset.on=_o?"1":"");let r0=innerWidth<=760?8:Di>.8?14:GS,kc=[],Xd=[];L.forEach((H,Ve)=>Ve<S.length&&H.on&&H.r>3&&(Ve===ie||S[Ve].year<=x)&&Xd.push({j:Ve,left:H.x-H.r*.7,right:H.x+H.r*.7,top:H.y-H.r*.7,bottom:H.y+H.r*.7})),Ge.forEach((H,Ve)=>{let Rt=L[Ve],ke=S[Ve],xt=0;Ve===jn?xt=1e3:Ve===pi?xt=900:Ve===Ze?xt=880:Ce?xt=0:ke.weight>=3&&Di<.6?xt=30:ke.weight===2&&Di<.5?xt=20:Di<.22&&(xt=10),jn>=0&&xt<500&&(xt=0),ke.year+3>x&&Ve!==jn&&(xt=0),!E&&yt&&Ve===ie&&(xt=900),Vt>=0&&(xt=Ve===pi||Ve===Ze?900:0),Fe.year!==null&&(xt=ke.year<=Fe.year&&ke.year>Fe.year-2.5?800+ke.weight:0),xt>0&&Rt.on?kc.push({tag:H,spot:Rt,priority:xt,i:Ve}):H.on&&(H.on=!1,H.node.dataset.on="")}),kc.sort((H,Ve)=>Ve.priority-H.priority||H.i-Ve.i);let Vc=[];for(let{tag:H,spot:Ve,priority:Rt,i:ke}of kc){let xt=Rt===900&&ke===pi&&jn<0&&Vt<0&&Di>=.6?"1":"",gn=ke===jn||ke===pi?"1":"";(H.node.dataset.name!==xt||H.node.dataset.hot!==gn)&&(H.glide=H.node.dataset.hot!==gn,H.node.dataset.cool=H.node.dataset.hot==="1"&&!gn?"1":"",H.node.dataset.name=xt,H.node.dataset.hot=gn,H.width=H.height=0),H.width||(H.width=H.node.offsetWidth),H.height||(H.height=H.node.offsetHeight);let $t=Ym(Ve,{width:H.width,height:H.height},innerWidth);if($t.forEach((Qt,qt)=>Qt.slot=qt),Rt>=900){let Qt=Pn(Ve.x-H.width/2,12,innerWidth-H.width-12);$t.splice(8,0,{left:Qt,right:Qt+H.width,top:Ve.y-H.height/2,bottom:Ve.y+H.height/2,far:!1})}let rt=Qt=>Qt.left>=12&&Qt.right<=innerWidth-12,lt=$m($t,{free:Qt=>rt(Qt)&&!Nn.some(qt=>hi(Qt,qt))&&!Vc.some(qt=>hi(Qt,{left:qt.left-6,right:qt.right+6,top:qt.top-4,bottom:qt.bottom+4})),clear:Qt=>!Xd.some(qt=>qt.j!==ke&&hi(Qt,qt)),inside:rt,forced:Rt>=900,keep:H.on?H.slot:-1});if(lt&&!(lt.far&&Rt<900)&&Vc.length<r0){Vc.push(lt);let Qt=H.on&&H.slot!==void 0&&H.slot!==lt.slot;H.slot=lt.slot;let qt=lt.far?fd(lt,Ve):null;qt?(Object.assign(H.leader.style,{left:`${qt.x.toFixed(1)}px`,top:`${qt.y.toFixed(1)}px`,width:`${qt.length.toFixed(1)}px`,transform:`rotate(${qt.angle.toFixed(3)}rad)`}),H.node.dataset.leader="1"):H.node.dataset.leader="",(H.glide||Qt)&&H.on&&H.last&&(H.slide=[H.last.left-lt.left,H.last.top-lt.top]),H.glide=!1,H.last={left:lt.left,top:lt.top};let Dn=Math.exp(-3*je);H.slide=H.slide?H.slide.map(ut=>Math.abs(ut)<.3?0:ut*Dn):[0,0],H.node.style.transform=`translate3d(${(lt.left+H.slide[0]).toFixed(1)}px, ${(lt.top+H.slide[1]).toFixed(1)}px, 0)`,H.node.style.setProperty("--cx",Ve.x.toFixed(1)),H.node.style.setProperty("--cy",Ve.y.toFixed(1)),H.on||(H.on=!0,H.node.dataset.on="1")}else H.on&&(H.on=!1,H.node.dataset.on="")}}),new ResizeObserver(Je).observe(Oe);let Vd=()=>{at.width=at.height=0,X.resize(),An(),nn(),Je(),d[ot].kind==="hero"?X.home():nt(ot)};addEventListener("resize",Vd),addEventListener("themechange",X.applyTheme),Hn.push(()=>{removeEventListener("resize",Vd),removeEventListener("themechange",X.applyTheme)}),X.on("error",x=>{console.error(x),Pc()}),document.documentElement.classList.add("immersive"),document.fonts?.ready.then(()=>{Ge.forEach(x=>(x.width=0,x.height=0)),at.width=at.height=0,An(),nn(),Je()}),a.dataset.ready="1",vt(0,{push:!1}),Fc(),Je()}Yg();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
