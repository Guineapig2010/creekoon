(()=>{function Ue(r){let t=r>>>0;return function(){t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function js(r,t,e){let n=Math.imul(r,374761393)^Math.imul(t,668265263)^Math.imul(e,2246822519);return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967296}var wc=r=>r*r*(3-2*r);function Qe(r,t,e=0){let n=Math.floor(r),i=Math.floor(t),s=wc(r-n),o=wc(t-i),a=js(n,i,e),l=js(n+1,i,e),c=js(n,i+1,e),h=js(n+1,i+1,e);return(a+(l-a)*s+(c-a)*o+(a-l-c+h)*s*o)*2-1}function Un(r,t,e=3,n=0){let i=0,s=.5,o=1,a=0;for(let l=0;l<e;l++)i+=s*Qe(r*o,t*o,n+l*17),a+=s,s*=.5,o*=2.03;return i/a}var de=(r,t,e)=>r<t?t:r>e?e:r,le=(r,t,e)=>r+(t-r)*e;function Zt(r,t,e){let n=de((e-r)/(t-r),0,1);return n*n*(3-2*n)}var Qs=.008333333333333333,tr=2.5,ne=98.5,Re=99.25,Bt=[{id:"grounds",name:"Old Rolling Grounds",s:92,cost:0,base:10,eta:5.5,target:"5 s",blurb:"A short launch chute, exposed roots, and a gravel-bed bend."},{id:"waterfall",name:"Waterfall Run",s:80.7,cost:350,base:30,eta:16,target:"14\u201318 s",blurb:"A rock chute over a waterfall into a plunge pool before the original stretch."},{id:"shelf",name:"Continental Shelf",s:68,cost:1500,base:65,eta:31,target:"26\u201334 s",blurb:"A shelf along the right side near the waterfall. A short exposed drop feeds the waterfall approach."},{id:"springs",name:"Crawfish Springs",s:54,cost:6500,base:120,eta:48,target:"42\u201352 s",blurb:"A spring-fed pool above the Shelf, followed by a narrow rocky spillway."},{id:"alder",name:"Alder Bend",s:34,cost:22e3,base:220,eta:72,target:"60\u201374 s",blurb:"An undercut bank, a split around a gravel island, and a rejoin before the Springs."},{id:"gorge",name:"Upper Gorge",s:0,cost:75e3,base:400,eta:100,target:"85\u2013105 s",blurb:"Two steep rock steps and a short stretch of whitewater above Alder Bend."}],Sc=50.6;function Ec(r){let t=Bt[r].s,e=[];for(let n of Bt)n.s>t+.01&&e.push(n.s);return t<Sc&&e.push(Sc),e.sort((n,i)=>n-i),e}var Tc=[{id:"factory",name:"Factory"},{id:"creek",name:"Creek"},{id:"balls",name:"Balls"},{id:"finish",name:"Finish"}],yi=[{id:"press",tab:"factory",name:"Auto Press",price:25,requires:[],effect:"Makes one ball every 3 s and adds an eight-ball hopper."},{id:"feeder",tab:"factory",name:"Auto Feeder",price:45,requires:["press"],effect:"Launches one queued ball every 2.5 s when the chute is clear."},{id:"quickMold",tab:"factory",name:"Quick Mold",price:95,requires:["press"],effect:"Press interval 3 s \u2192 2.2 s. The brass mold opens faster."},{id:"lowFriction",tab:"factory",name:"Low-Friction Chute",price:140,requires:["feeder"],effect:"Feeder interval 2.5 s \u2192 1.8 s. Launch speed spread \xB122% \u2192 \xB17%."},{id:"hopperExt",tab:"factory",name:"Hopper Extension",price:240,requires:["press"],effect:"Hopper storage 8 \u2192 20 balls to hold a reserve during blockages or moves."},{id:"twinPress",tab:"factory",name:"Twin Press",price:650,requires:["quickMold"],effect:"Adds a second press head. Combined production 2.2 s \u2192 1.55 s per ball."},{id:"indexed",tab:"factory",name:"Indexed Feeder",price:850,requires:["lowFriction"],effect:"Rotating pocket wheel. Release interval 1.8 s \u2192 1.3 s."},{id:"servo",tab:"factory",name:"Servo Drive",price:3200,requires:["twinPress"],effect:"Twin Press interval 1.55 s \u2192 1.15 s."},{id:"bulkHopper",tab:"factory",name:"Bulk Hopper",price:4500,requires:["hopperExt"],effect:"Hopper storage 20 \u2192 40 balls, with a visible fill gauge."},{id:"turbo",tab:"factory",name:"Turbo Line",price:18e3,requires:["servo","indexed"],effect:"Press and feeder both run at one ball every 0.85 s."},{id:"rootRail",tab:"creek",name:"Root Bend Rail",price:75,requires:[],area:0,spot:"root",effect:"Rail across the gap under the exposed root at Old Rolling Grounds so balls cannot wedge there."},{id:"gravelMat",tab:"creek",name:"Gravel Run Mat",price:120,requires:[],area:0,spot:"gravel",effect:"Rubber mat over the roughest gravel patch. Removes random slowdowns there."},{id:"splashGuard",tab:"creek",name:"Splash Guard",price:280,requires:[],area:1,spot:"lip",effect:"Side walls at the waterfall lip catch balls that bounce sideways off the lip rocks."},{id:"poolGuide",tab:"creek",name:"Pool Guide",price:525,requires:[],area:1,spot:"pool",effect:"Floating boom on the outside of the plunge pool keeps balls out of its slow eddy."},{id:"catchRamp",tab:"creek",name:"Shelf Catch Ramp",price:1100,requires:[],area:2,spot:"catch",effect:"Ramp under the Shelf drop that receives falling balls and sends them into the waterfall approach."},{id:"debrisScreen",tab:"creek",name:"Spring Debris Screen",price:2800,requires:[],area:3,spot:"springs",effect:"Screen that holds the drifting driftwood in the Springs pool out of the ball channel."},{id:"spillRail",tab:"creek",name:"Spillway Rail",price:3600,requires:[],area:3,spot:"spillway",effect:"Twin rails keep balls centred through the narrow spillway, away from the snag rocks."},{id:"alderBypass",tab:"creek",name:"Alder Bypass",price:8500,requires:[],area:4,spot:"island",effect:"Bank-side guide at the island split so balls skip the dead pocket and rejoin below the island."},{id:"landingBoards",tab:"creek",name:"Gorge Landing Boards",price:24e3,requires:[],area:5,spot:"gorgeStep",effect:"Angled boards soften hard deflections at the first Gorge drop and keep balls in the main flow."},{id:"clearingArm",tab:"creek",name:"Automatic Clearing Arm",price:32e3,requires:[],area:5,spot:"arm",effect:"Mechanical sweep at the busiest bottleneck (the spillway mouth) returns stalled balls to the same channel. No cash, no skipped checkpoints."},{id:"premiumFelt",tab:"balls",name:"Premium Felt",price:180,requires:[],effect:"New balls get a blue band and +$5 on their finish payout."},{id:"cores",tab:"balls",name:"Consistent Cores",price:380,requires:[],effect:"Rounder cores: low-speed wobble reduced by about 70%."},{id:"seamPress",tab:"balls",name:"Seam Press",price:900,requires:["cores"],effect:"Even seams: launch-to-launch speed and aim variation reduced by about 75%."},{id:"waterResist",tab:"balls",name:"Water-Resistant Felt",price:2100,requires:["premiumFelt"],effect:"Water uptake cut by 75%. Balls stay lighter and ride higher through the plunge pool."},{id:"reinforced",tab:"balls",name:"Reinforced Core",price:5200,requires:["seamPress"],effect:"Bounce after hard drops becomes consistent (restitution spread \xB10.13 \u2192 \xB10.03)."},{id:"batchStamp",tab:"balls",name:"Finished Batch Stamp",price:9500,requires:["waterResist"],effect:"Readable production stamp and a +$25 finish bonus on new balls."},{id:"wideBasket",tab:"finish",name:"Wide Catch Basket",price:200,requires:[],effect:"Basket room 6 \u2192 14 balls and settling time 1.6 s \u2192 0.9 s, so the exit clears faster."},{id:"timingGate",tab:"finish",name:"Timing Gate",price:800,requires:[],effect:"In-world board: last finish time, balls per minute, and average travel time from the selected start."},{id:"spacingSensor",tab:"finish",name:"Spacing Sensor",price:4e3,requires:["feeder"],effect:"Replaces the feeder\u2019s 1.25 s / 1 m landing buffer with a sensor that releases at the earliest safe moment."},{id:"conveyor",tab:"finish",name:"Automatic Basket Conveyor",price:14e3,requires:["wideBasket"],effect:"Empties the basket continuously (0.3 s per ball) and stacks finished balls in a crate."}],bn=Object.fromEntries(yi.map(r=>[r.id,r])),Ne={PREMIUM:1,CORES:2,SEAM:4,WATER:8,REINFORCED:16,STAMP:32};function ki(r){let t=0;return r.has("premiumFelt")&&(t|=Ne.PREMIUM),r.has("cores")&&(t|=Ne.CORES),r.has("seamPress")&&(t|=Ne.SEAM),r.has("waterResist")&&(t|=Ne.WATER),r.has("reinforced")&&(t|=Ne.REINFORCED),r.has("batchStamp")&&(t|=Ne.STAMP),t}function Es(r){return(r&Ne.PREMIUM?5:0)+(r&Ne.STAMP?25:0)}function Ac(r){let t=3;r.has("quickMold")&&(t=2.2),r.has("twinPress")&&(t=1.55),r.has("servo")&&(t=1.15),r.has("turbo")&&(t=.85);let e=2.5;r.has("lowFriction")&&(e=1.8),r.has("indexed")&&(e=1.3),r.has("turbo")&&(e=.85);let n=8;r.has("hopperExt")&&(n=20),r.has("bulkHopper")&&(n=40);let i=r.has("wideBasket")?14:6,s=1.6;return r.has("wideBasket")&&(s=.9),r.has("conveyor")&&(s=.3),{press:t,feeder:e,hopper:n,basketCap:i,drain:s}}var qt=-5,Je=108,Hi=-10,Au=10,Pe=.05,_i=.04,Vi=.25,Pt={GRAVEL:0,ROCK:1,SAND:2,DIRT:3,MAT:4,WOOD:5,METAL:6,RUBBER:7},zo=[{e:.42,mu:.6,crr:.05,bump:.05,name:"gravel"},{e:.72,mu:.5,crr:.015,bump:.015,name:"rock"},{e:.28,mu:.7,crr:.08,bump:.008,name:"sand"},{e:.32,mu:.8,crr:.1,bump:.03,name:"dirt"},{e:.4,mu:.55,crr:.006,bump:0,name:"mat"},{e:.55,mu:.4,crr:.012,bump:.004,name:"wood"},{e:.6,mu:.3,crr:.008,bump:0,name:"metal"},{e:.35,mu:.6,crr:.02,bump:0,name:"rubber"}],Fe=Pt.GRAVEL,Et=Pt.ROCK,Nn=Pt.SAND,Te=Pt.DIRT,er=[[-5,.36,.36,.11,0,1.2,1.3,1.3,.45,.03,.08,Et,Et],[0,.34,.34,.11,0,1.35,1.25,1.25,.45,.03,.1,Et,Et],[8.9,.28,.28,.09,0,1.7,1.2,1.2,.45,.025,.12,Et,Et],[9.1,.5,.5,.36,0,.9,1,.22,.12,.02,.25,Et,Et],[10.6,.5,.45,.3,.05,1,1,.4,.3,.02,.18,Et,Et],[11.6,.33,.33,.12,.1,1.5,1.1,1.1,.45,.03,.12,Et,Et],[19.9,.28,.28,.09,0,1.75,1.2,1.2,.45,.025,.12,Et,Et],[20.1,.48,.48,.34,0,.9,1,1,.5,.02,.25,Et,Et],[21.4,.42,.42,.25,0,1.1,1,1,.5,.02,.2,Et,Et],[22.4,.27,.27,.11,0,1.95,1.1,1.1,.45,.04,.38,Et,Et],[29.5,.29,.29,.12,0,1.8,1,1,.45,.035,.32,Et,Et],[33,.38,.38,.15,0,1.15,.6,.6,.8,.02,.12,Et,Te],[34.5,.42,.42,.17,0,2.16,.45,.45,.9,.012,.08,Fe,Te],[38,.48,.55,.24,.9,1.93,.42,.6,.9,.012,.08,Fe,Te],[41.5,.45,.5,.2,.6,2.05,.42,.5,.9,.012,.08,Fe,Te],[44.2,.62,.68,.18,.05,1.87,.4,.42,.9,.012,.08,Fe,Te],[45.6,.78,1.05,.18,-.1,1.73,.4,.42,.9,.012,.08,Fe,Te],[46.7,.8,1.3,.18,-.1,1.64,.42,.42,.9,.012,.08,Fe,Te],[48,.75,1,.18,-.2,1.77,.42,.42,.9,.012,.08,Fe,Te],[50.2,.48,.48,.2,-.3,2,.42,.42,.9,.012,.08,Fe,Te],[53,.45,.45,.2,0,2,.4,.4,.9,.012,.08,Fe,Te],[54.6,.62,.62,.3,0,1.08,.35,.35,1.2,.01,.08,Nn,Te],[55.8,.98,.98,.55,.2,.8,.35,.35,1.2,.01,.1,Nn,Te],[61,.92,.92,.5,.1,.85,.38,.38,1.2,.01,.1,Nn,Te],[62.3,.4,.4,.2,0,.85,.5,.5,.5,.02,.12,Et,Et],[62.9,.12,.12,.1,.1,1.55,.6,.6,.35,.02,.18,Et,Et],[66.4,.12,.12,.1,1.2,1.6,.6,.6,.35,.02,.18,Et,Et],[67.3,.27,.27,.09,2,1.2,.5,.9,.4,.02,.12,Et,Et],[68,.27,.27,.075,2,1,-1.25,1.5,.16,.012,.08,Et,Et],[76,.26,.26,.07,2.2,1,-1.25,1.5,.16,.012,.08,Et,Et],[77.9,.26,.26,.07,1.6,1.15,-1.25,1.4,.16,.012,.1,Et,Et],[78.3,.28,.28,.07,1.4,1.2,-1.25,1.4,.16,.012,.1,Et,Et],[78.7,.36,.36,.17,1.25,1,.35,.45,.4,.02,.2,Et,Et],[79.6,.3,.3,.14,.75,1.6,.45,.5,.4,.025,.15,Et,Et],[80.7,.28,.28,.14,.2,1.8,.45,.5,.4,.025,.15,Et,Et],[85.25,.25,.25,.12,0,2.05,.5,.5,.4,.02,.12,Et,Et],[85.55,.25,.25,.12,0,2.1,.5,.5,.4,.02,.12,Et,Et],[85.9,.25,.25,.12,0,2.1,.5,.5,.4,.02,.12,Et,Et],[86.1,.42,.42,.9,0,.6,.14,.14,.06,.015,.3,Nn,Nn],[86.9,.5,.5,.8,0,.6,.18,.18,.08,.015,.25,Nn,Nn],[87.6,.65,.65,.7,0,.62,1,1,.4,.015,.22,Nn,Et],[88.6,.8,.98,.45,0,.8,1,.8,.5,.015,.14,Nn,Et],[90.5,.42,.42,.18,0,1.35,.4,.4,.8,.012,.08,Fe,Te],[92,.4,.42,.06,0,1.74,.26,.3,.8,.01,.08,Fe,Te],[93.6,.42,.45,.055,.15,1.74,.26,.28,.8,.01,.08,Fe,Te],[95.3,.48,.42,.05,.55,1.79,.26,.3,.8,.012,.08,Fe,Te],[97,.42,.42,.06,.2,1.85,.26,.28,.8,.01,.08,Fe,Te],[98.5,.36,.36,.08,0,1.5,.25,.25,.8,.008,.06,Fe,Te],[99.6,.42,.42,.14,0,.55,.25,.25,.8,.008,.04,Fe,Te],[108,.45,.45,.18,0,.5,.25,.25,.8,.008,.04,Fe,Te]],Ru=[[-5,.045],[34,.012],[54,.003],[62.3,.11],[67.6,.02],[79,.06],[86,0],[90,.035],[92,.035],[108,.02]],wn=[{s:9,h:1.1,len:.1,name:"gorge1"},{s:20,h:.9,len:.1,name:"gorge2"},{s:78.45,h:1.3,len:.16,name:"shelf"},{s:86,h:2.3,len:.1,name:"waterfall"}],Rc=[{s:86,len:1.45,w:.62,jet:.9,jetDepth:.32,under:.55,boil:.35},{s:9,len:.6,w:.35,jet:.6,jetDepth:.22,under:.5,boil:.25},{s:20,len:.6,w:.35,jet:.6,jetDepth:.22,under:.5,boil:.25}];function Cu(r,t){let e=0;for(;e<er.length-2&&er[e+1][0]<=r;)e++;let n=er[e],i=er[e+1],s=Zt(n[0],i[0],r);return t.wL=le(n[1],i[1],s),t.wR=le(n[2],i[2],s),t.D=le(n[3],i[3],s),t.c=le(n[4],i[4],s),t.U=le(n[5],i[5],s),t.bankL=le(n[6],i[6],s),t.bankR=le(n[7],i[7],s),t.bankW=le(n[8],i[8],s),t.rough=le(n[9],i[9],s),t.turb=le(n[10],i[10],s),t.bedMat=s<.5?n[11]:i[11],t.bankMat=s<.5?n[12]:i[12],t}function Oo(r){return 3.6*Math.sin(2*Math.PI*(r+18)/66)+1.2*Math.sin(2*Math.PI*(r-5)/41)}var nr=class{constructor(){this.buildCentreline(),this.buildRows(),this.buildFeatures(),this.bakeBed(),this.buildRocks(),this.bakeFlow(),this.buildColliders()}buildCentreline(){let e=[],n=[],i=0,s=-140,o=Oo(s),a=[];for(;s<=30;s+=.005){let u=Oo(s);a.length&&(i+=Math.hypot(u-o,.005)),a.push([s,i]),o=u}let l=0;for(let[u,d]of a)if(u>=0){l=d;break}for(let[u,d]of a)e.push(u),n.push(d-l+ne);let c=Math.round((Je-qt)/Vi)+1;this.nC=c,this.cx=new Float64Array(c),this.cz=new Float64Array(c),this.tx=new Float64Array(c),this.tz=new Float64Array(c),this.kap=new Float64Array(c);let h=0;for(let u=0;u<c;u++){let d=qt+u*Vi;for(;h<n.length-2&&n[h+1]<d;)h++;let p=(d-n[h])/(n[h+1]-n[h]),g=le(e[h],e[h+1],p);this.cz[u]=g,this.cx[u]=Oo(g)}for(let u=0;u<c;u++){let d=Math.max(0,u-1),p=Math.min(c-1,u+1),g=this.cx[p]-this.cx[d],x=this.cz[p]-this.cz[d],m=Math.hypot(g,x);this.tx[u]=g/m,this.tz[u]=x/m}for(let u=0;u<c;u++){let d=Math.max(0,u-1),p=Math.min(c-1,u+1),g=this.tx[d]*this.tz[p]-this.tz[d]*this.tx[p];this.kap[u]=g/((p-d)*Vi)}}worldXZ(t,e,n={}){let i=(t-qt)/Vi;i=de(i,0,this.nC-1.0001);let s=Math.floor(i),o=i-s,a=le(this.cx[s],this.cx[s+1],o),l=le(this.cz[s],this.cz[s+1],o),c=le(this.tx[s],this.tx[s+1],o),h=le(this.tz[s],this.tz[s+1],o),u=Math.hypot(c,h);return c/=u,h/=u,n.x=a-h*e,n.z=l+c*e,n}frame(t,e={}){let n=de((t-qt)/Vi,0,this.nC-1.0001),i=Math.floor(n),s=n-i,o=le(this.tx[i],this.tx[i+1],s),a=le(this.tz[i],this.tz[i+1],s),l=Math.hypot(o,a);return o/=l,a/=l,e.tx=o,e.tz=a,e.nx=-a,e.nz=o,e.kap=le(this.kap[i],this.kap[i+1],s),e}locate(t,e,n,i){let s,o;n<0?(s=0,o=this.nC-2):(s=Math.max(0,n-3),o=Math.min(this.nC-2,n+3));let a=1/0,l=0,c=0;for(let f=s;f<=o;f++){let _=this.cx[f],y=this.cz[f],v=this.cx[f+1]-_,M=this.cz[f+1]-y,S=((t-_)*v+(e-y)*M)/(v*v+M*M);S=S<0?0:S>1?1:S;let A=_+v*S-t,T=y+M*S-e,w=A*A+T*T;w<a&&(a=w,l=f,c=S)}if(n>=0&&(l===s||l===o)&&s>0&&o<this.nC-2)return this.locate(t,e,l,i);let h=this.cx[l],u=this.cz[l],d=h+(this.cx[l+1]-h)*c,p=u+(this.cz[l+1]-u)*c,g=le(this.tx[l],this.tx[l+1],c),x=le(this.tz[l],this.tz[l+1],c),m=Math.hypot(g,x);return g/=m,x/=m,i.s=qt+(l+c)*Vi+((t-d)*g+(e-p)*x),i.d=(t-d)*-x+(e-p)*g,i.idx=l,i.tx=g,i.tz=x,i.kap=le(this.kap[l],this.kap[l+1],c),i}buildRows(){let t=Math.round((Je-qt)/Pe)+1;this.nS=t;let e=()=>new Float32Array(t);this.rY0=e(),this.rC=e(),this.rWL=e(),this.rWR=e(),this.rD=e(),this.rU=e(),this.rBankL=e(),this.rBankR=e(),this.rBankW=e(),this.rRough=e(),this.rTurb=e(),this.rBedMat=new Uint8Array(t),this.rBankMat=new Uint8Array(t),this.rFoam=e(),this.rY0s=e(),this.rDcds=e();let n={},i=0,s=new Float64Array(t);for(let h=0;h<t;h++){let u=qt+h*Pe;if(h>0){let d=0;for(let[p,g]of Ru)u>=p&&(d=g);i-=d*Pe}s[h]=i}let o=h=>{let u=0;for(let d of wn)u+=d.h*Zt(d.s-d.len/2,d.s+d.len/2,h);return u};for(let h=0;h<t;h++)s[h]-=o(qt+h*Pe);let a=Math.round((ne-qt)/Pe),l=-s[a];for(let h=0;h<t;h++){let u=qt+h*Pe;Cu(u,n),this.rY0[h]=s[h]+l,this.rC[h]=n.c,this.rWL[h]=n.wL,this.rWR[h]=n.wR,this.rD[h]=n.D,this.rU[h]=n.U,this.rBankL[h]=n.bankL,this.rBankR[h]=n.bankR,this.rBankW[h]=n.bankW,this.rRough[h]=n.rough,this.rTurb[h]=n.turb,this.rBedMat[h]=n.bedMat,this.rBankMat[h]=n.bankMat}let c=Math.round(5/Pe);for(let h=0;h<t;h++){let u=0,d=0;for(let p=-c;p<=c;p+=4){let g=de(h+p,0,t-1);u+=this.rY0[g],d++}this.rY0s[h]=u/d}for(let h=0;h<t;h++){let u=Math.max(0,h-2),d=Math.min(t-1,h+2);this.rDcds[h]=(this.rC[d]-this.rC[u])/((d-u)*Pe)}for(let h=0;h<t;h++){let u=qt+h*Pe,d=de((this.rTurb[h]-.1)*2.5,0,1);for(let p of wn){let g=u-p.s;g>-.15&&g<2.2&&(d=Math.max(d,(g<0?.5:1)*Math.exp(-Math.max(0,g)/(.5+p.h*.4))))}this.rFoam[h]=d}}rowIndex(t){return de((t-qt)/Pe,0,this.nS-1.0001)}row(t,e){let n=this.rowIndex(e),i=n|0,s=n-i;return t[i]+(t[i+1]-t[i])*s}y0(t){return this.row(this.rY0,t)}c(t){return this.row(this.rC,t)}wL(t){return this.row(this.rWL,t)}wR(t){return this.row(this.rWR,t)}buildFeatures(){this.pads=Bt.map((t,e)=>{let n=t.s,i=this.c(n),s=this.wR(n),o=this.y0(n),a={k:e,s0:n-1.55,s1:n+.35,d0:i+s+.3,d1:i+s+1.8,y:o+.27,sC:n-.6,dC:i+s+1.05};return a.chute=[{s:n-.62,d:i+s+.75,y:a.y+.56},{s:n-.16,d:i+s-.02,y:o+.1},{s:n+.14,d:i+s-.28,y:o+.045}],a}),this.island={s0:44.9,s1:49.4,dOff:.36,halfW:.25,h:.09},this.gravelBar={s0:94.4,s1:96.6,side:1},this.roughPatch={s0:95.05,s1:95.95},this.matOn=!1,this.potholes=[]}bedRaw(t,e,n){let i=Math.round(this.rowIndex(t)),s=this.rY0[i],o=this.rC[i],a=this.rD[i],l=e-o,c=l<0,h=c?this.rWL[i]:this.rWR[i],u=c?this.rBankL[i]:this.rBankR[i],d=this.rBankW[i],p=Math.abs(l)/h,g,x,m=Zt(1.5,4.5,Math.abs(l)),f=le(s,this.rY0s[i],m);if(p<=1){let T=1-p*p;g=s+.012-(a+.012)*Math.pow(T,.55),x=this.rBedMat[i]}else{let T=(p-1)*h,w=u*Zt(0,d,T);u<0&&(w+=.045*Math.exp(-((T-.04)*(T-.04))/.0012),w=u*Zt(.07,.07+d,T)+.045*Zt(0,.04,T)*(1-Zt(.06,.1,T)));let b=.11*Math.max(0,T-d)+.04*Math.max(0,T-d-3);g=f+.012+w+b,x=T<.06?this.rBedMat[i]:this.rBankMat[i],u>.8&&T<d+.2&&(x=Pt.ROCK)}let _=this.rRough[i],y=Un(t*1.3,e*1.3,3,11),v=Un(t*7,e*7,2,23);if(p<=1)g+=_*.8*y+_*.5*v;else{let T=x===Pt.ROCK?1:.5,w=(p-1)*h;if(g+=(.08*y+.02*v*T)*Zt(0,.6,w),x===Pt.ROCK&&Math.abs(u)>.4){let b=Math.abs(Un(t*2.2,e*2.2+3.1,3,41));g+=(.1*b-.03)*Zt(.02,.25,w)*(1-Zt(d+.5,d+1.6,w))}}let M=this.island;if(t>M.s0&&t<M.s1){let T=(t-M.s0)/(M.s1-M.s0),w=M.halfW*Math.sin(Math.PI*T)**.6,b=Math.abs(e-(o+M.dOff));if(b<w+.12){let C=1-Zt(w-.05,w+.12,b),D=s+M.h*Math.sin(Math.PI*T)**.4+.015*v;D>g&&(g=le(g,D,C),C>.4&&(x=Pt.GRAVEL))}}let S=this.gravelBar;if(t>S.s0&&t<S.s1&&l>0){let T=(t-S.s0)/(S.s1-S.s0),w=Math.sin(Math.PI*T)*Zt(.1,.38,l);g=le(g,Math.max(g,s+.006+.01*v),w)}let A=this.roughPatch;if(t>A.s0&&t<A.s1&&p<1&&!this._noPatch){let T=Math.sin(Math.PI*(t-A.s0)/(A.s1-A.s0));g+=.022*T*(Qe(t*14,e*14,77)+.6)}for(let T of this.pads)if(t>T.s0-.6&&t<T.s1+.6){let w=o+this.rWR[i],b=w+.3,C=w+1.8;if(e<b-.3||e>C+.7)continue;let D=Zt(T.s0-.5,T.s0,t)*(1-Zt(T.s1,T.s1+.5,t)),U=Zt(b-.25,b+.05,e)*(1-Zt(C,C+.6,e)),L=D*U;L>0&&(g=le(g,T.y+.004*v,L),L>.5&&(x=Pt.DIRT))}for(let T of this.pads){let w=T.chute;if(!(t<w[0].s-.3||t>w[2].s+.3))for(let b=0;b<2;b++){let C=w[b],D=w[b+1],U=D.s-C.s,L=D.d-C.d,H=((t-C.s)*U+(e-C.d)*L)/(U*U+L*L);H=de(H,0,1);let z=Math.hypot(t-(C.s+U*H),e-(C.d+L*H));if(z<.16){let q=C.y+(D.y-C.y)*H-.035,N=1-Zt(.07,.16,z);g>q&&(g=le(g,q,N))}}}if(t>86.25&&t<88.4&&p>1){let T=(p-1)*h,w=Math.sin(Math.PI*(t-86.25)/2.15);g-=.16*w*Math.exp(-((T-.32)**2)/.012)}for(let T of this.potholes){let w=t-T.s,b=e-(o+T.d),C=w*w+b*b;C<T.r*T.r*2.2&&(g-=T.depth*Math.exp(-C/(T.r*T.r*.5)))}return n&&(n.mat=x),g}bakeBed(){let t=Math.round((Au-Hi)/_i)+1;this.nD=t,this.bed=new Float32Array(this.nS*t),this.mat=new Uint8Array(this.nS*t);let e={};for(let i=0;i<this.nS;i++){let s=qt+i*Pe;for(let o=0;o<t;o++){let a=Hi+o*_i,l=i*t+o;this.bed[l]=this.bedRaw(s,a,e),this.mat[l]=e.mat}}let n=this.roughPatch;this.matI0=Math.floor((n.s0-.3-qt)/Pe),this.matI1=Math.ceil((n.s1+.3-qt)/Pe),this.matBed=new Float32Array((this.matI1-this.matI0+1)*t),this._noPatch=!0;for(let i=this.matI0;i<=this.matI1;i++){let s=qt+i*Pe;for(let o=0;o<t;o++){let a=Hi+o*_i,l=this.bedRaw(s,a,e),c=s>n.s0-.05&&s<n.s1+.05&&this.inChannel(s,a,-.04);this.matBed[(i-this.matI0)*t+o]=c?Math.max(l+.012,this.bed[i*t+o]-.004):this.bed[i*t+o]}}this._noPatch=!1}matH(t,e){let n=(t-qt)/Pe,i=de((e-Hi)/_i,0,this.nD-1.001),s=Math.floor(n);if(s<this.matI0||s>=this.matI1)return this.bedH(t,e);let o=i|0,a=n-s,l=i-o,c=this.nD,h=this.matBed,u=(s-this.matI0)*c+o,d=h[u]+(h[u+1]-h[u])*l,p=h[u+c]+(h[u+c+1]-h[u+c])*l;return d+(p-d)*a}bedAt(t,e,n){let i=(t-qt)/Pe,s=(e-Hi)/_i;i<0?i=0:i>this.nS-1.001&&(i=this.nS-1.001),s<0?s=0:s>this.nD-1.001&&(s=this.nD-1.001);let o=i|0,a=s|0,l=i-o,c=s-a,h=this.nD,u=this.bed,d=o*h+a,p=u[d],g=u[d+1],x=u[d+h],m=u[d+h+1],f=p+(g-p)*c,_=x+(m-x)*c;return n.h=f+(_-f)*l,n.hs=(_-f)/Pe,n.hd=(g-p+(m-x-(g-p))*l)/_i,n.mat=this.mat[(l<.5?d:d+h)+(c<.5?0:1)],n}bedH(t,e){let n=de((t-qt)/Pe,0,this.nS-1.001),i=de((e-Hi)/_i,0,this.nD-1.001),s=n|0,o=i|0,a=n-s,l=i-o,c=this.nD,h=this.bed,u=s*c+o,d=h[u]+(h[u+1]-h[u])*l,p=h[u+c]+(h[u+c+1]-h[u+c])*l;return d+(p-d)*a}waterLevel(t,e){let n=this.rowIndex(t),i=n|0,s=n-i,o=this.rC[i]+(this.rC[i+1]-this.rC[i])*s,a=e-o,l=a<0?this.rWL[i]+(this.rWL[i+1]-this.rWL[i])*s:this.rWR[i]+(this.rWR[i+1]-this.rWR[i])*s;return Math.abs(a)>l+.03?-1/0:this.rY0[i]+(this.rY0[i+1]-this.rY0[i])*s}inChannel(t,e,n=0){let i=this.c(t),s=e-i,o=s<0?this.wL(t):this.wR(t);return Math.abs(s)<=o+n}buildRocks(){let t=Ue(1234),e=[],n=(i,s,o,a={})=>{let l=this.worldXZ(i,s),c=this.bedH(i,s),h=a.bury??.35,u=(a.y??c)+o*(1-2*h);e.push({s:i,d:s,x:l.x,y:u,z:l.z,r:o,tag:a.tag||"rock",group:a.group||null,decor:!!a.decor,solid:a.solid!==!1})};for(let i=qt+1;i<Je-2;i+=.35+t()*.6)for(let s of[-1,1]){if(t()<.3)continue;let o=this.c(i),a=s<0?this.wL(i):this.wR(i),l=this.row(s<0?this.rBankL:this.rBankR,i),c=!1;for(let p of this.pads)s>0&&i>p.s0-.4&&i<p.s1+.4&&(c=!0);if(i>ne-.8&&i<Re+1.2&&(c=!0),c)continue;let u=l>.8||this.row(this.rRough,i)>.018?.08+t()*.22:.04+t()*.12;l<0&&s<0&&(u=.05+t()*.08);let d=o+s*(a+.02+u*(.2+t()*.9));n(i,d,u,{bury:.3+t()*.15,tag:"bank"})}for(let i=0;i<260;i++){let s=qt+1+t()*(Je-qt-3),o=t()<.5?-1:1,a=this.c(s),l=o<0?this.wL(s):this.wR(s),c=a+o*(l+.6+t()*6),h=!1;for(let u of this.pads)s>u.s0-.5&&s<u.s1+.5&&c>u.d0-.4&&c<u.d1+.6&&(h=!0);s>ne-1.5&&s<Re+2&&Math.abs(c-a)<2.5&&(h=!0),!h&&n(s,c,.1+t()*t()*.6,{bury:.35,tag:"boulder",decor:Math.abs(c-a)>2.5})}for(let i of[wn[0],wn[1]]){let s=this.c(i.s-.15);n(i.s-.12,s-.3,.09,{bury:.4,tag:"lip"}),n(i.s-.12,s+.3,.09,{bury:.4,tag:"lip"})}{let s=this.c(9.55);n(9.55+.05,s-.2,.085,{bury:.25,tag:"landing",group:"gorgeLanding"}),n(9.55-.08,s+.09,.08,{bury:.05,tag:"landing",group:"gorgeLanding"}),n(9.55+.35,s+.02,.07,{bury:.3,tag:"landing",group:"gorgeLanding"}),n(10,this.c(10)+.18,.045,{y:this.y0(10)-.03,bury:.5,tag:"landing",group:"gorgeLanding"}),n(10.08,this.c(10.08)+.28,.05,{y:this.y0(10.08)-.03,bury:.5,tag:"landing",group:"gorgeLanding"})}for(let i=22.8;i<29.2;i+=.9+t()*.5){let s=this.c(i),o=t()<.5?-1:1;n(i,s+o*(.1+t()*.08),.05+t()*.03,{bury:.45,tag:"whitewater"})}for(let[i,s,o]of[[36,-.15,.06],[39.2,.2,.07],[42.5,-.1,.06],[52,.15,.06]])n(i,this.c(i)+s,o,{bury:.45,tag:"stone"});for(let[i,s,o]of[[57,-.6,.12],[59,.55,.11],[60.3,-.3,.08]])n(i,this.c(i)+s,o,{bury:.5,tag:"stone"});for(let[i,s]of[[63.4,1],[64.3,-1],[65.1,1],[65.9,-1]]){let o=this.c(i);n(i,o+s*(.12+.03),.085,{bury:.12,tag:"snag"})}for(let[i,s,o,a]of[[78.9,1,.075,.05],[79.05,1.5,.075,.3],[78.62,1.55,.065,.3],[79.3,1.1,.06,.3],[78.95,.68,.07,.2]])n(i,s,o,{bury:a,tag:"catch",group:"catchJumble"});n(61.92,this.c(61.92)-.27,.045,{y:this.y0(61.92)-.02,bury:.5,tag:"snag",group:"outletNotch"}),n(62,this.c(62)-.375,.05,{y:this.y0(62)-.02,bury:.5,tag:"snag",group:"outletNotch"}),n(79.22,this.c(79.22)+.1,.045,{y:this.y0(79.22)-.02,bury:.5,tag:"catch",group:"catchJumble"}),n(79.3,this.c(79.3)+.2,.05,{y:this.y0(79.3)-.02,bury:.5,tag:"catch",group:"catchJumble"});for(let i of[-1,1])n(85.95,this.c(85.95)+i*.13,.05,{y:this.y0(85.95)-.02,bury:.5,tag:"lip"}),n(85.99,this.c(85.99)+i*.235,.045,{y:this.y0(85.99)-.015,bury:.5,tag:"lip"});n(85.9,this.c(85.9)+.23,.07,{bury:.3,tag:"lip"});for(let[i,s,o]of[[81.5,.18,.05],[83.2,-.16,.05],[84.6,.15,.045]])n(i,this.c(i)+s,o,{bury:.45,tag:"stone"});for(let[i,s,o]of[[96.2,-.28,.06],[97.5,.3,.05]])n(i,this.c(i)+s,o,{bury:.45,tag:"stone"});for(let i=0;i<7;i++){let s=this.roughPatch.s0+.08+t()*.75,o=this.c(s)+(t()-.5)*.55;n(s,o,.016+t()*.01,{bury:.3,tag:"pebble",group:"roughPebbles"})}this.rocks=e}bakeFlow(){this.fD0=-3.2,this.fDD=.05,this.fDS=.1;let t=Math.round((3.8-this.fD0)/this.fDD)+1,e=Math.round((Je-qt)/this.fDS)+1;this.fnD=t,this.fnS=e,this.flowS=new Float32Array(e*t),this.flowD=new Float32Array(e*t);let n=[{s:9.35,d:.32,R:.2,v:.25},{s:9.35,d:-.32,R:.2,v:-.25},{s:20.4,d:.3,R:.2,v:.22},{s:20.4,d:-.3,R:.2,v:-.22},{s:38.8,d:.5,R:.25,v:.12,tag:"undercut"},{s:93.12,d:-.3,R:.12,v:.05,trap:.05,tag:"rootPocket"},{s:46.7,d:.98,R:.34,v:-.22,trap:.11,tag:"deadPocket"},{s:56.6,d:-.55,R:.36,v:.15,trap:.05,ring:!0,tag:"springsL"},{s:59.8,d:.55,R:.32,v:-.14,trap:.04,ring:!0,tag:"springsR"},{s:61.75,d:-.52,R:.17,v:.05,trap:.14,tag:"cornerL"},{s:61.75,d:.5,R:.17,v:-.05,trap:.14,tag:"cornerR"},{s:88.2,d:.6,R:.34,v:-.32,trap:.45,tag:"poolEddy"}];this.eddies=n;let i=this.rocks.filter(o=>{let a=this.waterLevel(o.s,o.d);return a>-1e9&&o.y-o.r<a&&o.y+o.r>a-.05}),s={};for(let o=0;o<e;o++){let a=qt+o*this.fDS,l=Math.round(this.rowIndex(a)),c=this.rC[l],h=this.rU[l],u=this.rDcds[l],d=this.rWL[l],p=this.rWR[l],g=this.rY0[l],x=i.filter(v=>Math.abs(v.s-a)<v.r*5+.2),m=n.filter(v=>Math.abs(v.s-a)<v.R*3),f=1,_=u,y=Math.hypot(f,_);f/=y,_/=y;for(let v=0;v<t;v++){let M=this.fD0+v*this.fDD,S=M-c,A=S<0?d:p,T=Math.abs(S)/A,w=0,b=0;if(T<1.15){let C=Math.sqrt(de(1-Math.pow(Math.min(T,1),4),0,1))*.88+.12,D=h*C,U=this.island;if(a>U.s0-.4&&a<U.s1+.4){let L=M-(c+U.dOff),H=de((a-U.s0)/(U.s1-U.s0),0,1),z=Math.exp(-L*L/.08)*Math.sin(Math.PI*H);b+=Math.sign(L||1)*z*.25*(a<(U.s0+U.s1)/2?1:-1),S>.8&&a>45.8&&a<47.8&&(D*=.15)}if(a>86.02&&a<87.25){let L=(a-86.02)/1.23,H=1-Zt(.1,.24,Math.abs(S));D=le(Math.max(D,.45),-.28*Math.sin(Math.PI*de(L*1.05,0,1)),H),b+=Math.sign(S||.01)*.06*Math.sin(Math.PI*L)*(1-Zt(.2,.32,Math.abs(S)))}for(let L of[wn[0],wn[1]])if(a>L.s+.02&&a<L.s+.55){let H=(a-L.s-.02)/.53,z=1-Zt(.15,.4,Math.abs(S));D=le(D,-.25*Math.sin(Math.PI*H),z)}w=f*D,b+=_*D;for(let L of x){let z=g-L.y;if(Math.abs(z)>=L.r)continue;let q=Math.sqrt(L.r*L.r-z*z),N=a-L.s,Z=M-L.d,j=N*N+Z*Z;if(j>(q*5)**2)continue;let it=N*f+Z*_,yt=-N*_+Z*f,Tt=Math.max(j,q*q),Y=q*q,et=1-Y*(it*it-yt*yt)/(Tt*Tt),pt=-Y*2*it*yt/(Tt*Tt);if(j<Y&&(et=0,pt=0),it>0&&Math.abs(yt)<q*1.3&&it<q*4.5){let fe=1-(1-it/(q*4.5))*(1-Math.abs(yt)/(q*1.3));et*=.15+.85*fe,pt+=-Math.sign(yt)*.25*(1-fe)}let ot=D*et,At=D*pt,Dt=ot*f-At*_,Wt=ot*_+At*f;w+=Dt-f*D,b+=Wt-_*D}for(let L of m){if(!L.trap)continue;let H=Math.hypot(a-L.s,S-L.d),z=.08+.92*Zt(L.R*.55,L.R*1.25,H);w*=z,b*=z}for(let L of m){let H=a-L.s,z=S-L.d,q=Math.hypot(H,z);if(q<1e-4)continue;let N=q<L.R?q/L.R:Math.exp(-(q-L.R)/(L.R*.6)),Z=L.v*N/q;if(w+=Z*z*1,b+=Z*-H,L.trap){let j=L.ring?L.trap*(q-L.R*.6)/L.R*(1-Zt(L.R,L.R*1.5,q))/q:L.trap*N/q;w-=j*H,b-=j*z}q<L.R*1.2&&(w*=.7,b*=.7)}if(T>1){let L=1-Zt(1,1.15,T);w*=L,b*=L}}this.flowS[o*t+v]=w,this.flowD[o*t+v]=b}}this.boils=[{s:56.4,d:.1,r:.18},{s:58.3,d:-.25,r:.15},{s:59.6,d:.3,r:.16}]}flowAt(t,e,n,i,s,o,a){let l=(t-qt)/this.fDS,c=(e-this.fD0)/this.fDD;if(a.vx=0,a.vy=0,a.vz=0,l<0||l>this.fnS-1.001||c<0||c>this.fnD-1.001)return a;let h=l|0,u=c|0,d=l-h,p=c-u,g=this.fnD,x=h*g+u,m=this.flowS,f=this.flowD,_=(m[x]*(1-p)+m[x+1]*p)*(1-d)+(m[x+g]*(1-p)+m[x+g+1]*p)*d,y=(f[x]*(1-p)+f[x+1]*p)*(1-d)+(f[x+g]*(1-p)+f[x+g+1]*p)*d,v=Math.round(this.rowIndex(t)),M=this.rTurb[v];if(_!==0||y!==0){let T=Math.sin(1.9*t+2.3*e+1.7*i)*.6+Math.sin(3.7*t-1.1*e-2.9*i+1.3)*.4,w=Math.sin(2.6*t-1.7*e+2.1*i+.7)*.6+Math.sin(4.3*t+2.9*e+3.3*i)*.4,b=M*(.4+.6*Math.min(1,Math.hypot(_,y)));if(_+=T*b,y+=w*b,t>55.5&&t<60.5)for(let C of this.boils){let D=t-C.s,U=e-this.c(C.s)-C.d,L=D*D+U*U;if(L<C.r*C.r*4){let H=.12*Math.exp(-L/(C.r*C.r))/Math.sqrt(L+1e-4);_+=D*H,y+=U*H}}for(let C=0;C<Rc.length;C++){let D=Rc[C];if(t<D.s-.02||t>D.s+D.len)continue;let U=this.rY0[v]-n,L=1-Zt(D.w*.5,D.w,Math.abs(e-this.rC[v])),H=(t-D.s)/D.len;if(H<.3&&U>-.05&&U<D.jetDepth&&(a.vy=-D.jet*(1-H/.3)*L),U>.06){let z=Math.min(1,(U-.06)/.06)*L;_=_*(1-z)+D.under*z,y*=1-z*.5}H>.62&&H<.95&&U>-.05&&(a.vy=Math.max(a.vy,D.boil*Math.sin(Math.PI*(H-.62)/.33)*L))}}let S=-o,A=s;return a.vx=s*_+S*y,a.vz=o*_+A*y,a}windAt(t,e,n,i,s){if(s.vx=0,s.vy=0,s.vz=0,t>76.6&&t<79.6){let o=Math.round(this.rowIndex(t)),a=Math.sin(Math.PI*(t-76.6)/3)*(1-Zt(1.2,3.2,Math.abs(e-1.4))),l=.75+.25*Math.sin(i*1.3)*Math.sin(i*.37+1);s.vy=-5*a*l;let c=de((1.2-e)*1.5,-2.2,2.2)*a*l,h=this.frame(t);s.vx=h.nx*c+h.tx*.6*a,s.vz=h.nz*c+h.tz*.6*a}return s}buildColliders(){let t=[];this.colliders=t;let e=(i,s,o)=>{let a=this.worldXZ(i,s);return[a.x,o,a.z]};for(let i of this.rocks)i.decor||!i.solid||t.push({type:0,x:i.x,y:i.y,z:i.z,r:i.r*.94,mat:Pt.ROCK,group:i.group,tag:i.tag});let n=(i,s,o,a,l,c)=>t.push({type:1,ax:i[0],ay:i[1],az:i[2],bx:s[0],by:s[1],bz:s[2],r:o,mat:a,group:l,tag:c});this.capsule=n;{let a=this.c(92.98),l=this.c(93.36),c=this.c(93.62),h=e(92.98-.12,a-this.wL(92.98)-.32,this.bedH(92.98-.12,a-this.wL(92.98)-.32)+.015),u=e(92.98,a-this.wL(92.98)+.04,this.y0(92.98)+.03),d=e(93.36,l-.13,this.y0(93.36)+.014),p=e(93.62,c+.03,this.bedH(93.62,c+.03)-.005),g=e(92.98-.13,this.c(92.98-.13)-.3,this.y0(92.98-.13)+.012);n(h,u,.028,Pt.WOOD,"root","root"),n(u,d,.026,Pt.WOOD,"root","root"),n(d,p,.022,Pt.WOOD,"root","root"),n(u,g,.02,Pt.WOOD,"root","root"),this.rootPts=[h,u,d,p],this.rootSpur=[u,g];let x=92.98-.36,m=this.c(x)-this.wL(x)-.12,f=e(x,m,Math.max(this.bedH(x,m),this.y0(x))+.016),_=e(92.98-.06,this.c(92.98-.06)-.19,this.y0(92.98-.06)+.016);n(f,_,.012,Pt.METAL,"rootRail","rail"),this.rootRailPts=[f,_]}for(let i of[-1,1]){let s=e(85.4,this.c(85.4)+i*.25,this.y0(85.4)+.03),o=e(85.92,this.c(85.92)+i*.112,this.y0(85.92)+.03);t.push(this.obbFromSegment(s,o,.01,.06,Pt.WOOD,"splashGuard"))}{let i=this.y0(88),s=[[86.9,.5],[87.6,.4],[88.6,.36],[89.5,.3]].map(([o,a])=>e(o,this.c(o)+a,i+.01));for(let o=0;o<s.length-1;o++)n(s[o],s[o+1],.03,Pt.RUBBER,"poolGuide","boom");this.poolGuidePts=s}{let o=e(78.5,1.32,this.y0(78.8)+.16),a=e(79.55,.8,this.y0(79.55)+.004),l=this.obbFromSegment(o,a,.42,.01,Pt.WOOD,"catchRamp",!0);t.push(l),this.catchRamp={a:o,b:a,halfW:.42};for(let c of[-1,1]){let h=e(78.5,1.32+c*.42,this.y0(78.8)+.2),u=e(79.55,.8+c*.42,this.y0(79.55)+.05);n(h,u,.015,Pt.WOOD,"catchRamp","lip")}}for(let i of[-1,1]){let s=[],o=i<0?this.wL(62.15):this.wR(62.15);s.push(e(62.15,this.c(62.15)+i*(o+.03),this.y0(62.15)+.02)),s.push(e(62.6,this.c(62.6)+i*.17,this.y0(62.6)+.022));for(let a=62.95;a<=66.9;a+=.35)s.push(e(a,this.c(a)+i*.075,this.y0(a)+.025));for(let a=0;a<s.length-1;a++)n(s[a],s[a+1],.01,Pt.METAL,"spillRail","rail")}{let i=[[44.9,.56],[45.8,.66],[46.7,.73],[47.5,.76],[48.4,.74]].map(([s,o])=>e(s,this.c(s)+o,this.y0(s)+.02));for(let s=0;s<i.length-1;s++)n(i[s],i[s+1],.02,Pt.WOOD,"alderBypass","boom");this.bypassPts=i}{let i=this.y0(9.5),s=e(9.12,this.c(9.12),i+.02),o=e(9.95,this.c(9.95),i-.02);t.push(this.obbFromSegment(s,o,.5,.012,Pt.WOOD,"landingBoards",!0));let a=e(9.6,this.c(9.6)+.32,this.y0(9.6)+.03),l=e(10.12,this.c(10.12)+.05,this.y0(10.12)+.03);t.push(this.obbFromSegment(a,l,.01,.05,Pt.WOOD,"landingBoards")),this.landingBoards={a:s,b:o}}{let i=[[55.6,-.25],[57.2,-.45],[59.2,-.45],[60.8,-.3]].map(([s,o])=>e(s,this.c(s)+o,this.y0(s)+.03));for(let s=0;s<i.length-1;s++)n(i[s],i[s+1],.012,Pt.METAL,"debrisScreen","screen");this.screenPts=i}{let i=ne,s=this.c(i);for(let o of[-1,1]){let a=s+o*(this.wR(i)+.07),l=e(i,a,this.bedH(i,a)-.05),c=[l[0],l[1]+.9,l[2]];n(l,c,.04,Pt.WOOD,null,"gate")}}this.buildColliderGrid()}obbFromSegment(t,e,n,i,s,o,a=!1){let l=e[0]-t[0],c=e[1]-t[1],h=e[2]-t[2],u=Math.hypot(l,c,h);l/=u,c/=u,h/=u;let d=-h,p=l,g=Math.hypot(d,p);d/=g,p/=g;let x=c*p-h*0,m=h*d-l*p,f=l*0-c*d;m<0&&(x=-x,m=-m,f=-f,d=-d,p=-p);let _=Math.hypot(x,m,f);x/=_,m/=_,f/=_;let y=(t[0]+e[0])/2,v=(t[1]+e[1])/2,M=(t[2]+e[2])/2,S=u/2,A=i,T=n;if(a)y-=x*i,v-=m*i,M-=f*i;else return A=i,T=n,{type:2,cx:y,cy:v,cz:M,ax:[l,c,h],ay:[x,m,f],az:[d,0,p],h:[S,i,n],mat:s,group:o,wall:!0};return{type:2,cx:y,cy:v,cz:M,ax:[l,c,h],ay:[x,m,f],az:[d,0,p],h:[S,A,T],mat:s,group:o}}buildColliderGrid(){this.gcell=.5,this.grid=new Map,this.colliders.forEach((t,e)=>this.insertCollider(t,e))}colliderBounds(t){if(t.type===0)return[t.x-t.r,t.z-t.r,t.x+t.r,t.z+t.r];if(t.type===1)return[Math.min(t.ax,t.bx)-t.r,Math.min(t.az,t.bz)-t.r,Math.max(t.ax,t.bx)+t.r,Math.max(t.az,t.bz)+t.r];let e=Math.abs(t.ax[0])*t.h[0]+Math.abs(t.ay[0])*t.h[1]+Math.abs(t.az[0])*t.h[2],n=Math.abs(t.ax[2])*t.h[0]+Math.abs(t.ay[2])*t.h[1]+Math.abs(t.az[2])*t.h[2];return[t.cx-e,t.cz-n,t.cx+e,t.cz+n]}insertCollider(t,e){let[n,i,s,o]=this.colliderBounds(t),a=this.gcell,l=.0335+.02;for(let c=Math.floor((n-l)/a);c<=Math.floor((s+l)/a);c++)for(let h=Math.floor((i-l)/a);h<=Math.floor((o+l)/a);h++){let u=c*100003+h,d=this.grid.get(u);d||(d=[],this.grid.set(u,d)),d.push(e)}}cellList(t,e){return this.grid.get(Math.floor(t/this.gcell)*100003+Math.floor(e/this.gcell))}chuteFor(t){let n=Bt[t].s,i=this.pads[t],s=this.c(n),o=this.wR(n),a=this.y0(n),l=(m,f,_)=>{let y=this.worldXZ(m,f);return[y.x,_,y.z]},c=i.y+.55,[h,u,d]=i.chute,p=l(h.s,h.d,h.y),g=l(u.s,u.d,u.y),x=l(d.s,d.d,d.y);return{R0:p,M:g,E:x,benchTop:c,pad:i}}chuteColliders(t){let{R0:e,M:n,E:i}=this.chuteFor(t),s=[],o=(a,l)=>{s.push(this.obbFromSegment(a,l,.048,.006,Pt.WOOD,"chute",!0));let c=l[0]-a[0],h=l[2]-a[2],u=Math.hypot(c,h);c/=u,h/=u;let d=-h,p=c;for(let g of[-1,1]){let x=.052*g,m=[a[0]+d*x,a[1]+.03,a[2]+p*x],f=[l[0]+d*x,l[1]+.03,l[2]+p*x];s.push(this.obbFromSegment(m,f,.005,.032,Pt.WOOD,"chute"))}};return o(e,n),o(n,i),s}};var ko=9.81,ir=1e3,Pu=1.2,Lu=4/3*Math.PI*.0335**3,Du=Math.PI*.0335*.0335,Cc=.55,Uu=.55,Nu=.55;function Sn(r){let e=r.rs=r.rs+1831565813>>>0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ho(r,t,e){return{id:r,spec:t,x:0,y:0,z:0,vx:0,vy:0,vz:0,wx:0,wy:0,wz:0,qx:0,qy:0,qz:0,qw:1,hint:-1,s:0,d:0,rs:e>>>0,wet:0,sub:0,ground:!1,groundMat:-1,speedAvg:1,stallT:0,age:0,wob:0,airT:0,lastSplash:-1,start:0,payout:0,cps:[],cpi:0,state:"roll",paid:!1,maxS:0}}var sr=class{constructor(t){this.creek=t,this.balls=[],this.t=0,this.disabled=new Set(["rootRail","splashGuard","poolGuide","catchRamp","spillRail","alderBypass","landingBoards","debrisScreen"]),this.extra=[],this.matOn=!1,this.events=[],this.loc={},this.bedTmp={},this.flowTmp={},this.windTmp={},this.hash=new Map,this.wobbleAmp=e=>e.spec&Ne.CORES?.08:.32}setGroup(t,e){e?this.disabled.delete(t):this.disabled.add(t)}step(t){this.t+=t;let e=this.balls;for(let n=0;n<e.length;n++){let i=e[n];if(i.state!=="roll")continue;let s=Math.hypot(i.vx,i.vy,i.vz),o=Math.ceil(s*t/(.4*.0335));o<1?o=1:o>14&&(o=14);let a=t/o;for(let l=0;l<o;l++)this.stepBall(i,a);i.age+=t,i.speedAvg+=(Math.hypot(i.vx,i.vy,i.vz)-i.speedAvg)*Math.min(1,t*2)}this.ballBall()}stepBall(t,e){let n=this.creek,i=n.locate(t.x,t.z,t.hint,this.loc);t.hint=i.idx,t.s=i.s,t.d=i.d;let s=.058+(t.spec&Ne.WATER?.003:.012)*t.wet,o=n.waterLevel(i.s,i.d),a=0,l=0,c=t.y-.0335;o>c&&(a=Math.min(2*.0335,o-c),l=Math.PI*a*a*(3*.0335-a)/3);let h=t.sub<=0&&a>0;t.sub=a;let u=s+.5*ir*l,d=(-s*ko+ir*ko*l)/u;if(t.vy+=d*e,a>0){let m=n.flowAt(i.s,i.d,t.y,this.t,i.tx,i.tz,this.flowTmp);h&&t.vy<-.6&&(this.events.push({type:"splash",x:t.x,y:o,z:t.z,v:-t.vy,id:t.id}),t.lastSplash=this.t);let f=.0335,_=Math.min(a,2*f-1e-6),y=f*f*Math.acos((f-_)/f)-(f-_)*Math.sqrt(Math.max(0,2*f*_-_*_)),v=.5*ir*Uu*y/u,M=t.vx-m.vx,S=t.vy-m.vy,A=t.vz-m.vz,T=Math.hypot(M,S,A),w=1/(1+v*T*e),b=1/(1+6*(a/(2*f))*e);M*=w,S*=w*b,A*=w,t.vx=M+m.vx,t.vy=S+m.vy,t.vz=A+m.vz;let C=l/Lu,D=Math.exp(-3.5*C*e);if(t.wx*=D,t.wy*=D,t.wz*=D,!t.ground){let U=t.vz/f*.35,L=-t.vx/f*.35,H=1-Math.exp(-2*C*e);t.wx+=(U-t.wx)*H,t.wz+=(L-t.wz)*H}t.wet=Math.min(1,t.wet+e*C*(t.spec&Ne.WATER?.08:.32)),t.airT=0}else{let m=n.windAt(i.s,i.d,t.y,this.t,this.windTmp),f=t.vx-m.vx,_=t.vy-m.vy,y=t.vz-m.vz,v=Math.hypot(f,_,y),M=.5*Pu*Nu*Du/s;t.vx-=M*v*f*e,t.vy-=M*v*_*e,t.vz-=M*v*y*e,t.wet=Math.max(0,t.wet-e*.004),t.ground||(t.airT+=e)}if(t.ground){let m=Math.hypot(t.vx,t.vz);if(m<.5&&m>.005){t.wob+=m*e/.0335;let _=this.wobbleAmp(t)*(1-m/.5)*Math.sin(t.wob*1+t.id%7);t.vx+=-t.vz/m*_*e,t.vz+=t.vx/m*_*e}}t.x+=t.vx*e,t.y+=t.vy*e,t.z+=t.vz*e,t.ground=!1,this.collideBed(t,e,s,i);let p=n.cellList(t.x,t.z);if(p){let m=n.colliders;for(let f=0;f<p.length;f++){let _=m[p[f]];_.group&&this.disabled.has(_.group)||this.collide(t,_,e,s)}}let g=this.extra;for(let m=0;m<g.length;m++){let f=g[m];if(f.off)continue;let _=t.x-f.bcx,y=t.z-f.bcz;_*_+y*y>f.br*f.br||this.collide(t,f,e,s)}let x=Math.hypot(t.wx,t.wy,t.wz);if(x>1e-6){let m=x*e*.5,f=Math.sin(m)/x,_=Math.cos(m),y=t.wx*f,v=t.wy*f,M=t.wz*f,{qx:S,qy:A,qz:T,qw:w}=t;t.qx=_*S+y*w+v*T-M*A,t.qy=_*A-y*T+v*w+M*S,t.qz=_*T+y*A-v*S+M*w,t.qw=_*w-y*S-v*A-M*T;let b=Math.hypot(t.qx,t.qy,t.qz,t.qw);t.qx/=b,t.qy/=b,t.qz/=b,t.qw/=b}}collideBed(t,e,n,i){let s=this.creek,o=s.locate(t.x,t.z,t.hint,this.loc),a=s.bedAt(o.s,o.d,this.bedTmp),l=o.tx,c=o.tz,h=-c,u=l,d=1/Math.max(.3,1-o.kap*o.d),p=a.hs*d*l+a.hd*h,g=a.hs*d*c+a.hd*u,x=1/Math.sqrt(p*p+g*g+1),m=-p*x,f=x,_=-g*x,y=a.h,v=a.mat;this.matOn&&o.s>s.roughPatch.s0-.05&&o.s<s.roughPatch.s1+.05&&s.inChannel(o.s,o.d,-.04)&&(y=s.matH(o.s,o.d),v=Pt.MAT);let M=(t.y-y)*f,S=.0335-M;S>0&&this.contact(t,m,f,_,S,v,e,n,!0)}collide(t,e,n,i){let s,o,a,l,c;if(e.type===0){if(s=t.x-e.x,o=t.y-e.y,a=t.z-e.z,l=Math.hypot(s,o,a),c=e.r+.0335,l>=c||l<1e-9)return;s/=l,o/=l,a/=l,this.contact(t,s,o,a,c-l,e.mat,n,i,!1)}else if(e.type===1){let h=e.bx-e.ax,u=e.by-e.ay,d=e.bz-e.az,p=((t.x-e.ax)*h+(t.y-e.ay)*u+(t.z-e.az)*d)/(h*h+u*u+d*d);if(p=p<0?0:p>1?1:p,s=t.x-(e.ax+h*p),o=t.y-(e.ay+u*p),a=t.z-(e.az+d*p),l=Math.hypot(s,o,a),c=e.r+.0335,l>=c||l<1e-9)return;s/=l,o/=l,a/=l,this.contact(t,s,o,a,c-l,e.mat,n,i,!1)}else{let h=t.x-e.cx,u=t.y-e.cy,d=t.z-e.cz,p=e.ax,g=e.ay,x=e.az,m=e.h,f=h*p[0]+u*p[1]+d*p[2],_=h*g[0]+u*g[1]+d*g[2],y=h*x[0]+u*x[1]+d*x[2],v=f<-m[0]?-m[0]:f>m[0]?m[0]:f,M=_<-m[1]?-m[1]:_>m[1]?m[1]:_,S=y<-m[2]?-m[2]:y>m[2]?m[2]:y,A=f-v,T=_-M,w=y-S,b=A*A+T*T+w*w,C;if(b>1e-12){if(l=Math.sqrt(b),l>=.0335)return;A/=l,T/=l,w/=l,C=.0335-l}else{let D=m[0]-Math.abs(f),U=m[1]-Math.abs(_),L=m[2]-Math.abs(y);A=0,T=0,w=0,U<=D&&U<=L?(T=_>=0?1:-1,C=U+.0335):L<=D?(w=y>=0?1:-1,C=L+.0335):(A=f>=0?1:-1,C=D+.0335)}s=A*p[0]+T*g[0]+w*x[0],o=A*p[1]+T*g[1]+w*x[1],a=A*p[2]+T*g[2]+w*x[2],this.contact(t,s,o,a,C,e.mat,n,i,!1,e)}}contact(t,e,n,i,s,o,a,l,c,h){let u=zo[o]||zo[1];t.x+=e*s,t.y+=n*s,t.z+=i*s,n>.35&&(t.ground=!0,t.groundMat=o);let d=t.vx*e+t.vy*n+t.vz*i,p=0;if(h&&h.vx!==void 0){let b=h.vx*e+h.vy*n+h.vz*i;d-=b}if(d<0){let b=0,C=-d;if(C>.22){let D=C>2,U=t.spec&Ne.REINFORCED?.03:.13,L=.76;if(D&&(L+=U*(Sn(t)*2-1)),b=Math.min(.92,Math.sqrt(L*u.e/.72)*.86)*(1-.35*t.wet),t.sub>.0335&&(b*=.35),C>.5&&this.events.push({type:"hit",mat:o,v:C,x:t.x,y:t.y,z:t.z,id:t.id}),D){let H=(t.spec&Ne.SEAM?.04:.1)*Math.min(1,C/5),z=(Sn(t)-.5)*H*C,q=(Sn(t)-.5)*H*C,N=-i,Z=e,j=Math.hypot(N,Z)||1;N/=j,Z/=j,t.vx+=N*z,t.vz+=Z*z,t.vy+=q*.3}}if(p=-(1+b)*d*l,t.vx+=e*p/l,t.vy+=n*p/l,t.vz+=i*p/l,c&&u.bump>0&&C>.3){let D=u.bump*C;t.vx+=(Sn(t)-.5)*D,t.vz+=(Sn(t)-.5)*D}}let g=Math.min(1,Math.PI*t.sub*t.sub*(3*.0335-t.sub)/3*ir/l),x=Math.max(0,1-g)*l*ko*Math.max(0,n)*a,m=Math.max(p,x),f=.0335,_=t.vx+(t.wy*-i*f-t.wz*-n*f),y=t.vy+(t.wz*-e*f-t.wx*-i*f),v=t.vz+(t.wx*-n*f-t.wy*-e*f),M=_*e+y*n+v*i,S=_-M*e,A=y-M*n,T=v-M*i,w=Math.hypot(S,A,T);if(w>1e-6){S/=w,A/=w,T/=w;let b=w*l/(1+1/Cc),C=Math.min(b,u.mu*m);t.vx-=S*C/l,t.vy-=A*C/l,t.vz-=T*C/l;let D=Cc*l*f*f,U=f*C/D;t.wx+=U*(n*T-i*A),t.wy+=U*(i*S-e*T),t.wz+=U*(e*A-n*S)}if(x>0){let b=u.crr;if(o===Pt.GRAVEL){let H=Math.sin(t.x*37.1+t.z*11.3)*Math.sin(t.z*29.7-t.x*7.9);b*=1+2.2*Math.max(0,H),t.s>this.creek.roughPatch.s0&&t.s<this.creek.roughPatch.s1&&(b*=2.5)}b*=1+.6*t.wet;let C=t.vx-(t.vx*e+t.vy*n+t.vz*i)*e,D=t.vy-(t.vx*e+t.vy*n+t.vz*i)*n,U=t.vz-(t.vx*e+t.vy*n+t.vz*i)*i,L=Math.hypot(C,D,U);if(L>1e-5){let H=Math.min(L,b*x/l),z=H/L;t.vx-=C*z,t.vy-=D*z,t.vz-=U*z;let q=1-Math.min(1,H/Math.max(L,1e-4));t.wx*=q,t.wy*=q,t.wz*=q}}}ballBall(){let t=this.balls,e=this.hash;e.clear();let n=.09;for(let s=0;s<t.length;s++){let o=t[s];if(o.state!=="roll")continue;let a=Math.floor(o.x/n)*73856093^Math.floor(o.z/n)*19349663,l=e.get(a);l||(l=[],e.set(a,l)),l.push(o)}let i=4*.0335*.0335;for(let s=0;s<t.length;s++){let o=t[s];if(o.state!=="roll")continue;let a=Math.floor(o.x/n),l=Math.floor(o.z/n);for(let c=-1;c<=1;c++)for(let h=-1;h<=1;h++){let u=e.get((a+c)*73856093^(l+h)*19349663);if(u)for(let d=0;d<u.length;d++){let p=u[d];if(p.id<=o.id)continue;let g=p.x-o.x,x=p.y-o.y,m=p.z-o.z,f=g*g+x*x+m*m;if(f>=i||f<1e-12)continue;let _=Math.sqrt(f);g/=_,x/=_,m/=_;let y=2*.0335-_;o.x-=g*y*.5,o.y-=x*y*.5,o.z-=m*y*.5,p.x+=g*y*.5,p.y+=x*y*.5,p.z+=m*y*.5;let v=(p.vx-o.vx)*g+(p.vy-o.vy)*x+(p.vz-o.vz)*m;if(v<0){let M=-1.55*v/2;o.vx-=g*M,o.vy-=x*M,o.vz-=m*M,p.vx+=g*M,p.vy+=x*M,p.vz+=m*M,-v>.25&&this.events.push({type:"bump",v:-v,x:(o.x+p.x)/2,y:(o.y+p.y)/2,z:(o.z+p.z)/2})}}}}}};var Ic=1,Pc=[{id:"root",s0:92.6,s1:94.2,fix:"rootRail",label:"the exposed root"},{id:"gravel",s0:94.2,s1:96.4,fix:"gravelMat",label:"the rough gravel"},{id:"lip",s0:85,s1:87.6,fix:"splashGuard",label:"the waterfall lip"},{id:"pool",s0:87.6,s1:90.5,fix:"poolGuide",label:"the plunge pool eddy"},{id:"catch",s0:76,s1:80.5,fix:"catchRamp",label:"the Shelf drop"},{id:"springs",s0:54,s1:61.6,fix:"debrisScreen",label:"the Springs driftwood"},{id:"outlet",s0:61.6,s1:62.15,fix:"clearingArm",label:"the Springs outlet notch"},{id:"spillway",s0:62.15,s1:68,fix:"spillRail",label:"the narrow spillway"},{id:"island",s0:44,s1:50.5,fix:"alderBypass",label:"the dead pocket at the island"},{id:"gorgeStep",s0:8.6,s1:11,fix:"landingBoards",label:"the first Gorge drop"}],Mi={s0:59.4,s1:62.9,pivotS:61.4},rr=class{constructor(t,e=null,n={}){this.creek=t,this.phys=new sr(t),this.events=[],this.acc=0,this.headless=!!n.headless,this.reset(),e&&this.load(e),this.applyOwned(),this.installChute(this.sel),this.lastSaveT=this.t}reset(){this.t=0,this.cash=0,this.owned=new Set,this.unlocked=1,this.sel=0,this.hopper=[],this.pressProg=0,this.pressCount=0,this.feederT=0,this.manualCD=0,this.nextId=1,this.lastLaunch=null,this.stats={made:0,launched:0,finished:0,lost:0,paid:0,completed:0},this.recent=[],this.basket=[],this.drainT=0,this.crate=0,this.reloc=null,this.settings={sound:!0,auto:!0,quality:"high"},this.routeStats=Bt.map(()=>({n:0,avg:0,last:0})),this.lastFinish=null,this.bestCpm=0,this.gorgeFinished=!1,this.lossBySpot={},this.lossLog=[],this.status={press:"",feeder:"",creek:""},this.arm={phase:0,cd:0,target:null},this.seenStatus={},this.logs=[0,2.1,4.2].map(t=>({ph:t,x:0,y:0,z:0,ax:0,az:0,bx:0,bz:0,ang:0})),this.finishTimes=[],this.launchSeed=99,this.phys.balls=[]}get numbers(){return Ac(this.owned)}get relocating(){return!!this.reloc}ballsRolling(){let t=0;for(let e of this.phys.balls)e.state==="roll"&&!e.paid&&t++;return t}queueCount(){let t=0;for(let e of this.phys.balls)e.state==="queue"&&t++;return t}cashPerMin(t=60){let e=0;for(let i=this.recent.length-1;i>=0;i--){let[s,o]=this.recent[i];if(this.t-s>t)break;e+=o}let n=Math.min(t,Math.max(10,this.t-(this.sessionStart??0)));return e*60/n}ballsPerMin(t=60){let e=0;for(let i=this.finishTimes.length-1;i>=0&&!(this.t-this.finishTimes[i]>t);i--)e++;let n=Math.min(t,Math.max(10,this.t-(this.sessionStart??0)));return e*60/n}etaFor(t){let e=this.routeStats[t];return e.n>=3?e.avg:Bt[t].eta}payoutFor(t,e=ki(this.owned)){return Bt[t].base+Es(e)}nextArrival(){let t=1/0;for(let e of this.phys.balls){if(e.state!=="roll"||e.paid)continue;let n=this.etaFor(e.start)-e.age;n<t&&(t=n)}return t===1/0?null:Math.max(0,t)}canBuy(t){let e=bn[t];if(!e||this.owned.has(t))return{ok:!1,why:"Owned"};for(let n of e.requires)if(!this.owned.has(n))return{ok:!1,why:`Requires ${bn[n].name}`};return e.area!==void 0&&this.unlocked<=e.area?{ok:!1,why:`Requires ${Bt[e.area].name}`}:this.cash<e.price?{ok:!1,why:"Not enough cash",afford:!1,avail:!0}:{ok:!0}}buy(t){if(!this.canBuy(t).ok)return!1;let n=bn[t];return this.cash-=n.price,this.owned.add(t),this.applyOwned(),this.events.push({type:"purchase",id:t}),!0}canUnlock(t){return t===this.unlocked&&t<Bt.length&&this.cash>=Bt[t].cost}unlock(t){return this.canUnlock(t)?(this.cash-=Bt[t].cost,this.unlocked=t+1,this.events.push({type:"unlock",k:t}),this.selectStart(t),!0):!1}selectStart(t){return t>=this.unlocked||t===this.sel||this.reloc?!1:(this.reloc={from:this.sel,to:t,phase:"wait",t:0,dur:2.2+Math.abs(Bt[t].s-Bt[this.sel].s)/38},this.events.push({type:"relocStart",from:this.sel,to:t}),!0)}applyOwned(){let t=this.owned,e=this.phys;for(let n of["rootRail","splashGuard","poolGuide","catchRamp","spillRail","alderBypass","landingBoards","debrisScreen"])e.setGroup(n,t.has(n));e.matOn=t.has("gravelMat"),e.setGroup("roughPebbles",!t.has("gravelMat"))}installChute(t){let e=this.creek.chuteColliders(t);for(let n of e)n.bcx=n.cx,n.bcz=n.cz,n.br=Math.hypot(n.h[0],n.h[2])+.0335+.05;this.chuteCols=e,this.rebuildExtra()}rebuildExtra(){this.phys.extra=[...this.chuteCols||[],...this.logCols()]}manualRoll(){if(this.reloc)return"moving";if(this.manualCD>0)return"cooldown";let t;return this.hopper.length?t=this.hopper.shift():(t=ki(this.owned),this.stats.made++,this.events.push({type:"handMade"})),this.launch(t,!0),this.manualCD=tr,"ok"}launch(t,e=!1){let n=this.sel,i=this.creek.chuteFor(n),s=this.nextId++,o=Ho(s,t,s*2654435761^this.launchSeed),[a,l,c]=i.R0,[h,u,d]=i.M,p=h-a,g=u-l,x=d-c,m=Math.hypot(p,g,x);p/=m,g/=m,x/=m;let f=Math.hypot(p,x),_=-p*g/f,y=f,v=-x*g/f;o.x=a+p*.05+_*(.0335+.002),o.y=l+g*.05+y*(.0335+.002),o.z=c+x*.05+v*(.0335+.002);let M=this.owned.has("lowFriction")?.07:.22;t&4&&(M*=.25);let S=.55*(1+M*(Sn(o)*2-1)),A=(t&4?.01:.04)*(Sn(o)*2-1),T=-x/f,w=p/f;o.vx=p*S+T*A,o.vy=g*S,o.vz=x*S+w*A,o.start=n,o.payout=Bt[n].base+Es(t),o.cps=Ec(n),o.cpi=0,o.launchT=this.t;let b=this.creek.locate(o.x,o.z,-1,{});return o.hint=b.idx,o.s=b.s,o.d=b.d,o.prevS=b.s,o.maxS=b.s,this.phys.balls.push(o),this.lastLaunch={id:s,t:this.t,x:o.x,y:o.y,z:o.z},this.stats.launched++,this.events.push({type:"launch",id:s,manual:e,spec:t,k:n}),o}chuteClear(){let t=this.lastLaunch;if(!t)return!0;let e=this.phys.balls.find(s=>s.id===t.id),n=this.t-t.t;if(!e||e.state!=="roll")return n>.2;let i=Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z);return this.owned.has("spacingSensor")?i>=.3&&n>=.2:n>=1.25&&i>=1||n>4}update(t){this.acc+=Math.min(t,.25);let e=0;for(;this.acc>=Qs&&e<30;)this.tick(Qs),this.acc-=Qs,e++;return e>=30&&(this.acc=0),e}tick(t){this.t+=t,this.sessionStart===void 0&&(this.sessionStart=this.t-t),this.manualCD=Math.max(0,this.manualCD-t);let e=this.numbers,n=this.settings.auto;if(this.reloc){let o=this.reloc;o.t+=t,o.phase==="wait"?(this.chuteClear()||o.t>3)&&(o.phase="move",o.t=0,this.chuteCols=[],this.rebuildExtra(),this.events.push({type:"relocMove",from:o.from,to:o.to,dur:o.dur})):o.t>=o.dur&&(this.sel=o.to,this.reloc=null,this.lastLaunch=null,this.installChute(this.sel),this.events.push({type:"relocated",k:this.sel}))}this.status.press="",this.owned.has("press")&&(n?this.hopper.length>=e.hopper?(this.status.press="Press waiting",this.pressProg=Math.min(this.pressProg,1)):(this.pressProg+=t/e.press,this.pressProg>=1&&(this.pressProg-=1,this.hopper.push(ki(this.owned)),this.stats.made++,this.pressCount++,this.events.push({type:"pressed",head:this.pressCount%2}))):this.status.press="Paused");let i=this.queueCount();if(this.status.feeder="",this.status.creek=i>=2?"Creek backed up":"",this.owned.has("feeder")){let o=e.feeder;i>=2&&(o*=1+i*.5),this.feederT+=t,n?this.reloc?this.status.feeder="Moving":i>=7?this.status.feeder="Holding":this.feederT>=o&&(this.hopper.length?this.chuteClear()&&(this.launch(this.hopper.shift()),this.feederT=0):this.status.feeder="Hopper empty"):this.status.feeder="Paused",this.feederT>o*3&&(this.feederT=o*3)}for(let o of["press","feeder","creek"])this.status[o]&&(this.seenStatus[this.status[o]]=this.t);this.updateLogs(t),this.updateArm(t),this.phys.step(t);for(let o of this.phys.events)this.events.push(o);this.phys.events.length=0,this.trackBalls(t);let s=e.basketCap;if(this.basket.length?(this.drainT+=t,this.drainT>=e.drain&&(this.drainT=0,this.basket.shift(),this.stats.completed++,this.owned.has("conveyor")&&this.crate++,this.events.push({type:"drain"}))):this.drainT=0,this.basket.length<s){let o=null;for(let a of this.phys.balls)a.state==="queue"&&(!o||a.qT<o.qT)&&(o=a);o&&this.toBasket(o)}for(;this.recent.length&&this.t-this.recent[0][0]>300;)this.recent.shift();for(;this.finishTimes.length&&this.t-this.finishTimes[0]>120;)this.finishTimes.shift();for(;this.lossLog.length&&this.t-this.lossLog[0][0]>240;)this.lossLog.shift();if(this.t-(this.sessionStart??0)>120){let o=this.cashPerMin(120);o>this.bestCpm&&(this.bestCpm=o)}}trackBalls(t){let e=this.creek,n=this.phys.balls;for(let i=n.length-1;i>=0;i--){let s=n[i];if(s.state==="queue")continue;if(s.state!=="roll"){n.splice(i,1);continue}let o=s.s,a=s.d;for(;s.cpi<s.cps.length&&o>=s.cps[s.cpi];)e.inChannel(s.cps[s.cpi],a,.4)?(s.cpi++,this.events.push({type:"checkpoint",id:s.id})):(s.missed=!0,s.cpi++);if(o>s.maxS&&(s.maxS=o),!s.paid&&s.prevS<ne&&o>=ne&&e.inChannel(ne,a,.06)&&s.cpi>=s.cps.length&&!s.missed&&this.pay(s),s.prevS=o,o>=Re-.2){if(!s.paid){this.lose(s,"missed the gate",i);continue}if(this.basket.length<this.numbers.basketCap&&!this.queueCount()){this.toBasket(s);continue}s.state="queue",s.qT=this.t,this.placeQueue();continue}if(s.paid)continue;let l=s.sub>0;s.progS===void 0&&(s.progS=o),o>s.progS+.08?(s.progS=o,s.stallT=0):s.stallT+=t;let c=s.speedAvg>.06,h=c?5:2;if(s.stallT>(c?6:3)&&l&&Math.floor(s.stallT/h)!==Math.floor((s.stallT-t)/h)){let x=e.frame(o),m=(c?.15:.25)+Sn(s)*.25,f=(Sn(s)-.5)*.5;s.vx+=x.tx*m+x.nx*f,s.vz+=x.tz*m+x.nz*f,s.vy+=.15,this.events.push({type:"surge",x:s.x,y:s.y,z:s.z})}let u=e.c(o),d=a<u?e.wL(o):e.wR(o),p=Math.abs(a-u)-d,g=null;o<-4.5||o>107||Math.abs(a)>9.5||s.y<e.bedH(o,a)-.25?g="left the creek":p>.5&&s.stallT>3?g="escaped onto the bank":s.stallT>(l?22:8)?g=s.speedAvg>.05?"stuck in an eddy":"wedged":s.age>Math.max(40,this.etaFor(s.start)*3.2)&&(g="took too long"),g&&this.lose(s,g,i)}}pay(t){t.paid=!0,this.cash+=t.payout,this.stats.paid+=t.payout,this.stats.finished++,this.recent.push([this.t,t.payout]),this.finishTimes.push(this.t);let e=this.t-t.launchT,n=this.routeStats[t.start];n.n++,n.last=e,n.avg=n.n===1?e:n.avg+(e-n.avg)*(n.n<10?1/n.n:.1),this.lastFinish={time:e,start:t.start,t:this.t,amount:t.payout},t.start===5&&!this.gorgeFinished&&(this.gorgeFinished=!0,this.events.push({type:"milestone",what:"gorge"})),this.events.push({type:"finish",id:t.id,amount:t.payout,time:e,start:t.start,x:t.x,y:t.y,z:t.z})}lose(t,e,n){t.state="lost",this.stats.lost++;let i="other";for(let s of Pc)if(t.s>=s.s0&&t.s<s.s1){i=s.id;break}this.lossBySpot[i]=(this.lossBySpot[i]||0)+1,this.lossLog.push([this.t,i]),this.events.push({type:"lost",id:t.id,reason:e,x:t.x,y:t.y,z:t.z,spot:i}),this.phys.balls.splice(n,1)}toBasket(t){this.basket.push(t.spec),t.state="done";let e=this.phys.balls.indexOf(t);e>=0&&this.phys.balls.splice(e,1),this.events.push({type:"basketIn",id:t.id}),this.placeQueue()}placeQueue(){let t=this.phys.balls.filter(n=>n.state==="queue").sort((n,i)=>n.qT-i.qT),e=this.creek;t.forEach((n,i)=>{let s=Re-.22-i*.072,o=e.worldXZ(s,e.c(s));n.x=o.x,n.z=o.z,n.y=e.y0(s)+.0335*.3,n.vx=n.vy=n.vz=0,n.wx=n.wy=n.wz=0,n.s=s,n.qi=i})}logCols(){return this.logs.map(t=>({type:1,ax:t.ax,ay:t.y,az:t.az,bx:t.bx,by:t.y,bz:t.bz,r:.032,mat:Pt.WOOD,bcx:t.x,bcz:t.z,br:.45,off:!1,vx:t.vx||0,vy:0,vz:t.vz||0,log:t}))}updateLogs(t){let e=this.creek,n=this.owned.has("debrisScreen");this.logs.forEach((s,o)=>{s.ph+=t*.055;let a,l,c;if(n)a=56.3+o*1.45+Math.sin(this.t*.3+o)*.03,l=e.c(a)-.72-o%2*.08,c=.15*Math.sin(this.t*.2+o*2);else{let f=s.ph;a=58.2+2.1*Math.cos(f),l=e.c(a)+.05+.62*Math.sin(f),c=f+Math.PI/2+.4*Math.sin(this.t*.25+o)}let h=e.worldXZ(a,l),u=e.frame(a),d=e.y0(a)+.005,p=Math.cos(c),g=Math.sin(c),x=(u.tx*p+u.nx*g)*.27,m=(u.tz*p+u.nz*g)*.27;s.vx=(h.x-s.x)/t,s.vz=(h.z-s.z)/t,(!isFinite(s.vx)||Math.abs(s.vx)>2)&&(s.vx=0,s.vz=0),s.x=h.x,s.y=d,s.z=h.z,s.ax=h.x-x,s.az=h.z-m,s.bx=h.x+x,s.bz=h.z+m,s.ang=Math.atan2(m,x)});let i=this.phys.extra;for(let s of i){if(!s.log)continue;let o=s.log;s.ax=o.ax,s.ay=o.y,s.az=o.az,s.bx=o.bx,s.by=o.y,s.bz=o.bz,s.vx=o.vx,s.vz=o.vz,s.bcx=o.x,s.bcz=o.z}}updateArm(t){let e=this.arm;if(e.cd=Math.max(0,e.cd-t),e.phase>0){let n=e.phase;if(e.phase+=t/1.1,n<.5&&e.phase>=.5){let i=this.creek;for(let s of this.phys.balls){if(s.state!=="roll"||s.paid||s.s<Mi.s0||s.s>Mi.s1||s.stallT<1.5)continue;let o=s.s,a=i.c(o)+(o>62.2?0:.1),l=i.worldXZ(o,a);s.x=l.x,s.z=l.z,s.y=i.y0(o)+.0335*.25;let c=i.frame(o);s.vx=c.tx*.35,s.vz=c.tz*.35,s.vy=0,s.stallT=0,s.progS=o,s.speedAvg=.4,s.hint=-1,this.events.push({type:"armClear",id:s.id,x:s.x,y:s.y,z:s.z})}}e.phase>=1&&(e.phase=0,e.cd=.6);return}if(!(!this.owned.has("clearingArm")||e.cd>0)){for(let n of this.phys.balls)if(n.state==="roll"&&!n.paid&&n.s>=Mi.s0&&n.s<=Mi.s1&&n.stallT>2.2){e.phase=1e-6,this.events.push({type:"armSweep"});break}}}suggestions(){let t={},e=this.owned,n=o=>o.find(a=>!e.has(a)&&!this.blocked(a)),i=(o,a)=>this.status[o]===a||this.seenStatus[a]!==void 0&&this.t-this.seenStatus[a]<12;if(i("feeder","Hopper empty")){let o=n(["quickMold","twinPress","servo","turbo"]);o&&(t[o]="Hopper keeps running empty")}if(i("press","Press waiting")){let o=e.has("feeder")?n(["lowFriction","indexed","spacingSensor","hopperExt","bulkHopper"]):"feeder";o&&(t[o]="Press is waiting on a full hopper")}if(i("creek","Creek backed up")){let o=n(["wideBasket","conveyor"]);o&&(t[o]="Balls are backing up at the finish")}let s={};for(let[,o]of this.lossLog)s[o]=(s[o]||0)+1;for(let o of Pc)(s[o.id]||0)>=2&&!e.has(o.fix)&&!this.blocked(o.fix)&&(t[o.fix]=`${s[o.id]} balls lost recently at ${o.label}`);return this.owned.has("feeder")&&!e.has("spacingSensor")&&this.numbers.feeder<1.25&&!this.blocked("spacingSensor")&&(t.spacingSensor="Feeder is faster than its landing buffer"),t}blocked(t){let e=bn[t];if(!e)return!0;for(let n of e.requires)if(!this.owned.has(n))return!0;return e.area!==void 0&&this.unlocked<=e.area}serialize(){let t=this.phys.balls.filter(e=>e.state==="roll"||e.state==="queue").map(e=>({id:e.id,spec:e.spec,st:e.state,x:e.x,y:e.y,z:e.z,vx:e.vx,vy:e.vy,vz:e.vz,wx:e.wx,wy:e.wy,wz:e.wz,q:[e.qx,e.qy,e.qz,e.qw],k:e.start,pay:e.payout,cps:e.cps,cpi:e.cpi,paid:e.paid,missed:!!e.missed,wet:e.wet,age:e.age,lt:e.launchT,stall:e.stallT,rs:e.rs,ps:e.prevS,ms:e.maxS,qT:e.qT||0,wob:e.wob,pg:e.progS,sa:e.speedAvg,sub:e.sub,qi:e.qi}));return{v:Ic,savedAt:Date.now(),t:this.t,cash:this.cash,owned:[...this.owned],unlocked:this.unlocked,sel:this.reloc?this.reloc.to:this.sel,hopper:this.hopper,pressProg:this.pressProg,pressCount:this.pressCount,feederT:this.feederT,manualCD:this.manualCD,nextId:this.nextId,stats:this.stats,recent:this.recent.filter(([e])=>this.t-e<300),basket:this.basket,drainT:this.drainT,crate:this.crate,settings:this.settings,arm:this.arm,acc:this.acc,physT:this.phys.t,lastLaunch:this.lastLaunch,routeStats:this.routeStats,bestCpm:this.bestCpm,gorgeFinished:this.gorgeFinished,lossBySpot:this.lossBySpot,finishTimes:this.finishTimes,lastFinish:this.lastFinish,logs:this.logs.map(e=>e.ph),balls:t}}load(t){!t||t.v!==Ic||(this.t=t.t||0,this.cash=t.cash||0,this.owned=new Set((t.owned||[]).filter(e=>bn[e])),this.unlocked=Math.max(1,Math.min(Bt.length,t.unlocked||1)),this.sel=Math.min(this.unlocked-1,t.sel||0),this.hopper=(t.hopper||[]).slice(0,40),this.pressProg=t.pressProg||0,this.pressCount=t.pressCount||0,this.feederT=t.feederT||0,this.manualCD=t.manualCD||0,this.nextId=t.nextId||1,Object.assign(this.stats,t.stats||{}),this.recent=t.recent||[],this.basket=t.basket||[],this.drainT=t.drainT||0,this.crate=t.crate||0,Object.assign(this.settings,t.settings||{}),Array.isArray(t.routeStats)&&t.routeStats.length===Bt.length&&(this.routeStats=t.routeStats),this.bestCpm=t.bestCpm||0,this.gorgeFinished=!!t.gorgeFinished,this.lossBySpot=t.lossBySpot||{},this.finishTimes=t.finishTimes||[],this.lastFinish=t.lastFinish||null,Array.isArray(t.logs)&&t.logs.forEach((e,n)=>{this.logs[n]&&(this.logs[n].ph=e)}),this.sessionStart=this.t-60,this.phys.t=t.physT??this.t,t.arm&&(this.arm={phase:t.arm.phase||0,cd:t.arm.cd||0,target:null}),this.acc=t.acc||0,this.phys.balls=(t.balls||[]).map(e=>{let n=Ho(e.id,e.spec,e.rs);Object.assign(n,{x:e.x,y:e.y,z:e.z,vx:e.vx,vy:e.vy,vz:e.vz,wx:e.wx,wy:e.wy,wz:e.wz,qx:e.q[0],qy:e.q[1],qz:e.q[2],qw:e.q[3],start:e.k,payout:e.pay,cps:e.cps,cpi:e.cpi,paid:e.paid,missed:e.missed,wet:e.wet,age:e.age,launchT:e.lt,stallT:e.stall,state:e.st,prevS:e.ps,maxS:e.ms,qT:e.qT,wob:e.wob||0,progS:e.pg,speedAvg:e.sa??.5,sub:e.sub??0,qi:e.qi});let i=this.creek.locate(n.x,n.z,-1,{});return n.hint=i.idx,n.s=i.s,n.d=i.d,n}),this.lastLaunch=t.lastLaunch&&this.phys.balls.some(e=>e.id===t.lastLaunch.id)?t.lastLaunch:null)}};var Jl="170";var Fu=0,Lc=1,Bu=2;var Hh=1,Kl=2,Hn=3,fi=0,We=1,be=2,ci=0,hi=1,kr=2,Dc=3,Uc=4,Ou=5,Ci=100,zu=101,ku=102,Hu=103,Vu=104,Gu=200,Wu=201,Xu=202,qu=203,wa=204,Sa=205,Yu=206,Zu=207,$u=208,Ju=209,Ku=210,ju=211,Qu=212,td=213,ed=214,Ea=0,Ta=1,Aa=2,ds=3,Ra=4,Ca=5,Ia=6,Pa=7,Vh=0,nd=1,id=2,ui=0,sd=1,rd=2,od=3,jl=4,ad=5,ld=6,cd=7;var Gh=300,fs=301,ps=302,La=303,Da=304,xo=306,Xn=1e3,Pi=1001,Ua=1002,nn=1003,hd=1004;var or=1005;var An=1006,Vo=1007;var Li=1008;var qn=1009,Wh=1010,Xh=1011,ks=1012,Ql=1013,Di=1014,Rn=1015,Zs=1016,tc=1017,ec=1018,ms=1020,qh=35902,Yh=1021,Zh=1022,gn=1023,$h=1024,Jh=1025,cs=1026,gs=1027,nc=1028,ic=1029,Kh=1030,sc=1031;var rc=1033,Nr=33776,Fr=33777,Br=33778,Or=33779,Na=35840,Fa=35841,Ba=35842,Oa=35843,za=36196,ka=37492,Ha=37496,Va=37808,Ga=37809,Wa=37810,Xa=37811,qa=37812,Ya=37813,Za=37814,$a=37815,Ja=37816,Ka=37817,ja=37818,Qa=37819,tl=37820,el=37821,zr=36492,nl=36494,il=36495,jh=36283,sl=36284,rl=36285,ol=36286;var Hr=2300,al=2301,Go=2302,Nc=2400,Fc=2401,Bc=2402;var ud=3200,dd=3201;var Qh=0,fd=1,ai="",De="srgb",_s="srgb-linear",vo="linear",ce="srgb";var Gi=7680;var Oc=519,pd=512,md=513,gd=514,tu=515,xd=516,vd=517,yd=518,_d=519,ll=35044,Kn=35048;var zc="300 es",Gn=2e3,Vr=2001,pi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}},Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Wo=Math.PI/180,cl=180/Math.PI;function di(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ve[r&255]+Ve[r>>8&255]+Ve[r>>16&255]+Ve[r>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]).toLowerCase()}function Be(r,t,e){return Math.max(t,Math.min(e,r))}function Md(r,t){return(r%t+t)%t}function Xo(r,t,e){return(1-e)*r+e*t}function Tn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function he(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var vt=class r{constructor(t=0,e=0){r.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ht=class r{constructor(t,e,n,i,s,o,a,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],x=i[0],m=i[3],f=i[6],_=i[1],y=i[4],v=i[7],M=i[2],S=i[5],A=i[8];return s[0]=o*x+a*_+l*M,s[3]=o*m+a*y+l*S,s[6]=o*f+a*v+l*A,s[1]=c*x+h*_+u*M,s[4]=c*m+h*y+u*S,s[7]=c*f+h*v+u*A,s[2]=d*x+p*_+g*M,s[5]=d*m+p*y+g*S,s[8]=d*f+p*v+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,p=c*s-o*l,g=e*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(i*c-h*n)*x,t[2]=(a*n-i*o)*x,t[3]=d*x,t[4]=(h*e-i*l)*x,t[5]=(i*s-a*e)*x,t[6]=p*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*s)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(qo.makeScale(t,e)),this}rotate(t){return this.premultiply(qo.makeRotation(-t)),this}translate(t,e){return this.premultiply(qo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},qo=new Ht;function eu(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Gr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function bd(){let r=Gr("canvas");return r.style.display="block",r}var kc={};function Ns(r){r in kc||(kc[r]=!0,console.warn(r))}function wd(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Sd(r){let t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ed(r){let t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var te={enabled:!0,workingColorSpace:_s,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ce&&(r.r=Wn(r.r),r.g=Wn(r.g),r.b=Wn(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ce&&(r.r=hs(r.r),r.g=hs(r.g),r.b=hs(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ai?vo:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Wn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function hs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var Hc=[.64,.33,.3,.6,.15,.06],Vc=[.2126,.7152,.0722],Gc=[.3127,.329],Wc=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xc=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);te.define({[_s]:{primaries:Hc,whitePoint:Gc,transfer:vo,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:Vc,workingColorSpaceConfig:{unpackColorSpace:De},outputColorSpaceConfig:{drawingBufferColorSpace:De}},[De]:{primaries:Hc,whitePoint:Gc,transfer:ce,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:Vc,outputColorSpaceConfig:{drawingBufferColorSpace:De}}});var Wi,hl=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Wi===void 0&&(Wi=Gr("canvas")),Wi.width=t.width,Wi.height=t.height;let n=Wi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Wi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Gr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Wn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Wn(e[n]/255)*255):e[n]=Wn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Td=0,Wr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=di(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Yo(i[o].image)):s.push(Yo(i[o]))}else s=Yo(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function Yo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?hl.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ad=0,Ke=class r extends pi{constructor(t=r.DEFAULT_IMAGE,e=r.DEFAULT_MAPPING,n=Pi,i=Pi,s=An,o=Li,a=gn,l=qn,c=r.DEFAULT_ANISOTROPY,h=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=di(),this.name="",this.source=new Wr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Xn:t.x=t.x-Math.floor(t.x);break;case Pi:t.x=t.x<0?0:1;break;case Ua:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Xn:t.y=t.y-Math.floor(t.y);break;case Pi:t.y=t.y<0?0:1;break;case Ua:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=Gh;Ke.DEFAULT_ANISOTROPY=1;var Se=class r{constructor(t=0,e=0,n=0,i=1){r.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(c+1)/2,v=(p+1)/2,M=(f+1)/2,S=(h+d)/4,A=(u+x)/4,T=(g+m)/4;return y>v&&y>M?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=S/n,s=A/n):v>M?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=S/i,s=T/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=A/s,i=T/s),this.set(n,i,s,e),this}let _=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(u-x)/_,this.z=(d-h)/_,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ul=class extends pi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:An,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new Ke(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Wr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yn=class extends ul{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Xr=class extends Ke{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=nn,this.minFilter=nn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var dl=class extends Ke{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=nn,this.minFilter=nn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ze=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[o+0],p=s[o+1],g=s[o+2],x=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==d||c!==p||h!==g){let m=1-a,f=l*d+c*p+h*g+u*x,_=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){let M=Math.sqrt(y),S=Math.atan2(M,f*_);m=Math.sin(m*S)/M,a=Math.sin(a*S)/M}let v=a*_;if(l=l*m+d*v,c=c*m+p*v,h=h*m+g*v,u=u*m+x*v,m===1-a){let M=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=M,c*=M,h*=M,u*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],p=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-a*p,t[e+2]=c*g+h*p+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),p=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-i)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(s+c)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(s-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Be(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class r{constructor(t=0,e=0,n=0){r.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Zo.copy(this).projectOnVector(t),this.sub(Zo)}reflect(t){return this.sub(Zo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Zo=new P,qc=new Ze,Zn=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,fn):fn.fromBufferAttribute(s,o),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ar.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ar.copy(n.boundingBox)),ar.applyMatrix4(t.matrixWorld),this.union(ar)}let i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ts),lr.subVectors(this.max,Ts),Xi.subVectors(t.a,Ts),qi.subVectors(t.b,Ts),Yi.subVectors(t.c,Ts),ei.subVectors(qi,Xi),ni.subVectors(Yi,qi),bi.subVectors(Xi,Yi);let e=[0,-ei.z,ei.y,0,-ni.z,ni.y,0,-bi.z,bi.y,ei.z,0,-ei.x,ni.z,0,-ni.x,bi.z,0,-bi.x,-ei.y,ei.x,0,-ni.y,ni.x,0,-bi.y,bi.x,0];return!$o(e,Xi,qi,Yi,lr)||(e=[1,0,0,0,1,0,0,0,1],!$o(e,Xi,qi,Yi,lr))?!1:(cr.crossVectors(ei,ni),e=[cr.x,cr.y,cr.z],$o(e,Xi,qi,Yi,lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Fn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Fn=[new P,new P,new P,new P,new P,new P,new P,new P],fn=new P,ar=new Zn,Xi=new P,qi=new P,Yi=new P,ei=new P,ni=new P,bi=new P,Ts=new P,lr=new P,cr=new P,wi=new P;function $o(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){wi.fromArray(r,s);let a=i.x*Math.abs(wi.x)+i.y*Math.abs(wi.y)+i.z*Math.abs(wi.z),l=t.dot(wi),c=e.dot(wi),h=n.dot(wi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Rd=new Zn,As=new P,Jo=new P,mi=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Rd.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;As.subVectors(t,this.center);let e=As.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(As,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(As.copy(t.center).add(Jo)),this.expandByPoint(As.copy(t.center).sub(Jo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Bn=new P,Ko=new P,hr=new P,ii=new P,jo=new P,ur=new P,Qo=new P,Hs=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Bn.copy(this.origin).addScaledVector(this.direction,e),Bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ko.copy(t).add(e).multiplyScalar(.5),hr.copy(e).sub(t).normalize(),ii.copy(this.origin).sub(Ko);let s=t.distanceTo(e)*.5,o=-this.direction.dot(hr),a=ii.dot(this.direction),l=-ii.dot(hr),c=ii.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=s*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ko).addScaledVector(hr,d),p}intersectSphere(t,e){Bn.subVectors(t.center,this.origin);let n=Bn.dot(this.direction),i=Bn.dot(Bn)-n*n,s=t.radius*t.radius;if(i>s)return null;let o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Bn)!==null}intersectTriangle(t,e,n,i,s){jo.subVectors(e,t),ur.subVectors(n,t),Qo.crossVectors(jo,ur);let o=this.direction.dot(Qo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ii.subVectors(this.origin,t);let l=a*this.direction.dot(ur.crossVectors(ii,ur));if(l<0)return null;let c=a*this.direction.dot(jo.cross(ii));if(c<0||l+c>o)return null;let h=-a*ii.dot(Qo);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Yt=class r{constructor(t,e,n,i,s,o,a,l,c,h,u,d,p,g,x,m){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,d,p,g,x,m)}set(t,e,n,i,s,o,a,l,c,h,u,d,p,g,x,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Zi.setFromMatrixColumn(t,0).length(),s=1/Zi.setFromMatrixColumn(t,1).length(),o=1/Zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){let d=o*h,p=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d+x*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d-x*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,p=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Cd,t,Id)}lookAt(t,e,n){let i=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),si.crossVectors(n,tn),si.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),si.crossVectors(n,tn)),si.normalize(),dr.crossVectors(tn,si),i[0]=si.x,i[4]=dr.x,i[8]=tn.x,i[1]=si.y,i[5]=dr.y,i[9]=tn.y,i[2]=si.z,i[6]=dr.z,i[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],x=n[6],m=n[10],f=n[14],_=n[3],y=n[7],v=n[11],M=n[15],S=i[0],A=i[4],T=i[8],w=i[12],b=i[1],C=i[5],D=i[9],U=i[13],L=i[2],H=i[6],z=i[10],q=i[14],N=i[3],Z=i[7],j=i[11],it=i[15];return s[0]=o*S+a*b+l*L+c*N,s[4]=o*A+a*C+l*H+c*Z,s[8]=o*T+a*D+l*z+c*j,s[12]=o*w+a*U+l*q+c*it,s[1]=h*S+u*b+d*L+p*N,s[5]=h*A+u*C+d*H+p*Z,s[9]=h*T+u*D+d*z+p*j,s[13]=h*w+u*U+d*q+p*it,s[2]=g*S+x*b+m*L+f*N,s[6]=g*A+x*C+m*H+f*Z,s[10]=g*T+x*D+m*z+f*j,s[14]=g*w+x*U+m*q+f*it,s[3]=_*S+y*b+v*L+M*N,s[7]=_*A+y*C+v*H+M*Z,s[11]=_*T+y*D+v*z+M*j,s[15]=_*w+y*U+v*q+M*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*p-n*l*p)+x*(+e*l*p-e*c*d+s*o*d-i*o*p+i*c*h-s*l*h)+m*(+e*c*u-e*a*p-s*o*u+n*o*p+s*a*h-n*c*h)+f*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],_=u*m*c-x*d*c+x*l*p-a*m*p-u*l*f+a*d*f,y=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,v=h*x*c-g*u*c+g*a*p-o*x*p-h*a*f+o*u*f,M=g*u*l-h*x*l-g*a*d+o*x*d+h*a*m-o*u*m,S=e*_+n*y+i*v+s*M;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/S;return t[0]=_*A,t[1]=(x*d*s-u*m*s-x*i*p+n*m*p+u*i*f-n*d*f)*A,t[2]=(a*m*s-x*l*s+x*i*c-n*m*c-a*i*f+n*l*f)*A,t[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*p-n*l*p)*A,t[4]=y*A,t[5]=(h*m*s-g*d*s+g*i*p-e*m*p-h*i*f+e*d*f)*A,t[6]=(g*l*s-o*m*s-g*i*c+e*m*c+o*i*f-e*l*f)*A,t[7]=(o*d*s-h*l*s+h*i*c-e*d*c-o*i*p+e*l*p)*A,t[8]=v*A,t[9]=(g*u*s-h*x*s-g*n*p+e*x*p+h*n*f-e*u*f)*A,t[10]=(o*x*s-g*a*s+g*n*c-e*x*c-o*n*f+e*a*f)*A,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*p-e*a*p)*A,t[12]=M*A,t[13]=(h*x*i-g*u*i+g*n*d-e*x*d-h*n*m+e*u*m)*A,t[14]=(g*a*i-o*x*i-g*n*l+e*x*l+o*n*m-e*a*m)*A,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*A,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,p=s*h,g=s*u,x=o*h,m=o*u,f=a*u,_=l*c,y=l*h,v=l*u,M=n.x,S=n.y,A=n.z;return i[0]=(1-(x+f))*M,i[1]=(p+v)*M,i[2]=(g-y)*M,i[3]=0,i[4]=(p-v)*S,i[5]=(1-(d+f))*S,i[6]=(m+_)*S,i[7]=0,i[8]=(g+y)*A,i[9]=(m-_)*A,i[10]=(1-(d+x))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=Zi.set(i[0],i[1],i[2]).length(),o=Zi.set(i[4],i[5],i[6]).length(),a=Zi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],pn.copy(this);let c=1/s,h=1/o,u=1/a;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=u,pn.elements[9]*=u,pn.elements[10]*=u,e.setFromRotationMatrix(pn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Gn){let l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),p,g;if(a===Gn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Vr)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Gn){let l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),d=(e+t)*c,p=(n+i)*h,g,x;if(a===Gn)g=(o+s)*u,x=-2*u;else if(a===Vr)g=s*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Zi=new P,pn=new Yt,Cd=new P(0,0,0),Id=new P(1,1,1),si=new P,dr=new P,tn=new P,Yc=new Yt,Zc=new Ze,an=class r{constructor(t=0,e=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Be(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zc.setFromEuler(this),this.setFromQuaternion(Zc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};an.DEFAULT_ORDER="XYZ";var Vs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Pd=0,$c=new P,$i=new Ze,On=new Yt,fr=new P,Rs=new P,Ld=new P,Dd=new Ze,Jc=new P(1,0,0),Kc=new P(0,1,0),jc=new P(0,0,1),Qc={type:"added"},Ud={type:"removed"},Ji={type:"childadded",child:null},ta={type:"childremoved",child:null},Oe=class r extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let t=new P,e=new an,n=new Ze,i=new P(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Yt},normalMatrix:{value:new Ht}}),this.matrix=new Yt,this.matrixWorld=new Yt,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(Jc,t)}rotateY(t){return this.rotateOnAxis(Kc,t)}rotateZ(t){return this.rotateOnAxis(jc,t)}translateOnAxis(t,e){return $c.copy(t).applyQuaternion(this.quaternion),this.position.add($c.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Jc,t)}translateY(t){return this.translateOnAxis(Kc,t)}translateZ(t){return this.translateOnAxis(jc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?fr.copy(t):fr.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(Rs,fr,this.up):On.lookAt(fr,Rs,this.up),this.quaternion.setFromRotationMatrix(On),i&&(On.extractRotation(i.matrixWorld),$i.setFromRotationMatrix(On),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qc),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ud),ta.child=t,this.dispatchEvent(ta),ta.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),On.multiply(t.parent.matrixWorld)),t.applyMatrix4(On),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qc),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,t,Ld),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,Dd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};Oe.DEFAULT_UP=new P(0,1,0);Oe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mn=new P,zn=new P,ea=new P,kn=new P,Ki=new P,ji=new P,th=new P,na=new P,ia=new P,sa=new P,ra=new Se,oa=new Se,aa=new Se,li=class r{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),mn.subVectors(t,e),i.cross(mn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){mn.subVectors(i,e),zn.subVectors(n,e),ea.subVectors(t,e);let o=mn.dot(mn),a=mn.dot(zn),l=mn.dot(ea),c=zn.dot(zn),h=zn.dot(ea),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,kn.x),l.addScaledVector(o,kn.y),l.addScaledVector(a,kn.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return ra.setScalar(0),oa.setScalar(0),aa.setScalar(0),ra.fromBufferAttribute(t,e),oa.fromBufferAttribute(t,n),aa.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(ra,s.x),o.addScaledVector(oa,s.y),o.addScaledVector(aa,s.z),o}static isFrontFacing(t,e,n,i){return mn.subVectors(n,e),zn.subVectors(t,e),mn.cross(zn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),mn.cross(zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return r.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,o,a;Ki.subVectors(i,n),ji.subVectors(s,n),na.subVectors(t,n);let l=Ki.dot(na),c=ji.dot(na);if(l<=0&&c<=0)return e.copy(n);ia.subVectors(t,i);let h=Ki.dot(ia),u=ji.dot(ia);if(h>=0&&u<=h)return e.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ki,o);sa.subVectors(t,s);let p=Ki.dot(sa),g=ji.dot(sa);if(g>=0&&p<=g)return e.copy(s);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ji,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return th.subVectors(s,i),a=(u-h)/(u-h+(p-g)),e.copy(i).addScaledVector(th,a);let f=1/(m+x+d);return o=x*f,a=d*f,e.copy(n).addScaledVector(Ki,o).addScaledVector(ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},pr={h:0,s:0,l:0};function la(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var at=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=te.workingColorSpace){if(t=Md(t,1),e=Be(e,0,1),n=Be(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=la(o,s,t+1/3),this.g=la(o,s,t),this.b=la(o,s,t-1/3)}return te.toWorkingColorSpace(this,i),this}setStyle(t,e=De){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){let n=nu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Wn(t.r),this.g=Wn(t.g),this.b=Wn(t.b),this}copyLinearToSRGB(t){return this.r=hs(t.r),this.g=hs(t.g),this.b=hs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return te.fromWorkingColorSpace(Ge.copy(this),t),Math.round(Be(Ge.r*255,0,255))*65536+Math.round(Be(Ge.g*255,0,255))*256+Math.round(Be(Ge.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.fromWorkingColorSpace(Ge.copy(this),e);let n=Ge.r,i=Ge.g,s=Ge.b,o=Math.max(n,i,s),a=Math.min(n,i,s),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=te.workingColorSpace){return te.fromWorkingColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=De){te.fromWorkingColorSpace(Ge.copy(this),t);let e=Ge.r,n=Ge.g,i=Ge.b;return t!==De?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ri),this.setHSL(ri.h+t,ri.s+e,ri.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ri),t.getHSL(pr);let n=Xo(ri.h,pr.h,e),i=Xo(ri.s,pr.s,e),s=Xo(ri.l,pr.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ge=new at;at.NAMES=nu;var Nd=0,$n=class extends pi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=di(),this.name="",this.blending=hi,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wa,this.blendDst=Sa,this.blendEquation=Ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gi,this.stencilZFail=Gi,this.stencilZPass=Gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(n.blending=this.blending),this.side!==fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wa&&(n.blendSrc=this.blendSrc),this.blendDst!==Sa&&(n.blendDst=this.blendDst),this.blendEquation!==Ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ds&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(e){let s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Jn=class extends $n{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=Vh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ae=new P,mr=new vt,ie=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ll,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)mr.fromBufferAttribute(this,e),mr.applyMatrix3(t),this.setXY(e,mr.x,mr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=he(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Tn(e,this.array)),e}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Tn(e,this.array)),e}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Tn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Tn(e,this.array)),e}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array),i=he(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array),i=he(i,this.array),s=he(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ll&&(t.usage=this.usage),t}};var qr=class extends ie{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Yr=class extends ie{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var oe=class extends ie{constructor(t,e,n){super(new Float32Array(t),e,n)}},Fd=0,on=new Yt,ca=new Oe,Qi=new P,en=new Zn,Cs=new Zn,Le=new P,ge=class r extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(eu(t)?Yr:qr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ht().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return ca.lookAt(t),ca.updateMatrix(),this.applyMatrix4(ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new oe(n,3))}else{for(let n=0,i=e.count;n<i;n++){let s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];en.setFromBufferAttribute(s),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let a=e[s];Cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(en.min,Cs.min),en.expandByPoint(Le),Le.addVectors(en.max,Cs.max),en.expandByPoint(Le)):(en.expandByPoint(Cs.min),en.expandByPoint(Cs.max))}en.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Le.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Le));if(e)for(let s=0,o=e.length;s<o;s++){let a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Le.fromBufferAttribute(a,c),l&&(Qi.fromBufferAttribute(t,c),Le.add(Qi)),i=Math.max(i,n.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ie(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let T=0;T<n.count;T++)a[T]=new P,l[T]=new P;let c=new P,h=new P,u=new P,d=new vt,p=new vt,g=new vt,x=new P,m=new P;function f(T,w,b){c.fromBufferAttribute(n,T),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,b),d.fromBufferAttribute(s,T),p.fromBufferAttribute(s,w),g.fromBufferAttribute(s,b),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(C),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),a[T].add(x),a[w].add(x),a[b].add(x),l[T].add(m),l[w].add(m),l[b].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let T=0,w=_.length;T<w;++T){let b=_[T],C=b.start,D=b.count;for(let U=C,L=C+D;U<L;U+=3)f(t.getX(U+0),t.getX(U+1),t.getX(U+2))}let y=new P,v=new P,M=new P,S=new P;function A(T){M.fromBufferAttribute(i,T),S.copy(M);let w=a[T];y.copy(w),y.sub(M.multiplyScalar(M.dot(w))).normalize(),v.crossVectors(S,w);let C=v.dot(l[T])<0?-1:1;o.setXYZW(T,y.x,y.y,y.z,C)}for(let T=0,w=_.length;T<w;++T){let b=_[T],C=b.start,D=b.count;for(let U=C,L=C+D;U<L;U+=3)A(t.getX(U+0)),A(t.getX(U+1)),A(t.getX(U+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ie(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new P,s=new P,o=new P,a=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new ie(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let s=t.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},eh=new Yt,Si=new Hs,gr=new mi,nh=new P,xr=new P,vr=new P,yr=new P,ha=new P,_r=new P,ih=new P,Mr=new P,Nt=class extends Oe{constructor(t=new ge,e=new Jn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(s&&a){_r.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=a[l],u=s[l];h!==0&&(ha.fromBufferAttribute(u,t),o?_r.addScaledVector(ha,h):_r.addScaledVector(ha.sub(e),h))}e.add(_r)}return e}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(s),Si.copy(t.ray).recast(t.near),!(gr.containsPoint(Si.origin)===!1&&(Si.intersectSphere(gr,nh)===null||Si.origin.distanceToSquared(nh)>(t.far-t.near)**2))&&(eh.copy(s).invert(),Si.copy(t.ray).applyMatrix4(eh),!(n.boundingBox!==null&&Si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Si)))}_computeIntersections(t,e,n){let i,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=o[m.materialIndex],_=Math.max(m.start,p.start),y=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=_,M=y;v<M;v+=3){let S=a.getX(v),A=a.getX(v+1),T=a.getX(v+2);i=br(this,f,t,n,c,h,u,S,A,T),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let _=a.getX(m),y=a.getX(m+1),v=a.getX(m+2);i=br(this,o,t,n,c,h,u,_,y,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=o[m.materialIndex],_=Math.max(m.start,p.start),y=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=_,M=y;v<M;v+=3){let S=v,A=v+1,T=v+2;i=br(this,f,t,n,c,h,u,S,A,T),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let _=m,y=m+1,v=m+2;i=br(this,o,t,n,c,h,u,_,y,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function Bd(r,t,e,n,i,s,o,a){let l;if(t.side===We?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===fi,a),l===null)return null;Mr.copy(a),Mr.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Mr);return c<e.near||c>e.far?null:{distance:c,point:Mr.clone(),object:r}}function br(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,xr),r.getVertexPosition(l,vr),r.getVertexPosition(c,yr);let h=Bd(r,t,e,n,xr,vr,yr,ih);if(h){let u=new P;li.getBarycoord(ih,xr,vr,yr,u),i&&(h.uv=li.getInterpolatedAttribute(i,a,l,c,u,new vt)),s&&(h.uv1=li.getInterpolatedAttribute(s,a,l,c,u,new vt)),o&&(h.normal=li.getInterpolatedAttribute(o,a,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new P,materialIndex:0};li.getNormal(xr,vr,yr,d.normal),h.face=d,h.barycoord=u}return h}var Ui=class r extends ge{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function g(x,m,f,_,y,v,M,S,A,T,w){let b=v/A,C=M/T,D=v/2,U=M/2,L=S/2,H=A+1,z=T+1,q=0,N=0,Z=new P;for(let j=0;j<z;j++){let it=j*C-U;for(let yt=0;yt<H;yt++){let Tt=yt*b-D;Z[x]=Tt*_,Z[m]=it*y,Z[f]=L,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[m]=0,Z[f]=S>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(yt/A),u.push(1-j/T),q+=1}}for(let j=0;j<T;j++)for(let it=0;it<A;it++){let yt=d+it+H*j,Tt=d+it+H*(j+1),Y=d+(it+1)+H*(j+1),et=d+(it+1)+H*j;l.push(yt,Tt,et),l.push(Tt,Y,et),N+=6}a.addGroup(p,N,w),p+=N,d+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function xs(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function qe(r){let t={};for(let e=0;e<r.length;e++){let n=xs(r[e]);for(let i in n)t[i]=n[i]}return t}function Od(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function iu(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}var Ms={clone:xs,merge:qe},zd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ze=class extends $n{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zd,this.fragmentShader=kd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xs(t.uniforms),this.uniformsGroups=Od(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Zr=class extends Oe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Yt,this.projectionMatrix=new Yt,this.projectionMatrixInverse=new Yt,this.coordinateSystem=Gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},oi=new P,sh=new vt,rh=new vt,Ye=class extends Zr{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=cl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Wo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return cl*2*Math.atan(Math.tan(Wo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(oi.x,oi.y).multiplyScalar(-t/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-t/oi.z)}getViewSize(t,e){return this.getViewBounds(t,sh,rh),e.subVectors(rh,sh)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Wo*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ts=-90,es=1,fl=class extends Oe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ye(ts,es,t,e);i.layers=this.layers,this.add(i);let s=new Ye(ts,es,t,e);s.layers=this.layers,this.add(s);let o=new Ye(ts,es,t,e);o.layers=this.layers,this.add(o);let a=new Ye(ts,es,t,e);a.layers=this.layers,this.add(a);let l=new Ye(ts,es,t,e);l.layers=this.layers,this.add(l);let c=new Ye(ts,es,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(let c of e)this.remove(c);if(t===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},$r=class extends Ke{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:fs,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},pl=class extends Yn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new $r(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:An}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ui(5,5,5),s=new ze({name:"CubemapFromEquirect",uniforms:xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:ci});s.uniforms.tEquirect.value=e;let o=new Nt(i,s),a=e.minFilter;return e.minFilter===Li&&(e.minFilter=An),new fl(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}},ua=new P,Hd=new P,Vd=new Ht,Vn=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=ua.subVectors(n,e).cross(Hd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(ua),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Vd.getNormalMatrix(t),i=this.coplanarPoint(ua).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ei=new mi,wr=new P,Gs=class{constructor(t=new Vn,e=new Vn,n=new Vn,i=new Vn,s=new Vn,o=new Vn){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Gn){let n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],p=i[8],g=i[9],x=i[10],m=i[11],f=i[12],_=i[13],y=i[14],v=i[15];if(n[0].setComponents(l-s,d-c,m-p,v-f).normalize(),n[1].setComponents(l+s,d+c,m+p,v+f).normalize(),n[2].setComponents(l+o,d+h,m+g,v+_).normalize(),n[3].setComponents(l-o,d-h,m-g,v-_).normalize(),n[4].setComponents(l-a,d-u,m-x,v-y).normalize(),e===Gn)n[5].setComponents(l+a,d+u,m+x,v+y).normalize();else if(e===Vr)n[5].setComponents(a,u,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(t){return Ei.center.set(0,0,0),Ei.radius=.7071067811865476,Ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(wr.x=i.normal.x>0?t.max.x:t.min.x,wr.y=i.normal.y>0?t.max.y:t.min.y,wr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(wr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function su(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Gd(r){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=r.SHORT;else if(c instanceof Uint32Array)p=r.UNSIGNED_INT;else if(c instanceof Int32Array)p=r.INT;else if(c instanceof Int8Array)p=r.BYTE;else if(c instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let x=u[p];r.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var ke=class r extends ge{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){let _=f*d-o;for(let y=0;y<c;y++){let v=y*u-s;g.push(v,-_,0),x.push(0,0,1),m.push(y/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let _=0;_<a;_++){let y=_+c*f,v=_+c*(f+1),M=_+1+c*(f+1),S=_+1+c*f;p.push(y,v,S),p.push(v,M,S)}this.setIndex(p),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(x,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}},Wd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xd=`#ifdef USE_ALPHAHASH
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
#endif`,qd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jd=`#ifdef USE_AOMAP
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
#endif`,Kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jd=`#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Qd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sf=`#ifdef USE_IRIDESCENCE
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
#endif`,rf=`#ifdef USE_BUMPMAP
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
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,df=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ff=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,pf=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
} // validated`,mf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gf=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,xf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_f=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mf="gl_FragColor = linearToOutputTexel( gl_FragColor );",bf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Sf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ef=`#ifdef USE_ENVMAP
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
#endif`,Tf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Af=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,If=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lf=`#ifdef USE_GRADIENTMAP
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
}`,Df=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ff=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`,Bf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,Of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Gf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Wf=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Xf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,qf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Yf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$f=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Kf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tp=`#if defined( USE_POINTS_UV )
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
#endif`,ep=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,np=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ip=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,op=`#ifdef USE_MORPHTARGETS
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
#endif`,ap=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fp=`#ifdef USE_NORMALMAP
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
#endif`,pp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_p=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ep=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ap=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
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
#endif`,Rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,Cp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`,Ip=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pp=`#ifdef USE_SKINNING
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
#endif`,Lp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dp=`#ifdef USE_SKINNING
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
#endif`,Up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Np=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Op=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zp=`#ifdef USE_TRANSMISSION
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
#endif`,kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Wp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xp=`uniform sampler2D t2D;
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
}`,qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$p=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`#include <common>
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
}`,Kp=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jp=`#define DISTANCE
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
}`,Qp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,em=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nm=`uniform float scale;
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
}`,im=`uniform vec3 diffuse;
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
}`,sm=`#include <common>
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
}`,rm=`uniform vec3 diffuse;
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
}`,om=`#define LAMBERT
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
}`,am=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,lm=`#define MATCAP
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
}`,cm=`#define MATCAP
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
}`,hm=`#define NORMAL
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
}`,um=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dm=`#define PHONG
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
}`,fm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,pm=`#define STANDARD
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
}`,mm=`#define STANDARD
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
#include <packing>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,gm=`#define TOON
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
}`,xm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,vm=`uniform float size;
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
}`,ym=`uniform vec3 diffuse;
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
}`,_m=`#include <common>
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
}`,Mm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,bm=`uniform float rotation;
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
}`,wm=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:Wd,alphahash_pars_fragment:Xd,alphamap_fragment:qd,alphamap_pars_fragment:Yd,alphatest_fragment:Zd,alphatest_pars_fragment:$d,aomap_fragment:Jd,aomap_pars_fragment:Kd,batching_pars_vertex:jd,batching_vertex:Qd,begin_vertex:tf,beginnormal_vertex:ef,bsdfs:nf,iridescence_fragment:sf,bumpmap_pars_fragment:rf,clipping_planes_fragment:of,clipping_planes_pars_fragment:af,clipping_planes_pars_vertex:lf,clipping_planes_vertex:cf,color_fragment:hf,color_pars_fragment:uf,color_pars_vertex:df,color_vertex:ff,common:pf,cube_uv_reflection_fragment:mf,defaultnormal_vertex:gf,displacementmap_pars_vertex:xf,displacementmap_vertex:vf,emissivemap_fragment:yf,emissivemap_pars_fragment:_f,colorspace_fragment:Mf,colorspace_pars_fragment:bf,envmap_fragment:wf,envmap_common_pars_fragment:Sf,envmap_pars_fragment:Ef,envmap_pars_vertex:Tf,envmap_physical_pars_fragment:Bf,envmap_vertex:Af,fog_vertex:Rf,fog_pars_vertex:Cf,fog_fragment:If,fog_pars_fragment:Pf,gradientmap_pars_fragment:Lf,lightmap_pars_fragment:Df,lights_lambert_fragment:Uf,lights_lambert_pars_fragment:Nf,lights_pars_begin:Ff,lights_toon_fragment:Of,lights_toon_pars_fragment:zf,lights_phong_fragment:kf,lights_phong_pars_fragment:Hf,lights_physical_fragment:Vf,lights_physical_pars_fragment:Gf,lights_fragment_begin:Wf,lights_fragment_maps:Xf,lights_fragment_end:qf,logdepthbuf_fragment:Yf,logdepthbuf_pars_fragment:Zf,logdepthbuf_pars_vertex:$f,logdepthbuf_vertex:Jf,map_fragment:Kf,map_pars_fragment:jf,map_particle_fragment:Qf,map_particle_pars_fragment:tp,metalnessmap_fragment:ep,metalnessmap_pars_fragment:np,morphinstance_vertex:ip,morphcolor_vertex:sp,morphnormal_vertex:rp,morphtarget_pars_vertex:op,morphtarget_vertex:ap,normal_fragment_begin:lp,normal_fragment_maps:cp,normal_pars_fragment:hp,normal_pars_vertex:up,normal_vertex:dp,normalmap_pars_fragment:fp,clearcoat_normal_fragment_begin:pp,clearcoat_normal_fragment_maps:mp,clearcoat_pars_fragment:gp,iridescence_pars_fragment:xp,opaque_fragment:vp,packing:yp,premultiplied_alpha_fragment:_p,project_vertex:Mp,dithering_fragment:bp,dithering_pars_fragment:wp,roughnessmap_fragment:Sp,roughnessmap_pars_fragment:Ep,shadowmap_pars_fragment:Tp,shadowmap_pars_vertex:Ap,shadowmap_vertex:Rp,shadowmask_pars_fragment:Cp,skinbase_vertex:Ip,skinning_pars_vertex:Pp,skinning_vertex:Lp,skinnormal_vertex:Dp,specularmap_fragment:Up,specularmap_pars_fragment:Np,tonemapping_fragment:Fp,tonemapping_pars_fragment:Bp,transmission_fragment:Op,transmission_pars_fragment:zp,uv_pars_fragment:kp,uv_pars_vertex:Hp,uv_vertex:Vp,worldpos_vertex:Gp,background_vert:Wp,background_frag:Xp,backgroundCube_vert:qp,backgroundCube_frag:Yp,cube_vert:Zp,cube_frag:$p,depth_vert:Jp,depth_frag:Kp,distanceRGBA_vert:jp,distanceRGBA_frag:Qp,equirect_vert:tm,equirect_frag:em,linedashed_vert:nm,linedashed_frag:im,meshbasic_vert:sm,meshbasic_frag:rm,meshlambert_vert:om,meshlambert_frag:am,meshmatcap_vert:lm,meshmatcap_frag:cm,meshnormal_vert:hm,meshnormal_frag:um,meshphong_vert:dm,meshphong_frag:fm,meshphysical_vert:pm,meshphysical_frag:mm,meshtoon_vert:gm,meshtoon_frag:xm,points_vert:vm,points_frag:ym,shadow_vert:_m,shadow_frag:Mm,sprite_vert:bm,sprite_frag:wm},rt={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},En={basic:{uniforms:qe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:qe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new at(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:qe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:qe([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:qe([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new at(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:qe([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:qe([rt.points,rt.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:qe([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:qe([rt.common,rt.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:qe([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:qe([rt.sprite,rt.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:qe([rt.common,rt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:qe([rt.lights,rt.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};En.physical={uniforms:qe([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};var Sr={r:0,b:0,g:0},Ti=new an,Sm=new Yt;function Em(r,t,e,n,i,s,o){let a=new at(0),l=s===!0?0:1,c,h,u=null,d=0,p=null;function g(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?e:t).get(y)),y}function x(_){let y=!1,v=g(_);v===null?f(a,l):v&&v.isColor&&(f(v,1),y=!0);let M=r.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(_,y){let v=g(y);v&&(v.isCubeTexture||v.mapping===xo)?(h===void 0&&(h=new Nt(new Ui(1,1,1),new ze({name:"BackgroundCubeMaterial",uniforms:xs(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(M,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ti.copy(y.backgroundRotation),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Sm.makeRotationFromEuler(Ti)),h.material.toneMapped=te.getTransfer(v.colorSpace)!==ce,(u!==v||d!==v.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,p=r.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Nt(new ke(2,2),new ze({name:"BackgroundMaterial",uniforms:xs(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=te.getTransfer(v.colorSpace)!==ce,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||p!==r.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,p=r.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function f(_,y){_.getRGB(Sr,iu(r)),n.buffers.color.setClear(Sr.r,Sr.g,Sr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),l=y,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,f(a,l)},render:x,addToRenderList:m}}function Tm(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null),s=i,o=!1;function a(b,C,D,U,L){let H=!1,z=u(U,D,C);s!==z&&(s=z,c(s.object)),H=p(b,U,D,L),H&&g(b,U,D,L),L!==null&&t.update(L,r.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,v(b,C,D,U),L!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(L).buffer))}function l(){return r.createVertexArray()}function c(b){return r.bindVertexArray(b)}function h(b){return r.deleteVertexArray(b)}function u(b,C,D){let U=D.wireframe===!0,L=n[b.id];L===void 0&&(L={},n[b.id]=L);let H=L[C.id];H===void 0&&(H={},L[C.id]=H);let z=H[U];return z===void 0&&(z=d(l()),H[U]=z),z}function d(b){let C=[],D=[],U=[];for(let L=0;L<e;L++)C[L]=0,D[L]=0,U[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:D,attributeDivisors:U,object:b,attributes:{},index:null}}function p(b,C,D,U){let L=s.attributes,H=C.attributes,z=0,q=D.getAttributes();for(let N in q)if(q[N].location>=0){let j=L[N],it=H[N];if(it===void 0&&(N==="instanceMatrix"&&b.instanceMatrix&&(it=b.instanceMatrix),N==="instanceColor"&&b.instanceColor&&(it=b.instanceColor)),j===void 0||j.attribute!==it||it&&j.data!==it.data)return!0;z++}return s.attributesNum!==z||s.index!==U}function g(b,C,D,U){let L={},H=C.attributes,z=0,q=D.getAttributes();for(let N in q)if(q[N].location>=0){let j=H[N];j===void 0&&(N==="instanceMatrix"&&b.instanceMatrix&&(j=b.instanceMatrix),N==="instanceColor"&&b.instanceColor&&(j=b.instanceColor));let it={};it.attribute=j,j&&j.data&&(it.data=j.data),L[N]=it,z++}s.attributes=L,s.attributesNum=z,s.index=U}function x(){let b=s.newAttributes;for(let C=0,D=b.length;C<D;C++)b[C]=0}function m(b){f(b,0)}function f(b,C){let D=s.newAttributes,U=s.enabledAttributes,L=s.attributeDivisors;D[b]=1,U[b]===0&&(r.enableVertexAttribArray(b),U[b]=1),L[b]!==C&&(r.vertexAttribDivisor(b,C),L[b]=C)}function _(){let b=s.newAttributes,C=s.enabledAttributes;for(let D=0,U=C.length;D<U;D++)C[D]!==b[D]&&(r.disableVertexAttribArray(D),C[D]=0)}function y(b,C,D,U,L,H,z){z===!0?r.vertexAttribIPointer(b,C,D,L,H):r.vertexAttribPointer(b,C,D,U,L,H)}function v(b,C,D,U){x();let L=U.attributes,H=D.getAttributes(),z=C.defaultAttributeValues;for(let q in H){let N=H[q];if(N.location>=0){let Z=L[q];if(Z===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(Z=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(Z=b.instanceColor)),Z!==void 0){let j=Z.normalized,it=Z.itemSize,yt=t.get(Z);if(yt===void 0)continue;let Tt=yt.buffer,Y=yt.type,et=yt.bytesPerElement,pt=Y===r.INT||Y===r.UNSIGNED_INT||Z.gpuType===Ql;if(Z.isInterleavedBufferAttribute){let ot=Z.data,At=ot.stride,Dt=Z.offset;if(ot.isInstancedInterleavedBuffer){for(let Wt=0;Wt<N.locationSize;Wt++)f(N.location+Wt,ot.meshPerAttribute);b.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Wt=0;Wt<N.locationSize;Wt++)m(N.location+Wt);r.bindBuffer(r.ARRAY_BUFFER,Tt);for(let Wt=0;Wt<N.locationSize;Wt++)y(N.location+Wt,it/N.locationSize,Y,j,At*et,(Dt+it/N.locationSize*Wt)*et,pt)}else{if(Z.isInstancedBufferAttribute){for(let ot=0;ot<N.locationSize;ot++)f(N.location+ot,Z.meshPerAttribute);b.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ot=0;ot<N.locationSize;ot++)m(N.location+ot);r.bindBuffer(r.ARRAY_BUFFER,Tt);for(let ot=0;ot<N.locationSize;ot++)y(N.location+ot,it/N.locationSize,Y,j,it*et,it/N.locationSize*ot*et,pt)}}else if(z!==void 0){let j=z[q];if(j!==void 0)switch(j.length){case 2:r.vertexAttrib2fv(N.location,j);break;case 3:r.vertexAttrib3fv(N.location,j);break;case 4:r.vertexAttrib4fv(N.location,j);break;default:r.vertexAttrib1fv(N.location,j)}}}}_()}function M(){T();for(let b in n){let C=n[b];for(let D in C){let U=C[D];for(let L in U)h(U[L].object),delete U[L];delete C[D]}delete n[b]}}function S(b){if(n[b.id]===void 0)return;let C=n[b.id];for(let D in C){let U=C[D];for(let L in U)h(U[L].object),delete U[L];delete C[D]}delete n[b.id]}function A(b){for(let C in n){let D=n[C];if(D[b.id]===void 0)continue;let U=D[b.id];for(let L in U)h(U[L].object),delete U[L];delete D[b.id]}}function T(){w(),o=!0,s!==i&&(s=i,c(s.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:T,resetDefaultState:w,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function Am(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,d){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];e.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Rm(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==gn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let T=A===Zs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==qn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Rn&&!T)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),f=r.getParameter(r.MAX_VERTEX_ATTRIBS),_=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),M=g>0,S=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:M,maxSamples:S}}function Cm(r){let t=this,e=null,n=0,i=!1,s=!1,o=new Vn,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{let _=s?0:n,y=_*4,v=f.clippingState||null;l.value=v,v=h(g,d,y,p);for(let M=0;M!==y;++M)v[M]=e[M];f.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let f=p+x*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,v=p;y!==x;++y,v+=4)o.copy(u[y]).applyMatrix4(_,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Im(r){let t=new WeakMap;function e(o,a){return a===La?o.mapping=fs:a===Da&&(o.mapping=ps),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===La||a===Da)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new pl(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var Jr=class extends Zr{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ls=4,oh=[.125,.215,.35,.446,.526,.582],Ii=20,da=new Jr,ah=new at,fa=null,pa=0,ma=0,ga=!1,Ri=(1+Math.sqrt(5))/2,ns=1/Ri,lh=[new P(-Ri,ns,0),new P(Ri,ns,0),new P(-ns,0,Ri),new P(ns,0,Ri),new P(0,Ri,-ns),new P(0,Ri,ns),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Kr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){fa=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fa,pa,ma),this._renderer.xr.enabled=ga,t.scissorTest=!1,Er(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===fs||t.mapping===ps?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fa=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:An,minFilter:An,generateMipmaps:!1,type:Zs,format:gn,colorSpace:_s,depthBuffer:!1},i=ch(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ch(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Pm(s)),this._blurMaterial=Lm(s,t,e)}return i}_compileMaterial(t){let e=new Nt(this._lodPlanes[0],t);this._renderer.compile(e,da)}_sceneToCubeUV(t,e,n,i){let a=new Ye(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(ah),h.toneMapping=ui,h.autoClear=!1;let p=new Jn({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),g=new Nt(new Ui,p),x=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,x=!0):(p.color.copy(ah),x=!0);for(let f=0;f<6;f++){let _=f%3;_===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):_===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));let y=this._cubeSize;Er(i,_*y,f>2?y:0,y,y),h.setRenderTarget(i),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===fs||t.mapping===ps;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=uh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hh());let s=i?this._cubemapMaterial:this._equirectMaterial,o=new Nt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;let l=this._cubeSize;Er(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,da)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=lh[(i-s-1)%lh.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Nt(this._lodPlanes[i],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ii-1),x=s/g,m=isFinite(s)?1+Math.floor(h*x):Ii;m>Ii&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ii}`);let f=[],_=0;for(let A=0;A<Ii;++A){let T=A/x,w=Math.exp(-T*T/2);f.push(w),A===0?_+=w:A<m&&(_+=2*w)}for(let A=0;A<f.length;A++)f[A]=f[A]/_;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let v=this._sizeLods[i],M=3*v*(i>y-ls?i-y+ls:0),S=4*(this._cubeSize-v);Er(e,M,S,3*v,2*v),l.setRenderTarget(e),l.render(u,da)}};function Pm(r){let t=[],e=[],n=[],i=r,s=r-ls+1+oh.length;for(let o=0;o<s;o++){let a=Math.pow(2,i);e.push(a);let l=1/a;o>r-ls?l=oh[o-r+ls-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,x=3,m=2,f=1,_=new Float32Array(x*g*p),y=new Float32Array(m*g*p),v=new Float32Array(f*g*p);for(let S=0;S<p;S++){let A=S%3*2/3-1,T=S>2?0:-1,w=[A,T,0,A+2/3,T,0,A+2/3,T+1,0,A,T,0,A+2/3,T+1,0,A,T+1,0];_.set(w,x*g*S),y.set(d,m*g*S);let b=[S,S,S,S,S,S];v.set(b,f*g*S)}let M=new ge;M.setAttribute("position",new ie(_,x)),M.setAttribute("uv",new ie(y,m)),M.setAttribute("faceIndex",new ie(v,f)),t.push(M),i>ls&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ch(r,t,e){let n=new Yn(r,t,e);return n.texture.mapping=xo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Er(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Lm(r,t,e){let n=new Float32Array(Ii),i=new P(0,1,0);return new ze({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function hh(){return new ze({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oc(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function uh(){return new ze({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function oc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Dm(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===La||l===Da,h=l===fs||l===ps;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Kr(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new Kr(r)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Um(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Ns("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Nm(r,t,e,n){let i={},s=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,f=x.length;m<f;m++)t.remove(x[m])}d.removeEventListener("dispose",o),delete i[d.id];let p=s.get(d);p&&(t.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],r.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let x=p[g];for(let m=0,f=x.length;m<f;m++)t.update(x[m],r.ARRAY_BUFFER)}}function c(u){let d=[],p=u.index,g=u.attributes.position,x=0;if(p!==null){let _=p.array;x=p.version;for(let y=0,v=_.length;y<v;y+=3){let M=_[y+0],S=_[y+1],A=_[y+2];d.push(M,S,S,A,A,M)}}else if(g!==void 0){let _=g.array;x=g.version;for(let y=0,v=_.length/3-1;y<v;y+=3){let M=y+0,S=y+1,A=y+2;d.push(M,S,S,A,A,M)}}else return;let m=new(eu(d)?Yr:qr)(d,1);m.version=x;let f=s.get(u);f&&t.remove(f),s.set(u,m)}function h(u){let d=s.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Fm(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,p){r.drawElements(n,p,s,d*o),e.update(p,n,1)}function c(d,p,g){g!==0&&(r.drawElementsInstanced(n,p,s,d*o,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/o,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,d,0,x,0,g);let f=0;for(let _=0;_<g;_++)f+=p[_]*x[_];e.update(f,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Bm(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Om(r,t,e){let n=new WeakMap,i=new Se;function s(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let w=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],y=0;p===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let v=a.attributes.position.count*y,M=1;v>t.maxTextureSize&&(M=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let S=new Float32Array(v*M*4*u),A=new Xr(S,v,M,u);A.type=Rn,A.needsUpdate=!0;let T=y*4;for(let b=0;b<u;b++){let C=m[b],D=f[b],U=_[b],L=v*M*4*b;for(let H=0;H<C.count;H++){let z=H*T;p===!0&&(i.fromBufferAttribute(C,H),S[L+z+0]=i.x,S[L+z+1]=i.y,S[L+z+2]=i.z,S[L+z+3]=0),g===!0&&(i.fromBufferAttribute(D,H),S[L+z+4]=i.x,S[L+z+5]=i.y,S[L+z+6]=i.z,S[L+z+7]=0),x===!0&&(i.fromBufferAttribute(U,H),S[L+z+8]=i.x,S[L+z+9]=i.y,S[L+z+10]=i.z,S[L+z+11]=U.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new vt(v,M)},n.set(a,d),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function zm(r,t,e,n){let i=new WeakMap;function s(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}var jr=class extends Ke{constructor(t,e,n,i,s,o,a,l,c,h=cs){if(h!==cs&&h!==gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===cs&&(n=Di),n===void 0&&h===gs&&(n=ms),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:nn,this.minFilter=l!==void 0?l:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ru=new Ke,dh=new jr(1,1),ou=new Xr,au=new dl,lu=new $r,fh=[],ph=[],mh=new Float32Array(16),gh=new Float32Array(9),xh=new Float32Array(4);function bs(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=fh[i];if(s===void 0&&(s=new Float32Array(i),fh[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function Ce(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ie(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function yo(r,t){let e=ph[t];e===void 0&&(e=new Int32Array(t),ph[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function km(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Hm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;r.uniform2fv(this.addr,t),Ie(e,t)}}function Vm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;r.uniform3fv(this.addr,t),Ie(e,t)}}function Gm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;r.uniform4fv(this.addr,t),Ie(e,t)}}function Wm(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Ce(e,n))return;xh.set(n),r.uniformMatrix2fv(this.addr,!1,xh),Ie(e,n)}}function Xm(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Ce(e,n))return;gh.set(n),r.uniformMatrix3fv(this.addr,!1,gh),Ie(e,n)}}function qm(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Ce(e,n))return;mh.set(n),r.uniformMatrix4fv(this.addr,!1,mh),Ie(e,n)}}function Ym(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Zm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;r.uniform2iv(this.addr,t),Ie(e,t)}}function $m(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;r.uniform3iv(this.addr,t),Ie(e,t)}}function Jm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;r.uniform4iv(this.addr,t),Ie(e,t)}}function Km(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function jm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;r.uniform2uiv(this.addr,t),Ie(e,t)}}function Qm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;r.uniform3uiv(this.addr,t),Ie(e,t)}}function t0(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;r.uniform4uiv(this.addr,t),Ie(e,t)}}function e0(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(dh.compareFunction=tu,s=dh):s=ru,e.setTexture2D(t||s,i)}function n0(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||au,i)}function i0(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||lu,i)}function s0(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||ou,i)}function r0(r){switch(r){case 5126:return km;case 35664:return Hm;case 35665:return Vm;case 35666:return Gm;case 35674:return Wm;case 35675:return Xm;case 35676:return qm;case 5124:case 35670:return Ym;case 35667:case 35671:return Zm;case 35668:case 35672:return $m;case 35669:case 35673:return Jm;case 5125:return Km;case 36294:return jm;case 36295:return Qm;case 36296:return t0;case 35678:case 36198:case 36298:case 36306:case 35682:return e0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return s0}}function o0(r,t){r.uniform1fv(this.addr,t)}function a0(r,t){let e=bs(t,this.size,2);r.uniform2fv(this.addr,e)}function l0(r,t){let e=bs(t,this.size,3);r.uniform3fv(this.addr,e)}function c0(r,t){let e=bs(t,this.size,4);r.uniform4fv(this.addr,e)}function h0(r,t){let e=bs(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function u0(r,t){let e=bs(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function d0(r,t){let e=bs(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function f0(r,t){r.uniform1iv(this.addr,t)}function p0(r,t){r.uniform2iv(this.addr,t)}function m0(r,t){r.uniform3iv(this.addr,t)}function g0(r,t){r.uniform4iv(this.addr,t)}function x0(r,t){r.uniform1uiv(this.addr,t)}function v0(r,t){r.uniform2uiv(this.addr,t)}function y0(r,t){r.uniform3uiv(this.addr,t)}function _0(r,t){r.uniform4uiv(this.addr,t)}function M0(r,t,e){let n=this.cache,i=t.length,s=yo(e,i);Ce(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||ru,s[o])}function b0(r,t,e){let n=this.cache,i=t.length,s=yo(e,i);Ce(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||au,s[o])}function w0(r,t,e){let n=this.cache,i=t.length,s=yo(e,i);Ce(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||lu,s[o])}function S0(r,t,e){let n=this.cache,i=t.length,s=yo(e,i);Ce(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||ou,s[o])}function E0(r){switch(r){case 5126:return o0;case 35664:return a0;case 35665:return l0;case 35666:return c0;case 35674:return h0;case 35675:return u0;case 35676:return d0;case 5124:case 35670:return f0;case 35667:case 35671:return p0;case 35668:case 35672:return m0;case 35669:case 35673:return g0;case 5125:return x0;case 36294:return v0;case 36295:return y0;case 36296:return _0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return b0;case 35680:case 36300:case 36308:case 36293:return w0;case 36289:case 36303:case 36311:case 36292:return S0}}var ml=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=r0(e.type)}},gl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=E0(e.type)}},xl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let a=i[s];a.setValue(t,e[a.id],n)}}},xa=/(\w+)(\])?(\[|\.)?/g;function vh(r,t){r.seq.push(t),r.map[t.id]=t}function T0(r,t,e){let n=r.name,i=n.length;for(xa.lastIndex=0;;){let s=xa.exec(n),o=xa.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){vh(e,c===void 0?new ml(a,r,t):new gl(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new xl(a),vh(e,u)),e=u}}}var us=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);T0(s,o,this)}}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){let a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function yh(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var A0=37297,R0=0;function C0(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var _h=new Ht;function I0(r){te._getMatrix(_h,te.workingColorSpace,r);let t=`mat3( ${_h.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(r)){case vo:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Mh(r,t,e){let n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+C0(r.getShaderSource(t),o)}else return i}function P0(r,t){let e=I0(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function L0(r,t){let e;switch(t){case sd:e="Linear";break;case rd:e="Reinhard";break;case od:e="Cineon";break;case jl:e="ACESFilmic";break;case ld:e="AgX";break;case cd:e="Neutral";break;case ad:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Tr=new P;function D0(){te.getLuminanceCoefficients(Tr);let r=Tr.x.toFixed(4),t=Tr.y.toFixed(4),e=Tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function U0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function N0(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function F0(r,t){let e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),o=s.name,a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function Fs(r){return r!==""}function bh(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wh(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var B0=/^[ \t]*#include +<([\w\d./]+)>/gm;function vl(r){return r.replace(B0,z0)}var O0=new Map;function z0(r,t){let e=Ot[t];if(e===void 0){let n=O0.get(t);if(n!==void 0)e=Ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return vl(e)}var k0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sh(r){return r.replace(k0,H0)}function H0(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Eh(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function V0(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Hh?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Kl?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Hn&&(t="SHADOWMAP_TYPE_VSM"),t}function G0(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case fs:case ps:t="ENVMAP_TYPE_CUBE";break;case xo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function W0(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ps:t="ENVMAP_MODE_REFRACTION";break}return t}function X0(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Vh:t="ENVMAP_BLENDING_MULTIPLY";break;case nd:t="ENVMAP_BLENDING_MIX";break;case id:t="ENVMAP_BLENDING_ADD";break}return t}function q0(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Y0(r,t,e,n){let i=r.getContext(),s=e.defines,o=e.vertexShader,a=e.fragmentShader,l=V0(e),c=G0(e),h=W0(e),u=X0(e),d=q0(e),p=U0(e),g=N0(s),x=i.createProgram(),m,f,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Fs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Fs).join(`
`),f.length>0&&(f+=`
`)):(m=[Eh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),f=[Eh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ui?"#define TONE_MAPPING":"",e.toneMapping!==ui?Ot.tonemapping_pars_fragment:"",e.toneMapping!==ui?L0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,P0("linearToOutputTexel",e.outputColorSpace),D0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fs).join(`
`)),o=vl(o),o=bh(o,e),o=wh(o,e),a=vl(a),a=bh(a,e),a=wh(a,e),o=Sh(o),a=Sh(a),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===zc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===zc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let y=_+m+o,v=_+f+a,M=yh(i,i.VERTEX_SHADER,y),S=yh(i,i.FRAGMENT_SHADER,v);i.attachShader(x,M),i.attachShader(x,S),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function A(C){if(r.debug.checkShaderErrors){let D=i.getProgramInfoLog(x).trim(),U=i.getShaderInfoLog(M).trim(),L=i.getShaderInfoLog(S).trim(),H=!0,z=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(H=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,x,M,S);else{let q=Mh(i,M,"vertex"),N=Mh(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+D+`
`+q+`
`+N)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(U===""||L==="")&&(z=!1);z&&(C.diagnostics={runnable:H,programLog:D,vertexShader:{log:U,prefix:m},fragmentShader:{log:L,prefix:f}})}i.deleteShader(M),i.deleteShader(S),T=new us(i,x),w=F0(i,x)}let T;this.getUniforms=function(){return T===void 0&&A(this),T};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(x,A0)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=R0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=M,this.fragmentShader=S,this}var Z0=0,yl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new _l(t),e.set(t,n)),n}},_l=class{constructor(t){this.id=Z0++,this.code=t,this.usedTimes=0}};function $0(r,t,e,n,i,s,o){let a=new Vs,l=new yl,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,b,C,D,U){let L=D.fog,H=U.geometry,z=w.isMeshStandardMaterial?D.environment:null,q=(w.isMeshStandardMaterial?e:t).get(w.envMap||z),N=q&&q.mapping===xo?q.image.height:null,Z=g[w.type];w.precision!==null&&(p=i.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));let j=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,it=j!==void 0?j.length:0,yt=0;H.morphAttributes.position!==void 0&&(yt=1),H.morphAttributes.normal!==void 0&&(yt=2),H.morphAttributes.color!==void 0&&(yt=3);let Tt,Y,et,pt;if(Z){let ae=En[Z];Tt=ae.vertexShader,Y=ae.fragmentShader}else Tt=w.vertexShader,Y=w.fragmentShader,l.update(w),et=l.getVertexShaderID(w),pt=l.getFragmentShaderID(w);let ot=r.getRenderTarget(),At=r.state.buffers.depth.getReversed(),Dt=U.isInstancedMesh===!0,Wt=U.isBatchedMesh===!0,fe=!!w.map,jt=!!w.matcap,Ee=!!q,k=!!w.aoMap,sn=!!w.lightMap,$t=!!w.bumpMap,Jt=!!w.normalMap,Ct=!!w.displacementMap,xe=!!w.emissiveMap,Rt=!!w.metalnessMap,I=!!w.roughnessMap,E=w.anisotropy>0,V=w.clearcoat>0,J=w.dispersion>0,tt=w.iridescence>0,$=w.sheen>0,wt=w.transmission>0,ct=E&&!!w.anisotropyMap,mt=V&&!!w.clearcoatMap,Qt=V&&!!w.clearcoatNormalMap,nt=V&&!!w.clearcoatRoughnessMap,gt=tt&&!!w.iridescenceMap,It=tt&&!!w.iridescenceThicknessMap,Lt=$&&!!w.sheenColorMap,xt=$&&!!w.sheenRoughnessMap,Kt=!!w.specularMap,Vt=!!w.specularColorMap,pe=!!w.specularIntensityMap,F=wt&&!!w.transmissionMap,lt=wt&&!!w.thicknessMap,X=!!w.gradientMap,K=!!w.alphaMap,dt=w.alphaTest>0,ht=!!w.alphaHash,zt=!!w.extensions,we=ui;w.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(we=r.toneMapping);let He={shaderID:Z,shaderType:w.type,shaderName:w.name,vertexShader:Tt,fragmentShader:Y,defines:w.defines,customVertexShaderID:et,customFragmentShaderID:pt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:Wt,batchingColor:Wt&&U._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&U.instanceColor!==null,instancingMorph:Dt&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?r.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:_s,alphaToCoverage:!!w.alphaToCoverage,map:fe,matcap:jt,envMap:Ee,envMapMode:Ee&&q.mapping,envMapCubeUVHeight:N,aoMap:k,lightMap:sn,bumpMap:$t,normalMap:Jt,displacementMap:d&&Ct,emissiveMap:xe,normalMapObjectSpace:Jt&&w.normalMapType===fd,normalMapTangentSpace:Jt&&w.normalMapType===Qh,metalnessMap:Rt,roughnessMap:I,anisotropy:E,anisotropyMap:ct,clearcoat:V,clearcoatMap:mt,clearcoatNormalMap:Qt,clearcoatRoughnessMap:nt,dispersion:J,iridescence:tt,iridescenceMap:gt,iridescenceThicknessMap:It,sheen:$,sheenColorMap:Lt,sheenRoughnessMap:xt,specularMap:Kt,specularColorMap:Vt,specularIntensityMap:pe,transmission:wt,transmissionMap:F,thicknessMap:lt,gradientMap:X,opaque:w.transparent===!1&&w.blending===hi&&w.alphaToCoverage===!1,alphaMap:K,alphaTest:dt,alphaHash:ht,combine:w.combine,mapUv:fe&&x(w.map.channel),aoMapUv:k&&x(w.aoMap.channel),lightMapUv:sn&&x(w.lightMap.channel),bumpMapUv:$t&&x(w.bumpMap.channel),normalMapUv:Jt&&x(w.normalMap.channel),displacementMapUv:Ct&&x(w.displacementMap.channel),emissiveMapUv:xe&&x(w.emissiveMap.channel),metalnessMapUv:Rt&&x(w.metalnessMap.channel),roughnessMapUv:I&&x(w.roughnessMap.channel),anisotropyMapUv:ct&&x(w.anisotropyMap.channel),clearcoatMapUv:mt&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:Qt&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:It&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:xt&&x(w.sheenRoughnessMap.channel),specularMapUv:Kt&&x(w.specularMap.channel),specularColorMapUv:Vt&&x(w.specularColorMap.channel),specularIntensityMapUv:pe&&x(w.specularIntensityMap.channel),transmissionMapUv:F&&x(w.transmissionMap.channel),thicknessMapUv:lt&&x(w.thicknessMap.channel),alphaMapUv:K&&x(w.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Jt||E),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!H.attributes.uv&&(fe||K),fog:!!L,useFog:w.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:At,skinning:U.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:yt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:we,decodeVideoTexture:fe&&w.map.isVideoTexture===!0&&te.getTransfer(w.map.colorSpace)===ce,decodeVideoTextureEmissive:xe&&w.emissiveMap.isVideoTexture===!0&&te.getTransfer(w.emissiveMap.colorSpace)===ce,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===be,flipSided:w.side===We,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:zt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(zt&&w.extensions.multiDraw===!0||Wt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return He.vertexUv1s=c.has(1),He.vertexUv2s=c.has(2),He.vertexUv3s=c.has(3),c.clear(),He}function f(w){let b=[];if(w.shaderID?b.push(w.shaderID):(b.push(w.customVertexShaderID),b.push(w.customFragmentShaderID)),w.defines!==void 0)for(let C in w.defines)b.push(C),b.push(w.defines[C]);return w.isRawShaderMaterial===!1&&(_(b,w),y(b,w),b.push(r.outputColorSpace)),b.push(w.customProgramCacheKey),b.join()}function _(w,b){w.push(b.precision),w.push(b.outputColorSpace),w.push(b.envMapMode),w.push(b.envMapCubeUVHeight),w.push(b.mapUv),w.push(b.alphaMapUv),w.push(b.lightMapUv),w.push(b.aoMapUv),w.push(b.bumpMapUv),w.push(b.normalMapUv),w.push(b.displacementMapUv),w.push(b.emissiveMapUv),w.push(b.metalnessMapUv),w.push(b.roughnessMapUv),w.push(b.anisotropyMapUv),w.push(b.clearcoatMapUv),w.push(b.clearcoatNormalMapUv),w.push(b.clearcoatRoughnessMapUv),w.push(b.iridescenceMapUv),w.push(b.iridescenceThicknessMapUv),w.push(b.sheenColorMapUv),w.push(b.sheenRoughnessMapUv),w.push(b.specularMapUv),w.push(b.specularColorMapUv),w.push(b.specularIntensityMapUv),w.push(b.transmissionMapUv),w.push(b.thicknessMapUv),w.push(b.combine),w.push(b.fogExp2),w.push(b.sizeAttenuation),w.push(b.morphTargetsCount),w.push(b.morphAttributeCount),w.push(b.numDirLights),w.push(b.numPointLights),w.push(b.numSpotLights),w.push(b.numSpotLightMaps),w.push(b.numHemiLights),w.push(b.numRectAreaLights),w.push(b.numDirLightShadows),w.push(b.numPointLightShadows),w.push(b.numSpotLightShadows),w.push(b.numSpotLightShadowsWithMaps),w.push(b.numLightProbes),w.push(b.shadowMapType),w.push(b.toneMapping),w.push(b.numClippingPlanes),w.push(b.numClipIntersection),w.push(b.depthPacking)}function y(w,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),w.push(a.mask)}function v(w){let b=g[w.type],C;if(b){let D=En[b];C=Ms.clone(D.uniforms)}else C=w.uniforms;return C}function M(w,b){let C;for(let D=0,U=h.length;D<U;D++){let L=h[D];if(L.cacheKey===b){C=L,++C.usedTimes;break}}return C===void 0&&(C=new Y0(r,b,w,s),h.push(C)),C}function S(w){if(--w.usedTimes===0){let b=h.indexOf(w);h[b]=h[h.length-1],h.pop(),w.destroy()}}function A(w){l.remove(w)}function T(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:M,releaseProgram:S,releaseShaderCache:A,programs:h,dispose:T}}function J0(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function K0(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Th(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Ah(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,p,g,x,m){let f=r[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},r[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=x,f.group=m),t++,f}function a(u,d,p,g,x,m){let f=o(u,d,p,g,x,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function l(u,d,p,g,x,m){let f=o(u,d,p,g,x,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||K0),n.length>1&&n.sort(d||Th),i.length>1&&i.sort(d||Th)}function h(){for(let u=t,d=r.length;u<d;u++){let p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function j0(){let r=new WeakMap;function t(n,i){let s=r.get(n),o;return s===void 0?(o=new Ah,r.set(n,[o])):i>=s.length?(o=new Ah,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function Q0(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new at};break;case"SpotLight":e={position:new P,direction:new P,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new at,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new at,groundColor:new at};break;case"RectAreaLight":e={color:new at,position:new P,halfWidth:new P,halfHeight:new P};break}return r[t.id]=e,e}}}function tg(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var eg=0;function ng(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function ig(r){let t=new Q0,e=tg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let i=new P,s=new Yt,o=new Yt;function a(c){let h=0,u=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,_=0,y=0,v=0,M=0,S=0,A=0;c.sort(ng);for(let w=0,b=c.length;w<b;w++){let C=c[w],D=C.color,U=C.intensity,L=C.distance,H=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=D.r*U,u+=D.g*U,d+=D.b*U;else if(C.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(C.sh.coefficients[z],U);A++}else if(C.isDirectionalLight){let z=t.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let q=C.shadow,N=e.get(C);N.shadowIntensity=q.intensity,N.shadowBias=q.bias,N.shadowNormalBias=q.normalBias,N.shadowRadius=q.radius,N.shadowMapSize=q.mapSize,n.directionalShadow[p]=N,n.directionalShadowMap[p]=H,n.directionalShadowMatrix[p]=C.shadow.matrix,_++}n.directional[p]=z,p++}else if(C.isSpotLight){let z=t.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(D).multiplyScalar(U),z.distance=L,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,n.spot[x]=z;let q=C.shadow;if(C.map&&(n.spotLightMap[M]=C.map,M++,q.updateMatrices(C),C.castShadow&&S++),n.spotLightMatrix[x]=q.matrix,C.castShadow){let N=e.get(C);N.shadowIntensity=q.intensity,N.shadowBias=q.bias,N.shadowNormalBias=q.normalBias,N.shadowRadius=q.radius,N.shadowMapSize=q.mapSize,n.spotShadow[x]=N,n.spotShadowMap[x]=H,v++}x++}else if(C.isRectAreaLight){let z=t.get(C);z.color.copy(D).multiplyScalar(U),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=z,m++}else if(C.isPointLight){let z=t.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){let q=C.shadow,N=e.get(C);N.shadowIntensity=q.intensity,N.shadowBias=q.bias,N.shadowNormalBias=q.normalBias,N.shadowRadius=q.radius,N.shadowMapSize=q.mapSize,N.shadowCameraNear=q.camera.near,N.shadowCameraFar=q.camera.far,n.pointShadow[g]=N,n.pointShadowMap[g]=H,n.pointShadowMatrix[g]=C.shadow.matrix,y++}n.point[g]=z,g++}else if(C.isHemisphereLight){let z=t.get(C);z.skyColor.copy(C.color).multiplyScalar(U),z.groundColor.copy(C.groundColor).multiplyScalar(U),n.hemi[f]=z,f++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let T=n.hash;(T.directionalLength!==p||T.pointLength!==g||T.spotLength!==x||T.rectAreaLength!==m||T.hemiLength!==f||T.numDirectionalShadows!==_||T.numPointShadows!==y||T.numSpotShadows!==v||T.numSpotMaps!==M||T.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+M-S,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,T.directionalLength=p,T.pointLength=g,T.spotLength=x,T.rectAreaLength=m,T.hemiLength=f,T.numDirectionalShadows=_,T.numPointShadows=y,T.numSpotShadows=v,T.numSpotMaps=M,T.numLightProbes=A,n.version=eg++)}function l(c,h){let u=0,d=0,p=0,g=0,x=0,m=h.matrixWorldInverse;for(let f=0,_=c.length;f<_;f++){let y=c[f];if(y.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),u++}else if(y.isSpotLight){let v=n.spot[p];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),p++}else if(y.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function Rh(r){let t=new ig(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function sg(r){let t=new WeakMap;function e(i,s=0){let o=t.get(i),a;return o===void 0?(a=new Rh(r),t.set(i,[a])):s>=o.length?(a=new Rh(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Ml=class extends $n{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ud,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},bl=class extends $n{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},rg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,og=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ag(r,t,e){let n=new Gs,i=new vt,s=new vt,o=new Se,a=new Ml({depthPacking:dd}),l=new bl,c={},h=e.maxTextureSize,u={[fi]:We,[We]:fi,[be]:be},d=new ze({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:rg,fragmentShader:og}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new ge;g.setAttribute("position",new ie(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Nt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hh;let f=this.type;this.render=function(S,A,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;let w=r.getRenderTarget(),b=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),D=r.state;D.setBlending(ci),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let U=f!==Hn&&this.type===Hn,L=f===Hn&&this.type!==Hn;for(let H=0,z=S.length;H<z;H++){let q=S[H],N=q.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;i.copy(N.mapSize);let Z=N.getFrameExtents();if(i.multiply(Z),s.copy(N.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Z.x),i.x=s.x*Z.x,N.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Z.y),i.y=s.y*Z.y,N.mapSize.y=s.y)),N.map===null||U===!0||L===!0){let it=this.type!==Hn?{minFilter:nn,magFilter:nn}:{};N.map!==null&&N.map.dispose(),N.map=new Yn(i.x,i.y,it),N.map.texture.name=q.name+".shadowMap",N.camera.updateProjectionMatrix()}r.setRenderTarget(N.map),r.clear();let j=N.getViewportCount();for(let it=0;it<j;it++){let yt=N.getViewport(it);o.set(s.x*yt.x,s.y*yt.y,s.x*yt.z,s.y*yt.w),D.viewport(o),N.updateMatrices(q,it),n=N.getFrustum(),v(A,T,N.camera,q,this.type)}N.isPointLightShadow!==!0&&this.type===Hn&&_(N,T),N.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(w,b,C)};function _(S,A){let T=t.update(x);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Yn(i.x,i.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(A,null,T,d,x,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(A,null,T,p,x,null)}function y(S,A,T,w){let b=null,C=T.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)b=C;else if(b=T.isPointLight===!0?l:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let D=b.uuid,U=A.uuid,L=c[D];L===void 0&&(L={},c[D]=L);let H=L[U];H===void 0&&(H=b.clone(),L[U]=H,A.addEventListener("dispose",M)),b=H}if(b.visible=A.visible,b.wireframe=A.wireframe,w===Hn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:u[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,T.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let D=r.properties.get(b);D.light=T}return b}function v(S,A,T,w,b){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&b===Hn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,S.matrixWorld);let U=t.update(S),L=S.material;if(Array.isArray(L)){let H=U.groups;for(let z=0,q=H.length;z<q;z++){let N=H[z],Z=L[N.materialIndex];if(Z&&Z.visible){let j=y(S,Z,w,b);S.onBeforeShadow(r,S,A,T,U,j,N),r.renderBufferDirect(T,null,U,j,S,N),S.onAfterShadow(r,S,A,T,U,j,N)}}}else if(L.visible){let H=y(S,L,w,b);S.onBeforeShadow(r,S,A,T,U,H,null),r.renderBufferDirect(T,null,U,H,S,null),S.onAfterShadow(r,S,A,T,U,H,null)}}let D=S.children;for(let U=0,L=D.length;U<L;U++)v(D[U],A,T,w,b)}function M(S){S.target.removeEventListener("dispose",M);for(let T in c){let w=c[T],b=S.target.uuid;b in w&&(w[b].dispose(),delete w[b])}}}var lg={[Ea]:Ta,[Aa]:Ia,[Ra]:Pa,[ds]:Ca,[Ta]:Ea,[Ia]:Aa,[Pa]:Ra,[Ca]:ds};function cg(r,t){function e(){let F=!1,lt=new Se,X=null,K=new Se(0,0,0,0);return{setMask:function(dt){X!==dt&&!F&&(r.colorMask(dt,dt,dt,dt),X=dt)},setLocked:function(dt){F=dt},setClear:function(dt,ht,zt,we,He){He===!0&&(dt*=we,ht*=we,zt*=we),lt.set(dt,ht,zt,we),K.equals(lt)===!1&&(r.clearColor(dt,ht,zt,we),K.copy(lt))},reset:function(){F=!1,X=null,K.set(-1,0,0,0)}}}function n(){let F=!1,lt=!1,X=null,K=null,dt=null;return{setReversed:function(ht){if(lt!==ht){let zt=t.get("EXT_clip_control");lt?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT);let we=dt;dt=null,this.setClear(we)}lt=ht},getReversed:function(){return lt},setTest:function(ht){ht?ot(r.DEPTH_TEST):At(r.DEPTH_TEST)},setMask:function(ht){X!==ht&&!F&&(r.depthMask(ht),X=ht)},setFunc:function(ht){if(lt&&(ht=lg[ht]),K!==ht){switch(ht){case Ea:r.depthFunc(r.NEVER);break;case Ta:r.depthFunc(r.ALWAYS);break;case Aa:r.depthFunc(r.LESS);break;case ds:r.depthFunc(r.LEQUAL);break;case Ra:r.depthFunc(r.EQUAL);break;case Ca:r.depthFunc(r.GEQUAL);break;case Ia:r.depthFunc(r.GREATER);break;case Pa:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}K=ht}},setLocked:function(ht){F=ht},setClear:function(ht){dt!==ht&&(lt&&(ht=1-ht),r.clearDepth(ht),dt=ht)},reset:function(){F=!1,X=null,K=null,dt=null,lt=!1}}}function i(){let F=!1,lt=null,X=null,K=null,dt=null,ht=null,zt=null,we=null,He=null;return{setTest:function(ae){F||(ae?ot(r.STENCIL_TEST):At(r.STENCIL_TEST))},setMask:function(ae){lt!==ae&&!F&&(r.stencilMask(ae),lt=ae)},setFunc:function(ae,un,Ln){(X!==ae||K!==un||dt!==Ln)&&(r.stencilFunc(ae,un,Ln),X=ae,K=un,dt=Ln)},setOp:function(ae,un,Ln){(ht!==ae||zt!==un||we!==Ln)&&(r.stencilOp(ae,un,Ln),ht=ae,zt=un,we=Ln)},setLocked:function(ae){F=ae},setClear:function(ae){He!==ae&&(r.clearStencil(ae),He=ae)},reset:function(){F=!1,lt=null,X=null,K=null,dt=null,ht=null,zt=null,we=null,He=null}}}let s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,_=null,y=null,v=null,M=null,S=null,A=new at(0,0,0),T=0,w=!1,b=null,C=null,D=null,U=null,L=null,H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,q=0,N=r.getParameter(r.VERSION);N.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(N)[1]),z=q>=1):N.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),z=q>=2);let Z=null,j={},it=r.getParameter(r.SCISSOR_BOX),yt=r.getParameter(r.VIEWPORT),Tt=new Se().fromArray(it),Y=new Se().fromArray(yt);function et(F,lt,X,K){let dt=new Uint8Array(4),ht=r.createTexture();r.bindTexture(F,ht),r.texParameteri(F,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(F,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let zt=0;zt<X;zt++)F===r.TEXTURE_3D||F===r.TEXTURE_2D_ARRAY?r.texImage3D(lt,0,r.RGBA,1,1,K,0,r.RGBA,r.UNSIGNED_BYTE,dt):r.texImage2D(lt+zt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,dt);return ht}let pt={};pt[r.TEXTURE_2D]=et(r.TEXTURE_2D,r.TEXTURE_2D,1),pt[r.TEXTURE_CUBE_MAP]=et(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),pt[r.TEXTURE_2D_ARRAY]=et(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),pt[r.TEXTURE_3D]=et(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(r.DEPTH_TEST),o.setFunc(ds),$t(!1),Jt(Lc),ot(r.CULL_FACE),k(ci);function ot(F){h[F]!==!0&&(r.enable(F),h[F]=!0)}function At(F){h[F]!==!1&&(r.disable(F),h[F]=!1)}function Dt(F,lt){return u[F]!==lt?(r.bindFramebuffer(F,lt),u[F]=lt,F===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=lt),F===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=lt),!0):!1}function Wt(F,lt){let X=p,K=!1;if(F){X=d.get(lt),X===void 0&&(X=[],d.set(lt,X));let dt=F.textures;if(X.length!==dt.length||X[0]!==r.COLOR_ATTACHMENT0){for(let ht=0,zt=dt.length;ht<zt;ht++)X[ht]=r.COLOR_ATTACHMENT0+ht;X.length=dt.length,K=!0}}else X[0]!==r.BACK&&(X[0]=r.BACK,K=!0);K&&r.drawBuffers(X)}function fe(F){return g!==F?(r.useProgram(F),g=F,!0):!1}let jt={[Ci]:r.FUNC_ADD,[zu]:r.FUNC_SUBTRACT,[ku]:r.FUNC_REVERSE_SUBTRACT};jt[Hu]=r.MIN,jt[Vu]=r.MAX;let Ee={[Gu]:r.ZERO,[Wu]:r.ONE,[Xu]:r.SRC_COLOR,[wa]:r.SRC_ALPHA,[Ku]:r.SRC_ALPHA_SATURATE,[$u]:r.DST_COLOR,[Yu]:r.DST_ALPHA,[qu]:r.ONE_MINUS_SRC_COLOR,[Sa]:r.ONE_MINUS_SRC_ALPHA,[Ju]:r.ONE_MINUS_DST_COLOR,[Zu]:r.ONE_MINUS_DST_ALPHA,[ju]:r.CONSTANT_COLOR,[Qu]:r.ONE_MINUS_CONSTANT_COLOR,[td]:r.CONSTANT_ALPHA,[ed]:r.ONE_MINUS_CONSTANT_ALPHA};function k(F,lt,X,K,dt,ht,zt,we,He,ae){if(F===ci){x===!0&&(At(r.BLEND),x=!1);return}if(x===!1&&(ot(r.BLEND),x=!0),F!==Ou){if(F!==m||ae!==w){if((f!==Ci||v!==Ci)&&(r.blendEquation(r.FUNC_ADD),f=Ci,v=Ci),ae)switch(F){case hi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case kr:r.blendFunc(r.ONE,r.ONE);break;case Dc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Uc:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case hi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case kr:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Dc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Uc:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}_=null,y=null,M=null,S=null,A.set(0,0,0),T=0,m=F,w=ae}return}dt=dt||lt,ht=ht||X,zt=zt||K,(lt!==f||dt!==v)&&(r.blendEquationSeparate(jt[lt],jt[dt]),f=lt,v=dt),(X!==_||K!==y||ht!==M||zt!==S)&&(r.blendFuncSeparate(Ee[X],Ee[K],Ee[ht],Ee[zt]),_=X,y=K,M=ht,S=zt),(we.equals(A)===!1||He!==T)&&(r.blendColor(we.r,we.g,we.b,He),A.copy(we),T=He),m=F,w=!1}function sn(F,lt){F.side===be?At(r.CULL_FACE):ot(r.CULL_FACE);let X=F.side===We;lt&&(X=!X),$t(X),F.blending===hi&&F.transparent===!1?k(ci):k(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),s.setMask(F.colorWrite);let K=F.stencilWrite;a.setTest(K),K&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),xe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ot(r.SAMPLE_ALPHA_TO_COVERAGE):At(r.SAMPLE_ALPHA_TO_COVERAGE)}function $t(F){b!==F&&(F?r.frontFace(r.CW):r.frontFace(r.CCW),b=F)}function Jt(F){F!==Fu?(ot(r.CULL_FACE),F!==C&&(F===Lc?r.cullFace(r.BACK):F===Bu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):At(r.CULL_FACE),C=F}function Ct(F){F!==D&&(z&&r.lineWidth(F),D=F)}function xe(F,lt,X){F?(ot(r.POLYGON_OFFSET_FILL),(U!==lt||L!==X)&&(r.polygonOffset(lt,X),U=lt,L=X)):At(r.POLYGON_OFFSET_FILL)}function Rt(F){F?ot(r.SCISSOR_TEST):At(r.SCISSOR_TEST)}function I(F){F===void 0&&(F=r.TEXTURE0+H-1),Z!==F&&(r.activeTexture(F),Z=F)}function E(F,lt,X){X===void 0&&(Z===null?X=r.TEXTURE0+H-1:X=Z);let K=j[X];K===void 0&&(K={type:void 0,texture:void 0},j[X]=K),(K.type!==F||K.texture!==lt)&&(Z!==X&&(r.activeTexture(X),Z=X),r.bindTexture(F,lt||pt[F]),K.type=F,K.texture=lt)}function V(){let F=j[Z];F!==void 0&&F.type!==void 0&&(r.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function J(){try{r.compressedTexImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function tt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function $(){try{r.texSubImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function wt(){try{r.texSubImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ct(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function mt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Qt(){try{r.texStorage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function nt(){try{r.texStorage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function gt(){try{r.texImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function It(){try{r.texImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Lt(F){Tt.equals(F)===!1&&(r.scissor(F.x,F.y,F.z,F.w),Tt.copy(F))}function xt(F){Y.equals(F)===!1&&(r.viewport(F.x,F.y,F.z,F.w),Y.copy(F))}function Kt(F,lt){let X=c.get(lt);X===void 0&&(X=new WeakMap,c.set(lt,X));let K=X.get(F);K===void 0&&(K=r.getUniformBlockIndex(lt,F.name),X.set(F,K))}function Vt(F,lt){let K=c.get(lt).get(F);l.get(lt)!==K&&(r.uniformBlockBinding(lt,K,F.__bindingPointIndex),l.set(lt,K))}function pe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},Z=null,j={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,_=null,y=null,v=null,M=null,S=null,A=new at(0,0,0),T=0,w=!1,b=null,C=null,D=null,U=null,L=null,Tt.set(0,0,r.canvas.width,r.canvas.height),Y.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ot,disable:At,bindFramebuffer:Dt,drawBuffers:Wt,useProgram:fe,setBlending:k,setMaterial:sn,setFlipSided:$t,setCullFace:Jt,setLineWidth:Ct,setPolygonOffset:xe,setScissorTest:Rt,activeTexture:I,bindTexture:E,unbindTexture:V,compressedTexImage2D:J,compressedTexImage3D:tt,texImage2D:gt,texImage3D:It,updateUBOMapping:Kt,uniformBlockBinding:Vt,texStorage2D:Qt,texStorage3D:nt,texSubImage2D:$,texSubImage3D:wt,compressedTexSubImage2D:ct,compressedTexSubImage3D:mt,scissor:Lt,viewport:xt,reset:pe}}function Ch(r,t,e,n){let i=hg(n);switch(e){case Yh:return r*t;case $h:return r*t;case Jh:return r*t*2;case nc:return r*t/i.components*i.byteLength;case ic:return r*t/i.components*i.byteLength;case Kh:return r*t*2/i.components*i.byteLength;case sc:return r*t*2/i.components*i.byteLength;case Zh:return r*t*3/i.components*i.byteLength;case gn:return r*t*4/i.components*i.byteLength;case rc:return r*t*4/i.components*i.byteLength;case Nr:case Fr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Br:case Or:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Fa:case Oa:return Math.max(r,16)*Math.max(t,8)/4;case Na:case Ba:return Math.max(r,8)*Math.max(t,8)/2;case za:case ka:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ha:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Va:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ga:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Wa:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case qa:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Ya:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Za:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case $a:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Ja:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case ja:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Qa:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case tl:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case el:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case zr:case nl:case il:return Math.ceil(r/4)*Math.ceil(t/4)*16;case jh:case sl:return Math.ceil(r/4)*Math.ceil(t/4)*8;case rl:case ol:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function hg(r){switch(r){case qn:case Wh:return{byteLength:1,components:1};case ks:case Xh:case Zs:return{byteLength:2,components:1};case tc:case ec:return{byteLength:2,components:4};case Di:case Ql:case Rn:return{byteLength:4,components:1};case qh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function ug(r,t,e,n,i,s,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new vt,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,E){return p?new OffscreenCanvas(I,E):Gr("canvas")}function x(I,E,V){let J=1,tt=Rt(I);if((tt.width>V||tt.height>V)&&(J=V/Math.max(tt.width,tt.height)),J<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let $=Math.floor(J*tt.width),wt=Math.floor(J*tt.height);u===void 0&&(u=g($,wt));let ct=E?g($,wt):u;return ct.width=$,ct.height=wt,ct.getContext("2d").drawImage(I,0,0,$,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+$+"x"+wt+")."),ct}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),I;return I}function m(I){return I.generateMipmaps}function f(I){r.generateMipmap(I)}function _(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(I,E,V,J,tt=!1){if(I!==null){if(r[I]!==void 0)return r[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let $=E;if(E===r.RED&&(V===r.FLOAT&&($=r.R32F),V===r.HALF_FLOAT&&($=r.R16F),V===r.UNSIGNED_BYTE&&($=r.R8)),E===r.RED_INTEGER&&(V===r.UNSIGNED_BYTE&&($=r.R8UI),V===r.UNSIGNED_SHORT&&($=r.R16UI),V===r.UNSIGNED_INT&&($=r.R32UI),V===r.BYTE&&($=r.R8I),V===r.SHORT&&($=r.R16I),V===r.INT&&($=r.R32I)),E===r.RG&&(V===r.FLOAT&&($=r.RG32F),V===r.HALF_FLOAT&&($=r.RG16F),V===r.UNSIGNED_BYTE&&($=r.RG8)),E===r.RG_INTEGER&&(V===r.UNSIGNED_BYTE&&($=r.RG8UI),V===r.UNSIGNED_SHORT&&($=r.RG16UI),V===r.UNSIGNED_INT&&($=r.RG32UI),V===r.BYTE&&($=r.RG8I),V===r.SHORT&&($=r.RG16I),V===r.INT&&($=r.RG32I)),E===r.RGB_INTEGER&&(V===r.UNSIGNED_BYTE&&($=r.RGB8UI),V===r.UNSIGNED_SHORT&&($=r.RGB16UI),V===r.UNSIGNED_INT&&($=r.RGB32UI),V===r.BYTE&&($=r.RGB8I),V===r.SHORT&&($=r.RGB16I),V===r.INT&&($=r.RGB32I)),E===r.RGBA_INTEGER&&(V===r.UNSIGNED_BYTE&&($=r.RGBA8UI),V===r.UNSIGNED_SHORT&&($=r.RGBA16UI),V===r.UNSIGNED_INT&&($=r.RGBA32UI),V===r.BYTE&&($=r.RGBA8I),V===r.SHORT&&($=r.RGBA16I),V===r.INT&&($=r.RGBA32I)),E===r.RGB&&V===r.UNSIGNED_INT_5_9_9_9_REV&&($=r.RGB9_E5),E===r.RGBA){let wt=tt?vo:te.getTransfer(J);V===r.FLOAT&&($=r.RGBA32F),V===r.HALF_FLOAT&&($=r.RGBA16F),V===r.UNSIGNED_BYTE&&($=wt===ce?r.SRGB8_ALPHA8:r.RGBA8),V===r.UNSIGNED_SHORT_4_4_4_4&&($=r.RGBA4),V===r.UNSIGNED_SHORT_5_5_5_1&&($=r.RGB5_A1)}return($===r.R16F||$===r.R32F||$===r.RG16F||$===r.RG32F||$===r.RGBA16F||$===r.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function v(I,E){let V;return I?E===null||E===Di||E===ms?V=r.DEPTH24_STENCIL8:E===Rn?V=r.DEPTH32F_STENCIL8:E===ks&&(V=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Di||E===ms?V=r.DEPTH_COMPONENT24:E===Rn?V=r.DEPTH_COMPONENT32F:E===ks&&(V=r.DEPTH_COMPONENT16),V}function M(I,E){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==nn&&I.minFilter!==An?Math.log2(Math.max(E.width,E.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?E.mipmaps.length:1}function S(I){let E=I.target;E.removeEventListener("dispose",S),T(E),E.isVideoTexture&&h.delete(E)}function A(I){let E=I.target;E.removeEventListener("dispose",A),b(E)}function T(I){let E=n.get(I);if(E.__webglInit===void 0)return;let V=I.source,J=d.get(V);if(J){let tt=J[E.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&w(I),Object.keys(J).length===0&&d.delete(V)}n.remove(I)}function w(I){let E=n.get(I);r.deleteTexture(E.__webglTexture);let V=I.source,J=d.get(V);delete J[E.__cacheKey],o.memory.textures--}function b(I){let E=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let tt=0;tt<E.__webglFramebuffer[J].length;tt++)r.deleteFramebuffer(E.__webglFramebuffer[J][tt]);else r.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)r.deleteFramebuffer(E.__webglFramebuffer[J]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let V=I.textures;for(let J=0,tt=V.length;J<tt;J++){let $=n.get(V[J]);$.__webglTexture&&(r.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(V[J])}n.remove(I)}let C=0;function D(){C=0}function U(){let I=C;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),C+=1,I}function L(I){let E=[];return E.push(I.wrapS),E.push(I.wrapT),E.push(I.wrapR||0),E.push(I.magFilter),E.push(I.minFilter),E.push(I.anisotropy),E.push(I.internalFormat),E.push(I.format),E.push(I.type),E.push(I.generateMipmaps),E.push(I.premultiplyAlpha),E.push(I.flipY),E.push(I.unpackAlignment),E.push(I.colorSpace),E.join()}function H(I,E){let V=n.get(I);if(I.isVideoTexture&&Ct(I),I.isRenderTargetTexture===!1&&I.version>0&&V.__version!==I.version){let J=I.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(V,I,E);return}}e.bindTexture(r.TEXTURE_2D,V.__webglTexture,r.TEXTURE0+E)}function z(I,E){let V=n.get(I);if(I.version>0&&V.__version!==I.version){Y(V,I,E);return}e.bindTexture(r.TEXTURE_2D_ARRAY,V.__webglTexture,r.TEXTURE0+E)}function q(I,E){let V=n.get(I);if(I.version>0&&V.__version!==I.version){Y(V,I,E);return}e.bindTexture(r.TEXTURE_3D,V.__webglTexture,r.TEXTURE0+E)}function N(I,E){let V=n.get(I);if(I.version>0&&V.__version!==I.version){et(V,I,E);return}e.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+E)}let Z={[Xn]:r.REPEAT,[Pi]:r.CLAMP_TO_EDGE,[Ua]:r.MIRRORED_REPEAT},j={[nn]:r.NEAREST,[hd]:r.NEAREST_MIPMAP_NEAREST,[or]:r.NEAREST_MIPMAP_LINEAR,[An]:r.LINEAR,[Vo]:r.LINEAR_MIPMAP_NEAREST,[Li]:r.LINEAR_MIPMAP_LINEAR},it={[pd]:r.NEVER,[_d]:r.ALWAYS,[md]:r.LESS,[tu]:r.LEQUAL,[gd]:r.EQUAL,[yd]:r.GEQUAL,[xd]:r.GREATER,[vd]:r.NOTEQUAL};function yt(I,E){if(E.type===Rn&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===An||E.magFilter===Vo||E.magFilter===or||E.magFilter===Li||E.minFilter===An||E.minFilter===Vo||E.minFilter===or||E.minFilter===Li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,Z[E.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,Z[E.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,Z[E.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,j[E.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,j[E.minFilter]),E.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,it[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===nn||E.minFilter!==or&&E.minFilter!==Li||E.type===Rn&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let V=t.get("EXT_texture_filter_anisotropic");r.texParameterf(I,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Tt(I,E){let V=!1;I.__webglInit===void 0&&(I.__webglInit=!0,E.addEventListener("dispose",S));let J=E.source,tt=d.get(J);tt===void 0&&(tt={},d.set(J,tt));let $=L(E);if($!==I.__cacheKey){tt[$]===void 0&&(tt[$]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,V=!0),tt[$].usedTimes++;let wt=tt[I.__cacheKey];wt!==void 0&&(tt[I.__cacheKey].usedTimes--,wt.usedTimes===0&&w(E)),I.__cacheKey=$,I.__webglTexture=tt[$].texture}return V}function Y(I,E,V){let J=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=r.TEXTURE_3D);let tt=Tt(I,E),$=E.source;e.bindTexture(J,I.__webglTexture,r.TEXTURE0+V);let wt=n.get($);if($.version!==wt.__version||tt===!0){e.activeTexture(r.TEXTURE0+V);let ct=te.getPrimaries(te.workingColorSpace),mt=E.colorSpace===ai?null:te.getPrimaries(E.colorSpace),Qt=E.colorSpace===ai||ct===mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qt);let nt=x(E.image,!1,i.maxTextureSize);nt=xe(E,nt);let gt=s.convert(E.format,E.colorSpace),It=s.convert(E.type),Lt=y(E.internalFormat,gt,It,E.colorSpace,E.isVideoTexture);yt(J,E);let xt,Kt=E.mipmaps,Vt=E.isVideoTexture!==!0,pe=wt.__version===void 0||tt===!0,F=$.dataReady,lt=M(E,nt);if(E.isDepthTexture)Lt=v(E.format===gs,E.type),pe&&(Vt?e.texStorage2D(r.TEXTURE_2D,1,Lt,nt.width,nt.height):e.texImage2D(r.TEXTURE_2D,0,Lt,nt.width,nt.height,0,gt,It,null));else if(E.isDataTexture)if(Kt.length>0){Vt&&pe&&e.texStorage2D(r.TEXTURE_2D,lt,Lt,Kt[0].width,Kt[0].height);for(let X=0,K=Kt.length;X<K;X++)xt=Kt[X],Vt?F&&e.texSubImage2D(r.TEXTURE_2D,X,0,0,xt.width,xt.height,gt,It,xt.data):e.texImage2D(r.TEXTURE_2D,X,Lt,xt.width,xt.height,0,gt,It,xt.data);E.generateMipmaps=!1}else Vt?(pe&&e.texStorage2D(r.TEXTURE_2D,lt,Lt,nt.width,nt.height),F&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,nt.width,nt.height,gt,It,nt.data)):e.texImage2D(r.TEXTURE_2D,0,Lt,nt.width,nt.height,0,gt,It,nt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Vt&&pe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,lt,Lt,Kt[0].width,Kt[0].height,nt.depth);for(let X=0,K=Kt.length;X<K;X++)if(xt=Kt[X],E.format!==gn)if(gt!==null)if(Vt){if(F)if(E.layerUpdates.size>0){let dt=Ch(xt.width,xt.height,E.format,E.type);for(let ht of E.layerUpdates){let zt=xt.data.subarray(ht*dt/xt.data.BYTES_PER_ELEMENT,(ht+1)*dt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,X,0,0,ht,xt.width,xt.height,1,gt,zt)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,X,0,0,0,xt.width,xt.height,nt.depth,gt,xt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,X,Lt,xt.width,xt.height,nt.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?F&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,X,0,0,0,xt.width,xt.height,nt.depth,gt,It,xt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,X,Lt,xt.width,xt.height,nt.depth,0,gt,It,xt.data)}else{Vt&&pe&&e.texStorage2D(r.TEXTURE_2D,lt,Lt,Kt[0].width,Kt[0].height);for(let X=0,K=Kt.length;X<K;X++)xt=Kt[X],E.format!==gn?gt!==null?Vt?F&&e.compressedTexSubImage2D(r.TEXTURE_2D,X,0,0,xt.width,xt.height,gt,xt.data):e.compressedTexImage2D(r.TEXTURE_2D,X,Lt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?F&&e.texSubImage2D(r.TEXTURE_2D,X,0,0,xt.width,xt.height,gt,It,xt.data):e.texImage2D(r.TEXTURE_2D,X,Lt,xt.width,xt.height,0,gt,It,xt.data)}else if(E.isDataArrayTexture)if(Vt){if(pe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,lt,Lt,nt.width,nt.height,nt.depth),F)if(E.layerUpdates.size>0){let X=Ch(nt.width,nt.height,E.format,E.type);for(let K of E.layerUpdates){let dt=nt.data.subarray(K*X/nt.data.BYTES_PER_ELEMENT,(K+1)*X/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,K,nt.width,nt.height,1,gt,It,dt)}E.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,gt,It,nt.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Lt,nt.width,nt.height,nt.depth,0,gt,It,nt.data);else if(E.isData3DTexture)Vt?(pe&&e.texStorage3D(r.TEXTURE_3D,lt,Lt,nt.width,nt.height,nt.depth),F&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,gt,It,nt.data)):e.texImage3D(r.TEXTURE_3D,0,Lt,nt.width,nt.height,nt.depth,0,gt,It,nt.data);else if(E.isFramebufferTexture){if(pe)if(Vt)e.texStorage2D(r.TEXTURE_2D,lt,Lt,nt.width,nt.height);else{let X=nt.width,K=nt.height;for(let dt=0;dt<lt;dt++)e.texImage2D(r.TEXTURE_2D,dt,Lt,X,K,0,gt,It,null),X>>=1,K>>=1}}else if(Kt.length>0){if(Vt&&pe){let X=Rt(Kt[0]);e.texStorage2D(r.TEXTURE_2D,lt,Lt,X.width,X.height)}for(let X=0,K=Kt.length;X<K;X++)xt=Kt[X],Vt?F&&e.texSubImage2D(r.TEXTURE_2D,X,0,0,gt,It,xt):e.texImage2D(r.TEXTURE_2D,X,Lt,gt,It,xt);E.generateMipmaps=!1}else if(Vt){if(pe){let X=Rt(nt);e.texStorage2D(r.TEXTURE_2D,lt,Lt,X.width,X.height)}F&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,gt,It,nt)}else e.texImage2D(r.TEXTURE_2D,0,Lt,gt,It,nt);m(E)&&f(J),wt.__version=$.version,E.onUpdate&&E.onUpdate(E)}I.__version=E.version}function et(I,E,V){if(E.image.length!==6)return;let J=Tt(I,E),tt=E.source;e.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+V);let $=n.get(tt);if(tt.version!==$.__version||J===!0){e.activeTexture(r.TEXTURE0+V);let wt=te.getPrimaries(te.workingColorSpace),ct=E.colorSpace===ai?null:te.getPrimaries(E.colorSpace),mt=E.colorSpace===ai||wt===ct?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);let Qt=E.isCompressedTexture||E.image[0].isCompressedTexture,nt=E.image[0]&&E.image[0].isDataTexture,gt=[];for(let K=0;K<6;K++)!Qt&&!nt?gt[K]=x(E.image[K],!0,i.maxCubemapSize):gt[K]=nt?E.image[K].image:E.image[K],gt[K]=xe(E,gt[K]);let It=gt[0],Lt=s.convert(E.format,E.colorSpace),xt=s.convert(E.type),Kt=y(E.internalFormat,Lt,xt,E.colorSpace),Vt=E.isVideoTexture!==!0,pe=$.__version===void 0||J===!0,F=tt.dataReady,lt=M(E,It);yt(r.TEXTURE_CUBE_MAP,E);let X;if(Qt){Vt&&pe&&e.texStorage2D(r.TEXTURE_CUBE_MAP,lt,Kt,It.width,It.height);for(let K=0;K<6;K++){X=gt[K].mipmaps;for(let dt=0;dt<X.length;dt++){let ht=X[dt];E.format!==gn?Lt!==null?Vt?F&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,0,0,ht.width,ht.height,Lt,ht.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,Kt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?F&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,0,0,ht.width,ht.height,Lt,xt,ht.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,Kt,ht.width,ht.height,0,Lt,xt,ht.data)}}}else{if(X=E.mipmaps,Vt&&pe){X.length>0&&lt++;let K=Rt(gt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,lt,Kt,K.width,K.height)}for(let K=0;K<6;K++)if(nt){Vt?F&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,gt[K].width,gt[K].height,Lt,xt,gt[K].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Kt,gt[K].width,gt[K].height,0,Lt,xt,gt[K].data);for(let dt=0;dt<X.length;dt++){let zt=X[dt].image[K].image;Vt?F&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,0,0,zt.width,zt.height,Lt,xt,zt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,Kt,zt.width,zt.height,0,Lt,xt,zt.data)}}else{Vt?F&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Lt,xt,gt[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Kt,Lt,xt,gt[K]);for(let dt=0;dt<X.length;dt++){let ht=X[dt];Vt?F&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,0,0,Lt,xt,ht.image[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,Kt,Lt,xt,ht.image[K])}}}m(E)&&f(r.TEXTURE_CUBE_MAP),$.__version=tt.version,E.onUpdate&&E.onUpdate(E)}I.__version=E.version}function pt(I,E,V,J,tt,$){let wt=s.convert(V.format,V.colorSpace),ct=s.convert(V.type),mt=y(V.internalFormat,wt,ct,V.colorSpace),Qt=n.get(E),nt=n.get(V);if(nt.__renderTarget=E,!Qt.__hasExternalTextures){let gt=Math.max(1,E.width>>$),It=Math.max(1,E.height>>$);tt===r.TEXTURE_3D||tt===r.TEXTURE_2D_ARRAY?e.texImage3D(tt,$,mt,gt,It,E.depth,0,wt,ct,null):e.texImage2D(tt,$,mt,gt,It,0,wt,ct,null)}e.bindFramebuffer(r.FRAMEBUFFER,I),Jt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,tt,nt.__webglTexture,0,$t(E)):(tt===r.TEXTURE_2D||tt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,J,tt,nt.__webglTexture,$),e.bindFramebuffer(r.FRAMEBUFFER,null)}function ot(I,E,V){if(r.bindRenderbuffer(r.RENDERBUFFER,I),E.depthBuffer){let J=E.depthTexture,tt=J&&J.isDepthTexture?J.type:null,$=v(E.stencilBuffer,tt),wt=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ct=$t(E);Jt(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ct,$,E.width,E.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,ct,$,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,$,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,wt,r.RENDERBUFFER,I)}else{let J=E.textures;for(let tt=0;tt<J.length;tt++){let $=J[tt],wt=s.convert($.format,$.colorSpace),ct=s.convert($.type),mt=y($.internalFormat,wt,ct,$.colorSpace),Qt=$t(E);V&&Jt(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Qt,mt,E.width,E.height):Jt(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Qt,mt,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,mt,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function At(I,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,I),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=n.get(E.depthTexture);J.__renderTarget=E,(!J.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),H(E.depthTexture,0);let tt=J.__webglTexture,$=$t(E);if(E.depthTexture.format===cs)Jt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0);else if(E.depthTexture.format===gs)Jt(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Dt(I){let E=n.get(I),V=I.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==I.depthTexture){let J=I.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),J){let tt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,J.removeEventListener("dispose",tt)};J.addEventListener("dispose",tt),E.__depthDisposeCallback=tt}E.__boundDepthTexture=J}if(I.depthTexture&&!E.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");At(E.__webglFramebuffer,I)}else if(V){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]===void 0)E.__webglDepthbuffer[J]=r.createRenderbuffer(),ot(E.__webglDepthbuffer[J],I,!1);else{let tt=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=E.__webglDepthbuffer[J];r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,tt,r.RENDERBUFFER,$)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),ot(E.__webglDepthbuffer,I,!1);else{let J=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,tt=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,J,r.RENDERBUFFER,tt)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Wt(I,E,V){let J=n.get(I);E!==void 0&&pt(J.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),V!==void 0&&Dt(I)}function fe(I){let E=I.texture,V=n.get(I),J=n.get(E);I.addEventListener("dispose",A);let tt=I.textures,$=I.isWebGLCubeRenderTarget===!0,wt=tt.length>1;if(wt||(J.__webglTexture===void 0&&(J.__webglTexture=r.createTexture()),J.__version=E.version,o.memory.textures++),$){V.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer[ct]=[];for(let mt=0;mt<E.mipmaps.length;mt++)V.__webglFramebuffer[ct][mt]=r.createFramebuffer()}else V.__webglFramebuffer[ct]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer=[];for(let ct=0;ct<E.mipmaps.length;ct++)V.__webglFramebuffer[ct]=r.createFramebuffer()}else V.__webglFramebuffer=r.createFramebuffer();if(wt)for(let ct=0,mt=tt.length;ct<mt;ct++){let Qt=n.get(tt[ct]);Qt.__webglTexture===void 0&&(Qt.__webglTexture=r.createTexture(),o.memory.textures++)}if(I.samples>0&&Jt(I)===!1){V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ct=0;ct<tt.length;ct++){let mt=tt[ct];V.__webglColorRenderbuffer[ct]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,V.__webglColorRenderbuffer[ct]);let Qt=s.convert(mt.format,mt.colorSpace),nt=s.convert(mt.type),gt=y(mt.internalFormat,Qt,nt,mt.colorSpace,I.isXRRenderTarget===!0),It=$t(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,It,gt,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ct,r.RENDERBUFFER,V.__webglColorRenderbuffer[ct])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),ot(V.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if($){e.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture),yt(r.TEXTURE_CUBE_MAP,E);for(let ct=0;ct<6;ct++)if(E.mipmaps&&E.mipmaps.length>0)for(let mt=0;mt<E.mipmaps.length;mt++)pt(V.__webglFramebuffer[ct][mt],I,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,mt);else pt(V.__webglFramebuffer[ct],I,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(E)&&f(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let ct=0,mt=tt.length;ct<mt;ct++){let Qt=tt[ct],nt=n.get(Qt);e.bindTexture(r.TEXTURE_2D,nt.__webglTexture),yt(r.TEXTURE_2D,Qt),pt(V.__webglFramebuffer,I,Qt,r.COLOR_ATTACHMENT0+ct,r.TEXTURE_2D,0),m(Qt)&&f(r.TEXTURE_2D)}e.unbindTexture()}else{let ct=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ct=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ct,J.__webglTexture),yt(ct,E),E.mipmaps&&E.mipmaps.length>0)for(let mt=0;mt<E.mipmaps.length;mt++)pt(V.__webglFramebuffer[mt],I,E,r.COLOR_ATTACHMENT0,ct,mt);else pt(V.__webglFramebuffer,I,E,r.COLOR_ATTACHMENT0,ct,0);m(E)&&f(ct),e.unbindTexture()}I.depthBuffer&&Dt(I)}function jt(I){let E=I.textures;for(let V=0,J=E.length;V<J;V++){let tt=E[V];if(m(tt)){let $=_(I),wt=n.get(tt).__webglTexture;e.bindTexture($,wt),f($),e.unbindTexture()}}}let Ee=[],k=[];function sn(I){if(I.samples>0){if(Jt(I)===!1){let E=I.textures,V=I.width,J=I.height,tt=r.COLOR_BUFFER_BIT,$=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,wt=n.get(I),ct=E.length>1;if(ct)for(let mt=0;mt<E.length;mt++)e.bindFramebuffer(r.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let mt=0;mt<E.length;mt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(tt|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(tt|=r.STENCIL_BUFFER_BIT)),ct){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,wt.__webglColorRenderbuffer[mt]);let Qt=n.get(E[mt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Qt,0)}r.blitFramebuffer(0,0,V,J,0,0,V,J,tt,r.NEAREST),l===!0&&(Ee.length=0,k.length=0,Ee.push(r.COLOR_ATTACHMENT0+mt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(Ee.push($),k.push($),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,k)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ee))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ct)for(let mt=0;mt<E.length;mt++){e.bindFramebuffer(r.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,wt.__webglColorRenderbuffer[mt]);let Qt=n.get(E[mt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,Qt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){let E=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function $t(I){return Math.min(i.maxSamples,I.samples)}function Jt(I){let E=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ct(I){let E=o.render.frame;h.get(I)!==E&&(h.set(I,E),I.update())}function xe(I,E){let V=I.colorSpace,J=I.format,tt=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||V!==_s&&V!==ai&&(te.getTransfer(V)===ce?(J!==gn||tt!==qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),E}function Rt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=D,this.setTexture2D=H,this.setTexture2DArray=z,this.setTexture3D=q,this.setTextureCube=N,this.rebindTextures=Wt,this.setupRenderTarget=fe,this.updateRenderTargetMipmap=jt,this.updateMultisampleRenderTarget=sn,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=Jt}function dg(r,t){function e(n,i=ai){let s,o=te.getTransfer(i);if(n===qn)return r.UNSIGNED_BYTE;if(n===tc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===ec)return r.UNSIGNED_SHORT_5_5_5_1;if(n===qh)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Wh)return r.BYTE;if(n===Xh)return r.SHORT;if(n===ks)return r.UNSIGNED_SHORT;if(n===Ql)return r.INT;if(n===Di)return r.UNSIGNED_INT;if(n===Rn)return r.FLOAT;if(n===Zs)return r.HALF_FLOAT;if(n===Yh)return r.ALPHA;if(n===Zh)return r.RGB;if(n===gn)return r.RGBA;if(n===$h)return r.LUMINANCE;if(n===Jh)return r.LUMINANCE_ALPHA;if(n===cs)return r.DEPTH_COMPONENT;if(n===gs)return r.DEPTH_STENCIL;if(n===nc)return r.RED;if(n===ic)return r.RED_INTEGER;if(n===Kh)return r.RG;if(n===sc)return r.RG_INTEGER;if(n===rc)return r.RGBA_INTEGER;if(n===Nr||n===Fr||n===Br||n===Or)if(o===ce)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Nr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Or)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Nr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Fr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Br)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Or)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Na||n===Fa||n===Ba||n===Oa)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Na)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ba)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===za||n===ka||n===Ha)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===za||n===ka)return o===ce?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ha)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Va||n===Ga||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===$a||n===Ja||n===Ka||n===ja||n===Qa||n===tl||n===el)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Va)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ga)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wa)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xa)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qa)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ya)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Za)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$a)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ja)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ka)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ja)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qa)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===tl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===el)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zr||n===nl||n===il)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===zr)return o===ce?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===nl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===il)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===jh||n===sl||n===rl||n===ol)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===zr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===sl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===rl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ol)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ms?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}var wl=class extends Ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Gt=class extends Oe{constructor(){super(),this.isGroup=!0,this.type="Group"}},fg={type:"move"},Bs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(fg)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Gt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},pg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mg=`
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

}`,Sl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new Ke,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new ze({vertexShader:pg,fragmentShader:mg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Nt(new ke(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},El=class extends pi{constructor(t,e){super();let n=this,i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,x=new Sl,m=e.getContextAttributes(),f=null,_=null,y=[],v=[],M=new vt,S=null,A=new Ye;A.viewport=new Se;let T=new Ye;T.viewport=new Se;let w=[A,T],b=new wl,C=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let et=y[Y];return et===void 0&&(et=new Bs,y[Y]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Y){let et=y[Y];return et===void 0&&(et=new Bs,y[Y]=et),et.getGripSpace()},this.getHand=function(Y){let et=y[Y];return et===void 0&&(et=new Bs,y[Y]=et),et.getHandSpace()};function U(Y){let et=v.indexOf(Y.inputSource);if(et===-1)return;let pt=y[et];pt!==void 0&&(pt.update(Y.inputSource,Y.frame,c||o),pt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function L(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",L),i.removeEventListener("inputsourceschange",H);for(let Y=0;Y<y.length;Y++){let et=v[Y];et!==null&&(v[Y]=null,y[Y].disconnect(et))}C=null,D=null,x.reset(),t.setRenderTarget(f),p=null,d=null,u=null,i=null,_=null,Tt.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(f=t.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",L),i.addEventListener("inputsourceschange",H),m.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(M),i.renderState.layers===void 0){let et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,e,et),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Yn(p.framebufferWidth,p.framebufferHeight,{format:gn,type:qn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let et=null,pt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=m.stencil?gs:cs,pt=m.stencil?ms:Di);let At={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(At),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new Yn(d.textureWidth,d.textureHeight,{format:gn,type:qn,depthTexture:new jr(d.textureWidth,d.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Tt.setContext(i),Tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function H(Y){for(let et=0;et<Y.removed.length;et++){let pt=Y.removed[et],ot=v.indexOf(pt);ot>=0&&(v[ot]=null,y[ot].disconnect(pt))}for(let et=0;et<Y.added.length;et++){let pt=Y.added[et],ot=v.indexOf(pt);if(ot===-1){for(let Dt=0;Dt<y.length;Dt++)if(Dt>=v.length){v.push(pt),ot=Dt;break}else if(v[Dt]===null){v[Dt]=pt,ot=Dt;break}if(ot===-1)break}let At=y[ot];At&&At.connect(pt)}}let z=new P,q=new P;function N(Y,et,pt){z.setFromMatrixPosition(et.matrixWorld),q.setFromMatrixPosition(pt.matrixWorld);let ot=z.distanceTo(q),At=et.projectionMatrix.elements,Dt=pt.projectionMatrix.elements,Wt=At[14]/(At[10]-1),fe=At[14]/(At[10]+1),jt=(At[9]+1)/At[5],Ee=(At[9]-1)/At[5],k=(At[8]-1)/At[0],sn=(Dt[8]+1)/Dt[0],$t=Wt*k,Jt=Wt*sn,Ct=ot/(-k+sn),xe=Ct*-k;if(et.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(xe),Y.translateZ(Ct),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),At[10]===-1)Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let Rt=Wt+Ct,I=fe+Ct,E=$t-xe,V=Jt+(ot-xe),J=jt*fe/I*Rt,tt=Ee*fe/I*Rt;Y.projectionMatrix.makePerspective(E,V,J,tt,Rt,I),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Z(Y,et){et===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(et.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let et=Y.near,pt=Y.far;x.texture!==null&&(x.depthNear>0&&(et=x.depthNear),x.depthFar>0&&(pt=x.depthFar)),b.near=T.near=A.near=et,b.far=T.far=A.far=pt,(C!==b.near||D!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),C=b.near,D=b.far),A.layers.mask=Y.layers.mask|2,T.layers.mask=Y.layers.mask|4,b.layers.mask=A.layers.mask|T.layers.mask;let ot=Y.parent,At=b.cameras;Z(b,ot);for(let Dt=0;Dt<At.length;Dt++)Z(At[Dt],ot);At.length===2?N(b,A,T):b.projectionMatrix.copy(A.projectionMatrix),j(Y,b,ot)};function j(Y,et,pt){pt===null?Y.matrix.copy(et.matrixWorld):(Y.matrix.copy(pt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(et.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=cl*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(b)};let it=null;function yt(Y,et){if(h=et.getViewerPose(c||o),g=et,h!==null){let pt=h.views;p!==null&&(t.setRenderTargetFramebuffer(_,p.framebuffer),t.setRenderTarget(_));let ot=!1;pt.length!==b.cameras.length&&(b.cameras.length=0,ot=!0);for(let Dt=0;Dt<pt.length;Dt++){let Wt=pt[Dt],fe=null;if(p!==null)fe=p.getViewport(Wt);else{let Ee=u.getViewSubImage(d,Wt);fe=Ee.viewport,Dt===0&&(t.setRenderTargetTextures(_,Ee.colorTexture,d.ignoreDepthValues?void 0:Ee.depthStencilTexture),t.setRenderTarget(_))}let jt=w[Dt];jt===void 0&&(jt=new Ye,jt.layers.enable(Dt),jt.viewport=new Se,w[Dt]=jt),jt.matrix.fromArray(Wt.transform.matrix),jt.matrix.decompose(jt.position,jt.quaternion,jt.scale),jt.projectionMatrix.fromArray(Wt.projectionMatrix),jt.projectionMatrixInverse.copy(jt.projectionMatrix).invert(),jt.viewport.set(fe.x,fe.y,fe.width,fe.height),Dt===0&&(b.matrix.copy(jt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),ot===!0&&b.cameras.push(jt)}let At=i.enabledFeatures;if(At&&At.includes("depth-sensing")){let Dt=u.getDepthInformation(pt[0]);Dt&&Dt.isValid&&Dt.texture&&x.init(t,Dt,i.renderState)}}for(let pt=0;pt<y.length;pt++){let ot=v[pt],At=y[pt];ot!==null&&At!==void 0&&At.update(ot,et,c||o)}it&&it(Y,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}let Tt=new su;Tt.setAnimationLoop(yt),this.setAnimationLoop=function(Y){it=Y},this.dispose=function(){}}},Ai=new an,gg=new Yt;function xg(r,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,iu(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,_,y,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),x(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,_,y):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===We&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===We&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let _=t.get(f),y=_.envMap,v=_.envMapRotation;y&&(m.envMap.value=y,Ai.copy(v),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),m.envMapRotation.value.setFromMatrix4(gg.makeRotationFromEuler(Ai)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,_,y){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*_,m.scale.value=y*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,_){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===We&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let _=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function vg(r,t,e,n){let i={},s={},o=[],a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,y){let v=y.program;n.uniformBlockBinding(_,v)}function c(_,y){let v=i[_.id];v===void 0&&(g(_),v=h(_),i[_.id]=v,_.addEventListener("dispose",m));let M=y.program;n.updateUBOMapping(_,M);let S=t.render.frame;s[_.id]!==S&&(d(_),s[_.id]=S)}function h(_){let y=u();_.__bindingPointIndex=y;let v=r.createBuffer(),M=_.__size,S=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,M,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,v),v}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let y=i[_.id],v=_.uniforms,M=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let S=0,A=v.length;S<A;S++){let T=Array.isArray(v[S])?v[S]:[v[S]];for(let w=0,b=T.length;w<b;w++){let C=T[w];if(p(C,S,w,M)===!0){let D=C.__offset,U=Array.isArray(C.value)?C.value:[C.value],L=0;for(let H=0;H<U.length;H++){let z=U[H],q=x(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,D+L,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,L),L+=q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,D,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(_,y,v,M){let S=_.value,A=y+"_"+v;if(M[A]===void 0)return typeof S=="number"||typeof S=="boolean"?M[A]=S:M[A]=S.clone(),!0;{let T=M[A];if(typeof S=="number"||typeof S=="boolean"){if(T!==S)return M[A]=S,!0}else if(T.equals(S)===!1)return T.copy(S),!0}return!1}function g(_){let y=_.uniforms,v=0,M=16;for(let A=0,T=y.length;A<T;A++){let w=Array.isArray(y[A])?y[A]:[y[A]];for(let b=0,C=w.length;b<C;b++){let D=w[b],U=Array.isArray(D.value)?D.value:[D.value];for(let L=0,H=U.length;L<H;L++){let z=U[L],q=x(z),N=v%M,Z=N%q.boundary,j=N+Z;v+=Z,j!==0&&M-j<q.storage&&(v+=M-j),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=q.storage}}}let S=v%M;return S>0&&(v+=M-S),_.__size=v,_.__cache={},this}function x(_){let y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function m(_){let y=_.target;y.removeEventListener("dispose",m);let v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function f(){for(let _ in i)r.deleteBuffer(i[_]);o=[],i={},s={}}return{bind:l,update:c,dispose:f}}var Qr=class{constructor(t={}){let{canvas:e=bd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,f=null,_=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=De,this.toneMapping=ui,this.toneMappingExposure=1;let v=this,M=!1,S=0,A=0,T=null,w=-1,b=null,C=new Se,D=new Se,U=null,L=new at(0),H=0,z=e.width,q=e.height,N=1,Z=null,j=null,it=new Se(0,0,z,q),yt=new Se(0,0,z,q),Tt=!1,Y=new Gs,et=!1,pt=!1,ot=new Yt,At=new Yt,Dt=new P,Wt=new Se,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},jt=!1;function Ee(){return T===null?N:1}let k=n;function sn(R,B){return e.getContext(R,B)}try{let R={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Jl}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),k===null){let B="webgl2";if(k=sn(B,R),k===null)throw sn(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let $t,Jt,Ct,xe,Rt,I,E,V,J,tt,$,wt,ct,mt,Qt,nt,gt,It,Lt,xt,Kt,Vt,pe,F;function lt(){$t=new Um(k),$t.init(),Vt=new dg(k,$t),Jt=new Rm(k,$t,t,Vt),Ct=new cg(k,$t),Jt.reverseDepthBuffer&&d&&Ct.buffers.depth.setReversed(!0),xe=new Bm(k),Rt=new J0,I=new ug(k,$t,Ct,Rt,Jt,Vt,xe),E=new Im(v),V=new Dm(v),J=new Gd(k),pe=new Tm(k,J),tt=new Nm(k,J,xe,pe),$=new zm(k,tt,J,xe),Lt=new Om(k,Jt,I),nt=new Cm(Rt),wt=new $0(v,E,V,$t,Jt,pe,nt),ct=new xg(v,Rt),mt=new j0,Qt=new sg($t),It=new Em(v,E,V,Ct,$,p,l),gt=new ag(v,$,Jt),F=new vg(k,xe,Jt,Ct),xt=new Am(k,$t,xe),Kt=new Fm(k,$t,xe),xe.programs=wt.programs,v.capabilities=Jt,v.extensions=$t,v.properties=Rt,v.renderLists=mt,v.shadowMap=gt,v.state=Ct,v.info=xe}lt();let X=new El(v,k);this.xr=X,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let R=$t.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=$t.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(R){R!==void 0&&(N=R,this.setSize(z,q,!1))},this.getSize=function(R){return R.set(z,q)},this.setSize=function(R,B,G=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=R,q=B,e.width=Math.floor(R*N),e.height=Math.floor(B*N),G===!0&&(e.style.width=R+"px",e.style.height=B+"px"),this.setViewport(0,0,R,B)},this.getDrawingBufferSize=function(R){return R.set(z*N,q*N).floor()},this.setDrawingBufferSize=function(R,B,G){z=R,q=B,N=G,e.width=Math.floor(R*G),e.height=Math.floor(B*G),this.setViewport(0,0,R,B)},this.getCurrentViewport=function(R){return R.copy(C)},this.getViewport=function(R){return R.copy(it)},this.setViewport=function(R,B,G,W){R.isVector4?it.set(R.x,R.y,R.z,R.w):it.set(R,B,G,W),Ct.viewport(C.copy(it).multiplyScalar(N).round())},this.getScissor=function(R){return R.copy(yt)},this.setScissor=function(R,B,G,W){R.isVector4?yt.set(R.x,R.y,R.z,R.w):yt.set(R,B,G,W),Ct.scissor(D.copy(yt).multiplyScalar(N).round())},this.getScissorTest=function(){return Tt},this.setScissorTest=function(R){Ct.setScissorTest(Tt=R)},this.setOpaqueSort=function(R){Z=R},this.setTransparentSort=function(R){j=R},this.getClearColor=function(R){return R.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor.apply(It,arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha.apply(It,arguments)},this.clear=function(R=!0,B=!0,G=!0){let W=0;if(R){let O=!1;if(T!==null){let st=T.texture.format;O=st===rc||st===sc||st===ic}if(O){let st=T.texture.type,ut=st===qn||st===Di||st===ks||st===ms||st===tc||st===ec,_t=It.getClearColor(),Mt=It.getClearAlpha(),Ut=_t.r,kt=_t.g,bt=_t.b;ut?(g[0]=Ut,g[1]=kt,g[2]=bt,g[3]=Mt,k.clearBufferuiv(k.COLOR,0,g)):(x[0]=Ut,x[1]=kt,x[2]=bt,x[3]=Mt,k.clearBufferiv(k.COLOR,0,x))}else W|=k.COLOR_BUFFER_BIT}B&&(W|=k.DEPTH_BUFFER_BIT),G&&(W|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),mt.dispose(),Qt.dispose(),Rt.dispose(),E.dispose(),V.dispose(),$.dispose(),pe.dispose(),F.dispose(),wt.dispose(),X.dispose(),X.removeEventListener("sessionstart",mc),X.removeEventListener("sessionend",gc),vi.stop()};function K(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let R=xe.autoReset,B=gt.enabled,G=gt.autoUpdate,W=gt.needsUpdate,O=gt.type;lt(),xe.autoReset=R,gt.enabled=B,gt.autoUpdate=G,gt.needsUpdate=W,gt.type=O}function ht(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function zt(R){let B=R.target;B.removeEventListener("dispose",zt),we(B)}function we(R){He(R),Rt.remove(R)}function He(R){let B=Rt.get(R).programs;B!==void 0&&(B.forEach(function(G){wt.releaseProgram(G)}),R.isShaderMaterial&&wt.releaseShaderCache(R))}this.renderBufferDirect=function(R,B,G,W,O,st){B===null&&(B=fe);let ut=O.isMesh&&O.matrixWorld.determinant()<0,_t=Su(R,B,G,W,O);Ct.setMaterial(W,ut);let Mt=G.index,Ut=1;if(W.wireframe===!0){if(Mt=tt.getWireframeAttribute(G),Mt===void 0)return;Ut=2}let kt=G.drawRange,bt=G.attributes.position,ee=kt.start*Ut,me=(kt.start+kt.count)*Ut;st!==null&&(ee=Math.max(ee,st.start*Ut),me=Math.min(me,(st.start+st.count)*Ut)),Mt!==null?(ee=Math.max(ee,0),me=Math.min(me,Mt.count)):bt!=null&&(ee=Math.max(ee,0),me=Math.min(me,bt.count));let ve=me-ee;if(ve<0||ve===1/0)return;pe.setup(O,W,_t,G,Mt);let $e,se=xt;if(Mt!==null&&($e=J.get(Mt),se=Kt,se.setIndex($e)),O.isMesh)W.wireframe===!0?(Ct.setLineWidth(W.wireframeLinewidth*Ee()),se.setMode(k.LINES)):se.setMode(k.TRIANGLES);else if(O.isLine){let St=W.linewidth;St===void 0&&(St=1),Ct.setLineWidth(St*Ee()),O.isLineSegments?se.setMode(k.LINES):O.isLineLoop?se.setMode(k.LINE_LOOP):se.setMode(k.LINE_STRIP)}else O.isPoints?se.setMode(k.POINTS):O.isSprite&&se.setMode(k.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)se.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if($t.get("WEBGL_multi_draw"))se.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let St=O._multiDrawStarts,Dn=O._multiDrawCounts,re=O._multiDrawCount,dn=Mt?J.get(Mt).bytesPerElement:1,zi=Rt.get(W).currentProgram.getUniforms();for(let je=0;je<re;je++)zi.setValue(k,"_gl_DrawID",je),se.render(St[je]/dn,Dn[je])}else if(O.isInstancedMesh)se.renderInstances(ee,ve,O.count);else if(G.isInstancedBufferGeometry){let St=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Dn=Math.min(G.instanceCount,St);se.renderInstances(ee,ve,Dn)}else se.render(ee,ve)};function ae(R,B,G){R.transparent===!0&&R.side===be&&R.forceSinglePass===!1?(R.side=We,R.needsUpdate=!0,Ks(R,B,G),R.side=fi,R.needsUpdate=!0,Ks(R,B,G),R.side=be):Ks(R,B,G)}this.compile=function(R,B,G=null){G===null&&(G=R),f=Qt.get(G),f.init(B),y.push(f),G.traverseVisible(function(O){O.isLight&&O.layers.test(B.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),R!==G&&R.traverseVisible(function(O){O.isLight&&O.layers.test(B.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights();let W=new Set;return R.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let st=O.material;if(st)if(Array.isArray(st))for(let ut=0;ut<st.length;ut++){let _t=st[ut];ae(_t,G,O),W.add(_t)}else ae(st,G,O),W.add(st)}),y.pop(),f=null,W},this.compileAsync=function(R,B,G=null){let W=this.compile(R,B,G);return new Promise(O=>{function st(){if(W.forEach(function(ut){Rt.get(ut).currentProgram.isReady()&&W.delete(ut)}),W.size===0){O(R);return}setTimeout(st,10)}$t.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let un=null;function Ln(R){un&&un(R)}function mc(){vi.stop()}function gc(){vi.start()}let vi=new su;vi.setAnimationLoop(Ln),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(R){un=R,X.setAnimationLoop(R),R===null?vi.stop():vi.start()},X.addEventListener("sessionstart",mc),X.addEventListener("sessionend",gc),this.render=function(R,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(B),B=X.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,B,T),f=Qt.get(R,y.length),f.init(B),y.push(f),At.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Y.setFromProjectionMatrix(At),pt=this.localClippingEnabled,et=nt.init(this.clippingPlanes,pt),m=mt.get(R,_.length),m.init(),_.push(m),X.enabled===!0&&X.isPresenting===!0){let st=v.xr.getDepthSensingMesh();st!==null&&Bo(st,B,-1/0,v.sortObjects)}Bo(R,B,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Z,j),jt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,jt&&It.addToRenderList(m,R),this.info.render.frame++,et===!0&&nt.beginShadows();let G=f.state.shadowsArray;gt.render(G,R,B),et===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=m.opaque,O=m.transmissive;if(f.setupLights(),B.isArrayCamera){let st=B.cameras;if(O.length>0)for(let ut=0,_t=st.length;ut<_t;ut++){let Mt=st[ut];vc(W,O,R,Mt)}jt&&It.render(R);for(let ut=0,_t=st.length;ut<_t;ut++){let Mt=st[ut];xc(m,R,Mt,Mt.viewport)}}else O.length>0&&vc(W,O,R,B),jt&&It.render(R),xc(m,R,B);T!==null&&(I.updateMultisampleRenderTarget(T),I.updateRenderTargetMipmap(T)),R.isScene===!0&&R.onAfterRender(v,R,B),pe.resetDefaultState(),w=-1,b=null,y.pop(),y.length>0?(f=y[y.length-1],et===!0&&nt.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function Bo(R,B,G,W){if(R.visible===!1)return;if(R.layers.test(B.layers)){if(R.isGroup)G=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(B);else if(R.isLight)f.pushLight(R),R.castShadow&&f.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Y.intersectsSprite(R)){W&&Wt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(At);let ut=$.update(R),_t=R.material;_t.visible&&m.push(R,ut,_t,G,Wt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Y.intersectsObject(R))){let ut=$.update(R),_t=R.material;if(W&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Wt.copy(R.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Wt.copy(ut.boundingSphere.center)),Wt.applyMatrix4(R.matrixWorld).applyMatrix4(At)),Array.isArray(_t)){let Mt=ut.groups;for(let Ut=0,kt=Mt.length;Ut<kt;Ut++){let bt=Mt[Ut],ee=_t[bt.materialIndex];ee&&ee.visible&&m.push(R,ut,ee,G,Wt.z,bt)}}else _t.visible&&m.push(R,ut,_t,G,Wt.z,null)}}let st=R.children;for(let ut=0,_t=st.length;ut<_t;ut++)Bo(st[ut],B,G,W)}function xc(R,B,G,W){let O=R.opaque,st=R.transmissive,ut=R.transparent;f.setupLightsView(G),et===!0&&nt.setGlobalState(v.clippingPlanes,G),W&&Ct.viewport(C.copy(W)),O.length>0&&Js(O,B,G),st.length>0&&Js(st,B,G),ut.length>0&&Js(ut,B,G),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function vc(R,B,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[W.id]===void 0&&(f.state.transmissionRenderTarget[W.id]=new Yn(1,1,{generateMipmaps:!0,type:$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float")?Zs:qn,minFilter:Li,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));let st=f.state.transmissionRenderTarget[W.id],ut=W.viewport||C;st.setSize(ut.z,ut.w);let _t=v.getRenderTarget();v.setRenderTarget(st),v.getClearColor(L),H=v.getClearAlpha(),H<1&&v.setClearColor(16777215,.5),v.clear(),jt&&It.render(G);let Mt=v.toneMapping;v.toneMapping=ui;let Ut=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),f.setupLightsView(W),et===!0&&nt.setGlobalState(v.clippingPlanes,W),Js(R,G,W),I.updateMultisampleRenderTarget(st),I.updateRenderTargetMipmap(st),$t.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let bt=0,ee=B.length;bt<ee;bt++){let me=B[bt],ve=me.object,$e=me.geometry,se=me.material,St=me.group;if(se.side===be&&ve.layers.test(W.layers)){let Dn=se.side;se.side=We,se.needsUpdate=!0,yc(ve,G,W,$e,se,St),se.side=Dn,se.needsUpdate=!0,kt=!0}}kt===!0&&(I.updateMultisampleRenderTarget(st),I.updateRenderTargetMipmap(st))}v.setRenderTarget(_t),v.setClearColor(L,H),Ut!==void 0&&(W.viewport=Ut),v.toneMapping=Mt}function Js(R,B,G){let W=B.isScene===!0?B.overrideMaterial:null;for(let O=0,st=R.length;O<st;O++){let ut=R[O],_t=ut.object,Mt=ut.geometry,Ut=W===null?ut.material:W,kt=ut.group;_t.layers.test(G.layers)&&yc(_t,B,G,Mt,Ut,kt)}}function yc(R,B,G,W,O,st){R.onBeforeRender(v,B,G,W,O,st),R.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),O.onBeforeRender(v,B,G,W,R,st),O.transparent===!0&&O.side===be&&O.forceSinglePass===!1?(O.side=We,O.needsUpdate=!0,v.renderBufferDirect(G,B,W,O,R,st),O.side=fi,O.needsUpdate=!0,v.renderBufferDirect(G,B,W,O,R,st),O.side=be):v.renderBufferDirect(G,B,W,O,R,st),R.onAfterRender(v,B,G,W,O,st)}function Ks(R,B,G){B.isScene!==!0&&(B=fe);let W=Rt.get(R),O=f.state.lights,st=f.state.shadowsArray,ut=O.state.version,_t=wt.getParameters(R,O.state,st,B,G),Mt=wt.getProgramCacheKey(_t),Ut=W.programs;W.environment=R.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(R.isMeshStandardMaterial?V:E).get(R.envMap||W.environment),W.envMapRotation=W.environment!==null&&R.envMap===null?B.environmentRotation:R.envMapRotation,Ut===void 0&&(R.addEventListener("dispose",zt),Ut=new Map,W.programs=Ut);let kt=Ut.get(Mt);if(kt!==void 0){if(W.currentProgram===kt&&W.lightsStateVersion===ut)return Mc(R,_t),kt}else _t.uniforms=wt.getUniforms(R),R.onBeforeCompile(_t,v),kt=wt.acquireProgram(_t,Mt),Ut.set(Mt,kt),W.uniforms=_t.uniforms;let bt=W.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(bt.clippingPlanes=nt.uniform),Mc(R,_t),W.needsLights=Tu(R),W.lightsStateVersion=ut,W.needsLights&&(bt.ambientLightColor.value=O.state.ambient,bt.lightProbe.value=O.state.probe,bt.directionalLights.value=O.state.directional,bt.directionalLightShadows.value=O.state.directionalShadow,bt.spotLights.value=O.state.spot,bt.spotLightShadows.value=O.state.spotShadow,bt.rectAreaLights.value=O.state.rectArea,bt.ltc_1.value=O.state.rectAreaLTC1,bt.ltc_2.value=O.state.rectAreaLTC2,bt.pointLights.value=O.state.point,bt.pointLightShadows.value=O.state.pointShadow,bt.hemisphereLights.value=O.state.hemi,bt.directionalShadowMap.value=O.state.directionalShadowMap,bt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,bt.spotShadowMap.value=O.state.spotShadowMap,bt.spotLightMatrix.value=O.state.spotLightMatrix,bt.spotLightMap.value=O.state.spotLightMap,bt.pointShadowMap.value=O.state.pointShadowMap,bt.pointShadowMatrix.value=O.state.pointShadowMatrix),W.currentProgram=kt,W.uniformsList=null,kt}function _c(R){if(R.uniformsList===null){let B=R.currentProgram.getUniforms();R.uniformsList=us.seqWithValue(B.seq,R.uniforms)}return R.uniformsList}function Mc(R,B){let G=Rt.get(R);G.outputColorSpace=B.outputColorSpace,G.batching=B.batching,G.batchingColor=B.batchingColor,G.instancing=B.instancing,G.instancingColor=B.instancingColor,G.instancingMorph=B.instancingMorph,G.skinning=B.skinning,G.morphTargets=B.morphTargets,G.morphNormals=B.morphNormals,G.morphColors=B.morphColors,G.morphTargetsCount=B.morphTargetsCount,G.numClippingPlanes=B.numClippingPlanes,G.numIntersection=B.numClipIntersection,G.vertexAlphas=B.vertexAlphas,G.vertexTangents=B.vertexTangents,G.toneMapping=B.toneMapping}function Su(R,B,G,W,O){B.isScene!==!0&&(B=fe),I.resetTextureUnits();let st=B.fog,ut=W.isMeshStandardMaterial?B.environment:null,_t=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:_s,Mt=(W.isMeshStandardMaterial?V:E).get(W.envMap||ut),Ut=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,kt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),bt=!!G.morphAttributes.position,ee=!!G.morphAttributes.normal,me=!!G.morphAttributes.color,ve=ui;W.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(ve=v.toneMapping);let $e=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,se=$e!==void 0?$e.length:0,St=Rt.get(W),Dn=f.state.lights;if(et===!0&&(pt===!0||R!==b)){let rn=R===b&&W.id===w;nt.setState(W,R,rn)}let re=!1;W.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Dn.state.version||St.outputColorSpace!==_t||O.isBatchedMesh&&St.batching===!1||!O.isBatchedMesh&&St.batching===!0||O.isBatchedMesh&&St.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&St.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&St.instancing===!1||!O.isInstancedMesh&&St.instancing===!0||O.isSkinnedMesh&&St.skinning===!1||!O.isSkinnedMesh&&St.skinning===!0||O.isInstancedMesh&&St.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&St.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&St.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&St.instancingMorph===!1&&O.morphTexture!==null||St.envMap!==Mt||W.fog===!0&&St.fog!==st||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==nt.numPlanes||St.numIntersection!==nt.numIntersection)||St.vertexAlphas!==Ut||St.vertexTangents!==kt||St.morphTargets!==bt||St.morphNormals!==ee||St.morphColors!==me||St.toneMapping!==ve||St.morphTargetsCount!==se)&&(re=!0):(re=!0,St.__version=W.version);let dn=St.currentProgram;re===!0&&(dn=Ks(W,B,O));let zi=!1,je=!1,ws=!1,ye=dn.getUniforms(),Mn=St.uniforms;if(Ct.useProgram(dn.program)&&(zi=!0,je=!0,ws=!0),W.id!==w&&(w=W.id,je=!0),zi||b!==R){Ct.buffers.depth.getReversed()?(ot.copy(R.projectionMatrix),Sd(ot),Ed(ot),ye.setValue(k,"projectionMatrix",ot)):ye.setValue(k,"projectionMatrix",R.projectionMatrix),ye.setValue(k,"viewMatrix",R.matrixWorldInverse);let Qn=ye.map.cameraPosition;Qn!==void 0&&Qn.setValue(k,Dt.setFromMatrixPosition(R.matrixWorld)),Jt.logarithmicDepthBuffer&&ye.setValue(k,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ye.setValue(k,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,je=!0,ws=!0)}if(O.isSkinnedMesh){ye.setOptional(k,O,"bindMatrix"),ye.setOptional(k,O,"bindMatrixInverse");let rn=O.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),ye.setValue(k,"boneTexture",rn.boneTexture,I))}O.isBatchedMesh&&(ye.setOptional(k,O,"batchingTexture"),ye.setValue(k,"batchingTexture",O._matricesTexture,I),ye.setOptional(k,O,"batchingIdTexture"),ye.setValue(k,"batchingIdTexture",O._indirectTexture,I),ye.setOptional(k,O,"batchingColorTexture"),O._colorsTexture!==null&&ye.setValue(k,"batchingColorTexture",O._colorsTexture,I));let Ss=G.morphAttributes;if((Ss.position!==void 0||Ss.normal!==void 0||Ss.color!==void 0)&&Lt.update(O,G,dn),(je||St.receiveShadow!==O.receiveShadow)&&(St.receiveShadow=O.receiveShadow,ye.setValue(k,"receiveShadow",O.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Mn.envMap.value=Mt,Mn.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(Mn.envMapIntensity.value=B.environmentIntensity),je&&(ye.setValue(k,"toneMappingExposure",v.toneMappingExposure),St.needsLights&&Eu(Mn,ws),st&&W.fog===!0&&ct.refreshFogUniforms(Mn,st),ct.refreshMaterialUniforms(Mn,W,N,q,f.state.transmissionRenderTarget[R.id]),us.upload(k,_c(St),Mn,I)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(us.upload(k,_c(St),Mn,I),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ye.setValue(k,"center",O.center),ye.setValue(k,"modelViewMatrix",O.modelViewMatrix),ye.setValue(k,"normalMatrix",O.normalMatrix),ye.setValue(k,"modelMatrix",O.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let rn=W.uniformsGroups;for(let Qn=0,ti=rn.length;Qn<ti;Qn++){let bc=rn[Qn];F.update(bc,dn),F.bind(bc,dn)}}return dn}function Eu(R,B){R.ambientLightColor.needsUpdate=B,R.lightProbe.needsUpdate=B,R.directionalLights.needsUpdate=B,R.directionalLightShadows.needsUpdate=B,R.pointLights.needsUpdate=B,R.pointLightShadows.needsUpdate=B,R.spotLights.needsUpdate=B,R.spotLightShadows.needsUpdate=B,R.rectAreaLights.needsUpdate=B,R.hemisphereLights.needsUpdate=B}function Tu(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(R,B,G){Rt.get(R.texture).__webglTexture=B,Rt.get(R.depthTexture).__webglTexture=G;let W=Rt.get(R);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||$t.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,B){let G=Rt.get(R);G.__webglFramebuffer=B,G.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(R,B=0,G=0){T=R,S=B,A=G;let W=!0,O=null,st=!1,ut=!1;if(R){let Mt=Rt.get(R);if(Mt.__useDefaultFramebuffer!==void 0)Ct.bindFramebuffer(k.FRAMEBUFFER,null),W=!1;else if(Mt.__webglFramebuffer===void 0)I.setupRenderTarget(R);else if(Mt.__hasExternalTextures)I.rebindTextures(R,Rt.get(R.texture).__webglTexture,Rt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let bt=R.depthTexture;if(Mt.__boundDepthTexture!==bt){if(bt!==null&&Rt.has(bt)&&(R.width!==bt.image.width||R.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(R)}}let Ut=R.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(ut=!0);let kt=Rt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(kt[B])?O=kt[B][G]:O=kt[B],st=!0):R.samples>0&&I.useMultisampledRTT(R)===!1?O=Rt.get(R).__webglMultisampledFramebuffer:Array.isArray(kt)?O=kt[G]:O=kt,C.copy(R.viewport),D.copy(R.scissor),U=R.scissorTest}else C.copy(it).multiplyScalar(N).floor(),D.copy(yt).multiplyScalar(N).floor(),U=Tt;if(Ct.bindFramebuffer(k.FRAMEBUFFER,O)&&W&&Ct.drawBuffers(R,O),Ct.viewport(C),Ct.scissor(D),Ct.setScissorTest(U),st){let Mt=Rt.get(R.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+B,Mt.__webglTexture,G)}else if(ut){let Mt=Rt.get(R.texture),Ut=B||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Mt.__webglTexture,G||0,Ut)}w=-1},this.readRenderTargetPixels=function(R,B,G,W,O,st,ut){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Rt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ut!==void 0&&(_t=_t[ut]),_t){Ct.bindFramebuffer(k.FRAMEBUFFER,_t);try{let Mt=R.texture,Ut=Mt.format,kt=Mt.type;if(!Jt.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Jt.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=R.width-W&&G>=0&&G<=R.height-O&&k.readPixels(B,G,W,O,Vt.convert(Ut),Vt.convert(kt),st)}finally{let Mt=T!==null?Rt.get(T).__webglFramebuffer:null;Ct.bindFramebuffer(k.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(R,B,G,W,O,st,ut){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=Rt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ut!==void 0&&(_t=_t[ut]),_t){let Mt=R.texture,Ut=Mt.format,kt=Mt.type;if(!Jt.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Jt.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=R.width-W&&G>=0&&G<=R.height-O){Ct.bindFramebuffer(k.FRAMEBUFFER,_t);let bt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,bt),k.bufferData(k.PIXEL_PACK_BUFFER,st.byteLength,k.STREAM_READ),k.readPixels(B,G,W,O,Vt.convert(Ut),Vt.convert(kt),0);let ee=T!==null?Rt.get(T).__webglFramebuffer:null;Ct.bindFramebuffer(k.FRAMEBUFFER,ee);let me=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await wd(k,me,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,bt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,st),k.deleteBuffer(bt),k.deleteSync(me),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,B=null,G=0){R.isTexture!==!0&&(Ns("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,R=arguments[1]);let W=Math.pow(2,-G),O=Math.floor(R.image.width*W),st=Math.floor(R.image.height*W),ut=B!==null?B.x:0,_t=B!==null?B.y:0;I.setTexture2D(R,0),k.copyTexSubImage2D(k.TEXTURE_2D,G,0,0,ut,_t,O,st),Ct.unbindTexture()},this.copyTextureToTexture=function(R,B,G=null,W=null,O=0){R.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,R=arguments[1],B=arguments[2],O=arguments[3]||0,G=null);let st,ut,_t,Mt,Ut,kt,bt,ee,me,ve=R.isCompressedTexture?R.mipmaps[O]:R.image;G!==null?(st=G.max.x-G.min.x,ut=G.max.y-G.min.y,_t=G.isBox3?G.max.z-G.min.z:1,Mt=G.min.x,Ut=G.min.y,kt=G.isBox3?G.min.z:0):(st=ve.width,ut=ve.height,_t=ve.depth||1,Mt=0,Ut=0,kt=0),W!==null?(bt=W.x,ee=W.y,me=W.z):(bt=0,ee=0,me=0);let $e=Vt.convert(B.format),se=Vt.convert(B.type),St;B.isData3DTexture?(I.setTexture3D(B,0),St=k.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(I.setTexture2DArray(B,0),St=k.TEXTURE_2D_ARRAY):(I.setTexture2D(B,0),St=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,B.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,B.unpackAlignment);let Dn=k.getParameter(k.UNPACK_ROW_LENGTH),re=k.getParameter(k.UNPACK_IMAGE_HEIGHT),dn=k.getParameter(k.UNPACK_SKIP_PIXELS),zi=k.getParameter(k.UNPACK_SKIP_ROWS),je=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,ve.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ve.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Mt),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ut),k.pixelStorei(k.UNPACK_SKIP_IMAGES,kt);let ws=R.isDataArrayTexture||R.isData3DTexture,ye=B.isDataArrayTexture||B.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){let Mn=Rt.get(R),Ss=Rt.get(B),rn=Rt.get(Mn.__renderTarget),Qn=Rt.get(Ss.__renderTarget);Ct.bindFramebuffer(k.READ_FRAMEBUFFER,rn.__webglFramebuffer),Ct.bindFramebuffer(k.DRAW_FRAMEBUFFER,Qn.__webglFramebuffer);for(let ti=0;ti<_t;ti++)ws&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Rt.get(R).__webglTexture,O,kt+ti),R.isDepthTexture?(ye&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Rt.get(B).__webglTexture,O,me+ti),k.blitFramebuffer(Mt,Ut,st,ut,bt,ee,st,ut,k.DEPTH_BUFFER_BIT,k.NEAREST)):ye?k.copyTexSubImage3D(St,O,bt,ee,me+ti,Mt,Ut,st,ut):k.copyTexSubImage2D(St,O,bt,ee,me+ti,Mt,Ut,st,ut);Ct.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ct.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else ye?R.isDataTexture||R.isData3DTexture?k.texSubImage3D(St,O,bt,ee,me,st,ut,_t,$e,se,ve.data):B.isCompressedArrayTexture?k.compressedTexSubImage3D(St,O,bt,ee,me,st,ut,_t,$e,ve.data):k.texSubImage3D(St,O,bt,ee,me,st,ut,_t,$e,se,ve):R.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,O,bt,ee,st,ut,$e,se,ve.data):R.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,O,bt,ee,ve.width,ve.height,$e,ve.data):k.texSubImage2D(k.TEXTURE_2D,O,bt,ee,st,ut,$e,se,ve);k.pixelStorei(k.UNPACK_ROW_LENGTH,Dn),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,re),k.pixelStorei(k.UNPACK_SKIP_PIXELS,dn),k.pixelStorei(k.UNPACK_SKIP_ROWS,zi),k.pixelStorei(k.UNPACK_SKIP_IMAGES,je),O===0&&B.generateMipmaps&&k.generateMipmap(St),Ct.unbindTexture()},this.copyTextureToTexture3D=function(R,B,G=null,W=null,O=0){return R.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,R=arguments[2],B=arguments[3],O=arguments[4]||0),Ns('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,B,G,W,O)},this.initRenderTarget=function(R){Rt.get(R).__webglFramebuffer===void 0&&I.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?I.setTextureCube(R,0):R.isData3DTexture?I.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?I.setTexture2DArray(R,0):I.setTexture2D(R,0),Ct.unbindTexture()},this.resetState=function(){S=0,A=0,T=null,Ct.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}};var to=class r{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new at(t),this.near=e,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},eo=class extends Oe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Tl=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ll,this.updateRanges=[],this.version=0,this.uuid=di()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Xe=new P,no=class r{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=he(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Tn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Tn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Tn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Tn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array),i=he(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array),i=he(i,this.array),s=he(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new ie(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new r(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ws=class extends $n{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new at(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},is,Is=new P,ss=new P,rs=new P,os=new vt,Ps=new vt,cu=new Yt,Ar=new P,Ls=new P,Rr=new P,Ih=new vt,va=new vt,Ph=new vt,io=class extends Oe{constructor(t=new Ws){if(super(),this.isSprite=!0,this.type="Sprite",is===void 0){is=new ge;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Tl(e,5);is.setIndex([0,1,2,0,2,3]),is.setAttribute("position",new no(n,3,0,!1)),is.setAttribute("uv",new no(n,2,3,!1))}this.geometry=is,this.material=t,this.center=new vt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ss.setFromMatrixScale(this.matrixWorld),cu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),rs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ss.multiplyScalar(-rs.z);let n=this.material.rotation,i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));let o=this.center;Cr(Ar.set(-.5,-.5,0),rs,o,ss,i,s),Cr(Ls.set(.5,-.5,0),rs,o,ss,i,s),Cr(Rr.set(.5,.5,0),rs,o,ss,i,s),Ih.set(0,0),va.set(1,0),Ph.set(1,1);let a=t.ray.intersectTriangle(Ar,Ls,Rr,!1,Is);if(a===null&&(Cr(Ls.set(-.5,.5,0),rs,o,ss,i,s),va.set(0,1),a=t.ray.intersectTriangle(Ar,Rr,Ls,!1,Is),a===null))return;let l=t.ray.origin.distanceTo(Is);l<t.near||l>t.far||e.push({distance:l,point:Is.clone(),uv:li.getInterpolation(Is,Ar,Ls,Rr,Ih,va,Ph,new vt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Cr(r,t,e,n,i,s){os.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Ps.x=s*os.x-i*os.y,Ps.y=i*os.x+s*os.y):Ps.copy(os),r.copy(t),r.x+=Ps.x,r.y+=Ps.y,r.applyMatrix4(cu)}var Al=class extends Ke{constructor(t=null,e=1,n=1,i,s,o,a,l,c=nn,h=nn,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ln=class extends ie{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},as=new Yt,Lh=new Yt,Ir=[],Dh=new Zn,yg=new Yt,Ds=new Nt,Us=new mi,Cn=class extends Nt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ln(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,yg)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,as),Dh.copy(t.boundingBox).applyMatrix4(as),this.boundingBox.union(Dh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new mi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,as),Us.copy(t.boundingSphere).applyMatrix4(as),this.boundingSphere.union(Us)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Ds.geometry=this.geometry,Ds.material=this.material,Ds.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Us.copy(this.boundingSphere),Us.applyMatrix4(n),t.ray.intersectsSphere(Us)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,as),Lh.multiplyMatrices(n,as),Ds.matrixWorld=Lh,Ds.raycast(t,Ir);for(let o=0,a=Ir.length;o<a;o++){let l=Ir[o];l.instanceId=s,l.object=this,e.push(l)}Ir.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ln(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Al(new Float32Array(i*this.count),i,this.count,nc,Rn));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Xs=class extends $n{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new at(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Uh=new Yt,Rl=new Hs,Pr=new mi,Lr=new P,so=class extends Oe{constructor(t=new ge,e=new Xs){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Pr.copy(n.boundingSphere),Pr.applyMatrix4(i),Pr.radius+=s,t.ray.intersectsSphere(Pr)===!1)return;Uh.copy(i).invert(),Rl.copy(t.ray).applyMatrix4(Uh);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=d,x=p;g<x;g++){let m=c.getX(g);Lr.fromBufferAttribute(u,m),Nh(Lr,m,l,i,t,e,this)}}else{let d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,x=p;g<x;g++)Lr.fromBufferAttribute(u,g),Nh(Lr,g,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Nh(r,t,e,n,i,s,o){let a=Rl.distanceSqToPoint(r);if(a<e){let l=new P;Rl.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ni=class extends Ke{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},xn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,s=n.length,o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);let h=n[i],d=n[i+1]-h,p=(o-h)/d;return(i+p)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);let o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new vt:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new P,i=[],s=[],o=[],a=new P,l=new Yt;for(let p=0;p<=t;p++){let g=p/t;i[p]=this.getTangentAt(g,new P)}s[0]=new P,o[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(i[p-1],i[p]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Be(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(i[p],s[p])}if(e===!0){let p=Math.acos(Be(s[0].dot(s[t]),-1,1));p/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(p=-p);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],p*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},ro=class extends xn{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new vt){let n=e,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);let a=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Cl=class extends ro{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function ac(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,p*=h,i(o,a,d,p)},calc:function(s){let o=s*s,a=o*s;return r+t*s+e*o+n*a}}}var Dr=new P,ya=new ac,_a=new ac,Ma=new ac,vs=class extends xn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){let n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(Dr.subVectors(i[0],i[1]).add(i[0]),c=Dr);let u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Dr.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Dr),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),p),x=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),ya.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,m),_a.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,m),Ma.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(ya.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),_a.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ma.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ya.calc(l),_a.calc(l),Ma.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Fh(r,t,e,n,i){let s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function _g(r,t){let e=1-r;return e*e*t}function Mg(r,t){return 2*(1-r)*r*t}function bg(r,t){return r*r*t}function Os(r,t,e,n){return _g(r,t)+Mg(r,e)+bg(r,n)}function wg(r,t){let e=1-r;return e*e*e*t}function Sg(r,t){let e=1-r;return 3*e*e*r*t}function Eg(r,t){return 3*(1-r)*r*r*t}function Tg(r,t){return r*r*r*t}function zs(r,t,e,n,i){return wg(r,t)+Sg(r,e)+Eg(r,n)+Tg(r,i)}var Il=class extends xn{constructor(t=new vt,e=new vt,n=new vt,i=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new vt){let n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(zs(t,i.x,s.x,o.x,a.x),zs(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Pl=class extends xn{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){let n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(zs(t,i.x,s.x,o.x,a.x),zs(t,i.y,s.y,o.y,a.y),zs(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ll=class extends xn{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Dl=class extends xn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ul=class extends xn{constructor(t=new vt,e=new vt,n=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new vt){let n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Os(t,i.x,s.x,o.x),Os(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},oo=class extends xn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Os(t,i.x,s.x,o.x),Os(t,i.y,s.y,o.y),Os(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Nl=class extends xn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){let n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Fh(a,l.x,c.x,h.x,u.x),Fh(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new vt().fromArray(i))}return this}},Ag=Object.freeze({__proto__:null,ArcCurve:Cl,CatmullRomCurve3:vs,CubicBezierCurve:Il,CubicBezierCurve3:Pl,EllipseCurve:ro,LineCurve:Ll,LineCurve3:Dl,QuadraticBezierCurve:Ul,QuadraticBezierCurve3:oo,SplineCurve:Nl});var Fi=class r extends ge{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],p=[],g=0,x=[],m=n/2,f=0;_(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(p,2));function _(){let v=new P,M=new P,S=0,A=(e-t)/n;for(let T=0;T<=s;T++){let w=[],b=T/s,C=b*(e-t)+t;for(let D=0;D<=i;D++){let U=D/i,L=U*l+a,H=Math.sin(L),z=Math.cos(L);M.x=C*H,M.y=-b*n+m,M.z=C*z,u.push(M.x,M.y,M.z),v.set(H,A,z).normalize(),d.push(v.x,v.y,v.z),p.push(U,1-b),w.push(g++)}x.push(w)}for(let T=0;T<i;T++)for(let w=0;w<s;w++){let b=x[w][T],C=x[w+1][T],D=x[w+1][T+1],U=x[w][T+1];(t>0||w!==0)&&(h.push(b,C,U),S+=3),(e>0||w!==s-1)&&(h.push(C,D,U),S+=3)}c.addGroup(f,S,0),f+=S}function y(v){let M=g,S=new vt,A=new P,T=0,w=v===!0?t:e,b=v===!0?1:-1;for(let D=1;D<=i;D++)u.push(0,m*b,0),d.push(0,b,0),p.push(.5,.5),g++;let C=g;for(let D=0;D<=i;D++){let L=D/i*l+a,H=Math.cos(L),z=Math.sin(L);A.x=w*z,A.y=m*b,A.z=w*H,u.push(A.x,A.y,A.z),d.push(0,b,0),S.x=H*.5+.5,S.y=z*.5*b+.5,p.push(S.x,S.y),g++}for(let D=0;D<i;D++){let U=M+D,L=C+D;v===!0?h.push(L,L+1,U):h.push(L+1,L,U),T+=3}c.addGroup(f,T,v===!0?1:2),f+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ao=class r extends Fi{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new r(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Fl=class r extends ge{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let s=[],o=[];a(i),c(n),h(),this.setAttribute("position",new oe(s,3)),this.setAttribute("normal",new oe(s.slice(),3)),this.setAttribute("uv",new oe(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let y=new P,v=new P,M=new P;for(let S=0;S<e.length;S+=3)p(e[S+0],y),p(e[S+1],v),p(e[S+2],M),l(y,v,M,_)}function l(_,y,v,M){let S=M+1,A=[];for(let T=0;T<=S;T++){A[T]=[];let w=_.clone().lerp(v,T/S),b=y.clone().lerp(v,T/S),C=S-T;for(let D=0;D<=C;D++)D===0&&T===S?A[T][D]=w:A[T][D]=w.clone().lerp(b,D/C)}for(let T=0;T<S;T++)for(let w=0;w<2*(S-T)-1;w++){let b=Math.floor(w/2);w%2===0?(d(A[T][b+1]),d(A[T+1][b]),d(A[T][b])):(d(A[T][b+1]),d(A[T+1][b+1]),d(A[T+1][b]))}}function c(_){let y=new P;for(let v=0;v<s.length;v+=3)y.x=s[v+0],y.y=s[v+1],y.z=s[v+2],y.normalize().multiplyScalar(_),s[v+0]=y.x,s[v+1]=y.y,s[v+2]=y.z}function h(){let _=new P;for(let y=0;y<s.length;y+=3){_.x=s[y+0],_.y=s[y+1],_.z=s[y+2];let v=m(_)/2/Math.PI+.5,M=f(_)/Math.PI+.5;o.push(v,1-M)}g(),u()}function u(){for(let _=0;_<o.length;_+=6){let y=o[_+0],v=o[_+2],M=o[_+4],S=Math.max(y,v,M),A=Math.min(y,v,M);S>.9&&A<.1&&(y<.2&&(o[_+0]+=1),v<.2&&(o[_+2]+=1),M<.2&&(o[_+4]+=1))}}function d(_){s.push(_.x,_.y,_.z)}function p(_,y){let v=_*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function g(){let _=new P,y=new P,v=new P,M=new P,S=new vt,A=new vt,T=new vt;for(let w=0,b=0;w<s.length;w+=9,b+=6){_.set(s[w+0],s[w+1],s[w+2]),y.set(s[w+3],s[w+4],s[w+5]),v.set(s[w+6],s[w+7],s[w+8]),S.set(o[b+0],o[b+1]),A.set(o[b+2],o[b+3]),T.set(o[b+4],o[b+5]),M.copy(_).add(y).add(v).divideScalar(3);let C=m(M);x(S,b+0,_,C),x(A,b+2,y,C),x(T,b+4,v,C)}}function x(_,y,v,M){M<0&&_.x===1&&(o[y]=_.x-1),v.x===0&&v.z===0&&(o[y]=M/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function f(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.vertices,t.indices,t.radius,t.details)}};var qs=class r extends Fl{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new r(t.radius,t.detail)}};var lo=class r extends ge{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],u=t,d=(e-t)/i,p=new P,g=new vt;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){let f=s+m/n*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<i;x++){let m=x*(n+1);for(let f=0;f<n;f++){let _=f+m,y=_,v=_+n+1,M=_+n+2,S=_+1;a.push(y,v,S),a.push(v,M,S)}}this.setIndex(a),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(c,3)),this.setAttribute("uv",new oe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var vn=class r extends ge{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new P,d=new P,p=[],g=[],x=[],m=[];for(let f=0;f<=n;f++){let _=[],y=f/n,v=0;f===0&&o===0?v=.5/e:f===n&&l===Math.PI&&(v=-.5/e);for(let M=0;M<=e;M++){let S=M/e;u.x=-t*Math.cos(i+S*s)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(i+S*s)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(S+v,1-y),_.push(c++)}h.push(_)}for(let f=0;f<n;f++)for(let _=0;_<e;_++){let y=h[f][_+1],v=h[f][_],M=h[f+1][_],S=h[f+1][_+1];(f!==0||o>0)&&p.push(y,v,S),(f!==n-1||l<Math.PI)&&p.push(v,M,S)}this.setIndex(p),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(x,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ys=class r extends ge{constructor(t=new oo(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};let o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new P,l=new P,c=new vt,h=new P,u=[],d=[],p=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(p,2));function x(){for(let y=0;y<e;y++)m(y);m(s===!1?e:0),_(),f()}function m(y){h=t.getPointAt(y/e,h);let v=o.normals[y],M=o.binormals[y];for(let S=0;S<=i;S++){let A=S/i*Math.PI*2,T=Math.sin(A),w=-Math.cos(A);l.x=w*v.x+T*M.x,l.y=w*v.y+T*M.y,l.z=w*v.z+T*M.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function f(){for(let y=1;y<=e;y++)for(let v=1;v<=i;v++){let M=(i+1)*(y-1)+(v-1),S=(i+1)*y+(v-1),A=(i+1)*y+v,T=(i+1)*(y-1)+v;g.push(M,S,T),g.push(S,A,T)}}function _(){for(let y=0;y<=e;y++)for(let v=0;v<=i;v++)c.x=y/e,c.y=v/i,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new r(new Ag[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Xt=class extends $n{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new at(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qh,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},co=class extends Xt{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new vt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Be(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new at(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new at(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new at(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function Ur(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function Rg(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var ys=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=s)){let a=e[1];t<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Bl=class extends ys{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nc,endingEnd:Nc}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,o=t+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Fc:s=t,a=2*e-n;break;case Bc:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Fc:o=t,l=2*n-e;break;case Bc:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-e)/(i-e),x=g*g,m=x*g,f=-d*m+2*d*x-d*g,_=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,y=(-1-p)*m+(1.5+p)*x+.5*g,v=p*m-p*x;for(let M=0;M!==a;++M)s[M]=f*o[h+M]+_*o[c+M]+y*o[l+M]+v*o[u+M];return s}},Ol=class extends ys{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}},zl=class extends ys{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},yn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ur(e,this.TimeBufferType),this.values=Ur(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ur(t.times,Array),values:Ur(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new zl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ol(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Bl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Hr:e=this.InterpolantFactoryMethodDiscrete;break;case al:e=this.InterpolantFactoryMethodLinear;break;case Go:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Hr;case this.InterpolantFactoryMethodLinear:return al;case this.InterpolantFactoryMethodSmooth:return Go}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&Rg(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Go,s=t.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let p=0;p!==n;++p)e[d+p]=e[u+p]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};yn.prototype.TimeBufferType=Float32Array;yn.prototype.ValueBufferType=Float32Array;yn.prototype.DefaultInterpolation=al;var Bi=class extends yn{constructor(t,e,n){super(t,e,n)}};Bi.prototype.ValueTypeName="bool";Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=Hr;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var kl=class extends yn{};kl.prototype.ValueTypeName="color";var Hl=class extends yn{};Hl.prototype.ValueTypeName="number";var Vl=class extends ys{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)Ze.slerpFlat(s,0,o,c-a,o,c,l);return s}},ho=class extends yn{InterpolantFactoryMethodLinear(t){return new Vl(this.times,this.values,this.getValueSize(),t)}};ho.prototype.ValueTypeName="quaternion";ho.prototype.InterpolantFactoryMethodSmooth=void 0;var Oi=class extends yn{constructor(t,e,n){super(t,e,n)}};Oi.prototype.ValueTypeName="string";Oi.prototype.ValueBufferType=Array;Oi.prototype.DefaultInterpolation=Hr;Oi.prototype.InterpolantFactoryMethodLinear=void 0;Oi.prototype.InterpolantFactoryMethodSmooth=void 0;var Gl=class extends yn{};Gl.prototype.ValueTypeName="vector";var Wl=class{constructor(t,e,n){let i=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},Cg=new Wl,Xl=class{constructor(t){this.manager=t!==void 0?t:Cg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Xl.DEFAULT_MATERIAL_NAME="__DEFAULT";var uo=class extends Oe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new at(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},fo=class extends uo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new at(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},ba=new Yt,Bh=new P,Oh=new P,ql=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.map=null,this.mapPass=null,this.matrix=new Yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gs,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Bh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Bh),Oh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Oh),e.updateMatrixWorld(),ba.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ba),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ba)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Yl=class extends ql{constructor(){super(new Jr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},po=class extends uo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.target=new Oe,this.shadow=new Yl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var mo=class extends ge{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var lc="\\[\\]\\.:\\/",Ig=new RegExp("["+lc+"]","g"),cc="[^"+lc+"]",Pg="[^"+lc.replace("\\.","")+"]",Lg=/((?:WC+[\/:])*)/.source.replace("WC",cc),Dg=/(WCOD+)?/.source.replace("WCOD",Pg),Ug=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cc),Ng=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cc),Fg=new RegExp("^"+Lg+Dg+Ug+Ng+"$"),Bg=["material","materials","bones","map"],Zl=class{constructor(t,e,n){let i=n||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Me=class r{constructor(t,e,n){this.path=e,this.parsedPath=n||r.parseTrackName(e),this.node=r.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new r.Composite(t,e,n):new r(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ig,"")}static parseTrackName(t){let e=Fg.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Bg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=r.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=Zl;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var px=new Float32Array(1);var zh=new Yt,go=class{constructor(t,e,n=0,i=1/0){this.ray=new Hs(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Vs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return zh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zh),this}intersectObject(t,e=!0,n=[]){return $l(t,this,n,e),n.sort(kh),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)$l(t[i],this,n,e);return n.sort(kh),n}};function kh(r,t){return r.distance-t.distance}function $l(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let o=0,a=s.length;o<a;o++)$l(s[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jl);function hu(r,t=1e-4){t=Math.max(t,Number.EPSILON);let e={},n=r.getIndex(),i=r.getAttribute("position"),s=n?n.count:i.count,o=0,a=Object.keys(r.attributes),l={},c={},h=[],u=["getX","getY","getZ","getW"],d=["setX","setY","setZ","setW"];for(let _=0,y=a.length;_<y;_++){let v=a[_],M=r.attributes[v];l[v]=new M.constructor(new M.array.constructor(M.count*M.itemSize),M.itemSize,M.normalized);let S=r.morphAttributes[v];S&&(c[v]||(c[v]=[]),S.forEach((A,T)=>{let w=new A.array.constructor(A.count*A.itemSize);c[v][T]=new A.constructor(w,A.itemSize,A.normalized)}))}let p=t*.5,g=Math.log10(1/t),x=Math.pow(10,g),m=p*x;for(let _=0;_<s;_++){let y=n?n.getX(_):_,v="";for(let M=0,S=a.length;M<S;M++){let A=a[M],T=r.getAttribute(A),w=T.itemSize;for(let b=0;b<w;b++)v+=`${~~(T[u[b]](y)*x+m)},`}if(v in e)h.push(e[v]);else{for(let M=0,S=a.length;M<S;M++){let A=a[M],T=r.getAttribute(A),w=r.morphAttributes[A],b=T.itemSize,C=l[A],D=c[A];for(let U=0;U<b;U++){let L=u[U],H=d[U];if(C[H](o,T[L](y)),w)for(let z=0,q=w.length;z<q;z++)D[z][H](o,w[z][L](y))}}e[v]=o,h.push(o),o++}}let f=r.clone();for(let _ in r.attributes){let y=l[_];if(f.setAttribute(_,new y.constructor(y.array.slice(0,o*y.itemSize),y.itemSize,y.normalized)),_ in c)for(let v=0;v<c[_].length;v++){let M=c[_][v];f.morphAttributes[_][v]=new M.constructor(M.array.slice(0,o*M.itemSize),M.itemSize,M.normalized)}}return f.setIndex(h),f}function cn(r,t){let e=document.createElement("canvas");return e.width=r,e.height=t,e}function hn(r,{repeat:t=!1,srgb:e=!0,aniso:n=4}={}){let i=new Ni(r);return t&&(i.wrapS=i.wrapT=Xn),e&&(i.colorSpace=De),i.anisotropy=n,i.needsUpdate=!0,i}function _o({band:r=!1,stamp:t=!1,size:e=1024}={}){let n=e,i=e/2,s=cn(n,i),o=s.getContext("2d"),a=Ue(r?7:3);o.fillStyle="#cfe03c",o.fillRect(0,0,n,i);let l=o.getImageData(0,0,n,i),c=l.data;for(let g=0;g<i;g++)for(let x=0;x<n;x++){let m=Qe(x*.09,g*.09,5)*10+Qe(x*.5,g*.5,9)*9+(a()-.5)*22,f=(g*n+x)*4;c[f]=Math.max(0,Math.min(255,c[f]+m)),c[f+1]=Math.max(0,Math.min(255,c[f+1]+m)),c[f+2]=Math.max(0,Math.min(255,c[f+2]+m*.5))}o.putImageData(l,0,0);for(let g=0;g<6e3;g++){let x=a()*n,m=a()*i,f=a()*Math.PI,_=2+a()*5;o.strokeStyle=a()<.5?"rgba(240,255,140,0.35)":"rgba(120,140,20,0.25)",o.lineWidth=.8,o.beginPath(),o.moveTo(x,m),o.lineTo(x+Math.cos(f)*_,m+Math.sin(f)*_),o.stroke()}if(r){o.fillStyle="#1f4aa8";for(let g=0;g<n;g++){let x=i/2+Math.sin(g/n*Math.PI*2)*i*.14;o.fillRect(g,x-i*.035,1,i*.07)}o.fillStyle="rgba(255,255,255,0.75)";for(let g=0;g<n;g++){let x=i/2+Math.sin(g/n*Math.PI*2)*i*.14;o.fillRect(g,x-i*.037,1,1.5),o.fillRect(g,x+i*.035,1,1.5)}}let h=.7,u=.3,d=2*Math.sqrt(h*u),p=(g,x)=>{o.fillStyle=x;for(let m=0;m<2400;m++){let f=m/2400*Math.PI*2,_=h*Math.cos(f)+u*Math.cos(3*f),y=h*Math.sin(f)-u*Math.sin(3*f),v=d*Math.sin(2*f),M=Math.hypot(_,v,y);_/=M,v/=M,y/=M;let S=Math.acos(v),w=(Math.atan2(y,-_)/(Math.PI*2)+1)%1*n,b=S/Math.PI*i,C=g/(Math.PI*2)*n/Math.max(.12,Math.sin(S)),D=g/Math.PI*i;for(let U of[-n,0,n])o.beginPath(),o.ellipse(w+U,b,C,D,0,0,Math.PI*2),o.fill()}};return p(.13,"#b6bf8e"),p(.1,"#f4f2e6"),t?(o.save(),o.translate(n*.25,i*.5),o.scale(1.6,1),o.fillStyle="#16161a",o.font=`bold ${Math.round(i*.07)}px Arial, sans-serif`,o.textAlign="center",o.fillText("CREEK ROLLING",0,-i*.02),o.font=`${Math.round(i*.05)}px Arial, sans-serif`,o.fillText("BATCH No. 42",0,i*.05),o.restore()):(o.save(),o.translate(n*.25,i*.5),o.scale(1.6,1),o.fillStyle="rgba(30,30,30,0.55)",o.font=`bold ${Math.round(i*.055)}px Arial, sans-serif`,o.textAlign="center",o.fillText("CRT",0,i*.02),o.restore()),hn(s,{aniso:8})}function Mo(r=256,t=1,e=.35){let n=cn(r,r),i=n.getContext("2d"),s=i.createImageData(r,r),o=(l,c,h,u)=>{let d=Math.round(r*h),p=l*h,g=c*h,x=Math.floor(p),m=Math.floor(g),f=p-x,_=g-m,y=(T,w)=>(Qe((T%d+d)%d+.5,(w%d+d)%d+.5,u)+1)/2,v=f*f*(3-2*f),M=_*_*(3-2*_),S=y(x,m)+(y(x+1,m)-y(x,m))*v,A=y(x,m+1)+(y(x+1,m+1)-y(x,m+1))*v;return S+(A-S)*M},a=Ue(t);for(let l=0;l<r;l++)for(let c=0;c<r;c++){let h=o(c,l,.03125,t)*.5+o(c,l,.125,t+3)*.3+o(c,l,.5,t+7)*.2;h=1-e+h*e*2+(a()-.5)*.06;let u=(l*r+c)*4,d=Math.max(0,Math.min(255,h*200));s.data[u]=s.data[u+1]=s.data[u+2]=d,s.data[u+3]=255}return i.putImageData(s,0,0),hn(n,{repeat:!0,srgb:!1})}function uu(r=256){let t=cn(r,r),e=t.getContext("2d"),n=e.createImageData(r,r),i=new Float32Array(r*r),s=[],o=Ue(42);for(let a=0;a<26;a++){let l=Math.round((o()-.5)*16),c=Math.round((o()-.5)*16);s.push({kx:l,ky:c,a:1/(1+Math.hypot(l,c)),p:o()*6.283})}for(let a=0;a<r;a++)for(let l=0;l<r;l++){let c=0;for(let h of s)c+=h.a*Math.sin((h.kx*l+h.ky*a)/r*Math.PI*2+h.p);i[a*r+l]=c}for(let a=0;a<r;a++)for(let l=0;l<r;l++){let c=i[a*r+(l+1)%r]-i[a*r+(l-1+r)%r],h=i[(a+1)%r*r+l]-i[(a-1+r)%r*r+l],u=-c*1.2,d=-h*1.2,p=1,g=Math.hypot(u,d,p);u/=g,d/=g,p/=g;let x=(a*r+l)*4;n.data[x]=(u*.5+.5)*255,n.data[x+1]=(d*.5+.5)*255,n.data[x+2]=(p*.5+.5)*255,n.data[x+3]=255}return e.putImageData(n,0,0),hn(t,{repeat:!0,srgb:!1})}function bo(r=64,t=0){let e=cn(r,r),n=e.getContext("2d"),i=n.createRadialGradient(r/2,r/2,r*t*.5,r/2,r/2,r/2);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.5,"rgba(255,255,255,0.5)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,r,r),hn(e,{srgb:!1})}function du(r=128){let t=cn(r,r),e=t.getContext("2d"),n=e.createRadialGradient(r/2,r/2,r*.3,r/2,r/2,r/2);return n.addColorStop(0,"rgba(255,255,255,0)"),n.addColorStop(.72,"rgba(255,255,255,0.0)"),n.addColorStop(.86,"rgba(255,255,255,0.9)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,r,r),hn(t,{srgb:!1})}function wo(r=64){let t=cn(r,r),e=t.getContext("2d"),n=Ue(5);for(let i=0;i<18;i++){let s=r/2+(n()-.5)*r*.5,o=r/2+(n()-.5)*r*.5,a=r*(.06+n()*.12),l=e.createRadialGradient(s,o,0,s,o,a);l.addColorStop(0,"rgba(255,255,255,0.9)"),l.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=l,e.beginPath(),e.arc(s,o,a,0,Math.PI*2),e.fill()}return hn(t,{srgb:!1})}function fu(r=64){let t=cn(r,r),e=t.getContext("2d");e.translate(r/2,r/2),e.rotate(.6);let n=e.createLinearGradient(-r*.4,0,r*.4,0);return n.addColorStop(0,"#b5651d"),n.addColorStop(.5,"#d9a23a"),n.addColorStop(1,"#8a5a1c"),e.fillStyle=n,e.beginPath(),e.moveTo(-r*.42,0),e.quadraticCurveTo(0,-r*.28,r*.42,0),e.quadraticCurveTo(0,r*.28,-r*.42,0),e.fill(),e.strokeStyle="rgba(90,50,10,0.8)",e.lineWidth=1.5,e.beginPath(),e.moveTo(-r*.45,0),e.lineTo(r*.4,0),e.stroke(),hn(t)}function pu(r=64,t=128){let e=cn(r,t),n=e.getContext("2d"),i=Ue(11);for(let s=0;s<26;s++){let o=r*(.15+i()*.7),a=(i()-.5)*r*.5,l=t*(.45+i()*.55),c=`hsl(${85+i()*30}, ${35+i()*25}%, ${22+i()*22}%)`;n.strokeStyle=c,n.lineWidth=1.5+i()*2,n.beginPath(),n.moveTo(o,t),n.quadraticCurveTo(o+a*.3,t-l*.6,o+a,t-l),n.stroke()}return hn(e)}function mu(r=64,t=256){let e=cn(r,t),n=e.getContext("2d"),i=Ue(8);n.fillStyle="rgba(255,255,255,0.25)",n.fillRect(0,0,r,t);for(let s=0;s<90;s++){let o=i()*r,a=i()*t,l=20+i()*90;n.strokeStyle=`rgba(255,255,255,${.3+i()*.6})`,n.lineWidth=1+i()*3,n.beginPath(),n.moveTo(o,a),n.lineTo(o+(i()-.5)*3,a+l),n.stroke(),n.beginPath(),n.moveTo(o,a-t),n.lineTo(o,a-t+l),n.stroke()}return hn(e,{repeat:!0,srgb:!1})}function hc(r=256,t="#9a6a3c"){let e=cn(r,r),n=e.getContext("2d");n.fillStyle=t,n.fillRect(0,0,r,r);let i=Ue(21);for(let s=0;s<70;s++){let o=i()*r;n.strokeStyle=`rgba(${i()<.5?"60,35,15":"200,160,110"},${.1+i()*.25})`,n.lineWidth=1+i()*2.5,n.beginPath(),n.moveTo(0,o);for(let a=0;a<=r;a+=16)n.lineTo(a,o+Math.sin(a*.03+s)*3);n.stroke()}return hn(e,{repeat:!0})}function $s(r=128){let t=cn(r,r),e=t.getContext("2d");e.fillStyle="#4a3a2a",e.fillRect(0,0,r,r);let n=Ue(31);for(let i=0;i<60;i++){let s=n()*r;e.strokeStyle=`rgba(${n()<.5?"25,18,10":"110,90,70"},0.5)`,e.lineWidth=1+n()*3,e.beginPath(),e.moveTo(s,0),e.lineTo(s+(n()-.5)*8,r),e.stroke()}return hn(t,{repeat:!0})}function So(r,{w:t=512,h:e=128,bg:n="#2d3a1f",fg:i="#f6f1d8",font:s="bold 54px Georgia, serif",border:o="#c9a45a"}={}){let a=cn(t,e),l=a.getContext("2d");l.fillStyle=n,l.fillRect(0,0,t,e),l.strokeStyle=o,l.lineWidth=8,l.strokeRect(4,4,t-8,e-8),l.fillStyle=i,l.textAlign="center",l.textBaseline="middle",l.font=s;let c=Array.isArray(r)?r:[r];return c.forEach((h,u)=>l.fillText(h,t/2,e/(c.length+1)*(u+1))),hn(a)}var jn={gravel:new at(.5,.42,.31),rock:new at(.5,.49,.46),sand:new at(.64,.57,.43),dirt:new at(.4,.31,.21),grass:new at(.2,.31,.11),grass2:new at(.32,.38,.14),litter:new at(.36,.3,.18),moss:new at(.25,.33,.14)};function Og(r){let t=r==="low"?.09:r==="medium"?.06:.045,e=[];for(let n=-10;n<-3.2;n+=.4)e.push(n);for(let n=-3.2;n<4.4;n+=t)e.push(n);for(let n=4.4;n<=10.001;n+=.4)e.push(n);return e[e.length-1]<10&&e.push(10),e}var Eo=[new at(.46,.45,.42),new at(.55,.52,.46),new at(.36,.36,.35)];function dc(r,t,e){let n=Un(r*.15,t*.15,2,5);e.copy(jn.grass).lerp(jn.grass2,.5+n*.5);let i=Un(r*.06+7,t*.06,2,9);return i>.15&&e.lerp(jn.litter,Math.min(.55,(i-.15)*2)),e}function zg(r,t,e,n,i,s,o=0,a=0,l=0){let c=r.y0(t),h=r.c(t),u=Qe(t*3.1,e*3.1,3)*.5+Qe(t*13,e*13,4)*.5,p=Math.abs(e-h)-(e<h?r.wL(t):r.wR(t)),g=n-c,x=Zt(.7,1.8,o),m=p<.04,f=i===Pt.ROCK;if(m)s.copy(i===Pt.GRAVEL?jn.gravel:i===Pt.SAND?jn.sand:i===Pt.ROCK?Eo[0]:jn.dirt);else{dc(a,l,s);let v=1-Zt(.05,.35+Math.max(0,u)*.3,p);s.lerp(i===Pt.GRAVEL?jn.gravel:jn.dirt,Math.max(v,Zt(-.02,.06,-g+.06)*.6));let M=Math.max(x,f?1-Zt(.25,1.4+u*.6,p):0);if(M>0){let S=Qe(t*1.7+n*2.1,e*1.7,12)*.5+.5,A=Eo[0].clone().lerp(S>.5?Eo[1]:Eo[2],Math.abs(S-.5)*2);x>.3&&A.multiplyScalar(.82-.1*x),s.lerp(A,M),!x&&g>.3&&s.lerp(jn.moss,de(.25+u*.4,0,.5)*(1-x))}}let _=1+u*.16+(i===Pt.GRAVEL&&m?Qe(t*40,e*40,8)*.2:0);if(s.multiplyScalar(_),g<.035&&r.inChannel(t,e,.2)){let v=1-Zt(-.01,.035,g);if(s.multiplyScalar(1-.42*v),g<0){let M=Math.min(1,-g/.1);s.r*=.78-.2*M,s.g*=.8-.15*M,s.b*=.62-.12*M}}let y=Zt(7.5,9.8,Math.abs(e));return y>0&&s.lerp(dc(a,l,new at),y),s}function gu(r,t){let e=t==="low"?.2:t==="medium"?.13:.1,n=Og(t),i=Math.floor((Je-qt)/e)+1,s=n.length,o=new Float32Array(i*s*3),a=new Float32Array(i*s*3),l=new Float32Array(i*s*2),c={},h=new at,u={};for(let f=0;f<i;f++){let _=Math.min(Je,qt+f*e);for(let y=0;y<s;y++){let v=n[y];r.worldXZ(_,v,c),r.bedAt(_,v,u);let M=f*s+y,S=u.h;(y===0||y===s-1)&&(S-=.25),o[M*3]=c.x,o[M*3+1]=S,o[M*3+2]=c.z,zg(r,_,v,u.h,u.mat,h,Math.hypot(u.hs,u.hd),c.x,c.z),a[M*3]=h.r,a[M*3+1]=h.g,a[M*3+2]=h.b,l[M*2]=c.x*1.5,l[M*2+1]=c.z*1.5}}let d=[];for(let f=0;f<i-1;f++)for(let _=0;_<s-1;_++){let y=f*s+_,v=y+1,M=y+s,S=M+1;d.push(y,v,M,v,S,M)}let p=new ge;p.setAttribute("position",new ie(o,3)),p.setAttribute("color",new ie(a,3)),p.setAttribute("uv",new ie(l,2)),p.setIndex(d),p.computeVertexNormals();let g=Mo(256,3,.42),x=new Xt({vertexColors:!0,map:g,roughness:.92,metalness:0}),m=new Nt(p,x);return m.receiveShadow=!0,m.name="terrain",m}function xu(r,t,e,n={}){let i=r.locate(t,e,-1,n),s=de(i.s,qt,Je),o=r.bedRaw(s,i.d,{}),a=Math.abs(i.d-r.c(s));return o+=(Un(t*.025,e*.025,3,91)*5+1.2)*Zt(9,35,a),i.s<qt&&(o+=(qt-i.s)*.12),{h:o,s:i.s,d:i.d,ad:a}}function vu(r,t){let e=t==="low"?2:1.25,n=-90,i=90,s=-160,o=50,a=Math.round((i-n)/e)+1,l=Math.round((o-s)/e)+1,c=new Float32Array(a*l*3),h=new Float32Array(a*l*3),u=new Float32Array(a*l*2),d=new Uint8Array(a*l),p=new at;for(let _=0;_<l;_++)for(let y=0;y<a;y++){let v=n+y*e,M=s+_*e,S=xu(r,v,M),A=_*a+y;d[A]=S.s>qt+.3&&S.s<Je-.3&&Math.abs(S.d)<9.7?1:0,c[A*3]=v,c[A*3+1]=S.h-.04,c[A*3+2]=M,dc(v,M,p),S.ad>30&&p.lerp(new at(.24,.32,.15),Zt(30,70,S.ad)),h[A*3]=p.r,h[A*3+1]=p.g,h[A*3+2]=p.b,u[A*2]=v*1.5,u[A*2+1]=M*1.5}let g=[];for(let _=0;_<l-1;_++)for(let y=0;y<a-1;y++){let v=_*a+y,M=v+1,S=v+a,A=S+1;d[v]&&d[M]&&d[S]&&d[A]||g.push(v,S,M,M,S,A)}let x=new ge;x.setAttribute("position",new ie(c,3)),x.setAttribute("color",new ie(h,3)),x.setAttribute("uv",new ie(u,2)),x.setIndex(g),x.computeVertexNormals();let m=new Xt({vertexColors:!0,map:Mo(256,9,.3),roughness:.95}),f=new Nt(x,m);return f.receiveShadow=!0,f}function uc(r){let t=new qs(1,3);t.deleteAttribute("normal"),t.deleteAttribute("uv"),t=hu(t);let e=t.attributes.position,n=new P;for(let i=0;i<e.count;i++){n.fromBufferAttribute(e,i);let s=Un(n.x*1.6+r,n.y*1.6+n.z*.7,3,r)*.16+Qe(n.x*5+r,n.z*5+n.y*3,r+1)*.04;n.multiplyScalar(1+s),n.y<-.4&&(n.y=-.4+(n.y+.4)*.6),e.setXYZ(i,n.x,n.y,n.z)}return t.computeVertexNormals(),t}function yu(r){let t=[uc(1),uc(7),uc(13)],e=Mo(128,17,.45),n=r.rocks,i=t.map(()=>[]),s=Ue(77);n.forEach((d,p)=>i[p%3].push(d));let o=[],a=new Yt,l=new Ze,c=new an,h=new P,u=new P;return i.forEach((d,p)=>{let g=new Xt({color:9078656,map:e,roughness:.88});g.onBeforeCompile=_=>{_.vertexShader=_.vertexShader.replace("#include <common>",`#include <common>
attribute float aWaterY;
attribute float aMoss;
varying float vWaterY;
varying float vMoss;
varying vec3 vWPos;
varying vec3 vWNorm;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vWaterY = aWaterY;
vMoss = aMoss;
vec4 wp4 = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
vWPos = wp4.xyz;
vWNorm = normalize(mat3(modelMatrix * instanceMatrix) * objectNormal);`),_.fragmentShader=_.fragmentShader.replace("#include <common>",`#include <common>
varying float vWaterY;
varying float vMoss;
varying vec3 vWPos;
varying vec3 vWNorm;`).replace("#include <map_fragment>",`#include <map_fragment>
          float wetBand = 1.0 - smoothstep(vWaterY + 0.015, vWaterY + 0.05, vWPos.y);
          float under = 1.0 - step(vWaterY, vWPos.y);
          diffuseColor.rgb *= mix(1.0, 0.52, wetBand);
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.78, 0.86, 0.72), under);
          float mossAmt = vMoss * smoothstep(0.55, 0.9, vWNorm.y) * (1.0 - wetBand);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.2, 0.3, 0.1), mossAmt * 0.7);`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
          roughnessFactor = mix(roughnessFactor, 0.28, wetBand * (1.0 - under));`)};let x=new Cn(t[p],g,d.length),m=new Float32Array(d.length),f=new Float32Array(d.length);d.forEach((_,y)=>{c.set(s()*6.28,s()*6.28,s()*.4),l.setFromEuler(c);let v=.95+s()*.1;h.set(_.r*v*1.03,_.r*(.9+s()*.08),_.r*(1+s()*.06)),u.set(_.x,_.y,_.z),a.compose(u,l,h),x.setMatrixAt(y,a);let M=r.waterLevel(_.s,_.d);m[y]=M>-1e8?M:r.y0(_.s)+(r.inChannel(_.s,_.d,.4)?0:-50),f[y]=_.tag==="boulder"||_.tag==="bank"?.4+s()*.6:.15}),x.geometry=x.geometry.clone(),x.geometry.setAttribute("aWaterY",new ln(m,1)),x.geometry.setAttribute("aMoss",new ln(f,1)),x.castShadow=!0,x.receiveShadow=!0,x.instanceMatrix.needsUpdate=!0,o.push(x)}),o}function _u(r,t){let e=new Gt,n=Ue(5150),i=t==="low"?160:320,s=[],o=[],a=[],l=N=>{for(let Z of Bt)if(Math.abs(N.s-Z.s)<2.5&&N.d>r.c(Z.s))return!0;return Math.abs(N.s-ne)<3},c=0;for(;s.length<i&&c++<2e4;){let N=-80+n()*160,Z=-155+n()*200,j=xu(r,N,Z);if(j.ad<4.2||l(j)||j.ad<9&&n()<.5)continue;let it=n()<.55,yt=(it?7:5)+n()*6,Tt={x:N,y:j.h,z:Z,h:yt,conifer:it,r:.12+n()*.12};s.push(Tt),it?o.push(Tt):a.push(Tt)}let h=$s(),u=new Fi(.6,1,1,7,1);u.translate(0,.5,0);let d=new Cn(u,new Xt({map:h,roughness:1}),s.length),p=new ao(1,1,9,3);p.translate(0,.5,0);let g=(N,Z,j)=>{let it=N.attributes.position,yt=Ue(j);for(let Tt=0;Tt<it.count;Tt++)it.setXYZ(Tt,it.getX(Tt)*(1+(yt()-.5)*Z),it.getY(Tt),it.getZ(Tt)*(1+(yt()-.5)*Z));return N.computeVertexNormals(),N};g(p,.25,3);let x=new Cn(p,new Xt({color:3099174,roughness:.95,flatShading:!0}),o.length*3),m=g(new qs(1,1),.35,9),f=new Cn(m,new Xt({color:5204778,roughness:.95,flatShading:!0}),a.length*3),_=new Yt,y=new Ze,v=new P,M=new P,S=new at;s.forEach((N,Z)=>{y.setFromAxisAngle(new P(0,1,0),n()*6.28),_.compose(M.set(N.x,N.y-.2,N.z),y,v.set(N.r,N.h*(N.conifer?.9:.65),N.r)),d.setMatrixAt(Z,_)});let A=0;o.forEach(N=>{for(let Z=0;Z<3;Z++){let j=N.y+N.h*(.22+Z*.22),it=N.h*(.27-Z*.07),yt=N.h*(.42-Z*.07);y.setFromAxisAngle(new P(0,1,0),n()*6.28),_.compose(M.set(N.x,j,N.z),y,v.set(it,yt,it)),x.setMatrixAt(A,_),x.setColorAt(A,S.setHSL(.3+n()*.06,.35,.18+n()*.08)),A++}});let T=0;a.forEach(N=>{for(let Z=0;Z<3;Z++){let j=N.h*(.2+n()*.1);y.setFromAxisAngle(new P(0,1,0),n()*6.28),_.compose(M.set(N.x+(n()-.5)*j,N.y+N.h*(.6+n()*.25),N.z+(n()-.5)*j),y,v.set(j,j*.8,j)),f.setMatrixAt(T,_),f.setColorAt(T,S.setHSL(.2+n()*.08,.4,.26+n()*.1)),T++}});for(let N of[d,x,f])N.castShadow=!0,N.receiveShadow=!0,e.add(N);let w=t==="low"?1200:t==="medium"?2600:4200,b=pu(),C=new ke(1,1);C.translate(0,.5,0);let D=C.clone().rotateY(Math.PI/2),U=kg([C,D]);{let N=U.attributes.normal;for(let Z=0;Z<N.count;Z++)N.setXYZ(Z,0,1,0)}let L=new Xt({map:b,alphaTest:.45,side:be,roughness:1});L.onBeforeCompile=N=>{N.fragmentShader=N.fragmentShader.replace("#include <normal_fragment_begin>",Ot.normal_fragment_begin.replace("normal *= faceDirection;",""))};let H=new Cn(U,L,w),z=0;c=0;let q={};for(;z<w&&c++<w*8;){let N=qt+1+n()*(Je-qt-2),Z=n()<.5?-1:1,j=r.c(N),it=Z<0?r.wL(N):r.wR(N),yt=j+Z*(it+.25+n()*n()*7.5);if(Math.abs(yt)>9.8)continue;let Tt=r.bedAt(N,yt,{});if(Tt.mat===Pt.ROCK||Tt.mat===Pt.GRAVEL&&n()<.8||Tt.h<r.y0(N)+.04)continue;let Y=!1;for(let pt=0;pt<Bt.length;pt++){let ot=r.pads[pt];N>ot.s0-.2&&N<ot.s1+.2&&Z>0&&Math.abs(yt-j)<2.4&&(Y=!0)}if(Math.abs(N-ne)<1.4&&Math.abs(yt-j)<1.6&&(Y=!0),Y)continue;r.worldXZ(N,yt,q);let et=.08+n()*n()*.3;y.setFromAxisAngle(new P(0,1,0),n()*6.28),_.compose(M.set(q.x,Tt.h-.01,q.z),y,v.set(et*(.8+n()*.6),et,et)),H.setMatrixAt(z,_),H.setColorAt(z,S.setHSL(.2+n()*.07,.45,.75+n()*.25)),z++}return H.count=z,H.receiveShadow=!0,e.add(H),e}function kg(r){let t=0,e=0;for(let c of r)t+=c.attributes.position.count,e+=c.index.count;let n=new Float32Array(t*3),i=new Float32Array(t*3),s=new Float32Array(t*2),o=[],a=0;for(let c of r){n.set(c.attributes.position.array,a*3),i.set(c.attributes.normal.array,a*3),s.set(c.attributes.uv.array,a*2);for(let h=0;h<c.index.count;h++)o.push(c.index.array[h]+a);a+=c.attributes.position.count}let l=new ge;return l.setAttribute("position",new ie(n,3)),l.setAttribute("normal",new ie(i,3)),l.setAttribute("uv",new ie(s,2)),l.setIndex(o),l}var Hg=`
  attribute float aDepth;
  attribute vec2 aFlow;
  attribute float aFoam;
  varying vec3 vWorld;
  varying float vDepth;
  varying vec2 vFlow;
  varying float vFoam;
  #include <fog_pars_vertex>
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    vDepth = aDepth;
    vFlow = aFlow;
    vFoam = aFoam;
    vec4 mvPosition = viewMatrix * wp;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`,Vg=`
  uniform float uTime;
  uniform sampler2D uNormal;
  uniform sampler2D uFoamTex;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uSkyTop;
  uniform vec3 uSkyHorizon;
  uniform vec3 uShallow;
  uniform vec3 uDeep;
  uniform float uDetail;
  varying vec3 vWorld;
  varying float vDepth;
  varying vec2 vFlow;
  varying float vFoam;
  #include <fog_pars_fragment>

  vec3 sampleN(vec2 uv) { return texture2D(uNormal, uv).xyz * 2.0 - 1.0; }

  void main() {
    float speed = length(vFlow);
    float t = uTime * 0.6;
    float ph0 = fract(t), ph1 = fract(t + 0.5);
    float wgt = abs(ph0 * 2.0 - 1.0);
    vec2 uv = vWorld.xz * 2.2;
    vec2 off = vFlow * 0.45;
    vec3 n0 = sampleN(uv - off * ph0) ;
    vec3 n1 = sampleN(uv - off * ph1 + 0.37);
    vec3 nA = mix(n0, n1, wgt);
    vec3 n2 = sampleN(vWorld.xz * 6.5 - off * 1.7 * ph0 + 0.11);
    vec3 n3 = sampleN(vWorld.xz * 6.5 - off * 1.7 * ph1 + 0.71);
    vec3 nB = mix(n2, n3, wgt);
    float rough = 0.14 + speed * 0.14 + vFoam * 0.45;
    vec3 n = normalize(vec3((nA.x + nB.x * 0.6 * uDetail) * rough, 1.0, (nA.y + nB.y * 0.6 * uDetail) * rough));
    vec3 V = normalize(cameraPosition - vWorld);
    float ndv = max(dot(n, V), 0.0);
    float fres = 0.05 + 0.95 * pow(1.0 - ndv, 5.0);
    vec3 R = reflect(-V, n);
    float up = clamp(R.y, 0.0, 1.0);
    vec3 sky = mix(uSkyHorizon, uSkyTop, pow(up, 0.6));
    // banks and trees darken low reflections
    sky = mix(sky * vec3(0.45, 0.55, 0.4), sky, smoothstep(0.05, 0.45, up));
    float depthF = smoothstep(0.0, 0.55, vDepth);
    vec3 body = mix(uShallow, uDeep, depthF);
    vec3 col = mix(body, sky, fres);
    float spec = pow(max(dot(R, uSunDir), 0.0), 140.0) * 3.0 + pow(max(dot(R, uSunDir), 0.0), 16.0) * 0.12;
    col += uSunColor * spec;
    // foam / whitewater
    vec2 fuv = vWorld.xz * 1.6;
    float f0 = texture2D(uFoamTex, fuv - vFlow * ph0 * 0.6).r;
    float f1 = texture2D(uFoamTex, fuv * 1.7 - vFlow * ph1 * 0.6 + 0.3).r;
    float fn = mix(f0, f1, wgt);
    float foam = smoothstep(0.75 - vFoam * 0.7, 1.0 - vFoam * 0.45, fn + vFoam * 0.35) * clamp(vFoam * 1.4, 0.0, 1.0);
    // thin wet line where water meets the bank
    float edge = 1.0 - smoothstep(0.0, 0.012, vDepth);
    foam = max(foam, edge * 0.25 * fn);
    col = mix(col, vec3(0.93, 0.96, 0.97), foam);
    float alpha = mix(0.4, 0.9, smoothstep(0.0, 0.35, vDepth));
    alpha = max(alpha, fres * 0.9);
    alpha = max(alpha, foam);
    alpha *= smoothstep(-0.004, 0.006, vDepth);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;function Mu(r,t,e){let n=t==="low"?.12:.06,i=t==="low"?12:22,s=Math.floor((Je-qt)/n)+1,o=new Float32Array(s*i*3),a=new Float32Array(s*i),l=new Float32Array(s*i),c=new Float32Array(s*i*2),h={},u={},d={},p=r.rocks.filter(y=>{let v=r.waterLevel(y.s,y.d);return v>-1e8&&y.y+y.r>v&&y.y-y.r<v});for(let y=0;y<s;y++){let v=Math.min(Je,qt+y*n),M=r.c(v),S=r.wL(v),A=r.wR(v),T=r.y0(v),w=r.row(r.rFoam,v);r.frame(v,d);let b=p.filter(C=>Math.abs(C.s-v)<.5);for(let C=0;C<i;C++){let D=-1.04+2.08*C/(i-1),U=M+(D<0?D*S:D*A);r.worldXZ(v,U,h);let L=y*i+C;o[L*3]=h.x,o[L*3+1]=T+.003,o[L*3+2]=h.z,a[L]=T-r.bedH(v,U),r.flowAt(v,U,T,0,d.tx,d.tz,u),c[L*2]=u.vx,c[L*2+1]=u.vz;let H=w;for(let z of b){let q=Math.hypot(v-z.s,U-z.d),N=Math.sqrt(Math.max(0,z.r*z.r-(T-z.y)**2));q<N*3.2&&(H=Math.max(H,.75*Math.exp(-Math.max(0,q-N)/(N*.7))*Math.min(1,Math.hypot(u.vx,u.vz)*1.2)))}l[L]=H}}let g=[];for(let y=0;y<s-1;y++)for(let v=0;v<i-1;v++){let M=y*i+v,S=M+1,A=M+i,T=A+1;g.push(M,S,A,S,T,A)}let x=new ge;x.setAttribute("position",new ie(o,3)),x.setAttribute("aDepth",new ie(a,1)),x.setAttribute("aFlow",new ie(c,2)),x.setAttribute("aFoam",new ie(l,1)),x.setIndex(g),x.computeBoundingSphere();let m=Ms.merge([rt.fog,{uTime:{value:0},uNormal:{value:null},uFoamTex:{value:null},uSunDir:{value:e.clone()},uSunColor:{value:new at(1,.94,.82)},uSkyTop:{value:new at(.36,.55,.82)},uSkyHorizon:{value:new at(.78,.86,.9)},uShallow:{value:new at(.1,.19,.17)},uDeep:{value:new at(.025,.08,.08)},uDetail:{value:t==="low"?0:1}}]);m.uNormal.value=uu(),m.uFoamTex.value=wo(128),m.uFoamTex.value.wrapS=m.uFoamTex.value.wrapT=Xn;let f=new ze({vertexShader:Hg,fragmentShader:Vg,uniforms:m,transparent:!0,depthWrite:!1,fog:!0}),_=new Nt(x,f);return _.renderOrder=2,_.name="water",_}var Gg=`
  attribute float aAlpha;
  varying vec2 vUv;
  varying float vAlpha;
  varying vec3 vWorld;
  #include <fog_pars_vertex>
  void main() {
    vUv = uv; vAlpha = aAlpha;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    vec4 mvPosition = viewMatrix * wp;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`,Wg=`
  uniform sampler2D uTex;
  uniform float uTime;
  varying vec2 vUv;
  varying float vAlpha;
  varying vec3 vWorld;
  #include <fog_pars_fragment>
  void main() {
    float a = texture2D(uTex, vec2(vUv.x * 2.0, vUv.y * 1.2 + uTime * 1.6)).r;
    float b = texture2D(uTex, vec2(vUv.x * 3.1 + 0.3, vUv.y * 0.8 + uTime * 2.3)).r;
    float m = a * 0.6 + b * 0.5;
    float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
    vec3 col = mix(vec3(0.55, 0.68, 0.7), vec3(0.96, 0.98, 1.0), clamp(m + vUv.y * 0.4, 0.0, 1.0));
    gl_FragColor = vec4(col, clamp((0.35 + m * 0.6) * edge * vAlpha, 0.0, 1.0));
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;function bu(r){let t=new Gt,e=mu(),n=Ms.merge([rt.fog,{uTex:{value:null},uTime:{value:0}}]);n.uTex.value=e;let i=new ze({vertexShader:Gg,fragmentShader:Wg,uniforms:n,transparent:!0,depthWrite:!1,side:be,fog:!0}),s={},o=[];for(let a of wn){let l=a.s-a.len/2-.01,c=r.y0(l-.02),h=r.y0(a.s+.6),u=r.row(r.rU,l-.1),d=Math.sqrt(2*(c-h)/9.81),p=12,g=14,x=[],m=[],f=[],_=[];for(let M=0;M<g;M++){let S=M/(g-1),A=d*S,T=u*A*.9,w=c+.012-.5*9.81*A*A;for(let b=0;b<p;b++){let C=-.92+1.84*b/(p-1),D=l+T,U=r.c(l)+(r.c(D)-r.c(l))*.6,L=C<0?r.wL(l):r.wR(l),H=1+S*.25;r.worldXZ(D,U+C*L*H,s),x.push(s.x,w,s.z),m.push(b/(p-1),S*(c-h)*1.5),f.push(Math.min(1,.35+a.h*.4)*(1-.3*S))}}for(let M=0;M<g-1;M++)for(let S=0;S<p-1;S++){let A=M*p+S,T=A+1,w=A+p,b=w+1;_.push(A,w,T,T,w,b)}let y=new ge;y.setAttribute("position",new oe(x,3)),y.setAttribute("uv",new oe(m,2)),y.setAttribute("aAlpha",new oe(f,1)),y.setIndex(_),y.computeBoundingSphere();let v=new Nt(y,i);v.renderOrder=3,t.add(v),r.worldXZ(a.s+u*d*.9,r.c(a.s+.3),s),o.push({step:a,base:new P(s.x,h,s.z),h:a.h,width:r.wL(l)+r.wR(l)})}return t.userData.uniforms=n,t.userData.sheets=o,t}function Xg(r){return r&Ne.STAMP?2:r&Ne.PREMIUM?1:0}var To=class{constructor(t,e){this.cap=520;let n=e==="low"?16:32,i=new vn(.0335,n,Math.round(n*.6)),s=e==="low"?512:1024,o=[_o({size:s}),_o({band:!0,size:s}),_o({band:!0,stamp:!0,size:s})];this.meshes=o.map(c=>{let h=new co({map:c,roughness:.92,metalness:0,sheen:1,sheenRoughness:.55,sheenColor:new at(.85,.95,.5)}),u=new Cn(i,h,this.cap);return u.instanceMatrix.setUsage(Kn),u.setColorAt(0,new at(1,1,1)),u.instanceColor.setUsage(Kn),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!1,u.count=0,t.add(u),u}),this.counts=[0,0,0],this.m4=new Yt,this.q=new Ze,this.p=new P,this.sc=new P(1,1,1),this.col=new at;let a=new ge;this.markerPos=new Float32Array(this.cap*3),a.setAttribute("position",new ie(this.markerPos,3).setUsage(Kn)),this.markers=new so(a,new Xs({color:15269690,size:7,sizeAttenuation:!1,depthTest:!0,transparent:!0,opacity:.95})),this.markers.frustumCulled=!1,this.markers.renderOrder=5,t.add(this.markers),this.nMarkers=0;let l=new Nt(new lo(.0335*1.5,.0335*1.9,32),new Jn({color:16777215,transparent:!0,opacity:.8,depthWrite:!1,side:be}));l.rotation.x=-Math.PI/2,l.visible=!1,l.renderOrder=4,t.add(l),this.ring=l}begin(){this.counts[0]=this.counts[1]=this.counts[2]=0,this.nMarkers=0}add(t,e,n,i,s,o,a,l,c=0,h=!1){let u=Xg(t),d=this.counts[u];if(d>=this.cap)return;this.counts[u]++,this.q.set(s,o,a,l),this.p.set(e,n,i),this.m4.compose(this.p,this.q,this.sc);let p=this.meshes[u];p.setMatrixAt(d,this.m4);let g=1-.5*c;if(this.col.setRGB(g,g*(1-.04*c),g*(1-.1*c)),p.setColorAt(d,this.col),h&&this.nMarkers<this.cap){let x=this.nMarkers++*3;this.markerPos[x]=e,this.markerPos[x+1]=n+.05,this.markerPos[x+2]=i}}end(t){for(let e=0;e<3;e++){let n=this.meshes[e];n.count=this.counts[e],n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}this.markers.geometry.setDrawRange(0,this.nMarkers),this.markers.geometry.attributes.position.needsUpdate=!0,this.markers.visible=t}};var qg=`
  attribute vec3 iPos;
  attribute float iSize;
  attribute float iAlpha;
  attribute float iRot;
  uniform float uFlat;
  varying vec2 vUv;
  varying float vAlpha;
  #include <fog_pars_vertex>
  void main() {
    vUv = uv;
    vAlpha = iAlpha;
    float c = cos(iRot), s = sin(iRot);
    vec2 p = vec2(position.x * c - position.y * s, position.x * s + position.y * c) * iSize;
    vec4 mvPosition;
    if (uFlat > 0.5) {
      vec4 wp = modelMatrix * vec4(iPos + vec3(p.x, 0.0, p.y), 1.0);
      mvPosition = viewMatrix * wp;
    } else {
      mvPosition = viewMatrix * modelMatrix * vec4(iPos, 1.0);
      mvPosition.xy += p;
    }
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`,Yg=`
  uniform sampler2D uMap;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying float vAlpha;
  #include <fog_pars_fragment>
  void main() {
    vec4 t = texture2D(uMap, vUv);
    gl_FragColor = vec4(uColor * t.rgb, t.a * vAlpha);
    if (gl_FragColor.a < 0.01) discard;
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`,xi=class{constructor(t,{cap:e,map:n,flat:i,color:s=16777215,blending:o=hi,order:a=3,lit:l=!1}){this.cap=e;let c=new mo,h=new ke(1,1);c.index=h.index,c.attributes.position=h.attributes.position,c.attributes.uv=h.attributes.uv,this.pos=new Float32Array(e*3),this.size=new Float32Array(e),this.alpha=new Float32Array(e),this.rot=new Float32Array(e),c.setAttribute("iPos",new ln(this.pos,3).setUsage(Kn)),c.setAttribute("iSize",new ln(this.size,1).setUsage(Kn)),c.setAttribute("iAlpha",new ln(this.alpha,1).setUsage(Kn)),c.setAttribute("iRot",new ln(this.rot,1).setUsage(Kn)),c.instanceCount=0;let u=Ms.merge([rt.fog,{uMap:{value:null},uFlat:{value:i?1:0},uColor:{value:new at(s)}}]);u.uMap.value=n;let d=new ze({vertexShader:qg,fragmentShader:Yg,uniforms:u,transparent:!0,depthWrite:!1,blending:o,fog:!0,side:be});this.mesh=new Nt(c,d),this.mesh.frustumCulled=!1,this.mesh.renderOrder=a,t.add(this.mesh),this.items=[]}spawn(t){return this.items.length>=this.cap&&this.items.shift(),t.age=0,this.items.push(t),t}upload(){let t=this.items.length;for(let n=0;n<t;n++){let i=this.items[n];this.pos[n*3]=i.x,this.pos[n*3+1]=i.y,this.pos[n*3+2]=i.z,this.size[n]=i.size,this.alpha[n]=i.alpha,this.rot[n]=i.rot||0}let e=this.mesh.geometry;e.instanceCount=t;for(let n of["iPos","iSize","iAlpha","iRot"])e.attributes[n].needsUpdate=!0}},Ao=class{constructor(t,e,n){this.creek=e,this.q=n;let i=n==="low"?.4:n==="medium"?.7:1;this.mult=i,this.rnd=Ue(4),this.foam=new xi(t,{cap:Math.round(1600*i),map:wo(64),flat:!0,order:3}),this.ripples=new xi(t,{cap:Math.round(500*i)+100,map:du(),flat:!0,order:3}),this.drops=new xi(t,{cap:500,map:bo(32),flat:!1,color:15267071,order:4}),this.mist=new xi(t,{cap:Math.round(160*i)+20,map:bo(64),flat:!1,color:15922936,order:4}),this.leaves=new xi(t,{cap:220,map:fu(),flat:!0,order:3}),this.sparks=new xi(t,{cap:80,map:bo(32),flat:!1,color:16773536,order:6,blending:kr}),this.fl={},this.loc={},this.fr={},this.spawnAcc=0,this.falls=[];for(let s=0;s<70*i;s++)this.spawnLeafOnWater(-5+this.rnd()*110)}setFalls(t){this.falls=t}spawnLeafOnWater(t){let e=this.creek,i=e.c(t)+(this.rnd()-.5)*(e.wL(t)+e.wR(t))*.8,s=e.worldXZ(t,i,{});this.leaves.spawn({x:s.x,y:e.y0(t)+.004,z:s.z,size:.045+this.rnd()*.03,alpha:1,rot:this.rnd()*6.28,life:60+this.rnd()*60,hint:-1,vy:0,air:!1,spin:(this.rnd()-.5)*.5})}splash(t,e,n,i){let s=Math.min(26,6+i*4)*this.mult;for(let o=0;o<s;o++){let a=this.rnd()*6.28,l=(.3+this.rnd()*.6)*Math.min(3,i)*.6;this.drops.spawn({x:t,y:e+.01,z:n,vx:Math.cos(a)*l,vy:.6+this.rnd()*i*.5,vz:Math.sin(a)*l,size:.008+this.rnd()*.01,alpha:.9,life:.7})}this.ripple(t,e,n,.05,.6,1.4),this.ripple(t,e,n,.03,.45,1)}ripple(t,e,n,i,s,o,a=.55){this.ripples.spawn({x:t,y:e+.002,z:n,size:i,grow:s,alpha:a,a0:a,life:o,rot:0})}sparkle(t,e,n){for(let i=0;i<14;i++){let s=this.rnd()*6.28;this.sparks.spawn({x:t,y:e,z:n,vx:Math.cos(s)*.4,vy:.4+this.rnd()*.6,vz:Math.sin(s)*.4,size:.02,alpha:1,life:.6})}}update(t,e,n){let i=this.creek,s=this.rnd,o=this.mult;this.spawnAcc+=t;let l=i.locate(n.x,n.z,-1,this.loc).s,c=Math.max(8,Math.min(60,n.y*1.2+6)),h=160*o,u=Math.floor(this.spawnAcc*h);this.spawnAcc-=u/h;for(let v=0;v<u;v++){let M=l+(s()-.5)*2*c;if(M<-5||M>107)continue;let S=i.row(i.rFoam,M);if(s()>S*.9+.04)continue;let T=i.c(M)+(s()-.5)*(i.wL(M)+i.wR(M))*.85,w=i.worldXZ(M,T,{});this.foam.spawn({x:w.x,y:i.y0(M)+.004,z:w.z,size:.03+s()*.05*(.5+S),alpha:0,a0:.5+S*.4,life:2+s()*3,rot:s()*6.28,hint:-1})}for(let v of this.falls){let M=v.h*8*t*o;for(let S=0;S<M||S===0&&s()<M;S++)this.mist.spawn({x:v.base.x+(s()-.5)*v.width,y:v.base.y+.05,z:v.base.z+(s()-.5)*v.width,vx:(s()-.5)*.3,vy:.2+s()*.4,vz:(s()-.5)*.3,size:.1+s()*.2*v.h,alpha:0,a0:.18,life:1.6+s(),grow:.3})}if(s()<t*6*o){let v=76.8+s()*2.6,M=.5+s()*2.2,S=i.worldXZ(v,M,{}),A=i.y0(78.3)+1.2+s()*1.5;this.mist.spawn({x:S.x,y:A,z:S.z,vx:0,vy:-.6,vz:0,size:.25+s()*.3,alpha:0,a0:.16,life:2.5,grow:.2,wind:!0})}if(s()<t*.9){let v=76.5+s()*3,M=.3+s()*2.5,S=i.worldXZ(v,M,{});this.leaves.spawn({x:S.x,y:i.y0(78.3)+2.5+s()*2,z:S.z,size:.05,alpha:1,rot:s()*6.28,life:50,hint:-1,vy:-.4,air:!0,spin:2})}s()<t*.25&&this.leaves.items.length<160&&this.spawnLeafOnWater(-4+s()*108);let d=(v,M)=>{let S=i.locate(v.x,v.z,v.hint??-1,this.loc);return v.hint=S.idx,i.flowAt(S.s,S.d,i.y0(S.s),e,S.tx,S.tz,this.fl),v.x+=this.fl.vx*t*M,v.z+=this.fl.vz*t*M,v.y=i.y0(S.s)+.004,S},p=this.foam.items;for(let v=p.length-1;v>=0;v--){let M=p[v];if(M.age+=t,M.age>M.life){p.splice(v,1);continue}let S=d(M,1);if(!i.inChannel(S.s,S.d,0)){p.splice(v,1);continue}M.alpha=M.a0*Math.min(1,M.age*3)*(1-M.age/M.life)}this.foam.upload();let g=this.ripples.items;for(let v=g.length-1;v>=0;v--){let M=g[v];if(M.age+=t,M.age>M.life){g.splice(v,1);continue}M.size+=M.grow*t,M.alpha=M.a0*(1-M.age/M.life)}this.ripples.upload();let x=this.drops.items;for(let v=x.length-1;v>=0;v--){let M=x[v];if(M.age+=t,M.age>M.life){x.splice(v,1);continue}M.vy-=9.81*t,M.x+=M.vx*t,M.y+=M.vy*t,M.z+=M.vz*t,M.alpha=.9*(1-M.age/M.life)}this.drops.upload();let m=this.sparks.items;for(let v=m.length-1;v>=0;v--){let M=m[v];if(M.age+=t,M.age>M.life){m.splice(v,1);continue}M.vy-=2*t,M.x+=M.vx*t,M.y+=M.vy*t,M.z+=M.vz*t,M.alpha=1-M.age/M.life}this.sparks.upload();let f=this.mist.items,_={};for(let v=f.length-1;v>=0;v--){let M=f[v];if(M.age+=t,M.age>M.life){f.splice(v,1);continue}if(M.wind){let A=i.locate(M.x,M.z,-1,this.loc);i.windAt(A.s,A.d,M.y,e,_),M.vx+=(_.vx*.4-M.vx)*t*2,M.vy+=(_.vy*.35-M.vy)*t*2,M.vz+=(_.vz*.4-M.vz)*t*2}M.x+=M.vx*t,M.y+=M.vy*t,M.z+=M.vz*t,M.size+=(M.grow||0)*t;let S=M.age/M.life;M.alpha=M.a0*Math.sin(Math.PI*S)}this.mist.upload();let y=this.leaves.items;for(let v=y.length-1;v>=0;v--){let M=y[v];if(M.age+=t,M.age>M.life){y.splice(v,1);continue}if(M.air){let S=i.locate(M.x,M.z,-1,this.loc);i.windAt(S.s,S.d,M.y,e,_),M.x+=(_.vx*.5+Math.sin(e*3+v)*.2)*t,M.z+=(_.vz*.5+Math.cos(e*2.6+v)*.2)*t,M.y+=(M.vy+_.vy*.25)*t,M.rot+=M.spin*t;let A=Math.max(i.bedH(S.s,S.d),i.waterLevel(S.s,S.d));M.y<=A+.004&&(M.air=!1,M.y=A+.004,M.hint=-1,i.waterLevel(S.s,S.d)<-1e8&&(M.life=M.age+8))}else{let S=i.locate(M.x,M.z,M.hint??-1,this.loc);M.hint=S.idx,i.inChannel(S.s,S.d,0)&&(i.flowAt(S.s,S.d,i.y0(S.s),e,S.tx,S.tz,this.fl),M.x+=this.fl.vx*t*.9,M.z+=this.fl.vz*t*.9,M.y=i.y0(S.s)+.004,M.rot+=M.spin*t*.3,S.s>106&&(M.life=0))}M.alpha=Math.min(1,(M.life-M.age)*.5)}this.leaves.upload()}};var _n=r=>new P(r[0],r[1],r[2]),Q={};function Lo(){return Q.wood||(Q.wood=new Xt({map:hc(256,"#a0703f"),roughness:.8}),Q.darkWood=new Xt({map:hc(256,"#6b4a2a"),roughness:.85}),Q.steel=new Xt({color:10134443,metalness:.75,roughness:.35}),Q.darkSteel=new Xt({color:4014922,metalness:.6,roughness:.45}),Q.green=new Xt({color:3107653,metalness:.3,roughness:.5}),Q.brass=new Xt({color:13214026,metalness:.85,roughness:.3}),Q.blue=new Xt({color:2384568,metalness:.4,roughness:.4}),Q.red=new Xt({color:12728875,metalness:.4,roughness:.35}),Q.rubber=new Xt({color:2236964,roughness:.9}),Q.yellow=new Xt({color:15906354,roughness:.55}),Q.orange=new Xt({color:15299883,roughness:.6}),Q.white=new Xt({color:15790314,roughness:.35}),Q.bark=new Xt({map:$s(),roughness:1}),Q.root=new Xt({color:5980976,map:$s(),roughness:.95}),Q.glass=new Xt({color:12572896,transparent:!0,opacity:.35,roughness:.1,metalness:.1}),Q.mesh=(()=>{let r=document.createElement("canvas");r.width=r.height=64;let t=r.getContext("2d");t.strokeStyle="#cfd5d8",t.lineWidth=3;for(let n=0;n<=64;n+=16)t.beginPath(),t.moveTo(n,0),t.lineTo(n,64),t.stroke(),t.beginPath(),t.moveTo(0,n),t.lineTo(64,n),t.stroke();let e=new Ni(r);return e.wrapS=e.wrapT=Xn,e.repeat.set(6,3),new Xt({map:e,transparent:!0,alphaTest:.3,side:be,metalness:.6,roughness:.4})})(),Q.lamp=new Xt({color:3359795,emissive:0,roughness:.3}),Q.laser=new Jn({color:16719904,transparent:!0,opacity:.8})),Q}function Ft(r,t,e,n,i=0,s=0,o=0){let a=new Nt(new Ui(r,t,e),n);return a.position.set(i,s,o),a.castShadow=!0,a.receiveShadow=!0,a}function In(r,t,e,n,i=12){let s=new Nt(new Fi(r,t,e,i),n);return s.castShadow=!0,s.receiveShadow=!0,s}function _e(r,t,e,n,i=10){let s=r.isVector3?r:_n(r),o=t.isVector3?t:_n(t),a=s.distanceTo(o),l=In(e,e,a,n,i);return l.position.copy(s).add(o).multiplyScalar(.5),l.quaternion.setFromUnitVectors(new P(0,1,0),o.clone().sub(s).normalize()),l}function Zg(r,t){let e=Ft(r.h[0]*2,r.h[1]*2,r.h[2]*2,t),n=new Yt().makeBasis(_n(r.ax),_n(r.ay),_n(r.az));return e.quaternion.setFromRotationMatrix(n),e.position.set(r.cx,r.cy,r.cz),e}function $g(r,t){let e=new Gt,n=new P(r.ax,r.ay,r.az),i=new P(r.bx,r.by,r.bz);e.add(_e(n,i,r.r,t));for(let s of[n,i]){let o=new Nt(new vn(r.r,10,8),t);o.position.copy(s),o.castShadow=!0,e.add(o)}return e}function wu(r,t,e){let n=new io(new Ws({map:r,depthWrite:!1}));return n.scale.set(t,e,1),n}var Ro=class{constructor(t,e){this.creek=e,Lo();let n=new Gt;this.group=n,t.add(n);let i=Ft(1.35,.045,.62,Q.wood,-.15,.53,0);n.add(i);for(let[l,c]of[[-.78,-.26],[-.78,.26],[.47,-.26],[.47,.26]]){n.add(Ft(.05,.5,.05,Q.darkWood,l,.26,c));let h=In(.06,.06,.03,Q.rubber,14);h.rotation.x=Math.PI/2,h.position.set(l,.06,c+(c>0?.04:-.04)),n.add(h)}n.add(Ft(1.3,.03,.5,Q.darkWood,-.15,.16,0));let s=_e([.55,.4,-.22],[.75,.62,-.22],.012,Q.darkWood);n.add(s);let o=_e([.55,.4,.22],[.75,.62,.22],.012,Q.darkWood);n.add(o),n.add(_e([.75,.62,-.22],[.75,.62,.22],.014,Q.darkWood)),this.hand=new Gt,this.hand.add(Ft(.18,.03,.14,Q.darkSteel,0,.565,0));let a=In(.04,.04,.16,new Xt({color:13623356,roughness:1}),16);a.rotation.z=Math.PI/2,a.position.set(0,.6,.12),this.hand.add(a),this.hand.position.set(.27,0,.06),n.add(this.hand),this.press=new Gt,n.add(this.press),this.heads=[],this.hopper=new Gt,n.add(this.hopper),this.feeder=new Gt,n.add(this.feeder),this.chute=new Gt,n.add(this.chute),this.config=null,this.slots=[],this.k=-1,this.anim={press:0,flap:0,wheel:0,hand:0,headKick:[0,0]},this.home=new Yt}frameFor(t,e={}){let n=this.creek,i=n.pads[t],s=i.sC,o=n.c(Bt[t].s),a=n.wR(Bt[t].s),l=n.worldXZ(s,o+a+1.05),c=n.frame(s);return e.pos=new P(l.x,i.y,l.z),e.yaw=Math.atan2(-c.tz,c.tx),e}placeAt(t){let e=this.frameFor(t);this.group.position.copy(e.pos),this.group.rotation.set(0,e.yaw,0),this.group.updateMatrixWorld(!0),this.k!==t&&(this.k=t,this.buildChute(t))}buildChute(t){this.chute.clear();let e=this.creek.chuteFor(t),n=new Yt().copy(this.group.matrixWorld).invert(),i=[_n(e.R0),_n(e.M),_n(e.E)].map(u=>u.applyMatrix4(n));this.chutePts=i;for(let u=0;u<2;u++){let d=i[u],p=i[u+1],g=p.clone().sub(d),x=g.length();g.normalize();let m=new Ze().setFromUnitVectors(new P(1,0,0),g),f=new Gt;f.quaternion.copy(m),f.position.copy(d).add(p).multiplyScalar(.5),f.add(Ft(x+.02,.012,.11,Q.wood,0,-.006,0)),f.add(Ft(x+.02,.07,.01,Q.wood,0,.03,.057)),f.add(Ft(x+.02,.07,.01,Q.wood,0,.03,-.057));let _=Ft(x,.003,.07,Q.white,0,.001,0);if(_.name="lining",f.add(_),this.chute.add(f),u===0){let y=d.clone().lerp(p,.55);this.chute.add(_e([y.x,y.y-.01,y.z-.05],[y.x,y.y-.45,y.z-.05],.01,Q.darkWood)),this.chute.add(_e([y.x,y.y-.01,y.z+.05],[y.x,y.y-.45,y.z+.05],.01,Q.darkWood))}}let s=i[2],o=i[1];this.sensor=new Gt;let a=Ft(.04,.05,.03,Q.darkSteel,0,.06,-.08),l=Ft(.04,.05,.03,Q.darkSteel,0,.06,.08),c=Ft(.004,.004,.16,Q.laser,0,.045,0);this.sensor.add(a,l,c),this.sensor.position.copy(o.clone().lerp(s,.4));let h=s.clone().sub(o).normalize();this.sensor.rotation.y=Math.atan2(-h.z,h.x),this.chute.add(this.sensor),this.config=null}configure(t){let e=[...t].sort().join(",");if(e===this.config)return;this.config=e;let n=i=>t.has(i);if(this.press.clear(),this.heads=[],n("press")){let i=n("twinPress")?2:1,s=n("turbo")?Q.red:Q.green,o=Ft(.3,.03,i===2?.46:.24,Q.darkSteel,-.6,.565,i===2?0:.12);this.press.add(o);let a=i===2?[.12,-.12]:[.12],l=Math.min(...a)-.11,c=Math.max(...a)+.11;for(let h of[l,c])this.press.add(Ft(.05,.5,.05,s,-.6,.83,h));this.press.add(Ft(.12,.08,c-l+.05,s,-.6,1.09,(l+c)/2));for(let h of a){let u=new Gt;u.add(_e([0,0,0],[0,.22,0],.018,Q.steel)),u.add(Ft(.12,.05,.12,s,0,-.01,0));let d=n("quickMold")?Q.brass:Q.steel,p=new Nt(new vn(.045,16,8,0,Math.PI*2,0,Math.PI/2),d);p.rotation.x=Math.PI,p.position.y=-.035,u.add(p),u.position.set(-.6,.86,h),this.press.add(u);let g=new Nt(new vn(.045,16,8,0,Math.PI*2,0,Math.PI/2),d);g.rotation.x=Math.PI,g.position.set(-.6,.625,h),this.press.add(g),this.heads.push({head:u,z:h,lower:g}),this.press.add(_e([-.52,.62,h],[-.38,.68,-.06],.008,Q.steel))}if(n("servo")||n("turbo")){let h=In(.05,.05,.14,Q.blue,16);h.rotation.z=Math.PI/2,h.position.set(-.6,1.17,(l+c)/2),this.press.add(h),this.press.add(_e([-.6,1.17,c],[-.6,.6,c+.06],.006,Q.rubber))}if(n("turbo")){let h=In(.09,.09,.02,Q.darkSteel,20);h.rotation.x=Math.PI/2,h.position.set(-.6,.95,c+.05),this.flywheel=h,this.press.add(h);let u=Ft(.02,.4,.01,new Xt({color:16733491,emissive:16724753,emissiveIntensity:1.2}),-.53,.83,c);this.press.add(u)}else this.flywheel=null}if(this.hopper.clear(),n("press")){let i=n("bulkHopper")?40:n("hopperExt")?20:8,s=i===40?.3:i===20?.24:.2,o=i===40?.3:.2,a=i===40?.3:i===20?.32:.16,l=-.3,c=-.06,h=.6,u=Q.glass;this.hopper.add(Ft(s,.01,o,Q.darkSteel,l,h-.005,c)),this.hopper.add(Ft(s,a,.006,u,l,h+a/2,c-o/2)),this.hopper.add(Ft(s,a,.006,u,l,h+a/2,c+o/2)),this.hopper.add(Ft(.006,a,o,u,l-s/2,h+a/2,c)),this.hopper.add(Ft(.006,a,o,u,l+s/2,h+a/2,c));for(let[x,m]of[[-1,-1],[-1,1],[1,-1],[1,1]])this.hopper.add(Ft(.012,a+.02,.012,Q.darkSteel,l+x*s/2,h+a/2,c+m*o/2));this.hopper.add(Ft(.012,.012,o,Q.darkSteel,l-s/2,h+a,c)),this.hopper.add(Ft(.012,.012,o,Q.darkSteel,l+s/2,h+a,c));let d=Math.max(1,Math.floor((s-.01)/(.0335*2.05)))*Math.max(1,Math.floor((o-.01)/(.0335*2.05))),p=Math.max(1,Math.floor((s-.01)/(.0335*2.05))),g=Math.max(1,Math.floor((o-.01)/(.0335*2.05)));this.slots=[];for(let x=0;x<i;x++){let m=Math.floor(x/d),f=x%d,_=f%p,y=Math.floor(f/p);this.slots.push(new P(l-(p-1)*.0335*2.05/2+_*.0335*2.05+m%2*.008,h+.0335+.003+m*.0335*1.75,c-(g-1)*.0335*2.05/2+y*.0335*2.05))}i===40?(this.gaugeBg=Ft(.03,a,.01,Q.rubber,l+s/2+.03,h+a/2,c-o/2+.02),this.gauge=Ft(.022,a,.012,new Xt({color:5627221,emissive:2271778,emissiveIntensity:.8}),l+s/2+.03,h+a/2,c-o/2+.02),this.gaugeH=a,this.gaugeY=h,this.hopper.add(this.gaugeBg,this.gauge)):this.gauge=null}else this.slots=[];if(this.feeder.clear(),this.wheel=null,this.flap=null,n("feeder"))if(this.feeder.add(Ft(.12,.08,.1,Q.green,-.13,.6,-.2)),n("indexed")||n("turbo")){let i=new Gt,s=In(.07,.07,.03,Q.yellow,8);s.rotation.x=Math.PI/2,i.add(s);for(let o=0;o<6;o++){let a=o/6*Math.PI*2,l=Ft(.02,.025,.034,Q.darkSteel,Math.cos(a)*.06,Math.sin(a)*.06,0);l.rotation.z=a,i.add(l)}i.position.set(-.04,.63,-.26),this.wheel=i,this.feeder.add(i)}else{let i=Ft(.01,.07,.09,Q.steel,0,.035,0),s=new Gt;s.add(i),s.position.set(-.04,.58,-.28),this.flap=s,this.feeder.add(s)}this.chute.traverse(i=>{i.name==="lining"&&(i.visible=n("lowFriction"))}),this.sensor&&(this.sensor.visible=n("spacingSensor"))}hopperSlotsWorld(){return this.slots.map(t=>t.clone().applyMatrix4(this.group.matrixWorld))}moldWorld(t){let e=this.heads[t];return e?new P(-.6,.625+.0335*.2,e.z).applyMatrix4(this.group.matrixWorld):null}handWorld(){return new P(.27,.58+.0335,.06).applyMatrix4(this.group.matrixWorld)}feederWorld(){return new P(-.1,.8,-.2).applyMatrix4(this.group.matrixWorld)}pressWorld(){return new P(-.6,1.25,0).applyMatrix4(this.group.matrixWorld)}update(t,e){let n=this.anim;n.flap=Math.max(0,n.flap-t*3),n.hand=Math.max(0,n.hand-t*2);let i=e.numbers,s=e.pressProg;if(this.heads.forEach((o,a)=>{let l;this.heads.length===2?l=(s+(a===e.pressCount%2?0:.5))%1:l=s;let c=l>.75?Math.sin((l-.75)/.25*Math.PI):0,h=n.headKick[a];o.head.position.y=.86-c*.14+h*.04,n.headKick[a]=Math.max(0,h-t*(e.owned.has("quickMold")?6:3))}),this.flywheel&&(this.flywheel.rotation.y+=t*20),this.wheel&&(this.wheel.rotation.z-=t*(e.status.feeder?.3:6/Math.max(.5,i.feeder))*(e.settings.auto?1:0)),this.flap&&(this.flap.rotation.z=-n.flap*1.1),this.gauge){let o=Math.max(.02,e.hopper.length/40);this.gauge.scale.y=o,this.gauge.position.y=this.gaugeY+this.gaugeH*o/2}this.hand.position.y=Math.sin(n.hand*Math.PI)*.02}onEvent(t){t.type==="pressed"&&(this.anim.headKick[t.head%Math.max(1,this.heads.length)]=1),t.type==="launch"&&(this.anim.flap=1),t.type==="handMade"&&(this.anim.hand=1)}},Co=class{constructor(t,e){Lo(),this.creek=e;let n=new Gt;t.add(n),this.group=n;let i=ne,s=e.c(i),o=e.wR(i)+.07,a=(f,_,y)=>{let v=e.worldXZ(f,_);return new P(v.x,y,v.z)},l=e.frame(i),c=Math.atan2(-l.tz,l.tx),h=a(i,s-o,e.bedH(i,s-o)-.05),u=a(i,s+o,e.bedH(i,s+o)-.05),d=.9;n.add(_e(h,h.clone().setY(h.y+d),.04,Q.wood)),n.add(_e(u,u.clone().setY(u.y+d),.04,Q.wood));let p=Math.max(h.y,u.y)+d-.05;n.add(_e(h.clone().setY(p),u.clone().setY(p),.03,Q.wood));let g=new Xt({map:So("FINISH",{w:512,h:112,bg:"#1e3b23",border:"#e8d27a",font:"bold 70px Georgia, serif"}),roughness:.7});for(let f of[0,Math.PI]){let _=new Nt(new ke(o*1.6,.16),g);_.position.copy(h).lerp(u,.5).setY(p-.12),_.rotation.y=c-Math.PI/2+f,n.add(_)}this.lamps=[];for(let f of[h,u]){let _=new Nt(new vn(.035,12,10),Q.lamp.clone());_.position.copy(f).setY(f.y+d+.04),n.add(_),this.lamps.push(_)}let x=e.y0(i)+.09;n.add(_e(h.clone().setY(x),u.clone().setY(x),.002,Q.darkSteel)),this.flag=new Gt;let m=new Nt(new ke(.12,.08),new Xt({color:2867035,side:be}));m.position.x=.06,this.flag.add(m),this.flag.position.copy(u).setY(u.y+d-.12),this.flag.rotation.y=c,n.add(this.flag),this.flash=0,this.yaw=c,this.basketGroup=new Gt,n.add(this.basketGroup),this.P=a,this.board=null,this.boardCanvas=document.createElement("canvas"),this.boardCanvas.width=512,this.boardCanvas.height=320,this.boardTex=new Ni(this.boardCanvas),this.boardTex.colorSpace=De,this.boardT=0,this.conv=new Gt,n.add(this.conv),this.config="",this.slots=[],this.crateSlots=[],this.convBalls=[]}configure(t){let e=["wideBasket","conveyor","timingGate"].map(T=>t.has(T)?1:0).join("");if(e===this.config)return;this.config=e;let n=this.creek,i=this.P,s=t.has("wideBasket");this.basketGroup.clear();let o=Re-.05,a=s?.55:.32,l=n.c(Re),c=s?.32:.22,h=n.bedH(Re,l),u=n.y0(Re)+(s?.16:.12),d=n.frame(Re),p=Math.atan2(-d.tz,d.tx),g=i(o+a/2,l,(h+u)/2),x=new Gt;x.position.copy(g),x.rotation.y=p;let m=u-h,f=(T,w,b,C,D,U)=>{let L=new Nt(new ke(T,w),Q.mesh);L.position.set(b,C,D),L.rotation.y=U,x.add(L)};f(a,m,0,0,c,0),f(a,m,0,0,-c,0),f(c*2,m,a/2,0,0,Math.PI/2);let _=new Nt(new ke(a,c*2),Q.mesh);_.rotation.x=-Math.PI/2,_.position.y=-m/2+.01,x.add(_);for(let[T,w]of[[-a/2,-c],[-a/2,c],[a/2,-c],[a/2,c]])x.add(Ft(.012,m+.02,.012,Q.steel,T,0,w));x.add(Ft(a,.012,.012,Q.steel,0,m/2,c)),x.add(Ft(a,.012,.012,Q.steel,0,m/2,-c)),this.basketGroup.add(x),this.slots=[];let y=Math.floor(a/(.0335*2.1)),v=Math.floor(c*2/(.0335*2.1)),M=s?14:6;for(let T=0;T<M;T++){let w=Math.floor(T/(y*v)),b=T%(y*v),C=-a/2+.0335*1.1+b%y*.0335*2.1,D=-c+.0335*1.1+Math.floor(b/y)*.0335*2.1,U=new P(C,-m/2+.0335+.012+w*.0335*1.8,D);x.updateMatrixWorld(!0),this.slots.push(U.applyMatrix4(x.matrixWorld))}let S=i(Re+a,l+.1,h+.02),A=i(Re+a+.6,l+.9,h-.05);if(this.basketGroup.add(_e(S,A,.045,Q.darkSteel)),this.drainEnd=A,this.conv.clear(),this.crateSlots=[],t.has("conveyor")){let T=i(Re+a*.5,l-c-.02,u-.02),w=i(Re+.9,l-c-1,n.bedH(Re+.9,l-c-1)+.35),b=w.clone().sub(T),C=b.length(),D=new Gt;D.position.copy(T).lerp(w,.5),D.quaternion.setFromUnitVectors(new P(1,0,0),b.clone().normalize()),D.add(Ft(C,.015,.1,Q.rubber)),D.add(Ft(C,.03,.008,Q.steel,0,.012,.055)),D.add(Ft(C,.03,.008,Q.steel,0,.012,-.055)),this.conv.add(D);for(let j=0;j<3;j++){let it=T.clone().lerp(w,j/2);this.conv.add(_e(it,it.clone().setY(it.y-.4),.012,Q.darkSteel))}this.beltA=T,this.beltB=w;let U=i(Re+1.25,l-c-1.35,0);U.y=n.bedH(Re+1.25,l-c-1.35);let L=new Gt;L.position.copy(U),L.rotation.y=p;let H=.5,z=.4,q=.28;L.add(Ft(H,.02,z,Q.wood,0,.01,0));for(let[j,it,yt,Tt]of[[0,z/2,H,.02],[0,-z/2,H,.02],[H/2,0,.02,z],[-H/2,0,.02,z]])for(let Y=0;Y<3;Y++)L.add(Ft(yt,.07,Tt,Q.wood,j,.05+Y*.09,it));this.conv.add(L),L.updateMatrixWorld(!0);let N=7,Z=5;for(let j=0;j<70;j++){let it=Math.floor(j/(N*Z)),yt=j%(N*Z),Tt=new P(-H/2+.04+yt%N*.0335*2.02+it%2*.02,.02+.0335+it*.0335*1.7,-z/2+.04+Math.floor(yt/N)*.0335*2.02+it%2*.02);this.crateSlots.push(Tt.applyMatrix4(L.matrixWorld))}}if(t.has("timingGate")&&!this.board){let T=i(ne-.35,n.c(ne)-n.wL(ne)-.45,0);T.y=n.bedH(ne-.35,n.c(ne)-n.wL(ne)-.45);let w=new Gt;w.position.copy(T),w.rotation.y=this.yaw-Math.PI/2+.5,w.add(_e([0,0,0],[0,.9,0],.03,Q.darkWood));let b=new Nt(new ke(.56,.35),new Jn({map:this.boardTex}));b.position.set(0,1,.03),w.add(Ft(.6,.39,.04,Q.darkWood,0,1,0)),w.add(b);let C=b.clone();C.rotation.y=Math.PI,C.position.z=-.03,w.add(C),this.group.add(w),this.board=w}}drawBoard(t){let e=this.boardCanvas.getContext("2d");e.fillStyle="#0b120c",e.fillRect(0,0,512,320),e.fillStyle="#ffcf4a",e.font="bold 36px monospace",e.fillText("TIMING GATE",24,52),e.fillStyle="#9dff8a",e.font="bold 34px monospace";let n=t.lastFinish;e.fillText(`LAST    ${n?n.time.toFixed(1)+" s":"--"}`,24,118),e.fillText(`BALLS/MIN ${t.ballsPerMin(60).toFixed(1)}`,24,178);let i=t.routeStats[t.sel];e.fillText(`AVG     ${i.n?i.avg.toFixed(1)+" s":"--"}`,24,238),e.fillStyle="#7aa",e.font="24px monospace",e.fillText(`from ${Bt[t.sel].name}`,24,292),this.boardTex.needsUpdate=!0}update(t,e){this.flash=Math.max(0,this.flash-t*2);for(let n of this.lamps)n.material.emissive.setRGB(.1+this.flash*.3,.2+this.flash*1.6,.1+this.flash*.4);this.flag.rotation.z=-this.flash*1.2,this.board&&(this.boardT-=t,this.boardT<=0&&(this.boardT=.5,this.drawBoard(e)))}onEvent(t){t.type==="finish"&&(this.flash=1)}},Io=class{constructor(t,e){Lo(),this.creek=e,this.scene=t,this.items={};let n=e.colliders,i=(o,a)=>{let l=new Gt;for(let c of n)c.group===o&&(c.type===1?l.add($g(c,a)):c.type===2&&l.add(Zg(c,a)));return l},s=(o,a)=>{a.visible=!1,t.add(a),this.items[o]=a};{let o=i("rootRail",Q.steel),[a,l]=e.rootRailPts;for(let c of[a,l])o.add(_e([c[0],c[1]-.12,c[2]],[c[0],c[1]+.01,c[2]],.008,Q.darkSteel));s("rootRail",o)}{let o=e.roughPatch,a=14,l=10,c=[],h=[];for(let g=0;g<a;g++){let x=o.s0-.05+(o.s1-o.s0+.1)*g/(a-1),m=e.c(x),f=e.wL(x)*.9,_=e.wR(x)*.9;for(let y=0;y<l;y++){let v=m-f+(f+_)*y/(l-1),M=e.worldXZ(x,v);c.push(M.x,e.matH(x,v)+.001,M.z)}}for(let g=0;g<a-1;g++)for(let x=0;x<l-1;x++){let m=g*l+x;h.push(m,m+l,m+1,m+1,m+l,m+l+1)}let u=new ge;u.setAttribute("position",new oe(c,3)),u.setIndex(h),u.computeVertexNormals();let d=new Nt(u,new Xt({color:2828840,roughness:.85,side:be}));d.receiveShadow=!0;let p=new Gt;p.add(d),s("gravelMat",p)}s("splashGuard",i("splashGuard",Q.wood));{let o=new Gt,a=e.poolGuidePts.map(_n);for(let l=0;l<a.length-1;l++){let c=a[l],h=a[l+1],u=Math.ceil(c.distanceTo(h)/.16);for(let d=0;d<u;d++){let p=c.clone().lerp(h,(d+.5)/u),g=h.clone().sub(c).normalize(),x=In(.03,.03,.13,d%2?Q.yellow:Q.orange,10);x.quaternion.setFromUnitVectors(new P(0,1,0),g),x.position.copy(p),o.add(x)}}o.add(_e(a[0],a[0].clone().setY(a[0].y-.5),.006,Q.darkSteel)),o.add(_e(a[a.length-1],a[a.length-1].clone().setY(a[0].y+.6),.006,Q.darkSteel)),s("poolGuide",o)}{let o=i("catchRamp",Q.wood),{a,b:l}=e.catchRamp;for(let c of[a,l])o.add(_e([c[0],c[1]-.4,c[2]],[c[0],c[1],c[2]],.02,Q.darkWood));s("catchRamp",o)}{let o=i("debrisScreen",Q.darkSteel),a=e.screenPts.map(_n);for(let l=0;l<a.length;l++)o.add(_e(a[l].clone().setY(a[l].y-.5),a[l].clone().setY(a[l].y+.18),.012,Q.darkSteel));for(let l=0;l<a.length-1;l++){let c=a[l],h=a[l+1],u=c.distanceTo(h),d=new Nt(new ke(u,.3),Q.mesh);d.position.copy(c).lerp(h,.5).setY((c.y+h.y)/2+0),d.rotation.y=Math.atan2(-(h.z-c.z),h.x-c.x),o.add(d)}s("debrisScreen",o)}{let o=i("spillRail",Q.steel);s("spillRail",o)}s("alderBypass",i("alderBypass",Q.bark));{let o=i("landingBoards",Q.wood);s("landingBoards",o)}{let o=new Gt,a=Mi.pivotS,c=e.c(a)+e.wR(a)+.25,h=e.worldXZ(a,c),u=e.bedH(a,c);o.position.set(h.x,u,h.z),o.add(Ft(.14,.4,.14,Q.yellow,0,.2,0)),o.add(Ft(.2,.06,.2,Q.darkSteel,0,.03,0));let d=new Gt;d.position.y=.42;let p=e.wR(a)+e.wL(a)+.3,g=Ft(p,.035,.035,Q.yellow,-p/2,0,0);d.add(g);let x=Ft(.03,.3,.5,Q.rubber,-p+.05,-.28,0);d.add(x),d.add(_e([-.02,0,0],[-p+.05,-.13,0],.008,Q.darkSteel)),o.add(d);let m=e.frame(a),f=new P(-m.nx,0,-m.nz);o.rotation.y=Math.atan2(f.z,-f.x),this.armPivot=d,s("clearingArm",o)}{let o=e.rootPts.map(_n),a=new vs(o),l=new Nt(new Ys(a,24,.024,8,!1),Q.root);l.castShadow=!0,l.receiveShadow=!0,t.add(l);let c=o[0];for(let p=0;p<4;p++){let g=[c.clone(),c.clone().add(new P((p-1.5)*.12,.05,.1*p)),c.clone().add(new P((p-1.5)*.25,-.1,.35))],x=new Nt(new Ys(new vs(g),10,.015,6,!1),Q.root);t.add(x)}let h=c.clone().add(new P(0,-.05,0)),u=In(.13,.19,.42,Q.bark,10);u.position.copy(h).setY(h.y+.12),u.castShadow=!0,t.add(u);let d=In(.125,.125,.01,new Xt({color:11569754,roughness:.9}),14);d.position.copy(h).setY(h.y+.335),t.add(d)}this.logMeshes=[0,1,2].map(()=>{let o=In(.032,.03,.54,Q.bark,8);return o.castShadow=!0,t.add(o),o}),this.stakes={};for(let o of yi){if(o.tab!=="creek")continue;let a=this.spotPos(o.id);if(!a)continue;let l=new Gt;l.position.copy(a),l.add(_e([0,0,0],[0,.45,0],.01,Q.darkWood));let c=new Nt(new ke(.14,.09),new Xt({color:16747050,side:be,emissive:4200448}));c.position.set(.07,.4,0),l.add(c);let h=wu(So([o.name,`$${o.price.toLocaleString()}`],{w:512,h:160,font:"bold 50px sans-serif",bg:"#3b2a12"}),.75,.234);h.position.set(0,.7,0),l.add(h),l.userData.upgrade=o.id,l.visible=!1,t.add(l),this.stakes[o.id]=l}}spotPos(t){let e=this.creek,i={rootRail:[93.2,1],gravelMat:[95.4,-1],splashGuard:[85.6,-1],poolGuide:[88.2,1],catchRamp:[79,-1],debrisScreen:[57.5,-1],spillRail:[64.5,1],alderBypass:[46.5,-1],landingBoards:[9.6,1],clearingArm:[Mi.pivotS+.4,1]}[t];if(!i)return null;let[s,o]=i,l=e.c(s)+o*((o<0?e.wL(s):e.wR(s))+.35),c=e.worldXZ(s,l);return new P(c.x,Math.max(e.bedH(s,l),e.y0(s)),c.z)}configure(t){for(let[e,n]of Object.entries(this.items))n.visible=t.owned.has(e);for(let[e,n]of Object.entries(this.stakes))n.visible=!t.owned.has(e)&&!t.blocked(e)}update(t,e,n){if(e.logs.forEach((s,o)=>{let a=this.logMeshes[o];a.position.set(s.x,s.y+.004+Math.sin(n*1.3+o)*.004,s.z);let l=new P(s.bx-s.ax,0,s.bz-s.az).normalize();a.quaternion.setFromUnitVectors(new P(0,1,0),l)}),this.armPivot){let s=e.arm.phase;this.armPivot.rotation.y=s>0?Math.sin(s*Math.PI)*1.1-.55:-.55,this.armPivot.rotation.x=0}let i=this.items.poolGuide;i.visible&&(i.position.y=Math.sin(n*1.7)*.004)}},Po=class{constructor(t,e){Lo(),this.creek=e,this.markers=Bt.map((n,i)=>{let s=n.s,o=e.c(s),a=o-e.wL(s)-.35,l=e.worldXZ(s,a),c=e.bedH(s,a),h=new Gt;h.position.set(l.x,c,l.z),h.add(_e([0,-.1,0],[0,1.1,0],.025,Q.darkWood));let u=new Nt(new ke(.3,.18),new Xt({color:3837770,side:be}));u.position.set(.15,1,0),h.add(u),t.add(h);let d=e.worldXZ(s,o-e.wL(s)-.05),p=e.worldXZ(s,o+e.wR(s)+.05),g=_e([d.x,e.y0(s)+.11,d.z],[p.x,e.y0(s)+.11,p.z],.004,Q.white);return t.add(g),{g:h,flag:u,label:null,k:i,state:""}})}update(t){this.markers.forEach(e=>{let n=e.k,i=n<t.unlocked?n===t.sel?"sel":"open":n===t.unlocked?"next":"locked";if(i===e.state)return;e.state=i,e.flag.material.color.set(i==="sel"?15909424:i==="open"?3837770:i==="next"?16747050:7829367),e.label&&e.g.remove(e.label);let s=Bt[n],o=i==="locked"||i==="next"?[s.name,`Unlock $${s.cost.toLocaleString()}`]:[s.name,`$${s.base}/ball \xB7 ~${s.eta}s`];e.label=wu(So(o,{w:640,h:170,font:"bold 50px Georgia, serif",bg:i==="sel"?"#5a4410":"#2d3a1f"}),1.1,.29),e.label.position.set(0,1.4,0),e.g.add(e.label)})}};var Do=class{constructor(t,e,n){this.cam=t,this.dom=e,this.creek=n,this.target=new P,this.dist=6,this.yaw=0,this.pitch=.75,this.goal=null,this.follow=null,this.followClose=!1,this.cine=null,this.pointers=new Map,this.onPick=null,this.moved=0,this.bind()}bind(){let t=this.dom;t.addEventListener("contextmenu",n=>n.preventDefault()),t.addEventListener("pointerdown",n=>{t.setPointerCapture(n.pointerId),this.pointers.set(n.pointerId,{x:n.clientX,y:n.clientY,button:n.button,sx:n.clientX,sy:n.clientY}),this.moved=0,this.pointers.size===2&&(this.pinch=this.pinchInfo())}),t.addEventListener("pointermove",n=>{let i=this.pointers.get(n.pointerId);if(!i)return;let s=n.clientX-i.x,o=n.clientY-i.y;if(i.x=n.clientX,i.y=n.clientY,this.moved+=Math.abs(s)+Math.abs(o),this.pointers.size===2){let a=this.pinchInfo();this.pinch&&(this.zoom(this.pinch.d/a.d),this.yaw-=a.a-this.pinch.a,this.pitch=de(this.pitch+(a.cy-this.pinch.cy)*.004,.12,1.5),this.pan(a.cx-this.pinch.cx,a.cy-this.pinch.cy,.5)),this.pinch=a,this.userMoved();return}i.button===2||n.shiftKey||n.ctrlKey?(this.yaw-=s*.006,this.pitch=de(this.pitch+o*.005,.12,1.5)):this.pan(s,o,1),this.userMoved()});let e=n=>{let i=this.pointers.get(n.pointerId);this.pointers.delete(n.pointerId),this.pointers.size<2&&(this.pinch=null),i&&this.moved<6&&this.onPick&&this.onPick(n.clientX,n.clientY)};t.addEventListener("pointerup",e),t.addEventListener("pointercancel",e),t.addEventListener("wheel",n=>{n.preventDefault(),this.zoom(Math.exp(n.deltaY*.0012)),this.userMoved(!0)},{passive:!1})}pinchInfo(){let[t,e]=[...this.pointers.values()];return{d:Math.hypot(t.x-e.x,t.y-e.y)+1,a:Math.atan2(e.y-t.y,e.x-t.x),cx:(t.x+e.x)/2,cy:(t.y+e.y)/2}}userMoved(t=!1){this.goal=null,this.cine=null,t||(this.follow=this.follow&&this.followClose?this.follow:null),!t&&this.follow&&(this.follow=null)}zoom(t){this.dist=de(this.dist*t,.25,160)}pan(t,e,n){let i=this.dom.clientHeight||800,s=2*this.dist*Math.tan(this.cam.fov*Math.PI/360)/i*n,o=-Math.sin(this.yaw),a=-Math.cos(this.yaw),l=Math.cos(this.yaw),c=-Math.sin(this.yaw),h=1/Math.max(.35,Math.sin(this.pitch));this.target.x+=(-t*l+e*o*h)*s,this.target.z+=(-t*c+e*a*h)*s,this.follow=null}flyTo(t,e,n=this.yaw,i=this.pitch){this.follow=null,this.cine=null,this.goal={target:t.clone(),dist:e,yaw:n,pitch:i}}setFollow(t,e=!1){this.follow=t,this.followClose=e,this.goal=null,this.cine=null}playPath(t,e){this.follow=null,this.goal=null,this.cine={points:t,t:0,duration:e}}yawAlong(t){let e=this.creek.frame(t);return Math.atan2(-e.tx,-e.tz)}update(t,e){let n=this.creek;if(this.cine){let h=this.cine;h.t+=t;let u=de(h.t/h.duration,0,1),d=h.points.length-1,p=u*d,g=Math.min(d-1,Math.floor(p)),x=p-g,m=x*x*(3-2*x),f=h.points[g],_=h.points[g+1];this.target.lerpVectors(f.target,_.target,m),this.dist=f.dist+(_.dist-f.dist)*m,this.pitch=f.pitch+(_.pitch-f.pitch)*m;let y=_.yaw-f.yaw;for(;y>Math.PI;)y-=Math.PI*2;for(;y<-Math.PI;)y+=Math.PI*2;this.yaw=f.yaw+y*m,u>=1&&(this.cine=null)}else if(this.follow!=null&&e){let h=1-Math.exp(-t*5);this.target.lerp(e,h);let u=this.followClose?.42:2.2;this.dist+=(u-this.dist)*(1-Math.exp(-t*2)),this.followClose&&(this.pitch+=(.5-this.pitch)*(1-Math.exp(-t*2)));let d=n.locate(e.x,e.z,-1,{}),g=this.yawAlong(d.s)-this.yaw;for(;g>Math.PI;)g-=Math.PI*2;for(;g<-Math.PI;)g+=Math.PI*2;this.yaw+=g*(1-Math.exp(-t*1.2))}else if(this.goal){let h=this.goal,u=1-Math.exp(-t*3.5);this.target.lerp(h.target,u),this.dist+=(h.dist-this.dist)*u,this.pitch+=(h.pitch-this.pitch)*u;let d=h.yaw-this.yaw;for(;d>Math.PI;)d-=Math.PI*2;for(;d<-Math.PI;)d+=Math.PI*2;this.yaw+=d*u,this.target.distanceTo(h.target)<.01&&Math.abs(h.dist-this.dist)<.01&&(this.goal=null)}if(this.follow==null){let h=n.locate(this.target.x,this.target.z,-1,{}),u=Math.max(n.bedH(de(h.s,-5,108),de(h.d,-10,10)),n.y0(de(h.s,-5,108)));this.target.y+=(u-this.target.y)*(1-Math.exp(-t*6))}let i=Math.cos(this.pitch),s=Math.sin(this.pitch),o=this.cam;o.position.set(this.target.x+Math.sin(this.yaw)*i*this.dist,this.target.y+s*this.dist,this.target.z+Math.cos(this.yaw)*i*this.dist);let a=0,l=this._loc||(this._loc={});for(let h=2;h<=8;h++){let u=h/8,d=this.target.x+(o.position.x-this.target.x)*u,p=this.target.z+(o.position.z-this.target.z)*u,g=this.target.y+(o.position.y-this.target.y)*u,x=n.locate(d,p,-1,l);if(x.s<-5||x.s>108||Math.abs(x.d)>9.9)continue;let m=Math.max(n.bedH(x.s,x.d),n.waterLevel(x.s,x.d))+(h===8?.06:.03);g<m&&(a=Math.max(a,(m-g)/u))}o.position.y+=a,o.lookAt(this.target);let c=de(this.dist*.02,.01,.5);Math.abs(o.near-c)>c*.2&&(o.near=c,o.far=600,o.updateProjectionMatrix())}};var Jg="varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",Kg=`varying vec3 vDir; uniform vec3 uSun; uniform vec3 uTop; uniform vec3 uHor;
void main(){ float h = clamp(vDir.y, -0.2, 1.0); vec3 c = mix(uHor, uTop, pow(max(h,0.0), 0.55));
float sd = max(dot(normalize(vDir), uSun), 0.0); c += vec3(1.0,0.9,0.7) * (pow(sd, 900.0) * 3.0 + pow(sd, 12.0) * 0.18);
gl_FragColor = vec4(c, 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,Uo=class{constructor(t,e,n){this.creek=e,this.game=n,this.quality=n.settings.quality||"high";let i=new Qr({antialias:!0,powerPreference:"high-performance"});i.setPixelRatio(Math.min(window.devicePixelRatio,this.quality==="high"?2:this.quality==="medium"?1.5:1)),i.setSize(t.clientWidth,t.clientHeight),i.toneMapping=jl,i.toneMappingExposure=1.05,i.outputColorSpace=De,i.shadowMap.enabled=this.quality!=="low",i.shadowMap.type=Kl,t.appendChild(i.domElement),this.renderer=i;let s=new eo;this.scene=s,s.fog=new to(12571350,70,300),s.background=new at(12571350);let o=new Ye(50,t.clientWidth/t.clientHeight,.02,600);this.camera=o,this.sunDir=new P(.45,.78,.35).normalize();let a=new Nt(new vn(400,32,16),new ze({vertexShader:Jg,fragmentShader:Kg,side:We,depthWrite:!1,fog:!1,uniforms:{uSun:{value:this.sunDir},uTop:{value:new at(.32,.52,.82)},uHor:{value:new at(.78,.86,.88)}}}));a.renderOrder=-1,this.sky=a,s.add(a);let l=new fo(14084863,5925434,1.15);s.add(l);let c=new po(16773336,2.4);c.castShadow=this.quality!=="low",c.shadow.mapSize.set(this.quality==="high"?2048:1024,this.quality==="high"?2048:1024),c.shadow.bias=-4e-4,c.shadow.normalBias=.02,s.add(c),s.add(c.target),this.sun=c,this.buildWorld(),this.balls=new To(s,this.quality),this.workshop=new Ro(s,e),this.finish=new Co(s,e),this.creekEq=new Io(s,e),this.markers=new Po(s,e),this.rig=new Do(o,i.domElement,e),this.workshop.placeAt(n.reloc?n.reloc.to:n.sel),this.time=0,this.wakeT=new Map,this.drains=[],this.tmpV=new P,this.fl={},this.cart=null,this.raycaster=new go,window.addEventListener("resize",()=>this.resize(t)),this.homeView(!0)}buildWorld(){let t=this.quality,e=this.creek,n=this.scene;this.world&&(n.remove(this.world),this.world.traverse(s=>{s.geometry&&s.geometry.dispose()}));let i=new Gt;i.add(gu(e,t)),i.add(vu(e,t));for(let s of yu(e))i.add(s);if(i.add(_u(e,t)),this.water=Mu(e,t,this.sunDir),i.add(this.water),this.falls=bu(e),i.add(this.falls),n.add(i),this.world=i,this.effects)for(let s of["foam","ripples","drops","mist","leaves","sparks"])n.remove(this.effects[s].mesh);this.effects=new Ao(n,e,t),this.effects.setFalls(this.falls.userData.sheets)}setQuality(t){t!==this.quality&&(this.quality=t,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t==="high"?2:t==="medium"?1.5:1)),this.renderer.shadowMap.enabled=t!=="low",this.sun.castShadow=t!=="low",this.sun.shadow.map?.dispose(),this.sun.shadow.map=null,this.sun.shadow.mapSize.set(t==="high"?2048:1024,t==="high"?2048:1024),this.scene.traverse(e=>{e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(i=>i.needsUpdate=!0)}),this.buildWorld())}resize(t){let e=t.clientWidth,n=t.clientHeight;this.renderer.setSize(e,n),this.camera.aspect=e/n,this.camera.updateProjectionMatrix()}worldAt(t,e,n=0){let i=this.creek.worldXZ(t,e);return new P(i.x,Math.max(this.creek.bedH(t,e),this.creek.y0(t))+n,i.z)}homeView(t=!1){let e=this.game,n=this.creek,i=e.reloc?e.reloc.to:e.sel,s=Bt[i].s,o=ne-s,a,l,c;i===0?(a=this.worldAt(95.2,n.c(95.2)+.5),l=7.2,c=.82):(a=this.worldAt(s-.6,n.c(s)+.6),l=4.2,c=.75);let h=this.camera.aspect;h<1&&(l*=Math.min(1.9,1/Math.pow(h,.75)),c+=.12);let u=this.rig.yawAlong(i===0?95:s)+(h<1?.15:.55);t?(this.rig.target.copy(a),this.rig.dist=l,this.rig.pitch=c,this.rig.yaw=u):this.rig.flyTo(a,l,u,c)}benchView(){let t=this.workshop.group.position.clone();this.rig.flyTo(t.setY(t.y+.6),2.2,this.rig.yawAlong(Bt[this.game.sel].s)+1.2,.5)}finishView(){let t=this.creek;this.rig.flyTo(this.worldAt(ne+.2,t.c(ne)),2.6,this.rig.yawAlong(ne)+.9,.55)}overview(){let t=this.game.sel,e=Bt[Math.max(t,Math.min(this.game.unlocked-1,5))].s,n=(e+ne)/2,i=ne-Math.min(Bt[this.game.unlocked-1].s,e);this.rig.flyTo(this.worldAt(n,this.creek.c(n)),Math.max(14,i*.95),this.rig.yawAlong(n)+.3,1.05)}unlockPan(t){let e=this.creek,n=Bt[t].s,i=Bt[Math.max(0,t-1)].s,s=[],o=[n-.5,(n+i)/2,i,(i+ne)/2,ne];o.forEach((a,l)=>{let c=l===o.length-1;s.push({target:this.worldAt(a,e.c(a)),dist:l===0?4:c?4.5:Math.min(30,6+(ne-a)*.25),pitch:l===0?.6:.85,yaw:this.rig.yawAlong(a)+.4})}),this.rig.playPath(s,4+(ne-n)*.06)}pick(t,e){let n=this.renderer.domElement.getBoundingClientRect(),i=new vt((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);this.raycaster.setFromCamera(i,this.camera);let s=Object.values(this.creekEq.stakes).filter(u=>u.visible),o=this.raycaster.intersectObjects(s,!0)[0];if(o){let u=o.object;for(;u&&!u.userData.upgrade;)u=u.parent;if(u)return{type:"stake",id:u.userData.upgrade}}let a=this.raycaster.ray,l=null,c=1/0,h=this.tmpV;for(let u of this.game.phys.balls){if(u.state!=="roll")continue;h.set(u.x,u.y,u.z);let d=h.clone().sub(a.origin).dot(a.direction);if(d<0)continue;let p=a.distanceSqToPoint(h),g=Math.max(.0335*1.5,d*.025);p<g*g&&d<c&&(c=d,l=u)}return l?{type:"ball",id:l.id}:null}project(t,e){let n=this.tmpV.copy(t).project(this.camera),i=this.renderer.domElement;return e.x=(n.x*.5+.5)*i.clientWidth,e.y=(-n.y*.5+.5)*i.clientHeight,e.visible=n.z<1&&n.z>-1,e}onEvent(t,e){let n=this.camera.position,i=(s,o,a)=>{let l=Math.hypot(s-n.x,o-n.y,a-n.z);return Math.min(1,2.5/(l+.5))};switch(t.type){case"hit":{let s=i(t.x,t.y,t.z),o=t.mat===Pt.WOOD?"wood":t.mat===Pt.RUBBER||t.mat===Pt.MAT||t.mat===Pt.DIRT||t.mat===Pt.SAND?"bump":"rock";e?.play(o,t.v/2.5,s);break}case"bump":e?.play("bump",t.v/1.5,i(t.x,t.y,t.z));break;case"splash":this.effects.splash(t.x,t.y,t.z,t.v),e?.play("splash",t.v/3,i(t.x,t.y,t.z));break;case"finish":this.finish.onEvent(t),this.effects.sparkle(t.x,t.y+.08,t.z),e?.play("finish",1,Math.max(.35,i(t.x,t.y,t.z)));break;case"pressed":{this.workshop.onEvent(t);let s=this.workshop.group.position;e?.play("press",.8,i(s.x,s.y,s.z));break}case"launch":{this.workshop.onEvent(t);let s=this.workshop.group.position;e?.play("launch",1,i(s.x,s.y,s.z)),this.followNext&&(this.rig.setFollow(t.id,this.followNext==="close"),this.followNext=null);break}case"handMade":this.workshop.onEvent(t);break;case"surge":this.effects.ripple(t.x,this.creek.y0(this.creek.locate(t.x,t.z,-1,{}).s),t.z,.04,.5,.8,.8);break;case"armSweep":e?.play("arm",1,1);break;case"armClear":this.effects.ripple(t.x,t.y,t.z,.05,.6,1,.8);break;case"lost":e?.play("lost",1,i(t.x,t.y,t.z));break;case"purchase":e?.play("buy");break;case"unlock":this.unlockPan(t.k);break;case"relocMove":this.cart={from:t.from,to:t.to,dur:t.dur,t:0};break;case"relocated":this.cart=null,this.workshop.placeAt(t.k);break;case"drain":this.drains.push({t:0,spec:0,conv:this.game.owned.has("conveyor")});break;default:}}update(t,e){let n=this.game,i=this.creek;this.time+=t;let s=this.time;if(this.workshop.configure(n.owned),this.finish.configure(n.owned),this.creekEq.configure(n),this.markers.update(n),this.cart&&n.reloc&&n.reloc.phase==="move"){let m=this.cart,f=Math.min(1,n.reloc.t/m.dur),_=f*f*(3-2*f),y=this.workshop.frameFor(m.from),v=this.workshop.frameFor(m.to),M=i.pads[m.from].sC,S=i.pads[m.to].sC,A=M+(S-M)*_,T=i.c(A)+i.wR(A)+1.05,w=i.worldXZ(A,T),b=i.bedH(A,Math.min(9.5,T)),C=Math.max(b,y.pos.y+(v.pos.y-y.pos.y)*_)+Math.sin(f*Math.PI)*.25;this.workshop.group.position.set(w.x,C,w.z);let D=i.frame(A);this.workshop.group.rotation.y=Math.atan2(-D.tz,D.tx)+Math.sin(s*9)*.02*Math.sin(f*Math.PI),this.workshop.group.updateMatrixWorld(!0)}else!n.reloc&&this.workshop.k!==n.sel&&this.workshop.placeAt(n.sel);this.workshop.update(t,n),this.finish.update(t,n),this.creekEq.update(t,n,s);let o=this.balls;o.begin();let a=this.camera.position,l=this.rig.dist>14,c=null;for(let m of n.phys.balls)if(!(m.state!=="roll"&&m.state!=="queue")&&(o.add(m.spec,m.x,m.y,m.z,m.qx,m.qy,m.qz,m.qw,m.wet,m.state==="roll"),m.id===this.rig.follow&&(c=this.tmpV.set(m.x,m.y,m.z).clone()),m.state==="roll"&&m.sub>.004&&m.sub<2*.0335)){let f=this.wakeT.get(m.id)||0;if(s>f){i.flowAt(m.s,m.d,m.y,n.t,...this.tangent(m.s),this.fl);let _=Math.hypot(m.vx-this.fl.vx,m.vz-this.fl.vz);Math.hypot(m.x-a.x,m.z-a.z)<18&&(_>.06||Math.random()<.05)&&this.effects.ripple(m.x,i.y0(m.s),m.z,.0335*1.3,.12+_*.2,.9,Math.min(.55,.2+_)),this.wakeT.set(m.id,s+(_>.3?.09:.2))}}this.wakeT.size>400&&this.wakeT.clear(),this.rig.follow!=null&&!c&&(this.rig.follow=null,this.followEnded&&this.followEnded());let h=this.workshop.hopperSlotsWorld();for(let m=0;m<n.hopper.length&&m<h.length;m++){let f=h[m];o.add(n.hopper[m],f.x,f.y,f.z,0,Math.sin(m*1.7),0,Math.cos(m*1.7))}if(n.owned.has("press")&&n.hopper.length<n.numbers.hopper&&n.settings.auto){let m=this.workshop.heads.length===2?n.pressCount%2:0,f=this.workshop.moldWorld(m);if(f&&n.pressProg>.5){let _=(n.pressProg-.5)*2;o.sc.setScalar(.3+_*.7),o.add(jg(n),f.x,f.y,f.z,0,0,0,1),o.sc.setScalar(1)}}let u=this.finish.slots;for(let m=0;m<n.basket.length&&m<u.length;m++){let f=u[m];o.add(n.basket[m],f.x,f.y,f.z,Math.sin(m),0,0,Math.cos(m),.8)}let d=this.finish.crateSlots;if(d.length)for(let m=0;m<Math.min(n.crate,d.length);m++)o.add(m%3===0?0:1,d[m].x,d[m].y,d[m].z,Math.sin(m*2),0,0,Math.cos(m*2),.3);for(let m=this.drains.length-1;m>=0;m--){let f=this.drains[m];f.t+=t;let _=f.conv?1.4:.7;if(f.t>_||!this.finish.slots.length){this.drains.splice(m,1);continue}let y=f.t/_,v;f.conv&&this.finish.beltA?v=this.finish.beltA.clone().lerp(this.finish.beltB,y).setY(this.finish.beltA.y+(this.finish.beltB.y-this.finish.beltA.y)*y+.0335+.01):v=this.finish.slots[0].clone().lerp(this.finish.drainEnd,y),o.add(1,v.x,v.y,v.z,0,Math.sin(y*9),0,Math.cos(y*9),.6)}o.end(l),c?(o.ring.visible=!0,o.ring.position.set(c.x,Math.max(c.y-.0335+.003,i.y0(i.locate(c.x,c.z,-1,{}).s)+.004),c.z)):o.ring.visible=!1,this.rig.update(t,c);let p=this.rig.target,g=Math.min(70,Math.max(4,this.rig.dist*1.4)),x=this.sun.shadow.camera;if(x.left=-g,x.right=g,x.top=g,x.bottom=-g,x.near=.5,x.far=g*4+40,x.updateProjectionMatrix(),this.sun.position.copy(p).addScaledVector(this.sunDir,g*2+15),this.sun.target.position.copy(p),this.sky.position.copy(this.camera.position),this.water.material.uniforms.uTime.value=s,this.falls.userData.uniforms.uTime.value=s,this.effects.update(t,n.t,this.camera.position),e){let m=i.locate(a.x,a.z,-1,{}),f=a.y-i.y0(Math.max(-5,Math.min(108,m.s))),_=Math.max(0,1-(Math.abs(m.d-i.c(Math.max(-5,Math.min(108,m.s))))+f)/25),y=0;for(let v of wn){let M=this.falls.userData.sheets.find(S=>S.step===v)?.base;M&&(y=Math.max(y,v.h*.45*Math.max(0,1-a.distanceTo(M)/14)))}e.ambience(Math.min(1,_*1.4),Math.min(1,y),s)}this.renderer.render(this.scene,this.camera)}tangent(t){let e=this.creek.frame(t);return[e.tx,e.tz]}};function jg(r){let t=0;return r.owned.has("premiumFelt")&&(t|=1),r.owned.has("batchStamp")&&(t|=32),t}var No=class{constructor(){this.ctx=null,this.enabled=!0,this.voices={},this.last={},this.limits={wood:[4,.04],rock:[5,.03],splash:[4,.05],finish:[3,.06],bump:[3,.05],press:[2,.1],ui:[2,.05],cash:[2,.08],arm:[1,.3],lost:[1,.4]}}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}let t=window.AudioContext||window.webkitAudioContext;if(!t)return;let e=new t;this.ctx=e,this.master=e.createGain(),this.master.gain.value=this.enabled?.8:0,this.master.connect(e.destination),this.comp=e.createDynamicsCompressor(),this.comp.threshold.value=-16,this.comp.connect(this.master);let n=e.sampleRate*2,i=e.createBuffer(1,n,e.sampleRate),s=i.getChannelData(0),o=0,a=0,l=0;for(let u=0;u<n;u++){let d=Math.random()*2-1;o=.99765*o+d*.099,a=.963*a+d*.2965,l=.57*l+d*1.0526,s[u]=(o+a+l+d*.1848)*.2}this.noise=i;let c=e.createBuffer(1,e.sampleRate,e.sampleRate),h=c.getChannelData(0);for(let u=0;u<h.length;u++)h[u]=Math.random()*2-1;this.white=c,this.amb=this.loopNoise(700,.6,0),this.ambHi=this.loopNoise(2600,.8,0),this.fall=this.loopNoise(400,.4,0)}loopNoise(t,e,n){let i=this.ctx,s=i.createBufferSource();s.buffer=this.noise,s.loop=!0;let o=i.createBiquadFilter();o.type="bandpass",o.frequency.value=t,o.Q.value=e;let a=i.createGain();return a.gain.value=n,s.connect(o),o.connect(a),a.connect(this.master),s.start(),{src:s,f:o,g:a}}setEnabled(t){this.enabled=t,this.master&&this.master.gain.setTargetAtTime(t?.8:0,this.ctx.currentTime,.05)}ambience(t,e,n){if(!this.ctx)return;let i=this.ctx.currentTime,s=.85+.15*Math.sin(n*.7)*Math.sin(n*.23+1);this.amb.g.gain.setTargetAtTime(.16*t*s,i,.3),this.ambHi.g.gain.setTargetAtTime(.05*t,i,.3),this.fall.g.gain.setTargetAtTime(.3*e,i,.3)}allow(t){if(!this.ctx||!this.enabled)return!1;let e=this.ctx.currentTime,[n,i]=this.limits[t]||[3,.05],s=(this.voices[t]||[]).filter(o=>o>e);return this.voices[t]=s,s.length>=n||e-(this.last[t]||0)<i?!1:(this.last[t]=e,!0)}claim(t,e){(this.voices[t]=this.voices[t]||[]).push(this.ctx.currentTime+e)}burst(t,{freq:e=1e3,q:n=1,type:i="bandpass",dur:s=.1,vol:o=.3,sweepTo:a=null,delay:l=0,white:c=!1}){let h=this.ctx,u=h.currentTime+l,d=h.createBufferSource();d.buffer=c?this.white:this.noise;let p=h.createBiquadFilter();p.type=i,p.frequency.setValueAtTime(e,u),p.Q.value=n,a&&p.frequency.exponentialRampToValueAtTime(a,u+s);let g=h.createGain();g.gain.setValueAtTime(1e-4,u),g.gain.exponentialRampToValueAtTime(o,u+.004),g.gain.exponentialRampToValueAtTime(1e-4,u+s),d.connect(p),p.connect(g),g.connect(this.comp),d.start(u,Math.random()),d.stop(u+s+.05)}tone(t,{freq:e=440,type:n="sine",dur:i=.15,vol:s=.2,delay:o=0,to:a=null}){let l=this.ctx,c=l.currentTime+o,h=l.createOscillator();h.type=n,h.frequency.setValueAtTime(e,c),a&&h.frequency.exponentialRampToValueAtTime(a,c+i);let u=l.createGain();u.gain.setValueAtTime(1e-4,c),u.gain.exponentialRampToValueAtTime(s,c+.005),u.gain.exponentialRampToValueAtTime(1e-4,c+i),h.connect(u),u.connect(this.comp),h.start(c),h.stop(c+i+.05)}play(t,e=1,n=1){let i=Math.min(1,e)*n;if(!(i<.03))switch(t){case"wood":if(!this.allow("wood"))return;this.claim("wood",.12),this.tone("wood",{freq:210+Math.random()*40,dur:.09,vol:.32*i,to:160}),this.tone("wood",{freq:520+Math.random()*60,dur:.05,vol:.12*i}),this.burst("wood",{freq:1400,q:2,dur:.03,vol:.12*i});break;case"rock":if(!this.allow("rock"))return;this.claim("rock",.06),this.burst("rock",{freq:3200+Math.random()*800,q:4,dur:.035,vol:.35*i,white:!0}),this.tone("rock",{freq:1500+Math.random()*300,dur:.04,vol:.06*i});break;case"bump":if(!this.allow("bump"))return;this.claim("bump",.06),this.tone("bump",{freq:340,dur:.06,vol:.12*i,to:250}),this.burst("bump",{freq:900,q:1,dur:.04,vol:.08*i});break;case"splash":if(!this.allow("splash"))return;this.claim("splash",.3),this.burst("splash",{freq:2500,q:.8,type:"lowpass",dur:.28*(.6+i*.6),vol:.35*i,sweepTo:350}),this.burst("splash",{freq:700,q:3,dur:.12,vol:.12*i,delay:.03});break;case"finish":if(!this.allow("finish"))return;this.claim("finish",.25),this.tone("finish",{freq:1800,type:"square",dur:.015,vol:.06*i}),this.tone("finish",{freq:1200,type:"square",dur:.015,vol:.05*i,delay:.035}),this.tone("finish",{freq:1320,dur:.22,vol:.09*i,delay:.05});break;case"press":if(!this.allow("press"))return;this.claim("press",.15),this.tone("press",{freq:95,dur:.12,vol:.18*i,to:60}),this.burst("press",{freq:300,q:1,type:"lowpass",dur:.08,vol:.12*i});break;case"launch":if(!this.allow("ui"))return;this.claim("ui",.1),this.tone("ui",{freq:300,type:"triangle",dur:.06,vol:.12*i,to:180});break;case"buy":if(!this.allow("cash"))return;this.claim("cash",.4),[660,880,1320].forEach((s,o)=>this.tone("cash",{freq:s,type:"triangle",dur:.18,vol:.12,delay:o*.07}));break;case"arm":if(!this.allow("arm"))return;this.claim("arm",.6),this.tone("arm",{freq:140,type:"sawtooth",dur:.5,vol:.05*i,to:220});break;case"lost":if(!this.allow("lost"))return;this.claim("lost",.4),this.tone("lost",{freq:420,type:"triangle",dur:.25,vol:.06*i,to:260});break;case"click":if(!this.allow("ui"))return;this.claim("ui",.05),this.tone("ui",{freq:900,type:"square",dur:.02,vol:.04});break;default:}}};var ue=(r,t=document)=>t.querySelector(r),Pn=r=>"$"+Math.floor(r).toLocaleString("en-US"),fc=r=>r>=1e4?"$"+(r/1e3).toFixed(r>=1e5?0:1)+"k":Pn(r),Fo=class{constructor(t,e,n,i){this.game=t,this.view=e,this.audio=n,this.hooks=i,this.tab="factory",this.shopKey="",this.startKey="",this.labels=[],this.lostT=0,this.focusId=null,this.build()}build(){let t=ue("#ui");t.innerHTML=`
      <div id="hud">
        <div class="cash" id="cash">$0</div>
        <div class="chips">
          <span class="chip" title="Cash earned per minute over the last 60 s"><b id="cpm">$0</b>/min</span>
          <span class="chip" title="Balls waiting in the hopper"><b id="queued">0</b> queued</span>
          <span class="chip" title="Balls rolling down the creek"><b id="rolling">0</b> rolling</span>
        </div>
        <div class="sub" id="sub"></div>
      </div>
      <div id="topright">
        <div class="btnrow">
          <button data-cam="home" title="Back to the operation (H)">Home</button>
          <button data-cam="overview" title="Overhead view of the whole creek (O)">Overview</button>
          <button data-cam="bench" title="Workbench close-up (B)">Bench</button>
          <button data-cam="finish" title="Jump to the finish gate (G)">Finish</button>
          <button data-cam="follow" title="Follow a ball from release to the basket (F)">Follow</button>
          <button data-cam="close" title="Close follow camera to watch the seam turn (C)">Close-up</button>
          <button id="gear" title="Settings">\u2699</button>
        </div>
        <div id="settings" class="hidden">
          <label><input type="checkbox" id="optSound"> Sound</label>
          <label><input type="checkbox" id="optAuto"> Automation running</label>
          <div class="qrow">Graphics
            <select id="optQuality"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
          </div>
          <div class="hint">Drag to pan \xB7 right-drag / two fingers to orbit \xB7 wheel / pinch to zoom \xB7 click a ball to follow it \xB7 Space to roll</div>
          <button id="reset" class="danger">Reset save\u2026</button>
        </div>
      </div>
      <div id="panel">
        <div class="ptabs">
          <button class="ptab on" data-panel="shop">Shop</button>
          <button class="ptab" data-panel="starts">Launch points</button>
          <button class="ptab collapse" id="collapse" title="Hide panel">\u25B8</button>
        </div>
        <div id="shop">
          <div class="tabs">${Tc.map(i=>`<button data-tab="${i.id}" class="${i.id==="factory"?"on":""}">${i.name}</button>`).join("")}</div>
          <div id="items"></div>
        </div>
        <div id="starts" class="hidden"></div>
      </div>
      <button id="openPanel" class="hidden">Shop</button>
      <div id="rollWrap">
        <button id="roll"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" class="track"/><circle cx="50" cy="50" r="46" class="prog" id="rollProg"/></svg>
          <span class="t1">Make &amp; Roll</span><span class="t2" id="rollSub">Space</span></button>
      </div>
      <div id="toasts"></div>
      <div id="labels"></div>
      <div id="status"></div>
    `,this.el={cash:ue("#cash"),cpm:ue("#cpm"),queued:ue("#queued"),rolling:ue("#rolling"),sub:ue("#sub"),items:ue("#items"),starts:ue("#starts"),roll:ue("#roll"),rollProg:ue("#rollProg"),rollSub:ue("#rollSub"),toasts:ue("#toasts"),labels:ue("#labels"),status:ue("#status"),panel:ue("#panel")},this.statusEls={};for(let i of["press","feeder","creek"]){let s=document.createElement("div");s.className="status hidden",this.el.status.appendChild(s),this.statusEls[i]=s}let e=()=>{this.audio.unlock(),this.game.manualRoll()==="moving"&&this.toast("Workbench is moving \u2014 launches resume on arrival")};this.el.roll.addEventListener("click",e),window.addEventListener("keydown",i=>{i.target.tagName==="INPUT"||i.target.tagName==="SELECT"||(i.code==="Space"?(i.preventDefault(),e()):i.key==="h"?this.view.homeView():i.key==="o"?this.view.overview():i.key==="b"?this.view.benchView():i.key==="g"?this.view.finishView():i.key==="f"?this.follow(!1):i.key==="c"&&this.follow(!0))}),t.querySelectorAll("[data-cam]").forEach(i=>i.addEventListener("click",()=>{this.audio.unlock();let s=i.dataset.cam;s==="home"?this.view.homeView():s==="overview"?this.view.overview():s==="bench"?this.view.benchView():s==="finish"?this.view.finishView():s==="follow"?this.follow(!1):s==="close"&&this.follow(!0)})),ue("#gear").addEventListener("click",()=>ue("#settings").classList.toggle("hidden"));let n=this.game.settings;ue("#optSound").checked=n.sound,ue("#optAuto").checked=n.auto,ue("#optQuality").value=n.quality,ue("#optSound").addEventListener("change",i=>{n.sound=i.target.checked,this.audio.unlock(),this.audio.setEnabled(n.sound),this.hooks.save()}),ue("#optAuto").addEventListener("change",i=>{n.auto=i.target.checked,this.hooks.save()}),ue("#optQuality").addEventListener("change",i=>{n.quality=i.target.value,this.view.setQuality(n.quality),this.hooks.save()}),ue("#reset").addEventListener("click",()=>{confirm("Erase all progress and start over?")&&this.hooks.reset()}),t.querySelectorAll(".ptab[data-panel]").forEach(i=>i.addEventListener("click",()=>this.showPanel(i.dataset.panel))),ue("#collapse").addEventListener("click",()=>this.setPanel(!1)),ue("#openPanel").addEventListener("click",()=>this.setPanel(!0)),t.querySelectorAll("#shop .tabs button").forEach(i=>i.addEventListener("click",()=>{this.tab=i.dataset.tab,this.shopKey="",t.querySelectorAll("#shop .tabs button").forEach(s=>s.classList.toggle("on",s===i))})),this.el.items.addEventListener("click",i=>{let s=i.target.closest("button[data-buy]");if(!s)return;this.audio.unlock();let o=s.dataset.buy;this.game.buy(o)&&(this.toast(`Installed: ${bn[o].name}`),this.hooks.save(),this.shopKey="")}),this.el.starts.addEventListener("click",i=>{let s=i.target.closest("button[data-start]");if(!s)return;this.audio.unlock();let o=+s.dataset.start;s.dataset.act==="unlock"?this.game.unlock(o)&&(this.toast(`${Bt[o].name} unlocked \u2014 the workbench is on its way upstream`),this.hooks.save()):this.game.selectStart(o)&&(this.toast(`Moving the workbench to ${Bt[o].name}`),this.hooks.save()),this.startKey=""}),window.innerWidth<760&&this.setPanel(!1)}setPanel(t){this.el.panel.classList.toggle("hidden",!t),ue("#openPanel").classList.toggle("hidden",t),document.body.classList.toggle("panel-open",t)}showPanel(t){document.querySelectorAll(".ptab[data-panel]").forEach(e=>e.classList.toggle("on",e.dataset.panel===t)),ue("#shop").classList.toggle("hidden",t!=="shop"),this.el.starts.classList.toggle("hidden",t!=="starts"),this.shopKey="",this.startKey=""}openItem(t){let e=bn[t];e&&(this.setPanel(!0),this.showPanel("shop"),this.tab=e.tab,document.querySelectorAll("#shop .tabs button").forEach(n=>n.classList.toggle("on",n.dataset.tab===e.tab)),this.focusId=t,this.shopKey="")}follow(t){let e=this.game,n=null;for(let i of e.phys.balls)i.state==="roll"&&!i.paid&&(!n||i.id>n.id)&&(n=i);n?this.view.rig.setFollow(n.id,t):(this.view.followNext=t?"close":"far",this.toast("Following the next ball released"))}toast(t,e=""){let n=document.createElement("div");for(n.className="toast "+e,n.textContent=t,this.el.toasts.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3200);this.el.toasts.children.length>4;)this.el.toasts.firstChild.remove()}floatLabel(t,e,n,i,s){let o=this.labels.find(a=>!a.alive);if(!o){if(this.labels.length>40)return;let a=document.createElement("div");this.el.labels.appendChild(a),o={d:a,alive:!1},this.labels.push(o)}o.alive=!0,o.t=0,o.p={x:e,y:n,z:i},o.d.textContent=t,o.d.className="flab "+s,o.life=s==="lost"?2.2:1.4}onEvent(t){let e=this.game;t.type==="finish"?this.floatLabel(`+$${t.amount}`,t.x,t.y+.1,t.z,"cash"):t.type==="lost"?e.t-this.lostT>1.5&&(this.lostT=e.t,this.floatLabel(`No finish: ${t.reason}`,t.x,t.y+.1,t.z,"lost")):t.type==="milestone"&&t.what==="gorge"?this.toast("Milestone: first full run from the Upper Gorge! Now chase your best sustained $/min.","big"):t.type==="relocated"&&this.toast(`Workbench set up at ${Bt[t.k].name}`)}update(t){let e=this.game,n=this.el;n.cash.textContent=Pn(e.cash),n.cpm.textContent=fc(e.cashPerMin(60)),n.queued.textContent=e.hopper.length,n.rolling.textContent=e.ballsRolling();let i=[];i.push(`Paid ${fc(e.stats.paid)} \xB7 ${e.stats.finished} finished \xB7 ${e.stats.lost} lost`);let s=e.nextArrival(),o=e.lastFinish&&e.t-e.lastFinish.t<6;s!==null&&!o&&s>1.5&&i.push(`First ball in ~${Math.ceil(s)} s`),e.bestCpm>0&&i.push(`Best sustained ${fc(e.bestCpm)}/min`),e.reloc&&i.push(`Moving to ${Bt[e.reloc.to].name}\u2026`),n.sub.innerHTML=i.map(u=>`<div>${u}</div>`).join("");let a=e.manualCD/tr,l=2*Math.PI*46;n.rollProg.style.strokeDasharray=`${l}`,n.rollProg.style.strokeDashoffset=`${l*a}`,n.roll.classList.toggle("cool",a>0||!!e.reloc),n.rollSub.textContent=e.reloc?"Moving\u2026":e.hopper.length?`Release queued ball (${e.hopper.length})`:`Make one by hand \xB7 $${e.payoutFor(e.sel)}`;let c={press:this.view.workshop.pressWorld(),feeder:this.view.workshop.feederWorld(),creek:this.view.finish.slots[0]},h={press:e.status.press,feeder:e.status.feeder,creek:e.status.creek};for(let u of Object.keys(this.statusEls)){let d=this.statusEls[u],p=h[u];if(!(p&&p!=="Paused"&&p!=="Moving"&&c[u])){d.classList.add("hidden");continue}let x=this.view.project(c[u],{});if(!x.visible){d.classList.add("hidden");continue}d.classList.remove("hidden"),d.textContent=p,d.style.transform=`translate(${x.x}px, ${x.y}px) translate(-50%, -100%)`}for(let u of this.labels){if(!u.alive)continue;if(u.t+=t,u.t>u.life){u.alive=!1,u.d.style.opacity=0;continue}let d=this.view.project({x:u.p.x,y:u.p.y,z:u.p.z,isVector3:!0},{});u.d.style.opacity=d.visible?String(1-(u.t/u.life)**2):0,u.d.style.transform=`translate(${d.x}px, ${d.y-u.t*40}px) translate(-50%, -100%)`}this.renderShop(),this.renderStarts()}renderShop(){let t=this.game,e=t.suggestions(),n=yi.filter(s=>s.tab===this.tab),i=this.tab+"|"+n.map(s=>{let o=t.canBuy(s.id);return s.id+(t.owned.has(s.id)?"o":o.ok?"y":o.avail?"a"+Math.floor(t.cash/s.price*20):"n"+(o.why||""))+(e[s.id]||"")}).join(",")+"|"+this.focusId+Object.keys(e).join("");if(document.querySelectorAll("#shop .tabs button").forEach(s=>{let o=yi.filter(l=>l.tab===s.dataset.tab&&t.canBuy(l.id).ok).length,a=yi.filter(l=>l.tab===s.dataset.tab&&e[l.id]).length;s.dataset.badge=a?"!":o?String(o):""}),i!==this.shopKey&&(this.shopKey=i,this.el.items.innerHTML=n.map(s=>{let o=t.owned.has(s.id),a=t.canBuy(s.id),l=[...s.requires.map(u=>bn[u].name),...s.area!==void 0&&s.area>0?[Bt[s.area].name]:[]],c=o?'<span class="own">Installed \u2713</span>':a.ok?`<button data-buy="${s.id}">Buy ${Pn(s.price)}</button>`:a.avail?`<button data-buy="${s.id}" disabled>${Pn(s.price)}</button><div class="bar"><i style="width:${Math.min(100,t.cash/s.price*100)}%"></i></div>`:`<span class="lock">\u{1F512} ${Pn(s.price)}</span>`;return`<div class="${["item",o?"owned":"",!o&&!a.ok&&!a.avail?"locked":"",e[s.id]&&!o?"sug":"",this.focusId===s.id?"focus":""].join(" ")}" id="item-${s.id}">
        <div class="ih"><span class="nm">${s.name}</span><span class="pr">${Pn(s.price)}</span></div>
        <div class="ef">${s.effect}</div>
        <div class="rq">${l.length?"Requires: "+l.join(", "):"No prerequisite"}</div>
        ${e[s.id]&&!o?`<div class="sg">Suggested \u2014 ${e[s.id]}</div>`:""}
        <div class="st">${c}</div>
      </div>`}).join(""),this.focusId)){let s=document.getElementById("item-"+this.focusId);s&&s.scrollIntoView({block:"nearest",behavior:"smooth"}),setTimeout(()=>{this.focusId=null,this.shopKey=""},2500)}}lineInterval(){let t=this.game,e=t.numbers;return t.owned.has("feeder")?Math.max(e.press,e.feeder,t.owned.has("spacingSensor")?0:1.25):t.owned.has("press")?Math.max(e.press,2.5):2.5}renderStarts(){let t=this.game,e=ki(t.owned),n=[t.unlocked,t.sel,t.reloc?t.reloc.to:-1,...Bt.map((s,o)=>(t.cash>=s.cost?1:0)+":"+Math.round(t.etaFor(o))),e].join(",");if(n===this.startKey)return;this.startKey=n;let i=Es(e);this.el.starts.innerHTML='<div class="sh">Every launch point rolls through all the creek below it to the same finish gate.</div>'+Bt.map((s,o)=>{let a=o<t.unlocked,l=o===t.sel&&!t.reloc,c=t.reloc&&t.reloc.to===o,h=t.etaFor(o),u;return a?u=l?'<span class="own">Workbench here</span>':c?'<span class="own">Moving\u2026</span>':`<button data-start="${o}" ${t.reloc?"disabled":""}>Move here</button>`:o===t.unlocked?u=`<button data-start="${o}" data-act="unlock" ${t.cash>=s.cost?"":"disabled"}>Unlock ${Pn(s.cost)}</button>`:u=`<span class="lock">\u{1F512} ${Pn(s.cost)}</span>`,`<div class="start ${l?"sel":""} ${a?"":"locked"}">
        <div class="ih"><span class="nm">${s.name}</span><span class="pr">${Pn(s.base+i)}/ball</span></div>
        <div class="ef">${s.blurb}</div>
        <div class="rq">Time to finish ~${Math.round(h)} s (target ${s.target}) \xB7 ${Pn((s.base+i)*60/this.lineInterval())}/min with your current line</div>
        <div class="st">${u}</div>
      </div>`}).join("")}};var pc="creek-rolling-tycoon-save-v1";function Qg(){try{let r=localStorage.getItem(pc);return r?JSON.parse(r):null}catch{return null}}function tx(){let r=document.getElementById("loading"),t=new nr,e=new rr(t,Qg()),n=new No;n.enabled=e.settings.sound;let i=new Uo(document.getElementById("view"),t,e),s=!1,o=()=>{if(!s){try{localStorage.setItem(pc,JSON.stringify(e.serialize()))}catch{}e.lastSaveT=e.t}},a=new Fo(e,i,n,{save:o,reset:()=>{s=!0;try{localStorage.removeItem(pc)}catch{}location.reload()}});i.rig.onPick=(d,p)=>{n.unlock();let g=i.pick(d,p);g&&(g.type==="ball"?i.rig.setFollow(g.id,i.rig.dist<1.2):g.type==="stake"&&a.openItem(g.id))},i.followEnded=()=>{},window.addEventListener("pointerdown",()=>n.unlock(),{once:!0}),window.addEventListener("keydown",()=>n.unlock(),{once:!0});let l=performance.now(),c=null,h=()=>{for(let d of e.events)i.onEvent(d,e.settings.sound?n:null),a.onEvent(d),(d.type==="finish"||d.type==="purchase"||d.type==="unlock"||d.type==="relocated")&&(e._dirty=!0);e.events.length=0},u=d=>{let p=Math.min(.1,(d-l)/1e3);l=d,e.update(p),h(),i.update(p,e.settings.sound?n:null),a.update(p),e._dirty&&e.t-e.lastSaveT>.5?(e._dirty=!1,o()):e.t-e.lastSaveT>3&&o(),requestAnimationFrame(u)};document.addEventListener("visibilitychange",()=>{if(document.hidden){o();let d=performance.now();c=setInterval(()=>{let p=performance.now(),g=Math.min(5,(p-d)/1e3);for(d=p;g>0;){let x=Math.min(.25,g);e.update(x),g-=x}e.events.length=0,o()},1e3)}else clearInterval(c),l=performance.now()}),window.addEventListener("pagehide",o),window.addEventListener("beforeunload",o),r.classList.add("done"),setTimeout(()=>r.remove(),600),requestAnimationFrame(u),window.__crt={game:e,view:i,creek:t,save:o}}window.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{try{tx()}catch(r){console.error(r),document.getElementById("loading").innerHTML=`<div class="err">Could not start: ${r.message}</div>`}},30)});})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
//# sourceMappingURL=game.js.map
