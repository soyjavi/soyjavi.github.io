(()=>{document.querySelectorAll("form.waitlist").forEach(i=>{let e=i.querySelector(".status");i.addEventListener("submit",()=>{e.textContent=i.dataset.opened})});var Pc=[1.6,4.2],Md={1:1.1,2:1.6,3:2.2},vg=51,rr=["threads","people","places"],Ac=[0,1,-1,2,-2],Rc={sigma:1.6,background:.08},Mr={base:470,cap:12e4,trail:18e3},fi={inner:900,outer:1600,stars:9e3,halo:.015,band:.35,tilt:.6,thickness:.16},$t={core:4,reach:3.2,gap:12,future:44,twist:2.2,swirl:.9,inner:.22,depth:4,room:3,ahead:[.3,.7],today:.06,sweep:1.9*Math.PI,growth:1.75,rise:26},ra=.25,xg=i=>/^\d{4}$/.test(i)?"year":/^\d{4}-\d{2}$/.test(i)?"month":null,wd=(i=Date.now())=>{let e=new Date(i),t=e.getFullYear(),n=Date.UTC(t,e.getMonth(),e.getDate());return t+(n-Date.UTC(t,0,1))/(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))},so=(i,e=Date.now())=>{let[t,n]=i.split("-").map(Number),r=new Date(e);return(t-r.getFullYear())*12+(n-1-r.getMonth())},ao=(i,e)=>!Number.isFinite(i)||i<0?"":new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(i,"month");var ms=i=>i-1980;function yg(i){let e=new Map;i.forEach(({date:n})=>e.set(n,(e.get(n)??0)+1));let t=new Map;return i.map(({date:n})=>{let r=xg(n);if(!r)throw new Error(`date "${n}" is neither YYYY nor YYYY-MM`);let s=+n.slice(0,4),a=t.get(n)??0;t.set(n,a+1);let o=(a+.5)/e.get(n);return r==="month"?s+(+n.slice(5,7)-1+o)/12:s+o})}function Sg(i,e){let t=[];return i.map((n,r)=>{let s=new Set;for(let a=r-1;a>=0&&n-i[a]<=e;a--)s.add(t[a]);return t[r]=Ac.find(a=>!s.has(a))??Ac[r%Ac.length],t[r]})}function Mg(i){return i.map(e=>{let t=i.filter(n=>Math.abs(n-e)<=.6).length;return Math.min(1,1/Math.sqrt(Math.max(1,t/2)))})}var gs=i=>Math.min(1,Math.max(0,i)),bg=(i,e)=>(Math.sqrt(i.inner*i.inner+2*i.spin*e)-i.inner)/i.spin;function fs(i,e,t=0){let n=bg(i,e),r=i.inner+i.spin*n+t;return[r*Math.sin(n)-i.pole[0],r*Math.cos(n)-i.pole[1],-7+$t.rise*(e/i.length-.5)]}function Tg(i,e,t,n){let r=Array.from({length:t},()=>[]),s=Array.from({length:t},()=>0);i.forEach((v,g)=>{e[g]<0||(r[e[g]].push(v),s[e[g]]+=1)});let a=[];r.forEach((v,g)=>a.push(v.length?Math.min(...v):a[g-1]??1980));let o=s.map(v=>$t.core+$t.reach*Math.sqrt(v)),l=o.reduce((v,g)=>v+2*g,0)+$t.gap*t+$t.future,c=2*l/($t.sweep*(1+$t.growth)),h={inner:c,spin:c*($t.growth-1)/$t.sweep,length:l,pole:[0,0]},p=0,d=o.map(v=>{let g=p+v;return p+=2*v+$t.gap,g}),u=[...d.map((v,g)=>[fs(h,v),o[g]]),...Array.from({length:9},(v,g)=>[fs(h,p+$t.future*g/8),3])],m=[0,1].map(v=>[Math.min(...u.map(([g,_])=>g[v]-_)),Math.max(...u.map(([g,_])=>g[v]+_))]);h.pole=m.map(([v,g])=>(v+g)/2);let f=o.map((v,g)=>{let _=a.slice(g+1).find((F,k)=>r[g+1+k].length&&F>a[g]),M=Math.max(_??Math.max(n,...r[g]),a[g]+1),T=r[g].length,S=r[g].length?Math.max(...r[g])-Math.min(...r[g])+1:1,b=gs(S/12)*(1-.7*gs(s[g]/50)),I={ratio:Ic.stretch?1+Ic.stretch*.9*b:1,angle:(g*$t.twist+T*.37)%Math.PI};return{start:a[g],end:M,count:T,radius:v,turn:g*$t.twist,along:d[g],centre:fs(h,d[g]),axis:I}});return{...h,ahead:p,list:f}}var ro=(i,e)=>{let t=i.list.findIndex(n=>e<n.end);return t<0?i.list.length-1:t},oo=(i,e)=>gs((e-i.start)/(i.end-i.start)),bd=[1,2,5,10,20,50,100];function Ad(i,e=8){let t=Math.ceil(i.start+1e-9),n=Math.floor(i.end+1e-9),r=a=>Array.from({length:Math.max(0,n-t+1)},(o,l)=>t+l).filter(o=>o%a===0),s=bd.find(a=>r(a).length<=e)??bd.at(-1);return r(s).map(a=>({year:a,radius:i.radius*($t.inner+(1-$t.inner)*oo(i,a))}))}var Td=(i,e)=>(ro(i,e)+oo(i.list[ro(i,e)],e))/i.list.length;function Rd(i,e){if(e>=1)return 1/0;let t=Math.max(0,e)*i.list.length,n=i.list[Math.min(i.list.length-1,Math.floor(t))];return n.start+(t-Math.floor(t))*(n.end-n.start)}function Cd(i,e,t,n,r=0,s=0){let a=i.arms?.[Math.max(0,e)],o=(a?a.centre:Math.PI*2/Math.max(1,t)*Math.max(0,e))+i.turn+(i.swirl??$t.swirl)*n+r,l=Math.max(.4,i.radius*($t.inner+(1-$t.inner)*n)+s),[c,h]=br(i,l*Math.sin(o),l*Math.cos(o));return[i.centre[0]+c,i.centre[1]+h,i.centre[2]+$t.depth*(n-.5)]}var Cc=(i,e,t=0)=>fs(i,i.ahead+e*$t.future,t);function Eg(i,e,t,n,r){let s=r.map(()=>0);t.forEach((u,m)=>{let f=r.indexOf(u.threads?.[0]);n[m]===e&&f>=0&&s[f]++});let a=s.map((u,m)=>[m,u]).filter(([,u])=>u>0),o=a.reduce((u,[,m])=>u+m,0)||1,l=Math.PI*2/Math.max(1,a.length)/4,c=a.map(([,u])=>Math.max(l,Math.PI*2*u/o)),h=Math.PI*2/c.reduce((u,m)=>u+m,0),p=0;i.arms={},a.forEach(([u],m)=>{let f=c[m]*h;i.arms[u]={centre:p+f/2,width:f},p+=f});let d=i.end-i.start;i.swirl=$t.swirl*(.7+.8*gs(d/14))}function Lc(i,e,{periods:t=[],today:n=1980+vg,threads:r=[]}={}){let s=i.map(l=>t.length?t.indexOf(l.period):0),a=i.find((l,c)=>s[c]<0);if(a)throw new Error(`memory ${a.id}: period "${a.period}" is not one of ${t.join(", ")}`);let o={...Tg(e,s,Math.max(1,t.length),n),periodOf:s};return Ic.arms&&r.length&&o.list.forEach((l,c)=>Eg(l,c,i,s,r)),o}function Id(i,e={},t={}){let n=yg(i),r=Mg(n),s=rr.filter(d=>e[d]?.length),a=i.map(d=>Object.fromEntries(s.map(u=>[u,(d[u]??[]).map(m=>e[u].indexOf(m)).filter(m=>m>=0)]))),o=e.threads?.length??0,l=Lc(i,n,{...t,threads:e.threads??[]}),c=[],h=new Map;i.forEach((d,u)=>{let m=`${l.periodOf[u]}:${a[u].threads?.[0]??0}`;h.set(m,[...h.get(m)??[],u])});let p=Math.PI*2/Math.max(1,o);return h.forEach(d=>{let u=l.list[l.periodOf[d[0]]],m=(u.end-u.start)/(u.radius*(1-$t.inner));Sg(d.map(f=>n[f]),$t.room*m).forEach((f,v)=>{let g=d[v],_=oo(u,n[g]),M=u.radius*($t.inner+(1-$t.inner)*_),T=u.arms?.[a[g].threads?.[0]??0]?.width??p,S=Math.max(-.45*T,Math.min(.45*T,f*$t.room/Math.max(M,2)));c[g]=Cd(u,a[g].threads?.[0]??0,o,_,S)})}),n.map((d,u)=>({id:i[u].id,year:d,position:c[u],spread:(Md[i[u].weight]??Md[1])*r[u],weight:i[u].weight,members:a[u],period:l.periodOf[u],links:i[u].links??[]}))}function Pd(i){let[e,t]=$t.ahead.map(n=>Cc(i,n));return{today:Cc(i,$t.today),book:e,clone:t}}var Ld=(i,e)=>e.reduce((t,n)=>t+n.weight*Math.exp(-(((i-n.year)/1.6)**2)),0),Nd=i=>Math.max(...i.map(e=>Ld(e.year,i)),1e-6);function wg(i,e,t=Nd(e)){return Math.min(1,Ld(i,e)/t)}function Ag(i,e,t,n){let r=Math.ceil((n-1980)/ra)+1,s=new Float32Array(r*Math.max(1,t)),a=Math.ceil(Rc.sigma*3/ra);for(let o of i)(o.members[e]??[]).forEach((l,c)=>{let h=(o.year-1980)/ra;for(let p=Math.max(0,Math.floor(h)-a);p<=Math.min(r-1,Math.ceil(h)+a);p++){let d=(p*ra-(o.year-1980))/Rc.sigma;s[p*t+l]+=o.weight*(c===0?1:.5)*Math.exp(-d*d)/3}});return{table:s,count:t,bins:r}}function Dd({table:i,count:e,bins:t},n,r){return Math.min(1,i[Math.min(t-1,Math.max(0,Math.round((n-1980)/ra)))*e+r])}function Ed(i,e,t){let n=Array.from({length:i.count},(s,a)=>Rc.background+Dd(i,e,a)),r=t()*n.reduce((s,a)=>s+a,0);for(let s=0;s<i.count;s++)if((r-=n[s])<=0)return s;return i.count-1}function lo(i,e=fi.inner,t=fi.outer){let n=i()*2-1,r=i()*Math.PI*2,s=e+(t-e)*i(),a=Math.sqrt(1-n*n)*s;return[a*Math.cos(r),a*Math.sin(r),n*s]}function Ud(i){let e=i()*Math.PI*2,t=Sr(i)*fi.thickness,[n,r,s]=[Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t)];return[n,r*Math.cos(fi.tilt)-s*Math.sin(fi.tilt),r*Math.sin(fi.tilt)+s*Math.cos(fi.tilt)]}function Od({count:i=fi.stars,random:e}){let t={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i),halo:new Float32Array(i)};for(let n=0;n<i;n++){let r=e()<fi.halo,s=r?.8+.2*e():.7*e()**7,a=!r&&e()<fi.band?Ud(e):lo(e,1,1),o=fi.outer-(fi.outer-fi.inner)*s;t.position.set(a.map(l=>l*o),n*3),t.seed[n]=e(),t.bright[n]=s,t.halo[n]=r?1:0,t.size[n]=1+1.2*s}return t}var Ic={stretch:.5,arms:1};function br(i,e,t){let n=i.axis;if(!n||n.ratio===1)return[e,t];let[r,s,a]=[Math.cos(n.angle),Math.sin(n.angle),Math.sqrt(n.ratio)],o=(e*r+t*s)*a,l=(-e*s+t*r)/a;return[o*r-l*s,o*s+l*r]}var Nc=["personal","professional","product","education"],Xn={deep:{count:16e3,mobile:6e3,alpha:[.1,.8],band:.35,radius:1650,inner:400},far:{count:36,alpha:[.15,.4],radius:[5,14]},haze:{alpha:.08},glow:{max:.15,scale:2.6}},Rg=([i,e,t])=>[Math.atan2(e,i)/(2*Math.PI)+.5,Math.acos(Math.max(-1,Math.min(1,t)))/Math.PI];function Fd({count:i=Xn.deep.count,random:e,centre:t=[0,0,0],inner:n=Xn.deep.inner,outer:r=Xn.deep.radius}){let[s,a]=Xn.deep.alpha,o={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i)};for(let l=0;l<i;l++){let c=e()<Xn.deep.band?Ud(e):lo(e,1,1),h=Math.hypot(...c),p=Math.log(r/(n*(r/n)**e()))/Math.log(r/n),d=r*(n/r)**p;o.position.set(c.map((u,m)=>t[m]+u/h*d),l*3),o.seed[l]=e(),o.bright[l]=Math.min(a,(s+(a-s)*e()**4)*(1+.6*p**3)),o.size[l]=1+1.4*p**4}return o}function Bd({count:i=Xn.far.count,random:e}){let[t,n]=Xn.far.alpha,[r,s]=Xn.far.radius;return Array.from({length:i},()=>{let[a,o]=Rg(lo(e,1,1));return{u:a,v:o,radius:r+(s-r)*e(),squash:.35+.5*e(),angle:e()*Math.PI,alpha:t+(n-t)*e()}})}function zd(i,e){return{scale:i.radius*Xn.glow.scale,strength:Xn.glow.max*(.25+.75*(i.count/Math.max(1,e)))}}var Sr=i=>Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i());function Cg(i,{base:e=Mr.base,cap:t=Mr.cap}={}){let n=i.reduce((r,s)=>r+s.weight**1.5,0)||1;return Math.min(e,t/n)}function Vd({marks:i,sky:e,today:t,random:n,base:r=Mr.base,cap:s=Mr.cap,trail:a=Mr.trail,facets:o={}}){let l=Cg(i,{base:r,cap:s}),c=T=>Math.max(8,Math.round(l*T.weight**1.5)),h=rr.filter(T=>o[T]?.length),p=i.reduce((T,S)=>T+c(S),0)+a,d={count:p,position:new Float32Array(p*3),center:new Float32Array(p*3),from:new Float32Array(p*3),facet:Object.fromEntries(rr.map(T=>[T,new Float32Array(p).fill(-1)])),u:new Float32Array(p),order:new Float32Array(p),seed:new Float32Array(p),size:new Float32Array(p),ahead:new Float32Array(p),kind:new Float32Array(p),memory:new Float32Array(p),galaxy:new Float32Array(p).fill(-1)},u=(T,S,b,I,F,k,U,j,V)=>{d.position.set(S,T*3),d.center.set(b,T*3),d.from.set(lo(n),T*3),d.u[T]=I,d.order[T]=V,d.seed[T]=n(),d.size[T]=F,d.ahead[T]=k,d.kind[T]=U,d.memory[T]=j},m=0;i.forEach((T,S)=>{for(let b=0,I=c(T);b<I;b++,m++){let F=[Sr(n),Sr(n),Sr(n)*.8],k=T.spread*Math.abs(Sr(n))*.55,U=Math.hypot(...F)||1,j=F.map(V=>V/U*k);u(m,T.position.map((V,K)=>V+j[K]),T.position,ms(T.year),.1+n()*.16,0,1,S,Td(e,T.year)),d.galaxy[m]=T.period;for(let V of h)d.facet[V][m]=T.members[V][0]??-1}});let f=t+Pc[1]+.4,v=Object.fromEntries(h.map(T=>[T,Ag(i,T,o[T].length,f)])),g=o.threads?.length??0,_=Math.PI*2/Math.max(1,g),M=Nd(i);for(let T=0;T<a;T++,m++){let S=n()<.06,b=S?t+n()*(f-t):1980+n()*(t-1980),I=v.threads?S?Math.floor(n()*g):Ed(v.threads,b,n):-1,F=I>=0&&!S?Dd(v.threads,b,I):wg(b,i,M),k;if(S)k=Cc(e,n(),Sr(n)*2.4);else{let U=e.list[ro(e,b)],j=n()<.14,V=j?n()*.2:oo(U,b);k=Cd(U,I,g,V,Sr(n)*(U.arms?.[Math.max(0,I)]?.width??_)*(j?1.2:.14),Sr(n)*(.5+.9*F))}for(let U of h)d.facet[U][m]=U==="threads"?I:S?Math.floor(n()*o[U].length):Ed(v[U],b,n);u(m,k,k,ms(b),.05+n()*.07,S?1:0,0,-1,S?1:Td(e,b)),d.galaxy[m]=S?-1:ro(e,b)}return d}var ei={start:1980,end:2031,book:2027.8,clone:2029.6},kd={seconds:16},Gd=(i,e,t=1980,n=kd.seconds)=>t+(e-t)*gs(i/n),Hd=(i,e,t=1980,n=kd.seconds)=>gs((i-t)/(e-t))*n,_s=i=>(i-ei.start)/(ei.end-ei.start)*100,yi={rate:.05,ramp:6,slots:16,near:.2},Ig=i=>yi.rate*12/(i.radius+12),Pg=i=>i<=0?0:i-yi.ramp*(1-Math.exp(-i/yi.ramp)),Wd=(i,e)=>-Ig(i)*Pg(e);var Lg=24;document.querySelectorAll(".countdown[data-until]").forEach(i=>{let e=so(i.dataset.until);if(!(e>=0)){i.hidden=!0;return}i.querySelector(".remaining").textContent=` \xB7 ${ao(e,document.documentElement.lang)}`,i.querySelector(".scale").style.setProperty("--months",Math.min(e,Lg))});var wp=0,fh=1,Ap=2;var Ha=1,Rp=2,Ws=3,Xs=0,Zn=1,Yi=2,$i=0,bi=1,pr=2,mh=3,gh=4,Cp=5;var qs=100,Ip=101,Pp=102,Lp=103,Np=104,Dp=200,Up=201,Op=202,Fp=203,Bp=204,zp=205,Vp=206,kp=207,Gp=208,Hp=209,Wp=210,Xp=211,qp=212,jp=213,Yp=214,_h=0,vh=1,xh=2,Ol=3,yh=4,Sh=5,Mh=6,bh=7,$p=0,Zp=1,Jp=2,Di=0,Th=1,Eh=2,wh=3,Ah=4,Rh=5,Ch=6,Ih=7;var js=301,ts=302,Fl=303,Bl=304,Wa=306,zl=1e3,Vl=1001,Kp=1002,Ui=1003,Qp=1004;var Xa=1005;var Jn=1006,kl=1007;var ns=1008;var Oi=1009,ef=1010,tf=1011,qa=1012,Ph=1013,Fr=1014,Ti=1015,Zi=1016,Lh=1017,Nh=1018,Ys=1020,nf=35902,rf=35899,sf=1021,af=1022,Ji=1023,is=1026,rs=1027,ja=1028,Dh=1029,ss=1030,Uh=1031;var Oh=1033,Gl=33776,Hl=33777,Wl=33778,Xl=33779,Fh=35840,Bh=35841,zh=35842,Vh=35843,kh=36196,Gh=37492,Hh=37496,Wh=37488,Xh=37489,ql=37490,qh=37491,jh=37808,Yh=37809,$h=37810,Zh=37811,Jh=37812,Kh=37813,Qh=37814,eu=37815,tu=37816,nu=37817,iu=37818,ru=37819,su=37820,au=37821,ou=36492,lu=36494,cu=36495,hu=36283,uu=36284,jl=36285,du=36286;var pu=0,of=1,as="",fu="srgb",Yl="srgb-linear",mu="linear",tn="srgb";var lf=512,cf=513,hf=514,$l=515,uf=516,df=517,Zl=518,pf=519;var Jl=35048;var gu="300 es",_u=2e3;function Ng(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Dg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ga(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ff(){let i=ga("canvas");return i.style.display="block",i}var Xd={},Ds=null;function _a(...i){let e="THREE."+i.shift();Ds?Ds("log",e,...i):console.log(e,...i)}function mf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ye(...i){let e="THREE."+(i=mf(i)).shift();if(Ds)Ds("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Qe(...i){let e="THREE."+(i=mf(i)).shift();if(Ds)Ds("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Yr(...i){let e=i.join(" ");e in Xd||(Xd[e]=!0,Ye(...i))}function gf(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var _f={[_h]:1,[xh]:6,[yh]:7,[Ol]:5,[vh]:0,[Mh]:2,[bh]:4,[Sh]:3},Xi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},qn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ko=Math.PI/180,Go=180/Math.PI;function ur(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(qn[255&i]+qn[i>>8&255]+qn[i>>16&255]+qn[i>>24&255]+"-"+qn[255&e]+qn[e>>8&255]+"-"+qn[e>>16&15|64]+qn[e>>24&255]+"-"+qn[63&t|128]+qn[t>>8&255]+"-"+qn[t>>16&255]+qn[t>>24&255]+qn[255&n]+qn[n>>8&255]+qn[n>>16&255]+qn[n>>24&255]).toLowerCase()}function yt(i,e,t){return Math.max(e,Math.min(t,i))}function Ug(i,e){return(i%e+e)%e}function Dc(i,e,t){return(1-t)*i+t*e}function Gi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:case Uint8ClampedArray:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Mu=class Mu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=yt(this.x,e.x,t.x),this.y=yt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=yt(this.x,e,t),this.y=yt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(yt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Mu.prototype.isVector2=!0;var me=Mu,Mi=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],p=n[r+3],d=s[a+0],u=s[a+1],m=s[a+2],f=s[a+3];if(p!==f||l!==d||c!==u||h!==m){let v=l*d+c*u+h*m+p*f;v<0&&(d=-d,u=-u,m=-m,f=-f,v=-v);let g=1-o;if(v<.9995){let _=Math.acos(v),M=Math.sin(_);g=Math.sin(g*_)/M,l=l*g+d*(o=Math.sin(o*_)/M),c=c*g+u*o,h=h*g+m*o,p=p*g+f*o}else{l=l*g+d*o,c=c*g+u*o,h=h*g+m*o,p=p*g+f*o;let _=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=_,c*=_,h*=_,p*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],p=s[a],d=s[a+1],u=s[a+2],m=s[a+3];return e[t]=o*m+h*p+l*u-c*d,e[t+1]=l*m+h*d+c*p-o*u,e[t+2]=c*m+h*u+o*d-l*p,e[t+3]=h*m-o*p-l*d-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),p=o(s/2),d=l(n/2),u=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=d*h*p+c*u*m,this._y=c*u*p-d*h*m,this._z=c*h*m+d*u*p,this._w=c*h*p-d*u*m;break;case"YXZ":this._x=d*h*p+c*u*m,this._y=c*u*p-d*h*m,this._z=c*h*m-d*u*p,this._w=c*h*p+d*u*m;break;case"ZXY":this._x=d*h*p-c*u*m,this._y=c*u*p+d*h*m,this._z=c*h*m+d*u*p,this._w=c*h*p-d*u*m;break;case"ZYX":this._x=d*h*p-c*u*m,this._y=c*u*p+d*h*m,this._z=c*h*m-d*u*p,this._w=c*h*p+d*u*m;break;case"YZX":this._x=d*h*p+c*u*m,this._y=c*u*p+d*h*m,this._z=c*h*m-d*u*p,this._w=c*h*p-d*u*m;break;case"XZY":this._x=d*h*p-c*u*m,this._y=c*u*p-d*h*m,this._z=c*h*m+d*u*p,this._w=c*h*p+d*u*m;break;default:Ye("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],p=t[10],d=n+o+p;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-l)*u,this._y=(s-c)*u,this._z=(a-r)*u}else if(n>o&&n>p){let u=2*Math.sqrt(1+n-o-p);this._w=(h-l)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+c)/u}else if(o>p){let u=2*Math.sqrt(1+o-n-p);this._w=(s-c)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+p-n-o);this._w=(a-r)/u,this._x=(s+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},bu=class bu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),p=2*(s*n-a*t);return this.x=t+l*c+a*p-o*h,this.y=n+l*h+o*c-s*p,this.z=r+l*p+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=yt(this.x,e.x,t.x),this.y=yt(this.y,e.y,t.y),this.z=yt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=yt(this.x,e,t),this.y=yt(this.y,e,t),this.z=yt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(yt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Uc.copy(this).projectOnVector(e),this.sub(Uc)}reflect(e){return this.sub(Uc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};bu.prototype.isVector3=!0;var P=bu,Uc=new P,qd=new Mi,Tu=class Tu{constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],p=n[7],d=n[2],u=n[5],m=n[8],f=r[0],v=r[3],g=r[6],_=r[1],M=r[4],T=r[7],S=r[2],b=r[5],I=r[8];return s[0]=a*f+o*_+l*S,s[3]=a*v+o*M+l*b,s[6]=a*g+o*T+l*I,s[1]=c*f+h*_+p*S,s[4]=c*v+h*M+p*b,s[7]=c*g+h*T+p*I,s[2]=d*f+u*_+m*S,s[5]=d*v+u*M+m*b,s[8]=d*g+u*T+m*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],p=h*a-o*c,d=o*l-h*s,u=c*s-a*l,m=t*p+n*d+r*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let f=1/m;return e[0]=p*f,e[1]=(r*c-h*n)*f,e[2]=(o*n-r*a)*f,e[3]=d*f,e[4]=(h*t-r*l)*f,e[5]=(r*s-o*t)*f,e[6]=u*f,e[7]=(n*l-c*t)*f,e[8]=(a*t-n*s)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Yr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Oc.makeScale(e,t)),this}rotate(e){return Yr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Oc.makeRotation(-e)),this}translate(e,t){return Yr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Oc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Tu.prototype.isMatrix3=!0;var st=Tu,Oc=new st,jd=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yd=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Og(){let i={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer==="srgb"&&(r.r=dr(r.r),r.g=dr(r.g),r.b=dr(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer==="srgb"&&(r.r=Ns(r.r),r.g=Ns(r.g),r.b=Ns(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?"linear":this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Yr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Yr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Yl]:{primaries:e,whitePoint:n,transfer:"linear",toXYZ:jd,fromXYZ:Yd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},[fu]:{primaries:e,whitePoint:n,transfer:"srgb",toXYZ:jd,fromXYZ:Yd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),i}var Ct=Og();function dr(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Ns(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var vs,Ho=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vs===void 0&&(vs=ga("canvas")),vs.width=e.width,vs.height=e.height;let r=vs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=vs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ga("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*dr(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*dr(t[n]/255)):t[n]=dr(t[n]);return{data:t,width:e.width,height:e.height}}return Ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Fg=0,Us=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Fg++}),this.uuid=ur(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Fc(r[a].image)):s.push(Fc(r[a]))}else s=Fc(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Fc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ho.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ye("Texture: Unable to serialize Texture."),{})}var Bg=0,Bc=new P,ni=class i extends Xi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,l=1009,c=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bg++}),this.uuid=ur(),this.name="",this.source=new Us(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Bc).x}get height(){return this.source.getSize(Bc).y}get depth(){return this.source.getSize(Bc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:Ye(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ni.DEFAULT_IMAGE=null,ni.DEFAULT_MAPPING=300,ni.DEFAULT_ANISOTROPY=1;var Eu=class Eu{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],p=l[8],d=l[1],u=l[5],m=l[9],f=l[2],v=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(p-f)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+f)<.1&&Math.abs(m+v)<.1&&Math.abs(c+u+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,T=(u+1)/2,S=(g+1)/2,b=(h+d)/4,I=(p+f)/4,F=(m+v)/4;return M>T&&M>S?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=b/n,s=I/n):T>S?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=b/r,s=F/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=I/s,r=F/s),this.set(n,r,s,t),this}let _=Math.sqrt((v-m)*(v-m)+(p-f)*(p-f)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(v-m)/_,this.y=(p-f)/_,this.z=(d-h)/_,this.w=Math.acos((c+u+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=yt(this.x,e.x,t.x),this.y=yt(this.y,e.y,t.y),this.z=yt(this.z,e.z,t.z),this.w=yt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=yt(this.x,e,t),this.y=yt(this.y,e,t),this.z=yt(this.z,e,t),this.w=yt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(yt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Eu.prototype.isVector4=!0;var en=Eu,Wo=class extends Xi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new en(0,0,e,t),this.scissorTest=!1,this.viewport=new en(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new ni(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Us(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ci=class extends Wo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},va=class extends ni{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xo=class extends ni{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ul=class Ul{constructor(e,t,n,r,s,a,o,l,c,h,p,d,u,m,f,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,p,d,u,m,f,v)}set(e,t,n,r,s,a,o,l,c,h,p,d,u,m,f,v){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=p,g[14]=d,g[3]=u,g[7]=m,g[11]=f,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ul().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/xs.setFromMatrixColumn(e,0).length(),s=1/xs.setFromMatrixColumn(e,1).length(),a=1/xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=l*h,t[4]=-l*p,t[8]=c,t[1]=u+m*c,t[5]=d-f*c,t[9]=-o*l,t[2]=f-d*c,t[6]=m+u*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,u=l*p,m=c*h,f=c*p;t[0]=d+f*o,t[4]=m*o-u,t[8]=a*c,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=u*o-m,t[6]=f+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,u=l*p,m=c*h,f=c*p;t[0]=d-f*o,t[4]=-a*p,t[8]=m+u*o,t[1]=u+m*o,t[5]=a*h,t[9]=f-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=l*h,t[4]=m*c-u,t[8]=d*c+f,t[1]=l*p,t[5]=f*c+d,t[9]=u*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,u=a*c,m=o*l,f=o*c;t[0]=l*h,t[4]=f-d*p,t[8]=m*p+u,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=u*p+m,t[10]=d-f*p}else if(e.order==="XZY"){let d=a*l,u=a*c,m=o*l,f=o*c;t[0]=l*h,t[4]=-p,t[8]=c*h,t[1]=d*p+f,t[5]=a*h,t[9]=u*p-m,t[2]=m*p-u,t[6]=o*h,t[10]=f*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zg,e,Vg)}lookAt(e,t,n){let r=this.elements;return mi.subVectors(e,t),mi.lengthSq()===0&&(mi.z=1),mi.normalize(),Tr.crossVectors(n,mi),Tr.lengthSq()===0&&(Math.abs(n.z)===1?mi.x+=1e-4:mi.z+=1e-4,mi.normalize(),Tr.crossVectors(n,mi)),Tr.normalize(),co.crossVectors(mi,Tr),r[0]=Tr.x,r[4]=co.x,r[8]=mi.x,r[1]=Tr.y,r[5]=co.y,r[9]=mi.y,r[2]=Tr.z,r[6]=co.z,r[10]=mi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],p=n[5],d=n[9],u=n[13],m=n[2],f=n[6],v=n[10],g=n[14],_=n[3],M=n[7],T=n[11],S=n[15],b=r[0],I=r[4],F=r[8],k=r[12],U=r[1],j=r[5],V=r[9],K=r[13],se=r[2],re=r[6],te=r[10],N=r[14],Z=r[3],ce=r[7],Le=r[11],ve=r[15];return s[0]=a*b+o*U+l*se+c*Z,s[4]=a*I+o*j+l*re+c*ce,s[8]=a*F+o*V+l*te+c*Le,s[12]=a*k+o*K+l*N+c*ve,s[1]=h*b+p*U+d*se+u*Z,s[5]=h*I+p*j+d*re+u*ce,s[9]=h*F+p*V+d*te+u*Le,s[13]=h*k+p*K+d*N+u*ve,s[2]=m*b+f*U+v*se+g*Z,s[6]=m*I+f*j+v*re+g*ce,s[10]=m*F+f*V+v*te+g*Le,s[14]=m*k+f*K+v*N+g*ve,s[3]=_*b+M*U+T*se+S*Z,s[7]=_*I+M*j+T*re+S*ce,s[11]=_*F+M*V+T*te+S*Le,s[15]=_*k+M*K+T*N+S*ve,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],p=e[6],d=e[10],u=e[14],m=e[3],f=e[7],v=e[11],g=e[15],_=l*u-c*d,M=o*u-c*p,T=o*d-l*p,S=a*u-c*h,b=a*d-l*h,I=a*p-o*h;return t*(f*_-v*M+g*T)-n*(m*_-v*S+g*b)+r*(m*M-f*S+g*I)-s*(m*T-f*b+v*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(s*h-o*l)+r*(s*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],p=e[9],d=e[10],u=e[11],m=e[12],f=e[13],v=e[14],g=e[15],_=t*o-n*a,M=t*l-r*a,T=t*c-s*a,S=n*l-r*o,b=n*c-s*o,I=r*c-s*l,F=h*f-p*m,k=h*v-d*m,U=h*g-u*m,j=p*v-d*f,V=p*g-u*f,K=d*g-u*v,se=_*K-M*V+T*j+S*U-b*k+I*F;if(se===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let re=1/se;return e[0]=(o*K-l*V+c*j)*re,e[1]=(r*V-n*K-s*j)*re,e[2]=(f*I-v*b+g*S)*re,e[3]=(d*b-p*I-u*S)*re,e[4]=(l*U-a*K-c*k)*re,e[5]=(t*K-r*U+s*k)*re,e[6]=(v*T-m*I-g*M)*re,e[7]=(h*I-d*T+u*M)*re,e[8]=(a*V-o*U+c*F)*re,e[9]=(n*U-t*V-s*F)*re,e[10]=(m*b-f*T+g*_)*re,e[11]=(p*T-h*b-u*_)*re,e[12]=(o*k-a*j-l*F)*re,e[13]=(t*j-n*k+r*F)*re,e[14]=(f*M-m*S-v*_)*re,e[15]=(h*S-p*M+d*_)*re,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,p=o+o,d=s*c,u=s*h,m=s*p,f=a*h,v=a*p,g=o*p,_=l*c,M=l*h,T=l*p,S=n.x,b=n.y,I=n.z;return r[0]=(1-(f+g))*S,r[1]=(u+T)*S,r[2]=(m-M)*S,r[3]=0,r[4]=(u-T)*b,r[5]=(1-(d+g))*b,r[6]=(v+_)*b,r[7]=0,r[8]=(m+M)*I,r[9]=(v-_)*I,r[10]=(1-(d+f))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=xs.set(r[0],r[1],r[2]).length(),o=xs.set(r[4],r[5],r[6]).length(),l=xs.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Ri.copy(this);let c=1/a,h=1/o,p=1/l;return Ri.elements[0]*=c,Ri.elements[1]*=c,Ri.elements[2]*=c,Ri.elements[4]*=h,Ri.elements[5]*=h,Ri.elements[6]*=h,Ri.elements[8]*=p,Ri.elements[9]*=p,Ri.elements[10]*=p,t.setFromRotationMatrix(Ri),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2*s/(t-e),p=2*s/(n-r),d=(t+e)/(t-e),u=(n+r)/(n-r),m,f;if(l)m=s/(a-s),f=a*s/(a-s);else if(o===2e3)m=-(a+s)/(a-s),f=-2*a*s/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),f=-a*s/(a-s)}return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=p,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=f,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2/(t-e),p=2/(n-r),d=-(t+e)/(t-e),u=-(n+r)/(n-r),m,f;if(l)m=1/(a-s),f=a/(a-s);else if(o===2e3)m=-2/(a-s),f=-(a+s)/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),f=-s/(a-s)}return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=p,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=m,c[14]=f,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ul.prototype.isMatrix4=!0;var pt=Ul,xs=new P,Ri=new pt,zg=new P(0,0,0),Vg=new P(1,1,1),Tr=new P,co=new P,mi=new P,$d=new pt,Zd=new Mi,Pr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],p=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-yt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Ye("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $d.makeRotationFromQuaternion(e),this.setFromRotationMatrix($d,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zd.setFromEuler(this),this.setFromQuaternion(Zd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Pr.DEFAULT_ORDER="XYZ";var xa=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},kg=0,Jd=new P,ys=new Mi,sr=new pt,ho=new P,sa=new P,Gg=new P,Hg=new Mi,Kd=new P(1,0,0),Qd=new P(0,1,0),ep=new P(0,0,1),tp={type:"added"},Wg={type:"removed"},Ss={type:"childadded",child:null},zc={type:"childremoved",child:null},ii=class i extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=ur(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new Pr,n=new Mi,r=new P(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new st}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis(Kd,e)}rotateY(e){return this.rotateOnAxis(Qd,e)}rotateZ(e){return this.rotateOnAxis(ep,e)}translateOnAxis(e,t){return Jd.copy(e).applyQuaternion(this.quaternion),this.position.add(Jd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Kd,e)}translateY(e){return this.translateOnAxis(Qd,e)}translateZ(e){return this.translateOnAxis(ep,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(sr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ho.copy(e):ho.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),sa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sr.lookAt(sa,ho,this.up):sr.lookAt(ho,sa,this.up),this.quaternion.setFromRotationMatrix(sr),r&&(sr.extractRotation(r.matrixWorld),ys.setFromRotationMatrix(sr),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tp),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wg),zc.child=e,this.dispatchEvent(zc),zc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),sr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),sr.multiply(e.parent.matrixWorld)),e.applyMatrix4(sr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tp),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,e,Gg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,Hg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),p=a(e.shapes),d=a(e.skeletons),u=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ii.DEFAULT_UP=new P(0,1,0),ii.DEFAULT_MATRIX_AUTO_UPDATE=!0,ii.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hr=class extends ii{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xg={type:"move"},Os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let f of e.hand.values()){let v=t.getJointPose(f,n),g=this._getHandJoint(c,f);v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=v.radius),g.visible=v!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],d=h.position.distanceTo(p.position),u=.02,m=.005;c.inputState.pinching&&d>u+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=u-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Xg)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new hr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},vf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Er={h:0,s:0,l:0},uo={h:0,s:0,l:0};function Vc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var ht=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Ct.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ct.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ct.workingColorSpace){if(e=Ug(e,1),t=yt(t,0,1),n=yt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Vc(a,s,e+1/3),this.g=Vc(a,s,e),this.b=Vc(a,s,e-1/3)}return Ct.colorSpaceToWorking(this,r),this}setStyle(e,t="srgb"){function n(s){s!==void 0&&parseFloat(s)<1&&Ye("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ye("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ye("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=vf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ye("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}copyLinearToSRGB(e){return this.r=Ns(e.r),this.g=Ns(e.g),this.b=Ns(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return Ct.workingToColorSpace(jn.copy(this),e),65536*Math.round(yt(255*jn.r,0,255))+256*Math.round(yt(255*jn.g,0,255))+Math.round(yt(255*jn.b,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ct.workingColorSpace){Ct.workingToColorSpace(jn.copy(this),t);let n=jn.r,r=jn.g,s=jn.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let p=a-o;switch(c=h<=.5?p/(a+o):p/(2-a-o),a){case n:l=(r-s)/p+(r<s?6:0);break;case r:l=(s-n)/p+2;break;case s:l=(n-r)/p+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ct.workingColorSpace){return Ct.workingToColorSpace(jn.copy(this),t),e.r=jn.r,e.g=jn.g,e.b=jn.b,e}getStyle(e="srgb"){Ct.workingToColorSpace(jn.copy(this),e);let t=jn.r,n=jn.g,r=jn.b;return e!=="srgb"?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(Er),this.setHSL(Er.h+e,Er.s+t,Er.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Er),e.getHSL(uo);let n=Dc(Er.h,uo.h,t),r=Dc(Er.s,uo.s,t),s=Dc(Er.l,uo.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},jn=new ht;ht.NAMES=vf;var ya=class extends ii{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pr,this.environmentIntensity=1,this.environmentRotation=new Pr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ci=new P,ar=new P,kc=new P,or=new P,Ms=new P,bs=new P,np=new P,Gc=new P,Hc=new P,Wc=new P,Xc=new en,qc=new en,jc=new en,Hi=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ci.subVectors(e,t),r.cross(Ci);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Ci.subVectors(r,t),ar.subVectors(n,t),kc.subVectors(e,t);let a=Ci.dot(Ci),o=Ci.dot(ar),l=Ci.dot(kc),c=ar.dot(ar),h=ar.dot(kc),p=a*c-o*o;if(p===0)return s.set(0,0,0),null;let d=1/p,u=(c*l-o*h)*d,m=(a*h-o*l)*d;return s.set(1-u-m,m,u)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,or)!==null&&or.x>=0&&or.y>=0&&or.x+or.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,or)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,or.x),l.addScaledVector(a,or.y),l.addScaledVector(o,or.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Xc.setScalar(0),qc.setScalar(0),jc.setScalar(0),Xc.fromBufferAttribute(e,t),qc.fromBufferAttribute(e,n),jc.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Xc,s.x),a.addScaledVector(qc,s.y),a.addScaledVector(jc,s.z),a}static isFrontFacing(e,t,n,r){return Ci.subVectors(n,t),ar.subVectors(e,t),Ci.cross(ar).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ci.subVectors(this.c,this.b),ar.subVectors(this.a,this.b),.5*Ci.cross(ar).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;Ms.subVectors(r,n),bs.subVectors(s,n),Gc.subVectors(e,n);let l=Ms.dot(Gc),c=bs.dot(Gc);if(l<=0&&c<=0)return t.copy(n);Hc.subVectors(e,r);let h=Ms.dot(Hc),p=bs.dot(Hc);if(h>=0&&p<=h)return t.copy(r);let d=l*p-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Ms,a);Wc.subVectors(e,s);let u=Ms.dot(Wc),m=bs.dot(Wc);if(m>=0&&u<=m)return t.copy(s);let f=u*c-l*m;if(f<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(bs,o);let v=h*m-u*p;if(v<=0&&p-h>=0&&u-m>=0)return np.subVectors(s,r),o=(p-h)/(p-h+(u-m)),t.copy(r).addScaledVector(np,o);let g=1/(v+f+d);return a=f*g,o=d*g,t.copy(n).addScaledVector(Ms,a).addScaledVector(bs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Li=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ii):Ii.fromBufferAttribute(s,a),Ii.applyMatrix4(e.matrixWorld),this.expandByPoint(Ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),po.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),po.copy(n.boundingBox)),po.applyMatrix4(e.matrixWorld),this.union(po)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ii),Ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(aa),fo.subVectors(this.max,aa),Ts.subVectors(e.a,aa),Es.subVectors(e.b,aa),ws.subVectors(e.c,aa),wr.subVectors(Es,Ts),Ar.subVectors(ws,Es),Wr.subVectors(Ts,ws);let t=[0,-wr.z,wr.y,0,-Ar.z,Ar.y,0,-Wr.z,Wr.y,wr.z,0,-wr.x,Ar.z,0,-Ar.x,Wr.z,0,-Wr.x,-wr.y,wr.x,0,-Ar.y,Ar.x,0,-Wr.y,Wr.x,0];return!!Yc(t,Ts,Es,ws,fo)&&(t=[1,0,0,0,1,0,0,0,1],!!Yc(t,Ts,Es,ws,fo)&&(mo.crossVectors(wr,Ar),t=[mo.x,mo.y,mo.z],Yc(t,Ts,Es,ws,fo)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Ii).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(lr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),lr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),lr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),lr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),lr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),lr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),lr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),lr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(lr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},lr=[new P,new P,new P,new P,new P,new P,new P,new P],Ii=new P,po=new Li,Ts=new P,Es=new P,ws=new P,wr=new P,Ar=new P,Wr=new P,aa=new P,fo=new P,mo=new P,Xr=new P;function Yc(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Xr.fromArray(i,s);let o=r.x*Math.abs(Xr.x)+r.y*Math.abs(Xr.y)+r.z*Math.abs(Xr.z),l=e.dot(Xr),c=t.dot(Xr),h=n.dot(Xr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var hS=qg();function qg(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,r[l]=24,r[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,r[l]=-c-1,r[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,r[l]=13,r[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,r[l]=24,r[256|l]=24):(n[l]=31744,n[256|l]=64512,r[l]=13,r[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var Tn=new P,go=new me,jg=0,Pt=class extends Xi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:jg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)go.fromBufferAttribute(this,t),go.applyMatrix3(e),this.setXY(t,go.x,go.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyMatrix3(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyMatrix4(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyNormalMatrix(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.transformDirection(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Gi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Gi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Gi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Gi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Gi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),r=Zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),r=Zt(r,this.array),s=Zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Sa=class extends Pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ma=class extends Pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var je=class extends Pt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Yg=new Li,oa=new P,$c=new P,Ni=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Yg.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;oa.subVectors(e,this.center);let t=oa.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(oa,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($c.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(oa.copy(e.center).add($c)),this.expandByPoint(oa.copy(e.center).sub($c))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},$g=0,Si=new pt,Zc=new ii,As=new P,gi=new Li,la=new Li,Un=new P,bt=class i extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$g++}),this.uuid=ur(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ng(e)?Ma:Sa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new st().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Si.makeRotationFromQuaternion(e),this.applyMatrix4(Si),this}rotateX(e){return Si.makeRotationX(e),this.applyMatrix4(Si),this}rotateY(e){return Si.makeRotationY(e),this.applyMatrix4(Si),this}rotateZ(e){return Si.makeRotationZ(e),this.applyMatrix4(Si),this}translate(e,t,n){return Si.makeTranslation(e,t,n),this.applyMatrix4(Si),this}scale(e,t,n){return Si.makeScale(e,t,n),this.applyMatrix4(Si),this}lookAt(e){return Zc.lookAt(e),Zc.updateMatrix(),this.applyMatrix4(Zc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new je(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];gi.setFromBufferAttribute(s),this.morphTargetsRelative?(Un.addVectors(this.boundingBox.min,gi.min),this.boundingBox.expandByPoint(Un),Un.addVectors(this.boundingBox.max,gi.max),this.boundingBox.expandByPoint(Un)):(this.boundingBox.expandByPoint(gi.min),this.boundingBox.expandByPoint(gi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ni);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new P,1/0);if(e){let n=this.boundingSphere.center;if(gi.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];la.setFromBufferAttribute(o),this.morphTargetsRelative?(Un.addVectors(gi.min,la.min),gi.expandByPoint(Un),Un.addVectors(gi.max,la.max),gi.expandByPoint(Un)):(gi.expandByPoint(la.min),gi.expandByPoint(la.max))}gi.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Un.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Un));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Un.fromBufferAttribute(o,c),l&&(As.fromBufferAttribute(e,c),Un.add(As)),r=Math.max(r,n.distanceToSquared(Un))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");a!==void 0&&a.count===n.count||(a=new Pt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let F=0;F<n.count;F++)o[F]=new P,l[F]=new P;let c=new P,h=new P,p=new P,d=new me,u=new me,m=new me,f=new P,v=new P;function g(F,k,U){c.fromBufferAttribute(n,F),h.fromBufferAttribute(n,k),p.fromBufferAttribute(n,U),d.fromBufferAttribute(s,F),u.fromBufferAttribute(s,k),m.fromBufferAttribute(s,U),h.sub(c),p.sub(c),u.sub(d),m.sub(d);let j=1/(u.x*m.y-m.x*u.y);isFinite(j)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-u.y).multiplyScalar(j),v.copy(p).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(j),o[F].add(f),o[k].add(f),o[U].add(f),l[F].add(v),l[k].add(v),l[U].add(v))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let F=0,k=_.length;F<k;++F){let U=_[F],j=U.start;for(let V=j,K=j+U.count;V<K;V+=3)g(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let M=new P,T=new P,S=new P,b=new P;function I(F){S.fromBufferAttribute(r,F),b.copy(S);let k=o[F];M.copy(k),M.sub(S.multiplyScalar(S.dot(k))).normalize(),T.crossVectors(b,k);let U=T.dot(l[F])<0?-1:1;a.setXYZW(F,M.x,M.y,M.z,U)}for(let F=0,k=_.length;F<k;++F){let U=_[F],j=U.start;for(let V=j,K=j+U.count;V<K;V+=3)I(e.getX(V+0)),I(e.getX(V+1)),I(e.getX(V+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Pt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let r=new P,s=new P,a=new P,o=new P,l=new P,c=new P,h=new P,p=new P;if(e)for(let d=0,u=e.count;d<u;d+=3){let m=e.getX(d+0),f=e.getX(d+1),v=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,f),a.fromBufferAttribute(t,v),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,f),c.fromBufferAttribute(n,v),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(f,l.x,l.y,l.z),n.setXYZ(v,c.x,c.y,c.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Un.fromBufferAttribute(e,t),Un.normalize(),e.setXYZ(t,Un.x,Un.y,Un.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,p=o.normalized,d=new c.constructor(l.length*h),u=0,m=0;for(let f=0,v=l.length;f<v;f++){u=o.isInterleavedBufferAttribute?l[f]*o.data.stride+o.offset:l[f]*h;for(let g=0;g<h;g++)d[m++]=c[u++]}return new Pt(d,h,p)}if(this.index===null)return Ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=e(r[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,p=c.length;h<p;h++){let d=e(c[h],n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,d=c.length;p<d;p++){let u=c[p];h.push(u.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],p=s[c];for(let d=0,u=p.length;d<u;d++)h.push(p[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},qo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=ur()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ur()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ur()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},ti=new P,ba=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.applyMatrix4(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.applyNormalMatrix(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.transformDirection(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Gi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Zt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Zt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Gi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Gi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Gi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Gi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),r=Zt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),r=Zt(r,this.array),s=Zt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){_a("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Pt(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){_a("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Jc=new P,Zg=new P,Jg=new st,Pi=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Jc.subVectors(n,t).cross(Zg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Jc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Jg.getNormalMatrix(e),r=this.coplanarPoint(Jc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Rs,Kg=0,qi=class extends Xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kg++}),this.uuid=ur(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ye(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:Ye(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ht().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Pi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new me().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new me().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Fs=class extends qi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ca=new P,Cs=new P,Is=new P,Ps=new me,ha=new me,xf=new pt,_o=new P,ua=new P,vo=new P,ip=new me,Kc=new me,rp=new me,Ta=class extends ii{constructor(e=new Fs){if(super(),this.isSprite=!0,this.type="Sprite",Rs===void 0){Rs=new bt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new qo(t,5);Rs.setIndex([0,1,2,0,2,3]),Rs.setAttribute("position",new ba(n,3,0,!1)),Rs.setAttribute("uv",new ba(n,2,3,!1))}this.geometry=Rs,this.material=e,this.center=new me(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Qe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Cs.setFromMatrixScale(this.matrixWorld),xf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Is.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Cs.multiplyScalar(-Is.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;xo(_o.set(-.5,-.5,0),Is,a,Cs,r,s),xo(ua.set(.5,-.5,0),Is,a,Cs,r,s),xo(vo.set(.5,.5,0),Is,a,Cs,r,s),ip.set(0,0),Kc.set(1,0),rp.set(1,1);let o=e.ray.intersectTriangle(_o,ua,vo,!1,ca);if(o===null&&(xo(ua.set(-.5,.5,0),Is,a,Cs,r,s),Kc.set(0,1),o=e.ray.intersectTriangle(_o,vo,ua,!1,ca),o===null))return;let l=e.ray.origin.distanceTo(ca);l<e.near||l>e.far||t.push({distance:l,point:ca.clone(),uv:Hi.getInterpolation(ca,_o,ua,vo,ip,Kc,rp,new me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function xo(i,e,t,n,r,s){Ps.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(ha.x=s*Ps.x-r*Ps.y,ha.y=r*Ps.x+s*Ps.y):ha.copy(Ps),i.copy(e),i.x+=ha.x,i.y+=ha.y,i.applyMatrix4(xf)}var uS=new P,dS=new P;var cr=new P,Qc=new P,yo=new P,So=new P,$r=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,cr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=cr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(cr.copy(this.origin).addScaledVector(this.direction,t),cr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Qc.copy(e).add(t).multiplyScalar(.5),yo.copy(t).sub(e).normalize(),So.copy(this.origin).sub(Qc);let s=.5*e.distanceTo(t),a=-this.direction.dot(yo),o=So.dot(this.direction),l=-So.dot(yo),c=So.lengthSq(),h=Math.abs(1-a*a),p,d,u,m;if(h>0)if(p=a*l-o,d=a*o-l,m=s*h,p>=0)if(d>=-m)if(d<=m){let f=1/h;p*=f,d*=f,u=p*(p+a*d+2*o)+d*(a*p+d+2*l)+c}else d=s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*l)+c;else d=-s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*l)+c;else d<=-m?(p=Math.max(0,-(-a*s+o)),d=p>0?-s:Math.min(Math.max(-s,-l),s),u=-p*p+d*(d+2*l)+c):d<=m?(p=0,d=Math.min(Math.max(-s,-l),s),u=d*(d+2*l)+c):(p=Math.max(0,-(a*s+o)),d=p>0?s:Math.min(Math.max(-s,-l),s),u=-p*p+d*(d+2*l)+c);else d=a>0?-s:s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Qc).addScaledVector(yo,d),u}intersectSphere(e,t){if(e.radius<0)return null;cr.subVectors(e.center,this.origin);let n=cr.dot(this.direction),r=cr.dot(cr)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-d.z)*p,l=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,l=(e.min.z-d.z)*p),n>l||o>r?null:((o>n||n!=n)&&(n=o),(l<r||r!=r)&&(r=l),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,cr)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,p=e.x-a.x,d=e.y-a.y,u=e.z-a.z,m=t.x-a.x,f=t.y-a.y,v=t.z-a.z,g=n.x-a.x,_=n.y-a.y,M=n.z-a.z,T=Math.abs(l),S=Math.abs(c),b=Math.abs(h),I,F,k,U,j,V,K,se,re,te,N,Z;if(T>=S&&T>=b?(k=l,V=p,re=m,Z=g,l>=0?(I=c,F=h,U=d,j=u,K=f,se=v,te=_,N=M):(I=h,F=c,U=u,j=d,K=v,se=f,te=M,N=_)):S>=b?(k=c,V=d,re=f,Z=_,c>=0?(I=h,F=l,U=u,j=p,K=v,se=m,te=M,N=g):(I=l,F=h,U=p,j=u,K=m,se=v,te=g,N=M)):(k=h,V=u,re=v,Z=M,h>=0?(I=l,F=c,U=p,j=d,K=m,se=f,te=g,N=_):(I=c,F=l,U=d,j=p,K=f,se=m,te=_,N=g)),k===0)return null;let ce=I/k,Le=F/k,ve=U-ce*V,Oe=j-Le*V,Se=K-ce*re,ue=se-Le*re,X=te-ce*Z,ee=N-Le*Z,le=X*ue-ee*Se,he=ve*ee-Oe*X,A=Se*Oe-ue*ve;if(r){if(le<0||he<0||A<0)return null}else if((le<0||he<0||A<0)&&(le>0||he>0||A>0))return null;let E=le+he+A;if(E===0)return null;let C=1/k*(le*V+he*re+A*Z);return(E>0?C<0:C>0)?null:this.at(C/E,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ea=class extends qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},sp=new pt,qr=new $r,Mo=new Ni,ap=new P,bo=new P,To=new P,Eo=new P,eh=new P,wo=new P,op=new P,Ao=new P,$n=class extends ii{constructor(e=new bt,t=new Ea){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){wo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],p=s[l];h!==0&&(eh.fromBufferAttribute(p,e),a?wo.addScaledVector(eh,h):wo.addScaledVector(eh.sub(t),h))}t.add(wo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Mo.copy(n.boundingSphere),Mo.applyMatrix4(s),qr.copy(e.ray).recast(e.near),Mo.containsPoint(qr.origin)===!1&&(qr.intersectSphere(Mo,ap)===null||qr.origin.distanceToSquared(ap)>(e.far-e.near)**2))return;sp.copy(s).invert(),qr.copy(e.ray).applyMatrix4(sp),n.boundingBox!==null&&qr.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,qr)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),M=Math.min(o.count,Math.min(v.start+v.count,u.start+u.count));_<M;_+=3)r=Ro(this,g,e,n,c,h,p,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(o.count,u.start+u.count);m<f;m+=3)r=Ro(this,a,e,n,c,h,p,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(l!==void 0)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),M=Math.min(l.count,Math.min(v.start+v.count,u.start+u.count));_<M;_+=3)r=Ro(this,g,e,n,c,h,p,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(l.count,u.start+u.count);m<f;m+=3)r=Ro(this,a,e,n,c,h,p,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};function Qg(i,e,t,n,r,s,a,o){let l;if(l=e.side===1?n.intersectTriangle(a,s,r,!0,o):n.intersectTriangle(r,s,a,e.side===0,o),l===null)return null;Ao.copy(o),Ao.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Ao);return c<t.near||c>t.far?null:{distance:c,point:Ao.clone(),object:i}}function Ro(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,bo),i.getVertexPosition(l,To),i.getVertexPosition(c,Eo);let h=Qg(i,e,t,n,bo,To,Eo,op);if(h){let p=new P;Hi.getBarycoord(op,bo,To,Eo,p),r&&(h.uv=Hi.getInterpolatedAttribute(r,o,l,c,p,new me)),s&&(h.uv1=Hi.getInterpolatedAttribute(s,o,l,c,p,new me)),a&&(h.normal=Hi.getInterpolatedAttribute(a,o,l,c,p,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new P,materialIndex:0};Hi.getNormal(bo,To,Eo,d.normal),h.face=d,h.barycoord=p}return h}var pS=new en,fS=new en,mS=new en,gS=new en,_S=new pt,vS=new P,xS=new Ni,yS=new pt,SS=new $r;var Zr=class extends ni{constructor(e=null,t=1,n=1,r,s,a,o,l,c=1003,h=1003,p,d){super(null,a,o,l,c,h,r,s,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},MS=new pt,bS=new pt;var TS=new pt,ES=new pt;var wS=new Li,AS=new pt,RS=new $n,CS=new Ni;var jr=new Ni,e0=new me(.5,.5),Co=new P,Lr=class{constructor(e=new Pi,t=new Pi,n=new Pi,r=new Pi,s=new Pi,a=new Pi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],p=s[5],d=s[6],u=s[7],m=s[8],f=s[9],v=s[10],g=s[11],_=s[12],M=s[13],T=s[14],S=s[15];if(r[0].setComponents(c-a,u-h,g-m,S-_).normalize(),r[1].setComponents(c+a,u+h,g+m,S+_).normalize(),r[2].setComponents(c+o,u+p,g+f,S+M).normalize(),r[3].setComponents(c-o,u-p,g-f,S-M).normalize(),n)r[4].setComponents(l,d,v,T).normalize(),r[5].setComponents(c-l,u-d,g-v,S-T).normalize();else if(r[4].setComponents(c-l,u-d,g-v,S-T).normalize(),t===2e3)r[5].setComponents(c+l,u+d,g+v,S+T).normalize();else{if(t!==2001)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(l,d,v,T).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jr)}intersectsSprite(e){jr.center.set(0,0,0);let t=e0.distanceTo(e.center);return jr.radius=.7071067811865476+t,jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(jr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Co.x=r.normal.x>0?e.max.x:e.min.x,Co.y=r.normal.y>0?e.max.y:e.min.y,Co.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Co)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},lp=new pt,jo=class i{constructor(){this.coordinateSystem=2e3,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];lp.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new Lr),n[r].setFromProjectionMatrix(lp,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Lr),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new i().copy(this)}};var oh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},IS=new pt,PS=new ht(1,1,1),LS=new Lr,NS=new jo,DS=new Li,US=new Ni,OS=new P,FS=new P,BS=new P,zS=new oh,VS=new $n;var Jr=class extends qi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Yo=new P,$o=new P,cp=new pt,da=new $r,Io=new Ni,th=new P,hp=new P,Zo=class extends ii{constructor(e=new bt,t=new Jr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Yo.fromBufferAttribute(t,r-1),$o.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Yo.distanceTo($o);e.setAttribute("lineDistance",new je(n,1))}else Ye("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(r),Io.radius+=s,e.ray.intersectsSphere(Io)===!1)return;cp.copy(r).invert(),da.copy(e.ray).applyMatrix4(cp);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),u=Math.min(h.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=c){let v=h.getX(m),g=h.getX(m+1),_=Po(this,e,da,l,v,g,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(u-1),f=h.getX(d),v=Po(this,e,da,l,m,f,u-1);v&&t.push(v)}}else{let d=Math.max(0,a.start),u=Math.min(p.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=c){let v=Po(this,e,da,l,m,m+1,m);v&&t.push(v)}if(this.isLineLoop){let m=Po(this,e,da,l,u-1,d,u-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Po(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(Yo.fromBufferAttribute(o,r),$o.fromBufferAttribute(o,s),t.distanceSqToSegment(Yo,$o,th,hp)>n)return;th.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(th);return l<e.near||l>e.far?void 0:{distance:l,point:hp.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var up=new P,dp=new P,Kr=class extends Zo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)up.fromBufferAttribute(t,r),dp.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+up.distanceTo(dp);e.setAttribute("lineDistance",new je(n,1))}else Ye("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Bs=class extends qi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},pp=new pt,lh=new $r,Lo=new Ni,No=new P,ji=class extends ii{constructor(e=new bt,t=new Bs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lo.copy(n.boundingSphere),Lo.applyMatrix4(r),Lo.radius+=s,e.ray.intersectsSphere(Lo)===!1)return;pp.copy(r).invert(),lh.copy(e.ray).applyMatrix4(pp);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null)for(let p=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);p<d;p++){let u=c.getX(p);No.fromBufferAttribute(h,u),fp(No,u,l,r,e,t,this)}else for(let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);p<d;p++)No.fromBufferAttribute(h,p),fp(No,p,l,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function fp(i,e,t,n,r,s,a){let o=lh.distanceSqToPoint(i);if(o<t){let l=new P;lh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var wa=class extends ni{constructor(e=[],t=301,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Nr=class extends ni{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Dr=class extends ni{constructor(e,t,n=1014,r,s,a,o=1003,l=1003,c,h=1026,p=1){if(h!==1026&&h!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:p},r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Us(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Jo=class extends Dr{constructor(e,t=1014,n=301,r,s,a=1003,o=1003,l,c=1026){let h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Aa=class extends ni{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Qr=class i extends bt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],p=[],d=0,u=0;function m(f,v,g,_,M,T,S,b,I,F,k){let U=T/I,j=S/F,V=T/2,K=S/2,se=b/2,re=I+1,te=F+1,N=0,Z=0,ce=new P;for(let Le=0;Le<te;Le++){let ve=Le*j-K;for(let Oe=0;Oe<re;Oe++){let Se=Oe*U-V;ce[f]=Se*_,ce[v]=ve*M,ce[g]=se,c.push(ce.x,ce.y,ce.z),ce[f]=0,ce[v]=0,ce[g]=b>0?1:-1,h.push(ce.x,ce.y,ce.z),p.push(Oe/I),p.push(1-Le/F),N+=1}}for(let Le=0;Le<F;Le++)for(let ve=0;ve<I;ve++){let Oe=d+ve+re*Le,Se=d+ve+re*(Le+1),ue=d+(ve+1)+re*(Le+1),X=d+(ve+1)+re*Le;l.push(Oe,Se,X),l.push(Se,ue,X),Z+=6}o.addGroup(u,Z,k),u+=Z,d+=N}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Ko=class i extends bt{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],l=[],c=[],h=t/2,p=Math.PI/2*e,d=t,u=2*p+d,m=2*n+s,f=r+1,v=new P,g=new P;for(let _=0;_<=m;_++){let M=0,T=0,S=0,b=0;if(_<=n){let k=_/n,U=k*Math.PI/2;T=-h-e*Math.cos(U),S=e*Math.sin(U),b=-e*Math.cos(U),M=k*p}else if(_<=n+s){let k=(_-n)/s;T=k*t-h,S=e,b=0,M=p+k*d}else{let k=(_-n-s)/n,U=k*Math.PI/2;T=h+e*Math.sin(U),S=e*Math.cos(U),b=e*Math.sin(U),M=p+d+k*p}let I=Math.max(0,Math.min(1,M/u)),F=0;_===0?F=.5/r:_===m&&(F=-.5/r);for(let k=0;k<=r;k++){let U=k/r,j=U*Math.PI*2,V=Math.sin(j),K=Math.cos(j);g.x=-S*K,g.y=T,g.z=S*V,o.push(g.x,g.y,g.z),v.set(-S*K,b,S*V),v.normalize(),l.push(v.x,v.y,v.z),c.push(U+F,I)}if(_>0){let k=(_-1)*f;for(let U=0;U<r;U++){let j=k+U,V=k+U+1,K=_*f+U,se=_*f+U+1;a.push(j,V,K),a.push(V,se,K)}}}this.setIndex(a),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Qo=class i extends bt{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new P,h=new me;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let p=0,d=3;p<=t;p++,d+=3){let u=n+p/t*r;c.x=e*Math.cos(u),c.y=e*Math.sin(u),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let p=1;p<=t;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(o,3)),this.setAttribute("uv",new je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ra=class i extends bt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],p=[],d=[],u=[],m=0,f=[],v=n/2,g=0;function _(M){let T=m,S=new me,b=new P,I=0,F=M===!0?e:t,k=M===!0?1:-1;for(let j=1;j<=r;j++)p.push(0,v*k,0),d.push(0,k,0),u.push(.5,.5),m++;let U=m;for(let j=0;j<=r;j++){let V=j/r*l+o,K=Math.cos(V),se=Math.sin(V);b.x=F*se,b.y=v*k,b.z=F*K,p.push(b.x,b.y,b.z),d.push(0,k,0),S.x=.5*K+.5,S.y=.5*se*k+.5,u.push(S.x,S.y),m++}for(let j=0;j<r;j++){let V=T+j,K=U+j;M===!0?h.push(K,K+1,V):h.push(K+1,K,V),I+=3}c.addGroup(g,I,M===!0?1:2),g+=I}(function(){let M=new P,T=new P,S=0,b=(t-e)/n;for(let I=0;I<=s;I++){let F=[],k=I/s,U=k*(t-e)+e;for(let j=0;j<=r;j++){let V=j/r,K=V*l+o,se=Math.sin(K),re=Math.cos(K);T.x=U*se,T.y=-k*n+v,T.z=U*re,p.push(T.x,T.y,T.z),M.set(se,b,re).normalize(),d.push(M.x,M.y,M.z),u.push(V,1-k),F.push(m++)}f.push(F)}for(let I=0;I<r;I++)for(let F=0;F<s;F++){let k=f[F][I],U=f[F+1][I],j=f[F+1][I+1],V=f[F][I+1];(e>0||F!==0)&&(h.push(k,U,V),S+=3),(t>0||F!==s-1)&&(h.push(U,j,V),S+=3)}c.addGroup(g,S,0),g+=S})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},el=class i extends Ra{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ur=class i extends bt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(u,m,f,v){let g=v+1,_=[];for(let M=0;M<=g;M++){_[M]=[];let T=u.clone().lerp(f,M/g),S=m.clone().lerp(f,M/g),b=g-M;for(let I=0;I<=b;I++)_[M][I]=I===0&&M===g?T:T.clone().lerp(S,I/b)}for(let M=0;M<g;M++)for(let T=0;T<2*(g-M)-1;T++){let S=Math.floor(T/2);T%2==0?(l(_[M][S+1]),l(_[M+1][S]),l(_[M][S])):(l(_[M][S+1]),l(_[M+1][S+1]),l(_[M+1][S]))}}function l(u){s.push(u.x,u.y,u.z)}function c(u,m){let f=3*u;m.x=e[f+0],m.y=e[f+1],m.z=e[f+2]}function h(u,m,f,v){v<0&&u.x===1&&(a[m]=u.x-1),f.x===0&&f.z===0&&(a[m]=v/2/Math.PI+.5)}function p(u){return Math.atan2(u.z,-u.x)}function d(u){return Math.atan2(-u.y,Math.sqrt(u.x*u.x+u.z*u.z))}(function(u){let m=new P,f=new P,v=new P;for(let g=0;g<t.length;g+=3)c(t[g+0],m),c(t[g+1],f),c(t[g+2],v),o(m,f,v,u)})(r),(function(u){let m=new P;for(let f=0;f<s.length;f+=3)m.x=s[f+0],m.y=s[f+1],m.z=s[f+2],m.normalize().multiplyScalar(u),s[f+0]=m.x,s[f+1]=m.y,s[f+2]=m.z})(n),(function(){let u=new P;for(let m=0;m<s.length;m+=3){u.x=s[m+0],u.y=s[m+1],u.z=s[m+2];let f=p(u)/2/Math.PI+.5,v=d(u)/Math.PI+.5;a.push(f,1-v)}(function(){let m=new P,f=new P,v=new P,g=new P,_=new me,M=new me,T=new me;for(let S=0,b=0;S<s.length;S+=9,b+=6){m.set(s[S+0],s[S+1],s[S+2]),f.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),_.set(a[b+0],a[b+1]),M.set(a[b+2],a[b+3]),T.set(a[b+4],a[b+5]),g.copy(m).add(f).add(v).divideScalar(3);let I=p(g);h(_,b+0,m,I),h(M,b+2,f,I),h(T,b+4,v,I)}})(),(function(){for(let m=0;m<a.length;m+=6){let f=a[m+0],v=a[m+2],g=a[m+4],_=Math.max(f,v,g),M=Math.min(f,v,g);_>.9&&M<.1&&(f<.2&&(a[m+0]+=1),v<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new je(s,3)),this.setAttribute("normal",new je(s.slice(),3)),this.setAttribute("uv",new je(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},tl=class i extends Ur{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Do=new P,Uo=new P,nh=new P,Oo=new Hi,nl=class extends bt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(ko*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],p=new Array(3),d={},u=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:f,b:v,c:g}=Oo;if(f.fromBufferAttribute(o,c[0]),v.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),Oo.getNormal(nh),p[0]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,p[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,p[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,p[0]!==p[1]&&p[1]!==p[2]&&p[2]!==p[0])for(let _=0;_<3;_++){let M=(_+1)%3,T=p[_],S=p[M],b=Oo[h[_]],I=Oo[h[M]],F=`${T}_${S}`,k=`${S}_${T}`;k in d&&d[k]?(nh.dot(d[k].normal)<=s&&(u.push(b.x,b.y,b.z),u.push(I.x,I.y,I.z)),d[k]=null):F in d||(d[F]={index0:c[_],index1:c[M],normal:nh.clone()})}}for(let m in d)if(d[m]){let{index0:f,index1:v}=d[m];Do.fromBufferAttribute(o,f),Uo.fromBufferAttribute(o,v),u.push(Do.x,Do.y,Do.z),u.push(Uo.x,Uo.y,Uo.z)}this.setAttribute("position",new je(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},vi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ye("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(r=Math.floor(l+(c-l)/2),o=n[r]-a,o<0)l=r+1;else{if(!(o>0)){c=r;break}c=r-1}if(r=c,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new me:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,r=[],s=[],a=[],o=new P,l=new pt;for(let u=0;u<=e;u++){let m=u/e;r[u]=this.getTangentAt(m,new P)}s[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),p=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),p<=c&&(c=p,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(yt(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(l.makeRotationAxis(o,m))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(yt(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],u*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},zs=class extends vi{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new me){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=l-this.aX,u=c-this.aY;l=d*h-u*p+this.aX,c=d*p+u*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},il=class extends zs{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function vu(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,p){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+p)+(l-o)/p;d*=h,u*=h,r(a,o,d,u)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var mp=new P,gp=new P,ih=new vu,rh=new vu,sh=new vu,rl=class extends vi{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new P){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=r[(c-1)%s]:(gp.subVectors(r[0],r[1]).add(r[0]),o=gp);let p=r[c%s],d=r[(c+1)%s];if(this.closed||c+2<s?l=r[(c+2)%s]:(mp.subVectors(r[s-1],r[s-2]).add(r[s-1]),l=mp),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(p),u),f=Math.pow(p.distanceToSquared(d),u),v=Math.pow(d.distanceToSquared(l),u);f<1e-4&&(f=1),m<1e-4&&(m=f),v<1e-4&&(v=f),ih.initNonuniformCatmullRom(o.x,p.x,d.x,l.x,m,f,v),rh.initNonuniformCatmullRom(o.y,p.y,d.y,l.y,m,f,v),sh.initNonuniformCatmullRom(o.z,p.z,d.z,l.z,m,f,v)}else this.curveType==="catmullrom"&&(ih.initCatmullRom(o.x,p.x,d.x,l.x,this.tension),rh.initCatmullRom(o.y,p.y,d.y,l.y,this.tension),sh.initCatmullRom(o.z,p.z,d.z,l.z,this.tension));return n.set(ih.calc(h),rh.calc(h),sh.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new P().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function _p(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function t0(i,e){let t=1-i;return t*t*e}function n0(i,e){return 2*(1-i)*i*e}function i0(i,e){return i*i*e}function fa(i,e,t,n){return t0(i,e)+n0(i,t)+i0(i,n)}function r0(i,e){let t=1-i;return t*t*t*e}function s0(i,e){let t=1-i;return 3*t*t*i*e}function a0(i,e){return 3*(1-i)*i*i*e}function o0(i,e){return i*i*i*e}function ma(i,e,t,n,r){return r0(i,e)+s0(i,t)+a0(i,n)+o0(i,r)}var Ca=class extends vi{constructor(e=new me,t=new me,n=new me,r=new me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new me){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ma(e,r.x,s.x,a.x,o.x),ma(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},sl=class extends vi{constructor(e=new P,t=new P,n=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ma(e,r.x,s.x,a.x,o.x),ma(e,r.y,s.y,a.y,o.y),ma(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ia=class extends vi{constructor(e=new me,t=new me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new me){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},al=class extends vi{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Pa=class extends vi{constructor(e=new me,t=new me,n=new me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new me){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(fa(e,r.x,s.x,a.x),fa(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},La=class extends vi{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(fa(e,r.x,s.x,a.x),fa(e,r.y,s.y,a.y),fa(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Na=class extends vi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new me){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return n.set(_p(o,l.x,c.x,h.x,p.x),_p(o,l.y,c.y,h.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new me().fromArray(r))}return this}},ol=Object.freeze({__proto__:null,ArcCurve:il,CatmullRomCurve3:rl,CubicBezierCurve:Ca,CubicBezierCurve3:sl,EllipseCurve:zs,LineCurve:Ia,LineCurve3:al,QuadraticBezierCurve:Pa,QuadraticBezierCurve3:La,SplineCurve:Na}),ll=class extends vi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ol[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new ol[r.type]().fromJSON(r))}return this}},Da=class extends ll{constructor(e){super(),this.type="Path",this.currentPoint=new me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ia(this.currentPoint.clone(),new me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Pa(this.currentPoint.clone(),new me(e,t),new me(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new Ca(this.currentPoint.clone(),new me(e,t),new me(n,r),new me(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Na(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new zs(e,t,n,r,s,a,o,l);if(this.curves.length>0){let p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ua=class extends Da{constructor(e){super(e),this.uuid=ur(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Da().fromJSON(r))}return this}};function l0(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=yf(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=p0(i,e,s,t)),i.length>80*t){o=i[0],l=i[1];let h=o,p=l;for(let d=t;d<r;d+=t){let u=i[d],m=i[d+1];u<o&&(o=u),m<l&&(l=m),u>h&&(h=u),m>p&&(p=m)}c=Math.max(h-o,p-l),c=c!==0?32767/c:0}return Oa(s,a,t,o,l,c,0),a}function yf(i,e,t,n,r){let s;if(r===T0(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=vp(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=vp(a/n|0,i[a],i[a+1],s);return s&&Vs(s,s.next)&&(Ba(s),s=s.next),s}function es(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!Vs(n,n.next)&&xn(n.prev,n,n.next)!==0)n=n.next;else{if(Ba(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Oa(i,e,t,n,r,s,a){if(!i)return;!a&&s&&v0(i,n,r,s);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(s?h0(i,n,r,s):c0(i))e.push(l.i,i.i,c.i),Ba(i),i=c.next,o=c.next;else if((i=c)===o){a?a===1?Oa(i=u0(es(i),e),e,t,n,r,s,2):a===2&&d0(i,e,t,n,r,s):Oa(es(i),e,t,n,r,s,1);break}}}function c0(i){let e=i.prev,t=i,n=i.next;if(xn(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(r,s,a),p=Math.min(o,l,c),d=Math.max(r,s,a),u=Math.max(o,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=p&&m.y<=u&&pa(r,o,s,l,a,c,m.x,m.y)&&xn(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function h0(i,e,t,n){let r=i.prev,s=i,a=i.next;if(xn(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,p=s.y,d=a.y,u=Math.min(o,l,c),m=Math.min(h,p,d),f=Math.max(o,l,c),v=Math.max(h,p,d),g=ch(u,m,e,t,n),_=ch(f,v,e,t,n),M=i.prevZ,T=i.nextZ;for(;M&&M.z>=g&&T&&T.z<=_;){if(M.x>=u&&M.x<=f&&M.y>=m&&M.y<=v&&M!==r&&M!==a&&pa(o,h,l,p,c,d,M.x,M.y)&&xn(M.prev,M,M.next)>=0||(M=M.prevZ,T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&pa(o,h,l,p,c,d,T.x,T.y)&&xn(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;M&&M.z>=g;){if(M.x>=u&&M.x<=f&&M.y>=m&&M.y<=v&&M!==r&&M!==a&&pa(o,h,l,p,c,d,M.x,M.y)&&xn(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;T&&T.z<=_;){if(T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&pa(o,h,l,p,c,d,T.x,T.y)&&xn(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function u0(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Vs(n,r)&&Mf(n,t,t.next,r)&&Fa(n,r)&&Fa(r,n)&&(e.push(n.i,t.i,r.i),Ba(t),Ba(t.next),t=i=r),t=t.next}while(t!==i);return es(t)}function d0(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&S0(a,o)){let l=bf(a,o);return a=es(a,a.next),l=es(l,l.next),Oa(a,e,t,n,r,s,0),void Oa(l,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function p0(i,e,t,n){let r=[];for(let s=0,a=e.length;s<a;s++){let o=yf(i,e[s]*n,s<a-1?e[s+1]*n:i.length,n,!1);o===o.next&&(o.steiner=!0),r.push(y0(o))}r.sort(f0);for(let s=0;s<r.length;s++)t=m0(r[s],t);return t}function f0(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function m0(i,e){let t=g0(i,e);if(!t)return e;let n=bf(t,i);return es(n,n.next),es(t,t.next)}function g0(i,e){let t=e,n=i.x,r=i.y,s,a=-1/0;if(Vs(i,t))return t;do{if(Vs(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let p=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>a&&(a=p,s=t.x<t.next.x?t:t.next,p===n))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,l=s.x,c=s.y,h=1/0;t=s;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Sf(r<c?n:a,r,l,c,r<c?a:n,r,t.x,t.y)){let p=Math.abs(r-t.y)/(n-t.x);Fa(t,i)&&(p<h||p===h&&(t.x>s.x||t.x===s.x&&_0(s,t)))&&(s=t,h=p)}t=t.next}while(t!==o);return s}function _0(i,e){return xn(i.prev,i,e.prev)<0&&xn(e.next,i,i.next)<0}function v0(i,e,t,n){let r=i;do r.z===0&&(r.z=ch(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,x0(r)}function x0(i){let e,t=1;do{let n,r=i;i=null;let s=null;for(e=0;r;){e++;let a=r,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||r.z<=a.z)?(n=r,r=r.nextZ,o--):(n=a,a=a.nextZ,l--),s?s.nextZ=n:i=n,n.prevZ=s,s=n;r=a}s.nextZ=null,t*=2}while(e>1);return i}function ch(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function y0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Sf(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function pa(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Sf(i,e,t,n,r,s,a,o)}function S0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!M0(i,e)&&(Fa(i,e)&&Fa(e,i)&&b0(i,e)&&(xn(i.prev,i,e.prev)||xn(i,e.prev,e))||Vs(i,e)&&xn(i.prev,i,i.next)>0&&xn(e.prev,e,e.next)>0)}function xn(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Vs(i,e){return i.x===e.x&&i.y===e.y}function Mf(i,e,t,n){let r=Bo(xn(i,e,t)),s=Bo(xn(i,e,n)),a=Bo(xn(t,n,i)),o=Bo(xn(t,n,e));return r!==s&&a!==o||!(r!==0||!Fo(i,t,e))||!(s!==0||!Fo(i,n,e))||!(a!==0||!Fo(t,i,n))||!(o!==0||!Fo(t,e,n))}function Fo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Bo(i){return i>0?1:i<0?-1:0}function M0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Mf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Fa(i,e){return xn(i.prev,i,i.next)<0?xn(i,e,i.next)>=0&&xn(i,i.prev,e)>=0:xn(i,e,i.prev)<0||xn(i,i.next,e)<0}function b0(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function bf(i,e){let t=hh(i.i,i.x,i.y),n=hh(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function vp(i,e,t,n){let r=hh(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Ba(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function hh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function T0(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var uh=class{static triangulate(e,t,n=2){return l0(e,t,n)}},Wi=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];xp(e),yp(n,e);let a=e.length;t.forEach(xp);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,yp(n,t[l]);let o=uh.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function xp(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function yp(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var cl=class i extends bt{constructor(e=new Ua([new me(.5,.5),new me(-.5,.5),new me(-.5,-.5),new me(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:u-.1,f=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:E0,M,T,S,b,I,F=!1;if(g){M=g.getSpacedPoints(h),F=!0,d=!1;let C=!!g.isCatmullRomCurve3&&g.closed;T=g.computeFrenetFrames(h,C),S=new P,b=new P,I=new P}d||(v=0,u=0,m=0,f=0);let k=o.extractPoints(c),U=k.shape,j=k.holes;if(!Wi.isClockWise(U)){U=U.reverse();for(let C=0,O=j.length;C<O;C++){let y=j[C];Wi.isClockWise(y)&&(j[C]=y.reverse())}}function V(C){let O=10000000000000001e-36,y=C[0];for(let z=1;z<=C.length;z++){let B=z%C.length,R=C[B],q=R.x-y.x,Y=R.y-y.y,J=q*q+Y*Y,de=Math.max(Math.abs(R.x),Math.abs(R.y),Math.abs(y.x),Math.abs(y.y));J<=O*de*de?(C.splice(B,1),z--):y=R}}V(U),j.forEach(V);let K=j.length,se=U;for(let C=0;C<K;C++){let O=j[C];U=U.concat(O)}function re(C,O,y){return O||Qe("ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(O,y)}let te=U.length;function N(C,O,y){let z,B,R,q=C.x-O.x,Y=C.y-O.y,J=y.x-C.x,de=y.y-C.y,ye=q*q+Y*Y,Ie=q*de-Y*J;if(Math.abs(Ie)>Number.EPSILON){let _e=Math.sqrt(ye),Fe=Math.sqrt(J*J+de*de),oe=O.x-Y/_e,fe=O.y+q/_e,ge=((y.x-de/Fe-oe)*de-(y.y+J/Fe-fe)*J)/(q*de-Y*J);z=oe+q*ge-C.x,B=fe+Y*ge-C.y;let we=z*z+B*B;if(we<=2)return new me(z,B);R=Math.sqrt(we/2)}else{let _e=!1;q>Number.EPSILON?J>Number.EPSILON&&(_e=!0):q<-Number.EPSILON?J<-Number.EPSILON&&(_e=!0):Math.sign(Y)===Math.sign(de)&&(_e=!0),_e?(z=-Y,B=q,R=Math.sqrt(ye)):(z=q,B=Y,R=Math.sqrt(ye/2))}return new me(z/R,B/R)}let Z=[];for(let C=0,O=se.length,y=O-1,z=C+1;C<O;C++,y++,z++)y===O&&(y=0),z===O&&(z=0),Z[C]=N(se[C],se[y],se[z]);let ce=[],Le,ve,Oe=Z.concat();for(let C=0,O=K;C<O;C++){let y=j[C];Le=[];for(let z=0,B=y.length,R=B-1,q=z+1;z<B;z++,R++,q++)R===B&&(R=0),q===B&&(q=0),Le[z]=N(y[z],y[R],y[q]);ce.push(Le),Oe=Oe.concat(Le)}if(v===0)ve=Wi.triangulateShape(se,j);else{let C=[],O=[];for(let y=0;y<v;y++){let z=y/v,B=u*Math.cos(z*Math.PI/2),R=m*Math.sin(z*Math.PI/2)+f;for(let q=0,Y=se.length;q<Y;q++){let J=re(se[q],Z[q],R);ee(J.x,J.y,-B),z===0&&C.push(J)}for(let q=0,Y=K;q<Y;q++){let J=j[q];Le=ce[q];let de=[];for(let ye=0,Ie=J.length;ye<Ie;ye++){let _e=re(J[ye],Le[ye],R);ee(_e.x,_e.y,-B),z===0&&de.push(_e)}z===0&&O.push(de)}}ve=Wi.triangulateShape(C,O)}let Se=ve.length,ue=m+f;for(let C=0;C<te;C++){let O=d?re(U[C],Oe[C],ue):U[C];F?(b.copy(T.normals[0]).multiplyScalar(O.x),S.copy(T.binormals[0]).multiplyScalar(O.y),I.copy(M[0]).add(b).add(S),ee(I.x,I.y,I.z)):ee(O.x,O.y,0)}for(let C=1;C<=h;C++)for(let O=0;O<te;O++){let y=d?re(U[O],Oe[O],ue):U[O];F?(b.copy(T.normals[C]).multiplyScalar(y.x),S.copy(T.binormals[C]).multiplyScalar(y.y),I.copy(M[C]).add(b).add(S),ee(I.x,I.y,I.z)):ee(y.x,y.y,p/h*C)}for(let C=v-1;C>=0;C--){let O=C/v,y=u*Math.cos(O*Math.PI/2),z=m*Math.sin(O*Math.PI/2)+f;for(let B=0,R=se.length;B<R;B++){let q=re(se[B],Z[B],z);ee(q.x,q.y,p+y)}for(let B=0,R=j.length;B<R;B++){let q=j[B];Le=ce[B];for(let Y=0,J=q.length;Y<J;Y++){let de=re(q[Y],Le[Y],z);F?ee(de.x,de.y+M[h-1].y,M[h-1].x+y):ee(de.x,de.y,p+y)}}}function X(C,O){let y=C.length;for(;--y>=0;){let z=y,B=y-1;B<0&&(B=C.length-1);for(let R=0,q=h+2*v;R<q;R++){let Y=te*R,J=te*(R+1);he(O+z+Y,O+B+Y,O+B+J,O+z+J)}}}function ee(C,O,y){l.push(C),l.push(O),l.push(y)}function le(C,O,y){A(C),A(O),A(y);let z=r.length/3,B=_.generateTopUV(n,r,z-3,z-2,z-1);E(B[0]),E(B[1]),E(B[2])}function he(C,O,y,z){A(C),A(O),A(z),A(O),A(y),A(z);let B=r.length/3,R=_.generateSideWallUV(n,r,B-6,B-3,B-2,B-1);E(R[0]),E(R[1]),E(R[3]),E(R[1]),E(R[2]),E(R[3])}function A(C){r.push(l[3*C+0]),r.push(l[3*C+1]),r.push(l[3*C+2])}function E(C){s.push(C.x),s.push(C.y)}(function(){let C=r.length/3;if(d){let O=0,y=te*O;for(let z=0;z<Se;z++){let B=ve[z];le(B[2]+y,B[1]+y,B[0]+y)}O=h+2*v,y=te*O;for(let z=0;z<Se;z++){let B=ve[z];le(B[0]+y,B[1]+y,B[2]+y)}}else{for(let O=0;O<Se;O++){let y=ve[O];le(y[2],y[1],y[0])}for(let O=0;O<Se;O++){let y=ve[O];le(y[0]+te*h,y[1]+te*h,y[2]+te*h)}}n.addGroup(C,r.length/3-C,0)})(),(function(){let C=r.length/3,O=0;X(se,O),O+=se.length;for(let y=0,z=j.length;y<z;y++){let B=j[y];X(B,O),O+=B.length}n.addGroup(C,r.length/3-C,1)})()}this.setAttribute("position",new je(r,3)),this.setAttribute("uv",new je(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return w0(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new ol[r.type]().fromJSON(r)),new i(n,e.options)}},E0={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*r],h=e[3*r+1];return[new me(s,a),new me(o,l),new me(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],p=e[3*n+2],d=e[3*r],u=e[3*r+1],m=e[3*r+2],f=e[3*s],v=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new me(a,1-l),new me(c,1-p),new me(d,1-m),new me(f,1-g)]:[new me(o,1-l),new me(h,1-p),new me(u,1-m),new me(v,1-g)]}};function w0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var hl=class i extends Ur{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ul=class i extends bt{constructor(e=[new me(0,-.5),new me(.5,0),new me(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=yt(r,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,p=new P,d=new me,u=new P,m=new P,f=new P,v=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,f.copy(u),u.normalize(),l.push(u.x,u.y,u.z);break;case e.length-1:l.push(f.x,f.y,f.z);break;default:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,m.copy(u),u.x+=f.x,u.y+=f.y,u.z+=f.z,u.normalize(),l.push(u.x,u.y,u.z),f.copy(m)}for(let _=0;_<=t;_++){let M=n+_*h*r,T=Math.sin(M),S=Math.cos(M);for(let b=0;b<=e.length-1;b++){p.x=e[b].x*T,p.y=e[b].y,p.z=e[b].x*S,a.push(p.x,p.y,p.z),d.x=_/t,d.y=b/(e.length-1),o.push(d.x,d.y);let I=l[3*b+0]*T,F=l[3*b+1],k=l[3*b+0]*S;c.push(I,F,k)}}for(let _=0;_<t;_++)for(let M=0;M<e.length-1;M++){let T=M+_*e.length,S=T,b=T+e.length,I=T+e.length+1,F=T+1;s.push(S,b,F),s.push(I,F,b)}this.setIndex(s),this.setAttribute("position",new je(a,3)),this.setAttribute("uv",new je(o,2)),this.setAttribute("normal",new je(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},dl=class i extends Ur{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ks=class i extends bt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,p=e/o,d=t/l,u=[],m=[],f=[],v=[];for(let g=0;g<h;g++){let _=g*d-a;for(let M=0;M<c;M++){let T=M*p-s;m.push(T,-_,0),f.push(0,0,1),v.push(M/o),v.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){let M=_+c*g,T=_+c*(g+1),S=_+1+c*(g+1),b=_+1+c*g;u.push(M,T,b),u.push(T,S,b)}this.setIndex(u),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},pl=class i extends bt{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],p=e,d=(t-e)/(r=Math.max(1,r)),u=new P,m=new me;for(let f=0;f<=r;f++){for(let v=0;v<=n;v++){let g=s+v/n*a;u.x=p*Math.cos(g),u.y=p*Math.sin(g),l.push(u.x,u.y,u.z),c.push(0,0,1),m.x=(u.x/t+1)/2,m.y=(u.y/t+1)/2,h.push(m.x,m.y)}p+=d}for(let f=0;f<r;f++){let v=f*(n+1);for(let g=0;g<n;g++){let _=g+v,M=_,T=_+n+1,S=_+n+2,b=_+1;o.push(M,T,b),o.push(T,S,b)}}this.setIndex(o),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(c,3)),this.setAttribute("uv",new je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},fl=class i extends bt{constructor(e=new Ua([new me(0,.5),new me(-.5,-.5),new me(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let p=r.length/3,d=h.extractPoints(t),u=d.shape,m=d.holes;Wi.isClockWise(u)===!1&&(u=u.reverse());for(let v=0,g=m.length;v<g;v++){let _=m[v];Wi.isClockWise(_)===!0&&(m[v]=_.reverse())}let f=Wi.triangulateShape(u,m);for(let v=0,g=m.length;v<g;v++){let _=m[v];u=u.concat(_)}for(let v=0,g=u.length;v<g;v++){let _=u[v];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let v=0,g=f.length;v<g;v++){let _=f[v],M=_[0]+p,T=_[1]+p,S=_[2]+p;n.push(M,T,S),l+=3}}this.setIndex(n),this.setAttribute("position",new je(r,3)),this.setAttribute("normal",new je(s,3)),this.setAttribute("uv",new je(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return A0(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function A0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var Gs=class i extends bt{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],p=new P,d=new P,u=[],m=[],f=[],v=[];for(let g=0;g<=n;g++){let _=[],M=g/n,T=a+M*o,S=e*Math.cos(T),b=Math.sqrt(e*e-S*S),I=0;g===0&&a===0?I=.5/t:g===n&&l===Math.PI&&(I=-.5/t);for(let F=0;F<=t;F++){let k=F/t,U=r+k*s;p.x=-b*Math.cos(U),p.y=S,p.z=b*Math.sin(U),m.push(p.x,p.y,p.z),d.copy(p).normalize(),f.push(d.x,d.y,d.z),v.push(k+I,1-M),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let M=h[g][_+1],T=h[g][_],S=h[g+1][_],b=h[g+1][_+1];(g!==0||a>0)&&u.push(M,T,b),(g!==n-1||l<Math.PI)&&u.push(T,S,b)}this.setIndex(u),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},ml=class i extends Ur{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},gl=class i extends bt{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI,a=0,o=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let l=[],c=[],h=[],p=[],d=new P,u=new P,m=new P;for(let f=0;f<=n;f++){let v=a+f/n*o;for(let g=0;g<=r;g++){let _=g/r*s;u.x=(e+t*Math.cos(v))*Math.cos(_),u.y=(e+t*Math.cos(v))*Math.sin(_),u.z=t*Math.sin(v),c.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),m.subVectors(u,d).normalize(),h.push(m.x,m.y,m.z),p.push(g/r),p.push(f/n)}}for(let f=1;f<=n;f++)for(let v=1;v<=r;v++){let g=(r+1)*f+v-1,_=(r+1)*(f-1)+v-1,M=(r+1)*(f-1)+v,T=(r+1)*f+v;l.push(g,_,T),l.push(_,M,T)}this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},_l=class i extends bt{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],l=[],c=[],h=[],p=new P,d=new P,u=new P,m=new P,f=new P,v=new P,g=new P;for(let M=0;M<=n;++M){let T=M/n*s*Math.PI*2;_(T,s,a,e,u),_(T+.01,s,a,e,m),v.subVectors(m,u),g.addVectors(m,u),f.crossVectors(v,g),g.crossVectors(f,v),f.normalize(),g.normalize();for(let S=0;S<=r;++S){let b=S/r*Math.PI*2,I=-t*Math.cos(b),F=t*Math.sin(b);p.x=u.x+(I*g.x+F*f.x),p.y=u.y+(I*g.y+F*f.y),p.z=u.z+(I*g.z+F*f.z),l.push(p.x,p.y,p.z),d.subVectors(p,u).normalize(),c.push(d.x,d.y,d.z),h.push(M/n),h.push(S/r)}}for(let M=1;M<=n;M++)for(let T=1;T<=r;T++){let S=(r+1)*(M-1)+(T-1),b=(r+1)*M+(T-1),I=(r+1)*M+T,F=(r+1)*(M-1)+T;o.push(S,b,F),o.push(b,I,F)}function _(M,T,S,b,I){let F=Math.cos(M),k=Math.sin(M),U=S/T*M,j=Math.cos(U);I.x=b*(2+j)*.5*F,I.y=b*(2+j)*k*.5,I.z=b*Math.sin(U)*.5}this.setIndex(o),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(c,3)),this.setAttribute("uv",new je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},vl=class i extends bt{constructor(e=new La(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,l=new P,c=new me,h=new P,p=[],d=[],u=[],m=[];function f(v){h=e.getPointAt(v/t,h);let g=a.normals[v],_=a.binormals[v];for(let M=0;M<=r;M++){let T=M/r*Math.PI*2,S=Math.sin(T),b=-Math.cos(T);l.x=b*g.x+S*_.x,l.y=b*g.y+S*_.y,l.z=b*g.z+S*_.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,p.push(o.x,o.y,o.z)}}(function(){for(let v=0;v<t;v++)f(v);f(s===!1?t:0),(function(){for(let v=0;v<=t;v++)for(let g=0;g<=r;g++)c.x=v/t,c.y=g/r,u.push(c.x,c.y)})(),(function(){for(let v=1;v<=t;v++)for(let g=1;g<=r;g++){let _=(r+1)*(v-1)+(g-1),M=(r+1)*v+(g-1),T=(r+1)*v+g,S=(r+1)*(v-1)+g;m.push(_,M,S),m.push(M,T,S)}})()})(),this.setIndex(m),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new ol[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},xl=class extends bt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new P,s=new P;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let p=l[c],d=p.start;for(let u=d,m=d+p.count;u<m;u+=3)for(let f=0;f<3;f++){let v=o.getX(u+f),g=o.getX(u+(f+1)%3);r.fromBufferAttribute(a,v),s.fromBufferAttribute(a,g),Sp(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,p=3*o+(c+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,p),Sp(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new je(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Sp(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var kS=Object.freeze({__proto__:null,BoxGeometry:Qr,CapsuleGeometry:Ko,CircleGeometry:Qo,ConeGeometry:el,CylinderGeometry:Ra,DodecahedronGeometry:tl,EdgesGeometry:nl,ExtrudeGeometry:cl,IcosahedronGeometry:hl,LatheGeometry:ul,OctahedronGeometry:dl,PlaneGeometry:ks,PolyhedronGeometry:Ur,RingGeometry:pl,ShapeGeometry:fl,SphereGeometry:Gs,TetrahedronGeometry:ml,TorusGeometry:gl,TorusKnotGeometry:_l,TubeGeometry:vl,WireframeGeometry:xl});function os(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(Mp(r))r.isRenderTargetTexture?(Ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Mp(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Kn(i){let e={};for(let t=0;t<i.length;t++){let n=os(i[t]);for(let r in n)e[r]=n[r]}return e}function Mp(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function R0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function xu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ct.workingColorSpace}var Tf={clone:os,merge:Kn},C0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,I0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,En=class extends qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=C0,this.fragmentShader=I0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=R0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new ht().setHex(r.value);break;case"v2":this.uniforms[n].value=new me().fromArray(r.value);break;case"v3":this.uniforms[n].value=new P().fromArray(r.value);break;case"v4":this.uniforms[n].value=new en().fromArray(r.value);break;case"m3":this.uniforms[n].value=new st().fromArray(r.value);break;case"m4":this.uniforms[n].value=new pt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},yl=class extends En{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Sl=class extends qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ml=class extends qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var za=class extends Jr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Ls(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function ah(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Or=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},bl=class extends Or{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,o=2*t-n;break;case 2402:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,l=2*n-t;break;case 2402:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(n-t)/(r-t),f=m*m,v=f*m,g=-d*v+2*d*f-d*m,_=(1+d)*v+(-1.5-2*d)*f+(-.5+d)*m+1,M=(-1-u)*v+(1.5+u)*f+.5*m,T=u*v-u*f;for(let S=0;S!==o;++S)s[S]=g*a[h+S]+_*a[c+S]+M*a[l+S]+T*a[p+S];return s}},Tl=class extends Or{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),p=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*p+a[l+d]*h;return s}},El=class extends Or{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},wl=class extends Or{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let m=(n-t)/(r-t),f=1-m;for(let v=0;v!==o;++v)s[v]=a[c+v]*f+a[l+v]*m;return s}let d=2*o,u=e-1;for(let m=0;m!==o;++m){let f=a[c+m],v=a[l+m],g=u*d+2*m,_=p[g],M=p[g+1],T=e*d+2*m,S=h[T],b=h[T+1],I=L0(n,t,_,S,r);s[m]=Ef(I,f,M,b,v)}return s}};function Ef(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function P0(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function L0(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=Ef(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let l=P0(s,e,t,n,r);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var _i=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ls(t,this.TimeBufferType),this.values=Ls(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ls(e.times,Array),values:Ls(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),ah(e.settings)&&(n.settings={inTangents:Ls(e.settings.inTangents,Array),outTangents:Ls(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new El(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Tl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new bl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new wl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return Ye("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;ah(this.settings)&&(bp(this.settings.inTangents,e),bp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Qe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Qe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Qe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&Dg(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){Qe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===2302,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(r)l=!0;else{let h=o*n,p=h-n,d=h+n;for(let u=0;u!==n;++u){let m=t[h+u];if(m!==t[p+u]||m!==t[d+u]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,p=a*n;for(let d=0;d!==n;++d)t[p+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,ah(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function bp(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}_i.prototype.ValueTypeName="",_i.prototype.TimeBufferType=Float32Array,_i.prototype.ValueBufferType=Float32Array,_i.prototype.DefaultInterpolation=2301;var Cr=class extends _i{constructor(e,t,n){super(e,t,n)}};Cr.prototype.ValueTypeName="bool",Cr.prototype.ValueBufferType=Array,Cr.prototype.DefaultInterpolation=2300,Cr.prototype.InterpolantFactoryMethodLinear=void 0,Cr.prototype.InterpolantFactoryMethodSmooth=void 0;var Al=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}};Al.prototype.ValueTypeName="color";var Rl=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}};Rl.prototype.ValueTypeName="number";var Cl=class extends Or{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)Mi.slerpFlat(s,0,a,c-o,a,c,l);return s}},Va=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Cl(this.times,this.values,this.getValueSize(),e)}};Va.prototype.ValueTypeName="quaternion",Va.prototype.InterpolantFactoryMethodSmooth=void 0;var Ir=class extends _i{constructor(e,t,n){super(e,t,n)}};Ir.prototype.ValueTypeName="string",Ir.prototype.ValueBufferType=Array,Ir.prototype.DefaultInterpolation=2300,Ir.prototype.InterpolantFactoryMethodLinear=void 0,Ir.prototype.InterpolantFactoryMethodSmooth=void 0;var Il=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}};Il.prototype.ValueTypeName="vector";var Pl=class{constructor(e,t,n){let r=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){l++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,l),o===l&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,d=c.length;p<d;p+=2){let u=c[p],m=c[p+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},wf=new Pl,Ll=class{constructor(e){this.manager=e!==void 0?e:wf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ll.DEFAULT_MATERIAL_NAME="__DEFAULT";var GS=new pt,HS=new P,WS=new P;var zo=new P,Vo=new Mi,ki=new P,Hs=class extends ii{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(zo,Vo,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zo,Vo,ki.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(zo,Vo,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zo,Vo,ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Rr=new P,Tp=new me,Ep=new me,Yn=class extends Hs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Go*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*ko*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Go*Math.atan(Math.tan(.5*ko*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Rr.x,Rr.y).multiplyScalar(-e/Rr.z),Rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rr.x,Rr.y).multiplyScalar(-e/Rr.z)}getViewSize(e,t){return this.getViewBounds(e,Tp,Ep),t.subVectors(Ep,Tp)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*ko*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var ka=class extends Hs{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var XS=new pt,qS=new pt,jS=new pt;var Nl=class extends ii{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Yn(-90,1,e,t);r.layers=this.layers,this.add(r);let s=new Yn(-90,1,e,t);s.layers=this.layers,this.add(s);let a=new Yn(-90,1,e,t);a.layers=this.layers,this.add(a);let o=new Yn(-90,1,e,t);o.layers=this.layers,this.add(o);let l=new Yn(-90,1,e,t);l.layers=this.layers,this.add(l);let c=new Yn(-90,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==2001)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;v=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=f,e.setRenderTarget(n,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,d,u),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Dl=class extends Yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ga=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=N0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function N0(){this._document.hidden===!1&&this.reset()}var YS=new P,$S=new Mi,ZS=new P,JS=new P,KS=new P;var QS=new P,eM=new Mi,tM=new P,nM=new P;var D0=new RegExp("[\\[\\]\\.:\\/]","g"),yu="[^\\[\\]\\.:\\/]",U0="[^"+"\\[\\]\\.:\\/".replace("\\.","")+"]",O0=/((?:WC+[\/:])*)/.source.replace("WC",yu),F0=/(WCOD+)?/.source.replace("WCOD",U0),B0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yu),z0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yu),V0=new RegExp("^"+O0+F0+B0+z0+"$"),k0=["material","materials","bones","map"],dh=class{constructor(e,t,n){let r=n||un.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},un=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(D0,"")}static parseTrackName(e){let t=V0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);k0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void Ye("PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void Qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void Qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void Qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void Qe("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void Qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[r];if(a===void 0)return void Qe("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+r+" but it wasn't found.",e);let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};un.Composite=dh,un.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},un.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},un.prototype.GetterByBindingType=[un.prototype._getValue_direct,un.prototype._getValue_array,un.prototype._getValue_arrayElement,un.prototype._getValue_toArray],un.prototype.SetterByBindingTypeAndVersioning=[[un.prototype._setValue_direct,un.prototype._setValue_direct_setNeedsUpdate,un.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[un.prototype._setValue_array,un.prototype._setValue_array_setNeedsUpdate,un.prototype._setValue_array_setMatrixWorldNeedsUpdate],[un.prototype._setValue_arrayElement,un.prototype._setValue_arrayElement_setNeedsUpdate,un.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[un.prototype._setValue_fromArray,un.prototype._setValue_fromArray_setNeedsUpdate,un.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var iM=new Float32Array(1);var rM=new pt;var wu=class wu{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};wu.prototype.isMatrix2=!0;var ph=wu,sM=new me;var aM=new P,oM=new P,lM=new P,cM=new P,hM=new P,uM=new P,dM=new P;var pM=new P;var fM=new P,mM=new pt,gM=new pt;var _M=new P,vM=new ht,xM=new ht;var yM=new P,SM=new P,MM=new P;var bM=new P,TM=new Hs;var EM=new Li;var wM=new P;function Su(i,e,t,n){let r=G0(n);switch(t){case 1021:return i*e;case 1028:case 1029:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case 1023:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:case 37496:case 37490:case 37491:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function G0(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}})),typeof window<"u"&&(window.__THREE__?Ye("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Yf(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function W0(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=i.createBuffer(),p;if(i.bindBuffer(a,h),i.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)p=i.HALF_FLOAT;else if(o instanceof Uint16Array)p=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)p=i.SHORT;else if(o instanceof Uint32Array)p=i.UNSIGNED_INT;else if(o instanceof Int32Array)p=i.INT;else if(o instanceof Int8Array)p=i.BYTE;else if(o instanceof Uint8Array)p=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);p=i.UNSIGNED_BYTE}return{buffer:h,type:p,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(i.bindBuffer(o,s),c.length===0)i.bufferSubData(o,0,l);else{c.sort((p,d)=>p.start-d.start);let h=0;for(let p=1;p<c.length;p++){let d=c[h],u=c[p];u.start<=d.start+d.count+1?d.count=Math.max(d.count,u.start+u.count-d.start):(++h,c[h]=u)}c.length=h+1;for(let p=0,d=c.length;p<d;p++){let u=c[p];i.bufferSubData(o,u.start*l.BYTES_PER_ELEMENT,l,u.start,u.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var X0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,q0=`#ifdef USE_ALPHAHASH
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
#endif`,j0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Y0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Z0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,J0=`#ifdef USE_AOMAP
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
#endif`,K0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Q0=`#ifdef USE_BATCHING
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
#endif`,e_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,t_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,n_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,i_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,r_=`#ifdef USE_IRIDESCENCE
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
#endif`,s_=`#ifdef USE_BUMPMAP
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
#endif`,a_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,o_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,l_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,c_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,h_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,u_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,d_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,p_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,f_=`#define PI 3.141592653589793
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
} // validated`,m_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,g_=`vec3 transformedNormal = objectNormal;
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
#endif`,__=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,v_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,x_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,y_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,S_="gl_FragColor = linearToOutputTexel( gl_FragColor );",M_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,b_=`#ifdef USE_ENVMAP
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
#endif`,T_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,E_=`#ifdef USE_ENVMAP
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
#endif`,w_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,A_=`#ifdef USE_ENVMAP
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
#endif`,R_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,C_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,I_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,P_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,L_=`#ifdef USE_GRADIENTMAP
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
}`,N_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,D_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,U_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,O_=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,F_=`#ifdef USE_ENVMAP
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
#endif`,B_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,z_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,V_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,k_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,G_=`PhysicalMaterial material;
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
#endif`,H_=`uniform sampler2D dfgLUT;
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
}`,W_=`
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
#endif`,X_=`#if defined( RE_IndirectDiffuse )
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
#endif`,q_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,j_=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Y_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Z_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,J_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,K_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Q_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ev=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tv=`#if defined( USE_POINTS_UV )
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
#endif`,nv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,iv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,av=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ov=`#ifdef USE_MORPHTARGETS
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
#endif`,lv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,hv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,uv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,fv=`#ifdef USE_NORMALMAP
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
#endif`,mv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_v=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Sv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ev=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Av=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Iv=`float getShadowMask() {
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
}`,Pv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lv=`#ifdef USE_SKINNING
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
#endif`,Nv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dv=`#ifdef USE_SKINNING
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
#endif`,Uv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ov=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zv=`#ifdef USE_TRANSMISSION
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
#endif`,Vv=`#ifdef USE_TRANSMISSION
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
#endif`,kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Xv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qv=`uniform sampler2D t2D;
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
}`,jv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,$v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jv=`#include <common>
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
}`,Kv=`#if DEPTH_PACKING == 3200
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
}`,Qv=`#define DISTANCE
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
}`,ex=`#define DISTANCE
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
}`,tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ix=`uniform float scale;
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
}`,rx=`uniform vec3 diffuse;
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
}`,sx=`#include <common>
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
}`,ax=`uniform vec3 diffuse;
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
}`,ox=`#define LAMBERT
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
}`,lx=`#define LAMBERT
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
}`,cx=`#define MATCAP
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
}`,hx=`#define MATCAP
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
}`,ux=`#define NORMAL
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
}`,dx=`#define NORMAL
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
}`,px=`#define PHONG
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
}`,fx=`#define PHONG
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
}`,mx=`#define STANDARD
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
}`,gx=`#define STANDARD
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
}`,_x=`#define TOON
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
}`,vx=`#define TOON
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
}`,xx=`uniform float size;
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
}`,yx=`uniform vec3 diffuse;
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
}`,Sx=`#include <common>
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
}`,Mx=`uniform vec3 color;
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
}`,bx=`uniform float rotation;
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
}`,Tx=`uniform vec3 diffuse;
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
}`,mt={alphahash_fragment:X0,alphahash_pars_fragment:q0,alphamap_fragment:j0,alphamap_pars_fragment:Y0,alphatest_fragment:$0,alphatest_pars_fragment:Z0,aomap_fragment:J0,aomap_pars_fragment:K0,batching_pars_vertex:Q0,batching_vertex:e_,begin_vertex:t_,beginnormal_vertex:n_,bsdfs:i_,iridescence_fragment:r_,bumpmap_pars_fragment:s_,clipping_planes_fragment:a_,clipping_planes_pars_fragment:o_,clipping_planes_pars_vertex:l_,clipping_planes_vertex:c_,color_fragment:h_,color_pars_fragment:u_,color_pars_vertex:d_,color_vertex:p_,common:f_,cube_uv_reflection_fragment:m_,defaultnormal_vertex:g_,displacementmap_pars_vertex:__,displacementmap_vertex:v_,emissivemap_fragment:x_,emissivemap_pars_fragment:y_,colorspace_fragment:S_,colorspace_pars_fragment:M_,envmap_fragment:b_,envmap_common_pars_fragment:T_,envmap_pars_fragment:E_,envmap_pars_vertex:w_,envmap_physical_pars_fragment:F_,envmap_vertex:A_,fog_vertex:R_,fog_pars_vertex:C_,fog_fragment:I_,fog_pars_fragment:P_,gradientmap_pars_fragment:L_,lightmap_pars_fragment:N_,lights_lambert_fragment:D_,lights_lambert_pars_fragment:U_,lights_pars_begin:O_,lights_toon_fragment:B_,lights_toon_pars_fragment:z_,lights_phong_fragment:V_,lights_phong_pars_fragment:k_,lights_physical_fragment:G_,lights_physical_pars_fragment:H_,lights_fragment_begin:W_,lights_fragment_maps:X_,lights_fragment_end:q_,lightprobes_pars_fragment:j_,logdepthbuf_fragment:Y_,logdepthbuf_pars_fragment:$_,logdepthbuf_pars_vertex:Z_,logdepthbuf_vertex:J_,map_fragment:K_,map_pars_fragment:Q_,map_particle_fragment:ev,map_particle_pars_fragment:tv,metalnessmap_fragment:nv,metalnessmap_pars_fragment:iv,morphinstance_vertex:rv,morphcolor_vertex:sv,morphnormal_vertex:av,morphtarget_pars_vertex:ov,morphtarget_vertex:lv,normal_fragment_begin:cv,normal_fragment_maps:hv,normal_pars_fragment:uv,normal_pars_vertex:dv,normal_vertex:pv,normalmap_pars_fragment:fv,clearcoat_normal_fragment_begin:mv,clearcoat_normal_fragment_maps:gv,clearcoat_pars_fragment:_v,iridescence_pars_fragment:vv,opaque_fragment:xv,packing:yv,premultiplied_alpha_fragment:Sv,project_vertex:Mv,dithering_fragment:bv,dithering_pars_fragment:Tv,roughnessmap_fragment:Ev,roughnessmap_pars_fragment:wv,shadowmap_pars_fragment:Av,shadowmap_pars_vertex:Rv,shadowmap_vertex:Cv,shadowmask_pars_fragment:Iv,skinbase_vertex:Pv,skinning_pars_vertex:Lv,skinning_vertex:Nv,skinnormal_vertex:Dv,specularmap_fragment:Uv,specularmap_pars_fragment:Ov,tonemapping_fragment:Fv,tonemapping_pars_fragment:Bv,transmission_fragment:zv,transmission_pars_fragment:Vv,uv_pars_fragment:kv,uv_pars_vertex:Gv,uv_vertex:Hv,worldpos_vertex:Wv,background_vert:Xv,background_frag:qv,backgroundCube_vert:jv,backgroundCube_frag:Yv,cube_vert:$v,cube_frag:Zv,depth_vert:Jv,depth_frag:Kv,distance_vert:Qv,distance_frag:ex,equirect_vert:tx,equirect_frag:nx,linedashed_vert:ix,linedashed_frag:rx,meshbasic_vert:sx,meshbasic_frag:ax,meshlambert_vert:ox,meshlambert_frag:lx,meshmatcap_vert:cx,meshmatcap_frag:hx,meshnormal_vert:ux,meshnormal_frag:dx,meshphong_vert:px,meshphong_frag:fx,meshphysical_vert:mx,meshphysical_frag:gx,meshtoon_vert:_x,meshtoon_frag:vx,points_vert:xx,points_frag:yx,shadow_vert:Sx,shadow_frag:Mx,sprite_vert:bx,sprite_frag:Tx},Ee={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Qi={basic:{uniforms:Kn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:Kn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new ht(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:Kn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:Kn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:Kn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new ht(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:Kn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:Kn([Ee.points,Ee.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:Kn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:Kn([Ee.common,Ee.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:Kn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:Kn([Ee.sprite,Ee.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:Kn([Ee.common,Ee.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:Kn([Ee.lights,Ee.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};Qi.physical={uniforms:Kn([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};var Kl={r:0,b:0,g:0},Ex=new pt,$f=new st;function wx(i,e,t,n,r,s){let a=new ht(0),o,l,c=r===!0?0:1,h=null,p=0,d=null;function u(f){let v=f.isScene===!0?f.background:null;if(v&&v.isTexture){let g=f.backgroundBlurriness>0;v=e.get(v,g)}return v}function m(f,v){f.getRGB(Kl,xu(i)),t.buffers.color.setClear(Kl.r,Kl.g,Kl.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(f,v=1){a.set(f),c=v,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(f){c=f,m(a,c)},render:function(f){let v=!1,g=u(f);g===null?m(a,c):g&&g.isColor&&(m(g,1),v=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,s):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,v){let g=u(v);g&&(g.isCubeTexture||g.mapping===Wa)?(l===void 0&&(l=new $n(new Qr(1,1,1),new En({name:"BackgroundCubeMaterial",uniforms:os(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,M,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=g,l.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ex.makeRotationFromEuler(v.backgroundRotation)).transpose(),g.isCubeTexture&&g.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply($f),l.material.toneMapped=Ct.getTransfer(g.colorSpace)!==tn,h===g&&p===g.version&&d===i.toneMapping||(l.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null)):g&&g.isTexture&&(o===void 0&&(o=new $n(new ks(2,2),new En({name:"BackgroundMaterial",uniforms:os(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:Xs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=g,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=Ct.getTransfer(g.colorSpace)!==tn,g.matrixAutoUpdate===!0&&g.updateMatrix(),o.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&p===g.version&&d===i.toneMapping||(o.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),o.layers.enableAll(),f.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function Ax(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function l(g){return i.deleteVertexArray(g)}function c(g){let _=[],M=[],T=[];for(let S=0;S<t;S++)_[S]=0,M[S]=0,T[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:M,attributeDivisors:T,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,M=g.length;_<M;_++)g[_]=0}function p(g){d(g,0)}function d(g,_){let M=s.newAttributes,T=s.enabledAttributes,S=s.attributeDivisors;M[g]=1,T[g]===0&&(i.enableVertexAttribArray(g),T[g]=1),S[g]!==_&&(i.vertexAttribDivisor(g,_),S[g]=_)}function u(){let g=s.newAttributes,_=s.enabledAttributes;for(let M=0,T=_.length;M<T;M++)_[M]!==g[M]&&(i.disableVertexAttribArray(M),_[M]=0)}function m(g,_,M,T,S,b,I){I===!0?i.vertexAttribIPointer(g,_,M,S,b):i.vertexAttribPointer(g,_,M,T,S,b)}function f(){v(),a=!0,s!==r&&(s=r,o(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,M,T,S){let b=!1,I=(function(F,k,U,j){let V=j.wireframe===!0,K=n[k.id];K===void 0&&(K={},n[k.id]=K);let se=F.isInstancedMesh===!0?F.id:0,re=K[se];re===void 0&&(re={},K[se]=re);let te=re[U.id];te===void 0&&(te={},re[U.id]=te);let N=te[V];return N===void 0&&(N=c(i.createVertexArray()),te[V]=N),N})(g,T,M,_);s!==I&&(s=I,o(s.object)),b=(function(F,k,U,j){let V=s.attributes,K=k.attributes,se=0,re=U.getAttributes();for(let te in re)if(re[te].location>=0){let N=V[te],Z=K[te];if(Z===void 0&&(te==="instanceMatrix"&&F.instanceMatrix&&(Z=F.instanceMatrix),te==="instanceColor"&&F.instanceColor&&(Z=F.instanceColor)),N===void 0||N.attribute!==Z||Z&&N.data!==Z.data)return!0;se++}return s.attributesNum!==se||s.index!==j})(g,T,M,S),b&&(function(F,k,U,j){let V={},K=k.attributes,se=0,re=U.getAttributes();for(let te in re)if(re[te].location>=0){let N=K[te];N===void 0&&(te==="instanceMatrix"&&F.instanceMatrix&&(N=F.instanceMatrix),te==="instanceColor"&&F.instanceColor&&(N=F.instanceColor));let Z={};Z.attribute=N,N&&N.data&&(Z.data=N.data),V[te]=Z,se++}s.attributes=V,s.attributesNum=se,s.index=j})(g,T,M,S),S!==null&&e.update(S,i.ELEMENT_ARRAY_BUFFER),(b||a)&&(a=!1,(function(F,k,U,j){h();let V=j.attributes,K=U.getAttributes(),se=k.defaultAttributeValues;for(let re in K){let te=K[re];if(te.location>=0){let N=V[re];if(N===void 0&&(re==="instanceMatrix"&&F.instanceMatrix&&(N=F.instanceMatrix),re==="instanceColor"&&F.instanceColor&&(N=F.instanceColor)),N!==void 0){let Z=N.normalized,ce=N.itemSize,Le=e.get(N);if(Le===void 0)continue;let ve=Le.buffer,Oe=Le.type,Se=Le.bytesPerElement,ue=Oe===i.INT||Oe===i.UNSIGNED_INT||N.gpuType===Ph;if(N.isInterleavedBufferAttribute){let X=N.data,ee=X.stride,le=N.offset;if(X.isInstancedInterleavedBuffer){for(let he=0;he<te.locationSize;he++)d(te.location+he,X.meshPerAttribute);F.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let he=0;he<te.locationSize;he++)p(te.location+he);i.bindBuffer(i.ARRAY_BUFFER,ve);for(let he=0;he<te.locationSize;he++)m(te.location+he,ce/te.locationSize,Oe,Z,ee*Se,(le+ce/te.locationSize*he)*Se,ue)}else{if(N.isInstancedBufferAttribute){for(let X=0;X<te.locationSize;X++)d(te.location+X,N.meshPerAttribute);F.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let X=0;X<te.locationSize;X++)p(te.location+X);i.bindBuffer(i.ARRAY_BUFFER,ve);for(let X=0;X<te.locationSize;X++)m(te.location+X,ce/te.locationSize,Oe,Z,ce*Se,ce/te.locationSize*X*Se,ue)}}else if(se!==void 0){let Z=se[re];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(te.location,Z);break;case 3:i.vertexAttrib3fv(te.location,Z);break;case 4:i.vertexAttrib4fv(te.location,Z);break;default:i.vertexAttrib1fv(te.location,Z)}}}}u()})(g,_,M,T),S!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(S).buffer))},reset:f,resetDefaultState:v,dispose:function(){f();for(let g in n){let _=n[g];for(let M in _){let T=_[M];for(let S in T){let b=T[S];for(let I in b)l(b[I].object),delete b[I];delete T[S]}}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let M in _){let T=_[M];for(let S in T){let b=T[S];for(let I in b)l(b[I].object),delete b[I];delete T[S]}}delete n[g.id]},releaseStatesOfObject:function(g){for(let _ in n){let M=n[_],T=g.isInstancedMesh===!0?g.id:0,S=M[T];if(S!==void 0){for(let b in S){let I=S[b];for(let F in I)l(I[F].object),delete I[F];delete S[b]}delete M[T],Object.keys(M).length===0&&delete n[_]}}},releaseStatesOfProgram:function(g){for(let _ in n){let M=n[_];for(let T in M){let S=M[T];if(S[g.id]===void 0)continue;let b=S[g.id];for(let I in b)l(b[I].object),delete b[I];delete S[g.id]}}},initAttributes:h,enableAttribute:p,disableUnusedAttributes:u}}function Rx(i,e,t){let n;this.setMode=function(r){n=r},this.render=function(r,s){i.drawArrays(n,r,s),t.update(s,n,1)},this.renderInstances=function(r,s,a){a!==0&&(i.drawArraysInstanced(n,r,s,a),t.update(s,n,a))},this.renderMultiDraw=function(r,s,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,s,0,a);let o=0;for(let l=0;l<a;l++)o+=s[l];t.update(o,n,1)}}function Cx(i,e,t,n){let r;function s(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(Ye("WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&c===!1&&Ye("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let h=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(h){return h===Ji||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let p=h===Zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==Oi&&h!==Ti&&!p&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:i.getParameter(i.MAX_SAMPLES),samples:i.getParameter(i.SAMPLES)}}function Ix(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Pi,o=new st,l={value:null,needsUpdate:!1};function c(h,p,d,u){let m=h!==null?h.length:0,f=null;if(m!==0){if(f=l.value,u!==!0||f===null){let v=d+4*m,g=p.matrixWorldInverse;o.getNormalMatrix(g),(f===null||f.length<v)&&(f=new Float32Array(v));for(let _=0,M=d;_!==m;++_,M+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(f,M),f[M+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let d=h.length!==0||p||n!==0||r;return r=p,n=h.length,d},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=c(h,p,0)},this.setState=function(h,p,d){let u=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,v=i.get(h);if(!r||u===null||u.length===0||s&&!f)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,M=v.clippingState||null;l.value=M,M=c(u,p,_,d);for(let T=0;T!==_;++T)M[T]=t[T];v.clippingState=M,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}$f.set(-1,0,0,0,1,0,0,0,1);var Ya=new ka,Af=new ht,Au=null,Ru=0,Cu=0,Iu=!1,Px=new P,ls=new P,ec=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=Px}=s;Au=this._renderer.getRenderTarget(),Ru=this._renderer.getActiveCubeFace(),Cu=this._renderer.getActiveMipmapLevel(),Iu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=If(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Au,Ru,Cu),this._renderer.xr.enabled=Iu,e.scissorTest=!1,$s(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===js||e.mapping===ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Au=this._renderer.getRenderTarget(),Ru=this._renderer.getActiveCubeFace(),Cu=this._renderer.getActiveMipmapLevel(),Iu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jn,minFilter:Jn,generateMipmaps:!1,type:Zi,format:Ji,colorSpace:Yl,depthBuffer:!1},r=Rf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rf(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Lx(s)),this._blurMaterial=Dx(s,e,t),this._ggxMaterial=Nx(s,e,t)}return r}_compileMaterial(e){let t=new $n(new bt,e);this._renderer.compile(t,Ya)}_sceneToCubeUV(e,t,n,r,s){let a=new Yn(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,p=c.toneMapping;c.getClearColor(Af),c.toneMapping=Di,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $n(new Qr,new Ea({name:"PMREM.Background",side:Zn,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,m=!1,f=e.background;f?f.isColor&&(u.color.copy(f),e.background=null,m=!0):(u.color.copy(Af),m=!0);for(let v=0;v<6;v++){let g=v%3;g===0?(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[v],s.y,s.z)):g===1?(a.up.set(0,0,o[v]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[v],s.z)):(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[v]));let _=this._cubeSize;$s(r,g*_,v>2?_:0,_,_),c.setRenderTarget(r),m&&c.render(d,a),c.render(e,a)}c.toneMapping=p,c.autoClear=h,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===js||e.mapping===ts;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=If()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cf());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s,s.uniforms.envMap.value=e;let o=this._cubeSize;$s(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Ya)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(c*c-h*h)*(1.25*c),{_lodMax:d}=this,u=this._sizeLods[n],m=3*u*(n>d-4?n-d+4:0),f=4*(this._cubeSize-u);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=d-t,$s(s,m,f,3*u,2*u),r.setRenderTarget(s),r.render(o,Ya),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=d-n,$s(e,m,f,3*u,2*u),r.setRenderTarget(e),r.render(o,Ya)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[r];$s(t,3*h*(r>this._lodMax-4?r-this._lodMax+4:0),4*(this._cubeSize-h),3*h,2*h),a.setRenderTarget(t),a.render(l,Ya)}};function Lx(i){let e=[],t=[],n=i,r=i-4+1+6;for(let s=0;s<r;s++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,d=6,u=3,m=new Float32Array(u*d*p),f=new Float32Array(u*d*p);for(let g=0;g<p;g++){let _=g%3*2/3-1,M=g>2?0:-1,T=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];m.set(T,u*d*g);for(let S=0;S<d;S++){let b=2*h[2*S]-1,I=2*h[2*S+1]-1;g===0?ls.set(1,I,b):g===1?ls.set(-b,1,-I):g===2?ls.set(-b,I,1):g===3?ls.set(-1,I,-b):g===4?ls.set(-b,-1,I):ls.set(b,I,-1),ls.toArray(f,(g*d+S)*u)}}let v=new bt;v.setAttribute("position",new Pt(m,u)),v.setAttribute("outputDirection",new Pt(f,u)),t.push(new $n(v,null)),n>4&&n--}return{lodMeshes:t,sizeLods:e}}function Rf(i,e,t){let n=new ci(i,e,t);return n.texture.mapping=Wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $s(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Nx(i,e,t){return new En({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ic(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Dx(i,e,t){return new En({name:"SphericalGaussianBlur",defines:{SAMPLES:20,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ic(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Cf(){return new En({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ic(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function If(){return new En({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ic(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function ic(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var tc=class extends ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new wa(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Qr(5,5,5),s=new En({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Zn,blending:$i});s.uniforms.tEquirect.value=t;let a=new $n(r,s),o=t.minFilter;return t.minFilter===ns&&(t.minFilter=Jn),new Nl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function Ux(i){let e=new WeakMap,t=new WeakMap,n=null;function r(o,l){return l===Fl?o.mapping=js:l===Bl&&(o.mapping=ts),o}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(o){let l=o.target;l.removeEventListener("dispose",a);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}return{get:function(o,l=!1){return o==null?null:l?(function(c){if(c&&c.isTexture){let h=c.mapping,p=h===Fl||h===Bl,d=h===js||h===ts;if(p||d){let u=t.get(c),m=u!==void 0?u.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==m)return n===null&&(n=new ec(i)),u=p?n.fromEquirectangular(c,u):n.fromCubemap(c,u),u.texture.pmremVersion=c.pmremVersion,t.set(c,u),u.texture;if(u!==void 0)return u.texture;{let f=c.image;return p&&f&&f.height>0||d&&f&&(function(v){let g=0,_=6;for(let M=0;M<_;M++)v[M]!==void 0&&g++;return g===_})(f)?(n===null&&(n=new ec(i)),u=p?n.fromEquirectangular(c):n.fromCubemap(c),u.texture.pmremVersion=c.pmremVersion,t.set(c,u),c.addEventListener("dispose",a),u.texture):null}}}return c})(o):(function(c){if(c&&c.isTexture){let h=c.mapping;if(h===Fl||h===Bl){if(e.has(c))return r(e.get(c).texture,c.mapping);{let p=c.image;if(p&&p.height>0){let d=new tc(p.height);return d.fromEquirectangularTexture(i,c),e.set(c,d),c.addEventListener("dispose",s),r(d.texture,c.mapping)}return null}}}return c})(o)},dispose:function(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function Ox(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Yr("WebGLRenderer: "+n+" extension not supported."),r}}}function Fx(i,e,t,n){let r={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let p in c.attributes)e.remove(c.attributes[p]);c.removeEventListener("dispose",a),delete r[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,p=l.attributes.position,d=0;if(p===void 0)return;if(h!==null){let f=h.array;d=h.version;for(let v=0,g=f.length;v<g;v+=3){let _=f[v+0],M=f[v+1],T=f[v+2];c.push(_,M,M,T,T,_)}}else{let f=p.array;d=p.version;for(let v=0,g=f.length/3-1;v<g;v+=3){let _=v+0,M=v+1,T=v+2;c.push(_,M,M,T,T,_)}}let u=new(p.count>=65535?Ma:Sa)(c,1);u.version=d;let m=s.get(l);m&&e.remove(m),s.set(l,u)}return{get:function(l,c){return r[c.id]===!0||(c.addEventListener("dispose",a),r[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function Bx(i,e,t){let n,r,s;this.setMode=function(a){n=a},this.setIndex=function(a){r=a.type,s=a.bytesPerElement},this.render=function(a,o){i.drawElements(n,o,r,a*s),t.update(o,n,1)},this.renderInstances=function(a,o,l){l!==0&&(i.drawElementsInstanced(n,o,r,a*s,l),t.update(o,n,l))},this.renderMultiDraw=function(a,o,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,o,0,r,a,0,l);let c=0;for(let h=0;h<l;h++)c+=o[h];t.update(c,n,1)}}function zx(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:Qe("WebGLInfo: Unknown draw mode:",n)}}}}function Vx(i,e,t){let n=new WeakMap,r=new en;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,p=n.get(a);if(p===void 0||p.count!==h){p!==void 0&&p.texture.dispose();let d=a.morphAttributes.position!==void 0,u=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),u===!0&&(_=2),m===!0&&(_=3);let M=a.attributes.position.count*_,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let S=new Float32Array(M*T*4*h),b=new va(S,M,T,h);b.type=Ti,b.needsUpdate=!0;let I=4*_;for(let F=0;F<h;F++){let k=f[F],U=v[F],j=g[F],V=M*T*4*F;for(let K=0;K<k.count;K++){let se=K*I;d===!0&&(r.fromBufferAttribute(k,K),S[V+se+0]=r.x,S[V+se+1]=r.y,S[V+se+2]=r.z,S[V+se+3]=0),u===!0&&(r.fromBufferAttribute(U,K),S[V+se+4]=r.x,S[V+se+5]=r.y,S[V+se+6]=r.z,S[V+se+7]=0),m===!0&&(r.fromBufferAttribute(j,K),S[V+se+8]=r.x,S[V+se+9]=r.y,S[V+se+10]=r.z,S[V+se+11]=j.itemSize===4?r.w:1)}}p={count:h,texture:b,size:new me(M,T)},n.set(a,p),a.addEventListener("dispose",function F(){b.dispose(),n.delete(a),a.removeEventListener("dispose",F)})}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let d=0;for(let m=0;m<l.length;m++)d+=l[m];let u=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",u),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}}}function kx(i,e,t,n,r){let s=new WeakMap;function a(o){let l=o.target;l.removeEventListener("dispose",a),n.releaseStatesOfObject(l),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:function(o){let l=r.render.frame,c=o.geometry,h=e.get(o,c);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==l&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,l))),o.isSkinnedMesh){let p=o.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return h},dispose:function(){s=new WeakMap}}}var Gx={[Th]:"LINEAR_TONE_MAPPING",[Eh]:"REINHARD_TONE_MAPPING",[wh]:"CINEON_TONE_MAPPING",[Ah]:"ACES_FILMIC_TONE_MAPPING",[Ch]:"AGX_TONE_MAPPING",[Ih]:"NEUTRAL_TONE_MAPPING",[Rh]:"CUSTOM_TONE_MAPPING"};function Hx(i,e,t,n,r,s){let a=new ci(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new bt;c.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new je([0,2,0,0,2,0],2));let h=new yl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new $n(c,h),d=new ka(-1,1,1,-1,0,1),u,m=null,f=null,v=!1,g=null,_=[],M=!1;this.setSize=function(T,S){a.setSize(T,S),o!==null&&o.setSize(T,S),l!==null&&l.setSize(T,S);for(let b=0;b<_.length;b++){let I=_[b];I.setSize&&I.setSize(T,S)}},this.setEffects=function(T){_=T,M=_.length>0&&_[0].isRenderPass===!0;let S=a.width,b=a.height;_.length>0&&o===null&&(o=new ci(S,b,{type:Zi,depthBuffer:!1,stencilBuffer:!1}),l=new ci(S,b,{type:Zi,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<_.length;I++){let F=_[I];F.setSize&&F.setSize(S,b)}},this.begin=function(T,S){if(v||T.toneMapping===Di&&_.length===0)return!1;if(g=S,S!==null){let b=S.width,I=S.height;a.width===b&&a.height===I||this.setSize(b,I)}return M===!1&&T.setRenderTarget(a),u=T.toneMapping,T.toneMapping=Di,!0},this.hasRenderPass=function(){return M},this.end=function(T,S){T.toneMapping=u,v=!0;let b=a,I=o;for(let F=0;F<_.length;F++){let k=_[F];k.enabled!==!1&&(k.render(T,I,b,S),k.needsSwap!==!1&&(b=I,I=I===o?l:o))}if(m!==T.outputColorSpace||f!==T.toneMapping){m=T.outputColorSpace,f=T.toneMapping,h.defines={},Ct.getTransfer(m)===tn&&(h.defines.SRGB_TRANSFER="");let F=Gx[f];F&&(h.defines[F]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,T.setRenderTarget(g),T.render(p,d),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Zf=new ni,Nu=new Dr(1,1),Jf=new va,Kf=new Xo,Qf=new wa,Pf=[],Lf=[],Nf=new Float32Array(16),Df=new Float32Array(9),Uf=new Float32Array(4);function Js(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=Pf[r];if(s===void 0&&(s=new Float32Array(r),Pf[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Pn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ln(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function rc(i,e){let t=Lf[e];t===void 0&&(t=new Int32Array(e),Lf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Wx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Xx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2fv(this.addr,e),Ln(t,e)}}function qx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pn(t,e))return;i.uniform3fv(this.addr,e),Ln(t,e)}}function jx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4fv(this.addr,e),Ln(t,e)}}function Yx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ln(t,e)}else{if(Pn(t,n))return;Uf.set(n),i.uniformMatrix2fv(this.addr,!1,Uf),Ln(t,n)}}function $x(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ln(t,e)}else{if(Pn(t,n))return;Df.set(n),i.uniformMatrix3fv(this.addr,!1,Df),Ln(t,n)}}function Zx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ln(t,e)}else{if(Pn(t,n))return;Nf.set(n),i.uniformMatrix4fv(this.addr,!1,Nf),Ln(t,n)}}function Jx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Kx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2iv(this.addr,e),Ln(t,e)}}function Qx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;i.uniform3iv(this.addr,e),Ln(t,e)}}function ey(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4iv(this.addr,e),Ln(t,e)}}function ty(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ny(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2uiv(this.addr,e),Ln(t,e)}}function iy(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;i.uniform3uiv(this.addr,e),Ln(t,e)}}function ry(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4uiv(this.addr,e),Ln(t,e)}}function sy(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(Nu.compareFunction=t.isReversedDepthBuffer()?Zl:$l,s=Nu):s=Zf,t.setTexture2D(e||s,r)}function ay(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Kf,r)}function oy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Qf,r)}function ly(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Jf,r)}function cy(i){switch(i){case 5126:return Wx;case 35664:return Xx;case 35665:return qx;case 35666:return jx;case 35674:return Yx;case 35675:return $x;case 35676:return Zx;case 5124:case 35670:return Jx;case 35667:case 35671:return Kx;case 35668:case 35672:return Qx;case 35669:case 35673:return ey;case 5125:return ty;case 36294:return ny;case 36295:return iy;case 36296:return ry;case 35678:case 36198:case 36298:case 36306:case 35682:return sy;case 35679:case 36299:case 36307:return ay;case 35680:case 36300:case 36308:case 36293:return oy;case 36289:case 36303:case 36311:case 36292:return ly}}function hy(i,e){i.uniform1fv(this.addr,e)}function uy(i,e){let t=Js(e,this.size,2);i.uniform2fv(this.addr,t)}function dy(i,e){let t=Js(e,this.size,3);i.uniform3fv(this.addr,t)}function py(i,e){let t=Js(e,this.size,4);i.uniform4fv(this.addr,t)}function fy(i,e){let t=Js(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function my(i,e){let t=Js(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function gy(i,e){let t=Js(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function _y(i,e){i.uniform1iv(this.addr,e)}function vy(i,e){i.uniform2iv(this.addr,e)}function xy(i,e){i.uniform3iv(this.addr,e)}function yy(i,e){i.uniform4iv(this.addr,e)}function Sy(i,e){i.uniform1uiv(this.addr,e)}function My(i,e){i.uniform2uiv(this.addr,e)}function by(i,e){i.uniform3uiv(this.addr,e)}function Ty(i,e){i.uniform4uiv(this.addr,e)}function Ey(i,e,t){let n=this.cache,r=e.length,s=rc(t,r),a;Pn(n,s)||(i.uniform1iv(this.addr,s),Ln(n,s)),a=this.type===i.SAMPLER_2D_SHADOW?Nu:Zf;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function wy(i,e,t){let n=this.cache,r=e.length,s=rc(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),Ln(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Kf,s[a])}function Ay(i,e,t){let n=this.cache,r=e.length,s=rc(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),Ln(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Qf,s[a])}function Ry(i,e,t){let n=this.cache,r=e.length,s=rc(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),Ln(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Jf,s[a])}function Cy(i){switch(i){case 5126:return hy;case 35664:return uy;case 35665:return dy;case 35666:return py;case 35674:return fy;case 35675:return my;case 35676:return gy;case 5124:case 35670:return _y;case 35667:case 35671:return vy;case 35668:case 35672:return xy;case 35669:case 35673:return yy;case 5125:return Sy;case 36294:return My;case 36295:return by;case 36296:return Ty;case 35678:case 36198:case 36298:case 36306:case 35682:return Ey;case 35679:case 36299:case 36307:return wy;case 35680:case 36300:case 36308:case 36293:return Ay;case 36289:case 36303:case 36311:case 36292:return Ry}}var Du=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=cy(t.type)}},Uu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cy(t.type)}},Ou=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},Pu=/(\w+)(\])?(\[|\.)?/g;function Of(i,e){i.seq.push(e),i.map[e.id]=e}function Iy(i,e,t){let n=i.name,r=n.length;for(Pu.lastIndex=0;;){let s=Pu.exec(n),a=Pu.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===r){Of(t,c===void 0?new Du(o,i,e):new Uu(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new Ou(o),Of(t,h)),t=h}}}var Zs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a);Iy(o,e.getUniformLocation(t,o.name),this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function Ff(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Py=0;function Ly(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Bf=new st;function Ny(i){Ct._getMatrix(Bf,Ct.workingColorSpace,i);let e=`mat3( ${Bf.elements.map(t=>t.toFixed(4))} )`;switch(Ct.getTransfer(i)){case mu:return[e,"LinearTransferOETF"];case tn:return[e,"sRGBTransferOETF"];default:return Ye("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function zf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Ly(i.getShaderSource(e),a)}return r}function Dy(i,e){let t=Ny(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Uy={[Th]:"Linear",[Eh]:"Reinhard",[wh]:"Cineon",[Ah]:"ACESFilmic",[Ch]:"AgX",[Ih]:"Neutral",[Rh]:"Custom"};function Oy(i,e){let t=Uy[e];return t===void 0?(Ye("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ql=new P;function Fy(){return Ct.getLuminanceCoefficients(Ql),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Ql.x.toFixed(4)}, ${Ql.y.toFixed(4)}, ${Ql.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function By(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Za).join(`
`)}function zy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Vy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Za(i){return i!==""}function Vf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ky=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fu(i){return i.replace(ky,Hy)}var Gy=new Map;function Hy(i,e){let t=mt[e];if(t===void 0){let n=Gy.get(e);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=mt[n],Ye('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Fu(t)}var Wy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gf(i){return i.replace(Wy,Xy)}function Xy(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Hf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var qy={[Ha]:"SHADOWMAP_TYPE_PCF",[Ws]:"SHADOWMAP_TYPE_VSM"};function jy(i){return qy[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Yy={[js]:"ENVMAP_TYPE_CUBE",[ts]:"ENVMAP_TYPE_CUBE",[Wa]:"ENVMAP_TYPE_CUBE_UV"};function $y(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Yy[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Zy={[ts]:"ENVMAP_MODE_REFRACTION"};function Jy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Zy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ky={[$p]:"ENVMAP_BLENDING_MULTIPLY",[Zp]:"ENVMAP_BLENDING_MIX",[Jp]:"ENVMAP_BLENDING_ADD"};function Qy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Ky[i.combine]||"ENVMAP_BLENDING_NONE"}function e1(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function t1(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=jy(t),c=$y(t),h=Jy(t),p=Qy(t),d=e1(t),u=By(t),m=zy(s),f=r.createProgram(),v,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Za).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Za).join(`
`),g.length>0&&(g+=`
`)):(v=[Hf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Za).join(`
`),g=[Hf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Di?"#define TONE_MAPPING":"",t.toneMapping!==Di?mt.tonemapping_pars_fragment:"",t.toneMapping!==Di?Oy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,Dy("linearToOutputTexel",t.outputColorSpace),Fy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Za).join(`
`)),a=Fu(a),a=Vf(a,t),a=kf(a,t),o=Fu(o),o=Vf(o,t),o=kf(o,t),a=Gf(a),o=Gf(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===gu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=_+v+a,T=_+g+o,S=Ff(r,r.VERTEX_SHADER,M),b=Ff(r,r.FRAGMENT_SHADER,T);function I(j){if(i.debug.checkShaderErrors){let V=r.getProgramInfoLog(f)||"",K=r.getShaderInfoLog(S)||"",se=r.getShaderInfoLog(b)||"",re=V.trim(),te=K.trim(),N=se.trim(),Z=!0,ce=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,f,S,b);else{let Le=zf(r,S,"vertex"),ve=zf(r,b,"fragment");Qe("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+j.name+`
Material Type: `+j.type+`

Program Info Log: `+re+`
`+Le+`
`+ve)}else re!==""?Ye("WebGLProgram: Program Info Log:",re):te!==""&&N!==""||(ce=!1);ce&&(j.diagnostics={runnable:Z,programLog:re,vertexShader:{log:te,prefix:v},fragmentShader:{log:N,prefix:g}})}r.deleteShader(S),r.deleteShader(b),F=new Zs(r,f),k=Vy(r,f)}let F,k;r.attachShader(f,S),r.attachShader(f,b),t.index0AttributeName!==void 0?r.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f),this.getUniforms=function(){return F===void 0&&I(this),F},this.getAttributes=function(){return k===void 0&&I(this),k};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=r.getProgramParameter(f,37297)),U},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Py++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=S,this.fragmentShader=b,this}var n1=0,Bu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new zu(e),t.set(e,n)),n}},zu=class{constructor(e){this.id=n1++,this.code=e,this.usedTimes=0}};function i1(i){return i===ss||i===ql||i===jl}function r1(i,e,t,n,r,s){let a=new xa,o=new Bu,l=new Set,c=[],h=new Map,p=n.logarithmicDepthBuffer,d=n.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return l.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,g,_,M,T){let S=_.fog,b=M.geometry,I=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?_.environment:null,F=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,k=e.get(f.envMap||I,F),U=k&&k.mapping===Wa?k.image.height:null,j=u[f.type];f.precision!==null&&(d=n.getMaxPrecision(f.precision),d!==f.precision&&Ye("WebGLProgram.getParameters:",f.precision,"not supported, using",d,"instead."));let V=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,K=V!==void 0?V.length:0,se,re,te,N,Z=0;if(b.morphAttributes.position!==void 0&&(Z=1),b.morphAttributes.normal!==void 0&&(Z=2),b.morphAttributes.color!==void 0&&(Z=3),j){let sn=Qi[j];se=sn.vertexShader,re=sn.fragmentShader}else{se=f.vertexShader,re=f.fragmentShader;let sn=o.getVertexShaderStage(f),hi=o.getFragmentShaderStage(f);o.update(f,sn,hi),te=sn.id,N=hi.id}let ce=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),ve=M.isInstancedMesh===!0,Oe=M.isBatchedMesh===!0,Se=!!f.map,ue=!!f.matcap,X=!!k,ee=!!f.aoMap,le=!!f.lightMap,he=!!f.bumpMap&&f.wireframe===!1,A=!!f.normalMap,E=!!f.displacementMap,C=!!f.emissiveMap,O=!!f.metalnessMap,y=!!f.roughnessMap,z=f.anisotropy>0,B=f.clearcoat>0,R=f.dispersion>0,q=f.retroreflectivity>0,Y=f.iridescence>0,J=f.sheen>0,de=f.transmission>0,ye=z&&!!f.anisotropyMap,Ie=B&&!!f.clearcoatMap,_e=B&&!!f.clearcoatNormalMap,Fe=B&&!!f.clearcoatRoughnessMap,oe=Y&&!!f.iridescenceMap,fe=Y&&!!f.iridescenceThicknessMap,ge=J&&!!f.sheenColorMap,we=J&&!!f.sheenRoughnessMap,Wt=!!f.specularMap,ft=!!f.specularColorMap,be=!!f.specularIntensityMap,at=de&&!!f.transmissionMap,Ne=de&&!!f.thicknessMap,St=!!f.gradientMap,$e=!!f.alphaMap,qt=f.alphaTest>0,Tt=!!f.alphaHash,Ft=!!f.extensions,jt=Di;f.toneMapped&&(ce!==null&&ce.isXRRenderTarget!==!0||(jt=i.toneMapping));let nn={shaderID:j,shaderType:f.type,shaderName:f.name,vertexShader:se,fragmentShader:re,defines:f.defines,customVertexShaderID:te,customFragmentShaderID:N,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:d,batching:Oe,batchingColor:Oe&&M._colorsTexture!==null,instancing:ve,instancingColor:ve&&M.instanceColor!==null,instancingMorph:ve&&M.morphTexture!==null,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Ct.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:Se,matcap:ue,envMap:X,envMapMode:X&&k.mapping,envMapCubeUVHeight:U,aoMap:ee,lightMap:le,bumpMap:he,normalMap:A,displacementMap:E,emissiveMap:C,normalMapObjectSpace:A&&f.normalMapType===of,normalMapTangentSpace:A&&f.normalMapType===pu,packedNormalMap:A&&f.normalMapType===pu&&i1(f.normalMap.format),metalnessMap:O,roughnessMap:y,anisotropy:z,anisotropyMap:ye,clearcoat:B,clearcoatMap:Ie,clearcoatNormalMap:_e,clearcoatRoughnessMap:Fe,dispersion:R,retroreflection:q,iridescence:Y,iridescenceMap:oe,iridescenceThicknessMap:fe,sheen:J,sheenColorMap:ge,sheenRoughnessMap:we,specularMap:Wt,specularColorMap:ft,specularIntensityMap:be,transmission:de,transmissionMap:at,thicknessMap:Ne,gradientMap:St,opaque:f.transparent===!1&&f.blending===bi&&f.alphaToCoverage===!1,alphaMap:$e,alphaTest:qt,alphaHash:Tt,combine:f.combine,mapUv:Se&&m(f.map.channel),aoMapUv:ee&&m(f.aoMap.channel),lightMapUv:le&&m(f.lightMap.channel),bumpMapUv:he&&m(f.bumpMap.channel),normalMapUv:A&&m(f.normalMap.channel),displacementMapUv:E&&m(f.displacementMap.channel),emissiveMapUv:C&&m(f.emissiveMap.channel),metalnessMapUv:O&&m(f.metalnessMap.channel),roughnessMapUv:y&&m(f.roughnessMap.channel),anisotropyMapUv:ye&&m(f.anisotropyMap.channel),clearcoatMapUv:Ie&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:_e&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:we&&m(f.sheenRoughnessMap.channel),specularMapUv:Wt&&m(f.specularMap.channel),specularColorMapUv:ft&&m(f.specularColorMap.channel),specularIntensityMapUv:be&&m(f.specularIntensityMap.channel),transmissionMapUv:at&&m(f.transmissionMap.channel),thicknessMapUv:Ne&&m(f.thicknessMap.channel),alphaMapUv:$e&&m(f.alphaMap.channel),vertexTangents:!!b.attributes.tangent&&(A||z),vertexNormals:!!b.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,pointsUvs:M.isPoints===!0&&!!b.attributes.uv&&(Se||$e),fog:!!S,useFog:f.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||b.attributes.normal===void 0&&A===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Le,skinning:M.isSkinnedMesh===!0,hasPositionAttribute:b.attributes.position!==void 0,morphTargets:b.morphAttributes.position!==void 0,morphNormals:b.morphAttributes.normal!==void 0,morphColors:b.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:Z,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:T.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&g.length>0,shadowMapType:i.shadowMap.type,toneMapping:jt,decodeVideoTexture:Se&&f.map.isVideoTexture===!0&&Ct.getTransfer(f.map.colorSpace)===tn,decodeVideoTextureEmissive:C&&f.emissiveMap.isVideoTexture===!0&&Ct.getTransfer(f.emissiveMap.colorSpace)===tn,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Yi,flipSided:f.side===Zn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Ft&&f.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&f.extensions.multiDraw===!0||Oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return nn.vertexUv1s=l.has(1),nn.vertexUv2s=l.has(2),nn.vertexUv3s=l.has(3),l.clear(),nn},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let g in f.defines)v.push(g),v.push(f.defines[g]);return f.isRawShaderMaterial===!1&&((function(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numSunLights),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numSunLightShadows),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)})(v,f),(function(g,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.retroreflection&&a.enable(24),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),g.push(a.mask)})(v,f),v.push(i.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=u[f.type],g;if(v){let _=Qi[v];g=Tf.clone(_.uniforms)}else g=f.uniforms;return g},acquireProgram:function(f,v){let g=h.get(v);return g!==void 0?++g.usedTimes:(g=new t1(i,v,f,r),c.push(g),h.set(v,g)),g},releaseProgram:function(f){if(--f.usedTimes===0){let v=c.indexOf(f);c[v]=c[c.length-1],c.pop(),h.delete(f.cacheKey),f.destroy()}},releaseShaderCache:function(f){o.remove(f)},programs:c,dispose:function(){o.dispose()}}}function s1(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function a1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Wf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Xf(){let i=[],e=0,t=[],n=[],r=[];function s(o){let l=0;return o.isInstancedMesh&&(l+=2),o.isSkinnedMesh&&(l+=1),l}function a(o,l,c,h,p,d){let u=i[e];return u===void 0?(u={id:o.id,object:o,geometry:l,material:c,materialVariant:s(o),groupOrder:h,renderOrder:o.renderOrder,z:p,group:d},i[e]=u):(u.id=o.id,u.object=o,u.geometry=l,u.material=c,u.materialVariant=s(o),u.groupOrder=h,u.renderOrder=o.renderOrder,u.z=p,u.group=d),e++,u}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,l,c,h,p,d,u){u.reversedDepth===!0&&(p=-p);let m=a(o,l,c,h,p,d);c.transmission>0?n.push(m):c.transparent===!0?r.push(m):t.push(m)},unshift:function(o,l,c,h,p,d){let u=a(o,l,c,h,p,d);c.transmission>0?n.unshift(u):c.transparent===!0?r.unshift(u):t.unshift(u)},finish:function(){for(let o=e,l=i.length;o<l;o++){let c=i[o];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(o,l){t.length>1&&t.sort(o||a1),n.length>1&&n.sort(l||Wf),r.length>1&&r.sort(l||Wf)}}}function o1(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new Xf,i.set(e,[r])):t>=n.length?(r=new Xf,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function l1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new ht};break;case"SpotLight":t={position:new P,direction:new P,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new P,halfWidth:new P,halfHeight:new P}}return i[e.id]=t,t}}}function c1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3}}return i[e.id]=t,t}}}var h1=0;function u1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function d1(i){let e=new l1,t=c1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new P);let r=new P,s=new pt,a=new pt;return{setup:function(o){let l=0,c=0,h=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let p=0,d=0,u=0,m=0,f=0,v=0,g=0,_=0,M=0,T=0,S=0,b=0,I=0,F=0;o.sort(u1);for(let U=0,j=o.length;U<j;U++){let V=o[U],K=V.color,se=V.intensity,re=V.distance,te=null;if(V.shadow&&V.shadow.map&&(te=V.shadow.map.texture.format===ss?V.shadow.map.texture:V.shadow.map.depthTexture||V.shadow.map.texture),V.isAmbientLight)l+=K.r*se,c+=K.g*se,h+=K.b*se;else if(V.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(V.sh.coefficients[N],se);F++}else if(V.isSunLight){let N=e.get(V);if(N.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){let Z=V.shadow,ce=t.get(V);ce.shadowIntensity=Z.intensity,ce.shadowBias=Z.bias,ce.shadowNormalBias=Z.normalBias,ce.shadowRadius=Z.radius,ce.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),n.sunShadow[d]=ce,n.sunShadowMap[d]=te;let Le=Z.getViewportCount();for(let ve=0;ve<Le;ve++)n.sunShadowMatrix[u+ve]=Z.getMatrix(ve),n.sunShadowCascade[u+ve]=Z._cascadeData[ve];u+=Le,d++}n.sun[p]=N,p++}else if(V.isDirectionalLight){let N=e.get(V);if(N.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){let Z=V.shadow,ce=t.get(V);ce.shadowIntensity=Z.intensity,ce.shadowBias=Z.bias,ce.shadowNormalBias=Z.normalBias,ce.shadowRadius=Z.radius,ce.shadowMapSize=Z.mapSize,n.directionalShadow[m]=ce,n.directionalShadowMap[m]=te,n.directionalShadowMatrix[m]=V.shadow.matrix,M++}n.directional[m]=N,m++}else if(V.isSpotLight){let N=e.get(V);N.position.setFromMatrixPosition(V.matrixWorld),N.color.copy(K).multiplyScalar(se),N.distance=re,N.coneCos=Math.cos(V.angle),N.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),N.decay=V.decay,n.spot[v]=N;let Z=V.shadow;if(V.map&&(n.spotLightMap[b]=V.map,b++,Z.updateMatrices(V),V.castShadow&&I++),n.spotLightMatrix[v]=Z.matrix,V.castShadow){let ce=t.get(V);ce.shadowIntensity=Z.intensity,ce.shadowBias=Z.bias,ce.shadowNormalBias=Z.normalBias,ce.shadowRadius=Z.radius,ce.shadowMapSize=Z.mapSize,n.spotShadow[v]=ce,n.spotShadowMap[v]=te,S++}v++}else if(V.isRectAreaLight){let N=e.get(V);N.color.copy(K).multiplyScalar(se),N.halfWidth.set(.5*V.width,0,0),N.halfHeight.set(0,.5*V.height,0),n.rectArea[g]=N,g++}else if(V.isPointLight){let N=e.get(V);if(N.color.copy(V.color).multiplyScalar(V.intensity),N.distance=V.distance,N.decay=V.decay,V.castShadow){let Z=V.shadow,ce=t.get(V);ce.shadowIntensity=Z.intensity,ce.shadowBias=Z.bias,ce.shadowNormalBias=Z.normalBias,ce.shadowRadius=Z.radius,ce.shadowMapSize=Z.mapSize,ce.shadowCameraNear=Z.camera.near,ce.shadowCameraFar=Z.camera.far,n.pointShadow[f]=ce,n.pointShadowMap[f]=te,n.pointShadowMatrix[f]=V.shadow.matrix,T++}n.point[f]=N,f++}else if(V.isHemisphereLight){let N=e.get(V);N.skyColor.copy(V.color).multiplyScalar(se),N.groundColor.copy(V.groundColor).multiplyScalar(se),n.hemi[_]=N,_++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let k=n.hash;k.sunLength===p&&k.directionalLength===m&&k.pointLength===f&&k.spotLength===v&&k.rectAreaLength===g&&k.hemiLength===_&&k.numSunShadows===d&&k.numDirectionalShadows===M&&k.numPointShadows===T&&k.numSpotShadows===S&&k.numSpotMaps===b&&k.numLightProbes===F||(n.sun.length=p,n.directional.length=m,n.spot.length=v,n.rectArea.length=g,n.point.length=f,n.hemi.length=_,n.sunShadow.length=d,n.sunShadowMap.length=d,n.sunShadowMatrix.length=u,n.sunShadowCascade.length=u,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=S,n.spotShadowMap.length=S,n.spotLightMatrix.length=S+b-I,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=F,k.sunLength=p,k.directionalLength=m,k.pointLength=f,k.spotLength=v,k.rectAreaLength=g,k.hemiLength=_,k.numSunShadows=d,k.numDirectionalShadows=M,k.numPointShadows=T,k.numSpotShadows=S,k.numSpotMaps=b,k.numLightProbes=F,n.version=h1++)},setupView:function(o,l){let c=0,h=0,p=0,d=0,u=0,m=0,f=l.matrixWorldInverse;for(let v=0,g=o.length;v<g;v++){let _=o[v];if(_.isSunLight){let M=n.sun[c];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(f),c++}else if(_.isDirectionalLight){let M=n.directional[h];M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),h++}else if(_.isSpotLight){let M=n.spot[d];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),d++}else if(_.isRectAreaLight){let M=n.rectArea[u];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),a.identity(),s.copy(_.matrixWorld),s.premultiply(f),a.extractRotation(s),M.halfWidth.set(.5*_.width,0,0),M.halfHeight.set(0,.5*_.height,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),u++}else if(_.isPointLight){let M=n.point[p];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(f),m++}}},state:n}}function qf(i){let e=new d1(i),t=[],n=[],r=[],s={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,t.length=0,n.length=0,r.length=0},state:s,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){r.push(a)}}}function p1(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new qf(i),e.set(t,[s])):n>=r.length?(s=new qf(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}var f1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,m1=`uniform sampler2D shadow_pass;
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
}`,g1=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],_1=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],jf=new pt,$a=new P,Lu=new P;function v1(i,e,t){let n=new Lr,r=new me,s=new me,a=new en,o=new Sl,l=new Ml,c={},h=t.maxTextureSize,p={[Xs]:Zn,[Zn]:Xs,[Yi]:Yi},d=new En({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:f1,fragmentShader:m1}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new bt;m.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let f=new $n(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ha;let g=this.type;function _(b,I){let F=e.update(f);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,u.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),b.mapPass===null?b.mapPass=new ci(r.x,r.y,{format:ss,type:Zi}):b.mapPass.width===b.map.width&&b.mapPass.height===b.map.height||b.mapPass.setSize(b.map.width,b.map.height),d.uniforms.shadow_pass.value=b.map.depthTexture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(I,null,F,d,f,null),u.uniforms.shadow_pass.value=b.mapPass.texture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(I,null,F,u,f,null)}function M(b,I,F,k){let U=null,j=F.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(j!==void 0)U=j;else if(U=F.isPointLight===!0?l:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let V=U.uuid,K=I.uuid,se=c[V];se===void 0&&(se={},c[V]=se);let re=se[K];re===void 0&&(re=U.clone(),se[K]=re,I.addEventListener("dispose",S)),U=re}return U.visible=I.visible,U.wireframe=I.wireframe,U.side=k===Ws?I.shadowSide!==null?I.shadowSide:I.side:I.shadowSide!==null?I.shadowSide:p[I.side],U.alphaMap=I.alphaMap,U.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,U.map=I.map,U.clipShadows=I.clipShadows,U.clippingPlanes=I.clippingPlanes,U.clipIntersection=I.clipIntersection,U.displacementMap=I.displacementMap,U.displacementScale=I.displacementScale,U.displacementBias=I.displacementBias,U.wireframeLinewidth=I.wireframeLinewidth,U.linewidth=I.linewidth,F.isPointLight===!0&&U.isMeshDistanceMaterial===!0&&(i.properties.get(U).light=F),U}function T(b,I,F,k,U){if(b.visible===!1)return;if(b.layers.test(I.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&U===Ws)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,b.matrixWorld);let V=e.update(b),K=b.material;if(Array.isArray(K)){let se=V.groups;for(let re=0,te=se.length;re<te;re++){let N=se[re],Z=K[N.materialIndex];if(Z&&Z.visible){let ce=M(b,Z,k,U);b.onBeforeShadow(i,b,I,F,V,ce,N),i.renderBufferDirect(F,null,V,ce,b,N),b.onAfterShadow(i,b,I,F,V,ce,N)}}}else if(K.visible){let se=M(b,K,k,U);b.onBeforeShadow(i,b,I,F,V,se,null),i.renderBufferDirect(F,null,V,se,b,null),b.onAfterShadow(i,b,I,F,V,se,null)}}let j=b.children;for(let V=0,K=j.length;V<K;V++)T(j[V],I,F,k,U)}function S(b){b.target.removeEventListener("dispose",S);for(let I in c){let F=c[I],k=b.target.uuid;k in F&&(F[k].dispose(),delete F[k])}}this.render=function(b,I,F){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||b.length===0)return;this.type===Rp&&(Ye("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ha);let k=i.getRenderTarget(),U=i.getActiveCubeFace(),j=i.getActiveMipmapLevel(),V=i.state;V.setBlending($i),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let K=g!==this.type;K&&I.traverse(function(se){se.material&&(Array.isArray(se.material)?se.material.forEach(re=>re.needsUpdate=!0):se.material.needsUpdate=!0)});for(let se=0,re=b.length;se<re;se++){let te=b[se],N=te.shadow;if(N===void 0){Ye("WebGLShadowMap:",te,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);let Z=N.getFrameExtents();r.multiply(Z),s.copy(N.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Z.x),r.x=s.x*Z.x,N.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Z.y),r.y=s.y*Z.y,N.mapSize.y=s.y));let ce=i.state.buffers.depth.getReversed();if(N.camera._reversedDepth=ce,N.map===null||K===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===Ws){if(te.isPointLight){Ye("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new ci(r.x,r.y,{format:ss,type:Zi,minFilter:Jn,magFilter:Jn,generateMipmaps:!1}),N.map.texture.name=te.name+".shadowMap",N.map.depthTexture=new Dr(r.x,r.y,Ti),N.map.depthTexture.name=te.name+".shadowMapDepth",N.map.depthTexture.format=is,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ui,N.map.depthTexture.magFilter=Ui}else te.isPointLight?(N.map=new tc(r.x),N.map.depthTexture=new Jo(r.x,Fr)):(N.map=new ci(r.x,r.y),N.map.depthTexture=new Dr(r.x,r.y,Fr)),N.map.depthTexture.name=te.name+".shadowMap",N.map.depthTexture.format=is,this.type===Ha?(N.map.depthTexture.compareFunction=ce?Zl:$l,N.map.depthTexture.minFilter=Jn,N.map.depthTexture.magFilter=Jn):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ui,N.map.depthTexture.magFilter=Ui);N.camera.updateProjectionMatrix()}N.map.isWebGLCubeRenderTarget===!0||N.map.width===r.x&&N.map.height===r.y||N.map.setSize(r.x,r.y);let Le=N.map.isWebGLCubeRenderTarget?6:N.getViewportCount();te.isPointLight!==!0&&N.updateMatrices(te,F);for(let ve=0;ve<Le;ve++){let Oe=N.getCamera(ve);if(te.isPointLight){let Se=N.camera,ue=N.matrix,X=te.distance||Se.far;X!==Se.far&&(Se.far=X,Se.updateProjectionMatrix()),$a.setFromMatrixPosition(te.matrixWorld),Se.position.copy($a),Lu.copy(Se.position),Lu.add(g1[ve]),Se.up.copy(_1[ve]),Se.lookAt(Lu),Se.updateMatrixWorld(),ue.makeTranslation(-$a.x,-$a.y,-$a.z),jf.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),N._frustum.setFromProjectionMatrix(jf,Se.coordinateSystem,Se.reversedDepth)}if(N.map.isWebGLCubeRenderTarget)i.setRenderTarget(N.map,ve),i.clear();else{ve===0&&(i.setRenderTarget(N.map),i.clear());let Se=N.getViewport(ve);a.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),V.viewport(a)}n=N.getFrustum(ve),T(I,F,Oe,te,this.type)}N.isPointLightShadow!==!0&&this.type===Ws&&_(N,F),N.needsUpdate=!1}g=this.type,v.needsUpdate=!1,i.setRenderTarget(k,U,j)}}function x1(i,e){let t=new function(){let y=!1,z=new en,B=null,R=new en(0,0,0,0);return{setMask:function(q){B===q||y||(i.colorMask(q,q,q,q),B=q)},setLocked:function(q){y=q},setClear:function(q,Y,J,de,ye){ye===!0&&(q*=de,Y*=de,J*=de),z.set(q,Y,J,de),R.equals(z)===!1&&(i.clearColor(q,Y,J,de),R.copy(z))},reset:function(){y=!1,B=null,R.set(-1,0,0,0)}}},n=new function(){let y=!1,z=!1,B=null,R=null,q=null;return{setReversed:function(Y){if(z!==Y){let J=e.get("EXT_clip_control");Y?J.clipControlEXT(J.LOWER_LEFT_EXT,J.ZERO_TO_ONE_EXT):J.clipControlEXT(J.LOWER_LEFT_EXT,J.NEGATIVE_ONE_TO_ONE_EXT),z=Y;let de=q;q=null,this.setClear(de)}},getReversed:function(){return z},setTest:function(Y){Y?X(i.DEPTH_TEST):ee(i.DEPTH_TEST)},setMask:function(Y){B===Y||y||(i.depthMask(Y),B=Y)},setFunc:function(Y){if(z&&(Y=_f[Y]),R!==Y){switch(Y){case _h:i.depthFunc(i.NEVER);break;case vh:i.depthFunc(i.ALWAYS);break;case xh:i.depthFunc(i.LESS);break;case Ol:i.depthFunc(i.LEQUAL);break;case yh:i.depthFunc(i.EQUAL);break;case Sh:i.depthFunc(i.GEQUAL);break;case Mh:i.depthFunc(i.GREATER);break;case bh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}R=Y}},setLocked:function(Y){y=Y},setClear:function(Y){q!==Y&&(q=Y,z&&(Y=1-Y),i.clearDepth(Y))},reset:function(){y=!1,B=null,R=null,q=null,z=!1}}},r=new function(){let y=!1,z=null,B=null,R=null,q=null,Y=null,J=null,de=null,ye=null;return{setTest:function(Ie){y||(Ie?X(i.STENCIL_TEST):ee(i.STENCIL_TEST))},setMask:function(Ie){z===Ie||y||(i.stencilMask(Ie),z=Ie)},setFunc:function(Ie,_e,Fe){B===Ie&&R===_e&&q===Fe||(i.stencilFunc(Ie,_e,Fe),B=Ie,R=_e,q=Fe)},setOp:function(Ie,_e,Fe){Y===Ie&&J===_e&&de===Fe||(i.stencilOp(Ie,_e,Fe),Y=Ie,J=_e,de=Fe)},setLocked:function(Ie){y=Ie},setClear:function(Ie){ye!==Ie&&(i.clearStencil(Ie),ye=Ie)},reset:function(){y=!1,z=null,B=null,R=null,q=null,Y=null,J=null,de=null,ye=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,M=null,T=null,S=new ht(0,0,0),b=0,I=!1,F=null,k=null,U=null,j=null,V=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),se=!1,re=0,te=i.getParameter(i.VERSION);te.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(te)[1]),se=re>=1):te.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),se=re>=2);let N=null,Z={},ce=i.getParameter(i.SCISSOR_BOX),Le=i.getParameter(i.VIEWPORT),ve=new en().fromArray(ce),Oe=new en().fromArray(Le);function Se(y,z,B,R){let q=new Uint8Array(4),Y=i.createTexture();i.bindTexture(y,Y),i.texParameteri(y,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(y,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let J=0;J<B;J++)y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?i.texImage3D(z,0,i.RGBA,1,1,R,0,i.RGBA,i.UNSIGNED_BYTE,q):i.texImage2D(z+J,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,q);return Y}let ue={};function X(y){o[y]!==!0&&(i.enable(y),o[y]=!0)}function ee(y){o[y]!==!1&&(i.disable(y),o[y]=!1)}ue[i.TEXTURE_2D]=Se(i.TEXTURE_2D,i.TEXTURE_2D,1),ue[i.TEXTURE_CUBE_MAP]=Se(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[i.TEXTURE_2D_ARRAY]=Se(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ue[i.TEXTURE_3D]=Se(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),X(i.DEPTH_TEST),n.setFunc(Ol),E(!1),C(fh),X(i.CULL_FACE),A($i);let le={[qs]:i.FUNC_ADD,[Ip]:i.FUNC_SUBTRACT,[Pp]:i.FUNC_REVERSE_SUBTRACT};le[Lp]=i.MIN,le[Np]=i.MAX;let he={[Dp]:i.ZERO,[Up]:i.ONE,[Op]:i.SRC_COLOR,[Bp]:i.SRC_ALPHA,[Wp]:i.SRC_ALPHA_SATURATE,[Gp]:i.DST_COLOR,[Vp]:i.DST_ALPHA,[Fp]:i.ONE_MINUS_SRC_COLOR,[zp]:i.ONE_MINUS_SRC_ALPHA,[Hp]:i.ONE_MINUS_DST_COLOR,[kp]:i.ONE_MINUS_DST_ALPHA,[Xp]:i.CONSTANT_COLOR,[qp]:i.ONE_MINUS_CONSTANT_COLOR,[jp]:i.CONSTANT_ALPHA,[Yp]:i.ONE_MINUS_CONSTANT_ALPHA};function A(y,z,B,R,q,Y,J,de,ye,Ie){if(y!==$i){if(u===!1&&(X(i.BLEND),u=!0),y===Cp)q=q||z,Y=Y||B,J=J||R,z===f&&q===_||(i.blendEquationSeparate(le[z],le[q]),f=z,_=q),B===v&&R===g&&Y===M&&J===T||(i.blendFuncSeparate(he[B],he[R],he[Y],he[J]),v=B,g=R,M=Y,T=J),de.equals(S)!==!1&&ye===b||(i.blendColor(de.r,de.g,de.b,ye),S.copy(de),b=ye),m=y,I=!1;else if(y!==m||Ie!==I){if(f===qs&&_===qs||(i.blendEquation(i.FUNC_ADD),f=qs,_=qs),Ie)switch(y){case bi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFunc(i.ONE,i.ONE);break;case mh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Qe("WebGLState: Invalid blending: ",y)}else switch(y){case bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case mh:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gh:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",y)}v=null,g=null,M=null,T=null,S.set(0,0,0),b=0,m=y,I=Ie}}else u===!0&&(ee(i.BLEND),u=!1)}function E(y){F!==y&&(y?i.frontFace(i.CW):i.frontFace(i.CCW),F=y)}function C(y){y!==wp?(X(i.CULL_FACE),y!==k&&(y===fh?i.cullFace(i.BACK):y===Ap?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ee(i.CULL_FACE),k=y}function O(y,z,B){y?(X(i.POLYGON_OFFSET_FILL),j===z&&V===B||(j=z,V=B,n.getReversed()&&(z=-z),i.polygonOffset(z,B))):ee(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:X,disable:ee,bindFramebuffer:function(y,z){return c[y]!==z&&(i.bindFramebuffer(y,z),c[y]=z,y===i.DRAW_FRAMEBUFFER&&(c[i.FRAMEBUFFER]=z),y===i.FRAMEBUFFER&&(c[i.DRAW_FRAMEBUFFER]=z),!0)},drawBuffers:function(y,z){let B=p,R=!1;if(y){B=h.get(z),B===void 0&&(B=[],h.set(z,B));let q=y.textures;if(B.length!==q.length||B[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,J=q.length;Y<J;Y++)B[Y]=i.COLOR_ATTACHMENT0+Y;B.length=q.length,R=!0}}else B[0]!==i.BACK&&(B[0]=i.BACK,R=!0);R&&i.drawBuffers(B)},useProgram:function(y){return d!==y&&(i.useProgram(y),d=y,!0)},setBlending:A,setMaterial:function(y,z){y.side===Yi?ee(i.CULL_FACE):X(i.CULL_FACE);let B=y.side===Zn;z&&(B=!B),E(B),y.blending===bi&&y.transparent===!1?A($i):A(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),n.setFunc(y.depthFunc),n.setTest(y.depthTest),n.setMask(y.depthWrite),t.setMask(y.colorWrite);let R=y.stencilWrite;r.setTest(R),R&&(r.setMask(y.stencilWriteMask),r.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),r.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),O(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?X(i.SAMPLE_ALPHA_TO_COVERAGE):ee(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:C,setLineWidth:function(y){y!==U&&(se&&i.lineWidth(y),U=y)},setPolygonOffset:O,setScissorTest:function(y){y?X(i.SCISSOR_TEST):ee(i.SCISSOR_TEST)},activeTexture:function(y){y===void 0&&(y=i.TEXTURE0+K-1),N!==y&&(i.activeTexture(y),N=y)},bindTexture:function(y,z,B){B===void 0&&(B=N===null?i.TEXTURE0+K-1:N);let R=Z[B];R===void 0&&(R={type:void 0,texture:void 0},Z[B]=R),R.type===y&&R.texture===z||(N!==B&&(i.activeTexture(B),N=B),i.bindTexture(y,z||ue[y]),R.type=y,R.texture=z)},unbindTexture:function(){let y=Z[N];y!==void 0&&y.type!==void 0&&(i.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},pixelStorei:function(y,z){l[y]!==z&&(i.pixelStorei(y,z),l[y]=z)},getParameter:function(y){return l[y]!==void 0?l[y]:i.getParameter(y)},updateUBOMapping:function(y,z){let B=a.get(z);B===void 0&&(B=new WeakMap,a.set(z,B));let R=B.get(y);R===void 0&&(R=i.getUniformBlockIndex(z,y.name),B.set(y,R))},uniformBlockBinding:function(y,z){let B=a.get(z).get(y);s.get(z)!==B&&(i.uniformBlockBinding(z,B,y.__bindingPointIndex),s.set(z,B))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},scissor:function(y){ve.equals(y)===!1&&(i.scissor(y.x,y.y,y.z,y.w),ve.copy(y))},viewport:function(y){Oe.equals(y)===!1&&(i.viewport(y.x,y.y,y.z,y.w),Oe.copy(y))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),o={},l={},N=null,Z={},c={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,M=null,T=null,S=new ht(0,0,0),b=0,I=!1,F=null,k=null,U=null,j=null,V=null,ve.set(0,0,i.canvas.width,i.canvas.height),Oe.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function y1(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new me,h=new WeakMap,p=new Set,d,u=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(A,E){return m?new OffscreenCanvas(A,E):ga("canvas")}function v(A,E,C){let O=1,y=he(A);if((y.width>C||y.height>C)&&(O=C/Math.max(y.width,y.height)),O<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let z=Math.floor(O*y.width),B=Math.floor(O*y.height);d===void 0&&(d=f(z,B));let R=E?f(z,B):d;return R.width=z,R.height=B,R.getContext("2d").drawImage(A,0,0,z,B),Ye("WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+z+"x"+B+")."),R}return"data"in A&&Ye("WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),A}return A}function g(A){return A.generateMipmaps}function _(A){i.generateMipmap(A)}function M(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(A,E,C,O,y,z=!1){if(A!==null){if(i[A]!==void 0)return i[A];Ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let B;O&&(B=e.get("EXT_texture_norm16"),B||Ye("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let R=E;if(E===i.RED&&(C===i.FLOAT&&(R=i.R32F),C===i.HALF_FLOAT&&(R=i.R16F),C===i.UNSIGNED_BYTE&&(R=i.R8),C===i.UNSIGNED_SHORT&&B&&(R=B.R16_EXT),C===i.SHORT&&B&&(R=B.R16_SNORM_EXT)),E===i.RED_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.R8UI),C===i.UNSIGNED_SHORT&&(R=i.R16UI),C===i.UNSIGNED_INT&&(R=i.R32UI),C===i.BYTE&&(R=i.R8I),C===i.SHORT&&(R=i.R16I),C===i.INT&&(R=i.R32I)),E===i.RG&&(C===i.FLOAT&&(R=i.RG32F),C===i.HALF_FLOAT&&(R=i.RG16F),C===i.UNSIGNED_BYTE&&(R=i.RG8),C===i.UNSIGNED_SHORT&&B&&(R=B.RG16_EXT),C===i.SHORT&&B&&(R=B.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RG8UI),C===i.UNSIGNED_SHORT&&(R=i.RG16UI),C===i.UNSIGNED_INT&&(R=i.RG32UI),C===i.BYTE&&(R=i.RG8I),C===i.SHORT&&(R=i.RG16I),C===i.INT&&(R=i.RG32I)),E===i.RGB_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RGB8UI),C===i.UNSIGNED_SHORT&&(R=i.RGB16UI),C===i.UNSIGNED_INT&&(R=i.RGB32UI),C===i.BYTE&&(R=i.RGB8I),C===i.SHORT&&(R=i.RGB16I),C===i.INT&&(R=i.RGB32I)),E===i.RGBA_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RGBA8UI),C===i.UNSIGNED_SHORT&&(R=i.RGBA16UI),C===i.UNSIGNED_INT&&(R=i.RGBA32UI),C===i.BYTE&&(R=i.RGBA8I),C===i.SHORT&&(R=i.RGBA16I),C===i.INT&&(R=i.RGBA32I)),E===i.RGB&&(C===i.UNSIGNED_SHORT&&B&&(R=B.RGB16_EXT),C===i.SHORT&&B&&(R=B.RGB16_SNORM_EXT),C===i.UNSIGNED_INT_5_9_9_9_REV&&(R=i.RGB9_E5),C===i.UNSIGNED_INT_10F_11F_11F_REV&&(R=i.R11F_G11F_B10F)),E===i.RGBA){let q=z?mu:Ct.getTransfer(y);C===i.FLOAT&&(R=i.RGBA32F),C===i.HALF_FLOAT&&(R=i.RGBA16F),C===i.UNSIGNED_BYTE&&(R=q===tn?i.SRGB8_ALPHA8:i.RGBA8),C===i.UNSIGNED_SHORT&&B&&(R=B.RGBA16_EXT),C===i.SHORT&&B&&(R=B.RGBA16_SNORM_EXT),C===i.UNSIGNED_SHORT_4_4_4_4&&(R=i.RGBA4),C===i.UNSIGNED_SHORT_5_5_5_1&&(R=i.RGB5_A1)}return R!==i.R16F&&R!==i.R32F&&R!==i.RG16F&&R!==i.RG32F&&R!==i.RGBA16F&&R!==i.RGBA32F||e.get("EXT_color_buffer_float"),R}function S(A,E){let C;return A?E===null||E===Fr||E===Ys?C=i.DEPTH24_STENCIL8:E===Ti?C=i.DEPTH32F_STENCIL8:E===qa&&(C=i.DEPTH24_STENCIL8,Ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Fr||E===Ys?C=i.DEPTH_COMPONENT24:E===Ti?C=i.DEPTH_COMPONENT32F:E===qa&&(C=i.DEPTH_COMPONENT16),C}function b(A,E){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ui&&A.minFilter!==Jn?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function I(A){let E=A.target;E.removeEventListener("dispose",I),(function(C){let O=n.get(C);if(O.__webglInit===void 0)return;let y=C.source,z=u.get(y);if(z){let B=z[O.__cacheKey];B.usedTimes--,B.usedTimes===0&&k(C),Object.keys(z).length===0&&u.delete(y)}n.remove(C)})(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&p.delete(E)}function F(A){let E=A.target;E.removeEventListener("dispose",F),(function(C){let O=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(O.__webglFramebuffer[z]))for(let B=0;B<O.__webglFramebuffer[z].length;B++)i.deleteFramebuffer(O.__webglFramebuffer[z][B]);else i.deleteFramebuffer(O.__webglFramebuffer[z]);O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer[z])}else{if(Array.isArray(O.__webglFramebuffer))for(let z=0;z<O.__webglFramebuffer.length;z++)i.deleteFramebuffer(O.__webglFramebuffer[z]);else i.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&i.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let z=0;z<O.__webglColorRenderbuffer.length;z++)O.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(O.__webglColorRenderbuffer[z]);O.__webglDepthRenderbuffer&&i.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let y=C.textures;for(let z=0,B=y.length;z<B;z++){let R=n.get(y[z]);R.__webglTexture&&(i.deleteTexture(R.__webglTexture),a.memory.textures--),n.remove(y[z])}n.remove(C)})(E)}function k(A){let E=n.get(A);i.deleteTexture(E.__webglTexture);let C=A.source;delete u.get(C)[E.__cacheKey],a.memory.textures--}let U=0;function j(A,E){let C=n.get(A);if(A.isVideoTexture&&(function(O){let y=a.render.frame;h.get(O)!==y&&(h.set(O,y),O.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&C.__version!==A.version){let O=A.image;if(O===null)Ye("WebGLRenderer: Texture marked for update but no image data found.");else{if(O.complete!==!1)return void Z(C,A,E);Ye("WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(C.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,C.__webglTexture,i.TEXTURE0+E)}let V={[zl]:i.REPEAT,[Vl]:i.CLAMP_TO_EDGE,[Kp]:i.MIRRORED_REPEAT},K={[Ui]:i.NEAREST,[Qp]:i.NEAREST_MIPMAP_NEAREST,[Xa]:i.NEAREST_MIPMAP_LINEAR,[Jn]:i.LINEAR,[kl]:i.LINEAR_MIPMAP_NEAREST,[ns]:i.LINEAR_MIPMAP_LINEAR},se={[lf]:i.NEVER,[pf]:i.ALWAYS,[cf]:i.LESS,[$l]:i.LEQUAL,[hf]:i.EQUAL,[Zl]:i.GEQUAL,[uf]:i.GREATER,[df]:i.NOTEQUAL};function re(A,E){if(E.type!==Ti||e.has("OES_texture_float_linear")!==!1||E.magFilter!==Jn&&E.magFilter!==kl&&E.magFilter!==Xa&&E.magFilter!==ns&&E.minFilter!==Jn&&E.minFilter!==kl&&E.minFilter!==Xa&&E.minFilter!==ns||Ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,V[E.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,V[E.wrapT]),A!==i.TEXTURE_3D&&A!==i.TEXTURE_2D_ARRAY||i.texParameteri(A,i.TEXTURE_WRAP_R,V[E.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,K[E.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,K[E.minFilter]),E.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,se[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ui||E.minFilter!==Xa&&E.minFilter!==ns||E.type===Ti&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let C=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function te(A,E){let C=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",I));let O=E.source,y=u.get(O);y===void 0&&(y={},u.set(O,y));let z=(function(B){let R=[];return R.push(B.wrapS),R.push(B.wrapT),R.push(B.wrapR||0),R.push(B.magFilter),R.push(B.minFilter),R.push(B.anisotropy),R.push(B.internalFormat),R.push(B.format),R.push(B.type),R.push(B.generateMipmaps),R.push(B.premultiplyAlpha),R.push(B.flipY),R.push(B.unpackAlignment),R.push(B.colorSpace),R.join()})(E);if(z!==A.__cacheKey){y[z]===void 0&&(y[z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,C=!0),y[z].usedTimes++;let B=y[A.__cacheKey];B!==void 0&&(y[A.__cacheKey].usedTimes--,B.usedTimes===0&&k(E)),A.__cacheKey=z,A.__webglTexture=y[z].texture}return C}function N(A,E,C){return Math.floor(Math.floor(A/C)/E)}function Z(A,E,C){let O=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(O=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(O=i.TEXTURE_3D);let y=te(A,E),z=E.source;t.bindTexture(O,A.__webglTexture,i.TEXTURE0+C);let B=n.get(z);if(z.version!==B.__version||y===!0){if(t.activeTexture(i.TEXTURE0+C),!(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)){let fe=Ct.getPrimaries(Ct.workingColorSpace),ge=E.colorSpace===as?null:Ct.getPrimaries(E.colorSpace),we=E.colorSpace===as||fe===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let R=v(E.image,!1,r.maxTextureSize);R=le(E,R);let q=s.convert(E.format,E.colorSpace),Y=s.convert(E.type),J,de=T(E.internalFormat,q,Y,E.normalized,E.colorSpace,E.isVideoTexture);re(O,E);let ye=E.mipmaps,Ie=E.isVideoTexture!==!0,_e=B.__version===void 0||y===!0,Fe=z.dataReady,oe=b(E,R);if(E.isDepthTexture)de=S(E.format===rs,E.type),_e&&(Ie?t.texStorage2D(i.TEXTURE_2D,1,de,R.width,R.height):t.texImage2D(i.TEXTURE_2D,0,de,R.width,R.height,0,q,Y,null));else if(E.isDataTexture)if(ye.length>0){Ie&&_e&&t.texStorage2D(i.TEXTURE_2D,oe,de,ye[0].width,ye[0].height);for(let fe=0,ge=ye.length;fe<ge;fe++)J=ye[fe],Ie?Fe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,J.width,J.height,q,Y,J.data):t.texImage2D(i.TEXTURE_2D,fe,de,J.width,J.height,0,q,Y,J.data);E.generateMipmaps=!1}else Ie?(_e&&t.texStorage2D(i.TEXTURE_2D,oe,de,R.width,R.height),Fe&&(function(fe,ge,we,Wt){let ft=fe.updateRanges;if(ft.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge.width,ge.height,we,Wt,ge.data);else{ft.sort(($e,qt)=>$e.start-qt.start);let be=0;for(let $e=1;$e<ft.length;$e++){let qt=ft[be],Tt=ft[$e],Ft=qt.start+qt.count,jt=N(Tt.start,ge.width,4),nn=N(qt.start,ge.width,4);Tt.start<=Ft+1&&jt===nn&&N(Tt.start+Tt.count-1,ge.width,4)===jt?qt.count=Math.max(qt.count,Tt.start+Tt.count-qt.start):(++be,ft[be]=Tt)}ft.length=be+1;let at=t.getParameter(i.UNPACK_ROW_LENGTH),Ne=t.getParameter(i.UNPACK_SKIP_PIXELS),St=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,ge.width);for(let $e=0,qt=ft.length;$e<qt;$e++){let Tt=ft[$e],Ft=Math.floor(Tt.start/4),jt=Math.ceil(Tt.count/4),nn=Ft%ge.width,sn=Math.floor(Ft/ge.width),hi=jt;t.pixelStorei(i.UNPACK_SKIP_PIXELS,nn),t.pixelStorei(i.UNPACK_SKIP_ROWS,sn),t.texSubImage2D(i.TEXTURE_2D,0,nn,sn,hi,1,we,Wt,ge.data)}fe.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,at),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,St)}})(E,R,q,Y)):t.texImage2D(i.TEXTURE_2D,0,de,R.width,R.height,0,q,Y,R.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ie&&_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,de,ye[0].width,ye[0].height,R.depth);for(let fe=0,ge=ye.length;fe<ge;fe++)if(J=ye[fe],E.format!==Ji)if(q!==null)if(Ie){if(Fe)if(E.layerUpdates.size>0){let we=Su(J.width,J.height,E.format,E.type);for(let Wt of E.layerUpdates){let ft=J.data.subarray(Wt*we/J.data.BYTES_PER_ELEMENT,(Wt+1)*we/J.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,Wt,J.width,J.height,1,q,ft)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,J.width,J.height,R.depth,q,J.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,fe,de,J.width,J.height,R.depth,0,J.data,0,0);else Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ie?Fe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,J.width,J.height,R.depth,q,Y,J.data):t.texImage3D(i.TEXTURE_2D_ARRAY,fe,de,J.width,J.height,R.depth,0,q,Y,J.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{Ie&&_e&&t.texStorage2D(i.TEXTURE_2D,oe,de,ye[0].width,ye[0].height);for(let fe=0,ge=ye.length;fe<ge;fe++)J=ye[fe],E.format!==Ji?q!==null?Ie?Fe&&t.compressedTexSubImage2D(i.TEXTURE_2D,fe,0,0,J.width,J.height,q,J.data):t.compressedTexImage2D(i.TEXTURE_2D,fe,de,J.width,J.height,0,J.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?Fe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,J.width,J.height,q,Y,J.data):t.texImage2D(i.TEXTURE_2D,fe,de,J.width,J.height,0,q,Y,J.data)}else if(E.isDataArrayTexture)if(Ie){if(_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,de,R.width,R.height,R.depth),Fe)if(E.layerUpdates.size>0){let fe=Su(R.width,R.height,E.format,E.type);for(let ge of E.layerUpdates){let we=R.data.subarray(ge*fe/R.data.BYTES_PER_ELEMENT,(ge+1)*fe/R.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ge,R.width,R.height,1,q,Y,we)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,R.width,R.height,R.depth,q,Y,R.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,de,R.width,R.height,R.depth,0,q,Y,R.data);else if(E.isData3DTexture)Ie?(_e&&t.texStorage3D(i.TEXTURE_3D,oe,de,R.width,R.height,R.depth),Fe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,R.width,R.height,R.depth,q,Y,R.data)):t.texImage3D(i.TEXTURE_3D,0,de,R.width,R.height,R.depth,0,q,Y,R.data);else if(E.isFramebufferTexture){if(_e)if(Ie)t.texStorage2D(i.TEXTURE_2D,oe,de,R.width,R.height);else{let fe=R.width,ge=R.height;for(let we=0;we<oe;we++)t.texImage2D(i.TEXTURE_2D,we,de,fe,ge,0,q,Y,null),fe>>=1,ge>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){let fe=i.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),R.parentNode!==fe)return fe.appendChild(R),p.add(E),fe.onpaint=ge=>{let we=ge.changedElements;for(let Wt of p)we.includes(Wt.image)&&(Wt.needsUpdate=!0)},void fe.requestPaint();if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,R);else{let we=i.RGBA,Wt=i.RGBA,ft=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,we,Wt,ft,R)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ye.length>0){if(Ie&&_e){let fe=he(ye[0]);t.texStorage2D(i.TEXTURE_2D,oe,de,fe.width,fe.height)}for(let fe=0,ge=ye.length;fe<ge;fe++)J=ye[fe],Ie?Fe&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,q,Y,J):t.texImage2D(i.TEXTURE_2D,fe,de,q,Y,J);E.generateMipmaps=!1}else if(Ie){if(_e){let fe=he(R);t.texStorage2D(i.TEXTURE_2D,oe,de,fe.width,fe.height)}Fe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,q,Y,R)}else t.texImage2D(i.TEXTURE_2D,0,de,q,Y,R);g(E)&&_(O),B.__version=z.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function ce(A,E,C,O,y,z){let B=s.convert(C.format,C.colorSpace),R=s.convert(C.type),q=T(C.internalFormat,B,R,C.normalized,C.colorSpace),Y=n.get(E),J=n.get(C);if(J.__renderTarget=E,!Y.__hasExternalTextures){let de=Math.max(1,E.width>>z),ye=Math.max(1,E.height>>z);y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?t.texImage3D(y,z,q,de,ye,E.depth,0,B,R,null):t.texImage2D(y,z,q,de,ye,0,B,R,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),ee(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,O,y,J.__webglTexture,0,X(E)):(y===i.TEXTURE_2D||y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,O,y,J.__webglTexture,z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(A,E,C){if(i.bindRenderbuffer(i.RENDERBUFFER,A),E.depthBuffer){let O=E.depthTexture,y=O&&O.isDepthTexture?O.type:null,z=S(E.stencilBuffer,y),B=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ee(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X(E),z,E.width,E.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,X(E),z,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,z,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,B,i.RENDERBUFFER,A)}else{let O=E.textures;for(let y=0;y<O.length;y++){let z=O[y],B=s.convert(z.format,z.colorSpace),R=s.convert(z.type),q=T(z.internalFormat,B,R,z.normalized,z.colorSpace);ee(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X(E),q,E.width,E.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,X(E),q,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,q,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ve(A,E,C){let O=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let y=n.get(E.depthTexture);if(y.__renderTarget=E,y.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),O){if(y.__webglInit===void 0&&(y.__webglInit=!0,E.depthTexture.addEventListener("dispose",I)),y.__webglTexture===void 0){y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture),re(i.TEXTURE_CUBE_MAP,E.depthTexture);let Y=s.convert(E.depthTexture.format),J=s.convert(E.depthTexture.type),de;E.depthTexture.format===is?de=i.DEPTH_COMPONENT24:E.depthTexture.format===rs&&(de=i.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,de,E.width,E.height,0,Y,J,null)}}else j(E.depthTexture,0);let z=y.__webglTexture,B=X(E),R=O?i.TEXTURE_CUBE_MAP_POSITIVE_X+C:i.TEXTURE_2D,q=E.depthTexture.format===rs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===is)ee(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,R,z,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,q,R,z,0);else{if(E.depthTexture.format!==rs)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");ee(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,R,z,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,q,R,z,0)}}function Oe(A){let E=n.get(A),C=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){let O=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),O){let y=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,O.removeEventListener("dispose",y)};O.addEventListener("dispose",y),E.__depthDisposeCallback=y}E.__boundDepthTexture=O}if(A.depthTexture&&!E.__autoAllocateDepthBuffer)if(C)for(let O=0;O<6;O++)ve(E.__webglFramebuffer[O],A,O);else{let O=A.texture.mipmaps;O&&O.length>0?ve(E.__webglFramebuffer[0],A,0):ve(E.__webglFramebuffer,A,0)}else if(C){E.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[O]),E.__webglDepthbuffer[O]===void 0)E.__webglDepthbuffer[O]=i.createRenderbuffer(),Le(E.__webglDepthbuffer[O],A,!1);else{let y=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=E.__webglDepthbuffer[O];i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,z)}}else{let O=A.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),Le(E.__webglDepthbuffer,A,!1);else{let y=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,z)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let Se=[],ue=[];function X(A){return Math.min(r.maxSamples,A.samples)}function ee(A){let E=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function le(A,E){let C=A.colorSpace,O=A.format,y=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||C!==Yl&&C!==as&&(Ct.getTransfer(C)===tn?O===Ji&&y===Oi||Ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",C)),E}function he(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=function(){let A=U;return A>=r.maxTextures&&Ye("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),U+=1,A},this.resetTextureUnits=function(){U=0},this.getTextureUnits=function(){return U},this.setTextureUnits=function(A){U=A},this.setTexture2D=j,this.setTexture2DArray=function(A,E){let C=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&C.__version!==A.version?Z(C,A,E):(A.isExternalTexture&&(C.__webglTexture=A.sourceTexture?A.sourceTexture:null),t.bindTexture(i.TEXTURE_2D_ARRAY,C.__webglTexture,i.TEXTURE0+E))},this.setTexture3D=function(A,E){let C=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&C.__version!==A.version?Z(C,A,E):t.bindTexture(i.TEXTURE_3D,C.__webglTexture,i.TEXTURE0+E)},this.setTextureCube=function(A,E){let C=n.get(A);A.isCubeDepthTexture!==!0&&A.version>0&&C.__version!==A.version?(function(O,y,z){if(y.image.length!==6)return;let B=te(O,y),R=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+z);let q=n.get(R);if(R.version!==q.__version||B===!0){t.activeTexture(i.TEXTURE0+z);let Y=Ct.getPrimaries(Ct.workingColorSpace),J=y.colorSpace===as?null:Ct.getPrimaries(y.colorSpace),de=y.colorSpace===as||Y===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);let ye=y.isCompressedTexture||y.image[0].isCompressedTexture,Ie=y.image[0]&&y.image[0].isDataTexture,_e=[];for(let Ne=0;Ne<6;Ne++)_e[Ne]=ye||Ie?Ie?y.image[Ne].image:y.image[Ne]:v(y.image[Ne],!0,r.maxCubemapSize),_e[Ne]=le(y,_e[Ne]);let Fe=_e[0],oe=s.convert(y.format,y.colorSpace),fe=s.convert(y.type),ge=T(y.internalFormat,oe,fe,y.normalized,y.colorSpace),we=y.isVideoTexture!==!0,Wt=q.__version===void 0||B===!0,ft=R.dataReady,be,at=b(y,Fe);if(re(i.TEXTURE_CUBE_MAP,y),ye){we&&Wt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,at,ge,Fe.width,Fe.height);for(let Ne=0;Ne<6;Ne++){be=_e[Ne].mipmaps;for(let St=0;St<be.length;St++){let $e=be[St];y.format!==Ji?oe!==null?we?ft&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,St,0,0,$e.width,$e.height,oe,$e.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,St,ge,$e.width,$e.height,0,$e.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):we?ft&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,St,0,0,$e.width,$e.height,oe,fe,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,St,ge,$e.width,$e.height,0,oe,fe,$e.data)}}}else{if(be=y.mipmaps,we&&Wt){be.length>0&&at++;let Ne=he(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,at,ge,Ne.width,Ne.height)}for(let Ne=0;Ne<6;Ne++)if(Ie){we?ft&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,0,0,0,_e[Ne].width,_e[Ne].height,oe,fe,_e[Ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,0,ge,_e[Ne].width,_e[Ne].height,0,oe,fe,_e[Ne].data);for(let St=0;St<be.length;St++){let $e=be[St].image[Ne].image;we?ft&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,St+1,0,0,$e.width,$e.height,oe,fe,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,St+1,ge,$e.width,$e.height,0,oe,fe,$e.data)}}else{we?ft&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,0,0,0,oe,fe,_e[Ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,0,ge,oe,fe,_e[Ne]);for(let St=0;St<be.length;St++){let $e=be[St];we?ft&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,St+1,0,0,oe,fe,$e.image[Ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,St+1,ge,oe,fe,$e.image[Ne])}}}g(y)&&_(i.TEXTURE_CUBE_MAP),q.__version=R.version,y.onUpdate&&y.onUpdate(y)}O.__version=y.version})(C,A,E):t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+E)},this.rebindTextures=function(A,E,C){let O=n.get(A);E!==void 0&&ce(O.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),C!==void 0&&Oe(A)},this.setupRenderTarget=function(A){let E=A.texture,C=n.get(A),O=n.get(E);A.addEventListener("dispose",F);let y=A.textures,z=A.isWebGLCubeRenderTarget===!0,B=y.length>1;if(B||(O.__webglTexture===void 0&&(O.__webglTexture=i.createTexture()),O.__version=E.version,a.memory.textures++),z){C.__webglFramebuffer=[];for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0){C.__webglFramebuffer[R]=[];for(let q=0;q<E.mipmaps.length;q++)C.__webglFramebuffer[R][q]=i.createFramebuffer()}else C.__webglFramebuffer[R]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){C.__webglFramebuffer=[];for(let R=0;R<E.mipmaps.length;R++)C.__webglFramebuffer[R]=i.createFramebuffer()}else C.__webglFramebuffer=i.createFramebuffer();if(B)for(let R=0,q=y.length;R<q;R++){let Y=n.get(y[R]);Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&ee(A)===!1){C.__webglMultisampledFramebuffer=i.createFramebuffer(),C.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let R=0;R<y.length;R++){let q=y[R];C.__webglColorRenderbuffer[R]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,C.__webglColorRenderbuffer[R]);let Y=s.convert(q.format,q.colorSpace),J=s.convert(q.type),de=T(q.internalFormat,Y,J,q.normalized,q.colorSpace,A.isXRRenderTarget===!0),ye=X(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,de,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+R,i.RENDERBUFFER,C.__webglColorRenderbuffer[R])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(C.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(C.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(z){t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture),re(i.TEXTURE_CUBE_MAP,E);for(let R=0;R<6;R++)if(E.mipmaps&&E.mipmaps.length>0)for(let q=0;q<E.mipmaps.length;q++)ce(C.__webglFramebuffer[R][q],A,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,q);else ce(C.__webglFramebuffer[R],A,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,0);g(E)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(B){for(let R=0,q=y.length;R<q;R++){let Y=y[R],J=n.get(Y),de=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(de=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,J.__webglTexture),re(de,Y),ce(C.__webglFramebuffer,A,Y,i.COLOR_ATTACHMENT0+R,de,0),g(Y)&&_(de)}t.unbindTexture()}else{let R=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(R=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(R,O.__webglTexture),re(R,E),E.mipmaps&&E.mipmaps.length>0)for(let q=0;q<E.mipmaps.length;q++)ce(C.__webglFramebuffer[q],A,E,i.COLOR_ATTACHMENT0,R,q);else ce(C.__webglFramebuffer,A,E,i.COLOR_ATTACHMENT0,R,0);g(E)&&_(R),t.unbindTexture()}A.depthBuffer&&Oe(A)},this.updateRenderTargetMipmap=function(A){let E=A.textures;for(let C=0,O=E.length;C<O;C++){let y=E[C];if(g(y)){let z=M(A),B=n.get(y).__webglTexture;t.bindTexture(z,B),_(z),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(ee(A)===!1){let E=A.textures,C=A.width,O=A.height,y=i.COLOR_BUFFER_BIT,z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=n.get(A),R=E.length>1;if(R)for(let Y=0;Y<E.length;Y++)t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,B.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,B.__webglMultisampledFramebuffer);let q=A.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglFramebuffer);for(let Y=0;Y<E.length;Y++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(y|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(y|=i.STENCIL_BUFFER_BIT)),R){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);let J=n.get(E[Y]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,C,O,0,0,C,O,y,i.NEAREST),l===!0&&(Se.length=0,ue.length=0,Se.push(i.COLOR_ATTACHMENT0+Y),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(Se.push(z),ue.push(z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ue)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Se))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),R)for(let Y=0;Y<E.length;Y++){t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);let J=n.get(E[Y]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,B.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,J,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){let E=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=ee,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function S1(i,e){return{convert:function(t,n=as){let r,s=Ct.getTransfer(n);if(t===Oi)return i.UNSIGNED_BYTE;if(t===Lh)return i.UNSIGNED_SHORT_4_4_4_4;if(t===Nh)return i.UNSIGNED_SHORT_5_5_5_1;if(t===nf)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===rf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===ef)return i.BYTE;if(t===tf)return i.SHORT;if(t===qa)return i.UNSIGNED_SHORT;if(t===Ph)return i.INT;if(t===Fr)return i.UNSIGNED_INT;if(t===Ti)return i.FLOAT;if(t===Zi)return i.HALF_FLOAT;if(t===sf)return i.ALPHA;if(t===af)return i.RGB;if(t===Ji)return i.RGBA;if(t===is)return i.DEPTH_COMPONENT;if(t===rs)return i.DEPTH_STENCIL;if(t===ja)return i.RED;if(t===Dh)return i.RED_INTEGER;if(t===ss)return i.RG;if(t===Uh)return i.RG_INTEGER;if(t===Oh)return i.RGBA_INTEGER;if(t===Gl||t===Hl||t===Wl||t===Xl)if(s===tn){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===Gl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Hl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Wl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Xl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===Gl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Hl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Wl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Xl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Fh||t===Bh||t===zh||t===Vh){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===Fh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Bh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===zh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Vh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===kh||t===Gh||t===Hh||t===Wh||t===Xh||t===ql||t===qh){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===kh||t===Gh)return s===tn?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===Hh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(t===Wh)return r.COMPRESSED_R11_EAC;if(t===Xh)return r.COMPRESSED_SIGNED_R11_EAC;if(t===ql)return r.COMPRESSED_RG11_EAC;if(t===qh)return r.COMPRESSED_SIGNED_RG11_EAC}if(t===jh||t===Yh||t===$h||t===Zh||t===Jh||t===Kh||t===Qh||t===eu||t===tu||t===nu||t===iu||t===ru||t===su||t===au){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===jh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Yh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===$h)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Zh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Jh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Kh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Qh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===eu)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===tu)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===nu)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===iu)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===ru)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===su)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===au)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===ou||t===lu||t===cu){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===ou)return s===tn?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===lu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===cu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===hu||t===uu||t===jl||t===du){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===hu)return r.COMPRESSED_RED_RGTC1_EXT;if(t===uu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===jl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===du)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Ys?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var M1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,b1=`
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

}`,Vu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Aa(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new En({vertexShader:M1,fragmentShader:b1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $n(new ks(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ku=class extends Xi{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,p=null,d=null,u=null,m=null,f=typeof XRWebGLBinding<"u",v=new Vu,g={},_=t.getContextAttributes(),M=null,T=null,S=[],b=[],I=new me,F=null,k=null,U=new Yn;U.viewport=new en;let j=new Yn;j.viewport=new en;let V=[U,j],K=new Dl,se=null,re=null;function te(ue){let X=b.indexOf(ue.inputSource);if(X===-1)return;let ee=S[X];ee!==void 0&&(ee.update(ue.inputSource,ue.frame,c||a),ee.dispatchEvent({type:ue.type,data:ue.inputSource}))}function N(){r.removeEventListener("select",te),r.removeEventListener("selectstart",te),r.removeEventListener("selectend",te),r.removeEventListener("squeeze",te),r.removeEventListener("squeezestart",te),r.removeEventListener("squeezeend",te),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",Z);for(let ue=0;ue<S.length;ue++){let X=b[ue];X!==null&&(b[ue]=null,S[ue].disconnect(X))}se=null,re=null,v.reset();for(let ue in g)delete g[ue];if(e.setRenderTarget(M),u=null,d=null,p=null,r=null,T=null,Se.stop(),n.isPresenting=!1,e.setPixelRatio(F),e.setSize(I.width,I.height,!1),k!==null){let ue=k.camera;ue.fov=k.fov,ue.zoom=k.zoom,ue.updateProjectionMatrix(),k=null}n.dispatchEvent({type:"sessionend"})}function Z(ue){for(let X=0;X<ue.removed.length;X++){let ee=ue.removed[X],le=b.indexOf(ee);le>=0&&(b[le]=null,S[le].disconnect(ee))}for(let X=0;X<ue.added.length;X++){let ee=ue.added[X],le=b.indexOf(ee);if(le===-1){for(let A=0;A<S.length;A++){if(A>=b.length){b.push(ee),le=A;break}if(b[A]===null){b[A]=ee,le=A;break}}if(le===-1)break}let he=S[le];he&&he.connect(ee)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ue){let X=S[ue];return X===void 0&&(X=new Os,S[ue]=X),X.getTargetRaySpace()},this.getControllerGrip=function(ue){let X=S[ue];return X===void 0&&(X=new Os,S[ue]=X),X.getGripSpace()},this.getHand=function(ue){let X=S[ue];return X===void 0&&(X=new Os,S[ue]=X),X.getHandSpace()},this.setFramebufferScaleFactor=function(ue){s=ue,n.isPresenting===!0&&Ye("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ue){o=ue,n.isPresenting===!0&&Ye("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ue){c=ue},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return p===null&&f&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(ue){if(r=ue,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",te),r.addEventListener("selectstart",te),r.addEventListener("selectend",te),r.addEventListener("squeeze",te),r.addEventListener("squeezestart",te),r.addEventListener("squeezeend",te),r.addEventListener("end",N),r.addEventListener("inputsourceschange",Z),_.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(I),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let X=null,ee=null,le=null;_.depth&&(le=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,X=_.stencil?rs:is,ee=_.stencil?Ys:Fr);let he={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:s};p=this.getBinding(),d=p.createProjectionLayer(he),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new ci(d.textureWidth,d.textureHeight,{format:Ji,type:Oi,depthTexture:new Dr(d.textureWidth,d.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let X={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,X),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),T=new ci(u.framebufferWidth,u.framebufferHeight,{format:Ji,type:Oi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Se.setContext(r),Se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let ce=new P,Le=new P;function ve(ue,X){X===null?ue.matrixWorld.copy(ue.matrix):ue.matrixWorld.multiplyMatrices(X.matrixWorld,ue.matrix),ue.matrixWorldInverse.copy(ue.matrixWorld).invert()}this.updateCamera=function(ue){if(r===null)return;let X=ue.near,ee=ue.far;v.texture!==null&&(v.depthNear>0&&(X=v.depthNear),v.depthFar>0&&(ee=v.depthFar)),K.near=j.near=U.near=X,K.far=j.far=U.far=ee,se===K.near&&re===K.far||(r.updateRenderState({depthNear:K.near,depthFar:K.far}),se=K.near,re=K.far),K.layers.mask=6|ue.layers.mask,U.layers.mask=-5&K.layers.mask,j.layers.mask=-3&K.layers.mask;let le=ue.parent,he=K.cameras;ve(K,le);for(let A=0;A<he.length;A++)ve(he[A],le);he.length===2?(function(A,E,C){ce.setFromMatrixPosition(E.matrixWorld),Le.setFromMatrixPosition(C.matrixWorld);let O=ce.distanceTo(Le),y=E.projectionMatrix.elements,z=C.projectionMatrix.elements,B=y[14]/(y[10]-1),R=y[14]/(y[10]+1),q=(y[9]+1)/y[5],Y=(y[9]-1)/y[5],J=(y[8]-1)/y[0],de=(z[8]+1)/z[0],ye=B*J,Ie=B*de,_e=O/(-J+de),Fe=_e*-J;if(E.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(Fe),A.translateZ(_e),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),y[10]===-1)A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let oe=B+_e,fe=R+_e,ge=ye-Fe,we=Ie+(O-Fe),Wt=q*R/fe*oe,ft=Y*R/fe*oe;A.projectionMatrix.makePerspective(ge,we,Wt,ft,oe,fe),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(K,U,j):K.projectionMatrix.copy(U.projectionMatrix),k===null&&ue.isPerspectiveCamera&&(k={camera:ue,fov:ue.fov,zoom:ue.zoom}),(function(A,E,C){C===null?A.matrix.copy(E.matrixWorld):(A.matrix.copy(C.matrixWorld),A.matrix.invert(),A.matrix.multiply(E.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(E.projectionMatrix),A.projectionMatrixInverse.copy(E.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*Go*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(ue,K,le)},this.getCamera=function(){return K},this.getFoveation=function(){if(d!==null||u!==null)return l},this.setFoveation=function(ue){l=ue,d!==null&&(d.fixedFoveation=ue),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=ue)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(K)},this.getCameraTexture=function(ue){return g[ue]};let Oe=null,Se=new Yf;Se.setAnimationLoop(function(ue,X){if(h=X.getViewerPose(c||a),m=X,h!==null){let ee=h.views;u!==null&&(e.setRenderTargetFramebuffer(T,u.framebuffer),e.setRenderTarget(T));let le=!1;ee.length!==K.cameras.length&&(K.cameras.length=0,le=!0);for(let A=0;A<ee.length;A++){let E=ee[A],C=null;if(u!==null)C=u.getViewport(E);else{let y=p.getViewSubImage(d,E);C=y.viewport,A===0&&(e.setRenderTargetTextures(T,y.colorTexture,y.depthStencilTexture),e.setRenderTarget(T))}let O=V[A];O===void 0&&(O=new Yn,O.layers.enable(A),O.viewport=new en,V[A]=O),O.matrix.fromArray(E.transform.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale),O.projectionMatrix.fromArray(E.projectionMatrix),O.projectionMatrixInverse.copy(O.projectionMatrix).invert(),O.viewport.set(C.x,C.y,C.width,C.height),A===0&&(K.matrix.copy(O.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale)),le===!0&&K.cameras.push(O)}let he=r.enabledFeatures;if(he&&he.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&f){p=n.getBinding();let A=p.getDepthInformation(ee[0]);A&&A.isValid&&A.texture&&v.init(A,r.renderState)}if(he&&he.includes("camera-access")&&f){e.state.unbindTexture(),p=n.getBinding();for(let A=0;A<ee.length;A++){let E=ee[A].camera;if(E){let C=g[E];C||(C=new Aa,g[E]=C);let O=p.getCameraImage(E);C.sourceTexture=O}}}}for(let ee=0;ee<S.length;ee++){let le=b[ee],he=S[ee];le!==null&&he!==void 0&&he.update(le,X,c||a)}Oe&&Oe(ue,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),m=null}),this.setAnimationLoop=function(ue){Oe=ue},this.dispose=function(){}}},T1=new pt,em=new st;function E1(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===Zn&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===Zn&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(r.envMap.value=o,r.envMapRotation.value.setFromMatrix4(T1.makeRotationFromEuler(l)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply(em),r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,xu(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,l){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(r,s):s.isMeshLambertMaterial?(n(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(r,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(r,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(c,h,p){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Zn&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.retroreflectivity>0&&(c.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=p.texture,c.transmissionSamplerSize.value.set(p.width,p.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(r,s,l)):s.isMeshMatcapMaterial?(n(r,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(c,h){let p=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(p.matrixWorld),c.nearDistance.value=p.shadow.camera.near,c.farDistance.value=p.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(c,h,p,d){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*p,c.scale.value=.5*d,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function w1(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(d,u,m,f){if((function(v,g,_,M){let T=v.value,S=g+"_"+_;if(M[S]===void 0)return typeof T=="number"||typeof T=="boolean"?M[S]=T:ArrayBuffer.isView(T)?M[S]=T.slice():M[S]=T.clone(),!0;{let b=M[S];if(typeof T=="number"||typeof T=="boolean"){if(b!==T)return M[S]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(b.equals(T)===!1)return b.copy(T),!0}}return!1})(d,u,m,f)===!0){let v=d.__offset,g=d.value;if(Array.isArray(g)){let _=0;for(let M=0;M<g.length;M++){let T=g[M],S=h(T);c(T,d.__data,_),typeof T=="number"||typeof T=="boolean"||T.isMatrix3||ArrayBuffer.isView(T)||(_+=S.storage/Float32Array.BYTES_PER_ELEMENT)}}else c(g,d.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,d.__data)}}function c(d,u,m){typeof d=="number"||typeof d=="boolean"?u[0]=d:d.isMatrix3?(u[0]=d.elements[0],u[1]=d.elements[1],u[2]=d.elements[2],u[3]=0,u[4]=d.elements[3],u[5]=d.elements[4],u[6]=d.elements[5],u[7]=0,u[8]=d.elements[6],u[9]=d.elements[7],u[10]=d.elements[8],u[11]=0):ArrayBuffer.isView(d)?u.set(new d.constructor(d.buffer,d.byteOffset,u.length)):d.toArray(u,m)}function h(d){let u={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(u.boundary=4,u.storage=4):d.isVector2?(u.boundary=8,u.storage=8):d.isVector3||d.isColor?(u.boundary=16,u.storage=12):d.isVector4?(u.boundary=16,u.storage=16):d.isMatrix3?(u.boundary=48,u.storage=48):d.isMatrix4?(u.boundary=64,u.storage=64):d.isTexture?Ye("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(d)?(u.boundary=16,u.storage=d.byteLength):Ye("WebGLRenderer: Unsupported uniform value type.",d),u}function p(d){let u=d.target;u.removeEventListener("dispose",p);let m=a.indexOf(u.__bindingPointIndex);a.splice(m,1),i.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}return{bind:function(d,u){let m=u.program;n.uniformBlockBinding(d,m)},update:function(d,u){let m=r[d.id];m===void 0&&((function(g){let _=g.uniforms,M=0,T=16;for(let b=0,I=_.length;b<I;b++){let F=Array.isArray(_[b])?_[b]:[_[b]];for(let k=0,U=F.length;k<U;k++){let j=F[k],V=Array.isArray(j.value)?j.value:[j.value];for(let K=0,se=V.length;K<se;K++){let re=h(V[K]),te=M%T,N=te%re.boundary,Z=te+N;M+=N,Z!==0&&T-Z<re.storage&&(M+=T-Z),j.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=M,M+=re.storage}}}let S=M%T;S>0&&(M+=T-S),g.__size=M,g.__cache={}})(d),m=(function(g){let _=(function(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=_;let M=i.createBuffer(),T=g.__size,S=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,T,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,M),M})(d),r[d.id]=m,d.addEventListener("dispose",p));let f=u.program;n.updateUBOMapping(d,f);let v=e.render.frame;s[d.id]!==v&&((function(g){let _=r[g.id],M=g.uniforms,T=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let S=0,b=M.length;S<b;S++){let I=M[S];if(Array.isArray(I))for(let F=0,k=I.length;F<k;F++)l(I[F],S,F,T);else l(I,S,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)})(d),s[d.id]=v)},dispose:function(){for(let d in r)i.deleteBuffer(r[d]);a=[],r={},s={}}}}em.set(-1,0,0,0,1,0,0,0,1);var A1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ki=null;function R1(){return Ki===null&&(Ki=new Zr(A1,16,16,ss,Zi),Ki.name="DFG_LUT",Ki.minFilter=Jn,Ki.magFilter=Jn,Ki.wrapS=Vl,Ki.wrapT=Vl,Ki.generateMipmaps=!1,Ki.needsUpdate=!0),Ki}var nc=class{constructor(e={}){let{canvas:t=ff(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Oi}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let f=u,v=new Set([Oh,Uh,Dh]),g=new Set([Oi,Fr,qa,Ys,Lh,Nh]),_=new Uint32Array(4),M=new Int32Array(4),T=new P,S=null,b=null,I=[],F=[],k=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let U=this,j=!1,V=null,K=null,se=null,re=null;this._outputColorSpace=fu;let te=0,N=0,Z=null,ce=-1,Le=null,ve=new en,Oe=new en,Se=null,ue=new ht(0),X=0,ee=t.width,le=t.height,he=1,A=null,E=null,C=new en(0,0,ee,le),O=new en(0,0,ee,le),y=!1,z=new Lr,B=!1,R=!1,q=new pt,Y=new P,J=new en,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ye=!1;function Ie(){return Z===null?he:1}let _e,Fe,oe,fe,ge,we,Wt,ft,be,at,Ne,St,$e,qt,Tt,Ft,jt,nn,sn,hi,On,gn,yn,G=n;function Yt(w,W){return t.getContext(w,W)}try{let w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",_r,!1),t.addEventListener("webglcontextcreationerror",on,!1),G===null){let W="webgl2";if(G=Yt(W,w),G===null)throw Yt(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}an()}catch(w){throw t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",_r,!1),t.removeEventListener("webglcontextcreationerror",on,!1),Qe("WebGLRenderer: "+w.message),w}function an(){_e=new Ox(G),_e.init(),On=new S1(G,_e),Fe=new Cx(G,_e,e,On),oe=new x1(G,_e),Fe.reversedDepthBuffer&&d&&oe.buffers.depth.setReversed(!0),K=G.createFramebuffer(),se=G.createFramebuffer(),re=G.createFramebuffer(),fe=new zx(G),ge=new s1,we=new y1(G,_e,oe,ge,Fe,On,fe),Wt=new Ux(U),ft=new W0(G),gn=new Ax(G,ft),be=new Fx(G,ft,fe,gn),at=new kx(G,be,ft,gn,fe),nn=new Vx(G,Fe,we),Tt=new Ix(ge),Ne=new r1(U,Wt,_e,Fe,gn,Tt),St=new E1(U,ge),$e=new o1,qt=new p1(_e),jt=new wx(U,Wt,oe,at,m,l),Ft=new v1(U,at,Fe),yn=new w1(G,fe,Fe,oe),sn=new Rx(G,_e,fe),hi=new Bx(G,_e,fe),fe.programs=Ne.programs,U.capabilities=Fe,U.extensions=_e,U.properties=ge,U.renderLists=$e,U.shadowMap=Ft,U.state=oe,U.info=fe}f!==Oi&&(k=new Hx(f,t.width,t.height,o,r,s));let vt=new ku(U,G);function ze(w){w.preventDefault(),_a("WebGLRenderer: Context Lost."),j=!0}function _r(){_a("WebGLRenderer: Context Restored."),j=!1;let w=fe.autoReset,W=Ft.enabled,Q=Ft.autoUpdate,ae=Ft.needsUpdate,ne=Ft.type;an(),fe.autoReset=w,Ft.enabled=W,Ft.autoUpdate=Q,Ft.needsUpdate=ae,Ft.type=ne}function on(w){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ut(w){let W=w.target;W.removeEventListener("dispose",ut),(function(Q){(function(ae){let ne=ge.get(ae).programs;ne!==void 0&&(ne.forEach(function(xe){Ne.releaseProgram(xe)}),ae.isShaderMaterial&&Ne.releaseShaderCache(ae))})(Q),ge.remove(Q)})(W)}function rn(w,W,Q,ae){V!==null&&w.isNodeMaterial&&V.setObject(ae,w),B===!0&&Tt.setState(w,Q,!1),w.transparent===!0&&w.side===Yi&&w.forceSinglePass===!1?(w.side=Zn,w.needsUpdate=!0,si(w,W,ae),w.side=Xs,w.needsUpdate=!0,si(w,W,ae),w.side=Yi):si(w,W,ae)}this.xr=vt,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let w=_e.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=_e.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(w){w!==void 0&&(he=w,this.setSize(ee,le,!1))},this.getSize=function(w){return w.set(ee,le)},this.setSize=function(w,W,Q=!0){vt.isPresenting?Ye("WebGLRenderer: Can't change size while VR device is presenting."):(ee=w,le=W,t.width=Math.floor(w*he),t.height=Math.floor(W*he),Q===!0&&(t.style.width=w+"px",t.style.height=W+"px"),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,w,W))},this.getDrawingBufferSize=function(w){return w.set(ee*he,le*he).floor()},this.setDrawingBufferSize=function(w,W,Q){ee=w,le=W,he=Q,t.width=Math.floor(w*Q),t.height=Math.floor(W*Q),this.setViewport(0,0,w,W)},this.setEffects=function(w){if(f!==Oi){if(w){for(let W=0;W<w.length;W++)if(w[W].isOutputPass===!0){Ye("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}k.setEffects(w||[])}else Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(w){return w.copy(ve)},this.getViewport=function(w){return w.copy(C)},this.setViewport=function(w,W,Q,ae){w.isVector4?C.set(w.x,w.y,w.z,w.w):C.set(w,W,Q,ae),oe.viewport(ve.copy(C).multiplyScalar(he).round())},this.getScissor=function(w){return w.copy(O)},this.setScissor=function(w,W,Q,ae){w.isVector4?O.set(w.x,w.y,w.z,w.w):O.set(w,W,Q,ae),oe.scissor(Oe.copy(O).multiplyScalar(he).round())},this.getScissorTest=function(){return y},this.setScissorTest=function(w){oe.setScissorTest(y=w)},this.setOpaqueSort=function(w){A=w},this.setTransparentSort=function(w){E=w},this.getClearColor=function(w){return w.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(w=!0,W=!0,Q=!0){let ae=0;if(w){let ne=!1;if(Z!==null){let xe=Z.texture.format;ne=v.has(xe)}if(ne){let xe=Z.texture.type,Te=g.has(xe),Re=jt.getClearColor(),Pe=jt.getClearAlpha(),Be=Re.r,Ze=Re.g,Je=Re.b;Te?(_[0]=Be,_[1]=Ze,_[2]=Je,_[3]=Pe,G.clearBufferuiv(G.COLOR,0,_)):(M[0]=Be,M[1]=Ze,M[2]=Je,M[3]=Pe,G.clearBufferiv(G.COLOR,0,M))}else ae|=G.COLOR_BUFFER_BIT}W&&(ae|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(ae|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ae!==0&&G.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),V=w},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",_r,!1),t.removeEventListener("webglcontextcreationerror",on,!1),jt.dispose(),$e.dispose(),qt.dispose(),ge.dispose(),Wt.dispose(),at.dispose(),gn.dispose(),yn.dispose(),Ne.dispose(),vt.dispose(),vt.removeEventListener("sessionstart",He),vt.removeEventListener("sessionend",Xt),Ut.stop()},this.renderBufferDirect=function(w,W,Q,ae,ne,xe){W===null&&(W=de);let Te=ne.isMesh&&ne.matrixWorld.determinantAffine()<0,Re=(function(rt,xt,We,Xe,D){xt.isScene!==!0&&(xt=de),we.resetTextureUnits();let ie=xt.fog,pe=Xe.isMeshStandardMaterial||Xe.isMeshLambertMaterial||Xe.isMeshPhongMaterial?xt.environment:null,et=Z===null?U.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Ct.workingColorSpace,lt=Xe.isMeshStandardMaterial||Xe.isMeshLambertMaterial&&!Xe.envMap||Xe.isMeshPhongMaterial&&!Xe.envMap,ot=Wt.get(Xe.envMap||pe,lt),Ge=Xe.vertexColors===!0&&!!We.attributes.color&&We.attributes.color.itemSize===4,Lt=!!We.attributes.tangent&&(!!Xe.normalMap||Xe.anisotropy>0),Gt=!!We.morphAttributes.position,ct=!!We.morphAttributes.normal,Nt=!!We.morphAttributes.color,Vt=Di;Xe.toneMapped&&(Z!==null&&Z.isXRRenderTarget!==!0||(Vt=U.toneMapping));let _t=We.morphAttributes.position||We.morphAttributes.normal||We.morphAttributes.color,Rn=_t!==void 0?_t.length:0,ke=ge.get(Xe),Cn=b.state.lights;if(B===!0&&(R===!0||rt!==Le)){let Kt=rt===Le&&Xe.id===ce;Tt.setState(Xe,rt,Kt)}let Sn=!1;Xe.version===ke.__version?ke.needsLights&&ke.lightsStateVersion!==Cn.state.version||ke.outputColorSpace!==et||D.isBatchedMesh&&ke.batching===!1?Sn=!0:D.isBatchedMesh||ke.batching!==!0?D.isBatchedMesh&&ke.batchingColor===!0&&D._colorsTexture===null||D.isBatchedMesh&&ke.batchingColor===!1&&D._colorsTexture!==null||D.isInstancedMesh&&ke.instancing===!1?Sn=!0:D.isInstancedMesh||ke.instancing!==!0?D.isSkinnedMesh&&ke.skinning===!1?Sn=!0:D.isSkinnedMesh||ke.skinning!==!0?D.isInstancedMesh&&ke.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&ke.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&ke.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&ke.instancingMorph===!1&&D.morphTexture!==null||ke.envMap!==ot||Xe.fog===!0&&ke.fog!==ie?Sn=!0:ke.numClippingPlanes===void 0||ke.numClippingPlanes===Tt.numPlanes&&ke.numIntersection===Tt.numIntersection?(ke.vertexAlphas!==Ge||ke.vertexTangents!==Lt||ke.morphTargets!==Gt||ke.morphNormals!==ct||ke.morphColors!==Nt||ke.toneMapping!==Vt||ke.morphTargetsCount!==Rn||!!ke.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Sn=!0):Sn=!0:Sn=!0:Sn=!0:Sn=!0:(Sn=!0,ke.__version=Xe.version);let kn=ke.currentProgram;Sn===!0&&(kn=si(Xe,xt,D),V&&Xe.isNodeMaterial&&V.onUpdateProgram(Xe,kn,ke));let nr=!1,_n=!1,Mn=!1,Et=kn.getUniforms(),Jt=ke.uniforms;if(oe.useProgram(kn.program)&&(nr=!0,_n=!0,Mn=!0),Xe.id!==ce&&(ce=Xe.id,_n=!0),ke.needsLights){let Kt=(function(Dn,xi){if(Dn.length===0)return null;if(Dn.length===1)return Dn[0].texture!==null?Dn[0]:null;T.setFromMatrixPosition(xi.matrixWorld);for(let ui=0,ir=Dn.length;ui<ir;ui++){let di=Dn[ui];if(di.texture!==null&&di.boundingBox.containsPoint(T))return di}return null})(b.state.lightProbeGridArray,D);ke.lightProbeGrid!==Kt&&(ke.lightProbeGrid=Kt,_n=!0)}if(nr||Le!==rt){oe.buffers.depth.getReversed()&&rt.reversedDepth!==!0&&(rt._reversedDepth=!0,rt.updateProjectionMatrix()),Et.setValue(G,"projectionMatrix",rt.projectionMatrix),Et.setValue(G,"viewMatrix",rt.matrixWorldInverse);let Kt=Et.map.cameraPosition;Kt!==void 0&&Kt.setValue(G,Y.setFromMatrixPosition(rt.matrixWorld)),Fe.logarithmicDepthBuffer&&Et.setValue(G,"logDepthBufFC",2/(Math.log(rt.far+1)/Math.LN2)),(Xe.isMeshPhongMaterial||Xe.isMeshToonMaterial||Xe.isMeshLambertMaterial||Xe.isMeshBasicMaterial||Xe.isMeshStandardMaterial||Xe.isShaderMaterial)&&Et.setValue(G,"isOrthographic",rt.isOrthographicCamera===!0),Le!==rt&&(Le=rt,_n=!0,Mn=!0)}if(ke.needsLights&&(Cn.state.sunShadowMap.length>0&&Et.setValue(G,"sunShadowMap",Cn.state.sunShadowMap,we),Cn.state.directionalShadowMap.length>0&&Et.setValue(G,"directionalShadowMap",Cn.state.directionalShadowMap,we),Cn.state.spotShadowMap.length>0&&Et.setValue(G,"spotShadowMap",Cn.state.spotShadowMap,we),Cn.state.pointShadowMap.length>0&&Et.setValue(G,"pointShadowMap",Cn.state.pointShadowMap,we)),D.isSkinnedMesh){Et.setOptional(G,D,"bindMatrix"),Et.setOptional(G,D,"bindMatrixInverse");let Kt=D.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),Et.setValue(G,"boneTexture",Kt.boneTexture,we))}D.isBatchedMesh&&(Et.setOptional(G,D,"batchingTexture"),Et.setValue(G,"batchingTexture",D._matricesTexture,we),Et.setOptional(G,D,"batchingIdTexture"),Et.setValue(G,"batchingIdTexture",D._indirectTexture,we),Et.setOptional(G,D,"batchingColorTexture"),D._colorsTexture!==null&&Et.setValue(G,"batchingColorTexture",D._colorsTexture,we));let Gn=We.morphAttributes;if(Gn.position===void 0&&Gn.normal===void 0&&Gn.color===void 0||nn.update(D,We,kn),(_n||ke.receiveShadow!==D.receiveShadow)&&(ke.receiveShadow=D.receiveShadow,Et.setValue(G,"receiveShadow",D.receiveShadow)),(Xe.isMeshStandardMaterial||Xe.isMeshLambertMaterial||Xe.isMeshPhongMaterial)&&Xe.envMap===null&&xt.environment!==null&&(Jt.envMapIntensity.value=xt.environmentIntensity),Jt.dfgLUT!==void 0&&(Jt.dfgLUT.value=R1()),_n){if(Et.setValue(G,"toneMappingExposure",U.toneMappingExposure),ke.needsLights&&(Dt=Mn,(vn=Jt).ambientLightColor.needsUpdate=Dt,vn.lightProbe.needsUpdate=Dt,vn.sunLights.needsUpdate=Dt,vn.sunLightShadows.needsUpdate=Dt,vn.directionalLights.needsUpdate=Dt,vn.directionalLightShadows.needsUpdate=Dt,vn.pointLights.needsUpdate=Dt,vn.pointLightShadows.needsUpdate=Dt,vn.spotLights.needsUpdate=Dt,vn.spotLightShadows.needsUpdate=Dt,vn.rectAreaLights.needsUpdate=Dt,vn.hemisphereLights.needsUpdate=Dt),ie&&Xe.fog===!0&&St.refreshFogUniforms(Jt,ie),St.refreshMaterialUniforms(Jt,Xe,he,le,b.state.transmissionRenderTarget[rt.id]),ke.needsLights&&ke.lightProbeGrid){let Kt=ke.lightProbeGrid;Jt.probesSH.value=Kt.texture,Jt.probesMin.value.copy(Kt.boundingBox.min),Jt.probesMax.value.copy(Kt.boundingBox.max),Jt.probesResolution.value.copy(Kt.resolution)}Zs.upload(G,dn(ke),Jt,we)}var vn,Dt;if(Xe.isShaderMaterial&&Xe.uniformsNeedUpdate===!0&&(Zs.upload(G,dn(ke),Jt,we),Xe.uniformsNeedUpdate=!1),Xe.isSpriteMaterial&&Et.setValue(G,"center",D.center),Et.setValue(G,"modelViewMatrix",D.modelViewMatrix),Et.setValue(G,"normalMatrix",D.normalMatrix),Et.setValue(G,"modelMatrix",D.matrixWorld),Xe.uniformsGroups!==void 0){let Kt=Xe.uniformsGroups;for(let Dn=0,xi=Kt.length;Dn<xi;Dn++){let ui=Kt[Dn];yn.update(ui,kn),yn.bind(ui,kn)}}return kn})(w,W,Q,ae,ne);oe.setMaterial(ae,Te);let Pe=Q.index,Be=1;if(ae.wireframe===!0){if(Pe=be.getWireframeAttribute(Q),Pe===void 0)return;Be=2}let Ze=Q.drawRange,Je=Q.attributes.position,Ue=Ze.start*Be,gt=(Ze.start+Ze.count)*Be;xe!==null&&(Ue=Math.max(Ue,xe.start*Be),gt=Math.min(gt,(xe.start+xe.count)*Be)),Pe!==null?(Ue=Math.max(Ue,0),gt=Math.min(gt,Pe.count)):Je!=null&&(Ue=Math.max(Ue,0),gt=Math.min(gt,Je.count));let ln=gt-Ue;if(ln<0||ln===1/0)return;let Bt;gn.setup(ne,ae,Re,Q,Pe);let zt=sn;if(Pe!==null&&(Bt=ft.get(Pe),zt=hi,zt.setIndex(Bt)),ne.isMesh)ae.wireframe===!0?(oe.setLineWidth(ae.wireframeLinewidth*Ie()),zt.setMode(G.LINES)):zt.setMode(G.TRIANGLES);else if(ne.isLine){let rt=ae.linewidth;rt===void 0&&(rt=1),oe.setLineWidth(rt*Ie()),ne.isLineSegments?zt.setMode(G.LINES):ne.isLineLoop?zt.setMode(G.LINE_LOOP):zt.setMode(G.LINE_STRIP)}else ne.isPoints?zt.setMode(G.POINTS):ne.isSprite&&zt.setMode(G.TRIANGLES);if(ne.isBatchedMesh)if(_e.get("WEBGL_multi_draw"))zt.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{let rt=ne._multiDrawStarts,xt=ne._multiDrawCounts,We=ne._multiDrawCount,Xe=Pe?ft.get(Pe).bytesPerElement:1,D=ge.get(ae).currentProgram.getUniforms();for(let ie=0;ie<We;ie++)D.setValue(G,"_gl_DrawID",ie),zt.render(rt[ie]/Xe,xt[ie])}else if(ne.isInstancedMesh)zt.renderInstances(Ue,ln,ne.count);else if(Q.isInstancedBufferGeometry){let rt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,xt=Math.min(Q.instanceCount,rt);zt.renderInstances(Ue,ln,xt)}else zt.render(Ue,ln)},this.compile=function(w,W,Q=null){Q===null&&(Q=w),V!==null&&V.renderStart(w,W,Q),b=qt.get(Q),b.init(W),F.push(b),Q.traverseVisible(function(ne){ne.isLight&&ne.layers.test(W.layers)&&(b.pushLight(ne),ne.castShadow&&b.pushShadow(ne))}),w!==Q&&w.traverseVisible(function(ne){ne.isLight&&ne.layers.test(W.layers)&&(b.pushLight(ne),ne.castShadow&&b.pushShadow(ne))}),b.setupLights(),V!==null&&V.updateLights(b.state.lightsArray),R=this.localClippingEnabled,B=Tt.init(this.clippingPlanes,R),B===!0&&Tt.setGlobalState(this.clippingPlanes,W),V!==null&&Ft.render(b.state.shadowsArray,Q,W);let ae=new Set;return w.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;let xe=ne.material;if(xe)if(Array.isArray(xe))for(let Te=0;Te<xe.length;Te++){let Re=xe[Te];rn(Re,Q,W,ne),ae.add(Re)}else rn(xe,Q,W,ne),ae.add(xe)}),b=F.pop(),V!==null&&V.renderEnd(),ae},this.compileAsync=function(w,W,Q=null){let ae=this.compile(w,W,Q);return new Promise(ne=>{function xe(){ae.forEach(function(Te){let Re=ge.get(Te).currentProgram;(Re===void 0||Re.isReady())&&ae.delete(Te)}),ae.size!==0?setTimeout(xe,10):ne(w)}_e.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Fi=null;function He(){Ut.stop()}function Xt(){Ut.start()}let Ut=new Yf;function ri(w,W,Q,ae){if(w.visible===!1)return;if(w.layers.test(W.layers)){if(w.isGroup)Q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(W);else if(w.isLightProbeGrid)b.pushLightProbeGrid(w);else if(w.isLight)b.pushLight(w),w.castShadow&&b.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(z)){ae&&J.setFromMatrixPosition(w.matrixWorld).applyMatrix4(q);let xe=at.update(w),Te=w.material;Te.visible&&S.push(w,xe,Te,Q,J.z,null,W)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(z))){let xe=at.update(w),Te=w.material;if(ae&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),J.copy(w.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),J.copy(xe.boundingSphere.center)),J.applyMatrix4(w.matrixWorld).applyMatrix4(q)),Array.isArray(Te)){let Re=xe.groups;for(let Pe=0,Be=Re.length;Pe<Be;Pe++){let Ze=Re[Pe],Je=Te[Ze.materialIndex];Je&&Je.visible&&S.push(w,xe,Je,Q,J.z,Ze,W)}}else Te.visible&&S.push(w,xe,Te,Q,J.z,null,W)}}let ne=w.children;for(let xe=0,Te=ne.length;xe<Te;xe++)ri(ne[xe],W,Q,ae)}function tr(w,W,Q,ae){let{opaque:ne,transmissive:xe,transparent:Te}=w;b.setupLightsView(Q),B===!0&&Tt.setGlobalState(U.clippingPlanes,Q),ae&&oe.viewport(ve.copy(ae)),ne.length>0&&Fn(ne,W,Q),xe.length>0&&Fn(xe,W,Q),Te.length>0&&Fn(Te,W,Q),oe.buffers.depth.setTest(!0),oe.buffers.depth.setMask(!0),oe.buffers.color.setMask(!0),oe.setPolygonOffset(!1)}function Qn(w,W,Q,ae){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[ae.id]===void 0){let Je=_e.has("EXT_color_buffer_half_float")||_e.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[ae.id]=new ci(1,1,{generateMipmaps:!0,type:Je?Zi:Oi,minFilter:ns,samples:Math.max(4,Fe.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ct.workingColorSpace})}let ne=b.state.transmissionRenderTarget[ae.id],xe=ae.viewport||ve;ne.setSize(xe.z*U.transmissionResolutionScale,xe.w*U.transmissionResolutionScale);let Te=U.getRenderTarget(),Re=U.getActiveCubeFace(),Pe=U.getActiveMipmapLevel();U.setRenderTarget(ne),U.getClearColor(ue),X=U.getClearAlpha(),X<1&&U.setClearColor(16777215,.5),U.clear(),ye&&jt.render(Q);let Be=U.toneMapping;U.toneMapping=Di;let Ze=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),b.setupLightsView(ae),B===!0&&Tt.setGlobalState(U.clippingPlanes,ae),Fn(w,Q,ae),we.updateMultisampleRenderTarget(ne),we.updateRenderTargetMipmap(ne),_e.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Ue=0,gt=W.length;Ue<gt;Ue++){let ln=W[Ue],{object:Bt,geometry:zt,material:rt,group:xt}=ln;if(rt.side===Yi&&Bt.layers.test(ae.layers)){let We=rt.side;rt.side=Zn,rt.needsUpdate=!0,Bn(Bt,Q,ae,zt,rt,xt),rt.side=We,rt.needsUpdate=!0,Je=!0}}Je===!0&&(we.updateMultisampleRenderTarget(ne),we.updateRenderTargetMipmap(ne))}U.setRenderTarget(Te,Re,Pe),U.setClearColor(ue,X),Ze!==void 0&&(ae.viewport=Ze),U.toneMapping=Be}function Fn(w,W,Q){let ae=W.isScene===!0?W.overrideMaterial:null;for(let ne=0,xe=w.length;ne<xe;ne++){let Te=w[ne],{object:Re,geometry:Pe,group:Be}=Te,Ze=Te.material;Ze.allowOverride===!0&&ae!==null&&(Ze=ae),Re.layers.test(Q.layers)&&Bn(Re,W,Q,Pe,Ze,Be)}}function Bn(w,W,Q,ae,ne,xe){V!==null&&ne.isNodeMaterial&&V.setObject(w,ne),w.onBeforeRender(U,W,Q,ae,ne,xe),w.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),ne.onBeforeRender(U,W,Q,ae,w,xe),ne.transparent===!0&&ne.side===Yi&&ne.forceSinglePass===!1?(ne.side=Zn,ne.needsUpdate=!0,U.renderBufferDirect(Q,W,ae,ne,w,xe),ne.side=Xs,ne.needsUpdate=!0,U.renderBufferDirect(Q,W,ae,ne,w,xe),ne.side=Yi):U.renderBufferDirect(Q,W,ae,ne,w,xe),w.onAfterRender(U,W,Q,ae,ne,xe)}function si(w,W,Q){W.isScene!==!0&&(W=de);let ae=ge.get(w),ne=b.state.lights,xe=b.state.shadowsArray,Te=ne.state.version,Re=Ne.getParameters(w,ne.state,xe,W,Q,b.state.lightProbeGridArray),Pe=Ne.getProgramCacheKey(Re),Be=ae.programs;ae.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?W.environment:null,ae.fog=W.fog;let Ze=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;ae.envMap=Wt.get(w.envMap||ae.environment,Ze),ae.envMapRotation=ae.environment!==null&&w.envMap===null?W.environmentRotation:w.envMapRotation,Be===void 0&&(w.addEventListener("dispose",ut),Be=new Map,ae.programs=Be);let Je=Be.get(Pe);if(Je!==void 0){if(ae.currentProgram===Je&&ae.lightsStateVersion===Te)return An(w,Re),Je}else Re.uniforms=Ne.getUniforms(w),V!==null&&w.isNodeMaterial&&V.build(w,Q,Re),w.onBeforeCompile(Re,U),Je=Ne.acquireProgram(Re,Pe),Be.set(Pe,Je),ae.uniforms=Re.uniforms;let Ue=ae.uniforms;return(w.isShaderMaterial||w.isRawShaderMaterial)&&w.clipping!==!0||(Ue.clippingPlanes=Tt.uniform),An(w,Re),ae.needsLights=(function(gt){return gt.isMeshLambertMaterial||gt.isMeshToonMaterial||gt.isMeshPhongMaterial||gt.isMeshStandardMaterial||gt.isShadowMaterial||gt.isShaderMaterial&&gt.lights===!0})(w),ae.lightsStateVersion=Te,ae.needsLights&&(Ue.ambientLightColor.value=ne.state.ambient,Ue.lightProbe.value=ne.state.probe,Ue.sunLights.value=ne.state.sun,Ue.sunLightShadows.value=ne.state.sunShadow,Ue.directionalLights.value=ne.state.directional,Ue.directionalLightShadows.value=ne.state.directionalShadow,Ue.spotLights.value=ne.state.spot,Ue.spotLightShadows.value=ne.state.spotShadow,Ue.rectAreaLights.value=ne.state.rectArea,Ue.ltc_1.value=ne.state.rectAreaLTC1,Ue.ltc_2.value=ne.state.rectAreaLTC2,Ue.pointLights.value=ne.state.point,Ue.pointLightShadows.value=ne.state.pointShadow,Ue.hemisphereLights.value=ne.state.hemi,Ue.sunShadowMatrix.value=ne.state.sunShadowMatrix,Ue.sunShadowCascade.value=ne.state.sunShadowCascade,Ue.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,Ue.spotLightMatrix.value=ne.state.spotLightMatrix,Ue.spotLightMap.value=ne.state.spotLightMap,Ue.pointShadowMatrix.value=ne.state.pointShadowMatrix),ae.lightProbeGrid=b.state.lightProbeGridArray.length>0,ae.currentProgram=Je,ae.uniformsList=null,Je}function dn(w){if(w.uniformsList===null){let W=w.currentProgram.getUniforms();w.uniformsList=Zs.seqWithValue(W.seq,w.uniforms)}return w.uniformsList}function An(w,W){let Q=ge.get(w);Q.outputColorSpace=W.outputColorSpace,Q.batching=W.batching,Q.batchingColor=W.batchingColor,Q.instancing=W.instancing,Q.instancingColor=W.instancingColor,Q.instancingMorph=W.instancingMorph,Q.skinning=W.skinning,Q.morphTargets=W.morphTargets,Q.morphNormals=W.morphNormals,Q.morphColors=W.morphColors,Q.morphTargetsCount=W.morphTargetsCount,Q.numClippingPlanes=W.numClippingPlanes,Q.numIntersection=W.numClipIntersection,Q.vertexAlphas=W.vertexAlphas,Q.vertexTangents=W.vertexTangents,Q.toneMapping=W.toneMapping}function Nn(w){let W=ge.get(w);return W.__readFormat===w.format&&W.__readType===w.type||(W.__readFormat=w.format,W.__readType=w.type,W.__formatReadable=Fe.textureFormatReadable(w.format),W.__typeReadable=Fe.textureTypeReadable(w.type)),W}Ut.setAnimationLoop(function(w){Fi&&Fi(w)}),typeof self<"u"&&Ut.setContext(self),this.setAnimationLoop=function(w){Fi=w,vt.setAnimationLoop(w),w===null?Ut.stop():Ut.start()},vt.addEventListener("sessionstart",He),vt.addEventListener("sessionend",Xt),this.render=function(w,W){if(W!==void 0&&W.isCamera!==!0)return void Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(j===!0)return;V!==null&&V.renderStart(w,W);let Q=vt.enabled===!0&&vt.isPresenting===!0,ae=k!==null&&(Z===null||Q)&&k.begin(U,Z);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),vt.enabled!==!0||vt.isPresenting!==!0||k!==null&&k.isCompositing()!==!1||(vt.cameraAutoUpdate===!0&&vt.updateCamera(W),W=vt.getCamera()),w.isScene===!0&&w.onBeforeRender(U,w,W,Z),b=qt.get(w,F.length),b.init(W),b.state.textureUnits=we.getTextureUnits(),F.push(b),q.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),z.setFromProjectionMatrix(q,_u,W.reversedDepth),R=this.localClippingEnabled,B=Tt.init(this.clippingPlanes,R),S=$e.get(w,I.length),S.init(),I.push(S),vt.enabled===!0&&vt.isPresenting===!0){let xe=U.xr.getDepthSensingMesh();xe!==null&&ri(xe,W,-1/0,U.sortObjects)}ri(w,W,0,U.sortObjects),S.finish(),V!==null&&V.updateLights(b.state.lightsArray),U.sortObjects===!0&&S.sort(A,E),ye=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,ye&&jt.addToRenderList(S,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),B===!0&&Tt.beginShadows();let ne=b.state.shadowsArray;if(Ft.render(ne,w,W),B===!0&&Tt.endShadows(),(ae&&k.hasRenderPass())===!1){let xe=S.opaque,Te=S.transmissive;if(b.setupLights(),W.isArrayCamera){let Re=W.cameras;if(Te.length>0)for(let Pe=0,Be=Re.length;Pe<Be;Pe++)Qn(xe,Te,w,Re[Pe]);ye&&jt.render(w);for(let Pe=0,Be=Re.length;Pe<Be;Pe++){let Ze=Re[Pe];tr(S,w,Ze,Ze.viewport)}}else Te.length>0&&Qn(xe,Te,w,W),ye&&jt.render(w),tr(S,w,W)}Z!==null&&N===0&&(we.updateMultisampleRenderTarget(Z),we.updateRenderTargetMipmap(Z)),ae&&k.end(U),w.isScene===!0&&w.onAfterRender(U,w,W),gn.resetDefaultState(),ce=-1,Le=null,F.pop(),F.length>0?(b=F[F.length-1],we.setTextureUnits(b.state.textureUnits),B===!0&&Tt.setGlobalState(U.clippingPlanes,b.state.camera)):b=null,I.pop(),S=I.length>0?I[I.length-1]:null,V!==null&&V.renderEnd()},this.getActiveCubeFace=function(){return te},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return Z},this.setRenderTargetTextures=function(w,W,Q){let ae=ge.get(w);ae.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,ae.__autoAllocateDepthBuffer===!1&&(ae.__useRenderToTexture=!1),ge.get(w.texture).__webglTexture=W,ge.get(w.depthTexture).__webglTexture=ae.__autoAllocateDepthBuffer?void 0:Q,ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,W){let Q=ge.get(w);Q.__webglFramebuffer=W,Q.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(w,W=0,Q=0){Z=w,te=W,N=Q;let ae=null,ne=!1,xe=!1;if(w){let Te=ge.get(w);if(Te.__useDefaultFramebuffer!==void 0)return oe.bindFramebuffer(G.FRAMEBUFFER,Te.__webglFramebuffer),ve.copy(w.viewport),Oe.copy(w.scissor),Se=w.scissorTest,oe.viewport(ve),oe.scissor(Oe),oe.setScissorTest(Se),void(ce=-1);if(Te.__webglFramebuffer===void 0)we.setupRenderTarget(w);else if(Te.__hasExternalTextures)we.rebindTextures(w,ge.get(w.texture).__webglTexture,ge.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Be=w.depthTexture;if(Te.__boundDepthTexture!==Be){if(Be!==null&&ge.has(Be)&&(w.width!==Be.image.width||w.height!==Be.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");we.setupDepthRenderbuffer(w)}}let Re=w.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(xe=!0);let Pe=ge.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(ae=Array.isArray(Pe[W])?Pe[W][Q]:Pe[W],ne=!0):ae=w.samples>0&&we.useMultisampledRTT(w)===!1?ge.get(w).__webglMultisampledFramebuffer:Array.isArray(Pe)?Pe[Q]:Pe,ve.copy(w.viewport),Oe.copy(w.scissor),Se=w.scissorTest}else ve.copy(C).multiplyScalar(he).floor(),Oe.copy(O).multiplyScalar(he).floor(),Se=y;if(Q!==0&&(ae=K),oe.bindFramebuffer(G.FRAMEBUFFER,ae)&&oe.drawBuffers(w,ae),oe.viewport(ve),oe.scissor(Oe),oe.setScissorTest(Se),ne){let Te=ge.get(w.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+W,Te.__webglTexture,Q)}else if(xe){let Te=W;for(let Re=0;Re<w.textures.length;Re++){let Pe=ge.get(w.textures[Re]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Re,Pe.__webglTexture,Q,Te)}}else if(w!==null&&Q!==0){let Te=ge.get(w.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Te.__webglTexture,Q)}ce=-1},this.readRenderTargetPixels=function(w,W,Q,ae,ne,xe,Te,Re=0){if(!w||!w.isWebGLRenderTarget)return void Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=ge.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Te!==void 0&&(Pe=Pe[Te]),Pe){oe.bindFramebuffer(G.FRAMEBUFFER,Pe);try{let Be=w.textures[Re],Ze=Be.format,Je=Be.type;w.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Re);let Ue=Nn(Be);if(Ue.__formatReadable===!1)return void Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(Ue.__typeReadable===!1)return void Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");W>=0&&W<=w.width-ae&&Q>=0&&Q<=w.height-ne&&G.readPixels(W,Q,ae,ne,On.convert(Ze),On.convert(Je),xe)}finally{let Be=Z!==null?ge.get(Z).__webglFramebuffer:null;oe.bindFramebuffer(G.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(w,W,Q,ae,ne,xe,Te,Re=0){if(!w||!w.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=ge.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Te!==void 0&&(Pe=Pe[Te]),Pe){if(W>=0&&W<=w.width-ae&&Q>=0&&Q<=w.height-ne){oe.bindFramebuffer(G.FRAMEBUFFER,Pe);let Be=w.textures[Re],Ze=Be.format,Je=Be.type;w.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Re);let Ue=Nn(Be);if(Ue.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ue.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let gt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,gt),G.bufferData(G.PIXEL_PACK_BUFFER,xe.byteLength,G.STREAM_READ),G.readPixels(W,Q,ae,ne,On.convert(Ze),On.convert(Je),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let ln=Z!==null?ge.get(Z).__webglFramebuffer:null;oe.bindFramebuffer(G.FRAMEBUFFER,ln);let Bt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await gf(G,Bt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,gt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,xe),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(gt),G.deleteSync(Bt),xe}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,W=null,Q=0){let ae=Math.pow(2,-Q),ne=Math.floor(w.image.width*ae),xe=Math.floor(w.image.height*ae),Te=W!==null?W.x:0,Re=W!==null?W.y:0;we.setTexture2D(w,0),G.copyTexSubImage2D(G.TEXTURE_2D,Q,0,0,Te,Re,ne,xe),oe.unbindTexture()},this.copyTextureToTexture=function(w,W,Q=null,ae=null,ne=0,xe=0){let Te,Re,Pe,Be,Ze,Je,Ue,gt,ln,Bt=w.isCompressedTexture?w.mipmaps[xe]:w.image;if(Q!==null)Te=Q.max.x-Q.min.x,Re=Q.max.y-Q.min.y,Pe=Q.isBox3?Q.max.z-Q.min.z:1,Be=Q.min.x,Ze=Q.min.y,Je=Q.isBox3?Q.min.z:0;else{let ot=Math.pow(2,-ne);Te=Math.floor(Bt.width*ot),Re=Math.floor(Bt.height*ot),Pe=w.isDataArrayTexture?Bt.depth:w.isData3DTexture?Math.floor(Bt.depth*ot):1,Be=0,Ze=0,Je=0}ae!==null?(Ue=ae.x,gt=ae.y,ln=ae.z):(Ue=0,gt=0,ln=0);let zt=On.convert(W.format),rt=On.convert(W.type),xt;W.isData3DTexture?(we.setTexture3D(W,0),xt=G.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(we.setTexture2DArray(W,0),xt=G.TEXTURE_2D_ARRAY):(we.setTexture2D(W,0),xt=G.TEXTURE_2D),oe.activeTexture(G.TEXTURE0),oe.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,W.flipY),oe.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),oe.pixelStorei(G.UNPACK_ALIGNMENT,W.unpackAlignment);let We=oe.getParameter(G.UNPACK_ROW_LENGTH),Xe=oe.getParameter(G.UNPACK_IMAGE_HEIGHT),D=oe.getParameter(G.UNPACK_SKIP_PIXELS),ie=oe.getParameter(G.UNPACK_SKIP_ROWS),pe=oe.getParameter(G.UNPACK_SKIP_IMAGES);oe.pixelStorei(G.UNPACK_ROW_LENGTH,Bt.width),oe.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Bt.height),oe.pixelStorei(G.UNPACK_SKIP_PIXELS,Be),oe.pixelStorei(G.UNPACK_SKIP_ROWS,Ze),oe.pixelStorei(G.UNPACK_SKIP_IMAGES,Je);let et=w.isDataArrayTexture||w.isData3DTexture,lt=W.isDataArrayTexture||W.isData3DTexture;if(w.isDepthTexture){let ot=ge.get(w),Ge=ge.get(W),Lt=ge.get(ot.__renderTarget),Gt=ge.get(Ge.__renderTarget);oe.bindFramebuffer(G.READ_FRAMEBUFFER,Lt.__webglFramebuffer),oe.bindFramebuffer(G.DRAW_FRAMEBUFFER,Gt.__webglFramebuffer);for(let ct=0;ct<Pe;ct++)et&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ge.get(w).__webglTexture,ne,Je+ct),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ge.get(W).__webglTexture,xe,ln+ct)),G.blitFramebuffer(Be,Ze,Te,Re,Ue,gt,Te,Re,G.DEPTH_BUFFER_BIT,G.NEAREST);oe.bindFramebuffer(G.READ_FRAMEBUFFER,null),oe.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(ne!==0||w.isRenderTargetTexture||ge.has(w)){let ot=ge.get(w),Ge=ge.get(W);oe.bindFramebuffer(G.READ_FRAMEBUFFER,se),oe.bindFramebuffer(G.DRAW_FRAMEBUFFER,re);for(let Lt=0;Lt<Pe;Lt++)et?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ot.__webglTexture,ne,Je+Lt):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,ot.__webglTexture,ne),lt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ge.__webglTexture,xe,ln+Lt):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ge.__webglTexture,xe),ne!==0?G.blitFramebuffer(Be,Ze,Te,Re,Ue,gt,Te,Re,G.COLOR_BUFFER_BIT,G.NEAREST):lt?G.copyTexSubImage3D(xt,xe,Ue,gt,ln+Lt,Be,Ze,Te,Re):G.copyTexSubImage2D(xt,xe,Ue,gt,Be,Ze,Te,Re);oe.bindFramebuffer(G.READ_FRAMEBUFFER,null),oe.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else lt?w.isDataTexture||w.isData3DTexture?G.texSubImage3D(xt,xe,Ue,gt,ln,Te,Re,Pe,zt,rt,Bt.data):W.isCompressedArrayTexture?G.compressedTexSubImage3D(xt,xe,Ue,gt,ln,Te,Re,Pe,zt,Bt.data):G.texSubImage3D(xt,xe,Ue,gt,ln,Te,Re,Pe,zt,rt,Bt):w.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,xe,Ue,gt,Te,Re,zt,rt,Bt.data):w.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,xe,Ue,gt,Bt.width,Bt.height,zt,Bt.data):G.texSubImage2D(G.TEXTURE_2D,xe,Ue,gt,Te,Re,zt,rt,Bt);oe.pixelStorei(G.UNPACK_ROW_LENGTH,We),oe.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Xe),oe.pixelStorei(G.UNPACK_SKIP_PIXELS,D),oe.pixelStorei(G.UNPACK_SKIP_ROWS,ie),oe.pixelStorei(G.UNPACK_SKIP_IMAGES,pe),xe===0&&W.generateMipmaps&&G.generateMipmap(xt),oe.unbindTexture()},this.initRenderTarget=function(w){ge.get(w).__webglFramebuffer===void 0&&we.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?we.setTextureCube(w,0):w.isData3DTexture?we.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?we.setTexture2DArray(w,0):we.setTexture2D(w,0),oe.unbindTexture()},this.resetState=function(){te=0,N=0,Z=null,oe.reset(),gn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _u}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ct._getUnpackColorSpace()}};var fr={normal:1,related:.85,weak:.5,quiet:.3,away:.1},im=3,Hu=i=>i.normalize("NFD").replace(/\p{M}/gu,"").toLowerCase();function Wu(i,e,t=8){let n=Hu(e).split(/\s+/).filter(Boolean);return n.length?i.map(r=>{let s=Hu(r.title),a=Hu(`${r.title} ${r.body} ${r.extra}`);if(!n.every(l=>a.includes(l)))return null;let o=n.reduce((l,c)=>l+(s.startsWith(c)?3:s.includes(c)?2:1),0)+r.weight*.1;return{item:r,score:o}}).filter(Boolean).sort((r,s)=>s.score-r.score||r.item.order-s.item.order).slice(0,t).map(({item:r})=>r):[]}function sc(i,e){let t=i[e],n=new Map(i.map((a,o)=>[a.id,o])),r=new Set(t.links.filter(a=>n.has(a)&&a!==t.id).map(a=>n.get(a)));i.forEach((a,o)=>o!==e&&a.links.includes(t.id)&&r.add(o));let s=new Set;for(let[a,o]of Object.entries(t.members))for(let l of o){let c=i.map((p,d)=>p.members[a]?.includes(l)?d:-1).filter(p=>p>=0),h=c.indexOf(e);for(let p of[c[h-1],c[h+1]])p!==void 0&&!r.has(p)&&s.add(p)}return{links:[...r].sort((a,o)=>a-o),near:[...s].sort((a,o)=>a-o)}}function Xu(i,e,t=im){let n=i[e],{links:r,near:s}=sc(i,e),a=new Set(r),o=c=>Object.entries(n.members).reduce((h,[p,d])=>h+d.filter(u=>c.members[p]?.includes(u)).length,0),l=c=>(a.has(c)?100:0)+o(i[c])*10+1/(1+Math.abs(i[c].year-n.year));return[...r,...s].sort((c,h)=>l(h)-l(c)||c-h).slice(0,t)}function rm(i,e,t=im){let{links:n}=sc(i,e);return Xu(i,e,1/0).filter(r=>n.includes(r)).slice(0,t)}function sm(i,e,t=3,n=3){let r=i.map((a,o)=>[a,o]).filter(([a])=>a.period===e).sort((a,o)=>o[0].weight-a[0].weight||a[0].year-o[0].year||a[1]-o[1]),s=[];for(let[a,o]of r){if(s.length>=t)break;s.every(([l])=>!a.position||!l.position||Math.hypot(...a.position.map((c,h)=>c-l.position[h]))>=n)&&s.push([a,o])}return s.map(([,a])=>a)}function am(i,e,t=null){if(!t)return{previous:e>0?e-1:null,next:e<i.length-1?e+1:null};let n=ac(i,t),r=n.indexOf(e);return r<0?{previous:n.findLast(s=>s<e)??null,next:n.find(s=>s>e)??null}:{previous:n[r-1]??null,next:n[r+1]??null}}function om(i,e,t,n,r=3){let s=rr.flatMap(a=>(e[a]??[]).map((o,l)=>({facet:a,item:l,title:t[a]?.[o]??o,body:"",extra:"",count:ac(i,{facet:a,item:l}).length}))).filter(a=>a.count>0);return Wu(s.map((a,o)=>({...a,weight:Math.min(3,a.count/4),order:o})),n,r)}function lm(i,{selected:e=-1,near:t=new Set,weak:n=new Set,filter:r=null}){return i.map((s,a)=>{let o=fr.normal;return e>=0&&(o=a===e?1:t.has(a)?fr.related:n.has(a)?fr.weak:fr.quiet),r&&!(s.members[r.facet]??[]).includes(r.item)&&(o=a===e?1:Math.min(o,fr.away)),o})}var cm=(i,e)=>i.map((t,n)=>e.has(n)?1:fr.quiet),hm=(i,e)=>[...i].map(t=>[t,e,!0]),ac=(i,e)=>e?i.map((t,n)=>(t.members[e.facet]??[]).includes(e.item)?n:-1).filter(t=>t>=0):[];function um(i,e){let t=[];return e.forEach((n,r)=>r>0&&t.push([e[r-1],n,i[e[r-1]].period!==i[n].period])),t}function dm(i,e,t){let n=new Array(t).fill(0);for(let r of e)i[r].period>=0&&n[i[r].period]++;return n}var C1=10,I1=3,P1=8,tm=[[1,0],[-1,0],[0,1],[0,-1]],nm=[[1,1],[-1,1],[1,-1],[-1,-1]];function pm({x:i,y:e,r:t},{width:n,height:r},s,a=12){let o=t+C1,l=(d,u,m,f)=>{let v=u===0?i+d*m-(d<0?n:0):Math.min(Math.max(i-n/2,a),s-n-a),g=u===0?e-r/2:u>0?e+m-2:e-m+2-r;return{left:v,right:v+n,top:g,bottom:g+r,far:f}},c=(d,u,m,f)=>{let v=i+d*m-(d<0?n:0),g=e+u*m-(u<0?r:0);return{left:v,right:v+n,top:g,bottom:g+r,far:f}},h=r+4,p=Array.from({length:I1},(d,u)=>o+(u+1)*h);return[...tm.map(([d,u])=>l(d,u,o,!1)),...nm.map(([d,u])=>c(d,u,o,!1)),...p.flatMap(d=>[...tm.map(([u,m])=>l(u,m,d,!0)),...nm.map(([u,m])=>c(u,m,d,!0))])]}function fm(i,{free:e,clear:t,inside:n,forced:r=!1,keep:s=-1}){let a=s>=0?i.find(o=>o.slot===s):void 0;return a&&e(a)&&t(a)?a:i.find(o=>e(o)&&t(o))??i.find(e)??(r?i.find(o=>o.far===!1&&n(o))??i[0]:null)}function qu(i,{x:e,y:t,r:n}){let r=Math.min(Math.max(e,i.left),i.right),s=Math.min(Math.max(t,i.top),i.bottom),a=Math.hypot(e-r,t-s)-n*.45;return a>4?{x:r-i.left,y:s-i.top,length:a,angle:Math.atan2(t-s,e-r)}:null}var mm=i=>Math.min(i,70)+P1;function gm(i){let e=new Map;return i.forEach((t,n)=>{if(t.period<0)return;let r=e.get(t.period);(r===void 0||t.weight>i[r].weight||t.weight===i[r].weight&&t.year<i[r].year)&&e.set(t.period,n)}),[...e.entries()].sort((t,n)=>t[0]-n[0]).map(([,t])=>t)}function _m(i,e){let t=n=>n.visible!==!1&&n.x>=e.left&&n.x<=e.right&&n.y>=e.top&&n.y<=e.bottom;for(let n=1;n<i.length;n++){let r=i[n-1],s=i[n];if(!t(r)||t(s))continue;let a=0,o=1;for(let l=0;l<18;l++){let c=(a+o)/2;t({visible:s.visible,x:r.x+(s.x-r.x)*c,y:r.y+(s.y-r.y)*c})?a=c:o=c}return{t:(n-1+a)/(i.length-1),x:r.x+(s.x-r.x)*a,y:r.y+(s.y-r.y)*a,angle:Math.atan2(s.y-r.y,s.x-r.x)}}return null}function vm(i,e){return[[Math.abs(i.y-e.top),"top"],[Math.abs(i.x-e.right),"right"],[Math.abs(i.y-e.bottom),"bottom"],[Math.abs(i.x-e.left),"left"]].reduce((n,r)=>r[0]<n[0]?r:n)[1]}function xm(i,e,{width:t,height:n},r,s=8){let a=h=>Math.min(Math.max(h,r.left),Math.max(r.left,r.right-t)),o=h=>Math.min(Math.max(h,r.top),Math.max(r.top,r.bottom-n)),l=e==="left"?i.x+s:e==="right"?i.x-s-t:a(i.x-t/2),c=e==="top"?i.y+s:e==="bottom"?i.y-s-n:o(i.y-n/2);return{left:l,right:l+t,top:c,bottom:c+n}}function ym(i,e,t=4,n=[]){let r=[...n],s=.5,a=(o,l)=>o.left<l.right+t-s&&o.right+t>l.left+s&&o.top<l.bottom+t-s&&o.bottom+t>l.top+s;for(let o of i){let l=o.side==="top"||o.side==="bottom"?"top":"left",c=l==="top"?o.box.bottom-o.box.top:o.box.right-o.box.left,h=o.side==="bottom"||o.side==="right"?-1:1,p=o.box;for(let u=0;u<4&&r.some(m=>a(p,m));u++){let m=(c+t)*h*(u+1);p=l==="top"?{...o.box,top:o.box.top+m,bottom:o.box.bottom+m}:{...o.box,left:o.box.left+m,right:o.box.right+m}}p.left>=e.left-1&&p.right<=e.right+1&&p.top>=e.top-1&&p.bottom<=e.bottom+1&&!r.some(u=>a(p,u))?(r.push(p),o.box=p,o.shown=!0):o.shown=!1}return i}function Sm(i,{width:e,height:t,pad:n=6}){let r=i.map(u=>u[0]),s=i.map(u=>u[1]),[a,o,l,c]=[Math.min(...r),Math.max(...r),Math.min(...s),Math.max(...s)],h=Math.min((e-2*n)/(o-a||1),(t-2*n)/(c-l||1)),p=(e-(o-a)*h)/2,d=(t-(c-l)*h)/2;return{scale:h,to:([u,m])=>[p+(u-a)*h,d+(c-m)*h],from:([u,m])=>[a+(u-p)/h,c-(m-d)/h]}}function Mm(i,[e,t],n=1.35){let r=-1,s=n;return i.forEach((a,o)=>{let l=Math.hypot(a.centre[0]-e,a.centre[1]-t)/a.radius;l<s&&([r,s]=[o,l])}),r}var L1=.75,bm=(i,e,t=520,n=!0)=>i<L1&&e>=t&&n,mr={tiers:[{keep:1,ratio:1/0},{keep:.65,ratio:1.5},{keep:.4,ratio:1}],slow:1e3/30,window:90,windows:3},oc={fps:24,hidden:1},Tm=(i,e,t=oc.fps)=>{let n=1e3/t,r=e-i.last;return r<n-1?!1:(i.last=e-Math.min(Math.max(r-n,0),n/2),!0)},Em=(i,e=oc.fps)=>Math.max(0,i-1e3/e)+1e3/60,N1={days:45},wm=(i,e=new Date)=>{if(!/^\d{4}-\d{2}$/.test(i??""))return!1;let t=(e-new Date(+i.slice(0,4),+i.slice(5,7)-1,1))/864e5;return t>=0&&t<N1.days},Am=i=>i.length?i.reduce((e,t)=>e+t,0)/i.length:0,Rm=(i,e)=>e>mr.slow&&i<mr.tiers.length-1?i+1:i;function Cm(i){return[...[...new Set(i.map(t=>t.period).filter(t=>t>=0))].sort((t,n)=>t-n).map(t=>({age:t})),{ahead:"book"},{ahead:"clone"}]}function Im(i,{now:e,idleSince:t,eligible:n,plan:r},{wait:s=20,hold:a=6}={}){if(!r.length)return{state:i,open:null};if(i.phase==="off")return{state:i,open:null};if(i.phase==="touring"){if(t>i.at||!n)return{state:{phase:"off",step:0,at:e},open:null,stopped:!0};if(e-i.at<a)return{state:i,open:null};let o=i.step+1;return o>=r.length?{state:{phase:"off",step:0,at:e},open:null,done:!0}:{state:{phase:"touring",step:o,at:e},open:r[o]}}return n&&e-Math.max(t,i.at)>=s?{state:{phase:"touring",step:0,at:e},open:r[0]}:{state:i,open:null}}var lc={minDistance:6,maxDistance:640,minPitch:-1.3,maxPitch:1.3},wn=(i,e,t)=>Math.min(t,Math.max(e,i));function Pm({target:i,distance:e,yaw:t,pitch:n}){let r=Math.cos(n);return[i[0]+e*r*Math.sin(t),i[1]+e*Math.sin(n),i[2]+e*r*Math.cos(t)]}var ju=(i,e)=>wn(i*Math.exp(e),lc.minDistance,lc.maxDistance),Lm=({yaw:i,pitch:e},t,n)=>({yaw:i+t,pitch:wn(e+n,lc.minPitch,lc.maxPitch)});function Nm({target:i,distance:e,yaw:t,pitch:n},r,s,a,o){let l=2*e*Math.tan(o/2)/a,c=[Math.cos(t),0,-Math.sin(t)],h=[-Math.sin(n)*Math.sin(t),Math.cos(n),-Math.sin(n)*Math.cos(t)];return i.map((p,d)=>p-c[d]*r*l+h[d]*s*l)}var Br=(i,e,t,n)=>Number.isFinite(i)?i+(e-i)*(1-Math.exp(-n*Math.max(0,t))):e,D1=(i,e)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i));function Dm(i,e,t,n){return{target:i.target.map((r,s)=>Br(r,e.target[s],t,n)),distance:Math.exp(Br(Math.log(i.distance),Math.log(e.distance),t,n)),yaw:Br(i.yaw,D1(i.yaw,e.yaw),t,n),pitch:Br(i.pitch,e.pitch,t,n)}}var cc=[0,2,4,7,9],ea=[{root:0,pad:[0,7,14,16]},{root:-7,pad:[0,7,9,16]},{root:-3,pad:[4,9,14,19]},{root:-5,pad:[2,9,14,21]},{root:2,pad:[2,5,9,12]}],Ve={tuning:432,base:432*2**(-7/12),octaves:2,from:1980,to:2030,master:.7,soften:2200,floor:30,fade:9,chordFrom:24,chordTo:38,detune:4,padCut:760,padSwing:220,padLevel:.0052,shimmerLevel:7e-4,subLevel:.007,airLevel:.012,airCut:520,room:1,reach:.03,bed:{pad:[.35,.8],shimmer:[.1,1],air:[.2,.9],sub:[1,0]},note:[.8,1],hover:[.15,1],swell:[.3,1],travel:[.15,1],tick:432,tickGap:1.4,tickPeak:.01,noteGap:.3,swellPeak:.022,travelPeak:.015,arrival:.4,voices:4,crowd:.5,fadeIn:3.5,fadeOut:.7,suspendAfter:4e3,interval:2e3,horizon:4,breath:{period:11,inhale:.4,pad:.25,air:.3,harmonics:12},pink:{level:.0108,low:110,high:1500}},Yu={now:{breath:!1,pink:!1,chordTick:!1,change:3,reverb:5},next:{breath:!0,pink:!0,chordTick:!0,change:5,reverb:5}},Ja=-19,U1=-43,Ks=i=>Ve.tuning*2**(i/12),Qs=i=>Math.min(1,Math.max(0,i));function Um(i){let e=cc.length*Ve.octaves,t=Math.min(e-1,Math.floor(Qs((i-Ve.from)/(Ve.to-Ve.from))*e)),n=cc[t%cc.length]+12*Math.floor(t/cc.length);return Ve.base*2**(n/12)}var Om=i=>({1:3,2:4.5,3:6})[i]??3,Fm=i=>.024+.007*Math.min(3,Math.max(1,i)),Bm=i=>Ks(i==="clone"?Ja:Ja-7),zm=i=>1/(1+Ve.crowd*i),$u=(i,e,t=Ve.tickGap)=>i-e>=t;function Vm(i){let{root:e,pad:t}=ea[i%ea.length];return{sub:Ks(U1+(e%12+12)%12),pad:t.map(n=>Ks(Ja+n)),shimmer:t.slice(2).map(n=>Ks(Ja+n+12))}}function O1(i,e){let t=ea.map((n,r)=>r).filter(n=>n!==i);return t[Math.min(t.length-1,Math.floor(Qs(e)*t.length))]}var Zu=i=>i<0?0:i%ea.length,Ju=(i,e,t)=>i===null?O1(e,t):Zu(i),Ku=i=>Ve.chordFrom+Qs(i)*(Ve.chordTo-Ve.chordFrom);function Qu(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,e|1);return t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function km(i,e){let t=Qu(e),n=new Float32Array(i),r=0,s=0;for(let a=0;a<i;a++)r=(r+.04*(t()*2-1))/1.04,n[a]=r,s=Math.max(s,Math.abs(r));for(let a=0;a<i;a++)n[a]/=s;return n}function Gm(i,e){let t=Qu(e),n=new Float32Array(i),[r,s,a]=[0,0,0],o=0;for(let l=0;l<i;l++){let c=t()*2-1;r=.99765*r+c*.099046,s=.963*s+c*.2965164,a=.57*a+c*1.0526913,n[l]=r+s+a+c*.1848,o=Math.max(o,Math.abs(n[l]))}for(let l=0;l<i;l++)n[l]/=o;return n}function ed(i,e=Ve.breath.inhale){let t=i-Math.floor(i);return t<e?-Math.cos(Math.PI*t/e):Math.cos(Math.PI*(t-e)/(1-e))}function Hm(i=Ve.breath.inhale,e=Ve.breath.harmonics,t=2048){let n=new Float32Array(e+1),r=new Float32Array(e+1);for(let s=0;s<t;s++){let a=s/t,o=ed(a,i);for(let l=1;l<=e;l++)n[l]+=2*o*Math.cos(2*Math.PI*l*a)/t,r[l]+=2*o*Math.sin(2*Math.PI*l*a)/t}return{real:n,imag:r}}function Wm(i){let e=n=>Math.abs(Math.log2(n/Ve.tick)),t=n=>n*2**Math.round(Math.log2(Ve.tick/n));return ea[i%ea.length].pad.map(n=>t(Ks(Ja+n))).reduce((n,r)=>e(r)<e(n)-1e-9?r:n)}function Xm(i,e=1,t=Yu.next.reverb){let n=Math.floor(i*t*1.1);return[0,1].map(r=>{let s=Qu(e+r*7919),a=new Float32Array(n),o=0;for(let l=0;l<n;l++){let c=l/i,h=Qs((c-Ve.reach)/.05),p=Math.exp(-6.9078*c/t),d=Qs((n-l)/(i*.4)),u=3200*(600/3200)**Qs(c/t);o+=(1-Math.exp(-2*Math.PI*u/i))*(s()*2-1-o),a[l]=o*h*p*d}return a})}var F1=[[1,1,1],[2,.22,.5],[3,.08,.3],[4.07,.03,.2]],B1=[[1,1,1],[1.5,.25,1.2]],z1=[[1,1,1]];function V1(i,{random:e=Math.random,profile:t=Yu.next,output:n=i.destination}={}){let r=i.sampleRate,s={at:i.currentTime+.05,chord:0,lastNote:-1/0,lastTick:-1/0,period:-1,year:0,voices:[],layers:[],hold:null,stopped:!1},a=(X=0)=>{let ee=i.createGain();return ee.gain.value=X,ee},o=(X,ee,le=.5)=>{let he=i.createBiquadFilter();return he.type=X,he.frequency.value=ee,he.Q.value=le,he},l=(X,ee,le=0)=>{let he=i.createOscillator();return he.type=X,he.frequency.value=ee,he.detune.value=le,he},c=X=>{let ee=i.createBuffer(X.length,X[0].length,r);return X.forEach((le,he)=>ee.getChannelData(he).set(le)),ee},h=[],p=(X,ee,le)=>{let he=l("sine",X);h.push(he);let A=a(ee);he.connect(A),A.connect(le),he.start()},d=a(0),u=o("highpass",Ve.floor,.7),m=o("lowpass",Ve.soften,.5),f=a(1);f.connect(m),m.connect(u),u.connect(d),d.connect(n);let v=i.createConvolver();v.buffer=c(Xm(r,1,t.reverb));let g=a(Ve.room);v.connect(g),g.connect(f);let _=([X,ee])=>{let le=a(X),he=a(ee);return le.connect(f),he.connect(v),[le,he]},M=(X,ee)=>ee.forEach(le=>X.connect(le)),T=_(Ve.bed.pad),S=_(Ve.bed.shimmer),b=_(Ve.bed.air),I=_(Ve.bed.sub),F=_(Ve.note),k=_(Ve.hover),U=_(Ve.swell),j=_(Ve.travel),V=o("lowpass",Ve.padCut,.3),K=a(1);V.connect(K),M(K,T),p(.031,Ve.padSwing,V.frequency);let se=a(.6);M(se,S),p(.057,.4,se.gain);let re=c([km(r*6,11)]),te=i.createBufferSource(),N=a(t.pink?Ve.pink.level:Ve.airLevel),Z=a(1);if(t.pink){let X=o("highpass",Ve.pink.low,.5),ee=o("lowpass",Ve.pink.high,.5);te.buffer=c([Gm(r*6,11)]),te.connect(X),X.connect(ee),ee.connect(N)}else{let X=o("bandpass",Ve.airCut,.6);te.buffer=re,te.connect(X),X.connect(N)}te.loop=!0,N.connect(Z),M(Z,b),p(.043,N.gain.value*.6,N.gain),te.start(),h.push(te);let ce={start:i.currentTime,period:Ve.breath.period};if(t.breath){let{real:X,imag:ee}=Hm(),le=i.createOscillator();le.setPeriodicWave(i.createPeriodicWave(X,ee,{disableNormalization:!0})),le.frequency.value=1/ce.period,[[K,Ve.breath.pad],[Z,Ve.breath.air]].forEach(([he,A])=>{let E=a(A);le.connect(E),E.connect(he.gain)}),ce.start=i.currentTime,le.start(ce.start),h.push(le)}let Le=X=>()=>X.forEach(ee=>ee.disconnect()),ve=(X,ee,le,he=Ve.fade)=>{let{sub:A,pad:E,shimmer:C}=Vm(X),O=ee+le+Ve.fade;s.layers=s.layers.filter(Y=>Y.end>i.currentTime);let y=new Map,z=Y=>{if(!y.has(Y)){let J=a(1);J.connect(Y),y.set(Y,J)}return y.get(Y)},B={buses:y,oscillators:[],end:O,start:ee,index:X};s.layers.push(B);let R=(Y,J,de)=>{let ye=a(0);B.oscillators.push(Y),ye.gain.setValueAtTime(0,ee),ye.gain.linearRampToValueAtTime(J,ee+he),ye.gain.setValueAtTime(J,O-Ve.fade),ye.gain.linearRampToValueAtTime(0,O),Y.connect(ye),ye.connect(z(de)),Y.start(ee),Y.stop(O+.1),Y.onended=Le([Y,ye])};E.forEach(Y=>[-Ve.detune,Ve.detune].forEach(J=>R(l("triangle",Y,J),Ve.padLevel,V))),C.forEach(Y=>R(l("sine",Y),Ve.shimmerLevel,se));let q=a(1);M(q,I),R(l("sine",A),Ve.subLevel,q)},Oe=(X,{peak:ee,attack:le,length:he,partials:A,outputs:E,when:C})=>{let O=Math.max(C,i.currentTime),y=he/4.6,z=le*3,B=a(1);M(B,E),s.voices=s.voices.filter(de=>de.end>O),s.voices.length>=Ve.voices&&s.voices.shift().duck.gain.setTargetAtTime(0,O,.15);let R=ee*zm(s.voices.length),q=O,Y=null,J=[B];for(let[de,ye,Ie]of A){let _e=l("sine",X*de),Fe=a(0);Fe.gain.setValueAtTime(0,O),Fe.gain.setTargetAtTime(R*ye,O,le),Fe.gain.setTargetAtTime(0,O+z,y*Ie),_e.connect(Fe),Fe.connect(B),_e.start(O);let oe=O+z+y*Ie*8;_e.stop(oe),oe>=q&&(q=oe,Y=_e),J.push(_e,Fe)}Y.onended=Le(J),s.voices.push({end:q,duck:B})},Se=(X,ee)=>{let le=Math.max(ee,i.currentTime),[he,A]=X>=0?[220,680]:[680,220],E=i.createBufferSource(),C=o("bandpass",he,1.2),O=a(0);E.buffer=re,E.loop=!0,C.frequency.setValueAtTime(he,le),C.frequency.exponentialRampToValueAtTime(A,le+3.2),O.gain.setValueAtTime(0,le),O.gain.setTargetAtTime(Ve.travelPeak,le,.5),O.gain.setTargetAtTime(0,le+1.5,.6),E.connect(C),C.connect(O),M(O,j),E.start(le,e()*2),E.stop(le+6.5),E.onended=Le([E,C,O])},ue=X=>s.layers.filter(ee=>ee.start<=X&&ee.end>X).at(-1)?.index??s.chord;return{master:d,breathing:(X=i.currentTime)=>t.breath?(ed((X-ce.start)/ce.period)+1)/2:null,run(X=Ve.horizon){if(!s.stopped)for(;s.at<i.currentTime+X;){let ee=Ku(e());ve(s.chord,s.at,ee),s.at+=ee,s.chord=Ju(s.hold,s.chord,e())}},age(X){if(s.stopped)return;let ee=X<0?null:X;if(ee===s.hold)return;s.hold=ee;let le=i.currentTime;s.layers.forEach(({buses:A,oscillators:E,end:C})=>{C<=le||(A.forEach(O=>O.gain.setTargetAtTime(0,le,t.change/3)),E.forEach(O=>{try{O.stop(le+t.change*2)}catch{}}))}),s.layers=[],s.chord=Zu(X);let he=Ku(e());ve(s.chord,le,he,t.change),s.at=le+he,s.chord=Ju(s.hold,s.chord,e())},fade(X){if(s.stopped)return;let ee=i.currentTime;d.gain.cancelScheduledValues(ee),d.gain.setTargetAtTime(X?Ve.master:0,ee,X?Ve.fadeIn:Ve.fadeOut)},memory({year:X,weight:ee,period:le=-1},he=i.currentTime){if(s.stopped||!$u(he,s.lastNote,Ve.noteGap))return;s.lastNote=he;let A=le>=0&&s.period>=0&&le!==s.period;A&&Se(X>=s.year?1:-1,he),s.period=le,s.year=X,Oe(Um(X),{peak:Fm(ee),attack:.02,length:Om(ee),partials:F1,outputs:F,when:he+(A?Ve.arrival:0)})},swell(X,ee=i.currentTime){s.stopped||Oe(Bm(X),{peak:Ve.swellPeak,attack:.9,length:6,partials:B1,outputs:U,when:ee})},tick(X=i.currentTime){s.stopped||$u(X,s.lastTick)&&(s.lastTick=X,Oe(t.chordTick?Wm(ue(X)):Ve.tick,{peak:Ve.tickPeak,attack:.15,length:1.4,partials:z1,outputs:k,when:X}))},travel(X,ee=i.currentTime){s.stopped||Se(X,ee)},stop(){s.stopped||(s.stopped=!0,[...h,...s.layers.flatMap(X=>X.oscillators)].forEach(X=>{try{X.stop(i.currentTime)}catch{}}),s.layers=[],d.disconnect())}}}function qm(){let i=globalThis.AudioContext??globalThis.webkitAudioContext,e={context:null,graph:null,on:!0,timer:0,stopTimer:0,age:-1};if(!i)return{supported:!1,toggle:()=>!1,start:()=>!1,running:()=>!1,isOn:()=>!1,memory(){},age(){},swell(){},tick(){},travel(){},pause(){},close(){}};let t=()=>e.on&&e.graph,n=()=>{e.context||(e.context=new i,e.graph=V1(e.context));let{context:r,graph:s}=e;clearTimeout(e.stopTimer),clearInterval(e.timer),s.fade(!0),r.resume?.(),s.age(e.age),s.run(),e.timer=setInterval(()=>s.run(),Ve.interval)};return{supported:!0,isOn:()=>e.on,running:()=>e.context?.state==="running",start(){return e.on&&!document.hidden&&n(),e.on},toggle(){return!e.context&&e.on?(e.on=!1,!1):(e.on=!e.on,e.on?n():(clearTimeout(e.stopTimer),clearInterval(e.timer),e.graph.fade(!1),e.stopTimer=setTimeout(()=>!e.on&&e.context.suspend?.(),Ve.suspendAfter)),e.on)},memory(r){t()&&e.graph.memory(r)},swell(r){t()&&e.graph.swell(r)},age(r){e.age=r,t()&&e.graph.age(r)},tick(){t()&&e.graph.tick()},travel(r){t()&&e.graph.travel(r)},pause(r){!e.context||!e.on||(r?e.context.suspend?.():e.context.resume?.())},close(){clearTimeout(e.stopTimer),clearInterval(e.timer),e.on=!0,e.context?.close?.(),e.context=null,e.graph=null}}}var er={order:.6,jitter:.08,flight:.3,arrive:.54,swirl:2.6,burst:.17,glow:.07},ta={sky:1.4,seed:.9,wait:6,delay:.3,seconds:4,dolly:6,from:1.6,card:.85,first:.9},Ym={sky:.5,delay:0,seconds:1.4,card:0},dc={strength:.12,night:["#ecd2b0","#b8cdea","#b8cdea","#ecd2b0"],paper:["#8a5a2b","#2f5f99","#2f5f99","#8a5a2b"]},hc={spin:.07,breath:.05,pace:.5,still:.92},td={dim:.97,reach:2.6,dust:1.4},uc={radius:.2,push:.04,rate:6},$m=.35,jm={ink:.42,edge:0},Ka={light:.8,grow:.12},zr={pull:.1,glow:.3,grow:.12,inRate:2.2,outRate:1.2};var nd=i=>i>=1?1/0:Math.min(1,Math.max(0,(i-er.arrive*er.flight)/er.order)),Zm=`
  #define DISCOVER_ORDER ${er.order.toFixed(2)}
  #define DISCOVER_JITTER ${er.jitter.toFixed(2)}
  #define DISCOVER_FLIGHT ${er.flight.toFixed(2)}
  #define DISCOVER_SWIRL ${er.swirl.toFixed(2)}
  #define DISCOVER_ARRIVE ${er.arrive.toFixed(2)}
  #define DISCOVER_BURST ${er.burst.toFixed(2)}
  #define DISCOVER_GLOW ${er.glow.toFixed(2)}
  #define SPIN_SLOTS ${yi.slots}
  #define CLOUD_SPIN ${hc.spin.toFixed(3)}
  #define CLOUD_BREATH ${hc.breath.toFixed(3)}
  #define CLOUD_PACE ${hc.pace.toFixed(2)}
  #define CLOUD_STILL ${hc.still.toFixed(2)}
  #define ENTRANCE_FIRST ${ta.first.toFixed(2)}
  #define CORE_DIM ${td.dim.toFixed(2)}
  #define CORE_REACH ${td.reach.toFixed(2)}
  #define FAR_DUST ${td.dust.toFixed(2)}
  #define POINTER_RADIUS ${uc.radius.toFixed(2)}
  #define POINTER_PUSH ${uc.push.toFixed(3)}
  #define HOVER_PULL ${zr.pull.toFixed(3)}
  #define HOVER_GLOW ${zr.glow.toFixed(2)}
  #define HOVER_GROW ${zr.grow.toFixed(2)}
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
`,Jm=`
  #define PAPER_INK ${jm.ink.toFixed(2)}
  #define PAPER_EDGE ${jm.edge.toFixed(2)}
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
`,Km=`
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
`,Qm=`
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
`,pc=`
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
`,fc=`
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
`;var na=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,cs=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},gr=(i,e,t)=>i+(e-i)*t;function eg(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function hs(i){return()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var k1={deep:.6,far:.5,haze:.5,glow:.7},G1=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,H1=`
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
`,W1=i=>1/Math.max(.2,Math.sin(i*Math.PI));function X1(i){let e=document.createElement("canvas");e.width=i,e.height=i/2;let t=e.getContext("2d");t.fillStyle="#000",t.fillRect(0,0,i,i/2),t.globalCompositeOperation="lighter";let n=hs(7),r=(s,a)=>`rgba(${s===0?255:0},${s===1?255:0},${s===2?255:0},${a})`;for(let s of Bd({random:n})){t.save(),t.translate(s.u*i,s.v*(i/2)),t.rotate(s.angle),t.scale(W1(s.v),s.squash);let a=t.createRadialGradient(0,0,0,0,0,s.radius);a.addColorStop(0,r(1,s.alpha)),a.addColorStop(.35,r(1,s.alpha*.35)),a.addColorStop(1,r(1,0)),t.fillStyle=a,t.beginPath(),t.arc(0,0,s.radius,0,Math.PI*2),t.fill(),t.restore()}return e}function q1(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.4,"rgba(255,255,255,0.35)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),new Nr(i)}function tg({scene:i,sky:e,mobile:t,ink:n,star:r}){let s=na(),a={...k1},o=new Nr(X1(2048));o.minFilter=o.magFilter=Jn,o.generateMipmaps=!1,o.wrapS=zl;let l={uMap:{value:o},uInk:n,uOffset:{value:new P},uTime:{value:0},uFar:{value:0},uHaze:{value:0},uHazeMax:{value:Xn.haze.alpha}},c=new En({uniforms:l,vertexShader:G1,fragmentShader:H1,transparent:!0,side:Zn,depthTest:!1,depthWrite:!1}),h=new $n(new Gs(1500,48,24),c);h.frustumCulled=!1,h.renderOrder=-3,i.add(h);let p=[0,1,2].map(I=>e.list.reduce((F,k)=>F+k.centre[I],0)/e.list.length),d=Math.max(...e.list.map(I=>Math.hypot(...I.centre.map((F,k)=>F-p[k]))+I.radius*2)),u=Fd({count:t?Xn.deep.mobile:Xn.deep.count,random:hs(7),centre:p,inner:Math.min(Xn.deep.radius/3,Math.max(d*1.15,Xn.deep.inner/4))}),m=new bt;m.setAttribute("position",new Pt(u.position,3)),m.setAttribute("aSeed",new Pt(u.seed,1)),m.setAttribute("aBright",new Pt(u.bright,1)),m.setAttribute("aHalo",new Pt(new Float32Array(u.count),1)),m.setAttribute("aSize",new Pt(u.size,1));let f={uTime:r.uTime,uPixel:r.uPixel,uInk:n,uGain:{value:0},uHalo:{value:0}},v=new En({uniforms:f,vertexShader:pc,fragmentShader:fc,transparent:!0,depthTest:!1,depthWrite:!1}),g=new ji(m,v);g.frustumCulled=!1,g.renderOrder=-2,i.add(g);let _=Math.max(1,...e.list.map(I=>I.count)),M=q1(),T=e.list.map(I=>{let{scale:F,strength:k}=zd(I,_),U=new Ta(new Fs({map:M,color:16777215,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0}));return U.position.set(...I.centre),U.scale.set(F,F,1),U.renderOrder=-2,i.add(U),{sprite:U,strength:k,scale:F,galaxy:I,reveal:0}}),S={night:!0,quiet:!1,dim:1,formed:1/0,sky:1,boost:1},b=()=>{f.uGain.value=a.deep*S.sky*S.boost*(S.night?1.25:.4),g.visible=a.deep>.001,l.uFar.value=a.far*S.sky,l.uHaze.value=S.quiet?0:a.haze*S.sky,h.visible=l.uFar.value+l.uHaze.value>.001,T.forEach(({sprite:I,strength:F,scale:k,galaxy:U})=>{let j=cs(U.start,U.end,S.formed);I.scale.set(k*(.55+.45*j),k*(.55+.45*j),1),I.material.opacity=F*a.glow*S.dim*j*(S.night?1:.5),I.visible=I.material.opacity>.002,I.material.color.copy(n.value)})};return{applyTheme:I=>{S.night=I,c.blending=I?pr:bi,c.needsUpdate=!0,v.blending=I?pr:bi,v.needsUpdate=!0,T.forEach(({sprite:F})=>{F.material.blending=I?pr:bi,F.material.needsUpdate=!0}),b()},setTier:I=>{S.quiet=I>=2,b()},setDim:I=>{S.dim=I,b()},update:(I,F,k,U=1,j=1)=>{(k!==S.formed||U!==S.sky||j!==S.boost)&&(S.formed=k,S.sky=U,S.boost=j,b()),h.position.copy(F.position),l.uOffset.value.copy(F.position).multiplyScalar(4e-4),l.uTime.value=s?0:I*.01}}}var id=-.27,od=.35,rd=[0,0,-7],Vr=18,ng=40,j1=6,Y1=.5,sd=4.2,ad=900,$1=.9,mc=10,Qa={rate:.11,yaw:.14,pitch:.02,rest:2.5};function ig({canvas:i,cloud:e,marks:t,future:n,today:r,mobile:s,sky:a,kinds:o=[]}){let l=new nc({canvas:i,antialias:!1,powerPreference:"high-performance"});l.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2));let c=new ya,h=new Yn(36,innerWidth/innerHeight,.1,4e3),p=r+Pc[1]+.4,d=new Float32Array(e.count*3);for(let D=0;D<d.length;D++)d[D]=e.position[D]-e.center[D];let u=new bt,m=(D,ie)=>new Pt(D,ie).setUsage(Jl);u.setAttribute("position",new Pt(d,3)),u.setAttribute("aFrom",new Pt(e.from,3)),u.setAttribute("aCenter",new Pt(e.center,3)),Object.entries({u:"aU",order:"aOrder",seed:"aSeed",size:"aSize",ahead:"aAhead",kind:"aKind",memory:"aMemory",galaxy:"aGalaxy"}).forEach(([D,ie])=>u.setAttribute(ie,new Pt(e[D],1))),["threads","people","places"].forEach((D,ie)=>u.setAttribute(`aFacet${ie}`,new Pt(e.facet[D],1)));let v=new Float32Array(Math.max(1,t.length)).fill(1),g=new Float32Array(v),_=new Zr(v,v.length,1,ja,Ti);_.minFilter=_.magFilter=Ui,_.needsUpdate=!0;let M=new Float32Array(v.length).fill(-1);o.forEach((D,ie)=>M[ie]=Nc.indexOf(D));let T=new Zr(M,M.length,1,ja,Ti);T.minFilter=T.magFilter=Ui,T.needsUpdate=!0;let S=Nc.map(()=>new ht),b=()=>(ze.night?dc.night:dc.paper).forEach((D,ie)=>S[ie].set(D)),I={value:new ht},F=Od({count:s?4e3:void 0,random:hs(2026)}),k=new bt;k.setAttribute("position",new Pt(F.position,3)),k.setAttribute("aSeed",new Pt(F.seed,1)),k.setAttribute("aBright",new Pt(F.bright,1)),k.setAttribute("aHalo",new Pt(F.halo,1)),k.setAttribute("aSize",new Pt(F.size,1));let U=1.25,j={uTime:{value:0},uPixel:{value:1},uGain:{value:.6},uHalo:{value:1},uInk:I},V=new En({uniforms:j,vertexShader:pc,fragmentShader:fc,transparent:!0,depthTest:!1,depthWrite:!1}),K=new ji(k,V);K.frustumCulled=!1,K.renderOrder=-1,c.add(K);let se=tg({scene:c,sky:a,mobile:s,ink:I,star:j}),re=t.reduce((D,ie,pe)=>ie.year<t[D].year?pe:D,0),te=Math.min(1,Math.sqrt(6e4/e.count)),N={uMix:{value:0},uTime:{value:0},uScale:{value:1},uFar:{value:1},uGain:{value:1},uFocusU:{value:0},uFocusW:{value:7},uFocusOn:{value:0},uFilterFacet:{value:-1},uFilterItem:{value:-1},uAway:{value:.12},uReveal:{value:1e4},uLevelCount:{value:v.length},uLevels:{value:_},uKinds:{value:T},uTints:{value:S},uTint:{value:dc.strength},uPaper:{value:0},uSpin:{value:new Float32Array(yi.slots)},uPivot:{value:Array.from({length:yi.slots},(D,ie)=>new P(...a.list[ie]?.centre??[0,0,0]))},uKeep:{value:1},uSeed:{value:re},uSeedOn:{value:0},uKick:{value:0},uPointer:{value:new P(0,0,0)},uHover:{value:new me(-1,0)},uInk:I},Z=new En({uniforms:N,vertexShader:Zm,fragmentShader:Jm,transparent:!0,depthTest:!1,depthWrite:!1}),ce=new ji(u,Z);ce.frustumCulled=!1,c.add(ce);let Le=[...t.map(D=>D.position),n.today,n.today,n.book,n.clone],ve=new Float32Array(yi.slots),Oe=(D,ie)=>{ie.set(...Le[D]);let pe=D<t.length?t[D].period:-1;if(pe>=0&&pe<yi.slots&&ve[pe]){let et=a.list[pe].centre,[lt,ot]=[ie.x-et[0],ie.y-et[1]];ie.x=et[0]+Math.cos(ve[pe])*lt-Math.sin(ve[pe])*ot,ie.y=et[1]+Math.sin(ve[pe])*lt+Math.cos(ve[pe])*ot}return ie},Se=[{size:1.3,state:1,order:.96},{size:2.4,state:3,order:.96},{size:2.4,state:2,order:.98},{size:2.4,state:2,order:1},{size:8,state:4,order:0},{size:8,state:4,order:0}],ue=4,X=[0,0],ee=[],le=5,he=m(new Float32Array(Se.length*3),3),A=m(Float32Array.from(Se.map(D=>D.size)),1),E=m(new Float32Array(Se.length).fill(1),1),C=new bt;C.setAttribute("position",he),C.setAttribute("aSize",A),C.setAttribute("aFade",E),C.setAttribute("aFirst",new Pt(Float32Array.from(Se.map((D,ie)=>ie===re?1:0)),1)),C.setAttribute("aState",new Pt(Float32Array.from(Se.map(D=>D.state)),1)),C.setAttribute("aOrder",new Pt(Float32Array.from(Se.map(D=>D.order)),1));let O={uScale:{value:1},uTime:{value:0},uReveal:{value:0},uSeedOn:{value:0},uInk:I},y=new En({uniforms:O,vertexShader:Km,fragmentShader:Qm,transparent:!0,depthTest:!1,depthWrite:!1}),z=new ji(C,y);z.frustumCulled=!1,c.add(z);let B=[],R=(D,ie=!1)=>{let pe=ie?new za({transparent:!0,dashSize:.8,gapSize:.9,depthTest:!1}):new Jr({transparent:!0,depthTest:!1});return B.push({material:pe,opacity:D}),pe},q=D=>new bt().setAttribute("position",new je(D,3)),Y=(()=>{let D=document.createElement("canvas");D.width=D.height=32;let ie=D.getContext("2d"),pe=ie.createRadialGradient(16,16,0,16,16,16);return pe.addColorStop(0,"rgba(255,255,255,1)"),pe.addColorStop(.5,"rgba(255,255,255,1)"),pe.addColorStop(.75,"rgba(255,255,255,0.3)"),pe.addColorStop(1,"rgba(255,255,255,0)"),ie.fillStyle=pe,ie.fillRect(0,0,32,32),new Nr(D)})(),J=1.6,de=1.5,ye=new P,Ie=new Float32Array(3*1024),_e=D=>{let ie=new Float32Array(ad*3),pe=new Pt(ie,3).setUsage(Jl),et=new bt().setAttribute("position",pe);et.setDrawRange(0,0);let lt=new Bs({map:Y,size:3,sizeAttenuation:!1,transparent:!0,depthTest:!1,depthWrite:!1});D&&B.push({material:lt,opacity:D});let ot=new ji(et,lt);return ot.frustumCulled=!1,ot.userData.lay=(Ge,Lt=!1)=>{let Gt=Ge.length/3,ct=Math.min(1023,Lt?Gt+1:Gt);for(let _t=0;_t<ct;_t++){let Rn=_t%Gt*3;ye.set(Ge[Rn],Ge[Rn+1],Ge[Rn+2]).project(h),Ie[_t*3]=(ye.x*.5+.5)*innerWidth,Ie[_t*3+1]=(-ye.y*.5+.5)*innerHeight,Ie[_t*3+2]=ye.z>-1&&ye.z<1?1:0}let Nt=0,Vt=0;for(let _t=0;_t<ct-1&&Vt<ad;_t++){let[Rn,ke,Cn,Sn,kn,nr]=[Ie[_t*3],Ie[_t*3+1],Ie[_t*3+2],Ie[_t*3+3],Ie[_t*3+4],Ie[_t*3+5]];if(!Cn||!nr){Nt=0;continue}let _n=Math.hypot(Sn-Rn,kn-ke);if(_n<1e-6)continue;let Mn=120,Et=(vn,Dt)=>(vn<-Mn?1:vn>innerWidth+Mn?2:0)|(Dt<-Mn?4:Dt>innerHeight+Mn?8:0);if(Et(Rn,ke)&Et(Sn,kn)){Nt=((Nt-_n)%mc+mc)%mc;continue}let Jt=_t%Gt*3,Gn=(_t+1)%Gt*3;for(;Nt<=_n&&Vt<ad;){let vn=Nt/_n;for(let Dt=0;Dt<3;Dt++)ie[Vt*3+Dt]=Ge[Jt+Dt]+(Ge[Gn+Dt]-Ge[Jt+Dt])*vn;Vt++,Nt+=mc}Nt-=_n}et.setDrawRange(0,Vt),pe.needsUpdate=!0,lt.size=J*(ot.userData.outer?de:1)*l.getPixelRatio()},ot},Fe=[],oe=new hr,fe=(D,ie,pe=1980)=>(D.frustumCulled=!1,D.userData.opacity=ie,D.userData.year=pe,oe.add(D),D),ge=[];(()=>{let D=Ge=>Ge.members.threads?.[0]??0,ie=new Map,pe=a.list.map(()=>({open:[],shadow:[]}));t.forEach(Ge=>{let Lt=`${Ge.period}:${D(Ge)}`;ie.has(Lt)&&pe[Ge.period].open.push(...ie.get(Lt),...Ge.position),ie.set(Lt,Ge.position)}),pe.forEach((Ge,Lt)=>{let Gt=a.list[Lt].centre;for(let[ct,Nt]of[["open",.34],["shadow",.13]]){if(!Ge[ct].length)continue;let Vt=fe(new Kr(q(Ge[ct].map((_t,Rn)=>_t-Gt[Rn%3])),R(Nt)),Nt,a.list[Lt].end);Vt.position.set(...Gt),Vt.userData.constellation=!0,ge.push({lines:Vt,k:Lt})}});let et=(Ge,Lt)=>{let Gt=[],ct=Math.max(8,Math.ceil((Lt-Ge)/1.5));for(let Nt=0;Nt<=ct;Nt++)Gt.push(...fs(a,Ge+(Lt-Ge)*Nt/ct));return Gt};a.list.forEach((Ge,Lt)=>{let Gt=[];for(let Vt=0;Vt<120;Vt++){let _t=Math.PI*2*Vt/120,[Rn,ke]=br(Ge,Math.sin(_t)*(Ge.radius+1.6),Math.cos(_t)*(Ge.radius+1.6));Gt.push(Ge.centre[0]+Rn,Ge.centre[1]+ke,Ge.centre[2])}let ct=fe(_e(.8),.8,Ge.start);ct.userData.dots=!0,ct.userData.outer=!0,Fe.push({points:ct,vertices:Gt,closed:!0});let Nt=a.list[Lt+1];if(Nt){let Vt=fe(_e(.7),.7,Nt.start);Vt.userData.dots=!0,Fe.push({points:Vt,vertices:et(Ge.along+Ge.radius+1.6,Nt.along-Nt.radius-1.6),closed:!1})}});let lt=a.list.at(-1),ot=fe(_e(.7),.7,r);ot.userData.dots=!0,Fe.push({points:ot,vertices:et(lt.along+lt.radius+1.6,a.length),closed:!1})})(),c.add(oe);let ft=Array.from({length:8},()=>{let D=_e(0);return D.visible=!1,c.add(D),D}),be=new Float32Array(288),at={list:[],centre:[0,0,0],want:0,fade:0,galaxy:{}},Ne=D=>{let ie=new Float32Array(ng*Vr*6),pe=m(ie,3),et=new Kr(new bt().setAttribute("position",pe),R(D));return et.frustumCulled=!1,et.geometry.setDrawRange(0,0),c.add(et),{lines:et,attribute:pe,positions:ie,indices:[],fade:0,opacity:D}},St=Ne(.7),$e=Ne(.3),qt=Ne(1),Tt=160,Ft=new Float32Array(Tt*Vr*6),jt=m(Ft,3),nn=new Kr(new bt().setAttribute("position",jt),R(.6));nn.frustumCulled=!1,nn.geometry.setDrawRange(0,0),c.add(nn);let sn={pairs:[],fade:0},hi=(D,ie,pe,et,lt,ot=1)=>{for(let Ge=0;Ge<Vr;Ge++)for(let[Lt,Gt]of[[0,Ge/Vr*ot],[1,(Ge+1)/Vr*ot]]){let ct=((ie*Vr+Ge)*2+Lt)*3;D[ct]=gr(pe.x,et.x,Gt),D[ct+1]=gr(pe.y,et.y,Gt),D[ct+2]=gr(pe.z,et.z,Gt)+4*Gt*(1-Gt)*lt}},On={map:new Map},gn=new P,yn=new P,G=new P,Yt={target:[...rd],distance:700,yaw:0,pitch:id},an={target:[...rd],distance:340,yaw:0,pitch:id},vt={x:0,y:0,goalX:0,goalY:0},ze={reveal:null,follow:-1,idle:!0,hover:-1,selection:-1,preview:-1,previewFade:0,ringFade:0,portrait:innerWidth/innerHeight<1,drift:0,turned:0,ring:-1,touched:-1e9},_r=Math.max(...[...t.map(D=>D.position),n.book,n.clone].map(D=>Math.hypot(D[0],D[1])))+12,on=()=>Math.max(160,_r*4.3)*(ze.portrait?1.3:1),ut=D=>Math.min(84,D*(ze.portrait?1.5:1)),rn=t.length+2,Fi=D=>D<t.length?D:D+2,He=Array.from({length:rn},()=>({x:0,y:0,r:0,on:!1,depth:0})),Xt=new P,Ut=new P,ri=(D,ie={})=>(Ut.copy(D).project(h),ie.x=(Ut.x*.5+.5)*innerWidth,ie.y=(-Ut.y*.5+.5)*innerHeight,ie.visible=Ut.z>-1&&Ut.z<1,ie),tr=({target:D,distance:ie,yaw:pe,pitch:et,follow:lt=-1}={})=>{D&&(an.target=[...D]),ie!==void 0&&(an.distance=wn(ie,6,640)),pe!==void 0&&(an.yaw=pe),et!==void 0&&(an.pitch=et),ze.follow=lt},Qn=(D=id)=>tr({target:rd,distance:on(),yaw:0,pitch:D}),Fn=new ht,Bn=()=>{let D=getComputedStyle(document.documentElement);Fn.set(D.getPropertyValue("--bg").trim()),I.value.set(D.getPropertyValue("--fg").trim()),B.forEach(({material:pe})=>pe.color.copy(I.value));let ie=Fn.getHSL({}).l<.5;l.setClearColor(Fn,1),Z.blending=V.blending=ie?pr:bi,U=ie?1.25:.4,j.uHalo.value=ie?1:0,V.needsUpdate=!0,se.applyTheme(ie),ze.night=ie,b(),y.blending=bi,N.uGain.value=(ie?.55:.6)*te,N.uPaper.value=ie?0:1,Z.needsUpdate=!0};Bn();let si=()=>{ze.portrait=innerWidth/innerHeight<1,h.aspect=innerWidth/innerHeight,l.setSize(innerWidth,innerHeight,!1)};si();let dn=new Map,An={index:-1,mix:0},Nn={x:0,y:0,on:!1,fine:matchMedia("(pointer: fine)").matches&&!na(),strength:0},w={moved:!1,pinch:0,button:0},W={hover:()=>{},click:()=>{},frame:()=>{},touch:()=>{},error:D=>console.error(D)},Q=!0,ae=(D,ie)=>{let pe=-1,et=1;return He.forEach((lt,ot)=>{if(!lt.on)return;let Ge=Math.max(26,lt.r*.9),Lt=Math.hypot(lt.x-D,lt.y-ie)/Ge;Lt<et&&([pe,et]=[ot,Lt])}),pe},ne=()=>{ze.idle=!1,ze.touched=performance.now()/1e3,W.touch()},xe=(D,ie)=>{an.target=Nm(an,D,ie,innerHeight,h.fov*Math.PI/180),ze.follow=-1};i.addEventListener("pointerdown",D=>{if(!(D.pointerType==="mouse"&&D.button>2)){if(i.setPointerCapture(D.pointerId),dn.set(D.pointerId,{x:D.clientX,y:D.clientY,startX:D.clientX,startY:D.clientY}),dn.size===1&&Object.assign(w,{moved:!1,button:D.button,pinch:0,shift:D.shiftKey}),dn.size===2){let[ie,pe]=[...dn.values()];w.pinch=Math.hypot(ie.x-pe.x,ie.y-pe.y),w.moved=!0}ne()}}),i.addEventListener("pointermove",D=>{let ie=dn.get(D.pointerId);if(!ie){D.pointerType==="mouse"&&W.hover(ae(D.clientX,D.clientY),D);return}let pe=D.clientX-ie.x,et=D.clientY-ie.y;if(Math.hypot(D.clientX-ie.startX,D.clientY-ie.startY)>j1&&(w.moved=!0),[ie.x,ie.y]=[D.clientX,D.clientY],dn.size===2){let[lt,ot]=[...dn.values()],Ge=Math.hypot(lt.x-ot.x,lt.y-ot.y);w.pinch>0&&Ge>0&&(an.distance=ju(an.distance,Math.log(w.pinch/Ge))),w.pinch=Ge,xe(pe/2,et/2);return}w.moved&&(w.button===2||w.button===1||w.shift?xe(pe,et):Object.assign(an,Lm(an,-pe*.005,et*.004)))});let Te=D=>{let ie=dn.get(D.pointerId);dn.delete(D.pointerId),ie&&!w.moved&&dn.size===0&&D.type==="pointerup"&&w.button===0&&W.click(ae(D.clientX,D.clientY),D)};i.addEventListener("pointerup",Te),i.addEventListener("pointercancel",Te),i.addEventListener("pointerleave",()=>{Nn.on=!1,W.hover(-1)}),i.addEventListener("pointermove",D=>{D.pointerType==="mouse"&&(Nn.on=Nn.fine,Nn.x=D.clientX/innerWidth*2-1,Nn.y=-(D.clientY/innerHeight)*2+1)}),i.addEventListener("contextmenu",D=>D.preventDefault()),i.addEventListener("wheel",D=>{D.preventDefault();let ie=D.deltaY*(D.deltaMode===1?40:D.deltaMode===2?innerHeight:1);an.distance=ju(an.distance,wn(ie*(D.ctrlKey?.012:.0016),-.5,.5)),ne()},{passive:!1});let Re=new Ga,Pe=new P,Be=new P,Ze=ta,Je=null,Ue=null,gt=!1,ln=!1,Bt=null,zt=!0,rt={last:-1/0},xt=0,We=()=>{let D=++xt;document.hidden?setTimeout(()=>xt===D&&Xe(performance.now()),1e3/oc.hidden):requestAnimationFrame(ie=>xt===D&&Xe(ie))};document.addEventListener("visibilitychange",()=>Q&&We());let Xe=D=>{if(!Q)return;if(!document.hidden&&!Tm(rt,D))return We();Re.update(D);let ie=Math.min(Math.max(Re.getDelta(),0),.25),pe=Re.getElapsed();Ue??(Ue=pe);let et=wn(on()*Ze.from,6,640);gt&&Je===null&&(Je=pe,Bt=ln?null:{from:et});let lt=Je===null?0:pe-Je,ot=Math.min(1,Math.max(0,(lt-Ze.delay)/Ze.seconds)),Ge=cs(0,Ze.sky,pe-Ue);ze.follow>=0&&(Oe(ze.follow,Be),an.target=Be.toArray());let Lt=Dm(Yt,an,ie,sd);if(Object.assign(Yt,Lt),Je===null)Yt.distance=et;else if(Bt){let Ae=Math.min(1,lt/Ze.dolly);Ae>=1||!ze.idle?Bt=null:Yt.distance=Math.exp(gr(Math.log(Bt.from),Math.log(an.distance),1-(1-Ae)**3))}vt.x+=(vt.goalX-vt.x)*(1-Math.exp(-sd*ie)),vt.y+=(vt.goalY-vt.y)*(1-Math.exp(-sd*ie)),ze.drift+=((dn.size===0&&performance.now()/1e3-ze.touched>Qa.rest?1:0)-ze.drift)*(1-Math.exp(-ie*.6));let[Gt,ct,Nt]=Pm({...Yt,yaw:Yt.yaw+Math.sin(pe*Qa.rate)*Qa.yaw*ze.drift,pitch:Yt.pitch+Math.sin(pe*Qa.rate*.75+1)*Qa.pitch*ze.drift});h.position.set(Gt,ct,Nt),h.fov=ut(36),h.updateProjectionMatrix(),h.lookAt(Yt.target[0],Yt.target[1],Yt.target[2]),h.setViewOffset(innerWidth,innerHeight,-vt.x,-vt.y,innerWidth,innerHeight),h.updateMatrixWorld();let Vt=innerHeight/(2*Math.tan(h.fov*Math.PI/360)),_t=cs(.35,.75,Yt.distance/on());lt-Ze.delay-Ze.seconds-.5>0&&(ze.turned+=ie*gr(yi.near,1,_t));let Rn=ze.turned;a.list.forEach((Ae,Ot)=>{Ot>=yi.slots||(ve[Ot]=Wd(Ae,Rn),N.uSpin.value[Ot]=ve[Ot])}),ge.forEach(({lines:Ae,k:Ot})=>Ae.rotation.z=ve[Ot]??0);let ke=ve[0].toFixed(3);i.dataset.spin!==ke&&(i.dataset.spin=ke),Nn.strength=Br(Nn.strength,Nn.on?1:0,ie,uc.rate),N.uPointer.value.set(Nn.x,Nn.y,Nn.strength);let Cn=ze.hover>=0&&ze.hover<t.length;Cn&&An.index!==ze.hover&&(An.mix*=.4,An.index=ze.hover),An.mix=Br(An.mix,Cn?1:0,ie,Cn?zr.inRate:zr.outRate),N.uHover.value.set(An.index,An.mix);let Sn=Nn.strength.toFixed(2);i.dataset.pointer!==Sn&&(i.dataset.pointer=Sn);let kn=Je===null?cs(Ze.seed,Ze.seed+1.6,pe-Ue):1,nr=lt>0?Math.min(1,lt/.45*Math.exp(1-lt/.45)):0;N.uSeedOn.value=O.uSeedOn.value=kn,N.uKick.value=nr,N.uMix.value=ot;let _n=Rd(a,nd(ot));N.uTime.value=O.uTime.value=j.uTime.value=pe,j.uPixel.value=l.getPixelRatio(),N.uFar.value=_t,N.uScale.value=O.uScale.value=l.domElement.height/(2*Math.tan(h.fov*Math.PI/360)),O.uReveal.value=Math.min(1,nd(ot)),zt=!1;for(let Ae=0;Ae<v.length;Ae++){let Ot=g[Ae]-v[Ae];Math.abs(Ot)>.002?(v[Ae]+=Ot*(1-Math.exp(-7*ie)),zt=!0):v[Ae]=g[Ae]}for(let Ae of ee)v[Ae]=g[Ae]*(1+$m*(.5+.5*Math.sin(pe*.9)));(zt||ee.length)&&(_.needsUpdate=!0);let Mn=(Ae,Ot)=>{Oe(t.length+Ae,Xt),he.setXYZ(Ae,Xt.x,Xt.y,Xt.z),E.setX(Ae,Ot)},Et=Ae=>N.uReveal.value>=ms(Ae)?1:0;Mn(0,Et(r)),Mn(1,Et(r)),X.forEach((Ae,Ot)=>X[Ot]=Br(Ae,ze.ring===Ot?1:0,ie,ze.ring===Ot?zr.inRate:zr.outRate)),Mn(2,Et(p)*(1+Ka.light*X[0])),Mn(3,Et(p)*(1+Ka.light*X[1])),A.setX(2,Se[2].size*(1+Ka.grow*X[0])),A.setX(3,Se[3].size*(1+Ka.grow*X[1])),ze.selection>=0&&(Oe(ze.selection,Xt),he.setXYZ(ue,Xt.x,Xt.y,Xt.z),A.setX(ue,2.2*t[ze.selection].spread+2)),ze.ringFade+=((ze.selection>=0?1:0)-ze.ringFade)*(1-Math.exp(-6*ie)),E.setX(ue,ze.ringFade),ze.preview>=0&&(Oe(ze.preview,G),he.setXYZ(le,G.x,G.y,G.z),A.setX(le,2.2*t[ze.preview].spread+2)),ze.previewFade+=((ze.preview>=0?1:0)-ze.previewFade)*(1-Math.exp(-9*ie)),E.setX(le,ze.previewFade),he.needsUpdate=A.needsUpdate=E.needsUpdate=!0;let Jt=`${Yt.yaw.toFixed(2)},${Yt.pitch.toFixed(2)},${Yt.distance.toFixed(0)}`;i.dataset.view!==Jt&&(i.dataset.view=Jt);let vn=Math.abs(Math.log(Yt.distance/an.distance))<.004&&Math.abs(Math.sin(Yt.yaw-an.yaw))<.003&&Math.abs(Yt.pitch-an.pitch)<.003&&Yt.target.every((Ae,Ot)=>Math.abs(Ae-an.target[Ot])<.03)&&Math.abs(vt.x-vt.goalX)<.5&&Math.abs(vt.y-vt.goalY)<.5?"1":"";i.dataset.rest!==vn&&(i.dataset.rest=vn);let Dt=ze.selection>=0?`${Xt.x.toFixed(2)},${Xt.y.toFixed(2)},${Xt.z.toFixed(2)}`:"";i.dataset.ring!==Dt&&(i.dataset.ring=Dt);let Kt=ze.preview>=0?String(ze.preview):"";i.dataset.preview!==Kt&&(i.dataset.preview=Kt);let Dn=cs(.25,.9,ot),xi=Math.min(_n,ze.reveal??1/0);oe.visible=Dn>.01,oe.children.forEach(Ae=>Ae.material.opacity=Ae.userData.opacity*Dn*(Ae.userData.constellation?1-_t:1)*(Ae.userData.dots?Ae.userData.outer?.4+.25*(1-_t):.75+.1*(1-_t):1)*Math.min(1,Math.max(0,(xi-Ae.userData.year)/2))),qt.indices=ze.preview>=0&&ze.selection>=0&&ze.preview!==ze.selection?[ze.preview]:[];for(let Ae of[St,$e,qt]){let Ot=Ae.indices.length?1:0;Ae.fade+=(Ot-Ae.fade)*(1-Math.exp(-5*ie));let ai=Math.min(Ae.indices.length,ng);ai&&(Oe(ze.selection,Be),Ae.indices.slice(0,ai).forEach((Ei,Bi)=>{Oe(Ei,Pe),hi(Ae.positions,Bi,Be,Pe,Be.distanceTo(Pe)*.22,On.map.get(Ei)??1)}),Ae.attribute.needsUpdate=!0),Ae.lines.geometry.setDrawRange(0,ai*Vr*2),Ae.lines.material.opacity=Ae.opacity*Ae.fade,Ae.lines.visible=Ae.fade>.01}at.fade+=(at.want-at.fade)*(1-Math.exp(-5*ie)),J=1.15+.1*(1-_t),de=1+.3*(1-_t),Fe.forEach(({points:Ae,vertices:Ot,closed:ai})=>Ae.userData.lay(Ot,ai)),ft.forEach((Ae,Ot)=>{let ai=at.list[Ot],Ei=!!ai&&at.fade>.01;if(Ae.visible=Ei,!!Ei){for(let Bi=0;Bi<96;Bi++){let ps=Math.PI*2*Bi/96,[to,vc]=br(at.galaxy,Math.sin(ps)*ai.radius,Math.cos(ps)*ai.radius);be[Bi*3]=at.centre[0]+to,be[Bi*3+1]=at.centre[1]+vc,be[Bi*3+2]=at.centre[2]}Ae.userData.lay(be,!0),Ae.material.color.copy(I.value),Ae.material.opacity=.3*(1-.35*(Ot/Math.max(1,at.list.length-1)))*at.fade*Dn}});let ui=at.want&&at.fade>.5?String(at.list.length):"";i.dataset.rings!==ui&&(i.dataset.rings=ui);let ir=Dn;sn.fade+=((sn.pairs.length?1:0)-sn.fade)*(1-Math.exp(-5*ie));let di=Math.min(sn.pairs.length,Tt);di&&ir>.01&&(sn.pairs.slice(0,di).forEach(([Ae,Ot,ai],Ei)=>{Oe(Ae,Be),Oe(Ot,Pe),hi(Ft,Ei,Be,Pe,Be.distanceTo(Pe)*(ai?.3:.12))}),jt.needsUpdate=!0),nn.geometry.setDrawRange(0,di*Vr*2),nn.material.opacity=.6*sn.fade*ir,nn.visible=nn.material.opacity>.01,i.dataset.jumps=nn.visible?String(di):"";let ds=1+$1*(1-_t);j.uGain.value=U*Ge*ds,se.update(pe,h,_n,Ge,ds),l.render(c,h),He.forEach((Ae,Ot)=>{Oe(Fi(Ot),Xt),Ut.copy(Xt).project(h),Ae.x=(Ut.x*.5+.5)*innerWidth,Ae.y=(-Ut.y*.5+.5)*innerHeight,Ae.depth=h.position.distanceTo(Xt),Ae.r=(t[Ot]?.spread??Y1)*2.4*Vt/Ae.depth,Ae.on=Ut.z>-1&&Ut.z<1&&Ae.x>0&&Ae.x<innerWidth&&Ae.y>0&&Ae.y<innerHeight});try{W.frame({time:pe,dt:ie,intro:ot,formed:_n,far:_t,cssScale:Vt,projected:He,camera:h,entered:ot>=Ze.card,seen:Je===null&&pe-Ue>Ze.seed+1.2,seedIndex:re})}catch(Ae){Q=!1,W.error(Ae);return}Q&&We()};return{camera:h,view:Yt,goal:an,inset:vt,state:ze,projected:He,on:(D,ie)=>W[D]=ie,stop:()=>Q=!1,setQuality:D=>{let ie=mr.tiers[Math.min(D,mr.tiers.length-1)];N.uKeep.value=ie.keep,se.setTier(D),l.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2,ie.ratio)),l.setSize(innerWidth,innerHeight,!1)},start:()=>We(),begin:(D="full")=>{gt=!0,ln=D!=="full",D==="direct"&&(Ze={...ta,...Ym})},home:Qn,homeDistance:on,fly:tr,pick:ae,centerOf:D=>Oe(D,new P),project:ri,resize:si,applyTheme:Bn,setLevels:D=>D.forEach((ie,pe)=>g[pe]=ie),setFilter:D=>{N.uFilterFacet.value=D?["threads","people","places"].indexOf(D.facet):-1,N.uFilterItem.value=D?D.item:-1,se.setDim(D?.45:1)},setFocus:D=>{N.uFocusOn.value=D===null?0:1,D!==null&&(N.uFocusU.value=ms(D))},setSelection:D=>ze.selection=D,setHover:D=>ze.hover=D,setRingGlow:D=>ze.ring=D,setFresh:D=>ee=D,setPreview:D=>ze.preview=D,setJumps:D=>sn.pairs=D,slotOf:D=>({today:t.length,book:t.length+2,clone:t.length+3})[D],setReveal:D=>{N.uReveal.value=D===null?1e4:ms(D),ze.reveal=D},setLinks:(D,ie)=>{St.indices=D,$e.indices=ie,i.dataset.links=String(D.length+ie.length)},setInset:(D,ie)=>{vt.goalX=D,vt.goalY=ie},setIdle:D=>ze.idle=D,setLinkReach:D=>On.map=D,groundAt:(D,ie,pe)=>{Ut.set(D/innerWidth*2-1,-(ie/innerHeight)*2+1,.5).unproject(h),Ut.sub(h.position).normalize();let et=(pe-h.position.z)/Ut.z,lt=2600,ot=Number.isFinite(et)&&et>0?Math.min(et,lt):lt;return[h.position.x+Ut.x*ot,h.position.y+Ut.y*ot]},arcScreen:(D,ie,pe,et={})=>(Oe(D,gn),Oe(ie,yn),G.set(gr(gn.x,yn.x,pe),gr(gn.y,yn.y,pe),gr(gn.z,yn.z,pe)+4*pe*(1-pe)*gn.distanceTo(yn)*.22),ri(G,et)),setYearRings:(D,ie,pe={})=>{ie.length?Object.assign(at,{list:ie,centre:D,galaxy:pe,want:1}):at.want=0}}}var Z1="(min-height: 520px) and (min-width: 320px)",J1="(max-width: 900px), (max-aspect-ratio: 1/1)",ld=74,K1=124,Q1=24,rg=8,eS=[0,22],sg={today:2.4,book:1.2,clone:1.2},ag=8,cd={quiet:.4,current:.9},og=20,lg=2,tS=.6,nS=40,us={width:104,height:100,top:118},cg="http://www.w3.org/2000/svg",hd=matchMedia(J1),hg=.9,iS=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],rS=new Set(["hero","contact"]),sS=["1","2","3"],Vn=[],_c=()=>{for(;Vn.length;)Vn.pop()();document.documentElement.classList.remove("immersive"),document.documentElement.classList.add("flat")};function dg(){if(!eg()||na())return _c();let i=matchMedia(Z1);if(i.addEventListener("change",()=>location.reload()),!i.matches)return _c();aS().catch(e=>{console.error(e),_c()})}function ug(i){let e=0,t=n=>{[...n.childNodes].forEach(r=>{if(r.nodeType===Node.TEXT_NODE){let s=document.createDocumentFragment();r.textContent.split(/(\s+)/).forEach(a=>{if(!a)return;if(/^\s+$/.test(a))return s.append(a);let o=document.createElement("span");o.className="w",o.style.setProperty("--i",e++),o.textContent=a,s.append(o)}),r.replaceWith(s)}else r.nodeType===Node.ELEMENT_NODE&&t(r)})};t(i)}var qe=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n},ud=i=>i?i.split(","):[];async function aS(){let i=document.getElementById("scene"),e=document.querySelector(".stage"),t=document.querySelector("main.story"),n=document.querySelector(".hud"),r=document.querySelector(".rail"),s=document.querySelector(".masthead"),a=document.querySelector(".explore"),o=wd(),l=matchMedia("(max-width: 760px)").matches,c=JSON.parse(a.dataset.facets),h=JSON.parse(a.dataset.ahead),p=JSON.parse(a.dataset.periods??"[]"),d=[...t.querySelectorAll("[data-station]")].map((x,L)=>({element:x,kind:x.dataset.station,id:x.id,label:x.dataset.hud,t:L,panel:x.matches("[data-panel]")?x:x.querySelector("[data-panel]")})),u=d.length-1,m=x=>d.findIndex(L=>L.kind===x),[f,v,g,_]=["book","clone","contact","hero"].map(m),M=d.filter(x=>x.kind==="milestone"),T=M.map(({element:x})=>({id:x.dataset.milestone,date:x.dataset.date,weight:+x.dataset.weight,period:x.dataset.period,links:ud(x.dataset.links),...Object.fromEntries(rr.map(L=>[L,ud(x.dataset[L])]))})),S=Id(T,c,{periods:p,today:o}),b=Lc(T,S.map(x=>x.year),{periods:p,today:o,threads:c.threads}),I=new Map(M.map((x,L)=>[x.t,L])),F=new Map([...t.querySelectorAll("li[data-ask]")].map(x=>[x.dataset.ask,new Set(ud(x.dataset.memories).map(L=>M.findIndex($=>$.element.dataset.milestone===L)).filter(L=>L>=0))])),k=null,U=Object.fromEntries(rr.map(x=>[x,{}]));t.querySelectorAll("ul.facets").forEach(x=>x.querySelectorAll("li").forEach(L=>U[x.dataset.facet][L.dataset.item]=L.textContent));let j=M.map(x=>({time:x.element.querySelector("time").textContent,title:x.element.querySelector("h3").textContent,body:[...x.element.querySelectorAll(":scope > p:not(.kicker):not(.intro)")].map(L=>L.textContent).join(" ")})),V=M.flatMap((x,L)=>{let $=x.element.querySelector(".fresh");return!$||!wm($.dataset.added)?[]:($.hidden=!1,[L])}),K=M.map((x,L)=>({index:L,id:x.id,title:j[L].title,body:j[L].body,extra:`${j[L].time} ${x.element.dataset.alt??""} ${rr.flatMap($=>(S[L].members[$]??[]).map(Ce=>U[$][c[$][Ce]]??"")).join(" ")}`,weight:S[L].weight,order:L})),se=Vd({marks:S,today:o,random:hs(1980),facets:c,sky:b,cap:l?55e3:Mr.cap,trail:l?12e3:Mr.trail}),re=Pd(b),te=new Set(gm(S)),N=ig({canvas:i,cloud:se,marks:S,future:re,today:o,mobile:l,sky:b,kinds:M.map(x=>x.element.dataset.kind)});N.setFresh(V);let Z=document.documentElement,ce=!1,Le=new Set,ve=0,Oe=()=>{clearTimeout(ve),ce=!0,Z.dataset.entering="1",ve=setTimeout(()=>Se(),2e4)},Se=()=>{ce&&(ce=!1,clearTimeout(ve),Z.dataset.entering="out",ve=setTimeout(()=>delete Z.dataset.entering,1600))};Vn.push(()=>{clearTimeout(ve),delete Z.dataset.entering});let ue=navigator.webdriver,X=location.hash.length>1;!ue&&!X&&Oe(),N.home(),N.start();let ee=S.reduce((x,L,$)=>L.year<S[x].year?$:x,0),le=qe("button","seed");le.type="button",le.setAttribute("aria-label",j[ee].title);let he=!1,A=0,E=["pointerup","touchend","click","keydown"],C=()=>E.forEach(x=>document.removeEventListener(x,O,!0));function O(){he||(he=!0,clearTimeout(A),C(),N.begin(ue?"still":X?"direct":"full"),le.dataset.gone="1",setTimeout(()=>le.remove(),1600))}ue||X?O():(document.body.append(le),A=setTimeout(O,ta.wait*1e3),E.forEach(x=>document.addEventListener(x,O,!0))),Vn.push(()=>{clearTimeout(A),C(),le.remove()});let y=new URLSearchParams(location.search).get("quality"),z=y==="low"?mr.tiers.length-1:0,B=y!=="full"&&y!=="low",R={frames:[],windows:0,from:0};N.setQuality(z),i.dataset.quality=String(z);let q=qm(),Y=qe("div","labels");e.append(Y),Vn.push(()=>Y.remove());let J=S.map((x,L)=>{let $=qe("div","tag");return $.innerHTML='<b></b><span></span><i class="leader"></i>',$.querySelector("b").textContent=j[L].time,$.querySelector("span").textContent=j[L].title,$.setAttribute("aria-hidden","true"),Y.append($),{node:$,leader:$.querySelector(".leader"),width:0,height:0,on:!1}}),de=Array.from({length:lg},()=>{let x=qe("button","edge-mark");return x.type="button",x.hidden=!0,x.tabIndex=-1,x.setAttribute("aria-hidden","true"),x.innerHTML="<span></span><i></i>",Y.append(x),x.addEventListener("click",()=>pe(An(+x.dataset.memory))),{node:x,label:x.querySelector("span"),arrow:x.querySelector("i"),width:0,height:0}}),ye="",Ie=Array.from({length:og+1},()=>({x:0,y:0,visible:!0})),_e=[],Fe=(x,L,$,Ce,De=1980,nt=0,wt=-1)=>{let Mt=qe("div",$,x);return Mt.setAttribute("aria-hidden","true"),Y.append(Mt),_e.push({node:Mt,world:L,base:Ce,year:De,kind:$,ring:nt,spotAt:wt,width:0,height:0,shown:-1}),Mt},oe=x=>new P(...x);Fe(e.dataset.today,oe(re.today),"ahead now",1,o,sg.today),_e.at(-1).kind="ahead";let fe=[];b.list.forEach((x,L)=>{let $=t.querySelector(`#period-${p[L]} [data-station]`);if(!$)return;let[Ce,De,nt]=x.centre,[wt,Mt]=[Ce+b.pole[0],De+b.pole[1]],Ht=Math.hypot(wt,Mt)||1,Me=x.radius*.8+2,[It,cn]=br(x,wt/Ht*Me,Mt/Ht*Me),[bn,Ai]=($.querySelector(".kicker")?.textContent??p[L]).split(" \xB7 "),zn=Fe("",oe([Ce+It,De+cn,nt]),"galaxy",.9,(x.start+x.end)/2),Gr=qe("span","galaxy-hint",t.querySelector(`#period-${p[L]}`)?.dataset.hint??""),[Mc,...vr]=bn.split(" / "),ia=qe("span","galaxy-title");ia.append(qe("span","galaxy-number",Mc),...vr.length?[qe("span","galaxy-name",` / ${vr.join(" / ")}`)]:[]),zn.append(ia,qe("b","galaxy-count"),...Ai?[qe("span","galaxy-years",Ai)]:[],Gr,qe("i","leader")),fe[L]=_e.at(-1),fe[L].hint=Gr,fe[L].leader=zn.querySelector(".leader"),fe[L].centre=oe(x.centre),zn.dataset.go=`period-${p[L]}`,zn.addEventListener("click",pi=>{pi.stopImmediatePropagation(),io(rn===L?"top":zn.dataset.go)})});let ge=Array.from({length:ag},()=>(Fe("",new P,"ring-year",cd.quiet,1980),_e.at(-1).dim=0,_e.at(-1))),we=e.dataset.until?so(e.dataset.until):-1;we>=0&&Fe(ao(we,document.documentElement.lang),oe(re.today.map((x,L)=>(x+re.book[L])/2)),"countdown-mark",.8,o);let Wt=[["book",a.dataset.book,a.dataset.bookHint],["clone",a.dataset.clone,a.dataset.cloneHint]].map(([x,L,$],Ce)=>{let De=Fe(L,oe(re[x]),"ahead",.6,1/0,sg[x],S.length+Ce);return $&&De.append(qe("span","ahead-hint",$)),_e.at(-1)}),ft=x=>{Wt.forEach((L,$)=>{let Ce=x===S.length+$;Ce!==(L.node.dataset.hot==="1")&&(L.node.dataset.hot=Ce?"1":"")}),N.setRingGlow(x>=S.length?x-S.length:-1)};document.querySelectorAll('.masthead nav a[data-go="book"], .masthead nav a[data-go="clone"]').forEach(x=>{let L=S.length+(x.dataset.go==="book"?0:1);x.addEventListener("pointerenter",()=>ft(L)),x.addEventListener("focus",()=>ft(L)),x.addEventListener("pointerleave",()=>ft(Xt)),x.addEventListener("blur",()=>ft(Xt))});let be=qe("aside","card");be.setAttribute("tabindex","-1");let at=qe("div","card-body"),Ne=qe("nav","card-steps"),St=qe("button","step",""),$e=qe("button","step","");St.type=$e.type="button",St.dataset.step="previous",$e.dataset.step="next",Ne.append(St,$e);let qt=new Map,Tt=qe("p","visually-hidden");Tt.setAttribute("role","status"),t.querySelectorAll(".waitlist").forEach(x=>{let L=qe("div","card-form");L.hidden=!0,L.dataset.for=x.dataset.list;let[$,Ce]=[x.parentNode,x.nextSibling];L.append(x),qt.set(x.dataset.list,L),Vn.push(()=>$.insertBefore(x,Ce))});let Ft=qe("button","card-close","\u2715");Ft.type="button",Ft.dataset.go="top",Ft.setAttribute("aria-label",a.dataset.overview),Ft.setAttribute("title",a.dataset.overview),be.append(Ft,at,...qt.values(),Ne,Tt),be.id="card",e.after(be),Vn.push(()=>be.remove());let jt=qe("div","nudge");jt.hidden=!0;let nn=qe("a",""),sn=qe("button","","\u2715");sn.type="button",jt.append(nn,sn),Ne.before(jt);let hi=[...t.querySelectorAll("a, button, input, select, textarea")];hi.forEach(x=>x.setAttribute("tabindex","-1")),Vn.push(()=>hi.forEach(x=>x.removeAttribute("tabindex")));let On=document.querySelector(".skip");On&&(On.setAttribute("href","#card"),Vn.push(()=>On.setAttribute("href","#main")));let gn=Sm([...b.list.flatMap(x=>[[x.centre[0]-x.radius,x.centre[1]-x.radius],[x.centre[0]+x.radius,x.centre[1]+x.radius]]),re.today,re.book,re.clone].map(x=>[x[0],x[1]]),us),yn=qe("div","minimap");yn.hidden=!0,yn.setAttribute("aria-hidden","true");let G=document.createElementNS(cg,"svg");G.setAttribute("viewBox",`0 0 ${us.width} ${us.height}`);let Yt=(x,L)=>{let $=document.createElementNS(cg,x);return Object.entries(L).forEach(([Ce,De])=>$.setAttribute(Ce,De)),G.append($),$};b.list.forEach(x=>{let[L,$]=gn.to(x.centre),Ce=Array.from({length:48},(De,nt)=>gn.to(br(x,Math.sin(Math.PI*2*nt/48)*x.radius,Math.cos(Math.PI*2*nt/48)*x.radius).map((wt,Mt)=>x.centre[Mt]+wt)));Yt("polygon",{points:Ce.map(([De,nt])=>`${De.toFixed(1)},${nt.toFixed(1)}`).join(" "),class:"mini-galaxy"})});let an=S.map(x=>{let[L,$]=gn.to(x.position);return Yt("circle",{cx:L.toFixed(1),cy:$.toFixed(1),r:(.6+x.weight*.35).toFixed(2),class:"mini-dot"})}),vt=0;[re.book,re.clone].forEach(x=>{let[L,$]=gn.to(x);Yt("circle",{cx:L.toFixed(1),cy:$.toFixed(1),r:2,class:"mini-future"})});let ze=Yt("polygon",{class:"mini-frame"}),_r=Yt("circle",{r:3.4,class:"mini-here"});yn.append(G),be.after(yn),Vn.push(()=>yn.remove()),yn.addEventListener("click",x=>{let L=yn.getBoundingClientRect(),$=gn.from([(x.clientX-L.left)*us.width/L.width,(x.clientY-L.top)*us.height/L.height]),Ce=Mm(b.list,$);Ce>=0&&io(`period-${p[Ce]}`)});let on={related:a.dataset.related,earlier:a.dataset.earlier,later:a.dataset.later,filter:a.dataset.filter,unfilter:a.dataset.unfilter,more:a.dataset.more,lit:a.dataset.lit,all:a.dataset.all,fewer:a.dataset.fewer,nudgebook:a.dataset.nudgebook,nudgeclone:a.dataset.nudgeclone,nudgeclose:a.dataset.nudgeclose,periodstart:a.dataset.periodstart},ut=0,rn=-1,Fi=()=>rn>=0?-1:dn(ut),He=null,Xt=-1,Ut={on:!1,over:0,away:0},ri={links:[],near:[]},tr=[],Qn=!1,Fn={x:0,y:0},Bn={on:!1,seen:!1,from:null},si={opened:new Set,sawClone:!1,closed:!1},dn=x=>I.get(x)??-1,An=x=>M[x].t,Nn=x=>{let L=d[x];if(L.kind==="hero")return{previous:null,next:M[0].t};if(L.kind==="milestone"){let{previous:$,next:Ce}=am(S,dn(x),He);return{previous:$!==null?An($):!He&&dn(x)===0?0:null,next:Ce!==null?An(Ce):He?null:f}}return L.kind==="book"?{previous:M.at(-1).t,next:v}:L.kind==="clone"?{previous:f,next:g}:L.kind==="contact"?{previous:v,next:null}:{previous:null,next:null}},w=()=>{let x=Fi();ri=x>=0?sc(S,x):{links:[],near:[]};let L=[...ri.links,...ri.near];tr=x<0?[]:Qn?L:rm(S,x);let $=new Set(tr),Ce=k?F.get(k):null,De=Ce?cm(S,Ce):rn>=0?S.map(Me=>Me.period===rn?fr.normal:fr.quiet):lm(S,{selected:x,near:$,weak:new Set(L.filter(Me=>!$.has(Me))),filter:He});N.setLevels(De),e.dataset.levels=[...new Set(De)].sort((Me,It)=>Me-It).join(","),N.setLinks(ri.links.filter(Me=>$.has(Me)),ri.near.filter(Me=>$.has(Me))),N.setSelection(x);let nt=rn>=0?rn:x>=0?S[x].period:-1;q.age(nt);let wt=(!Bn.on||rn>=0)&&nt>=0?Ad(b.list[nt],ag):[],Mt=nt>=0?b.list[nt]:null;N.setYearRings(Mt?.centre??null,wt,Mt??{}),ge.forEach((Me,It)=>{let cn=wt[It];if(Me.dim=cn?1:0,!cn)return;Me.node.textContent=String(cn.year),Me.base=x>=0&&cn.year===Math.floor(S[x].year)?cd.current:cd.quiet;let[bn,Ai]=br(Mt,cn.radius*Math.sin(hg),cn.radius*Math.cos(hg));Me.world.set(Mt.centre[0]+bn,Mt.centre[1]+Ai,Mt.centre[2]),Me.width=0}),N.setFocus(x>=0?S[x].year:null),N.setFilter(He);let Ht=ac(S,He);if(N.setJumps(Ce?hm(Ce,N.slotOf("clone")):um(S,Ht)),b){let Me=dm(S,Ht,b.list.length);fe.forEach((It,cn)=>{It&&(It.dim=nt>=0&&nt!==cn||["book","clone"].includes(d[ut].kind)?0:He&&!Me[cn]?.3:1,It.pin=nt===cn,It.node.dataset.pin=It.pin?"1":"",It.pin?It.node.setAttribute("title",a.dataset.overview):It.node.removeAttribute("title"),It.hint.hidden=x>=0||!!He,It.node.querySelector(".galaxy-count").textContent=He?` \xB7 ${Me[cn]}`:"",It.width=0)})}},W=x=>{let L=d[x];if(rn>=0){let $=b.list[rn];return N.fly({target:$.centre,distance:wn($.radius*4.2+16,40,130),pitch:wn(N.goal.pitch,-.45,.5)}),N.setIdle(!1)}if(L.kind==="milestone"){let $=S[dn(x)],Ce=b.list[$.period];N.fly({target:Ce.centre.map((De,nt)=>De+($.position[nt]-De)*.35),distance:wn(Ce.radius*4.2+16,40,130),pitch:wn(N.goal.pitch,-.45,.5)})}else L.kind==="book"||L.kind==="clone"?N.fly({target:re[L.kind],distance:54,pitch:wn(N.goal.pitch,-.45,.5)}):L.kind==="contact"?N.fly({target:[0,0,-7],distance:N.homeDistance(),yaw:0,pitch:od}):N.home();N.setIdle(L.kind==="hero")},Q=x=>x.querySelectorAll("li[data-ask]").forEach(L=>{let $=qe("button","ask-q",L.querySelector(".ask-q").textContent);$.type="button",$.dataset.ask=L.dataset.ask,$.setAttribute("aria-pressed",String(k===L.dataset.ask)),L.replaceChildren($)}),ae=x=>{if(k=x&&F.has(x)&&d[ut].kind==="clone"?x:null,e.dataset.asked=k??"",be.querySelectorAll(".ask-q").forEach($=>$.setAttribute("aria-pressed",String($.dataset.ask===k))),w(),!k)return W(ut);N.fly({target:[0,0,-7],distance:N.homeDistance(),yaw:0,pitch:od});let L=[...F.get(k)].map($=>M[$].element.querySelector("h3").textContent);Tt.textContent=on.lit.replace("{n}",()=>String(L.length)).replace("{names}",()=>L.join(", "))},ne=x=>x.querySelectorAll("ul.facets").forEach(L=>{let $=L.dataset.facet;L.querySelectorAll("li").forEach(Ce=>{let De=qe("button","chip",Ce.textContent);De.type="button",De.dataset.facet=$,De.dataset.item=Ce.dataset.item,De.setAttribute("aria-pressed",String(He?.facet===$&&c[$][He.item]===Ce.dataset.item)),De.setAttribute("title",on.filter.replace("{thread}",Ce.textContent)),Ce.replaceChildren(De)})}),xe=(x,L)=>{let $=[...ri.links,...ri.near];if(!$.length)return;let Ce=Xu(S,L),De=Qn?$.slice(0,rg):Ce,nt=qe("div","related");nt.append(qe("p","kicker",on.related));let wt=qe("ul");if(De.forEach(Mt=>{let Ht=qe("li"),Me=qe("button","peer");Me.type="button",Me.dataset.memory=String(Mt),Me.append(qe("time","",j[Mt].time),qe("span","",j[Mt].title)),Ht.append(Me),wt.append(Ht)}),wt.addEventListener("scroll",()=>Be()),nt.append(wt),$.length>Ce.length){let Mt=qe("button","expander",Qn?on.fewer:on.all.replace("{n}",String(Math.min($.length,rg))));Mt.type="button",Mt.setAttribute("aria-expanded",String(Qn)),nt.append(Mt)}x.append(nt)},Te=()=>{let x=at.firstElementChild,L=Fi();!x||L<0||(x.querySelector(".related")?.remove(),xe(x,L),be.dataset.collapsed=x.querySelector(".expander")&&!Qn?"1":"",Be(),at.querySelector(".expander")?.focus({preventScroll:!0}))},Re=qe("p","more-cue",a.dataset.continues??"");Re.setAttribute("aria-hidden","true"),be.append(Re);let Pe=()=>{let x=at.scrollHeight>at.clientHeight+4&&at.scrollTop+at.clientHeight<at.scrollHeight-4,L=x?"1":"";be.dataset.overflow!==L&&(be.dataset.overflow=L),x&&(Re.style.bottom=`${(Ne.hidden?0:Ne.offsetHeight)+10}px`)};at.addEventListener("scroll",Pe,{passive:!0});let Be=()=>{Pe();let x=be.querySelector(".related"),L=x?.querySelector("ul");if(!L)return;let $=L.getBoundingClientRect().bottom+2,Ce=[...L.children].filter(De=>De.getBoundingClientRect().bottom>$).length;x.dataset.more=L.scrollHeight>L.clientHeight+2&&Ce?on.more.replace("{n}",String(Ce)):""},Ze=-1,Je=x=>{Ze!==x&&(Ze=x,N.setPreview(x))},Ue=()=>{if(delete be.dataset.fit,!!rS.has(be.dataset.kind)){be.classList.add("measure");for(let x of sS){if(be.scrollHeight<=be.clientHeight)break;be.dataset.fit=x}be.classList.remove("measure")}},gt=()=>{let x=d[ut],L=x.panel.cloneNode(!0);["data-station","data-panel","id"].forEach(Me=>L.removeAttribute(Me)),L.querySelectorAll("[id]").forEach(Me=>Me.removeAttribute("id")),[...L.children].forEach(Me=>Me.matches(".kicker, .period-head")||Me.remove()),L.querySelectorAll("h1, h2, h3").forEach(ug);let $=qe("button","period-start",on.periodstart.replace("{title}",()=>x.element.querySelector("h3")?.textContent??""));$.type="button",$.dataset.go=x.id;let Ce=S.filter(Me=>Me.period===rn),De=[[Ce.length,a.dataset.countMemories],[new Set(Ce.flatMap(Me=>Me.members.people??[])).size,a.dataset.countPeople],[new Set(Ce.flatMap(Me=>Me.members.places??[])).size,a.dataset.countPlaces]].filter(([Me,It])=>Me>0&&It).map(([Me,It])=>It.replace("{n}",String(Me))),nt=qe("div","related"),wt=qe("ul");S.forEach((Me,It)=>{if(Me.period!==rn)return;let cn=qe("li"),bn=qe("button","peer");bn.type="button",bn.dataset.memory=String(It),bn.append(qe("time","",j[It].time),qe("span","",j[It].title)),cn.append(bn),wt.append(cn)}),nt.append(wt),L.append(qe("p","period-facts kicker",De.join(" \xB7 ")),$,nt),Je(-1),at.replaceChildren(L),be.dataset.collapsed="",be.dataset.kind="period",qt.forEach(Me=>Me.hidden=!0);let Mt=Me=>Me>=0&&Me<p.length&&S.some(It=>It.period===Me)?Me:null,Ht=(Me,It,cn)=>{Me.hidden=It===null,Me.dataset.to="",Me.dataset.periodTo=It??"",Me.textContent=cn};Ht(St,Mt(rn-1),`\u2190 ${on.earlier}`),Ht($e,Mt(rn+1),`${on.later} \u2192`),Ne.hidden=St.hidden&&$e.hidden,Ft.hidden=!1,We.running=!1,We.year=null,N.setReveal(null),Xe()},ln=()=>{if(rn>=0)return gt(),requestAnimationFrame(Pe);let x=d[ut],L=x.panel.cloneNode(!0);L.removeAttribute("data-station"),L.removeAttribute("data-panel"),L.removeAttribute("id"),L.querySelectorAll("[id]").forEach(wt=>wt.removeAttribute("id")),L.querySelectorAll("[tabindex]").forEach(wt=>wt.removeAttribute("tabindex")),L.querySelectorAll("h1, h2, h3").forEach(ug),ne(L),Q(L);let $=Fi();$>=0&&xe(L,$),x.kind==="milestone"&&L.querySelector(".period-head")?.remove(),Je(-1),at.replaceChildren(L),be.dataset.collapsed=L.querySelector(".expander")&&!Qn?"1":"",be.dataset.kind=x.kind,qt.forEach((wt,Mt)=>wt.hidden=x.kind!==Mt);let{previous:Ce,next:De}=Nn(ut),nt=(wt,Mt,Ht)=>{wt.hidden=Mt===null,wt.dataset.to=Mt??"",wt.textContent=Ht};nt(St,Ce,`\u2190 ${on.earlier}`),nt($e,De,`${on.later} \u2192`),Ne.hidden=x.kind==="hero"||Ce===null&&De===null,Ft.hidden=x.kind==="hero",Ue(),Be(),be.classList.remove("live"),be.offsetWidth,be.classList.add("live"),be.scrollTop=0,ye="",x.kind!=="hero"&&qt.get(x.kind)?.scrollIntoView({block:"nearest"}),ie||(Tt.textContent=x.label),rt()},Bt=()=>{let x=d[ut];return x.kind==="hero"?ei.start:x.kind==="milestone"?S[dn(ut)].year:{book:ei.book,clone:ei.clone}[x.kind]??ei.end},zt=()=>{let x=d[ut],L=!si.closed&&si.opened.size>=3&&x.kind==="milestone"&&rn<0&&!x.element.dataset.quiet;if(jt.hidden=!L,!L)return;let $=si.sawClone?"clone":"book";nn.dataset.go=$,nn.href=`#${$}`,nn.textContent=on[$==="clone"?"nudgeclone":"nudgebook"],sn.setAttribute("aria-label",on.nudgeclose),sn.setAttribute("title",on.nudgeclose)};sn.addEventListener("click",()=>{si.closed=!0,zt(),be.focus({preventScroll:!0})});let rt=()=>{let x=be.getBoundingClientRect(),L=Math.max(ld,a.getBoundingClientRect().bottom+6);hd.matches?N.setInset(0,(L+Math.max(L+120,x.top))/2-innerHeight/2):N.setInset((x.right+innerWidth)/2-innerWidth/2,(L+innerHeight-K1)/2-innerHeight/2)},xt=r?.querySelector("[data-play]"),We={running:!1,year:null,from:0},Xe=()=>{if(!xt)return;xt.setAttribute("aria-pressed",String(We.running));let x=We.running?xt.dataset.pauseLabel:xt.dataset.playLabel;xt.setAttribute("aria-label",x),xt.setAttribute("title",x),xt.querySelector(".rail-name").textContent=We.running?xt.dataset.pauseName:xt.dataset.playName,r.dataset.playing=We.year===null?"":We.running?"1":"paused"},D=()=>{We.year!==null&&(We.running=!1,We.year=null,N.setReveal(null),Xe())},ie=!1,pe=(x,{push:L=!0,hush:$=!1}={})=>{ie=$,D();let Ce=rn>=0||d[ut].kind!=="hero";ut=wn(x,0,u),rn=-1,e.dataset.period="",k=null,Qn=!1,e.dataset.asked="",He&&Ce&&d[ut].kind==="hero"&&lt(null),d[ut].kind==="milestone"&&!Bn.seen&&(Bn.seen=!0,Bn.on=!0,Bn.from={...Fn},e.dataset.gentle="1");let De=d[ut];if(document.documentElement.dataset.at=ut,n.textContent=De.label,w(),W(ut),d[ut].kind==="milestone"&&!$&&si.opened.add(ut),d[ut].kind==="clone"&&(si.sawClone=!0),ln(),zt(),r&&r.querySelector(".rail-cursor")?.style.setProperty("--x",`${_s(Bt()).toFixed(2)}%`),De.kind==="milestone"?q.memory(S[dn(ut)]):(De.kind==="book"||De.kind==="clone")&&q.swell(De.kind),L)try{history.replaceState(null,"",De.kind==="hero"?`${location.pathname}${location.search}`:`#${De.id}`)}catch{return}},et=(x,{push:L=!0}={})=>{let $=S.findIndex(Ce=>Ce.period===x);if(!($<0)&&(ie=!1,D(),ut=An($),rn=x,k=null,Qn=!1,e.dataset.asked="",e.dataset.period=p[x],document.documentElement.dataset.at=ut,n.textContent=d[ut].element.querySelector(".kicker")?.textContent??"",w(),W(ut),ln(),zt(),r?.querySelector(".rail-cursor")?.style.setProperty("--x",`${_s(Bt()).toFixed(2)}%`),q.memory(S[sm(S,x,1)[0]]),L))try{history.replaceState(null,"",`#period-${p[x]}`)}catch{return}},lt=x=>{He=x,a.querySelectorAll(".legend button").forEach(L=>{let $=L.closest(".legend").dataset.facet;L.setAttribute("aria-pressed",String(!!He&&He.facet===$&&c[$][He.item]===L.dataset.item))}),be.querySelectorAll(".chip").forEach(L=>L.setAttribute("aria-pressed",String(!!He&&He.facet===L.dataset.facet&&c[L.dataset.facet][He.item]===L.dataset.item))),e.dataset.filter=He?`${He.facet}:${c[He.facet][He.item]}`:"",ot.hidden=!He,Gn.dataset.active=He?"1":"",Gn.setAttribute("aria-label",He?`${vn} \xB7 ${U[He.facet][c[He.facet][He.item]]??""}`:vn),He&&(ot.textContent=`\u2715 ${U[He.facet][c[He.facet][He.item]]??""}`,ot.setAttribute("aria-label",`${on.unfilter}: ${U[He.facet][c[He.facet][He.item]]??""}`)),w(),d[ut].kind==="milestone"&&rn<0&&ln()},ot=a.querySelector("[data-unfilter]");ot.addEventListener("click",()=>lt(null));let Ge=(x,L)=>{let $=c[x].indexOf(L);lt(He?.facet===x&&He.item===$?null:{facet:x,item:$})};a.querySelectorAll(".legend button").forEach(x=>x.addEventListener("click",()=>Ge(x.closest(".legend").dataset.facet,x.dataset.item)));let Lt=[...a.querySelectorAll(".legend")];Lt.forEach(x=>x.hidden=!1),Vn.push(()=>Lt.forEach(x=>x.hidden=!0));let Gt=a.querySelector("[data-legend-toggle]");Gt?.addEventListener("click",()=>{let x=a.dataset.legend!=="open";x&&Jt(!1),a.dataset.legend=x?"open":"",Gt.setAttribute("aria-expanded",String(x)),rt()}),e.dataset.filter="";let ct=a.querySelector(".finder"),Nt=ct.querySelector("input"),Vt=ct.querySelector(".results"),_t=ct.querySelector(".none"),Rn=a.querySelector("[data-find]"),ke=ct.querySelector(".preview"),Cn=x=>{ke.dataset.on=x>=0?"1":"",!(x<0)&&(ke.querySelector("time").textContent=j[x].time,ke.querySelector("strong").textContent=j[x].title,ke.querySelector("p").textContent=j[x].body.match(/^.*?[.!?](?=\s|$)/)?.[0]??j[x].body)},Sn=x=>{let L=x.target.closest?.(".peer[data-memory]"),$=L&&ct.contains(L)?+L.dataset.memory:-1;Cn($),Je($)},kn=x=>{let L=qe("li"),$=qe("button","peer");return $.type="button",$.dataset.memory=String(x),$.append(qe("time","",j[x].time),qe("span","",j[x].title)),L.append($),L},nr=()=>Vt.replaceChildren(...[...t.querySelectorAll("section.period")].flatMap(x=>{let L=[...x.querySelectorAll("[data-station='milestone']")].map(Ce=>dn(d.findIndex(De=>De.element===Ce))),$=qe("li","group",x.querySelector(".kicker")?.textContent??"");return $.setAttribute("aria-hidden","true"),[$,...L.map(kn)]})),_n=x=>{ct.hidden=!x,Rn.setAttribute("aria-expanded",String(x)),x?(Nt.value.trim()||nr(),Mn.hidden||Jt(!1),Nt.focus()):(Cn(-1),Je(-1),ct.contains(document.activeElement)&&document.activeElement.blur(),Nt.value="",Vt.replaceChildren(),_t.textContent="")};Rn.addEventListener("click",()=>_n(ct.hidden)),ct.addEventListener("focusin",Sn),Vt.addEventListener("pointerover",Sn),Vt.addEventListener("pointerleave",()=>{(!ct.contains(document.activeElement)||document.activeElement===Nt)&&(Cn(-1),Je(-1))}),Nt.addEventListener("input",()=>{let x=Wu(K,Nt.value),L=om(S,c,U,Nt.value);Vt.replaceChildren(...L.map($=>{let Ce=qe("li"),De=qe("button","peer show");return De.type="button",De.dataset.facet=$.facet,De.dataset.item=c[$.facet][$.item],De.append(qe("time","",String($.count)),qe("span","",on.filter.replace("{thread}",$.title))),Ce.append(De),Ce}),...x.map($=>kn($.index))),Nt.value.trim()||nr(),_t.textContent=Nt.value.trim()&&!x.length&&!L.length?_t.dataset.none:""}),ct.addEventListener("submit",x=>{x.preventDefault(),Vt.querySelector("button")?.click()}),Vt.addEventListener("click",x=>{let L=x.target.closest("button");if(L){if(_n(!1),L.dataset.facet){let $=c[L.dataset.facet].indexOf(L.dataset.item);return lt(He?.facet===L.dataset.facet&&He.item===$?He:{facet:L.dataset.facet,item:$})}pe(An(+L.dataset.memory)),be.focus({preventScroll:!0})}}),ct.addEventListener("keydown",x=>{if(x.key==="ArrowDown"||x.key==="ArrowUp"){let L=[...Vt.querySelectorAll("button")];if(!L.length)return;x.preventDefault();let $=L.indexOf(document.activeElement);L[wn($+(x.key==="ArrowDown"?1:-1),0,L.length-1)]?.focus(),$===0&&x.key==="ArrowUp"&&Nt.focus()}}),a.querySelector("[data-surprise]").addEventListener("click",()=>{let x=dn(ut),L=x;for(;L===x&&S.length>1;)L=Math.floor(Math.random()*S.length);pe(An(L))});let Mn=a.querySelector(".guide"),Et=a.querySelector("[data-guide-toggle]"),Jt=x=>{Mn.hidden=!x,Et.setAttribute("aria-expanded",String(x)),x&&(_n(!1),a.dataset.legend="",Gt?.setAttribute("aria-expanded","false"))};Et.addEventListener("click",()=>Jt(Mn.hidden)),Rn.addEventListener("click",()=>!ct.hidden&&Jt(!1));let Gn=a.querySelector("[data-more-toggle]"),vn=Gn.getAttribute("aria-label"),Dt=x=>{a.dataset.sheet=x?"open":"",Gn.setAttribute("aria-expanded",String(x))};Gn.addEventListener("click",()=>Dt(a.dataset.sheet!=="open"));let Kt=a.querySelector(".sheet");Kt.addEventListener("click",x=>{let L=x.target.closest("button, a");if(!L||L.matches(".lang"))return L&&Dt(!1);Dt(!1),((L.matches("[data-legend-toggle]")?a.querySelector(".legend button"):Gn)??Gn).focus()}),Kt.addEventListener("focusout",x=>a.dataset.sheet==="open"&&!Kt.contains(x.relatedTarget)&&x.relatedTarget!==Gn&&Dt(!1));let Dn=x=>a.dataset.sheet==="open"&&!x.target.closest(".sheet, [data-more-toggle]")&&Dt(!1);document.addEventListener("pointerdown",Dn),i.addEventListener("pointerdown",()=>Jt(!1)),Vn.push(()=>document.removeEventListener("pointerdown",Dn));let xi=a.querySelector("[data-sound]");if(q.supported){xi.hidden=!1,xi.setAttribute("aria-pressed","true"),xi.addEventListener("click",()=>xi.setAttribute("aria-pressed",String(q.toggle())));let x=De=>{if(q.running())return $();De.target.closest?.("[data-sound]")||q.start()},L=["pointerup","touchend","click","keydown"],$=()=>L.forEach(De=>document.removeEventListener(De,x,!0));L.forEach(De=>document.addEventListener(De,x,!0));let Ce=()=>q.pause(document.hidden);document.addEventListener("visibilitychange",Ce),Vn.push(()=>{$(),document.removeEventListener("visibilitychange",Ce),q.close(),xi.setAttribute("aria-pressed","false"),xi.hidden=!0})}let ui=qe("p","visually-hidden");ui.setAttribute("role","status"),e.append(ui);let ir=null,di=()=>document.documentElement.dataset.focus==="1",ds=x=>{document.documentElement.dataset.focus=x?"1":"",ui.textContent=x?a.dataset.focusNote:"",ir=x?{...Fn}:null,x&&(Jt(!1),Dt(!1),_n(!1))},Ae=()=>di()&&ds(!1),Ot=()=>{Bn.on&&(Bn.on=!1,e.dataset.gentle="",w())},ai=performance.now()/1e3,Ei=()=>ai=performance.now()/1e3,Bi=x=>{Fn.x=x.clientX,Fn.y=x.clientY,ir&&Math.hypot(Fn.x-ir.x,Fn.y-ir.y)>12&&Ae(),Bn.on&&Math.hypot(Fn.x-Bn.from.x,Fn.y-Bn.from.y)>12&&Ot(),Math.abs(x.movementX)+Math.abs(x.movementY)>6&&Ei()},ps=()=>{Ae(),Ot(),Ei()},to=[["pointermove",Bi],["pointerdown",ps],["wheel",ps],["touchstart",ps]];to.forEach(([x,L])=>addEventListener(x,L,{passive:!0})),Vn.push(()=>{to.forEach(([x,L])=>removeEventListener(x,L)),delete document.documentElement.dataset.focus});let vc=Cm(S),xc={phase:"waiting",step:0,at:0};be.addEventListener("pointerover",x=>{let L=x.target.closest(".related .peer");Je(L?+L.dataset.memory:-1)}),be.addEventListener("pointerleave",()=>Je(-1)),be.addEventListener("focusin",x=>{let L=x.target.closest(".related .peer");L&&Je(+L.dataset.memory)}),be.addEventListener("focusout",()=>Je(-1)),be.addEventListener("click",x=>{let L=x.target.closest(".chip");if(L)return Ge(L.dataset.facet,L.dataset.item);if(x.target.closest(".expander"))return Qn=!Qn,w(),Te();let Ce=x.target.closest(".ask-q");if(Ce)return ae(k===Ce.dataset.ask?null:Ce.dataset.ask);let De=x.target.closest(".peer");if(De)return pe(An(+De.dataset.memory)),be.focus({preventScroll:!0});let nt=x.target.closest(".step");if(nt&&nt.dataset.periodTo)return et(+nt.dataset.periodTo),be.focus({preventScroll:!0});if(nt&&nt.dataset.to!=="")return pe(+nt.dataset.to),be.focus({preventScroll:!0});let wt=x.target.closest("[data-go]");wt&&kr.has(wt.dataset.go)&&(x.preventDefault(),io(wt.dataset.go))});let kr=new Map(d.map(x=>[x.id,x.t])),no=new Map(p.map((x,L)=>[`period-${x}`,L]));document.querySelectorAll("section.period").forEach(x=>{let L=x.querySelector("[data-station]");kr.set(x.id,d.findIndex($=>$.element===L))});let io=x=>{if(!kr.has(x))return;if(no.has(x))return et(no.get(x));let L=kr.get(x);pe(L),d[L].kind!=="hero"&&qt.get(d[L].kind)?.querySelector("input, a, button")?.focus()},yc=()=>{let x;try{x=decodeURIComponent(location.hash.slice(1))}catch{return}if(!x)return pe(0,{push:!1});if(no.has(x))return et(no.get(x),{push:!1});kr.has(x)&&pe(kr.get(x),{push:!1})};document.querySelectorAll("[data-go]").forEach(x=>x.addEventListener("click",L=>{be.contains(x)||!kr.has(x.dataset.go)||(L.preventDefault(),io(x.dataset.go))})),addEventListener("hashchange",yc),Vn.push(()=>removeEventListener("hashchange",yc)),t.addEventListener("focusin",x=>{let L=d.find($=>$.element.contains(x.target));L&&L.t!==ut&&pe(L.t)});let dd={hero:_,book:f,clone:v};qt.forEach((x,L)=>x.addEventListener("focusin",()=>ut!==dd[L]&&pe(dd[L])));let pd={ArrowDown:1,ArrowRight:1,PageDown:1," ":1,ArrowUp:-1,ArrowLeft:-1,PageUp:-1},fd=x=>{if(!(x.metaKey||x.ctrlKey||x.altKey)&&(Ei(),Ot(),!(di()&&x.key.toLowerCase()!=="h"&&(ds(!1),x.key==="Escape")))){if(x.key==="Escape"){if(!Mn.hidden)Jt(!1),Et.focus();else if(a.dataset.sheet==="open")Dt(!1),Gn.focus();else if(!ct.hidden)_n(!1),Rn.focus();else{if(x.target.closest("input, textarea, select"))return;k?ae(null):He?lt(null):ut!==0&&pe(0)}return}if(!x.target.closest("input, textarea, select, .finder")){if(x.key==="/")return x.preventDefault(),_n(!0);if(x.key==="?")return x.preventDefault(),Jt(Mn.hidden);if(x.key.toLowerCase()==="h")return x.preventDefault(),x.repeat?void 0:ds(!di());if(!(x.key===" "&&x.target.closest("button, a, summary, [role='button']"))){if(x.key==="Home")x.preventDefault(),pe(0);else if(x.key==="End")x.preventDefault(),pe(g);else if(x.key in pd){x.preventDefault();let L=x.key===" "&&x.shiftKey?-1:pd[x.key],{previous:$,next:Ce}=Nn(ut),De=L>0?Ce:$;De!==null&&pe(De)}}}}};addEventListener("keydown",fd),Vn.push(()=>removeEventListener("keydown",fd)),N.on("hover",x=>{if(x>=0&&x!==Xt&&q.tick(),Xt=x,be.querySelectorAll(".peer[data-lit]").forEach(L=>delete L.dataset.lit),x>=0){let L=be.querySelector(`.related .peer[data-memory="${x}"]`);if(L){L.dataset.lit="1";let $=L.closest("ul");L.offsetTop<$.scrollTop?$.scrollTop=L.offsetTop:L.offsetTop+L.offsetHeight>$.scrollTop+$.clientHeight&&($.scrollTop=L.offsetTop+L.offsetHeight-$.clientHeight)}}N.setHover(x),ft(x),i.style.cursor=x>=0?"pointer":""});let pg=x=>x===S.length?f:x===S.length+1?v:-1;N.on("click",x=>{x>=0&&pe(x<S.length?An(x):pg(x))});let md=d.filter(x=>["milestone","book","clone"].includes(x.kind)),Sc=d.map(x=>x.kind==="milestone"?S[dn(x.t)].year:{hero:ei.start,book:ei.book,clone:ei.clone}[x.kind]??ei.end);if(r){let x=r.querySelector(".rail-track"),L=r.querySelector(".rail-tip");r.querySelector(".rail-today")?.style.setProperty("--x",`${_s(o).toFixed(2)}%`);let $=Ht=>{let Me=x.getBoundingClientRect();return ei.start+wn((Ht.clientX-Me.left)/Me.width,0,1)*(ei.end-ei.start)},Ce=Ht=>md.reduce((Me,It)=>Math.abs(Sc[It.t]-Ht)<Math.abs(Sc[Me.t]-Ht)?It:Me,md[0]),De=Ht=>`${Ht.element.querySelector("time")?.textContent??""} \xB7 ${Ht.element.querySelector("h3, h2")?.textContent??""}`.replace(/^ · /,""),nt=!1,wt=-1,Mt=Ht=>{let Me=Ce($(Ht));return L.textContent=De(Me),L.style.setProperty("--x",`${_s(Sc[Me.t]).toFixed(2)}%`),L.dataset.on="1",Me};x.addEventListener("pointerdown",Ht=>{nt=!0,x.setPointerCapture(Ht.pointerId);let Me=Mt(Ht);wt=Me.t,pe(Me.t)}),x.addEventListener("pointermove",Ht=>{let Me=Mt(Ht);nt&&Me.t!==wt&&(wt=Me.t,pe(Me.t))}),x.addEventListener("pointerup",()=>nt=!1),x.addEventListener("pointerleave",()=>L.dataset.on="")}xt?.addEventListener("click",()=>{if(We.running)return We.running=!1,Xe();We.year===null&&(ut!==0&&pe(0),We.year=1980),We.running=!0,We.from=performance.now()/1e3-Hd(We.year,o),Xe()});let fg=()=>{let x=[be,a,n,r].filter(Boolean).map($=>$.getBoundingClientRect()),L=ct.hidden?null:ct.getBoundingClientRect();return L&&x.push(L),x},wi=(x,L)=>x.left<L.right&&x.right>L.left&&x.top<L.bottom&&x.bottom>L.top;N.on("frame",({formed:x,projected:L,camera:$,cssScale:Ce,time:De,dt:nt,intro:wt,entered:Mt,seen:Ht})=>{if(le.isConnected){let H=L[ee];le.style.left=`${H.x}px`,le.style.top=`${H.y}px`,le.style.visibility=H.on?"visible":"hidden"}if(ce&&(Number.isFinite(x)&&b.list.forEach((H,Ke)=>{if(Le.has(Ke)||x<H.start)return;Le.add(Ke);let kt=S.findIndex(At=>At.year>=H.start-.01);kt>=0&&q.memory({...S[kt],period:-1})}),Mt&&Se()),B&&R.windows<mr.windows&&wt>=1&&!document.hidden&&(R.from||(R.from=De+1),De>=R.from&&(R.frames.push(Em(nt*1e3)),R.frames.length>=mr.window))){let H=Rm(z,Am(R.frames));R.frames=[],R.windows++,H!==z&&(z=H,N.setQuality(z),i.dataset.quality=String(z))}let Me=performance.now()/1e3,It=!document.hidden&&ct.hidden&&Mn.hidden&&a.dataset.sheet!=="open"&&!He&&We.year===null&&!di()&&!document.activeElement?.closest?.("input, textarea, select, button, a, .finder, .card, .masthead, .rail")&&!be.matches(":hover"),cn=Im(xc,{now:Me,idleSince:ai,eligible:It&&(xc.phase==="touring"||ut===0),plan:vc},{wait:+a.dataset.idle||20,hold:+a.dataset.tourHold||6});xc=cn.state,cn.open?.age!==void 0?et(cn.open.age,{push:!1}):cn.open?pe(cn.open.ahead==="book"?f:v,{push:!1,hush:!0}):cn.done&&pe(0,{push:!1,hush:!0}),We.running&&(We.year=Gd(performance.now()/1e3-We.from,o),N.setReveal(We.year),r.querySelector(".rail-cursor")?.style.setProperty("--x",`${_s(We.year).toFixed(2)}%`),n.textContent=String(Math.floor(We.year)),We.year>=o&&(D(),n.textContent=d[ut].label)),Ut.over=Xt>=0?Ut.over+nt:0,Ut.away=Xt>=0?0:Ut.away+nt,Ut.over>.35?Ut.on=!0:Ut.away>.8&&(Ut.on=!1);let bn=Fi(),Ai=N.view.distance/N.homeDistance(),zn=fg().map(H=>({left:H.left-12,right:H.right+12,top:H.top-12,bottom:H.bottom+12}));zn.push({left:0,right:innerWidth,top:0,bottom:Math.max(ld,(s?.getBoundingClientRect().bottom??0)+4)},{left:0,right:innerWidth,top:innerHeight-60,bottom:innerHeight});let Gr=[],Mc=hd.matches,vr=!Bn.on&&bm(Ai,innerWidth,520,!Mc||be.getBoundingClientRect().top>=us.top+us.height+8),ia=vr?"on":"off";e.dataset.map!==ia&&(e.dataset.map=ia),yn.hidden===vr&&(yn.hidden=!vr);let pi=vr?yn.getBoundingClientRect():null;if(vr&&bn>=0){let H=S[bn].position[2];vt++%8===0&&an.forEach((dt,In)=>{let pn=N.centerOf(In),[tt,fn]=gn.to([pn.x,pn.y]);dt.setAttribute("cx",tt.toFixed(1)),dt.setAttribute("cy",fn.toFixed(1))}),ze.setAttribute("points",[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([dt,In])=>gn.to(N.groundAt(dt,In,H)).map(pn=>pn.toFixed(1)).join(",")).join(" "));let Ke=N.centerOf(bn),[kt,At]=gn.to([Ke.x,Ke.y]);_r.setAttribute("cx",kt.toFixed(1)),_r.setAttribute("cy",At.toFixed(1))}pi&&(zn.push({left:pi.left-8,right:pi.right+8,top:pi.top-8,bottom:pi.bottom+8}),Gr.push(pi));let _d=new Map,vd=[],bc=[];if(bn>=0&&We.year===null&&!He){let H=be.getBoundingClientRect(),Ke=hd.matches,kt={left:Ke?12:H.right+12,right:innerWidth-12,top:Math.max(ld,a.getBoundingClientRect().bottom+6),bottom:Math.min((r?.getBoundingClientRect().top??innerHeight-100)-8,Ke?H.top-8:1/0)},At=L[bn],dt=Math.min(innerWidth,innerHeight)/2,In=At&&At.x>=kt.left&&At.x<=kt.right&&At.y>=kt.top&&At.y<=kt.bottom?{left:Math.max(kt.left,At.x-dt),right:Math.min(kt.right,At.x+dt),top:Math.max(kt.top,At.y-dt),bottom:Math.min(kt.bottom,At.y+dt)}:kt;tr.slice(0,nS).forEach(tt=>{let fn=Ie.map((mn,hn)=>N.arcScreen(bn,tt,hn/og,mn)),Rt=_m(fn,In),it=L[tt]?.on&&!wi({left:L[tt].x,right:L[tt].x,top:L[tt].y,bottom:L[tt].y},H);Rt&&!it&&vd.push({j:tt,...Rt})});let pn=vd.slice(0,lg).map((tt,fn)=>{let Rt=de[fn],it=`${j[tt.j].title} \xB7 ${j[tt.j].time}`;Rt.label.textContent!==it&&(Rt.label.textContent=it,Rt.width=Rt.height=0),Rt.node.hidden=!1,Rt.width||(Rt.width=Rt.node.offsetWidth),Rt.height||(Rt.height=Rt.node.offsetHeight);let mn=vm(tt,In);return{mark:Rt,exit:tt,side:mn,box:xm(tt,mn,Rt,In),shown:!1}});ym(pn,In,4,pi?[{left:pi.left,right:pi.right,top:pi.top,bottom:pi.bottom}]:[]),de.forEach((tt,fn)=>{let Rt=pn[fn];Rt?.shown?tt.keep=tS:tt.keep>0&&tt.held&&(!Rt||Rt.exit.j===tt.held.exit.j)?tt.keep-=nt:tt.held=null;let it=Rt?.shown?Rt:tt.held;tt.held=it??null,tt.node.hidden=!it,it&&(tt.node.style.transform=`translate3d(${it.box.left.toFixed(1)}px, ${it.box.top.toFixed(1)}px, 0)`,tt.node.dataset.memory=String(it.exit.j),tt.node.dataset.side=it.side,_d.set(it.exit.j,it.exit.t),bc.push(it.exit.j),Gr.push(it.box),tt.arrow.style.cssText=`left: ${(it.exit.x-it.box.left).toFixed(1)}px; top: ${(it.exit.y-it.box.top).toFixed(1)}px; --a: ${it.exit.angle.toFixed(3)}rad`,zn.push({left:it.box.left-4,right:it.box.right+4,top:it.box.top-4,bottom:it.box.bottom+4}))})}else de.forEach(H=>{H.node.hidden=!0,H.held=null});N.setLinkReach(_d),e.dataset.edges=String(de.filter(H=>!H.node.hidden).length||"");let xd=bc.join(",");if(xd!==ye){ye=xd;let H=new Set(bc.map(String));be.querySelectorAll(".peer[data-memory]").forEach(Ke=>Ke.dataset.out=H.has(Ke.dataset.memory)?"1":"")}let Qt={x:0,y:0,visible:!1},Hn={x:0,y:0,visible:!1},mg=fe.filter(H=>H&&H.dim>0).map(H=>{N.project(H.centre,Hn);let[Ke,kt]=[Hn.x,Hn.y];return N.project(H.world,Qt),{item:H,x:Ke,y:kt,r:Math.hypot(Qt.x-Ke,Qt.y-kt)}}),gg=L.slice(S.length).filter(H=>H.on).map(H=>({item:null,x:H.x,y:H.y,r:Math.max(H.r,12)}));_e.forEach(H=>{let Ke=H.base*(H.year<=x?1:0);if(We.year!==null&&H.year>We.year&&(Ke=0),Ke*=H.dim??1,N.project(H.world,Qt),!Qt.visible)Ke=0;else if(H.width||(H.width=H.node.offsetWidth),H.height||(H.height=H.node.offsetHeight),H.kind==="ahead"){let{width:At,height:dt}=H,In=H.spotAt>=0?L[H.spotAt].r:H.ring*Ce/$.position.distanceTo(H.world),pn=mm(In),tt=eS.flatMap(fn=>iS.map(([Rt,it])=>{let mn=pn+fn,hn=Qt.x+Rt*mn-(Rt<0?At:Rt===0?At/2:0),xr=Qt.y+it*mn-(it<0?dt:it===0?dt/2:0);return{left:hn,right:hn+At,top:xr,bottom:xr+dt}})).find(fn=>fn.left>=12&&fn.right<=innerWidth-12&&!zn.some(Rt=>wi(fn,Rt)));tt?(H.node.style.transform=`translate3d(${tt.left.toFixed(1)}px, ${tt.top.toFixed(1)}px, 0)`,H.node.style.setProperty("--cx",Qt.x.toFixed(1)),H.node.style.setProperty("--cy",Qt.y.toFixed(1)),H.node.style.setProperty("--r",Math.min(In,70).toFixed(1)),Ke>.2&&zn.push({left:tt.left-4,right:tt.right+4,top:tt.top-4,bottom:tt.bottom+4})):Ke=0}else{if(H.centre){N.project(H.centre,Hn);let pn=Math.atan2(Qt.y-Hn.y,Qt.x-Hn.x),tt=Math.hypot(Qt.x-Hn.x,Qt.y-Hn.y),fn=({turn:Vi,scale:oi})=>{let[Hr,li]=[Math.cos(pn+Vi*(Math.PI/4)),Math.sin(pn+Vi*(Math.PI/4))],Wn=Math.abs(Hr)*(H.width/2)+Math.abs(li)*(H.height/2)+4,yr=wn(Hn.x+Hr*(tt*oi+Wn),H.width/2+12,innerWidth-H.width/2-12),wc=Hn.y+li*(tt*oi+Wn);return{x:yr,y:wc,box:{left:yr-H.width/2,right:yr+H.width/2,top:wc-H.height/2,bottom:wc+H.height/2}}},Rt=({box:Vi})=>!zn.some(oi=>wi(Vi,oi))&&!Gr.some(oi=>wi(Vi,oi)),it=Vi=>{let{box:oi}=fn(Vi);return[...mg,...gg].reduce((Hr,li)=>Hr+Math.max(0,li.r*.95-Math.hypot(wn(li.x,oi.left,oi.right)-li.x,wn(li.y,oi.top,oi.bottom)-li.y))*(li.item===H?.6:li.item===null?1.5:1),0)},hn=(H.option&&Rt(fn(H.option))&&it(H.option)===0?H.option:null)??(()=>{let Vi=[1,1.5,2.1,2.8].flatMap(Wn=>[0,1,-1,2,-2,3,-3,4,.5,-.5,1.5,-1.5,2.5,-2.5,3.5,-3.5].map(yr=>({turn:yr,scale:Wn}))),oi=Vi.filter(Wn=>Rt(fn(Wn))).map(Wn=>({candidate:Wn,cost:it(Wn)+(Wn.scale-1)*18})),Hr=oi.reduce((Wn,yr)=>yr.cost<Wn.cost-.5?yr:Wn,{candidate:Vi[0],cost:1/0}),li=oi.find(Wn=>Wn.candidate.turn===H.option?.turn&&Wn.candidate.scale===H.option?.scale);return li&&li.cost<=Hr.cost+8?li.candidate:Hr.candidate})();H.option=hn;let xr=fn(hn);Qt.x=xr.x,Qt.y=xr.y;let zi=qu(xr.box,{x:Hn.x,y:Hn.y,r:tt*2});H.node.dataset.leader=zi&&zi.length>10&&!H.pin?"1":"",zi&&Object.assign(H.leader.style,{left:`${zi.x.toFixed(1)}px`,top:`${zi.y.toFixed(1)}px`,width:`${zi.length.toFixed(1)}px`,transform:`rotate(${zi.angle.toFixed(3)}rad)`});let Sd=`${Hn.x.toFixed(0)},${Hn.y.toFixed(0)},${tt.toFixed(0)}`;H.mass!==Sd&&(H.mass=Sd,H.node.style.setProperty("--cx",Hn.x.toFixed(0)),H.node.style.setProperty("--cy",Hn.y.toFixed(0)),H.node.style.setProperty("--r",tt.toFixed(0)))}if(Qt.x=wn(Qt.x,H.width/2+12,innerWidth-H.width/2-12),H.pin){let pn=H.height+6,tt=[0,1,-1,2,-2,3,-3].map(fn=>Qt.y+fn*pn).find(fn=>!zn.some(Rt=>wi({left:Qt.x-H.width/2,right:Qt.x+H.width/2,top:fn-H.height/2,bottom:fn+H.height/2},Rt)));tt!==void 0&&(Qt.y=tt)}H.node.style.transform=`translate3d(${Qt.x.toFixed(1)}px, ${Qt.y.toFixed(1)}px, 0)`;let At=H.kind==="ring-year"||H.kind==="countdown-mark"?1:4,dt={left:Qt.x-H.width/2-At,right:Qt.x+H.width/2+At,top:Qt.y-H.height/2-At,bottom:Qt.y+H.height/2+At};(H.kind==="ring-year"||H.kind==="countdown-mark")&&zn.some(pn=>wi(dt,pn))&&(Ke=0);let In={left:dt.left+4,right:dt.right-4,top:dt.top+4,bottom:dt.bottom-4};H.kind==="galaxy"&&!H.pin&&(Gr.some(pn=>wi(In,pn))||zn.some(pn=>wi(In,pn)))&&(Ke=0),Ke>.2&&zn.push(dt)}let kt=Math.round(Ke*100)/100;kt!==H.shown&&(H.shown=kt,H.node.style.opacity=kt,H.node.style.visibility=kt>0?"visible":"hidden")});let _g=innerWidth<=760?8:Ai>.8?14:Q1,Tc=[],yd=[];L.forEach((H,Ke)=>Ke<S.length&&H.on&&H.r>3&&yd.push({j:Ke,left:H.x-H.r*.7,right:H.x+H.r*.7,top:H.y-H.r*.7,bottom:H.y+H.r*.7})),J.forEach((H,Ke)=>{let kt=L[Ke],At=S[Ke],dt=0;Ke===bn?dt=1e3:Ke===Xt?dt=900:Ke===Ze?dt=880:He&&At.members[He.facet]?.includes(He.item)?dt=300+At.weight:At.weight>=3&&Ai<.6?dt=30:At.weight===2&&Ai<.5?dt=20:Ai<.22&&(dt=10),bn>=0&&dt<500&&(dt=0),Ut.on&&Ke!==Xt&&dt===40&&(dt=0),At.year+3>x&&Ke!==bn&&(dt=0),!he&&Ht&&Ke===ee&&(dt=900),rn>=0&&(dt=Ke===Xt||Ke===Ze?900:0),We.year!==null&&(dt=At.year<=We.year&&At.year>We.year-2.5?800+At.weight:0),dt>0&&kt.on?Tc.push({tag:H,spot:kt,priority:dt,i:Ke}):H.on&&(H.on=!1,H.node.dataset.on="")}),Tc.sort((H,Ke)=>Ke.priority-H.priority||H.i-Ke.i);let Ec=[];for(let{tag:H,spot:Ke,priority:kt,i:At}of Tc){let dt=kt===40||kt===900&&At===Xt&&bn<0&&rn<0&&Ai>=.6?"1":"",In=At===bn||At===Xt?"1":"";(H.node.dataset.name!==dt||H.node.dataset.hot!==In)&&(H.glide=H.node.dataset.hot!==In,H.node.dataset.cool=H.node.dataset.hot==="1"&&!In?"1":"",H.node.dataset.name=dt,H.node.dataset.hot=In,H.width=H.height=0),H.width||(H.width=H.node.offsetWidth),H.height||(H.height=H.node.offsetHeight);let pn=pm(Ke,{width:H.width,height:H.height},innerWidth);if(pn.forEach((mn,hn)=>mn.slot=hn),kt>=900){let mn=wn(Ke.x-H.width/2,12,innerWidth-H.width-12);pn.splice(8,0,{left:mn,right:mn+H.width,top:Ke.y-H.height/2,bottom:Ke.y+H.height/2,far:!1})}let tt=mn=>mn.left>=12&&mn.right<=innerWidth-12,it=fm(pn,{free:mn=>tt(mn)&&!zn.some(hn=>wi(mn,hn))&&!Ec.some(hn=>wi(mn,{left:hn.left-6,right:hn.right+6,top:hn.top-4,bottom:hn.bottom+4})),clear:mn=>!yd.some(hn=>hn.j!==At&&wi(mn,hn)),inside:tt,forced:kt>=900,keep:H.on?H.slot:-1});if(it&&!(it.far&&kt<900)&&Ec.length<_g){Ec.push(it);let mn=H.on&&H.slot!==void 0&&H.slot!==it.slot;H.slot=it.slot;let hn=it.far?qu(it,Ke):null;hn?(Object.assign(H.leader.style,{left:`${hn.x.toFixed(1)}px`,top:`${hn.y.toFixed(1)}px`,width:`${hn.length.toFixed(1)}px`,transform:`rotate(${hn.angle.toFixed(3)}rad)`}),H.node.dataset.leader="1"):H.node.dataset.leader="",(H.glide||mn)&&H.on&&H.last&&(H.slide=[H.last.left-it.left,H.last.top-it.top]),H.glide=!1,H.last={left:it.left,top:it.top};let xr=Math.exp(-3*nt);H.slide=H.slide?H.slide.map(zi=>Math.abs(zi)<.3?0:zi*xr):[0,0],H.node.style.transform=`translate3d(${(it.left+H.slide[0]).toFixed(1)}px, ${(it.top+H.slide[1]).toFixed(1)}px, 0)`,H.node.style.setProperty("--cx",Ke.x.toFixed(1)),H.node.style.setProperty("--cy",Ke.y.toFixed(1)),H.on||(H.on=!0,H.node.dataset.on="1")}else H.on&&(H.on=!1,H.node.dataset.on="")}}),new ResizeObserver(rt).observe(be);let gd=()=>{N.resize(),Ue(),Be(),rt(),d[ut].kind==="hero"?N.home():W(ut)};addEventListener("resize",gd),addEventListener("themechange",N.applyTheme),Vn.push(()=>{removeEventListener("resize",gd),removeEventListener("themechange",N.applyTheme)}),N.on("error",x=>{console.error(x),_c()}),document.documentElement.classList.add("immersive"),document.fonts?.ready.then(()=>{J.forEach(x=>(x.width=0,x.height=0)),Ue(),Be(),rt()}),a.dataset.ready="1",pe(0,{push:!1}),yc(),rt()}dg();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
