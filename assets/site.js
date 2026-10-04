(()=>{document.querySelectorAll("form.waitlist").forEach(i=>{let e=i.querySelector(".status");i.addEventListener("submit",()=>{e.textContent=i.dataset.opened})});var ol=[1.6,4.2],zh={1:1.1,2:1.6,3:2.2},xf=51,gi=["threads","people","places"],rl=[0,1,-1,2,-2],sl={sigma:1.6,background:.08},Li={base:470,cap:12e4,trail:18e3},In={inner:900,outer:1600,stars:9e3,halo:.015,band:.35,tilt:.6,thickness:.16},Nt={core:4,reach:3.2,gap:12,future:44,twist:2.2,swirl:.9,inner:.22,depth:4,room:3,ahead:[.3,.7],today:.06,sweep:1.9*Math.PI,growth:1.75,rise:26},Qr=.25,yf=i=>/^\d{4}$/.test(i)?"year":/^\d{4}-\d{2}$/.test(i)?"month":null,Hh=(i=Date.now())=>{let e=new Date(i),t=e.getFullYear(),n=Date.UTC(t,e.getMonth(),e.getDate());return t+(n-Date.UTC(t,0,1))/(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))},qs=(i,e=Date.now())=>{let[t,n]=i.split("-").map(Number),r=new Date(e);return(t-r.getFullYear())*12+(n-1-r.getMonth())},Ys=(i,e)=>!Number.isFinite(i)||i<0?"":new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(i,"month"),_r=i=>i-1980;function Sf(i){let e=new Map;i.forEach(({date:n})=>e.set(n,(e.get(n)??0)+1));let t=new Map;return i.map(({date:n})=>{let r=yf(n);if(!r)throw new Error(`date "${n}" is neither YYYY nor YYYY-MM`);let s=+n.slice(0,4),a=t.get(n)??0;t.set(n,a+1);let o=(a+.5)/e.get(n);return r==="month"?s+(+n.slice(5,7)-1+o)/12:s+o})}function Mf(i,e){let t=[];return i.map((n,r)=>{let s=new Set;for(let a=r-1;a>=0&&n-i[a]<=e;a--)s.add(t[a]);return t[r]=rl.find(a=>!s.has(a))??rl[r%rl.length],t[r]})}function bf(i){return i.map(e=>{let t=i.filter(n=>Math.abs(n-e)<=.6).length;return Math.min(1,1/Math.sqrt(Math.max(1,t/2)))})}var ll=i=>Math.min(1,Math.max(0,i)),Tf=(i,e)=>(Math.sqrt(i.inner*i.inner+2*i.spin*e)-i.inner)/i.spin;function gr(i,e,t=0){let n=Tf(i,e),r=i.inner+i.spin*n+t;return[r*Math.sin(n)-i.pole[0],r*Math.cos(n)-i.pole[1],-7+Nt.rise*(e/i.length-.5)]}function Ef(i,e,t,n){let r=Array.from({length:t},()=>[]);i.forEach((f,v)=>e[v]>=0&&r[e[v]].push(f));let s=[];r.forEach((f,v)=>s.push(f.length?Math.min(...f):s[v-1]??1980));let a=r.map(f=>Nt.core+Nt.reach*Math.sqrt(f.length)),o=a.reduce((f,v)=>f+2*v,0)+Nt.gap*t+Nt.future,c=2*o/(Nt.sweep*(1+Nt.growth)),l={inner:c,spin:c*(Nt.growth-1)/Nt.sweep,length:o,pole:[0,0]},h=0,p=a.map(f=>{let v=h+f;return h+=2*f+Nt.gap,v}),d=[...p.map((f,v)=>[gr(l,f),a[v]]),...Array.from({length:9},(f,v)=>[gr(l,h+Nt.future*v/8),3])],u=[0,1].map(f=>[Math.min(...d.map(([v,g])=>v[f]-g)),Math.max(...d.map(([v,g])=>v[f]+g))]);l.pole=u.map(([f,v])=>(f+v)/2);let m=a.map((f,v)=>{let g=s.slice(v+1).find((y,b)=>r[v+1+b].length&&y>s[v]),_=Math.max(g??Math.max(n,...r[v]),s[v]+1);return{start:s[v],end:_,count:r[v].length,radius:f,turn:v*Nt.twist,along:p[v],centre:gr(l,p[v])}});return{...l,ahead:h,list:m}}var js=(i,e)=>{let t=i.list.findIndex(n=>e<n.end);return t<0?i.list.length-1:t},$s=(i,e)=>ll((e-i.start)/(i.end-i.start)),Vh=[1,2,5,10,20,50,100];function Wh(i,e=8){let t=Math.ceil(i.start+1e-9),n=Math.floor(i.end+1e-9),r=a=>Array.from({length:Math.max(0,n-t+1)},(o,c)=>t+c).filter(o=>o%a===0),s=Vh.find(a=>r(a).length<=e)??Vh.at(-1);return r(s).map(a=>({year:a,radius:i.radius*(Nt.inner+(1-Nt.inner)*$s(i,a))}))}var kh=(i,e)=>(js(i,e)+$s(i.list[js(i,e)],e))/i.list.length;function Xh(i,e){if(e>=1)return 1/0;let t=Math.max(0,e)*i.list.length,n=i.list[Math.min(i.list.length-1,Math.floor(t))];return n.start+(t-Math.floor(t))*(n.end-n.start)}function jh(i,e,t,n,r=0,s=0){let a=Math.PI*2/Math.max(1,t)*Math.max(0,e)+i.turn+Nt.swirl*n+r,o=Math.max(.4,i.radius*(Nt.inner+(1-Nt.inner)*n)+s);return[i.centre[0]+o*Math.sin(a),i.centre[1]+o*Math.cos(a),i.centre[2]+Nt.depth*(n-.5)]}var al=(i,e,t=0)=>gr(i,i.ahead+e*Nt.future,t);function cl(i,e,{periods:t=[],today:n=1980+xf}={}){let r=i.map(a=>t.length?t.indexOf(a.period):0),s=i.find((a,o)=>r[o]<0);if(s)throw new Error(`memory ${s.id}: period "${s.period}" is not one of ${t.join(", ")}`);return{...Ef(e,r,Math.max(1,t.length),n),periodOf:r}}function qh(i,e={},t={}){let n=Sf(i),r=bf(n),s=gi.filter(d=>e[d]?.length),a=i.map(d=>Object.fromEntries(s.map(u=>[u,(d[u]??[]).map(m=>e[u].indexOf(m)).filter(m=>m>=0)]))),o=e.threads?.length??0,c=cl(i,n,t),l=[],h=new Map;i.forEach((d,u)=>{let m=`${c.periodOf[u]}:${a[u].threads?.[0]??0}`;h.set(m,[...h.get(m)??[],u])});let p=Math.PI*2/Math.max(1,o);return h.forEach(d=>{let u=c.list[c.periodOf[d[0]]],m=(u.end-u.start)/(u.radius*(1-Nt.inner));Mf(d.map(f=>n[f]),Nt.room*m).forEach((f,v)=>{let g=d[v],_=$s(u,n[g]),y=u.radius*(Nt.inner+(1-Nt.inner)*_),b=Math.max(-.45*p,Math.min(.45*p,f*Nt.room/Math.max(y,2)));l[g]=jh(u,a[g].threads?.[0]??0,o,_,b)})}),n.map((d,u)=>({id:i[u].id,year:d,position:l[u],spread:(zh[i[u].weight]??zh[1])*r[u],weight:i[u].weight,members:a[u],period:c.periodOf[u],links:i[u].links??[]}))}function Yh(i){let[e,t]=Nt.ahead.map(n=>al(i,n));return{today:al(i,Nt.today),book:e,clone:t}}var $h=(i,e)=>e.reduce((t,n)=>t+n.weight*Math.exp(-(((i-n.year)/1.6)**2)),0),Zh=i=>Math.max(...i.map(e=>$h(e.year,i)),1e-6);function wf(i,e,t=Zh(e)){return Math.min(1,$h(i,e)/t)}function Af(i,e,t,n){let r=Math.ceil((n-1980)/Qr)+1,s=new Float32Array(r*Math.max(1,t)),a=Math.ceil(sl.sigma*3/Qr);for(let o of i)(o.members[e]??[]).forEach((c,l)=>{let h=(o.year-1980)/Qr;for(let p=Math.max(0,Math.floor(h)-a);p<=Math.min(r-1,Math.ceil(h)+a);p++){let d=(p*Qr-(o.year-1980))/sl.sigma;s[p*t+c]+=o.weight*(l===0?1:.5)*Math.exp(-d*d)/3}});return{table:s,count:t,bins:r}}function Jh({table:i,count:e,bins:t},n,r){return Math.min(1,i[Math.min(t-1,Math.max(0,Math.round((n-1980)/Qr)))*e+r])}function Gh(i,e,t){let n=Array.from({length:i.count},(s,a)=>sl.background+Jh(i,e,a)),r=t()*n.reduce((s,a)=>s+a,0);for(let s=0;s<i.count;s++)if((r-=n[s])<=0)return s;return i.count-1}function Kh(i,e=In.inner,t=In.outer){let n=i()*2-1,r=i()*Math.PI*2,s=e+(t-e)*i(),a=Math.sqrt(1-n*n)*s;return[a*Math.cos(r),a*Math.sin(r),n*s]}function Rf(i){let e=i()*Math.PI*2,t=Pi(i)*In.thickness,[n,r,s]=[Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t)];return[n,r*Math.cos(In.tilt)-s*Math.sin(In.tilt),r*Math.sin(In.tilt)+s*Math.cos(In.tilt)]}function Qh({count:i=In.stars,random:e}){let t={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i),halo:new Float32Array(i)};for(let n=0;n<i;n++){let r=e()<In.halo,s=r?.8+.2*e():.7*e()**7,a=!r&&e()<In.band?Rf(e):Kh(e,1,1),o=In.outer-(In.outer-In.inner)*s;t.position.set(a.map(c=>c*o),n*3),t.seed[n]=e(),t.bright[n]=s,t.halo[n]=r?1:0,t.size[n]=1+1.2*s}return t}var Pi=i=>Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i());function Cf(i,{base:e=Li.base,cap:t=Li.cap}={}){let n=i.reduce((r,s)=>r+s.weight**1.5,0)||1;return Math.min(e,t/n)}function eu({marks:i,sky:e,today:t,random:n,base:r=Li.base,cap:s=Li.cap,trail:a=Li.trail,facets:o={}}){let c=Cf(i,{base:r,cap:s}),l=b=>Math.max(8,Math.round(c*b.weight**1.5)),h=gi.filter(b=>o[b]?.length),p=i.reduce((b,T)=>b+l(T),0)+a,d={count:p,position:new Float32Array(p*3),center:new Float32Array(p*3),from:new Float32Array(p*3),facet:Object.fromEntries(gi.map(b=>[b,new Float32Array(p).fill(-1)])),u:new Float32Array(p),order:new Float32Array(p),seed:new Float32Array(p),size:new Float32Array(p),ahead:new Float32Array(p),kind:new Float32Array(p),memory:new Float32Array(p),galaxy:new Float32Array(p).fill(-1)},u=(b,T,S,P,O,z,N,j,U)=>{d.position.set(T,b*3),d.center.set(S,b*3),d.from.set(Kh(n),b*3),d.u[b]=P,d.order[b]=U,d.seed[b]=n(),d.size[b]=O,d.ahead[b]=z,d.kind[b]=N,d.memory[b]=j},m=0;i.forEach((b,T)=>{for(let S=0,P=l(b);S<P;S++,m++){let O=[Pi(n),Pi(n),Pi(n)*.8],z=b.spread*Math.abs(Pi(n))*.55,N=Math.hypot(...O)||1,j=O.map(U=>U/N*z);u(m,b.position.map((U,Z)=>U+j[Z]),b.position,_r(b.year),.1+n()*.16,0,1,T,kh(e,b.year)),d.galaxy[m]=b.period;for(let U of h)d.facet[U][m]=b.members[U][0]??-1}});let f=t+ol[1]+.4,v=Object.fromEntries(h.map(b=>[b,Af(i,b,o[b].length,f)])),g=o.threads?.length??0,_=Math.PI*2/Math.max(1,g),y=Zh(i);for(let b=0;b<a;b++,m++){let T=n()<.06,S=T?t+n()*(f-t):1980+n()*(t-1980),P=v.threads?T?Math.floor(n()*g):Gh(v.threads,S,n):-1,O=P>=0&&!T?Jh(v.threads,S,P):wf(S,i,y),z;if(T)z=al(e,n(),Pi(n)*2.4);else{let N=e.list[js(e,S)],j=n()<.14,U=j?n()*.2:$s(N,S);z=jh(N,P,g,U,Pi(n)*_*(j?1.2:.14),Pi(n)*(.5+.9*O))}for(let N of h)d.facet[N][m]=N==="threads"?P:T?Math.floor(n()*o[N].length):Gh(v[N],S,n);u(m,z,z,_r(S),.05+n()*.07,T?1:0,0,-1,T?1:kh(e,S)),d.galaxy[m]=T?-1:js(e,S)}return d}var un={start:1980,end:2031,book:2027.8,clone:2029.6},tu={seconds:16},nu=(i,e,t=1980,n=tu.seconds)=>t+(e-t)*ll(i/n),iu=(i,e,t=1980,n=tu.seconds)=>ll((i-t)/(e-t))*n,es=i=>(i-un.start)/(un.end-un.start)*100,Gn={rate:.004,ramp:6,slots:16},If=i=>Gn.rate*12/(i.radius+12),Pf=i=>i<=0?0:i-Gn.ramp*(1-Math.exp(-i/Gn.ramp)),ru=(i,e)=>If(i)*Pf(e);var Lf=24;document.querySelectorAll(".countdown[data-until]").forEach(i=>{let e=qs(i.dataset.until);if(!(e>=0)){i.hidden=!0;return}i.querySelector(".remaining").textContent=` \xB7 ${Ys(e,document.documentElement.lang)}`,i.querySelector(".scale").style.setProperty("--months",Math.min(e,Lf))});var Bu=0,Hl=1,zu=2;var Ds=1,Vu=2,Br=3,zr=0,Sn=1,ai=2,oi=0,Xi=1,Us=2,Wl=3,Xl=4,ku=5;var Vr=100,Gu=101,Hu=102,Wu=103,Xu=104,ju=200,qu=201,Yu=202,$u=203,Zu=204,Ju=205,Ku=206,Qu=207,ed=208,td=209,nd=210,id=211,rd=212,sd=213,ad=214,jl=0,ql=1,Yl=2,yo=3,$l=4,Zl=5,Jl=6,Kl=7,od=0,ld=1,cd=2,$n=0,Ql=1,ec=2,tc=3,nc=4,ic=5,rc=6,sc=7;var kr=301,ar=302,So=303,Mo=304,Os=306,hd=1e3,bo=1001,ud=1002,li=1003,dd=1004;var Fs=1005;var Mn=1006,To=1007;var or=1008;var Zn=1009,pd=1010,fd=1011,Bs=1012,ac=1013,ji=1014,Jn=1015,ci=1016,oc=1017,lc=1018,Gr=1020,md=35902,gd=35899,_d=1021,vd=1022,hi=1023,lr=1026,cr=1027,Eo=1028,cc=1029,hr=1030,hc=1031;var uc=1033,wo=33776,Ao=33777,Ro=33778,Co=33779,dc=35840,pc=35841,fc=35842,mc=35843,gc=36196,_c=37492,vc=37496,xc=37488,yc=37489,Io=37490,Sc=37491,Mc=37808,bc=37809,Tc=37810,Ec=37811,wc=37812,Ac=37813,Rc=37814,Cc=37815,Ic=37816,Pc=37817,Lc=37818,Nc=37819,Dc=37820,Uc=37821,Oc=36492,Fc=36494,Bc=36495,zc=36283,Vc=36284,Po=36285,kc=36286;var Gc=0,xd=1,ur="",Hc="srgb",Lo="srgb-linear",Wc="linear",Lt="srgb";var yd=512,Sd=513,Md=514,No=515,bd=516,Td=517,Do=518,Ed=519;var Xc=35048;var jc="300 es",qc=2e3;function Nf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Df(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function hs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function wd(){let i=hs("canvas");return i.style.display="block",i}var su={},Ir=null;function Yc(...i){let e="THREE."+i.shift();Ir?Ir("log",e,...i):console.log(e,...i)}function Ad(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function We(...i){let e="THREE."+(i=Ad(i)).shift();if(Ir)Ir("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function qe(...i){let e="THREE."+(i=Ad(i)).shift();if(Ir)Ir("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Qi(...i){let e=i.join(" ");e in su||(su[e]=!0,We(...i))}function Rd(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Cd={[jl]:1,[Yl]:6,[$l]:7,[yo]:5,[ql]:0,[Jl]:2,[Kl]:4,[Zl]:3},si=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ta=Math.PI/180,Ea=180/Math.PI;function Hr(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(nn[255&i]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]+"-"+nn[255&e]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[63&t|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[255&n]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function ht(i,e,t){return Math.max(e,Math.min(t,i))}function Uf(i,e){return(i%e+e)%e}function hl(i,e,t){return(1-t)*i+t*e}function ts(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function gn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:case Uint8ClampedArray:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Qc=class Qc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Qc.prototype.isVector2=!0;var xe=Qc,Vn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],h=n[r+2],p=n[r+3],d=s[a+0],u=s[a+1],m=s[a+2],f=s[a+3];if(p!==f||c!==d||l!==u||h!==m){let v=c*d+l*u+h*m+p*f;v<0&&(d=-d,u=-u,m=-m,f=-f,v=-v);let g=1-o;if(v<.9995){let _=Math.acos(v),y=Math.sin(_);g=Math.sin(g*_)/y,c=c*g+d*(o=Math.sin(o*_)/y),l=l*g+u*o,h=h*g+m*o,p=p*g+f*o}else{c=c*g+d*o,l=l*g+u*o,h=h*g+m*o,p=p*g+f*o;let _=1/Math.sqrt(c*c+l*l+h*h+p*p);c*=_,l*=_,h*=_,p*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],c=n[r+1],l=n[r+2],h=n[r+3],p=s[a],d=s[a+1],u=s[a+2],m=s[a+3];return e[t]=o*m+h*p+c*u-l*d,e[t+1]=c*m+h*d+l*p-o*u,e[t+2]=l*m+h*u+o*d-c*p,e[t+3]=h*m-o*p-c*d-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(r/2),p=o(s/2),d=c(n/2),u=c(r/2),m=c(s/2);switch(a){case"XYZ":this._x=d*h*p+l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p-d*u*m;break;case"YXZ":this._x=d*h*p+l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p+d*u*m;break;case"ZXY":this._x=d*h*p-l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p-d*u*m;break;case"ZYX":this._x=d*h*p-l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p+d*u*m;break;case"YZX":this._x=d*h*p+l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p-d*u*m;break;case"XZY":this._x=d*h*p-l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p+d*u*m;break;default:We("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],p=t[10],d=n+o+p;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-c)*u,this._y=(s-l)*u,this._z=(a-r)*u}else if(n>o&&n>p){let u=2*Math.sqrt(1+n-o-p);this._w=(h-c)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+l)/u}else if(o>p){let u=2*Math.sqrt(1+o-n-p);this._w=(s-l)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(c+h)/u}else{let u=2*Math.sqrt(1+p-n-o);this._w=(a-r)/u,this._x=(s+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-r*o,this._w=a*h-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},eh=class eh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(au.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(au.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),h=2*(o*t-s*r),p=2*(s*n-a*t);return this.x=t+c*l+a*p-o*h,this.y=n+c*h+o*l-s*p,this.z=r+c*p+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ul.copy(this).projectOnVector(e),this.sub(ul)}reflect(e){return this.sub(ul.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};eh.prototype.isVector3=!0;var C=eh,ul=new C,au=new Vn,th=class th{constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],p=n[7],d=n[2],u=n[5],m=n[8],f=r[0],v=r[3],g=r[6],_=r[1],y=r[4],b=r[7],T=r[2],S=r[5],P=r[8];return s[0]=a*f+o*_+c*T,s[3]=a*v+o*y+c*S,s[6]=a*g+o*b+c*P,s[1]=l*f+h*_+p*T,s[4]=l*v+h*y+p*S,s[7]=l*g+h*b+p*P,s[2]=d*f+u*_+m*T,s[5]=d*v+u*y+m*S,s[8]=d*g+u*b+m*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+r*s*l-r*a*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=h*a-o*l,d=o*c-h*s,u=l*s-a*c,m=t*p+n*d+r*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let f=1/m;return e[0]=p*f,e[1]=(r*l-h*n)*f,e[2]=(o*n-r*a)*f,e[3]=d*f,e[4]=(h*t-r*c)*f,e[5]=(r*s-o*t)*f,e[6]=u*f,e[7]=(n*c-l*t)*f,e[8]=(a*t-n*s)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Qi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(dl.makeScale(e,t)),this}rotate(e){return Qi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(dl.makeRotation(-e)),this}translate(e,t){return Qi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(dl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};th.prototype.isMatrix3=!0;var Je=th,dl=new Je,ou=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lu=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Of(){let i={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer==="srgb"&&(r.r=Ti(r.r),r.g=Ti(r.g),r.b=Ti(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer==="srgb"&&(r.r=Cr(r.r),r.g=Cr(r.g),r.b=Cr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?"linear":this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Qi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Qi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Lo]:{primaries:e,whitePoint:n,transfer:"linear",toXYZ:ou,fromXYZ:lu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},[Hc]:{primaries:e,whitePoint:n,transfer:"srgb",toXYZ:ou,fromXYZ:lu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),i}var pt=Of();function Ti(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Cr(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var vr,wa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vr===void 0&&(vr=hs("canvas")),vr.width=e.width,vr.height=e.height;let r=vr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=vr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=hs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*Ti(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*Ti(t[n]/255)):t[n]=Ti(t[n]);return{data:t,width:e.width,height:e.height}}return We("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Ff=0,Pr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Hr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(pl(r[a].image)):s.push(pl(r[a]))}else s=pl(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function pl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?wa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(We("Texture: Unable to serialize Texture."),{})}var Bf=0,fl=new C,_n=class i extends si{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,c=1009,l=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=Hr(),this.name="",this.source=new Pr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(fl).x}get height(){return this.source.getSize(fl).y}get depth(){return this.source.getSize(fl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){We(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:We(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};_n.DEFAULT_IMAGE=null,_n.DEFAULT_MAPPING=300,_n.DEFAULT_ANISOTROPY=1;var nh=class nh{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,l=c[0],h=c[4],p=c[8],d=c[1],u=c[5],m=c[9],f=c[2],v=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(p-f)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+f)<.1&&Math.abs(m+v)<.1&&Math.abs(l+u+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,b=(u+1)/2,T=(g+1)/2,S=(h+d)/4,P=(p+f)/4,O=(m+v)/4;return y>b&&y>T?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=S/n,s=P/n):b>T?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=S/r,s=O/r):T<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),n=P/s,r=O/s),this.set(n,r,s,t),this}let _=Math.sqrt((v-m)*(v-m)+(p-f)*(p-f)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(v-m)/_,this.y=(p-f)/_,this.z=(d-h)/_,this.w=Math.acos((l+u+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};nh.prototype.isVector4=!0;var Pt=nh,Aa=class extends si{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new _n(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Pr(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},xn=class extends Aa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},us=class extends _n{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ra=class extends _n{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var xo=class xo{constructor(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v)}set(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=p,g[14]=d,g[3]=u,g[7]=m,g[11]=f,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xo().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/xr.setFromMatrixColumn(e,0).length(),s=1/xr.setFromMatrixColumn(e,1).length(),a=1/xr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=c*h,t[4]=-c*p,t[8]=l,t[1]=u+m*l,t[5]=d-f*l,t[9]=-o*c,t[2]=f-d*l,t[6]=m+u*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,u=c*p,m=l*h,f=l*p;t[0]=d+f*o,t[4]=m*o-u,t[8]=a*l,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=u*o-m,t[6]=f+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,u=c*p,m=l*h,f=l*p;t[0]=d-f*o,t[4]=-a*p,t[8]=m+u*o,t[1]=u+m*o,t[5]=a*h,t[9]=f-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=c*h,t[4]=m*l-u,t[8]=d*l+f,t[1]=c*p,t[5]=f*l+d,t[9]=u*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,u=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=f-d*p,t[8]=m*p+u,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=u*p+m,t[10]=d-f*p}else if(e.order==="XZY"){let d=a*c,u=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=-p,t[8]=l*h,t[1]=d*p+f,t[5]=a*h,t[9]=u*p-m,t[2]=m*p-u,t[6]=o*h,t[10]=f*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zf,e,Vf)}lookAt(e,t,n){let r=this.elements;return Pn.subVectors(e,t),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),Ni.crossVectors(n,Pn),Ni.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),Ni.crossVectors(n,Pn)),Ni.normalize(),Zs.crossVectors(Pn,Ni),r[0]=Ni.x,r[4]=Zs.x,r[8]=Pn.x,r[1]=Ni.y,r[5]=Zs.y,r[9]=Pn.y,r[2]=Ni.z,r[6]=Zs.z,r[10]=Pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],p=n[5],d=n[9],u=n[13],m=n[2],f=n[6],v=n[10],g=n[14],_=n[3],y=n[7],b=n[11],T=n[15],S=r[0],P=r[4],O=r[8],z=r[12],N=r[1],j=r[5],U=r[9],Z=r[13],ee=r[2],se=r[6],W=r[10],G=r[14],$=r[3],he=r[7],ae=r[11],ie=r[15];return s[0]=a*S+o*N+c*ee+l*$,s[4]=a*P+o*j+c*se+l*he,s[8]=a*O+o*U+c*W+l*ae,s[12]=a*z+o*Z+c*G+l*ie,s[1]=h*S+p*N+d*ee+u*$,s[5]=h*P+p*j+d*se+u*he,s[9]=h*O+p*U+d*W+u*ae,s[13]=h*z+p*Z+d*G+u*ie,s[2]=m*S+f*N+v*ee+g*$,s[6]=m*P+f*j+v*se+g*he,s[10]=m*O+f*U+v*W+g*ae,s[14]=m*z+f*Z+v*G+g*ie,s[3]=_*S+y*N+b*ee+T*$,s[7]=_*P+y*j+b*se+T*he,s[11]=_*O+y*U+b*W+T*ae,s[15]=_*z+y*Z+b*G+T*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],p=e[6],d=e[10],u=e[14],m=e[3],f=e[7],v=e[11],g=e[15],_=c*u-l*d,y=o*u-l*p,b=o*d-c*p,T=a*u-l*h,S=a*d-c*h,P=a*p-o*h;return t*(f*_-v*y+g*b)-n*(m*_-v*T+g*S)+r*(m*y-f*T+g*P)-s*(m*b-f*S+v*P)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(s*h-o*c)+r*(s*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=e[9],d=e[10],u=e[11],m=e[12],f=e[13],v=e[14],g=e[15],_=t*o-n*a,y=t*c-r*a,b=t*l-s*a,T=n*c-r*o,S=n*l-s*o,P=r*l-s*c,O=h*f-p*m,z=h*v-d*m,N=h*g-u*m,j=p*v-d*f,U=p*g-u*f,Z=d*g-u*v,ee=_*Z-y*U+b*j+T*N-S*z+P*O;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let se=1/ee;return e[0]=(o*Z-c*U+l*j)*se,e[1]=(r*U-n*Z-s*j)*se,e[2]=(f*P-v*S+g*T)*se,e[3]=(d*S-p*P-u*T)*se,e[4]=(c*N-a*Z-l*z)*se,e[5]=(t*Z-r*N+s*z)*se,e[6]=(v*b-m*P-g*y)*se,e[7]=(h*P-d*b+u*y)*se,e[8]=(a*U-o*N+l*O)*se,e[9]=(n*N-t*U-s*O)*se,e[10]=(m*S-f*b+g*_)*se,e[11]=(p*b-h*S-u*_)*se,e[12]=(o*z-a*j-c*O)*se,e[13]=(t*j-n*z+r*O)*se,e[14]=(f*y-m*T-v*_)*se,e[15]=(h*T-p*y+d*_)*se,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+n,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,p=o+o,d=s*l,u=s*h,m=s*p,f=a*h,v=a*p,g=o*p,_=c*l,y=c*h,b=c*p,T=n.x,S=n.y,P=n.z;return r[0]=(1-(f+g))*T,r[1]=(u+b)*T,r[2]=(m-y)*T,r[3]=0,r[4]=(u-b)*S,r[5]=(1-(d+g))*S,r[6]=(v+_)*S,r[7]=0,r[8]=(m+y)*P,r[9]=(v-_)*P,r[10]=(1-(d+f))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=xr.set(r[0],r[1],r[2]).length(),o=xr.set(r[4],r[5],r[6]).length(),c=xr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Hn.copy(this);let l=1/a,h=1/o,p=1/c;return Hn.elements[0]*=l,Hn.elements[1]*=l,Hn.elements[2]*=l,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=p,Hn.elements[9]*=p,Hn.elements[10]*=p,t.setFromRotationMatrix(Hn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),p=2*s/(n-r),d=(t+e)/(t-e),u=(n+r)/(n-r),m,f;if(c)m=s/(a-s),f=a*s/(a-s);else if(o===2e3)m=-(a+s)/(a-s),f=-2*a*s/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),f=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=p,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),p=2/(n-r),d=-(t+e)/(t-e),u=-(n+r)/(n-r),m,f;if(c)m=1/(a-s),f=a/(a-s);else if(o===2e3)m=-2/(a-s),f=-(a+s)/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),f=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=p,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};xo.prototype.isMatrix4=!0;var rt=xo,xr=new C,Hn=new rt,zf=new C(0,0,0),Vf=new C(1,1,1),Ni=new C,Zs=new C,Pn=new C,cu=new rt,hu=new Vn,Vi=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],p=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,u),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ht(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:We("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hu.setFromEuler(this),this.setFromQuaternion(hu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vi.DEFAULT_ORDER="XYZ";var ds=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},kf=0,uu=new C,yr=new Vn,_i=new rt,Js=new C,ns=new C,Gf=new C,Hf=new Vn,du=new C(1,0,0),pu=new C(0,1,0),fu=new C(0,0,1),mu={type:"added"},Wf={type:"removed"},Sr={type:"childadded",child:null},ml={type:"childremoved",child:null},vn=class i extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=Hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new Vi,n=new Vn,r=new C(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new Je}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ds,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yr.setFromAxisAngle(e,t),this.quaternion.multiply(yr),this}rotateOnWorldAxis(e,t){return yr.setFromAxisAngle(e,t),this.quaternion.premultiply(yr),this}rotateX(e){return this.rotateOnAxis(du,e)}rotateY(e){return this.rotateOnAxis(pu,e)}rotateZ(e){return this.rotateOnAxis(fu,e)}translateOnAxis(e,t){return uu.copy(e).applyQuaternion(this.quaternion),this.position.add(uu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(du,e)}translateY(e){return this.translateOnAxis(pu,e)}translateZ(e){return this.translateOnAxis(fu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Js.copy(e):Js.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(ns,Js,this.up):_i.lookAt(Js,ns,this.up),this.quaternion.setFromRotationMatrix(_i),r&&(_i.extractRotation(r.matrixWorld),yr.setFromRotationMatrix(_i),this.quaternion.premultiply(yr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mu),Sr.child=e,this.dispatchEvent(Sr),Sr.child=null):qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wf),ml.child=e,this.dispatchEvent(ml),ml.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mu),Sr.child=e,this.dispatchEvent(Sr),Sr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,e,Gf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,Hf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let p=c[l];s(e.shapes,p)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),p=a(e.shapes),d=a(e.skeletons),u=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};vn.DEFAULT_UP=new C(0,1,0),vn.DEFAULT_MATRIX_AUTO_UPDATE=!0,vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bi=class extends vn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xf={type:"move"},Lr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let f of e.hand.values()){let v=t.getJointPose(f,n),g=this._getHandJoint(l,f);v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=v.radius),g.visible=v!==null}let h=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],d=h.position.distanceTo(p.position),u=.02,m=.005;l.inputState.pinching&&d>u+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=u-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Xf)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new bi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},Ks={h:0,s:0,l:0};function gl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var st=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,pt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=pt.workingColorSpace){if(e=Uf(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=gl(a,s,e+1/3),this.g=gl(a,s,e),this.b=gl(a,s,e-1/3)}return pt.colorSpaceToWorking(this,r),this}setStyle(e,t="srgb"){function n(s){s!==void 0&&parseFloat(s)<1&&We("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:We("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);We("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=Id[e.toLowerCase()];return n!==void 0?this.setHex(n,t):We("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=Cr(e.r),this.g=Cr(e.g),this.b=Cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return pt.workingToColorSpace(rn.copy(this),e),65536*Math.round(ht(255*rn.r,0,255))+256*Math.round(ht(255*rn.g,0,255))+Math.round(ht(255*rn.b,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.workingToColorSpace(rn.copy(this),t);let n=rn.r,r=rn.g,s=rn.b,a=Math.max(n,r,s),o=Math.min(n,r,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let p=a-o;switch(l=h<=.5?p/(a+o):p/(2-a-o),a){case n:c=(r-s)/p+(r<s?6:0);break;case r:c=(s-n)/p+2;break;case s:c=(n-r)/p+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=pt.workingColorSpace){return pt.workingToColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e="srgb"){pt.workingToColorSpace(rn.copy(this),e);let t=rn.r,n=rn.g,r=rn.b;return e!=="srgb"?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(Di),this.setHSL(Di.h+e,Di.s+t,Di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Di),e.getHSL(Ks);let n=hl(Di.h,Ks.h,t),r=hl(Di.s,Ks.s,t),s=hl(Di.l,Ks.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new st;st.NAMES=Id;var ps=class extends vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vi,this.environmentIntensity=1,this.environmentRotation=new Vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Wn=new C,vi=new C,_l=new C,xi=new C,Mr=new C,br=new C,gu=new C,vl=new C,xl=new C,yl=new C,Sl=new Pt,Ml=new Pt,bl=new Pt,Mi=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Wn.subVectors(e,t),r.cross(Wn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Wn.subVectors(r,t),vi.subVectors(n,t),_l.subVectors(e,t);let a=Wn.dot(Wn),o=Wn.dot(vi),c=Wn.dot(_l),l=vi.dot(vi),h=vi.dot(_l),p=a*l-o*o;if(p===0)return s.set(0,0,0),null;let d=1/p,u=(l*c-o*h)*d,m=(a*h-o*c)*d;return s.set(1-u-m,m,u)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,xi)!==null&&xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,xi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,xi.x),c.addScaledVector(a,xi.y),c.addScaledVector(o,xi.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return Sl.setScalar(0),Ml.setScalar(0),bl.setScalar(0),Sl.fromBufferAttribute(e,t),Ml.fromBufferAttribute(e,n),bl.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Sl,s.x),a.addScaledVector(Ml,s.y),a.addScaledVector(bl,s.z),a}static isFrontFacing(e,t,n,r){return Wn.subVectors(n,t),vi.subVectors(e,t),Wn.cross(vi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),.5*Wn.cross(vi).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;Mr.subVectors(r,n),br.subVectors(s,n),vl.subVectors(e,n);let c=Mr.dot(vl),l=br.dot(vl);if(c<=0&&l<=0)return t.copy(n);xl.subVectors(e,r);let h=Mr.dot(xl),p=br.dot(xl);if(h>=0&&p<=h)return t.copy(r);let d=c*p-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Mr,a);yl.subVectors(e,s);let u=Mr.dot(yl),m=br.dot(yl);if(m>=0&&u<=m)return t.copy(s);let f=u*l-c*m;if(f<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(br,o);let v=h*m-u*p;if(v<=0&&p-h>=0&&u-m>=0)return gu.subVectors(s,r),o=(p-h)/(p-h+(u-m)),t.copy(r).addScaledVector(gu,o);let g=1/(v+f+d);return a=f*g,o=d*g,t.copy(n).addScaledVector(Mr,a).addScaledVector(br,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},qn=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Xn):Xn.fromBufferAttribute(s,a),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qs.copy(n.boundingBox)),Qs.applyMatrix4(e.matrixWorld),this.union(Qs)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(is),ea.subVectors(this.max,is),Tr.subVectors(e.a,is),Er.subVectors(e.b,is),wr.subVectors(e.c,is),Ui.subVectors(Er,Tr),Oi.subVectors(wr,Er),$i.subVectors(Tr,wr);let t=[0,-Ui.z,Ui.y,0,-Oi.z,Oi.y,0,-$i.z,$i.y,Ui.z,0,-Ui.x,Oi.z,0,-Oi.x,$i.z,0,-$i.x,-Ui.y,Ui.x,0,-Oi.y,Oi.x,0,-$i.y,$i.x,0];return!!Tl(t,Tr,Er,wr,ea)&&(t=[1,0,0,0,1,0,0,0,1],!!Tl(t,Tr,Er,wr,ea)&&(ta.crossVectors(Ui,Oi),t=[ta.x,ta.y,ta.z],Tl(t,Tr,Er,wr,ea)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Xn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},yi=[new C,new C,new C,new C,new C,new C,new C,new C],Xn=new C,Qs=new qn,Tr=new C,Er=new C,wr=new C,Ui=new C,Oi=new C,$i=new C,is=new C,ea=new C,ta=new C,Zi=new C;function Tl(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Zi.fromArray(i,s);let o=r.x*Math.abs(Zi.x)+r.y*Math.abs(Zi.y)+r.z*Math.abs(Zi.z),c=e.dot(Zi),l=t.dot(Zi),h=n.dot(Zi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var ey=jf();function jf(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,r[c]=24,r[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,r[c]=-l-1,r[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,r[c]=13,r[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,r[c]=24,r[256|c]=24):(n[c]=31744,n[256|c]=64512,r[c]=13,r[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var Gt=new C,na=new xe,qf=0,Dt=class extends si{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)na.fromBufferAttribute(this,t),na.applyMatrix3(e),this.setXY(t,na.x,na.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ts(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ts(t,this.array)),t}setX(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ts(t,this.array)),t}setY(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ts(t,this.array)),t}setZ(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ts(t,this.array)),t}setW(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=gn(t,this.array),n=gn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=gn(t,this.array),n=gn(n,this.array),r=gn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=gn(t,this.array),n=gn(n,this.array),r=gn(r,this.array),s=gn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var fs=class extends Dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ms=class extends Dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ve=class extends Dt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Yf=new qn,rs=new C,El=new C,Yn=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Yf.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rs.subVectors(e,this.center);let t=rs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(rs,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(El.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rs.copy(e.center).add(El)),this.expandByPoint(rs.copy(e.center).sub(El))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},$f=0,zn=new rt,wl=new vn,Ar=new C,Ln=new qn,ss=new qn,Zt=new C,vt=class i extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=Hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nf(e)?ms:fs)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Je().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return zn.makeRotationFromQuaternion(e),this.applyMatrix4(zn),this}rotateX(e){return zn.makeRotationX(e),this.applyMatrix4(zn),this}rotateY(e){return zn.makeRotationY(e),this.applyMatrix4(zn),this}rotateZ(e){return zn.makeRotationZ(e),this.applyMatrix4(zn),this}translate(e,t,n){return zn.makeTranslation(e,t,n),this.applyMatrix4(zn),this}scale(e,t,n){return zn.makeScale(e,t,n),this.applyMatrix4(zn),this}lookAt(e){return wl.lookAt(e),wl.updateMatrix(),this.applyMatrix4(wl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ar).negate(),this.translate(Ar.x,Ar.y,Ar.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ve(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&We("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Ln.setFromBufferAttribute(s),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new C,1/0);if(e){let n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];ss.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(Ln.min,ss.min),Ln.expandByPoint(Zt),Zt.addVectors(Ln.max,ss.max),Ln.expandByPoint(Zt)):(Ln.expandByPoint(ss.min),Ln.expandByPoint(ss.max))}Ln.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Zt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Zt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Zt.fromBufferAttribute(o,l),c&&(Ar.fromBufferAttribute(e,l),Zt.add(Ar)),r=Math.max(r,n.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");a!==void 0&&a.count===n.count||(a=new Dt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let O=0;O<n.count;O++)o[O]=new C,c[O]=new C;let l=new C,h=new C,p=new C,d=new xe,u=new xe,m=new xe,f=new C,v=new C;function g(O,z,N){l.fromBufferAttribute(n,O),h.fromBufferAttribute(n,z),p.fromBufferAttribute(n,N),d.fromBufferAttribute(s,O),u.fromBufferAttribute(s,z),m.fromBufferAttribute(s,N),h.sub(l),p.sub(l),u.sub(d),m.sub(d);let j=1/(u.x*m.y-m.x*u.y);isFinite(j)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-u.y).multiplyScalar(j),v.copy(p).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(j),o[O].add(f),o[z].add(f),o[N].add(f),c[O].add(v),c[z].add(v),c[N].add(v))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let O=0,z=_.length;O<z;++O){let N=_[O],j=N.start;for(let U=j,Z=j+N.count;U<Z;U+=3)g(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let y=new C,b=new C,T=new C,S=new C;function P(O){T.fromBufferAttribute(r,O),S.copy(T);let z=o[O];y.copy(z),y.sub(T.multiplyScalar(T.dot(z))).normalize(),b.crossVectors(S,z);let N=b.dot(c[O])<0?-1:1;a.setXYZW(O,y.x,y.y,y.z,N)}for(let O=0,z=_.length;O<z;++O){let N=_[O],j=N.start;for(let U=j,Z=j+N.count;U<Z;U+=3)P(e.getX(U+0)),P(e.getX(U+1)),P(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Dt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let r=new C,s=new C,a=new C,o=new C,c=new C,l=new C,h=new C,p=new C;if(e)for(let d=0,u=e.count;d<u;d+=3){let m=e.getX(d+0),f=e.getX(d+1),v=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,f),a.fromBufferAttribute(t,v),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,f),l.fromBufferAttribute(n,v),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(v,l.x,l.y,l.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,p=o.normalized,d=new l.constructor(c.length*h),u=0,m=0;for(let f=0,v=c.length;f<v;f++){u=o.isInterleavedBufferAttribute?c[f]*o.data.stride+o.offset:c[f]*h;for(let g=0;g<h;g++)d[m++]=l[u++]}return new Dt(d,h,p)}if(this.index===null)return We("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let c=e(r[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,p=l.length;h<p;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let p=0,d=l.length;p<d;p++){let u=l[p];h.push(u.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let l in r){let h=r[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],p=s[l];for(let d=0,u=p.length;d<u;d++)h.push(p[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var ty=new C;var Al=new C,Zf=new C,Jf=new Je,jn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Al.subVectors(n,t).cross(Zf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Al),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Jf.getNormalMatrix(e),r=this.coplanarPoint(Al).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}};var Kf=0,Ei=class extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Hr(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){We(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:We(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new st().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new jn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new xe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new xe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ny=new C,iy=new C,ry=new C,sy=new xe,ay=new xe,oy=new rt,ly=new C,cy=new C,hy=new C,uy=new xe,dy=new xe,py=new xe;var fy=new C,my=new C;var Si=new C,Rl=new C,ia=new C,ra=new C,er=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Si.copy(this.origin).addScaledVector(this.direction,t),Si.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Rl.copy(e).add(t).multiplyScalar(.5),ia.copy(t).sub(e).normalize(),ra.copy(this.origin).sub(Rl);let s=.5*e.distanceTo(t),a=-this.direction.dot(ia),o=ra.dot(this.direction),c=-ra.dot(ia),l=ra.lengthSq(),h=Math.abs(1-a*a),p,d,u,m;if(h>0)if(p=a*c-o,d=a*o-c,m=s*h,p>=0)if(d>=-m)if(d<=m){let f=1/h;p*=f,d*=f,u=p*(p+a*d+2*o)+d*(a*p+d+2*c)+l}else d=s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;else d=-s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;else d<=-m?(p=Math.max(0,-(-a*s+o)),d=p>0?-s:Math.min(Math.max(-s,-c),s),u=-p*p+d*(d+2*c)+l):d<=m?(p=0,d=Math.min(Math.max(-s,-c),s),u=d*(d+2*c)+l):(p=Math.max(0,-(a*s+o)),d=p>0?s:Math.min(Math.max(-s,-c),s),u=-p*p+d*(d+2*c)+l);else d=a>0?-s:s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Rl).addScaledVector(ia,d),u}intersectSphere(e,t){if(e.radius<0)return null;Si.subVectors(e.center,this.origin);let n=Si.dot(this.direction),r=Si.dot(Si)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-d.z)*p,c=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,c=(e.min.z-d.z)*p),n>c||o>r?null:((o>n||n!=n)&&(n=o),(c<r||r!=r)&&(r=c),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,Si)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,p=e.x-a.x,d=e.y-a.y,u=e.z-a.z,m=t.x-a.x,f=t.y-a.y,v=t.z-a.z,g=n.x-a.x,_=n.y-a.y,y=n.z-a.z,b=Math.abs(c),T=Math.abs(l),S=Math.abs(h),P,O,z,N,j,U,Z,ee,se,W,G,$;if(b>=T&&b>=S?(z=c,U=p,se=m,$=g,c>=0?(P=l,O=h,N=d,j=u,Z=f,ee=v,W=_,G=y):(P=h,O=l,N=u,j=d,Z=v,ee=f,W=y,G=_)):T>=S?(z=l,U=d,se=f,$=_,l>=0?(P=h,O=c,N=u,j=p,Z=v,ee=m,W=y,G=g):(P=c,O=h,N=p,j=u,Z=m,ee=v,W=g,G=y)):(z=h,U=u,se=v,$=y,h>=0?(P=c,O=l,N=p,j=d,Z=m,ee=f,W=g,G=_):(P=l,O=c,N=d,j=p,Z=f,ee=m,W=_,G=g)),z===0)return null;let he=P/z,ae=O/z,ie=N-he*U,be=j-ae*U,me=Z-he*se,oe=ee-ae*se,re=W-he*$,_e=G-ae*$,Se=re*oe-_e*me,Te=ie*_e-be*re,A=me*be-oe*ie;if(r){if(Se<0||Te<0||A<0)return null}else if((Se<0||Te<0||A<0)&&(Se>0||Te>0||A>0))return null;let w=Se+Te+A;if(w===0)return null;let I=1/z*(Se*U+Te*se+A*$);return(w>0?I<0:I>0)?null:this.at(I/w,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},gs=class extends Ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vi,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},_u=new rt,Ji=new er,sa=new Yn,vu=new C,aa=new C,oa=new C,la=new C,Cl=new C,ca=new C,xu=new C,ha=new C,yn=class extends vn{constructor(e=new vt,t=new gs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){ca.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],p=s[c];h!==0&&(Cl.fromBufferAttribute(p,e),a?ca.addScaledVector(Cl,h):ca.addScaledVector(Cl.sub(t),h))}t.add(ca)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),sa.copy(n.boundingSphere),sa.applyMatrix4(s),Ji.copy(e.ray).recast(e.near),sa.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(sa,vu)===null||Ji.origin.distanceToSquared(vu)>(e.far-e.near)**2))return;_u.copy(s).invert(),Ji.copy(e.ray).applyMatrix4(_u),n.boundingBox!==null&&Ji.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Ji)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),y=Math.min(o.count,Math.min(v.start+v.count,u.start+u.count));_<y;_+=3)r=ua(this,g,e,n,l,h,p,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(o.count,u.start+u.count);m<f;m+=3)r=ua(this,a,e,n,l,h,p,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(c!==void 0)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),y=Math.min(c.count,Math.min(v.start+v.count,u.start+u.count));_<y;_+=3)r=ua(this,g,e,n,l,h,p,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(c.count,u.start+u.count);m<f;m+=3)r=ua(this,a,e,n,l,h,p,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};function Qf(i,e,t,n,r,s,a,o){let c;if(c=e.side===1?n.intersectTriangle(a,s,r,!0,o):n.intersectTriangle(r,s,a,e.side===0,o),c===null)return null;ha.copy(o),ha.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(ha);return l<t.near||l>t.far?null:{distance:l,point:ha.clone(),object:i}}function ua(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,aa),i.getVertexPosition(c,oa),i.getVertexPosition(l,la);let h=Qf(i,e,t,n,aa,oa,la,xu);if(h){let p=new C;Mi.getBarycoord(xu,aa,oa,la,p),r&&(h.uv=Mi.getInterpolatedAttribute(r,o,c,l,p,new xe)),s&&(h.uv1=Mi.getInterpolatedAttribute(s,o,c,l,p,new xe)),a&&(h.normal=Mi.getInterpolatedAttribute(a,o,c,l,p,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new C,materialIndex:0};Mi.getNormal(aa,oa,la,d.normal),h.face=d,h.barycoord=p}return h}var gy=new Pt,_y=new Pt,vy=new Pt,xy=new Pt,yy=new rt,Sy=new C,My=new Yn,by=new rt,Ty=new er;var Nr=class extends _n{constructor(e=null,t=1,n=1,r,s,a,o,c,l=1003,h=1003,p,d){super(null,a,o,c,l,h,r,s,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ey=new rt,wy=new rt;var Ay=new rt,Ry=new rt;var Cy=new qn,Iy=new rt,Py=new yn,Ly=new Yn;var Ki=new Yn,em=new xe(.5,.5),da=new C,ki=class{constructor(e=new jn,t=new jn,n=new jn,r=new jn,s=new jn,a=new jn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],p=s[5],d=s[6],u=s[7],m=s[8],f=s[9],v=s[10],g=s[11],_=s[12],y=s[13],b=s[14],T=s[15];if(r[0].setComponents(l-a,u-h,g-m,T-_).normalize(),r[1].setComponents(l+a,u+h,g+m,T+_).normalize(),r[2].setComponents(l+o,u+p,g+f,T+y).normalize(),r[3].setComponents(l-o,u-p,g-f,T-y).normalize(),n)r[4].setComponents(c,d,v,b).normalize(),r[5].setComponents(l-c,u-d,g-v,T-b).normalize();else if(r[4].setComponents(l-c,u-d,g-v,T-b).normalize(),t===2e3)r[5].setComponents(l+c,u+d,g+v,T+b).normalize();else{if(t!==2001)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(c,d,v,b).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(e){Ki.center.set(0,0,0);let t=em.distanceTo(e.center);return Ki.radius=.7071067811865476+t,Ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(da.x=r.normal.x>0?e.max.x:e.min.x,da.y=r.normal.y>0?e.max.y:e.min.y,da.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(da)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},yu=new rt,Ca=class i{constructor(){this.coordinateSystem=2e3,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];yu.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new ki),n[r].setFromProjectionMatrix(yu,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new ki),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Ol=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},Ny=new rt,Dy=new st(1,1,1),Uy=new ki,Oy=new Ca,Fy=new qn,By=new Yn,zy=new C,Vy=new C,ky=new C,Gy=new Ol,Hy=new yn;var tr=class extends Ei{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ia=new C,Pa=new C,Su=new rt,as=new er,pa=new Yn,Il=new C,Mu=new C,wi=class extends vn{constructor(e=new vt,t=new tr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Ia.fromBufferAttribute(t,r-1),Pa.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Ia.distanceTo(Pa);e.setAttribute("lineDistance",new Ve(n,1))}else We("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(r),pa.radius+=s,e.ray.intersectsSphere(pa)===!1)return;Su.copy(r).invert(),as.copy(e.ray).applyMatrix4(Su);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),u=Math.min(h.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=l){let v=h.getX(m),g=h.getX(m+1),_=fa(this,e,as,c,v,g,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(u-1),f=h.getX(d),v=fa(this,e,as,c,m,f,u-1);v&&t.push(v)}}else{let d=Math.max(0,a.start),u=Math.min(p.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=l){let v=fa(this,e,as,c,m,m+1,m);v&&t.push(v)}if(this.isLineLoop){let m=fa(this,e,as,c,u-1,d,u-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function fa(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(Ia.fromBufferAttribute(o,r),Pa.fromBufferAttribute(o,s),t.distanceSqToSegment(Ia,Pa,Il,Mu)>n)return;Il.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Il);return c<e.near||c>e.far?void 0:{distance:c,point:Mu.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var bu=new C,Tu=new C,nr=class extends wi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)bu.fromBufferAttribute(t,r),Tu.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+bu.distanceTo(Tu);e.setAttribute("lineDistance",new Ve(n,1))}else We("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var La=class extends Ei{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Eu=new rt,Fl=new er,ma=new Yn,ga=new C,ir=class extends vn{constructor(e=new vt,t=new La){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(r),ma.radius+=s,e.ray.intersectsSphere(ma)===!1)return;Eu.copy(r).invert(),Fl.copy(e.ray).applyMatrix4(Eu);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null)for(let p=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);p<d;p++){let u=l.getX(p);ga.fromBufferAttribute(h,u),wu(ga,u,c,r,e,t,this)}else for(let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);p<d;p++)ga.fromBufferAttribute(h,p),wu(ga,p,c,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function wu(i,e,t,n,r,s,a){let o=Fl.distanceSqToPoint(i);if(o<t){let c=new C;Fl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var _s=class extends _n{constructor(e=[],t=301,n,r,s,a,o,c,l,h){super(e,t,n,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Gi=class extends _n{constructor(e,t,n=1014,r,s,a,o=1003,c=1003,l,h=1026,p=1){if(h!==1026&&h!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:p},r,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Na=class extends Gi{constructor(e,t=1014,n=301,r,s,a=1003,o=1003,c,l=1026){let h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},vs=class extends _n{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},rr=class i extends vt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],p=[],d=0,u=0;function m(f,v,g,_,y,b,T,S,P,O,z){let N=b/P,j=T/O,U=b/2,Z=T/2,ee=S/2,se=P+1,W=O+1,G=0,$=0,he=new C;for(let ae=0;ae<W;ae++){let ie=ae*j-Z;for(let be=0;be<se;be++){let me=be*N-U;he[f]=me*_,he[v]=ie*y,he[g]=ee,l.push(he.x,he.y,he.z),he[f]=0,he[v]=0,he[g]=S>0?1:-1,h.push(he.x,he.y,he.z),p.push(be/P),p.push(1-ae/O),G+=1}}for(let ae=0;ae<O;ae++)for(let ie=0;ie<P;ie++){let be=d+ie+se*ae,me=d+ie+se*(ae+1),oe=d+(ie+1)+se*(ae+1),re=d+(ie+1)+se*ae;c.push(be,me,re),c.push(me,oe,re),$+=6}o.addGroup(u,$,z),u+=$,d+=G}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(h,3)),this.setAttribute("uv",new Ve(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Da=class i extends vt{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,p=Math.PI/2*e,d=t,u=2*p+d,m=2*n+s,f=r+1,v=new C,g=new C;for(let _=0;_<=m;_++){let y=0,b=0,T=0,S=0;if(_<=n){let z=_/n,N=z*Math.PI/2;b=-h-e*Math.cos(N),T=e*Math.sin(N),S=-e*Math.cos(N),y=z*p}else if(_<=n+s){let z=(_-n)/s;b=z*t-h,T=e,S=0,y=p+z*d}else{let z=(_-n-s)/n,N=z*Math.PI/2;b=h+e*Math.sin(N),T=e*Math.cos(N),S=e*Math.sin(N),y=p+d+z*p}let P=Math.max(0,Math.min(1,y/u)),O=0;_===0?O=.5/r:_===m&&(O=-.5/r);for(let z=0;z<=r;z++){let N=z/r,j=N*Math.PI*2,U=Math.sin(j),Z=Math.cos(j);g.x=-T*Z,g.y=b,g.z=T*U,o.push(g.x,g.y,g.z),v.set(-T*Z,S,T*U),v.normalize(),c.push(v.x,v.y,v.z),l.push(N+O,P)}if(_>0){let z=(_-1)*f;for(let N=0;N<r;N++){let j=z+N,U=z+N+1,Z=_*f+N,ee=_*f+N+1;a.push(j,U,Z),a.push(U,ee,Z)}}}this.setIndex(a),this.setAttribute("position",new Ve(o,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Ua=class i extends vt{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new C,h=new xe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let p=0,d=3;p<=t;p++,d+=3){let u=n+p/t*r;l.x=e*Math.cos(u),l.y=e*Math.sin(u),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let p=1;p<=t;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new Ve(a,3)),this.setAttribute("normal",new Ve(o,3)),this.setAttribute("uv",new Ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},xs=class i extends vt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let h=[],p=[],d=[],u=[],m=0,f=[],v=n/2,g=0;function _(y){let b=m,T=new xe,S=new C,P=0,O=y===!0?e:t,z=y===!0?1:-1;for(let j=1;j<=r;j++)p.push(0,v*z,0),d.push(0,z,0),u.push(.5,.5),m++;let N=m;for(let j=0;j<=r;j++){let U=j/r*c+o,Z=Math.cos(U),ee=Math.sin(U);S.x=O*ee,S.y=v*z,S.z=O*Z,p.push(S.x,S.y,S.z),d.push(0,z,0),T.x=.5*Z+.5,T.y=.5*ee*z+.5,u.push(T.x,T.y),m++}for(let j=0;j<r;j++){let U=b+j,Z=N+j;y===!0?h.push(Z,Z+1,U):h.push(Z+1,Z,U),P+=3}l.addGroup(g,P,y===!0?1:2),g+=P}(function(){let y=new C,b=new C,T=0,S=(t-e)/n;for(let P=0;P<=s;P++){let O=[],z=P/s,N=z*(t-e)+e;for(let j=0;j<=r;j++){let U=j/r,Z=U*c+o,ee=Math.sin(Z),se=Math.cos(Z);b.x=N*ee,b.y=-z*n+v,b.z=N*se,p.push(b.x,b.y,b.z),y.set(ee,S,se).normalize(),d.push(y.x,y.y,y.z),u.push(U,1-z),O.push(m++)}f.push(O)}for(let P=0;P<r;P++)for(let O=0;O<s;O++){let z=f[O][P],N=f[O+1][P],j=f[O+1][P+1],U=f[O][P+1];(e>0||O!==0)&&(h.push(z,N,U),T+=3),(t>0||O!==s-1)&&(h.push(N,j,U),T+=3)}l.addGroup(g,T,0),g+=T})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ve(p,3)),this.setAttribute("normal",new Ve(d,3)),this.setAttribute("uv",new Ve(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Oa=class i extends xs{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Hi=class i extends vt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(u,m,f,v){let g=v+1,_=[];for(let y=0;y<=g;y++){_[y]=[];let b=u.clone().lerp(f,y/g),T=m.clone().lerp(f,y/g),S=g-y;for(let P=0;P<=S;P++)_[y][P]=P===0&&y===g?b:b.clone().lerp(T,P/S)}for(let y=0;y<g;y++)for(let b=0;b<2*(g-y)-1;b++){let T=Math.floor(b/2);b%2==0?(c(_[y][T+1]),c(_[y+1][T]),c(_[y][T])):(c(_[y][T+1]),c(_[y+1][T+1]),c(_[y+1][T]))}}function c(u){s.push(u.x,u.y,u.z)}function l(u,m){let f=3*u;m.x=e[f+0],m.y=e[f+1],m.z=e[f+2]}function h(u,m,f,v){v<0&&u.x===1&&(a[m]=u.x-1),f.x===0&&f.z===0&&(a[m]=v/2/Math.PI+.5)}function p(u){return Math.atan2(u.z,-u.x)}function d(u){return Math.atan2(-u.y,Math.sqrt(u.x*u.x+u.z*u.z))}(function(u){let m=new C,f=new C,v=new C;for(let g=0;g<t.length;g+=3)l(t[g+0],m),l(t[g+1],f),l(t[g+2],v),o(m,f,v,u)})(r),(function(u){let m=new C;for(let f=0;f<s.length;f+=3)m.x=s[f+0],m.y=s[f+1],m.z=s[f+2],m.normalize().multiplyScalar(u),s[f+0]=m.x,s[f+1]=m.y,s[f+2]=m.z})(n),(function(){let u=new C;for(let m=0;m<s.length;m+=3){u.x=s[m+0],u.y=s[m+1],u.z=s[m+2];let f=p(u)/2/Math.PI+.5,v=d(u)/Math.PI+.5;a.push(f,1-v)}(function(){let m=new C,f=new C,v=new C,g=new C,_=new xe,y=new xe,b=new xe;for(let T=0,S=0;T<s.length;T+=9,S+=6){m.set(s[T+0],s[T+1],s[T+2]),f.set(s[T+3],s[T+4],s[T+5]),v.set(s[T+6],s[T+7],s[T+8]),_.set(a[S+0],a[S+1]),y.set(a[S+2],a[S+3]),b.set(a[S+4],a[S+5]),g.copy(m).add(f).add(v).divideScalar(3);let P=p(g);h(_,S+0,m,P),h(y,S+2,f,P),h(b,S+4,v,P)}})(),(function(){for(let m=0;m<a.length;m+=6){let f=a[m+0],v=a[m+2],g=a[m+4],_=Math.max(f,v,g),y=Math.min(f,v,g);_>.9&&y<.1&&(f<.2&&(a[m+0]+=1),v<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new Ve(s,3)),this.setAttribute("normal",new Ve(s.slice(),3)),this.setAttribute("uv",new Ve(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},Fa=class i extends Hi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},_a=new C,va=new C,Pl=new C,xa=new Mi,Ba=class extends vt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(Ta*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],p=new Array(3),d={},u=[];for(let m=0;m<c;m+=3){a?(l[0]=a.getX(m),l[1]=a.getX(m+1),l[2]=a.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);let{a:f,b:v,c:g}=xa;if(f.fromBufferAttribute(o,l[0]),v.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),xa.getNormal(Pl),p[0]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,p[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,p[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,p[0]!==p[1]&&p[1]!==p[2]&&p[2]!==p[0])for(let _=0;_<3;_++){let y=(_+1)%3,b=p[_],T=p[y],S=xa[h[_]],P=xa[h[y]],O=`${b}_${T}`,z=`${T}_${b}`;z in d&&d[z]?(Pl.dot(d[z].normal)<=s&&(u.push(S.x,S.y,S.z),u.push(P.x,P.y,P.z)),d[z]=null):O in d||(d[O]={index0:l[_],index1:l[y],normal:Pl.clone()})}}for(let m in d)if(d[m]){let{index0:f,index1:v}=d[m];_a.fromBufferAttribute(o,f),va.fromBufferAttribute(o,v),u.push(_a.x,_a.y,_a.z),u.push(va.x,va.y,va.z)}this.setAttribute("position",new Ve(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){We("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(r=Math.floor(c+(l-c)/2),o=n[r]-a,o<0)c=r+1;else{if(!(o>0)){l=r;break}l=r-1}if(r=l,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),c=t||(a.isVector2?new xe:new C);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,r=[],s=[],a=[],o=new C,c=new rt;for(let u=0;u<=e;u++){let m=u/e;r[u]=this.getTangentAt(m,new C)}s[0]=new C,a[0]=new C;let l=Number.MAX_VALUE,h=Math.abs(r[0].x),p=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),p<=l&&(l=p,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(ht(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(c.makeRotationAxis(o,m))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(ht(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(r[m],u*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Dr=class extends Dn{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new xe){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=c-this.aX,u=l-this.aY;c=d*h-u*p+this.aX,l=d*p+u*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},za=class extends Dr{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function $c(){let i=0,e=0,t=0,n=0;function r(s,a,o,c){i=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){r(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,p){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,u=(o-a)/h-(c-a)/(h+p)+(c-o)/p;d*=h,u*=h,r(a,o,d,u)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var Au=new C,Ru=new C,Ll=new $c,Nl=new $c,Dl=new $c,Va=class extends Dn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new C){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=r[(l-1)%s]:(Ru.subVectors(r[0],r[1]).add(r[0]),o=Ru);let p=r[l%s],d=r[(l+1)%s];if(this.closed||l+2<s?c=r[(l+2)%s]:(Au.subVectors(r[s-1],r[s-2]).add(r[s-1]),c=Au),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(p),u),f=Math.pow(p.distanceToSquared(d),u),v=Math.pow(d.distanceToSquared(c),u);f<1e-4&&(f=1),m<1e-4&&(m=f),v<1e-4&&(v=f),Ll.initNonuniformCatmullRom(o.x,p.x,d.x,c.x,m,f,v),Nl.initNonuniformCatmullRom(o.y,p.y,d.y,c.y,m,f,v),Dl.initNonuniformCatmullRom(o.z,p.z,d.z,c.z,m,f,v)}else this.curveType==="catmullrom"&&(Ll.initCatmullRom(o.x,p.x,d.x,c.x,this.tension),Nl.initCatmullRom(o.y,p.y,d.y,c.y,this.tension),Dl.initCatmullRom(o.z,p.z,d.z,c.z,this.tension));return n.set(Ll.calc(h),Nl.calc(h),Dl.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new C().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Cu(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function tm(i,e){let t=1-i;return t*t*e}function nm(i,e){return 2*(1-i)*i*e}function im(i,e){return i*i*e}function ls(i,e,t,n){return tm(i,e)+nm(i,t)+im(i,n)}function rm(i,e){let t=1-i;return t*t*t*e}function sm(i,e){let t=1-i;return 3*t*t*i*e}function am(i,e){return 3*(1-i)*i*i*e}function om(i,e){return i*i*i*e}function cs(i,e,t,n,r){return rm(i,e)+sm(i,t)+am(i,n)+om(i,r)}var ys=class extends Dn{constructor(e=new xe,t=new xe,n=new xe,r=new xe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new xe){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(cs(e,r.x,s.x,a.x,o.x),cs(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ka=class extends Dn{constructor(e=new C,t=new C,n=new C,r=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new C){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(cs(e,r.x,s.x,a.x,o.x),cs(e,r.y,s.y,a.y,o.y),cs(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ss=class extends Dn{constructor(e=new xe,t=new xe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new xe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new xe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ga=class extends Dn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ms=class extends Dn{constructor(e=new xe,t=new xe,n=new xe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new xe){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(ls(e,r.x,s.x,a.x),ls(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},bs=class extends Dn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(ls(e,r.x,s.x,a.x),ls(e,r.y,s.y,a.y),ls(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ts=class extends Dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new xe){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,c=r[a===0?a:a-1],l=r[a],h=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return n.set(Cu(o,c.x,l.x,h.x,p.x),Cu(o,c.y,l.y,h.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new xe().fromArray(r))}return this}},Ha=Object.freeze({__proto__:null,ArcCurve:za,CatmullRomCurve3:Va,CubicBezierCurve:ys,CubicBezierCurve3:ka,EllipseCurve:Dr,LineCurve:Ss,LineCurve3:Ga,QuadraticBezierCurve:Ms,QuadraticBezierCurve3:bs,SplineCurve:Ts}),Wa=class extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ha[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new Ha[r.type]().fromJSON(r))}return this}},Es=class extends Wa{constructor(e){super(),this.type="Path",this.currentPoint=new xe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ss(this.currentPoint.clone(),new xe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Ms(this.currentPoint.clone(),new xe(e,t),new xe(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new ys(this.currentPoint.clone(),new xe(e,t),new xe(n,r),new xe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ts(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,r,s,a,o,c),this}absellipse(e,t,n,r,s,a,o,c){let l=new Dr(e,t,n,r,s,a,o,c);if(this.curves.length>0){let p=l.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ws=class extends Es{constructor(e){super(e),this.uuid=Hr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Es().fromJSON(r))}return this}};function lm(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Pd(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=pm(i,e,s,t)),i.length>80*t){o=i[0],c=i[1];let h=o,p=c;for(let d=t;d<r;d+=t){let u=i[d],m=i[d+1];u<o&&(o=u),m<c&&(c=m),u>h&&(h=u),m>p&&(p=m)}l=Math.max(h-o,p-c),l=l!==0?32767/l:0}return As(s,a,t,o,c,l,0),a}function Pd(i,e,t,n,r){let s;if(r===Tm(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=Iu(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Iu(a/n|0,i[a],i[a+1],s);return s&&Ur(s,s.next)&&(Cs(s),s=s.next),s}function sr(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!Ur(n,n.next)&&Bt(n.prev,n,n.next)!==0)n=n.next;else{if(Cs(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function As(i,e,t,n,r,s,a){if(!i)return;!a&&s&&vm(i,n,r,s);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(s?hm(i,n,r,s):cm(i))e.push(c.i,i.i,l.i),Cs(i),i=l.next,o=l.next;else if((i=l)===o){a?a===1?As(i=um(sr(i),e),e,t,n,r,s,2):a===2&&dm(i,e,t,n,r,s):As(sr(i),e,t,n,r,s,1);break}}}function cm(i){let e=i.prev,t=i,n=i.next;if(Bt(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(r,s,a),p=Math.min(o,c,l),d=Math.max(r,s,a),u=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=p&&m.y<=u&&os(r,o,s,c,a,l,m.x,m.y)&&Bt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function hm(i,e,t,n){let r=i.prev,s=i,a=i.next;if(Bt(r,s,a)>=0)return!1;let o=r.x,c=s.x,l=a.x,h=r.y,p=s.y,d=a.y,u=Math.min(o,c,l),m=Math.min(h,p,d),f=Math.max(o,c,l),v=Math.max(h,p,d),g=Bl(u,m,e,t,n),_=Bl(f,v,e,t,n),y=i.prevZ,b=i.nextZ;for(;y&&y.z>=g&&b&&b.z<=_;){if(y.x>=u&&y.x<=f&&y.y>=m&&y.y<=v&&y!==r&&y!==a&&os(o,h,c,p,l,d,y.x,y.y)&&Bt(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=u&&b.x<=f&&b.y>=m&&b.y<=v&&b!==r&&b!==a&&os(o,h,c,p,l,d,b.x,b.y)&&Bt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=g;){if(y.x>=u&&y.x<=f&&y.y>=m&&y.y<=v&&y!==r&&y!==a&&os(o,h,c,p,l,d,y.x,y.y)&&Bt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=_;){if(b.x>=u&&b.x<=f&&b.y>=m&&b.y<=v&&b!==r&&b!==a&&os(o,h,c,p,l,d,b.x,b.y)&&Bt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function um(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Ur(n,r)&&Nd(n,t,t.next,r)&&Rs(n,r)&&Rs(r,n)&&(e.push(n.i,t.i,r.i),Cs(t),Cs(t.next),t=i=r),t=t.next}while(t!==i);return sr(t)}function dm(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Sm(a,o)){let c=Dd(a,o);return a=sr(a,a.next),c=sr(c,c.next),As(a,e,t,n,r,s,0),void As(c,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function pm(i,e,t,n){let r=[];for(let s=0,a=e.length;s<a;s++){let o=Pd(i,e[s]*n,s<a-1?e[s+1]*n:i.length,n,!1);o===o.next&&(o.steiner=!0),r.push(ym(o))}r.sort(fm);for(let s=0;s<r.length;s++)t=mm(r[s],t);return t}function fm(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function mm(i,e){let t=gm(i,e);if(!t)return e;let n=Dd(t,i);return sr(n,n.next),sr(t,t.next)}function gm(i,e){let t=e,n=i.x,r=i.y,s,a=-1/0;if(Ur(i,t))return t;do{if(Ur(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let p=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>a&&(a=p,s=t.x<t.next.x?t:t.next,p===n))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,c=s.x,l=s.y,h=1/0;t=s;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Ld(r<l?n:a,r,c,l,r<l?a:n,r,t.x,t.y)){let p=Math.abs(r-t.y)/(n-t.x);Rs(t,i)&&(p<h||p===h&&(t.x>s.x||t.x===s.x&&_m(s,t)))&&(s=t,h=p)}t=t.next}while(t!==o);return s}function _m(i,e){return Bt(i.prev,i,e.prev)<0&&Bt(e.next,i,i.next)<0}function vm(i,e,t,n){let r=i;do r.z===0&&(r.z=Bl(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,xm(r)}function xm(i){let e,t=1;do{let n,r=i;i=null;let s=null;for(e=0;r;){e++;let a=r,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||r.z<=a.z)?(n=r,r=r.nextZ,o--):(n=a,a=a.nextZ,c--),s?s.nextZ=n:i=n,n.prevZ=s,s=n;r=a}s.nextZ=null,t*=2}while(e>1);return i}function Bl(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function ym(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Ld(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function os(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Ld(i,e,t,n,r,s,a,o)}function Sm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Mm(i,e)&&(Rs(i,e)&&Rs(e,i)&&bm(i,e)&&(Bt(i.prev,i,e.prev)||Bt(i,e.prev,e))||Ur(i,e)&&Bt(i.prev,i,i.next)>0&&Bt(e.prev,e,e.next)>0)}function Bt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ur(i,e){return i.x===e.x&&i.y===e.y}function Nd(i,e,t,n){let r=Sa(Bt(i,e,t)),s=Sa(Bt(i,e,n)),a=Sa(Bt(t,n,i)),o=Sa(Bt(t,n,e));return r!==s&&a!==o||!(r!==0||!ya(i,t,e))||!(s!==0||!ya(i,n,e))||!(a!==0||!ya(t,i,n))||!(o!==0||!ya(t,e,n))}function ya(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Sa(i){return i>0?1:i<0?-1:0}function Mm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Nd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Rs(i,e){return Bt(i.prev,i,i.next)<0?Bt(i,e,i.next)>=0&&Bt(i,i.prev,e)>=0:Bt(i,e,i.prev)<0||Bt(i,i.next,e)<0}function bm(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Dd(i,e){let t=zl(i.i,i.x,i.y),n=zl(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Iu(i,e,t,n){let r=zl(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Cs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function zl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Tm(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var Vl=class{static triangulate(e,t,n=2){return lm(e,t,n)}},ri=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Pu(e),Lu(n,e);let a=e.length;t.forEach(Pu);for(let c=0;c<t.length;c++)r.push(a),a+=t[c].length,Lu(n,t[c]);let o=Vl.triangulate(n,r);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Pu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Lu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Xa=class i extends vt{constructor(e=new ws([new xe(.5,.5),new xe(-.5,.5),new xe(-.5,-.5),new xe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:u-.1,f=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Em,y,b,T,S,P,O=!1;if(g){y=g.getSpacedPoints(h),O=!0,d=!1;let I=!!g.isCatmullRomCurve3&&g.closed;b=g.computeFrenetFrames(h,I),T=new C,S=new C,P=new C}d||(v=0,u=0,m=0,f=0);let z=o.extractPoints(l),N=z.shape,j=z.holes;if(!ri.isClockWise(N)){N=N.reverse();for(let I=0,D=j.length;I<D;I++){let x=j[I];ri.isClockWise(x)&&(j[I]=x.reverse())}}function U(I){let D=10000000000000001e-36,x=I[0];for(let F=1;F<=I.length;F++){let L=F%I.length,R=I[L],X=R.x-x.x,Y=R.y-x.y,te=X*X+Y*Y,pe=Math.max(Math.abs(R.x),Math.abs(R.y),Math.abs(x.x),Math.abs(x.y));te<=D*pe*pe?(I.splice(L,1),F--):x=R}}U(N),j.forEach(U);let Z=j.length,ee=N;for(let I=0;I<Z;I++){let D=j[I];N=N.concat(D)}function se(I,D,x){return D||qe("ExtrudeGeometry: vec does not exist"),I.clone().addScaledVector(D,x)}let W=N.length;function G(I,D,x){let F,L,R,X=I.x-D.x,Y=I.y-D.y,te=x.x-I.x,pe=x.y-I.y,Pe=X*X+Y*Y,Ne=X*pe-Y*te;if(Math.abs(Ne)>Number.EPSILON){let ye=Math.sqrt(Pe),Le=Math.sqrt(te*te+pe*pe),de=D.x-Y/ye,ve=D.y+X/ye,ge=((x.x-pe/Le-de)*pe-(x.y+te/Le-ve)*te)/(X*pe-Y*te);F=de+X*ge-I.x,L=ve+Y*ge-I.y;let we=F*F+L*L;if(we<=2)return new xe(F,L);R=Math.sqrt(we/2)}else{let ye=!1;X>Number.EPSILON?te>Number.EPSILON&&(ye=!0):X<-Number.EPSILON?te<-Number.EPSILON&&(ye=!0):Math.sign(Y)===Math.sign(pe)&&(ye=!0),ye?(F=-Y,L=X,R=Math.sqrt(Pe)):(F=X,L=Y,R=Math.sqrt(Pe/2))}return new xe(F/R,L/R)}let $=[];for(let I=0,D=ee.length,x=D-1,F=I+1;I<D;I++,x++,F++)x===D&&(x=0),F===D&&(F=0),$[I]=G(ee[I],ee[x],ee[F]);let he=[],ae,ie,be=$.concat();for(let I=0,D=Z;I<D;I++){let x=j[I];ae=[];for(let F=0,L=x.length,R=L-1,X=F+1;F<L;F++,R++,X++)R===L&&(R=0),X===L&&(X=0),ae[F]=G(x[F],x[R],x[X]);he.push(ae),be=be.concat(ae)}if(v===0)ie=ri.triangulateShape(ee,j);else{let I=[],D=[];for(let x=0;x<v;x++){let F=x/v,L=u*Math.cos(F*Math.PI/2),R=m*Math.sin(F*Math.PI/2)+f;for(let X=0,Y=ee.length;X<Y;X++){let te=se(ee[X],$[X],R);_e(te.x,te.y,-L),F===0&&I.push(te)}for(let X=0,Y=Z;X<Y;X++){let te=j[X];ae=he[X];let pe=[];for(let Pe=0,Ne=te.length;Pe<Ne;Pe++){let ye=se(te[Pe],ae[Pe],R);_e(ye.x,ye.y,-L),F===0&&pe.push(ye)}F===0&&D.push(pe)}}ie=ri.triangulateShape(I,D)}let me=ie.length,oe=m+f;for(let I=0;I<W;I++){let D=d?se(N[I],be[I],oe):N[I];O?(S.copy(b.normals[0]).multiplyScalar(D.x),T.copy(b.binormals[0]).multiplyScalar(D.y),P.copy(y[0]).add(S).add(T),_e(P.x,P.y,P.z)):_e(D.x,D.y,0)}for(let I=1;I<=h;I++)for(let D=0;D<W;D++){let x=d?se(N[D],be[D],oe):N[D];O?(S.copy(b.normals[I]).multiplyScalar(x.x),T.copy(b.binormals[I]).multiplyScalar(x.y),P.copy(y[I]).add(S).add(T),_e(P.x,P.y,P.z)):_e(x.x,x.y,p/h*I)}for(let I=v-1;I>=0;I--){let D=I/v,x=u*Math.cos(D*Math.PI/2),F=m*Math.sin(D*Math.PI/2)+f;for(let L=0,R=ee.length;L<R;L++){let X=se(ee[L],$[L],F);_e(X.x,X.y,p+x)}for(let L=0,R=j.length;L<R;L++){let X=j[L];ae=he[L];for(let Y=0,te=X.length;Y<te;Y++){let pe=se(X[Y],ae[Y],F);O?_e(pe.x,pe.y+y[h-1].y,y[h-1].x+x):_e(pe.x,pe.y,p+x)}}}function re(I,D){let x=I.length;for(;--x>=0;){let F=x,L=x-1;L<0&&(L=I.length-1);for(let R=0,X=h+2*v;R<X;R++){let Y=W*R,te=W*(R+1);Te(D+F+Y,D+L+Y,D+L+te,D+F+te)}}}function _e(I,D,x){c.push(I),c.push(D),c.push(x)}function Se(I,D,x){A(I),A(D),A(x);let F=r.length/3,L=_.generateTopUV(n,r,F-3,F-2,F-1);w(L[0]),w(L[1]),w(L[2])}function Te(I,D,x,F){A(I),A(D),A(F),A(D),A(x),A(F);let L=r.length/3,R=_.generateSideWallUV(n,r,L-6,L-3,L-2,L-1);w(R[0]),w(R[1]),w(R[3]),w(R[1]),w(R[2]),w(R[3])}function A(I){r.push(c[3*I+0]),r.push(c[3*I+1]),r.push(c[3*I+2])}function w(I){s.push(I.x),s.push(I.y)}(function(){let I=r.length/3;if(d){let D=0,x=W*D;for(let F=0;F<me;F++){let L=ie[F];Se(L[2]+x,L[1]+x,L[0]+x)}D=h+2*v,x=W*D;for(let F=0;F<me;F++){let L=ie[F];Se(L[0]+x,L[1]+x,L[2]+x)}}else{for(let D=0;D<me;D++){let x=ie[D];Se(x[2],x[1],x[0])}for(let D=0;D<me;D++){let x=ie[D];Se(x[0]+W*h,x[1]+W*h,x[2]+W*h)}}n.addGroup(I,r.length/3-I,0)})(),(function(){let I=r.length/3,D=0;re(ee,D),D+=ee.length;for(let x=0,F=j.length;x<F;x++){let L=j[x];re(L,D),D+=L.length}n.addGroup(I,r.length/3-I,1)})()}this.setAttribute("position",new Ve(r,3)),this.setAttribute("uv",new Ve(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return wm(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Ha[r.type]().fromJSON(r)),new i(n,e.options)}},Em={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*r],h=e[3*r+1];return[new xe(s,a),new xe(o,c),new xe(l,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],p=e[3*n+2],d=e[3*r],u=e[3*r+1],m=e[3*r+2],f=e[3*s],v=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new xe(a,1-c),new xe(l,1-p),new xe(d,1-m),new xe(f,1-g)]:[new xe(o,1-c),new xe(h,1-p),new xe(u,1-m),new xe(v,1-g)]}};function wm(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var ja=class i extends Hi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},qa=class i extends vt{constructor(e=[new xe(0,-.5),new xe(.5,0),new xe(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=ht(r,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,p=new C,d=new xe,u=new C,m=new C,f=new C,v=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,f.copy(u),u.normalize(),c.push(u.x,u.y,u.z);break;case e.length-1:c.push(f.x,f.y,f.z);break;default:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,m.copy(u),u.x+=f.x,u.y+=f.y,u.z+=f.z,u.normalize(),c.push(u.x,u.y,u.z),f.copy(m)}for(let _=0;_<=t;_++){let y=n+_*h*r,b=Math.sin(y),T=Math.cos(y);for(let S=0;S<=e.length-1;S++){p.x=e[S].x*b,p.y=e[S].y,p.z=e[S].x*T,a.push(p.x,p.y,p.z),d.x=_/t,d.y=S/(e.length-1),o.push(d.x,d.y);let P=c[3*S+0]*b,O=c[3*S+1],z=c[3*S+0]*T;l.push(P,O,z)}}for(let _=0;_<t;_++)for(let y=0;y<e.length-1;y++){let b=y+_*e.length,T=b,S=b+e.length,P=b+e.length+1,O=b+1;s.push(T,S,O),s.push(P,O,S)}this.setIndex(s),this.setAttribute("position",new Ve(a,3)),this.setAttribute("uv",new Ve(o,2)),this.setAttribute("normal",new Ve(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Ya=class i extends Hi{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Or=class i extends vt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,h=c+1,p=e/o,d=t/c,u=[],m=[],f=[],v=[];for(let g=0;g<h;g++){let _=g*d-a;for(let y=0;y<l;y++){let b=y*p-s;m.push(b,-_,0),f.push(0,0,1),v.push(y/o),v.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let y=_+l*g,b=_+l*(g+1),T=_+1+l*(g+1),S=_+1+l*g;u.push(y,b,S),u.push(b,T,S)}this.setIndex(u),this.setAttribute("position",new Ve(m,3)),this.setAttribute("normal",new Ve(f,3)),this.setAttribute("uv",new Ve(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},$a=class i extends vt{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],p=e,d=(t-e)/(r=Math.max(1,r)),u=new C,m=new xe;for(let f=0;f<=r;f++){for(let v=0;v<=n;v++){let g=s+v/n*a;u.x=p*Math.cos(g),u.y=p*Math.sin(g),c.push(u.x,u.y,u.z),l.push(0,0,1),m.x=(u.x/t+1)/2,m.y=(u.y/t+1)/2,h.push(m.x,m.y)}p+=d}for(let f=0;f<r;f++){let v=f*(n+1);for(let g=0;g<n;g++){let _=g+v,y=_,b=_+n+1,T=_+n+2,S=_+1;o.push(y,b,S),o.push(b,T,S)}}this.setIndex(o),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(l,3)),this.setAttribute("uv",new Ve(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Za=class i extends vt{constructor(e=new ws([new xe(0,.5),new xe(-.5,-.5),new xe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let p=r.length/3,d=h.extractPoints(t),u=d.shape,m=d.holes;ri.isClockWise(u)===!1&&(u=u.reverse());for(let v=0,g=m.length;v<g;v++){let _=m[v];ri.isClockWise(_)===!0&&(m[v]=_.reverse())}let f=ri.triangulateShape(u,m);for(let v=0,g=m.length;v<g;v++){let _=m[v];u=u.concat(_)}for(let v=0,g=u.length;v<g;v++){let _=u[v];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let v=0,g=f.length;v<g;v++){let _=f[v],y=_[0]+p,b=_[1]+p,T=_[2]+p;n.push(y,b,T),c+=3}}this.setIndex(n),this.setAttribute("position",new Ve(r,3)),this.setAttribute("normal",new Ve(s,3)),this.setAttribute("uv",new Ve(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return Am(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function Am(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var Ja=class i extends vt{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],p=new C,d=new C,u=[],m=[],f=[],v=[];for(let g=0;g<=n;g++){let _=[],y=g/n,b=a+y*o,T=e*Math.cos(b),S=Math.sqrt(e*e-T*T),P=0;g===0&&a===0?P=.5/t:g===n&&c===Math.PI&&(P=-.5/t);for(let O=0;O<=t;O++){let z=O/t,N=r+z*s;p.x=-S*Math.cos(N),p.y=T,p.z=S*Math.sin(N),m.push(p.x,p.y,p.z),d.copy(p).normalize(),f.push(d.x,d.y,d.z),v.push(z+P,1-y),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let y=h[g][_+1],b=h[g][_],T=h[g+1][_],S=h[g+1][_+1];(g!==0||a>0)&&u.push(y,b,S),(g!==n-1||c<Math.PI)&&u.push(b,T,S)}this.setIndex(u),this.setAttribute("position",new Ve(m,3)),this.setAttribute("normal",new Ve(f,3)),this.setAttribute("uv",new Ve(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Ka=class i extends Hi{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Qa=class i extends vt{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI,a=0,o=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let c=[],l=[],h=[],p=[],d=new C,u=new C,m=new C;for(let f=0;f<=n;f++){let v=a+f/n*o;for(let g=0;g<=r;g++){let _=g/r*s;u.x=(e+t*Math.cos(v))*Math.cos(_),u.y=(e+t*Math.cos(v))*Math.sin(_),u.z=t*Math.sin(v),l.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),m.subVectors(u,d).normalize(),h.push(m.x,m.y,m.z),p.push(g/r),p.push(f/n)}}for(let f=1;f<=n;f++)for(let v=1;v<=r;v++){let g=(r+1)*f+v-1,_=(r+1)*(f-1)+v-1,y=(r+1)*(f-1)+v,b=(r+1)*f+v;c.push(g,_,b),c.push(_,y,b)}this.setIndex(c),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(h,3)),this.setAttribute("uv",new Ve(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},eo=class i extends vt{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],c=[],l=[],h=[],p=new C,d=new C,u=new C,m=new C,f=new C,v=new C,g=new C;for(let y=0;y<=n;++y){let b=y/n*s*Math.PI*2;_(b,s,a,e,u),_(b+.01,s,a,e,m),v.subVectors(m,u),g.addVectors(m,u),f.crossVectors(v,g),g.crossVectors(f,v),f.normalize(),g.normalize();for(let T=0;T<=r;++T){let S=T/r*Math.PI*2,P=-t*Math.cos(S),O=t*Math.sin(S);p.x=u.x+(P*g.x+O*f.x),p.y=u.y+(P*g.y+O*f.y),p.z=u.z+(P*g.z+O*f.z),c.push(p.x,p.y,p.z),d.subVectors(p,u).normalize(),l.push(d.x,d.y,d.z),h.push(y/n),h.push(T/r)}}for(let y=1;y<=n;y++)for(let b=1;b<=r;b++){let T=(r+1)*(y-1)+(b-1),S=(r+1)*y+(b-1),P=(r+1)*y+b,O=(r+1)*(y-1)+b;o.push(T,S,O),o.push(S,P,O)}function _(y,b,T,S,P){let O=Math.cos(y),z=Math.sin(y),N=T/b*y,j=Math.cos(N);P.x=S*(2+j)*.5*O,P.y=S*(2+j)*z*.5,P.z=S*Math.sin(N)*.5}this.setIndex(o),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(l,3)),this.setAttribute("uv",new Ve(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},to=class i extends vt{constructor(e=new bs(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new C,c=new C,l=new xe,h=new C,p=[],d=[],u=[],m=[];function f(v){h=e.getPointAt(v/t,h);let g=a.normals[v],_=a.binormals[v];for(let y=0;y<=r;y++){let b=y/r*Math.PI*2,T=Math.sin(b),S=-Math.cos(b);c.x=S*g.x+T*_.x,c.y=S*g.y+T*_.y,c.z=S*g.z+T*_.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,p.push(o.x,o.y,o.z)}}(function(){for(let v=0;v<t;v++)f(v);f(s===!1?t:0),(function(){for(let v=0;v<=t;v++)for(let g=0;g<=r;g++)l.x=v/t,l.y=g/r,u.push(l.x,l.y)})(),(function(){for(let v=1;v<=t;v++)for(let g=1;g<=r;g++){let _=(r+1)*(v-1)+(g-1),y=(r+1)*v+(g-1),b=(r+1)*v+g,T=(r+1)*(v-1)+g;m.push(_,y,T),m.push(y,b,T)}})()})(),this.setIndex(m),this.setAttribute("position",new Ve(p,3)),this.setAttribute("normal",new Ve(d,3)),this.setAttribute("uv",new Ve(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Ha[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},no=class extends vt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new C,s=new C;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let p=c[l],d=p.start;for(let u=d,m=d+p.count;u<m;u+=3)for(let f=0;f<3;f++){let v=o.getX(u+f),g=o.getX(u+(f+1)%3);r.fromBufferAttribute(a,v),s.fromBufferAttribute(a,g),Nu(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,p=3*o+(l+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,p),Nu(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Ve(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Nu(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var Wy=Object.freeze({__proto__:null,BoxGeometry:rr,CapsuleGeometry:Da,CircleGeometry:Ua,ConeGeometry:Oa,CylinderGeometry:xs,DodecahedronGeometry:Fa,EdgesGeometry:Ba,ExtrudeGeometry:Xa,IcosahedronGeometry:ja,LatheGeometry:qa,OctahedronGeometry:Ya,PlaneGeometry:Or,PolyhedronGeometry:Hi,RingGeometry:$a,ShapeGeometry:Za,SphereGeometry:Ja,TetrahedronGeometry:Ka,TorusGeometry:Qa,TorusKnotGeometry:eo,TubeGeometry:to,WireframeGeometry:no});function dr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(Du(r))r.isRenderTargetTexture?(We("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Du(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function an(i){let e={};for(let t=0;t<i.length;t++){let n=dr(i[t]);for(let r in n)e[r]=n[r]}return e}function Du(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Rm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Zc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}var Ud={clone:dr,merge:an},Cm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Im=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,en=class extends Ei{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cm,this.fragmentShader=Im,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=Rm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new st().setHex(r.value);break;case"v2":this.uniforms[n].value=new xe().fromArray(r.value);break;case"v3":this.uniforms[n].value=new C().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Pt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Je().fromArray(r.value);break;case"m4":this.uniforms[n].value=new rt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},io=class extends en{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ro=class extends Ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},so=class extends Ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Is=class extends tr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Rr(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function Ul(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Wi=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ao=class extends Wi{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,o=2*t-n;break;case 2402:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+r[1]-r[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(n-t)/(r-t),f=m*m,v=f*m,g=-d*v+2*d*f-d*m,_=(1+d)*v+(-1.5-2*d)*f+(-.5+d)*m+1,y=(-1-u)*v+(1.5+u)*f+.5*m,b=u*v-u*f;for(let T=0;T!==o;++T)s[T]=g*a[h+T]+_*a[l+T]+y*a[c+T]+b*a[p+T];return s}},oo=class extends Wi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(r-t),p=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*p+a[c+d]*h;return s}},lo=class extends Wi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},co=class extends Wi{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let m=(n-t)/(r-t),f=1-m;for(let v=0;v!==o;++v)s[v]=a[l+v]*f+a[c+v]*m;return s}let d=2*o,u=e-1;for(let m=0;m!==o;++m){let f=a[l+m],v=a[c+m],g=u*d+2*m,_=p[g],y=p[g+1],b=e*d+2*m,T=h[b],S=h[b+1],P=Lm(n,t,_,T,r);s[m]=Od(P,f,y,S,v)}return s}};function Od(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function Pm(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function Lm(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=Od(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let c=Pm(s,e,t,n,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}var Nn=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Rr(t,this.TimeBufferType),this.values=Rr(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Rr(e.times,Array),values:Rr(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),Ul(e.settings)&&(n.settings={inTangents:Rr(e.settings.inTangents,Array),outTangents:Rr(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new lo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new oo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ao(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new co(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return We("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ul(this.settings)&&(Uu(this.settings.inTangents,e),Uu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(qe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){qe("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){qe("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(r!==void 0&&Df(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){qe("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===2302,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(r)c=!0;else{let h=o*n,p=h-n,d=h+n;for(let u=0;u!==n;++u){let m=t[h+u];if(m!==t[p+u]||m!==t[d+u]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,p=a*n;for(let d=0;d!==n;++d)t[p+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,Ul(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Uu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Nn.prototype.ValueTypeName="",Nn.prototype.TimeBufferType=Float32Array,Nn.prototype.ValueBufferType=Float32Array,Nn.prototype.DefaultInterpolation=2301;var Bi=class extends Nn{constructor(e,t,n){super(e,t,n)}};Bi.prototype.ValueTypeName="bool",Bi.prototype.ValueBufferType=Array,Bi.prototype.DefaultInterpolation=2300,Bi.prototype.InterpolantFactoryMethodLinear=void 0,Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var ho=class extends Nn{constructor(e,t,n,r){super(e,t,n,r)}};ho.prototype.ValueTypeName="color";var uo=class extends Nn{constructor(e,t,n,r){super(e,t,n,r)}};uo.prototype.ValueTypeName="number";var po=class extends Wi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(r-t),l=e*o;for(let h=l+o;l!==h;l+=4)Vn.slerpFlat(s,0,a,l-o,a,l,c);return s}},Ps=class extends Nn{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new po(this.times,this.values,this.getValueSize(),e)}};Ps.prototype.ValueTypeName="quaternion",Ps.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends Nn{constructor(e,t,n){super(e,t,n)}};zi.prototype.ValueTypeName="string",zi.prototype.ValueBufferType=Array,zi.prototype.DefaultInterpolation=2300,zi.prototype.InterpolantFactoryMethodLinear=void 0,zi.prototype.InterpolantFactoryMethodSmooth=void 0;var fo=class extends Nn{constructor(e,t,n,r){super(e,t,n,r)}};fo.prototype.ValueTypeName="vector";var mo=class{constructor(e,t,n){let r=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){c++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,c),o===c&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,p){return l.push(h,p),this},this.removeHandler=function(h){let p=l.indexOf(h);return p!==-1&&l.splice(p,2),this},this.getHandler=function(h){for(let p=0,d=l.length;p<d;p+=2){let u=l[p],m=l[p+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Fd=new mo,go=class{constructor(e){this.manager=e!==void 0?e:Fd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};go.DEFAULT_MATERIAL_NAME="__DEFAULT";var Xy=new rt,jy=new C,qy=new C;var Ma=new C,ba=new Vn,ii=new C,Fr=class extends vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ma,ba,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,ba,ii.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ma,ba,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,ba,ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Fi=new C,Ou=new xe,Fu=new xe,sn=class extends Fr{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Ea*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Ta*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Ea*Math.atan(Math.tan(.5*Ta*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fi.x,Fi.y).multiplyScalar(-e/Fi.z),Fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fi.x,Fi.y).multiplyScalar(-e/Fi.z)}getViewSize(e,t){return this.getViewBounds(e,Ou,Fu),t.subVectors(Fu,Ou)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Ta*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ls=class extends Fr{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Yy=new rt,$y=new rt,Zy=new rt;var _o=class extends vn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new sn(-90,1,e,t);r.layers=this.layers,this.add(r);let s=new sn(-90,1,e,t);s.layers=this.layers,this.add(s);let a=new sn(-90,1,e,t);a.layers=this.layers,this.add(a);let o=new sn(-90,1,e,t);o.layers=this.layers,this.add(o);let c=new sn(-90,1,e,t);c.layers=this.layers,this.add(c);let l=new sn(-90,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==2001)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;v=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=f,e.setRenderTarget(n,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,d,u),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},vo=class extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ns=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Nm.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Nm(){this._document.hidden===!1&&this.reset()}var Jy=new C,Ky=new Vn,Qy=new C,e1=new C,t1=new C;var n1=new C,i1=new Vn,r1=new C,s1=new C;var Dm=new RegExp("[\\[\\]\\.:\\/]","g"),Jc="[^\\[\\]\\.:\\/]",Um="[^"+"\\[\\]\\.:\\/".replace("\\.","")+"]",Om=/((?:WC+[\/:])*)/.source.replace("WC",Jc),Fm=/(WCOD+)?/.source.replace("WCOD",Um),Bm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Jc),zm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Jc),Vm=new RegExp("^"+Om+Fm+Bm+zm+"$"),km=["material","materials","bones","map"],kl=class{constructor(e,t,n){let r=n||Ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ot=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Dm,"")}static parseTrackName(e){let t=Vm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);km.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void We("PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void qe("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void qe("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void qe("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[r];if(a===void 0)return void qe("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+r+" but it wasn't found.",e);let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ot.Composite=kl,Ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ot.prototype.GetterByBindingType=[Ot.prototype._getValue_direct,Ot.prototype._getValue_array,Ot.prototype._getValue_arrayElement,Ot.prototype._getValue_toArray],Ot.prototype.SetterByBindingTypeAndVersioning=[[Ot.prototype._setValue_direct,Ot.prototype._setValue_direct_setNeedsUpdate,Ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_array,Ot.prototype._setValue_array_setNeedsUpdate,Ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_arrayElement,Ot.prototype._setValue_arrayElement_setNeedsUpdate,Ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ot.prototype._setValue_fromArray,Ot.prototype._setValue_fromArray_setNeedsUpdate,Ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var a1=new Float32Array(1);var o1=new rt;var ih=class ih{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};ih.prototype.isMatrix2=!0;var Gl=ih,l1=new xe;var c1=new C,h1=new C,u1=new C,d1=new C,p1=new C,f1=new C,m1=new C;var g1=new C;var _1=new C,v1=new rt,x1=new rt;var y1=new C,S1=new st,M1=new st;var b1=new C,T1=new C,E1=new C;var w1=new C,A1=new Fr;var R1=new qn;var C1=new C;function Kc(i,e,t,n){let r=Gm(n);switch(t){case 1021:return i*e;case 1028:case 1029:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case 1023:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:case 37496:case 37490:case 37491:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Gm(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}})),typeof window<"u"&&(window.__THREE__?We("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function sp(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Wm(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=i.createBuffer(),p;if(i.bindBuffer(a,h),i.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)p=i.HALF_FLOAT;else if(o instanceof Uint16Array)p=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)p=i.SHORT;else if(o instanceof Uint32Array)p=i.UNSIGNED_INT;else if(o instanceof Int32Array)p=i.INT;else if(o instanceof Int8Array)p=i.BYTE;else if(o instanceof Uint8Array)p=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);p=i.UNSIGNED_BYTE}return{buffer:h,type:p,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(i.bindBuffer(o,s),l.length===0)i.bufferSubData(o,0,c);else{l.sort((p,d)=>p.start-d.start);let h=0;for(let p=1;p<l.length;p++){let d=l[h],u=l[p];u.start<=d.start+d.count+1?d.count=Math.max(d.count,u.start+u.count-d.start):(++h,l[h]=u)}l.length=h+1;for(let p=0,d=l.length;p<d;p++){let u=l[p];i.bufferSubData(o,u.start*c.BYTES_PER_ELEMENT,c,u.start,u.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var Xm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jm=`#ifdef USE_ALPHAHASH
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
#endif`,qm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ym=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$m=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jm=`#ifdef USE_AOMAP
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
#endif`,Km=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qm=`#ifdef USE_BATCHING
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
#endif`,eg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ng=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ig=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rg=`#ifdef USE_IRIDESCENCE
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
#endif`,sg=`#ifdef USE_BUMPMAP
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
#endif`,ag=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,og=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ug=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,dg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,pg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,fg=`#define PI 3.141592653589793
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
} // validated`,mg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gg=`vec3 transformedNormal = objectNormal;
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
#endif`,_g=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bg=`#ifdef USE_ENVMAP
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
#endif`,Tg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Eg=`#ifdef USE_ENVMAP
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
#endif`,wg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ag=`#ifdef USE_ENVMAP
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
#endif`,Rg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ig=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lg=`#ifdef USE_GRADIENTMAP
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
}`,Ng=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ug=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Og=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Fg=`#ifdef USE_ENVMAP
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
#endif`,Bg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gg=`PhysicalMaterial material;
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
#endif`,Hg=`uniform sampler2D dfgLUT;
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
}`,Wg=`
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
#endif`,Xg=`#if defined( RE_IndirectDiffuse )
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
#endif`,jg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Yg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$g=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Kg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,e0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,t0=`#if defined( USE_POINTS_UV )
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
#endif`,n0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,i0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,r0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,s0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,a0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o0=`#ifdef USE_MORPHTARGETS
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
#endif`,l0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,h0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,u0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,f0=`#ifdef USE_NORMALMAP
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
#endif`,m0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,g0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,v0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,x0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,y0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,S0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,M0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,b0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,T0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,E0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,w0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,A0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,R0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,C0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,I0=`float getShadowMask() {
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
}`,P0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,L0=`#ifdef USE_SKINNING
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
#endif`,N0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,D0=`#ifdef USE_SKINNING
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
#endif`,U0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,O0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,F0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,B0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,z0=`#ifdef USE_TRANSMISSION
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
#endif`,V0=`#ifdef USE_TRANSMISSION
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
#endif`,k0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,G0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,H0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,W0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,X0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,j0=`uniform sampler2D t2D;
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
}`,q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Y0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,$0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Z0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J0=`#include <common>
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
}`,K0=`#if DEPTH_PACKING == 3200
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
}`,Q0=`#define DISTANCE
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
}`,e_=`#define DISTANCE
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
}`,t_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,n_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i_=`uniform float scale;
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
}`,r_=`uniform vec3 diffuse;
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
}`,s_=`#include <common>
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
}`,a_=`uniform vec3 diffuse;
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
}`,o_=`#define LAMBERT
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
}`,l_=`#define LAMBERT
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
}`,c_=`#define MATCAP
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
}`,h_=`#define MATCAP
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
}`,u_=`#define NORMAL
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
}`,d_=`#define NORMAL
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
}`,p_=`#define PHONG
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
}`,f_=`#define PHONG
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
}`,m_=`#define STANDARD
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
}`,g_=`#define STANDARD
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
}`,__=`#define TOON
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
}`,v_=`#define TOON
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
}`,x_=`uniform float size;
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
}`,y_=`uniform vec3 diffuse;
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
}`,S_=`#include <common>
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
}`,M_=`uniform vec3 color;
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
}`,b_=`uniform float rotation;
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
}`,T_=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:Xm,alphahash_pars_fragment:jm,alphamap_fragment:qm,alphamap_pars_fragment:Ym,alphatest_fragment:$m,alphatest_pars_fragment:Zm,aomap_fragment:Jm,aomap_pars_fragment:Km,batching_pars_vertex:Qm,batching_vertex:eg,begin_vertex:tg,beginnormal_vertex:ng,bsdfs:ig,iridescence_fragment:rg,bumpmap_pars_fragment:sg,clipping_planes_fragment:ag,clipping_planes_pars_fragment:og,clipping_planes_pars_vertex:lg,clipping_planes_vertex:cg,color_fragment:hg,color_pars_fragment:ug,color_pars_vertex:dg,color_vertex:pg,common:fg,cube_uv_reflection_fragment:mg,defaultnormal_vertex:gg,displacementmap_pars_vertex:_g,displacementmap_vertex:vg,emissivemap_fragment:xg,emissivemap_pars_fragment:yg,colorspace_fragment:Sg,colorspace_pars_fragment:Mg,envmap_fragment:bg,envmap_common_pars_fragment:Tg,envmap_pars_fragment:Eg,envmap_pars_vertex:wg,envmap_physical_pars_fragment:Fg,envmap_vertex:Ag,fog_vertex:Rg,fog_pars_vertex:Cg,fog_fragment:Ig,fog_pars_fragment:Pg,gradientmap_pars_fragment:Lg,lightmap_pars_fragment:Ng,lights_lambert_fragment:Dg,lights_lambert_pars_fragment:Ug,lights_pars_begin:Og,lights_toon_fragment:Bg,lights_toon_pars_fragment:zg,lights_phong_fragment:Vg,lights_phong_pars_fragment:kg,lights_physical_fragment:Gg,lights_physical_pars_fragment:Hg,lights_fragment_begin:Wg,lights_fragment_maps:Xg,lights_fragment_end:jg,lightprobes_pars_fragment:qg,logdepthbuf_fragment:Yg,logdepthbuf_pars_fragment:$g,logdepthbuf_pars_vertex:Zg,logdepthbuf_vertex:Jg,map_fragment:Kg,map_pars_fragment:Qg,map_particle_fragment:e0,map_particle_pars_fragment:t0,metalnessmap_fragment:n0,metalnessmap_pars_fragment:i0,morphinstance_vertex:r0,morphcolor_vertex:s0,morphnormal_vertex:a0,morphtarget_pars_vertex:o0,morphtarget_vertex:l0,normal_fragment_begin:c0,normal_fragment_maps:h0,normal_pars_fragment:u0,normal_pars_vertex:d0,normal_vertex:p0,normalmap_pars_fragment:f0,clearcoat_normal_fragment_begin:m0,clearcoat_normal_fragment_maps:g0,clearcoat_pars_fragment:_0,iridescence_pars_fragment:v0,opaque_fragment:x0,packing:y0,premultiplied_alpha_fragment:S0,project_vertex:M0,dithering_fragment:b0,dithering_pars_fragment:T0,roughnessmap_fragment:E0,roughnessmap_pars_fragment:w0,shadowmap_pars_fragment:A0,shadowmap_pars_vertex:R0,shadowmap_vertex:C0,shadowmask_pars_fragment:I0,skinbase_vertex:P0,skinning_pars_vertex:L0,skinning_vertex:N0,skinnormal_vertex:D0,specularmap_fragment:U0,specularmap_pars_fragment:O0,tonemapping_fragment:F0,tonemapping_pars_fragment:B0,transmission_fragment:z0,transmission_pars_fragment:V0,uv_pars_fragment:k0,uv_pars_vertex:G0,uv_vertex:H0,worldpos_vertex:W0,background_vert:X0,background_frag:j0,backgroundCube_vert:q0,backgroundCube_frag:Y0,cube_vert:$0,cube_frag:Z0,depth_vert:J0,depth_frag:K0,distance_vert:Q0,distance_frag:e_,equirect_vert:t_,equirect_frag:n_,linedashed_vert:i_,linedashed_frag:r_,meshbasic_vert:s_,meshbasic_frag:a_,meshlambert_vert:o_,meshlambert_frag:l_,meshmatcap_vert:c_,meshmatcap_frag:h_,meshnormal_vert:u_,meshnormal_frag:d_,meshphong_vert:p_,meshphong_frag:f_,meshphysical_vert:m_,meshphysical_frag:g_,meshtoon_vert:__,meshtoon_frag:v_,points_vert:x_,points_frag:y_,shadow_vert:S_,shadow_frag:M_,sprite_vert:b_,sprite_frag:T_},Ae={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},di={basic:{uniforms:an([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:an([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new st(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:an([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:an([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:an([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new st(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:an([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:an([Ae.points,Ae.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:an([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:an([Ae.common,Ae.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:an([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:an([Ae.sprite,Ae.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:an([Ae.common,Ae.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:an([Ae.lights,Ae.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};di.physical={uniforms:an([di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};var Uo={r:0,b:0,g:0},E_=new rt,ap=new Je;function w_(i,e,t,n,r,s){let a=new st(0),o,c,l=r===!0?0:1,h=null,p=0,d=null;function u(f){let v=f.isScene===!0?f.background:null;if(v&&v.isTexture){let g=f.backgroundBlurriness>0;v=e.get(v,g)}return v}function m(f,v){f.getRGB(Uo,Zc(i)),t.buffers.color.setClear(Uo.r,Uo.g,Uo.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(f,v=1){a.set(f),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,m(a,l)},render:function(f){let v=!1,g=u(f);g===null?m(a,l):g&&g.isColor&&(m(g,1),v=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,s):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,v){let g=u(v);g&&(g.isCubeTexture||g.mapping===Os)?(c===void 0&&(c=new yn(new rr(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:dr(di.backgroundCube.uniforms),vertexShader:di.backgroundCube.vertexShader,fragmentShader:di.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,y,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=g,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(E_.makeRotationFromEuler(v.backgroundRotation)).transpose(),g.isCubeTexture&&g.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ap),c.material.toneMapped=pt.getTransfer(g.colorSpace)!==Lt,h===g&&p===g.version&&d===i.toneMapping||(c.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null)):g&&g.isTexture&&(o===void 0&&(o=new yn(new Or(2,2),new en({name:"BackgroundMaterial",uniforms:dr(di.background.uniforms),vertexShader:di.background.vertexShader,fragmentShader:di.background.fragmentShader,side:zr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=g,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=pt.getTransfer(g.colorSpace)!==Lt,g.matrixAutoUpdate===!0&&g.updateMatrix(),o.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&p===g.version&&d===i.toneMapping||(o.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),o.layers.enableAll(),f.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function A_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=l(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function c(g){return i.deleteVertexArray(g)}function l(g){let _=[],y=[],b=[];for(let T=0;T<t;T++)_[T]=0,y[T]=0,b[T]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:y,attributeDivisors:b,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,y=g.length;_<y;_++)g[_]=0}function p(g){d(g,0)}function d(g,_){let y=s.newAttributes,b=s.enabledAttributes,T=s.attributeDivisors;y[g]=1,b[g]===0&&(i.enableVertexAttribArray(g),b[g]=1),T[g]!==_&&(i.vertexAttribDivisor(g,_),T[g]=_)}function u(){let g=s.newAttributes,_=s.enabledAttributes;for(let y=0,b=_.length;y<b;y++)_[y]!==g[y]&&(i.disableVertexAttribArray(y),_[y]=0)}function m(g,_,y,b,T,S,P){P===!0?i.vertexAttribIPointer(g,_,y,T,S):i.vertexAttribPointer(g,_,y,b,T,S)}function f(){v(),a=!0,s!==r&&(s=r,o(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,y,b,T){let S=!1,P=(function(O,z,N,j){let U=j.wireframe===!0,Z=n[z.id];Z===void 0&&(Z={},n[z.id]=Z);let ee=O.isInstancedMesh===!0?O.id:0,se=Z[ee];se===void 0&&(se={},Z[ee]=se);let W=se[N.id];W===void 0&&(W={},se[N.id]=W);let G=W[U];return G===void 0&&(G=l(i.createVertexArray()),W[U]=G),G})(g,b,y,_);s!==P&&(s=P,o(s.object)),S=(function(O,z,N,j){let U=s.attributes,Z=z.attributes,ee=0,se=N.getAttributes();for(let W in se)if(se[W].location>=0){let G=U[W],$=Z[W];if($===void 0&&(W==="instanceMatrix"&&O.instanceMatrix&&($=O.instanceMatrix),W==="instanceColor"&&O.instanceColor&&($=O.instanceColor)),G===void 0||G.attribute!==$||$&&G.data!==$.data)return!0;ee++}return s.attributesNum!==ee||s.index!==j})(g,b,y,T),S&&(function(O,z,N,j){let U={},Z=z.attributes,ee=0,se=N.getAttributes();for(let W in se)if(se[W].location>=0){let G=Z[W];G===void 0&&(W==="instanceMatrix"&&O.instanceMatrix&&(G=O.instanceMatrix),W==="instanceColor"&&O.instanceColor&&(G=O.instanceColor));let $={};$.attribute=G,G&&G.data&&($.data=G.data),U[W]=$,ee++}s.attributes=U,s.attributesNum=ee,s.index=j})(g,b,y,T),T!==null&&e.update(T,i.ELEMENT_ARRAY_BUFFER),(S||a)&&(a=!1,(function(O,z,N,j){h();let U=j.attributes,Z=N.getAttributes(),ee=z.defaultAttributeValues;for(let se in Z){let W=Z[se];if(W.location>=0){let G=U[se];if(G===void 0&&(se==="instanceMatrix"&&O.instanceMatrix&&(G=O.instanceMatrix),se==="instanceColor"&&O.instanceColor&&(G=O.instanceColor)),G!==void 0){let $=G.normalized,he=G.itemSize,ae=e.get(G);if(ae===void 0)continue;let ie=ae.buffer,be=ae.type,me=ae.bytesPerElement,oe=be===i.INT||be===i.UNSIGNED_INT||G.gpuType===ac;if(G.isInterleavedBufferAttribute){let re=G.data,_e=re.stride,Se=G.offset;if(re.isInstancedInterleavedBuffer){for(let Te=0;Te<W.locationSize;Te++)d(W.location+Te,re.meshPerAttribute);O.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Te=0;Te<W.locationSize;Te++)p(W.location+Te);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Te=0;Te<W.locationSize;Te++)m(W.location+Te,he/W.locationSize,be,$,_e*me,(Se+he/W.locationSize*Te)*me,oe)}else{if(G.isInstancedBufferAttribute){for(let re=0;re<W.locationSize;re++)d(W.location+re,G.meshPerAttribute);O.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let re=0;re<W.locationSize;re++)p(W.location+re);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let re=0;re<W.locationSize;re++)m(W.location+re,he/W.locationSize,be,$,he*me,he/W.locationSize*re*me,oe)}}else if(ee!==void 0){let $=ee[se];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(W.location,$);break;case 3:i.vertexAttrib3fv(W.location,$);break;case 4:i.vertexAttrib4fv(W.location,$);break;default:i.vertexAttrib1fv(W.location,$)}}}}u()})(g,_,y,b),T!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(T).buffer))},reset:f,resetDefaultState:v,dispose:function(){f();for(let g in n){let _=n[g];for(let y in _){let b=_[y];for(let T in b){let S=b[T];for(let P in S)c(S[P].object),delete S[P];delete b[T]}}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let y in _){let b=_[y];for(let T in b){let S=b[T];for(let P in S)c(S[P].object),delete S[P];delete b[T]}}delete n[g.id]},releaseStatesOfObject:function(g){for(let _ in n){let y=n[_],b=g.isInstancedMesh===!0?g.id:0,T=y[b];if(T!==void 0){for(let S in T){let P=T[S];for(let O in P)c(P[O].object),delete P[O];delete T[S]}delete y[b],Object.keys(y).length===0&&delete n[_]}}},releaseStatesOfProgram:function(g){for(let _ in n){let y=n[_];for(let b in y){let T=y[b];if(T[g.id]===void 0)continue;let S=T[g.id];for(let P in S)c(S[P].object),delete S[P];delete T[g.id]}}},initAttributes:h,enableAttribute:p,disableUnusedAttributes:u}}function R_(i,e,t){let n;this.setMode=function(r){n=r},this.render=function(r,s){i.drawArrays(n,r,s),t.update(s,n,1)},this.renderInstances=function(r,s,a){a!==0&&(i.drawArraysInstanced(n,r,s,a),t.update(s,n,a))},this.renderMultiDraw=function(r,s,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,s,0,a);let o=0;for(let c=0;c<a;c++)o+=s[c];t.update(o,n,1)}}function C_(i,e,t,n){let r;function s(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(We("WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&l===!1&&We("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let h=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(h){return h===hi||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let p=h===ci&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==Zn&&h!==Jn&&!p&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:i.getParameter(i.MAX_SAMPLES),samples:i.getParameter(i.SAMPLES)}}function I_(i){let e=this,t=null,n=0,r=!1,s=!1,a=new jn,o=new Je,c={value:null,needsUpdate:!1};function l(h,p,d,u){let m=h!==null?h.length:0,f=null;if(m!==0){if(f=c.value,u!==!0||f===null){let v=d+4*m,g=p.matrixWorldInverse;o.getNormalMatrix(g),(f===null||f.length<v)&&(f=new Float32Array(v));for(let _=0,y=d;_!==m;++_,y+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(f,y),f[y+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let d=h.length!==0||p||n!==0||r;return r=p,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=l(h,p,0)},this.setState=function(h,p,d){let u=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,v=i.get(h);if(!r||u===null||u.length===0||s&&!f)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,y=v.clippingState||null;c.value=y,y=l(u,p,_,d);for(let b=0;b!==_;++b)y[b]=t[b];v.clippingState=y,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}ap.set(-1,0,0,0,1,0,0,0,1);var zs=new Ls,Bd=new st,rh=null,sh=0,ah=0,oh=!1,P_=new C,pr=new C,Fo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=P_}=s;rh=this._renderer.getRenderTarget(),sh=this._renderer.getActiveCubeFace(),ah=this._renderer.getActiveMipmapLevel(),oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(rh,sh,ah),this._renderer.xr.enabled=oh,e.scissorTest=!1,Wr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===kr||e.mapping===ar?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rh=this._renderer.getRenderTarget(),sh=this._renderer.getActiveCubeFace(),ah=this._renderer.getActiveMipmapLevel(),oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:ci,format:hi,colorSpace:Lo,depthBuffer:!1},r=zd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zd(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=L_(s)),this._blurMaterial=D_(s,e,t),this._ggxMaterial=N_(s,e,t)}return r}_compileMaterial(e){let t=new yn(new vt,e);this._renderer.compile(t,zs)}_sceneToCubeUV(e,t,n,r,s){let a=new sn(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,p=l.toneMapping;l.getClearColor(Bd),l.toneMapping=$n,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(r),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new yn(new rr,new gs({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,m=!1,f=e.background;f?f.isColor&&(u.color.copy(f),e.background=null,m=!0):(u.color.copy(Bd),m=!0);for(let v=0;v<6;v++){let g=v%3;g===0?(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[v],s.y,s.z)):g===1?(a.up.set(0,0,o[v]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[v],s.z)):(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[v]));let _=this._cubeSize;Wr(r,g*_,v>2?_:0,_,_),l.setRenderTarget(r),m&&l.render(d,a),l.render(e,a)}l.toneMapping=p,l.autoClear=h,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===kr||e.mapping===ar;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=kd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vd());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s,s.uniforms.envMap.value=e;let o=this._cubeSize;Wr(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,zs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-h*h)*(1.25*l),{_lodMax:d}=this,u=this._sizeLods[n],m=3*u*(n>d-4?n-d+4:0),f=4*(this._cubeSize-u);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=d-t,Wr(s,m,f,3*u,2*u),r.setRenderTarget(s),r.render(o,zs),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=d-n,Wr(e,m,f,3*u,2*u),r.setRenderTarget(e),r.render(o,zs)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[r];Wr(t,3*h*(r>this._lodMax-4?r-this._lodMax+4:0),4*(this._cubeSize-h),3*h,2*h),a.setRenderTarget(t),a.render(c,zs)}};function L_(i){let e=[],t=[],n=i,r=i-4+1+6;for(let s=0;s<r;s++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],p=6,d=6,u=3,m=new Float32Array(u*d*p),f=new Float32Array(u*d*p);for(let g=0;g<p;g++){let _=g%3*2/3-1,y=g>2?0:-1,b=[_,y,0,_+2/3,y,0,_+2/3,y+1,0,_,y,0,_+2/3,y+1,0,_,y+1,0];m.set(b,u*d*g);for(let T=0;T<d;T++){let S=2*h[2*T]-1,P=2*h[2*T+1]-1;g===0?pr.set(1,P,S):g===1?pr.set(-S,1,-P):g===2?pr.set(-S,P,1):g===3?pr.set(-1,P,-S):g===4?pr.set(-S,-1,P):pr.set(S,P,-1),pr.toArray(f,(g*d+T)*u)}}let v=new vt;v.setAttribute("position",new Dt(m,u)),v.setAttribute("outputDirection",new Dt(f,u)),t.push(new yn(v,null)),n>4&&n--}return{lodMeshes:t,sizeLods:e}}function zd(i,e,t){let n=new xn(i,e,t);return n.texture.mapping=Os,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function N_(i,e,t){return new en({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Vo(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function D_(i,e,t){return new en({name:"SphericalGaussianBlur",defines:{SAMPLES:20,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Vo(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Vd(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vo(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function kd(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Vo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Bo=class extends xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new _s(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new rr(5,5,5),s=new en({name:"CubemapFromEquirect",uniforms:dr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Sn,blending:oi});s.uniforms.tEquirect.value=t;let a=new yn(r,s),o=t.minFilter;return t.minFilter===or&&(t.minFilter=Mn),new _o(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function U_(i){let e=new WeakMap,t=new WeakMap,n=null;function r(o,c){return c===So?o.mapping=kr:c===Mo&&(o.mapping=ar),o}function s(o){let c=o.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(o){let c=o.target;c.removeEventListener("dispose",a);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}return{get:function(o,c=!1){return o==null?null:c?(function(l){if(l&&l.isTexture){let h=l.mapping,p=h===So||h===Mo,d=h===kr||h===ar;if(p||d){let u=t.get(l),m=u!==void 0?u.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return n===null&&(n=new Fo(i)),u=p?n.fromEquirectangular(l,u):n.fromCubemap(l,u),u.texture.pmremVersion=l.pmremVersion,t.set(l,u),u.texture;if(u!==void 0)return u.texture;{let f=l.image;return p&&f&&f.height>0||d&&f&&(function(v){let g=0,_=6;for(let y=0;y<_;y++)v[y]!==void 0&&g++;return g===_})(f)?(n===null&&(n=new Fo(i)),u=p?n.fromEquirectangular(l):n.fromCubemap(l),u.texture.pmremVersion=l.pmremVersion,t.set(l,u),l.addEventListener("dispose",a),u.texture):null}}}return l})(o):(function(l){if(l&&l.isTexture){let h=l.mapping;if(h===So||h===Mo){if(e.has(l))return r(e.get(l).texture,l.mapping);{let p=l.image;if(p&&p.height>0){let d=new Bo(p.height);return d.fromEquirectangularTexture(i,l),e.set(l,d),l.addEventListener("dispose",s),r(d.texture,l.mapping)}return null}}}return l})(o)},dispose:function(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function O_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Qi("WebGLRenderer: "+n+" extension not supported."),r}}}function F_(i,e,t,n){let r={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let p in l.attributes)e.remove(l.attributes[p]);l.removeEventListener("dispose",a),delete r[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,p=c.attributes.position,d=0;if(p===void 0)return;if(h!==null){let f=h.array;d=h.version;for(let v=0,g=f.length;v<g;v+=3){let _=f[v+0],y=f[v+1],b=f[v+2];l.push(_,y,y,b,b,_)}}else{let f=p.array;d=p.version;for(let v=0,g=f.length/3-1;v<g;v+=3){let _=v+0,y=v+1,b=v+2;l.push(_,y,y,b,b,_)}}let u=new(p.count>=65535?ms:fs)(l,1);u.version=d;let m=s.get(c);m&&e.remove(m),s.set(c,u)}return{get:function(c,l){return r[l.id]===!0||(l.addEventListener("dispose",a),r[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function B_(i,e,t){let n,r,s;this.setMode=function(a){n=a},this.setIndex=function(a){r=a.type,s=a.bytesPerElement},this.render=function(a,o){i.drawElements(n,o,r,a*s),t.update(o,n,1)},this.renderInstances=function(a,o,c){c!==0&&(i.drawElementsInstanced(n,o,r,a*s,c),t.update(o,n,c))},this.renderMultiDraw=function(a,o,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,o,0,r,a,0,c);let l=0;for(let h=0;h<c;h++)l+=o[h];t.update(l,n,1)}}function z_(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:qe("WebGLInfo: Unknown draw mode:",n)}}}}function V_(i,e,t){let n=new WeakMap,r=new Pt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,p=n.get(a);if(p===void 0||p.count!==h){p!==void 0&&p.texture.dispose();let d=a.morphAttributes.position!==void 0,u=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),u===!0&&(_=2),m===!0&&(_=3);let y=a.attributes.position.count*_,b=1;y>e.maxTextureSize&&(b=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*b*4*h),S=new us(T,y,b,h);S.type=Jn,S.needsUpdate=!0;let P=4*_;for(let O=0;O<h;O++){let z=f[O],N=v[O],j=g[O],U=y*b*4*O;for(let Z=0;Z<z.count;Z++){let ee=Z*P;d===!0&&(r.fromBufferAttribute(z,Z),T[U+ee+0]=r.x,T[U+ee+1]=r.y,T[U+ee+2]=r.z,T[U+ee+3]=0),u===!0&&(r.fromBufferAttribute(N,Z),T[U+ee+4]=r.x,T[U+ee+5]=r.y,T[U+ee+6]=r.z,T[U+ee+7]=0),m===!0&&(r.fromBufferAttribute(j,Z),T[U+ee+8]=r.x,T[U+ee+9]=r.y,T[U+ee+10]=r.z,T[U+ee+11]=j.itemSize===4?r.w:1)}}p={count:h,texture:S,size:new xe(y,b)},n.set(a,p),a.addEventListener("dispose",function O(){S.dispose(),n.delete(a),a.removeEventListener("dispose",O)})}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let d=0;for(let m=0;m<c.length;m++)d+=c[m];let u=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",u),o.getUniforms().setValue(i,"morphTargetInfluences",c)}o.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}}}function k_(i,e,t,n,r){let s=new WeakMap;function a(o){let c=o.target;c.removeEventListener("dispose",a),n.releaseStatesOfObject(c),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:function(o){let c=r.render.frame,l=o.geometry,h=e.get(o,l);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==c&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,c))),o.isSkinnedMesh){let p=o.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return h},dispose:function(){s=new WeakMap}}}var G_={[Ql]:"LINEAR_TONE_MAPPING",[ec]:"REINHARD_TONE_MAPPING",[tc]:"CINEON_TONE_MAPPING",[nc]:"ACES_FILMIC_TONE_MAPPING",[rc]:"AGX_TONE_MAPPING",[sc]:"NEUTRAL_TONE_MAPPING",[ic]:"CUSTOM_TONE_MAPPING"};function H_(i,e,t,n,r,s){let a=new xn(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new vt;l.setAttribute("position",new Ve([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ve([0,2,0,0,2,0],2));let h=new io({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new yn(l,h),d=new Ls(-1,1,1,-1,0,1),u,m=null,f=null,v=!1,g=null,_=[],y=!1;this.setSize=function(b,T){a.setSize(b,T),o!==null&&o.setSize(b,T),c!==null&&c.setSize(b,T);for(let S=0;S<_.length;S++){let P=_[S];P.setSize&&P.setSize(b,T)}},this.setEffects=function(b){_=b,y=_.length>0&&_[0].isRenderPass===!0;let T=a.width,S=a.height;_.length>0&&o===null&&(o=new xn(T,S,{type:ci,depthBuffer:!1,stencilBuffer:!1}),c=new xn(T,S,{type:ci,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<_.length;P++){let O=_[P];O.setSize&&O.setSize(T,S)}},this.begin=function(b,T){if(v||b.toneMapping===$n&&_.length===0)return!1;if(g=T,T!==null){let S=T.width,P=T.height;a.width===S&&a.height===P||this.setSize(S,P)}return y===!1&&b.setRenderTarget(a),u=b.toneMapping,b.toneMapping=$n,!0},this.hasRenderPass=function(){return y},this.end=function(b,T){b.toneMapping=u,v=!0;let S=a,P=o;for(let O=0;O<_.length;O++){let z=_[O];z.enabled!==!1&&(z.render(b,P,S,T),z.needsSwap!==!1&&(S=P,P=P===o?c:o))}if(m!==b.outputColorSpace||f!==b.toneMapping){m=b.outputColorSpace,f=b.toneMapping,h.defines={},pt.getTransfer(m)===Lt&&(h.defines.SRGB_TRANSFER="");let O=G_[f];O&&(h.defines[O]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,b.setRenderTarget(g),b.render(p,d),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var op=new _n,hh=new Gi(1,1),lp=new us,cp=new Ra,hp=new _s,Gd=[],Hd=[],Wd=new Float32Array(16),Xd=new Float32Array(9),jd=new Float32Array(4);function jr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=Gd[r];if(s===void 0&&(s=new Float32Array(r),Gd[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function jt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function qt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ko(i,e){let t=Hd[e];t===void 0&&(t=new Int32Array(e),Hd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function W_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function X_(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2fv(this.addr,e),qt(t,e)}}function j_(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(jt(t,e))return;i.uniform3fv(this.addr,e),qt(t,e)}}function q_(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4fv(this.addr,e),qt(t,e)}}function Y_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(jt(t,n))return;jd.set(n),i.uniformMatrix2fv(this.addr,!1,jd),qt(t,n)}}function $_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(jt(t,n))return;Xd.set(n),i.uniformMatrix3fv(this.addr,!1,Xd),qt(t,n)}}function Z_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(jt(t,n))return;Wd.set(n),i.uniformMatrix4fv(this.addr,!1,Wd),qt(t,n)}}function J_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function K_(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2iv(this.addr,e),qt(t,e)}}function Q_(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;i.uniform3iv(this.addr,e),qt(t,e)}}function ev(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4iv(this.addr,e),qt(t,e)}}function tv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function nv(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2uiv(this.addr,e),qt(t,e)}}function iv(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;i.uniform3uiv(this.addr,e),qt(t,e)}}function rv(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4uiv(this.addr,e),qt(t,e)}}function sv(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(hh.compareFunction=t.isReversedDepthBuffer()?Do:No,s=hh):s=op,t.setTexture2D(e||s,r)}function av(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||cp,r)}function ov(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||hp,r)}function lv(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||lp,r)}function cv(i){switch(i){case 5126:return W_;case 35664:return X_;case 35665:return j_;case 35666:return q_;case 35674:return Y_;case 35675:return $_;case 35676:return Z_;case 5124:case 35670:return J_;case 35667:case 35671:return K_;case 35668:case 35672:return Q_;case 35669:case 35673:return ev;case 5125:return tv;case 36294:return nv;case 36295:return iv;case 36296:return rv;case 35678:case 36198:case 36298:case 36306:case 35682:return sv;case 35679:case 36299:case 36307:return av;case 35680:case 36300:case 36308:case 36293:return ov;case 36289:case 36303:case 36311:case 36292:return lv}}function hv(i,e){i.uniform1fv(this.addr,e)}function uv(i,e){let t=jr(e,this.size,2);i.uniform2fv(this.addr,t)}function dv(i,e){let t=jr(e,this.size,3);i.uniform3fv(this.addr,t)}function pv(i,e){let t=jr(e,this.size,4);i.uniform4fv(this.addr,t)}function fv(i,e){let t=jr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function mv(i,e){let t=jr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function gv(i,e){let t=jr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function _v(i,e){i.uniform1iv(this.addr,e)}function vv(i,e){i.uniform2iv(this.addr,e)}function xv(i,e){i.uniform3iv(this.addr,e)}function yv(i,e){i.uniform4iv(this.addr,e)}function Sv(i,e){i.uniform1uiv(this.addr,e)}function Mv(i,e){i.uniform2uiv(this.addr,e)}function bv(i,e){i.uniform3uiv(this.addr,e)}function Tv(i,e){i.uniform4uiv(this.addr,e)}function Ev(i,e,t){let n=this.cache,r=e.length,s=ko(t,r),a;jt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s)),a=this.type===i.SAMPLER_2D_SHADOW?hh:op;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function wv(i,e,t){let n=this.cache,r=e.length,s=ko(t,r);jt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||cp,s[a])}function Av(i,e,t){let n=this.cache,r=e.length,s=ko(t,r);jt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||hp,s[a])}function Rv(i,e,t){let n=this.cache,r=e.length,s=ko(t,r);jt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||lp,s[a])}function Cv(i){switch(i){case 5126:return hv;case 35664:return uv;case 35665:return dv;case 35666:return pv;case 35674:return fv;case 35675:return mv;case 35676:return gv;case 5124:case 35670:return _v;case 35667:case 35671:return vv;case 35668:case 35672:return xv;case 35669:case 35673:return yv;case 5125:return Sv;case 36294:return Mv;case 36295:return bv;case 36296:return Tv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ev;case 35679:case 36299:case 36307:return wv;case 35680:case 36300:case 36308:case 36293:return Av;case 36289:case 36303:case 36311:case 36292:return Rv}}var uh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=cv(t.type)}},dh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cv(t.type)}},ph=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},lh=/(\w+)(\])?(\[|\.)?/g;function qd(i,e){i.seq.push(e),i.map[e.id]=e}function Iv(i,e,t){let n=i.name,r=n.length;for(lh.lastIndex=0;;){let s=lh.exec(n),a=lh.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===r){qd(t,l===void 0?new uh(o,i,e):new dh(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new ph(o),qd(t,h)),t=h}}}var Xr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a);Iv(o,e.getUniformLocation(t,o.name),this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function Yd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Pv=0;function Lv(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var $d=new Je;function Nv(i){pt._getMatrix($d,pt.workingColorSpace,i);let e=`mat3( ${$d.elements.map(t=>t.toFixed(4))} )`;switch(pt.getTransfer(i)){case Wc:return[e,"LinearTransferOETF"];case Lt:return[e,"sRGBTransferOETF"];default:return We("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Zd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Lv(i.getShaderSource(e),a)}return r}function Dv(i,e){let t=Nv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Uv={[Ql]:"Linear",[ec]:"Reinhard",[tc]:"Cineon",[nc]:"ACESFilmic",[rc]:"AgX",[sc]:"Neutral",[ic]:"Custom"};function Ov(i,e){let t=Uv[e];return t===void 0?(We("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Oo=new C;function Fv(){return pt.getLuminanceCoefficients(Oo),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Oo.x.toFixed(4)}, ${Oo.y.toFixed(4)}, ${Oo.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ks).join(`
`)}function zv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Vv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ks(i){return i!==""}function Jd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Kd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var kv=/^[ \t]*#include +<([\w\d./]+)>/gm;function fh(i){return i.replace(kv,Hv)}var Gv=new Map;function Hv(i,e){let t=ot[e];if(t===void 0){let n=Gv.get(e);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=ot[n],We('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return fh(t)}var Wv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qd(i){return i.replace(Wv,Xv)}function Xv(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ep(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var jv={[Ds]:"SHADOWMAP_TYPE_PCF",[Br]:"SHADOWMAP_TYPE_VSM"};function qv(i){return jv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Yv={[kr]:"ENVMAP_TYPE_CUBE",[ar]:"ENVMAP_TYPE_CUBE",[Os]:"ENVMAP_TYPE_CUBE_UV"};function $v(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Yv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Zv={[ar]:"ENVMAP_MODE_REFRACTION"};function Jv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Zv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Kv={[od]:"ENVMAP_BLENDING_MULTIPLY",[ld]:"ENVMAP_BLENDING_MIX",[cd]:"ENVMAP_BLENDING_ADD"};function Qv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Kv[i.combine]||"ENVMAP_BLENDING_NONE"}function ex(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function tx(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=qv(t),l=$v(t),h=Jv(t),p=Qv(t),d=ex(t),u=Bv(t),m=zv(s),f=r.createProgram(),v,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ks).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ks).join(`
`),g.length>0&&(g+=`
`)):(v=[ep(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ks).join(`
`),g=[ep(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$n?"#define TONE_MAPPING":"",t.toneMapping!==$n?ot.tonemapping_pars_fragment:"",t.toneMapping!==$n?Ov("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,Dv("linearToOutputTexel",t.outputColorSpace),Fv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ks).join(`
`)),a=fh(a),a=Jd(a,t),a=Kd(a,t),o=fh(o),o=Jd(o,t),o=Kd(o,t),a=Qd(a),o=Qd(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===jc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=_+v+a,b=_+g+o,T=Yd(r,r.VERTEX_SHADER,y),S=Yd(r,r.FRAGMENT_SHADER,b);function P(j){if(i.debug.checkShaderErrors){let U=r.getProgramInfoLog(f)||"",Z=r.getShaderInfoLog(T)||"",ee=r.getShaderInfoLog(S)||"",se=U.trim(),W=Z.trim(),G=ee.trim(),$=!0,he=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,f,T,S);else{let ae=Zd(r,T,"vertex"),ie=Zd(r,S,"fragment");qe("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+j.name+`
Material Type: `+j.type+`

Program Info Log: `+se+`
`+ae+`
`+ie)}else se!==""?We("WebGLProgram: Program Info Log:",se):W!==""&&G!==""||(he=!1);he&&(j.diagnostics={runnable:$,programLog:se,vertexShader:{log:W,prefix:v},fragmentShader:{log:G,prefix:g}})}r.deleteShader(T),r.deleteShader(S),O=new Xr(r,f),z=Vv(r,f)}let O,z;r.attachShader(f,T),r.attachShader(f,S),t.index0AttributeName!==void 0?r.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f),this.getUniforms=function(){return O===void 0&&P(this),O},this.getAttributes=function(){return z===void 0&&P(this),z};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(f,37297)),N},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Pv++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=T,this.fragmentShader=S,this}var nx=0,mh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new gh(e),t.set(e,n)),n}},gh=class{constructor(e){this.id=nx++,this.code=e,this.usedTimes=0}};function ix(i){return i===hr||i===Io||i===Po}function rx(i,e,t,n,r,s){let a=new ds,o=new mh,c=new Set,l=[],h=new Map,p=n.logarithmicDepthBuffer,d=n.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,g,_,y,b){let T=_.fog,S=y.geometry,P=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?_.environment:null,O=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,z=e.get(f.envMap||P,O),N=z&&z.mapping===Os?z.image.height:null,j=u[f.type];f.precision!==null&&(d=n.getMaxPrecision(f.precision),d!==f.precision&&We("WebGLProgram.getParameters:",f.precision,"not supported, using",d,"instead."));let U=S.morphAttributes.position||S.morphAttributes.normal||S.morphAttributes.color,Z=U!==void 0?U.length:0,ee,se,W,G,$=0;if(S.morphAttributes.position!==void 0&&($=1),S.morphAttributes.normal!==void 0&&($=2),S.morphAttributes.color!==void 0&&($=3),j){let wt=di[j];ee=wt.vertexShader,se=wt.fragmentShader}else{ee=f.vertexShader,se=f.fragmentShader;let wt=o.getVertexShaderStage(f),Tn=o.getFragmentShaderStage(f);o.update(f,wt,Tn),W=wt.id,G=Tn.id}let he=i.getRenderTarget(),ae=i.state.buffers.depth.getReversed(),ie=y.isInstancedMesh===!0,be=y.isBatchedMesh===!0,me=!!f.map,oe=!!f.matcap,re=!!z,_e=!!f.aoMap,Se=!!f.lightMap,Te=!!f.bumpMap&&f.wireframe===!1,A=!!f.normalMap,w=!!f.displacementMap,I=!!f.emissiveMap,D=!!f.metalnessMap,x=!!f.roughnessMap,F=f.anisotropy>0,L=f.clearcoat>0,R=f.dispersion>0,X=f.retroreflectivity>0,Y=f.iridescence>0,te=f.sheen>0,pe=f.transmission>0,Pe=F&&!!f.anisotropyMap,Ne=L&&!!f.clearcoatMap,ye=L&&!!f.clearcoatNormalMap,Le=L&&!!f.clearcoatRoughnessMap,de=Y&&!!f.iridescenceMap,ve=Y&&!!f.iridescenceThicknessMap,ge=te&&!!f.sheenColorMap,we=te&&!!f.sheenRoughnessMap,ft=!!f.specularMap,Ge=!!f.specularColorMap,Xe=!!f.specularIntensityMap,Oe=pe&&!!f.transmissionMap,J=pe&&!!f.thicknessMap,gt=!!f.gradientMap,Be=!!f.alphaMap,yt=f.alphaTest>0,lt=!!f.alphaHash,Ut=!!f.extensions,Et=$n;f.toneMapped&&(he!==null&&he.isXRRenderTarget!==!0||(Et=i.toneMapping));let St={shaderID:j,shaderType:f.type,shaderName:f.name,vertexShader:ee,fragmentShader:se,defines:f.defines,customVertexShaderID:W,customFragmentShaderID:G,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:d,batching:be,batchingColor:be&&y._colorsTexture!==null,instancing:ie,instancingColor:ie&&y.instanceColor!==null,instancingMorph:ie&&y.morphTexture!==null,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:pt.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:me,matcap:oe,envMap:re,envMapMode:re&&z.mapping,envMapCubeUVHeight:N,aoMap:_e,lightMap:Se,bumpMap:Te,normalMap:A,displacementMap:w,emissiveMap:I,normalMapObjectSpace:A&&f.normalMapType===xd,normalMapTangentSpace:A&&f.normalMapType===Gc,packedNormalMap:A&&f.normalMapType===Gc&&ix(f.normalMap.format),metalnessMap:D,roughnessMap:x,anisotropy:F,anisotropyMap:Pe,clearcoat:L,clearcoatMap:Ne,clearcoatNormalMap:ye,clearcoatRoughnessMap:Le,dispersion:R,retroreflection:X,iridescence:Y,iridescenceMap:de,iridescenceThicknessMap:ve,sheen:te,sheenColorMap:ge,sheenRoughnessMap:we,specularMap:ft,specularColorMap:Ge,specularIntensityMap:Xe,transmission:pe,transmissionMap:Oe,thicknessMap:J,gradientMap:gt,opaque:f.transparent===!1&&f.blending===Xi&&f.alphaToCoverage===!1,alphaMap:Be,alphaTest:yt,alphaHash:lt,combine:f.combine,mapUv:me&&m(f.map.channel),aoMapUv:_e&&m(f.aoMap.channel),lightMapUv:Se&&m(f.lightMap.channel),bumpMapUv:Te&&m(f.bumpMap.channel),normalMapUv:A&&m(f.normalMap.channel),displacementMapUv:w&&m(f.displacementMap.channel),emissiveMapUv:I&&m(f.emissiveMap.channel),metalnessMapUv:D&&m(f.metalnessMap.channel),roughnessMapUv:x&&m(f.roughnessMap.channel),anisotropyMapUv:Pe&&m(f.anisotropyMap.channel),clearcoatMapUv:Ne&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:ye&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Le&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:we&&m(f.sheenRoughnessMap.channel),specularMapUv:ft&&m(f.specularMap.channel),specularColorMapUv:Ge&&m(f.specularColorMap.channel),specularIntensityMapUv:Xe&&m(f.specularIntensityMap.channel),transmissionMapUv:Oe&&m(f.transmissionMap.channel),thicknessMapUv:J&&m(f.thicknessMap.channel),alphaMapUv:Be&&m(f.alphaMap.channel),vertexTangents:!!S.attributes.tangent&&(A||F),vertexNormals:!!S.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!S.attributes.color&&S.attributes.color.itemSize===4,pointsUvs:y.isPoints===!0&&!!S.attributes.uv&&(me||Be),fog:!!T,useFog:f.fog===!0,fogExp2:!!T&&T.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||S.attributes.normal===void 0&&A===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:ae,skinning:y.isSkinnedMesh===!0,hasPositionAttribute:S.attributes.position!==void 0,morphTargets:S.morphAttributes.position!==void 0,morphNormals:S.morphAttributes.normal!==void 0,morphColors:S.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:$,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:b.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&g.length>0,shadowMapType:i.shadowMap.type,toneMapping:Et,decodeVideoTexture:me&&f.map.isVideoTexture===!0&&pt.getTransfer(f.map.colorSpace)===Lt,decodeVideoTextureEmissive:I&&f.emissiveMap.isVideoTexture===!0&&pt.getTransfer(f.emissiveMap.colorSpace)===Lt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===ai,flipSided:f.side===Sn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Ut&&f.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&f.extensions.multiDraw===!0||be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return St.vertexUv1s=c.has(1),St.vertexUv2s=c.has(2),St.vertexUv3s=c.has(3),c.clear(),St},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let g in f.defines)v.push(g),v.push(f.defines[g]);return f.isRawShaderMaterial===!1&&((function(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numSunLights),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numSunLightShadows),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)})(v,f),(function(g,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.retroreflection&&a.enable(24),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),g.push(a.mask)})(v,f),v.push(i.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=u[f.type],g;if(v){let _=di[v];g=Ud.clone(_.uniforms)}else g=f.uniforms;return g},acquireProgram:function(f,v){let g=h.get(v);return g!==void 0?++g.usedTimes:(g=new tx(i,v,f,r),l.push(g),h.set(v,g)),g},releaseProgram:function(f){if(--f.usedTimes===0){let v=l.indexOf(f);l[v]=l[l.length-1],l.pop(),h.delete(f.cacheKey),f.destroy()}},releaseShaderCache:function(f){o.remove(f)},programs:l,dispose:function(){o.dispose()}}}function sx(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function ax(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function tp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function np(){let i=[],e=0,t=[],n=[],r=[];function s(o){let c=0;return o.isInstancedMesh&&(c+=2),o.isSkinnedMesh&&(c+=1),c}function a(o,c,l,h,p,d){let u=i[e];return u===void 0?(u={id:o.id,object:o,geometry:c,material:l,materialVariant:s(o),groupOrder:h,renderOrder:o.renderOrder,z:p,group:d},i[e]=u):(u.id=o.id,u.object=o,u.geometry=c,u.material=l,u.materialVariant=s(o),u.groupOrder=h,u.renderOrder=o.renderOrder,u.z=p,u.group=d),e++,u}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,c,l,h,p,d,u){u.reversedDepth===!0&&(p=-p);let m=a(o,c,l,h,p,d);l.transmission>0?n.push(m):l.transparent===!0?r.push(m):t.push(m)},unshift:function(o,c,l,h,p,d){let u=a(o,c,l,h,p,d);l.transmission>0?n.unshift(u):l.transparent===!0?r.unshift(u):t.unshift(u)},finish:function(){for(let o=e,c=i.length;o<c;o++){let l=i[o];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(o,c){t.length>1&&t.sort(o||ax),n.length>1&&n.sort(c||tp),r.length>1&&r.sort(c||tp)}}}function ox(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new np,i.set(e,[r])):t>=n.length?(r=new np,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function lx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new C,color:new st};break;case"SpotLight":t={position:new C,direction:new C,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new C,halfWidth:new C,halfHeight:new C}}return i[e.id]=t,t}}}function cx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3}}return i[e.id]=t,t}}}var hx=0;function ux(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function dx(i){let e=new lx,t=cx(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new C);let r=new C,s=new rt,a=new rt;return{setup:function(o){let c=0,l=0,h=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let p=0,d=0,u=0,m=0,f=0,v=0,g=0,_=0,y=0,b=0,T=0,S=0,P=0,O=0;o.sort(ux);for(let N=0,j=o.length;N<j;N++){let U=o[N],Z=U.color,ee=U.intensity,se=U.distance,W=null;if(U.shadow&&U.shadow.map&&(W=U.shadow.map.texture.format===hr?U.shadow.map.texture:U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)c+=Z.r*ee,l+=Z.g*ee,h+=Z.b*ee;else if(U.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(U.sh.coefficients[G],ee);O++}else if(U.isSunLight){let G=e.get(U);if(G.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let $=U.shadow,he=t.get(U);he.shadowIntensity=$.intensity,he.shadowBias=$.bias,he.shadowNormalBias=$.normalBias,he.shadowRadius=$.radius,he.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[d]=he,n.sunShadowMap[d]=W;let ae=$.getViewportCount();for(let ie=0;ie<ae;ie++)n.sunShadowMatrix[u+ie]=$.getMatrix(ie),n.sunShadowCascade[u+ie]=$._cascadeData[ie];u+=ae,d++}n.sun[p]=G,p++}else if(U.isDirectionalLight){let G=e.get(U);if(G.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let $=U.shadow,he=t.get(U);he.shadowIntensity=$.intensity,he.shadowBias=$.bias,he.shadowNormalBias=$.normalBias,he.shadowRadius=$.radius,he.shadowMapSize=$.mapSize,n.directionalShadow[m]=he,n.directionalShadowMap[m]=W,n.directionalShadowMatrix[m]=U.shadow.matrix,y++}n.directional[m]=G,m++}else if(U.isSpotLight){let G=e.get(U);G.position.setFromMatrixPosition(U.matrixWorld),G.color.copy(Z).multiplyScalar(ee),G.distance=se,G.coneCos=Math.cos(U.angle),G.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),G.decay=U.decay,n.spot[v]=G;let $=U.shadow;if(U.map&&(n.spotLightMap[S]=U.map,S++,$.updateMatrices(U),U.castShadow&&P++),n.spotLightMatrix[v]=$.matrix,U.castShadow){let he=t.get(U);he.shadowIntensity=$.intensity,he.shadowBias=$.bias,he.shadowNormalBias=$.normalBias,he.shadowRadius=$.radius,he.shadowMapSize=$.mapSize,n.spotShadow[v]=he,n.spotShadowMap[v]=W,T++}v++}else if(U.isRectAreaLight){let G=e.get(U);G.color.copy(Z).multiplyScalar(ee),G.halfWidth.set(.5*U.width,0,0),G.halfHeight.set(0,.5*U.height,0),n.rectArea[g]=G,g++}else if(U.isPointLight){let G=e.get(U);if(G.color.copy(U.color).multiplyScalar(U.intensity),G.distance=U.distance,G.decay=U.decay,U.castShadow){let $=U.shadow,he=t.get(U);he.shadowIntensity=$.intensity,he.shadowBias=$.bias,he.shadowNormalBias=$.normalBias,he.shadowRadius=$.radius,he.shadowMapSize=$.mapSize,he.shadowCameraNear=$.camera.near,he.shadowCameraFar=$.camera.far,n.pointShadow[f]=he,n.pointShadowMap[f]=W,n.pointShadowMatrix[f]=U.shadow.matrix,b++}n.point[f]=G,f++}else if(U.isHemisphereLight){let G=e.get(U);G.skyColor.copy(U.color).multiplyScalar(ee),G.groundColor.copy(U.groundColor).multiplyScalar(ee),n.hemi[_]=G,_++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let z=n.hash;z.sunLength===p&&z.directionalLength===m&&z.pointLength===f&&z.spotLength===v&&z.rectAreaLength===g&&z.hemiLength===_&&z.numSunShadows===d&&z.numDirectionalShadows===y&&z.numPointShadows===b&&z.numSpotShadows===T&&z.numSpotMaps===S&&z.numLightProbes===O||(n.sun.length=p,n.directional.length=m,n.spot.length=v,n.rectArea.length=g,n.point.length=f,n.hemi.length=_,n.sunShadow.length=d,n.sunShadowMap.length=d,n.sunShadowMatrix.length=u,n.sunShadowCascade.length=u,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=T,n.spotShadowMap.length=T,n.spotLightMatrix.length=T+S-P,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=O,z.sunLength=p,z.directionalLength=m,z.pointLength=f,z.spotLength=v,z.rectAreaLength=g,z.hemiLength=_,z.numSunShadows=d,z.numDirectionalShadows=y,z.numPointShadows=b,z.numSpotShadows=T,z.numSpotMaps=S,z.numLightProbes=O,n.version=hx++)},setupView:function(o,c){let l=0,h=0,p=0,d=0,u=0,m=0,f=c.matrixWorldInverse;for(let v=0,g=o.length;v<g;v++){let _=o[v];if(_.isSunLight){let y=n.sun[l];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(f),l++}else if(_.isDirectionalLight){let y=n.directional[h];y.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(f),h++}else if(_.isSpotLight){let y=n.spot[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(f),y.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(f),d++}else if(_.isRectAreaLight){let y=n.rectArea[u];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(f),a.identity(),s.copy(_.matrixWorld),s.premultiply(f),a.extractRotation(s),y.halfWidth.set(.5*_.width,0,0),y.halfHeight.set(0,.5*_.height,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),u++}else if(_.isPointLight){let y=n.point[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){let y=n.hemi[m];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(f),m++}}},state:n}}function ip(i){let e=new dx(i),t=[],n=[],r=[],s={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,t.length=0,n.length=0,r.length=0},state:s,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){r.push(a)}}}function px(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new ip(i),e.set(t,[s])):n>=r.length?(s=new ip(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}var fx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mx=`uniform sampler2D shadow_pass;
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
}`,gx=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],_x=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],rp=new rt,Vs=new C,ch=new C;function vx(i,e,t){let n=new ki,r=new xe,s=new xe,a=new Pt,o=new ro,c=new so,l={},h=t.maxTextureSize,p={[zr]:Sn,[Sn]:zr,[ai]:ai},d=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:fx,fragmentShader:mx}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new vt;m.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let f=new yn(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ds;let g=this.type;function _(S,P){let O=e.update(f);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,u.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),S.mapPass===null?S.mapPass=new xn(r.x,r.y,{format:hr,type:ci}):S.mapPass.width===S.map.width&&S.mapPass.height===S.map.height||S.mapPass.setSize(S.map.width,S.map.height),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(P,null,O,d,f,null),u.uniforms.shadow_pass.value=S.mapPass.texture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(P,null,O,u,f,null)}function y(S,P,O,z){let N=null,j=O.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(j!==void 0)N=j;else if(N=O.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let U=N.uuid,Z=P.uuid,ee=l[U];ee===void 0&&(ee={},l[U]=ee);let se=ee[Z];se===void 0&&(se=N.clone(),ee[Z]=se,P.addEventListener("dispose",T)),N=se}return N.visible=P.visible,N.wireframe=P.wireframe,N.side=z===Br?P.shadowSide!==null?P.shadowSide:P.side:P.shadowSide!==null?P.shadowSide:p[P.side],N.alphaMap=P.alphaMap,N.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,N.map=P.map,N.clipShadows=P.clipShadows,N.clippingPlanes=P.clippingPlanes,N.clipIntersection=P.clipIntersection,N.displacementMap=P.displacementMap,N.displacementScale=P.displacementScale,N.displacementBias=P.displacementBias,N.wireframeLinewidth=P.wireframeLinewidth,N.linewidth=P.linewidth,O.isPointLight===!0&&N.isMeshDistanceMaterial===!0&&(i.properties.get(N).light=O),N}function b(S,P,O,z,N){if(S.visible===!1)return;if(S.layers.test(P.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&N===Br)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,S.matrixWorld);let U=e.update(S),Z=S.material;if(Array.isArray(Z)){let ee=U.groups;for(let se=0,W=ee.length;se<W;se++){let G=ee[se],$=Z[G.materialIndex];if($&&$.visible){let he=y(S,$,z,N);S.onBeforeShadow(i,S,P,O,U,he,G),i.renderBufferDirect(O,null,U,he,S,G),S.onAfterShadow(i,S,P,O,U,he,G)}}}else if(Z.visible){let ee=y(S,Z,z,N);S.onBeforeShadow(i,S,P,O,U,ee,null),i.renderBufferDirect(O,null,U,ee,S,null),S.onAfterShadow(i,S,P,O,U,ee,null)}}let j=S.children;for(let U=0,Z=j.length;U<Z;U++)b(j[U],P,O,z,N)}function T(S){S.target.removeEventListener("dispose",T);for(let P in l){let O=l[P],z=S.target.uuid;z in O&&(O[z].dispose(),delete O[z])}}this.render=function(S,P,O){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||S.length===0)return;this.type===Vu&&(We("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ds);let z=i.getRenderTarget(),N=i.getActiveCubeFace(),j=i.getActiveMipmapLevel(),U=i.state;U.setBlending(oi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let Z=g!==this.type;Z&&P.traverse(function(ee){ee.material&&(Array.isArray(ee.material)?ee.material.forEach(se=>se.needsUpdate=!0):ee.material.needsUpdate=!0)});for(let ee=0,se=S.length;ee<se;ee++){let W=S[ee],G=W.shadow;if(G===void 0){We("WebGLShadowMap:",W,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);let $=G.getFrameExtents();r.multiply($),s.copy(G.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/$.x),r.x=s.x*$.x,G.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/$.y),r.y=s.y*$.y,G.mapSize.y=s.y));let he=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=he,G.map===null||Z===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Br){if(W.isPointLight){We("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new xn(r.x,r.y,{format:hr,type:ci,minFilter:Mn,magFilter:Mn,generateMipmaps:!1}),G.map.texture.name=W.name+".shadowMap",G.map.depthTexture=new Gi(r.x,r.y,Jn),G.map.depthTexture.name=W.name+".shadowMapDepth",G.map.depthTexture.format=lr,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=li,G.map.depthTexture.magFilter=li}else W.isPointLight?(G.map=new Bo(r.x),G.map.depthTexture=new Na(r.x,ji)):(G.map=new xn(r.x,r.y),G.map.depthTexture=new Gi(r.x,r.y,ji)),G.map.depthTexture.name=W.name+".shadowMap",G.map.depthTexture.format=lr,this.type===Ds?(G.map.depthTexture.compareFunction=he?Do:No,G.map.depthTexture.minFilter=Mn,G.map.depthTexture.magFilter=Mn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=li,G.map.depthTexture.magFilter=li);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget===!0||G.map.width===r.x&&G.map.height===r.y||G.map.setSize(r.x,r.y);let ae=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();W.isPointLight!==!0&&G.updateMatrices(W,O);for(let ie=0;ie<ae;ie++){let be=G.getCamera(ie);if(W.isPointLight){let me=G.camera,oe=G.matrix,re=W.distance||me.far;re!==me.far&&(me.far=re,me.updateProjectionMatrix()),Vs.setFromMatrixPosition(W.matrixWorld),me.position.copy(Vs),ch.copy(me.position),ch.add(gx[ie]),me.up.copy(_x[ie]),me.lookAt(ch),me.updateMatrixWorld(),oe.makeTranslation(-Vs.x,-Vs.y,-Vs.z),rp.multiplyMatrices(me.projectionMatrix,me.matrixWorldInverse),G._frustum.setFromProjectionMatrix(rp,me.coordinateSystem,me.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,ie),i.clear();else{ie===0&&(i.setRenderTarget(G.map),i.clear());let me=G.getViewport(ie);a.set(s.x*me.x,s.y*me.y,s.x*me.z,s.y*me.w),U.viewport(a)}n=G.getFrustum(ie),b(P,O,be,W,this.type)}G.isPointLightShadow!==!0&&this.type===Br&&_(G,O),G.needsUpdate=!1}g=this.type,v.needsUpdate=!1,i.setRenderTarget(z,N,j)}}function xx(i,e){let t=new function(){let x=!1,F=new Pt,L=null,R=new Pt(0,0,0,0);return{setMask:function(X){L===X||x||(i.colorMask(X,X,X,X),L=X)},setLocked:function(X){x=X},setClear:function(X,Y,te,pe,Pe){Pe===!0&&(X*=pe,Y*=pe,te*=pe),F.set(X,Y,te,pe),R.equals(F)===!1&&(i.clearColor(X,Y,te,pe),R.copy(F))},reset:function(){x=!1,L=null,R.set(-1,0,0,0)}}},n=new function(){let x=!1,F=!1,L=null,R=null,X=null;return{setReversed:function(Y){if(F!==Y){let te=e.get("EXT_clip_control");Y?te.clipControlEXT(te.LOWER_LEFT_EXT,te.ZERO_TO_ONE_EXT):te.clipControlEXT(te.LOWER_LEFT_EXT,te.NEGATIVE_ONE_TO_ONE_EXT),F=Y;let pe=X;X=null,this.setClear(pe)}},getReversed:function(){return F},setTest:function(Y){Y?re(i.DEPTH_TEST):_e(i.DEPTH_TEST)},setMask:function(Y){L===Y||x||(i.depthMask(Y),L=Y)},setFunc:function(Y){if(F&&(Y=Cd[Y]),R!==Y){switch(Y){case jl:i.depthFunc(i.NEVER);break;case ql:i.depthFunc(i.ALWAYS);break;case Yl:i.depthFunc(i.LESS);break;case yo:i.depthFunc(i.LEQUAL);break;case $l:i.depthFunc(i.EQUAL);break;case Zl:i.depthFunc(i.GEQUAL);break;case Jl:i.depthFunc(i.GREATER);break;case Kl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}R=Y}},setLocked:function(Y){x=Y},setClear:function(Y){X!==Y&&(X=Y,F&&(Y=1-Y),i.clearDepth(Y))},reset:function(){x=!1,L=null,R=null,X=null,F=!1}}},r=new function(){let x=!1,F=null,L=null,R=null,X=null,Y=null,te=null,pe=null,Pe=null;return{setTest:function(Ne){x||(Ne?re(i.STENCIL_TEST):_e(i.STENCIL_TEST))},setMask:function(Ne){F===Ne||x||(i.stencilMask(Ne),F=Ne)},setFunc:function(Ne,ye,Le){L===Ne&&R===ye&&X===Le||(i.stencilFunc(Ne,ye,Le),L=Ne,R=ye,X=Le)},setOp:function(Ne,ye,Le){Y===Ne&&te===ye&&pe===Le||(i.stencilOp(Ne,ye,Le),Y=Ne,te=ye,pe=Le)},setLocked:function(Ne){x=Ne},setClear:function(Ne){Pe!==Ne&&(i.clearStencil(Ne),Pe=Ne)},reset:function(){x=!1,F=null,L=null,R=null,X=null,Y=null,te=null,pe=null,Pe=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,y=null,b=null,T=new st(0,0,0),S=0,P=!1,O=null,z=null,N=null,j=null,U=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ee=!1,se=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(W)[1]),ee=se>=1):W.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),ee=se>=2);let G=null,$={},he=i.getParameter(i.SCISSOR_BOX),ae=i.getParameter(i.VIEWPORT),ie=new Pt().fromArray(he),be=new Pt().fromArray(ae);function me(x,F,L,R){let X=new Uint8Array(4),Y=i.createTexture();i.bindTexture(x,Y),i.texParameteri(x,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(x,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let te=0;te<L;te++)x===i.TEXTURE_3D||x===i.TEXTURE_2D_ARRAY?i.texImage3D(F,0,i.RGBA,1,1,R,0,i.RGBA,i.UNSIGNED_BYTE,X):i.texImage2D(F+te,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,X);return Y}let oe={};function re(x){o[x]!==!0&&(i.enable(x),o[x]=!0)}function _e(x){o[x]!==!1&&(i.disable(x),o[x]=!1)}oe[i.TEXTURE_2D]=me(i.TEXTURE_2D,i.TEXTURE_2D,1),oe[i.TEXTURE_CUBE_MAP]=me(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[i.TEXTURE_2D_ARRAY]=me(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),oe[i.TEXTURE_3D]=me(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),re(i.DEPTH_TEST),n.setFunc(yo),w(!1),I(Hl),re(i.CULL_FACE),A(oi);let Se={[Vr]:i.FUNC_ADD,[Gu]:i.FUNC_SUBTRACT,[Hu]:i.FUNC_REVERSE_SUBTRACT};Se[Wu]=i.MIN,Se[Xu]=i.MAX;let Te={[ju]:i.ZERO,[qu]:i.ONE,[Yu]:i.SRC_COLOR,[Zu]:i.SRC_ALPHA,[nd]:i.SRC_ALPHA_SATURATE,[ed]:i.DST_COLOR,[Ku]:i.DST_ALPHA,[$u]:i.ONE_MINUS_SRC_COLOR,[Ju]:i.ONE_MINUS_SRC_ALPHA,[td]:i.ONE_MINUS_DST_COLOR,[Qu]:i.ONE_MINUS_DST_ALPHA,[id]:i.CONSTANT_COLOR,[rd]:i.ONE_MINUS_CONSTANT_COLOR,[sd]:i.CONSTANT_ALPHA,[ad]:i.ONE_MINUS_CONSTANT_ALPHA};function A(x,F,L,R,X,Y,te,pe,Pe,Ne){if(x!==oi){if(u===!1&&(re(i.BLEND),u=!0),x===ku)X=X||F,Y=Y||L,te=te||R,F===f&&X===_||(i.blendEquationSeparate(Se[F],Se[X]),f=F,_=X),L===v&&R===g&&Y===y&&te===b||(i.blendFuncSeparate(Te[L],Te[R],Te[Y],Te[te]),v=L,g=R,y=Y,b=te),pe.equals(T)!==!1&&Pe===S||(i.blendColor(pe.r,pe.g,pe.b,Pe),T.copy(pe),S=Pe),m=x,P=!1;else if(x!==m||Ne!==P){if(f===Vr&&_===Vr||(i.blendEquation(i.FUNC_ADD),f=Vr,_=Vr),Ne)switch(x){case Xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Us:i.blendFunc(i.ONE,i.ONE);break;case Wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qe("WebGLState: Invalid blending: ",x)}else switch(x){case Xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Wl:qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xl:qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qe("WebGLState: Invalid blending: ",x)}v=null,g=null,y=null,b=null,T.set(0,0,0),S=0,m=x,P=Ne}}else u===!0&&(_e(i.BLEND),u=!1)}function w(x){O!==x&&(x?i.frontFace(i.CW):i.frontFace(i.CCW),O=x)}function I(x){x!==Bu?(re(i.CULL_FACE),x!==z&&(x===Hl?i.cullFace(i.BACK):x===zu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_e(i.CULL_FACE),z=x}function D(x,F,L){x?(re(i.POLYGON_OFFSET_FILL),j===F&&U===L||(j=F,U=L,n.getReversed()&&(F=-F),i.polygonOffset(F,L))):_e(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:re,disable:_e,bindFramebuffer:function(x,F){return l[x]!==F&&(i.bindFramebuffer(x,F),l[x]=F,x===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=F),x===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=F),!0)},drawBuffers:function(x,F){let L=p,R=!1;if(x){L=h.get(F),L===void 0&&(L=[],h.set(F,L));let X=x.textures;if(L.length!==X.length||L[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,te=X.length;Y<te;Y++)L[Y]=i.COLOR_ATTACHMENT0+Y;L.length=X.length,R=!0}}else L[0]!==i.BACK&&(L[0]=i.BACK,R=!0);R&&i.drawBuffers(L)},useProgram:function(x){return d!==x&&(i.useProgram(x),d=x,!0)},setBlending:A,setMaterial:function(x,F){x.side===ai?_e(i.CULL_FACE):re(i.CULL_FACE);let L=x.side===Sn;F&&(L=!L),w(L),x.blending===Xi&&x.transparent===!1?A(oi):A(x.blending,x.blendEquation,x.blendSrc,x.blendDst,x.blendEquationAlpha,x.blendSrcAlpha,x.blendDstAlpha,x.blendColor,x.blendAlpha,x.premultipliedAlpha),n.setFunc(x.depthFunc),n.setTest(x.depthTest),n.setMask(x.depthWrite),t.setMask(x.colorWrite);let R=x.stencilWrite;r.setTest(R),R&&(r.setMask(x.stencilWriteMask),r.setFunc(x.stencilFunc,x.stencilRef,x.stencilFuncMask),r.setOp(x.stencilFail,x.stencilZFail,x.stencilZPass)),D(x.polygonOffset,x.polygonOffsetFactor,x.polygonOffsetUnits),x.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):_e(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:w,setCullFace:I,setLineWidth:function(x){x!==N&&(ee&&i.lineWidth(x),N=x)},setPolygonOffset:D,setScissorTest:function(x){x?re(i.SCISSOR_TEST):_e(i.SCISSOR_TEST)},activeTexture:function(x){x===void 0&&(x=i.TEXTURE0+Z-1),G!==x&&(i.activeTexture(x),G=x)},bindTexture:function(x,F,L){L===void 0&&(L=G===null?i.TEXTURE0+Z-1:G);let R=$[L];R===void 0&&(R={type:void 0,texture:void 0},$[L]=R),R.type===x&&R.texture===F||(G!==L&&(i.activeTexture(L),G=L),i.bindTexture(x,F||oe[x]),R.type=x,R.texture=F)},unbindTexture:function(){let x=$[G];x!==void 0&&x.type!==void 0&&(i.bindTexture(x.type,null),x.type=void 0,x.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(x){qe("WebGLState:",x)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(x){qe("WebGLState:",x)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(x){qe("WebGLState:",x)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(x){qe("WebGLState:",x)}},pixelStorei:function(x,F){c[x]!==F&&(i.pixelStorei(x,F),c[x]=F)},getParameter:function(x){return c[x]!==void 0?c[x]:i.getParameter(x)},updateUBOMapping:function(x,F){let L=a.get(F);L===void 0&&(L=new WeakMap,a.set(F,L));let R=L.get(x);R===void 0&&(R=i.getUniformBlockIndex(F,x.name),L.set(x,R))},uniformBlockBinding:function(x,F){let L=a.get(F).get(x);s.get(F)!==L&&(i.uniformBlockBinding(F,L,x.__bindingPointIndex),s.set(F,L))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(x){qe("WebGLState:",x)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(x){qe("WebGLState:",x)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(x){qe("WebGLState:",x)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(x){qe("WebGLState:",x)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(x){qe("WebGLState:",x)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(x){qe("WebGLState:",x)}},scissor:function(x){ie.equals(x)===!1&&(i.scissor(x.x,x.y,x.z,x.w),ie.copy(x))},viewport:function(x){be.equals(x)===!1&&(i.viewport(x.x,x.y,x.z,x.w),be.copy(x))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),o={},c={},G=null,$={},l={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,y=null,b=null,T=new st(0,0,0),S=0,P=!1,O=null,z=null,N=null,j=null,U=null,ie.set(0,0,i.canvas.width,i.canvas.height),be.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function yx(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new xe,h=new WeakMap,p=new Set,d,u=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(A,w){return m?new OffscreenCanvas(A,w):hs("canvas")}function v(A,w,I){let D=1,x=Te(A);if((x.width>I||x.height>I)&&(D=I/Math.max(x.width,x.height)),D<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let F=Math.floor(D*x.width),L=Math.floor(D*x.height);d===void 0&&(d=f(F,L));let R=w?f(F,L):d;return R.width=F,R.height=L,R.getContext("2d").drawImage(A,0,0,F,L),We("WebGLRenderer: Texture has been resized from ("+x.width+"x"+x.height+") to ("+F+"x"+L+")."),R}return"data"in A&&We("WebGLRenderer: Image in DataTexture is too big ("+x.width+"x"+x.height+")."),A}return A}function g(A){return A.generateMipmaps}function _(A){i.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(A,w,I,D,x,F=!1){if(A!==null){if(i[A]!==void 0)return i[A];We("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let L;D&&(L=e.get("EXT_texture_norm16"),L||We("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let R=w;if(w===i.RED&&(I===i.FLOAT&&(R=i.R32F),I===i.HALF_FLOAT&&(R=i.R16F),I===i.UNSIGNED_BYTE&&(R=i.R8),I===i.UNSIGNED_SHORT&&L&&(R=L.R16_EXT),I===i.SHORT&&L&&(R=L.R16_SNORM_EXT)),w===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(R=i.R8UI),I===i.UNSIGNED_SHORT&&(R=i.R16UI),I===i.UNSIGNED_INT&&(R=i.R32UI),I===i.BYTE&&(R=i.R8I),I===i.SHORT&&(R=i.R16I),I===i.INT&&(R=i.R32I)),w===i.RG&&(I===i.FLOAT&&(R=i.RG32F),I===i.HALF_FLOAT&&(R=i.RG16F),I===i.UNSIGNED_BYTE&&(R=i.RG8),I===i.UNSIGNED_SHORT&&L&&(R=L.RG16_EXT),I===i.SHORT&&L&&(R=L.RG16_SNORM_EXT)),w===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(R=i.RG8UI),I===i.UNSIGNED_SHORT&&(R=i.RG16UI),I===i.UNSIGNED_INT&&(R=i.RG32UI),I===i.BYTE&&(R=i.RG8I),I===i.SHORT&&(R=i.RG16I),I===i.INT&&(R=i.RG32I)),w===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(R=i.RGB8UI),I===i.UNSIGNED_SHORT&&(R=i.RGB16UI),I===i.UNSIGNED_INT&&(R=i.RGB32UI),I===i.BYTE&&(R=i.RGB8I),I===i.SHORT&&(R=i.RGB16I),I===i.INT&&(R=i.RGB32I)),w===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(R=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(R=i.RGBA16UI),I===i.UNSIGNED_INT&&(R=i.RGBA32UI),I===i.BYTE&&(R=i.RGBA8I),I===i.SHORT&&(R=i.RGBA16I),I===i.INT&&(R=i.RGBA32I)),w===i.RGB&&(I===i.UNSIGNED_SHORT&&L&&(R=L.RGB16_EXT),I===i.SHORT&&L&&(R=L.RGB16_SNORM_EXT),I===i.UNSIGNED_INT_5_9_9_9_REV&&(R=i.RGB9_E5),I===i.UNSIGNED_INT_10F_11F_11F_REV&&(R=i.R11F_G11F_B10F)),w===i.RGBA){let X=F?Wc:pt.getTransfer(x);I===i.FLOAT&&(R=i.RGBA32F),I===i.HALF_FLOAT&&(R=i.RGBA16F),I===i.UNSIGNED_BYTE&&(R=X===Lt?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT&&L&&(R=L.RGBA16_EXT),I===i.SHORT&&L&&(R=L.RGBA16_SNORM_EXT),I===i.UNSIGNED_SHORT_4_4_4_4&&(R=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(R=i.RGB5_A1)}return R!==i.R16F&&R!==i.R32F&&R!==i.RG16F&&R!==i.RG32F&&R!==i.RGBA16F&&R!==i.RGBA32F||e.get("EXT_color_buffer_float"),R}function T(A,w){let I;return A?w===null||w===ji||w===Gr?I=i.DEPTH24_STENCIL8:w===Jn?I=i.DEPTH32F_STENCIL8:w===Bs&&(I=i.DEPTH24_STENCIL8,We("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===ji||w===Gr?I=i.DEPTH_COMPONENT24:w===Jn?I=i.DEPTH_COMPONENT32F:w===Bs&&(I=i.DEPTH_COMPONENT16),I}function S(A,w){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==li&&A.minFilter!==Mn?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function P(A){let w=A.target;w.removeEventListener("dispose",P),(function(I){let D=n.get(I);if(D.__webglInit===void 0)return;let x=I.source,F=u.get(x);if(F){let L=F[D.__cacheKey];L.usedTimes--,L.usedTimes===0&&z(I),Object.keys(F).length===0&&u.delete(x)}n.remove(I)})(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&p.delete(w)}function O(A){let w=A.target;w.removeEventListener("dispose",O),(function(I){let D=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(D.__webglFramebuffer[F]))for(let L=0;L<D.__webglFramebuffer[F].length;L++)i.deleteFramebuffer(D.__webglFramebuffer[F][L]);else i.deleteFramebuffer(D.__webglFramebuffer[F]);D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer[F])}else{if(Array.isArray(D.__webglFramebuffer))for(let F=0;F<D.__webglFramebuffer.length;F++)i.deleteFramebuffer(D.__webglFramebuffer[F]);else i.deleteFramebuffer(D.__webglFramebuffer);if(D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer),D.__webglMultisampledFramebuffer&&i.deleteFramebuffer(D.__webglMultisampledFramebuffer),D.__webglColorRenderbuffer)for(let F=0;F<D.__webglColorRenderbuffer.length;F++)D.__webglColorRenderbuffer[F]&&i.deleteRenderbuffer(D.__webglColorRenderbuffer[F]);D.__webglDepthRenderbuffer&&i.deleteRenderbuffer(D.__webglDepthRenderbuffer)}let x=I.textures;for(let F=0,L=x.length;F<L;F++){let R=n.get(x[F]);R.__webglTexture&&(i.deleteTexture(R.__webglTexture),a.memory.textures--),n.remove(x[F])}n.remove(I)})(w)}function z(A){let w=n.get(A);i.deleteTexture(w.__webglTexture);let I=A.source;delete u.get(I)[w.__cacheKey],a.memory.textures--}let N=0;function j(A,w){let I=n.get(A);if(A.isVideoTexture&&(function(D){let x=a.render.frame;h.get(D)!==x&&(h.set(D,x),D.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&I.__version!==A.version){let D=A.image;if(D===null)We("WebGLRenderer: Texture marked for update but no image data found.");else{if(D.complete!==!1)return void $(I,A,w);We("WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(I.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+w)}let U={[hd]:i.REPEAT,[bo]:i.CLAMP_TO_EDGE,[ud]:i.MIRRORED_REPEAT},Z={[li]:i.NEAREST,[dd]:i.NEAREST_MIPMAP_NEAREST,[Fs]:i.NEAREST_MIPMAP_LINEAR,[Mn]:i.LINEAR,[To]:i.LINEAR_MIPMAP_NEAREST,[or]:i.LINEAR_MIPMAP_LINEAR},ee={[yd]:i.NEVER,[Ed]:i.ALWAYS,[Sd]:i.LESS,[No]:i.LEQUAL,[Md]:i.EQUAL,[Do]:i.GEQUAL,[bd]:i.GREATER,[Td]:i.NOTEQUAL};function se(A,w){if(w.type!==Jn||e.has("OES_texture_float_linear")!==!1||w.magFilter!==Mn&&w.magFilter!==To&&w.magFilter!==Fs&&w.magFilter!==or&&w.minFilter!==Mn&&w.minFilter!==To&&w.minFilter!==Fs&&w.minFilter!==or||We("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,U[w.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,U[w.wrapT]),A!==i.TEXTURE_3D&&A!==i.TEXTURE_2D_ARRAY||i.texParameteri(A,i.TEXTURE_WRAP_R,U[w.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Z[w.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Z[w.minFilter]),w.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ee[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===li||w.minFilter!==Fs&&w.minFilter!==or||w.type===Jn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function W(A,w){let I=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",P));let D=w.source,x=u.get(D);x===void 0&&(x={},u.set(D,x));let F=(function(L){let R=[];return R.push(L.wrapS),R.push(L.wrapT),R.push(L.wrapR||0),R.push(L.magFilter),R.push(L.minFilter),R.push(L.anisotropy),R.push(L.internalFormat),R.push(L.format),R.push(L.type),R.push(L.generateMipmaps),R.push(L.premultiplyAlpha),R.push(L.flipY),R.push(L.unpackAlignment),R.push(L.colorSpace),R.join()})(w);if(F!==A.__cacheKey){x[F]===void 0&&(x[F]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,I=!0),x[F].usedTimes++;let L=x[A.__cacheKey];L!==void 0&&(x[A.__cacheKey].usedTimes--,L.usedTimes===0&&z(w)),A.__cacheKey=F,A.__webglTexture=x[F].texture}return I}function G(A,w,I){return Math.floor(Math.floor(A/I)/w)}function $(A,w,I){let D=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(D=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(D=i.TEXTURE_3D);let x=W(A,w),F=w.source;t.bindTexture(D,A.__webglTexture,i.TEXTURE0+I);let L=n.get(F);if(F.version!==L.__version||x===!0){if(t.activeTexture(i.TEXTURE0+I),!(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)){let ve=pt.getPrimaries(pt.workingColorSpace),ge=w.colorSpace===ur?null:pt.getPrimaries(w.colorSpace),we=w.colorSpace===ur||ve===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment);let R=v(w.image,!1,r.maxTextureSize);R=Se(w,R);let X=s.convert(w.format,w.colorSpace),Y=s.convert(w.type),te,pe=b(w.internalFormat,X,Y,w.normalized,w.colorSpace,w.isVideoTexture);se(D,w);let Pe=w.mipmaps,Ne=w.isVideoTexture!==!0,ye=L.__version===void 0||x===!0,Le=F.dataReady,de=S(w,R);if(w.isDepthTexture)pe=T(w.format===cr,w.type),ye&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,pe,R.width,R.height):t.texImage2D(i.TEXTURE_2D,0,pe,R.width,R.height,0,X,Y,null));else if(w.isDataTexture)if(Pe.length>0){Ne&&ye&&t.texStorage2D(i.TEXTURE_2D,de,pe,Pe[0].width,Pe[0].height);for(let ve=0,ge=Pe.length;ve<ge;ve++)te=Pe[ve],Ne?Le&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,te.width,te.height,X,Y,te.data):t.texImage2D(i.TEXTURE_2D,ve,pe,te.width,te.height,0,X,Y,te.data);w.generateMipmaps=!1}else Ne?(ye&&t.texStorage2D(i.TEXTURE_2D,de,pe,R.width,R.height),Le&&(function(ve,ge,we,ft){let Ge=ve.updateRanges;if(Ge.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge.width,ge.height,we,ft,ge.data);else{Ge.sort((Be,yt)=>Be.start-yt.start);let Xe=0;for(let Be=1;Be<Ge.length;Be++){let yt=Ge[Xe],lt=Ge[Be],Ut=yt.start+yt.count,Et=G(lt.start,ge.width,4),St=G(yt.start,ge.width,4);lt.start<=Ut+1&&Et===St&&G(lt.start+lt.count-1,ge.width,4)===Et?yt.count=Math.max(yt.count,lt.start+lt.count-yt.start):(++Xe,Ge[Xe]=lt)}Ge.length=Xe+1;let Oe=t.getParameter(i.UNPACK_ROW_LENGTH),J=t.getParameter(i.UNPACK_SKIP_PIXELS),gt=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,ge.width);for(let Be=0,yt=Ge.length;Be<yt;Be++){let lt=Ge[Be],Ut=Math.floor(lt.start/4),Et=Math.ceil(lt.count/4),St=Ut%ge.width,wt=Math.floor(Ut/ge.width),Tn=Et;t.pixelStorei(i.UNPACK_SKIP_PIXELS,St),t.pixelStorei(i.UNPACK_SKIP_ROWS,wt),t.texSubImage2D(i.TEXTURE_2D,0,St,wt,Tn,1,we,ft,ge.data)}ve.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Oe),t.pixelStorei(i.UNPACK_SKIP_PIXELS,J),t.pixelStorei(i.UNPACK_SKIP_ROWS,gt)}})(w,R,X,Y)):t.texImage2D(i.TEXTURE_2D,0,pe,R.width,R.height,0,X,Y,R.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ne&&ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,pe,Pe[0].width,Pe[0].height,R.depth);for(let ve=0,ge=Pe.length;ve<ge;ve++)if(te=Pe[ve],w.format!==hi)if(X!==null)if(Ne){if(Le)if(w.layerUpdates.size>0){let we=Kc(te.width,te.height,w.format,w.type);for(let ft of w.layerUpdates){let Ge=te.data.subarray(ft*we/te.data.BYTES_PER_ELEMENT,(ft+1)*we/te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,ft,te.width,te.height,1,X,Ge)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,0,te.width,te.height,R.depth,X,te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ve,pe,te.width,te.height,R.depth,0,te.data,0,0);else We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?Le&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,0,te.width,te.height,R.depth,X,Y,te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ve,pe,te.width,te.height,R.depth,0,X,Y,te.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Ne&&ye&&t.texStorage2D(i.TEXTURE_2D,de,pe,Pe[0].width,Pe[0].height);for(let ve=0,ge=Pe.length;ve<ge;ve++)te=Pe[ve],w.format!==hi?X!==null?Ne?Le&&t.compressedTexSubImage2D(i.TEXTURE_2D,ve,0,0,te.width,te.height,X,te.data):t.compressedTexImage2D(i.TEXTURE_2D,ve,pe,te.width,te.height,0,te.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?Le&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,te.width,te.height,X,Y,te.data):t.texImage2D(i.TEXTURE_2D,ve,pe,te.width,te.height,0,X,Y,te.data)}else if(w.isDataArrayTexture)if(Ne){if(ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,pe,R.width,R.height,R.depth),Le)if(w.layerUpdates.size>0){let ve=Kc(R.width,R.height,w.format,w.type);for(let ge of w.layerUpdates){let we=R.data.subarray(ge*ve/R.data.BYTES_PER_ELEMENT,(ge+1)*ve/R.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ge,R.width,R.height,1,X,Y,we)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,R.width,R.height,R.depth,X,Y,R.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,pe,R.width,R.height,R.depth,0,X,Y,R.data);else if(w.isData3DTexture)Ne?(ye&&t.texStorage3D(i.TEXTURE_3D,de,pe,R.width,R.height,R.depth),Le&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,R.width,R.height,R.depth,X,Y,R.data)):t.texImage3D(i.TEXTURE_3D,0,pe,R.width,R.height,R.depth,0,X,Y,R.data);else if(w.isFramebufferTexture){if(ye)if(Ne)t.texStorage2D(i.TEXTURE_2D,de,pe,R.width,R.height);else{let ve=R.width,ge=R.height;for(let we=0;we<de;we++)t.texImage2D(i.TEXTURE_2D,we,pe,ve,ge,0,X,Y,null),ve>>=1,ge>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in i){let ve=i.canvas;if(ve.hasAttribute("layoutsubtree")||ve.setAttribute("layoutsubtree","true"),R.parentNode!==ve)return ve.appendChild(R),p.add(w),ve.onpaint=ge=>{let we=ge.changedElements;for(let ft of p)we.includes(ft.image)&&(ft.needsUpdate=!0)},void ve.requestPaint();if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,R);else{let we=i.RGBA,ft=i.RGBA,Ge=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,we,ft,Ge,R)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(Ne&&ye){let ve=Te(Pe[0]);t.texStorage2D(i.TEXTURE_2D,de,pe,ve.width,ve.height)}for(let ve=0,ge=Pe.length;ve<ge;ve++)te=Pe[ve],Ne?Le&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,X,Y,te):t.texImage2D(i.TEXTURE_2D,ve,pe,X,Y,te);w.generateMipmaps=!1}else if(Ne){if(ye){let ve=Te(R);t.texStorage2D(i.TEXTURE_2D,de,pe,ve.width,ve.height)}Le&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,X,Y,R)}else t.texImage2D(i.TEXTURE_2D,0,pe,X,Y,R);g(w)&&_(D),L.__version=F.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function he(A,w,I,D,x,F){let L=s.convert(I.format,I.colorSpace),R=s.convert(I.type),X=b(I.internalFormat,L,R,I.normalized,I.colorSpace),Y=n.get(w),te=n.get(I);if(te.__renderTarget=w,!Y.__hasExternalTextures){let pe=Math.max(1,w.width>>F),Pe=Math.max(1,w.height>>F);x===i.TEXTURE_3D||x===i.TEXTURE_2D_ARRAY?t.texImage3D(x,F,X,pe,Pe,w.depth,0,L,R,null):t.texImage2D(x,F,X,pe,Pe,0,L,R,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),_e(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,D,x,te.__webglTexture,0,re(w)):(x===i.TEXTURE_2D||x>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&x<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,D,x,te.__webglTexture,F),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(A,w,I){if(i.bindRenderbuffer(i.RENDERBUFFER,A),w.depthBuffer){let D=w.depthTexture,x=D&&D.isDepthTexture?D.type:null,F=T(w.stencilBuffer,x),L=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_e(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re(w),F,w.width,w.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,re(w),F,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,F,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,L,i.RENDERBUFFER,A)}else{let D=w.textures;for(let x=0;x<D.length;x++){let F=D[x],L=s.convert(F.format,F.colorSpace),R=s.convert(F.type),X=b(F.internalFormat,L,R,F.normalized,F.colorSpace);_e(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re(w),X,w.width,w.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,re(w),X,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,X,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ie(A,w,I){let D=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!w.depthTexture||!w.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let x=n.get(w.depthTexture);if(x.__renderTarget=w,x.__webglTexture&&w.depthTexture.image.width===w.width&&w.depthTexture.image.height===w.height||(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),D){if(x.__webglInit===void 0&&(x.__webglInit=!0,w.depthTexture.addEventListener("dispose",P)),x.__webglTexture===void 0){x.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,x.__webglTexture),se(i.TEXTURE_CUBE_MAP,w.depthTexture);let Y=s.convert(w.depthTexture.format),te=s.convert(w.depthTexture.type),pe;w.depthTexture.format===lr?pe=i.DEPTH_COMPONENT24:w.depthTexture.format===cr&&(pe=i.DEPTH24_STENCIL8);for(let Pe=0;Pe<6;Pe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,pe,w.width,w.height,0,Y,te,null)}}else j(w.depthTexture,0);let F=x.__webglTexture,L=re(w),R=D?i.TEXTURE_CUBE_MAP_POSITIVE_X+I:i.TEXTURE_2D,X=w.depthTexture.format===cr?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(w.depthTexture.format===lr)_e(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,R,F,0,L):i.framebufferTexture2D(i.FRAMEBUFFER,X,R,F,0);else{if(w.depthTexture.format!==cr)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");_e(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,R,F,0,L):i.framebufferTexture2D(i.FRAMEBUFFER,X,R,F,0)}}function be(A){let w=n.get(A),I=A.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==A.depthTexture){let D=A.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),D){let x=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,D.removeEventListener("dispose",x)};D.addEventListener("dispose",x),w.__depthDisposeCallback=x}w.__boundDepthTexture=D}if(A.depthTexture&&!w.__autoAllocateDepthBuffer)if(I)for(let D=0;D<6;D++)ie(w.__webglFramebuffer[D],A,D);else{let D=A.texture.mipmaps;D&&D.length>0?ie(w.__webglFramebuffer[0],A,0):ie(w.__webglFramebuffer,A,0)}else if(I){w.__webglDepthbuffer=[];for(let D=0;D<6;D++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[D]),w.__webglDepthbuffer[D]===void 0)w.__webglDepthbuffer[D]=i.createRenderbuffer(),ae(w.__webglDepthbuffer[D],A,!1);else{let x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,F=w.__webglDepthbuffer[D];i.bindRenderbuffer(i.RENDERBUFFER,F),i.framebufferRenderbuffer(i.FRAMEBUFFER,x,i.RENDERBUFFER,F)}}else{let D=A.texture.mipmaps;if(D&&D.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),ae(w.__webglDepthbuffer,A,!1);else{let x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,F=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,F),i.framebufferRenderbuffer(i.FRAMEBUFFER,x,i.RENDERBUFFER,F)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let me=[],oe=[];function re(A){return Math.min(r.maxSamples,A.samples)}function _e(A){let w=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Se(A,w){let I=A.colorSpace,D=A.format,x=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||I!==Lo&&I!==ur&&(pt.getTransfer(I)===Lt?D===hi&&x===Zn||We("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qe("WebGLTextures: Unsupported texture color space:",I)),w}function Te(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=N;return A>=r.maxTextures&&We("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),N+=1,A},this.resetTextureUnits=function(){N=0},this.getTextureUnits=function(){return N},this.setTextureUnits=function(A){N=A},this.setTexture2D=j,this.setTexture2DArray=function(A,w){let I=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&I.__version!==A.version?$(I,A,w):(A.isExternalTexture&&(I.__webglTexture=A.sourceTexture?A.sourceTexture:null),t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+w))},this.setTexture3D=function(A,w){let I=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&I.__version!==A.version?$(I,A,w):t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+w)},this.setTextureCube=function(A,w){let I=n.get(A);A.isCubeDepthTexture!==!0&&A.version>0&&I.__version!==A.version?(function(D,x,F){if(x.image.length!==6)return;let L=W(D,x),R=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+F);let X=n.get(R);if(R.version!==X.__version||L===!0){t.activeTexture(i.TEXTURE0+F);let Y=pt.getPrimaries(pt.workingColorSpace),te=x.colorSpace===ur?null:pt.getPrimaries(x.colorSpace),pe=x.colorSpace===ur||Y===te?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);let Pe=x.isCompressedTexture||x.image[0].isCompressedTexture,Ne=x.image[0]&&x.image[0].isDataTexture,ye=[];for(let J=0;J<6;J++)ye[J]=Pe||Ne?Ne?x.image[J].image:x.image[J]:v(x.image[J],!0,r.maxCubemapSize),ye[J]=Se(x,ye[J]);let Le=ye[0],de=s.convert(x.format,x.colorSpace),ve=s.convert(x.type),ge=b(x.internalFormat,de,ve,x.normalized,x.colorSpace),we=x.isVideoTexture!==!0,ft=X.__version===void 0||L===!0,Ge=R.dataReady,Xe,Oe=S(x,Le);if(se(i.TEXTURE_CUBE_MAP,x),Pe){we&&ft&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Oe,ge,Le.width,Le.height);for(let J=0;J<6;J++){Xe=ye[J].mipmaps;for(let gt=0;gt<Xe.length;gt++){let Be=Xe[gt];x.format!==hi?de!==null?we?Ge&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,0,0,Be.width,Be.height,de,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,ge,Be.width,Be.height,0,Be.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):we?Ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,0,0,Be.width,Be.height,de,ve,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,ge,Be.width,Be.height,0,de,ve,Be.data)}}}else{if(Xe=x.mipmaps,we&&ft){Xe.length>0&&Oe++;let J=Te(ye[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Oe,ge,J.width,J.height)}for(let J=0;J<6;J++)if(Ne){we?Ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ye[J].width,ye[J].height,de,ve,ye[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ge,ye[J].width,ye[J].height,0,de,ve,ye[J].data);for(let gt=0;gt<Xe.length;gt++){let Be=Xe[gt].image[J].image;we?Ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,0,0,Be.width,Be.height,de,ve,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,ge,Be.width,Be.height,0,de,ve,Be.data)}}else{we?Ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,de,ve,ye[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ge,de,ve,ye[J]);for(let gt=0;gt<Xe.length;gt++){let Be=Xe[gt];we?Ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,0,0,de,ve,Be.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,ge,de,ve,Be.image[J])}}}g(x)&&_(i.TEXTURE_CUBE_MAP),X.__version=R.version,x.onUpdate&&x.onUpdate(x)}D.__version=x.version})(I,A,w):t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+w)},this.rebindTextures=function(A,w,I){let D=n.get(A);w!==void 0&&he(D.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&be(A)},this.setupRenderTarget=function(A){let w=A.texture,I=n.get(A),D=n.get(w);A.addEventListener("dispose",O);let x=A.textures,F=A.isWebGLCubeRenderTarget===!0,L=x.length>1;if(L||(D.__webglTexture===void 0&&(D.__webglTexture=i.createTexture()),D.__version=w.version,a.memory.textures++),F){I.__webglFramebuffer=[];for(let R=0;R<6;R++)if(w.mipmaps&&w.mipmaps.length>0){I.__webglFramebuffer[R]=[];for(let X=0;X<w.mipmaps.length;X++)I.__webglFramebuffer[R][X]=i.createFramebuffer()}else I.__webglFramebuffer[R]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){I.__webglFramebuffer=[];for(let R=0;R<w.mipmaps.length;R++)I.__webglFramebuffer[R]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(L)for(let R=0,X=x.length;R<X;R++){let Y=n.get(x[R]);Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&_e(A)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let R=0;R<x.length;R++){let X=x[R];I.__webglColorRenderbuffer[R]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[R]);let Y=s.convert(X.format,X.colorSpace),te=s.convert(X.type),pe=b(X.internalFormat,Y,te,X.normalized,X.colorSpace,A.isXRRenderTarget===!0),Pe=re(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,pe,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+R,i.RENDERBUFFER,I.__webglColorRenderbuffer[R])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),ae(I.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(F){t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture),se(i.TEXTURE_CUBE_MAP,w);for(let R=0;R<6;R++)if(w.mipmaps&&w.mipmaps.length>0)for(let X=0;X<w.mipmaps.length;X++)he(I.__webglFramebuffer[R][X],A,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,X);else he(I.__webglFramebuffer[R],A,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,0);g(w)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(L){for(let R=0,X=x.length;R<X;R++){let Y=x[R],te=n.get(Y),pe=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(pe=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(pe,te.__webglTexture),se(pe,Y),he(I.__webglFramebuffer,A,Y,i.COLOR_ATTACHMENT0+R,pe,0),g(Y)&&_(pe)}t.unbindTexture()}else{let R=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(R=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(R,D.__webglTexture),se(R,w),w.mipmaps&&w.mipmaps.length>0)for(let X=0;X<w.mipmaps.length;X++)he(I.__webglFramebuffer[X],A,w,i.COLOR_ATTACHMENT0,R,X);else he(I.__webglFramebuffer,A,w,i.COLOR_ATTACHMENT0,R,0);g(w)&&_(R),t.unbindTexture()}A.depthBuffer&&be(A)},this.updateRenderTargetMipmap=function(A){let w=A.textures;for(let I=0,D=w.length;I<D;I++){let x=w[I];if(g(x)){let F=y(A),L=n.get(x).__webglTexture;t.bindTexture(F,L),_(F),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(_e(A)===!1){let w=A.textures,I=A.width,D=A.height,x=i.COLOR_BUFFER_BIT,F=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,L=n.get(A),R=w.length>1;if(R)for(let Y=0;Y<w.length;Y++)t.bindFramebuffer(i.FRAMEBUFFER,L.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,L.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,L.__webglMultisampledFramebuffer);let X=A.texture.mipmaps;X&&X.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,L.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,L.__webglFramebuffer);for(let Y=0;Y<w.length;Y++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(x|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(x|=i.STENCIL_BUFFER_BIT)),R){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,L.__webglColorRenderbuffer[Y]);let te=n.get(w[Y]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,I,D,0,0,I,D,x,i.NEAREST),c===!0&&(me.length=0,oe.length=0,me.push(i.COLOR_ATTACHMENT0+Y),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(me.push(F),oe.push(F),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,oe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,me))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),R)for(let Y=0;Y<w.length;Y++){t.bindFramebuffer(i.FRAMEBUFFER,L.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,L.__webglColorRenderbuffer[Y]);let te=n.get(w[Y]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,L.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,L.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){let w=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}},this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=he,this.useMultisampledRTT=_e,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Sx(i,e){return{convert:function(t,n=ur){let r,s=pt.getTransfer(n);if(t===Zn)return i.UNSIGNED_BYTE;if(t===oc)return i.UNSIGNED_SHORT_4_4_4_4;if(t===lc)return i.UNSIGNED_SHORT_5_5_5_1;if(t===md)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===gd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===pd)return i.BYTE;if(t===fd)return i.SHORT;if(t===Bs)return i.UNSIGNED_SHORT;if(t===ac)return i.INT;if(t===ji)return i.UNSIGNED_INT;if(t===Jn)return i.FLOAT;if(t===ci)return i.HALF_FLOAT;if(t===_d)return i.ALPHA;if(t===vd)return i.RGB;if(t===hi)return i.RGBA;if(t===lr)return i.DEPTH_COMPONENT;if(t===cr)return i.DEPTH_STENCIL;if(t===Eo)return i.RED;if(t===cc)return i.RED_INTEGER;if(t===hr)return i.RG;if(t===hc)return i.RG_INTEGER;if(t===uc)return i.RGBA_INTEGER;if(t===wo||t===Ao||t===Ro||t===Co)if(s===Lt){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===wo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===wo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Ao)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Ro)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Co)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===dc||t===pc||t===fc||t===mc){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===dc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===pc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===fc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===mc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===gc||t===_c||t===vc||t===xc||t===yc||t===Io||t===Sc){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===gc||t===_c)return s===Lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===vc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(t===xc)return r.COMPRESSED_R11_EAC;if(t===yc)return r.COMPRESSED_SIGNED_R11_EAC;if(t===Io)return r.COMPRESSED_RG11_EAC;if(t===Sc)return r.COMPRESSED_SIGNED_RG11_EAC}if(t===Mc||t===bc||t===Tc||t===Ec||t===wc||t===Ac||t===Rc||t===Cc||t===Ic||t===Pc||t===Lc||t===Nc||t===Dc||t===Uc){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===Mc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===bc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Tc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Ec)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===wc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Ac)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Rc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Cc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Ic)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Pc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Lc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Nc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Dc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Uc)return s===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Oc||t===Fc||t===Bc){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Oc)return s===Lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Fc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Bc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===zc||t===Vc||t===Po||t===kc){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===zc)return r.COMPRESSED_RED_RGTC1_EXT;if(t===Vc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Po)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===kc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Gr?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var Mx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bx=`
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

}`,_h=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new vs(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new en({vertexShader:Mx,fragmentShader:bx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yn(new Or(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vh=class extends si{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,p=null,d=null,u=null,m=null,f=typeof XRWebGLBinding<"u",v=new _h,g={},_=t.getContextAttributes(),y=null,b=null,T=[],S=[],P=new xe,O=null,z=null,N=new sn;N.viewport=new Pt;let j=new sn;j.viewport=new Pt;let U=[N,j],Z=new vo,ee=null,se=null;function W(oe){let re=S.indexOf(oe.inputSource);if(re===-1)return;let _e=T[re];_e!==void 0&&(_e.update(oe.inputSource,oe.frame,l||a),_e.dispatchEvent({type:oe.type,data:oe.inputSource}))}function G(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",$);for(let oe=0;oe<T.length;oe++){let re=S[oe];re!==null&&(S[oe]=null,T[oe].disconnect(re))}ee=null,se=null,v.reset();for(let oe in g)delete g[oe];if(e.setRenderTarget(y),u=null,d=null,p=null,r=null,b=null,me.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(P.width,P.height,!1),z!==null){let oe=z.camera;oe.fov=z.fov,oe.zoom=z.zoom,oe.updateProjectionMatrix(),z=null}n.dispatchEvent({type:"sessionend"})}function $(oe){for(let re=0;re<oe.removed.length;re++){let _e=oe.removed[re],Se=S.indexOf(_e);Se>=0&&(S[Se]=null,T[Se].disconnect(_e))}for(let re=0;re<oe.added.length;re++){let _e=oe.added[re],Se=S.indexOf(_e);if(Se===-1){for(let A=0;A<T.length;A++){if(A>=S.length){S.push(_e),Se=A;break}if(S[A]===null){S[A]=_e,Se=A;break}}if(Se===-1)break}let Te=T[Se];Te&&Te.connect(_e)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let re=T[oe];return re===void 0&&(re=new Lr,T[oe]=re),re.getTargetRaySpace()},this.getControllerGrip=function(oe){let re=T[oe];return re===void 0&&(re=new Lr,T[oe]=re),re.getGripSpace()},this.getHand=function(oe){let re=T[oe];return re===void 0&&(re=new Lr,T[oe]=re),re.getHandSpace()},this.setFramebufferScaleFactor=function(oe){s=oe,n.isPresenting===!0&&We("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){o=oe,n.isPresenting===!0&&We("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(oe){l=oe},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return p===null&&f&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(oe){if(r=oe,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",G),r.addEventListener("inputsourceschange",$),_.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(P),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,_e=null,Se=null;_.depth&&(Se=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=_.stencil?cr:lr,_e=_.stencil?Gr:ji);let Te={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};p=this.getBinding(),d=p.createProjectionLayer(Te),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new xn(d.textureWidth,d.textureHeight,{format:hi,type:Zn,depthTexture:new Gi(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let re={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),b=new xn(u.framebufferWidth,u.framebufferHeight,{format:hi,type:Zn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),me.setContext(r),me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let he=new C,ae=new C;function ie(oe,re){re===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(re.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(r===null)return;let re=oe.near,_e=oe.far;v.texture!==null&&(v.depthNear>0&&(re=v.depthNear),v.depthFar>0&&(_e=v.depthFar)),Z.near=j.near=N.near=re,Z.far=j.far=N.far=_e,ee===Z.near&&se===Z.far||(r.updateRenderState({depthNear:Z.near,depthFar:Z.far}),ee=Z.near,se=Z.far),Z.layers.mask=6|oe.layers.mask,N.layers.mask=-5&Z.layers.mask,j.layers.mask=-3&Z.layers.mask;let Se=oe.parent,Te=Z.cameras;ie(Z,Se);for(let A=0;A<Te.length;A++)ie(Te[A],Se);Te.length===2?(function(A,w,I){he.setFromMatrixPosition(w.matrixWorld),ae.setFromMatrixPosition(I.matrixWorld);let D=he.distanceTo(ae),x=w.projectionMatrix.elements,F=I.projectionMatrix.elements,L=x[14]/(x[10]-1),R=x[14]/(x[10]+1),X=(x[9]+1)/x[5],Y=(x[9]-1)/x[5],te=(x[8]-1)/x[0],pe=(F[8]+1)/F[0],Pe=L*te,Ne=L*pe,ye=D/(-te+pe),Le=ye*-te;if(w.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(Le),A.translateZ(ye),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),x[10]===-1)A.projectionMatrix.copy(w.projectionMatrix),A.projectionMatrixInverse.copy(w.projectionMatrixInverse);else{let de=L+ye,ve=R+ye,ge=Pe-Le,we=Ne+(D-Le),ft=X*R/ve*de,Ge=Y*R/ve*de;A.projectionMatrix.makePerspective(ge,we,ft,Ge,de,ve),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(Z,N,j):Z.projectionMatrix.copy(N.projectionMatrix),z===null&&oe.isPerspectiveCamera&&(z={camera:oe,fov:oe.fov,zoom:oe.zoom}),(function(A,w,I){I===null?A.matrix.copy(w.matrixWorld):(A.matrix.copy(I.matrixWorld),A.matrix.invert(),A.matrix.multiply(w.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(w.projectionMatrix),A.projectionMatrixInverse.copy(w.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*Ea*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(oe,Z,Se)},this.getCamera=function(){return Z},this.getFoveation=function(){if(d!==null||u!==null)return c},this.setFoveation=function(oe){c=oe,d!==null&&(d.fixedFoveation=oe),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=oe)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(Z)},this.getCameraTexture=function(oe){return g[oe]};let be=null,me=new sp;me.setAnimationLoop(function(oe,re){if(h=re.getViewerPose(l||a),m=re,h!==null){let _e=h.views;u!==null&&(e.setRenderTargetFramebuffer(b,u.framebuffer),e.setRenderTarget(b));let Se=!1;_e.length!==Z.cameras.length&&(Z.cameras.length=0,Se=!0);for(let A=0;A<_e.length;A++){let w=_e[A],I=null;if(u!==null)I=u.getViewport(w);else{let x=p.getViewSubImage(d,w);I=x.viewport,A===0&&(e.setRenderTargetTextures(b,x.colorTexture,x.depthStencilTexture),e.setRenderTarget(b))}let D=U[A];D===void 0&&(D=new sn,D.layers.enable(A),D.viewport=new Pt,U[A]=D),D.matrix.fromArray(w.transform.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale),D.projectionMatrix.fromArray(w.projectionMatrix),D.projectionMatrixInverse.copy(D.projectionMatrix).invert(),D.viewport.set(I.x,I.y,I.width,I.height),A===0&&(Z.matrix.copy(D.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),Se===!0&&Z.cameras.push(D)}let Te=r.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&f){p=n.getBinding();let A=p.getDepthInformation(_e[0]);A&&A.isValid&&A.texture&&v.init(A,r.renderState)}if(Te&&Te.includes("camera-access")&&f){e.state.unbindTexture(),p=n.getBinding();for(let A=0;A<_e.length;A++){let w=_e[A].camera;if(w){let I=g[w];I||(I=new vs,g[w]=I);let D=p.getCameraImage(w);I.sourceTexture=D}}}}for(let _e=0;_e<T.length;_e++){let Se=S[_e],Te=T[_e];Se!==null&&Te!==void 0&&Te.update(Se,re,l||a)}be&&be(oe,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),m=null}),this.setAnimationLoop=function(oe){be=oe},this.dispose=function(){}}},Tx=new rt,up=new Je;function Ex(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===Sn&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===Sn&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(r.envMap.value=o,r.envMapRotation.value.setFromMatrix4(Tx.makeRotationFromEuler(c)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply(up),r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,Zc(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,c){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(r,s):s.isMeshLambertMaterial?(n(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(r,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(r,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(l,h,p){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Sn&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.retroreflectivity>0&&(l.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=p.texture,l.transmissionSamplerSize.value.set(p.width,p.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(r,s,c)):s.isMeshMatcapMaterial?(n(r,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(l,h){let p=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(p.matrixWorld),l.nearDistance.value=p.shadow.camera.near,l.farDistance.value=p.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(l,h,p,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*p,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function wx(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(d,u,m,f){if((function(v,g,_,y){let b=v.value,T=g+"_"+_;if(y[T]===void 0)return typeof b=="number"||typeof b=="boolean"?y[T]=b:ArrayBuffer.isView(b)?y[T]=b.slice():y[T]=b.clone(),!0;{let S=y[T];if(typeof b=="number"||typeof b=="boolean"){if(S!==b)return y[T]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(S.equals(b)===!1)return S.copy(b),!0}}return!1})(d,u,m,f)===!0){let v=d.__offset,g=d.value;if(Array.isArray(g)){let _=0;for(let y=0;y<g.length;y++){let b=g[y],T=h(b);l(b,d.__data,_),typeof b=="number"||typeof b=="boolean"||b.isMatrix3||ArrayBuffer.isView(b)||(_+=T.storage/Float32Array.BYTES_PER_ELEMENT)}}else l(g,d.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,d.__data)}}function l(d,u,m){typeof d=="number"||typeof d=="boolean"?u[0]=d:d.isMatrix3?(u[0]=d.elements[0],u[1]=d.elements[1],u[2]=d.elements[2],u[3]=0,u[4]=d.elements[3],u[5]=d.elements[4],u[6]=d.elements[5],u[7]=0,u[8]=d.elements[6],u[9]=d.elements[7],u[10]=d.elements[8],u[11]=0):ArrayBuffer.isView(d)?u.set(new d.constructor(d.buffer,d.byteOffset,u.length)):d.toArray(u,m)}function h(d){let u={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(u.boundary=4,u.storage=4):d.isVector2?(u.boundary=8,u.storage=8):d.isVector3||d.isColor?(u.boundary=16,u.storage=12):d.isVector4?(u.boundary=16,u.storage=16):d.isMatrix3?(u.boundary=48,u.storage=48):d.isMatrix4?(u.boundary=64,u.storage=64):d.isTexture?We("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(d)?(u.boundary=16,u.storage=d.byteLength):We("WebGLRenderer: Unsupported uniform value type.",d),u}function p(d){let u=d.target;u.removeEventListener("dispose",p);let m=a.indexOf(u.__bindingPointIndex);a.splice(m,1),i.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}return{bind:function(d,u){let m=u.program;n.uniformBlockBinding(d,m)},update:function(d,u){let m=r[d.id];m===void 0&&((function(g){let _=g.uniforms,y=0,b=16;for(let S=0,P=_.length;S<P;S++){let O=Array.isArray(_[S])?_[S]:[_[S]];for(let z=0,N=O.length;z<N;z++){let j=O[z],U=Array.isArray(j.value)?j.value:[j.value];for(let Z=0,ee=U.length;Z<ee;Z++){let se=h(U[Z]),W=y%b,G=W%se.boundary,$=W+G;y+=G,$!==0&&b-$<se.storage&&(y+=b-$),j.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=y,y+=se.storage}}}let T=y%b;T>0&&(y+=b-T),g.__size=y,g.__cache={}})(d),m=(function(g){let _=(function(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=_;let y=i.createBuffer(),b=g.__size,T=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,b,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,y),y})(d),r[d.id]=m,d.addEventListener("dispose",p));let f=u.program;n.updateUBOMapping(d,f);let v=e.render.frame;s[d.id]!==v&&((function(g){let _=r[g.id],y=g.uniforms,b=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let T=0,S=y.length;T<S;T++){let P=y[T];if(Array.isArray(P))for(let O=0,z=P.length;O<z;O++)c(P[O],T,O,b);else c(P,T,0,b)}i.bindBuffer(i.UNIFORM_BUFFER,null)})(d),s[d.id]=v)},dispose:function(){for(let d in r)i.deleteBuffer(r[d]);a=[],r={},s={}}}}up.set(-1,0,0,0,1,0,0,0,1);var Ax=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ui=null;function Rx(){return ui===null&&(ui=new Nr(Ax,16,16,hr,ci),ui.name="DFG_LUT",ui.minFilter=Mn,ui.magFilter=Mn,ui.wrapS=bo,ui.wrapT=bo,ui.generateMipmaps=!1,ui.needsUpdate=!0),ui}var zo=class{constructor(e={}){let{canvas:t=wd(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Zn}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let f=u,v=new Set([uc,hc,cc]),g=new Set([Zn,ji,Bs,Gr,oc,lc]),_=new Uint32Array(4),y=new Int32Array(4),b=new C,T=null,S=null,P=[],O=[],z=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,j=!1,U=null,Z=null,ee=null,se=null;this._outputColorSpace=Hc;let W=0,G=0,$=null,he=-1,ae=null,ie=new Pt,be=new Pt,me=null,oe=new st(0),re=0,_e=t.width,Se=t.height,Te=1,A=null,w=null,I=new Pt(0,0,_e,Se),D=new Pt(0,0,_e,Se),x=!1,F=new ki,L=!1,R=!1,X=new rt,Y=new C,te=new Pt,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Pe=!1;function Ne(){return $===null?Te:1}let ye,Le,de,ve,ge,we,ft,Ge,Xe,Oe,J,gt,Be,yt,lt,Ut,Et,St,wt,Tn,on,Un,En,H=n;function fn(E,B){return t.getContext(E,B)}try{let E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Ht,!1),t.addEventListener("webglcontextrestored",Yt,!1),t.addEventListener("webglcontextcreationerror",Wt,!1),H===null){let B="webgl2";if(H=fn(B,E),H===null)throw fn(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Jt()}catch(E){throw t.removeEventListener("webglcontextlost",Ht,!1),t.removeEventListener("webglcontextrestored",Yt,!1),t.removeEventListener("webglcontextcreationerror",Wt,!1),qe("WebGLRenderer: "+E.message),E}function Jt(){ye=new O_(H),ye.init(),on=new Sx(H,ye),Le=new C_(H,ye,e,on),de=new xx(H,ye),Le.reversedDepthBuffer&&d&&de.buffers.depth.setReversed(!0),Z=H.createFramebuffer(),ee=H.createFramebuffer(),se=H.createFramebuffer(),ve=new z_(H),ge=new sx,we=new yx(H,ye,de,ge,Le,on,ve),ft=new U_(N),Ge=new Wm(H),Un=new A_(H,Ge),Xe=new F_(H,Ge,ve,Un),Oe=new k_(H,Xe,Ge,Un,ve),St=new V_(H,Le,we),lt=new I_(ge),J=new rx(N,ft,ye,Le,Un,lt),gt=new Ex(N,ge),Be=new ox,yt=new px(ye),Et=new w_(N,ft,de,Oe,m,c),Ut=new vx(N,Oe,Le),En=new wx(H,ve,Le,de),wt=new R_(H,ye,ve),Tn=new B_(H,ye,ve),ve.programs=J.programs,N.capabilities=Le,N.extensions=ye,N.properties=ge,N.renderLists=Be,N.shadowMap=Ut,N.state=de,N.info=ve}f!==Zn&&(z=new H_(f,t.width,t.height,o,r,s));let ut=new vh(N,H);function Ht(E){E.preventDefault(),Yc("WebGLRenderer: Context Lost."),j=!0}function Yt(){Yc("WebGLRenderer: Context Restored."),j=!1;let E=ve.autoReset,B=Ut.enabled,q=Ut.autoUpdate,ne=Ut.needsUpdate,K=Ut.type;Jt(),ve.autoReset=E,Ut.enabled=B,Ut.autoUpdate=q,Ut.needsUpdate=ne,Ut.type=K}function Wt(E){qe("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function dt(E){let B=E.target;B.removeEventListener("dispose",dt),(function(q){(function(ne){let K=ge.get(ne).programs;K!==void 0&&(K.forEach(function(fe){J.releaseProgram(fe)}),ne.isShaderMaterial&&J.releaseShaderCache(ne))})(q),ge.remove(q)})(B)}function pi(E,B,q,ne){U!==null&&E.isNodeMaterial&&U.setObject(ne,E),L===!0&&lt.setState(E,q,!1),E.transparent===!0&&E.side===ai&&E.forceSinglePass===!1?(E.side=Sn,E.needsUpdate=!0,ue(E,B,ne),E.side=zr,E.needsUpdate=!0,ue(E,B,ne),E.side=ai):ue(E,B,ne)}this.xr=ut,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let E=ye.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=ye.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Te},this.setPixelRatio=function(E){E!==void 0&&(Te=E,this.setSize(_e,Se,!1))},this.getSize=function(E){return E.set(_e,Se)},this.setSize=function(E,B,q=!0){ut.isPresenting?We("WebGLRenderer: Can't change size while VR device is presenting."):(_e=E,Se=B,t.width=Math.floor(E*Te),t.height=Math.floor(B*Te),q===!0&&(t.style.width=E+"px",t.style.height=B+"px"),z!==null&&z.setSize(t.width,t.height),this.setViewport(0,0,E,B))},this.getDrawingBufferSize=function(E){return E.set(_e*Te,Se*Te).floor()},this.setDrawingBufferSize=function(E,B,q){_e=E,Se=B,Te=q,t.width=Math.floor(E*q),t.height=Math.floor(B*q),this.setViewport(0,0,E,B)},this.setEffects=function(E){if(f!==Zn){if(E){for(let B=0;B<E.length;B++)if(E[B].isOutputPass===!0){We("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}z.setEffects(E||[])}else qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(E){return E.copy(ie)},this.getViewport=function(E){return E.copy(I)},this.setViewport=function(E,B,q,ne){E.isVector4?I.set(E.x,E.y,E.z,E.w):I.set(E,B,q,ne),de.viewport(ie.copy(I).multiplyScalar(Te).round())},this.getScissor=function(E){return E.copy(D)},this.setScissor=function(E,B,q,ne){E.isVector4?D.set(E.x,E.y,E.z,E.w):D.set(E,B,q,ne),de.scissor(be.copy(D).multiplyScalar(Te).round())},this.getScissorTest=function(){return x},this.setScissorTest=function(E){de.setScissorTest(x=E)},this.setOpaqueSort=function(E){A=E},this.setTransparentSort=function(E){w=E},this.getClearColor=function(E){return E.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor(...arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha(...arguments)},this.clear=function(E=!0,B=!0,q=!0){let ne=0;if(E){let K=!1;if($!==null){let fe=$.texture.format;K=v.has(fe)}if(K){let fe=$.texture.type,Me=g.has(fe),Re=Et.getClearColor(),Ce=Et.getClearAlpha(),De=Re.r,it=Re.g,Qe=Re.b;Me?(_[0]=De,_[1]=it,_[2]=Qe,_[3]=Ce,H.clearBufferuiv(H.COLOR,0,_)):(y[0]=De,y[1]=it,y[2]=Qe,y[3]=Ce,H.clearBufferiv(H.COLOR,0,y))}else ne|=H.COLOR_BUFFER_BIT}B&&(ne|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(ne|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&H.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),U=E},this.dispose=function(){t.removeEventListener("webglcontextlost",Ht,!1),t.removeEventListener("webglcontextrestored",Yt,!1),t.removeEventListener("webglcontextcreationerror",Wt,!1),Et.dispose(),Be.dispose(),yt.dispose(),ge.dispose(),ft.dispose(),Oe.dispose(),Un.dispose(),En.dispose(),J.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",Ri),ut.removeEventListener("sessionend",At),Xt.stop()},this.renderBufferDirect=function(E,B,q,ne,K,fe){B===null&&(B=pe);let Me=K.isMesh&&K.matrixWorld.determinantAffine()<0,Re=(function(et,Mt,Ft,ze,ce){Mt.isScene!==!0&&(Mt=pe),we.resetTextureUnits();let ct=Mt.fog,tn=ze.isMeshStandardMaterial||ze.isMeshLambertMaterial||ze.isMeshPhongMaterial?Mt.environment:null,wn=$===null?N.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:pt.workingColorSpace,Kn=ze.isMeshStandardMaterial||ze.isMeshLambertMaterial&&!ze.envMap||ze.isMeshPhongMaterial&&!ze.envMap,Fn=ft.get(ze.envMap||tn,Kn),Qn=ze.vertexColors===!0&&!!Ft.attributes.color&&Ft.attributes.color.itemSize===4,Qt=!!Ft.attributes.tangent&&(!!ze.normalMap||ze.anisotropy>0),Ci=!!Ft.morphAttributes.position,ei=!!Ft.morphAttributes.normal,Ws=!!Ft.morphAttributes.color,Zr=$n;ze.toneMapped&&($!==null&&$.isXRRenderTarget!==!0||(Zr=N.toneMapping));let Jr=Ft.morphAttributes.position||Ft.morphAttributes.normal||Ft.morphAttributes.color,Ko=Jr!==void 0?Jr.length:0,Ye=ge.get(ze),An=S.state.lights;if(L===!0&&(R===!0||et!==ae)){let He=et===ae&&ze.id===he;lt.setState(ze,et,He)}let Rn=!1;ze.version===Ye.__version?Ye.needsLights&&Ye.lightsStateVersion!==An.state.version||Ye.outputColorSpace!==wn||ce.isBatchedMesh&&Ye.batching===!1?Rn=!0:ce.isBatchedMesh||Ye.batching!==!0?ce.isBatchedMesh&&Ye.batchingColor===!0&&ce._colorsTexture===null||ce.isBatchedMesh&&Ye.batchingColor===!1&&ce._colorsTexture!==null||ce.isInstancedMesh&&Ye.instancing===!1?Rn=!0:ce.isInstancedMesh||Ye.instancing!==!0?ce.isSkinnedMesh&&Ye.skinning===!1?Rn=!0:ce.isSkinnedMesh||Ye.skinning!==!0?ce.isInstancedMesh&&Ye.instancingColor===!0&&ce.instanceColor===null||ce.isInstancedMesh&&Ye.instancingColor===!1&&ce.instanceColor!==null||ce.isInstancedMesh&&Ye.instancingMorph===!0&&ce.morphTexture===null||ce.isInstancedMesh&&Ye.instancingMorph===!1&&ce.morphTexture!==null||Ye.envMap!==Fn||ze.fog===!0&&Ye.fog!==ct?Rn=!0:Ye.numClippingPlanes===void 0||Ye.numClippingPlanes===lt.numPlanes&&Ye.numIntersection===lt.numIntersection?(Ye.vertexAlphas!==Qn||Ye.vertexTangents!==Qt||Ye.morphTargets!==Ci||Ye.morphNormals!==ei||Ye.morphColors!==Ws||Ye.toneMapping!==Zr||Ye.morphTargetsCount!==Ko||!!Ye.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Rn=!0):Rn=!0:Rn=!0:Rn=!0:Rn=!0:(Rn=!0,Ye.__version=ze.version);let ln=Ye.currentProgram;Rn===!0&&(ln=ue(ze,Mt,ce),U&&ze.isNodeMaterial&&U.onUpdateProgram(ze,ln,Ye));let Kr=!1,M=!1,V=!1,Q=ln.getUniforms(),Ee=Ye.uniforms;if(de.useProgram(ln.program)&&(Kr=!0,M=!0,V=!0),ze.id!==he&&(he=ze.id,M=!0),Ye.needsLights){let He=(function(xt,Ct){if(xt.length===0)return null;if(xt.length===1)return xt[0].texture!==null?xt[0]:null;b.setFromMatrixPosition(Ct.matrixWorld);for(let zt=0,ti=xt.length;zt<ti;zt++){let ni=xt[zt];if(ni.texture!==null&&ni.boundingBox.containsPoint(b))return ni}return null})(S.state.lightProbeGridArray,ce);Ye.lightProbeGrid!==He&&(Ye.lightProbeGrid=He,M=!0)}if(Kr||ae!==et){de.buffers.depth.getReversed()&&et.reversedDepth!==!0&&(et._reversedDepth=!0,et.updateProjectionMatrix()),Q.setValue(H,"projectionMatrix",et.projectionMatrix),Q.setValue(H,"viewMatrix",et.matrixWorldInverse);let He=Q.map.cameraPosition;He!==void 0&&He.setValue(H,Y.setFromMatrixPosition(et.matrixWorld)),Le.logarithmicDepthBuffer&&Q.setValue(H,"logDepthBufFC",2/(Math.log(et.far+1)/Math.LN2)),(ze.isMeshPhongMaterial||ze.isMeshToonMaterial||ze.isMeshLambertMaterial||ze.isMeshBasicMaterial||ze.isMeshStandardMaterial||ze.isShaderMaterial)&&Q.setValue(H,"isOrthographic",et.isOrthographicCamera===!0),ae!==et&&(ae=et,M=!0,V=!0)}if(Ye.needsLights&&(An.state.sunShadowMap.length>0&&Q.setValue(H,"sunShadowMap",An.state.sunShadowMap,we),An.state.directionalShadowMap.length>0&&Q.setValue(H,"directionalShadowMap",An.state.directionalShadowMap,we),An.state.spotShadowMap.length>0&&Q.setValue(H,"spotShadowMap",An.state.spotShadowMap,we),An.state.pointShadowMap.length>0&&Q.setValue(H,"pointShadowMap",An.state.pointShadowMap,we)),ce.isSkinnedMesh){Q.setOptional(H,ce,"bindMatrix"),Q.setOptional(H,ce,"bindMatrixInverse");let He=ce.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),Q.setValue(H,"boneTexture",He.boneTexture,we))}ce.isBatchedMesh&&(Q.setOptional(H,ce,"batchingTexture"),Q.setValue(H,"batchingTexture",ce._matricesTexture,we),Q.setOptional(H,ce,"batchingIdTexture"),Q.setValue(H,"batchingIdTexture",ce._indirectTexture,we),Q.setOptional(H,ce,"batchingColorTexture"),ce._colorsTexture!==null&&Q.setValue(H,"batchingColorTexture",ce._colorsTexture,we));let Fe=Ft.morphAttributes;if(Fe.position===void 0&&Fe.normal===void 0&&Fe.color===void 0||St.update(ce,Ft,ln),(M||Ye.receiveShadow!==ce.receiveShadow)&&(Ye.receiveShadow=ce.receiveShadow,Q.setValue(H,"receiveShadow",ce.receiveShadow)),(ze.isMeshStandardMaterial||ze.isMeshLambertMaterial||ze.isMeshPhongMaterial)&&ze.envMap===null&&Mt.environment!==null&&(Ee.envMapIntensity.value=Mt.environmentIntensity),Ee.dfgLUT!==void 0&&(Ee.dfgLUT.value=Rx()),M){if(Q.setValue(H,"toneMappingExposure",N.toneMappingExposure),Ye.needsLights&&(Ke=V,(tt=Ee).ambientLightColor.needsUpdate=Ke,tt.lightProbe.needsUpdate=Ke,tt.sunLights.needsUpdate=Ke,tt.sunLightShadows.needsUpdate=Ke,tt.directionalLights.needsUpdate=Ke,tt.directionalLightShadows.needsUpdate=Ke,tt.pointLights.needsUpdate=Ke,tt.pointLightShadows.needsUpdate=Ke,tt.spotLights.needsUpdate=Ke,tt.spotLightShadows.needsUpdate=Ke,tt.rectAreaLights.needsUpdate=Ke,tt.hemisphereLights.needsUpdate=Ke),ct&&ze.fog===!0&&gt.refreshFogUniforms(Ee,ct),gt.refreshMaterialUniforms(Ee,ze,Te,Se,S.state.transmissionRenderTarget[et.id]),Ye.needsLights&&Ye.lightProbeGrid){let He=Ye.lightProbeGrid;Ee.probesSH.value=He.texture,Ee.probesMin.value.copy(He.boundingBox.min),Ee.probesMax.value.copy(He.boundingBox.max),Ee.probesResolution.value.copy(He.resolution)}Xr.upload(H,Ie(Ye),Ee,we)}var tt,Ke;if(ze.isShaderMaterial&&ze.uniformsNeedUpdate===!0&&(Xr.upload(H,Ie(Ye),Ee,we),ze.uniformsNeedUpdate=!1),ze.isSpriteMaterial&&Q.setValue(H,"center",ce.center),Q.setValue(H,"modelViewMatrix",ce.modelViewMatrix),Q.setValue(H,"normalMatrix",ce.normalMatrix),Q.setValue(H,"modelMatrix",ce.matrixWorld),ze.uniformsGroups!==void 0){let He=ze.uniformsGroups;for(let xt=0,Ct=He.length;xt<Ct;xt++){let zt=He[xt];En.update(zt,ln),En.bind(zt,ln)}}return ln})(E,B,q,ne,K);de.setMaterial(ne,Me);let Ce=q.index,De=1;if(ne.wireframe===!0){if(Ce=Xe.getWireframeAttribute(q),Ce===void 0)return;De=2}let it=q.drawRange,Qe=q.attributes.position,Ue=it.start*De,at=(it.start+it.count)*De;fe!==null&&(Ue=Math.max(Ue,fe.start*De),at=Math.min(at,(fe.start+fe.count)*De)),Ce!==null?(Ue=Math.max(Ue,0),at=Math.min(at,Ce.count)):Qe!=null&&(Ue=Math.max(Ue,0),at=Math.min(at,Qe.count));let Rt=at-Ue;if(Rt<0||Rt===1/0)return;let Tt;Un.setup(K,ne,Re,q,Ce);let _t=wt;if(Ce!==null&&(Tt=Ge.get(Ce),_t=Tn,_t.setIndex(Tt)),K.isMesh)ne.wireframe===!0?(de.setLineWidth(ne.wireframeLinewidth*Ne()),_t.setMode(H.LINES)):_t.setMode(H.TRIANGLES);else if(K.isLine){let et=ne.linewidth;et===void 0&&(et=1),de.setLineWidth(et*Ne()),K.isLineSegments?_t.setMode(H.LINES):K.isLineLoop?_t.setMode(H.LINE_LOOP):_t.setMode(H.LINE_STRIP)}else K.isPoints?_t.setMode(H.POINTS):K.isSprite&&_t.setMode(H.TRIANGLES);if(K.isBatchedMesh)if(ye.get("WEBGL_multi_draw"))_t.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let et=K._multiDrawStarts,Mt=K._multiDrawCounts,Ft=K._multiDrawCount,ze=Ce?Ge.get(Ce).bytesPerElement:1,ce=ge.get(ne).currentProgram.getUniforms();for(let ct=0;ct<Ft;ct++)ce.setValue(H,"_gl_DrawID",ct),_t.render(et[ct]/ze,Mt[ct])}else if(K.isInstancedMesh)_t.renderInstances(Ue,Rt,K.count);else if(q.isInstancedBufferGeometry){let et=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Mt=Math.min(q.instanceCount,et);_t.renderInstances(Ue,Rt,Mt)}else _t.render(Ue,Rt)},this.compile=function(E,B,q=null){q===null&&(q=E),U!==null&&U.renderStart(E,B,q),S=yt.get(q),S.init(B),O.push(S),q.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(S.pushLight(K),K.castShadow&&S.pushShadow(K))}),E!==q&&E.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(S.pushLight(K),K.castShadow&&S.pushShadow(K))}),S.setupLights(),U!==null&&U.updateLights(S.state.lightsArray),R=this.localClippingEnabled,L=lt.init(this.clippingPlanes,R),L===!0&&lt.setGlobalState(this.clippingPlanes,B),U!==null&&Ut.render(S.state.shadowsArray,q,B);let ne=new Set;return E.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let fe=K.material;if(fe)if(Array.isArray(fe))for(let Me=0;Me<fe.length;Me++){let Re=fe[Me];pi(Re,q,B,K),ne.add(Re)}else pi(fe,q,B,K),ne.add(fe)}),S=O.pop(),U!==null&&U.renderEnd(),ne},this.compileAsync=function(E,B,q=null){let ne=this.compile(E,B,q);return new Promise(K=>{function fe(){ne.forEach(function(Me){let Re=ge.get(Me).currentProgram;(Re===void 0||Re.isReady())&&ne.delete(Me)}),ne.size!==0?setTimeout(fe,10):K(E)}ye.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let fi=null;function Ri(){Xt.stop()}function At(){Xt.start()}let Xt=new sp;function Kt(E,B,q,ne){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(F)){ne&&te.setFromMatrixPosition(E.matrixWorld).applyMatrix4(X);let fe=Oe.update(E),Me=E.material;Me.visible&&T.push(E,fe,Me,q,te.z,null,B)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(F))){let fe=Oe.update(E),Me=E.material;if(ne&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),te.copy(E.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),te.copy(fe.boundingSphere.center)),te.applyMatrix4(E.matrixWorld).applyMatrix4(X)),Array.isArray(Me)){let Re=fe.groups;for(let Ce=0,De=Re.length;Ce<De;Ce++){let it=Re[Ce],Qe=Me[it.materialIndex];Qe&&Qe.visible&&T.push(E,fe,Qe,q,te.z,it,B)}}else Me.visible&&T.push(E,fe,Me,q,te.z,null,B)}}let K=E.children;for(let fe=0,Me=K.length;fe<Me;fe++)Kt(K[fe],B,q,ne)}function Yi(E,B,q,ne){let{opaque:K,transmissive:fe,transparent:Me}=E;S.setupLightsView(q),L===!0&&lt.setGlobalState(N.clippingPlanes,q),ne&&de.viewport(ie.copy(ne)),K.length>0&&On(K,B,q),fe.length>0&&On(fe,B,q),Me.length>0&&On(Me,B,q),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function mi(E,B,q,ne){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[ne.id]===void 0){let Qe=ye.has("EXT_color_buffer_half_float")||ye.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[ne.id]=new xn(1,1,{generateMipmaps:!0,type:Qe?ci:Zn,minFilter:or,samples:Math.max(4,Le.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:pt.workingColorSpace})}let K=S.state.transmissionRenderTarget[ne.id],fe=ne.viewport||ie;K.setSize(fe.z*N.transmissionResolutionScale,fe.w*N.transmissionResolutionScale);let Me=N.getRenderTarget(),Re=N.getActiveCubeFace(),Ce=N.getActiveMipmapLevel();N.setRenderTarget(K),N.getClearColor(oe),re=N.getClearAlpha(),re<1&&N.setClearColor(16777215,.5),N.clear(),Pe&&Et.render(q);let De=N.toneMapping;N.toneMapping=$n;let it=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),S.setupLightsView(ne),L===!0&&lt.setGlobalState(N.clippingPlanes,ne),On(E,q,ne),we.updateMultisampleRenderTarget(K),we.updateRenderTargetMipmap(K),ye.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let Ue=0,at=B.length;Ue<at;Ue++){let Rt=B[Ue],{object:Tt,geometry:_t,material:et,group:Mt}=Rt;if(et.side===ai&&Tt.layers.test(ne.layers)){let Ft=et.side;et.side=Sn,et.needsUpdate=!0,k(Tt,q,ne,_t,et,Mt),et.side=Ft,et.needsUpdate=!0,Qe=!0}}Qe===!0&&(we.updateMultisampleRenderTarget(K),we.updateRenderTargetMipmap(K))}N.setRenderTarget(Me,Re,Ce),N.setClearColor(oe,re),it!==void 0&&(ne.viewport=it),N.toneMapping=De}function On(E,B,q){let ne=B.isScene===!0?B.overrideMaterial:null;for(let K=0,fe=E.length;K<fe;K++){let Me=E[K],{object:Re,geometry:Ce,group:De}=Me,it=Me.material;it.allowOverride===!0&&ne!==null&&(it=ne),Re.layers.test(q.layers)&&k(Re,B,q,Ce,it,De)}}function k(E,B,q,ne,K,fe){U!==null&&K.isNodeMaterial&&U.setObject(E,K),E.onBeforeRender(N,B,q,ne,K,fe),E.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),K.onBeforeRender(N,B,q,ne,E,fe),K.transparent===!0&&K.side===ai&&K.forceSinglePass===!1?(K.side=Sn,K.needsUpdate=!0,N.renderBufferDirect(q,B,ne,K,E,fe),K.side=zr,K.needsUpdate=!0,N.renderBufferDirect(q,B,ne,K,E,fe),K.side=ai):N.renderBufferDirect(q,B,ne,K,E,fe),E.onAfterRender(N,B,q,ne,K,fe)}function ue(E,B,q){B.isScene!==!0&&(B=pe);let ne=ge.get(E),K=S.state.lights,fe=S.state.shadowsArray,Me=K.state.version,Re=J.getParameters(E,K.state,fe,B,q,S.state.lightProbeGridArray),Ce=J.getProgramCacheKey(Re),De=ne.programs;ne.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?B.environment:null,ne.fog=B.fog;let it=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;ne.envMap=ft.get(E.envMap||ne.environment,it),ne.envMapRotation=ne.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,De===void 0&&(E.addEventListener("dispose",dt),De=new Map,ne.programs=De);let Qe=De.get(Ce);if(Qe!==void 0){if(ne.currentProgram===Qe&&ne.lightsStateVersion===Me)return Ze(E,Re),Qe}else Re.uniforms=J.getUniforms(E),U!==null&&E.isNodeMaterial&&U.build(E,q,Re),E.onBeforeCompile(Re,N),Qe=J.acquireProgram(Re,Ce),De.set(Ce,Qe),ne.uniforms=Re.uniforms;let Ue=ne.uniforms;return(E.isShaderMaterial||E.isRawShaderMaterial)&&E.clipping!==!0||(Ue.clippingPlanes=lt.uniform),Ze(E,Re),ne.needsLights=(function(at){return at.isMeshLambertMaterial||at.isMeshToonMaterial||at.isMeshPhongMaterial||at.isMeshStandardMaterial||at.isShadowMaterial||at.isShaderMaterial&&at.lights===!0})(E),ne.lightsStateVersion=Me,ne.needsLights&&(Ue.ambientLightColor.value=K.state.ambient,Ue.lightProbe.value=K.state.probe,Ue.sunLights.value=K.state.sun,Ue.sunLightShadows.value=K.state.sunShadow,Ue.directionalLights.value=K.state.directional,Ue.directionalLightShadows.value=K.state.directionalShadow,Ue.spotLights.value=K.state.spot,Ue.spotLightShadows.value=K.state.spotShadow,Ue.rectAreaLights.value=K.state.rectArea,Ue.ltc_1.value=K.state.rectAreaLTC1,Ue.ltc_2.value=K.state.rectAreaLTC2,Ue.pointLights.value=K.state.point,Ue.pointLightShadows.value=K.state.pointShadow,Ue.hemisphereLights.value=K.state.hemi,Ue.sunShadowMatrix.value=K.state.sunShadowMatrix,Ue.sunShadowCascade.value=K.state.sunShadowCascade,Ue.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ue.spotLightMatrix.value=K.state.spotLightMatrix,Ue.spotLightMap.value=K.state.spotLightMap,Ue.pointShadowMatrix.value=K.state.pointShadowMatrix),ne.lightProbeGrid=S.state.lightProbeGridArray.length>0,ne.currentProgram=Qe,ne.uniformsList=null,Qe}function Ie(E){if(E.uniformsList===null){let B=E.currentProgram.getUniforms();E.uniformsList=Xr.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function Ze(E,B){let q=ge.get(E);q.outputColorSpace=B.outputColorSpace,q.batching=B.batching,q.batchingColor=B.batchingColor,q.instancing=B.instancing,q.instancingColor=B.instancingColor,q.instancingMorph=B.instancingMorph,q.skinning=B.skinning,q.morphTargets=B.morphTargets,q.morphNormals=B.morphNormals,q.morphColors=B.morphColors,q.morphTargetsCount=B.morphTargetsCount,q.numClippingPlanes=B.numClippingPlanes,q.numIntersection=B.numClipIntersection,q.vertexAlphas=B.vertexAlphas,q.vertexTangents=B.vertexTangents,q.toneMapping=B.toneMapping}function bt(E){let B=ge.get(E);return B.__readFormat===E.format&&B.__readType===E.type||(B.__readFormat=E.format,B.__readType=E.type,B.__formatReadable=Le.textureFormatReadable(E.format),B.__typeReadable=Le.textureTypeReadable(E.type)),B}Xt.setAnimationLoop(function(E){fi&&fi(E)}),typeof self<"u"&&Xt.setContext(self),this.setAnimationLoop=function(E){fi=E,ut.setAnimationLoop(E),E===null?Xt.stop():Xt.start()},ut.addEventListener("sessionstart",Ri),ut.addEventListener("sessionend",At),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0)return void qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(j===!0)return;U!==null&&U.renderStart(E,B);let q=ut.enabled===!0&&ut.isPresenting===!0,ne=z!==null&&($===null||q)&&z.begin(N,$);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ut.enabled!==!0||ut.isPresenting!==!0||z!==null&&z.isCompositing()!==!1||(ut.cameraAutoUpdate===!0&&ut.updateCamera(B),B=ut.getCamera()),E.isScene===!0&&E.onBeforeRender(N,E,B,$),S=yt.get(E,O.length),S.init(B),S.state.textureUnits=we.getTextureUnits(),O.push(S),X.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),F.setFromProjectionMatrix(X,qc,B.reversedDepth),R=this.localClippingEnabled,L=lt.init(this.clippingPlanes,R),T=Be.get(E,P.length),T.init(),P.push(T),ut.enabled===!0&&ut.isPresenting===!0){let fe=N.xr.getDepthSensingMesh();fe!==null&&Kt(fe,B,-1/0,N.sortObjects)}Kt(E,B,0,N.sortObjects),T.finish(),U!==null&&U.updateLights(S.state.lightsArray),N.sortObjects===!0&&T.sort(A,w),Pe=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,Pe&&Et.addToRenderList(T,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),L===!0&&lt.beginShadows();let K=S.state.shadowsArray;if(Ut.render(K,E,B),L===!0&&lt.endShadows(),(ne&&z.hasRenderPass())===!1){let fe=T.opaque,Me=T.transmissive;if(S.setupLights(),B.isArrayCamera){let Re=B.cameras;if(Me.length>0)for(let Ce=0,De=Re.length;Ce<De;Ce++)mi(fe,Me,E,Re[Ce]);Pe&&Et.render(E);for(let Ce=0,De=Re.length;Ce<De;Ce++){let it=Re[Ce];Yi(T,E,it,it.viewport)}}else Me.length>0&&mi(fe,Me,E,B),Pe&&Et.render(E),Yi(T,E,B)}$!==null&&G===0&&(we.updateMultisampleRenderTarget($),we.updateRenderTargetMipmap($)),ne&&z.end(N),E.isScene===!0&&E.onAfterRender(N,E,B),Un.resetDefaultState(),he=-1,ae=null,O.pop(),O.length>0?(S=O[O.length-1],we.setTextureUnits(S.state.textureUnits),L===!0&&lt.setGlobalState(N.clippingPlanes,S.state.camera)):S=null,P.pop(),T=P.length>0?P[P.length-1]:null,U!==null&&U.renderEnd()},this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(E,B,q){let ne=ge.get(E);ne.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),ge.get(E.texture).__webglTexture=B,ge.get(E.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:q,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,B){let q=ge.get(E);q.__webglFramebuffer=B,q.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(E,B=0,q=0){$=E,W=B,G=q;let ne=null,K=!1,fe=!1;if(E){let Me=ge.get(E);if(Me.__useDefaultFramebuffer!==void 0)return de.bindFramebuffer(H.FRAMEBUFFER,Me.__webglFramebuffer),ie.copy(E.viewport),be.copy(E.scissor),me=E.scissorTest,de.viewport(ie),de.scissor(be),de.setScissorTest(me),void(he=-1);if(Me.__webglFramebuffer===void 0)we.setupRenderTarget(E);else if(Me.__hasExternalTextures)we.rebindTextures(E,ge.get(E.texture).__webglTexture,ge.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let De=E.depthTexture;if(Me.__boundDepthTexture!==De){if(De!==null&&ge.has(De)&&(E.width!==De.image.width||E.height!==De.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");we.setupDepthRenderbuffer(E)}}let Re=E.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(fe=!0);let Ce=ge.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(ne=Array.isArray(Ce[B])?Ce[B][q]:Ce[B],K=!0):ne=E.samples>0&&we.useMultisampledRTT(E)===!1?ge.get(E).__webglMultisampledFramebuffer:Array.isArray(Ce)?Ce[q]:Ce,ie.copy(E.viewport),be.copy(E.scissor),me=E.scissorTest}else ie.copy(I).multiplyScalar(Te).floor(),be.copy(D).multiplyScalar(Te).floor(),me=x;if(q!==0&&(ne=Z),de.bindFramebuffer(H.FRAMEBUFFER,ne)&&de.drawBuffers(E,ne),de.viewport(ie),de.scissor(be),de.setScissorTest(me),K){let Me=ge.get(E.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+B,Me.__webglTexture,q)}else if(fe){let Me=B;for(let Re=0;Re<E.textures.length;Re++){let Ce=ge.get(E.textures[Re]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Re,Ce.__webglTexture,q,Me)}}else if(E!==null&&q!==0){let Me=ge.get(E.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Me.__webglTexture,q)}he=-1},this.readRenderTargetPixels=function(E,B,q,ne,K,fe,Me,Re=0){if(!E||!E.isWebGLRenderTarget)return void qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=ge.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){de.bindFramebuffer(H.FRAMEBUFFER,Ce);try{let De=E.textures[Re],it=De.format,Qe=De.type;E.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Re);let Ue=bt(De);if(Ue.__formatReadable===!1)return void qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(Ue.__typeReadable===!1)return void qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");B>=0&&B<=E.width-ne&&q>=0&&q<=E.height-K&&H.readPixels(B,q,ne,K,on.convert(it),on.convert(Qe),fe)}finally{let De=$!==null?ge.get($).__webglFramebuffer:null;de.bindFramebuffer(H.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(E,B,q,ne,K,fe,Me,Re=0){if(!E||!E.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=ge.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){if(B>=0&&B<=E.width-ne&&q>=0&&q<=E.height-K){de.bindFramebuffer(H.FRAMEBUFFER,Ce);let De=E.textures[Re],it=De.format,Qe=De.type;E.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Re);let Ue=bt(De);if(Ue.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ue.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let at=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,at),H.bufferData(H.PIXEL_PACK_BUFFER,fe.byteLength,H.STREAM_READ),H.readPixels(B,q,ne,K,on.convert(it),on.convert(Qe),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);let Rt=$!==null?ge.get($).__webglFramebuffer:null;de.bindFramebuffer(H.FRAMEBUFFER,Rt);let Tt=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Rd(H,Tt,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,at),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,fe),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(at),H.deleteSync(Tt),fe}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,B=null,q=0){let ne=Math.pow(2,-q),K=Math.floor(E.image.width*ne),fe=Math.floor(E.image.height*ne),Me=B!==null?B.x:0,Re=B!==null?B.y:0;we.setTexture2D(E,0),H.copyTexSubImage2D(H.TEXTURE_2D,q,0,0,Me,Re,K,fe),de.unbindTexture()},this.copyTextureToTexture=function(E,B,q=null,ne=null,K=0,fe=0){let Me,Re,Ce,De,it,Qe,Ue,at,Rt,Tt=E.isCompressedTexture?E.mipmaps[fe]:E.image;if(q!==null)Me=q.max.x-q.min.x,Re=q.max.y-q.min.y,Ce=q.isBox3?q.max.z-q.min.z:1,De=q.min.x,it=q.min.y,Qe=q.isBox3?q.min.z:0;else{let Fn=Math.pow(2,-K);Me=Math.floor(Tt.width*Fn),Re=Math.floor(Tt.height*Fn),Ce=E.isDataArrayTexture?Tt.depth:E.isData3DTexture?Math.floor(Tt.depth*Fn):1,De=0,it=0,Qe=0}ne!==null?(Ue=ne.x,at=ne.y,Rt=ne.z):(Ue=0,at=0,Rt=0);let _t=on.convert(B.format),et=on.convert(B.type),Mt;B.isData3DTexture?(we.setTexture3D(B,0),Mt=H.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(we.setTexture2DArray(B,0),Mt=H.TEXTURE_2D_ARRAY):(we.setTexture2D(B,0),Mt=H.TEXTURE_2D),de.activeTexture(H.TEXTURE0),de.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,B.flipY),de.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),de.pixelStorei(H.UNPACK_ALIGNMENT,B.unpackAlignment);let Ft=de.getParameter(H.UNPACK_ROW_LENGTH),ze=de.getParameter(H.UNPACK_IMAGE_HEIGHT),ce=de.getParameter(H.UNPACK_SKIP_PIXELS),ct=de.getParameter(H.UNPACK_SKIP_ROWS),tn=de.getParameter(H.UNPACK_SKIP_IMAGES);de.pixelStorei(H.UNPACK_ROW_LENGTH,Tt.width),de.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Tt.height),de.pixelStorei(H.UNPACK_SKIP_PIXELS,De),de.pixelStorei(H.UNPACK_SKIP_ROWS,it),de.pixelStorei(H.UNPACK_SKIP_IMAGES,Qe);let wn=E.isDataArrayTexture||E.isData3DTexture,Kn=B.isDataArrayTexture||B.isData3DTexture;if(E.isDepthTexture){let Fn=ge.get(E),Qn=ge.get(B),Qt=ge.get(Fn.__renderTarget),Ci=ge.get(Qn.__renderTarget);de.bindFramebuffer(H.READ_FRAMEBUFFER,Qt.__webglFramebuffer),de.bindFramebuffer(H.DRAW_FRAMEBUFFER,Ci.__webglFramebuffer);for(let ei=0;ei<Ce;ei++)wn&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ge.get(E).__webglTexture,K,Qe+ei),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ge.get(B).__webglTexture,fe,Rt+ei)),H.blitFramebuffer(De,it,Me,Re,Ue,at,Me,Re,H.DEPTH_BUFFER_BIT,H.NEAREST);de.bindFramebuffer(H.READ_FRAMEBUFFER,null),de.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(K!==0||E.isRenderTargetTexture||ge.has(E)){let Fn=ge.get(E),Qn=ge.get(B);de.bindFramebuffer(H.READ_FRAMEBUFFER,ee),de.bindFramebuffer(H.DRAW_FRAMEBUFFER,se);for(let Qt=0;Qt<Ce;Qt++)wn?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Fn.__webglTexture,K,Qe+Qt):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Fn.__webglTexture,K),Kn?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Qn.__webglTexture,fe,Rt+Qt):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Qn.__webglTexture,fe),K!==0?H.blitFramebuffer(De,it,Me,Re,Ue,at,Me,Re,H.COLOR_BUFFER_BIT,H.NEAREST):Kn?H.copyTexSubImage3D(Mt,fe,Ue,at,Rt+Qt,De,it,Me,Re):H.copyTexSubImage2D(Mt,fe,Ue,at,De,it,Me,Re);de.bindFramebuffer(H.READ_FRAMEBUFFER,null),de.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else Kn?E.isDataTexture||E.isData3DTexture?H.texSubImage3D(Mt,fe,Ue,at,Rt,Me,Re,Ce,_t,et,Tt.data):B.isCompressedArrayTexture?H.compressedTexSubImage3D(Mt,fe,Ue,at,Rt,Me,Re,Ce,_t,Tt.data):H.texSubImage3D(Mt,fe,Ue,at,Rt,Me,Re,Ce,_t,et,Tt):E.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,fe,Ue,at,Me,Re,_t,et,Tt.data):E.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,fe,Ue,at,Tt.width,Tt.height,_t,Tt.data):H.texSubImage2D(H.TEXTURE_2D,fe,Ue,at,Me,Re,_t,et,Tt);de.pixelStorei(H.UNPACK_ROW_LENGTH,Ft),de.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ze),de.pixelStorei(H.UNPACK_SKIP_PIXELS,ce),de.pixelStorei(H.UNPACK_SKIP_ROWS,ct),de.pixelStorei(H.UNPACK_SKIP_IMAGES,tn),fe===0&&B.generateMipmaps&&H.generateMipmap(Mt),de.unbindTexture()},this.initRenderTarget=function(E){ge.get(E).__webglFramebuffer===void 0&&we.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?we.setTextureCube(E,0):E.isData3DTexture?we.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?we.setTexture2DArray(E,0):we.setTexture2D(E,0),de.unbindTexture()},this.resetState=function(){W=0,G=0,$=null,de.reset(),Un.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qc}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}};var qr={normal:1,related:.85,weak:.5,quiet:.3,away:.1};var xh=i=>i.normalize("NFD").replace(/\p{M}/gu,"").toLowerCase();function yh(i,e,t=8){let n=xh(e).split(/\s+/).filter(Boolean);return n.length?i.map(r=>{let s=xh(r.title),a=xh(`${r.title} ${r.body} ${r.extra}`);if(!n.every(c=>a.includes(c)))return null;let o=n.reduce((c,l)=>c+(s.startsWith(l)?3:s.includes(l)?2:1),0)+r.weight*.1;return{item:r,score:o}}).filter(Boolean).sort((r,s)=>s.score-r.score||r.item.order-s.item.order).slice(0,t).map(({item:r})=>r):[]}function mp(i,e){let t=i[e],n=new Map(i.map((a,o)=>[a.id,o])),r=new Set(t.links.filter(a=>n.has(a)&&a!==t.id).map(a=>n.get(a)));i.forEach((a,o)=>o!==e&&a.links.includes(t.id)&&r.add(o));let s=new Set;for(let[a,o]of Object.entries(t.members))for(let c of o){let l=i.map((p,d)=>p.members[a]?.includes(c)?d:-1).filter(p=>p>=0),h=l.indexOf(e);for(let p of[l[h-1],l[h+1]])p!==void 0&&!r.has(p)&&s.add(p)}return{links:[...r].sort((a,o)=>a-o),near:[...s].sort((a,o)=>a-o)}}function gp(i,e,t=null){if(!t)return{previous:e>0?e-1:null,next:e<i.length-1?e+1:null};let n=Go(i,t),r=n.indexOf(e);return r<0?{previous:n.findLast(s=>s<e)??null,next:n.find(s=>s>e)??null}:{previous:n[r-1]??null,next:n[r+1]??null}}function _p(i,e,t,n,r=3){let s=gi.flatMap(a=>(e[a]??[]).map((o,c)=>({facet:a,item:c,title:t[a]?.[o]??o,body:"",extra:"",count:Go(i,{facet:a,item:c}).length}))).filter(a=>a.count>0);return yh(s.map((a,o)=>({...a,weight:Math.min(3,a.count/4),order:o})),n,r)}function vp(i,{selected:e=-1,near:t=new Set,weak:n=new Set,filter:r=null}){return i.map((s,a)=>{let o=qr.normal;return e>=0&&(o=a===e?1:t.has(a)?qr.related:n.has(a)?qr.weak:qr.quiet),r&&!(s.members[r.facet]??[]).includes(r.item)&&(o=a===e?1:Math.min(o,qr.away)),o})}var xp=(i,e)=>i.map((t,n)=>e.has(n)?1:qr.quiet),yp=(i,e)=>[...i].map(t=>[t,e,!0]),Go=(i,e)=>e?i.map((t,n)=>(t.members[e.facet]??[]).includes(e.item)?n:-1).filter(t=>t>=0):[];function Sp(i,e){let t=[];return e.forEach((n,r)=>r>0&&t.push([e[r-1],n,i[e[r-1]].period!==i[n].period])),t}function Mp(i,e,t){let n=new Array(t).fill(0);for(let r of e)i[r].period>=0&&n[i[r].period]++;return n}var Cx=10,Ix=3,Px=8,pp=[[1,0],[-1,0],[0,1],[0,-1]],fp=[[1,1],[-1,1],[1,-1],[-1,-1]];function bp({x:i,y:e,r:t},{width:n,height:r},s,a=12){let o=t+Cx,c=(d,u,m,f)=>{let v=u===0?i+d*m-(d<0?n:0):Math.min(Math.max(i-n/2,a),s-n-a),g=u===0?e-r/2:u>0?e+m-2:e-m+2-r;return{left:v,right:v+n,top:g,bottom:g+r,far:f}},l=(d,u,m,f)=>{let v=i+d*m-(d<0?n:0),g=e+u*m-(u<0?r:0);return{left:v,right:v+n,top:g,bottom:g+r,far:f}},h=r+4,p=Array.from({length:Ix},(d,u)=>o+(u+1)*h);return[...pp.map(([d,u])=>c(d,u,o,!1)),...fp.map(([d,u])=>l(d,u,o,!1)),...p.flatMap(d=>[...pp.map(([u,m])=>c(u,m,d,!0)),...fp.map(([u,m])=>l(u,m,d,!0))])]}function Tp(i,{free:e,clear:t,inside:n,forced:r=!1}){return i.find(s=>e(s)&&t(s))??i.find(e)??(r?i.find(s=>s.far===!1&&n(s))??i[0]:null)}function Ep(i,{x:e,y:t,r:n}){let r=Math.min(Math.max(e,i.left),i.right),s=Math.min(Math.max(t,i.top),i.bottom),a=Math.hypot(e-r,t-s)-n*.45;return a>4?{x:r-i.left,y:s-i.top,length:a,angle:Math.atan2(t-s,e-r)}:null}var wp=i=>Math.min(i,70)+Px;function Sh(i){let e=new Map;return i.forEach((t,n)=>{if(t.period<0)return;let r=e.get(t.period);(r===void 0||t.weight>i[r].weight||t.weight===i[r].weight&&t.year<i[r].year)&&e.set(t.period,n)}),[...e.entries()].sort((t,n)=>t[0]-n[0]).map(([,t])=>t)}function Ap(i,e){let t=n=>n.visible!==!1&&n.x>=e.left&&n.x<=e.right&&n.y>=e.top&&n.y<=e.bottom;for(let n=1;n<i.length;n++){let r=i[n-1],s=i[n];if(!t(r)||t(s))continue;let a=0,o=1;for(let c=0;c<18;c++){let l=(a+o)/2;t({visible:s.visible,x:r.x+(s.x-r.x)*l,y:r.y+(s.y-r.y)*l})?a=l:o=l}return{t:(n-1+a)/(i.length-1),x:r.x+(s.x-r.x)*a,y:r.y+(s.y-r.y)*a,angle:Math.atan2(s.y-r.y,s.x-r.x)}}return null}function Rp(i,e){return[[Math.abs(i.y-e.top),"top"],[Math.abs(i.x-e.right),"right"],[Math.abs(i.y-e.bottom),"bottom"],[Math.abs(i.x-e.left),"left"]].reduce((n,r)=>r[0]<n[0]?r:n)[1]}function Cp(i,e,{width:t,height:n},r,s=8){let a=h=>Math.min(Math.max(h,r.left),Math.max(r.left,r.right-t)),o=h=>Math.min(Math.max(h,r.top),Math.max(r.top,r.bottom-n)),c=e==="left"?i.x+s:e==="right"?i.x-s-t:a(i.x-t/2),l=e==="top"?i.y+s:e==="bottom"?i.y-s-n:o(i.y-n/2);return{left:c,right:c+t,top:l,bottom:l+n}}function Ip(i,e,t=4,n=[]){let r=[...n],s=(a,o)=>a.left<o.right+t&&a.right+t>o.left&&a.top<o.bottom+t&&a.bottom+t>o.top;for(let a of i){let o=a.side==="top"||a.side==="bottom"?"top":"left",c=o==="top"?a.box.bottom-a.box.top:a.box.right-a.box.left,l=a.side==="bottom"||a.side==="right"?-1:1,h=a.box;for(let d=0;d<4&&r.some(u=>s(h,u));d++){let u=(c+t)*l*(d+1);h=o==="top"?{...a.box,top:a.box.top+u,bottom:a.box.bottom+u}:{...a.box,left:a.box.left+u,right:a.box.right+u}}h.left>=e.left-1&&h.right<=e.right+1&&h.top>=e.top-1&&h.bottom<=e.bottom+1&&!r.some(d=>s(h,d))?(r.push(h),a.box=h,a.shown=!0):a.shown=!1}return i}function Pp(i,{width:e,height:t,pad:n=6}){let r=i.map(u=>u[0]),s=i.map(u=>u[1]),[a,o,c,l]=[Math.min(...r),Math.max(...r),Math.min(...s),Math.max(...s)],h=Math.min((e-2*n)/(o-a||1),(t-2*n)/(l-c||1)),p=(e-(o-a)*h)/2,d=(t-(l-c)*h)/2;return{scale:h,to:([u,m])=>[p+(u-a)*h,d+(l-m)*h],from:([u,m])=>[a+(u-p)/h,l-(m-d)/h]}}function Lp(i,[e,t],n=1.35){let r=-1,s=n;return i.forEach((a,o)=>{let c=Math.hypot(a.centre[0]-e,a.centre[1]-t)/a.radius;c<s&&([r,s]=[o,c])}),r}var Np=(i,e,t=520,n=!0)=>i==="milestone"&&e>=t&&n,Ai={tiers:[{keep:1,ratio:1/0},{keep:.65,ratio:1.5},{keep:.4,ratio:1}],slow:1e3/30,window:90,windows:3},Dp=i=>i.length?i.reduce((e,t)=>e+t,0)/i.length:0,Up=(i,e)=>e>Ai.slow&&i<Ai.tiers.length-1?i+1:i;function Op(i,e=5){let t=Sh(i);return t.length<=e?t:Array.from({length:e},(n,r)=>t[Math.floor(r*t.length/e)])}function Fp(i,{now:e,idleSince:t,eligible:n,plan:r},{wait:s=20,hold:a=6}={}){if(!r.length)return{state:i,open:null};if(i.phase==="off")return{state:i,open:null};if(i.phase==="touring"){if(t>i.at||!n)return{state:{phase:"off",step:0,at:e},open:null,stopped:!0};if(e-i.at<a)return{state:i,open:null};let o=i.step+1;return o>=r.length?{state:{phase:"off",step:0,at:e},open:null,done:!0}:{state:{phase:"touring",step:o,at:e},open:r[o]}}return n&&e-Math.max(t,i.at)>=s?{state:{phase:"touring",step:0,at:e},open:r[0]}:{state:i,open:null}}var Ho={minDistance:6,maxDistance:640,minPitch:-1.3,maxPitch:1.3},bn=(i,e,t)=>Math.min(t,Math.max(e,i));function Bp({target:i,distance:e,yaw:t,pitch:n}){let r=Math.cos(n);return[i[0]+e*r*Math.sin(t),i[1]+e*Math.sin(n),i[2]+e*r*Math.cos(t)]}var Mh=(i,e)=>bn(i*Math.exp(e),Ho.minDistance,Ho.maxDistance),zp=({yaw:i,pitch:e},t,n)=>({yaw:i+t,pitch:bn(e+n,Ho.minPitch,Ho.maxPitch)});function Vp({target:i,distance:e,yaw:t,pitch:n},r,s,a,o){let c=2*e*Math.tan(o/2)/a,l=[Math.cos(t),0,-Math.sin(t)],h=[-Math.sin(n)*Math.sin(t),Math.cos(n),-Math.sin(n)*Math.cos(t)];return i.map((p,d)=>p-l[d]*r*c+h[d]*s*c)}var Yr=(i,e,t,n)=>Number.isFinite(i)?i+(e-i)*(1-Math.exp(-n*Math.max(0,t))):e,Lx=(i,e)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i));function kp(i,e,t,n){return{target:i.target.map((r,s)=>Yr(r,e.target[s],t,n)),distance:Math.exp(Yr(Math.log(i.distance),Math.log(e.distance),t,n)),yaw:Yr(i.yaw,Lx(i.yaw,e.yaw),t,n),pitch:Yr(i.pitch,e.pitch,t,n)}}var Wo=[0,2,4,7,9],bh=[{root:0,pad:[0,7,14,16]},{root:-7,pad:[0,7,9,16]},{root:-3,pad:[4,9,14,19]},{root:-5,pad:[2,9,14,21]},{root:2,pad:[2,5,9,12]}],ke={tuning:432,base:432*2**(-7/12),octaves:2,from:1980,to:2030,master:.7,soften:2200,floor:30,fade:9,chordFrom:24,chordTo:38,detune:4,padCut:760,padSwing:220,padLevel:.0052,shimmerLevel:7e-4,subLevel:.007,airLevel:.012,airCut:520,room:1,reverb:5,reach:.03,bed:{pad:[.35,.8],shimmer:[.1,1],air:[.2,.9],sub:[1,0]},note:[.8,1],hover:[.15,1],swell:[.3,1],travel:[.15,1],tick:432,tickGap:1.4,tickPeak:.01,noteGap:.3,swellPeak:.022,travelPeak:.015,arrival:.9,voices:4,crowd:.5,fadeIn:3.5,fadeOut:.7,suspendAfter:4e3,interval:2e3,horizon:4},Xo=-19,Nx=-43,Gs=i=>ke.tuning*2**(i/12),$r=i=>Math.min(1,Math.max(0,i));function Gp(i){let e=Wo.length*ke.octaves,t=Math.min(e-1,Math.floor($r((i-ke.from)/(ke.to-ke.from))*e)),n=Wo[t%Wo.length]+12*Math.floor(t/Wo.length);return ke.base*2**(n/12)}var Hp=i=>({1:3,2:4.5,3:6})[i]??3,Wp=i=>.024+.007*Math.min(3,Math.max(1,i)),Xp=i=>Gs(i==="clone"?Xo:Xo-7),jp=i=>1/(1+ke.crowd*i),Th=(i,e,t=ke.tickGap)=>i-e>=t;function qp(i){let{root:e,pad:t}=bh[i%bh.length];return{sub:Gs(Nx+(e%12+12)%12),pad:t.map(n=>Gs(Xo+n)),shimmer:t.slice(2).map(n=>Gs(Xo+n+12))}}function Yp(i,e){let t=bh.map((n,r)=>r).filter(n=>n!==i);return t[Math.min(t.length-1,Math.floor($r(e)*t.length))]}var $p=i=>ke.chordFrom+$r(i)*(ke.chordTo-ke.chordFrom);function Zp(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,e|1);return t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Jp(i,e){let t=Zp(e),n=new Float32Array(i),r=0,s=0;for(let a=0;a<i;a++)r=(r+.04*(t()*2-1))/1.04,n[a]=r,s=Math.max(s,Math.abs(r));for(let a=0;a<i;a++)n[a]/=s;return n}function Kp(i,e=1){let t=Math.floor(i*ke.reverb*1.1);return[0,1].map(n=>{let r=Zp(e+n*7919),s=new Float32Array(t),a=0;for(let o=0;o<t;o++){let c=o/i,l=$r((c-ke.reach)/.05),h=Math.exp(-6.9078*c/ke.reverb),p=$r((t-o)/(i*.4)),d=3200*(600/3200)**$r(c/ke.reverb);a+=(1-Math.exp(-2*Math.PI*d/i))*(r()*2-1-a),s[o]=a*l*h*p}return s})}var Dx=[[1,1,1],[2,.22,.5],[3,.08,.3],[4.07,.03,.2]],Ux=[[1,1,1],[1.5,.25,1.2]],Ox=[[1,1,1]];function Fx(i,e=Math.random){let t=i.sampleRate,n={at:i.currentTime+.05,chord:0,lastNote:-1/0,lastTick:-1/0,period:-1,year:0,voices:[]},r=(ae=0)=>{let ie=i.createGain();return ie.gain.value=ae,ie},s=(ae,ie,be=.5)=>{let me=i.createBiquadFilter();return me.type=ae,me.frequency.value=ie,me.Q.value=be,me},a=(ae,ie,be=0)=>{let me=i.createOscillator();return me.type=ae,me.frequency.value=ie,me.detune.value=be,me},o=ae=>{let ie=i.createBuffer(ae.length,ae[0].length,t);return ae.forEach((be,me)=>ie.getChannelData(me).set(be)),ie},c=(ae,ie,be)=>{let me=a("sine",ae),oe=r(ie);me.connect(oe),oe.connect(be),me.start()},l=r(0),h=s("highpass",ke.floor,.7),p=s("lowpass",ke.soften,.5),d=r(1);d.connect(p),p.connect(h),h.connect(l),l.connect(i.destination);let u=i.createConvolver();u.buffer=o(Kp(t));let m=r(ke.room);u.connect(m),m.connect(d);let f=([ae,ie])=>{let be=r(ae),me=r(ie);return be.connect(d),me.connect(u),[be,me]},v=(ae,ie)=>ie.forEach(be=>ae.connect(be)),g=f(ke.bed.pad),_=f(ke.bed.shimmer),y=f(ke.bed.air),b=f(ke.bed.sub),T=f(ke.note),S=f(ke.hover),P=f(ke.swell),O=f(ke.travel),z=s("lowpass",ke.padCut,.3),N=r(1);z.connect(N),v(N,g),c(.031,ke.padSwing,z.frequency);let j=r(.6);v(j,_),c(.057,.4,j.gain);let U=o([Jp(t*6,11)]),Z=i.createBufferSource(),ee=s("bandpass",ke.airCut,.6),se=r(ke.airLevel);Z.buffer=U,Z.loop=!0,Z.connect(ee),ee.connect(se),v(se,y),c(.043,ke.airLevel*.6,se.gain),Z.start();let W=ae=>()=>ae.forEach(ie=>ie.disconnect()),G=(ae,ie,be)=>{let{sub:me,pad:oe,shimmer:re}=qp(ae),_e=ie+be+ke.fade,Se=(A,w,I)=>{let D=r(0);D.gain.setValueAtTime(0,ie),D.gain.linearRampToValueAtTime(w,ie+ke.fade),D.gain.setValueAtTime(w,_e-ke.fade),D.gain.linearRampToValueAtTime(0,_e),A.connect(D),D.connect(I),A.start(ie),A.stop(_e+.1),A.onended=W([A,D])};oe.forEach(A=>[-ke.detune,ke.detune].forEach(w=>Se(a("triangle",A,w),ke.padLevel,z))),re.forEach(A=>Se(a("sine",A),ke.shimmerLevel,j));let Te=r(1);v(Te,b),Se(a("sine",me),ke.subLevel,Te)},$=(ae,{peak:ie,attack:be,length:me,partials:oe,outputs:re,when:_e})=>{let Se=Math.max(_e,i.currentTime),Te=me/4.6,A=be*3,w=r(1);v(w,re),n.voices=n.voices.filter(L=>L.end>Se),n.voices.length>=ke.voices&&n.voices.shift().duck.gain.setTargetAtTime(0,Se,.15);let I=ie*jp(n.voices.length),D=Se,x=null,F=[w];for(let[L,R,X]of oe){let Y=a("sine",ae*L),te=r(0);te.gain.setValueAtTime(0,Se),te.gain.setTargetAtTime(I*R,Se,be),te.gain.setTargetAtTime(0,Se+A,Te*X),Y.connect(te),te.connect(w),Y.start(Se);let pe=Se+A+Te*X*8;Y.stop(pe),pe>=D&&(D=pe,x=Y),F.push(Y,te)}x.onended=W(F),n.voices.push({end:D,duck:w})},he=(ae,ie)=>{let be=Math.max(ie,i.currentTime),[me,oe]=ae>=0?[220,680]:[680,220],re=i.createBufferSource(),_e=s("bandpass",me,1.2),Se=r(0);re.buffer=U,re.loop=!0,_e.frequency.setValueAtTime(me,be),_e.frequency.exponentialRampToValueAtTime(oe,be+3.2),Se.gain.setValueAtTime(0,be),Se.gain.setTargetAtTime(ke.travelPeak,be,.5),Se.gain.setTargetAtTime(0,be+1.5,.6),re.connect(_e),_e.connect(Se),v(Se,O),re.start(be,e()*2),re.stop(be+6.5),re.onended=W([re,_e,Se])};return{master:l,run(ae=ke.horizon){for(;n.at<i.currentTime+ae;){let ie=$p(e());G(n.chord,n.at,ie),n.at+=ie,n.chord=Yp(n.chord,e())}},fade(ae){let ie=i.currentTime;l.gain.cancelScheduledValues(ie),l.gain.setTargetAtTime(ae?ke.master:0,ie,ae?ke.fadeIn:ke.fadeOut)},memory({year:ae,weight:ie,period:be=-1},me=i.currentTime){if(!Th(me,n.lastNote,ke.noteGap))return;n.lastNote=me;let oe=be>=0&&n.period>=0&&be!==n.period;oe&&he(ae>=n.year?1:-1,me),n.period=be,n.year=ae,$(Gp(ae),{peak:Wp(ie),attack:.02,length:Hp(ie),partials:Dx,outputs:T,when:me+(oe?ke.arrival:0)})},swell(ae,ie=i.currentTime){$(Xp(ae),{peak:ke.swellPeak,attack:.9,length:6,partials:Ux,outputs:P,when:ie})},tick(ae=i.currentTime){Th(ae,n.lastTick)&&(n.lastTick=ae,$(ke.tick,{peak:ke.tickPeak,attack:.15,length:1.4,partials:Ox,outputs:S,when:ae}))},travel(ae,ie=i.currentTime){he(ae,ie)}}}function Qp(){let i=globalThis.AudioContext??globalThis.webkitAudioContext,e={context:null,graph:null,on:!0,timer:0,stopTimer:0};if(!i)return{supported:!1,toggle:()=>!1,start:()=>!1,running:()=>!1,isOn:()=>!1,memory(){},swell(){},tick(){},travel(){},pause(){},close(){}};let t=()=>e.on&&e.graph,n=()=>{e.context||(e.context=new i,e.graph=Fx(e.context));let{context:r,graph:s}=e;clearTimeout(e.stopTimer),clearInterval(e.timer),s.fade(!0),r.resume?.(),s.run(),e.timer=setInterval(()=>s.run(),ke.interval)};return{supported:!0,isOn:()=>e.on,running:()=>e.context?.state==="running",start(){return e.on&&!document.hidden&&n(),e.on},toggle(){return!e.context&&e.on?(e.on=!1,!1):(e.on=!e.on,e.on?n():(clearTimeout(e.stopTimer),clearInterval(e.timer),e.graph.fade(!1),e.stopTimer=setTimeout(()=>!e.on&&e.context.suspend?.(),ke.suspendAfter)),e.on)},memory(r){t()&&e.graph.memory(r)},swell(r){t()&&e.graph.swell(r)},tick(){t()&&e.graph.tick()},travel(r){t()&&e.graph.travel(r)},pause(r){!e.context||!e.on||(r?e.context.suspend?.():e.context.resume?.())},close(){clearTimeout(e.stopTimer),clearInterval(e.timer),e.on=!0,e.context?.close?.(),e.context=null,e.graph=null}}}var dn={delay:.1,seconds:5,order:.6,jitter:.08,flight:.3,arrive:.54,swirl:2.6,burst:.17,glow:.07},jo={radius:.2,push:.04,rate:6};var Eh=i=>i>=1?1/0:Math.min(1,Math.max(0,(i-dn.arrive*dn.flight)/dn.order)),ef=`
  #define DISCOVER_ORDER ${dn.order.toFixed(2)}
  #define DISCOVER_JITTER ${dn.jitter.toFixed(2)}
  #define DISCOVER_FLIGHT ${dn.flight.toFixed(2)}
  #define DISCOVER_SWIRL ${dn.swirl.toFixed(2)}
  #define DISCOVER_ARRIVE ${dn.arrive.toFixed(2)}
  #define DISCOVER_BURST ${dn.burst.toFixed(2)}
  #define DISCOVER_GLOW ${dn.glow.toFixed(2)}
  #define SPIN_SLOTS ${Gn.slots}
  #define POINTER_RADIUS ${jo.radius.toFixed(2)}
  #define POINTER_PUSH ${jo.push.toFixed(3)}
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
  varying float vAlpha;
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
    float lit = aKind > 0.5 ? step(0.0, since) : 1.0;
    float pulse = max(since, 0.0) / DISCOVER_GLOW;
    float flash = aKind > 0.5 ? lit * pulse * exp(1.0 - pulse) : 0.0;
    if (aKind > 0.5) m = lit;
    vec3 centre = aCenter;
    int galaxy = int(aGalaxy + 0.5);
    if (aGalaxy > -0.5 && galaxy < SPIN_SLOTS) {
      float turn = uSpin[galaxy];
      vec2 around = centre.xy - uPivot[galaxy].xy;
      centre.xy = uPivot[galaxy].xy + vec2(cos(turn) * around.x - sin(turn) * around.y, sin(turn) * around.x + cos(turn) * around.y);
    }
    vec3 off = position;
    float spin = uTime * (0.1 + 0.2 * aSeed) * aKind;
    float c = cos(spin);
    float s = sin(spin);
    off.xy = vec2(c * off.x - s * off.y, s * off.x + c * off.y);
    off *= 1.0 + 0.07 * aKind * sin(uTime * 0.8 + aSeed * 20.0);
    float e = 1.0 - pow(1.0 - m, 3.0);
    vec3 target = centre + off;
    vec3 rel = aFrom - target;
    float twist = (1.0 - e) * DISCOVER_SWIRL;
    rel.xy = vec2(cos(twist) * rel.x - sin(twist) * rel.y, sin(twist) * rel.x + cos(twist) * rel.y);
    vec3 p = target + rel * (1.0 - e);
    if (aKind > 0.5) p = centre + off * smoothstep(0.0, 1.0, clamp(since / DISCOVER_BURST, 0.0, 1.0));
    p += vec3(sin(aSeed * 91.7 + uTime * 0.35), cos(aSeed * 57.3 + uTime * 0.31), sin(aSeed * 33.1 + uTime * 0.27)) * (0.05 + 0.5 * (1.0 - m));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
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
    vAlpha = min(1.0, vAlpha * lit * smoothstep(0.0, 0.5, pulse) * (1.0 + 1.2 * flash));
    gl_PointSize *= 1.0 + 0.8 * flash;
    if (aKind < 0.5 && uPointer.z > 0.001) {
      float ratio = projectionMatrix[1][1] / projectionMatrix[0][0];
      vec2 away = (gl_Position.xy / gl_Position.w - uPointer.xy) * vec2(ratio, 1.0);
      float gap = max(length(away), 0.0001);
      float fall = 1.0 - smoothstep(0.0, POINTER_RADIUS, gap);
      vec2 dir = away / gap * vec2(1.0 / ratio, 1.0);
      gl_Position.xy += dir * fall * fall * POINTER_PUSH * uPointer.z * gl_Position.w;
    }
  }
`,tf=`
  uniform vec3 uInk;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    gl_FragColor = vec4(uInk, smoothstep(1.0, 0.3, d) * vAlpha);
  }
`,nf=`
  attribute float aSize;
  attribute float aState;
  attribute float aOrder;
  attribute float aFade;
  uniform float uScale;
  uniform float uTime;
  uniform float uReveal;
  varying float vState;
  varying float vFade;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float pulse = fract(uTime * 0.35);
    float size = aSize;
    if (aState > 2.5 && aState < 3.5) size *= 1.0 + 2.0 * pulse;
    float reveal = smoothstep(aOrder - 0.02, aOrder, uReveal);
    vState = aState;
    vFade = ((aState > 2.5 && aState < 3.5) ? 1.0 - pulse : 1.0) * reveal * aFade;
    gl_PointSize = clamp(size * uScale / -mv.z, 2.0, 140.0);
  }
`,rf=`
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
`,sf=`
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
`,af=`
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
`;var qo=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,wh=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},fr=(i,e,t)=>i+(e-i)*t;function of(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function Yo(i){return()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Ah=-.27,Ih=.35,Rh=[0,0,-7],qi=18,lf=40,Bx=6,zx=.5,Ch=4.2;function cf({canvas:i,cloud:e,marks:t,future:n,today:r,mobile:s,sky:a}){let o=new zo({canvas:i,antialias:!1,powerPreference:"high-performance"});o.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2));let c=new ps,l=new sn(36,innerWidth/innerHeight,.1,4e3),h=r+ol[1]+.4,p=new Float32Array(e.count*3);for(let k=0;k<p.length;k++)p[k]=e.position[k]-e.center[k];let d=new vt,u=(k,ue)=>new Dt(k,ue).setUsage(Xc);d.setAttribute("position",new Dt(p,3)),d.setAttribute("aFrom",new Dt(e.from,3)),d.setAttribute("aCenter",new Dt(e.center,3)),Object.entries({u:"aU",order:"aOrder",seed:"aSeed",size:"aSize",ahead:"aAhead",kind:"aKind",memory:"aMemory",galaxy:"aGalaxy"}).forEach(([k,ue])=>d.setAttribute(ue,new Dt(e[k],1))),["threads","people","places"].forEach((k,ue)=>d.setAttribute(`aFacet${ue}`,new Dt(e.facet[k],1)));let f=new Float32Array(Math.max(1,t.length)).fill(1),v=new Float32Array(f),g=new Nr(f,f.length,1,Eo,Jn);g.minFilter=g.magFilter=li,g.needsUpdate=!0;let _={value:new st},y=Qh({count:s?4e3:void 0,random:Yo(2026)}),b=new vt;b.setAttribute("position",new Dt(y.position,3)),b.setAttribute("aSeed",new Dt(y.seed,1)),b.setAttribute("aBright",new Dt(y.bright,1)),b.setAttribute("aHalo",new Dt(y.halo,1)),b.setAttribute("aSize",new Dt(y.size,1));let T={uTime:{value:0},uPixel:{value:1},uGain:{value:.6},uHalo:{value:1},uInk:_},S=new en({uniforms:T,vertexShader:sf,fragmentShader:af,transparent:!0,depthTest:!1,depthWrite:!1}),P=new ir(b,S);P.frustumCulled=!1,P.renderOrder=-1,c.add(P);let O=Math.min(1,Math.sqrt(6e4/e.count)),z={uMix:{value:0},uTime:{value:0},uScale:{value:1},uFar:{value:1},uGain:{value:1},uFocusU:{value:0},uFocusW:{value:7},uFocusOn:{value:0},uFilterFacet:{value:-1},uFilterItem:{value:-1},uAway:{value:.12},uReveal:{value:1e4},uLevelCount:{value:f.length},uLevels:{value:g},uSpin:{value:new Float32Array(Gn.slots)},uPivot:{value:Array.from({length:Gn.slots},(k,ue)=>new C(...a.list[ue]?.centre??[0,0,0]))},uKeep:{value:1},uPointer:{value:new C(0,0,0)},uInk:_},N=new en({uniforms:z,vertexShader:ef,fragmentShader:tf,transparent:!0,depthTest:!1,depthWrite:!1}),j=new ir(d,N);j.frustumCulled=!1,c.add(j);let U=[...t.map(k=>k.position),n.today,n.today,n.book,n.clone],Z=new Float32Array(Gn.slots),ee=(k,ue)=>{ue.set(...U[k]);let Ie=k<t.length?t[k].period:-1;if(Ie>=0&&Ie<Gn.slots&&Z[Ie]){let Ze=a.list[Ie].centre,[bt,E]=[ue.x-Ze[0],ue.y-Ze[1]];ue.x=Ze[0]+Math.cos(Z[Ie])*bt-Math.sin(Z[Ie])*E,ue.y=Ze[1]+Math.sin(Z[Ie])*bt+Math.cos(Z[Ie])*E}return ue},se=[{size:1.3,state:1,order:.96},{size:2.4,state:3,order:.96},{size:2.4,state:2,order:.98},{size:2.4,state:2,order:1},{size:8,state:4,order:0},{size:8,state:4,order:0}],W=4,G=5,$=u(new Float32Array(se.length*3),3),he=u(Float32Array.from(se.map(k=>k.size)),1),ae=u(new Float32Array(se.length).fill(1),1),ie=new vt;ie.setAttribute("position",$),ie.setAttribute("aSize",he),ie.setAttribute("aFade",ae),ie.setAttribute("aState",new Dt(Float32Array.from(se.map(k=>k.state)),1)),ie.setAttribute("aOrder",new Dt(Float32Array.from(se.map(k=>k.order)),1));let be={uScale:{value:1},uTime:{value:0},uReveal:{value:0},uInk:_},me=new en({uniforms:be,vertexShader:nf,fragmentShader:rf,transparent:!0,depthTest:!1,depthWrite:!1}),oe=new ir(ie,me);oe.frustumCulled=!1,c.add(oe);let re=[],_e=(k,ue=!1)=>{let Ie=ue?new Is({transparent:!0,dashSize:.8,gapSize:.9,depthTest:!1}):new tr({transparent:!0,depthTest:!1});return re.push({material:Ie,opacity:k}),Ie},Se=k=>new vt().setAttribute("position",new Ve(k,3)),Te=new bi,A=(k,ue,Ie=1980)=>(k.frustumCulled=!1,k.userData.opacity=ue,k.userData.year=Ie,Te.add(k),k),w=[];(()=>{let k=B=>B.members.threads?.[0]??0,ue=new Map,Ie=a.list.map(()=>[]);t.forEach(B=>{let q=`${B.period}:${k(B)}`;ue.has(q)&&Ie[B.period].push(...ue.get(q),...B.position),ue.set(q,B.position)}),Ie.forEach((B,q)=>{if(!B.length)return;let ne=a.list[q].centre,K=A(new nr(Se(B.map((fe,Me)=>fe-ne[Me%3])),_e(.34)),.34,a.list[q].end);K.position.set(...ne),w.push({lines:K,k:q})});let Ze=(B,q)=>{let ne=[],K=Math.max(8,Math.ceil((q-B)/1.5));for(let fe=0;fe<=K;fe++)ne.push(...gr(a,B+(q-B)*fe/K));return Se(ne)};a.list.forEach((B,q)=>{let ne=[];for(let Me=0;Me<=120;Me++){let Re=Math.PI*2*Me/120;ne.push(B.centre[0]+(B.radius+1.6)*Math.sin(Re),B.centre[1]+(B.radius+1.6)*Math.cos(Re),B.centre[2])}let K=new wi(Se(ne),_e(.16,!0));K.computeLineDistances(),A(K,.16,B.start);let fe=a.list[q+1];fe&&A(new wi(Ze(B.along+B.radius+1.6,fe.along-fe.radius-1.6),_e(.22)),.22,fe.start)});let bt=a.list.at(-1),E=new wi(Ze(bt.along+bt.radius+1.6,a.length),_e(.36,!0));E.computeLineDistances(),A(E,.36,r)})(),c.add(Te);let D=8,x=[];for(let k=0;k<=120;k++)x.push(Math.sin(Math.PI*2*k/120),Math.cos(Math.PI*2*k/120),0);let F=Array.from({length:D},()=>{let k=new wi(Se(x),_e(.3,!0));return k.computeLineDistances(),k.frustumCulled=!1,k.visible=!1,c.add(k),k}),L={list:[],centre:[0,0,0],want:0,fade:0},R=k=>{let ue=new Float32Array(lf*qi*6),Ie=u(ue,3),Ze=new nr(new vt().setAttribute("position",Ie),_e(k));return Ze.frustumCulled=!1,Ze.geometry.setDrawRange(0,0),c.add(Ze),{lines:Ze,attribute:Ie,positions:ue,indices:[],fade:0,opacity:k}},X=R(.7),Y=R(.3),te=R(1),pe=160,Pe=new Float32Array(pe*qi*6),Ne=u(Pe,3),ye=new nr(new vt().setAttribute("position",Ne),_e(.6));ye.frustumCulled=!1,ye.geometry.setDrawRange(0,0),c.add(ye);let Le={pairs:[],fade:0},de=(k,ue,Ie,Ze,bt,E=1)=>{for(let B=0;B<qi;B++)for(let[q,ne]of[[0,B/qi*E],[1,(B+1)/qi*E]]){let K=((ue*qi+B)*2+q)*3;k[K]=fr(Ie.x,Ze.x,ne),k[K+1]=fr(Ie.y,Ze.y,ne),k[K+2]=fr(Ie.z,Ze.z,ne)+4*ne*(1-ne)*bt}},ve={map:new Map},ge=new C,we=new C,ft=new C,Ge={target:[...Rh],distance:700,yaw:0,pitch:Ah},Xe={target:[...Rh],distance:340,yaw:0,pitch:Ah},Oe={x:0,y:0,goalX:0,goalY:0},J={reveal:null,follow:-1,idle:!0,hover:-1,selection:-1,preview:-1,previewFade:0,ringFade:0,portrait:innerWidth/innerHeight<1,drift:0},gt=Math.max(...[...t.map(k=>k.position),n.book,n.clone].map(k=>Math.hypot(k[0],k[1])))+12,Be=()=>Math.max(160,gt*4.3)*(J.portrait?1.3:1),yt=k=>Math.min(84,k*(J.portrait?1.5:1)),lt=t.length+2,Ut=k=>k<t.length?k:k+2,Et=Array.from({length:lt},()=>({x:0,y:0,r:0,on:!1,depth:0})),St=new C,wt=new C,Tn=(k,ue={})=>(wt.copy(k).project(l),ue.x=(wt.x*.5+.5)*innerWidth,ue.y=(-wt.y*.5+.5)*innerHeight,ue.visible=wt.z>-1&&wt.z<1,ue),on=({target:k,distance:ue,yaw:Ie,pitch:Ze,follow:bt=-1}={})=>{k&&(Xe.target=[...k]),ue!==void 0&&(Xe.distance=bn(ue,6,640)),Ie!==void 0&&(Xe.yaw=Ie),Ze!==void 0&&(Xe.pitch=Ze),J.follow=bt},Un=(k=Ah)=>on({target:Rh,distance:Be(),yaw:0,pitch:k}),En=new st,H=()=>{let k=getComputedStyle(document.documentElement);En.set(k.getPropertyValue("--bg").trim()),_.value.set(k.getPropertyValue("--fg").trim()),re.forEach(({material:Ie})=>Ie.color.copy(_.value));let ue=En.getHSL({}).l<.5;o.setClearColor(En,1),N.blending=S.blending=ue?Us:Xi,T.uGain.value=ue?1.25:.4,T.uHalo.value=ue?1:0,S.needsUpdate=!0,me.blending=Xi,z.uGain.value=(ue?.55:.6)*O,N.needsUpdate=!0};H();let fn=()=>{J.portrait=innerWidth/innerHeight<1,l.aspect=innerWidth/innerHeight,o.setSize(innerWidth,innerHeight,!1)};fn();let Jt=new Map,ut={x:0,y:0,on:!1,fine:matchMedia("(pointer: fine)").matches&&!qo(),strength:0},Ht={moved:!1,pinch:0,button:0},Yt={hover:()=>{},click:()=>{},frame:()=>{},touch:()=>{},error:k=>console.error(k)},Wt=!0,dt=(k,ue)=>{let Ie=-1,Ze=1;return Et.forEach((bt,E)=>{if(!bt.on)return;let B=Math.max(26,bt.r*.9),q=Math.hypot(bt.x-k,bt.y-ue)/B;q<Ze&&([Ie,Ze]=[E,q])}),Ie},pi=()=>{J.idle=!1,Yt.touch()},fi=(k,ue)=>{Xe.target=Vp(Xe,k,ue,innerHeight,l.fov*Math.PI/180),J.follow=-1};i.addEventListener("pointerdown",k=>{if(!(k.pointerType==="mouse"&&k.button>2)){if(i.setPointerCapture(k.pointerId),Jt.set(k.pointerId,{x:k.clientX,y:k.clientY,startX:k.clientX,startY:k.clientY}),Jt.size===1&&Object.assign(Ht,{moved:!1,button:k.button,pinch:0,shift:k.shiftKey}),Jt.size===2){let[ue,Ie]=[...Jt.values()];Ht.pinch=Math.hypot(ue.x-Ie.x,ue.y-Ie.y),Ht.moved=!0}pi()}}),i.addEventListener("pointermove",k=>{let ue=Jt.get(k.pointerId);if(!ue){k.pointerType==="mouse"&&Yt.hover(dt(k.clientX,k.clientY),k);return}let Ie=k.clientX-ue.x,Ze=k.clientY-ue.y;if(Math.hypot(k.clientX-ue.startX,k.clientY-ue.startY)>Bx&&(Ht.moved=!0),[ue.x,ue.y]=[k.clientX,k.clientY],Jt.size===2){let[bt,E]=[...Jt.values()],B=Math.hypot(bt.x-E.x,bt.y-E.y);Ht.pinch>0&&B>0&&(Xe.distance=Mh(Xe.distance,Math.log(Ht.pinch/B))),Ht.pinch=B,fi(Ie/2,Ze/2);return}Ht.moved&&(Ht.button===2||Ht.button===1||Ht.shift?fi(Ie,Ze):Object.assign(Xe,zp(Xe,-Ie*.005,Ze*.004)))});let Ri=k=>{let ue=Jt.get(k.pointerId);Jt.delete(k.pointerId),ue&&!Ht.moved&&Jt.size===0&&k.type==="pointerup"&&Ht.button===0&&Yt.click(dt(k.clientX,k.clientY),k)};i.addEventListener("pointerup",Ri),i.addEventListener("pointercancel",Ri),i.addEventListener("pointerleave",()=>{ut.on=!1,Yt.hover(-1)}),i.addEventListener("pointermove",k=>{k.pointerType==="mouse"&&(ut.on=ut.fine,ut.x=k.clientX/innerWidth*2-1,ut.y=-(k.clientY/innerHeight)*2+1)}),i.addEventListener("contextmenu",k=>k.preventDefault()),i.addEventListener("wheel",k=>{k.preventDefault();let ue=k.deltaY*(k.deltaMode===1?40:k.deltaMode===2?innerHeight:1);Xe.distance=Mh(Xe.distance,bn(ue*(k.ctrlKey?.012:.0016),-.5,.5)),pi()},{passive:!1});let At=new Ns,Xt=new C,Kt=new C,Yi=0,mi=!0,On=k=>{if(!Wt)return;At.update(k);let ue=Math.min(Math.max(At.getDelta(),0),.25);if(document.hidden){requestAnimationFrame(On);return}let Ie=At.getElapsed();Yi||(Yi=Ie);let Ze=Math.min(1,Math.max(0,(Ie-dn.delay)/dn.seconds));J.follow>=0&&(ee(J.follow,Kt),Xe.target=Kt.toArray());let bt=kp(Ge,Xe,ue,Ch);Object.assign(Ge,bt),Oe.x+=(Oe.goalX-Oe.x)*(1-Math.exp(-Ch*ue)),Oe.y+=(Oe.goalY-Oe.y)*(1-Math.exp(-Ch*ue)),J.drift+=((J.idle&&J.follow<0?1:0)-J.drift)*(1-Math.exp(-ue));let[E,B,q]=Bp({...Ge,yaw:Ge.yaw+Math.sin(Ie*.07)*.1*J.drift});l.position.set(E,B,q),l.fov=yt(36),l.updateProjectionMatrix(),l.lookAt(Ge.target[0],Ge.target[1],Ge.target[2]),l.setViewOffset(innerWidth,innerHeight,-Oe.x,-Oe.y,innerWidth,innerHeight),l.updateMatrixWorld();let ne=innerHeight/(2*Math.tan(l.fov*Math.PI/360)),K=wh(.35,.75,Ge.distance/Be()),fe=Math.max(0,Ie-dn.delay-dn.seconds-.5);a.list.forEach((ce,ct)=>{ct>=Gn.slots||(Z[ct]=ru(ce,fe),z.uSpin.value[ct]=Z[ct])}),w.forEach(({lines:ce,k:ct})=>ce.rotation.z=Z[ct]??0);let Me=Z[0].toFixed(3);i.dataset.spin!==Me&&(i.dataset.spin=Me),ut.strength=Yr(ut.strength,ut.on?1:0,ue,jo.rate),z.uPointer.value.set(ut.x,ut.y,ut.strength);let Re=ut.strength.toFixed(2);i.dataset.pointer!==Re&&(i.dataset.pointer=Re),z.uMix.value=Ze;let Ce=Xh(a,Eh(Ze));z.uTime.value=be.uTime.value=T.uTime.value=Ie,T.uPixel.value=o.getPixelRatio(),z.uFar.value=K,z.uScale.value=be.uScale.value=o.domElement.height/(2*Math.tan(l.fov*Math.PI/360)),be.uReveal.value=Math.min(1,Eh(Ze)),mi=!1;for(let ce=0;ce<f.length;ce++){let ct=v[ce]-f[ce];Math.abs(ct)>.002?(f[ce]+=ct*(1-Math.exp(-7*ue)),mi=!0):f[ce]=v[ce]}mi&&(g.needsUpdate=!0);let De=(ce,ct)=>{ee(t.length+ce,St),$.setXYZ(ce,St.x,St.y,St.z),ae.setX(ce,ct)},it=ce=>z.uReveal.value>=_r(ce)?1:0;De(0,it(r)),De(1,it(r)),De(2,it(h)),De(3,it(h)),J.selection>=0&&(ee(J.selection,St),$.setXYZ(W,St.x,St.y,St.z),he.setX(W,2.2*t[J.selection].spread+2)),J.ringFade+=((J.selection>=0?1:0)-J.ringFade)*(1-Math.exp(-6*ue)),ae.setX(W,J.ringFade),J.preview>=0&&(ee(J.preview,ft),$.setXYZ(G,ft.x,ft.y,ft.z),he.setX(G,2.2*t[J.preview].spread+2)),J.previewFade+=((J.preview>=0?1:0)-J.previewFade)*(1-Math.exp(-9*ue)),ae.setX(G,J.previewFade),$.needsUpdate=he.needsUpdate=ae.needsUpdate=!0;let Qe=`${Ge.yaw.toFixed(2)},${Ge.pitch.toFixed(2)},${Ge.distance.toFixed(0)}`;i.dataset.view!==Qe&&(i.dataset.view=Qe);let at=Math.abs(Math.log(Ge.distance/Xe.distance))<.004&&Math.abs(Math.sin(Ge.yaw-Xe.yaw))<.003&&Math.abs(Ge.pitch-Xe.pitch)<.003&&Ge.target.every((ce,ct)=>Math.abs(ce-Xe.target[ct])<.03)&&Math.abs(Oe.x-Oe.goalX)<.5&&Math.abs(Oe.y-Oe.goalY)<.5?"1":"";i.dataset.rest!==at&&(i.dataset.rest=at);let Rt=J.selection>=0?`${St.x.toFixed(2)},${St.y.toFixed(2)},${St.z.toFixed(2)}`:"";i.dataset.ring!==Rt&&(i.dataset.ring=Rt);let Tt=J.preview>=0?String(J.preview):"";i.dataset.preview!==Tt&&(i.dataset.preview=Tt);let _t=wh(.25,.9,Ze),et=Math.min(Ce,J.reveal??1/0);Te.visible=_t>.01,Te.children.forEach(ce=>ce.material.opacity=ce.userData.opacity*_t*Math.min(1,Math.max(0,(et-ce.userData.year)/2))),te.indices=J.preview>=0&&J.selection>=0&&J.preview!==J.selection?[J.preview]:[];for(let ce of[X,Y,te]){let ct=ce.indices.length?1:0;ce.fade+=(ct-ce.fade)*(1-Math.exp(-5*ue));let tn=Math.min(ce.indices.length,lf);tn&&(ee(J.selection,Kt),ce.indices.slice(0,tn).forEach((wn,Kn)=>{ee(wn,Xt),de(ce.positions,Kn,Kt,Xt,Kt.distanceTo(Xt)*.22,ve.map.get(wn)??1)}),ce.attribute.needsUpdate=!0),ce.lines.geometry.setDrawRange(0,tn*qi*2),ce.lines.material.opacity=ce.opacity*ce.fade,ce.lines.visible=ce.fade>.01}L.fade+=(L.want-L.fade)*(1-Math.exp(-5*ue)),F.forEach((ce,ct)=>{let tn=L.list[ct];ce.visible=!!tn&&L.fade>.01,ce.visible&&(ce.position.set(...L.centre),ce.scale.setScalar(tn.radius),ce.material.dashSize=.5/tn.radius,ce.material.gapSize=1.6/tn.radius,ce.material.opacity=.34*L.fade*_t)});let Mt=L.want&&L.fade>.5?String(L.list.length):"";i.dataset.rings!==Mt&&(i.dataset.rings=Mt);let Ft=_t;Le.fade+=((Le.pairs.length?1:0)-Le.fade)*(1-Math.exp(-5*ue));let ze=Math.min(Le.pairs.length,pe);ze&&Ft>.01&&(Le.pairs.slice(0,ze).forEach(([ce,ct,tn],wn)=>{ee(ce,Kt),ee(ct,Xt),de(Pe,wn,Kt,Xt,Kt.distanceTo(Xt)*(tn?.3:.12))}),Ne.needsUpdate=!0),ye.geometry.setDrawRange(0,ze*qi*2),ye.material.opacity=.6*Le.fade*Ft,ye.visible=ye.material.opacity>.01,i.dataset.jumps=ye.visible?String(ze):"",o.render(c,l),Et.forEach((ce,ct)=>{ee(Ut(ct),St),wt.copy(St).project(l),ce.x=(wt.x*.5+.5)*innerWidth,ce.y=(-wt.y*.5+.5)*innerHeight,ce.depth=l.position.distanceTo(St),ce.r=(t[ct]?.spread??zx)*2.4*ne/ce.depth,ce.on=wt.z>-1&&wt.z<1&&ce.x>0&&ce.x<innerWidth&&ce.y>0&&ce.y<innerHeight});try{Yt.frame({time:Ie,dt:ue,intro:Ze,formed:Ce,far:K,cssScale:ne,projected:Et,camera:l})}catch(ce){Wt=!1,Yt.error(ce);return}Wt&&requestAnimationFrame(On)};return{camera:l,view:Ge,goal:Xe,inset:Oe,state:J,projected:Et,on:(k,ue)=>Yt[k]=ue,stop:()=>Wt=!1,setQuality:k=>{let ue=Ai.tiers[Math.min(k,Ai.tiers.length-1)];z.uKeep.value=ue.keep,o.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2,ue.ratio)),o.setSize(innerWidth,innerHeight,!1)},start:()=>requestAnimationFrame(On),home:Un,homeDistance:Be,fly:on,pick:dt,centerOf:k=>ee(k,new C),project:Tn,resize:fn,applyTheme:H,setLevels:k=>k.forEach((ue,Ie)=>v[Ie]=ue),setFilter:k=>{z.uFilterFacet.value=k?["threads","people","places"].indexOf(k.facet):-1,z.uFilterItem.value=k?k.item:-1},setFocus:k=>{z.uFocusOn.value=k===null?0:1,k!==null&&(z.uFocusU.value=_r(k))},setSelection:k=>J.selection=k,setPreview:k=>J.preview=k,setJumps:k=>Le.pairs=k,slotOf:k=>({today:t.length,book:t.length+2,clone:t.length+3})[k],setReveal:k=>{z.uReveal.value=k===null?1e4:_r(k),J.reveal=k},setLinks:(k,ue)=>{X.indices=k,Y.indices=ue,i.dataset.links=String(k.length+ue.length)},setInset:(k,ue)=>{Oe.goalX=k,Oe.goalY=ue},setIdle:k=>J.idle=k,setLinkReach:k=>ve.map=k,groundAt:(k,ue,Ie)=>{wt.set(k/innerWidth*2-1,-(ue/innerHeight)*2+1,.5).unproject(l),wt.sub(l.position).normalize();let Ze=(Ie-l.position.z)/wt.z,bt=2600,E=Number.isFinite(Ze)&&Ze>0?Math.min(Ze,bt):bt;return[l.position.x+wt.x*E,l.position.y+wt.y*E]},arcScreen:(k,ue,Ie,Ze={})=>(ee(k,ge),ee(ue,we),ft.set(fr(ge.x,we.x,Ie),fr(ge.y,we.y,Ie),fr(ge.z,we.z,Ie)+4*Ie*(1-Ie)*ge.distanceTo(we)*.22),Tn(ft,Ze)),setYearRings:(k,ue)=>{ue.length?Object.assign(L,{list:ue,centre:k,want:1}):L.want=0}}}var Vx="(min-height: 520px) and (min-width: 320px)",kx="(max-width: 900px), (max-aspect-ratio: 1/1)",Ph=74,Gx=124,Hx=24,hf=8,Wx=[0,22],uf={today:2.4,book:1.2,clone:1.2},df=8,pf=20,Zo=4,Xx=40,mr={width:104,height:100,top:118},ff="http://www.w3.org/2000/svg",Lh=matchMedia(kx),mf=.9,jx=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],qx=new Set(["hero","contact"]),Yx=["1","2","3"],pn=[],Jo=()=>{for(;pn.length;)pn.pop()();document.documentElement.classList.remove("immersive"),document.documentElement.classList.add("flat")};function gf(){if(!of()||qo())return Jo();let i=matchMedia(Vx);if(i.addEventListener("change",()=>location.reload()),!i.matches)return Jo();Zx().catch(e=>{console.error(e),Jo()})}function $x(i){let e=0,t=n=>{[...n.childNodes].forEach(r=>{if(r.nodeType===Node.TEXT_NODE){let s=document.createDocumentFragment();r.textContent.split(/(\s+)/).forEach(a=>{if(!a)return;if(/^\s+$/.test(a))return s.append(a);let o=document.createElement("span");o.className="w",o.style.setProperty("--i",e++),o.textContent=a,s.append(o)}),r.replaceWith(s)}else r.nodeType===Node.ELEMENT_NODE&&t(r)})};t(i)}var mt=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n},Nh=i=>i?i.split(","):[];async function Zx(){let i=document.getElementById("scene"),e=document.querySelector(".stage"),t=document.querySelector("main.story"),n=document.querySelector(".hud"),r=document.querySelector(".rail"),s=document.querySelector(".masthead"),a=document.querySelector(".explore"),o=Hh(),c=matchMedia("(max-width: 760px)").matches,l=JSON.parse(a.dataset.facets),h=JSON.parse(a.dataset.ahead),p=JSON.parse(a.dataset.periods??"[]"),d=[...t.querySelectorAll("[data-station]")].map((M,V)=>({element:M,kind:M.dataset.station,id:M.id,label:M.dataset.hud,t:V,panel:M.matches("[data-panel]")?M:M.querySelector("[data-panel]")})),u=d.length-1,m=M=>d.findIndex(V=>V.kind===M),[f,v,g,_]=["book","clone","contact","hero"].map(m),y=d.filter(M=>M.kind==="milestone"),b=y.map(({element:M})=>({id:M.dataset.milestone,date:M.dataset.date,weight:+M.dataset.weight,period:M.dataset.period,links:Nh(M.dataset.links),...Object.fromEntries(gi.map(V=>[V,Nh(M.dataset[V])]))})),T=qh(b,l,{periods:p,today:o}),S=cl(b,T.map(M=>M.year),{periods:p,today:o}),P=new Map(y.map((M,V)=>[M.t,V])),O=new Map([...t.querySelectorAll("li[data-ask]")].map(M=>[M.dataset.ask,new Set(Nh(M.dataset.memories).map(V=>y.findIndex(Q=>Q.element.dataset.milestone===V)).filter(V=>V>=0))])),z=null,N=Object.fromEntries(gi.map(M=>[M,{}]));t.querySelectorAll("ul.facets").forEach(M=>M.querySelectorAll("li").forEach(V=>N[M.dataset.facet][V.dataset.item]=V.textContent));let j=y.map(M=>({time:M.element.querySelector("time").textContent,title:M.element.querySelector("h3").textContent,body:M.element.querySelector("p:not(.kicker):not(.intro)").textContent})),U=y.map((M,V)=>({index:V,id:M.id,title:j[V].title,body:j[V].body,extra:`${j[V].time} ${gi.flatMap(Q=>(T[V].members[Q]??[]).map(Ee=>N[Q][l[Q][Ee]]??"")).join(" ")}`,weight:T[V].weight,order:V})),Z=eu({marks:T,today:o,random:Yo(1980),facets:l,sky:S,cap:c?55e3:Li.cap,trail:c?12e3:Li.trail}),ee=Yh(S),se=new Set(Sh(T)),W=cf({canvas:i,cloud:Z,marks:T,future:ee,today:o,mobile:c,sky:S});W.home(),W.start();let G=new URLSearchParams(location.search).get("quality"),$=G==="low"?Ai.tiers.length-1:0,he=G!=="full"&&G!=="low",ae={frames:[],windows:0,from:0};W.setQuality($),i.dataset.quality=String($);let ie=Qp(),be=mt("div","labels");e.append(be),pn.push(()=>be.remove());let me=T.map((M,V)=>{let Q=mt("div","tag");return Q.innerHTML='<b></b><span></span><i class="leader"></i>',Q.querySelector("b").textContent=j[V].time,Q.querySelector("span").textContent=j[V].title,Q.setAttribute("aria-hidden","true"),be.append(Q),{node:Q,leader:Q.querySelector(".leader"),width:0,height:0,on:!1}}),oe=Array.from({length:Zo},()=>{let M=mt("button","edge-mark");return M.type="button",M.hidden=!0,M.tabIndex=-1,M.setAttribute("aria-hidden","true"),M.innerHTML="<span></span><i></i>",be.append(M),M.addEventListener("click",()=>At(lt(+M.dataset.memory))),{node:M,label:M.querySelector("span"),arrow:M.querySelector("i"),width:0,height:0}}),re="",_e=Array.from({length:pf+1},()=>({x:0,y:0,visible:!0})),Se=[],Te=(M,V,Q,Ee,Fe=1980,tt=0,Ke=-1)=>{let He=mt("div",Q,M);return He.setAttribute("aria-hidden","true"),be.append(He),Se.push({node:He,world:V,base:Ee,year:Fe,kind:Q,ring:tt,spotAt:Ke,width:0,height:0,shown:-1}),He},A=M=>new C(...M);Te(e.dataset.today,A(ee.today),"ahead now",1,o,uf.today),Se.at(-1).kind="ahead";let w=[];S.list.forEach((M,V)=>{let Q=t.querySelector(`#period-${p[V]} [data-station]`);if(!Q)return;let[Ee,Fe,tt]=M.centre,[Ke,He]=[Ee+S.pole[0],Fe+S.pole[1]],xt=Math.hypot(Ke,He)||1,Ct=M.radius+9,[zt,ti]=(Q.querySelector(".kicker")?.textContent??p[V]).split(" \xB7 "),ni=Te("",A([Ee+Ke/xt*Ct,Fe+He/xt*Ct,tt]),"galaxy",.9,(M.start+M.end)/2);ni.append(mt("span","",zt),...ti?[mt("span","galaxy-years",` \xB7 ${ti}`)]:[],mt("b","galaxy-count")),w[V]=Se.at(-1),ni.dataset.go=`period-${p[V]}`,ni.addEventListener("click",()=>Ci(ni.dataset.go))});let I=Array.from({length:df},()=>(Te("",new C,"ring-year",.8,1980),Se.at(-1).dim=0,Se.at(-1))),D=e.dataset.until?qs(e.dataset.until):-1;D>=0&&Te(Ys(D,document.documentElement.lang),A(ee.today.map((M,V)=>(M+ee.book[V])/2)),"countdown-mark",.8,o),[["book",a.dataset.book],["clone",a.dataset.clone]].forEach(([M,V],Q)=>Te(V,A(ee[M]),"ahead",.6,1/0,uf[M],T.length+Q));let x=mt("aside","card");x.setAttribute("tabindex","-1");let F=mt("div","card-body"),L=mt("nav","card-steps"),R=mt("button","step",""),X=mt("button","step","");R.type=X.type="button",R.dataset.step="previous",X.dataset.step="next",L.append(R,X);let Y=new Map,te=mt("p","visually-hidden");te.setAttribute("role","status"),t.querySelectorAll(".waitlist").forEach(M=>{let V=mt("div","card-form");V.hidden=!0,V.dataset.for=M.dataset.list;let[Q,Ee]=[M.parentNode,M.nextSibling];V.append(M),Y.set(M.dataset.list,V),pn.push(()=>Q.insertBefore(M,Ee))});let pe=mt("button","card-close","\u2715");pe.type="button",pe.dataset.go="top",pe.setAttribute("aria-label",a.dataset.overview),pe.setAttribute("title",a.dataset.overview),x.append(pe,F,...Y.values(),L,te),x.id="card",e.after(x),pn.push(()=>x.remove());let Pe=[...t.querySelectorAll("a, button, input, select, textarea")];Pe.forEach(M=>M.setAttribute("tabindex","-1")),pn.push(()=>Pe.forEach(M=>M.removeAttribute("tabindex")));let Ne=document.querySelector(".skip");Ne&&(Ne.setAttribute("href","#card"),pn.push(()=>Ne.setAttribute("href","#main")));let ye=Pp([...S.list.flatMap(M=>[[M.centre[0]-M.radius,M.centre[1]-M.radius],[M.centre[0]+M.radius,M.centre[1]+M.radius]]),ee.today,ee.book,ee.clone].map(M=>[M[0],M[1]]),mr),Le=mt("div","minimap");Le.hidden=!0,Le.setAttribute("aria-hidden","true");let de=document.createElementNS(ff,"svg");de.setAttribute("viewBox",`0 0 ${mr.width} ${mr.height}`);let ve=(M,V)=>{let Q=document.createElementNS(ff,M);return Object.entries(V).forEach(([Ee,Fe])=>Q.setAttribute(Ee,Fe)),de.append(Q),Q};S.list.forEach(M=>{let[V,Q]=ye.to(M.centre);ve("circle",{cx:V.toFixed(1),cy:Q.toFixed(1),r:(M.radius*ye.scale).toFixed(1),class:"mini-galaxy"})});let ge=T.map(M=>{let[V,Q]=ye.to(M.position);return ve("circle",{cx:V.toFixed(1),cy:Q.toFixed(1),r:(.6+M.weight*.35).toFixed(2),class:"mini-dot"})}),we=0;[ee.book,ee.clone].forEach(M=>{let[V,Q]=ye.to(M);ve("circle",{cx:V.toFixed(1),cy:Q.toFixed(1),r:2,class:"mini-future"})});let ft=ve("polygon",{class:"mini-frame"}),Ge=ve("circle",{r:3.4,class:"mini-here"});Le.append(de),x.after(Le),pn.push(()=>Le.remove()),Le.addEventListener("click",M=>{let V=Le.getBoundingClientRect(),Q=ye.from([(M.clientX-V.left)*mr.width/V.width,(M.clientY-V.top)*mr.height/V.height]),Ee=Lp(S.list,Q);Ee>=0&&Ci(`period-${p[Ee]}`)});let Xe={related:a.dataset.related,earlier:a.dataset.earlier,later:a.dataset.later,filter:a.dataset.filter,unfilter:a.dataset.unfilter,more:a.dataset.more,lit:a.dataset.lit},Oe=0,J=null,gt=-1,Be={links:[],near:[]},yt=M=>P.get(M)??-1,lt=M=>y[M].t,Ut=M=>{let V=d[M];if(V.kind==="hero")return{previous:null,next:y[0].t};if(V.kind==="milestone"){let{previous:Q,next:Ee}=gp(T,yt(M),J);return{previous:Q!==null?lt(Q):!J&&yt(M)===0?0:null,next:Ee!==null?lt(Ee):J?null:f}}return V.kind==="book"?{previous:y.at(-1).t,next:v}:V.kind==="clone"?{previous:f,next:null}:{previous:null,next:null}},Et=()=>{let M=yt(Oe);Be=M>=0?mp(T,M):{links:[],near:[]};let V=z?O.get(z):null;W.setLevels(V?xp(T,V):vp(T,{selected:M,near:new Set([...Be.links,...Be.near]),filter:J})),W.setLinks(Be.links,Be.near),W.setSelection(M);let Q=M>=0&&T[M].period>=0?Wh(S.list[T[M].period],df):[],Ee=M>=0?S.list[T[M].period]:null;W.setYearRings(Ee?.centre??null,Q),I.forEach((tt,Ke)=>{let He=Q[Ke];tt.dim=He?1:0,He&&(tt.node.textContent=String(He.year),tt.world.set(Ee.centre[0]+He.radius*Math.sin(mf),Ee.centre[1]+He.radius*Math.cos(mf),Ee.centre[2]),tt.width=0)}),W.setFocus(M>=0?T[M].year:null),W.setFilter(J);let Fe=Go(T,J);if(W.setJumps(V?yp(V,W.slotOf("clone")):Sp(T,Fe)),S){let tt=Mp(T,Fe,S.list.length);w.forEach((Ke,He)=>{Ke&&(Ke.dim=J&&!tt[He]?.3:1,Ke.node.querySelector(".galaxy-count").textContent=J?` \xB7 ${tt[He]}`:"",Ke.width=0)})}},St=M=>{let V=d[M];if(V.kind==="milestone"){let Q=T[yt(M)],Ee=S.list[Q.period];W.fly({target:Ee.centre.map((Fe,tt)=>Fe+(Q.position[tt]-Fe)*.35),distance:bn(Ee.radius*4.2+16,40,130),pitch:bn(W.goal.pitch,-.45,.5)})}else V.kind==="book"||V.kind==="clone"?W.fly({target:ee[V.kind],distance:54,pitch:bn(W.goal.pitch,-.45,.5)}):V.kind==="contact"?W.fly({target:[0,0,-7],distance:W.homeDistance(),yaw:0,pitch:Ih}):W.home();W.setIdle(V.kind==="hero")},wt=M=>M.querySelectorAll("li[data-ask]").forEach(V=>{let Q=mt("button","ask-q",V.querySelector(".ask-q").textContent);Q.type="button",Q.dataset.ask=V.dataset.ask,Q.setAttribute("aria-pressed",String(z===V.dataset.ask)),V.replaceChildren(Q)}),Tn=M=>{if(z=M&&O.has(M)&&d[Oe].kind==="clone"?M:null,e.dataset.asked=z??"",x.querySelectorAll(".ask-q").forEach(Q=>Q.setAttribute("aria-pressed",String(Q.dataset.ask===z))),Et(),!z)return St(Oe);W.fly({target:[0,0,-7],distance:W.homeDistance(),yaw:0,pitch:Ih});let V=[...O.get(z)].map(Q=>y[Q].element.querySelector("h3").textContent);te.textContent=Xe.lit.replace("{n}",()=>String(V.length)).replace("{names}",()=>V.join(", "))},on=M=>M.querySelectorAll("ul.facets").forEach(V=>{let Q=V.dataset.facet;V.querySelectorAll("li").forEach(Ee=>{let Fe=mt("button","chip",Ee.textContent);Fe.type="button",Fe.dataset.facet=Q,Fe.dataset.item=Ee.dataset.item,Fe.setAttribute("aria-pressed",String(J?.facet===Q&&l[Q][J.item]===Ee.dataset.item)),Fe.setAttribute("title",Xe.filter.replace("{thread}",Ee.textContent)),Ee.replaceChildren(Fe)})}),Un=(M,V)=>{let Q=[...Be.links,...Be.near].slice(0,hf);if(!Q.length)return;let Ee=mt("div","related");Ee.append(mt("p","kicker",Xe.related));let Fe=mt("ul");Q.forEach(tt=>{let Ke=mt("li"),He=mt("button","peer");He.type="button",He.dataset.memory=String(tt),He.append(mt("time","",j[tt].time),mt("span","",j[tt].title)),Ke.append(He),Fe.append(Ke)}),Fe.addEventListener("scroll",()=>En()),Ee.append(Fe),M.append(Ee)},En=()=>{let M=x.querySelector(".related"),V=M?.querySelector("ul");if(!V)return;let Q=V.getBoundingClientRect().bottom+2,Ee=[...V.children].filter(Fe=>Fe.getBoundingClientRect().bottom>Q).length;M.dataset.more=V.scrollHeight>V.clientHeight+2&&Ee?Xe.more.replace("{n}",String(Ee)):""},H=-1,fn=M=>{H!==M&&(H=M,W.setPreview(M))},Jt=()=>{if(delete x.dataset.fit,!!qx.has(x.dataset.kind)){x.classList.add("measure");for(let M of Yx){if(x.scrollHeight<=x.clientHeight)break;x.dataset.fit=M}x.classList.remove("measure")}},ut=()=>{let M=d[Oe],V=M.panel.cloneNode(!0);V.removeAttribute("data-station"),V.removeAttribute("data-panel"),V.removeAttribute("id"),V.querySelectorAll("[id]").forEach(Ke=>Ke.removeAttribute("id")),V.querySelectorAll("[tabindex]").forEach(Ke=>Ke.removeAttribute("tabindex")),V.querySelectorAll("h1, h2, h3").forEach($x),on(V),wt(V);let Q=yt(Oe);Q>=0&&Un(V,Q),fn(-1),F.replaceChildren(V),x.dataset.kind=M.kind,Y.forEach((Ke,He)=>Ke.hidden=M.kind!==He);let{previous:Ee,next:Fe}=Ut(Oe),tt=(Ke,He,xt)=>{Ke.hidden=He===null,Ke.dataset.to=He??"",Ke.textContent=xt};tt(R,Ee,`\u2190 ${Xe.earlier}`),tt(X,Fe,`${Xe.later} \u2192`),L.hidden=M.kind==="hero"||Ee===null&&Fe===null,pe.hidden=M.kind==="hero",Jt(),En(),x.classList.remove("live"),x.offsetWidth,x.classList.add("live"),x.scrollTop=0,re="",M.kind!=="hero"&&Y.get(M.kind)?.scrollIntoView({block:"nearest"}),Ri||(te.textContent=M.label),Yt()},Ht=()=>{let M=d[Oe];return M.kind==="hero"?un.start:M.kind==="milestone"?T[yt(Oe)].year:{book:un.book,clone:un.clone}[M.kind]??un.end},Yt=()=>{let M=x.getBoundingClientRect(),V=Math.max(Ph,a.getBoundingClientRect().bottom+6);Lh.matches?W.setInset(0,(V+Math.max(V+120,M.top))/2-innerHeight/2):W.setInset((M.right+innerWidth)/2-innerWidth/2,(V+innerHeight-Gx)/2-innerHeight/2)},Wt=r?.querySelector("[data-play]"),dt={running:!1,year:null,from:0},pi=()=>{if(!Wt)return;Wt.setAttribute("aria-pressed",String(dt.running));let M=dt.running?Wt.dataset.pauseLabel:Wt.dataset.playLabel;Wt.setAttribute("aria-label",M),Wt.setAttribute("title",M),Wt.querySelector(".rail-name").textContent=dt.running?Wt.dataset.pauseName:Wt.dataset.playName,r.dataset.playing=dt.year===null?"":dt.running?"1":"paused"},fi=()=>{dt.year!==null&&(dt.running=!1,dt.year=null,W.setReveal(null),pi())},Ri=!1,At=(M,{push:V=!0,hush:Q=!1}={})=>{Ri=Q,fi(),Oe=bn(M,0,u),z=null,e.dataset.asked="";let Ee=d[Oe];if(document.documentElement.dataset.at=Oe,n.textContent=Ee.label,Et(),St(Oe),ut(),r&&r.querySelector(".rail-cursor")?.style.setProperty("--x",`${es(Ht()).toFixed(2)}%`),Ee.kind==="milestone"?ie.memory(T[yt(Oe)]):(Ee.kind==="book"||Ee.kind==="clone")&&ie.swell(Ee.kind),V)try{history.replaceState(null,"",Ee.kind==="hero"?`${location.pathname}${location.search}`:`#${Ee.id}`)}catch{return}},Xt=M=>{J=M,a.querySelectorAll(".legend button").forEach(V=>{let Q=V.closest(".legend").dataset.facet;V.setAttribute("aria-pressed",String(!!J&&J.facet===Q&&l[Q][J.item]===V.dataset.item))}),x.querySelectorAll(".chip").forEach(V=>V.setAttribute("aria-pressed",String(!!J&&J.facet===V.dataset.facet&&l[V.dataset.facet][J.item]===V.dataset.item))),e.dataset.filter=J?`${J.facet}:${l[J.facet][J.item]}`:"",Kt.hidden=!J,De.dataset.active=J?"1":"",De.setAttribute("aria-label",J?`${it} \xB7 ${N[J.facet][l[J.facet][J.item]]??""}`:it),J&&(Kt.textContent=`\u2715 ${N[J.facet][l[J.facet][J.item]]??""}`,Kt.setAttribute("aria-label",`${Xe.unfilter}: ${N[J.facet][l[J.facet][J.item]]??""}`)),Et(),d[Oe].kind==="milestone"&&ut()},Kt=a.querySelector("[data-unfilter]");Kt.addEventListener("click",()=>Xt(null));let Yi=(M,V)=>{let Q=l[M].indexOf(V);Xt(J?.facet===M&&J.item===Q?null:{facet:M,item:Q})};a.querySelectorAll(".legend button").forEach(M=>M.addEventListener("click",()=>Yi(M.closest(".legend").dataset.facet,M.dataset.item)));let mi=[...a.querySelectorAll(".legend")];mi.forEach(M=>M.hidden=!1),pn.push(()=>mi.forEach(M=>M.hidden=!0));let On=a.querySelector("[data-legend-toggle]");On?.addEventListener("click",()=>{let M=a.dataset.legend!=="open";M&&Ce(!1),a.dataset.legend=M?"open":"",On.setAttribute("aria-expanded",String(M)),Yt()}),e.dataset.filter="";let k=a.querySelector(".finder"),ue=k.querySelector("input"),Ie=k.querySelector(".results"),Ze=k.querySelector(".none"),bt=a.querySelector("[data-find]"),E=k.querySelector(".preview"),B=M=>{E.dataset.on=M>=0?"1":"",!(M<0)&&(E.querySelector("time").textContent=j[M].time,E.querySelector("strong").textContent=j[M].title,E.querySelector("p").textContent=j[M].body.match(/^.*?[.!?](?=\s|$)/)?.[0]??j[M].body)},q=M=>{let V=M.target.closest?.(".peer[data-memory]"),Q=V&&k.contains(V)?+V.dataset.memory:-1;B(Q),fn(Q)},ne=M=>{let V=mt("li"),Q=mt("button","peer");return Q.type="button",Q.dataset.memory=String(M),Q.append(mt("time","",j[M].time),mt("span","",j[M].title)),V.append(Q),V},K=()=>Ie.replaceChildren(...[...t.querySelectorAll("section.period")].flatMap(M=>{let V=[...M.querySelectorAll("[data-station='milestone']")].map(Ee=>yt(d.findIndex(Fe=>Fe.element===Ee))),Q=mt("li","group",M.querySelector(".kicker")?.textContent??"");return Q.setAttribute("aria-hidden","true"),[Q,...V.map(ne)]})),fe=M=>{k.hidden=!M,bt.setAttribute("aria-expanded",String(M)),M?(ue.value.trim()||K(),Me.hidden||Ce(!1),ue.focus()):(B(-1),fn(-1),k.contains(document.activeElement)&&document.activeElement.blur(),ue.value="",Ie.replaceChildren(),Ze.textContent="")};bt.addEventListener("click",()=>fe(k.hidden)),k.addEventListener("focusin",q),Ie.addEventListener("pointerover",q),Ie.addEventListener("pointerleave",()=>{(!k.contains(document.activeElement)||document.activeElement===ue)&&(B(-1),fn(-1))}),ue.addEventListener("input",()=>{let M=yh(U,ue.value),V=_p(T,l,N,ue.value);Ie.replaceChildren(...V.map(Q=>{let Ee=mt("li"),Fe=mt("button","peer show");return Fe.type="button",Fe.dataset.facet=Q.facet,Fe.dataset.item=l[Q.facet][Q.item],Fe.append(mt("time","",String(Q.count)),mt("span","",Xe.filter.replace("{thread}",Q.title))),Ee.append(Fe),Ee}),...M.map(Q=>ne(Q.index))),ue.value.trim()||K(),Ze.textContent=ue.value.trim()&&!M.length&&!V.length?Ze.dataset.none:""}),k.addEventListener("submit",M=>{M.preventDefault(),Ie.querySelector("button")?.click()}),Ie.addEventListener("click",M=>{let V=M.target.closest("button");if(V){if(fe(!1),V.dataset.facet){let Q=l[V.dataset.facet].indexOf(V.dataset.item);return Xt(J?.facet===V.dataset.facet&&J.item===Q?J:{facet:V.dataset.facet,item:Q})}At(lt(+V.dataset.memory)),x.focus({preventScroll:!0})}}),k.addEventListener("keydown",M=>{if(M.key==="ArrowDown"||M.key==="ArrowUp"){let V=[...Ie.querySelectorAll("button")];if(!V.length)return;M.preventDefault();let Q=V.indexOf(document.activeElement);V[bn(Q+(M.key==="ArrowDown"?1:-1),0,V.length-1)]?.focus(),Q===0&&M.key==="ArrowUp"&&ue.focus()}}),a.querySelector("[data-surprise]").addEventListener("click",()=>{let M=yt(Oe),V=M;for(;V===M&&T.length>1;)V=Math.floor(Math.random()*T.length);At(lt(V))});let Me=a.querySelector(".guide"),Re=a.querySelector("[data-guide-toggle]"),Ce=M=>{Me.hidden=!M,Re.setAttribute("aria-expanded",String(M)),M&&(fe(!1),a.dataset.legend="",On?.setAttribute("aria-expanded","false"))};Re.addEventListener("click",()=>Ce(Me.hidden)),bt.addEventListener("click",()=>!k.hidden&&Ce(!1));let De=a.querySelector("[data-more-toggle]"),it=De.getAttribute("aria-label"),Qe=M=>{a.dataset.sheet=M?"open":"",De.setAttribute("aria-expanded",String(M))};De.addEventListener("click",()=>Qe(a.dataset.sheet!=="open"));let Ue=a.querySelector(".sheet");Ue.addEventListener("click",M=>{let V=M.target.closest("button, a");if(!V||V.matches(".lang"))return V&&Qe(!1);Qe(!1),((V.matches("[data-legend-toggle]")?a.querySelector(".legend button"):De)??De).focus()}),Ue.addEventListener("focusout",M=>a.dataset.sheet==="open"&&!Ue.contains(M.relatedTarget)&&M.relatedTarget!==De&&Qe(!1));let at=M=>a.dataset.sheet==="open"&&!M.target.closest(".sheet, [data-more-toggle]")&&Qe(!1);document.addEventListener("pointerdown",at),i.addEventListener("pointerdown",()=>Ce(!1)),pn.push(()=>document.removeEventListener("pointerdown",at));let Rt=a.querySelector("[data-sound]");if(ie.supported){Rt.hidden=!1,Rt.setAttribute("aria-pressed","true"),Rt.addEventListener("click",()=>Rt.setAttribute("aria-pressed",String(ie.toggle())));let M=Fe=>{if(ie.running())return Q();Fe.target.closest?.("[data-sound]")||ie.start()},V=["pointerup","touchend","click","keydown"],Q=()=>V.forEach(Fe=>document.removeEventListener(Fe,M,!0));V.forEach(Fe=>document.addEventListener(Fe,M,!0));let Ee=()=>ie.pause(document.hidden);document.addEventListener("visibilitychange",Ee),pn.push(()=>{Q(),document.removeEventListener("visibilitychange",Ee),ie.close(),Rt.setAttribute("aria-pressed","false"),Rt.hidden=!0})}let Tt=mt("p","visually-hidden");Tt.setAttribute("role","status"),e.append(Tt);let _t={x:0,y:0},et=null,Mt=()=>document.documentElement.dataset.focus==="1",Ft=M=>{document.documentElement.dataset.focus=M?"1":"",Tt.textContent=M?a.dataset.focusNote:"",et=M?{..._t}:null,M&&(Ce(!1),Qe(!1),fe(!1))},ze=()=>Mt()&&Ft(!1),ce=performance.now()/1e3,ct=()=>ce=performance.now()/1e3,tn=M=>{_t.x=M.clientX,_t.y=M.clientY,et&&Math.hypot(_t.x-et.x,_t.y-et.y)>12&&ze(),Math.abs(M.movementX)+Math.abs(M.movementY)>6&&ct()},wn=()=>{ze(),ct()},Kn=[["pointermove",tn],["pointerdown",wn],["wheel",wn],["touchstart",wn]];Kn.forEach(([M,V])=>addEventListener(M,V,{passive:!0})),pn.push(()=>{Kn.forEach(([M,V])=>removeEventListener(M,V)),delete document.documentElement.dataset.focus});let Fn=Op(T),Qn={phase:"waiting",step:0,at:0};x.addEventListener("pointerover",M=>{let V=M.target.closest(".related .peer");fn(V?+V.dataset.memory:-1)}),x.addEventListener("pointerleave",()=>fn(-1)),x.addEventListener("focusin",M=>{let V=M.target.closest(".related .peer");V&&fn(+V.dataset.memory)}),x.addEventListener("focusout",()=>fn(-1)),x.addEventListener("click",M=>{let V=M.target.closest(".chip");if(V)return Yi(V.dataset.facet,V.dataset.item);let Q=M.target.closest(".ask-q");if(Q)return Tn(z===Q.dataset.ask?null:Q.dataset.ask);let Ee=M.target.closest(".peer");if(Ee)return At(lt(+Ee.dataset.memory)),x.focus({preventScroll:!0});let Fe=M.target.closest(".step");if(Fe&&Fe.dataset.to!=="")return At(+Fe.dataset.to),x.focus({preventScroll:!0});let tt=M.target.closest("[data-go]");tt&&Qt.has(tt.dataset.go)&&(M.preventDefault(),Ci(tt.dataset.go))});let Qt=new Map(d.map(M=>[M.id,M.t]));document.querySelectorAll("section.period").forEach(M=>{let V=M.querySelector("[data-station]");Qt.set(M.id,d.findIndex(Q=>Q.element===V))});let Ci=M=>{if(!Qt.has(M))return;let V=Qt.get(M);At(V),d[V].kind!=="hero"&&Y.get(d[V].kind)?.querySelector("input, a, button")?.focus()},ei=()=>{let M;try{M=decodeURIComponent(location.hash.slice(1))}catch{return}if(!M)return At(0,{push:!1});Qt.has(M)&&At(Qt.get(M),{push:!1})};document.querySelectorAll("[data-go]").forEach(M=>M.addEventListener("click",V=>{x.contains(M)||!Qt.has(M.dataset.go)||(V.preventDefault(),Ci(M.dataset.go))})),addEventListener("hashchange",ei),pn.push(()=>removeEventListener("hashchange",ei)),t.addEventListener("focusin",M=>{let V=d.find(Q=>Q.element.contains(M.target));V&&V.t!==Oe&&At(V.t)});let Ws={hero:_,book:f,clone:v};Y.forEach((M,V)=>M.addEventListener("focusin",()=>Oe!==Ws[V]&&At(Ws[V])));let Zr={ArrowDown:1,ArrowRight:1,PageDown:1," ":1,ArrowUp:-1,ArrowLeft:-1,PageUp:-1},Jr=M=>{if(!(M.metaKey||M.ctrlKey||M.altKey)&&(ct(),!(Mt()&&M.key.toLowerCase()!=="h"&&(Ft(!1),M.key==="Escape")))){if(M.key==="Escape"){if(!Me.hidden)Ce(!1),Re.focus();else if(a.dataset.sheet==="open")Qe(!1),De.focus();else if(!k.hidden)fe(!1),bt.focus();else{if(M.target.closest("input, textarea, select"))return;z?Tn(null):J?Xt(null):Oe!==0&&At(0)}return}if(!M.target.closest("input, textarea, select, .finder")){if(M.key==="/")return M.preventDefault(),fe(!0);if(M.key==="?")return M.preventDefault(),Ce(Me.hidden);if(M.key.toLowerCase()==="h")return M.preventDefault(),M.repeat?void 0:Ft(!Mt());if(!(M.key===" "&&M.target.closest("button, a, summary, [role='button']"))){if(M.key==="Home")M.preventDefault(),At(0);else if(M.key==="End")M.preventDefault(),At(g);else if(M.key in Zr){M.preventDefault();let V=M.key===" "&&M.shiftKey?-1:Zr[M.key],{previous:Q,next:Ee}=Ut(Oe),Fe=V>0?Ee:Q;Fe!==null&&At(Fe)}}}}};addEventListener("keydown",Jr),pn.push(()=>removeEventListener("keydown",Jr)),W.on("hover",M=>{M>=0&&M!==gt&&ie.tick(),gt=M,i.style.cursor=M>=0?"pointer":""});let Ko=M=>M===T.length?f:M===T.length+1?v:-1;W.on("click",M=>{M>=0&&At(M<T.length?lt(M):Ko(M))});let Ye=d.filter(M=>["milestone","book","clone"].includes(M.kind)),An=d.map(M=>M.kind==="milestone"?T[yt(M.t)].year:{hero:un.start,book:un.book,clone:un.clone}[M.kind]??un.end);if(r){let M=r.querySelector(".rail-track"),V=r.querySelector(".rail-tip");r.querySelector(".rail-today")?.style.setProperty("--x",`${es(o).toFixed(2)}%`);let Q=xt=>{let Ct=M.getBoundingClientRect();return un.start+bn((xt.clientX-Ct.left)/Ct.width,0,1)*(un.end-un.start)},Ee=xt=>Ye.reduce((Ct,zt)=>Math.abs(An[zt.t]-xt)<Math.abs(An[Ct.t]-xt)?zt:Ct,Ye[0]),Fe=xt=>`${xt.element.querySelector("time")?.textContent??""} \xB7 ${xt.element.querySelector("h3, h2")?.textContent??""}`.replace(/^ · /,""),tt=!1,Ke=-1,He=xt=>{let Ct=Ee(Q(xt));return V.textContent=Fe(Ct),V.style.setProperty("--x",`${es(An[Ct.t]).toFixed(2)}%`),V.dataset.on="1",Ct};M.addEventListener("pointerdown",xt=>{tt=!0,M.setPointerCapture(xt.pointerId);let Ct=He(xt);Ke=Ct.t,At(Ct.t)}),M.addEventListener("pointermove",xt=>{let Ct=He(xt);tt&&Ct.t!==Ke&&(Ke=Ct.t,At(Ct.t))}),M.addEventListener("pointerup",()=>tt=!1),M.addEventListener("pointerleave",()=>V.dataset.on="")}Wt?.addEventListener("click",()=>{if(dt.running)return dt.running=!1,pi();dt.year===null&&(Oe!==0&&At(0),dt.year=1980),dt.running=!0,dt.from=performance.now()/1e3-iu(dt.year,o),pi()});let Rn=()=>{let M=[x,a,n,r].filter(Boolean).map(Q=>Q.getBoundingClientRect()),V=k.hidden?null:k.getBoundingClientRect();return V&&M.push(V),M},ln=(M,V)=>M.left<V.right&&M.right>V.left&&M.top<V.bottom&&M.bottom>V.top;W.on("frame",({formed:M,projected:V,camera:Q,cssScale:Ee,time:Fe,dt:tt,intro:Ke})=>{if(he&&ae.windows<Ai.windows&&Ke>=1&&(ae.from||(ae.from=Fe+1),Fe>=ae.from&&(ae.frames.push(tt*1e3),ae.frames.length>=Ai.window))){let le=Up($,Dp(ae.frames));ae.frames=[],ae.windows++,le!==$&&($=le,W.setQuality($),i.dataset.quality=String($))}let He=performance.now()/1e3,xt=!document.hidden&&k.hidden&&Me.hidden&&a.dataset.sheet!=="open"&&!J&&dt.year===null&&!Mt()&&!document.activeElement?.closest?.("input, textarea, select, button, a, .finder, .card, .masthead, .rail")&&!x.matches(":hover"),Ct=Fp(Qn,{now:He,idleSince:ce,eligible:xt&&(Qn.phase==="touring"||Oe===0),plan:Fn},{wait:+a.dataset.idle||20,hold:+a.dataset.tourHold||6});Qn=Ct.state,Ct.open!==null?At(lt(Ct.open),{push:!1,hush:!0}):Ct.done&&At(0,{push:!1,hush:!0}),dt.running&&(dt.year=nu(performance.now()/1e3-dt.from,o),W.setReveal(dt.year),r.querySelector(".rail-cursor")?.style.setProperty("--x",`${es(dt.year).toFixed(2)}%`),n.textContent=String(Math.floor(dt.year)),dt.year>=o&&(fi(),n.textContent=d[Oe].label));let zt=yt(Oe),ti=W.view.distance/W.homeDistance(),ni=new Set([...Be.links,...Be.near].slice(0,hf)),Ii=Rn().map(le=>({left:le.left-12,right:le.right+12,top:le.top-12,bottom:le.bottom+12}));Ii.push({left:0,right:innerWidth,top:0,bottom:Math.max(Ph,(s?.getBoundingClientRect().bottom??0)+4)},{left:0,right:innerWidth,top:innerHeight-60,bottom:innerHeight});let Qo=[],_f=Lh.matches,Xs=Np(d[Oe].kind,innerWidth,520,!_f||x.getBoundingClientRect().top>=mr.top+mr.height+8);Le.hidden===Xs&&(Le.hidden=!Xs);let kn=Xs?Le.getBoundingClientRect():null;if(Xs&&zt>=0){let le=T[zt].position[2];we++%8===0&&ge.forEach((je,kt)=>{let $e=W.centerOf(kt),[cn,Cn]=ye.to([$e.x,$e.y]);je.setAttribute("cx",cn.toFixed(1)),je.setAttribute("cy",Cn.toFixed(1))}),ft.setAttribute("points",[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([je,kt])=>ye.to(W.groundAt(je,kt,le)).map($e=>$e.toFixed(1)).join(",")).join(" "));let nt=W.centerOf(zt),[$t,It]=ye.to([nt.x,nt.y]);Ge.setAttribute("cx",$t.toFixed(1)),Ge.setAttribute("cy",It.toFixed(1))}kn&&(Ii.push({left:kn.left-8,right:kn.right+8,top:kn.top-8,bottom:kn.bottom+8}),Qo.push(kn));let Dh=new Map,el=[],tl=[];if(zt>=0&&dt.year===null){let le=x.getBoundingClientRect(),nt=Lh.matches,$t={left:nt?12:le.right+12,right:innerWidth-12,top:Math.max(Ph,a.getBoundingClientRect().bottom+6),bottom:Math.min((r?.getBoundingClientRect().top??innerHeight-100)-8,nt?le.top-8:1/0)};[...Be.links,...Be.near].slice(0,Xx).forEach(je=>{let kt=_e.map((cn,Cn)=>W.arcScreen(zt,je,Cn/pf,cn)),$e=Ap(kt,$t);$e&&el.push({j:je,...$e})});let It=el.slice(0,Zo).map((je,kt)=>{let $e=oe[kt],cn=kt===Zo-1?el.length-Zo:0,Cn=`${j[je.j].title} \xB7 ${j[je.j].time}${cn>0?` +${cn}`:""}`;$e.label.textContent!==Cn&&($e.label.textContent=Cn,$e.width=$e.height=0),$e.node.hidden=!1,$e.width||($e.width=$e.node.offsetWidth),$e.height||($e.height=$e.node.offsetHeight);let hn=Rp(je,$t);return{mark:$e,exit:je,side:hn,box:Cp(je,hn,$e,$t),shown:!1}});Ip(It,$t,4,kn?[{left:kn.left,right:kn.right,top:kn.top,bottom:kn.bottom}]:[]),oe.forEach((je,kt)=>{let $e=It[kt];je.node.hidden=!$e?.shown,$e?.shown&&(je.node.style.transform=`translate3d(${$e.box.left.toFixed(1)}px, ${$e.box.top.toFixed(1)}px, 0)`,je.node.dataset.memory=String($e.exit.j),je.node.dataset.side=$e.side,Dh.set($e.exit.j,$e.exit.t),tl.push($e.exit.j),Qo.push($e.box),je.arrow.style.cssText=`left: ${($e.exit.x-$e.box.left).toFixed(1)}px; top: ${($e.exit.y-$e.box.top).toFixed(1)}px; --a: ${$e.exit.angle.toFixed(3)}rad`,Ii.push({left:$e.box.left-4,right:$e.box.right+4,top:$e.box.top-4,bottom:$e.box.bottom+4}))})}else oe.forEach(le=>le.node.hidden=!0);W.setLinkReach(Dh),e.dataset.edges=String(oe.filter(le=>!le.node.hidden).length||"");let Uh=tl.join(",");if(Uh!==re){re=Uh;let le=new Set(tl.map(String));x.querySelectorAll(".peer[data-memory]").forEach(nt=>nt.dataset.out=le.has(nt.dataset.memory)?"1":"")}let mn={x:0,y:0,visible:!1};Se.forEach(le=>{let nt=le.base*(le.year<=M?1:0);if(dt.year!==null&&le.year>dt.year&&(nt=0),nt*=le.dim??1,W.project(le.world,mn),!mn.visible)nt=0;else if(le.width||(le.width=le.node.offsetWidth),le.height||(le.height=le.node.offsetHeight),le.kind==="ahead"){let{width:It,height:je}=le,kt=le.spotAt>=0?V[le.spotAt].r:le.ring*Ee/Q.position.distanceTo(le.world),$e=wp(kt),cn=Wx.flatMap(Cn=>jx.map(([hn,Vt])=>{let Bn=$e+Cn,Fh=mn.x+hn*Bn-(hn<0?It:hn===0?It/2:0),Bh=mn.y+Vt*Bn-(Vt<0?je:Vt===0?je/2:0);return{left:Fh,right:Fh+It,top:Bh,bottom:Bh+je}})).find(Cn=>Cn.left>=12&&Cn.right<=innerWidth-12&&!Ii.some(hn=>ln(Cn,hn)));cn?(le.node.style.transform=`translate3d(${cn.left.toFixed(1)}px, ${cn.top.toFixed(1)}px, 0)`,le.node.style.setProperty("--cx",mn.x.toFixed(1)),le.node.style.setProperty("--cy",mn.y.toFixed(1)),le.node.style.setProperty("--r",Math.min(kt,70).toFixed(1)),nt>.2&&Ii.push({left:cn.left-4,right:cn.right+4,top:cn.top-4,bottom:cn.bottom+4})):nt=0}else{mn.x=bn(mn.x,le.width/2+12,innerWidth-le.width/2-12),le.node.style.transform=`translate3d(${mn.x.toFixed(1)}px, ${mn.y.toFixed(1)}px, 0)`;let It=le.kind==="ring-year"||le.kind==="countdown-mark"?1:4,je={left:mn.x-le.width/2-It,right:mn.x+le.width/2+It,top:mn.y-le.height/2-It,bottom:mn.y+le.height/2+It};(le.kind==="ring-year"||le.kind==="countdown-mark")&&Ii.some(kt=>ln(je,kt))&&(nt=0),le.kind==="galaxy"&&Qo.some(kt=>ln({left:je.left+4,right:je.right-4,top:je.top+4,bottom:je.bottom-4},kt))&&(nt=0),nt>.2&&Ii.push(je)}let $t=Math.round(nt*100)/100;$t!==le.shown&&(le.shown=$t,le.node.style.opacity=$t,le.node.style.visibility=$t>0?"visible":"hidden")});let vf=innerWidth<=760?8:ti>.8?14:Hx,nl=[],Oh=[];V.forEach((le,nt)=>nt<T.length&&le.on&&le.r>3&&Oh.push({j:nt,left:le.x-le.r*.7,right:le.x+le.r*.7,top:le.y-le.r*.7,bottom:le.y+le.r*.7})),me.forEach((le,nt)=>{let $t=V[nt],It=T[nt],je=0;nt===zt?je=1e3:nt===gt?je=900:nt===H?je=880:ni.has(nt)?je=500+It.weight:J&&It.members[J.facet]?.includes(J.item)?je=300+It.weight:se.has(nt)&&ti>=.6&&!J?je=40:It.weight>=3&&ti<.6?je=30:It.weight===2&&ti<.5?je=20:ti<.22&&(je=10),zt>=0&&je<500&&(je=0),It.year>M&&nt!==zt&&(je=0),dt.year!==null&&(je=It.year<=dt.year&&It.year>dt.year-2.5?800+It.weight:0),je>0&&$t.on?nl.push({tag:le,spot:$t,priority:je,i:nt}):le.on&&(le.on=!1,le.node.dataset.on="")}),nl.sort((le,nt)=>nt.priority-le.priority||le.i-nt.i);let il=[];for(let{tag:le,spot:nt,priority:$t,i:It}of nl){let je=$t===40?"1":"";le.node.dataset.name!==je&&(le.node.dataset.name=je,le.width=le.height=0),le.width||(le.width=le.node.offsetWidth),le.height||(le.height=le.node.offsetHeight);let kt=bp(nt,{width:le.width,height:le.height},innerWidth);if($t>=900){let Vt=bn(nt.x-le.width/2,12,innerWidth-le.width-12);kt.splice(8,0,{left:Vt,right:Vt+le.width,top:nt.y-le.height/2,bottom:nt.y+le.height/2,far:!1})}let $e=Vt=>Vt.left>=12&&Vt.right<=innerWidth-12,hn=Tp(kt,{free:Vt=>$e(Vt)&&!Ii.some(Bn=>ln(Vt,Bn))&&!il.some(Bn=>ln(Vt,{left:Bn.left-6,right:Bn.right+6,top:Bn.top-4,bottom:Bn.bottom+4})),clear:Vt=>!Oh.some(Bn=>Bn.j!==It&&ln(Vt,Bn)),inside:$e,forced:$t>=900});if(hn&&il.length<vf){il.push(hn);let Vt=hn.far?Ep(hn,nt):null;Vt?(Object.assign(le.leader.style,{left:`${Vt.x.toFixed(1)}px`,top:`${Vt.y.toFixed(1)}px`,width:`${Vt.length.toFixed(1)}px`,transform:`rotate(${Vt.angle.toFixed(3)}rad)`}),le.node.dataset.leader="1"):le.node.dataset.leader="",le.node.style.transform=`translate3d(${hn.left.toFixed(1)}px, ${hn.top.toFixed(1)}px, 0)`,le.node.style.setProperty("--cx",nt.x.toFixed(1)),le.node.style.setProperty("--cy",nt.y.toFixed(1)),le.node.dataset.hot=It===zt||It===gt?"1":"",le.on||(le.on=!0,le.node.dataset.on="1")}else le.on&&(le.on=!1,le.node.dataset.on="")}}),new ResizeObserver(Yt).observe(x);let Kr=()=>{W.resize(),Jt(),En(),Yt(),d[Oe].kind==="hero"?W.home():St(Oe)};addEventListener("resize",Kr),addEventListener("themechange",W.applyTheme),pn.push(()=>{removeEventListener("resize",Kr),removeEventListener("themechange",W.applyTheme)}),W.on("error",M=>{console.error(M),Jo()}),document.documentElement.classList.add("immersive"),document.fonts?.ready.then(()=>{me.forEach(M=>(M.width=0,M.height=0)),Jt(),En(),Yt()}),a.dataset.ready="1",At(0,{push:!1}),ei(),Yt()}gf();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
