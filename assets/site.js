(()=>{document.querySelectorAll("form.waitlist").forEach(i=>{let e=i.querySelector(".status");i.addEventListener("submit",()=>{e.textContent=i.dataset.opened})});var Bc=[1.6,4.2],Id={1:1.1,2:1.6,3:2.2},Pg=51,ar=["threads","people","places"],Dc=[0,1,-1,2,-2],Uc={sigma:1.6,background:.08},br={base:470,cap:12e4,trail:18e3},pi={inner:900,outer:1600,stars:9e3,halo:.015,band:.35,tilt:.6,thickness:.16},Yt={core:4,reach:3.2,gap:12,future:44,twist:2.2,swirl:.9,inner:.22,depth:4,room:3,ahead:[.3,.7],today:.06,sweep:1.9*Math.PI,growth:1.75,rise:26},ca=.25,Lg=i=>/^\d{4}$/.test(i)?"year":/^\d{4}-\d{2}$/.test(i)?"month":null,Dd=(i=Date.now())=>{let e=new Date(i),t=e.getFullYear(),n=Date.UTC(t,e.getMonth(),e.getDate());return t+(n-Date.UTC(t,0,1))/(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))},fo=(i,e=Date.now())=>{let[t,n]=i.split("-").map(Number),r=new Date(e);return(t-r.getFullYear())*12+(n-1-r.getMonth())},mo=(i,e)=>!Number.isFinite(i)||i<0?"":new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(i,"month");var xs=i=>i-1980;function Ng(i){let e=new Map;i.forEach(({date:n})=>e.set(n,(e.get(n)??0)+1));let t=new Map;return i.map(({date:n})=>{let r=Lg(n);if(!r)throw new Error(`date "${n}" is neither YYYY nor YYYY-MM`);let s=+n.slice(0,4),a=t.get(n)??0;t.set(n,a+1);let o=(a+.5)/e.get(n);return r==="month"?s+(+n.slice(5,7)-1+o)/12:s+o})}function Dg(i,e){let t=[];return i.map((n,r)=>{let s=new Set;for(let a=r-1;a>=0&&n-i[a]<=e;a--)s.add(t[a]);return t[r]=Dc.find(a=>!s.has(a))??Dc[r%Dc.length],t[r]})}function Ug(i){return i.map(e=>{let t=i.filter(n=>Math.abs(n-e)<=.6).length;return Math.min(1,1/Math.sqrt(Math.max(1,t/2)))})}var ys=i=>Math.min(1,Math.max(0,i)),Og=(i,e)=>(Math.sqrt(i.inner*i.inner+2*i.spin*e)-i.inner)/i.spin;function vs(i,e,t=0){let n=Og(i,e),r=i.inner+i.spin*n+t;return[r*Math.sin(n)-i.pole[0],r*Math.cos(n)-i.pole[1],-7+Yt.rise*(e/i.length-.5)]}function Fg(i,e,t,n){let r=Array.from({length:t},()=>[]),s=Array.from({length:t},()=>0);i.forEach((v,g)=>{e[g]<0||(r[e[g]].push(v),s[e[g]]+=1)});let a=[];r.forEach((v,g)=>a.push(v.length?Math.min(...v):a[g-1]??1980));let o=s.map(v=>Yt.core+Yt.reach*Math.sqrt(v)),l=o.reduce((v,g)=>v+2*g,0)+Yt.gap*t+Yt.future,c=2*l/(Yt.sweep*(1+Yt.growth)),h={inner:c,spin:c*(Yt.growth-1)/Yt.sweep,length:l,pole:[0,0]},p=0,d=o.map(v=>{let g=p+v;return p+=2*v+Yt.gap,g}),u=[...d.map((v,g)=>[vs(h,v),o[g]]),...Array.from({length:9},(v,g)=>[vs(h,p+Yt.future*g/8),3])],m=[0,1].map(v=>[Math.min(...u.map(([g,_])=>g[v]-_)),Math.max(...u.map(([g,_])=>g[v]+_))]);h.pole=m.map(([v,g])=>(v+g)/2);let f=o.map((v,g)=>{let _=a.slice(g+1).find((O,k)=>r[g+1+k].length&&O>a[g]),M=Math.max(_??Math.max(n,...r[g]),a[g]+1),T=r[g].length,S=r[g].length?Math.max(...r[g])-Math.min(...r[g])+1:1,b=ys(S/12)*(1-.7*ys(s[g]/50)),I={ratio:Fc.stretch?1+Fc.stretch*.9*b:1,angle:(g*Yt.twist+T*.37)%Math.PI};return{start:a[g],end:M,count:T,radius:v,turn:g*Yt.twist,along:d[g],centre:vs(h,d[g]),axis:I}});return{...h,ahead:p,list:f}}var po=(i,e)=>{let t=i.list.findIndex(n=>e<n.end);return t<0?i.list.length-1:t},go=(i,e)=>ys((e-i.start)/(i.end-i.start)),Pd=[1,2,5,10,20,50,100];function Ud(i,e=8){let t=Math.ceil(i.start+1e-9),n=Math.floor(i.end+1e-9),r=a=>Array.from({length:Math.max(0,n-t+1)},(o,l)=>t+l).filter(o=>o%a===0),s=Pd.find(a=>r(a).length<=e)??Pd.at(-1);return r(s).map(a=>({year:a,radius:i.radius*(Yt.inner+(1-Yt.inner)*go(i,a))}))}var Ld=(i,e)=>(po(i,e)+go(i.list[po(i,e)],e))/i.list.length;function Od(i,e){if(e>=1)return 1/0;let t=Math.max(0,e)*i.list.length,n=i.list[Math.min(i.list.length-1,Math.floor(t))];return n.start+(t-Math.floor(t))*(n.end-n.start)}function Fd(i,e,t,n,r=0,s=0){let a=i.arms?.[Math.max(0,e)],o=(a?a.centre:Math.PI*2/Math.max(1,t)*Math.max(0,e))+i.turn+(i.swirl??Yt.swirl)*n+r,l=Math.max(.4,i.radius*(Yt.inner+(1-Yt.inner)*n)+s),[c,h]=Tr(i,l*Math.sin(o),l*Math.cos(o));return[i.centre[0]+c,i.centre[1]+h,i.centre[2]+Yt.depth*(n-.5)]}var Oc=(i,e,t=0)=>vs(i,i.ahead+e*Yt.future,t);function Bg(i,e,t,n,r){let s=r.map(()=>0);t.forEach((u,m)=>{let f=r.indexOf(u.threads?.[0]);n[m]===e&&f>=0&&s[f]++});let a=s.map((u,m)=>[m,u]).filter(([,u])=>u>0),o=a.reduce((u,[,m])=>u+m,0)||1,l=Math.PI*2/Math.max(1,a.length)/4,c=a.map(([,u])=>Math.max(l,Math.PI*2*u/o)),h=Math.PI*2/c.reduce((u,m)=>u+m,0),p=0;i.arms={},a.forEach(([u],m)=>{let f=c[m]*h;i.arms[u]={centre:p+f/2,width:f},p+=f});let d=i.end-i.start;i.swirl=Yt.swirl*(.7+.8*ys(d/14))}function zc(i,e,{periods:t=[],today:n=1980+Pg,threads:r=[]}={}){let s=i.map(l=>t.length?t.indexOf(l.period):0),a=i.find((l,c)=>s[c]<0);if(a)throw new Error(`memory ${a.id}: period "${a.period}" is not one of ${t.join(", ")}`);let o={...Fg(e,s,Math.max(1,t.length),n),periodOf:s};return Fc.arms&&r.length&&o.list.forEach((l,c)=>Bg(l,c,i,s,r)),o}function Bd(i,e={},t={}){let n=Ng(i),r=Ug(n),s=ar.filter(d=>e[d]?.length),a=i.map(d=>Object.fromEntries(s.map(u=>[u,(d[u]??[]).map(m=>e[u].indexOf(m)).filter(m=>m>=0)]))),o=e.threads?.length??0,l=zc(i,n,{...t,threads:e.threads??[]}),c=[],h=new Map;i.forEach((d,u)=>{let m=`${l.periodOf[u]}:${a[u].threads?.[0]??0}`;h.set(m,[...h.get(m)??[],u])});let p=Math.PI*2/Math.max(1,o);return h.forEach(d=>{let u=l.list[l.periodOf[d[0]]],m=(u.end-u.start)/(u.radius*(1-Yt.inner));Dg(d.map(f=>n[f]),Yt.room*m).forEach((f,v)=>{let g=d[v],_=go(u,n[g]),M=u.radius*(Yt.inner+(1-Yt.inner)*_),T=u.arms?.[a[g].threads?.[0]??0]?.width??p,S=Math.max(-.45*T,Math.min(.45*T,f*Yt.room/Math.max(M,2)));c[g]=Fd(u,a[g].threads?.[0]??0,o,_,S)})}),n.map((d,u)=>({id:i[u].id,year:d,position:c[u],spread:(Id[i[u].weight]??Id[1])*r[u],weight:i[u].weight,members:a[u],period:l.periodOf[u],links:i[u].links??[]}))}function zd(i){let[e,t]=Yt.ahead.map(n=>Oc(i,n));return{today:Oc(i,Yt.today),book:e,clone:t}}var Vd=(i,e)=>e.reduce((t,n)=>t+n.weight*Math.exp(-(((i-n.year)/1.6)**2)),0),kd=i=>Math.max(...i.map(e=>Vd(e.year,i)),1e-6);function zg(i,e,t=kd(e)){return Math.min(1,Vd(i,e)/t)}function Vg(i,e,t,n){let r=Math.ceil((n-1980)/ca)+1,s=new Float32Array(r*Math.max(1,t)),a=Math.ceil(Uc.sigma*3/ca);for(let o of i)(o.members[e]??[]).forEach((l,c)=>{let h=(o.year-1980)/ca;for(let p=Math.max(0,Math.floor(h)-a);p<=Math.min(r-1,Math.ceil(h)+a);p++){let d=(p*ca-(o.year-1980))/Uc.sigma;s[p*t+l]+=o.weight*(c===0?1:.5)*Math.exp(-d*d)/3}});return{table:s,count:t,bins:r}}function Gd({table:i,count:e,bins:t},n,r){return Math.min(1,i[Math.min(t-1,Math.max(0,Math.round((n-1980)/ca)))*e+r])}function Nd(i,e,t){let n=Array.from({length:i.count},(s,a)=>Uc.background+Gd(i,e,a)),r=t()*n.reduce((s,a)=>s+a,0);for(let s=0;s<i.count;s++)if((r-=n[s])<=0)return s;return i.count-1}function _o(i,e=pi.inner,t=pi.outer){let n=i()*2-1,r=i()*Math.PI*2,s=e+(t-e)*i(),a=Math.sqrt(1-n*n)*s;return[a*Math.cos(r),a*Math.sin(r),n*s]}function Hd(i){let e=i()*Math.PI*2,t=Mr(i)*pi.thickness,[n,r,s]=[Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t)];return[n,r*Math.cos(pi.tilt)-s*Math.sin(pi.tilt),r*Math.sin(pi.tilt)+s*Math.cos(pi.tilt)]}function Wd({count:i=pi.stars,random:e}){let t={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i),halo:new Float32Array(i)};for(let n=0;n<i;n++){let r=e()<pi.halo,s=r?.8+.2*e():.7*e()**7,a=!r&&e()<pi.band?Hd(e):_o(e,1,1),o=pi.outer-(pi.outer-pi.inner)*s;t.position.set(a.map(l=>l*o),n*3),t.seed[n]=e(),t.bright[n]=s,t.halo[n]=r?1:0,t.size[n]=1+1.2*s}return t}var Fc={stretch:.5,arms:1};function Tr(i,e,t){let n=i.axis;if(!n||n.ratio===1)return[e,t];let[r,s,a]=[Math.cos(n.angle),Math.sin(n.angle),Math.sqrt(n.ratio)],o=(e*r+t*s)*a,l=(-e*s+t*r)/a;return[o*r-l*s,o*s+l*r]}var Vc=["personal","professional","product","education"],jn={deep:{count:16e3,mobile:6e3,alpha:[.1,.8],band:.35,radius:1650,inner:400},far:{count:36,alpha:[.15,.4],radius:[5,14]},haze:{alpha:.08},glow:{max:.15,scale:2.6}},kg=([i,e,t])=>[Math.atan2(e,i)/(2*Math.PI)+.5,Math.acos(Math.max(-1,Math.min(1,t)))/Math.PI];function Xd({count:i=jn.deep.count,random:e,centre:t=[0,0,0],inner:n=jn.deep.inner,outer:r=jn.deep.radius}){let[s,a]=jn.deep.alpha,o={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i)};for(let l=0;l<i;l++){let c=e()<jn.deep.band?Hd(e):_o(e,1,1),h=Math.hypot(...c),p=Math.log(r/(n*(r/n)**e()))/Math.log(r/n),d=r*(n/r)**p;o.position.set(c.map((u,m)=>t[m]+u/h*d),l*3),o.seed[l]=e(),o.bright[l]=Math.min(a,(s+(a-s)*e()**4)*(1+.6*p**3)),o.size[l]=1+1.4*p**4}return o}function qd({count:i=jn.far.count,random:e}){let[t,n]=jn.far.alpha,[r,s]=jn.far.radius;return Array.from({length:i},()=>{let[a,o]=kg(_o(e,1,1));return{u:a,v:o,radius:r+(s-r)*e(),squash:.35+.5*e(),angle:e()*Math.PI,alpha:t+(n-t)*e()}})}function jd(i,e){return{scale:i.radius*jn.glow.scale,strength:jn.glow.max*(.25+.75*(i.count/Math.max(1,e)))}}var Mr=i=>Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i());function Gg(i,{base:e=br.base,cap:t=br.cap}={}){let n=i.reduce((r,s)=>r+s.weight**1.5,0)||1;return Math.min(e,t/n)}function Yd({marks:i,sky:e,today:t,random:n,base:r=br.base,cap:s=br.cap,trail:a=br.trail,facets:o={}}){let l=Gg(i,{base:r,cap:s}),c=T=>Math.max(8,Math.round(l*T.weight**1.5)),h=ar.filter(T=>o[T]?.length),p=i.reduce((T,S)=>T+c(S),0)+a,d={count:p,position:new Float32Array(p*3),center:new Float32Array(p*3),from:new Float32Array(p*3),facet:Object.fromEntries(ar.map(T=>[T,new Float32Array(p).fill(-1)])),u:new Float32Array(p),order:new Float32Array(p),seed:new Float32Array(p),size:new Float32Array(p),ahead:new Float32Array(p),kind:new Float32Array(p),memory:new Float32Array(p),galaxy:new Float32Array(p).fill(-1)},u=(T,S,b,I,O,k,D,j,V)=>{d.position.set(S,T*3),d.center.set(b,T*3),d.from.set(_o(n),T*3),d.u[T]=I,d.order[T]=V,d.seed[T]=n(),d.size[T]=O,d.ahead[T]=k,d.kind[T]=D,d.memory[T]=j},m=0;i.forEach((T,S)=>{for(let b=0,I=c(T);b<I;b++,m++){let O=[Mr(n),Mr(n),Mr(n)*.8],k=T.spread*Math.abs(Mr(n))*.55,D=Math.hypot(...O)||1,j=O.map(V=>V/D*k);u(m,T.position.map((V,Q)=>V+j[Q]),T.position,xs(T.year),.1+n()*.16,0,1,S,Ld(e,T.year)),d.galaxy[m]=T.period;for(let V of h)d.facet[V][m]=T.members[V][0]??-1}});let f=t+Bc[1]+.4,v=Object.fromEntries(h.map(T=>[T,Vg(i,T,o[T].length,f)])),g=o.threads?.length??0,_=Math.PI*2/Math.max(1,g),M=kd(i);for(let T=0;T<a;T++,m++){let S=n()<.06,b=S?t+n()*(f-t):1980+n()*(t-1980),I=v.threads?S?Math.floor(n()*g):Nd(v.threads,b,n):-1,O=I>=0&&!S?Gd(v.threads,b,I):zg(b,i,M),k;if(S)k=Oc(e,n(),Mr(n)*2.4);else{let D=e.list[po(e,b)],j=n()<.14,V=j?n()*.2:go(D,b);k=Fd(D,I,g,V,Mr(n)*(D.arms?.[Math.max(0,I)]?.width??_)*(j?1.2:.14),Mr(n)*(.5+.9*O))}for(let D of h)d.facet[D][m]=D==="threads"?I:S?Math.floor(n()*o[D].length):Nd(v[D],b,n);u(m,k,k,xs(b),.05+n()*.07,S?1:0,0,-1,S?1:Ld(e,b)),d.galaxy[m]=S?-1:po(e,b)}return d}var ni={start:1980,end:2031,book:2027.8,clone:2029.6},$d={seconds:16},Zd=(i,e,t=1980,n=$d.seconds)=>t+(e-t)*ys(i/n),Jd=(i,e,t=1980,n=$d.seconds)=>ys((i-t)/(e-t))*n,Ss=i=>(i-ni.start)/(ni.end-ni.start)*100,Mi={rate:.05,ramp:6,slots:16,near:.2},Hg=i=>Mi.rate*12/(i.radius+12),Wg=i=>i<=0?0:i-Mi.ramp*(1-Math.exp(-i/Mi.ramp)),Kd=(i,e)=>-Hg(i)*Wg(e);var Xg=24;document.querySelectorAll(".countdown[data-until]").forEach(i=>{let e=fo(i.dataset.until);if(!(e>=0)){i.hidden=!0;return}i.querySelector(".remaining").textContent=` \xB7 ${mo(e,document.documentElement.lang)}`,i.querySelector(".scale").style.setProperty("--months",Math.min(e,Xg))});var Dp=0,Sh=1,Up=2;var Ya=1,Op=2,Ys=3,$s=0,Kn=1,Ji=2,Ki=0,Ei=1,mr=2,Mh=3,bh=4,Fp=5;var Zs=100,Bp=101,zp=102,Vp=103,kp=104,Gp=200,Hp=201,Wp=202,Xp=203,qp=204,jp=205,Yp=206,$p=207,Zp=208,Jp=209,Kp=210,Qp=211,ef=212,tf=213,nf=214,Th=0,Eh=1,wh=2,Wl=3,Ah=4,Rh=5,Ch=6,Ih=7,rf=0,sf=1,af=2,Oi=0,Ph=1,Lh=2,Nh=3,Dh=4,Uh=5,Oh=6,Fh=7;var Js=301,rs=302,Xl=303,ql=304,$a=306,jl=1e3,Yl=1001,of=1002,Fi=1003,lf=1004;var Za=1005;var Qn=1006,$l=1007;var ss=1008;var Bi=1009,cf=1010,hf=1011,Ja=1012,Bh=1013,Br=1014,wi=1015,Qi=1016,zh=1017,Vh=1018,Ks=1020,uf=35902,df=35899,pf=1021,ff=1022,er=1023,as=1026,os=1027,Ka=1028,kh=1029,ls=1030,Gh=1031;var Hh=1033,Zl=33776,Jl=33777,Kl=33778,Ql=33779,Wh=35840,Xh=35841,qh=35842,jh=35843,Yh=36196,$h=37492,Zh=37496,Jh=37488,Kh=37489,ec=37490,Qh=37491,eu=37808,tu=37809,nu=37810,iu=37811,ru=37812,su=37813,au=37814,ou=37815,lu=37816,cu=37817,hu=37818,uu=37819,du=37820,pu=37821,fu=36492,mu=36494,gu=36495,_u=36283,vu=36284,tc=36285,xu=36286;var yu=0,mf=1,cs="",Su="srgb",nc="srgb-linear",Mu="linear",en="srgb";var gf=512,_f=513,vf=514,ic=515,xf=516,yf=517,rc=518,Sf=519;var sc=35048;var bu="300 es",Tu=2e3;function qg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function jg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Sa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Mf(){let i=Sa("canvas");return i.style.display="block",i}var Qd={},Bs=null;function Ma(...i){let e="THREE."+i.shift();Bs?Bs("log",e,...i):console.log(e,...i)}function bf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function et(...i){let e="THREE."+(i=bf(i)).shift();if(Bs)Bs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function rt(...i){let e="THREE."+(i=bf(i)).shift();if(Bs)Bs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Jr(...i){let e=i.join(" ");e in Qd||(Qd[e]=!0,et(...i))}function Tf(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Ef={[Th]:1,[wh]:6,[Ah]:7,[Wl]:5,[Eh]:0,[Ch]:2,[Ih]:4,[Rh]:3},Yi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var $o=Math.PI/180,Zo=180/Math.PI;function pr(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Yn[255&i]+Yn[i>>8&255]+Yn[i>>16&255]+Yn[i>>24&255]+"-"+Yn[255&e]+Yn[e>>8&255]+"-"+Yn[e>>16&15|64]+Yn[e>>24&255]+"-"+Yn[63&t|128]+Yn[t>>8&255]+"-"+Yn[t>>16&255]+Yn[t>>24&255]+Yn[255&n]+Yn[n>>8&255]+Yn[n>>16&255]+Yn[n>>24&255]).toLowerCase()}function Mt(i,e,t){return Math.max(e,Math.min(t,i))}function Yg(i,e){return(i%e+e)%e}function kc(i,e,t){return(1-t)*i+t*e}function Xi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $t(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:case Uint8ClampedArray:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Cu=class Cu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Cu.prototype.isVector2=!0;var fe=Cu,Ti=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],p=n[r+3],d=s[a+0],u=s[a+1],m=s[a+2],f=s[a+3];if(p!==f||l!==d||c!==u||h!==m){let v=l*d+c*u+h*m+p*f;v<0&&(d=-d,u=-u,m=-m,f=-f,v=-v);let g=1-o;if(v<.9995){let _=Math.acos(v),M=Math.sin(_);g=Math.sin(g*_)/M,l=l*g+d*(o=Math.sin(o*_)/M),c=c*g+u*o,h=h*g+m*o,p=p*g+f*o}else{l=l*g+d*o,c=c*g+u*o,h=h*g+m*o,p=p*g+f*o;let _=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=_,c*=_,h*=_,p*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],p=s[a],d=s[a+1],u=s[a+2],m=s[a+3];return e[t]=o*m+h*p+l*u-c*d,e[t+1]=l*m+h*d+c*p-o*u,e[t+2]=c*m+h*u+o*d-l*p,e[t+3]=h*m-o*p-l*d-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),p=o(s/2),d=l(n/2),u=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=d*h*p+c*u*m,this._y=c*u*p-d*h*m,this._z=c*h*m+d*u*p,this._w=c*h*p-d*u*m;break;case"YXZ":this._x=d*h*p+c*u*m,this._y=c*u*p-d*h*m,this._z=c*h*m-d*u*p,this._w=c*h*p+d*u*m;break;case"ZXY":this._x=d*h*p-c*u*m,this._y=c*u*p+d*h*m,this._z=c*h*m+d*u*p,this._w=c*h*p-d*u*m;break;case"ZYX":this._x=d*h*p-c*u*m,this._y=c*u*p+d*h*m,this._z=c*h*m-d*u*p,this._w=c*h*p+d*u*m;break;case"YZX":this._x=d*h*p+c*u*m,this._y=c*u*p+d*h*m,this._z=c*h*m-d*u*p,this._w=c*h*p-d*u*m;break;case"XZY":this._x=d*h*p-c*u*m,this._y=c*u*p-d*h*m,this._z=c*h*m+d*u*p,this._w=c*h*p+d*u*m;break;default:et("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],p=t[10],d=n+o+p;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-l)*u,this._y=(s-c)*u,this._z=(a-r)*u}else if(n>o&&n>p){let u=2*Math.sqrt(1+n-o-p);this._w=(h-l)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+c)/u}else if(o>p){let u=2*Math.sqrt(1+o-n-p);this._w=(s-c)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+p-n-o);this._w=(a-r)/u,this._x=(s+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Iu=class Iu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ep.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ep.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),p=2*(s*n-a*t);return this.x=t+l*c+a*p-o*h,this.y=n+l*h+o*c-s*p,this.z=r+l*p+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Gc.copy(this).projectOnVector(e),this.sub(Gc)}reflect(e){return this.sub(Gc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Iu.prototype.isVector3=!0;var P=Iu,Gc=new P,ep=new Ti,Pu=class Pu{constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],p=n[7],d=n[2],u=n[5],m=n[8],f=r[0],v=r[3],g=r[6],_=r[1],M=r[4],T=r[7],S=r[2],b=r[5],I=r[8];return s[0]=a*f+o*_+l*S,s[3]=a*v+o*M+l*b,s[6]=a*g+o*T+l*I,s[1]=c*f+h*_+p*S,s[4]=c*v+h*M+p*b,s[7]=c*g+h*T+p*I,s[2]=d*f+u*_+m*S,s[5]=d*v+u*M+m*b,s[8]=d*g+u*T+m*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],p=h*a-o*c,d=o*l-h*s,u=c*s-a*l,m=t*p+n*d+r*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let f=1/m;return e[0]=p*f,e[1]=(r*c-h*n)*f,e[2]=(o*n-r*a)*f,e[3]=d*f,e[4]=(h*t-r*l)*f,e[5]=(r*s-o*t)*f,e[6]=u*f,e[7]=(n*l-c*t)*f,e[8]=(a*t-n*s)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Jr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Hc.makeScale(e,t)),this}rotate(e){return Jr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Hc.makeRotation(-e)),this}translate(e,t){return Jr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Hc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Pu.prototype.isMatrix3=!0;var ct=Pu,Hc=new ct,tp=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),np=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $g(){let i={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer==="srgb"&&(r.r=fr(r.r),r.g=fr(r.g),r.b=fr(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer==="srgb"&&(r.r=Fs(r.r),r.g=Fs(r.g),r.b=Fs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?"linear":this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Jr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Jr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[nc]:{primaries:e,whitePoint:n,transfer:"linear",toXYZ:tp,fromXYZ:np,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},[Su]:{primaries:e,whitePoint:n,transfer:"srgb",toXYZ:tp,fromXYZ:np,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),i}var Ct=$g();function fr(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Fs(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var Ms,Jo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ms===void 0&&(Ms=Sa("canvas")),Ms.width=e.width,Ms.height=e.height;let r=Ms.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Sa("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*fr(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*fr(t[n]/255)):t[n]=fr(t[n]);return{data:t,width:e.width,height:e.height}}return et("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Zg=0,zs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=pr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Wc(r[a].image)):s.push(Wc(r[a]))}else s=Wc(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Wc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(et("Texture: Unable to serialize Texture."),{})}var Jg=0,Xc=new P,ri=class i extends Yi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,l=1009,c=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=pr(),this.name="",this.source=new zs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Xc).x}get height(){return this.source.getSize(Xc).y}get depth(){return this.source.getSize(Xc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){et(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:et(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ri.DEFAULT_IMAGE=null,ri.DEFAULT_MAPPING=300,ri.DEFAULT_ANISOTROPY=1;var Lu=class Lu{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],p=l[8],d=l[1],u=l[5],m=l[9],f=l[2],v=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(p-f)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+f)<.1&&Math.abs(m+v)<.1&&Math.abs(c+u+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,T=(u+1)/2,S=(g+1)/2,b=(h+d)/4,I=(p+f)/4,O=(m+v)/4;return M>T&&M>S?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=b/n,s=I/n):T>S?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=b/r,s=O/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=I/s,r=O/s),this.set(n,r,s,t),this}let _=Math.sqrt((v-m)*(v-m)+(p-f)*(p-f)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(v-m)/_,this.y=(p-f)/_,this.z=(d-h)/_,this.w=Math.acos((c+u+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this.w=Mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this.w=Mt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Lu.prototype.isVector4=!0;var Qt=Lu,Ko=class extends Yi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Qt(0,0,e,t),this.scissorTest=!1,this.viewport=new Qt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new ri(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new zs(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ci=class extends Ko{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ba=class extends ri{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qo=class extends ri{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Hl=class Hl{constructor(e,t,n,r,s,a,o,l,c,h,p,d,u,m,f,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,p,d,u,m,f,v)}set(e,t,n,r,s,a,o,l,c,h,p,d,u,m,f,v){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=p,g[14]=d,g[3]=u,g[7]=m,g[11]=f,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Hl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/bs.setFromMatrixColumn(e,0).length(),s=1/bs.setFromMatrixColumn(e,1).length(),a=1/bs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=l*h,t[4]=-l*p,t[8]=c,t[1]=u+m*c,t[5]=d-f*c,t[9]=-o*l,t[2]=f-d*c,t[6]=m+u*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,u=l*p,m=c*h,f=c*p;t[0]=d+f*o,t[4]=m*o-u,t[8]=a*c,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=u*o-m,t[6]=f+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,u=l*p,m=c*h,f=c*p;t[0]=d-f*o,t[4]=-a*p,t[8]=m+u*o,t[1]=u+m*o,t[5]=a*h,t[9]=f-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=l*h,t[4]=m*c-u,t[8]=d*c+f,t[1]=l*p,t[5]=f*c+d,t[9]=u*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,u=a*c,m=o*l,f=o*c;t[0]=l*h,t[4]=f-d*p,t[8]=m*p+u,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=u*p+m,t[10]=d-f*p}else if(e.order==="XZY"){let d=a*l,u=a*c,m=o*l,f=o*c;t[0]=l*h,t[4]=-p,t[8]=c*h,t[1]=d*p+f,t[5]=a*h,t[9]=u*p-m,t[2]=m*p-u,t[6]=o*h,t[10]=f*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kg,e,Qg)}lookAt(e,t,n){let r=this.elements;return fi.subVectors(e,t),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),Er.crossVectors(n,fi),Er.lengthSq()===0&&(Math.abs(n.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),Er.crossVectors(n,fi)),Er.normalize(),vo.crossVectors(fi,Er),r[0]=Er.x,r[4]=vo.x,r[8]=fi.x,r[1]=Er.y,r[5]=vo.y,r[9]=fi.y,r[2]=Er.z,r[6]=vo.z,r[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],p=n[5],d=n[9],u=n[13],m=n[2],f=n[6],v=n[10],g=n[14],_=n[3],M=n[7],T=n[11],S=n[15],b=r[0],I=r[4],O=r[8],k=r[12],D=r[1],j=r[5],V=r[9],Q=r[13],ae=r[2],ie=r[6],ne=r[10],N=r[14],J=r[3],ce=r[7],Oe=r[11],xe=r[15];return s[0]=a*b+o*D+l*ae+c*J,s[4]=a*I+o*j+l*ie+c*ce,s[8]=a*O+o*V+l*ne+c*Oe,s[12]=a*k+o*Q+l*N+c*xe,s[1]=h*b+p*D+d*ae+u*J,s[5]=h*I+p*j+d*ie+u*ce,s[9]=h*O+p*V+d*ne+u*Oe,s[13]=h*k+p*Q+d*N+u*xe,s[2]=m*b+f*D+v*ae+g*J,s[6]=m*I+f*j+v*ie+g*ce,s[10]=m*O+f*V+v*ne+g*Oe,s[14]=m*k+f*Q+v*N+g*xe,s[3]=_*b+M*D+T*ae+S*J,s[7]=_*I+M*j+T*ie+S*ce,s[11]=_*O+M*V+T*ne+S*Oe,s[15]=_*k+M*Q+T*N+S*xe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],p=e[6],d=e[10],u=e[14],m=e[3],f=e[7],v=e[11],g=e[15],_=l*u-c*d,M=o*u-c*p,T=o*d-l*p,S=a*u-c*h,b=a*d-l*h,I=a*p-o*h;return t*(f*_-v*M+g*T)-n*(m*_-v*S+g*b)+r*(m*M-f*S+g*I)-s*(m*T-f*b+v*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(s*h-o*l)+r*(s*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],p=e[9],d=e[10],u=e[11],m=e[12],f=e[13],v=e[14],g=e[15],_=t*o-n*a,M=t*l-r*a,T=t*c-s*a,S=n*l-r*o,b=n*c-s*o,I=r*c-s*l,O=h*f-p*m,k=h*v-d*m,D=h*g-u*m,j=p*v-d*f,V=p*g-u*f,Q=d*g-u*v,ae=_*Q-M*V+T*j+S*D-b*k+I*O;if(ae===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let ie=1/ae;return e[0]=(o*Q-l*V+c*j)*ie,e[1]=(r*V-n*Q-s*j)*ie,e[2]=(f*I-v*b+g*S)*ie,e[3]=(d*b-p*I-u*S)*ie,e[4]=(l*D-a*Q-c*k)*ie,e[5]=(t*Q-r*D+s*k)*ie,e[6]=(v*T-m*I-g*M)*ie,e[7]=(h*I-d*T+u*M)*ie,e[8]=(a*V-o*D+c*O)*ie,e[9]=(n*D-t*V-s*O)*ie,e[10]=(m*b-f*T+g*_)*ie,e[11]=(p*T-h*b-u*_)*ie,e[12]=(o*k-a*j-l*O)*ie,e[13]=(t*j-n*k+r*O)*ie,e[14]=(f*M-m*S-v*_)*ie,e[15]=(h*S-p*M+d*_)*ie,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,p=o+o,d=s*c,u=s*h,m=s*p,f=a*h,v=a*p,g=o*p,_=l*c,M=l*h,T=l*p,S=n.x,b=n.y,I=n.z;return r[0]=(1-(f+g))*S,r[1]=(u+T)*S,r[2]=(m-M)*S,r[3]=0,r[4]=(u-T)*b,r[5]=(1-(d+g))*b,r[6]=(v+_)*b,r[7]=0,r[8]=(m+M)*I,r[9]=(v-_)*I,r[10]=(1-(d+f))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=bs.set(r[0],r[1],r[2]).length(),o=bs.set(r[4],r[5],r[6]).length(),l=bs.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Ii.copy(this);let c=1/a,h=1/o,p=1/l;return Ii.elements[0]*=c,Ii.elements[1]*=c,Ii.elements[2]*=c,Ii.elements[4]*=h,Ii.elements[5]*=h,Ii.elements[6]*=h,Ii.elements[8]*=p,Ii.elements[9]*=p,Ii.elements[10]*=p,t.setFromRotationMatrix(Ii),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2*s/(t-e),p=2*s/(n-r),d=(t+e)/(t-e),u=(n+r)/(n-r),m,f;if(l)m=s/(a-s),f=a*s/(a-s);else if(o===2e3)m=-(a+s)/(a-s),f=-2*a*s/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),f=-a*s/(a-s)}return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=p,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=f,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2/(t-e),p=2/(n-r),d=-(t+e)/(t-e),u=-(n+r)/(n-r),m,f;if(l)m=1/(a-s),f=a/(a-s);else if(o===2e3)m=-2/(a-s),f=-(a+s)/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),f=-s/(a-s)}return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=p,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=m,c[14]=f,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Hl.prototype.isMatrix4=!0;var vt=Hl,bs=new P,Ii=new vt,Kg=new P(0,0,0),Qg=new P(1,1,1),Er=new P,vo=new P,fi=new P,ip=new vt,rp=new Ti,Lr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],p=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Mt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:et("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ip.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ip,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rp.setFromEuler(this),this.setFromQuaternion(rp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Lr.DEFAULT_ORDER="XYZ";var Ta=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},e0=0,sp=new P,Ts=new Ti,or=new vt,xo=new P,ha=new P,t0=new P,n0=new Ti,ap=new P(1,0,0),op=new P(0,1,0),lp=new P(0,0,1),cp={type:"added"},i0={type:"removed"},Es={type:"childadded",child:null},qc={type:"childremoved",child:null},si=class i extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:e0++}),this.uuid=pr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new Lr,n=new Ti,r=new P(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new ct}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ta,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.multiply(Ts),this}rotateOnWorldAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.premultiply(Ts),this}rotateX(e){return this.rotateOnAxis(ap,e)}rotateY(e){return this.rotateOnAxis(op,e)}rotateZ(e){return this.rotateOnAxis(lp,e)}translateOnAxis(e,t){return sp.copy(e).applyQuaternion(this.quaternion),this.position.add(sp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ap,e)}translateY(e){return this.translateOnAxis(op,e)}translateZ(e){return this.translateOnAxis(lp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(or.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xo.copy(e):xo.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ha.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?or.lookAt(ha,xo,this.up):or.lookAt(xo,ha,this.up),this.quaternion.setFromRotationMatrix(or),r&&(or.extractRotation(r.matrixWorld),Ts.setFromRotationMatrix(or),this.quaternion.premultiply(Ts.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cp),Es.child=e,this.dispatchEvent(Es),Es.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(i0),qc.child=e,this.dispatchEvent(qc),qc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),or.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),or.multiply(e.parent.matrixWorld)),e.applyMatrix4(or),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cp),Es.child=e,this.dispatchEvent(Es),Es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ha,e,t0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ha,n0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),p=a(e.shapes),d=a(e.skeletons),u=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};si.DEFAULT_UP=new P(0,1,0),si.DEFAULT_MATRIX_AUTO_UPDATE=!0,si.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var dr=class extends si{constructor(){super(),this.isGroup=!0,this.type="Group"}},r0={type:"move"},Vs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let f of e.hand.values()){let v=t.getJointPose(f,n),g=this._getHandJoint(c,f);v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=v.radius),g.visible=v!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],d=h.position.distanceTo(p.position),u=.02,m=.005;c.inputState.pinching&&d>u+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=u-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(r0)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new dr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wr={h:0,s:0,l:0},yo={h:0,s:0,l:0};function jc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var ft=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Ct.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ct.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ct.workingColorSpace){if(e=Yg(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=jc(a,s,e+1/3),this.g=jc(a,s,e),this.b=jc(a,s,e-1/3)}return Ct.colorSpaceToWorking(this,r),this}setStyle(e,t="srgb"){function n(s){s!==void 0&&parseFloat(s)<1&&et("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:et("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);et("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=wf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):et("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fr(e.r),this.g=fr(e.g),this.b=fr(e.b),this}copyLinearToSRGB(e){return this.r=Fs(e.r),this.g=Fs(e.g),this.b=Fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return Ct.workingToColorSpace($n.copy(this),e),65536*Math.round(Mt(255*$n.r,0,255))+256*Math.round(Mt(255*$n.g,0,255))+Math.round(Mt(255*$n.b,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ct.workingColorSpace){Ct.workingToColorSpace($n.copy(this),t);let n=$n.r,r=$n.g,s=$n.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let p=a-o;switch(c=h<=.5?p/(a+o):p/(2-a-o),a){case n:l=(r-s)/p+(r<s?6:0);break;case r:l=(s-n)/p+2;break;case s:l=(n-r)/p+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ct.workingColorSpace){return Ct.workingToColorSpace($n.copy(this),t),e.r=$n.r,e.g=$n.g,e.b=$n.b,e}getStyle(e="srgb"){Ct.workingToColorSpace($n.copy(this),e);let t=$n.r,n=$n.g,r=$n.b;return e!=="srgb"?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(wr),this.setHSL(wr.h+e,wr.s+t,wr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(wr),e.getHSL(yo);let n=kc(wr.h,yo.h,t),r=kc(wr.s,yo.s,t),s=kc(wr.l,yo.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$n=new ft;ft.NAMES=wf;var Ea=class extends si{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Lr,this.environmentIntensity=1,this.environmentRotation=new Lr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Pi=new P,lr=new P,Yc=new P,cr=new P,ws=new P,As=new P,hp=new P,$c=new P,Zc=new P,Jc=new P,Kc=new Qt,Qc=new Qt,eh=new Qt,qi=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Pi.subVectors(e,t),r.cross(Pi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Pi.subVectors(r,t),lr.subVectors(n,t),Yc.subVectors(e,t);let a=Pi.dot(Pi),o=Pi.dot(lr),l=Pi.dot(Yc),c=lr.dot(lr),h=lr.dot(Yc),p=a*c-o*o;if(p===0)return s.set(0,0,0),null;let d=1/p,u=(c*l-o*h)*d,m=(a*h-o*l)*d;return s.set(1-u-m,m,u)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,cr)!==null&&cr.x>=0&&cr.y>=0&&cr.x+cr.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,cr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,cr.x),l.addScaledVector(a,cr.y),l.addScaledVector(o,cr.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Kc.setScalar(0),Qc.setScalar(0),eh.setScalar(0),Kc.fromBufferAttribute(e,t),Qc.fromBufferAttribute(e,n),eh.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Kc,s.x),a.addScaledVector(Qc,s.y),a.addScaledVector(eh,s.z),a}static isFrontFacing(e,t,n,r){return Pi.subVectors(n,t),lr.subVectors(e,t),Pi.cross(lr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pi.subVectors(this.c,this.b),lr.subVectors(this.a,this.b),.5*Pi.cross(lr).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;ws.subVectors(r,n),As.subVectors(s,n),$c.subVectors(e,n);let l=ws.dot($c),c=As.dot($c);if(l<=0&&c<=0)return t.copy(n);Zc.subVectors(e,r);let h=ws.dot(Zc),p=As.dot(Zc);if(h>=0&&p<=h)return t.copy(r);let d=l*p-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ws,a);Jc.subVectors(e,s);let u=ws.dot(Jc),m=As.dot(Jc);if(m>=0&&u<=m)return t.copy(s);let f=u*c-l*m;if(f<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(As,o);let v=h*m-u*p;if(v<=0&&p-h>=0&&u-m>=0)return hp.subVectors(s,r),o=(p-h)/(p-h+(u-m)),t.copy(r).addScaledVector(hp,o);let g=1/(v+f+d);return a=f*g,o=d*g,t.copy(n).addScaledVector(ws,a).addScaledVector(As,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Di=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Li):Li.fromBufferAttribute(s,a),Li.applyMatrix4(e.matrixWorld),this.expandByPoint(Li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),So.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),So.copy(n.boundingBox)),So.applyMatrix4(e.matrixWorld),this.union(So)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Li),Li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ua),Mo.subVectors(this.max,ua),Rs.subVectors(e.a,ua),Cs.subVectors(e.b,ua),Is.subVectors(e.c,ua),Ar.subVectors(Cs,Rs),Rr.subVectors(Is,Cs),jr.subVectors(Rs,Is);let t=[0,-Ar.z,Ar.y,0,-Rr.z,Rr.y,0,-jr.z,jr.y,Ar.z,0,-Ar.x,Rr.z,0,-Rr.x,jr.z,0,-jr.x,-Ar.y,Ar.x,0,-Rr.y,Rr.x,0,-jr.y,jr.x,0];return!!th(t,Rs,Cs,Is,Mo)&&(t=[1,0,0,0,1,0,0,0,1],!!th(t,Rs,Cs,Is,Mo)&&(bo.crossVectors(Ar,Rr),t=[bo.x,bo.y,bo.z],th(t,Rs,Cs,Is,Mo)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Li).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(hr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},hr=[new P,new P,new P,new P,new P,new P,new P,new P],Li=new P,So=new Di,Rs=new P,Cs=new P,Is=new P,Ar=new P,Rr=new P,jr=new P,ua=new P,Mo=new P,bo=new P,Yr=new P;function th(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Yr.fromArray(i,s);let o=r.x*Math.abs(Yr.x)+r.y*Math.abs(Yr.y)+r.z*Math.abs(Yr.z),l=e.dot(Yr),c=t.dot(Yr),h=n.dot(Yr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var TS=s0();function s0(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,r[l]=24,r[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,r[l]=-c-1,r[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,r[l]=13,r[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,r[l]=24,r[256|l]=24):(n[l]=31744,n[256|l]=64512,r[l]=13,r[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var wn=new P,To=new fe,a0=0,Pt=class extends Yi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:a0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)To.fromBufferAttribute(this,t),To.applyMatrix3(e),this.setXY(t,To.x,To.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix3(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),r=$t(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),r=$t(r,this.array),s=$t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var wa=class extends Pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Aa=class extends Pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ke=class extends Pt{constructor(e,t,n){super(new Float32Array(e),t,n)}},o0=new Di,da=new P,nh=new P,Ui=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):o0.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;da.subVectors(e,this.center);let t=da.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(da,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(nh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(da.copy(e.center).add(nh)),this.expandByPoint(da.copy(e.center).sub(nh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},l0=0,bi=new vt,ih=new si,Ps=new P,mi=new Di,pa=new Di,On=new P,Et=class i extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:l0++}),this.uuid=pr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qg(e)?Aa:wa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ct().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return bi.makeRotationFromQuaternion(e),this.applyMatrix4(bi),this}rotateX(e){return bi.makeRotationX(e),this.applyMatrix4(bi),this}rotateY(e){return bi.makeRotationY(e),this.applyMatrix4(bi),this}rotateZ(e){return bi.makeRotationZ(e),this.applyMatrix4(bi),this}translate(e,t,n){return bi.makeTranslation(e,t,n),this.applyMatrix4(bi),this}scale(e,t,n){return bi.makeScale(e,t,n),this.applyMatrix4(bi),this}lookAt(e){return ih.lookAt(e),ih.updateMatrix(),this.applyMatrix4(ih.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ke(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&et("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];mi.setFromBufferAttribute(s),this.morphTargetsRelative?(On.addVectors(this.boundingBox.min,mi.min),this.boundingBox.expandByPoint(On),On.addVectors(this.boundingBox.max,mi.max),this.boundingBox.expandByPoint(On)):(this.boundingBox.expandByPoint(mi.min),this.boundingBox.expandByPoint(mi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ui);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new P,1/0);if(e){let n=this.boundingSphere.center;if(mi.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];pa.setFromBufferAttribute(o),this.morphTargetsRelative?(On.addVectors(mi.min,pa.min),mi.expandByPoint(On),On.addVectors(mi.max,pa.max),mi.expandByPoint(On)):(mi.expandByPoint(pa.min),mi.expandByPoint(pa.max))}mi.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)On.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(On));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)On.fromBufferAttribute(o,c),l&&(Ps.fromBufferAttribute(e,c),On.add(Ps)),r=Math.max(r,n.distanceToSquared(On))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");a!==void 0&&a.count===n.count||(a=new Pt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let O=0;O<n.count;O++)o[O]=new P,l[O]=new P;let c=new P,h=new P,p=new P,d=new fe,u=new fe,m=new fe,f=new P,v=new P;function g(O,k,D){c.fromBufferAttribute(n,O),h.fromBufferAttribute(n,k),p.fromBufferAttribute(n,D),d.fromBufferAttribute(s,O),u.fromBufferAttribute(s,k),m.fromBufferAttribute(s,D),h.sub(c),p.sub(c),u.sub(d),m.sub(d);let j=1/(u.x*m.y-m.x*u.y);isFinite(j)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-u.y).multiplyScalar(j),v.copy(p).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(j),o[O].add(f),o[k].add(f),o[D].add(f),l[O].add(v),l[k].add(v),l[D].add(v))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let O=0,k=_.length;O<k;++O){let D=_[O],j=D.start;for(let V=j,Q=j+D.count;V<Q;V+=3)g(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let M=new P,T=new P,S=new P,b=new P;function I(O){S.fromBufferAttribute(r,O),b.copy(S);let k=o[O];M.copy(k),M.sub(S.multiplyScalar(S.dot(k))).normalize(),T.crossVectors(b,k);let D=T.dot(l[O])<0?-1:1;a.setXYZW(O,M.x,M.y,M.z,D)}for(let O=0,k=_.length;O<k;++O){let D=_[O],j=D.start;for(let V=j,Q=j+D.count;V<Q;V+=3)I(e.getX(V+0)),I(e.getX(V+1)),I(e.getX(V+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Pt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let r=new P,s=new P,a=new P,o=new P,l=new P,c=new P,h=new P,p=new P;if(e)for(let d=0,u=e.count;d<u;d+=3){let m=e.getX(d+0),f=e.getX(d+1),v=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,f),a.fromBufferAttribute(t,v),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,f),c.fromBufferAttribute(n,v),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(f,l.x,l.y,l.z),n.setXYZ(v,c.x,c.y,c.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)On.fromBufferAttribute(e,t),On.normalize(),e.setXYZ(t,On.x,On.y,On.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,p=o.normalized,d=new c.constructor(l.length*h),u=0,m=0;for(let f=0,v=l.length;f<v;f++){u=o.isInterleavedBufferAttribute?l[f]*o.data.stride+o.offset:l[f]*h;for(let g=0;g<h;g++)d[m++]=c[u++]}return new Pt(d,h,p)}if(this.index===null)return et("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=e(r[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,p=c.length;h<p;h++){let d=e(c[h],n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,d=c.length;p<d;p++){let u=c[p];h.push(u.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],p=s[c];for(let d=0,u=p.length;d<u;d++)h.push(p[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},el=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=pr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},ii=new P,Ra=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ii.fromBufferAttribute(this,t),ii.applyMatrix4(e),this.setXYZ(t,ii.x,ii.y,ii.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ii.fromBufferAttribute(this,t),ii.applyNormalMatrix(e),this.setXYZ(t,ii.x,ii.y,ii.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ii.fromBufferAttribute(this,t),ii.transformDirection(e),this.setXYZ(t,ii.x,ii.y,ii.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$t(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=$t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=$t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=$t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=$t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Xi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Xi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Xi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Xi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),r=$t(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),r=$t(r,this.array),s=$t(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Ma("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Pt(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ma("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},rh=new P,c0=new P,h0=new ct,Ni=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=rh.subVectors(n,t).cross(c0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(rh),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||h0.getNormalMatrix(e),r=this.coplanarPoint(rh).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ls,u0=0,$i=class extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=pr(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ft(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){et(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:et(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ft().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Ni().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new fe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new fe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ks=class extends $i{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},fa=new P,Ns=new P,Ds=new P,Us=new fe,ma=new fe,Af=new vt,Eo=new P,ga=new P,wo=new P,up=new fe,sh=new fe,dp=new fe,Ca=class extends si{constructor(e=new ks){if(super(),this.isSprite=!0,this.type="Sprite",Ls===void 0){Ls=new Et;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new el(t,5);Ls.setIndex([0,1,2,0,2,3]),Ls.setAttribute("position",new Ra(n,3,0,!1)),Ls.setAttribute("uv",new Ra(n,2,3,!1))}this.geometry=Ls,this.material=e,this.center=new fe(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&rt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ns.setFromMatrixScale(this.matrixWorld),Af.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ds.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ns.multiplyScalar(-Ds.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;Ao(Eo.set(-.5,-.5,0),Ds,a,Ns,r,s),Ao(ga.set(.5,-.5,0),Ds,a,Ns,r,s),Ao(wo.set(.5,.5,0),Ds,a,Ns,r,s),up.set(0,0),sh.set(1,0),dp.set(1,1);let o=e.ray.intersectTriangle(Eo,ga,wo,!1,fa);if(o===null&&(Ao(ga.set(-.5,.5,0),Ds,a,Ns,r,s),sh.set(0,1),o=e.ray.intersectTriangle(Eo,wo,ga,!1,fa),o===null))return;let l=e.ray.origin.distanceTo(fa);l<e.near||l>e.far||t.push({distance:l,point:fa.clone(),uv:qi.getInterpolation(fa,Eo,ga,wo,up,sh,dp,new fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ao(i,e,t,n,r,s){Us.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(ma.x=s*Us.x-r*Us.y,ma.y=r*Us.x+s*Us.y):ma.copy(Us),i.copy(e),i.x+=ma.x,i.y+=ma.y,i.applyMatrix4(Af)}var ES=new P,wS=new P;var ur=new P,ah=new P,Ro=new P,Co=new P,Kr=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ur)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ur.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ur.copy(this.origin).addScaledVector(this.direction,t),ur.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ah.copy(e).add(t).multiplyScalar(.5),Ro.copy(t).sub(e).normalize(),Co.copy(this.origin).sub(ah);let s=.5*e.distanceTo(t),a=-this.direction.dot(Ro),o=Co.dot(this.direction),l=-Co.dot(Ro),c=Co.lengthSq(),h=Math.abs(1-a*a),p,d,u,m;if(h>0)if(p=a*l-o,d=a*o-l,m=s*h,p>=0)if(d>=-m)if(d<=m){let f=1/h;p*=f,d*=f,u=p*(p+a*d+2*o)+d*(a*p+d+2*l)+c}else d=s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*l)+c;else d=-s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*l)+c;else d<=-m?(p=Math.max(0,-(-a*s+o)),d=p>0?-s:Math.min(Math.max(-s,-l),s),u=-p*p+d*(d+2*l)+c):d<=m?(p=0,d=Math.min(Math.max(-s,-l),s),u=d*(d+2*l)+c):(p=Math.max(0,-(a*s+o)),d=p>0?s:Math.min(Math.max(-s,-l),s),u=-p*p+d*(d+2*l)+c);else d=a>0?-s:s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(ah).addScaledVector(Ro,d),u}intersectSphere(e,t){if(e.radius<0)return null;ur.subVectors(e.center,this.origin);let n=ur.dot(this.direction),r=ur.dot(ur)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-d.z)*p,l=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,l=(e.min.z-d.z)*p),n>l||o>r?null:((o>n||n!=n)&&(n=o),(l<r||r!=r)&&(r=l),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,ur)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,p=e.x-a.x,d=e.y-a.y,u=e.z-a.z,m=t.x-a.x,f=t.y-a.y,v=t.z-a.z,g=n.x-a.x,_=n.y-a.y,M=n.z-a.z,T=Math.abs(l),S=Math.abs(c),b=Math.abs(h),I,O,k,D,j,V,Q,ae,ie,ne,N,J;if(T>=S&&T>=b?(k=l,V=p,ie=m,J=g,l>=0?(I=c,O=h,D=d,j=u,Q=f,ae=v,ne=_,N=M):(I=h,O=c,D=u,j=d,Q=v,ae=f,ne=M,N=_)):S>=b?(k=c,V=d,ie=f,J=_,c>=0?(I=h,O=l,D=u,j=p,Q=v,ae=m,ne=M,N=g):(I=l,O=h,D=p,j=u,Q=m,ae=v,ne=g,N=M)):(k=h,V=u,ie=v,J=M,h>=0?(I=l,O=c,D=p,j=d,Q=m,ae=f,ne=g,N=_):(I=c,O=l,D=d,j=p,Q=f,ae=m,ne=_,N=g)),k===0)return null;let ce=I/k,Oe=O/k,xe=D-ce*V,Be=j-Oe*V,we=Q-ce*ie,ue=ae-Oe*ie,X=ne-ce*J,te=N-Oe*J,le=X*ue-te*we,he=xe*te-Be*X,w=we*Be-ue*xe;if(r){if(le<0||he<0||w<0)return null}else if((le<0||he<0||w<0)&&(le>0||he>0||w>0))return null;let E=le+he+w;if(E===0)return null;let C=1/k*(le*V+he*ie+w*J);return(E>0?C<0:C>0)?null:this.at(C/E,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ia=class extends $i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Lr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},pp=new vt,$r=new Kr,Io=new Ui,fp=new P,Po=new P,Lo=new P,No=new P,oh=new P,Do=new P,mp=new P,Uo=new P,Jn=class extends si{constructor(e=new Et,t=new Ia){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Do.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],p=s[l];h!==0&&(oh.fromBufferAttribute(p,e),a?Do.addScaledVector(oh,h):Do.addScaledVector(oh.sub(t),h))}t.add(Do)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(s),$r.copy(e.ray).recast(e.near),Io.containsPoint($r.origin)===!1&&($r.intersectSphere(Io,fp)===null||$r.origin.distanceToSquared(fp)>(e.far-e.near)**2))return;pp.copy(s).invert(),$r.copy(e.ray).applyMatrix4(pp),n.boundingBox!==null&&$r.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,$r)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),M=Math.min(o.count,Math.min(v.start+v.count,u.start+u.count));_<M;_+=3)r=Oo(this,g,e,n,c,h,p,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(o.count,u.start+u.count);m<f;m+=3)r=Oo(this,a,e,n,c,h,p,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(l!==void 0)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),M=Math.min(l.count,Math.min(v.start+v.count,u.start+u.count));_<M;_+=3)r=Oo(this,g,e,n,c,h,p,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(l.count,u.start+u.count);m<f;m+=3)r=Oo(this,a,e,n,c,h,p,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};function d0(i,e,t,n,r,s,a,o){let l;if(l=e.side===1?n.intersectTriangle(a,s,r,!0,o):n.intersectTriangle(r,s,a,e.side===0,o),l===null)return null;Uo.copy(o),Uo.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Uo);return c<t.near||c>t.far?null:{distance:c,point:Uo.clone(),object:i}}function Oo(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Po),i.getVertexPosition(l,Lo),i.getVertexPosition(c,No);let h=d0(i,e,t,n,Po,Lo,No,mp);if(h){let p=new P;qi.getBarycoord(mp,Po,Lo,No,p),r&&(h.uv=qi.getInterpolatedAttribute(r,o,l,c,p,new fe)),s&&(h.uv1=qi.getInterpolatedAttribute(s,o,l,c,p,new fe)),a&&(h.normal=qi.getInterpolatedAttribute(a,o,l,c,p,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new P,materialIndex:0};qi.getNormal(Po,Lo,No,d.normal),h.face=d,h.barycoord=p}return h}var AS=new Qt,RS=new Qt,CS=new Qt,IS=new Qt,PS=new vt,LS=new P,NS=new Ui,DS=new vt,US=new Kr;var Qr=class extends ri{constructor(e=null,t=1,n=1,r,s,a,o,l,c=1003,h=1003,p,d){super(null,a,o,l,c,h,r,s,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},OS=new vt,FS=new vt;var BS=new vt,zS=new vt;var VS=new Di,kS=new vt,GS=new Jn,HS=new Ui;var Zr=new Ui,p0=new fe(.5,.5),Fo=new P,Nr=class{constructor(e=new Ni,t=new Ni,n=new Ni,r=new Ni,s=new Ni,a=new Ni){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],p=s[5],d=s[6],u=s[7],m=s[8],f=s[9],v=s[10],g=s[11],_=s[12],M=s[13],T=s[14],S=s[15];if(r[0].setComponents(c-a,u-h,g-m,S-_).normalize(),r[1].setComponents(c+a,u+h,g+m,S+_).normalize(),r[2].setComponents(c+o,u+p,g+f,S+M).normalize(),r[3].setComponents(c-o,u-p,g-f,S-M).normalize(),n)r[4].setComponents(l,d,v,T).normalize(),r[5].setComponents(c-l,u-d,g-v,S-T).normalize();else if(r[4].setComponents(c-l,u-d,g-v,S-T).normalize(),t===2e3)r[5].setComponents(c+l,u+d,g+v,S+T).normalize();else{if(t!==2001)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(l,d,v,T).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zr)}intersectsSprite(e){Zr.center.set(0,0,0);let t=p0.distanceTo(e.center);return Zr.radius=.7071067811865476+t,Zr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Fo.x=r.normal.x>0?e.max.x:e.min.x,Fo.y=r.normal.y>0?e.max.y:e.min.y,Fo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Fo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},gp=new vt,tl=class i{constructor(){this.coordinateSystem=2e3,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];gp.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new Nr),n[r].setFromProjectionMatrix(gp,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Nr),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new i().copy(this)}};var fh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},WS=new vt,XS=new ft(1,1,1),qS=new Nr,jS=new tl,YS=new Di,$S=new Ui,ZS=new P,JS=new P,KS=new P,QS=new fh,eM=new Jn;var es=class extends $i{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},nl=new P,il=new P,_p=new vt,_a=new Kr,Bo=new Ui,lh=new P,vp=new P,rl=class extends si{constructor(e=new Et,t=new es){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)nl.fromBufferAttribute(t,r-1),il.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=nl.distanceTo(il);e.setAttribute("lineDistance",new Ke(n,1))}else et("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bo.copy(n.boundingSphere),Bo.applyMatrix4(r),Bo.radius+=s,e.ray.intersectsSphere(Bo)===!1)return;_p.copy(r).invert(),_a.copy(e.ray).applyMatrix4(_p);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),u=Math.min(h.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=c){let v=h.getX(m),g=h.getX(m+1),_=zo(this,e,_a,l,v,g,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(u-1),f=h.getX(d),v=zo(this,e,_a,l,m,f,u-1);v&&t.push(v)}}else{let d=Math.max(0,a.start),u=Math.min(p.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=c){let v=zo(this,e,_a,l,m,m+1,m);v&&t.push(v)}if(this.isLineLoop){let m=zo(this,e,_a,l,u-1,d,u-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function zo(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(nl.fromBufferAttribute(o,r),il.fromBufferAttribute(o,s),t.distanceSqToSegment(nl,il,lh,vp)>n)return;lh.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(lh);return l<e.near||l>e.far?void 0:{distance:l,point:vp.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var xp=new P,yp=new P,ts=class extends rl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)xp.fromBufferAttribute(t,r),yp.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+xp.distanceTo(yp);e.setAttribute("lineDistance",new Ke(n,1))}else et("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Gs=class extends $i{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Sp=new vt,mh=new Kr,Vo=new Ui,ko=new P,Zi=class extends si{constructor(e=new Et,t=new Gs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(r),Vo.radius+=s,e.ray.intersectsSphere(Vo)===!1)return;Sp.copy(r).invert(),mh.copy(e.ray).applyMatrix4(Sp);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null)for(let p=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);p<d;p++){let u=c.getX(p);ko.fromBufferAttribute(h,u),Mp(ko,u,l,r,e,t,this)}else for(let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);p<d;p++)ko.fromBufferAttribute(h,p),Mp(ko,p,l,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Mp(i,e,t,n,r,s,a){let o=mh.distanceSqToPoint(i);if(o<t){let l=new P;mh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Pa=class extends ri{constructor(e=[],t=301,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dr=class extends ri{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ur=class extends ri{constructor(e,t,n=1014,r,s,a,o=1003,l=1003,c,h=1026,p=1){if(h!==1026&&h!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:p},r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},sl=class extends Ur{constructor(e,t=1014,n=301,r,s,a=1003,o=1003,l,c=1026){let h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},La=class extends ri{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ns=class i extends Et{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],p=[],d=0,u=0;function m(f,v,g,_,M,T,S,b,I,O,k){let D=T/I,j=S/O,V=T/2,Q=S/2,ae=b/2,ie=I+1,ne=O+1,N=0,J=0,ce=new P;for(let Oe=0;Oe<ne;Oe++){let xe=Oe*j-Q;for(let Be=0;Be<ie;Be++){let we=Be*D-V;ce[f]=we*_,ce[v]=xe*M,ce[g]=ae,c.push(ce.x,ce.y,ce.z),ce[f]=0,ce[v]=0,ce[g]=b>0?1:-1,h.push(ce.x,ce.y,ce.z),p.push(Be/I),p.push(1-Oe/O),N+=1}}for(let Oe=0;Oe<O;Oe++)for(let xe=0;xe<I;xe++){let Be=d+xe+ie*Oe,we=d+xe+ie*(Oe+1),ue=d+(xe+1)+ie*(Oe+1),X=d+(xe+1)+ie*Oe;l.push(Be,we,X),l.push(we,ue,X),J+=6}o.addGroup(u,J,k),u+=J,d+=N}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},al=class i extends Et{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],l=[],c=[],h=t/2,p=Math.PI/2*e,d=t,u=2*p+d,m=2*n+s,f=r+1,v=new P,g=new P;for(let _=0;_<=m;_++){let M=0,T=0,S=0,b=0;if(_<=n){let k=_/n,D=k*Math.PI/2;T=-h-e*Math.cos(D),S=e*Math.sin(D),b=-e*Math.cos(D),M=k*p}else if(_<=n+s){let k=(_-n)/s;T=k*t-h,S=e,b=0,M=p+k*d}else{let k=(_-n-s)/n,D=k*Math.PI/2;T=h+e*Math.sin(D),S=e*Math.cos(D),b=e*Math.sin(D),M=p+d+k*p}let I=Math.max(0,Math.min(1,M/u)),O=0;_===0?O=.5/r:_===m&&(O=-.5/r);for(let k=0;k<=r;k++){let D=k/r,j=D*Math.PI*2,V=Math.sin(j),Q=Math.cos(j);g.x=-S*Q,g.y=T,g.z=S*V,o.push(g.x,g.y,g.z),v.set(-S*Q,b,S*V),v.normalize(),l.push(v.x,v.y,v.z),c.push(D+O,I)}if(_>0){let k=(_-1)*f;for(let D=0;D<r;D++){let j=k+D,V=k+D+1,Q=_*f+D,ae=_*f+D+1;a.push(j,V,Q),a.push(V,ae,Q)}}}this.setIndex(a),this.setAttribute("position",new Ke(o,3)),this.setAttribute("normal",new Ke(l,3)),this.setAttribute("uv",new Ke(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},ol=class i extends Et{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new P,h=new fe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let p=0,d=3;p<=t;p++,d+=3){let u=n+p/t*r;c.x=e*Math.cos(u),c.y=e*Math.sin(u),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let p=1;p<=t;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new Ke(a,3)),this.setAttribute("normal",new Ke(o,3)),this.setAttribute("uv",new Ke(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Na=class i extends Et{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],p=[],d=[],u=[],m=0,f=[],v=n/2,g=0;function _(M){let T=m,S=new fe,b=new P,I=0,O=M===!0?e:t,k=M===!0?1:-1;for(let j=1;j<=r;j++)p.push(0,v*k,0),d.push(0,k,0),u.push(.5,.5),m++;let D=m;for(let j=0;j<=r;j++){let V=j/r*l+o,Q=Math.cos(V),ae=Math.sin(V);b.x=O*ae,b.y=v*k,b.z=O*Q,p.push(b.x,b.y,b.z),d.push(0,k,0),S.x=.5*Q+.5,S.y=.5*ae*k+.5,u.push(S.x,S.y),m++}for(let j=0;j<r;j++){let V=T+j,Q=D+j;M===!0?h.push(Q,Q+1,V):h.push(Q+1,Q,V),I+=3}c.addGroup(g,I,M===!0?1:2),g+=I}(function(){let M=new P,T=new P,S=0,b=(t-e)/n;for(let I=0;I<=s;I++){let O=[],k=I/s,D=k*(t-e)+e;for(let j=0;j<=r;j++){let V=j/r,Q=V*l+o,ae=Math.sin(Q),ie=Math.cos(Q);T.x=D*ae,T.y=-k*n+v,T.z=D*ie,p.push(T.x,T.y,T.z),M.set(ae,b,ie).normalize(),d.push(M.x,M.y,M.z),u.push(V,1-k),O.push(m++)}f.push(O)}for(let I=0;I<r;I++)for(let O=0;O<s;O++){let k=f[O][I],D=f[O+1][I],j=f[O+1][I+1],V=f[O][I+1];(e>0||O!==0)&&(h.push(k,D,V),S+=3),(t>0||O!==s-1)&&(h.push(D,j,V),S+=3)}c.addGroup(g,S,0),g+=S})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ke(p,3)),this.setAttribute("normal",new Ke(d,3)),this.setAttribute("uv",new Ke(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ll=class i extends Na{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Or=class i extends Et{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(u,m,f,v){let g=v+1,_=[];for(let M=0;M<=g;M++){_[M]=[];let T=u.clone().lerp(f,M/g),S=m.clone().lerp(f,M/g),b=g-M;for(let I=0;I<=b;I++)_[M][I]=I===0&&M===g?T:T.clone().lerp(S,I/b)}for(let M=0;M<g;M++)for(let T=0;T<2*(g-M)-1;T++){let S=Math.floor(T/2);T%2==0?(l(_[M][S+1]),l(_[M+1][S]),l(_[M][S])):(l(_[M][S+1]),l(_[M+1][S+1]),l(_[M+1][S]))}}function l(u){s.push(u.x,u.y,u.z)}function c(u,m){let f=3*u;m.x=e[f+0],m.y=e[f+1],m.z=e[f+2]}function h(u,m,f,v){v<0&&u.x===1&&(a[m]=u.x-1),f.x===0&&f.z===0&&(a[m]=v/2/Math.PI+.5)}function p(u){return Math.atan2(u.z,-u.x)}function d(u){return Math.atan2(-u.y,Math.sqrt(u.x*u.x+u.z*u.z))}(function(u){let m=new P,f=new P,v=new P;for(let g=0;g<t.length;g+=3)c(t[g+0],m),c(t[g+1],f),c(t[g+2],v),o(m,f,v,u)})(r),(function(u){let m=new P;for(let f=0;f<s.length;f+=3)m.x=s[f+0],m.y=s[f+1],m.z=s[f+2],m.normalize().multiplyScalar(u),s[f+0]=m.x,s[f+1]=m.y,s[f+2]=m.z})(n),(function(){let u=new P;for(let m=0;m<s.length;m+=3){u.x=s[m+0],u.y=s[m+1],u.z=s[m+2];let f=p(u)/2/Math.PI+.5,v=d(u)/Math.PI+.5;a.push(f,1-v)}(function(){let m=new P,f=new P,v=new P,g=new P,_=new fe,M=new fe,T=new fe;for(let S=0,b=0;S<s.length;S+=9,b+=6){m.set(s[S+0],s[S+1],s[S+2]),f.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),_.set(a[b+0],a[b+1]),M.set(a[b+2],a[b+3]),T.set(a[b+4],a[b+5]),g.copy(m).add(f).add(v).divideScalar(3);let I=p(g);h(_,b+0,m,I),h(M,b+2,f,I),h(T,b+4,v,I)}})(),(function(){for(let m=0;m<a.length;m+=6){let f=a[m+0],v=a[m+2],g=a[m+4],_=Math.max(f,v,g),M=Math.min(f,v,g);_>.9&&M<.1&&(f<.2&&(a[m+0]+=1),v<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new Ke(s,3)),this.setAttribute("normal",new Ke(s.slice(),3)),this.setAttribute("uv",new Ke(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},cl=class i extends Or{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Go=new P,Ho=new P,ch=new P,Wo=new qi,hl=class extends Et{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos($o*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],p=new Array(3),d={},u=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:f,b:v,c:g}=Wo;if(f.fromBufferAttribute(o,c[0]),v.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),Wo.getNormal(ch),p[0]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,p[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,p[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,p[0]!==p[1]&&p[1]!==p[2]&&p[2]!==p[0])for(let _=0;_<3;_++){let M=(_+1)%3,T=p[_],S=p[M],b=Wo[h[_]],I=Wo[h[M]],O=`${T}_${S}`,k=`${S}_${T}`;k in d&&d[k]?(ch.dot(d[k].normal)<=s&&(u.push(b.x,b.y,b.z),u.push(I.x,I.y,I.z)),d[k]=null):O in d||(d[O]={index0:c[_],index1:c[M],normal:ch.clone()})}}for(let m in d)if(d[m]){let{index0:f,index1:v}=d[m];Go.fromBufferAttribute(o,f),Ho.fromBufferAttribute(o,v),u.push(Go.x,Go.y,Go.z),u.push(Ho.x,Ho.y,Ho.z)}this.setAttribute("position",new Ke(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},_i=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){et("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(r=Math.floor(l+(c-l)/2),o=n[r]-a,o<0)l=r+1;else{if(!(o>0)){c=r;break}c=r-1}if(r=c,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new fe:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,r=[],s=[],a=[],o=new P,l=new vt;for(let u=0;u<=e;u++){let m=u/e;r[u]=this.getTangentAt(m,new P)}s[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),p=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),p<=c&&(c=p,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Mt(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(l.makeRotationAxis(o,m))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(Mt(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],u*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Hs=class extends _i{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new fe){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=l-this.aX,u=c-this.aY;l=d*h-u*p+this.aX,c=d*p+u*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ul=class extends Hs{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Eu(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,p){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+p)+(l-o)/p;d*=h,u*=h,r(a,o,d,u)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var bp=new P,Tp=new P,hh=new Eu,uh=new Eu,dh=new Eu,dl=class extends _i{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new P){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=r[(c-1)%s]:(Tp.subVectors(r[0],r[1]).add(r[0]),o=Tp);let p=r[c%s],d=r[(c+1)%s];if(this.closed||c+2<s?l=r[(c+2)%s]:(bp.subVectors(r[s-1],r[s-2]).add(r[s-1]),l=bp),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(p),u),f=Math.pow(p.distanceToSquared(d),u),v=Math.pow(d.distanceToSquared(l),u);f<1e-4&&(f=1),m<1e-4&&(m=f),v<1e-4&&(v=f),hh.initNonuniformCatmullRom(o.x,p.x,d.x,l.x,m,f,v),uh.initNonuniformCatmullRom(o.y,p.y,d.y,l.y,m,f,v),dh.initNonuniformCatmullRom(o.z,p.z,d.z,l.z,m,f,v)}else this.curveType==="catmullrom"&&(hh.initCatmullRom(o.x,p.x,d.x,l.x,this.tension),uh.initCatmullRom(o.y,p.y,d.y,l.y,this.tension),dh.initCatmullRom(o.z,p.z,d.z,l.z,this.tension));return n.set(hh.calc(h),uh.calc(h),dh.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new P().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ep(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function f0(i,e){let t=1-i;return t*t*e}function m0(i,e){return 2*(1-i)*i*e}function g0(i,e){return i*i*e}function xa(i,e,t,n){return f0(i,e)+m0(i,t)+g0(i,n)}function _0(i,e){let t=1-i;return t*t*t*e}function v0(i,e){let t=1-i;return 3*t*t*i*e}function x0(i,e){return 3*(1-i)*i*i*e}function y0(i,e){return i*i*i*e}function ya(i,e,t,n,r){return _0(i,e)+v0(i,t)+x0(i,n)+y0(i,r)}var Da=class extends _i{constructor(e=new fe,t=new fe,n=new fe,r=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new fe){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ya(e,r.x,s.x,a.x,o.x),ya(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},pl=class extends _i{constructor(e=new P,t=new P,n=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ya(e,r.x,s.x,a.x,o.x),ya(e,r.y,s.y,a.y,o.y),ya(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ua=class extends _i{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fl=class extends _i{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oa=class extends _i{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(xa(e,r.x,s.x,a.x),xa(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fa=class extends _i{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(xa(e,r.x,s.x,a.x),xa(e,r.y,s.y,a.y),xa(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ba=class extends _i{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return n.set(Ep(o,l.x,c.x,h.x,p.x),Ep(o,l.y,c.y,h.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new fe().fromArray(r))}return this}},ml=Object.freeze({__proto__:null,ArcCurve:ul,CatmullRomCurve3:dl,CubicBezierCurve:Da,CubicBezierCurve3:pl,EllipseCurve:Hs,LineCurve:Ua,LineCurve3:fl,QuadraticBezierCurve:Oa,QuadraticBezierCurve3:Fa,SplineCurve:Ba}),gl=class extends _i{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ml[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new ml[r.type]().fromJSON(r))}return this}},za=class extends gl{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ua(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Oa(this.currentPoint.clone(),new fe(e,t),new fe(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new Da(this.currentPoint.clone(),new fe(e,t),new fe(n,r),new fe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ba(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new Hs(e,t,n,r,s,a,o,l);if(this.curves.length>0){let p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Va=class extends za{constructor(e){super(e),this.uuid=pr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new za().fromJSON(r))}return this}};function S0(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Rf(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=w0(i,e,s,t)),i.length>80*t){o=i[0],l=i[1];let h=o,p=l;for(let d=t;d<r;d+=t){let u=i[d],m=i[d+1];u<o&&(o=u),m<l&&(l=m),u>h&&(h=u),m>p&&(p=m)}c=Math.max(h-o,p-l),c=c!==0?32767/c:0}return ka(s,a,t,o,l,c,0),a}function Rf(i,e,t,n,r){let s;if(r===F0(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=wp(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=wp(a/n|0,i[a],i[a+1],s);return s&&Ws(s,s.next)&&(Ha(s),s=s.next),s}function is(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!Ws(n,n.next)&&vn(n.prev,n,n.next)!==0)n=n.next;else{if(Ha(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function ka(i,e,t,n,r,s,a){if(!i)return;!a&&s&&P0(i,n,r,s);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(s?b0(i,n,r,s):M0(i))e.push(l.i,i.i,c.i),Ha(i),i=c.next,o=c.next;else if((i=c)===o){a?a===1?ka(i=T0(is(i),e),e,t,n,r,s,2):a===2&&E0(i,e,t,n,r,s):ka(is(i),e,t,n,r,s,1);break}}}function M0(i){let e=i.prev,t=i,n=i.next;if(vn(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(r,s,a),p=Math.min(o,l,c),d=Math.max(r,s,a),u=Math.max(o,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=p&&m.y<=u&&va(r,o,s,l,a,c,m.x,m.y)&&vn(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function b0(i,e,t,n){let r=i.prev,s=i,a=i.next;if(vn(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,p=s.y,d=a.y,u=Math.min(o,l,c),m=Math.min(h,p,d),f=Math.max(o,l,c),v=Math.max(h,p,d),g=gh(u,m,e,t,n),_=gh(f,v,e,t,n),M=i.prevZ,T=i.nextZ;for(;M&&M.z>=g&&T&&T.z<=_;){if(M.x>=u&&M.x<=f&&M.y>=m&&M.y<=v&&M!==r&&M!==a&&va(o,h,l,p,c,d,M.x,M.y)&&vn(M.prev,M,M.next)>=0||(M=M.prevZ,T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&va(o,h,l,p,c,d,T.x,T.y)&&vn(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;M&&M.z>=g;){if(M.x>=u&&M.x<=f&&M.y>=m&&M.y<=v&&M!==r&&M!==a&&va(o,h,l,p,c,d,M.x,M.y)&&vn(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;T&&T.z<=_;){if(T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&va(o,h,l,p,c,d,T.x,T.y)&&vn(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function T0(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Ws(n,r)&&If(n,t,t.next,r)&&Ga(n,r)&&Ga(r,n)&&(e.push(n.i,t.i,r.i),Ha(t),Ha(t.next),t=i=r),t=t.next}while(t!==i);return is(t)}function E0(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&D0(a,o)){let l=Pf(a,o);return a=is(a,a.next),l=is(l,l.next),ka(a,e,t,n,r,s,0),void ka(l,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function w0(i,e,t,n){let r=[];for(let s=0,a=e.length;s<a;s++){let o=Rf(i,e[s]*n,s<a-1?e[s+1]*n:i.length,n,!1);o===o.next&&(o.steiner=!0),r.push(N0(o))}r.sort(A0);for(let s=0;s<r.length;s++)t=R0(r[s],t);return t}function A0(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function R0(i,e){let t=C0(i,e);if(!t)return e;let n=Pf(t,i);return is(n,n.next),is(t,t.next)}function C0(i,e){let t=e,n=i.x,r=i.y,s,a=-1/0;if(Ws(i,t))return t;do{if(Ws(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let p=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>a&&(a=p,s=t.x<t.next.x?t:t.next,p===n))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,l=s.x,c=s.y,h=1/0;t=s;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Cf(r<c?n:a,r,l,c,r<c?a:n,r,t.x,t.y)){let p=Math.abs(r-t.y)/(n-t.x);Ga(t,i)&&(p<h||p===h&&(t.x>s.x||t.x===s.x&&I0(s,t)))&&(s=t,h=p)}t=t.next}while(t!==o);return s}function I0(i,e){return vn(i.prev,i,e.prev)<0&&vn(e.next,i,i.next)<0}function P0(i,e,t,n){let r=i;do r.z===0&&(r.z=gh(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,L0(r)}function L0(i){let e,t=1;do{let n,r=i;i=null;let s=null;for(e=0;r;){e++;let a=r,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||r.z<=a.z)?(n=r,r=r.nextZ,o--):(n=a,a=a.nextZ,l--),s?s.nextZ=n:i=n,n.prevZ=s,s=n;r=a}s.nextZ=null,t*=2}while(e>1);return i}function gh(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function N0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Cf(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function va(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Cf(i,e,t,n,r,s,a,o)}function D0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!U0(i,e)&&(Ga(i,e)&&Ga(e,i)&&O0(i,e)&&(vn(i.prev,i,e.prev)||vn(i,e.prev,e))||Ws(i,e)&&vn(i.prev,i,i.next)>0&&vn(e.prev,e,e.next)>0)}function vn(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ws(i,e){return i.x===e.x&&i.y===e.y}function If(i,e,t,n){let r=qo(vn(i,e,t)),s=qo(vn(i,e,n)),a=qo(vn(t,n,i)),o=qo(vn(t,n,e));return r!==s&&a!==o||!(r!==0||!Xo(i,t,e))||!(s!==0||!Xo(i,n,e))||!(a!==0||!Xo(t,i,n))||!(o!==0||!Xo(t,e,n))}function Xo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function qo(i){return i>0?1:i<0?-1:0}function U0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&If(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ga(i,e){return vn(i.prev,i,i.next)<0?vn(i,e,i.next)>=0&&vn(i,i.prev,e)>=0:vn(i,e,i.prev)<0||vn(i,i.next,e)<0}function O0(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Pf(i,e){let t=_h(i.i,i.x,i.y),n=_h(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function wp(i,e,t,n){let r=_h(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Ha(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function _h(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function F0(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var vh=class{static triangulate(e,t,n=2){return S0(e,t,n)}},ji=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Ap(e),Rp(n,e);let a=e.length;t.forEach(Ap);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Rp(n,t[l]);let o=vh.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function Ap(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Rp(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var _l=class i extends Et{constructor(e=new Va([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:u-.1,f=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:B0,M,T,S,b,I,O=!1;if(g){M=g.getSpacedPoints(h),O=!0,d=!1;let C=!!g.isCatmullRomCurve3&&g.closed;T=g.computeFrenetFrames(h,C),S=new P,b=new P,I=new P}d||(v=0,u=0,m=0,f=0);let k=o.extractPoints(c),D=k.shape,j=k.holes;if(!ji.isClockWise(D)){D=D.reverse();for(let C=0,U=j.length;C<U;C++){let y=j[C];ji.isClockWise(y)&&(j[C]=y.reverse())}}function V(C){let U=10000000000000001e-36,y=C[0];for(let z=1;z<=C.length;z++){let F=z%C.length,R=C[F],q=R.x-y.x,Y=R.y-y.y,K=q*q+Y*Y,de=Math.max(Math.abs(R.x),Math.abs(R.y),Math.abs(y.x),Math.abs(y.y));K<=U*de*de?(C.splice(F,1),z--):y=R}}V(D),j.forEach(V);let Q=j.length,ae=D;for(let C=0;C<Q;C++){let U=j[C];D=D.concat(U)}function ie(C,U,y){return U||rt("ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(U,y)}let ne=D.length;function N(C,U,y){let z,F,R,q=C.x-U.x,Y=C.y-U.y,K=y.x-C.x,de=y.y-C.y,Te=q*q+Y*Y,De=q*de-Y*K;if(Math.abs(De)>Number.EPSILON){let _e=Math.sqrt(Te),Ve=Math.sqrt(K*K+de*de),oe=U.x-Y/_e,pe=U.y+q/_e,me=((y.x-de/Ve-oe)*de-(y.y+K/Ve-pe)*K)/(q*de-Y*K);z=oe+q*me-C.x,F=pe+Y*me-C.y;let Le=z*z+F*F;if(Le<=2)return new fe(z,F);R=Math.sqrt(Le/2)}else{let _e=!1;q>Number.EPSILON?K>Number.EPSILON&&(_e=!0):q<-Number.EPSILON?K<-Number.EPSILON&&(_e=!0):Math.sign(Y)===Math.sign(de)&&(_e=!0),_e?(z=-Y,F=q,R=Math.sqrt(Te)):(z=q,F=Y,R=Math.sqrt(Te/2))}return new fe(z/R,F/R)}let J=[];for(let C=0,U=ae.length,y=U-1,z=C+1;C<U;C++,y++,z++)y===U&&(y=0),z===U&&(z=0),J[C]=N(ae[C],ae[y],ae[z]);let ce=[],Oe,xe,Be=J.concat();for(let C=0,U=Q;C<U;C++){let y=j[C];Oe=[];for(let z=0,F=y.length,R=F-1,q=z+1;z<F;z++,R++,q++)R===F&&(R=0),q===F&&(q=0),Oe[z]=N(y[z],y[R],y[q]);ce.push(Oe),Be=Be.concat(Oe)}if(v===0)xe=ji.triangulateShape(ae,j);else{let C=[],U=[];for(let y=0;y<v;y++){let z=y/v,F=u*Math.cos(z*Math.PI/2),R=m*Math.sin(z*Math.PI/2)+f;for(let q=0,Y=ae.length;q<Y;q++){let K=ie(ae[q],J[q],R);te(K.x,K.y,-F),z===0&&C.push(K)}for(let q=0,Y=Q;q<Y;q++){let K=j[q];Oe=ce[q];let de=[];for(let Te=0,De=K.length;Te<De;Te++){let _e=ie(K[Te],Oe[Te],R);te(_e.x,_e.y,-F),z===0&&de.push(_e)}z===0&&U.push(de)}}xe=ji.triangulateShape(C,U)}let we=xe.length,ue=m+f;for(let C=0;C<ne;C++){let U=d?ie(D[C],Be[C],ue):D[C];O?(b.copy(T.normals[0]).multiplyScalar(U.x),S.copy(T.binormals[0]).multiplyScalar(U.y),I.copy(M[0]).add(b).add(S),te(I.x,I.y,I.z)):te(U.x,U.y,0)}for(let C=1;C<=h;C++)for(let U=0;U<ne;U++){let y=d?ie(D[U],Be[U],ue):D[U];O?(b.copy(T.normals[C]).multiplyScalar(y.x),S.copy(T.binormals[C]).multiplyScalar(y.y),I.copy(M[C]).add(b).add(S),te(I.x,I.y,I.z)):te(y.x,y.y,p/h*C)}for(let C=v-1;C>=0;C--){let U=C/v,y=u*Math.cos(U*Math.PI/2),z=m*Math.sin(U*Math.PI/2)+f;for(let F=0,R=ae.length;F<R;F++){let q=ie(ae[F],J[F],z);te(q.x,q.y,p+y)}for(let F=0,R=j.length;F<R;F++){let q=j[F];Oe=ce[F];for(let Y=0,K=q.length;Y<K;Y++){let de=ie(q[Y],Oe[Y],z);O?te(de.x,de.y+M[h-1].y,M[h-1].x+y):te(de.x,de.y,p+y)}}}function X(C,U){let y=C.length;for(;--y>=0;){let z=y,F=y-1;F<0&&(F=C.length-1);for(let R=0,q=h+2*v;R<q;R++){let Y=ne*R,K=ne*(R+1);he(U+z+Y,U+F+Y,U+F+K,U+z+K)}}}function te(C,U,y){l.push(C),l.push(U),l.push(y)}function le(C,U,y){w(C),w(U),w(y);let z=r.length/3,F=_.generateTopUV(n,r,z-3,z-2,z-1);E(F[0]),E(F[1]),E(F[2])}function he(C,U,y,z){w(C),w(U),w(z),w(U),w(y),w(z);let F=r.length/3,R=_.generateSideWallUV(n,r,F-6,F-3,F-2,F-1);E(R[0]),E(R[1]),E(R[3]),E(R[1]),E(R[2]),E(R[3])}function w(C){r.push(l[3*C+0]),r.push(l[3*C+1]),r.push(l[3*C+2])}function E(C){s.push(C.x),s.push(C.y)}(function(){let C=r.length/3;if(d){let U=0,y=ne*U;for(let z=0;z<we;z++){let F=xe[z];le(F[2]+y,F[1]+y,F[0]+y)}U=h+2*v,y=ne*U;for(let z=0;z<we;z++){let F=xe[z];le(F[0]+y,F[1]+y,F[2]+y)}}else{for(let U=0;U<we;U++){let y=xe[U];le(y[2],y[1],y[0])}for(let U=0;U<we;U++){let y=xe[U];le(y[0]+ne*h,y[1]+ne*h,y[2]+ne*h)}}n.addGroup(C,r.length/3-C,0)})(),(function(){let C=r.length/3,U=0;X(ae,U),U+=ae.length;for(let y=0,z=j.length;y<z;y++){let F=j[y];X(F,U),U+=F.length}n.addGroup(C,r.length/3-C,1)})()}this.setAttribute("position",new Ke(r,3)),this.setAttribute("uv",new Ke(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return z0(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new ml[r.type]().fromJSON(r)),new i(n,e.options)}},B0={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*r],h=e[3*r+1];return[new fe(s,a),new fe(o,l),new fe(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],p=e[3*n+2],d=e[3*r],u=e[3*r+1],m=e[3*r+2],f=e[3*s],v=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new fe(a,1-l),new fe(c,1-p),new fe(d,1-m),new fe(f,1-g)]:[new fe(o,1-l),new fe(h,1-p),new fe(u,1-m),new fe(v,1-g)]}};function z0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var vl=class i extends Or{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},xl=class i extends Et{constructor(e=[new fe(0,-.5),new fe(.5,0),new fe(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Mt(r,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,p=new P,d=new fe,u=new P,m=new P,f=new P,v=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,f.copy(u),u.normalize(),l.push(u.x,u.y,u.z);break;case e.length-1:l.push(f.x,f.y,f.z);break;default:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,m.copy(u),u.x+=f.x,u.y+=f.y,u.z+=f.z,u.normalize(),l.push(u.x,u.y,u.z),f.copy(m)}for(let _=0;_<=t;_++){let M=n+_*h*r,T=Math.sin(M),S=Math.cos(M);for(let b=0;b<=e.length-1;b++){p.x=e[b].x*T,p.y=e[b].y,p.z=e[b].x*S,a.push(p.x,p.y,p.z),d.x=_/t,d.y=b/(e.length-1),o.push(d.x,d.y);let I=l[3*b+0]*T,O=l[3*b+1],k=l[3*b+0]*S;c.push(I,O,k)}}for(let _=0;_<t;_++)for(let M=0;M<e.length-1;M++){let T=M+_*e.length,S=T,b=T+e.length,I=T+e.length+1,O=T+1;s.push(S,b,O),s.push(I,O,b)}this.setIndex(s),this.setAttribute("position",new Ke(a,3)),this.setAttribute("uv",new Ke(o,2)),this.setAttribute("normal",new Ke(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},yl=class i extends Or{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Xs=class i extends Et{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,p=e/o,d=t/l,u=[],m=[],f=[],v=[];for(let g=0;g<h;g++){let _=g*d-a;for(let M=0;M<c;M++){let T=M*p-s;m.push(T,-_,0),f.push(0,0,1),v.push(M/o),v.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){let M=_+c*g,T=_+c*(g+1),S=_+1+c*(g+1),b=_+1+c*g;u.push(M,T,b),u.push(T,S,b)}this.setIndex(u),this.setAttribute("position",new Ke(m,3)),this.setAttribute("normal",new Ke(f,3)),this.setAttribute("uv",new Ke(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Sl=class i extends Et{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],p=e,d=(t-e)/(r=Math.max(1,r)),u=new P,m=new fe;for(let f=0;f<=r;f++){for(let v=0;v<=n;v++){let g=s+v/n*a;u.x=p*Math.cos(g),u.y=p*Math.sin(g),l.push(u.x,u.y,u.z),c.push(0,0,1),m.x=(u.x/t+1)/2,m.y=(u.y/t+1)/2,h.push(m.x,m.y)}p+=d}for(let f=0;f<r;f++){let v=f*(n+1);for(let g=0;g<n;g++){let _=g+v,M=_,T=_+n+1,S=_+n+2,b=_+1;o.push(M,T,b),o.push(T,S,b)}}this.setIndex(o),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(c,3)),this.setAttribute("uv",new Ke(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Ml=class i extends Et{constructor(e=new Va([new fe(0,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let p=r.length/3,d=h.extractPoints(t),u=d.shape,m=d.holes;ji.isClockWise(u)===!1&&(u=u.reverse());for(let v=0,g=m.length;v<g;v++){let _=m[v];ji.isClockWise(_)===!0&&(m[v]=_.reverse())}let f=ji.triangulateShape(u,m);for(let v=0,g=m.length;v<g;v++){let _=m[v];u=u.concat(_)}for(let v=0,g=u.length;v<g;v++){let _=u[v];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let v=0,g=f.length;v<g;v++){let _=f[v],M=_[0]+p,T=_[1]+p,S=_[2]+p;n.push(M,T,S),l+=3}}this.setIndex(n),this.setAttribute("position",new Ke(r,3)),this.setAttribute("normal",new Ke(s,3)),this.setAttribute("uv",new Ke(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return V0(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function V0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var qs=class i extends Et{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],p=new P,d=new P,u=[],m=[],f=[],v=[];for(let g=0;g<=n;g++){let _=[],M=g/n,T=a+M*o,S=e*Math.cos(T),b=Math.sqrt(e*e-S*S),I=0;g===0&&a===0?I=.5/t:g===n&&l===Math.PI&&(I=-.5/t);for(let O=0;O<=t;O++){let k=O/t,D=r+k*s;p.x=-b*Math.cos(D),p.y=S,p.z=b*Math.sin(D),m.push(p.x,p.y,p.z),d.copy(p).normalize(),f.push(d.x,d.y,d.z),v.push(k+I,1-M),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let M=h[g][_+1],T=h[g][_],S=h[g+1][_],b=h[g+1][_+1];(g!==0||a>0)&&u.push(M,T,b),(g!==n-1||l<Math.PI)&&u.push(T,S,b)}this.setIndex(u),this.setAttribute("position",new Ke(m,3)),this.setAttribute("normal",new Ke(f,3)),this.setAttribute("uv",new Ke(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},bl=class i extends Or{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Tl=class i extends Et{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI,a=0,o=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let l=[],c=[],h=[],p=[],d=new P,u=new P,m=new P;for(let f=0;f<=n;f++){let v=a+f/n*o;for(let g=0;g<=r;g++){let _=g/r*s;u.x=(e+t*Math.cos(v))*Math.cos(_),u.y=(e+t*Math.cos(v))*Math.sin(_),u.z=t*Math.sin(v),c.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),m.subVectors(u,d).normalize(),h.push(m.x,m.y,m.z),p.push(g/r),p.push(f/n)}}for(let f=1;f<=n;f++)for(let v=1;v<=r;v++){let g=(r+1)*f+v-1,_=(r+1)*(f-1)+v-1,M=(r+1)*(f-1)+v,T=(r+1)*f+v;l.push(g,_,T),l.push(_,M,T)}this.setIndex(l),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},El=class i extends Et{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],l=[],c=[],h=[],p=new P,d=new P,u=new P,m=new P,f=new P,v=new P,g=new P;for(let M=0;M<=n;++M){let T=M/n*s*Math.PI*2;_(T,s,a,e,u),_(T+.01,s,a,e,m),v.subVectors(m,u),g.addVectors(m,u),f.crossVectors(v,g),g.crossVectors(f,v),f.normalize(),g.normalize();for(let S=0;S<=r;++S){let b=S/r*Math.PI*2,I=-t*Math.cos(b),O=t*Math.sin(b);p.x=u.x+(I*g.x+O*f.x),p.y=u.y+(I*g.y+O*f.y),p.z=u.z+(I*g.z+O*f.z),l.push(p.x,p.y,p.z),d.subVectors(p,u).normalize(),c.push(d.x,d.y,d.z),h.push(M/n),h.push(S/r)}}for(let M=1;M<=n;M++)for(let T=1;T<=r;T++){let S=(r+1)*(M-1)+(T-1),b=(r+1)*M+(T-1),I=(r+1)*M+T,O=(r+1)*(M-1)+T;o.push(S,b,O),o.push(b,I,O)}function _(M,T,S,b,I){let O=Math.cos(M),k=Math.sin(M),D=S/T*M,j=Math.cos(D);I.x=b*(2+j)*.5*O,I.y=b*(2+j)*k*.5,I.z=b*Math.sin(D)*.5}this.setIndex(o),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(c,3)),this.setAttribute("uv",new Ke(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},wl=class i extends Et{constructor(e=new Fa(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,l=new P,c=new fe,h=new P,p=[],d=[],u=[],m=[];function f(v){h=e.getPointAt(v/t,h);let g=a.normals[v],_=a.binormals[v];for(let M=0;M<=r;M++){let T=M/r*Math.PI*2,S=Math.sin(T),b=-Math.cos(T);l.x=b*g.x+S*_.x,l.y=b*g.y+S*_.y,l.z=b*g.z+S*_.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,p.push(o.x,o.y,o.z)}}(function(){for(let v=0;v<t;v++)f(v);f(s===!1?t:0),(function(){for(let v=0;v<=t;v++)for(let g=0;g<=r;g++)c.x=v/t,c.y=g/r,u.push(c.x,c.y)})(),(function(){for(let v=1;v<=t;v++)for(let g=1;g<=r;g++){let _=(r+1)*(v-1)+(g-1),M=(r+1)*v+(g-1),T=(r+1)*v+g,S=(r+1)*(v-1)+g;m.push(_,M,S),m.push(M,T,S)}})()})(),this.setIndex(m),this.setAttribute("position",new Ke(p,3)),this.setAttribute("normal",new Ke(d,3)),this.setAttribute("uv",new Ke(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new ml[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Al=class extends Et{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new P,s=new P;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let p=l[c],d=p.start;for(let u=d,m=d+p.count;u<m;u+=3)for(let f=0;f<3;f++){let v=o.getX(u+f),g=o.getX(u+(f+1)%3);r.fromBufferAttribute(a,v),s.fromBufferAttribute(a,g),Cp(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,p=3*o+(c+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,p),Cp(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ke(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Cp(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var tM=Object.freeze({__proto__:null,BoxGeometry:ns,CapsuleGeometry:al,CircleGeometry:ol,ConeGeometry:ll,CylinderGeometry:Na,DodecahedronGeometry:cl,EdgesGeometry:hl,ExtrudeGeometry:_l,IcosahedronGeometry:vl,LatheGeometry:xl,OctahedronGeometry:yl,PlaneGeometry:Xs,PolyhedronGeometry:Or,RingGeometry:Sl,ShapeGeometry:Ml,SphereGeometry:qs,TetrahedronGeometry:bl,TorusGeometry:Tl,TorusKnotGeometry:El,TubeGeometry:wl,WireframeGeometry:Al});function hs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(Ip(r))r.isRenderTargetTexture?(et("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Ip(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function ei(i){let e={};for(let t=0;t<i.length;t++){let n=hs(i[t]);for(let r in n)e[r]=n[r]}return e}function Ip(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function k0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function wu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ct.workingColorSpace}var Lf={clone:hs,merge:ei},G0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,H0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,An=class extends $i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=G0,this.fragmentShader=H0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=k0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new ft().setHex(r.value);break;case"v2":this.uniforms[n].value=new fe().fromArray(r.value);break;case"v3":this.uniforms[n].value=new P().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Qt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new ct().fromArray(r.value);break;case"m4":this.uniforms[n].value=new vt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Rl=class extends An{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Cl=class extends $i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Il=class extends $i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Wa=class extends es{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Os(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function ph(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Fr=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Pl=class extends Fr{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,o=2*t-n;break;case 2402:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,l=2*n-t;break;case 2402:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(n-t)/(r-t),f=m*m,v=f*m,g=-d*v+2*d*f-d*m,_=(1+d)*v+(-1.5-2*d)*f+(-.5+d)*m+1,M=(-1-u)*v+(1.5+u)*f+.5*m,T=u*v-u*f;for(let S=0;S!==o;++S)s[S]=g*a[h+S]+_*a[c+S]+M*a[l+S]+T*a[p+S];return s}},Ll=class extends Fr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),p=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*p+a[l+d]*h;return s}},Nl=class extends Fr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Dl=class extends Fr{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let m=(n-t)/(r-t),f=1-m;for(let v=0;v!==o;++v)s[v]=a[c+v]*f+a[l+v]*m;return s}let d=2*o,u=e-1;for(let m=0;m!==o;++m){let f=a[c+m],v=a[l+m],g=u*d+2*m,_=p[g],M=p[g+1],T=e*d+2*m,S=h[T],b=h[T+1],I=X0(n,t,_,S,r);s[m]=Nf(I,f,M,b,v)}return s}};function Nf(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function W0(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function X0(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=Nf(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let l=W0(s,e,t,n,r);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var gi=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Os(t,this.TimeBufferType),this.values=Os(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Os(e.times,Array),values:Os(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),ph(e.settings)&&(n.settings={inTangents:Os(e.settings.inTangents,Array),outTangents:Os(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Nl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ll(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Pl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Dl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return et("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;ph(this.settings)&&(Pp(this.settings.inTangents,e),Pp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(rt("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(rt("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){rt("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){rt("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&jg(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){rt("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===2302,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(r)l=!0;else{let h=o*n,p=h-n,d=h+n;for(let u=0;u!==n;++u){let m=t[h+u];if(m!==t[p+u]||m!==t[d+u]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,p=a*n;for(let d=0;d!==n;++d)t[p+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,ph(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Pp(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}gi.prototype.ValueTypeName="",gi.prototype.TimeBufferType=Float32Array,gi.prototype.ValueBufferType=Float32Array,gi.prototype.DefaultInterpolation=2301;var Ir=class extends gi{constructor(e,t,n){super(e,t,n)}};Ir.prototype.ValueTypeName="bool",Ir.prototype.ValueBufferType=Array,Ir.prototype.DefaultInterpolation=2300,Ir.prototype.InterpolantFactoryMethodLinear=void 0,Ir.prototype.InterpolantFactoryMethodSmooth=void 0;var Ul=class extends gi{constructor(e,t,n,r){super(e,t,n,r)}};Ul.prototype.ValueTypeName="color";var Ol=class extends gi{constructor(e,t,n,r){super(e,t,n,r)}};Ol.prototype.ValueTypeName="number";var Fl=class extends Fr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)Ti.slerpFlat(s,0,a,c-o,a,c,l);return s}},Xa=class extends gi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Fl(this.times,this.values,this.getValueSize(),e)}};Xa.prototype.ValueTypeName="quaternion",Xa.prototype.InterpolantFactoryMethodSmooth=void 0;var Pr=class extends gi{constructor(e,t,n){super(e,t,n)}};Pr.prototype.ValueTypeName="string",Pr.prototype.ValueBufferType=Array,Pr.prototype.DefaultInterpolation=2300,Pr.prototype.InterpolantFactoryMethodLinear=void 0,Pr.prototype.InterpolantFactoryMethodSmooth=void 0;var Bl=class extends gi{constructor(e,t,n,r){super(e,t,n,r)}};Bl.prototype.ValueTypeName="vector";var zl=class{constructor(e,t,n){let r=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){l++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,l),o===l&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,d=c.length;p<d;p+=2){let u=c[p],m=c[p+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Df=new zl,Vl=class{constructor(e){this.manager=e!==void 0?e:Df,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Vl.DEFAULT_MATERIAL_NAME="__DEFAULT";var nM=new vt,iM=new P,rM=new P;var jo=new P,Yo=new Ti,Wi=new P,js=class extends si{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(jo,Yo,Wi),Wi.x===1&&Wi.y===1&&Wi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jo,Yo,Wi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(jo,Yo,Wi),Wi.x===1&&Wi.y===1&&Wi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jo,Yo,Wi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Cr=new P,Lp=new fe,Np=new fe,Zn=class extends js{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Zo*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*$o*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Zo*Math.atan(Math.tan(.5*$o*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cr.x,Cr.y).multiplyScalar(-e/Cr.z),Cr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cr.x,Cr.y).multiplyScalar(-e/Cr.z)}getViewSize(e,t){return this.getViewBounds(e,Lp,Np),t.subVectors(Np,Lp)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*$o*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var qa=class extends js{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var sM=new vt,aM=new vt,oM=new vt;var kl=class extends si{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Zn(-90,1,e,t);r.layers=this.layers,this.add(r);let s=new Zn(-90,1,e,t);s.layers=this.layers,this.add(s);let a=new Zn(-90,1,e,t);a.layers=this.layers,this.add(a);let o=new Zn(-90,1,e,t);o.layers=this.layers,this.add(o);let l=new Zn(-90,1,e,t);l.layers=this.layers,this.add(l);let c=new Zn(-90,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==2001)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;v=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=f,e.setRenderTarget(n,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,d,u),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Gl=class extends Zn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ja=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=q0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function q0(){this._document.hidden===!1&&this.reset()}var lM=new P,cM=new Ti,hM=new P,uM=new P,dM=new P;var pM=new P,fM=new Ti,mM=new P,gM=new P;var j0=new RegExp("[\\[\\]\\.:\\/]","g"),Au="[^\\[\\]\\.:\\/]",Y0="[^"+"\\[\\]\\.:\\/".replace("\\.","")+"]",$0=/((?:WC+[\/:])*)/.source.replace("WC",Au),Z0=/(WCOD+)?/.source.replace("WCOD",Y0),J0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Au),K0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Au),Q0=new RegExp("^"+$0+Z0+J0+K0+"$"),e_=["material","materials","bones","map"],xh=class{constructor(e,t,n){let r=n||un.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},un=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(j0,"")}static parseTrackName(e){let t=Q0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);e_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void et("PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void rt("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void rt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void rt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void rt("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void rt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void rt("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void rt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[r];if(a===void 0)return void rt("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+r+" but it wasn't found.",e);let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};un.Composite=xh,un.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},un.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},un.prototype.GetterByBindingType=[un.prototype._getValue_direct,un.prototype._getValue_array,un.prototype._getValue_arrayElement,un.prototype._getValue_toArray],un.prototype.SetterByBindingTypeAndVersioning=[[un.prototype._setValue_direct,un.prototype._setValue_direct_setNeedsUpdate,un.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[un.prototype._setValue_array,un.prototype._setValue_array_setNeedsUpdate,un.prototype._setValue_array_setMatrixWorldNeedsUpdate],[un.prototype._setValue_arrayElement,un.prototype._setValue_arrayElement_setNeedsUpdate,un.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[un.prototype._setValue_fromArray,un.prototype._setValue_fromArray_setNeedsUpdate,un.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _M=new Float32Array(1);var vM=new vt;var Nu=class Nu{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};Nu.prototype.isMatrix2=!0;var yh=Nu,xM=new fe;var yM=new P,SM=new P,MM=new P,bM=new P,TM=new P,EM=new P,wM=new P;var AM=new P;var RM=new P,CM=new vt,IM=new vt;var PM=new P,LM=new ft,NM=new ft;var DM=new P,UM=new P,OM=new P;var FM=new P,BM=new js;var zM=new Di;var VM=new P;function Ru(i,e,t,n){let r=t_(n);switch(t){case 1021:return i*e;case 1028:case 1029:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case 1023:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:case 37496:case 37490:case 37491:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function t_(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}})),typeof window<"u"&&(window.__THREE__?et("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function nm(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function i_(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=i.createBuffer(),p;if(i.bindBuffer(a,h),i.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)p=i.HALF_FLOAT;else if(o instanceof Uint16Array)p=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)p=i.SHORT;else if(o instanceof Uint32Array)p=i.UNSIGNED_INT;else if(o instanceof Int32Array)p=i.INT;else if(o instanceof Int8Array)p=i.BYTE;else if(o instanceof Uint8Array)p=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);p=i.UNSIGNED_BYTE}return{buffer:h,type:p,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(i.bindBuffer(o,s),c.length===0)i.bufferSubData(o,0,l);else{c.sort((p,d)=>p.start-d.start);let h=0;for(let p=1;p<c.length;p++){let d=c[h],u=c[p];u.start<=d.start+d.count+1?d.count=Math.max(d.count,u.start+u.count-d.start):(++h,c[h]=u)}c.length=h+1;for(let p=0,d=c.length;p<d;p++){let u=c[p];i.bufferSubData(o,u.start*l.BYTES_PER_ELEMENT,l,u.start,u.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var r_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,s_=`#ifdef USE_ALPHAHASH
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
#endif`,a_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,o_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,l_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,c_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,h_=`#ifdef USE_AOMAP
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
#endif`,u_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,d_=`#ifdef USE_BATCHING
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
#endif`,p_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,f_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,m_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,g_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,__=`#ifdef USE_IRIDESCENCE
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
#endif`,v_=`#ifdef USE_BUMPMAP
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
#endif`,x_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,y_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,S_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,M_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,b_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,T_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,E_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,w_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,A_=`#define PI 3.141592653589793
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
} // validated`,R_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,C_=`vec3 transformedNormal = objectNormal;
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
#endif`,I_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,P_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,L_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,N_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,D_="gl_FragColor = linearToOutputTexel( gl_FragColor );",U_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,O_=`#ifdef USE_ENVMAP
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
#endif`,F_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,B_=`#ifdef USE_ENVMAP
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
#endif`,z_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,V_=`#ifdef USE_ENVMAP
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
#endif`,k_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,G_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,H_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,W_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,X_=`#ifdef USE_GRADIENTMAP
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
}`,q_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,j_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Y_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$_=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Z_=`#ifdef USE_ENVMAP
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
#endif`,J_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,K_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Q_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ev=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tv=`PhysicalMaterial material;
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
#endif`,nv=`uniform sampler2D dfgLUT;
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
}`,iv=`
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
#endif`,rv=`#if defined( RE_IndirectDiffuse )
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
#endif`,sv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,av=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,ov=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,uv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,fv=`#if defined( USE_POINTS_UV )
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
#endif`,mv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_v=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yv=`#ifdef USE_MORPHTARGETS
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
#endif`,Sv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,bv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Tv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ev=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Av=`#ifdef USE_NORMALMAP
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
#endif`,Rv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Iv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Dv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ov=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hv=`float getShadowMask() {
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
}`,Wv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xv=`#ifdef USE_SKINNING
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
#endif`,qv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jv=`#ifdef USE_SKINNING
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
#endif`,Yv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$v=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kv=`#ifdef USE_TRANSMISSION
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
#endif`,Qv=`#ifdef USE_TRANSMISSION
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
#endif`,ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ix=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,rx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sx=`uniform sampler2D t2D;
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
}`,ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ox=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hx=`#include <common>
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
}`,ux=`#if DEPTH_PACKING == 3200
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
}`,dx=`#define DISTANCE
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
}`,px=`#define DISTANCE
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
}`,fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gx=`uniform float scale;
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
}`,_x=`uniform vec3 diffuse;
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
}`,vx=`#include <common>
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
}`,xx=`uniform vec3 diffuse;
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
}`,yx=`#define LAMBERT
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
}`,Sx=`#define LAMBERT
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
}`,Mx=`#define MATCAP
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
}`,bx=`#define MATCAP
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
}`,Tx=`#define NORMAL
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
}`,Ex=`#define NORMAL
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
}`,wx=`#define PHONG
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
}`,Ax=`#define PHONG
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
}`,Rx=`#define STANDARD
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
}`,Cx=`#define STANDARD
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
}`,Ix=`#define TOON
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
}`,Px=`#define TOON
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
}`,Lx=`uniform float size;
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
}`,Nx=`uniform vec3 diffuse;
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
}`,Dx=`#include <common>
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
}`,Ux=`uniform vec3 color;
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
}`,Ox=`uniform float rotation;
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
}`,Fx=`uniform vec3 diffuse;
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
}`,yt={alphahash_fragment:r_,alphahash_pars_fragment:s_,alphamap_fragment:a_,alphamap_pars_fragment:o_,alphatest_fragment:l_,alphatest_pars_fragment:c_,aomap_fragment:h_,aomap_pars_fragment:u_,batching_pars_vertex:d_,batching_vertex:p_,begin_vertex:f_,beginnormal_vertex:m_,bsdfs:g_,iridescence_fragment:__,bumpmap_pars_fragment:v_,clipping_planes_fragment:x_,clipping_planes_pars_fragment:y_,clipping_planes_pars_vertex:S_,clipping_planes_vertex:M_,color_fragment:b_,color_pars_fragment:T_,color_pars_vertex:E_,color_vertex:w_,common:A_,cube_uv_reflection_fragment:R_,defaultnormal_vertex:C_,displacementmap_pars_vertex:I_,displacementmap_vertex:P_,emissivemap_fragment:L_,emissivemap_pars_fragment:N_,colorspace_fragment:D_,colorspace_pars_fragment:U_,envmap_fragment:O_,envmap_common_pars_fragment:F_,envmap_pars_fragment:B_,envmap_pars_vertex:z_,envmap_physical_pars_fragment:Z_,envmap_vertex:V_,fog_vertex:k_,fog_pars_vertex:G_,fog_fragment:H_,fog_pars_fragment:W_,gradientmap_pars_fragment:X_,lightmap_pars_fragment:q_,lights_lambert_fragment:j_,lights_lambert_pars_fragment:Y_,lights_pars_begin:$_,lights_toon_fragment:J_,lights_toon_pars_fragment:K_,lights_phong_fragment:Q_,lights_phong_pars_fragment:ev,lights_physical_fragment:tv,lights_physical_pars_fragment:nv,lights_fragment_begin:iv,lights_fragment_maps:rv,lights_fragment_end:sv,lightprobes_pars_fragment:av,logdepthbuf_fragment:ov,logdepthbuf_pars_fragment:lv,logdepthbuf_pars_vertex:cv,logdepthbuf_vertex:hv,map_fragment:uv,map_pars_fragment:dv,map_particle_fragment:pv,map_particle_pars_fragment:fv,metalnessmap_fragment:mv,metalnessmap_pars_fragment:gv,morphinstance_vertex:_v,morphcolor_vertex:vv,morphnormal_vertex:xv,morphtarget_pars_vertex:yv,morphtarget_vertex:Sv,normal_fragment_begin:Mv,normal_fragment_maps:bv,normal_pars_fragment:Tv,normal_pars_vertex:Ev,normal_vertex:wv,normalmap_pars_fragment:Av,clearcoat_normal_fragment_begin:Rv,clearcoat_normal_fragment_maps:Cv,clearcoat_pars_fragment:Iv,iridescence_pars_fragment:Pv,opaque_fragment:Lv,packing:Nv,premultiplied_alpha_fragment:Dv,project_vertex:Uv,dithering_fragment:Ov,dithering_pars_fragment:Fv,roughnessmap_fragment:Bv,roughnessmap_pars_fragment:zv,shadowmap_pars_fragment:Vv,shadowmap_pars_vertex:kv,shadowmap_vertex:Gv,shadowmask_pars_fragment:Hv,skinbase_vertex:Wv,skinning_pars_vertex:Xv,skinning_vertex:qv,skinnormal_vertex:jv,specularmap_fragment:Yv,specularmap_pars_fragment:$v,tonemapping_fragment:Zv,tonemapping_pars_fragment:Jv,transmission_fragment:Kv,transmission_pars_fragment:Qv,uv_pars_fragment:ex,uv_pars_vertex:tx,uv_vertex:nx,worldpos_vertex:ix,background_vert:rx,background_frag:sx,backgroundCube_vert:ax,backgroundCube_frag:ox,cube_vert:lx,cube_frag:cx,depth_vert:hx,depth_frag:ux,distance_vert:dx,distance_frag:px,equirect_vert:fx,equirect_frag:mx,linedashed_vert:gx,linedashed_frag:_x,meshbasic_vert:vx,meshbasic_frag:xx,meshlambert_vert:yx,meshlambert_frag:Sx,meshmatcap_vert:Mx,meshmatcap_frag:bx,meshnormal_vert:Tx,meshnormal_frag:Ex,meshphong_vert:wx,meshphong_frag:Ax,meshphysical_vert:Rx,meshphysical_frag:Cx,meshtoon_vert:Ix,meshtoon_frag:Px,points_vert:Lx,points_frag:Nx,shadow_vert:Dx,shadow_frag:Ux,sprite_vert:Ox,sprite_frag:Fx},Ie={common:{diffuse:{value:new ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new ft(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},nr={basic:{uniforms:ei([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:yt.meshbasic_vert,fragmentShader:yt.meshbasic_frag},lambert:{uniforms:ei([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ft(0)},envMapIntensity:{value:1}}]),vertexShader:yt.meshlambert_vert,fragmentShader:yt.meshlambert_frag},phong:{uniforms:ei([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ft(0)},specular:{value:new ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:yt.meshphong_vert,fragmentShader:yt.meshphong_frag},standard:{uniforms:ei([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag},toon:{uniforms:ei([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new ft(0)}}]),vertexShader:yt.meshtoon_vert,fragmentShader:yt.meshtoon_frag},matcap:{uniforms:ei([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:yt.meshmatcap_vert,fragmentShader:yt.meshmatcap_frag},points:{uniforms:ei([Ie.points,Ie.fog]),vertexShader:yt.points_vert,fragmentShader:yt.points_frag},dashed:{uniforms:ei([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:yt.linedashed_vert,fragmentShader:yt.linedashed_frag},depth:{uniforms:ei([Ie.common,Ie.displacementmap]),vertexShader:yt.depth_vert,fragmentShader:yt.depth_frag},normal:{uniforms:ei([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:yt.meshnormal_vert,fragmentShader:yt.meshnormal_frag},sprite:{uniforms:ei([Ie.sprite,Ie.fog]),vertexShader:yt.sprite_vert,fragmentShader:yt.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:yt.background_vert,fragmentShader:yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:yt.backgroundCube_vert,fragmentShader:yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:yt.cube_vert,fragmentShader:yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:yt.equirect_vert,fragmentShader:yt.equirect_frag},distance:{uniforms:ei([Ie.common,Ie.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:yt.distance_vert,fragmentShader:yt.distance_frag},shadow:{uniforms:ei([Ie.lights,Ie.fog,{color:{value:new ft(0)},opacity:{value:1}}]),vertexShader:yt.shadow_vert,fragmentShader:yt.shadow_frag}};nr.physical={uniforms:ei([nr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new ft(0)},specularColor:{value:new ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag};var ac={r:0,b:0,g:0},Bx=new vt,im=new ct;function zx(i,e,t,n,r,s){let a=new ft(0),o,l,c=r===!0?0:1,h=null,p=0,d=null;function u(f){let v=f.isScene===!0?f.background:null;if(v&&v.isTexture){let g=f.backgroundBlurriness>0;v=e.get(v,g)}return v}function m(f,v){f.getRGB(ac,wu(i)),t.buffers.color.setClear(ac.r,ac.g,ac.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(f,v=1){a.set(f),c=v,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(f){c=f,m(a,c)},render:function(f){let v=!1,g=u(f);g===null?m(a,c):g&&g.isColor&&(m(g,1),v=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,s):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,v){let g=u(v);g&&(g.isCubeTexture||g.mapping===$a)?(l===void 0&&(l=new Jn(new ns(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:hs(nr.backgroundCube.uniforms),vertexShader:nr.backgroundCube.vertexShader,fragmentShader:nr.backgroundCube.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,M,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=g,l.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Bx.makeRotationFromEuler(v.backgroundRotation)).transpose(),g.isCubeTexture&&g.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(im),l.material.toneMapped=Ct.getTransfer(g.colorSpace)!==en,h===g&&p===g.version&&d===i.toneMapping||(l.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):g&&g.isTexture&&(o===void 0&&(o=new Jn(new Xs(2,2),new An({name:"BackgroundMaterial",uniforms:hs(nr.background.uniforms),vertexShader:nr.background.vertexShader,fragmentShader:nr.background.fragmentShader,side:$s,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=g,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=Ct.getTransfer(g.colorSpace)!==en,g.matrixAutoUpdate===!0&&g.updateMatrix(),o.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&p===g.version&&d===i.toneMapping||(o.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),o.layers.enableAll(),f.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function Vx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function l(g){return i.deleteVertexArray(g)}function c(g){let _=[],M=[],T=[];for(let S=0;S<t;S++)_[S]=0,M[S]=0,T[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:M,attributeDivisors:T,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,M=g.length;_<M;_++)g[_]=0}function p(g){d(g,0)}function d(g,_){let M=s.newAttributes,T=s.enabledAttributes,S=s.attributeDivisors;M[g]=1,T[g]===0&&(i.enableVertexAttribArray(g),T[g]=1),S[g]!==_&&(i.vertexAttribDivisor(g,_),S[g]=_)}function u(){let g=s.newAttributes,_=s.enabledAttributes;for(let M=0,T=_.length;M<T;M++)_[M]!==g[M]&&(i.disableVertexAttribArray(M),_[M]=0)}function m(g,_,M,T,S,b,I){I===!0?i.vertexAttribIPointer(g,_,M,S,b):i.vertexAttribPointer(g,_,M,T,S,b)}function f(){v(),a=!0,s!==r&&(s=r,o(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,M,T,S){let b=!1,I=(function(O,k,D,j){let V=j.wireframe===!0,Q=n[k.id];Q===void 0&&(Q={},n[k.id]=Q);let ae=O.isInstancedMesh===!0?O.id:0,ie=Q[ae];ie===void 0&&(ie={},Q[ae]=ie);let ne=ie[D.id];ne===void 0&&(ne={},ie[D.id]=ne);let N=ne[V];return N===void 0&&(N=c(i.createVertexArray()),ne[V]=N),N})(g,T,M,_);s!==I&&(s=I,o(s.object)),b=(function(O,k,D,j){let V=s.attributes,Q=k.attributes,ae=0,ie=D.getAttributes();for(let ne in ie)if(ie[ne].location>=0){let N=V[ne],J=Q[ne];if(J===void 0&&(ne==="instanceMatrix"&&O.instanceMatrix&&(J=O.instanceMatrix),ne==="instanceColor"&&O.instanceColor&&(J=O.instanceColor)),N===void 0||N.attribute!==J||J&&N.data!==J.data)return!0;ae++}return s.attributesNum!==ae||s.index!==j})(g,T,M,S),b&&(function(O,k,D,j){let V={},Q=k.attributes,ae=0,ie=D.getAttributes();for(let ne in ie)if(ie[ne].location>=0){let N=Q[ne];N===void 0&&(ne==="instanceMatrix"&&O.instanceMatrix&&(N=O.instanceMatrix),ne==="instanceColor"&&O.instanceColor&&(N=O.instanceColor));let J={};J.attribute=N,N&&N.data&&(J.data=N.data),V[ne]=J,ae++}s.attributes=V,s.attributesNum=ae,s.index=j})(g,T,M,S),S!==null&&e.update(S,i.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(O,k,D,j){h();let V=j.attributes,Q=D.getAttributes(),ae=k.defaultAttributeValues;for(let ie in Q){let ne=Q[ie];if(ne.location>=0){let N=V[ie];if(N===void 0&&(ie==="instanceMatrix"&&O.instanceMatrix&&(N=O.instanceMatrix),ie==="instanceColor"&&O.instanceColor&&(N=O.instanceColor)),N!==void 0){let J=N.normalized,ce=N.itemSize,Oe=e.get(N);if(Oe===void 0)continue;let xe=Oe.buffer,Be=Oe.type,we=Oe.bytesPerElement,ue=Be===i.INT||Be===i.UNSIGNED_INT||N.gpuType===Bh;if(N.isInterleavedBufferAttribute){let X=N.data,te=X.stride,le=N.offset;if(X.isInstancedInterleavedBuffer){for(let he=0;he<ne.locationSize;he++)d(ne.location+he,X.meshPerAttribute);O.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let he=0;he<ne.locationSize;he++)p(ne.location+he);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let he=0;he<ne.locationSize;he++)m(ne.location+he,ce/ne.locationSize,Be,J,te*we,(le+ce/ne.locationSize*he)*we,ue)}else{if(N.isInstancedBufferAttribute){for(let X=0;X<ne.locationSize;X++)d(ne.location+X,N.meshPerAttribute);O.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let X=0;X<ne.locationSize;X++)p(ne.location+X);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let X=0;X<ne.locationSize;X++)m(ne.location+X,ce/ne.locationSize,Be,J,ce*we,ce/ne.locationSize*X*we,ue)}}else if(ae!==void 0){let J=ae[ie];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(ne.location,J);break;case 3:i.vertexAttrib3fv(ne.location,J);break;case 4:i.vertexAttrib4fv(ne.location,J);break;default:i.vertexAttrib1fv(ne.location,J)}}}}u()})(g,_,M,T),S!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(S).buffer))},reset:f,resetDefaultState:v,dispose:function(){f();for(let g in n){let _=n[g];for(let M in _){let T=_[M];for(let S in T){let b=T[S];for(let I in b)l(b[I].object),delete b[I];delete T[S]}}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let M in _){let T=_[M];for(let S in T){let b=T[S];for(let I in b)l(b[I].object),delete b[I];delete T[S]}}delete n[g.id]},releaseStatesOfObject:function(g){for(let _ in n){let M=n[_],T=g.isInstancedMesh===!0?g.id:0,S=M[T];if(S!==void 0){for(let b in S){let I=S[b];for(let O in I)l(I[O].object),delete I[O];delete S[b]}delete M[T],Object.keys(M).length===0&&delete n[_]}}},releaseStatesOfProgram:function(g){for(let _ in n){let M=n[_];for(let T in M){let S=M[T];if(S[g.id]===void 0)continue;let b=S[g.id];for(let I in b)l(b[I].object),delete b[I];delete S[g.id]}}},initAttributes:h,enableAttribute:p,disableUnusedAttributes:u}}function kx(i,e,t){let n;this.setMode=function(r){n=r},this.render=function(r,s){i.drawArrays(n,r,s),t.update(s,n,1)},this.renderInstances=function(r,s,a){a!==0&&(i.drawArraysInstanced(n,r,s,a),t.update(s,n,a))},this.renderMultiDraw=function(r,s,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,s,0,a);let o=0;for(let l=0;l<a;l++)o+=s[l];t.update(o,n,1)}}function Gx(i,e,t,n){let r;function s(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(et("WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&c===!1&&et("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let h=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(h){return h===er||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let p=h===Qi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==Bi&&h!==wi&&!p&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:i.getParameter(i.MAX_SAMPLES),samples:i.getParameter(i.SAMPLES)}}function Hx(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Ni,o=new ct,l={value:null,needsUpdate:!1};function c(h,p,d,u){let m=h!==null?h.length:0,f=null;if(m!==0){if(f=l.value,u!==!0||f===null){let v=d+4*m,g=p.matrixWorldInverse;o.getNormalMatrix(g),(f===null||f.length<v)&&(f=new Float32Array(v));for(let _=0,M=d;_!==m;++_,M+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(f,M),f[M+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let d=h.length!==0||p||n!==0||r;return r=p,n=h.length,d},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=c(h,p,0)},this.setState=function(h,p,d){let u=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,v=i.get(h);if(!r||u===null||u.length===0||s&&!f)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,M=v.clippingState||null;l.value=M,M=c(u,p,_,d);for(let T=0;T!==_;++T)M[T]=t[T];v.clippingState=M,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}im.set(-1,0,0,0,1,0,0,0,1);var Qa=new qa,Uf=new ft,Du=null,Uu=0,Ou=0,Fu=!1,Wx=new P,us=new P,lc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=Wx}=s;Du=this._renderer.getRenderTarget(),Uu=this._renderer.getActiveCubeFace(),Ou=this._renderer.getActiveMipmapLevel(),Fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ff(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Du,Uu,Ou),this._renderer.xr.enabled=Fu,e.scissorTest=!1,Qs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Js||e.mapping===rs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Du=this._renderer.getRenderTarget(),Uu=this._renderer.getActiveCubeFace(),Ou=this._renderer.getActiveMipmapLevel(),Fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qn,minFilter:Qn,generateMipmaps:!1,type:Qi,format:er,colorSpace:nc,depthBuffer:!1},r=Of(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Of(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Xx(s)),this._blurMaterial=jx(s,e,t),this._ggxMaterial=qx(s,e,t)}return r}_compileMaterial(e){let t=new Jn(new Et,e);this._renderer.compile(t,Qa)}_sceneToCubeUV(e,t,n,r,s){let a=new Zn(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,p=c.toneMapping;c.getClearColor(Uf),c.toneMapping=Oi,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jn(new ns,new Ia({name:"PMREM.Background",side:Kn,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,m=!1,f=e.background;f?f.isColor&&(u.color.copy(f),e.background=null,m=!0):(u.color.copy(Uf),m=!0);for(let v=0;v<6;v++){let g=v%3;g===0?(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[v],s.y,s.z)):g===1?(a.up.set(0,0,o[v]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[v],s.z)):(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[v]));let _=this._cubeSize;Qs(r,g*_,v>2?_:0,_,_),c.setRenderTarget(r),m&&c.render(d,a),c.render(e,a)}c.toneMapping=p,c.autoClear=h,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Js||e.mapping===rs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ff());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s,s.uniforms.envMap.value=e;let o=this._cubeSize;Qs(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Qa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(c*c-h*h)*(1.25*c),{_lodMax:d}=this,u=this._sizeLods[n],m=3*u*(n>d-4?n-d+4:0),f=4*(this._cubeSize-u);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=d-t,Qs(s,m,f,3*u,2*u),r.setRenderTarget(s),r.render(o,Qa),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=d-n,Qs(e,m,f,3*u,2*u),r.setRenderTarget(e),r.render(o,Qa)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[r];Qs(t,3*h*(r>this._lodMax-4?r-this._lodMax+4:0),4*(this._cubeSize-h),3*h,2*h),a.setRenderTarget(t),a.render(l,Qa)}};function Xx(i){let e=[],t=[],n=i,r=i-4+1+6;for(let s=0;s<r;s++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,d=6,u=3,m=new Float32Array(u*d*p),f=new Float32Array(u*d*p);for(let g=0;g<p;g++){let _=g%3*2/3-1,M=g>2?0:-1,T=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];m.set(T,u*d*g);for(let S=0;S<d;S++){let b=2*h[2*S]-1,I=2*h[2*S+1]-1;g===0?us.set(1,I,b):g===1?us.set(-b,1,-I):g===2?us.set(-b,I,1):g===3?us.set(-1,I,-b):g===4?us.set(-b,-1,I):us.set(b,I,-1),us.toArray(f,(g*d+S)*u)}}let v=new Et;v.setAttribute("position",new Pt(m,u)),v.setAttribute("outputDirection",new Pt(f,u)),t.push(new Jn(v,null)),n>4&&n--}return{lodMeshes:t,sizeLods:e}}function Of(i,e,t){let n=new ci(i,e,t);return n.texture.mapping=$a,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qs(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function qx(i,e,t){return new An({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:uc(),fragmentShader:`

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
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function jx(i,e,t){return new An({name:"SphericalGaussianBlur",defines:{SAMPLES:20,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:uc(),fragmentShader:`

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
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Ff(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uc(),fragmentShader:`

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
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Bf(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function uc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var cc=class extends ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Pa(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ns(5,5,5),s=new An({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kn,blending:Ki});s.uniforms.tEquirect.value=t;let a=new Jn(r,s),o=t.minFilter;return t.minFilter===ss&&(t.minFilter=Qn),new kl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function Yx(i){let e=new WeakMap,t=new WeakMap,n=null;function r(o,l){return l===Xl?o.mapping=Js:l===ql&&(o.mapping=rs),o}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(o){let l=o.target;l.removeEventListener("dispose",a);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}return{get:function(o,l=!1){return o==null?null:l?(function(c){if(c&&c.isTexture){let h=c.mapping,p=h===Xl||h===ql,d=h===Js||h===rs;if(p||d){let u=t.get(c),m=u!==void 0?u.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==m)return n===null&&(n=new lc(i)),u=p?n.fromEquirectangular(c,u):n.fromCubemap(c,u),u.texture.pmremVersion=c.pmremVersion,t.set(c,u),u.texture;if(u!==void 0)return u.texture;{let f=c.image;return p&&f&&f.height>0||d&&f&&(function(v){let g=0,_=6;for(let M=0;M<_;M++)v[M]!==void 0&&g++;return g===_})(f)?(n===null&&(n=new lc(i)),u=p?n.fromEquirectangular(c):n.fromCubemap(c),u.texture.pmremVersion=c.pmremVersion,t.set(c,u),c.addEventListener("dispose",a),u.texture):null}}}return c})(o):(function(c){if(c&&c.isTexture){let h=c.mapping;if(h===Xl||h===ql){if(e.has(c))return r(e.get(c).texture,c.mapping);{let p=c.image;if(p&&p.height>0){let d=new cc(p.height);return d.fromEquirectangularTexture(i,c),e.set(c,d),c.addEventListener("dispose",s),r(d.texture,c.mapping)}return null}}}return c})(o)},dispose:function(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function $x(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Jr("WebGLRenderer: "+n+" extension not supported."),r}}}function Zx(i,e,t,n){let r={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let p in c.attributes)e.remove(c.attributes[p]);c.removeEventListener("dispose",a),delete r[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,p=l.attributes.position,d=0;if(p===void 0)return;if(h!==null){let f=h.array;d=h.version;for(let v=0,g=f.length;v<g;v+=3){let _=f[v+0],M=f[v+1],T=f[v+2];c.push(_,M,M,T,T,_)}}else{let f=p.array;d=p.version;for(let v=0,g=f.length/3-1;v<g;v+=3){let _=v+0,M=v+1,T=v+2;c.push(_,M,M,T,T,_)}}let u=new(p.count>=65535?Aa:wa)(c,1);u.version=d;let m=s.get(l);m&&e.remove(m),s.set(l,u)}return{get:function(l,c){return r[c.id]===!0||(c.addEventListener("dispose",a),r[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function Jx(i,e,t){let n,r,s;this.setMode=function(a){n=a},this.setIndex=function(a){r=a.type,s=a.bytesPerElement},this.render=function(a,o){i.drawElements(n,o,r,a*s),t.update(o,n,1)},this.renderInstances=function(a,o,l){l!==0&&(i.drawElementsInstanced(n,o,r,a*s,l),t.update(o,n,l))},this.renderMultiDraw=function(a,o,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,o,0,r,a,0,l);let c=0;for(let h=0;h<l;h++)c+=o[h];t.update(c,n,1)}}function Kx(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:rt("WebGLInfo: Unknown draw mode:",n)}}}}function Qx(i,e,t){let n=new WeakMap,r=new Qt;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,p=n.get(a);if(p===void 0||p.count!==h){p!==void 0&&p.texture.dispose();let d=a.morphAttributes.position!==void 0,u=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),u===!0&&(_=2),m===!0&&(_=3);let M=a.attributes.position.count*_,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let S=new Float32Array(M*T*4*h),b=new ba(S,M,T,h);b.type=wi,b.needsUpdate=!0;let I=4*_;for(let O=0;O<h;O++){let k=f[O],D=v[O],j=g[O],V=M*T*4*O;for(let Q=0;Q<k.count;Q++){let ae=Q*I;d===!0&&(r.fromBufferAttribute(k,Q),S[V+ae+0]=r.x,S[V+ae+1]=r.y,S[V+ae+2]=r.z,S[V+ae+3]=0),u===!0&&(r.fromBufferAttribute(D,Q),S[V+ae+4]=r.x,S[V+ae+5]=r.y,S[V+ae+6]=r.z,S[V+ae+7]=0),m===!0&&(r.fromBufferAttribute(j,Q),S[V+ae+8]=r.x,S[V+ae+9]=r.y,S[V+ae+10]=r.z,S[V+ae+11]=j.itemSize===4?r.w:1)}}p={count:h,texture:b,size:new fe(M,T)},n.set(a,p),a.addEventListener("dispose",function O(){b.dispose(),n.delete(a),a.removeEventListener("dispose",O)})}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let d=0;for(let m=0;m<l.length;m++)d+=l[m];let u=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",u),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}}}function ey(i,e,t,n,r){let s=new WeakMap;function a(o){let l=o.target;l.removeEventListener("dispose",a),n.releaseStatesOfObject(l),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:function(o){let l=r.render.frame,c=o.geometry,h=e.get(o,c);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==l&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,l))),o.isSkinnedMesh){let p=o.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return h},dispose:function(){s=new WeakMap}}}var ty={[Ph]:"LINEAR_TONE_MAPPING",[Lh]:"REINHARD_TONE_MAPPING",[Nh]:"CINEON_TONE_MAPPING",[Dh]:"ACES_FILMIC_TONE_MAPPING",[Oh]:"AGX_TONE_MAPPING",[Fh]:"NEUTRAL_TONE_MAPPING",[Uh]:"CUSTOM_TONE_MAPPING"};function ny(i,e,t,n,r,s){let a=new ci(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Et;c.setAttribute("position",new Ke([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ke([0,2,0,0,2,0],2));let h=new Rl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new Jn(c,h),d=new qa(-1,1,1,-1,0,1),u,m=null,f=null,v=!1,g=null,_=[],M=!1;this.setSize=function(T,S){a.setSize(T,S),o!==null&&o.setSize(T,S),l!==null&&l.setSize(T,S);for(let b=0;b<_.length;b++){let I=_[b];I.setSize&&I.setSize(T,S)}},this.setEffects=function(T){_=T,M=_.length>0&&_[0].isRenderPass===!0;let S=a.width,b=a.height;_.length>0&&o===null&&(o=new ci(S,b,{type:Qi,depthBuffer:!1,stencilBuffer:!1}),l=new ci(S,b,{type:Qi,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<_.length;I++){let O=_[I];O.setSize&&O.setSize(S,b)}},this.begin=function(T,S){if(v||T.toneMapping===Oi&&_.length===0)return!1;if(g=S,S!==null){let b=S.width,I=S.height;a.width===b&&a.height===I||this.setSize(b,I)}return M===!1&&T.setRenderTarget(a),u=T.toneMapping,T.toneMapping=Oi,!0},this.hasRenderPass=function(){return M},this.end=function(T,S){T.toneMapping=u,v=!0;let b=a,I=o;for(let O=0;O<_.length;O++){let k=_[O];k.enabled!==!1&&(k.render(T,I,b,S),k.needsSwap!==!1&&(b=I,I=I===o?l:o))}if(m!==T.outputColorSpace||f!==T.toneMapping){m=T.outputColorSpace,f=T.toneMapping,h.defines={},Ct.getTransfer(m)===en&&(h.defines.SRGB_TRANSFER="");let O=ty[f];O&&(h.defines[O]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,T.setRenderTarget(g),T.render(p,d),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var rm=new ri,Vu=new Ur(1,1),sm=new ba,am=new Qo,om=new Pa,zf=[],Vf=[],kf=new Float32Array(16),Gf=new Float32Array(9),Hf=new Float32Array(4);function ta(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=zf[r];if(s===void 0&&(s=new Float32Array(r),zf[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Nn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Dn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function dc(i,e){let t=Vf[e];t===void 0&&(t=new Int32Array(e),Vf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function iy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ry(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;i.uniform2fv(this.addr,e),Dn(t,e)}}function sy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nn(t,e))return;i.uniform3fv(this.addr,e),Dn(t,e)}}function ay(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;i.uniform4fv(this.addr,e),Dn(t,e)}}function oy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Dn(t,e)}else{if(Nn(t,n))return;Hf.set(n),i.uniformMatrix2fv(this.addr,!1,Hf),Dn(t,n)}}function ly(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Dn(t,e)}else{if(Nn(t,n))return;Gf.set(n),i.uniformMatrix3fv(this.addr,!1,Gf),Dn(t,n)}}function cy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Dn(t,e)}else{if(Nn(t,n))return;kf.set(n),i.uniformMatrix4fv(this.addr,!1,kf),Dn(t,n)}}function hy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function uy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;i.uniform2iv(this.addr,e),Dn(t,e)}}function dy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nn(t,e))return;i.uniform3iv(this.addr,e),Dn(t,e)}}function py(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;i.uniform4iv(this.addr,e),Dn(t,e)}}function fy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function my(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;i.uniform2uiv(this.addr,e),Dn(t,e)}}function gy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nn(t,e))return;i.uniform3uiv(this.addr,e),Dn(t,e)}}function _y(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;i.uniform4uiv(this.addr,e),Dn(t,e)}}function vy(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(Vu.compareFunction=t.isReversedDepthBuffer()?rc:ic,s=Vu):s=rm,t.setTexture2D(e||s,r)}function xy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||am,r)}function yy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||om,r)}function Sy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||sm,r)}function My(i){switch(i){case 5126:return iy;case 35664:return ry;case 35665:return sy;case 35666:return ay;case 35674:return oy;case 35675:return ly;case 35676:return cy;case 5124:case 35670:return hy;case 35667:case 35671:return uy;case 35668:case 35672:return dy;case 35669:case 35673:return py;case 5125:return fy;case 36294:return my;case 36295:return gy;case 36296:return _y;case 35678:case 36198:case 36298:case 36306:case 35682:return vy;case 35679:case 36299:case 36307:return xy;case 35680:case 36300:case 36308:case 36293:return yy;case 36289:case 36303:case 36311:case 36292:return Sy}}function by(i,e){i.uniform1fv(this.addr,e)}function Ty(i,e){let t=ta(e,this.size,2);i.uniform2fv(this.addr,t)}function Ey(i,e){let t=ta(e,this.size,3);i.uniform3fv(this.addr,t)}function wy(i,e){let t=ta(e,this.size,4);i.uniform4fv(this.addr,t)}function Ay(i,e){let t=ta(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ry(i,e){let t=ta(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Cy(i,e){let t=ta(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Iy(i,e){i.uniform1iv(this.addr,e)}function Py(i,e){i.uniform2iv(this.addr,e)}function Ly(i,e){i.uniform3iv(this.addr,e)}function Ny(i,e){i.uniform4iv(this.addr,e)}function Dy(i,e){i.uniform1uiv(this.addr,e)}function Uy(i,e){i.uniform2uiv(this.addr,e)}function Oy(i,e){i.uniform3uiv(this.addr,e)}function Fy(i,e){i.uniform4uiv(this.addr,e)}function By(i,e,t){let n=this.cache,r=e.length,s=dc(t,r),a;Nn(n,s)||(i.uniform1iv(this.addr,s),Dn(n,s)),a=this.type===i.SAMPLER_2D_SHADOW?Vu:rm;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function zy(i,e,t){let n=this.cache,r=e.length,s=dc(t,r);Nn(n,s)||(i.uniform1iv(this.addr,s),Dn(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||am,s[a])}function Vy(i,e,t){let n=this.cache,r=e.length,s=dc(t,r);Nn(n,s)||(i.uniform1iv(this.addr,s),Dn(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||om,s[a])}function ky(i,e,t){let n=this.cache,r=e.length,s=dc(t,r);Nn(n,s)||(i.uniform1iv(this.addr,s),Dn(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||sm,s[a])}function Gy(i){switch(i){case 5126:return by;case 35664:return Ty;case 35665:return Ey;case 35666:return wy;case 35674:return Ay;case 35675:return Ry;case 35676:return Cy;case 5124:case 35670:return Iy;case 35667:case 35671:return Py;case 35668:case 35672:return Ly;case 35669:case 35673:return Ny;case 5125:return Dy;case 36294:return Uy;case 36295:return Oy;case 36296:return Fy;case 35678:case 36198:case 36298:case 36306:case 35682:return By;case 35679:case 36299:case 36307:return zy;case 35680:case 36300:case 36308:case 36293:return Vy;case 36289:case 36303:case 36311:case 36292:return ky}}var ku=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=My(t.type)}},Gu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gy(t.type)}},Hu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},Bu=/(\w+)(\])?(\[|\.)?/g;function Wf(i,e){i.seq.push(e),i.map[e.id]=e}function Hy(i,e,t){let n=i.name,r=n.length;for(Bu.lastIndex=0;;){let s=Bu.exec(n),a=Bu.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===r){Wf(t,c===void 0?new ku(o,i,e):new Gu(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new Hu(o),Wf(t,h)),t=h}}}var ea=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a);Hy(o,e.getUniformLocation(t,o.name),this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function Xf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Wy=0;function Xy(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var qf=new ct;function qy(i){Ct._getMatrix(qf,Ct.workingColorSpace,i);let e=`mat3( ${qf.elements.map(t=>t.toFixed(4))} )`;switch(Ct.getTransfer(i)){case Mu:return[e,"LinearTransferOETF"];case en:return[e,"sRGBTransferOETF"];default:return et("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function jf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Xy(i.getShaderSource(e),a)}return r}function jy(i,e){let t=qy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Yy={[Ph]:"Linear",[Lh]:"Reinhard",[Nh]:"Cineon",[Dh]:"ACESFilmic",[Oh]:"AgX",[Fh]:"Neutral",[Uh]:"Custom"};function $y(i,e){let t=Yy[e];return t===void 0?(et("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var oc=new P;function Zy(){return Ct.getLuminanceCoefficients(oc),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${oc.x.toFixed(4)}, ${oc.y.toFixed(4)}, ${oc.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(to).join(`
`)}function Ky(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Qy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function to(i){return i!==""}function Yf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $f(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var e1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wu(i){return i.replace(e1,n1)}var t1=new Map;function n1(i,e){let t=yt[e];if(t===void 0){let n=t1.get(e);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=yt[n],et('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Wu(t)}var i1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zf(i){return i.replace(i1,r1)}function r1(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Jf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var s1={[Ya]:"SHADOWMAP_TYPE_PCF",[Ys]:"SHADOWMAP_TYPE_VSM"};function a1(i){return s1[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var o1={[Js]:"ENVMAP_TYPE_CUBE",[rs]:"ENVMAP_TYPE_CUBE",[$a]:"ENVMAP_TYPE_CUBE_UV"};function l1(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":o1[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var c1={[rs]:"ENVMAP_MODE_REFRACTION"};function h1(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":c1[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var u1={[rf]:"ENVMAP_BLENDING_MULTIPLY",[sf]:"ENVMAP_BLENDING_MIX",[af]:"ENVMAP_BLENDING_ADD"};function d1(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":u1[i.combine]||"ENVMAP_BLENDING_NONE"}function p1(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function f1(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=a1(t),c=l1(t),h=h1(t),p=d1(t),d=p1(t),u=Jy(t),m=Ky(s),f=r.createProgram(),v,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(to).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(to).join(`
`),g.length>0&&(g+=`
`)):(v=[Jf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(to).join(`
`),g=[Jf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Oi?"#define TONE_MAPPING":"",t.toneMapping!==Oi?yt.tonemapping_pars_fragment:"",t.toneMapping!==Oi?$y("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",yt.colorspace_pars_fragment,jy("linearToOutputTexel",t.outputColorSpace),Zy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(to).join(`
`)),a=Wu(a),a=Yf(a,t),a=$f(a,t),o=Wu(o),o=Yf(o,t),o=$f(o,t),a=Zf(a),o=Zf(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===bu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=_+v+a,T=_+g+o,S=Xf(r,r.VERTEX_SHADER,M),b=Xf(r,r.FRAGMENT_SHADER,T);function I(j){if(i.debug.checkShaderErrors){let V=r.getProgramInfoLog(f)||"",Q=r.getShaderInfoLog(S)||"",ae=r.getShaderInfoLog(b)||"",ie=V.trim(),ne=Q.trim(),N=ae.trim(),J=!0,ce=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,f,S,b);else{let Oe=jf(r,S,"vertex"),xe=jf(r,b,"fragment");rt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+j.name+`
Material Type: `+j.type+`

Program Info Log: `+ie+`
`+Oe+`
`+xe)}else ie!==""?et("WebGLProgram: Program Info Log:",ie):ne!==""&&N!==""||(ce=!1);ce&&(j.diagnostics={runnable:J,programLog:ie,vertexShader:{log:ne,prefix:v},fragmentShader:{log:N,prefix:g}})}r.deleteShader(S),r.deleteShader(b),O=new ea(r,f),k=Qy(r,f)}let O,k;r.attachShader(f,S),r.attachShader(f,b),t.index0AttributeName!==void 0?r.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f),this.getUniforms=function(){return O===void 0&&I(this),O},this.getAttributes=function(){return k===void 0&&I(this),k};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(f,37297)),D},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Wy++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=S,this.fragmentShader=b,this}var m1=0,Xu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new qu(e),t.set(e,n)),n}},qu=class{constructor(e){this.id=m1++,this.code=e,this.usedTimes=0}};function g1(i){return i===ls||i===ec||i===tc}function _1(i,e,t,n,r,s){let a=new Ta,o=new Xu,l=new Set,c=[],h=new Map,p=n.logarithmicDepthBuffer,d=n.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,g,_,M,T){let S=_.fog,b=M.geometry,I=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?_.environment:null,O=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,k=e.get(f.envMap||I,O),D=k&&k.mapping===$a?k.image.height:null,j=u[f.type];f.precision!==null&&(d=n.getMaxPrecision(f.precision),d!==f.precision&&et("WebGLProgram.getParameters:",f.precision,"not supported, using",d,"instead."));let V=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,Q=V!==void 0?V.length:0,ae,ie,ne,N,J=0;if(b.morphAttributes.position!==void 0&&(J=1),b.morphAttributes.normal!==void 0&&(J=2),b.morphAttributes.color!==void 0&&(J=3),j){let Cn=nr[j];ae=Cn.vertexShader,ie=Cn.fragmentShader}else{ae=f.vertexShader,ie=f.fragmentShader;let Cn=o.getVertexShaderStage(f),dn=o.getFragmentShaderStage(f);o.update(f,Cn,dn),ne=Cn.id,N=dn.id}let ce=i.getRenderTarget(),Oe=i.state.buffers.depth.getReversed(),xe=M.isInstancedMesh===!0,Be=M.isBatchedMesh===!0,we=!!f.map,ue=!!f.matcap,X=!!k,te=!!f.aoMap,le=!!f.lightMap,he=!!f.bumpMap&&f.wireframe===!1,w=!!f.normalMap,E=!!f.displacementMap,C=!!f.emissiveMap,U=!!f.metalnessMap,y=!!f.roughnessMap,z=f.anisotropy>0,F=f.clearcoat>0,R=f.dispersion>0,q=f.retroreflectivity>0,Y=f.iridescence>0,K=f.sheen>0,de=f.transmission>0,Te=z&&!!f.anisotropyMap,De=F&&!!f.clearcoatMap,_e=F&&!!f.clearcoatNormalMap,Ve=F&&!!f.clearcoatRoughnessMap,oe=Y&&!!f.iridescenceMap,pe=Y&&!!f.iridescenceThicknessMap,me=K&&!!f.sheenColorMap,Le=K&&!!f.sheenRoughnessMap,Vt=!!f.specularMap,mt=!!f.specularColorMap,kt=!!f.specularIntensityMap,xn=de&&!!f.transmissionMap,Me=de&&!!f.thicknessMap,nt=!!f.gradientMap,ge=!!f.alphaMap,Ut=f.alphaTest>0,St=!!f.alphaHash,Ft=!!f.extensions,Bt=Oi;f.toneMapped&&(ce!==null&&ce.isXRRenderTarget!==!0||(Bt=i.toneMapping));let fn={shaderID:j,shaderType:f.type,shaderName:f.name,vertexShader:ae,fragmentShader:ie,defines:f.defines,customVertexShaderID:ne,customFragmentShaderID:N,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:d,batching:Be,batchingColor:Be&&M._colorsTexture!==null,instancing:xe,instancingColor:xe&&M.instanceColor!==null,instancingMorph:xe&&M.morphTexture!==null,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Ct.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:we,matcap:ue,envMap:X,envMapMode:X&&k.mapping,envMapCubeUVHeight:D,aoMap:te,lightMap:le,bumpMap:he,normalMap:w,displacementMap:E,emissiveMap:C,normalMapObjectSpace:w&&f.normalMapType===mf,normalMapTangentSpace:w&&f.normalMapType===yu,packedNormalMap:w&&f.normalMapType===yu&&g1(f.normalMap.format),metalnessMap:U,roughnessMap:y,anisotropy:z,anisotropyMap:Te,clearcoat:F,clearcoatMap:De,clearcoatNormalMap:_e,clearcoatRoughnessMap:Ve,dispersion:R,retroreflection:q,iridescence:Y,iridescenceMap:oe,iridescenceThicknessMap:pe,sheen:K,sheenColorMap:me,sheenRoughnessMap:Le,specularMap:Vt,specularColorMap:mt,specularIntensityMap:kt,transmission:de,transmissionMap:xn,thicknessMap:Me,gradientMap:nt,opaque:f.transparent===!1&&f.blending===Ei&&f.alphaToCoverage===!1,alphaMap:ge,alphaTest:Ut,alphaHash:St,combine:f.combine,mapUv:we&&m(f.map.channel),aoMapUv:te&&m(f.aoMap.channel),lightMapUv:le&&m(f.lightMap.channel),bumpMapUv:he&&m(f.bumpMap.channel),normalMapUv:w&&m(f.normalMap.channel),displacementMapUv:E&&m(f.displacementMap.channel),emissiveMapUv:C&&m(f.emissiveMap.channel),metalnessMapUv:U&&m(f.metalnessMap.channel),roughnessMapUv:y&&m(f.roughnessMap.channel),anisotropyMapUv:Te&&m(f.anisotropyMap.channel),clearcoatMapUv:De&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:_e&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ve&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:me&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:Le&&m(f.sheenRoughnessMap.channel),specularMapUv:Vt&&m(f.specularMap.channel),specularColorMapUv:mt&&m(f.specularColorMap.channel),specularIntensityMapUv:kt&&m(f.specularIntensityMap.channel),transmissionMapUv:xn&&m(f.transmissionMap.channel),thicknessMapUv:Me&&m(f.thicknessMap.channel),alphaMapUv:ge&&m(f.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(w||z),vertexNormals:!!b.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:M.isPoints===!0&&!!b.attributes.uv&&(we||ge),fog:!!S,useFog:f.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||b.attributes.normal===void 0&&w===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Oe,skinning:M.isSkinnedMesh===!0,hasPositionAttribute:b.attributes.position!==void 0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:J,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:T.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&g.length>0,shadowMapType:i.shadowMap.type,toneMapping:Bt,decodeVideoTexture:we&&f.map.isVideoTexture===!0&&Ct.getTransfer(f.map.colorSpace)===en,decodeVideoTextureEmissive:C&&f.emissiveMap.isVideoTexture===!0&&Ct.getTransfer(f.emissiveMap.colorSpace)===en,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Ji,flipSided:f.side===Kn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Ft&&f.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&f.extensions.multiDraw===!0||Be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return fn.vertexUv1s=l.has(1),fn.vertexUv2s=l.has(2),fn.vertexUv3s=l.has(3),l.clear(),fn},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let g in f.defines)v.push(g),v.push(f.defines[g]);return f.isRawShaderMaterial===!1&&((function(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numSunLights),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numSunLightShadows),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)})(v,f),(function(g,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.retroreflection&&a.enable(24),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),g.push(a.mask)})(v,f),v.push(i.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=u[f.type],g;if(v){let _=nr[v];g=Lf.clone(_.uniforms)}else g=f.uniforms;return g},acquireProgram:function(f,v){let g=h.get(v);return g!==void 0?++g.usedTimes:(g=new f1(i,v,f,r),c.push(g),h.set(v,g)),g},releaseProgram:function(f){if(--f.usedTimes===0){let v=c.indexOf(f);c[v]=c[c.length-1],c.pop(),h.delete(f.cacheKey),f.destroy()}},releaseShaderCache:function(f){o.remove(f)},programs:c,dispose:function(){o.dispose()}}}function v1(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function x1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Kf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Qf(){let i=[],e=0,t=[],n=[],r=[];function s(o){let l=0;return o.isInstancedMesh&&(l+=2),o.isSkinnedMesh&&(l+=1),l}function a(o,l,c,h,p,d){let u=i[e];return u===void 0?(u={id:o.id,object:o,geometry:l,material:c,materialVariant:s(o),groupOrder:h,renderOrder:o.renderOrder,z:p,group:d},i[e]=u):(u.id=o.id,u.object=o,u.geometry=l,u.material=c,u.materialVariant=s(o),u.groupOrder=h,u.renderOrder=o.renderOrder,u.z=p,u.group=d),e++,u}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,l,c,h,p,d,u){u.reversedDepth===!0&&(p=-p);let m=a(o,l,c,h,p,d);c.transmission>0?n.push(m):c.transparent===!0?r.push(m):t.push(m)},unshift:function(o,l,c,h,p,d){let u=a(o,l,c,h,p,d);c.transmission>0?n.unshift(u):c.transparent===!0?r.unshift(u):t.unshift(u)},finish:function(){for(let o=e,l=i.length;o<l;o++){let c=i[o];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(o,l){t.length>1&&t.sort(o||x1),n.length>1&&n.sort(l||Kf),r.length>1&&r.sort(l||Kf)}}}function y1(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new Qf,i.set(e,[r])):t>=n.length?(r=new Qf,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function S1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new ft};break;case"SpotLight":t={position:new P,direction:new P,color:new ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new ft,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new ft,groundColor:new ft};break;case"RectAreaLight":t={color:new ft,position:new P,halfWidth:new P,halfHeight:new P}}return i[e.id]=t,t}}}function M1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3}}return i[e.id]=t,t}}}var b1=0;function T1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function E1(i){let e=new S1,t=M1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new P);let r=new P,s=new vt,a=new vt;return{setup:function(o){let l=0,c=0,h=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let p=0,d=0,u=0,m=0,f=0,v=0,g=0,_=0,M=0,T=0,S=0,b=0,I=0,O=0;o.sort(T1);for(let D=0,j=o.length;D<j;D++){let V=o[D],Q=V.color,ae=V.intensity,ie=V.distance,ne=null;if(V.shadow&&V.shadow.map&&(ne=V.shadow.map.texture.format===ls?V.shadow.map.texture:V.shadow.map.depthTexture||V.shadow.map.texture),V.isAmbientLight)l+=Q.r*ae,c+=Q.g*ae,h+=Q.b*ae;else if(V.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(V.sh.coefficients[N],ae);O++}else if(V.isSunLight){let N=e.get(V);if(N.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){let J=V.shadow,ce=t.get(V);ce.shadowIntensity=J.intensity,ce.shadowBias=J.bias,ce.shadowNormalBias=J.normalBias,ce.shadowRadius=J.radius,ce.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[d]=ce,n.sunShadowMap[d]=ne;let Oe=J.getViewportCount();for(let xe=0;xe<Oe;xe++)n.sunShadowMatrix[u+xe]=J.getMatrix(xe),n.sunShadowCascade[u+xe]=J._cascadeData[xe];u+=Oe,d++}n.sun[p]=N,p++}else if(V.isDirectionalLight){let N=e.get(V);if(N.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){let J=V.shadow,ce=t.get(V);ce.shadowIntensity=J.intensity,ce.shadowBias=J.bias,ce.shadowNormalBias=J.normalBias,ce.shadowRadius=J.radius,ce.shadowMapSize=J.mapSize,n.directionalShadow[m]=ce,n.directionalShadowMap[m]=ne,n.directionalShadowMatrix[m]=V.shadow.matrix,M++}n.directional[m]=N,m++}else if(V.isSpotLight){let N=e.get(V);N.position.setFromMatrixPosition(V.matrixWorld),N.color.copy(Q).multiplyScalar(ae),N.distance=ie,N.coneCos=Math.cos(V.angle),N.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),N.decay=V.decay,n.spot[v]=N;let J=V.shadow;if(V.map&&(n.spotLightMap[b]=V.map,b++,J.updateMatrices(V),V.castShadow&&I++),n.spotLightMatrix[v]=J.matrix,V.castShadow){let ce=t.get(V);ce.shadowIntensity=J.intensity,ce.shadowBias=J.bias,ce.shadowNormalBias=J.normalBias,ce.shadowRadius=J.radius,ce.shadowMapSize=J.mapSize,n.spotShadow[v]=ce,n.spotShadowMap[v]=ne,S++}v++}else if(V.isRectAreaLight){let N=e.get(V);N.color.copy(Q).multiplyScalar(ae),N.halfWidth.set(.5*V.width,0,0),N.halfHeight.set(0,.5*V.height,0),n.rectArea[g]=N,g++}else if(V.isPointLight){let N=e.get(V);if(N.color.copy(V.color).multiplyScalar(V.intensity),N.distance=V.distance,N.decay=V.decay,V.castShadow){let J=V.shadow,ce=t.get(V);ce.shadowIntensity=J.intensity,ce.shadowBias=J.bias,ce.shadowNormalBias=J.normalBias,ce.shadowRadius=J.radius,ce.shadowMapSize=J.mapSize,ce.shadowCameraNear=J.camera.near,ce.shadowCameraFar=J.camera.far,n.pointShadow[f]=ce,n.pointShadowMap[f]=ne,n.pointShadowMatrix[f]=V.shadow.matrix,T++}n.point[f]=N,f++}else if(V.isHemisphereLight){let N=e.get(V);N.skyColor.copy(V.color).multiplyScalar(ae),N.groundColor.copy(V.groundColor).multiplyScalar(ae),n.hemi[_]=N,_++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let k=n.hash;k.sunLength===p&&k.directionalLength===m&&k.pointLength===f&&k.spotLength===v&&k.rectAreaLength===g&&k.hemiLength===_&&k.numSunShadows===d&&k.numDirectionalShadows===M&&k.numPointShadows===T&&k.numSpotShadows===S&&k.numSpotMaps===b&&k.numLightProbes===O||(n.sun.length=p,n.directional.length=m,n.spot.length=v,n.rectArea.length=g,n.point.length=f,n.hemi.length=_,n.sunShadow.length=d,n.sunShadowMap.length=d,n.sunShadowMatrix.length=u,n.sunShadowCascade.length=u,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=S,n.spotShadowMap.length=S,n.spotLightMatrix.length=S+b-I,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=O,k.sunLength=p,k.directionalLength=m,k.pointLength=f,k.spotLength=v,k.rectAreaLength=g,k.hemiLength=_,k.numSunShadows=d,k.numDirectionalShadows=M,k.numPointShadows=T,k.numSpotShadows=S,k.numSpotMaps=b,k.numLightProbes=O,n.version=b1++)},setupView:function(o,l){let c=0,h=0,p=0,d=0,u=0,m=0,f=l.matrixWorldInverse;for(let v=0,g=o.length;v<g;v++){let _=o[v];if(_.isSunLight){let M=n.sun[c];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(f),c++}else if(_.isDirectionalLight){let M=n.directional[h];M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),h++}else if(_.isSpotLight){let M=n.spot[d];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),d++}else if(_.isRectAreaLight){let M=n.rectArea[u];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),a.identity(),s.copy(_.matrixWorld),s.premultiply(f),a.extractRotation(s),M.halfWidth.set(.5*_.width,0,0),M.halfHeight.set(0,.5*_.height,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),u++}else if(_.isPointLight){let M=n.point[p];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(f),m++}}},state:n}}function em(i){let e=new E1(i),t=[],n=[],r=[],s={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,t.length=0,n.length=0,r.length=0},state:s,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){r.push(a)}}}function w1(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new em(i),e.set(t,[s])):n>=r.length?(s=new em(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}var A1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R1=`uniform sampler2D shadow_pass;
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
}`,C1=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],I1=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],tm=new vt,eo=new P,zu=new P;function P1(i,e,t){let n=new Nr,r=new fe,s=new fe,a=new Qt,o=new Cl,l=new Il,c={},h=t.maxTextureSize,p={[$s]:Kn,[Kn]:$s,[Ji]:Ji},d=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:A1,fragmentShader:R1}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new Et;m.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let f=new Jn(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ya;let g=this.type;function _(b,I){let O=e.update(f);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,u.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),b.mapPass===null?b.mapPass=new ci(r.x,r.y,{format:ls,type:Qi}):b.mapPass.width===b.map.width&&b.mapPass.height===b.map.height||b.mapPass.setSize(b.map.width,b.map.height),d.uniforms.shadow_pass.value=b.map.depthTexture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(I,null,O,d,f,null),u.uniforms.shadow_pass.value=b.mapPass.texture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(I,null,O,u,f,null)}function M(b,I,O,k){let D=null,j=O.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(j!==void 0)D=j;else if(D=O.isPointLight===!0?l:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let V=D.uuid,Q=I.uuid,ae=c[V];ae===void 0&&(ae={},c[V]=ae);let ie=ae[Q];ie===void 0&&(ie=D.clone(),ae[Q]=ie,I.addEventListener("dispose",S)),D=ie}return D.visible=I.visible,D.wireframe=I.wireframe,D.side=k===Ys?I.shadowSide!==null?I.shadowSide:I.side:I.shadowSide!==null?I.shadowSide:p[I.side],D.alphaMap=I.alphaMap,D.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,D.map=I.map,D.clipShadows=I.clipShadows,D.clippingPlanes=I.clippingPlanes,D.clipIntersection=I.clipIntersection,D.displacementMap=I.displacementMap,D.displacementScale=I.displacementScale,D.displacementBias=I.displacementBias,D.wireframeLinewidth=I.wireframeLinewidth,D.linewidth=I.linewidth,O.isPointLight===!0&&D.isMeshDistanceMaterial===!0&&(i.properties.get(D).light=O),D}function T(b,I,O,k,D){if(b.visible===!1)return;if(b.layers.test(I.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&D===Ys)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld);let V=e.update(b),Q=b.material;if(Array.isArray(Q)){let ae=V.groups;for(let ie=0,ne=ae.length;ie<ne;ie++){let N=ae[ie],J=Q[N.materialIndex];if(J&&J.visible){let ce=M(b,J,k,D);b.onBeforeShadow(i,b,I,O,V,ce,N),i.renderBufferDirect(O,null,V,ce,b,N),b.onAfterShadow(i,b,I,O,V,ce,N)}}}else if(Q.visible){let ae=M(b,Q,k,D);b.onBeforeShadow(i,b,I,O,V,ae,null),i.renderBufferDirect(O,null,V,ae,b,null),b.onAfterShadow(i,b,I,O,V,ae,null)}}let j=b.children;for(let V=0,Q=j.length;V<Q;V++)T(j[V],I,O,k,D)}function S(b){b.target.removeEventListener("dispose",S);for(let I in c){let O=c[I],k=b.target.uuid;k in O&&(O[k].dispose(),delete O[k])}}this.render=function(b,I,O){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||b.length===0)return;this.type===Op&&(et("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ya);let k=i.getRenderTarget(),D=i.getActiveCubeFace(),j=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Ki),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let Q=g!==this.type;Q&&I.traverse(function(ae){ae.material&&(Array.isArray(ae.material)?ae.material.forEach(ie=>ie.needsUpdate=!0):ae.material.needsUpdate=!0)});for(let ae=0,ie=b.length;ae<ie;ae++){let ne=b[ae],N=ne.shadow;if(N===void 0){et("WebGLShadowMap:",ne,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);let J=N.getFrameExtents();r.multiply(J),s.copy(N.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/J.x),r.x=s.x*J.x,N.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/J.y),r.y=s.y*J.y,N.mapSize.y=s.y));let ce=i.state.buffers.depth.getReversed();if(N.camera._reversedDepth=ce,N.map===null||Q===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===Ys){if(ne.isPointLight){et("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new ci(r.x,r.y,{format:ls,type:Qi,minFilter:Qn,magFilter:Qn,generateMipmaps:!1}),N.map.texture.name=ne.name+".shadowMap",N.map.depthTexture=new Ur(r.x,r.y,wi),N.map.depthTexture.name=ne.name+".shadowMapDepth",N.map.depthTexture.format=as,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Fi,N.map.depthTexture.magFilter=Fi}else ne.isPointLight?(N.map=new cc(r.x),N.map.depthTexture=new sl(r.x,Br)):(N.map=new ci(r.x,r.y),N.map.depthTexture=new Ur(r.x,r.y,Br)),N.map.depthTexture.name=ne.name+".shadowMap",N.map.depthTexture.format=as,this.type===Ya?(N.map.depthTexture.compareFunction=ce?rc:ic,N.map.depthTexture.minFilter=Qn,N.map.depthTexture.magFilter=Qn):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Fi,N.map.depthTexture.magFilter=Fi);N.camera.updateProjectionMatrix()}N.map.isWebGLCubeRenderTarget===!0||N.map.width===r.x&&N.map.height===r.y||N.map.setSize(r.x,r.y);let Oe=N.map.isWebGLCubeRenderTarget?6:N.getViewportCount();ne.isPointLight!==!0&&N.updateMatrices(ne,O);for(let xe=0;xe<Oe;xe++){let Be=N.getCamera(xe);if(ne.isPointLight){let we=N.camera,ue=N.matrix,X=ne.distance||we.far;X!==we.far&&(we.far=X,we.updateProjectionMatrix()),eo.setFromMatrixPosition(ne.matrixWorld),we.position.copy(eo),zu.copy(we.position),zu.add(C1[xe]),we.up.copy(I1[xe]),we.lookAt(zu),we.updateMatrixWorld(),ue.makeTranslation(-eo.x,-eo.y,-eo.z),tm.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),N._frustum.setFromProjectionMatrix(tm,we.coordinateSystem,we.reversedDepth)}if(N.map.isWebGLCubeRenderTarget)i.setRenderTarget(N.map,xe),i.clear();else{xe===0&&(i.setRenderTarget(N.map),i.clear());let we=N.getViewport(xe);a.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),V.viewport(a)}n=N.getFrustum(xe),T(I,O,Be,ne,this.type)}N.isPointLightShadow!==!0&&this.type===Ys&&_(N,O),N.needsUpdate=!1}g=this.type,v.needsUpdate=!1,i.setRenderTarget(k,D,j)}}function L1(i,e){let t=new function(){let y=!1,z=new Qt,F=null,R=new Qt(0,0,0,0);return{setMask:function(q){F===q||y||(i.colorMask(q,q,q,q),F=q)},setLocked:function(q){y=q},setClear:function(q,Y,K,de,Te){Te===!0&&(q*=de,Y*=de,K*=de),z.set(q,Y,K,de),R.equals(z)===!1&&(i.clearColor(q,Y,K,de),R.copy(z))},reset:function(){y=!1,F=null,R.set(-1,0,0,0)}}},n=new function(){let y=!1,z=!1,F=null,R=null,q=null;return{setReversed:function(Y){if(z!==Y){let K=e.get("EXT_clip_control");Y?K.clipControlEXT(K.LOWER_LEFT_EXT,K.ZERO_TO_ONE_EXT):K.clipControlEXT(K.LOWER_LEFT_EXT,K.NEGATIVE_ONE_TO_ONE_EXT),z=Y;let de=q;q=null,this.setClear(de)}},getReversed:function(){return z},setTest:function(Y){Y?X(i.DEPTH_TEST):te(i.DEPTH_TEST)},setMask:function(Y){F===Y||y||(i.depthMask(Y),F=Y)},setFunc:function(Y){if(z&&(Y=Ef[Y]),R!==Y){switch(Y){case Th:i.depthFunc(i.NEVER);break;case Eh:i.depthFunc(i.ALWAYS);break;case wh:i.depthFunc(i.LESS);break;case Wl:i.depthFunc(i.LEQUAL);break;case Ah:i.depthFunc(i.EQUAL);break;case Rh:i.depthFunc(i.GEQUAL);break;case Ch:i.depthFunc(i.GREATER);break;case Ih:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}R=Y}},setLocked:function(Y){y=Y},setClear:function(Y){q!==Y&&(q=Y,z&&(Y=1-Y),i.clearDepth(Y))},reset:function(){y=!1,F=null,R=null,q=null,z=!1}}},r=new function(){let y=!1,z=null,F=null,R=null,q=null,Y=null,K=null,de=null,Te=null;return{setTest:function(De){y||(De?X(i.STENCIL_TEST):te(i.STENCIL_TEST))},setMask:function(De){z===De||y||(i.stencilMask(De),z=De)},setFunc:function(De,_e,Ve){F===De&&R===_e&&q===Ve||(i.stencilFunc(De,_e,Ve),F=De,R=_e,q=Ve)},setOp:function(De,_e,Ve){Y===De&&K===_e&&de===Ve||(i.stencilOp(De,_e,Ve),Y=De,K=_e,de=Ve)},setLocked:function(De){y=De},setClear:function(De){Te!==De&&(i.clearStencil(De),Te=De)},reset:function(){y=!1,z=null,F=null,R=null,q=null,Y=null,K=null,de=null,Te=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,M=null,T=null,S=new ft(0,0,0),b=0,I=!1,O=null,k=null,D=null,j=null,V=null,Q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ae=!1,ie=0,ne=i.getParameter(i.VERSION);ne.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(ne)[1]),ae=ie>=1):ne.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),ae=ie>=2);let N=null,J={},ce=i.getParameter(i.SCISSOR_BOX),Oe=i.getParameter(i.VIEWPORT),xe=new Qt().fromArray(ce),Be=new Qt().fromArray(Oe);function we(y,z,F,R){let q=new Uint8Array(4),Y=i.createTexture();i.bindTexture(y,Y),i.texParameteri(y,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(y,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let K=0;K<F;K++)y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?i.texImage3D(z,0,i.RGBA,1,1,R,0,i.RGBA,i.UNSIGNED_BYTE,q):i.texImage2D(z+K,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,q);return Y}let ue={};function X(y){o[y]!==!0&&(i.enable(y),o[y]=!0)}function te(y){o[y]!==!1&&(i.disable(y),o[y]=!1)}ue[i.TEXTURE_2D]=we(i.TEXTURE_2D,i.TEXTURE_2D,1),ue[i.TEXTURE_CUBE_MAP]=we(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[i.TEXTURE_2D_ARRAY]=we(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ue[i.TEXTURE_3D]=we(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),X(i.DEPTH_TEST),n.setFunc(Wl),E(!1),C(Sh),X(i.CULL_FACE),w(Ki);let le={[Zs]:i.FUNC_ADD,[Bp]:i.FUNC_SUBTRACT,[zp]:i.FUNC_REVERSE_SUBTRACT};le[Vp]=i.MIN,le[kp]=i.MAX;let he={[Gp]:i.ZERO,[Hp]:i.ONE,[Wp]:i.SRC_COLOR,[qp]:i.SRC_ALPHA,[Kp]:i.SRC_ALPHA_SATURATE,[Zp]:i.DST_COLOR,[Yp]:i.DST_ALPHA,[Xp]:i.ONE_MINUS_SRC_COLOR,[jp]:i.ONE_MINUS_SRC_ALPHA,[Jp]:i.ONE_MINUS_DST_COLOR,[$p]:i.ONE_MINUS_DST_ALPHA,[Qp]:i.CONSTANT_COLOR,[ef]:i.ONE_MINUS_CONSTANT_COLOR,[tf]:i.CONSTANT_ALPHA,[nf]:i.ONE_MINUS_CONSTANT_ALPHA};function w(y,z,F,R,q,Y,K,de,Te,De){if(y!==Ki){if(u===!1&&(X(i.BLEND),u=!0),y===Fp)q=q||z,Y=Y||F,K=K||R,z===f&&q===_||(i.blendEquationSeparate(le[z],le[q]),f=z,_=q),F===v&&R===g&&Y===M&&K===T||(i.blendFuncSeparate(he[F],he[R],he[Y],he[K]),v=F,g=R,M=Y,T=K),de.equals(S)!==!1&&Te===b||(i.blendColor(de.r,de.g,de.b,Te),S.copy(de),b=Te),m=y,I=!1;else if(y!==m||De!==I){if(f===Zs&&_===Zs||(i.blendEquation(i.FUNC_ADD),f=Zs,_=Zs),De)switch(y){case Ei:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case mr:i.blendFunc(i.ONE,i.ONE);break;case Mh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case bh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:rt("WebGLState: Invalid blending: ",y)}else switch(y){case Ei:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case mr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Mh:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bh:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",y)}v=null,g=null,M=null,T=null,S.set(0,0,0),b=0,m=y,I=De}}else u===!0&&(te(i.BLEND),u=!1)}function E(y){O!==y&&(y?i.frontFace(i.CW):i.frontFace(i.CCW),O=y)}function C(y){y!==Dp?(X(i.CULL_FACE),y!==k&&(y===Sh?i.cullFace(i.BACK):y===Up?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):te(i.CULL_FACE),k=y}function U(y,z,F){y?(X(i.POLYGON_OFFSET_FILL),j===z&&V===F||(j=z,V=F,n.getReversed()&&(z=-z),i.polygonOffset(z,F))):te(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:X,disable:te,bindFramebuffer:function(y,z){return c[y]!==z&&(i.bindFramebuffer(y,z),c[y]=z,y===i.DRAW_FRAMEBUFFER&&(c[i.FRAMEBUFFER]=z),y===i.FRAMEBUFFER&&(c[i.DRAW_FRAMEBUFFER]=z),!0)},drawBuffers:function(y,z){let F=p,R=!1;if(y){F=h.get(z),F===void 0&&(F=[],h.set(z,F));let q=y.textures;if(F.length!==q.length||F[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,K=q.length;Y<K;Y++)F[Y]=i.COLOR_ATTACHMENT0+Y;F.length=q.length,R=!0}}else F[0]!==i.BACK&&(F[0]=i.BACK,R=!0);R&&i.drawBuffers(F)},useProgram:function(y){return d!==y&&(i.useProgram(y),d=y,!0)},setBlending:w,setMaterial:function(y,z){y.side===Ji?te(i.CULL_FACE):X(i.CULL_FACE);let F=y.side===Kn;z&&(F=!F),E(F),y.blending===Ei&&y.transparent===!1?w(Ki):w(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),n.setFunc(y.depthFunc),n.setTest(y.depthTest),n.setMask(y.depthWrite),t.setMask(y.colorWrite);let R=y.stencilWrite;r.setTest(R),R&&(r.setMask(y.stencilWriteMask),r.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),r.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),U(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?X(i.SAMPLE_ALPHA_TO_COVERAGE):te(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:C,setLineWidth:function(y){y!==D&&(ae&&i.lineWidth(y),D=y)},setPolygonOffset:U,setScissorTest:function(y){y?X(i.SCISSOR_TEST):te(i.SCISSOR_TEST)},activeTexture:function(y){y===void 0&&(y=i.TEXTURE0+Q-1),N!==y&&(i.activeTexture(y),N=y)},bindTexture:function(y,z,F){F===void 0&&(F=N===null?i.TEXTURE0+Q-1:N);let R=J[F];R===void 0&&(R={type:void 0,texture:void 0},J[F]=R),R.type===y&&R.texture===z||(N!==F&&(i.activeTexture(F),N=F),i.bindTexture(y,z||ue[y]),R.type=y,R.texture=z)},unbindTexture:function(){let y=J[N];y!==void 0&&y.type!==void 0&&(i.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(y){rt("WebGLState:",y)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(y){rt("WebGLState:",y)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(y){rt("WebGLState:",y)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(y){rt("WebGLState:",y)}},pixelStorei:function(y,z){l[y]!==z&&(i.pixelStorei(y,z),l[y]=z)},getParameter:function(y){return l[y]!==void 0?l[y]:i.getParameter(y)},updateUBOMapping:function(y,z){let F=a.get(z);F===void 0&&(F=new WeakMap,a.set(z,F));let R=F.get(y);R===void 0&&(R=i.getUniformBlockIndex(z,y.name),F.set(y,R))},uniformBlockBinding:function(y,z){let F=a.get(z).get(y);s.get(z)!==F&&(i.uniformBlockBinding(z,F,y.__bindingPointIndex),s.set(z,F))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(y){rt("WebGLState:",y)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(y){rt("WebGLState:",y)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(y){rt("WebGLState:",y)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(y){rt("WebGLState:",y)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(y){rt("WebGLState:",y)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(y){rt("WebGLState:",y)}},scissor:function(y){xe.equals(y)===!1&&(i.scissor(y.x,y.y,y.z,y.w),xe.copy(y))},viewport:function(y){Be.equals(y)===!1&&(i.viewport(y.x,y.y,y.z,y.w),Be.copy(y))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),o={},l={},N=null,J={},c={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,M=null,T=null,S=new ft(0,0,0),b=0,I=!1,O=null,k=null,D=null,j=null,V=null,xe.set(0,0,i.canvas.width,i.canvas.height),Be.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function N1(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new fe,h=new WeakMap,p=new Set,d,u=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(w,E){return m?new OffscreenCanvas(w,E):Sa("canvas")}function v(w,E,C){let U=1,y=he(w);if((y.width>C||y.height>C)&&(U=C/Math.max(y.width,y.height)),U<1){if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let z=Math.floor(U*y.width),F=Math.floor(U*y.height);d===void 0&&(d=f(z,F));let R=E?f(z,F):d;return R.width=z,R.height=F,R.getContext("2d").drawImage(w,0,0,z,F),et("WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+z+"x"+F+")."),R}return"data"in w&&et("WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),w}return w}function g(w){return w.generateMipmaps}function _(w){i.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(w,E,C,U,y,z=!1){if(w!==null){if(i[w]!==void 0)return i[w];et("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let F;U&&(F=e.get("EXT_texture_norm16"),F||et("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let R=E;if(E===i.RED&&(C===i.FLOAT&&(R=i.R32F),C===i.HALF_FLOAT&&(R=i.R16F),C===i.UNSIGNED_BYTE&&(R=i.R8),C===i.UNSIGNED_SHORT&&F&&(R=F.R16_EXT),C===i.SHORT&&F&&(R=F.R16_SNORM_EXT)),E===i.RED_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.R8UI),C===i.UNSIGNED_SHORT&&(R=i.R16UI),C===i.UNSIGNED_INT&&(R=i.R32UI),C===i.BYTE&&(R=i.R8I),C===i.SHORT&&(R=i.R16I),C===i.INT&&(R=i.R32I)),E===i.RG&&(C===i.FLOAT&&(R=i.RG32F),C===i.HALF_FLOAT&&(R=i.RG16F),C===i.UNSIGNED_BYTE&&(R=i.RG8),C===i.UNSIGNED_SHORT&&F&&(R=F.RG16_EXT),C===i.SHORT&&F&&(R=F.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RG8UI),C===i.UNSIGNED_SHORT&&(R=i.RG16UI),C===i.UNSIGNED_INT&&(R=i.RG32UI),C===i.BYTE&&(R=i.RG8I),C===i.SHORT&&(R=i.RG16I),C===i.INT&&(R=i.RG32I)),E===i.RGB_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RGB8UI),C===i.UNSIGNED_SHORT&&(R=i.RGB16UI),C===i.UNSIGNED_INT&&(R=i.RGB32UI),C===i.BYTE&&(R=i.RGB8I),C===i.SHORT&&(R=i.RGB16I),C===i.INT&&(R=i.RGB32I)),E===i.RGBA_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RGBA8UI),C===i.UNSIGNED_SHORT&&(R=i.RGBA16UI),C===i.UNSIGNED_INT&&(R=i.RGBA32UI),C===i.BYTE&&(R=i.RGBA8I),C===i.SHORT&&(R=i.RGBA16I),C===i.INT&&(R=i.RGBA32I)),E===i.RGB&&(C===i.UNSIGNED_SHORT&&F&&(R=F.RGB16_EXT),C===i.SHORT&&F&&(R=F.RGB16_SNORM_EXT),C===i.UNSIGNED_INT_5_9_9_9_REV&&(R=i.RGB9_E5),C===i.UNSIGNED_INT_10F_11F_11F_REV&&(R=i.R11F_G11F_B10F)),E===i.RGBA){let q=z?Mu:Ct.getTransfer(y);C===i.FLOAT&&(R=i.RGBA32F),C===i.HALF_FLOAT&&(R=i.RGBA16F),C===i.UNSIGNED_BYTE&&(R=q===en?i.SRGB8_ALPHA8:i.RGBA8),C===i.UNSIGNED_SHORT&&F&&(R=F.RGBA16_EXT),C===i.SHORT&&F&&(R=F.RGBA16_SNORM_EXT),C===i.UNSIGNED_SHORT_4_4_4_4&&(R=i.RGBA4),C===i.UNSIGNED_SHORT_5_5_5_1&&(R=i.RGB5_A1)}return R!==i.R16F&&R!==i.R32F&&R!==i.RG16F&&R!==i.RG32F&&R!==i.RGBA16F&&R!==i.RGBA32F||e.get("EXT_color_buffer_float"),R}function S(w,E){let C;return w?E===null||E===Br||E===Ks?C=i.DEPTH24_STENCIL8:E===wi?C=i.DEPTH32F_STENCIL8:E===Ja&&(C=i.DEPTH24_STENCIL8,et("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Br||E===Ks?C=i.DEPTH_COMPONENT24:E===wi?C=i.DEPTH_COMPONENT32F:E===Ja&&(C=i.DEPTH_COMPONENT16),C}function b(w,E){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Fi&&w.minFilter!==Qn?Math.log2(Math.max(E.width,E.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?E.mipmaps.length:1}function I(w){let E=w.target;E.removeEventListener("dispose",I),(function(C){let U=n.get(C);if(U.__webglInit===void 0)return;let y=C.source,z=u.get(y);if(z){let F=z[U.__cacheKey];F.usedTimes--,F.usedTimes===0&&k(C),Object.keys(z).length===0&&u.delete(y)}n.remove(C)})(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&p.delete(E)}function O(w){let E=w.target;E.removeEventListener("dispose",O),(function(C){let U=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(U.__webglFramebuffer[z]))for(let F=0;F<U.__webglFramebuffer[z].length;F++)i.deleteFramebuffer(U.__webglFramebuffer[z][F]);else i.deleteFramebuffer(U.__webglFramebuffer[z]);U.__webglDepthbuffer&&i.deleteRenderbuffer(U.__webglDepthbuffer[z])}else{if(Array.isArray(U.__webglFramebuffer))for(let z=0;z<U.__webglFramebuffer.length;z++)i.deleteFramebuffer(U.__webglFramebuffer[z]);else i.deleteFramebuffer(U.__webglFramebuffer);if(U.__webglDepthbuffer&&i.deleteRenderbuffer(U.__webglDepthbuffer),U.__webglMultisampledFramebuffer&&i.deleteFramebuffer(U.__webglMultisampledFramebuffer),U.__webglColorRenderbuffer)for(let z=0;z<U.__webglColorRenderbuffer.length;z++)U.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(U.__webglColorRenderbuffer[z]);U.__webglDepthRenderbuffer&&i.deleteRenderbuffer(U.__webglDepthRenderbuffer)}let y=C.textures;for(let z=0,F=y.length;z<F;z++){let R=n.get(y[z]);R.__webglTexture&&(i.deleteTexture(R.__webglTexture),a.memory.textures--),n.remove(y[z])}n.remove(C)})(E)}function k(w){let E=n.get(w);i.deleteTexture(E.__webglTexture);let C=w.source;delete u.get(C)[E.__cacheKey],a.memory.textures--}let D=0;function j(w,E){let C=n.get(w);if(w.isVideoTexture&&(function(U){let y=a.render.frame;h.get(U)!==y&&(h.set(U,y),U.update())})(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&C.__version!==w.version){let U=w.image;if(U===null)et("WebGLRenderer: Texture marked for update but no image data found.");else{if(U.complete!==!1)return void J(C,w,E);et("WebGLRenderer: Texture marked for update but image is incomplete")}}else w.isExternalTexture&&(C.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,C.__webglTexture,i.TEXTURE0+E)}let V={[jl]:i.REPEAT,[Yl]:i.CLAMP_TO_EDGE,[of]:i.MIRRORED_REPEAT},Q={[Fi]:i.NEAREST,[lf]:i.NEAREST_MIPMAP_NEAREST,[Za]:i.NEAREST_MIPMAP_LINEAR,[Qn]:i.LINEAR,[$l]:i.LINEAR_MIPMAP_NEAREST,[ss]:i.LINEAR_MIPMAP_LINEAR},ae={[gf]:i.NEVER,[Sf]:i.ALWAYS,[_f]:i.LESS,[ic]:i.LEQUAL,[vf]:i.EQUAL,[rc]:i.GEQUAL,[xf]:i.GREATER,[yf]:i.NOTEQUAL};function ie(w,E){if(E.type!==wi||e.has("OES_texture_float_linear")!==!1||E.magFilter!==Qn&&E.magFilter!==$l&&E.magFilter!==Za&&E.magFilter!==ss&&E.minFilter!==Qn&&E.minFilter!==$l&&E.minFilter!==Za&&E.minFilter!==ss||et("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,V[E.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,V[E.wrapT]),w!==i.TEXTURE_3D&&w!==i.TEXTURE_2D_ARRAY||i.texParameteri(w,i.TEXTURE_WRAP_R,V[E.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,Q[E.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,Q[E.minFilter]),E.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ae[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Fi||E.minFilter!==Za&&E.minFilter!==ss||E.type===wi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let C=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function ne(w,E){let C=!1;w.__webglInit===void 0&&(w.__webglInit=!0,E.addEventListener("dispose",I));let U=E.source,y=u.get(U);y===void 0&&(y={},u.set(U,y));let z=(function(F){let R=[];return R.push(F.wrapS),R.push(F.wrapT),R.push(F.wrapR||0),R.push(F.magFilter),R.push(F.minFilter),R.push(F.anisotropy),R.push(F.internalFormat),R.push(F.format),R.push(F.type),R.push(F.generateMipmaps),R.push(F.premultiplyAlpha),R.push(F.flipY),R.push(F.unpackAlignment),R.push(F.colorSpace),R.join()})(E);if(z!==w.__cacheKey){y[z]===void 0&&(y[z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,C=!0),y[z].usedTimes++;let F=y[w.__cacheKey];F!==void 0&&(y[w.__cacheKey].usedTimes--,F.usedTimes===0&&k(E)),w.__cacheKey=z,w.__webglTexture=y[z].texture}return C}function N(w,E,C){return Math.floor(Math.floor(w/C)/E)}function J(w,E,C){let U=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(U=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(U=i.TEXTURE_3D);let y=ne(w,E),z=E.source;t.bindTexture(U,w.__webglTexture,i.TEXTURE0+C);let F=n.get(z);if(z.version!==F.__version||y===!0){if(t.activeTexture(i.TEXTURE0+C),!(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)){let pe=Ct.getPrimaries(Ct.workingColorSpace),me=E.colorSpace===cs?null:Ct.getPrimaries(E.colorSpace),Le=E.colorSpace===cs||pe===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let R=v(E.image,!1,r.maxTextureSize);R=le(E,R);let q=s.convert(E.format,E.colorSpace),Y=s.convert(E.type),K,de=T(E.internalFormat,q,Y,E.normalized,E.colorSpace,E.isVideoTexture);ie(U,E);let Te=E.mipmaps,De=E.isVideoTexture!==!0,_e=F.__version===void 0||y===!0,Ve=z.dataReady,oe=b(E,R);if(E.isDepthTexture)de=S(E.format===os,E.type),_e&&(De?t.texStorage2D(i.TEXTURE_2D,1,de,R.width,R.height):t.texImage2D(i.TEXTURE_2D,0,de,R.width,R.height,0,q,Y,null));else if(E.isDataTexture)if(Te.length>0){De&&_e&&t.texStorage2D(i.TEXTURE_2D,oe,de,Te[0].width,Te[0].height);for(let pe=0,me=Te.length;pe<me;pe++)K=Te[pe],De?Ve&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,K.width,K.height,q,Y,K.data):t.texImage2D(i.TEXTURE_2D,pe,de,K.width,K.height,0,q,Y,K.data);E.generateMipmaps=!1}else De?(_e&&t.texStorage2D(i.TEXTURE_2D,oe,de,R.width,R.height),Ve&&(function(pe,me,Le,Vt){let mt=pe.updateRanges;if(mt.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,me.width,me.height,Le,Vt,me.data);else{mt.sort((ge,Ut)=>ge.start-Ut.start);let kt=0;for(let ge=1;ge<mt.length;ge++){let Ut=mt[kt],St=mt[ge],Ft=Ut.start+Ut.count,Bt=N(St.start,me.width,4),fn=N(Ut.start,me.width,4);St.start<=Ft+1&&Bt===fn&&N(St.start+St.count-1,me.width,4)===Bt?Ut.count=Math.max(Ut.count,St.start+St.count-Ut.start):(++kt,mt[kt]=St)}mt.length=kt+1;let xn=t.getParameter(i.UNPACK_ROW_LENGTH),Me=t.getParameter(i.UNPACK_SKIP_PIXELS),nt=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,me.width);for(let ge=0,Ut=mt.length;ge<Ut;ge++){let St=mt[ge],Ft=Math.floor(St.start/4),Bt=Math.ceil(St.count/4),fn=Ft%me.width,Cn=Math.floor(Ft/me.width),dn=Bt;t.pixelStorei(i.UNPACK_SKIP_PIXELS,fn),t.pixelStorei(i.UNPACK_SKIP_ROWS,Cn),t.texSubImage2D(i.TEXTURE_2D,0,fn,Cn,dn,1,Le,Vt,me.data)}pe.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,xn),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Me),t.pixelStorei(i.UNPACK_SKIP_ROWS,nt)}})(E,R,q,Y)):t.texImage2D(i.TEXTURE_2D,0,de,R.width,R.height,0,q,Y,R.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){De&&_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,de,Te[0].width,Te[0].height,R.depth);for(let pe=0,me=Te.length;pe<me;pe++)if(K=Te[pe],E.format!==er)if(q!==null)if(De){if(Ve)if(E.layerUpdates.size>0){let Le=Ru(K.width,K.height,E.format,E.type);for(let Vt of E.layerUpdates){let mt=K.data.subarray(Vt*Le/K.data.BYTES_PER_ELEMENT,(Vt+1)*Le/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,Vt,K.width,K.height,1,q,mt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,K.width,K.height,R.depth,q,K.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pe,de,K.width,K.height,R.depth,0,K.data,0,0);else et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?Ve&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,K.width,K.height,R.depth,q,Y,K.data):t.texImage3D(i.TEXTURE_2D_ARRAY,pe,de,K.width,K.height,R.depth,0,q,Y,K.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{De&&_e&&t.texStorage2D(i.TEXTURE_2D,oe,de,Te[0].width,Te[0].height);for(let pe=0,me=Te.length;pe<me;pe++)K=Te[pe],E.format!==er?q!==null?De?Ve&&t.compressedTexSubImage2D(i.TEXTURE_2D,pe,0,0,K.width,K.height,q,K.data):t.compressedTexImage2D(i.TEXTURE_2D,pe,de,K.width,K.height,0,K.data):et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?Ve&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,K.width,K.height,q,Y,K.data):t.texImage2D(i.TEXTURE_2D,pe,de,K.width,K.height,0,q,Y,K.data)}else if(E.isDataArrayTexture)if(De){if(_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,de,R.width,R.height,R.depth),Ve)if(E.layerUpdates.size>0){let pe=Ru(R.width,R.height,E.format,E.type);for(let me of E.layerUpdates){let Le=R.data.subarray(me*pe/R.data.BYTES_PER_ELEMENT,(me+1)*pe/R.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,R.width,R.height,1,q,Y,Le)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,R.width,R.height,R.depth,q,Y,R.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,de,R.width,R.height,R.depth,0,q,Y,R.data);else if(E.isData3DTexture)De?(_e&&t.texStorage3D(i.TEXTURE_3D,oe,de,R.width,R.height,R.depth),Ve&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,R.width,R.height,R.depth,q,Y,R.data)):t.texImage3D(i.TEXTURE_3D,0,de,R.width,R.height,R.depth,0,q,Y,R.data);else if(E.isFramebufferTexture){if(_e)if(De)t.texStorage2D(i.TEXTURE_2D,oe,de,R.width,R.height);else{let pe=R.width,me=R.height;for(let Le=0;Le<oe;Le++)t.texImage2D(i.TEXTURE_2D,Le,de,pe,me,0,q,Y,null),pe>>=1,me>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let pe=i.canvas;if(pe.hasAttribute("layoutsubtree")||pe.setAttribute("layoutsubtree","true"),R.parentNode!==pe)return pe.appendChild(R),p.add(E),pe.onpaint=me=>{let Le=me.changedElements;for(let Vt of p)Le.includes(Vt.image)&&(Vt.needsUpdate=!0)},void pe.requestPaint();if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,R);else{let Le=i.RGBA,Vt=i.RGBA,mt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Le,Vt,mt,R)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Te.length>0){if(De&&_e){let pe=he(Te[0]);t.texStorage2D(i.TEXTURE_2D,oe,de,pe.width,pe.height)}for(let pe=0,me=Te.length;pe<me;pe++)K=Te[pe],De?Ve&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,q,Y,K):t.texImage2D(i.TEXTURE_2D,pe,de,q,Y,K);E.generateMipmaps=!1}else if(De){if(_e){let pe=he(R);t.texStorage2D(i.TEXTURE_2D,oe,de,pe.width,pe.height)}Ve&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,q,Y,R)}else t.texImage2D(i.TEXTURE_2D,0,de,q,Y,R);g(E)&&_(U),F.__version=z.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function ce(w,E,C,U,y,z){let F=s.convert(C.format,C.colorSpace),R=s.convert(C.type),q=T(C.internalFormat,F,R,C.normalized,C.colorSpace),Y=n.get(E),K=n.get(C);if(K.__renderTarget=E,!Y.__hasExternalTextures){let de=Math.max(1,E.width>>z),Te=Math.max(1,E.height>>z);y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?t.texImage3D(y,z,q,de,Te,E.depth,0,F,R,null):t.texImage2D(y,z,q,de,Te,0,F,R,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),te(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,U,y,K.__webglTexture,0,X(E)):(y===i.TEXTURE_2D||y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,U,y,K.__webglTexture,z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(w,E,C){if(i.bindRenderbuffer(i.RENDERBUFFER,w),E.depthBuffer){let U=E.depthTexture,y=U&&U.isDepthTexture?U.type:null,z=S(E.stencilBuffer,y),F=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;te(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X(E),z,E.width,E.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,X(E),z,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,z,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,F,i.RENDERBUFFER,w)}else{let U=E.textures;for(let y=0;y<U.length;y++){let z=U[y],F=s.convert(z.format,z.colorSpace),R=s.convert(z.type),q=T(z.internalFormat,F,R,z.normalized,z.colorSpace);te(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X(E),q,E.width,E.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,X(E),q,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,q,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xe(w,E,C){let U=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let y=n.get(E.depthTexture);if(y.__renderTarget=E,y.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),U){if(y.__webglInit===void 0&&(y.__webglInit=!0,E.depthTexture.addEventListener("dispose",I)),y.__webglTexture===void 0){y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture),ie(i.TEXTURE_CUBE_MAP,E.depthTexture);let Y=s.convert(E.depthTexture.format),K=s.convert(E.depthTexture.type),de;E.depthTexture.format===as?de=i.DEPTH_COMPONENT24:E.depthTexture.format===os&&(de=i.DEPTH24_STENCIL8);for(let Te=0;Te<6;Te++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,de,E.width,E.height,0,Y,K,null)}}else j(E.depthTexture,0);let z=y.__webglTexture,F=X(E),R=U?i.TEXTURE_CUBE_MAP_POSITIVE_X+C:i.TEXTURE_2D,q=E.depthTexture.format===os?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===as)te(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,R,z,0,F):i.framebufferTexture2D(i.FRAMEBUFFER,q,R,z,0);else{if(E.depthTexture.format!==os)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");te(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,R,z,0,F):i.framebufferTexture2D(i.FRAMEBUFFER,q,R,z,0)}}function Be(w){let E=n.get(w),C=w.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==w.depthTexture){let U=w.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),U){let y=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,U.removeEventListener("dispose",y)};U.addEventListener("dispose",y),E.__depthDisposeCallback=y}E.__boundDepthTexture=U}if(w.depthTexture&&!E.__autoAllocateDepthBuffer)if(C)for(let U=0;U<6;U++)xe(E.__webglFramebuffer[U],w,U);else{let U=w.texture.mipmaps;U&&U.length>0?xe(E.__webglFramebuffer[0],w,0):xe(E.__webglFramebuffer,w,0)}else if(C){E.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[U]),E.__webglDepthbuffer[U]===void 0)E.__webglDepthbuffer[U]=i.createRenderbuffer(),Oe(E.__webglDepthbuffer[U],w,!1);else{let y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=E.__webglDepthbuffer[U];i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,z)}}else{let U=w.texture.mipmaps;if(U&&U.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),Oe(E.__webglDepthbuffer,w,!1);else{let y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,z)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let we=[],ue=[];function X(w){return Math.min(r.maxSamples,w.samples)}function te(w){let E=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function le(w,E){let C=w.colorSpace,U=w.format,y=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||C!==nc&&C!==cs&&(Ct.getTransfer(C)===en?U===er&&y===Bi||et("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",C)),E}function he(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=function(){let w=D;return w>=r.maxTextures&&et("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+r.maxTextures),D+=1,w},this.resetTextureUnits=function(){D=0},this.getTextureUnits=function(){return D},this.setTextureUnits=function(w){D=w},this.setTexture2D=j,this.setTexture2DArray=function(w,E){let C=n.get(w);w.isRenderTargetTexture===!1&&w.version>0&&C.__version!==w.version?J(C,w,E):(w.isExternalTexture&&(C.__webglTexture=w.sourceTexture?w.sourceTexture:null),t.bindTexture(i.TEXTURE_2D_ARRAY,C.__webglTexture,i.TEXTURE0+E))},this.setTexture3D=function(w,E){let C=n.get(w);w.isRenderTargetTexture===!1&&w.version>0&&C.__version!==w.version?J(C,w,E):t.bindTexture(i.TEXTURE_3D,C.__webglTexture,i.TEXTURE0+E)},this.setTextureCube=function(w,E){let C=n.get(w);w.isCubeDepthTexture!==!0&&w.version>0&&C.__version!==w.version?(function(U,y,z){if(y.image.length!==6)return;let F=ne(U,y),R=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+z);let q=n.get(R);if(R.version!==q.__version||F===!0){t.activeTexture(i.TEXTURE0+z);let Y=Ct.getPrimaries(Ct.workingColorSpace),K=y.colorSpace===cs?null:Ct.getPrimaries(y.colorSpace),de=y.colorSpace===cs||Y===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);let Te=y.isCompressedTexture||y.image[0].isCompressedTexture,De=y.image[0]&&y.image[0].isDataTexture,_e=[];for(let Me=0;Me<6;Me++)_e[Me]=Te||De?De?y.image[Me].image:y.image[Me]:v(y.image[Me],!0,r.maxCubemapSize),_e[Me]=le(y,_e[Me]);let Ve=_e[0],oe=s.convert(y.format,y.colorSpace),pe=s.convert(y.type),me=T(y.internalFormat,oe,pe,y.normalized,y.colorSpace),Le=y.isVideoTexture!==!0,Vt=q.__version===void 0||F===!0,mt=R.dataReady,kt,xn=b(y,Ve);if(ie(i.TEXTURE_CUBE_MAP,y),Te){Le&&Vt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,xn,me,Ve.width,Ve.height);for(let Me=0;Me<6;Me++){kt=_e[Me].mipmaps;for(let nt=0;nt<kt.length;nt++){let ge=kt[nt];y.format!==er?oe!==null?Le?mt&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,nt,0,0,ge.width,ge.height,oe,ge.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,nt,me,ge.width,ge.height,0,ge.data):et("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Le?mt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,nt,0,0,ge.width,ge.height,oe,pe,ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,nt,me,ge.width,ge.height,0,oe,pe,ge.data)}}}else{if(kt=y.mipmaps,Le&&Vt){kt.length>0&&xn++;let Me=he(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,xn,me,Me.width,Me.height)}for(let Me=0;Me<6;Me++)if(De){Le?mt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,_e[Me].width,_e[Me].height,oe,pe,_e[Me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,me,_e[Me].width,_e[Me].height,0,oe,pe,_e[Me].data);for(let nt=0;nt<kt.length;nt++){let ge=kt[nt].image[Me].image;Le?mt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,nt+1,0,0,ge.width,ge.height,oe,pe,ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,nt+1,me,ge.width,ge.height,0,oe,pe,ge.data)}}else{Le?mt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,oe,pe,_e[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,me,oe,pe,_e[Me]);for(let nt=0;nt<kt.length;nt++){let ge=kt[nt];Le?mt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,nt+1,0,0,oe,pe,ge.image[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,nt+1,me,oe,pe,ge.image[Me])}}}g(y)&&_(i.TEXTURE_CUBE_MAP),q.__version=R.version,y.onUpdate&&y.onUpdate(y)}U.__version=y.version})(C,w,E):t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+E)},this.rebindTextures=function(w,E,C){let U=n.get(w);E!==void 0&&ce(U.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),C!==void 0&&Be(w)},this.setupRenderTarget=function(w){let E=w.texture,C=n.get(w),U=n.get(E);w.addEventListener("dispose",O);let y=w.textures,z=w.isWebGLCubeRenderTarget===!0,F=y.length>1;if(F||(U.__webglTexture===void 0&&(U.__webglTexture=i.createTexture()),U.__version=E.version,a.memory.textures++),z){C.__webglFramebuffer=[];for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0){C.__webglFramebuffer[R]=[];for(let q=0;q<E.mipmaps.length;q++)C.__webglFramebuffer[R][q]=i.createFramebuffer()}else C.__webglFramebuffer[R]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){C.__webglFramebuffer=[];for(let R=0;R<E.mipmaps.length;R++)C.__webglFramebuffer[R]=i.createFramebuffer()}else C.__webglFramebuffer=i.createFramebuffer();if(F)for(let R=0,q=y.length;R<q;R++){let Y=n.get(y[R]);Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&te(w)===!1){C.__webglMultisampledFramebuffer=i.createFramebuffer(),C.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let R=0;R<y.length;R++){let q=y[R];C.__webglColorRenderbuffer[R]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,C.__webglColorRenderbuffer[R]);let Y=s.convert(q.format,q.colorSpace),K=s.convert(q.type),de=T(q.internalFormat,Y,K,q.normalized,q.colorSpace,w.isXRRenderTarget===!0),Te=X(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,de,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+R,i.RENDERBUFFER,C.__webglColorRenderbuffer[R])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(C.__webglDepthRenderbuffer=i.createRenderbuffer(),Oe(C.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(z){t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture),ie(i.TEXTURE_CUBE_MAP,E);for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0)for(let q=0;q<E.mipmaps.length;q++)ce(C.__webglFramebuffer[R][q],w,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,q);else ce(C.__webglFramebuffer[R],w,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,0);g(E)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(F){for(let R=0,q=y.length;R<q;R++){let Y=y[R],K=n.get(Y),de=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(de=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,K.__webglTexture),ie(de,Y),ce(C.__webglFramebuffer,w,Y,i.COLOR_ATTACHMENT0+R,de,0),g(Y)&&_(de)}t.unbindTexture()}else{let R=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(R=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(R,U.__webglTexture),ie(R,E),E.mipmaps&&E.mipmaps.length>0)for(let q=0;q<E.mipmaps.length;q++)ce(C.__webglFramebuffer[q],w,E,i.COLOR_ATTACHMENT0,R,q);else ce(C.__webglFramebuffer,w,E,i.COLOR_ATTACHMENT0,R,0);g(E)&&_(R),t.unbindTexture()}w.depthBuffer&&Be(w)},this.updateRenderTargetMipmap=function(w){let E=w.textures;for(let C=0,U=E.length;C<U;C++){let y=E[C];if(g(y)){let z=M(w),F=n.get(y).__webglTexture;t.bindTexture(z,F),_(z),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(w){if(w.samples>0){if(te(w)===!1){let E=w.textures,C=w.width,U=w.height,y=i.COLOR_BUFFER_BIT,z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,F=n.get(w),R=E.length>1;if(R)for(let Y=0;Y<E.length;Y++)t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,F.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,F.__webglMultisampledFramebuffer);let q=w.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglFramebuffer);for(let Y=0;Y<E.length;Y++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(y|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(y|=i.STENCIL_BUFFER_BIT)),R){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,F.__webglColorRenderbuffer[Y]);let K=n.get(E[Y]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,K,0)}i.blitFramebuffer(0,0,C,U,0,0,C,U,y,i.NEAREST),l===!0&&(we.length=0,ue.length=0,we.push(i.COLOR_ATTACHMENT0+Y),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(we.push(z),ue.push(z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ue)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,we))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),R)for(let Y=0;Y<E.length;Y++){t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,F.__webglColorRenderbuffer[Y]);let K=n.get(E[Y]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,F.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,K,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){let E=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=te,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function D1(i,e){return{convert:function(t,n=cs){let r,s=Ct.getTransfer(n);if(t===Bi)return i.UNSIGNED_BYTE;if(t===zh)return i.UNSIGNED_SHORT_4_4_4_4;if(t===Vh)return i.UNSIGNED_SHORT_5_5_5_1;if(t===uf)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===df)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===cf)return i.BYTE;if(t===hf)return i.SHORT;if(t===Ja)return i.UNSIGNED_SHORT;if(t===Bh)return i.INT;if(t===Br)return i.UNSIGNED_INT;if(t===wi)return i.FLOAT;if(t===Qi)return i.HALF_FLOAT;if(t===pf)return i.ALPHA;if(t===ff)return i.RGB;if(t===er)return i.RGBA;if(t===as)return i.DEPTH_COMPONENT;if(t===os)return i.DEPTH_STENCIL;if(t===Ka)return i.RED;if(t===kh)return i.RED_INTEGER;if(t===ls)return i.RG;if(t===Gh)return i.RG_INTEGER;if(t===Hh)return i.RGBA_INTEGER;if(t===Zl||t===Jl||t===Kl||t===Ql)if(s===en){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===Zl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Jl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Kl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Ql)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===Zl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Jl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Kl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Ql)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Wh||t===Xh||t===qh||t===jh){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===Wh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Xh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===qh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===jh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Yh||t===$h||t===Zh||t===Jh||t===Kh||t===ec||t===Qh){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===Yh||t===$h)return s===en?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===Zh)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(t===Jh)return r.COMPRESSED_R11_EAC;if(t===Kh)return r.COMPRESSED_SIGNED_R11_EAC;if(t===ec)return r.COMPRESSED_RG11_EAC;if(t===Qh)return r.COMPRESSED_SIGNED_RG11_EAC}if(t===eu||t===tu||t===nu||t===iu||t===ru||t===su||t===au||t===ou||t===lu||t===cu||t===hu||t===uu||t===du||t===pu){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===eu)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===tu)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===nu)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===iu)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===ru)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===su)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===au)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===ou)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===lu)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===cu)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===hu)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===uu)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===du)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===pu)return s===en?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===fu||t===mu||t===gu){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===fu)return s===en?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===mu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===gu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===_u||t===vu||t===tc||t===xu){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===_u)return r.COMPRESSED_RED_RGTC1_EXT;if(t===vu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===tc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===xu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Ks?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var U1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O1=`
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

}`,ju=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new La(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new An({vertexShader:U1,fragmentShader:O1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Jn(new Xs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yu=class extends Yi{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,p=null,d=null,u=null,m=null,f=typeof XRWebGLBinding<"u",v=new ju,g={},_=t.getContextAttributes(),M=null,T=null,S=[],b=[],I=new fe,O=null,k=null,D=new Zn;D.viewport=new Qt;let j=new Zn;j.viewport=new Qt;let V=[D,j],Q=new Gl,ae=null,ie=null;function ne(ue){let X=b.indexOf(ue.inputSource);if(X===-1)return;let te=S[X];te!==void 0&&(te.update(ue.inputSource,ue.frame,c||a),te.dispatchEvent({type:ue.type,data:ue.inputSource}))}function N(){r.removeEventListener("select",ne),r.removeEventListener("selectstart",ne),r.removeEventListener("selectend",ne),r.removeEventListener("squeeze",ne),r.removeEventListener("squeezestart",ne),r.removeEventListener("squeezeend",ne),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",J);for(let ue=0;ue<S.length;ue++){let X=b[ue];X!==null&&(b[ue]=null,S[ue].disconnect(X))}ae=null,ie=null,v.reset();for(let ue in g)delete g[ue];if(e.setRenderTarget(M),u=null,d=null,p=null,r=null,T=null,we.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(I.width,I.height,!1),k!==null){let ue=k.camera;ue.fov=k.fov,ue.zoom=k.zoom,ue.updateProjectionMatrix(),k=null}n.dispatchEvent({type:"sessionend"})}function J(ue){for(let X=0;X<ue.removed.length;X++){let te=ue.removed[X],le=b.indexOf(te);le>=0&&(b[le]=null,S[le].disconnect(te))}for(let X=0;X<ue.added.length;X++){let te=ue.added[X],le=b.indexOf(te);if(le===-1){for(let w=0;w<S.length;w++){if(w>=b.length){b.push(te),le=w;break}if(b[w]===null){b[w]=te,le=w;break}}if(le===-1)break}let he=S[le];he&&he.connect(te)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ue){let X=S[ue];return X===void 0&&(X=new Vs,S[ue]=X),X.getTargetRaySpace()},this.getControllerGrip=function(ue){let X=S[ue];return X===void 0&&(X=new Vs,S[ue]=X),X.getGripSpace()},this.getHand=function(ue){let X=S[ue];return X===void 0&&(X=new Vs,S[ue]=X),X.getHandSpace()},this.setFramebufferScaleFactor=function(ue){s=ue,n.isPresenting===!0&&et("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ue){o=ue,n.isPresenting===!0&&et("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ue){c=ue},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return p===null&&f&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(ue){if(r=ue,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",ne),r.addEventListener("selectstart",ne),r.addEventListener("selectend",ne),r.addEventListener("squeeze",ne),r.addEventListener("squeezestart",ne),r.addEventListener("squeezeend",ne),r.addEventListener("end",N),r.addEventListener("inputsourceschange",J),_.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(I),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let X=null,te=null,le=null;_.depth&&(le=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,X=_.stencil?os:as,te=_.stencil?Ks:Br);let he={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:s};p=this.getBinding(),d=p.createProjectionLayer(he),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new ci(d.textureWidth,d.textureHeight,{format:er,type:Bi,depthTexture:new Ur(d.textureWidth,d.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let X={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,X),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),T=new ci(u.framebufferWidth,u.framebufferHeight,{format:er,type:Bi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),we.setContext(r),we.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let ce=new P,Oe=new P;function xe(ue,X){X===null?ue.matrixWorld.copy(ue.matrix):ue.matrixWorld.multiplyMatrices(X.matrixWorld,ue.matrix),ue.matrixWorldInverse.copy(ue.matrixWorld).invert()}this.updateCamera=function(ue){if(r===null)return;let X=ue.near,te=ue.far;v.texture!==null&&(v.depthNear>0&&(X=v.depthNear),v.depthFar>0&&(te=v.depthFar)),Q.near=j.near=D.near=X,Q.far=j.far=D.far=te,ae===Q.near&&ie===Q.far||(r.updateRenderState({depthNear:Q.near,depthFar:Q.far}),ae=Q.near,ie=Q.far),Q.layers.mask=6|ue.layers.mask,D.layers.mask=-5&Q.layers.mask,j.layers.mask=-3&Q.layers.mask;let le=ue.parent,he=Q.cameras;xe(Q,le);for(let w=0;w<he.length;w++)xe(he[w],le);he.length===2?(function(w,E,C){ce.setFromMatrixPosition(E.matrixWorld),Oe.setFromMatrixPosition(C.matrixWorld);let U=ce.distanceTo(Oe),y=E.projectionMatrix.elements,z=C.projectionMatrix.elements,F=y[14]/(y[10]-1),R=y[14]/(y[10]+1),q=(y[9]+1)/y[5],Y=(y[9]-1)/y[5],K=(y[8]-1)/y[0],de=(z[8]+1)/z[0],Te=F*K,De=F*de,_e=U/(-K+de),Ve=_e*-K;if(E.matrixWorld.decompose(w.position,w.quaternion,w.scale),w.translateX(Ve),w.translateZ(_e),w.matrixWorld.compose(w.position,w.quaternion,w.scale),w.matrixWorldInverse.copy(w.matrixWorld).invert(),y[10]===-1)w.projectionMatrix.copy(E.projectionMatrix),w.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let oe=F+_e,pe=R+_e,me=Te-Ve,Le=De+(U-Ve),Vt=q*R/pe*oe,mt=Y*R/pe*oe;w.projectionMatrix.makePerspective(me,Le,Vt,mt,oe,pe),w.projectionMatrixInverse.copy(w.projectionMatrix).invert()}})(Q,D,j):Q.projectionMatrix.copy(D.projectionMatrix),k===null&&ue.isPerspectiveCamera&&(k={camera:ue,fov:ue.fov,zoom:ue.zoom}),(function(w,E,C){C===null?w.matrix.copy(E.matrixWorld):(w.matrix.copy(C.matrixWorld),w.matrix.invert(),w.matrix.multiply(E.matrixWorld)),w.matrix.decompose(w.position,w.quaternion,w.scale),w.updateMatrixWorld(!0),w.projectionMatrix.copy(E.projectionMatrix),w.projectionMatrixInverse.copy(E.projectionMatrixInverse),w.isPerspectiveCamera&&(w.fov=2*Zo*Math.atan(1/w.projectionMatrix.elements[5]),w.zoom=1)})(ue,Q,le)},this.getCamera=function(){return Q},this.getFoveation=function(){if(d!==null||u!==null)return l},this.setFoveation=function(ue){l=ue,d!==null&&(d.fixedFoveation=ue),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=ue)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(Q)},this.getCameraTexture=function(ue){return g[ue]};let Be=null,we=new nm;we.setAnimationLoop(function(ue,X){if(h=X.getViewerPose(c||a),m=X,h!==null){let te=h.views;u!==null&&(e.setRenderTargetFramebuffer(T,u.framebuffer),e.setRenderTarget(T));let le=!1;te.length!==Q.cameras.length&&(Q.cameras.length=0,le=!0);for(let w=0;w<te.length;w++){let E=te[w],C=null;if(u!==null)C=u.getViewport(E);else{let y=p.getViewSubImage(d,E);C=y.viewport,w===0&&(e.setRenderTargetTextures(T,y.colorTexture,y.depthStencilTexture),e.setRenderTarget(T))}let U=V[w];U===void 0&&(U=new Zn,U.layers.enable(w),U.viewport=new Qt,V[w]=U),U.matrix.fromArray(E.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(E.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(C.x,C.y,C.width,C.height),w===0&&(Q.matrix.copy(U.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale)),le===!0&&Q.cameras.push(U)}let he=r.enabledFeatures;if(he&&he.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&f){p=n.getBinding();let w=p.getDepthInformation(te[0]);w&&w.isValid&&w.texture&&v.init(w,r.renderState)}if(he&&he.includes("camera-access")&&f){e.state.unbindTexture(),p=n.getBinding();for(let w=0;w<te.length;w++){let E=te[w].camera;if(E){let C=g[E];C||(C=new La,g[E]=C);let U=p.getCameraImage(E);C.sourceTexture=U}}}}for(let te=0;te<S.length;te++){let le=b[te],he=S[te];le!==null&&he!==void 0&&he.update(le,X,c||a)}Be&&Be(ue,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),m=null}),this.setAnimationLoop=function(ue){Be=ue},this.dispose=function(){}}},F1=new vt,lm=new ct;function B1(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===Kn&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===Kn&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(r.envMap.value=o,r.envMapRotation.value.setFromMatrix4(F1.makeRotationFromEuler(l)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply(lm),r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,wu(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,l){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(r,s):s.isMeshLambertMaterial?(n(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(r,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(r,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(c,h,p){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Kn&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.retroreflectivity>0&&(c.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=p.texture,c.transmissionSamplerSize.value.set(p.width,p.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(r,s,l)):s.isMeshMatcapMaterial?(n(r,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(c,h){let p=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(p.matrixWorld),c.nearDistance.value=p.shadow.camera.near,c.farDistance.value=p.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(c,h,p,d){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*p,c.scale.value=.5*d,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function z1(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(d,u,m,f){if((function(v,g,_,M){let T=v.value,S=g+"_"+_;if(M[S]===void 0)return typeof T=="number"||typeof T=="boolean"?M[S]=T:ArrayBuffer.isView(T)?M[S]=T.slice():M[S]=T.clone(),!0;{let b=M[S];if(typeof T=="number"||typeof T=="boolean"){if(b!==T)return M[S]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(b.equals(T)===!1)return b.copy(T),!0}}return!1})(d,u,m,f)===!0){let v=d.__offset,g=d.value;if(Array.isArray(g)){let _=0;for(let M=0;M<g.length;M++){let T=g[M],S=h(T);c(T,d.__data,_),typeof T=="number"||typeof T=="boolean"||T.isMatrix3||ArrayBuffer.isView(T)||(_+=S.storage/Float32Array.BYTES_PER_ELEMENT)}}else c(g,d.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,d.__data)}}function c(d,u,m){typeof d=="number"||typeof d=="boolean"?u[0]=d:d.isMatrix3?(u[0]=d.elements[0],u[1]=d.elements[1],u[2]=d.elements[2],u[3]=0,u[4]=d.elements[3],u[5]=d.elements[4],u[6]=d.elements[5],u[7]=0,u[8]=d.elements[6],u[9]=d.elements[7],u[10]=d.elements[8],u[11]=0):ArrayBuffer.isView(d)?u.set(new d.constructor(d.buffer,d.byteOffset,u.length)):d.toArray(u,m)}function h(d){let u={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(u.boundary=4,u.storage=4):d.isVector2?(u.boundary=8,u.storage=8):d.isVector3||d.isColor?(u.boundary=16,u.storage=12):d.isVector4?(u.boundary=16,u.storage=16):d.isMatrix3?(u.boundary=48,u.storage=48):d.isMatrix4?(u.boundary=64,u.storage=64):d.isTexture?et("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(d)?(u.boundary=16,u.storage=d.byteLength):et("WebGLRenderer: Unsupported uniform value type.",d),u}function p(d){let u=d.target;u.removeEventListener("dispose",p);let m=a.indexOf(u.__bindingPointIndex);a.splice(m,1),i.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}return{bind:function(d,u){let m=u.program;n.uniformBlockBinding(d,m)},update:function(d,u){let m=r[d.id];m===void 0&&((function(g){let _=g.uniforms,M=0,T=16;for(let b=0,I=_.length;b<I;b++){let O=Array.isArray(_[b])?_[b]:[_[b]];for(let k=0,D=O.length;k<D;k++){let j=O[k],V=Array.isArray(j.value)?j.value:[j.value];for(let Q=0,ae=V.length;Q<ae;Q++){let ie=h(V[Q]),ne=M%T,N=ne%ie.boundary,J=ne+N;M+=N,J!==0&&T-J<ie.storage&&(M+=T-J),j.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=M,M+=ie.storage}}}let S=M%T;S>0&&(M+=T-S),g.__size=M,g.__cache={}})(d),m=(function(g){let _=(function(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=_;let M=i.createBuffer(),T=g.__size,S=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,T,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,M),M})(d),r[d.id]=m,d.addEventListener("dispose",p));let f=u.program;n.updateUBOMapping(d,f);let v=e.render.frame;s[d.id]!==v&&((function(g){let _=r[g.id],M=g.uniforms,T=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let S=0,b=M.length;S<b;S++){let I=M[S];if(Array.isArray(I))for(let O=0,k=I.length;O<k;O++)l(I[O],S,O,T);else l(I,S,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)})(d),s[d.id]=v)},dispose:function(){for(let d in r)i.deleteBuffer(r[d]);a=[],r={},s={}}}}lm.set(-1,0,0,0,1,0,0,0,1);var V1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),tr=null;function k1(){return tr===null&&(tr=new Qr(V1,16,16,ls,Qi),tr.name="DFG_LUT",tr.minFilter=Qn,tr.magFilter=Qn,tr.wrapS=Yl,tr.wrapT=Yl,tr.generateMipmaps=!1,tr.needsUpdate=!0),tr}var hc=class{constructor(e={}){let{canvas:t=Mf(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Bi}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let f=u,v=new Set([Hh,Gh,kh]),g=new Set([Bi,Br,Ja,Ks,zh,Vh]),_=new Uint32Array(4),M=new Int32Array(4),T=new P,S=null,b=null,I=[],O=[],k=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,j=!1,V=null,Q=null,ae=null,ie=null;this._outputColorSpace=Su;let ne=0,N=0,J=null,ce=-1,Oe=null,xe=new Qt,Be=new Qt,we=null,ue=new ft(0),X=0,te=t.width,le=t.height,he=1,w=null,E=null,C=new Qt(0,0,te,le),U=new Qt(0,0,te,le),y=!1,z=new Nr,F=!1,R=!1,q=new vt,Y=new P,K=new Qt,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function De(){return J===null?he:1}let _e,Ve,oe,pe,me,Le,Vt,mt,kt,xn,Me,nt,ge,Ut,St,Ft,Bt,fn,Cn,dn,tn,kn,hi,W=n;function vi(A,H){return t.getContext(A,H)}try{let A={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Ht,!1),t.addEventListener("webglcontextrestored",an,!1),t.addEventListener("webglcontextcreationerror",ke,!1),W===null){let H="webgl2";if(W=vi(H,A),W===null)throw vi(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Un()}catch(A){throw t.removeEventListener("webglcontextlost",Ht,!1),t.removeEventListener("webglcontextrestored",an,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),rt("WebGLRenderer: "+A.message),A}function Un(){_e=new $x(W),_e.init(),tn=new D1(W,_e),Ve=new Gx(W,_e,e,tn),oe=new L1(W,_e),Ve.reversedDepthBuffer&&d&&oe.buffers.depth.setReversed(!0),Q=W.createFramebuffer(),ae=W.createFramebuffer(),ie=W.createFramebuffer(),pe=new Kx(W),me=new v1,Le=new N1(W,_e,oe,me,Ve,tn,pe),Vt=new Yx(D),mt=new i_(W),kn=new Vx(W,mt),kt=new Zx(W,mt,pe,kn),xn=new ey(W,kt,mt,kn,pe),fn=new Qx(W,Ve,Le),St=new Hx(me),Me=new _1(D,Vt,_e,Ve,kn,St),nt=new B1(D,me),ge=new y1,Ut=new w1(_e),Bt=new zx(D,Vt,oe,xn,m,l),Ft=new P1(D,xn,Ve),hi=new z1(W,pe,Ve,oe),Cn=new kx(W,_e,pe),dn=new Jx(W,_e,pe),pe.programs=Me.programs,D.capabilities=Ve,D.extensions=_e,D.properties=me,D.renderLists=ge,D.shadowMap=Ft,D.state=oe,D.info=pe}f!==Bi&&(k=new ny(f,t.width,t.height,o,r,s));let tt=new Yu(D,W);function Ht(A){A.preventDefault(),Ma("WebGLRenderer: Context Lost."),j=!0}function an(){Ma("WebGLRenderer: Context Restored."),j=!1;let A=pe.autoReset,H=Ft.enabled,Z=Ft.autoUpdate,re=Ft.needsUpdate,ee=Ft.type;Un(),pe.autoReset=A,Ft.enabled=H,Ft.autoUpdate=Z,Ft.needsUpdate=re,Ft.type=ee}function ke(A){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ms(A){let H=A.target;H.removeEventListener("dispose",ms),(function(Z){(function(re){let ee=me.get(re).programs;ee!==void 0&&(ee.forEach(function(ve){Me.releaseProgram(ve)}),re.isShaderMaterial&&Me.releaseShaderCache(re))})(Z),me.remove(Z)})(H)}function rr(A,H,Z,re){V!==null&&A.isNodeMaterial&&V.setObject(re,A),F===!0&&St.setState(A,Z,!1),A.transparent===!0&&A.side===Ji&&A.forceSinglePass===!1?(A.side=Kn,A.needsUpdate=!0,yi(A,H,re),A.side=$s,A.needsUpdate=!0,yi(A,H,re),A.side=Ji):yi(A,H,re)}this.xr=tt,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let A=_e.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=_e.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(A){A!==void 0&&(he=A,this.setSize(te,le,!1))},this.getSize=function(A){return A.set(te,le)},this.setSize=function(A,H,Z=!0){tt.isPresenting?et("WebGLRenderer: Can't change size while VR device is presenting."):(te=A,le=H,t.width=Math.floor(A*he),t.height=Math.floor(H*he),Z===!0&&(t.style.width=A+"px",t.style.height=H+"px"),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,A,H))},this.getDrawingBufferSize=function(A){return A.set(te*he,le*he).floor()},this.setDrawingBufferSize=function(A,H,Z){te=A,le=H,he=Z,t.width=Math.floor(A*Z),t.height=Math.floor(H*Z),this.setViewport(0,0,A,H)},this.setEffects=function(A){if(f!==Bi){if(A){for(let H=0;H<A.length;H++)if(A[H].isOutputPass===!0){et("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}k.setEffects(A||[])}else rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(A){return A.copy(xe)},this.getViewport=function(A){return A.copy(C)},this.setViewport=function(A,H,Z,re){A.isVector4?C.set(A.x,A.y,A.z,A.w):C.set(A,H,Z,re),oe.viewport(xe.copy(C).multiplyScalar(he).round())},this.getScissor=function(A){return A.copy(U)},this.setScissor=function(A,H,Z,re){A.isVector4?U.set(A.x,A.y,A.z,A.w):U.set(A,H,Z,re),oe.scissor(Be.copy(U).multiplyScalar(he).round())},this.getScissorTest=function(){return y},this.setScissorTest=function(A){oe.setScissorTest(y=A)},this.setOpaqueSort=function(A){w=A},this.setTransparentSort=function(A){E=A},this.getClearColor=function(A){return A.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor(...arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha(...arguments)},this.clear=function(A=!0,H=!0,Z=!0){let re=0;if(A){let ee=!1;if(J!==null){let ve=J.texture.format;ee=v.has(ve)}if(ee){let ve=J.texture.type,Ce=g.has(ve),Ue=Bt.getClearColor(),ze=Bt.getClearAlpha(),Ye=Ue.r,at=Ue.g,it=Ue.b;Ce?(_[0]=Ye,_[1]=at,_[2]=it,_[3]=ze,W.clearBufferuiv(W.COLOR,0,_)):(M[0]=Ye,M[1]=at,M[2]=it,M[3]=ze,W.clearBufferiv(W.COLOR,0,M))}else re|=W.COLOR_BUFFER_BIT}H&&(re|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(re|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),re!==0&&W.clear(re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),V=A},this.dispose=function(){t.removeEventListener("webglcontextlost",Ht,!1),t.removeEventListener("webglcontextrestored",an,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),Bt.dispose(),ge.dispose(),Ut.dispose(),me.dispose(),Vt.dispose(),xn.dispose(),kn.dispose(),hi.dispose(),Me.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",Sn),tt.removeEventListener("sessionend",ht),bt.stop()},this.renderBufferDirect=function(A,H,Z,re,ee,ve){H===null&&(H=de);let Ce=ee.isMesh&&ee.matrixWorld.determinantAffine()<0,Ue=(function(dt,Ot,yn,$e,je){Ot.isScene!==!0&&(Ot=de),Le.resetTextureUnits();let on=Ot.fog,B=$e.isMeshStandardMaterial||$e.isMeshLambertMaterial||$e.isMeshPhongMaterial?Ot.environment:null,se=J===null?D.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ct.workingColorSpace,ye=$e.isMeshStandardMaterial||$e.isMeshLambertMaterial&&!$e.envMap||$e.isMeshPhongMaterial&&!$e.envMap,Ze=Vt.get($e.envMap||B,ye),Ge=$e.vertexColors===!0&&!!yn.attributes.color&&yn.attributes.color.itemSize===4,pt=!!yn.attributes.tangent&&(!!$e.normalMap||$e.anisotropy>0),Xe=!!yn.morphAttributes.position,Lt=!!yn.morphAttributes.normal,Xt=!!yn.morphAttributes.color,Zt=Oi;$e.toneMapped&&(J!==null&&J.isXRRenderTarget!==!0||(Zt=D.toneMapping));let gn=yn.morphAttributes.position||yn.morphAttributes.normal||yn.morphAttributes.color,_t=gn!==void 0?gn.length:0,Ae=me.get($e),gt=b.state.lights;if(F===!0&&(R===!0||dt!==Oe)){let Nt=dt===Oe&&$e.id===ce;St.setState($e,dt,Nt)}let Jt=!1;$e.version===Ae.__version?Ae.needsLights&&Ae.lightsStateVersion!==gt.state.version||Ae.outputColorSpace!==se||je.isBatchedMesh&&Ae.batching===!1?Jt=!0:je.isBatchedMesh||Ae.batching!==!0?je.isBatchedMesh&&Ae.batchingColor===!0&&je._colorsTexture===null||je.isBatchedMesh&&Ae.batchingColor===!1&&je._colorsTexture!==null||je.isInstancedMesh&&Ae.instancing===!1?Jt=!0:je.isInstancedMesh||Ae.instancing!==!0?je.isSkinnedMesh&&Ae.skinning===!1?Jt=!0:je.isSkinnedMesh||Ae.skinning!==!0?je.isInstancedMesh&&Ae.instancingColor===!0&&je.instanceColor===null||je.isInstancedMesh&&Ae.instancingColor===!1&&je.instanceColor!==null||je.isInstancedMesh&&Ae.instancingMorph===!0&&je.morphTexture===null||je.isInstancedMesh&&Ae.instancingMorph===!1&&je.morphTexture!==null||Ae.envMap!==Ze||$e.fog===!0&&Ae.fog!==on?Jt=!0:Ae.numClippingPlanes===void 0||Ae.numClippingPlanes===St.numPlanes&&Ae.numIntersection===St.numIntersection?(Ae.vertexAlphas!==Ge||Ae.vertexTangents!==pt||Ae.morphTargets!==Xe||Ae.morphNormals!==Lt||Ae.morphColors!==Xt||Ae.toneMapping!==Zt||Ae.morphTargetsCount!==_t||!!Ae.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Jt=!0):Jt=!0:Jt=!0:Jt=!0:Jt=!0:(Jt=!0,Ae.__version=$e.version);let Tn=Ae.currentProgram;Jt===!0&&(Tn=yi($e,Ot,je),V&&$e.isNodeMaterial&&V.onUpdateProgram($e,Tn,Ae));let Si=!1,ti=!1,Ri=!1,Dt=Tn.getUniforms(),rn=Ae.uniforms;if(oe.useProgram(Tn.program)&&(Si=!0,ti=!0,Ri=!0),$e.id!==ce&&(ce=$e.id,ti=!0),Ae.needsLights){let Nt=(function(qt,In){if(qt.length===0)return null;if(qt.length===1)return qt[0].texture!==null?qt[0]:null;T.setFromMatrixPosition(In.matrixWorld);for(let Pn=0,kr=qt.length;Pn<kr;Pn++){let sr=qt[Pn];if(sr.texture!==null&&sr.boundingBox.containsPoint(T))return sr}return null})(b.state.lightProbeGridArray,je);Ae.lightProbeGrid!==Nt&&(Ae.lightProbeGrid=Nt,ti=!0)}if(Si||Oe!==dt){oe.buffers.depth.getReversed()&&dt.reversedDepth!==!0&&(dt._reversedDepth=!0,dt.updateProjectionMatrix()),Dt.setValue(W,"projectionMatrix",dt.projectionMatrix),Dt.setValue(W,"viewMatrix",dt.matrixWorldInverse);let Nt=Dt.map.cameraPosition;Nt!==void 0&&Nt.setValue(W,Y.setFromMatrixPosition(dt.matrixWorld)),Ve.logarithmicDepthBuffer&&Dt.setValue(W,"logDepthBufFC",2/(Math.log(dt.far+1)/Math.LN2)),($e.isMeshPhongMaterial||$e.isMeshToonMaterial||$e.isMeshLambertMaterial||$e.isMeshBasicMaterial||$e.isMeshStandardMaterial||$e.isShaderMaterial)&&Dt.setValue(W,"isOrthographic",dt.isOrthographicCamera===!0),Oe!==dt&&(Oe=dt,ti=!0,Ri=!0)}if(Ae.needsLights&&(gt.state.sunShadowMap.length>0&&Dt.setValue(W,"sunShadowMap",gt.state.sunShadowMap,Le),gt.state.directionalShadowMap.length>0&&Dt.setValue(W,"directionalShadowMap",gt.state.directionalShadowMap,Le),gt.state.spotShadowMap.length>0&&Dt.setValue(W,"spotShadowMap",gt.state.spotShadowMap,Le),gt.state.pointShadowMap.length>0&&Dt.setValue(W,"pointShadowMap",gt.state.pointShadowMap,Le)),je.isSkinnedMesh){Dt.setOptional(W,je,"bindMatrix"),Dt.setOptional(W,je,"bindMatrixInverse");let Nt=je.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),Dt.setValue(W,"boneTexture",Nt.boneTexture,Le))}je.isBatchedMesh&&(Dt.setOptional(W,je,"batchingTexture"),Dt.setValue(W,"batchingTexture",je._matricesTexture,Le),Dt.setOptional(W,je,"batchingIdTexture"),Dt.setValue(W,"batchingIdTexture",je._indirectTexture,Le),Dt.setOptional(W,je,"batchingColorTexture"),je._colorsTexture!==null&&Dt.setValue(W,"batchingColorTexture",je._colorsTexture,Le));let En=yn.morphAttributes;if(En.position===void 0&&En.normal===void 0&&En.color===void 0||fn.update(je,yn,Tn),(ti||Ae.receiveShadow!==je.receiveShadow)&&(Ae.receiveShadow=je.receiveShadow,Dt.setValue(W,"receiveShadow",je.receiveShadow)),($e.isMeshStandardMaterial||$e.isMeshLambertMaterial||$e.isMeshPhongMaterial)&&$e.envMap===null&&Ot.environment!==null&&(rn.envMapIntensity.value=Ot.environmentIntensity),rn.dfgLUT!==void 0&&(rn.dfgLUT.value=k1()),ti){if(Dt.setValue(W,"toneMappingExposure",D.toneMappingExposure),Ae.needsLights&&(Mn=Ri,(ln=rn).ambientLightColor.needsUpdate=Mn,ln.lightProbe.needsUpdate=Mn,ln.sunLights.needsUpdate=Mn,ln.sunLightShadows.needsUpdate=Mn,ln.directionalLights.needsUpdate=Mn,ln.directionalLightShadows.needsUpdate=Mn,ln.pointLights.needsUpdate=Mn,ln.pointLightShadows.needsUpdate=Mn,ln.spotLights.needsUpdate=Mn,ln.spotLightShadows.needsUpdate=Mn,ln.rectAreaLights.needsUpdate=Mn,ln.hemisphereLights.needsUpdate=Mn),on&&$e.fog===!0&&nt.refreshFogUniforms(rn,on),nt.refreshMaterialUniforms(rn,$e,he,le,b.state.transmissionRenderTarget[dt.id]),Ae.needsLights&&Ae.lightProbeGrid){let Nt=Ae.lightProbeGrid;rn.probesSH.value=Nt.texture,rn.probesMin.value.copy(Nt.boundingBox.min),rn.probesMax.value.copy(Nt.boundingBox.max),rn.probesResolution.value.copy(Nt.resolution)}ea.upload(W,Gn(Ae),rn,Le)}var ln,Mn;if($e.isShaderMaterial&&$e.uniformsNeedUpdate===!0&&(ea.upload(W,Gn(Ae),rn,Le),$e.uniformsNeedUpdate=!1),$e.isSpriteMaterial&&Dt.setValue(W,"center",je.center),Dt.setValue(W,"modelViewMatrix",je.modelViewMatrix),Dt.setValue(W,"normalMatrix",je.normalMatrix),Dt.setValue(W,"modelMatrix",je.matrixWorld),$e.uniformsGroups!==void 0){let Nt=$e.uniformsGroups;for(let qt=0,In=Nt.length;qt<In;qt++){let Pn=Nt[qt];hi.update(Pn,Tn),hi.bind(Pn,Tn)}}return Tn})(A,H,Z,re,ee);oe.setMaterial(re,Ce);let ze=Z.index,Ye=1;if(re.wireframe===!0){if(ze=kt.getWireframeAttribute(Z),ze===void 0)return;Ye=2}let at=Z.drawRange,it=Z.attributes.position,Ne=at.start*Ye,st=(at.start+at.count)*Ye;ve!==null&&(Ne=Math.max(Ne,ve.start*Ye),st=Math.min(st,(ve.start+ve.count)*Ye)),ze!==null?(Ne=Math.max(Ne,0),st=Math.min(st,ze.count)):it!=null&&(Ne=Math.max(Ne,0),st=Math.min(st,it.count));let Wt=st-Ne;if(Wt<0||Wt===1/0)return;let wt;kn.setup(ee,re,Ue,Z,ze);let zt=Cn;if(ze!==null&&(wt=mt.get(ze),zt=dn,zt.setIndex(wt)),ee.isMesh)re.wireframe===!0?(oe.setLineWidth(re.wireframeLinewidth*De()),zt.setMode(W.LINES)):zt.setMode(W.TRIANGLES);else if(ee.isLine){let dt=re.linewidth;dt===void 0&&(dt=1),oe.setLineWidth(dt*De()),ee.isLineSegments?zt.setMode(W.LINES):ee.isLineLoop?zt.setMode(W.LINE_LOOP):zt.setMode(W.LINE_STRIP)}else ee.isPoints?zt.setMode(W.POINTS):ee.isSprite&&zt.setMode(W.TRIANGLES);if(ee.isBatchedMesh)if(_e.get("WEBGL_multi_draw"))zt.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else{let dt=ee._multiDrawStarts,Ot=ee._multiDrawCounts,yn=ee._multiDrawCount,$e=ze?mt.get(ze).bytesPerElement:1,je=me.get(re).currentProgram.getUniforms();for(let on=0;on<yn;on++)je.setValue(W,"_gl_DrawID",on),zt.render(dt[on]/$e,Ot[on])}else if(ee.isInstancedMesh)zt.renderInstances(Ne,Wt,ee.count);else if(Z.isInstancedBufferGeometry){let dt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ot=Math.min(Z.instanceCount,dt);zt.renderInstances(Ne,Wt,Ot)}else zt.render(Ne,Wt)},this.compile=function(A,H,Z=null){Z===null&&(Z=A),V!==null&&V.renderStart(A,H,Z),b=Ut.get(Z),b.init(H),O.push(b),Z.traverseVisible(function(ee){ee.isLight&&ee.layers.test(H.layers)&&(b.pushLight(ee),ee.castShadow&&b.pushShadow(ee))}),A!==Z&&A.traverseVisible(function(ee){ee.isLight&&ee.layers.test(H.layers)&&(b.pushLight(ee),ee.castShadow&&b.pushShadow(ee))}),b.setupLights(),V!==null&&V.updateLights(b.state.lightsArray),R=this.localClippingEnabled,F=St.init(this.clippingPlanes,R),F===!0&&St.setGlobalState(this.clippingPlanes,H),V!==null&&Ft.render(b.state.shadowsArray,Z,H);let re=new Set;return A.traverse(function(ee){if(!(ee.isMesh||ee.isPoints||ee.isLine||ee.isSprite))return;let ve=ee.material;if(ve)if(Array.isArray(ve))for(let Ce=0;Ce<ve.length;Ce++){let Ue=ve[Ce];rr(Ue,Z,H,ee),re.add(Ue)}else rr(ve,Z,H,ee),re.add(ve)}),b=O.pop(),V!==null&&V.renderEnd(),re},this.compileAsync=function(A,H,Z=null){let re=this.compile(A,H,Z);return new Promise(ee=>{function ve(){re.forEach(function(Ce){let Ue=me.get(Ce).currentProgram;(Ue===void 0||Ue.isReady())&&re.delete(Ce)}),re.size!==0?setTimeout(ve,10):ee(A)}_e.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let vr=null;function Sn(){bt.stop()}function ht(){bt.start()}let bt=new nm;function mn(A,H,Z,re){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)Z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLightProbeGrid)b.pushLightProbeGrid(A);else if(A.isLight)b.pushLight(A),A.castShadow&&b.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(z)){re&&K.setFromMatrixPosition(A.matrixWorld).applyMatrix4(q);let ve=xn.update(A),Ce=A.material;Ce.visible&&S.push(A,ve,Ce,Z,K.z,null,H)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(z))){let ve=xn.update(A),Ce=A.material;if(re&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),K.copy(A.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),K.copy(ve.boundingSphere.center)),K.applyMatrix4(A.matrixWorld).applyMatrix4(q)),Array.isArray(Ce)){let Ue=ve.groups;for(let ze=0,Ye=Ue.length;ze<Ye;ze++){let at=Ue[ze],it=Ce[at.materialIndex];it&&it.visible&&S.push(A,ve,it,Z,K.z,at,H)}}else Ce.visible&&S.push(A,ve,Ce,Z,K.z,null,H)}}let ee=A.children;for(let ve=0,Ce=ee.length;ve<Ce;ve++)mn(ee[ve],H,Z,re)}function be(A,H,Z,re){let{opaque:ee,transmissive:ve,transparent:Ce}=A;b.setupLightsView(Z),F===!0&&St.setGlobalState(D.clippingPlanes,Z),re&&oe.viewport(xe.copy(re)),ee.length>0&&Bn(ee,H,Z),ve.length>0&&Bn(ve,H,Z),Ce.length>0&&Bn(Ce,H,Z),oe.buffers.depth.setTest(!0),oe.buffers.depth.setMask(!0),oe.buffers.color.setMask(!0),oe.setPolygonOffset(!1)}function Fn(A,H,Z,re){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[re.id]===void 0){let it=_e.has("EXT_color_buffer_half_float")||_e.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[re.id]=new ci(1,1,{generateMipmaps:!0,type:it?Qi:Bi,minFilter:ss,samples:Math.max(4,Ve.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ct.workingColorSpace})}let ee=b.state.transmissionRenderTarget[re.id],ve=re.viewport||xe;ee.setSize(ve.z*D.transmissionResolutionScale,ve.w*D.transmissionResolutionScale);let Ce=D.getRenderTarget(),Ue=D.getActiveCubeFace(),ze=D.getActiveMipmapLevel();D.setRenderTarget(ee),D.getClearColor(ue),X=D.getClearAlpha(),X<1&&D.setClearColor(16777215,.5),D.clear(),Te&&Bt.render(Z);let Ye=D.toneMapping;D.toneMapping=Oi;let at=re.viewport;if(re.viewport!==void 0&&(re.viewport=void 0),b.setupLightsView(re),F===!0&&St.setGlobalState(D.clippingPlanes,re),Bn(A,Z,re),Le.updateMultisampleRenderTarget(ee),Le.updateRenderTargetMipmap(ee),_e.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let Ne=0,st=H.length;Ne<st;Ne++){let Wt=H[Ne],{object:wt,geometry:zt,material:dt,group:Ot}=Wt;if(dt.side===Ji&&wt.layers.test(re.layers)){let yn=dt.side;dt.side=Kn,dt.needsUpdate=!0,xi(wt,Z,re,zt,dt,Ot),dt.side=yn,dt.needsUpdate=!0,it=!0}}it===!0&&(Le.updateMultisampleRenderTarget(ee),Le.updateRenderTargetMipmap(ee))}D.setRenderTarget(Ce,Ue,ze),D.setClearColor(ue,X),at!==void 0&&(re.viewport=at),D.toneMapping=Ye}function Bn(A,H,Z){let re=H.isScene===!0?H.overrideMaterial:null;for(let ee=0,ve=A.length;ee<ve;ee++){let Ce=A[ee],{object:Ue,geometry:ze,group:Ye}=Ce,at=Ce.material;at.allowOverride===!0&&re!==null&&(at=re),Ue.layers.test(Z.layers)&&xi(Ue,H,Z,ze,at,Ye)}}function xi(A,H,Z,re,ee,ve){V!==null&&ee.isNodeMaterial&&V.setObject(A,ee),A.onBeforeRender(D,H,Z,re,ee,ve),A.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ee.onBeforeRender(D,H,Z,re,A,ve),ee.transparent===!0&&ee.side===Ji&&ee.forceSinglePass===!1?(ee.side=Kn,ee.needsUpdate=!0,D.renderBufferDirect(Z,H,re,ee,A,ve),ee.side=$s,ee.needsUpdate=!0,D.renderBufferDirect(Z,H,re,ee,A,ve),ee.side=Ji):D.renderBufferDirect(Z,H,re,ee,A,ve),A.onAfterRender(D,H,Z,re,ee,ve)}function yi(A,H,Z){H.isScene!==!0&&(H=de);let re=me.get(A),ee=b.state.lights,ve=b.state.shadowsArray,Ce=ee.state.version,Ue=Me.getParameters(A,ee.state,ve,H,Z,b.state.lightProbeGridArray),ze=Me.getProgramCacheKey(Ue),Ye=re.programs;re.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?H.environment:null,re.fog=H.fog;let at=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;re.envMap=Vt.get(A.envMap||re.environment,at),re.envMapRotation=re.environment!==null&&A.envMap===null?H.environmentRotation:A.envMapRotation,Ye===void 0&&(A.addEventListener("dispose",ms),Ye=new Map,re.programs=Ye);let it=Ye.get(ze);if(it!==void 0){if(re.currentProgram===it&&re.lightsStateVersion===Ce)return ai(A,Ue),it}else Ue.uniforms=Me.getUniforms(A),V!==null&&A.isNodeMaterial&&V.build(A,Z,Ue),A.onBeforeCompile(Ue,D),it=Me.acquireProgram(Ue,ze),Ye.set(ze,it),re.uniforms=Ue.uniforms;let Ne=re.uniforms;return(A.isShaderMaterial||A.isRawShaderMaterial)&&A.clipping!==!0||(Ne.clippingPlanes=St.uniform),ai(A,Ue),re.needsLights=(function(st){return st.isMeshLambertMaterial||st.isMeshToonMaterial||st.isMeshPhongMaterial||st.isMeshStandardMaterial||st.isShadowMaterial||st.isShaderMaterial&&st.lights===!0})(A),re.lightsStateVersion=Ce,re.needsLights&&(Ne.ambientLightColor.value=ee.state.ambient,Ne.lightProbe.value=ee.state.probe,Ne.sunLights.value=ee.state.sun,Ne.sunLightShadows.value=ee.state.sunShadow,Ne.directionalLights.value=ee.state.directional,Ne.directionalLightShadows.value=ee.state.directionalShadow,Ne.spotLights.value=ee.state.spot,Ne.spotLightShadows.value=ee.state.spotShadow,Ne.rectAreaLights.value=ee.state.rectArea,Ne.ltc_1.value=ee.state.rectAreaLTC1,Ne.ltc_2.value=ee.state.rectAreaLTC2,Ne.pointLights.value=ee.state.point,Ne.pointLightShadows.value=ee.state.pointShadow,Ne.hemisphereLights.value=ee.state.hemi,Ne.sunShadowMatrix.value=ee.state.sunShadowMatrix,Ne.sunShadowCascade.value=ee.state.sunShadowCascade,Ne.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,Ne.spotLightMatrix.value=ee.state.spotLightMatrix,Ne.spotLightMap.value=ee.state.spotLightMap,Ne.pointShadowMatrix.value=ee.state.pointShadowMatrix),re.lightProbeGrid=b.state.lightProbeGridArray.length>0,re.currentProgram=it,re.uniformsList=null,it}function Gn(A){if(A.uniformsList===null){let H=A.currentProgram.getUniforms();A.uniformsList=ea.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function ai(A,H){let Z=me.get(A);Z.outputColorSpace=H.outputColorSpace,Z.batching=H.batching,Z.batchingColor=H.batchingColor,Z.instancing=H.instancing,Z.instancingColor=H.instancingColor,Z.instancingMorph=H.instancingMorph,Z.skinning=H.skinning,Z.morphTargets=H.morphTargets,Z.morphNormals=H.morphNormals,Z.morphColors=H.morphColors,Z.morphTargetsCount=H.morphTargetsCount,Z.numClippingPlanes=H.numClippingPlanes,Z.numIntersection=H.numClipIntersection,Z.vertexAlphas=H.vertexAlphas,Z.vertexTangents=H.vertexTangents,Z.toneMapping=H.toneMapping}function nn(A){let H=me.get(A);return H.__readFormat===A.format&&H.__readType===A.type||(H.__readFormat=A.format,H.__readType=A.type,H.__formatReadable=Ve.textureFormatReadable(A.format),H.__typeReadable=Ve.textureTypeReadable(A.type)),H}bt.setAnimationLoop(function(A){vr&&vr(A)}),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(A){vr=A,tt.setAnimationLoop(A),A===null?bt.stop():bt.start()},tt.addEventListener("sessionstart",Sn),tt.addEventListener("sessionend",ht),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0)return void rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(j===!0)return;V!==null&&V.renderStart(A,H);let Z=tt.enabled===!0&&tt.isPresenting===!0,re=k!==null&&(J===null||Z)&&k.begin(D,J);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),tt.enabled!==!0||tt.isPresenting!==!0||k!==null&&k.isCompositing()!==!1||(tt.cameraAutoUpdate===!0&&tt.updateCamera(H),H=tt.getCamera()),A.isScene===!0&&A.onBeforeRender(D,A,H,J),b=Ut.get(A,O.length),b.init(H),b.state.textureUnits=Le.getTextureUnits(),O.push(b),q.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),z.setFromProjectionMatrix(q,Tu,H.reversedDepth),R=this.localClippingEnabled,F=St.init(this.clippingPlanes,R),S=ge.get(A,I.length),S.init(),I.push(S),tt.enabled===!0&&tt.isPresenting===!0){let ve=D.xr.getDepthSensingMesh();ve!==null&&mn(ve,H,-1/0,D.sortObjects)}mn(A,H,0,D.sortObjects),S.finish(),V!==null&&V.updateLights(b.state.lightsArray),D.sortObjects===!0&&S.sort(w,E),Te=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,Te&&Bt.addToRenderList(S,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),F===!0&&St.beginShadows();let ee=b.state.shadowsArray;if(Ft.render(ee,A,H),F===!0&&St.endShadows(),(re&&k.hasRenderPass())===!1){let ve=S.opaque,Ce=S.transmissive;if(b.setupLights(),H.isArrayCamera){let Ue=H.cameras;if(Ce.length>0)for(let ze=0,Ye=Ue.length;ze<Ye;ze++)Fn(ve,Ce,A,Ue[ze]);Te&&Bt.render(A);for(let ze=0,Ye=Ue.length;ze<Ye;ze++){let at=Ue[ze];be(S,A,at,at.viewport)}}else Ce.length>0&&Fn(ve,Ce,A,H),Te&&Bt.render(A),be(S,A,H)}J!==null&&N===0&&(Le.updateMultisampleRenderTarget(J),Le.updateRenderTargetMipmap(J)),re&&k.end(D),A.isScene===!0&&A.onAfterRender(D,A,H),kn.resetDefaultState(),ce=-1,Oe=null,O.pop(),O.length>0?(b=O[O.length-1],Le.setTextureUnits(b.state.textureUnits),F===!0&&St.setGlobalState(D.clippingPlanes,b.state.camera)):b=null,I.pop(),S=I.length>0?I[I.length-1]:null,V!==null&&V.renderEnd()},this.getActiveCubeFace=function(){return ne},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(A,H,Z){let re=me.get(A);re.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,re.__autoAllocateDepthBuffer===!1&&(re.__useRenderToTexture=!1),me.get(A.texture).__webglTexture=H,me.get(A.depthTexture).__webglTexture=re.__autoAllocateDepthBuffer?void 0:Z,re.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,H){let Z=me.get(A);Z.__webglFramebuffer=H,Z.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(A,H=0,Z=0){J=A,ne=H,N=Z;let re=null,ee=!1,ve=!1;if(A){let Ce=me.get(A);if(Ce.__useDefaultFramebuffer!==void 0)return oe.bindFramebuffer(W.FRAMEBUFFER,Ce.__webglFramebuffer),xe.copy(A.viewport),Be.copy(A.scissor),we=A.scissorTest,oe.viewport(xe),oe.scissor(Be),oe.setScissorTest(we),void(ce=-1);if(Ce.__webglFramebuffer===void 0)Le.setupRenderTarget(A);else if(Ce.__hasExternalTextures)Le.rebindTextures(A,me.get(A.texture).__webglTexture,me.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ye=A.depthTexture;if(Ce.__boundDepthTexture!==Ye){if(Ye!==null&&me.has(Ye)&&(A.width!==Ye.image.width||A.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Le.setupDepthRenderbuffer(A)}}let Ue=A.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(ve=!0);let ze=me.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(re=Array.isArray(ze[H])?ze[H][Z]:ze[H],ee=!0):re=A.samples>0&&Le.useMultisampledRTT(A)===!1?me.get(A).__webglMultisampledFramebuffer:Array.isArray(ze)?ze[Z]:ze,xe.copy(A.viewport),Be.copy(A.scissor),we=A.scissorTest}else xe.copy(C).multiplyScalar(he).floor(),Be.copy(U).multiplyScalar(he).floor(),we=y;if(Z!==0&&(re=Q),oe.bindFramebuffer(W.FRAMEBUFFER,re)&&oe.drawBuffers(A,re),oe.viewport(xe),oe.scissor(Be),oe.setScissorTest(we),ee){let Ce=me.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ce.__webglTexture,Z)}else if(ve){let Ce=H;for(let Ue=0;Ue<A.textures.length;Ue++){let ze=me.get(A.textures[Ue]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+Ue,ze.__webglTexture,Z,Ce)}}else if(A!==null&&Z!==0){let Ce=me.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Ce.__webglTexture,Z)}ce=-1},this.readRenderTargetPixels=function(A,H,Z,re,ee,ve,Ce,Ue=0){if(!A||!A.isWebGLRenderTarget)return void rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=me.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ce!==void 0&&(ze=ze[Ce]),ze){oe.bindFramebuffer(W.FRAMEBUFFER,ze);try{let Ye=A.textures[Ue],at=Ye.format,it=Ye.type;A.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+Ue);let Ne=nn(Ye);if(Ne.__formatReadable===!1)return void rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(Ne.__typeReadable===!1)return void rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");H>=0&&H<=A.width-re&&Z>=0&&Z<=A.height-ee&&W.readPixels(H,Z,re,ee,tn.convert(at),tn.convert(it),ve)}finally{let Ye=J!==null?me.get(J).__webglFramebuffer:null;oe.bindFramebuffer(W.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(A,H,Z,re,ee,ve,Ce,Ue=0){if(!A||!A.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=me.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ce!==void 0&&(ze=ze[Ce]),ze){if(H>=0&&H<=A.width-re&&Z>=0&&Z<=A.height-ee){oe.bindFramebuffer(W.FRAMEBUFFER,ze);let Ye=A.textures[Ue],at=Ye.format,it=Ye.type;A.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+Ue);let Ne=nn(Ye);if(Ne.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ne.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let st=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,st),W.bufferData(W.PIXEL_PACK_BUFFER,ve.byteLength,W.STREAM_READ),W.readPixels(H,Z,re,ee,tn.convert(at),tn.convert(it),0),W.bindBuffer(W.PIXEL_PACK_BUFFER,null);let Wt=J!==null?me.get(J).__webglFramebuffer:null;oe.bindFramebuffer(W.FRAMEBUFFER,Wt);let wt=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await Tf(W,wt,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,st),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,ve),W.bindBuffer(W.PIXEL_PACK_BUFFER,null),W.deleteBuffer(st),W.deleteSync(wt),ve}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,H=null,Z=0){let re=Math.pow(2,-Z),ee=Math.floor(A.image.width*re),ve=Math.floor(A.image.height*re),Ce=H!==null?H.x:0,Ue=H!==null?H.y:0;Le.setTexture2D(A,0),W.copyTexSubImage2D(W.TEXTURE_2D,Z,0,0,Ce,Ue,ee,ve),oe.unbindTexture()},this.copyTextureToTexture=function(A,H,Z=null,re=null,ee=0,ve=0){let Ce,Ue,ze,Ye,at,it,Ne,st,Wt,wt=A.isCompressedTexture?A.mipmaps[ve]:A.image;if(Z!==null)Ce=Z.max.x-Z.min.x,Ue=Z.max.y-Z.min.y,ze=Z.isBox3?Z.max.z-Z.min.z:1,Ye=Z.min.x,at=Z.min.y,it=Z.isBox3?Z.min.z:0;else{let Ze=Math.pow(2,-ee);Ce=Math.floor(wt.width*Ze),Ue=Math.floor(wt.height*Ze),ze=A.isDataArrayTexture?wt.depth:A.isData3DTexture?Math.floor(wt.depth*Ze):1,Ye=0,at=0,it=0}re!==null?(Ne=re.x,st=re.y,Wt=re.z):(Ne=0,st=0,Wt=0);let zt=tn.convert(H.format),dt=tn.convert(H.type),Ot;H.isData3DTexture?(Le.setTexture3D(H,0),Ot=W.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(Le.setTexture2DArray(H,0),Ot=W.TEXTURE_2D_ARRAY):(Le.setTexture2D(H,0),Ot=W.TEXTURE_2D),oe.activeTexture(W.TEXTURE0),oe.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,H.flipY),oe.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),oe.pixelStorei(W.UNPACK_ALIGNMENT,H.unpackAlignment);let yn=oe.getParameter(W.UNPACK_ROW_LENGTH),$e=oe.getParameter(W.UNPACK_IMAGE_HEIGHT),je=oe.getParameter(W.UNPACK_SKIP_PIXELS),on=oe.getParameter(W.UNPACK_SKIP_ROWS),B=oe.getParameter(W.UNPACK_SKIP_IMAGES);oe.pixelStorei(W.UNPACK_ROW_LENGTH,wt.width),oe.pixelStorei(W.UNPACK_IMAGE_HEIGHT,wt.height),oe.pixelStorei(W.UNPACK_SKIP_PIXELS,Ye),oe.pixelStorei(W.UNPACK_SKIP_ROWS,at),oe.pixelStorei(W.UNPACK_SKIP_IMAGES,it);let se=A.isDataArrayTexture||A.isData3DTexture,ye=H.isDataArrayTexture||H.isData3DTexture;if(A.isDepthTexture){let Ze=me.get(A),Ge=me.get(H),pt=me.get(Ze.__renderTarget),Xe=me.get(Ge.__renderTarget);oe.bindFramebuffer(W.READ_FRAMEBUFFER,pt.__webglFramebuffer),oe.bindFramebuffer(W.DRAW_FRAMEBUFFER,Xe.__webglFramebuffer);for(let Lt=0;Lt<ze;Lt++)se&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,me.get(A).__webglTexture,ee,it+Lt),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,me.get(H).__webglTexture,ve,Wt+Lt)),W.blitFramebuffer(Ye,at,Ce,Ue,Ne,st,Ce,Ue,W.DEPTH_BUFFER_BIT,W.NEAREST);oe.bindFramebuffer(W.READ_FRAMEBUFFER,null),oe.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(ee!==0||A.isRenderTargetTexture||me.has(A)){let Ze=me.get(A),Ge=me.get(H);oe.bindFramebuffer(W.READ_FRAMEBUFFER,ae),oe.bindFramebuffer(W.DRAW_FRAMEBUFFER,ie);for(let pt=0;pt<ze;pt++)se?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ze.__webglTexture,ee,it+pt):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Ze.__webglTexture,ee),ye?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ge.__webglTexture,ve,Wt+pt):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Ge.__webglTexture,ve),ee!==0?W.blitFramebuffer(Ye,at,Ce,Ue,Ne,st,Ce,Ue,W.COLOR_BUFFER_BIT,W.NEAREST):ye?W.copyTexSubImage3D(Ot,ve,Ne,st,Wt+pt,Ye,at,Ce,Ue):W.copyTexSubImage2D(Ot,ve,Ne,st,Ye,at,Ce,Ue);oe.bindFramebuffer(W.READ_FRAMEBUFFER,null),oe.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else ye?A.isDataTexture||A.isData3DTexture?W.texSubImage3D(Ot,ve,Ne,st,Wt,Ce,Ue,ze,zt,dt,wt.data):H.isCompressedArrayTexture?W.compressedTexSubImage3D(Ot,ve,Ne,st,Wt,Ce,Ue,ze,zt,wt.data):W.texSubImage3D(Ot,ve,Ne,st,Wt,Ce,Ue,ze,zt,dt,wt):A.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,ve,Ne,st,Ce,Ue,zt,dt,wt.data):A.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,ve,Ne,st,wt.width,wt.height,zt,wt.data):W.texSubImage2D(W.TEXTURE_2D,ve,Ne,st,Ce,Ue,zt,dt,wt);oe.pixelStorei(W.UNPACK_ROW_LENGTH,yn),oe.pixelStorei(W.UNPACK_IMAGE_HEIGHT,$e),oe.pixelStorei(W.UNPACK_SKIP_PIXELS,je),oe.pixelStorei(W.UNPACK_SKIP_ROWS,on),oe.pixelStorei(W.UNPACK_SKIP_IMAGES,B),ve===0&&H.generateMipmaps&&W.generateMipmap(Ot),oe.unbindTexture()},this.initRenderTarget=function(A){me.get(A).__webglFramebuffer===void 0&&Le.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Le.setTextureCube(A,0):A.isData3DTexture?Le.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Le.setTexture2DArray(A,0):Le.setTexture2D(A,0),oe.unbindTexture()},this.resetState=function(){ne=0,N=0,J=null,oe.reset(),kn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tu}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ct._getUnpackColorSpace()}};var gr={normal:1,related:.85,weak:.5,quiet:.3,away:.1},um=3,Zu=i=>i.normalize("NFD").replace(/\p{M}/gu,"").toLowerCase();function Ju(i,e,t=8){let n=Zu(e).split(/\s+/).filter(Boolean);return n.length?i.map(r=>{let s=Zu(r.title),a=Zu(`${r.title} ${r.body} ${r.extra}`);if(!n.every(l=>a.includes(l)))return null;let o=n.reduce((l,c)=>l+(s.startsWith(c)?3:s.includes(c)?2:1),0)+r.weight*.1;return{item:r,score:o}}).filter(Boolean).sort((r,s)=>s.score-r.score||r.item.order-s.item.order).slice(0,t).map(({item:r})=>r):[]}function pc(i,e){let t=i[e],n=new Map(i.map((a,o)=>[a.id,o])),r=new Set(t.links.filter(a=>n.has(a)&&a!==t.id).map(a=>n.get(a)));i.forEach((a,o)=>o!==e&&a.links.includes(t.id)&&r.add(o));let s=new Set;for(let[a,o]of Object.entries(t.members))for(let l of o){let c=i.map((p,d)=>p.members[a]?.includes(l)?d:-1).filter(p=>p>=0),h=c.indexOf(e);for(let p of[c[h-1],c[h+1]])p!==void 0&&!r.has(p)&&s.add(p)}return{links:[...r].sort((a,o)=>a-o),near:[...s].sort((a,o)=>a-o)}}function Ku(i,e,t=um){let n=i[e],{links:r,near:s}=pc(i,e),a=new Set(r),o=c=>Object.entries(n.members).reduce((h,[p,d])=>h+d.filter(u=>c.members[p]?.includes(u)).length,0),l=c=>(a.has(c)?100:0)+o(i[c])*10+1/(1+Math.abs(i[c].year-n.year));return[...r,...s].sort((c,h)=>l(h)-l(c)||c-h).slice(0,t)}function dm(i,e,t=um){let{links:n}=pc(i,e);return Ku(i,e,1/0).filter(r=>n.includes(r)).slice(0,t)}function pm(i,e,t=3,n=3){let r=i.map((a,o)=>[a,o]).filter(([a])=>a.period===e).sort((a,o)=>o[0].weight-a[0].weight||a[0].year-o[0].year||a[1]-o[1]),s=[];for(let[a,o]of r){if(s.length>=t)break;s.every(([l])=>!a.position||!l.position||Math.hypot(...a.position.map((c,h)=>c-l.position[h]))>=n)&&s.push([a,o])}return s.map(([,a])=>a)}function fm(i,e,t=null){if(!t)return{previous:e>0?e-1:null,next:e<i.length-1?e+1:null};let n=no(i,t),r=n.indexOf(e);return r<0?{previous:n.findLast(s=>s<e)??null,next:n.find(s=>s>e)??null}:{previous:n[r-1]??null,next:n[r+1]??null}}function mm(i,e,t,n,r=3){let s=ar.flatMap(a=>(e[a]??[]).map((o,l)=>({facet:a,item:l,title:t[a]?.[o]??o,body:"",extra:"",count:no(i,{facet:a,item:l}).length}))).filter(a=>a.count>0);return Ju(s.map((a,o)=>({...a,weight:Math.min(3,a.count/4),order:o})),n,r)}function gm(i,{selected:e=-1,near:t=new Set,weak:n=new Set,filter:r=null}){return i.map((s,a)=>{let o=gr.normal;return e>=0&&(o=a===e?1:t.has(a)?gr.related:n.has(a)?gr.weak:gr.quiet),r&&!(s.members[r.facet]??[]).includes(r.item)&&(o=a===e?1:Math.min(o,gr.away)),o})}var _m=(i,e)=>i.map((t,n)=>e.has(n)?1:gr.quiet),vm=(i,e)=>[...i].map(t=>[t,e,!0]),no=(i,e)=>e?i.map((t,n)=>(t.members[e.facet]??[]).includes(e.item)?n:-1).filter(t=>t>=0):[],xm={threads:"thread-",people:"person-",places:"place-"},Qu=(i,e)=>`${xm[i]}${e}`;function ym(i,e){let[t,n]=Object.entries(xm).find(([,s])=>i.startsWith(s))??[],r=t?(e[t]??[]).indexOf(i.slice(n.length)):-1;return r>=0?{facet:t,item:r}:null}var Sm=.06;function fc(i,e,t=n=>i[n].position){if(e.length<2)return[];let n=new Map(e.map(o=>[o,t(o)])),r=(o,l)=>Math.hypot(n.get(o)[0]-n.get(l)[0],n.get(o)[1]-n.get(l)[1]),s=new Map(e.slice(1).map(o=>[o,{from:e[0],d:r(e[0],o)}])),a=[];for(;s.size;){let o=-1,l=1/0;for(let[h,{d:p}]of s)(p<l||p===l&&h<o)&&([o,l]=[h,p]);let{from:c}=s.get(o);s.delete(o),a.push([c,o,i[c].period!==i[o].period]);for(let[h,p]of s){let d=r(o,h);d<p.d&&s.set(h,{from:o,d})}}return a}function Mm(i,e){let t=e.map(n=>Math.floor(i[n].year));return{count:e.length,from:Math.min(...t),to:Math.max(...t)}}var bm=({count:i,from:e,to:t},{one:n,many:r})=>`${(i===1?n:r).replace("{n}",String(i))} \xB7 ${e===t?e:`${e}\u2013${t}`}`;function Tm(i,e,t){let n=new Array(t).fill(0);for(let r of e)i[r].period>=0&&n[i[r].period]++;return n}var G1=10,H1=3,W1=8,cm=[[1,0],[-1,0],[0,1],[0,-1]],hm=[[1,1],[-1,1],[1,-1],[-1,-1]];function Em({x:i,y:e,r:t},{width:n,height:r},s,a=12){let o=t+G1,l=(d,u,m,f)=>{let v=u===0?i+d*m-(d<0?n:0):Math.min(Math.max(i-n/2,a),s-n-a),g=u===0?e-r/2:u>0?e+m-2:e-m+2-r;return{left:v,right:v+n,top:g,bottom:g+r,far:f}},c=(d,u,m,f)=>{let v=i+d*m-(d<0?n:0),g=e+u*m-(u<0?r:0);return{left:v,right:v+n,top:g,bottom:g+r,far:f}},h=r+4,p=Array.from({length:H1},(d,u)=>o+(u+1)*h);return[...cm.map(([d,u])=>l(d,u,o,!1)),...hm.map(([d,u])=>c(d,u,o,!1)),...p.flatMap(d=>[...cm.map(([u,m])=>l(u,m,d,!0)),...hm.map(([u,m])=>c(u,m,d,!0))])]}function wm(i,{free:e,clear:t,inside:n,forced:r=!1,keep:s=-1}){let a=s>=0?i.find(o=>o.slot===s):void 0;return a&&e(a)&&t(a)?a:i.find(o=>e(o)&&t(o))??i.find(e)??(r?i.find(o=>o.far===!1&&n(o))??i[0]:null)}function ed(i,{x:e,y:t,r:n}){let r=Math.min(Math.max(e,i.left),i.right),s=Math.min(Math.max(t,i.top),i.bottom),a=Math.hypot(e-r,t-s)-n*.45;return a>4?{x:r-i.left,y:s-i.top,length:a,angle:Math.atan2(t-s,e-r)}:null}var Am=i=>Math.min(i,70)+W1;function Rm(i){let e=new Map;return i.forEach((t,n)=>{if(t.period<0)return;let r=e.get(t.period);(r===void 0||t.weight>i[r].weight||t.weight===i[r].weight&&t.year<i[r].year)&&e.set(t.period,n)}),[...e.entries()].sort((t,n)=>t[0]-n[0]).map(([,t])=>t)}function Cm(i,e){let t=n=>n.visible!==!1&&n.x>=e.left&&n.x<=e.right&&n.y>=e.top&&n.y<=e.bottom;for(let n=1;n<i.length;n++){let r=i[n-1],s=i[n];if(!t(r)||t(s))continue;let a=0,o=1;for(let l=0;l<18;l++){let c=(a+o)/2;t({visible:s.visible,x:r.x+(s.x-r.x)*c,y:r.y+(s.y-r.y)*c})?a=c:o=c}return{t:(n-1+a)/(i.length-1),x:r.x+(s.x-r.x)*a,y:r.y+(s.y-r.y)*a,angle:Math.atan2(s.y-r.y,s.x-r.x)}}return null}function Im(i,e){return[[Math.abs(i.y-e.top),"top"],[Math.abs(i.x-e.right),"right"],[Math.abs(i.y-e.bottom),"bottom"],[Math.abs(i.x-e.left),"left"]].reduce((n,r)=>r[0]<n[0]?r:n)[1]}function Pm(i,e,{width:t,height:n},r,s=8){let a=h=>Math.min(Math.max(h,r.left),Math.max(r.left,r.right-t)),o=h=>Math.min(Math.max(h,r.top),Math.max(r.top,r.bottom-n)),l=e==="left"?i.x+s:e==="right"?i.x-s-t:a(i.x-t/2),c=e==="top"?i.y+s:e==="bottom"?i.y-s-n:o(i.y-n/2);return{left:l,right:l+t,top:c,bottom:c+n}}function Lm(i,e,t=4,n=[]){let r=[...n],s=.5,a=(o,l)=>o.left<l.right+t-s&&o.right+t>l.left+s&&o.top<l.bottom+t-s&&o.bottom+t>l.top+s;for(let o of i){let l=o.side==="top"||o.side==="bottom"?"top":"left",c=l==="top"?o.box.bottom-o.box.top:o.box.right-o.box.left,h=o.side==="bottom"||o.side==="right"?-1:1,p=o.box;for(let u=0;u<4&&r.some(m=>a(p,m));u++){let m=(c+t)*h*(u+1);p=l==="top"?{...o.box,top:o.box.top+m,bottom:o.box.bottom+m}:{...o.box,left:o.box.left+m,right:o.box.right+m}}p.left>=e.left-1&&p.right<=e.right+1&&p.top>=e.top-1&&p.bottom<=e.bottom+1&&!r.some(u=>a(p,u))?(r.push(p),o.box=p,o.shown=!0):o.shown=!1}return i}function Nm(i,{width:e,height:t,pad:n=6}){let r=i.map(u=>u[0]),s=i.map(u=>u[1]),[a,o,l,c]=[Math.min(...r),Math.max(...r),Math.min(...s),Math.max(...s)],h=Math.min((e-2*n)/(o-a||1),(t-2*n)/(c-l||1)),p=(e-(o-a)*h)/2,d=(t-(c-l)*h)/2;return{scale:h,to:([u,m])=>[p+(u-a)*h,d+(c-m)*h],from:([u,m])=>[a+(u-p)/h,c-(m-d)/h]}}function Dm(i,[e,t],n=1.35){let r=-1,s=n;return i.forEach((a,o)=>{let l=Math.hypot(a.centre[0]-e,a.centre[1]-t)/a.radius;l<s&&([r,s]=[o,l])}),r}var X1=.75,Um=(i,e,t=520,n=!0)=>i<X1&&e>=t&&n,_r={tiers:[{keep:1,ratio:1/0},{keep:.65,ratio:1.5},{keep:.4,ratio:1}],slow:1e3/30,window:90,windows:3},mc={fps:24,hidden:1},Om=(i,e,t=mc.fps)=>{let n=1e3/t,r=e-i.last;return r<n-1?!1:(i.last=e-Math.min(Math.max(r-n,0),n/2),!0)},Fm=(i,e=mc.fps)=>Math.max(0,i-1e3/e)+1e3/60,q1={days:45},Bm=(i,e=new Date)=>{if(!/^\d{4}-\d{2}$/.test(i??""))return!1;let t=(e-new Date(+i.slice(0,4),+i.slice(5,7)-1,1))/864e5;return t>=0&&t<q1.days},zm=i=>i.length?i.reduce((e,t)=>e+t,0)/i.length:0,Vm=(i,e)=>e>_r.slow&&i<_r.tiers.length-1?i+1:i;function km(i){return[...[...new Set(i.map(t=>t.period).filter(t=>t>=0))].sort((t,n)=>t-n).map(t=>({age:t})),{ahead:"book"},{ahead:"clone"}]}function Gm(i,{now:e,idleSince:t,eligible:n,plan:r},{wait:s=20,hold:a=6}={}){if(!r.length)return{state:i,open:null};if(i.phase==="off")return{state:i,open:null};if(i.phase==="touring"){if(t>i.at||!n)return{state:{phase:"off",step:0,at:e},open:null,stopped:!0};if(e-i.at<a)return{state:i,open:null};let o=i.step+1;return o>=r.length?{state:{phase:"off",step:0,at:e},open:null,done:!0}:{state:{phase:"touring",step:o,at:e},open:r[o]}}return n&&e-Math.max(t,i.at)>=s?{state:{phase:"touring",step:0,at:e},open:r[0]}:{state:i,open:null}}var gc={minDistance:6,maxDistance:640,minPitch:-1.3,maxPitch:1.3},Rn=(i,e,t)=>Math.min(t,Math.max(e,i));function Hm({target:i,distance:e,yaw:t,pitch:n}){let r=Math.cos(n);return[i[0]+e*r*Math.sin(t),i[1]+e*Math.sin(n),i[2]+e*r*Math.cos(t)]}var td=(i,e)=>Rn(i*Math.exp(e),gc.minDistance,gc.maxDistance),Wm=({yaw:i,pitch:e},t,n)=>({yaw:i+t,pitch:Rn(e+n,gc.minPitch,gc.maxPitch)});function Xm({target:i,distance:e,yaw:t,pitch:n},r,s,a,o){let l=2*e*Math.tan(o/2)/a,c=[Math.cos(t),0,-Math.sin(t)],h=[-Math.sin(n)*Math.sin(t),Math.cos(n),-Math.sin(n)*Math.cos(t)];return i.map((p,d)=>p-c[d]*r*l+h[d]*s*l)}var zr=(i,e,t,n)=>Number.isFinite(i)?i+(e-i)*(1-Math.exp(-n*Math.max(0,t))):e,j1=(i,e)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i));function qm(i,e,t,n){return{target:i.target.map((r,s)=>zr(r,e.target[s],t,n)),distance:Math.exp(zr(Math.log(i.distance),Math.log(e.distance),t,n)),yaw:zr(i.yaw,j1(i.yaw,e.yaw),t,n),pitch:zr(i.pitch,e.pitch,t,n)}}var _c=[0,2,4,7,9],ra=[{root:0,pad:[0,7,14,16]},{root:-7,pad:[0,7,9,16]},{root:-3,pad:[4,9,14,19]},{root:-5,pad:[2,9,14,21]},{root:2,pad:[2,5,9,12]}],He={tuning:432,base:432*2**(-7/12),octaves:2,from:1980,to:2030,master:.7,soften:2200,floor:30,fade:9,chordFrom:24,chordTo:38,detune:4,padCut:760,padSwing:220,padLevel:.0052,shimmerLevel:7e-4,subLevel:.007,airLevel:.012,airCut:520,room:1,reach:.03,bed:{pad:[.35,.8],shimmer:[.1,1],air:[.2,.9],sub:[1,0]},note:[.8,1],hover:[.15,1],swell:[.3,1],travel:[.15,1],tick:432,tickGap:1.4,tickPeak:.01,noteGap:.3,swellPeak:.022,travelPeak:.015,arrival:.4,voices:4,crowd:.5,fadeIn:3.5,fadeOut:.7,suspendAfter:4e3,interval:2e3,horizon:4,breath:{period:11,inhale:.4,pad:.25,air:.3,harmonics:12},pink:{level:.0108,low:110,high:1500}},nd={now:{breath:!1,pink:!1,chordTick:!1,change:3,reverb:5},next:{breath:!0,pink:!0,chordTick:!0,change:5,reverb:5}},io=-19,Y1=-43,na=i=>He.tuning*2**(i/12),ia=i=>Math.min(1,Math.max(0,i));function jm(i){let e=_c.length*He.octaves,t=Math.min(e-1,Math.floor(ia((i-He.from)/(He.to-He.from))*e)),n=_c[t%_c.length]+12*Math.floor(t/_c.length);return He.base*2**(n/12)}var Ym=i=>({1:3,2:4.5,3:6})[i]??3,$m=i=>.024+.007*Math.min(3,Math.max(1,i)),Zm=i=>na(i==="clone"?io:io-7),Jm=i=>1/(1+He.crowd*i),id=(i,e,t=He.tickGap)=>i-e>=t;function Km(i){let{root:e,pad:t}=ra[i%ra.length];return{sub:na(Y1+(e%12+12)%12),pad:t.map(n=>na(io+n)),shimmer:t.slice(2).map(n=>na(io+n+12))}}function $1(i,e){let t=ra.map((n,r)=>r).filter(n=>n!==i);return t[Math.min(t.length-1,Math.floor(ia(e)*t.length))]}var rd=i=>i<0?0:i%ra.length,sd=(i,e,t)=>i===null?$1(e,t):rd(i),ad=i=>He.chordFrom+ia(i)*(He.chordTo-He.chordFrom);function od(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,e|1);return t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Qm(i,e){let t=od(e),n=new Float32Array(i),r=0,s=0;for(let a=0;a<i;a++)r=(r+.04*(t()*2-1))/1.04,n[a]=r,s=Math.max(s,Math.abs(r));for(let a=0;a<i;a++)n[a]/=s;return n}function eg(i,e){let t=od(e),n=new Float32Array(i),[r,s,a]=[0,0,0],o=0;for(let l=0;l<i;l++){let c=t()*2-1;r=.99765*r+c*.099046,s=.963*s+c*.2965164,a=.57*a+c*1.0526913,n[l]=r+s+a+c*.1848,o=Math.max(o,Math.abs(n[l]))}for(let l=0;l<i;l++)n[l]/=o;return n}function ld(i,e=He.breath.inhale){let t=i-Math.floor(i);return t<e?-Math.cos(Math.PI*t/e):Math.cos(Math.PI*(t-e)/(1-e))}function tg(i=He.breath.inhale,e=He.breath.harmonics,t=2048){let n=new Float32Array(e+1),r=new Float32Array(e+1);for(let s=0;s<t;s++){let a=s/t,o=ld(a,i);for(let l=1;l<=e;l++)n[l]+=2*o*Math.cos(2*Math.PI*l*a)/t,r[l]+=2*o*Math.sin(2*Math.PI*l*a)/t}return{real:n,imag:r}}function ng(i){let e=n=>Math.abs(Math.log2(n/He.tick)),t=n=>n*2**Math.round(Math.log2(He.tick/n));return ra[i%ra.length].pad.map(n=>t(na(io+n))).reduce((n,r)=>e(r)<e(n)-1e-9?r:n)}function ig(i,e=1,t=nd.next.reverb){let n=Math.floor(i*t*1.1);return[0,1].map(r=>{let s=od(e+r*7919),a=new Float32Array(n),o=0;for(let l=0;l<n;l++){let c=l/i,h=ia((c-He.reach)/.05),p=Math.exp(-6.9078*c/t),d=ia((n-l)/(i*.4)),u=3200*(600/3200)**ia(c/t);o+=(1-Math.exp(-2*Math.PI*u/i))*(s()*2-1-o),a[l]=o*h*p*d}return a})}var Z1=[[1,1,1],[2,.22,.5],[3,.08,.3],[4.07,.03,.2]],J1=[[1,1,1],[1.5,.25,1.2]],K1=[[1,1,1]];function Q1(i,{random:e=Math.random,profile:t=nd.next,output:n=i.destination}={}){let r=i.sampleRate,s={at:i.currentTime+.05,chord:0,lastNote:-1/0,lastTick:-1/0,period:-1,year:0,voices:[],layers:[],hold:null,stopped:!1},a=(X=0)=>{let te=i.createGain();return te.gain.value=X,te},o=(X,te,le=.5)=>{let he=i.createBiquadFilter();return he.type=X,he.frequency.value=te,he.Q.value=le,he},l=(X,te,le=0)=>{let he=i.createOscillator();return he.type=X,he.frequency.value=te,he.detune.value=le,he},c=X=>{let te=i.createBuffer(X.length,X[0].length,r);return X.forEach((le,he)=>te.getChannelData(he).set(le)),te},h=[],p=(X,te,le)=>{let he=l("sine",X);h.push(he);let w=a(te);he.connect(w),w.connect(le),he.start()},d=a(0),u=o("highpass",He.floor,.7),m=o("lowpass",He.soften,.5),f=a(1);f.connect(m),m.connect(u),u.connect(d),d.connect(n);let v=i.createConvolver();v.buffer=c(ig(r,1,t.reverb));let g=a(He.room);v.connect(g),g.connect(f);let _=([X,te])=>{let le=a(X),he=a(te);return le.connect(f),he.connect(v),[le,he]},M=(X,te)=>te.forEach(le=>X.connect(le)),T=_(He.bed.pad),S=_(He.bed.shimmer),b=_(He.bed.air),I=_(He.bed.sub),O=_(He.note),k=_(He.hover),D=_(He.swell),j=_(He.travel),V=o("lowpass",He.padCut,.3),Q=a(1);V.connect(Q),M(Q,T),p(.031,He.padSwing,V.frequency);let ae=a(.6);M(ae,S),p(.057,.4,ae.gain);let ie=c([Qm(r*6,11)]),ne=i.createBufferSource(),N=a(t.pink?He.pink.level:He.airLevel),J=a(1);if(t.pink){let X=o("highpass",He.pink.low,.5),te=o("lowpass",He.pink.high,.5);ne.buffer=c([eg(r*6,11)]),ne.connect(X),X.connect(te),te.connect(N)}else{let X=o("bandpass",He.airCut,.6);ne.buffer=ie,ne.connect(X),X.connect(N)}ne.loop=!0,N.connect(J),M(J,b),p(.043,N.gain.value*.6,N.gain),ne.start(),h.push(ne);let ce={start:i.currentTime,period:He.breath.period};if(t.breath){let{real:X,imag:te}=tg(),le=i.createOscillator();le.setPeriodicWave(i.createPeriodicWave(X,te,{disableNormalization:!0})),le.frequency.value=1/ce.period,[[Q,He.breath.pad],[J,He.breath.air]].forEach(([he,w])=>{let E=a(w);le.connect(E),E.connect(he.gain)}),ce.start=i.currentTime,le.start(ce.start),h.push(le)}let Oe=X=>()=>X.forEach(te=>te.disconnect()),xe=(X,te,le,he=He.fade)=>{let{sub:w,pad:E,shimmer:C}=Km(X),U=te+le+He.fade;s.layers=s.layers.filter(Y=>Y.end>i.currentTime);let y=new Map,z=Y=>{if(!y.has(Y)){let K=a(1);K.connect(Y),y.set(Y,K)}return y.get(Y)},F={buses:y,oscillators:[],end:U,start:te,index:X};s.layers.push(F);let R=(Y,K,de)=>{let Te=a(0);F.oscillators.push(Y),Te.gain.setValueAtTime(0,te),Te.gain.linearRampToValueAtTime(K,te+he),Te.gain.setValueAtTime(K,U-He.fade),Te.gain.linearRampToValueAtTime(0,U),Y.connect(Te),Te.connect(z(de)),Y.start(te),Y.stop(U+.1),Y.onended=Oe([Y,Te])};E.forEach(Y=>[-He.detune,He.detune].forEach(K=>R(l("triangle",Y,K),He.padLevel,V))),C.forEach(Y=>R(l("sine",Y),He.shimmerLevel,ae));let q=a(1);M(q,I),R(l("sine",w),He.subLevel,q)},Be=(X,{peak:te,attack:le,length:he,partials:w,outputs:E,when:C})=>{let U=Math.max(C,i.currentTime),y=he/4.6,z=le*3,F=a(1);M(F,E),s.voices=s.voices.filter(de=>de.end>U),s.voices.length>=He.voices&&s.voices.shift().duck.gain.setTargetAtTime(0,U,.15);let R=te*Jm(s.voices.length),q=U,Y=null,K=[F];for(let[de,Te,De]of w){let _e=l("sine",X*de),Ve=a(0);Ve.gain.setValueAtTime(0,U),Ve.gain.setTargetAtTime(R*Te,U,le),Ve.gain.setTargetAtTime(0,U+z,y*De),_e.connect(Ve),Ve.connect(F),_e.start(U);let oe=U+z+y*De*8;_e.stop(oe),oe>=q&&(q=oe,Y=_e),K.push(_e,Ve)}Y.onended=Oe(K),s.voices.push({end:q,duck:F})},we=(X,te)=>{let le=Math.max(te,i.currentTime),[he,w]=X>=0?[220,680]:[680,220],E=i.createBufferSource(),C=o("bandpass",he,1.2),U=a(0);E.buffer=ie,E.loop=!0,C.frequency.setValueAtTime(he,le),C.frequency.exponentialRampToValueAtTime(w,le+3.2),U.gain.setValueAtTime(0,le),U.gain.setTargetAtTime(He.travelPeak,le,.5),U.gain.setTargetAtTime(0,le+1.5,.6),E.connect(C),C.connect(U),M(U,j),E.start(le,e()*2),E.stop(le+6.5),E.onended=Oe([E,C,U])},ue=X=>s.layers.filter(te=>te.start<=X&&te.end>X).at(-1)?.index??s.chord;return{master:d,breathing:(X=i.currentTime)=>t.breath?(ld((X-ce.start)/ce.period)+1)/2:null,run(X=He.horizon){if(!s.stopped)for(;s.at<i.currentTime+X;){let te=ad(e());xe(s.chord,s.at,te),s.at+=te,s.chord=sd(s.hold,s.chord,e())}},age(X){if(s.stopped)return;let te=X<0?null:X;if(te===s.hold)return;s.hold=te;let le=i.currentTime;s.layers.forEach(({buses:w,oscillators:E,end:C})=>{C<=le||(w.forEach(U=>U.gain.setTargetAtTime(0,le,t.change/3)),E.forEach(U=>{try{U.stop(le+t.change*2)}catch{}}))}),s.layers=[],s.chord=rd(X);let he=ad(e());xe(s.chord,le,he,t.change),s.at=le+he,s.chord=sd(s.hold,s.chord,e())},fade(X){if(s.stopped)return;let te=i.currentTime;d.gain.cancelScheduledValues(te),d.gain.setTargetAtTime(X?He.master:0,te,X?He.fadeIn:He.fadeOut)},memory({year:X,weight:te,period:le=-1},he=i.currentTime){if(s.stopped||!id(he,s.lastNote,He.noteGap))return;s.lastNote=he;let w=le>=0&&s.period>=0&&le!==s.period;w&&we(X>=s.year?1:-1,he),s.period=le,s.year=X,Be(jm(X),{peak:$m(te),attack:.02,length:Ym(te),partials:Z1,outputs:O,when:he+(w?He.arrival:0)})},swell(X,te=i.currentTime){s.stopped||Be(Zm(X),{peak:He.swellPeak,attack:.9,length:6,partials:J1,outputs:D,when:te})},tick(X=i.currentTime){s.stopped||id(X,s.lastTick)&&(s.lastTick=X,Be(t.chordTick?ng(ue(X)):He.tick,{peak:He.tickPeak,attack:.15,length:1.4,partials:K1,outputs:k,when:X}))},travel(X,te=i.currentTime){s.stopped||we(X,te)},stop(){s.stopped||(s.stopped=!0,[...h,...s.layers.flatMap(X=>X.oscillators)].forEach(X=>{try{X.stop(i.currentTime)}catch{}}),s.layers=[],d.disconnect())}}}function rg(){let i=globalThis.AudioContext??globalThis.webkitAudioContext,e={context:null,graph:null,on:!0,timer:0,stopTimer:0,age:-1};if(!i)return{supported:!1,toggle:()=>!1,start:()=>!1,running:()=>!1,isOn:()=>!1,memory(){},age(){},swell(){},tick(){},travel(){},pause(){},close(){}};let t=()=>e.on&&e.graph,n=()=>{e.context||(e.context=new i,e.graph=Q1(e.context));let{context:r,graph:s}=e;clearTimeout(e.stopTimer),clearInterval(e.timer),s.fade(!0),r.resume?.(),s.age(e.age),s.run(),e.timer=setInterval(()=>s.run(),He.interval)};return{supported:!0,isOn:()=>e.on,running:()=>e.context?.state==="running",start(){return e.on&&!document.hidden&&n(),e.on},toggle(){return!e.context&&e.on?(e.on=!1,!1):(e.on=!e.on,e.on?n():(clearTimeout(e.stopTimer),clearInterval(e.timer),e.graph.fade(!1),e.stopTimer=setTimeout(()=>!e.on&&e.context.suspend?.(),He.suspendAfter)),e.on)},memory(r){t()&&e.graph.memory(r)},swell(r){t()&&e.graph.swell(r)},age(r){e.age=r,t()&&e.graph.age(r)},tick(){t()&&e.graph.tick()},travel(r){t()&&e.graph.travel(r)},pause(r){!e.context||!e.on||(r?e.context.suspend?.():e.context.resume?.())},close(){clearTimeout(e.stopTimer),clearInterval(e.timer),e.on=!0,e.context?.close?.(),e.context=null,e.graph=null}}}var ir={order:.6,jitter:.08,flight:.3,arrive:.54,swirl:2.6,burst:.17,glow:.07},sa={sky:1.4,seed:.9,wait:6,delay:.3,seconds:4,dolly:6,from:1.6,card:.85,first:.9},ag={sky:.5,delay:0,seconds:1.4,card:0},yc={strength:.12,night:["#ecd2b0","#b8cdea","#b8cdea","#ecd2b0"],paper:["#8a5a2b","#2f5f99","#2f5f99","#8a5a2b"]},vc={spin:.07,breath:.05,pace:.5,still:.92},cd={dim:.97,reach:2.6,dust:1.4},xc={radius:.2,push:.04,rate:6},og=.35,sg={ink:.42,edge:0},ro={light:.8,grow:.12},Vr={pull:.1,glow:.3,grow:.12,inRate:2.2,outRate:1.2};var hd=i=>i>=1?1/0:Math.min(1,Math.max(0,(i-ir.arrive*ir.flight)/ir.order)),lg=`
  #define DISCOVER_ORDER ${ir.order.toFixed(2)}
  #define DISCOVER_JITTER ${ir.jitter.toFixed(2)}
  #define DISCOVER_FLIGHT ${ir.flight.toFixed(2)}
  #define DISCOVER_SWIRL ${ir.swirl.toFixed(2)}
  #define DISCOVER_ARRIVE ${ir.arrive.toFixed(2)}
  #define DISCOVER_BURST ${ir.burst.toFixed(2)}
  #define DISCOVER_GLOW ${ir.glow.toFixed(2)}
  #define SPIN_SLOTS ${Mi.slots}
  #define CLOUD_SPIN ${vc.spin.toFixed(3)}
  #define CLOUD_BREATH ${vc.breath.toFixed(3)}
  #define CLOUD_PACE ${vc.pace.toFixed(2)}
  #define CLOUD_STILL ${vc.still.toFixed(2)}
  #define ENTRANCE_FIRST ${sa.first.toFixed(2)}
  #define CORE_DIM ${cd.dim.toFixed(2)}
  #define CORE_REACH ${cd.reach.toFixed(2)}
  #define FAR_DUST ${cd.dust.toFixed(2)}
  #define POINTER_RADIUS ${xc.radius.toFixed(2)}
  #define POINTER_PUSH ${xc.push.toFixed(3)}
  #define HOVER_PULL ${Vr.pull.toFixed(3)}
  #define HOVER_GLOW ${Vr.glow.toFixed(2)}
  #define HOVER_GROW ${Vr.grow.toFixed(2)}
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
    float core = 1.0 - smoothstep(0.0, CORE_REACH, length(off));
    vAlpha = mix(0.09, 0.9, level) * mix(1.0, 0.3, aAhead) * body * uGain * haze * near * (1.0 - 0.55 * uFar * aKind) * (1.0 - CORE_DIM * core * aKind) * (1.0 + FAR_DUST * uFar * (1.0 - aKind));
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
`,cg=`
  #define PAPER_INK ${sg.ink.toFixed(2)}
  #define PAPER_EDGE ${sg.edge.toFixed(2)}
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
`,hg=`
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
`,ug=`
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
`,Sc=`
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
`,Mc=`
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
`;var aa=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,ds=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},Ai=(i,e,t)=>i+(e-i)*t;function dg(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function ps(i){return()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var eS={deep:.6,far:.5,haze:.5,glow:.7},tS=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,nS=`
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
`,iS=i=>1/Math.max(.2,Math.sin(i*Math.PI));function rS(i){let e=document.createElement("canvas");e.width=i,e.height=i/2;let t=e.getContext("2d");t.fillStyle="#000",t.fillRect(0,0,i,i/2),t.globalCompositeOperation="lighter";let n=ps(7),r=(s,a)=>`rgba(${s===0?255:0},${s===1?255:0},${s===2?255:0},${a})`;for(let s of qd({random:n})){t.save(),t.translate(s.u*i,s.v*(i/2)),t.rotate(s.angle),t.scale(iS(s.v),s.squash);let a=t.createRadialGradient(0,0,0,0,0,s.radius);a.addColorStop(0,r(1,s.alpha)),a.addColorStop(.35,r(1,s.alpha*.35)),a.addColorStop(1,r(1,0)),t.fillStyle=a,t.beginPath(),t.arc(0,0,s.radius,0,Math.PI*2),t.fill(),t.restore()}return e}function sS(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.4,"rgba(255,255,255,0.35)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),new Dr(i)}function pg({scene:i,sky:e,mobile:t,ink:n,star:r}){let s=aa(),a={...eS},o=new Dr(rS(2048));o.minFilter=o.magFilter=Qn,o.generateMipmaps=!1,o.wrapS=jl;let l={uMap:{value:o},uInk:n,uOffset:{value:new P},uTime:{value:0},uFar:{value:0},uHaze:{value:0},uHazeMax:{value:jn.haze.alpha}},c=new An({uniforms:l,vertexShader:tS,fragmentShader:nS,transparent:!0,side:Kn,depthTest:!1,depthWrite:!1}),h=new Jn(new qs(1500,48,24),c);h.frustumCulled=!1,h.renderOrder=-3,i.add(h);let p=[0,1,2].map(I=>e.list.reduce((O,k)=>O+k.centre[I],0)/e.list.length),d=Math.max(...e.list.map(I=>Math.hypot(...I.centre.map((O,k)=>O-p[k]))+I.radius*2)),u=Xd({count:t?jn.deep.mobile:jn.deep.count,random:ps(7),centre:p,inner:Math.min(jn.deep.radius/3,Math.max(d*1.15,jn.deep.inner/4))}),m=new Et;m.setAttribute("position",new Pt(u.position,3)),m.setAttribute("aSeed",new Pt(u.seed,1)),m.setAttribute("aBright",new Pt(u.bright,1)),m.setAttribute("aHalo",new Pt(new Float32Array(u.count),1)),m.setAttribute("aSize",new Pt(u.size,1));let f={uTime:r.uTime,uPixel:r.uPixel,uInk:n,uGain:{value:0},uHalo:{value:0}},v=new An({uniforms:f,vertexShader:Sc,fragmentShader:Mc,transparent:!0,depthTest:!1,depthWrite:!1}),g=new Zi(m,v);g.frustumCulled=!1,g.renderOrder=-2,i.add(g);let _=Math.max(1,...e.list.map(I=>I.count)),M=sS(),T=e.list.map(I=>{let{scale:O,strength:k}=jd(I,_),D=new Ca(new ks({map:M,color:16777215,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0}));return D.position.set(...I.centre),D.scale.set(O,O,1),D.renderOrder=-2,i.add(D),{sprite:D,strength:k,scale:O,galaxy:I,reveal:0}}),S={night:!0,quiet:!1,dim:1,formed:1/0,sky:1,boost:1},b=()=>{f.uGain.value=a.deep*S.sky*S.boost*(S.night?1.25:.4),g.visible=a.deep>.001,l.uFar.value=a.far*S.sky,l.uHaze.value=S.quiet?0:a.haze*S.sky,h.visible=l.uFar.value+l.uHaze.value>.001,T.forEach(({sprite:I,strength:O,scale:k,galaxy:D})=>{let j=ds(D.start,D.end,S.formed);I.scale.set(k*(.55+.45*j),k*(.55+.45*j),1),I.material.opacity=O*a.glow*S.dim*j*(S.night?1:.5),I.visible=I.material.opacity>.002,I.material.color.copy(n.value)})};return{applyTheme:I=>{S.night=I,c.blending=I?mr:Ei,c.needsUpdate=!0,v.blending=I?mr:Ei,v.needsUpdate=!0,T.forEach(({sprite:O})=>{O.material.blending=I?mr:Ei,O.material.needsUpdate=!0}),b()},setTier:I=>{S.quiet=I>=2,b()},setDim:I=>{S.dim=I,b()},update:(I,O,k,D=1,j=1)=>{(k!==S.formed||D!==S.sky||j!==S.boost)&&(S.formed=k,S.sky=D,S.boost=j,b()),h.position.copy(O.position),l.uOffset.value.copy(O.position).multiplyScalar(4e-4),l.uTime.value=s?0:I*.01}}}var ud=-.27,md=.35,dd=[0,0,-7],zi=18,fg=40,aS=6,oS=.5,pd=4.2,fd=900,lS=.9,so=10,cS=6,ao={rate:.11,yaw:.14,pitch:.02,rest:2.5};function mg({canvas:i,cloud:e,marks:t,future:n,today:r,mobile:s,sky:a,kinds:o=[]}){let l=new hc({canvas:i,antialias:!1,powerPreference:"high-performance"});l.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2));let c=new Ea,h=new Zn(36,innerWidth/innerHeight,.1,4e3),p=r+Bc[1]+.4,d=new Float32Array(e.count*3);for(let B=0;B<d.length;B++)d[B]=e.position[B]-e.center[B];let u=new Et,m=(B,se)=>new Pt(B,se).setUsage(sc);u.setAttribute("position",new Pt(d,3)),u.setAttribute("aFrom",new Pt(e.from,3)),u.setAttribute("aCenter",new Pt(e.center,3)),Object.entries({u:"aU",order:"aOrder",seed:"aSeed",size:"aSize",ahead:"aAhead",kind:"aKind",memory:"aMemory",galaxy:"aGalaxy"}).forEach(([B,se])=>u.setAttribute(se,new Pt(e[B],1))),["threads","people","places"].forEach((B,se)=>u.setAttribute(`aFacet${se}`,new Pt(e.facet[B],1)));let v=new Float32Array(Math.max(1,t.length)).fill(1),g=new Float32Array(v),_=new Qr(v,v.length,1,Ka,wi);_.minFilter=_.magFilter=Fi,_.needsUpdate=!0;let M=new Float32Array(v.length).fill(-1);o.forEach((B,se)=>M[se]=Vc.indexOf(B));let T=new Qr(M,M.length,1,Ka,wi);T.minFilter=T.magFilter=Fi,T.needsUpdate=!0;let S=Vc.map(()=>new ft),b=()=>(ke.night?yc.night:yc.paper).forEach((B,se)=>S[se].set(B)),I={value:new ft},O=Wd({count:s?4e3:void 0,random:ps(2026)}),k=new Et;k.setAttribute("position",new Pt(O.position,3)),k.setAttribute("aSeed",new Pt(O.seed,1)),k.setAttribute("aBright",new Pt(O.bright,1)),k.setAttribute("aHalo",new Pt(O.halo,1)),k.setAttribute("aSize",new Pt(O.size,1));let D=1.25,j={uTime:{value:0},uPixel:{value:1},uGain:{value:.6},uHalo:{value:1},uInk:I},V=new An({uniforms:j,vertexShader:Sc,fragmentShader:Mc,transparent:!0,depthTest:!1,depthWrite:!1}),Q=new Zi(k,V);Q.frustumCulled=!1,Q.renderOrder=-1,c.add(Q);let ae=pg({scene:c,sky:a,mobile:s,ink:I,star:j}),ie=t.reduce((B,se,ye)=>se.year<t[B].year?ye:B,0),ne=Math.min(1,Math.sqrt(6e4/e.count)),N={uMix:{value:0},uTime:{value:0},uScale:{value:1},uFar:{value:1},uGain:{value:1},uFocusU:{value:0},uFocusW:{value:7},uFocusOn:{value:0},uFilterFacet:{value:-1},uFilterItem:{value:-1},uAway:{value:.12},uReveal:{value:1e4},uLevelCount:{value:v.length},uLevels:{value:_},uKinds:{value:T},uTints:{value:S},uTint:{value:yc.strength},uPaper:{value:0},uSpin:{value:new Float32Array(Mi.slots)},uPivot:{value:Array.from({length:Mi.slots},(B,se)=>new P(...a.list[se]?.centre??[0,0,0]))},uKeep:{value:1},uSeed:{value:ie},uSeedOn:{value:0},uKick:{value:0},uPointer:{value:new P(0,0,0)},uHover:{value:new fe(-1,0)},uInk:I},J=new An({uniforms:N,vertexShader:lg,fragmentShader:cg,transparent:!0,depthTest:!1,depthWrite:!1}),ce=new Zi(u,J);ce.frustumCulled=!1,c.add(ce);let Oe=[...t.map(B=>B.position),n.today,n.today,n.book,n.clone],xe=new Float32Array(Mi.slots),Be=(B,se)=>{se.set(...Oe[B]);let ye=B<t.length?t[B].period:-1;if(ye>=0&&ye<Mi.slots&&xe[ye]){let Ze=a.list[ye].centre,[Ge,pt]=[se.x-Ze[0],se.y-Ze[1]];se.x=Ze[0]+Math.cos(xe[ye])*Ge-Math.sin(xe[ye])*pt,se.y=Ze[1]+Math.sin(xe[ye])*Ge+Math.cos(xe[ye])*pt}return se},we=[{size:1.3,state:1,order:.96},{size:2.4,state:3,order:.96},{size:2.4,state:2,order:.98},{size:2.4,state:2,order:1},{size:8,state:4,order:0},{size:8,state:4,order:0}],ue=4,X=[0,0],te=[],le=5,he=m(new Float32Array(we.length*3),3),w=m(Float32Array.from(we.map(B=>B.size)),1),E=m(new Float32Array(we.length).fill(1),1),C=new Et;C.setAttribute("position",he),C.setAttribute("aSize",w),C.setAttribute("aFade",E),C.setAttribute("aFirst",new Pt(Float32Array.from(we.map((B,se)=>se===ie?1:0)),1)),C.setAttribute("aState",new Pt(Float32Array.from(we.map(B=>B.state)),1)),C.setAttribute("aOrder",new Pt(Float32Array.from(we.map(B=>B.order)),1));let U={uScale:{value:1},uTime:{value:0},uReveal:{value:0},uSeedOn:{value:0},uInk:I},y=new An({uniforms:U,vertexShader:hg,fragmentShader:ug,transparent:!0,depthTest:!1,depthWrite:!1}),z=new Zi(C,y);z.frustumCulled=!1,c.add(z);let F=[],R=(B,se=!1)=>{let ye=se?new Wa({transparent:!0,dashSize:.8,gapSize:.9,depthTest:!1}):new es({transparent:!0,depthTest:!1});return F.push({material:ye,opacity:B}),ye},q=B=>new Et().setAttribute("position",new Ke(B,3)),Y=(()=>{let B=document.createElement("canvas");B.width=B.height=32;let se=B.getContext("2d"),ye=se.createRadialGradient(16,16,0,16,16,16);return ye.addColorStop(0,"rgba(255,255,255,1)"),ye.addColorStop(.5,"rgba(255,255,255,1)"),ye.addColorStop(.75,"rgba(255,255,255,0.3)"),ye.addColorStop(1,"rgba(255,255,255,0)"),se.fillStyle=ye,se.fillRect(0,0,32,32),new Dr(B)})(),K=1.6,de=1.5,Te=new P,De=new Float32Array(3*1024),_e=B=>{let se=new Float32Array(fd*3),ye=new Pt(se,3).setUsage(sc),Ze=new Et().setAttribute("position",ye);Ze.setDrawRange(0,0);let Ge=new Gs({map:Y,size:3,sizeAttenuation:!1,transparent:!0,depthTest:!1,depthWrite:!1});B&&F.push({material:Ge,opacity:B});let pt=new Zi(Ze,Ge);return pt.frustumCulled=!1,pt.userData.lay=(Xe,Lt=!1,Xt=0)=>{let Zt=Xe.length/3,gn=Math.min(1023,Lt?Zt+1:Zt);for(let gt=0;gt<gn;gt++){let Jt=gt%Zt*3;Te.set(Xe[Jt],Xe[Jt+1],Xe[Jt+2]).project(h),De[gt*3]=(Te.x*.5+.5)*innerWidth,De[gt*3+1]=(-Te.y*.5+.5)*innerHeight,De[gt*3+2]=Te.z>-1&&Te.z<1?1:0}let _t=Xt,Ae=0;for(let gt=0;gt<gn-1&&Ae<fd;gt++){let[Jt,Tn,Si,ti,Ri,Dt]=[De[gt*3],De[gt*3+1],De[gt*3+2],De[gt*3+3],De[gt*3+4],De[gt*3+5]];if(!Si||!Dt){_t=0;continue}let rn=Math.hypot(ti-Jt,Ri-Tn);if(rn<1e-6)continue;let En=120,ln=(qt,In)=>(qt<-En?1:qt>innerWidth+En?2:0)|(In<-En?4:In>innerHeight+En?8:0);if(ln(Jt,Tn)&ln(ti,Ri)){_t=((_t-rn)%so+so)%so;continue}let Mn=gt%Zt*3,Nt=(gt+1)%Zt*3;for(;_t<=rn&&Ae<fd;){let qt=_t/rn;for(let In=0;In<3;In++)se[Ae*3+In]=Xe[Mn+In]+(Xe[Nt+In]-Xe[Mn+In])*qt;Ae++,_t+=so}_t-=rn}Ze.setDrawRange(0,Ae),ye.needsUpdate=!0,Ge.size=K*(pt.userData.outer?de:1)*l.getPixelRatio()},pt},Ve=[],oe=new dr,pe=(B,se,ye=1980)=>(B.frustumCulled=!1,B.userData.opacity=se,B.userData.year=ye,oe.add(B),B),me=[];(()=>{let B=Xe=>Xe.members.threads?.[0]??0,se=new Map,ye=a.list.map(()=>({open:[],shadow:[]}));t.forEach((Xe,Lt)=>{let Xt=`${Xe.period}:${B(Xe)}`;se.set(Xt,[...se.get(Xt)??[],Lt])}),se.forEach(Xe=>fc(t,Xe).forEach(([Lt,Xt])=>ye[t[Lt].period].open.push(...t[Lt].position,...t[Xt].position))),ye.forEach((Xe,Lt)=>{let Xt=a.list[Lt].centre;for(let[Zt,gn]of[["open",.34],["shadow",.13]]){if(!Xe[Zt].length)continue;let _t=pe(new ts(q(Xe[Zt].map((Ae,gt)=>Ae-Xt[gt%3])),R(gn)),gn,a.list[Lt].end);_t.position.set(...Xt),_t.userData.constellation=!0,me.push({lines:_t,k:Lt})}});let Ze=(Xe,Lt)=>{let Xt=[],Zt=Math.max(8,Math.ceil((Lt-Xe)/1.5));for(let gn=0;gn<=Zt;gn++)Xt.push(...vs(a,Xe+(Lt-Xe)*gn/Zt));return Xt};a.list.forEach((Xe,Lt)=>{let Xt=[];for(let _t=0;_t<120;_t++){let Ae=Math.PI*2*_t/120,[gt,Jt]=Tr(Xe,Math.sin(Ae)*(Xe.radius+1.6),Math.cos(Ae)*(Xe.radius+1.6));Xt.push(Xe.centre[0]+gt,Xe.centre[1]+Jt,Xe.centre[2])}let Zt=pe(_e(.8),.8,Xe.start);Zt.userData.dots=!0,Zt.userData.outer=!0,Ve.push({points:Zt,vertices:Xt,closed:!0});let gn=a.list[Lt+1];if(gn){let _t=pe(_e(.7),.7,gn.start);_t.userData.dots=!0,Ve.push({points:_t,vertices:Ze(Xe.along+Xe.radius+1.6,gn.along-gn.radius-1.6),closed:!1})}});let Ge=a.list.at(-1),pt=pe(_e(.7),.7,r);pt.userData.dots=!0,Ve.push({points:pt,vertices:Ze(Ge.along+Ge.radius+1.6,a.length),closed:!1})})(),c.add(oe);let mt=Array.from({length:8},()=>{let B=_e(0);return B.visible=!1,c.add(B),B}),kt=new Float32Array(288),xn=[],Me=new Float32Array((zi+1)*3),nt={list:[],centre:[0,0,0],want:0,fade:0,galaxy:{}},ge=B=>{let se=new Float32Array(fg*zi*6),ye=m(se,3),Ze=new ts(new Et().setAttribute("position",ye),R(B));return Ze.frustumCulled=!1,Ze.geometry.setDrawRange(0,0),c.add(Ze),{lines:Ze,attribute:ye,positions:se,indices:[],fade:0,opacity:B}},Ut=ge(.7),St=ge(.3),Ft=ge(1),Bt=400,fn=new Float32Array(Bt*zi*6),Cn=m(fn,3),dn=new ts(new Et().setAttribute("position",Cn),R(.6));dn.frustumCulled=!1,dn.geometry.setDrawRange(0,0),c.add(dn);let tn={pairs:[],fade:0,figure:!1},kn=(B,se,ye,Ze,Ge,pt=1)=>{for(let Xe=0;Xe<zi;Xe++)for(let[Lt,Xt]of[[0,Xe/zi*pt],[1,(Xe+1)/zi*pt]]){let Zt=((se*zi+Xe)*2+Lt)*3;B[Zt]=Ai(ye.x,Ze.x,Xt),B[Zt+1]=Ai(ye.y,Ze.y,Xt),B[Zt+2]=Ai(ye.z,Ze.z,Xt)+4*Xt*(1-Xt)*Ge}},hi={map:new Map},W=new P,vi=new P,Un=new P,tt={target:[...dd],distance:700,yaw:0,pitch:ud},Ht={target:[...dd],distance:340,yaw:0,pitch:ud},an={x:0,y:0,goalX:0,goalY:0},ke={reveal:null,follow:-1,idle:!0,hover:-1,selection:-1,preview:-1,previewFade:0,ringFade:0,portrait:innerWidth/innerHeight<1,drift:0,turned:0,ring:-1,touched:-1e9},ms=Math.max(...[...t.map(B=>B.position),n.book,n.clone].map(B=>Math.hypot(B[0],B[1])))+12,rr=()=>Math.max(160,ms*4.3)*(ke.portrait?1.3:1),vr=B=>Math.min(84,B*(ke.portrait?1.5:1)),Sn=t.length+2,ht=B=>B<t.length?B:B+2,bt=Array.from({length:Sn},()=>({x:0,y:0,r:0,on:!1,depth:0})),mn=new P,be=new P,Fn=(B,se={})=>(be.copy(B).project(h),se.x=(be.x*.5+.5)*innerWidth,se.y=(-be.y*.5+.5)*innerHeight,se.visible=be.z>-1&&be.z<1,se),Bn=({target:B,distance:se,yaw:ye,pitch:Ze,follow:Ge=-1}={})=>{B&&(Ht.target=[...B]),se!==void 0&&(Ht.distance=Rn(se,6,640)),ye!==void 0&&(Ht.yaw=ye),Ze!==void 0&&(Ht.pitch=Ze),ke.follow=Ge},xi=(B=ud)=>Bn({target:dd,distance:rr(),yaw:0,pitch:B}),yi=new ft,Gn=()=>{let B=getComputedStyle(document.documentElement);yi.set(B.getPropertyValue("--bg").trim()),I.value.set(B.getPropertyValue("--fg").trim()),F.forEach(({material:ye})=>ye.color.copy(I.value));let se=yi.getHSL({}).l<.5;l.setClearColor(yi,1),J.blending=V.blending=se?mr:Ei,D=se?1.25:.4,j.uHalo.value=se?1:0,V.needsUpdate=!0,ae.applyTheme(se),ke.night=se,b(),y.blending=Ei,N.uGain.value=(se?.55:.6)*ne,N.uPaper.value=se?0:1,J.needsUpdate=!0};Gn();let ai=()=>{ke.portrait=innerWidth/innerHeight<1,h.aspect=innerWidth/innerHeight,l.setSize(innerWidth,innerHeight,!1)};ai();let nn=new Map,A={index:-1,mix:0},H={x:0,y:0,on:!1,fine:matchMedia("(pointer: fine)").matches&&!aa(),strength:0},Z={moved:!1,pinch:0,button:0},re={hover:()=>{},click:()=>{},frame:()=>{},touch:()=>{},error:B=>console.error(B)},ee=!0,ve=(B,se)=>{let ye=-1,Ze=1;return bt.forEach((Ge,pt)=>{if(!Ge.on)return;let Xe=Math.max(26,Ge.r*.9),Lt=Math.hypot(Ge.x-B,Ge.y-se)/Xe;Lt<Ze&&([ye,Ze]=[pt,Lt])}),ye},Ce=()=>{ke.idle=!1,ke.touched=performance.now()/1e3,re.touch()},Ue=(B,se)=>{Ht.target=Xm(Ht,B,se,innerHeight,h.fov*Math.PI/180),ke.follow=-1};i.addEventListener("pointerdown",B=>{if(!(B.pointerType==="mouse"&&B.button>2)){if(i.setPointerCapture(B.pointerId),nn.set(B.pointerId,{x:B.clientX,y:B.clientY,startX:B.clientX,startY:B.clientY}),nn.size===1&&Object.assign(Z,{moved:!1,button:B.button,pinch:0,shift:B.shiftKey}),nn.size===2){let[se,ye]=[...nn.values()];Z.pinch=Math.hypot(se.x-ye.x,se.y-ye.y),Z.moved=!0}Ce()}}),i.addEventListener("pointermove",B=>{let se=nn.get(B.pointerId);if(!se){B.pointerType==="mouse"&&re.hover(ve(B.clientX,B.clientY),B);return}let ye=B.clientX-se.x,Ze=B.clientY-se.y;if(Math.hypot(B.clientX-se.startX,B.clientY-se.startY)>aS&&(Z.moved=!0),[se.x,se.y]=[B.clientX,B.clientY],nn.size===2){let[Ge,pt]=[...nn.values()],Xe=Math.hypot(Ge.x-pt.x,Ge.y-pt.y);Z.pinch>0&&Xe>0&&(Ht.distance=td(Ht.distance,Math.log(Z.pinch/Xe))),Z.pinch=Xe,Ue(ye/2,Ze/2);return}Z.moved&&(Z.button===2||Z.button===1||Z.shift?Ue(ye,Ze):Object.assign(Ht,Wm(Ht,-ye*.005,Ze*.004)))});let ze=B=>{let se=nn.get(B.pointerId);nn.delete(B.pointerId),se&&!Z.moved&&nn.size===0&&B.type==="pointerup"&&Z.button===0&&re.click(ve(B.clientX,B.clientY),B)};i.addEventListener("pointerup",ze),i.addEventListener("pointercancel",ze),i.addEventListener("pointerleave",()=>{H.on=!1,re.hover(-1)}),i.addEventListener("pointermove",B=>{B.pointerType==="mouse"&&(H.on=H.fine,H.x=B.clientX/innerWidth*2-1,H.y=-(B.clientY/innerHeight)*2+1)}),i.addEventListener("contextmenu",B=>B.preventDefault()),i.addEventListener("wheel",B=>{B.preventDefault();let se=B.deltaY*(B.deltaMode===1?40:B.deltaMode===2?innerHeight:1);Ht.distance=td(Ht.distance,Rn(se*(B.ctrlKey?.012:.0016),-.5,.5)),Ce()},{passive:!1});let Ye=new ja,at=new P,it=new P,Ne=sa,st=null,Wt=null,wt=!1,zt=!1,dt=null,Ot=!0,yn={last:-1/0},$e=0,je=()=>{let B=++$e;document.hidden?setTimeout(()=>$e===B&&on(performance.now()),1e3/mc.hidden):requestAnimationFrame(se=>$e===B&&on(se))};document.addEventListener("visibilitychange",()=>ee&&je());let on=B=>{if(!ee)return;if(!document.hidden&&!Om(yn,B))return je();Ye.update(B);let se=Math.min(Math.max(Ye.getDelta(),0),.25),ye=Ye.getElapsed();Wt??(Wt=ye);let Ze=Rn(rr()*Ne.from,6,640);wt&&st===null&&(st=ye,dt=zt?null:{from:Ze});let Ge=st===null?0:ye-st,pt=Math.min(1,Math.max(0,(Ge-Ne.delay)/Ne.seconds)),Xe=ds(0,Ne.sky,ye-Wt);ke.follow>=0&&(Be(ke.follow,it),Ht.target=it.toArray());let Lt=qm(tt,Ht,se,pd);if(Object.assign(tt,Lt),st===null)tt.distance=Ze;else if(dt){let Se=Math.min(1,Ge/Ne.dolly);Se>=1||!ke.idle?dt=null:tt.distance=Math.exp(Ai(Math.log(dt.from),Math.log(Ht.distance),1-(1-Se)**3))}an.x+=(an.goalX-an.x)*(1-Math.exp(-pd*se)),an.y+=(an.goalY-an.y)*(1-Math.exp(-pd*se)),ke.drift+=((nn.size===0&&performance.now()/1e3-ke.touched>ao.rest?1:0)-ke.drift)*(1-Math.exp(-se*.6));let[Xt,Zt,gn]=Hm({...tt,yaw:tt.yaw+Math.sin(ye*ao.rate)*ao.yaw*ke.drift,pitch:tt.pitch+Math.sin(ye*ao.rate*.75+1)*ao.pitch*ke.drift});h.position.set(Xt,Zt,gn),h.fov=vr(36),h.updateProjectionMatrix(),h.lookAt(tt.target[0],tt.target[1],tt.target[2]),h.setViewOffset(innerWidth,innerHeight,-an.x,-an.y,innerWidth,innerHeight),h.updateMatrixWorld();let _t=innerHeight/(2*Math.tan(h.fov*Math.PI/360)),Ae=ds(.35,.75,tt.distance/rr());Ge-Ne.delay-Ne.seconds-.5>0&&(ke.turned+=se*Ai(Mi.near,1,Ae));let gt=ke.turned;a.list.forEach((Se,xt)=>{xt>=Mi.slots||(xe[xt]=Kd(Se,gt),N.uSpin.value[xt]=xe[xt])}),me.forEach(({lines:Se,k:xt})=>Se.rotation.z=xe[xt]??0);let Jt=xe[0].toFixed(3);i.dataset.spin!==Jt&&(i.dataset.spin=Jt),H.strength=zr(H.strength,H.on?1:0,se,xc.rate),N.uPointer.value.set(H.x,H.y,H.strength);let Tn=ke.hover>=0&&ke.hover<t.length;Tn&&A.index!==ke.hover&&(A.mix*=.4,A.index=ke.hover),A.mix=zr(A.mix,Tn?1:0,se,Tn?Vr.inRate:Vr.outRate),N.uHover.value.set(A.index,A.mix);let Si=H.strength.toFixed(2);i.dataset.pointer!==Si&&(i.dataset.pointer=Si);let ti=st===null?ds(Ne.seed,Ne.seed+1.6,ye-Wt):1,Ri=Ge>0?Math.min(1,Ge/.45*Math.exp(1-Ge/.45)):0;N.uSeedOn.value=U.uSeedOn.value=ti,N.uKick.value=Ri,N.uMix.value=pt;let Dt=Od(a,hd(pt));N.uTime.value=U.uTime.value=j.uTime.value=ye,j.uPixel.value=l.getPixelRatio(),N.uFar.value=Ae,N.uScale.value=U.uScale.value=l.domElement.height/(2*Math.tan(h.fov*Math.PI/360)),U.uReveal.value=Math.min(1,hd(pt)),Ot=!1;for(let Se=0;Se<v.length;Se++){let xt=g[Se]-v[Se];Math.abs(xt)>.002?(v[Se]+=xt*(1-Math.exp(-7*se)),Ot=!0):v[Se]=g[Se]}for(let Se of te)v[Se]=g[Se]*(1+og*(.5+.5*Math.sin(ye*.9)));(Ot||te.length)&&(_.needsUpdate=!0);let rn=(Se,xt)=>{Be(t.length+Se,mn),he.setXYZ(Se,mn.x,mn.y,mn.z),E.setX(Se,xt)},En=Se=>N.uReveal.value>=xs(Se)?1:0;rn(0,En(r)),rn(1,En(r)),X.forEach((Se,xt)=>X[xt]=zr(Se,ke.ring===xt?1:0,se,ke.ring===xt?Vr.inRate:Vr.outRate)),rn(2,En(p)*(1+ro.light*X[0])),rn(3,En(p)*(1+ro.light*X[1])),w.setX(2,we[2].size*(1+ro.grow*X[0])),w.setX(3,we[3].size*(1+ro.grow*X[1])),ke.selection>=0&&(Be(ke.selection,mn),he.setXYZ(ue,mn.x,mn.y,mn.z),w.setX(ue,2.2*t[ke.selection].spread+2)),ke.ringFade+=((ke.selection>=0?1:0)-ke.ringFade)*(1-Math.exp(-6*se)),E.setX(ue,ke.ringFade),ke.preview>=0&&(Be(ke.preview,Un),he.setXYZ(le,Un.x,Un.y,Un.z),w.setX(le,2.2*t[ke.preview].spread+2)),ke.previewFade+=((ke.preview>=0?1:0)-ke.previewFade)*(1-Math.exp(-9*se)),E.setX(le,ke.previewFade),he.needsUpdate=w.needsUpdate=E.needsUpdate=!0;let ln=`${tt.yaw.toFixed(2)},${tt.pitch.toFixed(2)},${tt.distance.toFixed(0)}`;i.dataset.view!==ln&&(i.dataset.view=ln);let Nt=Math.abs(Math.log(tt.distance/Ht.distance))<.004&&Math.abs(Math.sin(tt.yaw-Ht.yaw))<.003&&Math.abs(tt.pitch-Ht.pitch)<.003&&tt.target.every((Se,xt)=>Math.abs(Se-Ht.target[xt])<.03)&&Math.abs(an.x-an.goalX)<.5&&Math.abs(an.y-an.goalY)<.5?"1":"";i.dataset.rest!==Nt&&(i.dataset.rest=Nt);let qt=ke.selection>=0?`${mn.x.toFixed(2)},${mn.y.toFixed(2)},${mn.z.toFixed(2)}`:"";i.dataset.ring!==qt&&(i.dataset.ring=qt);let In=ke.preview>=0?String(ke.preview):"";i.dataset.preview!==In&&(i.dataset.preview=In);let Pn=ds(.25,.9,pt),kr=Math.min(Dt,ke.reveal??1/0);oe.visible=Pn>.01,oe.children.forEach(Se=>Se.material.opacity=Se.userData.opacity*Pn*(Se.userData.constellation?1-Ae:1)*(Se.userData.dots?Se.userData.outer?.4+.25*(1-Ae):.75+.1*(1-Ae):1)*Math.min(1,Math.max(0,(kr-Se.userData.year)/2))),Ft.indices=ke.preview>=0&&ke.selection>=0&&ke.preview!==ke.selection?[ke.preview]:[];for(let Se of[Ut,St,Ft]){let xt=Se.indices.length?1:0;Se.fade+=(xt-Se.fade)*(1-Math.exp(-5*se));let zn=Math.min(Se.indices.length,fg);zn&&(Be(ke.selection,it),Se.indices.slice(0,zn).forEach((Hn,Wn)=>{Be(Hn,at),kn(Se.positions,Wn,it,at,it.distanceTo(at)*.22,hi.map.get(Hn)??1)}),Se.attribute.needsUpdate=!0),Se.lines.geometry.setDrawRange(0,zn*zi*2),Se.lines.material.opacity=Se.opacity*Se.fade,Se.lines.visible=Se.fade>.01}nt.fade+=(nt.want-nt.fade)*(1-Math.exp(-5*se)),K=1.15+.1*(1-Ae),de=1+.3*(1-Ae),Ve.forEach(({points:Se,vertices:xt,closed:zn})=>Se.userData.lay(xt,zn)),mt.forEach((Se,xt)=>{let zn=nt.list[xt],Hn=!!zn&&nt.fade>.01;if(Se.visible=Hn,!!Hn){for(let Wn=0;Wn<96;Wn++){let _s=Math.PI*2*Wn/96,[lo,Ec]=Tr(nt.galaxy,Math.sin(_s)*zn.radius,Math.cos(_s)*zn.radius);kt[Wn*3]=nt.centre[0]+lo,kt[Wn*3+1]=nt.centre[1]+Ec,kt[Wn*3+2]=nt.centre[2]}Se.userData.lay(kt,!0),Se.material.color.copy(I.value),Se.material.opacity=.3*(1-.35*(xt/Math.max(1,nt.list.length-1)))*nt.fade*Pn}});let sr=nt.want&&nt.fade>.5?String(nt.list.length):"";i.dataset.rings!==sr&&(i.dataset.rings=sr);let Vi=Pn;tn.fade+=((tn.pairs.length?1:0)-tn.fade)*(1-Math.exp(-5*se));let Gr=Math.min(tn.pairs.length,Bt),ki=[],Hr=0;for(Gr&&Vi>.01&&(tn.pairs.slice(0,Gr).forEach(([Se,xt,zn])=>{if(tn.figure&&zn)return ki.push(t[Se].year<=t[xt].year?[Se,xt]:[xt,Se]);Be(Se,it),Be(xt,at),kn(fn,Hr++,it,at,it.distanceTo(at)*(tn.figure?0:zn?.3:.12))}),Cn.needsUpdate=!0),dn.geometry.setDrawRange(0,Hr*zi*2);xn.length<ki.length;){let Se=_e(0);c.add(Se),xn.push(Se)}xn.forEach((Se,xt)=>{if(Se.visible=xt<ki.length,!Se.visible)return;Be(ki[xt][0],it),Be(ki[xt][1],at);let zn=it.distanceTo(at)*Sm;for(let Hn=0;Hn<=zi;Hn++){let Wn=Hn/zi;Me[Hn*3]=Ai(it.x,at.x,Wn),Me[Hn*3+1]=Ai(it.y,at.y,Wn),Me[Hn*3+2]=Ai(it.z,at.z,Wn)+4*Wn*(1-Wn)*zn}Se.userData.lay(Me,!1,ye*cS%so),Se.material.color.copy(I.value),Se.material.opacity=.75*tn.fade*Vi}),dn.material.opacity=.6*tn.fade*Vi,dn.visible=dn.material.opacity>.01,i.dataset.jumps=dn.visible?String(Gr):"";let gs=1+lS*(1-Ae);j.uGain.value=D*Xe*gs,ae.update(ye,h,Dt,Xe,gs),l.render(c,h),bt.forEach((Se,xt)=>{Be(ht(xt),mn),be.copy(mn).project(h),Se.x=(be.x*.5+.5)*innerWidth,Se.y=(-be.y*.5+.5)*innerHeight,Se.depth=h.position.distanceTo(mn),Se.r=(t[xt]?.spread??oS)*2.4*_t/Se.depth,Se.on=be.z>-1&&be.z<1&&Se.x>0&&Se.x<innerWidth&&Se.y>0&&Se.y<innerHeight});try{re.frame({time:ye,dt:se,intro:pt,formed:Dt,far:Ae,cssScale:_t,projected:bt,camera:h,entered:pt>=Ne.card,seen:st===null&&ye-Wt>Ne.seed+1.2,seedIndex:ie})}catch(Se){ee=!1,re.error(Se);return}ee&&je()};return{camera:h,view:tt,goal:Ht,inset:an,state:ke,projected:bt,on:(B,se)=>re[B]=se,stop:()=>ee=!1,setQuality:B=>{let se=_r.tiers[Math.min(B,_r.tiers.length-1)];N.uKeep.value=se.keep,ae.setTier(B),l.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2,se.ratio)),l.setSize(innerWidth,innerHeight,!1)},start:()=>je(),begin:(B="full")=>{wt=!0,zt=B!=="full",B==="direct"&&(Ne={...sa,...ag})},home:xi,homeDistance:rr,fly:Bn,pick:ve,centerOf:B=>Be(B,new P),project:Fn,resize:ai,applyTheme:Gn,setLevels:B=>B.forEach((se,ye)=>g[ye]=se),setFilter:B=>{N.uFilterFacet.value=B?["threads","people","places"].indexOf(B.facet):-1,N.uFilterItem.value=B?B.item:-1,ae.setDim(B?.45:1)},setFocus:B=>{N.uFocusOn.value=B===null?0:1,B!==null&&(N.uFocusU.value=xs(B))},setSelection:B=>ke.selection=B,setHover:B=>ke.hover=B,setRingGlow:B=>ke.ring=B,setFresh:B=>te=B,setPreview:B=>ke.preview=B,setJumps:(B,se=!1)=>Object.assign(tn,{pairs:B,figure:se}),slotOf:B=>({today:t.length,book:t.length+2,clone:t.length+3})[B],setReveal:B=>{N.uReveal.value=B===null?1e4:xs(B),ke.reveal=B},setLinks:(B,se)=>{Ut.indices=B,St.indices=se,i.dataset.links=String(B.length+se.length)},setInset:(B,se)=>{an.goalX=B,an.goalY=se},setIdle:B=>ke.idle=B,setLinkReach:B=>hi.map=B,groundAt:(B,se,ye)=>{be.set(B/innerWidth*2-1,-(se/innerHeight)*2+1,.5).unproject(h),be.sub(h.position).normalize();let Ze=(ye-h.position.z)/be.z,Ge=2600,pt=Number.isFinite(Ze)&&Ze>0?Math.min(Ze,Ge):Ge;return[h.position.x+be.x*pt,h.position.y+be.y*pt]},arcScreen:(B,se,ye,Ze={})=>(Be(B,W),Be(se,vi),Un.set(Ai(W.x,vi.x,ye),Ai(W.y,vi.y,ye),Ai(W.z,vi.z,ye)+4*ye*(1-ye)*W.distanceTo(vi)*.22),Fn(Un,Ze)),setYearRings:(B,se,ye={})=>{se.length?Object.assign(nt,{list:se,centre:B,galaxy:ye,want:1}):nt.want=0}}}var hS="(min-height: 520px) and (min-width: 320px)",uS="(max-width: 900px), (max-aspect-ratio: 1/1)",gd=74,dS=124,pS=24,oa=18,gg=8,fS=[0,22],_g={today:2.4,book:1.2,clone:1.2},vg=8,_d={quiet:.4,current:.9},xg=20,yg=2,mS=.6,gS=40,fs={width:104,height:100,top:118},Sg="http://www.w3.org/2000/svg",vd=matchMedia(uS),Mg=.9,_S=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],vS=new Set(["hero","contact"]),xS=["1","2","3"],Vn=[],Tc=()=>{for(;Vn.length;)Vn.pop()();document.documentElement.classList.remove("immersive"),document.documentElement.classList.add("flat")};function Tg(){if(!dg()||aa())return Tc();let i=matchMedia(hS);if(i.addEventListener("change",()=>location.reload()),!i.matches)return Tc();yS().catch(e=>{console.error(e),Tc()})}function bg(i){let e=0,t=n=>{[...n.childNodes].forEach(r=>{if(r.nodeType===Node.TEXT_NODE){let s=document.createDocumentFragment();r.textContent.split(/(\s+)/).forEach(a=>{if(!a)return;if(/^\s+$/.test(a))return s.append(a);let o=document.createElement("span");o.className="w",o.style.setProperty("--i",e++),o.textContent=a,s.append(o)}),r.replaceWith(s)}else r.nodeType===Node.ELEMENT_NODE&&t(r)})};t(i)}var qe=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n},xd=i=>i?i.split(","):[];async function yS(){let i=document.getElementById("scene"),e=document.querySelector(".stage"),t=document.querySelector("main.story"),n=document.querySelector(".hud"),r=document.querySelector(".rail"),s=document.querySelector(".masthead"),a=document.querySelector(".explore"),o=Dd(),l=matchMedia("(max-width: 760px)").matches,c=JSON.parse(a.dataset.facets),h=JSON.parse(a.dataset.ahead),p=JSON.parse(a.dataset.periods??"[]"),d=[...t.querySelectorAll("[data-station]")].map((x,L)=>({element:x,kind:x.dataset.station,id:x.id,label:x.dataset.hud,t:L,panel:x.matches("[data-panel]")?x:x.querySelector("[data-panel]")})),u=d.length-1,m=x=>d.findIndex(L=>L.kind===x),[f,v,g,_]=["book","clone","contact","hero"].map(m),M=d.filter(x=>x.kind==="milestone"),T=M.map(({element:x})=>({id:x.dataset.milestone,date:x.dataset.date,weight:+x.dataset.weight,period:x.dataset.period,links:xd(x.dataset.links),...Object.fromEntries(ar.map(L=>[L,xd(x.dataset[L])]))})),S=Bd(T,c,{periods:p,today:o}),b=zc(T,S.map(x=>x.year),{periods:p,today:o,threads:c.threads}),I=new Map(M.map((x,L)=>[x.t,L])),O=new Map([...t.querySelectorAll("li[data-ask]")].map(x=>[x.dataset.ask,new Set(xd(x.dataset.memories).map(L=>M.findIndex($=>$.element.dataset.milestone===L)).filter(L=>L>=0))])),k=null,D=Object.fromEntries(ar.map(x=>[x,{}]));t.querySelectorAll("ul.facets").forEach(x=>x.querySelectorAll("li").forEach(L=>D[x.dataset.facet][L.dataset.item]=L.textContent));let j=M.map(x=>({time:x.element.querySelector("time").textContent,title:x.element.querySelector("h3").textContent,body:[...x.element.querySelectorAll(":scope > p:not(.kicker):not(.intro)")].map(L=>L.textContent).join(" ")})),V=M.flatMap((x,L)=>{let $=x.element.querySelector(".fresh");return!$||!Bm($.dataset.added)?[]:($.hidden=!1,[L])}),Q=M.map((x,L)=>({index:L,id:x.id,title:j[L].title,body:j[L].body,extra:`${j[L].time} ${x.element.dataset.alt??""} ${ar.flatMap($=>(S[L].members[$]??[]).map(Ee=>D[$][c[$][Ee]]??"")).join(" ")}`,weight:S[L].weight,order:L})),ae=Yd({marks:S,today:o,random:ps(1980),facets:c,sky:b,cap:l?55e3:br.cap,trail:l?12e3:br.trail}),ie=zd(b),ne=new Set(Rm(S)),N=mg({canvas:i,cloud:ae,marks:S,future:ie,today:o,mobile:l,sky:b,kinds:M.map(x=>x.element.dataset.kind)});N.setFresh(V);let J=document.documentElement,ce=!1,Oe=new Set,xe=0,Be=()=>{clearTimeout(xe),ce=!0,J.dataset.entering="1",xe=setTimeout(()=>we(),2e4)},we=()=>{ce&&(ce=!1,clearTimeout(xe),J.dataset.entering="out",xe=setTimeout(()=>delete J.dataset.entering,1600))};Vn.push(()=>{clearTimeout(xe),delete J.dataset.entering});let ue=navigator.webdriver,X=location.hash.length>1;!ue&&!X&&Be(),N.home(),N.start();let te=S.reduce((x,L,$)=>L.year<S[x].year?$:x,0),le=qe("button","seed");le.type="button",le.setAttribute("aria-label",j[te].title);let he=!1,w=0,E=["pointerup","touchend","click","keydown"],C=()=>E.forEach(x=>document.removeEventListener(x,U,!0));function U(){he||(he=!0,clearTimeout(w),C(),N.begin(ue?"still":X?"direct":"full"),le.dataset.gone="1",setTimeout(()=>le.remove(),1600))}ue||X?U():(document.body.append(le),w=setTimeout(U,sa.wait*1e3),E.forEach(x=>document.addEventListener(x,U,!0))),Vn.push(()=>{clearTimeout(w),C(),le.remove()});let y=new URLSearchParams(location.search).get("quality"),z=y==="low"?_r.tiers.length-1:0,F=y!=="full"&&y!=="low",R={frames:[],windows:0,from:0};N.setQuality(z),i.dataset.quality=String(z);let q=rg(),Y=qe("div","labels");e.append(Y),Vn.push(()=>Y.remove());let K=S.map((x,L)=>{let $=qe("div","tag");return $.innerHTML='<b></b><span></span><i class="leader"></i>',$.querySelector("b").textContent=j[L].time,$.querySelector("span").textContent=j[L].title,$.setAttribute("aria-hidden","true"),Y.append($),{node:$,leader:$.querySelector(".leader"),width:0,height:0,on:!1}}),de=Array.from({length:yg},()=>{let x=qe("button","edge-mark");return x.type="button",x.hidden=!0,x.tabIndex=-1,x.setAttribute("aria-hidden","true"),x.innerHTML="<span></span><i></i>",Y.append(x),x.addEventListener("click",()=>Ge(Z(+x.dataset.memory))),{node:x,label:x.querySelector("span"),arrow:x.querySelector("i"),width:0,height:0}}),Te="",De=Array.from({length:xg+1},()=>({x:0,y:0,visible:!0})),_e=[],Ve=(x,L,$,Ee,Fe=1980,ot=0,At=-1)=>{let Tt=qe("div",$,x);return Tt.setAttribute("aria-hidden","true"),Y.append(Tt),_e.push({node:Tt,world:L,base:Ee,year:Fe,kind:$,ring:ot,spotAt:At,width:0,height:0,shown:-1}),Tt},oe=x=>new P(...x);Ve(e.dataset.today,oe(ie.today),"ahead now",1,o,_g.today),_e.at(-1).kind="ahead";let pe=[];b.list.forEach((x,L)=>{let $=t.querySelector(`#period-${p[L]} [data-station]`);if(!$)return;let[Ee,Fe,ot]=x.centre,[At,Tt]=[Ee+b.pole[0],Fe+b.pole[1]],Gt=Math.hypot(At,Tt)||1,Re=x.radius*.8+2,[It,cn]=Tr(x,At/Gt*Re,Tt/Gt*Re),[bn,Ci]=($.querySelector(".kicker")?.textContent??p[L]).split(" \xB7 "),Ln=Ve("",oe([Ee+It,Fe+cn,ot]),"galaxy",.9,(x.start+x.end)/2),Xr=qe("span","galaxy-hint",t.querySelector(`#period-${p[L]}`)?.dataset.hint??""),[Cc,...xr]=bn.split(" / "),la=qe("span","galaxy-title");la.append(qe("span","galaxy-number",Cc),...xr.length?[qe("span","galaxy-name",` / ${xr.join(" / ")}`)]:[]),Ln.append(la,qe("b","galaxy-count"),...Ci?[qe("span","galaxy-years",Ci)]:[],Xr,qe("i","leader")),pe[L]=_e.at(-1),pe[L].hint=Xr,pe[L].leader=Ln.querySelector(".leader"),pe[L].centre=oe(x.centre),Ln.dataset.go=`period-${p[L]}`,Ln.addEventListener("click",di=>{di.stopImmediatePropagation(),ho(bt===L?"top":Ln.dataset.go)})});let me=Array.from({length:vg},()=>(Ve("",new P,"ring-year",_d.quiet,1980),_e.at(-1).dim=0,_e.at(-1))),Le=e.dataset.until?fo(e.dataset.until):-1;Le>=0&&Ve(mo(Le,document.documentElement.lang),oe(ie.today.map((x,L)=>(x+ie.book[L])/2)),"countdown-mark",.8,o);let Vt=[["book",a.dataset.book,a.dataset.bookHint],["clone",a.dataset.clone,a.dataset.cloneHint]].map(([x,L,$],Ee)=>{let Fe=Ve(L,oe(ie[x]),"ahead",.6,1/0,_g[x],S.length+Ee);return $&&Fe.append(qe("span","ahead-hint",$)),_e.at(-1)}),mt=qe("div","figure-name");mt.setAttribute("aria-hidden","true");let kt=qe("span","figure-title"),xn=qe("span","figure-count");mt.append(kt,xn),Y.append(mt);let Me={key:"",chain:[],edges:[],option:-1,width:0,height:0,shown:-1},nt=x=>{Vt.forEach((L,$)=>{let Ee=x===S.length+$;Ee!==(L.node.dataset.hot==="1")&&(L.node.dataset.hot=Ee?"1":"")}),N.setRingGlow(x>=S.length?x-S.length:-1)};document.querySelectorAll('.masthead nav a[data-go="book"], .masthead nav a[data-go="clone"]').forEach(x=>{let L=S.length+(x.dataset.go==="book"?0:1);x.addEventListener("pointerenter",()=>nt(L)),x.addEventListener("focus",()=>nt(L)),x.addEventListener("pointerleave",()=>nt(Fn)),x.addEventListener("blur",()=>nt(Fn))});let ge=qe("aside","card");ge.setAttribute("tabindex","-1");let Ut=qe("div","card-body"),St=qe("nav","card-steps"),Ft=qe("button","step",""),Bt=qe("button","step","");Ft.type=Bt.type="button",Ft.dataset.step="previous",Bt.dataset.step="next",St.append(Ft,Bt);let fn=new Map,Cn=qe("p","visually-hidden");Cn.setAttribute("role","status"),t.querySelectorAll(".waitlist").forEach(x=>{let L=qe("div","card-form");L.hidden=!0,L.dataset.for=x.dataset.list;let[$,Ee]=[x.parentNode,x.nextSibling];L.append(x),fn.set(x.dataset.list,L),Vn.push(()=>$.insertBefore(x,Ee))});let dn=qe("button","card-close","\u2715");dn.type="button",dn.dataset.go="top",dn.setAttribute("aria-label",a.dataset.overview),dn.setAttribute("title",a.dataset.overview),ge.append(dn,Ut,...fn.values(),St,Cn),ge.id="card",e.after(ge),Vn.push(()=>ge.remove());let tn=qe("div","nudge");tn.hidden=!0;let kn=qe("a",""),hi=qe("button","","\u2715");hi.type="button",tn.append(kn,hi),St.before(tn);let W=[...t.querySelectorAll("a, button, input, select, textarea")];W.forEach(x=>x.setAttribute("tabindex","-1")),Vn.push(()=>W.forEach(x=>x.removeAttribute("tabindex")));let vi=document.querySelector(".skip");vi&&(vi.setAttribute("href","#card"),Vn.push(()=>vi.setAttribute("href","#main")));let Un=Nm([...b.list.flatMap(x=>[[x.centre[0]-x.radius,x.centre[1]-x.radius],[x.centre[0]+x.radius,x.centre[1]+x.radius]]),ie.today,ie.book,ie.clone].map(x=>[x[0],x[1]]),fs),tt=qe("div","minimap");tt.hidden=!0,tt.setAttribute("aria-hidden","true");let Ht=document.createElementNS(Sg,"svg");Ht.setAttribute("viewBox",`0 0 ${fs.width} ${fs.height}`);let an=(x,L)=>{let $=document.createElementNS(Sg,x);return Object.entries(L).forEach(([Ee,Fe])=>$.setAttribute(Ee,Fe)),Ht.append($),$};b.list.forEach(x=>{let[L,$]=Un.to(x.centre),Ee=Array.from({length:48},(Fe,ot)=>Un.to(Tr(x,Math.sin(Math.PI*2*ot/48)*x.radius,Math.cos(Math.PI*2*ot/48)*x.radius).map((At,Tt)=>x.centre[Tt]+At)));an("polygon",{points:Ee.map(([Fe,ot])=>`${Fe.toFixed(1)},${ot.toFixed(1)}`).join(" "),class:"mini-galaxy"})});let ke=S.map(x=>{let[L,$]=Un.to(x.position);return an("circle",{cx:L.toFixed(1),cy:$.toFixed(1),r:(.6+x.weight*.35).toFixed(2),class:"mini-dot"})}),ms=0;[ie.book,ie.clone].forEach(x=>{let[L,$]=Un.to(x);an("circle",{cx:L.toFixed(1),cy:$.toFixed(1),r:2,class:"mini-future"})});let rr=an("polygon",{class:"mini-frame"}),vr=an("circle",{r:3.4,class:"mini-here"});tt.append(Ht),ge.after(tt),Vn.push(()=>tt.remove()),tt.addEventListener("click",x=>{let L=tt.getBoundingClientRect(),$=Un.from([(x.clientX-L.left)*fs.width/L.width,(x.clientY-L.top)*fs.height/L.height]),Ee=Dm(b.list,$);Ee>=0&&ho(`period-${p[Ee]}`)});let Sn={related:a.dataset.related,earlier:a.dataset.earlier,later:a.dataset.later,filter:a.dataset.filter,unfilter:a.dataset.unfilter,more:a.dataset.more,lit:a.dataset.lit,all:a.dataset.all,fewer:a.dataset.fewer,nudgebook:a.dataset.nudgebook,nudgeclone:a.dataset.nudgeclone,nudgeclose:a.dataset.nudgeclose,periodstart:a.dataset.periodstart},ht=0,bt=-1,mn=()=>bt>=0?-1:H(ht),be=null,Fn=-1,Bn={on:!1,over:0,away:0},xi={links:[],near:[]},yi=[],Gn=!1,ai={x:0,y:0},nn={on:!1,seen:!1,from:null},A={opened:new Set,sawClone:!1,closed:!1},H=x=>I.get(x)??-1,Z=x=>M[x].t,re=x=>{let L=d[x];if(L.kind==="hero")return{previous:null,next:M[0].t};if(L.kind==="milestone"){let{previous:$,next:Ee}=fm(S,H(x),be);return{previous:$!==null?Z($):!be&&H(x)===0?0:null,next:Ee!==null?Z(Ee):be?null:f}}return L.kind==="book"?{previous:M.at(-1).t,next:v}:L.kind==="clone"?{previous:f,next:g}:L.kind==="contact"?{previous:v,next:null}:{previous:null,next:null}},ee=()=>{let x=mn();xi=x>=0?pc(S,x):{links:[],near:[]};let L=[...xi.links,...xi.near];yi=x<0?[]:Gn?L:dm(S,x);let $=new Set(yi),Ee=k?O.get(k):null,Fe=Ee?_m(S,Ee):bt>=0?S.map(Re=>Re.period===bt?gr.normal:gr.quiet):gm(S,{selected:x,near:$,weak:new Set(L.filter(Re=>!$.has(Re))),filter:be});N.setLevels(Fe),e.dataset.levels=[...new Set(Fe)].sort((Re,It)=>Re-It).join(","),N.setLinks(xi.links.filter(Re=>$.has(Re)),xi.near.filter(Re=>$.has(Re))),N.setSelection(x);let ot=bt>=0?bt:x>=0?S[x].period:-1;q.age(ot);let At=(!nn.on||bt>=0)&&ot>=0?Ud(b.list[ot],vg):[],Tt=ot>=0?b.list[ot]:null;N.setYearRings(Tt?.centre??null,At,Tt??{}),me.forEach((Re,It)=>{let cn=At[It];if(Re.dim=cn?1:0,!cn)return;Re.node.textContent=String(cn.year),Re.base=x>=0&&cn.year===Math.floor(S[x].year)?_d.current:_d.quiet;let[bn,Ci]=Tr(Tt,cn.radius*Math.sin(Mg),cn.radius*Math.cos(Mg));Re.world.set(Tt.centre[0]+bn,Tt.centre[1]+Ci,Tt.centre[2]),Re.width=0}),N.setFocus(x>=0?S[x].year:null),N.setFilter(be);let Gt=no(S,be);if(N.setJumps(Ee?vm(Ee,N.slotOf("clone")):Me.edges,!Ee),b){let Re=Tm(S,Gt,b.list.length);pe.forEach((It,cn)=>{It&&(It.dim=ot>=0&&ot!==cn||["book","clone"].includes(d[ht].kind)?0:be&&!Re[cn]?.3:1,It.pin=ot===cn,It.node.dataset.pin=It.pin?"1":"",It.pin?It.node.setAttribute("title",a.dataset.overview):It.node.removeAttribute("title"),It.hint.hidden=x>=0||!!be,It.node.querySelector(".galaxy-count").textContent=be?` \xB7 ${Re[cn]}`:"",It.width=0)})}},ve=x=>{let L=d[x];if(bt>=0){let $=b.list[bt];return N.fly({target:$.centre,distance:Rn($.radius*4.2+16,40,130),pitch:Rn(N.goal.pitch,-.45,.5)}),N.setIdle(!1)}if(L.kind==="milestone"){let $=S[H(x)],Ee=b.list[$.period];N.fly({target:Ee.centre.map((Fe,ot)=>Fe+($.position[ot]-Fe)*.35),distance:Rn(Ee.radius*4.2+16,40,130),pitch:Rn(N.goal.pitch,-.45,.5)})}else L.kind==="book"||L.kind==="clone"?N.fly({target:ie[L.kind],distance:54,pitch:Rn(N.goal.pitch,-.45,.5)}):L.kind==="contact"?N.fly({target:[0,0,-7],distance:N.homeDistance(),yaw:0,pitch:md}):N.home();N.setIdle(L.kind==="hero")},Ce=x=>x.querySelectorAll("li[data-ask]").forEach(L=>{let $=qe("button","ask-q",L.querySelector(".ask-q").textContent);$.type="button",$.dataset.ask=L.dataset.ask,$.setAttribute("aria-pressed",String(k===L.dataset.ask)),L.replaceChildren($)}),Ue=x=>{if(k=x&&O.has(x)&&d[ht].kind==="clone"?x:null,e.dataset.asked=k??"",ge.querySelectorAll(".ask-q").forEach($=>$.setAttribute("aria-pressed",String($.dataset.ask===k))),ee(),!k)return ve(ht);N.fly({target:[0,0,-7],distance:N.homeDistance(),yaw:0,pitch:md});let L=[...O.get(k)].map($=>M[$].element.querySelector("h3").textContent);Cn.textContent=Sn.lit.replace("{n}",()=>String(L.length)).replace("{names}",()=>L.join(", "))},ze=x=>x.querySelectorAll("ul.facets").forEach(L=>{let $=L.dataset.facet;L.querySelectorAll("li").forEach(Ee=>{let Fe=qe("button","chip",Ee.textContent);Fe.type="button",Fe.dataset.facet=$,Fe.dataset.item=Ee.dataset.item,Fe.setAttribute("aria-pressed",String(be?.facet===$&&c[$][be.item]===Ee.dataset.item)),Fe.setAttribute("title",Sn.filter.replace("{thread}",Ee.textContent)),Ee.replaceChildren(Fe)})}),Ye=(x,L)=>{let $=[...xi.links,...xi.near];if(!$.length)return;let Ee=Ku(S,L),Fe=Gn?$.slice(0,gg):Ee,ot=qe("div","related");ot.append(qe("p","kicker",Sn.related));let At=qe("ul");if(Fe.forEach(Tt=>{let Gt=qe("li"),Re=qe("button","peer");Re.type="button",Re.dataset.memory=String(Tt),Re.append(qe("time","",j[Tt].time),qe("span","",j[Tt].title)),Gt.append(Re),At.append(Gt)}),At.addEventListener("scroll",()=>st()),ot.append(At),$.length>Ee.length){let Tt=qe("button","expander",Gn?Sn.fewer:Sn.all.replace("{n}",String(Math.min($.length,gg))));Tt.type="button",Tt.setAttribute("aria-expanded",String(Gn)),ot.append(Tt)}x.append(ot)},at=()=>{let x=Ut.firstElementChild,L=mn();!x||L<0||(x.querySelector(".related")?.remove(),Ye(x,L),ge.dataset.collapsed=x.querySelector(".expander")&&!Gn?"1":"",st(),Ut.querySelector(".expander")?.focus({preventScroll:!0}))},it=qe("p","more-cue",a.dataset.continues??"");it.setAttribute("aria-hidden","true"),ge.append(it);let Ne=()=>{let x=Ut.scrollHeight>Ut.clientHeight+4&&Ut.scrollTop+Ut.clientHeight<Ut.scrollHeight-4,L=x?"1":"";ge.dataset.overflow!==L&&(ge.dataset.overflow=L),x&&(it.style.bottom=`${(St.hidden?0:St.offsetHeight)+10}px`)};Ut.addEventListener("scroll",Ne,{passive:!0});let st=()=>{Ne();let x=ge.querySelector(".related"),L=x?.querySelector("ul");if(!L)return;let $=L.getBoundingClientRect().bottom+2,Ee=[...L.children].filter(Fe=>Fe.getBoundingClientRect().bottom>$).length;x.dataset.more=L.scrollHeight>L.clientHeight+2&&Ee?Sn.more.replace("{n}",String(Ee)):""},Wt=-1,wt=x=>{Wt!==x&&(Wt=x,N.setPreview(x))},zt=()=>{if(delete ge.dataset.fit,!!vS.has(ge.dataset.kind)){ge.classList.add("measure");for(let x of xS){if(ge.scrollHeight<=ge.clientHeight)break;ge.dataset.fit=x}ge.classList.remove("measure")}},dt=()=>{let x=d[ht],L=x.panel.cloneNode(!0);["data-station","data-panel","id"].forEach(Re=>L.removeAttribute(Re)),L.querySelectorAll("[id]").forEach(Re=>Re.removeAttribute("id")),[...L.children].forEach(Re=>Re.matches(".kicker, .period-head")||Re.remove()),L.querySelectorAll("h1, h2, h3").forEach(bg);let $=qe("button","period-start",Sn.periodstart.replace("{title}",()=>x.element.querySelector("h3")?.textContent??""));$.type="button",$.dataset.go=x.id;let Ee=S.filter(Re=>Re.period===bt),Fe=[[Ee.length,a.dataset.countMemories],[new Set(Ee.flatMap(Re=>Re.members.people??[])).size,a.dataset.countPeople],[new Set(Ee.flatMap(Re=>Re.members.places??[])).size,a.dataset.countPlaces]].filter(([Re,It])=>Re>0&&It).map(([Re,It])=>It.replace("{n}",String(Re))),ot=qe("div","related"),At=qe("ul");S.forEach((Re,It)=>{if(Re.period!==bt)return;let cn=qe("li"),bn=qe("button","peer");bn.type="button",bn.dataset.memory=String(It),bn.append(qe("time","",j[It].time),qe("span","",j[It].title)),cn.append(bn),At.append(cn)}),ot.append(At),L.append(qe("p","period-facts kicker",Fe.join(" \xB7 ")),$,ot),wt(-1),Ut.replaceChildren(L),ge.dataset.collapsed="",ge.dataset.kind="period",fn.forEach(Re=>Re.hidden=!0);let Tt=Re=>Re>=0&&Re<p.length&&S.some(It=>It.period===Re)?Re:null,Gt=(Re,It,cn)=>{Re.hidden=It===null,Re.dataset.to="",Re.dataset.periodTo=It??"",Re.textContent=cn};Gt(Ft,Tt(bt-1),`\u2190 ${Sn.earlier}`),Gt(Bt,Tt(bt+1),`${Sn.later} \u2192`),St.hidden=Ft.hidden&&Bt.hidden,dn.hidden=!1,B.running=!1,B.year=null,N.setReveal(null),se()},Ot=()=>{if(bt>=0)return dt(),requestAnimationFrame(Ne);let x=d[ht],L=x.panel.cloneNode(!0);L.removeAttribute("data-station"),L.removeAttribute("data-panel"),L.removeAttribute("id"),L.querySelectorAll("[id]").forEach(At=>At.removeAttribute("id")),L.querySelectorAll("[tabindex]").forEach(At=>At.removeAttribute("tabindex")),L.querySelectorAll("h1, h2, h3").forEach(bg),ze(L),Ce(L);let $=mn();$>=0&&Ye(L,$),x.kind==="milestone"&&L.querySelector(".period-head")?.remove(),wt(-1),Ut.replaceChildren(L),ge.dataset.collapsed=L.querySelector(".expander")&&!Gn?"1":"",ge.dataset.kind=x.kind,fn.forEach((At,Tt)=>At.hidden=x.kind!==Tt);let{previous:Ee,next:Fe}=re(ht),ot=(At,Tt,Gt)=>{At.hidden=Tt===null,At.dataset.to=Tt??"",At.textContent=Gt};ot(Ft,Ee,`\u2190 ${Sn.earlier}`),ot(Bt,Fe,`${Sn.later} \u2192`),St.hidden=x.kind==="hero"||Ee===null&&Fe===null,dn.hidden=x.kind==="hero",zt(),st(),ge.classList.remove("live"),ge.offsetWidth,ge.classList.add("live"),ge.scrollTop=0,Te="",x.kind!=="hero"&&fn.get(x.kind)?.scrollIntoView({block:"nearest"}),Ze||(Cn.textContent=x.label),je()},yn=()=>{let x=d[ht];return x.kind==="hero"?ni.start:x.kind==="milestone"?S[H(ht)].year:{book:ni.book,clone:ni.clone}[x.kind]??ni.end},$e=()=>{let x=d[ht],L=!A.closed&&A.opened.size>=3&&x.kind==="milestone"&&bt<0&&!x.element.dataset.quiet;if(tn.hidden=!L,!L)return;let $=A.sawClone?"clone":"book";kn.dataset.go=$,kn.href=`#${$}`,kn.textContent=Sn[$==="clone"?"nudgeclone":"nudgebook"],hi.setAttribute("aria-label",Sn.nudgeclose),hi.setAttribute("title",Sn.nudgeclose)};hi.addEventListener("click",()=>{A.closed=!0,$e(),ge.focus({preventScroll:!0})});let je=()=>{let x=ge.getBoundingClientRect(),L=Math.max(gd,a.getBoundingClientRect().bottom+6);vd.matches?N.setInset(0,(L+Math.max(L+120,x.top))/2-innerHeight/2):N.setInset((x.right+innerWidth)/2-innerWidth/2,(L+innerHeight-dS)/2-innerHeight/2)},on=r?.querySelector("[data-play]"),B={running:!1,year:null,from:0},se=()=>{if(!on)return;on.setAttribute("aria-pressed",String(B.running));let x=B.running?on.dataset.pauseLabel:on.dataset.playLabel;on.setAttribute("aria-label",x),on.setAttribute("title",x),on.querySelector(".rail-name").textContent=B.running?on.dataset.pauseName:on.dataset.playName,r.dataset.playing=B.year===null?"":B.running?"1":"paused"},ye=()=>{B.year!==null&&(B.running=!1,B.year=null,N.setReveal(null),se())},Ze=!1,Ge=(x,{push:L=!0,hush:$=!1}={})=>{Ze=$,ye();let Ee=bt>=0||d[ht].kind!=="hero";ht=Rn(x,0,u),bt=-1,e.dataset.period="",k=null,Gn=!1,e.dataset.asked="",be&&Ee&&d[ht].kind==="hero"&&Xe(null),d[ht].kind==="milestone"&&!nn.seen&&(nn.seen=!0,nn.on=!0,nn.from={...ai},e.dataset.gentle="1");let Fe=d[ht];if(document.documentElement.dataset.at=ht,n.textContent=Fe.label,ee(),ve(ht),d[ht].kind==="milestone"&&!$&&A.opened.add(ht),d[ht].kind==="clone"&&(A.sawClone=!0),Ot(),$e(),r&&r.querySelector(".rail-cursor")?.style.setProperty("--x",`${Ss(yn()).toFixed(2)}%`),Fe.kind==="milestone"?q.memory(S[H(ht)]):(Fe.kind==="book"||Fe.kind==="clone")&&q.swell(Fe.kind),L)try{history.replaceState(null,"",Fe.kind!=="hero"?`#${Fe.id}`:be?`#${Qu(be.facet,c[be.facet][be.item])}`:`${location.pathname}${location.search}`)}catch{return}},pt=(x,{push:L=!0}={})=>{let $=S.findIndex(Ee=>Ee.period===x);if(!($<0)&&(Ze=!1,ye(),ht=Z($),bt=x,k=null,Gn=!1,e.dataset.asked="",e.dataset.period=p[x],document.documentElement.dataset.at=ht,n.textContent=d[ht].element.querySelector(".kicker")?.textContent??"",ee(),ve(ht),Ot(),$e(),r?.querySelector(".rail-cursor")?.style.setProperty("--x",`${Ss(yn()).toFixed(2)}%`),q.memory(S[pm(S,x,1)[0]]),L))try{history.replaceState(null,"",`#period-${p[x]}`)}catch{return}},Xe=x=>{be=x;let L=be?`${be.facet}:${be.item}`:"";if(L!==Me.key){let $=no(S,be),Ee=Mm(S,$);Object.assign(Me,{key:L,chain:$,edges:fc(S,$,Fe=>N.centerOf(Fe).toArray()),option:-1,width:0,height:0}),kt.textContent=be?D[be.facet][c[be.facet][be.item]]??"":"",xn.textContent=$.length?bm(Ee,{one:a.dataset.countMemory,many:a.dataset.countMemories}):""}if(a.querySelectorAll(".legend button").forEach($=>{let Ee=$.closest(".legend").dataset.facet;$.setAttribute("aria-pressed",String(!!be&&be.facet===Ee&&c[Ee][be.item]===$.dataset.item))}),ge.querySelectorAll(".chip").forEach($=>$.setAttribute("aria-pressed",String(!!be&&be.facet===$.dataset.facet&&c[$.dataset.facet][be.item]===$.dataset.item))),e.dataset.filter=be?`${be.facet}:${c[be.facet][be.item]}`:"",Lt.hidden=!be,qt.dataset.active=be?"1":"",qt.setAttribute("aria-label",be?`${In} \xB7 ${D[be.facet][c[be.facet][be.item]]??""}`:In),be&&(Lt.textContent=`\u2715 ${D[be.facet][c[be.facet][be.item]]??""}`,Lt.setAttribute("aria-label",`${Sn.unfilter}: ${D[be.facet][c[be.facet][be.item]]??""}`)),d[ht].kind==="hero"&&bt<0)try{history.replaceState(null,"",be?`#${Qu(be.facet,c[be.facet][be.item])}`:`${location.pathname}${location.search}`)}catch{}ee(),d[ht].kind==="milestone"&&bt<0&&Ot()},Lt=a.querySelector("[data-unfilter]");Lt.addEventListener("click",()=>Xe(null));let Xt=(x,L)=>{let $=c[x].indexOf(L);Xe(be?.facet===x&&be.item===$?null:{facet:x,item:$})};a.querySelectorAll(".legend button").forEach(x=>x.addEventListener("click",()=>Xt(x.closest(".legend").dataset.facet,x.dataset.item)));let Zt=[...a.querySelectorAll(".legend")];Zt.forEach(x=>x.hidden=!1),Vn.push(()=>Zt.forEach(x=>x.hidden=!0));let gn=a.querySelector("[data-legend-toggle]");gn?.addEventListener("click",()=>{let x=a.dataset.legend!=="open";x&&Nt(!1),a.dataset.legend=x?"open":"",gn.setAttribute("aria-expanded",String(x)),je()}),e.dataset.filter="";let _t=a.querySelector(".finder"),Ae=_t.querySelector("input"),gt=_t.querySelector(".results"),Jt=_t.querySelector(".none"),Tn=a.querySelector("[data-find]"),Si=_t.querySelector(".preview"),ti=x=>{Si.dataset.on=x>=0?"1":"",!(x<0)&&(Si.querySelector("time").textContent=j[x].time,Si.querySelector("strong").textContent=j[x].title,Si.querySelector("p").textContent=j[x].body.match(/^.*?[.!?](?=\s|$)/)?.[0]??j[x].body)},Ri=x=>{let L=x.target.closest?.(".peer[data-memory]"),$=L&&_t.contains(L)?+L.dataset.memory:-1;ti($),wt($)},Dt=x=>{let L=qe("li"),$=qe("button","peer");return $.type="button",$.dataset.memory=String(x),$.append(qe("time","",j[x].time),qe("span","",j[x].title)),L.append($),L},rn=()=>gt.replaceChildren(...[...t.querySelectorAll("section.period")].flatMap(x=>{let L=[...x.querySelectorAll("[data-station='milestone']")].map(Ee=>H(d.findIndex(Fe=>Fe.element===Ee))),$=qe("li","group",x.querySelector(".kicker")?.textContent??"");return $.setAttribute("aria-hidden","true"),[$,...L.map(Dt)]})),En=x=>{_t.hidden=!x,Tn.setAttribute("aria-expanded",String(x)),x?(Ae.value.trim()||rn(),ln.hidden||Nt(!1),Ae.focus()):(ti(-1),wt(-1),_t.contains(document.activeElement)&&document.activeElement.blur(),Ae.value="",gt.replaceChildren(),Jt.textContent="")};Tn.addEventListener("click",()=>En(_t.hidden)),_t.addEventListener("focusin",Ri),gt.addEventListener("pointerover",Ri),gt.addEventListener("pointerleave",()=>{(!_t.contains(document.activeElement)||document.activeElement===Ae)&&(ti(-1),wt(-1))}),Ae.addEventListener("input",()=>{let x=Ju(Q,Ae.value),L=mm(S,c,D,Ae.value);gt.replaceChildren(...L.map($=>{let Ee=qe("li"),Fe=qe("button","peer show");return Fe.type="button",Fe.dataset.facet=$.facet,Fe.dataset.item=c[$.facet][$.item],Fe.append(qe("time","",String($.count)),qe("span","",Sn.filter.replace("{thread}",$.title))),Ee.append(Fe),Ee}),...x.map($=>Dt($.index))),Ae.value.trim()||rn(),Jt.textContent=Ae.value.trim()&&!x.length&&!L.length?Jt.dataset.none:""}),_t.addEventListener("submit",x=>{x.preventDefault(),gt.querySelector("button")?.click()}),gt.addEventListener("click",x=>{let L=x.target.closest("button");if(L){if(En(!1),L.dataset.facet){let $=c[L.dataset.facet].indexOf(L.dataset.item);return Xe(be?.facet===L.dataset.facet&&be.item===$?be:{facet:L.dataset.facet,item:$})}Ge(Z(+L.dataset.memory)),ge.focus({preventScroll:!0})}}),_t.addEventListener("keydown",x=>{if(x.key==="ArrowDown"||x.key==="ArrowUp"){let L=[...gt.querySelectorAll("button")];if(!L.length)return;x.preventDefault();let $=L.indexOf(document.activeElement);L[Rn($+(x.key==="ArrowDown"?1:-1),0,L.length-1)]?.focus(),$===0&&x.key==="ArrowUp"&&Ae.focus()}}),a.querySelector("[data-surprise]").addEventListener("click",()=>{let x=H(ht),L=x;for(;L===x&&S.length>1;)L=Math.floor(Math.random()*S.length);Ge(Z(L))});let ln=a.querySelector(".guide"),Mn=a.querySelector("[data-guide-toggle]"),Nt=x=>{ln.hidden=!x,Mn.setAttribute("aria-expanded",String(x)),x&&(En(!1),a.dataset.legend="",gn?.setAttribute("aria-expanded","false"))};Mn.addEventListener("click",()=>Nt(ln.hidden)),Tn.addEventListener("click",()=>!_t.hidden&&Nt(!1));let qt=a.querySelector("[data-more-toggle]"),In=qt.getAttribute("aria-label"),Pn=x=>{a.dataset.sheet=x?"open":"",qt.setAttribute("aria-expanded",String(x))};qt.addEventListener("click",()=>Pn(a.dataset.sheet!=="open"));let kr=a.querySelector(".sheet");kr.addEventListener("click",x=>{let L=x.target.closest("button, a");if(!L||L.matches(".lang"))return L&&Pn(!1);Pn(!1),((L.matches("[data-legend-toggle]")?a.querySelector(".legend button"):qt)??qt).focus()}),kr.addEventListener("focusout",x=>a.dataset.sheet==="open"&&!kr.contains(x.relatedTarget)&&x.relatedTarget!==qt&&Pn(!1));let sr=x=>a.dataset.sheet==="open"&&!x.target.closest(".sheet, [data-more-toggle]")&&Pn(!1);document.addEventListener("pointerdown",sr),i.addEventListener("pointerdown",()=>Nt(!1)),Vn.push(()=>document.removeEventListener("pointerdown",sr));let Vi=a.querySelector("[data-sound]");if(q.supported){Vi.hidden=!1,Vi.setAttribute("aria-pressed","true"),Vi.addEventListener("click",()=>Vi.setAttribute("aria-pressed",String(q.toggle())));let x=Fe=>{if(q.running())return $();Fe.target.closest?.("[data-sound]")||q.start()},L=["pointerup","touchend","click","keydown"],$=()=>L.forEach(Fe=>document.removeEventListener(Fe,x,!0));L.forEach(Fe=>document.addEventListener(Fe,x,!0));let Ee=()=>q.pause(document.hidden);document.addEventListener("visibilitychange",Ee),Vn.push(()=>{$(),document.removeEventListener("visibilitychange",Ee),q.close(),Vi.setAttribute("aria-pressed","false"),Vi.hidden=!0})}let Gr=qe("p","visually-hidden");Gr.setAttribute("role","status"),e.append(Gr);let ki=null,Hr=()=>document.documentElement.dataset.focus==="1",gs=x=>{document.documentElement.dataset.focus=x?"1":"",Gr.textContent=x?a.dataset.focusNote:"",ki=x?{...ai}:null,x&&(Nt(!1),Pn(!1),En(!1))},Se=()=>Hr()&&gs(!1),xt=()=>{nn.on&&(nn.on=!1,e.dataset.gentle="",ee())},zn=performance.now()/1e3,Hn=()=>zn=performance.now()/1e3,Wn=x=>{ai.x=x.clientX,ai.y=x.clientY,ki&&Math.hypot(ai.x-ki.x,ai.y-ki.y)>12&&Se(),nn.on&&Math.hypot(ai.x-nn.from.x,ai.y-nn.from.y)>12&&xt(),Math.abs(x.movementX)+Math.abs(x.movementY)>6&&Hn()},_s=()=>{Se(),xt(),Hn()},lo=[["pointermove",Wn],["pointerdown",_s],["wheel",_s],["touchstart",_s]];lo.forEach(([x,L])=>addEventListener(x,L,{passive:!0})),Vn.push(()=>{lo.forEach(([x,L])=>removeEventListener(x,L)),delete document.documentElement.dataset.focus});let Ec=km(S),wc={phase:"waiting",step:0,at:0};ge.addEventListener("pointerover",x=>{let L=x.target.closest(".related .peer");wt(L?+L.dataset.memory:-1)}),ge.addEventListener("pointerleave",()=>wt(-1)),ge.addEventListener("focusin",x=>{let L=x.target.closest(".related .peer");L&&wt(+L.dataset.memory)}),ge.addEventListener("focusout",()=>wt(-1)),ge.addEventListener("click",x=>{let L=x.target.closest(".chip");if(L)return Xt(L.dataset.facet,L.dataset.item);if(x.target.closest(".expander"))return Gn=!Gn,ee(),at();let Ee=x.target.closest(".ask-q");if(Ee)return Ue(k===Ee.dataset.ask?null:Ee.dataset.ask);let Fe=x.target.closest(".peer");if(Fe)return Ge(Z(+Fe.dataset.memory)),ge.focus({preventScroll:!0});let ot=x.target.closest(".step");if(ot&&ot.dataset.periodTo)return pt(+ot.dataset.periodTo),ge.focus({preventScroll:!0});if(ot&&ot.dataset.to!=="")return Ge(+ot.dataset.to),ge.focus({preventScroll:!0});let At=x.target.closest("[data-go]");At&&Wr.has(At.dataset.go)&&(x.preventDefault(),ho(At.dataset.go))});let Wr=new Map(d.map(x=>[x.id,x.t])),co=new Map(p.map((x,L)=>[`period-${x}`,L]));document.querySelectorAll("section.period").forEach(x=>{let L=x.querySelector("[data-station]");Wr.set(x.id,d.findIndex($=>$.element===L))});let ho=x=>{if(!Wr.has(x))return;if(co.has(x))return pt(co.get(x));let L=Wr.get(x);Ge(L),d[L].kind!=="hero"&&fn.get(d[L].kind)?.querySelector("input, a, button")?.focus()},Ac=()=>{let x;try{x=decodeURIComponent(location.hash.slice(1))}catch{return}if(!x)return Ge(0,{push:!1});if(co.has(x))return pt(co.get(x),{push:!1});let L=ym(x,c);if(L)return(d[ht].kind!=="hero"||bt>=0)&&Ge(0,{push:!1}),Xe(L);Wr.has(x)&&Ge(Wr.get(x),{push:!1})};document.querySelectorAll("[data-go]").forEach(x=>x.addEventListener("click",L=>{ge.contains(x)||!Wr.has(x.dataset.go)||(L.preventDefault(),ho(x.dataset.go))})),addEventListener("hashchange",Ac),Vn.push(()=>removeEventListener("hashchange",Ac)),t.addEventListener("focusin",x=>{let L=d.find($=>$.element.contains(x.target));L&&L.t!==ht&&Ge(L.t)});let yd={hero:_,book:f,clone:v};fn.forEach((x,L)=>x.addEventListener("focusin",()=>ht!==yd[L]&&Ge(yd[L])));let Sd={ArrowDown:1,ArrowRight:1,PageDown:1," ":1,ArrowUp:-1,ArrowLeft:-1,PageUp:-1},Md=x=>{if(!(x.metaKey||x.ctrlKey||x.altKey)&&(Hn(),xt(),!(Hr()&&x.key.toLowerCase()!=="h"&&(gs(!1),x.key==="Escape")))){if(x.key==="Escape"){if(!ln.hidden)Nt(!1),Mn.focus();else if(a.dataset.sheet==="open")Pn(!1),qt.focus();else if(!_t.hidden)En(!1),Tn.focus();else{if(x.target.closest("input, textarea, select"))return;k?Ue(null):be?Xe(null):ht!==0&&Ge(0)}return}if(!x.target.closest("input, textarea, select, .finder")){if(x.key==="/")return x.preventDefault(),En(!0);if(x.key==="?")return x.preventDefault(),Nt(ln.hidden);if(x.key.toLowerCase()==="h")return x.preventDefault(),x.repeat?void 0:gs(!Hr());if(!(x.key===" "&&x.target.closest("button, a, summary, [role='button']"))){if(x.key==="Home")x.preventDefault(),Ge(0);else if(x.key==="End")x.preventDefault(),Ge(g);else if(x.key in Sd){x.preventDefault();let L=x.key===" "&&x.shiftKey?-1:Sd[x.key],{previous:$,next:Ee}=re(ht),Fe=L>0?Ee:$;Fe!==null&&Ge(Fe)}}}}};addEventListener("keydown",Md),Vn.push(()=>removeEventListener("keydown",Md)),N.on("hover",x=>{if(x>=0&&x!==Fn&&q.tick(),Fn=x,ge.querySelectorAll(".peer[data-lit]").forEach(L=>delete L.dataset.lit),x>=0){let L=ge.querySelector(`.related .peer[data-memory="${x}"]`);if(L){L.dataset.lit="1";let $=L.closest("ul");L.offsetTop<$.scrollTop?$.scrollTop=L.offsetTop:L.offsetTop+L.offsetHeight>$.scrollTop+$.clientHeight&&($.scrollTop=L.offsetTop+L.offsetHeight-$.clientHeight)}}N.setHover(x),nt(x),i.style.cursor=x>=0?"pointer":""});let Eg=x=>x===S.length?f:x===S.length+1?v:-1;N.on("click",x=>{x>=0&&Ge(x<S.length?Z(x):Eg(x))});let bd=d.filter(x=>["milestone","book","clone"].includes(x.kind)),Rc=d.map(x=>x.kind==="milestone"?S[H(x.t)].year:{hero:ni.start,book:ni.book,clone:ni.clone}[x.kind]??ni.end);if(r){let x=r.querySelector(".rail-track"),L=r.querySelector(".rail-tip");r.querySelector(".rail-today")?.style.setProperty("--x",`${Ss(o).toFixed(2)}%`);let $=Gt=>{let Re=x.getBoundingClientRect();return ni.start+Rn((Gt.clientX-Re.left)/Re.width,0,1)*(ni.end-ni.start)},Ee=Gt=>bd.reduce((Re,It)=>Math.abs(Rc[It.t]-Gt)<Math.abs(Rc[Re.t]-Gt)?It:Re,bd[0]),Fe=Gt=>`${Gt.element.querySelector("time")?.textContent??""} \xB7 ${Gt.element.querySelector("h3, h2")?.textContent??""}`.replace(/^ · /,""),ot=!1,At=-1,Tt=Gt=>{let Re=Ee($(Gt));return L.textContent=Fe(Re),L.style.setProperty("--x",`${Ss(Rc[Re.t]).toFixed(2)}%`),L.dataset.on="1",Re};x.addEventListener("pointerdown",Gt=>{ot=!0,x.setPointerCapture(Gt.pointerId);let Re=Tt(Gt);At=Re.t,Ge(Re.t)}),x.addEventListener("pointermove",Gt=>{let Re=Tt(Gt);ot&&Re.t!==At&&(At=Re.t,Ge(Re.t))}),x.addEventListener("pointerup",()=>ot=!1),x.addEventListener("pointerleave",()=>L.dataset.on="")}on?.addEventListener("click",()=>{if(B.running)return B.running=!1,se();B.year===null&&(ht!==0&&Ge(0),B.year=1980),B.running=!0,B.from=performance.now()/1e3-Jd(B.year,o),se()});let wg=()=>{let x=[ge,a,n,r].filter(Boolean).map($=>$.getBoundingClientRect()),L=_t.hidden?null:_t.getBoundingClientRect();return L&&x.push(L),x},ui=(x,L)=>x.left<L.right&&x.right>L.left&&x.top<L.bottom&&x.bottom>L.top;N.on("frame",({formed:x,projected:L,camera:$,cssScale:Ee,time:Fe,dt:ot,intro:At,entered:Tt,seen:Gt})=>{if(le.isConnected){let G=L[te];le.style.left=`${G.x}px`,le.style.top=`${G.y}px`,le.style.visibility=G.on?"visible":"hidden"}if(ce&&(Number.isFinite(x)&&b.list.forEach((G,We)=>{if(Oe.has(We)||x<G.start)return;Oe.add(We);let Rt=S.findIndex(lt=>lt.year>=G.start-.01);Rt>=0&&q.memory({...S[Rt],period:-1})}),Tt&&we()),F&&R.windows<_r.windows&&At>=1&&!document.hidden&&(R.from||(R.from=Fe+1),Fe>=R.from&&(R.frames.push(Fm(ot*1e3)),R.frames.length>=_r.window))){let G=Vm(z,zm(R.frames));R.frames=[],R.windows++,G!==z&&(z=G,N.setQuality(z),i.dataset.quality=String(z))}let Re=performance.now()/1e3,It=!document.hidden&&_t.hidden&&ln.hidden&&a.dataset.sheet!=="open"&&!be&&B.year===null&&!Hr()&&!document.activeElement?.closest?.("input, textarea, select, button, a, .finder, .card, .masthead, .rail")&&!ge.matches(":hover"),cn=Gm(wc,{now:Re,idleSince:zn,eligible:It&&(wc.phase==="touring"||ht===0),plan:Ec},{wait:+a.dataset.idle||20,hold:+a.dataset.tourHold||6});wc=cn.state,cn.open?.age!==void 0?pt(cn.open.age,{push:!1}):cn.open?Ge(cn.open.ahead==="book"?f:v,{push:!1,hush:!0}):cn.done&&Ge(0,{push:!1,hush:!0}),B.running&&(B.year=Zd(performance.now()/1e3-B.from,o),N.setReveal(B.year),r.querySelector(".rail-cursor")?.style.setProperty("--x",`${Ss(B.year).toFixed(2)}%`),n.textContent=String(Math.floor(B.year)),B.year>=o&&(ye(),n.textContent=d[ht].label)),Bn.over=Fn>=0?Bn.over+ot:0,Bn.away=Fn>=0?0:Bn.away+ot,Bn.over>.35?Bn.on=!0:Bn.away>.8&&(Bn.on=!1);let bn=mn(),Ci=N.view.distance/N.homeDistance(),Ln=wg().map(G=>({left:G.left-12,right:G.right+12,top:G.top-12,bottom:G.bottom+12}));Ln.push({left:0,right:innerWidth,top:0,bottom:Math.max(gd,(s?.getBoundingClientRect().bottom??0)+4)},{left:0,right:innerWidth,top:innerHeight-60,bottom:innerHeight});let Xr=[],Cc=vd.matches,xr=!nn.on&&Um(Ci,innerWidth,520,!Cc||ge.getBoundingClientRect().top>=fs.top+fs.height+8),la=xr?"on":"off";e.dataset.map!==la&&(e.dataset.map=la),tt.hidden===xr&&(tt.hidden=!xr);let di=xr?tt.getBoundingClientRect():null;if(xr&&bn>=0){let G=S[bn].position[2];ms++%8===0&&ke.forEach((ut,_n)=>{let sn=N.centerOf(_n),[Qe,jt]=Un.to([sn.x,sn.y]);ut.setAttribute("cx",Qe.toFixed(1)),ut.setAttribute("cy",jt.toFixed(1))}),rr.setAttribute("points",[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([ut,_n])=>Un.to(N.groundAt(ut,_n,G)).map(sn=>sn.toFixed(1)).join(",")).join(" "));let We=N.centerOf(bn),[Rt,lt]=Un.to([We.x,We.y]);vr.setAttribute("cx",Rt.toFixed(1)),vr.setAttribute("cy",lt.toFixed(1))}di&&(Ln.push({left:di.left-8,right:di.right+8,top:di.top-8,bottom:di.bottom+8}),Xr.push(di));let Ed=new Map,wd=[],Ic=[];if(bn>=0&&B.year===null&&!be){let G=ge.getBoundingClientRect(),We=vd.matches,Rt={left:We?12:G.right+12,right:innerWidth-12,top:Math.max(gd,a.getBoundingClientRect().bottom+6),bottom:Math.min((r?.getBoundingClientRect().top??innerHeight-100)-8,We?G.top-8:1/0)},lt=L[bn],ut=Math.min(innerWidth,innerHeight)/2,_n=lt&&lt.x>=Rt.left&&lt.x<=Rt.right&&lt.y>=Rt.top&&lt.y<=Rt.bottom?{left:Math.max(Rt.left,lt.x-ut),right:Math.min(Rt.right,lt.x+ut),top:Math.max(Rt.top,lt.y-ut),bottom:Math.min(Rt.bottom,lt.y+ut)}:Rt;yi.slice(0,gS).forEach(Qe=>{let jt=De.map((pn,hn)=>N.arcScreen(bn,Qe,hn/xg,pn)),Pe=Cm(jt,_n),Je=L[Qe]?.on&&!ui({left:L[Qe].x,right:L[Qe].x,top:L[Qe].y,bottom:L[Qe].y},G);Pe&&!Je&&wd.push({j:Qe,...Pe})});let sn=wd.slice(0,yg).map((Qe,jt)=>{let Pe=de[jt],Je=`${j[Qe.j].title} \xB7 ${j[Qe.j].time}`;Pe.label.textContent!==Je&&(Pe.label.textContent=Je,Pe.width=Pe.height=0),Pe.node.hidden=!1,Pe.width||(Pe.width=Pe.node.offsetWidth),Pe.height||(Pe.height=Pe.node.offsetHeight);let pn=Im(Qe,_n);return{mark:Pe,exit:Qe,side:pn,box:Pm(Qe,pn,Pe,_n),shown:!1}});Lm(sn,_n,4,di?[{left:di.left,right:di.right,top:di.top,bottom:di.bottom}]:[]),de.forEach((Qe,jt)=>{let Pe=sn[jt];Pe?.shown?Qe.keep=mS:Qe.keep>0&&Qe.held&&(!Pe||Pe.exit.j===Qe.held.exit.j)?Qe.keep-=ot:Qe.held=null;let Je=Pe?.shown?Pe:Qe.held;Qe.held=Je??null,Qe.node.hidden=!Je,Je&&(Qe.node.style.transform=`translate3d(${Je.box.left.toFixed(1)}px, ${Je.box.top.toFixed(1)}px, 0)`,Qe.node.dataset.memory=String(Je.exit.j),Qe.node.dataset.side=Je.side,Ed.set(Je.exit.j,Je.exit.t),Ic.push(Je.exit.j),Xr.push(Je.box),Qe.arrow.style.cssText=`left: ${(Je.exit.x-Je.box.left).toFixed(1)}px; top: ${(Je.exit.y-Je.box.top).toFixed(1)}px; --a: ${Je.exit.angle.toFixed(3)}rad`,Ln.push({left:Je.box.left-4,right:Je.box.right+4,top:Je.box.top-4,bottom:Je.box.bottom+4}))})}else de.forEach(G=>{G.node.hidden=!0,G.held=null});N.setLinkReach(Ed),e.dataset.edges=String(de.filter(G=>!G.node.hidden).length||"");let Ad=Ic.join(",");if(Ad!==Te){Te=Ad;let G=new Set(Ic.map(String));ge.querySelectorAll(".peer[data-memory]").forEach(We=>We.dataset.out=G.has(We.dataset.memory)?"1":"")}let Kt={x:0,y:0,visible:!1},Xn={x:0,y:0,visible:!1},Ag=pe.filter(G=>G&&G.dim>0).map(G=>{N.project(G.centre,Xn);let[We,Rt]=[Xn.x,Xn.y];return N.project(G.world,Kt),{item:G,x:We,y:Rt,r:Math.hypot(Kt.x-We,Kt.y-Rt)}}),Rg=L.slice(S.length).filter(G=>G.on).map(G=>({item:null,x:G.x,y:G.y,r:Math.max(G.r,12)}));_e.forEach(G=>{let We=G.base*(G.year<=x?1:0);if(B.year!==null&&G.year>B.year&&(We=0),We*=G.dim??1,N.project(G.world,Kt),!Kt.visible)We=0;else if(G.width||(G.width=G.node.offsetWidth),G.height||(G.height=G.node.offsetHeight),G.kind==="ahead"){let{width:lt,height:ut}=G,_n=G.spotAt>=0?L[G.spotAt].r:G.ring*Ee/$.position.distanceTo(G.world),sn=Am(_n),Qe=fS.flatMap(jt=>_S.map(([Pe,Je])=>{let pn=sn+jt,hn=Kt.x+Pe*pn-(Pe<0?lt:Pe===0?lt/2:0),yr=Kt.y+Je*pn-(Je<0?ut:Je===0?ut/2:0);return{left:hn,right:hn+lt,top:yr,bottom:yr+ut}})).find(jt=>jt.left>=12&&jt.right<=innerWidth-12&&!Ln.some(Pe=>ui(jt,Pe)));Qe?(G.node.style.transform=`translate3d(${Qe.left.toFixed(1)}px, ${Qe.top.toFixed(1)}px, 0)`,G.node.style.setProperty("--cx",Kt.x.toFixed(1)),G.node.style.setProperty("--cy",Kt.y.toFixed(1)),G.node.style.setProperty("--r",Math.min(_n,70).toFixed(1)),We>.2&&Ln.push({left:Qe.left-4,right:Qe.right+4,top:Qe.top-4,bottom:Qe.bottom+4})):We=0}else{if(G.centre){N.project(G.centre,Xn);let sn=Math.atan2(Kt.y-Xn.y,Kt.x-Xn.x),Qe=Math.hypot(Kt.x-Xn.x,Kt.y-Xn.y),jt=({turn:Hi,scale:oi})=>{let[qr,li]=[Math.cos(sn+Hi*(Math.PI/4)),Math.sin(sn+Hi*(Math.PI/4))],qn=Math.abs(qr)*(G.width/2)+Math.abs(li)*(G.height/2)+4,Sr=Rn(Xn.x+qr*(Qe*oi+qn),G.width/2+12,innerWidth-G.width/2-12),Nc=Xn.y+li*(Qe*oi+qn);return{x:Sr,y:Nc,box:{left:Sr-G.width/2,right:Sr+G.width/2,top:Nc-G.height/2,bottom:Nc+G.height/2}}},Pe=({box:Hi})=>!Ln.some(oi=>ui(Hi,oi))&&!Xr.some(oi=>ui(Hi,oi)),Je=Hi=>{let{box:oi}=jt(Hi);return[...Ag,...Rg].reduce((qr,li)=>qr+Math.max(0,li.r*.95-Math.hypot(Rn(li.x,oi.left,oi.right)-li.x,Rn(li.y,oi.top,oi.bottom)-li.y))*(li.item===G?.6:li.item===null?1.5:1),0)},hn=(G.option&&Pe(jt(G.option))&&Je(G.option)===0?G.option:null)??(()=>{let Hi=[1,1.5,2.1,2.8].flatMap(qn=>[0,1,-1,2,-2,3,-3,4,.5,-.5,1.5,-1.5,2.5,-2.5,3.5,-3.5].map(Sr=>({turn:Sr,scale:qn}))),oi=Hi.filter(qn=>Pe(jt(qn))).map(qn=>({candidate:qn,cost:Je(qn)+(qn.scale-1)*18})),qr=oi.reduce((qn,Sr)=>Sr.cost<qn.cost-.5?Sr:qn,{candidate:Hi[0],cost:1/0}),li=oi.find(qn=>qn.candidate.turn===G.option?.turn&&qn.candidate.scale===G.option?.scale);return li&&li.cost<=qr.cost+8?li.candidate:qr.candidate})();G.option=hn;let yr=jt(hn);Kt.x=yr.x,Kt.y=yr.y;let Gi=ed(yr.box,{x:Xn.x,y:Xn.y,r:Qe*2});G.node.dataset.leader=Gi&&Gi.length>10&&!G.pin?"1":"",Gi&&Object.assign(G.leader.style,{left:`${Gi.x.toFixed(1)}px`,top:`${Gi.y.toFixed(1)}px`,width:`${Gi.length.toFixed(1)}px`,transform:`rotate(${Gi.angle.toFixed(3)}rad)`});let Cd=`${Xn.x.toFixed(0)},${Xn.y.toFixed(0)},${Qe.toFixed(0)}`;G.mass!==Cd&&(G.mass=Cd,G.node.style.setProperty("--cx",Xn.x.toFixed(0)),G.node.style.setProperty("--cy",Xn.y.toFixed(0)),G.node.style.setProperty("--r",Qe.toFixed(0)))}if(Kt.x=Rn(Kt.x,G.width/2+12,innerWidth-G.width/2-12),G.pin){let sn=G.height+6,Qe=[0,1,-1,2,-2,3,-3].map(jt=>Kt.y+jt*sn).find(jt=>!Ln.some(Pe=>ui({left:Kt.x-G.width/2,right:Kt.x+G.width/2,top:jt-G.height/2,bottom:jt+G.height/2},Pe)));Qe!==void 0&&(Kt.y=Qe)}G.node.style.transform=`translate3d(${Kt.x.toFixed(1)}px, ${Kt.y.toFixed(1)}px, 0)`;let lt=G.kind==="ring-year"||G.kind==="countdown-mark"?1:4,ut={left:Kt.x-G.width/2-lt,right:Kt.x+G.width/2+lt,top:Kt.y-G.height/2-lt,bottom:Kt.y+G.height/2+lt};(G.kind==="ring-year"||G.kind==="countdown-mark")&&Ln.some(sn=>ui(ut,sn))&&(We=0);let _n={left:ut.left+4,right:ut.right-4,top:ut.top+4,bottom:ut.bottom-4};G.kind==="galaxy"&&!G.pin&&(Xr.some(sn=>ui(_n,sn))||Ln.some(sn=>ui(_n,sn)))&&(We=0),We>.2&&Ln.push(ut)}let Rt=Math.round(We*100)/100;Rt!==G.shown&&(G.shown=Rt,G.node.style.opacity=Rt,G.node.style.visibility=Rt>0?"visible":"hidden")});let Cg=d[ht].kind==="hero"&&bn<0&&bt<0&&B.year===null,uo=0;if(be&&Me.chain.length&&Cg){let G=Me.chain.map(We=>L[We]).filter(We=>We.on);if(G.length){Me.width||(Me.width=mt.offsetWidth),Me.height||(Me.height=mt.offsetHeight);let{width:We,height:Rt}=Me,lt={left:Math.min(...G.map(Pe=>Pe.x-Pe.r)),right:Math.max(...G.map(Pe=>Pe.x+Pe.r)),top:Math.min(...G.map(Pe=>Pe.y-Pe.r)),bottom:Math.max(...G.map(Pe=>Pe.y+Pe.r))},ut=(lt.top+lt.bottom-Rt)/2,_n=[[lt.left,lt.top-oa-Rt],[lt.right-We,lt.top-oa-Rt],[lt.left-oa-We,ut],[lt.right+oa,ut],[lt.left,lt.bottom+oa],[lt.right-We,lt.bottom+oa]].map(([Pe,Je])=>({left:Pe,top:Je,right:Pe+We,bottom:Je+Rt})),sn=G.map(Pe=>({left:Pe.x-Pe.r*.7,right:Pe.x+Pe.r*.7,top:Pe.y-Pe.r*.7,bottom:Pe.y+Pe.r*.7})),Qe=Pe=>Pe.left>=12&&Pe.right<=innerWidth-12&&Pe.top>=12&&Pe.bottom<=innerHeight-12&&!Ln.some(Je=>ui(Pe,Je))&&!sn.some(Je=>ui(Pe,Je)),jt=Me.option>=0&&Qe(_n[Me.option])?Me.option:_n.findIndex(Qe);if(jt>=0){Me.option=jt;let Pe=_n[jt];mt.style.transform=`translate3d(${Pe.left.toFixed(1)}px, ${Pe.top.toFixed(1)}px, 0)`,Ln.push({left:Pe.left-8,right:Pe.right+8,top:Pe.top-8,bottom:Pe.bottom+8}),uo=1}}}uo!==Me.shown&&(Me.shown=uo,mt.dataset.on=uo?"1":"");let Ig=innerWidth<=760?8:Ci>.8?14:pS,Pc=[],Rd=[];L.forEach((G,We)=>We<S.length&&G.on&&G.r>3&&Rd.push({j:We,left:G.x-G.r*.7,right:G.x+G.r*.7,top:G.y-G.r*.7,bottom:G.y+G.r*.7})),K.forEach((G,We)=>{let Rt=L[We],lt=S[We],ut=0;We===bn?ut=1e3:We===Fn?ut=900:We===Wt?ut=880:be?ut=0:lt.weight>=3&&Ci<.6?ut=30:lt.weight===2&&Ci<.5?ut=20:Ci<.22&&(ut=10),bn>=0&&ut<500&&(ut=0),Bn.on&&We!==Fn&&ut===40&&(ut=0),lt.year+3>x&&We!==bn&&(ut=0),!he&&Gt&&We===te&&(ut=900),bt>=0&&(ut=We===Fn||We===Wt?900:0),B.year!==null&&(ut=lt.year<=B.year&&lt.year>B.year-2.5?800+lt.weight:0),ut>0&&Rt.on?Pc.push({tag:G,spot:Rt,priority:ut,i:We}):G.on&&(G.on=!1,G.node.dataset.on="")}),Pc.sort((G,We)=>We.priority-G.priority||G.i-We.i);let Lc=[];for(let{tag:G,spot:We,priority:Rt,i:lt}of Pc){let ut=Rt===40||Rt===900&&lt===Fn&&bn<0&&bt<0&&Ci>=.6?"1":"",_n=lt===bn||lt===Fn?"1":"";(G.node.dataset.name!==ut||G.node.dataset.hot!==_n)&&(G.glide=G.node.dataset.hot!==_n,G.node.dataset.cool=G.node.dataset.hot==="1"&&!_n?"1":"",G.node.dataset.name=ut,G.node.dataset.hot=_n,G.width=G.height=0),G.width||(G.width=G.node.offsetWidth),G.height||(G.height=G.node.offsetHeight);let sn=Em(We,{width:G.width,height:G.height},innerWidth);if(sn.forEach((pn,hn)=>pn.slot=hn),Rt>=900){let pn=Rn(We.x-G.width/2,12,innerWidth-G.width-12);sn.splice(8,0,{left:pn,right:pn+G.width,top:We.y-G.height/2,bottom:We.y+G.height/2,far:!1})}let Qe=pn=>pn.left>=12&&pn.right<=innerWidth-12,Je=wm(sn,{free:pn=>Qe(pn)&&!Ln.some(hn=>ui(pn,hn))&&!Lc.some(hn=>ui(pn,{left:hn.left-6,right:hn.right+6,top:hn.top-4,bottom:hn.bottom+4})),clear:pn=>!Rd.some(hn=>hn.j!==lt&&ui(pn,hn)),inside:Qe,forced:Rt>=900,keep:G.on?G.slot:-1});if(Je&&!(Je.far&&Rt<900)&&Lc.length<Ig){Lc.push(Je);let pn=G.on&&G.slot!==void 0&&G.slot!==Je.slot;G.slot=Je.slot;let hn=Je.far?ed(Je,We):null;hn?(Object.assign(G.leader.style,{left:`${hn.x.toFixed(1)}px`,top:`${hn.y.toFixed(1)}px`,width:`${hn.length.toFixed(1)}px`,transform:`rotate(${hn.angle.toFixed(3)}rad)`}),G.node.dataset.leader="1"):G.node.dataset.leader="",(G.glide||pn)&&G.on&&G.last&&(G.slide=[G.last.left-Je.left,G.last.top-Je.top]),G.glide=!1,G.last={left:Je.left,top:Je.top};let yr=Math.exp(-3*ot);G.slide=G.slide?G.slide.map(Gi=>Math.abs(Gi)<.3?0:Gi*yr):[0,0],G.node.style.transform=`translate3d(${(Je.left+G.slide[0]).toFixed(1)}px, ${(Je.top+G.slide[1]).toFixed(1)}px, 0)`,G.node.style.setProperty("--cx",We.x.toFixed(1)),G.node.style.setProperty("--cy",We.y.toFixed(1)),G.on||(G.on=!0,G.node.dataset.on="1")}else G.on&&(G.on=!1,G.node.dataset.on="")}}),new ResizeObserver(je).observe(ge);let Td=()=>{Me.width=Me.height=0,N.resize(),zt(),st(),je(),d[ht].kind==="hero"?N.home():ve(ht)};addEventListener("resize",Td),addEventListener("themechange",N.applyTheme),Vn.push(()=>{removeEventListener("resize",Td),removeEventListener("themechange",N.applyTheme)}),N.on("error",x=>{console.error(x),Tc()}),document.documentElement.classList.add("immersive"),document.fonts?.ready.then(()=>{K.forEach(x=>(x.width=0,x.height=0)),Me.width=Me.height=0,zt(),st(),je()}),a.dataset.ready="1",Ge(0,{push:!1}),Ac(),je()}Tg();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
