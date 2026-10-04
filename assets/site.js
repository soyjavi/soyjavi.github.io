(()=>{document.querySelectorAll("form.waitlist").forEach(i=>{let e=i.querySelector(".status");i.addEventListener("submit",()=>{e.textContent=i.dataset.opened})});var ec=[1.6,4.2],ku={1:1.1,2:1.6,3:2.2},Am=51,zi=["threads","people","places"],Jl=[0,1,-1,2,-2],Kl={sigma:1.6,background:.08},er={base:470,cap:12e4,trail:18e3},Gn={inner:900,outer:1600,stars:9e3,halo:.015,band:.35,tilt:.6,thickness:.16},Bt={core:4,reach:3.2,gap:12,future:44,twist:2.2,swirl:.9,inner:.22,depth:4,room:3,ahead:[.3,.7],today:.06,sweep:1.9*Math.PI,growth:1.75,rise:26},Ds=.25,Rm=i=>/^\d{4}$/.test(i)?"year":/^\d{4}-\d{2}$/.test(i)?"month":null,Xu=(i=Date.now())=>{let e=new Date(i),t=e.getFullYear(),n=Date.UTC(t,e.getMonth(),e.getDate());return t+(n-Date.UTC(t,0,1))/(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))},Na=(i,e=Date.now())=>{let[t,n]=i.split("-").map(Number),r=new Date(e);return(t-r.getFullYear())*12+(n-1-r.getMonth())},Da=(i,e)=>!Number.isFinite(i)||i<0?"":new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(i,"month"),Wr=i=>i-1980;function Cm(i){let e=new Map;i.forEach(({date:n})=>e.set(n,(e.get(n)??0)+1));let t=new Map;return i.map(({date:n})=>{let r=Rm(n);if(!r)throw new Error(`date "${n}" is neither YYYY nor YYYY-MM`);let s=+n.slice(0,4),a=t.get(n)??0;t.set(n,a+1);let o=(a+.5)/e.get(n);return r==="month"?s+(+n.slice(5,7)-1+o)/12:s+o})}function Im(i,e){let t=[];return i.map((n,r)=>{let s=new Set;for(let a=r-1;a>=0&&n-i[a]<=e;a--)s.add(t[a]);return t[r]=Jl.find(a=>!s.has(a))??Jl[r%Jl.length],t[r]})}function Pm(i){return i.map(e=>{let t=i.filter(n=>Math.abs(n-e)<=.6).length;return Math.min(1,1/Math.sqrt(Math.max(1,t/2)))})}var tc=i=>Math.min(1,Math.max(0,i)),Lm=(i,e)=>(Math.sqrt(i.inner*i.inner+2*i.spin*e)-i.inner)/i.spin;function Hr(i,e,t=0){let n=Lm(i,e),r=i.inner+i.spin*n+t;return[r*Math.sin(n)-i.pole[0],r*Math.cos(n)-i.pole[1],-7+Bt.rise*(e/i.length-.5)]}function Nm(i,e,t,n){let r=Array.from({length:t},()=>[]);i.forEach((f,v)=>e[v]>=0&&r[e[v]].push(f));let s=[];r.forEach((f,v)=>s.push(f.length?Math.min(...f):s[v-1]??1980));let a=r.map(f=>Bt.core+Bt.reach*Math.sqrt(f.length)),o=a.reduce((f,v)=>f+2*v,0)+Bt.gap*t+Bt.future,c=2*o/(Bt.sweep*(1+Bt.growth)),l={inner:c,spin:c*(Bt.growth-1)/Bt.sweep,length:o,pole:[0,0]},h=0,p=a.map(f=>{let v=h+f;return h+=2*f+Bt.gap,v}),d=[...p.map((f,v)=>[Hr(l,f),a[v]]),...Array.from({length:9},(f,v)=>[Hr(l,h+Bt.future*v/8),3])],u=[0,1].map(f=>[Math.min(...d.map(([v,g])=>v[f]-g)),Math.max(...d.map(([v,g])=>v[f]+g))]);l.pole=u.map(([f,v])=>(f+v)/2);let m=a.map((f,v)=>{let g=s.slice(v+1).find((M,T)=>r[v+1+T].length&&M>s[v]),_=Math.max(g??Math.max(n,...r[v]),s[v]+1);return{start:s[v],end:_,count:r[v].length,radius:f,turn:v*Bt.twist,along:p[v],centre:Hr(l,p[v])}});return{...l,ahead:h,list:m}}var La=(i,e)=>{let t=i.list.findIndex(n=>e<n.end);return t<0?i.list.length-1:t},Ua=(i,e)=>tc((e-i.start)/(i.end-i.start)),Gu=[1,2,5,10,20,50,100];function qu(i,e=8){let t=Math.ceil(i.start+1e-9),n=Math.floor(i.end+1e-9),r=a=>Array.from({length:Math.max(0,n-t+1)},(o,c)=>t+c).filter(o=>o%a===0),s=Gu.find(a=>r(a).length<=e)??Gu.at(-1);return r(s).map(a=>({year:a,radius:i.radius*(Bt.inner+(1-Bt.inner)*Ua(i,a))}))}var Hu=(i,e)=>(La(i,e)+Ua(i.list[La(i,e)],e))/i.list.length;function ju(i,e){if(e>=1)return 1/0;let t=Math.max(0,e)*i.list.length,n=i.list[Math.min(i.list.length-1,Math.floor(t))];return n.start+(t-Math.floor(t))*(n.end-n.start)}function Yu(i,e,t,n,r=0,s=0){let a=Math.PI*2/Math.max(1,t)*Math.max(0,e)+i.turn+Bt.swirl*n+r,o=Math.max(.4,i.radius*(Bt.inner+(1-Bt.inner)*n)+s);return[i.centre[0]+o*Math.sin(a),i.centre[1]+o*Math.cos(a),i.centre[2]+Bt.depth*(n-.5)]}var Ql=(i,e,t=0)=>Hr(i,i.ahead+e*Bt.future,t);function nc(i,e,{periods:t=[],today:n=1980+Am}={}){let r=i.map(a=>t.length?t.indexOf(a.period):0),s=i.find((a,o)=>r[o]<0);if(s)throw new Error(`memory ${s.id}: period "${s.period}" is not one of ${t.join(", ")}`);return{...Nm(e,r,Math.max(1,t.length),n),periodOf:r}}function $u(i,e={},t={}){let n=Cm(i),r=Pm(n),s=zi.filter(d=>e[d]?.length),a=i.map(d=>Object.fromEntries(s.map(u=>[u,(d[u]??[]).map(m=>e[u].indexOf(m)).filter(m=>m>=0)]))),o=e.threads?.length??0,c=nc(i,n,t),l=[],h=new Map;i.forEach((d,u)=>{let m=`${c.periodOf[u]}:${a[u].threads?.[0]??0}`;h.set(m,[...h.get(m)??[],u])});let p=Math.PI*2/Math.max(1,o);return h.forEach(d=>{let u=c.list[c.periodOf[d[0]]],m=(u.end-u.start)/(u.radius*(1-Bt.inner));Im(d.map(f=>n[f]),Bt.room*m).forEach((f,v)=>{let g=d[v],_=Ua(u,n[g]),M=u.radius*(Bt.inner+(1-Bt.inner)*_),T=Math.max(-.45*p,Math.min(.45*p,f*Bt.room/Math.max(M,2)));l[g]=Yu(u,a[g].threads?.[0]??0,o,_,T)})}),n.map((d,u)=>({id:i[u].id,year:d,position:l[u],spread:(ku[i[u].weight]??ku[1])*r[u],weight:i[u].weight,members:a[u],period:c.periodOf[u],links:i[u].links??[]}))}function Zu(i){let[e,t]=Bt.ahead.map(n=>Ql(i,n));return{today:Ql(i,Bt.today),book:e,clone:t}}var Ju=(i,e)=>e.reduce((t,n)=>t+n.weight*Math.exp(-(((i-n.year)/1.6)**2)),0),Ku=i=>Math.max(...i.map(e=>Ju(e.year,i)),1e-6);function Dm(i,e,t=Ku(e)){return Math.min(1,Ju(i,e)/t)}function Um(i,e,t,n){let r=Math.ceil((n-1980)/Ds)+1,s=new Float32Array(r*Math.max(1,t)),a=Math.ceil(Kl.sigma*3/Ds);for(let o of i)(o.members[e]??[]).forEach((c,l)=>{let h=(o.year-1980)/Ds;for(let p=Math.max(0,Math.floor(h)-a);p<=Math.min(r-1,Math.ceil(h)+a);p++){let d=(p*Ds-(o.year-1980))/Kl.sigma;s[p*t+c]+=o.weight*(l===0?1:.5)*Math.exp(-d*d)/3}});return{table:s,count:t,bins:r}}function Qu({table:i,count:e,bins:t},n,r){return Math.min(1,i[Math.min(t-1,Math.max(0,Math.round((n-1980)/Ds)))*e+r])}function Wu(i,e,t){let n=Array.from({length:i.count},(s,a)=>Kl.background+Qu(i,e,a)),r=t()*n.reduce((s,a)=>s+a,0);for(let s=0;s<i.count;s++)if((r-=n[s])<=0)return s;return i.count-1}function Oa(i,e=Gn.inner,t=Gn.outer){let n=i()*2-1,r=i()*Math.PI*2,s=e+(t-e)*i(),a=Math.sqrt(1-n*n)*s;return[a*Math.cos(r),a*Math.sin(r),n*s]}function ed(i){let e=i()*Math.PI*2,t=Qi(i)*Gn.thickness,[n,r,s]=[Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t)];return[n,r*Math.cos(Gn.tilt)-s*Math.sin(Gn.tilt),r*Math.sin(Gn.tilt)+s*Math.cos(Gn.tilt)]}function td({count:i=Gn.stars,random:e}){let t={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i),halo:new Float32Array(i)};for(let n=0;n<i;n++){let r=e()<Gn.halo,s=r?.8+.2*e():.7*e()**7,a=!r&&e()<Gn.band?ed(e):Oa(e,1,1),o=Gn.outer-(Gn.outer-Gn.inner)*s;t.position.set(a.map(c=>c*o),n*3),t.seed[n]=e(),t.bright[n]=s,t.halo[n]=r?1:0,t.size[n]=1+1.2*s}return t}var ic=["personal","professional","product","education"],mn={deep:{count:16e3,mobile:6e3,alpha:[.1,.8],band:.35,radius:1650,inner:400},far:{count:36,alpha:[.15,.4],radius:[5,14]},haze:{alpha:.08},glow:{max:.15,scale:2.6}},Om=([i,e,t])=>[Math.atan2(e,i)/(2*Math.PI)+.5,Math.acos(Math.max(-1,Math.min(1,t)))/Math.PI];function nd({count:i=mn.deep.count,random:e,centre:t=[0,0,0],inner:n=mn.deep.inner,outer:r=mn.deep.radius}){let[s,a]=mn.deep.alpha,o={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i)};for(let c=0;c<i;c++){let l=e()<mn.deep.band?ed(e):Oa(e,1,1),h=Math.hypot(...l),p=Math.log(r/(n*(r/n)**e()))/Math.log(r/n),d=r*(n/r)**p;o.position.set(l.map((u,m)=>t[m]+u/h*d),c*3),o.seed[c]=e(),o.bright[c]=Math.min(a,(s+(a-s)*e()**4)*(1+.6*p**3)),o.size[c]=1+1.4*p**4}return o}function id({count:i=mn.far.count,random:e}){let[t,n]=mn.far.alpha,[r,s]=mn.far.radius;return Array.from({length:i},()=>{let[a,o]=Om(Oa(e,1,1));return{u:a,v:o,radius:r+(s-r)*e(),squash:.35+.5*e(),angle:e()*Math.PI,alpha:t+(n-t)*e()}})}function rd(i,e){return{scale:i.radius*mn.glow.scale,strength:mn.glow.max*(.25+.75*(i.count/Math.max(1,e)))}}var Qi=i=>Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i());function Fm(i,{base:e=er.base,cap:t=er.cap}={}){let n=i.reduce((r,s)=>r+s.weight**1.5,0)||1;return Math.min(e,t/n)}function sd({marks:i,sky:e,today:t,random:n,base:r=er.base,cap:s=er.cap,trail:a=er.trail,facets:o={}}){let c=Fm(i,{base:r,cap:s}),l=T=>Math.max(8,Math.round(c*T.weight**1.5)),h=zi.filter(T=>o[T]?.length),p=i.reduce((T,b)=>T+l(b),0)+a,d={count:p,position:new Float32Array(p*3),center:new Float32Array(p*3),from:new Float32Array(p*3),facet:Object.fromEntries(zi.map(T=>[T,new Float32Array(p).fill(-1)])),u:new Float32Array(p),order:new Float32Array(p),seed:new Float32Array(p),size:new Float32Array(p),ahead:new Float32Array(p),kind:new Float32Array(p),memory:new Float32Array(p),galaxy:new Float32Array(p).fill(-1)},u=(T,b,S,I,U,V,N,q,B)=>{d.position.set(b,T*3),d.center.set(S,T*3),d.from.set(Oa(n),T*3),d.u[T]=I,d.order[T]=B,d.seed[T]=n(),d.size[T]=U,d.ahead[T]=V,d.kind[T]=N,d.memory[T]=q},m=0;i.forEach((T,b)=>{for(let S=0,I=l(T);S<I;S++,m++){let U=[Qi(n),Qi(n),Qi(n)*.8],V=T.spread*Math.abs(Qi(n))*.55,N=Math.hypot(...U)||1,q=U.map(B=>B/N*V);u(m,T.position.map((B,Z)=>B+q[Z]),T.position,Wr(T.year),.1+n()*.16,0,1,b,Hu(e,T.year)),d.galaxy[m]=T.period;for(let B of h)d.facet[B][m]=T.members[B][0]??-1}});let f=t+ec[1]+.4,v=Object.fromEntries(h.map(T=>[T,Um(i,T,o[T].length,f)])),g=o.threads?.length??0,_=Math.PI*2/Math.max(1,g),M=Ku(i);for(let T=0;T<a;T++,m++){let b=n()<.06,S=b?t+n()*(f-t):1980+n()*(t-1980),I=v.threads?b?Math.floor(n()*g):Wu(v.threads,S,n):-1,U=I>=0&&!b?Qu(v.threads,S,I):Dm(S,i,M),V;if(b)V=Ql(e,n(),Qi(n)*2.4);else{let N=e.list[La(e,S)],q=n()<.14,B=q?n()*.2:Ua(N,S);V=Yu(N,I,g,B,Qi(n)*_*(q?1.2:.14),Qi(n)*(.5+.9*U))}for(let N of h)d.facet[N][m]=N==="threads"?I:b?Math.floor(n()*o[N].length):Wu(v[N],S,n);u(m,V,V,Wr(S),.05+n()*.07,b?1:0,0,-1,b?1:Hu(e,S)),d.galaxy[m]=b?-1:La(e,S)}return d}var In={start:1980,end:2031,book:2027.8,clone:2029.6},ad={seconds:16},od=(i,e,t=1980,n=ad.seconds)=>t+(e-t)*tc(i/n),ld=(i,e,t=1980,n=ad.seconds)=>tc((i-t)/(e-t))*n,Us=i=>(i-In.start)/(In.end-In.start)*100,ii={rate:.004,ramp:6,slots:16},Bm=i=>ii.rate*12/(i.radius+12),zm=i=>i<=0?0:i-ii.ramp*(1-Math.exp(-i/ii.ramp)),cd=(i,e)=>Bm(i)*zm(e);var Vm=24;document.querySelectorAll(".countdown[data-until]").forEach(i=>{let e=Na(i.dataset.until);if(!(e>=0)){i.hidden=!0;return}i.querySelector(".remaining").textContent=` \xB7 ${Da(e,document.documentElement.lang)}`,i.querySelector(".scale").style.setProperty("--months",Math.min(e,Vm))});var Xd=0,Bc=1,qd=2;var ya=1,jd=2,_s=3,vs=0,yn=1,Ti=2,Ei=0,Kn=1,Zi=2,zc=3,Vc=4,Yd=5;var xs=100,$d=101,Zd=102,Jd=103,Kd=104,Qd=200,ep=201,tp=202,np=203,ip=204,rp=205,sp=206,ap=207,op=208,lp=209,cp=210,hp=211,up=212,dp=213,pp=214,kc=0,Gc=1,Hc=2,hl=3,Wc=4,Xc=5,qc=6,jc=7,fp=0,mp=1,gp=2,hi=0,Yc=1,$c=2,Zc=3,Jc=4,Kc=5,Qc=6,eh=7;var ys=301,Pr=302,ul=303,dl=304,Sa=306,pl=1e3,fl=1001,_p=1002,ui=1003,vp=1004;var Ma=1005;var Sn=1006,ml=1007;var Lr=1008;var di=1009,xp=1010,yp=1011,ba=1012,th=1013,pr=1014,Qn=1015,wi=1016,nh=1017,ih=1018,Ss=1020,Sp=35902,Mp=35899,bp=1021,Tp=1022,Ai=1023,Nr=1026,Dr=1027,Ta=1028,rh=1029,Ur=1030,sh=1031;var ah=1033,gl=33776,_l=33777,vl=33778,xl=33779,oh=35840,lh=35841,ch=35842,hh=35843,uh=36196,dh=37492,ph=37496,fh=37488,mh=37489,yl=37490,gh=37491,_h=37808,vh=37809,xh=37810,yh=37811,Sh=37812,Mh=37813,bh=37814,Th=37815,Eh=37816,wh=37817,Ah=37818,Rh=37819,Ch=37820,Ih=37821,Ph=36492,Lh=36494,Nh=36495,Dh=36283,Uh=36284,Sl=36285,Oh=36286;var Fh=0,Ep=1,Or="",Bh="srgb",Ml="srgb-linear",zh="linear",Ut="srgb";var wp=512,Ap=513,Rp=514,bl=515,Cp=516,Ip=517,Tl=518,Pp=519;var Vh=35048;var kh="300 es",Gh=2e3;function km(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Gm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function js(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Lp(){let i=js("canvas");return i.style.display="block",i}var hd={},os=null;function Ys(...i){let e="THREE."+i.shift();os?os("log",e,...i):console.log(e,...i)}function Np(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function je(...i){let e="THREE."+(i=Np(i)).shift();if(os)os("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ze(...i){let e="THREE."+(i=Np(i)).shift();if(os)os("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Tr(...i){let e=i.join(" ");e in hd||(hd[e]=!0,je(...i))}function Dp(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Up={[kc]:1,[Hc]:6,[Wc]:7,[hl]:5,[Gc]:0,[qc]:2,[jc]:4,[Xc]:3},Mi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var mo=Math.PI/180,go=180/Math.PI;function qi(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(gn[255&i]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]+"-"+gn[255&e]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[63&t|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[255&n]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function ft(i,e,t){return Math.max(e,Math.min(t,i))}function Hm(i,e){return(i%e+e)%e}function rc(i,e,t){return(1-t)*i+t*e}function xi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:case Uint8ClampedArray:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var jh=class jh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};jh.prototype.isVector2=!0;var ve=jh,Jn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],h=n[r+2],p=n[r+3],d=s[a+0],u=s[a+1],m=s[a+2],f=s[a+3];if(p!==f||c!==d||l!==u||h!==m){let v=c*d+l*u+h*m+p*f;v<0&&(d=-d,u=-u,m=-m,f=-f,v=-v);let g=1-o;if(v<.9995){let _=Math.acos(v),M=Math.sin(_);g=Math.sin(g*_)/M,c=c*g+d*(o=Math.sin(o*_)/M),l=l*g+u*o,h=h*g+m*o,p=p*g+f*o}else{c=c*g+d*o,l=l*g+u*o,h=h*g+m*o,p=p*g+f*o;let _=1/Math.sqrt(c*c+l*l+h*h+p*p);c*=_,l*=_,h*=_,p*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],c=n[r+1],l=n[r+2],h=n[r+3],p=s[a],d=s[a+1],u=s[a+2],m=s[a+3];return e[t]=o*m+h*p+c*u-l*d,e[t+1]=c*m+h*d+l*p-o*u,e[t+2]=l*m+h*u+o*d-c*p,e[t+3]=h*m-o*p-c*d-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(r/2),p=o(s/2),d=c(n/2),u=c(r/2),m=c(s/2);switch(a){case"XYZ":this._x=d*h*p+l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p-d*u*m;break;case"YXZ":this._x=d*h*p+l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p+d*u*m;break;case"ZXY":this._x=d*h*p-l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p-d*u*m;break;case"ZYX":this._x=d*h*p-l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p+d*u*m;break;case"YZX":this._x=d*h*p+l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p-d*u*m;break;case"XZY":this._x=d*h*p-l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p+d*u*m;break;default:je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],p=t[10],d=n+o+p;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-c)*u,this._y=(s-l)*u,this._z=(a-r)*u}else if(n>o&&n>p){let u=2*Math.sqrt(1+n-o-p);this._w=(h-c)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+l)/u}else if(o>p){let u=2*Math.sqrt(1+o-n-p);this._w=(s-l)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(c+h)/u}else{let u=2*Math.sqrt(1+p-n-o);this._w=(a-r)/u,this._x=(s+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-r*o,this._w=a*h-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Yh=class Yh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ud.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ud.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),h=2*(o*t-s*r),p=2*(s*n-a*t);return this.x=t+c*l+a*p-o*h,this.y=n+c*h+o*l-s*p,this.z=r+c*p+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sc.copy(this).projectOnVector(e),this.sub(sc)}reflect(e){return this.sub(sc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Yh.prototype.isVector3=!0;var C=Yh,sc=new C,ud=new Jn,$h=class $h{constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],p=n[7],d=n[2],u=n[5],m=n[8],f=r[0],v=r[3],g=r[6],_=r[1],M=r[4],T=r[7],b=r[2],S=r[5],I=r[8];return s[0]=a*f+o*_+c*b,s[3]=a*v+o*M+c*S,s[6]=a*g+o*T+c*I,s[1]=l*f+h*_+p*b,s[4]=l*v+h*M+p*S,s[7]=l*g+h*T+p*I,s[2]=d*f+u*_+m*b,s[5]=d*v+u*M+m*S,s[8]=d*g+u*T+m*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+r*s*l-r*a*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=h*a-o*l,d=o*c-h*s,u=l*s-a*c,m=t*p+n*d+r*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let f=1/m;return e[0]=p*f,e[1]=(r*l-h*n)*f,e[2]=(o*n-r*a)*f,e[3]=d*f,e[4]=(h*t-r*c)*f,e[5]=(r*s-o*t)*f,e[6]=u*f,e[7]=(n*c-l*t)*f,e[8]=(a*t-n*s)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Tr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ac.makeScale(e,t)),this}rotate(e){return Tr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ac.makeRotation(-e)),this}translate(e,t){return Tr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ac.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};$h.prototype.isMatrix3=!0;var tt=$h,ac=new tt,dd=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pd=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wm(){let i={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer==="srgb"&&(r.r=ji(r.r),r.g=ji(r.g),r.b=ji(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer==="srgb"&&(r.r=as(r.r),r.g=as(r.g),r.b=as(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?"linear":this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Tr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Tr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ml]:{primaries:e,whitePoint:n,transfer:"linear",toXYZ:dd,fromXYZ:pd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},[Bh]:{primaries:e,whitePoint:n,transfer:"srgb",toXYZ:dd,fromXYZ:pd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),i}var _t=Wm();function ji(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function as(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var Xr,_o=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Xr===void 0&&(Xr=js("canvas")),Xr.width=e.width,Xr.height=e.height;let r=Xr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Xr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=js("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*ji(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*ji(t[n]/255)):t[n]=ji(t[n]);return{data:t,width:e.width,height:e.height}}return je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Xm=0,ls=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=qi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(oc(r[a].image)):s.push(oc(r[a]))}else s=oc(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function oc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_o.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(je("Texture: Unable to serialize Texture."),{})}var qm=0,lc=new C,Ln=class i extends Mi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,c=1009,l=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=qi(),this.name="",this.source=new ls(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(lc).x}get height(){return this.source.getSize(lc).y}get depth(){return this.source.getSize(lc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:je(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ln.DEFAULT_IMAGE=null,Ln.DEFAULT_MAPPING=300,Ln.DEFAULT_ANISOTROPY=1;var Zh=class Zh{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,l=c[0],h=c[4],p=c[8],d=c[1],u=c[5],m=c[9],f=c[2],v=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(p-f)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+f)<.1&&Math.abs(m+v)<.1&&Math.abs(l+u+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(l+1)/2,T=(u+1)/2,b=(g+1)/2,S=(h+d)/4,I=(p+f)/4,U=(m+v)/4;return M>T&&M>b?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=S/n,s=I/n):T>b?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=S/r,s=U/r):b<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),n=I/s,r=U/s),this.set(n,r,s,t),this}let _=Math.sqrt((v-m)*(v-m)+(p-f)*(p-f)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(v-m)/_,this.y=(p-f)/_,this.z=(d-h)/_,this.w=Math.acos((l+u+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this.w=ft(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this.w=ft(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Zh.prototype.isVector4=!0;var Dt=Zh,vo=class extends Mi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new Ln(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new ls(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vn=class extends vo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},$s=class extends Ln{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var xo=class extends Ln{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var cl=class cl{constructor(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v)}set(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=p,g[14]=d,g[3]=u,g[7]=m,g[11]=f,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new cl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/qr.setFromMatrixColumn(e,0).length(),s=1/qr.setFromMatrixColumn(e,1).length(),a=1/qr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=c*h,t[4]=-c*p,t[8]=l,t[1]=u+m*l,t[5]=d-f*l,t[9]=-o*c,t[2]=f-d*l,t[6]=m+u*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,u=c*p,m=l*h,f=l*p;t[0]=d+f*o,t[4]=m*o-u,t[8]=a*l,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=u*o-m,t[6]=f+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,u=c*p,m=l*h,f=l*p;t[0]=d-f*o,t[4]=-a*p,t[8]=m+u*o,t[1]=u+m*o,t[5]=a*h,t[9]=f-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=c*h,t[4]=m*l-u,t[8]=d*l+f,t[1]=c*p,t[5]=f*l+d,t[9]=u*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,u=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=f-d*p,t[8]=m*p+u,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=u*p+m,t[10]=d-f*p}else if(e.order==="XZY"){let d=a*c,u=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=-p,t[8]=l*h,t[1]=d*p+f,t[5]=a*h,t[9]=u*p-m,t[2]=m*p-u,t[6]=o*h,t[10]=f*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jm,e,Ym)}lookAt(e,t,n){let r=this.elements;return Hn.subVectors(e,t),Hn.lengthSq()===0&&(Hn.z=1),Hn.normalize(),tr.crossVectors(n,Hn),tr.lengthSq()===0&&(Math.abs(n.z)===1?Hn.x+=1e-4:Hn.z+=1e-4,Hn.normalize(),tr.crossVectors(n,Hn)),tr.normalize(),Fa.crossVectors(Hn,tr),r[0]=tr.x,r[4]=Fa.x,r[8]=Hn.x,r[1]=tr.y,r[5]=Fa.y,r[9]=Hn.y,r[2]=tr.z,r[6]=Fa.z,r[10]=Hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],p=n[5],d=n[9],u=n[13],m=n[2],f=n[6],v=n[10],g=n[14],_=n[3],M=n[7],T=n[11],b=n[15],S=r[0],I=r[4],U=r[8],V=r[12],N=r[1],q=r[5],B=r[9],Z=r[13],Q=r[2],se=r[6],W=r[10],k=r[14],$=r[3],ue=r[7],ce=r[11],re=r[15];return s[0]=a*S+o*N+c*Q+l*$,s[4]=a*I+o*q+c*se+l*ue,s[8]=a*U+o*B+c*W+l*ce,s[12]=a*V+o*Z+c*k+l*re,s[1]=h*S+p*N+d*Q+u*$,s[5]=h*I+p*q+d*se+u*ue,s[9]=h*U+p*B+d*W+u*ce,s[13]=h*V+p*Z+d*k+u*re,s[2]=m*S+f*N+v*Q+g*$,s[6]=m*I+f*q+v*se+g*ue,s[10]=m*U+f*B+v*W+g*ce,s[14]=m*V+f*Z+v*k+g*re,s[3]=_*S+M*N+T*Q+b*$,s[7]=_*I+M*q+T*se+b*ue,s[11]=_*U+M*B+T*W+b*ce,s[15]=_*V+M*Z+T*k+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],p=e[6],d=e[10],u=e[14],m=e[3],f=e[7],v=e[11],g=e[15],_=c*u-l*d,M=o*u-l*p,T=o*d-c*p,b=a*u-l*h,S=a*d-c*h,I=a*p-o*h;return t*(f*_-v*M+g*T)-n*(m*_-v*b+g*S)+r*(m*M-f*b+g*I)-s*(m*T-f*S+v*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(s*h-o*c)+r*(s*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=e[9],d=e[10],u=e[11],m=e[12],f=e[13],v=e[14],g=e[15],_=t*o-n*a,M=t*c-r*a,T=t*l-s*a,b=n*c-r*o,S=n*l-s*o,I=r*l-s*c,U=h*f-p*m,V=h*v-d*m,N=h*g-u*m,q=p*v-d*f,B=p*g-u*f,Z=d*g-u*v,Q=_*Z-M*B+T*q+b*N-S*V+I*U;if(Q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let se=1/Q;return e[0]=(o*Z-c*B+l*q)*se,e[1]=(r*B-n*Z-s*q)*se,e[2]=(f*I-v*S+g*b)*se,e[3]=(d*S-p*I-u*b)*se,e[4]=(c*N-a*Z-l*V)*se,e[5]=(t*Z-r*N+s*V)*se,e[6]=(v*T-m*I-g*M)*se,e[7]=(h*I-d*T+u*M)*se,e[8]=(a*B-o*N+l*U)*se,e[9]=(n*N-t*B-s*U)*se,e[10]=(m*S-f*T+g*_)*se,e[11]=(p*T-h*S-u*_)*se,e[12]=(o*V-a*q-c*U)*se,e[13]=(t*q-n*V+r*U)*se,e[14]=(f*M-m*b-v*_)*se,e[15]=(h*b-p*M+d*_)*se,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+n,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,p=o+o,d=s*l,u=s*h,m=s*p,f=a*h,v=a*p,g=o*p,_=c*l,M=c*h,T=c*p,b=n.x,S=n.y,I=n.z;return r[0]=(1-(f+g))*b,r[1]=(u+T)*b,r[2]=(m-M)*b,r[3]=0,r[4]=(u-T)*S,r[5]=(1-(d+g))*S,r[6]=(v+_)*S,r[7]=0,r[8]=(m+M)*I,r[9]=(v-_)*I,r[10]=(1-(d+f))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=qr.set(r[0],r[1],r[2]).length(),o=qr.set(r[4],r[5],r[6]).length(),c=qr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),ri.copy(this);let l=1/a,h=1/o,p=1/c;return ri.elements[0]*=l,ri.elements[1]*=l,ri.elements[2]*=l,ri.elements[4]*=h,ri.elements[5]*=h,ri.elements[6]*=h,ri.elements[8]*=p,ri.elements[9]*=p,ri.elements[10]*=p,t.setFromRotationMatrix(ri),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),p=2*s/(n-r),d=(t+e)/(t-e),u=(n+r)/(n-r),m,f;if(c)m=s/(a-s),f=a*s/(a-s);else if(o===2e3)m=-(a+s)/(a-s),f=-2*a*s/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),f=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=p,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),p=2/(n-r),d=-(t+e)/(t-e),u=-(n+r)/(n-r),m,f;if(c)m=1/(a-s),f=a/(a-s);else if(o===2e3)m=-2/(a-s),f=-(a+s)/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),f=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=p,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};cl.prototype.isMatrix4=!0;var rt=cl,qr=new C,ri=new rt,jm=new C(0,0,0),Ym=new C(1,1,1),tr=new C,Fa=new C,Hn=new C,fd=new rt,md=new Jn,lr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],p=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(ft(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,u),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ft(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ft(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return fd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return md.setFromEuler(this),this.setFromQuaternion(md,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};lr.DEFAULT_ORDER="XYZ";var Zs=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},$m=0,gd=new C,jr=new Jn,Vi=new rt,Ba=new C,Os=new C,Zm=new C,Jm=new Jn,_d=new C(1,0,0),vd=new C(0,1,0),xd=new C(0,0,1),yd={type:"added"},Km={type:"removed"},Yr={type:"childadded",child:null},cc={type:"childremoved",child:null},Nn=class i extends Mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$m++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new lr,n=new Jn,r=new C(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new tt}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return jr.setFromAxisAngle(e,t),this.quaternion.multiply(jr),this}rotateOnWorldAxis(e,t){return jr.setFromAxisAngle(e,t),this.quaternion.premultiply(jr),this}rotateX(e){return this.rotateOnAxis(_d,e)}rotateY(e){return this.rotateOnAxis(vd,e)}rotateZ(e){return this.rotateOnAxis(xd,e)}translateOnAxis(e,t){return gd.copy(e).applyQuaternion(this.quaternion),this.position.add(gd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_d,e)}translateY(e){return this.translateOnAxis(vd,e)}translateZ(e){return this.translateOnAxis(xd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ba.copy(e):Ba.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vi.lookAt(Os,Ba,this.up):Vi.lookAt(Ba,Os,this.up),this.quaternion.setFromRotationMatrix(Vi),r&&(Vi.extractRotation(r.matrixWorld),jr.setFromRotationMatrix(Vi),this.quaternion.premultiply(jr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yd),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Km),cc.child=e,this.dispatchEvent(cc),cc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yd),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,e,Zm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,Jm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let p=c[l];s(e.shapes,p)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),p=a(e.shapes),d=a(e.skeletons),u=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Nn.DEFAULT_UP=new C(0,1,0),Nn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xi=class extends Nn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Qm={type:"move"},cs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let f of e.hand.values()){let v=t.getJointPose(f,n),g=this._getHandJoint(l,f);v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=v.radius),g.visible=v!==null}let h=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],d=h.position.distanceTo(p.position),u=.02,m=.005;l.inputState.pinching&&d>u+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=u-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qm)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Xi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Op={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nr={h:0,s:0,l:0},za={h:0,s:0,l:0};function hc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var it=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=_t.workingColorSpace){if(e=Hm(e,1),t=ft(t,0,1),n=ft(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=hc(a,s,e+1/3),this.g=hc(a,s,e),this.b=hc(a,s,e-1/3)}return _t.colorSpaceToWorking(this,r),this}setStyle(e,t="srgb"){function n(s){s!==void 0&&parseFloat(s)<1&&je("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:je("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=Op[e.toLowerCase()];return n!==void 0?this.setHex(n,t):je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}copyLinearToSRGB(e){return this.r=as(e.r),this.g=as(e.g),this.b=as(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return _t.workingToColorSpace(_n.copy(this),e),65536*Math.round(ft(255*_n.r,0,255))+256*Math.round(ft(255*_n.g,0,255))+Math.round(ft(255*_n.b,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(_n.copy(this),t);let n=_n.r,r=_n.g,s=_n.b,a=Math.max(n,r,s),o=Math.min(n,r,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let p=a-o;switch(l=h<=.5?p/(a+o):p/(2-a-o),a){case n:c=(r-s)/p+(r<s?6:0);break;case r:c=(s-n)/p+2;break;case s:c=(n-r)/p+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e="srgb"){_t.workingToColorSpace(_n.copy(this),e);let t=_n.r,n=_n.g,r=_n.b;return e!=="srgb"?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(nr),this.setHSL(nr.h+e,nr.s+t,nr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(nr),e.getHSL(za);let n=rc(nr.h,za.h,t),r=rc(nr.s,za.s,t),s=rc(nr.l,za.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},_n=new it;it.NAMES=Op;var Js=class extends Nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new lr,this.environmentIntensity=1,this.environmentRotation=new lr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},si=new C,ki=new C,uc=new C,Gi=new C,$r=new C,Zr=new C,Sd=new C,dc=new C,pc=new C,fc=new C,mc=new Dt,gc=new Dt,_c=new Dt,yi=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),si.subVectors(e,t),r.cross(si);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){si.subVectors(r,t),ki.subVectors(n,t),uc.subVectors(e,t);let a=si.dot(si),o=si.dot(ki),c=si.dot(uc),l=ki.dot(ki),h=ki.dot(uc),p=a*l-o*o;if(p===0)return s.set(0,0,0),null;let d=1/p,u=(l*c-o*h)*d,m=(a*h-o*c)*d;return s.set(1-u-m,m,u)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Gi)!==null&&Gi.x>=0&&Gi.y>=0&&Gi.x+Gi.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,Gi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Gi.x),c.addScaledVector(a,Gi.y),c.addScaledVector(o,Gi.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return mc.setScalar(0),gc.setScalar(0),_c.setScalar(0),mc.fromBufferAttribute(e,t),gc.fromBufferAttribute(e,n),_c.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(mc,s.x),a.addScaledVector(gc,s.y),a.addScaledVector(_c,s.z),a}static isFrontFacing(e,t,n,r){return si.subVectors(n,t),ki.subVectors(e,t),si.cross(ki).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return si.subVectors(this.c,this.b),ki.subVectors(this.a,this.b),.5*si.cross(ki).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;$r.subVectors(r,n),Zr.subVectors(s,n),dc.subVectors(e,n);let c=$r.dot(dc),l=Zr.dot(dc);if(c<=0&&l<=0)return t.copy(n);pc.subVectors(e,r);let h=$r.dot(pc),p=Zr.dot(pc);if(h>=0&&p<=h)return t.copy(r);let d=c*p-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector($r,a);fc.subVectors(e,s);let u=$r.dot(fc),m=Zr.dot(fc);if(m>=0&&u<=m)return t.copy(s);let f=u*l-c*m;if(f<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Zr,o);let v=h*m-u*p;if(v<=0&&p-h>=0&&u-m>=0)return Sd.subVectors(s,r),o=(p-h)/(p-h+(u-m)),t.copy(r).addScaledVector(Sd,o);let g=1/(v+f+d);return a=f*g,o=d*g,t.copy(n).addScaledVector($r,a).addScaledVector(Zr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},li=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ai):ai.fromBufferAttribute(s,a),ai.applyMatrix4(e.matrixWorld),this.expandByPoint(ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Va.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Va.copy(n.boundingBox)),Va.applyMatrix4(e.matrixWorld),this.union(Va)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ai),ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fs),ka.subVectors(this.max,Fs),Jr.subVectors(e.a,Fs),Kr.subVectors(e.b,Fs),Qr.subVectors(e.c,Fs),ir.subVectors(Kr,Jr),rr.subVectors(Qr,Kr),yr.subVectors(Jr,Qr);let t=[0,-ir.z,ir.y,0,-rr.z,rr.y,0,-yr.z,yr.y,ir.z,0,-ir.x,rr.z,0,-rr.x,yr.z,0,-yr.x,-ir.y,ir.x,0,-rr.y,rr.x,0,-yr.y,yr.x,0];return!!vc(t,Jr,Kr,Qr,ka)&&(t=[1,0,0,0,1,0,0,0,1],!!vc(t,Jr,Kr,Qr,ka)&&(Ga.crossVectors(ir,rr),t=[Ga.x,Ga.y,Ga.z],vc(t,Jr,Kr,Qr,ka)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(ai).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hi)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Hi=[new C,new C,new C,new C,new C,new C,new C,new C],ai=new C,Va=new li,Jr=new C,Kr=new C,Qr=new C,ir=new C,rr=new C,yr=new C,Fs=new C,ka=new C,Ga=new C,Sr=new C;function vc(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Sr.fromArray(i,s);let o=r.x*Math.abs(Sr.x)+r.y*Math.abs(Sr.y)+r.z*Math.abs(Sr.z),c=e.dot(Sr),l=t.dot(Sr),h=n.dot(Sr);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var g1=eg();function eg(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,r[c]=24,r[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,r[c]=-l-1,r[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,r[c]=13,r[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,r[c]=24,r[256|c]=24):(n[c]=31744,n[256|c]=64512,r[c]=13,r[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var $t=new C,Ha=new ve,tg=0,Tt=class extends Mi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:tg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ha.fromBufferAttribute(this,t),Ha.applyMatrix3(e),this.setXY(t,Ha.x,Ha.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix3(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ks=class extends Tt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Qs=class extends Tt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var We=class extends Tt{constructor(e,t,n){super(new Float32Array(e),t,n)}},ng=new li,Bs=new C,xc=new C,ci=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ng.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bs.subVectors(e,this.center);let t=Bs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(Bs,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bs.copy(e.center).add(xc)),this.expandByPoint(Bs.copy(e.center).sub(xc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ig=0,Zn=new rt,yc=new Nn,es=new C,Wn=new li,zs=new li,sn=new C,vt=class i extends Mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ig++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(km(e)?Qs:Ks)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new tt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,t,n){return Zn.makeTranslation(e,t,n),this.applyMatrix4(Zn),this}scale(e,t,n){return Zn.makeScale(e,t,n),this.applyMatrix4(Zn),this}lookAt(e){return yc.lookAt(e),yc.updateMatrix(),this.applyMatrix4(yc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new We(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Wn.setFromBufferAttribute(s),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Wn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Wn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Wn.min),this.boundingBox.expandByPoint(Wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new C,1/0);if(e){let n=this.boundingSphere.center;if(Wn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];zs.setFromBufferAttribute(o),this.morphTargetsRelative?(sn.addVectors(Wn.min,zs.min),Wn.expandByPoint(sn),sn.addVectors(Wn.max,zs.max),Wn.expandByPoint(sn)):(Wn.expandByPoint(zs.min),Wn.expandByPoint(zs.max))}Wn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)sn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(sn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)sn.fromBufferAttribute(o,l),c&&(es.fromBufferAttribute(e,l),sn.add(es)),r=Math.max(r,n.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");a!==void 0&&a.count===n.count||(a=new Tt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let U=0;U<n.count;U++)o[U]=new C,c[U]=new C;let l=new C,h=new C,p=new C,d=new ve,u=new ve,m=new ve,f=new C,v=new C;function g(U,V,N){l.fromBufferAttribute(n,U),h.fromBufferAttribute(n,V),p.fromBufferAttribute(n,N),d.fromBufferAttribute(s,U),u.fromBufferAttribute(s,V),m.fromBufferAttribute(s,N),h.sub(l),p.sub(l),u.sub(d),m.sub(d);let q=1/(u.x*m.y-m.x*u.y);isFinite(q)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-u.y).multiplyScalar(q),v.copy(p).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(q),o[U].add(f),o[V].add(f),o[N].add(f),c[U].add(v),c[V].add(v),c[N].add(v))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let U=0,V=_.length;U<V;++U){let N=_[U],q=N.start;for(let B=q,Z=q+N.count;B<Z;B+=3)g(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let M=new C,T=new C,b=new C,S=new C;function I(U){b.fromBufferAttribute(r,U),S.copy(b);let V=o[U];M.copy(V),M.sub(b.multiplyScalar(b.dot(V))).normalize(),T.crossVectors(S,V);let N=T.dot(c[U])<0?-1:1;a.setXYZW(U,M.x,M.y,M.z,N)}for(let U=0,V=_.length;U<V;++U){let N=_[U],q=N.start;for(let B=q,Z=q+N.count;B<Z;B+=3)I(e.getX(B+0)),I(e.getX(B+1)),I(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Tt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let r=new C,s=new C,a=new C,o=new C,c=new C,l=new C,h=new C,p=new C;if(e)for(let d=0,u=e.count;d<u;d+=3){let m=e.getX(d+0),f=e.getX(d+1),v=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,f),a.fromBufferAttribute(t,v),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,f),l.fromBufferAttribute(n,v),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(v,l.x,l.y,l.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)sn.fromBufferAttribute(e,t),sn.normalize(),e.setXYZ(t,sn.x,sn.y,sn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,p=o.normalized,d=new l.constructor(c.length*h),u=0,m=0;for(let f=0,v=c.length;f<v;f++){u=o.isInterleavedBufferAttribute?c[f]*o.data.stride+o.offset:c[f]*h;for(let g=0;g<h;g++)d[m++]=l[u++]}return new Tt(d,h,p)}if(this.index===null)return je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let c=e(r[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,p=l.length;h<p;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let p=0,d=l.length;p<d;p++){let u=l[p];h.push(u.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let l in r){let h=r[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],p=s[l];for(let d=0,u=p.length;d<u;d++)h.push(p[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},yo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=qi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Pn=new C,ea=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Pn.fromBufferAttribute(this,t),Pn.applyMatrix4(e),this.setXYZ(t,Pn.x,Pn.y,Pn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pn.fromBufferAttribute(this,t),Pn.applyNormalMatrix(e),this.setXYZ(t,Pn.x,Pn.y,Pn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pn.fromBufferAttribute(this,t),Pn.transformDirection(e),this.setXYZ(t,Pn.x,Pn.y,Pn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=xi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=xi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=xi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=xi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),s=Pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Ys("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Tt(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ys("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Sc=new C,rg=new C,sg=new tt,oi=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Sc.subVectors(n,t).cross(rg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Sc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sg.getNormalMatrix(e),r=this.coplanarPoint(Sc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},ts,ag=0,bi=class extends Mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ag++}),this.uuid=qi(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){je(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:je(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new it().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new oi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ve().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ve().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},hs=class extends bi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vs=new C,ns=new C,is=new C,rs=new ve,ks=new ve,Fp=new rt,Wa=new C,Gs=new C,Xa=new C,Md=new ve,Mc=new ve,bd=new ve,ta=class extends Nn{constructor(e=new hs){if(super(),this.isSprite=!0,this.type="Sprite",ts===void 0){ts=new vt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new yo(t,5);ts.setIndex([0,1,2,0,2,3]),ts.setAttribute("position",new ea(n,3,0,!1)),ts.setAttribute("uv",new ea(n,2,3,!1))}this.geometry=ts,this.material=e,this.center=new ve(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Ze('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ns.setFromMatrixScale(this.matrixWorld),Fp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),is.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ns.multiplyScalar(-is.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;qa(Wa.set(-.5,-.5,0),is,a,ns,r,s),qa(Gs.set(.5,-.5,0),is,a,ns,r,s),qa(Xa.set(.5,.5,0),is,a,ns,r,s),Md.set(0,0),Mc.set(1,0),bd.set(1,1);let o=e.ray.intersectTriangle(Wa,Gs,Xa,!1,Vs);if(o===null&&(qa(Gs.set(-.5,.5,0),is,a,ns,r,s),Mc.set(0,1),o=e.ray.intersectTriangle(Wa,Xa,Gs,!1,Vs),o===null))return;let c=e.ray.origin.distanceTo(Vs);c<e.near||c>e.far||t.push({distance:c,point:Vs.clone(),uv:yi.getInterpolation(Vs,Wa,Gs,Xa,Md,Mc,bd,new ve),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function qa(i,e,t,n,r,s){rs.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(ks.x=s*rs.x-r*rs.y,ks.y=r*rs.x+s*rs.y):ks.copy(rs),i.copy(e),i.x+=ks.x,i.y+=ks.y,i.applyMatrix4(Fp)}var _1=new C,v1=new C;var Wi=new C,bc=new C,ja=new C,Ya=new C,Er=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wi.copy(this.origin).addScaledVector(this.direction,t),Wi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){bc.copy(e).add(t).multiplyScalar(.5),ja.copy(t).sub(e).normalize(),Ya.copy(this.origin).sub(bc);let s=.5*e.distanceTo(t),a=-this.direction.dot(ja),o=Ya.dot(this.direction),c=-Ya.dot(ja),l=Ya.lengthSq(),h=Math.abs(1-a*a),p,d,u,m;if(h>0)if(p=a*c-o,d=a*o-c,m=s*h,p>=0)if(d>=-m)if(d<=m){let f=1/h;p*=f,d*=f,u=p*(p+a*d+2*o)+d*(a*p+d+2*c)+l}else d=s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;else d=-s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;else d<=-m?(p=Math.max(0,-(-a*s+o)),d=p>0?-s:Math.min(Math.max(-s,-c),s),u=-p*p+d*(d+2*c)+l):d<=m?(p=0,d=Math.min(Math.max(-s,-c),s),u=d*(d+2*c)+l):(p=Math.max(0,-(a*s+o)),d=p>0?s:Math.min(Math.max(-s,-c),s),u=-p*p+d*(d+2*c)+l);else d=a>0?-s:s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(bc).addScaledVector(ja,d),u}intersectSphere(e,t){if(e.radius<0)return null;Wi.subVectors(e.center,this.origin);let n=Wi.dot(this.direction),r=Wi.dot(Wi)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-d.z)*p,c=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,c=(e.min.z-d.z)*p),n>c||o>r?null:((o>n||n!=n)&&(n=o),(c<r||r!=r)&&(r=c),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,Wi)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,p=e.x-a.x,d=e.y-a.y,u=e.z-a.z,m=t.x-a.x,f=t.y-a.y,v=t.z-a.z,g=n.x-a.x,_=n.y-a.y,M=n.z-a.z,T=Math.abs(c),b=Math.abs(l),S=Math.abs(h),I,U,V,N,q,B,Z,Q,se,W,k,$;if(T>=b&&T>=S?(V=c,B=p,se=m,$=g,c>=0?(I=l,U=h,N=d,q=u,Z=f,Q=v,W=_,k=M):(I=h,U=l,N=u,q=d,Z=v,Q=f,W=M,k=_)):b>=S?(V=l,B=d,se=f,$=_,l>=0?(I=h,U=c,N=u,q=p,Z=v,Q=m,W=M,k=g):(I=c,U=h,N=p,q=u,Z=m,Q=v,W=g,k=M)):(V=h,B=u,se=v,$=M,h>=0?(I=c,U=l,N=p,q=d,Z=m,Q=f,W=g,k=_):(I=l,U=c,N=d,q=p,Z=f,Q=m,W=_,k=g)),V===0)return null;let ue=I/V,ce=U/V,re=N-ue*B,Se=q-ce*B,pe=Z-ue*se,le=Q-ce*se,ie=W-ue*$,fe=k-ce*$,Te=ie*le-fe*pe,Ee=re*fe-Se*ie,A=pe*Se-le*re;if(r){if(Te<0||Ee<0||A<0)return null}else if((Te<0||Ee<0||A<0)&&(Te>0||Ee>0||A>0))return null;let E=Te+Ee+A;if(E===0)return null;let P=1/V*(Te*B+Ee*se+A*$);return(E>0?P<0:P>0)?null:this.at(P/E,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},na=class extends bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new lr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Td=new rt,Mr=new Er,$a=new ci,Ed=new C,Za=new C,Ja=new C,Ka=new C,Tc=new C,Qa=new C,wd=new C,eo=new C,xn=class extends Nn{constructor(e=new vt,t=new na){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Qa.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],p=s[c];h!==0&&(Tc.fromBufferAttribute(p,e),a?Qa.addScaledVector(Tc,h):Qa.addScaledVector(Tc.sub(t),h))}t.add(Qa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(s),Mr.copy(e.ray).recast(e.near),$a.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere($a,Ed)===null||Mr.origin.distanceToSquared(Ed)>(e.far-e.near)**2))return;Td.copy(s).invert(),Mr.copy(e.ray).applyMatrix4(Td),n.boundingBox!==null&&Mr.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Mr)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),M=Math.min(o.count,Math.min(v.start+v.count,u.start+u.count));_<M;_+=3)r=to(this,g,e,n,l,h,p,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(o.count,u.start+u.count);m<f;m+=3)r=to(this,a,e,n,l,h,p,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(c!==void 0)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),M=Math.min(c.count,Math.min(v.start+v.count,u.start+u.count));_<M;_+=3)r=to(this,g,e,n,l,h,p,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(c.count,u.start+u.count);m<f;m+=3)r=to(this,a,e,n,l,h,p,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};function og(i,e,t,n,r,s,a,o){let c;if(c=e.side===1?n.intersectTriangle(a,s,r,!0,o):n.intersectTriangle(r,s,a,e.side===0,o),c===null)return null;eo.copy(o),eo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(eo);return l<t.near||l>t.far?null:{distance:l,point:eo.clone(),object:i}}function to(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,Za),i.getVertexPosition(c,Ja),i.getVertexPosition(l,Ka);let h=og(i,e,t,n,Za,Ja,Ka,wd);if(h){let p=new C;yi.getBarycoord(wd,Za,Ja,Ka,p),r&&(h.uv=yi.getInterpolatedAttribute(r,o,c,l,p,new ve)),s&&(h.uv1=yi.getInterpolatedAttribute(s,o,c,l,p,new ve)),a&&(h.normal=yi.getInterpolatedAttribute(a,o,c,l,p,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new C,materialIndex:0};yi.getNormal(Za,Ja,Ka,d.normal),h.face=d,h.barycoord=p}return h}var x1=new Dt,y1=new Dt,S1=new Dt,M1=new Dt,b1=new rt,T1=new C,E1=new ci,w1=new rt,A1=new Er;var wr=class extends Ln{constructor(e=null,t=1,n=1,r,s,a,o,c,l=1003,h=1003,p,d){super(null,a,o,c,l,h,r,s,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},R1=new rt,C1=new rt;var I1=new rt,P1=new rt;var L1=new li,N1=new rt,D1=new xn,U1=new ci;var br=new ci,lg=new ve(.5,.5),no=new C,cr=class{constructor(e=new oi,t=new oi,n=new oi,r=new oi,s=new oi,a=new oi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],p=s[5],d=s[6],u=s[7],m=s[8],f=s[9],v=s[10],g=s[11],_=s[12],M=s[13],T=s[14],b=s[15];if(r[0].setComponents(l-a,u-h,g-m,b-_).normalize(),r[1].setComponents(l+a,u+h,g+m,b+_).normalize(),r[2].setComponents(l+o,u+p,g+f,b+M).normalize(),r[3].setComponents(l-o,u-p,g-f,b-M).normalize(),n)r[4].setComponents(c,d,v,T).normalize(),r[5].setComponents(l-c,u-d,g-v,b-T).normalize();else if(r[4].setComponents(l-c,u-d,g-v,b-T).normalize(),t===2e3)r[5].setComponents(l+c,u+d,g+v,b+T).normalize();else{if(t!==2001)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(c,d,v,T).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),br.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),br.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(br)}intersectsSprite(e){br.center.set(0,0,0);let t=lg.distanceTo(e.center);return br.radius=.7071067811865476+t,br.applyMatrix4(e.matrixWorld),this.intersectsSphere(br)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(no.x=r.normal.x>0?e.max.x:e.min.x,no.y=r.normal.y>0?e.max.y:e.min.y,no.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(no)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ad=new rt,So=class i{constructor(){this.coordinateSystem=2e3,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];Ad.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new cr),n[r].setFromProjectionMatrix(Ad,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new cr),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Pc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},O1=new rt,F1=new it(1,1,1),B1=new cr,z1=new So,V1=new li,k1=new ci,G1=new C,H1=new C,W1=new C,X1=new Pc,q1=new xn;var Ar=class extends bi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Mo=new C,bo=new C,Rd=new rt,Hs=new Er,io=new ci,Ec=new C,Cd=new C,Yi=class extends Nn{constructor(e=new vt,t=new Ar){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Mo.fromBufferAttribute(t,r-1),bo.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Mo.distanceTo(bo);e.setAttribute("lineDistance",new We(n,1))}else je("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(r),io.radius+=s,e.ray.intersectsSphere(io)===!1)return;Rd.copy(r).invert(),Hs.copy(e.ray).applyMatrix4(Rd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),u=Math.min(h.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=l){let v=h.getX(m),g=h.getX(m+1),_=ro(this,e,Hs,c,v,g,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(u-1),f=h.getX(d),v=ro(this,e,Hs,c,m,f,u-1);v&&t.push(v)}}else{let d=Math.max(0,a.start),u=Math.min(p.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=l){let v=ro(this,e,Hs,c,m,m+1,m);v&&t.push(v)}if(this.isLineLoop){let m=ro(this,e,Hs,c,u-1,d,u-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ro(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(Mo.fromBufferAttribute(o,r),bo.fromBufferAttribute(o,s),t.distanceSqToSegment(Mo,bo,Ec,Cd)>n)return;Ec.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Ec);return c<e.near||c>e.far?void 0:{distance:c,point:Cd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Id=new C,Pd=new C,Rr=class extends Yi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Id.fromBufferAttribute(t,r),Pd.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Id.distanceTo(Pd);e.setAttribute("lineDistance",new We(n,1))}else je("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var To=class extends bi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ld=new rt,Lc=new Er,so=new ci,ao=new C,$i=class extends Nn{constructor(e=new vt,t=new To){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(r),so.radius+=s,e.ray.intersectsSphere(so)===!1)return;Ld.copy(r).invert(),Lc.copy(e.ray).applyMatrix4(Ld);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null)for(let p=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);p<d;p++){let u=l.getX(p);ao.fromBufferAttribute(h,u),Nd(ao,u,c,r,e,t,this)}else for(let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);p<d;p++)ao.fromBufferAttribute(h,p),Nd(ao,p,c,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Nd(i,e,t,n,r,s,a){let o=Lc.distanceSqToPoint(i);if(o<t){let c=new C;Lc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ia=class extends Ln{constructor(e=[],t=301,n,r,s,a,o,c,l,h){super(e,t,n,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},us=class extends Ln{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var hr=class extends Ln{constructor(e,t,n=1014,r,s,a,o=1003,c=1003,l,h=1026,p=1){if(h!==1026&&h!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:p},r,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ls(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Eo=class extends hr{constructor(e,t=1014,n=301,r,s,a=1003,o=1003,c,l=1026){let h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ra=class extends Ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Cr=class i extends vt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],p=[],d=0,u=0;function m(f,v,g,_,M,T,b,S,I,U,V){let N=T/I,q=b/U,B=T/2,Z=b/2,Q=S/2,se=I+1,W=U+1,k=0,$=0,ue=new C;for(let ce=0;ce<W;ce++){let re=ce*q-Z;for(let Se=0;Se<se;Se++){let pe=Se*N-B;ue[f]=pe*_,ue[v]=re*M,ue[g]=Q,l.push(ue.x,ue.y,ue.z),ue[f]=0,ue[v]=0,ue[g]=S>0?1:-1,h.push(ue.x,ue.y,ue.z),p.push(Se/I),p.push(1-ce/U),k+=1}}for(let ce=0;ce<U;ce++)for(let re=0;re<I;re++){let Se=d+re+se*ce,pe=d+re+se*(ce+1),le=d+(re+1)+se*(ce+1),ie=d+(re+1)+se*ce;c.push(Se,pe,ie),c.push(pe,le,ie),$+=6}o.addGroup(u,$,V),u+=$,d+=k}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new We(l,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},wo=class i extends vt{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,p=Math.PI/2*e,d=t,u=2*p+d,m=2*n+s,f=r+1,v=new C,g=new C;for(let _=0;_<=m;_++){let M=0,T=0,b=0,S=0;if(_<=n){let V=_/n,N=V*Math.PI/2;T=-h-e*Math.cos(N),b=e*Math.sin(N),S=-e*Math.cos(N),M=V*p}else if(_<=n+s){let V=(_-n)/s;T=V*t-h,b=e,S=0,M=p+V*d}else{let V=(_-n-s)/n,N=V*Math.PI/2;T=h+e*Math.sin(N),b=e*Math.cos(N),S=e*Math.sin(N),M=p+d+V*p}let I=Math.max(0,Math.min(1,M/u)),U=0;_===0?U=.5/r:_===m&&(U=-.5/r);for(let V=0;V<=r;V++){let N=V/r,q=N*Math.PI*2,B=Math.sin(q),Z=Math.cos(q);g.x=-b*Z,g.y=T,g.z=b*B,o.push(g.x,g.y,g.z),v.set(-b*Z,S,b*B),v.normalize(),c.push(v.x,v.y,v.z),l.push(N+U,I)}if(_>0){let V=(_-1)*f;for(let N=0;N<r;N++){let q=V+N,B=V+N+1,Z=_*f+N,Q=_*f+N+1;a.push(q,B,Z),a.push(B,Q,Z)}}}this.setIndex(a),this.setAttribute("position",new We(o,3)),this.setAttribute("normal",new We(c,3)),this.setAttribute("uv",new We(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Ao=class i extends vt{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new C,h=new ve;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let p=0,d=3;p<=t;p++,d+=3){let u=n+p/t*r;l.x=e*Math.cos(u),l.y=e*Math.sin(u),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let p=1;p<=t;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new We(a,3)),this.setAttribute("normal",new We(o,3)),this.setAttribute("uv",new We(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},sa=class i extends vt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let h=[],p=[],d=[],u=[],m=0,f=[],v=n/2,g=0;function _(M){let T=m,b=new ve,S=new C,I=0,U=M===!0?e:t,V=M===!0?1:-1;for(let q=1;q<=r;q++)p.push(0,v*V,0),d.push(0,V,0),u.push(.5,.5),m++;let N=m;for(let q=0;q<=r;q++){let B=q/r*c+o,Z=Math.cos(B),Q=Math.sin(B);S.x=U*Q,S.y=v*V,S.z=U*Z,p.push(S.x,S.y,S.z),d.push(0,V,0),b.x=.5*Z+.5,b.y=.5*Q*V+.5,u.push(b.x,b.y),m++}for(let q=0;q<r;q++){let B=T+q,Z=N+q;M===!0?h.push(Z,Z+1,B):h.push(Z+1,Z,B),I+=3}l.addGroup(g,I,M===!0?1:2),g+=I}(function(){let M=new C,T=new C,b=0,S=(t-e)/n;for(let I=0;I<=s;I++){let U=[],V=I/s,N=V*(t-e)+e;for(let q=0;q<=r;q++){let B=q/r,Z=B*c+o,Q=Math.sin(Z),se=Math.cos(Z);T.x=N*Q,T.y=-V*n+v,T.z=N*se,p.push(T.x,T.y,T.z),M.set(Q,S,se).normalize(),d.push(M.x,M.y,M.z),u.push(B,1-V),U.push(m++)}f.push(U)}for(let I=0;I<r;I++)for(let U=0;U<s;U++){let V=f[U][I],N=f[U+1][I],q=f[U+1][I+1],B=f[U][I+1];(e>0||U!==0)&&(h.push(V,N,B),b+=3),(t>0||U!==s-1)&&(h.push(N,q,B),b+=3)}l.addGroup(g,b,0),g+=b})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new We(p,3)),this.setAttribute("normal",new We(d,3)),this.setAttribute("uv",new We(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ro=class i extends sa{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ur=class i extends vt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(u,m,f,v){let g=v+1,_=[];for(let M=0;M<=g;M++){_[M]=[];let T=u.clone().lerp(f,M/g),b=m.clone().lerp(f,M/g),S=g-M;for(let I=0;I<=S;I++)_[M][I]=I===0&&M===g?T:T.clone().lerp(b,I/S)}for(let M=0;M<g;M++)for(let T=0;T<2*(g-M)-1;T++){let b=Math.floor(T/2);T%2==0?(c(_[M][b+1]),c(_[M+1][b]),c(_[M][b])):(c(_[M][b+1]),c(_[M+1][b+1]),c(_[M+1][b]))}}function c(u){s.push(u.x,u.y,u.z)}function l(u,m){let f=3*u;m.x=e[f+0],m.y=e[f+1],m.z=e[f+2]}function h(u,m,f,v){v<0&&u.x===1&&(a[m]=u.x-1),f.x===0&&f.z===0&&(a[m]=v/2/Math.PI+.5)}function p(u){return Math.atan2(u.z,-u.x)}function d(u){return Math.atan2(-u.y,Math.sqrt(u.x*u.x+u.z*u.z))}(function(u){let m=new C,f=new C,v=new C;for(let g=0;g<t.length;g+=3)l(t[g+0],m),l(t[g+1],f),l(t[g+2],v),o(m,f,v,u)})(r),(function(u){let m=new C;for(let f=0;f<s.length;f+=3)m.x=s[f+0],m.y=s[f+1],m.z=s[f+2],m.normalize().multiplyScalar(u),s[f+0]=m.x,s[f+1]=m.y,s[f+2]=m.z})(n),(function(){let u=new C;for(let m=0;m<s.length;m+=3){u.x=s[m+0],u.y=s[m+1],u.z=s[m+2];let f=p(u)/2/Math.PI+.5,v=d(u)/Math.PI+.5;a.push(f,1-v)}(function(){let m=new C,f=new C,v=new C,g=new C,_=new ve,M=new ve,T=new ve;for(let b=0,S=0;b<s.length;b+=9,S+=6){m.set(s[b+0],s[b+1],s[b+2]),f.set(s[b+3],s[b+4],s[b+5]),v.set(s[b+6],s[b+7],s[b+8]),_.set(a[S+0],a[S+1]),M.set(a[S+2],a[S+3]),T.set(a[S+4],a[S+5]),g.copy(m).add(f).add(v).divideScalar(3);let I=p(g);h(_,S+0,m,I),h(M,S+2,f,I),h(T,S+4,v,I)}})(),(function(){for(let m=0;m<a.length;m+=6){let f=a[m+0],v=a[m+2],g=a[m+4],_=Math.max(f,v,g),M=Math.min(f,v,g);_>.9&&M<.1&&(f<.2&&(a[m+0]+=1),v<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new We(s,3)),this.setAttribute("normal",new We(s.slice(),3)),this.setAttribute("uv",new We(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},Co=class i extends ur{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},oo=new C,lo=new C,wc=new C,co=new yi,Io=class extends vt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(mo*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],p=new Array(3),d={},u=[];for(let m=0;m<c;m+=3){a?(l[0]=a.getX(m),l[1]=a.getX(m+1),l[2]=a.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);let{a:f,b:v,c:g}=co;if(f.fromBufferAttribute(o,l[0]),v.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),co.getNormal(wc),p[0]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,p[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,p[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,p[0]!==p[1]&&p[1]!==p[2]&&p[2]!==p[0])for(let _=0;_<3;_++){let M=(_+1)%3,T=p[_],b=p[M],S=co[h[_]],I=co[h[M]],U=`${T}_${b}`,V=`${b}_${T}`;V in d&&d[V]?(wc.dot(d[V].normal)<=s&&(u.push(S.x,S.y,S.z),u.push(I.x,I.y,I.z)),d[V]=null):U in d||(d[U]={index0:l[_],index1:l[M],normal:wc.clone()})}}for(let m in d)if(d[m]){let{index0:f,index1:v}=d[m];oo.fromBufferAttribute(o,f),lo.fromBufferAttribute(o,v),u.push(oo.x,oo.y,oo.z),u.push(lo.x,lo.y,lo.z)}this.setAttribute("position",new We(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},qn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){je("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(r=Math.floor(c+(l-c)/2),o=n[r]-a,o<0)c=r+1;else{if(!(o>0)){l=r;break}l=r-1}if(r=l,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),c=t||(a.isVector2?new ve:new C);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,r=[],s=[],a=[],o=new C,c=new rt;for(let u=0;u<=e;u++){let m=u/e;r[u]=this.getTangentAt(m,new C)}s[0]=new C,a[0]=new C;let l=Number.MAX_VALUE,h=Math.abs(r[0].x),p=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),p<=l&&(l=p,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(ft(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(c.makeRotationAxis(o,m))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(ft(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(r[m],u*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ds=class extends qn{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ve){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=c-this.aX,u=l-this.aY;c=d*h-u*p+this.aX,l=d*p+u*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Po=class extends ds{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Hh(){let i=0,e=0,t=0,n=0;function r(s,a,o,c){i=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){r(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,p){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,u=(o-a)/h-(c-a)/(h+p)+(c-o)/p;d*=h,u*=h,r(a,o,d,u)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var Dd=new C,Ud=new C,Ac=new Hh,Rc=new Hh,Cc=new Hh,Lo=class extends qn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new C){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=r[(l-1)%s]:(Ud.subVectors(r[0],r[1]).add(r[0]),o=Ud);let p=r[l%s],d=r[(l+1)%s];if(this.closed||l+2<s?c=r[(l+2)%s]:(Dd.subVectors(r[s-1],r[s-2]).add(r[s-1]),c=Dd),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(p),u),f=Math.pow(p.distanceToSquared(d),u),v=Math.pow(d.distanceToSquared(c),u);f<1e-4&&(f=1),m<1e-4&&(m=f),v<1e-4&&(v=f),Ac.initNonuniformCatmullRom(o.x,p.x,d.x,c.x,m,f,v),Rc.initNonuniformCatmullRom(o.y,p.y,d.y,c.y,m,f,v),Cc.initNonuniformCatmullRom(o.z,p.z,d.z,c.z,m,f,v)}else this.curveType==="catmullrom"&&(Ac.initCatmullRom(o.x,p.x,d.x,c.x,this.tension),Rc.initCatmullRom(o.y,p.y,d.y,c.y,this.tension),Cc.initCatmullRom(o.z,p.z,d.z,c.z,this.tension));return n.set(Ac.calc(h),Rc.calc(h),Cc.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new C().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Od(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function cg(i,e){let t=1-i;return t*t*e}function hg(i,e){return 2*(1-i)*i*e}function ug(i,e){return i*i*e}function Xs(i,e,t,n){return cg(i,e)+hg(i,t)+ug(i,n)}function dg(i,e){let t=1-i;return t*t*t*e}function pg(i,e){let t=1-i;return 3*t*t*i*e}function fg(i,e){return 3*(1-i)*i*i*e}function mg(i,e){return i*i*i*e}function qs(i,e,t,n,r){return dg(i,e)+pg(i,t)+fg(i,n)+mg(i,r)}var aa=class extends qn{constructor(e=new ve,t=new ve,n=new ve,r=new ve){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ve){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(qs(e,r.x,s.x,a.x,o.x),qs(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},No=class extends qn{constructor(e=new C,t=new C,n=new C,r=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new C){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(qs(e,r.x,s.x,a.x,o.x),qs(e,r.y,s.y,a.y,o.y),qs(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},oa=class extends qn{constructor(e=new ve,t=new ve){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ve){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ve){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Do=class extends qn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},la=class extends qn{constructor(e=new ve,t=new ve,n=new ve){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ve){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Xs(e,r.x,s.x,a.x),Xs(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ca=class extends qn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Xs(e,r.x,s.x,a.x),Xs(e,r.y,s.y,a.y),Xs(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ha=class extends qn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ve){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,c=r[a===0?a:a-1],l=r[a],h=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return n.set(Od(o,c.x,l.x,h.x,p.x),Od(o,c.y,l.y,h.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ve().fromArray(r))}return this}},Uo=Object.freeze({__proto__:null,ArcCurve:Po,CatmullRomCurve3:Lo,CubicBezierCurve:aa,CubicBezierCurve3:No,EllipseCurve:ds,LineCurve:oa,LineCurve3:Do,QuadraticBezierCurve:la,QuadraticBezierCurve3:ca,SplineCurve:ha}),Oo=class extends qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Uo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new Uo[r.type]().fromJSON(r))}return this}},ua=class extends Oo{constructor(e){super(),this.type="Path",this.currentPoint=new ve,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new oa(this.currentPoint.clone(),new ve(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new la(this.currentPoint.clone(),new ve(e,t),new ve(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new aa(this.currentPoint.clone(),new ve(e,t),new ve(n,r),new ve(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ha(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,r,s,a,o,c),this}absellipse(e,t,n,r,s,a,o,c){let l=new ds(e,t,n,r,s,a,o,c);if(this.curves.length>0){let p=l.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},da=class extends ua{constructor(e){super(e),this.uuid=qi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new ua().fromJSON(r))}return this}};function gg(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Bp(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=Sg(i,e,s,t)),i.length>80*t){o=i[0],c=i[1];let h=o,p=c;for(let d=t;d<r;d+=t){let u=i[d],m=i[d+1];u<o&&(o=u),m<c&&(c=m),u>h&&(h=u),m>p&&(p=m)}l=Math.max(h-o,p-c),l=l!==0?32767/l:0}return pa(s,a,t,o,c,l,0),a}function Bp(i,e,t,n,r){let s;if(r===Lg(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=Fd(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Fd(a/n|0,i[a],i[a+1],s);return s&&ps(s,s.next)&&(ma(s),s=s.next),s}function Ir(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!ps(n,n.next)&&Xt(n.prev,n,n.next)!==0)n=n.next;else{if(ma(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function pa(i,e,t,n,r,s,a){if(!i)return;!a&&s&&wg(i,n,r,s);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(s?vg(i,n,r,s):_g(i))e.push(c.i,i.i,l.i),ma(i),i=l.next,o=l.next;else if((i=l)===o){a?a===1?pa(i=xg(Ir(i),e),e,t,n,r,s,2):a===2&&yg(i,e,t,n,r,s):pa(Ir(i),e,t,n,r,s,1);break}}}function _g(i){let e=i.prev,t=i,n=i.next;if(Xt(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(r,s,a),p=Math.min(o,c,l),d=Math.max(r,s,a),u=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=p&&m.y<=u&&Ws(r,o,s,c,a,l,m.x,m.y)&&Xt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function vg(i,e,t,n){let r=i.prev,s=i,a=i.next;if(Xt(r,s,a)>=0)return!1;let o=r.x,c=s.x,l=a.x,h=r.y,p=s.y,d=a.y,u=Math.min(o,c,l),m=Math.min(h,p,d),f=Math.max(o,c,l),v=Math.max(h,p,d),g=Nc(u,m,e,t,n),_=Nc(f,v,e,t,n),M=i.prevZ,T=i.nextZ;for(;M&&M.z>=g&&T&&T.z<=_;){if(M.x>=u&&M.x<=f&&M.y>=m&&M.y<=v&&M!==r&&M!==a&&Ws(o,h,c,p,l,d,M.x,M.y)&&Xt(M.prev,M,M.next)>=0||(M=M.prevZ,T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&Ws(o,h,c,p,l,d,T.x,T.y)&&Xt(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;M&&M.z>=g;){if(M.x>=u&&M.x<=f&&M.y>=m&&M.y<=v&&M!==r&&M!==a&&Ws(o,h,c,p,l,d,M.x,M.y)&&Xt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;T&&T.z<=_;){if(T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&Ws(o,h,c,p,l,d,T.x,T.y)&&Xt(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function xg(i,e){let t=i;do{let n=t.prev,r=t.next.next;!ps(n,r)&&Vp(n,t,t.next,r)&&fa(n,r)&&fa(r,n)&&(e.push(n.i,t.i,r.i),ma(t),ma(t.next),t=i=r),t=t.next}while(t!==i);return Ir(t)}function yg(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Cg(a,o)){let c=kp(a,o);return a=Ir(a,a.next),c=Ir(c,c.next),pa(a,e,t,n,r,s,0),void pa(c,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function Sg(i,e,t,n){let r=[];for(let s=0,a=e.length;s<a;s++){let o=Bp(i,e[s]*n,s<a-1?e[s+1]*n:i.length,n,!1);o===o.next&&(o.steiner=!0),r.push(Rg(o))}r.sort(Mg);for(let s=0;s<r.length;s++)t=bg(r[s],t);return t}function Mg(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function bg(i,e){let t=Tg(i,e);if(!t)return e;let n=kp(t,i);return Ir(n,n.next),Ir(t,t.next)}function Tg(i,e){let t=e,n=i.x,r=i.y,s,a=-1/0;if(ps(i,t))return t;do{if(ps(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let p=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>a&&(a=p,s=t.x<t.next.x?t:t.next,p===n))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,c=s.x,l=s.y,h=1/0;t=s;do{if(n>=t.x&&t.x>=c&&n!==t.x&&zp(r<l?n:a,r,c,l,r<l?a:n,r,t.x,t.y)){let p=Math.abs(r-t.y)/(n-t.x);fa(t,i)&&(p<h||p===h&&(t.x>s.x||t.x===s.x&&Eg(s,t)))&&(s=t,h=p)}t=t.next}while(t!==o);return s}function Eg(i,e){return Xt(i.prev,i,e.prev)<0&&Xt(e.next,i,i.next)<0}function wg(i,e,t,n){let r=i;do r.z===0&&(r.z=Nc(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Ag(r)}function Ag(i){let e,t=1;do{let n,r=i;i=null;let s=null;for(e=0;r;){e++;let a=r,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||r.z<=a.z)?(n=r,r=r.nextZ,o--):(n=a,a=a.nextZ,c--),s?s.nextZ=n:i=n,n.prevZ=s,s=n;r=a}s.nextZ=null,t*=2}while(e>1);return i}function Nc(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Rg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function zp(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Ws(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&zp(i,e,t,n,r,s,a,o)}function Cg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Ig(i,e)&&(fa(i,e)&&fa(e,i)&&Pg(i,e)&&(Xt(i.prev,i,e.prev)||Xt(i,e.prev,e))||ps(i,e)&&Xt(i.prev,i,i.next)>0&&Xt(e.prev,e,e.next)>0)}function Xt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ps(i,e){return i.x===e.x&&i.y===e.y}function Vp(i,e,t,n){let r=uo(Xt(i,e,t)),s=uo(Xt(i,e,n)),a=uo(Xt(t,n,i)),o=uo(Xt(t,n,e));return r!==s&&a!==o||!(r!==0||!ho(i,t,e))||!(s!==0||!ho(i,n,e))||!(a!==0||!ho(t,i,n))||!(o!==0||!ho(t,e,n))}function ho(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function uo(i){return i>0?1:i<0?-1:0}function Ig(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Vp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function fa(i,e){return Xt(i.prev,i,i.next)<0?Xt(i,e,i.next)>=0&&Xt(i,i.prev,e)>=0:Xt(i,e,i.prev)<0||Xt(i,i.next,e)<0}function Pg(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function kp(i,e){let t=Dc(i.i,i.x,i.y),n=Dc(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Fd(i,e,t,n){let r=Dc(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function ma(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Dc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Lg(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var Uc=class{static triangulate(e,t,n=2){return gg(e,t,n)}},Si=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Bd(e),zd(n,e);let a=e.length;t.forEach(Bd);for(let c=0;c<t.length;c++)r.push(a),a+=t[c].length,zd(n,t[c]);let o=Uc.triangulate(n,r);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function Bd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function zd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Fo=class i extends vt{constructor(e=new da([new ve(.5,.5),new ve(-.5,.5),new ve(-.5,-.5),new ve(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:u-.1,f=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Ng,M,T,b,S,I,U=!1;if(g){M=g.getSpacedPoints(h),U=!0,d=!1;let P=!!g.isCatmullRomCurve3&&g.closed;T=g.computeFrenetFrames(h,P),b=new C,S=new C,I=new C}d||(v=0,u=0,m=0,f=0);let V=o.extractPoints(l),N=V.shape,q=V.holes;if(!Si.isClockWise(N)){N=N.reverse();for(let P=0,O=q.length;P<O;P++){let x=q[P];Si.isClockWise(x)&&(q[P]=x.reverse())}}function B(P){let O=10000000000000001e-36,x=P[0];for(let z=1;z<=P.length;z++){let D=z%P.length,R=P[D],X=R.x-x.x,Y=R.y-x.y,K=X*X+Y*Y,me=Math.max(Math.abs(R.x),Math.abs(R.y),Math.abs(x.x),Math.abs(x.y));K<=O*me*me?(P.splice(D,1),z--):x=R}}B(N),q.forEach(B);let Z=q.length,Q=N;for(let P=0;P<Z;P++){let O=q[P];N=N.concat(O)}function se(P,O,x){return O||Ze("ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(O,x)}let W=N.length;function k(P,O,x){let z,D,R,X=P.x-O.x,Y=P.y-O.y,K=x.x-P.x,me=x.y-P.y,Ue=X*X+Y*Y,Ne=X*me-Y*K;if(Math.abs(Ne)>Number.EPSILON){let xe=Math.sqrt(Ue),Ge=Math.sqrt(K*K+me*me),de=O.x-Y/xe,ye=O.y+X/xe,_e=((x.x-me/Ge-de)*me-(x.y+K/Ge-ye)*K)/(X*me-Y*K);z=de+X*_e-P.x,D=ye+Y*_e-P.y;let oe=z*z+D*D;if(oe<=2)return new ve(z,D);R=Math.sqrt(oe/2)}else{let xe=!1;X>Number.EPSILON?K>Number.EPSILON&&(xe=!0):X<-Number.EPSILON?K<-Number.EPSILON&&(xe=!0):Math.sign(Y)===Math.sign(me)&&(xe=!0),xe?(z=-Y,D=X,R=Math.sqrt(Ue)):(z=X,D=Y,R=Math.sqrt(Ue/2))}return new ve(z/R,D/R)}let $=[];for(let P=0,O=Q.length,x=O-1,z=P+1;P<O;P++,x++,z++)x===O&&(x=0),z===O&&(z=0),$[P]=k(Q[P],Q[x],Q[z]);let ue=[],ce,re,Se=$.concat();for(let P=0,O=Z;P<O;P++){let x=q[P];ce=[];for(let z=0,D=x.length,R=D-1,X=z+1;z<D;z++,R++,X++)R===D&&(R=0),X===D&&(X=0),ce[z]=k(x[z],x[R],x[X]);ue.push(ce),Se=Se.concat(ce)}if(v===0)re=Si.triangulateShape(Q,q);else{let P=[],O=[];for(let x=0;x<v;x++){let z=x/v,D=u*Math.cos(z*Math.PI/2),R=m*Math.sin(z*Math.PI/2)+f;for(let X=0,Y=Q.length;X<Y;X++){let K=se(Q[X],$[X],R);fe(K.x,K.y,-D),z===0&&P.push(K)}for(let X=0,Y=Z;X<Y;X++){let K=q[X];ce=ue[X];let me=[];for(let Ue=0,Ne=K.length;Ue<Ne;Ue++){let xe=se(K[Ue],ce[Ue],R);fe(xe.x,xe.y,-D),z===0&&me.push(xe)}z===0&&O.push(me)}}re=Si.triangulateShape(P,O)}let pe=re.length,le=m+f;for(let P=0;P<W;P++){let O=d?se(N[P],Se[P],le):N[P];U?(S.copy(T.normals[0]).multiplyScalar(O.x),b.copy(T.binormals[0]).multiplyScalar(O.y),I.copy(M[0]).add(S).add(b),fe(I.x,I.y,I.z)):fe(O.x,O.y,0)}for(let P=1;P<=h;P++)for(let O=0;O<W;O++){let x=d?se(N[O],Se[O],le):N[O];U?(S.copy(T.normals[P]).multiplyScalar(x.x),b.copy(T.binormals[P]).multiplyScalar(x.y),I.copy(M[P]).add(S).add(b),fe(I.x,I.y,I.z)):fe(x.x,x.y,p/h*P)}for(let P=v-1;P>=0;P--){let O=P/v,x=u*Math.cos(O*Math.PI/2),z=m*Math.sin(O*Math.PI/2)+f;for(let D=0,R=Q.length;D<R;D++){let X=se(Q[D],$[D],z);fe(X.x,X.y,p+x)}for(let D=0,R=q.length;D<R;D++){let X=q[D];ce=ue[D];for(let Y=0,K=X.length;Y<K;Y++){let me=se(X[Y],ce[Y],z);U?fe(me.x,me.y+M[h-1].y,M[h-1].x+x):fe(me.x,me.y,p+x)}}}function ie(P,O){let x=P.length;for(;--x>=0;){let z=x,D=x-1;D<0&&(D=P.length-1);for(let R=0,X=h+2*v;R<X;R++){let Y=W*R,K=W*(R+1);Ee(O+z+Y,O+D+Y,O+D+K,O+z+K)}}}function fe(P,O,x){c.push(P),c.push(O),c.push(x)}function Te(P,O,x){A(P),A(O),A(x);let z=r.length/3,D=_.generateTopUV(n,r,z-3,z-2,z-1);E(D[0]),E(D[1]),E(D[2])}function Ee(P,O,x,z){A(P),A(O),A(z),A(O),A(x),A(z);let D=r.length/3,R=_.generateSideWallUV(n,r,D-6,D-3,D-2,D-1);E(R[0]),E(R[1]),E(R[3]),E(R[1]),E(R[2]),E(R[3])}function A(P){r.push(c[3*P+0]),r.push(c[3*P+1]),r.push(c[3*P+2])}function E(P){s.push(P.x),s.push(P.y)}(function(){let P=r.length/3;if(d){let O=0,x=W*O;for(let z=0;z<pe;z++){let D=re[z];Te(D[2]+x,D[1]+x,D[0]+x)}O=h+2*v,x=W*O;for(let z=0;z<pe;z++){let D=re[z];Te(D[0]+x,D[1]+x,D[2]+x)}}else{for(let O=0;O<pe;O++){let x=re[O];Te(x[2],x[1],x[0])}for(let O=0;O<pe;O++){let x=re[O];Te(x[0]+W*h,x[1]+W*h,x[2]+W*h)}}n.addGroup(P,r.length/3-P,0)})(),(function(){let P=r.length/3,O=0;ie(Q,O),O+=Q.length;for(let x=0,z=q.length;x<z;x++){let D=q[x];ie(D,O),O+=D.length}n.addGroup(P,r.length/3-P,1)})()}this.setAttribute("position",new We(r,3)),this.setAttribute("uv",new We(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return Dg(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Uo[r.type]().fromJSON(r)),new i(n,e.options)}},Ng={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*r],h=e[3*r+1];return[new ve(s,a),new ve(o,c),new ve(l,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],p=e[3*n+2],d=e[3*r],u=e[3*r+1],m=e[3*r+2],f=e[3*s],v=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new ve(a,1-c),new ve(l,1-p),new ve(d,1-m),new ve(f,1-g)]:[new ve(o,1-c),new ve(h,1-p),new ve(u,1-m),new ve(v,1-g)]}};function Dg(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Bo=class i extends ur{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},zo=class i extends vt{constructor(e=[new ve(0,-.5),new ve(.5,0),new ve(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=ft(r,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,p=new C,d=new ve,u=new C,m=new C,f=new C,v=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,f.copy(u),u.normalize(),c.push(u.x,u.y,u.z);break;case e.length-1:c.push(f.x,f.y,f.z);break;default:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,m.copy(u),u.x+=f.x,u.y+=f.y,u.z+=f.z,u.normalize(),c.push(u.x,u.y,u.z),f.copy(m)}for(let _=0;_<=t;_++){let M=n+_*h*r,T=Math.sin(M),b=Math.cos(M);for(let S=0;S<=e.length-1;S++){p.x=e[S].x*T,p.y=e[S].y,p.z=e[S].x*b,a.push(p.x,p.y,p.z),d.x=_/t,d.y=S/(e.length-1),o.push(d.x,d.y);let I=c[3*S+0]*T,U=c[3*S+1],V=c[3*S+0]*b;l.push(I,U,V)}}for(let _=0;_<t;_++)for(let M=0;M<e.length-1;M++){let T=M+_*e.length,b=T,S=T+e.length,I=T+e.length+1,U=T+1;s.push(b,S,U),s.push(I,U,S)}this.setIndex(s),this.setAttribute("position",new We(a,3)),this.setAttribute("uv",new We(o,2)),this.setAttribute("normal",new We(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Vo=class i extends ur{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},fs=class i extends vt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,h=c+1,p=e/o,d=t/c,u=[],m=[],f=[],v=[];for(let g=0;g<h;g++){let _=g*d-a;for(let M=0;M<l;M++){let T=M*p-s;m.push(T,-_,0),f.push(0,0,1),v.push(M/o),v.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let M=_+l*g,T=_+l*(g+1),b=_+1+l*(g+1),S=_+1+l*g;u.push(M,T,S),u.push(T,b,S)}this.setIndex(u),this.setAttribute("position",new We(m,3)),this.setAttribute("normal",new We(f,3)),this.setAttribute("uv",new We(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},ko=class i extends vt{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],p=e,d=(t-e)/(r=Math.max(1,r)),u=new C,m=new ve;for(let f=0;f<=r;f++){for(let v=0;v<=n;v++){let g=s+v/n*a;u.x=p*Math.cos(g),u.y=p*Math.sin(g),c.push(u.x,u.y,u.z),l.push(0,0,1),m.x=(u.x/t+1)/2,m.y=(u.y/t+1)/2,h.push(m.x,m.y)}p+=d}for(let f=0;f<r;f++){let v=f*(n+1);for(let g=0;g<n;g++){let _=g+v,M=_,T=_+n+1,b=_+n+2,S=_+1;o.push(M,T,S),o.push(T,b,S)}}this.setIndex(o),this.setAttribute("position",new We(c,3)),this.setAttribute("normal",new We(l,3)),this.setAttribute("uv",new We(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Go=class i extends vt{constructor(e=new da([new ve(0,.5),new ve(-.5,-.5),new ve(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let p=r.length/3,d=h.extractPoints(t),u=d.shape,m=d.holes;Si.isClockWise(u)===!1&&(u=u.reverse());for(let v=0,g=m.length;v<g;v++){let _=m[v];Si.isClockWise(_)===!0&&(m[v]=_.reverse())}let f=Si.triangulateShape(u,m);for(let v=0,g=m.length;v<g;v++){let _=m[v];u=u.concat(_)}for(let v=0,g=u.length;v<g;v++){let _=u[v];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let v=0,g=f.length;v<g;v++){let _=f[v],M=_[0]+p,T=_[1]+p,b=_[2]+p;n.push(M,T,b),c+=3}}this.setIndex(n),this.setAttribute("position",new We(r,3)),this.setAttribute("normal",new We(s,3)),this.setAttribute("uv",new We(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return Ug(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function Ug(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var ms=class i extends vt{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],p=new C,d=new C,u=[],m=[],f=[],v=[];for(let g=0;g<=n;g++){let _=[],M=g/n,T=a+M*o,b=e*Math.cos(T),S=Math.sqrt(e*e-b*b),I=0;g===0&&a===0?I=.5/t:g===n&&c===Math.PI&&(I=-.5/t);for(let U=0;U<=t;U++){let V=U/t,N=r+V*s;p.x=-S*Math.cos(N),p.y=b,p.z=S*Math.sin(N),m.push(p.x,p.y,p.z),d.copy(p).normalize(),f.push(d.x,d.y,d.z),v.push(V+I,1-M),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let M=h[g][_+1],T=h[g][_],b=h[g+1][_],S=h[g+1][_+1];(g!==0||a>0)&&u.push(M,T,S),(g!==n-1||c<Math.PI)&&u.push(T,b,S)}this.setIndex(u),this.setAttribute("position",new We(m,3)),this.setAttribute("normal",new We(f,3)),this.setAttribute("uv",new We(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Ho=class i extends ur{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Wo=class i extends vt{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI,a=0,o=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let c=[],l=[],h=[],p=[],d=new C,u=new C,m=new C;for(let f=0;f<=n;f++){let v=a+f/n*o;for(let g=0;g<=r;g++){let _=g/r*s;u.x=(e+t*Math.cos(v))*Math.cos(_),u.y=(e+t*Math.cos(v))*Math.sin(_),u.z=t*Math.sin(v),l.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),m.subVectors(u,d).normalize(),h.push(m.x,m.y,m.z),p.push(g/r),p.push(f/n)}}for(let f=1;f<=n;f++)for(let v=1;v<=r;v++){let g=(r+1)*f+v-1,_=(r+1)*(f-1)+v-1,M=(r+1)*(f-1)+v,T=(r+1)*f+v;c.push(g,_,T),c.push(_,M,T)}this.setIndex(c),this.setAttribute("position",new We(l,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},Xo=class i extends vt{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],c=[],l=[],h=[],p=new C,d=new C,u=new C,m=new C,f=new C,v=new C,g=new C;for(let M=0;M<=n;++M){let T=M/n*s*Math.PI*2;_(T,s,a,e,u),_(T+.01,s,a,e,m),v.subVectors(m,u),g.addVectors(m,u),f.crossVectors(v,g),g.crossVectors(f,v),f.normalize(),g.normalize();for(let b=0;b<=r;++b){let S=b/r*Math.PI*2,I=-t*Math.cos(S),U=t*Math.sin(S);p.x=u.x+(I*g.x+U*f.x),p.y=u.y+(I*g.y+U*f.y),p.z=u.z+(I*g.z+U*f.z),c.push(p.x,p.y,p.z),d.subVectors(p,u).normalize(),l.push(d.x,d.y,d.z),h.push(M/n),h.push(b/r)}}for(let M=1;M<=n;M++)for(let T=1;T<=r;T++){let b=(r+1)*(M-1)+(T-1),S=(r+1)*M+(T-1),I=(r+1)*M+T,U=(r+1)*(M-1)+T;o.push(b,S,U),o.push(S,I,U)}function _(M,T,b,S,I){let U=Math.cos(M),V=Math.sin(M),N=b/T*M,q=Math.cos(N);I.x=S*(2+q)*.5*U,I.y=S*(2+q)*V*.5,I.z=S*Math.sin(N)*.5}this.setIndex(o),this.setAttribute("position",new We(c,3)),this.setAttribute("normal",new We(l,3)),this.setAttribute("uv",new We(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},qo=class i extends vt{constructor(e=new ca(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new C,c=new C,l=new ve,h=new C,p=[],d=[],u=[],m=[];function f(v){h=e.getPointAt(v/t,h);let g=a.normals[v],_=a.binormals[v];for(let M=0;M<=r;M++){let T=M/r*Math.PI*2,b=Math.sin(T),S=-Math.cos(T);c.x=S*g.x+b*_.x,c.y=S*g.y+b*_.y,c.z=S*g.z+b*_.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,p.push(o.x,o.y,o.z)}}(function(){for(let v=0;v<t;v++)f(v);f(s===!1?t:0),(function(){for(let v=0;v<=t;v++)for(let g=0;g<=r;g++)l.x=v/t,l.y=g/r,u.push(l.x,l.y)})(),(function(){for(let v=1;v<=t;v++)for(let g=1;g<=r;g++){let _=(r+1)*(v-1)+(g-1),M=(r+1)*v+(g-1),T=(r+1)*v+g,b=(r+1)*(v-1)+g;m.push(_,M,b),m.push(M,T,b)}})()})(),this.setIndex(m),this.setAttribute("position",new We(p,3)),this.setAttribute("normal",new We(d,3)),this.setAttribute("uv",new We(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Uo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},jo=class extends vt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new C,s=new C;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let p=c[l],d=p.start;for(let u=d,m=d+p.count;u<m;u+=3)for(let f=0;f<3;f++){let v=o.getX(u+f),g=o.getX(u+(f+1)%3);r.fromBufferAttribute(a,v),s.fromBufferAttribute(a,g),Vd(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,p=3*o+(l+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,p),Vd(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new We(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Vd(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var j1=Object.freeze({__proto__:null,BoxGeometry:Cr,CapsuleGeometry:wo,CircleGeometry:Ao,ConeGeometry:Ro,CylinderGeometry:sa,DodecahedronGeometry:Co,EdgesGeometry:Io,ExtrudeGeometry:Fo,IcosahedronGeometry:Bo,LatheGeometry:zo,OctahedronGeometry:Vo,PlaneGeometry:fs,PolyhedronGeometry:ur,RingGeometry:ko,ShapeGeometry:Go,SphereGeometry:ms,TetrahedronGeometry:Ho,TorusGeometry:Wo,TorusKnotGeometry:Xo,TubeGeometry:qo,WireframeGeometry:jo});function Fr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(kd(r))r.isRenderTargetTexture?(je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(kd(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Mn(i){let e={};for(let t=0;t<i.length;t++){let n=Fr(i[t]);for(let r in n)e[r]=n[r]}return e}function kd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Og(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Wh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}var Gp={clone:Fr,merge:Mn},Fg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Zt=class extends bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fg,this.fragmentShader=Bg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fr(e.uniforms),this.uniformsGroups=Og(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new it().setHex(r.value);break;case"v2":this.uniforms[n].value=new ve().fromArray(r.value);break;case"v3":this.uniforms[n].value=new C().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Dt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new tt().fromArray(r.value);break;case"m4":this.uniforms[n].value=new rt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Yo=class extends Zt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var $o=class extends bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Zo=class extends bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var ga=class extends Ar{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ss(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function Ic(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var dr=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Jo=class extends dr{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,o=2*t-n;break;case 2402:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+r[1]-r[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(n-t)/(r-t),f=m*m,v=f*m,g=-d*v+2*d*f-d*m,_=(1+d)*v+(-1.5-2*d)*f+(-.5+d)*m+1,M=(-1-u)*v+(1.5+u)*f+.5*m,T=u*v-u*f;for(let b=0;b!==o;++b)s[b]=g*a[h+b]+_*a[l+b]+M*a[c+b]+T*a[p+b];return s}},Ko=class extends dr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(r-t),p=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*p+a[c+d]*h;return s}},Qo=class extends dr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},el=class extends dr{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let m=(n-t)/(r-t),f=1-m;for(let v=0;v!==o;++v)s[v]=a[l+v]*f+a[c+v]*m;return s}let d=2*o,u=e-1;for(let m=0;m!==o;++m){let f=a[l+m],v=a[c+m],g=u*d+2*m,_=p[g],M=p[g+1],T=e*d+2*m,b=h[T],S=h[T+1],I=Vg(n,t,_,b,r);s[m]=Hp(I,f,M,S,v)}return s}};function Hp(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function zg(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function Vg(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=Hp(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let c=zg(s,e,t,n,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}var Xn=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ss(t,this.TimeBufferType),this.values=ss(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ss(e.times,Array),values:ss(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),Ic(e.settings)&&(n.settings={inTangents:ss(e.settings.inTangents,Array),outTangents:ss(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Qo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ko(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new el(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return je("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ic(this.settings)&&(Gd(this.settings.inTangents,e),Gd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Ze("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ze("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ze("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(r!==void 0&&Gm(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){Ze("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===2302,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(r)c=!0;else{let h=o*n,p=h-n,d=h+n;for(let u=0;u!==n;++u){let m=t[h+u];if(m!==t[p+u]||m!==t[d+u]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,p=a*n;for(let d=0;d!==n;++d)t[p+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,Ic(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Gd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Xn.prototype.ValueTypeName="",Xn.prototype.TimeBufferType=Float32Array,Xn.prototype.ValueBufferType=Float32Array,Xn.prototype.DefaultInterpolation=2301;var ar=class extends Xn{constructor(e,t,n){super(e,t,n)}};ar.prototype.ValueTypeName="bool",ar.prototype.ValueBufferType=Array,ar.prototype.DefaultInterpolation=2300,ar.prototype.InterpolantFactoryMethodLinear=void 0,ar.prototype.InterpolantFactoryMethodSmooth=void 0;var tl=class extends Xn{constructor(e,t,n,r){super(e,t,n,r)}};tl.prototype.ValueTypeName="color";var nl=class extends Xn{constructor(e,t,n,r){super(e,t,n,r)}};nl.prototype.ValueTypeName="number";var il=class extends dr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(r-t),l=e*o;for(let h=l+o;l!==h;l+=4)Jn.slerpFlat(s,0,a,l-o,a,l,c);return s}},_a=class extends Xn{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new il(this.times,this.values,this.getValueSize(),e)}};_a.prototype.ValueTypeName="quaternion",_a.prototype.InterpolantFactoryMethodSmooth=void 0;var or=class extends Xn{constructor(e,t,n){super(e,t,n)}};or.prototype.ValueTypeName="string",or.prototype.ValueBufferType=Array,or.prototype.DefaultInterpolation=2300,or.prototype.InterpolantFactoryMethodLinear=void 0,or.prototype.InterpolantFactoryMethodSmooth=void 0;var rl=class extends Xn{constructor(e,t,n,r){super(e,t,n,r)}};rl.prototype.ValueTypeName="vector";var sl=class{constructor(e,t,n){let r=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){c++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,c),o===c&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,p){return l.push(h,p),this},this.removeHandler=function(h){let p=l.indexOf(h);return p!==-1&&l.splice(p,2),this},this.getHandler=function(h){for(let p=0,d=l.length;p<d;p+=2){let u=l[p],m=l[p+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Wp=new sl,al=class{constructor(e){this.manager=e!==void 0?e:Wp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};al.DEFAULT_MATERIAL_NAME="__DEFAULT";var Y1=new rt,$1=new C,Z1=new C;var po=new C,fo=new Jn,vi=new C,gs=class extends Nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(po,fo,vi),vi.x===1&&vi.y===1&&vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(po,fo,vi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(po,fo,vi),vi.x===1&&vi.y===1&&vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(po,fo,vi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},sr=new C,Hd=new ve,Wd=new ve,vn=class extends gs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*go*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*mo*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*go*Math.atan(Math.tan(.5*mo*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(sr.x,sr.y).multiplyScalar(-e/sr.z),sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(sr.x,sr.y).multiplyScalar(-e/sr.z)}getViewSize(e,t){return this.getViewBounds(e,Hd,Wd),t.subVectors(Wd,Hd)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*mo*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var va=class extends gs{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var J1=new rt,K1=new rt,Q1=new rt;var ol=class extends Nn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new vn(-90,1,e,t);r.layers=this.layers,this.add(r);let s=new vn(-90,1,e,t);s.layers=this.layers,this.add(s);let a=new vn(-90,1,e,t);a.layers=this.layers,this.add(a);let o=new vn(-90,1,e,t);o.layers=this.layers,this.add(o);let c=new vn(-90,1,e,t);c.layers=this.layers,this.add(c);let l=new vn(-90,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==2001)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;v=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=f,e.setRenderTarget(n,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,d,u),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ll=class extends vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},xa=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=kg.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function kg(){this._document.hidden===!1&&this.reset()}var eS=new C,tS=new Jn,nS=new C,iS=new C,rS=new C;var sS=new C,aS=new Jn,oS=new C,lS=new C;var Gg=new RegExp("[\\[\\]\\.:\\/]","g"),Xh="[^\\[\\]\\.:\\/]",Hg="[^"+"\\[\\]\\.:\\/".replace("\\.","")+"]",Wg=/((?:WC+[\/:])*)/.source.replace("WC",Xh),Xg=/(WCOD+)?/.source.replace("WCOD",Hg),qg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xh),jg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xh),Yg=new RegExp("^"+Wg+Xg+qg+jg+"$"),$g=["material","materials","bones","map"],Oc=class{constructor(e,t,n){let r=n||kt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},kt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Gg,"")}static parseTrackName(e){let t=Yg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);$g.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void je("PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void Ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void Ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void Ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void Ze("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void Ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[r];if(a===void 0)return void Ze("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+r+" but it wasn't found.",e);let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};kt.Composite=Oc,kt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},kt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},kt.prototype.GetterByBindingType=[kt.prototype._getValue_direct,kt.prototype._getValue_array,kt.prototype._getValue_arrayElement,kt.prototype._getValue_toArray],kt.prototype.SetterByBindingTypeAndVersioning=[[kt.prototype._setValue_direct,kt.prototype._setValue_direct_setNeedsUpdate,kt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_array,kt.prototype._setValue_array_setNeedsUpdate,kt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_arrayElement,kt.prototype._setValue_arrayElement_setNeedsUpdate,kt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_fromArray,kt.prototype._setValue_fromArray_setNeedsUpdate,kt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var cS=new Float32Array(1);var hS=new rt;var Jh=class Jh{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};Jh.prototype.isMatrix2=!0;var Fc=Jh,uS=new ve;var dS=new C,pS=new C,fS=new C,mS=new C,gS=new C,_S=new C,vS=new C;var xS=new C;var yS=new C,SS=new rt,MS=new rt;var bS=new C,TS=new it,ES=new it;var wS=new C,AS=new C,RS=new C;var CS=new C,IS=new gs;var PS=new li;var LS=new C;function qh(i,e,t,n){let r=Zg(n);switch(t){case 1021:return i*e;case 1028:case 1029:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case 1023:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:case 37496:case 37490:case 37491:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Zg(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}})),typeof window<"u"&&(window.__THREE__?je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function pf(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Kg(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=i.createBuffer(),p;if(i.bindBuffer(a,h),i.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)p=i.HALF_FLOAT;else if(o instanceof Uint16Array)p=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)p=i.SHORT;else if(o instanceof Uint32Array)p=i.UNSIGNED_INT;else if(o instanceof Int32Array)p=i.INT;else if(o instanceof Int8Array)p=i.BYTE;else if(o instanceof Uint8Array)p=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);p=i.UNSIGNED_BYTE}return{buffer:h,type:p,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(i.bindBuffer(o,s),l.length===0)i.bufferSubData(o,0,c);else{l.sort((p,d)=>p.start-d.start);let h=0;for(let p=1;p<l.length;p++){let d=l[h],u=l[p];u.start<=d.start+d.count+1?d.count=Math.max(d.count,u.start+u.count-d.start):(++h,l[h]=u)}l.length=h+1;for(let p=0,d=l.length;p<d;p++){let u=l[p];i.bufferSubData(o,u.start*c.BYTES_PER_ELEMENT,c,u.start,u.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var Qg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,e0=`#ifdef USE_ALPHAHASH
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
#endif`,t0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,n0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,i0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,r0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,s0=`#ifdef USE_AOMAP
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
#endif`,a0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,o0=`#ifdef USE_BATCHING
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
#endif`,l0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,c0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,h0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,u0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,d0=`#ifdef USE_IRIDESCENCE
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
#endif`,p0=`#ifdef USE_BUMPMAP
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
#endif`,f0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,m0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,g0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,v0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,x0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,y0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,S0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,M0=`#define PI 3.141592653589793
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
} // validated`,b0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,T0=`vec3 transformedNormal = objectNormal;
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
#endif`,E0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,w0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,A0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,R0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,C0="gl_FragColor = linearToOutputTexel( gl_FragColor );",I0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,P0=`#ifdef USE_ENVMAP
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
#endif`,L0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,N0=`#ifdef USE_ENVMAP
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
#endif`,D0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,U0=`#ifdef USE_ENVMAP
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
#endif`,O0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,F0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,B0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,z0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,V0=`#ifdef USE_GRADIENTMAP
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
}`,k0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,G0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,H0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,W0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,X0=`#ifdef USE_ENVMAP
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
#endif`,q0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,j0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Y0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Z0=`PhysicalMaterial material;
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
#endif`,J0=`uniform sampler2D dfgLUT;
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
}`,K0=`
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
#endif`,Q0=`#if defined( RE_IndirectDiffuse )
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
#endif`,e_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,t_=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,n_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,i_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,s_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,a_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,o_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,l_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,c_=`#if defined( USE_POINTS_UV )
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
#endif`,h_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,u_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,d_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,p_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,f_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,m_=`#ifdef USE_MORPHTARGETS
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
#endif`,g_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,__=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,v_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,x_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,y_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,S_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,M_=`#ifdef USE_NORMALMAP
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
#endif`,b_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,T_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,E_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,w_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,A_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,R_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,C_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,I_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,P_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,L_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,N_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,D_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,U_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,O_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,F_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,B_=`float getShadowMask() {
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
}`,z_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,V_=`#ifdef USE_SKINNING
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
#endif`,k_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,G_=`#ifdef USE_SKINNING
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
#endif`,H_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,W_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,X_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,q_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,j_=`#ifdef USE_TRANSMISSION
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
#endif`,Y_=`#ifdef USE_TRANSMISSION
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
#endif`,$_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,J_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,K_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Q_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ev=`uniform sampler2D t2D;
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
}`,tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sv=`#include <common>
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
}`,av=`#if DEPTH_PACKING == 3200
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
}`,ov=`#define DISTANCE
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
}`,lv=`#define DISTANCE
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
}`,cv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uv=`uniform float scale;
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
}`,dv=`uniform vec3 diffuse;
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
}`,pv=`#include <common>
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
}`,fv=`uniform vec3 diffuse;
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
}`,mv=`#define LAMBERT
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
}`,gv=`#define LAMBERT
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
}`,_v=`#define MATCAP
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
}`,vv=`#define MATCAP
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
}`,xv=`#define NORMAL
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
}`,yv=`#define NORMAL
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
}`,Sv=`#define PHONG
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
}`,Mv=`#define PHONG
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
}`,bv=`#define STANDARD
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
}`,Tv=`#define STANDARD
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
}`,Ev=`#define TOON
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
}`,wv=`#define TOON
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
}`,Av=`uniform float size;
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
}`,Rv=`uniform vec3 diffuse;
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
}`,Cv=`#include <common>
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
}`,Iv=`uniform vec3 color;
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
}`,Pv=`uniform float rotation;
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
}`,Lv=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:Qg,alphahash_pars_fragment:e0,alphamap_fragment:t0,alphamap_pars_fragment:n0,alphatest_fragment:i0,alphatest_pars_fragment:r0,aomap_fragment:s0,aomap_pars_fragment:a0,batching_pars_vertex:o0,batching_vertex:l0,begin_vertex:c0,beginnormal_vertex:h0,bsdfs:u0,iridescence_fragment:d0,bumpmap_pars_fragment:p0,clipping_planes_fragment:f0,clipping_planes_pars_fragment:m0,clipping_planes_pars_vertex:g0,clipping_planes_vertex:_0,color_fragment:v0,color_pars_fragment:x0,color_pars_vertex:y0,color_vertex:S0,common:M0,cube_uv_reflection_fragment:b0,defaultnormal_vertex:T0,displacementmap_pars_vertex:E0,displacementmap_vertex:w0,emissivemap_fragment:A0,emissivemap_pars_fragment:R0,colorspace_fragment:C0,colorspace_pars_fragment:I0,envmap_fragment:P0,envmap_common_pars_fragment:L0,envmap_pars_fragment:N0,envmap_pars_vertex:D0,envmap_physical_pars_fragment:X0,envmap_vertex:U0,fog_vertex:O0,fog_pars_vertex:F0,fog_fragment:B0,fog_pars_fragment:z0,gradientmap_pars_fragment:V0,lightmap_pars_fragment:k0,lights_lambert_fragment:G0,lights_lambert_pars_fragment:H0,lights_pars_begin:W0,lights_toon_fragment:q0,lights_toon_pars_fragment:j0,lights_phong_fragment:Y0,lights_phong_pars_fragment:$0,lights_physical_fragment:Z0,lights_physical_pars_fragment:J0,lights_fragment_begin:K0,lights_fragment_maps:Q0,lights_fragment_end:e_,lightprobes_pars_fragment:t_,logdepthbuf_fragment:n_,logdepthbuf_pars_fragment:i_,logdepthbuf_pars_vertex:r_,logdepthbuf_vertex:s_,map_fragment:a_,map_pars_fragment:o_,map_particle_fragment:l_,map_particle_pars_fragment:c_,metalnessmap_fragment:h_,metalnessmap_pars_fragment:u_,morphinstance_vertex:d_,morphcolor_vertex:p_,morphnormal_vertex:f_,morphtarget_pars_vertex:m_,morphtarget_vertex:g_,normal_fragment_begin:__,normal_fragment_maps:v_,normal_pars_fragment:x_,normal_pars_vertex:y_,normal_vertex:S_,normalmap_pars_fragment:M_,clearcoat_normal_fragment_begin:b_,clearcoat_normal_fragment_maps:T_,clearcoat_pars_fragment:E_,iridescence_pars_fragment:w_,opaque_fragment:A_,packing:R_,premultiplied_alpha_fragment:C_,project_vertex:I_,dithering_fragment:P_,dithering_pars_fragment:L_,roughnessmap_fragment:N_,roughnessmap_pars_fragment:D_,shadowmap_pars_fragment:U_,shadowmap_pars_vertex:O_,shadowmap_vertex:F_,shadowmask_pars_fragment:B_,skinbase_vertex:z_,skinning_pars_vertex:V_,skinning_vertex:k_,skinnormal_vertex:G_,specularmap_fragment:H_,specularmap_pars_fragment:W_,tonemapping_fragment:X_,tonemapping_pars_fragment:q_,transmission_fragment:j_,transmission_pars_fragment:Y_,uv_pars_fragment:$_,uv_pars_vertex:Z_,uv_vertex:J_,worldpos_vertex:K_,background_vert:Q_,background_frag:ev,backgroundCube_vert:tv,backgroundCube_frag:nv,cube_vert:iv,cube_frag:rv,depth_vert:sv,depth_frag:av,distance_vert:ov,distance_frag:lv,equirect_vert:cv,equirect_frag:hv,linedashed_vert:uv,linedashed_frag:dv,meshbasic_vert:pv,meshbasic_frag:fv,meshlambert_vert:mv,meshlambert_frag:gv,meshmatcap_vert:_v,meshmatcap_frag:vv,meshnormal_vert:xv,meshnormal_frag:yv,meshphong_vert:Sv,meshphong_frag:Mv,meshphysical_vert:bv,meshphysical_frag:Tv,meshtoon_vert:Ev,meshtoon_frag:wv,points_vert:Av,points_frag:Rv,shadow_vert:Cv,shadow_frag:Iv,sprite_vert:Pv,sprite_frag:Lv},Ae={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},Ci={basic:{uniforms:Mn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:Mn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:Mn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:Mn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:Mn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new it(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:Mn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:Mn([Ae.points,Ae.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:Mn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:Mn([Ae.common,Ae.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:Mn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:Mn([Ae.sprite,Ae.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distance:{uniforms:Mn([Ae.common,Ae.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distance_vert,fragmentShader:lt.distance_frag},shadow:{uniforms:Mn([Ae.lights,Ae.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};Ci.physical={uniforms:Mn([Ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};var El={r:0,b:0,g:0},Nv=new rt,ff=new tt;function Dv(i,e,t,n,r,s){let a=new it(0),o,c,l=r===!0?0:1,h=null,p=0,d=null;function u(f){let v=f.isScene===!0?f.background:null;if(v&&v.isTexture){let g=f.backgroundBlurriness>0;v=e.get(v,g)}return v}function m(f,v){f.getRGB(El,Wh(i)),t.buffers.color.setClear(El.r,El.g,El.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(f,v=1){a.set(f),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,m(a,l)},render:function(f){let v=!1,g=u(f);g===null?m(a,l):g&&g.isColor&&(m(g,1),v=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,s):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,v){let g=u(v);g&&(g.isCubeTexture||g.mapping===Sa)?(c===void 0&&(c=new xn(new Cr(1,1,1),new Zt({name:"BackgroundCubeMaterial",uniforms:Fr(Ci.backgroundCube.uniforms),vertexShader:Ci.backgroundCube.vertexShader,fragmentShader:Ci.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,M,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=g,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Nv.makeRotationFromEuler(v.backgroundRotation)).transpose(),g.isCubeTexture&&g.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ff),c.material.toneMapped=_t.getTransfer(g.colorSpace)!==Ut,h===g&&p===g.version&&d===i.toneMapping||(c.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null)):g&&g.isTexture&&(o===void 0&&(o=new xn(new fs(2,2),new Zt({name:"BackgroundMaterial",uniforms:Fr(Ci.background.uniforms),vertexShader:Ci.background.vertexShader,fragmentShader:Ci.background.fragmentShader,side:vs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=g,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=_t.getTransfer(g.colorSpace)!==Ut,g.matrixAutoUpdate===!0&&g.updateMatrix(),o.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&p===g.version&&d===i.toneMapping||(o.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),o.layers.enableAll(),f.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function Uv(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=l(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function c(g){return i.deleteVertexArray(g)}function l(g){let _=[],M=[],T=[];for(let b=0;b<t;b++)_[b]=0,M[b]=0,T[b]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:M,attributeDivisors:T,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,M=g.length;_<M;_++)g[_]=0}function p(g){d(g,0)}function d(g,_){let M=s.newAttributes,T=s.enabledAttributes,b=s.attributeDivisors;M[g]=1,T[g]===0&&(i.enableVertexAttribArray(g),T[g]=1),b[g]!==_&&(i.vertexAttribDivisor(g,_),b[g]=_)}function u(){let g=s.newAttributes,_=s.enabledAttributes;for(let M=0,T=_.length;M<T;M++)_[M]!==g[M]&&(i.disableVertexAttribArray(M),_[M]=0)}function m(g,_,M,T,b,S,I){I===!0?i.vertexAttribIPointer(g,_,M,b,S):i.vertexAttribPointer(g,_,M,T,b,S)}function f(){v(),a=!0,s!==r&&(s=r,o(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,M,T,b){let S=!1,I=(function(U,V,N,q){let B=q.wireframe===!0,Z=n[V.id];Z===void 0&&(Z={},n[V.id]=Z);let Q=U.isInstancedMesh===!0?U.id:0,se=Z[Q];se===void 0&&(se={},Z[Q]=se);let W=se[N.id];W===void 0&&(W={},se[N.id]=W);let k=W[B];return k===void 0&&(k=l(i.createVertexArray()),W[B]=k),k})(g,T,M,_);s!==I&&(s=I,o(s.object)),S=(function(U,V,N,q){let B=s.attributes,Z=V.attributes,Q=0,se=N.getAttributes();for(let W in se)if(se[W].location>=0){let k=B[W],$=Z[W];if($===void 0&&(W==="instanceMatrix"&&U.instanceMatrix&&($=U.instanceMatrix),W==="instanceColor"&&U.instanceColor&&($=U.instanceColor)),k===void 0||k.attribute!==$||$&&k.data!==$.data)return!0;Q++}return s.attributesNum!==Q||s.index!==q})(g,T,M,b),S&&(function(U,V,N,q){let B={},Z=V.attributes,Q=0,se=N.getAttributes();for(let W in se)if(se[W].location>=0){let k=Z[W];k===void 0&&(W==="instanceMatrix"&&U.instanceMatrix&&(k=U.instanceMatrix),W==="instanceColor"&&U.instanceColor&&(k=U.instanceColor));let $={};$.attribute=k,k&&k.data&&($.data=k.data),B[W]=$,Q++}s.attributes=B,s.attributesNum=Q,s.index=q})(g,T,M,b),b!==null&&e.update(b,i.ELEMENT_ARRAY_BUFFER),(S||a)&&(a=!1,(function(U,V,N,q){h();let B=q.attributes,Z=N.getAttributes(),Q=V.defaultAttributeValues;for(let se in Z){let W=Z[se];if(W.location>=0){let k=B[se];if(k===void 0&&(se==="instanceMatrix"&&U.instanceMatrix&&(k=U.instanceMatrix),se==="instanceColor"&&U.instanceColor&&(k=U.instanceColor)),k!==void 0){let $=k.normalized,ue=k.itemSize,ce=e.get(k);if(ce===void 0)continue;let re=ce.buffer,Se=ce.type,pe=ce.bytesPerElement,le=Se===i.INT||Se===i.UNSIGNED_INT||k.gpuType===th;if(k.isInterleavedBufferAttribute){let ie=k.data,fe=ie.stride,Te=k.offset;if(ie.isInstancedInterleavedBuffer){for(let Ee=0;Ee<W.locationSize;Ee++)d(W.location+Ee,ie.meshPerAttribute);U.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Ee=0;Ee<W.locationSize;Ee++)p(W.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,re);for(let Ee=0;Ee<W.locationSize;Ee++)m(W.location+Ee,ue/W.locationSize,Se,$,fe*pe,(Te+ue/W.locationSize*Ee)*pe,le)}else{if(k.isInstancedBufferAttribute){for(let ie=0;ie<W.locationSize;ie++)d(W.location+ie,k.meshPerAttribute);U.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let ie=0;ie<W.locationSize;ie++)p(W.location+ie);i.bindBuffer(i.ARRAY_BUFFER,re);for(let ie=0;ie<W.locationSize;ie++)m(W.location+ie,ue/W.locationSize,Se,$,ue*pe,ue/W.locationSize*ie*pe,le)}}else if(Q!==void 0){let $=Q[se];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(W.location,$);break;case 3:i.vertexAttrib3fv(W.location,$);break;case 4:i.vertexAttrib4fv(W.location,$);break;default:i.vertexAttrib1fv(W.location,$)}}}}u()})(g,_,M,T),b!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(b).buffer))},reset:f,resetDefaultState:v,dispose:function(){f();for(let g in n){let _=n[g];for(let M in _){let T=_[M];for(let b in T){let S=T[b];for(let I in S)c(S[I].object),delete S[I];delete T[b]}}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let M in _){let T=_[M];for(let b in T){let S=T[b];for(let I in S)c(S[I].object),delete S[I];delete T[b]}}delete n[g.id]},releaseStatesOfObject:function(g){for(let _ in n){let M=n[_],T=g.isInstancedMesh===!0?g.id:0,b=M[T];if(b!==void 0){for(let S in b){let I=b[S];for(let U in I)c(I[U].object),delete I[U];delete b[S]}delete M[T],Object.keys(M).length===0&&delete n[_]}}},releaseStatesOfProgram:function(g){for(let _ in n){let M=n[_];for(let T in M){let b=M[T];if(b[g.id]===void 0)continue;let S=b[g.id];for(let I in S)c(S[I].object),delete S[I];delete b[g.id]}}},initAttributes:h,enableAttribute:p,disableUnusedAttributes:u}}function Ov(i,e,t){let n;this.setMode=function(r){n=r},this.render=function(r,s){i.drawArrays(n,r,s),t.update(s,n,1)},this.renderInstances=function(r,s,a){a!==0&&(i.drawArraysInstanced(n,r,s,a),t.update(s,n,a))},this.renderMultiDraw=function(r,s,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,s,0,a);let o=0;for(let c=0;c<a;c++)o+=s[c];t.update(o,n,1)}}function Fv(i,e,t,n){let r;function s(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(je("WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&l===!1&&je("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let h=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(h){return h===Ai||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let p=h===wi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==di&&h!==Qn&&!p&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:i.getParameter(i.MAX_SAMPLES),samples:i.getParameter(i.SAMPLES)}}function Bv(i){let e=this,t=null,n=0,r=!1,s=!1,a=new oi,o=new tt,c={value:null,needsUpdate:!1};function l(h,p,d,u){let m=h!==null?h.length:0,f=null;if(m!==0){if(f=c.value,u!==!0||f===null){let v=d+4*m,g=p.matrixWorldInverse;o.getNormalMatrix(g),(f===null||f.length<v)&&(f=new Float32Array(v));for(let _=0,M=d;_!==m;++_,M+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(f,M),f[M+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let d=h.length!==0||p||n!==0||r;return r=p,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=l(h,p,0)},this.setState=function(h,p,d){let u=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,v=i.get(h);if(!r||u===null||u.length===0||s&&!f)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,M=v.clippingState||null;c.value=M,M=l(u,p,_,d);for(let T=0;T!==_;++T)M[T]=t[T];v.clippingState=M,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}ff.set(-1,0,0,0,1,0,0,0,1);var Ea=new va,Xp=new it,Kh=null,Qh=0,eu=0,tu=!1,zv=new C,Br=new C,Al=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=zv}=s;Kh=this._renderer.getRenderTarget(),Qh=this._renderer.getActiveCubeFace(),eu=this._renderer.getActiveMipmapLevel(),tu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Kh,Qh,eu),this._renderer.xr.enabled=tu,e.scissorTest=!1,Ms(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ys||e.mapping===Pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kh=this._renderer.getRenderTarget(),Qh=this._renderer.getActiveCubeFace(),eu=this._renderer.getActiveMipmapLevel(),tu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:wi,format:Ai,colorSpace:Ml,depthBuffer:!1},r=qp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qp(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Vv(s)),this._blurMaterial=Gv(s,e,t),this._ggxMaterial=kv(s,e,t)}return r}_compileMaterial(e){let t=new xn(new vt,e);this._renderer.compile(t,Ea)}_sceneToCubeUV(e,t,n,r,s){let a=new vn(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,p=l.toneMapping;l.getClearColor(Xp),l.toneMapping=hi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(r),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xn(new Cr,new na({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,m=!1,f=e.background;f?f.isColor&&(u.color.copy(f),e.background=null,m=!0):(u.color.copy(Xp),m=!0);for(let v=0;v<6;v++){let g=v%3;g===0?(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[v],s.y,s.z)):g===1?(a.up.set(0,0,o[v]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[v],s.z)):(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[v]));let _=this._cubeSize;Ms(r,g*_,v>2?_:0,_,_),l.setRenderTarget(r),m&&l.render(d,a),l.render(e,a)}l.toneMapping=p,l.autoClear=h,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===ys||e.mapping===Pr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jp());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s,s.uniforms.envMap.value=e;let o=this._cubeSize;Ms(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Ea)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-h*h)*(1.25*l),{_lodMax:d}=this,u=this._sizeLods[n],m=3*u*(n>d-4?n-d+4:0),f=4*(this._cubeSize-u);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=d-t,Ms(s,m,f,3*u,2*u),r.setRenderTarget(s),r.render(o,Ea),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=d-n,Ms(e,m,f,3*u,2*u),r.setRenderTarget(e),r.render(o,Ea)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[r];Ms(t,3*h*(r>this._lodMax-4?r-this._lodMax+4:0),4*(this._cubeSize-h),3*h,2*h),a.setRenderTarget(t),a.render(c,Ea)}};function Vv(i){let e=[],t=[],n=i,r=i-4+1+6;for(let s=0;s<r;s++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],p=6,d=6,u=3,m=new Float32Array(u*d*p),f=new Float32Array(u*d*p);for(let g=0;g<p;g++){let _=g%3*2/3-1,M=g>2?0:-1,T=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];m.set(T,u*d*g);for(let b=0;b<d;b++){let S=2*h[2*b]-1,I=2*h[2*b+1]-1;g===0?Br.set(1,I,S):g===1?Br.set(-S,1,-I):g===2?Br.set(-S,I,1):g===3?Br.set(-1,I,-S):g===4?Br.set(-S,-1,I):Br.set(S,I,-1),Br.toArray(f,(g*d+b)*u)}}let v=new vt;v.setAttribute("position",new Tt(m,u)),v.setAttribute("outputDirection",new Tt(f,u)),t.push(new xn(v,null)),n>4&&n--}return{lodMeshes:t,sizeLods:e}}function qp(i,e,t){let n=new Vn(i,e,t);return n.texture.mapping=Sa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ms(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function kv(i,e,t){return new Zt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Il(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Gv(i,e,t){return new Zt({name:"SphericalGaussianBlur",defines:{SAMPLES:20,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Il(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function jp(){return new Zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Il(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Yp(){return new Zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Il(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Rl=class extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ia(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Cr(5,5,5),s=new Zt({name:"CubemapFromEquirect",uniforms:Fr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:yn,blending:Ei});s.uniforms.tEquirect.value=t;let a=new xn(r,s),o=t.minFilter;return t.minFilter===Lr&&(t.minFilter=Sn),new ol(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function Hv(i){let e=new WeakMap,t=new WeakMap,n=null;function r(o,c){return c===ul?o.mapping=ys:c===dl&&(o.mapping=Pr),o}function s(o){let c=o.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(o){let c=o.target;c.removeEventListener("dispose",a);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}return{get:function(o,c=!1){return o==null?null:c?(function(l){if(l&&l.isTexture){let h=l.mapping,p=h===ul||h===dl,d=h===ys||h===Pr;if(p||d){let u=t.get(l),m=u!==void 0?u.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return n===null&&(n=new Al(i)),u=p?n.fromEquirectangular(l,u):n.fromCubemap(l,u),u.texture.pmremVersion=l.pmremVersion,t.set(l,u),u.texture;if(u!==void 0)return u.texture;{let f=l.image;return p&&f&&f.height>0||d&&f&&(function(v){let g=0,_=6;for(let M=0;M<_;M++)v[M]!==void 0&&g++;return g===_})(f)?(n===null&&(n=new Al(i)),u=p?n.fromEquirectangular(l):n.fromCubemap(l),u.texture.pmremVersion=l.pmremVersion,t.set(l,u),l.addEventListener("dispose",a),u.texture):null}}}return l})(o):(function(l){if(l&&l.isTexture){let h=l.mapping;if(h===ul||h===dl){if(e.has(l))return r(e.get(l).texture,l.mapping);{let p=l.image;if(p&&p.height>0){let d=new Rl(p.height);return d.fromEquirectangularTexture(i,l),e.set(l,d),l.addEventListener("dispose",s),r(d.texture,l.mapping)}return null}}}return l})(o)},dispose:function(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function Wv(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Tr("WebGLRenderer: "+n+" extension not supported."),r}}}function Xv(i,e,t,n){let r={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let p in l.attributes)e.remove(l.attributes[p]);l.removeEventListener("dispose",a),delete r[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,p=c.attributes.position,d=0;if(p===void 0)return;if(h!==null){let f=h.array;d=h.version;for(let v=0,g=f.length;v<g;v+=3){let _=f[v+0],M=f[v+1],T=f[v+2];l.push(_,M,M,T,T,_)}}else{let f=p.array;d=p.version;for(let v=0,g=f.length/3-1;v<g;v+=3){let _=v+0,M=v+1,T=v+2;l.push(_,M,M,T,T,_)}}let u=new(p.count>=65535?Qs:Ks)(l,1);u.version=d;let m=s.get(c);m&&e.remove(m),s.set(c,u)}return{get:function(c,l){return r[l.id]===!0||(l.addEventListener("dispose",a),r[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function qv(i,e,t){let n,r,s;this.setMode=function(a){n=a},this.setIndex=function(a){r=a.type,s=a.bytesPerElement},this.render=function(a,o){i.drawElements(n,o,r,a*s),t.update(o,n,1)},this.renderInstances=function(a,o,c){c!==0&&(i.drawElementsInstanced(n,o,r,a*s,c),t.update(o,n,c))},this.renderMultiDraw=function(a,o,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,o,0,r,a,0,c);let l=0;for(let h=0;h<c;h++)l+=o[h];t.update(l,n,1)}}function jv(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:Ze("WebGLInfo: Unknown draw mode:",n)}}}}function Yv(i,e,t){let n=new WeakMap,r=new Dt;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,p=n.get(a);if(p===void 0||p.count!==h){p!==void 0&&p.texture.dispose();let d=a.morphAttributes.position!==void 0,u=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),u===!0&&(_=2),m===!0&&(_=3);let M=a.attributes.position.count*_,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let b=new Float32Array(M*T*4*h),S=new $s(b,M,T,h);S.type=Qn,S.needsUpdate=!0;let I=4*_;for(let U=0;U<h;U++){let V=f[U],N=v[U],q=g[U],B=M*T*4*U;for(let Z=0;Z<V.count;Z++){let Q=Z*I;d===!0&&(r.fromBufferAttribute(V,Z),b[B+Q+0]=r.x,b[B+Q+1]=r.y,b[B+Q+2]=r.z,b[B+Q+3]=0),u===!0&&(r.fromBufferAttribute(N,Z),b[B+Q+4]=r.x,b[B+Q+5]=r.y,b[B+Q+6]=r.z,b[B+Q+7]=0),m===!0&&(r.fromBufferAttribute(q,Z),b[B+Q+8]=r.x,b[B+Q+9]=r.y,b[B+Q+10]=r.z,b[B+Q+11]=q.itemSize===4?r.w:1)}}p={count:h,texture:S,size:new ve(M,T)},n.set(a,p),a.addEventListener("dispose",function U(){S.dispose(),n.delete(a),a.removeEventListener("dispose",U)})}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let d=0;for(let m=0;m<c.length;m++)d+=c[m];let u=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",u),o.getUniforms().setValue(i,"morphTargetInfluences",c)}o.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}}}function $v(i,e,t,n,r){let s=new WeakMap;function a(o){let c=o.target;c.removeEventListener("dispose",a),n.releaseStatesOfObject(c),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:function(o){let c=r.render.frame,l=o.geometry,h=e.get(o,l);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==c&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,c))),o.isSkinnedMesh){let p=o.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return h},dispose:function(){s=new WeakMap}}}var Zv={[Yc]:"LINEAR_TONE_MAPPING",[$c]:"REINHARD_TONE_MAPPING",[Zc]:"CINEON_TONE_MAPPING",[Jc]:"ACES_FILMIC_TONE_MAPPING",[Qc]:"AGX_TONE_MAPPING",[eh]:"NEUTRAL_TONE_MAPPING",[Kc]:"CUSTOM_TONE_MAPPING"};function Jv(i,e,t,n,r,s){let a=new Vn(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new vt;l.setAttribute("position",new We([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new We([0,2,0,0,2,0],2));let h=new Yo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new xn(l,h),d=new va(-1,1,1,-1,0,1),u,m=null,f=null,v=!1,g=null,_=[],M=!1;this.setSize=function(T,b){a.setSize(T,b),o!==null&&o.setSize(T,b),c!==null&&c.setSize(T,b);for(let S=0;S<_.length;S++){let I=_[S];I.setSize&&I.setSize(T,b)}},this.setEffects=function(T){_=T,M=_.length>0&&_[0].isRenderPass===!0;let b=a.width,S=a.height;_.length>0&&o===null&&(o=new Vn(b,S,{type:wi,depthBuffer:!1,stencilBuffer:!1}),c=new Vn(b,S,{type:wi,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<_.length;I++){let U=_[I];U.setSize&&U.setSize(b,S)}},this.begin=function(T,b){if(v||T.toneMapping===hi&&_.length===0)return!1;if(g=b,b!==null){let S=b.width,I=b.height;a.width===S&&a.height===I||this.setSize(S,I)}return M===!1&&T.setRenderTarget(a),u=T.toneMapping,T.toneMapping=hi,!0},this.hasRenderPass=function(){return M},this.end=function(T,b){T.toneMapping=u,v=!0;let S=a,I=o;for(let U=0;U<_.length;U++){let V=_[U];V.enabled!==!1&&(V.render(T,I,S,b),V.needsSwap!==!1&&(S=I,I=I===o?c:o))}if(m!==T.outputColorSpace||f!==T.toneMapping){m=T.outputColorSpace,f=T.toneMapping,h.defines={},_t.getTransfer(m)===Ut&&(h.defines.SRGB_TRANSFER="");let U=Zv[f];U&&(h.defines[U]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,T.setRenderTarget(g),T.render(p,d),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var mf=new Ln,ru=new hr(1,1),gf=new $s,_f=new xo,vf=new ia,$p=[],Zp=[],Jp=new Float32Array(16),Kp=new Float32Array(9),Qp=new Float32Array(4);function Ts(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=$p[r];if(s===void 0&&(s=new Float32Array(r),$p[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function en(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function tn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Pl(i,e){let t=Zp[e];t===void 0&&(t=new Int32Array(e),Zp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Kv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Qv(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;i.uniform2fv(this.addr,e),tn(t,e)}}function ex(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(en(t,e))return;i.uniform3fv(this.addr,e),tn(t,e)}}function tx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;i.uniform4fv(this.addr,e),tn(t,e)}}function nx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;Qp.set(n),i.uniformMatrix2fv(this.addr,!1,Qp),tn(t,n)}}function ix(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;Kp.set(n),i.uniformMatrix3fv(this.addr,!1,Kp),tn(t,n)}}function rx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(en(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),tn(t,e)}else{if(en(t,n))return;Jp.set(n),i.uniformMatrix4fv(this.addr,!1,Jp),tn(t,n)}}function sx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ax(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;i.uniform2iv(this.addr,e),tn(t,e)}}function ox(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;i.uniform3iv(this.addr,e),tn(t,e)}}function lx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;i.uniform4iv(this.addr,e),tn(t,e)}}function cx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function hx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;i.uniform2uiv(this.addr,e),tn(t,e)}}function ux(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;i.uniform3uiv(this.addr,e),tn(t,e)}}function dx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;i.uniform4uiv(this.addr,e),tn(t,e)}}function px(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(ru.compareFunction=t.isReversedDepthBuffer()?Tl:bl,s=ru):s=mf,t.setTexture2D(e||s,r)}function fx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||_f,r)}function mx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||vf,r)}function gx(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||gf,r)}function _x(i){switch(i){case 5126:return Kv;case 35664:return Qv;case 35665:return ex;case 35666:return tx;case 35674:return nx;case 35675:return ix;case 35676:return rx;case 5124:case 35670:return sx;case 35667:case 35671:return ax;case 35668:case 35672:return ox;case 35669:case 35673:return lx;case 5125:return cx;case 36294:return hx;case 36295:return ux;case 36296:return dx;case 35678:case 36198:case 36298:case 36306:case 35682:return px;case 35679:case 36299:case 36307:return fx;case 35680:case 36300:case 36308:case 36293:return mx;case 36289:case 36303:case 36311:case 36292:return gx}}function vx(i,e){i.uniform1fv(this.addr,e)}function xx(i,e){let t=Ts(e,this.size,2);i.uniform2fv(this.addr,t)}function yx(i,e){let t=Ts(e,this.size,3);i.uniform3fv(this.addr,t)}function Sx(i,e){let t=Ts(e,this.size,4);i.uniform4fv(this.addr,t)}function Mx(i,e){let t=Ts(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function bx(i,e){let t=Ts(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Tx(i,e){let t=Ts(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ex(i,e){i.uniform1iv(this.addr,e)}function wx(i,e){i.uniform2iv(this.addr,e)}function Ax(i,e){i.uniform3iv(this.addr,e)}function Rx(i,e){i.uniform4iv(this.addr,e)}function Cx(i,e){i.uniform1uiv(this.addr,e)}function Ix(i,e){i.uniform2uiv(this.addr,e)}function Px(i,e){i.uniform3uiv(this.addr,e)}function Lx(i,e){i.uniform4uiv(this.addr,e)}function Nx(i,e,t){let n=this.cache,r=e.length,s=Pl(t,r),a;en(n,s)||(i.uniform1iv(this.addr,s),tn(n,s)),a=this.type===i.SAMPLER_2D_SHADOW?ru:mf;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Dx(i,e,t){let n=this.cache,r=e.length,s=Pl(t,r);en(n,s)||(i.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||_f,s[a])}function Ux(i,e,t){let n=this.cache,r=e.length,s=Pl(t,r);en(n,s)||(i.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||vf,s[a])}function Ox(i,e,t){let n=this.cache,r=e.length,s=Pl(t,r);en(n,s)||(i.uniform1iv(this.addr,s),tn(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||gf,s[a])}function Fx(i){switch(i){case 5126:return vx;case 35664:return xx;case 35665:return yx;case 35666:return Sx;case 35674:return Mx;case 35675:return bx;case 35676:return Tx;case 5124:case 35670:return Ex;case 35667:case 35671:return wx;case 35668:case 35672:return Ax;case 35669:case 35673:return Rx;case 5125:return Cx;case 36294:return Ix;case 36295:return Px;case 36296:return Lx;case 35678:case 36198:case 36298:case 36306:case 35682:return Nx;case 35679:case 36299:case 36307:return Dx;case 35680:case 36300:case 36308:case 36293:return Ux;case 36289:case 36303:case 36311:case 36292:return Ox}}var su=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=_x(t.type)}},au=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fx(t.type)}},ou=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},nu=/(\w+)(\])?(\[|\.)?/g;function ef(i,e){i.seq.push(e),i.map[e.id]=e}function Bx(i,e,t){let n=i.name,r=n.length;for(nu.lastIndex=0;;){let s=nu.exec(n),a=nu.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===r){ef(t,l===void 0?new su(o,i,e):new au(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new ou(o),ef(t,h)),t=h}}}var bs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a);Bx(o,e.getUniformLocation(t,o.name),this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function tf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var zx=0;function Vx(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var nf=new tt;function kx(i){_t._getMatrix(nf,_t.workingColorSpace,i);let e=`mat3( ${nf.elements.map(t=>t.toFixed(4))} )`;switch(_t.getTransfer(i)){case zh:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function rf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Vx(i.getShaderSource(e),a)}return r}function Gx(i,e){let t=kx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Hx={[Yc]:"Linear",[$c]:"Reinhard",[Zc]:"Cineon",[Jc]:"ACESFilmic",[Qc]:"AgX",[eh]:"Neutral",[Kc]:"Custom"};function Wx(i,e){let t=Hx[e];return t===void 0?(je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var wl=new C;function Xx(){return _t.getLuminanceCoefficients(wl),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${wl.x.toFixed(4)}, ${wl.y.toFixed(4)}, ${wl.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Aa).join(`
`)}function jx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Yx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Aa(i){return i!==""}function sf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function af(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var $x=/^[ \t]*#include +<([\w\d./]+)>/gm;function lu(i){return i.replace($x,Jx)}var Zx=new Map;function Jx(i,e){let t=lt[e];if(t===void 0){let n=Zx.get(e);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=lt[n],je('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return lu(t)}var Kx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function of(i){return i.replace(Kx,Qx)}function Qx(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function lf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var ey={[ya]:"SHADOWMAP_TYPE_PCF",[_s]:"SHADOWMAP_TYPE_VSM"};function ty(i){return ey[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ny={[ys]:"ENVMAP_TYPE_CUBE",[Pr]:"ENVMAP_TYPE_CUBE",[Sa]:"ENVMAP_TYPE_CUBE_UV"};function iy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":ny[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var ry={[Pr]:"ENVMAP_MODE_REFRACTION"};function sy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":ry[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ay={[fp]:"ENVMAP_BLENDING_MULTIPLY",[mp]:"ENVMAP_BLENDING_MIX",[gp]:"ENVMAP_BLENDING_ADD"};function oy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ay[i.combine]||"ENVMAP_BLENDING_NONE"}function ly(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function cy(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=ty(t),l=iy(t),h=sy(t),p=oy(t),d=ly(t),u=qx(t),m=jx(s),f=r.createProgram(),v,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Aa).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Aa).join(`
`),g.length>0&&(g+=`
`)):(v=[lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Aa).join(`
`),g=[lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hi?"#define TONE_MAPPING":"",t.toneMapping!==hi?lt.tonemapping_pars_fragment:"",t.toneMapping!==hi?Wx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,Gx("linearToOutputTexel",t.outputColorSpace),Xx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Aa).join(`
`)),a=lu(a),a=sf(a,t),a=af(a,t),o=lu(o),o=sf(o,t),o=af(o,t),a=of(a),o=of(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===kh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===kh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=_+v+a,T=_+g+o,b=tf(r,r.VERTEX_SHADER,M),S=tf(r,r.FRAGMENT_SHADER,T);function I(q){if(i.debug.checkShaderErrors){let B=r.getProgramInfoLog(f)||"",Z=r.getShaderInfoLog(b)||"",Q=r.getShaderInfoLog(S)||"",se=B.trim(),W=Z.trim(),k=Q.trim(),$=!0,ue=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,f,b,S);else{let ce=rf(r,b,"vertex"),re=rf(r,S,"fragment");Ze("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+q.name+`
Material Type: `+q.type+`

Program Info Log: `+se+`
`+ce+`
`+re)}else se!==""?je("WebGLProgram: Program Info Log:",se):W!==""&&k!==""||(ue=!1);ue&&(q.diagnostics={runnable:$,programLog:se,vertexShader:{log:W,prefix:v},fragmentShader:{log:k,prefix:g}})}r.deleteShader(b),r.deleteShader(S),U=new bs(r,f),V=Yx(r,f)}let U,V;r.attachShader(f,b),r.attachShader(f,S),t.index0AttributeName!==void 0?r.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f),this.getUniforms=function(){return U===void 0&&I(this),U},this.getAttributes=function(){return V===void 0&&I(this),V};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(f,37297)),N},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zx++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=b,this.fragmentShader=S,this}var hy=0,cu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new hu(e),t.set(e,n)),n}},hu=class{constructor(e){this.id=hy++,this.code=e,this.usedTimes=0}};function uy(i){return i===Ur||i===yl||i===Sl}function dy(i,e,t,n,r,s){let a=new Zs,o=new cu,c=new Set,l=[],h=new Map,p=n.logarithmicDepthBuffer,d=n.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,g,_,M,T){let b=_.fog,S=M.geometry,I=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?_.environment:null,U=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,V=e.get(f.envMap||I,U),N=V&&V.mapping===Sa?V.image.height:null,q=u[f.type];f.precision!==null&&(d=n.getMaxPrecision(f.precision),d!==f.precision&&je("WebGLProgram.getParameters:",f.precision,"not supported, using",d,"instead."));let B=S.morphAttributes.position||S.morphAttributes.normal||S.morphAttributes.color,Z=B!==void 0?B.length:0,Q,se,W,k,$=0;if(S.morphAttributes.position!==void 0&&($=1),S.morphAttributes.normal!==void 0&&($=2),S.morphAttributes.color!==void 0&&($=3),q){let Ie=Ci[q];Q=Ie.vertexShader,se=Ie.fragmentShader}else{Q=f.vertexShader,se=f.fragmentShader;let Ie=o.getVertexShaderStage(f),jt=o.getFragmentShaderStage(f);o.update(f,Ie,jt),W=Ie.id,k=jt.id}let ue=i.getRenderTarget(),ce=i.state.buffers.depth.getReversed(),re=M.isInstancedMesh===!0,Se=M.isBatchedMesh===!0,pe=!!f.map,le=!!f.matcap,ie=!!V,fe=!!f.aoMap,Te=!!f.lightMap,Ee=!!f.bumpMap&&f.wireframe===!1,A=!!f.normalMap,E=!!f.displacementMap,P=!!f.emissiveMap,O=!!f.metalnessMap,x=!!f.roughnessMap,z=f.anisotropy>0,D=f.clearcoat>0,R=f.dispersion>0,X=f.retroreflectivity>0,Y=f.iridescence>0,K=f.sheen>0,me=f.transmission>0,Ue=z&&!!f.anisotropyMap,Ne=D&&!!f.clearcoatMap,xe=D&&!!f.clearcoatNormalMap,Ge=D&&!!f.clearcoatRoughnessMap,de=Y&&!!f.iridescenceMap,ye=Y&&!!f.iridescenceThicknessMap,_e=K&&!!f.sheenColorMap,oe=K&&!!f.sheenRoughnessMap,Mt=!!f.specularMap,ht=!!f.specularColorMap,xt=!!f.specularIntensityMap,Rt=me&&!!f.transmissionMap,Le=me&&!!f.thicknessMap,yt=!!f.gradientMap,He=!!f.alphaMap,ut=f.alphaTest>0,st=!!f.alphaHash,Je=!!f.extensions,nt=hi;f.toneMapped&&(ue!==null&&ue.isXRRenderTarget!==!0||(nt=i.toneMapping));let wt={shaderID:q,shaderType:f.type,shaderName:f.name,vertexShader:Q,fragmentShader:se,defines:f.defines,customVertexShaderID:W,customFragmentShaderID:k,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:d,batching:Se,batchingColor:Se&&M._colorsTexture!==null,instancing:re,instancingColor:re&&M.instanceColor!==null,instancingMorph:re&&M.morphTexture!==null,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:_t.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:pe,matcap:le,envMap:ie,envMapMode:ie&&V.mapping,envMapCubeUVHeight:N,aoMap:fe,lightMap:Te,bumpMap:Ee,normalMap:A,displacementMap:E,emissiveMap:P,normalMapObjectSpace:A&&f.normalMapType===Ep,normalMapTangentSpace:A&&f.normalMapType===Fh,packedNormalMap:A&&f.normalMapType===Fh&&uy(f.normalMap.format),metalnessMap:O,roughnessMap:x,anisotropy:z,anisotropyMap:Ue,clearcoat:D,clearcoatMap:Ne,clearcoatNormalMap:xe,clearcoatRoughnessMap:Ge,dispersion:R,retroreflection:X,iridescence:Y,iridescenceMap:de,iridescenceThicknessMap:ye,sheen:K,sheenColorMap:_e,sheenRoughnessMap:oe,specularMap:Mt,specularColorMap:ht,specularIntensityMap:xt,transmission:me,transmissionMap:Rt,thicknessMap:Le,gradientMap:yt,opaque:f.transparent===!1&&f.blending===Kn&&f.alphaToCoverage===!1,alphaMap:He,alphaTest:ut,alphaHash:st,combine:f.combine,mapUv:pe&&m(f.map.channel),aoMapUv:fe&&m(f.aoMap.channel),lightMapUv:Te&&m(f.lightMap.channel),bumpMapUv:Ee&&m(f.bumpMap.channel),normalMapUv:A&&m(f.normalMap.channel),displacementMapUv:E&&m(f.displacementMap.channel),emissiveMapUv:P&&m(f.emissiveMap.channel),metalnessMapUv:O&&m(f.metalnessMap.channel),roughnessMapUv:x&&m(f.roughnessMap.channel),anisotropyMapUv:Ue&&m(f.anisotropyMap.channel),clearcoatMapUv:Ne&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:oe&&m(f.sheenRoughnessMap.channel),specularMapUv:Mt&&m(f.specularMap.channel),specularColorMapUv:ht&&m(f.specularColorMap.channel),specularIntensityMapUv:xt&&m(f.specularIntensityMap.channel),transmissionMapUv:Rt&&m(f.transmissionMap.channel),thicknessMapUv:Le&&m(f.thicknessMap.channel),alphaMapUv:He&&m(f.alphaMap.channel),vertexTangents:!!S.attributes.tangent&&(A||z),vertexNormals:!!S.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!S.attributes.color&&S.attributes.color.itemSize===4,pointsUvs:M.isPoints===!0&&!!S.attributes.uv&&(pe||He),fog:!!b,useFog:f.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||S.attributes.normal===void 0&&A===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:ce,skinning:M.isSkinnedMesh===!0,hasPositionAttribute:S.attributes.position!==void 0,morphTargets:S.morphAttributes.position!==void 0,morphNormals:S.morphAttributes.normal!==void 0,morphColors:S.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:$,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:T.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&g.length>0,shadowMapType:i.shadowMap.type,toneMapping:nt,decodeVideoTexture:pe&&f.map.isVideoTexture===!0&&_t.getTransfer(f.map.colorSpace)===Ut,decodeVideoTextureEmissive:P&&f.emissiveMap.isVideoTexture===!0&&_t.getTransfer(f.emissiveMap.colorSpace)===Ut,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Ti,flipSided:f.side===yn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Je&&f.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&f.extensions.multiDraw===!0||Se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return wt.vertexUv1s=c.has(1),wt.vertexUv2s=c.has(2),wt.vertexUv3s=c.has(3),c.clear(),wt},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let g in f.defines)v.push(g),v.push(f.defines[g]);return f.isRawShaderMaterial===!1&&((function(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numSunLights),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numSunLightShadows),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)})(v,f),(function(g,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.retroreflection&&a.enable(24),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),g.push(a.mask)})(v,f),v.push(i.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=u[f.type],g;if(v){let _=Ci[v];g=Gp.clone(_.uniforms)}else g=f.uniforms;return g},acquireProgram:function(f,v){let g=h.get(v);return g!==void 0?++g.usedTimes:(g=new cy(i,v,f,r),l.push(g),h.set(v,g)),g},releaseProgram:function(f){if(--f.usedTimes===0){let v=l.indexOf(f);l[v]=l[l.length-1],l.pop(),h.delete(f.cacheKey),f.destroy()}},releaseShaderCache:function(f){o.remove(f)},programs:l,dispose:function(){o.dispose()}}}function py(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function fy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function cf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hf(){let i=[],e=0,t=[],n=[],r=[];function s(o){let c=0;return o.isInstancedMesh&&(c+=2),o.isSkinnedMesh&&(c+=1),c}function a(o,c,l,h,p,d){let u=i[e];return u===void 0?(u={id:o.id,object:o,geometry:c,material:l,materialVariant:s(o),groupOrder:h,renderOrder:o.renderOrder,z:p,group:d},i[e]=u):(u.id=o.id,u.object=o,u.geometry=c,u.material=l,u.materialVariant=s(o),u.groupOrder=h,u.renderOrder=o.renderOrder,u.z=p,u.group=d),e++,u}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,c,l,h,p,d,u){u.reversedDepth===!0&&(p=-p);let m=a(o,c,l,h,p,d);l.transmission>0?n.push(m):l.transparent===!0?r.push(m):t.push(m)},unshift:function(o,c,l,h,p,d){let u=a(o,c,l,h,p,d);l.transmission>0?n.unshift(u):l.transparent===!0?r.unshift(u):t.unshift(u)},finish:function(){for(let o=e,c=i.length;o<c;o++){let l=i[o];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(o,c){t.length>1&&t.sort(o||fy),n.length>1&&n.sort(c||cf),r.length>1&&r.sort(c||cf)}}}function my(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new hf,i.set(e,[r])):t>=n.length?(r=new hf,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function gy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new C,color:new it};break;case"SpotLight":t={position:new C,direction:new C,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new C,halfWidth:new C,halfHeight:new C}}return i[e.id]=t,t}}}function _y(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3}}return i[e.id]=t,t}}}var vy=0;function xy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function yy(i){let e=new gy,t=_y(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new C);let r=new C,s=new rt,a=new rt;return{setup:function(o){let c=0,l=0,h=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let p=0,d=0,u=0,m=0,f=0,v=0,g=0,_=0,M=0,T=0,b=0,S=0,I=0,U=0;o.sort(xy);for(let N=0,q=o.length;N<q;N++){let B=o[N],Z=B.color,Q=B.intensity,se=B.distance,W=null;if(B.shadow&&B.shadow.map&&(W=B.shadow.map.texture.format===Ur?B.shadow.map.texture:B.shadow.map.depthTexture||B.shadow.map.texture),B.isAmbientLight)c+=Z.r*Q,l+=Z.g*Q,h+=Z.b*Q;else if(B.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(B.sh.coefficients[k],Q);U++}else if(B.isSunLight){let k=e.get(B);if(k.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let $=B.shadow,ue=t.get(B);ue.shadowIntensity=$.intensity,ue.shadowBias=$.bias,ue.shadowNormalBias=$.normalBias,ue.shadowRadius=$.radius,ue.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[d]=ue,n.sunShadowMap[d]=W;let ce=$.getViewportCount();for(let re=0;re<ce;re++)n.sunShadowMatrix[u+re]=$.getMatrix(re),n.sunShadowCascade[u+re]=$._cascadeData[re];u+=ce,d++}n.sun[p]=k,p++}else if(B.isDirectionalLight){let k=e.get(B);if(k.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let $=B.shadow,ue=t.get(B);ue.shadowIntensity=$.intensity,ue.shadowBias=$.bias,ue.shadowNormalBias=$.normalBias,ue.shadowRadius=$.radius,ue.shadowMapSize=$.mapSize,n.directionalShadow[m]=ue,n.directionalShadowMap[m]=W,n.directionalShadowMatrix[m]=B.shadow.matrix,M++}n.directional[m]=k,m++}else if(B.isSpotLight){let k=e.get(B);k.position.setFromMatrixPosition(B.matrixWorld),k.color.copy(Z).multiplyScalar(Q),k.distance=se,k.coneCos=Math.cos(B.angle),k.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),k.decay=B.decay,n.spot[v]=k;let $=B.shadow;if(B.map&&(n.spotLightMap[S]=B.map,S++,$.updateMatrices(B),B.castShadow&&I++),n.spotLightMatrix[v]=$.matrix,B.castShadow){let ue=t.get(B);ue.shadowIntensity=$.intensity,ue.shadowBias=$.bias,ue.shadowNormalBias=$.normalBias,ue.shadowRadius=$.radius,ue.shadowMapSize=$.mapSize,n.spotShadow[v]=ue,n.spotShadowMap[v]=W,b++}v++}else if(B.isRectAreaLight){let k=e.get(B);k.color.copy(Z).multiplyScalar(Q),k.halfWidth.set(.5*B.width,0,0),k.halfHeight.set(0,.5*B.height,0),n.rectArea[g]=k,g++}else if(B.isPointLight){let k=e.get(B);if(k.color.copy(B.color).multiplyScalar(B.intensity),k.distance=B.distance,k.decay=B.decay,B.castShadow){let $=B.shadow,ue=t.get(B);ue.shadowIntensity=$.intensity,ue.shadowBias=$.bias,ue.shadowNormalBias=$.normalBias,ue.shadowRadius=$.radius,ue.shadowMapSize=$.mapSize,ue.shadowCameraNear=$.camera.near,ue.shadowCameraFar=$.camera.far,n.pointShadow[f]=ue,n.pointShadowMap[f]=W,n.pointShadowMatrix[f]=B.shadow.matrix,T++}n.point[f]=k,f++}else if(B.isHemisphereLight){let k=e.get(B);k.skyColor.copy(B.color).multiplyScalar(Q),k.groundColor.copy(B.groundColor).multiplyScalar(Q),n.hemi[_]=k,_++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let V=n.hash;V.sunLength===p&&V.directionalLength===m&&V.pointLength===f&&V.spotLength===v&&V.rectAreaLength===g&&V.hemiLength===_&&V.numSunShadows===d&&V.numDirectionalShadows===M&&V.numPointShadows===T&&V.numSpotShadows===b&&V.numSpotMaps===S&&V.numLightProbes===U||(n.sun.length=p,n.directional.length=m,n.spot.length=v,n.rectArea.length=g,n.point.length=f,n.hemi.length=_,n.sunShadow.length=d,n.sunShadowMap.length=d,n.sunShadowMatrix.length=u,n.sunShadowCascade.length=u,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=b,n.spotShadowMap.length=b,n.spotLightMatrix.length=b+S-I,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=U,V.sunLength=p,V.directionalLength=m,V.pointLength=f,V.spotLength=v,V.rectAreaLength=g,V.hemiLength=_,V.numSunShadows=d,V.numDirectionalShadows=M,V.numPointShadows=T,V.numSpotShadows=b,V.numSpotMaps=S,V.numLightProbes=U,n.version=vy++)},setupView:function(o,c){let l=0,h=0,p=0,d=0,u=0,m=0,f=c.matrixWorldInverse;for(let v=0,g=o.length;v<g;v++){let _=o[v];if(_.isSunLight){let M=n.sun[l];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(f),l++}else if(_.isDirectionalLight){let M=n.directional[h];M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),h++}else if(_.isSpotLight){let M=n.spot[d];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),d++}else if(_.isRectAreaLight){let M=n.rectArea[u];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),a.identity(),s.copy(_.matrixWorld),s.premultiply(f),a.extractRotation(s),M.halfWidth.set(.5*_.width,0,0),M.halfHeight.set(0,.5*_.height,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),u++}else if(_.isPointLight){let M=n.point[p];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(f),m++}}},state:n}}function uf(i){let e=new yy(i),t=[],n=[],r=[],s={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,t.length=0,n.length=0,r.length=0},state:s,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){r.push(a)}}}function Sy(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new uf(i),e.set(t,[s])):n>=r.length?(s=new uf(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}var My=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,by=`uniform sampler2D shadow_pass;
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
}`,Ty=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],Ey=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],df=new rt,wa=new C,iu=new C;function wy(i,e,t){let n=new cr,r=new ve,s=new ve,a=new Dt,o=new $o,c=new Zo,l={},h=t.maxTextureSize,p={[vs]:yn,[yn]:vs,[Ti]:Ti},d=new Zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:My,fragmentShader:by}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new vt;m.setAttribute("position",new Tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let f=new xn(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ya;let g=this.type;function _(S,I){let U=e.update(f);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,u.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),S.mapPass===null?S.mapPass=new Vn(r.x,r.y,{format:Ur,type:wi}):S.mapPass.width===S.map.width&&S.mapPass.height===S.map.height||S.mapPass.setSize(S.map.width,S.map.height),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(I,null,U,d,f,null),u.uniforms.shadow_pass.value=S.mapPass.texture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(I,null,U,u,f,null)}function M(S,I,U,V){let N=null,q=U.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(q!==void 0)N=q;else if(N=U.isPointLight===!0?c:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let B=N.uuid,Z=I.uuid,Q=l[B];Q===void 0&&(Q={},l[B]=Q);let se=Q[Z];se===void 0&&(se=N.clone(),Q[Z]=se,I.addEventListener("dispose",b)),N=se}return N.visible=I.visible,N.wireframe=I.wireframe,N.side=V===_s?I.shadowSide!==null?I.shadowSide:I.side:I.shadowSide!==null?I.shadowSide:p[I.side],N.alphaMap=I.alphaMap,N.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,N.map=I.map,N.clipShadows=I.clipShadows,N.clippingPlanes=I.clippingPlanes,N.clipIntersection=I.clipIntersection,N.displacementMap=I.displacementMap,N.displacementScale=I.displacementScale,N.displacementBias=I.displacementBias,N.wireframeLinewidth=I.wireframeLinewidth,N.linewidth=I.linewidth,U.isPointLight===!0&&N.isMeshDistanceMaterial===!0&&(i.properties.get(N).light=U),N}function T(S,I,U,V,N){if(S.visible===!1)return;if(S.layers.test(I.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&N===_s)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,S.matrixWorld);let B=e.update(S),Z=S.material;if(Array.isArray(Z)){let Q=B.groups;for(let se=0,W=Q.length;se<W;se++){let k=Q[se],$=Z[k.materialIndex];if($&&$.visible){let ue=M(S,$,V,N);S.onBeforeShadow(i,S,I,U,B,ue,k),i.renderBufferDirect(U,null,B,ue,S,k),S.onAfterShadow(i,S,I,U,B,ue,k)}}}else if(Z.visible){let Q=M(S,Z,V,N);S.onBeforeShadow(i,S,I,U,B,Q,null),i.renderBufferDirect(U,null,B,Q,S,null),S.onAfterShadow(i,S,I,U,B,Q,null)}}let q=S.children;for(let B=0,Z=q.length;B<Z;B++)T(q[B],I,U,V,N)}function b(S){S.target.removeEventListener("dispose",b);for(let I in l){let U=l[I],V=S.target.uuid;V in U&&(U[V].dispose(),delete U[V])}}this.render=function(S,I,U){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||S.length===0)return;this.type===jd&&(je("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ya);let V=i.getRenderTarget(),N=i.getActiveCubeFace(),q=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Ei),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let Z=g!==this.type;Z&&I.traverse(function(Q){Q.material&&(Array.isArray(Q.material)?Q.material.forEach(se=>se.needsUpdate=!0):Q.material.needsUpdate=!0)});for(let Q=0,se=S.length;Q<se;Q++){let W=S[Q],k=W.shadow;if(k===void 0){je("WebGLShadowMap:",W,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);let $=k.getFrameExtents();r.multiply($),s.copy(k.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/$.x),r.x=s.x*$.x,k.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/$.y),r.y=s.y*$.y,k.mapSize.y=s.y));let ue=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=ue,k.map===null||Z===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===_s){if(W.isPointLight){je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Vn(r.x,r.y,{format:Ur,type:wi,minFilter:Sn,magFilter:Sn,generateMipmaps:!1}),k.map.texture.name=W.name+".shadowMap",k.map.depthTexture=new hr(r.x,r.y,Qn),k.map.depthTexture.name=W.name+".shadowMapDepth",k.map.depthTexture.format=Nr,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=ui,k.map.depthTexture.magFilter=ui}else W.isPointLight?(k.map=new Rl(r.x),k.map.depthTexture=new Eo(r.x,pr)):(k.map=new Vn(r.x,r.y),k.map.depthTexture=new hr(r.x,r.y,pr)),k.map.depthTexture.name=W.name+".shadowMap",k.map.depthTexture.format=Nr,this.type===ya?(k.map.depthTexture.compareFunction=ue?Tl:bl,k.map.depthTexture.minFilter=Sn,k.map.depthTexture.magFilter=Sn):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=ui,k.map.depthTexture.magFilter=ui);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget===!0||k.map.width===r.x&&k.map.height===r.y||k.map.setSize(r.x,r.y);let ce=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();W.isPointLight!==!0&&k.updateMatrices(W,U);for(let re=0;re<ce;re++){let Se=k.getCamera(re);if(W.isPointLight){let pe=k.camera,le=k.matrix,ie=W.distance||pe.far;ie!==pe.far&&(pe.far=ie,pe.updateProjectionMatrix()),wa.setFromMatrixPosition(W.matrixWorld),pe.position.copy(wa),iu.copy(pe.position),iu.add(Ty[re]),pe.up.copy(Ey[re]),pe.lookAt(iu),pe.updateMatrixWorld(),le.makeTranslation(-wa.x,-wa.y,-wa.z),df.multiplyMatrices(pe.projectionMatrix,pe.matrixWorldInverse),k._frustum.setFromProjectionMatrix(df,pe.coordinateSystem,pe.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,re),i.clear();else{re===0&&(i.setRenderTarget(k.map),i.clear());let pe=k.getViewport(re);a.set(s.x*pe.x,s.y*pe.y,s.x*pe.z,s.y*pe.w),B.viewport(a)}n=k.getFrustum(re),T(I,U,Se,W,this.type)}k.isPointLightShadow!==!0&&this.type===_s&&_(k,U),k.needsUpdate=!1}g=this.type,v.needsUpdate=!1,i.setRenderTarget(V,N,q)}}function Ay(i,e){let t=new function(){let x=!1,z=new Dt,D=null,R=new Dt(0,0,0,0);return{setMask:function(X){D===X||x||(i.colorMask(X,X,X,X),D=X)},setLocked:function(X){x=X},setClear:function(X,Y,K,me,Ue){Ue===!0&&(X*=me,Y*=me,K*=me),z.set(X,Y,K,me),R.equals(z)===!1&&(i.clearColor(X,Y,K,me),R.copy(z))},reset:function(){x=!1,D=null,R.set(-1,0,0,0)}}},n=new function(){let x=!1,z=!1,D=null,R=null,X=null;return{setReversed:function(Y){if(z!==Y){let K=e.get("EXT_clip_control");Y?K.clipControlEXT(K.LOWER_LEFT_EXT,K.ZERO_TO_ONE_EXT):K.clipControlEXT(K.LOWER_LEFT_EXT,K.NEGATIVE_ONE_TO_ONE_EXT),z=Y;let me=X;X=null,this.setClear(me)}},getReversed:function(){return z},setTest:function(Y){Y?ie(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function(Y){D===Y||x||(i.depthMask(Y),D=Y)},setFunc:function(Y){if(z&&(Y=Up[Y]),R!==Y){switch(Y){case kc:i.depthFunc(i.NEVER);break;case Gc:i.depthFunc(i.ALWAYS);break;case Hc:i.depthFunc(i.LESS);break;case hl:i.depthFunc(i.LEQUAL);break;case Wc:i.depthFunc(i.EQUAL);break;case Xc:i.depthFunc(i.GEQUAL);break;case qc:i.depthFunc(i.GREATER);break;case jc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}R=Y}},setLocked:function(Y){x=Y},setClear:function(Y){X!==Y&&(X=Y,z&&(Y=1-Y),i.clearDepth(Y))},reset:function(){x=!1,D=null,R=null,X=null,z=!1}}},r=new function(){let x=!1,z=null,D=null,R=null,X=null,Y=null,K=null,me=null,Ue=null;return{setTest:function(Ne){x||(Ne?ie(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(Ne){z===Ne||x||(i.stencilMask(Ne),z=Ne)},setFunc:function(Ne,xe,Ge){D===Ne&&R===xe&&X===Ge||(i.stencilFunc(Ne,xe,Ge),D=Ne,R=xe,X=Ge)},setOp:function(Ne,xe,Ge){Y===Ne&&K===xe&&me===Ge||(i.stencilOp(Ne,xe,Ge),Y=Ne,K=xe,me=Ge)},setLocked:function(Ne){x=Ne},setClear:function(Ne){Ue!==Ne&&(i.clearStencil(Ne),Ue=Ne)},reset:function(){x=!1,z=null,D=null,R=null,X=null,Y=null,K=null,me=null,Ue=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,M=null,T=null,b=new it(0,0,0),S=0,I=!1,U=null,V=null,N=null,q=null,B=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Q=!1,se=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(W)[1]),Q=se>=1):W.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Q=se>=2);let k=null,$={},ue=i.getParameter(i.SCISSOR_BOX),ce=i.getParameter(i.VIEWPORT),re=new Dt().fromArray(ue),Se=new Dt().fromArray(ce);function pe(x,z,D,R){let X=new Uint8Array(4),Y=i.createTexture();i.bindTexture(x,Y),i.texParameteri(x,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(x,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let K=0;K<D;K++)x===i.TEXTURE_3D||x===i.TEXTURE_2D_ARRAY?i.texImage3D(z,0,i.RGBA,1,1,R,0,i.RGBA,i.UNSIGNED_BYTE,X):i.texImage2D(z+K,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,X);return Y}let le={};function ie(x){o[x]!==!0&&(i.enable(x),o[x]=!0)}function fe(x){o[x]!==!1&&(i.disable(x),o[x]=!1)}le[i.TEXTURE_2D]=pe(i.TEXTURE_2D,i.TEXTURE_2D,1),le[i.TEXTURE_CUBE_MAP]=pe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[i.TEXTURE_2D_ARRAY]=pe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),le[i.TEXTURE_3D]=pe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),ie(i.DEPTH_TEST),n.setFunc(hl),E(!1),P(Bc),ie(i.CULL_FACE),A(Ei);let Te={[xs]:i.FUNC_ADD,[$d]:i.FUNC_SUBTRACT,[Zd]:i.FUNC_REVERSE_SUBTRACT};Te[Jd]=i.MIN,Te[Kd]=i.MAX;let Ee={[Qd]:i.ZERO,[ep]:i.ONE,[tp]:i.SRC_COLOR,[ip]:i.SRC_ALPHA,[cp]:i.SRC_ALPHA_SATURATE,[op]:i.DST_COLOR,[sp]:i.DST_ALPHA,[np]:i.ONE_MINUS_SRC_COLOR,[rp]:i.ONE_MINUS_SRC_ALPHA,[lp]:i.ONE_MINUS_DST_COLOR,[ap]:i.ONE_MINUS_DST_ALPHA,[hp]:i.CONSTANT_COLOR,[up]:i.ONE_MINUS_CONSTANT_COLOR,[dp]:i.CONSTANT_ALPHA,[pp]:i.ONE_MINUS_CONSTANT_ALPHA};function A(x,z,D,R,X,Y,K,me,Ue,Ne){if(x!==Ei){if(u===!1&&(ie(i.BLEND),u=!0),x===Yd)X=X||z,Y=Y||D,K=K||R,z===f&&X===_||(i.blendEquationSeparate(Te[z],Te[X]),f=z,_=X),D===v&&R===g&&Y===M&&K===T||(i.blendFuncSeparate(Ee[D],Ee[R],Ee[Y],Ee[K]),v=D,g=R,M=Y,T=K),me.equals(b)!==!1&&Ue===S||(i.blendColor(me.r,me.g,me.b,Ue),b.copy(me),S=Ue),m=x,I=!1;else if(x!==m||Ne!==I){if(f===xs&&_===xs||(i.blendEquation(i.FUNC_ADD),f=xs,_=xs),Ne)switch(x){case Kn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zi:i.blendFunc(i.ONE,i.ONE);break;case zc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ze("WebGLState: Invalid blending: ",x)}else switch(x){case Kn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zc:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Vc:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",x)}v=null,g=null,M=null,T=null,b.set(0,0,0),S=0,m=x,I=Ne}}else u===!0&&(fe(i.BLEND),u=!1)}function E(x){U!==x&&(x?i.frontFace(i.CW):i.frontFace(i.CCW),U=x)}function P(x){x!==Xd?(ie(i.CULL_FACE),x!==V&&(x===Bc?i.cullFace(i.BACK):x===qd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),V=x}function O(x,z,D){x?(ie(i.POLYGON_OFFSET_FILL),q===z&&B===D||(q=z,B=D,n.getReversed()&&(z=-z),i.polygonOffset(z,D))):fe(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:ie,disable:fe,bindFramebuffer:function(x,z){return l[x]!==z&&(i.bindFramebuffer(x,z),l[x]=z,x===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=z),x===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=z),!0)},drawBuffers:function(x,z){let D=p,R=!1;if(x){D=h.get(z),D===void 0&&(D=[],h.set(z,D));let X=x.textures;if(D.length!==X.length||D[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,K=X.length;Y<K;Y++)D[Y]=i.COLOR_ATTACHMENT0+Y;D.length=X.length,R=!0}}else D[0]!==i.BACK&&(D[0]=i.BACK,R=!0);R&&i.drawBuffers(D)},useProgram:function(x){return d!==x&&(i.useProgram(x),d=x,!0)},setBlending:A,setMaterial:function(x,z){x.side===Ti?fe(i.CULL_FACE):ie(i.CULL_FACE);let D=x.side===yn;z&&(D=!D),E(D),x.blending===Kn&&x.transparent===!1?A(Ei):A(x.blending,x.blendEquation,x.blendSrc,x.blendDst,x.blendEquationAlpha,x.blendSrcAlpha,x.blendDstAlpha,x.blendColor,x.blendAlpha,x.premultipliedAlpha),n.setFunc(x.depthFunc),n.setTest(x.depthTest),n.setMask(x.depthWrite),t.setMask(x.colorWrite);let R=x.stencilWrite;r.setTest(R),R&&(r.setMask(x.stencilWriteMask),r.setFunc(x.stencilFunc,x.stencilRef,x.stencilFuncMask),r.setOp(x.stencilFail,x.stencilZFail,x.stencilZPass)),O(x.polygonOffset,x.polygonOffsetFactor,x.polygonOffsetUnits),x.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:P,setLineWidth:function(x){x!==N&&(Q&&i.lineWidth(x),N=x)},setPolygonOffset:O,setScissorTest:function(x){x?ie(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)},activeTexture:function(x){x===void 0&&(x=i.TEXTURE0+Z-1),k!==x&&(i.activeTexture(x),k=x)},bindTexture:function(x,z,D){D===void 0&&(D=k===null?i.TEXTURE0+Z-1:k);let R=$[D];R===void 0&&(R={type:void 0,texture:void 0},$[D]=R),R.type===x&&R.texture===z||(k!==D&&(i.activeTexture(D),k=D),i.bindTexture(x,z||le[x]),R.type=x,R.texture=z)},unbindTexture:function(){let x=$[k];x!==void 0&&x.type!==void 0&&(i.bindTexture(x.type,null),x.type=void 0,x.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(x){Ze("WebGLState:",x)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(x){Ze("WebGLState:",x)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(x){Ze("WebGLState:",x)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(x){Ze("WebGLState:",x)}},pixelStorei:function(x,z){c[x]!==z&&(i.pixelStorei(x,z),c[x]=z)},getParameter:function(x){return c[x]!==void 0?c[x]:i.getParameter(x)},updateUBOMapping:function(x,z){let D=a.get(z);D===void 0&&(D=new WeakMap,a.set(z,D));let R=D.get(x);R===void 0&&(R=i.getUniformBlockIndex(z,x.name),D.set(x,R))},uniformBlockBinding:function(x,z){let D=a.get(z).get(x);s.get(z)!==D&&(i.uniformBlockBinding(z,D,x.__bindingPointIndex),s.set(z,D))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(x){Ze("WebGLState:",x)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(x){Ze("WebGLState:",x)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(x){Ze("WebGLState:",x)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(x){Ze("WebGLState:",x)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(x){Ze("WebGLState:",x)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(x){Ze("WebGLState:",x)}},scissor:function(x){re.equals(x)===!1&&(i.scissor(x.x,x.y,x.z,x.w),re.copy(x))},viewport:function(x){Se.equals(x)===!1&&(i.viewport(x.x,x.y,x.z,x.w),Se.copy(x))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),o={},c={},k=null,$={},l={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,M=null,T=null,b=new it(0,0,0),S=0,I=!1,U=null,V=null,N=null,q=null,B=null,re.set(0,0,i.canvas.width,i.canvas.height),Se.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function Ry(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new ve,h=new WeakMap,p=new Set,d,u=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(A,E){return m?new OffscreenCanvas(A,E):js("canvas")}function v(A,E,P){let O=1,x=Ee(A);if((x.width>P||x.height>P)&&(O=P/Math.max(x.width,x.height)),O<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let z=Math.floor(O*x.width),D=Math.floor(O*x.height);d===void 0&&(d=f(z,D));let R=E?f(z,D):d;return R.width=z,R.height=D,R.getContext("2d").drawImage(A,0,0,z,D),je("WebGLRenderer: Texture has been resized from ("+x.width+"x"+x.height+") to ("+z+"x"+D+")."),R}return"data"in A&&je("WebGLRenderer: Image in DataTexture is too big ("+x.width+"x"+x.height+")."),A}return A}function g(A){return A.generateMipmaps}function _(A){i.generateMipmap(A)}function M(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(A,E,P,O,x,z=!1){if(A!==null){if(i[A]!==void 0)return i[A];je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let D;O&&(D=e.get("EXT_texture_norm16"),D||je("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let R=E;if(E===i.RED&&(P===i.FLOAT&&(R=i.R32F),P===i.HALF_FLOAT&&(R=i.R16F),P===i.UNSIGNED_BYTE&&(R=i.R8),P===i.UNSIGNED_SHORT&&D&&(R=D.R16_EXT),P===i.SHORT&&D&&(R=D.R16_SNORM_EXT)),E===i.RED_INTEGER&&(P===i.UNSIGNED_BYTE&&(R=i.R8UI),P===i.UNSIGNED_SHORT&&(R=i.R16UI),P===i.UNSIGNED_INT&&(R=i.R32UI),P===i.BYTE&&(R=i.R8I),P===i.SHORT&&(R=i.R16I),P===i.INT&&(R=i.R32I)),E===i.RG&&(P===i.FLOAT&&(R=i.RG32F),P===i.HALF_FLOAT&&(R=i.RG16F),P===i.UNSIGNED_BYTE&&(R=i.RG8),P===i.UNSIGNED_SHORT&&D&&(R=D.RG16_EXT),P===i.SHORT&&D&&(R=D.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(P===i.UNSIGNED_BYTE&&(R=i.RG8UI),P===i.UNSIGNED_SHORT&&(R=i.RG16UI),P===i.UNSIGNED_INT&&(R=i.RG32UI),P===i.BYTE&&(R=i.RG8I),P===i.SHORT&&(R=i.RG16I),P===i.INT&&(R=i.RG32I)),E===i.RGB_INTEGER&&(P===i.UNSIGNED_BYTE&&(R=i.RGB8UI),P===i.UNSIGNED_SHORT&&(R=i.RGB16UI),P===i.UNSIGNED_INT&&(R=i.RGB32UI),P===i.BYTE&&(R=i.RGB8I),P===i.SHORT&&(R=i.RGB16I),P===i.INT&&(R=i.RGB32I)),E===i.RGBA_INTEGER&&(P===i.UNSIGNED_BYTE&&(R=i.RGBA8UI),P===i.UNSIGNED_SHORT&&(R=i.RGBA16UI),P===i.UNSIGNED_INT&&(R=i.RGBA32UI),P===i.BYTE&&(R=i.RGBA8I),P===i.SHORT&&(R=i.RGBA16I),P===i.INT&&(R=i.RGBA32I)),E===i.RGB&&(P===i.UNSIGNED_SHORT&&D&&(R=D.RGB16_EXT),P===i.SHORT&&D&&(R=D.RGB16_SNORM_EXT),P===i.UNSIGNED_INT_5_9_9_9_REV&&(R=i.RGB9_E5),P===i.UNSIGNED_INT_10F_11F_11F_REV&&(R=i.R11F_G11F_B10F)),E===i.RGBA){let X=z?zh:_t.getTransfer(x);P===i.FLOAT&&(R=i.RGBA32F),P===i.HALF_FLOAT&&(R=i.RGBA16F),P===i.UNSIGNED_BYTE&&(R=X===Ut?i.SRGB8_ALPHA8:i.RGBA8),P===i.UNSIGNED_SHORT&&D&&(R=D.RGBA16_EXT),P===i.SHORT&&D&&(R=D.RGBA16_SNORM_EXT),P===i.UNSIGNED_SHORT_4_4_4_4&&(R=i.RGBA4),P===i.UNSIGNED_SHORT_5_5_5_1&&(R=i.RGB5_A1)}return R!==i.R16F&&R!==i.R32F&&R!==i.RG16F&&R!==i.RG32F&&R!==i.RGBA16F&&R!==i.RGBA32F||e.get("EXT_color_buffer_float"),R}function b(A,E){let P;return A?E===null||E===pr||E===Ss?P=i.DEPTH24_STENCIL8:E===Qn?P=i.DEPTH32F_STENCIL8:E===ba&&(P=i.DEPTH24_STENCIL8,je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===pr||E===Ss?P=i.DEPTH_COMPONENT24:E===Qn?P=i.DEPTH_COMPONENT32F:E===ba&&(P=i.DEPTH_COMPONENT16),P}function S(A,E){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==ui&&A.minFilter!==Sn?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function I(A){let E=A.target;E.removeEventListener("dispose",I),(function(P){let O=n.get(P);if(O.__webglInit===void 0)return;let x=P.source,z=u.get(x);if(z){let D=z[O.__cacheKey];D.usedTimes--,D.usedTimes===0&&V(P),Object.keys(z).length===0&&u.delete(x)}n.remove(P)})(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&p.delete(E)}function U(A){let E=A.target;E.removeEventListener("dispose",U),(function(P){let O=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(O.__webglFramebuffer[z]))for(let D=0;D<O.__webglFramebuffer[z].length;D++)i.deleteFramebuffer(O.__webglFramebuffer[z][D]);else i.deleteFramebuffer(O.__webglFramebuffer[z]);O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer[z])}else{if(Array.isArray(O.__webglFramebuffer))for(let z=0;z<O.__webglFramebuffer.length;z++)i.deleteFramebuffer(O.__webglFramebuffer[z]);else i.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&i.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let z=0;z<O.__webglColorRenderbuffer.length;z++)O.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(O.__webglColorRenderbuffer[z]);O.__webglDepthRenderbuffer&&i.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let x=P.textures;for(let z=0,D=x.length;z<D;z++){let R=n.get(x[z]);R.__webglTexture&&(i.deleteTexture(R.__webglTexture),a.memory.textures--),n.remove(x[z])}n.remove(P)})(E)}function V(A){let E=n.get(A);i.deleteTexture(E.__webglTexture);let P=A.source;delete u.get(P)[E.__cacheKey],a.memory.textures--}let N=0;function q(A,E){let P=n.get(A);if(A.isVideoTexture&&(function(O){let x=a.render.frame;h.get(O)!==x&&(h.set(O,x),O.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&P.__version!==A.version){let O=A.image;if(O===null)je("WebGLRenderer: Texture marked for update but no image data found.");else{if(O.complete!==!1)return void $(P,A,E);je("WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(P.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,P.__webglTexture,i.TEXTURE0+E)}let B={[pl]:i.REPEAT,[fl]:i.CLAMP_TO_EDGE,[_p]:i.MIRRORED_REPEAT},Z={[ui]:i.NEAREST,[vp]:i.NEAREST_MIPMAP_NEAREST,[Ma]:i.NEAREST_MIPMAP_LINEAR,[Sn]:i.LINEAR,[ml]:i.LINEAR_MIPMAP_NEAREST,[Lr]:i.LINEAR_MIPMAP_LINEAR},Q={[wp]:i.NEVER,[Pp]:i.ALWAYS,[Ap]:i.LESS,[bl]:i.LEQUAL,[Rp]:i.EQUAL,[Tl]:i.GEQUAL,[Cp]:i.GREATER,[Ip]:i.NOTEQUAL};function se(A,E){if(E.type!==Qn||e.has("OES_texture_float_linear")!==!1||E.magFilter!==Sn&&E.magFilter!==ml&&E.magFilter!==Ma&&E.magFilter!==Lr&&E.minFilter!==Sn&&E.minFilter!==ml&&E.minFilter!==Ma&&E.minFilter!==Lr||je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,B[E.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,B[E.wrapT]),A!==i.TEXTURE_3D&&A!==i.TEXTURE_2D_ARRAY||i.texParameteri(A,i.TEXTURE_WRAP_R,B[E.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Z[E.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Z[E.minFilter]),E.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Q[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ui||E.minFilter!==Ma&&E.minFilter!==Lr||E.type===Qn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let P=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function W(A,E){let P=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",I));let O=E.source,x=u.get(O);x===void 0&&(x={},u.set(O,x));let z=(function(D){let R=[];return R.push(D.wrapS),R.push(D.wrapT),R.push(D.wrapR||0),R.push(D.magFilter),R.push(D.minFilter),R.push(D.anisotropy),R.push(D.internalFormat),R.push(D.format),R.push(D.type),R.push(D.generateMipmaps),R.push(D.premultiplyAlpha),R.push(D.flipY),R.push(D.unpackAlignment),R.push(D.colorSpace),R.join()})(E);if(z!==A.__cacheKey){x[z]===void 0&&(x[z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,P=!0),x[z].usedTimes++;let D=x[A.__cacheKey];D!==void 0&&(x[A.__cacheKey].usedTimes--,D.usedTimes===0&&V(E)),A.__cacheKey=z,A.__webglTexture=x[z].texture}return P}function k(A,E,P){return Math.floor(Math.floor(A/P)/E)}function $(A,E,P){let O=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(O=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(O=i.TEXTURE_3D);let x=W(A,E),z=E.source;t.bindTexture(O,A.__webglTexture,i.TEXTURE0+P);let D=n.get(z);if(z.version!==D.__version||x===!0){if(t.activeTexture(i.TEXTURE0+P),!(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)){let ye=_t.getPrimaries(_t.workingColorSpace),_e=E.colorSpace===Or?null:_t.getPrimaries(E.colorSpace),oe=E.colorSpace===Or||ye===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let R=v(E.image,!1,r.maxTextureSize);R=Te(E,R);let X=s.convert(E.format,E.colorSpace),Y=s.convert(E.type),K,me=T(E.internalFormat,X,Y,E.normalized,E.colorSpace,E.isVideoTexture);se(O,E);let Ue=E.mipmaps,Ne=E.isVideoTexture!==!0,xe=D.__version===void 0||x===!0,Ge=z.dataReady,de=S(E,R);if(E.isDepthTexture)me=b(E.format===Dr,E.type),xe&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,me,R.width,R.height):t.texImage2D(i.TEXTURE_2D,0,me,R.width,R.height,0,X,Y,null));else if(E.isDataTexture)if(Ue.length>0){Ne&&xe&&t.texStorage2D(i.TEXTURE_2D,de,me,Ue[0].width,Ue[0].height);for(let ye=0,_e=Ue.length;ye<_e;ye++)K=Ue[ye],Ne?Ge&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,K.width,K.height,X,Y,K.data):t.texImage2D(i.TEXTURE_2D,ye,me,K.width,K.height,0,X,Y,K.data);E.generateMipmaps=!1}else Ne?(xe&&t.texStorage2D(i.TEXTURE_2D,de,me,R.width,R.height),Ge&&(function(ye,_e,oe,Mt){let ht=ye.updateRanges;if(ht.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e.width,_e.height,oe,Mt,_e.data);else{ht.sort((He,ut)=>He.start-ut.start);let xt=0;for(let He=1;He<ht.length;He++){let ut=ht[xt],st=ht[He],Je=ut.start+ut.count,nt=k(st.start,_e.width,4),wt=k(ut.start,_e.width,4);st.start<=Je+1&&nt===wt&&k(st.start+st.count-1,_e.width,4)===nt?ut.count=Math.max(ut.count,st.start+st.count-ut.start):(++xt,ht[xt]=st)}ht.length=xt+1;let Rt=t.getParameter(i.UNPACK_ROW_LENGTH),Le=t.getParameter(i.UNPACK_SKIP_PIXELS),yt=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_e.width);for(let He=0,ut=ht.length;He<ut;He++){let st=ht[He],Je=Math.floor(st.start/4),nt=Math.ceil(st.count/4),wt=Je%_e.width,Ie=Math.floor(Je/_e.width),jt=nt;t.pixelStorei(i.UNPACK_SKIP_PIXELS,wt),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ie),t.texSubImage2D(i.TEXTURE_2D,0,wt,Ie,jt,1,oe,Mt,_e.data)}ye.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Rt),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Le),t.pixelStorei(i.UNPACK_SKIP_ROWS,yt)}})(E,R,X,Y)):t.texImage2D(i.TEXTURE_2D,0,me,R.width,R.height,0,X,Y,R.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ne&&xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,me,Ue[0].width,Ue[0].height,R.depth);for(let ye=0,_e=Ue.length;ye<_e;ye++)if(K=Ue[ye],E.format!==Ai)if(X!==null)if(Ne){if(Ge)if(E.layerUpdates.size>0){let oe=qh(K.width,K.height,E.format,E.type);for(let Mt of E.layerUpdates){let ht=K.data.subarray(Mt*oe/K.data.BYTES_PER_ELEMENT,(Mt+1)*oe/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,Mt,K.width,K.height,1,X,ht)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,0,K.width,K.height,R.depth,X,K.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ye,me,K.width,K.height,R.depth,0,K.data,0,0);else je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?Ge&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ye,0,0,0,K.width,K.height,R.depth,X,Y,K.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ye,me,K.width,K.height,R.depth,0,X,Y,K.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Ne&&xe&&t.texStorage2D(i.TEXTURE_2D,de,me,Ue[0].width,Ue[0].height);for(let ye=0,_e=Ue.length;ye<_e;ye++)K=Ue[ye],E.format!==Ai?X!==null?Ne?Ge&&t.compressedTexSubImage2D(i.TEXTURE_2D,ye,0,0,K.width,K.height,X,K.data):t.compressedTexImage2D(i.TEXTURE_2D,ye,me,K.width,K.height,0,K.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?Ge&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,K.width,K.height,X,Y,K.data):t.texImage2D(i.TEXTURE_2D,ye,me,K.width,K.height,0,X,Y,K.data)}else if(E.isDataArrayTexture)if(Ne){if(xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,me,R.width,R.height,R.depth),Ge)if(E.layerUpdates.size>0){let ye=qh(R.width,R.height,E.format,E.type);for(let _e of E.layerUpdates){let oe=R.data.subarray(_e*ye/R.data.BYTES_PER_ELEMENT,(_e+1)*ye/R.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,_e,R.width,R.height,1,X,Y,oe)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,R.width,R.height,R.depth,X,Y,R.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,R.width,R.height,R.depth,0,X,Y,R.data);else if(E.isData3DTexture)Ne?(xe&&t.texStorage3D(i.TEXTURE_3D,de,me,R.width,R.height,R.depth),Ge&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,R.width,R.height,R.depth,X,Y,R.data)):t.texImage3D(i.TEXTURE_3D,0,me,R.width,R.height,R.depth,0,X,Y,R.data);else if(E.isFramebufferTexture){if(xe)if(Ne)t.texStorage2D(i.TEXTURE_2D,de,me,R.width,R.height);else{let ye=R.width,_e=R.height;for(let oe=0;oe<de;oe++)t.texImage2D(i.TEXTURE_2D,oe,me,ye,_e,0,X,Y,null),ye>>=1,_e>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let ye=i.canvas;if(ye.hasAttribute("layoutsubtree")||ye.setAttribute("layoutsubtree","true"),R.parentNode!==ye)return ye.appendChild(R),p.add(E),ye.onpaint=_e=>{let oe=_e.changedElements;for(let Mt of p)oe.includes(Mt.image)&&(Mt.needsUpdate=!0)},void ye.requestPaint();if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,R);else{let oe=i.RGBA,Mt=i.RGBA,ht=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,oe,Mt,ht,R)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(Ne&&xe){let ye=Ee(Ue[0]);t.texStorage2D(i.TEXTURE_2D,de,me,ye.width,ye.height)}for(let ye=0,_e=Ue.length;ye<_e;ye++)K=Ue[ye],Ne?Ge&&t.texSubImage2D(i.TEXTURE_2D,ye,0,0,X,Y,K):t.texImage2D(i.TEXTURE_2D,ye,me,X,Y,K);E.generateMipmaps=!1}else if(Ne){if(xe){let ye=Ee(R);t.texStorage2D(i.TEXTURE_2D,de,me,ye.width,ye.height)}Ge&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,X,Y,R)}else t.texImage2D(i.TEXTURE_2D,0,me,X,Y,R);g(E)&&_(O),D.__version=z.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function ue(A,E,P,O,x,z){let D=s.convert(P.format,P.colorSpace),R=s.convert(P.type),X=T(P.internalFormat,D,R,P.normalized,P.colorSpace),Y=n.get(E),K=n.get(P);if(K.__renderTarget=E,!Y.__hasExternalTextures){let me=Math.max(1,E.width>>z),Ue=Math.max(1,E.height>>z);x===i.TEXTURE_3D||x===i.TEXTURE_2D_ARRAY?t.texImage3D(x,z,X,me,Ue,E.depth,0,D,R,null):t.texImage2D(x,z,X,me,Ue,0,D,R,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),fe(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,O,x,K.__webglTexture,0,ie(E)):(x===i.TEXTURE_2D||x>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&x<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,O,x,K.__webglTexture,z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ce(A,E,P){if(i.bindRenderbuffer(i.RENDERBUFFER,A),E.depthBuffer){let O=E.depthTexture,x=O&&O.isDepthTexture?O.type:null,z=b(E.stencilBuffer,x),D=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;fe(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie(E),z,E.width,E.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie(E),z,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,z,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,D,i.RENDERBUFFER,A)}else{let O=E.textures;for(let x=0;x<O.length;x++){let z=O[x],D=s.convert(z.format,z.colorSpace),R=s.convert(z.type),X=T(z.internalFormat,D,R,z.normalized,z.colorSpace);fe(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie(E),X,E.width,E.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie(E),X,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,X,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function re(A,E,P){let O=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let x=n.get(E.depthTexture);if(x.__renderTarget=E,x.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),O){if(x.__webglInit===void 0&&(x.__webglInit=!0,E.depthTexture.addEventListener("dispose",I)),x.__webglTexture===void 0){x.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,x.__webglTexture),se(i.TEXTURE_CUBE_MAP,E.depthTexture);let Y=s.convert(E.depthTexture.format),K=s.convert(E.depthTexture.type),me;E.depthTexture.format===Nr?me=i.DEPTH_COMPONENT24:E.depthTexture.format===Dr&&(me=i.DEPTH24_STENCIL8);for(let Ue=0;Ue<6;Ue++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ue,0,me,E.width,E.height,0,Y,K,null)}}else q(E.depthTexture,0);let z=x.__webglTexture,D=ie(E),R=O?i.TEXTURE_CUBE_MAP_POSITIVE_X+P:i.TEXTURE_2D,X=E.depthTexture.format===Dr?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===Nr)fe(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,R,z,0,D):i.framebufferTexture2D(i.FRAMEBUFFER,X,R,z,0);else{if(E.depthTexture.format!==Dr)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");fe(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,R,z,0,D):i.framebufferTexture2D(i.FRAMEBUFFER,X,R,z,0)}}function Se(A){let E=n.get(A),P=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){let O=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),O){let x=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,O.removeEventListener("dispose",x)};O.addEventListener("dispose",x),E.__depthDisposeCallback=x}E.__boundDepthTexture=O}if(A.depthTexture&&!E.__autoAllocateDepthBuffer)if(P)for(let O=0;O<6;O++)re(E.__webglFramebuffer[O],A,O);else{let O=A.texture.mipmaps;O&&O.length>0?re(E.__webglFramebuffer[0],A,0):re(E.__webglFramebuffer,A,0)}else if(P){E.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[O]),E.__webglDepthbuffer[O]===void 0)E.__webglDepthbuffer[O]=i.createRenderbuffer(),ce(E.__webglDepthbuffer[O],A,!1);else{let x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=E.__webglDepthbuffer[O];i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,x,i.RENDERBUFFER,z)}}else{let O=A.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ce(E.__webglDepthbuffer,A,!1);else{let x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,x,i.RENDERBUFFER,z)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let pe=[],le=[];function ie(A){return Math.min(r.maxSamples,A.samples)}function fe(A){let E=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Te(A,E){let P=A.colorSpace,O=A.format,x=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||P!==Ml&&P!==Or&&(_t.getTransfer(P)===Ut?O===Ai&&x===di||je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",P)),E}function Ee(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=N;return A>=r.maxTextures&&je("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),N+=1,A},this.resetTextureUnits=function(){N=0},this.getTextureUnits=function(){return N},this.setTextureUnits=function(A){N=A},this.setTexture2D=q,this.setTexture2DArray=function(A,E){let P=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&P.__version!==A.version?$(P,A,E):(A.isExternalTexture&&(P.__webglTexture=A.sourceTexture?A.sourceTexture:null),t.bindTexture(i.TEXTURE_2D_ARRAY,P.__webglTexture,i.TEXTURE0+E))},this.setTexture3D=function(A,E){let P=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&P.__version!==A.version?$(P,A,E):t.bindTexture(i.TEXTURE_3D,P.__webglTexture,i.TEXTURE0+E)},this.setTextureCube=function(A,E){let P=n.get(A);A.isCubeDepthTexture!==!0&&A.version>0&&P.__version!==A.version?(function(O,x,z){if(x.image.length!==6)return;let D=W(O,x),R=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+z);let X=n.get(R);if(R.version!==X.__version||D===!0){t.activeTexture(i.TEXTURE0+z);let Y=_t.getPrimaries(_t.workingColorSpace),K=x.colorSpace===Or?null:_t.getPrimaries(x.colorSpace),me=x.colorSpace===Or||Y===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let Ue=x.isCompressedTexture||x.image[0].isCompressedTexture,Ne=x.image[0]&&x.image[0].isDataTexture,xe=[];for(let Le=0;Le<6;Le++)xe[Le]=Ue||Ne?Ne?x.image[Le].image:x.image[Le]:v(x.image[Le],!0,r.maxCubemapSize),xe[Le]=Te(x,xe[Le]);let Ge=xe[0],de=s.convert(x.format,x.colorSpace),ye=s.convert(x.type),_e=T(x.internalFormat,de,ye,x.normalized,x.colorSpace),oe=x.isVideoTexture!==!0,Mt=X.__version===void 0||D===!0,ht=R.dataReady,xt,Rt=S(x,Ge);if(se(i.TEXTURE_CUBE_MAP,x),Ue){oe&&Mt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Rt,_e,Ge.width,Ge.height);for(let Le=0;Le<6;Le++){xt=xe[Le].mipmaps;for(let yt=0;yt<xt.length;yt++){let He=xt[yt];x.format!==Ai?de!==null?oe?ht&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,yt,0,0,He.width,He.height,de,He.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,yt,_e,He.width,He.height,0,He.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):oe?ht&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,yt,0,0,He.width,He.height,de,ye,He.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,yt,_e,He.width,He.height,0,de,ye,He.data)}}}else{if(xt=x.mipmaps,oe&&Mt){xt.length>0&&Rt++;let Le=Ee(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Rt,_e,Le.width,Le.height)}for(let Le=0;Le<6;Le++)if(Ne){oe?ht&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,xe[Le].width,xe[Le].height,de,ye,xe[Le].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,_e,xe[Le].width,xe[Le].height,0,de,ye,xe[Le].data);for(let yt=0;yt<xt.length;yt++){let He=xt[yt].image[Le].image;oe?ht&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,yt+1,0,0,He.width,He.height,de,ye,He.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,yt+1,_e,He.width,He.height,0,de,ye,He.data)}}else{oe?ht&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,0,0,de,ye,xe[Le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,_e,de,ye,xe[Le]);for(let yt=0;yt<xt.length;yt++){let He=xt[yt];oe?ht&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,yt+1,0,0,de,ye,He.image[Le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,yt+1,_e,de,ye,He.image[Le])}}}g(x)&&_(i.TEXTURE_CUBE_MAP),X.__version=R.version,x.onUpdate&&x.onUpdate(x)}O.__version=x.version})(P,A,E):t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+E)},this.rebindTextures=function(A,E,P){let O=n.get(A);E!==void 0&&ue(O.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),P!==void 0&&Se(A)},this.setupRenderTarget=function(A){let E=A.texture,P=n.get(A),O=n.get(E);A.addEventListener("dispose",U);let x=A.textures,z=A.isWebGLCubeRenderTarget===!0,D=x.length>1;if(D||(O.__webglTexture===void 0&&(O.__webglTexture=i.createTexture()),O.__version=E.version,a.memory.textures++),z){P.__webglFramebuffer=[];for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0){P.__webglFramebuffer[R]=[];for(let X=0;X<E.mipmaps.length;X++)P.__webglFramebuffer[R][X]=i.createFramebuffer()}else P.__webglFramebuffer[R]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){P.__webglFramebuffer=[];for(let R=0;R<E.mipmaps.length;R++)P.__webglFramebuffer[R]=i.createFramebuffer()}else P.__webglFramebuffer=i.createFramebuffer();if(D)for(let R=0,X=x.length;R<X;R++){let Y=n.get(x[R]);Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&fe(A)===!1){P.__webglMultisampledFramebuffer=i.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let R=0;R<x.length;R++){let X=x[R];P.__webglColorRenderbuffer[R]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,P.__webglColorRenderbuffer[R]);let Y=s.convert(X.format,X.colorSpace),K=s.convert(X.type),me=T(X.internalFormat,Y,K,X.normalized,X.colorSpace,A.isXRRenderTarget===!0),Ue=ie(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue,me,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+R,i.RENDERBUFFER,P.__webglColorRenderbuffer[R])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(P.__webglDepthRenderbuffer=i.createRenderbuffer(),ce(P.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(z){t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture),se(i.TEXTURE_CUBE_MAP,E);for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0)for(let X=0;X<E.mipmaps.length;X++)ue(P.__webglFramebuffer[R][X],A,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,X);else ue(P.__webglFramebuffer[R],A,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,0);g(E)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(D){for(let R=0,X=x.length;R<X;R++){let Y=x[R],K=n.get(Y),me=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(me=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,K.__webglTexture),se(me,Y),ue(P.__webglFramebuffer,A,Y,i.COLOR_ATTACHMENT0+R,me,0),g(Y)&&_(me)}t.unbindTexture()}else{let R=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(R=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(R,O.__webglTexture),se(R,E),E.mipmaps&&E.mipmaps.length>0)for(let X=0;X<E.mipmaps.length;X++)ue(P.__webglFramebuffer[X],A,E,i.COLOR_ATTACHMENT0,R,X);else ue(P.__webglFramebuffer,A,E,i.COLOR_ATTACHMENT0,R,0);g(E)&&_(R),t.unbindTexture()}A.depthBuffer&&Se(A)},this.updateRenderTargetMipmap=function(A){let E=A.textures;for(let P=0,O=E.length;P<O;P++){let x=E[P];if(g(x)){let z=M(A),D=n.get(x).__webglTexture;t.bindTexture(z,D),_(z),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(fe(A)===!1){let E=A.textures,P=A.width,O=A.height,x=i.COLOR_BUFFER_BIT,z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,D=n.get(A),R=E.length>1;if(R)for(let Y=0;Y<E.length;Y++)t.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,D.__webglMultisampledFramebuffer);let X=A.texture.mipmaps;X&&X.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,D.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,D.__webglFramebuffer);for(let Y=0;Y<E.length;Y++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(x|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(x|=i.STENCIL_BUFFER_BIT)),R){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,D.__webglColorRenderbuffer[Y]);let K=n.get(E[Y]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,K,0)}i.blitFramebuffer(0,0,P,O,0,0,P,O,x,i.NEAREST),c===!0&&(pe.length=0,le.length=0,pe.push(i.COLOR_ATTACHMENT0+Y),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(pe.push(z),le.push(z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),R)for(let Y=0;Y<E.length;Y++){t.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,D.__webglColorRenderbuffer[Y]);let K=n.get(E[Y]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,K,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,D.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){let E=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=fe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Cy(i,e){return{convert:function(t,n=Or){let r,s=_t.getTransfer(n);if(t===di)return i.UNSIGNED_BYTE;if(t===nh)return i.UNSIGNED_SHORT_4_4_4_4;if(t===ih)return i.UNSIGNED_SHORT_5_5_5_1;if(t===Sp)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===Mp)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===xp)return i.BYTE;if(t===yp)return i.SHORT;if(t===ba)return i.UNSIGNED_SHORT;if(t===th)return i.INT;if(t===pr)return i.UNSIGNED_INT;if(t===Qn)return i.FLOAT;if(t===wi)return i.HALF_FLOAT;if(t===bp)return i.ALPHA;if(t===Tp)return i.RGB;if(t===Ai)return i.RGBA;if(t===Nr)return i.DEPTH_COMPONENT;if(t===Dr)return i.DEPTH_STENCIL;if(t===Ta)return i.RED;if(t===rh)return i.RED_INTEGER;if(t===Ur)return i.RG;if(t===sh)return i.RG_INTEGER;if(t===ah)return i.RGBA_INTEGER;if(t===gl||t===_l||t===vl||t===xl)if(s===Ut){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===gl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===_l)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===vl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===xl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===gl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===_l)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===vl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===xl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===oh||t===lh||t===ch||t===hh){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===oh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===lh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===ch)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===hh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===uh||t===dh||t===ph||t===fh||t===mh||t===yl||t===gh){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===uh||t===dh)return s===Ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===ph)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(t===fh)return r.COMPRESSED_R11_EAC;if(t===mh)return r.COMPRESSED_SIGNED_R11_EAC;if(t===yl)return r.COMPRESSED_RG11_EAC;if(t===gh)return r.COMPRESSED_SIGNED_RG11_EAC}if(t===_h||t===vh||t===xh||t===yh||t===Sh||t===Mh||t===bh||t===Th||t===Eh||t===wh||t===Ah||t===Rh||t===Ch||t===Ih){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===_h)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===vh)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===xh)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===yh)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Sh)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Mh)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===bh)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Th)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Eh)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===wh)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Ah)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Rh)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Ch)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Ih)return s===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Ph||t===Lh||t===Nh){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Ph)return s===Ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Lh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Nh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Dh||t===Uh||t===Sl||t===Oh){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===Dh)return r.COMPRESSED_RED_RGTC1_EXT;if(t===Uh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Sl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Oh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Ss?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var Iy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Py=`
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

}`,uu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ra(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Zt({vertexShader:Iy,fragmentShader:Py,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xn(new fs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},du=class extends Mi{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,p=null,d=null,u=null,m=null,f=typeof XRWebGLBinding<"u",v=new uu,g={},_=t.getContextAttributes(),M=null,T=null,b=[],S=[],I=new ve,U=null,V=null,N=new vn;N.viewport=new Dt;let q=new vn;q.viewport=new Dt;let B=[N,q],Z=new ll,Q=null,se=null;function W(le){let ie=S.indexOf(le.inputSource);if(ie===-1)return;let fe=b[ie];fe!==void 0&&(fe.update(le.inputSource,le.frame,l||a),fe.dispatchEvent({type:le.type,data:le.inputSource}))}function k(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",$);for(let le=0;le<b.length;le++){let ie=S[le];ie!==null&&(S[le]=null,b[le].disconnect(ie))}Q=null,se=null,v.reset();for(let le in g)delete g[le];if(e.setRenderTarget(M),u=null,d=null,p=null,r=null,T=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(I.width,I.height,!1),V!==null){let le=V.camera;le.fov=V.fov,le.zoom=V.zoom,le.updateProjectionMatrix(),V=null}n.dispatchEvent({type:"sessionend"})}function $(le){for(let ie=0;ie<le.removed.length;ie++){let fe=le.removed[ie],Te=S.indexOf(fe);Te>=0&&(S[Te]=null,b[Te].disconnect(fe))}for(let ie=0;ie<le.added.length;ie++){let fe=le.added[ie],Te=S.indexOf(fe);if(Te===-1){for(let A=0;A<b.length;A++){if(A>=S.length){S.push(fe),Te=A;break}if(S[A]===null){S[A]=fe,Te=A;break}}if(Te===-1)break}let Ee=b[Te];Ee&&Ee.connect(fe)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(le){let ie=b[le];return ie===void 0&&(ie=new cs,b[le]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(le){let ie=b[le];return ie===void 0&&(ie=new cs,b[le]=ie),ie.getGripSpace()},this.getHand=function(le){let ie=b[le];return ie===void 0&&(ie=new cs,b[le]=ie),ie.getHandSpace()},this.setFramebufferScaleFactor=function(le){s=le,n.isPresenting===!0&&je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(le){o=le,n.isPresenting===!0&&je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(le){l=le},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return p===null&&f&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(le){if(r=le,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",k),r.addEventListener("inputsourceschange",$),_.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(I),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,fe=null,Te=null;_.depth&&(Te=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=_.stencil?Dr:Nr,fe=_.stencil?Ss:pr);let Ee={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:s};p=this.getBinding(),d=p.createProjectionLayer(Ee),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new Vn(d.textureWidth,d.textureHeight,{format:Ai,type:di,depthTexture:new hr(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ie={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),T=new Vn(u.framebufferWidth,u.framebufferHeight,{format:Ai,type:di,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let ue=new C,ce=new C;function re(le,ie){ie===null?le.matrixWorld.copy(le.matrix):le.matrixWorld.multiplyMatrices(ie.matrixWorld,le.matrix),le.matrixWorldInverse.copy(le.matrixWorld).invert()}this.updateCamera=function(le){if(r===null)return;let ie=le.near,fe=le.far;v.texture!==null&&(v.depthNear>0&&(ie=v.depthNear),v.depthFar>0&&(fe=v.depthFar)),Z.near=q.near=N.near=ie,Z.far=q.far=N.far=fe,Q===Z.near&&se===Z.far||(r.updateRenderState({depthNear:Z.near,depthFar:Z.far}),Q=Z.near,se=Z.far),Z.layers.mask=6|le.layers.mask,N.layers.mask=-5&Z.layers.mask,q.layers.mask=-3&Z.layers.mask;let Te=le.parent,Ee=Z.cameras;re(Z,Te);for(let A=0;A<Ee.length;A++)re(Ee[A],Te);Ee.length===2?(function(A,E,P){ue.setFromMatrixPosition(E.matrixWorld),ce.setFromMatrixPosition(P.matrixWorld);let O=ue.distanceTo(ce),x=E.projectionMatrix.elements,z=P.projectionMatrix.elements,D=x[14]/(x[10]-1),R=x[14]/(x[10]+1),X=(x[9]+1)/x[5],Y=(x[9]-1)/x[5],K=(x[8]-1)/x[0],me=(z[8]+1)/z[0],Ue=D*K,Ne=D*me,xe=O/(-K+me),Ge=xe*-K;if(E.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(Ge),A.translateZ(xe),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),x[10]===-1)A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let de=D+xe,ye=R+xe,_e=Ue-Ge,oe=Ne+(O-Ge),Mt=X*R/ye*de,ht=Y*R/ye*de;A.projectionMatrix.makePerspective(_e,oe,Mt,ht,de,ye),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(Z,N,q):Z.projectionMatrix.copy(N.projectionMatrix),V===null&&le.isPerspectiveCamera&&(V={camera:le,fov:le.fov,zoom:le.zoom}),(function(A,E,P){P===null?A.matrix.copy(E.matrixWorld):(A.matrix.copy(P.matrixWorld),A.matrix.invert(),A.matrix.multiply(E.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*go*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(le,Z,Te)},this.getCamera=function(){return Z},this.getFoveation=function(){if(d!==null||u!==null)return c},this.setFoveation=function(le){c=le,d!==null&&(d.fixedFoveation=le),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=le)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(Z)},this.getCameraTexture=function(le){return g[le]};let Se=null,pe=new pf;pe.setAnimationLoop(function(le,ie){if(h=ie.getViewerPose(l||a),m=ie,h!==null){let fe=h.views;u!==null&&(e.setRenderTargetFramebuffer(T,u.framebuffer),e.setRenderTarget(T));let Te=!1;fe.length!==Z.cameras.length&&(Z.cameras.length=0,Te=!0);for(let A=0;A<fe.length;A++){let E=fe[A],P=null;if(u!==null)P=u.getViewport(E);else{let x=p.getViewSubImage(d,E);P=x.viewport,A===0&&(e.setRenderTargetTextures(T,x.colorTexture,x.depthStencilTexture),e.setRenderTarget(T))}let O=B[A];O===void 0&&(O=new vn,O.layers.enable(A),O.viewport=new Dt,B[A]=O),O.matrix.fromArray(E.transform.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale),O.projectionMatrix.fromArray(E.projectionMatrix),O.projectionMatrixInverse.copy(O.projectionMatrix).invert(),O.viewport.set(P.x,P.y,P.width,P.height),A===0&&(Z.matrix.copy(O.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),Te===!0&&Z.cameras.push(O)}let Ee=r.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&f){p=n.getBinding();let A=p.getDepthInformation(fe[0]);A&&A.isValid&&A.texture&&v.init(A,r.renderState)}if(Ee&&Ee.includes("camera-access")&&f){e.state.unbindTexture(),p=n.getBinding();for(let A=0;A<fe.length;A++){let E=fe[A].camera;if(E){let P=g[E];P||(P=new ra,g[E]=P);let O=p.getCameraImage(E);P.sourceTexture=O}}}}for(let fe=0;fe<b.length;fe++){let Te=S[fe],Ee=b[fe];Te!==null&&Ee!==void 0&&Ee.update(Te,ie,l||a)}Se&&Se(le,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),m=null}),this.setAnimationLoop=function(le){Se=le},this.dispose=function(){}}},Ly=new rt,xf=new tt;function Ny(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===yn&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===yn&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(r.envMap.value=o,r.envMapRotation.value.setFromMatrix4(Ly.makeRotationFromEuler(c)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply(xf),r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,Wh(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,c){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(r,s):s.isMeshLambertMaterial?(n(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(r,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(r,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(l,h,p){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===yn&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.retroreflectivity>0&&(l.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=p.texture,l.transmissionSamplerSize.value.set(p.width,p.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(r,s,c)):s.isMeshMatcapMaterial?(n(r,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(l,h){let p=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(p.matrixWorld),l.nearDistance.value=p.shadow.camera.near,l.farDistance.value=p.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(l,h,p,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*p,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function Dy(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(d,u,m,f){if((function(v,g,_,M){let T=v.value,b=g+"_"+_;if(M[b]===void 0)return typeof T=="number"||typeof T=="boolean"?M[b]=T:ArrayBuffer.isView(T)?M[b]=T.slice():M[b]=T.clone(),!0;{let S=M[b];if(typeof T=="number"||typeof T=="boolean"){if(S!==T)return M[b]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(S.equals(T)===!1)return S.copy(T),!0}}return!1})(d,u,m,f)===!0){let v=d.__offset,g=d.value;if(Array.isArray(g)){let _=0;for(let M=0;M<g.length;M++){let T=g[M],b=h(T);l(T,d.__data,_),typeof T=="number"||typeof T=="boolean"||T.isMatrix3||ArrayBuffer.isView(T)||(_+=b.storage/Float32Array.BYTES_PER_ELEMENT)}}else l(g,d.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,d.__data)}}function l(d,u,m){typeof d=="number"||typeof d=="boolean"?u[0]=d:d.isMatrix3?(u[0]=d.elements[0],u[1]=d.elements[1],u[2]=d.elements[2],u[3]=0,u[4]=d.elements[3],u[5]=d.elements[4],u[6]=d.elements[5],u[7]=0,u[8]=d.elements[6],u[9]=d.elements[7],u[10]=d.elements[8],u[11]=0):ArrayBuffer.isView(d)?u.set(new d.constructor(d.buffer,d.byteOffset,u.length)):d.toArray(u,m)}function h(d){let u={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(u.boundary=4,u.storage=4):d.isVector2?(u.boundary=8,u.storage=8):d.isVector3||d.isColor?(u.boundary=16,u.storage=12):d.isVector4?(u.boundary=16,u.storage=16):d.isMatrix3?(u.boundary=48,u.storage=48):d.isMatrix4?(u.boundary=64,u.storage=64):d.isTexture?je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(d)?(u.boundary=16,u.storage=d.byteLength):je("WebGLRenderer: Unsupported uniform value type.",d),u}function p(d){let u=d.target;u.removeEventListener("dispose",p);let m=a.indexOf(u.__bindingPointIndex);a.splice(m,1),i.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}return{bind:function(d,u){let m=u.program;n.uniformBlockBinding(d,m)},update:function(d,u){let m=r[d.id];m===void 0&&((function(g){let _=g.uniforms,M=0,T=16;for(let S=0,I=_.length;S<I;S++){let U=Array.isArray(_[S])?_[S]:[_[S]];for(let V=0,N=U.length;V<N;V++){let q=U[V],B=Array.isArray(q.value)?q.value:[q.value];for(let Z=0,Q=B.length;Z<Q;Z++){let se=h(B[Z]),W=M%T,k=W%se.boundary,$=W+k;M+=k,$!==0&&T-$<se.storage&&(M+=T-$),q.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=M,M+=se.storage}}}let b=M%T;b>0&&(M+=T-b),g.__size=M,g.__cache={}})(d),m=(function(g){let _=(function(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=_;let M=i.createBuffer(),T=g.__size,b=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,T,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,M),M})(d),r[d.id]=m,d.addEventListener("dispose",p));let f=u.program;n.updateUBOMapping(d,f);let v=e.render.frame;s[d.id]!==v&&((function(g){let _=r[g.id],M=g.uniforms,T=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let b=0,S=M.length;b<S;b++){let I=M[b];if(Array.isArray(I))for(let U=0,V=I.length;U<V;U++)c(I[U],b,U,T);else c(I,b,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)})(d),s[d.id]=v)},dispose:function(){for(let d in r)i.deleteBuffer(r[d]);a=[],r={},s={}}}}xf.set(-1,0,0,0,1,0,0,0,1);var Uy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ri=null;function Oy(){return Ri===null&&(Ri=new wr(Uy,16,16,Ur,wi),Ri.name="DFG_LUT",Ri.minFilter=Sn,Ri.magFilter=Sn,Ri.wrapS=fl,Ri.wrapT=fl,Ri.generateMipmaps=!1,Ri.needsUpdate=!0),Ri}var Cl=class{constructor(e={}){let{canvas:t=Lp(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:u=di}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let f=u,v=new Set([ah,sh,rh]),g=new Set([di,pr,ba,Ss,nh,ih]),_=new Uint32Array(4),M=new Int32Array(4),T=new C,b=null,S=null,I=[],U=[],V=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,q=!1,B=null,Z=null,Q=null,se=null;this._outputColorSpace=Bh;let W=0,k=0,$=null,ue=-1,ce=null,re=new Dt,Se=new Dt,pe=null,le=new it(0),ie=0,fe=t.width,Te=t.height,Ee=1,A=null,E=null,P=new Dt(0,0,fe,Te),O=new Dt(0,0,fe,Te),x=!1,z=new cr,D=!1,R=!1,X=new rt,Y=new C,K=new Dt,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ue=!1;function Ne(){return $===null?Ee:1}let xe,Ge,de,ye,_e,oe,Mt,ht,xt,Rt,Le,yt,He,ut,st,Je,nt,wt,Ie,jt,Jt,un,Ki,H=n;function Pi(w,G){return t.getContext(w,G)}try{let w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",qe,!1),t.addEventListener("webglcontextcreationerror",pi,!1),H===null){let G="webgl2";if(H=Pi(G,w),H===null)throw Pi(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Yt()}catch(w){throw t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",qe,!1),t.removeEventListener("webglcontextcreationerror",pi,!1),Ze("WebGLRenderer: "+w.message),w}function Yt(){xe=new Wv(H),xe.init(),Jt=new Cy(H,xe),Ge=new Fv(H,xe,e,Jt),de=new Ay(H,xe),Ge.reversedDepthBuffer&&d&&de.buffers.depth.setReversed(!0),Z=H.createFramebuffer(),Q=H.createFramebuffer(),se=H.createFramebuffer(),ye=new jv(H),_e=new py,oe=new Ry(H,xe,de,_e,Ge,Jt,ye),Mt=new Hv(N),ht=new Kg(H),un=new Uv(H,ht),xt=new Xv(H,ht,ye,un),Rt=new $v(H,xt,ht,un,ye),wt=new Yv(H,Ge,oe),st=new Bv(_e),Le=new dy(N,Mt,xe,Ge,un,st),yt=new Ny(N,_e),He=new my,ut=new Sy(xe),nt=new Dv(N,Mt,de,Rt,m,c),Je=new wy(N,Rt,Ge),Ki=new Dy(H,ye,Ge,de),Ie=new Ov(H,xe,ye),jt=new qv(H,xe,ye),ye.programs=Le.programs,N.capabilities=Ge,N.extensions=xe,N.properties=_e,N.renderLists=He,N.shadowMap=Je,N.state=de,N.info=ye}f!==di&&(V=new Jv(f,t.width,t.height,o,r,s));let $e=new du(N,H);function pt(w){w.preventDefault(),Ys("WebGLRenderer: Context Lost."),q=!0}function qe(){Ys("WebGLRenderer: Context Restored."),q=!1;let w=ye.autoReset,G=Je.enabled,J=Je.autoUpdate,ne=Je.needsUpdate,ee=Je.type;Yt(),ye.autoReset=w,Je.enabled=G,Je.autoUpdate=J,Je.needsUpdate=ne,Je.type=ee}function pi(w){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Un(w){let G=w.target;G.removeEventListener("dispose",Un),(function(J){(function(ne){let ee=_e.get(ne).programs;ee!==void 0&&(ee.forEach(function(Me){Le.releaseProgram(Me)}),ne.isShaderMaterial&&Le.releaseShaderCache(ne))})(J),_e.remove(J)})(G)}function fi(w,G,J,ne){B!==null&&w.isNodeMaterial&&B.setObject(ne,w),D===!0&&st.setState(w,J,!1),w.transparent===!0&&w.side===Ti&&w.forceSinglePass===!1?(w.side=yn,w.needsUpdate=!0,Di(w,G,ne),w.side=vs,w.needsUpdate=!0,Di(w,G,ne),w.side=Ti):Di(w,G,ne)}this.xr=$e,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let w=xe.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=xe.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Ee},this.setPixelRatio=function(w){w!==void 0&&(Ee=w,this.setSize(fe,Te,!1))},this.getSize=function(w){return w.set(fe,Te)},this.setSize=function(w,G,J=!0){$e.isPresenting?je("WebGLRenderer: Can't change size while VR device is presenting."):(fe=w,Te=G,t.width=Math.floor(w*Ee),t.height=Math.floor(G*Ee),J===!0&&(t.style.width=w+"px",t.style.height=G+"px"),V!==null&&V.setSize(t.width,t.height),this.setViewport(0,0,w,G))},this.getDrawingBufferSize=function(w){return w.set(fe*Ee,Te*Ee).floor()},this.setDrawingBufferSize=function(w,G,J){fe=w,Te=G,Ee=J,t.width=Math.floor(w*J),t.height=Math.floor(G*J),this.setViewport(0,0,w,G)},this.setEffects=function(w){if(f!==di){if(w){for(let G=0;G<w.length;G++)if(w[G].isOutputPass===!0){je("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}V.setEffects(w||[])}else Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(w){return w.copy(re)},this.getViewport=function(w){return w.copy(P)},this.setViewport=function(w,G,J,ne){w.isVector4?P.set(w.x,w.y,w.z,w.w):P.set(w,G,J,ne),de.viewport(re.copy(P).multiplyScalar(Ee).round())},this.getScissor=function(w){return w.copy(O)},this.setScissor=function(w,G,J,ne){w.isVector4?O.set(w.x,w.y,w.z,w.w):O.set(w,G,J,ne),de.scissor(Se.copy(O).multiplyScalar(Ee).round())},this.getScissorTest=function(){return x},this.setScissorTest=function(w){de.setScissorTest(x=w)},this.setOpaqueSort=function(w){A=w},this.setTransparentSort=function(w){E=w},this.getClearColor=function(w){return w.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor(...arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha(...arguments)},this.clear=function(w=!0,G=!0,J=!0){let ne=0;if(w){let ee=!1;if($!==null){let Me=$.texture.format;ee=v.has(Me)}if(ee){let Me=$.texture.type,we=g.has(Me),Re=nt.getClearColor(),L=nt.getClearAlpha(),j=Re.r,he=Re.g,ge=Re.b;we?(_[0]=j,_[1]=he,_[2]=ge,_[3]=L,H.clearBufferuiv(H.COLOR,0,_)):(M[0]=j,M[1]=he,M[2]=ge,M[3]=L,H.clearBufferiv(H.COLOR,0,M))}else ne|=H.COLOR_BUFFER_BIT}G&&(ne|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(ne|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&H.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),B=w},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",qe,!1),t.removeEventListener("webglcontextcreationerror",pi,!1),nt.dispose(),He.dispose(),ut.dispose(),_e.dispose(),Mt.dispose(),Rt.dispose(),un.dispose(),Ki.dispose(),Le.dispose(),$e.dispose(),$e.removeEventListener("sessionstart",Ht),$e.removeEventListener("sessionend",Lt),Ct.stop()},this.renderBufferDirect=function(w,G,J,ne,ee,Me){G===null&&(G=me);let we=ee.isMesh&&ee.matrixWorld.determinantAffine()<0,Re=(function(Ve,dt,At,ke,Oe){dt.isScene!==!0&&(dt=me),oe.resetTextureUnits();let zt=dt.fog,bn=ke.isMeshStandardMaterial||ke.isMeshLambertMaterial||ke.isMeshPhongMaterial?dt.environment:null,mi=$===null?N.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:_t.workingColorSpace,jn=ke.isMeshStandardMaterial||ke.isMeshLambertMaterial&&!ke.envMap||ke.isMeshPhongMaterial&&!ke.envMap,Kt=Mt.get(ke.envMap||bn,jn),Tn=ke.vertexColors===!0&&!!At.attributes.color&&At.attributes.color.itemSize===4,on=!!At.attributes.tangent&&(!!ke.normalMap||ke.anisotropy>0),Oi=!!At.morphAttributes.position,gi=!!At.morphAttributes.normal,ti=!!At.morphAttributes.color,Yn=hi;ke.toneMapped&&($!==null&&$.isXRRenderTarget!==!0||(Yn=N.toneMapping));let Fi=At.morphAttributes.position||At.morphAttributes.normal||At.morphAttributes.color,En=Fi!==void 0?Fi.length:0,ze=_e.get(ke),wn=S.state.lights;if(D===!0&&(R===!0||Ve!==ce)){let Wt=Ve===ce&&ke.id===ue;st.setState(ke,Ve,Wt)}let qt=!1;ke.version===ze.__version?ze.needsLights&&ze.lightsStateVersion!==wn.state.version||ze.outputColorSpace!==mi||Oe.isBatchedMesh&&ze.batching===!1?qt=!0:Oe.isBatchedMesh||ze.batching!==!0?Oe.isBatchedMesh&&ze.batchingColor===!0&&Oe._colorsTexture===null||Oe.isBatchedMesh&&ze.batchingColor===!1&&Oe._colorsTexture!==null||Oe.isInstancedMesh&&ze.instancing===!1?qt=!0:Oe.isInstancedMesh||ze.instancing!==!0?Oe.isSkinnedMesh&&ze.skinning===!1?qt=!0:Oe.isSkinnedMesh||ze.skinning!==!0?Oe.isInstancedMesh&&ze.instancingColor===!0&&Oe.instanceColor===null||Oe.isInstancedMesh&&ze.instancingColor===!1&&Oe.instanceColor!==null||Oe.isInstancedMesh&&ze.instancingMorph===!0&&Oe.morphTexture===null||Oe.isInstancedMesh&&ze.instancingMorph===!1&&Oe.morphTexture!==null||ze.envMap!==Kt||ke.fog===!0&&ze.fog!==zt?qt=!0:ze.numClippingPlanes===void 0||ze.numClippingPlanes===st.numPlanes&&ze.numIntersection===st.numIntersection?(ze.vertexAlphas!==Tn||ze.vertexTangents!==on||ze.morphTargets!==Oi||ze.morphNormals!==gi||ze.morphColors!==ti||ze.toneMapping!==Yn||ze.morphTargetsCount!==En||!!ze.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(qt=!0):qt=!0:qt=!0:qt=!0:qt=!0:(qt=!0,ze.__version=ke.version);let ln=ze.currentProgram;qt===!0&&(ln=Di(ke,dt,Oe),B&&ke.isNodeMaterial&&B.onUpdateProgram(ke,ln,ze));let Ce=!1,mt=!1,nn=!1,bt=ln.getUniforms(),Qt=ze.uniforms;if(de.useProgram(ln.program)&&(Ce=!0,mt=!0,nn=!0),ke.id!==ue&&(ue=ke.id,mt=!0),ze.needsLights){let Wt=(function(Fn,Is){if(Fn.length===0)return null;if(Fn.length===1)return Fn[0].texture!==null?Fn[0]:null;T.setFromMatrixPosition(Is.matrixWorld);for(let _i=0,Pa=Fn.length;_i<Pa;_i++){let Ps=Fn[_i];if(Ps.texture!==null&&Ps.boundingBox.containsPoint(T))return Ps}return null})(S.state.lightProbeGridArray,Oe);ze.lightProbeGrid!==Wt&&(ze.lightProbeGrid=Wt,mt=!0)}if(Ce||ce!==Ve){de.buffers.depth.getReversed()&&Ve.reversedDepth!==!0&&(Ve._reversedDepth=!0,Ve.updateProjectionMatrix()),bt.setValue(H,"projectionMatrix",Ve.projectionMatrix),bt.setValue(H,"viewMatrix",Ve.matrixWorldInverse);let Wt=bt.map.cameraPosition;Wt!==void 0&&Wt.setValue(H,Y.setFromMatrixPosition(Ve.matrixWorld)),Ge.logarithmicDepthBuffer&&bt.setValue(H,"logDepthBufFC",2/(Math.log(Ve.far+1)/Math.LN2)),(ke.isMeshPhongMaterial||ke.isMeshToonMaterial||ke.isMeshLambertMaterial||ke.isMeshBasicMaterial||ke.isMeshStandardMaterial||ke.isShaderMaterial)&&bt.setValue(H,"isOrthographic",Ve.isOrthographicCamera===!0),ce!==Ve&&(ce=Ve,mt=!0,nn=!0)}if(ze.needsLights&&(wn.state.sunShadowMap.length>0&&bt.setValue(H,"sunShadowMap",wn.state.sunShadowMap,oe),wn.state.directionalShadowMap.length>0&&bt.setValue(H,"directionalShadowMap",wn.state.directionalShadowMap,oe),wn.state.spotShadowMap.length>0&&bt.setValue(H,"spotShadowMap",wn.state.spotShadowMap,oe),wn.state.pointShadowMap.length>0&&bt.setValue(H,"pointShadowMap",wn.state.pointShadowMap,oe)),Oe.isSkinnedMesh){bt.setOptional(H,Oe,"bindMatrix"),bt.setOptional(H,Oe,"bindMatrixInverse");let Wt=Oe.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),bt.setValue(H,"boneTexture",Wt.boneTexture,oe))}Oe.isBatchedMesh&&(bt.setOptional(H,Oe,"batchingTexture"),bt.setValue(H,"batchingTexture",Oe._matricesTexture,oe),bt.setOptional(H,Oe,"batchingIdTexture"),bt.setValue(H,"batchingIdTexture",Oe._indirectTexture,oe),bt.setOptional(H,Oe,"batchingColorTexture"),Oe._colorsTexture!==null&&bt.setValue(H,"batchingColorTexture",Oe._colorsTexture,oe));let gr=At.morphAttributes;if(gr.position===void 0&&gr.normal===void 0&&gr.color===void 0||wt.update(Oe,At,ln),(mt||ze.receiveShadow!==Oe.receiveShadow)&&(ze.receiveShadow=Oe.receiveShadow,bt.setValue(H,"receiveShadow",Oe.receiveShadow)),(ke.isMeshStandardMaterial||ke.isMeshLambertMaterial||ke.isMeshPhongMaterial)&&ke.envMap===null&&dt.environment!==null&&(Qt.envMapIntensity.value=dt.environmentIntensity),Qt.dfgLUT!==void 0&&(Qt.dfgLUT.value=Oy()),mt){if(bt.setValue(H,"toneMappingExposure",N.toneMappingExposure),ze.needsLights&&(cn=nn,(An=Qt).ambientLightColor.needsUpdate=cn,An.lightProbe.needsUpdate=cn,An.sunLights.needsUpdate=cn,An.sunLightShadows.needsUpdate=cn,An.directionalLights.needsUpdate=cn,An.directionalLightShadows.needsUpdate=cn,An.pointLights.needsUpdate=cn,An.pointLightShadows.needsUpdate=cn,An.spotLights.needsUpdate=cn,An.spotLightShadows.needsUpdate=cn,An.rectAreaLights.needsUpdate=cn,An.hemisphereLights.needsUpdate=cn),zt&&ke.fog===!0&&yt.refreshFogUniforms(Qt,zt),yt.refreshMaterialUniforms(Qt,ke,Ee,Te,S.state.transmissionRenderTarget[Ve.id]),ze.needsLights&&ze.lightProbeGrid){let Wt=ze.lightProbeGrid;Qt.probesSH.value=Wt.texture,Qt.probesMin.value.copy(Wt.boundingBox.min),Qt.probesMax.value.copy(Wt.boundingBox.max),Qt.probesResolution.value.copy(Wt.resolution)}bs.upload(H,Ui(ze),Qt,oe)}var An,cn;if(ke.isShaderMaterial&&ke.uniformsNeedUpdate===!0&&(bs.upload(H,Ui(ze),Qt,oe),ke.uniformsNeedUpdate=!1),ke.isSpriteMaterial&&bt.setValue(H,"center",Oe.center),bt.setValue(H,"modelViewMatrix",Oe.modelViewMatrix),bt.setValue(H,"normalMatrix",Oe.normalMatrix),bt.setValue(H,"modelMatrix",Oe.matrixWorld),ke.uniformsGroups!==void 0){let Wt=ke.uniformsGroups;for(let Fn=0,Is=Wt.length;Fn<Is;Fn++){let _i=Wt[Fn];Ki.update(_i,ln),Ki.bind(_i,ln)}}return ln})(w,G,J,ne,ee);de.setMaterial(ne,we);let L=J.index,j=1;if(ne.wireframe===!0){if(L=xt.getWireframeAttribute(J),L===void 0)return;j=2}let he=J.drawRange,ge=J.attributes.position,be=he.start*j,Fe=(he.start+he.count)*j;Me!==null&&(be=Math.max(be,Me.start*j),Fe=Math.min(Fe,(Me.start+Me.count)*j)),L!==null?(be=Math.max(be,0),Fe=Math.min(Fe,L.count)):ge!=null&&(be=Math.max(be,0),Fe=Math.min(Fe,ge.count));let Be=Fe-be;if(Be<0||Be===1/0)return;let De;un.setup(ee,ne,Re,J,L);let Qe=Ie;if(L!==null&&(De=ht.get(L),Qe=jt,Qe.setIndex(De)),ee.isMesh)ne.wireframe===!0?(de.setLineWidth(ne.wireframeLinewidth*Ne()),Qe.setMode(H.LINES)):Qe.setMode(H.TRIANGLES);else if(ee.isLine){let Ve=ne.linewidth;Ve===void 0&&(Ve=1),de.setLineWidth(Ve*Ne()),ee.isLineSegments?Qe.setMode(H.LINES):ee.isLineLoop?Qe.setMode(H.LINE_LOOP):Qe.setMode(H.LINE_STRIP)}else ee.isPoints?Qe.setMode(H.POINTS):ee.isSprite&&Qe.setMode(H.TRIANGLES);if(ee.isBatchedMesh)if(xe.get("WEBGL_multi_draw"))Qe.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else{let Ve=ee._multiDrawStarts,dt=ee._multiDrawCounts,At=ee._multiDrawCount,ke=L?ht.get(L).bytesPerElement:1,Oe=_e.get(ne).currentProgram.getUniforms();for(let zt=0;zt<At;zt++)Oe.setValue(H,"_gl_DrawID",zt),Qe.render(Ve[zt]/ke,dt[zt])}else if(ee.isInstancedMesh)Qe.renderInstances(be,Be,ee.count);else if(J.isInstancedBufferGeometry){let Ve=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,dt=Math.min(J.instanceCount,Ve);Qe.renderInstances(be,Be,dt)}else Qe.render(be,Be)},this.compile=function(w,G,J=null){J===null&&(J=w),B!==null&&B.renderStart(w,G,J),S=ut.get(J),S.init(G),U.push(S),J.traverseVisible(function(ee){ee.isLight&&ee.layers.test(G.layers)&&(S.pushLight(ee),ee.castShadow&&S.pushShadow(ee))}),w!==J&&w.traverseVisible(function(ee){ee.isLight&&ee.layers.test(G.layers)&&(S.pushLight(ee),ee.castShadow&&S.pushShadow(ee))}),S.setupLights(),B!==null&&B.updateLights(S.state.lightsArray),R=this.localClippingEnabled,D=st.init(this.clippingPlanes,R),D===!0&&st.setGlobalState(this.clippingPlanes,G),B!==null&&Je.render(S.state.shadowsArray,J,G);let ne=new Set;return w.traverse(function(ee){if(!(ee.isMesh||ee.isPoints||ee.isLine||ee.isSprite))return;let Me=ee.material;if(Me)if(Array.isArray(Me))for(let we=0;we<Me.length;we++){let Re=Me[we];fi(Re,J,G,ee),ne.add(Re)}else fi(Me,J,G,ee),ne.add(Me)}),S=U.pop(),B!==null&&B.renderEnd(),ne},this.compileAsync=function(w,G,J=null){let ne=this.compile(w,G,J);return new Promise(ee=>{function Me(){ne.forEach(function(we){let Re=_e.get(we).currentProgram;(Re===void 0||Re.isReady())&&ne.delete(we)}),ne.size!==0?setTimeout(Me,10):ee(w)}xe.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let dn=null;function Ht(){Ct.stop()}function Lt(){Ct.start()}let Ct=new pf;function Gt(w,G,J,ne){if(w.visible===!1)return;if(w.layers.test(G.layers)){if(w.isGroup)J=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(G);else if(w.isLightProbeGrid)S.pushLightProbeGrid(w);else if(w.isLight)S.pushLight(w),w.castShadow&&S.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(z)){ne&&K.setFromMatrixPosition(w.matrixWorld).applyMatrix4(X);let Me=Rt.update(w),we=w.material;we.visible&&b.push(w,Me,we,J,K.z,null,G)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(z))){let Me=Rt.update(w),we=w.material;if(ne&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),K.copy(w.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),K.copy(Me.boundingSphere.center)),K.applyMatrix4(w.matrixWorld).applyMatrix4(X)),Array.isArray(we)){let Re=Me.groups;for(let L=0,j=Re.length;L<j;L++){let he=Re[L],ge=we[he.materialIndex];ge&&ge.visible&&b.push(w,Me,ge,J,K.z,he,G)}}else we.visible&&b.push(w,Me,we,J,K.z,null,G)}}let ee=w.children;for(let Me=0,we=ee.length;Me<we;Me++)Gt(ee[Me],G,J,ne)}function pn(w,G,J,ne){let{opaque:ee,transmissive:Me,transparent:we}=w;S.setupLightsView(J),D===!0&&st.setGlobalState(N.clippingPlanes,J),ne&&de.viewport(re.copy(ne)),ee.length>0&&kn(ee,G,J),Me.length>0&&kn(Me,G,J),we.length>0&&kn(we,G,J),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function Li(w,G,J,ne){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[ne.id]===void 0){let ge=xe.has("EXT_color_buffer_half_float")||xe.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[ne.id]=new Vn(1,1,{generateMipmaps:!0,type:ge?wi:di,minFilter:Lr,samples:Math.max(4,Ge.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_t.workingColorSpace})}let ee=S.state.transmissionRenderTarget[ne.id],Me=ne.viewport||re;ee.setSize(Me.z*N.transmissionResolutionScale,Me.w*N.transmissionResolutionScale);let we=N.getRenderTarget(),Re=N.getActiveCubeFace(),L=N.getActiveMipmapLevel();N.setRenderTarget(ee),N.getClearColor(le),ie=N.getClearAlpha(),ie<1&&N.setClearColor(16777215,.5),N.clear(),Ue&&nt.render(J);let j=N.toneMapping;N.toneMapping=hi;let he=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),S.setupLightsView(ne),D===!0&&st.setGlobalState(N.clippingPlanes,ne),kn(w,J,ne),oe.updateMultisampleRenderTarget(ee),oe.updateRenderTargetMipmap(ee),xe.has("WEBGL_multisampled_render_to_texture")===!1){let ge=!1;for(let be=0,Fe=G.length;be<Fe;be++){let Be=G[be],{object:De,geometry:Qe,material:Ve,group:dt}=Be;if(Ve.side===Ti&&De.layers.test(ne.layers)){let At=Ve.side;Ve.side=yn,Ve.needsUpdate=!0,Ni(De,J,ne,Qe,Ve,dt),Ve.side=At,Ve.needsUpdate=!0,ge=!0}}ge===!0&&(oe.updateMultisampleRenderTarget(ee),oe.updateRenderTargetMipmap(ee))}N.setRenderTarget(we,Re,L),N.setClearColor(le,ie),he!==void 0&&(ne.viewport=he),N.toneMapping=j}function kn(w,G,J){let ne=G.isScene===!0?G.overrideMaterial:null;for(let ee=0,Me=w.length;ee<Me;ee++){let we=w[ee],{object:Re,geometry:L,group:j}=we,he=we.material;he.allowOverride===!0&&ne!==null&&(he=ne),Re.layers.test(J.layers)&&Ni(Re,G,J,L,he,j)}}function Ni(w,G,J,ne,ee,Me){B!==null&&ee.isNodeMaterial&&B.setObject(w,ee),w.onBeforeRender(N,G,J,ne,ee,Me),w.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),ee.onBeforeRender(N,G,J,ne,w,Me),ee.transparent===!0&&ee.side===Ti&&ee.forceSinglePass===!1?(ee.side=yn,ee.needsUpdate=!0,N.renderBufferDirect(J,G,ne,ee,w,Me),ee.side=vs,ee.needsUpdate=!0,N.renderBufferDirect(J,G,ne,ee,w,Me),ee.side=Ti):N.renderBufferDirect(J,G,ne,ee,w,Me),w.onAfterRender(N,G,J,ne,ee,Me)}function Di(w,G,J){G.isScene!==!0&&(G=me);let ne=_e.get(w),ee=S.state.lights,Me=S.state.shadowsArray,we=ee.state.version,Re=Le.getParameters(w,ee.state,Me,G,J,S.state.lightProbeGridArray),L=Le.getProgramCacheKey(Re),j=ne.programs;ne.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?G.environment:null,ne.fog=G.fog;let he=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;ne.envMap=Mt.get(w.envMap||ne.environment,he),ne.envMapRotation=ne.environment!==null&&w.envMap===null?G.environmentRotation:w.envMapRotation,j===void 0&&(w.addEventListener("dispose",Un),j=new Map,ne.programs=j);let ge=j.get(L);if(ge!==void 0){if(ne.currentProgram===ge&&ne.lightsStateVersion===we)return ei(w,Re),ge}else Re.uniforms=Le.getUniforms(w),B!==null&&w.isNodeMaterial&&B.build(w,J,Re),w.onBeforeCompile(Re,N),ge=Le.acquireProgram(Re,L),j.set(L,ge),ne.uniforms=Re.uniforms;let be=ne.uniforms;return(w.isShaderMaterial||w.isRawShaderMaterial)&&w.clipping!==!0||(be.clippingPlanes=st.uniform),ei(w,Re),ne.needsLights=(function(Fe){return Fe.isMeshLambertMaterial||Fe.isMeshToonMaterial||Fe.isMeshPhongMaterial||Fe.isMeshStandardMaterial||Fe.isShadowMaterial||Fe.isShaderMaterial&&Fe.lights===!0})(w),ne.lightsStateVersion=we,ne.needsLights&&(be.ambientLightColor.value=ee.state.ambient,be.lightProbe.value=ee.state.probe,be.sunLights.value=ee.state.sun,be.sunLightShadows.value=ee.state.sunShadow,be.directionalLights.value=ee.state.directional,be.directionalLightShadows.value=ee.state.directionalShadow,be.spotLights.value=ee.state.spot,be.spotLightShadows.value=ee.state.spotShadow,be.rectAreaLights.value=ee.state.rectArea,be.ltc_1.value=ee.state.rectAreaLTC1,be.ltc_2.value=ee.state.rectAreaLTC2,be.pointLights.value=ee.state.point,be.pointLightShadows.value=ee.state.pointShadow,be.hemisphereLights.value=ee.state.hemi,be.sunShadowMatrix.value=ee.state.sunShadowMatrix,be.sunShadowCascade.value=ee.state.sunShadowCascade,be.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,be.spotLightMatrix.value=ee.state.spotLightMatrix,be.spotLightMap.value=ee.state.spotLightMap,be.pointShadowMatrix.value=ee.state.pointShadowMatrix),ne.lightProbeGrid=S.state.lightProbeGridArray.length>0,ne.currentProgram=ge,ne.uniformsList=null,ge}function Ui(w){if(w.uniformsList===null){let G=w.currentProgram.getUniforms();w.uniformsList=bs.seqWithValue(G.seq,w.uniforms)}return w.uniformsList}function ei(w,G){let J=_e.get(w);J.outputColorSpace=G.outputColorSpace,J.batching=G.batching,J.batchingColor=G.batchingColor,J.instancing=G.instancing,J.instancingColor=G.instancingColor,J.instancingMorph=G.instancingMorph,J.skinning=G.skinning,J.morphTargets=G.morphTargets,J.morphNormals=G.morphNormals,J.morphColors=G.morphColors,J.morphTargetsCount=G.morphTargetsCount,J.numClippingPlanes=G.numClippingPlanes,J.numIntersection=G.numClipIntersection,J.vertexAlphas=G.vertexAlphas,J.vertexTangents=G.vertexTangents,J.toneMapping=G.toneMapping}function On(w){let G=_e.get(w);return G.__readFormat===w.format&&G.__readType===w.type||(G.__readFormat=w.format,G.__readType=w.type,G.__formatReadable=Ge.textureFormatReadable(w.format),G.__typeReadable=Ge.textureTypeReadable(w.type)),G}Ct.setAnimationLoop(function(w){dn&&dn(w)}),typeof self<"u"&&Ct.setContext(self),this.setAnimationLoop=function(w){dn=w,$e.setAnimationLoop(w),w===null?Ct.stop():Ct.start()},$e.addEventListener("sessionstart",Ht),$e.addEventListener("sessionend",Lt),this.render=function(w,G){if(G!==void 0&&G.isCamera!==!0)return void Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(q===!0)return;B!==null&&B.renderStart(w,G);let J=$e.enabled===!0&&$e.isPresenting===!0,ne=V!==null&&($===null||J)&&V.begin(N,$);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),$e.enabled!==!0||$e.isPresenting!==!0||V!==null&&V.isCompositing()!==!1||($e.cameraAutoUpdate===!0&&$e.updateCamera(G),G=$e.getCamera()),w.isScene===!0&&w.onBeforeRender(N,w,G,$),S=ut.get(w,U.length),S.init(G),S.state.textureUnits=oe.getTextureUnits(),U.push(S),X.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),z.setFromProjectionMatrix(X,Gh,G.reversedDepth),R=this.localClippingEnabled,D=st.init(this.clippingPlanes,R),b=He.get(w,I.length),b.init(),I.push(b),$e.enabled===!0&&$e.isPresenting===!0){let Me=N.xr.getDepthSensingMesh();Me!==null&&Gt(Me,G,-1/0,N.sortObjects)}Gt(w,G,0,N.sortObjects),b.finish(),B!==null&&B.updateLights(S.state.lightsArray),N.sortObjects===!0&&b.sort(A,E),Ue=$e.enabled===!1||$e.isPresenting===!1||$e.hasDepthSensing()===!1,Ue&&nt.addToRenderList(b,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),D===!0&&st.beginShadows();let ee=S.state.shadowsArray;if(Je.render(ee,w,G),D===!0&&st.endShadows(),(ne&&V.hasRenderPass())===!1){let Me=b.opaque,we=b.transmissive;if(S.setupLights(),G.isArrayCamera){let Re=G.cameras;if(we.length>0)for(let L=0,j=Re.length;L<j;L++)Li(Me,we,w,Re[L]);Ue&&nt.render(w);for(let L=0,j=Re.length;L<j;L++){let he=Re[L];pn(b,w,he,he.viewport)}}else we.length>0&&Li(Me,we,w,G),Ue&&nt.render(w),pn(b,w,G)}$!==null&&k===0&&(oe.updateMultisampleRenderTarget($),oe.updateRenderTargetMipmap($)),ne&&V.end(N),w.isScene===!0&&w.onAfterRender(N,w,G),un.resetDefaultState(),ue=-1,ce=null,U.pop(),U.length>0?(S=U[U.length-1],oe.setTextureUnits(S.state.textureUnits),D===!0&&st.setGlobalState(N.clippingPlanes,S.state.camera)):S=null,I.pop(),b=I.length>0?I[I.length-1]:null,B!==null&&B.renderEnd()},this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(w,G,J){let ne=_e.get(w);ne.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),_e.get(w.texture).__webglTexture=G,_e.get(w.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:J,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,G){let J=_e.get(w);J.__webglFramebuffer=G,J.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(w,G=0,J=0){$=w,W=G,k=J;let ne=null,ee=!1,Me=!1;if(w){let we=_e.get(w);if(we.__useDefaultFramebuffer!==void 0)return de.bindFramebuffer(H.FRAMEBUFFER,we.__webglFramebuffer),re.copy(w.viewport),Se.copy(w.scissor),pe=w.scissorTest,de.viewport(re),de.scissor(Se),de.setScissorTest(pe),void(ue=-1);if(we.__webglFramebuffer===void 0)oe.setupRenderTarget(w);else if(we.__hasExternalTextures)oe.rebindTextures(w,_e.get(w.texture).__webglTexture,_e.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let j=w.depthTexture;if(we.__boundDepthTexture!==j){if(j!==null&&_e.has(j)&&(w.width!==j.image.width||w.height!==j.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");oe.setupDepthRenderbuffer(w)}}let Re=w.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(Me=!0);let L=_e.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(ne=Array.isArray(L[G])?L[G][J]:L[G],ee=!0):ne=w.samples>0&&oe.useMultisampledRTT(w)===!1?_e.get(w).__webglMultisampledFramebuffer:Array.isArray(L)?L[J]:L,re.copy(w.viewport),Se.copy(w.scissor),pe=w.scissorTest}else re.copy(P).multiplyScalar(Ee).floor(),Se.copy(O).multiplyScalar(Ee).floor(),pe=x;if(J!==0&&(ne=Z),de.bindFramebuffer(H.FRAMEBUFFER,ne)&&de.drawBuffers(w,ne),de.viewport(re),de.scissor(Se),de.setScissorTest(pe),ee){let we=_e.get(w.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+G,we.__webglTexture,J)}else if(Me){let we=G;for(let Re=0;Re<w.textures.length;Re++){let L=_e.get(w.textures[Re]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Re,L.__webglTexture,J,we)}}else if(w!==null&&J!==0){let we=_e.get(w.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,we.__webglTexture,J)}ue=-1},this.readRenderTargetPixels=function(w,G,J,ne,ee,Me,we,Re=0){if(!w||!w.isWebGLRenderTarget)return void Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let L=_e.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&we!==void 0&&(L=L[we]),L){de.bindFramebuffer(H.FRAMEBUFFER,L);try{let j=w.textures[Re],he=j.format,ge=j.type;w.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Re);let be=On(j);if(be.__formatReadable===!1)return void Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(be.__typeReadable===!1)return void Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");G>=0&&G<=w.width-ne&&J>=0&&J<=w.height-ee&&H.readPixels(G,J,ne,ee,Jt.convert(he),Jt.convert(ge),Me)}finally{let j=$!==null?_e.get($).__webglFramebuffer:null;de.bindFramebuffer(H.FRAMEBUFFER,j)}}},this.readRenderTargetPixelsAsync=async function(w,G,J,ne,ee,Me,we,Re=0){if(!w||!w.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let L=_e.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&we!==void 0&&(L=L[we]),L){if(G>=0&&G<=w.width-ne&&J>=0&&J<=w.height-ee){de.bindFramebuffer(H.FRAMEBUFFER,L);let j=w.textures[Re],he=j.format,ge=j.type;w.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Re);let be=On(j);if(be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Fe=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Fe),H.bufferData(H.PIXEL_PACK_BUFFER,Me.byteLength,H.STREAM_READ),H.readPixels(G,J,ne,ee,Jt.convert(he),Jt.convert(ge),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);let Be=$!==null?_e.get($).__webglFramebuffer:null;de.bindFramebuffer(H.FRAMEBUFFER,Be);let De=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Dp(H,De,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Fe),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Me),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(Fe),H.deleteSync(De),Me}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,G=null,J=0){let ne=Math.pow(2,-J),ee=Math.floor(w.image.width*ne),Me=Math.floor(w.image.height*ne),we=G!==null?G.x:0,Re=G!==null?G.y:0;oe.setTexture2D(w,0),H.copyTexSubImage2D(H.TEXTURE_2D,J,0,0,we,Re,ee,Me),de.unbindTexture()},this.copyTextureToTexture=function(w,G,J=null,ne=null,ee=0,Me=0){let we,Re,L,j,he,ge,be,Fe,Be,De=w.isCompressedTexture?w.mipmaps[Me]:w.image;if(J!==null)we=J.max.x-J.min.x,Re=J.max.y-J.min.y,L=J.isBox3?J.max.z-J.min.z:1,j=J.min.x,he=J.min.y,ge=J.isBox3?J.min.z:0;else{let Kt=Math.pow(2,-ee);we=Math.floor(De.width*Kt),Re=Math.floor(De.height*Kt),L=w.isDataArrayTexture?De.depth:w.isData3DTexture?Math.floor(De.depth*Kt):1,j=0,he=0,ge=0}ne!==null?(be=ne.x,Fe=ne.y,Be=ne.z):(be=0,Fe=0,Be=0);let Qe=Jt.convert(G.format),Ve=Jt.convert(G.type),dt;G.isData3DTexture?(oe.setTexture3D(G,0),dt=H.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(oe.setTexture2DArray(G,0),dt=H.TEXTURE_2D_ARRAY):(oe.setTexture2D(G,0),dt=H.TEXTURE_2D),de.activeTexture(H.TEXTURE0),de.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,G.flipY),de.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),de.pixelStorei(H.UNPACK_ALIGNMENT,G.unpackAlignment);let At=de.getParameter(H.UNPACK_ROW_LENGTH),ke=de.getParameter(H.UNPACK_IMAGE_HEIGHT),Oe=de.getParameter(H.UNPACK_SKIP_PIXELS),zt=de.getParameter(H.UNPACK_SKIP_ROWS),bn=de.getParameter(H.UNPACK_SKIP_IMAGES);de.pixelStorei(H.UNPACK_ROW_LENGTH,De.width),de.pixelStorei(H.UNPACK_IMAGE_HEIGHT,De.height),de.pixelStorei(H.UNPACK_SKIP_PIXELS,j),de.pixelStorei(H.UNPACK_SKIP_ROWS,he),de.pixelStorei(H.UNPACK_SKIP_IMAGES,ge);let mi=w.isDataArrayTexture||w.isData3DTexture,jn=G.isDataArrayTexture||G.isData3DTexture;if(w.isDepthTexture){let Kt=_e.get(w),Tn=_e.get(G),on=_e.get(Kt.__renderTarget),Oi=_e.get(Tn.__renderTarget);de.bindFramebuffer(H.READ_FRAMEBUFFER,on.__webglFramebuffer),de.bindFramebuffer(H.DRAW_FRAMEBUFFER,Oi.__webglFramebuffer);for(let gi=0;gi<L;gi++)mi&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,_e.get(w).__webglTexture,ee,ge+gi),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,_e.get(G).__webglTexture,Me,Be+gi)),H.blitFramebuffer(j,he,we,Re,be,Fe,we,Re,H.DEPTH_BUFFER_BIT,H.NEAREST);de.bindFramebuffer(H.READ_FRAMEBUFFER,null),de.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(ee!==0||w.isRenderTargetTexture||_e.has(w)){let Kt=_e.get(w),Tn=_e.get(G);de.bindFramebuffer(H.READ_FRAMEBUFFER,Q),de.bindFramebuffer(H.DRAW_FRAMEBUFFER,se);for(let on=0;on<L;on++)mi?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Kt.__webglTexture,ee,ge+on):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Kt.__webglTexture,ee),jn?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Tn.__webglTexture,Me,Be+on):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Tn.__webglTexture,Me),ee!==0?H.blitFramebuffer(j,he,we,Re,be,Fe,we,Re,H.COLOR_BUFFER_BIT,H.NEAREST):jn?H.copyTexSubImage3D(dt,Me,be,Fe,Be+on,j,he,we,Re):H.copyTexSubImage2D(dt,Me,be,Fe,j,he,we,Re);de.bindFramebuffer(H.READ_FRAMEBUFFER,null),de.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else jn?w.isDataTexture||w.isData3DTexture?H.texSubImage3D(dt,Me,be,Fe,Be,we,Re,L,Qe,Ve,De.data):G.isCompressedArrayTexture?H.compressedTexSubImage3D(dt,Me,be,Fe,Be,we,Re,L,Qe,De.data):H.texSubImage3D(dt,Me,be,Fe,Be,we,Re,L,Qe,Ve,De):w.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Me,be,Fe,we,Re,Qe,Ve,De.data):w.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Me,be,Fe,De.width,De.height,Qe,De.data):H.texSubImage2D(H.TEXTURE_2D,Me,be,Fe,we,Re,Qe,Ve,De);de.pixelStorei(H.UNPACK_ROW_LENGTH,At),de.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ke),de.pixelStorei(H.UNPACK_SKIP_PIXELS,Oe),de.pixelStorei(H.UNPACK_SKIP_ROWS,zt),de.pixelStorei(H.UNPACK_SKIP_IMAGES,bn),Me===0&&G.generateMipmaps&&H.generateMipmap(dt),de.unbindTexture()},this.initRenderTarget=function(w){_e.get(w).__webglFramebuffer===void 0&&oe.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?oe.setTextureCube(w,0):w.isData3DTexture?oe.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?oe.setTexture2DArray(w,0):oe.setTexture2D(w,0),de.unbindTexture()},this.resetState=function(){W=0,k=0,$=null,de.reset(),un.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gh}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}};var Es={normal:1,related:.85,weak:.5,quiet:.3,away:.1},Fy=3,fu=i=>i.normalize("NFD").replace(/\p{M}/gu,"").toLowerCase();function mu(i,e,t=8){let n=fu(e).split(/\s+/).filter(Boolean);return n.length?i.map(r=>{let s=fu(r.title),a=fu(`${r.title} ${r.body} ${r.extra}`);if(!n.every(c=>a.includes(c)))return null;let o=n.reduce((c,l)=>c+(s.startsWith(l)?3:s.includes(l)?2:1),0)+r.weight*.1;return{item:r,score:o}}).filter(Boolean).sort((r,s)=>s.score-r.score||r.item.order-s.item.order).slice(0,t).map(({item:r})=>r):[]}function gu(i,e){let t=i[e],n=new Map(i.map((a,o)=>[a.id,o])),r=new Set(t.links.filter(a=>n.has(a)&&a!==t.id).map(a=>n.get(a)));i.forEach((a,o)=>o!==e&&a.links.includes(t.id)&&r.add(o));let s=new Set;for(let[a,o]of Object.entries(t.members))for(let c of o){let l=i.map((p,d)=>p.members[a]?.includes(c)?d:-1).filter(p=>p>=0),h=l.indexOf(e);for(let p of[l[h-1],l[h+1]])p!==void 0&&!r.has(p)&&s.add(p)}return{links:[...r].sort((a,o)=>a-o),near:[...s].sort((a,o)=>a-o)}}function _u(i,e,t=Fy){let n=i[e],{links:r,near:s}=gu(i,e),a=new Set(r),o=l=>Object.entries(n.members).reduce((h,[p,d])=>h+d.filter(u=>l.members[p]?.includes(u)).length,0),c=l=>(a.has(l)?100:0)+o(i[l])*10+1/(1+Math.abs(i[l].year-n.year));return[...r,...s].sort((l,h)=>c(h)-c(l)||l-h).slice(0,t)}function Mf(i,e,t=null){if(!t)return{previous:e>0?e-1:null,next:e<i.length-1?e+1:null};let n=Ll(i,t),r=n.indexOf(e);return r<0?{previous:n.findLast(s=>s<e)??null,next:n.find(s=>s>e)??null}:{previous:n[r-1]??null,next:n[r+1]??null}}function bf(i,e,t,n,r=3){let s=zi.flatMap(a=>(e[a]??[]).map((o,c)=>({facet:a,item:c,title:t[a]?.[o]??o,body:"",extra:"",count:Ll(i,{facet:a,item:c}).length}))).filter(a=>a.count>0);return mu(s.map((a,o)=>({...a,weight:Math.min(3,a.count/4),order:o})),n,r)}function Tf(i,{selected:e=-1,near:t=new Set,weak:n=new Set,filter:r=null}){return i.map((s,a)=>{let o=Es.normal;return e>=0&&(o=a===e?1:t.has(a)?Es.related:n.has(a)?Es.weak:Es.quiet),r&&!(s.members[r.facet]??[]).includes(r.item)&&(o=a===e?1:Math.min(o,Es.away)),o})}var Ef=(i,e)=>i.map((t,n)=>e.has(n)?1:Es.quiet),wf=(i,e)=>[...i].map(t=>[t,e,!0]),Ll=(i,e)=>e?i.map((t,n)=>(t.members[e.facet]??[]).includes(e.item)?n:-1).filter(t=>t>=0):[];function Af(i,e){let t=[];return e.forEach((n,r)=>r>0&&t.push([e[r-1],n,i[e[r-1]].period!==i[n].period])),t}function Rf(i,e,t){let n=new Array(t).fill(0);for(let r of e)i[r].period>=0&&n[i[r].period]++;return n}var By=10,zy=3,Vy=8,yf=[[1,0],[-1,0],[0,1],[0,-1]],Sf=[[1,1],[-1,1],[1,-1],[-1,-1]];function Cf({x:i,y:e,r:t},{width:n,height:r},s,a=12){let o=t+By,c=(d,u,m,f)=>{let v=u===0?i+d*m-(d<0?n:0):Math.min(Math.max(i-n/2,a),s-n-a),g=u===0?e-r/2:u>0?e+m-2:e-m+2-r;return{left:v,right:v+n,top:g,bottom:g+r,far:f}},l=(d,u,m,f)=>{let v=i+d*m-(d<0?n:0),g=e+u*m-(u<0?r:0);return{left:v,right:v+n,top:g,bottom:g+r,far:f}},h=r+4,p=Array.from({length:zy},(d,u)=>o+(u+1)*h);return[...yf.map(([d,u])=>c(d,u,o,!1)),...Sf.map(([d,u])=>l(d,u,o,!1)),...p.flatMap(d=>[...yf.map(([u,m])=>c(u,m,d,!0)),...Sf.map(([u,m])=>l(u,m,d,!0))])]}function If(i,{free:e,clear:t,inside:n,forced:r=!1}){return i.find(s=>e(s)&&t(s))??i.find(e)??(r?i.find(s=>s.far===!1&&n(s))??i[0]:null)}function Pf(i,{x:e,y:t,r:n}){let r=Math.min(Math.max(e,i.left),i.right),s=Math.min(Math.max(t,i.top),i.bottom),a=Math.hypot(e-r,t-s)-n*.45;return a>4?{x:r-i.left,y:s-i.top,length:a,angle:Math.atan2(t-s,e-r)}:null}var Lf=i=>Math.min(i,70)+Vy;function vu(i){let e=new Map;return i.forEach((t,n)=>{if(t.period<0)return;let r=e.get(t.period);(r===void 0||t.weight>i[r].weight||t.weight===i[r].weight&&t.year<i[r].year)&&e.set(t.period,n)}),[...e.entries()].sort((t,n)=>t[0]-n[0]).map(([,t])=>t)}function Nf(i,e){let t=n=>n.visible!==!1&&n.x>=e.left&&n.x<=e.right&&n.y>=e.top&&n.y<=e.bottom;for(let n=1;n<i.length;n++){let r=i[n-1],s=i[n];if(!t(r)||t(s))continue;let a=0,o=1;for(let c=0;c<18;c++){let l=(a+o)/2;t({visible:s.visible,x:r.x+(s.x-r.x)*l,y:r.y+(s.y-r.y)*l})?a=l:o=l}return{t:(n-1+a)/(i.length-1),x:r.x+(s.x-r.x)*a,y:r.y+(s.y-r.y)*a,angle:Math.atan2(s.y-r.y,s.x-r.x)}}return null}function Df(i,e){return[[Math.abs(i.y-e.top),"top"],[Math.abs(i.x-e.right),"right"],[Math.abs(i.y-e.bottom),"bottom"],[Math.abs(i.x-e.left),"left"]].reduce((n,r)=>r[0]<n[0]?r:n)[1]}function Uf(i,e,{width:t,height:n},r,s=8){let a=h=>Math.min(Math.max(h,r.left),Math.max(r.left,r.right-t)),o=h=>Math.min(Math.max(h,r.top),Math.max(r.top,r.bottom-n)),c=e==="left"?i.x+s:e==="right"?i.x-s-t:a(i.x-t/2),l=e==="top"?i.y+s:e==="bottom"?i.y-s-n:o(i.y-n/2);return{left:c,right:c+t,top:l,bottom:l+n}}function Of(i,e,t=4,n=[]){let r=[...n],s=(a,o)=>a.left<o.right+t&&a.right+t>o.left&&a.top<o.bottom+t&&a.bottom+t>o.top;for(let a of i){let o=a.side==="top"||a.side==="bottom"?"top":"left",c=o==="top"?a.box.bottom-a.box.top:a.box.right-a.box.left,l=a.side==="bottom"||a.side==="right"?-1:1,h=a.box;for(let d=0;d<4&&r.some(u=>s(h,u));d++){let u=(c+t)*l*(d+1);h=o==="top"?{...a.box,top:a.box.top+u,bottom:a.box.bottom+u}:{...a.box,left:a.box.left+u,right:a.box.right+u}}h.left>=e.left-1&&h.right<=e.right+1&&h.top>=e.top-1&&h.bottom<=e.bottom+1&&!r.some(d=>s(h,d))?(r.push(h),a.box=h,a.shown=!0):a.shown=!1}return i}function Ff(i,{width:e,height:t,pad:n=6}){let r=i.map(u=>u[0]),s=i.map(u=>u[1]),[a,o,c,l]=[Math.min(...r),Math.max(...r),Math.min(...s),Math.max(...s)],h=Math.min((e-2*n)/(o-a||1),(t-2*n)/(l-c||1)),p=(e-(o-a)*h)/2,d=(t-(l-c)*h)/2;return{scale:h,to:([u,m])=>[p+(u-a)*h,d+(l-m)*h],from:([u,m])=>[a+(u-p)/h,l-(m-d)/h]}}function Bf(i,[e,t],n=1.35){let r=-1,s=n;return i.forEach((a,o)=>{let c=Math.hypot(a.centre[0]-e,a.centre[1]-t)/a.radius;c<s&&([r,s]=[o,c])}),r}var ky=.75,zf=(i,e,t=520,n=!0)=>i<ky&&e>=t&&n,Ji={tiers:[{keep:1,ratio:1/0},{keep:.65,ratio:1.5},{keep:.4,ratio:1}],slow:1e3/30,window:90,windows:3},Vf=i=>i.length?i.reduce((e,t)=>e+t,0)/i.length:0,kf=(i,e)=>e>Ji.slow&&i<Ji.tiers.length-1?i+1:i;function Gf(i,e=5){let t=vu(i);return t.length<=e?t:Array.from({length:e},(n,r)=>t[Math.floor(r*t.length/e)])}function Hf(i,{now:e,idleSince:t,eligible:n,plan:r},{wait:s=20,hold:a=6}={}){if(!r.length)return{state:i,open:null};if(i.phase==="off")return{state:i,open:null};if(i.phase==="touring"){if(t>i.at||!n)return{state:{phase:"off",step:0,at:e},open:null,stopped:!0};if(e-i.at<a)return{state:i,open:null};let o=i.step+1;return o>=r.length?{state:{phase:"off",step:0,at:e},open:null,done:!0}:{state:{phase:"touring",step:o,at:e},open:r[o]}}return n&&e-Math.max(t,i.at)>=s?{state:{phase:"touring",step:0,at:e},open:r[0]}:{state:i,open:null}}var Nl={minDistance:6,maxDistance:640,minPitch:-1.3,maxPitch:1.3},Dn=(i,e,t)=>Math.min(t,Math.max(e,i));function Wf({target:i,distance:e,yaw:t,pitch:n}){let r=Math.cos(n);return[i[0]+e*r*Math.sin(t),i[1]+e*Math.sin(n),i[2]+e*r*Math.cos(t)]}var xu=(i,e)=>Dn(i*Math.exp(e),Nl.minDistance,Nl.maxDistance),Xf=({yaw:i,pitch:e},t,n)=>({yaw:i+t,pitch:Dn(e+n,Nl.minPitch,Nl.maxPitch)});function qf({target:i,distance:e,yaw:t,pitch:n},r,s,a,o){let c=2*e*Math.tan(o/2)/a,l=[Math.cos(t),0,-Math.sin(t)],h=[-Math.sin(n)*Math.sin(t),Math.cos(n),-Math.sin(n)*Math.cos(t)];return i.map((p,d)=>p-l[d]*r*c+h[d]*s*c)}var ws=(i,e,t,n)=>Number.isFinite(i)?i+(e-i)*(1-Math.exp(-n*Math.max(0,t))):e,Gy=(i,e)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i));function jf(i,e,t,n){return{target:i.target.map((r,s)=>ws(r,e.target[s],t,n)),distance:Math.exp(ws(Math.log(i.distance),Math.log(e.distance),t,n)),yaw:ws(i.yaw,Gy(i.yaw,e.yaw),t,n),pitch:ws(i.pitch,e.pitch,t,n)}}var Dl=[0,2,4,7,9],yu=[{root:0,pad:[0,7,14,16]},{root:-7,pad:[0,7,9,16]},{root:-3,pad:[4,9,14,19]},{root:-5,pad:[2,9,14,21]},{root:2,pad:[2,5,9,12]}],Xe={tuning:432,base:432*2**(-7/12),octaves:2,from:1980,to:2030,master:.7,soften:2200,floor:30,fade:9,chordFrom:24,chordTo:38,detune:4,padCut:760,padSwing:220,padLevel:.0052,shimmerLevel:7e-4,subLevel:.007,airLevel:.012,airCut:520,room:1,reverb:5,reach:.03,bed:{pad:[.35,.8],shimmer:[.1,1],air:[.2,.9],sub:[1,0]},note:[.8,1],hover:[.15,1],swell:[.3,1],travel:[.15,1],tick:432,tickGap:1.4,tickPeak:.01,noteGap:.3,swellPeak:.022,travelPeak:.015,arrival:.9,voices:4,crowd:.5,fadeIn:3.5,fadeOut:.7,suspendAfter:4e3,interval:2e3,horizon:4},Ul=-19,Hy=-43,Ra=i=>Xe.tuning*2**(i/12),As=i=>Math.min(1,Math.max(0,i));function Yf(i){let e=Dl.length*Xe.octaves,t=Math.min(e-1,Math.floor(As((i-Xe.from)/(Xe.to-Xe.from))*e)),n=Dl[t%Dl.length]+12*Math.floor(t/Dl.length);return Xe.base*2**(n/12)}var $f=i=>({1:3,2:4.5,3:6})[i]??3,Zf=i=>.024+.007*Math.min(3,Math.max(1,i)),Jf=i=>Ra(i==="clone"?Ul:Ul-7),Kf=i=>1/(1+Xe.crowd*i),Su=(i,e,t=Xe.tickGap)=>i-e>=t;function Qf(i){let{root:e,pad:t}=yu[i%yu.length];return{sub:Ra(Hy+(e%12+12)%12),pad:t.map(n=>Ra(Ul+n)),shimmer:t.slice(2).map(n=>Ra(Ul+n+12))}}function em(i,e){let t=yu.map((n,r)=>r).filter(n=>n!==i);return t[Math.min(t.length-1,Math.floor(As(e)*t.length))]}var tm=i=>Xe.chordFrom+As(i)*(Xe.chordTo-Xe.chordFrom);function nm(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,e|1);return t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function im(i,e){let t=nm(e),n=new Float32Array(i),r=0,s=0;for(let a=0;a<i;a++)r=(r+.04*(t()*2-1))/1.04,n[a]=r,s=Math.max(s,Math.abs(r));for(let a=0;a<i;a++)n[a]/=s;return n}function rm(i,e=1){let t=Math.floor(i*Xe.reverb*1.1);return[0,1].map(n=>{let r=nm(e+n*7919),s=new Float32Array(t),a=0;for(let o=0;o<t;o++){let c=o/i,l=As((c-Xe.reach)/.05),h=Math.exp(-6.9078*c/Xe.reverb),p=As((t-o)/(i*.4)),d=3200*(600/3200)**As(c/Xe.reverb);a+=(1-Math.exp(-2*Math.PI*d/i))*(r()*2-1-a),s[o]=a*l*h*p}return s})}var Wy=[[1,1,1],[2,.22,.5],[3,.08,.3],[4.07,.03,.2]],Xy=[[1,1,1],[1.5,.25,1.2]],qy=[[1,1,1]];function jy(i,e=Math.random){let t=i.sampleRate,n={at:i.currentTime+.05,chord:0,lastNote:-1/0,lastTick:-1/0,period:-1,year:0,voices:[]},r=(ce=0)=>{let re=i.createGain();return re.gain.value=ce,re},s=(ce,re,Se=.5)=>{let pe=i.createBiquadFilter();return pe.type=ce,pe.frequency.value=re,pe.Q.value=Se,pe},a=(ce,re,Se=0)=>{let pe=i.createOscillator();return pe.type=ce,pe.frequency.value=re,pe.detune.value=Se,pe},o=ce=>{let re=i.createBuffer(ce.length,ce[0].length,t);return ce.forEach((Se,pe)=>re.getChannelData(pe).set(Se)),re},c=(ce,re,Se)=>{let pe=a("sine",ce),le=r(re);pe.connect(le),le.connect(Se),pe.start()},l=r(0),h=s("highpass",Xe.floor,.7),p=s("lowpass",Xe.soften,.5),d=r(1);d.connect(p),p.connect(h),h.connect(l),l.connect(i.destination);let u=i.createConvolver();u.buffer=o(rm(t));let m=r(Xe.room);u.connect(m),m.connect(d);let f=([ce,re])=>{let Se=r(ce),pe=r(re);return Se.connect(d),pe.connect(u),[Se,pe]},v=(ce,re)=>re.forEach(Se=>ce.connect(Se)),g=f(Xe.bed.pad),_=f(Xe.bed.shimmer),M=f(Xe.bed.air),T=f(Xe.bed.sub),b=f(Xe.note),S=f(Xe.hover),I=f(Xe.swell),U=f(Xe.travel),V=s("lowpass",Xe.padCut,.3),N=r(1);V.connect(N),v(N,g),c(.031,Xe.padSwing,V.frequency);let q=r(.6);v(q,_),c(.057,.4,q.gain);let B=o([im(t*6,11)]),Z=i.createBufferSource(),Q=s("bandpass",Xe.airCut,.6),se=r(Xe.airLevel);Z.buffer=B,Z.loop=!0,Z.connect(Q),Q.connect(se),v(se,M),c(.043,Xe.airLevel*.6,se.gain),Z.start();let W=ce=>()=>ce.forEach(re=>re.disconnect()),k=(ce,re,Se)=>{let{sub:pe,pad:le,shimmer:ie}=Qf(ce),fe=re+Se+Xe.fade,Te=(A,E,P)=>{let O=r(0);O.gain.setValueAtTime(0,re),O.gain.linearRampToValueAtTime(E,re+Xe.fade),O.gain.setValueAtTime(E,fe-Xe.fade),O.gain.linearRampToValueAtTime(0,fe),A.connect(O),O.connect(P),A.start(re),A.stop(fe+.1),A.onended=W([A,O])};le.forEach(A=>[-Xe.detune,Xe.detune].forEach(E=>Te(a("triangle",A,E),Xe.padLevel,V))),ie.forEach(A=>Te(a("sine",A),Xe.shimmerLevel,q));let Ee=r(1);v(Ee,T),Te(a("sine",pe),Xe.subLevel,Ee)},$=(ce,{peak:re,attack:Se,length:pe,partials:le,outputs:ie,when:fe})=>{let Te=Math.max(fe,i.currentTime),Ee=pe/4.6,A=Se*3,E=r(1);v(E,ie),n.voices=n.voices.filter(D=>D.end>Te),n.voices.length>=Xe.voices&&n.voices.shift().duck.gain.setTargetAtTime(0,Te,.15);let P=re*Kf(n.voices.length),O=Te,x=null,z=[E];for(let[D,R,X]of le){let Y=a("sine",ce*D),K=r(0);K.gain.setValueAtTime(0,Te),K.gain.setTargetAtTime(P*R,Te,Se),K.gain.setTargetAtTime(0,Te+A,Ee*X),Y.connect(K),K.connect(E),Y.start(Te);let me=Te+A+Ee*X*8;Y.stop(me),me>=O&&(O=me,x=Y),z.push(Y,K)}x.onended=W(z),n.voices.push({end:O,duck:E})},ue=(ce,re)=>{let Se=Math.max(re,i.currentTime),[pe,le]=ce>=0?[220,680]:[680,220],ie=i.createBufferSource(),fe=s("bandpass",pe,1.2),Te=r(0);ie.buffer=B,ie.loop=!0,fe.frequency.setValueAtTime(pe,Se),fe.frequency.exponentialRampToValueAtTime(le,Se+3.2),Te.gain.setValueAtTime(0,Se),Te.gain.setTargetAtTime(Xe.travelPeak,Se,.5),Te.gain.setTargetAtTime(0,Se+1.5,.6),ie.connect(fe),fe.connect(Te),v(Te,U),ie.start(Se,e()*2),ie.stop(Se+6.5),ie.onended=W([ie,fe,Te])};return{master:l,run(ce=Xe.horizon){for(;n.at<i.currentTime+ce;){let re=tm(e());k(n.chord,n.at,re),n.at+=re,n.chord=em(n.chord,e())}},fade(ce){let re=i.currentTime;l.gain.cancelScheduledValues(re),l.gain.setTargetAtTime(ce?Xe.master:0,re,ce?Xe.fadeIn:Xe.fadeOut)},memory({year:ce,weight:re,period:Se=-1},pe=i.currentTime){if(!Su(pe,n.lastNote,Xe.noteGap))return;n.lastNote=pe;let le=Se>=0&&n.period>=0&&Se!==n.period;le&&ue(ce>=n.year?1:-1,pe),n.period=Se,n.year=ce,$(Yf(ce),{peak:Zf(re),attack:.02,length:$f(re),partials:Wy,outputs:b,when:pe+(le?Xe.arrival:0)})},swell(ce,re=i.currentTime){$(Jf(ce),{peak:Xe.swellPeak,attack:.9,length:6,partials:Xy,outputs:I,when:re})},tick(ce=i.currentTime){Su(ce,n.lastTick)&&(n.lastTick=ce,$(Xe.tick,{peak:Xe.tickPeak,attack:.15,length:1.4,partials:qy,outputs:S,when:ce}))},travel(ce,re=i.currentTime){ue(ce,re)}}}function sm(){let i=globalThis.AudioContext??globalThis.webkitAudioContext,e={context:null,graph:null,on:!0,timer:0,stopTimer:0};if(!i)return{supported:!1,toggle:()=>!1,start:()=>!1,running:()=>!1,isOn:()=>!1,memory(){},swell(){},tick(){},travel(){},pause(){},close(){}};let t=()=>e.on&&e.graph,n=()=>{e.context||(e.context=new i,e.graph=jy(e.context));let{context:r,graph:s}=e;clearTimeout(e.stopTimer),clearInterval(e.timer),s.fade(!0),r.resume?.(),s.run(),e.timer=setInterval(()=>s.run(),Xe.interval)};return{supported:!0,isOn:()=>e.on,running:()=>e.context?.state==="running",start(){return e.on&&!document.hidden&&n(),e.on},toggle(){return!e.context&&e.on?(e.on=!1,!1):(e.on=!e.on,e.on?n():(clearTimeout(e.stopTimer),clearInterval(e.timer),e.graph.fade(!1),e.stopTimer=setTimeout(()=>!e.on&&e.context.suspend?.(),Xe.suspendAfter)),e.on)},memory(r){t()&&e.graph.memory(r)},swell(r){t()&&e.graph.swell(r)},tick(){t()&&e.graph.tick()},travel(r){t()&&e.graph.travel(r)},pause(r){!e.context||!e.on||(r?e.context.suspend?.():e.context.resume?.())},close(){clearTimeout(e.stopTimer),clearInterval(e.timer),e.on=!0,e.context?.close?.(),e.context=null,e.graph=null}}}var Ii={order:.6,jitter:.08,flight:.3,arrive:.54,swirl:2.6,burst:.17,glow:.07},Rs={sky:1.4,seed:.9,wait:6,delay:.3,seconds:4,dolly:6,from:1.6,card:.85,first:.9},am={sky:.5,delay:0,seconds:1.4,card:0},Bl={strength:.12,night:["#ecd2b0","#b8cdea","#b8cdea","#ecd2b0"],paper:["#8a5a2b","#2f5f99","#2f5f99","#8a5a2b"]},Ol={spin:.07,breath:.05,pace:.5,still:.92},Fl={radius:.2,push:.04,rate:6};var Mu=i=>i>=1?1/0:Math.min(1,Math.max(0,(i-Ii.arrive*Ii.flight)/Ii.order)),om=`
  #define DISCOVER_ORDER ${Ii.order.toFixed(2)}
  #define DISCOVER_JITTER ${Ii.jitter.toFixed(2)}
  #define DISCOVER_FLIGHT ${Ii.flight.toFixed(2)}
  #define DISCOVER_SWIRL ${Ii.swirl.toFixed(2)}
  #define DISCOVER_ARRIVE ${Ii.arrive.toFixed(2)}
  #define DISCOVER_BURST ${Ii.burst.toFixed(2)}
  #define DISCOVER_GLOW ${Ii.glow.toFixed(2)}
  #define SPIN_SLOTS ${ii.slots}
  #define CLOUD_SPIN ${Ol.spin.toFixed(3)}
  #define CLOUD_BREATH ${Ol.breath.toFixed(3)}
  #define CLOUD_PACE ${Ol.pace.toFixed(2)}
  #define CLOUD_STILL ${Ol.still.toFixed(2)}
  #define ENTRANCE_FIRST ${Rs.first.toFixed(2)}
  #define POINTER_RADIUS ${Fl.radius.toFixed(2)}
  #define POINTER_PUSH ${Fl.push.toFixed(3)}
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
    gl_PointSize *= 1.0 + 0.8 * flash;
    if (aKind < 0.5 && uPointer.z > 0.001) {
      float ratio = projectionMatrix[1][1] / projectionMatrix[0][0];
      vec2 away = (gl_Position.xy / gl_Position.w - uPointer.xy) * vec2(ratio, 1.0);
      float gap = max(length(away), 0.0001);
      float fall = 1.0 - smoothstep(0.0, POINTER_RADIUS, gap);
      vec2 dir = away / gap * vec2(1.0 / ratio, 1.0);
      gl_Position.xy += dir * fall * fall * POINTER_PUSH * uPointer.z * calm * gl_Position.w;
    }
  }
`,lm=`
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
`,cm=`
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
`,hm=`
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
`,zl=`
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
`,Vl=`
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
`;var Cs=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,zr=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},fr=(i,e,t)=>i+(e-i)*t;function um(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function Vr(i){return()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Yy={deep:.6,far:.5,haze:.5,glow:.7},$y=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Zy=`
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
`,Jy=i=>1/Math.max(.2,Math.sin(i*Math.PI));function Ky(i){let e=document.createElement("canvas");e.width=i,e.height=i/2;let t=e.getContext("2d");t.fillStyle="#000",t.fillRect(0,0,i,i/2),t.globalCompositeOperation="lighter";let n=Vr(7),r=(s,a)=>`rgba(${s===0?255:0},${s===1?255:0},${s===2?255:0},${a})`;for(let s of id({random:n})){t.save(),t.translate(s.u*i,s.v*(i/2)),t.rotate(s.angle),t.scale(Jy(s.v),s.squash);let a=t.createRadialGradient(0,0,0,0,0,s.radius);a.addColorStop(0,r(1,s.alpha)),a.addColorStop(.35,r(1,s.alpha*.35)),a.addColorStop(1,r(1,0)),t.fillStyle=a,t.beginPath(),t.arc(0,0,s.radius,0,Math.PI*2),t.fill(),t.restore()}return e}function Qy(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.4,"rgba(255,255,255,0.35)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),new us(i)}function dm({scene:i,sky:e,mobile:t,ink:n,star:r}){let s=Cs(),a={...Yy},o=new us(Ky(2048));o.minFilter=o.magFilter=Sn,o.generateMipmaps=!1,o.wrapS=pl;let c={uMap:{value:o},uInk:n,uOffset:{value:new C},uTime:{value:0},uFar:{value:0},uHaze:{value:0},uHazeMax:{value:mn.haze.alpha}},l=new Zt({uniforms:c,vertexShader:$y,fragmentShader:Zy,transparent:!0,side:yn,depthTest:!1,depthWrite:!1}),h=new xn(new ms(1500,48,24),l);h.frustumCulled=!1,h.renderOrder=-3,i.add(h);let p=[0,1,2].map(I=>e.list.reduce((U,V)=>U+V.centre[I],0)/e.list.length),d=Math.max(...e.list.map(I=>Math.hypot(...I.centre.map((U,V)=>U-p[V]))+I.radius*2)),u=nd({count:t?mn.deep.mobile:mn.deep.count,random:Vr(7),centre:p,inner:Math.min(mn.deep.radius/3,Math.max(d*1.15,mn.deep.inner/4))}),m=new vt;m.setAttribute("position",new Tt(u.position,3)),m.setAttribute("aSeed",new Tt(u.seed,1)),m.setAttribute("aBright",new Tt(u.bright,1)),m.setAttribute("aHalo",new Tt(new Float32Array(u.count),1)),m.setAttribute("aSize",new Tt(u.size,1));let f={uTime:r.uTime,uPixel:r.uPixel,uInk:n,uGain:{value:0},uHalo:{value:0}},v=new Zt({uniforms:f,vertexShader:zl,fragmentShader:Vl,transparent:!0,depthTest:!1,depthWrite:!1}),g=new $i(m,v);g.frustumCulled=!1,g.renderOrder=-2,i.add(g);let _=Math.max(1,...e.list.map(I=>I.count)),M=Qy(),T=e.list.map(I=>{let{scale:U,strength:V}=rd(I,_),N=new ta(new hs({map:M,color:16777215,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0}));return N.position.set(...I.centre),N.scale.set(U,U,1),N.renderOrder=-2,i.add(N),{sprite:N,strength:V,scale:U,galaxy:I,reveal:0}}),b={night:!0,quiet:!1,dim:1,formed:1/0,sky:1},S=()=>{f.uGain.value=a.deep*b.sky*(b.night?1.25:.4),g.visible=a.deep>.001,c.uFar.value=a.far*b.sky,c.uHaze.value=b.quiet?0:a.haze*b.sky,h.visible=c.uFar.value+c.uHaze.value>.001,T.forEach(({sprite:I,strength:U,scale:V,galaxy:N})=>{let q=zr(N.start,N.end,b.formed);I.scale.set(V*(.55+.45*q),V*(.55+.45*q),1),I.material.opacity=U*a.glow*b.dim*q*(b.night?1:.5),I.visible=I.material.opacity>.002,I.material.color.copy(n.value)})};return{applyTheme:I=>{b.night=I,l.blending=I?Zi:Kn,l.needsUpdate=!0,v.blending=I?Zi:Kn,v.needsUpdate=!0,T.forEach(({sprite:U})=>{U.material.blending=I?Zi:Kn,U.material.needsUpdate=!0}),S()},setTier:I=>{b.quiet=I>=2,S()},setDim:I=>{b.dim=I,S()},update:(I,U,V,N=1)=>{(V!==b.formed||N!==b.sky)&&(b.formed=V,b.sky=N,S()),h.position.copy(U.position),c.uOffset.value.copy(U.position).multiplyScalar(4e-4),c.uTime.value=s?0:I*.01}}}var bu=-.27,wu=.35,Tu=[0,0,-7],mr=18,pm=40,e1=6,t1=.5,Eu=4.2,Ca={rate:.11,yaw:.14,pitch:.02,rest:2.5};function fm({canvas:i,cloud:e,marks:t,future:n,today:r,mobile:s,sky:a,kinds:o=[]}){let c=new Cl({canvas:i,antialias:!1,powerPreference:"high-performance"});c.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2));let l=new Js,h=new vn(36,innerWidth/innerHeight,.1,4e3),p=r+ec[1]+.4,d=new Float32Array(e.count*3);for(let L=0;L<d.length;L++)d[L]=e.position[L]-e.center[L];let u=new vt,m=(L,j)=>new Tt(L,j).setUsage(Vh);u.setAttribute("position",new Tt(d,3)),u.setAttribute("aFrom",new Tt(e.from,3)),u.setAttribute("aCenter",new Tt(e.center,3)),Object.entries({u:"aU",order:"aOrder",seed:"aSeed",size:"aSize",ahead:"aAhead",kind:"aKind",memory:"aMemory",galaxy:"aGalaxy"}).forEach(([L,j])=>u.setAttribute(j,new Tt(e[L],1))),["threads","people","places"].forEach((L,j)=>u.setAttribute(`aFacet${j}`,new Tt(e.facet[L],1)));let v=new Float32Array(Math.max(1,t.length)).fill(1),g=new Float32Array(v),_=new wr(v,v.length,1,Ta,Qn);_.minFilter=_.magFilter=ui,_.needsUpdate=!0;let M=new Float32Array(v.length).fill(-1);o.forEach((L,j)=>M[j]=ic.indexOf(L));let T=new wr(M,M.length,1,Ta,Qn);T.minFilter=T.magFilter=ui,T.needsUpdate=!0;let b=ic.map(()=>new it),S=()=>(Ie.night?Bl.night:Bl.paper).forEach((L,j)=>b[j].set(L)),I={value:new it},U=td({count:s?4e3:void 0,random:Vr(2026)}),V=new vt;V.setAttribute("position",new Tt(U.position,3)),V.setAttribute("aSeed",new Tt(U.seed,1)),V.setAttribute("aBright",new Tt(U.bright,1)),V.setAttribute("aHalo",new Tt(U.halo,1)),V.setAttribute("aSize",new Tt(U.size,1));let N=1.25,q={uTime:{value:0},uPixel:{value:1},uGain:{value:.6},uHalo:{value:1},uInk:I},B=new Zt({uniforms:q,vertexShader:zl,fragmentShader:Vl,transparent:!0,depthTest:!1,depthWrite:!1}),Z=new $i(V,B);Z.frustumCulled=!1,Z.renderOrder=-1,l.add(Z);let Q=dm({scene:l,sky:a,mobile:s,ink:I,star:q}),se=t.reduce((L,j,he)=>j.year<t[L].year?he:L,0),W=Math.min(1,Math.sqrt(6e4/e.count)),k={uMix:{value:0},uTime:{value:0},uScale:{value:1},uFar:{value:1},uGain:{value:1},uFocusU:{value:0},uFocusW:{value:7},uFocusOn:{value:0},uFilterFacet:{value:-1},uFilterItem:{value:-1},uAway:{value:.12},uReveal:{value:1e4},uLevelCount:{value:v.length},uLevels:{value:_},uKinds:{value:T},uTints:{value:b},uTint:{value:Bl.strength},uSpin:{value:new Float32Array(ii.slots)},uPivot:{value:Array.from({length:ii.slots},(L,j)=>new C(...a.list[j]?.centre??[0,0,0]))},uKeep:{value:1},uSeed:{value:se},uSeedOn:{value:0},uKick:{value:0},uPointer:{value:new C(0,0,0)},uInk:I},$=new Zt({uniforms:k,vertexShader:om,fragmentShader:lm,transparent:!0,depthTest:!1,depthWrite:!1}),ue=new $i(u,$);ue.frustumCulled=!1,l.add(ue);let ce=[...t.map(L=>L.position),n.today,n.today,n.book,n.clone],re=new Float32Array(ii.slots),Se=(L,j)=>{j.set(...ce[L]);let he=L<t.length?t[L].period:-1;if(he>=0&&he<ii.slots&&re[he]){let ge=a.list[he].centre,[be,Fe]=[j.x-ge[0],j.y-ge[1]];j.x=ge[0]+Math.cos(re[he])*be-Math.sin(re[he])*Fe,j.y=ge[1]+Math.sin(re[he])*be+Math.cos(re[he])*Fe}return j},pe=[{size:1.3,state:1,order:.96},{size:2.4,state:3,order:.96},{size:2.4,state:2,order:.98},{size:2.4,state:2,order:1},{size:8,state:4,order:0},{size:8,state:4,order:0}],le=4,ie=5,fe=m(new Float32Array(pe.length*3),3),Te=m(Float32Array.from(pe.map(L=>L.size)),1),Ee=m(new Float32Array(pe.length).fill(1),1),A=new vt;A.setAttribute("position",fe),A.setAttribute("aSize",Te),A.setAttribute("aFade",Ee),A.setAttribute("aFirst",new Tt(Float32Array.from(pe.map((L,j)=>j===se?1:0)),1)),A.setAttribute("aState",new Tt(Float32Array.from(pe.map(L=>L.state)),1)),A.setAttribute("aOrder",new Tt(Float32Array.from(pe.map(L=>L.order)),1));let E={uScale:{value:1},uTime:{value:0},uReveal:{value:0},uSeedOn:{value:0},uInk:I},P=new Zt({uniforms:E,vertexShader:cm,fragmentShader:hm,transparent:!0,depthTest:!1,depthWrite:!1}),O=new $i(A,P);O.frustumCulled=!1,l.add(O);let x=[],z=(L,j=!1)=>{let he=j?new ga({transparent:!0,dashSize:.8,gapSize:.9,depthTest:!1}):new Ar({transparent:!0,depthTest:!1});return x.push({material:he,opacity:L}),he},D=L=>new vt().setAttribute("position",new We(L,3)),R=new Xi,X=(L,j,he=1980)=>(L.frustumCulled=!1,L.userData.opacity=j,L.userData.year=he,R.add(L),L),Y=[];(()=>{let L=Be=>Be.members.threads?.[0]??0,j=new Map,he=a.list.map(()=>[]);t.forEach(Be=>{let De=`${Be.period}:${L(Be)}`;j.has(De)&&he[Be.period].push(...j.get(De),...Be.position),j.set(De,Be.position)}),he.forEach((Be,De)=>{if(!Be.length)return;let Qe=a.list[De].centre,Ve=X(new Rr(D(Be.map((dt,At)=>dt-Qe[At%3])),z(.34)),.34,a.list[De].end);Ve.position.set(...Qe),Y.push({lines:Ve,k:De})});let ge=(Be,De)=>{let Qe=[],Ve=Math.max(8,Math.ceil((De-Be)/1.5));for(let dt=0;dt<=Ve;dt++)Qe.push(...Hr(a,Be+(De-Be)*dt/Ve));return D(Qe)};a.list.forEach((Be,De)=>{let Qe=[];for(let At=0;At<=120;At++){let ke=Math.PI*2*At/120;Qe.push(Be.centre[0]+(Be.radius+1.6)*Math.sin(ke),Be.centre[1]+(Be.radius+1.6)*Math.cos(ke),Be.centre[2])}let Ve=new Yi(D(Qe),z(.16,!0));Ve.computeLineDistances(),X(Ve,.16,Be.start);let dt=a.list[De+1];dt&&X(new Yi(ge(Be.along+Be.radius+1.6,dt.along-dt.radius-1.6),z(.22)),.22,dt.start)});let be=a.list.at(-1),Fe=new Yi(ge(be.along+be.radius+1.6,a.length),z(.36,!0));Fe.computeLineDistances(),X(Fe,.36,r)})(),l.add(R);let me=8,Ue=[];for(let L=0;L<=120;L++)Ue.push(Math.sin(Math.PI*2*L/120),Math.cos(Math.PI*2*L/120),0);let Ne=Array.from({length:me},()=>{let L=new Yi(D(Ue),z(.3,!0));return L.computeLineDistances(),L.frustumCulled=!1,L.visible=!1,l.add(L),L}),xe={list:[],centre:[0,0,0],want:0,fade:0},Ge=L=>{let j=new Float32Array(pm*mr*6),he=m(j,3),ge=new Rr(new vt().setAttribute("position",he),z(L));return ge.frustumCulled=!1,ge.geometry.setDrawRange(0,0),l.add(ge),{lines:ge,attribute:he,positions:j,indices:[],fade:0,opacity:L}},de=Ge(.7),ye=Ge(.3),_e=Ge(1),oe=160,Mt=new Float32Array(oe*mr*6),ht=m(Mt,3),xt=new Rr(new vt().setAttribute("position",ht),z(.6));xt.frustumCulled=!1,xt.geometry.setDrawRange(0,0),l.add(xt);let Rt={pairs:[],fade:0},Le=(L,j,he,ge,be,Fe=1)=>{for(let Be=0;Be<mr;Be++)for(let[De,Qe]of[[0,Be/mr*Fe],[1,(Be+1)/mr*Fe]]){let Ve=((j*mr+Be)*2+De)*3;L[Ve]=fr(he.x,ge.x,Qe),L[Ve+1]=fr(he.y,ge.y,Qe),L[Ve+2]=fr(he.z,ge.z,Qe)+4*Qe*(1-Qe)*be}},yt={map:new Map},He=new C,ut=new C,st=new C,Je={target:[...Tu],distance:700,yaw:0,pitch:bu},nt={target:[...Tu],distance:340,yaw:0,pitch:bu},wt={x:0,y:0,goalX:0,goalY:0},Ie={reveal:null,follow:-1,idle:!0,hover:-1,selection:-1,preview:-1,previewFade:0,ringFade:0,portrait:innerWidth/innerHeight<1,drift:0,touched:-1e9},jt=Math.max(...[...t.map(L=>L.position),n.book,n.clone].map(L=>Math.hypot(L[0],L[1])))+12,Jt=()=>Math.max(160,jt*4.3)*(Ie.portrait?1.3:1),un=L=>Math.min(84,L*(Ie.portrait?1.5:1)),Ki=t.length+2,H=L=>L<t.length?L:L+2,Pi=Array.from({length:Ki},()=>({x:0,y:0,r:0,on:!1,depth:0})),Yt=new C,$e=new C,pt=(L,j={})=>($e.copy(L).project(h),j.x=($e.x*.5+.5)*innerWidth,j.y=(-$e.y*.5+.5)*innerHeight,j.visible=$e.z>-1&&$e.z<1,j),qe=({target:L,distance:j,yaw:he,pitch:ge,follow:be=-1}={})=>{L&&(nt.target=[...L]),j!==void 0&&(nt.distance=Dn(j,6,640)),he!==void 0&&(nt.yaw=he),ge!==void 0&&(nt.pitch=ge),Ie.follow=be},pi=(L=bu)=>qe({target:Tu,distance:Jt(),yaw:0,pitch:L}),Un=new it,fi=()=>{let L=getComputedStyle(document.documentElement);Un.set(L.getPropertyValue("--bg").trim()),I.value.set(L.getPropertyValue("--fg").trim()),x.forEach(({material:he})=>he.color.copy(I.value));let j=Un.getHSL({}).l<.5;c.setClearColor(Un,1),$.blending=B.blending=j?Zi:Kn,N=j?1.25:.4,q.uHalo.value=j?1:0,B.needsUpdate=!0,Q.applyTheme(j),Ie.night=j,S(),P.blending=Kn,k.uGain.value=(j?.55:.6)*W,$.needsUpdate=!0};fi();let dn=()=>{Ie.portrait=innerWidth/innerHeight<1,h.aspect=innerWidth/innerHeight,c.setSize(innerWidth,innerHeight,!1)};dn();let Ht=new Map,Lt={x:0,y:0,on:!1,fine:matchMedia("(pointer: fine)").matches&&!Cs(),strength:0},Ct={moved:!1,pinch:0,button:0},Gt={hover:()=>{},click:()=>{},frame:()=>{},touch:()=>{},error:L=>console.error(L)},pn=!0,Li=(L,j)=>{let he=-1,ge=1;return Pi.forEach((be,Fe)=>{if(!be.on)return;let Be=Math.max(26,be.r*.9),De=Math.hypot(be.x-L,be.y-j)/Be;De<ge&&([he,ge]=[Fe,De])}),he},kn=()=>{Ie.idle=!1,Ie.touched=performance.now()/1e3,Gt.touch()},Ni=(L,j)=>{nt.target=qf(nt,L,j,innerHeight,h.fov*Math.PI/180),Ie.follow=-1};i.addEventListener("pointerdown",L=>{if(!(L.pointerType==="mouse"&&L.button>2)){if(i.setPointerCapture(L.pointerId),Ht.set(L.pointerId,{x:L.clientX,y:L.clientY,startX:L.clientX,startY:L.clientY}),Ht.size===1&&Object.assign(Ct,{moved:!1,button:L.button,pinch:0,shift:L.shiftKey}),Ht.size===2){let[j,he]=[...Ht.values()];Ct.pinch=Math.hypot(j.x-he.x,j.y-he.y),Ct.moved=!0}kn()}}),i.addEventListener("pointermove",L=>{let j=Ht.get(L.pointerId);if(!j){L.pointerType==="mouse"&&Gt.hover(Li(L.clientX,L.clientY),L);return}let he=L.clientX-j.x,ge=L.clientY-j.y;if(Math.hypot(L.clientX-j.startX,L.clientY-j.startY)>e1&&(Ct.moved=!0),[j.x,j.y]=[L.clientX,L.clientY],Ht.size===2){let[be,Fe]=[...Ht.values()],Be=Math.hypot(be.x-Fe.x,be.y-Fe.y);Ct.pinch>0&&Be>0&&(nt.distance=xu(nt.distance,Math.log(Ct.pinch/Be))),Ct.pinch=Be,Ni(he/2,ge/2);return}Ct.moved&&(Ct.button===2||Ct.button===1||Ct.shift?Ni(he,ge):Object.assign(nt,Xf(nt,-he*.005,ge*.004)))});let Di=L=>{let j=Ht.get(L.pointerId);Ht.delete(L.pointerId),j&&!Ct.moved&&Ht.size===0&&L.type==="pointerup"&&Ct.button===0&&Gt.click(Li(L.clientX,L.clientY),L)};i.addEventListener("pointerup",Di),i.addEventListener("pointercancel",Di),i.addEventListener("pointerleave",()=>{Lt.on=!1,Gt.hover(-1)}),i.addEventListener("pointermove",L=>{L.pointerType==="mouse"&&(Lt.on=Lt.fine,Lt.x=L.clientX/innerWidth*2-1,Lt.y=-(L.clientY/innerHeight)*2+1)}),i.addEventListener("contextmenu",L=>L.preventDefault()),i.addEventListener("wheel",L=>{L.preventDefault();let j=L.deltaY*(L.deltaMode===1?40:L.deltaMode===2?innerHeight:1);nt.distance=xu(nt.distance,Dn(j*(L.ctrlKey?.012:.0016),-.5,.5)),kn()},{passive:!1});let Ui=new xa,ei=new C,On=new C,w=Rs,G=null,J=null,ne=!1,ee=!1,Me=null,we=!0,Re=L=>{if(!pn)return;Ui.update(L);let j=Math.min(Math.max(Ui.getDelta(),0),.25);if(document.hidden){requestAnimationFrame(Re);return}let he=Ui.getElapsed();J??(J=he);let ge=Dn(Jt()*w.from,6,640);ne&&G===null&&(G=he,Me=ee?null:{from:ge});let be=G===null?0:he-G,Fe=Math.min(1,Math.max(0,(be-w.delay)/w.seconds)),Be=zr(0,w.sky,he-J);Ie.follow>=0&&(Se(Ie.follow,On),nt.target=On.toArray());let De=jf(Je,nt,j,Eu);if(Object.assign(Je,De),G===null)Je.distance=ge;else if(Me){let Ce=Math.min(1,be/w.dolly);Ce>=1||!Ie.idle?Me=null:Je.distance=Math.exp(fr(Math.log(Me.from),Math.log(nt.distance),1-(1-Ce)**3))}wt.x+=(wt.goalX-wt.x)*(1-Math.exp(-Eu*j)),wt.y+=(wt.goalY-wt.y)*(1-Math.exp(-Eu*j)),Ie.drift+=((Ht.size===0&&performance.now()/1e3-Ie.touched>Ca.rest?1:0)-Ie.drift)*(1-Math.exp(-j*.6));let[Qe,Ve,dt]=Wf({...Je,yaw:Je.yaw+Math.sin(he*Ca.rate)*Ca.yaw*Ie.drift,pitch:Je.pitch+Math.sin(he*Ca.rate*.75+1)*Ca.pitch*Ie.drift});h.position.set(Qe,Ve,dt),h.fov=un(36),h.updateProjectionMatrix(),h.lookAt(Je.target[0],Je.target[1],Je.target[2]),h.setViewOffset(innerWidth,innerHeight,-wt.x,-wt.y,innerWidth,innerHeight),h.updateMatrixWorld();let At=innerHeight/(2*Math.tan(h.fov*Math.PI/360)),ke=zr(.35,.75,Je.distance/Jt()),Oe=Math.max(0,be-w.delay-w.seconds-.5);a.list.forEach((Ce,mt)=>{mt>=ii.slots||(re[mt]=cd(Ce,Oe),k.uSpin.value[mt]=re[mt])}),Y.forEach(({lines:Ce,k:mt})=>Ce.rotation.z=re[mt]??0);let zt=re[0].toFixed(3);i.dataset.spin!==zt&&(i.dataset.spin=zt),Lt.strength=ws(Lt.strength,Lt.on?1:0,j,Fl.rate),k.uPointer.value.set(Lt.x,Lt.y,Lt.strength);let bn=Lt.strength.toFixed(2);i.dataset.pointer!==bn&&(i.dataset.pointer=bn);let mi=G===null?zr(w.seed,w.seed+1.6,he-J):1,jn=be>0?Math.min(1,be/.45*Math.exp(1-be/.45)):0;k.uSeedOn.value=E.uSeedOn.value=mi,k.uKick.value=jn,k.uMix.value=Fe;let Kt=ju(a,Mu(Fe));k.uTime.value=E.uTime.value=q.uTime.value=he,q.uPixel.value=c.getPixelRatio(),k.uFar.value=ke,k.uScale.value=E.uScale.value=c.domElement.height/(2*Math.tan(h.fov*Math.PI/360)),E.uReveal.value=Math.min(1,Mu(Fe)),we=!1;for(let Ce=0;Ce<v.length;Ce++){let mt=g[Ce]-v[Ce];Math.abs(mt)>.002?(v[Ce]+=mt*(1-Math.exp(-7*j)),we=!0):v[Ce]=g[Ce]}we&&(_.needsUpdate=!0);let Tn=(Ce,mt)=>{Se(t.length+Ce,Yt),fe.setXYZ(Ce,Yt.x,Yt.y,Yt.z),Ee.setX(Ce,mt)},on=Ce=>k.uReveal.value>=Wr(Ce)?1:0;Tn(0,on(r)),Tn(1,on(r)),Tn(2,on(p)),Tn(3,on(p)),Ie.selection>=0&&(Se(Ie.selection,Yt),fe.setXYZ(le,Yt.x,Yt.y,Yt.z),Te.setX(le,2.2*t[Ie.selection].spread+2)),Ie.ringFade+=((Ie.selection>=0?1:0)-Ie.ringFade)*(1-Math.exp(-6*j)),Ee.setX(le,Ie.ringFade),Ie.preview>=0&&(Se(Ie.preview,st),fe.setXYZ(ie,st.x,st.y,st.z),Te.setX(ie,2.2*t[Ie.preview].spread+2)),Ie.previewFade+=((Ie.preview>=0?1:0)-Ie.previewFade)*(1-Math.exp(-9*j)),Ee.setX(ie,Ie.previewFade),fe.needsUpdate=Te.needsUpdate=Ee.needsUpdate=!0;let Oi=`${Je.yaw.toFixed(2)},${Je.pitch.toFixed(2)},${Je.distance.toFixed(0)}`;i.dataset.view!==Oi&&(i.dataset.view=Oi);let ti=Math.abs(Math.log(Je.distance/nt.distance))<.004&&Math.abs(Math.sin(Je.yaw-nt.yaw))<.003&&Math.abs(Je.pitch-nt.pitch)<.003&&Je.target.every((Ce,mt)=>Math.abs(Ce-nt.target[mt])<.03)&&Math.abs(wt.x-wt.goalX)<.5&&Math.abs(wt.y-wt.goalY)<.5?"1":"";i.dataset.rest!==ti&&(i.dataset.rest=ti);let Yn=Ie.selection>=0?`${Yt.x.toFixed(2)},${Yt.y.toFixed(2)},${Yt.z.toFixed(2)}`:"";i.dataset.ring!==Yn&&(i.dataset.ring=Yn);let Fi=Ie.preview>=0?String(Ie.preview):"";i.dataset.preview!==Fi&&(i.dataset.preview=Fi);let En=zr(.25,.9,Fe),ze=Math.min(Kt,Ie.reveal??1/0);R.visible=En>.01,R.children.forEach(Ce=>Ce.material.opacity=Ce.userData.opacity*En*Math.min(1,Math.max(0,(ze-Ce.userData.year)/2))),_e.indices=Ie.preview>=0&&Ie.selection>=0&&Ie.preview!==Ie.selection?[Ie.preview]:[];for(let Ce of[de,ye,_e]){let mt=Ce.indices.length?1:0;Ce.fade+=(mt-Ce.fade)*(1-Math.exp(-5*j));let nn=Math.min(Ce.indices.length,pm);nn&&(Se(Ie.selection,On),Ce.indices.slice(0,nn).forEach((bt,Qt)=>{Se(bt,ei),Le(Ce.positions,Qt,On,ei,On.distanceTo(ei)*.22,yt.map.get(bt)??1)}),Ce.attribute.needsUpdate=!0),Ce.lines.geometry.setDrawRange(0,nn*mr*2),Ce.lines.material.opacity=Ce.opacity*Ce.fade,Ce.lines.visible=Ce.fade>.01}xe.fade+=(xe.want-xe.fade)*(1-Math.exp(-5*j)),Ne.forEach((Ce,mt)=>{let nn=xe.list[mt];Ce.visible=!!nn&&xe.fade>.01,Ce.visible&&(Ce.position.set(...xe.centre),Ce.scale.setScalar(nn.radius),Ce.material.dashSize=.5/nn.radius,Ce.material.gapSize=1.6/nn.radius,Ce.material.opacity=.34*xe.fade*En)});let wn=xe.want&&xe.fade>.5?String(xe.list.length):"";i.dataset.rings!==wn&&(i.dataset.rings=wn);let qt=En;Rt.fade+=((Rt.pairs.length?1:0)-Rt.fade)*(1-Math.exp(-5*j));let ln=Math.min(Rt.pairs.length,oe);ln&&qt>.01&&(Rt.pairs.slice(0,ln).forEach(([Ce,mt,nn],bt)=>{Se(Ce,On),Se(mt,ei),Le(Mt,bt,On,ei,On.distanceTo(ei)*(nn?.3:.12))}),ht.needsUpdate=!0),xt.geometry.setDrawRange(0,ln*mr*2),xt.material.opacity=.6*Rt.fade*qt,xt.visible=xt.material.opacity>.01,i.dataset.jumps=xt.visible?String(ln):"",q.uGain.value=N*Be,Q.update(he,h,Kt,Be),c.render(l,h),Pi.forEach((Ce,mt)=>{Se(H(mt),Yt),$e.copy(Yt).project(h),Ce.x=($e.x*.5+.5)*innerWidth,Ce.y=(-$e.y*.5+.5)*innerHeight,Ce.depth=h.position.distanceTo(Yt),Ce.r=(t[mt]?.spread??t1)*2.4*At/Ce.depth,Ce.on=$e.z>-1&&$e.z<1&&Ce.x>0&&Ce.x<innerWidth&&Ce.y>0&&Ce.y<innerHeight});try{Gt.frame({time:he,dt:j,intro:Fe,formed:Kt,far:ke,cssScale:At,projected:Pi,camera:h,entered:Fe>=w.card,seen:G===null&&he-J>w.seed+1.2,seedIndex:se})}catch(Ce){pn=!1,Gt.error(Ce);return}pn&&requestAnimationFrame(Re)};return{camera:h,view:Je,goal:nt,inset:wt,state:Ie,projected:Pi,on:(L,j)=>Gt[L]=j,stop:()=>pn=!1,setQuality:L=>{let j=Ji.tiers[Math.min(L,Ji.tiers.length-1)];k.uKeep.value=j.keep,Q.setTier(L),c.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2,j.ratio)),c.setSize(innerWidth,innerHeight,!1)},start:()=>requestAnimationFrame(Re),begin:(L="full")=>{ne=!0,ee=L!=="full",L==="direct"&&(w={...Rs,...am})},home:pi,homeDistance:Jt,fly:qe,pick:Li,centerOf:L=>Se(L,new C),project:pt,resize:dn,applyTheme:fi,setLevels:L=>L.forEach((j,he)=>g[he]=j),setFilter:L=>{k.uFilterFacet.value=L?["threads","people","places"].indexOf(L.facet):-1,k.uFilterItem.value=L?L.item:-1,Q.setDim(L?.45:1)},setFocus:L=>{k.uFocusOn.value=L===null?0:1,L!==null&&(k.uFocusU.value=Wr(L))},setSelection:L=>Ie.selection=L,setPreview:L=>Ie.preview=L,setJumps:L=>Rt.pairs=L,slotOf:L=>({today:t.length,book:t.length+2,clone:t.length+3})[L],setReveal:L=>{k.uReveal.value=L===null?1e4:Wr(L),Ie.reveal=L},setLinks:(L,j)=>{de.indices=L,ye.indices=j,i.dataset.links=String(L.length+j.length)},setInset:(L,j)=>{wt.goalX=L,wt.goalY=j},setIdle:L=>Ie.idle=L,setLinkReach:L=>yt.map=L,groundAt:(L,j,he)=>{$e.set(L/innerWidth*2-1,-(j/innerHeight)*2+1,.5).unproject(h),$e.sub(h.position).normalize();let ge=(he-h.position.z)/$e.z,be=2600,Fe=Number.isFinite(ge)&&ge>0?Math.min(ge,be):be;return[h.position.x+$e.x*Fe,h.position.y+$e.y*Fe]},arcScreen:(L,j,he,ge={})=>(Se(L,He),Se(j,ut),st.set(fr(He.x,ut.x,he),fr(He.y,ut.y,he),fr(He.z,ut.z,he)+4*he*(1-he)*He.distanceTo(ut)*.22),pt(st,ge)),setYearRings:(L,j)=>{j.length?Object.assign(xe,{list:j,centre:L,want:1}):xe.want=0}}}var n1="(min-height: 520px) and (min-width: 320px)",i1="(max-width: 900px), (max-aspect-ratio: 1/1)",Au=74,r1=124,s1=24,Ru=8,a1=[0,22],mm={today:2.4,book:1.2,clone:1.2},gm=8,_m=20,vm=2,o1=40,kr={width:104,height:100,top:118},xm="http://www.w3.org/2000/svg",Gl=matchMedia(i1),ym=.9,l1=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],c1=new Set(["hero","contact"]),h1=["1","2","3"],an=[],Hl=()=>{for(;an.length;)an.pop()();document.documentElement.classList.remove("immersive"),document.documentElement.classList.add("flat")};function Sm(){if(!um()||Cs())return Hl();let i=matchMedia(n1);if(i.addEventListener("change",()=>location.reload()),!i.matches)return Hl();d1().catch(e=>{console.error(e),Hl()})}function u1(i){let e=0,t=n=>{[...n.childNodes].forEach(r=>{if(r.nodeType===Node.TEXT_NODE){let s=document.createDocumentFragment();r.textContent.split(/(\s+)/).forEach(a=>{if(!a)return;if(/^\s+$/.test(a))return s.append(a);let o=document.createElement("span");o.className="w",o.style.setProperty("--i",e++),o.textContent=a,s.append(o)}),r.replaceWith(s)}else r.nodeType===Node.ELEMENT_NODE&&t(r)})};t(i)}var ct=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n},Cu=i=>i?i.split(","):[];async function d1(){let i=document.getElementById("scene"),e=document.querySelector(".stage"),t=document.querySelector("main.story"),n=document.querySelector(".hud"),r=document.querySelector(".rail"),s=document.querySelector(".masthead"),a=document.querySelector(".explore"),o=Xu(),c=matchMedia("(max-width: 760px)").matches,l=JSON.parse(a.dataset.facets),h=JSON.parse(a.dataset.ahead),p=JSON.parse(a.dataset.periods??"[]"),d=[...t.querySelectorAll("[data-station]")].map((y,F)=>({element:y,kind:y.dataset.station,id:y.id,label:y.dataset.hud,t:F,panel:y.matches("[data-panel]")?y:y.querySelector("[data-panel]")})),u=d.length-1,m=y=>d.findIndex(F=>F.kind===y),[f,v,g,_]=["book","clone","contact","hero"].map(m),M=d.filter(y=>y.kind==="milestone"),T=M.map(({element:y})=>({id:y.dataset.milestone,date:y.dataset.date,weight:+y.dataset.weight,period:y.dataset.period,links:Cu(y.dataset.links),...Object.fromEntries(zi.map(F=>[F,Cu(y.dataset[F])]))})),b=$u(T,l,{periods:p,today:o}),S=nc(T,b.map(y=>y.year),{periods:p,today:o}),I=new Map(M.map((y,F)=>[y.t,F])),U=new Map([...t.querySelectorAll("li[data-ask]")].map(y=>[y.dataset.ask,new Set(Cu(y.dataset.memories).map(F=>M.findIndex(te=>te.element.dataset.milestone===F)).filter(F=>F>=0))])),V=null,N=Object.fromEntries(zi.map(y=>[y,{}]));t.querySelectorAll("ul.facets").forEach(y=>y.querySelectorAll("li").forEach(F=>N[y.dataset.facet][F.dataset.item]=F.textContent));let q=M.map(y=>({time:y.element.querySelector("time").textContent,title:y.element.querySelector("h3").textContent,body:y.element.querySelector("p:not(.kicker):not(.intro)").textContent})),B=M.map((y,F)=>({index:F,id:y.id,title:q[F].title,body:q[F].body,extra:`${q[F].time} ${zi.flatMap(te=>(b[F].members[te]??[]).map(Pe=>N[te][l[te][Pe]]??"")).join(" ")}`,weight:b[F].weight,order:F})),Z=sd({marks:b,today:o,random:Vr(1980),facets:l,sky:S,cap:c?55e3:er.cap,trail:c?12e3:er.trail}),Q=Zu(S),se=new Set(vu(b)),W=fm({canvas:i,cloud:Z,marks:b,future:Q,today:o,mobile:c,sky:S,kinds:M.map(y=>y.element.dataset.kind)}),k=document.documentElement,$=!1,ue=new Set,ce=0,re=()=>{clearTimeout(ce),$=!0,k.dataset.entering="1",ce=setTimeout(()=>Se(),2e4)},Se=()=>{$&&($=!1,clearTimeout(ce),k.dataset.entering="out",ce=setTimeout(()=>delete k.dataset.entering,1600))};an.push(()=>{clearTimeout(ce),delete k.dataset.entering});let pe=navigator.webdriver,le=location.hash.length>1;!pe&&!le&&re(),W.home(),W.start();let ie=b.reduce((y,F,te)=>F.year<b[y].year?te:y,0),fe=ct("button","seed");fe.type="button",fe.setAttribute("aria-label",q[ie].title);let Te=!1,Ee=0,A=["pointerup","touchend","click","keydown"],E=()=>A.forEach(y=>document.removeEventListener(y,P,!0));function P(){Te||(Te=!0,clearTimeout(Ee),E(),W.begin(pe?"still":le?"direct":"full"),fe.dataset.gone="1",setTimeout(()=>fe.remove(),1600))}pe||le?P():(document.body.append(fe),Ee=setTimeout(P,Rs.wait*1e3),A.forEach(y=>document.addEventListener(y,P,!0))),an.push(()=>{clearTimeout(Ee),E(),fe.remove()});let O=new URLSearchParams(location.search).get("quality"),x=O==="low"?Ji.tiers.length-1:0,z=O!=="full"&&O!=="low",D={frames:[],windows:0,from:0};W.setQuality(x),i.dataset.quality=String(x);let R=sm(),X=ct("div","labels");e.append(X),an.push(()=>X.remove());let Y=b.map((y,F)=>{let te=ct("div","tag");return te.innerHTML='<b></b><span></span><i class="leader"></i>',te.querySelector("b").textContent=q[F].time,te.querySelector("span").textContent=q[F].title,te.setAttribute("aria-hidden","true"),X.append(te),{node:te,leader:te.querySelector(".leader"),width:0,height:0,on:!1}}),K=Array.from({length:vm},()=>{let y=ct("button","edge-mark");return y.type="button",y.hidden=!0,y.tabIndex=-1,y.setAttribute("aria-hidden","true"),y.innerHTML="<span></span><i></i>",X.append(y),y.addEventListener("click",()=>De(pn(+y.dataset.memory))),{node:y,label:y.querySelector("span"),arrow:y.querySelector("i"),width:0,height:0}}),me="",Ue=Array.from({length:_m+1},()=>({x:0,y:0,visible:!0})),Ne=[],xe=(y,F,te,Pe,Ye=1980,Ot=0,Et=-1)=>{let It=ct("div",te,y);return It.setAttribute("aria-hidden","true"),X.append(It),Ne.push({node:It,world:F,base:Pe,year:Ye,kind:te,ring:Ot,spotAt:Et,width:0,height:0,shown:-1}),It},Ge=y=>new C(...y);xe(e.dataset.today,Ge(Q.today),"ahead now",1,o,mm.today),Ne.at(-1).kind="ahead";let de=[];S.list.forEach((y,F)=>{let te=t.querySelector(`#period-${p[F]} [data-station]`);if(!te)return;let[Pe,Ye,Ot]=y.centre,[Et,It]=[Pe+S.pole[0],Ye+S.pole[1]],at=Math.hypot(Et,It)||1,St=y.radius+9,[fn,xr]=(te.querySelector(".kicker")?.textContent??p[F]).split(" \xB7 "),Rn=xe("",Ge([Pe+Et/at*St,Ye+It/at*St,Ot]),"galaxy",.9,(y.start+y.end)/2);Rn.append(ct("span","",fn),...xr?[ct("span","galaxy-years",` \xB7 ${xr}`)]:[],ct("b","galaxy-count")),de[F]=Ne.at(-1),Rn.dataset.go=`period-${p[F]}`,Rn.addEventListener("click",()=>Ls(Rn.dataset.go))});let ye=Array.from({length:gm},()=>(xe("",new C,"ring-year",.8,1980),Ne.at(-1).dim=0,Ne.at(-1))),_e=e.dataset.until?Na(e.dataset.until):-1;_e>=0&&xe(Da(_e,document.documentElement.lang),Ge(Q.today.map((y,F)=>(y+Q.book[F])/2)),"countdown-mark",.8,o),[["book",a.dataset.book],["clone",a.dataset.clone]].forEach(([y,F],te)=>xe(F,Ge(Q[y]),"ahead",.6,1/0,mm[y],b.length+te));let oe=ct("aside","card");oe.setAttribute("tabindex","-1");let Mt=ct("div","card-body"),ht=ct("nav","card-steps"),xt=ct("button","step",""),Rt=ct("button","step","");xt.type=Rt.type="button",xt.dataset.step="previous",Rt.dataset.step="next",ht.append(xt,Rt);let Le=new Map,yt=ct("p","visually-hidden");yt.setAttribute("role","status"),t.querySelectorAll(".waitlist").forEach(y=>{let F=ct("div","card-form");F.hidden=!0,F.dataset.for=y.dataset.list;let[te,Pe]=[y.parentNode,y.nextSibling];F.append(y),Le.set(y.dataset.list,F),an.push(()=>te.insertBefore(y,Pe))});let He=ct("button","card-close","\u2715");He.type="button",He.dataset.go="top",He.setAttribute("aria-label",a.dataset.overview),He.setAttribute("title",a.dataset.overview),oe.append(He,Mt,...Le.values(),ht,yt),oe.id="card",e.after(oe),an.push(()=>oe.remove());let ut=ct("div","nudge");ut.hidden=!0;let st=ct("a",""),Je=ct("button","","\u2715");Je.type="button",ut.append(st,Je),oe.after(ut),an.push(()=>ut.remove());let nt=[...t.querySelectorAll("a, button, input, select, textarea")];nt.forEach(y=>y.setAttribute("tabindex","-1")),an.push(()=>nt.forEach(y=>y.removeAttribute("tabindex")));let wt=document.querySelector(".skip");wt&&(wt.setAttribute("href","#card"),an.push(()=>wt.setAttribute("href","#main")));let Ie=Ff([...S.list.flatMap(y=>[[y.centre[0]-y.radius,y.centre[1]-y.radius],[y.centre[0]+y.radius,y.centre[1]+y.radius]]),Q.today,Q.book,Q.clone].map(y=>[y[0],y[1]]),kr),jt=ct("div","minimap");jt.hidden=!0,jt.setAttribute("aria-hidden","true");let Jt=document.createElementNS(xm,"svg");Jt.setAttribute("viewBox",`0 0 ${kr.width} ${kr.height}`);let un=(y,F)=>{let te=document.createElementNS(xm,y);return Object.entries(F).forEach(([Pe,Ye])=>te.setAttribute(Pe,Ye)),Jt.append(te),te};S.list.forEach(y=>{let[F,te]=Ie.to(y.centre);un("circle",{cx:F.toFixed(1),cy:te.toFixed(1),r:(y.radius*Ie.scale).toFixed(1),class:"mini-galaxy"})});let Ki=b.map(y=>{let[F,te]=Ie.to(y.position);return un("circle",{cx:F.toFixed(1),cy:te.toFixed(1),r:(.6+y.weight*.35).toFixed(2),class:"mini-dot"})}),H=0;[Q.book,Q.clone].forEach(y=>{let[F,te]=Ie.to(y);un("circle",{cx:F.toFixed(1),cy:te.toFixed(1),r:2,class:"mini-future"})});let Pi=un("polygon",{class:"mini-frame"}),Yt=un("circle",{r:3.4,class:"mini-here"});jt.append(Jt),oe.after(jt),an.push(()=>jt.remove()),jt.addEventListener("click",y=>{let F=jt.getBoundingClientRect(),te=Ie.from([(y.clientX-F.left)*kr.width/F.width,(y.clientY-F.top)*kr.height/F.height]),Pe=Bf(S.list,te);Pe>=0&&Ls(`period-${p[Pe]}`)});let $e={related:a.dataset.related,earlier:a.dataset.earlier,later:a.dataset.later,filter:a.dataset.filter,unfilter:a.dataset.unfilter,more:a.dataset.more,lit:a.dataset.lit,all:a.dataset.all,fewer:a.dataset.fewer,nudgebook:a.dataset.nudgebook,nudgeclone:a.dataset.nudgeclone,nudgeclose:a.dataset.nudgeclose},pt=0,qe=null,pi=-1,Un={links:[],near:[]},fi=[],dn=!1,Ht={x:0,y:0},Lt={on:!1,seen:!1,from:null},Ct={opened:new Set,sawClone:!1,closed:!1},Gt=y=>I.get(y)??-1,pn=y=>M[y].t,Li=y=>{let F=d[y];if(F.kind==="hero")return{previous:null,next:M[0].t};if(F.kind==="milestone"){let{previous:te,next:Pe}=Mf(b,Gt(y),qe);return{previous:te!==null?pn(te):!qe&&Gt(y)===0?0:null,next:Pe!==null?pn(Pe):qe?null:f}}return F.kind==="book"?{previous:M.at(-1).t,next:v}:F.kind==="clone"?{previous:f,next:null}:{previous:null,next:null}},kn=()=>{let y=Gt(pt);Un=y>=0?gu(b,y):{links:[],near:[]};let F=[...Un.links,...Un.near];fi=y<0?[]:dn?F:_u(b,y);let te=new Set(fi),Pe=V?U.get(V):null,Ye=Pe?Ef(b,Pe):Tf(b,{selected:y,near:te,weak:new Set(F.filter(at=>!te.has(at))),filter:qe});W.setLevels(Ye),e.dataset.levels=[...new Set(Ye)].sort((at,St)=>at-St).join(","),W.setLinks(Un.links.filter(at=>te.has(at)),Un.near.filter(at=>te.has(at))),W.setSelection(y);let Ot=!Lt.on&&y>=0&&b[y].period>=0?qu(S.list[b[y].period],gm):[],Et=y>=0?S.list[b[y].period]:null;W.setYearRings(Et?.centre??null,Ot),ye.forEach((at,St)=>{let fn=Ot[St];at.dim=fn?1:0,fn&&(at.node.textContent=String(fn.year),at.world.set(Et.centre[0]+fn.radius*Math.sin(ym),Et.centre[1]+fn.radius*Math.cos(ym),Et.centre[2]),at.width=0)}),W.setFocus(y>=0?b[y].year:null),W.setFilter(qe);let It=Ll(b,qe);if(W.setJumps(Pe?wf(Pe,W.slotOf("clone")):Af(b,It)),S){let at=Rf(b,It,S.list.length);de.forEach((St,fn)=>{St&&(St.dim=y>=0&&b[y].period!==fn?0:qe&&!at[fn]?.3:1,St.node.querySelector(".galaxy-count").textContent=qe?` \xB7 ${at[fn]}`:"",St.width=0)})}},Ni=y=>{let F=d[y];if(F.kind==="milestone"){let te=b[Gt(y)],Pe=S.list[te.period];W.fly({target:Pe.centre.map((Ye,Ot)=>Ye+(te.position[Ot]-Ye)*.35),distance:Dn(Pe.radius*4.2+16,40,130),pitch:Dn(W.goal.pitch,-.45,.5)})}else F.kind==="book"||F.kind==="clone"?W.fly({target:Q[F.kind],distance:54,pitch:Dn(W.goal.pitch,-.45,.5)}):F.kind==="contact"?W.fly({target:[0,0,-7],distance:W.homeDistance(),yaw:0,pitch:wu}):W.home();W.setIdle(F.kind==="hero")},Di=y=>y.querySelectorAll("li[data-ask]").forEach(F=>{let te=ct("button","ask-q",F.querySelector(".ask-q").textContent);te.type="button",te.dataset.ask=F.dataset.ask,te.setAttribute("aria-pressed",String(V===F.dataset.ask)),F.replaceChildren(te)}),Ui=y=>{if(V=y&&U.has(y)&&d[pt].kind==="clone"?y:null,e.dataset.asked=V??"",oe.querySelectorAll(".ask-q").forEach(te=>te.setAttribute("aria-pressed",String(te.dataset.ask===V))),kn(),!V)return Ni(pt);W.fly({target:[0,0,-7],distance:W.homeDistance(),yaw:0,pitch:wu});let F=[...U.get(V)].map(te=>M[te].element.querySelector("h3").textContent);yt.textContent=$e.lit.replace("{n}",()=>String(F.length)).replace("{names}",()=>F.join(", "))},ei=y=>y.querySelectorAll("ul.facets").forEach(F=>{let te=F.dataset.facet;F.querySelectorAll("li").forEach(Pe=>{let Ye=ct("button","chip",Pe.textContent);Ye.type="button",Ye.dataset.facet=te,Ye.dataset.item=Pe.dataset.item,Ye.setAttribute("aria-pressed",String(qe?.facet===te&&l[te][qe.item]===Pe.dataset.item)),Ye.setAttribute("title",$e.filter.replace("{thread}",Pe.textContent)),Pe.replaceChildren(Ye)})}),On=(y,F)=>{let te=[...Un.links,...Un.near];if(!te.length)return;let Pe=_u(b,F),Ye=dn?te.slice(0,Ru):Pe,Ot=ct("div","related");Ot.append(ct("p","kicker",$e.related));let Et=ct("ul");if(Ye.forEach(It=>{let at=ct("li"),St=ct("button","peer");St.type="button",St.dataset.memory=String(It),St.append(ct("time","",q[It].time),ct("span","",q[It].title)),at.append(St),Et.append(at)}),Et.addEventListener("scroll",()=>G()),Ot.append(Et),te.length>Pe.length){let It=ct("button","expander",dn?$e.fewer:$e.all.replace("{n}",String(Math.min(te.length,Ru))));It.type="button",It.setAttribute("aria-expanded",String(dn)),Ot.append(It)}y.append(Ot)},w=()=>{let y=Mt.firstElementChild,F=Gt(pt);!y||F<0||(y.querySelector(".related")?.remove(),On(y,F),oe.dataset.collapsed=y.querySelector(".expander")&&!dn?"1":"",G(),Mt.querySelector(".expander")?.focus({preventScroll:!0}))},G=()=>{let y=oe.querySelector(".related"),F=y?.querySelector("ul");if(!F)return;let te=F.getBoundingClientRect().bottom+2,Pe=[...F.children].filter(Ye=>Ye.getBoundingClientRect().bottom>te).length;y.dataset.more=F.scrollHeight>F.clientHeight+2&&Pe?$e.more.replace("{n}",String(Pe)):""},J=-1,ne=y=>{J!==y&&(J=y,W.setPreview(y))},ee=()=>{if(delete oe.dataset.fit,!!c1.has(oe.dataset.kind)){oe.classList.add("measure");for(let y of h1){if(oe.scrollHeight<=oe.clientHeight)break;oe.dataset.fit=y}oe.classList.remove("measure")}},Me=()=>{let y=d[pt],F=y.panel.cloneNode(!0);F.removeAttribute("data-station"),F.removeAttribute("data-panel"),F.removeAttribute("id"),F.querySelectorAll("[id]").forEach(Et=>Et.removeAttribute("id")),F.querySelectorAll("[tabindex]").forEach(Et=>Et.removeAttribute("tabindex")),F.querySelectorAll("h1, h2, h3").forEach(u1),ei(F),Di(F);let te=Gt(pt);te>=0&&On(F,te),y.kind==="milestone"&&F.querySelector(".period-head")?.remove(),ne(-1),Mt.replaceChildren(F),oe.dataset.collapsed=F.querySelector(".expander")&&!dn?"1":"",oe.dataset.kind=y.kind,Le.forEach((Et,It)=>Et.hidden=y.kind!==It);let{previous:Pe,next:Ye}=Li(pt),Ot=(Et,It,at)=>{Et.hidden=It===null,Et.dataset.to=It??"",Et.textContent=at};Ot(xt,Pe,`\u2190 ${$e.earlier}`),Ot(Rt,Ye,`${$e.later} \u2192`),ht.hidden=y.kind==="hero"||Pe===null&&Ye===null,He.hidden=y.kind==="hero",ee(),G(),oe.classList.remove("live"),oe.offsetWidth,oe.classList.add("live"),oe.scrollTop=0,me="",y.kind!=="hero"&&Le.get(y.kind)?.scrollIntoView({block:"nearest"}),Be||(yt.textContent=y.label),j()},we=()=>{let y=d[pt];return y.kind==="hero"?In.start:y.kind==="milestone"?b[Gt(pt)].year:{book:In.book,clone:In.clone}[y.kind]??In.end},Re=()=>{if(ut.hidden)return;let y=oe.getBoundingClientRect(),F=!Gl.matches,te=Math.max(160,innerWidth-24-(F?y.right+12:y.left));ut.style.maxWidth=`${Math.min(340,te)}px`;let Pe=F?y.right+12:y.left;ut.style.left=`${Math.max(12,Math.min(Pe,innerWidth-ut.offsetWidth-12)).toFixed(1)}px`,ut.style.top=`${(F?y.bottom-ut.offsetHeight:y.top-ut.offsetHeight-8).toFixed(1)}px`},L=()=>{let y=d[pt],F=!Ct.closed&&Ct.opened.size>=3&&y.kind==="milestone";if(ut.hidden=!F,!F)return;let te=Ct.sawClone?"clone":"book";st.dataset.go=te,st.href=`#${te}`,st.textContent=$e[te==="clone"?"nudgeclone":"nudgebook"],Je.setAttribute("aria-label",$e.nudgeclose),Je.setAttribute("title",$e.nudgeclose),Re()};Je.addEventListener("click",()=>{Ct.closed=!0,L(),oe.focus({preventScroll:!0})}),ut.addEventListener("click",y=>{let F=y.target.closest("[data-go]");F&&(y.preventDefault(),Ls(F.dataset.go))});let j=()=>{Re();let y=oe.getBoundingClientRect(),F=Math.max(Au,a.getBoundingClientRect().bottom+6);Gl.matches?W.setInset(0,(F+Math.max(F+120,y.top))/2-innerHeight/2):W.setInset((y.right+innerWidth)/2-innerWidth/2,(F+innerHeight-r1)/2-innerHeight/2)},he=r?.querySelector("[data-play]"),ge={running:!1,year:null,from:0},be=()=>{if(!he)return;he.setAttribute("aria-pressed",String(ge.running));let y=ge.running?he.dataset.pauseLabel:he.dataset.playLabel;he.setAttribute("aria-label",y),he.setAttribute("title",y),he.querySelector(".rail-name").textContent=ge.running?he.dataset.pauseName:he.dataset.playName,r.dataset.playing=ge.year===null?"":ge.running?"1":"paused"},Fe=()=>{ge.year!==null&&(ge.running=!1,ge.year=null,W.setReveal(null),be())},Be=!1,De=(y,{push:F=!0,hush:te=!1}={})=>{Be=te,Fe(),pt=Dn(y,0,u),V=null,dn=!1,e.dataset.asked="",d[pt].kind==="milestone"&&!Lt.seen&&(Lt.seen=!0,Lt.on=!0,Lt.from={...Ht},e.dataset.gentle="1");let Pe=d[pt];if(document.documentElement.dataset.at=pt,n.textContent=Pe.label,kn(),Ni(pt),d[pt].kind==="milestone"&&!te&&Ct.opened.add(pt),d[pt].kind==="clone"&&(Ct.sawClone=!0),Me(),L(),r&&r.querySelector(".rail-cursor")?.style.setProperty("--x",`${Us(we()).toFixed(2)}%`),Pe.kind==="milestone"?R.memory(b[Gt(pt)]):(Pe.kind==="book"||Pe.kind==="clone")&&R.swell(Pe.kind),F)try{history.replaceState(null,"",Pe.kind==="hero"?`${location.pathname}${location.search}`:`#${Pe.id}`)}catch{return}},Qe=y=>{qe=y,a.querySelectorAll(".legend button").forEach(F=>{let te=F.closest(".legend").dataset.facet;F.setAttribute("aria-pressed",String(!!qe&&qe.facet===te&&l[te][qe.item]===F.dataset.item))}),oe.querySelectorAll(".chip").forEach(F=>F.setAttribute("aria-pressed",String(!!qe&&qe.facet===F.dataset.facet&&l[F.dataset.facet][qe.item]===F.dataset.item))),e.dataset.filter=qe?`${qe.facet}:${l[qe.facet][qe.item]}`:"",Ve.hidden=!qe,ze.dataset.active=qe?"1":"",ze.setAttribute("aria-label",qe?`${wn} \xB7 ${N[qe.facet][l[qe.facet][qe.item]]??""}`:wn),qe&&(Ve.textContent=`\u2715 ${N[qe.facet][l[qe.facet][qe.item]]??""}`,Ve.setAttribute("aria-label",`${$e.unfilter}: ${N[qe.facet][l[qe.facet][qe.item]]??""}`)),kn(),d[pt].kind==="milestone"&&Me()},Ve=a.querySelector("[data-unfilter]");Ve.addEventListener("click",()=>Qe(null));let dt=(y,F)=>{let te=l[y].indexOf(F);Qe(qe?.facet===y&&qe.item===te?null:{facet:y,item:te})};a.querySelectorAll(".legend button").forEach(y=>y.addEventListener("click",()=>dt(y.closest(".legend").dataset.facet,y.dataset.item)));let At=[...a.querySelectorAll(".legend")];At.forEach(y=>y.hidden=!1),an.push(()=>At.forEach(y=>y.hidden=!0));let ke=a.querySelector("[data-legend-toggle]");ke?.addEventListener("click",()=>{let y=a.dataset.legend!=="open";y&&En(!1),a.dataset.legend=y?"open":"",ke.setAttribute("aria-expanded",String(y)),j()}),e.dataset.filter="";let Oe=a.querySelector(".finder"),zt=Oe.querySelector("input"),bn=Oe.querySelector(".results"),mi=Oe.querySelector(".none"),jn=a.querySelector("[data-find]"),Kt=Oe.querySelector(".preview"),Tn=y=>{Kt.dataset.on=y>=0?"1":"",!(y<0)&&(Kt.querySelector("time").textContent=q[y].time,Kt.querySelector("strong").textContent=q[y].title,Kt.querySelector("p").textContent=q[y].body.match(/^.*?[.!?](?=\s|$)/)?.[0]??q[y].body)},on=y=>{let F=y.target.closest?.(".peer[data-memory]"),te=F&&Oe.contains(F)?+F.dataset.memory:-1;Tn(te),ne(te)},Oi=y=>{let F=ct("li"),te=ct("button","peer");return te.type="button",te.dataset.memory=String(y),te.append(ct("time","",q[y].time),ct("span","",q[y].title)),F.append(te),F},gi=()=>bn.replaceChildren(...[...t.querySelectorAll("section.period")].flatMap(y=>{let F=[...y.querySelectorAll("[data-station='milestone']")].map(Pe=>Gt(d.findIndex(Ye=>Ye.element===Pe))),te=ct("li","group",y.querySelector(".kicker")?.textContent??"");return te.setAttribute("aria-hidden","true"),[te,...F.map(Oi)]})),ti=y=>{Oe.hidden=!y,jn.setAttribute("aria-expanded",String(y)),y?(zt.value.trim()||gi(),Yn.hidden||En(!1),zt.focus()):(Tn(-1),ne(-1),Oe.contains(document.activeElement)&&document.activeElement.blur(),zt.value="",bn.replaceChildren(),mi.textContent="")};jn.addEventListener("click",()=>ti(Oe.hidden)),Oe.addEventListener("focusin",on),bn.addEventListener("pointerover",on),bn.addEventListener("pointerleave",()=>{(!Oe.contains(document.activeElement)||document.activeElement===zt)&&(Tn(-1),ne(-1))}),zt.addEventListener("input",()=>{let y=mu(B,zt.value),F=bf(b,l,N,zt.value);bn.replaceChildren(...F.map(te=>{let Pe=ct("li"),Ye=ct("button","peer show");return Ye.type="button",Ye.dataset.facet=te.facet,Ye.dataset.item=l[te.facet][te.item],Ye.append(ct("time","",String(te.count)),ct("span","",$e.filter.replace("{thread}",te.title))),Pe.append(Ye),Pe}),...y.map(te=>Oi(te.index))),zt.value.trim()||gi(),mi.textContent=zt.value.trim()&&!y.length&&!F.length?mi.dataset.none:""}),Oe.addEventListener("submit",y=>{y.preventDefault(),bn.querySelector("button")?.click()}),bn.addEventListener("click",y=>{let F=y.target.closest("button");if(F){if(ti(!1),F.dataset.facet){let te=l[F.dataset.facet].indexOf(F.dataset.item);return Qe(qe?.facet===F.dataset.facet&&qe.item===te?qe:{facet:F.dataset.facet,item:te})}De(pn(+F.dataset.memory)),oe.focus({preventScroll:!0})}}),Oe.addEventListener("keydown",y=>{if(y.key==="ArrowDown"||y.key==="ArrowUp"){let F=[...bn.querySelectorAll("button")];if(!F.length)return;y.preventDefault();let te=F.indexOf(document.activeElement);F[Dn(te+(y.key==="ArrowDown"?1:-1),0,F.length-1)]?.focus(),te===0&&y.key==="ArrowUp"&&zt.focus()}}),a.querySelector("[data-surprise]").addEventListener("click",()=>{let y=Gt(pt),F=y;for(;F===y&&b.length>1;)F=Math.floor(Math.random()*b.length);De(pn(F))});let Yn=a.querySelector(".guide"),Fi=a.querySelector("[data-guide-toggle]"),En=y=>{Yn.hidden=!y,Fi.setAttribute("aria-expanded",String(y)),y&&(ti(!1),a.dataset.legend="",ke?.setAttribute("aria-expanded","false"))};Fi.addEventListener("click",()=>En(Yn.hidden)),jn.addEventListener("click",()=>!Oe.hidden&&En(!1));let ze=a.querySelector("[data-more-toggle]"),wn=ze.getAttribute("aria-label"),qt=y=>{a.dataset.sheet=y?"open":"",ze.setAttribute("aria-expanded",String(y))};ze.addEventListener("click",()=>qt(a.dataset.sheet!=="open"));let ln=a.querySelector(".sheet");ln.addEventListener("click",y=>{let F=y.target.closest("button, a");if(!F||F.matches(".lang"))return F&&qt(!1);qt(!1),((F.matches("[data-legend-toggle]")?a.querySelector(".legend button"):ze)??ze).focus()}),ln.addEventListener("focusout",y=>a.dataset.sheet==="open"&&!ln.contains(y.relatedTarget)&&y.relatedTarget!==ze&&qt(!1));let Ce=y=>a.dataset.sheet==="open"&&!y.target.closest(".sheet, [data-more-toggle]")&&qt(!1);document.addEventListener("pointerdown",Ce),i.addEventListener("pointerdown",()=>En(!1)),an.push(()=>document.removeEventListener("pointerdown",Ce));let mt=a.querySelector("[data-sound]");if(R.supported){mt.hidden=!1,mt.setAttribute("aria-pressed","true"),mt.addEventListener("click",()=>mt.setAttribute("aria-pressed",String(R.toggle())));let y=Ye=>{if(R.running())return te();Ye.target.closest?.("[data-sound]")||R.start()},F=["pointerup","touchend","click","keydown"],te=()=>F.forEach(Ye=>document.removeEventListener(Ye,y,!0));F.forEach(Ye=>document.addEventListener(Ye,y,!0));let Pe=()=>R.pause(document.hidden);document.addEventListener("visibilitychange",Pe),an.push(()=>{te(),document.removeEventListener("visibilitychange",Pe),R.close(),mt.setAttribute("aria-pressed","false"),mt.hidden=!0})}let nn=ct("p","visually-hidden");nn.setAttribute("role","status"),e.append(nn);let bt=null,Qt=()=>document.documentElement.dataset.focus==="1",gr=y=>{document.documentElement.dataset.focus=y?"1":"",nn.textContent=y?a.dataset.focusNote:"",bt=y?{...Ht}:null,y&&(En(!1),qt(!1),ti(!1))},An=()=>Qt()&&gr(!1),cn=()=>{Lt.on&&(Lt.on=!1,e.dataset.gentle="",kn())},Wt=performance.now()/1e3,Fn=()=>Wt=performance.now()/1e3,Is=y=>{Ht.x=y.clientX,Ht.y=y.clientY,bt&&Math.hypot(Ht.x-bt.x,Ht.y-bt.y)>12&&An(),Lt.on&&Math.hypot(Ht.x-Lt.from.x,Ht.y-Lt.from.y)>12&&cn(),Math.abs(y.movementX)+Math.abs(y.movementY)>6&&Fn()},_i=()=>{An(),cn(),Fn()},Pa=[["pointermove",Is],["pointerdown",_i],["wheel",_i],["touchstart",_i]];Pa.forEach(([y,F])=>addEventListener(y,F,{passive:!0})),an.push(()=>{Pa.forEach(([y,F])=>removeEventListener(y,F)),delete document.documentElement.dataset.focus});let Ps=Gf(b),Wl={phase:"waiting",step:0,at:0};oe.addEventListener("pointerover",y=>{let F=y.target.closest(".related .peer");ne(F?+F.dataset.memory:-1)}),oe.addEventListener("pointerleave",()=>ne(-1)),oe.addEventListener("focusin",y=>{let F=y.target.closest(".related .peer");F&&ne(+F.dataset.memory)}),oe.addEventListener("focusout",()=>ne(-1)),oe.addEventListener("click",y=>{let F=y.target.closest(".chip");if(F)return dt(F.dataset.facet,F.dataset.item);if(y.target.closest(".expander"))return dn=!dn,kn(),w();let Pe=y.target.closest(".ask-q");if(Pe)return Ui(V===Pe.dataset.ask?null:Pe.dataset.ask);let Ye=y.target.closest(".peer");if(Ye)return De(pn(+Ye.dataset.memory)),oe.focus({preventScroll:!0});let Ot=y.target.closest(".step");if(Ot&&Ot.dataset.to!=="")return De(+Ot.dataset.to),oe.focus({preventScroll:!0});let Et=y.target.closest("[data-go]");Et&&_r.has(Et.dataset.go)&&(y.preventDefault(),Ls(Et.dataset.go))});let _r=new Map(d.map(y=>[y.id,y.t]));document.querySelectorAll("section.period").forEach(y=>{let F=y.querySelector("[data-station]");_r.set(y.id,d.findIndex(te=>te.element===F))});let Ls=y=>{if(!_r.has(y))return;let F=_r.get(y);De(F),d[F].kind!=="hero"&&Le.get(d[F].kind)?.querySelector("input, a, button")?.focus()},Xl=()=>{let y;try{y=decodeURIComponent(location.hash.slice(1))}catch{return}if(!y)return De(0,{push:!1});_r.has(y)&&De(_r.get(y),{push:!1})};document.querySelectorAll("[data-go]").forEach(y=>y.addEventListener("click",F=>{oe.contains(y)||!_r.has(y.dataset.go)||(F.preventDefault(),Ls(y.dataset.go))})),addEventListener("hashchange",Xl),an.push(()=>removeEventListener("hashchange",Xl)),t.addEventListener("focusin",y=>{let F=d.find(te=>te.element.contains(y.target));F&&F.t!==pt&&De(F.t)});let Iu={hero:_,book:f,clone:v};Le.forEach((y,F)=>y.addEventListener("focusin",()=>pt!==Iu[F]&&De(Iu[F])));let Pu={ArrowDown:1,ArrowRight:1,PageDown:1," ":1,ArrowUp:-1,ArrowLeft:-1,PageUp:-1},Lu=y=>{if(!(y.metaKey||y.ctrlKey||y.altKey)&&(Fn(),cn(),!(Qt()&&y.key.toLowerCase()!=="h"&&(gr(!1),y.key==="Escape")))){if(y.key==="Escape"){if(!Yn.hidden)En(!1),Fi.focus();else if(a.dataset.sheet==="open")qt(!1),ze.focus();else if(!Oe.hidden)ti(!1),jn.focus();else{if(y.target.closest("input, textarea, select"))return;V?Ui(null):qe?Qe(null):pt!==0&&De(0)}return}if(!y.target.closest("input, textarea, select, .finder")){if(y.key==="/")return y.preventDefault(),ti(!0);if(y.key==="?")return y.preventDefault(),En(Yn.hidden);if(y.key.toLowerCase()==="h")return y.preventDefault(),y.repeat?void 0:gr(!Qt());if(!(y.key===" "&&y.target.closest("button, a, summary, [role='button']"))){if(y.key==="Home")y.preventDefault(),De(0);else if(y.key==="End")y.preventDefault(),De(g);else if(y.key in Pu){y.preventDefault();let F=y.key===" "&&y.shiftKey?-1:Pu[y.key],{previous:te,next:Pe}=Li(pt),Ye=F>0?Pe:te;Ye!==null&&De(Ye)}}}}};addEventListener("keydown",Lu),an.push(()=>removeEventListener("keydown",Lu)),W.on("hover",y=>{y>=0&&y!==pi&&R.tick(),pi=y,i.style.cursor=y>=0?"pointer":""});let Mm=y=>y===b.length?f:y===b.length+1?v:-1;W.on("click",y=>{y>=0&&De(y<b.length?pn(y):Mm(y))});let Nu=d.filter(y=>["milestone","book","clone"].includes(y.kind)),ql=d.map(y=>y.kind==="milestone"?b[Gt(y.t)].year:{hero:In.start,book:In.book,clone:In.clone}[y.kind]??In.end);if(r){let y=r.querySelector(".rail-track"),F=r.querySelector(".rail-tip");r.querySelector(".rail-today")?.style.setProperty("--x",`${Us(o).toFixed(2)}%`);let te=at=>{let St=y.getBoundingClientRect();return In.start+Dn((at.clientX-St.left)/St.width,0,1)*(In.end-In.start)},Pe=at=>Nu.reduce((St,fn)=>Math.abs(ql[fn.t]-at)<Math.abs(ql[St.t]-at)?fn:St,Nu[0]),Ye=at=>`${at.element.querySelector("time")?.textContent??""} \xB7 ${at.element.querySelector("h3, h2")?.textContent??""}`.replace(/^ · /,""),Ot=!1,Et=-1,It=at=>{let St=Pe(te(at));return F.textContent=Ye(St),F.style.setProperty("--x",`${Us(ql[St.t]).toFixed(2)}%`),F.dataset.on="1",St};y.addEventListener("pointerdown",at=>{Ot=!0,y.setPointerCapture(at.pointerId);let St=It(at);Et=St.t,De(St.t)}),y.addEventListener("pointermove",at=>{let St=It(at);Ot&&St.t!==Et&&(Et=St.t,De(St.t))}),y.addEventListener("pointerup",()=>Ot=!1),y.addEventListener("pointerleave",()=>F.dataset.on="")}he?.addEventListener("click",()=>{if(ge.running)return ge.running=!1,be();ge.year===null&&(pt!==0&&De(0),ge.year=1980),ge.running=!0,ge.from=performance.now()/1e3-ld(ge.year,o),be()});let bm=()=>{let y=[oe,a,n,r,ut.hidden?null:ut].filter(Boolean).map(te=>te.getBoundingClientRect()),F=Oe.hidden?null:Oe.getBoundingClientRect();return F&&y.push(F),y},vr=(y,F)=>y.left<F.right&&y.right>F.left&&y.top<F.bottom&&y.bottom>F.top;W.on("frame",({formed:y,projected:F,camera:te,cssScale:Pe,time:Ye,dt:Ot,intro:Et,entered:It,seen:at})=>{if(fe.isConnected){let ae=F[ie];fe.style.left=`${ae.x}px`,fe.style.top=`${ae.y}px`,fe.style.visibility=ae.on?"visible":"hidden"}if($&&(Number.isFinite(y)&&S.list.forEach((ae,Ke)=>{if(ue.has(Ke)||y<ae.start)return;ue.add(Ke);let Ft=b.findIndex(gt=>gt.year>=ae.start-.01);Ft>=0&&R.memory(b[Ft])}),It&&Se()),z&&D.windows<Ji.windows&&Et>=1&&(D.from||(D.from=Ye+1),Ye>=D.from&&(D.frames.push(Ot*1e3),D.frames.length>=Ji.window))){let ae=kf(x,Vf(D.frames));D.frames=[],D.windows++,ae!==x&&(x=ae,W.setQuality(x),i.dataset.quality=String(x))}let St=performance.now()/1e3,fn=!document.hidden&&Oe.hidden&&Yn.hidden&&a.dataset.sheet!=="open"&&!qe&&ge.year===null&&!Qt()&&!document.activeElement?.closest?.("input, textarea, select, button, a, .finder, .card, .masthead, .rail")&&!oe.matches(":hover"),xr=Hf(Wl,{now:St,idleSince:Wt,eligible:fn&&(Wl.phase==="touring"||pt===0),plan:Ps},{wait:+a.dataset.idle||20,hold:+a.dataset.tourHold||6});Wl=xr.state,xr.open!==null?De(pn(xr.open),{push:!1,hush:!0}):xr.done&&De(0,{push:!1,hush:!0}),ge.running&&(ge.year=od(performance.now()/1e3-ge.from,o),W.setReveal(ge.year),r.querySelector(".rail-cursor")?.style.setProperty("--x",`${Us(ge.year).toFixed(2)}%`),n.textContent=String(Math.floor(ge.year)),ge.year>=o&&(Fe(),n.textContent=d[pt].label));let Rn=Gt(pt),Gr=W.view.distance/W.homeDistance(),Tm=new Set(fi.slice(0,Ru)),Bi=bm().map(ae=>({left:ae.left-12,right:ae.right+12,top:ae.top-12,bottom:ae.bottom+12}));Bi.push({left:0,right:innerWidth,top:0,bottom:Math.max(Au,(s?.getBoundingClientRect().bottom??0)+4)},{left:0,right:innerWidth,top:innerHeight-60,bottom:innerHeight});let jl=[],Em=Gl.matches,Ns=!Lt.on&&zf(Gr,innerWidth,520,!Em||oe.getBoundingClientRect().top>=kr.top+kr.height+8),Uu=Ns?"on":"off";e.dataset.map!==Uu&&(e.dataset.map=Uu),jt.hidden===Ns&&(jt.hidden=!Ns);let ni=Ns?jt.getBoundingClientRect():null;if(Ns&&Rn>=0){let ae=b[Rn].position[2];H++%8===0&&Ki.forEach((ot,hn)=>{let rn=W.centerOf(hn),[Nt,zn]=Ie.to([rn.x,rn.y]);ot.setAttribute("cx",Nt.toFixed(1)),ot.setAttribute("cy",zn.toFixed(1))}),Pi.setAttribute("points",[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([ot,hn])=>Ie.to(W.groundAt(ot,hn,ae)).map(rn=>rn.toFixed(1)).join(",")).join(" "));let Ke=W.centerOf(Rn),[Ft,gt]=Ie.to([Ke.x,Ke.y]);Yt.setAttribute("cx",Ft.toFixed(1)),Yt.setAttribute("cy",gt.toFixed(1))}ni&&(Bi.push({left:ni.left-8,right:ni.right+8,top:ni.top-8,bottom:ni.bottom+8}),jl.push(ni));let Ou=new Map,Fu=[],Yl=[];if(Rn>=0&&ge.year===null){let ae=oe.getBoundingClientRect(),Ke=Gl.matches,Ft={left:Ke?12:ae.right+12,right:innerWidth-12,top:Math.max(Au,a.getBoundingClientRect().bottom+6),bottom:Math.min((r?.getBoundingClientRect().top??innerHeight-100)-8,Ke?ae.top-8:1/0)},gt=F[Rn],ot=Math.min(innerWidth,innerHeight)/2,hn=gt&&gt.x>=Ft.left&&gt.x<=Ft.right&&gt.y>=Ft.top&&gt.y<=Ft.bottom?{left:Math.max(Ft.left,gt.x-ot),right:Math.min(Ft.right,gt.x+ot),top:Math.max(Ft.top,gt.y-ot),bottom:Math.min(Ft.bottom,gt.y+ot)}:Ft;fi.slice(0,o1).forEach(Nt=>{let zn=Ue.map((Cn,Vt)=>W.arcScreen(Rn,Nt,Vt/_m,Cn)),et=Nf(zn,hn);et&&Fu.push({j:Nt,...et})});let rn=Fu.slice(0,vm).map((Nt,zn)=>{let et=K[zn],Cn=`${q[Nt.j].title} \xB7 ${q[Nt.j].time}`;et.label.textContent!==Cn&&(et.label.textContent=Cn,et.width=et.height=0),et.node.hidden=!1,et.width||(et.width=et.node.offsetWidth),et.height||(et.height=et.node.offsetHeight);let Vt=Df(Nt,hn);return{mark:et,exit:Nt,side:Vt,box:Uf(Nt,Vt,et,hn),shown:!1}});Of(rn,hn,4,ni?[{left:ni.left,right:ni.right,top:ni.top,bottom:ni.bottom}]:[]),K.forEach((Nt,zn)=>{let et=rn[zn];Nt.node.hidden=!et?.shown,et?.shown&&(Nt.node.style.transform=`translate3d(${et.box.left.toFixed(1)}px, ${et.box.top.toFixed(1)}px, 0)`,Nt.node.dataset.memory=String(et.exit.j),Nt.node.dataset.side=et.side,Ou.set(et.exit.j,et.exit.t),Yl.push(et.exit.j),jl.push(et.box),Nt.arrow.style.cssText=`left: ${(et.exit.x-et.box.left).toFixed(1)}px; top: ${(et.exit.y-et.box.top).toFixed(1)}px; --a: ${et.exit.angle.toFixed(3)}rad`,Bi.push({left:et.box.left-4,right:et.box.right+4,top:et.box.top-4,bottom:et.box.bottom+4}))})}else K.forEach(ae=>ae.node.hidden=!0);W.setLinkReach(Ou),e.dataset.edges=String(K.filter(ae=>!ae.node.hidden).length||"");let Bu=Yl.join(",");if(Bu!==me){me=Bu;let ae=new Set(Yl.map(String));oe.querySelectorAll(".peer[data-memory]").forEach(Ke=>Ke.dataset.out=ae.has(Ke.dataset.memory)?"1":"")}let Bn={x:0,y:0,visible:!1};Ne.forEach(ae=>{let Ke=ae.base*(ae.year<=y?1:0);if(ge.year!==null&&ae.year>ge.year&&(Ke=0),Ke*=ae.dim??1,W.project(ae.world,Bn),!Bn.visible)Ke=0;else if(ae.width||(ae.width=ae.node.offsetWidth),ae.height||(ae.height=ae.node.offsetHeight),ae.kind==="ahead"){let{width:gt,height:ot}=ae,hn=ae.spotAt>=0?F[ae.spotAt].r:ae.ring*Pe/te.position.distanceTo(ae.world),rn=Lf(hn),Nt=a1.flatMap(zn=>l1.map(([et,Cn])=>{let Vt=rn+zn,$n=Bn.x+et*Vt-(et<0?gt:et===0?gt/2:0),Vu=Bn.y+Cn*Vt-(Cn<0?ot:Cn===0?ot/2:0);return{left:$n,right:$n+gt,top:Vu,bottom:Vu+ot}})).find(zn=>zn.left>=12&&zn.right<=innerWidth-12&&!Bi.some(et=>vr(zn,et)));Nt?(ae.node.style.transform=`translate3d(${Nt.left.toFixed(1)}px, ${Nt.top.toFixed(1)}px, 0)`,ae.node.style.setProperty("--cx",Bn.x.toFixed(1)),ae.node.style.setProperty("--cy",Bn.y.toFixed(1)),ae.node.style.setProperty("--r",Math.min(hn,70).toFixed(1)),Ke>.2&&Bi.push({left:Nt.left-4,right:Nt.right+4,top:Nt.top-4,bottom:Nt.bottom+4})):Ke=0}else{Bn.x=Dn(Bn.x,ae.width/2+12,innerWidth-ae.width/2-12),ae.node.style.transform=`translate3d(${Bn.x.toFixed(1)}px, ${Bn.y.toFixed(1)}px, 0)`;let gt=ae.kind==="ring-year"||ae.kind==="countdown-mark"?1:4,ot={left:Bn.x-ae.width/2-gt,right:Bn.x+ae.width/2+gt,top:Bn.y-ae.height/2-gt,bottom:Bn.y+ae.height/2+gt};(ae.kind==="ring-year"||ae.kind==="countdown-mark")&&Bi.some(rn=>vr(ot,rn))&&(Ke=0);let hn={left:ot.left+4,right:ot.right-4,top:ot.top+4,bottom:ot.bottom-4};ae.kind==="galaxy"&&(jl.some(rn=>vr(hn,rn))||Bi.some(rn=>vr(hn,rn)))&&(Ke=0),Ke>.2&&Bi.push(ot)}let Ft=Math.round(Ke*100)/100;Ft!==ae.shown&&(ae.shown=Ft,ae.node.style.opacity=Ft,ae.node.style.visibility=Ft>0?"visible":"hidden")});let wm=innerWidth<=760?8:Gr>.8?14:s1,$l=[],zu=[];F.forEach((ae,Ke)=>Ke<b.length&&ae.on&&ae.r>3&&zu.push({j:Ke,left:ae.x-ae.r*.7,right:ae.x+ae.r*.7,top:ae.y-ae.r*.7,bottom:ae.y+ae.r*.7})),Y.forEach((ae,Ke)=>{let Ft=F[Ke],gt=b[Ke],ot=0;Ke===Rn?ot=1e3:Ke===pi?ot=900:Ke===J?ot=880:Tm.has(Ke)?ot=500+gt.weight:qe&&gt.members[qe.facet]?.includes(qe.item)?ot=300+gt.weight:se.has(Ke)&&Gr>=.6&&!qe?ot=40:gt.weight>=3&&Gr<.6?ot=30:gt.weight===2&&Gr<.5?ot=20:Gr<.22&&(ot=10),Rn>=0&&ot<500&&(ot=0),gt.year+3>y&&Ke!==Rn&&(ot=0),!Te&&at&&Ke===ie&&(ot=900),ge.year!==null&&(ot=gt.year<=ge.year&&gt.year>ge.year-2.5?800+gt.weight:0),ot>0&&Ft.on?$l.push({tag:ae,spot:Ft,priority:ot,i:Ke}):ae.on&&(ae.on=!1,ae.node.dataset.on="")}),$l.sort((ae,Ke)=>Ke.priority-ae.priority||ae.i-Ke.i);let Zl=[];for(let{tag:ae,spot:Ke,priority:Ft,i:gt}of $l){let ot=Ft===40?"1":"",hn=gt===Rn||gt===pi?"1":"";(ae.node.dataset.name!==ot||ae.node.dataset.hot!==hn)&&(ae.node.dataset.name=ot,ae.node.dataset.hot=hn,ae.width=ae.height=0),ae.width||(ae.width=ae.node.offsetWidth),ae.height||(ae.height=ae.node.offsetHeight);let rn=Cf(Ke,{width:ae.width,height:ae.height},innerWidth);if(Ft>=900){let Vt=Dn(Ke.x-ae.width/2,12,innerWidth-ae.width-12);rn.splice(8,0,{left:Vt,right:Vt+ae.width,top:Ke.y-ae.height/2,bottom:Ke.y+ae.height/2,far:!1})}let Nt=Vt=>Vt.left>=12&&Vt.right<=innerWidth-12,Cn=If(rn,{free:Vt=>Nt(Vt)&&!Bi.some($n=>vr(Vt,$n))&&!Zl.some($n=>vr(Vt,{left:$n.left-6,right:$n.right+6,top:$n.top-4,bottom:$n.bottom+4})),clear:Vt=>!zu.some($n=>$n.j!==gt&&vr(Vt,$n)),inside:Nt,forced:Ft>=900});if(Cn&&Zl.length<wm){Zl.push(Cn);let Vt=Cn.far?Pf(Cn,Ke):null;Vt?(Object.assign(ae.leader.style,{left:`${Vt.x.toFixed(1)}px`,top:`${Vt.y.toFixed(1)}px`,width:`${Vt.length.toFixed(1)}px`,transform:`rotate(${Vt.angle.toFixed(3)}rad)`}),ae.node.dataset.leader="1"):ae.node.dataset.leader="",ae.node.style.transform=`translate3d(${Cn.left.toFixed(1)}px, ${Cn.top.toFixed(1)}px, 0)`,ae.node.style.setProperty("--cx",Ke.x.toFixed(1)),ae.node.style.setProperty("--cy",Ke.y.toFixed(1)),ae.on||(ae.on=!0,ae.node.dataset.on="1")}else ae.on&&(ae.on=!1,ae.node.dataset.on="")}}),new ResizeObserver(j).observe(oe);let Du=()=>{W.resize(),ee(),G(),j(),d[pt].kind==="hero"?W.home():Ni(pt)};addEventListener("resize",Du),addEventListener("themechange",W.applyTheme),an.push(()=>{removeEventListener("resize",Du),removeEventListener("themechange",W.applyTheme)}),W.on("error",y=>{console.error(y),Hl()}),document.documentElement.classList.add("immersive"),document.fonts?.ready.then(()=>{Y.forEach(y=>(y.width=0,y.height=0)),ee(),G(),j()}),a.dataset.ready="1",De(0,{push:!1}),Xl(),j()}Sm();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
