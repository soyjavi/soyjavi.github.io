(()=>{document.querySelectorAll("form.waitlist").forEach(i=>{let e=i.querySelector(".status");i.addEventListener("submit",()=>{e.textContent=i.dataset.opened})});var Pc=[1.6,4.2],xd={1:1.1,2:1.6,3:2.2},pg=51,rr=["threads","people","places"],Ac=[0,1,-1,2,-2],Rc={sigma:1.6,background:.08},Mr={base:470,cap:12e4,trail:18e3},fi={inner:900,outer:1600,stars:9e3,halo:.015,band:.35,tilt:.6,thickness:.16},$t={core:4,reach:3.2,gap:12,future:44,twist:2.2,swirl:.9,inner:.22,depth:4,room:3,ahead:[.3,.7],today:.06,sweep:1.9*Math.PI,growth:1.75,rise:26},na=.25,fg=i=>/^\d{4}$/.test(i)?"year":/^\d{4}-\d{2}$/.test(i)?"month":null,bd=(i=Date.now())=>{let e=new Date(i),t=e.getFullYear(),n=Date.UTC(t,e.getMonth(),e.getDate());return t+(n-Date.UTC(t,0,1))/(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))},io=(i,e=Date.now())=>{let[t,n]=i.split("-").map(Number),r=new Date(e);return(t-r.getFullYear())*12+(n-1-r.getMonth())},ro=(i,e)=>!Number.isFinite(i)||i<0?"":new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(i,"month");var ms=i=>i-1980;function mg(i){let e=new Map;i.forEach(({date:n})=>e.set(n,(e.get(n)??0)+1));let t=new Map;return i.map(({date:n})=>{let r=fg(n);if(!r)throw new Error(`date "${n}" is neither YYYY nor YYYY-MM`);let s=+n.slice(0,4),a=t.get(n)??0;t.set(n,a+1);let o=(a+.5)/e.get(n);return r==="month"?s+(+n.slice(5,7)-1+o)/12:s+o})}function gg(i,e){let t=[];return i.map((n,r)=>{let s=new Set;for(let a=r-1;a>=0&&n-i[a]<=e;a--)s.add(t[a]);return t[r]=Ac.find(a=>!s.has(a))??Ac[r%Ac.length],t[r]})}function _g(i){return i.map(e=>{let t=i.filter(n=>Math.abs(n-e)<=.6).length;return Math.min(1,1/Math.sqrt(Math.max(1,t/2)))})}var gs=i=>Math.min(1,Math.max(0,i)),vg=(i,e)=>(Math.sqrt(i.inner*i.inner+2*i.spin*e)-i.inner)/i.spin;function fs(i,e,t=0){let n=vg(i,e),r=i.inner+i.spin*n+t;return[r*Math.sin(n)-i.pole[0],r*Math.cos(n)-i.pole[1],-7+$t.rise*(e/i.length-.5)]}function xg(i,e,t,n){let r=Array.from({length:t},()=>[]),s=Array.from({length:t},()=>0);i.forEach((v,g)=>{e[g]<0||(r[e[g]].push(v),s[e[g]]+=1)});let a=[];r.forEach((v,g)=>a.push(v.length?Math.min(...v):a[g-1]??1980));let o=s.map(v=>$t.core+$t.reach*Math.sqrt(v)),c=o.reduce((v,g)=>v+2*g,0)+$t.gap*t+$t.future,l=2*c/($t.sweep*(1+$t.growth)),h={inner:l,spin:l*($t.growth-1)/$t.sweep,length:c,pole:[0,0]},p=0,d=o.map(v=>{let g=p+v;return p+=2*v+$t.gap,g}),u=[...d.map((v,g)=>[fs(h,v),o[g]]),...Array.from({length:9},(v,g)=>[fs(h,p+$t.future*g/8),3])],m=[0,1].map(v=>[Math.min(...u.map(([g,_])=>g[v]-_)),Math.max(...u.map(([g,_])=>g[v]+_))]);h.pole=m.map(([v,g])=>(v+g)/2);let f=o.map((v,g)=>{let _=a.slice(g+1).find((O,k)=>r[g+1+k].length&&O>a[g]),b=Math.max(_??Math.max(n,...r[g]),a[g]+1),T=r[g].length,S=r[g].length?Math.max(...r[g])-Math.min(...r[g])+1:1,M=gs(S/12)*(1-.7*gs(s[g]/50)),I={ratio:Ic.stretch?1+Ic.stretch*.9*M:1,angle:(g*$t.twist+T*.37)%Math.PI};return{start:a[g],end:b,count:T,radius:v,turn:g*$t.twist,along:d[g],centre:fs(h,d[g]),axis:I}});return{...h,ahead:p,list:f}}var no=(i,e)=>{let t=i.list.findIndex(n=>e<n.end);return t<0?i.list.length-1:t},so=(i,e)=>gs((e-i.start)/(i.end-i.start)),yd=[1,2,5,10,20,50,100];function Td(i,e=8){let t=Math.ceil(i.start+1e-9),n=Math.floor(i.end+1e-9),r=a=>Array.from({length:Math.max(0,n-t+1)},(o,c)=>t+c).filter(o=>o%a===0),s=yd.find(a=>r(a).length<=e)??yd.at(-1);return r(s).map(a=>({year:a,radius:i.radius*($t.inner+(1-$t.inner)*so(i,a))}))}var Sd=(i,e)=>(no(i,e)+so(i.list[no(i,e)],e))/i.list.length;function Ed(i,e){if(e>=1)return 1/0;let t=Math.max(0,e)*i.list.length,n=i.list[Math.min(i.list.length-1,Math.floor(t))];return n.start+(t-Math.floor(t))*(n.end-n.start)}function wd(i,e,t,n,r=0,s=0){let a=i.arms?.[Math.max(0,e)],o=(a?a.centre:Math.PI*2/Math.max(1,t)*Math.max(0,e))+i.turn+(i.swirl??$t.swirl)*n+r,c=Math.max(.4,i.radius*($t.inner+(1-$t.inner)*n)+s),[l,h]=br(i,c*Math.sin(o),c*Math.cos(o));return[i.centre[0]+l,i.centre[1]+h,i.centre[2]+$t.depth*(n-.5)]}var Cc=(i,e,t=0)=>fs(i,i.ahead+e*$t.future,t);function yg(i,e,t,n,r){let s=r.map(()=>0);t.forEach((u,m)=>{let f=r.indexOf(u.threads?.[0]);n[m]===e&&f>=0&&s[f]++});let a=s.map((u,m)=>[m,u]).filter(([,u])=>u>0),o=a.reduce((u,[,m])=>u+m,0)||1,c=Math.PI*2/Math.max(1,a.length)/4,l=a.map(([,u])=>Math.max(c,Math.PI*2*u/o)),h=Math.PI*2/l.reduce((u,m)=>u+m,0),p=0;i.arms={},a.forEach(([u],m)=>{let f=l[m]*h;i.arms[u]={centre:p+f/2,width:f},p+=f});let d=i.end-i.start;i.swirl=$t.swirl*(.7+.8*gs(d/14))}function Lc(i,e,{periods:t=[],today:n=1980+pg,threads:r=[]}={}){let s=i.map(c=>t.length?t.indexOf(c.period):0),a=i.find((c,l)=>s[l]<0);if(a)throw new Error(`memory ${a.id}: period "${a.period}" is not one of ${t.join(", ")}`);let o={...xg(e,s,Math.max(1,t.length),n),periodOf:s};return Ic.arms&&r.length&&o.list.forEach((c,l)=>yg(c,l,i,s,r)),o}function Ad(i,e={},t={}){let n=mg(i),r=_g(n),s=rr.filter(d=>e[d]?.length),a=i.map(d=>Object.fromEntries(s.map(u=>[u,(d[u]??[]).map(m=>e[u].indexOf(m)).filter(m=>m>=0)]))),o=e.threads?.length??0,c=Lc(i,n,{...t,threads:e.threads??[]}),l=[],h=new Map;i.forEach((d,u)=>{let m=`${c.periodOf[u]}:${a[u].threads?.[0]??0}`;h.set(m,[...h.get(m)??[],u])});let p=Math.PI*2/Math.max(1,o);return h.forEach(d=>{let u=c.list[c.periodOf[d[0]]],m=(u.end-u.start)/(u.radius*(1-$t.inner));gg(d.map(f=>n[f]),$t.room*m).forEach((f,v)=>{let g=d[v],_=so(u,n[g]),b=u.radius*($t.inner+(1-$t.inner)*_),T=u.arms?.[a[g].threads?.[0]??0]?.width??p,S=Math.max(-.45*T,Math.min(.45*T,f*$t.room/Math.max(b,2)));l[g]=wd(u,a[g].threads?.[0]??0,o,_,S)})}),n.map((d,u)=>({id:i[u].id,year:d,position:l[u],spread:(xd[i[u].weight]??xd[1])*r[u],weight:i[u].weight,members:a[u],period:c.periodOf[u],links:i[u].links??[]}))}function Rd(i){let[e,t]=$t.ahead.map(n=>Cc(i,n));return{today:Cc(i,$t.today),book:e,clone:t}}var Cd=(i,e)=>e.reduce((t,n)=>t+n.weight*Math.exp(-(((i-n.year)/1.6)**2)),0),Id=i=>Math.max(...i.map(e=>Cd(e.year,i)),1e-6);function Sg(i,e,t=Id(e)){return Math.min(1,Cd(i,e)/t)}function Mg(i,e,t,n){let r=Math.ceil((n-1980)/na)+1,s=new Float32Array(r*Math.max(1,t)),a=Math.ceil(Rc.sigma*3/na);for(let o of i)(o.members[e]??[]).forEach((c,l)=>{let h=(o.year-1980)/na;for(let p=Math.max(0,Math.floor(h)-a);p<=Math.min(r-1,Math.ceil(h)+a);p++){let d=(p*na-(o.year-1980))/Rc.sigma;s[p*t+c]+=o.weight*(l===0?1:.5)*Math.exp(-d*d)/3}});return{table:s,count:t,bins:r}}function Pd({table:i,count:e,bins:t},n,r){return Math.min(1,i[Math.min(t-1,Math.max(0,Math.round((n-1980)/na)))*e+r])}function Md(i,e,t){let n=Array.from({length:i.count},(s,a)=>Rc.background+Pd(i,e,a)),r=t()*n.reduce((s,a)=>s+a,0);for(let s=0;s<i.count;s++)if((r-=n[s])<=0)return s;return i.count-1}function ao(i,e=fi.inner,t=fi.outer){let n=i()*2-1,r=i()*Math.PI*2,s=e+(t-e)*i(),a=Math.sqrt(1-n*n)*s;return[a*Math.cos(r),a*Math.sin(r),n*s]}function Ld(i){let e=i()*Math.PI*2,t=Sr(i)*fi.thickness,[n,r,s]=[Math.cos(t)*Math.cos(e),Math.cos(t)*Math.sin(e),Math.sin(t)];return[n,r*Math.cos(fi.tilt)-s*Math.sin(fi.tilt),r*Math.sin(fi.tilt)+s*Math.cos(fi.tilt)]}function Nd({count:i=fi.stars,random:e}){let t={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i),halo:new Float32Array(i)};for(let n=0;n<i;n++){let r=e()<fi.halo,s=r?.8+.2*e():.7*e()**7,a=!r&&e()<fi.band?Ld(e):ao(e,1,1),o=fi.outer-(fi.outer-fi.inner)*s;t.position.set(a.map(c=>c*o),n*3),t.seed[n]=e(),t.bright[n]=s,t.halo[n]=r?1:0,t.size[n]=1+1.2*s}return t}var Ic={stretch:.5,arms:1};function br(i,e,t){let n=i.axis;if(!n||n.ratio===1)return[e,t];let[r,s,a]=[Math.cos(n.angle),Math.sin(n.angle),Math.sqrt(n.ratio)],o=(e*r+t*s)*a,c=(-e*s+t*r)/a;return[o*r-c*s,o*s+c*r]}var Nc=["personal","professional","product","education"],Xn={deep:{count:16e3,mobile:6e3,alpha:[.1,.8],band:.35,radius:1650,inner:400},far:{count:36,alpha:[.15,.4],radius:[5,14]},haze:{alpha:.08},glow:{max:.15,scale:2.6}},bg=([i,e,t])=>[Math.atan2(e,i)/(2*Math.PI)+.5,Math.acos(Math.max(-1,Math.min(1,t)))/Math.PI];function Dd({count:i=Xn.deep.count,random:e,centre:t=[0,0,0],inner:n=Xn.deep.inner,outer:r=Xn.deep.radius}){let[s,a]=Xn.deep.alpha,o={count:i,position:new Float32Array(i*3),seed:new Float32Array(i),bright:new Float32Array(i),size:new Float32Array(i)};for(let c=0;c<i;c++){let l=e()<Xn.deep.band?Ld(e):ao(e,1,1),h=Math.hypot(...l),p=Math.log(r/(n*(r/n)**e()))/Math.log(r/n),d=r*(n/r)**p;o.position.set(l.map((u,m)=>t[m]+u/h*d),c*3),o.seed[c]=e(),o.bright[c]=Math.min(a,(s+(a-s)*e()**4)*(1+.6*p**3)),o.size[c]=1+1.4*p**4}return o}function Ud({count:i=Xn.far.count,random:e}){let[t,n]=Xn.far.alpha,[r,s]=Xn.far.radius;return Array.from({length:i},()=>{let[a,o]=bg(ao(e,1,1));return{u:a,v:o,radius:r+(s-r)*e(),squash:.35+.5*e(),angle:e()*Math.PI,alpha:t+(n-t)*e()}})}function Od(i,e){return{scale:i.radius*Xn.glow.scale,strength:Xn.glow.max*(.25+.75*(i.count/Math.max(1,e)))}}var Sr=i=>Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i());function Tg(i,{base:e=Mr.base,cap:t=Mr.cap}={}){let n=i.reduce((r,s)=>r+s.weight**1.5,0)||1;return Math.min(e,t/n)}function Fd({marks:i,sky:e,today:t,random:n,base:r=Mr.base,cap:s=Mr.cap,trail:a=Mr.trail,facets:o={}}){let c=Tg(i,{base:r,cap:s}),l=T=>Math.max(8,Math.round(c*T.weight**1.5)),h=rr.filter(T=>o[T]?.length),p=i.reduce((T,S)=>T+l(S),0)+a,d={count:p,position:new Float32Array(p*3),center:new Float32Array(p*3),from:new Float32Array(p*3),facet:Object.fromEntries(rr.map(T=>[T,new Float32Array(p).fill(-1)])),u:new Float32Array(p),order:new Float32Array(p),seed:new Float32Array(p),size:new Float32Array(p),ahead:new Float32Array(p),kind:new Float32Array(p),memory:new Float32Array(p),galaxy:new Float32Array(p).fill(-1)},u=(T,S,M,I,O,k,U,X,V)=>{d.position.set(S,T*3),d.center.set(M,T*3),d.from.set(ao(n),T*3),d.u[T]=I,d.order[T]=V,d.seed[T]=n(),d.size[T]=O,d.ahead[T]=k,d.kind[T]=U,d.memory[T]=X},m=0;i.forEach((T,S)=>{for(let M=0,I=l(T);M<I;M++,m++){let O=[Sr(n),Sr(n),Sr(n)*.8],k=T.spread*Math.abs(Sr(n))*.55,U=Math.hypot(...O)||1,X=O.map(V=>V/U*k);u(m,T.position.map((V,Z)=>V+X[Z]),T.position,ms(T.year),.1+n()*.16,0,1,S,Sd(e,T.year)),d.galaxy[m]=T.period;for(let V of h)d.facet[V][m]=T.members[V][0]??-1}});let f=t+Pc[1]+.4,v=Object.fromEntries(h.map(T=>[T,Mg(i,T,o[T].length,f)])),g=o.threads?.length??0,_=Math.PI*2/Math.max(1,g),b=Id(i);for(let T=0;T<a;T++,m++){let S=n()<.06,M=S?t+n()*(f-t):1980+n()*(t-1980),I=v.threads?S?Math.floor(n()*g):Md(v.threads,M,n):-1,O=I>=0&&!S?Pd(v.threads,M,I):Sg(M,i,b),k;if(S)k=Cc(e,n(),Sr(n)*2.4);else{let U=e.list[no(e,M)],X=n()<.14,V=X?n()*.2:so(U,M);k=wd(U,I,g,V,Sr(n)*(U.arms?.[Math.max(0,I)]?.width??_)*(X?1.2:.14),Sr(n)*(.5+.9*O))}for(let U of h)d.facet[U][m]=U==="threads"?I:S?Math.floor(n()*o[U].length):Md(v[U],M,n);u(m,k,k,ms(M),.05+n()*.07,S?1:0,0,-1,S?1:Sd(e,M)),d.galaxy[m]=S?-1:no(e,M)}return d}var ei={start:1980,end:2031,book:2027.8,clone:2029.6},Bd={seconds:16},zd=(i,e,t=1980,n=Bd.seconds)=>t+(e-t)*gs(i/n),Vd=(i,e,t=1980,n=Bd.seconds)=>gs((i-t)/(e-t))*n,_s=i=>(i-ei.start)/(ei.end-ei.start)*100,yi={rate:.05,ramp:6,slots:16,near:.2},Eg=i=>yi.rate*12/(i.radius+12),wg=i=>i<=0?0:i-yi.ramp*(1-Math.exp(-i/yi.ramp)),kd=(i,e)=>-Eg(i)*wg(e);var Ag=24;document.querySelectorAll(".countdown[data-until]").forEach(i=>{let e=io(i.dataset.until);if(!(e>=0)){i.hidden=!0;return}i.querySelector(".remaining").textContent=` \xB7 ${ro(e,document.documentElement.lang)}`,i.querySelector(".scale").style.setProperty("--months",Math.min(e,Ag))});var bp=0,fh=1,Tp=2;var ka=1,Ep=2,Ws=3,Xs=0,Zn=1,Yi=2,$i=0,bi=1,pr=2,mh=3,gh=4,wp=5;var qs=100,Ap=101,Rp=102,Cp=103,Ip=104,Pp=200,Lp=201,Np=202,Dp=203,Up=204,Op=205,Fp=206,Bp=207,zp=208,Vp=209,kp=210,Gp=211,Hp=212,Wp=213,Xp=214,_h=0,vh=1,xh=2,Dl=3,yh=4,Sh=5,Mh=6,bh=7,qp=0,jp=1,Yp=2,Di=0,Th=1,Eh=2,wh=3,Ah=4,Rh=5,Ch=6,Ih=7;var js=301,ts=302,Ul=303,Ol=304,Ga=306,Fl=1e3,Bl=1001,$p=1002,Ui=1003,Zp=1004;var Ha=1005;var Jn=1006,zl=1007;var ns=1008;var Oi=1009,Jp=1010,Kp=1011,Wa=1012,Ph=1013,Fr=1014,Ti=1015,Zi=1016,Lh=1017,Nh=1018,Ys=1020,Qp=35902,ef=35899,tf=1021,nf=1022,Ji=1023,is=1026,rs=1027,Xa=1028,Dh=1029,ss=1030,Uh=1031;var Oh=1033,Vl=33776,kl=33777,Gl=33778,Hl=33779,Fh=35840,Bh=35841,zh=35842,Vh=35843,kh=36196,Gh=37492,Hh=37496,Wh=37488,Xh=37489,Wl=37490,qh=37491,jh=37808,Yh=37809,$h=37810,Zh=37811,Jh=37812,Kh=37813,Qh=37814,eu=37815,tu=37816,nu=37817,iu=37818,ru=37819,su=37820,au=37821,ou=36492,lu=36494,cu=36495,hu=36283,uu=36284,Xl=36285,du=36286;var pu=0,rf=1,as="",fu="srgb",ql="srgb-linear",mu="linear",tn="srgb";var sf=512,af=513,of=514,jl=515,lf=516,cf=517,Yl=518,hf=519;var $l=35048;var gu="300 es",_u=2e3;function Rg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Cg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function fa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function uf(){let i=fa("canvas");return i.style.display="block",i}var Gd={},Ds=null;function ma(...i){let e="THREE."+i.shift();Ds?Ds("log",e,...i):console.log(e,...i)}function df(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ye(...i){let e="THREE."+(i=df(i)).shift();if(Ds)Ds("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Qe(...i){let e="THREE."+(i=df(i)).shift();if(Ds)Ds("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Yr(...i){let e=i.join(" ");e in Gd||(Gd[e]=!0,Ye(...i))}function pf(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var ff={[_h]:1,[xh]:6,[yh]:7,[Dl]:5,[vh]:0,[Mh]:2,[bh]:4,[Sh]:3},Xi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},qn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var zo=Math.PI/180,Vo=180/Math.PI;function ur(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(qn[255&i]+qn[i>>8&255]+qn[i>>16&255]+qn[i>>24&255]+"-"+qn[255&e]+qn[e>>8&255]+"-"+qn[e>>16&15|64]+qn[e>>24&255]+"-"+qn[63&t|128]+qn[t>>8&255]+"-"+qn[t>>16&255]+qn[t>>24&255]+qn[255&n]+qn[n>>8&255]+qn[n>>16&255]+qn[n>>24&255]).toLowerCase()}function yt(i,e,t){return Math.max(e,Math.min(t,i))}function Ig(i,e){return(i%e+e)%e}function Dc(i,e,t){return(1-t)*i+t*e}function Gi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:case Uint8ClampedArray:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Mu=class Mu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=yt(this.x,e.x,t.x),this.y=yt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=yt(this.x,e,t),this.y=yt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(yt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Mu.prototype.isVector2=!0;var me=Mu,Mi=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],h=n[r+2],p=n[r+3],d=s[a+0],u=s[a+1],m=s[a+2],f=s[a+3];if(p!==f||c!==d||l!==u||h!==m){let v=c*d+l*u+h*m+p*f;v<0&&(d=-d,u=-u,m=-m,f=-f,v=-v);let g=1-o;if(v<.9995){let _=Math.acos(v),b=Math.sin(_);g=Math.sin(g*_)/b,c=c*g+d*(o=Math.sin(o*_)/b),l=l*g+u*o,h=h*g+m*o,p=p*g+f*o}else{c=c*g+d*o,l=l*g+u*o,h=h*g+m*o,p=p*g+f*o;let _=1/Math.sqrt(c*c+l*l+h*h+p*p);c*=_,l*=_,h*=_,p*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],c=n[r+1],l=n[r+2],h=n[r+3],p=s[a],d=s[a+1],u=s[a+2],m=s[a+3];return e[t]=o*m+h*p+c*u-l*d,e[t+1]=c*m+h*d+l*p-o*u,e[t+2]=l*m+h*u+o*d-c*p,e[t+3]=h*m-o*p-c*d-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(r/2),p=o(s/2),d=c(n/2),u=c(r/2),m=c(s/2);switch(a){case"XYZ":this._x=d*h*p+l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p-d*u*m;break;case"YXZ":this._x=d*h*p+l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p+d*u*m;break;case"ZXY":this._x=d*h*p-l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p-d*u*m;break;case"ZYX":this._x=d*h*p-l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p+d*u*m;break;case"YZX":this._x=d*h*p+l*u*m,this._y=l*u*p+d*h*m,this._z=l*h*m-d*u*p,this._w=l*h*p-d*u*m;break;case"XZY":this._x=d*h*p-l*u*m,this._y=l*u*p-d*h*m,this._z=l*h*m+d*u*p,this._w=l*h*p+d*u*m;break;default:Ye("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],p=t[10],d=n+o+p;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-c)*u,this._y=(s-l)*u,this._z=(a-r)*u}else if(n>o&&n>p){let u=2*Math.sqrt(1+n-o-p);this._w=(h-c)/u,this._x=.25*u,this._y=(r+a)/u,this._z=(s+l)/u}else if(o>p){let u=2*Math.sqrt(1+o-n-p);this._w=(s-l)/u,this._x=(r+a)/u,this._y=.25*u,this._z=(c+h)/u}else{let u=2*Math.sqrt(1+p-n-o);this._w=(a-r)/u,this._x=(s+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-r*o,this._w=a*h-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},bu=class bu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),h=2*(o*t-s*r),p=2*(s*n-a*t);return this.x=t+c*l+a*p-o*h,this.y=n+c*h+o*l-s*p,this.z=r+c*p+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=yt(this.x,e.x,t.x),this.y=yt(this.y,e.y,t.y),this.z=yt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=yt(this.x,e,t),this.y=yt(this.y,e,t),this.z=yt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(yt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Uc.copy(this).projectOnVector(e),this.sub(Uc)}reflect(e){return this.sub(Uc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};bu.prototype.isVector3=!0;var P=bu,Uc=new P,Hd=new Mi,Tu=class Tu{constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],p=n[7],d=n[2],u=n[5],m=n[8],f=r[0],v=r[3],g=r[6],_=r[1],b=r[4],T=r[7],S=r[2],M=r[5],I=r[8];return s[0]=a*f+o*_+c*S,s[3]=a*v+o*b+c*M,s[6]=a*g+o*T+c*I,s[1]=l*f+h*_+p*S,s[4]=l*v+h*b+p*M,s[7]=l*g+h*T+p*I,s[2]=d*f+u*_+m*S,s[5]=d*v+u*b+m*M,s[8]=d*g+u*T+m*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+r*s*l-r*a*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=h*a-o*l,d=o*c-h*s,u=l*s-a*c,m=t*p+n*d+r*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let f=1/m;return e[0]=p*f,e[1]=(r*l-h*n)*f,e[2]=(o*n-r*a)*f,e[3]=d*f,e[4]=(h*t-r*c)*f,e[5]=(r*s-o*t)*f,e[6]=u*f,e[7]=(n*c-l*t)*f,e[8]=(a*t-n*s)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Yr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Oc.makeScale(e,t)),this}rotate(e){return Yr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Oc.makeRotation(-e)),this}translate(e,t){return Yr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Oc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Tu.prototype.isMatrix3=!0;var st=Tu,Oc=new st,Wd=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xd=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Pg(){let i={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer==="srgb"&&(r.r=dr(r.r),r.g=dr(r.g),r.b=dr(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer==="srgb"&&(r.r=Ns(r.r),r.g=Ns(r.g),r.b=Ns(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?"linear":this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Yr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Yr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ql]:{primaries:e,whitePoint:n,transfer:"linear",toXYZ:Wd,fromXYZ:Xd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},[fu]:{primaries:e,whitePoint:n,transfer:"srgb",toXYZ:Wd,fromXYZ:Xd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),i}var Ct=Pg();function dr(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Ns(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var vs,ko=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vs===void 0&&(vs=fa("canvas")),vs.width=e.width,vs.height=e.height;let r=vs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=vs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=fa("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*dr(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*dr(t[n]/255)):t[n]=dr(t[n]);return{data:t,width:e.width,height:e.height}}return Ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Lg=0,Us=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Lg++}),this.uuid=ur(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Fc(r[a].image)):s.push(Fc(r[a]))}else s=Fc(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Fc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ko.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ye("Texture: Unable to serialize Texture."),{})}var Ng=0,Bc=new P,ni=class i extends Xi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,c=1009,l=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=ur(),this.name="",this.source=new Us(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Bc).x}get height(){return this.source.getSize(Bc).y}get depth(){return this.source.getSize(Bc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:Ye(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ni.DEFAULT_IMAGE=null,ni.DEFAULT_MAPPING=300,ni.DEFAULT_ANISOTROPY=1;var Eu=class Eu{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,l=c[0],h=c[4],p=c[8],d=c[1],u=c[5],m=c[9],f=c[2],v=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(p-f)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+f)<.1&&Math.abs(m+v)<.1&&Math.abs(l+u+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(l+1)/2,T=(u+1)/2,S=(g+1)/2,M=(h+d)/4,I=(p+f)/4,O=(m+v)/4;return b>T&&b>S?b<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(b),r=M/n,s=I/n):T>S?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=M/r,s=O/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=I/s,r=O/s),this.set(n,r,s,t),this}let _=Math.sqrt((v-m)*(v-m)+(p-f)*(p-f)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(v-m)/_,this.y=(p-f)/_,this.z=(d-h)/_,this.w=Math.acos((l+u+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=yt(this.x,e.x,t.x),this.y=yt(this.y,e.y,t.y),this.z=yt(this.z,e.z,t.z),this.w=yt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=yt(this.x,e,t),this.y=yt(this.y,e,t),this.z=yt(this.z,e,t),this.w=yt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(yt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Eu.prototype.isVector4=!0;var en=Eu,Go=class extends Xi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new en(0,0,e,t),this.scissorTest=!1,this.viewport=new en(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new ni(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Us(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ci=class extends Go{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ga=class extends ni{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ho=class extends ni{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Nl=class Nl{constructor(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v)}set(e,t,n,r,s,a,o,c,l,h,p,d,u,m,f,v){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=p,g[14]=d,g[3]=u,g[7]=m,g[11]=f,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Nl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/xs.setFromMatrixColumn(e,0).length(),s=1/xs.setFromMatrixColumn(e,1).length(),a=1/xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=c*h,t[4]=-c*p,t[8]=l,t[1]=u+m*l,t[5]=d-f*l,t[9]=-o*c,t[2]=f-d*l,t[6]=m+u*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,u=c*p,m=l*h,f=l*p;t[0]=d+f*o,t[4]=m*o-u,t[8]=a*l,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=u*o-m,t[6]=f+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,u=c*p,m=l*h,f=l*p;t[0]=d-f*o,t[4]=-a*p,t[8]=m+u*o,t[1]=u+m*o,t[5]=a*h,t[9]=f-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,u=a*p,m=o*h,f=o*p;t[0]=c*h,t[4]=m*l-u,t[8]=d*l+f,t[1]=c*p,t[5]=f*l+d,t[9]=u*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,u=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=f-d*p,t[8]=m*p+u,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=u*p+m,t[10]=d-f*p}else if(e.order==="XZY"){let d=a*c,u=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=-p,t[8]=l*h,t[1]=d*p+f,t[5]=a*h,t[9]=u*p-m,t[2]=m*p-u,t[6]=o*h,t[10]=f*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dg,e,Ug)}lookAt(e,t,n){let r=this.elements;return mi.subVectors(e,t),mi.lengthSq()===0&&(mi.z=1),mi.normalize(),Tr.crossVectors(n,mi),Tr.lengthSq()===0&&(Math.abs(n.z)===1?mi.x+=1e-4:mi.z+=1e-4,mi.normalize(),Tr.crossVectors(n,mi)),Tr.normalize(),oo.crossVectors(mi,Tr),r[0]=Tr.x,r[4]=oo.x,r[8]=mi.x,r[1]=Tr.y,r[5]=oo.y,r[9]=mi.y,r[2]=Tr.z,r[6]=oo.z,r[10]=mi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],p=n[5],d=n[9],u=n[13],m=n[2],f=n[6],v=n[10],g=n[14],_=n[3],b=n[7],T=n[11],S=n[15],M=r[0],I=r[4],O=r[8],k=r[12],U=r[1],X=r[5],V=r[9],Z=r[13],se=r[2],ee=r[6],re=r[10],N=r[14],$=r[3],he=r[7],le=r[11],te=r[15];return s[0]=a*M+o*U+c*se+l*$,s[4]=a*I+o*X+c*ee+l*he,s[8]=a*O+o*V+c*re+l*le,s[12]=a*k+o*Z+c*N+l*te,s[1]=h*M+p*U+d*se+u*$,s[5]=h*I+p*X+d*ee+u*he,s[9]=h*O+p*V+d*re+u*le,s[13]=h*k+p*Z+d*N+u*te,s[2]=m*M+f*U+v*se+g*$,s[6]=m*I+f*X+v*ee+g*he,s[10]=m*O+f*V+v*re+g*le,s[14]=m*k+f*Z+v*N+g*te,s[3]=_*M+b*U+T*se+S*$,s[7]=_*I+b*X+T*ee+S*he,s[11]=_*O+b*V+T*re+S*le,s[15]=_*k+b*Z+T*N+S*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],p=e[6],d=e[10],u=e[14],m=e[3],f=e[7],v=e[11],g=e[15],_=c*u-l*d,b=o*u-l*p,T=o*d-c*p,S=a*u-l*h,M=a*d-c*h,I=a*p-o*h;return t*(f*_-v*b+g*T)-n*(m*_-v*S+g*M)+r*(m*b-f*S+g*I)-s*(m*T-f*M+v*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(s*h-o*c)+r*(s*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=e[9],d=e[10],u=e[11],m=e[12],f=e[13],v=e[14],g=e[15],_=t*o-n*a,b=t*c-r*a,T=t*l-s*a,S=n*c-r*o,M=n*l-s*o,I=r*l-s*c,O=h*f-p*m,k=h*v-d*m,U=h*g-u*m,X=p*v-d*f,V=p*g-u*f,Z=d*g-u*v,se=_*Z-b*V+T*X+S*U-M*k+I*O;if(se===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let ee=1/se;return e[0]=(o*Z-c*V+l*X)*ee,e[1]=(r*V-n*Z-s*X)*ee,e[2]=(f*I-v*M+g*S)*ee,e[3]=(d*M-p*I-u*S)*ee,e[4]=(c*U-a*Z-l*k)*ee,e[5]=(t*Z-r*U+s*k)*ee,e[6]=(v*T-m*I-g*b)*ee,e[7]=(h*I-d*T+u*b)*ee,e[8]=(a*V-o*U+l*O)*ee,e[9]=(n*U-t*V-s*O)*ee,e[10]=(m*M-f*T+g*_)*ee,e[11]=(p*T-h*M-u*_)*ee,e[12]=(o*k-a*X-c*O)*ee,e[13]=(t*X-n*k+r*O)*ee,e[14]=(f*b-m*S-v*_)*ee,e[15]=(h*S-p*b+d*_)*ee,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+n,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,p=o+o,d=s*l,u=s*h,m=s*p,f=a*h,v=a*p,g=o*p,_=c*l,b=c*h,T=c*p,S=n.x,M=n.y,I=n.z;return r[0]=(1-(f+g))*S,r[1]=(u+T)*S,r[2]=(m-b)*S,r[3]=0,r[4]=(u-T)*M,r[5]=(1-(d+g))*M,r[6]=(v+_)*M,r[7]=0,r[8]=(m+b)*I,r[9]=(v-_)*I,r[10]=(1-(d+f))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=xs.set(r[0],r[1],r[2]).length(),o=xs.set(r[4],r[5],r[6]).length(),c=xs.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Ri.copy(this);let l=1/a,h=1/o,p=1/c;return Ri.elements[0]*=l,Ri.elements[1]*=l,Ri.elements[2]*=l,Ri.elements[4]*=h,Ri.elements[5]*=h,Ri.elements[6]*=h,Ri.elements[8]*=p,Ri.elements[9]*=p,Ri.elements[10]*=p,t.setFromRotationMatrix(Ri),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),p=2*s/(n-r),d=(t+e)/(t-e),u=(n+r)/(n-r),m,f;if(c)m=s/(a-s),f=a*s/(a-s);else if(o===2e3)m=-(a+s)/(a-s),f=-2*a*s/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),f=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=p,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),p=2/(n-r),d=-(t+e)/(t-e),u=-(n+r)/(n-r),m,f;if(c)m=1/(a-s),f=a/(a-s);else if(o===2e3)m=-2/(a-s),f=-(a+s)/(a-s);else{if(o!==2001)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),f=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=p,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Nl.prototype.isMatrix4=!0;var pt=Nl,xs=new P,Ri=new pt,Dg=new P(0,0,0),Ug=new P(1,1,1),Tr=new P,oo=new P,mi=new P,qd=new pt,jd=new Mi,Pr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],p=r[2],d=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,u),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-yt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Ye("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jd.setFromEuler(this),this.setFromQuaternion(jd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Pr.DEFAULT_ORDER="XYZ";var _a=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Og=0,Yd=new P,ys=new Mi,sr=new pt,lo=new P,ia=new P,Fg=new P,Bg=new Mi,$d=new P(1,0,0),Zd=new P(0,1,0),Jd=new P(0,0,1),Kd={type:"added"},zg={type:"removed"},Ss={type:"childadded",child:null},zc={type:"childremoved",child:null},ii=class i extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=ur(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new Pr,n=new Mi,r=new P(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new st}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _a,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis($d,e)}rotateY(e){return this.rotateOnAxis(Zd,e)}rotateZ(e){return this.rotateOnAxis(Jd,e)}translateOnAxis(e,t){return Yd.copy(e).applyQuaternion(this.quaternion),this.position.add(Yd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($d,e)}translateY(e){return this.translateOnAxis(Zd,e)}translateZ(e){return this.translateOnAxis(Jd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(sr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?lo.copy(e):lo.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ia.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sr.lookAt(ia,lo,this.up):sr.lookAt(lo,ia,this.up),this.quaternion.setFromRotationMatrix(sr),r&&(sr.extractRotation(r.matrixWorld),ys.setFromRotationMatrix(sr),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kd),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(zg),zc.child=e,this.dispatchEvent(zc),zc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),sr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),sr.multiply(e.parent.matrixWorld)),e.applyMatrix4(sr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kd),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ia,e,Fg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ia,Bg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let p=c[l];s(e.shapes,p)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),p=a(e.shapes),d=a(e.skeletons),u=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ii.DEFAULT_UP=new P(0,1,0),ii.DEFAULT_MATRIX_AUTO_UPDATE=!0,ii.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hr=class extends ii{constructor(){super(),this.isGroup=!0,this.type="Group"}},Vg={type:"move"},Os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let f of e.hand.values()){let v=t.getJointPose(f,n),g=this._getHandJoint(l,f);v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=v.radius),g.visible=v!==null}let h=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],d=h.position.distanceTo(p.position),u=.02,m=.005;l.inputState.pinching&&d>u+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=u-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vg)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new hr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},mf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Er={h:0,s:0,l:0},co={h:0,s:0,l:0};function Vc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var ht=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Ct.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ct.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ct.workingColorSpace){if(e=Ig(e,1),t=yt(t,0,1),n=yt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Vc(a,s,e+1/3),this.g=Vc(a,s,e),this.b=Vc(a,s,e-1/3)}return Ct.colorSpaceToWorking(this,r),this}setStyle(e,t="srgb"){function n(s){s!==void 0&&parseFloat(s)<1&&Ye("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ye("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ye("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=mf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ye("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}copyLinearToSRGB(e){return this.r=Ns(e.r),this.g=Ns(e.g),this.b=Ns(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return Ct.workingToColorSpace(jn.copy(this),e),65536*Math.round(yt(255*jn.r,0,255))+256*Math.round(yt(255*jn.g,0,255))+Math.round(yt(255*jn.b,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ct.workingColorSpace){Ct.workingToColorSpace(jn.copy(this),t);let n=jn.r,r=jn.g,s=jn.b,a=Math.max(n,r,s),o=Math.min(n,r,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let p=a-o;switch(l=h<=.5?p/(a+o):p/(2-a-o),a){case n:c=(r-s)/p+(r<s?6:0);break;case r:c=(s-n)/p+2;break;case s:c=(n-r)/p+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ct.workingColorSpace){return Ct.workingToColorSpace(jn.copy(this),t),e.r=jn.r,e.g=jn.g,e.b=jn.b,e}getStyle(e="srgb"){Ct.workingToColorSpace(jn.copy(this),e);let t=jn.r,n=jn.g,r=jn.b;return e!=="srgb"?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(Er),this.setHSL(Er.h+e,Er.s+t,Er.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Er),e.getHSL(co);let n=Dc(Er.h,co.h,t),r=Dc(Er.s,co.s,t),s=Dc(Er.l,co.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},jn=new ht;ht.NAMES=mf;var va=class extends ii{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pr,this.environmentIntensity=1,this.environmentRotation=new Pr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ci=new P,ar=new P,kc=new P,or=new P,Ms=new P,bs=new P,Qd=new P,Gc=new P,Hc=new P,Wc=new P,Xc=new en,qc=new en,jc=new en,Hi=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ci.subVectors(e,t),r.cross(Ci);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Ci.subVectors(r,t),ar.subVectors(n,t),kc.subVectors(e,t);let a=Ci.dot(Ci),o=Ci.dot(ar),c=Ci.dot(kc),l=ar.dot(ar),h=ar.dot(kc),p=a*l-o*o;if(p===0)return s.set(0,0,0),null;let d=1/p,u=(l*c-o*h)*d,m=(a*h-o*c)*d;return s.set(1-u-m,m,u)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,or)!==null&&or.x>=0&&or.y>=0&&or.x+or.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,or)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,or.x),c.addScaledVector(a,or.y),c.addScaledVector(o,or.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return Xc.setScalar(0),qc.setScalar(0),jc.setScalar(0),Xc.fromBufferAttribute(e,t),qc.fromBufferAttribute(e,n),jc.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Xc,s.x),a.addScaledVector(qc,s.y),a.addScaledVector(jc,s.z),a}static isFrontFacing(e,t,n,r){return Ci.subVectors(n,t),ar.subVectors(e,t),Ci.cross(ar).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ci.subVectors(this.c,this.b),ar.subVectors(this.a,this.b),.5*Ci.cross(ar).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;Ms.subVectors(r,n),bs.subVectors(s,n),Gc.subVectors(e,n);let c=Ms.dot(Gc),l=bs.dot(Gc);if(c<=0&&l<=0)return t.copy(n);Hc.subVectors(e,r);let h=Ms.dot(Hc),p=bs.dot(Hc);if(h>=0&&p<=h)return t.copy(r);let d=c*p-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Ms,a);Wc.subVectors(e,s);let u=Ms.dot(Wc),m=bs.dot(Wc);if(m>=0&&u<=m)return t.copy(s);let f=u*l-c*m;if(f<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(bs,o);let v=h*m-u*p;if(v<=0&&p-h>=0&&u-m>=0)return Qd.subVectors(s,r),o=(p-h)/(p-h+(u-m)),t.copy(r).addScaledVector(Qd,o);let g=1/(v+f+d);return a=f*g,o=d*g,t.copy(n).addScaledVector(Ms,a).addScaledVector(bs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Li=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ii):Ii.fromBufferAttribute(s,a),Ii.applyMatrix4(e.matrixWorld),this.expandByPoint(Ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ho.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ho.copy(n.boundingBox)),ho.applyMatrix4(e.matrixWorld),this.union(ho)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ii),Ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ra),uo.subVectors(this.max,ra),Ts.subVectors(e.a,ra),Es.subVectors(e.b,ra),ws.subVectors(e.c,ra),wr.subVectors(Es,Ts),Ar.subVectors(ws,Es),Wr.subVectors(Ts,ws);let t=[0,-wr.z,wr.y,0,-Ar.z,Ar.y,0,-Wr.z,Wr.y,wr.z,0,-wr.x,Ar.z,0,-Ar.x,Wr.z,0,-Wr.x,-wr.y,wr.x,0,-Ar.y,Ar.x,0,-Wr.y,Wr.x,0];return!!Yc(t,Ts,Es,ws,uo)&&(t=[1,0,0,0,1,0,0,0,1],!!Yc(t,Ts,Es,ws,uo)&&(po.crossVectors(wr,Ar),t=[po.x,po.y,po.z],Yc(t,Ts,Es,ws,uo)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Ii).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(lr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),lr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),lr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),lr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),lr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),lr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),lr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),lr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(lr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},lr=[new P,new P,new P,new P,new P,new P,new P,new P],Ii=new P,ho=new Li,Ts=new P,Es=new P,ws=new P,wr=new P,Ar=new P,Wr=new P,ra=new P,uo=new P,po=new P,Xr=new P;function Yc(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Xr.fromArray(i,s);let o=r.x*Math.abs(Xr.x)+r.y*Math.abs(Xr.y)+r.z*Math.abs(Xr.z),c=e.dot(Xr),l=t.dot(Xr),h=n.dot(Xr);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var sS=kg();function kg(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,r[c]=24,r[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,r[c]=-l-1,r[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,r[c]=13,r[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,r[c]=24,r[256|c]=24):(n[c]=31744,n[256|c]=64512,r[c]=13,r[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var Tn=new P,fo=new me,Gg=0,Pt=class extends Xi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Gg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fo.fromBufferAttribute(this,t),fo.applyMatrix3(e),this.setXY(t,fo.x,fo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyMatrix3(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyMatrix4(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyNormalMatrix(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.transformDirection(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Gi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Gi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Gi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Gi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Gi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),r=Zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),r=Zt(r,this.array),s=Zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var xa=class extends Pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ya=class extends Pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var je=class extends Pt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Hg=new Li,sa=new P,$c=new P,Ni=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Hg.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sa.subVectors(e,this.center);let t=sa.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(sa,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($c.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sa.copy(e.center).add($c)),this.expandByPoint(sa.copy(e.center).sub($c))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Wg=0,Si=new pt,Zc=new ii,As=new P,gi=new Li,aa=new Li,Un=new P,bt=class i extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=ur(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rg(e)?ya:xa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new st().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Si.makeRotationFromQuaternion(e),this.applyMatrix4(Si),this}rotateX(e){return Si.makeRotationX(e),this.applyMatrix4(Si),this}rotateY(e){return Si.makeRotationY(e),this.applyMatrix4(Si),this}rotateZ(e){return Si.makeRotationZ(e),this.applyMatrix4(Si),this}translate(e,t,n){return Si.makeTranslation(e,t,n),this.applyMatrix4(Si),this}scale(e,t,n){return Si.makeScale(e,t,n),this.applyMatrix4(Si),this}lookAt(e){return Zc.lookAt(e),Zc.updateMatrix(),this.applyMatrix4(Zc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new je(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];gi.setFromBufferAttribute(s),this.morphTargetsRelative?(Un.addVectors(this.boundingBox.min,gi.min),this.boundingBox.expandByPoint(Un),Un.addVectors(this.boundingBox.max,gi.max),this.boundingBox.expandByPoint(Un)):(this.boundingBox.expandByPoint(gi.min),this.boundingBox.expandByPoint(gi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ni);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new P,1/0);if(e){let n=this.boundingSphere.center;if(gi.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];aa.setFromBufferAttribute(o),this.morphTargetsRelative?(Un.addVectors(gi.min,aa.min),gi.expandByPoint(Un),Un.addVectors(gi.max,aa.max),gi.expandByPoint(Un)):(gi.expandByPoint(aa.min),gi.expandByPoint(aa.max))}gi.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Un.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Un));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Un.fromBufferAttribute(o,l),c&&(As.fromBufferAttribute(e,l),Un.add(As)),r=Math.max(r,n.distanceToSquared(Un))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");a!==void 0&&a.count===n.count||(a=new Pt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let O=0;O<n.count;O++)o[O]=new P,c[O]=new P;let l=new P,h=new P,p=new P,d=new me,u=new me,m=new me,f=new P,v=new P;function g(O,k,U){l.fromBufferAttribute(n,O),h.fromBufferAttribute(n,k),p.fromBufferAttribute(n,U),d.fromBufferAttribute(s,O),u.fromBufferAttribute(s,k),m.fromBufferAttribute(s,U),h.sub(l),p.sub(l),u.sub(d),m.sub(d);let X=1/(u.x*m.y-m.x*u.y);isFinite(X)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-u.y).multiplyScalar(X),v.copy(p).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(X),o[O].add(f),o[k].add(f),o[U].add(f),c[O].add(v),c[k].add(v),c[U].add(v))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let O=0,k=_.length;O<k;++O){let U=_[O],X=U.start;for(let V=X,Z=X+U.count;V<Z;V+=3)g(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let b=new P,T=new P,S=new P,M=new P;function I(O){S.fromBufferAttribute(r,O),M.copy(S);let k=o[O];b.copy(k),b.sub(S.multiplyScalar(S.dot(k))).normalize(),T.crossVectors(M,k);let U=T.dot(c[O])<0?-1:1;a.setXYZW(O,b.x,b.y,b.z,U)}for(let O=0,k=_.length;O<k;++O){let U=_[O],X=U.start;for(let V=X,Z=X+U.count;V<Z;V+=3)I(e.getX(V+0)),I(e.getX(V+1)),I(e.getX(V+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Pt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);let r=new P,s=new P,a=new P,o=new P,c=new P,l=new P,h=new P,p=new P;if(e)for(let d=0,u=e.count;d<u;d+=3){let m=e.getX(d+0),f=e.getX(d+1),v=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,f),a.fromBufferAttribute(t,v),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,f),l.fromBufferAttribute(n,v),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(v,l.x,l.y,l.z)}else for(let d=0,u=t.count;d<u;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Un.fromBufferAttribute(e,t),Un.normalize(),e.setXYZ(t,Un.x,Un.y,Un.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,p=o.normalized,d=new l.constructor(c.length*h),u=0,m=0;for(let f=0,v=c.length;f<v;f++){u=o.isInterleavedBufferAttribute?c[f]*o.data.stride+o.offset:c[f]*h;for(let g=0;g<h;g++)d[m++]=l[u++]}return new Pt(d,h,p)}if(this.index===null)return Ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let c=e(r[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,p=l.length;h<p;h++){let d=e(l[h],n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let p=0,d=l.length;p<d;p++){let u=l[p];h.push(u.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let l in r){let h=r[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],p=s[l];for(let d=0,u=p.length;d<u;d++)h.push(p[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=ur()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ur()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ur()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},ti=new P,Sa=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.applyMatrix4(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.applyNormalMatrix(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.transformDirection(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Gi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Zt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Zt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Gi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Gi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Gi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Gi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),r=Zt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),r=Zt(r,this.array),s=Zt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ma("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Pt(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ma("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Jc=new P,Xg=new P,qg=new st,Pi=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Jc.subVectors(n,t).cross(Xg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Jc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||qg.getNormalMatrix(e),r=this.coplanarPoint(Jc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Rs,jg=0,qi=class extends Xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=ur(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ye(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:Ye(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ht().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Pi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new me().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new me().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Fs=class extends qi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},oa=new P,Cs=new P,Is=new P,Ps=new me,la=new me,gf=new pt,mo=new P,ca=new P,go=new P,ep=new me,Kc=new me,tp=new me,Ma=class extends ii{constructor(e=new Fs){if(super(),this.isSprite=!0,this.type="Sprite",Rs===void 0){Rs=new bt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Wo(t,5);Rs.setIndex([0,1,2,0,2,3]),Rs.setAttribute("position",new Sa(n,3,0,!1)),Rs.setAttribute("uv",new Sa(n,2,3,!1))}this.geometry=Rs,this.material=e,this.center=new me(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Qe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Cs.setFromMatrixScale(this.matrixWorld),gf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Is.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Cs.multiplyScalar(-Is.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;_o(mo.set(-.5,-.5,0),Is,a,Cs,r,s),_o(ca.set(.5,-.5,0),Is,a,Cs,r,s),_o(go.set(.5,.5,0),Is,a,Cs,r,s),ep.set(0,0),Kc.set(1,0),tp.set(1,1);let o=e.ray.intersectTriangle(mo,ca,go,!1,oa);if(o===null&&(_o(ca.set(-.5,.5,0),Is,a,Cs,r,s),Kc.set(0,1),o=e.ray.intersectTriangle(mo,go,ca,!1,oa),o===null))return;let c=e.ray.origin.distanceTo(oa);c<e.near||c>e.far||t.push({distance:c,point:oa.clone(),uv:Hi.getInterpolation(oa,mo,ca,go,ep,Kc,tp,new me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function _o(i,e,t,n,r,s){Ps.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(la.x=s*Ps.x-r*Ps.y,la.y=r*Ps.x+s*Ps.y):la.copy(Ps),i.copy(e),i.x+=la.x,i.y+=la.y,i.applyMatrix4(gf)}var aS=new P,oS=new P;var cr=new P,Qc=new P,vo=new P,xo=new P,$r=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,cr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=cr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(cr.copy(this.origin).addScaledVector(this.direction,t),cr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Qc.copy(e).add(t).multiplyScalar(.5),vo.copy(t).sub(e).normalize(),xo.copy(this.origin).sub(Qc);let s=.5*e.distanceTo(t),a=-this.direction.dot(vo),o=xo.dot(this.direction),c=-xo.dot(vo),l=xo.lengthSq(),h=Math.abs(1-a*a),p,d,u,m;if(h>0)if(p=a*c-o,d=a*o-c,m=s*h,p>=0)if(d>=-m)if(d<=m){let f=1/h;p*=f,d*=f,u=p*(p+a*d+2*o)+d*(a*p+d+2*c)+l}else d=s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;else d=-s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;else d<=-m?(p=Math.max(0,-(-a*s+o)),d=p>0?-s:Math.min(Math.max(-s,-c),s),u=-p*p+d*(d+2*c)+l):d<=m?(p=0,d=Math.min(Math.max(-s,-c),s),u=d*(d+2*c)+l):(p=Math.max(0,-(a*s+o)),d=p>0?s:Math.min(Math.max(-s,-c),s),u=-p*p+d*(d+2*c)+l);else d=a>0?-s:s,p=Math.max(0,-(a*d+o)),u=-p*p+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Qc).addScaledVector(vo,d),u}intersectSphere(e,t){if(e.radius<0)return null;cr.subVectors(e.center,this.origin);let n=cr.dot(this.direction),r=cr.dot(cr)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-d.z)*p,c=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,c=(e.min.z-d.z)*p),n>c||o>r?null:((o>n||n!=n)&&(n=o),(c<r||r!=r)&&(r=c),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,cr)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,p=e.x-a.x,d=e.y-a.y,u=e.z-a.z,m=t.x-a.x,f=t.y-a.y,v=t.z-a.z,g=n.x-a.x,_=n.y-a.y,b=n.z-a.z,T=Math.abs(c),S=Math.abs(l),M=Math.abs(h),I,O,k,U,X,V,Z,se,ee,re,N,$;if(T>=S&&T>=M?(k=c,V=p,ee=m,$=g,c>=0?(I=l,O=h,U=d,X=u,Z=f,se=v,re=_,N=b):(I=h,O=l,U=u,X=d,Z=v,se=f,re=b,N=_)):S>=M?(k=l,V=d,ee=f,$=_,l>=0?(I=h,O=c,U=u,X=p,Z=v,se=m,re=b,N=g):(I=c,O=h,U=p,X=u,Z=m,se=v,re=g,N=b)):(k=h,V=u,ee=v,$=b,h>=0?(I=c,O=l,U=p,X=d,Z=m,se=f,re=g,N=_):(I=l,O=c,U=d,X=p,Z=f,se=m,re=_,N=g)),k===0)return null;let he=I/k,le=O/k,te=U-he*V,ge=X-le*V,ue=Z-he*ee,oe=se-le*ee,ie=re-he*$,ve=N-le*$,_e=ie*oe-ve*ue,Me=te*ve-ge*ie,A=ue*ge-oe*te;if(r){if(_e<0||Me<0||A<0)return null}else if((_e<0||Me<0||A<0)&&(_e>0||Me>0||A>0))return null;let w=_e+Me+A;if(w===0)return null;let C=1/k*(_e*V+Me*ee+A*$);return(w>0?C<0:C>0)?null:this.at(C/w,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ba=class extends qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},np=new pt,qr=new $r,yo=new Ni,ip=new P,So=new P,Mo=new P,bo=new P,eh=new P,To=new P,rp=new P,Eo=new P,$n=class extends ii{constructor(e=new bt,t=new ba){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){To.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],p=s[c];h!==0&&(eh.fromBufferAttribute(p,e),a?To.addScaledVector(eh,h):To.addScaledVector(eh.sub(t),h))}t.add(To)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),yo.copy(n.boundingSphere),yo.applyMatrix4(s),qr.copy(e.ray).recast(e.near),yo.containsPoint(qr.origin)===!1&&(qr.intersectSphere(yo,ip)===null||qr.origin.distanceToSquared(ip)>(e.far-e.near)**2))return;np.copy(s).invert(),qr.copy(e.ray).applyMatrix4(np),n.boundingBox!==null&&qr.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,qr)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,d=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),b=Math.min(o.count,Math.min(v.start+v.count,u.start+u.count));_<b;_+=3)r=wo(this,g,e,n,l,h,p,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(o.count,u.start+u.count);m<f;m+=3)r=wo(this,a,e,n,l,h,p,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(c!==void 0)if(Array.isArray(a))for(let m=0,f=d.length;m<f;m++){let v=d[m],g=a[v.materialIndex];for(let _=Math.max(v.start,u.start),b=Math.min(c.count,Math.min(v.start+v.count,u.start+u.count));_<b;_+=3)r=wo(this,g,e,n,l,h,p,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,u.start),f=Math.min(c.count,u.start+u.count);m<f;m+=3)r=wo(this,a,e,n,l,h,p,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};function Yg(i,e,t,n,r,s,a,o){let c;if(c=e.side===1?n.intersectTriangle(a,s,r,!0,o):n.intersectTriangle(r,s,a,e.side===0,o),c===null)return null;Eo.copy(o),Eo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Eo);return l<t.near||l>t.far?null:{distance:l,point:Eo.clone(),object:i}}function wo(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,So),i.getVertexPosition(c,Mo),i.getVertexPosition(l,bo);let h=Yg(i,e,t,n,So,Mo,bo,rp);if(h){let p=new P;Hi.getBarycoord(rp,So,Mo,bo,p),r&&(h.uv=Hi.getInterpolatedAttribute(r,o,c,l,p,new me)),s&&(h.uv1=Hi.getInterpolatedAttribute(s,o,c,l,p,new me)),a&&(h.normal=Hi.getInterpolatedAttribute(a,o,c,l,p,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new P,materialIndex:0};Hi.getNormal(So,Mo,bo,d.normal),h.face=d,h.barycoord=p}return h}var lS=new en,cS=new en,hS=new en,uS=new en,dS=new pt,pS=new P,fS=new Ni,mS=new pt,gS=new $r;var Zr=class extends ni{constructor(e=null,t=1,n=1,r,s,a,o,c,l=1003,h=1003,p,d){super(null,a,o,c,l,h,r,s,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},_S=new pt,vS=new pt;var xS=new pt,yS=new pt;var SS=new Li,MS=new pt,bS=new $n,TS=new Ni;var jr=new Ni,$g=new me(.5,.5),Ao=new P,Lr=class{constructor(e=new Pi,t=new Pi,n=new Pi,r=new Pi,s=new Pi,a=new Pi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],p=s[5],d=s[6],u=s[7],m=s[8],f=s[9],v=s[10],g=s[11],_=s[12],b=s[13],T=s[14],S=s[15];if(r[0].setComponents(l-a,u-h,g-m,S-_).normalize(),r[1].setComponents(l+a,u+h,g+m,S+_).normalize(),r[2].setComponents(l+o,u+p,g+f,S+b).normalize(),r[3].setComponents(l-o,u-p,g-f,S-b).normalize(),n)r[4].setComponents(c,d,v,T).normalize(),r[5].setComponents(l-c,u-d,g-v,S-T).normalize();else if(r[4].setComponents(l-c,u-d,g-v,S-T).normalize(),t===2e3)r[5].setComponents(l+c,u+d,g+v,S+T).normalize();else{if(t!==2001)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(c,d,v,T).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jr)}intersectsSprite(e){jr.center.set(0,0,0);let t=$g.distanceTo(e.center);return jr.radius=.7071067811865476+t,jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(jr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ao.x=r.normal.x>0?e.max.x:e.min.x,Ao.y=r.normal.y>0?e.max.y:e.min.y,Ao.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ao)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},sp=new pt,Xo=class i{constructor(){this.coordinateSystem=2e3,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let r=0;r<t.length;r++){let s=t[r];sp.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[r]===void 0&&(n[r]=new Lr),n[r].setFromProjectionMatrix(sp,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Lr),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new i().copy(this)}};var oh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},ES=new pt,wS=new ht(1,1,1),AS=new Lr,RS=new Xo,CS=new Li,IS=new Ni,PS=new P,LS=new P,NS=new P,DS=new oh,US=new $n;var Jr=class extends qi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},qo=new P,jo=new P,ap=new pt,ha=new $r,Ro=new Ni,th=new P,op=new P,Yo=class extends ii{constructor(e=new bt,t=new Jr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)qo.fromBufferAttribute(t,r-1),jo.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=qo.distanceTo(jo);e.setAttribute("lineDistance",new je(n,1))}else Ye("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ro.copy(n.boundingSphere),Ro.applyMatrix4(r),Ro.radius+=s,e.ray.intersectsSphere(Ro)===!1)return;ap.copy(r).invert(),ha.copy(e.ray).applyMatrix4(ap);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),u=Math.min(h.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=l){let v=h.getX(m),g=h.getX(m+1),_=Co(this,e,ha,c,v,g,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(u-1),f=h.getX(d),v=Co(this,e,ha,c,m,f,u-1);v&&t.push(v)}}else{let d=Math.max(0,a.start),u=Math.min(p.count,a.start+a.count);for(let m=d,f=u-1;m<f;m+=l){let v=Co(this,e,ha,c,m,m+1,m);v&&t.push(v)}if(this.isLineLoop){let m=Co(this,e,ha,c,u-1,d,u-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Co(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(qo.fromBufferAttribute(o,r),jo.fromBufferAttribute(o,s),t.distanceSqToSegment(qo,jo,th,op)>n)return;th.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(th);return c<e.near||c>e.far?void 0:{distance:c,point:op.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var lp=new P,cp=new P,Kr=class extends Yo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)lp.fromBufferAttribute(t,r),cp.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+lp.distanceTo(cp);e.setAttribute("lineDistance",new je(n,1))}else Ye("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Bs=class extends qi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},hp=new pt,lh=new $r,Io=new Ni,Po=new P,ji=class extends ii{constructor(e=new bt,t=new Bs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(r),Io.radius+=s,e.ray.intersectsSphere(Io)===!1)return;hp.copy(r).invert(),lh.copy(e.ray).applyMatrix4(hp);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null)for(let p=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);p<d;p++){let u=l.getX(p);Po.fromBufferAttribute(h,u),up(Po,u,c,r,e,t,this)}else for(let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);p<d;p++)Po.fromBufferAttribute(h,p),up(Po,p,c,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function up(i,e,t,n,r,s,a){let o=lh.distanceSqToPoint(i);if(o<t){let c=new P;lh.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Ta=class extends ni{constructor(e=[],t=301,n,r,s,a,o,c,l,h){super(e,t,n,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Nr=class extends ni{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Dr=class extends ni{constructor(e,t,n=1014,r,s,a,o=1003,c=1003,l,h=1026,p=1){if(h!==1026&&h!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:p},r,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Us(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},$o=class extends Dr{constructor(e,t=1014,n=301,r,s,a=1003,o=1003,c,l=1026){let h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ea=class extends ni{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Qr=class i extends bt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],p=[],d=0,u=0;function m(f,v,g,_,b,T,S,M,I,O,k){let U=T/I,X=S/O,V=T/2,Z=S/2,se=M/2,ee=I+1,re=O+1,N=0,$=0,he=new P;for(let le=0;le<re;le++){let te=le*X-Z;for(let ge=0;ge<ee;ge++){let ue=ge*U-V;he[f]=ue*_,he[v]=te*b,he[g]=se,l.push(he.x,he.y,he.z),he[f]=0,he[v]=0,he[g]=M>0?1:-1,h.push(he.x,he.y,he.z),p.push(ge/I),p.push(1-le/O),N+=1}}for(let le=0;le<O;le++)for(let te=0;te<I;te++){let ge=d+te+ee*le,ue=d+te+ee*(le+1),oe=d+(te+1)+ee*(le+1),ie=d+(te+1)+ee*le;c.push(ge,ue,ie),c.push(ue,oe,ie),$+=6}o.addGroup(u,$,k),u+=$,d+=N}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Zo=class i extends bt{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,p=Math.PI/2*e,d=t,u=2*p+d,m=2*n+s,f=r+1,v=new P,g=new P;for(let _=0;_<=m;_++){let b=0,T=0,S=0,M=0;if(_<=n){let k=_/n,U=k*Math.PI/2;T=-h-e*Math.cos(U),S=e*Math.sin(U),M=-e*Math.cos(U),b=k*p}else if(_<=n+s){let k=(_-n)/s;T=k*t-h,S=e,M=0,b=p+k*d}else{let k=(_-n-s)/n,U=k*Math.PI/2;T=h+e*Math.sin(U),S=e*Math.cos(U),M=e*Math.sin(U),b=p+d+k*p}let I=Math.max(0,Math.min(1,b/u)),O=0;_===0?O=.5/r:_===m&&(O=-.5/r);for(let k=0;k<=r;k++){let U=k/r,X=U*Math.PI*2,V=Math.sin(X),Z=Math.cos(X);g.x=-S*Z,g.y=T,g.z=S*V,o.push(g.x,g.y,g.z),v.set(-S*Z,M,S*V),v.normalize(),c.push(v.x,v.y,v.z),l.push(U+O,I)}if(_>0){let k=(_-1)*f;for(let U=0;U<r;U++){let X=k+U,V=k+U+1,Z=_*f+U,se=_*f+U+1;a.push(X,V,Z),a.push(V,se,Z)}}}this.setIndex(a),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(c,3)),this.setAttribute("uv",new je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Jo=class i extends bt{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new P,h=new me;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let p=0,d=3;p<=t;p++,d+=3){let u=n+p/t*r;l.x=e*Math.cos(u),l.y=e*Math.sin(u),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let p=1;p<=t;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(o,3)),this.setAttribute("uv",new je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},wa=class i extends bt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let h=[],p=[],d=[],u=[],m=0,f=[],v=n/2,g=0;function _(b){let T=m,S=new me,M=new P,I=0,O=b===!0?e:t,k=b===!0?1:-1;for(let X=1;X<=r;X++)p.push(0,v*k,0),d.push(0,k,0),u.push(.5,.5),m++;let U=m;for(let X=0;X<=r;X++){let V=X/r*c+o,Z=Math.cos(V),se=Math.sin(V);M.x=O*se,M.y=v*k,M.z=O*Z,p.push(M.x,M.y,M.z),d.push(0,k,0),S.x=.5*Z+.5,S.y=.5*se*k+.5,u.push(S.x,S.y),m++}for(let X=0;X<r;X++){let V=T+X,Z=U+X;b===!0?h.push(Z,Z+1,V):h.push(Z+1,Z,V),I+=3}l.addGroup(g,I,b===!0?1:2),g+=I}(function(){let b=new P,T=new P,S=0,M=(t-e)/n;for(let I=0;I<=s;I++){let O=[],k=I/s,U=k*(t-e)+e;for(let X=0;X<=r;X++){let V=X/r,Z=V*c+o,se=Math.sin(Z),ee=Math.cos(Z);T.x=U*se,T.y=-k*n+v,T.z=U*ee,p.push(T.x,T.y,T.z),b.set(se,M,ee).normalize(),d.push(b.x,b.y,b.z),u.push(V,1-k),O.push(m++)}f.push(O)}for(let I=0;I<r;I++)for(let O=0;O<s;O++){let k=f[O][I],U=f[O+1][I],X=f[O+1][I+1],V=f[O][I+1];(e>0||O!==0)&&(h.push(k,U,V),S+=3),(t>0||O!==s-1)&&(h.push(U,X,V),S+=3)}l.addGroup(g,S,0),g+=S})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ko=class i extends wa{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ur=class i extends bt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(u,m,f,v){let g=v+1,_=[];for(let b=0;b<=g;b++){_[b]=[];let T=u.clone().lerp(f,b/g),S=m.clone().lerp(f,b/g),M=g-b;for(let I=0;I<=M;I++)_[b][I]=I===0&&b===g?T:T.clone().lerp(S,I/M)}for(let b=0;b<g;b++)for(let T=0;T<2*(g-b)-1;T++){let S=Math.floor(T/2);T%2==0?(c(_[b][S+1]),c(_[b+1][S]),c(_[b][S])):(c(_[b][S+1]),c(_[b+1][S+1]),c(_[b+1][S]))}}function c(u){s.push(u.x,u.y,u.z)}function l(u,m){let f=3*u;m.x=e[f+0],m.y=e[f+1],m.z=e[f+2]}function h(u,m,f,v){v<0&&u.x===1&&(a[m]=u.x-1),f.x===0&&f.z===0&&(a[m]=v/2/Math.PI+.5)}function p(u){return Math.atan2(u.z,-u.x)}function d(u){return Math.atan2(-u.y,Math.sqrt(u.x*u.x+u.z*u.z))}(function(u){let m=new P,f=new P,v=new P;for(let g=0;g<t.length;g+=3)l(t[g+0],m),l(t[g+1],f),l(t[g+2],v),o(m,f,v,u)})(r),(function(u){let m=new P;for(let f=0;f<s.length;f+=3)m.x=s[f+0],m.y=s[f+1],m.z=s[f+2],m.normalize().multiplyScalar(u),s[f+0]=m.x,s[f+1]=m.y,s[f+2]=m.z})(n),(function(){let u=new P;for(let m=0;m<s.length;m+=3){u.x=s[m+0],u.y=s[m+1],u.z=s[m+2];let f=p(u)/2/Math.PI+.5,v=d(u)/Math.PI+.5;a.push(f,1-v)}(function(){let m=new P,f=new P,v=new P,g=new P,_=new me,b=new me,T=new me;for(let S=0,M=0;S<s.length;S+=9,M+=6){m.set(s[S+0],s[S+1],s[S+2]),f.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),_.set(a[M+0],a[M+1]),b.set(a[M+2],a[M+3]),T.set(a[M+4],a[M+5]),g.copy(m).add(f).add(v).divideScalar(3);let I=p(g);h(_,M+0,m,I),h(b,M+2,f,I),h(T,M+4,v,I)}})(),(function(){for(let m=0;m<a.length;m+=6){let f=a[m+0],v=a[m+2],g=a[m+4],_=Math.max(f,v,g),b=Math.min(f,v,g);_>.9&&b<.1&&(f<.2&&(a[m+0]+=1),v<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new je(s,3)),this.setAttribute("normal",new je(s.slice(),3)),this.setAttribute("uv",new je(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},Qo=class i extends Ur{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Lo=new P,No=new P,nh=new P,Do=new Hi,el=class extends bt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(zo*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],p=new Array(3),d={},u=[];for(let m=0;m<c;m+=3){a?(l[0]=a.getX(m),l[1]=a.getX(m+1),l[2]=a.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);let{a:f,b:v,c:g}=Do;if(f.fromBufferAttribute(o,l[0]),v.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),Do.getNormal(nh),p[0]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,p[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,p[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,p[0]!==p[1]&&p[1]!==p[2]&&p[2]!==p[0])for(let _=0;_<3;_++){let b=(_+1)%3,T=p[_],S=p[b],M=Do[h[_]],I=Do[h[b]],O=`${T}_${S}`,k=`${S}_${T}`;k in d&&d[k]?(nh.dot(d[k].normal)<=s&&(u.push(M.x,M.y,M.z),u.push(I.x,I.y,I.z)),d[k]=null):O in d||(d[O]={index0:l[_],index1:l[b],normal:nh.clone()})}}for(let m in d)if(d[m]){let{index0:f,index1:v}=d[m];Lo.fromBufferAttribute(o,f),No.fromBufferAttribute(o,v),u.push(Lo.x,Lo.y,Lo.z),u.push(No.x,No.y,No.z)}this.setAttribute("position",new je(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},vi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ye("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(r=Math.floor(c+(l-c)/2),o=n[r]-a,o<0)c=r+1;else{if(!(o>0)){l=r;break}l=r-1}if(r=l,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),c=t||(a.isVector2?new me:new P);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,r=[],s=[],a=[],o=new P,c=new pt;for(let u=0;u<=e;u++){let m=u/e;r[u]=this.getTangentAt(m,new P)}s[0]=new P,a[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(r[0].x),p=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),p<=l&&(l=p,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(r[u-1],r[u]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(yt(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(c.makeRotationAxis(o,m))}a[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(yt(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(u=-u);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(r[m],u*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},zs=class extends vi{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new me){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=c-this.aX,u=l-this.aY;c=d*h-u*p+this.aX,l=d*p+u*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},tl=class extends zs{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function vu(){let i=0,e=0,t=0,n=0;function r(s,a,o,c){i=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){r(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,p){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,u=(o-a)/h-(c-a)/(h+p)+(c-o)/p;d*=h,u*=h,r(a,o,d,u)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var dp=new P,pp=new P,ih=new vu,rh=new vu,sh=new vu,nl=class extends vi{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new P){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=r[(l-1)%s]:(pp.subVectors(r[0],r[1]).add(r[0]),o=pp);let p=r[l%s],d=r[(l+1)%s];if(this.closed||l+2<s?c=r[(l+2)%s]:(dp.subVectors(r[s-1],r[s-2]).add(r[s-1]),c=dp),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(p),u),f=Math.pow(p.distanceToSquared(d),u),v=Math.pow(d.distanceToSquared(c),u);f<1e-4&&(f=1),m<1e-4&&(m=f),v<1e-4&&(v=f),ih.initNonuniformCatmullRom(o.x,p.x,d.x,c.x,m,f,v),rh.initNonuniformCatmullRom(o.y,p.y,d.y,c.y,m,f,v),sh.initNonuniformCatmullRom(o.z,p.z,d.z,c.z,m,f,v)}else this.curveType==="catmullrom"&&(ih.initCatmullRom(o.x,p.x,d.x,c.x,this.tension),rh.initCatmullRom(o.y,p.y,d.y,c.y,this.tension),sh.initCatmullRom(o.z,p.z,d.z,c.z,this.tension));return n.set(ih.calc(h),rh.calc(h),sh.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new P().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function fp(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function Zg(i,e){let t=1-i;return t*t*e}function Jg(i,e){return 2*(1-i)*i*e}function Kg(i,e){return i*i*e}function da(i,e,t,n){return Zg(i,e)+Jg(i,t)+Kg(i,n)}function Qg(i,e){let t=1-i;return t*t*t*e}function e0(i,e){let t=1-i;return 3*t*t*i*e}function t0(i,e){return 3*(1-i)*i*i*e}function n0(i,e){return i*i*i*e}function pa(i,e,t,n,r){return Qg(i,e)+e0(i,t)+t0(i,n)+n0(i,r)}var Aa=class extends vi{constructor(e=new me,t=new me,n=new me,r=new me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new me){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(pa(e,r.x,s.x,a.x,o.x),pa(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},il=class extends vi{constructor(e=new P,t=new P,n=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(pa(e,r.x,s.x,a.x,o.x),pa(e,r.y,s.y,a.y,o.y),pa(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ra=class extends vi{constructor(e=new me,t=new me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new me){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rl=class extends vi{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ca=class extends vi{constructor(e=new me,t=new me,n=new me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new me){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(da(e,r.x,s.x,a.x),da(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ia=class extends vi{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(da(e,r.x,s.x,a.x),da(e,r.y,s.y,a.y),da(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Pa=class extends vi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new me){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,c=r[a===0?a:a-1],l=r[a],h=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return n.set(fp(o,c.x,l.x,h.x,p.x),fp(o,c.y,l.y,h.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new me().fromArray(r))}return this}},sl=Object.freeze({__proto__:null,ArcCurve:tl,CatmullRomCurve3:nl,CubicBezierCurve:Aa,CubicBezierCurve3:il,EllipseCurve:zs,LineCurve:Ra,LineCurve3:rl,QuadraticBezierCurve:Ca,QuadraticBezierCurve3:Ia,SplineCurve:Pa}),al=class extends vi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new sl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new sl[r.type]().fromJSON(r))}return this}},La=class extends al{constructor(e){super(),this.type="Path",this.currentPoint=new me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ra(this.currentPoint.clone(),new me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Ca(this.currentPoint.clone(),new me(e,t),new me(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new Aa(this.currentPoint.clone(),new me(e,t),new me(n,r),new me(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Pa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,r,s,a,o,c),this}absellipse(e,t,n,r,s,a,o,c){let l=new zs(e,t,n,r,s,a,o,c);if(this.curves.length>0){let p=l.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Na=class extends La{constructor(e){super(e),this.uuid=ur(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new La().fromJSON(r))}return this}};function i0(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=_f(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=l0(i,e,s,t)),i.length>80*t){o=i[0],c=i[1];let h=o,p=c;for(let d=t;d<r;d+=t){let u=i[d],m=i[d+1];u<o&&(o=u),m<c&&(c=m),u>h&&(h=u),m>p&&(p=m)}l=Math.max(h-o,p-c),l=l!==0?32767/l:0}return Da(s,a,t,o,c,l,0),a}function _f(i,e,t,n,r){let s;if(r===x0(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=mp(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=mp(a/n|0,i[a],i[a+1],s);return s&&Vs(s,s.next)&&(Oa(s),s=s.next),s}function es(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!Vs(n,n.next)&&xn(n.prev,n,n.next)!==0)n=n.next;else{if(Oa(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Da(i,e,t,n,r,s,a){if(!i)return;!a&&s&&p0(i,n,r,s);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(s?s0(i,n,r,s):r0(i))e.push(c.i,i.i,l.i),Oa(i),i=l.next,o=l.next;else if((i=l)===o){a?a===1?Da(i=a0(es(i),e),e,t,n,r,s,2):a===2&&o0(i,e,t,n,r,s):Da(es(i),e,t,n,r,s,1);break}}}function r0(i){let e=i.prev,t=i,n=i.next;if(xn(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(r,s,a),p=Math.min(o,c,l),d=Math.max(r,s,a),u=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=p&&m.y<=u&&ua(r,o,s,c,a,l,m.x,m.y)&&xn(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function s0(i,e,t,n){let r=i.prev,s=i,a=i.next;if(xn(r,s,a)>=0)return!1;let o=r.x,c=s.x,l=a.x,h=r.y,p=s.y,d=a.y,u=Math.min(o,c,l),m=Math.min(h,p,d),f=Math.max(o,c,l),v=Math.max(h,p,d),g=ch(u,m,e,t,n),_=ch(f,v,e,t,n),b=i.prevZ,T=i.nextZ;for(;b&&b.z>=g&&T&&T.z<=_;){if(b.x>=u&&b.x<=f&&b.y>=m&&b.y<=v&&b!==r&&b!==a&&ua(o,h,c,p,l,d,b.x,b.y)&&xn(b.prev,b,b.next)>=0||(b=b.prevZ,T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&ua(o,h,c,p,l,d,T.x,T.y)&&xn(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;b&&b.z>=g;){if(b.x>=u&&b.x<=f&&b.y>=m&&b.y<=v&&b!==r&&b!==a&&ua(o,h,c,p,l,d,b.x,b.y)&&xn(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;T&&T.z<=_;){if(T.x>=u&&T.x<=f&&T.y>=m&&T.y<=v&&T!==r&&T!==a&&ua(o,h,c,p,l,d,T.x,T.y)&&xn(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function a0(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Vs(n,r)&&xf(n,t,t.next,r)&&Ua(n,r)&&Ua(r,n)&&(e.push(n.i,t.i,r.i),Oa(t),Oa(t.next),t=i=r),t=t.next}while(t!==i);return es(t)}function o0(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&g0(a,o)){let c=yf(a,o);return a=es(a,a.next),c=es(c,c.next),Da(a,e,t,n,r,s,0),void Da(c,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function l0(i,e,t,n){let r=[];for(let s=0,a=e.length;s<a;s++){let o=_f(i,e[s]*n,s<a-1?e[s+1]*n:i.length,n,!1);o===o.next&&(o.steiner=!0),r.push(m0(o))}r.sort(c0);for(let s=0;s<r.length;s++)t=h0(r[s],t);return t}function c0(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function h0(i,e){let t=u0(i,e);if(!t)return e;let n=yf(t,i);return es(n,n.next),es(t,t.next)}function u0(i,e){let t=e,n=i.x,r=i.y,s,a=-1/0;if(Vs(i,t))return t;do{if(Vs(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let p=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>a&&(a=p,s=t.x<t.next.x?t:t.next,p===n))return s}t=t.next}while(t!==e);if(!s)return null;let o=s,c=s.x,l=s.y,h=1/0;t=s;do{if(n>=t.x&&t.x>=c&&n!==t.x&&vf(r<l?n:a,r,c,l,r<l?a:n,r,t.x,t.y)){let p=Math.abs(r-t.y)/(n-t.x);Ua(t,i)&&(p<h||p===h&&(t.x>s.x||t.x===s.x&&d0(s,t)))&&(s=t,h=p)}t=t.next}while(t!==o);return s}function d0(i,e){return xn(i.prev,i,e.prev)<0&&xn(e.next,i,i.next)<0}function p0(i,e,t,n){let r=i;do r.z===0&&(r.z=ch(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,f0(r)}function f0(i){let e,t=1;do{let n,r=i;i=null;let s=null;for(e=0;r;){e++;let a=r,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||r.z<=a.z)?(n=r,r=r.nextZ,o--):(n=a,a=a.nextZ,c--),s?s.nextZ=n:i=n,n.prevZ=s,s=n;r=a}s.nextZ=null,t*=2}while(e>1);return i}function ch(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function m0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function vf(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function ua(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&vf(i,e,t,n,r,s,a,o)}function g0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!_0(i,e)&&(Ua(i,e)&&Ua(e,i)&&v0(i,e)&&(xn(i.prev,i,e.prev)||xn(i,e.prev,e))||Vs(i,e)&&xn(i.prev,i,i.next)>0&&xn(e.prev,e,e.next)>0)}function xn(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Vs(i,e){return i.x===e.x&&i.y===e.y}function xf(i,e,t,n){let r=Oo(xn(i,e,t)),s=Oo(xn(i,e,n)),a=Oo(xn(t,n,i)),o=Oo(xn(t,n,e));return r!==s&&a!==o||!(r!==0||!Uo(i,t,e))||!(s!==0||!Uo(i,n,e))||!(a!==0||!Uo(t,i,n))||!(o!==0||!Uo(t,e,n))}function Uo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Oo(i){return i>0?1:i<0?-1:0}function _0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&xf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ua(i,e){return xn(i.prev,i,i.next)<0?xn(i,e,i.next)>=0&&xn(i,i.prev,e)>=0:xn(i,e,i.prev)<0||xn(i,i.next,e)<0}function v0(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function yf(i,e){let t=hh(i.i,i.x,i.y),n=hh(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function mp(i,e,t,n){let r=hh(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Oa(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function hh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function x0(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}var uh=class{static triangulate(e,t,n=2){return i0(e,t,n)}},Wi=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];gp(e),_p(n,e);let a=e.length;t.forEach(gp);for(let c=0;c<t.length;c++)r.push(a),a+=t[c].length,_p(n,t[c]);let o=uh.triangulate(n,r);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function gp(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function _p(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var ol=class i extends bt{constructor(e=new Na([new me(.5,.5),new me(-.5,.5),new me(-.5,-.5),new me(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:u-.1,f=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:y0,b,T,S,M,I,O=!1;if(g){b=g.getSpacedPoints(h),O=!0,d=!1;let C=!!g.isCatmullRomCurve3&&g.closed;T=g.computeFrenetFrames(h,C),S=new P,M=new P,I=new P}d||(v=0,u=0,m=0,f=0);let k=o.extractPoints(l),U=k.shape,X=k.holes;if(!Wi.isClockWise(U)){U=U.reverse();for(let C=0,z=X.length;C<z;C++){let y=X[C];Wi.isClockWise(y)&&(X[C]=y.reverse())}}function V(C){let z=10000000000000001e-36,y=C[0];for(let B=1;B<=C.length;B++){let F=B%C.length,R=C[F],q=R.x-y.x,Y=R.y-y.y,J=q*q+Y*Y,de=Math.max(Math.abs(R.x),Math.abs(R.y),Math.abs(y.x),Math.abs(y.y));J<=z*de*de?(C.splice(F,1),B--):y=R}}V(U),X.forEach(V);let Z=X.length,se=U;for(let C=0;C<Z;C++){let z=X[C];U=U.concat(z)}function ee(C,z,y){return z||Qe("ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(z,y)}let re=U.length;function N(C,z,y){let B,F,R,q=C.x-z.x,Y=C.y-z.y,J=y.x-C.x,de=y.y-C.y,Le=q*q+Y*Y,Ne=q*de-Y*J;if(Math.abs(Ne)>Number.EPSILON){let Se=Math.sqrt(Le),ke=Math.sqrt(J*J+de*de),ce=z.x-Y/Se,fe=z.y+q/Se,xe=((y.x-de/ke-ce)*de-(y.y+J/ke-fe)*J)/(q*de-Y*J);B=ce+q*xe-C.x,F=fe+Y*xe-C.y;let Ae=B*B+F*F;if(Ae<=2)return new me(B,F);R=Math.sqrt(Ae/2)}else{let Se=!1;q>Number.EPSILON?J>Number.EPSILON&&(Se=!0):q<-Number.EPSILON?J<-Number.EPSILON&&(Se=!0):Math.sign(Y)===Math.sign(de)&&(Se=!0),Se?(B=-Y,F=q,R=Math.sqrt(Le)):(B=q,F=Y,R=Math.sqrt(Le/2))}return new me(B/R,F/R)}let $=[];for(let C=0,z=se.length,y=z-1,B=C+1;C<z;C++,y++,B++)y===z&&(y=0),B===z&&(B=0),$[C]=N(se[C],se[y],se[B]);let he=[],le,te,ge=$.concat();for(let C=0,z=Z;C<z;C++){let y=X[C];le=[];for(let B=0,F=y.length,R=F-1,q=B+1;B<F;B++,R++,q++)R===F&&(R=0),q===F&&(q=0),le[B]=N(y[B],y[R],y[q]);he.push(le),ge=ge.concat(le)}if(v===0)te=Wi.triangulateShape(se,X);else{let C=[],z=[];for(let y=0;y<v;y++){let B=y/v,F=u*Math.cos(B*Math.PI/2),R=m*Math.sin(B*Math.PI/2)+f;for(let q=0,Y=se.length;q<Y;q++){let J=ee(se[q],$[q],R);ve(J.x,J.y,-F),B===0&&C.push(J)}for(let q=0,Y=Z;q<Y;q++){let J=X[q];le=he[q];let de=[];for(let Le=0,Ne=J.length;Le<Ne;Le++){let Se=ee(J[Le],le[Le],R);ve(Se.x,Se.y,-F),B===0&&de.push(Se)}B===0&&z.push(de)}}te=Wi.triangulateShape(C,z)}let ue=te.length,oe=m+f;for(let C=0;C<re;C++){let z=d?ee(U[C],ge[C],oe):U[C];O?(M.copy(T.normals[0]).multiplyScalar(z.x),S.copy(T.binormals[0]).multiplyScalar(z.y),I.copy(b[0]).add(M).add(S),ve(I.x,I.y,I.z)):ve(z.x,z.y,0)}for(let C=1;C<=h;C++)for(let z=0;z<re;z++){let y=d?ee(U[z],ge[z],oe):U[z];O?(M.copy(T.normals[C]).multiplyScalar(y.x),S.copy(T.binormals[C]).multiplyScalar(y.y),I.copy(b[C]).add(M).add(S),ve(I.x,I.y,I.z)):ve(y.x,y.y,p/h*C)}for(let C=v-1;C>=0;C--){let z=C/v,y=u*Math.cos(z*Math.PI/2),B=m*Math.sin(z*Math.PI/2)+f;for(let F=0,R=se.length;F<R;F++){let q=ee(se[F],$[F],B);ve(q.x,q.y,p+y)}for(let F=0,R=X.length;F<R;F++){let q=X[F];le=he[F];for(let Y=0,J=q.length;Y<J;Y++){let de=ee(q[Y],le[Y],B);O?ve(de.x,de.y+b[h-1].y,b[h-1].x+y):ve(de.x,de.y,p+y)}}}function ie(C,z){let y=C.length;for(;--y>=0;){let B=y,F=y-1;F<0&&(F=C.length-1);for(let R=0,q=h+2*v;R<q;R++){let Y=re*R,J=re*(R+1);Me(z+B+Y,z+F+Y,z+F+J,z+B+J)}}}function ve(C,z,y){c.push(C),c.push(z),c.push(y)}function _e(C,z,y){A(C),A(z),A(y);let B=r.length/3,F=_.generateTopUV(n,r,B-3,B-2,B-1);w(F[0]),w(F[1]),w(F[2])}function Me(C,z,y,B){A(C),A(z),A(B),A(z),A(y),A(B);let F=r.length/3,R=_.generateSideWallUV(n,r,F-6,F-3,F-2,F-1);w(R[0]),w(R[1]),w(R[3]),w(R[1]),w(R[2]),w(R[3])}function A(C){r.push(c[3*C+0]),r.push(c[3*C+1]),r.push(c[3*C+2])}function w(C){s.push(C.x),s.push(C.y)}(function(){let C=r.length/3;if(d){let z=0,y=re*z;for(let B=0;B<ue;B++){let F=te[B];_e(F[2]+y,F[1]+y,F[0]+y)}z=h+2*v,y=re*z;for(let B=0;B<ue;B++){let F=te[B];_e(F[0]+y,F[1]+y,F[2]+y)}}else{for(let z=0;z<ue;z++){let y=te[z];_e(y[2],y[1],y[0])}for(let z=0;z<ue;z++){let y=te[z];_e(y[0]+re*h,y[1]+re*h,y[2]+re*h)}}n.addGroup(C,r.length/3-C,0)})(),(function(){let C=r.length/3,z=0;ie(se,z),z+=se.length;for(let y=0,B=X.length;y<B;y++){let F=X[y];ie(F,z),z+=F.length}n.addGroup(C,r.length/3-C,1)})()}this.setAttribute("position",new je(r,3)),this.setAttribute("uv",new je(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return S0(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new sl[r.type]().fromJSON(r)),new i(n,e.options)}},y0={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*r],h=e[3*r+1];return[new me(s,a),new me(o,c),new me(l,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],p=e[3*n+2],d=e[3*r],u=e[3*r+1],m=e[3*r+2],f=e[3*s],v=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new me(a,1-c),new me(l,1-p),new me(d,1-m),new me(f,1-g)]:[new me(o,1-c),new me(h,1-p),new me(u,1-m),new me(v,1-g)]}};function S0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var ll=class i extends Ur{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},cl=class i extends bt{constructor(e=[new me(0,-.5),new me(.5,0),new me(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=yt(r,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,p=new P,d=new me,u=new P,m=new P,f=new P,v=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,f.copy(u),u.normalize(),c.push(u.x,u.y,u.z);break;case e.length-1:c.push(f.x,f.y,f.z);break;default:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,u.x=1*g,u.y=-v,u.z=0*g,m.copy(u),u.x+=f.x,u.y+=f.y,u.z+=f.z,u.normalize(),c.push(u.x,u.y,u.z),f.copy(m)}for(let _=0;_<=t;_++){let b=n+_*h*r,T=Math.sin(b),S=Math.cos(b);for(let M=0;M<=e.length-1;M++){p.x=e[M].x*T,p.y=e[M].y,p.z=e[M].x*S,a.push(p.x,p.y,p.z),d.x=_/t,d.y=M/(e.length-1),o.push(d.x,d.y);let I=c[3*M+0]*T,O=c[3*M+1],k=c[3*M+0]*S;l.push(I,O,k)}}for(let _=0;_<t;_++)for(let b=0;b<e.length-1;b++){let T=b+_*e.length,S=T,M=T+e.length,I=T+e.length+1,O=T+1;s.push(S,M,O),s.push(I,O,M)}this.setIndex(s),this.setAttribute("position",new je(a,3)),this.setAttribute("uv",new je(o,2)),this.setAttribute("normal",new je(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},hl=class i extends Ur{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ks=class i extends bt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,h=c+1,p=e/o,d=t/c,u=[],m=[],f=[],v=[];for(let g=0;g<h;g++){let _=g*d-a;for(let b=0;b<l;b++){let T=b*p-s;m.push(T,-_,0),f.push(0,0,1),v.push(b/o),v.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let b=_+l*g,T=_+l*(g+1),S=_+1+l*(g+1),M=_+1+l*g;u.push(b,T,M),u.push(T,S,M)}this.setIndex(u),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},ul=class i extends bt{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],p=e,d=(t-e)/(r=Math.max(1,r)),u=new P,m=new me;for(let f=0;f<=r;f++){for(let v=0;v<=n;v++){let g=s+v/n*a;u.x=p*Math.cos(g),u.y=p*Math.sin(g),c.push(u.x,u.y,u.z),l.push(0,0,1),m.x=(u.x/t+1)/2,m.y=(u.y/t+1)/2,h.push(m.x,m.y)}p+=d}for(let f=0;f<r;f++){let v=f*(n+1);for(let g=0;g<n;g++){let _=g+v,b=_,T=_+n+1,S=_+n+2,M=_+1;o.push(b,T,M),o.push(T,S,M)}}this.setIndex(o),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},dl=class i extends bt{constructor(e=new Na([new me(0,.5),new me(-.5,-.5),new me(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let p=r.length/3,d=h.extractPoints(t),u=d.shape,m=d.holes;Wi.isClockWise(u)===!1&&(u=u.reverse());for(let v=0,g=m.length;v<g;v++){let _=m[v];Wi.isClockWise(_)===!0&&(m[v]=_.reverse())}let f=Wi.triangulateShape(u,m);for(let v=0,g=m.length;v<g;v++){let _=m[v];u=u.concat(_)}for(let v=0,g=u.length;v<g;v++){let _=u[v];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let v=0,g=f.length;v<g;v++){let _=f[v],b=_[0]+p,T=_[1]+p,S=_[2]+p;n.push(b,T,S),c+=3}}this.setIndex(n),this.setAttribute("position",new je(r,3)),this.setAttribute("normal",new je(s,3)),this.setAttribute("uv",new je(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return M0(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}};function M0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}var Gs=class i extends bt{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],p=new P,d=new P,u=[],m=[],f=[],v=[];for(let g=0;g<=n;g++){let _=[],b=g/n,T=a+b*o,S=e*Math.cos(T),M=Math.sqrt(e*e-S*S),I=0;g===0&&a===0?I=.5/t:g===n&&c===Math.PI&&(I=-.5/t);for(let O=0;O<=t;O++){let k=O/t,U=r+k*s;p.x=-M*Math.cos(U),p.y=S,p.z=M*Math.sin(U),m.push(p.x,p.y,p.z),d.copy(p).normalize(),f.push(d.x,d.y,d.z),v.push(k+I,1-b),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let b=h[g][_+1],T=h[g][_],S=h[g+1][_],M=h[g+1][_+1];(g!==0||a>0)&&u.push(b,T,M),(g!==n-1||c<Math.PI)&&u.push(T,S,M)}this.setIndex(u),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},pl=class i extends Ur{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},fl=class i extends bt{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI,a=0,o=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let c=[],l=[],h=[],p=[],d=new P,u=new P,m=new P;for(let f=0;f<=n;f++){let v=a+f/n*o;for(let g=0;g<=r;g++){let _=g/r*s;u.x=(e+t*Math.cos(v))*Math.cos(_),u.y=(e+t*Math.cos(v))*Math.sin(_),u.z=t*Math.sin(v),l.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),m.subVectors(u,d).normalize(),h.push(m.x,m.y,m.z),p.push(g/r),p.push(f/n)}}for(let f=1;f<=n;f++)for(let v=1;v<=r;v++){let g=(r+1)*f+v-1,_=(r+1)*(f-1)+v-1,b=(r+1)*(f-1)+v,T=(r+1)*f+v;c.push(g,_,T),c.push(_,b,T)}this.setIndex(c),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},ml=class i extends bt{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],c=[],l=[],h=[],p=new P,d=new P,u=new P,m=new P,f=new P,v=new P,g=new P;for(let b=0;b<=n;++b){let T=b/n*s*Math.PI*2;_(T,s,a,e,u),_(T+.01,s,a,e,m),v.subVectors(m,u),g.addVectors(m,u),f.crossVectors(v,g),g.crossVectors(f,v),f.normalize(),g.normalize();for(let S=0;S<=r;++S){let M=S/r*Math.PI*2,I=-t*Math.cos(M),O=t*Math.sin(M);p.x=u.x+(I*g.x+O*f.x),p.y=u.y+(I*g.y+O*f.y),p.z=u.z+(I*g.z+O*f.z),c.push(p.x,p.y,p.z),d.subVectors(p,u).normalize(),l.push(d.x,d.y,d.z),h.push(b/n),h.push(S/r)}}for(let b=1;b<=n;b++)for(let T=1;T<=r;T++){let S=(r+1)*(b-1)+(T-1),M=(r+1)*b+(T-1),I=(r+1)*b+T,O=(r+1)*(b-1)+T;o.push(S,M,O),o.push(M,I,O)}function _(b,T,S,M,I){let O=Math.cos(b),k=Math.sin(b),U=S/T*b,X=Math.cos(U);I.x=M*(2+X)*.5*O,I.y=M*(2+X)*k*.5,I.z=M*Math.sin(U)*.5}this.setIndex(o),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},gl=class i extends bt{constructor(e=new Ia(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,c=new P,l=new me,h=new P,p=[],d=[],u=[],m=[];function f(v){h=e.getPointAt(v/t,h);let g=a.normals[v],_=a.binormals[v];for(let b=0;b<=r;b++){let T=b/r*Math.PI*2,S=Math.sin(T),M=-Math.cos(T);c.x=M*g.x+S*_.x,c.y=M*g.y+S*_.y,c.z=M*g.z+S*_.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,p.push(o.x,o.y,o.z)}}(function(){for(let v=0;v<t;v++)f(v);f(s===!1?t:0),(function(){for(let v=0;v<=t;v++)for(let g=0;g<=r;g++)l.x=v/t,l.y=g/r,u.push(l.x,l.y)})(),(function(){for(let v=1;v<=t;v++)for(let g=1;g<=r;g++){let _=(r+1)*(v-1)+(g-1),b=(r+1)*v+(g-1),T=(r+1)*v+g,S=(r+1)*(v-1)+g;m.push(_,b,S),m.push(b,T,S)}})()})(),this.setIndex(m),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new sl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},_l=class extends bt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new P,s=new P;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let p=c[l],d=p.start;for(let u=d,m=d+p.count;u<m;u+=3)for(let f=0;f<3;f++){let v=o.getX(u+f),g=o.getX(u+(f+1)%3);r.fromBufferAttribute(a,v),s.fromBufferAttribute(a,g),vp(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,p=3*o+(l+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,p),vp(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new je(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function vp(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var OS=Object.freeze({__proto__:null,BoxGeometry:Qr,CapsuleGeometry:Zo,CircleGeometry:Jo,ConeGeometry:Ko,CylinderGeometry:wa,DodecahedronGeometry:Qo,EdgesGeometry:el,ExtrudeGeometry:ol,IcosahedronGeometry:ll,LatheGeometry:cl,OctahedronGeometry:hl,PlaneGeometry:ks,PolyhedronGeometry:Ur,RingGeometry:ul,ShapeGeometry:dl,SphereGeometry:Gs,TetrahedronGeometry:pl,TorusGeometry:fl,TorusKnotGeometry:ml,TubeGeometry:gl,WireframeGeometry:_l});function os(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(xp(r))r.isRenderTargetTexture?(Ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(xp(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Kn(i){let e={};for(let t=0;t<i.length;t++){let n=os(i[t]);for(let r in n)e[r]=n[r]}return e}function xp(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function b0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function xu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ct.workingColorSpace}var Sf={clone:os,merge:Kn},T0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,E0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,En=class extends qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=T0,this.fragmentShader=E0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=b0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new ht().setHex(r.value);break;case"v2":this.uniforms[n].value=new me().fromArray(r.value);break;case"v3":this.uniforms[n].value=new P().fromArray(r.value);break;case"v4":this.uniforms[n].value=new en().fromArray(r.value);break;case"m3":this.uniforms[n].value=new st().fromArray(r.value);break;case"m4":this.uniforms[n].value=new pt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},vl=class extends En{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var xl=class extends qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},yl=class extends qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Fa=class extends Jr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Ls(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function ah(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Or=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Sl=class extends Or{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,o=2*t-n;break;case 2402:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case 2401:a=e,c=2*n-t;break;case 2402:a=1,c=n+r[1]-r[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(n-t)/(r-t),f=m*m,v=f*m,g=-d*v+2*d*f-d*m,_=(1+d)*v+(-1.5-2*d)*f+(-.5+d)*m+1,b=(-1-u)*v+(1.5+u)*f+.5*m,T=u*v-u*f;for(let S=0;S!==o;++S)s[S]=g*a[h+S]+_*a[l+S]+b*a[c+S]+T*a[p+S];return s}},Ml=class extends Or{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(r-t),p=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*p+a[c+d]*h;return s}},bl=class extends Or{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Tl=class extends Or{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let m=(n-t)/(r-t),f=1-m;for(let v=0;v!==o;++v)s[v]=a[l+v]*f+a[c+v]*m;return s}let d=2*o,u=e-1;for(let m=0;m!==o;++m){let f=a[l+m],v=a[c+m],g=u*d+2*m,_=p[g],b=p[g+1],T=e*d+2*m,S=h[T],M=h[T+1],I=A0(n,t,_,S,r);s[m]=Mf(I,f,b,M,v)}return s}};function Mf(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function w0(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function A0(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=Mf(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let c=w0(s,e,t,n,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}var _i=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ls(t,this.TimeBufferType),this.values=Ls(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ls(e.times,Array),values:Ls(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),ah(e.settings)&&(n.settings={inTangents:Ls(e.settings.inTangents,Array),outTangents:Ls(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new bl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ml(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Sl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Tl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return Ye("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;ah(this.settings)&&(yp(this.settings.inTangents,e),yp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Qe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Qe("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Qe("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(r!==void 0&&Cg(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){Qe("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===2302,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(r)c=!0;else{let h=o*n,p=h-n,d=h+n;for(let u=0;u!==n;++u){let m=t[h+u];if(m!==t[p+u]||m!==t[d+u]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,p=a*n;for(let d=0;d!==n;++d)t[p+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,ah(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function yp(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}_i.prototype.ValueTypeName="",_i.prototype.TimeBufferType=Float32Array,_i.prototype.ValueBufferType=Float32Array,_i.prototype.DefaultInterpolation=2301;var Cr=class extends _i{constructor(e,t,n){super(e,t,n)}};Cr.prototype.ValueTypeName="bool",Cr.prototype.ValueBufferType=Array,Cr.prototype.DefaultInterpolation=2300,Cr.prototype.InterpolantFactoryMethodLinear=void 0,Cr.prototype.InterpolantFactoryMethodSmooth=void 0;var El=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}};El.prototype.ValueTypeName="color";var wl=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}};wl.prototype.ValueTypeName="number";var Al=class extends Or{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(r-t),l=e*o;for(let h=l+o;l!==h;l+=4)Mi.slerpFlat(s,0,a,l-o,a,l,c);return s}},Ba=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Al(this.times,this.values,this.getValueSize(),e)}};Ba.prototype.ValueTypeName="quaternion",Ba.prototype.InterpolantFactoryMethodSmooth=void 0;var Ir=class extends _i{constructor(e,t,n){super(e,t,n)}};Ir.prototype.ValueTypeName="string",Ir.prototype.ValueBufferType=Array,Ir.prototype.DefaultInterpolation=2300,Ir.prototype.InterpolantFactoryMethodLinear=void 0,Ir.prototype.InterpolantFactoryMethodSmooth=void 0;var Rl=class extends _i{constructor(e,t,n,r){super(e,t,n,r)}};Rl.prototype.ValueTypeName="vector";var Cl=class{constructor(e,t,n){let r=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){c++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,c),o===c&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,p){return l.push(h,p),this},this.removeHandler=function(h){let p=l.indexOf(h);return p!==-1&&l.splice(p,2),this},this.getHandler=function(h){for(let p=0,d=l.length;p<d;p+=2){let u=l[p],m=l[p+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},bf=new Cl,Il=class{constructor(e){this.manager=e!==void 0?e:bf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Il.DEFAULT_MATERIAL_NAME="__DEFAULT";var FS=new pt,BS=new P,zS=new P;var Fo=new P,Bo=new Mi,ki=new P,Hs=class extends ii{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fo,Bo,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fo,Bo,ki.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Fo,Bo,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fo,Bo,ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Rr=new P,Sp=new me,Mp=new me,Yn=class extends Hs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Vo*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*zo*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Vo*Math.atan(Math.tan(.5*zo*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Rr.x,Rr.y).multiplyScalar(-e/Rr.z),Rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rr.x,Rr.y).multiplyScalar(-e/Rr.z)}getViewSize(e,t){return this.getViewBounds(e,Sp,Mp),t.subVectors(Mp,Sp)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*zo*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var za=class extends Hs{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var VS=new pt,kS=new pt,GS=new pt;var Pl=class extends ii{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Yn(-90,1,e,t);r.layers=this.layers,this.add(r);let s=new Yn(-90,1,e,t);s.layers=this.layers,this.add(s);let a=new Yn(-90,1,e,t);a.layers=this.layers,this.add(a);let o=new Yn(-90,1,e,t);o.layers=this.layers,this.add(o);let c=new Yn(-90,1,e,t);c.layers=this.layers,this.add(c);let l=new Yn(-90,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==2001)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;v=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=f,e.setRenderTarget(n,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,d,u),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Ll=class extends Yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Va=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=R0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function R0(){this._document.hidden===!1&&this.reset()}var HS=new P,WS=new Mi,XS=new P,qS=new P,jS=new P;var YS=new P,$S=new Mi,ZS=new P,JS=new P;var C0=new RegExp("[\\[\\]\\.:\\/]","g"),yu="[^\\[\\]\\.:\\/]",I0="[^"+"\\[\\]\\.:\\/".replace("\\.","")+"]",P0=/((?:WC+[\/:])*)/.source.replace("WC",yu),L0=/(WCOD+)?/.source.replace("WCOD",I0),N0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yu),D0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yu),U0=new RegExp("^"+P0+L0+N0+D0+"$"),O0=["material","materials","bones","map"],dh=class{constructor(e,t,n){let r=n||un.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},un=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(C0,"")}static parseTrackName(e){let t=U0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);O0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void Ye("PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void Qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void Qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void Qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void Qe("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void Qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[r];if(a===void 0)return void Qe("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+r+" but it wasn't found.",e);let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};un.Composite=dh,un.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},un.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},un.prototype.GetterByBindingType=[un.prototype._getValue_direct,un.prototype._getValue_array,un.prototype._getValue_arrayElement,un.prototype._getValue_toArray],un.prototype.SetterByBindingTypeAndVersioning=[[un.prototype._setValue_direct,un.prototype._setValue_direct_setNeedsUpdate,un.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[un.prototype._setValue_array,un.prototype._setValue_array_setNeedsUpdate,un.prototype._setValue_array_setMatrixWorldNeedsUpdate],[un.prototype._setValue_arrayElement,un.prototype._setValue_arrayElement_setNeedsUpdate,un.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[un.prototype._setValue_fromArray,un.prototype._setValue_fromArray_setNeedsUpdate,un.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var KS=new Float32Array(1);var QS=new pt;var wu=class wu{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};wu.prototype.isMatrix2=!0;var ph=wu,eM=new me;var tM=new P,nM=new P,iM=new P,rM=new P,sM=new P,aM=new P,oM=new P;var lM=new P;var cM=new P,hM=new pt,uM=new pt;var dM=new P,pM=new ht,fM=new ht;var mM=new P,gM=new P,_M=new P;var vM=new P,xM=new Hs;var yM=new Li;var SM=new P;function Su(i,e,t,n){let r=F0(n);switch(t){case 1021:return i*e;case 1028:case 1029:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case 1023:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:case 37496:case 37490:case 37491:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function F0(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}})),typeof window<"u"&&(window.__THREE__?Ye("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Xf(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function z0(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=i.createBuffer(),p;if(i.bindBuffer(a,h),i.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)p=i.HALF_FLOAT;else if(o instanceof Uint16Array)p=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)p=i.SHORT;else if(o instanceof Uint32Array)p=i.UNSIGNED_INT;else if(o instanceof Int32Array)p=i.INT;else if(o instanceof Int8Array)p=i.BYTE;else if(o instanceof Uint8Array)p=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);p=i.UNSIGNED_BYTE}return{buffer:h,type:p,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(i.bindBuffer(o,s),l.length===0)i.bufferSubData(o,0,c);else{l.sort((p,d)=>p.start-d.start);let h=0;for(let p=1;p<l.length;p++){let d=l[h],u=l[p];u.start<=d.start+d.count+1?d.count=Math.max(d.count,u.start+u.count-d.start):(++h,l[h]=u)}l.length=h+1;for(let p=0,d=l.length;p<d;p++){let u=l[p];i.bufferSubData(o,u.start*c.BYTES_PER_ELEMENT,c,u.start,u.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var V0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,k0=`#ifdef USE_ALPHAHASH
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
#endif`,G0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,H0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,W0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,X0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,q0=`#ifdef USE_AOMAP
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
#endif`,j0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Y0=`#ifdef USE_BATCHING
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
#endif`,$0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Z0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,J0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,K0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Q0=`#ifdef USE_IRIDESCENCE
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
#endif`,e_=`#ifdef USE_BUMPMAP
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
#endif`,t_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,n_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,i_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,r_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,s_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,a_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,o_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,l_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,c_=`#define PI 3.141592653589793
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
} // validated`,h_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,u_=`vec3 transformedNormal = objectNormal;
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
#endif`,d_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,p_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,f_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,m_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,g_="gl_FragColor = linearToOutputTexel( gl_FragColor );",__=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,v_=`#ifdef USE_ENVMAP
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
#endif`,x_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,y_=`#ifdef USE_ENVMAP
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
#endif`,S_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,M_=`#ifdef USE_ENVMAP
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
#endif`,b_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,T_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,E_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,A_=`#ifdef USE_GRADIENTMAP
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
}`,R_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,C_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,I_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,P_=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,L_=`#ifdef USE_ENVMAP
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
#endif`,N_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,D_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,U_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,O_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,F_=`PhysicalMaterial material;
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
#endif`,B_=`uniform sampler2D dfgLUT;
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
}`,z_=`
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
#endif`,V_=`#if defined( RE_IndirectDiffuse )
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
#endif`,k_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,G_=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,H_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,W_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,q_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,j_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Y_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Z_=`#if defined( USE_POINTS_UV )
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
#endif`,J_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,K_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Q_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ev=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nv=`#ifdef USE_MORPHTARGETS
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
#endif`,iv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,sv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,av=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ov=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,cv=`#ifdef USE_NORMALMAP
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
#endif`,hv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_v=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ev=`float getShadowMask() {
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
}`,wv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Av=`#ifdef USE_SKINNING
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
#endif`,Rv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cv=`#ifdef USE_SKINNING
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
#endif`,Iv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dv=`#ifdef USE_TRANSMISSION
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
#endif`,Uv=`#ifdef USE_TRANSMISSION
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
#endif`,Ov=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kv=`uniform sampler2D t2D;
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
}`,Gv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qv=`#include <common>
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
}`,jv=`#if DEPTH_PACKING == 3200
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
}`,Yv=`#define DISTANCE
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
}`,$v=`#define DISTANCE
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
}`,Zv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kv=`uniform float scale;
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
}`,Qv=`uniform vec3 diffuse;
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
}`,ex=`#include <common>
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
}`,tx=`uniform vec3 diffuse;
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
}`,nx=`#define LAMBERT
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
}`,ix=`#define LAMBERT
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
}`,rx=`#define MATCAP
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
}`,sx=`#define MATCAP
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
}`,ax=`#define NORMAL
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
}`,ox=`#define NORMAL
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
}`,lx=`#define PHONG
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
}`,cx=`#define PHONG
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
}`,hx=`#define STANDARD
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
}`,ux=`#define STANDARD
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
}`,dx=`#define TOON
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
}`,px=`#define TOON
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
}`,fx=`uniform float size;
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
}`,mx=`uniform vec3 diffuse;
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
}`,gx=`#include <common>
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
}`,_x=`uniform vec3 color;
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
}`,vx=`uniform float rotation;
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
}`,xx=`uniform vec3 diffuse;
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
}`,mt={alphahash_fragment:V0,alphahash_pars_fragment:k0,alphamap_fragment:G0,alphamap_pars_fragment:H0,alphatest_fragment:W0,alphatest_pars_fragment:X0,aomap_fragment:q0,aomap_pars_fragment:j0,batching_pars_vertex:Y0,batching_vertex:$0,begin_vertex:Z0,beginnormal_vertex:J0,bsdfs:K0,iridescence_fragment:Q0,bumpmap_pars_fragment:e_,clipping_planes_fragment:t_,clipping_planes_pars_fragment:n_,clipping_planes_pars_vertex:i_,clipping_planes_vertex:r_,color_fragment:s_,color_pars_fragment:a_,color_pars_vertex:o_,color_vertex:l_,common:c_,cube_uv_reflection_fragment:h_,defaultnormal_vertex:u_,displacementmap_pars_vertex:d_,displacementmap_vertex:p_,emissivemap_fragment:f_,emissivemap_pars_fragment:m_,colorspace_fragment:g_,colorspace_pars_fragment:__,envmap_fragment:v_,envmap_common_pars_fragment:x_,envmap_pars_fragment:y_,envmap_pars_vertex:S_,envmap_physical_pars_fragment:L_,envmap_vertex:M_,fog_vertex:b_,fog_pars_vertex:T_,fog_fragment:E_,fog_pars_fragment:w_,gradientmap_pars_fragment:A_,lightmap_pars_fragment:R_,lights_lambert_fragment:C_,lights_lambert_pars_fragment:I_,lights_pars_begin:P_,lights_toon_fragment:N_,lights_toon_pars_fragment:D_,lights_phong_fragment:U_,lights_phong_pars_fragment:O_,lights_physical_fragment:F_,lights_physical_pars_fragment:B_,lights_fragment_begin:z_,lights_fragment_maps:V_,lights_fragment_end:k_,lightprobes_pars_fragment:G_,logdepthbuf_fragment:H_,logdepthbuf_pars_fragment:W_,logdepthbuf_pars_vertex:X_,logdepthbuf_vertex:q_,map_fragment:j_,map_pars_fragment:Y_,map_particle_fragment:$_,map_particle_pars_fragment:Z_,metalnessmap_fragment:J_,metalnessmap_pars_fragment:K_,morphinstance_vertex:Q_,morphcolor_vertex:ev,morphnormal_vertex:tv,morphtarget_pars_vertex:nv,morphtarget_vertex:iv,normal_fragment_begin:rv,normal_fragment_maps:sv,normal_pars_fragment:av,normal_pars_vertex:ov,normal_vertex:lv,normalmap_pars_fragment:cv,clearcoat_normal_fragment_begin:hv,clearcoat_normal_fragment_maps:uv,clearcoat_pars_fragment:dv,iridescence_pars_fragment:pv,opaque_fragment:fv,packing:mv,premultiplied_alpha_fragment:gv,project_vertex:_v,dithering_fragment:vv,dithering_pars_fragment:xv,roughnessmap_fragment:yv,roughnessmap_pars_fragment:Sv,shadowmap_pars_fragment:Mv,shadowmap_pars_vertex:bv,shadowmap_vertex:Tv,shadowmask_pars_fragment:Ev,skinbase_vertex:wv,skinning_pars_vertex:Av,skinning_vertex:Rv,skinnormal_vertex:Cv,specularmap_fragment:Iv,specularmap_pars_fragment:Pv,tonemapping_fragment:Lv,tonemapping_pars_fragment:Nv,transmission_fragment:Dv,transmission_pars_fragment:Uv,uv_pars_fragment:Ov,uv_pars_vertex:Fv,uv_vertex:Bv,worldpos_vertex:zv,background_vert:Vv,background_frag:kv,backgroundCube_vert:Gv,backgroundCube_frag:Hv,cube_vert:Wv,cube_frag:Xv,depth_vert:qv,depth_frag:jv,distance_vert:Yv,distance_frag:$v,equirect_vert:Zv,equirect_frag:Jv,linedashed_vert:Kv,linedashed_frag:Qv,meshbasic_vert:ex,meshbasic_frag:tx,meshlambert_vert:nx,meshlambert_frag:ix,meshmatcap_vert:rx,meshmatcap_frag:sx,meshnormal_vert:ax,meshnormal_frag:ox,meshphong_vert:lx,meshphong_frag:cx,meshphysical_vert:hx,meshphysical_frag:ux,meshtoon_vert:dx,meshtoon_frag:px,points_vert:fx,points_frag:mx,shadow_vert:gx,shadow_frag:_x,sprite_vert:vx,sprite_frag:xx},we={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Qi={basic:{uniforms:Kn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:Kn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new ht(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:Kn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:Kn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:Kn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new ht(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:Kn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:Kn([we.points,we.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:Kn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:Kn([we.common,we.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:Kn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:Kn([we.sprite,we.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:Kn([we.common,we.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:Kn([we.lights,we.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};Qi.physical={uniforms:Kn([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};var Zl={r:0,b:0,g:0},yx=new pt,qf=new st;function Sx(i,e,t,n,r,s){let a=new ht(0),o,c,l=r===!0?0:1,h=null,p=0,d=null;function u(f){let v=f.isScene===!0?f.background:null;if(v&&v.isTexture){let g=f.backgroundBlurriness>0;v=e.get(v,g)}return v}function m(f,v){f.getRGB(Zl,xu(i)),t.buffers.color.setClear(Zl.r,Zl.g,Zl.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(f,v=1){a.set(f),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,m(a,l)},render:function(f){let v=!1,g=u(f);g===null?m(a,l):g&&g.isColor&&(m(g,1),v=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,s):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,v){let g=u(v);g&&(g.isCubeTexture||g.mapping===Ga)?(c===void 0&&(c=new $n(new Qr(1,1,1),new En({name:"BackgroundCubeMaterial",uniforms:os(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=g,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(yx.makeRotationFromEuler(v.backgroundRotation)).transpose(),g.isCubeTexture&&g.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qf),c.material.toneMapped=Ct.getTransfer(g.colorSpace)!==tn,h===g&&p===g.version&&d===i.toneMapping||(c.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null)):g&&g.isTexture&&(o===void 0&&(o=new $n(new ks(2,2),new En({name:"BackgroundMaterial",uniforms:os(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:Xs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=g,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=Ct.getTransfer(g.colorSpace)!==tn,g.matrixAutoUpdate===!0&&g.updateMatrix(),o.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&p===g.version&&d===i.toneMapping||(o.material.needsUpdate=!0,h=g,p=g.version,d=i.toneMapping),o.layers.enableAll(),f.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function Mx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=l(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function c(g){return i.deleteVertexArray(g)}function l(g){let _=[],b=[],T=[];for(let S=0;S<t;S++)_[S]=0,b[S]=0,T[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:b,attributeDivisors:T,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,b=g.length;_<b;_++)g[_]=0}function p(g){d(g,0)}function d(g,_){let b=s.newAttributes,T=s.enabledAttributes,S=s.attributeDivisors;b[g]=1,T[g]===0&&(i.enableVertexAttribArray(g),T[g]=1),S[g]!==_&&(i.vertexAttribDivisor(g,_),S[g]=_)}function u(){let g=s.newAttributes,_=s.enabledAttributes;for(let b=0,T=_.length;b<T;b++)_[b]!==g[b]&&(i.disableVertexAttribArray(b),_[b]=0)}function m(g,_,b,T,S,M,I){I===!0?i.vertexAttribIPointer(g,_,b,S,M):i.vertexAttribPointer(g,_,b,T,S,M)}function f(){v(),a=!0,s!==r&&(s=r,o(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,b,T,S){let M=!1,I=(function(O,k,U,X){let V=X.wireframe===!0,Z=n[k.id];Z===void 0&&(Z={},n[k.id]=Z);let se=O.isInstancedMesh===!0?O.id:0,ee=Z[se];ee===void 0&&(ee={},Z[se]=ee);let re=ee[U.id];re===void 0&&(re={},ee[U.id]=re);let N=re[V];return N===void 0&&(N=l(i.createVertexArray()),re[V]=N),N})(g,T,b,_);s!==I&&(s=I,o(s.object)),M=(function(O,k,U,X){let V=s.attributes,Z=k.attributes,se=0,ee=U.getAttributes();for(let re in ee)if(ee[re].location>=0){let N=V[re],$=Z[re];if($===void 0&&(re==="instanceMatrix"&&O.instanceMatrix&&($=O.instanceMatrix),re==="instanceColor"&&O.instanceColor&&($=O.instanceColor)),N===void 0||N.attribute!==$||$&&N.data!==$.data)return!0;se++}return s.attributesNum!==se||s.index!==X})(g,T,b,S),M&&(function(O,k,U,X){let V={},Z=k.attributes,se=0,ee=U.getAttributes();for(let re in ee)if(ee[re].location>=0){let N=Z[re];N===void 0&&(re==="instanceMatrix"&&O.instanceMatrix&&(N=O.instanceMatrix),re==="instanceColor"&&O.instanceColor&&(N=O.instanceColor));let $={};$.attribute=N,N&&N.data&&($.data=N.data),V[re]=$,se++}s.attributes=V,s.attributesNum=se,s.index=X})(g,T,b,S),S!==null&&e.update(S,i.ELEMENT_ARRAY_BUFFER),(M||a)&&(a=!1,(function(O,k,U,X){h();let V=X.attributes,Z=U.getAttributes(),se=k.defaultAttributeValues;for(let ee in Z){let re=Z[ee];if(re.location>=0){let N=V[ee];if(N===void 0&&(ee==="instanceMatrix"&&O.instanceMatrix&&(N=O.instanceMatrix),ee==="instanceColor"&&O.instanceColor&&(N=O.instanceColor)),N!==void 0){let $=N.normalized,he=N.itemSize,le=e.get(N);if(le===void 0)continue;let te=le.buffer,ge=le.type,ue=le.bytesPerElement,oe=ge===i.INT||ge===i.UNSIGNED_INT||N.gpuType===Ph;if(N.isInterleavedBufferAttribute){let ie=N.data,ve=ie.stride,_e=N.offset;if(ie.isInstancedInterleavedBuffer){for(let Me=0;Me<re.locationSize;Me++)d(re.location+Me,ie.meshPerAttribute);O.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Me=0;Me<re.locationSize;Me++)p(re.location+Me);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Me=0;Me<re.locationSize;Me++)m(re.location+Me,he/re.locationSize,ge,$,ve*ue,(_e+he/re.locationSize*Me)*ue,oe)}else{if(N.isInstancedBufferAttribute){for(let ie=0;ie<re.locationSize;ie++)d(re.location+ie,N.meshPerAttribute);O.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let ie=0;ie<re.locationSize;ie++)p(re.location+ie);i.bindBuffer(i.ARRAY_BUFFER,te);for(let ie=0;ie<re.locationSize;ie++)m(re.location+ie,he/re.locationSize,ge,$,he*ue,he/re.locationSize*ie*ue,oe)}}else if(se!==void 0){let $=se[ee];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(re.location,$);break;case 3:i.vertexAttrib3fv(re.location,$);break;case 4:i.vertexAttrib4fv(re.location,$);break;default:i.vertexAttrib1fv(re.location,$)}}}}u()})(g,_,b,T),S!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(S).buffer))},reset:f,resetDefaultState:v,dispose:function(){f();for(let g in n){let _=n[g];for(let b in _){let T=_[b];for(let S in T){let M=T[S];for(let I in M)c(M[I].object),delete M[I];delete T[S]}}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let b in _){let T=_[b];for(let S in T){let M=T[S];for(let I in M)c(M[I].object),delete M[I];delete T[S]}}delete n[g.id]},releaseStatesOfObject:function(g){for(let _ in n){let b=n[_],T=g.isInstancedMesh===!0?g.id:0,S=b[T];if(S!==void 0){for(let M in S){let I=S[M];for(let O in I)c(I[O].object),delete I[O];delete S[M]}delete b[T],Object.keys(b).length===0&&delete n[_]}}},releaseStatesOfProgram:function(g){for(let _ in n){let b=n[_];for(let T in b){let S=b[T];if(S[g.id]===void 0)continue;let M=S[g.id];for(let I in M)c(M[I].object),delete M[I];delete S[g.id]}}},initAttributes:h,enableAttribute:p,disableUnusedAttributes:u}}function bx(i,e,t){let n;this.setMode=function(r){n=r},this.render=function(r,s){i.drawArrays(n,r,s),t.update(s,n,1)},this.renderInstances=function(r,s,a){a!==0&&(i.drawArraysInstanced(n,r,s,a),t.update(s,n,a))},this.renderMultiDraw=function(r,s,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,s,0,a);let o=0;for(let c=0;c<a;c++)o+=s[c];t.update(o,n,1)}}function Tx(i,e,t,n){let r;function s(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(Ye("WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&l===!1&&Ye("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let h=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(h){return h===Ji||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let p=h===Zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==Oi&&h!==Ti&&!p&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:i.getParameter(i.MAX_SAMPLES),samples:i.getParameter(i.SAMPLES)}}function Ex(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Pi,o=new st,c={value:null,needsUpdate:!1};function l(h,p,d,u){let m=h!==null?h.length:0,f=null;if(m!==0){if(f=c.value,u!==!0||f===null){let v=d+4*m,g=p.matrixWorldInverse;o.getNormalMatrix(g),(f===null||f.length<v)&&(f=new Float32Array(v));for(let _=0,b=d;_!==m;++_,b+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(f,b),f[b+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let d=h.length!==0||p||n!==0||r;return r=p,n=h.length,d},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=l(h,p,0)},this.setState=function(h,p,d){let u=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,v=i.get(h);if(!r||u===null||u.length===0||s&&!f)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,b=v.clippingState||null;c.value=b,b=l(u,p,_,d);for(let T=0;T!==_;++T)b[T]=t[T];v.clippingState=b,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}qf.set(-1,0,0,0,1,0,0,0,1);var qa=new za,Tf=new ht,Au=null,Ru=0,Cu=0,Iu=!1,wx=new P,ls=new P,Kl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=wx}=s;Au=this._renderer.getRenderTarget(),Ru=this._renderer.getActiveCubeFace(),Cu=this._renderer.getActiveMipmapLevel(),Iu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Af(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Au,Ru,Cu),this._renderer.xr.enabled=Iu,e.scissorTest=!1,$s(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===js||e.mapping===ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Au=this._renderer.getRenderTarget(),Ru=this._renderer.getActiveCubeFace(),Cu=this._renderer.getActiveMipmapLevel(),Iu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jn,minFilter:Jn,generateMipmaps:!1,type:Zi,format:Ji,colorSpace:ql,depthBuffer:!1},r=Ef(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ef(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ax(s)),this._blurMaterial=Cx(s,e,t),this._ggxMaterial=Rx(s,e,t)}return r}_compileMaterial(e){let t=new $n(new bt,e);this._renderer.compile(t,qa)}_sceneToCubeUV(e,t,n,r,s){let a=new Yn(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,p=l.toneMapping;l.getClearColor(Tf),l.toneMapping=Di,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(r),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $n(new Qr,new ba({name:"PMREM.Background",side:Zn,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,m=!1,f=e.background;f?f.isColor&&(u.color.copy(f),e.background=null,m=!0):(u.color.copy(Tf),m=!0);for(let v=0;v<6;v++){let g=v%3;g===0?(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[v],s.y,s.z)):g===1?(a.up.set(0,0,o[v]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[v],s.z)):(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[v]));let _=this._cubeSize;$s(r,g*_,v>2?_:0,_,_),l.setRenderTarget(r),m&&l.render(d,a),l.render(e,a)}l.toneMapping=p,l.autoClear=h,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===js||e.mapping===ts;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Af()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wf());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s,s.uniforms.envMap.value=e;let o=this._cubeSize;$s(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,qa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-h*h)*(1.25*l),{_lodMax:d}=this,u=this._sizeLods[n],m=3*u*(n>d-4?n-d+4:0),f=4*(this._cubeSize-u);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=d-t,$s(s,m,f,3*u,2*u),r.setRenderTarget(s),r.render(o,qa),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=d-n,$s(e,m,f,3*u,2*u),r.setRenderTarget(e),r.render(o,qa)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[r];$s(t,3*h*(r>this._lodMax-4?r-this._lodMax+4:0),4*(this._cubeSize-h),3*h,2*h),a.setRenderTarget(t),a.render(c,qa)}};function Ax(i){let e=[],t=[],n=i,r=i-4+1+6;for(let s=0;s<r;s++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],p=6,d=6,u=3,m=new Float32Array(u*d*p),f=new Float32Array(u*d*p);for(let g=0;g<p;g++){let _=g%3*2/3-1,b=g>2?0:-1,T=[_,b,0,_+2/3,b,0,_+2/3,b+1,0,_,b,0,_+2/3,b+1,0,_,b+1,0];m.set(T,u*d*g);for(let S=0;S<d;S++){let M=2*h[2*S]-1,I=2*h[2*S+1]-1;g===0?ls.set(1,I,M):g===1?ls.set(-M,1,-I):g===2?ls.set(-M,I,1):g===3?ls.set(-1,I,-M):g===4?ls.set(-M,-1,I):ls.set(M,I,-1),ls.toArray(f,(g*d+S)*u)}}let v=new bt;v.setAttribute("position",new Pt(m,u)),v.setAttribute("outputDirection",new Pt(f,u)),t.push(new $n(v,null)),n>4&&n--}return{lodMeshes:t,sizeLods:e}}function Ef(i,e,t){let n=new ci(i,e,t);return n.texture.mapping=Ga,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $s(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Rx(i,e,t){return new En({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:tc(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Cx(i,e,t){return new En({name:"SphericalGaussianBlur",defines:{SAMPLES:20,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:tc(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function wf(){return new En({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tc(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Af(){return new En({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function tc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ql=class extends ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ta(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Qr(5,5,5),s=new En({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Zn,blending:$i});s.uniforms.tEquirect.value=t;let a=new $n(r,s),o=t.minFilter;return t.minFilter===ns&&(t.minFilter=Jn),new Pl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function Ix(i){let e=new WeakMap,t=new WeakMap,n=null;function r(o,c){return c===Ul?o.mapping=js:c===Ol&&(o.mapping=ts),o}function s(o){let c=o.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(o){let c=o.target;c.removeEventListener("dispose",a);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}return{get:function(o,c=!1){return o==null?null:c?(function(l){if(l&&l.isTexture){let h=l.mapping,p=h===Ul||h===Ol,d=h===js||h===ts;if(p||d){let u=t.get(l),m=u!==void 0?u.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return n===null&&(n=new Kl(i)),u=p?n.fromEquirectangular(l,u):n.fromCubemap(l,u),u.texture.pmremVersion=l.pmremVersion,t.set(l,u),u.texture;if(u!==void 0)return u.texture;{let f=l.image;return p&&f&&f.height>0||d&&f&&(function(v){let g=0,_=6;for(let b=0;b<_;b++)v[b]!==void 0&&g++;return g===_})(f)?(n===null&&(n=new Kl(i)),u=p?n.fromEquirectangular(l):n.fromCubemap(l),u.texture.pmremVersion=l.pmremVersion,t.set(l,u),l.addEventListener("dispose",a),u.texture):null}}}return l})(o):(function(l){if(l&&l.isTexture){let h=l.mapping;if(h===Ul||h===Ol){if(e.has(l))return r(e.get(l).texture,l.mapping);{let p=l.image;if(p&&p.height>0){let d=new Ql(p.height);return d.fromEquirectangularTexture(i,l),e.set(l,d),l.addEventListener("dispose",s),r(d.texture,l.mapping)}return null}}}return l})(o)},dispose:function(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function Px(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Yr("WebGLRenderer: "+n+" extension not supported."),r}}}function Lx(i,e,t,n){let r={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let p in l.attributes)e.remove(l.attributes[p]);l.removeEventListener("dispose",a),delete r[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,p=c.attributes.position,d=0;if(p===void 0)return;if(h!==null){let f=h.array;d=h.version;for(let v=0,g=f.length;v<g;v+=3){let _=f[v+0],b=f[v+1],T=f[v+2];l.push(_,b,b,T,T,_)}}else{let f=p.array;d=p.version;for(let v=0,g=f.length/3-1;v<g;v+=3){let _=v+0,b=v+1,T=v+2;l.push(_,b,b,T,T,_)}}let u=new(p.count>=65535?ya:xa)(l,1);u.version=d;let m=s.get(c);m&&e.remove(m),s.set(c,u)}return{get:function(c,l){return r[l.id]===!0||(l.addEventListener("dispose",a),r[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function Nx(i,e,t){let n,r,s;this.setMode=function(a){n=a},this.setIndex=function(a){r=a.type,s=a.bytesPerElement},this.render=function(a,o){i.drawElements(n,o,r,a*s),t.update(o,n,1)},this.renderInstances=function(a,o,c){c!==0&&(i.drawElementsInstanced(n,o,r,a*s,c),t.update(o,n,c))},this.renderMultiDraw=function(a,o,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,o,0,r,a,0,c);let l=0;for(let h=0;h<c;h++)l+=o[h];t.update(l,n,1)}}function Dx(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:Qe("WebGLInfo: Unknown draw mode:",n)}}}}function Ux(i,e,t){let n=new WeakMap,r=new en;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,p=n.get(a);if(p===void 0||p.count!==h){p!==void 0&&p.texture.dispose();let d=a.morphAttributes.position!==void 0,u=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),u===!0&&(_=2),m===!0&&(_=3);let b=a.attributes.position.count*_,T=1;b>e.maxTextureSize&&(T=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let S=new Float32Array(b*T*4*h),M=new ga(S,b,T,h);M.type=Ti,M.needsUpdate=!0;let I=4*_;for(let O=0;O<h;O++){let k=f[O],U=v[O],X=g[O],V=b*T*4*O;for(let Z=0;Z<k.count;Z++){let se=Z*I;d===!0&&(r.fromBufferAttribute(k,Z),S[V+se+0]=r.x,S[V+se+1]=r.y,S[V+se+2]=r.z,S[V+se+3]=0),u===!0&&(r.fromBufferAttribute(U,Z),S[V+se+4]=r.x,S[V+se+5]=r.y,S[V+se+6]=r.z,S[V+se+7]=0),m===!0&&(r.fromBufferAttribute(X,Z),S[V+se+8]=r.x,S[V+se+9]=r.y,S[V+se+10]=r.z,S[V+se+11]=X.itemSize===4?r.w:1)}}p={count:h,texture:M,size:new me(b,T)},n.set(a,p),a.addEventListener("dispose",function O(){M.dispose(),n.delete(a),a.removeEventListener("dispose",O)})}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let d=0;for(let m=0;m<c.length;m++)d+=c[m];let u=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",u),o.getUniforms().setValue(i,"morphTargetInfluences",c)}o.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}}}function Ox(i,e,t,n,r){let s=new WeakMap;function a(o){let c=o.target;c.removeEventListener("dispose",a),n.releaseStatesOfObject(c),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:function(o){let c=r.render.frame,l=o.geometry,h=e.get(o,l);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==c&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,c))),o.isSkinnedMesh){let p=o.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return h},dispose:function(){s=new WeakMap}}}var Fx={[Th]:"LINEAR_TONE_MAPPING",[Eh]:"REINHARD_TONE_MAPPING",[wh]:"CINEON_TONE_MAPPING",[Ah]:"ACES_FILMIC_TONE_MAPPING",[Ch]:"AGX_TONE_MAPPING",[Ih]:"NEUTRAL_TONE_MAPPING",[Rh]:"CUSTOM_TONE_MAPPING"};function Bx(i,e,t,n,r,s){let a=new ci(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new bt;l.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new je([0,2,0,0,2,0],2));let h=new vl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new $n(l,h),d=new za(-1,1,1,-1,0,1),u,m=null,f=null,v=!1,g=null,_=[],b=!1;this.setSize=function(T,S){a.setSize(T,S),o!==null&&o.setSize(T,S),c!==null&&c.setSize(T,S);for(let M=0;M<_.length;M++){let I=_[M];I.setSize&&I.setSize(T,S)}},this.setEffects=function(T){_=T,b=_.length>0&&_[0].isRenderPass===!0;let S=a.width,M=a.height;_.length>0&&o===null&&(o=new ci(S,M,{type:Zi,depthBuffer:!1,stencilBuffer:!1}),c=new ci(S,M,{type:Zi,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<_.length;I++){let O=_[I];O.setSize&&O.setSize(S,M)}},this.begin=function(T,S){if(v||T.toneMapping===Di&&_.length===0)return!1;if(g=S,S!==null){let M=S.width,I=S.height;a.width===M&&a.height===I||this.setSize(M,I)}return b===!1&&T.setRenderTarget(a),u=T.toneMapping,T.toneMapping=Di,!0},this.hasRenderPass=function(){return b},this.end=function(T,S){T.toneMapping=u,v=!0;let M=a,I=o;for(let O=0;O<_.length;O++){let k=_[O];k.enabled!==!1&&(k.render(T,I,M,S),k.needsSwap!==!1&&(M=I,I=I===o?c:o))}if(m!==T.outputColorSpace||f!==T.toneMapping){m=T.outputColorSpace,f=T.toneMapping,h.defines={},Ct.getTransfer(m)===tn&&(h.defines.SRGB_TRANSFER="");let O=Fx[f];O&&(h.defines[O]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,T.setRenderTarget(g),T.render(p,d),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var jf=new ni,Nu=new Dr(1,1),Yf=new ga,$f=new Ho,Zf=new Ta,Rf=[],Cf=[],If=new Float32Array(16),Pf=new Float32Array(9),Lf=new Float32Array(4);function Js(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=Rf[r];if(s===void 0&&(s=new Float32Array(r),Rf[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Pn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ln(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function nc(i,e){let t=Cf[e];t===void 0&&(t=new Int32Array(e),Cf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function zx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Vx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2fv(this.addr,e),Ln(t,e)}}function kx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pn(t,e))return;i.uniform3fv(this.addr,e),Ln(t,e)}}function Gx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4fv(this.addr,e),Ln(t,e)}}function Hx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ln(t,e)}else{if(Pn(t,n))return;Lf.set(n),i.uniformMatrix2fv(this.addr,!1,Lf),Ln(t,n)}}function Wx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ln(t,e)}else{if(Pn(t,n))return;Pf.set(n),i.uniformMatrix3fv(this.addr,!1,Pf),Ln(t,n)}}function Xx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ln(t,e)}else{if(Pn(t,n))return;If.set(n),i.uniformMatrix4fv(this.addr,!1,If),Ln(t,n)}}function qx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function jx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2iv(this.addr,e),Ln(t,e)}}function Yx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;i.uniform3iv(this.addr,e),Ln(t,e)}}function $x(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4iv(this.addr,e),Ln(t,e)}}function Zx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Jx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2uiv(this.addr,e),Ln(t,e)}}function Kx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;i.uniform3uiv(this.addr,e),Ln(t,e)}}function Qx(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4uiv(this.addr,e),Ln(t,e)}}function ey(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(Nu.compareFunction=t.isReversedDepthBuffer()?Yl:jl,s=Nu):s=jf,t.setTexture2D(e||s,r)}function ty(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||$f,r)}function ny(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Zf,r)}function iy(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Yf,r)}function ry(i){switch(i){case 5126:return zx;case 35664:return Vx;case 35665:return kx;case 35666:return Gx;case 35674:return Hx;case 35675:return Wx;case 35676:return Xx;case 5124:case 35670:return qx;case 35667:case 35671:return jx;case 35668:case 35672:return Yx;case 35669:case 35673:return $x;case 5125:return Zx;case 36294:return Jx;case 36295:return Kx;case 36296:return Qx;case 35678:case 36198:case 36298:case 36306:case 35682:return ey;case 35679:case 36299:case 36307:return ty;case 35680:case 36300:case 36308:case 36293:return ny;case 36289:case 36303:case 36311:case 36292:return iy}}function sy(i,e){i.uniform1fv(this.addr,e)}function ay(i,e){let t=Js(e,this.size,2);i.uniform2fv(this.addr,t)}function oy(i,e){let t=Js(e,this.size,3);i.uniform3fv(this.addr,t)}function ly(i,e){let t=Js(e,this.size,4);i.uniform4fv(this.addr,t)}function cy(i,e){let t=Js(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function hy(i,e){let t=Js(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function uy(i,e){let t=Js(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function dy(i,e){i.uniform1iv(this.addr,e)}function py(i,e){i.uniform2iv(this.addr,e)}function fy(i,e){i.uniform3iv(this.addr,e)}function my(i,e){i.uniform4iv(this.addr,e)}function gy(i,e){i.uniform1uiv(this.addr,e)}function _y(i,e){i.uniform2uiv(this.addr,e)}function vy(i,e){i.uniform3uiv(this.addr,e)}function xy(i,e){i.uniform4uiv(this.addr,e)}function yy(i,e,t){let n=this.cache,r=e.length,s=nc(t,r),a;Pn(n,s)||(i.uniform1iv(this.addr,s),Ln(n,s)),a=this.type===i.SAMPLER_2D_SHADOW?Nu:jf;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Sy(i,e,t){let n=this.cache,r=e.length,s=nc(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),Ln(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||$f,s[a])}function My(i,e,t){let n=this.cache,r=e.length,s=nc(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),Ln(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Zf,s[a])}function by(i,e,t){let n=this.cache,r=e.length,s=nc(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),Ln(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Yf,s[a])}function Ty(i){switch(i){case 5126:return sy;case 35664:return ay;case 35665:return oy;case 35666:return ly;case 35674:return cy;case 35675:return hy;case 35676:return uy;case 5124:case 35670:return dy;case 35667:case 35671:return py;case 35668:case 35672:return fy;case 35669:case 35673:return my;case 5125:return gy;case 36294:return _y;case 36295:return vy;case 36296:return xy;case 35678:case 36198:case 36298:case 36306:case 35682:return yy;case 35679:case 36299:case 36307:return Sy;case 35680:case 36300:case 36308:case 36293:return My;case 36289:case 36303:case 36311:case 36292:return by}}var Du=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ry(t.type)}},Uu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ty(t.type)}},Ou=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},Pu=/(\w+)(\])?(\[|\.)?/g;function Nf(i,e){i.seq.push(e),i.map[e.id]=e}function Ey(i,e,t){let n=i.name,r=n.length;for(Pu.lastIndex=0;;){let s=Pu.exec(n),a=Pu.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===r){Nf(t,l===void 0?new Du(o,i,e):new Uu(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new Ou(o),Nf(t,h)),t=h}}}var Zs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a);Ey(o,e.getUniformLocation(t,o.name),this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function Df(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var wy=0;function Ay(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Uf=new st;function Ry(i){Ct._getMatrix(Uf,Ct.workingColorSpace,i);let e=`mat3( ${Uf.elements.map(t=>t.toFixed(4))} )`;switch(Ct.getTransfer(i)){case mu:return[e,"LinearTransferOETF"];case tn:return[e,"sRGBTransferOETF"];default:return Ye("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Of(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Ay(i.getShaderSource(e),a)}return r}function Cy(i,e){let t=Ry(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Iy={[Th]:"Linear",[Eh]:"Reinhard",[wh]:"Cineon",[Ah]:"ACESFilmic",[Ch]:"AgX",[Ih]:"Neutral",[Rh]:"Custom"};function Py(i,e){let t=Iy[e];return t===void 0?(Ye("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Jl=new P;function Ly(){return Ct.getLuminanceCoefficients(Jl),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Jl.x.toFixed(4)}, ${Jl.y.toFixed(4)}, ${Jl.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ny(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ya).join(`
`)}function Dy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Uy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ya(i){return i!==""}function Ff(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Oy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fu(i){return i.replace(Oy,By)}var Fy=new Map;function By(i,e){let t=mt[e];if(t===void 0){let n=Fy.get(e);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=mt[n],Ye('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Fu(t)}var zy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zf(i){return i.replace(zy,Vy)}function Vy(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Vf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var ky={[ka]:"SHADOWMAP_TYPE_PCF",[Ws]:"SHADOWMAP_TYPE_VSM"};function Gy(i){return ky[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Hy={[js]:"ENVMAP_TYPE_CUBE",[ts]:"ENVMAP_TYPE_CUBE",[Ga]:"ENVMAP_TYPE_CUBE_UV"};function Wy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Hy[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Xy={[ts]:"ENVMAP_MODE_REFRACTION"};function qy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Xy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var jy={[qp]:"ENVMAP_BLENDING_MULTIPLY",[jp]:"ENVMAP_BLENDING_MIX",[Yp]:"ENVMAP_BLENDING_ADD"};function Yy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":jy[i.combine]||"ENVMAP_BLENDING_NONE"}function $y(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Zy(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Gy(t),l=Wy(t),h=qy(t),p=Yy(t),d=$y(t),u=Ny(t),m=Dy(s),f=r.createProgram(),v,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ya).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ya).join(`
`),g.length>0&&(g+=`
`)):(v=[Vf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ya).join(`
`),g=[Vf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Di?"#define TONE_MAPPING":"",t.toneMapping!==Di?mt.tonemapping_pars_fragment:"",t.toneMapping!==Di?Py("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,Cy("linearToOutputTexel",t.outputColorSpace),Ly(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ya).join(`
`)),a=Fu(a),a=Ff(a,t),a=Bf(a,t),o=Fu(o),o=Ff(o,t),o=Bf(o,t),a=zf(a),o=zf(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===gu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let b=_+v+a,T=_+g+o,S=Df(r,r.VERTEX_SHADER,b),M=Df(r,r.FRAGMENT_SHADER,T);function I(X){if(i.debug.checkShaderErrors){let V=r.getProgramInfoLog(f)||"",Z=r.getShaderInfoLog(S)||"",se=r.getShaderInfoLog(M)||"",ee=V.trim(),re=Z.trim(),N=se.trim(),$=!0,he=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,f,S,M);else{let le=Of(r,S,"vertex"),te=Of(r,M,"fragment");Qe("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+X.name+`
Material Type: `+X.type+`

Program Info Log: `+ee+`
`+le+`
`+te)}else ee!==""?Ye("WebGLProgram: Program Info Log:",ee):re!==""&&N!==""||(he=!1);he&&(X.diagnostics={runnable:$,programLog:ee,vertexShader:{log:re,prefix:v},fragmentShader:{log:N,prefix:g}})}r.deleteShader(S),r.deleteShader(M),O=new Zs(r,f),k=Uy(r,f)}let O,k;r.attachShader(f,S),r.attachShader(f,M),t.index0AttributeName!==void 0?r.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f),this.getUniforms=function(){return O===void 0&&I(this),O},this.getAttributes=function(){return k===void 0&&I(this),k};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=r.getProgramParameter(f,37297)),U},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wy++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=S,this.fragmentShader=M,this}var Jy=0,Bu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new zu(e),t.set(e,n)),n}},zu=class{constructor(e){this.id=Jy++,this.code=e,this.usedTimes=0}};function Ky(i){return i===ss||i===Wl||i===Xl}function Qy(i,e,t,n,r,s){let a=new _a,o=new Bu,c=new Set,l=[],h=new Map,p=n.logarithmicDepthBuffer,d=n.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,g,_,b,T){let S=_.fog,M=b.geometry,I=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?_.environment:null,O=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,k=e.get(f.envMap||I,O),U=k&&k.mapping===Ga?k.image.height:null,X=u[f.type];f.precision!==null&&(d=n.getMaxPrecision(f.precision),d!==f.precision&&Ye("WebGLProgram.getParameters:",f.precision,"not supported, using",d,"instead."));let V=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,Z=V!==void 0?V.length:0,se,ee,re,N,$=0;if(M.morphAttributes.position!==void 0&&($=1),M.morphAttributes.normal!==void 0&&($=2),M.morphAttributes.color!==void 0&&($=3),X){let sn=Qi[X];se=sn.vertexShader,ee=sn.fragmentShader}else{se=f.vertexShader,ee=f.fragmentShader;let sn=o.getVertexShaderStage(f),hi=o.getFragmentShaderStage(f);o.update(f,sn,hi),re=sn.id,N=hi.id}let he=i.getRenderTarget(),le=i.state.buffers.depth.getReversed(),te=b.isInstancedMesh===!0,ge=b.isBatchedMesh===!0,ue=!!f.map,oe=!!f.matcap,ie=!!k,ve=!!f.aoMap,_e=!!f.lightMap,Me=!!f.bumpMap&&f.wireframe===!1,A=!!f.normalMap,w=!!f.displacementMap,C=!!f.emissiveMap,z=!!f.metalnessMap,y=!!f.roughnessMap,B=f.anisotropy>0,F=f.clearcoat>0,R=f.dispersion>0,q=f.retroreflectivity>0,Y=f.iridescence>0,J=f.sheen>0,de=f.transmission>0,Le=B&&!!f.anisotropyMap,Ne=F&&!!f.clearcoatMap,Se=F&&!!f.clearcoatNormalMap,ke=F&&!!f.clearcoatRoughnessMap,ce=Y&&!!f.iridescenceMap,fe=Y&&!!f.iridescenceThicknessMap,xe=J&&!!f.sheenColorMap,Ae=J&&!!f.sheenRoughnessMap,Wt=!!f.specularMap,ft=!!f.specularColorMap,Te=!!f.specularIntensityMap,at=de&&!!f.transmissionMap,De=de&&!!f.thicknessMap,St=!!f.gradientMap,$e=!!f.alphaMap,qt=f.alphaTest>0,Tt=!!f.alphaHash,Ft=!!f.extensions,jt=Di;f.toneMapped&&(he!==null&&he.isXRRenderTarget!==!0||(jt=i.toneMapping));let nn={shaderID:X,shaderType:f.type,shaderName:f.name,vertexShader:se,fragmentShader:ee,defines:f.defines,customVertexShaderID:re,customFragmentShaderID:N,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:d,batching:ge,batchingColor:ge&&b._colorsTexture!==null,instancing:te,instancingColor:te&&b.instanceColor!==null,instancingMorph:te&&b.morphTexture!==null,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Ct.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:ue,matcap:oe,envMap:ie,envMapMode:ie&&k.mapping,envMapCubeUVHeight:U,aoMap:ve,lightMap:_e,bumpMap:Me,normalMap:A,displacementMap:w,emissiveMap:C,normalMapObjectSpace:A&&f.normalMapType===rf,normalMapTangentSpace:A&&f.normalMapType===pu,packedNormalMap:A&&f.normalMapType===pu&&Ky(f.normalMap.format),metalnessMap:z,roughnessMap:y,anisotropy:B,anisotropyMap:Le,clearcoat:F,clearcoatMap:Ne,clearcoatNormalMap:Se,clearcoatRoughnessMap:ke,dispersion:R,retroreflection:q,iridescence:Y,iridescenceMap:ce,iridescenceThicknessMap:fe,sheen:J,sheenColorMap:xe,sheenRoughnessMap:Ae,specularMap:Wt,specularColorMap:ft,specularIntensityMap:Te,transmission:de,transmissionMap:at,thicknessMap:De,gradientMap:St,opaque:f.transparent===!1&&f.blending===bi&&f.alphaToCoverage===!1,alphaMap:$e,alphaTest:qt,alphaHash:Tt,combine:f.combine,mapUv:ue&&m(f.map.channel),aoMapUv:ve&&m(f.aoMap.channel),lightMapUv:_e&&m(f.lightMap.channel),bumpMapUv:Me&&m(f.bumpMap.channel),normalMapUv:A&&m(f.normalMap.channel),displacementMapUv:w&&m(f.displacementMap.channel),emissiveMapUv:C&&m(f.emissiveMap.channel),metalnessMapUv:z&&m(f.metalnessMap.channel),roughnessMapUv:y&&m(f.roughnessMap.channel),anisotropyMapUv:Le&&m(f.anisotropyMap.channel),clearcoatMapUv:Ne&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:Se&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&m(f.sheenRoughnessMap.channel),specularMapUv:Wt&&m(f.specularMap.channel),specularColorMapUv:ft&&m(f.specularColorMap.channel),specularIntensityMapUv:Te&&m(f.specularIntensityMap.channel),transmissionMapUv:at&&m(f.transmissionMap.channel),thicknessMapUv:De&&m(f.thicknessMap.channel),alphaMapUv:$e&&m(f.alphaMap.channel),vertexTangents:!!M.attributes.tangent&&(A||B),vertexNormals:!!M.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!M.attributes.uv&&(ue||$e),fog:!!S,useFog:f.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||M.attributes.normal===void 0&&A===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:le,skinning:b.isSkinnedMesh===!0,hasPositionAttribute:M.attributes.position!==void 0,morphTargets:M.morphAttributes.position!==void 0,morphNormals:M.morphAttributes.normal!==void 0,morphColors:M.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:$,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:T.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&g.length>0,shadowMapType:i.shadowMap.type,toneMapping:jt,decodeVideoTexture:ue&&f.map.isVideoTexture===!0&&Ct.getTransfer(f.map.colorSpace)===tn,decodeVideoTextureEmissive:C&&f.emissiveMap.isVideoTexture===!0&&Ct.getTransfer(f.emissiveMap.colorSpace)===tn,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Yi,flipSided:f.side===Zn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Ft&&f.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&f.extensions.multiDraw===!0||ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return nn.vertexUv1s=c.has(1),nn.vertexUv2s=c.has(2),nn.vertexUv3s=c.has(3),c.clear(),nn},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let g in f.defines)v.push(g),v.push(f.defines[g]);return f.isRawShaderMaterial===!1&&((function(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numSunLights),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numSunLightShadows),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)})(v,f),(function(g,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.retroreflection&&a.enable(24),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),g.push(a.mask)})(v,f),v.push(i.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=u[f.type],g;if(v){let _=Qi[v];g=Sf.clone(_.uniforms)}else g=f.uniforms;return g},acquireProgram:function(f,v){let g=h.get(v);return g!==void 0?++g.usedTimes:(g=new Zy(i,v,f,r),l.push(g),h.set(v,g)),g},releaseProgram:function(f){if(--f.usedTimes===0){let v=l.indexOf(f);l[v]=l[l.length-1],l.pop(),h.delete(f.cacheKey),f.destroy()}},releaseShaderCache:function(f){o.remove(f)},programs:l,dispose:function(){o.dispose()}}}function e1(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function t1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function kf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Gf(){let i=[],e=0,t=[],n=[],r=[];function s(o){let c=0;return o.isInstancedMesh&&(c+=2),o.isSkinnedMesh&&(c+=1),c}function a(o,c,l,h,p,d){let u=i[e];return u===void 0?(u={id:o.id,object:o,geometry:c,material:l,materialVariant:s(o),groupOrder:h,renderOrder:o.renderOrder,z:p,group:d},i[e]=u):(u.id=o.id,u.object=o,u.geometry=c,u.material=l,u.materialVariant=s(o),u.groupOrder=h,u.renderOrder=o.renderOrder,u.z=p,u.group=d),e++,u}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,c,l,h,p,d,u){u.reversedDepth===!0&&(p=-p);let m=a(o,c,l,h,p,d);l.transmission>0?n.push(m):l.transparent===!0?r.push(m):t.push(m)},unshift:function(o,c,l,h,p,d){let u=a(o,c,l,h,p,d);l.transmission>0?n.unshift(u):l.transparent===!0?r.unshift(u):t.unshift(u)},finish:function(){for(let o=e,c=i.length;o<c;o++){let l=i[o];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(o,c){t.length>1&&t.sort(o||t1),n.length>1&&n.sort(c||kf),r.length>1&&r.sort(c||kf)}}}function n1(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new Gf,i.set(e,[r])):t>=n.length?(r=new Gf,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function i1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new ht};break;case"SpotLight":t={position:new P,direction:new P,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new P,halfWidth:new P,halfHeight:new P}}return i[e.id]=t,t}}}function r1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3}}return i[e.id]=t,t}}}var s1=0;function a1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function o1(i){let e=new i1,t=r1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new P);let r=new P,s=new pt,a=new pt;return{setup:function(o){let c=0,l=0,h=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let p=0,d=0,u=0,m=0,f=0,v=0,g=0,_=0,b=0,T=0,S=0,M=0,I=0,O=0;o.sort(a1);for(let U=0,X=o.length;U<X;U++){let V=o[U],Z=V.color,se=V.intensity,ee=V.distance,re=null;if(V.shadow&&V.shadow.map&&(re=V.shadow.map.texture.format===ss?V.shadow.map.texture:V.shadow.map.depthTexture||V.shadow.map.texture),V.isAmbientLight)c+=Z.r*se,l+=Z.g*se,h+=Z.b*se;else if(V.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(V.sh.coefficients[N],se);O++}else if(V.isSunLight){let N=e.get(V);if(N.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){let $=V.shadow,he=t.get(V);he.shadowIntensity=$.intensity,he.shadowBias=$.bias,he.shadowNormalBias=$.normalBias,he.shadowRadius=$.radius,he.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[d]=he,n.sunShadowMap[d]=re;let le=$.getViewportCount();for(let te=0;te<le;te++)n.sunShadowMatrix[u+te]=$.getMatrix(te),n.sunShadowCascade[u+te]=$._cascadeData[te];u+=le,d++}n.sun[p]=N,p++}else if(V.isDirectionalLight){let N=e.get(V);if(N.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){let $=V.shadow,he=t.get(V);he.shadowIntensity=$.intensity,he.shadowBias=$.bias,he.shadowNormalBias=$.normalBias,he.shadowRadius=$.radius,he.shadowMapSize=$.mapSize,n.directionalShadow[m]=he,n.directionalShadowMap[m]=re,n.directionalShadowMatrix[m]=V.shadow.matrix,b++}n.directional[m]=N,m++}else if(V.isSpotLight){let N=e.get(V);N.position.setFromMatrixPosition(V.matrixWorld),N.color.copy(Z).multiplyScalar(se),N.distance=ee,N.coneCos=Math.cos(V.angle),N.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),N.decay=V.decay,n.spot[v]=N;let $=V.shadow;if(V.map&&(n.spotLightMap[M]=V.map,M++,$.updateMatrices(V),V.castShadow&&I++),n.spotLightMatrix[v]=$.matrix,V.castShadow){let he=t.get(V);he.shadowIntensity=$.intensity,he.shadowBias=$.bias,he.shadowNormalBias=$.normalBias,he.shadowRadius=$.radius,he.shadowMapSize=$.mapSize,n.spotShadow[v]=he,n.spotShadowMap[v]=re,S++}v++}else if(V.isRectAreaLight){let N=e.get(V);N.color.copy(Z).multiplyScalar(se),N.halfWidth.set(.5*V.width,0,0),N.halfHeight.set(0,.5*V.height,0),n.rectArea[g]=N,g++}else if(V.isPointLight){let N=e.get(V);if(N.color.copy(V.color).multiplyScalar(V.intensity),N.distance=V.distance,N.decay=V.decay,V.castShadow){let $=V.shadow,he=t.get(V);he.shadowIntensity=$.intensity,he.shadowBias=$.bias,he.shadowNormalBias=$.normalBias,he.shadowRadius=$.radius,he.shadowMapSize=$.mapSize,he.shadowCameraNear=$.camera.near,he.shadowCameraFar=$.camera.far,n.pointShadow[f]=he,n.pointShadowMap[f]=re,n.pointShadowMatrix[f]=V.shadow.matrix,T++}n.point[f]=N,f++}else if(V.isHemisphereLight){let N=e.get(V);N.skyColor.copy(V.color).multiplyScalar(se),N.groundColor.copy(V.groundColor).multiplyScalar(se),n.hemi[_]=N,_++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let k=n.hash;k.sunLength===p&&k.directionalLength===m&&k.pointLength===f&&k.spotLength===v&&k.rectAreaLength===g&&k.hemiLength===_&&k.numSunShadows===d&&k.numDirectionalShadows===b&&k.numPointShadows===T&&k.numSpotShadows===S&&k.numSpotMaps===M&&k.numLightProbes===O||(n.sun.length=p,n.directional.length=m,n.spot.length=v,n.rectArea.length=g,n.point.length=f,n.hemi.length=_,n.sunShadow.length=d,n.sunShadowMap.length=d,n.sunShadowMatrix.length=u,n.sunShadowCascade.length=u,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=S,n.spotShadowMap.length=S,n.spotLightMatrix.length=S+M-I,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=O,k.sunLength=p,k.directionalLength=m,k.pointLength=f,k.spotLength=v,k.rectAreaLength=g,k.hemiLength=_,k.numSunShadows=d,k.numDirectionalShadows=b,k.numPointShadows=T,k.numSpotShadows=S,k.numSpotMaps=M,k.numLightProbes=O,n.version=s1++)},setupView:function(o,c){let l=0,h=0,p=0,d=0,u=0,m=0,f=c.matrixWorldInverse;for(let v=0,g=o.length;v<g;v++){let _=o[v];if(_.isSunLight){let b=n.sun[l];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(f),l++}else if(_.isDirectionalLight){let b=n.directional[h];b.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(f),h++}else if(_.isSpotLight){let b=n.spot[d];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(f),b.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(f),d++}else if(_.isRectAreaLight){let b=n.rectArea[u];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(f),a.identity(),s.copy(_.matrixWorld),s.premultiply(f),a.extractRotation(s),b.halfWidth.set(.5*_.width,0,0),b.halfHeight.set(0,.5*_.height,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),u++}else if(_.isPointLight){let b=n.point[p];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(f),p++}else if(_.isHemisphereLight){let b=n.hemi[m];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(f),m++}}},state:n}}function Hf(i){let e=new o1(i),t=[],n=[],r=[],s={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,t.length=0,n.length=0,r.length=0},state:s,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){r.push(a)}}}function l1(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new Hf(i),e.set(t,[s])):n>=r.length?(s=new Hf(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}var c1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,h1=`uniform sampler2D shadow_pass;
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
}`,u1=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],d1=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Wf=new pt,ja=new P,Lu=new P;function p1(i,e,t){let n=new Lr,r=new me,s=new me,a=new en,o=new xl,c=new yl,l={},h=t.maxTextureSize,p={[Xs]:Zn,[Zn]:Xs,[Yi]:Yi},d=new En({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:c1,fragmentShader:h1}),u=d.clone();u.defines.HORIZONTAL_PASS=1;let m=new bt;m.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let f=new $n(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ka;let g=this.type;function _(M,I){let O=e.update(f);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,u.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),M.mapPass===null?M.mapPass=new ci(r.x,r.y,{format:ss,type:Zi}):M.mapPass.width===M.map.width&&M.mapPass.height===M.map.height||M.mapPass.setSize(M.map.width,M.map.height),d.uniforms.shadow_pass.value=M.map.depthTexture,d.uniforms.resolution.value.set(M.map.width,M.map.height),d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(I,null,O,d,f,null),u.uniforms.shadow_pass.value=M.mapPass.texture,u.uniforms.resolution.value.set(M.map.width,M.map.height),u.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(I,null,O,u,f,null)}function b(M,I,O,k){let U=null,X=O.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(X!==void 0)U=X;else if(U=O.isPointLight===!0?c:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let V=U.uuid,Z=I.uuid,se=l[V];se===void 0&&(se={},l[V]=se);let ee=se[Z];ee===void 0&&(ee=U.clone(),se[Z]=ee,I.addEventListener("dispose",S)),U=ee}return U.visible=I.visible,U.wireframe=I.wireframe,U.side=k===Ws?I.shadowSide!==null?I.shadowSide:I.side:I.shadowSide!==null?I.shadowSide:p[I.side],U.alphaMap=I.alphaMap,U.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,U.map=I.map,U.clipShadows=I.clipShadows,U.clippingPlanes=I.clippingPlanes,U.clipIntersection=I.clipIntersection,U.displacementMap=I.displacementMap,U.displacementScale=I.displacementScale,U.displacementBias=I.displacementBias,U.wireframeLinewidth=I.wireframeLinewidth,U.linewidth=I.linewidth,O.isPointLight===!0&&U.isMeshDistanceMaterial===!0&&(i.properties.get(U).light=O),U}function T(M,I,O,k,U){if(M.visible===!1)return;if(M.layers.test(I.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&U===Ws)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,M.matrixWorld);let V=e.update(M),Z=M.material;if(Array.isArray(Z)){let se=V.groups;for(let ee=0,re=se.length;ee<re;ee++){let N=se[ee],$=Z[N.materialIndex];if($&&$.visible){let he=b(M,$,k,U);M.onBeforeShadow(i,M,I,O,V,he,N),i.renderBufferDirect(O,null,V,he,M,N),M.onAfterShadow(i,M,I,O,V,he,N)}}}else if(Z.visible){let se=b(M,Z,k,U);M.onBeforeShadow(i,M,I,O,V,se,null),i.renderBufferDirect(O,null,V,se,M,null),M.onAfterShadow(i,M,I,O,V,se,null)}}let X=M.children;for(let V=0,Z=X.length;V<Z;V++)T(X[V],I,O,k,U)}function S(M){M.target.removeEventListener("dispose",S);for(let I in l){let O=l[I],k=M.target.uuid;k in O&&(O[k].dispose(),delete O[k])}}this.render=function(M,I,O){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||M.length===0)return;this.type===Ep&&(Ye("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ka);let k=i.getRenderTarget(),U=i.getActiveCubeFace(),X=i.getActiveMipmapLevel(),V=i.state;V.setBlending($i),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let Z=g!==this.type;Z&&I.traverse(function(se){se.material&&(Array.isArray(se.material)?se.material.forEach(ee=>ee.needsUpdate=!0):se.material.needsUpdate=!0)});for(let se=0,ee=M.length;se<ee;se++){let re=M[se],N=re.shadow;if(N===void 0){Ye("WebGLShadowMap:",re,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);let $=N.getFrameExtents();r.multiply($),s.copy(N.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/$.x),r.x=s.x*$.x,N.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/$.y),r.y=s.y*$.y,N.mapSize.y=s.y));let he=i.state.buffers.depth.getReversed();if(N.camera._reversedDepth=he,N.map===null||Z===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===Ws){if(re.isPointLight){Ye("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new ci(r.x,r.y,{format:ss,type:Zi,minFilter:Jn,magFilter:Jn,generateMipmaps:!1}),N.map.texture.name=re.name+".shadowMap",N.map.depthTexture=new Dr(r.x,r.y,Ti),N.map.depthTexture.name=re.name+".shadowMapDepth",N.map.depthTexture.format=is,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ui,N.map.depthTexture.magFilter=Ui}else re.isPointLight?(N.map=new Ql(r.x),N.map.depthTexture=new $o(r.x,Fr)):(N.map=new ci(r.x,r.y),N.map.depthTexture=new Dr(r.x,r.y,Fr)),N.map.depthTexture.name=re.name+".shadowMap",N.map.depthTexture.format=is,this.type===ka?(N.map.depthTexture.compareFunction=he?Yl:jl,N.map.depthTexture.minFilter=Jn,N.map.depthTexture.magFilter=Jn):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ui,N.map.depthTexture.magFilter=Ui);N.camera.updateProjectionMatrix()}N.map.isWebGLCubeRenderTarget===!0||N.map.width===r.x&&N.map.height===r.y||N.map.setSize(r.x,r.y);let le=N.map.isWebGLCubeRenderTarget?6:N.getViewportCount();re.isPointLight!==!0&&N.updateMatrices(re,O);for(let te=0;te<le;te++){let ge=N.getCamera(te);if(re.isPointLight){let ue=N.camera,oe=N.matrix,ie=re.distance||ue.far;ie!==ue.far&&(ue.far=ie,ue.updateProjectionMatrix()),ja.setFromMatrixPosition(re.matrixWorld),ue.position.copy(ja),Lu.copy(ue.position),Lu.add(u1[te]),ue.up.copy(d1[te]),ue.lookAt(Lu),ue.updateMatrixWorld(),oe.makeTranslation(-ja.x,-ja.y,-ja.z),Wf.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),N._frustum.setFromProjectionMatrix(Wf,ue.coordinateSystem,ue.reversedDepth)}if(N.map.isWebGLCubeRenderTarget)i.setRenderTarget(N.map,te),i.clear();else{te===0&&(i.setRenderTarget(N.map),i.clear());let ue=N.getViewport(te);a.set(s.x*ue.x,s.y*ue.y,s.x*ue.z,s.y*ue.w),V.viewport(a)}n=N.getFrustum(te),T(I,O,ge,re,this.type)}N.isPointLightShadow!==!0&&this.type===Ws&&_(N,O),N.needsUpdate=!1}g=this.type,v.needsUpdate=!1,i.setRenderTarget(k,U,X)}}function f1(i,e){let t=new function(){let y=!1,B=new en,F=null,R=new en(0,0,0,0);return{setMask:function(q){F===q||y||(i.colorMask(q,q,q,q),F=q)},setLocked:function(q){y=q},setClear:function(q,Y,J,de,Le){Le===!0&&(q*=de,Y*=de,J*=de),B.set(q,Y,J,de),R.equals(B)===!1&&(i.clearColor(q,Y,J,de),R.copy(B))},reset:function(){y=!1,F=null,R.set(-1,0,0,0)}}},n=new function(){let y=!1,B=!1,F=null,R=null,q=null;return{setReversed:function(Y){if(B!==Y){let J=e.get("EXT_clip_control");Y?J.clipControlEXT(J.LOWER_LEFT_EXT,J.ZERO_TO_ONE_EXT):J.clipControlEXT(J.LOWER_LEFT_EXT,J.NEGATIVE_ONE_TO_ONE_EXT),B=Y;let de=q;q=null,this.setClear(de)}},getReversed:function(){return B},setTest:function(Y){Y?ie(i.DEPTH_TEST):ve(i.DEPTH_TEST)},setMask:function(Y){F===Y||y||(i.depthMask(Y),F=Y)},setFunc:function(Y){if(B&&(Y=ff[Y]),R!==Y){switch(Y){case _h:i.depthFunc(i.NEVER);break;case vh:i.depthFunc(i.ALWAYS);break;case xh:i.depthFunc(i.LESS);break;case Dl:i.depthFunc(i.LEQUAL);break;case yh:i.depthFunc(i.EQUAL);break;case Sh:i.depthFunc(i.GEQUAL);break;case Mh:i.depthFunc(i.GREATER);break;case bh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}R=Y}},setLocked:function(Y){y=Y},setClear:function(Y){q!==Y&&(q=Y,B&&(Y=1-Y),i.clearDepth(Y))},reset:function(){y=!1,F=null,R=null,q=null,B=!1}}},r=new function(){let y=!1,B=null,F=null,R=null,q=null,Y=null,J=null,de=null,Le=null;return{setTest:function(Ne){y||(Ne?ie(i.STENCIL_TEST):ve(i.STENCIL_TEST))},setMask:function(Ne){B===Ne||y||(i.stencilMask(Ne),B=Ne)},setFunc:function(Ne,Se,ke){F===Ne&&R===Se&&q===ke||(i.stencilFunc(Ne,Se,ke),F=Ne,R=Se,q=ke)},setOp:function(Ne,Se,ke){Y===Ne&&J===Se&&de===ke||(i.stencilOp(Ne,Se,ke),Y=Ne,J=Se,de=ke)},setLocked:function(Ne){y=Ne},setClear:function(Ne){Le!==Ne&&(i.clearStencil(Ne),Le=Ne)},reset:function(){y=!1,B=null,F=null,R=null,q=null,Y=null,J=null,de=null,Le=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,b=null,T=null,S=new ht(0,0,0),M=0,I=!1,O=null,k=null,U=null,X=null,V=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),se=!1,ee=0,re=i.getParameter(i.VERSION);re.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(re)[1]),se=ee>=1):re.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),se=ee>=2);let N=null,$={},he=i.getParameter(i.SCISSOR_BOX),le=i.getParameter(i.VIEWPORT),te=new en().fromArray(he),ge=new en().fromArray(le);function ue(y,B,F,R){let q=new Uint8Array(4),Y=i.createTexture();i.bindTexture(y,Y),i.texParameteri(y,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(y,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let J=0;J<F;J++)y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?i.texImage3D(B,0,i.RGBA,1,1,R,0,i.RGBA,i.UNSIGNED_BYTE,q):i.texImage2D(B+J,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,q);return Y}let oe={};function ie(y){o[y]!==!0&&(i.enable(y),o[y]=!0)}function ve(y){o[y]!==!1&&(i.disable(y),o[y]=!1)}oe[i.TEXTURE_2D]=ue(i.TEXTURE_2D,i.TEXTURE_2D,1),oe[i.TEXTURE_CUBE_MAP]=ue(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[i.TEXTURE_2D_ARRAY]=ue(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),oe[i.TEXTURE_3D]=ue(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),ie(i.DEPTH_TEST),n.setFunc(Dl),w(!1),C(fh),ie(i.CULL_FACE),A($i);let _e={[qs]:i.FUNC_ADD,[Ap]:i.FUNC_SUBTRACT,[Rp]:i.FUNC_REVERSE_SUBTRACT};_e[Cp]=i.MIN,_e[Ip]=i.MAX;let Me={[Pp]:i.ZERO,[Lp]:i.ONE,[Np]:i.SRC_COLOR,[Up]:i.SRC_ALPHA,[kp]:i.SRC_ALPHA_SATURATE,[zp]:i.DST_COLOR,[Fp]:i.DST_ALPHA,[Dp]:i.ONE_MINUS_SRC_COLOR,[Op]:i.ONE_MINUS_SRC_ALPHA,[Vp]:i.ONE_MINUS_DST_COLOR,[Bp]:i.ONE_MINUS_DST_ALPHA,[Gp]:i.CONSTANT_COLOR,[Hp]:i.ONE_MINUS_CONSTANT_COLOR,[Wp]:i.CONSTANT_ALPHA,[Xp]:i.ONE_MINUS_CONSTANT_ALPHA};function A(y,B,F,R,q,Y,J,de,Le,Ne){if(y!==$i){if(u===!1&&(ie(i.BLEND),u=!0),y===wp)q=q||B,Y=Y||F,J=J||R,B===f&&q===_||(i.blendEquationSeparate(_e[B],_e[q]),f=B,_=q),F===v&&R===g&&Y===b&&J===T||(i.blendFuncSeparate(Me[F],Me[R],Me[Y],Me[J]),v=F,g=R,b=Y,T=J),de.equals(S)!==!1&&Le===M||(i.blendColor(de.r,de.g,de.b,Le),S.copy(de),M=Le),m=y,I=!1;else if(y!==m||Ne!==I){if(f===qs&&_===qs||(i.blendEquation(i.FUNC_ADD),f=qs,_=qs),Ne)switch(y){case bi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFunc(i.ONE,i.ONE);break;case mh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Qe("WebGLState: Invalid blending: ",y)}else switch(y){case bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case mh:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gh:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",y)}v=null,g=null,b=null,T=null,S.set(0,0,0),M=0,m=y,I=Ne}}else u===!0&&(ve(i.BLEND),u=!1)}function w(y){O!==y&&(y?i.frontFace(i.CW):i.frontFace(i.CCW),O=y)}function C(y){y!==bp?(ie(i.CULL_FACE),y!==k&&(y===fh?i.cullFace(i.BACK):y===Tp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ve(i.CULL_FACE),k=y}function z(y,B,F){y?(ie(i.POLYGON_OFFSET_FILL),X===B&&V===F||(X=B,V=F,n.getReversed()&&(B=-B),i.polygonOffset(B,F))):ve(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:ie,disable:ve,bindFramebuffer:function(y,B){return l[y]!==B&&(i.bindFramebuffer(y,B),l[y]=B,y===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=B),y===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=B),!0)},drawBuffers:function(y,B){let F=p,R=!1;if(y){F=h.get(B),F===void 0&&(F=[],h.set(B,F));let q=y.textures;if(F.length!==q.length||F[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,J=q.length;Y<J;Y++)F[Y]=i.COLOR_ATTACHMENT0+Y;F.length=q.length,R=!0}}else F[0]!==i.BACK&&(F[0]=i.BACK,R=!0);R&&i.drawBuffers(F)},useProgram:function(y){return d!==y&&(i.useProgram(y),d=y,!0)},setBlending:A,setMaterial:function(y,B){y.side===Yi?ve(i.CULL_FACE):ie(i.CULL_FACE);let F=y.side===Zn;B&&(F=!F),w(F),y.blending===bi&&y.transparent===!1?A($i):A(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),n.setFunc(y.depthFunc),n.setTest(y.depthTest),n.setMask(y.depthWrite),t.setMask(y.colorWrite);let R=y.stencilWrite;r.setTest(R),R&&(r.setMask(y.stencilWriteMask),r.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),r.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),z(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):ve(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:w,setCullFace:C,setLineWidth:function(y){y!==U&&(se&&i.lineWidth(y),U=y)},setPolygonOffset:z,setScissorTest:function(y){y?ie(i.SCISSOR_TEST):ve(i.SCISSOR_TEST)},activeTexture:function(y){y===void 0&&(y=i.TEXTURE0+Z-1),N!==y&&(i.activeTexture(y),N=y)},bindTexture:function(y,B,F){F===void 0&&(F=N===null?i.TEXTURE0+Z-1:N);let R=$[F];R===void 0&&(R={type:void 0,texture:void 0},$[F]=R),R.type===y&&R.texture===B||(N!==F&&(i.activeTexture(F),N=F),i.bindTexture(y,B||oe[y]),R.type=y,R.texture=B)},unbindTexture:function(){let y=$[N];y!==void 0&&y.type!==void 0&&(i.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},pixelStorei:function(y,B){c[y]!==B&&(i.pixelStorei(y,B),c[y]=B)},getParameter:function(y){return c[y]!==void 0?c[y]:i.getParameter(y)},updateUBOMapping:function(y,B){let F=a.get(B);F===void 0&&(F=new WeakMap,a.set(B,F));let R=F.get(y);R===void 0&&(R=i.getUniformBlockIndex(B,y.name),F.set(y,R))},uniformBlockBinding:function(y,B){let F=a.get(B).get(y);s.get(B)!==F&&(i.uniformBlockBinding(B,F,y.__bindingPointIndex),s.set(B,F))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(y){Qe("WebGLState:",y)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(y){Qe("WebGLState:",y)}},scissor:function(y){te.equals(y)===!1&&(i.scissor(y.x,y.y,y.z,y.w),te.copy(y))},viewport:function(y){ge.equals(y)===!1&&(i.viewport(y.x,y.y,y.z,y.w),ge.copy(y))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),o={},c={},N=null,$={},l={},h=new WeakMap,p=[],d=null,u=!1,m=null,f=null,v=null,g=null,_=null,b=null,T=null,S=new ht(0,0,0),M=0,I=!1,O=null,k=null,U=null,X=null,V=null,te.set(0,0,i.canvas.width,i.canvas.height),ge.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function m1(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new me,h=new WeakMap,p=new Set,d,u=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(A,w){return m?new OffscreenCanvas(A,w):fa("canvas")}function v(A,w,C){let z=1,y=Me(A);if((y.width>C||y.height>C)&&(z=C/Math.max(y.width,y.height)),z<1){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let B=Math.floor(z*y.width),F=Math.floor(z*y.height);d===void 0&&(d=f(B,F));let R=w?f(B,F):d;return R.width=B,R.height=F,R.getContext("2d").drawImage(A,0,0,B,F),Ye("WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+B+"x"+F+")."),R}return"data"in A&&Ye("WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),A}return A}function g(A){return A.generateMipmaps}function _(A){i.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(A,w,C,z,y,B=!1){if(A!==null){if(i[A]!==void 0)return i[A];Ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let F;z&&(F=e.get("EXT_texture_norm16"),F||Ye("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let R=w;if(w===i.RED&&(C===i.FLOAT&&(R=i.R32F),C===i.HALF_FLOAT&&(R=i.R16F),C===i.UNSIGNED_BYTE&&(R=i.R8),C===i.UNSIGNED_SHORT&&F&&(R=F.R16_EXT),C===i.SHORT&&F&&(R=F.R16_SNORM_EXT)),w===i.RED_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.R8UI),C===i.UNSIGNED_SHORT&&(R=i.R16UI),C===i.UNSIGNED_INT&&(R=i.R32UI),C===i.BYTE&&(R=i.R8I),C===i.SHORT&&(R=i.R16I),C===i.INT&&(R=i.R32I)),w===i.RG&&(C===i.FLOAT&&(R=i.RG32F),C===i.HALF_FLOAT&&(R=i.RG16F),C===i.UNSIGNED_BYTE&&(R=i.RG8),C===i.UNSIGNED_SHORT&&F&&(R=F.RG16_EXT),C===i.SHORT&&F&&(R=F.RG16_SNORM_EXT)),w===i.RG_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RG8UI),C===i.UNSIGNED_SHORT&&(R=i.RG16UI),C===i.UNSIGNED_INT&&(R=i.RG32UI),C===i.BYTE&&(R=i.RG8I),C===i.SHORT&&(R=i.RG16I),C===i.INT&&(R=i.RG32I)),w===i.RGB_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RGB8UI),C===i.UNSIGNED_SHORT&&(R=i.RGB16UI),C===i.UNSIGNED_INT&&(R=i.RGB32UI),C===i.BYTE&&(R=i.RGB8I),C===i.SHORT&&(R=i.RGB16I),C===i.INT&&(R=i.RGB32I)),w===i.RGBA_INTEGER&&(C===i.UNSIGNED_BYTE&&(R=i.RGBA8UI),C===i.UNSIGNED_SHORT&&(R=i.RGBA16UI),C===i.UNSIGNED_INT&&(R=i.RGBA32UI),C===i.BYTE&&(R=i.RGBA8I),C===i.SHORT&&(R=i.RGBA16I),C===i.INT&&(R=i.RGBA32I)),w===i.RGB&&(C===i.UNSIGNED_SHORT&&F&&(R=F.RGB16_EXT),C===i.SHORT&&F&&(R=F.RGB16_SNORM_EXT),C===i.UNSIGNED_INT_5_9_9_9_REV&&(R=i.RGB9_E5),C===i.UNSIGNED_INT_10F_11F_11F_REV&&(R=i.R11F_G11F_B10F)),w===i.RGBA){let q=B?mu:Ct.getTransfer(y);C===i.FLOAT&&(R=i.RGBA32F),C===i.HALF_FLOAT&&(R=i.RGBA16F),C===i.UNSIGNED_BYTE&&(R=q===tn?i.SRGB8_ALPHA8:i.RGBA8),C===i.UNSIGNED_SHORT&&F&&(R=F.RGBA16_EXT),C===i.SHORT&&F&&(R=F.RGBA16_SNORM_EXT),C===i.UNSIGNED_SHORT_4_4_4_4&&(R=i.RGBA4),C===i.UNSIGNED_SHORT_5_5_5_1&&(R=i.RGB5_A1)}return R!==i.R16F&&R!==i.R32F&&R!==i.RG16F&&R!==i.RG32F&&R!==i.RGBA16F&&R!==i.RGBA32F||e.get("EXT_color_buffer_float"),R}function S(A,w){let C;return A?w===null||w===Fr||w===Ys?C=i.DEPTH24_STENCIL8:w===Ti?C=i.DEPTH32F_STENCIL8:w===Wa&&(C=i.DEPTH24_STENCIL8,Ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Fr||w===Ys?C=i.DEPTH_COMPONENT24:w===Ti?C=i.DEPTH_COMPONENT32F:w===Wa&&(C=i.DEPTH_COMPONENT16),C}function M(A,w){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ui&&A.minFilter!==Jn?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function I(A){let w=A.target;w.removeEventListener("dispose",I),(function(C){let z=n.get(C);if(z.__webglInit===void 0)return;let y=C.source,B=u.get(y);if(B){let F=B[z.__cacheKey];F.usedTimes--,F.usedTimes===0&&k(C),Object.keys(B).length===0&&u.delete(y)}n.remove(C)})(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&p.delete(w)}function O(A){let w=A.target;w.removeEventListener("dispose",O),(function(C){let z=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(z.__webglFramebuffer[B]))for(let F=0;F<z.__webglFramebuffer[B].length;F++)i.deleteFramebuffer(z.__webglFramebuffer[B][F]);else i.deleteFramebuffer(z.__webglFramebuffer[B]);z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer[B])}else{if(Array.isArray(z.__webglFramebuffer))for(let B=0;B<z.__webglFramebuffer.length;B++)i.deleteFramebuffer(z.__webglFramebuffer[B]);else i.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&i.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let B=0;B<z.__webglColorRenderbuffer.length;B++)z.__webglColorRenderbuffer[B]&&i.deleteRenderbuffer(z.__webglColorRenderbuffer[B]);z.__webglDepthRenderbuffer&&i.deleteRenderbuffer(z.__webglDepthRenderbuffer)}let y=C.textures;for(let B=0,F=y.length;B<F;B++){let R=n.get(y[B]);R.__webglTexture&&(i.deleteTexture(R.__webglTexture),a.memory.textures--),n.remove(y[B])}n.remove(C)})(w)}function k(A){let w=n.get(A);i.deleteTexture(w.__webglTexture);let C=A.source;delete u.get(C)[w.__cacheKey],a.memory.textures--}let U=0;function X(A,w){let C=n.get(A);if(A.isVideoTexture&&(function(z){let y=a.render.frame;h.get(z)!==y&&(h.set(z,y),z.update())})(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&C.__version!==A.version){let z=A.image;if(z===null)Ye("WebGLRenderer: Texture marked for update but no image data found.");else{if(z.complete!==!1)return void $(C,A,w);Ye("WebGLRenderer: Texture marked for update but image is incomplete")}}else A.isExternalTexture&&(C.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,C.__webglTexture,i.TEXTURE0+w)}let V={[Fl]:i.REPEAT,[Bl]:i.CLAMP_TO_EDGE,[$p]:i.MIRRORED_REPEAT},Z={[Ui]:i.NEAREST,[Zp]:i.NEAREST_MIPMAP_NEAREST,[Ha]:i.NEAREST_MIPMAP_LINEAR,[Jn]:i.LINEAR,[zl]:i.LINEAR_MIPMAP_NEAREST,[ns]:i.LINEAR_MIPMAP_LINEAR},se={[sf]:i.NEVER,[hf]:i.ALWAYS,[af]:i.LESS,[jl]:i.LEQUAL,[of]:i.EQUAL,[Yl]:i.GEQUAL,[lf]:i.GREATER,[cf]:i.NOTEQUAL};function ee(A,w){if(w.type!==Ti||e.has("OES_texture_float_linear")!==!1||w.magFilter!==Jn&&w.magFilter!==zl&&w.magFilter!==Ha&&w.magFilter!==ns&&w.minFilter!==Jn&&w.minFilter!==zl&&w.minFilter!==Ha&&w.minFilter!==ns||Ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,V[w.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,V[w.wrapT]),A!==i.TEXTURE_3D&&A!==i.TEXTURE_2D_ARRAY||i.texParameteri(A,i.TEXTURE_WRAP_R,V[w.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Z[w.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Z[w.minFilter]),w.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,se[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Ui||w.minFilter!==Ha&&w.minFilter!==ns||w.type===Ti&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let C=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function re(A,w){let C=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",I));let z=w.source,y=u.get(z);y===void 0&&(y={},u.set(z,y));let B=(function(F){let R=[];return R.push(F.wrapS),R.push(F.wrapT),R.push(F.wrapR||0),R.push(F.magFilter),R.push(F.minFilter),R.push(F.anisotropy),R.push(F.internalFormat),R.push(F.format),R.push(F.type),R.push(F.generateMipmaps),R.push(F.premultiplyAlpha),R.push(F.flipY),R.push(F.unpackAlignment),R.push(F.colorSpace),R.join()})(w);if(B!==A.__cacheKey){y[B]===void 0&&(y[B]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,C=!0),y[B].usedTimes++;let F=y[A.__cacheKey];F!==void 0&&(y[A.__cacheKey].usedTimes--,F.usedTimes===0&&k(w)),A.__cacheKey=B,A.__webglTexture=y[B].texture}return C}function N(A,w,C){return Math.floor(Math.floor(A/C)/w)}function $(A,w,C){let z=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(z=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(z=i.TEXTURE_3D);let y=re(A,w),B=w.source;t.bindTexture(z,A.__webglTexture,i.TEXTURE0+C);let F=n.get(B);if(B.version!==F.__version||y===!0){if(t.activeTexture(i.TEXTURE0+C),!(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)){let fe=Ct.getPrimaries(Ct.workingColorSpace),xe=w.colorSpace===as?null:Ct.getPrimaries(w.colorSpace),Ae=w.colorSpace===as||fe===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae)}t.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment);let R=v(w.image,!1,r.maxTextureSize);R=_e(w,R);let q=s.convert(w.format,w.colorSpace),Y=s.convert(w.type),J,de=T(w.internalFormat,q,Y,w.normalized,w.colorSpace,w.isVideoTexture);ee(z,w);let Le=w.mipmaps,Ne=w.isVideoTexture!==!0,Se=F.__version===void 0||y===!0,ke=B.dataReady,ce=M(w,R);if(w.isDepthTexture)de=S(w.format===rs,w.type),Se&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,de,R.width,R.height):t.texImage2D(i.TEXTURE_2D,0,de,R.width,R.height,0,q,Y,null));else if(w.isDataTexture)if(Le.length>0){Ne&&Se&&t.texStorage2D(i.TEXTURE_2D,ce,de,Le[0].width,Le[0].height);for(let fe=0,xe=Le.length;fe<xe;fe++)J=Le[fe],Ne?ke&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,J.width,J.height,q,Y,J.data):t.texImage2D(i.TEXTURE_2D,fe,de,J.width,J.height,0,q,Y,J.data);w.generateMipmaps=!1}else Ne?(Se&&t.texStorage2D(i.TEXTURE_2D,ce,de,R.width,R.height),ke&&(function(fe,xe,Ae,Wt){let ft=fe.updateRanges;if(ft.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe.width,xe.height,Ae,Wt,xe.data);else{ft.sort(($e,qt)=>$e.start-qt.start);let Te=0;for(let $e=1;$e<ft.length;$e++){let qt=ft[Te],Tt=ft[$e],Ft=qt.start+qt.count,jt=N(Tt.start,xe.width,4),nn=N(qt.start,xe.width,4);Tt.start<=Ft+1&&jt===nn&&N(Tt.start+Tt.count-1,xe.width,4)===jt?qt.count=Math.max(qt.count,Tt.start+Tt.count-qt.start):(++Te,ft[Te]=Tt)}ft.length=Te+1;let at=t.getParameter(i.UNPACK_ROW_LENGTH),De=t.getParameter(i.UNPACK_SKIP_PIXELS),St=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,xe.width);for(let $e=0,qt=ft.length;$e<qt;$e++){let Tt=ft[$e],Ft=Math.floor(Tt.start/4),jt=Math.ceil(Tt.count/4),nn=Ft%xe.width,sn=Math.floor(Ft/xe.width),hi=jt;t.pixelStorei(i.UNPACK_SKIP_PIXELS,nn),t.pixelStorei(i.UNPACK_SKIP_ROWS,sn),t.texSubImage2D(i.TEXTURE_2D,0,nn,sn,hi,1,Ae,Wt,xe.data)}fe.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,at),t.pixelStorei(i.UNPACK_SKIP_PIXELS,De),t.pixelStorei(i.UNPACK_SKIP_ROWS,St)}})(w,R,q,Y)):t.texImage2D(i.TEXTURE_2D,0,de,R.width,R.height,0,q,Y,R.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ne&&Se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,de,Le[0].width,Le[0].height,R.depth);for(let fe=0,xe=Le.length;fe<xe;fe++)if(J=Le[fe],w.format!==Ji)if(q!==null)if(Ne){if(ke)if(w.layerUpdates.size>0){let Ae=Su(J.width,J.height,w.format,w.type);for(let Wt of w.layerUpdates){let ft=J.data.subarray(Wt*Ae/J.data.BYTES_PER_ELEMENT,(Wt+1)*Ae/J.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,Wt,J.width,J.height,1,q,ft)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,J.width,J.height,R.depth,q,J.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,fe,de,J.width,J.height,R.depth,0,J.data,0,0);else Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?ke&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,J.width,J.height,R.depth,q,Y,J.data):t.texImage3D(i.TEXTURE_2D_ARRAY,fe,de,J.width,J.height,R.depth,0,q,Y,J.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Ne&&Se&&t.texStorage2D(i.TEXTURE_2D,ce,de,Le[0].width,Le[0].height);for(let fe=0,xe=Le.length;fe<xe;fe++)J=Le[fe],w.format!==Ji?q!==null?Ne?ke&&t.compressedTexSubImage2D(i.TEXTURE_2D,fe,0,0,J.width,J.height,q,J.data):t.compressedTexImage2D(i.TEXTURE_2D,fe,de,J.width,J.height,0,J.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?ke&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,J.width,J.height,q,Y,J.data):t.texImage2D(i.TEXTURE_2D,fe,de,J.width,J.height,0,q,Y,J.data)}else if(w.isDataArrayTexture)if(Ne){if(Se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,de,R.width,R.height,R.depth),ke)if(w.layerUpdates.size>0){let fe=Su(R.width,R.height,w.format,w.type);for(let xe of w.layerUpdates){let Ae=R.data.subarray(xe*fe/R.data.BYTES_PER_ELEMENT,(xe+1)*fe/R.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,xe,R.width,R.height,1,q,Y,Ae)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,R.width,R.height,R.depth,q,Y,R.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,de,R.width,R.height,R.depth,0,q,Y,R.data);else if(w.isData3DTexture)Ne?(Se&&t.texStorage3D(i.TEXTURE_3D,ce,de,R.width,R.height,R.depth),ke&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,R.width,R.height,R.depth,q,Y,R.data)):t.texImage3D(i.TEXTURE_3D,0,de,R.width,R.height,R.depth,0,q,Y,R.data);else if(w.isFramebufferTexture){if(Se)if(Ne)t.texStorage2D(i.TEXTURE_2D,ce,de,R.width,R.height);else{let fe=R.width,xe=R.height;for(let Ae=0;Ae<ce;Ae++)t.texImage2D(i.TEXTURE_2D,Ae,de,fe,xe,0,q,Y,null),fe>>=1,xe>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in i){let fe=i.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),R.parentNode!==fe)return fe.appendChild(R),p.add(w),fe.onpaint=xe=>{let Ae=xe.changedElements;for(let Wt of p)Ae.includes(Wt.image)&&(Wt.needsUpdate=!0)},void fe.requestPaint();if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,R);else{let Ae=i.RGBA,Wt=i.RGBA,ft=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ae,Wt,ft,R)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Le.length>0){if(Ne&&Se){let fe=Me(Le[0]);t.texStorage2D(i.TEXTURE_2D,ce,de,fe.width,fe.height)}for(let fe=0,xe=Le.length;fe<xe;fe++)J=Le[fe],Ne?ke&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,q,Y,J):t.texImage2D(i.TEXTURE_2D,fe,de,q,Y,J);w.generateMipmaps=!1}else if(Ne){if(Se){let fe=Me(R);t.texStorage2D(i.TEXTURE_2D,ce,de,fe.width,fe.height)}ke&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,q,Y,R)}else t.texImage2D(i.TEXTURE_2D,0,de,q,Y,R);g(w)&&_(z),F.__version=B.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function he(A,w,C,z,y,B){let F=s.convert(C.format,C.colorSpace),R=s.convert(C.type),q=T(C.internalFormat,F,R,C.normalized,C.colorSpace),Y=n.get(w),J=n.get(C);if(J.__renderTarget=w,!Y.__hasExternalTextures){let de=Math.max(1,w.width>>B),Le=Math.max(1,w.height>>B);y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY?t.texImage3D(y,B,q,de,Le,w.depth,0,F,R,null):t.texImage2D(y,B,q,de,Le,0,F,R,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),ve(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,z,y,J.__webglTexture,0,ie(w)):(y===i.TEXTURE_2D||y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,z,y,J.__webglTexture,B),t.bindFramebuffer(i.FRAMEBUFFER,null)}function le(A,w,C){if(i.bindRenderbuffer(i.RENDERBUFFER,A),w.depthBuffer){let z=w.depthTexture,y=z&&z.isDepthTexture?z.type:null,B=S(w.stencilBuffer,y),F=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ve(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie(w),B,w.width,w.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie(w),B,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,B,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,F,i.RENDERBUFFER,A)}else{let z=w.textures;for(let y=0;y<z.length;y++){let B=z[y],F=s.convert(B.format,B.colorSpace),R=s.convert(B.type),q=T(B.internalFormat,F,R,B.normalized,B.colorSpace);ve(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie(w),q,w.width,w.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie(w),q,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,q,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function te(A,w,C){let z=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!w.depthTexture||!w.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let y=n.get(w.depthTexture);if(y.__renderTarget=w,y.__webglTexture&&w.depthTexture.image.width===w.width&&w.depthTexture.image.height===w.height||(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),z){if(y.__webglInit===void 0&&(y.__webglInit=!0,w.depthTexture.addEventListener("dispose",I)),y.__webglTexture===void 0){y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture),ee(i.TEXTURE_CUBE_MAP,w.depthTexture);let Y=s.convert(w.depthTexture.format),J=s.convert(w.depthTexture.type),de;w.depthTexture.format===is?de=i.DEPTH_COMPONENT24:w.depthTexture.format===rs&&(de=i.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,de,w.width,w.height,0,Y,J,null)}}else X(w.depthTexture,0);let B=y.__webglTexture,F=ie(w),R=z?i.TEXTURE_CUBE_MAP_POSITIVE_X+C:i.TEXTURE_2D,q=w.depthTexture.format===rs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(w.depthTexture.format===is)ve(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,R,B,0,F):i.framebufferTexture2D(i.FRAMEBUFFER,q,R,B,0);else{if(w.depthTexture.format!==rs)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");ve(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,R,B,0,F):i.framebufferTexture2D(i.FRAMEBUFFER,q,R,B,0)}}function ge(A){let w=n.get(A),C=A.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==A.depthTexture){let z=A.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),z){let y=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,z.removeEventListener("dispose",y)};z.addEventListener("dispose",y),w.__depthDisposeCallback=y}w.__boundDepthTexture=z}if(A.depthTexture&&!w.__autoAllocateDepthBuffer)if(C)for(let z=0;z<6;z++)te(w.__webglFramebuffer[z],A,z);else{let z=A.texture.mipmaps;z&&z.length>0?te(w.__webglFramebuffer[0],A,0):te(w.__webglFramebuffer,A,0)}else if(C){w.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[z]),w.__webglDepthbuffer[z]===void 0)w.__webglDepthbuffer[z]=i.createRenderbuffer(),le(w.__webglDepthbuffer[z],A,!1);else{let y=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=w.__webglDepthbuffer[z];i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,B)}}else{let z=A.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),le(w.__webglDepthbuffer,A,!1);else{let y=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,y,i.RENDERBUFFER,B)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let ue=[],oe=[];function ie(A){return Math.min(r.maxSamples,A.samples)}function ve(A){let w=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function _e(A,w){let C=A.colorSpace,z=A.format,y=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||C!==ql&&C!==as&&(Ct.getTransfer(C)===tn?z===Ji&&y===Oi||Ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",C)),w}function Me(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=function(){let A=U;return A>=r.maxTextures&&Ye("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),U+=1,A},this.resetTextureUnits=function(){U=0},this.getTextureUnits=function(){return U},this.setTextureUnits=function(A){U=A},this.setTexture2D=X,this.setTexture2DArray=function(A,w){let C=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&C.__version!==A.version?$(C,A,w):(A.isExternalTexture&&(C.__webglTexture=A.sourceTexture?A.sourceTexture:null),t.bindTexture(i.TEXTURE_2D_ARRAY,C.__webglTexture,i.TEXTURE0+w))},this.setTexture3D=function(A,w){let C=n.get(A);A.isRenderTargetTexture===!1&&A.version>0&&C.__version!==A.version?$(C,A,w):t.bindTexture(i.TEXTURE_3D,C.__webglTexture,i.TEXTURE0+w)},this.setTextureCube=function(A,w){let C=n.get(A);A.isCubeDepthTexture!==!0&&A.version>0&&C.__version!==A.version?(function(z,y,B){if(y.image.length!==6)return;let F=re(z,y),R=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+B);let q=n.get(R);if(R.version!==q.__version||F===!0){t.activeTexture(i.TEXTURE0+B);let Y=Ct.getPrimaries(Ct.workingColorSpace),J=y.colorSpace===as?null:Ct.getPrimaries(y.colorSpace),de=y.colorSpace===as||Y===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);let Le=y.isCompressedTexture||y.image[0].isCompressedTexture,Ne=y.image[0]&&y.image[0].isDataTexture,Se=[];for(let De=0;De<6;De++)Se[De]=Le||Ne?Ne?y.image[De].image:y.image[De]:v(y.image[De],!0,r.maxCubemapSize),Se[De]=_e(y,Se[De]);let ke=Se[0],ce=s.convert(y.format,y.colorSpace),fe=s.convert(y.type),xe=T(y.internalFormat,ce,fe,y.normalized,y.colorSpace),Ae=y.isVideoTexture!==!0,Wt=q.__version===void 0||F===!0,ft=R.dataReady,Te,at=M(y,ke);if(ee(i.TEXTURE_CUBE_MAP,y),Le){Ae&&Wt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,at,xe,ke.width,ke.height);for(let De=0;De<6;De++){Te=Se[De].mipmaps;for(let St=0;St<Te.length;St++){let $e=Te[St];y.format!==Ji?ce!==null?Ae?ft&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,St,0,0,$e.width,$e.height,ce,$e.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,St,xe,$e.width,$e.height,0,$e.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ae?ft&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,St,0,0,$e.width,$e.height,ce,fe,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,St,xe,$e.width,$e.height,0,ce,fe,$e.data)}}}else{if(Te=y.mipmaps,Ae&&Wt){Te.length>0&&at++;let De=Me(Se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,at,xe,De.width,De.height)}for(let De=0;De<6;De++)if(Ne){Ae?ft&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,0,0,Se[De].width,Se[De].height,ce,fe,Se[De].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,xe,Se[De].width,Se[De].height,0,ce,fe,Se[De].data);for(let St=0;St<Te.length;St++){let $e=Te[St].image[De].image;Ae?ft&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,St+1,0,0,$e.width,$e.height,ce,fe,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,St+1,xe,$e.width,$e.height,0,ce,fe,$e.data)}}else{Ae?ft&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,0,0,ce,fe,Se[De]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,xe,ce,fe,Se[De]);for(let St=0;St<Te.length;St++){let $e=Te[St];Ae?ft&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,St+1,0,0,ce,fe,$e.image[De]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,St+1,xe,ce,fe,$e.image[De])}}}g(y)&&_(i.TEXTURE_CUBE_MAP),q.__version=R.version,y.onUpdate&&y.onUpdate(y)}z.__version=y.version})(C,A,w):t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+w)},this.rebindTextures=function(A,w,C){let z=n.get(A);w!==void 0&&he(z.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),C!==void 0&&ge(A)},this.setupRenderTarget=function(A){let w=A.texture,C=n.get(A),z=n.get(w);A.addEventListener("dispose",O);let y=A.textures,B=A.isWebGLCubeRenderTarget===!0,F=y.length>1;if(F||(z.__webglTexture===void 0&&(z.__webglTexture=i.createTexture()),z.__version=w.version,a.memory.textures++),B){C.__webglFramebuffer=[];for(let R=0;R<6;R++)if(w.mipmaps&&w.mipmaps.length>0){C.__webglFramebuffer[R]=[];for(let q=0;q<w.mipmaps.length;q++)C.__webglFramebuffer[R][q]=i.createFramebuffer()}else C.__webglFramebuffer[R]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){C.__webglFramebuffer=[];for(let R=0;R<w.mipmaps.length;R++)C.__webglFramebuffer[R]=i.createFramebuffer()}else C.__webglFramebuffer=i.createFramebuffer();if(F)for(let R=0,q=y.length;R<q;R++){let Y=n.get(y[R]);Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&ve(A)===!1){C.__webglMultisampledFramebuffer=i.createFramebuffer(),C.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let R=0;R<y.length;R++){let q=y[R];C.__webglColorRenderbuffer[R]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,C.__webglColorRenderbuffer[R]);let Y=s.convert(q.format,q.colorSpace),J=s.convert(q.type),de=T(q.internalFormat,Y,J,q.normalized,q.colorSpace,A.isXRRenderTarget===!0),Le=ie(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,de,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+R,i.RENDERBUFFER,C.__webglColorRenderbuffer[R])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(C.__webglDepthRenderbuffer=i.createRenderbuffer(),le(C.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(B){t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture),ee(i.TEXTURE_CUBE_MAP,w);for(let R=0;R<6;R++)if(w.mipmaps&&w.mipmaps.length>0)for(let q=0;q<w.mipmaps.length;q++)he(C.__webglFramebuffer[R][q],A,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,q);else he(C.__webglFramebuffer[R],A,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+R,0);g(w)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(F){for(let R=0,q=y.length;R<q;R++){let Y=y[R],J=n.get(Y),de=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(de=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,J.__webglTexture),ee(de,Y),he(C.__webglFramebuffer,A,Y,i.COLOR_ATTACHMENT0+R,de,0),g(Y)&&_(de)}t.unbindTexture()}else{let R=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(R=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(R,z.__webglTexture),ee(R,w),w.mipmaps&&w.mipmaps.length>0)for(let q=0;q<w.mipmaps.length;q++)he(C.__webglFramebuffer[q],A,w,i.COLOR_ATTACHMENT0,R,q);else he(C.__webglFramebuffer,A,w,i.COLOR_ATTACHMENT0,R,0);g(w)&&_(R),t.unbindTexture()}A.depthBuffer&&ge(A)},this.updateRenderTargetMipmap=function(A){let w=A.textures;for(let C=0,z=w.length;C<z;C++){let y=w[C];if(g(y)){let B=b(A),F=n.get(y).__webglTexture;t.bindTexture(B,F),_(B),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(A){if(A.samples>0){if(ve(A)===!1){let w=A.textures,C=A.width,z=A.height,y=i.COLOR_BUFFER_BIT,B=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,F=n.get(A),R=w.length>1;if(R)for(let Y=0;Y<w.length;Y++)t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,F.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,F.__webglMultisampledFramebuffer);let q=A.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglFramebuffer);for(let Y=0;Y<w.length;Y++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(y|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(y|=i.STENCIL_BUFFER_BIT)),R){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,F.__webglColorRenderbuffer[Y]);let J=n.get(w[Y]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,C,z,0,0,C,z,y,i.NEAREST),c===!0&&(ue.length=0,oe.length=0,ue.push(i.COLOR_ATTACHMENT0+Y),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(ue.push(B),oe.push(B),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,oe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),R)for(let Y=0;Y<w.length;Y++){t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,F.__webglColorRenderbuffer[Y]);let J=n.get(w[Y]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,F.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.TEXTURE_2D,J,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,F.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){let w=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}},this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=he,this.useMultisampledRTT=ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function g1(i,e){return{convert:function(t,n=as){let r,s=Ct.getTransfer(n);if(t===Oi)return i.UNSIGNED_BYTE;if(t===Lh)return i.UNSIGNED_SHORT_4_4_4_4;if(t===Nh)return i.UNSIGNED_SHORT_5_5_5_1;if(t===Qp)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===ef)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===Jp)return i.BYTE;if(t===Kp)return i.SHORT;if(t===Wa)return i.UNSIGNED_SHORT;if(t===Ph)return i.INT;if(t===Fr)return i.UNSIGNED_INT;if(t===Ti)return i.FLOAT;if(t===Zi)return i.HALF_FLOAT;if(t===tf)return i.ALPHA;if(t===nf)return i.RGB;if(t===Ji)return i.RGBA;if(t===is)return i.DEPTH_COMPONENT;if(t===rs)return i.DEPTH_STENCIL;if(t===Xa)return i.RED;if(t===Dh)return i.RED_INTEGER;if(t===ss)return i.RG;if(t===Uh)return i.RG_INTEGER;if(t===Oh)return i.RGBA_INTEGER;if(t===Vl||t===kl||t===Gl||t===Hl)if(s===tn){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===Vl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===kl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Gl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Hl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===Vl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===kl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Gl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Hl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Fh||t===Bh||t===zh||t===Vh){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===Fh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Bh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===zh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Vh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===kh||t===Gh||t===Hh||t===Wh||t===Xh||t===Wl||t===qh){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===kh||t===Gh)return s===tn?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===Hh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(t===Wh)return r.COMPRESSED_R11_EAC;if(t===Xh)return r.COMPRESSED_SIGNED_R11_EAC;if(t===Wl)return r.COMPRESSED_RG11_EAC;if(t===qh)return r.COMPRESSED_SIGNED_RG11_EAC}if(t===jh||t===Yh||t===$h||t===Zh||t===Jh||t===Kh||t===Qh||t===eu||t===tu||t===nu||t===iu||t===ru||t===su||t===au){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===jh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Yh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===$h)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Zh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Jh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Kh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Qh)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===eu)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===tu)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===nu)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===iu)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===ru)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===su)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===au)return s===tn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===ou||t===lu||t===cu){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===ou)return s===tn?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===lu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===cu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===hu||t===uu||t===Xl||t===du){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===hu)return r.COMPRESSED_RED_RGTC1_EXT;if(t===uu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Xl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===du)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Ys?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var _1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,v1=`
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

}`,Vu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ea(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new En({vertexShader:_1,fragmentShader:v1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $n(new ks(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ku=class extends Xi{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,p=null,d=null,u=null,m=null,f=typeof XRWebGLBinding<"u",v=new Vu,g={},_=t.getContextAttributes(),b=null,T=null,S=[],M=[],I=new me,O=null,k=null,U=new Yn;U.viewport=new en;let X=new Yn;X.viewport=new en;let V=[U,X],Z=new Ll,se=null,ee=null;function re(oe){let ie=M.indexOf(oe.inputSource);if(ie===-1)return;let ve=S[ie];ve!==void 0&&(ve.update(oe.inputSource,oe.frame,l||a),ve.dispatchEvent({type:oe.type,data:oe.inputSource}))}function N(){r.removeEventListener("select",re),r.removeEventListener("selectstart",re),r.removeEventListener("selectend",re),r.removeEventListener("squeeze",re),r.removeEventListener("squeezestart",re),r.removeEventListener("squeezeend",re),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",$);for(let oe=0;oe<S.length;oe++){let ie=M[oe];ie!==null&&(M[oe]=null,S[oe].disconnect(ie))}se=null,ee=null,v.reset();for(let oe in g)delete g[oe];if(e.setRenderTarget(b),u=null,d=null,p=null,r=null,T=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(I.width,I.height,!1),k!==null){let oe=k.camera;oe.fov=k.fov,oe.zoom=k.zoom,oe.updateProjectionMatrix(),k=null}n.dispatchEvent({type:"sessionend"})}function $(oe){for(let ie=0;ie<oe.removed.length;ie++){let ve=oe.removed[ie],_e=M.indexOf(ve);_e>=0&&(M[_e]=null,S[_e].disconnect(ve))}for(let ie=0;ie<oe.added.length;ie++){let ve=oe.added[ie],_e=M.indexOf(ve);if(_e===-1){for(let A=0;A<S.length;A++){if(A>=M.length){M.push(ve),_e=A;break}if(M[A]===null){M[A]=ve,_e=A;break}}if(_e===-1)break}let Me=S[_e];Me&&Me.connect(ve)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let ie=S[oe];return ie===void 0&&(ie=new Os,S[oe]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(oe){let ie=S[oe];return ie===void 0&&(ie=new Os,S[oe]=ie),ie.getGripSpace()},this.getHand=function(oe){let ie=S[oe];return ie===void 0&&(ie=new Os,S[oe]=ie),ie.getHandSpace()},this.setFramebufferScaleFactor=function(oe){s=oe,n.isPresenting===!0&&Ye("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){o=oe,n.isPresenting===!0&&Ye("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(oe){l=oe},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return p===null&&f&&(p=new XRWebGLBinding(r,t)),p},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(oe){if(r=oe,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",re),r.addEventListener("selectstart",re),r.addEventListener("selectend",re),r.addEventListener("squeeze",re),r.addEventListener("squeezestart",re),r.addEventListener("squeezeend",re),r.addEventListener("end",N),r.addEventListener("inputsourceschange",$),_.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(I),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,ve=null,_e=null;_.depth&&(_e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=_.stencil?rs:is,ve=_.stencil?Ys:Fr);let Me={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};p=this.getBinding(),d=p.createProjectionLayer(Me),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new ci(d.textureWidth,d.textureHeight,{format:Ji,type:Oi,depthTexture:new Dr(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ie={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),T=new ci(u.framebufferWidth,u.framebufferHeight,{format:Ji,type:Oi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ue.setContext(r),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let he=new P,le=new P;function te(oe,ie){ie===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(ie.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(r===null)return;let ie=oe.near,ve=oe.far;v.texture!==null&&(v.depthNear>0&&(ie=v.depthNear),v.depthFar>0&&(ve=v.depthFar)),Z.near=X.near=U.near=ie,Z.far=X.far=U.far=ve,se===Z.near&&ee===Z.far||(r.updateRenderState({depthNear:Z.near,depthFar:Z.far}),se=Z.near,ee=Z.far),Z.layers.mask=6|oe.layers.mask,U.layers.mask=-5&Z.layers.mask,X.layers.mask=-3&Z.layers.mask;let _e=oe.parent,Me=Z.cameras;te(Z,_e);for(let A=0;A<Me.length;A++)te(Me[A],_e);Me.length===2?(function(A,w,C){he.setFromMatrixPosition(w.matrixWorld),le.setFromMatrixPosition(C.matrixWorld);let z=he.distanceTo(le),y=w.projectionMatrix.elements,B=C.projectionMatrix.elements,F=y[14]/(y[10]-1),R=y[14]/(y[10]+1),q=(y[9]+1)/y[5],Y=(y[9]-1)/y[5],J=(y[8]-1)/y[0],de=(B[8]+1)/B[0],Le=F*J,Ne=F*de,Se=z/(-J+de),ke=Se*-J;if(w.matrixWorld.decompose(A.position,A.quaternion,A.scale),A.translateX(ke),A.translateZ(Se),A.matrixWorld.compose(A.position,A.quaternion,A.scale),A.matrixWorldInverse.copy(A.matrixWorld).invert(),y[10]===-1)A.projectionMatrix.copy(w.projectionMatrix),A.projectionMatrixInverse.copy(w.projectionMatrixInverse);else{let ce=F+Se,fe=R+Se,xe=Le-ke,Ae=Ne+(z-ke),Wt=q*R/fe*ce,ft=Y*R/fe*ce;A.projectionMatrix.makePerspective(xe,Ae,Wt,ft,ce,fe),A.projectionMatrixInverse.copy(A.projectionMatrix).invert()}})(Z,U,X):Z.projectionMatrix.copy(U.projectionMatrix),k===null&&oe.isPerspectiveCamera&&(k={camera:oe,fov:oe.fov,zoom:oe.zoom}),(function(A,w,C){C===null?A.matrix.copy(w.matrixWorld):(A.matrix.copy(C.matrixWorld),A.matrix.invert(),A.matrix.multiply(w.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(w.projectionMatrix),A.projectionMatrixInverse.copy(w.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=2*Vo*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)})(oe,Z,_e)},this.getCamera=function(){return Z},this.getFoveation=function(){if(d!==null||u!==null)return c},this.setFoveation=function(oe){c=oe,d!==null&&(d.fixedFoveation=oe),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=oe)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(Z)},this.getCameraTexture=function(oe){return g[oe]};let ge=null,ue=new Xf;ue.setAnimationLoop(function(oe,ie){if(h=ie.getViewerPose(l||a),m=ie,h!==null){let ve=h.views;u!==null&&(e.setRenderTargetFramebuffer(T,u.framebuffer),e.setRenderTarget(T));let _e=!1;ve.length!==Z.cameras.length&&(Z.cameras.length=0,_e=!0);for(let A=0;A<ve.length;A++){let w=ve[A],C=null;if(u!==null)C=u.getViewport(w);else{let y=p.getViewSubImage(d,w);C=y.viewport,A===0&&(e.setRenderTargetTextures(T,y.colorTexture,y.depthStencilTexture),e.setRenderTarget(T))}let z=V[A];z===void 0&&(z=new Yn,z.layers.enable(A),z.viewport=new en,V[A]=z),z.matrix.fromArray(w.transform.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale),z.projectionMatrix.fromArray(w.projectionMatrix),z.projectionMatrixInverse.copy(z.projectionMatrix).invert(),z.viewport.set(C.x,C.y,C.width,C.height),A===0&&(Z.matrix.copy(z.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),_e===!0&&Z.cameras.push(z)}let Me=r.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&f){p=n.getBinding();let A=p.getDepthInformation(ve[0]);A&&A.isValid&&A.texture&&v.init(A,r.renderState)}if(Me&&Me.includes("camera-access")&&f){e.state.unbindTexture(),p=n.getBinding();for(let A=0;A<ve.length;A++){let w=ve[A].camera;if(w){let C=g[w];C||(C=new Ea,g[w]=C);let z=p.getCameraImage(w);C.sourceTexture=z}}}}for(let ve=0;ve<S.length;ve++){let _e=M[ve],Me=S[ve];_e!==null&&Me!==void 0&&Me.update(_e,ie,l||a)}ge&&ge(oe,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),m=null}),this.setAnimationLoop=function(oe){ge=oe},this.dispose=function(){}}},x1=new pt,Jf=new st;function y1(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===Zn&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===Zn&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(r.envMap.value=o,r.envMapRotation.value.setFromMatrix4(x1.makeRotationFromEuler(c)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply(Jf),r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,xu(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,c){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(r,s):s.isMeshLambertMaterial?(n(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(r,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(r,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(l,h,p){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Zn&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.retroreflectivity>0&&(l.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=p.texture,l.transmissionSamplerSize.value.set(p.width,p.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(r,s,c)):s.isMeshMatcapMaterial?(n(r,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(l,h){let p=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(p.matrixWorld),l.nearDistance.value=p.shadow.camera.near,l.farDistance.value=p.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(l,h,p,d){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*p,l.scale.value=.5*d,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function S1(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(d,u,m,f){if((function(v,g,_,b){let T=v.value,S=g+"_"+_;if(b[S]===void 0)return typeof T=="number"||typeof T=="boolean"?b[S]=T:ArrayBuffer.isView(T)?b[S]=T.slice():b[S]=T.clone(),!0;{let M=b[S];if(typeof T=="number"||typeof T=="boolean"){if(M!==T)return b[S]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(M.equals(T)===!1)return M.copy(T),!0}}return!1})(d,u,m,f)===!0){let v=d.__offset,g=d.value;if(Array.isArray(g)){let _=0;for(let b=0;b<g.length;b++){let T=g[b],S=h(T);l(T,d.__data,_),typeof T=="number"||typeof T=="boolean"||T.isMatrix3||ArrayBuffer.isView(T)||(_+=S.storage/Float32Array.BYTES_PER_ELEMENT)}}else l(g,d.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,d.__data)}}function l(d,u,m){typeof d=="number"||typeof d=="boolean"?u[0]=d:d.isMatrix3?(u[0]=d.elements[0],u[1]=d.elements[1],u[2]=d.elements[2],u[3]=0,u[4]=d.elements[3],u[5]=d.elements[4],u[6]=d.elements[5],u[7]=0,u[8]=d.elements[6],u[9]=d.elements[7],u[10]=d.elements[8],u[11]=0):ArrayBuffer.isView(d)?u.set(new d.constructor(d.buffer,d.byteOffset,u.length)):d.toArray(u,m)}function h(d){let u={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(u.boundary=4,u.storage=4):d.isVector2?(u.boundary=8,u.storage=8):d.isVector3||d.isColor?(u.boundary=16,u.storage=12):d.isVector4?(u.boundary=16,u.storage=16):d.isMatrix3?(u.boundary=48,u.storage=48):d.isMatrix4?(u.boundary=64,u.storage=64):d.isTexture?Ye("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(d)?(u.boundary=16,u.storage=d.byteLength):Ye("WebGLRenderer: Unsupported uniform value type.",d),u}function p(d){let u=d.target;u.removeEventListener("dispose",p);let m=a.indexOf(u.__bindingPointIndex);a.splice(m,1),i.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}return{bind:function(d,u){let m=u.program;n.uniformBlockBinding(d,m)},update:function(d,u){let m=r[d.id];m===void 0&&((function(g){let _=g.uniforms,b=0,T=16;for(let M=0,I=_.length;M<I;M++){let O=Array.isArray(_[M])?_[M]:[_[M]];for(let k=0,U=O.length;k<U;k++){let X=O[k],V=Array.isArray(X.value)?X.value:[X.value];for(let Z=0,se=V.length;Z<se;Z++){let ee=h(V[Z]),re=b%T,N=re%ee.boundary,$=re+N;b+=N,$!==0&&T-$<ee.storage&&(b+=T-$),X.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=b,b+=ee.storage}}}let S=b%T;S>0&&(b+=T-S),g.__size=b,g.__cache={}})(d),m=(function(g){let _=(function(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=_;let b=i.createBuffer(),T=g.__size,S=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,T,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,b),b})(d),r[d.id]=m,d.addEventListener("dispose",p));let f=u.program;n.updateUBOMapping(d,f);let v=e.render.frame;s[d.id]!==v&&((function(g){let _=r[g.id],b=g.uniforms,T=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let S=0,M=b.length;S<M;S++){let I=b[S];if(Array.isArray(I))for(let O=0,k=I.length;O<k;O++)c(I[O],S,O,T);else c(I,S,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)})(d),s[d.id]=v)},dispose:function(){for(let d in r)i.deleteBuffer(r[d]);a=[],r={},s={}}}}Jf.set(-1,0,0,0,1,0,0,0,1);var M1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ki=null;function b1(){return Ki===null&&(Ki=new Zr(M1,16,16,ss,Zi),Ki.name="DFG_LUT",Ki.minFilter=Jn,Ki.magFilter=Jn,Ki.wrapS=Bl,Ki.wrapT=Bl,Ki.generateMipmaps=!1,Ki.needsUpdate=!0),Ki}var ec=class{constructor(e={}){let{canvas:t=uf(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Oi}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let f=u,v=new Set([Oh,Uh,Dh]),g=new Set([Oi,Fr,Wa,Ys,Lh,Nh]),_=new Uint32Array(4),b=new Int32Array(4),T=new P,S=null,M=null,I=[],O=[],k=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let U=this,X=!1,V=null,Z=null,se=null,ee=null;this._outputColorSpace=fu;let re=0,N=0,$=null,he=-1,le=null,te=new en,ge=new en,ue=null,oe=new ht(0),ie=0,ve=t.width,_e=t.height,Me=1,A=null,w=null,C=new en(0,0,ve,_e),z=new en(0,0,ve,_e),y=!1,B=new Lr,F=!1,R=!1,q=new pt,Y=new P,J=new en,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Le=!1;function Ne(){return $===null?Me:1}let Se,ke,ce,fe,xe,Ae,Wt,ft,Te,at,De,St,$e,qt,Tt,Ft,jt,nn,sn,hi,On,gn,yn,G=n;function Yt(E,W){return t.getContext(E,W)}try{let E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Be,!1),t.addEventListener("webglcontextrestored",_r,!1),t.addEventListener("webglcontextcreationerror",on,!1),G===null){let W="webgl2";if(G=Yt(W,E),G===null)throw Yt(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}an()}catch(E){throw t.removeEventListener("webglcontextlost",Be,!1),t.removeEventListener("webglcontextrestored",_r,!1),t.removeEventListener("webglcontextcreationerror",on,!1),Qe("WebGLRenderer: "+E.message),E}function an(){Se=new Px(G),Se.init(),On=new g1(G,Se),ke=new Tx(G,Se,e,On),ce=new f1(G,Se),ke.reversedDepthBuffer&&d&&ce.buffers.depth.setReversed(!0),Z=G.createFramebuffer(),se=G.createFramebuffer(),ee=G.createFramebuffer(),fe=new Dx(G),xe=new e1,Ae=new m1(G,Se,ce,xe,ke,On,fe),Wt=new Ix(U),ft=new z0(G),gn=new Mx(G,ft),Te=new Lx(G,ft,fe,gn),at=new Ox(G,Te,ft,gn,fe),nn=new Ux(G,ke,Ae),Tt=new Ex(xe),De=new Qy(U,Wt,Se,ke,gn,Tt),St=new y1(U,xe),$e=new n1,qt=new l1(Se),jt=new Sx(U,Wt,ce,at,m,c),Ft=new p1(U,at,ke),yn=new S1(G,fe,ke,ce),sn=new bx(G,Se,fe),hi=new Nx(G,Se,fe),fe.programs=De.programs,U.capabilities=ke,U.extensions=Se,U.properties=xe,U.renderLists=$e,U.shadowMap=Ft,U.state=ce,U.info=fe}f!==Oi&&(k=new Bx(f,t.width,t.height,o,r,s));let vt=new ku(U,G);function Be(E){E.preventDefault(),ma("WebGLRenderer: Context Lost."),X=!0}function _r(){ma("WebGLRenderer: Context Restored."),X=!1;let E=fe.autoReset,W=Ft.enabled,K=Ft.autoUpdate,ae=Ft.needsUpdate,Q=Ft.type;an(),fe.autoReset=E,Ft.enabled=W,Ft.autoUpdate=K,Ft.needsUpdate=ae,Ft.type=Q}function on(E){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ut(E){let W=E.target;W.removeEventListener("dispose",ut),(function(K){(function(ae){let Q=xe.get(ae).programs;Q!==void 0&&(Q.forEach(function(ye){De.releaseProgram(ye)}),ae.isShaderMaterial&&De.releaseShaderCache(ae))})(K),xe.remove(K)})(W)}function rn(E,W,K,ae){V!==null&&E.isNodeMaterial&&V.setObject(ae,E),F===!0&&Tt.setState(E,K,!1),E.transparent===!0&&E.side===Yi&&E.forceSinglePass===!1?(E.side=Zn,E.needsUpdate=!0,si(E,W,ae),E.side=Xs,E.needsUpdate=!0,si(E,W,ae),E.side=Yi):si(E,W,ae)}this.xr=vt,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let E=Se.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Se.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Me},this.setPixelRatio=function(E){E!==void 0&&(Me=E,this.setSize(ve,_e,!1))},this.getSize=function(E){return E.set(ve,_e)},this.setSize=function(E,W,K=!0){vt.isPresenting?Ye("WebGLRenderer: Can't change size while VR device is presenting."):(ve=E,_e=W,t.width=Math.floor(E*Me),t.height=Math.floor(W*Me),K===!0&&(t.style.width=E+"px",t.style.height=W+"px"),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,E,W))},this.getDrawingBufferSize=function(E){return E.set(ve*Me,_e*Me).floor()},this.setDrawingBufferSize=function(E,W,K){ve=E,_e=W,Me=K,t.width=Math.floor(E*K),t.height=Math.floor(W*K),this.setViewport(0,0,E,W)},this.setEffects=function(E){if(f!==Oi){if(E){for(let W=0;W<E.length;W++)if(E[W].isOutputPass===!0){Ye("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}k.setEffects(E||[])}else Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(E){return E.copy(te)},this.getViewport=function(E){return E.copy(C)},this.setViewport=function(E,W,K,ae){E.isVector4?C.set(E.x,E.y,E.z,E.w):C.set(E,W,K,ae),ce.viewport(te.copy(C).multiplyScalar(Me).round())},this.getScissor=function(E){return E.copy(z)},this.setScissor=function(E,W,K,ae){E.isVector4?z.set(E.x,E.y,E.z,E.w):z.set(E,W,K,ae),ce.scissor(ge.copy(z).multiplyScalar(Me).round())},this.getScissorTest=function(){return y},this.setScissorTest=function(E){ce.setScissorTest(y=E)},this.setOpaqueSort=function(E){A=E},this.setTransparentSort=function(E){w=E},this.getClearColor=function(E){return E.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(E=!0,W=!0,K=!0){let ae=0;if(E){let Q=!1;if($!==null){let ye=$.texture.format;Q=v.has(ye)}if(Q){let ye=$.texture.type,Ee=g.has(ye),Ce=jt.getClearColor(),Pe=jt.getClearAlpha(),Fe=Ce.r,Ze=Ce.g,Je=Ce.b;Ee?(_[0]=Fe,_[1]=Ze,_[2]=Je,_[3]=Pe,G.clearBufferuiv(G.COLOR,0,_)):(b[0]=Fe,b[1]=Ze,b[2]=Je,b[3]=Pe,G.clearBufferiv(G.COLOR,0,b))}else ae|=G.COLOR_BUFFER_BIT}W&&(ae|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(ae|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ae!==0&&G.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),V=E},this.dispose=function(){t.removeEventListener("webglcontextlost",Be,!1),t.removeEventListener("webglcontextrestored",_r,!1),t.removeEventListener("webglcontextcreationerror",on,!1),jt.dispose(),$e.dispose(),qt.dispose(),xe.dispose(),Wt.dispose(),at.dispose(),gn.dispose(),yn.dispose(),De.dispose(),vt.dispose(),vt.removeEventListener("sessionstart",He),vt.removeEventListener("sessionend",Xt),Ut.stop()},this.renderBufferDirect=function(E,W,K,ae,Q,ye){W===null&&(W=de);let Ee=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,Ce=(function(rt,xt,We,Xe,D){xt.isScene!==!0&&(xt=de),Ae.resetTextureUnits();let ne=xt.fog,pe=Xe.isMeshStandardMaterial||Xe.isMeshLambertMaterial||Xe.isMeshPhongMaterial?xt.environment:null,et=$===null?U.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Ct.workingColorSpace,lt=Xe.isMeshStandardMaterial||Xe.isMeshLambertMaterial&&!Xe.envMap||Xe.isMeshPhongMaterial&&!Xe.envMap,ot=Wt.get(Xe.envMap||pe,lt),Ve=Xe.vertexColors===!0&&!!We.attributes.color&&We.attributes.color.itemSize===4,Lt=!!We.attributes.tangent&&(!!Xe.normalMap||Xe.anisotropy>0),Gt=!!We.morphAttributes.position,ct=!!We.morphAttributes.normal,Nt=!!We.morphAttributes.color,Vt=Di;Xe.toneMapped&&($!==null&&$.isXRRenderTarget!==!0||(Vt=U.toneMapping));let _t=We.morphAttributes.position||We.morphAttributes.normal||We.morphAttributes.color,Rn=_t!==void 0?_t.length:0,ze=xe.get(Xe),Cn=M.state.lights;if(F===!0&&(R===!0||rt!==le)){let Kt=rt===le&&Xe.id===he;Tt.setState(Xe,rt,Kt)}let Sn=!1;Xe.version===ze.__version?ze.needsLights&&ze.lightsStateVersion!==Cn.state.version||ze.outputColorSpace!==et||D.isBatchedMesh&&ze.batching===!1?Sn=!0:D.isBatchedMesh||ze.batching!==!0?D.isBatchedMesh&&ze.batchingColor===!0&&D._colorsTexture===null||D.isBatchedMesh&&ze.batchingColor===!1&&D._colorsTexture!==null||D.isInstancedMesh&&ze.instancing===!1?Sn=!0:D.isInstancedMesh||ze.instancing!==!0?D.isSkinnedMesh&&ze.skinning===!1?Sn=!0:D.isSkinnedMesh||ze.skinning!==!0?D.isInstancedMesh&&ze.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&ze.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&ze.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&ze.instancingMorph===!1&&D.morphTexture!==null||ze.envMap!==ot||Xe.fog===!0&&ze.fog!==ne?Sn=!0:ze.numClippingPlanes===void 0||ze.numClippingPlanes===Tt.numPlanes&&ze.numIntersection===Tt.numIntersection?(ze.vertexAlphas!==Ve||ze.vertexTangents!==Lt||ze.morphTargets!==Gt||ze.morphNormals!==ct||ze.morphColors!==Nt||ze.toneMapping!==Vt||ze.morphTargetsCount!==Rn||!!ze.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(Sn=!0):Sn=!0:Sn=!0:Sn=!0:Sn=!0:(Sn=!0,ze.__version=Xe.version);let kn=ze.currentProgram;Sn===!0&&(kn=si(Xe,xt,D),V&&Xe.isNodeMaterial&&V.onUpdateProgram(Xe,kn,ze));let nr=!1,_n=!1,Mn=!1,Et=kn.getUniforms(),Jt=ze.uniforms;if(ce.useProgram(kn.program)&&(nr=!0,_n=!0,Mn=!0),Xe.id!==he&&(he=Xe.id,_n=!0),ze.needsLights){let Kt=(function(Dn,xi){if(Dn.length===0)return null;if(Dn.length===1)return Dn[0].texture!==null?Dn[0]:null;T.setFromMatrixPosition(xi.matrixWorld);for(let ui=0,ir=Dn.length;ui<ir;ui++){let di=Dn[ui];if(di.texture!==null&&di.boundingBox.containsPoint(T))return di}return null})(M.state.lightProbeGridArray,D);ze.lightProbeGrid!==Kt&&(ze.lightProbeGrid=Kt,_n=!0)}if(nr||le!==rt){ce.buffers.depth.getReversed()&&rt.reversedDepth!==!0&&(rt._reversedDepth=!0,rt.updateProjectionMatrix()),Et.setValue(G,"projectionMatrix",rt.projectionMatrix),Et.setValue(G,"viewMatrix",rt.matrixWorldInverse);let Kt=Et.map.cameraPosition;Kt!==void 0&&Kt.setValue(G,Y.setFromMatrixPosition(rt.matrixWorld)),ke.logarithmicDepthBuffer&&Et.setValue(G,"logDepthBufFC",2/(Math.log(rt.far+1)/Math.LN2)),(Xe.isMeshPhongMaterial||Xe.isMeshToonMaterial||Xe.isMeshLambertMaterial||Xe.isMeshBasicMaterial||Xe.isMeshStandardMaterial||Xe.isShaderMaterial)&&Et.setValue(G,"isOrthographic",rt.isOrthographicCamera===!0),le!==rt&&(le=rt,_n=!0,Mn=!0)}if(ze.needsLights&&(Cn.state.sunShadowMap.length>0&&Et.setValue(G,"sunShadowMap",Cn.state.sunShadowMap,Ae),Cn.state.directionalShadowMap.length>0&&Et.setValue(G,"directionalShadowMap",Cn.state.directionalShadowMap,Ae),Cn.state.spotShadowMap.length>0&&Et.setValue(G,"spotShadowMap",Cn.state.spotShadowMap,Ae),Cn.state.pointShadowMap.length>0&&Et.setValue(G,"pointShadowMap",Cn.state.pointShadowMap,Ae)),D.isSkinnedMesh){Et.setOptional(G,D,"bindMatrix"),Et.setOptional(G,D,"bindMatrixInverse");let Kt=D.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),Et.setValue(G,"boneTexture",Kt.boneTexture,Ae))}D.isBatchedMesh&&(Et.setOptional(G,D,"batchingTexture"),Et.setValue(G,"batchingTexture",D._matricesTexture,Ae),Et.setOptional(G,D,"batchingIdTexture"),Et.setValue(G,"batchingIdTexture",D._indirectTexture,Ae),Et.setOptional(G,D,"batchingColorTexture"),D._colorsTexture!==null&&Et.setValue(G,"batchingColorTexture",D._colorsTexture,Ae));let Gn=We.morphAttributes;if(Gn.position===void 0&&Gn.normal===void 0&&Gn.color===void 0||nn.update(D,We,kn),(_n||ze.receiveShadow!==D.receiveShadow)&&(ze.receiveShadow=D.receiveShadow,Et.setValue(G,"receiveShadow",D.receiveShadow)),(Xe.isMeshStandardMaterial||Xe.isMeshLambertMaterial||Xe.isMeshPhongMaterial)&&Xe.envMap===null&&xt.environment!==null&&(Jt.envMapIntensity.value=xt.environmentIntensity),Jt.dfgLUT!==void 0&&(Jt.dfgLUT.value=b1()),_n){if(Et.setValue(G,"toneMappingExposure",U.toneMappingExposure),ze.needsLights&&(Dt=Mn,(vn=Jt).ambientLightColor.needsUpdate=Dt,vn.lightProbe.needsUpdate=Dt,vn.sunLights.needsUpdate=Dt,vn.sunLightShadows.needsUpdate=Dt,vn.directionalLights.needsUpdate=Dt,vn.directionalLightShadows.needsUpdate=Dt,vn.pointLights.needsUpdate=Dt,vn.pointLightShadows.needsUpdate=Dt,vn.spotLights.needsUpdate=Dt,vn.spotLightShadows.needsUpdate=Dt,vn.rectAreaLights.needsUpdate=Dt,vn.hemisphereLights.needsUpdate=Dt),ne&&Xe.fog===!0&&St.refreshFogUniforms(Jt,ne),St.refreshMaterialUniforms(Jt,Xe,Me,_e,M.state.transmissionRenderTarget[rt.id]),ze.needsLights&&ze.lightProbeGrid){let Kt=ze.lightProbeGrid;Jt.probesSH.value=Kt.texture,Jt.probesMin.value.copy(Kt.boundingBox.min),Jt.probesMax.value.copy(Kt.boundingBox.max),Jt.probesResolution.value.copy(Kt.resolution)}Zs.upload(G,dn(ze),Jt,Ae)}var vn,Dt;if(Xe.isShaderMaterial&&Xe.uniformsNeedUpdate===!0&&(Zs.upload(G,dn(ze),Jt,Ae),Xe.uniformsNeedUpdate=!1),Xe.isSpriteMaterial&&Et.setValue(G,"center",D.center),Et.setValue(G,"modelViewMatrix",D.modelViewMatrix),Et.setValue(G,"normalMatrix",D.normalMatrix),Et.setValue(G,"modelMatrix",D.matrixWorld),Xe.uniformsGroups!==void 0){let Kt=Xe.uniformsGroups;for(let Dn=0,xi=Kt.length;Dn<xi;Dn++){let ui=Kt[Dn];yn.update(ui,kn),yn.bind(ui,kn)}}return kn})(E,W,K,ae,Q);ce.setMaterial(ae,Ee);let Pe=K.index,Fe=1;if(ae.wireframe===!0){if(Pe=Te.getWireframeAttribute(K),Pe===void 0)return;Fe=2}let Ze=K.drawRange,Je=K.attributes.position,Oe=Ze.start*Fe,gt=(Ze.start+Ze.count)*Fe;ye!==null&&(Oe=Math.max(Oe,ye.start*Fe),gt=Math.min(gt,(ye.start+ye.count)*Fe)),Pe!==null?(Oe=Math.max(Oe,0),gt=Math.min(gt,Pe.count)):Je!=null&&(Oe=Math.max(Oe,0),gt=Math.min(gt,Je.count));let ln=gt-Oe;if(ln<0||ln===1/0)return;let Bt;gn.setup(Q,ae,Ce,K,Pe);let zt=sn;if(Pe!==null&&(Bt=ft.get(Pe),zt=hi,zt.setIndex(Bt)),Q.isMesh)ae.wireframe===!0?(ce.setLineWidth(ae.wireframeLinewidth*Ne()),zt.setMode(G.LINES)):zt.setMode(G.TRIANGLES);else if(Q.isLine){let rt=ae.linewidth;rt===void 0&&(rt=1),ce.setLineWidth(rt*Ne()),Q.isLineSegments?zt.setMode(G.LINES):Q.isLineLoop?zt.setMode(G.LINE_LOOP):zt.setMode(G.LINE_STRIP)}else Q.isPoints?zt.setMode(G.POINTS):Q.isSprite&&zt.setMode(G.TRIANGLES);if(Q.isBatchedMesh)if(Se.get("WEBGL_multi_draw"))zt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{let rt=Q._multiDrawStarts,xt=Q._multiDrawCounts,We=Q._multiDrawCount,Xe=Pe?ft.get(Pe).bytesPerElement:1,D=xe.get(ae).currentProgram.getUniforms();for(let ne=0;ne<We;ne++)D.setValue(G,"_gl_DrawID",ne),zt.render(rt[ne]/Xe,xt[ne])}else if(Q.isInstancedMesh)zt.renderInstances(Oe,ln,Q.count);else if(K.isInstancedBufferGeometry){let rt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,xt=Math.min(K.instanceCount,rt);zt.renderInstances(Oe,ln,xt)}else zt.render(Oe,ln)},this.compile=function(E,W,K=null){K===null&&(K=E),V!==null&&V.renderStart(E,W,K),M=qt.get(K),M.init(W),O.push(M),K.traverseVisible(function(Q){Q.isLight&&Q.layers.test(W.layers)&&(M.pushLight(Q),Q.castShadow&&M.pushShadow(Q))}),E!==K&&E.traverseVisible(function(Q){Q.isLight&&Q.layers.test(W.layers)&&(M.pushLight(Q),Q.castShadow&&M.pushShadow(Q))}),M.setupLights(),V!==null&&V.updateLights(M.state.lightsArray),R=this.localClippingEnabled,F=Tt.init(this.clippingPlanes,R),F===!0&&Tt.setGlobalState(this.clippingPlanes,W),V!==null&&Ft.render(M.state.shadowsArray,K,W);let ae=new Set;return E.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;let ye=Q.material;if(ye)if(Array.isArray(ye))for(let Ee=0;Ee<ye.length;Ee++){let Ce=ye[Ee];rn(Ce,K,W,Q),ae.add(Ce)}else rn(ye,K,W,Q),ae.add(ye)}),M=O.pop(),V!==null&&V.renderEnd(),ae},this.compileAsync=function(E,W,K=null){let ae=this.compile(E,W,K);return new Promise(Q=>{function ye(){ae.forEach(function(Ee){let Ce=xe.get(Ee).currentProgram;(Ce===void 0||Ce.isReady())&&ae.delete(Ee)}),ae.size!==0?setTimeout(ye,10):Q(E)}Se.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Fi=null;function He(){Ut.stop()}function Xt(){Ut.start()}let Ut=new Xf;function ri(E,W,K,ae){if(E.visible===!1)return;if(E.layers.test(W.layers)){if(E.isGroup)K=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(W);else if(E.isLightProbeGrid)M.pushLightProbeGrid(E);else if(E.isLight)M.pushLight(E),E.castShadow&&M.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(B)){ae&&J.setFromMatrixPosition(E.matrixWorld).applyMatrix4(q);let ye=at.update(E),Ee=E.material;Ee.visible&&S.push(E,ye,Ee,K,J.z,null,W)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(B))){let ye=at.update(E),Ee=E.material;if(ae&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),J.copy(E.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),J.copy(ye.boundingSphere.center)),J.applyMatrix4(E.matrixWorld).applyMatrix4(q)),Array.isArray(Ee)){let Ce=ye.groups;for(let Pe=0,Fe=Ce.length;Pe<Fe;Pe++){let Ze=Ce[Pe],Je=Ee[Ze.materialIndex];Je&&Je.visible&&S.push(E,ye,Je,K,J.z,Ze,W)}}else Ee.visible&&S.push(E,ye,Ee,K,J.z,null,W)}}let Q=E.children;for(let ye=0,Ee=Q.length;ye<Ee;ye++)ri(Q[ye],W,K,ae)}function tr(E,W,K,ae){let{opaque:Q,transmissive:ye,transparent:Ee}=E;M.setupLightsView(K),F===!0&&Tt.setGlobalState(U.clippingPlanes,K),ae&&ce.viewport(te.copy(ae)),Q.length>0&&Fn(Q,W,K),ye.length>0&&Fn(ye,W,K),Ee.length>0&&Fn(Ee,W,K),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function Qn(E,W,K,ae){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[ae.id]===void 0){let Je=Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[ae.id]=new ci(1,1,{generateMipmaps:!0,type:Je?Zi:Oi,minFilter:ns,samples:Math.max(4,ke.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ct.workingColorSpace})}let Q=M.state.transmissionRenderTarget[ae.id],ye=ae.viewport||te;Q.setSize(ye.z*U.transmissionResolutionScale,ye.w*U.transmissionResolutionScale);let Ee=U.getRenderTarget(),Ce=U.getActiveCubeFace(),Pe=U.getActiveMipmapLevel();U.setRenderTarget(Q),U.getClearColor(oe),ie=U.getClearAlpha(),ie<1&&U.setClearColor(16777215,.5),U.clear(),Le&&jt.render(K);let Fe=U.toneMapping;U.toneMapping=Di;let Ze=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),M.setupLightsView(ae),F===!0&&Tt.setGlobalState(U.clippingPlanes,ae),Fn(E,K,ae),Ae.updateMultisampleRenderTarget(Q),Ae.updateRenderTargetMipmap(Q),Se.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Oe=0,gt=W.length;Oe<gt;Oe++){let ln=W[Oe],{object:Bt,geometry:zt,material:rt,group:xt}=ln;if(rt.side===Yi&&Bt.layers.test(ae.layers)){let We=rt.side;rt.side=Zn,rt.needsUpdate=!0,Bn(Bt,K,ae,zt,rt,xt),rt.side=We,rt.needsUpdate=!0,Je=!0}}Je===!0&&(Ae.updateMultisampleRenderTarget(Q),Ae.updateRenderTargetMipmap(Q))}U.setRenderTarget(Ee,Ce,Pe),U.setClearColor(oe,ie),Ze!==void 0&&(ae.viewport=Ze),U.toneMapping=Fe}function Fn(E,W,K){let ae=W.isScene===!0?W.overrideMaterial:null;for(let Q=0,ye=E.length;Q<ye;Q++){let Ee=E[Q],{object:Ce,geometry:Pe,group:Fe}=Ee,Ze=Ee.material;Ze.allowOverride===!0&&ae!==null&&(Ze=ae),Ce.layers.test(K.layers)&&Bn(Ce,W,K,Pe,Ze,Fe)}}function Bn(E,W,K,ae,Q,ye){V!==null&&Q.isNodeMaterial&&V.setObject(E,Q),E.onBeforeRender(U,W,K,ae,Q,ye),E.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Q.onBeforeRender(U,W,K,ae,E,ye),Q.transparent===!0&&Q.side===Yi&&Q.forceSinglePass===!1?(Q.side=Zn,Q.needsUpdate=!0,U.renderBufferDirect(K,W,ae,Q,E,ye),Q.side=Xs,Q.needsUpdate=!0,U.renderBufferDirect(K,W,ae,Q,E,ye),Q.side=Yi):U.renderBufferDirect(K,W,ae,Q,E,ye),E.onAfterRender(U,W,K,ae,Q,ye)}function si(E,W,K){W.isScene!==!0&&(W=de);let ae=xe.get(E),Q=M.state.lights,ye=M.state.shadowsArray,Ee=Q.state.version,Ce=De.getParameters(E,Q.state,ye,W,K,M.state.lightProbeGridArray),Pe=De.getProgramCacheKey(Ce),Fe=ae.programs;ae.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?W.environment:null,ae.fog=W.fog;let Ze=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;ae.envMap=Wt.get(E.envMap||ae.environment,Ze),ae.envMapRotation=ae.environment!==null&&E.envMap===null?W.environmentRotation:E.envMapRotation,Fe===void 0&&(E.addEventListener("dispose",ut),Fe=new Map,ae.programs=Fe);let Je=Fe.get(Pe);if(Je!==void 0){if(ae.currentProgram===Je&&ae.lightsStateVersion===Ee)return An(E,Ce),Je}else Ce.uniforms=De.getUniforms(E),V!==null&&E.isNodeMaterial&&V.build(E,K,Ce),E.onBeforeCompile(Ce,U),Je=De.acquireProgram(Ce,Pe),Fe.set(Pe,Je),ae.uniforms=Ce.uniforms;let Oe=ae.uniforms;return(E.isShaderMaterial||E.isRawShaderMaterial)&&E.clipping!==!0||(Oe.clippingPlanes=Tt.uniform),An(E,Ce),ae.needsLights=(function(gt){return gt.isMeshLambertMaterial||gt.isMeshToonMaterial||gt.isMeshPhongMaterial||gt.isMeshStandardMaterial||gt.isShadowMaterial||gt.isShaderMaterial&&gt.lights===!0})(E),ae.lightsStateVersion=Ee,ae.needsLights&&(Oe.ambientLightColor.value=Q.state.ambient,Oe.lightProbe.value=Q.state.probe,Oe.sunLights.value=Q.state.sun,Oe.sunLightShadows.value=Q.state.sunShadow,Oe.directionalLights.value=Q.state.directional,Oe.directionalLightShadows.value=Q.state.directionalShadow,Oe.spotLights.value=Q.state.spot,Oe.spotLightShadows.value=Q.state.spotShadow,Oe.rectAreaLights.value=Q.state.rectArea,Oe.ltc_1.value=Q.state.rectAreaLTC1,Oe.ltc_2.value=Q.state.rectAreaLTC2,Oe.pointLights.value=Q.state.point,Oe.pointLightShadows.value=Q.state.pointShadow,Oe.hemisphereLights.value=Q.state.hemi,Oe.sunShadowMatrix.value=Q.state.sunShadowMatrix,Oe.sunShadowCascade.value=Q.state.sunShadowCascade,Oe.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Oe.spotLightMatrix.value=Q.state.spotLightMatrix,Oe.spotLightMap.value=Q.state.spotLightMap,Oe.pointShadowMatrix.value=Q.state.pointShadowMatrix),ae.lightProbeGrid=M.state.lightProbeGridArray.length>0,ae.currentProgram=Je,ae.uniformsList=null,Je}function dn(E){if(E.uniformsList===null){let W=E.currentProgram.getUniforms();E.uniformsList=Zs.seqWithValue(W.seq,E.uniforms)}return E.uniformsList}function An(E,W){let K=xe.get(E);K.outputColorSpace=W.outputColorSpace,K.batching=W.batching,K.batchingColor=W.batchingColor,K.instancing=W.instancing,K.instancingColor=W.instancingColor,K.instancingMorph=W.instancingMorph,K.skinning=W.skinning,K.morphTargets=W.morphTargets,K.morphNormals=W.morphNormals,K.morphColors=W.morphColors,K.morphTargetsCount=W.morphTargetsCount,K.numClippingPlanes=W.numClippingPlanes,K.numIntersection=W.numClipIntersection,K.vertexAlphas=W.vertexAlphas,K.vertexTangents=W.vertexTangents,K.toneMapping=W.toneMapping}function Nn(E){let W=xe.get(E);return W.__readFormat===E.format&&W.__readType===E.type||(W.__readFormat=E.format,W.__readType=E.type,W.__formatReadable=ke.textureFormatReadable(E.format),W.__typeReadable=ke.textureTypeReadable(E.type)),W}Ut.setAnimationLoop(function(E){Fi&&Fi(E)}),typeof self<"u"&&Ut.setContext(self),this.setAnimationLoop=function(E){Fi=E,vt.setAnimationLoop(E),E===null?Ut.stop():Ut.start()},vt.addEventListener("sessionstart",He),vt.addEventListener("sessionend",Xt),this.render=function(E,W){if(W!==void 0&&W.isCamera!==!0)return void Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(X===!0)return;V!==null&&V.renderStart(E,W);let K=vt.enabled===!0&&vt.isPresenting===!0,ae=k!==null&&($===null||K)&&k.begin(U,$);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),vt.enabled!==!0||vt.isPresenting!==!0||k!==null&&k.isCompositing()!==!1||(vt.cameraAutoUpdate===!0&&vt.updateCamera(W),W=vt.getCamera()),E.isScene===!0&&E.onBeforeRender(U,E,W,$),M=qt.get(E,O.length),M.init(W),M.state.textureUnits=Ae.getTextureUnits(),O.push(M),q.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),B.setFromProjectionMatrix(q,_u,W.reversedDepth),R=this.localClippingEnabled,F=Tt.init(this.clippingPlanes,R),S=$e.get(E,I.length),S.init(),I.push(S),vt.enabled===!0&&vt.isPresenting===!0){let ye=U.xr.getDepthSensingMesh();ye!==null&&ri(ye,W,-1/0,U.sortObjects)}ri(E,W,0,U.sortObjects),S.finish(),V!==null&&V.updateLights(M.state.lightsArray),U.sortObjects===!0&&S.sort(A,w),Le=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,Le&&jt.addToRenderList(S,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),F===!0&&Tt.beginShadows();let Q=M.state.shadowsArray;if(Ft.render(Q,E,W),F===!0&&Tt.endShadows(),(ae&&k.hasRenderPass())===!1){let ye=S.opaque,Ee=S.transmissive;if(M.setupLights(),W.isArrayCamera){let Ce=W.cameras;if(Ee.length>0)for(let Pe=0,Fe=Ce.length;Pe<Fe;Pe++)Qn(ye,Ee,E,Ce[Pe]);Le&&jt.render(E);for(let Pe=0,Fe=Ce.length;Pe<Fe;Pe++){let Ze=Ce[Pe];tr(S,E,Ze,Ze.viewport)}}else Ee.length>0&&Qn(ye,Ee,E,W),Le&&jt.render(E),tr(S,E,W)}$!==null&&N===0&&(Ae.updateMultisampleRenderTarget($),Ae.updateRenderTargetMipmap($)),ae&&k.end(U),E.isScene===!0&&E.onAfterRender(U,E,W),gn.resetDefaultState(),he=-1,le=null,O.pop(),O.length>0?(M=O[O.length-1],Ae.setTextureUnits(M.state.textureUnits),F===!0&&Tt.setGlobalState(U.clippingPlanes,M.state.camera)):M=null,I.pop(),S=I.length>0?I[I.length-1]:null,V!==null&&V.renderEnd()},this.getActiveCubeFace=function(){return re},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(E,W,K){let ae=xe.get(E);ae.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,ae.__autoAllocateDepthBuffer===!1&&(ae.__useRenderToTexture=!1),xe.get(E.texture).__webglTexture=W,xe.get(E.depthTexture).__webglTexture=ae.__autoAllocateDepthBuffer?void 0:K,ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,W){let K=xe.get(E);K.__webglFramebuffer=W,K.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(E,W=0,K=0){$=E,re=W,N=K;let ae=null,Q=!1,ye=!1;if(E){let Ee=xe.get(E);if(Ee.__useDefaultFramebuffer!==void 0)return ce.bindFramebuffer(G.FRAMEBUFFER,Ee.__webglFramebuffer),te.copy(E.viewport),ge.copy(E.scissor),ue=E.scissorTest,ce.viewport(te),ce.scissor(ge),ce.setScissorTest(ue),void(he=-1);if(Ee.__webglFramebuffer===void 0)Ae.setupRenderTarget(E);else if(Ee.__hasExternalTextures)Ae.rebindTextures(E,xe.get(E.texture).__webglTexture,xe.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Fe=E.depthTexture;if(Ee.__boundDepthTexture!==Fe){if(Fe!==null&&xe.has(Fe)&&(E.width!==Fe.image.width||E.height!==Fe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ae.setupDepthRenderbuffer(E)}}let Ce=E.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ye=!0);let Pe=xe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(ae=Array.isArray(Pe[W])?Pe[W][K]:Pe[W],Q=!0):ae=E.samples>0&&Ae.useMultisampledRTT(E)===!1?xe.get(E).__webglMultisampledFramebuffer:Array.isArray(Pe)?Pe[K]:Pe,te.copy(E.viewport),ge.copy(E.scissor),ue=E.scissorTest}else te.copy(C).multiplyScalar(Me).floor(),ge.copy(z).multiplyScalar(Me).floor(),ue=y;if(K!==0&&(ae=Z),ce.bindFramebuffer(G.FRAMEBUFFER,ae)&&ce.drawBuffers(E,ae),ce.viewport(te),ce.scissor(ge),ce.setScissorTest(ue),Q){let Ee=xe.get(E.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ee.__webglTexture,K)}else if(ye){let Ee=W;for(let Ce=0;Ce<E.textures.length;Ce++){let Pe=xe.get(E.textures[Ce]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Ce,Pe.__webglTexture,K,Ee)}}else if(E!==null&&K!==0){let Ee=xe.get(E.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ee.__webglTexture,K)}he=-1},this.readRenderTargetPixels=function(E,W,K,ae,Q,ye,Ee,Ce=0){if(!E||!E.isWebGLRenderTarget)return void Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Pe=Pe[Ee]),Pe){ce.bindFramebuffer(G.FRAMEBUFFER,Pe);try{let Fe=E.textures[Ce],Ze=Fe.format,Je=Fe.type;E.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Ce);let Oe=Nn(Fe);if(Oe.__formatReadable===!1)return void Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(Oe.__typeReadable===!1)return void Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");W>=0&&W<=E.width-ae&&K>=0&&K<=E.height-Q&&G.readPixels(W,K,ae,Q,On.convert(Ze),On.convert(Je),ye)}finally{let Fe=$!==null?xe.get($).__webglFramebuffer:null;ce.bindFramebuffer(G.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(E,W,K,ae,Q,ye,Ee,Ce=0){if(!E||!E.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Pe=Pe[Ee]),Pe){if(W>=0&&W<=E.width-ae&&K>=0&&K<=E.height-Q){ce.bindFramebuffer(G.FRAMEBUFFER,Pe);let Fe=E.textures[Ce],Ze=Fe.format,Je=Fe.type;E.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Ce);let Oe=Nn(Fe);if(Oe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Oe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let gt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,gt),G.bufferData(G.PIXEL_PACK_BUFFER,ye.byteLength,G.STREAM_READ),G.readPixels(W,K,ae,Q,On.convert(Ze),On.convert(Je),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let ln=$!==null?xe.get($).__webglFramebuffer:null;ce.bindFramebuffer(G.FRAMEBUFFER,ln);let Bt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await pf(G,Bt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,gt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,ye),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(gt),G.deleteSync(Bt),ye}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,W=null,K=0){let ae=Math.pow(2,-K),Q=Math.floor(E.image.width*ae),ye=Math.floor(E.image.height*ae),Ee=W!==null?W.x:0,Ce=W!==null?W.y:0;Ae.setTexture2D(E,0),G.copyTexSubImage2D(G.TEXTURE_2D,K,0,0,Ee,Ce,Q,ye),ce.unbindTexture()},this.copyTextureToTexture=function(E,W,K=null,ae=null,Q=0,ye=0){let Ee,Ce,Pe,Fe,Ze,Je,Oe,gt,ln,Bt=E.isCompressedTexture?E.mipmaps[ye]:E.image;if(K!==null)Ee=K.max.x-K.min.x,Ce=K.max.y-K.min.y,Pe=K.isBox3?K.max.z-K.min.z:1,Fe=K.min.x,Ze=K.min.y,Je=K.isBox3?K.min.z:0;else{let ot=Math.pow(2,-Q);Ee=Math.floor(Bt.width*ot),Ce=Math.floor(Bt.height*ot),Pe=E.isDataArrayTexture?Bt.depth:E.isData3DTexture?Math.floor(Bt.depth*ot):1,Fe=0,Ze=0,Je=0}ae!==null?(Oe=ae.x,gt=ae.y,ln=ae.z):(Oe=0,gt=0,ln=0);let zt=On.convert(W.format),rt=On.convert(W.type),xt;W.isData3DTexture?(Ae.setTexture3D(W,0),xt=G.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(Ae.setTexture2DArray(W,0),xt=G.TEXTURE_2D_ARRAY):(Ae.setTexture2D(W,0),xt=G.TEXTURE_2D),ce.activeTexture(G.TEXTURE0),ce.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,W.flipY),ce.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),ce.pixelStorei(G.UNPACK_ALIGNMENT,W.unpackAlignment);let We=ce.getParameter(G.UNPACK_ROW_LENGTH),Xe=ce.getParameter(G.UNPACK_IMAGE_HEIGHT),D=ce.getParameter(G.UNPACK_SKIP_PIXELS),ne=ce.getParameter(G.UNPACK_SKIP_ROWS),pe=ce.getParameter(G.UNPACK_SKIP_IMAGES);ce.pixelStorei(G.UNPACK_ROW_LENGTH,Bt.width),ce.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Bt.height),ce.pixelStorei(G.UNPACK_SKIP_PIXELS,Fe),ce.pixelStorei(G.UNPACK_SKIP_ROWS,Ze),ce.pixelStorei(G.UNPACK_SKIP_IMAGES,Je);let et=E.isDataArrayTexture||E.isData3DTexture,lt=W.isDataArrayTexture||W.isData3DTexture;if(E.isDepthTexture){let ot=xe.get(E),Ve=xe.get(W),Lt=xe.get(ot.__renderTarget),Gt=xe.get(Ve.__renderTarget);ce.bindFramebuffer(G.READ_FRAMEBUFFER,Lt.__webglFramebuffer),ce.bindFramebuffer(G.DRAW_FRAMEBUFFER,Gt.__webglFramebuffer);for(let ct=0;ct<Pe;ct++)et&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,xe.get(E).__webglTexture,Q,Je+ct),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,xe.get(W).__webglTexture,ye,ln+ct)),G.blitFramebuffer(Fe,Ze,Ee,Ce,Oe,gt,Ee,Ce,G.DEPTH_BUFFER_BIT,G.NEAREST);ce.bindFramebuffer(G.READ_FRAMEBUFFER,null),ce.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(Q!==0||E.isRenderTargetTexture||xe.has(E)){let ot=xe.get(E),Ve=xe.get(W);ce.bindFramebuffer(G.READ_FRAMEBUFFER,se),ce.bindFramebuffer(G.DRAW_FRAMEBUFFER,ee);for(let Lt=0;Lt<Pe;Lt++)et?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ot.__webglTexture,Q,Je+Lt):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,ot.__webglTexture,Q),lt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ve.__webglTexture,ye,ln+Lt):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ve.__webglTexture,ye),Q!==0?G.blitFramebuffer(Fe,Ze,Ee,Ce,Oe,gt,Ee,Ce,G.COLOR_BUFFER_BIT,G.NEAREST):lt?G.copyTexSubImage3D(xt,ye,Oe,gt,ln+Lt,Fe,Ze,Ee,Ce):G.copyTexSubImage2D(xt,ye,Oe,gt,Fe,Ze,Ee,Ce);ce.bindFramebuffer(G.READ_FRAMEBUFFER,null),ce.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else lt?E.isDataTexture||E.isData3DTexture?G.texSubImage3D(xt,ye,Oe,gt,ln,Ee,Ce,Pe,zt,rt,Bt.data):W.isCompressedArrayTexture?G.compressedTexSubImage3D(xt,ye,Oe,gt,ln,Ee,Ce,Pe,zt,Bt.data):G.texSubImage3D(xt,ye,Oe,gt,ln,Ee,Ce,Pe,zt,rt,Bt):E.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,ye,Oe,gt,Ee,Ce,zt,rt,Bt.data):E.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,ye,Oe,gt,Bt.width,Bt.height,zt,Bt.data):G.texSubImage2D(G.TEXTURE_2D,ye,Oe,gt,Ee,Ce,zt,rt,Bt);ce.pixelStorei(G.UNPACK_ROW_LENGTH,We),ce.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Xe),ce.pixelStorei(G.UNPACK_SKIP_PIXELS,D),ce.pixelStorei(G.UNPACK_SKIP_ROWS,ne),ce.pixelStorei(G.UNPACK_SKIP_IMAGES,pe),ye===0&&W.generateMipmaps&&G.generateMipmap(xt),ce.unbindTexture()},this.initRenderTarget=function(E){xe.get(E).__webglFramebuffer===void 0&&Ae.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Ae.setTextureCube(E,0):E.isData3DTexture?Ae.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Ae.setTexture2DArray(E,0):Ae.setTexture2D(E,0),ce.unbindTexture()},this.resetState=function(){re=0,N=0,$=null,ce.reset(),gn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _u}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ct._getUnpackColorSpace()}};var fr={normal:1,related:.85,weak:.5,quiet:.3,away:.1},em=3,Hu=i=>i.normalize("NFD").replace(/\p{M}/gu,"").toLowerCase();function Wu(i,e,t=8){let n=Hu(e).split(/\s+/).filter(Boolean);return n.length?i.map(r=>{let s=Hu(r.title),a=Hu(`${r.title} ${r.body} ${r.extra}`);if(!n.every(c=>a.includes(c)))return null;let o=n.reduce((c,l)=>c+(s.startsWith(l)?3:s.includes(l)?2:1),0)+r.weight*.1;return{item:r,score:o}}).filter(Boolean).sort((r,s)=>s.score-r.score||r.item.order-s.item.order).slice(0,t).map(({item:r})=>r):[]}function ic(i,e){let t=i[e],n=new Map(i.map((a,o)=>[a.id,o])),r=new Set(t.links.filter(a=>n.has(a)&&a!==t.id).map(a=>n.get(a)));i.forEach((a,o)=>o!==e&&a.links.includes(t.id)&&r.add(o));let s=new Set;for(let[a,o]of Object.entries(t.members))for(let c of o){let l=i.map((p,d)=>p.members[a]?.includes(c)?d:-1).filter(p=>p>=0),h=l.indexOf(e);for(let p of[l[h-1],l[h+1]])p!==void 0&&!r.has(p)&&s.add(p)}return{links:[...r].sort((a,o)=>a-o),near:[...s].sort((a,o)=>a-o)}}function Xu(i,e,t=em){let n=i[e],{links:r,near:s}=ic(i,e),a=new Set(r),o=l=>Object.entries(n.members).reduce((h,[p,d])=>h+d.filter(u=>l.members[p]?.includes(u)).length,0),c=l=>(a.has(l)?100:0)+o(i[l])*10+1/(1+Math.abs(i[l].year-n.year));return[...r,...s].sort((l,h)=>c(h)-c(l)||l-h).slice(0,t)}function tm(i,e,t=em){let{links:n}=ic(i,e);return Xu(i,e,1/0).filter(r=>n.includes(r)).slice(0,t)}function nm(i,e,t=3,n=3){let r=i.map((a,o)=>[a,o]).filter(([a])=>a.period===e).sort((a,o)=>o[0].weight-a[0].weight||a[0].year-o[0].year||a[1]-o[1]),s=[];for(let[a,o]of r){if(s.length>=t)break;s.every(([c])=>!a.position||!c.position||Math.hypot(...a.position.map((l,h)=>l-c.position[h]))>=n)&&s.push([a,o])}return s.map(([,a])=>a)}function im(i,e,t=null){if(!t)return{previous:e>0?e-1:null,next:e<i.length-1?e+1:null};let n=rc(i,t),r=n.indexOf(e);return r<0?{previous:n.findLast(s=>s<e)??null,next:n.find(s=>s>e)??null}:{previous:n[r-1]??null,next:n[r+1]??null}}function rm(i,e,t,n,r=3){let s=rr.flatMap(a=>(e[a]??[]).map((o,c)=>({facet:a,item:c,title:t[a]?.[o]??o,body:"",extra:"",count:rc(i,{facet:a,item:c}).length}))).filter(a=>a.count>0);return Wu(s.map((a,o)=>({...a,weight:Math.min(3,a.count/4),order:o})),n,r)}function sm(i,{selected:e=-1,near:t=new Set,weak:n=new Set,filter:r=null}){return i.map((s,a)=>{let o=fr.normal;return e>=0&&(o=a===e?1:t.has(a)?fr.related:n.has(a)?fr.weak:fr.quiet),r&&!(s.members[r.facet]??[]).includes(r.item)&&(o=a===e?1:Math.min(o,fr.away)),o})}var am=(i,e)=>i.map((t,n)=>e.has(n)?1:fr.quiet),om=(i,e)=>[...i].map(t=>[t,e,!0]),rc=(i,e)=>e?i.map((t,n)=>(t.members[e.facet]??[]).includes(e.item)?n:-1).filter(t=>t>=0):[];function lm(i,e){let t=[];return e.forEach((n,r)=>r>0&&t.push([e[r-1],n,i[e[r-1]].period!==i[n].period])),t}function cm(i,e,t){let n=new Array(t).fill(0);for(let r of e)i[r].period>=0&&n[i[r].period]++;return n}var T1=10,E1=3,w1=8,Kf=[[1,0],[-1,0],[0,1],[0,-1]],Qf=[[1,1],[-1,1],[1,-1],[-1,-1]];function hm({x:i,y:e,r:t},{width:n,height:r},s,a=12){let o=t+T1,c=(d,u,m,f)=>{let v=u===0?i+d*m-(d<0?n:0):Math.min(Math.max(i-n/2,a),s-n-a),g=u===0?e-r/2:u>0?e+m-2:e-m+2-r;return{left:v,right:v+n,top:g,bottom:g+r,far:f}},l=(d,u,m,f)=>{let v=i+d*m-(d<0?n:0),g=e+u*m-(u<0?r:0);return{left:v,right:v+n,top:g,bottom:g+r,far:f}},h=r+4,p=Array.from({length:E1},(d,u)=>o+(u+1)*h);return[...Kf.map(([d,u])=>c(d,u,o,!1)),...Qf.map(([d,u])=>l(d,u,o,!1)),...p.flatMap(d=>[...Kf.map(([u,m])=>c(u,m,d,!0)),...Qf.map(([u,m])=>l(u,m,d,!0))])]}function um(i,{free:e,clear:t,inside:n,forced:r=!1,keep:s=-1}){let a=s>=0?i.find(o=>o.slot===s):void 0;return a&&e(a)&&t(a)?a:i.find(o=>e(o)&&t(o))??i.find(e)??(r?i.find(o=>o.far===!1&&n(o))??i[0]:null)}function qu(i,{x:e,y:t,r:n}){let r=Math.min(Math.max(e,i.left),i.right),s=Math.min(Math.max(t,i.top),i.bottom),a=Math.hypot(e-r,t-s)-n*.45;return a>4?{x:r-i.left,y:s-i.top,length:a,angle:Math.atan2(t-s,e-r)}:null}var dm=i=>Math.min(i,70)+w1;function pm(i){let e=new Map;return i.forEach((t,n)=>{if(t.period<0)return;let r=e.get(t.period);(r===void 0||t.weight>i[r].weight||t.weight===i[r].weight&&t.year<i[r].year)&&e.set(t.period,n)}),[...e.entries()].sort((t,n)=>t[0]-n[0]).map(([,t])=>t)}function fm(i,e){let t=n=>n.visible!==!1&&n.x>=e.left&&n.x<=e.right&&n.y>=e.top&&n.y<=e.bottom;for(let n=1;n<i.length;n++){let r=i[n-1],s=i[n];if(!t(r)||t(s))continue;let a=0,o=1;for(let c=0;c<18;c++){let l=(a+o)/2;t({visible:s.visible,x:r.x+(s.x-r.x)*l,y:r.y+(s.y-r.y)*l})?a=l:o=l}return{t:(n-1+a)/(i.length-1),x:r.x+(s.x-r.x)*a,y:r.y+(s.y-r.y)*a,angle:Math.atan2(s.y-r.y,s.x-r.x)}}return null}function mm(i,e){return[[Math.abs(i.y-e.top),"top"],[Math.abs(i.x-e.right),"right"],[Math.abs(i.y-e.bottom),"bottom"],[Math.abs(i.x-e.left),"left"]].reduce((n,r)=>r[0]<n[0]?r:n)[1]}function gm(i,e,{width:t,height:n},r,s=8){let a=h=>Math.min(Math.max(h,r.left),Math.max(r.left,r.right-t)),o=h=>Math.min(Math.max(h,r.top),Math.max(r.top,r.bottom-n)),c=e==="left"?i.x+s:e==="right"?i.x-s-t:a(i.x-t/2),l=e==="top"?i.y+s:e==="bottom"?i.y-s-n:o(i.y-n/2);return{left:c,right:c+t,top:l,bottom:l+n}}function _m(i,e,t=4,n=[]){let r=[...n],s=.5,a=(o,c)=>o.left<c.right+t-s&&o.right+t>c.left+s&&o.top<c.bottom+t-s&&o.bottom+t>c.top+s;for(let o of i){let c=o.side==="top"||o.side==="bottom"?"top":"left",l=c==="top"?o.box.bottom-o.box.top:o.box.right-o.box.left,h=o.side==="bottom"||o.side==="right"?-1:1,p=o.box;for(let u=0;u<4&&r.some(m=>a(p,m));u++){let m=(l+t)*h*(u+1);p=c==="top"?{...o.box,top:o.box.top+m,bottom:o.box.bottom+m}:{...o.box,left:o.box.left+m,right:o.box.right+m}}p.left>=e.left-1&&p.right<=e.right+1&&p.top>=e.top-1&&p.bottom<=e.bottom+1&&!r.some(u=>a(p,u))?(r.push(p),o.box=p,o.shown=!0):o.shown=!1}return i}function vm(i,{width:e,height:t,pad:n=6}){let r=i.map(u=>u[0]),s=i.map(u=>u[1]),[a,o,c,l]=[Math.min(...r),Math.max(...r),Math.min(...s),Math.max(...s)],h=Math.min((e-2*n)/(o-a||1),(t-2*n)/(l-c||1)),p=(e-(o-a)*h)/2,d=(t-(l-c)*h)/2;return{scale:h,to:([u,m])=>[p+(u-a)*h,d+(l-m)*h],from:([u,m])=>[a+(u-p)/h,l-(m-d)/h]}}function xm(i,[e,t],n=1.35){let r=-1,s=n;return i.forEach((a,o)=>{let c=Math.hypot(a.centre[0]-e,a.centre[1]-t)/a.radius;c<s&&([r,s]=[o,c])}),r}var A1=.75,ym=(i,e,t=520,n=!0)=>i<A1&&e>=t&&n,mr={tiers:[{keep:1,ratio:1/0},{keep:.65,ratio:1.5},{keep:.4,ratio:1}],slow:1e3/30,window:90,windows:3},sc={fps:24,hidden:1},Sm=(i,e,t=sc.fps)=>{let n=1e3/t,r=e-i.last;return r<n-1?!1:(i.last=e-Math.min(Math.max(r-n,0),n/2),!0)},Mm=(i,e=sc.fps)=>Math.max(0,i-1e3/e)+1e3/60,R1={days:45},bm=(i,e=new Date)=>{if(!/^\d{4}-\d{2}$/.test(i??""))return!1;let t=(e-new Date(+i.slice(0,4),+i.slice(5,7)-1,1))/864e5;return t>=0&&t<R1.days},Tm=i=>i.length?i.reduce((e,t)=>e+t,0)/i.length:0,Em=(i,e)=>e>mr.slow&&i<mr.tiers.length-1?i+1:i;function wm(i){return[...[...new Set(i.map(t=>t.period).filter(t=>t>=0))].sort((t,n)=>t-n).map(t=>({age:t})),{ahead:"book"},{ahead:"clone"}]}function Am(i,{now:e,idleSince:t,eligible:n,plan:r},{wait:s=20,hold:a=6}={}){if(!r.length)return{state:i,open:null};if(i.phase==="off")return{state:i,open:null};if(i.phase==="touring"){if(t>i.at||!n)return{state:{phase:"off",step:0,at:e},open:null,stopped:!0};if(e-i.at<a)return{state:i,open:null};let o=i.step+1;return o>=r.length?{state:{phase:"off",step:0,at:e},open:null,done:!0}:{state:{phase:"touring",step:o,at:e},open:r[o]}}return n&&e-Math.max(t,i.at)>=s?{state:{phase:"touring",step:0,at:e},open:r[0]}:{state:i,open:null}}var ac={minDistance:6,maxDistance:640,minPitch:-1.3,maxPitch:1.3},wn=(i,e,t)=>Math.min(t,Math.max(e,i));function Rm({target:i,distance:e,yaw:t,pitch:n}){let r=Math.cos(n);return[i[0]+e*r*Math.sin(t),i[1]+e*Math.sin(n),i[2]+e*r*Math.cos(t)]}var ju=(i,e)=>wn(i*Math.exp(e),ac.minDistance,ac.maxDistance),Cm=({yaw:i,pitch:e},t,n)=>({yaw:i+t,pitch:wn(e+n,ac.minPitch,ac.maxPitch)});function Im({target:i,distance:e,yaw:t,pitch:n},r,s,a,o){let c=2*e*Math.tan(o/2)/a,l=[Math.cos(t),0,-Math.sin(t)],h=[-Math.sin(n)*Math.sin(t),Math.cos(n),-Math.sin(n)*Math.cos(t)];return i.map((p,d)=>p-l[d]*r*c+h[d]*s*c)}var Br=(i,e,t,n)=>Number.isFinite(i)?i+(e-i)*(1-Math.exp(-n*Math.max(0,t))):e,C1=(i,e)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i));function Pm(i,e,t,n){return{target:i.target.map((r,s)=>Br(r,e.target[s],t,n)),distance:Math.exp(Br(Math.log(i.distance),Math.log(e.distance),t,n)),yaw:Br(i.yaw,C1(i.yaw,e.yaw),t,n),pitch:Br(i.pitch,e.pitch,t,n)}}var oc=[0,2,4,7,9],lc=[{root:0,pad:[0,7,14,16]},{root:-7,pad:[0,7,9,16]},{root:-3,pad:[4,9,14,19]},{root:-5,pad:[2,9,14,21]},{root:2,pad:[2,5,9,12]}],Ge={tuning:432,base:432*2**(-7/12),octaves:2,from:1980,to:2030,master:.7,soften:2200,floor:30,fade:9,change:3,chordFrom:24,chordTo:38,detune:4,padCut:760,padSwing:220,padLevel:.0052,shimmerLevel:7e-4,subLevel:.007,airLevel:.012,airCut:520,room:1,reverb:5,reach:.03,bed:{pad:[.35,.8],shimmer:[.1,1],air:[.2,.9],sub:[1,0]},note:[.8,1],hover:[.15,1],swell:[.3,1],travel:[.15,1],tick:432,tickGap:1.4,tickPeak:.01,noteGap:.3,swellPeak:.022,travelPeak:.015,arrival:.4,voices:4,crowd:.5,fadeIn:3.5,fadeOut:.7,suspendAfter:4e3,interval:2e3,horizon:4},cc=-19,I1=-43,$a=i=>Ge.tuning*2**(i/12),Ks=i=>Math.min(1,Math.max(0,i));function Lm(i){let e=oc.length*Ge.octaves,t=Math.min(e-1,Math.floor(Ks((i-Ge.from)/(Ge.to-Ge.from))*e)),n=oc[t%oc.length]+12*Math.floor(t/oc.length);return Ge.base*2**(n/12)}var Nm=i=>({1:3,2:4.5,3:6})[i]??3,Dm=i=>.024+.007*Math.min(3,Math.max(1,i)),Um=i=>$a(i==="clone"?cc:cc-7),Om=i=>1/(1+Ge.crowd*i),Yu=(i,e,t=Ge.tickGap)=>i-e>=t;function Fm(i){let{root:e,pad:t}=lc[i%lc.length];return{sub:$a(I1+(e%12+12)%12),pad:t.map(n=>$a(cc+n)),shimmer:t.slice(2).map(n=>$a(cc+n+12))}}function P1(i,e){let t=lc.map((n,r)=>r).filter(n=>n!==i);return t[Math.min(t.length-1,Math.floor(Ks(e)*t.length))]}var $u=i=>i<0?0:i%lc.length,Zu=(i,e,t)=>i===null?P1(e,t):$u(i),Ju=i=>Ge.chordFrom+Ks(i)*(Ge.chordTo-Ge.chordFrom);function Bm(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,e|1);return t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function zm(i,e){let t=Bm(e),n=new Float32Array(i),r=0,s=0;for(let a=0;a<i;a++)r=(r+.04*(t()*2-1))/1.04,n[a]=r,s=Math.max(s,Math.abs(r));for(let a=0;a<i;a++)n[a]/=s;return n}function Vm(i,e=1){let t=Math.floor(i*Ge.reverb*1.1);return[0,1].map(n=>{let r=Bm(e+n*7919),s=new Float32Array(t),a=0;for(let o=0;o<t;o++){let c=o/i,l=Ks((c-Ge.reach)/.05),h=Math.exp(-6.9078*c/Ge.reverb),p=Ks((t-o)/(i*.4)),d=3200*(600/3200)**Ks(c/Ge.reverb);a+=(1-Math.exp(-2*Math.PI*d/i))*(r()*2-1-a),s[o]=a*l*h*p}return s})}var L1=[[1,1,1],[2,.22,.5],[3,.08,.3],[4.07,.03,.2]],N1=[[1,1,1],[1.5,.25,1.2]],D1=[[1,1,1]];function U1(i,e=Math.random){let t=i.sampleRate,n={at:i.currentTime+.05,chord:0,lastNote:-1/0,lastTick:-1/0,period:-1,year:0,voices:[],layers:[],hold:null},r=(le=0)=>{let te=i.createGain();return te.gain.value=le,te},s=(le,te,ge=.5)=>{let ue=i.createBiquadFilter();return ue.type=le,ue.frequency.value=te,ue.Q.value=ge,ue},a=(le,te,ge=0)=>{let ue=i.createOscillator();return ue.type=le,ue.frequency.value=te,ue.detune.value=ge,ue},o=le=>{let te=i.createBuffer(le.length,le[0].length,t);return le.forEach((ge,ue)=>te.getChannelData(ue).set(ge)),te},c=(le,te,ge)=>{let ue=a("sine",le),oe=r(te);ue.connect(oe),oe.connect(ge),ue.start()},l=r(0),h=s("highpass",Ge.floor,.7),p=s("lowpass",Ge.soften,.5),d=r(1);d.connect(p),p.connect(h),h.connect(l),l.connect(i.destination);let u=i.createConvolver();u.buffer=o(Vm(t));let m=r(Ge.room);u.connect(m),m.connect(d);let f=([le,te])=>{let ge=r(le),ue=r(te);return ge.connect(d),ue.connect(u),[ge,ue]},v=(le,te)=>te.forEach(ge=>le.connect(ge)),g=f(Ge.bed.pad),_=f(Ge.bed.shimmer),b=f(Ge.bed.air),T=f(Ge.bed.sub),S=f(Ge.note),M=f(Ge.hover),I=f(Ge.swell),O=f(Ge.travel),k=s("lowpass",Ge.padCut,.3),U=r(1);k.connect(U),v(U,g),c(.031,Ge.padSwing,k.frequency);let X=r(.6);v(X,_),c(.057,.4,X.gain);let V=o([zm(t*6,11)]),Z=i.createBufferSource(),se=s("bandpass",Ge.airCut,.6),ee=r(Ge.airLevel);Z.buffer=V,Z.loop=!0,Z.connect(se),se.connect(ee),v(ee,b),c(.043,Ge.airLevel*.6,ee.gain),Z.start();let re=le=>()=>le.forEach(te=>te.disconnect()),N=(le,te,ge,ue=Ge.fade)=>{let{sub:oe,pad:ie,shimmer:ve}=Fm(le),_e=te+ge+Ge.fade;n.layers=n.layers.filter(y=>y.end>i.currentTime);let Me=new Map,A=y=>{if(!Me.has(y)){let B=r(1);B.connect(y),Me.set(y,B)}return Me.get(y)},w={buses:Me,oscillators:[],end:_e};n.layers.push(w);let C=(y,B,F)=>{let R=r(0);w.oscillators.push(y),R.gain.setValueAtTime(0,te),R.gain.linearRampToValueAtTime(B,te+ue),R.gain.setValueAtTime(B,_e-Ge.fade),R.gain.linearRampToValueAtTime(0,_e),y.connect(R),R.connect(A(F)),y.start(te),y.stop(_e+.1),y.onended=re([y,R])};ie.forEach(y=>[-Ge.detune,Ge.detune].forEach(B=>C(a("triangle",y,B),Ge.padLevel,k))),ve.forEach(y=>C(a("sine",y),Ge.shimmerLevel,X));let z=r(1);v(z,T),C(a("sine",oe),Ge.subLevel,z)},$=(le,{peak:te,attack:ge,length:ue,partials:oe,outputs:ie,when:ve})=>{let _e=Math.max(ve,i.currentTime),Me=ue/4.6,A=ge*3,w=r(1);v(w,ie),n.voices=n.voices.filter(F=>F.end>_e),n.voices.length>=Ge.voices&&n.voices.shift().duck.gain.setTargetAtTime(0,_e,.15);let C=te*Om(n.voices.length),z=_e,y=null,B=[w];for(let[F,R,q]of oe){let Y=a("sine",le*F),J=r(0);J.gain.setValueAtTime(0,_e),J.gain.setTargetAtTime(C*R,_e,ge),J.gain.setTargetAtTime(0,_e+A,Me*q),Y.connect(J),J.connect(w),Y.start(_e);let de=_e+A+Me*q*8;Y.stop(de),de>=z&&(z=de,y=Y),B.push(Y,J)}y.onended=re(B),n.voices.push({end:z,duck:w})},he=(le,te)=>{let ge=Math.max(te,i.currentTime),[ue,oe]=le>=0?[220,680]:[680,220],ie=i.createBufferSource(),ve=s("bandpass",ue,1.2),_e=r(0);ie.buffer=V,ie.loop=!0,ve.frequency.setValueAtTime(ue,ge),ve.frequency.exponentialRampToValueAtTime(oe,ge+3.2),_e.gain.setValueAtTime(0,ge),_e.gain.setTargetAtTime(Ge.travelPeak,ge,.5),_e.gain.setTargetAtTime(0,ge+1.5,.6),ie.connect(ve),ve.connect(_e),v(_e,O),ie.start(ge,e()*2),ie.stop(ge+6.5),ie.onended=re([ie,ve,_e])};return{master:l,run(le=Ge.horizon){for(;n.at<i.currentTime+le;){let te=Ju(e());N(n.chord,n.at,te),n.at+=te,n.chord=Zu(n.hold,n.chord,e())}},age(le){let te=le<0?null:le;if(te===n.hold)return;n.hold=te;let ge=i.currentTime;n.layers.forEach(({buses:oe,oscillators:ie,end:ve})=>{ve<=ge||(oe.forEach(_e=>_e.gain.setTargetAtTime(0,ge,Ge.change/3)),ie.forEach(_e=>{try{_e.stop(ge+Ge.change*2)}catch{}}))}),n.layers=[],n.chord=$u(le);let ue=Ju(e());N(n.chord,ge,ue,Ge.change),n.at=ge+ue,n.chord=Zu(n.hold,n.chord,e())},fade(le){let te=i.currentTime;l.gain.cancelScheduledValues(te),l.gain.setTargetAtTime(le?Ge.master:0,te,le?Ge.fadeIn:Ge.fadeOut)},memory({year:le,weight:te,period:ge=-1},ue=i.currentTime){if(!Yu(ue,n.lastNote,Ge.noteGap))return;n.lastNote=ue;let oe=ge>=0&&n.period>=0&&ge!==n.period;oe&&he(le>=n.year?1:-1,ue),n.period=ge,n.year=le,$(Lm(le),{peak:Dm(te),attack:.02,length:Nm(te),partials:L1,outputs:S,when:ue+(oe?Ge.arrival:0)})},swell(le,te=i.currentTime){$(Um(le),{peak:Ge.swellPeak,attack:.9,length:6,partials:N1,outputs:I,when:te})},tick(le=i.currentTime){Yu(le,n.lastTick)&&(n.lastTick=le,$(Ge.tick,{peak:Ge.tickPeak,attack:.15,length:1.4,partials:D1,outputs:M,when:le}))},travel(le,te=i.currentTime){he(le,te)}}}function km(){let i=globalThis.AudioContext??globalThis.webkitAudioContext,e={context:null,graph:null,on:!0,timer:0,stopTimer:0,age:-1};if(!i)return{supported:!1,toggle:()=>!1,start:()=>!1,running:()=>!1,isOn:()=>!1,memory(){},age(){},swell(){},tick(){},travel(){},pause(){},close(){}};let t=()=>e.on&&e.graph,n=()=>{e.context||(e.context=new i,e.graph=U1(e.context));let{context:r,graph:s}=e;clearTimeout(e.stopTimer),clearInterval(e.timer),s.fade(!0),r.resume?.(),s.age(e.age),s.run(),e.timer=setInterval(()=>s.run(),Ge.interval)};return{supported:!0,isOn:()=>e.on,running:()=>e.context?.state==="running",start(){return e.on&&!document.hidden&&n(),e.on},toggle(){return!e.context&&e.on?(e.on=!1,!1):(e.on=!e.on,e.on?n():(clearTimeout(e.stopTimer),clearInterval(e.timer),e.graph.fade(!1),e.stopTimer=setTimeout(()=>!e.on&&e.context.suspend?.(),Ge.suspendAfter)),e.on)},memory(r){t()&&e.graph.memory(r)},swell(r){t()&&e.graph.swell(r)},age(r){e.age=r,t()&&e.graph.age(r)},tick(){t()&&e.graph.tick()},travel(r){t()&&e.graph.travel(r)},pause(r){!e.context||!e.on||(r?e.context.suspend?.():e.context.resume?.())},close(){clearTimeout(e.stopTimer),clearInterval(e.timer),e.on=!0,e.context?.close?.(),e.context=null,e.graph=null}}}var er={order:.6,jitter:.08,flight:.3,arrive:.54,swirl:2.6,burst:.17,glow:.07},Qs={sky:1.4,seed:.9,wait:6,delay:.3,seconds:4,dolly:6,from:1.6,card:.85,first:.9},Hm={sky:.5,delay:0,seconds:1.4,card:0},dc={strength:.12,night:["#ecd2b0","#b8cdea","#b8cdea","#ecd2b0"],paper:["#8a5a2b","#2f5f99","#2f5f99","#8a5a2b"]},hc={spin:.07,breath:.05,pace:.5,still:.92},Ku={dim:.97,reach:2.6,dust:1.4},uc={radius:.2,push:.04,rate:6},Wm=.35,Gm={ink:.42,edge:0},Za={light:.8,grow:.12},zr={pull:.1,glow:.3,grow:.12,inRate:2.2,outRate:1.2};var Qu=i=>i>=1?1/0:Math.min(1,Math.max(0,(i-er.arrive*er.flight)/er.order)),Xm=`
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
  #define ENTRANCE_FIRST ${Qs.first.toFixed(2)}
  #define CORE_DIM ${Ku.dim.toFixed(2)}
  #define CORE_REACH ${Ku.reach.toFixed(2)}
  #define FAR_DUST ${Ku.dust.toFixed(2)}
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
`,qm=`
  #define PAPER_INK ${Gm.ink.toFixed(2)}
  #define PAPER_EDGE ${Gm.edge.toFixed(2)}
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
`,jm=`
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
`,Ym=`
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
`;var ea=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,cs=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},gr=(i,e,t)=>i+(e-i)*t;function $m(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function hs(i){return()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var O1={deep:.6,far:.5,haze:.5,glow:.7},F1=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,B1=`
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
`,z1=i=>1/Math.max(.2,Math.sin(i*Math.PI));function V1(i){let e=document.createElement("canvas");e.width=i,e.height=i/2;let t=e.getContext("2d");t.fillStyle="#000",t.fillRect(0,0,i,i/2),t.globalCompositeOperation="lighter";let n=hs(7),r=(s,a)=>`rgba(${s===0?255:0},${s===1?255:0},${s===2?255:0},${a})`;for(let s of Ud({random:n})){t.save(),t.translate(s.u*i,s.v*(i/2)),t.rotate(s.angle),t.scale(z1(s.v),s.squash);let a=t.createRadialGradient(0,0,0,0,0,s.radius);a.addColorStop(0,r(1,s.alpha)),a.addColorStop(.35,r(1,s.alpha*.35)),a.addColorStop(1,r(1,0)),t.fillStyle=a,t.beginPath(),t.arc(0,0,s.radius,0,Math.PI*2),t.fill(),t.restore()}return e}function k1(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.4,"rgba(255,255,255,0.35)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),new Nr(i)}function Zm({scene:i,sky:e,mobile:t,ink:n,star:r}){let s=ea(),a={...O1},o=new Nr(V1(2048));o.minFilter=o.magFilter=Jn,o.generateMipmaps=!1,o.wrapS=Fl;let c={uMap:{value:o},uInk:n,uOffset:{value:new P},uTime:{value:0},uFar:{value:0},uHaze:{value:0},uHazeMax:{value:Xn.haze.alpha}},l=new En({uniforms:c,vertexShader:F1,fragmentShader:B1,transparent:!0,side:Zn,depthTest:!1,depthWrite:!1}),h=new $n(new Gs(1500,48,24),l);h.frustumCulled=!1,h.renderOrder=-3,i.add(h);let p=[0,1,2].map(I=>e.list.reduce((O,k)=>O+k.centre[I],0)/e.list.length),d=Math.max(...e.list.map(I=>Math.hypot(...I.centre.map((O,k)=>O-p[k]))+I.radius*2)),u=Dd({count:t?Xn.deep.mobile:Xn.deep.count,random:hs(7),centre:p,inner:Math.min(Xn.deep.radius/3,Math.max(d*1.15,Xn.deep.inner/4))}),m=new bt;m.setAttribute("position",new Pt(u.position,3)),m.setAttribute("aSeed",new Pt(u.seed,1)),m.setAttribute("aBright",new Pt(u.bright,1)),m.setAttribute("aHalo",new Pt(new Float32Array(u.count),1)),m.setAttribute("aSize",new Pt(u.size,1));let f={uTime:r.uTime,uPixel:r.uPixel,uInk:n,uGain:{value:0},uHalo:{value:0}},v=new En({uniforms:f,vertexShader:pc,fragmentShader:fc,transparent:!0,depthTest:!1,depthWrite:!1}),g=new ji(m,v);g.frustumCulled=!1,g.renderOrder=-2,i.add(g);let _=Math.max(1,...e.list.map(I=>I.count)),b=k1(),T=e.list.map(I=>{let{scale:O,strength:k}=Od(I,_),U=new Ma(new Fs({map:b,color:16777215,transparent:!0,depthTest:!1,depthWrite:!1,opacity:0}));return U.position.set(...I.centre),U.scale.set(O,O,1),U.renderOrder=-2,i.add(U),{sprite:U,strength:k,scale:O,galaxy:I,reveal:0}}),S={night:!0,quiet:!1,dim:1,formed:1/0,sky:1,boost:1},M=()=>{f.uGain.value=a.deep*S.sky*S.boost*(S.night?1.25:.4),g.visible=a.deep>.001,c.uFar.value=a.far*S.sky,c.uHaze.value=S.quiet?0:a.haze*S.sky,h.visible=c.uFar.value+c.uHaze.value>.001,T.forEach(({sprite:I,strength:O,scale:k,galaxy:U})=>{let X=cs(U.start,U.end,S.formed);I.scale.set(k*(.55+.45*X),k*(.55+.45*X),1),I.material.opacity=O*a.glow*S.dim*X*(S.night?1:.5),I.visible=I.material.opacity>.002,I.material.color.copy(n.value)})};return{applyTheme:I=>{S.night=I,l.blending=I?pr:bi,l.needsUpdate=!0,v.blending=I?pr:bi,v.needsUpdate=!0,T.forEach(({sprite:O})=>{O.material.blending=I?pr:bi,O.material.needsUpdate=!0}),M()},setTier:I=>{S.quiet=I>=2,M()},setDim:I=>{S.dim=I,M()},update:(I,O,k,U=1,X=1)=>{(k!==S.formed||U!==S.sky||X!==S.boost)&&(S.formed=k,S.sky=U,S.boost=X,M()),h.position.copy(O.position),c.uOffset.value.copy(O.position).multiplyScalar(4e-4),c.uTime.value=s?0:I*.01}}}var ed=-.27,rd=.35,td=[0,0,-7],Vr=18,Jm=40,G1=6,H1=.5,nd=4.2,id=900,W1=.9,mc=10,Ja={rate:.11,yaw:.14,pitch:.02,rest:2.5};function Km({canvas:i,cloud:e,marks:t,future:n,today:r,mobile:s,sky:a,kinds:o=[]}){let c=new ec({canvas:i,antialias:!1,powerPreference:"high-performance"});c.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2));let l=new va,h=new Yn(36,innerWidth/innerHeight,.1,4e3),p=r+Pc[1]+.4,d=new Float32Array(e.count*3);for(let D=0;D<d.length;D++)d[D]=e.position[D]-e.center[D];let u=new bt,m=(D,ne)=>new Pt(D,ne).setUsage($l);u.setAttribute("position",new Pt(d,3)),u.setAttribute("aFrom",new Pt(e.from,3)),u.setAttribute("aCenter",new Pt(e.center,3)),Object.entries({u:"aU",order:"aOrder",seed:"aSeed",size:"aSize",ahead:"aAhead",kind:"aKind",memory:"aMemory",galaxy:"aGalaxy"}).forEach(([D,ne])=>u.setAttribute(ne,new Pt(e[D],1))),["threads","people","places"].forEach((D,ne)=>u.setAttribute(`aFacet${ne}`,new Pt(e.facet[D],1)));let v=new Float32Array(Math.max(1,t.length)).fill(1),g=new Float32Array(v),_=new Zr(v,v.length,1,Xa,Ti);_.minFilter=_.magFilter=Ui,_.needsUpdate=!0;let b=new Float32Array(v.length).fill(-1);o.forEach((D,ne)=>b[ne]=Nc.indexOf(D));let T=new Zr(b,b.length,1,Xa,Ti);T.minFilter=T.magFilter=Ui,T.needsUpdate=!0;let S=Nc.map(()=>new ht),M=()=>(Be.night?dc.night:dc.paper).forEach((D,ne)=>S[ne].set(D)),I={value:new ht},O=Nd({count:s?4e3:void 0,random:hs(2026)}),k=new bt;k.setAttribute("position",new Pt(O.position,3)),k.setAttribute("aSeed",new Pt(O.seed,1)),k.setAttribute("aBright",new Pt(O.bright,1)),k.setAttribute("aHalo",new Pt(O.halo,1)),k.setAttribute("aSize",new Pt(O.size,1));let U=1.25,X={uTime:{value:0},uPixel:{value:1},uGain:{value:.6},uHalo:{value:1},uInk:I},V=new En({uniforms:X,vertexShader:pc,fragmentShader:fc,transparent:!0,depthTest:!1,depthWrite:!1}),Z=new ji(k,V);Z.frustumCulled=!1,Z.renderOrder=-1,l.add(Z);let se=Zm({scene:l,sky:a,mobile:s,ink:I,star:X}),ee=t.reduce((D,ne,pe)=>ne.year<t[D].year?pe:D,0),re=Math.min(1,Math.sqrt(6e4/e.count)),N={uMix:{value:0},uTime:{value:0},uScale:{value:1},uFar:{value:1},uGain:{value:1},uFocusU:{value:0},uFocusW:{value:7},uFocusOn:{value:0},uFilterFacet:{value:-1},uFilterItem:{value:-1},uAway:{value:.12},uReveal:{value:1e4},uLevelCount:{value:v.length},uLevels:{value:_},uKinds:{value:T},uTints:{value:S},uTint:{value:dc.strength},uPaper:{value:0},uSpin:{value:new Float32Array(yi.slots)},uPivot:{value:Array.from({length:yi.slots},(D,ne)=>new P(...a.list[ne]?.centre??[0,0,0]))},uKeep:{value:1},uSeed:{value:ee},uSeedOn:{value:0},uKick:{value:0},uPointer:{value:new P(0,0,0)},uHover:{value:new me(-1,0)},uInk:I},$=new En({uniforms:N,vertexShader:Xm,fragmentShader:qm,transparent:!0,depthTest:!1,depthWrite:!1}),he=new ji(u,$);he.frustumCulled=!1,l.add(he);let le=[...t.map(D=>D.position),n.today,n.today,n.book,n.clone],te=new Float32Array(yi.slots),ge=(D,ne)=>{ne.set(...le[D]);let pe=D<t.length?t[D].period:-1;if(pe>=0&&pe<yi.slots&&te[pe]){let et=a.list[pe].centre,[lt,ot]=[ne.x-et[0],ne.y-et[1]];ne.x=et[0]+Math.cos(te[pe])*lt-Math.sin(te[pe])*ot,ne.y=et[1]+Math.sin(te[pe])*lt+Math.cos(te[pe])*ot}return ne},ue=[{size:1.3,state:1,order:.96},{size:2.4,state:3,order:.96},{size:2.4,state:2,order:.98},{size:2.4,state:2,order:1},{size:8,state:4,order:0},{size:8,state:4,order:0}],oe=4,ie=[0,0],ve=[],_e=5,Me=m(new Float32Array(ue.length*3),3),A=m(Float32Array.from(ue.map(D=>D.size)),1),w=m(new Float32Array(ue.length).fill(1),1),C=new bt;C.setAttribute("position",Me),C.setAttribute("aSize",A),C.setAttribute("aFade",w),C.setAttribute("aFirst",new Pt(Float32Array.from(ue.map((D,ne)=>ne===ee?1:0)),1)),C.setAttribute("aState",new Pt(Float32Array.from(ue.map(D=>D.state)),1)),C.setAttribute("aOrder",new Pt(Float32Array.from(ue.map(D=>D.order)),1));let z={uScale:{value:1},uTime:{value:0},uReveal:{value:0},uSeedOn:{value:0},uInk:I},y=new En({uniforms:z,vertexShader:jm,fragmentShader:Ym,transparent:!0,depthTest:!1,depthWrite:!1}),B=new ji(C,y);B.frustumCulled=!1,l.add(B);let F=[],R=(D,ne=!1)=>{let pe=ne?new Fa({transparent:!0,dashSize:.8,gapSize:.9,depthTest:!1}):new Jr({transparent:!0,depthTest:!1});return F.push({material:pe,opacity:D}),pe},q=D=>new bt().setAttribute("position",new je(D,3)),Y=(()=>{let D=document.createElement("canvas");D.width=D.height=32;let ne=D.getContext("2d"),pe=ne.createRadialGradient(16,16,0,16,16,16);return pe.addColorStop(0,"rgba(255,255,255,1)"),pe.addColorStop(.5,"rgba(255,255,255,1)"),pe.addColorStop(.75,"rgba(255,255,255,0.3)"),pe.addColorStop(1,"rgba(255,255,255,0)"),ne.fillStyle=pe,ne.fillRect(0,0,32,32),new Nr(D)})(),J=1.6,de=1.5,Le=new P,Ne=new Float32Array(3*1024),Se=D=>{let ne=new Float32Array(id*3),pe=new Pt(ne,3).setUsage($l),et=new bt().setAttribute("position",pe);et.setDrawRange(0,0);let lt=new Bs({map:Y,size:3,sizeAttenuation:!1,transparent:!0,depthTest:!1,depthWrite:!1});D&&F.push({material:lt,opacity:D});let ot=new ji(et,lt);return ot.frustumCulled=!1,ot.userData.lay=(Ve,Lt=!1)=>{let Gt=Ve.length/3,ct=Math.min(1023,Lt?Gt+1:Gt);for(let _t=0;_t<ct;_t++){let Rn=_t%Gt*3;Le.set(Ve[Rn],Ve[Rn+1],Ve[Rn+2]).project(h),Ne[_t*3]=(Le.x*.5+.5)*innerWidth,Ne[_t*3+1]=(-Le.y*.5+.5)*innerHeight,Ne[_t*3+2]=Le.z>-1&&Le.z<1?1:0}let Nt=0,Vt=0;for(let _t=0;_t<ct-1&&Vt<id;_t++){let[Rn,ze,Cn,Sn,kn,nr]=[Ne[_t*3],Ne[_t*3+1],Ne[_t*3+2],Ne[_t*3+3],Ne[_t*3+4],Ne[_t*3+5]];if(!Cn||!nr){Nt=0;continue}let _n=Math.hypot(Sn-Rn,kn-ze);if(_n<1e-6)continue;let Mn=120,Et=(vn,Dt)=>(vn<-Mn?1:vn>innerWidth+Mn?2:0)|(Dt<-Mn?4:Dt>innerHeight+Mn?8:0);if(Et(Rn,ze)&Et(Sn,kn)){Nt=((Nt-_n)%mc+mc)%mc;continue}let Jt=_t%Gt*3,Gn=(_t+1)%Gt*3;for(;Nt<=_n&&Vt<id;){let vn=Nt/_n;for(let Dt=0;Dt<3;Dt++)ne[Vt*3+Dt]=Ve[Jt+Dt]+(Ve[Gn+Dt]-Ve[Jt+Dt])*vn;Vt++,Nt+=mc}Nt-=_n}et.setDrawRange(0,Vt),pe.needsUpdate=!0,lt.size=J*(ot.userData.outer?de:1)*c.getPixelRatio()},ot},ke=[],ce=new hr,fe=(D,ne,pe=1980)=>(D.frustumCulled=!1,D.userData.opacity=ne,D.userData.year=pe,ce.add(D),D),xe=[];(()=>{let D=Ve=>Ve.members.threads?.[0]??0,ne=new Map,pe=a.list.map(()=>({open:[],shadow:[]}));t.forEach(Ve=>{let Lt=`${Ve.period}:${D(Ve)}`;ne.has(Lt)&&pe[Ve.period].open.push(...ne.get(Lt),...Ve.position),ne.set(Lt,Ve.position)}),pe.forEach((Ve,Lt)=>{let Gt=a.list[Lt].centre;for(let[ct,Nt]of[["open",.34],["shadow",.13]]){if(!Ve[ct].length)continue;let Vt=fe(new Kr(q(Ve[ct].map((_t,Rn)=>_t-Gt[Rn%3])),R(Nt)),Nt,a.list[Lt].end);Vt.position.set(...Gt),Vt.userData.constellation=!0,xe.push({lines:Vt,k:Lt})}});let et=(Ve,Lt)=>{let Gt=[],ct=Math.max(8,Math.ceil((Lt-Ve)/1.5));for(let Nt=0;Nt<=ct;Nt++)Gt.push(...fs(a,Ve+(Lt-Ve)*Nt/ct));return Gt};a.list.forEach((Ve,Lt)=>{let Gt=[];for(let Vt=0;Vt<120;Vt++){let _t=Math.PI*2*Vt/120,[Rn,ze]=br(Ve,Math.sin(_t)*(Ve.radius+1.6),Math.cos(_t)*(Ve.radius+1.6));Gt.push(Ve.centre[0]+Rn,Ve.centre[1]+ze,Ve.centre[2])}let ct=fe(Se(.8),.8,Ve.start);ct.userData.dots=!0,ct.userData.outer=!0,ke.push({points:ct,vertices:Gt,closed:!0});let Nt=a.list[Lt+1];if(Nt){let Vt=fe(Se(.7),.7,Nt.start);Vt.userData.dots=!0,ke.push({points:Vt,vertices:et(Ve.along+Ve.radius+1.6,Nt.along-Nt.radius-1.6),closed:!1})}});let lt=a.list.at(-1),ot=fe(Se(.7),.7,r);ot.userData.dots=!0,ke.push({points:ot,vertices:et(lt.along+lt.radius+1.6,a.length),closed:!1})})(),l.add(ce);let ft=Array.from({length:8},()=>{let D=Se(0);return D.visible=!1,l.add(D),D}),Te=new Float32Array(288),at={list:[],centre:[0,0,0],want:0,fade:0,galaxy:{}},De=D=>{let ne=new Float32Array(Jm*Vr*6),pe=m(ne,3),et=new Kr(new bt().setAttribute("position",pe),R(D));return et.frustumCulled=!1,et.geometry.setDrawRange(0,0),l.add(et),{lines:et,attribute:pe,positions:ne,indices:[],fade:0,opacity:D}},St=De(.7),$e=De(.3),qt=De(1),Tt=160,Ft=new Float32Array(Tt*Vr*6),jt=m(Ft,3),nn=new Kr(new bt().setAttribute("position",jt),R(.6));nn.frustumCulled=!1,nn.geometry.setDrawRange(0,0),l.add(nn);let sn={pairs:[],fade:0},hi=(D,ne,pe,et,lt,ot=1)=>{for(let Ve=0;Ve<Vr;Ve++)for(let[Lt,Gt]of[[0,Ve/Vr*ot],[1,(Ve+1)/Vr*ot]]){let ct=((ne*Vr+Ve)*2+Lt)*3;D[ct]=gr(pe.x,et.x,Gt),D[ct+1]=gr(pe.y,et.y,Gt),D[ct+2]=gr(pe.z,et.z,Gt)+4*Gt*(1-Gt)*lt}},On={map:new Map},gn=new P,yn=new P,G=new P,Yt={target:[...td],distance:700,yaw:0,pitch:ed},an={target:[...td],distance:340,yaw:0,pitch:ed},vt={x:0,y:0,goalX:0,goalY:0},Be={reveal:null,follow:-1,idle:!0,hover:-1,selection:-1,preview:-1,previewFade:0,ringFade:0,portrait:innerWidth/innerHeight<1,drift:0,turned:0,ring:-1,touched:-1e9},_r=Math.max(...[...t.map(D=>D.position),n.book,n.clone].map(D=>Math.hypot(D[0],D[1])))+12,on=()=>Math.max(160,_r*4.3)*(Be.portrait?1.3:1),ut=D=>Math.min(84,D*(Be.portrait?1.5:1)),rn=t.length+2,Fi=D=>D<t.length?D:D+2,He=Array.from({length:rn},()=>({x:0,y:0,r:0,on:!1,depth:0})),Xt=new P,Ut=new P,ri=(D,ne={})=>(Ut.copy(D).project(h),ne.x=(Ut.x*.5+.5)*innerWidth,ne.y=(-Ut.y*.5+.5)*innerHeight,ne.visible=Ut.z>-1&&Ut.z<1,ne),tr=({target:D,distance:ne,yaw:pe,pitch:et,follow:lt=-1}={})=>{D&&(an.target=[...D]),ne!==void 0&&(an.distance=wn(ne,6,640)),pe!==void 0&&(an.yaw=pe),et!==void 0&&(an.pitch=et),Be.follow=lt},Qn=(D=ed)=>tr({target:td,distance:on(),yaw:0,pitch:D}),Fn=new ht,Bn=()=>{let D=getComputedStyle(document.documentElement);Fn.set(D.getPropertyValue("--bg").trim()),I.value.set(D.getPropertyValue("--fg").trim()),F.forEach(({material:pe})=>pe.color.copy(I.value));let ne=Fn.getHSL({}).l<.5;c.setClearColor(Fn,1),$.blending=V.blending=ne?pr:bi,U=ne?1.25:.4,X.uHalo.value=ne?1:0,V.needsUpdate=!0,se.applyTheme(ne),Be.night=ne,M(),y.blending=bi,N.uGain.value=(ne?.55:.6)*re,N.uPaper.value=ne?0:1,$.needsUpdate=!0};Bn();let si=()=>{Be.portrait=innerWidth/innerHeight<1,h.aspect=innerWidth/innerHeight,c.setSize(innerWidth,innerHeight,!1)};si();let dn=new Map,An={index:-1,mix:0},Nn={x:0,y:0,on:!1,fine:matchMedia("(pointer: fine)").matches&&!ea(),strength:0},E={moved:!1,pinch:0,button:0},W={hover:()=>{},click:()=>{},frame:()=>{},touch:()=>{},error:D=>console.error(D)},K=!0,ae=(D,ne)=>{let pe=-1,et=1;return He.forEach((lt,ot)=>{if(!lt.on)return;let Ve=Math.max(26,lt.r*.9),Lt=Math.hypot(lt.x-D,lt.y-ne)/Ve;Lt<et&&([pe,et]=[ot,Lt])}),pe},Q=()=>{Be.idle=!1,Be.touched=performance.now()/1e3,W.touch()},ye=(D,ne)=>{an.target=Im(an,D,ne,innerHeight,h.fov*Math.PI/180),Be.follow=-1};i.addEventListener("pointerdown",D=>{if(!(D.pointerType==="mouse"&&D.button>2)){if(i.setPointerCapture(D.pointerId),dn.set(D.pointerId,{x:D.clientX,y:D.clientY,startX:D.clientX,startY:D.clientY}),dn.size===1&&Object.assign(E,{moved:!1,button:D.button,pinch:0,shift:D.shiftKey}),dn.size===2){let[ne,pe]=[...dn.values()];E.pinch=Math.hypot(ne.x-pe.x,ne.y-pe.y),E.moved=!0}Q()}}),i.addEventListener("pointermove",D=>{let ne=dn.get(D.pointerId);if(!ne){D.pointerType==="mouse"&&W.hover(ae(D.clientX,D.clientY),D);return}let pe=D.clientX-ne.x,et=D.clientY-ne.y;if(Math.hypot(D.clientX-ne.startX,D.clientY-ne.startY)>G1&&(E.moved=!0),[ne.x,ne.y]=[D.clientX,D.clientY],dn.size===2){let[lt,ot]=[...dn.values()],Ve=Math.hypot(lt.x-ot.x,lt.y-ot.y);E.pinch>0&&Ve>0&&(an.distance=ju(an.distance,Math.log(E.pinch/Ve))),E.pinch=Ve,ye(pe/2,et/2);return}E.moved&&(E.button===2||E.button===1||E.shift?ye(pe,et):Object.assign(an,Cm(an,-pe*.005,et*.004)))});let Ee=D=>{let ne=dn.get(D.pointerId);dn.delete(D.pointerId),ne&&!E.moved&&dn.size===0&&D.type==="pointerup"&&E.button===0&&W.click(ae(D.clientX,D.clientY),D)};i.addEventListener("pointerup",Ee),i.addEventListener("pointercancel",Ee),i.addEventListener("pointerleave",()=>{Nn.on=!1,W.hover(-1)}),i.addEventListener("pointermove",D=>{D.pointerType==="mouse"&&(Nn.on=Nn.fine,Nn.x=D.clientX/innerWidth*2-1,Nn.y=-(D.clientY/innerHeight)*2+1)}),i.addEventListener("contextmenu",D=>D.preventDefault()),i.addEventListener("wheel",D=>{D.preventDefault();let ne=D.deltaY*(D.deltaMode===1?40:D.deltaMode===2?innerHeight:1);an.distance=ju(an.distance,wn(ne*(D.ctrlKey?.012:.0016),-.5,.5)),Q()},{passive:!1});let Ce=new Va,Pe=new P,Fe=new P,Ze=Qs,Je=null,Oe=null,gt=!1,ln=!1,Bt=null,zt=!0,rt={last:-1/0},xt=0,We=()=>{let D=++xt;document.hidden?setTimeout(()=>xt===D&&Xe(performance.now()),1e3/sc.hidden):requestAnimationFrame(ne=>xt===D&&Xe(ne))};document.addEventListener("visibilitychange",()=>K&&We());let Xe=D=>{if(!K)return;if(!document.hidden&&!Sm(rt,D))return We();Ce.update(D);let ne=Math.min(Math.max(Ce.getDelta(),0),.25),pe=Ce.getElapsed();Oe??(Oe=pe);let et=wn(on()*Ze.from,6,640);gt&&Je===null&&(Je=pe,Bt=ln?null:{from:et});let lt=Je===null?0:pe-Je,ot=Math.min(1,Math.max(0,(lt-Ze.delay)/Ze.seconds)),Ve=cs(0,Ze.sky,pe-Oe);Be.follow>=0&&(ge(Be.follow,Fe),an.target=Fe.toArray());let Lt=Pm(Yt,an,ne,nd);if(Object.assign(Yt,Lt),Je===null)Yt.distance=et;else if(Bt){let Re=Math.min(1,lt/Ze.dolly);Re>=1||!Be.idle?Bt=null:Yt.distance=Math.exp(gr(Math.log(Bt.from),Math.log(an.distance),1-(1-Re)**3))}vt.x+=(vt.goalX-vt.x)*(1-Math.exp(-nd*ne)),vt.y+=(vt.goalY-vt.y)*(1-Math.exp(-nd*ne)),Be.drift+=((dn.size===0&&performance.now()/1e3-Be.touched>Ja.rest?1:0)-Be.drift)*(1-Math.exp(-ne*.6));let[Gt,ct,Nt]=Rm({...Yt,yaw:Yt.yaw+Math.sin(pe*Ja.rate)*Ja.yaw*Be.drift,pitch:Yt.pitch+Math.sin(pe*Ja.rate*.75+1)*Ja.pitch*Be.drift});h.position.set(Gt,ct,Nt),h.fov=ut(36),h.updateProjectionMatrix(),h.lookAt(Yt.target[0],Yt.target[1],Yt.target[2]),h.setViewOffset(innerWidth,innerHeight,-vt.x,-vt.y,innerWidth,innerHeight),h.updateMatrixWorld();let Vt=innerHeight/(2*Math.tan(h.fov*Math.PI/360)),_t=cs(.35,.75,Yt.distance/on());lt-Ze.delay-Ze.seconds-.5>0&&(Be.turned+=ne*gr(yi.near,1,_t));let Rn=Be.turned;a.list.forEach((Re,Ot)=>{Ot>=yi.slots||(te[Ot]=kd(Re,Rn),N.uSpin.value[Ot]=te[Ot])}),xe.forEach(({lines:Re,k:Ot})=>Re.rotation.z=te[Ot]??0);let ze=te[0].toFixed(3);i.dataset.spin!==ze&&(i.dataset.spin=ze),Nn.strength=Br(Nn.strength,Nn.on?1:0,ne,uc.rate),N.uPointer.value.set(Nn.x,Nn.y,Nn.strength);let Cn=Be.hover>=0&&Be.hover<t.length;Cn&&An.index!==Be.hover&&(An.mix*=.4,An.index=Be.hover),An.mix=Br(An.mix,Cn?1:0,ne,Cn?zr.inRate:zr.outRate),N.uHover.value.set(An.index,An.mix);let Sn=Nn.strength.toFixed(2);i.dataset.pointer!==Sn&&(i.dataset.pointer=Sn);let kn=Je===null?cs(Ze.seed,Ze.seed+1.6,pe-Oe):1,nr=lt>0?Math.min(1,lt/.45*Math.exp(1-lt/.45)):0;N.uSeedOn.value=z.uSeedOn.value=kn,N.uKick.value=nr,N.uMix.value=ot;let _n=Ed(a,Qu(ot));N.uTime.value=z.uTime.value=X.uTime.value=pe,X.uPixel.value=c.getPixelRatio(),N.uFar.value=_t,N.uScale.value=z.uScale.value=c.domElement.height/(2*Math.tan(h.fov*Math.PI/360)),z.uReveal.value=Math.min(1,Qu(ot)),zt=!1;for(let Re=0;Re<v.length;Re++){let Ot=g[Re]-v[Re];Math.abs(Ot)>.002?(v[Re]+=Ot*(1-Math.exp(-7*ne)),zt=!0):v[Re]=g[Re]}for(let Re of ve)v[Re]=g[Re]*(1+Wm*(.5+.5*Math.sin(pe*.9)));(zt||ve.length)&&(_.needsUpdate=!0);let Mn=(Re,Ot)=>{ge(t.length+Re,Xt),Me.setXYZ(Re,Xt.x,Xt.y,Xt.z),w.setX(Re,Ot)},Et=Re=>N.uReveal.value>=ms(Re)?1:0;Mn(0,Et(r)),Mn(1,Et(r)),ie.forEach((Re,Ot)=>ie[Ot]=Br(Re,Be.ring===Ot?1:0,ne,Be.ring===Ot?zr.inRate:zr.outRate)),Mn(2,Et(p)*(1+Za.light*ie[0])),Mn(3,Et(p)*(1+Za.light*ie[1])),A.setX(2,ue[2].size*(1+Za.grow*ie[0])),A.setX(3,ue[3].size*(1+Za.grow*ie[1])),Be.selection>=0&&(ge(Be.selection,Xt),Me.setXYZ(oe,Xt.x,Xt.y,Xt.z),A.setX(oe,2.2*t[Be.selection].spread+2)),Be.ringFade+=((Be.selection>=0?1:0)-Be.ringFade)*(1-Math.exp(-6*ne)),w.setX(oe,Be.ringFade),Be.preview>=0&&(ge(Be.preview,G),Me.setXYZ(_e,G.x,G.y,G.z),A.setX(_e,2.2*t[Be.preview].spread+2)),Be.previewFade+=((Be.preview>=0?1:0)-Be.previewFade)*(1-Math.exp(-9*ne)),w.setX(_e,Be.previewFade),Me.needsUpdate=A.needsUpdate=w.needsUpdate=!0;let Jt=`${Yt.yaw.toFixed(2)},${Yt.pitch.toFixed(2)},${Yt.distance.toFixed(0)}`;i.dataset.view!==Jt&&(i.dataset.view=Jt);let vn=Math.abs(Math.log(Yt.distance/an.distance))<.004&&Math.abs(Math.sin(Yt.yaw-an.yaw))<.003&&Math.abs(Yt.pitch-an.pitch)<.003&&Yt.target.every((Re,Ot)=>Math.abs(Re-an.target[Ot])<.03)&&Math.abs(vt.x-vt.goalX)<.5&&Math.abs(vt.y-vt.goalY)<.5?"1":"";i.dataset.rest!==vn&&(i.dataset.rest=vn);let Dt=Be.selection>=0?`${Xt.x.toFixed(2)},${Xt.y.toFixed(2)},${Xt.z.toFixed(2)}`:"";i.dataset.ring!==Dt&&(i.dataset.ring=Dt);let Kt=Be.preview>=0?String(Be.preview):"";i.dataset.preview!==Kt&&(i.dataset.preview=Kt);let Dn=cs(.25,.9,ot),xi=Math.min(_n,Be.reveal??1/0);ce.visible=Dn>.01,ce.children.forEach(Re=>Re.material.opacity=Re.userData.opacity*Dn*(Re.userData.constellation?1-_t:1)*(Re.userData.dots?Re.userData.outer?.4+.25*(1-_t):.75+.1*(1-_t):1)*Math.min(1,Math.max(0,(xi-Re.userData.year)/2))),qt.indices=Be.preview>=0&&Be.selection>=0&&Be.preview!==Be.selection?[Be.preview]:[];for(let Re of[St,$e,qt]){let Ot=Re.indices.length?1:0;Re.fade+=(Ot-Re.fade)*(1-Math.exp(-5*ne));let ai=Math.min(Re.indices.length,Jm);ai&&(ge(Be.selection,Fe),Re.indices.slice(0,ai).forEach((Ei,Bi)=>{ge(Ei,Pe),hi(Re.positions,Bi,Fe,Pe,Fe.distanceTo(Pe)*.22,On.map.get(Ei)??1)}),Re.attribute.needsUpdate=!0),Re.lines.geometry.setDrawRange(0,ai*Vr*2),Re.lines.material.opacity=Re.opacity*Re.fade,Re.lines.visible=Re.fade>.01}at.fade+=(at.want-at.fade)*(1-Math.exp(-5*ne)),J=1.15+.1*(1-_t),de=1+.3*(1-_t),ke.forEach(({points:Re,vertices:Ot,closed:ai})=>Re.userData.lay(Ot,ai)),ft.forEach((Re,Ot)=>{let ai=at.list[Ot],Ei=!!ai&&at.fade>.01;if(Re.visible=Ei,!!Ei){for(let Bi=0;Bi<96;Bi++){let ps=Math.PI*2*Bi/96,[Qa,vc]=br(at.galaxy,Math.sin(ps)*ai.radius,Math.cos(ps)*ai.radius);Te[Bi*3]=at.centre[0]+Qa,Te[Bi*3+1]=at.centre[1]+vc,Te[Bi*3+2]=at.centre[2]}Re.userData.lay(Te,!0),Re.material.color.copy(I.value),Re.material.opacity=.3*(1-.35*(Ot/Math.max(1,at.list.length-1)))*at.fade*Dn}});let ui=at.want&&at.fade>.5?String(at.list.length):"";i.dataset.rings!==ui&&(i.dataset.rings=ui);let ir=Dn;sn.fade+=((sn.pairs.length?1:0)-sn.fade)*(1-Math.exp(-5*ne));let di=Math.min(sn.pairs.length,Tt);di&&ir>.01&&(sn.pairs.slice(0,di).forEach(([Re,Ot,ai],Ei)=>{ge(Re,Fe),ge(Ot,Pe),hi(Ft,Ei,Fe,Pe,Fe.distanceTo(Pe)*(ai?.3:.12))}),jt.needsUpdate=!0),nn.geometry.setDrawRange(0,di*Vr*2),nn.material.opacity=.6*sn.fade*ir,nn.visible=nn.material.opacity>.01,i.dataset.jumps=nn.visible?String(di):"";let ds=1+W1*(1-_t);X.uGain.value=U*Ve*ds,se.update(pe,h,_n,Ve,ds),c.render(l,h),He.forEach((Re,Ot)=>{ge(Fi(Ot),Xt),Ut.copy(Xt).project(h),Re.x=(Ut.x*.5+.5)*innerWidth,Re.y=(-Ut.y*.5+.5)*innerHeight,Re.depth=h.position.distanceTo(Xt),Re.r=(t[Ot]?.spread??H1)*2.4*Vt/Re.depth,Re.on=Ut.z>-1&&Ut.z<1&&Re.x>0&&Re.x<innerWidth&&Re.y>0&&Re.y<innerHeight});try{W.frame({time:pe,dt:ne,intro:ot,formed:_n,far:_t,cssScale:Vt,projected:He,camera:h,entered:ot>=Ze.card,seen:Je===null&&pe-Oe>Ze.seed+1.2,seedIndex:ee})}catch(Re){K=!1,W.error(Re);return}K&&We()};return{camera:h,view:Yt,goal:an,inset:vt,state:Be,projected:He,on:(D,ne)=>W[D]=ne,stop:()=>K=!1,setQuality:D=>{let ne=mr.tiers[Math.min(D,mr.tiers.length-1)];N.uKeep.value=ne.keep,se.setTier(D),c.setPixelRatio(Math.min(devicePixelRatio,s?1.5:2,ne.ratio)),c.setSize(innerWidth,innerHeight,!1)},start:()=>We(),begin:(D="full")=>{gt=!0,ln=D!=="full",D==="direct"&&(Ze={...Qs,...Hm})},home:Qn,homeDistance:on,fly:tr,pick:ae,centerOf:D=>ge(D,new P),project:ri,resize:si,applyTheme:Bn,setLevels:D=>D.forEach((ne,pe)=>g[pe]=ne),setFilter:D=>{N.uFilterFacet.value=D?["threads","people","places"].indexOf(D.facet):-1,N.uFilterItem.value=D?D.item:-1,se.setDim(D?.45:1)},setFocus:D=>{N.uFocusOn.value=D===null?0:1,D!==null&&(N.uFocusU.value=ms(D))},setSelection:D=>Be.selection=D,setHover:D=>Be.hover=D,setRingGlow:D=>Be.ring=D,setFresh:D=>ve=D,setPreview:D=>Be.preview=D,setJumps:D=>sn.pairs=D,slotOf:D=>({today:t.length,book:t.length+2,clone:t.length+3})[D],setReveal:D=>{N.uReveal.value=D===null?1e4:ms(D),Be.reveal=D},setLinks:(D,ne)=>{St.indices=D,$e.indices=ne,i.dataset.links=String(D.length+ne.length)},setInset:(D,ne)=>{vt.goalX=D,vt.goalY=ne},setIdle:D=>Be.idle=D,setLinkReach:D=>On.map=D,groundAt:(D,ne,pe)=>{Ut.set(D/innerWidth*2-1,-(ne/innerHeight)*2+1,.5).unproject(h),Ut.sub(h.position).normalize();let et=(pe-h.position.z)/Ut.z,lt=2600,ot=Number.isFinite(et)&&et>0?Math.min(et,lt):lt;return[h.position.x+Ut.x*ot,h.position.y+Ut.y*ot]},arcScreen:(D,ne,pe,et={})=>(ge(D,gn),ge(ne,yn),G.set(gr(gn.x,yn.x,pe),gr(gn.y,yn.y,pe),gr(gn.z,yn.z,pe)+4*pe*(1-pe)*gn.distanceTo(yn)*.22),ri(G,et)),setYearRings:(D,ne,pe={})=>{ne.length?Object.assign(at,{list:ne,centre:D,galaxy:pe,want:1}):at.want=0}}}var X1="(min-height: 520px) and (min-width: 320px)",q1="(max-width: 900px), (max-aspect-ratio: 1/1)",sd=74,j1=124,Y1=24,Qm=8,$1=[0,22],eg={today:2.4,book:1.2,clone:1.2},tg=8,ad={quiet:.4,current:.9},ng=20,ig=2,Z1=.6,J1=40,us={width:104,height:100,top:118},rg="http://www.w3.org/2000/svg",od=matchMedia(q1),sg=.9,K1=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],Q1=new Set(["hero","contact"]),eS=["1","2","3"],Vn=[],_c=()=>{for(;Vn.length;)Vn.pop()();document.documentElement.classList.remove("immersive"),document.documentElement.classList.add("flat")};function og(){if(!$m()||ea())return _c();let i=matchMedia(X1);if(i.addEventListener("change",()=>location.reload()),!i.matches)return _c();tS().catch(e=>{console.error(e),_c()})}function ag(i){let e=0,t=n=>{[...n.childNodes].forEach(r=>{if(r.nodeType===Node.TEXT_NODE){let s=document.createDocumentFragment();r.textContent.split(/(\s+)/).forEach(a=>{if(!a)return;if(/^\s+$/.test(a))return s.append(a);let o=document.createElement("span");o.className="w",o.style.setProperty("--i",e++),o.textContent=a,s.append(o)}),r.replaceWith(s)}else r.nodeType===Node.ELEMENT_NODE&&t(r)})};t(i)}var qe=(i,e,t)=>{let n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n},ld=i=>i?i.split(","):[];async function tS(){let i=document.getElementById("scene"),e=document.querySelector(".stage"),t=document.querySelector("main.story"),n=document.querySelector(".hud"),r=document.querySelector(".rail"),s=document.querySelector(".masthead"),a=document.querySelector(".explore"),o=bd(),c=matchMedia("(max-width: 760px)").matches,l=JSON.parse(a.dataset.facets),h=JSON.parse(a.dataset.ahead),p=JSON.parse(a.dataset.periods??"[]"),d=[...t.querySelectorAll("[data-station]")].map((x,L)=>({element:x,kind:x.dataset.station,id:x.id,label:x.dataset.hud,t:L,panel:x.matches("[data-panel]")?x:x.querySelector("[data-panel]")})),u=d.length-1,m=x=>d.findIndex(L=>L.kind===x),[f,v,g,_]=["book","clone","contact","hero"].map(m),b=d.filter(x=>x.kind==="milestone"),T=b.map(({element:x})=>({id:x.dataset.milestone,date:x.dataset.date,weight:+x.dataset.weight,period:x.dataset.period,links:ld(x.dataset.links),...Object.fromEntries(rr.map(L=>[L,ld(x.dataset[L])]))})),S=Ad(T,l,{periods:p,today:o}),M=Lc(T,S.map(x=>x.year),{periods:p,today:o,threads:l.threads}),I=new Map(b.map((x,L)=>[x.t,L])),O=new Map([...t.querySelectorAll("li[data-ask]")].map(x=>[x.dataset.ask,new Set(ld(x.dataset.memories).map(L=>b.findIndex(j=>j.element.dataset.milestone===L)).filter(L=>L>=0))])),k=null,U=Object.fromEntries(rr.map(x=>[x,{}]));t.querySelectorAll("ul.facets").forEach(x=>x.querySelectorAll("li").forEach(L=>U[x.dataset.facet][L.dataset.item]=L.textContent));let X=b.map(x=>({time:x.element.querySelector("time").textContent,title:x.element.querySelector("h3").textContent,body:[...x.element.querySelectorAll(":scope > p:not(.kicker):not(.intro)")].map(L=>L.textContent).join(" ")})),V=b.flatMap((x,L)=>{let j=x.element.querySelector(".fresh");return!j||!bm(j.dataset.added)?[]:(j.hidden=!1,[L])}),Z=b.map((x,L)=>({index:L,id:x.id,title:X[L].title,body:X[L].body,extra:`${X[L].time} ${x.element.dataset.alt??""} ${rr.flatMap(j=>(S[L].members[j]??[]).map(Ie=>U[j][l[j][Ie]]??"")).join(" ")}`,weight:S[L].weight,order:L})),se=Fd({marks:S,today:o,random:hs(1980),facets:l,sky:M,cap:c?55e3:Mr.cap,trail:c?12e3:Mr.trail}),ee=Rd(M),re=new Set(pm(S)),N=Km({canvas:i,cloud:se,marks:S,future:ee,today:o,mobile:c,sky:M,kinds:b.map(x=>x.element.dataset.kind)});N.setFresh(V);let $=document.documentElement,he=!1,le=new Set,te=0,ge=()=>{clearTimeout(te),he=!0,$.dataset.entering="1",te=setTimeout(()=>ue(),2e4)},ue=()=>{he&&(he=!1,clearTimeout(te),$.dataset.entering="out",te=setTimeout(()=>delete $.dataset.entering,1600))};Vn.push(()=>{clearTimeout(te),delete $.dataset.entering});let oe=navigator.webdriver,ie=location.hash.length>1;!oe&&!ie&&ge(),N.home(),N.start();let ve=S.reduce((x,L,j)=>L.year<S[x].year?j:x,0),_e=qe("button","seed");_e.type="button",_e.setAttribute("aria-label",X[ve].title);let Me=!1,A=0,w=["pointerup","touchend","click","keydown"],C=()=>w.forEach(x=>document.removeEventListener(x,z,!0));function z(){Me||(Me=!0,clearTimeout(A),C(),N.begin(oe?"still":ie?"direct":"full"),_e.dataset.gone="1",setTimeout(()=>_e.remove(),1600))}oe||ie?z():(document.body.append(_e),A=setTimeout(z,Qs.wait*1e3),w.forEach(x=>document.addEventListener(x,z,!0))),Vn.push(()=>{clearTimeout(A),C(),_e.remove()});let y=new URLSearchParams(location.search).get("quality"),B=y==="low"?mr.tiers.length-1:0,F=y!=="full"&&y!=="low",R={frames:[],windows:0,from:0};N.setQuality(B),i.dataset.quality=String(B);let q=km(),Y=qe("div","labels");e.append(Y),Vn.push(()=>Y.remove());let J=S.map((x,L)=>{let j=qe("div","tag");return j.innerHTML='<b></b><span></span><i class="leader"></i>',j.querySelector("b").textContent=X[L].time,j.querySelector("span").textContent=X[L].title,j.setAttribute("aria-hidden","true"),Y.append(j),{node:j,leader:j.querySelector(".leader"),width:0,height:0,on:!1}}),de=Array.from({length:ig},()=>{let x=qe("button","edge-mark");return x.type="button",x.hidden=!0,x.tabIndex=-1,x.setAttribute("aria-hidden","true"),x.innerHTML="<span></span><i></i>",Y.append(x),x.addEventListener("click",()=>pe(An(+x.dataset.memory))),{node:x,label:x.querySelector("span"),arrow:x.querySelector("i"),width:0,height:0}}),Le="",Ne=Array.from({length:ng+1},()=>({x:0,y:0,visible:!0})),Se=[],ke=(x,L,j,Ie,Ue=1980,nt=0,wt=-1)=>{let Mt=qe("div",j,x);return Mt.setAttribute("aria-hidden","true"),Y.append(Mt),Se.push({node:Mt,world:L,base:Ie,year:Ue,kind:j,ring:nt,spotAt:wt,width:0,height:0,shown:-1}),Mt},ce=x=>new P(...x);ke(e.dataset.today,ce(ee.today),"ahead now",1,o,eg.today),Se.at(-1).kind="ahead";let fe=[];M.list.forEach((x,L)=>{let j=t.querySelector(`#period-${p[L]} [data-station]`);if(!j)return;let[Ie,Ue,nt]=x.centre,[wt,Mt]=[Ie+M.pole[0],Ue+M.pole[1]],Ht=Math.hypot(wt,Mt)||1,be=x.radius*.8+2,[It,cn]=br(x,wt/Ht*be,Mt/Ht*be),[bn,Ai]=(j.querySelector(".kicker")?.textContent??p[L]).split(" \xB7 "),zn=ke("",ce([Ie+It,Ue+cn,nt]),"galaxy",.9,(x.start+x.end)/2),Gr=qe("span","galaxy-hint",t.querySelector(`#period-${p[L]}`)?.dataset.hint??""),[Mc,...vr]=bn.split(" / "),ta=qe("span","galaxy-title");ta.append(qe("span","galaxy-number",Mc),...vr.length?[qe("span","galaxy-name",` / ${vr.join(" / ")}`)]:[]),zn.append(ta,qe("b","galaxy-count"),...Ai?[qe("span","galaxy-years",Ai)]:[],Gr,qe("i","leader")),fe[L]=Se.at(-1),fe[L].hint=Gr,fe[L].leader=zn.querySelector(".leader"),fe[L].centre=ce(x.centre),zn.dataset.go=`period-${p[L]}`,zn.addEventListener("click",pi=>{pi.stopImmediatePropagation(),to(rn===L?"top":zn.dataset.go)})});let xe=Array.from({length:tg},()=>(ke("",new P,"ring-year",ad.quiet,1980),Se.at(-1).dim=0,Se.at(-1))),Ae=e.dataset.until?io(e.dataset.until):-1;Ae>=0&&ke(ro(Ae,document.documentElement.lang),ce(ee.today.map((x,L)=>(x+ee.book[L])/2)),"countdown-mark",.8,o);let Wt=[["book",a.dataset.book,a.dataset.bookHint],["clone",a.dataset.clone,a.dataset.cloneHint]].map(([x,L,j],Ie)=>{let Ue=ke(L,ce(ee[x]),"ahead",.6,1/0,eg[x],S.length+Ie);return j&&Ue.append(qe("span","ahead-hint",j)),Se.at(-1)}),ft=x=>{Wt.forEach((L,j)=>{let Ie=x===S.length+j;Ie!==(L.node.dataset.hot==="1")&&(L.node.dataset.hot=Ie?"1":"")}),N.setRingGlow(x>=S.length?x-S.length:-1)};document.querySelectorAll('.masthead nav a[data-go="book"], .masthead nav a[data-go="clone"]').forEach(x=>{let L=S.length+(x.dataset.go==="book"?0:1);x.addEventListener("pointerenter",()=>ft(L)),x.addEventListener("focus",()=>ft(L)),x.addEventListener("pointerleave",()=>ft(Xt)),x.addEventListener("blur",()=>ft(Xt))});let Te=qe("aside","card");Te.setAttribute("tabindex","-1");let at=qe("div","card-body"),De=qe("nav","card-steps"),St=qe("button","step",""),$e=qe("button","step","");St.type=$e.type="button",St.dataset.step="previous",$e.dataset.step="next",De.append(St,$e);let qt=new Map,Tt=qe("p","visually-hidden");Tt.setAttribute("role","status"),t.querySelectorAll(".waitlist").forEach(x=>{let L=qe("div","card-form");L.hidden=!0,L.dataset.for=x.dataset.list;let[j,Ie]=[x.parentNode,x.nextSibling];L.append(x),qt.set(x.dataset.list,L),Vn.push(()=>j.insertBefore(x,Ie))});let Ft=qe("button","card-close","\u2715");Ft.type="button",Ft.dataset.go="top",Ft.setAttribute("aria-label",a.dataset.overview),Ft.setAttribute("title",a.dataset.overview),Te.append(Ft,at,...qt.values(),De,Tt),Te.id="card",e.after(Te),Vn.push(()=>Te.remove());let jt=qe("div","nudge");jt.hidden=!0;let nn=qe("a",""),sn=qe("button","","\u2715");sn.type="button",jt.append(nn,sn),De.before(jt);let hi=[...t.querySelectorAll("a, button, input, select, textarea")];hi.forEach(x=>x.setAttribute("tabindex","-1")),Vn.push(()=>hi.forEach(x=>x.removeAttribute("tabindex")));let On=document.querySelector(".skip");On&&(On.setAttribute("href","#card"),Vn.push(()=>On.setAttribute("href","#main")));let gn=vm([...M.list.flatMap(x=>[[x.centre[0]-x.radius,x.centre[1]-x.radius],[x.centre[0]+x.radius,x.centre[1]+x.radius]]),ee.today,ee.book,ee.clone].map(x=>[x[0],x[1]]),us),yn=qe("div","minimap");yn.hidden=!0,yn.setAttribute("aria-hidden","true");let G=document.createElementNS(rg,"svg");G.setAttribute("viewBox",`0 0 ${us.width} ${us.height}`);let Yt=(x,L)=>{let j=document.createElementNS(rg,x);return Object.entries(L).forEach(([Ie,Ue])=>j.setAttribute(Ie,Ue)),G.append(j),j};M.list.forEach(x=>{let[L,j]=gn.to(x.centre),Ie=Array.from({length:48},(Ue,nt)=>gn.to(br(x,Math.sin(Math.PI*2*nt/48)*x.radius,Math.cos(Math.PI*2*nt/48)*x.radius).map((wt,Mt)=>x.centre[Mt]+wt)));Yt("polygon",{points:Ie.map(([Ue,nt])=>`${Ue.toFixed(1)},${nt.toFixed(1)}`).join(" "),class:"mini-galaxy"})});let an=S.map(x=>{let[L,j]=gn.to(x.position);return Yt("circle",{cx:L.toFixed(1),cy:j.toFixed(1),r:(.6+x.weight*.35).toFixed(2),class:"mini-dot"})}),vt=0;[ee.book,ee.clone].forEach(x=>{let[L,j]=gn.to(x);Yt("circle",{cx:L.toFixed(1),cy:j.toFixed(1),r:2,class:"mini-future"})});let Be=Yt("polygon",{class:"mini-frame"}),_r=Yt("circle",{r:3.4,class:"mini-here"});yn.append(G),Te.after(yn),Vn.push(()=>yn.remove()),yn.addEventListener("click",x=>{let L=yn.getBoundingClientRect(),j=gn.from([(x.clientX-L.left)*us.width/L.width,(x.clientY-L.top)*us.height/L.height]),Ie=xm(M.list,j);Ie>=0&&to(`period-${p[Ie]}`)});let on={related:a.dataset.related,earlier:a.dataset.earlier,later:a.dataset.later,filter:a.dataset.filter,unfilter:a.dataset.unfilter,more:a.dataset.more,lit:a.dataset.lit,all:a.dataset.all,fewer:a.dataset.fewer,nudgebook:a.dataset.nudgebook,nudgeclone:a.dataset.nudgeclone,nudgeclose:a.dataset.nudgeclose,periodstart:a.dataset.periodstart},ut=0,rn=-1,Fi=()=>rn>=0?-1:dn(ut),He=null,Xt=-1,Ut={on:!1,over:0,away:0},ri={links:[],near:[]},tr=[],Qn=!1,Fn={x:0,y:0},Bn={on:!1,seen:!1,from:null},si={opened:new Set,sawClone:!1,closed:!1},dn=x=>I.get(x)??-1,An=x=>b[x].t,Nn=x=>{let L=d[x];if(L.kind==="hero")return{previous:null,next:b[0].t};if(L.kind==="milestone"){let{previous:j,next:Ie}=im(S,dn(x),He);return{previous:j!==null?An(j):!He&&dn(x)===0?0:null,next:Ie!==null?An(Ie):He?null:f}}return L.kind==="book"?{previous:b.at(-1).t,next:v}:L.kind==="clone"?{previous:f,next:g}:L.kind==="contact"?{previous:v,next:null}:{previous:null,next:null}},E=()=>{let x=Fi();ri=x>=0?ic(S,x):{links:[],near:[]};let L=[...ri.links,...ri.near];tr=x<0?[]:Qn?L:tm(S,x);let j=new Set(tr),Ie=k?O.get(k):null,Ue=Ie?am(S,Ie):rn>=0?S.map(be=>be.period===rn?fr.normal:fr.quiet):sm(S,{selected:x,near:j,weak:new Set(L.filter(be=>!j.has(be))),filter:He});N.setLevels(Ue),e.dataset.levels=[...new Set(Ue)].sort((be,It)=>be-It).join(","),N.setLinks(ri.links.filter(be=>j.has(be)),ri.near.filter(be=>j.has(be))),N.setSelection(x);let nt=rn>=0?rn:x>=0?S[x].period:-1;q.age(nt);let wt=(!Bn.on||rn>=0)&&nt>=0?Td(M.list[nt],tg):[],Mt=nt>=0?M.list[nt]:null;N.setYearRings(Mt?.centre??null,wt,Mt??{}),xe.forEach((be,It)=>{let cn=wt[It];if(be.dim=cn?1:0,!cn)return;be.node.textContent=String(cn.year),be.base=x>=0&&cn.year===Math.floor(S[x].year)?ad.current:ad.quiet;let[bn,Ai]=br(Mt,cn.radius*Math.sin(sg),cn.radius*Math.cos(sg));be.world.set(Mt.centre[0]+bn,Mt.centre[1]+Ai,Mt.centre[2]),be.width=0}),N.setFocus(x>=0?S[x].year:null),N.setFilter(He);let Ht=rc(S,He);if(N.setJumps(Ie?om(Ie,N.slotOf("clone")):lm(S,Ht)),M){let be=cm(S,Ht,M.list.length);fe.forEach((It,cn)=>{It&&(It.dim=nt>=0&&nt!==cn||["book","clone"].includes(d[ut].kind)?0:He&&!be[cn]?.3:1,It.pin=nt===cn,It.node.dataset.pin=It.pin?"1":"",It.pin?It.node.setAttribute("title",a.dataset.overview):It.node.removeAttribute("title"),It.hint.hidden=x>=0||!!He,It.node.querySelector(".galaxy-count").textContent=He?` \xB7 ${be[cn]}`:"",It.width=0)})}},W=x=>{let L=d[x];if(rn>=0){let j=M.list[rn];return N.fly({target:j.centre,distance:wn(j.radius*4.2+16,40,130),pitch:wn(N.goal.pitch,-.45,.5)}),N.setIdle(!1)}if(L.kind==="milestone"){let j=S[dn(x)],Ie=M.list[j.period];N.fly({target:Ie.centre.map((Ue,nt)=>Ue+(j.position[nt]-Ue)*.35),distance:wn(Ie.radius*4.2+16,40,130),pitch:wn(N.goal.pitch,-.45,.5)})}else L.kind==="book"||L.kind==="clone"?N.fly({target:ee[L.kind],distance:54,pitch:wn(N.goal.pitch,-.45,.5)}):L.kind==="contact"?N.fly({target:[0,0,-7],distance:N.homeDistance(),yaw:0,pitch:rd}):N.home();N.setIdle(L.kind==="hero")},K=x=>x.querySelectorAll("li[data-ask]").forEach(L=>{let j=qe("button","ask-q",L.querySelector(".ask-q").textContent);j.type="button",j.dataset.ask=L.dataset.ask,j.setAttribute("aria-pressed",String(k===L.dataset.ask)),L.replaceChildren(j)}),ae=x=>{if(k=x&&O.has(x)&&d[ut].kind==="clone"?x:null,e.dataset.asked=k??"",Te.querySelectorAll(".ask-q").forEach(j=>j.setAttribute("aria-pressed",String(j.dataset.ask===k))),E(),!k)return W(ut);N.fly({target:[0,0,-7],distance:N.homeDistance(),yaw:0,pitch:rd});let L=[...O.get(k)].map(j=>b[j].element.querySelector("h3").textContent);Tt.textContent=on.lit.replace("{n}",()=>String(L.length)).replace("{names}",()=>L.join(", "))},Q=x=>x.querySelectorAll("ul.facets").forEach(L=>{let j=L.dataset.facet;L.querySelectorAll("li").forEach(Ie=>{let Ue=qe("button","chip",Ie.textContent);Ue.type="button",Ue.dataset.facet=j,Ue.dataset.item=Ie.dataset.item,Ue.setAttribute("aria-pressed",String(He?.facet===j&&l[j][He.item]===Ie.dataset.item)),Ue.setAttribute("title",on.filter.replace("{thread}",Ie.textContent)),Ie.replaceChildren(Ue)})}),ye=(x,L)=>{let j=[...ri.links,...ri.near];if(!j.length)return;let Ie=Xu(S,L),Ue=Qn?j.slice(0,Qm):Ie,nt=qe("div","related");nt.append(qe("p","kicker",on.related));let wt=qe("ul");if(Ue.forEach(Mt=>{let Ht=qe("li"),be=qe("button","peer");be.type="button",be.dataset.memory=String(Mt),be.append(qe("time","",X[Mt].time),qe("span","",X[Mt].title)),Ht.append(be),wt.append(Ht)}),wt.addEventListener("scroll",()=>Fe()),nt.append(wt),j.length>Ie.length){let Mt=qe("button","expander",Qn?on.fewer:on.all.replace("{n}",String(Math.min(j.length,Qm))));Mt.type="button",Mt.setAttribute("aria-expanded",String(Qn)),nt.append(Mt)}x.append(nt)},Ee=()=>{let x=at.firstElementChild,L=Fi();!x||L<0||(x.querySelector(".related")?.remove(),ye(x,L),Te.dataset.collapsed=x.querySelector(".expander")&&!Qn?"1":"",Fe(),at.querySelector(".expander")?.focus({preventScroll:!0}))},Ce=qe("p","more-cue",a.dataset.continues??"");Ce.setAttribute("aria-hidden","true"),Te.append(Ce);let Pe=()=>{let x=at.scrollHeight>at.clientHeight+4&&at.scrollTop+at.clientHeight<at.scrollHeight-4,L=x?"1":"";Te.dataset.overflow!==L&&(Te.dataset.overflow=L),x&&(Ce.style.bottom=`${(De.hidden?0:De.offsetHeight)+10}px`)};at.addEventListener("scroll",Pe,{passive:!0});let Fe=()=>{Pe();let x=Te.querySelector(".related"),L=x?.querySelector("ul");if(!L)return;let j=L.getBoundingClientRect().bottom+2,Ie=[...L.children].filter(Ue=>Ue.getBoundingClientRect().bottom>j).length;x.dataset.more=L.scrollHeight>L.clientHeight+2&&Ie?on.more.replace("{n}",String(Ie)):""},Ze=-1,Je=x=>{Ze!==x&&(Ze=x,N.setPreview(x))},Oe=()=>{if(delete Te.dataset.fit,!!Q1.has(Te.dataset.kind)){Te.classList.add("measure");for(let x of eS){if(Te.scrollHeight<=Te.clientHeight)break;Te.dataset.fit=x}Te.classList.remove("measure")}},gt=()=>{let x=d[ut],L=x.panel.cloneNode(!0);["data-station","data-panel","id"].forEach(be=>L.removeAttribute(be)),L.querySelectorAll("[id]").forEach(be=>be.removeAttribute("id")),[...L.children].forEach(be=>be.matches(".kicker, .period-head")||be.remove()),L.querySelectorAll("h1, h2, h3").forEach(ag);let j=qe("button","period-start",on.periodstart.replace("{title}",()=>x.element.querySelector("h3")?.textContent??""));j.type="button",j.dataset.go=x.id;let Ie=S.filter(be=>be.period===rn),Ue=[[Ie.length,a.dataset.countMemories],[new Set(Ie.flatMap(be=>be.members.people??[])).size,a.dataset.countPeople],[new Set(Ie.flatMap(be=>be.members.places??[])).size,a.dataset.countPlaces]].filter(([be,It])=>be>0&&It).map(([be,It])=>It.replace("{n}",String(be))),nt=qe("div","related"),wt=qe("ul");S.forEach((be,It)=>{if(be.period!==rn)return;let cn=qe("li"),bn=qe("button","peer");bn.type="button",bn.dataset.memory=String(It),bn.append(qe("time","",X[It].time),qe("span","",X[It].title)),cn.append(bn),wt.append(cn)}),nt.append(wt),L.append(qe("p","period-facts kicker",Ue.join(" \xB7 ")),j,nt),Je(-1),at.replaceChildren(L),Te.dataset.collapsed="",Te.dataset.kind="period",qt.forEach(be=>be.hidden=!0);let Mt=be=>be>=0&&be<p.length&&S.some(It=>It.period===be)?be:null,Ht=(be,It,cn)=>{be.hidden=It===null,be.dataset.to="",be.dataset.periodTo=It??"",be.textContent=cn};Ht(St,Mt(rn-1),`\u2190 ${on.earlier}`),Ht($e,Mt(rn+1),`${on.later} \u2192`),De.hidden=St.hidden&&$e.hidden,Ft.hidden=!1,We.running=!1,We.year=null,N.setReveal(null),Xe()},ln=()=>{if(rn>=0)return gt(),requestAnimationFrame(Pe);let x=d[ut],L=x.panel.cloneNode(!0);L.removeAttribute("data-station"),L.removeAttribute("data-panel"),L.removeAttribute("id"),L.querySelectorAll("[id]").forEach(wt=>wt.removeAttribute("id")),L.querySelectorAll("[tabindex]").forEach(wt=>wt.removeAttribute("tabindex")),L.querySelectorAll("h1, h2, h3").forEach(ag),Q(L),K(L);let j=Fi();j>=0&&ye(L,j),x.kind==="milestone"&&L.querySelector(".period-head")?.remove(),Je(-1),at.replaceChildren(L),Te.dataset.collapsed=L.querySelector(".expander")&&!Qn?"1":"",Te.dataset.kind=x.kind,qt.forEach((wt,Mt)=>wt.hidden=x.kind!==Mt);let{previous:Ie,next:Ue}=Nn(ut),nt=(wt,Mt,Ht)=>{wt.hidden=Mt===null,wt.dataset.to=Mt??"",wt.textContent=Ht};nt(St,Ie,`\u2190 ${on.earlier}`),nt($e,Ue,`${on.later} \u2192`),De.hidden=x.kind==="hero"||Ie===null&&Ue===null,Ft.hidden=x.kind==="hero",Oe(),Fe(),Te.classList.remove("live"),Te.offsetWidth,Te.classList.add("live"),Te.scrollTop=0,Le="",x.kind!=="hero"&&qt.get(x.kind)?.scrollIntoView({block:"nearest"}),ne||(Tt.textContent=x.label),rt()},Bt=()=>{let x=d[ut];return x.kind==="hero"?ei.start:x.kind==="milestone"?S[dn(ut)].year:{book:ei.book,clone:ei.clone}[x.kind]??ei.end},zt=()=>{let x=d[ut],L=!si.closed&&si.opened.size>=3&&x.kind==="milestone"&&rn<0&&!x.element.dataset.quiet;if(jt.hidden=!L,!L)return;let j=si.sawClone?"clone":"book";nn.dataset.go=j,nn.href=`#${j}`,nn.textContent=on[j==="clone"?"nudgeclone":"nudgebook"],sn.setAttribute("aria-label",on.nudgeclose),sn.setAttribute("title",on.nudgeclose)};sn.addEventListener("click",()=>{si.closed=!0,zt(),Te.focus({preventScroll:!0})});let rt=()=>{let x=Te.getBoundingClientRect(),L=Math.max(sd,a.getBoundingClientRect().bottom+6);od.matches?N.setInset(0,(L+Math.max(L+120,x.top))/2-innerHeight/2):N.setInset((x.right+innerWidth)/2-innerWidth/2,(L+innerHeight-j1)/2-innerHeight/2)},xt=r?.querySelector("[data-play]"),We={running:!1,year:null,from:0},Xe=()=>{if(!xt)return;xt.setAttribute("aria-pressed",String(We.running));let x=We.running?xt.dataset.pauseLabel:xt.dataset.playLabel;xt.setAttribute("aria-label",x),xt.setAttribute("title",x),xt.querySelector(".rail-name").textContent=We.running?xt.dataset.pauseName:xt.dataset.playName,r.dataset.playing=We.year===null?"":We.running?"1":"paused"},D=()=>{We.year!==null&&(We.running=!1,We.year=null,N.setReveal(null),Xe())},ne=!1,pe=(x,{push:L=!0,hush:j=!1}={})=>{ne=j,D();let Ie=rn>=0||d[ut].kind!=="hero";ut=wn(x,0,u),rn=-1,e.dataset.period="",k=null,Qn=!1,e.dataset.asked="",He&&Ie&&d[ut].kind==="hero"&&lt(null),d[ut].kind==="milestone"&&!Bn.seen&&(Bn.seen=!0,Bn.on=!0,Bn.from={...Fn},e.dataset.gentle="1");let Ue=d[ut];if(document.documentElement.dataset.at=ut,n.textContent=Ue.label,E(),W(ut),d[ut].kind==="milestone"&&!j&&si.opened.add(ut),d[ut].kind==="clone"&&(si.sawClone=!0),ln(),zt(),r&&r.querySelector(".rail-cursor")?.style.setProperty("--x",`${_s(Bt()).toFixed(2)}%`),Ue.kind==="milestone"?q.memory(S[dn(ut)]):(Ue.kind==="book"||Ue.kind==="clone")&&q.swell(Ue.kind),L)try{history.replaceState(null,"",Ue.kind==="hero"?`${location.pathname}${location.search}`:`#${Ue.id}`)}catch{return}},et=(x,{push:L=!0}={})=>{let j=S.findIndex(Ie=>Ie.period===x);if(!(j<0)&&(ne=!1,D(),ut=An(j),rn=x,k=null,Qn=!1,e.dataset.asked="",e.dataset.period=p[x],document.documentElement.dataset.at=ut,n.textContent=d[ut].element.querySelector(".kicker")?.textContent??"",E(),W(ut),ln(),zt(),r?.querySelector(".rail-cursor")?.style.setProperty("--x",`${_s(Bt()).toFixed(2)}%`),q.memory(S[nm(S,x,1)[0]]),L))try{history.replaceState(null,"",`#period-${p[x]}`)}catch{return}},lt=x=>{He=x,a.querySelectorAll(".legend button").forEach(L=>{let j=L.closest(".legend").dataset.facet;L.setAttribute("aria-pressed",String(!!He&&He.facet===j&&l[j][He.item]===L.dataset.item))}),Te.querySelectorAll(".chip").forEach(L=>L.setAttribute("aria-pressed",String(!!He&&He.facet===L.dataset.facet&&l[L.dataset.facet][He.item]===L.dataset.item))),e.dataset.filter=He?`${He.facet}:${l[He.facet][He.item]}`:"",ot.hidden=!He,Gn.dataset.active=He?"1":"",Gn.setAttribute("aria-label",He?`${vn} \xB7 ${U[He.facet][l[He.facet][He.item]]??""}`:vn),He&&(ot.textContent=`\u2715 ${U[He.facet][l[He.facet][He.item]]??""}`,ot.setAttribute("aria-label",`${on.unfilter}: ${U[He.facet][l[He.facet][He.item]]??""}`)),E(),d[ut].kind==="milestone"&&rn<0&&ln()},ot=a.querySelector("[data-unfilter]");ot.addEventListener("click",()=>lt(null));let Ve=(x,L)=>{let j=l[x].indexOf(L);lt(He?.facet===x&&He.item===j?null:{facet:x,item:j})};a.querySelectorAll(".legend button").forEach(x=>x.addEventListener("click",()=>Ve(x.closest(".legend").dataset.facet,x.dataset.item)));let Lt=[...a.querySelectorAll(".legend")];Lt.forEach(x=>x.hidden=!1),Vn.push(()=>Lt.forEach(x=>x.hidden=!0));let Gt=a.querySelector("[data-legend-toggle]");Gt?.addEventListener("click",()=>{let x=a.dataset.legend!=="open";x&&Jt(!1),a.dataset.legend=x?"open":"",Gt.setAttribute("aria-expanded",String(x)),rt()}),e.dataset.filter="";let ct=a.querySelector(".finder"),Nt=ct.querySelector("input"),Vt=ct.querySelector(".results"),_t=ct.querySelector(".none"),Rn=a.querySelector("[data-find]"),ze=ct.querySelector(".preview"),Cn=x=>{ze.dataset.on=x>=0?"1":"",!(x<0)&&(ze.querySelector("time").textContent=X[x].time,ze.querySelector("strong").textContent=X[x].title,ze.querySelector("p").textContent=X[x].body.match(/^.*?[.!?](?=\s|$)/)?.[0]??X[x].body)},Sn=x=>{let L=x.target.closest?.(".peer[data-memory]"),j=L&&ct.contains(L)?+L.dataset.memory:-1;Cn(j),Je(j)},kn=x=>{let L=qe("li"),j=qe("button","peer");return j.type="button",j.dataset.memory=String(x),j.append(qe("time","",X[x].time),qe("span","",X[x].title)),L.append(j),L},nr=()=>Vt.replaceChildren(...[...t.querySelectorAll("section.period")].flatMap(x=>{let L=[...x.querySelectorAll("[data-station='milestone']")].map(Ie=>dn(d.findIndex(Ue=>Ue.element===Ie))),j=qe("li","group",x.querySelector(".kicker")?.textContent??"");return j.setAttribute("aria-hidden","true"),[j,...L.map(kn)]})),_n=x=>{ct.hidden=!x,Rn.setAttribute("aria-expanded",String(x)),x?(Nt.value.trim()||nr(),Mn.hidden||Jt(!1),Nt.focus()):(Cn(-1),Je(-1),ct.contains(document.activeElement)&&document.activeElement.blur(),Nt.value="",Vt.replaceChildren(),_t.textContent="")};Rn.addEventListener("click",()=>_n(ct.hidden)),ct.addEventListener("focusin",Sn),Vt.addEventListener("pointerover",Sn),Vt.addEventListener("pointerleave",()=>{(!ct.contains(document.activeElement)||document.activeElement===Nt)&&(Cn(-1),Je(-1))}),Nt.addEventListener("input",()=>{let x=Wu(Z,Nt.value),L=rm(S,l,U,Nt.value);Vt.replaceChildren(...L.map(j=>{let Ie=qe("li"),Ue=qe("button","peer show");return Ue.type="button",Ue.dataset.facet=j.facet,Ue.dataset.item=l[j.facet][j.item],Ue.append(qe("time","",String(j.count)),qe("span","",on.filter.replace("{thread}",j.title))),Ie.append(Ue),Ie}),...x.map(j=>kn(j.index))),Nt.value.trim()||nr(),_t.textContent=Nt.value.trim()&&!x.length&&!L.length?_t.dataset.none:""}),ct.addEventListener("submit",x=>{x.preventDefault(),Vt.querySelector("button")?.click()}),Vt.addEventListener("click",x=>{let L=x.target.closest("button");if(L){if(_n(!1),L.dataset.facet){let j=l[L.dataset.facet].indexOf(L.dataset.item);return lt(He?.facet===L.dataset.facet&&He.item===j?He:{facet:L.dataset.facet,item:j})}pe(An(+L.dataset.memory)),Te.focus({preventScroll:!0})}}),ct.addEventListener("keydown",x=>{if(x.key==="ArrowDown"||x.key==="ArrowUp"){let L=[...Vt.querySelectorAll("button")];if(!L.length)return;x.preventDefault();let j=L.indexOf(document.activeElement);L[wn(j+(x.key==="ArrowDown"?1:-1),0,L.length-1)]?.focus(),j===0&&x.key==="ArrowUp"&&Nt.focus()}}),a.querySelector("[data-surprise]").addEventListener("click",()=>{let x=dn(ut),L=x;for(;L===x&&S.length>1;)L=Math.floor(Math.random()*S.length);pe(An(L))});let Mn=a.querySelector(".guide"),Et=a.querySelector("[data-guide-toggle]"),Jt=x=>{Mn.hidden=!x,Et.setAttribute("aria-expanded",String(x)),x&&(_n(!1),a.dataset.legend="",Gt?.setAttribute("aria-expanded","false"))};Et.addEventListener("click",()=>Jt(Mn.hidden)),Rn.addEventListener("click",()=>!ct.hidden&&Jt(!1));let Gn=a.querySelector("[data-more-toggle]"),vn=Gn.getAttribute("aria-label"),Dt=x=>{a.dataset.sheet=x?"open":"",Gn.setAttribute("aria-expanded",String(x))};Gn.addEventListener("click",()=>Dt(a.dataset.sheet!=="open"));let Kt=a.querySelector(".sheet");Kt.addEventListener("click",x=>{let L=x.target.closest("button, a");if(!L||L.matches(".lang"))return L&&Dt(!1);Dt(!1),((L.matches("[data-legend-toggle]")?a.querySelector(".legend button"):Gn)??Gn).focus()}),Kt.addEventListener("focusout",x=>a.dataset.sheet==="open"&&!Kt.contains(x.relatedTarget)&&x.relatedTarget!==Gn&&Dt(!1));let Dn=x=>a.dataset.sheet==="open"&&!x.target.closest(".sheet, [data-more-toggle]")&&Dt(!1);document.addEventListener("pointerdown",Dn),i.addEventListener("pointerdown",()=>Jt(!1)),Vn.push(()=>document.removeEventListener("pointerdown",Dn));let xi=a.querySelector("[data-sound]");if(q.supported){xi.hidden=!1,xi.setAttribute("aria-pressed","true"),xi.addEventListener("click",()=>xi.setAttribute("aria-pressed",String(q.toggle())));let x=Ue=>{if(q.running())return j();Ue.target.closest?.("[data-sound]")||q.start()},L=["pointerup","touchend","click","keydown"],j=()=>L.forEach(Ue=>document.removeEventListener(Ue,x,!0));L.forEach(Ue=>document.addEventListener(Ue,x,!0));let Ie=()=>q.pause(document.hidden);document.addEventListener("visibilitychange",Ie),Vn.push(()=>{j(),document.removeEventListener("visibilitychange",Ie),q.close(),xi.setAttribute("aria-pressed","false"),xi.hidden=!0})}let ui=qe("p","visually-hidden");ui.setAttribute("role","status"),e.append(ui);let ir=null,di=()=>document.documentElement.dataset.focus==="1",ds=x=>{document.documentElement.dataset.focus=x?"1":"",ui.textContent=x?a.dataset.focusNote:"",ir=x?{...Fn}:null,x&&(Jt(!1),Dt(!1),_n(!1))},Re=()=>di()&&ds(!1),Ot=()=>{Bn.on&&(Bn.on=!1,e.dataset.gentle="",E())},ai=performance.now()/1e3,Ei=()=>ai=performance.now()/1e3,Bi=x=>{Fn.x=x.clientX,Fn.y=x.clientY,ir&&Math.hypot(Fn.x-ir.x,Fn.y-ir.y)>12&&Re(),Bn.on&&Math.hypot(Fn.x-Bn.from.x,Fn.y-Bn.from.y)>12&&Ot(),Math.abs(x.movementX)+Math.abs(x.movementY)>6&&Ei()},ps=()=>{Re(),Ot(),Ei()},Qa=[["pointermove",Bi],["pointerdown",ps],["wheel",ps],["touchstart",ps]];Qa.forEach(([x,L])=>addEventListener(x,L,{passive:!0})),Vn.push(()=>{Qa.forEach(([x,L])=>removeEventListener(x,L)),delete document.documentElement.dataset.focus});let vc=wm(S),xc={phase:"waiting",step:0,at:0};Te.addEventListener("pointerover",x=>{let L=x.target.closest(".related .peer");Je(L?+L.dataset.memory:-1)}),Te.addEventListener("pointerleave",()=>Je(-1)),Te.addEventListener("focusin",x=>{let L=x.target.closest(".related .peer");L&&Je(+L.dataset.memory)}),Te.addEventListener("focusout",()=>Je(-1)),Te.addEventListener("click",x=>{let L=x.target.closest(".chip");if(L)return Ve(L.dataset.facet,L.dataset.item);if(x.target.closest(".expander"))return Qn=!Qn,E(),Ee();let Ie=x.target.closest(".ask-q");if(Ie)return ae(k===Ie.dataset.ask?null:Ie.dataset.ask);let Ue=x.target.closest(".peer");if(Ue)return pe(An(+Ue.dataset.memory)),Te.focus({preventScroll:!0});let nt=x.target.closest(".step");if(nt&&nt.dataset.periodTo)return et(+nt.dataset.periodTo),Te.focus({preventScroll:!0});if(nt&&nt.dataset.to!=="")return pe(+nt.dataset.to),Te.focus({preventScroll:!0});let wt=x.target.closest("[data-go]");wt&&kr.has(wt.dataset.go)&&(x.preventDefault(),to(wt.dataset.go))});let kr=new Map(d.map(x=>[x.id,x.t])),eo=new Map(p.map((x,L)=>[`period-${x}`,L]));document.querySelectorAll("section.period").forEach(x=>{let L=x.querySelector("[data-station]");kr.set(x.id,d.findIndex(j=>j.element===L))});let to=x=>{if(!kr.has(x))return;if(eo.has(x))return et(eo.get(x));let L=kr.get(x);pe(L),d[L].kind!=="hero"&&qt.get(d[L].kind)?.querySelector("input, a, button")?.focus()},yc=()=>{let x;try{x=decodeURIComponent(location.hash.slice(1))}catch{return}if(!x)return pe(0,{push:!1});if(eo.has(x))return et(eo.get(x),{push:!1});kr.has(x)&&pe(kr.get(x),{push:!1})};document.querySelectorAll("[data-go]").forEach(x=>x.addEventListener("click",L=>{Te.contains(x)||!kr.has(x.dataset.go)||(L.preventDefault(),to(x.dataset.go))})),addEventListener("hashchange",yc),Vn.push(()=>removeEventListener("hashchange",yc)),t.addEventListener("focusin",x=>{let L=d.find(j=>j.element.contains(x.target));L&&L.t!==ut&&pe(L.t)});let cd={hero:_,book:f,clone:v};qt.forEach((x,L)=>x.addEventListener("focusin",()=>ut!==cd[L]&&pe(cd[L])));let hd={ArrowDown:1,ArrowRight:1,PageDown:1," ":1,ArrowUp:-1,ArrowLeft:-1,PageUp:-1},ud=x=>{if(!(x.metaKey||x.ctrlKey||x.altKey)&&(Ei(),Ot(),!(di()&&x.key.toLowerCase()!=="h"&&(ds(!1),x.key==="Escape")))){if(x.key==="Escape"){if(!Mn.hidden)Jt(!1),Et.focus();else if(a.dataset.sheet==="open")Dt(!1),Gn.focus();else if(!ct.hidden)_n(!1),Rn.focus();else{if(x.target.closest("input, textarea, select"))return;k?ae(null):He?lt(null):ut!==0&&pe(0)}return}if(!x.target.closest("input, textarea, select, .finder")){if(x.key==="/")return x.preventDefault(),_n(!0);if(x.key==="?")return x.preventDefault(),Jt(Mn.hidden);if(x.key.toLowerCase()==="h")return x.preventDefault(),x.repeat?void 0:ds(!di());if(!(x.key===" "&&x.target.closest("button, a, summary, [role='button']"))){if(x.key==="Home")x.preventDefault(),pe(0);else if(x.key==="End")x.preventDefault(),pe(g);else if(x.key in hd){x.preventDefault();let L=x.key===" "&&x.shiftKey?-1:hd[x.key],{previous:j,next:Ie}=Nn(ut),Ue=L>0?Ie:j;Ue!==null&&pe(Ue)}}}}};addEventListener("keydown",ud),Vn.push(()=>removeEventListener("keydown",ud)),N.on("hover",x=>{if(x>=0&&x!==Xt&&q.tick(),Xt=x,Te.querySelectorAll(".peer[data-lit]").forEach(L=>delete L.dataset.lit),x>=0){let L=Te.querySelector(`.related .peer[data-memory="${x}"]`);if(L){L.dataset.lit="1";let j=L.closest("ul");L.offsetTop<j.scrollTop?j.scrollTop=L.offsetTop:L.offsetTop+L.offsetHeight>j.scrollTop+j.clientHeight&&(j.scrollTop=L.offsetTop+L.offsetHeight-j.clientHeight)}}N.setHover(x),ft(x),i.style.cursor=x>=0?"pointer":""});let lg=x=>x===S.length?f:x===S.length+1?v:-1;N.on("click",x=>{x>=0&&pe(x<S.length?An(x):lg(x))});let dd=d.filter(x=>["milestone","book","clone"].includes(x.kind)),Sc=d.map(x=>x.kind==="milestone"?S[dn(x.t)].year:{hero:ei.start,book:ei.book,clone:ei.clone}[x.kind]??ei.end);if(r){let x=r.querySelector(".rail-track"),L=r.querySelector(".rail-tip");r.querySelector(".rail-today")?.style.setProperty("--x",`${_s(o).toFixed(2)}%`);let j=Ht=>{let be=x.getBoundingClientRect();return ei.start+wn((Ht.clientX-be.left)/be.width,0,1)*(ei.end-ei.start)},Ie=Ht=>dd.reduce((be,It)=>Math.abs(Sc[It.t]-Ht)<Math.abs(Sc[be.t]-Ht)?It:be,dd[0]),Ue=Ht=>`${Ht.element.querySelector("time")?.textContent??""} \xB7 ${Ht.element.querySelector("h3, h2")?.textContent??""}`.replace(/^ · /,""),nt=!1,wt=-1,Mt=Ht=>{let be=Ie(j(Ht));return L.textContent=Ue(be),L.style.setProperty("--x",`${_s(Sc[be.t]).toFixed(2)}%`),L.dataset.on="1",be};x.addEventListener("pointerdown",Ht=>{nt=!0,x.setPointerCapture(Ht.pointerId);let be=Mt(Ht);wt=be.t,pe(be.t)}),x.addEventListener("pointermove",Ht=>{let be=Mt(Ht);nt&&be.t!==wt&&(wt=be.t,pe(be.t))}),x.addEventListener("pointerup",()=>nt=!1),x.addEventListener("pointerleave",()=>L.dataset.on="")}xt?.addEventListener("click",()=>{if(We.running)return We.running=!1,Xe();We.year===null&&(ut!==0&&pe(0),We.year=1980),We.running=!0,We.from=performance.now()/1e3-Vd(We.year,o),Xe()});let cg=()=>{let x=[Te,a,n,r].filter(Boolean).map(j=>j.getBoundingClientRect()),L=ct.hidden?null:ct.getBoundingClientRect();return L&&x.push(L),x},wi=(x,L)=>x.left<L.right&&x.right>L.left&&x.top<L.bottom&&x.bottom>L.top;N.on("frame",({formed:x,projected:L,camera:j,cssScale:Ie,time:Ue,dt:nt,intro:wt,entered:Mt,seen:Ht})=>{if(_e.isConnected){let H=L[ve];_e.style.left=`${H.x}px`,_e.style.top=`${H.y}px`,_e.style.visibility=H.on?"visible":"hidden"}if(he&&(Number.isFinite(x)&&M.list.forEach((H,Ke)=>{if(le.has(Ke)||x<H.start)return;le.add(Ke);let kt=S.findIndex(At=>At.year>=H.start-.01);kt>=0&&q.memory({...S[kt],period:-1})}),Mt&&ue()),F&&R.windows<mr.windows&&wt>=1&&!document.hidden&&(R.from||(R.from=Ue+1),Ue>=R.from&&(R.frames.push(Mm(nt*1e3)),R.frames.length>=mr.window))){let H=Em(B,Tm(R.frames));R.frames=[],R.windows++,H!==B&&(B=H,N.setQuality(B),i.dataset.quality=String(B))}let be=performance.now()/1e3,It=!document.hidden&&ct.hidden&&Mn.hidden&&a.dataset.sheet!=="open"&&!He&&We.year===null&&!di()&&!document.activeElement?.closest?.("input, textarea, select, button, a, .finder, .card, .masthead, .rail")&&!Te.matches(":hover"),cn=Am(xc,{now:be,idleSince:ai,eligible:It&&(xc.phase==="touring"||ut===0),plan:vc},{wait:+a.dataset.idle||20,hold:+a.dataset.tourHold||6});xc=cn.state,cn.open?.age!==void 0?et(cn.open.age,{push:!1}):cn.open?pe(cn.open.ahead==="book"?f:v,{push:!1,hush:!0}):cn.done&&pe(0,{push:!1,hush:!0}),We.running&&(We.year=zd(performance.now()/1e3-We.from,o),N.setReveal(We.year),r.querySelector(".rail-cursor")?.style.setProperty("--x",`${_s(We.year).toFixed(2)}%`),n.textContent=String(Math.floor(We.year)),We.year>=o&&(D(),n.textContent=d[ut].label)),Ut.over=Xt>=0?Ut.over+nt:0,Ut.away=Xt>=0?0:Ut.away+nt,Ut.over>.35?Ut.on=!0:Ut.away>.8&&(Ut.on=!1);let bn=Fi(),Ai=N.view.distance/N.homeDistance(),zn=cg().map(H=>({left:H.left-12,right:H.right+12,top:H.top-12,bottom:H.bottom+12}));zn.push({left:0,right:innerWidth,top:0,bottom:Math.max(sd,(s?.getBoundingClientRect().bottom??0)+4)},{left:0,right:innerWidth,top:innerHeight-60,bottom:innerHeight});let Gr=[],Mc=od.matches,vr=!Bn.on&&ym(Ai,innerWidth,520,!Mc||Te.getBoundingClientRect().top>=us.top+us.height+8),ta=vr?"on":"off";e.dataset.map!==ta&&(e.dataset.map=ta),yn.hidden===vr&&(yn.hidden=!vr);let pi=vr?yn.getBoundingClientRect():null;if(vr&&bn>=0){let H=S[bn].position[2];vt++%8===0&&an.forEach((dt,In)=>{let pn=N.centerOf(In),[tt,fn]=gn.to([pn.x,pn.y]);dt.setAttribute("cx",tt.toFixed(1)),dt.setAttribute("cy",fn.toFixed(1))}),Be.setAttribute("points",[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([dt,In])=>gn.to(N.groundAt(dt,In,H)).map(pn=>pn.toFixed(1)).join(",")).join(" "));let Ke=N.centerOf(bn),[kt,At]=gn.to([Ke.x,Ke.y]);_r.setAttribute("cx",kt.toFixed(1)),_r.setAttribute("cy",At.toFixed(1))}pi&&(zn.push({left:pi.left-8,right:pi.right+8,top:pi.top-8,bottom:pi.bottom+8}),Gr.push(pi));let fd=new Map,md=[],bc=[];if(bn>=0&&We.year===null&&!He){let H=Te.getBoundingClientRect(),Ke=od.matches,kt={left:Ke?12:H.right+12,right:innerWidth-12,top:Math.max(sd,a.getBoundingClientRect().bottom+6),bottom:Math.min((r?.getBoundingClientRect().top??innerHeight-100)-8,Ke?H.top-8:1/0)},At=L[bn],dt=Math.min(innerWidth,innerHeight)/2,In=At&&At.x>=kt.left&&At.x<=kt.right&&At.y>=kt.top&&At.y<=kt.bottom?{left:Math.max(kt.left,At.x-dt),right:Math.min(kt.right,At.x+dt),top:Math.max(kt.top,At.y-dt),bottom:Math.min(kt.bottom,At.y+dt)}:kt;tr.slice(0,J1).forEach(tt=>{let fn=Ne.map((mn,hn)=>N.arcScreen(bn,tt,hn/ng,mn)),Rt=fm(fn,In),it=L[tt]?.on&&!wi({left:L[tt].x,right:L[tt].x,top:L[tt].y,bottom:L[tt].y},H);Rt&&!it&&md.push({j:tt,...Rt})});let pn=md.slice(0,ig).map((tt,fn)=>{let Rt=de[fn],it=`${X[tt.j].title} \xB7 ${X[tt.j].time}`;Rt.label.textContent!==it&&(Rt.label.textContent=it,Rt.width=Rt.height=0),Rt.node.hidden=!1,Rt.width||(Rt.width=Rt.node.offsetWidth),Rt.height||(Rt.height=Rt.node.offsetHeight);let mn=mm(tt,In);return{mark:Rt,exit:tt,side:mn,box:gm(tt,mn,Rt,In),shown:!1}});_m(pn,In,4,pi?[{left:pi.left,right:pi.right,top:pi.top,bottom:pi.bottom}]:[]),de.forEach((tt,fn)=>{let Rt=pn[fn];Rt?.shown?tt.keep=Z1:tt.keep>0&&tt.held&&(!Rt||Rt.exit.j===tt.held.exit.j)?tt.keep-=nt:tt.held=null;let it=Rt?.shown?Rt:tt.held;tt.held=it??null,tt.node.hidden=!it,it&&(tt.node.style.transform=`translate3d(${it.box.left.toFixed(1)}px, ${it.box.top.toFixed(1)}px, 0)`,tt.node.dataset.memory=String(it.exit.j),tt.node.dataset.side=it.side,fd.set(it.exit.j,it.exit.t),bc.push(it.exit.j),Gr.push(it.box),tt.arrow.style.cssText=`left: ${(it.exit.x-it.box.left).toFixed(1)}px; top: ${(it.exit.y-it.box.top).toFixed(1)}px; --a: ${it.exit.angle.toFixed(3)}rad`,zn.push({left:it.box.left-4,right:it.box.right+4,top:it.box.top-4,bottom:it.box.bottom+4}))})}else de.forEach(H=>{H.node.hidden=!0,H.held=null});N.setLinkReach(fd),e.dataset.edges=String(de.filter(H=>!H.node.hidden).length||"");let gd=bc.join(",");if(gd!==Le){Le=gd;let H=new Set(bc.map(String));Te.querySelectorAll(".peer[data-memory]").forEach(Ke=>Ke.dataset.out=H.has(Ke.dataset.memory)?"1":"")}let Qt={x:0,y:0,visible:!1},Hn={x:0,y:0,visible:!1},hg=fe.filter(H=>H&&H.dim>0).map(H=>{N.project(H.centre,Hn);let[Ke,kt]=[Hn.x,Hn.y];return N.project(H.world,Qt),{item:H,x:Ke,y:kt,r:Math.hypot(Qt.x-Ke,Qt.y-kt)}}),ug=L.slice(S.length).filter(H=>H.on).map(H=>({item:null,x:H.x,y:H.y,r:Math.max(H.r,12)}));Se.forEach(H=>{let Ke=H.base*(H.year<=x?1:0);if(We.year!==null&&H.year>We.year&&(Ke=0),Ke*=H.dim??1,N.project(H.world,Qt),!Qt.visible)Ke=0;else if(H.width||(H.width=H.node.offsetWidth),H.height||(H.height=H.node.offsetHeight),H.kind==="ahead"){let{width:At,height:dt}=H,In=H.spotAt>=0?L[H.spotAt].r:H.ring*Ie/j.position.distanceTo(H.world),pn=dm(In),tt=$1.flatMap(fn=>K1.map(([Rt,it])=>{let mn=pn+fn,hn=Qt.x+Rt*mn-(Rt<0?At:Rt===0?At/2:0),xr=Qt.y+it*mn-(it<0?dt:it===0?dt/2:0);return{left:hn,right:hn+At,top:xr,bottom:xr+dt}})).find(fn=>fn.left>=12&&fn.right<=innerWidth-12&&!zn.some(Rt=>wi(fn,Rt)));tt?(H.node.style.transform=`translate3d(${tt.left.toFixed(1)}px, ${tt.top.toFixed(1)}px, 0)`,H.node.style.setProperty("--cx",Qt.x.toFixed(1)),H.node.style.setProperty("--cy",Qt.y.toFixed(1)),H.node.style.setProperty("--r",Math.min(In,70).toFixed(1)),Ke>.2&&zn.push({left:tt.left-4,right:tt.right+4,top:tt.top-4,bottom:tt.bottom+4})):Ke=0}else{if(H.centre){N.project(H.centre,Hn);let pn=Math.atan2(Qt.y-Hn.y,Qt.x-Hn.x),tt=Math.hypot(Qt.x-Hn.x,Qt.y-Hn.y),fn=({turn:Vi,scale:oi})=>{let[Hr,li]=[Math.cos(pn+Vi*(Math.PI/4)),Math.sin(pn+Vi*(Math.PI/4))],Wn=Math.abs(Hr)*(H.width/2)+Math.abs(li)*(H.height/2)+4,yr=wn(Hn.x+Hr*(tt*oi+Wn),H.width/2+12,innerWidth-H.width/2-12),wc=Hn.y+li*(tt*oi+Wn);return{x:yr,y:wc,box:{left:yr-H.width/2,right:yr+H.width/2,top:wc-H.height/2,bottom:wc+H.height/2}}},Rt=({box:Vi})=>!zn.some(oi=>wi(Vi,oi))&&!Gr.some(oi=>wi(Vi,oi)),it=Vi=>{let{box:oi}=fn(Vi);return[...hg,...ug].reduce((Hr,li)=>Hr+Math.max(0,li.r*.95-Math.hypot(wn(li.x,oi.left,oi.right)-li.x,wn(li.y,oi.top,oi.bottom)-li.y))*(li.item===H?.6:li.item===null?1.5:1),0)},hn=(H.option&&Rt(fn(H.option))&&it(H.option)===0?H.option:null)??(()=>{let Vi=[1,1.5,2.1,2.8].flatMap(Wn=>[0,1,-1,2,-2,3,-3,4,.5,-.5,1.5,-1.5,2.5,-2.5,3.5,-3.5].map(yr=>({turn:yr,scale:Wn}))),oi=Vi.filter(Wn=>Rt(fn(Wn))).map(Wn=>({candidate:Wn,cost:it(Wn)+(Wn.scale-1)*18})),Hr=oi.reduce((Wn,yr)=>yr.cost<Wn.cost-.5?yr:Wn,{candidate:Vi[0],cost:1/0}),li=oi.find(Wn=>Wn.candidate.turn===H.option?.turn&&Wn.candidate.scale===H.option?.scale);return li&&li.cost<=Hr.cost+8?li.candidate:Hr.candidate})();H.option=hn;let xr=fn(hn);Qt.x=xr.x,Qt.y=xr.y;let zi=qu(xr.box,{x:Hn.x,y:Hn.y,r:tt*2});H.node.dataset.leader=zi&&zi.length>10&&!H.pin?"1":"",zi&&Object.assign(H.leader.style,{left:`${zi.x.toFixed(1)}px`,top:`${zi.y.toFixed(1)}px`,width:`${zi.length.toFixed(1)}px`,transform:`rotate(${zi.angle.toFixed(3)}rad)`});let vd=`${Hn.x.toFixed(0)},${Hn.y.toFixed(0)},${tt.toFixed(0)}`;H.mass!==vd&&(H.mass=vd,H.node.style.setProperty("--cx",Hn.x.toFixed(0)),H.node.style.setProperty("--cy",Hn.y.toFixed(0)),H.node.style.setProperty("--r",tt.toFixed(0)))}if(Qt.x=wn(Qt.x,H.width/2+12,innerWidth-H.width/2-12),H.pin){let pn=H.height+6,tt=[0,1,-1,2,-2,3,-3].map(fn=>Qt.y+fn*pn).find(fn=>!zn.some(Rt=>wi({left:Qt.x-H.width/2,right:Qt.x+H.width/2,top:fn-H.height/2,bottom:fn+H.height/2},Rt)));tt!==void 0&&(Qt.y=tt)}H.node.style.transform=`translate3d(${Qt.x.toFixed(1)}px, ${Qt.y.toFixed(1)}px, 0)`;let At=H.kind==="ring-year"||H.kind==="countdown-mark"?1:4,dt={left:Qt.x-H.width/2-At,right:Qt.x+H.width/2+At,top:Qt.y-H.height/2-At,bottom:Qt.y+H.height/2+At};(H.kind==="ring-year"||H.kind==="countdown-mark")&&zn.some(pn=>wi(dt,pn))&&(Ke=0);let In={left:dt.left+4,right:dt.right-4,top:dt.top+4,bottom:dt.bottom-4};H.kind==="galaxy"&&!H.pin&&(Gr.some(pn=>wi(In,pn))||zn.some(pn=>wi(In,pn)))&&(Ke=0),Ke>.2&&zn.push(dt)}let kt=Math.round(Ke*100)/100;kt!==H.shown&&(H.shown=kt,H.node.style.opacity=kt,H.node.style.visibility=kt>0?"visible":"hidden")});let dg=innerWidth<=760?8:Ai>.8?14:Y1,Tc=[],_d=[];L.forEach((H,Ke)=>Ke<S.length&&H.on&&H.r>3&&_d.push({j:Ke,left:H.x-H.r*.7,right:H.x+H.r*.7,top:H.y-H.r*.7,bottom:H.y+H.r*.7})),J.forEach((H,Ke)=>{let kt=L[Ke],At=S[Ke],dt=0;Ke===bn?dt=1e3:Ke===Xt?dt=900:Ke===Ze?dt=880:He&&At.members[He.facet]?.includes(He.item)?dt=300+At.weight:At.weight>=3&&Ai<.6?dt=30:At.weight===2&&Ai<.5?dt=20:Ai<.22&&(dt=10),bn>=0&&dt<500&&(dt=0),Ut.on&&Ke!==Xt&&dt===40&&(dt=0),At.year+3>x&&Ke!==bn&&(dt=0),!Me&&Ht&&Ke===ve&&(dt=900),rn>=0&&(dt=Ke===Xt||Ke===Ze?900:0),We.year!==null&&(dt=At.year<=We.year&&At.year>We.year-2.5?800+At.weight:0),dt>0&&kt.on?Tc.push({tag:H,spot:kt,priority:dt,i:Ke}):H.on&&(H.on=!1,H.node.dataset.on="")}),Tc.sort((H,Ke)=>Ke.priority-H.priority||H.i-Ke.i);let Ec=[];for(let{tag:H,spot:Ke,priority:kt,i:At}of Tc){let dt=kt===40||kt===900&&At===Xt&&bn<0&&rn<0&&Ai>=.6?"1":"",In=At===bn||At===Xt?"1":"";(H.node.dataset.name!==dt||H.node.dataset.hot!==In)&&(H.glide=H.node.dataset.hot!==In,H.node.dataset.cool=H.node.dataset.hot==="1"&&!In?"1":"",H.node.dataset.name=dt,H.node.dataset.hot=In,H.width=H.height=0),H.width||(H.width=H.node.offsetWidth),H.height||(H.height=H.node.offsetHeight);let pn=hm(Ke,{width:H.width,height:H.height},innerWidth);if(pn.forEach((mn,hn)=>mn.slot=hn),kt>=900){let mn=wn(Ke.x-H.width/2,12,innerWidth-H.width-12);pn.splice(8,0,{left:mn,right:mn+H.width,top:Ke.y-H.height/2,bottom:Ke.y+H.height/2,far:!1})}let tt=mn=>mn.left>=12&&mn.right<=innerWidth-12,it=um(pn,{free:mn=>tt(mn)&&!zn.some(hn=>wi(mn,hn))&&!Ec.some(hn=>wi(mn,{left:hn.left-6,right:hn.right+6,top:hn.top-4,bottom:hn.bottom+4})),clear:mn=>!_d.some(hn=>hn.j!==At&&wi(mn,hn)),inside:tt,forced:kt>=900,keep:H.on?H.slot:-1});if(it&&!(it.far&&kt<900)&&Ec.length<dg){Ec.push(it);let mn=H.on&&H.slot!==void 0&&H.slot!==it.slot;H.slot=it.slot;let hn=it.far?qu(it,Ke):null;hn?(Object.assign(H.leader.style,{left:`${hn.x.toFixed(1)}px`,top:`${hn.y.toFixed(1)}px`,width:`${hn.length.toFixed(1)}px`,transform:`rotate(${hn.angle.toFixed(3)}rad)`}),H.node.dataset.leader="1"):H.node.dataset.leader="",(H.glide||mn)&&H.on&&H.last&&(H.slide=[H.last.left-it.left,H.last.top-it.top]),H.glide=!1,H.last={left:it.left,top:it.top};let xr=Math.exp(-3*nt);H.slide=H.slide?H.slide.map(zi=>Math.abs(zi)<.3?0:zi*xr):[0,0],H.node.style.transform=`translate3d(${(it.left+H.slide[0]).toFixed(1)}px, ${(it.top+H.slide[1]).toFixed(1)}px, 0)`,H.node.style.setProperty("--cx",Ke.x.toFixed(1)),H.node.style.setProperty("--cy",Ke.y.toFixed(1)),H.on||(H.on=!0,H.node.dataset.on="1")}else H.on&&(H.on=!1,H.node.dataset.on="")}}),new ResizeObserver(rt).observe(Te);let pd=()=>{N.resize(),Oe(),Fe(),rt(),d[ut].kind==="hero"?N.home():W(ut)};addEventListener("resize",pd),addEventListener("themechange",N.applyTheme),Vn.push(()=>{removeEventListener("resize",pd),removeEventListener("themechange",N.applyTheme)}),N.on("error",x=>{console.error(x),_c()}),document.documentElement.classList.add("immersive"),document.fonts?.ready.then(()=>{J.forEach(x=>(x.width=0,x.height=0)),Oe(),Fe(),rt()}),a.dataset.ready="1",pe(0,{push:!1}),yc(),rt()}og();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
